from datetime import datetime
from database.db import db

class EmotionHistory(db.Model):
    __tablename__ = 'emotion_history'

    id           = db.Column(db.Integer, primary_key=True)
    user_id      = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    input_text   = db.Column(db.Text, nullable=False)
    emotion      = db.Column(db.String(50), nullable=False)
    confidence   = db.Column(db.Float, nullable=False)
    explanation  = db.Column(db.Text)
    suggested_response = db.Column(db.Text)
    probabilities_json = db.Column(db.Text)   # JSON string of emotion_probabilities
    timestamp    = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        import json
        return {
            'id':         self.id,
            'input_text': self.input_text,
            'emotion':    self.emotion,
            'confidence': self.confidence,
            'explanation': self.explanation,
            'suggested_response': self.suggested_response,
            'probabilities': json.loads(self.probabilities_json) if self.probabilities_json else {},
            'timestamp':  self.timestamp.isoformat(),
        }
