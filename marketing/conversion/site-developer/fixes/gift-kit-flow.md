# Art Gift Kit personalisation flow (gift links open the Creator in gift mode), 2026-10-23

Built and tested by: site-developer (Jenny). Status: ready in theme copy "Memobrick gift kit flow", id 188683092188 (unpublished). Eden publishes it (Online Store > Themes > ... > Publish). Connector writes to the live theme are refused, so nothing live has changed.

## Problem
The Art Gift Kit is bought with no photo. The buyer (or the person they forward the link to) needs a way to choose a photo and design the mosaic without paying again or seeing the email pop-up. Before this change the kit page had no explanation and the personalisation link had no gift mode.

## What it does
- Gift kit product page: quantity box, "Buy now, no photo needed", and a "What happens after you buy" steps block.
- Links of the form /pages/editor?gift=... open the Creator in gift mode: banner "Personalising gift kit #...", no prices, sizes marked "Included", "I have another gift link" to combine kits into a bigger size, button "Submit my design", then a ship-to form that goes to the store through the contact form (nothing to pay, no checkout). The email "save your design" pop-up is off in gift mode.
- A used link shows a "used" notice on reload. Normal (non-gift) editor sessions are unchanged (tested: still reach the cart drawer).
- Every page without ?gift= behaves as before.

## Files (base = current live theme "Memobrick kit page fix" 188955361500)
| File | Live md5 | Copy md5 |
|---|---|---|
| templates/product.liquid | 54578873af06ce0965e57ba29b8cd85f | e75546db823f16c95f923925a9432be5 |
| layout/theme.liquid | 4ccf2bba927bdc57e68dbef9138fec89 | 18b1a6233fd1ccaf0844b539eb3020f6 |
| assets/memobrick-gift-redeem.js (new) | none | 2e616f05fcd229a60f30f838fe9960dd |

All other files match live (sections/memobrick-site.liquid d641ed44..., index, collection checked). Repo copies: theme-files/gift-kit-flow-2026-10-22/new/ and live/ (before). Diff of theme.liquid: adds the gift-mode config and script only on the editor page, plus the email-gate off switch when the URL has ?gift=.

## Preview and tests
- Preview: https://mymemobrick.com/?preview_theme_id=188683092188
- 2026-10-23 retest, phone 390x844: all 14 steps pass, no page errors (product, 2 kits to cart, gift link, generated photo, no email gate, second link, size pick, details form, send intercepted, used link, normal editor to cart drawer). Screenshots and results: 2026-10-23-gift-kit-flow-retest/. The contact POST was intercepted, so no email was sent.
- Desktop: the 2026-10-22 run passed every step (2026-10-22-gift-kit-flow/final/). Today's desktop rerun hit the sandbox bot challenge after the phone run (steps from the send onward failed and a page returned HTML instead of JSON); a repeat run was blocked by the permission check, so desktop was not re-confirmed today.
- Not tested: one real submission. Eden or I can send one test through the real form after publishing.

## Expected effect
Removes the dead end after a gift kit purchase, so gift kits get personalised and shipped; this protects gift kit orders and reviews rather than adding new add-to-carts. Gift season is near, so it should be live before the holiday push.

## Owner checks
- The ship-to form emails the store (shop email). Someone must read it and verify the order number and buyer email in Shopify admin before production (the email says so).
- kitCredit/kitSize in the config assume a 20x20 kit (credit 99). Confirm that matches the kit.

## Undo
Publish "Memobrick kit page fix" (188955361500) again. Nothing else changes.
