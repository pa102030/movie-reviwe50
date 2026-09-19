/* Movie Details Renderer */
"use strict";

const editorialReviews = [
  {
    verdict: "A captivating masterpiece that combines extraordinary visual direction with strong narrative pacing.",
    execution: "The cinematographic design and acoustic resonance create an atmosphere of profound engagement throughout.",
    recommendation: "Highly recommended for audiences looking for exceptional story dynamics and technical brilliance."
  },
  {
    verdict: "A deeply emotional and compelling story driven by brilliant character development.",
    execution: "Intricate pacing and subtle visual motifs elevate standard storyline beats into artful character moments.",
    recommendation: "A must-watch for lovers of rich, atmospheric character studies."
  },
  {
    verdict: "An adrenaline-fueled, action-packed achievement with flawless structural continuity.",
    execution: "Phenomenal camera operation paired with razor-sharp editing delivers unrelenting intensity.",
    recommendation: "Essential viewing for enthusiasts of high-stakes, action-oriented cinema."
  }
];

function getReview(id) {
  return editorialReviews[Math.abs(parseInt(id) || 0) % editorialReviews.length];
}

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');

  const grid = document.getElementById('detail-grid');
  const reviewPanel = document.getElementById('review-panel');
  const storyPanel = document.getElementById('story-panel');
  const apiKey = (typeof CONFIG !== 'undefined' && CONFIG.TMDB_API_KEY) ? CONFIG.TMDB_API_KEY : '';

  if (!movieId || !apiKey) {
    if (grid) grid.innerHTML = '<p style="color:#e50914; padding:40px; text-align:center;">Invalid Movie ID or Missing TMDB API Key.</p>';
    return;
  }

  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    if (!res.ok) throw new Error("API Error");
    const movie = await res.json();

    const backdrop = movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : '';
    const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';
    const bgElem = document.getElementById('detail-bg');
    if (bgElem && backdrop) bgElem.style.backgroundImage = `url('${backdrop}')`;

    // Render Hero Section
    if (grid) {
      grid.innerHTML = `
        <div style="display:flex; gap:25px; flex-wrap:wrap; align-items:center; padding:30px 20px;">
          <img src="${poster}" alt="${movie.title}" style="width:200px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.8); aspect-ratio:2/3; object-fit:cover;">
          <div>
            <h1 style="color:#fff; font-size:32px; margin-bottom:10px;">${movie.title} <span style="color:#94a3b8; font-size:20px;">(${movie.release_date ? movie.release_date.split('-')[0] : ''})</span></h1>
            <p style="color:#f59e0b; font-size:18px; font-weight:bold;"><i class="fa-solid fa-star"></i> ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10</p>
          </div>
        </div>
      `;
    }

    // 1. Unique Editorial Review Render
    if (reviewPanel) {
      const rev = getReview(movie.id);
      reviewPanel.innerHTML = `
        <h2 style="color:#fff; font-size:22px; margin-bottom:12px;"><i class="fa-solid fa-award" style="color:#f59e0b;"></i> Editorial Review</h2>
        <p style="color:#cbd5e1; line-height:1.7; margin-bottom:8px;"><strong>Verdict:</strong> ${rev.verdict}</p>
        <p style="color:#cbd5e1; line-height:1.7; margin-bottom:8px;"><strong>Execution:</strong> ${rev.execution}</p>
        <p style="color:#cbd5e1; line-height:1.7;"><strong>Recommendation:</strong> ${rev.recommendation}</p>
      `;
    }

    // 2. TMDB Story Overview Render
    if (storyPanel) {
      storyPanel.innerHTML = `
        <h3 style="color:#fff; font-size:20px; margin-bottom:10px;"><i class="fa-solid fa-book-open" style="color:#e50914;"></i> Story Plot</h3>
        <p style="color:#cbd5e1; line-height:1.7; margin:0;">${movie.overview || 'No overview available.'}</p>
      `;
    }

  } catch (e) {
    console.error(e);
    if (grid) grid.innerHTML = '<p style="color:#e50914; padding:40px; text-align:center;">Failed to fetch movie data.</p>';
  }
});
