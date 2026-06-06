# 🧠 EmotionSense AI

> **Context-Aware Emotion Detection from Text Using NLP & Generative AI**

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
[![Flask](https://img.shields.io/badge/Flask-3.0-green?logo=flask)](https://flask.palletsprojects.com)
[![Gemini](https://img.shields.io/badge/Google_Gemini-AI-orange?logo=google)](https://ai.google.dev)
[![License](https://img.shields.io/badge/License-MIT-purple)](LICENSE)

A production-ready full-stack AI SaaS web application that detects human emotions from text using Google Gemini API and Natural Language Processing. Built as a Final Year Engineering Research Project.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎯 Emotion Detection | Classify text into 6 emotions: Happy, Sad, Angry, Fear, Surprise, Neutral |
| 📊 Confidence Scores | Probability distribution across all emotion classes |
| 🤖 AI Explanation | Gemini-powered contextual explanation of detected emotion |
| 💬 Suggested Response | Empathetic AI-generated response suggestions |
| 📈 Analytics Dashboard | Charts and trends from all your analyses |
| 📜 History Tracking | Searchable, filterable history of all analyses |
| 📄 PDF Reports | Professional downloadable analysis reports |
| 📥 CSV Export | Export history data to CSV |
| 🎤 Voice Input | Browser speech recognition for hands-free input |
| 🔊 Text-to-Speech | Listen to AI responses aloud |
| 🔐 JWT Authentication | Secure login, registration, and protected routes |
| 👑 Admin Panel | User management and platform analytics |
| 🌙 Dark Mode | Glassmorphism dark UI with theme toggle |
| 📱 Responsive | Mobile-first responsive design |

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite) — component-based SPA
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — animations and transitions
- **Recharts** — interactive data visualizations
- **React Router DOM** — client-side routing
- **Axios** — HTTP client
- **jsPDF** — PDF generation

### Backend
- **Python Flask** — REST API framework
- **Flask-JWT-Extended** — JWT authentication
- **SQLAlchemy** — ORM for database access
- **Flask-CORS** — cross-origin resource sharing
- **Gunicorn** — production WSGI server

### AI & Database
- **Google Gemini API** — generative AI for emotion analysis
- **SQLite** — development database
- **PostgreSQL** — production database

---

## 📁 Project Structure

```
EmotionSenseAI/
├── frontend/
│   ├── src/
│   │   ├── pages/          # HomePage, AnalyzePage, DashboardPage, ...
│   │   ├── components/     # Navbar, Footer, EmotionResult, ...
│   │   ├── charts/         # EmotionCharts (Recharts)
│   │   ├── context/        # AuthContext, ThemeContext
│   │   ├── services/       # api.js, emotionService.js, pdfService.js
│   │   └── utils/          # emotions.js constants
│   ├── vercel.json
│   └── package.json
│
├── backend/
│   ├── app.py              # Flask application factory
│   ├── models/             # User, EmotionHistory, Analytics
│   ├── routes/             # auth, emotion, history, analytics, admin
│   ├── services/           # gemini_service.py
│   ├── database/           # db.py (SQLAlchemy instance)
│   ├── requirements.txt
│   ├── Procfile
│   ├── runtime.txt
│   └── render.yaml
│
├── README.md
└── DEPLOYMENT.md
```

---

## 🚀 Quick Start — Local Development

### Prerequisites
- Node.js 18+
- Python 3.11+
- Google Gemini API key (get one free at https://ai.google.dev)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/emotionsense-ai.git
cd EmotionSenseAI
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
python app.py
```

Backend runs at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# .env already points to http://localhost:5000/api
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET_KEY=your_jwt_secret
SECRET_KEY=your_flask_secret
DATABASE_URL=sqlite:///emotionsense.db
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get JWT |
| GET  | `/api/auth/me` | Get current user |

### Emotion Analysis
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/analyze` | Analyze text for emotion |

**Request:**
```json
{ "text": "I am so excited about my new internship!" }
```

**Response:**
```json
{
  "emotion": "happy",
  "confidence": 94,
  "emotion_probabilities": {
    "happy": 0.94, "sad": 0.01, "angry": 0.01,
    "fear": 0.01, "surprise": 0.02, "neutral": 0.01
  },
  "explanation": "The text contains positive language expressing excitement...",
  "suggested_response": "That's wonderful! Congratulations on the internship!"
}
```

### History
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/history` | Get paginated history |
| DELETE | `/api/history/:id` | Delete history entry |
| GET | `/api/history/export` | Export as CSV |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics` | Get user analytics |

---

## 🌐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Demo User | demo@emotionsense.ai | demo123 |
| Admin | admin@emotionsense.ai | admin123 |

---

## 📄 License

MIT License — feel free to use this for your own projects and learning.

---

## 👨‍💻 Author

Built with ❤️ as a Final Year Engineering Research Project.  
Powered by **React.js**, **Flask**, and **Google Gemini AI**.
