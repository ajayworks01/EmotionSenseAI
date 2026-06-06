import csv
import io
from flask import Blueprint, jsonify, Response
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.db import db
from models.user import User
from models.emotion_history import EmotionHistory
from models.analytics import Analytics

admin_bp = Blueprint('admin', __name__)


def _require_admin():
    """Returns the current user if admin, else raises 403."""
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user or not user.is_admin:
        return None, ({'error': 'Admin access required'}, 403)
    return user, None


@admin_bp.route('/users', methods=['GET'])
@jwt_required()
def list_users():
    _, err = _require_admin()
    if err:
        return err

    users = User.query.order_by(User.created_at.desc()).all()
    return jsonify({
        'users': [
            {**u.to_dict(), 'analysis_count': len(u.analyses)}
            for u in users
        ]
    })


@admin_bp.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    _, err = _require_admin()
    if err:
        return err

    user = User.query.get_or_404(user_id)
    if user.is_admin:
        return jsonify({'error': 'Cannot delete admin accounts'}), 400

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'})


@admin_bp.route('/stats', methods=['GET'])
@jwt_required()
def admin_stats():
    _, err = _require_admin()
    if err:
        return err

    total_users     = User.query.count()
    total_analyses  = EmotionHistory.query.count()
    analytics       = Analytics.query.all()

    total_an = sum(a.count for a in analytics) or 1
    happy_count = next((a.count for a in analytics if a.emotion == 'happy'), 0)
    angry_count = next((a.count for a in analytics if a.emotion == 'angry'), 0)

    return jsonify({
        'total_users':    total_users,
        'total_analyses': total_analyses,
        'happy_pct':  round(happy_count / total_an * 100),
        'angry_pct':  round(angry_count / total_an * 100),
        'emotion_breakdown': [
            {'emotion': a.emotion, 'count': a.count} for a in analytics
        ],
    })


@admin_bp.route('/export', methods=['GET'])
@jwt_required()
def export_all():
    _, err = _require_admin()
    if err:
        return err

    records = EmotionHistory.query.order_by(EmotionHistory.timestamp.desc()).all()
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(['ID', 'User ID', 'Text', 'Emotion', 'Confidence', 'Timestamp'])
    for r in records:
        writer.writerow([r.id, r.user_id, r.input_text, r.emotion, r.confidence, r.timestamp.isoformat()])

    output.seek(0)
    return Response(
        output.getvalue(),
        mimetype='text/csv',
        headers={'Content-Disposition': 'attachment; filename=admin_export.csv'},
    )
