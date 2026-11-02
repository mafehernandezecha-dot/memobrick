# Font clean-up: no code font, fewer font weights, readable phone text

Site-developer (Jenny), 2026-11-02. Eden asked in chat: "yes, fix the fonts". That approved building and previewing the fix in an unpublished theme copy only. Nothing was published and the live theme was not touched. Eden publishes the copy herself.

## Where it is

| | |
|---|---|
| Theme copy | "Memobrick proof and cart fixes", gid://shopify/OnlineStoreTheme/189322330332, UNPUBLISHED |
| Preview | https://mymemobrick.com/?preview_theme_id=189322330332 |
| Live theme (not changed) | "Memobrick fixes", gid://shopify/OnlineStoreTheme/189310075100, MAIN, updatedAt 2026-10-28T08:37:41Z |
| Undo after publishing | republish "Memobrick fixes" 189310075100 (same as for A-2026W44-018 and -019), or restore the two files below |

Important: this copy already holds A-2026W44-018 (free-proof fallback) and A-2026W44-019 (cart "no photo yet" notice), both approved and still waiting for Eden to publish. Publishing the copy puts those two and this font fix live together.

## Live files compared first

The copy was duplicated from live on 2026-10-28. Before editing, every font-related file was compared by checksum, copy vs live:

| File | Live md5 | Copy md5 (before this fix) | Result |
|---|---|---|---|
| layout/theme.liquid | 733c51e69cdef2ef8de89315117ddf87 | 733c51e69cdef2ef8de89315117ddf87 | same, safe to edit |
| assets/memobrick.css | 28ca9f56e49d23386562e90fa8052ed0 | 28ca9f56e49d23386562e90fa8052ed0 | same, not edited |
| assets/memobrick.js | 0b2713d1c0e521ab1358950fae71d245 | 0b2713d1c0e521ab1358950fae71d245 | same, not edited |
| layout/theme.gem-layout-none.liquid | 542ca1c9eba2c26b4dff2d726ce3b689 | 2b0ff3054ce7b3014cc2c1c492503f61 | differs (GemPages changed live at 08:37:41 after the copy was made). GemPages layout, not touched and not used by the pages below |

So no newer live change is reverted by this fix.

## Files changed in the copy (only these two)

1. `layout/theme.liquid`: 733c51e69cdef2ef8de89315117ddf87 -> f32a74722a961b78e443c13b6c11a367

```diff
-  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
+  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
   {{ 'memobrick.css' | asset_url | stylesheet_tag }}
+  {{ 'memobrick-type.css' | asset_url | stylesheet_tag }}
```

The preconnect lines for fonts.googleapis.com and fonts.gstatic.com (crossorigin) were already there and are kept. display=swap kept.

2. `assets/memobrick-type.css` (new, 3.8 KB): d0a02db0738d7621d3342e5628eefff7. Full file: `theme-files/after/assets/memobrick-type.css`. What it does:
   - `--mono` (the font every label uses, 142 rules in memobrick.css plus inline styles in templates) now points to Inter instead of JetBrains Mono.
   - The 45 label rules that were mono and in capitals become Inter 600 with letter-spacing .08em (list generated from memobrick.css), plus "STEP 01" style labels and inline-styled uppercase labels.
   - The Creator's size drawing (SVG text that names "JetBrains Mono" as an attribute inside memobrick.js) is set to the same font by CSS, so memobrick.js did not need editing.
   - Phones (max-width 749px): labels, list items, small links, product meta, review dates, cart lines, cart drawer, Creator top bar and upload screen at 14px; body copy (how-it-works steps, FAQ answers, product photo tips) at 15px. Headings are not changed.
   - Class rules repeat the original selectors, so they only replace the original small size and never shrink text that another rule made bigger (checked: 0 elements got smaller on any page).
   - Inline-styled small text (cart lines, breadcrumbs) is raised with `!important`; GemPages elements (`gp-` classes) are excluded.

Both uploaded files were confirmed by checksum after upload. Before and after copies of the files: `theme-files/before/` and `theme-files/after/`.

## Weights

| Family | Before | After | Why |
|---|---|---|---|
| Fredoka | 400, 500, 600, 700 | 600, 700 | headings, buttons, prices use 600 and 700 |
| Inter | 400, 500, 600, 700 | 400, 600, 700 | 700 kept: 58 bold words per page (promo code, "Order by December 15", ratings, prices). Google serves Inter as one variable file, so 700 adds no font download (10 font files either way, checked) |
| JetBrains Mono | 400, 500 | removed | one font file fewer per page (4 Google Fonts requests -> 3 on the phone home page), font CSS 19.9 KB -> 9.9 KB |

Visible side effects of the trim, accepted:
- Inter 500 (only the small "Read all 1,027 reviews", "Show more reviews" and cart "Update" buttons) now draws at 400.
- Fredoka 400 (only the struck-through old price $159.00 in the phone product sticky bar) now draws at 600.

## Test (Playwright, Chromium 1194, generated test image only, no checkout, no order)

Pages: home, photo-kit product page (/products/2-2-boards), cart (one with a bag of bricks, one with a test mosaic made in the Creator), and the Creator before and after upload. Phone 390x844 and desktop 1366x900. Live vs preview.

Text element counts by font and computed size (visible elements with their own text):

