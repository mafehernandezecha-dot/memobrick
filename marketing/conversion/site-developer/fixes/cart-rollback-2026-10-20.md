# Cart page rollback (A-2026W42-045), 2026-10-20

Built and tested by: site-developer (Jenny). Approved by Eden in chat on 2026-10-20 ("revert the cart page").
Status: **SUPERSEDED, do not publish.** Eden chose the targeted version (A-2026W42-046, `fixes/cart-no-shipping-box-2026-10-20.md`, copy 188955623644). Original status: ready in a theme copy. The Shopify connector refuses writes to the live theme, so nothing on the live site has changed yet.

## Preview and how Eden publishes it

- Theme copy: **"Memobrick cart rollback"**, id 188955361500 (unpublished). It is a fresh duplicate of the live theme "Memobrick calm home" (188697510108) made today, with only the 2 files below changed.
- Preview: https://mymemobrick.com/?preview_theme_id=188955361500
- Cart page in the preview (add something to the cart first): https://mymemobrick.com/cart?preview_theme_id=188955361500

Publish steps (about 1 minute):
1. Shopify admin > Online Store > Themes.
2. Find **"Memobrick cart rollback"** in the theme library.
3. Click the **...** button next to it > **Publish** > confirm **Publish**.
4. Done. "Memobrick calm home" moves to the library unchanged; keep it, it is the undo.

Before publishing, if anyone edited the live theme after 2026-10-20 10:00 ET, tell me first so I can rebuild the copy (the copy matches the live theme as of today).

## What exactly is rolled back

Only the parts of A-2026W42-021 (live since Oct 14):

| File | Live now (md5) | In the rollback copy (md5) | What it means |
|---|---|---|---|
| `templates/cart.liquid` | 498326618234d9f98c771afe82477a15 (021 version) | e494bd6a40250dd4c433f2cfdd2ac5cc | Byte for byte the pre-Oct-14 file from `backups/2026-10-14-cart-sticky-prodesign/templates/cart.liquid` |
| `assets/memobrick.js` | 88f83c4a454dcf58bc1d9c1118777f77 | 75dc4d8d376915dc62242dc28cffbf39 | Live file with only the two 021 cart-drawer edits reversed |

Removed from the cart page: the shipping box (state + ZIP estimator with live carrier rates, "Free US shipping on orders $125 and up", "Add $X more to get free shipping"), the "Order by December 15" line, the customer's mosaic as the line picture, the "Build-at-home kit" label, and the hiding of internal fields. The footnote goes back to "Taxes, discounts and shipping are calculated at checkout."

Removed from the cart drawer: the customer's mosaic as the picture (back to the product photo) and the "Build-at-home kit" label.

The cart drawer part separated cleanly. Proof: taking the Oct 14 backup of `memobrick.js` (cb938c92..., from before 021 and 022) and applying only the 022 sticky-bar edits and the 013 Pro Design size edit gives exactly 75dc4d8d376915dc62242dc28cffbf39, the same file as in the copy.

Kept, unchanged: 022 desktop sticky bar (`data-mb-sticky-topbar` present), 013 Pro Design keeps size (`mbQ=new URLSearchParams` present), 009/036 calm phone home (`sections/memobrick-site.liquid` d641ed44212004aaa1ab2be733f6829f, same as live), 010 email pop-up A/B test (`assets/memobrick-email-gate.js` 851b9041af3a1e33c16102520c3b92e9, same as live). The drawer's own "Add $X more for free shipping" bar is older than 021 and stays.

Files:
- Rollback files: `marketing/conversion/site-developer/theme-files/cart-rollback-2026-10-20/` (commit 77abf26)
- Backup of the live files today: `marketing/conversion/site-developer/backups/2026-10-20-cart-rollback/` (templates/cart.liquid 4983266..., assets/memobrick.js 88f83c4..., both equal the live checksums read from Shopify today)

## Important: what the rollback brings back

