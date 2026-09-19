/* MOVIES WORLD - shared UI */
"use strict";

const MWStore = {
  get(key) { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } },
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

function toast(msg, icon = "fa-circle-check") {
  let wrap = document.querySelector(".toast-wrap");
  if (!wrap) { wrap = document.createElement("div"); wrap.className = "toast-wrap"; document.body.appendChild(wrap); }
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<i class="fa-solid ${icon}"></i><span>${msg}</span>`;
  wrap.appendChild(el);
  setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 320); }, 2600);
}

function esc(s) { const d = document.createElement("div"); d.textContent = s == null ? "" : s; return d.innerHTML; }

function hideLoader() {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.classList.add("done");
    setTimeout(() => { loader.style.display = "none"; }, 500);
  }
}

function initChrome() {
  const saved = localStorage.getItem("mw_theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  document.querySelectorAll("[data-theme-toggle]").forEach(btn => btn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("mw_theme", next);
  }));
}

document.addEventListener("DOMContentLoaded", async () => {
  initChrome();
  if (typeof MW_API !== "undefined" && MW_API.init) {
    try { await MW_API.init(); } catch(e) { console.error(e); }
  }
  // Safe loader hide
  setTimeout(hideLoader, 600);
});

// Emergency fallback for Loader
window.addEventListener("load", () => {
  setTimeout(hideLoader, 1000);
});
