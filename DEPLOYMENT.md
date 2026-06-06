# 🚀 EmotionSense AI — Deployment Guide

Complete step-by-step guide to deploy EmotionSense AI to production.

---

## 📋 Prerequisites

- GitHub account
- Vercel account (free) — https://vercel.com
- Render account (free) — https://render.com
- Google Gemini API key — https://ai.google.dev

---

## 1️⃣ Local Development Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env — set GEMINI_API_KEY
python app.py
# ✅ Running on http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api  (default)
npm run dev
# ✅ Running on http://localhost:5173
```

---

## 2️⃣ Deploy Backend on Render

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/emotionsense-ai.git
git push -u origin main
```

### Step 2 — Create Web Service on Render
1. Go to https://render.com → **New → Web Service**
2. Connect your GitHub repository
3. Set the following:
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app --workers 2 --bind 0.0.0.0:$PORT`

### Step 3 — Add Environment Variables on Render
In the Render dashboard under **Environment**:

```
GEMINI_API_KEY    = your_actual_gemini_api_key
JWT_SECRET_KEY    = generate_a_random_64_char_string
SECRET_KEY        = generate_a_random_64_char_string
DATABASE_URL      = (auto-set if using Render PostgreSQL)
```

### Step 4 — Add PostgreSQL (optional but recommended)
1. Render Dashboard → **New → PostgreSQL**
2. Create database named `emotionsense-db`
3. Copy the **Internal Database URL**
4. Set `DATABASE_URL` environment variable on your web service

### Step 5 — Deploy
Click **Deploy** — wait ~3 minutes. Your backend URL will be:
```
https://emotionsense-ai-backend.onrender.com
```

---

## 3️⃣ Deploy Frontend on Vercel

### Step 1 — Install Vercel CLI (optional)
```bash
npm install -g vercel
```

### Step 2 — Deploy via Vercel Dashboard
1. Go to https://vercel.com → **New Project**
2. Import your GitHub repository
3. Set **Root Directory** to `frontend`
4. Framework preset: **Vite**

### Step 3 — Add Environment Variable
In Vercel project settings → **Environment Variables**:
```
VITE_API_URL = https://your-render-backend-url.onrender.com/api
```

### Step 4 — Deploy
Click **Deploy** — done in ~2 minutes. Your app will be at:
```
https://emotionsense-ai.vercel.app
```

---

## 4️⃣ PostgreSQL Setup (Manual)

If you prefer a separate PostgreSQL host (e.g., Supabase, ElephantSQL):

```bash
# Install psycopg2
pip install psycopg2-binary

# Set DATABASE_URL in backend .env
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

The app auto-creates all tables on first startup via `db.create_all()`.

---

## 5️⃣ Production Checklist

- [ ] Set strong random `JWT_SECRET_KEY` and `SECRET_KEY`
- [ ] Set `GEMINI_API_KEY` in backend environment
- [ ] Set `VITE_API_URL` to Render backend URL in Vercel
- [ ] Enable HTTPS on both services (automatic on Vercel/Render)
- [ ] Test demo login: `demo@emotionsense.ai` / `demo123`
- [ ] Test admin login: `admin@emotionsense.ai` / `admin123`
- [ ] Test emotion analysis end-to-end

---

## 🔧 Troubleshooting

### "CORS error" in browser
- Ensure `VITE_API_URL` points to your actual Render URL
- Render URL must NOT have a trailing slash
- Backend must be running (check Render logs)

### "502 Bad Gateway" on /api/analyze
- Check Render logs for Python errors
- Verify `GEMINI_API_KEY` is set correctly
- The app falls back to mock analysis if no key is set

### Database connection errors
- For PostgreSQL: ensure `DATABASE_URL` starts with `postgresql://` not `postgres://` (the app handles this automatically)
- For SQLite local: ensure the `backend/` directory is writable

---

## 📊 Architecture Diagram

```
User Browser
    │
    ▼
Vercel CDN
[React SPA]
    │  HTTPS API calls
    ▼
Render Web Service
[Flask REST API]
    │              │
    ▼              ▼
Render PostgreSQL  Google Gemini API
[Database]         [AI Analysis]
```

---

Built with ❤️ — EmotionSense AI Final Year Research Project
