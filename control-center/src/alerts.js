/* Low-stock / shortage notifications. Alerts are rows written inside the
   inventory transaction; sending happens afterwards from the table, so a
   rolled-back transaction never sends a false alarm. Set ALERT_WEBHOOK_URL
   to a Slack/Zapier/Make incoming-webhook URL to be notified. */
import { query } from "./db.js";
import { logError } from "./log.js";

let timer = null;
export function notifyAlert(){
  if (timer || !process.env.ALERT_WEBHOOK_URL) return;
  timer = setTimeout(() => { timer = null; flushAlerts().catch(() => {}); }, 1500);
}

export async function flushAlerts(){
  const url = process.env.ALERT_WEBHOOK_URL;
  if (!url) return 0;
  const { rows } = await query(
    `select a.id, a.kind, a.message, i.sku from alerts a join items i on i.id = a.item_id
      where a.resolved_at is null and a.notified_at is null order by a.id limit 50`);
  if (!rows.length) return 0;
  const text = "MEMOBRICK CONTROL CENTER\n" + rows.map((r) =>
    (r.kind === "shortage" ? "SHORTAGE: " : "Low stock: ") + r.message).join("\n");
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
    if (!res.ok) throw new Error("HTTP " + res.status);
    await query("update alerts set notified_at = now() where id = any($1)", [rows.map((r) => r.id)]);
    return rows.length;
  } catch (e){
    await logError("alert-webhook", e, { count: rows.length });
    return 0;
  }
}
