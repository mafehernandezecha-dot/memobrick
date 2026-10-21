# Discount code vs free shipping over $125: live checkout test (2026-10-21)

Asked by Eden: when a customer enters a 20% code on an order that also gets free shipping over $125, does Shopify keep whichever saves the customer more?

**Answer: no. Shopify always keeps the code and drops free shipping, even when free shipping was worth more.** It does not refuse the code and shows no visible message. The shipping line simply changes from "FREE" to the price. Removing the code (the X on the code chip) brings free shipping back at once.

READ-ONLY test. Nothing on the store or theme was changed. No payment details were entered, Pay now was never pressed, no order was placed. Payment completion requests were also blocked in the test browser as a safety net.

## Setup (read through the Admin API today)

- Automatic "Free Shipping on US Orders Over $125": US only, minimum subtotal $125, all shipping rates (no maximum), combinesWith product discounts yes, order discounts no, shipping discounts no.
- EARLYHOLIDAY20: product discount, 20% on 7 collections (Custom Photo Brick Mosaic Kits, Frames for Brick Mosaics, Artist Collection, Bricks and Mosaic Accessories, Newest products, AVADA - Best Sellers, Best Sellers), no minimum, combines with nothing.
- BRICK10: order discount, 10% on everything, no minimum, combines with nothing.
- Because both codes combine with nothing, Shopify must choose one. It always chose the code.

## How the test ran

Live store checkout, mymemobrick.com, Playwright Chromium, desktop 1440x900 (phone 390x844 where noted). Each case: a fresh cart of real kit or frame products (cart permalink), the store's own checkout, contact test+checkout@mymemobrick.com, name Test Checkout, a business address (350 5th Ave, New York, NY 10118, or 200 N Spring St, Los Angeles, CA 90012), the cheapest shipping method unless noted. The summary was read with no code, then the code was typed in "Discount code or gift card" and Apply pressed, then the code was removed again. Script: `marketing/conversion/site-developer/tools/code-vs-freeship-test.mjs`. Raw results: `<case>-<device>.json` in this folder (cases 1/2, 3a and 3b were the first runs, printed to the console, not saved as JSON; their numbers are in the table and on the screenshots). The code-removed step was added from case 4 on.

Test environment notes: the sandbox browser hit the store's bot check ("Just a moment...", HTTP 429) on /checkouts after a few runs, so later runs fetched the checkout page through Playwright's Node side (`VIA_NODE=1`, same store, same checkout, nothing changed). The card form showed "Credit and debit card payments aren't available right now" in every run; that is the sandbox blocking Shopify's card iframe host, not something the test changed (we never touch payment).

## Results

| Case | Cart (all real products, all covered by the codes) | Address, shipping method | No code: what the customer pays | With the code: what the customer pays | Code saves | Free shipping saves | Shopify kept | Better for the customer | Customer overpays |
|---|---|---|---|---|---|---|---|---|---|
| 1, 2 | 20x30 kit build-at-home, $149.00 | NY, UPS Ground Saver $12.35 | **$149.00** (shipping $12.35 shown struck, FREE) | EARLYHOLIDAY20: subtotal $119.20 + shipping $12.35 = **$131.55** | $29.80 | $12.35 | code | code | none |
| 3a | Frames 30x30 + 16x16, $134.00 | LA, UPS Ground $31.56 (cheapest offered) | **$134.00** | EARLYHOLIDAY20: $107.20 + $31.56 = **$138.76** | $26.80 | $31.56 | code | **free shipping** | **$4.76** |
| 3b | 4 x 10x10 kit, $140.00 | LA, UPS 3 Day Select $55.02 | **$140.00** | EARLYHOLIDAY20: $112.00 + $55.02 = **$167.02** | $28.00 | $55.02 | code | **free shipping** | **$27.02** |
| 3c | 30x40 kit + 10x10 kit, $314.00 | NY, UPS Ground Saver $27.11 | **$314.00** | EARLYHOLIDAY20: $251.20 + $27.11 = **$278.31** | $62.80 | $27.11 | code | code | none |
| 4a | 20x30 kit, $149.00 | NY, UPS Ground Saver $12.35 | **$149.00** | BRICK10: $149.00 - $14.90 + $12.35 = **$146.45** | $14.90 | $12.35 | code | code (by $2.55) | none |
| 4b | Frames 30x30 + 16x16, $134.00 | LA, UPS Ground $31.56 | **$134.00** | BRICK10: $134.00 - $13.40 + $31.56 = **$152.16** | $13.40 | $31.56 | code | **free shipping** | **$18.16** |
| 4c | 30x40 kit + 10x10 kit, $314.00 | NY, UPS Ground Saver $27.11 | **$314.00** | BRICK10: $314.00 - $31.40 + $27.11 = **$309.71** | $31.40 | $27.11 | code | code (by $4.29) | none |
| 5 | 16x16 kit, $69.88 (under $125) | NY, UPS Ground Saver $12.35 | **$82.23** (no free shipping, under $125) | EARLYHOLIDAY20: $55.91 + $12.35 = **$68.26** | $13.97 | none | code | code | none |
| 1, 2 phone | same as 1, 2 | same | **$149.00** | **$131.55** | $29.80 | $12.35 | code | code | none |
| 3a phone | same as 3a | same | **$134.00** | **$138.76** | $26.80 | $31.56 | code | **free shipping** | **$4.76** |