Going back to the pre-Oct-14 page also brings back the problems 021 fixed (Wilson's audit 2026-10-12, problem 4): the cart shows the product stock photo instead of the customer's mosaic, and six internal fields are visible, including a long "Final Design: https://cdn.shopify.com/..." file address, plus "Design ID", "Brick grid", "Build service", "Orientation". Seen in `after-desktop-cart.jpg`. You asked that the cart still show the design and keep hidden fields hidden; that is not possible with a full rollback of 021. If you want, I can build a second copy that removes only the shipping box and the December 15 line and keeps the mosaic picture and the hidden fields (needs a new approval).

## Test results (2026-10-20, Chromium at 390x844 with an Android Chrome user agent, and 1440x900)

Method: a fresh browser per device. One 10x10 kit added with `/cart/add.js` using the editor's field names and a generated colored-squares picture as "Final Design" (no real photo). Opened the cart drawer, clicked Checkout, then the cart page, clicked Checkout. Shopify sends Checkout to Shop Pay on shop.app, which this sandbox cannot reach, so the same checkout was then opened on the store's own checkout with `skip_shop_pay=true`. Stopped at the Contact step: no email, address or payment entered, no order. Script: `marketing/conversion/site-developer/tools/cart-checkout-test.mjs`.

| Check | Live now (before) | Rollback copy (after) |
|---|---|---|
| Drawer Checkout reaches checkout, phone | yes, 8.1 s | yes, 9.1 s |
| Drawer Checkout reaches checkout, desktop | yes, 7.2 s | yes, 7.3 s |
| Cart page Checkout reaches checkout, phone | yes, 7.3 s | yes, 10.3 s |
| Cart page Checkout reaches checkout, desktop | yes, 7.5 s | yes, 7.2 s |
| Checkout button in the first screen, phone | yes (top 476 px) | yes (top 616 px, lower because the 6 fields are back) |
| Checkout button enabled and not covered by page code | yes | yes (Shopify's cookie consent box covered it on phone in this test until dismissed; not a theme element) |
| Customer's mosaic shown | yes (cart page and drawer) | no, product photo |
| Internal fields hidden | yes (only "Design method" shows) | no, 6 shown incl. the file address |
| Theme JavaScript errors | none | none |
| Sideways scroll on phone | none | none |

Console errors in both versions are only from hosts this sandbox blocks (cdn.shopify.com, shop.app, Pinterest, TikTok, Google tags, app scripts) and Shopify's checkout telemetry. No error came from `memobrick.js` or from the cart template's script.

Screenshots in `marketing/conversion/site-developer/2026-10-20-cart-rollback/`: `before-*` (live) and `after-*` (copy), each with `-drawer`, `-drawer-checkout`, `-cart`, `-cart-full`, `-checkout` for phone and desktop. In the before shots the mosaic picture is a broken image only because this sandbox cannot load cdn.shopify.com.

## Root cause search in the current cart page

Nothing in the current page blocks Checkout:
- The Checkout button is a plain submit button (`name="checkout"`) above the shipping box, in the first screen on phone and desktop, enabled, and nothing in the theme overlaps it.
- The estimator only runs when "Get rates" is clicked; its fields have no `name`, so they do not affect the cart form, and Enter in the ZIP field is caught so it cannot submit the form.
- Both Checkout paths (drawer and cart page) gave Shopify's normal 302 to checkout with a checkout token on both devices.

What the store data says (Shopify analytics, sessions):

| Device | Oct 1-13 reached checkout / with cart addition | Oct 14-19 |
|---|---|---|
| Mobile | 71% (56 of 79) | 44% (19 of 43) |
| Desktop | 95% (62 of 65) | 100% (13 of 13) |
| Mobile, social | 62% (13 of 21) | 29% (5 of 17) |
| Mobile, search | 64% (18 of 28) | 38% (3 of 8) |
| Mobile, direct | 83% (24 of 29) | 69% (11 of 16) |

- The whole drop is on phones (Fisher test p = 0.006). Desktop uses the same cart template and drawer and did not drop. A cart page that breaks Checkout would hurt desktop too, so a technical break in the cart page is unlikely.
- Mobile social sessions rose from about 36 a day to about 60 a day after Oct 14, and that traffic reaches checkout least often, so part of the drop is traffic mix.
- Two behavior effects on phones fit the data and cannot be ruled out here: on a phone the shipping box with "Add $X more to get free shipping" and the rate form sits right under Checkout, and many phone carts are under $125 (kits start at $35). Seeing $13 to $20 shipping in the cart may send people away who would earlier have found it at checkout. Checkout completion stayed at about 35%, so the cost reveal did not help completion.
- Not testable here: iPhone Safari and the Instagram, Facebook and TikTok in-app browsers (Shopify sends iPhone Safari through shop.app, and checkout always goes through Shop Pay on shop.app; the sandbox cannot load shop.app). Owner check on a real iPhone inside Instagram: add a kit, open the cart, tap Checkout, confirm the checkout opens; stop before paying.
- Other phone-only changes from the same day (Oct 14), kept as asked: calm phone home and the email pop-up A/B test. Both act before the cart, not between cart and checkout.

## Watch plan (7 days after Eden publishes)

Every day, referred sessions only (social, search, email; direct traffic includes bots):

`FROM sessions SHOW sessions_with_cart_additions, sessions_that_reached_checkout, sessions_that_completed_checkout WHERE referrer_source != 'direct' GROUP BY session_device_type SINCE <publish date> UNTIL today`

Also the store-wide line without the filter, against the baselines: all devices 82% (118 of 144), mobile 71%, desktop 95%. Checkout completion baseline about 35%.

Reading after 7 days:
- Mobile back to 65% or more: the cart page change was the cause. Then rebuild only the safe parts (mosaic picture, hidden fields) and test any shipping message as an A/B test instead of for everyone.
- Mobile still under 50%: the cart page was not the cause. Look at the phone traffic mix (social ads), the phone home and email pop-up, and the real-iPhone check above.

Note: today's test sessions (cart additions with Checkout clicks, about 7 test browser sessions on Oct 20) may show up in Oct 20 numbers if Shopify does not filter them.

## How to undo the rollback

Shopify admin > Online Store > Themes > "Memobrick calm home" > ... > Publish. That brings back the Oct 14 cart page exactly. The files are also saved in `marketing/conversion/site-developer/backups/2026-10-20-cart-rollback/`.

## Theme limit

The store has 19 themes after today's copy (Shopify allows 20). Not at the limit. If a new copy is needed later, the safest to remove is "Copy of Copy of Copy of xx" (128996770012, untouched since 2026-09-22). Never remove "AVADA Assets - DO NOT REMOVE", "memobrick-theme-v27-print-8mm" or "Memobrick calm home".
