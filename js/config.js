/* ============================================================
   MOVIES WORLD - Configuration
   Production: set TMDB_PROXY_URL to your deployed Cloudflare
   Worker URL (the Worker keeps the TMDB Read Access Token secret).
   Local development only: API_KEY may be used, but never commit
   a real key or token to this public repository.
   ============================================================ */
const MW_CONFIG = {
  API_KEY: "", // Local development only. Do not put production credentials here.
  TMDB_PROXY_URL: "https://movies-world-tmdb.nimsara-pasindu-2007.workers.dev/3", // Production Cloudflare Worker proxy
  API_BASE: "https://api.themoviedb.org/3",
  IMG_BASE: "https://image.tmdb.org/t/p/",
  LANGUAGE: "en-US",
  REGION: "US",
  USE_DEMO: true,
  PAGE_SIZE: 24
};
MW_CONFIG.USE_DEMO = !(MW_CONFIG.TMDB_PROXY_URL || (MW_CONFIG.API_KEY && MW_CONFIG.API_KEY.length > 10));
