# Site change: priority product and collection listings (SEO and feed)

Agent: seo-technical. Drafted 2026-10-20 at Eden's request. Nothing applied yet.

## What changes

Every row in `marketing/seo/technical/product-listings-2026-10-20.csv` whose `priority` is `P1-product`, `P1-frame` or `P1-collection` (327 rows):

- 22 custom photo kit sizes (Custom Bricks Portrait collection): title, description, SEO title, meta description, product type, Shopify category (Mosaic Kits), Meta catalog category, tags added and removed, image alt text.
- 4 best-selling frames (20x30/30x20, 20x20, 30x30, 16x16): the same fields.
- 4 collections (the-gift-for-everyone, best-sellers, photo-frames, bricks): title, description, SEO title, meta description, image alt, and two tag fixes that take wrong products out of a collection.

The reasons and before/after tables are in `marketing/seo/technical/product-listings-2026-10-20.md`.

## Not changed

Handles and URLs, prices, variants and options, inventory, images themselves, `condition`, age group, the theme, anything in the order workflow. Smart-collection tags `Custom Bricks Portrait`, `FRAME`, `art collection`, `pre-made design` and `accesories` are never removed.

## How the executor applies it (after approval only)

1. Read the live value of every field listed for these products and collections with read-only GraphQL and save it to `marketing/seo/technical/backups/product-listings-2026-10-20-priority.json` (full description HTML, tags, SEO fields, alt text per media ID, category, metafields). Commit the backup before any write.
2. If a live value no longer matches the CSV `current` value (the CSV shows an em dash as `[em-dash]`), skip that field and list it in the run report.
3. Apply with the Shopify product and collection update mutations: `productUpdate` (title, descriptionHtml, productType, category, seo), `tagsAdd` / `tagsRemove`, `productUpdateMedia` (alt), `metafieldsSet` (`mc-facebook.google_product_category`, only after confirming the ID in Google's taxonomy list; skip if it cannot be confirmed), `collectionUpdate`.
4. Leave out any number the CSV note says Eden must confirm (60x20 plates and pieces, 60x30 and 60x60 plates) until Eden confirms it.
5. Re-read each product, check the storefront page for one kit, one frame and one collection, and record product IDs and results in the run report.
6. On 2026-12-16, remove the "Order by December 15, 2026" paragraph from every description this change added it to (one bulk edit, same backup rule).

## Rollback

Restore every field from the backup file with the same mutations.
