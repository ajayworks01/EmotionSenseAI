from datetime import datetime, timedelta
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import func
from database.db import db
from models.emotion_history import EmotionHistory
from models.analytics import Analytics

analytics_bp = Blueprint('analytics', __name__)

POSITIVE_EMOTIONS = {'happy', 'surprise'}
NEGATIVE_EMOTIONS = {'sad', 'angry', 'fear'}


@analytics_bp.route('/analytics', methods=['GET'])
@jwt_required()
def get_analytics():
    user_id = int(get_jwt_identity())

    # ── Overall stats ──────────────────────────────────────────────
    records = EmotionHistory.query.filter_by(user_id=user_id).all()
    total = len(records)

    emotion_counts = {}
    for r in records:
        emotion_counts[r.emotion] = emotion_counts.get(r.emotion, 0) + 1

    most_common = max(emotion_counts, key=emotion_counts.get) if emotion_counts else None

    positive = sum(v for k, v in emotion_counts.items() if k in POSITIVE_EMOTIONS)
    negative = sum(v for k, v in emotion_counts.items() if k in NEGATIVE_EMOTIONS)

    positive_pct = round(positive / total * 100) if total else 0
    negative_pct = round(negative / total * 100) if total else 0

    # ── Emotion distribution list ──────────────────────────────────
    emotion_dist = [
        {'emotion': emotion, 'count': count}
        for emotion, count in sorted(emotion_counts.items(), key=lambda x: -x[1])
    ]

    # ── Daily trend (last 7 days) ──────────────────────────────────
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    daily_rows = (
        db.session.query(
            func.date(EmotionHistory.timestamp).label('date'),
            func.count(EmotionHistory.id).label('count'),
        )
        .filter(EmotionHistory.user_id == user_id)
        .filter(EmotionHistory.timestamp >= seven_days_ago)
        .group_by(func.date(EmotionHistory.timestamp))
        .order_by(func.date(EmotionHistory.timestamp))
        .all()
    )
    daily_trend = [{'date': str(row.date), 'count': row.count} for row in daily_rows]

    # ── Weekly trend (last 4 weeks) ────────────────────────────────
    four_weeks_ago = datetime.utcnow() - timedelta(weeks=4)
    weekly_rows = (
        db.session.query(
            func.strftime('%Y-W%W', EmotionHistory.timestamp).label('week'),
            func.count(EmotionHistory.id).label('count'),
        )
        .filter(EmotionHistory.user_id == user_id)
        .filter(EmotionHistory.timestamp >= four_weeks_ago)
        .group_by(func.strftime('%Y-W%W', EmotionHistory.timestamp))
        .order_by(func.strftime('%Y-W%W', EmotionHistory.timestamp))
        .all()
    ) if 'sqlite' in db.engine.url.drivername else []

    weekly_trend = [{'week': row.week, 'count': row.count} for row in weekly_rows]

    return jsonify({
        'stats': {
            'total':        total,
            'most_common':  most_common,
            'positive_pct': positive_pct,
            'negative_pct': negative_pct,
        },
        'emotion_distribution': emotion_dist,
        'daily_trend':   daily_trend,
        'weekly_trend':  weekly_trend,
    })
