/* MOVIES WORLD - Home page */
"use strict";
document.addEventListener("mw:ready", async () => {
  const heroBg = document.getElementById("hero-bg");
  const heroContent = document.getElementById("hero-content");
  const container = document.getElementById("home-sections");

  const featuredPromise = MW_API.featured().catch(error => {
    console.warn("Featured movie unavailable:", error);
    return null;
  });

  if (heroBg) {
    heroBg.innerHTML = '<div class="hero-ph" style="position:absolute;inset:0;background:linear-gradient(120deg,#141e30,#243b55 45%,#0f0c29)"></div>';
  }
  if (heroContent) {
    heroContent.innerHTML = '<div class="hero-badge">MOVIES WORLD</div><h1 class="hero-title">Discover Your Next Favourite Movie</h1><p class="hero-desc">Explore films, cast details, ratings and trailers.</p><div class="hero-actions"><a class="btn btn-red" href="movies.html">Browse Movies</a><a class="btn btn-glass" href="genres.html">Explore Genres</a></div>';
  }
  if (!container) return;

  const Y = Math.min(new Date().getFullYear(), 2026);
  const sections = [
    { title: "Trending Movies", link: "movies.html?sort=popularity", fetcher: () => MW_API.discover({ sort: "popularity", size: 12 }).then(r => r.results) },
    { title: "Latest Releases", link: "movies.html?sort=newest", fetcher: () => MW_API.discover({ sort: "newest", size: 12 }).then(r => r.results) },
    { title: "Top Rated Movies", link: "movies.html?sort=rating", fetcher: () => MW_API.discover({ sort: "rating", minRating: 7.5, size: 12 }).then(r => r.results) },
    { title: "Popular Movies", link: "movies.html?sort=popularity", fetcher: () => MW_API.discover({ sort: "popularity", size: 12, minRating: 6.5 }).then(r => r.results) },
    { title: `Best Movies of ${Y}`, link: `movies.html?year=${Y}`, fetcher: () => MW_API.discover({ year: Y, sort: "rating", size: 12 }).then(r => r.results) },
    { title: `Best Movies of ${Y - 1}`, link: `movies.html?year=${Y - 1}`, fetcher: () => MW_API.discover({ year: Y - 1, sort: "rating", size: 12 }).then(r => r.results) },
    { title: "Action", link: "genres.html?genre=Action", fetcher: () => MW_API.discover({ genre: "Action", sort: "popularity", size: 12 }).then(r => r.results) },
    { title: "Adventure", link: "genres.html?genre=Adventure", fetcher: () => MW_API.discover({ genre: "Adventure", sort: "popularity", size: 12 }).then(r => r.results) },
    { title: "Comedy", link: "genres.html?genre=Comedy", fetcher: () => MW_API.discover({ genre: "Comedy", sort: "popularity", size: 12 }).then(r => r.results) },
    { title: "Drama", link: "genres.html?genre=Drama", fetcher: () => MW_API.discover({ genre: "Drama", sort: "popularity", size: 12 }).then(r => r.results) },
    { title: "Horror", link: "genres.html?genre=Horror", fetcher: () => MW_API.discover({ genre: "Horror", sort: "popularity", size: 12 }).then(r => r.results) },
    { title: "Sci-Fi", link: "genres.html?genre=Sci-Fi", fetcher: () => MW_API.discover({ genre: "Sci-Fi", sort: "popularity", size: 12 }).then(r => r.results) },
    { title: "Romance", link: "genres.html?genre=Romance", fetcher: () => MW_API.discover({ genre: "Romance", sort: "popularity", size: 12 }).then(r => r.results) },
    { title: "Thriller", link: "genres.html?genre=Thriller", fetcher: () => MW_API.discover({ genre: "Thriller", sort: "popularity", size: 12 }).then(r => r.results) },
    { title: "Animation", link: "genres.html?genre=Animation", fetcher: () => MW_API.discover({ genre: "Animation", sort: "popularity", size: 12 }).then(r => r.results) },
    { title: "Crime", link: "genres.html?genre=Crime", fetcher: () => MW_API.discover({ genre: "Crime", sort: "popularity", size: 12 }).then(r => r.results) }
  ];

  // Each section is inserted synchronously in display order; its API request
  // runs concurrently so one slow row cannot block all following rows.
  const sectionsPromise = Promise.all(sections.map(section => renderRow({ ...section, container })));

  const featured = await featuredPromise;
  if (featured && heroContent) {
    if (featured.backdrop && heroBg) {
      heroBg.innerHTML = `<img src="${featured.backdrop}" alt="" fetchpriority="high">`;
    }
    const g = featured.genres || [];
    heroContent.innerHTML = `
      <span class="hero-badge"><i class="fa-solid fa-fire"></i> Featured Movie</span>
      <h1 class="hero-title">${esc(featured.title)}</h1>
      <p class="hero-tagline">${esc(featured.tagline || "")}</p>
      <div class="hero-meta">
        <span class="rate"><i class="fa-solid fa-star"></i> ${featured.rating ? featured.rating.toFixed(1) : "—"}<span style="color:var(--text-3);font-weight:500">/10</span></span>
        <span class="dot"></span><span>${featured.year || ""}</span><span class="dot"></span>
        <span>${featured.runtime ? featured.runtime + " min" : ""}</span><span class="dot"></span>
        <span>${esc(g.slice(0, 3).join(" · "))}</span>
      </div>
      <p class="hero-desc">${esc(featured.overview || "")}</p>
      <div class="hero-actions">
        <a class="btn btn-red" href="movie.html?id=${featured.id}"><i class="fa-solid fa-circle-info"></i> Movie Details</a>
        <button class="btn btn-glass" data-trailer="${featured.id}"><i class="fa-solid fa-play"></i> Watch Trailer</button>
        <a class="btn btn-gold" href="movie.html?id=${featured.id}#watch"><i class="fa-solid fa-ticket"></i> Where to Watch</a>
        <button class="btn btn-ghost" data-watchlist="${featured.id}"><i class="fa-solid fa-plus"></i> Add to Watchlist</button>
      </div>`;
    bindCardButtons(heroContent);
  }
  await sectionsPromise;
});