| Page (text elements) | Fredoka | Inter | JetBrains Mono | Other | Under 12px | 12 to 13.5px | 14 to 14.5px | 15px and up |
|---|---|---|---|---|---|---|---|---|
| phone home, live (129) | 25 | 73 | 30 | 1 | 19 | 56 | 12 | 42 |
| phone home, copy (129) | 25 | 103 | 0 | 1 | 0 | 0 | 83 | 46 |
| phone product, live (152) | 17 | 98 | 37 | 0 | 34 | 33 | 5 | 80 |
| phone product, copy (152) | 17 | 135 | 0 | 0 | 0 | 0 | 68 | 84 |
| phone cart, live (26) | 2 | 21 | 3 | 0 | 2 | 18 | 0 | 6 |
| phone cart, copy (26) | 2 | 24 | 0 | 0 | 1 | 0 | 19 | 6 |
| phone Creator upload screen, live (43) | 8 | 25 | 10 | 0 | 7 | 24 | 3 | 9 |
| phone Creator upload screen, copy (43) | 8 | 35 | 0 | 0 | 1 | 3 | 29 | 10 |
| desktop home, live (140) | 28 | 79 | 30 | 3 | 19 | 66 | 11 | 44 |
| desktop home, copy (140) | 28 | 109 | 0 | 3 | 19 | 66 | 11 | 44 |
| desktop product, live (159) | 15 | 105 | 37 | 2 | 34 | 40 | 4 | 81 |
| desktop product, copy (159) | 15 | 142 | 0 | 2 | 34 | 40 | 4 | 81 |
| desktop cart, live (34) | 3 | 28 | 3 | 0 | 2 | 26 | 0 | 6 |
| desktop cart, copy (34) | 3 | 31 | 0 | 0 | 2 | 26 | 0 | 6 |

"Other" is Arial on a few icon buttons (play, review arrows) that already used the browser default; unchanged. Desktop sizes are unchanged on purpose (only the font family and label weight change there).

Fonts loaded on the phone home page: before Fredoka 600/700, Inter 400/500/600/700, JetBrains Mono 400/500; after Fredoka 600/700, Inter 400/600/700.

Checks that passed:
- No visible text uses JetBrains Mono on any tested page, phone or desktop, including the Creator after upload, the cart drawer and the cart with a mosaic.
- No horizontal scroll (page width 390 on phone, 1366 on desktop) on any page.
- No element got smaller anywhere; no desktop size changed.
- Header, "Create My MemoBrick" button, sticky "Design this in the creator" bar, Creator top bar ("Back", size, price, "Finish Editing") and cart buttons fit on one line at 390px. No new clipped text (the only clipped items are the same on live: the long product name in the cart drawer, which is cut with an ellipsis by design, and screen-reader-only labels).

Visible phone text still under 14px (exceptions, on purpose):
- Cart count badge on the cart icon (10px number inside a small circle). Enlarging it would overflow the circle.
- Step numbers 1, 2, 3 inside the circles of the Creator's step bar (12px). Same reason.
- The "?" tour button in the Creator top bar (13px, an icon button).
- Hidden contact-form fields in the Creator use the browser's default monospace font; they are not visible and are not JetBrains Mono.

Layout notes:
- Phone home: the first eyebrow ("CUSTOM BRICK MOSAICS") is 2px taller, so the hero moves down about 8px. "Create My MemoBrick" stays on the first screen.
- Phone home size cards: the "MOST ORDERED" and "IN THE CREATOR" badges are bigger and now overlap the top edge of the card photo slightly more. Looks fine in the screenshots; say if you want them back at 12px.
- Product breadcrumb "MEMOBRICK > CUSTOM BRICKED MOSAICS" now wraps to two lines on phones.

Not tested: GemPages pages and blog templates (not touched; GemPages layouts still request JetBrains Mono in their own font link, and that was left alone on purpose). The order/checkout pages are Shopify's and were not opened.

## Screenshots

All under `marketing/site/font-fix-2026-11-02/screenshots/`:
- `compare/phone-home.jpg`, `compare/phone-product.jpg`, `compare/phone-cart.jpg`, `compare/phone-editor.jpg`, `compare/phone-home-sizes.jpg` (live left, copy right)
- `compare/desktop-home-top-live-bottom-copy.jpg`, `compare/desktop-product-top-live-bottom-copy.jpg`, `compare/desktop-cart-top-live-bottom-copy.jpg`
- `before/live-<phone|desktop>-<home|product|cart|cart-mosaic|cart-drawer|editor>[-full].jpg` and the same names under `after/copy-...`

Raw measurements: `data/live-measure.json`, `data/copy-measure.json`, `data/*-editor.json`, `data/table.md`. Scripts: `tools/`.

## Expected effect

Labels read as part of the brand instead of as computer code, and phone shoppers can read prices per brick, sizes, review dates, delivery and cart lines without zooming. One font file fewer on every page. This should help the product page and cart steps on phones (most visits), though the effect on orders is not measurable on its own; I will check the phone add-to-cart rate (referred sessions only) for the 7 days after Eden publishes against the 7 days before.

## How to undo

Republish "Memobrick fixes" 189310075100. Or, in the published theme: restore `layout/theme.liquid` from `theme-files/before/layout/theme.liquid` (md5 733c51e69cdef2ef8de89315117ddf87) and delete `assets/memobrick-type.css`.
