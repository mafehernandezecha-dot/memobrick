/* =====================================================================
   MemoBrick — zoom & crop control inside the Size section
   Adds the same "Zoom & crop" control the Crop section has, to the Size
   section on desktop and to the Size tool on mobile. It does not keep its
   own zoom: it drives the editor's existing #zoom slider (same events the
   customer's own drag would fire), so both controls always show the same
   value and the design is rendered by the editor's normal pipeline.
===================================================================== */
(() => {
  "use strict";
  const MIN = 50, MAX = 300, STEP = 10;
  const $ = (s, r) => (r || document).querySelector(s);

  const style = document.createElement("style");
  // compact: a small secondary control under the size buttons, not a
  // second full-size Crop panel
  style.textContent =
    ".sz-zoom{margin-top:10px;padding-top:8px;border-top:1px solid var(--line,#e3e4e7)}" +
    ".sz-zoom .zoomrow{display:flex;flex-wrap:nowrap;align-items:center;gap:6px;width:100%;max-width:none}" +
    ".sz-zoom input[type=range]{flex:1 1 auto;width:auto;min-width:0;height:18px;margin:0}" +
    ".sz-zoom .sz-lbl{display:flex;justify-content:space-between;align-items:baseline;font-family:var(--mono,ui-monospace,monospace);" +
      "font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;opacity:.75;margin-bottom:4px}" +
    ".sz-zoom .zbtn{width:24px;height:24px;min-width:24px;min-height:0;font-size:14px;line-height:1;border-width:1px;padding:0}" +
    ".sz-zoom .sz-help{font-size:11px;opacity:.65;margin:4px 0 0;line-height:1.35}" +
    ".mob .sz-zoom{margin:4px 0 10px;padding:0 0 8px;border-top:0;border-bottom:1px solid var(--line,#e3e4e7)}" +
    ".mob .sz-zoom .zbtn{width:30px;height:30px;min-width:30px;min-height:0;font-size:15px}";
  document.head.appendChild(style);

  function current(){ const z = $("#zoom"); return z ? (+z.value || 100) : 100; }

  function apply(v, final){
    const z = $("#zoom"); if (!z) return;
    z.value = Math.max(MIN, Math.min(MAX, Math.round(v)));
    z.dispatchEvent(new Event("input", { bubbles: true }));
    if (final) z.dispatchEvent(new Event("change", { bubbles: true }));
    sync();
  }

  function build(){
    const d = document.createElement("div");
    d.className = "sz-zoom";
    d.setAttribute("data-szzoom", "");
    d.innerHTML =
      '<div class="sz-lbl"><span>Zoom</span><span data-szval>100%</span></div>' +
      '<div class="zoomrow">' +
        '<button type="button" class="zbtn" data-szout aria-label="Zoom out">−</button>' +
        '<input type="range" min="' + MIN + '" max="' + MAX + '" step="1" value="100" data-szrange aria-label="Zoom the crop">' +
        '<button type="button" class="zbtn" data-szin aria-label="Zoom in">+</button>' +
      '</div>' +
      '<p class="sz-help">Drag the picture to move it.</p>';
    const r = $("[data-szrange]", d);
    r.addEventListener("input", () => apply(+r.value, false));
    r.addEventListener("change", () => apply(+r.value, true));
    $("[data-szin]", d).addEventListener("click", () => apply(current() + STEP, true));
    $("[data-szout]", d).addEventListener("click", () => apply(current() - STEP, true));
    return d;
  }

  function sync(){
    const v = current();
    document.querySelectorAll("[data-szzoom]").forEach((row) => {
      const r = $("[data-szrange]", row);
      if (r && document.activeElement !== r) r.value = v;
      const t = $("[data-szval]", row); if (t) t.textContent = v + "%";
    });
  }

  /* desktop: the Size accordion */
  function addDesktop(){
    const body = $("#panelSize .acc-body");
    if (!body || $("[data-szzoom]", body)) return;
    const grid = $("#sizeGrid", body);
    const row = build();
    if (grid && grid.nextSibling) body.insertBefore(row, grid.nextSibling); else body.appendChild(row);
  }

  /* mobile: the Size tool is re-rendered by the editor, so re-add it each time */
  function addMobile(){
    const ws = $("#mobWorkspace");
    if (!ws || $("[data-szzoom]", ws)) return;
    const btns = ws.querySelectorAll("[data-size]");
    if (!btns.length) return;
    const holder = btns[0].parentElement;
    const row = build();
    // above the size list, so it's on screen without scrolling past all 22 sizes
    if (!holder || holder === ws) ws.appendChild(row);
    else holder.parentNode.insertBefore(row, holder);
    sync();
  }

  function init(){
    if (!$("#zoom")) return;               // not an editor page
    addDesktop(); addMobile(); sync();
    // keep in step with every other zoom control (Crop section, cropper, pinch…)
    const zv = $("#zoomVal");
    if (zv) new MutationObserver(sync).observe(zv, { childList: true, characterData: true, subtree: true });
    const ws = $("#mobWorkspace");
    if (ws) new MutationObserver(addMobile).observe(ws, { childList: true, subtree: true });
  }
  // run after the editor's own script has set everything up
  let started = false;
  const go = () => { if (started) return; started = true; init(); };
  document.addEventListener("DOMContentLoaded", go);
  window.addEventListener("load", go);
  if (document.readyState === "complete") go();
})();
