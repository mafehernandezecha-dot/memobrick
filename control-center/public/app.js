/* MEMOBRICK CONTROL CENTER — dashboard (no build step, no framework) */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = (n) => n == null ? "—" : Number(n).toLocaleString("en-US");
const when = (t) => t ? new Date(t).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "—";
const day = (t) => t ? new Date(t).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }) : "—";
const sw = (hex, cls = "") => hex ? `<span class="sw ${cls}" style="background:${esc(hex)}"></span>` : "";

let ME = null;
const isAdmin = () => ME && ME.role === "admin";

/* ------------------------------------------------------------- api */
async function api(path, opts = {}){
  const res = await fetch(path, {
    method: opts.method || "GET",
    headers: { "Content-Type": "application/json", "X-MCC": "1" },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    credentials: "same-origin",
  });
  if (res.status === 401 && path !== "/api/login"){ showLogin(); throw new Error("Please sign in"); }
  const data = res.headers.get("content-type")?.includes("json") ? await res.json() : await res.text();
  if (!res.ok) throw new Error((data && data.error) || `Request failed (${res.status})`);
  return data;
}
function toast(msg, bad){
  const t = $("#toast"); t.textContent = msg; t.className = "toast on" + (bad ? " bad" : "");
  clearTimeout(t._t); t._t = setTimeout(() => (t.className = "toast"), bad ? 6000 : 2600);
}
async function act(fn, ok){
  try { const out = await fn(); if (ok) toast(ok); return out; }
  catch (e){ toast(e.message, true); throw e; }
}

/* ------------------------------------------------------------- auth */
function showLogin(){ $("#app").hidden = true; $("#login").hidden = false; ES && ES.close(); }
$("#loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = e.target;
  $("#loginErr").textContent = "";
  try {
    const { user } = await api("/api/login", { method: "POST", body: { email: f.email.value, password: f.password.value } });
    ME = user; f.reset(); start();
  } catch (err){ $("#loginErr").textContent = err.message; }
});
$("#logout").addEventListener("click", async () => { await api("/api/logout", { method: "POST" }).catch(() => {}); ME = null; showLogin(); });
$("#menuBtn").addEventListener("click", () => $("#side").classList.toggle("open"));

/* ---------------------------------------------------------- routing */
const VIEWS = {};
const TITLES = { dashboard: "Dashboard", bricks: "Brick Inventory", boards: "Boards & Tools", orders: "Orders", production: "Production",
  designs: "Designs", history: "Inventory History", restock: "Restocking", reports: "Reports", setup: "Initial Stock Setup", settings: "Settings" };
let current = null;
function route(){
  const [, v = "dashboard", arg] = (location.hash || "#/dashboard").split("/");
  const name = VIEWS[v] ? v : "dashboard";
  current = { name, arg };
  $$("#nav a").forEach((a) => a.classList.toggle("on", a.dataset.v === name));
  $("#title").textContent = TITLES[name];
  $("#side").classList.remove("open");
  render();
}
async function render(){
  const view = $("#view");
  try { await VIEWS[current.name](view, current.arg); }
  catch (e){ if (e.message !== "Please sign in") view.innerHTML = `<div class="note bad">${esc(e.message)}</div>`; }
}
window.addEventListener("hashchange", route);

/* ---------------------------------------------------- live updates */
let ES = null, pendingRefresh = false;
function connectLive(){
  if (ES) ES.close();
  ES = new EventSource("/api/stream");
  ES.onopen = () => $("#live").classList.add("on");
  ES.onerror = () => $("#live").classList.remove("on");
  ES.addEventListener("changed", () => {
    // don't wipe what someone is typing; refresh once they're done
    if ($$("#view input.dirty, #view textarea.dirty").length || !$("#drawer").hidden){ pendingRefresh = true; return; }
    render();
  });
}
setInterval(() => { if (pendingRefresh && !$$("#view .dirty").length && $("#drawer").hidden){ pendingRefresh = false; render(); } }, 3000);

async function start(){
  $("#login").hidden = true; $("#app").hidden = false;
  $("#meName").textContent = `${ME.name} · ${ME.role}`;
  $$("[data-admin]").forEach((el) => (el.hidden = !isAdmin()));
  connectLive(); route();
}
(async () => {
  try { ME = (await api("/api/session")).user; if (ME) start(); else showLogin(); } catch { showLogin(); }
})();

