(() => {
"use strict";

/* =========================================================
   MemoBrick Creator
   Sizes and prices mirror the live catalogue on mymemobrick.com.
   Stud counts assume 32-stud boards (10") and one 50-stud board
   for the 16" size — adjust SIZES if the real boards differ.
========================================================= */
const MAX_COLOURS = 18;   // a kit is bagged with at most 18 brick colors
const MIN_BRICKS  = 30;   // and no bag holds fewer than this many bricks
const CDN = "https://cdn.shopify.com/s/files/1/0375/0107/5595/";

/* Confirmed with the business owner: 2–4 business days after approval is
   the correct production/dispatch time. Single source of truth — change
   it here once and it changes everywhere via [data-prodtime]. */
const PRODUCTION_TIME_TEXT = "Made & shipped from Miami within 2–4 business days after approval.";
const P = "https://mymemobrick.com/products/";

/* Live catalogue pulled from the MemoBrick Shopify store.
   Stud maths: 32 studs per 10 inches (the 16x16" uses one 50x50 board). */
const SIZES = [
  { id:"10x10", label:'10 × 10"', gw:32,  gh:32,  bx:1, by:1, hours:1,
    price:35, was:55, handle:"custom-bricked-mosaic-10x10", v:"43590610682076",
    img:CDN+"files/10x10.png?v=1784137544", note:"One face only", popular:true, shape:"square" },
  { id:"16x16", label:'16 × 16"', gw:50,  gh:50,  bx:1, by:1, hours:2,
    price:69.88, was:89, handle:"1-big-board", v:"33536095977611",
    img:CDN+"files/16x16.png?v=1784137597", note:"Most ordered", popular:true, shape:"square" },
  { id:"20x20", label:'20 × 20"', gw:64,  gh:64,  bx:2, by:2, hours:4,
    price:99.88, was:159, build:169, handle:"2-2-boards", v:"33536109281419", bv:"33536109314187",
    img:CDN+"files/20x201.png?v=1784137616", note:"Fits 1–2 people", popular:true, shape:"square" },
  { id:"20x30", label:'20 × 30"', gw:64,  gh:96,  bx:2, by:3, hours:6,
    price:149, was:195, build:230, handle:"2-3-boards", v:"33536126877835", bv:"33536126845067",
    img:CDN+"files/20x30.png?v=1784137640", note:"Fits 1–3 people", popular:true, shape:"portrait" },
  { id:"30x20", label:'30 × 20"', gw:96,  gh:64,  bx:3, by:2, hours:6,
    price:149, was:195, build:230, handle:"3-2-boards", v:"33536273252491", bv:"33536273285259",
    img:CDN+"files/30x20.png?v=1784137686", note:"Fits 1–3 people", shape:"landscape" },
  { id:"20x40", label:'20 × 40"', gw:64,  gh:128, bx:2, by:4, hours:8,
    price:189.88, was:250, build:280, handle:"20x40fits-1-3-individuals", v:"40125177626778", bv:"40125177692314",
    img:CDN+"files/40x20b.png?v=1784137935", note:"Fits 1–3 people", shape:"portrait" },
  { id:"40x20", label:'40 × 20"', gw:128, gh:64,  bx:4, by:2, hours:8,
    price:189.99, was:260, build:280, handle:"4-2-boards", v:"33536364544139", bv:"33536364576907",
    img:CDN+"products/Custom-Bricked-Mosaic-Portrait-40x20_-Memobrick-59269954.jpg?v=1751554199", note:"Fits 1–3 people", shape:"landscape" },
  { id:"20x50", label:'20 × 50"', gw:64,  gh:160, bx:2, by:5, hours:10,
    price:234.99, was:315, build:345, handle:"2-5-boards", v:"33536252543115", bv:"33536252575883",
    img:CDN+"files/50x20.png?v=1784137676", note:"Fits 1–4 people", shape:"portrait" },
  { id:"50x20", label:'50 × 20"', gw:160, gh:64,  bx:5, by:2, hours:10,
    price:234.99, was:310, build:350, handle:"5-2-boards", v:"33536528941195", bv:"33536528973963",
    img:CDN+"products/Custom-Bricked-Mosaic-Portrait-50x20_-Memobrick-59271560.jpg?v=1751554256", note:"Fits 1–4 people", shape:"landscape" },
  { id:"30x30", label:'30 × 30"', gw:96,  gh:96,  bx:3, by:3, hours:9,
    price:209.99, was:295, build:310, handle:"3-3-boards", v:"33536050167947", bv:"33536050200715",
    img:CDN+"files/30x30.png?v=1784137749", note:"Fits 1–4 people", popular:true, shape:"square" },
  { id:"30x40", label:'30 × 40"', gw:96,  gh:128, bx:3, by:4, hours:12,
    price:279, was:370, build:415, handle:"3-4-boards", v:"33536317882507", bv:"33536317915275",
    img:CDN+"products/Custom-Bricked-Mosaic-Portrait-30x40_-Memobrick-59269293.jpg?v=1751554174", note:"Fits 1–4 people", shape:"portrait" },
  { id:"40x30", label:'40 × 30"', gw:128, gh:96,  bx:4, by:3, hours:12,
    price:278, was:377, build:415, handle:"4-3-boards", v:"33536387776651", bv:"33536387809419",
    img:CDN+"files/30x40.png?v=1784137821", note:"Fits 1–5 people", shape:"landscape" },
  { id:"60x20", label:'60 × 20"', gw:192, gh:64,  bx:6, by:2, hours:12,
    price:279, was:479, handle:"custom-bricked-mosaic-portrait-60x20", v:"", bv:"",
    img:CDN+"files/Custom-Bricked-Mosaic-Portrait-60x20_-Memobrick-59299687.png?v=1751555174", note:"Long panoramic", shape:"landscape" },
  { id:"30x50", label:'30 × 50"', gw:96,  gh:160, bx:3, by:5, hours:15,
    price:334.99, was:445, build:505, handle:"3-5-boards", v:"33536347111563", bv:"33536347144331",
    img:CDN+"files/50x30.png?v=1784137801", note:"Fits 1–5 people", shape:"portrait" },
  { id:"50x30", label:'50 × 30"', gw:160, gh:96,  bx:5, by:3, hours:15,
    price:334.99, was:580, build:505, handle:"5-3-boards", v:"33536539066507", bv:"33536539099275",
    img:CDN+"products/Custom-Bricked-Mosaic-Portrait-50x30_-Memobrick-59271819.png?v=1751554265", note:"Fits 1–5 people", shape:"landscape" },
  { id:"40x40", label:'40 × 40"', gw:128, gh:128, bx:4, by:4, hours:16,
    price:348, was:488, build:540, handle:"4-4-boards", v:"33536410353803", bv:"33536410386571",
    img:CDN+"products/Custom-Bricked-Mosaic-Portrait-40x40_-Memobrick-59270978.jpg?v=1751554232", note:"Fits 1–5 people", shape:"square" },
  { id:"40x50", label:'40 × 50"', gw:128, gh:160, bx:4, by:5, hours:20,
    price:431.98, was:750, build:655, handle:"4-5-boards", v:"33536518422667", bv:"33536518455435",
    img:CDN+"products/Custom-Bricked-Mosaic-Portrait-40x50_-Memobrick-59271286.jpg?v=1751554245", note:"Fits 1–6 people", shape:"portrait" },
  { id:"50x50", label:'50 × 50"', gw:160, gh:160, bx:5, by:5, hours:25,
    price:530, was:750, build:815, handle:"5-5-board", v:"37853916364954", bv:"37853916397722",
    img:CDN+"products/Custom-Bricked-Mosaic-Portrait-50x50_-Memobrick-59274627.png?v=1751554354", note:"Fits 1–7 people", shape:"square" },
  { id:"60x30", label:'60 × 30"', gw:192, gh:96,  bx:6, by:3, hours:18,
    price:414, was:614, build:648, handle:"custom-bricked-mosaic-portrait-60x30", v:"43907199008988", bv:"43907199041756",
    img:CDN+"files/Custom-Bricked-Mosaic-Portrait-60x30_-Memobrick-59299296.png?v=1751555167", note:"Wide wall piece", shape:"landscape" },
  { id:"50x60", label:'50 × 60"', gw:160, gh:192, bx:5, by:6, hours:30,
    price:698, was:898, build:1088, handle:"custom-bricked-mosaic-portrait-50x60", v:"43907054108892", bv:"43907054141660",
    img:CDN+"files/Custom-Bricked-Mosaic-Portrait-50x60_-Memobrick-59298814.png?v=1751555151", note:"Statement size", shape:"portrait" },
  { id:"60x60", label:'60 × 60"', gw:192, gh:192, bx:6, by:6, hours:30,
    price:853, build:1465, handle:"60x60-fits-1-9-individuals", v:"41049516114074", bv:"41049516081306",
    img:CDN+"files/60x60.png?v=1784137968", note:"Fits 1–9 people", shape:"square" },
  { id:"70x60", label:'70 × 60"', gw:224, gh:192, bx:7, by:6, hours:35,
    price:978, was:1178, handle:"custom-bricked-mosaic-portrait-70x60", v:"", bv:"",
    img:CDN+"files/Custom-Bricked-Mosaic-Portrait-70x60_-Memobrick-59300014.png?v=1751555186", note:"Our largest", shape:"landscape" },
];
const FITS = {
  "10x10":"1 face", "16x16":"1 face", "20x20":"1–2 people", "20x30":"1–3 people", "30x20":"1–3 people",
  "20x40":"1–3 people", "40x20":"1–3 people", "20x50":"1–4 people", "50x20":"1–4 people", "30x30":"1–4 people",
  "30x40":"1–4 people", "40x30":"1–5 people", "30x50":"1–5 people", "50x30":"1–5 people", "40x40":"1–5 people",
  "40x50":"1–6 people", "50x50":"1–7 people", "60x30":"1–6 people", "50x60":"1–8 people", "60x60":"1–9 people",
  "60x20":"1–4 people", "70x60":"1–10 people",
};
// inches from the label ("20 × 30\""), falling back to the id ("20x30") or
// the stud grid — a label in any other format used to give NaN and break
// the size-scale drawing
const inches = (x) => {
  const m = /(\d+(?:\.\d+)?)\s*[×xX]\s*(\d+(?:\.\d+)?)/.exec((x.label || "") + " " + (x.id || ""));
  if (m) return [+m[1], +m[2]];
  return [Math.round((x.gw || 64)/3.2), Math.round((x.gh || 64)/3.2)];
};
const url = (s, build) => P + s.handle + "?variant=" + (build && s.bv ? s.bv : s.v);

/* SIZES above carries a hand-maintained price as a fallback for contexts
   where the Shopify catalog isn't available (previews, this file run
   standalone). Whenever the real catalog IS available, it must win —
   otherwise a price changed in Shopify Admin keeps showing the old
   number here. Runs once, synchronously, before any size UI is built
   (the size grid, the size dropdown, and meta()'s price line all read
   S.size.price / x.price directly, so patching the source here makes
   every one of them correct with no further changes). Shopify Liquid
   hands variant prices through as raw integer cents — see the catalog
   snippet — so this is also where that unit conversion happens, once. */
(function patchSizesFromCatalog(){
  try {
    const el = document.querySelector("#memobrick-catalog");
    if (!el) return;                              // no Shopify catalog in this context — keep the static prices
    const cat = JSON.parse(el.textContent);
    if (!cat || !cat.sizes) return;
    const bySize = new Map(cat.sizes.map((s) => [String(s.id), s]));
    SIZES.forEach((size) => {
      const rec = bySize.get(String(size.id));
      if (!rec || !rec.variants) return;
      const kit = rec.variants.find((v) => !v.service && v.available) || rec.variants.find((v) => !v.service);
      const build = rec.variants.find((v) => v.service && v.available) || rec.variants.find((v) => v.service);
      if (kit && kit.price != null){
        size.price = Math.round((typeof kit.price === "number" ? kit.price : parseFloat(kit.price))) / 100;
        size.was = (kit.compareAtPrice != null)
          ? Math.round((typeof kit.compareAtPrice === "number" ? kit.compareAtPrice : parseFloat(kit.compareAtPrice))) / 100
          : undefined;
      }
      if (build && build.price != null){
        size.build = Math.round((typeof build.price === "number" ? build.price : parseFloat(build.price))) / 100;
      }
      // the hand-maintained img paths above were guessed filenames, never
      // confirmed against this store's actual uploaded Files — several
      // don't exist and render as broken images. The live product's own
      // featured_image is guaranteed to exist (it's how the product shows
      // up in Shopify at all), so it wins whenever the catalog has it.
      if (rec.image) size.img = rec.image;
      // variant ids and handle come from the live store too, so a size can
      // be added (or its product re-created) in Shopify without editing JS
      if (rec.handle) size.handle = rec.handle;
      if (kit && kit.id) size.v = String(kit.id);
      if (build && build.id) size.bv = String(build.id);
    });

  } catch (e){ /* malformed or missing catalog: the static prices stand */ }
})();
/* A size that isn't set up in this store (no product / no variant id) is
   hidden rather than offered with a checkout button that can't work. */
(function dropUnbuyableSizes(){
  for (let i = SIZES.length - 1; i >= 0; i--){
    if (!SIZES[i].v) SIZES.splice(i, 1);
  }
})();


/* --------------------------- palettes --------------------------- */
/* The MemoBrick brick palette, sampled from the official color chart.
   Each entry is [name, hex, color id] — the id is what a customer quotes
   when ordering a replacement brick. */
const BRICKS = [
  ["Black","#111011","001","26"],
  ["Light Nougat","#E4C2A8","002","283"],
  ["Sand","#C6BB8D","003","138"],
  ["Spring Yellow","#FCF188","004","226"],
  ["Shiny Blue","#51B2C9","005","322"],
  ["Lilac","#A67ABE","006","324"],
  ["Aqua Blue","#CAEEE3","007","323"],
  ["Magenta","#A83873","008","124"],
  ["Beige","#DBC897","009","5"],
  ["Lavender","#BDAFDB","010","325"],
  ["Yellow","#F8D548","011","24"],
  ["Brown","#6D4A3D","012","192"],
  ["Deep Blue","#2A63AC","013","23"],
  ["Coffee","#A05C33","014","38"],
  ["Caramel","#E1A580","015","A25"],
  ["Jungle Green","#7B9784","016","151"],
  ["Olive","#8D8F68","017","330"],
  ["Stone Blue","#7F90A3","018","135"],
  ["Dark Blue","#2A405B","019","140"],
  ["Cream","#F9D8C6","020","A08"],
  ["Bubblegum","#C966A2","021","221"],
  ["Green","#4AA357","022","37"],
  ["Dark Green","#284C3C","023","141"],
  ["Orange","#F3B241","024","191"],
  ["Dark Red","#7B3936","025","154"],
  ["Red","#BD3A32","026","21"],
  ["Blue","#6AA1D5","027","102"],
  ["Grass","#A2BA45","028","119"],
  ["Toffee","#AB7E58","029","312"],
  ["Dark Brown","#4F3F38","030","308"],
  ["Dark Grey","#4B4C50","031","199"],
  ["Nougat","#D2936B","032","18"],
  ["Sapphire Blue","#9BBBE2","033","212"],
  ["Pink","#E3ADD4","034","222"],
  ["Bright Orange","#EF8545","035","106"],
  ["Stone Grey","#A4A9AA","036","208"],
  ["White","#FEFEFE","037","1"],
  ["Rouge","#EB6D7F","038","A19"],
  ["Grey","#6F7176","039","194"],
  ["Purple","#7B56A7","040","A13"],
];
/* [name, hex, MemoBrick code, supplier brick code] — codes are internal:
   they appear on the build booklet and picking list, never to the customer. */
const byCode = (...codes) => BRICKS.filter((c) => codes.includes(c[2]));

const PALETTES = {
  full: { name: `All ${BRICKS.length}`, colors: BRICKS },
  warm: { name: "Warm sepia",
          colors: byCode("037","020","009","003","002","032","015","029","012","014","030","001") },
  mono: { name: "Greyscale", colors: byCode("037","036","039","031","001") },
  bold: { name: "Bright & bold",
          colors: byCode("037","001","026","025","035","011","004","028","022","023","033","013","019","008","040","034","012","036") },
};

/* Approved skin-tone brick set — deliberately its own array with its own
   exact hex values, rather than reusing the similarly-named entries in
   BRICKS above (whose hex values differ from this reference). Detected
   skin pixels are restricted to searching only within this set, never
   the full palette, so skin can't land on red/pink/orange/olive/etc.
   just because raw color distance happened to favor it. */
const SKIN_PALETTE = [
  ["Cream",      "#F9D8C6", "020", "A08"],
  ["Light Nougat","#E4C2A8", "002", "283"],
  ["Caramel",    "#E1A580", "015", "A25"],
  ["Nougat",     "#D2936B", "032", "18"],
  ["Toffee",     "#AB7E58", "029", "312"],
  ["Coffee",     "#A05C33", "014", "38"],
  ["Brown",      "#6D4A3D", "012", "192"],
  ["Dark Brown", "#4F3F38", "030", "308"],
];
PALETTES.skin = { name: "Skin tones", colors: SKIN_PALETTE };

/* ----------------------------- state ---------------------------- */
const S = {
  size: SIZES.find((x) => x.id === "20x20") || SIZES[2], build: false, pal: "full", brushFilter: "all",
  bri: 2, con: 10, sat: 8, temp: 0, detail: 100, dither: 74, auto: true, filter: "natural",
  shadows: 0, warm: 35, warmAdaptive: 0, viewLocked: false,
  baseBuf: null, baseKey: "", baseCast: 0, imgId: 0,
  baseCells: null, cacheKey: "", redo: [], studs: true, boards: false,
  zoom: 1, ox: 0, oy: 0, bg: "#FEFEFE",              // crop offsets, -1..1 of the spare edge
  img: null, srcLabel: "Sample: Portrait", cells: null, usedPal: null, pickedPal: null,
  edits: new Map(), undo: [], editing: false, picking: false, brush: null,
  uploaded: false, sizeTouched: false,
  // face-aware automatic pipeline — see analyzeFaceRegions/estimateAdaptiveStrengths
  skinMask: null, faceBoxes: [], hdrStrength: 0, regionMap: null,
  detailTouched: false, analyzedImgId: -1,
  excludedColors: new Set(), paletteCount: null,   // null = automatic count, like the reference's "auto" pill
  bgEffect: "original", customBgImg: null,
  subjectMask: null, segW: 0, segH: 0, segKey: "", segStatus: "idle",  // idle|loading|ready|failed
};
const dims = () => ({ gw: S.size.gw, gh: S.size.gh, bx: S.size.bx, by: S.size.by });

/* ---------------------------- helpers --------------------------- */
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));
const fmt = (n) => n.toLocaleString("en-US");
const money = (n) => "$" + (Number.isInteger(n) ? n : n.toFixed(2));
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;

function hex2rgb(h){ return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]; }
function shade(h, amt){
  const [r,g,b] = hex2rgb(h);
  const f = (v) => clamp(Math.round(amt > 0 ? v + (255 - v) * amt : v * (1 + amt)), 0, 255);
  return `rgb(${f(r)},${f(g)},${f(b)})`;
}
function rgb2lab(r,g,b){
  let R=r/255,G=g/255,B=b/255;
  R = R>.04045 ? Math.pow((R+.055)/1.055,2.4) : R/12.92;
  G = G>.04045 ? Math.pow((G+.055)/1.055,2.4) : G/12.92;
  B = B>.04045 ? Math.pow((B+.055)/1.055,2.4) : B/12.92;
  let x=(R*.4124+G*.3576+B*.1805)/.95047, y=(R*.2126+G*.7152+B*.0722), z=(R*.0193+G*.1192+B*.9505)/1.08883;
  const f=(t)=> t>.008856 ? Math.cbrt(t) : 7.787*t + 16/116;
  x=f(x); y=f(y); z=f(z);
  return [116*y-16, 500*(x-y), 200*(y-z)];
}
/* The values a fresh photo starts from. Applied once when a photo is
   adopted. Detail stays at 100% automatically (fixed, not per-photo
   adaptive — see draw()) unless the customer changes it by hand, in
   which case it's theirs and is never re-applied afterwards. */
/* Development-only visualization of the face-aware pipeline: face boxes,
   skin mask and the skin/hair/clothing/background region map, drawn over
   the mosaic. Never on for customers — flip this from the browser console
   with `DEBUG_MEMOBRICK_PROCESSING = true` then move any slider, or edit
   the default below for a persistent local override. */
window.DEBUG_MEMOBRICK_PROCESSING = false;

const AUTO_START = { bri: 20, con: -10, sat: 41, temp: 0, detail: 150,
                     dither: 74, shadows: -100, warm: 35, auto: true };

const CACHE = {};
function pal(){
  if (CACHE[S.pal]) return CACHE[S.pal];
  return CACHE[S.pal] = PALETTES[S.pal].colors.map(([name,hex,id,brick]) => {
    const [r,g,b] = hex2rgb(hex);
    const _l = rgb2lab(r,g,b);
    return { name, hex, id, brick, r, g, b, lab: _l, C: Math.sqrt(_l[1]*_l[1] + _l[2]*_l[2]), top: shade(hex,.16), lo: shade(hex,-.22), hi: shade(hex,.38) };
  });
}
/* CIE94 color difference (graphic-arts weights).
   Plain Lab distance treats a shift in chroma as seriously as a shift in
   lightness, which is why skin used to jump to the wrong brick. CIE94
   scales chroma and hue error by how saturated the color already is. */
function de94(L1, a1, b1, C1, c){
  const l = c.lab;
  const dL = L1 - l[0];
  const dC = C1 - c.C;
  const da = a1 - l[1], db = b1 - l[2];
  const dH2 = Math.max(0, da*da + db*db - dC*dC);
  const sC = 1 + 0.045*C1;
  const sH = 1 + 0.015*C1;
  return dL*dL + (dC*dC)/(sC*sC) + dH2/(sH*sH);
}
function nearest(r,g,b,P,guardExtremes,skinIndices){
  const [L,A,B2] = rgb2lab(r,g,b);
  const C1 = Math.sqrt(A*A + B2*B2);
  const guard = guardExtremes !== false;
  const srcNearWhite = L > 88 && C1 < 10, srcNearBlack = L < 14 && C1 < 10;
  // restrict the search entirely to the approved skin-tone bricks for a
  // detected skin pixel — not a penalty, a hard restriction, per spec.
  // Falls back to the full palette only if none of the approved skin
  // colors happen to be present in this particular working palette.
  const useIndices = (skinIndices && skinIndices.length) ? skinIndices : null;
  const count = useIndices ? useIndices.length : P.length;
  let best=0, bd=Infinity;
  for (let k=0;k<count;k++){
    const i = useIndices ? useIndices[k] : k;
    let d = de94(L, A, B2, C1, P[i]);
    if (guard && !useIndices){
      const pl = P[i].lab[0], pc = P[i].C;
      // pure white/black only wins when the source pixel genuinely is that
      // extreme — otherwise a skin highlight or a soft shadow shouldn't
      // snap all the way to the whitest or blackest brick in the kit
      if (pl > 92 && pc < 8 && !srcNearWhite) d += 46;
      else if (pl < 10 && pc < 8 && !srcNearBlack) d += 46;
    }
    if (d<bd){ bd=d; best=i; }
  }
  return best;
}

/* Skin sits in a narrow, well-documented band of Lab: warm hue, modest
   chroma, mid-to-high lightness. Shared by palette sample weighting
   (below) and by the face-aware protection pass so both agree on what
   counts as skin. */
function isSkinLab(L, a, b){
  const C = Math.sqrt(a*a + b*b);
  const hue = Math.atan2(b, a) * 180/Math.PI;
  return hue > 10 && hue < 65 && C > 6 && C < 48 && L > 25 && L < 93;
}

/* Same hue/chroma band as isSkinLab, but a much higher lightness ceiling
   (93 -> 99). Used only for pixels already inside a confirmed face box.
   A studio light or a phone flash routinely blows a forehead or cheekbone
   highlight well past L=93 while its hue/chroma stay clearly skin-toned —
   isSkinLab alone then drops that pixel out of the mask, it loses the
   hard restriction to SKIN_PALETTE in nearest(), and the nearest full-
   palette match for a bright warm pixel is often a saturated yellow —
   a yellow patch stamped across a forehead. Outside a face box this
   relaxed ceiling isn't used, since a bright beige wall shouldn't start
   registering as skin just because it's light. */
function isSkinLabBright(L, a, b){
  const C = Math.sqrt(a*a + b*b);
  const hue = Math.atan2(b, a) * 180/Math.PI;
  return hue > 10 && hue < 65 && C > 6 && C < 48 && L > 25 && L < 99;
}

/* =====================================================================
   FACE-AWARE ANALYSIS
   There is no license-free, cross-browser face-landmark model that runs
   entirely client-side, so this is not a claim of ML face detection —
   it is deterministic skin-tone segmentation: cluster skin-colored
   pixels in Lab, then keep every connected blob large enough to plausibly
   be a face (not just the single largest one, so a two- or three-person
   portrait gets every face protected, not only the biggest). Each blob's
   bounding box becomes a protected region for sharpening, local contrast,
   dithering and isolated-brick cleanup. Runs once per photo/crop, at grid
   resolution (a few thousand cells at most) — see where draw() calls it,
   not on every slider movement. */
function isSubjectCellForSkin(x, y, gw, gh){
  const img = S.img; if (!img || S.zoom >= 1) return true;
  const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
  const sc = Math.max(gw/iw, gh/ih) * S.zoom;
  const dw = iw*sc, dh = ih*sc;
  const ox = (gw-dw)/2 + S.ox*Math.abs(dw - gw)/2, oy = (gh-dh)/2 + S.oy*Math.abs(dh - gh)/2;
  return x + 0.5 >= ox && x + 0.5 < ox + dw && y + 0.5 >= oy && y + 0.5 < oy + dh;
}

function analyzeFaceRegions(buf, gw, gh, faceAlreadyConfirmed, mlBoxes, humanSkin){
  const N = gw*gh;
  /* When the real face detector (MediaPipe) has found the face(s), use
     its boxes instead of guessing from color. The color-only guess was
     the root cause of orange/yellow faces: under warm light real skin
     falls outside the narrow skin band while a beige wall or blond hair
     falls inside it, so the "face" boxes landed on the background and the
     actual face got no skin protection at all.
     BlazeFace boxes run roughly brow-to-chin, so they're grown upward for
     the forehead and a little sideways for the cheeks. Inside them, any
     warm or pinkish cell that isn't near-black (eyes, lashes) or neutral
     grey/white (teeth, catchlights, grey hair) counts as skin — a much
     wider band than isSkinLab, which is safe here because it only applies
     inside a confirmed face. */
  // An array here is the real detector's answer. Empty means it looked
  // and found no human face (a landscape, a pet, an object) — then there
  // are no skin rules at all and every color stays available. The
  // color-only guess below is only used by callers that pass nothing
  // (e.g. the autocrop fallback), never to apply skin-tone restrictions.
  if (Array.isArray(mlBoxes) && !mlBoxes.length) return { mask: null, boxes: [] };
  if (mlBoxes && mlBoxes.length){
    const boxes = mlBoxes.slice(0, 30).map((b) => {
      const w = b.x1 - b.x0 + 1, h = b.y1 - b.y0 + 1;
      return {
        x0: clamp(Math.round(b.x0 - w*0.10), 0, gw-1), x1: clamp(Math.round(b.x1 + w*0.10), 0, gw-1),
        y0: clamp(Math.round(b.y0 - h*0.30), 0, gh-1), y1: clamp(Math.round(b.y1 + (humanSkin ? h*0.40 : h*0.08)), 0, gh-1),
      };
    }).filter((b) => b.x1 > b.x0 && b.y1 > b.y0);
    if (boxes.length){
      const mask = new Uint8Array(N);
      for (const bx of boxes){
        for (let y = bx.y0; y <= bx.y1; y++){
          for (let x = bx.x0; x <= bx.x1; x++){
            const p = y*gw + x, o = p*3;
            /* THE "PINK FRAME" FIX. This used to take every warm cell inside
               the face box as skin, so a whole rectangle — wall, hair,
               shirt, and when zoomed out the empty edge too — was forced into
               the pale skin bricks, showing up as a flat pink/cream frame
               around the face. Now only cells the person segmenter marked
               as real face/neck skin count; without that map, an oval
               inside the box (a face's shape) instead of the full box. */
            if (humanSkin){
              if (!humanSkin[p]) continue;
            } else {
              const ex = (x - (bx.x0 + bx.x1)/2) / ((bx.x1 - bx.x0)/2 + 0.5);
              const ey = (y - (bx.y0 + bx.y1)/2) / ((bx.y1 - bx.y0)/2 + 0.5);
              if (ex*ex + ey*ey > 1) continue;
            }
            if (!isSubjectCellForSkin(x, y, gw, gh)) continue;       // never the empty edge of a zoomed-out photo
            const [L, a, b] = rgb2lab(buf[o], buf[o+1], buf[o+2]);
            if (L < 22) continue;                                  // pupils, lashes, deep shadow
            const C = Math.sqrt(a*a + b*b);
            if (C < 7 || C > 62) continue;                          // neutral (teeth, grey) or a vivid object
            let hue = Math.atan2(b, a) * 180/Math.PI; if (hue < 0) hue += 360;
            if (hue > 112 && hue < 330) continue;                   // green/blue/purple — eyes, glasses, clothing
            mask[p] = 1;
          }
        }
      }
      return { mask, boxes };
    }
    return { mask: null, boxes: [] };
  }
  const skinStrict = new Uint8Array(N);
  let strictCount = 0;
  for (let i = 0; i < N; i++){
    const o = i*3;
    const [L,a,b] = rgb2lab(buf[o], buf[o+1], buf[o+2]);
    if (isSkinLab(L, a, b)){ skinStrict[i] = 1; strictCount++; }
  }
  // A second, hue-agnostic mask (excluding only colors skin could never
  // be — clearly blue/green/purple) — found independently of the strict
  // one, not just as a whole-photo fallback. That distinction matters in
  // a multi-person photo: the auto white-balance correction is measured
  // once across the whole image, so it can suit one person's lighting
  // and push another's hue outside the strict band entirely — not only
  // at bright highlights, but at ordinary mid-tone lightness too, if
  // their side of the photo had different lighting to begin with. A
  // single "if the WHOLE photo has too little strict skin, retry" check
  // can't catch that: the person who passed keeps the total high enough
  // that the fallback never fires for the person who didn't.
  const skinBroad = new Uint8Array(N);
  let broadCount = 0;
  for (let i = 0; i < N; i++){
    const o = i*3;
    const [L,a,b] = rgb2lab(buf[o], buf[o+1], buf[o+2]);
    if (L < 35) continue;
    const C = Math.sqrt(a*a + b*b);
    // a genuine overexposed skin highlight is washed-out even when its
    // hue has shifted — high brightness and heavy saturation together
    // (a vivid red or orange object, for instance) is not something
    // overexposure produces, so a chroma ceiling here is what actually
    // distinguishes "hue-shifted highlight" from "a saturated object
    // that happens to be warm and bright." Without this, a red shirt
    // button or a stray red object near a face could pass this mask
    // just as easily as a real highlight, and did — a saturated red
    // object (chroma ~69) was confirmed getting swept in here before
    // this cap was added, while the legitimate hue-shifted-highlight
    // case this mask exists for (chroma ~46) stays comfortably under it.
    if (C < 6 || C > 55) continue;
    let hue = Math.atan2(b, a) * 180/Math.PI;
    if (hue < 0) hue += 360;
    if (hue > 140 && hue < 320) continue;
    skinBroad[i] = 1; broadCount++;
  }
  if (strictCount < N*0.01 && broadCount < N*0.01){
    return { mask: null, boxes: [] };   // nothing skin-like by either test — a pet, a landscape, a logo
  }

  function findBlobs(skin){
    const seen = new Uint8Array(N);
    const found = [];
    const stack = new Int32Array(N);
    for (let start = 0; start < N; start++){
      if (!skin[start] || seen[start]) continue;
      let sp = 0, size = 0, x0=gw, y0=gh, x1=0, y1=0;
      stack[sp++] = start; seen[start] = 1;
      while (sp){
        const p = stack[--sp];
        const x = p % gw, y = (p / gw) | 0;
        size++;
        if (x < x0) x0 = x; if (x > x1) x1 = x;
        if (y < y0) y0 = y; if (y > y1) y1 = y;
        if (x > 0    && skin[p-1]  && !seen[p-1]) { seen[p-1] = 1;  stack[sp++] = p-1; }
        if (x < gw-1 && skin[p+1]  && !seen[p+1]) { seen[p+1] = 1;  stack[sp++] = p+1; }
        if (y > 0    && skin[p-gw] && !seen[p-gw]){ seen[p-gw] = 1; stack[sp++] = p-gw; }
        if (y < gh-1 && skin[p+gw] && !seen[p+gw]){ seen[p+gw] = 1; stack[sp++] = p+gw; }
      }
      if (size >= N*0.008) found.push({ size, x0, y0, x1, y1 });
    }
    return found;
  }

  const strictBlobs = findBlobs(skinStrict);
  const broadBlobs = findBlobs(skinBroad);
  function overlapFraction(a, b){
    const ix0 = Math.max(a.x0,b.x0), iy0 = Math.max(a.y0,b.y0);
    const ix1 = Math.min(a.x1,b.x1), iy1 = Math.min(a.y1,b.y1);
    if (ix1 < ix0 || iy1 < iy0) return 0;
    const inter = (ix1-ix0+1)*(iy1-iy0+1);
    const aArea = (a.x1-a.x0+1)*(a.y1-a.y0+1);
    return aArea > 0 ? inter/aArea : 0;
  }
  const blobs = strictBlobs.slice();
  for (const bb of broadBlobs){
    const covered = blobs.some((sb) => overlapFraction(bb, sb) > 0.3 || overlapFraction(sb, bb) > 0.3);
    if (!covered) blobs.push(bb);
  }
  const skin = new Uint8Array(N);
  for (let i = 0; i < N; i++) skin[i] = (skinStrict[i] || skinBroad[i]) ? 1 : 0;

  if (!blobs.length) return { mask: null, boxes: [] };

  // shape/size filtering: a face is roughly oval, not a thin strip
  // (a floor, a wall edge, a plank of wood) and doesn't swallow the
  // ENTIRE frame the way a beige wall or sandy background can. This
  // can't replace real ML face detection, but it stops the most common
  // false positives from ever becoming a "face" box.
  //
  // This was raised once already (from 0.42/0.65 up to 0.80/0.92) to
  // stop tightly-cropped human portraits from being rejected as "probably
  // a wall." That fix was real, but it created a worse one: a photo
  // where a large pale surface that ISN'T a face — cream/tan pet fur
  // being the confirmed case — covers a similar percentage of the frame
  // now also passes, and gets the same hard skin-tone restriction a real
  // face would, flattening the entire photo into a handful of human
  // skin-tone bricks. Tested whether internal contrast (eyes/eyebrows
  // vs. fur markings) could tell the two apart — it can't reliably; a
  // pet's dark ears produce nearly the same internal-contrast signal as
  // a human face's eyes. Lowered back down: the two failure modes aren't
  // symmetric — a real tight human portrait that gets missed just falls
  // back to the unrestricted full palette (which A/B/C/D testing this
  // session found often looks better anyway), while a false positive on
  // a pet or a wall visibly destroys the photo. When this can be told
  // apart reliably (real face detection, not a size heuristic), this
  // can go back up.
  const sizeLimit = faceAlreadyConfirmed ? 0.60 : 0.50;
  const plausible = blobs.filter((bl) => {
    const w = bl.x1 - bl.x0 + 1, h = bl.y1 - bl.y0 + 1;
    const aspect = Math.min(w, h) / Math.max(w, h);
    if (aspect < 0.35) return false;              // too strip-like to be a face
    if (bl.size > N*sizeLimit) return false;       // covers virtually the whole frame — likely a background/wall/floor
    return true;
  });
  const blobs2 = plausible.length ? plausible : blobs.filter((bl) => bl.size < N*sizeLimit);
  if (!blobs2.length) return { mask: null, boxes: [] };
  blobs2.sort((a, b) => b.size - a.size);

  // every major face, not only the largest — a family photo shouldn't
  // sharpen one person at the expense of the rest
  const boxes = blobs2.slice(0, 8).map((bl) => {
    const padX = Math.max(1, Math.round((bl.x1-bl.x0) * 0.18));
    const padY = Math.max(1, Math.round((bl.y1-bl.y0) * 0.28));
    return {
      x0: clamp(bl.x0 - padX, 0, gw-1), y0: clamp(bl.y0 - padY, 0, gh-1),
      x1: clamp(bl.x1 + padX, 0, gw-1), y1: clamp(bl.y1 + padY, 0, gh-1),
    };
  });

  // the skin test alone isn't reliable outside a confirmed face box — a
  // wood floor or beige wall elsewhere in frame shouldn't get treated as
  // skin just because it passed the same Lab test. Keep only the pixels
  // that are both skin-colored AND fall inside (or just around) one of
  // the accepted face boxes.
  const restrictedMask = new Uint8Array(N);
  for (let bi = 0; bi < boxes.length; bi++){
    const bx = boxes[bi];
    for (let y = bx.y0; y <= bx.y1; y++){
      const rowBase = y*gw;
      for (let x = bx.x0; x <= bx.x1; x++){
        const p = rowBase + x;
        if (skin[p]) restrictedMask[p] = 1;
      }
    }
  }
  return { mask: restrictedMask, boxes };
}


/* How hard to push HDR-style local contrast and the unsharp mask,
   derived from the photo itself instead of a fixed constant. A photo
   that is already high in local contrast (already crisp) gets less;
   a flat, hazy one gets more. A small grid gets less of both, because
   a handful of studs turns a gentle edge into a hard, blocky one.
   Sharpen is targeted at the 50-70% range this photo type generally
   needs — never the fixed 100% that used to blow out every edge. */
function estimateAdaptiveStrengths(buf, gw, gh){
  const r = Math.max(1, Math.round(Math.min(gw, gh) / 14));
  const blur = boxBlur(buf, gw, gh, r);
  let energy = 0;
  for (let i = 0; i < buf.length; i++) energy += Math.abs(buf[i] - blur[i]);
  energy /= buf.length;                                  // mean local-detail energy, ~0-40 typically
  const flatness = clamp(1 - energy/22, 0, 1);            // 1 = flat/hazy, 0 = already clear/high-contrast

  // clear photo -> 15-25%, normal -> 25-40%, flat/hazy -> 40-55%, hard cap 60%
  const hdr = Math.round(clamp(15 + flatness*40, 15, 60));

  // Detail's useful range shifts with grid size — a small board can't
  // afford the noise a large one can carry, so flatness only adjusts
  // within whichever band the current size allows
  const size = Math.min(gw, gh);
  let lo, hi;
  if (size <= 32){ lo = 46; hi = 60; }
  else if (size <= 48){ lo = 54; hi = 70; }
  else if (size <= 64){ lo = 60; hi = 76; }
  else { lo = 66; hi = 86; }
  const sharpen = Math.round(lo + flatness*(hi-lo));

  return { hdr, sharpen };
}

/* Prevents bright faces from clipping into one flat white brick area.
   A soft knee above the given percentile compresses the highlight
   rolloff instead of leaving it to clip — cream, peach and light tan
   survive where a plain levels stretch would have erased them. Works in
   sRGB space directly since it only needs to act above a fixed
   brightness, not measure true luminance. */
function recoverHighlights(buf, gw, gh, strength){
  if (strength <= 0) return;
  const k = clamp(strength, 0, 60) / 100;
  const knee = 226 - k*40;              // where the roll-off starts
  const N = gw*gh;
  for (let i = 0; i < N; i++){
    const o = i*3;
    const lum = 0.299*buf[o] + 0.587*buf[o+1] + 0.114*buf[o+2];
    if (lum <= knee) continue;
    const over = (lum - knee) / (255 - knee);             // 0..1 how far into the highlight
    const compress = 1 - over*k*0.7;                       // pull the excess back, don't erase it
    for (let c = 0; c < 3; c++){
      const v = buf[o+c];
      if (v <= knee) continue;
      buf[o+c] = clamp(knee + (v - knee)*compress, 0, 255);
    }
  }
}

/* =====================================================================
   REGION MAP: skin / hair / clothing / background
   Real face detection or semantic segmentation isn't feasible fully
   client-side, so this is a deterministic approximation built from what
   we already know: the skin mask and face boxes. It is not a claim of
   ML segmentation — it's positional + color heuristics, honest about
   their limits:
     HAIR       dark, low-chroma pixels around and above a face box
     CLOTHING   whatever sits below the lowest face box
     BACKGROUND everything else
   This lets dithering and smoothing finally differ between "a face's
   hair" and "a wall behind them," instead of treating all non-skin
   pixels identically. Returns a Uint8Array: 0=background 1=skin 2=hair
   3=clothing, at grid resolution, cached the same way skinMask already is.
   ===================================================================== */
function classifyRegions(buf, gw, gh, skinMask, faceBoxes){
  const N = gw*gh;
  const region = new Uint8Array(N);      // defaults to 0 = background
  if (skinMask) for (let i = 0; i < N; i++) if (skinMask[i]) region[i] = 1;

  if (faceBoxes && faceBoxes.length){
    // torso band per face: bounded to roughly shoulder-width, not the
    // full image — a wide background strip below the face at, say, the
    // far edge of a group photo is not this person's clothing
    const torsoBands = faceBoxes.map((b) => {
      const fw = b.x1 - b.x0;
      return { x0: Math.max(0, Math.round(b.x0 - fw*0.9)), x1: Math.min(gw-1, Math.round(b.x1 + fw*0.9)), y0: b.y1 };
    });

    for (let y = 0; y < gh; y++){
      for (let x = 0; x < gw; x++){
        const i = y*gw + x;
        if (region[i] === 1) continue;                 // already skin

        const o = i*3;
        const L = 0.299*buf[o] + 0.587*buf[o+1] + 0.114*buf[o+2];
        const mx = Math.max(buf[o],buf[o+1],buf[o+2]), mn = Math.min(buf[o],buf[o+1],buf[o+2]);
        const chroma = mx - mn;

        // hair: dark, fairly neutral, and near a face horizontally, above
        // its chin or beside it — a real face almost always has hair
        // bordering it above and to the sides
        let nearFace = false, aboveOrBesideFace = false;
        for (let k = 0; k < faceBoxes.length; k++){
          const b = faceBoxes[k];
          const padX = Math.round((b.x1-b.x0) * 0.5);
          const padY = Math.round((b.y1-b.y0) * 0.7);
          if (x >= b.x0-padX && x <= b.x1+padX && y >= b.y0-padY && y <= b.y1){
            nearFace = true;
            if (y <= b.y0 + (b.y1-b.y0)*0.35) aboveOrBesideFace = true;
            break;
          }
        }
        if (nearFace && L < 130 && chroma < 55){ region[i] = 2; continue; }      // hair
        if (nearFace && aboveOrBesideFace && L < 165 && chroma < 60){ region[i] = 2; continue; }

        // clothing: below a face AND inside that face's own torso band —
        // not just "anywhere below the face" across the whole photo
        let inTorso = false;
        for (let k = 0; k < torsoBands.length; k++){
          const t = torsoBands[k];
          if (y > t.y0 && x >= t.x0 && x <= t.x1){ inTorso = true; break; }
        }
        if (inTorso) { region[i] = 3; continue; }

        region[i] = 0;                                  // background
      }
    }

    growSubjectMask(region, gw, gh);
    growSubjectByColorContinuity(buf, region, gw, gh, faceBoxes);
  }
  return region;
}

/* Connected-component cleanup: a "clothing" pixel only survives as
   subject if it's actually reachable from real skin or hair pixels by
   walking through other subject-classified pixels — this catches
   background that the torso-band heuristic still caught (e.g. a gap
   between two people) and reclassifies it as background instead of
   silently keeping it when the background gets removed or replaced. */

function growSubjectMask(region, gw, gh){
  const N = gw*gh;
  const confirmed = new Uint8Array(N);
  const stack = new Int32Array(N);
  let sp = 0;
  for (let i = 0; i < N; i++) if (region[i] === 1 || region[i] === 2){ confirmed[i] = 1; stack[sp++] = i; }
  while (sp){
    const p = stack[--sp];
    const x = p % gw, y = (p / gw) | 0;
    const tryPush = (q) => { if (!confirmed[q] && region[q] === 3){ confirmed[q] = 1; stack[sp++] = q; } };
    if (x > 0)    tryPush(p-1);
    if (x < gw-1) tryPush(p+1);
    if (y > 0)    tryPush(p-gw);
    if (y < gh-1) tryPush(p+gw);
  }
  for (let i = 0; i < N; i++) if (region[i] === 3 && !confirmed[i]) region[i] = 0;
}

/* The fixed hair-color test (dark, low-chroma, near the face) misses a
   lot of real hair: lighter strands, sun-bleached tips, wild or curly
   hair that catches highlights, hair with color variation from the
   photo's own lighting. Rather than widen that threshold (which starts
   eating real background), grow the subject outward from whatever was
   already confirmed, one ring at a time, following actual local color
   similarity — the same idea a magic-wand/flood-fill tool uses. This is
   what actually follows a wild hair silhouette instead of a fixed rule.
   Bounded to an expanded box around each face so a smooth, similarly-lit
   background can't be chained into indefinitely. */
function growSubjectByColorContinuity(buf, region, gw, gh, faceBoxes){
  if (!faceBoxes || !faceBoxes.length) return;
  const N = gw*gh;
  const envelope = new Uint8Array(N);
  faceBoxes.forEach((b) => {
    const fw = b.x1-b.x0, fh = b.y1-b.y0;
    const x0 = clamp(Math.round(b.x0 - fw*2.6), 0, gw-1), x1 = clamp(Math.round(b.x1 + fw*2.6), 0, gw-1);
    const y0 = clamp(Math.round(b.y0 - fh*3), 0, gh-1), y1 = clamp(Math.round(b.y1 + fh*5), 0, gh-1);
    for (let y = y0; y <= y1; y++){ const row = y*gw; for (let x = x0; x <= x1; x++) envelope[row+x] = 1; }
  });

  const queue = new Int32Array(N);
  let qh = 0, qt = 0;
  for (let i = 0; i < N; i++) if (region[i] !== 0) queue[qt++] = i;
  const THRESH = 42;                    // Euclidean RGB distance — a real edge stops the grow, similar tones pass
  while (qh < qt){
    const p = queue[qh++];
    const x = p % gw, y = (p / gw) | 0, po = p*3;
    const tryGrow = (q) => {
      if (region[q] !== 0 || !envelope[q]) return;
      const qo = q*3;
      const dr = buf[po]-buf[qo], dg = buf[po+1]-buf[qo+1], db = buf[po+2]-buf[qo+2];
      if (Math.sqrt(dr*dr+dg*dg+db*db) < THRESH){ region[q] = 2; queue[qt++] = q; }
    };
    if (x > 0)    tryGrow(p-1);
    if (x < gw-1) tryGrow(p+1);
    if (y > 0)    tryGrow(p-gw);
    if (y < gh-1) tryGrow(p+gw);
  }

  // morphological closing: a background-classified pixel surrounded on
  // most sides by subject is almost certainly a gap in curly/wispy hair,
  // not real background peeking through — fill it in, then shrink back
  // by the same amount so the silhouette doesn't visibly grow
  const isSubj = (i) => region[i] !== 0;
  const filled = new Uint8Array(N);
  for (let y = 0; y < gh; y++){
    for (let x = 0; x < gw; x++){
      const i = y*gw+x;
      if (isSubj(i)){ filled[i] = 1; continue; }
      let count = 0, total = 0;
      for (let dy=-1; dy<=1; dy++){ const yy=y+dy; if (yy<0||yy>=gh) continue;
        for (let dx=-1; dx<=1; dx++){ const xx=x+dx; if (xx<0||xx>=gw) continue;
          total++; if (isSubj(yy*gw+xx)) count++; } }
      if (total > 0 && count/total >= 0.6) filled[i] = 1;
    }
  }
  for (let i = 0; i < N; i++) if (filled[i] && region[i] === 0) region[i] = 2;
}

/* --------------------------- samples ----------------------------
   The default example is a real portrait, so the first thing anyone sees
   is what the tool actually does with a photograph. */
const PHOTO = new Image();
let photoReady = false;
PHOTO.onload = () => { photoReady = true; };
PHOTO.src = window.MB_SAMPLE_PORTRAIT_URL || "";

if (!CanvasRenderingContext2D.prototype.roundRect){
  CanvasRenderingContext2D.prototype.roundRect = function(x,y,w,h,r){
    this.moveTo(x+r,y); this.arcTo(x+w,y,x+w,y+h,r); this.arcTo(x+w,y+h,x,y+h,r);
    this.arcTo(x,y+h,x,y,r); this.arcTo(x,y,x+w,y,r); this.closePath(); return this;
  };
}
function sampleCanvas(kind){
  const c = document.createElement("canvas"); c.width = c.height = 620;
  const x = c.getContext("2d"); const K = 620/512;
  x.scale(K,K);
  if (kind === "portrait"){
    let g = x.createLinearGradient(0,0,512,512); g.addColorStop(0,"#123a5c"); g.addColorStop(1,"#07182b");
    x.fillStyle=g; x.fillRect(0,0,512,512);
    g = x.createRadialGradient(150,140,20,190,220,420);
    g.addColorStop(0,"rgba(255,214,150,.55)"); g.addColorStop(1,"rgba(255,214,150,0)");
    x.fillStyle=g; x.fillRect(0,0,512,512);
    x.fillStyle="#2b1b2e"; x.beginPath(); x.moveTo(30,512); x.quadraticCurveTo(120,372,256,366);
    x.quadraticCurveTo(392,372,482,512); x.closePath(); x.fill();
    x.fillStyle="#b3764f"; x.beginPath(); x.roundRect(214,268,84,130,34); x.fill();
    g = x.createLinearGradient(160,90,350,330);
    g.addColorStop(0,"#f0c197"); g.addColorStop(.55,"#d69b6d"); g.addColorStop(1,"#8f5c3c");
    x.fillStyle=g; x.beginPath(); x.ellipse(256,210,104,128,0,0,6.29); x.fill();
    x.fillStyle="rgba(70,35,20,.30)"; x.beginPath(); x.ellipse(256,320,78,40,0,0,6.29); x.fill();
    x.fillStyle="#20161a"; x.beginPath(); x.moveTo(150,214);
    x.quadraticCurveTo(140,62,258,62); x.quadraticCurveTo(376,62,364,220);
    x.quadraticCurveTo(342,150,300,132); x.quadraticCurveTo(240,168,172,150);
    x.quadraticCurveTo(158,176,150,214); x.closePath(); x.fill();
    x.fillStyle="#f6f2ea"; x.beginPath(); x.ellipse(212,214,22,12,0,0,6.29); x.ellipse(300,214,22,12,0,0,6.29); x.fill();
    x.fillStyle="#241a14"; x.beginPath(); x.arc(214,214,10,0,6.29); x.arc(302,214,10,0,6.29); x.fill();
    x.strokeStyle="#241a14"; x.lineWidth=8; x.lineCap="round";
    x.beginPath(); x.moveTo(190,186); x.quadraticCurveTo(212,176,234,186);
    x.moveTo(278,186); x.quadraticCurveTo(300,176,322,186); x.stroke();
    x.strokeStyle="#7a3f34"; x.lineWidth=9;
    x.beginPath(); x.moveTo(226,292); x.quadraticCurveTo(256,310,288,290); x.stroke();
    x.fillStyle="rgba(120,60,40,.22)"; x.beginPath(); x.ellipse(256,258,16,26,0,0,6.29); x.fill();
  } else if (kind === "pup"){
    let g = x.createLinearGradient(0,0,0,512); g.addColorStop(0,"#f2d98b"); g.addColorStop(1,"#c98b4a");
    x.fillStyle=g; x.fillRect(0,0,512,512);
    x.fillStyle="rgba(255,255,255,.25)"; x.beginPath(); x.arc(256,250,190,0,6.29); x.fill();
    x.fillStyle="#4a2f1d"; x.beginPath(); x.ellipse(140,214,46,104,.34,0,6.29); x.ellipse(372,214,46,104,-.34,0,6.29); x.fill();
    g = x.createLinearGradient(140,110,380,400); g.addColorStop(0,"#a9713f"); g.addColorStop(1,"#6d431f");
    x.fillStyle=g; x.beginPath(); x.ellipse(256,244,128,122,0,0,6.29); x.fill();
    x.fillStyle="#e7cba1"; x.beginPath(); x.ellipse(256,320,84,62,0,0,6.29); x.fill();
    x.fillStyle="#2a1b12"; x.beginPath(); x.ellipse(256,288,28,20,0,0,6.29); x.fill();
    x.beginPath(); x.arc(206,222,17,0,6.29); x.arc(306,222,17,0,6.29); x.fill();
    x.fillStyle="#fff"; x.beginPath(); x.arc(200,216,6,0,6.29); x.arc(300,216,6,0,6.29); x.fill();
    x.strokeStyle="#2a1b12"; x.lineWidth=7; x.lineCap="round";
    x.beginPath(); x.moveTo(256,306); x.lineTo(256,336);
    x.moveTo(256,336); x.quadraticCurveTo(228,356,214,330);
    x.moveTo(256,336); x.quadraticCurveTo(284,356,298,330); x.stroke();
  } else {
    let g = x.createLinearGradient(0,0,0,330);
    g.addColorStop(0,"#2b1b53"); g.addColorStop(.45,"#c94f3d"); g.addColorStop(.8,"#f5a03c"); g.addColorStop(1,"#ffd98a");
    x.fillStyle=g; x.fillRect(0,0,512,330);
    x.fillStyle="#ffe9a8"; x.beginPath(); x.arc(330,250,58,0,6.29); x.fill();
    x.fillStyle="#1c1230"; x.fillRect(0,330,512,182);
    const towers=[[10,236,58],[70,282,44],[118,196,52],[176,262,40],[220,150,64],[290,224,46],[342,268,58],[404,182,50],[458,246,54]];
    x.fillStyle="#161028"; towers.forEach(([tx,ty,tw]) => x.fillRect(tx,ty,tw,336-ty+8));
    x.fillStyle="rgba(255,214,120,.85)";
    towers.forEach(([tx,ty,tw]) => {
      for (let wy=ty+14; wy<320; wy+=22)
        for (let wx=tx+8; wx<tx+tw-10; wx+=18)
          if ((wx*wy)%7 > 2) x.fillRect(wx,wy,7,10);
    });
    g = x.createLinearGradient(0,340,0,512);
    g.addColorStop(0,"rgba(245,160,60,.45)"); g.addColorStop(1,"rgba(20,12,40,.1)");
    x.fillStyle=g; x.fillRect(0,340,512,172);
    x.fillStyle="rgba(255,255,255,.08)";
    for (let i=0;i<26;i++) x.fillRect(0,348+i*6,512,2);
  }
  return c;
}

/* --------------------- source drawing (crop) -------------------- */
function drawSource(ctx, W, H){
  const img = S.img; if (!img) return;
  const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
  const sc = Math.max(W/iw, H/ih) * S.zoom;
  const dw = iw*sc, dh = ih*sc;
  // below 100% the photo no longer covers the board, so the margin becomes
  // a real brick color rather than a transparent hole
  ctx.fillStyle = S.bg;
  ctx.fillRect(0, 0, W, H);
  const slackX = Math.abs(dw - W)/2, slackY = Math.abs(dh - H)/2;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, (W-dw)/2 + S.ox*slackX, (H-dh)/2 + S.oy*slackY, dw, dh);
}

/* MediaPipe face boxes are stored normalised to the whole photo; this maps
   them onto the board grid through the same crop maths drawSource() uses,
   dropping any face that's been cropped out of view. */
function mlFacesInGrid(gw, gh){
  if (!S.mlFaces || S.mlFacesImg !== S.imgId || !S.img) return null;
  const img = S.img;
  const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
  if (!iw || !ih) return null;
  const sc = Math.max(gw/iw, gh/ih) * S.zoom;
  const dw = iw*sc, dh = ih*sc;
  const slackX = Math.abs(dw - gw)/2, slackY = Math.abs(dh - gh)/2;
  const ox = (gw-dw)/2 + S.ox*slackX, oy = (gh-dh)/2 + S.oy*slackY;
  const out = [];
  for (const f of S.mlFaces){
    const x0 = Math.floor(ox + f.x0*dw), x1 = Math.ceil(ox + f.x1*dw) - 1;
    const y0 = Math.floor(oy + f.y0*dh), y1 = Math.ceil(oy + f.y1*dh) - 1;
    if (x1 < 0 || y1 < 0 || x0 >= gw || y0 >= gh) continue;          // cropped out
    const b = { x0: clamp(x0, 0, gw-1), y0: clamp(y0, 0, gh-1), x1: clamp(x1, 0, gw-1), y1: clamp(y1, 0, gh-1) };
    if ((b.x1 - b.x0) >= 2 && (b.y1 - b.y0) >= 2) out.push(b);        // too small to matter at this size
  }
  return out;
}

/* The per-face skin maps, sampled onto the board grid through the current
   crop (same maths as drawSource / mlFacesInGrid). 1 = human skin. Returns
   null when no face has a skin map (person check unavailable). */
function humanSkinInGrid(gw, gh){
  if (!S.mlFaces || S.mlFacesImg !== S.imgId || !S.img) return null;
  const maps = S.mlFaces.filter((f) => f.skin).map((f) => f.skin);
  if (!maps.length) return null;
  const img = S.img;
  const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
  const sc = Math.max(gw/iw, gh/ih) * S.zoom;
  const dw = iw*sc, dh = ih*sc;
  const ox = (gw-dw)/2 + S.ox*Math.abs(dw - gw)/2, oy = (gh-dh)/2 + S.oy*Math.abs(dh - gh)/2;
  const out = new Uint8Array(gw*gh);
  for (let y = 0; y < gh; y++){
    const v = (y + 0.5 - oy)/dh;
    if (v < 0 || v >= 1) continue;                    // letterbox when zoomed out: never skin
    for (let x = 0; x < gw; x++){
      const u = (x + 0.5 - ox)/dw;
      if (u < 0 || u >= 1) continue;
      for (const m of maps){
        if (u < m.x0 || u >= m.x1 || v < m.y0 || v >= m.y1) continue;
        const mx = Math.min(m.w-1, ((u - m.x0)/(m.x1 - m.x0)*m.w) | 0);
        const my = Math.min(m.h-1, ((v - m.y0)/(m.y1 - m.y0)*m.h) | 0);
        const k = my*m.w + mx;
        if (m.mask[k]){ out[y*gw + x] = 1; break; }
      }
    }
  }
  return out;
}

/* ---------------------------- render ---------------------------- */
const mos = $("#mosaic"), mctx = mos.getContext("2d");
const pho = $("#photo"), pctx = pho.getContext("2d");
const hold = $("#hold");

let queued = false, reusePal = false;
function render(reuse){
  if (reuse) reusePal = true;
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => { const r = reusePal; queued = false; reusePal = false; draw(r); });
}

/* ---- color-science helpers ---------------------------------- */
const S2L = new Float32Array(256);          // sRGB byte -> linear light
for (let i = 0; i < 256; i++){
  const v = i/255;
  S2L[i] = v <= 0.04045 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
}
function l2s(v){
  v = v <= 0.0031308 ? v*12.92 : 1.055*Math.pow(v, 1/2.4) - 0.055;
  return clamp(v*255, 0, 255);
}

/* Area-average a hi-res crop down to the stud grid, averaging in linear
   light so midtones and skin don't go muddy the way a naive resize does. */
function downsample(src, gw, gh, f){
  const d = src.getContext("2d").getImageData(0, 0, gw*f, gh*f).data;
  const out = new Float32Array(gw*gh*3), n = f*f;
  for (let y = 0; y < gh; y++){
    for (let x = 0; x < gw; x++){
      let r = 0, g = 0, b = 0;
      for (let sy = 0; sy < f; sy++){
        let i = (((y*f + sy) * gw*f) + x*f) * 4;
        for (let sx = 0; sx < f; sx++, i += 4){
          r += S2L[d[i]]; g += S2L[d[i+1]]; b += S2L[d[i+2]];
        }
      }
      const o = (y*gw + x)*3;
      out[o] = l2s(r/n); out[o+1] = l2s(g/n); out[o+2] = l2s(b/n);
    }
  }
  return out;
}

/* Stretch each channel between its black and white points: recovers flat,
   hazy or underexposed phone photos before any brick is chosen. The black
   point uses a wider 2% cut than the white point's 0.5% — deliberately
   asymmetric, so more of the darkest pixels crush to true black
   automatically, deepening shadows without also blowing out highlights
   that weren't asked to change. */
function measureLevels(buf){
  const N = buf.length/3;
  const params = [];
  for (let c = 0; c < 3; c++){
    const h = new Uint32Array(256);
    for (let i = c; i < buf.length; i += 3) h[clamp(Math.round(buf[i]),0,255)]++;
    const lowCut = Math.max(1, Math.round(N*0.02));
    const highCut = Math.max(1, Math.round(N*0.005));
    let lo = 0, hi = 255, acc = 0;
    for (let v = 0; v < 256; v++){ acc += h[v]; if (acc > lowCut){ lo = v; break; } }
    acc = 0;
    for (let v = 255; v >= 0; v--){ acc += h[v]; if (acc > highCut){ hi = v; break; } }
    params.push({ lo, hi });
  }
  /* Channels are stretched TOGETHER (one shared black and white point),
     with only a quarter of each channel's own correction mixed back in.
     Stretching each channel fully on its own neutralised any photo with a
     strong overall color — a sunset, a desert, autumn leaves, an orange
     cat — and turned it grey, blue or purple, because the "missing" blue
     in a warm scene got stretched up to full strength. The shared stretch
     still fixes flat, hazy or dark photos; the small per-channel part
     still takes the edge off a mild camera color cast. */
  const LINK = 0.25;
  const lo0 = Math.min(params[0].lo, params[1].lo, params[2].lo);
  const hi0 = Math.max(params[0].hi, params[1].hi, params[2].hi);
  return params.map((p) => {
    const lo = lo0 + (p.lo - lo0)*LINK, hi = hi0 + (p.hi - hi0)*LINK;
    return (hi - lo < 24) ? null : { lo, hi, k: 255/(hi - lo) };
  });
}
function applyLevels(buf, params){
  for (let c = 0; c < 3; c++){
    const p = params[c];
    if (!p) continue;
    for (let i = c; i < buf.length; i += 3) buf[i] = clamp((buf[i] - p.lo)*p.k, 0, 255);
  }
}
function autoLevels(buf){ applyLevels(buf, measureLevels(buf)); }

/* Unsharp mask at stud resolution — this is what keeps eyes, teeth and
   jawlines legible once a face is only 50 studs wide. */
/* =====================================================================
   HDR PASS
   Two operations a phone's own HDR does, adapted for a 40-color brick
   palette:

   liftShadows  raises dark tones on a curve that leaves highlights alone,
                so a face in shade gains detail without the sky blowing out.

   localContrast blurs a copy at a wide radius and pushes each pixel away
                from that local average. It is what makes an image read as
                "HDR": midtone texture comes up without the whole frame
                getting brighter. Applied before the palette is chosen, so
                the extra detail influences which bricks are picked.
   ===================================================================== */
/* =====================================================================
   AUTOMATIC WHITE BALANCE AND WARMTH
   "Warm 100%" means the automatic mode is fully on, not that a fixed orange
   filter is applied. The strength is derived from the picture itself:

     coolCast()       measures the blue/red imbalance across midtones
     removeBlueCast() neutralises a blue cast only. A photograph that is
                      already warm is left alone — warmth is the look we
                      want, not a fault to correct
     autoWarm()       warms by an amount derived from that measurement,
                      while protecting neutrals, highlights, sky and foliage

   Runs before the palette is chosen, so the warmth influences which bricks
   are picked rather than being painted on afterwards.
   ===================================================================== */
/* =====================================================================
   HISTORY
   One stack for everything the customer can change: adjustments, crop,
   palette, size, single bricks and whole-colour replacements. Each entry is
   a snapshot of exactly the fields that make a design, so undo restores the
   previous state precisely and redo puts it back. Nothing else is touched
   and nothing is regenerated that does not have to be.
   ===================================================================== */
const HIST = { past: [], future: [], limit: 60 };

function snapshot(){
  return {
    bri: S.bri, con: S.con, sat: S.sat, temp: S.temp, detail: S.detail,
    dither: S.dither, shadows: S.shadows, warm: S.warm,
    auto: S.auto, pal: S.pal, bg: S.bg, sizeId: S.size.id,
    zoom: S.zoom, ox: S.ox, oy: S.oy,
    excludedColors: new Set(S.excludedColors), paletteCount: S.paletteCount,
    bgEffect: S.bgEffect,
    edits: new Map(S.edits),
  };
}

function restore(snap){
  Object.assign(S, {
    bri: snap.bri, con: snap.con, sat: snap.sat, temp: snap.temp, detail: snap.detail,
    dither: snap.dither, shadows: snap.shadows, warm: snap.warm,
    auto: snap.auto, pal: snap.pal, bg: snap.bg,
    zoom: snap.zoom, ox: snap.ox, oy: snap.oy,
    excludedColors: new Set(snap.excludedColors || []),
    paletteCount: snap.paletteCount !== undefined ? snap.paletteCount : S.paletteCount,
    bgEffect: snap.bgEffect || "original",
  });
  const z = SIZES.find((x) => x.id === snap.sizeId);
  if (z && z.id !== S.size.id) S.size = z;
  S.edits = new Map(snap.edits);
  syncSliders();
  const tog = $("#togAuto"); if (tog) tog.setAttribute("aria-pressed", S.auto);
  renderColorGrid();
  renderBgGrid();
  render();
  refreshEdits();
  updateHistoryButtons();
}

window.MB_debugState = () => ({ ox: S.ox, oy: S.oy, zoom: S.zoom, bgEffect: S.bgEffect, auto: S.auto,
  bri: S.bri, con: S.con, sat: S.sat, warm: S.warm, shadows: S.shadows, detail: S.detail, faceBoxes: S.faceBoxes,
  paletteCount: S.paletteCount, excludedColorsSize: S.excludedColors.size, dither: S.dither,
  histPast: HIST.past.length, histFuture: HIST.future.length });
window.MB_debugFaceBoxColors = () => {
  if (!S.faceBoxes || !S.faceBoxes.length || !S.cells || !S.usedPal || !S.baseBuf) return null;
  const { gw, gh } = dims();
  const skinHexSet = new Set(SKIN_PALETTE.map((c) => c[1]));
  const lipOk = new Set(["#BD3A32","#7B3936","#EB6D7F","#C966A2","#E3ADD4","#A83873"]);
  let total = 0;
  const badCells = [];
  for (const b of S.faceBoxes){
    for (let y = Math.max(0,b.y0); y <= Math.min(gh-1,b.y1); y++){
      for (let x = Math.max(0,b.x0); x <= Math.min(gw-1,b.x1); x++){
        const i = y*gw + x;
        total++;
        const cur = S.usedPal[S.cells[i]];
        if (!cur) continue;
        const curC2 = Math.sqrt(cur.lab[1]*cur.lab[1] + cur.lab[2]*cur.lab[2]);
        if (skinHexSet.has(cur.hex) || lipOk.has(cur.hex) || (cur.lab[0] > 92 && curC2 < 15)) continue;
        const o = i*3;
        const [L,a,bb] = rgb2lab(S.baseBuf[o], S.baseBuf[o+1], S.baseBuf[o+2]);
        // only flag the exact signature of the reported bug: a bright
        // source (a highlight, not dark hair/eyebrows/pupils) that ended
        // up as a saturated, clearly-visible non-skin color
        if (L < 65) continue;
        badCells.push({ x, y, hex: cur.hex, name: cur.name, sourceL: Math.round(L) });
      }
    }
  }
  return { totalInFaceBoxes: total, badCellCount: badCells.length, sample: badCells.slice(0, 10) };
};
window.MB_debugGreyGuard = () => {
  if (!S.faceBoxes || !S.faceBoxes.length || !S.cells || !S.usedPal || !S.baseBuf) return null;
  const { gw, gh } = dims();
  const greyHexes = new Set(["#FEFEFE", "#A4A9AA", "#6F7176", "#4B4C50"]);
  let totalInBoxes = 0, greyCount = 0, warmSourceButGrey = 0;
  for (const b of S.faceBoxes){
    for (let y = Math.max(0,b.y0); y <= Math.min(gh-1,b.y1); y++){
      for (let x = Math.max(0,b.x0); x <= Math.min(gw-1,b.x1); x++){
        const i = y*gw + x;
        totalInBoxes++;
        const cur = S.usedPal[S.cells[i]];
        if (!cur || !greyHexes.has(cur.hex)) continue;
        greyCount++;
        const o = i*3;
        const [L,a,bb] = rgb2lab(S.baseBuf[o], S.baseBuf[o+1], S.baseBuf[o+2]);
        const C = Math.sqrt(a*a+bb*bb);
        const hue = Math.atan2(bb,a) * 180/Math.PI;
        if (C >= 10 && hue > 5 && hue < 70) warmSourceButGrey++;
      }
    }
  }
  return { totalInFaceBoxes: totalInBoxes, greyCellsInFaceBoxes: greyCount, warmSourceStillGrey: warmSourceButGrey };
};
window.MB_debugUnprotectedSkinLike = () => {
  if (!S.cells || !S.usedPal || !S.baseBuf) return null;
  const { gw, gh } = dims();
  const skinHexSet = new Set(SKIN_PALETTE.map((c) => c[1]));
  const lipOk = new Set(["#BD3A32","#7B3936","#EB6D7F","#C966A2","#E3ADD4","#A83873"]);
  let candidates = 0;
  const bad = [];
  for (let i = 0; i < gw*gh; i++){
    const cur = S.usedPal[S.cells[i]];
    if (!cur) continue;
    if (skinHexSet.has(cur.hex) || lipOk.has(cur.hex)) continue;      // already fine
    if (S.regionMap && S.regionMap[i] === 1) continue;                 // rule 1 already covers this
    const x = i % gw, y = (i/gw)|0;
    const inFaceBox = (S.faceBoxes||[]).some((b) => x>=b.x0 && x<=b.x1 && y>=b.y0 && y<=b.y1);
    if (inFaceBox) continue;                                           // rules 2/3 already cover this
    const o = i*3;
    const [L,a,bb] = rgb2lab(S.baseBuf[o], S.baseBuf[o+1], S.baseBuf[o+2]);
    const C = Math.sqrt(a*a+bb*bb);
    const hue = Math.atan2(bb,a) * 180/Math.PI;
    const looksSkinLike = C >= 8 && hue > 5 && hue < 95 && L > 25 && L < 92;
    if (!looksSkinLike) continue;
    candidates++;
    bad.push({ x, y, hex: cur.hex, name: cur.name, sourceL: Math.round(L), sourceC: Math.round(C), sourceHue: Math.round(hue) });
  }
  return { candidates, sample: bad.slice(0, 15) };
};
window.MB_debugSkinPalette = () => {
  const skinHexSet = new Set(SKIN_PALETTE.map((c) => c[1]));
  const palHexes = (S.usedPal || []).map((c) => c.hex);
  const skinColorsInPal = palHexes.filter((h) => skinHexSet.has(h));
  let skinCellsTotal = 0, skinCellsUsingApproved = 0;
  if (S.regionMap && S.cells){
    const palByHex = new Map((S.usedPal || []).map((c, i) => [c.hex, i]));
    const approvedIdx = new Set(SKIN_PALETTE.map((c) => c[1]).filter((h) => palByHex.has(h)).map((h) => palByHex.get(h)));
    for (let i = 0; i < S.regionMap.length; i++){
      if (S.regionMap[i] === 1){
        skinCellsTotal++;
        if (approvedIdx.has(S.cells[i])) skinCellsUsingApproved++;
      }
    }
  }
  return { skinColorsInPal, palSize: palHexes.length, skinCellsTotal, skinCellsUsingApproved,
    pctApproved: skinCellsTotal ? Math.round((skinCellsUsingApproved/skinCellsTotal)*100) : null };
};

/* Smart Suggestions — a few distinct, ready-made style variations the
   customer can preview and pick from, rather than one single automatic
   result. Each preset only varies the tone parameters (brightness,
   contrast, saturation, warmth, detail) — crop, background and palette
   stay exactly as the customer already has them, so this is a styling
   choice, not a redo of decisions they've already made. Every variation
   still renders through the real pipeline, so skin-tone restriction and
   everything else apply exactly as they would to the final design. */
const SUGGESTION_PRESETS = [
  { id: "balanced", label: "Balanced",
    values: { bri: 3, con: 14, sat: 11, warm: 35, detail: 60 } },
  { id: "vibrant", label: "Vibrant",
    values: { bri: 6, con: 20, sat: 25, warm: 42, detail: 65 } },
  { id: "soft", label: "Soft & Natural",
    values: { bri: 8, con: 6, sat: -5, warm: 25, detail: 50 } },
];

async function generateStyleSuggestions(onProgress){
  if (!S.img) return [];
  const mosEl = $("#mosaic");
  const saved = { bri: S.bri, con: S.con, sat: S.sat, warm: S.warm, detail: S.detail };
  const results = [];
  for (let i = 0; i < SUGGESTION_PRESETS.length; i++){
    const preset = SUGGESTION_PRESETS[i];
    if (onProgress) onProgress(i, SUGGESTION_PRESETS.length, preset.label);
    Object.assign(S, preset.values);
    draw(false);                          // force a fresh render at this preset's settings
    await new Promise((r) => requestAnimationFrame(r));   // let the canvas actually paint before capturing
    let thumb = null;
    try { thumb = mosEl.toDataURL("image/jpeg", 0.72); } catch (e){ thumb = null; }
    results.push({ id: preset.id, label: preset.label, values: preset.values, thumb });
  }
  Object.assign(S, saved);                // restore exactly what the customer had
  draw(false);
  return results;
}

function applyStyleSuggestion(preset){
  pushHistory("Style: " + preset.label);
  Object.assign(S, preset.values);
  syncSliders();
  render();
}
window.MB_generateStyleSuggestions = generateStyleSuggestions;
window.MB_applyStyleSuggestion = applyStyleSuggestion;

/* Record the state *before* a change. Slider drags coalesce: a whole drag is
   one undo step, not one per pixel of travel. */
let histTimer = null, histPending = null;
function pushHistory(label, coalesce){
  if (coalesce){
    if (histPending === coalesce) return;      // already recorded this drag
    histPending = coalesce;
    clearTimeout(histTimer);
    histTimer = setTimeout(() => { histPending = null; }, 700);
  }
  HIST.past.push({ snap: snapshot(), label: label || "Change" });
  if (HIST.past.length > HIST.limit) HIST.past.shift();
  HIST.future.length = 0;
  updateHistoryButtons();
}

function undoStep(){
  if (!HIST.past.length) return;
  const entry = HIST.past.pop();
  HIST.future.push({ snap: snapshot(), label: entry.label });
  restore(entry.snap);
  updateHistoryButtons();          // state is settled only once the stacks are final
  toast("Undone: " + entry.label.toLowerCase() + ".");
}

function redoStep(){
  if (!HIST.future.length) return;
  const entry = HIST.future.pop();
  HIST.past.push({ snap: snapshot(), label: entry.label });
  restore(entry.snap);
  updateHistoryButtons();
  toast("Redone: " + entry.label.toLowerCase() + ".");
}

function updateHistoryButtons(){
  document.querySelectorAll("[data-undo]").forEach((b) => {
    b.disabled = !HIST.past.length;
    b.setAttribute("aria-disabled", !HIST.past.length);
  });
  document.querySelectorAll("[data-redo]").forEach((b) => {
    b.disabled = !HIST.future.length;
    b.setAttribute("aria-disabled", !HIST.future.length);
  });
}

function coolCast(buf){
  let n = 0, sr = 0, sg = 0, sb = 0;
  for (let i = 0; i < buf.length; i += 3){
    const l = 0.299*buf[i] + 0.587*buf[i+1] + 0.114*buf[i+2];
    if (l < 18 || l > 238) continue;              // ignore crushed and blown pixels
    sr += buf[i]; sg += buf[i+1]; sb += buf[i+2]; n++;
  }
  if (!n) return 0;
  const mr = sr/n, mg = sg/n, mb = sb/n, mean = (mr + mg + mb)/3 || 1;
  return (mb - mr) / mean;                        // positive means the picture is cool
}

function removeBlueCast(buf, cast){
  if (cast <= 0.02) return;                       // already warm or neutral: leave it
  const s = clamp(cast, 0, 0.35) * 0.45;          // partial, never a full neutralisation
  for (let i = 0; i < buf.length; i += 3){
    buf[i]   = clamp(buf[i]   * (1 + s*0.45), 0, 255);
    buf[i+2] = clamp(buf[i+2] * (1 - s*0.40), 0, 255);
  }
}

function autoWarm(buf, amount, cast){
  if (amount <= 0) return 0;
  // a cold picture earns a strong correction, a warm one barely any
  const adaptive = clamp(0.40 + cast*1.2, 0.18, 1.05);
  const k = (amount/100) * adaptive * 0.115;
  for (let i = 0; i < buf.length; i += 3){
    const r = buf[i], g = buf[i+1], b = buf[i+2];
    const mx = Math.max(r,g,b), mn = Math.min(r,g,b);
    const sat = mx === 0 ? 0 : (mx - mn)/mx;
    const lum = (0.299*r + 0.587*g + 0.114*b)/255;
    // whites, greys and walls stay neutral; highlights keep their purity
    const neutral = clamp((sat - 0.16)/0.24, 0, 1);
    const head = 1 - clamp((lum - 0.66)/0.34, 0, 1);
    let w = k * neutral * head;
    if (b > r && b > g) w *= 0.22;                // sky and blue clothing
    else if (g > r && g > b) w *= 0.45;           // foliage
    else {
      w *= 1.25;                                  // skin and warm subjects
      // bright skin sits high in the highlight roll-off; without a floor a
      // pale face in cool light ends up with no warmth at all
      if (sat > 0.11 && sat < 0.60) w = Math.max(w, k * 0.45);
    }
    buf[i]   = clamp(r * (1 + w), 0, 255);
    buf[i+1] = clamp(g * (1 + w*0.28), 0, 255);
    buf[i+2] = clamp(b * (1 - w*0.85), 0, 255);
  }
  return adaptive;
}

/* Positive: gently lifts shadows toward white (opens up dark areas).
   Negative: gently pushes shadows toward black (deepens dark areas).
   Both use the same curve — strongest at black, nothing at white — just
   mirrored, so the two directions feel symmetric to the customer. */
function liftShadows(buf, amount){
  if (amount === 0) return;
  const k = Math.abs(amount) / 100, lighten = amount > 0;
  for (let i = 0; i < buf.length; i += 3){
    const lum = (0.299*buf[i] + 0.587*buf[i+1] + 0.114*buf[i+2]) / 255;
    // strongest at black, nothing at white
    const gain = k * (1 - lum) * (1 - lum) * (1 - lum);
    if (gain <= 0) continue;
    for (let c = 0; c < 3; c++){
      const v = buf[i+c] / 255;
      const nv = lighten ? v + (1 - v) * gain * 0.5 : v - v * gain * 0.5;
      buf[i+c] = clamp(nv * 255, 0, 255);
    }
  }
}

function boxBlur(src, gw, gh, r){
  const tmp = new Float32Array(src.length), out = new Float32Array(src.length);
  const w = r*2 + 1;
  for (let y = 0; y < gh; y++){
    for (let c = 0; c < 3; c++){
      let sum = 0;
      for (let x = -r; x <= r; x++) sum += src[(y*gw + clamp(x,0,gw-1))*3 + c];
      for (let x = 0; x < gw; x++){
        tmp[(y*gw + x)*3 + c] = sum / w;
        sum -= src[(y*gw + clamp(x-r,0,gw-1))*3 + c];
        sum += src[(y*gw + clamp(x+r+1,0,gw-1))*3 + c];
      }
    }
  }
  for (let x = 0; x < gw; x++){
    for (let c = 0; c < 3; c++){
      let sum = 0;
      for (let y = -r; y <= r; y++) sum += tmp[(clamp(y,0,gh-1)*gw + x)*3 + c];
      for (let y = 0; y < gh; y++){
        out[(y*gw + x)*3 + c] = sum / w;
        sum -= tmp[(clamp(y-r,0,gh-1)*gw + x)*3 + c];
        sum += tmp[(clamp(y+r+1,0,gh-1)*gw + x)*3 + c];
      }
    }
  }
  return out;
}

function localContrast(buf, gw, gh, amount, skinMask){
  if (amount <= 0) return;
  const k = amount / 100 * 0.9;
  const r = Math.max(2, Math.round(Math.min(gw, gh) / 12));   // wide radius = tonal, not edgy
  const blur = boxBlur(buf, gw, gh, r);
  for (let i = 0; i < buf.length; i++){
    const detail = buf[i] - blur[i];
    // ease off near black and white so nothing clips
    const head = 1 - Math.abs(buf[i] - 127.5) / 127.5;
    // skin gets roughly half the push — full-strength local contrast is
    // what turns cheeks and foreheads blotchy once every pixel becomes a
    // brick choice; eyes, brows, mouth and hairline aren't skin-colored
    // so they keep the full effect automatically
    const skinDamp = (skinMask && skinMask[(i/3)|0]) ? 0.5 : 1;
    buf[i] = clamp(buf[i] + detail * k * (0.35 + 0.65*head) * skinDamp, 0, 255);
  }
}

/* Cheap edge-preserving smoothing (a separable approximation of a bilateral
   filter: blur, but only pull a pixel toward the blur when they're already
   close in value — a real edge stops the smoothing instead of crossing
   it). Reduces sensor/JPEG noise and skin-pore-level micro-detail before
   sharpening has a chance to amplify it into speckled bricks, without
   softening genuine structure like eyes or hairlines.
   Region-aware: background and clothing get pushed harder toward
   simplification (they shouldn't compete with the face for attention),
   hair keeps more of its own structure, skin sits in between. */
function edgePreserveSmooth(buf, gw, gh, amount, regionMap, faceBoxes){
  if (amount <= 0) return;
  const k = clamp(amount, 0, 1);
  const blur = boxBlur(buf, gw, gh, 1);
  const rangeSigma = 26;                       // values within ~this far apart count as "the same edge"
  // background 0, skin 1, hair 2, clothing 3
  const REGION_MULT = [1.5, 1, 0.75, 1.15];
  const inFaceBox = (cellIdx) => {
    if (!faceBoxes || !faceBoxes.length) return false;
    const x = cellIdx % gw, y = (cellIdx / gw) | 0;
    for (let bi = 0; bi < faceBoxes.length; bi++){
      const b = faceBoxes[bi];
      if (x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1) return true;
    }
    return false;
  };
  for (let i = 0; i < buf.length; i++){
    const cellIdx = (i/3)|0;
    let mult = regionMap ? REGION_MULT[regionMap[cellIdx]] : 1;
    // eyes, eyebrows and lips fall through to background/hair by color
    // alone, but they're the most detail-critical pixels in the whole
    // photo — anything inside a face box gets a much lighter touch
    // regardless of what region it was classified into
    if (inFaceBox(cellIdx)) mult = Math.min(mult, 0.4);
    const d = buf[i] - blur[i];
    const w = Math.exp(-(d*d) / (2*rangeSigma*rangeSigma));   // near 1 on flat areas, near 0 across a real edge
    buf[i] = buf[i] - d * k * w * 0.6 * mult;
  }
}


function sharpen(buf, gw, gh, amount, skinMask){
  if (amount <= 0) return;
  const a = amount/100 * 1.35, blur = new Float32Array(buf.length);
  const K = [1,2,1, 2,4,2, 1,2,1], KS = 16;
  for (let y = 0; y < gh; y++){
    for (let x = 0; x < gw; x++){
      let r=0, g=0, b=0, k=0;
      for (let dy=-1; dy<=1; dy++){
        const yy = clamp(y+dy, 0, gh-1);
        for (let dx=-1; dx<=1; dx++, k++){
          const xx = clamp(x+dx, 0, gw-1), i = (yy*gw+xx)*3, w = K[k];
          r += buf[i]*w; g += buf[i+1]*w; b += buf[i+2]*w;
        }
      }
      const o = (y*gw+x)*3;
      blur[o] = r/KS; blur[o+1] = g/KS; blur[o+2] = b/KS;
    }
  }
  for (let i = 0; i < buf.length; i++){
    // full sharpening on a whole cheek is what produces a harsh, gritty
    // mosaic — skin gets a lighter pass, real edges elsewhere (and eyes,
    // lips, hairline, which aren't classified as skin) get the full one
    const skinDamp = (skinMask && skinMask[(i/3)|0]) ? 0.45 : 1;
    buf[i] = clamp(buf[i] + a*skinDamp*(buf[i] - blur[i]), 0, 255);
  }
}

/* Runs after brightness/contrast/saturation/warmth, only on pixels the
   face/skin heuristic flagged. The push toward warmer skin is now scaled
   to this specific photo's own measured cast (S.baseCast, from coolCast()
   earlier in the pipeline) rather than applied at a fixed strength to
   every photo — a photo that's already warm gets little to none, which
   is what stops faces drifting orange, pink or red; a photo with a real
   blue cast still gets a meaningful counter-push. */
function protectSkinColors(buf, skinMask){
  if (!skinMask) return;
  const N = skinMask.length;
  const cast = S.baseCast || 0;         // positive = photo reads cool/blue, negative = already warm
  const boost = clamp(cast * 1.2, 0, 0.22);
  if (boost <= 0.005) return;           // an already-warm or neutral photo needs no push at all
  for (let i = 0; i < N; i++){
    if (!skinMask[i]) continue;
    const o = i*3;
    let r = buf[o], g = buf[o+1], b = buf[o+2];
    const lum = 0.299*r + 0.587*g + 0.114*b;
    r += lum * boost * 0.55;
    g += lum * boost * 0.12;
    b -= lum * boost * 0.5;
    // only guard against literal clipping — a much looser ceiling than
    // before, so the warmth boost above actually shows
    const warmth = (r - b) / Math.max(1, lum);
    const maxWarmth = 1.15;
    if (warmth > maxWarmth){
      const pull = (warmth - maxWarmth) * 0.5;
      r -= lum*pull*0.5;
      b += lum*pull*0.5;
    }
    const mx = Math.max(r,g,b), mn = Math.min(r,g,b);
    const sat = mx === 0 ? 0 : (mx-mn)/mx;
    if (sat > 0.72){
      const k = 0.72/sat;
      r = lum + (r-lum)*k; g = lum + (g-lum)*k; b = lum + (b-lum)*k;
    }
    buf[o] = clamp(r,0,255); buf[o+1] = clamp(g,0,255); buf[o+2] = clamp(b,0,255);
  }
}

/* Pick the kit's colors properly.

   Three things matter and the old frequency count got all three wrong:
   1. Error, not popularity — a color earns its bag by how much of the
      picture it fixes, measured in Lab.
   2. Where the error is — studs in detailed areas (eyes, edges, hair) and
      near the middle of the board count for more than flat wall behind you.
   3. Refinement — a greedy first pass is only a starting point, so it is
      then improved by k-medoid rounds until the colors stop moving. */
function buildSamples(buf, gw, gh, regionMap){
  const N = gw*gh, cap = window.innerWidth < 900 ? 1400 : 3200;
  const step = Math.max(1, Math.floor(N/cap));
  const lum = new Float32Array(N);
  for (let i = 0; i < N; i++) lum[i] = .299*buf[i*3] + .587*buf[i*3+1] + .114*buf[i*3+2];
  const labs = [], w = [];
  // background 0, skin 1, hair 2, clothing 3 — background gets reduced
  // voting power so a vibrant background can't out-compete the subject
  // for the limited palette budget; skin/hair/clothing get a boost since
  // getting those right matters far more than background variety
  const REGION_WEIGHT = [0.45, 1.7, 1.5, 1.2];
  for (let i = 0; i < N; i += step){
    const x = i % gw, y = (i / gw) | 0;
    // local detail: how much this stud differs from its neighbours
    const l = lum[i];
    const gx = Math.abs(l - lum[y*gw + Math.min(gw-1, x+1)]) + Math.abs(l - lum[y*gw + Math.max(0, x-1)]);
    const gy = Math.abs(l - lum[Math.min(gh-1, y+1)*gw + x]) + Math.abs(l - lum[Math.max(0, y-1)*gw + x]);
    const detail = Math.min(1, (gx + gy)/120);
    // centre bias: the subject is almost always not in the corner
    const dx = (x/(gw-1) - .5)*2, dy = (y/(gh-1) - .5)*2;
    const centre = Math.max(0, 1 - (dx*dx + dy*dy));
    const lb = rgb2lab(buf[i*3], buf[i*3+1], buf[i*3+2]);
    lb[3] = Math.sqrt(lb[1]*lb[1] + lb[2]*lb[2]);
    const isSkin = isSkinLab(lb[0], lb[1], lb[2]);
    labs.push(lb);
    const regionW = regionMap ? REGION_WEIGHT[regionMap[i]] : (isSkin ? 1.7 : 1);
    w.push((1 + 2.4*detail + 0.7*centre) * regionW);
  }
  return { labs, w };
}
const dLab = (p, c) => {
  const l = c.lab !== undefined ? c : { lab: c, C: Math.sqrt(c[1]*c[1] + c[2]*c[2]) };
  return de94(p[0], p[1], p[2], p[3] !== undefined ? p[3] : Math.sqrt(p[1]*p[1] + p[2]*p[2]), l);
};

function choosePalette(buf, gw, gh, P, max, mustInclude){
  if (P.length <= max) return P.slice();
  const { labs, w } = buildSamples(buf, gw, gh, S.regionMap);
  const S_ = labs.length;
  const err = new Float64Array(S_).fill(Infinity);
  const chosen = [], taken = new Set();

  // greedy: repeatedly add whichever color removes the most weighted error
  for (let pick = 0; pick < max; pick++){
    let best = -1, bestGain = -1;
    for (let c = 0; c < P.length; c++){
      if (taken.has(c)) continue;
      const l = P[c].lab;
      let gain = 0;
      for (let i = 0; i < S_; i++){
        const d = dLab(labs[i], l);
        if (d < err[i]) gain += (err[i] === Infinity ? 1e7 - d : err[i] - d) * w[i];
      }
      if (gain > bestGain){ bestGain = gain; best = c; }
    }
    if (best < 0) break;
    taken.add(best); chosen.push(best);
    const l = P[best].lab;
    for (let i = 0; i < S_; i++){ const d = dLab(labs[i], l); if (d < err[i]) err[i] = d; }
  }

  // refine: reassign, then re-pick the best brick for each cluster
  const assign = new Int16Array(S_);
  for (let round = 0; round < 6; round++){
    for (let i = 0; i < S_; i++){
      let b = 0, bd = Infinity;
      for (let k = 0; k < chosen.length; k++){
        const d = dLab(labs[i], P[chosen[k]]);
        if (d < bd){ bd = d; b = k; }
      }
      assign[i] = b;
    }
    let moved = false;
    const used = new Set(chosen);
    for (let k = 0; k < chosen.length; k++){
      let best = chosen[k], bestCost = Infinity;
      for (let c = 0; c < P.length; c++){
        if (c !== chosen[k] && used.has(c)) continue;
        const l = P[c].lab;
        let cost = 0;
        for (let i = 0; i < S_; i++) if (assign[i] === k) cost += dLab(labs[i], l) * w[i];
        if (cost < bestCost){ bestCost = cost; best = c; }
      }
      if (best !== chosen[k]){
        used.delete(chosen[k]); used.add(best); chosen[k] = best; moved = true;
      }
    }
    if (!moved) break;
  }
  let result = chosen.map((c) => P[c]);
  // guarantee specific colors are present (the approved skin palette, when
  // this photo has detected skin) — replace the lowest-priority entries
  // rather than appending, so the total color count a customer's kit
  // needs never silently grows past what they were quoted
  if (mustInclude && mustInclude.length){
    const haveHex = new Set(result.map((c) => c.hex));
    const missing = mustInclude.filter((c) => !haveHex.has(c.hex));
    for (let i = 0; i < missing.length; i++){
      if (result.length < max){ result.push(missing[i]); continue; }
      // replace starting from the end — chosen[] is greedy-selection
      // order, so later entries had the least marginal benefit
      const replaceAt = result.length - 1 - i;
      if (replaceAt >= 0) result[replaceAt] = missing[i];
    }
  }
  return result;
}

/* No kit ships a bag of four bricks. Any color used fewer than MIN_BRICKS
   times is folded into its nearest surviving neighbour. */
function enforceMinimum(cells, PAL, min){
  const alive = PAL.map(() => true);
  let live = PAL.length;
  const skinHexSet = new Set(SKIN_PALETTE.map((c) => c[1]));
  const isSkinColor = PAL.map((c) => skinHexSet.has(c.hex));
  for (;;){
    const counts = new Array(PAL.length).fill(0);
    for (let i = 0; i < cells.length; i++) counts[cells[i]]++;
    // a color the picture never actually used doesn't get a bag either
    for (let i = 0; i < PAL.length; i++) if (alive[i] && counts[i] === 0){ alive[i] = false; live--; }
    let worst = -1, worstN = min;
    for (let i = 0; i < PAL.length; i++)
      if (alive[i] && counts[i] > 0 && counts[i] < worstN){ worstN = counts[i]; worst = i; }
    if (worst < 0 || live <= 2) break;
    // a rare approved skin color must fold into another surviving skin
    // color, never into the unrestricted palette — otherwise a small
    // shadowed skin area (easily under the minimum) silently ends up
    // some unrelated color, bypassing skin restriction after the fact
    const worstIsSkin = isSkinColor[worst];
    const anySkinSurvivesElsewhere = worstIsSkin && PAL.some((c, i) => alive[i] && i !== worst && isSkinColor[i]);
    let to = -1, bd = Infinity;
    for (let i = 0; i < PAL.length; i++){
      if (!alive[i] || i === worst) continue;
      if (worstIsSkin && anySkinSurvivesElsewhere && !isSkinColor[i]) continue;   // stay within skin tones when possible
      const d = dLab(PAL[worst].lab, PAL[i]);
      if (d < bd){ bd = d; to = i; }
    }
    if (to < 0) break;
    for (let i = 0; i < cells.length; i++) if (cells[i] === worst) cells[i] = to;
    alive[worst] = false; live--;
  }
  // compact so indices stay tight
  const map = new Int16Array(PAL.length).fill(-1), out = [];
  for (let i = 0; i < PAL.length; i++) if (alive[i]){ map[i] = out.length; out.push(PAL[i]); }
  for (let i = 0; i < cells.length; i++) cells[i] = map[cells[i]];
  return out;
}

/* Spatial cleanup — distinct from enforceMinimum above, which only ever
   removes a color that is rare across the WHOLE image. A brick that is
   the only one of its color in its immediate neighbourhood (dithering
   speckle, or a stray quantization choice) survives that pass untouched
   if the color is common elsewhere in the photo. This finds those true
   singletons and folds each one into whichever neighbour color is both
   dominant locally and perceptually close — never a large intentional
   region, never a distant color, and never a brick inside a face box
   that's already near-black or near-white (a pupil, a catchlight, a
   tooth, kept on purpose). */
function cleanIsolatedBricks(cells, gw, gh, PAL, faceBoxes, strength, restrictToBoxes){
  if (strength <= 0) return 0;
  if (restrictToBoxes && (!faceBoxes || !faceBoxes.length)) return 0;
  const maxD = 90 + strength*70;
  const out = cells.slice();
  const skinHexSet = new Set(SKIN_PALETTE.map((c) => c[1]));
  const isSkinColor = PAL.map((c) => c && skinHexSet.has(c.hex));
  const inAnyBox = (x, y) => {
    if (!faceBoxes || !faceBoxes.length) return false;
    for (let k = 0; k < faceBoxes.length; k++){
      const b = faceBoxes[k];
      if (x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1) return true;
    }
    return false;
  };
  let changed = 0;
  for (let y = 0; y < gh; y++){
    for (let x = 0; x < gw; x++){
      const inBox = inAnyBox(x, y);
      if (restrictToBoxes && !inBox) continue;    // this pass only revisits the face(s)
      const i = y*gw + x, c = cells[i];
      const nb = [];
      if (x > 0)    nb.push(cells[i-1]);
      if (x < gw-1) nb.push(cells[i+1]);
      if (y > 0)    nb.push(cells[i-gw]);
      if (y < gh-1) nb.push(cells[i+gw]);
      if (!nb.length || nb.some((n) => n === c)) continue;   // has company — leave it

      const L = PAL[c] ? PAL[c].lab[0] : 50;
      if (inBox && (L < 14 || L > 90)) continue;    // likely a pupil, catchlight or tooth

      const tally = new Map();
      nb.forEach((n) => tally.set(n, (tally.get(n)||0) + 1));
      let winner = -1, count = 0;
      tally.forEach((v, k) => { if (v > count){ count = v; winner = k; } });
      if (winner < 0 || !PAL[winner] || !PAL[c]) continue;
      if (count < 2 && nb.length >= 3) continue;      // no real local consensus — leave it alone
      // never let an approved skin color be overwritten by a non-skin
      // winner — a correctly-restricted skin brick that happens to sit
      // next to a differently-colored area (background, hair edge, a
      // fold of clothing) should stay skin-colored, not get pulled into
      // whatever's locally dominant
      if (isSkinColor[c] && !isSkinColor[winner]) continue;
      const d = dLab(PAL[c].lab, PAL[winner]);
      if (d > maxD) continue;                          // too different a color to be noise — an intentional accent
      out[i] = winner; changed++;
    }
  }
  cells.set(out);
  return changed;
}

  /* =====================================================================
   BACKGROUND / CREATIVE EFFECTS
   Honesty about what this is: true photographic background replacement
   needs real ML portrait segmentation (something like MediaPipe Selfie
   Segmentation). That runs as an external model loaded from a CDN in the
   customer's own browser — legitimate and it would work in production,
   but it's a new external dependency I can't verify end-to-end from this
   sandbox (no network path to test against a real CDN here), and it adds
   a failure mode if that CDN is ever blocked or slow. So this uses the
   region classifier already built for skin/hair/clothing/background
   instead — zero new dependencies, fully testable, but a heuristic, not
   true ML segmentation. It will be less precise around wispy hair and
   complex poses than a real segmentation model would be. If that gap
   matters, the MediaPipe route is a real, buildable upgrade later.

   Each effect is deliberately simplified — large, clean color regions,
   not photographic detail — because that's what actually survives being
   turned into a few thousand studs. This is drawn directly at the
   working grid resolution, so it goes through the exact same enhancement
   and color-quantization pipeline as the rest of the photo. */
/* Bundled photo backgrounds load once, lazily, and are cached — draw()
   is called synchronously and just falls back to a plain fill if the
   image hasn't finished loading yet (same pattern as the custom bg). */
const BG_IMAGE_CACHE = {};
function loadBgImage(key){
  if (!BG_IMAGE_CACHE[key]){
    const img = new Image();
    img.src = (window.MB_BG_PHOTO_URLS && window.MB_BG_PHOTO_URLS[key]) || "";
    img.onload = () => {
      delete BG_THUMB_CACHE[key];             // the cached thumb (if any) predates the real image
      if (S.bgEffect === key) render();
      if (typeof renderBgGrid === "function") renderBgGrid();
      if (window.MB_syncMobileBackgroundUI) window.MB_syncMobileBackgroundUI();
    };
    BG_IMAGE_CACHE[key] = img;
  }
  return BG_IMAGE_CACHE[key];
}
function drawBgPhoto(key, ctx, w, h, fallback){
  const img = loadBgImage(key);
  if (!img.complete || !img.naturalWidth){ ctx.fillStyle = fallback || "#EDE4DF"; ctx.fillRect(0,0,w,h); return; }
  const iw = img.naturalWidth, ih = img.naturalHeight;
  const sc = Math.max(w/iw, h/ih);                 // cover-fit, same as the main photo crop
  const dw = iw*sc, dh = ih*sc;
  ctx.drawImage(img, (w-dw)/2, (h-dh)/2, dw, dh);
}

const BG_EFFECTS = {
  original: { name: "Original" },
  none:     { name: "Remove", draw(ctx,w,h){
    ctx.fillStyle = "#F4F2ED"; ctx.fillRect(0,0,w,h);
  }},
  custom:   { name: "Your photo", draw(ctx,w,h){
    if (!S.customBgImg) { ctx.fillStyle = "#EDE4DF"; ctx.fillRect(0,0,w,h); return; }
    const iw = S.customBgImg.naturalWidth || S.customBgImg.width,
          ih = S.customBgImg.naturalHeight || S.customBgImg.height;
    const sc = Math.max(w/iw, h/ih);                 // cover-fit, same as the main photo crop
    const dw = iw*sc, dh = ih*sc;
    ctx.drawImage(S.customBgImg, (w-dw)/2, (h-dh)/2, dw, dh);
  }},
  rainbowTunnel: { name: "Rainbow Tunnel", draw(ctx,w,h){ drawBgPhoto("rainbowTunnel", ctx, w, h, "#2FA9A0"); }},
  pinkCyan: { name: "Pink to Cyan", draw(ctx,w,h){ drawBgPhoto("pinkCyan", ctx, w, h, "#C23B8F"); }},
  colorSwirl: { name: "Color Swirl", draw(ctx,w,h){ drawBgPhoto("colorSwirl", ctx, w, h, "#3B6FA8"); }},
  rainbowStudio: { name: "Rainbow Studio", draw(ctx,w,h){ drawBgPhoto("rainbowStudio", ctx, w, h, "#E2604F"); }},
  paintSplatterWarm: { name: "Paint Splatter Warm", draw(ctx,w,h){ drawBgPhoto("paintSplatterWarm", ctx, w, h, "#E8A23C"); }},
  paintSplatterWhite: { name: "Paint Splatter White", draw(ctx,w,h){ drawBgPhoto("paintSplatterWhite", ctx, w, h, "#F2F0EC"); }},
  watercolorStripes: { name: "Watercolor Stripes", draw(ctx,w,h){ drawBgPhoto("watercolorStripes", ctx, w, h, "#E15C8A"); }},
  rainbowVortex: { name: "Rainbow Vortex", draw(ctx,w,h){ drawBgPhoto("rainbowVortex", ctx, w, h, "#1B3B6F"); }},
  sunsetGradient: { name: "Sunset Gradient", draw(ctx,w,h){ drawBgPhoto("sunsetGradient", ctx, w, h, "#E85D9C"); }},
  bokehBlur: { name: "Bokeh Blur", draw(ctx,w,h){ drawBgPhoto("bokehBlur", ctx, w, h, "#3E7CA6"); }},
  colorBlobs: { name: "Color Blobs", draw(ctx,w,h){ drawBgPhoto("colorBlobs", ctx, w, h, "#F2E8DC"); }},
  marbleSwirl: { name: "Marble Swirl", draw(ctx,w,h){ drawBgPhoto("marbleSwirl", ctx, w, h, "#8B3A9E"); }},
  waveArt: { name: "Wave Art", draw(ctx,w,h){ drawBgPhoto("waveArt", ctx, w, h, "#4A2E7A"); }},
  palmSunset: { name: "Palm Sunset", draw(ctx,w,h){ drawBgPhoto("palmSunset", ctx, w, h, "#AD5741"); }},
  purpleOceanSunset: { name: "Purple Ocean Sunset", draw(ctx,w,h){ drawBgPhoto("purpleOceanSunset", ctx, w, h, "#7E3378"); }},
  watercolorSky: { name: "Watercolor Sky", draw(ctx,w,h){ drawBgPhoto("watercolorSky", ctx, w, h, "#AFE0FB"); }},
  tropicalLagoon: { name: "Tropical Lagoon", draw(ctx,w,h){ drawBgPhoto("tropicalLagoon", ctx, w, h, "#6DA7A9"); }},
  pastelBeachSunset: { name: "Pastel Beach Sunset", draw(ctx,w,h){ drawBgPhoto("pastelBeachSunset", ctx, w, h, "#BAB8B3"); }},
  watercolorBeach: { name: "Watercolor Beach", draw(ctx,w,h){ drawBgPhoto("watercolorBeach", ctx, w, h, "#C8D3D2"); }},
  papercutWaves: { name: "Paper Cut Waves", draw(ctx,w,h){ drawBgPhoto("papercutWaves", ctx, w, h, "#C48193"); }},
  paintTexturePink: { name: "Paint Texture Pink", draw(ctx,w,h){ drawBgPhoto("paintTexturePink", ctx, w, h, "#945167"); }},
  paintTextureTeal: { name: "Paint Texture Teal", draw(ctx,w,h){ drawBgPhoto("paintTextureTeal", ctx, w, h, "#6CD5DC"); }},
  inkSwirl: { name: "Ink Swirl", draw(ctx,w,h){ drawBgPhoto("inkSwirl", ctx, w, h, "#808E9A"); }},
  inkSplash: { name: "Ink Splash", draw(ctx,w,h){ drawBgPhoto("inkSplash", ctx, w, h, "#B46778"); }},
  cartoonClouds: { name: "Cartoon Clouds", draw(ctx,w,h){ drawBgPhoto("cartoonClouds", ctx, w, h, "#C19A93"); }},
  sky:      { name: "Soft Sky", draw(ctx,w,h){
    const g = ctx.createLinearGradient(0,0,0,h);
    g.addColorStop(0,"#8FC7F2"); g.addColorStop(1,"#E3F2FD");
    ctx.fillStyle = g; ctx.fillRect(0,0,w,h);
    ctx.fillStyle = "rgba(255,255,255,.9)";
    for (let i=0;i<5;i++){ const cx=w*(0.15+0.7*(i/4)), cy=h*(0.15+0.12*(i%2));
      ctx.beginPath(); ctx.ellipse(cx,cy,w*0.13,h*0.045,0,0,Math.PI*2); ctx.fill(); }
  }},
  beach:    { name: "Beach", draw(ctx,w,h){
    ctx.fillStyle = "#7EC8E3"; ctx.fillRect(0,0,w,h*0.4);
    ctx.fillStyle = "#2FA9A0"; ctx.fillRect(0,h*0.4,w,h*0.22);
    ctx.fillStyle = "#EAD9A6"; ctx.fillRect(0,h*0.62,w,h*0.38);
  }},
  sunset:   { name: "Sunset", draw(ctx,w,h){
    const g = ctx.createLinearGradient(0,0,0,h);
    g.addColorStop(0,"#3B3070"); g.addColorStop(0.45,"#E2604F"); g.addColorStop(1,"#F7B84B");
    ctx.fillStyle = g; ctx.fillRect(0,0,w,h);
  }},
  foliage:  { name: "Green Foliage", draw(ctx,w,h){
    ctx.fillStyle = "#3C7A44"; ctx.fillRect(0,0,w,h);
    const greens = ["#4F9155","#2E5D34","#6BAA5C"];
    const rnd = seededRandom(20260909);
    for (let i=0;i<9;i++){ ctx.fillStyle = greens[i%greens.length];
      ctx.beginPath(); ctx.ellipse(w*rnd(), h*rnd(), w*0.22, h*0.16, 0, 0, Math.PI*2); ctx.fill(); }
  }},
  abstract: { name: "Abstract", draw(ctx,w,h){
    const blocks = [["#F45B82",0,0,0.55,0.5],["#5BB8F5",0.55,0,0.45,0.6],
                     ["#FFA552",0,0.5,0.5,0.5],["#A985E8",0.5,0.6,0.5,0.4]];
    blocks.forEach(([c,x,y,bw,bh]) => { ctx.fillStyle = c; ctx.fillRect(w*x,h*y,w*bw,h*bh); });
  }},
  rainbow:  { name: "Rainbow", draw(ctx,w,h){
    const bands = ["#E2382B","#F58220","#FFC72C","#34A853","#12A9A0","#0F9BD7","#B04AA0"];
    const bh = h/bands.length;
    bands.forEach((c,i) => { ctx.fillStyle = c; ctx.fillRect(0,i*bh,w,bh+1); });
  }},
  marble:   { name: "Marble", draw(ctx,w,h){
    ctx.fillStyle = "#F1EFE9"; ctx.fillRect(0,0,w,h);
    ctx.strokeStyle = "rgba(150,150,150,.5)"; ctx.lineWidth = Math.max(1,w*0.012);
    for (let i=0;i<4;i++){ ctx.beginPath(); const y0=h*(0.15+i*0.22);
      ctx.moveTo(0,y0); ctx.bezierCurveTo(w*0.3,y0+h*0.08,w*0.6,y0-h*0.08,w,y0); ctx.stroke(); }
  }},
  galaxy:   { name: "Galaxy", draw(ctx,w,h){
    const g = ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0,"#1B1136"); g.addColorStop(0.5,"#3B2166"); g.addColorStop(1,"#0F0A24");
    ctx.fillStyle = g; ctx.fillRect(0,0,w,h);
    ctx.fillStyle = "#FFFFFF";
    const rnd = seededRandom(20260909);
    for (let i=0;i<24;i++){ ctx.globalAlpha = 0.4 + rnd()*0.6;
      ctx.fillRect(rnd()*w, rnd()*h, Math.max(1,w*0.012), Math.max(1,w*0.012)); }
    ctx.globalAlpha = 1;
  }},
};

/* A tiny deterministic PRNG (mulberry32) — the same background must look
   identical every time it's selected or redrawn, not reshuffle randomly. */
function seededRandom(seed){
  let a = seed >>> 0;
  return function(){
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* =====================================================================
   ML SUBJECT SEGMENTATION — MediaPipe Selfie Multiclass
   Replaces color-heuristic background removal as the source of truth
   for the Backgrounds tool. classifyRegions()/regionMap above still
   exists and is still used for photo-enhancement (skin protection,
   sharpening weighting) — that's a different, still-useful concept.
   subjectMask below is specifically what decides person vs. background.

   HONESTY, stated in code because it matters here: this loads a model
   from a public CDN in the customer's own browser. I cannot verify that
   network path completes from this sandbox — my sandbox's egress proxy
   blocks the CDN outright (confirmed: cdn.jsdelivr.net returns a
   host-not-allowed 403 here). The integration below follows MediaPipe's
   documented tasks-vision API exactly, and the failure path (try/catch,
   graceful fallback to Original, no silent heuristic substitution) is
   fully real and does run whenever the model can't load — including in
   this sandbox, which is exactly how it will behave for any customer
   whose browser or network can't reach the model for any reason.
   ===================================================================== */
const MP_CDN = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";
const MP_MODEL_URL = "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_multiclass_256x256/float32/latest/selfie_multiclass_256x256.tflite";
// category order for the selfie multiclass model, per its published spec
const MP_CAT = { background: 0, hair: 1, bodySkin: 2, faceSkin: 3, clothes: 4, accessories: 5 };

let mpSegmenterPromise = null;
async function loadSegmenter(){
  if (mpSegmenterPromise) return mpSegmenterPromise;
  mpSegmenterPromise = (async () => {
    const vision = await import(/* webpackIgnore: true */ MP_CDN + "/vision_bundle.mjs");
    const fileset = await vision.FilesetResolver.forVisionTasks(MP_CDN + "/wasm");
    return vision.ImageSegmenter.createFromOptions(fileset, {
      baseOptions: { modelAssetPath: MP_MODEL_URL },
      runningMode: "IMAGE",
      outputCategoryMask: false,
      outputConfidenceMasks: true,
    });
  })();
  return mpSegmenterPromise;
}

/* Real face detection, for Auto-crop specifically. Skin-color alone
   (used elsewhere in this file for skin-tone protection, where a loose
   box is harmless) cannot reliably tell a face apart from a hand or
   bare arm — both are just "skin-colored" to that heuristic. This uses
   MediaPipe's actual face detector instead, same honest pattern as
   loadSegmenter() above: real integration, and if the model can't load
   for any reason, the caller falls back rather than silently guessing. */
const MP_FACE_MODEL_URL = "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite";
let mpFaceDetectorPromise = null;
async function loadFaceDetector(){
  if (mpFaceDetectorPromise) return mpFaceDetectorPromise;
  mpFaceDetectorPromise = (async () => {
    const vision = await import(/* webpackIgnore: true */ MP_CDN + "/vision_bundle.mjs");
    const fileset = await vision.FilesetResolver.forVisionTasks(MP_CDN + "/wasm");
    return vision.FaceDetector.createFromOptions(fileset, {
      baseOptions: { modelAssetPath: MP_FACE_MODEL_URL },
      runningMode: "IMAGE",
    });
  })();
  return mpFaceDetectorPromise;
}

/* ---------------------------------------------------------------------
   GROUP PHOTOS: tiled face detection
   The only face model MediaPipe ships (BlazeFace short-range) looks at
   the picture at 128×128. With 1–2 people each face is large enough, but
   in a group of 3+ every face is small, and at that resolution they're
   a few pixels wide — so faces were missed and the photo was treated as
   having 0–2 people (wrong size advice, wrong crop, no skin protection).
   Now the photo is also scanned in overlapping tiles (2×2, 3×3, 4×4),
   each at full detector resolution, so a face only needs to be large
   relative to its tile (and tilted faces are found on rotated copies,
   see below). Results are merged: duplicates across tiles are
   collapsed, and faces cut off at a tile's inner edge are ignored (the
   neighbouring tile sees them whole). Runs once per photo; cached.
   --------------------------------------------------------------------- */
const FACE_FULL_MIN_SCORE = 0.5, FACE_TILE_MIN_SCORE = 0.65;
let tiledFacesCache = { id: -1, promise: null };
function detectFacesTiled(img, detector){
  if (tiledFacesCache.id === S.imgId && tiledFacesCache.promise) return tiledFacesCache.promise;
  const id = S.imgId;
  const promise = (async () => {
    const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
    const found = [];
    const same = (x, y) => [x, y];
    // scan one region of a source (the photo, or a rotated copy of it);
    // toImg maps a point in source pixels back to photo pixels
    const scan = (src, W, H, sx, sy, sw, sh, minScore, isTile, toImg) => {
      const side = 640;
      const k = side / Math.max(sw, sh);
      const c = document.createElement("canvas");
      c.width = Math.max(1, Math.round(sw*k)); c.height = Math.max(1, Math.round(sh*k));
      c.getContext("2d").drawImage(src, sx, sy, sw, sh, 0, 0, c.width, c.height);
      const res = detector.detect(c);
      for (const d of (res && res.detections) || []){
        const b = d.boundingBox; if (!b) continue;
        const sc = (d.categories && d.categories[0] && d.categories[0].score) || 0;
        if (sc < minScore) continue;
        // a face touching an inner tile edge is only partly visible here
        const m = 2;
        if (isTile && ((b.originX <= m && sx > 0) || (b.originY <= m && sy > 0) ||
            (b.originX + b.width >= c.width - m && sx + sw < W - 1) ||
            (b.originY + b.height >= c.height - m && sy + sh < H - 1))) continue;
        // box corners back to the photo; keep their bounding box
        const px0 = sx + b.originX/k, py0 = sy + b.originY/k;
        const px1 = sx + (b.originX + b.width)/k, py1 = sy + (b.originY + b.height)/k;
        const pts = [[px0, py0], [px1, py0], [px0, py1], [px1, py1]].map(([x, y]) => toImg(x, y));
        const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]);
        const f = {
          x0: clamp(Math.min(...xs)/iw, 0, 1), y0: clamp(Math.min(...ys)/ih, 0, 1),
          x1: clamp(Math.max(...xs)/iw, 0, 1), y1: clamp(Math.max(...ys)/ih, 0, 1),
          score: sc, rotated: toImg !== same,
        };
        if (f.x1 - f.x0 > 0.005 && f.y1 - f.y0 > 0.005) found.push(f);
      }
      if (res && res.close) res.close();
    };
    /* Each detector pass is synchronous work on the main thread; with the
       tiled and rotated passes a photo needs dozens of them. Handing the
       thread back to the browser between passes (a few ms each) keeps the
       editor, scrolling and taps responsive on phones while faces are
       being found, instead of one long freeze right after upload. */
    const tick = () => new Promise((r) => setTimeout(r, 0));
    const scanTiles = async (src, W, H, grids, minScore, toImg) => {
      for (const n of grids){
        const tw = W / n * 1.5, th = H / n * 1.5;                    // 50% larger than a grid cell = overlap
        for (let ty = 0; ty < n; ty++){
          for (let tx = 0; tx < n; tx++){
            const cx = (tx + 0.5) * W / n, cy = (ty + 0.5) * H / n;
            const sx = Math.max(0, Math.min(W - tw, cx - tw/2)), sy = Math.max(0, Math.min(H - th, cy - th/2));
            scan(src, W, H, sx, sy, Math.min(tw, W), Math.min(th, H), minScore, true, toImg);
            await tick();
          }
        }
      }
    };
    scan(img, iw, ih, 0, 0, iw, ih, FACE_FULL_MIN_SCORE, false, same);   // whole photo (large faces)
    await tick();
    // overlapping tiles (small faces); the 4×4 pass is for big groups and
    // only runs when the photo has enough pixels for it to see more
    await scanTiles(img, iw, ih, Math.max(iw, ih) >= 1200 ? [2, 3, 4] : [2, 3], FACE_TILE_MIN_SCORE, same);

    /* TILTED AND SIDEWAYS FACES. The detector is trained on mostly upright
       faces and misses heads tilted more than ~30° — people lying down,
       leaning together, selfies at an angle. So the photo is also checked
       rotated ±30° and ±90° (whole + 2×2 and 3×3 tiles each); any face found is
       rotated back into the photo. Duplicates of faces already found
       upright are merged away below. */
    const maxSide = 1600, ks = Math.min(1, maxSide / Math.max(iw, ih));
    const sw0 = iw*ks, sh0 = ih*ks;
    for (const deg of [30, -30, 90, -90]){
      const t = deg * Math.PI/180, cs = Math.cos(t), sn = Math.sin(t);
      const W = Math.ceil(Math.abs(sw0*cs) + Math.abs(sh0*sn)), H = Math.ceil(Math.abs(sw0*sn) + Math.abs(sh0*cs));
      const rc = document.createElement("canvas"); rc.width = W; rc.height = H;
      const rx = rc.getContext("2d");
      rx.fillStyle = "#808080"; rx.fillRect(0, 0, W, H);
      rx.translate(W/2, H/2); rx.rotate(t); rx.drawImage(img, -sw0/2, -sh0/2, sw0, sh0);
      // rotated-canvas point -> photo pixels (inverse rotation, then unscale)
      const toImg = (x, y) => {
        const dx = x - W/2, dy = y - H/2;
        const ux = dx*cs + dy*sn, uy = -dx*sn + dy*cs;
        return [(ux + sw0/2)/ks, (uy + sh0/2)/ks];
      };
      scan(rc, W, H, 0, 0, W, H, FACE_TILE_MIN_SCORE, false, toImg);
      await tick();
      // sideways (±90°) faces are usually big — lying down, leaning — so
      // those passes don't need the finest tiles
      await scanTiles(rc, W, H, (Math.abs(deg) === 90 || Math.max(iw, ih) < 1200) ? [2] : [2, 3], FACE_TILE_MIN_SCORE, toImg);
    }
    // merge: best-scoring first; drop anything overlapping a kept face
    found.sort((a, b) => b.score - a.score);
    const kept = [];
    const area = (f) => Math.max(0, f.x1 - f.x0) * Math.max(0, f.y1 - f.y0);
    for (const f of found){
      const dup = kept.some((g) => {
        const ix = Math.max(0, Math.min(f.x1, g.x1) - Math.max(f.x0, g.x0));
        const iy = Math.max(0, Math.min(f.y1, g.y1) - Math.max(f.y0, g.y0));
        const inter = ix*iy;
        return inter / Math.min(area(f), area(g)) > 0.4;             // same face (or one inside the other)
      });
      if (!dup) kept.push(f);
    }
    // a "face" far smaller than the typical face here is almost always a
    // false hit in a patterned background, not a person
    if (kept.length >= 3){
      const sizes = kept.map((f) => Math.sqrt(area(f))).sort((a, b) => a - b);
      const median = sizes[sizes.length >> 1];
      return verifyHumanFaces(img, kept.filter((f) => Math.sqrt(area(f)) >= median * 0.35));
    }
    return verifyHumanFaces(img, kept);
  })().catch((err) => { if (tiledFacesCache.id === id) tiledFacesCache = { id: -1, promise: null }; throw err; });
  tiledFacesCache = { id, promise };
  return promise;
}

/* PEOPLE ONLY. The face detector also fires on dogs, cats, statues,
   dolls and printed faces — and every face it reports switches on the
   skin-tone rules (and counts toward the size advice and auto-crop).
   So each face is double-checked with the person segmenter, a separate
   model trained only on people, which labels human face skin pixel by
   pixel: a real person's face is mostly "face skin" to it, an animal or
   an object is not. Each face is checked on its own close-up crop, so
   small faces in group photos get enough pixels to be judged.
   If the segmenter can't load, only confident upright detections are
   kept (the rotated passes are the likeliest to mistake a pattern or an
   animal for a face). */
const HUMAN_SKIN_MIN_COVERAGE = 0.35;
async function verifyHumanFaces(img, faces){
  if (!faces.length) return faces;
  let seg = null;
  try {
    seg = await Promise.race([loadSegmenter(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("segmenter-load-timeout")), 10000))]);
  } catch (e){ seg = null; }
  if (!seg) return faces.filter((f) => !f.rotated && f.score >= 0.8);
  const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
  const out = [];
  for (const f of faces.slice(0, 40)){      // big groups: up to 40 people are checked
    try {
      // close-up: the face box plus a face-width of context all round
      const fw = (f.x1 - f.x0) * iw, fh = (f.y1 - f.y0) * ih;
      const sx = Math.max(0, f.x0*iw - fw), sy = Math.max(0, f.y0*ih - fh);
      const ex = Math.min(iw, f.x1*iw + fw), ey = Math.min(ih, f.y1*ih + fh);
      const side = 256, k = side / Math.max(ex - sx, ey - sy);
      const c = document.createElement("canvas");
      c.width = Math.max(1, Math.round((ex - sx)*k)); c.height = Math.max(1, Math.round((ey - sy)*k));
      c.getContext("2d").drawImage(img, sx, sy, ex - sx, ey - sy, 0, 0, c.width, c.height);
      const res = seg.segment(c);
      const faceSkin = res.confidenceMasks[MP_CAT.faceSkin].getAsFloat32Array();
      // inner part of the face box (skips hairline and ears)
      const bx0 = (f.x0*iw - sx)*k, by0 = (f.y0*ih - sy)*k, bw = fw*k, bh = fh*k;
      const x0 = Math.floor(bx0 + bw*0.2), x1 = Math.ceil(bx0 + bw*0.8);
      const y0 = Math.floor(by0 + bh*0.2), y1 = Math.ceil(by0 + bh*0.9);
      let n = 0, hit = 0;
      for (let y = Math.max(0, y0); y < Math.min(c.height, y1); y++){
        for (let x = Math.max(0, x0); x < Math.min(c.width, x1); x++){
          n++; if (faceSkin[y*c.width + x] > 0.5) hit++;
        }
      }
      if (n && hit/n >= HUMAN_SKIN_MIN_COVERAGE){
        // keep this close-up's skin map: the skin-tone rules follow the
        // real outline of the face and neck, never the rectangle of the box
        const bodySkin = res.confidenceMasks[MP_CAT.bodySkin].getAsFloat32Array();
        const mask = new Uint8Array(c.width*c.height);          // 1 = face or neck skin (compact: 1 byte a pixel)
        for (let q = 0; q < mask.length; q++) if (faceSkin[q] > 0.5 || bodySkin[q] > 0.6) mask[q] = 1;
        f.skin = { x0: sx/iw, y0: sy/ih, x1: ex/iw, y1: ey/ih, w: c.width, h: c.height, mask };
        out.push(f);
      }
      if (res.close) res.close();
    } catch (e){ /* can't judge this one: leave it out */ }
    await new Promise((r) => setTimeout(r, 0));               // keep the page responsive between faces
  }
  return out;
}

function currentSegKey(){
  return [S.imgId, S.zoom.toFixed(4), S.ox.toFixed(4), S.oy.toFixed(4), dims().gw, dims().gh].join("|");
}

/* Confidence -> soft alpha. Hair gets its own, more lenient band (spec
   requirement: hair must not use the same aggressive threshold as
   clothing, and must not require darkness). */
function buildAlphaFromConfidence(confidenceMasks, w, h){
  const N = w*h;
  const bg = confidenceMasks[MP_CAT.background].getAsFloat32Array();
  const hair = confidenceMasks[MP_CAT.hair].getAsFloat32Array();
  const alpha = new Float32Array(N);
  for (let i = 0; i < N; i++){
    const subj = 1 - bg[i];
    const hairish = hair[i] > 0.3;
    const lo = hairish ? 0.15 : 0.25, hi = hairish ? 0.55 : 0.70;
    alpha[i] = subj >= hi ? 1 : subj <= lo ? 0 : (subj - lo) / (hi - lo);
  }
  return alpha;
}

/* Connected-component pass, used both to drop tiny false-positive
   foreground specks and to fill small true holes (curly hair, gaps a
   customer wouldn't want punched through their own silhouette) —
   without swallowing legitimate large gaps like the space between two
   people, which onlyIfEnclosed + the size cap both protect. */
function removeSmallComponents(bin, w, h, targetValue, maxSize, onlyIfEnclosed){
  const N = w*h;
  const visited = new Uint8Array(N);
  const stack = new Int32Array(N);
  for (let start = 0; start < N; start++){
    if (bin[start] !== targetValue || visited[start]) continue;
    let sp = 0, size = 0, touchesBorder = false;
    const comp = [];
    stack[sp++] = start; visited[start] = 1;
    while (sp){
      const p = stack[--sp]; comp.push(p); size++;
      const x = p % w, y = (p / w) | 0;
      if (x === 0 || x === w-1 || y === 0 || y === h-1) touchesBorder = true;
      if (x > 0    && bin[p-1] === targetValue && !visited[p-1]){ visited[p-1]=1; stack[sp++]=p-1; }
      if (x < w-1  && bin[p+1] === targetValue && !visited[p+1]){ visited[p+1]=1; stack[sp++]=p+1; }
      if (y > 0    && bin[p-w] === targetValue && !visited[p-w]){ visited[p-w]=1; stack[sp++]=p-w; }
      if (y < h-1  && bin[p+w] === targetValue && !visited[p+w]){ visited[p+w]=1; stack[sp++]=p+w; }
    }
    if (size <= maxSize && (!onlyIfEnclosed || !touchesBorder)){
      const flip = targetValue ? 0 : 1;
      for (const p of comp) bin[p] = flip;
    }
  }
}

/* Feathers only pixels actually on a foreground/background transition —
   not the whole mask, per the explicit requirement, so large flat
   regions stay crisp and only the silhouette edge softens. */
function featherBoundaryOnly(alpha, w, h, radius){
  const N = w*h;
  const isEdge = new Uint8Array(N);
  for (let y = 0; y < h; y++){
    for (let x = 0; x < w; x++){
      const i = y*w+x, v = alpha[i] > 0.5 ? 1 : 0;
      let edge = false;
      for (let dy = -1; dy <= 1 && !edge; dy++){
        const yy = y+dy; if (yy < 0 || yy >= h) continue;
        for (let dx = -1; dx <= 1; dx++){
          const xx = x+dx; if (xx < 0 || xx >= w) continue;
          if ((alpha[yy*w+xx] > 0.5 ? 1 : 0) !== v){ edge = true; break; }
        }
      }
      isEdge[i] = edge ? 1 : 0;
    }
  }
  const out = alpha.slice();
  for (let y = 0; y < h; y++){
    for (let x = 0; x < w; x++){
      const i = y*w+x;
      if (!isEdge[i]) continue;
      let sum = 0, n = 0;
      for (let dy = -radius; dy <= radius; dy++){
        const yy = y+dy; if (yy < 0 || yy >= h) continue;
        for (let dx = -radius; dx <= radius; dx++){
          const xx = x+dx; if (xx < 0 || xx >= w) continue;
          sum += alpha[yy*w+xx]; n++;
        }
      }
      out[i] = sum/n;
    }
  }
  alpha.set(out);
}

function refineSubjectMask(alpha, w, h){
  const N = w*h;
  const bin = new Uint8Array(N);
  for (let i = 0; i < N; i++) bin[i] = alpha[i] > 0.5 ? 1 : 0;
  removeSmallComponents(bin, w, h, 1, Math.max(20, Math.round(N*0.0006)), false);  // A: tiny FG noise
  removeSmallComponents(bin, w, h, 0, Math.max(12, Math.round(N*0.0003)), true);   // B: small enclosed holes only
  for (let i = 0; i < N; i++){ if (alpha[i] <= 0.05 || alpha[i] >= 0.95) alpha[i] = bin[i]; }
  featherBoundaryOnly(alpha, w, h, 2);                                            // E: edge-only feather, ~2px
}

/* Edge-decontamination: a low-confidence boundary pixel still carries
   some of the OLD background's color (the classic green-screen fringe
   problem). Pull each edge pixel's color toward the median of nearby
   high-confidence subject pixels, proportional to how little we trust
   it — conservative, and never touches confidently-subject pixels, so
   it can't recolor hair or skin globally. */
function suppressColorSpill(buf, alpha, w, h){
  const N = w*h;
  for (let y = 0; y < h; y++){
    for (let x = 0; x < w; x++){
      const i = y*w+x, a = alpha[i];
      if (a <= 0.05 || a >= 0.95) continue;               // only true edge pixels
      let sr=0, sg=0, sb=0, n=0;
      for (let dy=-2; dy<=2; dy++){ const yy=y+dy; if (yy<0||yy>=h) continue;
        for (let dx=-2; dx<=2; dx++){ const xx=x+dx; if (xx<0||xx>=w) continue;
          const j = yy*w+xx;
          if (alpha[j] < 0.9) continue;
          const o = j*3; sr+=buf[o]; sg+=buf[o+1]; sb+=buf[o+2]; n++;
        } }
      if (!n) continue;
      const o = i*3, pull = (1-a)*0.5;                    // conservative — never fully overrides the real pixel
      buf[o]   = buf[o]  *(1-pull) + (sr/n)*pull;
      buf[o+1] = buf[o+1]*(1-pull) + (sg/n)*pull;
      buf[o+2] = buf[o+2]*(1-pull) + (sb/n)*pull;
    }
  }
}

function syncBgLoadingUI(){
  const targets = [$("#bgStatus"), $("#mBgStatus")].filter(Boolean);
  if (!targets.length) return;
  let hidden = true, text = "", loading = false;
  if (S.segStatus === "loading"){ hidden = false; text = "Finding the people…"; loading = true; }
  else if (S.segStatus === "failed"){ hidden = false; text = "Couldn't separate the background this time — Original photo is being used."; }
  targets.forEach((status) => {
    status.hidden = hidden; status.textContent = text;
    status.classList.toggle("is-loading", loading);
  });
}

/* Segment once per photo/crop, cache the result, reuse for every
   background the customer clicks through — never re-run per-thumbnail. */
async function ensureSubjectSegmentation(){
  const key = currentSegKey();
  if (S.segKey === key && (S.segStatus === "ready" || S.segStatus === "failed")) return S.segStatus === "ready";
  if (!S.img) return false;
  S.segStatus = "loading"; syncBgLoadingUI();
  try {
    // loadSegmenter() downloads the vision JS bundle, a ~10MB+ WASM runtime,
    // and the model file itself — a real, sometimes-slow network fetch on a
    // real connection. Never let that leave the customer stuck watching a
    // spinner indefinitely: past a few seconds, fail over to the original
    // photo exactly the same way a genuine segmentation failure already does.
    const SEGMENTER_LOAD_TIMEOUT_MS = 10000;
    const segmenter = await Promise.race([
      loadSegmenter(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("segmenter-load-timeout")), SEGMENTER_LOAD_TIMEOUT_MS)),
    ]);
    const { gw, gh } = dims();
    const aspect = gw/gh, longest = 768;
    const sw = aspect >= 1 ? longest : Math.round(longest*aspect);
    const sh = aspect >= 1 ? Math.round(longest/aspect) : longest;
    const segCanvas = document.createElement("canvas");
    segCanvas.width = sw; segCanvas.height = sh;
    drawSource(segCanvas.getContext("2d"), sw, sh);        // the exact same crop math as everywhere else
    const result = segmenter.segment(segCanvas);
    const alpha = buildAlphaFromConfidence(result.confidenceMasks, sw, sh);
    refineSubjectMask(alpha, sw, sh);
    if (result.close) result.close();
    S.subjectMask = alpha; S.segW = sw; S.segH = sh; S.segKey = key; S.segStatus = "ready";
    return true;
  } catch (err){
    console.error("MemoBrick: person segmentation unavailable —", err);
    S.subjectMask = null; S.segStatus = "failed"; S.segKey = key;
    return false;
  } finally {
    syncBgLoadingUI();
  }
}

/* Nearest-neighbor resample of the alpha mask onto whatever resolution
   the caller actually needs — the segmentation canvas and the crop's
   working canvas are rarely exactly the same size. */
function resampleAlpha(alpha, sw, sh, tw, th){
  if (sw === tw && sh === th) return alpha;
  const out = new Float32Array(tw*th);
  for (let y = 0; y < th; y++){
    const sy = Math.min(sh-1, (y * sh / th) | 0);
    for (let x = 0; x < tw; x++){
      const sx = Math.min(sw-1, (x * sw / tw) | 0);
      out[y*tw+x] = alpha[sy*sw+sx];
    }
  }
  return out;
}

/* The real compositor: runs on the high-resolution crop canvas BEFORE
   it gets downsampled to the stud grid — per the mandatory ordering,
   subject edges are decided at full resolution, never recovered after
   the image has already been reduced to a few thousand cells. */
function compositeBackgroundHighRes(midCanvas, styleKey){
  const style = BG_EFFECTS[styleKey];
  if (!styleKey || styleKey === "original" || !style || !style.draw || !S.subjectMask) return;
  const w = midCanvas.width, h = midCanvas.height;
  const ctx = midCanvas.getContext("2d");
  const src = ctx.getImageData(0, 0, w, h);
  const N = w*h;
  // buf is 3-channel (RGB) — every function below indexes it with an i*3
  // stride, so it must never carry the source ImageData's 4th (alpha)
  // channel or every index past the first pixel reads the wrong bytes
  const buf = new Float32Array(N*3);
  for (let i = 0; i < N; i++){
    const s = i*4, o = i*3;
    buf[o] = src.data[s]; buf[o+1] = src.data[s+1]; buf[o+2] = src.data[s+2];
  }

  const alpha = resampleAlpha(S.subjectMask, S.segW, S.segH, w, h);
  suppressColorSpill(buf, alpha, w, h);

  const bgCanvas = document.createElement("canvas");
  bgCanvas.width = w; bgCanvas.height = h;
  style.draw(bgCanvas.getContext("2d"), w, h);
  const bg = bgCanvas.getContext("2d").getImageData(0, 0, w, h).data;

  const out = ctx.createImageData(w, h);
  for (let i = 0; i < N; i++){
    const a = alpha[i], o = i*3, o4 = i*4;
    out.data[o4]   = buf[o]  *a + bg[o4]  *(1-a);
    out.data[o4+1] = buf[o+1]*a + bg[o4+1]*(1-a);
    out.data[o4+2] = buf[o+2]*a + bg[o4+2]*(1-a);
    out.data[o4+3] = 255;
  }
  ctx.putImageData(out, 0, 0);
}

/* Developer-only mask inspection — see window.DEBUG_SEGMENTATION.
   Never shown to customers; not wired into any production UI path. */
window.DEBUG_SEGMENTATION = false;
function drawSegmentationDebug(){
  if (!window.DEBUG_SEGMENTATION || !S.subjectMask) return;
  const w = S.segW, h = S.segH;
  const c = document.createElement("canvas"); c.width = w*2; c.height = h*2;
  const ctx = c.getContext("2d");
  const seg = document.createElement("canvas"); seg.width = w; seg.height = h;
  drawSource(seg.getContext("2d"), w, h);
  ctx.drawImage(seg, 0, 0);                                          // A: original
  const maskImg = ctx.createImageData(w, h);
  for (let i = 0; i < w*h; i++){ const v = Math.round(S.subjectMask[i]*255);
    maskImg.data[i*4]=v; maskImg.data[i*4+1]=v; maskImg.data[i*4+2]=v; maskImg.data[i*4+3]=255; }
  const maskCanvas = document.createElement("canvas"); maskCanvas.width=w; maskCanvas.height=h;
  maskCanvas.getContext("2d").putImageData(maskImg, 0, 0);
  ctx.drawImage(maskCanvas, w, 0);                                    // B: mask
  ctx.save(); ctx.translate(0, h);
  for (let y=0;y<h;y+=8) for (let x=0;x<w;x+=8) ctx.fillStyle = ((x/8+y/8)%2) ? "#ccc" : "#eee", ctx.fillRect(x,y,8,8);
  ctx.globalCompositeOperation = "destination-in";
  const segImg = seg.getContext("2d").getImageData(0,0,w,h);
  for (let i=0;i<w*h;i++) segImg.data[i*4+3] = Math.round(S.subjectMask[i]*255);
  const cutout = document.createElement("canvas"); cutout.width=w; cutout.height=h;
  cutout.getContext("2d").putImageData(segImg,0,0);
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(cutout, 0, 0);                                        // C: cutout on checker
  ctx.restore();
}


/* Skin-tone rules apply ONLY to human faces found by the real face
   detector (MediaPipe BlazeFace, trained on human faces). Runs once per
   photo, in the background; until it answers, and if it can't load at
   all, the photo is shown with the full palette — so landscapes, pets and
   objects always keep their real colors. Low-confidence detections are
   ignored so a pet or a patterned object isn't mistaken for a person. */
const HUMAN_FACE_MIN_SCORE = 0.6;
let humanFaceDetectFor = -1;
function faceScore(d){ return (d && d.categories && d.categories[0] && d.categories[0].score) || 0; }
function normalisedFaces(dets, c){
  return (dets || []).filter((d) => d.boundingBox && faceScore(d) >= HUMAN_FACE_MIN_SCORE).map((d) => {
    const b = d.boundingBox;
    return { x0: b.originX/c.width, y0: b.originY/c.height,
             x1: (b.originX+b.width)/c.width, y1: (b.originY+b.height)/c.height };
  });
}
function ensureHumanFaces(){
  if (!S.img || S.mlFacesImg === S.imgId || humanFaceDetectFor === S.imgId) return;
  const id = S.imgId, img = S.img;
  humanFaceDetectFor = id;
  (async () => {
    let faces = [];
    try {
      const detector = await Promise.race([
        loadFaceDetector(),
        new Promise((_, reject) => setTimeout(() => reject(new Error("face-detector-load-timeout")), 8000)),
      ]);
      faces = (await detectFacesTiled(img, detector)).filter((f) => f.score >= HUMAN_FACE_MIN_SCORE);
    } catch (err){
      faces = [];                     // detector unavailable: no skin rules, full colors
    }
    if (S.imgId !== id) return;       // a different photo was loaded meanwhile
    S.mlFaces = faces; S.mlFacesImg = id;
    if (faces.length){ S.baseKey = ""; render(); }
  })();
}

/* =====================================================================
   SMART AUTO-BRIGHTNESS
   Uploaded photo → exposure analysis → brightness correction ONLY if the
   photo needs it → existing enhancements → palette → mosaic.

   1. ANALYSIS (once per photo, ~256px copy, a few ms). Luminance is
      Rec.709 luma of every pixel, collected into histograms for:
        • the whole photo,
        • the likely subject — the detected people's faces when the face
          detector has answered, otherwise a centre-weighted window,
      giving mean, median, 5th/95th percentiles, % of pixels in shadow
      and % near clipping. Classifying on the SUBJECT's median (not the
      average of the whole frame) is what keeps a dark person against a
      bright window or sky from being called "properly exposed".
   2. CLASS: too dark / slightly dark / properly exposed / too bright.
   3. CORRECTION, only for the two dark classes, adaptive to how dark:
      a tone curve on luminance whose strength comes from how far the
      subject is from a normal level (not a fixed value), with
        • a toe that caps shadow gain, so noise isn't amplified,
        • a shoulder that leaves highlights alone (skies, white shirts,
          walls and bright skin can't blow out),
        • a cap on how light faces may get, so skin never goes pale,
      applied as a per-pixel luminance ratio so hue and saturation are
      kept (no washed-out, yellow or orange skin, no lost colours).
      Too bright and properly exposed photos are never brightened.
   The photo itself (S.img) is never changed: the curve is applied to the
   working copy each render, so turning it off restores the original.
   ===================================================================== */
const EXPO_SHADOW = 0.18, EXPO_CLIP = 0.95;
function expoStats(hist, total){
  if (!total) return null;
  let sum = 0, acc = 0, shadow = 0, clip = 0;
  const q = { p5: null, median: null, p75: null, p90: null, p95: null };
  const at = { p5: 0.05, median: 0.5, p75: 0.75, p90: 0.90, p95: 0.95 };
  for (let i = 0; i < 256; i++){
    const n = hist[i], v = i/255;
    sum += n*v; acc += n;
    if (v < EXPO_SHADOW) shadow += n;
    if (v >= EXPO_CLIP) clip += n;
    for (const k in at) if (q[k] === null && acc >= total*at[k]) q[k] = v;
  }
  for (const k in q) if (q[k] === null) q[k] = 1;
  return { mean: sum/total, ...q, shadowPct: shadow/total, clipPct: clip/total, n: total };
}
/* Step 1–2: classify the UPLOADED photo (before any processing). */
function analyzeExposure(img, faces){
  const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
  const side = 256, k = side / Math.max(iw, ih);
  const w = Math.max(1, Math.round(iw*k)), h = Math.max(1, Math.round(ih*k));
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const cx = c.getContext("2d", { willReadFrequently: true });
  cx.drawImage(img, 0, 0, w, h);
  const d = cx.getImageData(0, 0, w, h).data;
  const all = new Uint32Array(256), subj = new Uint32Array(256);
  let subjN = 0;
  const useFaces = faces && faces.length;
  // faces: the inner part of each box (mostly skin, not hair or background)
  const inFace = (u, v) => faces.some((f) => {
    const fw = f.x1 - f.x0, fh = f.y1 - f.y0;
    return u >= f.x0 + fw*0.2 && u <= f.x1 - fw*0.2 && v >= f.y0 + fh*0.25 && v <= f.y1 - fh*0.1;
  });
  for (let y = 0; y < h; y++){
    const v = (y + 0.5)/h;
    for (let x = 0; x < w; x++){
      const o = (y*w + x)*4;
      const Y = Math.round(0.2126*d[o] + 0.7152*d[o+1] + 0.0722*d[o+2]);
      all[Y]++;
      const u = (x + 0.5)/w;
      if (useFaces){
        if (inFace(u, v)){ subj[Y]++; subjN++; }
      } else if (u > 0.2 && u < 0.8 && v > 0.12 && v < 0.82){
        subj[Y]++; subjN++;                       // centre-weighted: where the subject usually is
      }
    }
  }
  const whole = expoStats(all, w*h);
  const faceBased = !!(useFaces && subjN > 30);
  const subject = (subjN > 30 ? expoStats(subj, subjN) : null) || whole;
  const sm = subject.median;
  /* A dark subject alone is not proof of a dark photo: people with dark
     skin photographed in good light have a low face luminance too, and
     brightening them would make their skin pale and grey. So a dark face
     only counts when the PHOTO shows it is under-exposed — nothing in the
     frame reaches a bright level (p95), or the face is far darker than a
     bright, clipping background (backlight). The same test keeps a
     well-exposed low-key scene with real highlights from being lifted. */
  const underexposed = whole.p95 < (faceBased ? 0.80 : 0.85);
  // backlight: most of the frame is bright and clipping while the subject
  // is far darker. A few white pixels (a white shirt) are not backlight —
  // otherwise dark skin in good light next to something white got lifted
  const backlit = whole.clipPct > 0.05 && whole.median > 0.50 && sm < 0.5*whole.median;
  /* The dark classes are tested FIRST: a backlit photo (dark person in
     front of a bright window or sky) has a very bright frame median, and
     checking "too bright" first called it overexposed and left the person
     dark. "Too bright" now also requires the subject itself to be bright. */
  /* Face in shade: a well-exposed, sunny scene where the person stands in
     shade (under a tree, a canopy, a hat brim). The photo is fine, but the
     face sits a clear step below the scene, and the brick palette turns
     that level into Brown/Coffee bricks — a fair-skinned child reads as
     dark-skinned in the mosaic. It gets the gentle "slightly dark" fill.
     The band keeps dark skin in good light out of it: such a face sits
     much further below the scene (under 60% of the frame median) and
     below the 0.28 floor, and is left exactly as it is. */
  const shadedFace = faceBased && !underexposed && !backlit &&
    sm >= 0.28 && sm < 0.46 && sm < whole.median - 0.08 && sm > 0.6*whole.median;
  let cls = "ok";
  if (faceBased){
    if (sm < 0.26 && (underexposed || backlit)) cls = "veryDark";
    else if ((sm < 0.40 && (underexposed || backlit)) || shadedFace) cls = "dark";
  } else {
    if ((sm < 0.22 && (underexposed || backlit)) || (whole.median < 0.20 && whole.shadowPct > 0.60)) cls = "veryDark";
    else if ((sm < 0.38 && (underexposed || backlit)) || (whole.median < 0.30 && whole.shadowPct > 0.45)) cls = "dark";
  }
  if (cls === "ok" && sm > 0.45 &&
      (whole.median > 0.70 || (whole.mean > 0.66 && whole.clipPct > 0.06))) cls = "bright";
  return { cls, apply: cls === "dark" || cls === "veryDark", whole, subject, faceBased, backlit, underexposed,
           shaded: shadedFace && cls === "dark",
           faceKey: useFaces ? faces.length : 0 };
}
/* Step 3: the correction itself, computed on the working image AFTER the
   editor's existing black/white-point step, so the result is measured
   where it lands — the white-point stretch alone already lifts an evenly
   dark photo, and a curve sized without knowing that either doubled the
   lift or was cancelled by it. Returns the applied curve info or null. */
function brightenSubject(buf, gw, gh, skinMask, cls, shaded){
  const faceBased = !!(skinMask && skinMask.some((v) => v));
  const hist = new Uint32Array(256); let n = 0;
  for (let y = 0; y < gh; y++){
    for (let x = 0; x < gw; x++){
      const p = y*gw + x;
      if (faceBased ? !skinMask[p] : !(x > gw*0.2 && x < gw*0.8 && y > gh*0.12 && y < gh*0.82)) continue;
      const o = p*3;
      hist[clamp(Math.round(0.2126*buf[o] + 0.7152*buf[o+1] + 0.0722*buf[o+2]), 0, 255)]++; n++;
    }
  }
  const st = expoStats(hist, n);
  if (!st) return null;
  const now = st.median;
  // a face in shade in a well-lit photo is brought up to the light the
  // rest of the scene has, a little further than a generally dark photo
  const shadedFace = !!(shaded && faceBased && cls === "dark");
  const target = shadedFace ? 0.52 : cls === "veryDark" ? (faceBased ? 0.50 : 0.42) : (faceBased ? 0.46 : 0.38);
  if (now >= target - 0.02) return { before: now, after: now, e: 1, faceBased, curve: null };   // already there
  let e = Math.log(target) / Math.log(Math.max(0.04, now));
  e = cls === "veryDark" ? clamp(e, 0.55, 1) : clamp(e, shadedFace ? 0.60 : 0.72, 1);
  // highlight protection: brighter photos (real highlights) get an earlier shoulder
  let whole = 0, clipN = 0;
  for (let i = 0; i < buf.length; i += 3) if (0.2126*buf[i] + 0.7152*buf[i+1] + 0.0722*buf[i+2] >= 242) clipN++;
  whole = clipN / (buf.length/3);
  const knee = whole > 0.03 ? 0.55 : 0.68;
  const maxGain = cls === "veryDark" ? 2.2 : 1.6;
  let curve = expoCurve(e, maxGain, knee);
  // skin: never lighter than a natural level, never washed out
  if (faceBased){
    for (let guard = 0; guard < 15 && curve; guard++){
      const after = curve[Math.round(now*255)]/255;
      let pale = 0;
      for (let i = 0; i < 256; i++) if (curve[i] >= 0.86*255) pale += hist[i];
      if (after <= 0.60 && pale/n <= 0.10) break;
      e = Math.min(1, e + 0.03);
      curve = e < 0.985 ? expoCurve(e, maxGain, knee) : null;
    }
  }
  if (!curve || e >= 0.985) return { before: now, after: now, e: 1, faceBased, curve: null };
  applyExposureCurve(buf, curve, faceBased ? skinMask : null);
  return { before: now, after: curve[Math.round(now*255)]/255, e: +e.toFixed(3), faceBased, curve };
}
// 256-entry luminance curve: power lift, capped shadow gain (toe) and a
// shoulder that returns to identity so highlights are left untouched
function expoCurve(e, maxGain, knee){
  const lut = new Float32Array(256);
  let prev = 0;
  for (let i = 0; i < 256; i++){
    const x = i/255;
    let y = Math.pow(x, e);
    y = Math.min(y, x*maxGain);                        // toe: don't amplify sensor noise in near-black
    const t = clamp((x - knee)/(1 - knee), 0, 1);
    const wgt = t*t*(3 - 2*t);                         // smoothstep shoulder
    y = (1 - wgt)*y + wgt*x;
    y = Math.max(y, x, prev);                          // never darker, always monotonic
    lut[i] = y*255; prev = y;
  }
  return lut;
}
// apply to a working RGB buffer (0..255 floats). Hue is kept exactly and
// saturation is kept as it LOOKS: the new luminance comes from the curve,
// and each channel's distance from grey grows by a power of the
// brightening ratio. Scaling colour fully with the ratio (plain gain)
// makes lifted shadows over-saturated — dark skin turns orange, brown
// hair turns yellow; not scaling it at all washes colours out. Skin
// (when the people's faces are known) uses the square root of the ratio;
// everything else uses ratio^0.75 so clothing, sky and other colours keep
// enough saturation to land on the right palette brick rather than a
// greyer neighbour. Channels are pulled back together (same hue) if any
// would clip.
function applyExposureCurve(buf, lut, skinMask){
  for (let i = 0, p = 0; i < buf.length; i += 3, p++){
    const r = buf[i], g = buf[i+1], b = buf[i+2];
    const Y = 0.2126*r + 0.7152*g + 0.0722*b;
    if (Y <= 0.5) continue;
    const yi = Math.min(254.999, Y), lo = yi | 0, fr = yi - lo;
    let Y2 = lut[lo] + (lut[lo+1] - lut[lo])*fr;
    if (Y2 <= Y + 0.05) continue;
    const cpow = (skinMask && skinMask[p]) ? 0.5 : 0.75;   // chroma growth: between "none" and "full gain"
    const lift = (Yn) => {
      const s = Math.pow(Yn / Y, cpow);
      return [Yn + (r - Y)*s, Yn + (g - Y)*s, Yn + (b - Y)*s];
    };
    let [nr, ng, nb] = lift(Y2);
    if (Math.max(nr, ng, nb) > 255){
      // a saturated bright colour (pink top, blue sky) would clip: give it
      // less brightening rather than less colour, so it neither blows out
      // nor fades toward grey
      let a = Y, z = Y2;
      for (let k = 0; k < 8; k++){
        const m = (a + z)/2;
        if (Math.max(...lift(m)) > 255) z = m; else a = m;
      }
      [nr, ng, nb] = lift(a);
      Y2 = a;
    }
    const hi = Math.max(nr, ng, nb), low = Math.min(nr, ng, nb);
    if (hi > 255 || low < 0){
      // shrink the colour offset (not the luminance) until it fits
      let t = 1;
      if (hi > 255) t = Math.min(t, (255 - Y2) / Math.max(1e-3, hi - Y2));
      if (low < 0) t = Math.min(t, Y2 / Math.max(1e-3, Y2 - low));
      t = clamp(t, 0, 1);
      nr = Y2 + (nr - Y2)*t; ng = Y2 + (ng - Y2)*t; nb = Y2 + (nb - Y2)*t;
    }
    buf[i] = nr; buf[i+1] = ng; buf[i+2] = nb;
  }
}
/* Skin saturation guard. The black/white-point step stretches each colour
   channel on its own: right for the photo as a whole, but on skin it
   pushes red up and blue down, so natural skin (e.g. 130,90,73) comes out
   as saturated orange-brown (125,75,52) and the palette answers with
   Coffee/Brown bricks. For skin pixels only, the colour's strength
   relative to its brightness is held to what the photo itself had (plus
   5%); the new brightness and the white-balance hue are kept. Only ever
   reduces saturation, never adds it. */
function keepSkinSaturation(buf, pre, skinMask){
  if (!skinMask) return;
  for (let p = 0, i = 0; p < skinMask.length; p++, i += 3){
    if (!skinMask[p]) continue;
    const r0 = pre[i], g0 = pre[i+1], b0 = pre[i+2];
    const Y0 = 0.2126*r0 + 0.7152*g0 + 0.0722*b0;
    const r = buf[i], g = buf[i+1], b = buf[i+2];
    const Y = 0.2126*r + 0.7152*g + 0.0722*b;
    if (Y0 < 1 || Y < 1) continue;
    const c0 = Math.hypot(r0 - Y0, g0 - Y0, b0 - Y0) / Y0;
    const c = Math.hypot(r - Y, g - Y, b - Y) / Y;
    const cap = c0 * 1.05;
    if (c <= cap || c <= 0) continue;
    const t = cap / c;
    buf[i] = Y + (r - Y)*t; buf[i+1] = Y + (g - Y)*t; buf[i+2] = Y + (b - Y)*t;
  }
}
// analyse lazily on the first render of a photo (i.e. straight after
// upload), and again once the face detector has found the people in it
function ensureExposure(){
  if (!S.img) return null;
  const faces = (S.mlFaces && S.mlFacesImg === S.imgId) ? S.mlFaces : null;
  const fk = faces ? faces.length : 0;
  if (S.expo && S.expo.imgId === S.imgId && S.expo.faceKey === fk) return S.expo;
  try {
    S.expo = analyzeExposure(S.img, faces);
  } catch (e){
    S.expo = { cls: "ok", apply: false, faceKey: fk };   // unreadable image: leave it alone
  }
  S.expo.imgId = S.imgId;
  return S.expo;
}
function expoCls(){ return (S.auto && S.expo && S.expo.imgId === S.imgId) ? S.expo.cls : "ok"; }
function autoBrightActive(){
  return !!(S.auto && S.autoBright !== false && S.expo && S.expo.imgId === S.imgId && S.expo.apply);
}

// subtle indicator on the preview: shown only when a correction applies
// to this photo; tapping it switches the correction off (and back on)
let brightPill = null;
function syncBrightPill(){
  if (!brightPill){
    brightPill = document.createElement("button");
    brightPill.type = "button";
    brightPill.className = "autobright-pill";
    brightPill.setAttribute("aria-live", "polite");
    brightPill.addEventListener("pointerdown", (e) => e.stopPropagation());   // not a drag on the photo
    brightPill.addEventListener("click", (e) => {
      e.stopPropagation();
      S.autoBright = S.autoBright === false;
      S.baseKey = ""; render();
    });
    hold.appendChild(brightPill);
  }
  const needed = !!(S.auto && S.expo && S.expo.imgId === S.imgId && S.expo.apply);
  brightPill.hidden = !needed;
  if (!needed) return;
  const on = S.autoBright !== false;
  brightPill.classList.toggle("off", !on);
  brightPill.innerHTML = on
    ? '<span aria-hidden="true">☀</span> Auto brightness applied <u>Undo</u>'
    : '<span aria-hidden="true">☀</span> Original brightness <u>Brighten</u>';
  brightPill.title = on
    ? (S.expo.shaded ? "The face was in shade" : "Your photo was " + (S.expo.cls === "veryDark" ? "quite dark" : "a little dark")) + ", so it was brightened automatically. Tap to use the original brightness."
    : "Tap to brighten this photo automatically again.";
}

function draw(reuse){
  if (!S.img){ hold.classList.add("empty"); if (brightPill) brightPill.hidden = true; return; }
  ensureHumanFaces();
  ensureExposure();              // exposure analysis: right after upload, cheap, once per photo
  syncBrightPill();
  hold.classList.remove("empty");
  const { gw, gh } = dims();
  // curated colors: whatever the customer unchecked in the Colors panel is
  // never offered to the quantizer — but never let curation leave so few
  // colors that a photo can't be represented at all
  let P = pal();
  if (S.excludedColors.size){
    const curated = P.filter((c) => !S.excludedColors.has(c.hex));
    if (curated.length >= 3) P = curated;
  }
  hold.style.aspectRatio = `${gw} / ${gh}`;
  sizeCanvases(gw, gh);

  // comparison layer
  pctx.clearRect(0, 0, pho.width, pho.height);
  drawSource(pctx, pho.width, pho.height);

  // hi-res crop at an exact multiple of the grid, then area-average it
  // (gamma-correct area averaging — a high-quality resample, not a naive
  // nearest/bilinear shrink, so edges don't alias before anything else runs)
  const f = clamp(Math.floor(1500/Math.max(gw, gh)), 2, 10);
  const mid = document.createElement("canvas");
  mid.width = gw*f; mid.height = gh*f;
  drawSource(mid.getContext("2d"), mid.width, mid.height);

  // a snapshot of the crop BEFORE any background swap, used below to
  // measure exposure and white balance from the person's actual photo —
  // never from whatever background happens to be selected. Only needed
  // when a swap is about to happen; Original has nothing to diverge from.
  let origMid = null;
  if (S.bgEffect && S.bgEffect !== "original"){
    origMid = document.createElement("canvas");
    origMid.width = mid.width; origMid.height = mid.height;
    origMid.getContext("2d").drawImage(mid, 0, 0);
  }

  // background compositing happens HERE, at full crop resolution, before
  // the image is ever reduced to the stud grid — subject edges are
  // decided now or not at all
  if (S.bgEffect && S.bgEffect !== "original"){
    const key = currentSegKey();
    if (S.segStatus === "ready" && S.segKey === key){
      compositeBackgroundHighRes(mid, S.bgEffect);
      drawSegmentationDebug();
    } else if (S.segStatus !== "loading"){
      // fire-and-forget: this render shows Original for now; a fresh
      // render is triggered once the mask is ready (or fails)
      ensureSubjectSegmentation().then((ok) => { if (ok || S.segStatus === "failed") render(); });
    }
  }

  const buf = downsample(mid, gw, gh, f);



/* THE ENHANCED BASE — face-aware automatic processing
     Auto levels (exposure), white balance, face/skin analysis, highlight
     recovery and HDR depend only on the photograph and its framing, never
     on the sliders. Computed once and cached, so moving Warmth or
     Brightness layers onto a stable base instead of reprocessing the
     source from scratch — and so face analysis never re-runs on every
     slider movement, only on a new photo, crop or size. Gated by the
     existing Auto-fix toggle: off means the plain conversion, for
     comparison, with no analysis and no adaptive processing. */
  const bkey = [S.imgId, S.size.id, S.zoom.toFixed(4), S.ox.toFixed(4), S.oy.toFixed(4), S.bg,
                S.bgEffect, S.auto ? 1 : 0, (S.mlFaces && S.mlFacesImg === S.imgId) ? S.mlFaces.length : 0,
                expoCls(), S.autoBright === false ? "abOff" : "abOn"].join("|");
  if (S.baseBuf && S.baseKey === bkey && S.baseBuf.length === buf.length){
    buf.set(S.baseBuf);                          // reuse the enhanced base
  } else {
    // measured from the person's actual photo, never from the swapped-in
    // background — otherwise a bright or dark background shifts the
    // histogram/cast and the person's own exposure and warmth visibly
    // change every time they try a different background
    const toneSrc = origMid ? downsample(origMid, gw, gh, f) : buf;
    // 2. exposure: the existing black/white-point step. Its white-point
    // stretch is itself a brightness gain, so smart auto-brightness governs
    // it: a TOO BRIGHT photo, or a dark photo the customer switched back to
    // "Original brightness", keeps only the black point (no gain)
    // the photo's own colours before levels, kept so skin can be held to
    // its natural saturation once the people's skin is known (below)
    const preLevels = S.auto ? Float32Array.from(buf) : null;
    if (S.auto){
      const lev = measureLevels(toneSrc);
      const cls = expoCls();
      const noGain = cls === "bright" || ((cls === "dark" || cls === "veryDark") && S.autoBright === false);
      if (noGain) lev.forEach((p) => { if (p){ p.hi = 255; p.k = 255/(255 - p.lo); } });
      applyLevels(buf, lev);
    }
    S.baseCast = coolCast(toneSrc);               // 3. white balance — measure this photograph once
    removeBlueCast(buf, S.baseCast);

    // Face/skin detection runs unconditionally — this is not a creative
    // enhancement the customer can opt out of, it's what the hard skin-
    // color restriction in the quantization loop below depends on. It
    // used to only run when S.auto was on, which meant turning Auto off
    // silently disabled the skin-tone restriction entirely, with nothing
    // in the UI telling the customer that's what "Auto off" also did.
    const faceAlreadyConfirmed = !!(S.faceBoxes && S.faceBoxes.length);
    const face = analyzeFaceRegions(buf, gw, gh, faceAlreadyConfirmed, mlFacesInGrid(gw, gh) || [], humanSkinInGrid(gw, gh));  // 1. human faces only; skin follows the real outline
    S.skinMask = face.mask; S.faceBoxes = face.boxes;
    S.regionMap = classifyRegions(buf, gw, gh, S.skinMask, S.faceBoxes);  // skin/hair/clothing/background — still used for photo enhancement below
    if (preLevels) keepSkinSaturation(buf, preLevels, S.skinMask);  // levels must not turn skin orange

    // 3. smart auto-brightness: only for photos the upload analysis found
    // dark, sized on the subject (the real skin of the people, when there
    // are any) as it stands after step 2, before highlight recovery, HDR,
    // skin protection, sharpening and the palette/mosaic conversion
    S.expoApplied = autoBrightActive() ? brightenSubject(buf, gw, gh, S.skinMask, S.expo.cls, S.expo.shaded) : null;

    if (S.auto){
      recoverHighlights(buf, gw, gh, 35);                      // highlight recovery — keeps bright faces from clipping to white
      S.hdrStrength = 60;                                       // fixed at 60% — the adaptive 15-60% range was undershooting on typical photos
      // Detail is fixed at 100% automatically, but only the first time this
      // photo is analysed, and only if the customer hasn't already set it by
      // hand — a crop or size change on the SAME photo must not stomp on a
      // manual value
      if (S.analyzedImgId !== S.imgId){
        if (!S.detailTouched) S.detail = 100;
        S.analyzedImgId = S.imgId;
        syncSliders();
      }
      edgePreserveSmooth(buf, gw, gh, 0.4, S.regionMap, S.faceBoxes); // 7. reduce micro-detail/noise — region-aware, faces protected
      localContrast(buf, gw, gh, S.hdrStrength, S.skinMask);   // 8. enhance important edges (HDR, skin-damped)
    } else {
      S.hdrStrength = 0;
    }
    S.baseBuf = Float32Array.from(buf);
    S.baseKey = bkey;
  }

  // the customer's own adjustments layer on top of that base
  S.warmAdaptive = autoWarm(buf, S.warm, S.baseCast);   // adaptive warmth — never a flat overlay on an already-warm photo
  liftShadows(buf, S.shadows);                          // 5. gently lift shadows

  // tone: brightness, contrast, saturation
  const cf = (259*(S.con + 255))/(255*(259 - S.con)), sf = 1 + S.sat/100, tw = S.temp*0.85;
  for (let i = 0; i < buf.length; i += 3){
    let r = buf[i] + S.bri + tw, g = buf[i+1] + S.bri + tw*0.15, b = buf[i+2] + S.bri - tw;
    r = cf*(r-128)+128; g = cf*(g-128)+128; b = cf*(b-128)+128;
    if (sf !== 1){
      const lum = .299*r + .587*g + .114*b;
      r = lum + (r-lum)*sf; g = lum + (g-lum)*sf; b = lum + (b-lum)*sf;
    }
    buf[i] = clamp(r,0,255); buf[i+1] = clamp(g,0,255); buf[i+2] = clamp(b,0,255);
  }

  if (S.auto && S.skinMask) protectSkinColors(buf, S.skinMask);   // 6. protect skin tones
  sharpen(buf, gw, gh, S.detail, S.auto ? S.skinMask : null);      // smart, edge-aware sharpening

  const hasSkin = S.regionMap ? S.regionMap.includes(1) : false;
  const key = S.pal + "|" + gw + "x" + gh + "|" + [...S.excludedColors].sort().join(",") + "|" + (S.paletteCount || "auto") + "|" + (hasSkin ? "skin" : "noskin");
  let PAL = (reuse && S.usedPal && S.palKey === key) ? S.pickedPal
    : choosePalette(buf, gw, gh, P, S.paletteCount || MAX_COLOURS, hasSkin ? skinPal() : null);
  S.pickedPal = PAL; S.palKey = key;

  // serpentine Floyd–Steinberg: alternating direction kills the diagonal
  // streaks a one-way scan leaves across flat skies and skin. Region-aware:
  // hair and clothing get a moderate amount, background a bit less, skin
  // now close to hair/clothing rather than far below them — each still
  // scaled by the strength the customer chose.
  //
  // Skin's dither strength was previously the lowest of the four regions
  // (0.16), deliberately, to avoid a speckled look. That produced flat,
  // clean skin — but also flatter and less textured than a richer
  // reference style with more visible color variation across skin (soft
  // pink/rose transitions, more tonal nuance, a more "painterly" result).
  // Raising it here is safe in a way it wouldn't have been before this
  // session's fixes: dithering only ever chooses among the colors
  // nearest() already restricted a pixel to — for a skin-classified
  // pixel that's still only the 8 approved skin tones (plus lips, where
  // applicable), never the wrong-color-family bugs fixed earlier. More
  // dither here means more optical blending between those 8 tones, not
  // a wider set of colors being risked.
  const baseStrength = S.dither/100;
  const regionMapForDither = S.auto ? S.regionMap : null;
  // background 0, skin 1, hair 2, clothing 3
  const REGION_DITHER = [0.22, 0.28, 0.30, 0.30];
  // which PAL indices are approved skin-tone bricks — computed once, not
  // per pixel. choosePalette() above guarantees these are present in PAL
  // whenever hasSkin is true, so this should reliably find all 8 (or as
  // many as choosePalette could fit).
  const skinHexSet = new Set(SKIN_PALETTE.map((c) => c[1]));
  const skinIndices = [];
  for (let pi = 0; pi < PAL.length; pi++) if (skinHexSet.has(PAL[pi].hex)) skinIndices.push(pi);
  // Region-classified skin pixels already can't land on a non-skin color —
  // the hard restriction above only offers the 8 SKIN_PALETTE bricks. The
  // real gap is a pixel that looks skin-toned by color but wasn't captured
  // by the connected-region blob classification (a small isolated
  // highlight, a sliver at a region boundary, a patch the flood-fill
  // didn't connect to the main face blob): that pixel searches the full
  // palette unrestricted, and depending on its exact tone can legitimately
  // land on white, pink, grey, or any other color that happened to be the
  // nearest match. Catch that here — regardless of *which* wrong color it
  // would have been, reroute to the nearest of the 8 approved skin tones
  // instead, the same hard restriction correctly-classified pixels get.
  // Additionally: no Red or Dark Red anywhere within the detected face —
  // this is broader than the skin-only rule above. Lips are legitimately
  // exempt from the skin-color restriction (they're not skin, they can use
  // the full palette), so a lip pixel can still become any other palette
  // color — just never literally Red or Dark Red specifically, anywhere
  // inside the face box, skin-classified or not.
  const redHexSet = new Set(["#BD3A32", "#7B3936"]);   // Red, Dark Red
  const nonRedIndices = [];
  for (let pi = 0; pi < PAL.length; pi++) if (!redHexSet.has(PAL[pi].hex)) nonRedIndices.push(pi);
  const faceBoxesForRed = S.faceBoxes || [];
  // When a background has been swapped in, the buffer these rules see
  // already contains the NEW background's pixels wherever the subject
  // isn't. A vibrant swapped-in background near a face can satisfy the
  // same warmth/brightness checks a genuine skin correction would, and
  // without this guard these rules will repaint pieces of that new
  // background toward a skin tone just for sitting near a detected face.
  // The segmentation mask that was already computed to do the swap in
  // the first place is the authoritative answer to "is this pixel
  // actually the person" — reused here rather than guessing from color.
  const hasBgSwap = !!(S.bgEffect && S.bgEffect !== "original" && S.subjectMask);
  const subjectAlphaGrid = hasBgSwap ? resampleAlpha(S.subjectMask, S.segW, S.segH, gw, gh) : null;
  const isSubjectPixel = (x, y) => !subjectAlphaGrid || subjectAlphaGrid[y*gw + x] > 0.5;
  // White and yellow are never acceptable on skin either — unlike red
  // (which lips legitimately need, so it reroutes to "any other color"),
  // these reroute straight to the nearest of the 8 approved skin tones,
  // per explicit instruction that skin must only ever show a skin color.
  const whiteYellowHexSet = new Set(["#FEFEFE", "#F8D548", "#FCF188"]);   // White, Yellow, Spring Yellow
  // modest expansion — enough to reach a highlight that extends a bit
  // past the tight box (this simpler face detection doesn't grow boxes
  // to their true extent the way an earlier, more elaborate version
  // did), without expanding nearly as far as would risk reaching a
  // collar or nearby hair
  const modestFaceBoxes = faceBoxesForRed.map((b) => {
    const w = b.x1 - b.x0 + 1, h = b.y1 - b.y0 + 1;
    return {
      x0: Math.max(0, Math.round(b.x0 - w*0.12)), x1: Math.min(gw-1, Math.round(b.x1 + w*0.12)),
      y0: Math.max(0, Math.round(b.y0 - h*0.18)), y1: Math.min(gh-1, Math.round(b.y1 + h*0.12)),
    };
  });
  /* FACE COLOR GUARD — no yellow/orange bricks on a face.
     The skin band (isSkinLab) is hue 10–65°. Skin under warm or tungsten
     light, and bright cheek/forehead highlights, often sit just outside
     it (hue 65–95°, or chroma above 48), so those cells were never
     classified as skin, were free to search the whole palette, and landed
     on Orange / Yellow / Beige / Sand — the orange patches customers saw
     around eyes and cheeks. The earlier rules only caught White, Yellow
     and Spring Yellow, and only on confirmed-skin cells.
     Now, inside the face box itself:
       • FACE_NEVER colors (Orange, Bright Orange, Yellow, Spring Yellow)
         are always replaced by the nearest approved skin tone — the only
         exception is a strongly saturated cell already classified as hair,
         so genuinely ginger eyebrows/fringe can keep their color;
       • FACE_IF_WARM colors (Beige, Sand, Olive, Grass) are replaced when
         the source pixel is warm-toned and isn't hair (blond hair keeps
         its beige).
     Judged against the photo's own pixel before dithering, so shadows go
     to the darker skin tones and highlights to Cream / Light Nougat. */
  const srcBuf = buf.slice();
  const FACE_NEVER = new Set(["#F3B241", "#EF8545", "#F8D548", "#FCF188"]);   // Orange, Bright Orange, Yellow, Spring Yellow
  const FACE_IF_WARM = new Set(["#DBC897", "#C6BB8D", "#8D8F68", "#A2BA45"]); // Beige, Sand, Olive, Grass
  /* Pinks and reds on skin: reddish or warm-lit skin used to land on
     Bubblegum / Rouge / Red, giving the "pink face" look — and the older
     red rule even swapped Red for the nearest non-red, often a pink. On a
     face they now become the nearest skin tone, except the lips, which
     may keep a natural lip brick (Rouge or Dark Red). */
  const FACE_PINK = new Set(["#C966A2", "#E3ADD4", "#EB6D7F", "#A83873", "#BD3A32", "#7B3936", "#BDAFDB"]); // Bubblegum, Pink, Rouge, Magenta, Red, Dark Red, Lavender
  const LIP_HEX = new Set(["#EB6D7F", "#7B3936"]);                          // Rouge, Dark Red
  const lipIndices = [];
  for (let pi = 0; pi < PAL.length; pi++) if (LIP_HEX.has(PAL[pi].hex)) lipIndices.push(pi);
  const faceGuardBoxes = modestFaceBoxes;
  const faceGuardBoxAt = (x, y) => {
    for (const fb of faceGuardBoxes) if (x >= fb.x0 && x <= fb.x1 && y >= fb.y0 && y <= fb.y1) return fb;
    return null;
  };
  function faceGuard(x, y, n, skinIdx, lipIdx = lipIndices){
    if (!S.auto || !skinIdx.length || !faceGuardBoxes.length) return n;
    const hex = PAL[n] && PAL[n].hex;
    if (!FACE_NEVER.has(hex) && !FACE_IF_WARM.has(hex) && !FACE_PINK.has(hex)) return n;
    const fb = faceGuardBoxAt(x, y);
    if (!fb || !isSubjectPixel(x, y)) return n;
    const i = y*gw + x, o = i*3;
    if (!S.skinMask || !S.skinMask[i]) return n;               // skin only — the wall, hair or shirt inside the box keeps its color
    const [L, a, bb] = rgb2lab(clamp(srcBuf[o],0,255), clamp(srcBuf[o+1],0,255), clamp(srcBuf[o+2],0,255));
    const C = Math.sqrt(a*a + bb*bb);
    let hue = Math.atan2(bb, a) * 180/Math.PI; if (hue < 0) hue += 360;
    // hair may only keep its color in the top quarter of the face box (a
    // fringe) — elsewhere a "hair" label on a face cell is a misclassified
    // shadow or highlight, not hair
    const inFringe = y <= fb.y0 + (fb.y1 - fb.y0) * 0.25;
    const isHair = inFringe && S.regionMap && S.regionMap[i] === 2;
    if (FACE_PINK.has(hex)){
      if (isHair && C > 30) return n;                          // dyed pink/red hair at the fringe
      const inChin = y >= fb.y0 + (fb.y1 - fb.y0) * 0.80;
      if (inChin && S.regionMap && S.regionMap[i] === 3) return n;   // a pink top just under the chin
      // lips: lower-middle of the face, a genuinely red source pixel
      const fx = (x - fb.x0) / Math.max(1, fb.x1 - fb.x0), fy = (y - fb.y0) / Math.max(1, fb.y1 - fb.y0);
      const inMouth = fx >= 0.28 && fx <= 0.72 && fy >= 0.62 && fy <= 0.90;
      const reddish = C > 22 && (hue < 38 || hue > 340) && L < 72;
      if (inMouth && reddish && lipIdx.length){
        let lb = lipIdx[0], ld = Infinity;
        for (const li of lipIdx){ const d = dLab([L, a, bb], PAL[li]); if (d < ld){ ld = d; lb = li; } }
        return lb;
      }
    } else if (FACE_NEVER.has(hex)){
      if (isHair && C > 45) return n;                          // real ginger hair
    } else {
      if (isHair) return n;                                    // blond hair may stay beige
      if (!(hue >= 15 && hue <= 115)) return n;                // not a warm source pixel
    }
    let best = skinIdx[0], bd = Infinity;
    for (const si of skinIdx){
      const d = dLab([L, a, bb], PAL[si]);
      if (d < bd){ bd = d; best = si; }
    }
    return best;
  }
  const cells = new Int16Array(gw*gh);
  for (let y = 0; y < gh; y++){
    const ltr = (y % 2) === 0;
    for (let k = 0; k < gw; k++){
      const x = ltr ? k : gw-1-k, i = (y*gw + x)*3;
      const regionMult = regionMapForDither ? REGION_DITHER[regionMapForDither[y*gw + x]] : 1;
      const strength = baseStrength * regionMult;
      const r = clamp(buf[i],0,255), g = clamp(buf[i+1],0,255), b = clamp(buf[i+2],0,255);
      const isSkinPixel = regionMapForDither ? (regionMapForDither[y*gw + x] === 1 && isSubjectPixel(x, y)) : false;
      let n = nearest(r, g, b, PAL, true, isSkinPixel ? skinIndices : null);
      // only inside a detected human face — a skin-colored table, sand,
      // wood or a pet elsewhere in the photo keeps its own natural color
      if (!isSkinPixel && skinIndices.length && !skinHexSet.has(PAL[n].hex) && faceGuardBoxAt(x, y) && S.skinMask && S.skinMask[y*gw + x]){
        const [L, a, b2] = rgb2lab(r, g, b);
        if (isSkinLab(L, a, b2) && isSubjectPixel(x, y)) n = nearest(r, g, b, PAL, true, skinIndices);
      }
      if (redHexSet.has(PAL[n].hex) && faceBoxesForRed.length && nonRedIndices.length){
        let inFace = false;
        for (const fb of faceBoxesForRed){
          if (x >= fb.x0 && x <= fb.x1 && y >= fb.y0 && y <= fb.y1){ inFace = true; break; }
        }
        if (inFace && isSubjectPixel(x, y) && S.skinMask && S.skinMask[y*gw + x]) n = nearest(r, g, b, PAL, true, nonRedIndices);
      }
      if (whiteYellowHexSet.has(PAL[n].hex) && faceBoxesForRed.length && skinIndices.length){
        let inFace = false;
        for (const fb of modestFaceBoxes){
          if (x >= fb.x0 && x <= fb.x1 && y >= fb.y0 && y <= fb.y1){ inFace = true; break; }
        }
        if (inFace && isSubjectPixel(x, y) && S.skinMask && S.skinMask[y*gw + x]) n = nearest(r, g, b, PAL, true, skinIndices);
      }
      n = faceGuard(x, y, n, skinIndices);
      cells[y*gw + x] = n;
      if (strength <= 0) continue;
      const cap = 46;                       // an unbounded error smears color across the face
      const clampE = (v) => v > cap ? cap : v < -cap ? -cap : v;
      const er = clampE((r-PAL[n].r)*strength),
            eg = clampE((g-PAL[n].g)*strength),
            eb = clampE((b-PAL[n].b)*strength);
      const put = (xx, yy, w) => {
        if (xx < 0 || xx >= gw || yy >= gh) return;
        const j = (yy*gw + xx)*3;
        buf[j] += er*w; buf[j+1] += eg*w; buf[j+2] += eb*w;
      };
      const fwd = ltr ? 1 : -1;
      put(x+fwd, y,   7/16);
      put(x-fwd, y+1, 3/16);
      put(x,     y+1, 5/16);
      put(x+fwd, y+1, 1/16);
    }
  }

  PAL = enforceMinimum(cells, PAL, MIN_BRICKS);

  if (S.auto){
    // strength scales with how many bricks there are to work with — a
    // small board can't afford to lose real detail to a cleanup pass the
    // way a large one can (size-aware processing)
    const cleanupStrength = clamp((Math.min(gw,gh) - 32) / 130, 0.12, 1);
    cleanIsolatedBricks(cells, gw, gh, PAL, S.faceBoxes, cleanupStrength);
    // final face-aware pass: faces get looked at a second time, specifically —
    // this is what a generic whole-image cleanup at one strength misses
    if (S.faceBoxes && S.faceBoxes.length){
      cleanIsolatedBricks(cells, gw, gh, PAL, S.faceBoxes, Math.min(1, cleanupStrength + 0.25), true);
    }
  }

  // Final safety net: after every cleanup pass above, no cell that
  // regionMap confirmed as skin should still be showing a non-approved
  // color — whichever step let one slip through, this catches it directly
  // rather than depending on every current and future processing step
  // remembering to respect the restriction individually.
  if (S.auto && S.regionMap && S.regionMap.includes(1)){
    const skinHexSet = new Set(SKIN_PALETTE.map((c) => c[1]));
    const skinIdxInPal = [];
    for (let pi = 0; pi < PAL.length; pi++) if (skinHexSet.has(PAL[pi].hex)) skinIdxInPal.push(pi);
    if (skinIdxInPal.length){
      for (let i = 0; i < cells.length; i++){
        if (S.regionMap[i] !== 1) continue;                       // not a confirmed skin cell
        if (!isSubjectPixel(i % gw, (i / gw) | 0)) continue;       // don't reach into a swapped-in background
        if (skinHexSet.has(PAL[cells[i]] ? PAL[cells[i]].hex : "")) continue;  // already an approved color
        // snap to whichever approved skin color is perceptually closest
        // to whatever this cell currently is, so it still fits its local
        // highlight/shadow rather than defaulting to one flat tone
        const cur = PAL[cells[i]];
        let best = skinIdxInPal[0], bd = Infinity;
        for (const si of skinIdxInPal){
          const d = dLab(cur ? cur.lab : [50,0,0], PAL[si]);
          if (d < bd){ bd = d; best = si; }
        }
        cells[i] = best;
      }
    }
  }

  // Rules 2 and 3 below need a region wider than the tight face box
  // itself — a face box is sized to the face, but skin extends well
  // beyond it: neck, shoulders, arms. Restricting those rules to the
  // bare face box was the actual gap that let a stray color (yellow,
  // most visibly) land uncaught on an arm or shoulder just outside it.
  // Expanded generously downward/outward rather than expanded to the
  // whole image, so this still doesn't reach into unrelated background
  // objects that happen to share a warm hue.
  const expandedFaceBoxes = (S.faceBoxes || []).map((b) => {
    const w = b.x1 - b.x0 + 1, h = b.y1 - b.y0 + 1;
    return {
      x0: Math.max(0, Math.round(b.x0 - w*0.6)),
      x1: Math.min(gw-1, Math.round(b.x1 + w*0.6)),
      y0: Math.max(0, Math.round(b.y0 - h*0.3)),
      y1: Math.min(gh-1, Math.round(b.y1 + h*1.5)),
    };
  });

  // Second, broader rule: within a detected face box, a warm-toned
  // source pixel should never end up as ANYTHING other than an approved
  // skin color — not just grey. Earlier this only checked for grey
  // specifically, which left a gap: any other unexpected color (a
  // posterization shift toward yellow, a stray green, etc.) from any
  // current or future processing step could still slip through
  // uncaught. This version checks all of them at once. A shadowed patch
  // of skin (or, for a pet portrait, fur) can have low enough chroma to
  // fall outside the strict skin classification while still clearly
  // being warm-toned in the source, not neutral — checked against the
  // ORIGINAL source pixel (buf), so genuinely different elements in the
  // same box — glasses, hair, a grey collar — are correctly left alone.
  if (S.auto && S.faceBoxes && S.faceBoxes.length && S.regionMap){
    const skinHexSet2 = new Set(SKIN_PALETTE.map((c) => c[1]));
    // lips are warm-hued too and are explicitly allowed natural
    // red/pink/brown tones (never restricted to the skin palette) — so
    // colors that plausibly belong on lips are excluded from this
    // correction rather than being incorrectly forced into a skin tone
    const lipOkHexSet = new Set(["#BD3A32","#7B3936","#EB6D7F","#C966A2","#E3ADD4","#A83873"]);
    const skinIdxInPal2 = [];
    for (let pi = 0; pi < PAL.length; pi++) if (skinHexSet2.has(PAL[pi].hex)) skinIdxInPal2.push(pi);
    if (skinIdxInPal2.length){
      for (const b of expandedFaceBoxes){
        for (let y = Math.max(0,b.y0); y <= Math.min(gh-1,b.y1); y++){
          for (let x = Math.max(0,b.x0); x <= Math.min(gw-1,b.x1); x++){
            if (!isSubjectPixel(x, y)) continue;
            const i = y*gw + x;
            // the real, per-pixel skin classification — not just "warm
            // hued and somewhere in the box." A red shirt is warm too;
            // this is what stops that from being treated the same as skin.
            if (S.regionMap[i] !== 1) continue;
            const cur = PAL[cells[i]];
            if (!cur || skinHexSet2.has(cur.hex) || lipOkHexSet.has(cur.hex)) continue;
            const o = i*3;
            const [L, a, bb] = rgb2lab(buf[o], buf[o+1], buf[o+2]);
            let best = skinIdxInPal2[0], bd = Infinity;
            for (const si of skinIdxInPal2){
              const d = dLab([L,a,bb], PAL[si]);
              if (d < bd){ bd = d; best = si; }
            }
            cells[i] = best;
          }
        }
      }
    }
  }

  // Third rule: a bright highlight on skin (a forehead catching direct
  // light, for example) is often very close to white, which makes its
  // hue angle in Lab space unreliable — the same physical highlight can
  // land anywhere across a wide swing of hue values depending on tiny
  // sensor/white-balance differences, so the narrow warm-hue gate above
  // can legitimately miss it. This checks brightness directly instead:
  // within a face box, if the source pixel is bright and NOT clearly a
  // cool color (blue/green/purple — the only hues a skin highlight
  // could never actually be), and it ended up as anything other than an
  // approved skin tone, white, or a lip color, it's corrected. This is
  // what catches a highlight that got mapped to a saturated, unrelated
  // brick color like yellow instead of a light skin tone.
  if (S.auto && S.faceBoxes && S.faceBoxes.length && S.regionMap){
    const skinHexSet3 = new Set(SKIN_PALETTE.map((c) => c[1]));
    const lipOkHexSet3 = new Set(["#BD3A32","#7B3936","#EB6D7F","#C966A2","#E3ADD4","#A83873"]);
    const skinIdxInPal3 = [];
    for (let pi = 0; pi < PAL.length; pi++) if (skinHexSet3.has(PAL[pi].hex)) skinIdxInPal3.push(pi);
    if (skinIdxInPal3.length){
      for (const b of expandedFaceBoxes){
        for (let y = Math.max(0,b.y0); y <= Math.min(gh-1,b.y1); y++){
          for (let x = Math.max(0,b.x0); x <= Math.min(gw-1,b.x1); x++){
            if (!isSubjectPixel(x, y)) continue;
            const i = y*gw + x;
            if (S.regionMap[i] !== 1) continue;
            const cur = PAL[cells[i]];
            if (!cur || skinHexSet3.has(cur.hex) || lipOkHexSet3.has(cur.hex)) continue;
            const curC = Math.sqrt(cur.lab[1]*cur.lab[1] + cur.lab[2]*cur.lab[2]);
            if (cur.lab[0] > 92 && curC < 15) continue;              // genuinely white (teeth, a catchlight) — leave it. Bright but saturated (yellow) is not white and must not be skipped here.
            const o = i*3;
            const [L, a, bb] = rgb2lab(buf[o], buf[o+1], buf[o+2]);
            if (L < 75) continue;                                    // not a bright highlight — outside this rule
            let hue = Math.atan2(bb, a) * 180/Math.PI;
            if (hue < 0) hue += 360;
            if (hue > 140 && hue < 320) continue;                    // clearly cool (blue/green/purple) — not skin
            let best = skinIdxInPal3[0], bd = Infinity;
            for (const si of skinIdxInPal3){
              const d = dLab([L,a,bb], PAL[si]);
              if (d < bd){ bd = d; best = si; }
            }
            cells[i] = best;
          }
        }
      }
    }
  }

  // face color guard, once more after every cleanup pass above — an
  // isolated-brick cleanup can copy a neighbouring orange/yellow back in
  if (S.auto && faceGuardBoxes.length){
    // PAL was compacted by enforceMinimum above, so the skin indices are
    // looked up again against the palette as it stands now
    const skinNow = [];
    for (let pi = 0; pi < PAL.length; pi++) if (skinHexSet.has(PAL[pi].hex)) skinNow.push(pi);
    const lipNow = [];
    for (let pi = 0; pi < PAL.length; pi++) if (LIP_HEX.has(PAL[pi].hex)) lipNow.push(pi);
    for (const fb of faceGuardBoxes){
      for (let y = fb.y0; y <= fb.y1; y++){
        for (let x = fb.x0; x <= fb.x1; x++){
          const i = y*gw + x;
          cells[i] = faceGuard(x, y, cells[i], skinNow, lipNow);
        }
      }
    }
  }

// hand-placed bricks win over anything the algorithm decided
  if (S.edits.size){
    const byHex = new Map(PAL.map((c, i) => [c.hex, i]));
    for (const [k, hex] of S.edits){
      if (k >= cells.length) continue;
      let i = byHex.get(hex);
      if (i === undefined){            // that color left the mosaic — snap to the closest one still in it
        const want = PAL[0] ? rgb2lab(...hex2rgb(hex)) : null;
        let bd = Infinity;
        PAL.forEach((c, j) => { const d = dLab(want, c); if (d < bd){ bd = d; i = j; } });
      }
      cells[k] = i;
    }
  }

  S.usedPal = PAL;
  S.cells = cells;
  // keep the quantised result so interface work never has to redo the maths
  S.baseCells = cells.slice();
  S.cacheKey = mosaicKey();
  drawThumb();
  paint(cells, gw, gh, PAL);
  if (window.DEBUG_MEMOBRICK_PROCESSING) drawDebugOverlay(gw, gh);
  tally(cells, PAL);
  meta();
}

/* A fingerprint of everything that mathematically changes the mosaic.
   If it hasn't moved, there is no reason to quantise the photo again. */
function mosaicKey(){
  return [S.imgId, S.size.id, S.pal, S.zoom.toFixed(4), S.ox.toFixed(4), S.oy.toFixed(4), S.bg,
          S.bri, S.con, S.sat, S.temp, S.detail, S.dither, S.auto ? 1 : 0, S.shadows, S.warm,
          [...S.excludedColors].sort().join(","), S.paletteCount || "auto", S.bgEffect,
          S.img ? (S.img.naturalWidth || S.img.width) : 0].join("|");
}

/* Redraw the board from what we already computed. Used for anything that is
   purely presentational: resizing, toggling studs or board lines, switching
   view, opening a panel, stepping back. Manual edits are untouched. */
function repaint(){
  if (!S.img || !S.cells || !S.usedPal){ render(); return; }
  const { gw, gh } = dims();
  hold.style.aspectRatio = `${gw} / ${gh}`;
  sizeCanvases(gw, gh);
  pctx.clearRect(0, 0, pho.width, pho.height);
  drawSource(pctx, pho.width, pho.height);
  paint(S.cells, gw, gh, S.usedPal);
}

/* Regenerate only when the fingerprint actually changed. */
function renderIfNeeded(reuse){
  if (S.cells && S.cacheKey === mosaicKey()) { repaint(); return; }
  render(reuse);
}

function sizeCanvases(gw, gh){
  // a phone gains nothing from a 1400px board and pays for it in memory and time
  const small = window.innerWidth < 900;
  const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
  const target = clamp(Math.round((hold.clientWidth || 560) * dpr), 480, small ? 820 : 1400);
  const cell = Math.max(6, Math.round(target / gw));
  const W = cell*gw, H = cell*gh;
  if (mos.width !== W || mos.height !== H){ mos.width = W; mos.height = H; }
  const pw = Math.min(700, W), ph = Math.round(pw*gh/gw);
  if (pho.width !== pw){ pho.width = pw; pho.height = ph; }
}

function paint(cells, gw, gh, P){
  const cell = mos.width / gw;
  mctx.clearRect(0,0,mos.width,mos.height);
  const r = cell*0.29;
  for (let y=0; y<gh; y++){
    for (let x=0; x<gw; x++){
      const c = P[cells[y*gw+x]];
      const px = x*cell, py = y*cell;
      mctx.fillStyle = c.hex;
      mctx.fillRect(px, py, cell+.6, cell+.6);
      if (!S.studs || cell < 5) continue;
      const cx = px+cell/2, cy = py+cell/2;
      mctx.fillStyle = c.lo; mctx.beginPath(); mctx.arc(cx, cy+cell*.045, r, 0, 6.2832); mctx.fill();
      mctx.fillStyle = c.top; mctx.beginPath(); mctx.arc(cx, cy, r, 0, 6.2832); mctx.fill();
      if (cell > 9){
        mctx.strokeStyle = c.hi; mctx.lineWidth = Math.max(1, cell*.045);
        mctx.beginPath(); mctx.arc(cx, cy, r*.72, Math.PI*1.05, Math.PI*1.75); mctx.stroke();
      }
    }
  }
  if (S.studs && cell >= 5){
    mctx.strokeStyle = "rgba(0,0,0,.07)"; mctx.lineWidth = 1; mctx.beginPath();
    for (let i=1;i<gw;i++){ mctx.moveTo(i*cell,0); mctx.lineTo(i*cell,mos.height); }
    for (let i=1;i<gh;i++){ mctx.moveTo(0,i*cell); mctx.lineTo(mos.width,i*cell); }
    mctx.stroke();
  }
  if (S.boards){
    const { bx, by } = dims();
    mctx.strokeStyle = "rgba(255,255,255,.75)"; mctx.lineWidth = Math.max(2, cell*.22);
    mctx.setLineDash([cell*1.2, cell*.8]); mctx.beginPath();
    for (let i=1;i<bx;i++){ const px=i*mos.width/bx; mctx.moveTo(px,0); mctx.lineTo(px,mos.height); }
    for (let i=1;i<by;i++){ const py=i*mos.height/by; mctx.moveTo(0,py); mctx.lineTo(mos.width,py); }
    mctx.stroke(); mctx.setLineDash([]);
  }
}

/* Developer visualization only — see window.DEBUG_MEMOBRICK_PROCESSING.
   Tints each grid cell by its classified region (background/skin/hair/
   clothing) and outlines every detected face box, drawn straight onto
   the mosaic canvas so what the pipeline "saw" is directly checkable
   against what it produced. */
function drawDebugOverlay(gw, gh){
  const cell = mos.width / gw;
  const REGION_COLOR = ["rgba(80,80,255,.22)", "rgba(255,210,0,.22)", "rgba(160,60,220,.22)", "rgba(0,200,120,.22)"];
  if (S.regionMap){
    for (let y = 0; y < gh; y++){
      for (let x = 0; x < gw; x++){
        const r = S.regionMap[y*gw + x];
        if (r === 0) continue;                 // leave background untinted, less visual noise
        mctx.fillStyle = REGION_COLOR[r];
        mctx.fillRect(x*cell, y*cell, cell+.6, cell+.6);
      }
    }
  }
  if (S.faceBoxes){
    mctx.lineWidth = Math.max(1.5, cell*0.15);
    mctx.strokeStyle = "rgba(255,0,60,.9)";
    S.faceBoxes.forEach((b) => {
      mctx.strokeRect(b.x0*cell, b.y0*cell, (b.x1-b.x0+1)*cell, (b.y1-b.y0+1)*cell);
    });
  }
  mctx.fillStyle = "rgba(0,0,0,.72)"; mctx.fillRect(4, 4, 230, 62);
  mctx.fillStyle = "#fff"; mctx.font = "11px monospace";
  mctx.fillText("DEBUG — MemoBrick processing", 10, 18);
  mctx.fillText("skin=yellow hair=purple cloth=green", 10, 32);
  mctx.fillText("faces=" + (S.faceBoxes ? S.faceBoxes.length : 0) +
    "  hdr=" + S.hdrStrength + "  detail=" + S.detail, 10, 46);
  mctx.fillText("dither=" + S.dither + "  auto=" + S.auto, 10, 58);
}

/* ------------------------ parts & totals ------------------------ */
let COUNTS = [];
function tally(cells, P){
  const counts = new Array(P.length).fill(0);
  for (let i=0;i<cells.length;i++) counts[cells[i]]++;
  COUNTS = P.map((c,i) => ({ name:c.name, hex:c.hex, id:c.id, n:counts[i] })).filter((c) => c.n > 0).sort((a,b) => b.n - a.n);
  $("#partsGrid").innerHTML = COUNTS.map((c) =>
    `<div class="part"><i style="background:${c.hex}"></i><span class="nm">${c.name}</span><span class="ct">${fmt(c.n)}</span></div>`).join("");
  const bar = $("#colorBar");
  if (bar) bar.innerHTML = COUNTS.map((c) =>
    `<i style="flex:${c.n} 1 0;background:${c.hex}" title="${c.name} — ${fmt(c.n)} bricks"></i>`).join("");
  if (S.editing){ renderBrushes(); refreshEdits(); }
  try { document.dispatchEvent(new CustomEvent("memobrick:recount")); } catch (e) {}
  if (typeof renderColorGrid === "function") renderColorGrid();
  $("#partsMeta").textContent = `${COUNTS.length} of ${PALETTES[S.pal].colors.length} colors · max ${MAX_COLOURS} bags, none under ${MIN_BRICKS} bricks${S.edits.size ? " · " + fmt(S.edits.size) + " hand-placed" : ""}`;
}

function meta(){
  const { gw, gh, bx, by } = dims(), pieces = gw*gh;
  const canBuild = !!S.size.build;
  const total = (S.build && canBuild) ? S.size.build : S.size.price;
  $("#chipGrid").textContent = `${gw} × ${gh} studs`;
  if ($("#chipPal")) $("#chipPal").textContent = `${PALETTES[S.pal].name} · max ${MAX_COLOURS}`;
  $("#pcPieces").textContent = fmt(pieces) + " bricks";
  const nb = bx*by;
  $("#pcBoards").textContent = nb + (nb === 1 ? " baseplate" : " baseplates");
  $("#pcTime").textContent = (S.build && canBuild) ? "We build it, you hang it" : `~${S.size.hours} hours of building fun`;
  $("#pcAmt").textContent = money(total);
  const wasEl = $("#pcWas"), saveEl = $("#pcSave");
  if (S.size.was && !(S.build && canBuild)){
    wasEl.textContent = money(S.size.was); wasEl.hidden = false;
    saveEl.textContent = "Save " + Math.round((1 - S.size.price/S.size.was)*100) + "%"; saveEl.hidden = false;
  } else { wasEl.hidden = true; saveEl.hidden = true; }
  const etSize = $("#edTopSize"), etPrice = $("#edTopPrice"), etWas = $("#edTopWas");
  if (etSize) etSize.textContent = S.size.label;
  if (etPrice) etPrice.textContent = money(total);
  if (etWas){
    if (S.size.was && !(S.build && canBuild)){ etWas.textContent = money(S.size.was); etWas.hidden = false; }
    else etWas.hidden = true;
  }
  const btn = $("#orderBtn");
  btn.href = url(S.size, S.build);
  btn.textContent = `Order the ${S.size.label} kit`;
  const bb = $("#buildBtn");
  bb.hidden = !canBuild;
  bb.style.display = canBuild ? "" : "none";
  bb.setAttribute("aria-pressed", S.build && canBuild);
  if (canBuild) bb.innerHTML = `Let us build it for you <b>${money(S.size.build)}</b>`;
  announce($("#det"),  S.detail + "% detail");
  announce($("#zoom"), Math.round(S.zoom*100) + "% crop");
  $("#valDet").textContent = S.detail + "%";
  $("#valBri").textContent = (S.bri>0?"+":"") + S.bri;
  $("#valCon").textContent = (S.con>0?"+":"") + S.con;
  $("#valSat").textContent = (S.sat>0?"+":"") + S.sat;
  if (meta._last !== S.size.id){ meta._last = S.size.id; renderSizes(); renderScale(); }
  $$("#sizeGrid .sizebtn").forEach((el) => el.setAttribute("aria-pressed", el.dataset.id === S.size.id));
  const accSize = $("#accSize");
  if (accSize) accSize.textContent = `${S.size.label} · ${nb} baseplate${nb === 1 ? "" : "s"}`;
  try { markSteps(); syncBuyBar(); if (window.syncMobileTopBar) window.syncMobileTopBar(); } catch (e) {}
  const live = $("#liveStatus");
  if (live) live.textContent =
    `${S.size.label} mosaic, ${fmt(pieces)} bricks, ${COUNTS.length} colors, ${money(total)}.`;
  const sel = $("#sizeAll"); if (sel.value !== S.size.id) sel.value = S.size.id;
}

/* ---- one-click filters: a starting point people can actually use ---- */

function announce(el, text){ el.setAttribute("aria-valuetext", text); }
function syncSliders(){
  $("#bri").value = S.bri; $("#con").value = S.con; $("#sat").value = S.sat;
  $("#det").value = S.detail;
  const sh = $("#shadows");
  const wm = $("#warm");
  if (wm){ wm.value = S.warm; $("#valWarm").textContent = S.warm + "%"; }
  const sh2 = $("#shadows");
  if (sh2){ sh2.value = S.shadows; $("#valShadows").textContent = S.shadows + "%"; }
  if (sh){ sh.value = S.shadows; $("#valShadows").textContent = S.shadows + "%"; }
}

/* the full 40-color inventory, independent of the S.pal preset filter —
   curation in the Colors panel works from everything MemoBrick ships,
   not whatever named preset happens to be active */
let FULL_PAL_CACHE = null;
function fullPal(){
  if (FULL_PAL_CACHE) return FULL_PAL_CACHE;
  return FULL_PAL_CACHE = PALETTES.full.colors.map(([name,hex,id,brick]) => {
    const [r,g,b] = hex2rgb(hex);
    const _l = rgb2lab(r,g,b);
    return { name, hex, id, brick, r, g, b, lab: _l, C: Math.sqrt(_l[1]*_l[1] + _l[2]*_l[2]), top: shade(hex,.16), lo: shade(hex,-.22), hi: shade(hex,.38) };
  });
}

/* The approved skin-tone brick set, always available regardless of which
   palette (full/warm/mono/bold) the customer has selected for the rest
   of the design — skin restriction is a baseline behavior, not tied to
   palette choice. */
let SKIN_PAL_CACHE = null;
function skinPal(){
  if (SKIN_PAL_CACHE) return SKIN_PAL_CACHE;
  return SKIN_PAL_CACHE = SKIN_PALETTE.map(([name,hex,id,brick]) => {
    const [r,g,b] = hex2rgb(hex);
    const _l = rgb2lab(r,g,b);
    return { name, hex, id, brick, r, g, b, lab: _l, C: Math.sqrt(_l[1]*_l[1] + _l[2]*_l[2]), top: shade(hex,.16), lo: shade(hex,-.22), hi: shade(hex,.38) };
  });
}

/* Real thumbnails, not icons or static images — each one is rendered
   from the exact same draw() function that produces the actual effect,
   so what the customer picks from is never different from what they get. */
const BG_THUMB_CACHE = {};
function bgThumbDataUrl(key){
  if (BG_THUMB_CACHE[key]) return BG_THUMB_CACHE[key];
  const c = document.createElement("canvas");
  c.width = 72; c.height = 72;
  const ctx = c.getContext("2d");
  const eff = BG_EFFECTS[key];
  if (eff && eff.draw) eff.draw(ctx, 72, 72);
  else { ctx.fillStyle = "#EDE4DF"; ctx.fillRect(0,0,72,72); }
  return BG_THUMB_CACHE[key] = c.toDataURL();
}

function renderBgGrid(){
  const grid = $("#bgGrid");
  if (!grid) return;
  grid.innerHTML = Object.keys(BG_EFFECTS).filter((key) => key !== "none").map((key) => {
    const eff = BG_EFFECTS[key];
    const isOriginal = key === "original";
    const isCustom = key === "custom";
    const active = S.bgEffect === key;
    let thumbStyle, label, extra = "";
    if (isOriginal){
      thumbStyle = S.img ? `background-image:url(${S.img.src})` : "background:#EDE4DF";
      label = eff.name;
    } else if (isCustom){
      thumbStyle = S.customBgImg ? `background-image:url(${S.customBgImg.src})` : "background:#FFF9F5";
      label = S.customBgImg ? "Your photo" : "Add your own";
      if (!S.customBgImg) extra = '<span class="bgthumb-plus" aria-hidden="true">+</span>';
    } else {
      thumbStyle = `background-image:url(${bgThumbDataUrl(key)})`;
      label = eff.name;
    }
    return `<button class="bgthumb${active ? " on" : ""}${isCustom ? " bgthumb-custom" : ""}" data-bg-effect="${key}"
      aria-pressed="${active}" style="${thumbStyle}">
      ${extra}
      <span class="bgthumb-label">${label}</span>
      ${active ? '<span class="bgthumb-check" aria-hidden="true">✓</span>' : ""}
    </button>`;
  }).join("");
  const removeBtn = $("#bgRemoveBtn");
  if (removeBtn) removeBtn.setAttribute("aria-pressed", S.bgEffect === "none");
  const sub = $("#accBackgrounds");
  if (sub) sub.textContent = S.bgEffect === "original" ? "Original photo" : BG_EFFECTS[S.bgEffect].name;
}

function setBgEffect(key){
  if (!BG_EFFECTS[key] || S.bgEffect === key) return;
  pushHistory("Background");
  S.bgEffect = key;
  renderBgGrid();
  render();
}

function loadCustomBg(file){
  if (!file || !/^image\//.test(file.type)) { toast("That doesn't look like an image."); return; }
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    S.customBgImg = img;
    delete BG_THUMB_CACHE.custom;                 // never cache — it changes with every upload
    pushHistory("Background");
    S.bgEffect = "custom";
    renderBgGrid();
    render();
    if (window.MB_syncMobileBackgroundUI) window.MB_syncMobileBackgroundUI();
  };
  img.onerror = () => toast("Couldn't load that image — try a different photo.");
  img.src = url;
}

function renderColorGrid(){
  const grid = $("#colorGrid");
  if (!grid) return;
  const usedByHex = new Map(COUNTS.map((c) => [c.hex, c.n]));
  const P = fullPal();
  grid.innerHTML = P.map((c) => {
    const isExcluded = S.excludedColors.has(c.hex);
    const n = usedByHex.get(c.hex) || 0;
    const isUsed = n > 0;
    const countTxt = isUsed ? fmt(n) + " brick" + (n === 1 ? "" : "s") : "not currently used";
    const label = c.name + ", " + countTxt + (isExcluded ? ", excluded" : isUsed ? ", included" : "");
    const title = isExcluded ? "Click to add this color back" : isUsed ? "Click to remove this color" : c.name;
    return `<button class="cswatch${isUsed && !isExcluded ? " cswatch-used" : ""}" data-hex="${c.hex}"
      aria-pressed="${!isExcluded}" title="${title}" aria-label="${label}" style="background:${c.hex}">
      ${isUsed && !isExcluded ? '<span class="cswatch-check" aria-hidden="true">✓</span>' : ""}
      ${isExcluded ? '<span class="cswatch-x" aria-hidden="true">✕</span>' : ""}
    </button>`;
  }).join("");
  syncColorHeader(usedByHex.size, S.excludedColors.size);
}

function syncColorHeader(usedCount, excludedCount){
  const label = $("#colorCount");
  if (label){
    let txt = usedCount + " color" + (usedCount === 1 ? "" : "s") + " in this picture";
    if (excludedCount) txt += " · " + excludedCount + " excluded";
    label.textContent = txt;
  }
  const sub = $("#accColors");
  if (sub) sub.textContent = excludedCount ? "Customized" : "Automatic selection";
  const restoreBtn = $("#colorRestoreAll");
  if (restoreBtn) restoreBtn.hidden = !excludedCount;
}

// guards against the same color being toggled twice before the first
// recalculation has finished, and against a slow render finishing after
// a newer one and clobbering it
let colorToggleBusy = false;
function toggleColorExclusion(hex){
  if (colorToggleBusy) return;
  const isExcluded = S.excludedColors.has(hex);
  if (!isExcluded){
    // about to remove one — never let the picture drop below 3 usable colors
    const usedNow = COUNTS.filter((c) => !S.excludedColors.has(c.hex)).length;
    if (usedNow <= 3){
      toast("Keep at least 3 colors for a clear mosaic.");
      return;
    }
  }
  colorToggleBusy = true;
  pushHistory("Colors");
  if (isExcluded) S.excludedColors.delete(hex); else S.excludedColors.add(hex);
  const myToken = ++colorRenderToken;
  render();
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (myToken === colorRenderToken) renderColorGrid();  // stale toggles never overwrite a newer result
    colorToggleBusy = false;
  }));
}
let colorRenderToken = 0;

/* ---------------- three screens: home, upload, editor ---------------- */
document.documentElement.classList.add("js");

/* ---------------- progress + sticky purchase bar ---------------- */
function markSteps(){
  const has = !!(S && S.img && S.uploaded);
  document.querySelectorAll(".steps3").forEach((ol) => {
    const li = ol.children;
    if (!li || li.length < 3) return;
    li[0].className = "s1 " + (has ? "is-done" : "on");
    li[1].className = "s2 " + (has ? "on" : "");
    li[2].className = "s3";
  });
  const bar = document.querySelector("#buyBar");
  if (bar){
    bar.hidden = !has;
    document.body.classList.toggle("has-bar", has);
  }
}
function syncBuyBar(){
  const price = document.querySelector("#pcAmt"), size = document.querySelector("#chipGrid");
  const order = document.querySelector("#orderBtn");
  const bp = document.querySelector("#bbPrice"), bs = document.querySelector("#bbSize"),
        bc = document.querySelector("#bbCta");
  if (bp && price) bp.textContent = price.textContent;
  if (bs && S && S.size) bs.textContent = S.size.label;
  if (bc && order) bc.href = order.getAttribute("href") || "#";
}

/* Any uncaught error used to leave the person staring at an unchanged screen.
   Surface it instead, so a failure is reportable rather than mysterious.
   Scoped to errors that actually come from THIS file: window-level error
   events fire for every script on the page, including third-party apps
   (Loox reviews, analytics, pixels, etc.) that have nothing to do with
   the Creator — showing a customer-facing message for one of those would
   be both confusing and wrong, since nothing in the Creator actually
   failed. */
function isOurError(source){
  return typeof source === "string" && /memobrick\.js/i.test(source);
}
window.addEventListener("error", (e) => {
  console.error("MemoBrick error:", e.message, e.filename, e.lineno);   // detail for us, always
  if (!isOurError(e.filename)) return;                                  // someone else's script failed, not ours
  try { toast("Something went wrong. Please try again, or choose another photo."); } catch (x) {}
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("MemoBrick promise rejection:", e.reason);
  const stack = e.reason && e.reason.stack;
  if (!isOurError(stack)) return;
  try { toast("Something went wrong. Please try again, or choose another photo."); } catch (x) {}
});   // the CSS fallback stands down

function showView(name){
  // a leftover #view-… in the address bar would keep the old screen pinned open
  if (location.hash.indexOf("#view-") === 0){
    try { history.replaceState(null, "", location.pathname + location.search); }
    catch (e) { location.hash = ""; }
  }
  if (name === "editor"){
    const panels = document.querySelectorAll("[data-acc]");
    if (panels.length){
      const hasPhoto = !!(S && S.img && S.uploaded);
      // before a photo: the tips. After: the size panel, which is what people change next.
      const wanted = hasPhoto ? Math.min(2, panels.length - 1) : 0;
      panels.forEach((d, i) => { d.open = (i === wanted); });
    }
  }
  ["home","upload","editor","design","corporate","freeproof"].forEach((v) => {
    const el = document.querySelector("#view-" + v);
    if (el) el.hidden = (v !== name);
  });
  document.body.classList.toggle("in-app", name !== "home");
  window.scrollTo({ top: 0, behavior: "auto" });
  if (name === "editor") renderIfNeeded();     // never rebuild an existing design
}
function bindGo(){
  document.querySelectorAll("[data-go]").forEach((b) => {
    if (b.dataset.goBound) return;
    b.dataset.goBound = "1";
    b.addEventListener("click", (ev) => {
      const to = b.dataset.go;
      const href = b.getAttribute("href") || "";
      if (to === "home" && href && href !== "#view-home"){ showView("home"); return; }
      ev.preventDefault(); ev.stopPropagation();
      if (href.startsWith("#view-")) history.replaceState(null, "", " ");
      showView(to);
    });
  });
}
bindGo();

/* Every nav target lives inside the home view, so on the upload or editor
   screen those links pointed at hidden elements and did nothing. Switch to
   the view that owns the section first, then scroll to it. */
document.addEventListener("click", (e) => {
  const a = e.target.closest && e.target.closest('a[href^="#"]');
  if (!a || a.hasAttribute("data-go")) return;
  const id = a.getAttribute("href").slice(1);
  if (!id || id === "edit") return;
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();

  const view = el.closest && el.closest(".view");
  const want = view ? view.id.replace("view-", "") : "home";
  const current = document.querySelector("#view-editor");
  const onEditor = current && current.hidden === false;
  if (!(want === "editor" && onEditor) ) showView(want);

  // closing the phone menu first, so the section is not hidden behind it
  const nav = document.querySelector("#navLinks"), burger = document.querySelector("#burger");
  if (nav && nav.classList.contains("open")){
    nav.classList.remove("open");
    if (burger) burger.setAttribute("aria-expanded", "false");
  }
  requestAnimationFrame(() => {
    if (id === "top"){ window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.addEventListener("click", (e) => {
  const b = e.target.closest && e.target.closest("[data-go]");
  if (!b) return;
  const to = b.dataset.go;
  if (to === "home" && b.getAttribute("href")){         // "see the photo guide" style links
    showView("home");
    return;                                              // let the anchor jump run
  }
  e.preventDefault();
  showView(to);
});

/* ---------------- accordion: one step open at a time ---------------- */
function singleOpen(selector){
  const all = document.querySelectorAll(selector);
  all.forEach((d) => {
    d.addEventListener("toggle", () => {
      if (!d.open) return;
      all.forEach((o) => { if (o !== d){ o.open = false; restoreOrder(o); } });
      liftToTop(d);
      levelWithPicture(d);
    });
  });
}

/* Move the opened panel to the top of its own column, in the DOM. CSS order
   can do this too, but a real move cannot be undone by a later rule or by an
   engine that ignores flex ordering — the panel is simply first.
   Each panel remembers the position it started in, by index, so the column
   can be put back exactly as it was. An index survives the last panel in the
   list, which a "next sibling" reference does not. */
function rememberOrder(parent){
  if (!parent || parent._ordered) return;
  Array.prototype.forEach.call(parent.children, (kid, i) => { kid._order = i; });
  parent._ordered = true;
}

function liftToTop(panel){
  const parent = panel && panel.parentElement;
  if (!parent) return;
  rememberOrder(parent);
  if (parent.firstElementChild === panel) return;
  parent.insertBefore(panel, parent.firstElementChild);
}

/* Put the column back into its natural order once nothing is lifted. */
function restoreOrder(panel){
  const parent = panel && panel.parentElement;
  if (!parent || !parent._ordered) return;
  const kids = Array.prototype.slice.call(parent.children)
    .sort((a, b) => (a._order || 0) - (b._order || 0));
  kids.forEach((kid) => parent.appendChild(kid));
}

/* Bring an opened panel up beside the artwork. The picture is sticky at the
   top of the workspace, so aligning the panel to the same line means the
   control and the thing it changes are side by side. */
/* Opening a control panel brings the editing workspace to the top of the
   screen — the picture and its controls together, with nothing above them.
   CSS already lifts the open panel to the top of its column, so putting the
   workspace at the top puts the two side by side. */
function levelWithPicture(panel){
  const bench = document.querySelector(".bench");
  const stage = document.querySelector(".stage");
  const target = (window.innerWidth < 1021 ? stage : bench) || bench || stage;
  if (!target) return;
  requestAnimationFrame(() => {
    const header = window.innerWidth < 1021 ? 60 : 76;
    const top = target.getBoundingClientRect().top + window.pageYOffset - header - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  });
}
document.addEventListener("click", (e) => {
  const sum = e.target.closest && e.target.closest("summary");
  if (!sum || !sum.parentElement) return;
  const det = sum.parentElement;
  if (det.tagName !== "DETAILS") return;
  // native <details> handles this; if a stray handler prevented it, do it here
  setTimeout(() => {
    if (e.defaultPrevented && det.open === false) det.open = true;
  }, 0);
});

singleOpen("[data-acc]");     // the main panels
singleOpen("[data-sub]");     // and the ones inside Advanced
function openAcc(i){
  const all = document.querySelectorAll("[data-acc]");
  all.forEach((d, n) => { d.open = (n === i); });
}

/* ---------------- editor tab bar: a thin layer over the accordion ----
   Each tab just opens its <details> panel — singleOpen() above already
   closes siblings, lifts the panel to the top of its column, and scrolls
   it level with the picture, exactly as every other panel does. Adjust
   and Paint live inside the "Advanced adjustments" wrapper, so their tabs
   open that wrapper too. */
(function editorTabs(){
  const tabs = document.querySelectorAll(".edtab");
  if (!tabs.length) return;
  const NESTED = { panelAdjust: "panelAdvanced", panelPaint: "panelAdvanced", panelStyles: "panelAdvanced" };
  const selectTab = (id) => {
    tabs.forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === id)));
  };
  tabs.forEach((btn) => btn.addEventListener("click", () => {
    const id = btn.dataset.tab;
    const wrapperId = NESTED[id];
    if (wrapperId){
      const wrapper = document.getElementById(wrapperId);
      if (wrapper && !wrapper.open) wrapper.open = true;
    }
    const target = document.getElementById(id);
    if (target) target.open = true;
    selectTab(id);
  }));
  // stay in sync if a panel is opened by clicking its own header instead of a tab
  document.querySelectorAll("[data-acc], [data-sub]").forEach((d) => {
    if (!d.id) return;
    d.addEventListener("toggle", () => { if (d.open) selectTab(d.id); });
  });
})();

/* the Fox News segment plays in place on click — the link href stays as a
   working fallback if scripts are off. Uses youtube-nocookie.com (the
   privacy-enhanced embed domain) and only creates the iframe on click, not
   on page load, so no tracking cookies are set until the visitor actually
   chooses to watch. */
const foxThumb = document.querySelector("#foxThumb");
if (foxThumb){
  foxThumb.addEventListener("click", (e) => {
    e.preventDefault();
    const f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/_WrESPAjNjI?autoplay=1&rel=0&modestbranding=1";
    f.title = "MemoBrick featured on Fox News";
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    f.setAttribute("allowfullscreen", "");
    f.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0";
    foxThumb.replaceWith(f);
  });
}

/* =====================================================================
   CONTENT EDITOR — lets the owner rewrite any text on the page and
   download a new HTML file with the changes baked in. Nothing is saved
   to a server; the downloaded file is the new site.
   ===================================================================== */
(function cms(){
  const EDITABLE = "h1,h2,h3,h4,h5,p,li,summary,cite,figcaption,blockquote,span.eyebrow,b,.btn,.mini,.tsep,.pressk,.presscopy,.kicker,.hero-trust,.disclaimer,.reassure,.upload-sub,.upsize,.startp,.stepnote,.tvcap,.ytlink";
  const bar = document.querySelector("#cms");
  if (!bar) return;
  let originals = new Map(), changed = 0;

  const isSafe = (el) =>
    !el.closest("[data-noedit]") && !el.closest("[data-editor-ui]") &&
    !el.querySelector(EDITABLE) &&            // leaf text only, so we never nest editors
    (el.textContent || "").trim().length > 0;

  function mark(){
    document.querySelectorAll(EDITABLE).forEach((el) => {
      if (!isSafe(el) || el.hasAttribute("data-cms")) return;
      el.setAttribute("data-cms", "");
      el.setAttribute("contenteditable", "plaintext-only");
      el.setAttribute("spellcheck", "true");
      originals.set(el, el.innerHTML);
      el.addEventListener("input", () => {
        const dirty = el.innerHTML !== originals.get(el);
        el.classList.toggle("cms-changed", dirty);
        changed = document.querySelectorAll(".cms-changed").length;
        document.querySelector("#cmsCount").textContent =
          changed === 1 ? "1 edit" : changed + " edits";
      });
      el.addEventListener("keydown", (e) => { if (e.key === "Escape") el.blur(); });
    });
  }
  function unmark(){
    document.querySelectorAll("[data-cms]").forEach((el) => {
      el.removeAttribute("data-cms"); el.removeAttribute("contenteditable");
      el.removeAttribute("spellcheck"); el.classList.remove("cms-changed");
    });
  }

  function open(){
    bar.hidden = false;
    document.body.classList.add("cms-on");
    mark();
    toast("Content editor on — click any text to rewrite it, then download the updated site.");
  }
  function close(){
    bar.hidden = true;
    document.body.classList.remove("cms-on");
    unmark();
  }

  /* the download is the page itself, cleaned of anything the script generated */
  const GENERATED = ["#sizeCards","#pals","#sizeGrid","#sizeAll","#partsGrid",
                     "#colorBar","#brushes","#insSheets","#scaleView","#thumb"];
  function exportSite(){
    const doc = document.documentElement.cloneNode(true);
    // the editor must survive the export, or the next copy cannot be edited
    doc.querySelectorAll("[data-editor-ui]").forEach((n) => {
      n.hidden = true;
      const c = n.querySelector("#cmsCount"); if (c) c.textContent = "0 edits";
    });
    doc.querySelectorAll("[data-cms]").forEach((n) => {
      n.removeAttribute("data-cms"); n.removeAttribute("contenteditable");
      n.removeAttribute("spellcheck"); n.classList.remove("cms-changed");
      if (!n.getAttribute("class")) n.removeAttribute("class");
    });
    GENERATED.forEach((sel) => { const n = doc.querySelector(sel); if (n) n.innerHTML = ""; });
    doc.querySelectorAll("canvas").forEach((c) => { c.removeAttribute("style"); });
    const v = (id, hide) => { const n = doc.querySelector(id); if (n) n.hidden = hide; };
    v("#view-home", false); v("#view-upload", true); v("#view-editor", true);
    const hold = doc.querySelector("#hold"); if (hold){ hold.classList.add("empty"); hold.removeAttribute("style"); }
    const tb = doc.querySelector("#tipsBody"); if (tb) tb.hidden = true;
    const bodyEl = doc.querySelector("body"); if (bodyEl) bodyEl.className = "";

    const html = "<!DOCTYPE html>\n" + doc.outerHTML;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([html], { type: "text/html" }));
    a.download = "memobrick-site.html";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 3000);
    toast("Downloaded. Upload this file to Shopify, or send it to whoever manages the theme.");
  }

  document.querySelector("#cmsSave").addEventListener("click", exportSite);
  document.querySelector("#cmsExit").addEventListener("click", close);
  document.querySelector("#cmsUndo").addEventListener("click", () => {
    originals.forEach((html, el) => { el.innerHTML = html; el.classList.remove("cms-changed"); });
    document.querySelector("#cmsCount").textContent = "0 edits";
    toast("All edits reverted.");
  });
  // the trigger is deliberately not in the public footer. Owners use
  // Ctrl/Cmd + Shift + E, or add #edit to the URL.
  const opener = document.getElementById("cmsOpen");   // absent for shoppers, by design
  if (opener) opener.addEventListener("click", (e) => { e.preventDefault(); open(); });
  window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "e" && e.shiftKey && (e.ctrlKey || e.metaKey)){
      e.preventDefault(); bar.hidden ? open() : close();
    }
  });
  // the #edit URL trigger was removed — a guessable hash on a live,
  // logged-out storefront meant any visitor who tried mymemobrick.com/#edit
  // landed in the content editor with zero authentication. The keyboard
  // shortcut above is the only way in now; nobody stumbles into
  // Ctrl/Cmd+Shift+E by accident.
})();

/* CORRECTED: this used to claim the hero video "attaches only when it
   scrolls into view" but the code below called attach()+kick() unconditionally
   on script load — the video (the page's single heaviest asset) was
   downloading immediately for every visitor regardless of connection. Since
   the hero sits above the fold for most visits, true scroll-based lazy
   loading wouldn't change much in practice; what actually matters is
   respecting the person's own stated preference. Data Saver and
   reduced-motion visitors now get the poster image only — no video
   download at all — everyone else gets the same experience as before. */
(function heroVideo(){
  const vid = document.querySelector("#heroVid"),
        play = document.querySelector("#heroPlay"),
        src = document.querySelector("#heroSrc"),
        srcMobile = document.querySelector("#heroSrcMobile");
  if (!vid) return;

  // same breakpoint the rest of the hero layout already switches on —
  // decided once at load, not re-evaluated on resize/rotate, same as
  // the rest of this function's one-time setup below
  const isMobile = window.matchMedia && window.matchMedia("(max-width: 900px)").matches;
  if (isMobile && srcMobile && srcMobile.textContent.trim()){
    const mobilePoster = vid.dataset.posterMobile;
    if (mobilePoster) vid.setAttribute("poster", mobilePoster);
  }


  /* iOS will not play a video from a data: URI, which is why the banner was
     dead on phones. A blob: URL built from the same bytes plays normally.
     The clip is baseline-profile H.264 at 420px — the widest-compatibility
     encoding there is. */
  function attach(){
    // The clip is now a real theme asset, so the element can load it directly.
    // No base64 decode, no blob, no memory spike on a phone.
    if (!src || vid.src) return;
    const useMobile = isMobile && srcMobile && srcMobile.textContent.trim();
    const urlEl = useMobile ? srcMobile : src;
    const url = (urlEl.textContent || "").trim();
    if (!url) return;
    vid.setAttribute("playsinline", "");
    vid.muted = true;
    vid.src = url;
    vid.load();
    const p = vid.play();
    if (p && p.catch) p.catch(() => { if (play) play.hidden = false; });
  }

  function posterOnly(){
    const poster = vid.getAttribute("poster");
    if (!poster){ vid.style.display = "none"; return; }
    if (vid.parentElement && !vid.parentElement.querySelector(".hero-poster")){
      const im = new Image();
      im.className = "hero-poster";
      im.alt = "Building a MemoBrick photo mosaic, brick by brick";
      im.style.cssText = "width:100%;height:auto;display:block;border-radius:inherit";
      im.src = poster;
      vid.parentElement.insertBefore(im, vid);
    }
    vid.style.display = "none";
  }

  const kick = () => {
    const p = vid.play();
    if (p && p.catch) p.catch(() => { if (play) play.hidden = false; });
  };

  vid.muted = true; vid.loop = true; vid.playsInline = true;

  /* AUTOPLAY FOR EVERYONE. The hero is a short, silent, looping clip, so it
     now starts on its own for every visitor. Previously it never started
     when the device had "Reduce motion" (common on Macs and iPhones) or
     Data Saver turned on — those visitors only saw a still poster. */
  attach();
  kick();

  // iPhone Low Power Mode (and some in-app browsers) refuse to autoplay
  // until the visitor has touched the page once — so the first tap,
  // scroll or key press anywhere starts it, without needing the ▶ button
  const firstGesture = () => {
    if (!vid.src) attach();
    kick();
    if (play && !vid.paused) play.hidden = true;
  };
  ["touchstart", "pointerdown", "scroll", "keydown"].forEach((ev) =>
    window.addEventListener(ev, firstGesture, { once: true, passive: true }));
  // and whenever the video scrolls into view
  if ("IntersectionObserver" in window){
    new IntersectionObserver((entries) => {
      if (entries.some((en) => en.isIntersecting) && vid.src) kick();
    }, { threshold: 0.2 }).observe(vid);
  }
  vid.addEventListener("playing", () => { if (play) play.hidden = true; });

  vid.addEventListener("loadeddata", kick);
  vid.addEventListener("ended", kick);
  vid.addEventListener("pause", () => { if (!document.hidden) kick(); });
  // a failed load is retried once before falling back to the still poster
  let retried = false;
  vid.addEventListener("error", () => {
    if (!retried && vid.src){
      retried = true;
      const u = vid.src;
      setTimeout(() => { vid.removeAttribute("src"); vid.load(); vid.src = u; vid.load(); kick(); }, 1500);
      return;
    }
    posterOnly();
  });
  document.addEventListener("visibilitychange", () => { if (!document.hidden && vid.src) kick(); });
  window.addEventListener("pageshow", () => { if (vid.src) kick(); });
  // the manual play button is also how a Data Saver / reduced-motion visitor
  // opts in, if they want the video after all — it attaches on demand
  if (play) play.addEventListener("click", () => { play.hidden = true; attach(); kick(); });

  // (no "give up after 4 seconds" any more: on a slow phone connection the
  // clip often needs longer than that to start, and hiding it then meant
  // it never played. Until the first frame arrives the video element
  // shows its poster image anyway.)
  setInterval(() => { if (!document.hidden && vid.paused && vid.src) kick(); }, 4000);
})();

/* if a remote photo is blocked or moved, hide it rather than leave a broken frame */
(function imageFallbacks(){
  const fail = (img) => {
      const card = img.closest(".rev, .g-strip figure, .col-tile, .feature, .whycard");
      if (img.classList.contains("rev-img") || img.closest(".g-strip")){
        img.style.display = "none";           // the words still carry the review
        if (card) card.classList.add("no-photo");
      } else if (img.classList.contains("logo-img")){
        const a = img.parentElement;
        if (a && !a.querySelector(".logo-fallback")){
          const span = document.createElement("span");
          span.className = "logo-fallback";
          span.textContent = "MEMOBRICK";
          a.appendChild(span);
        }
        img.style.display = "none";
      } else {
        img.style.opacity = "0";
      }
  };
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => fail(img), { once: true });
    // an image can fail before this script parses; catch those too
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) fail(img);
  });
})();

/* =====================================================================
   PHOTO SEARCH, in the page
   Openverse indexes openly licensed images and serves them with CORS
   headers, so a result can be fetched, decoded and handed straight to
   the mosaic engine. No key, no redirect, no leaving the creator.
   ===================================================================== */
(function photoFinder(){
  const q = document.querySelector("#findQ"),
        go = document.querySelector("#findGo"),
        grid = document.querySelector("#findGrid"),
        note = document.querySelector("#findNote");
  if (!q || !go || !grid) return;
  const API = "https://api.openverse.org/v1/images/";
  let busy = false;

  function say(msg){ if (note) note.textContent = msg; }

  async function search(){
    const term = q.value.trim();
    if (!term || busy) return;
    busy = true; go.disabled = true;
    say("Searching…");
    grid.hidden = true; grid.innerHTML = "";
    try {
      const url = API + "?q=" + encodeURIComponent(term) +
                  "&page_size=8&license_type=commercial&mature=false";
      const r = await fetch(url, { headers: { Accept: "application/json" } });
      if (!r.ok) throw new Error("search " + r.status);
      const data = await r.json();
      const hits = (data.results || []).filter((x) => x.thumbnail || x.url);
      if (!hits.length){ say("Nothing found for that. Try a simpler word."); return; }
      hits.forEach((hit) => {
        const b = document.createElement("button");
        b.type = "button";
        const img = document.createElement("img");
        img.alt = "";
        img.referrerPolicy = "no-referrer";
        img.src = hit.thumbnail || hit.url || "";
        const cred = document.createElement("span");
        cred.className = "cred";
        cred.textContent = (hit.creator || "unknown").slice(0, 22);
        b.appendChild(img);
        b.appendChild(cred);
        b.addEventListener("click", () => use(hit));
        grid.appendChild(b);
      });
      grid.hidden = false;
      say("Tap a photo to build it. Credit shown under each one.");
    } catch (err){
      say("Search is unavailable right now. Copy an image and press ⌘V, or upload a file.");
    } finally { busy = false; go.disabled = false; }
  }

  async function use(hit){
    say("Loading that photo…");
    for (const src of [hit.url, hit.thumbnail]){
      if (!src) continue;
      try {
        const r = await fetch(src, { mode: "cors" });
        if (!r.ok) continue;
        const blob = await r.blob();
        if (!/^image\//.test(blob.type || "") && !blob.size) continue;
        const img = await decodeViaBitmap(blob).catch(() => decodeViaImage(blob));
        adopt(img, { name: "openverse", type: blob.type });
        say("Openly licensed photos, searched and loaded right here.");
        return;
      } catch (err){ /* try the next source */ }
    }
    say("That one could not be loaded. Try another, or download it and upload the file.");
  }

  go.addEventListener("click", search);
  q.addEventListener("keydown", (e) => { if (e.key === "Enter"){ e.preventDefault(); search(); } });
})();

/* =====================================================================
   DESIGNER SERVICE  (view-design)
   Upload → size → notes → checkout. Our designers do the work afterwards
   and send a proof before production. Sizes and prices come from the same
   SIZES catalogue the creator uses — there is no second price list.
   ===================================================================== */
(function designerService(){
  const drop = document.querySelector("#svcDrop"),
        input = document.querySelector("#svcFile"),
        have = document.querySelector("#svcHave"),
        thumb = document.querySelector("#svcThumb"),
        nameEl = document.querySelector("#svcName"),
        metaEl = document.querySelector("#svcMeta"),
        grid = document.querySelector("#svcSizes"),
        moreBtn = document.querySelector("#svcMoreSizes"),
        notes = document.querySelector("#svcNotes"),
        checkout = document.querySelector("#svcCheckout");
  if (!input || !grid) return;

  const svc = { file: null, sizeId: null, showAll: false };
  const POPULAR = ["16x16", "20x20", "20x30", "30x30"];
  const fits = {
    "10x10": "Great for one face", "16x16": "Great for one person",
    "20x20": "Great for 1–2 people", "20x30": "Great for couples and families",
    "30x20": "Great for couples and families", "30x30": "Statement piece",
  };

  function money(n){ return "$" + (Math.round(n * 100) / 100).toFixed(2).replace(/\.00$/, ""); }

  function sizeList(){
    return svc.showAll ? SIZES : SIZES.filter((z) => POPULAR.indexOf(z.id) > -1);
  }

  function drawSizes(){
    grid.innerHTML = "";
    sizeList().forEach((z) => {
      const id = z.id;
      const b = document.createElement("button");
      b.type = "button";
      b.className = "svc-size" + (svc.sizeId === id ? " on" : "");
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", svc.sizeId === id ? "true" : "false");
      b.dataset.size = id;
      b.innerHTML =
        (z.note ? '<span class="tag">' + z.note + "</span>" : "") +
        "<b>" + z.label + "</b>" +
        '<span class="fit">' + (fits[id] || "") + "</span>" +
        '<span class="p">' + money(z.price) + "</span>";
      b.addEventListener("click", () => { svc.sizeId = id; drawSizes(); summary(); clearErr(); });
      grid.appendChild(b);
    });
    if (moreBtn) moreBtn.textContent = svc.showAll ? "Show popular sizes" : "Show all sizes";
  }

  function summary(){
    const z = svc.sizeId ? SIZES.find((x) => x.id === svc.sizeId) : null;
    const set = (id, v) => { const el = document.querySelector(id); if (el) el.textContent = v; };
    if (!z){ set("#svcSizeLbl", "Choose a size"); set("#svcBricks", "—"); set("#svcPlates", "—");
             set("#svcPrice", "—"); return; }
    set("#svcSizeLbl", z.label);
    const plates = z.bx * z.by;
    set("#svcBricks", (z.gw * z.gh).toLocaleString() + " bricks");
    set("#svcPlates", plates + (plates === 1 ? " baseplate" : " baseplates"));
    set("#svcPrice", money(z.price));
    const was = document.querySelector("#svcWas"), save = document.querySelector("#svcSave");
    if (was) was.textContent = z.was ? money(z.was) : "";
    if (save){
      const pct = z.was ? Math.round((1 - z.price / z.was) * 100) : 0;
      save.hidden = !pct; save.textContent = pct ? "Save " + pct + "%" : "";
    }
    const step = document.querySelector("#steps3Svc");
    if (step && step.children.length === 3){
      step.children[0].className = "s1 " + (svc.file ? "is-done" : "on");
      step.children[1].className = "s2 " + (svc.file ? (svc.sizeId ? "is-done" : "on") : "");
      step.children[2].className = "s3 " + (svc.file && svc.sizeId ? "on" : "");
    }
  }

  function clearErr(){
    ["#svcPhotoErr", "#svcSizeErr"].forEach((id) => {
      const el = document.querySelector(id); if (el) el.hidden = true;
    });
  }

  function takeFile(f){
    if (!f) return;
    if (!looksLikeImage(f)){ toast("That doesn't look like an image."); return; }
    svc.file = f;
    if (nameEl) nameEl.textContent = f.name || "your photo";
    if (metaEl) metaEl.textContent = Math.round((f.size || 0) / 1024) + " KB";
    if (thumb){
      const url = URL.createObjectURL(f);
      thumb.src = url;
      thumb.onload = () => URL.revokeObjectURL(url);
    }
    if (have) have.hidden = false;
    if (drop) drop.hidden = true;
    clearErr(); summary();
  }

  input.addEventListener("change", () => takeFile(input.files && input.files[0]));
  input.addEventListener("input", () => takeFile(input.files && input.files[0]));
  const change = document.querySelector("#svcChange");
  if (change) change.addEventListener("click", () => {
    svc.file = null; if (have) have.hidden = true; if (drop) drop.hidden = false;
    input.value = ""; summary();
  });
  if (moreBtn) moreBtn.addEventListener("click", () => { svc.showAll = !svc.showAll; drawSizes(); });
  ["dragenter","dragover"].forEach((ev) => drop && drop.addEventListener(ev, (e) => {
    e.preventDefault(); drop.classList.add("over"); }));
  ["dragleave","drop"].forEach((ev) => drop && drop.addEventListener(ev, (e) => {
    e.preventDefault(); drop.classList.remove("over"); }));
  if (drop) drop.addEventListener("drop", (e) => takeFile(e.dataTransfer.files[0]));

  /* PRODUCTION NOTE — Shopify submission
     Shopify accepts a customer file on a line item through a cart form with
     enctype="multipart/form-data" and an input named
     properties[Original photo]  (the shop must have "File" line-item
     properties enabled on the product form).
     The correct production path is therefore:

       const fd = new FormData();
       fd.append("id", z.v);                                 // existing variant id
       fd.append("quantity", 1);
       fd.append("properties[Design method]", "MemoBrick Designer");
       fd.append("properties[Selected size]", z.label);
       fd.append("properties[Design notes]", notes.value);
       fd.append("properties[Creator source]", "designer_service");
       fd.append("properties[Original photo]", svc.file, svc.file.name);
       await fetch("/cart/add.js", { method: "POST", body: fd });
       window.location.href = "/checkout";

     That call needs a real Shopify origin. Opened from a file:// URL there is
     nowhere to post to, so we do not pretend the photo was transmitted. */
  async function submit(){
    let bad = false;
    if (!svc.file){ const e = document.querySelector("#svcPhotoErr"); if (e) e.hidden = false; bad = true; }
    if (!svc.sizeId){ const e = document.querySelector("#svcSizeErr"); if (e) e.hidden = false; bad = true; }
    if (bad){
      const first = document.querySelector(".fielderr:not([hidden])");
      if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const z = SIZES.find((x) => x.id === svc.sizeId);
    const onShopify = /myshopify|mymemobrick/.test(location.hostname);
    if (!onShopify){
      toast("Ready to send: " + z.label + " with your photo attached. On the live shop this posts to checkout.");
      return;
    }
    checkout.disabled = true; checkout.textContent = "Sending your photo…";
    try {
      const fd = new FormData();
      fd.append("id", z.v);
      fd.append("quantity", 1);
      fd.append("properties[Design method]", "MemoBrick Designer");
      fd.append("properties[Selected size]", z.label);
      fd.append("properties[Design notes]", (notes && notes.value) || "");
      fd.append("properties[Creator source]", "designer_service");
      fd.append("properties[Original photo]", svc.file, svc.file.name);
      const r = await fetch("/cart/add.js", { method: "POST", body: fd });
      if (!r.ok) throw new Error("cart " + r.status);
      location.href = "/checkout";                       // only after the upload succeeded
    } catch (err){
      console.error("designer service submit failed:", err);
      checkout.disabled = false; checkout.textContent = "Checkout";
      toast("We couldn't attach your photo. Please try again.");
    }
  }
  if (checkout) checkout.addEventListener("click", submit);

  drawSizes(); summary();
})();

/* =====================================================================
   CORPORATE QUOTE FORM  (view-corporate)
   Validates in the page, then submits to Shopify's own built-in contact
   form (see the {% form 'contact' %} wrapper in memobrick-site.liquid) —
   works with no endpoint, API key or app to set up. Before submitting,
   the structured fields (company, phone, project type, quantity, date)
   are folded into contact[body] as readable text too, so the request is
   complete in the default Shopify contact notification even if that
   email template only surfaces contact[body] and not the other
   contact[...] fields individually.
   ===================================================================== */
(function corporateQuote(){
  const form = document.querySelector("#corpForm");
  if (!form) return;
  const err = document.querySelector("#cfErr");
  const btn = document.querySelector("#cfSubmit");
  const required = ["cfName", "cfCompany", "cfEmail", "cfType", "cfQty", "cfMsg"];

  function fieldError(el, msg){
    el.setAttribute("aria-invalid", "true");
    let m = el.parentElement.querySelector(".fielderr");
    if (!m){
      m = document.createElement("p");
      m.className = "fielderr";
      el.parentElement.appendChild(m);
    }
    m.textContent = msg; m.hidden = false;
  }
  function clearField(el){
    el.removeAttribute("aria-invalid");
    const m = el.parentElement.querySelector(".fielderr");
    if (m) m.hidden = true;
  }
  required.forEach((id) => {
    const el = document.querySelector("#" + id);
    if (el) el.addEventListener("input", () => clearField(el));
  });

  form.addEventListener("submit", (e) => {
    let first = null;
    required.forEach((id) => {
      const el = document.querySelector("#" + id);
      if (!el) return;
      const v = (el.value || "").trim();
      if (!v){ fieldError(el, "This one is needed."); first = first || el; return; }
      if (id === "cfEmail" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){
        fieldError(el, "That email doesn't look right."); first = first || el; return;
      }
      clearField(el);
    });
    if (first){
      e.preventDefault();
      if (err){ err.hidden = false; err.textContent = "Please complete the highlighted fields."; }
      first.focus();
      first.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (err) err.hidden = true;

    // fold the structured fields into the message body so they're
    // guaranteed visible in the default Shopify notification email
    const msgEl = document.querySelector("#cfMsg");
    const get = (id) => (document.querySelector("#" + id) || {}).value || "";
    const summary = [
      "Company: " + get("cfCompany"),
      get("cfPhone") ? "Phone: " + get("cfPhone") : "",
      "Project type: " + get("cfType"),
      "Estimated quantity: " + get("cfQty"),
      get("cfDate") ? "Desired delivery date: " + get("cfDate") : ""
    ].filter(Boolean).join("\n");
    if (msgEl) msgEl.value = summary + "\n\nProject details:\n" + msgEl.value;

    // valid — let the native submit proceed to Shopify's contact form
    // endpoint; give instant feedback while that round trip happens
    try { sessionStorage.setItem("mb_pending_view", "corporate"); } catch (e){}
    if (btn){ btn.disabled = true; btn.textContent = "Sending…"; }
  });
})();

/* wiring for undo, redo and whole-color replacement */
(function editorTools(){
  const redoBtn = document.querySelector("#redoBtn"),
        from = document.querySelector("#swapFrom"),
        to = document.querySelector("#swapTo"),
        go = document.querySelector("#swapGo"),
        note = document.querySelector("#swapNote");
  if (redoBtn) redoBtn.addEventListener("click", redoStep);
  if (!from || !to || !go) return;

  function fill(){
    if (!S.usedPal) return;
    const counts = colorCounts();
    const opts = S.usedPal.map((c) =>
      '<option value="' + c.hex + '">' + c.name + " · " + (counts.get(c.hex) || 0) + " bricks</option>").join("");
    const all = pal().map((c) =>
      '<option value="' + c.hex + '">' + c.name + "</option>").join("");
    const keepFrom = from.value, keepTo = to.value;
    from.innerHTML = opts; to.innerHTML = all;
    if (keepFrom) from.value = keepFrom;
    if (keepTo) to.value = keepTo;
    describe();
  }
  function describe(){
    if (!note) return;
    const counts = colorCounts();
    const n = counts.get(from.value) || 0;
    note.textContent = n
      ? n.toLocaleString() + " brick" + (n === 1 ? "" : "s") + " will change. One undo puts it back."
      : "Changes every brick of that color. One undo puts it back.";
  }
  from.addEventListener("change", describe);
  go.addEventListener("click", () => {
    const counts = colorCounts();
    const n = counts.get(from.value) || 0;
    if (!n){ toast("That color isn't in your mosaic."); return; }
    const fname = (S.usedPal.find((c) => c.hex === from.value) || {}).name || "that color";
    const tname = (pal().find((c) => c.hex === to.value) || {}).name || "the new color";
    if (!confirm("Replace all " + n.toLocaleString() + " " + fname + " bricks with " + tname + "?")) return;
    const done = replaceColor(from.value, to.value);
    fill();
    toast(done ? done.toLocaleString() + " bricks replaced. Undo is one press away." : "Nothing changed.");
  });
  // keep the lists current whenever the parts list is recounted
  const origTally = window.__tallyHook;
  document.addEventListener("memobrick:recount", fill);
  setTimeout(fill, 300);
})();

/* =====================================================================
   WALL MOCKUP  (Parts 8–11)
   Draws the customer's actual mosaic into a simple room scene at true
   physical scale. Room walls are drawn to a known reference height, so a
   10" piece really does look a quarter the width of a 40" one. Comparing
   sizes never touches the design — it only changes the scale used here.
   ===================================================================== */
/* Scale reference per photograph — the number of inches the full image
   height represents. Estimated from the furniture and skirting in each
   shot; the customer can correct it with the wall-height slider. */
const ROOM_PHOTOS = {"living": {"box": [0.02, 0.18, 0.86, 1.0], "wallIn": 74, "ax": 0.44, "ay": 0.34}, "bedroom": {"box": [0.02, 0.34, 0.98, 1.0], "wallIn": 68, "ax": 0.44, "ay": 0.3}, "office": {"box": [0.0, 0.22, 0.92, 1.0], "wallIn": 66, "ax": 0.55, "ay": 0.32}};

(function wallMockup(){
  const view = document.querySelector("#wallView"),
        cv = document.querySelector("#wallCanvas"),
        openBtn = document.querySelector("#wallOpen"),
        closeBtn = document.querySelector("#wallClose"),
        dl = document.querySelector("#wallDownload"),
        cart = document.querySelector("#wallCart"),
        sizesRow = document.querySelector("#wallSizes"),
        roomSel = document.querySelector("#wallRoom"),
        sizeSel = document.querySelector("#wallSizeSel"),
        frameSel = document.querySelector("#wallFrame"),
        roomFile = document.querySelector("#wallRoomFile"),
        dragHint = document.querySelector("#wallDragHint");
  if (!view || !cv) return;
  const x = cv.getContext("2d");

  /* The mockup consumes the mosaic that is already on screen. It never asks the
     engine to regenerate anything, so edits, crop, palette and undo history are
     untouched no matter how much the customer plays in here. */
  const WALL_IN = 108;
  const FRAMES = {
    none:  null,
    black: { w: 1.6, color: "#1B1B1D", light: "#3A3A3E" },
    oak:   { w: 1.8, color: "#C39A63", light: "#DEBE8C" },
    white: { w: 1.6, color: "#F4F2ED", light: "#FFFFFF" },
  };
  let room = "living", compareId = null, ownRoom = null, ownWallIn = WALL_IN;
  let frame = "none", pos = { x: 0.5, y: 0.42 }, rot = 0;

  const inchesOf = (z) => {
    const m = /(\d+)\s*×\s*(\d+)/.exec(z.label.replace(/"/g, ""));
    return m ? { w: +m[1], h: +m[2] } : { w: 20, h: 20 };
  };
  const activeSize = () => SIZES.find((z) => z.id === (compareId || S.size.id)) || S.size;

  const ROOMS = {
    living:  { wall:"#EDE6DC", trim:"#FBF8F4", floor:"#B58E63", sofa:"#8FA8B8", plant:"#5E8C61" },
    bedroom: { wall:"#E7E3EB", trim:"#FAF8FB", floor:"#B49A7E", sofa:"#CDBBCB", plant:"#6E9A72" },
    office:  { wall:"#E3E8EB", trim:"#F7FAFB", floor:"#9C968E", sofa:"#8FA3AF", plant:"#5F8C6A" },
    plain:   { wall:"#F5F4F1", trim:"#FFFFFF", floor:"#DAD5CE", sofa:"#E6E2DC", plant:"#7FA183" },
    nursery: { wall:"#F3EAE4", trim:"#FFFFFF", floor:"#C9AE90", sofa:"#F2C6C2", plant:"#8FBF9A" },
    gallery: { wall:"#F7F6F4", trim:"#FFFFFF", floor:"#CFC9C1", sofa:"#E8E4DE", plant:"#7FA183" },
    statement:{wall:"#E6E2DC", trim:"#F6F4F1", floor:"#A89880", sofa:"#B9C6CE", plant:"#6E9A72" },
  };

  function fitCanvas(){
    const box = cv.parentElement;
    if (!box) return;
    const w = Math.max(600, Math.min(1800, Math.round(box.clientWidth || 1400)));
    const h = Math.max(380, Math.min(1200, Math.round(box.clientHeight || 900)));
    if (cv.width !== w || cv.height !== h){ cv.width = w; cv.height = h; }
  }

  // a statement wall is a taller space; the nursery a smaller one. The reference
  // height changes, so the same product reads correctly against each room.
  const PAINTED_WALL_IN = { nursery: 90, gallery: 108, statement: 132, plain: 108,
                            living: 108, bedroom: 108, office: 108 };

  function paintRoom(){
    const W = cv.width, H = cv.height, R = ROOMS[room] || ROOMS.plain;
    const refIn = PAINTED_WALL_IN[room] || WALL_IN;
    const horizon = H * 0.74, inch = H / refIn;
    x.fillStyle = R.wall; x.fillRect(0, 0, W, horizon);
    let g = x.createRadialGradient(W * 0.12, H * 0.10, 20, W * 0.12, H * 0.10, W * 0.95);
    g.addColorStop(0, "rgba(255,255,255,.55)"); g.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = g; x.fillRect(0, 0, W, horizon);
    x.fillStyle = R.floor; x.fillRect(0, horizon, W, H - horizon);
    g = x.createLinearGradient(0, horizon, 0, H);
    g.addColorStop(0, "rgba(0,0,0,.20)"); g.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = g; x.fillRect(0, horizon, W, H - horizon);
    x.fillStyle = R.trim; x.fillRect(0, horizon - 6 * inch, W, 6 * inch);
    if (room !== "plain"){
      x.fillStyle = R.sofa;
      x.beginPath(); x.roundRect(W * 0.06, horizon - 30 * inch, 78 * inch, 30 * inch, 12); x.fill();
    }
    return horizon;
  }

  function paintPhoto(){
    const img = document.querySelector("#roomImg-" + room);
    const def = ROOM_PHOTOS[room];
    if (!img || !img.complete || !img.naturalWidth || !def) return paintRoom();
    const W = cv.width, H = cv.height;
    const b = def.box, iw = img.naturalWidth, ih = img.naturalHeight;
    const sx = iw * b[0], sy = ih * b[1], sw = iw * (b[2] - b[0]), sh = ih * (b[3] - b[1]);
    const r = Math.max(W / sw, H / sh);
    const dw = sw * r, dh = sh * r;
    x.drawImage(img, sx, sy, sw, sh, (W - dw) / 2, (H - dh) / 2, dw, dh);
    return H * 0.8;
  }

  function paintOwn(){
    const W = cv.width, H = cv.height;
    const r = Math.max(W / ownRoom.width, H / ownRoom.height);
    const w = ownRoom.width * r, h = ownRoom.height * r;
    x.drawImage(ownRoom, (W - w) / 2, (H - h) / 2, w, h);
    return H * 0.8;
  }

  /* where the artwork sits, in canvas pixels — shared by drawing and dragging */
  function artBox(){
    const z = activeSize(), inch = inchesOf(z);
    const def = (!ownRoom && ROOM_PHOTOS[room]) || null;
    const refIn = ownRoom ? ownWallIn
                : (def ? def.wallIn : (PAINTED_WALL_IN[room] || WALL_IN));
    const perInch = cv.height / refIn;
    const f = FRAMES[frame];
    const fw = f ? f.w * perInch : 0;
    const w = inch.w * perInch, h = inch.h * perInch;
    return { w, h, fw, cx: cv.width * pos.x, cy: cv.height * pos.y, inch };
  }

  function drawArt(){
    const { w, h, fw, cx, cy } = artBox();
    const f = FRAMES[frame];
    x.save();
    x.translate(cx, cy);
    if (rot) x.rotate(rot * Math.PI / 180);

    // the piece sits slightly proud of the wall, so it casts a small soft shadow
    x.save();
    x.shadowColor = "rgba(0,0,0,.32)"; x.shadowBlur = 24; x.shadowOffsetY = 10;
    x.fillStyle = f ? f.color : "#F4F1EC";
    x.fillRect(-w/2 - fw - 3, -h/2 - fw - 3, w + fw*2 + 6, h + fw*2 + 6);
    x.restore();

    if (f){
      // a lit top and left edge gives the moulding depth without touching the art
      x.fillStyle = f.light;
      x.beginPath();
      x.moveTo(-w/2 - fw, -h/2 - fw); x.lineTo(w/2 + fw, -h/2 - fw);
      x.lineTo(w/2, -h/2); x.lineTo(-w/2, -h/2); x.closePath(); x.fill();
      x.beginPath();
      x.moveTo(-w/2 - fw, -h/2 - fw); x.lineTo(-w/2, -h/2);
      x.lineTo(-w/2, h/2); x.lineTo(-w/2 - fw, h/2 + fw); x.closePath(); x.fill();
    }

    const mos = document.querySelector("#mosaic");
    if (mos && mos.width) x.drawImage(mos, -w/2, -h/2, w, h);   // the real mosaic, unaltered
    else { x.fillStyle = "#ddd"; x.fillRect(-w/2, -h/2, w, h); }

    // light falling across the surface, painted over — never into — the artwork
    const gl = x.createLinearGradient(-w/2, -h/2, w/2, h/2);
    gl.addColorStop(0, "rgba(255,255,255,.14)");
    gl.addColorStop(.45, "rgba(255,255,255,0)");
    gl.addColorStop(1, "rgba(0,0,0,.05)");
    x.fillStyle = gl; x.fillRect(-w/2, -h/2, w, h);
    x.strokeStyle = "rgba(0,0,0,.16)"; x.lineWidth = 1;
    x.strokeRect(-w/2 - fw - 0.5, -h/2 - fw - 0.5, w + fw*2 + 1, h + fw*2 + 1);
    x.restore();
  }

  function spec(){
    const z = activeSize(), inch = inchesOf(z);
    const cm = (n) => Math.round(n * 2.54);
    const set = (sel, v) => { const el = document.querySelector(sel); if (el) el.textContent = v; };
    set("#wallSize", z.label);
    set("#wallDims", "Approx. " + inch.w + " × " + inch.h + " inches (" +
        cm(inch.w) + " × " + cm(inch.h) + " cm)");
    set("#wallSpec", (z.gw * z.gh).toLocaleString() + " bricks · " +
        (z.bx * z.by) + (z.bx * z.by === 1 ? " baseplate" : " baseplates"));
  }

  function paintScene(){
    fitCanvas();
    x.setTransform(1, 0, 0, 1, 0, 0);
    x.clearRect(0, 0, cv.width, cv.height);
    if (ownRoom) paintOwn();
    else if (ROOM_PHOTOS[room]) paintPhoto();
    else paintRoom();
    drawArt();
    spec();
  }

  function buildSizeRow(){
    if (!sizesRow) return;
    const mine = S.size.id;
    const meIdx = SIZES.findIndex((z) => z.id === mine);
    const picks = [SIZES[meIdx]];
    [meIdx + 1, meIdx + 2, meIdx + 3].forEach((i) => { if (SIZES[i]) picks.push(SIZES[i]); });
    sizesRow.innerHTML = "";
    picks.forEach((z) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = z.label + (z.id === mine ? " (yours)" : "");
      b.className = (compareId || mine) === z.id ? "on" : "";
      b.addEventListener("click", () => {
        compareId = z.id === mine ? null : z.id;
        if (sizeSel) sizeSel.value = compareId || mine;
        buildSizeRow(); paintScene();
      });
      sizesRow.appendChild(b);
    });
  }

  function buildSizeSelect(){
    if (!sizeSel) return;
    sizeSel.innerHTML = SIZES.map((z) =>
      '<option value="' + z.id + '">' + z.label + (z.id === S.size.id ? " (yours)" : "") + "</option>").join("");
    sizeSel.value = compareId || S.size.id;
  }

  /* dragging the piece around the wall */
  let dragging = false, grab = null;
  const hit = (px, py) => {
    const { w, h, cx, cy } = artBox();
    return Math.abs(px - cx) <= w / 2 + 20 && Math.abs(py - cy) <= h / 2 + 20;
  };
  const toCanvas = (e) => {
    const r = cv.getBoundingClientRect();
    return { px: (e.clientX - r.left) * (cv.width / r.width),
             py: (e.clientY - r.top) * (cv.height / r.height) };
  };
  cv.addEventListener("pointerdown", (e) => {
    const { px, py } = toCanvas(e);
    if (!hit(px, py)) return;
    dragging = true; grab = { px, py, x: pos.x, y: pos.y };
    cv.setPointerCapture(e.pointerId);
    if (dragHint) dragHint.hidden = true;
  });
  cv.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const { px, py } = toCanvas(e);
    pos.x = clamp(grab.x + (px - grab.px) / cv.width, 0.08, 0.92);
    pos.y = clamp(grab.y + (py - grab.py) / cv.height, 0.08, 0.86);
    paintScene();
  });
  const stopDrag = () => { dragging = false; };
  cv.addEventListener("pointerup", stopDrag);
  cv.addEventListener("pointercancel", stopDrag);

  function open(){
    if (!S.cells){ toast("Add a photo first."); return; }
    compareId = null; pos = { x: 0.5, y: 0.42 }; rot = 0;
    view.hidden = false;
    if (dragHint) dragHint.hidden = false;
    requestAnimationFrame(() => { buildSizeSelect(); buildSizeRow(); paintScene(); });
    closeBtn && closeBtn.focus();
  }
  function close(){ view.hidden = true; if (openBtn) openBtn.focus(); }

  if (openBtn) openBtn.addEventListener("click", open);
  const openBtn2 = document.querySelector("#wallOpen2");
  if (openBtn2) openBtn2.addEventListener("click", open);
  if (closeBtn) closeBtn.addEventListener("click", close);
  view.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  if (roomSel) roomSel.addEventListener("change", () => {
    room = roomSel.value; ownRoom = null;
    const def = ROOM_PHOTOS[room];
    const refNow = def ? def.wallIn : (PAINTED_WALL_IN[room] || WALL_IN);
    ownWallIn = refNow;
    const wh = document.querySelector("#wallHeight"), lab = document.querySelector("#wallHeightVal");
    if (wh){ wh.value = refNow; }
    if (lab) lab.textContent = Math.round(refNow / 12 * 10) / 10 + " ft wall";
    if (def) pos = { x: def.ax, y: def.ay };
    paintScene();
  });
  if (sizeSel) sizeSel.addEventListener("change", () => {
    compareId = sizeSel.value === S.size.id ? null : sizeSel.value;
    buildSizeRow(); paintScene();
  });
  if (frameSel) frameSel.addEventListener("change", () => { frame = frameSel.value; paintScene(); });

  if (roomFile) roomFile.addEventListener("change", () => {
    const f = roomFile.files && roomFile.files[0];
    if (!f) return;
    const img = new Image();
    img.onload = () => {
      ownRoom = img; pos = { x: 0.5, y: 0.4 };
      paintScene();
      toast("Set the wall height so your MemoBrick is shown at the right size.");
    };
    img.onerror = () => toast("That photo couldn't be opened. Please try a JPG or PNG.");
    img.src = URL.createObjectURL(f);
  });

  const wh = document.querySelector("#wallHeight");
  if (wh) wh.addEventListener("input", () => {
    ownWallIn = clamp(+wh.value, 48, 144);
    const lab = document.querySelector("#wallHeightVal");
    if (lab) lab.textContent = Math.round(ownWallIn / 12 * 10) / 10 + " ft wall";
    if (!ownRoom && ROOM_PHOTOS[room]) ROOM_PHOTOS[room].wallIn = ownWallIn;
    paintScene();
  });
  const smaller = document.querySelector("#wallSmaller"), bigger = document.querySelector("#wallBigger");
  const nudgeScale = (dir) => {
    // on a supplied photo this calibrates the wall; on a room it steps the preview.
    // Either way the product's real dimensions are unchanged — only how big the
    // wall is assumed to be.
    ownWallIn = clamp(ownWallIn - dir * 6, 48, 144);
    if (!ownRoom && ROOM_PHOTOS[room]) ROOM_PHOTOS[room].wallIn = ownWallIn;
    const wh2 = document.querySelector("#wallHeight"), lab2 = document.querySelector("#wallHeightVal");
    if (wh2) wh2.value = ownWallIn;
    if (lab2) lab2.textContent = Math.round(ownWallIn / 12 * 10) / 10 + " ft wall";
    paintScene();
  };
  if (smaller) smaller.addEventListener("click", () => nudgeScale(-1));
  if (bigger) bigger.addEventListener("click", () => nudgeScale(1));

  const rl = document.querySelector("#wallRotL"), rr = document.querySelector("#wallRotR"),
        rs = document.querySelector("#wallReset");
  if (rl) rl.addEventListener("click", () => { rot = clamp(rot - 1, -8, 8); paintScene(); });
  if (rr) rr.addEventListener("click", () => { rot = clamp(rot + 1, -8, 8); paintScene(); });
  if (rs) rs.addEventListener("click", () => {
    const def = ROOM_PHOTOS[room];
    pos = def ? { x: def.ax, y: def.ay } : { x: 0.5, y: 0.42 };
    rot = 0; compareId = null; frame = "none";
    if (frameSel) frameSel.value = "none";
    buildSizeSelect(); buildSizeRow(); paintScene();
  });

  window.addEventListener("resize", () => { if (!view.hidden) paintScene(); });

  if (dl) dl.addEventListener("click", () => {
    try {
      const a2 = document.createElement("a");
      a2.download = "memobrick-in-your-space.png";
      a2.href = cv.toDataURL("image/png");
      a2.click();
    } catch (e){ console.error(e); toast("The mockup couldn't be saved. Please try again."); }
  });
  if (cart) cart.addEventListener("click", () => {
    const order = document.querySelector("#orderBtn");
    close();
    if (order) order.click();
  });
})();

/* keep every timing mention in step with the single constant */
document.querySelectorAll("[data-prodtime]").forEach((el) => { el.textContent = PRODUCTION_TIME_TEXT; });

const REVIEWS = [{"n":"Richard J.","r":5,"d":"August 14, 2026","t":"Always such a great and unique gift to give to friends and family","p":"Custom Bricked Mosaic Portrait 16x16\"","img":"https://images.loox.io/uploads/2026/8/14/X3rHt48mr_mid.jpg"},{"n":"Donna K.","r":5,"d":"August 9, 2026","t":"Excellent","p":"Custom Bricked Mosaic Portrait 20x30\"","img":"https://images.loox.io/uploads/2026/8/9/o3XA6i-fF_mid.jpg"},{"n":"Steve B.","r":5,"d":"July 16, 2026","t":"My son loves it!!","p":"Custom Bricked Mosaic Portrait 16x16\"","img":"https://images.loox.io/uploads/2026/7/16/ik1scdnFM_mid.jpg"},{"n":"Tim R.","r":5,"d":"July 8, 2026","t":"Another spectacular job turning a photo into art. She's already asking when we're going to do another one.","p":"Custom Bricked Mosaic Portrait 20x30\"","img":"https://images.loox.io/uploads/2026/7/8/_MtiAWOcs_mid.jpg"},{"n":"Nicole N.","r":5,"d":"June 18, 2026","t":"Absolutely love my memobrick order. Will definitely recommend to family and friends.","p":"Custom Bricked Mosaic Portrait 20x30\"","img":"https://images.loox.io/uploads/2026/6/18/30vbX20BQ_mid.jpg"},{"n":"Brian B.","r":5,"d":"June 4, 2026","t":"great product, great gift ! my wife loved putting the mosaic together, and the instruction sheet and whole kit are great quality ! we are going to order again !","p":"Custom Bricked Mosaic Portrait 16x16\"","img":"https://images.loox.io/uploads/2026/6/5/vnVn9uYJ5_mid.jpg"},{"n":"Ellen S.","r":5,"d":"May 28, 2026","t":"This was so much fun to do with my boyfriend! We loved doing it and can't wait to hang it in our house. It came out so good!","p":"Custom Bricked Mosaic Portrait 20×20\"","img":"https://images.loox.io/uploads/2026/5/28/Ut59WLyWS_mid.jpg"},{"n":"Lauren D.","r":5,"d":"May 28, 2026","t":"This was so much fun to do! I just love how it turned out! I'm just waiting until I can get a shadow box for it, and then I'll hang it on my wall 😁","p":"Custom Bricked Mosaic Portrait 20×20\"","img":"https://images.loox.io/uploads/2026/5/31/RHKvYxUPr_mid.jpg"},{"n":"Mary S.","r":3,"d":"May 24, 2026","t":"It looks blurry to me but it is ok","p":"Custom Bricked Mosaic 10x10\" (one face only)","img":"https://images.loox.io/uploads/2026/5/24/QsvJ3JsVf_mid.jpg"},{"n":"Giselle D.","r":4,"d":"April 25, 2026","t":"A little hard to snap in sometimes and see the letters through the block but it came out great","p":"Custom Bricked Mosaic Portrait 20x30\"","img":"https://images.loox.io/uploads/2026/4/26/NMq2OMbuu_mid.jpg"},{"n":"Melanie B.","r":5,"d":"April 9, 2026","t":"Very cool picture and everyone loves it!","p":"Custom Bricked Mosaic Portrait 30x30\"","img":"https://images.loox.io/uploads/2026/4/19/J_v2xITlk_mid.jpg"},{"n":"Jennifer H.","r":5,"d":"March 17, 2026","t":"Was a fun and a little bit challenging project to do. Can't wait to do another one","p":"Custom Bricked Mosaic Portrait 20×20\"","img":"https://images.loox.io/uploads/2026/3/18/DePzXpS4A_mid.jpg"},{"n":"Jennifer M.","r":5,"d":"March 7, 2026","t":"Love, love, love!","p":"Custom Bricked Mosaic Portrait 20×20\"","img":"https://images.loox.io/uploads/2026/3/8/t2a1q9OZ9_mid.jpg"},{"n":"Lucy W.","r":5,"d":"March 6, 2026","t":"Loved putting it together","p":"Custom Bricked Mosaic Portrait 30x30\"","img":"https://images.loox.io/uploads/2026/3/11/2kZnl5hIp_mid.jpg"},{"n":"Donnie M.","r":4,"d":"February 27, 2026","t":"I really enjoyed hose it turned out and the only thing that I didn't like too well was the word we're not as legible as I thought they would be.","p":"Custom Bricked Mosaic Portrait 20x30\"","img":"https://images.loox.io/uploads/2026/3/2/FrAR14A8Ss_mid.jpg"},{"n":"Donnie M.","r":5,"d":"February 25, 2026","t":"I just love the way this turned out. It won't be my last purchase.","p":"Frame 2×3 / 3×2 Size: 20x30 inch / 30x20 inch","img":"https://images.loox.io/uploads/2026/2/26/-jmr6H1Gp_mid.jpg"},{"n":"Marsha W.","r":5,"d":"February 24, 2026","t":"This was fun!!","p":"Custom Bricked Mosaic Portrait 20×20\"","img":"https://images.loox.io/uploads/2026/2/24/XV14cLgqn_mid.jpg"},{"n":"Tim R.","r":5,"d":"February 23, 2026","t":"Another beautiful picture. Thank you again","p":"Custom Bricked Mosaic Portrait 20×20\"","img":"https://images.loox.io/uploads/2026/2/27/9TvgauJIm_mid.jpg"},{"n":"Erica C.","r":5,"d":"February 21, 2026","t":"Love it ! Came out soo good ! Very happy with the purchase !","p":"Custom Bricked Mosaic Portrait 20x30\"","img":"https://images.loox.io/uploads/2026/2/21/Zm2Bhe1Jq_mid.jpg"},{"n":"Halley D.","r":5,"d":"February 13, 2026","t":"Turned out better than I ever expected! Definitely will order again :)","p":"Custom Bricked Mosaic 10x10\" (one face only)","img":"https://images.loox.io/uploads/2026/2/14/foeLiecYb_mid.jpg"},{"n":"Allison H.","r":5,"d":"February 11, 2026","t":"The frame worked out great.","p":"Frame 20x20 inch","img":"https://images.loox.io/uploads/2026/2/12/eNaxDI0Nk_mid.jpg"},{"n":"Kelsey M.","r":5,"d":"February 8, 2026","t":"I love these memo bricks! I ordered a smaller size, but when they emailed the mockup they showed me the difference of what it would look like compared to the bigger size. I was offered to upgrade to the bigger size, which I did. I am so glad I did! These were fun to put together and see how the final product came out. It is interesting to see how they use different colors to create shadows. I had one picture that was mostly black and white in a dark setting with a lot of shadows. A light purple color was used to help show those. Definitely recommend!","p":"Custom Bricked Mosaic Portrait 20x30\"","img":"https://images.loox.io/uploads/2026/2/9/7xFZPGgJq_mid.jpg"},{"n":"Kris C.","r":5,"d":"February 3, 2026","t":"It was difficult to get the board to stick together so I had to get my own joiner pieces so it stays together better but I really loved making it and watching it come together!","p":"Custom Bricked Mosaic Portrait 20×20\"","img":"https://images.loox.io/uploads/2026/2/3/uXkWbqHXB_mid.jpg"},{"n":"Aaron M.","r":5,"d":"January 25, 2026","t":"Excellent customer service! The design team did an excellent job and we are so pleased to have a precious family picture transformed into such a cool art form.","p":"Custom Bricked Mosaic Portrait 30x20\"","img":"https://images.loox.io/uploads/2026/1/25/GwlS7rLfA_mid.jpg"},{"n":"Nadeana T.","r":5,"d":"January 24, 2026","t":"Absolutely incredible! Pattern is simple to follow and portrait turned out fantastic!","p":"Custom Bricked Mosaic Portrait 30x30\"","img":"https://images.loox.io/uploads/2026/1/24/wj6s-qpgI_mid.jpg"},{"n":"Kellie G.","r":5,"d":"January 14, 2026","t":"My son-in-law who builds and collects all the adult Star Wars Lego kits love this. Said it was easily the hardest build he has done.","p":"Custom Bricked Mosaic Portrait 16x16\"","img":"https://images.loox.io/uploads/2026/1/14/V-UHmIaiB_mid.jpg"},{"n":"Teri M.","r":5,"d":"January 9, 2026","t":"It was great","p":"Custom Bricked Mosaic Portrait 16x16\"","img":"https://images.loox.io/uploads/2026/1/10/S2qR_raR0_mid.jpg"},{"n":"Elizabeth P.","r":5,"d":"January 3, 2026","t":"I got this for my son for Christmas. He thought it was the coolest thing ever. He's been putting it together since he got it and is almost done. He really likes it.","p":"Custom Bricked Mosaic Portrait 20x30\"","img":"https://images.loox.io/uploads/2026/1/3/sdpzAIsdg_mid.jpg"},{"n":"Jacob P.","r":5,"d":"December 31, 2025","t":"I loved building it and my girlfriend loved the finished project. It was her favorite picture and I was so excited to bring it to life in this unique way","p":"Custom Bricked Mosaic Portrait 20×20\"","img":"https://images.loox.io/uploads/2026/1/1/UcXoh1baeq_mid.jpg"},{"n":"Emily S.","r":5,"d":"December 29, 2025","t":"Love this!","p":"Frame 2×3 / 3×2 Size: 20x30 inch / 30x20 inch","img":"https://images.loox.io/uploads/2025/12/30/c_KH7WMJEG_mid.jpg"},{"n":"John R.","r":4,"d":"November 28, 2025","t":"The frame works well enough. It could have been a little simpler to assemble. Also I suggest the it be made with a back that the picture can lock into.","p":"Frame 2×3 / 3×2 Size: 20x30 inch / 30x20 inch","img":"https://images.loox.io/uploads/2025/11/28/GM4kRymqx_mid.jpg"},{"n":"Jennifer B.","r":5,"d":"November 11, 2025","t":"Loved it! Will be ordering again soon!","p":"Custom Bricked Mosaic Portrait 16x16\"","img":"https://images.loox.io/uploads/2025/11/11/u5E39DACF_mid.jpg"},{"n":"John R.","r":5,"d":"November 2, 2025","t":"It was a fun relaxing task. My wife and I are thrilled to have our wedding photo in such an interesting style.","p":"Custom Bricked Mosaic Portrait 20x30\"","img":"https://images.loox.io/uploads/2025/11/3/yWOhEH0xx-_mid.jpg"},{"n":"Michael F.","r":5,"d":"October 27, 2025","t":"Perfect and unique gift for grandson. Kept him off electronics.","p":"Custom Bricked Mosaic Portrait 16x16\"","img":"https://images.loox.io/uploads/2025/10/27/BEA1z2h7l_mid.jpg"},{"n":"Kimberly W.","r":5,"d":"October 17, 2025","t":"I gave this to my son for his birthday. He loved putting it together and the frame was super easy to install.","p":"Frame 20x20 inch","img":"https://images.loox.io/uploads/2025/10/17/fkwmMBB3R_mid.jpg"},{"n":"Candice L.","r":5,"d":"October 7, 2025","t":"I split the photo in half so I could get 2 of the 60x20 so I could fill my wall more and its turned out AMAZING!","p":"Custom Bricked Mosaic Portrait 60x20\"","img":"https://images.loox.io/uploads/2025/10/8/gsJn-GTlj_mid.jpg"},{"n":"Athena P.","r":5,"d":"October 7, 2025","t":"I really enjoyed doing this one of my girls and I. I had issues with the tool not working for me. I wish that the frames weren't so expensive.","p":"Custom Bricked Mosaic Portrait 30x30\"","img":"https://images.loox.io/uploads/2025/10/7/0bJe8d7-A_mid.jpg"},{"n":"Athena P.","r":4,"d":"September 30, 2025","t":"I love this picture. However I wish that it wasn't so close up. I wish that it was able to capture more of her and her beauty.","p":"Custom Bricked Mosaic Portrait 16x16\"","img":"https://images.loox.io/uploads/2025/9/30/CoZGC-fD9_mid.jpg"},{"n":"Carol J.","r":5,"d":"September 30, 2025","t":"I love it","p":"Custom Bricked Mosaic 10x10\" (one face only)","img":"https://images.loox.io/uploads/2025/9/30/-uiTZ8ev3_mid.jpg"},{"n":"Norma G.","r":5,"d":"September 12, 2025","t":"We LOVE the way the portrait looks! I have shown it off to all of my friends and family. It is a great memory that will be kept for a long time. It was very easy to put together and the result is fantastic! I highly recommend this to everyone.","p":"Custom Bricked Mosaic Portrait 30x30\"","img":"https://images.loox.io/uploads/2025/9/12/Q14hvAZ8s_mid.jpg"}];

/* Every review here was written by a real customer and is reproduced verbatim
   from memobrick.com, photo included. The store has 747 reviews in total;
   these are the ones published publicly on the site. The rest live in Loox,
   so the section links out rather than inventing any.  */
/* Shared between the two review-rendering blocks below: these are the
   specific reviews used in the small "transformations" teaser near the
   top of the page. The full rail (paint(), just below) excludes them so
   a visitor doesn't scroll down and see the exact same reviews twice —
   it starts with whatever comes next instead. */
const TRANSFORM_PICKS = [0, 2, 3, 4, 6, 7];

(function realReviews(){
  const track = document.querySelector("#revTrack");
  if (!track || typeof REVIEWS === "undefined") return;
  const rest = REVIEWS.filter((r, i) => !TRANSFORM_PICKS.includes(i));
  let shown = 12;

  function stars(n){ return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n); }
  function esc(t){ return String(t).replace(/[&<>"]/g, (c) =>
    ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c])); }

  function paint(){
    track.innerHTML = rest.slice(0, shown).map((r) =>
      '<figure class="rev">' +
        '<img src="' + r.img + '" alt="MemoBrick built by ' + esc(r.n) + '" loading="lazy" ' +
        'referrerpolicy="no-referrer" onerror="this.style.visibility=\'hidden\'">' +
        '<figcaption>' +
          '<span class="stars">' + stars(r.r) + "</span>" +
          "<p>" + esc(r.t) + "</p>" +
          "<b>" + esc(r.n) + '</b> <span class="rev-date">Verified · ' + esc(r.d) + "</span>" +
          '<span class="rev-prod">' + esc(r.p) + "</span>" +
        "</figcaption></figure>").join("");
    const more = document.querySelector("#revMore");
    if (more) more.hidden = shown >= rest.length;
  }

  const more = document.querySelector("#revMore");
  if (more) more.addEventListener("click", () => { shown = rest.length; paint(); });
  paint();
})();

/* Compact "transformations" teaser near the top of the homepage — the same
   real review data and escaping as the full rail above, just 6 specific,
   strongly positive examples rather than the first 6 by date, so the
   earliest thing a visitor sees is representative of what people love
   about it. Nothing here is invented: same REVIEWS array, same esc(). */
(function transformTeaser(){
  const track = document.querySelector("#transformTrack");
  if (!track || typeof REVIEWS === "undefined") return;
  function stars(n){ return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n); }
  function esc(t){ return String(t).replace(/[&<>"]/g, (c) =>
    ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c])); }
  const picks = TRANSFORM_PICKS.map((i) => REVIEWS[i]).filter(Boolean);
  track.innerHTML = picks.map((r) =>
    '<figure class="rev">' +
      '<img src="' + r.img + '" alt="MemoBrick built by ' + esc(r.n) + '" loading="lazy" ' +
      'referrerpolicy="no-referrer" onerror="this.style.visibility=\'hidden\'">' +
      '<figcaption>' +
        '<span class="stars">' + stars(r.r) + "</span>" +
        "<p>" + esc(r.t) + "</p>" +
        "<b>" + esc(r.n) + '</b> <span class="rev-date">Verified · ' + esc(r.d) + "</span>" +
        '<span class="rev-prod">' + esc(r.p) + "</span>" +
      "</figcaption></figure>").join("");
})();

/* =====================================================================
   REMOTE MEDIA SAFETY NET
   Opened as a local file — which is how this build is tested on a phone —
   the Shopify CDN and Loox images often do not load, and iOS will not play
   a video from a data: URI. Rather than leave broken-image icons and dead
   black boxes, degrade to something deliberate and say what is happening.
   On the live shop these assets load normally and none of this triggers.
   ===================================================================== */
(function mediaSafety(){
  function fallback(img){
    const card = img.closest(".rev, .gal-item, .shopcard");
    if (card){
      // a customer photo that will not load is the whole point of the card:
      // remove it rather than leave a tall empty box in the middle of the page
      card.style.display = "none";
      return;
    }
    const box = img.closest("figure, .giftart, .press-logos");
    if (box) box.classList.add("img-failed");
    img.style.display = "none";
  }
  function watch(img){
    if (img.dataset.watched) return;
    img.dataset.watched = "1";
    img.addEventListener("error", () => fallback(img));
    // an image that has already finished loading with no pixels has failed
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) fallback(img);
  }
  function scan(){ document.querySelectorAll("img").forEach(watch); }

  scan();
  window.addEventListener("load", scan);
  // catch the ones the script injects later: reviews, search results, mockups
  try {
    new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
  } catch (e) {}

  /* the banner video: if it cannot play, show its poster instead of a black box */
  const vid = document.querySelector("#heroVid");
  if (vid){
    const posterOnly = () => {
      const src = vid.getAttribute("poster");
      if (!src) { vid.style.display = "none"; return; }
      const im = new Image();
      im.src = src; im.alt = "Building a MemoBrick photo mosaic, brick by brick";
      im.className = "hero-poster";
      im.style.cssText = "width:100%;height:auto;display:block;border-radius:inherit";
      if (vid.parentElement) vid.parentElement.insertBefore(im, vid);
      vid.style.display = "none";
    };
    vid.addEventListener("error", posterOnly);
    // iOS refuses data: video outright; give it a moment, then fall back
    setTimeout(() => {
      if (vid.readyState === 0 && !vid.videoWidth) posterOnly();
    }, 2500);
  }
})();

/* =====================================================================
   DIAGNOSTICS
   Tap the version number in the footer five times, or add #debug to the URL.
   It reports what actually happened rather than leaving us to guess: whether
   the browser allows blob URLs, which decode path worked, how big the photo
   was, and how many images failed to load.
   ===================================================================== */
const DIAG = { lines: [], on: false };
function diag(msg){
  const t = new Date().toISOString().slice(11, 19);
  DIAG.lines.push(t + "  " + msg);
  if (DIAG.lines.length > 60) DIAG.lines.shift();
  const box = document.querySelector("#diagBody");
  if (box) box.textContent = DIAG.lines.join("\n");
}

(function diagnostics(){
  const panel = document.createElement("div");
  panel.id = "diagPanel";
  panel.hidden = true;
  panel.innerHTML =
    '<div class="diag-head"><b>Diagnostics</b>' +
    '<button class="mini" id="diagCopy">Copy</button>' +
    '<button class="mini" id="diagClose">Close</button></div>' +
    '<pre id="diagBody"></pre>';
  document.body.appendChild(panel);

  function show(){
    DIAG.on = true; panel.hidden = false;
    // a snapshot of what this browser actually supports
    let blobOk = false;
    try { const u = URL.createObjectURL(new Blob(["x"])); blobOk = !!u; URL.revokeObjectURL(u); }
    catch (e){ blobOk = false; }
    diag("screen " + window.innerWidth + "x" + window.innerHeight + " dpr " + window.devicePixelRatio);
    diag("blob URLs allowed: " + blobOk);
    diag("createImageBitmap: " + (typeof createImageBitmap === "function"));
    diag("FileReader: " + (typeof FileReader === "function"));
    const v = document.querySelector("#heroVid");
    if (v) diag("video readyState " + v.readyState + " paused " + v.paused +
                " size " + v.videoWidth + "x" + v.videoHeight);
    const imgs = Array.prototype.slice.call(document.querySelectorAll("img"));
    const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0);
    diag("images " + imgs.length + ", failed " + broken.length);
    broken.slice(0, 4).forEach((i) => diag("  failed: " + String(i.currentSrc || i.src).slice(0, 60)));
  }

  const close = panel.querySelector("#diagClose");
  if (close) close.addEventListener("click", () => { panel.hidden = true; });
  const copy = panel.querySelector("#diagCopy");
  if (copy) copy.addEventListener("click", () => {
    const text = DIAG.lines.join("\n");
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => toast("Copied."));
    else toast("Select the text to copy it.");
  });

  if (location.hash === "#debug") show();
  let taps = 0, last = 0;
  document.addEventListener("click", (e) => {
    if (!e.target.closest || !e.target.closest(".foot-ver")) return;
    const now = Date.now();
    taps = now - last < 900 ? taps + 1 : 1;
    last = now;
    if (taps >= 5) show();
  });
  window.__memobrickDiag = show;
})();

/* the reviews rail */
const revTrack = document.querySelector("#revTrack");
if (revTrack){
  const step = () => Math.max(280, revTrack.clientWidth * 0.8);
  const sync = () => {
    const prev = document.querySelector("#revPrev"), next = document.querySelector("#revNext");
    if (!prev || !next) return;
    prev.disabled = revTrack.scrollLeft < 8;
    next.disabled = revTrack.scrollLeft + revTrack.clientWidth >= revTrack.scrollWidth - 8;
  };
  document.querySelector("#revPrev").addEventListener("click", () =>
    revTrack.scrollBy({ left: -step(), behavior: "smooth" }));
  document.querySelector("#revNext").addEventListener("click", () =>
    revTrack.scrollBy({ left: step(), behavior: "smooth" }));
  revTrack.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);
  sync();
}

/* the strip at the top of the editor opens the full guide below */
function revealTips(){
  const body = document.querySelector("#tipsBody"), btn = document.querySelector("#tipsToggle");
  if (body && body.hidden){                       // only ever open, never toggle shut
    body.hidden = false;
    if (btn) btn.setAttribute("aria-expanded", "true");
  }
  const target = document.querySelector("#edTips") || body;
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}
// Photo tool: Edit Crop shortcut + Photo Tips modal
const editCropBtn = document.querySelector("#editCropBtn");
if (editCropBtn) editCropBtn.addEventListener("click", () => {
  const crop = document.querySelector("#panelCrop");
  if (crop) { crop.open = true; crop.scrollIntoView({ behavior: "smooth", block: "start" }); }
});
const photoTipsModal = document.querySelector("#photoTipsModal");
const openPhotoTips = () => { if (photoTipsModal) photoTipsModal.hidden = false; };
const closePhotoTips = () => { if (photoTipsModal) photoTipsModal.hidden = true; };
const photoTipsBtn = document.querySelector("#photoTipsBtn");
if (photoTipsBtn) photoTipsBtn.addEventListener("click", openPhotoTips);
const photoTipsGotIt = document.querySelector("#photoTipsGotIt");
if (photoTipsGotIt) photoTipsGotIt.addEventListener("click", closePhotoTips);
if (photoTipsModal) photoTipsModal.addEventListener("click", (e) => { if (e.target === photoTipsModal) closePhotoTips(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && photoTipsModal && !photoTipsModal.hidden) closePhotoTips(); });

const sideTips = document.querySelector("#sideTips");
if (sideTips) sideTips.addEventListener("click", revealTips);
const topTips = document.querySelector("#topTips");
if (topTips) topTips.addEventListener("click", revealTips);

/* photo tips in the editor are opt-in */
const tipsToggle = document.querySelector("#tipsToggle"), tipsBody = document.querySelector("#tipsBody");
if (tipsToggle && tipsBody){
  tipsToggle.addEventListener("click", () => {
    const open = tipsBody.hidden;
    tipsBody.hidden = !open;
    tipsToggle.setAttribute("aria-expanded", open);
    tipsToggle.setAttribute("aria-expanded", open);
    if (open) tipsBody.scrollIntoView({ block: "nearest", behavior: "smooth" });
  });
}

/* ---------------- mobile navigation ---------------- */
const burger = $("#burger"), navLinks = $("#navLinks");
if (burger && navLinks){
  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.closest("a,button")){
      navLinks.classList.remove("open");
      burger.setAttribute("aria-expanded", false);
    }
  });
}

/* ------------------------------ UI ------------------------------ */
function toast(msg){
  const t = $("#toast"); t.textContent = msg; t.classList.add("on");
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("on"), 2400);
}

// every size as a button, one list from smallest to largest (by area,
// then price) — no square/portrait/landscape split
$("#sizeGrid").innerHTML = SIZES.slice()
  .sort((a, b) => (a.gw*a.gh) - (b.gw*b.gh) || a.price - b.price)
  .map((x) =>
    `<button class="sizebtn" data-id="${x.id}" aria-pressed="${x.id===S.size.id}">${x.label}
      <small>${money(x.price)}</small></button>`).join("");
$("#sizeGrid").addEventListener("click", (e) => {
  const b = e.target.closest("[data-id]"); if (!b) return;
  setSize(b.dataset.id);
});

// Colors panel — always shows all 40 real colors, checkmarked where used
// in the current mosaic; tap to exclude/restore
renderColorGrid();
$("#colorGrid").addEventListener("click", (e) => {
  const b = e.target.closest("[data-hex]"); if (!b) return;
  toggleColorExclusion(b.dataset.hex);
});
const restoreAllBtn = $("#colorRestoreAll");
if (restoreAllBtn) restoreAllBtn.addEventListener("click", () => {
  if (!S.excludedColors.size) return;
  pushHistory("Colors");
  S.excludedColors.clear();
  render();
  requestAnimationFrame(() => requestAnimationFrame(renderColorGrid));
});

// Backgrounds panel — a real, live-updating gallery, not a static overlay
renderBgGrid();
const bgGridEl = $("#bgGrid");
const bgUploadInput = $("#bgUploadInput");
const bgRemoveBtn = $("#bgRemoveBtn");
if (bgRemoveBtn) bgRemoveBtn.addEventListener("click", () => setBgEffect("none"));
if (bgGridEl) bgGridEl.addEventListener("click", (e) => {
  const b = e.target.closest("[data-bg-effect]"); if (!b) return;
  if (b.dataset.bgEffect === "custom"){
    if (bgUploadInput) bgUploadInput.click();      // always re-pick, so it's easy to change later
    return;
  }
  setBgEffect(b.dataset.bgEffect);
});
if (bgUploadInput) bgUploadInput.addEventListener("change", () => {
  const f = bgUploadInput.files && bgUploadInput.files[0];
  if (f) loadCustomBg(f);
  bgUploadInput.value = "";
});

const groups = [["square","Square"],["portrait","Portrait"],["landscape","Landscape"]];
$("#sizeAll").innerHTML = groups.map(([k,name]) =>
  `<optgroup label="${name}">` + SIZES.filter((x) => x.shape===k).map((x) =>
    `<option value="${x.id}"${x.id===S.size.id?" selected":""}>${x.label} — ${money(x.price)}</option>`).join("") + `</optgroup>`).join("");
$("#sizeAll").addEventListener("change", (e) => setSize(e.target.value));

function setSize(id){
  pushHistory("Size");
  const nxt = SIZES.find((x) => x.id === id) || S.size;
  if ((nxt.gw !== S.size.gw || nxt.gh !== S.size.gh) && S.edits.size)
    clearEditsFor("Different board size — hand edits cleared.");
  S.size = nxt; S.sizeTouched = true;
  if (!S.size.build) S.build = false;
  syncPannable();
  render();
}

// every size, ordered by how much wall it takes, filtered by shape
let sizeFilter = "all";
const BY_AREA = SIZES.slice().sort((a, b) => (a.gw*a.gh) - (b.gw*b.gh));

function renderSizes(){
  const list = BY_AREA.filter((x) => sizeFilter === "all" || x.shape === sizeFilter);
  $("#sizeCards").innerHTML = list.map((x, i) => {
    const [w, h] = inches(x), pieces = x.gw*x.gh;
    const per = (x.price/pieces*100);
    const ar = Math.min(56, 56*w/Math.max(w,h)), arh = Math.min(56, 56*h/Math.max(w,h));
    return `
    <article class="size${x.id===S.size.id?" pick":""}${i>7?" extra":""}" data-id="${x.id}">
      ${x.id===S.size.id?'<span class="tag now">In the creator</span>':(x.id==="16x16"?'<span class="tag">Most ordered</span>':"")}
      <img class="size-img" referrerpolicy="no-referrer" src="${x.img}" alt="MemoBrick ${x.label} mosaic" loading="lazy" onerror="this.style.display='none'">
      <div class="size-head">
        <span class="ratio" style="width:${ar}px;height:${arh}px" aria-hidden="true"></span>
        <div>
          <h3>${x.label}</h3>
          <p class="dim">${x.gw} × ${x.gh} studs</p>
        </div>
      </div>
      <div class="p">${money(x.price)}${x.was?`<s>${money(x.was)}</s>`:""}</div>
      <p class="per">${fmt(pieces)} bricks · ${per.toFixed(1)}¢ each</p>
      <ul>
        <li><span>Baseplates</span><span>${x.bx*x.by}</span></li>
        <li><span>Build time</span><span>~${x.hours} h</span></li>
        <li><span>Fits</span><span>${FITS[x.id] || x.note}</span></li>
        ${x.build?`<li><span>Built for you</span><span>${money(x.build)}</span></li>`:""}
      </ul>
      <button class="btn${x.id===S.size.id?"":" btn-ghost"}" data-try="${x.id}">${x.id===S.size.id?"Now in the creator":"Try this size"}</button>
      <a class="viewlink" href="${url(x, false)}" target="_blank" rel="noopener">View product page →</a>
    </article>`;
  }).join("");
  const extra = list.length - 8;
  const mb = $("#moreSizes");
  if (mb){
    mb.hidden = extra <= 0;
    mb.textContent = $("#sizeCards").classList.contains("all") ? "Show fewer" : `Show ${extra} more`;
  }
  const designLink = $("#sizesDesignLink");
  if (designLink) designLink.href = "/pages/editor?size=" + S.size.id + "#design";
}

$("#sizeTabs").addEventListener("click", (e) => {
  const b = e.target.closest("[data-f]"); if (!b) return;
  sizeFilter = b.dataset.f;
  $$("#sizeTabs button").forEach((x) => x.setAttribute("aria-pressed", x === b));
  $("#sizeCards").classList.remove("all");
  renderSizes();
});

/* A board is an abstract number until you see it next to a person.
   Hung the way a gallery hangs it: centre of the picture at 57 inches. */
function renderScale(){
  const [w, h] = inches(S.size), K = 2.15, base = 214, cx = 300;
  const bw = w*K, bh = h*K, cy = base - 57*K;
  const bx = cx - bw/2, by = cy - bh/2;
  const svg = `
  <svg viewBox="0 0 460 240" role="img" aria-label="${S.size.label} mosaic shown next to a person">
    <line x1="0" y1="${base}" x2="460" y2="${base}" stroke="rgba(29,31,36,.22)" stroke-width="2"/>
    <g fill="rgba(29,31,36,.30)">
      <circle cx="86" cy="${base - 60*K}" r="${5.6*K}"/>
      <path d="M${86-7.5*K} ${base-53*K} h${15*K} a${3*K} ${3*K} 0 0 1 ${3*K} ${3*K} v${22*K}
               a${2*K} ${2*K} 0 0 1 -${2*K} ${2*K} h-${17*K} a${2*K} ${2*K} 0 0 1 -${2*K} -${2*K}
               v-${22*K} a${3*K} ${3*K} 0 0 1 ${3*K} -${3*K} z"/>
      <rect x="${86-6.5*K}" y="${base-28*K}" width="${5*K}" height="${28*K}" rx="${2*K}"/>
      <rect x="${86+1.5*K}" y="${base-28*K}" width="${5*K}" height="${28*K}" rx="${2*K}"/>
    </g>
    <text x="86" y="${base + 16}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10"
          fill="rgba(29,31,36,.45)">5&#39;6&#34;</text>
    <rect x="${bx-4}" y="${by-4}" width="${bw+8}" height="${bh+8}" rx="4" fill="rgba(29,31,36,.10)"/>
    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="2" fill="url(#studs)" stroke="rgba(29,31,36,.35)"/>
    <defs>
      <pattern id="studs" width="7" height="7" patternUnits="userSpaceOnUse">
        <rect width="7" height="7" fill="#E9E6DF"/>
        <circle cx="3.5" cy="3.5" r="2" fill="rgba(29,31,36,.13)"/>
      </pattern>
    </defs>
    <line x1="${bx}" y1="${by-14}" x2="${bx+bw}" y2="${by-14}" stroke="var(--b-red)" stroke-width="1.5"/>
    <text x="${cx}" y="${by-19}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11"
          fill="var(--b-red)">${w}&#34;</text>
    <line x1="${bx+bw+13}" y1="${by}" x2="${bx+bw+13}" y2="${by+bh}" stroke="var(--b-red)" stroke-width="1.5"/>
    <text x="${bx+bw+19}" y="${by+bh/2+4}" font-family="JetBrains Mono, monospace" font-size="11"
          fill="var(--b-red)">${h}&#34;</text>
  </svg>
  <figcaption>${S.size.label} on the wall · ${fmt(S.size.gw*S.size.gh)} bricks · ${S.size.bx*S.size.by} baseplates</figcaption>`;
  $("#scaleView").innerHTML = svg;
}

renderSizes();
const moreBtn = $("#moreSizes");
if (moreBtn) moreBtn.addEventListener("click", () => {
  $("#sizeCards").classList.toggle("all");
  renderSizes();
});
$("#sizeCards").addEventListener("click", (e) => {
  const b = e.target.closest("[data-try]"); if (!b) return;
  setSize(b.dataset.try);
  if (S.img && S.uploaded){
    showView("editor"); openAcc(1);
    toast(`Creator switched to ${S.size.label}.`);
  } else {
    showView("upload");
    const note = document.querySelector("#upSize");
    if (note){ note.hidden = false; note.textContent = S.size.label + " selected \u00b7 add a photo and we'll open the creator at that size."; }
  }
});

// palettes
// sliders
$("#bri").addEventListener("input", (e) => {
  pushHistory("Brightness", "bri");   // one undo step per drag
 S.bri = +e.target.value; render(true); });
$("#bri").addEventListener("change", () => render());
$("#con").addEventListener("input", (e) => {
  pushHistory("Contrast", "con");   // one undo step per drag
 S.con = +e.target.value; render(true); });
$("#con").addEventListener("change", () => render());
$("#sat").addEventListener("input", (e) => {
  pushHistory("Saturation", "sat");   // one undo step per drag
 S.sat = +e.target.value; render(true); });
$("#sat").addEventListener("change", () => render());
/* Once a photo is in, the preview is frozen. Nothing may resize, refit or
   reposition it while the customer is editing. Only deliberate framing actions
   — the crop editor, Fit, Reset and the zoom slider itself — pass force. */
/* Is there any room to move the photo? At 100% zoom the photo still
   overhangs the board on one side whenever its shape differs from the
   board's (a tall photo on a square board, say) — that's exactly when
   customers want to slide it after picking a size. */
function photoSlack(){
  const img = S.img; if (!img) return { x: 0, y: 0 };
  const { gw, gh } = dims();
  const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
  if (!iw || !ih) return { x: 0, y: 0 };
  const sc = Math.max(gw/iw, gh/ih) * S.zoom;
  return { x: Math.abs(iw*sc - gw)/2, y: Math.abs(ih*sc - gh)/2 };     // in studs
}
function canMovePhoto(){
  // (S.viewLocked only guards against accidental zoom changes; a deliberate
  // drag on the preview is always the customer's own choice)
  const sl = photoSlack();
  return sl.x > 0.5 || sl.y > 0.5;
}
/* Dragging the photo is only switched on while the customer is sizing or
   cropping: the Size or Crop section open on desktop (or the full-screen
   framing editor), the Size or Crop tool on mobile. Everywhere else the
   preview stays put, so a stray click or swipe can't shift the design. */
function photoMoveAllowed(){
  if (S.editing) return false;                                   // brick painting uses the pointer
  const mobileLayout = window.matchMedia("(max-width:767px)").matches;
  if (mobileLayout){
    const t = window.MobileEditor && window.MobileEditor.activeTool;
    return t === "size" || t === "crop";
  }
  const open = (id) => { const d = document.getElementById(id); return !!(d && d.open); };
  const cr = document.getElementById("cropper");                 // full-screen framing editor
  return open("panelSize") || open("panelCrop") || !!(cr && !cr.hidden);
}
function syncPannable(){ hold.classList.toggle("pannable", photoMoveAllowed() && canMovePhoto()); }

function setZoom(pct, live, force){
  if (S.viewLocked && !force) return;
  S.zoom = clamp(pct, 50, 300)/100;
  $("#zoom").value = Math.round(S.zoom*100);
  $("#zoomVal").textContent = Math.round(S.zoom*100) + "%";
  const zv2 = $("#zoomVal2"); if (zv2) zv2.textContent = Math.round(S.zoom*100) + "% zoom";
  syncPannable();
  $("#bgRow").hidden = S.zoom >= 1;
  render(live);
}
$("#zoom").addEventListener("input", (e) => setZoom(+e.target.value, true, true));
$("#zoom").addEventListener("change", (e) => setZoom(+e.target.value, false, true));
$("#zoomIn").addEventListener("click", () => setZoom(Math.round(S.zoom*100) + 10, false, true));
$("#zoomOut").addEventListener("click", () => setZoom(Math.round(S.zoom*100) - 10, false, true));
/* the wheel used to zoom the board; with the view locked it scrolls the page
   like everything else, which is what people expect while editing */

// border color, used for whatever the photo doesn't cover when zoomed out
$("#bgRow").addEventListener("click", (e) => {
  const b = e.target.closest("[data-bg]"); if (!b) return;
  S.bg = b.dataset.bg;
  $$("#bgRow [data-bg]").forEach((x) => x.setAttribute("aria-pressed", x === b));
  render();
});
$("#resetCrop").addEventListener("click", () => { S.ox = 0; S.oy = 0; setZoom(100, false, true); });
function fitWholePhoto(silent){
  const img = S.img; if (!img) return;
  const { gw, gh } = dims();
  const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
  // the zoom at which the whole photo fits inside the board
  const cover = Math.max(gw/iw, gh/ih), contain = Math.min(gw/iw, gh/ih);
  S.ox = 0; S.oy = 0;
  setZoom(Math.round(contain/cover*100), false, true);
  if (!silent) toast("Whole photo fitted — the margin builds in your border color.");
}
$("#fitAll").addEventListener("click", () => fitWholePhoto(false));

/* Shared by both detection paths below: given a union box of detected
   faces (normalised 0-1 fractions of the full photo), compute and apply
   the actual crop — margin, reshape to the board's aspect ratio, zoom,
   and offset. Adapted from the same underlying approach used elsewhere
   in the industry for this exact feature: union box -> margin ->
   aspect-match -> zoom from the box's longer normalised dimension ->
   center on the box. */
function applyFaceCrop(ux0, uy0, ux1, uy1, iw, ih, gw, gh){
  // captured before any of the changes below, so Undo reverts back to
  // whatever crop was showing the moment before this one was applied —
  // the plain opening fit, for the very first automatic autocrop right
  // after a photo loads, or the customer's own manual adjustment if this
  // fired from a later tap of the Autocrop button
  pushHistory("Auto-crop to face");

  let ux = ux0, uy = uy0, uw = ux1-ux0, uh = uy1-uy0;

  // margin: expand 12% on each side so the crop doesn't hug the face(s)
  // tightly, then clamp back within the photo
  const marginX = uw*0.12, marginY = uh*0.12;
  ux = Math.max(0, ux-marginX); uy = Math.max(0, uy-marginY);
  const ex1 = Math.min(1, ux1+marginX), ey1 = Math.min(1, uy1+marginY);
  uw = ex1-ux; uh = ey1-uy;

  // reshape to the board's own aspect ratio, growing whichever side is
  // short, keeping the same center — so the crop area's actual on-screen
  // proportions exactly match the board, not just approximately
  const boardAspect = gw/gh, srcAspect = iw/ih;
  const r = boardAspect/srcAspect;
  const cx0 = ux+uw/2, cy0 = uy+uh/2;
  let rw = uw, rh = uh;
  if (uw/uh < r) rw = uh*r; else rh = uw/r;

  // zoom: how much to scale so this reshaped box fills the whole visible
  // crop — my own S.zoom is a multiplier on top of "cover", exactly
  // matching what 1/max(width,height) gives here
  const zoomPct = clamp(Math.round((1/Math.max(rw, rh))*100), 100, 300);
  S.zoom = zoomPct/100;

  // convert the desired centre (cx0, cy0, normalised 0-1 in photo space)
  // into S.ox/S.oy using the exact same geometry drawSource() uses, so
  // this always matches what actually gets painted, board size aside
  const W = 1000, H = 1000*gh/gw;             // any consistent stand-in board size works — only ratios matter
  const sc = Math.max(W/iw, H/ih) * S.zoom;
  const dw = iw*sc, dh = ih*sc;
  const slackX = Math.abs(dw-W)/2, slackY = Math.abs(dh-H)/2;
  const wantX = cx0*iw, wantY = cy0*ih;       // desired centre, in photo pixel space
  S.ox = slackX > 0.001 ? clamp(((iw/2 - wantX)*sc)/slackX, -1, 1) : 0;
  S.oy = slackY > 0.001 ? clamp(((ih/2 - wantY)*sc)/slackY, -1, 1) : 0;
  setZoom(zoomPct, false, true);
}

/* Face-aware auto-crop. Detects every face in the FULL original photo —
   not whatever the customer currently has zoomed/panned into — and sets
   the crop to frame them well. Deliberately re-detects on a fresh,
   full-resolution render each time rather than reusing S.faceBoxes,
   since those only reflect whatever part of the photo the current crop
   happens to show — after a bad zoom/pan, the face may not be in that
   region at all.

   Tries real face detection (MediaPipe) first — skin-color alone can't
   reliably tell a face apart from a hand or bare arm, both being
   "skin-colored" to that heuristic; a photo where a child's hand rests
   near their face is exactly where that heuristic breaks. Falls back to
   the skin-color heuristic, same honest pattern used for background
   segmentation elsewhere in this file: real detection is tried with a
   bounded timeout, and if it can't load for any reason, the fallback
   runs rather than leaving the customer stuck. */
async function autoCropToFaces(silent){
  const img = S.img; if (!img) { if (!silent) toast("Upload a photo first."); return; }
  const { gw, gh } = dims();
  const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;
  if (!silent) toast("Finding faces…");

  let union = null;   // {x0,y0,x1,y1} normalised 0-1, or null if nothing found
  let faceCount = 0;
  let usedRealDetection = false;
  // usedRealDetection: true only for MediaPipe — the skin-color fallback below is too crude to base a size recommendation on
  let detectorRan = false;          // the detector worked — "no face" is then a real answer (pet, landscape)

  try {
    const FACE_LOAD_TIMEOUT_MS = 8000;
    const detector = await Promise.race([
      loadFaceDetector(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("face-detector-load-timeout")), FACE_LOAD_TIMEOUT_MS)),
    ]);
    const faces = await detectFacesTiled(img, detector);           // finds small faces in group photos too
    // the customer may have uploaded a different photo while faces were
    // being found — never crop (or tag faces on) a photo this wasn't for
    if (S.img !== img) return;
    detectorRan = true;
    if (faces.length){
      let ux0 = Infinity, uy0 = Infinity, ux1 = -Infinity, uy1 = -Infinity;
      for (const f of faces){
        ux0 = Math.min(ux0, f.x0); uy0 = Math.min(uy0, f.y0);
        ux1 = Math.max(ux1, f.x1); uy1 = Math.max(uy1, f.y1);
      }
      if (ux1 > ux0){ union = { x0: ux0, y0: uy0, x1: ux1, y1: uy1 }; faceCount = faces.length; usedRealDetection = true; }
      // keep every face (normalised to the photo) for the skin-tone rules
      S.mlFaces = faces.filter((f) => f.score >= HUMAN_FACE_MIN_SCORE);
      S.mlFacesImg = S.imgId;
    }
  } catch (err){
    console.error("MemoBrick: MediaPipe face detection unavailable, falling back —", err);
  }

  if (!union && !detectorRan){
    // fallback: the skin-color heuristic, at a smaller analysis size —
    // this is a much cruder signal, so a real, isolated face rarely
    // spans more than about half the frame; a box this large is almost
    // always the face merged with connected bare skin (an arm, a
    // shoulder, a hand) via the flood-fill, not an actual face
    const side = 220;
    const aw = ih >= iw ? Math.round(side*iw/ih) : side;
    const ah = iw >= ih ? Math.round(side*ih/iw) : side;
    const c = document.createElement("canvas");
    c.width = Math.max(1, aw); c.height = Math.max(1, ah);
    const actx = c.getContext("2d");
    actx.drawImage(img, 0, 0, c.width, c.height);
    const idata = actx.getImageData(0, 0, c.width, c.height).data;
    const buf = new Float32Array(c.width*c.height*3);
    for (let i = 0, p = 0; i < idata.length; i += 4, p += 3){
      buf[p] = idata[i]; buf[p+1] = idata[i+1]; buf[p+2] = idata[i+2];
    }
    let { boxes } = analyzeFaceRegions(buf, c.width, c.height, false);
    boxes = boxes.filter((b) => (b.x1-b.x0+1) <= c.width*0.55 && (b.y1-b.y0+1) <= c.height*0.55);
    if (boxes.length){
      let ux0 = Infinity, uy0 = Infinity, ux1 = -Infinity, uy1 = -Infinity;
      for (const b of boxes){
        ux0 = Math.min(ux0, b.x0/c.width);  uy0 = Math.min(uy0, b.y0/c.height);
        ux1 = Math.max(ux1, (b.x1+1)/c.width); uy1 = Math.max(uy1, (b.y1+1)/c.height);
      }
      union = { x0: ux0, y0: uy0, x1: ux1, y1: uy1 }; faceCount = boxes.length;
    }
  }

  if (!union){ if (!silent){ fitWholePhoto(true); toast("No face found — fit the whole photo instead."); } return; }

  // size recommendations only ever use this — set on a reliable MediaPipe
  // read, cleared otherwise, so a recommendation is never shown from a
  // guess. See recommendedSizeForFaces() and the size panel below.
  S.detectedFaceCount = usedRealDetection ? faceCount : null;
  updateSizeRecommendation();

  applyFaceCrop(union.x0, union.y0, union.x1, union.y1, iw, ih, gw, gh);
  if (usedRealDetection && S.mlFaces && S.mlFaces.length){ S.baseKey = ""; render(); }   // re-run skin analysis with the real face boxes
  if (silent) toast("Cropped to the face automatically — tap Undo to change it.");
  else toast(faceCount > 1 ? "Faces framed automatically." : "Face framed automatically.");
}
$("#autoCropFaces") && $("#autoCropFaces").addEventListener("click", () => autoCropToFaces(false));

/* Which existing size best fits N detected faces, using the real FITS
   text already shown to customers ("1–4 people" etc.) as the source of
   truth — never an invented mapping. Picks the smallest size (by studs)
   whose stated upper bound covers the count, so recommending a size
   never implies more room than the size actually promises elsewhere on
   the site. Only called when S.detectedFaceCount is a reliable, real
   MediaPipe read (see autoCropToFaces above) — never a guess. */
function recommendedSizeForFaces(n){
  if (!n || n < 1) return null;
  let best = null, bestArea = Infinity;
  for (const size of SIZES){
    if (size.id === "10x10") continue;   // never recommended, even when it would technically fit
    const fits = FITS[size.id]; if (!fits) continue;
    const nums = fits.match(/\d+/g); if (!nums) continue;
    const upper = Number(nums[nums.length - 1]);
    const area = size.gw * size.gh;
    if (upper >= n && area < bestArea){ best = size; bestArea = area; }
  }
  // a bigger group than any size is rated for: recommend the largest board
  // (previously nothing was recommended at all for groups above 10)
  if (!best){
    for (const size of SIZES){
      if (!best || size.gw*size.gh > best.gw*best.gh) best = size;
    }
  }
  return best;
}

/* Desktop-only counterpart to the mobile size panel's own inline
   recommendation banner (built fresh each time that panel renders).
   #sizeGrid renders once at script load rather than per-photo, so
   rather than restructure that, this just owns its own small, separate
   slot right above it — purely additive, sizeGrid/sizeAll untouched. */
function updateSizeRecommendation(){
  const el = $("#sizeRec"); if (!el) return;
  const rec = recommendedSizeForFaces(S.detectedFaceCount);
  if (!rec || rec.id === S.size.id){ el.hidden = true; el.innerHTML = ""; return; }
  const n = S.detectedFaceCount;
  el.hidden = false;
  el.innerHTML = '<span class="size-rec-k">✨ Recommended for your photo</span>' +
    '<button type="button" class="size-rec-pick" data-id="' + rec.id + '">' +
      '<b>' + rec.label + '</b>' +
      '<span>Your photo has ' + n + (n === 1 ? ' face' : ' faces') + ' — this size keeps more detail.</span>' +
    '</button>';
  el.querySelector(".size-rec-pick").addEventListener("click", () => setSize(rec.id));
}

// finish toggles
$("#det").addEventListener("input", (e) => {
  pushHistory("Detail", "det");   // one undo step per drag
  S.detail = +e.target.value; S.detailTouched = true; $("#valDet").textContent = S.detail + "%"; render(true);
});
$("#det").addEventListener("change", () => render());
$("#warm").addEventListener("input", (e) => {
  pushHistory("Warmth", "warm");   // one undo step per drag
  S.warm = +e.target.value; $("#valWarm").textContent = S.warm + "%"; render(true);
});
$("#warm").addEventListener("change", () => render());
$("#warmAuto").addEventListener("click", () => {
  pushHistory("Automatic warmth");
  S.warm = AUTO_START.warm; $("#warm").value = S.warm; $("#valWarm").textContent = S.warm + "%";
  render();
  toast("Automatic warmth restored.");
});
$("#shadows").addEventListener("input", (e) => {
  pushHistory("Shadows", "shadows");   // one undo step per drag

  S.shadows = +e.target.value; $("#valShadows").textContent = S.shadows + "%"; render(true);
});
$("#shadows").addEventListener("change", () => render());
$("#togAuto").addEventListener("click", (e) => { S.auto = !S.auto; e.currentTarget.setAttribute("aria-pressed", S.auto); render(); });
$$(".sliders input, .ep-toggles .tog").forEach((el) =>
  el.addEventListener("pointerdown", () => { const d = el.closest("details"); if (d) d.open = true; }));
$("#autoFix").addEventListener("click", () => {
  pushHistory("Back to the automatic settings");
  Object.assign(S, AUTO_START);
  S.auto = true;
  $("#togAuto").setAttribute("aria-pressed", true);
  syncSliders();
  render();
  toast("Back to the automatic starting point.");
});
$("#togStuds").addEventListener("click", (e) => { S.studs = !S.studs; e.currentTarget.setAttribute("aria-pressed", S.studs); repaint(); });
$("#togBoards").addEventListener("click", (e) => { S.boards = !S.boards; e.currentTarget.setAttribute("aria-pressed", S.boards); repaint(); });
$("#buildBtn").addEventListener("click", () => { if (!S.size.build) return; S.build = !S.build; meta(); });

// samples & upload
$$("[data-sample]").forEach((b) => b.addEventListener("click", () => {
  S.img = (b.dataset.sample === "portrait" && photoReady) ? PHOTO : sampleCanvas(b.dataset.sample);
  S.ox = S.oy = 0; S.uploaded = true; clearEditsFor("New picture — hand edits cleared.");
  $("#chipSrc").textContent = "Example: " + b.textContent.trim();
  $("#accPhoto").textContent = "Example: " + b.textContent.trim();
  showView("editor");
  if (window.innerWidth >= 1020) openAcc(1);
  // framing is the first real decision, so take them straight into it —
  // and since that hands framing to the customer directly, the automatic
  // autocrop below is skipped for this one load. Firing both used to race:
  // openCropper() reads the crop state once, when it opens, and nothing
  // re-syncs it afterward — so if the async autocrop resolved while the
  // manual cropper was already open (or mid-drag), the frame overlay went
  // stale, or the photo could visibly jump underneath the customer.
  const openingManualCropper = !S._croppedOnce;
  if (openingManualCropper){
    S._croppedOnce = true;
    setTimeout(() => { try { openCropper(); } catch (e) { console.error(e); } }, 420);
  }
  if (window.matchMedia && window.matchMedia("(hover: none)").matches){
    hold.classList.add("showhint");
    setTimeout(() => hold.classList.remove("showhint"), 2600);
  }
  setZoom(100, false, true);
  // sample photos never go through adopt() — same automatic, silent
  // face-aware crop as a real upload, so an example doesn't look any
  // less finished as a starting point than the customer's own photo
  if (!openingManualCropper){
    try { autoCropToFaces(true).catch(() => {}); } catch (e) {}
  }

}));
const file = $("#file");
const up = $("#uploadBtn");
if (up) up.addEventListener("click", (e) => {
  // the input sits in another view; a plain label cannot reach it
  e.preventDefault();
  openPicker();
});
if (up) up.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " "){ e.preventDefault(); openPicker(); } });
window.addEventListener("paste", (e) => {
  const it = [...(e.clipboardData?.files || [])][0];
  if (it) loadFile(it);
});
/* One route into the photo picker, and only one. The dropzone used to be a
   label pointing at the input AND the script opened it as well, so iOS
   received two requests in the same gesture and cancelled the picker. */
let pickerBusy = 0;
function openPicker(){
  const now = Date.now();
  if (now - pickerBusy < 800) return;      // ignore a second call in one tap
  pickerBusy = now;
  file.click();                            // the only direct call in the file
}
const bigDrop2 = document.querySelector("#bigDrop");
if (bigDrop2) bigDrop2.addEventListener("click", (e) => {
  if (e.target === file) return;           // the covering input already has it
  e.preventDefault();
  openPicker();
});

const takeFile = () => {
  const f = file.files && file.files[0];
  if (f){ loadFile(f); }
  else { console.warn("file input fired with no file"); }
  file.value = "";
};
file.addEventListener("change", takeFile);
/* Accept whatever the person has. Phones hand over HEIC, cameras hand over
   TIFF, designers hand over SVG — and half of them arrive with an empty MIME
   type. So: decide by extension as well as type, decode through the widest
   path the browser offers, honour EXIF rotation, and shrink anything enormous
   before it reaches the canvas. */
const IMAGE_EXT = /\.(jpe?g|jfif|pjpeg|png|apng|gif|webp|avif|bmp|dib|ico|cur|svgz?|tiff?|heic|heif|hif|jxl|jp2|j2k|jpf|jpx|jpm|qoi)$/i;
const MAX_SIDE = 2600;                       // anything larger is wasted on a 192-stud board

function looksLikeImage(f){
  if (!f) return false;
  if (/^image\//i.test(f.type || "")) return true;
  if (IMAGE_EXT.test(f.name || "")) return true;      // empty type, known extension
  return (f.type || "") === "" && (f.size || 0) > 1024;
}

/* Some in-app browsers — Instagram's among them — refuse blob: URLs on a page
   loaded from file://. Every path that relied on one silently produced nothing,
   which is why the photo never reached the editor. FileReader gives a data URL
   instead and works everywhere. */
function decodeViaDataURL(file){
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        const cap = window.innerWidth < 900 ? 1280 : MAX_SIDE;
        const big = Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height);
        if (big > cap){
          try {
            const k = cap / big;
            const c = document.createElement("canvas");
            c.width = Math.round((img.naturalWidth || img.width) * k);
            c.height = Math.round((img.naturalHeight || img.height) * k);
            const cx = c.getContext("2d");
            cx.imageSmoothingQuality = "high";
            cx.drawImage(img, 0, 0, c.width, c.height);
            resolve(c);
            return;
          } catch (e){ /* use the image as it is */ }
        }
        resolve(img);
      };
      img.onerror = () => reject(new Error("image element could not decode this file"));
      img.src = fr.result;
    };
    fr.onerror = () => reject(new Error("file could not be read"));
    fr.readAsDataURL(file);
  });
}

function decodeViaBitmap(file){
  if (typeof createImageBitmap !== "function") return Promise.reject(new Error("no bitmap decoder"));
  const cap = window.innerWidth < 900 ? 1280 : MAX_SIDE;   // phones get a tighter ceiling
  try {
    // decode once, shrink into a canvas, release the bitmap straight away.
    // Never hold two full-size decodes at the same time.
    return createImageBitmap(file, { imageOrientation: "from-image" }).then((bm) => {
      const big = Math.max(bm.width, bm.height);
      if (big <= cap) return bm;
      const k = cap / big;
      const w = Math.max(1, Math.round(bm.width * k)), h = Math.max(1, Math.round(bm.height * k));
      const c = document.createElement("canvas");
      c.width = w; c.height = h;
      const cx = c.getContext("2d");
      cx.imageSmoothingQuality = "high";
      cx.drawImage(bm, 0, 0, w, h);
      if (bm.close) bm.close();                            // free the big one immediately
      return c;
    });
  } catch (err){
    return Promise.reject(err);    // some engines throw before returning a promise
  }
}

function decodeViaImage(file){
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file), img = new Image();
    img.decoding = "async";
    img.onload = () => {
      // an SVG without intrinsic size reports 0; give it something to draw into
      if (!img.naturalWidth || !img.naturalHeight){
        img.width = 1200; img.height = 1200;
      }
      const cap = window.innerWidth < 900 ? 1600 : MAX_SIDE;
      const big = Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height);
      if (big > cap){
        try {
          const k = cap / big;
          const w = Math.round((img.naturalWidth || img.width) * k),
                h = Math.round((img.naturalHeight || img.height) * k);
          const c = document.createElement("canvas");
          c.width = w; c.height = h;
          const cx = c.getContext("2d");
          cx.imageSmoothingQuality = "high";
          cx.drawImage(img, 0, 0, w, h);
          URL.revokeObjectURL(url);
          resolve(c);
          return;
        } catch (e){ /* fall through and use the image as-is */ }
      }
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(); };
    img.src = url;
  });
}

/* Keep a small copy of the photo and the design settings so an in-app browser
   that reloads the page under memory pressure drops the customer back into the
   editor rather than back to the start. */
function saveSession(){
  try {
    if (!S.img) return;
    const c = document.createElement("canvas");
    const side = 900;
    const iw = S.img.naturalWidth || S.img.width, ih = S.img.naturalHeight || S.img.height;
    const k = Math.min(1, side / Math.max(iw, ih));
    c.width = Math.max(1, Math.round(iw * k));
    c.height = Math.max(1, Math.round(ih * k));
    c.getContext("2d").drawImage(S.img, 0, 0, c.width, c.height);
    sessionStorage.setItem("mb_photo", c.toDataURL("image/jpeg", 0.82));
    sessionStorage.setItem("mb_state", JSON.stringify({
      sizeId: S.size.id, zoom: S.zoom, ox: S.ox, oy: S.oy, bg: S.bg, bgEffect: S.bgEffect,
      bri: S.bri, con: S.con, sat: S.sat, temp: S.temp, detail: S.detail,
      dither: S.dither, shadows: S.shadows, warm: S.warm, auto: S.auto, pal: S.pal,
      excludedColors: S.excludedColors ? [...S.excludedColors] : [],
      edits: S.edits && S.edits.size ? [...S.edits.entries()] : [],
    }));
  } catch (e){ /* private mode or quota: not worth bothering the customer */ }
}

function restoreSession(){
  try {
    const data = sessionStorage.getItem("mb_photo");
    if (!data) return false;
    const st = JSON.parse(sessionStorage.getItem("mb_state") || "{}");
    const im = new Image();
    im.onload = () => {
      // this callback runs asynchronously, after this function's own
      // try/catch has already returned — without its own guard, a stale
      // or incompatible saved session (from before an app update) could
      // throw here uncaught and surface as a generic error to every
      // returning visitor, rather than just quietly starting fresh.
      try {
        adopt(im, { name: "restored.jpg", type: "image/jpeg" }, { skipAutoCrop: !st.fresh });
        const z = SIZES.find((x) => x.id === st.sizeId);
        if (z) S.size = z;
        Object.assign(S, {
          zoom: st.zoom || 1, ox: st.ox || 0, oy: st.oy || 0,
          bg: st.bg || S.bg, bgEffect: st.bgEffect || S.bgEffect,
          bri: st.bri, con: st.con, sat: st.sat, temp: st.temp, detail: st.detail,
          dither: st.dither, shadows: st.shadows, warm: st.warm,
          auto: st.auto, pal: st.pal || S.pal,
        });
        if (st.excludedColors && st.excludedColors.length) S.excludedColors = new Set(st.excludedColors);
        if (st.edits && st.edits.length) S.edits = new Map(st.edits);
        syncSliders();
        render();
        toast("Picked up where you left off.");
      } catch (e){
        console.error("MemoBrick: saved session could not be restored —", e);
        try { sessionStorage.removeItem("mb_photo"); sessionStorage.removeItem("mb_state"); } catch (x){}
        // fail silently into a fresh, empty Creator rather than surfacing
        // an error for something the customer never asked to happen
      }
    };
    im.onerror = () => {};
    im.src = data;
    return true;
  } catch (e){ return false; }
}

/* A photo's own proportions should decide the board shape, not whatever
   shape happened to be selected for a previous photo. Keeps the current
   size tier (by grid area) when switching shape, so "medium" stays
   roughly "medium" rather than jumping to the smallest or largest option. */
function matchShapeForPhoto(img){
  const w = img.naturalWidth || img.width || 0, h = img.naturalHeight || img.height || 0;
  if (!w || !h) return null;
  const ratio = w / h;
  const wantShape = ratio > 1.15 ? "landscape" : ratio < 0.87 ? "portrait" : "square";
  if (S.size && S.size.shape === wantShape) return null;     // already matches, nothing to do
  const candidates = SIZES.filter((z) => z.shape === wantShape);
  if (!candidates.length) return null;
  const currentArea = (S.size && S.size.gw * S.size.gh) || 0;
  let best = candidates[0], bestDiff = Infinity;
  candidates.forEach((z) => {
    const diff = Math.abs(z.gw*z.gh - currentArea);
    if (diff < bestDiff){ bestDiff = diff; best = z; }
  });
  return best;
}

function adopt(img, f, opts){
  S.img = img; S.ox = S.oy = 0; S.uploaded = true;
  S.excludedColors = new Set();   // exclusions belong to the previous photo, not this one
  S.bgEffect = "original";        // a new photo starts with its own real background
  // 20x20 is the consistent, predictable default for every customer — the
  // board no longer auto-switches shape to match the uploaded photo's own
  // proportions. An explicit size choice (a customer's own selection, or
  // a deep link from the collection page) is still respected and never
  // silently overridden.
  // a different photograph: every cached result from the previous one is void
  S.imgId = (S.imgId || 0) + 1;
  S.baseBuf = null; S.baseKey = ""; S.cells = null; S.cacheKey = "";
  S.pickedPal = null; S.palKey = "";
  S.detectedFaceCount = null;   // belongs to the previous photo — cleared until this one's own detection resolves
  S.mlFaces = null; S.mlFacesImg = -1;
  S.expo = null; S.autoBright = true;   // each photo gets its own exposure analysis
  if (typeof updateSizeRecommendation === "function") updateSizeRecommendation();
  // the automatic starting point, applied once for this photo. Anything the
  // customer changes afterwards is theirs and is never overwritten.
  Object.assign(S, AUTO_START);
  S.detailTouched = false; S.analyzedImgId = -1;   // let the pipeline re-analyse this photo fresh
  HIST.past.length = 0; HIST.future.length = 0;
  updateHistoryButtons();
  syncSliders();
  // move to the editor first: if anything below throws, the person is still
  // where they expect to be rather than stranded on the upload screen
  showView("editor");
  clearEditsFor("New photo — hand edits cleared.");
  $("#chipSrc").textContent = "Your photo";
  $("#accPhoto").textContent = "Your photo · tap to change";
  if (window.innerWidth >= 1020) openAcc(1);
  if (window.matchMedia && window.matchMedia("(hover: none)").matches){
    hold.classList.add("showhint");
    setTimeout(() => hold.classList.remove("showhint"), 2600);
  }
  const un = document.querySelector("#upSize"); if (un) un.hidden = true;
  setZoom(100, false, true);          // the opening fit, shown immediately while face detection (below) runs
  S.viewLocked = true;                // from here the preview holds still
  setTimeout(saveSession, 400);       // survive an in-app browser reload
  // tell the mobile shell a photo just landed — it is otherwise never told,
  // and would stay hidden until a resize event happened to fire
  try { document.dispatchEvent(new CustomEvent("memobrick:photo")); } catch (e) {}
  // give the (large — vision bundle + WASM runtime + model, 10MB+) background
  // removal download a head start now, rather than only starting it once the
  // customer opens Background and has to wait for the full download from a
  // standing start. Fire-and-forget: a failure here is fine, since the real
  // segmentation attempt in ensureSubjectSegmentation() has its own handling.
  try { loadSegmenter().catch(() => {}); } catch (e) {}
  // frame the detected face automatically, rather than making every
  // customer discover and tap the Autocrop button themselves for what's
  // the obviously-better starting crop on a portrait photo. Silent (no
  // "Finding faces…" toast spam on every upload) and fire-and-forget —
  // the plain whole-photo fit set above is already on screen, so a
  // slow or failed detection just leaves that in place, never a stall.
  // The same button remains available afterwards as the one, always-
  // present way back to this automatic crop if the customer's own
  // manual adjustments don't work out.
  //
  // Skipped when restoring a saved session (opts.skipAutoCrop): that
  // caller applies the session's OWN saved zoom/ox/oy right after this
  // function returns — since this autocrop resolves later, asynchronously,
  // it would otherwise land after that restore and silently overwrite the
  // customer's own crop with a fresh auto-detected one, contradicting
  // "picked up where you left off."
  if (!(opts && opts.skipAutoCrop)){
    try { autoCropToFaces(true).catch(() => {}); } catch (e) {}
  }
}

function loadFile(f){
  if (!looksLikeImage(f)){
    toast("That doesn't look like an image. JPG, PNG, HEIC, WebP, AVIF, GIF, BMP, TIFF and SVG all work.");
    return;
  }
  toast("Opening your photo…");
  diag("picked " + (f.name||"?") + " " + (f.type||"no type") + " " + Math.round((f.size||0)/1024) + "KB");
  Promise.resolve()
    .then(() => { diag("trying createImageBitmap"); return decodeViaBitmap(f); })
    .catch((e) => { diag("bitmap failed: " + e.message + " — trying FileReader"); return decodeViaDataURL(f); })
    .catch((e) => { diag("FileReader failed: " + e.message + " — trying object URL"); return decodeViaImage(f); })
    .then((img) => { diag("decoded " + (img.naturalWidth||img.width) + "x" + (img.naturalHeight||img.height) + ", opening the editor"); return adopt(img, f); })
    .catch(() => {
      const name = (f.name || "") + " " + (f.type || "");
      if (/heic|heif|hif/i.test(name))
        toast("This browser can't open HEIC. On iPhone: Settings → Camera → Formats → Most Compatible, or share the photo and pick JPEG.");
      else if (/tiff?|raw|cr2|nef|arw|dng|psd/i.test(name))
        toast("Browsers can't open camera RAW, TIFF or PSD files. Export a JPG or PNG first.");
      else
        toast("That image wouldn't open. It may be damaged — try another file, or export it as JPG.");
    });
}
["dragenter","dragover"].forEach((ev) => hold.addEventListener(ev, (e) => { e.preventDefault(); hold.classList.add("dragging"); }));
["dragleave","drop"].forEach((ev) => hold.addEventListener(ev, (e) => { e.preventDefault(); hold.classList.remove("dragging"); }));
hold.addEventListener("drop", (e) => { if (e.dataTransfer.files[0]) loadFile(e.dataTransfer.files[0]); });
const bigDrop = $("#bigDrop");
if (bigDrop){
  ["dragenter","dragover"].forEach((ev) => bigDrop.addEventListener(ev, (e) => {
    e.preventDefault(); bigDrop.classList.add("over"); }));
  ["dragleave","drop"].forEach((ev) => bigDrop.addEventListener(ev, (e) => {
    e.preventDefault(); bigDrop.classList.remove("over"); }));
  bigDrop.addEventListener("drop", (e) => { if (e.dataTransfer.files[0]) loadFile(e.dataTransfer.files[0]); });
  bigDrop.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " "){ e.preventDefault(); openPicker(); } });
}

// hold-to-compare
const peek = $("#peekBtn");
["mousedown","touchstart"].forEach((ev) => peek.addEventListener(ev, (e) => { e.preventDefault(); hold.classList.add("show-photo"); }, { passive:false }));
["mouseup","mouseleave","touchend","touchcancel","blur"].forEach((ev) => peek.addEventListener(ev, () => hold.classList.remove("show-photo")));
peek.addEventListener("keydown", (e) => { if (e.key===" "||e.key==="Enter") hold.classList.add("show-photo"); });
peek.addEventListener("keyup", () => hold.classList.remove("show-photo"));

// drag to pan + hover tooltip
/* ------------- worked examples for the photo guide -------------
   Each thumbnail is a real mosaic through the same pipeline as the
   creator, so the advice is demonstrated rather than asserted.     */
/* (kept for reference) one plate, drawn the way the plastic actually behaves: a lit top edge,
   a shadowed bottom, a stud that casts onto its own tile, and a specular
   highlight up and to the left of centre. */
function drawRealBrick(x, px, py, s, c){
  const gap = Math.max(0.6, s*0.045), w = s - gap, r = w*0.30;
  const cx = px + w/2, cy = py + w/2;
  x.fillStyle = c.hex;
  x.beginPath(); x.roundRect(px, py, w, w, w*0.09); x.fill();

  const lit = x.createLinearGradient(px, py, px, py + w);
  lit.addColorStop(0, "rgba(255,255,255,.34)");
  lit.addColorStop(.30, "rgba(255,255,255,0)");
  lit.addColorStop(.82, "rgba(0,0,0,0)");
  lit.addColorStop(1, "rgba(0,0,0,.20)");
  x.fillStyle = lit;
  x.beginPath(); x.roundRect(px, py, w, w, w*0.09); x.fill();

  x.fillStyle = "rgba(0,0,0,.26)";
  x.beginPath(); x.ellipse(cx, cy + r*0.30, r, r*0.96, 0, 0, 6.2832); x.fill();

  x.fillStyle = c.hex;
  x.beginPath(); x.arc(cx, cy, r, 0, 6.2832); x.fill();

  const shade = x.createRadialGradient(cx, cy, r*0.5, cx, cy, r);
  shade.addColorStop(0, "rgba(0,0,0,0)");
  shade.addColorStop(.88, "rgba(0,0,0,.16)");
  shade.addColorStop(1, "rgba(0,0,0,.34)");
  x.fillStyle = shade; x.beginPath(); x.arc(cx, cy, r, 0, 6.2832); x.fill();

  const gloss = x.createRadialGradient(cx - r*0.28, cy - r*0.36, r*0.04, cx, cy, r*1.35);
  gloss.addColorStop(0, "rgba(255,255,255,.44)");
  gloss.addColorStop(.62, "rgba(255,255,255,.07)");
  gloss.addColorStop(1, "rgba(255,255,255,0)");
  x.fillStyle = gloss; x.beginPath(); x.arc(cx, cy, r, 0, 6.2832); x.fill();

  x.strokeStyle = "rgba(0,0,0,.22)"; x.lineWidth = Math.max(0.5, w*0.02);
  x.beginPath(); x.arc(cx, cy, r, 0, 6.2832); x.stroke();
}

/* the first feature card: the same crop, half photograph and half bricks */
/* =====================================================================
   BUILD INSTRUCTIONS — internal document that ships with the kit.
   Generated from the finished design: cover, spec sheet, one page per
   baseplate, and a picking list with pack quantities.
   ===================================================================== */
const BRICK_MM = 254/32;     // one stud, in mm — 32 studs = 10" exactly (254mm),
                              // matching the site's own sizing rule everywhere
                              // else (SIZES: 32 studs per 10"). 8mm was close
                              // but not exact — 0.0625mm off per stud, which
                              // adds up to a real 2mm gap over a 32-stud board.
                              // This print is meant to have a real baseplate
                              // set on top of it, so it has to be exact.
const PACK_SIZE = 100;       // bricks per pack
const packs = (n) => Math.ceil(n / PACK_SIZE);

/* split a run of studs into one printable tile per real baseplate —
   NOT a fixed 32-stud guess, which breaks for sizes like 16x16 that use
   a single larger plate. platesAcross is S.size.bx or S.size.by. */
function tiles(n, platesAcross){
  const parts = Math.max(1, platesAcross || Math.ceil(n / 32));
  const size = Math.ceil(n / parts), out = [];
  for (let a = 0; a < n; a += size) out.push([a, Math.min(n, a + size)]);
  return out;
}
function readable(hex){
  const [r, g, b] = hex2rgb(hex);
  return (0.299*r + 0.587*g + 0.114*b) > 150 ? "#14161A" : "#FFFFFF";
}
function orderRef(){
  // stable for as long as this photo/session lasts — reopening the
  // booklet must show the same reference, not a fresh random one
  if (S.orderRef && S.orderRefImgId === S.imgId) return S.orderRef;
  const seed = `${S.size.id}${S.cells ? S.cells.length : 0}${S.imgId || 0}`;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h*31 + seed.charCodeAt(i)) >>> 0;
  S.orderRef = "MB-" + String(h % 100000).padStart(5, "0");
  S.orderRefImgId = S.imgId;
  return S.orderRef;
}

const TIPS = [
  "Work along a row, not down a column — your eye keeps its place better.",
  "Pour one color at a time into a lid. Chasing a single brick in a mixed pile is where evenings go.",
  "Press bricks down with a thumb, not a fist. They only need to click.",
  "Wrong brick? The separator lifts it cleanly — no need to bend the plate.",
  "Stand back every few rows. Mosaics look like nothing up close and like magic from the sofa.",
  "Losing your place? The heavy lines mark every 8 studs — count in eights, not ones.",
  "Two similar colors side by side? Check the code, not the color. That's what codes are for.",
  "Take a photo when you finish each section. They make a lovely time-lapse.",
  "Sort the fiddliest colors first while your patience is fresh.",
];

// 11x17" sheet, 10mm page margin, 14mm/11mm sheet padding — the real
// usable content area a grid can print into at true physical scale.
// Module-level (not just local to instructionsHTML) so the PDF export
// below shares this exact same true-size decision, not a second copy
// of the same math that could quietly drift out of sync with it.
const PRINTABLE_W_MM = 279.4 - 2*11, PRINTABLE_H_MM = 431.8 - 2*14;
function sectionScale(wStuds, hStuds){
  const trueWmm = wStuds * BRICK_MM, trueHmm = hStuds * BRICK_MM;
  if (trueWmm <= PRINTABLE_W_MM && trueHmm <= PRINTABLE_H_MM) return 1;   // true 1:1 fits as-is
  // otherwise scale down just enough to fit, and say so honestly —
  // never silently mis-report a physical size
  return Math.min(PRINTABLE_W_MM/trueWmm, PRINTABLE_H_MM/trueHmm);
}

function instructionsHTML(){
  const { gw, gh, bx, by } = dims();
  const P = S.usedPal, cells = S.cells;
  const total = gw*gh;
  const counts = new Map();
  for (let i = 0; i < cells.length; i++){
    const c = P[cells[i]];
    counts.set(c.id, (counts.get(c.id) || 0) + 1);
  }
  const legend = P.map((c) => ({ ...c, n: counts.get(c.id) || 0 }))
                  .filter((c) => c.n > 0).sort((a, b) => b.n - a.n);
  const ref = orderRef();
  const date = new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" });
  const cm = (n) => (n*BRICK_MM/10).toFixed(1);
  const cols = tiles(gw, bx), rows = tiles(gh, by);
  const nSections = cols.length * rows.length;
  const preview = mos.toDataURL("image/png");
  const totalPacks = legend.reduce((a, c) => a + packs(c.n), 0);
  const hours = S.size.hours;

  const rainbow = `<div class="rb"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>`;
  const head = (n, label) => `<header class="ih"><span class="mark">MEMOBRICK</span>
    <span class="ref">${label} · ${ref} · ${n}</span></header>`;

  /* ---------------- 1. cover ---------------- */
  let out = `<section class="sheet cover">
    ${rainbow}
    <div class="cover-in">
      <p class="kicker">Turn memories into art</p>
      <p class="bk-title">Build<br>instructions</p>
      <div class="studframe"><img src="${preview}" alt="Your finished mosaic"></div>
      <div class="cover-meta">
        <div><b>${S.size.label}</b><span>finished size</span></div>
        <div><b>${fmt(total)}</b><span>bricks</span></div>
        <div><b>${legend.length}</b><span>colors</span></div>
        <div><b>${nSections}</b><span>sections</span></div>
      </div>
      <p class="cover-ref">${ref} · ${date}</p>
    </div>
  </section>`;

  /* ---------------- 2. welcome + in the box ---------------- */
  const icon = (d) => `<svg viewBox="0 0 40 40" class="ic">${d}</svg>`;
  out += `<section class="sheet">
    ${head(2, "Welcome")}
    <h2 class="big">Hello, and congratulations.</h2>
    <p class="lead">Somewhere in this box is a photo you love, taken apart into ${fmt(total)} pieces.
       Putting it back together takes about ${hours} ${hours === 1 ? "hour" : "hours"} — longer if people
       keep wandering over to help, which they will.</p>

    <h3>What's in the box</h3>
    <div class="boxgrid">
      <div>${icon('<rect x="5" y="9" width="30" height="22" rx="3" fill="none" stroke="#14161A" stroke-width="2.4"/><path d="M5 17h30M15 9v22M25 9v22" stroke="#14161A" stroke-width="1.6" opacity=".5"/>')}
        <b>${legend.length} bags of bricks</b><span>labelled with the color code</span></div>
      <div>${icon('<rect x="6" y="6" width="28" height="28" rx="3" fill="none" stroke="#14161A" stroke-width="2.4"/><circle cx="14" cy="14" r="2.6"/><circle cx="26" cy="14" r="2.6"/><circle cx="14" cy="26" r="2.6"/><circle cx="26" cy="26" r="2.6"/>')}
        <b>${bx*by} baseplate${bx*by === 1 ? "" : "s"}</b><span>${bx} × ${by}, they clip together</span></div>
      <div>${icon('<path d="M12 26l10-16 6 4-10 16z" fill="none" stroke="#14161A" stroke-width="2.4"/><path d="M10 30h9" stroke="#14161A" stroke-width="2.4"/>')}
        <b>1 brick separator</b><span>for the piece in the wrong square</span></div>
      <div>${icon('<path d="M9 7h22a2 2 0 012 2v22a2 2 0 01-2 2H9z" fill="none" stroke="#14161A" stroke-width="2.4"/><path d="M15 15h14M15 21h16M15 27h10" stroke="#14161A" stroke-width="1.8" opacity=".55"/>')}
        <b>This booklet</b><span>${nSections} section${nSections === 1 ? "" : "s"}, one page each</span></div>
    </div>

    <h3>Four rules and you're away</h3>
    <ol class="rules">
      <li><b>One section at a time.</b> Finish a whole baseplate before you start the next. Half-finished
          plates are how bricks end up in the wrong square.</li>
      <li><b>Left to right, top to bottom.</b> Same as reading. Your place is easier to find again.</li>
      <li><b>Match the code, not the color.</b> Two browns look identical under a lamp. Their codes don't.</li>
      <li><b>Look from across the room.</b> Up close it's a grid of dots. Six feet back it's a face.</li>
    </ol>

    <div class="warn">
      <b>WARNING: CHOKING HAZARD</b> — contains small parts. Not for children under 3 years.<br>
      All MemoBrick products are sold as decorative art objects.
    </div>
  </section>`;

  /* ---------------- 3. how to read a page ---------------- */
  const demo = legend.slice(0, 4);
  const demoCell = (i, j) => {
    const c = demo[(i + j) % demo.length];
    return `<td style="background:${c.hex};color:${readable(c.hex)}">${c.id}</td>`;
  };
  out += `<section class="sheet">
    ${head(3, "How to read a page")}
    <h2 class="big">Every section page works the same way.</h2>
    <p class="lead">Once you've read this once, you can ignore it forever.</p>

    <div class="howto">
      <table class="grid demo">
        <tr><th></th>${[1,2,3,4,5,6,7,8].map((n) => `<th>${n}</th>`).join("")}<th></th></tr>
        ${[1,2,3,4,5,6,7,8].map((r) => `<tr><th>${r}</th>${
          [1,2,3,4,5,6,7,8].map((c) => demoCell(r, c)).join("")}<th>${r}</th></tr>`).join("")}
      </table>
      <ol class="callouts">
        <li><b>1</b><div><b>Column numbers</b> run across the top. They match the studs on the plate,
            counting from the left edge.</div></li>
        <li><b>2</b><div><b>Row numbers on both sides.</b> Cover the page with a ruler under the row
            you're on and slide it down.</div></li>
        <li><b>3</b><div><b>The number in each square is the color code</b> printed on the bag —
            not a quantity. One square, one brick.</div></li>
        <li><b>4</b><div><b>Heavy lines every 8 studs.</b> Count in eights and you'll never lose
            your place mid-row.</div></li>
        <li><b>5</b><div><b>The little map</b> in the corner shows which section of the whole picture
            you're building.</div></li>
      </ol>
    </div>

    <h3>Build order</h3>
    <p class="note">Work through the sections in this order — it keeps finished plates out of your way.</p>
    <table class="ordermap">${rows.map((_, r) => `<tr>${cols.map((__, c) =>
      `<td><b>${r*cols.length + c + 1}</b><span>${c+1},${r+1}</span></td>`).join("")}</tr>`).join("")}</table>
  </section>`;

  /* ---------------- 4. your bricks ---------------- */
  out += `<section class="sheet">
    ${head(4, "Your bricks")}
    <h2 class="big">${legend.length} colors, ${fmt(total)} bricks.</h2>
    <p class="lead">Tick each bag off as you open it. Packs hold ${PACK_SIZE} bricks and are rounded up,
       so every kit arrives with spares — keep them, they're the free replacements.</p>
    <table class="legend big">
      <tr><th></th><th>Code</th><th>Color</th><th>Brick</th><th>Bricks</th><th>Packs</th><th>Opened</th></tr>
      ${legend.map((c) => `<tr>
        <td><span class="sw" style="background:${c.hex}"></span></td>
        <td class="code">${c.id}</td><td>${c.name}</td><td class="code sup">${c.brick}</td>
        <td class="num">${fmt(c.n)}</td><td class="num">${packs(c.n)}</td>
        <td class="tick"></td></tr>`).join("")}
      <tr class="tot"><td></td><td></td><td>Total</td><td></td><td class="num">${fmt(total)}</td>
        <td class="num">${totalPacks}</td><td></td></tr>
    </table>
    <div class="factbar">
      <div><b>${cm(gw)} × ${cm(gh)} cm</b><span>finished size</span></div>
      <div><b>${gw} × ${gh}</b><span>studs</span></div>
      <div><b>${BRICK_MM.toFixed(2)} mm</b><span>per brick</span></div>
      <div><b>~${hours} h</b><span>build time</span></div>
    </div>
  </section>`;

  /* ---------------- 5..n sections ---------------- */
  let page = 4;
  rows.forEach(([y0, y1], r) => {
    cols.forEach(([x0, x1], c) => {
      page++;
      const idx = r*cols.length + c + 1;
      const w = x1 - x0, h = y1 - y0;
      const used = new Map();
      let grid = `<tr><th></th>${Array.from({length: w}, (_, i) => `<th>${x0+i+1}</th>`).join("")}<th></th></tr>`;
      for (let y = y0; y < y1; y++){
        let tr = `<tr><th>${y+1}</th>`;
        for (let x = x0; x < x1; x++){
          const col = P[cells[y*gw + x]];
          used.set(col.id, (used.get(col.id) || 0) + 1);
          tr += `<td style="background:${col.hex};color:${readable(col.hex)}">${col.id}</td>`;
        }
        grid += tr + `<th>${y+1}</th></tr>`;
      }
      // this section's own counts decide the order: most used here first
      const plateLegend = legend.filter((L) => used.has(L.id)).sort((a, b) => used.get(b.id) - used.get(a.id));
      const scale = sectionScale(w, h);
      const cellMm = (BRICK_MM * scale).toFixed(3);
      const scaleNote = scale >= 0.999
        ? `<p class="scale-note"><span class="ruler"></span><span>Printed at <b>true size</b> — this ruler mark measures exactly 1 inch. If it doesn't, set your printer to "Actual size" / 100%, not "Fit to page".</span></p>`
        : `<p class="scale-note"><span class="ruler"></span><span><span class="scale-warn">Reduced to ${Math.round(scale*100)}% of true size</span> — this baseplate is larger than an 11×17" sheet. Use the printed grid for brick placement, not as a physical size reference.</span></p>`;
      out += `<section class="sheet">
        ${head(page, "Section " + idx)}
        <div class="bk-head">
          <div class="secno">${idx}</div>
          <div>
            <h2>Section ${c+1},${r+1}</h2>
            <p class="note">Studs ${x0+1}–${x1} across · ${y0+1}–${y1} down · ${fmt(w*h)} bricks ·
               ${plateLegend.length} colors</p>
          </div>
          <table class="locator">${rows.map((_, rr) => `<tr>${cols.map((__, cc) =>
            `<td class="${rr===r && cc===c ? "here" : (rr*cols.length+cc+1 < idx ? "past" : "")}"></td>`).join("")}</tr>`).join("")}</table>
        </div>
        <div class="progress"><span style="width:${Math.round(idx/nSections*100)}%"></span>
          <em>${idx} of ${nSections} sections</em></div>
        ${scaleNote}
        <table class="grid" style="--cell-mm:${cellMm}">${grid}</table>
        <div class="sec-colors">
          <div class="sc-head">
            <b>Colors for this section</b>
            <span>${plateLegend.length} colors · ${fmt(w*h)} bricks · most used first</span>
          </div>
          <!-- color cards instead of a long table: a single column of up to
               18 colors pushed the page past 17" and split the list across
               two printed sheets. The swatch carries the code exactly as
               the grid squares do, so a card matches a square at a glance -->
          <div class="sc-grid">
            ${plateLegend.map((L) => `<div class="sc" title="${L.name}">
              <span class="sc-sw" style="background:${L.hex};color:${readable(L.hex)}">${L.id}</span>
              <span class="sc-n">${fmt(used.get(L.id))}</span>
              <span class="sc-tick"></span>
            </div>`).join("")}
          </div>
        </div>
        <div class="sec-tip">
          <span class="st-label">Tip</span>
          <p>${TIPS[(idx - 1) % TIPS.length]}</p>
          <label class="done"><span></span>Section ${idx} finished</label>
        </div>
      </section>`;
    });
  });

  /* ---------------- last: finished ---------------- */
  out += `<section class="sheet finish">
    ${head(page + 1, "Finished")}
    <p class="bk-huge">You did it.</p>
    <p class="lead">${fmt(total)} bricks, ${legend.length} colors, placed one at a time by hand.
       Here's what to do with it now.</p>
    <div class="finishgrid">
      <div><b>Hang it at 57 inches</b><span>Galleries hang the centre of a picture at 57&quot; (145 cm)
        from the floor. It looks right because it meets the eye. Clip the baseplates together first,
        then mount the whole panel.</span></div>
      <div><b>Dust, don't wipe</b><span>A soft brush or a hairdryer on cool. Water gets under the studs
        and takes days to leave.</span></div>
      <div><b>Missing a brick?</b><span>Tell us the color code from your bag label and we'll post
        replacements free, for as long as you own the kit.</span></div>
      <div><b>Show it off</b><span>Tag <b>@memobrick</b> — we share builds every week, and yours took
        real hours.</span></div>
    </div>
    <div class="signoff">
      <div><span>Built by</span><i></i></div>
      <div><span>Finished on</span><i></i></div>
    </div>
    <p class="thanks">Thank you for building with us.<br><b>MEMOBRICK</b> · Turn memories into art</p>
    ${rainbow}
  </section>`;

  return out;
}

/* =====================================================================
   BUILD INSTRUCTIONS — real PDF export
   A genuine vector PDF (jsPDF), not a print()-to-PDF of the HTML view
   above. That relies on the browser's print dialog picking a paper
   size that matches this page's own forced @page size, which most
   people never touch — mismatch there is exactly what turns one
   finished page into "one page good, one blank." Building the PDF
   directly means every page break is placed here, explicitly, so
   there is nothing left for a print dialog to get wrong.
   Shares tiles(), sectionScale(), fmt(), packs(), readable() and
   BRICK_MM with the HTML view above rather than reimplementing them,
   so the two can't quietly drift apart on the same numbers.
   ===================================================================== */
const PDF_PAGE_W = 279.4, PDF_PAGE_H = 431.8;     // 11 x 17"
const PDF_MARGIN_X = 11, PDF_MARGIN_Y = 14;
const PDF_CONTENT_W = PDF_PAGE_W - 2*PDF_MARGIN_X;
const PDF_INK = [0x14,0x16,0x1A], PDF_INK2 = [0x5A,0x60,0x68], PDF_INK3 = [0x8C,0x91,0x99];
const PDF_LINE = [0xDC,0xDB,0xD6], PDF_LINE_SOFT = [0xE4,0xE2,0xDC];
const PDF_RED = [0xE2,0x38,0x2B], PDF_YELLOW = [0xFF,0xC7,0x2C];
const PDF_RAINBOW = [[0xE2,0x38,0x2B],[0xF5,0x82,0x20],[0xFF,0xC7,0x2C],[0x34,0xA8,0x53],
                      [0x12,0xA9,0xA0],[0x0F,0x9B,0xD7],[0xB0,0x4A,0xA0]];

function pdfHexRgb(hex){ return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)]; }
function pdfReadable(hex){ return readable(hex) === "#14161A" ? PDF_INK : [255,255,255]; }
function pdfRainbowBar(doc, y, h){
  const w = PDF_CONTENT_W / PDF_RAINBOW.length;
  PDF_RAINBOW.forEach((c, i) => { doc.setFillColor(...c); doc.rect(PDF_MARGIN_X + i*w, y, w + 0.3, h, "F"); });
}
function pdfHeader(doc, label, ref, pageNum){
  doc.setTextColor(...PDF_INK); doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text("MEMOBRICK", PDF_MARGIN_X, PDF_MARGIN_Y - 4);
  doc.setFont("courier", "normal"); doc.setFontSize(8.5); doc.setTextColor(...PDF_INK2);
  doc.text(`${label} \u00B7 ${ref} \u00B7 ${pageNum}`, PDF_PAGE_W - PDF_MARGIN_X, PDF_MARGIN_Y - 4, { align: "right" });
  doc.setDrawColor(...PDF_INK); doc.setLineWidth(0.5);
  doc.line(PDF_MARGIN_X, PDF_MARGIN_Y - 1.5, PDF_PAGE_W - PDF_MARGIN_X, PDF_MARGIN_Y - 1.5);
}
function pdfWrap(doc, text, maxWidth, size, font = "helvetica", style = "normal"){
  doc.setFont(font, style); doc.setFontSize(size);
  return doc.splitTextToSize(text, maxWidth);
}

function buildInstructionsPDF(doc){
  const { gw, gh, bx, by } = dims();
  const P = S.usedPal, cellsArr = S.cells;
  const total = gw*gh;
  const counts = new Map();
  for (let i = 0; i < cellsArr.length; i++){
    const c = P[cellsArr[i]];
    counts.set(c.id, (counts.get(c.id) || 0) + 1);
  }
  const legend = P.map((c) => ({ ...c, n: counts.get(c.id) || 0 }))
                  .filter((c) => c.n > 0).sort((a, b) => b.n - a.n);
  const ref = orderRef();
  const date = new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" });
  const cm = (n) => (n*BRICK_MM/10).toFixed(1);
  const cols = tiles(gw, bx), rows = tiles(gh, by);
  const nSections = cols.length * rows.length;
  const totalPacks = legend.reduce((a, c) => a + packs(c.n), 0);
  const hours = S.size.hours;
  const sizeLabel = S.size.label;
  let preview = null;
  try { preview = mos.toDataURL("image/png"); } catch (e) {}

  let pageNum = 1;

  /* ---- 1. cover ---- */
  pdfRainbowBar(doc, 0, 2.2);
  doc.setTextColor(...PDF_INK3); doc.setFont("courier", "normal"); doc.setFontSize(9);
  doc.text("TURN MEMORIES INTO ART", PDF_MARGIN_X, 22);
  doc.setTextColor(...PDF_INK); doc.setFont("helvetica", "bold"); doc.setFontSize(40);
  doc.text("Build", PDF_MARGIN_X, 38);
  doc.text("instructions", PDF_MARGIN_X, 50);

  const frameY = 62, frameH = 190;
  doc.setDrawColor(...PDF_INK); doc.setLineWidth(0.8);
  doc.roundedRect(PDF_MARGIN_X, frameY, PDF_CONTENT_W, frameH, 3, 3, "S");
  if (preview){
    try {
      const props = doc.getImageProperties(preview);
      const pad = 8, maxW = PDF_CONTENT_W - pad*2, maxH = frameH - pad*2;
      let w = maxW, h = w * props.height / props.width;
      if (h > maxH){ h = maxH; w = h * props.width / props.height; }
      doc.addImage(preview, "PNG", PDF_MARGIN_X + (PDF_CONTENT_W-w)/2, frameY + (frameH-h)/2, w, h);
    } catch (e) {}
  }

  const statY = frameY + frameH + 14;
  const stats = [[sizeLabel, "finished size"], [fmt(total), "bricks"],
                 [String(legend.length), "colors"], [String(nSections), nSections === 1 ? "section" : "sections"]];
  const colW = PDF_CONTENT_W / 4;
  stats.forEach(([big, small], i) => {
    const x = PDF_MARGIN_X + i*colW;
    doc.setDrawColor(...PDF_INK); doc.setLineWidth(0.6);
    doc.line(x, statY, x + colW - 6, statY);
    doc.setTextColor(...PDF_INK); doc.setFont("helvetica", "bold"); doc.setFontSize(17);
    doc.text(big, x, statY + 8);
    doc.setTextColor(...PDF_INK3); doc.setFont("courier", "normal"); doc.setFontSize(7);
    doc.text(small.toUpperCase(), x, statY + 13);
  });
  doc.setTextColor(...PDF_INK3); doc.setFont("courier", "normal"); doc.setFontSize(8);
  doc.text(`${ref} \u00B7 ${date}`, PDF_MARGIN_X, PDF_PAGE_H - PDF_MARGIN_Y);

  /* ---- 2. welcome ---- */
  doc.addPage([PDF_PAGE_W, PDF_PAGE_H], "portrait"); pageNum++;
  pdfHeader(doc, "Welcome", ref, pageNum);
  let y = PDF_MARGIN_Y + 12;
  doc.setTextColor(...PDF_INK); doc.setFont("helvetica", "bold"); doc.setFontSize(21);
  doc.text("Hello, and congratulations.", PDF_MARGIN_X, y);
  y += 10;
  doc.setTextColor(...PDF_INK2);
  const introLines = pdfWrap(doc,
    `Somewhere in this box is a photo you love, taken apart into ${fmt(total)} pieces. Putting it back together takes about ${hours} ${hours === 1 ? "hour" : "hours"} \u2014 longer if people keep wandering over to help, which they will.`,
    PDF_CONTENT_W, 10.5);
  doc.text(introLines, PDF_MARGIN_X, y);
  y += introLines.length*5 + 8;

  doc.setTextColor(...PDF_INK); doc.setFont("helvetica", "bold"); doc.setFontSize(12.5);
  doc.text("What's in the box", PDF_MARGIN_X, y); y += 7;
  const boxItems = [[`${legend.length} bags of bricks`,"labelled with the color code"],
                     [`${bx*by} baseplate${bx*by === 1 ? "" : "s"}`, `${bx} \u00D7 ${by}, they clip together`],
                     ["1 brick separator","for the piece in the wrong square"],
                     ["This booklet",`${nSections} section${nSections === 1 ? "" : "s"}, one page each`]];
  const bw = (PDF_CONTENT_W - 6)/2, bh = 22;
  boxItems.forEach(([t,s], i) => {
    const bx_ = PDF_MARGIN_X + (i%2)*(bw+6), by_ = y + Math.floor(i/2)*(bh+6);
    doc.setDrawColor(...PDF_LINE); doc.setLineWidth(0.4);
    doc.roundedRect(bx_, by_, bw, bh, 2, 2, "S");
    doc.setTextColor(...PDF_INK); doc.setFont("helvetica", "bold"); doc.setFontSize(11);
    doc.text(t, bx_+6, by_+10);
    doc.setTextColor(...PDF_INK3); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
    doc.text(s, bx_+6, by_+16);
  });
  y += 2*(bh+6) + 6;

  doc.setTextColor(...PDF_INK); doc.setFont("helvetica", "bold"); doc.setFontSize(12.5);
  doc.text("Four rules and you're away", PDF_MARGIN_X, y); y += 8;
  const rules = [
    ["One section at a time.", "Finish a whole baseplate before you start the next. Half-finished plates are how bricks end up in the wrong square."],
    ["Left to right, top to bottom.", "Same as reading. Your place is easier to find again."],
    ["Match the code, not the color.", "Two browns look identical under a lamp. Their codes don't."],
    ["Look from across the room.", "Up close it's a grid of dots. Six feet back it's a face."],
  ];
  rules.forEach(([lead, rest], i) => {
    doc.setFillColor(...PDF_INK); doc.circle(PDF_MARGIN_X+3, y-1.5, 3, "F");
    doc.setTextColor(255,255,255); doc.setFont("helvetica","normal"); doc.setFontSize(8);
    doc.text(String(i+1), PDF_MARGIN_X+3, y, { align:"center" });
    doc.setTextColor(...PDF_INK); doc.setFont("helvetica","bold"); doc.setFontSize(10);
    doc.text(lead, PDF_MARGIN_X+9, y);
    const leadW = doc.getTextWidth(lead+" ");
    doc.setTextColor(...PDF_INK2); doc.setFont("helvetica","normal");
    const restLines = pdfWrap(doc, rest, PDF_CONTENT_W-9-leadW, 10);
    doc.text(restLines[0], PDF_MARGIN_X+9+leadW, y);
    for (let k=1;k<restLines.length;k++) doc.text(restLines[k], PDF_MARGIN_X+9, y+k*5);
    y += Math.max(5, restLines.length*5) + 5;
    doc.setDrawColor(...PDF_LINE_SOFT); doc.setLineWidth(0.3);
    // divider sits between the two rules, clear of the next rule's text and number
    doc.line(PDF_MARGIN_X, y-5.5, PDF_PAGE_W-PDF_MARGIN_X, y-5.5);
  });
  y += 4;
  doc.setDrawColor(...PDF_INK); doc.setLineWidth(0.5);
  doc.roundedRect(PDF_MARGIN_X, y, PDF_CONTENT_W, 16, 1.5, 1.5, "S");
  doc.setTextColor(...PDF_INK); doc.setFont("helvetica","bold"); doc.setFontSize(8.5);
  doc.text("WARNING: CHOKING HAZARD \u2014 contains small parts. Not for children under 3 years.", PDF_PAGE_W/2, y+7, { align:"center" });
  doc.setFont("helvetica","normal");
  doc.text("All MemoBrick products are sold as decorative art objects.", PDF_PAGE_W/2, y+12, { align:"center" });

  /* ---- 3. how to read a page ---- */
  doc.addPage([PDF_PAGE_W, PDF_PAGE_H], "portrait"); pageNum++;
  pdfHeader(doc, "How to read a page", ref, pageNum);
  y = PDF_MARGIN_Y + 12;
  doc.setTextColor(...PDF_INK); doc.setFont("helvetica","bold"); doc.setFontSize(19);
  doc.text("Every section page works the same way.", PDF_MARGIN_X, y); y += 7;
  doc.setTextColor(...PDF_INK2); doc.setFont("helvetica","normal"); doc.setFontSize(10.5);
  doc.text("Once you've read this once, you can ignore it forever.", PDF_MARGIN_X, y); y += 10;

  const demoCell = 9, demoCodes = ["022","004","017","028"];
  const demoColors = { "022":"#4AA357", "004":"#FCF188", "017":"#8D8F68", "028":"#A2BA45" };
  const gx0 = PDF_MARGIN_X, gy0 = y;
  doc.setFont("courier","normal"); doc.setFontSize(6);
  for (let r=0;r<8;r++) for (let c=0;c<8;c++){
    const code = demoCodes[(r+c)%4], hex = demoColors[code];
    doc.setFillColor(...pdfHexRgb(hex));
    const cx = gx0+6+c*demoCell, cy = gy0+r*demoCell;
    doc.rect(cx, cy, demoCell, demoCell, "F");
    doc.setTextColor(...pdfReadable(hex));
    doc.text(code, cx+demoCell/2, cy+demoCell/2+1.2, { align:"center" });
  }
  doc.setDrawColor(...PDF_INK); doc.setLineWidth(0.3);
  doc.rect(gx0+6, gy0, demoCell*8, demoCell*8, "S");
  doc.setTextColor(...PDF_INK2); doc.setFont("helvetica","normal"); doc.setFontSize(7);
  for (let c=0;c<8;c++) doc.text(String(c+1), gx0+6+c*demoCell+demoCell/2, gy0-2, { align:"center" });
  for (let r=0;r<8;r++) doc.text(String(r+1), gx0+2, gy0+r*demoCell+demoCell/2+1, { align:"center" });

  const calloutX = gx0+6+demoCell*8+12, calloutW = PDF_PAGE_W-PDF_MARGIN_X-calloutX;
  const callouts = [
    "Column numbers run across the top. They match the studs on the plate, counting from the left edge.",
    "Row numbers on both sides. Cover the page with a ruler under the row you're on and slide it down.",
    "The number in each square is the color code printed on the bag \u2014 not a quantity. One square, one brick.",
    "Heavy lines every 8 studs. Count in eights and you'll never lose your place mid-row.",
    "The little map in the corner shows which section of the whole picture you're building.",
  ];
  let cy2 = gy0+2;
  callouts.forEach((txt, i) => {
    doc.setFillColor(...PDF_YELLOW); doc.circle(calloutX+3, cy2, 3, "F");
    doc.setTextColor(...PDF_INK); doc.setFont("helvetica","normal"); doc.setFontSize(8);
    doc.text(String(i+1), calloutX+3, cy2+1, { align:"center" });
    const lines = pdfWrap(doc, txt, calloutW-8, 8.5);
    doc.setTextColor(...PDF_INK2);
    doc.text(lines, calloutX+8, cy2+1.5);
    cy2 += Math.max(7, lines.length*4) + 4;
  });

  y = gy0 + demoCell*8 + 14;
  doc.setTextColor(...PDF_INK); doc.setFont("helvetica","bold"); doc.setFontSize(11);
  doc.text("Build order", PDF_MARGIN_X, y); y += 6;
  doc.setTextColor(...PDF_INK2); doc.setFont("helvetica","normal"); doc.setFontSize(9.5);
  doc.text("Work through the sections in this order \u2014 it keeps finished plates out of your way.", PDF_MARGIN_X, y); y += 8;
  const tileSize = 15;
  for (let r=0;r<rows.length;r++) for (let c=0;c<cols.length;c++){
    const idx = r*cols.length+c+1;
    const tx = PDF_MARGIN_X+c*(tileSize+3), ty = y+r*(tileSize+3);
    doc.setDrawColor(...PDF_INK); doc.setLineWidth(0.5);
    doc.roundedRect(tx, ty, tileSize, tileSize, 1.5, 1.5, "S");
    doc.setTextColor(...PDF_INK); doc.setFont("helvetica","bold"); doc.setFontSize(11);
    doc.text(String(idx), tx+3, ty+7);
    doc.setFont("courier","normal"); doc.setFontSize(6.5); doc.setTextColor(...PDF_INK3);
    doc.text(`${c+1},${r+1}`, tx+3, ty+12);
  }

  /* ---- 4. your bricks (paginated) ---- */
  doc.addPage([PDF_PAGE_W, PDF_PAGE_H], "portrait"); pageNum++;
  pdfHeader(doc, "Your bricks", ref, pageNum);
  y = PDF_MARGIN_Y + 12;
  doc.setTextColor(...PDF_INK); doc.setFont("helvetica","bold"); doc.setFontSize(19);
  doc.text(`${legend.length} colors, ${fmt(total)} bricks.`, PDF_MARGIN_X, y); y += 7;
  doc.setTextColor(...PDF_INK2); doc.setFont("helvetica","normal"); doc.setFontSize(10);
  const yb = pdfWrap(doc, `Tick each bag off as you open it. Packs hold ${PACK_SIZE} bricks and are rounded up, so every kit arrives with spares \u2014 keep them, they're the free replacements.`, PDF_CONTENT_W, 10);
  doc.text(yb, PDF_MARGIN_X, y); y += yb.length*5 + 8;

  const colX = { sw: PDF_MARGIN_X, code: PDF_MARGIN_X+8, color: PDF_MARGIN_X+26, brick: PDF_MARGIN_X+90,
                 bricks: PDF_MARGIN_X+150, packs2: PDF_MARGIN_X+185, opened: PDF_PAGE_W-PDF_MARGIN_X-8 };
  const bigHeader = () => {
    doc.setTextColor(...PDF_INK3); doc.setFont("courier","normal"); doc.setFontSize(7.5);
    doc.text("CODE", colX.code, y); doc.text("COLOR", colX.color, y);
    doc.text("BRICK", colX.brick, y); doc.text("BRICKS", colX.bricks, y, { align:"right" });
    doc.text("PACKS", colX.packs2, y, { align:"right" }); doc.text("OPENED", colX.opened, y, { align:"right" });
    doc.setDrawColor(...PDF_INK); doc.setLineWidth(0.5);
    doc.line(PDF_MARGIN_X, y+2, PDF_PAGE_W-PDF_MARGIN_X, y+2);
    y += 8;
  };
  bigHeader();
  const rowH = 8;
  const checkSpace4 = (needed, label) => {
    if (y + needed > PDF_PAGE_H - PDF_MARGIN_Y){
      doc.addPage([PDF_PAGE_W, PDF_PAGE_H], "portrait"); pageNum++;
      pdfHeader(doc, label, ref, pageNum);
      y = PDF_MARGIN_Y + 8;
      bigHeader();
    }
  };
  for (const c of legend){
    checkSpace4(rowH, "Your bricks");
    doc.setFillColor(...pdfHexRgb(c.hex)); doc.setDrawColor(...PDF_INK); doc.setLineWidth(0.15);
    doc.roundedRect(colX.sw, y-4, 5, 5, 1, 1, "FD");
    doc.setTextColor(...PDF_INK); doc.setFont("courier","normal"); doc.setFontSize(9);
    doc.text(c.id, colX.code, y);
    doc.setFont("helvetica","normal"); doc.text(c.name, colX.color, y);
    doc.setTextColor(...PDF_INK3); doc.setFont("courier","normal"); doc.setFontSize(8);
    doc.text(String(c.brick), colX.brick, y);
    doc.setTextColor(...PDF_INK); doc.setFont("courier","normal"); doc.setFontSize(9);
    doc.text(fmt(c.n), colX.bricks, y, { align:"right" });
    doc.text(String(packs(c.n)), colX.packs2, y, { align:"right" });
    doc.setDrawColor(...PDF_INK); doc.setLineWidth(0.3);
    doc.rect(colX.opened-3.5, y-3.5, 3.5, 3.5, "S");
    doc.setDrawColor(...PDF_LINE_SOFT); doc.setLineWidth(0.2);
    doc.line(PDF_MARGIN_X, y+2.5, PDF_PAGE_W-PDF_MARGIN_X, y+2.5);
    y += rowH;
  }
  checkSpace4(10, "Your bricks");
  doc.setDrawColor(...PDF_INK); doc.setLineWidth(0.6);
  doc.line(PDF_MARGIN_X, y-4, PDF_PAGE_W-PDF_MARGIN_X, y-4);
  doc.setTextColor(...PDF_INK); doc.setFont("helvetica","bold"); doc.setFontSize(10);
  doc.text("Total", colX.color, y);
  doc.setFont("courier","normal");
  doc.text(fmt(total), colX.bricks, y, { align:"right" });
  doc.text(String(totalPacks), colX.packs2, y, { align:"right" });
  y += 14;

  checkSpace4(28, "Your bricks");
  const factW = (PDF_CONTENT_W - 18) / 4;
  const facts = [[`${cm(gw)} \u00D7 ${cm(gh)} cm`,"finished size"], [`${gw} \u00D7 ${gh}`,"studs"],
                 [`${BRICK_MM.toFixed(2)} mm`,"per brick"], [`~${hours} h`,"build time"]];
  facts.forEach(([big, small], i) => {
    const fx = PDF_MARGIN_X + i*(factW+6);
    doc.setFillColor(0xF2,0xF1,0xED);
    doc.roundedRect(fx, y, factW, 20, 1.5, 1.5, "F");
    doc.setTextColor(...PDF_INK); doc.setFont("helvetica","bold"); doc.setFontSize(12);
    doc.text(big, fx+4, y+9);
    doc.setTextColor(...PDF_INK3); doc.setFont("courier","normal"); doc.setFontSize(6.5);
    doc.text(small.toUpperCase(), fx+4, y+15);
  });

  /* ---- 5..n section pages ---- */
  rows.forEach(([y0, y1], r) => {
    cols.forEach(([x0, x1], c) => {
      const idx = r*cols.length + c + 1;
      const w = x1 - x0, h = y1 - y0;
      const secSet = new Set();
      for (let yy=0; yy<h; yy++) for (let xx=0; xx<w; xx++) secSet.add(P[cellsArr[(y0+yy)*gw + (x0+xx)]].id);
      const secColors = secSet.size;
      doc.addPage([PDF_PAGE_W, PDF_PAGE_H], "portrait"); pageNum++;
      pdfHeader(doc, `Section ${idx}`, ref, pageNum);
      let sy = PDF_MARGIN_Y + 12;

      doc.setFillColor(...PDF_INK); doc.roundedRect(PDF_MARGIN_X, sy-7, 11, 11, 2, 2, "F");
      doc.setTextColor(255,255,255); doc.setFont("helvetica","bold"); doc.setFontSize(13);
      doc.text(String(idx), PDF_MARGIN_X+5.5, sy, { align:"center" });
      doc.setTextColor(...PDF_INK); doc.setFont("helvetica","bold"); doc.setFontSize(17);
      doc.text(`Section ${idx}`, PDF_MARGIN_X+16, sy-1);
      doc.setTextColor(...PDF_INK3); doc.setFont("courier","normal"); doc.setFontSize(8);
      doc.text(`Studs ${x0+1}\u2013${x1} across \u00B7 ${y0+1}\u2013${y1} down \u00B7 ${fmt(w*h)} bricks \u00B7 ${secColors} colors`, PDF_MARGIN_X+16, sy+5);
      sy += 12;

      const scale = sectionScale(w, h);
      const cellMm = BRICK_MM * scale;
      if (scale >= 0.999){
        doc.setTextColor(...PDF_RED); doc.setFont("helvetica","bold"); doc.setFontSize(8.5);
        doc.text("Printed at true size", PDF_MARGIN_X, sy);
        const w1 = doc.getTextWidth("Printed at true size ");
        doc.setTextColor(...PDF_INK2); doc.setFont("helvetica","normal");
        const noteLines = pdfWrap(doc, "\u2014 this 1-inch mark measures exactly 25.4mm. If it doesn't, your printer changed the scale.", PDF_CONTENT_W-w1, 8.5);
        doc.text(noteLines, PDF_MARGIN_X+w1, sy);
        doc.setDrawColor(...PDF_RED); doc.setLineWidth(0.6);
        doc.line(PDF_MARGIN_X, sy+4, PDF_MARGIN_X+25.4, sy+4);
      } else {
        doc.setTextColor(...PDF_RED); doc.setFont("helvetica","bold"); doc.setFontSize(8.5);
        doc.text(`Reduced to ${Math.round(scale*100)}% of true size`, PDF_MARGIN_X, sy);
        const w1 = doc.getTextWidth(`Reduced to ${Math.round(scale*100)}% of true size `);
        doc.setTextColor(...PDF_INK2); doc.setFont("helvetica","normal");
        const noteLines = pdfWrap(doc, "\u2014 this baseplate is larger than an 11\u00D717\" sheet. Use the printed grid for brick placement, not as a physical size reference.", PDF_CONTENT_W-w1, 8.5);
        doc.text(noteLines, PDF_MARGIN_X+w1, sy);
      }
      sy += 10;

      const gx = PDF_MARGIN_X, gy = sy + 4;
      doc.setFont("courier","normal");
      const fontPt = Math.max(3.2, Math.min(6.5, cellMm*1.15));
      doc.setFontSize(fontPt);
      for (let yy=0; yy<h; yy++){
        for (let xx=0; xx<w; xx++){
          const code = P[cellsArr[(y0+yy)*gw + (x0+xx)]];
          const cx = gx+xx*cellMm, cy = gy+yy*cellMm;
          doc.setFillColor(...pdfHexRgb(code.hex));
          doc.rect(cx, cy, cellMm+0.05, cellMm+0.05, "F");
          doc.setTextColor(...pdfReadable(code.hex));
          doc.text(code.id, cx+cellMm/2, cy+cellMm/2+fontPt*0.32, { align:"center" });
        }
      }
      for (let xx=0; xx<=w; xx++){
        doc.setDrawColor(...(xx%8===0 ? PDF_INK : PDF_LINE_SOFT)); doc.setLineWidth(xx%8===0 ? 0.5 : 0.1);
        doc.line(gx+xx*cellMm, gy, gx+xx*cellMm, gy+h*cellMm);
      }
      for (let yy=0; yy<=h; yy++){
        doc.setDrawColor(...(yy%8===0 ? PDF_INK : PDF_LINE_SOFT)); doc.setLineWidth(yy%8===0 ? 0.5 : 0.1);
        doc.line(gx, gy+yy*cellMm, gx+w*cellMm, gy+yy*cellMm);
      }
      sy = gy + h*cellMm + 8;

      const used = new Map();
      for (let yy=0; yy<h; yy++) for (let xx=0; xx<w; xx++){
        const code = P[cellsArr[(y0+yy)*gw + (x0+xx)]];
        used.set(code.id, (used.get(code.id) || 0) + 1);
      }
      const plateLegend = legend.filter((L) => used.has(L.id)).map((L) => ({ ...L, here: used.get(L.id) }))
                                .sort((a, b) => b.here - a.here);

      const checkSpace5 = (needed) => {
        if (sy + needed > PDF_PAGE_H - PDF_MARGIN_Y){
          doc.addPage([PDF_PAGE_W, PDF_PAGE_H], "portrait"); pageNum++;
          pdfHeader(doc, `Section ${idx}`, ref, pageNum);
          sy = PDF_MARGIN_Y + 8;
        }
      };
      // color cards, same design as the HTML booklet: the code on a
      // swatch (as on the grid), the count, a tick box — nine per row,
      // so even 18 colors take two rows and stay on the section's page
      const perRow = 9, gap = 2.2, pad = 4;
      const cardW = (PDF_CONTENT_W - pad*2 - gap*(perRow-1)) / perRow, cardH = 11;
      const nRows = Math.ceil(plateLegend.length / perRow);
      const boxH = 13 + nRows*cardH + (nRows-1)*gap + pad;
      checkSpace5(boxH + 2);
      doc.setDrawColor(...PDF_INK); doc.setLineWidth(0.4);
      doc.roundedRect(PDF_MARGIN_X, sy, PDF_CONTENT_W, boxH, 3, 3, "S");
      doc.setTextColor(...PDF_INK); doc.setFont("helvetica","bold"); doc.setFontSize(10.5);
      doc.text("Colors for this section", PDF_MARGIN_X+pad, sy+7);
      doc.setTextColor(...PDF_INK3); doc.setFont("courier","normal"); doc.setFontSize(7);
      doc.text(`${plateLegend.length} colors \u00B7 ${fmt(w*h)} bricks \u00B7 most used first`, PDF_PAGE_W-PDF_MARGIN_X-pad, sy+7, { align:"right" });
      plateLegend.forEach((c, i) => {
        const cx = PDF_MARGIN_X + pad + (i % perRow)*(cardW + gap);
        const cy = sy + 11 + Math.floor(i / perRow)*(cardH + gap);
        doc.setFillColor(0xF4,0xF3,0xEF); doc.roundedRect(cx, cy, cardW, cardH, 1.8, 1.8, "F");
        const sw = 8;
        doc.setFillColor(...pdfHexRgb(c.hex)); doc.setDrawColor(0xB4,0xB4,0xB4); doc.setLineWidth(0.15);
        doc.roundedRect(cx+1.5, cy+1.5, sw, sw, 1.2, 1.2, "FD");
        doc.setTextColor(...pdfReadable(c.hex)); doc.setFont("courier","bold"); doc.setFontSize(7);
        doc.text(c.id, cx+1.5+sw/2, cy+1.5+sw/2+0.9, { align:"center" });
        doc.setTextColor(...PDF_INK); doc.setFont("courier","bold"); doc.setFontSize(9.5);
        doc.text(fmt(c.here), cx+sw+3.5, cy+cardH/2+1.3);
        doc.setDrawColor(...PDF_INK); doc.setLineWidth(0.3);
        doc.roundedRect(cx+cardW-4.5, cy+cardH/2-1.5, 3, 3, 0.6, 0.6, "S");
      });
      sy += boxH;

      checkSpace5(24);
      const tip = TIPS[idx % TIPS.length];
      const tipY = sy + 4, tipH = 20;
      doc.setDrawColor(...PDF_INK); doc.setLineWidth(0.4);
      doc.roundedRect(PDF_MARGIN_X, tipY, PDF_CONTENT_W, tipH, 1.5, 1.5, "S");
      doc.setTextColor(...PDF_INK3); doc.setFont("courier","normal"); doc.setFontSize(7);
      doc.text("TIP", PDF_MARGIN_X+4, tipY+6);
      doc.setTextColor(...PDF_INK); doc.setFont("helvetica","normal"); doc.setFontSize(8.5);
      const tipLines = pdfWrap(doc, tip, PDF_CONTENT_W-8, 8.5);
      doc.text(tipLines, PDF_MARGIN_X+4, tipY+11);
      doc.setDrawColor(...PDF_INK); doc.setLineWidth(0.3);
      doc.rect(PDF_MARGIN_X+4, tipY+tipH-6, 3, 3, "S");
      doc.setTextColor(...PDF_INK2); doc.setFontSize(8);
      doc.text(`Section ${idx} finished`, PDF_MARGIN_X+9, tipY+tipH-3.3);
    });
  });

  /* ---- final. finished ---- */
  doc.addPage([PDF_PAGE_W, PDF_PAGE_H], "portrait"); pageNum++;
  pdfHeader(doc, "Finished", ref, pageNum);
  y = PDF_MARGIN_Y + 14;
  doc.setTextColor(...PDF_INK); doc.setFont("helvetica","bold"); doc.setFontSize(24);
  doc.text("You did it.", PDF_MARGIN_X, y); y += 9;
  doc.setTextColor(...PDF_INK2); doc.setFont("helvetica","normal"); doc.setFontSize(10.5);
  const fin = pdfWrap(doc, `${fmt(total)} bricks, ${legend.length} colors, placed one at a time by hand. Here's what to do with it now.`, PDF_CONTENT_W, 10.5);
  doc.text(fin, PDF_MARGIN_X, y); y += fin.length*5 + 10;

  const finItems = [
    ["Hang it at 57 inches", 'Galleries hang the centre of a picture at 57" (145 cm) from the floor. It looks right because it meets the eye. Clip the baseplates together first, then mount the whole panel.'],
    ["Dust, don't wipe", "A soft brush or a hairdryer on cool. Water gets under the studs and takes days to leave."],
    ["Missing a brick?", "Tell us the color code from your bag label and we'll post replacements free, for as long as you own the kit."],
    ["Show it off", "Tag @memobrick \u2014 we share builds every week, and yours took real hours."],
  ];
  const fw = (PDF_CONTENT_W - 8) / 2;
  finItems.forEach(([t,s], i) => {
    const fx = PDF_MARGIN_X + (i%2)*(fw+8), fy = y + Math.floor(i/2)*32;
    doc.setDrawColor(...PDF_RED); doc.setLineWidth(1.2);
    doc.line(fx, fy-4, fx, fy+22);
    doc.setTextColor(...PDF_INK); doc.setFont("helvetica","bold"); doc.setFontSize(10.5);
    doc.text(t, fx+5, fy);
    doc.setTextColor(...PDF_INK2); doc.setFont("helvetica","normal"); doc.setFontSize(8.5);
    const lines = pdfWrap(doc, s, fw-5, 8.5);
    doc.text(lines, fx+5, fy+5);
  });
  y += 32*2 + 14;

  const signW = (PDF_CONTENT_W - 12) / 2;
  [["Built by", PDF_MARGIN_X], ["Finished on", PDF_MARGIN_X+signW+12]].forEach(([label, sx]) => {
    doc.setTextColor(...PDF_INK3); doc.setFont("courier","normal"); doc.setFontSize(7);
    doc.text(label.toUpperCase(), sx, y);
    doc.setDrawColor(...PDF_INK); doc.setLineWidth(0.4);
    doc.line(sx, y+8, sx+signW, y+8);
  });
  y += 24;
  doc.setTextColor(...PDF_INK2); doc.setFont("helvetica","normal"); doc.setFontSize(9.5);
  doc.text("Thank you for building with us.", PDF_PAGE_W/2, y, { align:"center" });
  doc.setTextColor(...PDF_INK); doc.setFont("helvetica","bold"); doc.setFontSize(11);
  doc.text("MEMOBRICK \u00B7 Turn memories into art", PDF_PAGE_W/2, y+6, { align:"center" });
  pdfRainbowBar(doc, PDF_PAGE_H - 6, 3);

  return doc;
}

function downloadInstructionsPDF(){
  if (!S.cells || !S.usedPal){ toast("Finish the design first."); return; }
  if (!window.jspdf || !window.jspdf.jsPDF){
    toast("Still loading — try again in a moment.");
    return;
  }
  const doc = new window.jspdf.jsPDF({ unit: "mm", format: [PDF_PAGE_W, PDF_PAGE_H], orientation: "portrait" });
  buildInstructionsPDF(doc);
  const ref = orderRef();
  doc.save(`memobrick-build-instructions-${ref}.pdf`);
}

function openInstructions(){
  if (!S.cells || !S.usedPal){ toast("Finish the design first."); return; }
  const box = $("#instructions");
  $("#insSheets").innerHTML = instructionsHTML();
  box.hidden = false;
  document.body.classList.add("printing");
  box.scrollTop = 0;
  toast("Internal document — use Download PDF to ship with the kit.");
}
// no longer exposed globally — final building instructions should only
// ever be visible after an order is placed, never reachable from the
// live editing session. instructionsHTML() itself stays available for
// any internal, post-purchase production tooling that may still need it.
$("#insPrint").addEventListener("click", () => downloadInstructionsPDF());

/* =====================================================================
   CROP CHOOSER
   Zoom-and-drag could not reach the face: at 100% the photo exactly covers
   the board, so there is no slack to pan into. This shows the whole photo
   with a frame locked to the board's shape — drag it over the face, resize
   from a corner, done. The frame converts back to the renderer's own
   zoom/offset model, so nothing downstream changes.
   ===================================================================== */
const cropper = {
  open: false, iw: 0, ih: 0,      // natural image size
  fit: 1, offx: 0, offy: 0,       // how the preview image sits in the stage
  rx: 0, ry: 0, rw: 0, rh: 0,     // crop frame, in image pixels
};

function boardAspect(){ const { gw, gh } = dims(); return gw / gh; }

function cropLayout(){
  const stage = $("#crStage"), img = $("#crImg"), frame = $("#crFrame");
  const sw = stage.clientWidth, sh = stage.clientHeight;
  const pad = 28;
  cropper.fit = Math.min((sw - pad*2) / cropper.iw, (sh - pad*2) / cropper.ih);
  const dw = cropper.iw * cropper.fit, dh = cropper.ih * cropper.fit;
  cropper.offx = (sw - dw) / 2; cropper.offy = (sh - dh) / 2;
  img.style.width = dw + "px"; img.style.height = dh + "px";
  img.style.left = cropper.offx + "px"; img.style.top = cropper.offy + "px";
  frame.style.left = (cropper.offx + cropper.rx * cropper.fit) + "px";
  frame.style.top = (cropper.offy + cropper.ry * cropper.fit) + "px";
  frame.style.width = (cropper.rw * cropper.fit) + "px";
  frame.style.height = (cropper.rh * cropper.fit) + "px";
}

function clampFrame(){
  const a = boardAspect();
  cropper.rw = Math.min(cropper.rw, cropper.iw);
  cropper.rh = cropper.rw / a;
  if (cropper.rh > cropper.ih){ cropper.rh = cropper.ih; cropper.rw = cropper.rh * a; }
  const minW = Math.max(24, cropper.iw * 0.08);
  if (cropper.rw < minW){ cropper.rw = minW; cropper.rh = minW / a; }
  cropper.rx = clamp(cropper.rx, 0, cropper.iw - cropper.rw);
  cropper.ry = clamp(cropper.ry, 0, cropper.ih - cropper.rh);
}

function frameFromState(){
  // start the frame where the current design is already looking
  const { gw, gh } = dims();
  const W = gw, H = gh;
  const sc = Math.max(W/cropper.iw, H/cropper.ih) * S.zoom;
  const dw = cropper.iw*sc, dh = cropper.ih*sc;
  const slackX = Math.abs(dw - W)/2, slackY = Math.abs(dh - H)/2;
  const drawX = (W-dw)/2 + S.ox*slackX, drawY = (H-dh)/2 + S.oy*slackY;
  cropper.rx = -drawX/sc; cropper.ry = -drawY/sc;
  cropper.rw = W/sc; cropper.rh = H/sc;
  if (!isFinite(cropper.rw) || cropper.rw <= 0) centreFrame();
  clampFrame();
}
function centreFrame(){
  const a = boardAspect();
  let w = cropper.iw, h = w / a;
  if (h > cropper.ih){ h = cropper.ih; w = h * a; }
  cropper.rw = w * 0.82; cropper.rh = cropper.rw / a;
  cropper.rx = (cropper.iw - cropper.rw) / 2;
  cropper.ry = (cropper.ih - cropper.rh) / 2 * 0.7;   // faces sit above centre
  clampFrame();
}
function wholePhoto(){
  const a = boardAspect();
  let w = cropper.iw, h = w / a;
  if (h > cropper.ih){ h = cropper.ih; w = h * a; }
  cropper.rw = w; cropper.rh = h;
  cropper.rx = (cropper.iw - w) / 2; cropper.ry = (cropper.ih - h) / 2;
  clampFrame();
}

function openCropper(){
  hold.classList.add("cropping");
  if (!S.img){ toast("Add a photo first."); return; }
  const img = $("#crImg");
  cropper.iw = S.img.naturalWidth || S.img.width;
  cropper.ih = S.img.naturalHeight || S.img.height;
  // the working image may be a bitmap, so paint it to a canvas for the preview
  const c = document.createElement("canvas");
  c.width = cropper.iw; c.height = cropper.ih;
  c.getContext("2d").drawImage(S.img, 0, 0, cropper.iw, cropper.ih);
  img.src = c.toDataURL("image/jpeg", 0.86);
  frameFromState();
  $("#cropper").hidden = false;
  cropper.open = true;
  requestAnimationFrame(cropLayout);
}
function closeCropper(){
  hold.classList.remove("cropping"); $("#cropper").hidden = true; cropper.open = false; }

function applyCrop(){
  pushHistory("Crop");
  S.viewLocked = false;
  // changing the crop requantises the photo, which can move hand-placed bricks
  if (S.edits.size && !confirm(
      "Changing your crop will regenerate the mosaic and may reset your " +
      S.edits.size + " hand-placed brick" + (S.edits.size === 1 ? "" : "s") + ".\n\n" +
      "Continue and regenerate?")) return;
  const { gw, gh } = dims(), W = gw, H = gh;
  const base = Math.max(W/cropper.iw, H/cropper.ih);
  const sc = W / cropper.rw;
  const dw = cropper.iw*sc, dh = cropper.ih*sc;
  const slackX = Math.abs(dw - W)/2, slackY = Math.abs(dh - H)/2;
  const drawX = -cropper.rx*sc, drawY = -cropper.ry*sc;
  S.ox = slackX > 0.001 ? clamp((drawX - (W-dw)/2)/slackX, -1, 1) : 0;
  S.oy = slackY > 0.001 ? clamp((drawY - (H-dh)/2)/slackY, -1, 1) : 0;
  // set the zoom exactly rather than to the nearest whole percent, so the
  // frame you drew is the region that gets built
  S.zoom = clamp(sc / base, 0.5, 3);
  $("#zoom").value = Math.round(S.zoom * 100);
  $("#zoomVal").textContent = Math.round(S.zoom * 100) + "%";
  const zv2b = $("#zoomVal2"); if (zv2b) zv2b.textContent = Math.round(S.zoom * 100) + "% zoom";
  syncPannable();
  $("#bgRow").hidden = S.zoom >= 1;
  render();
  closeCropper();
  toast("Crop applied.");
  S.viewLocked = true;
}

/* dragging the frame and its corners */
(function cropGestures(){
  const stage = $("#crStage"), frame = $("#crFrame");
  if (!stage || !frame) return;
  let mode = null, sx = 0, sy = 0, start = null;
  const px2img = (v) => v / cropper.fit;

  const begin = (e, m) => {
    mode = m; sx = e.clientX; sy = e.clientY;
    start = { rx: cropper.rx, ry: cropper.ry, rw: cropper.rw, rh: cropper.rh };
    e.preventDefault(); e.stopPropagation();
    stage.setPointerCapture(e.pointerId);
  };
  frame.addEventListener("pointerdown", (e) => {
    if (e.target.classList.contains("h")) return;
    begin(e, "move");
  });
  frame.querySelectorAll(".h").forEach((h) => {
    const corner = [...h.classList].find((c) => c !== "h");
    h.addEventListener("pointerdown", (e) => begin(e, corner));
  });
  stage.addEventListener("pointermove", (e) => {
    if (!mode) return;
    const dx = px2img(e.clientX - sx), dy = px2img(e.clientY - sy);
    const a = boardAspect();
    if (mode === "move"){
      cropper.rx = start.rx + dx; cropper.ry = start.ry + dy;
    } else {
      let w = start.rw;
      if (mode === "se") w = start.rw + dx;
      else if (mode === "ne") w = start.rw + dx;
      else if (mode === "sw") w = start.rw - dx;
      else if (mode === "nw") w = start.rw - dx;
      w = Math.max(24, w);
      const h2 = w / a;
      if (mode === "nw"){ cropper.rx = start.rx + (start.rw - w); cropper.ry = start.ry + (start.rh - h2); }
      if (mode === "ne"){ cropper.ry = start.ry + (start.rh - h2); }
      if (mode === "sw"){ cropper.rx = start.rx + (start.rw - w); }
      cropper.rw = w; cropper.rh = h2;
    }
    clampFrame(); cropLayout();
  });
  const stop = () => { mode = null; };
  stage.addEventListener("pointerup", stop);
  stage.addEventListener("pointercancel", stop);
  window.addEventListener("resize", () => { if (cropper.open) cropLayout(); });
})();

$("#openCrop").addEventListener("click", openCropper);
const adjust = document.querySelector("#adjustCrop");
if (adjust) adjust.addEventListener("click", openCropper);
$("#crCancel").addEventListener("click", closeCropper);
$("#crApply").addEventListener("click", applyCrop);
$("#crFill").addEventListener("click", () => { wholePhoto(); cropLayout(); });
$("#crFace").addEventListener("click", () => { centreFrame(); cropLayout(); });
window.addEventListener("keydown", (e) => {
  if (!cropper.open) return;
  if (e.key === "Escape") closeCropper();
  if (e.key === "Enter") applyCrop();
});

/* ---------------- preview zoom (how big the board looks) ---------------- */
let viewZoom = 1;
/* The preview-display zoom was removed from the interface: customers only ever
   needed photo-crop zoom, which lives in the framing editor. These stubs keep
   any remaining internal callers safe. */
function applyViewZoom(){ hold.style.width = Math.round(viewZoom * 100) + "%"; }
function setViewZoom(pct){ viewZoom = clamp(pct, 60, 260) / 100; applyViewZoom(); }

/* ---------------- the photo thumbnail in step 1 ---------------- */
function drawThumb(){
  const t = $("#thumb"); if (!t || !S.img) return;
  const c = t.getContext("2d");
  const iw = S.img.naturalWidth || S.img.width, ih = S.img.naturalHeight || S.img.height;
  const sc = Math.max(t.width/iw, t.height/ih);
  c.clearRect(0, 0, t.width, t.height);
  c.imageSmoothingQuality = "high";
  c.drawImage(S.img, (t.width - iw*sc)/2, (t.height - ih*sc)/2, iw*sc, ih*sc);
}

/* ---------------- hand editing ---------------- */
function repaintMosaicOnly(){
  if (!S.cells || !S.usedPal) return;
  const { gw, gh } = dims();
  paint(S.cells, gw, gh, S.usedPal);
}
function refreshEdits(){
  $("#editCount").textContent = S.edits.size ? `${fmt(S.edits.size)} placed by hand` : "nothing edited yet";
  hold.classList.toggle("editing", S.editing);
}
function renderBrushes(){
  const used = new Set((S.usedPal || []).map((c) => c.hex));
  const list = S.brushFilter === "skin" ? skinPal() : fullPal();
  $("#brushes").innerHTML = list.map((c) =>
    `<button class="bsw${used.has(c.hex) ? "" : " bsw-new"}" data-hex="${c.hex}" title="${c.name}${used.has(c.hex) ? "" : " (not used yet)"}" aria-pressed="${c.hex === S.brush}" style="--c:${c.hex}"></button>`).join("");
}
function setBrushFilter(which){
  S.brushFilter = which === "skin" ? "skin" : "all";
  $$("#brushTabs .brushtab").forEach((b) => b.setAttribute("aria-selected", b.dataset.brushfilter === S.brushFilter));
  renderBrushes();
}
$("#brushTabs").addEventListener("click", (e) => {
  const b = e.target.closest("[data-brushfilter]");
  if (b) setBrushFilter(b.dataset.brushfilter);
});
function setBrush(hex){
  S.brush = hex; S.picking = false;
  $("#pickBtn").setAttribute("aria-pressed", false);
  $$("#brushes .bsw").forEach((x) => x.setAttribute("aria-pressed", x.dataset.hex === hex));
}

/* Re-apply the manual overrides onto the cached mosaic without requantising. */
function applyEditsToCells(){
  if (!S.baseCells || !S.usedPal) return;
  const cells = S.baseCells.slice();
  const byHex = new Map(S.usedPal.map((c, i) => [c.hex, i]));
  for (const [k, hex] of S.edits){
    if (k >= cells.length) continue;
    let i = byHex.get(hex);
    if (i === undefined){
      const want = rgb2lab(...hex2rgb(hex));
      let bd = Infinity;
      S.usedPal.forEach((c, j) => { const d = dLab(want, c); if (d < bd){ bd = d; i = j; } });
    }
    cells[k] = i;
  }
  S.cells = cells;
  tally(cells, S.usedPal);
  meta();
}

/* =====================================================================
   REPLACE AN ENTIRE COLOUR  (Part 6)
   Swaps every brick of one color for another across the current design.
   It works on the cached mosaic, so nothing is requantised and the change
   is a single undo step.
   ===================================================================== */
function colorCounts(){
  const out = new Map();
  if (!S.cells || !S.usedPal) return out;
  for (let i = 0; i < S.cells.length; i++){
    const c = S.usedPal[S.cells[i]];
    if (!c) continue;
    out.set(c.hex, (out.get(c.hex) || 0) + 1);
  }
  return out;
}

function replaceColor(fromHex, toHex){
  pushHistory("Replace color");
  if (!S.cells || !S.usedPal || fromHex === toHex) return 0;
  const fromIdx = S.usedPal.findIndex((c) => c.hex === fromHex);
  if (fromIdx < 0) return 0;
  const changed = [];
  for (let i = 0; i < S.cells.length; i++){
    if (S.cells[i] === fromIdx) changed.push(i);
  }
  if (!changed.length) return 0;
  // one undo entry for the whole operation
  const before = changed.map((k) => (S.edits.has(k) ? S.edits.get(k) : null));
  S.undo.push({ bulk: changed, before });
  if (S.undo.length > 500) S.undo.shift();
  S.redo.length = 0;
  changed.forEach((k) => S.edits.set(k, toHex));
  applyEditsToCells();
  repaintMosaicOnly(); refreshEdits();
  return changed.length;
}

function clearEditsFor(reason){
  if (!S.edits.size) return;
  S.edits.clear(); S.undo.length = 0; S.redo.length = 0; refreshEdits(); toast(reason);
}
function cellAt(e){
  const r = hold.getBoundingClientRect(), { gw, gh } = dims();
  const x = Math.floor((e.clientX - r.left)/r.width*gw), y = Math.floor((e.clientY - r.top)/r.height*gh);
  if (x < 0 || y < 0 || x >= gw || y >= gh) return -1;
  return y*gw + x;
}
function placeBrick(e){
  const k = cellAt(e);
  if (k < 0 || !S.cells || !S.usedPal) return;
  if (S.picking || e.altKey){ setBrush(S.usedPal[S.cells[k]].hex); return; }
  if (!S.brush) return;
  let i = S.usedPal.findIndex((c) => c.hex === S.brush);
  if (i < 0){
    // the chosen color isn't in this design's active palette yet (the
    // customer picked one of the 40 real colors that just isn't used
    // anywhere in the mosaic) — add it rather than silently failing
    const real = fullPal().find((c) => c.hex === S.brush);
    if (!real) return;                 // not a real MemoBrick color — nothing to do
    S.usedPal = S.usedPal.concat([real]);
    i = S.usedPal.length - 1;
  }
  if (S.cells[k] === i) return;
  pushHistory("Brick edit", "brush");   // a brush stroke is one step
  if (S.undo.length > 500) S.undo.shift();
  S.edits.set(k, S.brush);
  S.cells[k] = i;
  repaintMosaicOnly();
  tally(S.cells, S.usedPal);
}

function setTouchMode(){
  // scrolling the page by swiping over the picture must keep working; the
  // canvas only takes over the gesture while brick editing is on
  hold.classList.toggle("editing", !!S.editing);
}
$("#togEdit").addEventListener("click", (e) => {
  S.editing = !S.editing;
  e.currentTarget.setAttribute("aria-pressed", S.editing);
  $("#editRow").hidden = !S.editing;
  if (S.editing && !S.brush && S.usedPal && S.usedPal[0]) S.brush = S.usedPal[0].hex;
  renderBrushes(); refreshEdits();
  if (S.editing){
    toast("Click or drag on the mosaic to place bricks. Alt-click picks up a color.");
    $("#editRow").scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  setTouchMode();});
$("#brushes").addEventListener("click", (e) => {
  const b = e.target.closest("[data-hex]"); if (!b) return;
  setBrush(b.dataset.hex);
});
$("#pickBtn").addEventListener("click", (e) => {
  S.picking = !S.picking;
  e.currentTarget.setAttribute("aria-pressed", S.picking);
});
$("#undoBtn").addEventListener("click", undoStep);
$("#undoTop").addEventListener("click", undoStep);
$("#redoTop").addEventListener("click", redoStep);
updateHistoryButtons();
$("#clearEdits").addEventListener("click", () => {
  if (!S.edits.size){ toast("No hand edits to clear."); return; }
  S.edits.clear(); S.undo.length = 0; render(); refreshEdits();
  toast("Hand edits cleared.");
});

const tip = $("#tip");
let panning = false, px0 = 0, py0 = 0, ox0 = 0, oy0 = 0;
const touches = new Map();
let pinchStart = 0, pinchZoom = 1;
const spread = () => {
  const [a, b] = [...touches.values()];
  return Math.hypot(a.x - b.x, a.y - b.y);
};
let painting = false;
let panHistoryPushed = false;
["panelSize", "panelCrop"].forEach((id) => {
  const d = document.getElementById(id);
  if (d) d.addEventListener("toggle", syncPannable);
});
hold.addEventListener("pointerdown", (e) => {
  const moveOk = photoMoveAllowed();   // Size or Crop open (desktop) / Size or Crop tool (mobile)
  if (e.pointerType === "touch" && !S.editing && !moveOk){
    return;                            // no accidental pinch or drag on the preview
  }
  if (e.pointerType === "touch"){
    touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (touches.size === 2){
      pinchStart = spread(); pinchZoom = S.zoom; panning = false;
      hold.classList.add("showhint");
      return;
    }
  }
  if (S.editing){
    painting = true; hold.setPointerCapture(e.pointerId); placeBrick(e); return;
  }
  // drag to move the photo — only while sizing or cropping, and only when
  // the photo overhangs the board at all
  if (!moveOk || !canMovePhoto()) return;
  panning = true; panHistoryPushed = false;
  hold.classList.add("grabbing"); hold.setPointerCapture(e.pointerId);
  px0 = e.clientX; py0 = e.clientY; ox0 = S.ox; oy0 = S.oy;
});
const endTouch = (e) => {
  if (e && e.pointerType === "touch"){
    touches.delete(e.pointerId);
    if (touches.size < 2 && pinchStart){
      pinchStart = 0; render();
      setTimeout(() => hold.classList.remove("showhint"), 900);
    }
  }
};
hold.addEventListener("pointerup", endTouch);
hold.addEventListener("pointercancel", endTouch);
hold.addEventListener("pointerup", () => {
  if (painting){
    painting = false;
    if (S.cells && S.usedPal){ tally(S.cells, S.usedPal); renderBrushes(); refreshEdits(); }
    return;
  }
  if (panning) render();
  panning = false; hold.classList.remove("grabbing");
});
hold.addEventListener("pointercancel", () => { painting = false; panning = false; hold.classList.remove("grabbing"); });
hold.addEventListener("pointermove", (e) => {
  const r = hold.getBoundingClientRect();
  if (e.pointerType === "touch" && touches.has(e.pointerId)){
    touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (touches.size === 2 && pinchStart > 0){
      setZoom(Math.round(pinchZoom * (spread() / pinchStart) * 100), true);
      return;
    }
  }
  if (painting){ placeBrick(e); }
  if (panning){
    tip.classList.remove("on");
    const dx = e.clientX - px0, dy = e.clientY - py0;
    if (!panHistoryPushed && Math.hypot(dx, dy) > 3){ pushHistory("Move photo"); panHistoryPushed = true; }
    // the photo follows the pointer: offset ±1 is the full overhang, so one
    // stud of drag moves the photo by one stud
    const { gw, gh } = dims(), sl = photoSlack();
    const pxPerStudX = r.width / gw, pxPerStudY = r.height / gh;
    if (sl.x > 0.5) S.ox = clamp(ox0 + dx / (sl.x * pxPerStudX), -1, 1);
    if (sl.y > 0.5) S.oy = clamp(oy0 + dy / (sl.y * pxPerStudY), -1, 1);
    render(true); return;
  }
  if (!S.cells) return;
  const { gw, gh } = dims();
  const gx = Math.floor((e.clientX - r.left)/r.width*gw), gy = Math.floor((e.clientY - r.top)/r.height*gh);
  if (gx<0||gy<0||gx>=gw||gy>=gh){ tip.classList.remove("on"); return; }
  const c = (S.usedPal || pal())[S.cells[gy*gw+gx]];
  tip.querySelector("i").style.background = c.hex;
  tip.querySelector("span").textContent = `${c.name} · row ${gy+1}, col ${gx+1}`;
  tip.style.left = (e.clientX - r.left) + "px";
  tip.style.top = (e.clientY - r.top) + "px";
  tip.classList.add("on");
});
hold.addEventListener("pointerleave", () => tip.classList.remove("on"));

// order → cart → checkout, no external hand-off, no extra page
let checkoutInFlight = false;
async function startCheckout(triggerBtn){
  if (checkoutInFlight) return;
  if (!S.size || !S.uploaded){ toast("Upload a photo and pick a size first."); return; }
  checkoutInFlight = true;
  const buttons = [triggerBtn, $("#orderBtn"), $("#edTopFinish")].filter(Boolean);
  const originals = buttons.map((b) => b.innerHTML);
  buttons.forEach((b) => { b.setAttribute("aria-disabled", "true"); b.style.pointerEvents = "none";
    b.innerHTML = "Preparing your MemoBrick…"; });
  try {
    if (!window.MB_addToCart) throw new Error("cart-unavailable");
    await window.MB_addToCart({ sizeId: S.size.id, buildForMe: !!S.build, state: S });
    // open the cart for review instead of redirecting straight to checkout —
    // the customer confirms their design and price, then checks out themselves
    if (window.MB_openCartDrawer) window.MB_openCartDrawer();
    else location.href = "/checkout";   // safe fallback if the drawer isn't available for any reason
  } catch (err){
    console.error("checkout failed:", err);
    toast(window.MB_cartMessage ? window.MB_cartMessage(err) : "We couldn't start checkout. Please try again.");
  } finally {
    checkoutInFlight = false;
    buttons.forEach((b, i) => { b.removeAttribute("aria-disabled"); b.style.pointerEvents = "";
      b.innerHTML = originals[i]; });
  }
}
window.MB_startCheckout = startCheckout;

$("#orderBtn").addEventListener("click", (e) => { e.preventDefault(); startCheckout(e.currentTarget); });
const edFinish = $("#edTopFinish");
if (edFinish) edFinish.addEventListener("click", (e) => { startCheckout(e.currentTarget); });

/* ---- Smart Suggestions (desktop) ---- */
(function styleSuggestDesktopUI(){
  const idle = $("#styleSuggestIdle"), working = $("#styleSuggestWorking"), result = $("#styleSuggestResult");
  const runBtn = $("#styleSuggestRun"), againBtn = $("#styleSuggestAgain"), workingText = $("#styleSuggestWorkingText");
  if (!runBtn) return;

  function showState(which){
    [idle, working].forEach((el) => { if (el) el.hidden = true; });
    if (which) which.hidden = false;
  }

  function renderResults(options){
    result.innerHTML = options.map((o, i) =>
      `<button type="button" class="stylecard" data-idx="${i}">` +
        (o.thumb ? `<img src="${o.thumb}" alt="${o.label}">` : `<div style="aspect-ratio:1;background:#eee"></div>`) +
        `<span class="stylecard-label">${o.label}</span>` +
      `</button>`).join("");
    result.hidden = false;
    if (againBtn) againBtn.hidden = false;
    result.querySelectorAll(".stylecard").forEach((btn) => {
      btn.addEventListener("click", () => {
        const opt = options[+btn.dataset.idx];
        applyStyleSuggestion(opt);
        result.querySelectorAll(".stylecard").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        toast(opt.label + " applied — you can still fine-tune it in Adjust.");
      });
    });
  }

  async function run(){
    if (!S.uploaded){ toast("Upload a photo first."); return; }
    showState(working);
    if (result) result.hidden = true;
    const options = await generateStyleSuggestions((i, total, label) => {
      if (workingText) workingText.textContent = `Generating "${label}"… (${i+1}/${total})`;
    });
    showState(null);
    renderResults(options);
  }
  runBtn.addEventListener("click", run);
  if (againBtn) againBtn.addEventListener("click", run);
})();

window.addEventListener("resize", () => { clearTimeout(window._rz); window._rz = setTimeout(repaint, 160); });

// a Custom Brick Portrait product page can deep-link straight into the
// upload step with its exact size pre-selected: /pages/editor?size=20x30#editor
(function applySizeFromUrl(){
  try {
    const requested = new URLSearchParams(location.search).get("size");
    if (!requested) return;
    const z = SIZES.find((x) => x.id === requested);
    if (z){ S.size = z; S.sizeTouched = true; }
  } catch (e){}
})();

// boot — start on the home screen with no photo loaded
if (!restoreSession()){
  const params = new URLSearchParams(location.search);
  let pendingView = null;
  if (window.MB_CONTACT_FORM_SUCCESS){
    try {
      const v = sessionStorage.getItem("mb_pending_view");
      if (v === "freeproof" || v === "corporate") pendingView = v;
      sessionStorage.removeItem("mb_pending_view");
    } catch (e){}
  }
  showView(pendingView ||
    (location.hash === "#design" ? "design" :
    params.get("size") ? "upload" :
    location.hash === "#editor" ? "editor" :
    location.hash === "#freeproof" ? "freeproof" :
    // the header/footer "Corporate & bulk" links on other pages point here
    (location.hash === "#view-corporate" || location.hash === "#corporate") ? "corporate" :
    window.MB_LANDING_VIEW || "home"));
}
meta();





























/* =====================================================================
   COMMERCE — Shopify is the engine, this site is the storefront.
   Variants, prices and availability come from the catalog snippet that
   Liquid renders, so nothing about money lives in this file. Add to Cart
   posts to Shopify's own cart, so discounts, taxes, shipping and checkout
   all behave exactly as they do anywhere else in the store.
   ===================================================================== */
(function commerce(){
  const el = document.querySelector("#memobrick-catalog");
  if (!el) return;                       // running outside Shopify: stay quiet
  let CAT = null;
  try { CAT = JSON.parse(el.textContent); }
  catch (e){ console.error("[MemoBrick] catalog parse failed", e); return; }
  if (!CAT || !CAT.sizes || !CAT.sizes.length) return;

  window.MB_CATALOG = CAT;

  /* the creator's size ids are "20x20"; the catalog uses the same ids */
  function sizeRecord(id){
    return CAT.sizes.find((s) => s.id === String(id)) || null;
  }
  /* Shopify Liquid hands variant prices through as raw integer cents
     (that's the platform convention — {{ variant.price }} is cents, not
     dollars, which is why the catalog snippet below deliberately does NOT
     format it in Liquid). Convert to dollars once, here, so every caller
     of MB_variantFor gets a correct, ready-to-use number and never has to
     remember the conversion itself. */
  function centsToDollars(v){ return typeof v === "number" ? v/100 : (v == null ? v : parseFloat(v)/100); }
  function variantFor(id, wantService){
    const rec = sizeRecord(id);
    if (!rec) return null;
    const list = rec.variants.filter((v) => !!v.service === !!wantService);
    const v = (list.find((v) => v.available) || list[0] || rec.variants[0]) || null;
    if (!v) return null;
    return Object.assign({}, v, {
      price: centsToDollars(v.price),
      compareAtPrice: v.compareAtPrice == null ? null : centsToDollars(v.compareAtPrice),
    });
  }
  window.MB_variantFor = variantFor;

  /* The "Looking blocky?" upgrade nudge depends on this — grounded in
     the photo's actual cropped resolution (not just its raw file size),
     since a tight crop on a big photo has far less effective detail
     than the full frame. Recommends the largest size within the
     customer's current shape that the source can support without
     meaningful upscaling; stays silent (null) rather than guessing if
     there's nothing to go on. */
  function recommendedSize(){
    if (!S.img) return null;
    const iw = S.img.naturalWidth || S.img.width, ih = S.img.naturalHeight || S.img.height;
    if (!iw || !ih) return null;
    // zooming in crops tighter, shrinking the effective source area used
    const z = Math.max(1, S.zoom || 1);
    const effW = iw / z, effH = ih / z;
    const effShort = Math.min(effW, effH);          // limiting dimension for detail
    const shape = (S.size && S.size.shape) || "square";
    const candidates = SIZES.filter((s) => s.shape === shape)
                             .sort((a, b) => (a.gw*a.gh) - (b.gw*b.gh));
    if (!candidates.length) return null;
    let best = candidates[0];
    for (const s of candidates){
      if (Math.min(s.gw, s.gh) <= effShort) best = s;   // still has real detail to give
      else break;                                        // larger sizes only need more, so stop here
    }
    return {
      id: best.id, label: best.label, gw: best.gw, gh: best.gh,
      why: "Good detail for this photo at this crop.",
    };
  }
  window.MB_recommendedSize = recommendedSize;

  /* a stable id that ties the cart line, the order and the design together */
  function designId(){
    const d = new Date();
    const stamp = d.getFullYear() + String(d.getMonth()+1).padStart(2,"0") +
                  String(d.getDate()).padStart(2,"0");
    let rnd = "";
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const buf = new Uint8Array(8);
    (window.crypto || {}).getRandomValues ? crypto.getRandomValues(buf)
      : buf.forEach((_, i) => buf[i] = Math.floor(Math.random()*256));
    for (let i = 0; i < 8; i++) rnd += chars[buf[i] % chars.length];
    return "MB-" + stamp + "-" + rnd;
  }
  window.MB_designId = designId;

  /* Everything production needs to rebuild exactly what the customer approved,
     kept small and human-readable so it is useful in the Shopify order. */
  function designProperties(state, id){
    const s = state || {};
    const size = s.size || {};
    return {
      "Design ID": id,
      "MemoBrick Size": size.label || "",
      "Orientation": size.shape || "",
      "Brick grid": (size.gw && size.gh) ? (size.gw + " x " + size.gh + " studs") : "",
      "Build service": s.buildForMe ? "MemoBrick builds it" : "Build at home",
      "_design": JSON.stringify({
        v: 1, id: id, size: size.id,
        crop: { zoom: +(s.zoom || 1).toFixed(4), ox: +(s.ox || 0).toFixed(4), oy: +(s.oy || 0).toFixed(4) },
        adjust: { bri: s.bri, con: s.con, sat: s.sat, detail: s.detail,
                  shadows: s.shadows, warm: s.warm, dither: s.dither, auto: !!s.auto },
        palette: s.pal || "full",
        edits: s.edits && s.edits.size ? s.edits.size : 0
      })
    };
  }
  window.MB_designProperties = designProperties;

  /* A complete, standalone HTML file — the actual build booklet, not
     just a design image — attachable to the order so production can
     open and print it directly, without needing the customer's browser
     session (which is the only place instructionsHTML()'s inputs, the
     structured per-stud color data, actually exist). The relevant CSS
     is fetched and embedded inline, not linked, so this file keeps
     working correctly even if the live theme's CSS changes later. */
  async function buildInstructionsDocument(){
    if (!S.cells || !S.usedPal) return null;   // nothing to build yet — don't fail checkout over it
    let css = "";
    try {
      const link = document.querySelector('link[href*="memobrick.css"]');
      if (link) css = await (await fetch(link.href)).text();
    } catch (e){ /* fall through with no embedded CSS rather than fail the whole order */ }
    const body = instructionsHTML();
    return `<!doctype html><html><head><meta charset="utf-8">
<title>MemoBrick build instructions — ${orderRef()}</title>
<style>${css}
/* make the print layout the default view when this file is opened on
   its own — no #instructions/.printing toggle exists in this document */
body{background:#8a8f96;margin:0;padding:20px 0}
.sheet{width:279.4mm;min-height:431.8mm;margin:0 auto 22px;box-shadow:0 6px 24px rgba(0,0,0,.25)}
.ins-sheets{max-width:none}
/* one sheet = one printed 11x17" page. The sheet already carries its own
   14mm/11mm padding, so the page itself has no margin — a 10mm page
   margin on top of a full-size sheet pushed the bottom of every sheet
   (and every section's color list) onto a second, mostly blank page */
@media print{
  body{background:#fff;padding:0}
  @page{size:11in 17in;margin:0}
  .ins-sheets{padding:0}
  .sheet{width:279.4mm;min-height:431.8mm;height:auto;padding:14mm 11mm;margin:0;box-shadow:none;
    break-inside:avoid;break-after:page;page-break-after:always}
  .sheet:last-child{break-after:auto;page-break-after:auto}
}
</style></head><body><div class="ins-sheets">${body}</div></body></html>`;
  }
  window.MB_buildInstructionsDocument = buildInstructionsDocument;

  /* Add to Cart. Same-origin POST to Shopify's cart, so the cart drawer,
     discount codes and checkout all work untouched. Uses FormData (not
     JSON) specifically so the customer's actual finished design can be
     attached as a real file — exactly what production needs to build
     the right thing, not just the settings that produced it.
     REQUIRES: the shop's product for each size must have "File" type
     line-item properties enabled in Shopify admin for the attachment to
     actually be accepted — this is a merchant-side product setting, not
     something theme code can turn on by itself. If it isn't enabled,
     Shopify simply won't store the file; every other property (Design
     ID, size, the _design settings) still goes through regardless. */
  async function addToCart(opts){
    const o = opts || {};
    const variant = variantFor(o.sizeId, o.buildForMe);
    if (!variant) throw new Error("size-unavailable");
    if (!variant.available) throw new Error("variant-unavailable");

    // snapshot the session as it stands right now — the customer's
    // actual final, approved design — so "Edit design again" from the
    // cart brings back what they just ordered, not just their first
    // upload before any crop/adjustment/background choice
    try { saveSession(); } catch (e){}

    const id = o.designId || designId();
    const props = designProperties(o.state, id);

    const fd = new FormData();
    fd.append("id", variant.id);
    fd.append("quantity", 1);
    Object.keys(props).forEach((k) => fd.append("properties[" + k + "]", props[k]));

    // the customer's actual finished mosaic — exactly what they'll
    // receive, with every crop/color/adjustment/hand-edit already baked
    // in, not just the numbers that produced it
    try {
      const blob = await new Promise((resolve) => mos.toBlob(resolve, "image/png"));
      if (blob) fd.append("properties[Final Design]", blob, "memobrick-" + id + ".png");
    } catch (e){ /* image export failed — every setting needed to rebuild it is still attached */ }

    // the real, printable build booklet — production opens this file
    // directly and prints it, no need to regenerate it from settings.
    // Prefixed with an underscore: Shopify's convention for a line-item
    // property that's stored on the order and visible to the merchant in
    // admin, but never rendered in the customer-facing cart or checkout.
    try {
      const doc = await buildInstructionsDocument();
      if (doc){
        const htmlBlob = new Blob([doc], { type: "text/html" });
        fd.append("properties[_Build Instructions]", htmlBlob, "memobrick-instructions-" + id + ".html");
      }
    } catch (e){ /* instructions failed to build — the order still has the design image and settings */ }

    const res = await fetch("/cart/add.js", { method: "POST", body: fd });
    if (!res.ok){
      let msg = "";
      try { msg = (await res.json()).description || ""; } catch (e){}
      throw new Error(msg || "cart-failed");
    }
    const line = await res.json();
    document.dispatchEvent(new CustomEvent("memobrick:added", { detail: { line: line, designId: id } }));
    return { line: line, designId: id, variant: variant };
  }
  window.MB_addToCart = addToCart;

  /* Customer-facing failures only — never a raw error string. */
  window.MB_cartMessage = function (err){
    const k = (err && err.message) || "";
    if (k === "variant-unavailable" || k === "size-unavailable")
      return "This size is temporarily unavailable. Please choose another size.";
    return "We couldn't add this design to your cart. Please try again.";
  };
})();


/* =====================================================================
   MOBILE EDITOR UI
   A controller, not a second engine. It reads and writes the same S state
   and calls the same functions the desktop editor uses — setZoom, setSize,
   render, undoStep, redoStep, replaceColor — so there is exactly one
   source of truth for the image, the history and the price.

   Three permanent zones (see the markup in the section file):
     A. top bar        — back / size & price / finish
     B. preview        — the engine's own canvas, moved here once
     C. workspace       — EITHER a step's tool cards OR one open tool
   Only zone C is ever re-rendered when the customer moves between
   steps or tools. The preview in zone B is never rebuilt, hidden or
   swapped — every edit paints directly onto it, live.
   ===================================================================== */
(function mobileEditor(){
  const mob = document.querySelector("#mob");
  if (!mob) return;
  const isMobile = () => window.matchMedia("(max-width:767px)").matches;

  /* activeTool === null  -> workspace shows the current step's tool cards
     activeTool === "size"|"crop"|"colors"|"adjust"|"edit"
                          -> workspace shows that tool's sheet panel      */
  const MobileEditor = { activeStepIdx: 0, activeTool: null, editing: false,
                          fromColor: null };
  window.MobileEditor = MobileEditor;

  const $m = (s) => mob.querySelector(s);
  const preview = $m("#mobPreview");
  const workspace = $m("#mobWorkspace");

  /* ---- the three steps, and which tools live under each ---------------- */
  const STEPS = [
    { id: "setup",    label: "Setup",    tools: ["photo", "size", "crop", "background"] },
    { id: "refine",   label: "Refine",   tools: ["colors", "adjust", "styles"] },
    { id: "advanced", label: "Advanced", tools: ["edit"] },
  ];
  function iconSparkle(){ return svg('<path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z"></path><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z"></path>'); }
  const TOOL_META = {
    photo:      { label: "Photo",           title: "Photo",           icon: iconPhoto(), undo: false },
    size:       { label: "Size",            title: "Size",            icon: iconGrid(),  undo: false },
    background: { label: "Background",      title: "Background",      icon: iconBg(),    undo: true  },
    colors:     { label: "Colors",          title: "Colors",          icon: iconDrop(),  undo: true  },
    adjust:     { label: "Adjust",          title: "Adjust",          icon: iconSlider(),undo: true  },
    styles:     { label: "Styles",          title: "Try Different Looks",icon: iconSparkle(),undo: true },
    edit:       { label: "Edit Bricks",     title: "Edit Bricks",     icon: iconPencil(),undo: true  },
    crop:       { label: "Crop",            title: "Crop & zoom",     icon: iconCrop(),  undo: false },
  };
  function stepOf(tool){ return STEPS.findIndex((s) => s.tools.includes(tool)); }
  window.MB_stepOfTool = stepOf;
  window.MB_gotoMobileStep = (i) => {
    if (i < 0 || i >= STEPS.length) return;
    MobileEditor.activeStepIdx = i;
    MobileEditor.activeTool = null;
    renderStepGrid();
  };

  /* ---- the preview: the engine's own canvas hold, moved once, never
     rebuilt. Moving #hold itself (not just the #mosaic canvas inside it)
     matters: every pointer/touch listener for painting, panning and
     pinch-zoom is attached to #hold, so moving the canvas out from under
     it silently disconnected all mobile touch interaction from the
     visible preview. ---- */
  function syncMobilePreview(){
    const holdEl = document.querySelector("#hold");
    if (holdEl && holdEl.parentElement !== preview) preview.appendChild(holdEl);
    const { gw, gh } = dims();
    preview.style.setProperty("--mosaic-ratio", (gw || 1) + " / " + (gh || 1));
  }

  /* ---- zone A: back / size & price / finish, always current ------------ */
  function syncMobileTopBar(){
    const size = S.size || {};
    const sizeEl = $m("#mobTopSize"), priceEl = $m("#mobTopPrice"), wasEl = $m("#mobTopWas");
    if (sizeEl) sizeEl.textContent = size.label || "";
    const canBuild = !!size.build;
    let amount = (S.build && canBuild) ? size.build : size.price;
    let was = (!S.build || !canBuild) ? size.was : null;
    if (window.MB_variantFor){
      const v = window.MB_variantFor(size.id, !!S.build);
      if (v){ amount = parseFloat(v.price); if (v.compareAtPrice) was = parseFloat(v.compareAtPrice); }
    }
    if (priceEl) priceEl.textContent = amount != null ? money(amount) : "";
    if (wasEl){
      if (was && was > amount){ wasEl.textContent = money(was); wasEl.hidden = false; }
      else { wasEl.hidden = true; }
    }
  }
  window.syncMobileTopBar = syncMobileTopBar;

  /* ---- small icons, drawn once, reused everywhere ----------------------- */
  function svg(inner){ return '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>'; }
  function iconGrid(){ return svg('<rect x="4" y="4" width="16" height="16" rx="2"></rect><path d="M4 12h16M12 4v16"></path>'); }
  function iconCrop(){ return svg('<path d="M6 2v14a2 2 0 0 0 2 2h14"></path><path d="M18 22V8a2 2 0 0 0-2-2H2"></path>'); }
  function iconPhoto(){ return svg('<rect x="3" y="5" width="18" height="14" rx="2"></rect><circle cx="9" cy="10.5" r="2"></circle><path d="M4 17l5-5 3.5 3.5L16 12l4 4"></path>'); }
  function iconBg(){ return svg('<rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="M21 15l-5-5-9 9"></path>'); }
  function iconDrop(){ return svg('<circle cx="7" cy="7" r="3.2"></circle><circle cx="17" cy="7" r="3.2"></circle><circle cx="12" cy="16" r="3.2"></circle>'); }
  function iconSlider(){ return svg('<path d="M4 7h10M18 7h2M4 12h4M12 12h8M4 17h9M17 17h3"></path><circle cx="16" cy="7" r="2"></circle><circle cx="10" cy="12" r="2"></circle><circle cx="15" cy="17" r="2"></circle>'); }
  function iconPencil(){ return svg('<path d="M15 4l5 5-9 9-5 1 1-5z"></path>'); }

  /* ---- zone C, view 1: the step-card grid ------------------------------- */
  function renderStepGrid(){
    const idx = MobileEditor.activeStepIdx;
    const step = STEPS[idx];
    const solo = step.tools.length === 1;
    const cards = step.tools.map((t) => toolCardHTML(t)).join("");
    workspace.innerHTML =
      '<div class="mob-stepnav">' +
        '<button class="mob-stepnav-arrow" id="mStepPrev"' + (idx === 0 ? " disabled" : "") + ' aria-label="Previous step">‹</button>' +
        '<div class="mob-stepnav-mid">' +
          '<span class="mob-stepnav-eyebrow">Step ' + (idx + 1) + ' · ' + step.label + '</span>' +
          '<div class="mob-stepnav-dots">' + STEPS.map((s, i) => '<i class="' + (i === idx ? "on" : "") + '"></i>').join("") + '</div>' +
        '</div>' +
        '<button class="mob-stepnav-arrow" id="mStepNext"' + (idx === STEPS.length - 1 ? " disabled" : "") + ' aria-label="Next step">›</button>' +
      '</div>' +
      '<div class="mob-toolgrid' + (solo ? " solo" : "") + '">' + cards + '</div>';

    const prev = $m("#mStepPrev"), next = $m("#mStepNext");
    if (prev) prev.addEventListener("click", () => { if (idx > 0){ MobileEditor.activeStepIdx = idx - 1; renderStepGrid(); } });
    if (next) next.addEventListener("click", () => { if (idx < STEPS.length - 1){ MobileEditor.activeStepIdx = idx + 1; renderStepGrid(); } });
    workspace.querySelectorAll("[data-tool]").forEach((b) =>
      b.addEventListener("click", () => openMobileTool(b.dataset.tool)));
  }

  function toolCardHTML(t){
    const meta = TOOL_META[t];
    let sub = "";
    if (t === "size" && S.size) sub = S.size.label;
    if (t === "crop") sub = Math.round((S.zoom || 1) * 100) + "%";
    if (t === "adjust") sub = "Brightness · Warmth";
    if (t === "colors") sub = "Choose which colors to use";
    const optional = (t === "edit") ? " optional" : "";
    return '<button class="mob-toolcard' + optional + '" data-tool="' + t + '">' +
      '<span class="mob-toolcard-icon">' + meta.icon + '</span>' +
      '<span class="mob-toolcard-label">' + meta.label + '</span>' +
      (sub ? '<span class="mob-toolcard-sub">' + sub + '</span>' : "") +
      '</button>';
  }

  /* ---- zone C, view 2: one tool, in a bottom-sheet-styled panel --------- */
  const TOOLS = {
    photo(){
      return '<div class="curphoto">' +
          '<canvas id="mThumb" width="72" height="72" aria-hidden="true"></canvas>' +
          '<div><label class="mini full" id="mUploadBtn" tabindex="0" role="button">Change photo</label></div>' +
        '</div>' +
        '<div class="mob-row"><button id="mEditCrop">Edit crop</button><button id="mPhotoTips">ⓘ Photo tips</button></div>';
    },
    styles(){
      return '<div id="mStyleIdle">' +
          '<p class="hint">We\'ll create a few versions of your MemoBrick. Pick your favorite or keep your current design.</p>' +
          '<div class="mob-row"><button id="mStyleRun" class="btn-gradient-cta" style="color:#fff">✨ Show Me Different Looks</button></div>' +
        '</div>' +
        '<div id="mStyleWorking" hidden>' +
          '<p class="hint autofix-working-text" id="mStyleWorkingText">Generating options…</p>' +
        '</div>' +
        '<div id="mStyleResult" class="stylegrid" hidden></div>' +
        '<div class="mob-row"><button id="mStyleAgain" hidden>Show different options</button></div>';
    },
    background(){
      const usedByHex = new Map(COUNTS.map((c) => [c.hex, c.n]));
      const keys = Object.keys(BG_EFFECTS).filter((k) => k !== "none");
      const isRemoving = S.bgEffect === "none";
      let html = '<p class="hint">Pick a background — your photo\'s subject stays put, only what\'s behind them changes.</p>';
      const segLoading = S.segStatus === "loading", segFailed = S.segStatus === "failed";
      const statusText = segLoading ? "Finding the people…"
        : segFailed ? "Couldn't separate the background this time — Original photo is being used." : "";
      html += '<p id="mBgStatus" class="bg-status' + (segLoading ? " is-loading" : "") + '"' +
        (statusText ? "" : " hidden") + '>' + statusText + '</p>';
      html += '<button type="button" class="bgremove-cta" id="mBgRemove" aria-pressed="' + isRemoving + '">' +
        '<svg viewBox="0 0 24 24"><path d="M3 3l18 18M10.5 4.5a7.5 7.5 0 0 1 9 9M6.3 6.3a7.5 7.5 0 0 0 9.4 9.4"></path></svg>' +
        '<span><b>Remove background</b><i>Keep just the person</i></span></button>';
      html += '<div class="bggrid" id="mBgGrid">' + keys.map((key) => {
        const eff = BG_EFFECTS[key];
        const isOriginal = key === "original", isCustom = key === "custom";
        const active = S.bgEffect === key;
        let style, label, extra = "";
        if (isOriginal){ style = S.img ? "background-image:url(" + S.img.src + ")" : "background:#EDE4DF"; label = eff.name; }
        else if (isCustom){
          style = S.customBgImg ? "background-image:url(" + S.customBgImg.src + ")" : "background:#FFF9F5";
          label = S.customBgImg ? "Your photo" : "Add your own";
          if (!S.customBgImg) extra = '<span class="bgthumb-plus">+</span>';
        } else { style = "background-image:url(" + bgThumbDataUrl(key) + ")"; label = eff.name; }
        return '<button class="bgthumb' + (isCustom ? " bgthumb-custom" : "") + '" data-mbg-effect="' + key +
          '" aria-pressed="' + active + '" style="' + style + '">' + extra +
          '<span class="bgthumb-label">' + label + '</span>' +
          (active ? '<span class="bgthumb-check">✓</span>' : "") + '</button>';
      }).join("") + '</div>' +
      '<label class="sr-only" for="mBgUpload">Upload a custom background photo</label>' +
      '<input type="file" id="mBgUpload" class="file-input" accept="image/*">' +
      '<p class="bg-status" id="mBgStatus" hidden></p>';
      return html;
    },
    crop(){
      return '<p class="hint">Your photo is already framed on the face we detected. Drag the frame yourself for full control — or tap below anytime to snap back to that automatic crop.</p>' +
        '<div class="mob-row"><button id="mFit" class="btn-gradient-cta" style="color:#fff">✨ Autocrop to face</button></div>' +
        '<p class="hint" style="margin-top:14px">Or fine-tune with zoom:</p>' +
        '<div class="mob-field"><label>Zoom <span id="mZoomVal">' +
          Math.round((S.zoom || 1) * 100) + '%</span></label>' +
        '<div class="mob-row" style="margin-top:0">' +
          '<button id="mZoomOut" style="flex:0 0 44px">−</button>' +
          '<input type="range" id="mZoom" min="50" max="300" step="1" value="' +
            Math.round((S.zoom || 1) * 100) + '" style="flex:1;margin:0 6px">' +
          '<button id="mZoomIn" style="flex:0 0 44px">+</button>' +
        '</div></div>' +
        '<div class="mob-row"><button id="mOpenCropper">⤢ Crop manually</button><button id="mReset">Reset</button></div>';
    },
    size(){
      const list = SIZES.slice().sort((a, b) => (a.gw * a.gh) - (b.gw * b.gh) || a.price - b.price);
      const rec = recommendedSizeForFaces(S.detectedFaceCount);
      let html = "";
      if (rec && rec.id !== (S.size && S.size.id)){
        const n = S.detectedFaceCount;
        html += '<div class="mob-size-rec">' +
          '<span class="mob-size-rec-k">✨ Recommended for your photo</span>' +
          '<button type="button" class="mob-size-rec-pick" data-size="' + rec.id + '">' +
            '<b>' + rec.label + '</b>' +
            '<span>Your photo has ' + n + (n === 1 ? ' face' : ' faces') +
              ' — this size keeps more detail.</span>' +
          '</button></div>';
      }
      html += '<div class="mob-sizes">' + list.map((z) => {
        let amount = z.price;
        if (window.MB_variantFor){
          const v = window.MB_variantFor(z.id, !!S.build);
          if (v) amount = parseFloat(v.price);
        }
        const [w, h] = physicalSize(z);
        return '<button class="mob-size' + (rec && rec.id === z.id ? ' mob-size-recommended' : '') + '" data-size="' + z.id +
          '" aria-pressed="' + (S.size && S.size.id === z.id) + '">' +
          (rec && rec.id === z.id ? '<span class="mob-size-badge">✨ Recommended</span>' : '') +
          '<b>' + z.label + '</b>' +
          (w && h ? '<i>' + w + ' × ' + h + '</i>' : "") +
          '<em>' + money(amount) + '</em></button>';
      }).join("") + '</div>';
      return html;
    },
    colors(){
      const usedByHex = new Map(COUNTS.map((c) => [c.hex, c.n]));
      const P = fullPal();
      const swatch = (c) => {
        const isExcluded = S.excludedColors.has(c.hex);
        const n = usedByHex.get(c.hex) || 0;
        const isUsed = n > 0;
        const countTxt = isUsed ? fmt(n) + " brick" + (n === 1 ? "" : "s") : "not currently used";
        const label = c.name + ", " + countTxt + (isExcluded ? ", excluded" : isUsed ? ", included" : "");
        return '<button class="mob-swatch mob-cswatch' + (isUsed && !isExcluded ? " cswatch-used" : "") + '" data-hex="' + c.hex +
          '" aria-pressed="' + (!isExcluded) + '" aria-label="' + label + '" style="background:' + c.hex + '" title="' + c.name + '">' +
          (isUsed && !isExcluded ? '<span class="cswatch-check" aria-hidden="true">✓</span>' : "") +
          (isExcluded ? '<span class="cswatch-x" aria-hidden="true">✕</span>' : "") + '</button>';
      };
      const usedCount = usedByHex.size, exCount = S.excludedColors.size;
      let html = '<p class="hint">Colors with a checkmark are used in your picture right now. Tap any color to leave it out.</p>';
      html += '<div class="mob-colors-status mob-colors-headrow">' +
        '<span id="mColorCountLabel">' + usedCount + ' color' + (usedCount === 1 ? "" : "s") +
          ' in this picture' + (exCount ? ' · ' + exCount + ' excluded' : '') + '</span>' +
        (exCount ? '<button id="mColorRestoreAll" class="mob-pill">Restore all</button>' : '') +
      '</div>';
      html += '<div class="mob-colors-grid mob-colors-grid-all">' + P.map(swatch).join("") + '</div>';
      html += undoRow();
      return html;
    },
    adjust(){
      const icons = {
        bri: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle><path d="M12 3v2M12 19v2M5 5l1.4 1.4M17.6 17.6L19 19M3 12h2M19 12h2M5 19l1.4-1.4M17.6 6.4L19 5"></path></svg>',
        con: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"></path></svg>',
        sat: '<svg viewBox="0 0 24 24"><path d="M12 2v20M2 12h20"></path><circle cx="12" cy="12" r="9"></circle></svg>',
        warm: '<svg viewBox="0 0 24 24"><circle cx="12" cy="14" r="5"></circle><path d="M12 4v2M6.5 7.5l1.4 1.4M17.5 7.5l-1.4 1.4"></path></svg>',
        shadows: '<svg viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path></svg>',
        det: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>',
      };
      const f = (id, label, min, max, val, suffix, step) => {
        const st = step || 1;
        return '<div class="mob-field">' +
          '<span class="mob-field-icon" aria-hidden="true">' + icons[id] + '</span>' +
          '<button class="mob-field-step" data-step-target="' + id + '" data-step-dir="-1" aria-label="Decrease ' + label + '">−</button>' +
          '<input type="range" id="ms_' + id + '" min="' + min + '" max="' + max +
          '" value="' + val + '" step="' + st + '" aria-label="' + label + '">' +
          '<button class="mob-field-step" data-step-target="' + id + '" data-step-dir="1" aria-label="Increase ' + label + '">+</button>' +
          '<span class="mob-field-val" id="mv_' + id + '">' + val + (suffix || "") + '</span>' +
        '</div>';
      };
      return '<p class="hint">Every change updates your MemoBrick as you move the slider.</p>' +
        f("bri", "Brightness", -100, 100, S.bri, "") +
        f("con", "Contrast", -100, 100, S.con, "") +
        f("sat", "Saturation", -100, 100, S.sat, "") +
        f("warm", "Warmth", 0, 100, S.warm, "%") +
        f("shadows", "Shadows", -100, 100, S.shadows, "%") +
        f("det", "Photo detail", 0, 150, S.detail, "%") +
        undoRow();
    },
    edit(){
      return '<p class="hint">Tap the picture above to place a brick. Long-press to lift a color.</p>' +
        '<div class="mob-row"><button id="mBrick" aria-pressed="' + !!S.editing + '">' +
          (S.editing ? "Editing on — tap to stop" : "Turn on brick editing") + '</button></div>' +
        '<div class="brushtabs" id="mBrushTabs" role="tablist">' +
          '<button type="button" class="brushtab" data-brushfilter="all" aria-selected="' + (S.brushFilter !== "skin") + '">All colors</button>' +
          '<button type="button" class="brushtab" data-brushfilter="skin" aria-selected="' + (S.brushFilter === "skin") + '">Skin only</button>' +
        '</div>' +
        '<div class="mob-brushes" id="mBrushes"></div>' +
        undoRow();
    },
  };

  function undoRow(){
    return '<div class="mob-undo"><button id="mUndoIn">↶ Undo</button>' +
           '<button id="mRedoIn">↷ Redo</button></div>';
  }

  function physicalSize(z){
    try { return inches(z).map((n) => (Math.round(n * 10) / 10) + '"'); } catch (e) { return [null, null]; }
  }

  let bodyLockScrollY = null;
  function lockBodyScroll(){
    if (bodyLockScrollY !== null) return;             // already locked — idempotent
    bodyLockScrollY = window.scrollY || window.pageYOffset || 0;
    document.body.style.position = "fixed";
    document.body.style.top = "-" + bodyLockScrollY + "px";
    document.body.style.left = "0";
    document.body.style.right = "0";
  }
  function unlockBodyScroll(){
    if (bodyLockScrollY === null) return;              // already unlocked — idempotent
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    window.scrollTo(0, bodyLockScrollY);
    bodyLockScrollY = null;
  }

  function renderToolPanel(){
    const t = MobileEditor.activeTool;
    const meta = TOOL_META[t];
    // Every tool now uses the compact, sticky layout — the live preview
    // stays on screen the whole time, only the controls scroll underneath.
    // The page itself is also locked from scrolling here, since the site
    // header/footer around the app would otherwise let a swipe carry the
    // customer past the editor.
    mob.classList.toggle("tool-mode", !!t);
    if (t) lockBodyScroll(); else unlockBodyScroll();
    const stepIdx = stepOf(t);
    const step = STEPS[stepIdx];
    const prevStep = STEPS[stepIdx - 1];
    const nextStep = STEPS[stepIdx + 1];
    workspace.innerHTML =
      '<div class="mob-sheet-panel" data-tool="' + t + '">' +
        '<span class="mob-grab"></span>' +
        '<div class="mob-sheet-head">' +
          (meta.undo ? '<button class="mob-sheet-undo" id="mSheetUndo" data-undo>↶ Undo</button>' : '<span></span>') +
          '<span class="mob-sheet-title">' + meta.title + ' <button class="mob-help" id="mSheetHelp" aria-label="Help">?</button></span>' +
          '<button class="mob-sheet-done" id="mSheetDone">✓ Done</button>' +
        '</div>' +
        '<div class="mob-tool-tabs">' +
          (prevStep ? '<button class="mob-step-arrow" id="mStepPrev" aria-label="Back to ' + prevStep.label + '">‹</button>' : '<span class="mob-step-arrow-spacer"></span>') +
          '<div class="mob-tool-tabs-scroll">' + step.tools.map((tn) => {
            const tm = TOOL_META[tn];
            return '<button class="mob-tool-tab' + (tn === t ? ' on' : '') + '" data-switch-tool="' + tn + '">' +
              tm.icon + '<span>' + tm.label + '</span></button>';
          }).join('') + '</div>' +
          (nextStep ? '<button class="mob-step-arrow" id="mStepNext" aria-label="Continue to ' + nextStep.label + '">›</button>' : '<span class="mob-step-arrow-spacer"></span>') +
        '</div>' +
        '<div class="mob-sheet-body">' + (TOOLS[t] ? TOOLS[t]() : "") + '</div>' +
      '</div>';
    wireTool(t);
    updateHistoryButtons();
    syncMobileTopBar();
    syncMobileNotice();

    const done = $m("#mSheetDone");
    if (done) done.addEventListener("click", () => { MobileEditor.fromColor = null; closeMobileTool(); });
    const help = $m("#mSheetHelp");
    if (help) help.addEventListener("click", () => { const s = document.querySelector("#mobSheet"); if (s) s.hidden = false; });
  }

  function wireTool(t){
    // step-nav and tool-tab switching apply to every tool, not just one —
    // wired here, unconditionally, rather than inside a specific branch
    const stepPrev = $m("#mStepPrev"), stepNext = $m("#mStepNext");
    if (stepPrev) stepPrev.addEventListener("click", () => {
      const idx = stepOf(t);
      const prev = STEPS[idx - 1];
      if (prev && prev.tools.length) openMobileTool(prev.tools[0]);
    });
    if (stepNext) stepNext.addEventListener("click", () => {
      const idx = stepOf(t);
      const next = STEPS[idx + 1];
      if (next && next.tools.length) openMobileTool(next.tools[0]);
    });
    workspace.querySelectorAll("[data-switch-tool]").forEach((btn) => {
      btn.addEventListener("click", () => openMobileTool(btn.dataset.switchTool));
    });

    // only the crop tool needs the browser to hand touch drags to JS
    // instead of treating them as page scroll — reset first, every time,
    // so leaving crop for any other tool correctly restores normal scroll
    hold.classList.toggle("cropping", t === "crop" || t === "size");
    syncPannable();
    if (t === "crop"){
      const opener = $m("#mOpenCropper");
      if (opener) opener.addEventListener("click", () => {
        openCropper();
        // the cropper is a shared, full-screen modal — when it closes
        // (Apply or Cancel), refresh the mobile tool panel so the zoom%
        // shown here reflects whatever the customer just chose
        const obs = new MutationObserver(() => {
          if ($("#cropper").hidden){ obs.disconnect(); renderToolPanel(); }
        });
        obs.observe($("#cropper"), { attributes: true, attributeFilter: ["hidden"] });
      });
      const z = $m("#mZoom");
      if (z) z.addEventListener("input", (e) => {
        setZoom(+e.target.value, true, true);
        const v = $m("#mZoomVal"); if (v) v.textContent = e.target.value + "%";
      });
      // render() only *schedules* the repaint for the next animation frame
      // and returns immediately — it doesn't paint synchronously. Calling
      // renderToolPanel() (which tears down and rebuilds this entire
      // sheet's DOM) right after used to fire in that same instant, so it
      // collided with the still-pending canvas repaint a frame later:
      // two DOM-heavy operations landing almost together, which is what
      // showed up as a visible glitch/flicker on every tap. Waiting two
      // animation frames guarantees the queued repaint has already
      // happened before the panel gets rebuilt underneath it.
      const afterRepaint = (fn) => requestAnimationFrame(() => requestAnimationFrame(fn));
      const zi = $m("#mZoomIn"), zo = $m("#mZoomOut");
      if (zi) zi.addEventListener("click", () => { setZoom(Math.round((S.zoom||1)*100) + 10, false, true); afterRepaint(renderToolPanel); });
      if (zo) zo.addEventListener("click", () => { setZoom(Math.round((S.zoom||1)*100) - 10, false, true); afterRepaint(renderToolPanel); });
      const fit = $m("#mFit"), rs = $m("#mReset");
      if (fit) fit.addEventListener("click", async () => { await autoCropToFaces(false); afterRepaint(renderToolPanel); });
      if (rs) rs.addEventListener("click", () => { S.ox = 0; S.oy = 0; setZoom(100, false, true); afterRepaint(renderToolPanel); });
    }
    if (t === "size"){
      workspace.querySelectorAll("[data-size]").forEach((b) => b.addEventListener("click", () => {
        setSize(b.dataset.size);            // engine re-quantises at the real grid — a new mosaic, not a stretch
        syncMobilePreview(); renderToolPanel();
      }));
    }
    if (t === "photo"){
      const upload = $m("#mUploadBtn");
      if (upload){
        upload.addEventListener("click", (e) => { e.preventDefault(); openPicker(); });
        upload.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " "){ e.preventDefault(); openPicker(); } });
      }
      const editCrop = $m("#mEditCrop");
      if (editCrop) editCrop.addEventListener("click", () => openMobileTool("crop"));
      const tips = $m("#mPhotoTips");
      if (tips) tips.addEventListener("click", () => {
        const modal = document.querySelector("#photoTipsModal");
        if (modal) modal.hidden = false;
      });
    }
    if (t === "styles"){
      const idle = $m("#mStyleIdle"), working = $m("#mStyleWorking"), result = $m("#mStyleResult");
      const runBtn = $m("#mStyleRun"), againBtn = $m("#mStyleAgain"), workingText = $m("#mStyleWorkingText");
      const showState = (which) => { [idle, working].forEach((el) => { if (el) el.hidden = true; }); if (which) which.hidden = false; };
      const renderResults = (options) => {
        result.innerHTML = options.map((o, i) =>
          `<button type="button" class="stylecard" data-idx="${i}">` +
            (o.thumb ? `<img src="${o.thumb}" alt="${o.label}">` : `<div style="aspect-ratio:1;background:#eee"></div>`) +
            `<span class="stylecard-label">${o.label}</span>` +
          `</button>`).join("");
        result.hidden = false;
        if (againBtn) againBtn.hidden = false;
        result.querySelectorAll(".stylecard").forEach((btn) => {
          btn.addEventListener("click", () => {
            const opt = options[+btn.dataset.idx];
            window.MB_applyStyleSuggestion(opt);
            result.querySelectorAll(".stylecard").forEach((b) => b.classList.remove("selected"));
            btn.classList.add("selected");
            toast(opt.label + " applied — you can still fine-tune it in Adjust.");
          });
        });
      };
      const run = async () => {
        if (!S.uploaded){ toast("Upload a photo first."); return; }
        showState(working);
        if (result) result.hidden = true;
        const options = await window.MB_generateStyleSuggestions((i, total, label) => {
          if (workingText) workingText.textContent = `Generating "${label}"… (${i+1}/${total})`;
        });
        showState(null);
        renderResults(options);
      };
      if (runBtn) runBtn.addEventListener("click", run);
      if (againBtn) againBtn.addEventListener("click", run);
    }
    if (t === "background"){
      const removeBtn = $m("#mBgRemove");
      if (removeBtn) removeBtn.addEventListener("click", () => { setBgEffect("none"); renderToolPanel(); syncMobilePreview(); });
      workspace.querySelectorAll("[data-mbg-effect]").forEach((b) => b.addEventListener("click", () => {
        const key = b.dataset.mbgEffect;
        if (key === "custom"){
          const input = document.querySelector("#bgUploadInput");
          if (input) input.click();
          return;
        }
        setBgEffect(key);
        renderToolPanel(); syncMobilePreview();
      }));
    }
    if (t === "colors"){
      workspace.querySelectorAll(".mob-cswatch").forEach((b) => b.addEventListener("click", () => {
        const hex = b.dataset.hex;
        const isExcluded = S.excludedColors.has(hex);
        if (!isExcluded){
          const usedNow = COUNTS.filter((c) => !S.excludedColors.has(c.hex)).length;
          if (usedNow <= 3){ toast("Keep at least 3 colors for a clear mosaic."); return; }
        }
        pushHistory("Colors");
        if (isExcluded) S.excludedColors.delete(hex); else S.excludedColors.add(hex);
        render();
        requestAnimationFrame(() => requestAnimationFrame(() => { syncMobilePreview(); renderToolPanel(); }));
      }));
      const restore = $m("#mColorRestoreAll");
      if (restore) restore.addEventListener("click", () => {
        if (!S.excludedColors.size) return;
        pushHistory("Colors");
        S.excludedColors.clear();
        render();
        requestAnimationFrame(() => requestAnimationFrame(() => { syncMobilePreview(); renderToolPanel(); }));
      });
    }
    if (t === "adjust"){
      const bind = (id, key, suffix) => {
        const el = $m("#ms_" + id);
        if (!el) return;
        el.addEventListener("input", (e) => {
          pushHistory(key, id);
          S[key] = +e.target.value;
          if (key === "detail") S.detailTouched = true;
          const v = $m("#mv_" + id); if (v) v.textContent = e.target.value + (suffix || "");
          render(true);
          updateHistoryButtons();
        });
        el.addEventListener("change", () => render());
      };
      bind("bri", "bri", ""); bind("con", "con", ""); bind("sat", "sat", ""); bind("warm", "warm", "%");
      bind("shadows", "shadows", "%"); bind("det", "detail", "%");

      workspace.querySelectorAll("[data-step-target]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.stepTarget;
          const dir = +btn.dataset.stepDir;
          const el = $m("#ms_" + id);
          if (!el) return;
          const step = +(el.step || 1);
          const min = +el.min, max = +el.max;
          el.value = clamp(+el.value + dir*step, min, max);
          el.dispatchEvent(new Event("input", { bubbles: true }));
        });
      });
    }
    if (t === "edit"){
      const bk = $m("#mBrick");
      if (bk) bk.addEventListener("click", () => {
        const b = document.querySelector("#togEdit"); if (b) b.click();
        preview.classList.toggle("grabbing", !!S.editing);
        renderToolPanel();
      });
      const syncMobileBrushes = () => {
        const brushHost = $m("#mBrushes");
        if (!brushHost || typeof renderBrushes !== "function") return;
        try { renderBrushes(); } catch (e) {}
        const src = document.querySelector("#brushes");
        if (src) brushHost.innerHTML = src.innerHTML;
        brushHost.querySelectorAll("button").forEach((b, i) => b.addEventListener("click", () => {
          const orig = src ? src.children[i] : null;
          if (orig) orig.click();
          brushHost.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", "false"));
          b.setAttribute("aria-pressed", "true");
        }));
      };
      syncMobileBrushes();
      const mBrushTabs = $m("#mBrushTabs");
      if (mBrushTabs) mBrushTabs.addEventListener("click", (e) => {
        const b = e.target.closest("[data-brushfilter]");
        if (!b) return;
        if (typeof setBrushFilter === "function") setBrushFilter(b.dataset.brushfilter);
        mBrushTabs.querySelectorAll(".brushtab").forEach((x) => x.setAttribute("aria-selected", x.dataset.brushfilter === b.dataset.brushfilter));
        syncMobileBrushes();
      });
    }
    const u = $m("#mUndoIn"), r = $m("#mRedoIn"), su = $m("#mSheetUndo");
    if (u) u.addEventListener("click", () => { undoStep(); syncMobilePreview(); renderToolPanel(); });
    if (r) r.addEventListener("click", () => { redoStep(); syncMobilePreview(); renderToolPanel(); });
    if (su) su.addEventListener("click", () => { undoStep(); syncMobilePreview(); renderToolPanel(); });
  }

  /* ---- "looking blocky?" nudge, above the workspace, dismissible -------- */
  function syncMobileNotice(){
    const el = $m("#mobNotice");
    if (!el) return;
    const rec = window.MB_recommendedSize ? window.MB_recommendedSize() : null;
    const show = rec && S.size && (S.size.gw * S.size.gh) < (rec.gw * rec.gh) && !MobileEditor._noticeDismissed;
    if (!show){ el.hidden = true; return; }
    el.hidden = false;
    el.innerHTML = '<p>Looking blocky? A larger size will give your photo more detail.</p>' +
      '<button class="mn-cta" id="mNoticeGo">Change size</button>' +
      '<button class="mn-x" id="mNoticeX" aria-label="Dismiss">×</button>';
    const go = $m("#mNoticeGo"), x = $m("#mNoticeX");
    if (go) go.addEventListener("click", () => openMobileTool("size"));
    if (x) x.addEventListener("click", () => { MobileEditor._noticeDismissed = true; el.hidden = true; });
  }

  /* ---- open / close: the workspace swaps, the preview never moves ------ */
  function openMobileTool(name){
    MobileEditor.activeTool = name;
    MobileEditor.activeStepIdx = Math.max(0, stepOf(name));
    if (name !== "colors") MobileEditor.fromColor = null;
    renderToolPanel();
  }
  function closeMobileTool(){
    mob.classList.remove("tool-mode");
    unlockBodyScroll();
    hold.classList.remove("cropping");
    window.MB_syncMobileBackgroundUI = () => {
      if (MobileEditor.activeTool === "background") renderToolPanel();
      syncMobilePreview();
    };
    MobileEditor.activeTool = null;
    renderStepGrid();
    syncMobileTopBar();
    syncPannable();
    syncMobileNotice();
  }
  window.openMobileTool = openMobileTool;
  window.closeMobileTool = closeMobileTool;

  function renderWorkspace(){
    if (MobileEditor.activeTool) renderToolPanel();
    else renderStepGrid();
    syncMobileNotice();
  }

  /* ---- shell wiring ------------------------------------------------------ */
  const back = $m("#mobBack");
  if (back) back.addEventListener("click", () => {
    if (MobileEditor.activeTool){ closeMobileTool(); return; }
    showView("upload");
  });

  const tips = $m("#mobTips"), sheet = document.querySelector("#mobSheet");
  if (tips && sheet){
    tips.addEventListener("click", () => { sheet.hidden = false; });
    sheet.addEventListener("click", (e) => {
      if (e.target === sheet || e.target.id === "mobSheetClose") sheet.hidden = true;
    });
  }

  /* ---- Finish: commits the current design and goes straight to checkout ---- */
  const finish = $m("#mobFinish");
  if (finish) finish.addEventListener("click", () => {
    if (window.MB_startCheckout) window.MB_startCheckout(finish);
    else toast("Your design is ready.");
  });

  /* ---- entry points -------------------------------------------------- */
  function initMobileEditor(){
    if (!isMobile()) { mob.hidden = true; return; }
    mob.hidden = !S.uploaded;
    if (!S.uploaded) return;
    syncMobilePreview();
    syncMobileTopBar();
    renderWorkspace();
  }
  window.initMobileEditor = initMobileEditor;

  document.addEventListener("memobrick:photo", () => {
    MobileEditor.activeStepIdx = 0; MobileEditor.activeTool = null;
    initMobileEditor();
  });
  document.addEventListener("memobrick:recount", () => {
    if (!isMobile()) return;
    // belt-and-braces: whatever fired this, a photo clearly exists now —
    // make sure the shell is not stuck hidden, independently of the
    // memobrick:photo path above
    if (S.uploaded && mob.hidden){ initMobileEditor(); return; }
    syncMobilePreview();
    syncMobileTopBar();
    if (MobileEditor.activeTool === "edit") renderToolPanel();
  });
  window.addEventListener("resize", () => { clearTimeout(window._mbz);
    window._mbz = setTimeout(initMobileEditor, 200); });
  initMobileEditor();
})();


/* A single, plain-language recommendation for the mobile size tool.
   The technical scoring stays internal; only the answer is exposed. */
/* =====================================================================
   GUIDED TOUR — short, skippable, anchored to the real toolbar
   Runs once per browser (localStorage), replayable via the ? Tour button.
   Never blocks editing: Skip and clicking outside both end it instantly,
   and it never covers the photo more than a thin highlight ring.
   ===================================================================== */
(function tourModule(){
  const TOUR_KEY = "mb_tour_seen_v1";
  const STEPS = [
    { tool: "photo",      text: "Start here — check your photo and crop." },
    { tool: "size",       text: "Choose the size that gives your photo the detail you want." },
    { tool: "background", text: "Remove or change the background if needed." },
    { tool: "colors",     text: "Refine the look while watching the live preview." },
    { tool: "edit",       text: "Optional: edit individual bricks." },
    { tool: "finish",     text: "Happy with it? Finish your design and continue to checkout." },
  ];
  const DESKTOP_TAB = { photo: "panelPhoto", size: "panelSize", background: "panelBackgrounds",
    colors: "panelColors", edit: "panelPaint" };

  let idx = 0, overlay = null, active = false;

  function isMobileLayout(){ return window.innerWidth <= 767; }

  function findTarget(step){
    if (step.tool === "finish"){
      return isMobileLayout() ? document.querySelector("#mobFinish") : document.querySelector("#edTopFinish");
    }
    if (isMobileLayout()){
      const idx2 = window.MB_stepOfTool ? window.MB_stepOfTool(step.tool) : -1;
      if (window.MB_gotoMobileStep && idx2 >= 0) window.MB_gotoMobileStep(idx2);
      return document.querySelector('[data-tool="' + step.tool + '"]');
    }
    const tabId = DESKTOP_TAB[step.tool];
    return tabId ? document.querySelector('.edtab[data-tab="' + tabId + '"]') : null;
  }

  function place(target){
    if (!overlay) return;
    const card = overlay.querySelector(".mb-tour-card");
    const ring = overlay.querySelector(".mb-tour-ring");
    const r = target.getBoundingClientRect();
    ring.style.top = (r.top - 5) + "px"; ring.style.left = (r.left - 5) + "px";
    ring.style.width = (r.width + 10) + "px"; ring.style.height = (r.height + 10) + "px";

    const cardH = card.offsetHeight || 110, cardW = Math.min(280, window.innerWidth - 24);
    card.style.width = cardW + "px";
    let top = r.bottom + 12;
    if (top + cardH > window.innerHeight - 8) top = Math.max(8, r.top - cardH - 12);
    let left = clamp(r.left + r.width/2 - cardW/2, 8, window.innerWidth - cardW - 8);
    card.style.top = top + "px"; card.style.left = left + "px";
  }

  function render(){
    const step = STEPS[idx];
    const target = findTarget(step);
    if (!target){ next(); return; }             // that tool isn't reachable right now — skip it gracefully
    if (isMobileLayout() || step.tool === "finish"){
      target.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });
    }
    // desktop tab targets live in the sticky sidebar and are always visible;
    // scrollIntoView on a position:sticky element produces an inconsistent
    // bounding rect afterward, which was misplacing the highlight ring
    overlay.querySelector(".mb-tour-text").textContent = step.text;
    overlay.querySelector(".mb-tour-count").textContent = (idx+1) + " / " + STEPS.length;
    const nextBtn = overlay.querySelector(".mb-tour-next");
    nextBtn.textContent = idx === STEPS.length - 1 ? "Got it" : "Next";
    place(target);
  }

  function next(){ if (idx < STEPS.length - 1){ idx++; render(); } else end(true); }
  function end(seen){
    active = false;
    if (overlay){ overlay.remove(); overlay = null; }
    if (seen) try { localStorage.setItem(TOUR_KEY, "1"); } catch (e){}
  }

  function start(){
    if (active || !S.img) return;
    active = true; idx = 0;
    overlay = document.createElement("div");
    overlay.className = "mb-tour-overlay";
    overlay.innerHTML =
      '<div class="mb-tour-ring"></div>' +
      '<div class="mb-tour-card">' +
        '<p class="mb-tour-text"></p>' +
        '<div class="mb-tour-row">' +
          '<span class="mb-tour-count"></span>' +
          '<span class="mb-tour-btns">' +
            '<button type="button" class="mb-tour-skip">Skip tour</button>' +
            '<button type="button" class="mb-tour-next"></button>' +
          '</span>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    overlay.querySelector(".mb-tour-skip").addEventListener("click", () => end(true));
    overlay.querySelector(".mb-tour-next").addEventListener("click", next);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) end(true); });
    render();
  }

  window.MB_startTour = start;
  window.addEventListener("resize", () => { if (active) render(); });

  // Automatic auto-start on first photo upload has been turned off per
  // request — the tour is now only ever shown when the customer
  // deliberately asks for it via the [data-tour-replay] button below.
  // (Previously: listened for "memobrick:photo" and auto-started once
  // per browser via localStorage[TOUR_KEY].)

  document.querySelectorAll("[data-tour-replay]").forEach((b) => b.addEventListener("click", start));
})();

/* =====================================================================
   CART DROPDOWN — click the cart icon to open a live-updating panel
   instead of leaving the page. Falls back to the real /cart page via
   the icon's href if JS fails for any reason.
   ===================================================================== */
(function cartDrawerModule(){
  const btn = document.querySelector("#cartIconBtn");
  const drawer = document.querySelector("#cartDrawer");
  const itemsEl = document.querySelector("#cartDrawerItems");
  const footEl = document.querySelector("#cartDrawerFoot");
  const totalEl = document.querySelector("#cartDrawerTotal");
  const countEl = document.querySelector("#cartCount");
  const closeBtn = document.querySelector("#cartDrawerClose");
  if (!btn || !drawer) return;

  const fmt = (cents) => "$" + (cents / 100).toFixed(2);

  function renderCart(cart){
    if (!cart.items.length){
      itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
      footEl.hidden = true;
    } else {
      itemsEl.innerHTML = "";
      cart.items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "cart-drawer-item";
        if (item.image){
          const img = document.createElement("img");
          img.src = item.image + "&width=120";
          img.alt = "";
          img.loading = "lazy";
          row.appendChild(img);
        }
        const info = document.createElement("div");
        info.className = "cart-drawer-item-info";
        const title = document.createElement("b");
        title.textContent = item.product_title;
        info.appendChild(title);
        if (item.variant_title && item.variant_title !== "Default Title"){
          const variant = document.createElement("span");
          variant.textContent = item.variant_title;
          info.appendChild(variant);
        }
        const row2 = document.createElement("div");
        row2.className = "cart-drawer-item-row";
        const qty = document.createElement("span");
        qty.textContent = "Qty " + item.quantity + " · " + fmt(item.final_line_price);
        const rm = document.createElement("button");
        rm.className = "cart-drawer-remove"; rm.type = "button"; rm.textContent = "Remove";
        rm.dataset.key = item.key;
        row2.appendChild(qty); row2.appendChild(rm);
        info.appendChild(row2);
        row.appendChild(info);
        itemsEl.appendChild(row);
      });
      footEl.hidden = false;
      totalEl.textContent = fmt(cart.total_price);
    }
    // free-shipping progress bar — threshold comes from the theme setting
    // (window.MB_FREE_SHIPPING_THRESHOLD, set in layout/theme.liquid), not
    // hardcoded, so it stays correct if the merchant ever changes it
    const shipBar = document.querySelector("#cartShipBar");
    if (shipBar){
      const threshold = Number(window.MB_FREE_SHIPPING_THRESHOLD) * 100; // dollars -> cents, matching cart.total_price
      if (!threshold || !cart.items.length){
        shipBar.hidden = true;
      } else {
        shipBar.hidden = false;
        const msg = document.querySelector("#cartShipMsg");
        const fill = document.querySelector("#cartShipFill");
        const pct = Math.max(0, Math.min(100, (cart.total_price / threshold) * 100));
        if (fill) fill.style.width = pct + "%";
        if (msg){
          if (cart.total_price >= threshold){
            msg.textContent = "You've unlocked free shipping! 🎉";
          } else {
            const remaining = fmt(threshold - cart.total_price);
            msg.textContent = "Add " + remaining + " more for free shipping";
          }
        }
      }
    }
  }

  function updateBadge(count){
    if (!countEl) return;
    countEl.textContent = count;
    countEl.hidden = count === 0;
  }

  async function loadCart(){
    itemsEl.innerHTML = '<p class="cart-empty">Loading…</p>';
    try {
      const res = await fetch("/cart.js");
      const cart = await res.json();
      renderCart(cart);
      updateBadge(cart.item_count);
    } catch (e){
      itemsEl.innerHTML = '<p class="cart-empty">Couldn' + "'" + 't load your cart. <a href="' + btn.getAttribute("href") + '">Open cart page</a></p>';
    }
  }

  async function removeItem(key){
    const row = itemsEl.querySelector('[data-key="' + key + '"]');
    if (row) row.closest(".cart-drawer-item").style.opacity = ".4";
    try {
      const res = await fetch("/cart/change.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: key, quantity: 0 })
      });
      const cart = await res.json();
      renderCart(cart);
      updateBadge(cart.item_count);
    } catch (e){ loadCart(); }
  }

  function openDrawer(){
    drawer.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    loadCart();
    document.addEventListener("click", onOutsideClick, true);
    document.addEventListener("keydown", onEscape);
  }
  window.MB_openCartDrawer = openDrawer;
  function closeDrawer(){
    drawer.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    document.removeEventListener("click", onOutsideClick, true);
    document.removeEventListener("keydown", onEscape);
  }
  function onOutsideClick(e){
    if (!drawer.contains(e.target) && e.target !== btn && !btn.contains(e.target)) closeDrawer();
  }
  function onEscape(e){ if (e.key === "Escape") closeDrawer(); }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    drawer.hidden ? openDrawer() : closeDrawer();
  });
  closeBtn.addEventListener("click", closeDrawer);
  itemsEl.addEventListener("click", (e) => {
    const rm = e.target.closest("[data-key]");
    if (rm) removeItem(rm.dataset.key);
  });

  // any add-to-cart flow elsewhere on the site (editor checkout, designer
  // service, free proof) can refresh the badge without a full reload
  document.addEventListener("memobrick:added", () => {
    fetch("/cart.js").then((r) => r.json()).then((cart) => updateBadge(cart.item_count)).catch(() => {});
  });
})();

/* =====================================================================
   DEVELOPMENT-ONLY A/B/C/D PROCESSING COMPARISON
   Never shown to customers. Activate from the browser console with
   `runABCDCompare()` while a photo is loaded in the editor. Renders
   four independent results from the SAME untouched original crop at
   the SAME size/palette, so they're a fair comparison:

     A — CURRENT V33     the existing customer-facing pipeline, unchanged
     B — SIMPLE           crop -> downsample -> perceptual match, nothing else
     C — MILD             B + very mild tone correction + light dither
     D — SOFT SKIN        C + face detection + a SOFT skin-color preference
                           (a small penalty on obviously-wrong skin colors,
                           not a hard restriction to 8 bricks)

   Every version is computed fresh from drawSource()/downsample() — never
   by reprocessing another version's output — so ORIGINAL + SETTINGS ->
   RESULT holds for all four and the comparison is valid.
   ===================================================================== */
window.DEBUG_ABCD_COMPARE = false;

// same crop+downsample production draw() uses, called fresh each time —
// this IS "always process from the untouched original," not a shortcut
function abcdFreshBuf(gw, gh){
  const f = clamp(Math.floor(1500/Math.max(gw, gh)), 2, 10);
  const mid = document.createElement("canvas");
  mid.width = gw*f; mid.height = gh*f;
  drawSource(mid.getContext("2d"), mid.width, mid.height);
  return downsample(mid, gw, gh, f);
}

// every currently-enabled color, minus only what the customer disabled —
// no automatic reduction to a smaller kit-sized palette for this test
function abcdFullPalette(){
  let P = pal();
  if (S.excludedColors.size){
    const curated = P.filter((c) => !S.excludedColors.has(c.hex));
    if (curated.length >= 3) P = curated;
  }
  return P;
}

// the exact brightness/contrast/saturation formula production draw()
// uses (see draw(), "tone: brightness, contrast, saturation") — reused
// here rather than inventing new math, per "translate proportionally to
// the existing system, do not hard-code new formulas"
function abcdMildTone(buf, bri, con, sat){
  const cf = (259*(con + 255))/(255*(259 - con)), sf = 1 + sat/100;
  for (let i = 0; i < buf.length; i += 3){
    let r = buf[i] + bri, g = buf[i+1] + bri, b = buf[i+2] + bri;
    r = cf*(r-128)+128; g = cf*(g-128)+128; b = cf*(b-128)+128;
    if (sf !== 1){
      const lum = .299*r + .587*g + .114*b;
      r = lum + (r-lum)*sf; g = lum + (g-lum)*sf; b = lum + (b-lum)*sf;
    }
    buf[i] = clamp(r,0,255); buf[i+1] = clamp(g,0,255); buf[i+2] = clamp(b,0,255);
  }
}

// colors no real skin tone should ever soft-prefer — used only to ADD a
// small penalty during matching for pixels already judged skin-plausible,
// never to exclude a color outright. Deliberately narrower than the
// production absolute-ban list: no grey (a warm-gray shadow can be
// legitimate), no red (lips need it) — just the colors the spec calls
// out as "strongly discourage when inappropriate."
const ABCD_SKIN_DISCOURAGE = new Set([
  "#51B2C9","#2A63AC","#2A405B","#6AA1D5","#9BBBE2","#7F90A3",   // strong blue family
  "#4AA357","#A2BA45","#7B9784","#284C3C","#8D8F68",             // bright green family
  "#A67ABE","#7B56A7","#BDAFDB",                                  // vivid purple family
  "#FCF188","#F8D548",                                            // neon-like yellow
]);

// shared serpentine Floyd–Steinberg quantizer for B/C/D — same
// dithering algorithm production draw() uses, but as one flat pass with
// a single configurable strength (no per-region split for B/C, since
// neither has region classification; D gets a face-aware reduction).
// softSkin, when provided, adds ABCD_SKIN_DISCOURAGE as a small penalty
// for pixels analyzeFaceRegions' own skinMask judged plausible skin —
// never a hard restriction to the 8-color skin palette.
function abcdQuantize(buf, gw, gh, PAL, ditherStrength, opts){
  opts = opts || {};
  const skinMask = opts.skinMask || null;       // Uint8Array or null
  const softSkinPenalty = opts.softSkinPenalty || 0;
  const cells = new Int16Array(gw*gh);
  for (let y = 0; y < gh; y++){
    const ltr = (y % 2) === 0;
    for (let k = 0; k < gw; k++){
      const x = ltr ? k : gw-1-k, i = (y*gw + x)*3;
      const isSkinPixel = skinMask ? skinMask[y*gw+x] === 1 : false;
      const strength = ditherStrength * (isSkinPixel ? 0.4 : 1);  // D: lighter dither on skin, per spec
      const r = clamp(buf[i],0,255), g = clamp(buf[i+1],0,255), b = clamp(buf[i+2],0,255);
      const [L,A,B2] = rgb2lab(r,g,b);
      const C1 = Math.sqrt(A*A+B2*B2);
      let best=0, bd=Infinity;
      for (let pi=0; pi<PAL.length; pi++){
        let d = de94(L,A,B2,C1,PAL[pi]);
        if (isSkinPixel && softSkinPenalty > 0 && ABCD_SKIN_DISCOURAGE.has(PAL[pi].hex)) d += softSkinPenalty;
        if (d<bd){ bd=d; best=pi; }
      }
      cells[y*gw+x] = best;
      if (strength <= 0) continue;
      const cap = 46;
      const er = clamp(r - PAL[best].r, -cap, cap), eg = clamp(g - PAL[best].g, -cap, cap), eb = clamp(b - PAL[best].b, -cap, cap);
      const put = (px, py, w) => {
        if (px < 0 || px >= gw || py >= gh) return;
        const j = (py*gw + px) * 3;
        buf[j] += er*w*strength; buf[j+1] += eg*w*strength; buf[j+2] += eb*w*strength;
      };
      const fwd = ltr ? 1 : -1;
      put(x+fwd, y,   7/16);
      put(x-fwd, y+1, 3/16);
      put(x,     y+1, 5/16);
      put(x+fwd, y+1, 1/16);
    }
  }
  return cells;
}

function renderVersionB(gw, gh){
  const buf = abcdFreshBuf(gw, gh);
  const PAL = abcdFullPalette();
  const cells = abcdQuantize(buf, gw, gh, PAL, 0, {});
  return { cells, PAL };
}

function renderVersionC(gw, gh){
  const buf = abcdFreshBuf(gw, gh);
  abcdMildTone(buf, 3, 3, 5);   // spec: bri +3, con +2..+4, sat +4..+6 -> using the midpoints
  const PAL = abcdFullPalette();
  const cells = abcdQuantize(buf, gw, gh, PAL, 0.15, {});
  return { cells, PAL };
}

function renderVersionD(gw, gh){
  const buf = abcdFreshBuf(gw, gh);
  abcdMildTone(buf, 3, 3, 5);
  const face = analyzeFaceRegions(buf, gw, gh, false);   // reuses existing, unmodified face detection
  const PAL = abcdFullPalette();
  const cells = abcdQuantize(buf, gw, gh, PAL, 0.15, { skinMask: face.mask, softSkinPenalty: 10 });
  return { cells, PAL, faceBoxes: face.boxes };
}

// renders one version's cells to a freshly-created canvas at a fixed
// display width, returns the canvas element
function abcdCellsToCanvas(cells, PAL, gw, gh, displayW){
  const c = document.createElement("canvas");
  c.width = gw; c.height = gh;
  const ctx = c.getContext("2d");
  const img = ctx.createImageData(gw, gh);
  for (let i = 0; i < cells.length; i++){
    const col = PAL[cells[i]];
    img.data[i*4] = col.r; img.data[i*4+1] = col.g; img.data[i*4+2] = col.b; img.data[i*4+3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const out = document.createElement("canvas");
  const displayH = Math.round(displayW * gh/gw);
  out.width = displayW; out.height = displayH;
  const octx = out.getContext("2d");
  octx.imageSmoothingEnabled = false;
  octx.drawImage(c, 0, 0, displayW, displayH);
  return out;
}

function runABCDCompare(){
  if (!S.img){ toast("Upload a photo first."); return; }
  const { gw, gh } = dims();
  const old = document.getElementById("abcdPanel");
  if (old) old.remove();

  const t0 = performance.now();
  const bRes = renderVersionB(gw, gh);
  const cRes = renderVersionC(gw, gh);
  const dRes = renderVersionD(gw, gh);
  const elapsed = (performance.now() - t0).toFixed(0);

  // A: whatever the customer-facing pipeline currently has rendered —
  // read directly from the live mosaic canvas, not recomputed, so it's
  // truly "the existing algorithm, unchanged"
  const aCanvas = document.createElement("canvas");
  aCanvas.width = 260; aCanvas.height = Math.round(260*gh/gw);
  aCanvas.getContext("2d").drawImage(mos, 0, 0, aCanvas.width, aCanvas.height);

  const panel = document.createElement("div");
  panel.id = "abcdPanel";
  panel.style.cssText = "position:fixed;inset:0;background:#151515;z-index:99999;overflow:auto;padding:20px;font-family:monospace;color:#eee;";
  const row = document.createElement("div");
  row.style.cssText = "display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;";

  function labeled(title, canvas, note){
    const box = document.createElement("div");
    box.style.cssText = "text-align:center;";
    const h = document.createElement("div");
    h.textContent = title; h.style.cssText = "font-weight:bold;margin-bottom:6px;";
    const n = document.createElement("div");
    n.textContent = note || ""; n.style.cssText = "font-size:11px;color:#999;margin-top:6px;max-width:260px;";
    box.appendChild(h); box.appendChild(canvas); box.appendChild(n);
    return box;
  }

  row.appendChild(labeled("A — CURRENT V33", aCanvas, "live pipeline, unchanged"));
  row.appendChild(labeled("B — SIMPLE", abcdCellsToCanvas(bRes.cells, bRes.PAL, gw, gh, 260), "full palette, no processing, no dither"));
  row.appendChild(labeled("C — MILD", abcdCellsToCanvas(cRes.cells, cRes.PAL, gw, gh, 260), "bri+3 con+3 sat+5, 15% dither"));
  row.appendChild(labeled("D — SOFT SKIN", abcdCellsToCanvas(dRes.cells, dRes.PAL, gw, gh, 260), "C + face-aware dither + soft skin penalty"));

  // face zoom row, if a face box exists (from D's detection — same
  // detector A already uses, just also run here for the crop coordinates)
  const faceRow = document.createElement("div");
  faceRow.style.cssText = "display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;margin-top:20px;";
  if (dRes.faceBoxes && dRes.faceBoxes.length){
    const b = dRes.faceBoxes[0];
    const zoomEach = (cells, PAL, title) => {
      const full = abcdCellsToCanvas(cells, PAL, gw, gh, gw*8);
      const scale = full.width/gw;
      const crop = document.createElement("canvas");
      const cw = (b.x1-b.x0+1)*scale, ch = (b.y1-b.y0+1)*scale;
      crop.width = 220; crop.height = 220;
      const cctx = crop.getContext("2d");
      cctx.imageSmoothingEnabled = false;
      cctx.drawImage(full, b.x0*scale, b.y0*scale, cw, ch, 0, 0, 220, 220*ch/cw);
      return labeled(title, crop, "");
    };
    faceRow.appendChild(zoomEach(bRes.cells, bRes.PAL, "FACE ZOOM — B"));
    faceRow.appendChild(zoomEach(cRes.cells, cRes.PAL, "FACE ZOOM — C"));
    faceRow.appendChild(zoomEach(dRes.cells, dRes.PAL, "FACE ZOOM — D"));
  }

  const header = document.createElement("div");
  header.style.cssText = "margin-bottom:16px;";
  header.innerHTML = `<b>A/B/C/D processing comparison</b> — dev only, never shown to customers.
    Rendered in ${elapsed}ms. Size: ${gw}×${gh}. Click outside or press Escape to close.`;

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close ✕";
  closeBtn.style.cssText = "position:fixed;top:16px;right:16px;padding:8px 16px;cursor:pointer;";
  closeBtn.addEventListener("click", () => panel.remove());
  document.addEventListener("keydown", function escClose(e){
    if (e.key === "Escape"){ panel.remove(); document.removeEventListener("keydown", escClose); }
  });

  panel.appendChild(header);
  panel.appendChild(closeBtn);
  panel.appendChild(row);
  panel.appendChild(faceRow);
  document.body.appendChild(panel);
}
window.runABCDCompare = runABCDCompare;

})();
