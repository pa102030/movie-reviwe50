/* MOVIES WORLD - Watchlist page */
"use strict";

document.addEventListener("mw:ready", async () => {
  const grid = document.getElementById("watchlist-grid");
  const empty = document.getElementById("watchlist-empty");
  const clearBtn = document.getElementById("clear-watchlist");
  const favOnly = document.getElementById("show-favorites");

  // Sync active user ID helper
  function getActiveUid() {
    let uid = "guest";
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("firebase:authUser:")) {
          const userData = JSON.parse(localStorage.getItem(key));
          if (userData && userData.uid) {
            uid = userData.uid;
            break;
          }
        }
      }
    } catch (e) {}
    return uid;
  }

  async function render() {
    const uid = getActiveUid();
    const isFav = favOnly.checked;
    const baseKey = isFav ? "mw_favorites" : "mw_watchlist";
    const userKey = `${baseKey}_${uid}`;
    
    let storedIds = [];
    try {
      storedIds = JSON.parse(localStorage.getItem(userKey)) || [];
    } catch (e) {
      storedIds = [];
    }

    grid.innerHTML = "";
    if (!storedIds.length) {
      empty.style.display = "";
      empty.querySelector("h3").textContent = isFav ? "No favorites yet." : "Your watchlist is empty.";
      grid.style.display = "none"; 
      clearBtn.style.display = "none";
      document.getElementById("wl-count").textContent = "0";
      return;
    }
    
    empty.style.display = "none"; 
    grid.style.display = ""; 
    clearBtn.style.display = "";
    
    skeletons(grid, Math.min(storedIds.length, 8));
    const movies = [];
    for (const id of storedIds) {
      try { movies.push(await MW_API.getMovie(id)); } catch (e) { /* skip missing */ }
    }
    renderGrid(grid, movies);
    document.getElementById("wl-count").textContent = movies.length;
  }

  favOnly.addEventListener("change", render);
  
  clearBtn.addEventListener("click", () => {
    const uid = getActiveUid();
    const isFav = favOnly.checked;
    const userKey = `${isFav ? "mw_favorites" : "mw_watchlist"}_${uid}`;
    
    localStorage.removeItem(userKey);
    toast("List cleared", "fa-trash-can"); 
    render();
  });

  document.addEventListener("mw:watchlist-changed", () => { 
    if (!favOnly.checked) render(); 
  });
  
  render();
});