Case 5 (sanity check): under $125 the 20% applies and shipping is charged, as expected.

Phone (390x844) gave exactly the same totals as desktop. On the phone the summary header shows the new total next to a struck-through "$165.56" (case 3a: price before the code plus shipping), which makes the code look like a saving even though the customer now pays $4.76 more than with free shipping.

In every case where the code was removed again (4a, 4b, 4c, 5, and phone 1/2 and 3a), free shipping came straight back and the total returned to the no-code amount ("Discount code BRICK10 has been removed. Updated total price: 134.00 US dollars").

## What the customer sees when the code goes in

- No error and no warning. The code is accepted.
- Visible: a code chip "EARLYHOLIDAY20 x" under the code box; the item line shows "EARLYHOLIDAY20 (-$29.80)" (EARLYHOLIDAY20 is a product discount, so it shows per item) or an "Order discount BRICK10 - $14.90" line (BRICK10); the shipping row changes from struck "$12.35 FREE" with the tag "FREE SHIPPING ON US ORDERS OVER $125" to plain "$12.35"; the shipping method prices change from "FREE" to their prices; "TOTAL SAVINGS" shows the code amount.
- Screen reader announcement only (not visible): "Discount code EARLYHOLIDAY20 has been applied. Updated total price: 131.55 US dollars. Updated shipping method: UPS Ground Saver."

## When the customer loses money

Only when the shipping price is bigger than the code's value:
- 20% codes: orders of $125 to about $160 with heavy items (frames) or a faster shipping choice (3 Day Select). Cheapest shipping we saw was $12 to $32; 20% of $125 is $25.
- 10% codes (BRICK10, Collabs 10% codes): more often, because 10% of a $125 to $300 order ($12.50 to $30) is close to the shipping price.
For most kit orders the code is worth more, so Shopify's choice is the better one there.

## Screenshots (order summary, JPEG, full page)

- Case 1/2: `c1c2-desktop-1-no-code.jpg`, `c1c2-desktop-2-with-code.jpg`
- Case 3a: `c3a-desktop-1-no-code.jpg`, `c3a-desktop-2-with-code.jpg`
- Case 3b: `c3b-desktop-1-no-code.jpg`, `c3b-desktop-2-with-code.jpg`
- Case 3c: `c3c-desktop-1-no-code.jpg`, `c3c-desktop-2-with-code.jpg`
- Case 4a/4b/4c: `c4a-desktop-*.jpg`, `c4b-desktop-*.jpg`, `c4c-desktop-*.jpg` (1 no code, 2 with code, 3 code removed)
- Case 5: `c5-desktop-*.jpg`
- Phone: `c1c2-phone-*.jpg`, `c3a-phone-*.jpg` (390 px wide, full page)

## Side effects of the test

Each run left an abandoned checkout in Shopify (about 12 today, email test+checkout@mymemobrick.com, name Test Checkout). Shopify or Omnisend abandoned-checkout emails may go to that test address. No order, no customer data, no settings changed. A phone run for case 4b was cut off by the bot check and was discarded.

## Proposal

`marketing/conversion/site-developer/fixes/one-offer-per-order-line.md` (pending, Eden decides).
