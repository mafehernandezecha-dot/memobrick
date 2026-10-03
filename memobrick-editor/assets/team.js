/* =====================================================================
   MemoBrick Editor — team layer
   Replaces the storefront's cart/checkout with production exports and
   adds project files, so the team can design, save, reopen and hand a
   finished mosaic to production without any online store.
   Reads the editor's state through window.MB_TEAM (end of memobrick.js).
   ===================================================================== */
(() => {
  "use strict";
  const T = window.MB_TEAM;
  if (!T){ console.error("[MemoBrick team] editor engine did not load"); return; }
  const S = T.S;
  const $ = (s) => document.querySelector(s);
  const modal = $("#teamExportModal");
  const refInput = $("#teamRef");

  /* ---------- helpers ---------- */
  const hasDesign = () => !!(S.uploaded && S.cells && S.usedPal);
  const slug = (s) => String(s || "").trim().replace(/[^\w-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
  const fileBase = () => {
    const ref = slug(refInput && refInput.value) || T.orderRef();
    return "memobrick-" + ref + "-" + S.size.id;
  };
  function download(blob, name){
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }
  const need = () => { if (hasDesign()) return true; T.toast("Upload a photo and finish the design first."); return false; };

  /* ---------- exports ---------- */
  function exportPNG(){
    return new Promise((resolve) => T.mosaic.toBlob((b) => {
      if (b) download(b, fileBase() + ".png");
      resolve(!!b);
    }, "image/png"));
  }

  function exportPDF(){
    if (!window.jspdf || !window.jspdf.jsPDF){
      T.toast("PDF library still loading (needs internet) — try again in a moment.");
      return false;
    }
    T.downloadInstructionsPDF();
    return true;
  }

  /* picking list: how many bricks of each color the kit needs */
  function exportParts(){
    const counts = new Map();
    for (let i = 0; i < S.cells.length; i++) counts.set(S.cells[i], (counts.get(S.cells[i]) || 0) + 1);
    const rows = [...counts.entries()]
      .map(([i, n]) => ({ c: S.usedPal[i] || {}, n }))
      .sort((a, b) => b.n - a.n);
    const esc = (v) => /[",\n]/.test(String(v)) ? '"' + String(v).replace(/"/g, '""') + '"' : String(v);
    const lines = [
      ["Reference", (refInput && refInput.value) || T.orderRef()],
      ["Size", S.size.label.replace(/"/g, " in")],
      ["Grid (studs)", S.size.gw + " x " + S.size.gh],
      ["Baseplates", S.size.bx * S.size.by],
      ["Total bricks", S.cells.length],
      [],
      ["MemoBrick code", "Supplier code", "Color", "Hex", "Bricks"],
      ...rows.map((r) => [r.c.id || "", r.c.brick || "", r.c.name || "", r.c.hex || "", r.n]),
    ];
    const csv = lines.map((l) => l.map(esc).join(",")).join("\r\n");
    download(new Blob([csv], { type: "text/csv" }), fileBase() + "-picking-list.csv");
    return true;
  }

  /* project file: the photo plus every setting, so a design can be
     reopened later on any computer and come back exactly the same */
  function projectData(){
    const c = document.createElement("canvas");
    const iw = S.img.naturalWidth || S.img.width, ih = S.img.naturalHeight || S.img.height;
    const k = Math.min(1, 2400 / Math.max(iw, ih));
    c.width = Math.max(1, Math.round(iw * k)); c.height = Math.max(1, Math.round(ih * k));
    c.getContext("2d").drawImage(S.img, 0, 0, c.width, c.height);
    return {
      app: "memobrick-editor", version: 1, savedAt: new Date().toISOString(),
      reference: (refInput && refInput.value) || "",
      photo: c.toDataURL("image/jpeg", 0.9),
      state: {
        sizeId: S.size.id, build: !!S.build, zoom: S.zoom, ox: S.ox, oy: S.oy, bg: S.bg, bgEffect: S.bgEffect,
        bri: S.bri, con: S.con, sat: S.sat, temp: S.temp, detail: S.detail,
        dither: S.dither, shadows: S.shadows, warm: S.warm, auto: S.auto, pal: S.pal,
        excludedColors: S.excludedColors ? [...S.excludedColors] : [],
        edits: S.edits && S.edits.size ? [...S.edits.entries()] : [],
      },
    };
  }
  function exportProject(){
    if (!S.img || !S.uploaded){ T.toast("Upload a photo first."); return false; }
    const json = JSON.stringify(projectData());
    download(new Blob([json], { type: "application/json" }), fileBase() + ".memobrick.json");
    return true;
  }

  function openProject(file){
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      let p;
      try { p = JSON.parse(r.result); } catch (e){ p = null; }
      if (!p || p.app !== "memobrick-editor" || !p.photo || !p.state){
        T.toast("That isn't a MemoBrick project file."); return;
      }
      try {
        // the editor's own session restore does the work, so a reopened
        // project goes through exactly the same path as a page reload
        sessionStorage.setItem("mb_photo", p.photo);
        sessionStorage.setItem("mb_state", JSON.stringify(p.state));
      } catch (e){ T.toast("This browser blocked opening the project (storage full or private mode)."); return; }
      if (refInput) refInput.value = p.reference || "";
      T.restoreSession();
      T.showView("editor");
      if (typeof p.state.build === "boolean") S.build = p.state.build;
    };
    r.readAsText(file);
  }

  /* ---------- export dialog ---------- */
  function openExport(){
    if (!need()) return;
    const summary = $("#teamExportSummary");
    if (summary) summary.textContent =
      S.size.label + " · " + S.size.gw + " × " + S.size.gh + " studs · " +
      S.cells.length.toLocaleString("en-US") + " bricks · " + S.usedPal.length + " colors";
    modal.hidden = false;
    if (refInput) refInput.focus();
  }
  const closeExport = () => { modal.hidden = true; };

  const ACTIONS = {
    png: exportPNG, pdf: exportPDF, parts: exportParts, project: exportProject,
    preview: () => { closeExport(); T.openInstructions(); return true; },
    all: async () => {
      await exportPNG(); exportParts(); exportProject();
      // browsers space out multiple downloads; give the PDF its own turn
      await new Promise((r) => setTimeout(r, 400));
      exportPDF();
      return true;
    },
  };
  modal.addEventListener("click", async (e) => {
    if (e.target === modal || e.target.id === "teamExportClose") return closeExport();
    const btn = e.target.closest("[data-export]");
    if (!btn || !need()) return;
    btn.setAttribute("aria-busy", "true");
    try { await ACTIONS[btn.dataset.export](); }
    catch (err){ console.error("[MemoBrick team] export failed", err); T.toast("Export failed — see the browser console."); }
    finally { btn.removeAttribute("aria-busy"); }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeExport(); });

  // the editor's "Order / Finish" buttons end in the cart on the storefront;
  // here they open the export dialog instead
  window.MB_addToCart = async () => ({ designId: T.orderRef() });
  window.MB_openCartDrawer = openExport;

  /* ---------- top bar ---------- */
  $("#teamExport").addEventListener("click", openExport);
  $("#teamSave").addEventListener("click", exportProject);
  $("#teamNew").addEventListener("click", () => T.showView("upload"));
  const openInput = $("#teamOpenFile");
  openInput.addEventListener("change", () => { openProject(openInput.files && openInput.files[0]); openInput.value = ""; });

  // a project file dropped anywhere on the page opens it
  document.addEventListener("dragover", (e) => { if ([...(e.dataTransfer.items || [])].some((i) => i.type === "application/json")) e.preventDefault(); });
  document.addEventListener("drop", (e) => {
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f && /\.json$|\.memobrick$/i.test(f.name)){ e.preventDefault(); e.stopPropagation(); openProject(f); }
  }, true);

  // rename the customer-facing order buttons for the team
  document.querySelectorAll("#orderBtn, #edTopFinish, #mobFinish, #wallCart").forEach((b) => {
    if (b.id === "wallCart") b.textContent = "Looks good — Export";
    else if (b.id === "orderBtn") b.textContent = "Export design";
    else b.innerHTML = "Export <span>→</span>";
  });
})();
