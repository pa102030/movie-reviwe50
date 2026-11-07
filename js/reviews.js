/* MOVIES WORLD - Reviews page: only show genuinely authored editorial reviews. */
"use strict";
document.addEventListener("mw:ready", async () => {
  const grid = document.getElementById("reviews-grid");
  skeletons(grid, 8);
  try {
    // TMDB popularity/ratings are not editorial reviews. Never label them as reviews.
    const reviewed = MW_API.isDemo()
      ? MW_API.all().filter(movie => movie.review && movie.review.body && movie.review.verdict)
          .sort((a, b) => b.rating - a.rating)
      : [];
    document.getElementById("reviews-count").textContent = reviewed.length;
    if (!reviewed.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
        <i class="fa-solid fa-pen-to-square"></i>
        <h3>Original movie reviews are coming soon</h3>
        <p>We are preparing independent editorial reviews. Movie ratings and database information are available in the Movies section.</p>
        <p><a class="btn btn-red" href="movies.html">Explore Movies</a></p>
      </div>`;
      return;
    }
    renderGrid(grid, reviewed);
  } catch (e) {
    console.error("Reviews page error:", e);
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i class="fa-solid fa-triangle-exclamation"></i><h3>Unable to load reviews right now</h3><p>Please try again.</p></div>`;
  }
});
