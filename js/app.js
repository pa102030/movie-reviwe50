/* MOVIES WORLD - App Logic */
"use strict";

// Force hide preloader function
function removePreloader() {
  const p = document.getElementById("preloader");
  if (p) {
    p.style.opacity = "0";
    setTimeout(() => { p.style.display = "none"; }, 400);
  }
}

/* Local Storage Handler */
const MWStore = {
  get(key) { try { return JSON.parse(localStorage.getItem(key)) || []; } catch(e) { return []; } },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); },
  inWatchlist(id) { return MWStore.get("mw_watchlist").includes(+id); },
  toggle(key, id) {
    let list = MWStore.get(key);
    id = +id;
    const had = list.includes(id);
    list = had ? list.filter(x => x !== id) : [...list, id];
    MWStore.set(key, list);
    return !had;
  }
};

/* Unique Critical Review Data */
const customReviews = [
  {
    verdict: "A masterclass in modern cinema that redefines genre boundaries with breathless execution.",
    execution: "The seamless integration of sound architecture and intense practical camera work maintains continuous immersion.",
    recommendation: "Essential viewing for audiences seeking ambitious, high-stakes cinematic craftsmanship."
  },
  {
    verdict: "An emotionally resonant feature that relies on quiet intimacy rather than dramatic spectacle.",
    execution: "Pacing is deliberate and refined, allowing character dynamics space to breathe while building tension.",
    recommendation: "Highly recommended for viewers who appreciate deep character studies and visual poetry."
  },
  {
    verdict: "A high-octane thriller engineered with relentless momentum and technical precision.",
    execution: "Sharp editing and immersive sound engineering propel every scene forward with zero downtime.",
    recommendation: "A top-tier pick for action aficionados looking for visual flair and genuine adrenaline."
  }
];

function getUniqueReview(id) {
  return customReviews[Math.abs(parseInt(id) || 0) % customReviews.length];
}

document.addEventListener('DOMContentLoaded', () => {

  // Theme Toggle
  const themeToggleBtn = document.querySelector('[data-theme-toggle]');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', cur === 'light' ? 'dark' : 'light');
    });
  }

  // Load Movie Details
  const container = document.getElementById('movie-details-container');
  if (container) {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    const apiKey = (typeof CONFIG !== 'undefined' && CONFIG.TMDB_API_KEY) ? CONFIG.TMDB_API_KEY : '';

    if (!movieId) {
      container.innerHTML = '<p style="color:#e50914; text-align:center; padding:50px;">No Movie ID selected! Please go back and select a movie.</p>';
      removePreloader();
      return;
    }

    if (!apiKey) {
      container.innerHTML = '<p style="color:#e50914; text-align:center; padding:50px;">API Key missing in js/config.js!</p>';
      removePreloader();
      return;
    }

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
      .then(res => res.json())
      .then(movie => {
        if (!movie.title) throw new Error("Movie not found");

        const review = getUniqueReview(movie.id);
        const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster';
        const backdrop = movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : '';
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
        const isSaved = MWStore.inWatchlist(movie.id);

        container.innerHTML = `
          <div style="position:relative; background: linear-gradient(to bottom, rgba(10,13,18,0.3), #0a0d12), url('${backdrop}') center/cover no-repeat; padding: 30px 20px; border-radius: 16px; margin-bottom: 30px; display: flex; gap: 25px; flex-wrap: wrap; align-items: center;">
            <img src="${poster}" alt="${movie.title}" style="width: 200px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); aspect-ratio: 2/3; object-fit: cover;">
            <div style="flex: 1; min-width: 260px;">
              <h1 style="color: #f8fafc; font-size: 30px; margin: 0 0 10px 0;">${movie.title} <span style="color:#94a3b8; font-size:20px;">(${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'})</span></h1>
              <p style="color: #f59e0b; font-size: 16px; font-weight: 700; margin-bottom: 20px;"><i class="fa-solid fa-star"></i> ${rating} / 10</p>
              
              <button id="wl-btn" style="background: ${isSaved ? '#10b981' : '#e50914'}; border: none; padding: 10px 20px; border-radius: 8px; color: #fff; font-weight: 600; cursor: pointer;">
                <i class="fa-solid ${isSaved ? 'fa-check' : 'fa-bookmark'}"></i> ${isSaved ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
            </div>
          </div>

          <!-- Section 1: Editorial Review -->
          <section style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 25px; border-radius: 16px; margin-bottom: 25px;">
            <h2 style="color: #f8fafc; font-size: 20px; margin-bottom: 12px;"><i class="fa-solid fa-award" style="color: #f59e0b;"></i> Editorial Review</h2>
            <p style="color: #cbd5e1; line-height: 1.7;"><strong>Verdict:</strong> ${review.verdict}</p>
            <p style="color: #cbd5e1; line-height: 1.7;"><strong>Execution:</strong> ${review.execution}</p>
            <p style="color: #cbd5e1; line-height: 1.7;"><strong>Recommendation:</strong> ${review.recommendation}</p>
          </section>

          <!-- Section 2: Movie Story -->
          <section style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 25px; border-radius: 16px;">
            <h3 style="color: #f8fafc; font-size: 20px; margin-bottom: 12px;"><i class="fa-solid fa-book-open" style="color: #e50914;"></i> Story</h3>
            <p style="color: #cbd5e1; line-height: 1.7; margin: 0;">${movie.overview || 'No story overview available.'}</p>
          </section>
        `;

        document.getElementById('wl-btn')?.addEventListener('click', function() {
          const added = MWStore.toggle("mw_watchlist", movie.id);
          this.style.background = added ? '#10b981' : '#e50914';
          this.innerHTML = `<i class="fa-solid ${added ? 'fa-check' : 'fa-bookmark'}"></i> ${added ? 'In Watchlist' : 'Add to Watchlist'}`;
        });
      })
      .catch(err => {
        console.error(err);
        container.innerHTML = '<p style="color:#e50914; text-align:center; padding:50px;">Failed to fetch movie details. Please check TMDB API key.</p>';
      })
      .finally(() => {
        removePreloader();
      });
  } else {
    removePreloader();
  }
});

// Emergency fallback: Hide preloader after 1.5 seconds no matter what
setTimeout(removePreloader, 1500);
