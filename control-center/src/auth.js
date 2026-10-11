/* Users, sessions and API keys. Passwords use scrypt; session tokens and
   API keys are random and only their SHA-256 hash is stored. */
import crypto from "node:crypto";
import { query } from "./db.js";

const SESSION_DAYS = 14;
export const COOKIE = "mcc_session";
const sha256 = (s) => crypto.createHash("sha256").update(s).digest("hex");

export function hashPassword(pw){
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(pw, salt, 64, { N: 16384, r: 8, p: 1 });
  return `scrypt$${salt.toString("base64")}$${key.toString("base64")}`;
}
export function verifyPassword(pw, stored){
  const [kind, salt, key] = String(stored || "").split("$");
  if (kind !== "scrypt" || !salt || !key) return false;
  const want = Buffer.from(key, "base64");
  const got = crypto.scryptSync(pw, Buffer.from(salt, "base64"), want.length, { N: 16384, r: 8, p: 1 });
  return crypto.timingSafeEqual(want, got);
}

export async function createUser({ email, name, role, password }){
  if (!/^[^@\s]+@[^@\s]+$/.test(email || "")) throw new Error("A valid email is required");
  if (!["admin", "production"].includes(role)) throw new Error("Role must be admin or production");
  if (!password || password.length < 10) throw new Error("Password must be at least 10 characters");
  const { rows: [u] } = await query(
    "insert into users (email, name, role, password_hash) values ($1, $2, $3, $4) returning id, email, name, role",
    [email, name || email.split("@")[0], role, hashPassword(password)]);
  return u;
}

// constant-time-ish failure so the login can't be used to probe which emails exist
const DUMMY = hashPassword(crypto.randomBytes(12).toString("hex"));
export async function login(email, password){
  const { rows: [u] } = await query("select * from users where email = $1 and active", [String(email || "")]);
  const ok = verifyPassword(String(password || ""), u ? u.password_hash : DUMMY);
  if (!u || !ok) return null;
  const token = crypto.randomBytes(32).toString("base64url");
  await query("insert into sessions (token_hash, user_id, expires_at) values ($1, $2, now() + ($3 || ' days')::interval)",
    [sha256(token), u.id, String(SESSION_DAYS)]);
  return { token, user: { id: u.id, email: u.email, name: u.name, role: u.role } };
}

export async function userFromToken(token){
  if (!token) return null;
  const { rows: [u] } = await query(
    `select u.id, u.email, u.name, u.role from sessions s join users u on u.id = s.user_id
      where s.token_hash = $1 and s.expires_at > now() and u.active`, [sha256(token)]);
  return u || null;
}
export const logout = (token) => token ? query("delete from sessions where token_hash = $1", [sha256(token)]) : null;

export async function createApiKey(name, scope = "studio"){
  const key = "mcc_" + crypto.randomBytes(24).toString("base64url");
  await query("insert into api_keys (name, key_hash, scope) values ($1, $2, $3)", [name, sha256(key), scope]);
  return key;
}
export async function apiKeyScope(key){
  if (!key || !key.startsWith("mcc_")) return null;
  const { rows: [k] } = await query("select scope from api_keys where key_hash = $1 and revoked_at is null", [sha256(key)]);
  return k ? k.scope : null;
}

export function parseCookies(header){
  const out = {};
  for (const part of String(header || "").split(";")){
    const i = part.indexOf("=");
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}
export function sessionCookie(token, { secure, clear } = {}){
  return `${COOKIE}=${clear ? "" : token}; Path=/; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}; Max-Age=${clear ? 0 : SESSION_DAYS * 86400}`;
}
