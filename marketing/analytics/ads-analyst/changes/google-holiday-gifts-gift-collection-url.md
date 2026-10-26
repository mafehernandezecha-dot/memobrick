# Google Holiday Gifts: send the ads to the gift collection page

- Type: ad-change
- Executor: ads-analyst (Google: a Chrome task for the owner's Mac; no Adspirer calls)
- Platform: Google Ads, customer 6724994049
- Campaign: MB | Search | Holiday Gifts | Purchases | Q4 2026 (24325020428), ads 827188828472 (ad group "Gifts For Family & Couples") and 827188857755 (ad group "Christmas Photo Gifts"), plus ad B "Christmas Photo Gifts" added Oct 14 if it also points at /products/2-2-boards
- Expires: 2026-10-31

## Exact change

| Item | Current value (read Oct 13) | New value |
|---|---|---|
| Final URL, each ad in the campaign | https://mymemobrick.com/products/2-2-boards | https://mymemobrick.com/collections/the-gift-for-everyone |
| Display path 1, each ad | products | gifts |

Nothing else changes: no headline, description, code, keyword, bid, budget ($10 a day) or schedule is touched. No discount code is added (EARLYHOLIDAY20 has no end date yet) and nothing about shipping is added.

The Chrome task (written only after approval) will tell Claude in Chrome to stop and ask if any current value differs from the table, and to click Save only once per ad.

## Why

- Shopify, last 30 days, Google search visitors: /collections/the-gift-for-everyone **78 visits, 9 add to carts, 6 orders (7.7%)**; /products/2-2-boards **105 visits, 4 add to carts, 2 orders (1.9%)**; home page 465 visits, 12 orders (2.6%).
- Last holiday (Q4 2025) the gift collection converted Google visitors at 6.3% (33 of 528), almost twice the home page.
- Eden approved this same URL change on Oct 13 (A-2026W42-019), but the Chrome run was blocked at the Save click and the item expired Oct 20. The live ads still point at /products/2-2-boards.

## Expected effect on orders

The campaign's clicks are a small number now (last measured about 14 a week; current figure missing). Moving from about 2% to about 6% of visitors ordering is about +1 order a week now and +3 to 5 a week from Nov 16 when search demand doubles, at the same spend. No extra spend.

## Risk

Low. The ads go back through Google review for a few hours. If add to cart from this page falls below the old page over 7 days, I will propose switching back.

## How I will judge it in 7 days

Shopify Google-referrer visits and orders landing on /collections/the-gift-for-everyone for the 7 days after the change against the 7 days before, and Holiday Gifts spend from the next Google snapshot.
