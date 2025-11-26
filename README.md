# NASA APOD Explorer

A modern, interactive explorer for **NASA’s Astronomy Picture of the Day (APOD)**.
This project contains a Node/Express backend that proxies and caches NASA APOD results and a React (Vite + Tailwind) frontend with an immersive space-themed UI.

Live demo: https://nasa-apod-explorer-ejyr.onrender.com/

---

## Highlights — Implemented Features

### Frontend (React + Vite)

* Intro Landing Animation
* Custom animated star cursor
* Responsive glass‑morphism UI
* Dashboard with **Today’s APOD**
* Timeline Date Picker (Year/Month/Day slider)
* Right‑side Live Preview panel

  * Loads image preview
  * Shows video note if APOD is video
  * Swiper carousel fallback
* Gallery of APODs (recent 8 days)

  * Image cards
  * YouTube thumbnail support
  * APOD page video support
* Modal viewer with explanation
* Scroll‑fade animations
* Image preload + loading spinners
* Fully responsive mobile → desktop

### Backend (Node + Express)

* REST API endpoints:

  * `GET /api/apod/today`
  * `GET /api/apod?date=YYYY-MM-DD`
  * `GET /api/apod/range?start_date=...&end_date=...`
* NASA API proxying (secure key handling)
* LRU Caching (TTL + max size)
* Video extraction:

  * Extract YouTube video ID
  * Extract direct MP4 from APOD HTML pages
* Error handling (invalid date, API failure, rate limits)
* Serves compiled React build in production

---

## Repository Structure

```
Nasa-Apod-Explorer/
├── backend/
│   ├── server.js
│   ├── routes/apod.js
│   ├── lib/cache.js
│   ├── package.json
│   └── .env  (local only)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── index.css
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── render.yaml
└── README.md
```

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/Praneket/Nasa-Apod-Explorer.git
cd Nasa-Apod-Explorer
```

### Backend Setup

Create **backend/.env**:

```
NASA_API_KEY=ENTER_YOUR_API_KEY
PORT=5000
CACHE_TTL_SECONDS=86400
CACHE_MAX_ITEMS=200
```

Run backend:

```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Open the Vite dev URL.

<img width="1364" height="599" alt="Screenshot 2025-11-25 231645" src="https://github.com/user-attachments/assets/58625274-2cb1-4480-8164-992ccacc640b" />

<img width="1364" height="596" alt="Screenshot 2025-11-25 231708" src="https://github.com/user-attachments/assets/5979714b-fa3f-4a30-bbb6-ef475371c0de" />

<img width="1363" height="589" alt="Screenshot 2025-11-25 231730" src="https://github.com/user-attachments/assets/b8b30170-4b5b-4733-ba55-1c30f2137748" />

---

