/* Builds a local copy of the LIVE website editor page for end-to-end tests:
   the theme's own memobrick-site section markup (Liquid stripped), the
   theme's minified memobrick.js exactly as the store serves it, a catalog
   like the one Shopify renders, and the inventory connector. Shopify's
   /cart/add.js is faked by the test (Playwright route). */
import fs from "node:fs";
import path from "node:path";

export function buildWebsiteHarness(themeDir, outDir, controlCenterUrl, connectorPath){
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  fs.symlinkSync(path.resolve(themeDir, "assets"), path.join(outDir, "assets"));
  let section = fs.readFileSync(path.join(themeDir, "sections/memobrick-site.liquid"), "utf8");
  section = section
    .replace(/\{%-?\s*schema\s*-?%\}[\s\S]*?\{%-?\s*endschema\s*-?%\}/g, "")
    .replace(/\{%-?\s*comment\s*-?%\}[\s\S]*?\{%-?\s*endcomment\s*-?%\}/g, "")
    .replace(/\{%-?\s*render 'memobrick-catalog'\s*-?%\}/, "")
    .replace(/\{\{\s*(['"])([^'"]+)\1\s*\|\s*asset_url\s*\}\}/g, "assets/$2")
    .replace(/\{\{[\s\S]*?\}\}/g, "")
    .replace(/\{%[\s\S]*?%\}/g, "");
  const sizes = [["10x10","square"],["16x16","square"],["20x20","square"],["20x30","portrait"],["30x20","landscape"],["20x40","portrait"],["40x20","landscape"],
    ["30x30","square"],["20x50","portrait"],["50x20","landscape"],["30x40","portrait"],["40x30","landscape"],["30x50","portrait"],["50x30","landscape"],
    ["40x40","square"],["40x50","portrait"],["50x50","square"],["60x30","landscape"],["50x60","portrait"],["60x60","square"],["60x20","landscape"],["70x60","landscape"]];
  const catalog = { sizes: sizes.map(([id, shape], i) => ({ id, shape, handle: "h-" + id, title: "Custom Bricked Mosaic " + id, productId: 1000 + i, image: null,
    variants: [{ id: 50000 + i, title: "Build at home", price: 9988, compareAtPrice: null, available: true, service: false }] })),
    moneyFormat: "${{amount}}", cartUrl: "/cart" };
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Website editor harness</title><link rel="stylesheet" href="assets/memobrick.css"></head>
<body class="memobrick-site template-page">
<script>window.MB_LANDING_VIEW = "upload";</script>
<script id="memobrick-catalog" type="application/json">${JSON.stringify(catalog)}</script>
${section}
<script src="assets/memobrick.js" defer></script>
<script>window.MB_INVENTORY = { url: ${JSON.stringify(controlCenterUrl)} };</script>
<script src="memobrick-inventory.js" defer></script>
</body></html>`;
  fs.writeFileSync(path.join(outDir, "index.html"), html);
  fs.copyFileSync(connectorPath, path.join(outDir, "memobrick-inventory.js"));
}
