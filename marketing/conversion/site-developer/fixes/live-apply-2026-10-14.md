# Owner steps: put the 5 approved site fixes live (prepared 2026-10-14)

The Shopify connector refuses every write to the live theme ("Theme file writes against the live storefront are blocked"), so I could not apply these myself. Nothing on the live site changed. Checked after the refusal: the live theme still has updatedAt 2026-10-13T10:04:49Z and the same four file checksums as before.

The fixes are built and tested together in the private copy "Memobrick fixes" (id 188683092188). Preview: https://mymemobrick.com/?preview_theme_id=188683092188

| Item | Fix | File |
|---|---|---|
| A-2026W42-009 | Phone home page: "Create My MemoBrick" and "Kits from $35" on the first screen | sections/memobrick-site.liquid |
| A-2026W42-010 | Email pop-up: phone keyboard stays closed, A/B test CA-20261012-01 | assets/memobrick-email-gate.js |
| A-2026W42-021 | Cart: customer's mosaic, internal fields hidden, Dec 15 line, shipping estimator with real rates, $125 free-shipping message | templates/cart.liquid and assets/memobrick.js (cart drawer) |
| A-2026W42-022 | Desktop editor: price and Finish Editing bar stays in view | assets/memobrick.js |
| A-2026W42-013 | Pro Design page keeps the size picked on the product page | assets/memobrick.js |

Before you start, confirm nobody edited the live theme since 2026-10-13 10:04 UTC (Themes page, "Last saved"). If it was edited, stop and tell me; I will rebuild on the new files.

## Option 1 (as asked): replace 4 files in the live theme, about 10 minutes

Shopify admin > Online Store > Themes > live theme `memobrick-theme-v27-print-8mm` > "..." > Edit code. For each file below: open the link, select all (Ctrl+A or Cmd+A), copy, open the file in the code editor, select all, paste, Save.

| Theme file | Copy the full new file from | New checksum (md5) |
|---|---|---|
| `assets/memobrick.js` (250 KB, one long line) | https://github.com/mafehernandezecha-dot/memobrick/raw/84eb70a6ede4798bdbb0556463046494ae53d23d/marketing/conversion/site-developer/theme-files/live-bundle-2026-10-14/assets/memobrick.js | 88f83c4a454dcf58bc1d9c1118777f77 |
| `assets/memobrick-email-gate.js` | https://github.com/mafehernandezecha-dot/memobrick/raw/84eb70a6ede4798bdbb0556463046494ae53d23d/marketing/conversion/site-developer/theme-files/email-gate-ab-no-keyboard/assets/memobrick-email-gate.js | 851b9041af3a1e33c16102520c3b92e9 |
| `sections/memobrick-site.liquid` | https://github.com/mafehernandezecha-dot/memobrick/raw/84eb70a6ede4798bdbb0556463046494ae53d23d/marketing/conversion/site-developer/theme-files/home-phone-cta-above-fold/sections/memobrick-site.liquid | 809e6c2ebf0eef90eeb81352bf190c94 |
| `templates/cart.liquid` | https://github.com/mafehernandezecha-dot/memobrick/raw/84eb70a6ede4798bdbb0556463046494ae53d23d/marketing/conversion/site-developer/theme-files/cart-design-delivery-shipping/templates/cart.liquid | 498326618234d9f98c771afe82477a15 |

Do `assets/memobrick.js` first: it carries three of the five fixes. After saving all four, tell me (or the coordinator) and I will check the checksums through the connector and run the live check below.

If pasting the 250 KB file is awkward, the same result comes from 5 small find-and-replace edits on the live `assets/memobrick.js`: the two in `fixes/desktop-editor-sticky-topbar-v27.md`, the two in `fixes/cart-design-delivery-shipping.md`, and this one for A-2026W42-013:

- Find: `const f={file:null,sizeId:null,showAll:!1},m=["16x16","20x20","20x30","30x30"],`
- Replace with: `const m=["16x16","20x20","20x30","30x30"],mbQ=new URLSearchParams(location.search).get("size"),mbK=mbQ&&Se.some(w=>w.id===mbQ)?mbQ:null,f={file:null,sizeId:mbK,showAll:!!mbK&&m.indexOf(mbK)<0},`

## Option 2 (faster, one click): publish the tested copy

The copy "Memobrick fixes" is the live theme plus exactly these four files. I compared the checksums of both themes for every asset, layout, config, section, snippet and the first templates (about 400 files): only the four files above differ. Themes > "Memobrick fixes" > "..." > Publish.

Trade-offs: the live theme gets a new id and name (rename it after publishing if you like), and some apps link to a theme. After publishing, open one GemPages page (for example a blog article) and the home page to confirm they look normal. Undo is one click: publish `memobrick-theme-v27-print-8mm` again (I will not delete or change it).

## How I will check it on the live site

`node marketing/conversion/site-developer/tools/verify-bundle.mjs live <outdir> after` and `tools/prodesign-size.mjs live <outdir> after`, phone 390x844 and desktop 1440x900. Expected (all seen in the preview today):

- Phone home: the new button at y = 403 (first screen is 844), "Kits from $35."; desktop unchanged.
- Editor: sticky bar style present; email pop-up script contains the A/B code.
- `/pages/editor?size=20x20#design`: 20 x 20" selected, $99.88; 16x16 gives $69.88; 40x30 opens all sizes with 40 x 30" at $278; no size still shows "Choose a size".
- Cart (one 10x10 kit, $35): "Free US shipping on orders $125 and up", "Add $90.00 more to get free shipping.", December 15 line, ZIP field, no sideways scroll.

Live check run today before any change (baseline): every one of these was absent. Screenshots: `marketing/conversion/site-developer/2026-10-14-pro-design-keep-size/live-before-*` and `preview-bundle-*`.

## How to undo

Backups of the live files, byte-identical to the live theme (checksums match Shopify's):

- `marketing/conversion/site-developer/backups/2026-10-14-cart-sticky-prodesign/assets/memobrick.js` (cb938c927b6c8e00e8b56bc200f7407f): undoes 021 drawer, 022 and 013
- `marketing/conversion/site-developer/backups/2026-10-14-cart-sticky-prodesign/templates/cart.liquid` (e494bd6a40250dd4c433f2cfdd2ac5cc): undoes the 021 cart page
- `marketing/conversion/site-developer/backups/2026-10-14-email-gate-ab-no-keyboard/assets/memobrick-email-gate.js` (5a95f0f5d9c9c7f848a9c313210c36e9): undoes 010
- `marketing/conversion/site-developer/backups/2026-10-14-home-phone-cta-above-fold/sections/memobrick-site.liquid` (5516bd7733c1c1bb254e448f26450ca2): undoes 009

Paste the backup over the file in Edit code and Save. Emergency switch for the email pop-up only: Theme settings, "Save-your-design email", off.
