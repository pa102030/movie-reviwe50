# MOVIES WORLD

### *Discover. Review. Watch.*

A premium, dark-cinematic movie discovery & review web app covering **every movie released from 2000 → 2026** — powered by the TMDB API, with an offline demo mode built in.

---

## ✨ Features

- Cinematic dark theme (with light mode toggle) · glassmorphism · fully responsive (6→4→3→2 cards per row)
- Dynamic home page: featured hero + 16 scrolling sections (Trending, Latest, Top Rated, Popular, Best of 2026/2025, 10 genre rows)
- **Live search overlay** — matches title, actor, director, genre and year as you type
- **Advanced filters** — year (2000–2026), genre, language, min rating (9+/8+/7+/6+), sort by popularity / rating / newest / oldest / title, with **Load More** pagination
- **Dynamic year pages**: `movies.html?year=2026` → "Best Movies of 2026"
- **Dynamic genre pages**: `genres.html?genre=horror` → popular / highest rated / latest
- **Movie detail page** (`movie.html?id=`) — backdrop hero, poster, full credits, story, JSON-LD schema
- **Original editorial review system** — overall score ring, animated category bars (Story / Acting / Direction / Cinematography / Music / VFX / Entertainment) + MOVIES WORLD Verdict
- **Legal "Where to Watch"** — stream / rent / buy buttons that open official platforms (Netflix, Prime Video, Disney+, Apple TV, Google TV, Max, Hulu, Peacock, Paramount+). **No pirated content, ever.**
- **Trailer modal** — embedded official YouTube player (API mode)
- **Watchlist & Favorites** — saved in `localStorage`
- Skeleton loaders, toast notifications, back-to-top, keyboard navigation, ARIA labels, focus states, alt text
- SEO: meta descriptions, Open Graph, Twitter cards, JSON-LD (WebSite + Movie), robots.txt, clean URL params
- Error handling everywhere: failed API → retry message; missing poster → styled placeholder; missing trailer → button hidden

---

## 🚀 Quick Start

```bash
# Option 1 — just open it (demo mode, works offline-ish)
open index.html            # or double-click it

# Option 2 — serve it properly (recommended, fetch() needs http://)
cd MOVIES-WORLD
python3 -m http.server 8080
# → http://localhost:8080
```

**Demo mode** uses the built-in `data/movies.json` (138 real movies, 2000–2026) — no key needed.

---

## 🔑 Unlock the FULL 2000–2026 catalog (600,000+ movies)

1. Get a free API key at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
2. Open `js/config.js` and paste it:

```js
const MW_CONFIG = {
  API_KEY: "your_key_here",   // ← paste here
  ...
};
```

That's it — the app automatically switches to TMDB mode: real posters, backdrops, trailers, watch providers and unlimited catalog browsing with pagination.

> ⚠️ **Never deploy a private key in client-side code.** For production use the backend proxy below.

---

## 🖥️ Optional Backend (recommended for production)

Store your key server-side and proxy requests:

```bash
mkdir backend && cd backend && npm init -y && npm install express node-fetch cors dotenv
```

`.env`:
```
TMDB_API_KEY=your_key_here
```

`backend/server.js`:
```js
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
app.use(cors());

const BASE = "https://api.themoviedb.org/3";
const KEY = process.env.TMDB_API_KEY;

app.get("/api/tmdb/*", async (req, res) => {
  const path = req.params[0];
  const qs = new URLSearchParams({ ...req.query, api_key: KEY, language: "en-US" });
  try {
    const r = await fetch(`${BASE}/${path}?${qs}`);
    res.status(r.status).json(await r.json());
  } catch (e) { res.status(500).json({ error: "proxy error" }); }
});

app.listen(3000, () => console.log("Proxy on :3000"));
// front-end: change MW_CONFIG.API_BASE to "http://localhost:3000/api/tmdb"
```

---

## 📁 File Structure

```
MOVIES-WORLD/
├── index.html          # Home: hero + 16 sections
├── movies.html         # Browse + filters + pagination (?year=2026 etc.)
├── movie.html          # Details + review + trailer + where to watch (?id=)
├── reviews.html        # Editorial reviews index
├── genres.html         # Genre index + genre pages (?genre=action)
├── watchlist.html      # LocalStorage watchlist & favorites
├── about.html / contact.html / privacy.html
├── css/style.css       # Complete design system (one file, responsive, a11y)
├── js/
│   ├── config.js       # API key + settings (EDIT THIS)
│   ├── api.js          # TMDB + demo data layer (cache, pagination)
│   ├── app.js          # Shared UI: cards, search, modal, toasts, theme
│   ├── home.js / movies.js / movie-details.js / watchlist.js / genres.js / reviews.js
├── data/movies.json    # 138 real movies 2000–2026 (demo mode)
├── assets/             # images / icons / logos
└── robots.txt
```

## ⚖️ Legal

This product uses the TMDB API but is not endorsed or certified by TMDB.
MOVIES WORLD **never hosts or links to pirated files** — all watch/rent/buy/download buttons open official licensed platforms.
