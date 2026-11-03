/* MOVIES WORLD - Watchlist page */
"use strict";
document.addEventListener("mw:ready", async () => {
  const grid = document.getElementById("watchlist-grid");
  const empty = document.getElementById("watchlist-empty");
  const clearBtn = document.getElementById("clear-watchlist");
  const favOnly = document.getElementById("show-favorites");

  // Get current Firebase user UID or fallback to guest
  function getStorageKeys() {
    let uid = "guest";
    try {
      const userStr = localStorage.getItem("firebase:authUser:" + Object.keys(localStorage).find(k => k.startsWith("firebase:authUser:"))?.split(":")[1] + ":[DEFAULT]");
      // Alternative clean check if window.firebaseAuth or global auth state exists from main HTML
      if (window.currentFirebaseUid) {
        uid = window.currentFirebaseUid;
      }
    } catch(e) {}

    // Fallback checking standard firebase local persistence key if any
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("firebase:authUser:")) {
        try {
          const userData = JSON.parse(localStorage.getItem(key));
          if (userData && userData.uid) {
            uid = userData.uid;
          }
        } catch(err) {}
      }
    }

    return {
      watchlistKey: `mw_watchlist_${uid}`,
      favoritesKey: `mw_favorites_${uid}`
    };
  }

  // Custom store helper handling user-specific keys
  const UserStore = {
    get(keyType) {
      const keys = getStorageKeys();
      const actualKey = keyType === "mw_favorites" ? keys.favoritesKey : keys.watchlistKey;
      return MWStore.get(actualKey);
    },
    remove(keyType) {
      const keys = getStorageKeys();
      const actualKey = keyType === "mw_favorites" ? keys.favoritesKey : keys.watchlistKey;
      localStorage.removeItem(actualKey);
    }
  };

  async function render() {
    const isFav = favOnly.checked;
    const targetKeyType = isFav ? "mw_favorites" : "mw_watchlist";
    const ids = UserStore.get(targetKeyType);

    grid.innerHTML = "";
    if (!ids || !ids.length) {
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
    
    skeletons(grid, Math.min(ids.length, 8));
    const movies = [];
    for (const id of ids) {
      try { movies.push(await MW_API.getMovie(id)); } catch (e) { /* skip missing */ }
    }
    renderGrid(grid, movies);
    document.getElementById("wl-count").textContent = movies.length;
  }

  favOnly.addEventListener("change", render);
  
  clearBtn.addEventListener("click", () => {
    const isFav = favOnly.checked;
    UserStore.remove(isFav ? "mw_favorites" : "mw_watchlist");
    toast("List cleared", "fa-trash-can"); 
    render();
  });

  document.addEventListener("mw:watchlist-changed", () => { 
    if (!favOnly.checked) render(); 
  });
  
  render();
});
