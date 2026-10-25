# Holiday gift boxes on the homepage (2026-10-25)

Unpublished theme copy: **"Memobrick holiday gift boxes"** (189177626844), duplicated from the live theme
"Memobrick gift kit flow" (188683092188) on 2026-10-25.

Preview: https://mymemobrick.com/?preview_theme_id=189177626844

## What changed (homepage only)

1. `assets/memobrick-holiday-gift-boxes.js` (new): gift boxes made of bricks drift in the page background
   while you scroll (6 on desktop, 4 on phone), kept at the page edges behind the content. The script draws the
   boxes itself, so there are no image files. People whose phone asks for reduced motion get still boxes.
2. `layout/theme.liquid`: loads that script on the homepage only (`template.name == 'index'`).
3. `sections/memobrick-site.liquid`:
   - promo bar: "**Order by December 15** to have it before Christmas · Save 20% with code **EARLYHOLIDAY20**"
     (was "Order early & save 20% with code EARLYHOLIDAY20 at checkout.")
   - new hero link under "Not sure yet? Get a free design proof first →":
     "Giving it as a gift? Give a Gift Kit, they pick the photo →" to /products/unlimited-memobrick

Nothing else changes. "As seen on Fox News" is still on the page (not part of this change).

`live/` holds the files as they were in the live theme, `new/` the files uploaded to the copy.

## Checks (2026-10-25)

Checksums in the theme copy match `new/`:

| file | md5 |
|---|---|
| sections/memobrick-site.liquid | 5f3150ad0a55c0e3afe884178c296dd0 |
| layout/theme.liquid | 733c51e69cdef2ef8de89315117ddf87 |
| assets/memobrick-holiday-gift-boxes.js | 8660bcaf996e42706f985b9b19a17ee6 |

Preview, tested headless: desktop 1440 shows 6 boxes, phone 390 shows 4, the new promo text shows, and the gift
link opens /products/unlimited-memobrick. No script errors from the new code.

## To go live

Eden publishes the copy in Shopify (Online Store → Themes → "Memobrick holiday gift boxes" → Publish).
To undo, publish "Memobrick gift kit flow" again.
