/* =====================================================================
   The Memobrick catalog, taken from the editors themselves — nothing here
   is invented:

   · BRICKS: the 40 colors in the editors' BRICKS table
     ([name, hex, MemoBrick code, supplier code]). Identical in the website
     source, the live minified build and MemoBrick Studio (test/catalog.test.js
     re-reads the theme file to prove it).
   · SIZES: the editors' SIZES table. 16×16" is one 50×50-stud board; every
     other size is bx × by 32×32-stud (10") boards ("32 studs per 10 inches").
   · Kit contents: the build booklet's "What's in the box" — one bag per
     color in packs of 100 rounded up, bx × by baseplates, 1 brick separator.

   Seeding is idempotent and NEVER sets or changes a stock quantity.
   ===================================================================== */
import { query, tx } from "./db.js";

export const BRICKS = [
  ["Black","#111011","001","26"], ["Light Nougat","#E4C2A8","002","283"], ["Sand","#C6BB8D","003","138"],
  ["Spring Yellow","#FCF188","004","226"], ["Shiny Blue","#51B2C9","005","322"], ["Lilac","#A67ABE","006","324"],
  ["Aqua Blue","#CAEEE3","007","323"], ["Magenta","#A83873","008","124"], ["Beige","#DBC897","009","5"],
  ["Lavender","#BDAFDB","010","325"], ["Yellow","#F8D548","011","24"], ["Brown","#6D4A3D","012","192"],
  ["Deep Blue","#2A63AC","013","23"], ["Coffee","#A05C33","014","38"], ["Caramel","#E1A580","015","A25"],
  ["Jungle Green","#7B9784","016","151"], ["Olive","#8D8F68","017","330"], ["Stone Blue","#7F90A3","018","135"],
  ["Dark Blue","#2A405B","019","140"], ["Cream","#F9D8C6","020","A08"], ["Bubblegum","#C966A2","021","221"],
  ["Green","#4AA357","022","37"], ["Dark Green","#284C3C","023","141"], ["Orange","#F3B241","024","191"],
  ["Dark Red","#7B3936","025","154"], ["Red","#BD3A32","026","21"], ["Blue","#6AA1D5","027","102"],
  ["Grass","#A2BA45","028","119"], ["Toffee","#AB7E58","029","312"], ["Dark Brown","#4F3F38","030","308"],
  ["Dark Grey","#4B4C50","031","199"], ["Nougat","#D2936B","032","18"], ["Sapphire Blue","#9BBBE2","033","212"],
  ["Pink","#E3ADD4","034","222"], ["Bright Orange","#EF8545","035","106"], ["Stone Grey","#A4A9AA","036","208"],
  ["White","#FEFEFE","037","1"], ["Rouge","#EB6D7F","038","A19"], ["Grey","#6F7176","039","194"],
  ["Purple","#7B56A7","040","A13"],
];

export const BOARDS = [
  { sku: "BOARD-10", name: "10×10 baseplate (32×32 studs)", sort: 1 },
  { sku: "BOARD-16", name: "16×16 baseplate (50×50 studs)", sort: 2 },
];
export const TOOLS = [
  { sku: "TOOL-SEPARATOR", name: "Brick separator", sort: 1 },
];

// [id, studs w, studs h, plates across, plates down] — the editors' SIZES
export const SIZES = [
  ["10x10", 32, 32, 1, 1], ["16x16", 50, 50, 1, 1], ["20x20", 64, 64, 2, 2], ["20x30", 64, 96, 2, 3],
  ["30x20", 96, 64, 3, 2], ["20x40", 64, 128, 2, 4], ["40x20", 128, 64, 4, 2], ["20x50", 64, 160, 2, 5],
  ["50x20", 160, 64, 5, 2], ["30x30", 96, 96, 3, 3], ["30x40", 96, 128, 3, 4], ["40x30", 128, 96, 4, 3],
  ["60x20", 192, 64, 6, 2], ["30x50", 96, 160, 3, 5], ["50x30", 160, 96, 5, 3], ["40x40", 128, 128, 4, 4],
  ["40x50", 128, 160, 4, 5], ["50x50", 160, 160, 5, 5], ["60x30", 192, 96, 6, 3], ["50x60", 160, 192, 5, 6],
  ["60x60", 192, 192, 6, 6], ["70x60", 224, 192, 7, 6],
];

export const DEFAULT_SETTINGS = {
  // Bags hold 100 bricks and are rounded up ("every kit arrives with
  // spares") — so what leaves the shelf is the packed quantity.
  brick_pack_size: 100,
  brick_quantity_mode: "packed",          // "packed" | "exact"
  tools_per_kit: { "TOOL-SEPARATOR": 1 },
  // website designs never referenced by an order are pruned after this
  unreferenced_design_days: 60,
};

/* the board a size needs, by the editors' own rule */
export function boardFor(studsW, studsH, platesW, platesH){
  if (studsW === 50 && studsH === 50 && platesW === 1 && platesH === 1) return { sku: "BOARD-16", count: 1 };
  if (studsW === platesW * 32 && studsH === platesH * 32) return { sku: "BOARD-10", count: platesW * platesH };
  return null;   // not a size we know how to build — caller must reject, never guess
}

export async function seedCatalog(){
  await tx(async (c) => {
    for (const [i, [name, hex, code, supplier]] of BRICKS.entries()){
      const { rows } = await c.query(
        `insert into items (sku, category, name, color_code, hex, supplier_code, sort_order)
         values ($1, 'brick', $2, $3, $4, $5, $6)
         on conflict (sku) do update set name = excluded.name, hex = excluded.hex,
           supplier_code = excluded.supplier_code, sort_order = excluded.sort_order
         returning id`,
        ["BRK-" + code, name, code, hex, supplier, i + 1]);
      const id = rows[0].id;
      for (const [type, alias] of [["memobrick_code", code], ["supplier_code", supplier], ["hex", hex.toUpperCase()], ["name", name.toLowerCase()]]){
        await c.query(`insert into color_aliases (alias_type, alias, item_id) values ($1, $2, $3)
                       on conflict (alias_type, alias) do nothing`, [type, alias, id]);
      }
    }
    for (const b of BOARDS) await c.query(
      `insert into items (sku, category, name, sort_order) values ($1, 'board', $2, $3)
       on conflict (sku) do update set name = excluded.name`, [b.sku, b.name, b.sort]);
    for (const t of TOOLS) await c.query(
      `insert into items (sku, category, name, sort_order) values ($1, 'tool', $2, $3)
       on conflict (sku) do nothing`, [t.sku, t.name, t.sort]);
    for (const [id, w, h, bx, by] of SIZES){
      const b = boardFor(w, h, bx, by);
      const label = id.replace("x", " × ") + '"';
      await c.query(
        `insert into size_specs (size_id, label, studs_w, studs_h, board_sku, boards, tools, source)
         values ($1, $2, $3, $4, $5, $6, '{}', 'editor')
         on conflict (size_id) do update set studs_w = excluded.studs_w, studs_h = excluded.studs_h,
           board_sku = excluded.board_sku, boards = excluded.boards`,
        [id, label, w, h, b.sku, b.count]);
    }
    for (const [k, v] of Object.entries(DEFAULT_SETTINGS))
      await c.query(`insert into settings (key, value) values ($1, $2) on conflict (key) do nothing`, [k, JSON.stringify(v)]);
  });
}

export async function getSettings(c){
  const { rows } = await (c || { query }).query("select key, value from settings");
  const out = { ...DEFAULT_SETTINGS };
  for (const r of rows) out[r.key] = r.value;
  return out;
}
