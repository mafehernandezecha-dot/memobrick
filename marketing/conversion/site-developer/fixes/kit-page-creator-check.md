# Kit pages: bring back "Design your own MemoBrick" (URGENT), 2026-10-21

Built and tested by: site-developer (Jenny). Source: Wilson's audit of 2026-10-21 (`marketing/conversion/auditor/site-changes/product-page-creator-check-title.md`).
Status: **ready in a theme copy, waiting for Eden to publish.** The connector refuses writes to the live theme, so nothing live has changed.

## Problem

Since the Oct 20 product title rewrite (A-2026W42-043), all custom photo kit pages (10x10 to 60x60) show one red "Buy now" button that sends a kit with no photo straight to checkout. The "Design your own MemoBrick" and "Order with Pro Design" buttons and the sticky "Design this in the creator" bar are gone. Cause: `templates/product.liquid` decides "is this a kit" by looking for the old words "Custom Bricked Mosaic" in the product title, and the new titles say "Custom Photo Brick Mosaic Portrait".

## Preview and how Eden publishes it

- Theme copy: **"Memobrick kit page fix"**, id 188955361500 (unpublished; this is the old "Memobrick cart rollback" copy, renamed and reset to match live). Preview: https://mymemobrick.com/products/2-2-boards?preview_theme_id=188955361500
- Publish (about 1 minute): Shopify admin > Online Store > Themes > **"Memobrick kit page fix"** > ... > Publish > confirm.
- Undo: Themes > **"Memobrick cart no shipping box"** (the current live theme, id 188955623644) > ... > Publish. Keep that theme until the fix has been watched.
- Before publishing, if anyone has edited the live theme, tell me so I rebuild the copy.

## Files changed (one)

| File | Live md5 | Copy md5 |
|---|---|---|
| `templates/product.liquid` | aaaad07d16b9e81e1dce5b60f65879fe | 54578873af06ce0965e57ba29b8cd85f |

Every other file in the copy matches live (checked: cart.liquid 13f6c57b..., memobrick.js 88f83c4a..., memobrick-email-gate.js 851b9041..., layout/theme.liquid 4ccf2bba...). Live file saved before: `backups/2026-10-21-kit-page-creator-check/templates/product.liquid`. New file and diff: `theme-files/kit-page-creator-check-2026-10-21/`.

Before and after code (full diff in `product.liquid.diff`):

```liquid
{# line 67, before #}
{% if product.title contains "Custom Bricked Mosaic" or product.title contains "Custom Brick Portrait" %}{% assign is_creator_product = true %}{% endif %}
{# line 67, after: the size lookup by product handle (already in the file) now also marks a kit #}
{% if size_id != "" or product.title contains "Custom Photo Brick Mosaic" or product.title contains "Custom Bricked Mosaic" or product.title contains "Custom Brick Portrait" %}{% assign is_creator_product = true %}{% endif %}
```

The title-based sizes (60x20 and 70x60, used when a product has a new handle) had the same old-title test, so line 59 got the same fix, written as a small flag because Liquid does not allow brackets in conditions:

```liquid
{# before #}
{% if size_id == "" and product.title contains "Custom Bricked Mosaic" %}
{# after #}
{% assign title_kit = false %}{% if product.title contains "Custom Bricked Mosaic" or product.title contains "Custom Photo Brick Mosaic" %}{% assign title_kit = true %}{% endif %}
{% if size_id == "" and title_kit %}
```

I checked that the handle list in the file holds only custom photo kit handles (no frames, no ready-made art kits).

## Test results (2026-10-21, phone 390x844 and desktop 1440x900)

Script `tools/kit-page-test.mjs`; raw results `2026-10-21-kit-page-creator-check/test-before.json` (live) and `test-after.json` (copy).

| Page | Live (before) | Copy (after) |
|---|---|---|
| 20x20, 16x16, 20x30, 30x30, 10x10, 50x50, 60x60 kits | one "Buy now" form, sticky bar "Buy now" | "Design your own MemoBrick" to `/pages/editor?size=<that size>#editor`, "Order with Pro Design" to `#design`, no Buy now form, sticky bar "Design this in the creator" |
| Frame (frame-2-2), ready-made art kit (donuts-20x20), brick bag | "Buy now" | unchanged "Buy now" |
| Tap the main button on the 20x20 page | n/a (no button) | opens the editor at 20x20 with the photo upload ready, phone and desktop |
| Sideways scroll | none | none |

The page JavaScript errors listed are the same on live and copy (blocked Shopify/TikTok scripts in the sandbox). In this sandbox the Shopify cookie banner sits over the phone button at about 390 px down and intercepts clicks, so the phone tap was tested with the banner removed; it appears on the live page too.
Not run: add to cart and checkout (the editor, cart and drawer files are identical to live, and the earlier real editor to checkout test on 2026-10-20 covers them).

Screenshots in `marketing/conversion/site-developer/2026-10-21-kit-page-creator-check/`: `before-phone-2-2-boards.jpg`, `after-phone-2-2-boards.jpg`, `before-desktop-2-2-boards.jpg`, `after-desktop-2-2-boards.jpg`, `before-phone-sticky.jpg`, `after-phone-sticky.jpg`, and `*-frame-2-2.jpg` for the unchanged frame page.

## Expected effect

Kit page visitors (Google and gift-collection traffic) can start the editor again, and nobody can pay for a kit with no photo from the page. Wilson's estimate: 5 to 15 orders a month; the fix also stops photo-less orders reaching the team.

## Watch plan (7 days after publishing)

Add to cart per kit-page session and share of kit-page sessions that reach `/pages/editor` (referred sessions only). Compare with Oct 14 to 19.

## Owner steps outside the theme

- Tell seo-technical that kit titles must keep "Custom Photo Brick Mosaic" in them (the fix no longer depends on it for the 22 kits, but it keeps the 60x20 and 70x60 sizes safe).
- Check recent kit orders from Oct 20 and 21 for any with no design attached and ask those customers for a photo. I did not read orders.
- If publishing is more than a day away, Wilson's fallback is seo-technical's `marketing/seo/technical/backups/2026-10-20-product-listings/restore.py` (restores old titles on the 22 kits, loses the new search titles).
