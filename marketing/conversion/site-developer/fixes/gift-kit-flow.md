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

## Review 2026-10-25 (coordinator session, owner asked "check for errors, make sure it is only the gift kit")
- Scope: product page changes apply only to the Art Gift Kit (product id 8607545032924 / handle unlimited-memobrick). Other product pages render as before (20x20 kit checked). Gift mode on the editor runs only with ?gift= in the link; the editor without it is unchanged. Home page unchanged.
- Live theme "Memobrick kit page fix" is unchanged since the copy was made (md5 of theme.liquid, product.liquid, memobrick-site.liquid, page.editor.liquid match the base), so publishing the copy loses nothing.
- Fixed: the steps said the link comes "in your order confirmation". Nobody added it to Shopify's order confirmation email, so the wording now says "We email you a personalisation link, one for each kit" (copy product.liquid md5 6f43996672710311912da77b34be4b36). Links are sent by the store by hand unless the owner adds them to Settings > Notifications > Order confirmation.
- Page errors seen in the sandbox are only blocked third party scripts (Shopify shop-js, TikTok pixel), the same on every page and on the live theme.
- Not changed, noted: product page press logo alt text says "Fox News" (all product pages, live too); brand rule says "As seen on FOX".

## All sizes (2026-10-25, A-2026W43-009)
- Shopify product 8607545032924 now has 20 sizes, build at home only, priced like the regular build-at-home kits: 10x10 $35, 16x16 $69.88, 20x20 $99.88 (was $99), 20x30 / 30x20 $149, 20x40 $189.88, 40x20 $189.99, 30x30 $209.99, 20x50 / 50x20 $234.99, 30x40 $279, 40x30 $278, 30x50 / 50x30 $334.99, 40x40 $348, 60x30 $414, 40x50 $431.98, 50x50 $530, 50x60 $698, 60x60 $853. New sizes do not track inventory. 20x20 stays first so the live page (no size picker yet) still sells 20x20.
- Theme copy: "Kit size" picker on the gift kit page (opens on 20x20, price updates), quantity box kept. Gift script: each gift link carries its kit size (&size=), combined kits add up their own sizes' prices, and the email to the store lists each kit's size with a check line.
- Copy md5: product.liquid a87bf50f20c4e21363b1ebc297cf44f1, memobrick-gift-redeem.js 6ad90f317f8c13245694c9ed81d43743.
- Preview test (phone): 20 sizes listed, 30x30 shows $209.99, 2 x 30x30 added to cart at $209.99 each, gift link with size=30x30 opens the editor on 30x30 with only 30x30 shown. No page errors from our code.
- Link to send each buyer: https://mymemobrick.com/pages/editor?gift=%23ORDER&email=BUYER_EMAIL&size=SIZE (SIZE from the order line, e.g. 30x30). One link per kit.

## Automatic gift link email (2026-10-25)
- Before this, no email sent gift links automatically (product description promised one; nobody had set it up).
- Ready to paste: marketing/conversion/site-developer/notifications/order-confirmation-gift-kit-block.liquid. Eden pastes it in Settings > Notifications > Order confirmation > Edit code (agents do not edit order emails). It only renders when the order has the Art Gift Kit; one button per kit with the order number (-1, -2 for several kits), buyer email and the kit size. Rendered with sample data: 2 x 30x30 gives two links #ORDER-1/-2 size=30x30; non-gift orders render nothing.
- Order: publish the theme copy first (gift mode lives there), then paste the email block, then place one real test order of the gift kit.

## Live (2026-10-25)
- Eden published "Memobrick gift kit flow" (188683092188); it is the MAIN theme, file checksums match the tested copy.
- Live check (phone): gift kit page lists 20 sizes, 30x30 shows $209.99, 2 x 30x30 into the cart at $209.99; gift link size=30x30 opens gift mode on 30x30 only; the normal editor has no banner and all 20 sizes.
- Undo theme: "Memobrick kit page fix" (188955361500).
- Still to do by Eden: paste notifications/order-confirmation-gift-kit-block.liquid into the order confirmation email, then one real test order.
