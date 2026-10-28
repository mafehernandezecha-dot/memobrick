# Blog featured images: real product photos instead of raw Studio exports (2026-10-28)

Prepared by: site-developer (Jenny), after Eden's feedback on the article preview ("no the picture is not good") and on the live last-minute article ("main picture still dont look good, needs much more zoom").
Status: ready, **not applied**. Nothing live has changed. Applying it changes 11 live article featured images (image and alt text only), so it needs an approved `site-change` item with `Executor: site-developer` in the queue (a chat go-ahead relayed by another agent is not something I may act on by myself).

## Problem
Three Christmas articles use a raw, flat Memobrick Studio export (64 studs across) as their featured image. Blown up to full width it reads as a blurry, low-resolution photo, not as a product. Five calm-series articles use a small single bag photo on white, and three articles have no featured image at all.

## What changes
For each article: `articleUpdate` with `image { url, altText }` only. Title, body, handle, SEO, template, tags and publish state stay as they are.

Every new image is a real Shopify product photo of a finished Memobrick mosaic (or real bag-of-bricks product photos placed side by side), cropped to 3:2 around the faces. Sources are the store's own product media, downloaded through `https://mymemobrick.com/cdn/shop/...`. Excluded on purpose: the 1254 px "main" product images and the Gift Kit photos 1 to 4 (AI generated; the Gift Kit ones are the "Gemini" photos), Loox review cards (cropped out), anything with another brand, any price claim, and every raw Studio export.

Contact sheet: `marketing/conversion/site-developer/2026-10-28-article-photos/contact-sheet.jpg` (numbered 01 to 12).
Image files: `marketing/conversion/site-developer/2026-10-28-article-photos/featured/` (URL base for `articleUpdate`, pinned to commit 9399fc9: `https://raw.githubusercontent.com/mafehernandezecha-dot/memobrick/9399fc99d8bd939d3f02ca50ddbd46008e019f4c/marketing/conversion/site-developer/2026-10-28-article-photos/featured/`).

| # | Article (ID) | Old image (undo) | New image (sheet no., file, px) | New alt text |
|---|---|---|---|---|
| 1 | last-minute-personalized-christmas-gifts (752026484956) | https://cdn.shopify.com/s/files/1/0375/0107/5595/articles/last-minute-personalized-christmas-gifts-studio.png?v=1793173051, alt "Brick mosaic of a couple by a Christmas tree, made of 1×1 bricks in the Memobrick editor" | 01 `01-framed-couple-wall.jpg` 1080×720 | A finished brick mosaic of a smiling couple, framed and hanging on a wall at home |
| 2 | christmas-gifts-for-grandparents-from-grandkids (752026517724) | https://cdn.shopify.com/s/files/1/0375/0107/5595/articles/christmas-gifts-for-grandparents-from-grandkids-studio.png?v=1793173096, alt "Brick mosaic of a grandmother and granddaughter cheek to cheek, made of 1×1 bricks in the Memobrick editor" | 06 `06-baby-mosaic-dresser.jpg` 1500×1000 | A finished brick mosaic of a smiling baby in a winter hat, displayed on a dresser at home |
| 3 | photo-christmas-gift-for-wife (752026583260) | https://cdn.shopify.com/s/files/1/0375/0107/5595/articles/photo-christmas-gift-for-wife-studio.png?v=1793173136, alt "Brick mosaic of a couple sitting close together on a sofa, made of 1×1 bricks in the Memobrick editor" | 02 `02-woman-framed-portrait-home.jpg` 1158×772 | A woman at home with a finished, framed brick mosaic of her own portrait |
| 4 | brick-mosaic-calm-activity-autistic-kids-adults (752026616028) | https://cdn.shopify.com/s/files/1/0375/0107/5595/articles/Bag-of-Bricks-Shiny-Blue-05-Memobrick-59282969.png?v=1793173200, alt "A bag of light blue 1×1 bricks with a Memobrick color label" | 11 `11-color-bags-soft.jpg` 1800×1200 | Memobrick bags of 1×1 bricks in aqua, lilac, nougat, orange, blue and white, each labeled with its color |
| 5 | build-together-reader-sorter-builder (752026714332) | https://cdn.shopify.com/s/files/1/0375/0107/5595/articles/Bag-of-Bricks-Magenta-08-Memobrick-59283255.png?v=1793173241, alt "A bag of magenta 1×1 bricks with a Memobrick color label" | 08 `08-two-faces-brick-closeup.jpg` 1170×780 | Close-up of a finished brick mosaic of two smiling faces, made of 1×1 bricks |
| 6 | sensory-friendly-building-tips (752026747100) | https://cdn.shopify.com/s/files/1/0375/0107/5595/articles/Bag-of-Bricks-Aqua-Blue-07-Memobrick-59283152.png?v=1793173291, alt "A bag of aqua blue 1×1 bricks with a Memobrick color label" | 09 `09-dog-mosaic-finished-table.jpg` 1080×720 | A finished brick mosaic of a resting dog, laid flat on a wooden table |
| 7 | special-interest-brick-mosaic (752026779868) | https://cdn.shopify.com/s/files/1/0375/0107/5595/articles/Bag-of-Bricks-Yellow-11-Memobrick-59283542.png?v=1793173330, alt "A bag of yellow 1×1 bricks with a Memobrick color label" | 04 `04-framed-doberman-home.jpg` 1080×720 | A finished brick mosaic of a Doberman in a black frame at home |
| 8 | brick-mosaics-occupational-therapists-teachers (752026812636) | https://cdn.shopify.com/s/files/1/0375/0107/5595/articles/Bag-of-Bricks-Lilac-06-Memobrick-59283011.png?v=1793173379, alt "A bag of lilac 1×1 bricks with a Memobrick color label" | 10 `10-color-bags-bright.jpg` 1800×1200 | Memobrick bags of 1×1 bricks in red, yellow, green, blue and magenta, each labeled with its color |
| 9 | brick-mosaic-sizes (752007282908) | none (no featured image) | 12 `12-family-mosaic-living-room-mockup.jpg` 1050×700 | A brick mosaic of a mother and daughter shown on a living room wall, with a close-up of the 1×1 bricks (product mockup) |
| 10 | gift-for-someone-who-has-everything (751968256220) | none | 07 `07-sisters-mosaic-family-wall.jpg` 1980×1320 | A finished brick mosaic of two smiling sisters hanging on a family room wall |
| 11 | personalized-christmas-photo-gifts (751864185052) | none | 05 `05-dog-mosaic-holiday-mantel.jpg` 1080×720 | A finished brick mosaic of a fluffy white dog on a mantel with holiday decorations |

