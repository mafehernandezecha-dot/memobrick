import { query } from "./db.js";

export async function logError(context, err, detail){
  const message = (err && err.message) || String(err);
  console.error(`[${context}]`, message);
  try { await query("insert into error_log (context, message, detail) values ($1, $2, $3)", [context, message.slice(0, 2000), detail ? JSON.stringify(detail) : null]); }
  catch (e){ console.error("[log] could not record error", e.message); }
}

export async function audit(c, { user, actor, action, entity, entityId, detail }){
  await (c || { query }).query(
    "insert into audit_log (user_id, actor, action, entity, entity_id, detail) values ($1, $2, $3, $4, $5, $6)",
    [user ? user.id : null, user ? `${user.name} (${user.role})` : (actor || "system"), action, entity || null,
     entityId == null ? null : String(entityId), detail ? JSON.stringify(detail) : null]);
}
