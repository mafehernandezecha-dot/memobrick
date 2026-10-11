/* =====================================================================
   MemoBrick Studio → MEMOBRICK CONTROL CENTER
   Sends every saved project's exact brick grid to the shared inventory
   database, sends finished projects to production, and shows the exact
   requirements and live stock for the open project.

   Listens to team.js ("studio:saved", "studio:finished"); never changes the
   editor. If the Control Center is unreachable, the Studio keeps working
   and the sync retries on its own.
   ===================================================================== */
(() => {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmt = (n) => n == null ? "—" : Number(n).toLocaleString("en-US");
  const toast = (m) => (window.MB_TEAM ? window.MB_TEAM.toast(m) : console.log(m));

  const LS = { url: "mcc_url", key: "mcc_key", synced: "mcc_synced", outbox: "mcc_outbox" };
  const get = (k, d) => { try { const v = localStorage.getItem(k); return v == null ? d : v; } catch (e){ return d; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch (e){} };
  const getJSON = (k) => { try { return JSON.parse(get(k, "{}")) || {}; } catch (e){ return {}; } };
  const cfg = () => ({ url: get(LS.url, "").replace(/\/+$/, ""), key: get(LS.key, "") });
  const configured = () => { const c = cfg(); return !!(c.url && c.key); };
  const designId = (projectId) => "ST-" + projectId;

  /* ---------------- requests ---------------- */
  async function call(method, path, body){
    const c = cfg();
    const res = await fetch(c.url + path, {
      method, headers: { "Content-Type": "application/json", Authorization: "Bearer " + c.key },
      body: body ? JSON.stringify(body) : undefined,
    });
    let data = null;
    try { data = await res.json(); } catch (e){}
    if (!res.ok) { const err = new Error((data && data.error) || ("Control Center replied " + res.status)); err.status = res.status; throw err; }
    return data;
  }

  /* the editor's own matrix, exactly as saved with the project */
  function payload(p){
    const d = p.design;
    return {
      size: p.size, cells: d.cells,
      palette: d.pal.map(([name, hex, code, supplier]) => [code, name, hex, supplier]),
      editor: "memobrick-studio", projectId: p.id, title: p.name, orderRef: p.ref, customer: p.customer,
    };
  }
  const fingerprint = (body) => body.size.id + "|" + body.cells.length + "|" + body.cells.slice(0, 64) + body.cells.slice(-64) + "|" + body.palette.map((x) => x[0]).join(",") + "|" + body.orderRef + "|" + body.title;

  /* ---------------- sync with retry ---------------- */
  let state = { status: configured() ? "idle" : "off", message: "", revision: null };
  function setState(s){ state = Object.assign({}, state, s); paintStatus(); }

  const pending = new Map();     // projectId → latest payload
  let timer = null, busy = false;
  function queue(p){
    if (!configured() || !p || !p.design) return;
    const body = payload(p);
    const synced = getJSON(LS.synced);
    if (synced[p.id] === fingerprint(body)) return;
    pending.set(p.id, body);
    const ob = getJSON(LS.outbox); ob[p.id] = body; set(LS.outbox, JSON.stringify(ob));
    clearTimeout(timer); timer = setTimeout(flush, 1200);
  }
  async function flush(){
    if (busy || !configured()) return;
    busy = true;
    try {
      const ob = getJSON(LS.outbox);
      for (const [id, body] of Object.entries(Object.assign(ob, Object.fromEntries(pending)))){
        setState({ status: "syncing", message: "Syncing…" });
        try {
          const out = await call("PUT", "/api/studio/designs/" + designId(id), body);
          const synced = getJSON(LS.synced); synced[id] = fingerprint(body); set(LS.synced, JSON.stringify(synced));
          const left = getJSON(LS.outbox); delete left[id]; set(LS.outbox, JSON.stringify(left));
          pending.delete(id);
          setState({ status: "ok", message: "Synced · revision " + out.revision, revision: out.revision });
        } catch (e){
          if (e.status && e.status >= 400 && e.status < 500 && e.status !== 401 && e.status !== 429){
            // the Control Center rejected this design (e.g. unknown color): don't retry blindly
            const left = getJSON(LS.outbox); delete left[id]; set(LS.outbox, JSON.stringify(left)); pending.delete(id);
            setState({ status: "error", message: e.message });
            toast("Inventory: " + e.message);
          } else {
            setState({ status: "retry", message: (e.status === 401 ? "API key rejected" : "Offline") + " — will retry" });
          }
        }
      }
    } finally { busy = false; }
  }
  setInterval(() => { if (Object.keys(getJSON(LS.outbox)).length) flush(); }, 60000);
  window.addEventListener("online", flush);

  document.addEventListener("studio:saved", (e) => queue(e.detail));
  document.addEventListener("studio:finished", async (e) => {
    const p = e.detail;
    if (!configured()){ return; }
    try {
      queue(p);
      clearTimeout(timer); await flush();
      const out = await call("POST", "/api/studio/designs/" + designId(p.id) + "/production",
        { orderRef: p.ref, customer: p.customer, title: p.name });
      toast(out.linked === "shopify"
        ? (out.needsChoice ? `Sent — Shopify order ${out.orderName} has several items; choose which one in the Control Center.` : `Sent to production as Shopify order ${out.orderName}. Materials reserved.`)
        : "Sent to production. Materials reserved in the Control Center.");
      setState({ status: "ok", message: "In production" });
    } catch (err){
      setState({ status: "retry", message: "Not sent to production: " + err.message });
      toast("Inventory: couldn't send to production — " + err.message + ". Finish again once the connection is back.");
    }
  });

  /* ---------------- UI: top-bar button + panel ---------------- */
  const style = document.createElement("style");
  style.textContent = `
    .inv-dot{width:8px;height:8px;border-radius:50%;display:inline-block;background:#B0B3B8;margin-right:2px}
    .inv-dot.ok{background:#2F8A4F}.inv-dot.syncing{background:#2A6FB0}.inv-dot.retry{background:#B7791F}.inv-dot.error{background:#D53A2E}
    .inv-table{width:100%;border-collapse:collapse;font-size:13.5px}.inv-table th,.inv-table td{padding:6px 8px;border-bottom:1px solid var(--line,#e3e4e7);text-align:left}
    .inv-table td.n,.inv-table th.n{text-align:right;font-variant-numeric:tabular-nums}
    .inv-sw{display:inline-block;width:14px;height:14px;border-radius:4px;border:1px solid rgba(0,0,0,.15);vertical-align:-2px;margin-right:6px}
    .inv-badge{font-size:11.5px;font-weight:600;border-radius:999px;padding:2px 8px}.inv-ok{background:#E3F3E8;color:#1E6B3A}.inv-bad{background:#FCE4E1;color:#9B2318}.inv-warn{background:#FFF3D6;color:#7A5A00}
    .inv-status{font-size:13px;color:var(--ink-2,#5E636C);margin:0 0 12px}`;
  document.head.appendChild(style);

  const nav = $(".team-actions");
  const btn = document.createElement("button");
  btn.type = "button"; btn.className = "mini"; btn.id = "teamInventory";
  btn.innerHTML = '<span class="inv-dot" id="invDot"></span> Inventory';
  if (nav) nav.insertBefore(btn, nav.querySelector("#teamFinish"));

  const modal = document.createElement("div");
  modal.className = "team-modal"; modal.hidden = true; modal.id = "teamInvModal";
  modal.setAttribute("role", "dialog"); modal.setAttribute("aria-modal", "true");
  modal.innerHTML = `<div class="team-modal-card" style="max-width:760px">
    <button type="button" class="team-modal-x" data-close aria-label="Close">&times;</button>
    <h3>Inventory</h3><p class="inv-status" id="invStatus"></p>
    <div id="invReq"></div>
    <details id="invConn" style="margin-top:16px"><summary><b>Control Center connection</b></summary>
      <p class="team-sub" style="margin-top:8px">Ask an admin for the Control Center address and a Studio API key (Control Center → Settings → Create Studio API key). Saved in this browser only.</p>
      <label class="team-field"><span>Control Center address</span><input type="url" id="invUrl" placeholder="https://control.mymemobrick.com"></label>
      <label class="team-field"><span>Studio API key</span><input type="password" id="invKey" placeholder="mcc_…" autocomplete="off"></label>
      <div class="team-modal-actions"><button type="button" class="mini" id="invTest">Test</button><button type="button" class="btn btn-red" id="invSave">Save connection</button></div>
    </details></div>`;
  document.body.appendChild(modal);
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest("[data-close]")) modal.hidden = true; });

  function paintStatus(){
    const dot = $("#invDot");
    if (dot) dot.className = "inv-dot " + (state.status === "off" ? "" : state.status);
    btn.title = state.status === "off" ? "Not connected to the Control Center" : state.message || "Connected";
    const s = $("#invStatus");
    if (s) s.textContent = state.status === "off" ? "Not connected yet — open “Control Center connection” below." : (state.message || "Connected.");
  }

  async function showRequirements(){
    const box = $("#invReq");
    const p = window.MB_STUDIO_CURRENT && window.MB_STUDIO_CURRENT();
    if (!p){ box.innerHTML = '<p class="team-sub">Open a project with a design to see its exact brick requirements and stock.</p>'; return; }
    if (!configured()){ box.innerHTML = ""; return; }
    box.innerHTML = '<p class="team-sub">Loading requirements…</p>';
    try {
      queue(p); clearTimeout(timer); await flush();
      const a = await call("GET", "/api/studio/designs/" + designId(p.id) + "/availability");
      const row = (l) => `<tr><td><span class="inv-sw" style="background:${esc(l.hex || "#ddd")}"></span>${esc(l.name)}</td><td>${esc(l.code || l.sku)}</td>
        <td class="n">${l.category === "brick" ? fmt(l.exact) : ""}</td><td class="n"><b>${fmt(l.need)}</b></td>
        <td class="n">${l.available == null ? "not counted" : fmt(l.available)}</td>
        <td>${!l.counted ? '<span class="inv-badge inv-warn">not counted</span>' : l.shortage ? `<span class="inv-badge inv-bad">short ${fmt(l.shortage)}</span>` : '<span class="inv-badge inv-ok">ok</span>'}</td></tr>`;
      box.innerHTML = `<p class="team-sub"><b>${esc(p.name)}</b> · ${esc(a.size)} · ${fmt(a.totalBricks)} bricks · revision ${a.revision}
        ${a.ok ? '· <span class="inv-badge inv-ok">all in stock</span>' : a.shortages.length ? '· <span class="inv-badge inv-bad">' + a.shortages.length + " short</span>" : ""}</p>
        <div style="max-height:46vh;overflow:auto"><table class="inv-table"><thead><tr><th>Item</th><th>Code</th><th class="n">In design</th>
        <th class="n">To pick${a.mode === "packed" ? " (bags)" : ""}</th><th class="n">Available</th><th></th></tr></thead><tbody>${a.lines.map(row).join("")}</tbody></table></div>`;
    } catch (e){
      box.innerHTML = `<p class="team-sub">Couldn't load requirements: ${esc(e.message)}</p>`;
    }
  }

  btn.addEventListener("click", () => {
    $("#invUrl").value = cfg().url; $("#invKey").value = cfg().key;
    $("#invConn").open = !configured();
    modal.hidden = false; paintStatus(); showRequirements();
  });
  $("#invSave").addEventListener("click", () => {
    set(LS.url, $("#invUrl").value.trim()); set(LS.key, $("#invKey").value.trim());
    setState({ status: configured() ? "idle" : "off", message: configured() ? "Connection saved" : "" });
    const p = window.MB_STUDIO_CURRENT && window.MB_STUDIO_CURRENT();
    if (p) queue(p);
    showRequirements();
  });
  $("#invTest").addEventListener("click", async () => {
    set(LS.url, $("#invUrl").value.trim()); set(LS.key, $("#invKey").value.trim());
    try { await call("GET", "/api/studio/ping"); setState({ status: "ok", message: "Connected to the Control Center" }); }
    catch (e){ setState({ status: "error", message: "Connection failed: " + e.message }); }
  });
  paintStatus();
  if (configured()) flush();
})();