/* ---------------------------------------------------------- drawer */
function openDrawer(html){ $("#drawerBody").innerHTML = html; $("#drawer").hidden = false; }
function closeDrawer(){ $("#drawer").hidden = true; if (pendingRefresh){ pendingRefresh = false; render(); } }
$("#drawer").addEventListener("click", (e) => { if (e.target.id === "drawer" || e.target.closest("[data-close]")) closeDrawer(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#drawer").hidden) closeDrawer(); });

/* ------------------------------------------------- shared renderers */
const STATUS = { pending: ["Awaiting payment", "b-mute"], reserved: ["Reserved", "b-info"], in_production: ["In production", "b-warn"],
  packed: ["Packed", "b-ok"], shipped: ["Shipped", "b-ok"], cancelled: ["Cancelled", "b-mute"] };
const statusBadge = (s) => `<span class="badge ${STATUS[s]?.[1] || "b-mute"}">${STATUS[s]?.[0] || esc(s)}</span>`;
const sourceBadge = (s) => `<span class="badge ${s === "shopify" || s === "website" ? "b-info" : "b-warn"}">${s === "shopify" ? "Shopify" : s === "website" ? "Website" : "Studio"}</span>`;
function stockCell(it){
  if (it.on_hand == null) return `<span class="uncounted">not counted</span>`;
  return fmt(it.on_hand);
}
function availCell(it){
  if (it.on_hand == null) return `<span class="uncounted">—</span>`;
  const a = it.on_hand - it.reserved;
  const low = it.min_level != null && a <= it.min_level;
  return `<span class="${a < 0 ? "neg" : ""}">${fmt(a)}</span>${a < 0 ? ' <span class="badge b-bad">short</span>' : low ? ' <span class="badge b-warn">low</span>' : ""}`;
}
const MOVE = { count: "Count", adjust: "Adjustment", restock: "Restock", reserve: "Reserved", release: "Released", consume: "Consumed", return: "Returned" };
function movementRows(list, withItem = true){
  if (!list.length) return `<div class="empty">No movements yet.</div>`;
  return `<div class="tbl-wrap"><table><thead><tr><th>Date</th>${withItem ? "<th>Item</th>" : ""}<th>Type</th><th class="n">On hand Δ</th>
    <th class="n">Reserved Δ</th><th class="n">On hand after</th><th>Order</th><th>Reason</th><th>By</th></tr></thead><tbody>${list.map((m) => `
    <tr><td>${when(m.created_at)}</td>${withItem ? `<td>${sw(m.hex, "sm")} ${esc(m.name)} <span class="muted mono">${esc(m.sku)}</span></td>` : ""}
      <td>${MOVE[m.type] || esc(m.type)}</td><td class="n">${m.delta_on_hand ? (m.delta_on_hand > 0 ? "+" : "") + fmt(m.delta_on_hand) : ""}</td>
      <td class="n">${m.delta_reserved ? (m.delta_reserved > 0 ? "+" : "") + fmt(m.delta_reserved) : ""}</td>
      <td class="n">${m.on_hand_after == null ? "—" : fmt(m.on_hand_after)}</td><td>${esc(m.order_name || "")}</td>
      <td class="wrap">${esc(m.reason || "")}</td><td>${esc(m.actor)}</td></tr>`).join("")}</tbody></table></div>`;
}
async function showItemHistory(id, name){
  const { movements } = await api(`/api/items/${id}/history`);
  openDrawer(`<h2>${esc(name)} — stock history</h2>${movementRows(movements, false)}`);
}

/* ============================================================ DASHBOARD */
VIEWS.dashboard = async (el) => {
  const d = await api("/api/dashboard");
  const ords = Object.fromEntries(d.orders.map((o) => [o.status, o.n]));
  const t = d.totals;
  const low = d.alerts.filter((a) => a.kind === "low_stock").length, short = d.alerts.filter((a) => a.kind === "shortage").length;
  const counted = d.byColor.filter((c) => c.on_hand != null);
  const maxAvail = Math.max(1, ...counted.map((c) => c.on_hand));
  el.innerHTML = `
    ${d.uncounted.length ? `<div class="note warn"><b>${d.uncounted.length} item${d.uncounted.length === 1 ? "" : "s"} still need an initial count.</b>
      Until counted, they show as “not counted” (never as zero). <a href="#/setup">Enter initial stock →</a></div>` : ""}
    <div class="kpis">
      <div class="kpi"><span>Bricks on hand</span><b>${fmt(t.bricks_on_hand)}</b><span>${counted.length} of ${d.byColor.length} colors counted</span></div>
      <div class="kpi"><span>Bricks reserved</span><b>${fmt(t.bricks_reserved)}</b><span>for paid orders</span></div>
      <div class="kpi"><span>Bricks available</span><b>${fmt(t.bricks_available)}</b><span>on hand − reserved (counted colors)</span></div>
      <div class="kpi ${short ? "bad" : low ? "warn" : ""}"><span>Stock alerts</span><b>${short + low}</b><span>${short} shortage · ${low} low</span></div>
      <div class="kpi"><span>Orders to produce</span><b>${(ords.reserved || 0) + (ords.in_production || 0)}</b><span>${ords.in_production || 0} in production</span></div>
      <div class="kpi"><span>Awaiting payment</span><b>${ords.pending || 0}</b><span>not reserved yet</span></div>
      <div class="kpi ${d.uncounted.length ? "warn" : ""}"><span>Need initial count</span><b>${d.uncounted.length}</b><span>of ${t.items} items</span></div>
    </div>
    <div class="grid g2">
      <div class="card"><h2>Stock alerts</h2>${d.alerts.length ? `<ul class="list">${d.alerts.map((a) => `
        <li class="${a.kind === "shortage" ? "alert-bad" : "alert-warn"}">${sw(a.hex)}<div><b>${esc(a.name)}</b> <span class="muted mono">${esc(a.sku)}</span><br>
        <span class="small">${esc(a.message)}</span></div></li>`).join("")}</ul>` : `<div class="empty">No low-stock or shortage alerts.</div>`}</div>
      <div class="card"><h2>Orders needing attention</h2>${d.attention.length ? `<ul class="list">${d.attention.map((o) => `
        <li class="alert-warn"><div><a href="#/orders/${o.id}"><b>${esc(o.order_name || "Order " + o.id)}</b></a> ${sourceBadge(o.source)} ${statusBadge(o.status)}<br>
        <span class="small">${esc(o.needs_attention)}</span></div></li>`).join("")}</ul>` : `<div class="empty">Nothing needs attention.</div>`}</div>
    </div>
    <div class="card"><div class="row between"><h2>Inventory by color</h2><a class="btn sm" href="#/bricks">Edit stock →</a></div>
      <div class="colors">${d.byColor.map((c) => {
        const a = c.on_hand == null ? null : c.on_hand - c.reserved;
        const pct = a == null ? 0 : Math.max(0, Math.min(100, a / maxAvail * 100));
        return `<div class="cc" title="${esc(c.name)} · code ${esc(c.color_code)}">${sw(c.hex)}<div style="flex:1;min-width:0"><b>${esc(c.name)}</b>
          <span>${c.on_hand == null ? '<i class="uncounted">not counted</i>' : `${fmt(a)} avail · ${fmt(c.reserved)} res.`}</span>
          <div class="bar"><i class="${a != null && a < 0 ? "bad" : ""}" style="width:${pct}%"></i></div></div></div>`;
      }).join("")}</div></div>
    <div class="grid g2">
      <div class="card"><h2>Materials reserved for upcoming production</h2>${d.upcoming.length ? `<div class="tbl-wrap"><table><thead><tr><th>Item</th>
        <th class="n">Reserved</th><th class="n">On hand</th></tr></thead><tbody>${d.upcoming.map((u) => `<tr><td>${sw(u.hex, "sm")} ${esc(u.name)}</td>
        <td class="n">${fmt(u.qty)}</td><td class="n">${stockCell(u)}</td></tr>`).join("")}</tbody></table></div>` : `<div class="empty">No reserved materials.</div>`}</div>
      <div class="card"><h2>Recent activity</h2>${d.recent.length ? `<ul class="list">${d.recent.map((m) => `<li><div class="small"><b>${MOVE[m.type]}</b>
        ${m.delta_on_hand ? (m.delta_on_hand > 0 ? "+" : "") + fmt(m.delta_on_hand) : (m.delta_reserved > 0 ? "+" : "") + fmt(m.delta_reserved)} · ${esc(m.name)}
        <br><span class="muted">${esc(m.reason || "")} · ${esc(m.actor)} · ${when(m.created_at)}</span></div></li>`).join("")}</ul>` : `<div class="empty">No activity yet.</div>`}</div>
    </div>`;
};

/* ========================================================= ITEM TABLES */
function itemTable(items, { brick }){
  const admin = isAdmin();
  return `<div class="tbl-wrap"><table><thead><tr>${brick ? "<th></th><th>Color</th><th>Code</th><th>Supplier</th>" : "<th>Item</th><th>SKU</th>"}
    <th class="n">On hand</th><th class="n">Reserved</th><th class="n">Available</th><th class="n">Minimum</th><th>Last updated</th><th></th></tr></thead>
    <tbody>${items.map((it) => `<tr data-id="${it.id}" data-name="${esc((it.name + " " + (it.color_code || "") + " " + it.sku).toLowerCase())}">
      ${brick ? `<td>${sw(it.hex)}</td><td><b>${esc(it.name)}</b><div class="muted mono">${esc(it.hex)}</div></td><td class="mono">${esc(it.color_code)}</td><td class="mono">${esc(it.supplier_code || "")}</td>`
              : `<td><b>${esc(it.name)}</b></td><td class="mono">${esc(it.sku)}</td>`}
      <td class="n">${admin ? `<input class="num" data-f="onHand" inputmode="numeric" value="${it.on_hand ?? ""}" placeholder="not counted" aria-label="On hand for ${esc(it.name)}">` : stockCell(it)}</td>
      <td class="n">${fmt(it.reserved)}</td><td class="n">${availCell(it)}</td>
      <td class="n">${admin ? `<input class="num" data-f="minLevel" inputmode="numeric" value="${it.min_level ?? ""}" placeholder="—" aria-label="Minimum for ${esc(it.name)}">` : fmt(it.min_level)}</td>
      <td class="small">${when(it.last_movement)}</td>
      <td><button class="btn sm" data-history="${it.id}" data-hname="${esc(it.name)}">History</button>
        ${admin && it.on_hand != null ? `<button class="btn sm" data-adjust="${it.id}" data-hname="${esc(it.name)}">Adjust</button>` : ""}</td></tr>`).join("")}</tbody></table></div>`;
}
function wireItemTable(el, rerender){
  el.addEventListener("input", (e) => {
    const inp = e.target.closest("input.num"); if (!inp) return;
    inp.classList.toggle("dirty", inp.value !== inp.defaultValue);
    $("#saveBar") && ($("#saveBar").hidden = !$$("input.num.dirty", el).length);
  });
  el.addEventListener("click", async (e) => {
    const h = e.target.closest("[data-history]");
    if (h) return showItemHistory(h.dataset.history, h.dataset.hname);
    const a = e.target.closest("[data-adjust]");
    if (a) return adjustDialog(a.dataset.adjust, a.dataset.hname);
    if (e.target.closest("#saveBtn")){
      const rows = $$("tr[data-id]", el).filter((tr) => $$("input.dirty", tr).length).map((tr) => {
        const on = $('[data-f="onHand"]', tr), mn = $('[data-f="minLevel"]', tr);
        return { itemId: Number(tr.dataset.id), onHand: on.classList.contains("dirty") ? on.value.trim() : "", minLevel: mn.classList.contains("dirty") ? mn.value.trim() : "" };
      });
      if (rows.some((r) => r.onHand !== "" && !/^\d+$/.test(r.onHand.replace(/,/g, "")))) return toast("Counts must be whole numbers", true);
      rows.forEach((r) => (r.onHand = r.onHand.replace(/,/g, "")));
      if ($$("input.dirty", el).some((i) => i.dataset.f === "onHand" && i.value.trim() === "" && i.defaultValue !== ""))
        return toast("A count can't be cleared once entered — use Adjust instead.", true);
      const reason = $("#countReason")?.value.trim();
      await act(() => api("/api/items/bulk", { method: "POST", body: { rows, reason: reason || undefined } }), "Stock saved");
      rerender();
    }
    if (e.target.closest("#discardBtn")) rerender();
  });
  const search = $("#itemSearch", el);
  if (search) search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    $$("tr[data-id]", el).forEach((tr) => (tr.hidden = q && !tr.dataset.name.includes(q)));
  });
}
function saveBar(){
  return isAdmin() ? `<div class="card row" id="saveBar" hidden><b>Unsaved stock changes</b>
    <input id="countReason" class="search" placeholder="Reason (optional), e.g. Monthly count"><span class="spacer"></span>
    <button class="btn" id="discardBtn">Discard</button><button class="btn primary" id="saveBtn">Save changes</button></div>` : "";
}
function adjustDialog(id, name){
  openDrawer(`<h2>Adjust ${esc(name)}</h2><p class="muted">Use for damage, loss, found stock or corrections. Every adjustment is recorded with its reason.</p>
    <form id="adjForm" style="max-width:420px"><label class="field"><span>Change (use a minus for removals)</span><input name="delta" inputmode="numeric" placeholder="-25" required></label>
    <label class="field"><span>Reason</span><input name="reason" required placeholder="e.g. 2 bags damaged in storage"></label>
    <button class="btn primary">Record adjustment</button></form>`);
  $("#adjForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    await act(() => api(`/api/items/${id}/adjust`, { method: "POST", body: { delta: Number(e.target.delta.value), reason: e.target.reason.value } }), "Adjustment recorded");
    closeDrawer(); render();
  });
}

