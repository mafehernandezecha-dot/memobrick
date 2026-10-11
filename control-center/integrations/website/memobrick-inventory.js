/* =====================================================================
   MemoBrick website editor → MEMOBRICK CONTROL CENTER
   Theme asset. Install: upload as assets/memobrick-inventory.js and render
   snippets/memobrick-inventory.liquid after memobrick.js in layout/theme.liquid.

   How it gets EXACT brick counts without touching the editor:
   the editor's checkout calls window.MB_addToCart({ sizeId, buildForMe,
   state }) where `state` is the editor's own live state — including the
   final brick matrix (state.cells: one palette index per stud) and the
   palette it indexes (state.usedPal: name, hex, MemoBrick code, supplier
   code). This file wraps MB_addToCart:
     1. picks the Design ID the editor will put on the cart line
        (MB_addToCart honours opts.designId — the editor's own option),
     2. sends that matrix to the Control Center under the same Design ID,
     3. hands over to the editor's original add-to-cart, unchanged.
   The Shopify order webhook later finds the line's "Design ID" property and
   links the order to this exact design.

   It never blocks or slows checkout: sending happens alongside the cart
   request, failures are kept in this browser and retried on the next page.
   ===================================================================== */
(() => {
  "use strict";
  const CFG = window.MB_INVENTORY || {};
  if (!CFG.url) return;
  const BASE = String(CFG.url).replace(/\/+$/, "");
  const OUTBOX = "mb_inv_outbox";
  const MAX_OUTBOX = 8;

  function readOutbox(){ try { return JSON.parse(localStorage.getItem(OUTBOX) || "{}") || {}; } catch (e){ return {}; } }
  function writeOutbox(o){
    try {
      const keys = Object.keys(o).sort((a, b) => (o[a].t || 0) - (o[b].t || 0));
      while (keys.length > MAX_OUTBOX) delete o[keys.shift()];
      localStorage.setItem(OUTBOX, JSON.stringify(o));
    } catch (e){ /* storage full / private mode: the live request still goes out */ }
  }

  function toBase64(bytes){
    let bin = "";
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  }

  /* the editor's final matrix + palette, untouched */
  function designBody(state){
    const size = state.size || {};
    const cells = state.cells, pal = state.usedPal;
    if (!cells || !pal || !pal.length || cells.length !== size.gw * size.gh) return null;
    if (pal.length > 255) return null;
    const bytes = new Uint8Array(cells.length);
    for (let i = 0; i < cells.length; i++) bytes[i] = cells[i];
    return {
      size: { id: size.id, label: size.label, gw: size.gw, gh: size.gh, bx: size.bx, by: size.by },
      palette: pal.map((c) => [c.id, c.name, c.hex, c.brick]),
      cells: toBase64(bytes),
      editor: "memobrick-website",
    };
  }

  function post(id, body){
    const json = JSON.stringify(body);
    return fetch(BASE + "/api/website/designs/" + encodeURIComponent(id), {
      method: "POST", mode: "cors", credentials: "omit",
      headers: { "Content-Type": "application/json" },
      body: json,
      keepalive: json.length < 60000,      // survives the jump to the cart page when small enough
    }).then((r) => {
      // 2xx: stored. 409: already part of an order (stored earlier). Both mean done.
      if (r.ok || r.status === 409){ const o = readOutbox(); delete o[id]; writeOutbox(o); return true; }
      if (r.status >= 400 && r.status < 500 && r.status !== 429){ const o = readOutbox(); delete o[id]; writeOutbox(o); }
      return false;
    }).catch(() => false);
  }

  function flushOutbox(){
    const o = readOutbox();
    Object.keys(o).forEach((id) => { if (o[id] && o[id].body) post(id, o[id].body); });
  }

  function install(){
    const original = window.MB_addToCart;
    if (typeof original !== "function") return false;
    if (original.__mbInventory) return true;
    const wrapped = function (opts){
      let o = opts;
      try {
        const st = opts && opts.state;
        const body = st && designBody(st);
        if (body && typeof window.MB_designId === "function"){
          o = Object.assign({}, opts, { designId: (opts && opts.designId) || window.MB_designId() });
          const box = readOutbox(); box[o.designId] = { t: Date.now(), body }; writeOutbox(box);
          post(o.designId, body);
        }
      } catch (e){ o = opts; /* never let inventory get in the way of checkout */ }
      return original.call(this, o);
    };
    wrapped.__mbInventory = true;
    window.MB_addToCart = wrapped;
    return true;
  }

  // memobrick.js defines MB_addToCart while it boots; both scripts are
  // deferred, but wait for it anyway in case the order ever changes
  if (!install()){
    let tries = 0;
    const t = setInterval(() => { if (install() || ++tries > 40) clearInterval(t); }, 250);
  }
  if (document.readyState === "complete") flushOutbox();
  else window.addEventListener("load", flushOutbox);
})();
