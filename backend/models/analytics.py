from database.db import db

class Analytics(db.Model):
    __tablename__ = 'analytics'

    id      = db.Column(db.Integer, primary_key=True)
    emotion = db.Column(db.String(50), nullable=False, unique=True)
    count   = db.Column(db.Integer, default=0)

    @classmethod
    def increment(cls, emotion):
        record = cls.query.filter_by(emotion=emotion.lower()).first()
        if record:
            record.count += 1
        else:
            record = cls(emotion=emotion.lower(), count=1)
            db.session.add(record)
        db.session.commit()
