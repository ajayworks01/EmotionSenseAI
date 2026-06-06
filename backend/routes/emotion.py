import json
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from database.db import db
from models.emotion_history import EmotionHistory
from models.analytics import Analytics
from services.gemini_service import analyze_emotion

emotion_bp = Blueprint('emotion', __name__)


@emotion_bp.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json() or {}
    text = (data.get('text') or '').strip()

    if not text:
        return jsonify({'error': 'Text is required'}), 400
    if len(text) < 3:
        return jsonify({'error': 'Text is too short'}), 400
    if len(text) > 5000:
        return jsonify({'error': 'Text exceeds 5000 character limit'}), 400

    try:
        result = analyze_emotion(text)
    except RuntimeError as e:
        return jsonify({'error': str(e)}), 502

    # Determine current user (optional — guests can analyze without login)
    user_id = None
    try:
        verify_jwt_in_request(optional=True)
        identity = get_jwt_identity()
        if identity:
            user_id = int(identity)
    except Exception:
        pass

    # Persist to history
    record = EmotionHistory(
        user_id=user_id,
        input_text=text[:1000],           # store first 1000 chars
        emotion=result['emotion'],
        confidence=result['confidence'],
        explanation=result.get('explanation'),
        suggested_response=result.get('suggested_response'),
        probabilities_json=json.dumps(result.get('emotion_probabilities', {})),
    )
    db.session.add(record)

    # Update analytics counters
    Analytics.increment(result['emotion'])

    db.session.commit()

    return jsonify(result), 200
