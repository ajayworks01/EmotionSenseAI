from datetime import datetime
from database.db import db

class User(db.Model):
    __tablename__ = 'users'

    id            = db.Column(db.Integer, primary_key=True)
    name          = db.Column(db.String(120), nullable=False)
    email         = db.Column(db.String(200), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    is_admin      = db.Column(db.Boolean, default=False)
    created_at    = db.Column(db.DateTime, default=datetime.utcnow)

    analyses = db.relationship('EmotionHistory', backref='user', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id':         self.id,
            'name':       self.name,
            'email':      self.email,
            'is_admin':   self.is_admin,
            'created_at': self.created_at.isoformat(),
            'total_analyses': len(self.analyses),
        }