VIEWS.bricks = async (el) => {
  const { items } = await api("/api/items?category=brick");
  el.innerHTML = `<div class="row" style="margin-bottom:14px"><input class="search" id="itemSearch" placeholder="Search color name or code">
    <span class="spacer"></span><a class="btn" href="/api/export/items.csv">Export CSV</a>${isAdmin() ? `<button class="btn" id="newColor">＋ New color</button>` : ""}</div>
    <p class="muted small">${items.length} colors from the editors' palette. Type counts straight into the table, then save. Blank = not counted yet.</p>
    ${saveBar()}${itemTable(items, { brick: true })}`;
  wireItemTable(el, () => render());
  $("#newColor")?.addEventListener("click", () => newItemDialog("brick"));
};
VIEWS.boards = async (el) => {
  const { items } = await api("/api/items");
  const boards = items.filter((i) => i.category === "board"), tools = items.filter((i) => i.category === "tool");
  el.innerHTML = `${saveBar()}<div class="card"><h2>Baseplates</h2><p class="muted small">10×10 boards (32×32 studs) build every size except 16×16, which uses one 16×16 board (50×50 studs).</p>
    ${itemTable(boards, { brick: false })}</div>
    <div class="card"><div class="row between"><h2>Assembly tools</h2>${isAdmin() ? `<button class="btn" id="newTool">＋ New tool or accessory</button>` : ""}</div>
    <p class="muted small">How many of each go in a kit is set under Settings → Kit contents.</p>${itemTable(tools, { brick: false })}</div>`;
  wireItemTable(el, () => render());
  $("#newTool")?.addEventListener("click", () => newItemDialog("tool"));
};
function newItemDialog(category){
  const brick = category === "brick";
  openDrawer(`<h2>${brick ? "New brick color" : "New tool or accessory"}</h2>
    ${brick ? `<p class="note warn">Only add a color once it exists in the editors' palette too — otherwise designs can never use it. Existing colors can't be replaced here.</p>` : ""}
    <form id="newForm" style="max-width:460px">
      <label class="field"><span>Name</span><input name="name" required></label>
      ${brick ? `<label class="field"><span>MemoBrick code</span><input name="colorCode" required placeholder="041"></label>
      <label class="field"><span>Hex color</span><input name="hex" required placeholder="#A1B2C3"></label>
      <label class="field"><span>Supplier code</span><input name="supplierCode"></label>` : ""}
      <label class="field"><span>Minimum stock level (optional)</span><input name="minLevel" inputmode="numeric"></label>
      <button class="btn primary">Add</button></form>`);
  $("#newForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.target, body = { category, name: f.name.value, minLevel: f.minLevel.value };
    if (brick) Object.assign(body, { colorCode: f.colorCode.value, hex: f.hex.value, supplierCode: f.supplierCode.value });
    await act(() => api("/api/items", { method: "POST", body }), "Added — enter its count when ready");
    closeDrawer(); render();
  });
}

