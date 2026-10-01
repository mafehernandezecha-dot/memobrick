/* =====================================================================
   MemoBrick — design capture
   Saves a picture of what customers design in the editor, including
   customers who never place an order, to the store owner's Google Drive
   + Google Sheet (via a Google Apps Script web app).

   Stand-alone on purpose: it only READS the page (the #mosaic canvas,
   the file inputs, the "memobrick:added" event). It never touches the
   editor's own state, so it cannot break the design tool or checkout.
   If anything here fails, it fails silently.

   Configured from Theme settings → "Design capture" (window.MB_CAPTURE).
===================================================================== */
(() => {
  "use strict";
  const CFG = window.MB_CAPTURE || {};
  if (!CFG.url) return;

  const POLL_MS = 3000;          // how often we look at the mosaic
  const MIN_GAP_MS = 12000;      // never upload the same session more often than this
  const MAX_SIDE = 900;          // saved design size (px, longest side)
  const THUMB_SIDE = 220;        // small preview placed inside the Google Sheet
  const PHOTO_SIDE = 1000;       // saved original photo size

  /* ---------- privacy: respect Shopify's cookie / tracking consent ---------- */
  function consentOk(){
    try {
      const cp = window.Shopify && window.Shopify.customerPrivacy;
      if (cp && typeof cp.analyticsProcessingAllowed === "function")
        return !!cp.analyticsProcessingAllowed();
    } catch (e){}
    return true;   // no consent banner on this store/region → allowed
  }

  /* ---------- session: one id per photo a customer designs with ---------- */
  function newId(){
    const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const b = new Uint8Array(10);
    try { crypto.getRandomValues(b); } catch (e){ b.forEach((_, i) => b[i] = Math.random()*256|0); }
    let s = ""; for (let i = 0; i < b.length; i++) s += c[b[i] % c.length];
    return "S-" + s;
  }
  let sid = null;
  function session(){ return sid || (sid = newId()); }
  function freshSession(){ sid = newId(); lastSentHash = null; stableHash = null; lastSentAt = 0; }

  /* ---------- sending ---------- */
  function send(payload, small){
    if (!consentOk()) return;
    const body = JSON.stringify(Object.assign({
      key: CFG.key || "", sid: session(), page: location.pathname,
      email: (function(){ try { return localStorage.getItem("mb_email") || ""; } catch (e){ return ""; } })(),
      device: window.innerWidth < 768 ? "Mobile" : (window.innerWidth < 1020 ? "Tablet" : "Desktop")
    }, payload));
    try {
      fetch(CFG.url, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },   // no CORS pre-flight
        body: body,
        keepalive: !!small && body.length < 60000                   // survives the tab closing
      }).catch(() => {});
    } catch (e){}
  }

  function scaled(src, maxSide, type, q){
    const w = src.width || src.naturalWidth, h = src.height || src.naturalHeight;
    if (!w || !h) return null;
    const k = Math.min(1, maxSide / Math.max(w, h));
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(w*k)); c.height = Math.max(1, Math.round(h*k));
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(src, 0, 0, c.width, c.height);
    try { return c.toDataURL(type || "image/jpeg", q || 0.82); } catch (e){ return null; }
  }

  /* ---------- watch the mosaic ---------- */
  const $ = (s) => document.querySelector(s);
  let lastSentHash = null, stableHash = null, lastSentAt = 0, pending = false;

  function customerPhotoInEditor(){
    const view = $("#view-editor"), chip = $("#chipSrc"), mos = $("#mosaic");
    if (!view || view.hidden || !mos || !chip) return null;
    // only real customer photos — not the built-in example pictures
    if (chip.textContent.trim().indexOf("Your photo") !== 0) return null;
    return mos;
  }

  function fingerprint(mos){
    const c = document.createElement("canvas"); c.width = c.height = 24;
    const ctx = c.getContext("2d");
    ctx.drawImage(mos, 0, 0, 24, 24);
    const d = ctx.getImageData(0, 0, 24, 24).data;
    let h = 2166136261, lit = 0;
    for (let i = 0; i < d.length; i += 4){
      if (d[i+3] > 0) lit++;
      h = Math.imul(h ^ (d[i] >> 3), 16777619);
      h = Math.imul(h ^ (d[i+1] >> 3), 16777619);
      h = Math.imul(h ^ (d[i+2] >> 3), 16777619);
    }
    return lit < 50 ? null : (h >>> 0).toString(36);   // blank canvas → nothing to save
  }

  function details(){
    const t = (s) => { const el = $(s); return el ? el.textContent.trim() : ""; };
    return { board: t("#chipGrid"), colors: t("#chipPal") };
  }

  function uploadDesign(mos, hash, small){
    const image = small ? scaled(mos, 420, "image/jpeg", 0.6) : scaled(mos, MAX_SIDE);
    if (!image) return;
    lastSentHash = hash; lastSentAt = Date.now(); pending = false;
    send(Object.assign({ kind: "design", image: image,
      thumb: small ? null : scaled(mos, THUMB_SIDE, "image/jpeg", 0.7) }, details()), small);
  }

  function tick(){
    if (document.hidden) return;
    const mos = customerPhotoInEditor(); if (!mos) return;
    let h; try { h = fingerprint(mos); } catch (e){ return; }
    if (!h || h === lastSentHash) { stableHash = h; return; }
    pending = true;
    // wait until the design has stopped changing for one full tick,
    // so a slider drag doesn't upload dozens of in-between versions
    if (h !== stableHash){ stableHash = h; return; }
    if (Date.now() - lastSentAt < MIN_GAP_MS) return;
    uploadDesign(mos, h, false);
  }
  setInterval(tick, POLL_MS);

  // leaving the page with unsaved changes: send a small last version
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden || !pending) return;
    const mos = customerPhotoInEditor(); if (!mos) return;
    try { const h = fingerprint(mos); if (h && h !== lastSentHash) uploadDesign(mos, h, true); } catch (e){}
  });

  /* ---------- the customer's original photo ---------- */
  function capturePhoto(file, source){
    if (!file || !/^image\//.test(file.type || "image/")) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const image = scaled(img, PHOTO_SIDE);
      URL.revokeObjectURL(url);
      if (image) send({ kind: "photo", image: image, source: source });
    };
    img.onerror = () => URL.revokeObjectURL(url);   // e.g. HEIC on non-Apple browsers
    img.src = url;
  }

  document.addEventListener("change", (e) => {
    const el = e.target;
    if (!el || el.type !== "file" || !el.files || !el.files[0]) return;
    if (el.id === "file"){                 // new photo in the design tool
      freshSession();
      if (CFG.photo) capturePhoto(el.files[0], "Design tool");
    } else if (el.id === "svcFile"){       // "our designers do it" upload
      freshSession();
      if (CFG.photo) capturePhoto(el.files[0], "Designer service");
      else send({ kind: "note", source: "Designer service" });
    }
  }, true);

  // drag-and-drop or paste of a new photo also starts a new session
  ["drop", "paste"].forEach((ev) => document.addEventListener(ev, () => {
    if (customerPhotoInEditor() || ($("#view-upload") && !$("#view-upload").hidden)) freshSession();
  }, true));

  /* ---------- customer gave their email (Save-your-design popup) ----------
     Every upload already carries the email once we have it; this also
     sends it right away, so the session's row gets it even if the
     customer doesn't change the design again afterwards. */
  document.addEventListener("memobrick:email", (e) => {
    const email = e && e.detail && e.detail.email;
    if (email) send({ kind: "email", email: email }, true);
  });

  /* ---------- added to cart ---------- */
  document.addEventListener("memobrick:added", (e) => {
    const d = (e && e.detail) || {};
    send({ kind: "cart", designId: d.designId || "" }, true);
  });
})();
