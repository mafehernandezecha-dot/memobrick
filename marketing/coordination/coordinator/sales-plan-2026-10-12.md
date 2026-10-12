# Sales plan, week of 2026-10-12

## Where we are

| | Orders | Net sales |
|---|---|---|
| Last week (Oct 5 to 11), actual | 20 | $2,269.56 |
| Last week goal (5 a day, $550 a day) | 35 | $3,850 |
| Gap last week | -15 | -$1,580 |
| This week goal (Oct 12 to 18) | 35 | $3,850 |
| Same week last year (Oct 12 to 18, 2025) | 40 | $4,922 |

At last week's pace we miss this week's goal by about 15 orders. Source: growth-analyst 2026-10-12, `marketing/sales/latest.json`.

## Top weak points (marketing/sales/latest.json)

1. **Visitors stopped adding to cart:** 2.4% of visits add to cart, down from 7.1% last year, on 23% more traffic. This is the biggest gap (56 orders in 30 days vs 123). No agent proposal works on the product page or editor itself.
2. **Most checkouts are abandoned:** 213 reached checkout, 56 bought (26%). Live Google ads promise a code, EARLYHOLIDAY20, that Shopify does not have.
3. **Holiday plan not ready:** the 20% holiday offer has no code, dates or exclusions, so no email, post or ad can announce it.

## The three strategies most likely to close the gap this week

### 1. Stop the broken code and the wasted ad spend (ads)

- **What:** remove EARLYHOLIDAY20 and "20% Off" from PMax #2 and Holiday Gifts ads. Pause NonBrand Photo-to-Brick ($140 a week, 0 conversions). Add brand negatives to PMax. Cut Meta ALWAYON PROMO -v1 from $40 to $20 a day (Shopify ROAS 0.69 last week).
- **Who:** ads-analyst.
- **By:** Tue Oct 13 if approved today. The items expire Oct 17.
- **Approval:** A-2026W42-001, 002, 003, 004, 005. Alternative to 001 and 002: create EARLYHOLIDAY20 in Shopify and list it as active (see strategy 3).
- **Expected orders:** about +0 to 1 a week from fewer failed checkouts, minus about 1 a week from the Meta cut. About $280 a week stops going to ads that brought about 1 order. This mainly protects orders and frees budget for what works. It does not close the gap by itself.

### 2. Recover abandoned carts and checkouts (email)

- **What:** test a no-discount reassurance version of the last Abandoned Cart email. The current 20% email got 0 clicks and 0 purchases from 88 delivered.
- **Who:** email-flow-optimizer.
- **By:** Thu Oct 15 if approved by Wed Oct 14.
- **Approval:** A-2026W41-010. First decide on the shared "2–4 business days" blocks; the Facts table does not list a delivery time.
- **Expected orders:** about +1 a week. About 50 people a week reach checkout without buying. A last email that converts even 2% of 88 sends brings 1 to 2 orders.

### 3. Send people straight into the editor, and decide the holiday offer (social, ads, offers)

- **What:** post this week's transformation reels, all linking to /pages/editor. Create the same reel as a paused Meta ad in Proven Videos, with no budget increase. The owner fills in the holiday 20% code, dates and exclusions so email and ads can announce it before November. Also decide on the unapproved Omnisend sends (Re-engagement 10% on Oct 14, Early Bird 15% on Oct 20).
- **Who:** social-publisher (posts), ads-analyst (Meta ad), owner (offer and Omnisend decisions), then email-campaign-writer.
- **By:** reel tonight, Mon Oct 12 at 19:00 (A-2026W41-001 expires today). Second reel Thu Oct 15. Meta ad created by Wed Oct 14. Offer decision before the Oct 14 Omnisend send.
- **Approval:** A-2026W41-001 and A-2026W41-002 (pending). A-2026W41-003 (approved, but blocked by a stale commit). A-2026W42-006. An offer row in offers-calendar.md.
- **Expected orders:** 0 to 1 a week from organic posts, since there are no results yet. The Meta reel ad's bar is 1 order per $110 of spend once launched. The holiday offer is the largest lever but cannot be estimated until its terms exist. Last year the same week had 40 orders.

## Honest outlook

Together these add maybe 2 to 3 orders this week. That is not enough to close a 15-order gap. The gap sits mostly in the add-to-cart drop (weak point 1). No agent has proposed a fix for the product page or editor. The owner should open /pages/editor and a product page on a phone this week. The seo-technical audit also flags two creator pages (/pages/create and /pages/editor).