/* ================================================================ ORDERS */
let orderFilter = "";
VIEWS.orders = async (el, arg) => {
  const q = el.querySelector?.("#orderSearch")?.value || "";
  const { orders } = await api(`/api/orders?${new URLSearchParams({ ...(orderFilter && { status: orderFilter }), ...(q && { q }) })}`);
  const tabs = [["", "All"], ["attention", "Needs attention"], ["pending", "Awaiting payment"], ["reserved", "Reserved"], ["in_production", "In production"], ["packed", "Packed"], ["shipped", "Shipped"], ["cancelled", "Cancelled"]];
  el.innerHTML = `<div class="row" style="margin-bottom:14px"><div class="tabs">${tabs.map(([k, l]) => `<button data-f="${k}" class="${orderFilter === k ? "on" : ""}">${l}</button>`).join("")}</div>
    <input class="search" id="orderSearch" placeholder="Order number, customer or email" value="${esc(q)}"></div>
    ${orders.length ? `<div class="tbl-wrap"><table><thead><tr><th>Order</th><th>Source</th><th>Customer</th><th>Status</th><th class="n">Items</th><th class="n">Bricks</th>
    <th class="n">Reserved units</th><th>Placed</th><th></th></tr></thead><tbody>${orders.map((o) => `<tr>
      <td><a href="#/orders/${o.id}"><b>${esc(o.order_name || "Studio " + o.id)}</b></a></td><td>${sourceBadge(o.source)}</td><td>${esc(o.customer || "")}</td>
      <td>${statusBadge(o.status)}${o.needs_attention ? ' <span class="badge b-bad" title="' + esc(o.needs_attention) + '">attention</span>' : ""}</td>
      <td class="n">${o.lines}</td><td class="n">${fmt(o.bricks)}</td><td class="n">${fmt(o.reserved_units)}</td><td class="small">${day(o.placed_at || o.created_at)}</td>
      <td><a class="btn sm" href="#/orders/${o.id}">Open</a></td></tr>`).join("")}</tbody></table></div>`
      : `<div class="card empty">No orders yet. Paid Shopify orders with a MemoBrick design and Studio projects sent to production appear here automatically.</div>`}`;
  $$(".tabs button", el).forEach((b) => b.addEventListener("click", () => { orderFilter = b.dataset.f; render(); }));
  const s = $("#orderSearch", el); let t;
  s.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => VIEWS.orders(el).then(() => { const n = $("#orderSearch"); n.focus(); n.setSelectionRange(n.value.length, n.value.length); }), 300); });
  if (arg) openOrder(arg);
};
function packingTable(d, { picking } = {}){
  const bricks = d.packing.filter((p) => p.category === "brick"), other = d.packing.filter((p) => p.category !== "brick");
  const rows = (list, brick) => list.map((p) => `<tr>${picking ? '<td><input type="checkbox" aria-label="Picked"></td>' : ""}
    <td>${sw(p.hex, "sm")} <b>${esc(p.name)}</b></td><td class="mono">${esc(p.code || p.sku)}</td>${brick ? `<td class="mono">${esc(p.supplier || "")}</td><td class="n">${fmt(p.exact)}</td>` : "<td></td><td></td>"}
    <td class="n"><b>${fmt(p.need)}</b>${brick && d.mode === "packed" ? ` <span class="muted small">(${p.need / d.packSize} × ${d.packSize})</span>` : ""}</td>
    <td>${!p.counted ? '<span class="badge b-warn">not counted</span>' : p.shortage ? `<span class="badge b-bad">short ${fmt(p.shortage)}</span>` : '<span class="badge b-ok">in stock</span>'}</td></tr>`).join("");
  const totalBricks = bricks.reduce((s, p) => s + p.exact, 0), totalPick = bricks.reduce((s, p) => s + p.need, 0);
  return `<div class="tbl-wrap ${picking ? "pick" : ""}"><table><thead><tr>${picking ? "<th>✓</th>" : ""}<th>Item</th><th>Code</th><th>Supplier</th><th class="n">In design</th><th class="n">Pick</th><th>Stock</th></tr></thead>
    <tbody>${rows(bricks, true)}${rows(other, false)}</tbody><tfoot><tr>${picking ? "<td></td>" : ""}<td colspan="3"><b>${bricks.length} colors</b></td>
    <td class="n"><b>${fmt(totalBricks)}</b></td><td class="n"><b>${fmt(totalPick)}</b></td><td></td></tr></tfoot></table></div>`;
}
async function openOrder(id){
  const d = await api(`/api/orders/${id}`);
  const o = d.order, admin = isAdmin();
  const next = { pending: [], reserved: ["in_production", "packed"], in_production: ["packed", "reserved"], packed: ["shipped"], shipped: [], cancelled: [] }[o.status] || [];
  const label = { in_production: "Start production", packed: "Confirm picked & packed", reserved: "Back to reserved", shipped: "Mark shipped" };
  openDrawer(`<h2>${esc(o.order_name || "Studio order " + o.id)} ${sourceBadge(o.source)} ${statusBadge(o.status)}</h2>
    <p class="muted">${esc(o.customer || "")} ${o.email ? "· " + esc(o.email) : ""} · placed ${day(o.placed_at || o.created_at)}${o.financial_status ? " · payment " + esc(o.financial_status) : ""}</p>
    ${o.needs_attention ? `<div class="note warn">${esc(o.needs_attention)} ${admin ? '<button class="link" id="resolveBtn">Mark resolved</button>' : ""}</div>` : ""}
    <div class="row no-print" style="margin-bottom:16px">${next.map((s) => `<button class="btn ${s === "packed" ? "primary" : ""}" data-status="${s}">${label[s]}</button>`).join("")}
      ${admin && !["cancelled", "shipped"].includes(o.status) ? '<button class="btn" data-status="cancelled">Cancel order</button>' : ""}
      ${admin && o.status === "cancelled" && !o.merged_into ? '<button class="btn" data-status="reserved">Re-open & reserve</button>' : ""}
      ${admin && ["cancelled", "packed", "shipped"].includes(o.status) && d.consumed.length && !o.materials_returned ? '<button class="btn" id="returnBtn">Return materials to stock</button>' : ""}
      <a class="btn" href="/api/orders/${o.id}/packing-list.csv">Packing list CSV</a></div>
    <div class="card"><h3>Designs in this order</h3>${d.lines.map((l) => `<div class="row" style="margin-bottom:8px">
      <b>${esc(l.title || "MemoBrick")}</b> × ${l.quantity} · <a href="#/designs/${encodeURIComponent(l.design_id)}">${esc(l.design_id)}</a>
      ${l.revision ? `· revision ${l.revision} · ${esc(l.rev_size)} · ${fmt(l.total_bricks)} bricks · ${l.plates_w}×${l.plates_h} plates` : '<span class="badge b-warn">design not received yet</span>'}
      ${admin && !["packed", "shipped"].includes(o.status) ? `<button class="link small" data-line="${l.id}">use another design…</button>` : ""}</div>`).join("")}</div>
    <div class="card"><h3>Materials required ${d.mode === "packed" ? `<span class="muted small">(bricks in bags of ${d.packSize}, rounded up)</span>` : ""}</h3>
      ${d.packing.length ? packingTable(d) : '<div class="empty">Materials will appear when the design arrives.</div>'}</div>
    <div class="grid g2"><div class="card"><h3>Reserved now</h3>${d.reservation.length ? `<ul class="list">${d.reservation.map((r) => `<li>${sw(r.hex, "sm")} ${esc(r.name)}<span class="spacer"></span><b>${fmt(r.qty)}</b></li>`).join("")}</ul>` : '<div class="empty">Nothing reserved.</div>'}</div>
    <div class="card"><h3>Consumed</h3>${d.consumed.length ? `<ul class="list">${d.consumed.map((r) => `<li>${sw(r.hex, "sm")} ${esc(r.name)}<span class="spacer"></span><b>${fmt(r.qty)}</b></li>`).join("")}</ul>${o.materials_returned ? '<p class="small muted">Returned to stock.</p>' : ""}` : '<div class="empty">Nothing consumed yet.</div>'}</div></div>
    <h3>Inventory movements for this order</h3>${movementRows(d.history)}`);
  $$("[data-status]", $("#drawer")).forEach((b) => b.addEventListener("click", async () => {
    const s = b.dataset.status;
    if (s === "cancelled" && !confirm("Cancel this order? Its reservation will be released.")) return;
    if (s === "packed" && !confirm("Confirm every item on the packing list has been picked? This deducts the materials from stock.")) return;
    await act(() => api(`/api/orders/${o.id}/status`, { method: "POST", body: { status: s } }), "Order updated");
    openOrder(o.id); render();
  }));
  $("#returnBtn")?.addEventListener("click", async () => {
    const reason = prompt("Why are these materials going back into stock?", "Order cancelled — kit returned unopened");
    if (reason == null) return;
    await act(() => api(`/api/orders/${o.id}/return`, { method: "POST", body: { reason } }), "Materials returned to stock");
    openOrder(o.id);
  });
  $("#resolveBtn")?.addEventListener("click", async () => { await act(() => api(`/api/orders/${o.id}/resolve`, { method: "POST" })); openOrder(o.id); });
  $$("[data-line]", $("#drawer")).forEach((b) => b.addEventListener("click", async () => {
    const designId = prompt("Design ID to produce this item from (e.g. ST-… from the Studio):");
    if (!designId) return;
    await act(() => api(`/api/orders/${o.id}/lines/${b.dataset.line}/design`, { method: "POST", body: { designId } }), "Design changed — reservation updated");
    openOrder(o.id);
  }));
}

