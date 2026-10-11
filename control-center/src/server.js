/* =====================================================================
   MEMOBRICK CONTROL CENTER — server
   node src/server.js   (env: DATABASE_URL, see README for the rest)
   ===================================================================== */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { migrate, query } from "./db.js";
import { r } from "./api.js";
import { HttpError, readBody, send } from "./http.js";
import { userFromToken, apiKeyScope, parseCookies, COOKIE, createUser } from "./auth.js";
import { retryDue } from "./webhooks.js";
import { flushAlerts } from "./alerts.js";
import { logError } from "./log.js";
import { getSettings } from "./catalog.js";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(HERE, "..", "public");
const ORIGINS = (process.env.CORS_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
                ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".json": "application/json" };

/* simple per-IP limiter for the public website endpoint */
const hits = new Map();
function limited(ip, max = 60, windowMs = 60000){
  const now = Date.now(), h = hits.get(ip) || { n: 0, t: now };
  if (now - h.t > windowMs){ h.n = 0; h.t = now; }
  h.n++; hits.set(ip, h);
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v.t > windowMs) hits.delete(k);
  return h.n > max;
}

function cors(req, res, pathname){
  const origin = req.headers.origin;
  const editorRoute = pathname.startsWith("/api/website/") || pathname.startsWith("/api/studio/");
  if (!origin || !editorRoute) return true;
  if (!ORIGINS.includes(origin) && !ORIGINS.includes("*")) return false;
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Max-Age", "600");
  return true;
}

function serveStatic(res, pathname){
  let p = pathname === "/" ? "/index.html" : pathname;
  const file = path.normalize(path.join(PUBLIC, p));
  if (!file.startsWith(PUBLIC)) return false;
  let stat; try { stat = fs.statSync(file); } catch { return false; }
  if (!stat.isFile()) return false;
  res.writeHead(200, {
    "Content-Type": TYPES[path.extname(file)] || "application/octet-stream",
    "Cache-Control": p === "/index.html" ? "no-cache" : "public, max-age=300",
    "X-Content-Type-Options": "nosniff", "Referrer-Policy": "same-origin",
    "Content-Security-Policy": "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'",
  });
  fs.createReadStream(file).pipe(res);
  return true;
}

export function createServer(){
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://x");
    const pathname = url.pathname;
    const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").toString().split(",")[0].trim();
    try {
      if (!cors(req, res, pathname)) return send(res, 403, { error: "Origin not allowed" });
      if (req.method === "OPTIONS") return send(res, 204, "");
      const m = r.match(req.method, pathname);
      if (!m){
        if (req.method === "GET" && !pathname.startsWith("/api/") && serveStatic(res, pathname)) return;
        if (req.method === "GET" && !pathname.startsWith("/api/") && !path.extname(pathname)) return serveStatic(res, "/");
        return send(res, 404, { error: "Not found" });
      }
      if (pathname.startsWith("/api/website/") && limited(ip)) return send(res, 429, { error: "Too many requests" });
      if (pathname === "/api/login" && limited("login:" + ip, 10, 60000)) return send(res, 429, { error: "Too many sign-in attempts — wait a minute" });

      const isWebhook = pathname.startsWith("/webhooks/");
      const isEditor = pathname.startsWith("/api/website/") || pathname.startsWith("/api/studio/");
      const raw = ["POST", "PUT", "PATCH"].includes(req.method) ? await readBody(req, isEditor ? 2_000_000 : 1_000_000) : Buffer.alloc(0);
      let body = {};
      if (!isWebhook && raw.length){
        try { body = JSON.parse(raw.toString("utf8")); } catch { throw new HttpError(400, "Body must be JSON"); }
      }
      const cookies = parseCookies(req.headers.cookie);
      const ctx = {
        req, res, raw, body, params: m.params, query: url.searchParams, cookies, headers: {}, status: 200, SKIP: Symbol.for("skip"),
        secure: (req.headers["x-forwarded-proto"] || "") === "https",
        user: null, apiScope: null,
      };
      const bearer = /^Bearer\s+(.+)$/i.exec(req.headers.authorization || "");
      if (bearer) ctx.apiScope = await apiKeyScope(bearer[1].trim());
      else if (cookies[COOKIE]) ctx.user = await userFromToken(cookies[COOKIE]);
      // dashboard writes must come from the dashboard itself (CSRF guard on
      // top of SameSite cookies)
      if (ctx.user && req.method !== "GET" && req.headers["x-mcc"] !== "1")
        throw new HttpError(403, "Missing request header");

      let out;
      for (const h of m.handlers) out = await h(ctx);
      if (out === ctx.SKIP) return;
      send(res, ctx.status, out, ctx.headers);
    } catch (e){
      const status = e.status || (e instanceof HttpError ? e.status : 500);
      if (status >= 500) await logError("http " + req.method + " " + pathname, e);
      send(res, status, { error: status >= 500 ? "Something went wrong — it has been logged." : e.message, detail: status < 500 ? e.detail : undefined });
    }
  });
}

/* background: retry failed webhooks, send pending alerts */
export function startJobs(){
  let ticks = 0;
  const run = async () => {
    try {
      await retryDue(); await flushAlerts();
      if (ticks++ % 60 === 0) await pruneAbandonedDesigns();
    } catch (e){ await logError("jobs", e); }
  };
  run();
  return setInterval(run, 60_000);
}

/* website designs that never became an order (abandoned carts) are removed
   after the configured number of days; anything an order uses is kept forever */
export async function pruneAbandonedDesigns(){
  const s = await getSettings();
  const days = Math.max(7, Number(s.unreferenced_design_days) || 60);
  const { rowCount } = await query(
    `delete from designs d where d.source = 'website' and not d.verified and d.updated_at < now() - ($1 || ' days')::interval
        and not exists (select 1 from order_lines l where l.design_id = d.id)`, [String(days)]);
  return rowCount;
}

async function bootstrapAdmin(){
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return;
  const { rows: [{ n }] } = await query("select count(*)::int as n from users");
  if (n) return;
  await createUser({ email: ADMIN_EMAIL, name: process.env.ADMIN_NAME || "Admin", role: "admin", password: ADMIN_PASSWORD });
  console.log("[boot] created first admin", ADMIN_EMAIL);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)){
  await migrate();
  await bootstrapAdmin();
  const port = Number(process.env.PORT || 8080);
  createServer().listen(port, () => console.log(`MEMOBRICK CONTROL CENTER on http://localhost:${port}`));
  startJobs();
}
