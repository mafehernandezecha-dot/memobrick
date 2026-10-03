/* =====================================================================
   MemoBrick Studio — team layer
   Turns the editor into a project-based production tool:
     · Projects screen: create, open, duplicate, delete, import, back up
     · every project saves automatically (IndexedDB, in this browser)
     · Finish = save + generate the build-instructions PDF and preview
     · every standard size, plus custom sizes built on MemoBrick rules
   Reads and drives the editor through window.MB_TEAM (end of memobrick.js).
   ===================================================================== */
(() => {
  "use strict";
  const T = window.MB_TEAM;
  if (!T){ console.error("[MemoBrick Studio] editor engine did not load"); return; }
  const S = T.S;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const fmt = (n) => Number(n).toLocaleString("en-US");
  const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const uid = () => "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const PLATE_STUDS = 32, PLATE_IN = 10, MAX_PLATES = 10;

  /* ================= storage (IndexedDB) ================= */
  const DB_NAME = "memobrick-studio", STORE = "projects";
  let dbp = null;
  function db(){
    if (dbp) return dbp;
    dbp = new Promise((resolve, reject) => {
      const rq = indexedDB.open(DB_NAME, 1);
      rq.onupgradeneeded = () => rq.result.createObjectStore(STORE, { keyPath: "id" });
      rq.onsuccess = () => resolve(rq.result);
      rq.onerror = () => reject(rq.error);
    });
    return dbp;
  }
  async function tx(mode, fn){
    const d = await db();
    return new Promise((resolve, reject) => {
      const t = d.transaction(STORE, mode);
      const out = fn(t.objectStore(STORE));
      t.oncomplete = () => resolve(out && "result" in out ? out.result : undefined);
      t.onerror = () => reject(t.error);
    });
  }
  const dbAll = () => tx("readonly", (s) => s.getAll());
  const dbGet = (id) => tx("readonly", (s) => s.get(id));
  const dbPut = (p) => tx("readwrite", (s) => s.put(p));
  const dbDel = (id) => tx("readwrite", (s) => s.delete(id));

  /* ================= sizes ================= */
  function shapeOf(bx, by){ return bx === by ? "square" : bx > by ? "landscape" : "portrait"; }
  /* a size from a baseplate count, built exactly like the standard kits:
     32 × 32-stud plates, 10" each. Reuses a standard size when one matches. */
  function sizeFor(bx, by){
    bx = Math.max(1, Math.min(MAX_PLATES, Math.round(+bx || 1)));
    by = Math.max(1, Math.min(MAX_PLATES, Math.round(+by || 1)));
    const gw = bx * PLATE_STUDS, gh = by * PLATE_STUDS;
    const found = T.SIZES.find((z) => z.gw === gw && z.gh === gh && z.bx === bx && z.by === by);
    if (found) return found;
    const z = {
      id: `${bx * PLATE_IN}x${by * PLATE_IN}`, label: `${bx * PLATE_IN} × ${by * PLATE_IN}"`,
      gw, gh, bx, by, hours: bx * by, price: 0, shape: shapeOf(bx, by),
      note: "Custom size", custom: true,
    };
    T.SIZES.push(z);
    T.renderSizePickers();
    return z;
  }
  const sizeById = (id) => T.SIZES.find((z) => z.id === id) || null;
  const sizeRecord = (z) => z && z.custom ? { bx: z.bx, by: z.by } : null;
  function ensureSize(p){
    if (p.customSize) return sizeFor(p.customSize.bx, p.customSize.by);
    return sizeById(p.sizeId) || sizeById("20x20");
  }
  const bySizeArea = () => T.SIZES.slice().sort((a, b) => a.gw * a.gh - b.gw * b.gh);

  /* ================= current project + autosave ================= */
  let current = null;          // the open project record (photo kept out of memory copy)
  let startImgId = 0;          // photos adopted after this id belong to `current`
  let lastSig = "", lastPhotoImgId = -1, saving = false;

  function stateOf(){
    return {
      sizeId: S.size.id, zoom: S.zoom, ox: S.ox, oy: S.oy, bg: S.bg, bgEffect: S.bgEffect,
      bri: S.bri, con: S.con, sat: S.sat, temp: S.temp, detail: S.detail,
      dither: S.dither, shadows: S.shadows, warm: S.warm, auto: S.auto, pal: S.pal,
      excludedColors: S.excludedColors ? [...S.excludedColors] : [],
      edits: S.edits && S.edits.size ? [...S.edits.entries()] : [],
    };
  }
  function cellsHash(){
    const c = S.cells; if (!c) return 0;
    let h = c.length;
    for (let i = 0; i < c.length; i++) h = (h * 31 + c[i]) | 0;
    return h;
  }
  const ownsPhoto = () => !!(current && S.uploaded && S.img && S.imgId > startImgId);
  const hasDesign = () => !!(ownsPhoto() && S.cells && S.usedPal);

  /* the finished brick grid itself, stored with the project so reopening
     shows exactly what was approved (base64 of the cell palette indices) */
  function designRecord(){
    if (!S.cells || !S.usedPal) return null;
    const bytes = new Uint8Array(S.cells.length);
    for (let i = 0; i < S.cells.length; i++) bytes[i] = S.cells[i];
    let bin = "";
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return { gw: S.size.gw, gh: S.size.gh, cells: btoa(bin),
             pal: S.usedPal.map((c) => [c.name, c.hex, c.id, c.brick]) };
  }
  function restoreDesign(d){
    if (!d || d.gw !== S.size.gw || d.gh !== S.size.gh) return false;
    const bin = atob(d.cells);
    if (bin.length !== d.gw * d.gh) return false;
    const cells = new Int16Array(bin.length);
    for (let i = 0; i < bin.length; i++) cells[i] = bin.charCodeAt(i);
    T.applyDesign(cells, d.pal);
    return true;
  }

  function photoDataURL(){
    const c = document.createElement("canvas");
    const iw = S.img.naturalWidth || S.img.width, ih = S.img.naturalHeight || S.img.height;
    const k = Math.min(1, 2400 / Math.max(iw, ih));
    c.width = Math.max(1, Math.round(iw * k)); c.height = Math.max(1, Math.round(ih * k));
    c.getContext("2d").drawImage(S.img, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", 0.9);
  }
  function thumbDataURL(){
    const src = T.mosaic, k = 260 / Math.max(src.width, src.height);
    const c = document.createElement("canvas");
    c.width = Math.round(src.width * k); c.height = Math.round(src.height * k);
    c.getContext("2d").drawImage(src, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", 0.8);
  }

  async function saveNow(force){
    if (!ownsPhoto() || saving) return false;
    const state = stateOf();
    const sig = JSON.stringify(state) + "|" + S.imgId + "|" + cellsHash();
    if (!force && sig === lastSig) return false;
    saving = true;
    try {
      const rec = (await dbGet(current.id)) || current;
      if (lastPhotoImgId !== S.imgId || !rec.photo){ rec.photo = photoDataURL(); lastPhotoImgId = S.imgId; }
      if (S.cells){ rec.thumb = thumbDataURL(); rec.design = designRecord(); }
      rec.state = state;
      rec.sizeId = S.size.id;
      rec.customSize = sizeRecord(S.size);
      rec.sizeLabel = S.size.label;
      rec.bricks = S.cells ? S.cells.length : S.size.gw * S.size.gh;
      rec.colors = S.usedPal ? S.usedPal.length : null;
      // a change after finishing means the instructions on file are stale
      if (rec.status === "finished" && lastSig && sig !== lastSig && !force) rec.status = "draft";
      rec.updatedAt = Date.now();
      await dbPut(rec);
      Object.assign(current, rec, { photo: undefined });
      lastSig = sig;
      showSaved("Saved " + new Date(rec.updatedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
      syncBar();
      return true;
    } catch (e){
      console.error("[MemoBrick Studio] save failed", e);
      showSaved("Not saved — storage full?");
      return false;
    } finally { saving = false; }
  }
  setInterval(() => { saveNow(false); }, 3000);
  document.addEventListener("visibilitychange", () => { if (document.hidden) saveNow(false); });
  window.addEventListener("beforeunload", () => { saveNow(false); });

  function showSaved(t){ const el = $("#teamSaved"); if (el) el.textContent = t; }

  /* ================= opening projects ================= */
  async function openProject(id, then){
    await saveNow(false);
    const p = await dbGet(id);
    if (!p){ T.toast("That project no longer exists."); return; }
    current = Object.assign({}, p, { photo: undefined });
    startImgId = S.imgId; lastSig = ""; lastPhotoImgId = -1;
    const size = ensureSize(p);
    showSaved("");
    syncBar();
    if (!p.photo){
      // new project: preset its size, then ask for the photo
      S.size = size; S.sizeTouched = true; S.uploaded = false;
      T.showView("upload");
      return;
    }
    try {
      sessionStorage.setItem("mb_photo", p.photo);
      sessionStorage.setItem("mb_state", JSON.stringify(Object.assign({}, p.state, { sizeId: size.id })));
    } catch (e){ T.toast("This browser blocked opening the project (storage full or private mode)."); return; }
    T.restoreSession();
    try { sessionStorage.removeItem("mb_photo"); sessionStorage.removeItem("mb_state"); } catch (e){}
    T.showView("editor");
    // the restored design becomes the baseline, so opening isn't a "change"
    waitForDesign().then((ok) => {
      if (!ok) return;
      restoreDesign(p.design);
      lastSig = JSON.stringify(stateOf()) + "|" + S.imgId + "|" + cellsHash();
      lastPhotoImgId = S.imgId;
      if (then) then();
    });
  }

  /* resolves once the opened project's photo is adopted and its design has
     stopped changing (the engine refines it over a few frames) */
  function waitForDesign(timeout){
    const until = Date.now() + (timeout || 25000);
    let prev = "", stableSince = 0;
    return new Promise((resolve) => {
      (function tick(){
        if (Date.now() > until) return resolve(false);
        if (hasDesign()){
          const sig = S.imgId + "|" + cellsHash() + "|" + S.usedPal.length;
          if (sig === prev){ if (Date.now() - stableSince > 1200) return resolve(true); }
          else { prev = sig; stableSince = Date.now(); }
        }
        setTimeout(tick, 200);
      })();
    });
  }

  /* ================= finish → instructions ================= */
  const slug = (s) => String(s || "").trim().replace(/[^\w-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
  const fileBase = () => {
    const bits = [slug(current && current.name), slug(current && current.ref), S.size.id].filter(Boolean);
    return "memobrick-" + (bits.join("-") || T.orderRef());
  };
  function download(blob, name){
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }
  function need(){
    if (hasDesign()) return true;
    T.toast(current ? "Add a photo and design it first." : "Open or create a project first.");
    return false;
  }

  function downloadPDF(){
    if (!window.jspdf || !window.jspdf.jsPDF){ T.toast("PDF library still loading — try again in a moment."); return false; }
    const doc = new window.jspdf.jsPDF({ unit: "mm", format: [279.4, 431.8], orientation: "portrait" });
    T.buildInstructionsPDF(doc);
    doc.save(fileBase() + "-instructions.pdf");
    return true;
  }

  let finishing = false;
  async function finish(){
    if (finishing || !need()) return;
    finishing = true;
    try {
      const wall = $("#wallView"); if (wall && !wall.hidden){ const c = $("#wallClose"); if (c) c.click(); }
      await saveNow(true);
      const rec = await dbGet(current.id);
      rec.status = "finished"; rec.finishedAt = Date.now(); rec.updatedAt = rec.finishedAt;
      await dbPut(rec);
      Object.assign(current, rec, { photo: undefined });
      syncBar();
      downloadPDF();
      T.openInstructions();
      T.toast("Finished — instructions generated and downloaded.");
    } finally { finishing = false; }
  }
  // every "Order / Finish" button in the editor finishes the project instead
  document.addEventListener("click", (e) => {
    const b = e.target.closest("#orderBtn, #edTopFinish, #mobFinish, #wallCart, #teamFinish");
    if (!b) return;
    e.preventDefault(); e.stopImmediatePropagation();
    finish();
  }, true);
  window.MB_addToCart = async () => { await finish(); return {}; };

  /* the instructions preview: the storefront never let customers close it
     (it was post-purchase only), so the team build wires Close and names
     the PDF after the project */
  function closeInstructions(){
    const box = $("#instructions"); if (!box || box.hidden) return false;
    box.hidden = true; document.body.classList.remove("printing");
    return true;
  }
  document.addEventListener("click", (e) => {
    if (e.target.closest("#insClose")){ e.preventDefault(); closeInstructions(); }
    else if (e.target.closest("#insPrint")){ e.preventDefault(); e.stopImmediatePropagation(); downloadPDF(); }
  }, true);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeInstructions(); });
  window.MB_openCartDrawer = () => {};

  /* picking list: how many bricks of each color the kit needs */
  function exportParts(){
    const counts = new Map();
    for (let i = 0; i < S.cells.length; i++) counts.set(S.cells[i], (counts.get(S.cells[i]) || 0) + 1);
    const rows = [...counts.entries()].map(([i, n]) => ({ c: S.usedPal[i] || {}, n })).sort((a, b) => b.n - a.n);
    const q = (v) => /[",\n]/.test(String(v)) ? '"' + String(v).replace(/"/g, '""') + '"' : String(v);
    const lines = [
      ["Project", current.name], ["Order", current.ref || ""], ["Customer", current.customer || ""],
      ["Size", S.size.label.replace(/"/g, " in")], ["Grid (studs)", S.size.gw + " x " + S.size.gh],
      ["Baseplates", S.size.bx * S.size.by], ["Total bricks", S.cells.length], [],
      ["MemoBrick code", "Supplier code", "Color", "Hex", "Bricks"],
      ...rows.map((r) => [r.c.id || "", r.c.brick || "", r.c.name || "", r.c.hex || "", r.n]),
    ];
    download(new Blob([lines.map((l) => l.map(q).join(",")).join("\r\n")], { type: "text/csv" }), fileBase() + "-picking-list.csv");
    return true;
  }
  const exportPNG = () => new Promise((resolve) => T.mosaic.toBlob((b) => {
    if (b) download(b, fileBase() + ".png"); resolve(!!b);
  }, "image/png"));

  async function exportProjectFile(id){
    if (!id && current) await saveNow(false);
    const p = await dbGet(id || current.id);
    if (!p) return false;
    download(new Blob([JSON.stringify(p)], { type: "application/json" }),
      "memobrick-" + (slug(p.name) || p.id) + ".memobrick.json");
    return true;
  }

  /* ================= dialogs ================= */
  function openModal(m){ m.hidden = false; const f = $("input:not([type=hidden]), select, button.team-opt", m); if (f) f.focus(); }
  const closeModal = (m) => { m.hidden = true; };
  $$(".team-modal").forEach((m) => m.addEventListener("click", (e) => {
    if (e.target === m || e.target.closest("[data-close]")) closeModal(m);
  }));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") $$(".team-modal").forEach((m) => { if (!m.hidden) closeModal(m); });
  });

  /* --- new project / details --- */
  const pModal = $("#teamProjectModal"), pForm = $("#teamProjectForm");
  let editingId = null;
  function fillSizeSelect(selectedId){
    const sel = $("#teamProjectSize");
    sel.innerHTML = [["square","Square"],["portrait","Portrait"],["landscape","Landscape"]].map(([k, name]) =>
      `<optgroup label="${name}">` + bySizeArea().filter((z) => z.shape === k).map((z) =>
        `<option value="${z.id}">${esc(z.label)} — ${z.gw}×${z.gh} studs, ${z.bx * z.by} plate${z.bx * z.by === 1 ? "" : "s"}${z.custom ? " (custom)" : ""}</option>`
      ).join("") + "</optgroup>").join("") + '<option value="__custom">Custom size…</option>';
    sel.value = selectedId || "20x20";
    sel.dataset.prev = sel.value;
  }
  $("#teamProjectSize").addEventListener("change", (e) => {
    if (e.target.value !== "__custom"){ e.target.dataset.prev = e.target.value; return; }
    e.target.value = e.target.dataset.prev || "20x20";
    openCustom((z) => fillSizeSelect(z.id));
  });
  function newProject(){
    editingId = null;
    pForm.reset();
    $("#teamProjectTitle").textContent = "New project";
    $("#teamProjectSubmit").textContent = "Create & add photo";
    $$("[data-new-only]", pForm).forEach((el) => el.hidden = false);
    fillSizeSelect("20x20");
    openModal(pModal);
  }
  function editDetails(p){
    editingId = p.id;
    pForm.reset();
    $("#teamProjectTitle").textContent = "Project details";
    $("#teamProjectSubmit").textContent = "Save";
    $$("[data-new-only]", pForm).forEach((el) => el.hidden = true);
    pForm.name.value = p.name || ""; pForm.ref.value = p.ref || "";
    pForm.customer.value = p.customer || ""; pForm.notes.value = p.notes || "";
    openModal(pModal);
  }
  pForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = pForm.name.value.trim();
    if (!name){ pForm.name.focus(); return; }
    const fields = { name, ref: pForm.ref.value.trim(), customer: pForm.customer.value.trim(), notes: pForm.notes.value.trim() };
    if (editingId){
      const rec = await dbGet(editingId);
      Object.assign(rec, fields, { updatedAt: Date.now() });
      await dbPut(rec);
      if (current && current.id === editingId) Object.assign(current, fields);
      closeModal(pModal); syncBar(); renderList();
      return;
    }
    const size = sizeById(pForm.size.value) || sizeById("20x20");
    const rec = Object.assign({
      app: "memobrick-studio", version: 2, id: uid(), status: "draft",
      createdAt: Date.now(), updatedAt: Date.now(),
      sizeId: size.id, customSize: sizeRecord(size), sizeLabel: size.label,
      photo: null, state: null, thumb: null,
    }, fields);
    await dbPut(rec);
    closeModal(pModal);
    openProject(rec.id);
  });

  /* --- custom size --- */
  const cModal = $("#teamCustomModal"), cForm = $("#teamCustomForm");
  let onCustom = null;
  $$("[data-rule=colors]", cModal).forEach((el) => el.textContent = T.MAX_COLOURS);
  $$("[data-rule=min]", cModal).forEach((el) => el.textContent = T.MIN_BRICKS);
  function customSpec(){
    const bx = Math.round(+cForm.bx.value), by = Math.round(+cForm.by.value);
    const ok = bx >= 1 && by >= 1 && bx <= MAX_PLATES && by <= MAX_PLATES;
    const spec = $("#teamCustomSpec");
    if (!ok){ spec.innerHTML = `<p class="team-warn">Use 1 to ${MAX_PLATES} baseplates each way.</p>`; return null; }
    const gw = bx * PLATE_STUDS, gh = by * PLATE_STUDS, plates = bx * by;
    const std = T.SIZES.find((z) => !z.custom && z.gw === gw && z.gh === gh);
    const biggest = Math.max(...T.SIZES.filter((z) => !z.custom).map((z) => z.bx * z.by));
    spec.innerHTML =
      `<b>${bx * PLATE_IN} × ${by * PLATE_IN}"</b> (${Math.round(bx * PLATE_IN * 2.54)} × ${Math.round(by * PLATE_IN * 2.54)} cm) · ${shapeOf(bx, by)}` +
      `<span>${gw} × ${gh} studs · ${plates} baseplate${plates === 1 ? "" : "s"} · ${fmt(gw * gh)} bricks · ~${plates} h to build</span>` +
      (std ? `<span class="team-note">Same as the standard ${esc(std.label)} kit — that size will be used.</span>` : "") +
      (plates > biggest ? `<span class="team-warn">Larger than any standard kit — the preview and instructions take longer to generate.</span>` : "");
    return { bx, by };
  }
  cForm.addEventListener("input", customSpec);
  function openCustom(cb){
    onCustom = cb;
    const z = S.size || {};
    cForm.bx.value = z.bx || 3; cForm.by.value = z.by || 4;
    customSpec();
    openModal(cModal);
  }
  cForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = customSpec(); if (!v) return;
    const z = sizeFor(v.bx, v.by);
    closeModal(cModal);
    const cb = onCustom; onCustom = null;
    if (cb) cb(z);
  });
  // custom size from inside the editor (desktop size panel, mobile size tool)
  document.addEventListener("click", (e) => {
    if (!e.target.closest("[data-team-custom-size]")) return;
    e.preventDefault();
    openCustom((z) => {
      T.setSize(z.id);
      T.renderSizePickers();
      T.toast(z.label + " — " + z.gw + " × " + z.gh + " studs, " + (z.bx * z.by) + " baseplates.");
    });
  });

  /* --- production files --- */
  const fModal = $("#teamFilesModal");
  function openFiles(){
    if (!need()) return;
    $("#teamFilesSummary").textContent = [current.name, current.ref].filter(Boolean).join(" · ") + " — " +
      S.size.label + ", " + S.size.gw + " × " + S.size.gh + " studs, " + fmt(S.cells.length) + " bricks, " + S.usedPal.length + " colors";
    openModal(fModal);
  }
  const ACTIONS = {
    pdf: downloadPDF, png: exportPNG, parts: exportParts, project: () => exportProjectFile(),
    preview: () => { closeModal(fModal); T.openInstructions(); return true; },
    all: async () => {
      downloadPDF();
      await new Promise((r) => setTimeout(r, 400)); await exportPNG();
      await new Promise((r) => setTimeout(r, 400)); exportParts();
      await new Promise((r) => setTimeout(r, 400)); await exportProjectFile();
      return true;
    },
  };
  fModal.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-export]");
    if (!btn || !need()) return;
    btn.setAttribute("aria-busy", "true");
    try { await ACTIONS[btn.dataset.export](); }
    catch (err){ console.error("[MemoBrick Studio] export failed", err); T.toast("Export failed — see the browser console."); }
    finally { btn.removeAttribute("aria-busy"); }
  });

  /* ================= projects screen ================= */
  const grid = $("#tpGrid");
  let filter = "all";
  const STATUS = { draft: "In progress", finished: "Finished" };
  function when(t){
    if (!t) return "";
    const d = new Date(t), now = new Date();
    return d.toDateString() === now.toDateString()
      ? "Today " + d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
      : d.toLocaleDateString([], { month: "short", day: "numeric", year: d.getFullYear() === now.getFullYear() ? undefined : "numeric" });
  }
  async function renderList(){
    let list = [];
    try { list = await dbAll(); } catch (e){ console.error(e); T.toast("This browser can't store projects (private mode?)."); }
    list.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    const q = ($("#tpSearch").value || "").trim().toLowerCase();
    const shown = list.filter((p) =>
      (filter === "all" || (p.status || "draft") === filter) &&
      (!q || [p.name, p.ref, p.customer, p.notes].join(" ").toLowerCase().includes(q)));
    $("#tpEmpty").hidden = list.length > 0;
    grid.innerHTML = shown.map((p) => {
      const st = p.status || "draft";
      const sub = [p.ref, p.customer].filter(Boolean).map(esc).join(" · ");
      const spec = (p.sizeLabel ? esc(p.sizeLabel) : "") + (p.customSize ? " custom" : "") +
        (p.bricks ? " · " + fmt(p.bricks) + " bricks" : "") + (p.colors ? " · " + p.colors + " colors" : "");
      return `<article class="tp-card" data-id="${esc(p.id)}">
        <button type="button" class="tp-thumb" data-action="open" aria-label="Open ${esc(p.name)}">
          ${p.thumb ? `<img src="${p.thumb}" alt="">` : `<span>No photo yet</span>`}
        </button>
        <div class="tp-body">
          <div class="tp-title"><b>${esc(p.name)}</b><span class="tp-status tp-${st}">${STATUS[st] || st}</span></div>
          ${sub ? `<p class="tp-sub">${sub}</p>` : ""}
          <p class="tp-spec">${spec}</p>
          <p class="tp-when">Updated ${when(p.updatedAt)}${p.finishedAt && st === "finished" ? " · finished " + when(p.finishedAt) : ""}</p>
          <div class="tp-actions">
            <button type="button" class="mini" data-action="open">${p.photo ? "Open" : "Add photo"}</button>
            ${p.photo ? `<button type="button" class="mini" data-action="instructions">Instructions PDF</button>` : ""}
            <button type="button" class="mini" data-action="details">Details</button>
            <button type="button" class="mini" data-action="duplicate">Duplicate</button>
            <button type="button" class="mini" data-action="file">Download file</button>
            <button type="button" class="mini tp-del" data-action="delete">Delete</button>
          </div>
        </div>
      </article>`;
    }).join("") || (list.length ? `<p class="team-sub">No projects match.</p>` : "");
  }
  $("#tpSearch").addEventListener("input", renderList);
  $$(".tp-filter button").forEach((b) => b.addEventListener("click", () => {
    filter = b.dataset.filter;
    $$(".tp-filter button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    renderList();
  }));
  document.addEventListener("click", async (e) => {
    const b = e.target.closest("#view-projects [data-action]");
    if (!b) return;
    const card = b.closest("[data-id]"), id = card && card.dataset.id;
    switch (b.dataset.action){
      case "new": return newProject();
      case "open": return openProject(id);
      case "instructions":
        return openProject(id, () => { downloadPDF(); T.toast("Instructions downloaded."); });
      case "details": { const p = await dbGet(id); if (p) editDetails(p); return; }
      case "file": return exportProjectFile(id);
      case "duplicate": {
        const p = await dbGet(id); if (!p) return;
        const copy = Object.assign({}, p, { id: uid(), name: p.name + " (copy)", status: "draft",
          createdAt: Date.now(), updatedAt: Date.now(), finishedAt: null });
        await dbPut(copy); return renderList();
      }
      case "delete": {
        const p = await dbGet(id); if (!p) return;
        if (!confirm(`Delete "${p.name}"? This can't be undone — download the file first if you may need it.`)) return;
        await dbDel(id);
        if (current && current.id === id) current = null;
        return renderList();
      }
    }
  });

  /* import: single project files (this app, or the first team version) and backups */
  function normalise(p){
    if (!p || !p.photo || !p.state) return null;
    if (p.app === "memobrick-editor") // first team version: photo + settings only
      p = { name: p.reference || "Imported project", ref: p.reference || "", photo: p.photo, state: p.state };
    const z = sizeById(p.state.sizeId);
    return Object.assign({ status: "draft", createdAt: Date.now() }, p, {
      app: "memobrick-studio", version: 2,
      name: p.name || "Imported project",
      sizeId: p.sizeId || p.state.sizeId,
      sizeLabel: p.sizeLabel || (z && z.label) || p.state.sizeId,
      updatedAt: Date.now(),
    });
  }
  async function importFiles(files){
    let n = 0;
    const existing = new Set((await dbAll()).map((p) => p.id));
    for (const f of files){
      try {
        const data = JSON.parse(await f.text());
        const items = data && data.app === "memobrick-studio-backup" ? data.projects : [data];
        for (const raw of items){
          const p = normalise(raw); if (!p) continue;
          if (!p.id || existing.has(p.id)) p.id = uid();
          existing.add(p.id);
          await dbPut(p); n++;
        }
      } catch (e){ console.error("[MemoBrick Studio] import failed", f.name, e); }
    }
    T.toast(n ? `Imported ${n} project${n === 1 ? "" : "s"}.` : "No MemoBrick projects found in that file.");
    renderList();
  }
  const imp = $("#teamImportFile");
  imp.addEventListener("change", () => { importFiles([...imp.files]); imp.value = ""; });
  document.addEventListener("dragover", (e) => {
    if (!$("#view-projects").hidden && [...(e.dataTransfer.items || [])].some((i) => i.kind === "file")) e.preventDefault();
  });
  document.addEventListener("drop", (e) => {
    if ($("#view-projects").hidden) return;
    const files = [...(e.dataTransfer.files || [])].filter((f) => /\.json$/i.test(f.name));
    if (!files.length) return;
    e.preventDefault(); importFiles(files);
  });
  $("#teamBackup").addEventListener("click", async () => {
    await saveNow(false);
    const projects = await dbAll();
    if (!projects.length){ T.toast("No projects to back up yet."); return; }
    const stamp = new Date().toISOString().slice(0, 10);
    download(new Blob([JSON.stringify({ app: "memobrick-studio-backup", version: 2, createdAt: Date.now(), projects })],
      { type: "application/json" }), `memobrick-studio-backup-${stamp}.json`);
  });

  /* ================= top bar ================= */
  const visibleView = () => { const v = $$(".view").find((x) => !x.hidden); return v ? v.id.replace("view-", "") : ""; };
  function syncBar(){
    const view = visibleView(), inProject = !!current && (view === "editor" || view === "upload");
    $("#teamCurrent").hidden = !inProject;
    $("#teamDetails").hidden = !inProject;
    $("#teamFiles").hidden = !(inProject && view === "editor");
    $("#teamFinish").hidden = !(inProject && view === "editor");
    if (current){
      $("#teamCurrentName").textContent = current.name + (current.ref ? " · " + current.ref : "");
      const st = current.status || "draft", badge = $("#teamCurrentStatus");
      badge.textContent = STATUS[st] || st; badge.className = "team-status tp-" + st;
      $("#teamUpName").textContent = current.name;
      $("#teamEdTitle").textContent = current.name;
    }
  }
  $("#teamDetails").addEventListener("click", () => { if (current) dbGet(current.id).then((p) => p && editDetails(p)); });
  $("#teamFiles").addEventListener("click", openFiles);

  // react to view changes made by the engine (back buttons, uploads) or by us
  let lastView = "";
  new MutationObserver(() => {
    const v = visibleView();
    if (v === lastView) return;
    lastView = v;
    if (v === "projects"){ saveNow(false); renderList(); }
    syncBar();
  }).observe($("main"), { attributes: true, subtree: true, attributeFilter: ["hidden"] });

  // the projects screen is also reachable from views the engine doesn't bind
  document.addEventListener("click", (e) => {
    const b = e.target.closest('[data-go="projects"]');
    if (!b) return;
    e.preventDefault(); e.stopImmediatePropagation();
    T.showView("projects");
  }, true);

  T.showView("projects");
  renderList(); syncBar();
})();