/* ============================================================ PRODUCTION */
VIEWS.production = async (el) => {
  const { orders } = await api("/api/production");
  el.innerHTML = `<div class="row no-print" style="margin-bottom:14px"><p class="muted" style="margin:0">Paid orders with their exact materials. Tick items as you pick, then confirm to deduct stock.</p>
    <span class="spacer"></span><button class="btn" id="printAll">Print packing lists</button></div>
    ${orders.length ? orders.map((d) => `<section class="pcard">
      <div class="row between"><h3>${esc(d.order.order_name || "Studio order " + d.order.id)} ${sourceBadge(d.order.source)} ${statusBadge(d.order.status)}</h3>
      <div class="row no-print">${d.order.status === "reserved" ? `<button class="btn" data-go="${d.order.id}" data-s="in_production">Start production</button>` : ""}
      <button class="btn primary" data-go="${d.order.id}" data-s="packed">Confirm picked &amp; packed</button></div></div>
      <p class="muted small">${esc(d.order.customer || "")} · ${d.lines.map((l) => `${esc(l.rev_size || l.size_label || "")} × ${l.quantity} (${esc(l.design_id)}${l.revision ? " r" + l.revision : ""})`).join(", ")}</p>
      ${d.order.needs_attention ? `<div class="note warn">${esc(d.order.needs_attention)}</div>` : ""}
      ${d.packing.length ? packingTable(d, { picking: true }) : '<div class="empty">Waiting for the design.</div>'}</section>`).join("")
      : `<div class="card empty">No orders waiting for production.</div>`}`;
  $("#printAll").addEventListener("click", () => window.print());
  $$("[data-go]", el).forEach((b) => b.addEventListener("click", async () => {
    if (b.dataset.s === "packed"){
      const boxes = $$("input[type=checkbox]", b.closest(".pcard"));
      if (boxes.some((x) => !x.checked) && !confirm("Not every item is ticked as picked. Deduct the materials anyway?")) return;
    }
    await act(() => api(`/api/orders/${b.dataset.go}/status`, { method: "POST", body: { status: b.dataset.s } }), b.dataset.s === "packed" ? "Packed — materials deducted" : "Started");
    render();
  }));
};

