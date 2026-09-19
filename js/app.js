/* MOVIES WORLD - shared UI: cards, header, search overlay, modals, toasts, watchlist */
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

/* ---------- Main App & Dynamic Reviews Logic ---------- */
document.addEventListener('DOMContentLoaded', () => {

  // 1. Theme Toggle Setup
  const themeToggleBtn = document.querySelector('[data-theme-toggle]');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // 2. TMDB API Key Check
  const TMDB_API_KEY = (typeof CONFIG !== 'undefined' && CONFIG.TMDB_API_KEY) ? CONFIG.TMDB_API_KEY : '';

  // 3. Unique Editorial Reviews Database (Story එකට වඩා වෙනස් Critical Analysis)
  const customReviews = [
    {
      verdict: "A masterclass in modern cinema that redefines genre boundaries with breathless execution.",
      execution: "The seamless integration of sound architecture and intense practical camera work maintains an unbroken sense of immersion.",
      performance: "Lead performances deliver subtle emotional nuance without relying heavily on dialogue, letting expression drive narrative momentum.",
      recommendation: "Essential viewing for audiences seeking ambitious, high-stakes cinematic craftsmanship."
    },
    {
      verdict: "An emotionally resonant feature that relies on quiet intimacy rather than dramatic spectacle.",
      execution: "Pacing is deliberate and refined, allowing character dynamics space to breathe while visually building underlying tension.",
      performance: "The central cast demonstrates exceptional screen presence, transforming simple interactions into profound moments.",
      recommendation: "Highly recommended for viewers who appreciate deep character studies and elegant visual poetry."
    },
    {
      verdict: "A high-octane thriller engineered with relentless momentum and technical precision.",
      execution: "Sharp editing and immersive sound engineering propel every scene forward, ensuring zero downtime throughout the runtime.",
      performance: "Strong ensemble work supports the fast-paced narrative, providing believable grounding amidst constant conflict.",
      recommendation: "A top-tier pick for action aficionados looking for visual flair and genuine adrenaline."
    },
    {
      verdict: "A hauntingly atmospheric production that masters the art of psychological tension.",
      execution: "Lighting and environmental soundscapes create a claustrophobic aura that heightens suspense without cheap jump scares.",
      performance: "The lead performance captures vulnerability and grit with remarkable authenticity, anchoring the film's dark tone.",
      recommendation: "A standout release for fans of atmospheric horror and sophisticated psychological storytelling."
    },
    {
      verdict: "A visually stunning narrative that pushes creative boundaries in contemporary filmmaking.",
      execution: "Brilliant color grading and inventive camera angles elevate every sequence into a captivating visual canvas.",
      performance: "The actors bring striking energy and genuine chemistry, effortlessly carrying the emotional weight of the project.",
      recommendation: "Must-watch material for lovers of auteur-driven projects and groundbreaking cinematography."
    },
    {
      verdict: "A brilliantly layered narrative that balances sharp intellect with raw emotional gravity.",
      execution: "The directional choices highlight subtle thematic details, keeping the audience actively piecing together the broader picture.",
      performance: "Powerhouse dramatic turns from the entire cast elevate what could have been standard genre tropes into unforgettable moments.",
      recommendation: "Ideal for viewers seeking thought-provoking cinema that lingers long after the credits roll."
    },
    {
      verdict: "An inventive, lighthearted spectacle that delivers pure entertainment with genuine heart.",
      execution: "Vibrant art direction coupled with witty dialogue pacing creates an engaging, universally appealing atmosphere.",
      performance: "Charismatic lead portrayals give the story its infectious charm, creating instant rapport with the audience.",
      recommendation: "A perfect choice for a casual movie night that guarantees high engagement and feel-good energy."
    },
    {
      verdict: "A gritty, uncompromised piece of cinema that pulls no punches in its delivery.",
      execution: "Raw cinematography combined with naturalistic audio design creates an unvarnished, intensely believable world.",
      performance: "Unflinching, committed acting brings tremendous realism to character conflicts and high-stakes resolution.",
      recommendation: "Recommended for mature audiences looking for intense, uncompromising realistic drama."
    },
    {
      verdict: "A beautifully paced cinematic journey that balances grand spectacle with delicate human moments.",
      execution: "Massive scale filmmaking seamlessly combined with focused dramatic framing creates a compelling balance throughout.",
      performance: "The cast delivers grounded, highly relatable performances amidst sweeping, epic environmental set pieces.",
      recommendation: "A grand theatrical effort that succeeds on both an emotional and technical scale."
    },
    {
      verdict: "A captivating mystery constructed with tight narrative precision and unexpected turns.",
      execution: "The director carefully controls information flow, building steady curiosity through immaculate visual clues.",
      performance: "Subtle expressions and restrained acting choices maintain an aura of intrigue across the entire narrative arc.",
      recommendation: "A brilliant pick for fans of intricate suspense and clever storytelling mechanics."
    }
  ];

  // Helper function for Unique Review allocation per Movie ID
  function getUniqueReviewForMovie(movieId) {
    const index = Math.abs(parseInt(movieId) || 0) % customReviews.length;
    return customReviews[index];
  }

  // 4. Single Movie Page (movie.html) Rendering
  const movieDetailsContainer = document.getElementById('movie-details-container');
  if (movieDetailsContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    if (movieId && TMDB_API_KEY) {
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=credits`)
        .then(res => res.json())
        .then(movie => {
          const reviewData = getUniqueReviewForMovie(movie.id);
          const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '8.5';
          const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster';
          const backdrop = movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : '';
          const isWatchlisted = MWStore.inWatchlist(movie.id);

          movieDetailsContainer.innerHTML = `
            <!-- Hero Header -->
            <div style="position:relative; background: linear-gradient(to bottom, rgba(10,13,18,0.3), #0a0d12), url('${backdrop}') center/cover no-repeat; padding: 40px 20px; border-radius: 16px; margin-bottom: 30px; display: flex; gap: 30px; flex-wrap: wrap; align-items: center;">
              <img src="${poster}" alt="${movie.title}" style="width: 220px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); aspect-ratio: 2/3; object-fit: cover;">
              <div style="flex: 1; min-width: 280px;">
                <span style="background: #e50914; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase;">Official Detail</span>
                <h1 style="color: #f8fafc; font-size: 32px; margin: 10px 0 6px 0;">${movie.title} <span style="color:#94a3b8; font-size:22px;">(${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'})</span></h1>
                <p style="color: #f59e0b; font-size: 16px; font-weight: 700; margin-bottom: 16px;"><i class="fa-solid fa-star"></i> ${rating} / 10 <span style="color:#94a3b8; font-size:13px; font-weight:normal;">(${movie.vote_count || 0} votes)</span></p>
                
                <button id="btn-watchlist-toggle" class="btn btn-primary" style="margin-bottom: 15px; background: ${isWatchlisted ? '#10b981' : '#e50914'}; border: none; padding: 10px 20px; border-radius: 8px; color: #fff; font-weight: 600; cursor: pointer;">
                  <i class="fa-solid ${isWatchlisted ? 'fa-check' : 'fa-bookmark'}"></i> ${isWatchlisted ? 'In Watchlist' : 'Add to Watchlist'}
                </button>

                <div style="display:flex; gap:10px; flex-wrap:wrap;">
                  ${movie.genres ? movie.genres.map(g => `<span style="background:rgba(255,255,255,0.1); color:#cbd5e1; padding:4px 10px; border-radius:6px; font-size:12px;">${g.name}</span>`).join('') : ''}
                </div>
              </div>
            </div>

            <!-- SECTION 1: EDITORIAL REVIEW (Unique Critique) -->
            <section class="editorial-review-card" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 28px; border-radius: 16px; margin-bottom: 30px;">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 15px;">
                <div>
                  <span style="background: #e50914; color: #fff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">MOVIES WORLD EDITORIAL REVIEW</span>
                  <h2 style="color: #f8fafc; font-size: 22px; margin-top: 6px;"><i class="fa-solid fa-award" style="color: #f59e0b; margin-right: 8px;"></i> Critical Analysis & Verdict</h2>
                </div>
                <div style="display: flex; align-items: center; gap: 10px; background: rgba(245, 158, 11, 0.1); padding: 8px 16px; border-radius: 30px; border: 1px solid rgba(245, 158, 11, 0.3);">
                  <i class="fa-solid fa-star" style="color: #f59e0b; font-size: 18px;"></i>
                  <span style="color: #f8fafc; font-weight: 800; font-size: 16px;">${rating} / 10</span>
                </div>
              </div>

              <div style="color: #cbd5e1; font-size: 15px; line-height: 1.8;">
                <p style="margin-bottom: 14px;"><strong>Overall Verdict:</strong> ${reviewData.verdict}</p>
                <p style="margin-bottom: 14px;"><strong>Cinematic Execution:</strong> ${reviewData.execution}</p>
                <p style="margin-bottom: 14px;"><strong>Performance & Acting:</strong> ${reviewData.performance}</p>
                <p style="margin: 0; color: #f8fafc; font-weight: 600;"><i class="fa-solid fa-check-circle" style="color: #10b981; margin-right: 6px;"></i> <strong>Final Recommendation:</strong> ${reviewData.recommendation}</p>
              </div>
            </section>

            <!-- SECTION 2: PLOT SUMMARY (TMDB Official Story) -->
            <section class="story-card" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 28px; border-radius: 16px;">
              <h3 style="color: #f8fafc; font-size: 20px; margin-bottom: 14px; display: flex; align-items: center; gap: 10px;">
                <i class="fa-solid fa-book-open" style="color: #e50914;"></i> Plot Summary
              </h3>
              <p style="color: #cbd5e1; font-size: 15px; line-height: 1.8; margin: 0;">
                ${movie.overview || 'No official plot summary available for this title.'}
              </p>
            </section>
          `;

          // Watchlist button action listener
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
          movieDetailsContainer.innerHTML = '<p style="color:#e50914; text-align:center; padding:40px;">Failed to load movie details.</p>';
        });
    }
  }

  // 5. Search Modal & Live Fetching Logic
  const searchModal = document.getElementById('search-modal');
  const openSearchBtns = document.querySelectorAll('[data-open-search]');
  const closeSearchBtn = document.getElementById('close-search');
  const searchInput = document.getElementById('search-input');
  const searchResultsGrid = document.getElementById('search-results-grid');

  openSearchBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (searchModal) {
        searchModal.style.display = 'flex';
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        if (searchResultsGrid) {
          searchResultsGrid.innerHTML = '<p style="color:#94a3b8; text-align:center; grid-column:1/-1; padding:20px;">Type movie name to search...</p>';
        }
      }
    });
  });

  if (closeSearchBtn) {
    closeSearchBtn.addEventListener('click', () => {
      if (searchModal) searchModal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      searchModal.style.display = 'none';
    }
  });

  let debounceTimer;
  if (searchInput && searchResultsGrid) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      clearTimeout(debounceTimer);

      if (query.length < 2) {
        searchResultsGrid.innerHTML = '<p style="color:#94a3b8; text-align:center; grid-column:1/-1; padding:20px;">Type at least 2 characters...</p>';
        return;
      }

      searchResultsGrid.innerHTML = '<p style="color:#94a3b8; text-align:center; grid-column:1/-1; padding:20px;"><i class="fa-solid fa-spinner fa-spin"></i> Searching movies...</p>';

      debounceTimer = setTimeout(async () => {
        if (!TMDB_API_KEY) {
          searchResultsGrid.innerHTML = '<p style="color:#e50914; text-align:center; grid-column:1/-1; padding:20px;">API Key Missing! Please check js/config.js file.</p>';
          return;
        }

        try {
          const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`);
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            searchResultsGrid.innerHTML = data.results.slice(0, 12).map(movie => {
              const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster';
              const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
              const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

              return `
                <div class="search-movie-card" onclick="window.location.href='movie.html?id=${movie.id}'" style="cursor:pointer; background:rgba(255,255,255,0.04); border-radius:10px; overflow:hidden; border:1px solid rgba(255,255,255,0.08);">
                  <img src="${poster}" alt="${movie.title}" style="width:100%; aspect-ratio:2/3; object-fit:cover; display:block;">
                  <div style="padding:10px;">
                    <h4 style="color:#f8fafc; font-size:13px; font-weight:600; margin:0 0 4px 0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${movie.title}</h4>
                    <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; color:#94a3b8;">
                      <span><i class="fa-solid fa-star" style="color:#f59e0b;"></i> ${rating}</span>
                      <span>${year}</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('');
          } else {
            searchResultsGrid.innerHTML = '<p style="color:#94a3b8; text-align:center; grid-column:1/-1; padding:20px;">No movies found.</p>';
          }
        } catch (error) {
          console.error(error);
          searchResultsGrid.innerHTML = '<p style="color:#e50914; text-align:center; grid-column:1/-1; padding:20px;">Error fetching search results.</p>';
        }
      }, 400);
    });
  }
});
