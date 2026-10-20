# Site change: Artist Collection and long-tail listings (SEO and feed)

Agent: seo-technical. Drafted 2026-10-20. Nothing applied yet.

## What changes

Rows in `marketing/seo/technical/product-listings-2026-10-20.csv` with `priority` `P2-art` or `P2-rule`, for products that are live (status ACTIVE) or published collections:

- 110 live Artist Collection designs: title, description, SEO title, meta description, product type, category, main image alt text and tags, each written from what the design's main image shows (see `image_description_basis`). Removes the unconfirmed "1-2 business days to be shipped" and "we also can build it for you".
- 40 brick bags, the storage case, the 7 remaining frames, the Artist Collection page and the alphabet tiles: titles, types, categories, tags, alt text and meta as listed.

Rows for draft products (7 designs) are applied only if that product is published later. Rows `P2-art-IP` and `P2-art-unclear` are NOT applied: they wait for Eden's decision.

The rules behind the rows are in the "Rules for the long tail" section of `marketing/seo/technical/product-listings-2026-10-20.md`.

## Not changed

Handles, prices, variants, inventory, images, product status, theme, order workflow. Smart-collection tags are never removed.

## How the executor applies it (after approval only)

1. Back up every affected field to `marketing/seo/technical/backups/product-listings-2026-10-20-long-tail.json` and commit it first.
2. Skip any field whose live value no longer matches the CSV `current` value; list skips in the report.
3. Apply in batches of 25 products with the same mutations as the priority change; confirm each batch by re-reading.
4. For the brick bags, drop "1x1" from the new titles unless Eden has confirmed the bags hold 1x1 bricks; remove "Resealable bag" and "precision-moulded fit" from their metas unless Eden confirms them.
5. On 2026-12-16, remove the Christmas order-by paragraph added by this change.

## Rollback

Restore from the backup file.
