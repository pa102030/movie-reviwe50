/*
 * MOVIES WORLD - Cloudflare Worker TMDB proxy
 * Deploy as a Worker. Add secrets:
 *   TMDB_READ_TOKEN = TMDB API Read Access Token (Bearer token)
 * Add variable:
 *   ALLOWED_ORIGIN = https://themoviesworld.com
 * Frontend config:
 *   TMDB_PROXY_URL = https://YOUR-WORKER.workers.dev/3
 */
const API = "https://api.themoviedb.org/3";
const ALLOWED_PATH = /^\/(?:movie(?:\/\d+(?:\/(?:credits|videos|similar|watch\/providers|release_dates))?)?|search\/movie|discover\/movie|genre\/movie\/list|configuration\/languages)$/;

function cors(origin, allowed) {
  const ok = origin === allowed;
  return {
    "Access-Control-Allow-Origin": ok ? allowed : "null",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = env.ALLOWED_ORIGIN || "https://themoviesworld.com";
    const headers = cors(origin, allowed);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (origin !== allowed) return Response.json({ error: "Origin not allowed" }, { status: 403, headers });
    if (request.method !== "GET") return Response.json({ error: "Method not allowed" }, { status: 405, headers });
    if (!env.TMDB_READ_TOKEN) return Response.json({ error: "TMDB proxy is not configured" }, { status: 503, headers });

    const incoming = new URL(request.url);
    const path = incoming.pathname.replace(/^\/3(?=\/)/, "");
    if (!ALLOWED_PATH.test(path)) return Response.json({ error: "Endpoint not allowed" }, { status: 404, headers });

    const upstream = new URL(API + path);
    for (const [key, value] of incoming.searchParams) {
      if (!["api_key", "access_token"].includes(key)) upstream.searchParams.set(key, value);
    }
    const response = await fetch(upstream, {
      headers: { Authorization: "Bearer " + env.TMDB_READ_TOKEN, Accept: "application/json" }
    });
    const body = await response.text();
    return new Response(body, {
      status: response.status,
      headers: { ...headers, "Content-Type": response.headers.get("Content-Type") || "application/json", "Cache-Control": "public, max-age=300" }
    });
  }
};
