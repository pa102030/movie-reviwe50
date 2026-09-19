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

  // 2. Search Modal & Live Search Logic
  const searchModal = document.getElementById('search-modal');
  const openSearchBtns = document.querySelectorAll('[data-open-search]');
  const closeSearchBtn = document.getElementById('close-search');
  const searchInput = document.getElementById('search-input');
  const searchResultsGrid = document.getElementById('search-results-grid');

  // Open Search Modal
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

  // Close Search Modal
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

  // Live Movie Fetching Logic
  let debounceTimer;
  if (searchInput && searchResultsGrid) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      clearTimeout(debounceTimer);

      if (query.length < 2) {
        searchResultsGrid.innerHTML = '<p style="color:#94a3b8; text-align:center; grid-column:1/-1; padding:20px;">Type at least 2 characters...</p>';
        return;
      }

      // Show Loading State
      searchResultsGrid.innerHTML = '<p style="color:#94a3b8; text-align:center; grid-column:1/-1; padding:20px;"><i class="fa-solid fa-spinner fa-spin"></i> Searching movies...</p>';

      debounceTimer = setTimeout(async () => {
        // Safe fallback for API Key check
        const apiKey = (typeof CONFIG !== 'undefined' && CONFIG.TMDB_API_KEY) ? CONFIG.TMDB_API_KEY : '';

        if (!apiKey) {
          searchResultsGrid.innerHTML = '<p style="color:#e50914; text-align:center; grid-column:1/-1; padding:20px;">API Key Error! Check js/config.js file.</p>';
          return;
        }

        try {
          const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&include_adult=false`);
          
          if (!response.ok) {
            throw new Error('API request failed');
          }

          const data = await response.json();

          if (data.results && data.results.length > 0) {
            searchResultsGrid.innerHTML = data.results.slice(0, 12).map(movie => {
              const poster = movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : 'https://via.placeholder.com/500x750?text=No+Poster';
              const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
              const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

              return `
                <div class="search-movie-card" onclick="window.location.href='movie.html?id=${movie.id}'" style="cursor:pointer; background:rgba(255,255,255,0.04); border-radius:10px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); transition:transform 0.2s ease;">
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
            searchResultsGrid.innerHTML = '<p style="color:#94a3b8; text-align:center; grid-column:1/-1; padding:20px;">No movies found matching your query.</p>';
          }
        } catch (error) {
          console.error('Search Fetch Error:', error);
          searchResultsGrid.innerHTML = '<p style="color:#e50914; text-align:center; grid-column:1/-1; padding:20px;">Failed to fetch movies. Please try again.</p>';
        }
      }, 400);
    });
  }
});
