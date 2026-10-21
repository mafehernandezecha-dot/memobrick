# Product pages lost the editor buttons: fix the creator check (URGENT)

Proposed by: conversion-auditor (Wilson), 2026-10-21. Executor: site-developer. Type: site-change.

## What is broken (seen live today)

On every custom photo kit page (example https://mymemobrick.com/products/2-2-boards) the two buttons "Design your own MemoBrick" and "Upload your photo & checkout" are gone. The page now shows one red button, "Buy now - $99.88", that posts the kit to the cart with no photo and no design and sends the visitor straight to checkout (POST /cart/add, then GET /checkout, with `return_to=/checkout`). The sticky bar button "Buy now" does the same. Verified at 390 px and 1440 px. Screenshots: `marketing/conversion/auditor/2026-10-21/phone-20x20-02-product-full.jpg`, `phone-20x20-03-product-cta-to-editor.jpg`.

On 2026-10-14 the same page still had the editor link (the walk's selector `a[href*="/pages/editor"][href*="#editor"]` worked). It stopped working after seo-technical renamed the products on 2026-10-20 (A-2026W42-043).

## Cause

`templates/product.liquid`, line 67 of the theme in this repo:

```liquid
{% if product.title contains "Custom Bricked Mosaic" or product.title contains "Custom Brick Portrait" %}{% assign is_creator_product = true %}{% endif %}
```

The new titles start with "Custom Photo Brick Mosaic Portrait ..." and contain neither phrase, so `is_creator_product` is false and the page falls into the plain "Buy now" branch (lines 157 to 161). That affects the 22 custom photo kits (10x10 up to 60x60), including the best sellers 16x16, 20x20 and 20x30. Confirmed titles on live: 2-2-boards, 2-3-boards, 3-3-boards, custom-bricked-mosaic-10x10.

## Why it costs orders

- Visitors who land on a kit page (most Google and gift-collection traffic) can no longer reach the editor from the page's main button. The only other route is the menu.
- A visitor who taps "Buy now" pays for a kit with no photo. The order arrives with no Final Design, so the team must chase the customer, which is a support and delay risk. Checkout sessions on 2026-10-20 were 16 of 22 carts but only 1 purchase (small numbers, but worth watching).

## Before and after

Before (line 67):
```liquid
{% if product.title contains "Custom Bricked Mosaic" or product.title contains "Custom Brick Portrait" %}{% assign is_creator_product = true %}{% endif %}
```

After (stops depending on the wording of the title; the handle case at the top of the file already sets `size_id` for exactly the creator kits):
```liquid
{% if size_id != "" or product.title contains "Custom Photo Brick Mosaic" or product.title contains "Custom Bricked Mosaic" or product.title contains "Custom Brick Portrait" %}{% assign is_creator_product = true %}{% endif %}
```

Site-developer must check first that the handle `case` at lines 15 to 62 only lists custom photo kit handles, and not Artist Collection designs or frames (if any handle there is a ready-made design, use the title test only). Add `custom-photo-brick-mosaic` as the permanent rule so future title edits cannot break it, and tell seo-technical that titles on these products must keep "Custom Photo Brick Mosaic" in them.

## Test (phone and desktop)

1. https://mymemobrick.com/products/2-2-boards?preview_theme_id=<copy>: two buttons visible ("Design your own MemoBrick" to `/pages/editor?size=20x20#editor`, "Upload your photo & checkout" to `#design`), no "Buy now" form, the sticky bar button goes to the editor.
2. Same for 1-big-board, 2-3-boards, 3-3-boards and custom-bricked-mosaic-10x10.
3. A frame page and an Artist Collection page still show "Buy now" (they should).
4. Editor to cart to checkout page still works. Stop at checkout.

## Success check

Daily from the Shopify funnel, landing pages `/products/*kit*`: share of kit-page sessions that reach `/pages/editor`, and add to cart per kit-page session. Watch for 7 days.

## Fallback if the theme write cannot be done today

Owner step: seo-technical's backup `marketing/seo/technical/backups/2026-10-20-product-listings/restore.py` can restore the old titles for only the 22 custom kits (this loses the new search titles, so use it only if the theme fix is more than a day away).
