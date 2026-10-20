# Restore note: product listings, 2026-10-20

Backed up by seo-technical on 2026-10-20, before any write for approved items A-2026W42-043 (priority) and A-2026W42-044 (long tail).

## What is here

- `products/<handle>.json`: one file per product that the change could touch (185 products). Each holds the live values read with read-only Admin GraphQL just before the change: `title`, `descriptionHtml`, `productType`, `tags`, `seo.title`, `seo.description`, `category`, the `mc-facebook.google_product_category` metafield (not changed by this run) and the alt text of every media item (`media_alt`, by MediaImage ID).
- `collections/<handle>.json`: one file per collection (5): `title`, `descriptionHtml`, `seo`, `image` (ID, alt, URL), `ruleSet` and the product IDs that were members.
- `restore.py`: prints the exact Admin GraphQL mutations and variables that put the saved values back.

Handles, prices, variants, inventory, images, publishing status and the theme were not changed, so they are not in the backup.

## How to restore

One product: `python3 marketing/seo/technical/backups/2026-10-20-product-listings/restore.py product <handle>`

One collection: `python3 marketing/seo/technical/backups/2026-10-20-product-listings/restore.py collection <handle>`

Everything: `python3 marketing/seo/technical/backups/2026-10-20-product-listings/restore.py all > restore-all.jsonl`

Each printed line is a JSON object `{"query": ..., "variables": ...}`. Run each one with the Shopify `graphql_mutation` tool (or in the Shopify GraphiQL app):

- `productUpdate` restores title, description, product type, tags, SEO title and meta, and category.
- `fileUpdate` restores the alt text of each image.
- `collectionUpdate` restores the collection title, description, SEO fields and image alt.

Note on tags: restoring writes the full saved tag list, which also removes any tag added after 2026-10-20. Note on SEO: a saved `null` SEO title is restored as an empty string, which Shopify treats the same way (falls back to the product or collection title).
