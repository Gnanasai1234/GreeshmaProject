# DiaPredict — Early Diabetes Detection

AI-powered diabetes risk prediction using React + Express + Flask ML.

## Quick Start

**Option A — One-click launch (Windows):**
```
Double-click start-all.bat
```

**Option B — Manual (3 terminals):**
```bash
# Terminal 1
cd ml-service && python app.py

# Terminal 2
cd server && npm start

# Terminal 3
cd client && npm run dev
```

Then open **http://localhost:3000**

---

## Stack

| Layer | Tech | Port |
|-------|------|------|
| Frontend | React + Vite + Tailwind | 3000 |
| Backend | Node.js + Express | 5000 |
| ML Service | Python Flask + Random Forest | 5001 |
| Database | MySQL | 3306 |

## Database Setup (first time only)

```bash
mysql -u root -p < server/config/schema.sql
```

Update `server/.env` with your MySQL password if needed.

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/predict` | Run diabetes prediction |
| GET | `/api/predictions/:userId` | Get prediction history |

## ML Model

- Dataset: Pima Indians Diabetes Dataset
- Model: Random Forest (100 trees)
- Accuracy: ~77% on 80/20 split
- Retrain: `cd ml-service && python train.py`
