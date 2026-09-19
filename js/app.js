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

  // Search Modal Elements
  const searchModal = document.getElementById('search-modal');
  const openSearchBtns = document.querySelectorAll('[data-open-search]');
  const closeSearchBtn = document.getElementById('close-search');
  const searchInput = document.getElementById('search-input');
  const searchResultsGrid = document.getElementById('search-results-grid');

  // Open Search Popup
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
          searchResultsGrid.innerHTML = '<p style="color:#94a3b8; text-align:center; grid-column:1/-1;">Type at least 2 characters to search...</p>';
        }
      }
    });
  });

  // Close Search Popup
  if (closeSearchBtn) {
    closeSearchBtn.addEventListener('click', () => {
      if (searchModal) searchModal.style.display = 'none';
    });
  }

  // Close Modal on Outside Click
  window.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      searchModal.style.display = 'none';
    }
  });

  // Live TMDB Search API Request
  let debounceTimer;
  if (searchInput && searchResultsGrid) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      clearTimeout(debounceTimer);

      if (query.length < 2) {
        searchResultsGrid.innerHTML = '<p style="color:#94a3b8; text-align:center; grid-column:1/-1;">Type at least 2 characters to search...</p>';
        return;
      }

      debounceTimer = setTimeout(async () => {
        searchResultsGrid.innerHTML = '<p style="color:#94a3b8; text-align:center; grid-column:1/-1;">Searching...</p>';
        try {
          const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${CONFIG.TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            searchResultsGrid.innerHTML = data.results.slice(0, 12).map(movie => `
              <div class="movie-card" onclick="window.location.href='movie.html?id=${movie.id}'" style="cursor:pointer; background:rgba(255,255,255,0.03); border-radius:10px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); padding:8px;">
                <img src="${movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'https://via.placeholder.com/500x750?text=No+Poster'}" alt="${movie.title}" style="width:100%; aspect-ratio:2/3; object-fit:cover; border-radius:6px;">
                <div style="padding:8px 4px 4px 4px;">
                  <h4 style="color:#f8fafc; font-size:13px; margin:0 0 4px 0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${movie.title}</h4>
                  <span style="color:#f59e0b; font-size:12px;"><i class="fa-solid fa-star"></i> ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                </div>
              </div>
            `).join('');
          } else {
            searchResultsGrid.innerHTML = '<p style="color:#94a3b8; text-align:center; grid-column:1/-1;">No movies found.</p>';
          }
        } catch (error) {
          console.error('Search error:', error);
          searchResultsGrid.innerHTML = '<p style="color:#e50914; text-align:center; grid-column:1/-1;">Failed to load search results.</p>';
        }
      }, 400);
    });
  }
});
