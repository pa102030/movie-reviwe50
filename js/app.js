/* MOVIES WORLD - shared UI */
"use strict";

/* ---------- storage: watchlist & favorites ---------- */
const MWStore = {
  get(key) { try { return JSON.parse(localStorage.getItem(key)) || []; } catch(e) { return []; } },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); },
  inWatchlist(id) { return MWStore.get("mw_watchlist").includes(+id); },
  inFavorites(id) { return MWStore.get("mw_favorites").includes(+id); },
  toggle(key, id) {
    let list = MWStore.get(key);
    id = +id;
    const had = list.includes(id);
    list = had ? list.filter(x => x !== id) : [...list, id];
    MWStore.set(key, list);
    return !had;
  }
};

/* ---------- toast notifications ---------- */
function toast(msg, icon = "fa-circle-check") {
  let wrap = document.querySelector(".toast-wrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "toast-wrap";
    document.body.appendChild(wrap);
  }
  const t = document.createElement("div");
  t.className = "toast-msg";
  t.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${msg}</span>`;
  wrap.appendChild(t);
  setTimeout(() => { t.classList.add("show"); }, 10);
  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.remove(), 300);
  }, 3000);
}

/* ---------- Main App & Movie Details Logic ---------- */
document.addEventListener('DOMContentLoaded', () => {

  // Theme Toggle
  const themeToggleBtn = document.querySelector('[data-theme-toggle]');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // TMDB API Key Fetching safely
  const TMDB_API_KEY = (typeof CONFIG !== 'undefined' && CONFIG.TMDB_API_KEY) ? CONFIG.TMDB_API_KEY : '';

  // Editorial Reviews Database
  const customReviews = [
    {
      verdict: "A masterclass in modern cinema that redefines genre boundaries with breathless execution.",
      execution: "The seamless integration of sound architecture and intense practical camera work maintains an unbroken sense of immersion.",
      recommendation: "Essential viewing for audiences seeking ambitious, high-stakes cinematic craftsmanship."
    },
    {
      verdict: "An emotionally resonant feature that relies on quiet intimacy rather than dramatic spectacle.",
      execution: "Pacing is deliberate and refined, allowing character dynamics space to breathe while visually building underlying tension.",
      recommendation: "Highly recommended for viewers who appreciate deep character studies."
    },
    {
      verdict: "A high-octane thriller engineered with relentless momentum and technical precision.",
      execution: "Sharp editing and immersive sound engineering propel every scene forward with zero downtime.",
      recommendation: "A top-tier pick for action aficionados looking for visual flair and genuine adrenaline."
    }
  ];

  function getUniqueReviewForMovie(movieId) {
    const index = Math.abs(parseInt(movieId) || 0) % customReviews.length;
    return customReviews[index];
  }

  // Movie Details Page logic
  const movieDetailsContainer = document.getElementById('movie-details-container');
  if (movieDetailsContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    if (!movieId) {
      movieDetailsContainer.innerHTML = '<p style="color:#e50914; text-align:center; padding:40px;">No Movie ID found in URL!</p>';
      return;
    }

    if (!TMDB_API_KEY) {
      movieDetailsContainer.innerHTML = '<p style="color:#e50914; text-align:center; padding:40px;">TMDB API Key missing! Check js/config.js file.</p>';
      return;
    }

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=credits`)
      .then(res => {
        if (!res.ok) throw new Error("API request failed");
        return res.json();
      })
      .then(movie => {
        const reviewData = getUniqueReviewForMovie(movie.id);
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '8.5';
        const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster';
        const backdrop = movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : '';
        const isWatchlisted = MWStore.inWatchlist(movie.id);

        movieDetailsContainer.innerHTML = `
          <div style="position:relative; background: linear-gradient(to bottom, rgba(10,13,18,0.3), #0a0d12), url('${backdrop}') center/cover no-repeat; padding: 40px 20px; border-radius: 16px; margin-bottom: 30px; display: flex; gap: 30px; flex-wrap: wrap; align-items: center;">
            <img src="${poster}" alt="${movie.title}" style="width: 220px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); aspect-ratio: 2/3; object-fit: cover;">
            <div style="flex: 1; min-width: 280px;">
              <span style="background: #e50914; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700;">OFFICIAL DETAIL</span>
              <h1 style="color: #f8fafc; font-size: 32px; margin: 10px 0 6px 0;">${movie.title} <span style="color:#94a3b8; font-size:22px;">(${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'})</span></h1>
              <p style="color: #f59e0b; font-size: 16px; font-weight: 700; margin-bottom: 16px;"><i class="fa-solid fa-star"></i> ${rating} / 10</p>
              
              <button id="btn-watchlist-toggle" class="btn btn-primary" style="margin-bottom: 15px; background: ${isWatchlisted ? '#10b981' : '#e50914'}; border: none; padding: 10px 20px; border-radius: 8px; color: #fff; font-weight: 600; cursor: pointer;">
                <i class="fa-solid ${isWatchlisted ? 'fa-check' : 'fa-bookmark'}"></i> ${isWatchlisted ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
            </div>
          </div>

          <!-- Section 1: Review -->
          <section style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 28px; border-radius: 16px; margin-bottom: 30px;">
            <h2 style="color: #f8fafc; font-size: 22px; margin-bottom: 15px;"><i class="fa-solid fa-award" style="color: #f59e0b;"></i> Editorial Review</h2>
            <p style="color: #cbd5e1; line-height: 1.8; margin-bottom: 10px;"><strong>Verdict:</strong> ${reviewData.verdict}</p>
            <p style="color: #cbd5e1; line-height: 1.8; margin-bottom: 10px;"><strong>Execution:</strong> ${reviewData.execution}</p>
            <p style="color: #cbd5e1; line-height: 1.8;"><strong>Recommendation:</strong> ${reviewData.recommendation}</p>
          </section>

          <!-- Section 2: Story -->
          <section style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 28px; border-radius: 16px;">
            <h3 style="color: #f8fafc; font-size: 20px; margin-bottom: 14px;"><i class="fa-solid fa-book-open" style="color: #e50914;"></i> Story</h3>
            <p style="color: #cbd5e1; line-height: 1.8; margin: 0;">${movie.overview || 'No overview available.'}</p>
          </section>
        `;

        const wlBtn = document.getElementById('btn-watchlist-toggle');
        if (wlBtn) {
          wlBtn.addEventListener('click', () => {
            const added = MWStore.toggle("mw_watchlist", movie.id);
            wlBtn.style.background = added ? '#10b981' : '#e50914';
            wlBtn.innerHTML = `<i class="fa-solid ${added ? 'fa-check' : 'fa-bookmark'}"></i> ${added ? 'In Watchlist' : 'Add to Watchlist'}`;
            toast(added ? 'Added to Watchlist!' : 'Removed from Watchlist!');
          });
        }
      })
      .catch(err => {
        console.error(err);
        movieDetailsContainer.innerHTML = '<p style="color:#e50914; text-align:center; padding:40px;">Error loading movie details. Please check your internet connection or API Key.</p>';
      });
  }
});
