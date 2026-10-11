import pg from "pg";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
// Postgres bigint / numeric come back as strings by default; our counts fit in JS numbers
pg.types.setTypeParser(20, (v) => Number(v));

let pool = null;
export function getPool(){
  if (pool) return pool;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  // a pasted connection string that lost its beginning parses as a host
  // called "base" — say what's wrong instead of a DNS error
  if (!/^postgres(ql)?:\/\/[^/\s]+@[^/\s]+/.test(url.trim()))
    throw new Error("DATABASE_URL looks incomplete. It must be the full connection string, starting with postgresql://user:password@host — copy it again from your database provider (Neon → Connect → Copy snippet).");
  pool = new pg.Pool({
    connectionString: url,
    max: Number(process.env.DB_POOL_SIZE || 10),
    ssl: /sslmode=require|neon\.tech|render\.com|supabase/.test(url) ? { rejectUnauthorized: false } : undefined,
  });
  pool.on("error", (e) => console.error("[db] idle client error", e.message));
  return pool;
}
export async function closePool(){ if (pool){ await pool.end(); pool = null; } }

export const query = (text, params) => getPool().query(text, params);

/* Run fn inside one transaction. Retries the whole transaction on a
   deadlock or serialization failure, so concurrent orders never leave a
   half-applied reservation behind. */
export async function tx(fn, { retries = 4 } = {}){
  for (let attempt = 0; ; attempt++){
    const client = await getPool().connect();
    try {
      await client.query("begin");
      const out = await fn(client);
      await client.query("commit");
      return out;
    } catch (e){
      try { await client.query("rollback"); } catch {}
      if ((e.code === "40P01" || e.code === "40001") && attempt < retries){
        await new Promise((r) => setTimeout(r, 25 * (attempt + 1) + Math.random() * 40));
        continue;
      }
      throw e;
    } finally { client.release(); }
  }
}

export async function migrate(){
  await query(`create table if not exists schema_migrations (name text primary key, applied_at timestamptz not null default now())`);
  const dir = path.join(HERE, "..", "migrations");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".sql")).sort();
  const done = new Set((await query("select name from schema_migrations")).rows.map((r) => r.name));
  for (const f of files){
    if (done.has(f)) continue;
    await tx(async (c) => {
      await c.query(fs.readFileSync(path.join(dir, f), "utf8"));
      await c.query("insert into schema_migrations(name) values ($1)", [f]);
    });
    console.log("[db] applied", f);
  }
  const { seedCatalog } = await import("./catalog.js");
  await seedCatalog();
}