/* =============================================================== DESIGNS */
VIEWS.designs = async (el, arg) => {
  const q = $("#designSearch", el)?.value || "";
  const { designs } = await api(`/api/designs?${new URLSearchParams(q ? { q } : {})}`);
  el.innerHTML = `<div class="row" style="margin-bottom:14px"><input class="search" id="designSearch" placeholder="Design ID, project, order or customer" value="${esc(q)}"></div>
    <p class="muted small">Studio designs and website designs that belong to an order. Every change is kept as a revision.</p>
    ${designs.length ? `<div class="tbl-wrap"><table><thead><tr><th>Design</th><th>Source</th><th>Title / customer</th><th>Size</th><th class="n">Bricks</th><th class="n">Revision</th><th>Orders</th><th>Updated</th></tr></thead>
    <tbody>${designs.map((d) => `<tr><td><a href="#/designs/${encodeURIComponent(d.id)}" class="mono">${esc(d.id)}</a></td><td>${sourceBadge(d.source)}</td>
      <td>${esc(d.title || "")} ${d.customer ? "· " + esc(d.customer) : ""}${d.order_ref ? ` <span class="muted">${esc(d.order_ref)}</span>` : ""}</td><td>${esc(d.size_label || "")}</td>
      <td class="n">${fmt(d.total_bricks)}</td><td class="n">${d.current_revision}</td><td>${esc(d.orders || "")}</td><td class="small">${when(d.updated_at)}</td></tr>`).join("")}</tbody></table></div>`
      : `<div class="card empty">No designs yet.</div>`}`;
  const s = $("#designSearch", el); let t;
  s.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => VIEWS.designs(el).then(() => { const n = $("#designSearch"); n.focus(); n.setSelectionRange(n.value.length, n.value.length); }), 300); });
  if (arg) openDesign(decodeURIComponent(arg));
};
async function openDesign(id){
  const d = await api(`/api/designs/${encodeURIComponent(id)}`);
  openDrawer(`<h2 class="mono">${esc(id)} ${sourceBadge(d.design.source)}</h2>
    <p class="muted">${esc(d.design.title || "")} ${d.design.customer ? "· " + esc(d.design.customer) : ""} · ${esc(d.size || "")} · ${fmt(d.totalBricks)} bricks · revision ${d.revision}</p>
    ${d.uncounted.length ? `<div class="note warn">${d.uncounted.length} required item(s) aren't counted yet, so availability is unknown for them.</div>` : ""}
    ${d.shortages.length ? `<div class="note bad">Not enough stock: ${d.shortages.map((s) => `${esc(s.name)} short ${fmt(s.shortage)}`).join(", ")}. Colors are never substituted automatically.</div>` : ""}
    <div class="grid g2"><div class="card"><h3>Brick matrix (revision ${d.revision})</h3><canvas class="matrix" id="mx"></canvas>
      <p class="small muted">Drawn from the exact matrix the editor sent — one pixel per stud.</p></div>
    <div class="card"><h3>Revisions</h3><ul class="list">${d.revisions.map((r) => `<li><b>r${r.revision}</b> ${esc(r.size_label)} · ${fmt(r.total_bricks)} bricks · ${r.colors} colors<span class="spacer"></span><span class="small muted">${when(r.created_at)}</span></li>`).join("")}</ul>
      ${d.orders.length ? `<h3 style="margin-top:14px">Orders</h3><ul class="list">${d.orders.map((o) => `<li><a href="#/orders/${o.id}">${esc(o.order_name || "Order " + o.id)}</a> ${statusBadge(o.status)}</li>`).join("")}</ul>` : ""}</div></div>
    <div class="card"><h3>Exact requirements & availability</h3><div class="tbl-wrap"><table><thead><tr><th>Item</th><th>Code</th><th class="n">Bricks in design</th><th class="n">To pick</th><th class="n">Available</th><th>Status</th></tr></thead>
      <tbody>${d.lines.map((l) => `<tr><td>${sw(l.hex, "sm")} ${esc(l.name)}</td><td class="mono">${esc(l.code || l.sku)}</td><td class="n">${l.category === "brick" ? fmt(l.exact) : ""}</td>
      <td class="n">${fmt(l.need)}</td><td class="n">${l.available == null ? '<span class="uncounted">not counted</span>' : fmt(l.available)}</td>
      <td>${!l.counted ? '<span class="badge b-warn">not counted</span>' : l.shortage ? `<span class="badge b-bad">short ${fmt(l.shortage)}</span>` : '<span class="badge b-ok">ok</span>'}</td></tr>`).join("")}</tbody></table></div></div>`);
  try {
    const m = await api(`/api/designs/${encodeURIComponent(id)}/revisions/${d.revision}/matrix`);
    const cv = $("#mx"); cv.width = m.w; cv.height = m.h;
    const ctx = cv.getContext("2d"), img = ctx.createImageData(m.w, m.h);
    const bytes = Uint8Array.from(atob(m.cells), (c) => c.charCodeAt(0));
    const rgb = m.palette.map((p) => [1, 3, 5].map((i) => parseInt(String(p[2] || "#888888").slice(i, i + 2), 16)));
    bytes.forEach((k, i) => { const c = rgb[k] || [0, 0, 0]; img.data.set([c[0], c[1], c[2], 255], i * 4); });
    ctx.putImageData(img, 0, 0);
    cv.style.width = Math.min(380, m.w * 4) + "px";
  } catch {}
}

/* =============================================================== HISTORY */
VIEWS.history = async (el) => {
  const type = $("#hType", el)?.value || "", category = $("#hCat", el)?.value || "", q = $("#hQ", el)?.value || "";
  const { movements } = await api(`/api/movements?${new URLSearchParams({ ...(type && { type }), ...(category && { category }), ...(q && { q }) })}`);
  el.innerHTML = `<div class="row" style="margin-bottom:14px">
    <select id="hType"><option value="">All movements</option>${Object.entries(MOVE).map(([k, v]) => `<option value="${k}" ${type === k ? "selected" : ""}>${v}</option>`).join("")}</select>
    <select id="hCat"><option value="">All items</option>${[["brick", "Bricks"], ["board", "Boards"], ["tool", "Tools"]].map(([k, v]) => `<option value="${k}" ${category === k ? "selected" : ""}>${v}</option>`).join("")}</select>
    <input class="search" id="hQ" placeholder="Item, order or reason" value="${esc(q)}"><span class="spacer"></span><a class="btn" href="/api/export/movements.csv">Export CSV</a></div>
    <p class="muted small">Every change to stock or reservations — newest first (latest 300 shown; export for everything).</p>${movementRows(movements)}`;
  ["#hType", "#hCat"].forEach((s) => $(s, el).addEventListener("change", () => VIEWS.history(el)));
  let t; $("#hQ", el).addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => VIEWS.history(el).then(() => { const n = $("#hQ"); n.focus(); n.setSelectionRange(n.value.length, n.value.length); }), 300); });
};

/* ============================================================ RESTOCKING */
VIEWS.restock = async (el) => {
  const [{ items }, { restocks }] = await Promise.all([api("/api/items"), api("/api/restocks")]);
  const opts = items.filter((i) => i.active).map((i) => `<option value="${i.id}">${esc(i.category === "brick" ? `${i.color_code} · ${i.name}` : i.name)}${i.on_hand == null ? " (not counted)" : ""}</option>`).join("");
  const line = () => `<div class="row restock-line" style="margin-bottom:8px"><select name="item" style="flex:1;min-width:200px">${opts}</select>
    <input name="qty" class="num" inputmode="numeric" placeholder="Qty"><button type="button" class="btn sm" data-rm>Remove</button></div>`;
  el.innerHTML = `<div class="grid g2"><form class="card" id="rsForm"><h2>Record a supplier delivery</h2>
    <div class="row"><label class="field" style="flex:1"><span>Supplier</span><input name="supplier"></label><label class="field" style="flex:1"><span>Reference / PO</span><input name="reference"></label></div>
    <div class="row"><label class="field"><span>Received</span><input name="receivedAt" type="date" value="${new Date().toISOString().slice(0, 10)}"></label></div>
    <div id="rsLines">${line()}</div><button type="button" class="btn sm" id="addLine">＋ Add item</button>
    <label class="field" style="margin-top:12px"><span>Notes</span><textarea name="notes" rows="2"></textarea></label>
    <p class="small muted">Items must have an initial count before a delivery can be added to them.</p>
    <button class="btn primary">Add to stock</button></form>
    <div class="card"><h2>Recent deliveries</h2>${restocks.length ? `<ul class="list">${restocks.map((r) => `<li><div><b>${esc(r.supplier || "Delivery")}</b> ${r.reference ? `<span class="muted">${esc(r.reference)}</span>` : ""} · ${day(r.received_at)}
      <div class="small">${r.lines.map((l) => `${sw(l.hex, "sm")} ${esc(l.name)} +${fmt(l.qty)}`).join(" · ")}</div><div class="small muted">by ${esc(r.user_name || "—")}</div></div></li>`).join("")}</ul>` : '<div class="empty">No deliveries recorded yet.</div>'}</div></div>`;
  $("#addLine").addEventListener("click", () => $("#rsLines").insertAdjacentHTML("beforeend", line()));
  $("#rsLines").addEventListener("click", (e) => { if (e.target.closest("[data-rm]") && $$(".restock-line").length > 1) e.target.closest(".restock-line").remove(); });
  $("#rsForm").addEventListener("input", (e) => e.target.classList.add("dirty"));
  $("#rsForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.target;
    const lines = $$(".restock-line").map((l) => ({ itemId: Number($("select", l).value), qty: Number($("input", l).value) })).filter((l) => l.qty);
    await act(() => api("/api/restocks", { method: "POST", body: { supplier: f.supplier.value, reference: f.reference.value, receivedAt: f.receivedAt.value, notes: f.notes.value, lines } }), "Delivery added to stock");
    render();
  });
};

/* =============================================================== REPORTS */
let reportDays = 90;
VIEWS.reports = async (el) => {
  const r = await api(`/api/reports?days=${reportDays}`);
  const maxUse = Math.max(1, ...r.mostUsed.map((m) => m.consumed));
  const buy = r.needs.filter((n) => n.buy > 0), unknown = r.needs.filter((n) => n.buy == null && (n.reserved || n.pending_qty));
  el.innerHTML = `<div class="row" style="margin-bottom:14px"><div class="tabs">${[30, 90, 365].map((d) => `<button data-d="${d}" class="${reportDays === d ? "on" : ""}">Last ${d} days</button>`).join("")}</div></div>
    <div class="kpis"><div class="kpi"><span>Bricks consumed</span><b>${fmt(r.consumed.bricks)}</b></div><div class="kpi"><span>Boards consumed</span><b>${fmt(r.consumed.boards)}</b></div>
      <div class="kpi"><span>Tools consumed</span><b>${fmt(r.consumed.tools)}</b></div><div class="kpi"><span>Orders packed</span><b>${fmt(r.consumed.orders)}</b></div></div>
    <div class="card"><h2>What to buy</h2><p class="muted small">Reserved for paid orders + needed by unpaid orders + your minimum level − on hand.</p>
      ${buy.length ? `<div class="tbl-wrap"><table><thead><tr><th>Item</th><th class="n">On hand</th><th class="n">Reserved</th><th class="n">Unpaid orders</th><th class="n">Minimum</th><th class="n">Buy</th></tr></thead>
      <tbody>${buy.map((n) => `<tr><td>${sw(n.hex, "sm")} ${esc(n.name)} <span class="muted mono">${esc(n.sku)}</span></td><td class="n">${fmt(n.on_hand)}</td><td class="n">${fmt(n.reserved)}</td>
      <td class="n">${fmt(n.pending_qty)}</td><td class="n">${fmt(n.min_level)}</td><td class="n"><b>${fmt(n.buy)}</b></td></tr>`).join("")}</tbody></table></div>` : '<div class="empty">Nothing to buy right now.</div>'}
      ${unknown.length ? `<div class="note warn" style="margin-top:12px">Count these first to know if they need buying: ${unknown.map((n) => esc(n.name)).join(", ")}</div>` : ""}</div>
    <div class="grid g2"><div class="card"><h2>Most used colors</h2>${r.mostUsed.length ? r.mostUsed.slice(0, 20).map((m) => `<div class="hbar"><span>${sw(m.hex, "sm")} ${esc(m.name)}</span>
      <span class="track"><i style="width:${m.consumed / maxUse * 100}%;background:${esc(m.hex)};box-shadow:inset 0 0 0 1px rgba(0,0,0,.12)"></i></span><span class="n">${fmt(m.consumed)}</span></div>`).join("") : '<div class="empty">No bricks consumed in this period.</div>'}</div>
    <div class="card"><h2>Consumption over time</h2>${chart(r.overTime)}</div></div>
    <div class="grid g2"><div class="card"><h2>Material usage by order</h2>${r.byOrder.length ? `<div class="tbl-wrap"><table><thead><tr><th>Order</th><th class="n">Bricks</th><th class="n">Boards</th><th class="n">Tools</th></tr></thead>
      <tbody>${r.byOrder.map((o) => `<tr><td><a href="#/orders/${o.id}">${esc(o.order_name || "Studio " + o.id)}</a></td><td class="n">${fmt(o.bricks)}</td><td class="n">${fmt(o.boards)}</td><td class="n">${fmt(o.tools)}</td></tr>`).join("")}</tbody></table></div>` : '<div class="empty">No packed orders in this period.</div>'}</div>
    <div class="card"><h2>Low-stock materials</h2>${r.low.length ? `<ul class="list">${r.low.map((l) => `<li class="${l.kind === "shortage" ? "alert-bad" : "alert-warn"}">${sw(l.hex, "sm")} ${esc(l.name)}<span class="spacer"></span>${fmt(l.on_hand - l.reserved)} avail / min ${fmt(l.min_level)}</li>`).join("")}</ul>` : '<div class="empty">Nothing is low.</div>'}</div></div>`;
  $$(".tabs button", el).forEach((b) => b.addEventListener("click", () => { reportDays = Number(b.dataset.d); render(); }));
};
function chart(rows){
  if (!rows.length) return '<div class="empty">No consumption in this period.</div>';
  const W = 560, H = 200, P = 28, max = Math.max(1, ...rows.map((r) => r.bricks || 0));
  const bw = (W - P * 2) / rows.length;
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Bricks consumed per week">
    ${rows.map((r, i) => { const h = (r.bricks || 0) / max * (H - P * 2); return `<rect x="${P + i * bw + 2}" y="${H - P - h}" width="${Math.max(2, bw - 4)}" height="${h}" rx="3" fill="#D53A2E"><title>Week of ${day(r.week)}: ${fmt(r.bricks)} bricks</title></rect>`; }).join("")}
    <line x1="${P}" y1="${H - P}" x2="${W - P}" y2="${H - P}" stroke="#ccc"/><text x="${P}" y="${P - 8}">${fmt(max)} bricks</text>
    <text x="${P}" y="${H - 8}">${day(rows[0].week)}</text><text x="${W - P}" y="${H - 8}" text-anchor="end">${day(rows[rows.length - 1].week)}</text></svg>`;
}

/* ============================================================ SETUP */
VIEWS.setup = async (el) => {
  const { items } = await api("/api/items");
  const todo = items.filter((i) => i.on_hand == null && i.active);
  el.innerHTML = `<div class="note">Enter how many of each item you physically have. Leave a field blank if you haven't counted it yet — blank is kept as “not counted”, never as zero.</div>
    ${!isAdmin() ? '<div class="note warn">Only admins can enter stock.</div>' : ""}
    <div class="grid g2"><div class="card"><h2>${todo.length ? `${todo.length} item${todo.length === 1 ? "" : "s"} to count` : "Everything has been counted"}</h2>
      ${todo.length ? `${saveBar()}${itemTable(todo, { brick: true })}` : '<p class="muted">Recount any time from Brick Inventory or Boards & Tools.</p>'}</div>
    <div class="card"><h2>Import from CSV</h2><p class="muted small">Columns: <span class="mono">sku</span> (or <span class="mono">color_code</span>), <span class="mono">on_hand</span>, optional <span class="mono">min_level</span>.
      Blank cells are skipped. Nothing is imported if any row has a problem.</p>
      <a class="btn sm" href="/api/export/items.csv">Download a template (current inventory)</a>
      <label class="field" style="margin-top:12px"><span>CSV file</span><input type="file" id="csvFile" accept=".csv,text/csv"></label>
      <label class="field"><span>…or paste CSV</span><textarea id="csvText" rows="8" class="mono" placeholder="sku,on_hand,min_level&#10;BRK-001,12000,2000"></textarea></label>
      <button class="btn primary" id="csvGo" ${isAdmin() ? "" : "disabled"}>Import</button><p class="err" id="csvErr"></p></div></div>`;
  wireItemTable(el, () => render());
  $("#csvFile").addEventListener("change", async (e) => { const f = e.target.files[0]; if (f){ $("#csvText").value = await f.text(); $("#csvText").classList.add("dirty"); } });
  $("#csvText").addEventListener("input", (e) => e.target.classList.add("dirty"));
  $("#csvGo").addEventListener("click", async () => {
    $("#csvErr").textContent = "";
    try {
      const out = await api("/api/import/counts", { method: "POST", body: { csv: $("#csvText").value } });
      $("#csvText").classList.remove("dirty");
      toast(`Imported ${out.counts} counts and ${out.minimums} minimums`); render();
    } catch (e){ $("#csvErr").textContent = e.message; }
  });
};

/* ============================================================ SETTINGS */
VIEWS.settings = async (el) => {
  if (!isAdmin()){ el.innerHTML = '<div class="note warn">Only admins can change settings.</div>'; return; }
  const [s, u, log, rec] = await Promise.all([api("/api/settings"), api("/api/users"), api("/api/integration-log"), api("/api/reconcile")]);
  const st = s.settings;
  el.innerHTML = `<div class="grid g2"><form class="card" id="kitForm"><h2>Kit contents</h2>
      <p class="muted small">From the build booklet's “What's in the box”: one bag per color (bags of ${st.brick_pack_size}, rounded up), one 10×10 baseplate per 10 inches of mosaic (the 16×16 kit uses one 16×16 board), and 1 brick separator.</p>
      <label class="field"><span>Bricks reserved and picked as</span><select name="mode">
        <option value="packed" ${st.brick_quantity_mode === "packed" ? "selected" : ""}>Packed quantity (bags rounded up — what leaves the shelf)</option>
        <option value="exact" ${st.brick_quantity_mode === "exact" ? "selected" : ""}>Exact bricks in the design</option></select></label>
      <label class="field"><span>Bricks per bag</span><input name="pack" class="num" value="${st.brick_pack_size}" inputmode="numeric"></label>
      ${s.tools.map((t) => `<label class="field"><span>${esc(t.name)} per kit</span><input class="num" data-tool="${esc(t.sku)}" value="${st.tools_per_kit?.[t.sku] ?? 0}" inputmode="numeric"></label>`).join("")}
      <p class="small muted">Changes apply to designs saved from now on; designs already saved keep the materials they were saved with.</p>
      <button class="btn primary">Save kit contents</button></form>
    <div class="card"><h2>Sizes → boards</h2><div class="tbl-wrap" style="max-height:340px"><table><thead><tr><th>Size</th><th class="n">Studs</th><th>Board</th><th class="n">Boards</th><th>Source</th></tr></thead>
      <tbody>${s.sizes.map((z) => `<tr><td>${esc(z.label)}</td><td class="n">${z.studs_w}×${z.studs_h}</td><td>${z.board_sku === "BOARD-16" ? "16×16" : "10×10"}</td><td class="n">${z.boards}</td><td>${z.source === "custom" ? '<span class="badge b-warn">Studio custom</span>' : "editor"}</td></tr>`).join("")}</tbody></table></div></div></div>
    <div class="grid g2"><div class="card"><h2>Team</h2><div class="tbl-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th></th></tr></thead><tbody>${u.users.map((x) => `<tr>
      <td>${esc(x.name)}</td><td>${esc(x.email)}</td><td>${x.role}</td><td>${x.active ? (x.id === ME.id ? "" : `<button class="btn sm" data-deact="${x.id}">Deactivate</button>`) : '<span class="badge b-mute">inactive</span>'}</td></tr>`).join("")}</tbody></table></div>
      <form id="userForm" style="margin-top:14px"><h3>Add a team member</h3><div class="row"><input name="name" placeholder="Name" required><input name="email" type="email" placeholder="Email" required></div>
      <div class="row" style="margin-top:8px"><select name="role"><option value="production">Production staff</option><option value="admin">Admin</option></select>
      <input name="password" type="password" placeholder="Temporary password (10+ chars)" minlength="10" required><button class="btn">Add</button></div>
      <p class="small muted">Production staff can view everything, start production, pack orders and receive deliveries. Admins can also change stock, settings and users.</p></form></div>
    <div class="card"><h2>Integrations</h2><ul class="list">
      <li>${s.integrations.shopifySecret ? '<span class="badge b-ok">on</span>' : '<span class="badge b-bad">off</span>'} Shopify webhooks ${s.integrations.shop ? `· ${esc(s.integrations.shop)}` : ""}</li>
      <li>${s.integrations.origins.length ? '<span class="badge b-ok">on</span>' : '<span class="badge b-bad">off</span>'} Editor origins: ${esc(s.integrations.origins.join(", ") || "none set (CORS_ORIGINS)")}</li>
      <li>${s.integrations.alertWebhook ? '<span class="badge b-ok">on</span>' : '<span class="badge b-mute">off</span>'} Low-stock notifications (ALERT_WEBHOOK_URL)</li></ul>
      <h3 style="margin-top:14px">Studio API keys</h3><ul class="list">${u.keys.map((k) => `<li>${esc(k.name)} <span class="muted small">${day(k.created_at)}</span><span class="spacer"></span>${k.revoked_at ? '<span class="badge b-mute">revoked</span>' : `<button class="btn sm" data-revoke="${k.id}">Revoke</button>`}</li>`).join("") || '<li class="muted">No keys yet.</li>'}</ul>
      <button class="btn" id="newKey" style="margin-top:10px">Create Studio API key</button></div></div>
    <div class="card"><div class="row between"><h2>Reconciliation</h2>${rec.issues.length ? '<button class="btn primary" id="fixRec">Correct to the ledger</button>' : ""}</div>
      ${rec.issues.length ? `<div class="note bad">${rec.issues.length} item(s) disagree with the ledger.</div><div class="tbl-wrap"><table><thead><tr><th>Item</th><th class="n">On hand</th><th class="n">Ledger says</th><th class="n">Reserved</th><th class="n">Reservations say</th></tr></thead>
        <tbody>${rec.issues.map((i) => `<tr><td>${esc(i.name)}</td><td class="n">${fmt(i.on_hand)}</td><td class="n">${fmt(i.on_hand_expected)}</td><td class="n">${fmt(i.reserved)}</td><td class="n">${fmt(i.reserved_expected)}</td></tr>`).join("")}</tbody></table></div>`
        : `<p class="muted">All ${rec.checked} items match the ledger and the live reservations.</p>`}</div>
    <div class="grid g2"><div class="card"><h2>Shopify events</h2>${log.webhooks.length ? `<div class="tbl-wrap" style="max-height:320px"><table><thead><tr><th>Received</th><th>Topic</th><th>Status</th><th></th></tr></thead><tbody>${log.webhooks.map((w) => `<tr>
      <td class="small">${when(w.received_at)}</td><td>${esc(w.topic)}</td><td>${w.status === "done" ? '<span class="badge b-ok">done</span>' : w.status === "failed" ? `<span class="badge b-bad" title="${esc(w.last_error)}">failed ×${w.attempts}</span>` : `<span class="badge b-mute">${esc(w.status)}</span>`}</td>
      <td>${w.status === "failed" ? `<button class="btn sm" data-retry="${esc(w.id)}">Retry</button>` : ""}</td></tr>`).join("")}</tbody></table></div>` : '<div class="empty">No events received yet.</div>'}</div>
    <div class="card"><h2>Errors</h2>${log.errors.length ? `<ul class="list">${log.errors.slice(0, 30).map((e) => `<li class="small"><div><b>${esc(e.context)}</b> · ${when(e.created_at)}<br>${esc(e.message)}</div></li>`).join("")}</ul>` : '<div class="empty">No errors logged.</div>'}</div></div>`;
  $("#kitForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.target, tools = {};
    $$("[data-tool]", f).forEach((i) => (tools[i.dataset.tool] = Number(i.value)));
    const out = await act(() => api("/api/settings", { method: "PUT", body: { brick_quantity_mode: f.mode.value, brick_pack_size: Number(f.pack.value), tools_per_kit: tools } }));
    toast(out.note);
  });
  $("#userForm").addEventListener("submit", async (e) => {
    e.preventDefault(); const f = e.target;
    await act(() => api("/api/users", { method: "POST", body: { name: f.name.value, email: f.email.value, role: f.role.value, password: f.password.value } }), "Team member added");
    render();
  });
  $$("[data-deact]", el).forEach((b) => b.addEventListener("click", async () => {
    if (!confirm("Deactivate this account? They'll be signed out.")) return;
    await act(() => api(`/api/users/${b.dataset.deact}`, { method: "PATCH", body: { active: false } }), "Deactivated"); render();
  }));
  $("#newKey").addEventListener("click", async () => {
    const out = await act(() => api("/api/api-keys", { method: "POST", body: { name: "MemoBrick Studio" } }));
    openDrawer(`<h2>Studio API key</h2><p class="note warn">${esc(out.note)}</p><p class="mono" style="word-break:break-all;background:#fff;padding:12px;border-radius:8px;border:1px solid var(--line)">${esc(out.key)}</p>
      <p class="muted small">Paste it into MemoBrick Studio → Inventory connection, together with this Control Center's address.</p>`);
  });
  $$("[data-revoke]", el).forEach((b) => b.addEventListener("click", async () => {
    if (!confirm("Revoke this key? Studios using it will stop syncing.")) return;
    await act(() => api(`/api/api-keys/${b.dataset.revoke}/revoke`, { method: "POST" }), "Key revoked"); render();
  }));
  $("#fixRec")?.addEventListener("click", async () => {
    if (!confirm("Correct the listed items to what the ledger and live reservations say? Each correction is recorded.")) return;
    await act(() => api("/api/reconcile/fix", { method: "POST" }), "Corrected"); render();
  });
  $$("[data-retry]", el).forEach((b) => b.addEventListener("click", async () => { await act(() => api(`/api/webhooks/${encodeURIComponent(b.dataset.retry)}/retry`, { method: "POST" }), "Retried"); render(); }));
};
