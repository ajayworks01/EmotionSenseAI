import csv
import io
from flask import Blueprint, request, jsonify, Response
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.db import db
from models.emotion_history import EmotionHistory

history_bp = Blueprint('history', __name__)


@history_bp.route('/history', methods=['GET'])
@jwt_required()
def get_history():
    user_id = int(get_jwt_identity())
    page    = int(request.args.get('page', 1))
    per_page = 15
    search  = request.args.get('search', '').strip()

    query = EmotionHistory.query.filter_by(user_id=user_id)
    if search:
        query = query.filter(EmotionHistory.input_text.ilike(f'%{search}%'))

    pagination = query.order_by(EmotionHistory.timestamp.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )

    return jsonify({
        'items': [item.to_dict() for item in pagination.items],
        'total': pagination.total,
        'pages': pagination.pages,
        'page':  page,
    })


@history_bp.route('/history/<int:item_id>', methods=['DELETE'])
@jwt_required()
def delete_history(item_id):
    user_id = int(get_jwt_identity())
    record = EmotionHistory.query.filter_by(id=item_id, user_id=user_id).first_or_404()
    db.session.delete(record)
    db.session.commit()
    return jsonify({'message': 'Deleted successfully'})


@history_bp.route('/history/export', methods=['GET'])
@jwt_required()
def export_csv():
    user_id = int(get_jwt_identity())
    records = EmotionHistory.query.filter_by(user_id=user_id).order_by(
        EmotionHistory.timestamp.desc()
    ).all()

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(['ID', 'Text', 'Emotion', 'Confidence', 'Explanation', 'Suggested Response', 'Timestamp'])
    for r in records:
        writer.writerow([
            r.id,
            r.input_text,
            r.emotion,
            r.confidence,
            r.explanation or '',
            r.suggested_response or '',
            r.timestamp.isoformat(),
        ])

    output.seek(0)
    return Response(
        output.getvalue(),
        mimetype='text/csv',
        headers={'Content-Disposition': 'attachment; filename=emotionsense_history.csv'},
    )
