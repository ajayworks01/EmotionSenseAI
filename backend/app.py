import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from database.db import db
from routes.auth import auth_bp
from routes.emotion import emotion_bp
from routes.history import history_bp
from routes.analytics import analytics_bp
from routes.admin import admin_bp

def create_app():
    app = Flask(__name__)

    # ── Configuration ──────────────────────────────────────────────
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'change-me-in-production')
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-change-me')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False  # tokens don't expire (adjust for prod)

    # Database: use DATABASE_URL env var or fallback to SQLite
    database_url = os.environ.get('DATABASE_URL', 'sqlite:///emotionsense.db')
    # Render PostgreSQL uses postgres://, SQLAlchemy needs postgresql://
    if database_url.startswith('postgres://'):
        database_url = database_url.replace('postgres://', 'postgresql://', 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # ── Extensions ─────────────────────────────────────────────────
    CORS(app, origins=['*'], supports_credentials=True)
    db.init_app(app)
    JWTManager(app)

    # ── Blueprints ─────────────────────────────────────────────────
    app.register_blueprint(auth_bp,      url_prefix='/api/auth')
    app.register_blueprint(emotion_bp,   url_prefix='/api')
    app.register_blueprint(history_bp,   url_prefix='/api')
    app.register_blueprint(analytics_bp, url_prefix='/api')
    app.register_blueprint(admin_bp,     url_prefix='/api/admin')

    # ── Init DB & seed demo user ────────────────────────────────────
    with app.app_context():
        db.create_all()
        _seed_demo_user()

    @app.route('/api/health')
    def health():
        return {'status': 'ok', 'service': 'EmotionSense AI API'}

    return app


def _seed_demo_user():
    """Create a demo user + admin user if they don't exist."""
    from models.user import User
    from werkzeug.security import generate_password_hash

    if not User.query.filter_by(email='demo@emotionsense.ai').first():
        demo = User(
            name='Demo User',
            email='demo@emotionsense.ai',
            password_hash=generate_password_hash('demo123'),
        )
        db.session.add(demo)

    if not User.query.filter_by(email='admin@emotionsense.ai').first():
        admin = User(
            name='Admin',
            email='admin@emotionsense.ai',
            password_hash=generate_password_hash('admin123'),
            is_admin=True,
        )
        db.session.add(admin)

    db.session.commit()


app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
