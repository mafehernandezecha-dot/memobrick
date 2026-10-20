# Cart page without the shipping box (A-2026W42-046), 2026-10-20

Built and tested by: site-developer (Jenny). Approved by Eden in chat on 2026-10-20 ("remove the shipping box"). Replaces the full rollback (A-2026W42-045); its copy "Memobrick cart rollback" (188955361500) is NOT to be published.
Status: **ready in a theme copy, waiting for Eden to publish.** The connector refuses writes to the live theme, so nothing on the live site has changed.

## Preview and how Eden publishes it

- Theme copy: **"Memobrick cart no shipping box"**, id 188955623644 (unpublished), duplicated today from the live theme "Memobrick calm home" (188697510108). Only `templates/cart.liquid` differs.
- Preview: https://mymemobrick.com/?preview_theme_id=188955623644 (cart: https://mymemobrick.com/cart?preview_theme_id=188955623644 after adding a design)

Publish (about 1 minute): Shopify admin > Online Store > Themes > find **"Memobrick cart no shipping box"** > **...** > **Publish** > confirm.
Do not publish "Memobrick cart rollback".

Undo: Shopify admin > Online Store > Themes > **"Memobrick calm home"** > ... > Publish. That brings back today's live cart exactly. The file is also in `backups/2026-10-20-cart-rollback/templates/cart.liquid`.

If anyone edits the live theme before publishing, tell me first so I can rebuild the copy.

## What changes

| File | Live (md5) | Copy (md5) |
|---|---|---|
| `templates/cart.liquid` | 498326618234d9f98c771afe82477a15 (10,490 bytes) | 13f6c57bb371bb521b378e0bb574c50a (3,597 bytes) |
| `assets/memobrick.js` (drawer) | 88f83c4a454dcf58bc1d9c1118777f77 | unchanged, 88f83c4a454dcf58bc1d9c1118777f77 |

Diff: `theme-files/cart-no-shipping-box-2026-10-20/cart.liquid.diff`. New file: `theme-files/cart-no-shipping-box-2026-10-20/templates/cart.liquid` (commit 08774d8). Removed only:
- the three `mb_free_at` / `mb_is_us` lines at the top (only used by the box),
- the `#mbShip` box: "Free US shipping on orders $125 and up.", "Add $X more to get free shipping.", "Your order qualifies for free US shipping.", the State menu, the ZIP field, "Get rates" and the rates list (and "Shipping is calculated at checkout." for non-US visitors),
- the "Order by December 15 to receive it before Christmas." block,
- the estimator script.
The only added line is "Taxes are calculated at checkout." with a 12 px top margin instead of 6 px, so it does not sit tight under the buttons.

Kept: the customer's mosaic picture, the hidden internal fields, "Build-at-home kit", "Taxes are calculated at checkout.", the Checkout and Update buttons as they are. Every other live fix is untouched (memobrick.js, memobrick-email-gate.js 851b9041..., memobrick-site.liquid d641ed44..., layout/theme.liquid 4ccf2bba... have the same checksums as live).

**Cart drawer:** none of the three removed items appear in the drawer. The drawer has its own older "Add $X more for free shipping" progress bar. It was already live before Oct 14 (during the 82% baseline) and is not part of 021, so it was kept. Say if you want it removed too; that is a separate memobrick.js edit.

## Test results (2026-10-20)

Real editor flow, no TEST design ID: a generated flower picture (not a photo of a person) uploaded in the real editor, "Design it myself", pop-up skipped, "Finish Editing", which added a real design (Design IDs MB-20261020-9ZTPBDRM phone, MB-20261020-2HYLUXD6 desktop; 20x20 build-at-home kit $99.88) with its real Final Design file. Then Checkout from the drawer and from the cart page, stopping at the Contact step. No email, address or payment; the test carts were cleared. Phone 390x844 (Android Chrome user agent) and desktop 1440x900. Script: `tools/editor-cart-checkout-test.mjs`.

| Check | Live (before) | Copy (after) |
|---|---|---|
| Editor adds a real design to the cart | yes, phone and desktop | yes, phone and desktop |
| Drawer: mosaic picture loads, "Build-at-home kit" | yes | yes |
| Drawer Checkout reaches checkout Contact step | yes, phone 8.0 s, desktop 7.5 s | yes, phone 5.9 s, desktop 7.1 s |
| Cart page: mosaic picture loads | yes | yes |
| Cart page: fields shown | "MemoBrick Size" only | "MemoBrick Size" only (Design ID, Brick grid, Build service, Orientation, Final Design stay hidden) |
| Cart page: "Build-at-home kit" | yes | yes |
| Under Checkout | shipping box with State/ZIP/"Get rates", December 15 line, taxes line | only "Taxes are calculated at checkout." |
| Checkout button | top 456 px phone, 361 px desktop, in first screen | same |
| Cart page Checkout reaches checkout Contact step | yes, phone 8.0 s, desktop 7.8 s | yes, phone 7.0 s, desktop 7.0 s |
| Theme JavaScript errors | none | none |
| Sideways scroll on phone | none | none |

Test limits: Checkout redirects to Shop Pay on shop.app, which this sandbox blocks, so the same checkout token was opened on the store checkout with `skip_shop_pay=true`. The sandbox blocks cdn.shopify.com, so the test browser loaded the same uploaded design files through the store's own `/cdn/shop/` address. The Final Design file the editor made is saved as `2026-10-20-cart-no-shipping-box/real-design-final-design-file.png` (640x640 brick mosaic). iPhone Safari and in-app browsers were not tested.

Screenshots in `marketing/conversion/site-developer/2026-10-20-cart-no-shipping-box/`:
- Phone, area under Checkout: `before-phone-cart.jpg` (live) and `after-phone-cart.jpg` (copy)
- Also `*-phone-drawer.jpg`, `*-desktop-cart.jpg`, `*-desktop-drawer.jpg`, and `*-cart-checkout.jpg` / `*-drawer-checkout.jpg` (Contact step) for both versions.

## Watch plan (7 days after Eden publishes)

Daily, referred sessions (direct traffic includes bots):
`FROM sessions SHOW sessions_with_cart_additions, sessions_that_reached_checkout, sessions_that_completed_checkout WHERE referrer_source != 'direct' GROUP BY session_device_type SINCE <publish date> UNTIL today`
plus the same without the filter. Targets: phone 65% or more (was 71% Oct 1-13, 44% Oct 14-19), store-wide back toward 82%, checkout completion about 35%.
- Phone back to 65% or more: the shipping box was the cause; any future shipping message goes in as an A/B test.
- Phone still under 50%: the box was not the cause; next, phone traffic mix (social), the real-iPhone in-app check, and the drawer's own free-shipping bar.
Today's test sessions (about 11 browser sessions with checkouts on Oct 20) may show in Oct 20 numbers.

## Theme limit

The store now has 20 themes, which is Shopify's limit. I did not delete the unused full rollback copy (188955361500): deleting themes is outside my permissions and the connector blocks it. To free a slot, Eden can delete "Memobrick cart rollback" (188955361500) in Themes > ... > Remove. It is no longer needed.