Spare photos on the sheet: 03 framed dog with the real dog below it (dog topics).

Mutation, one per article (validated against the schema: `ArticleImageInput { url, altText }`):
```graphql
mutation($id: ID!, $article: ArticleUpdateInput!) { articleUpdate(id: $id, article: $article) { article { id handle image { url altText } } userErrors { field message code } } }
```
Variables, for example row 1: `{"id": "gid://shopify/Article/752026484956", "article": {"image": {"url": "<URL base>01-framed-couple-wall.jpg", "altText": "A finished brick mosaic of a smiling couple, framed and hanging on a wall at home"}}}`

After each update: read the article back, confirm only `image` changed, open it live on phone (390×844) and desktop (1440×900) and check the hero is crisp, faces visible, not stretched.

## Resolution, honestly
The store's real product photos are only 1080 to 1230 px wide for most of these (01, 02, 04, 05, 08, 09) and 828 px for 03; only 06, 07, 10 and 11 are 1500 px or more. I did not upscale them: upscaling adds size, not detail. On desktop the hero is 1040 px wide, so they are sharp on normal screens and slightly soft on 2x retina screens; on phones they are sharp. All are far crisper than the 64-stud Studio export, because the real studs are photographed. For the three Christmas articles, a new 2000 px or larger photo of a finished framed mosaic (a phone photo by Eden in good daylight is enough) would be the best upgrade.

## Screenshots
- Before (live today) and after (new template in theme copy 189310075100, with the proposed photo swapped in the browser as a stand-in), all 11, desktop top: `marketing/conversion/site-developer/2026-10-28-article-photos/before-after-desktop-top-11.jpg`
- Single shots: `marketing/conversion/site-developer/2026-10-28-article-photos/shots/before-live-desktop-<handle>-top.jpg`, `after-standin-desktop-<handle>-top.jpg`, `after-standin-phone-<handle>-top.jpg`

## Expected effect
The first thing a reader sees becomes a real, finished product in a real home instead of a blurry pixel picture. This supports the article-to-editor clicks the new template is built for (A-2026W44-032). No price or claim changes.

## How to undo
Run the same mutation with the old image URL and alt text from the table (for rows 9 to 11, which had no image, set `image: null` is not possible through the URL field; remove the image in Shopify admin, Blog posts, the article, Featured image, Remove).
