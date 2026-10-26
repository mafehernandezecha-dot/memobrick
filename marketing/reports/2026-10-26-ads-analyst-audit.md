# ads-analyst 2026-10-26: full ads audit before the holiday push (read-only)

## Summary
Last 30 days the store made 73 orders and $8,402.72 net sales (last year 186 and $18,871). Ads are the weak part: Meta-tagged orders were 13 / $1,274.66, and the biggest Meta campaign (Proven Videos, $60 a day) brought 2 orders / $90.91 in two weeks. Real ad spend for these windows could not be read (Adspirer at 150/150 until Nov 6, Facebook connector not authorized, Mac data pull has never run), so ROAS below is measured against the last known budgets and labeled as an estimate.
Four proposals: pause Proven Videos, send the Google Holiday Gifts ads to the gift collection page, tag Google ads so Shopify can measure them, and build a paused Christmas campaign from last holiday's best videos. No ad account was changed.

Raw numbers: `marketing/analytics/ads-analyst/2026-10-26-numbers.md`. Proposal blocks: `marketing/reports/2026-10-26-ads-analyst.md`.

## Account summary

| | Last 30 days (Sep 26 to Oct 25) | Last 7 days (Oct 19 to 25) | Same 30 days 2025 |
|---|---|---|---|
| Ad spend, Google + Meta | **missing** (estimate about $3,000 at last known budgets, about $100 a day) | **missing** (estimate about $710) | missing (Meta alone spent $4,835 Sep 14 to Oct 13, 2025) |
| Shopify orders, whole store | 73 | 19 | 186 |
| Shopify net sales, whole store | $8,402.72 | $2,073.29 by referrer rows ($2,003 in daily rows) | $18,871.08 |
| Blended MER (store sales / ad spend) | about 2.8, estimate | about 2.9, estimate | |
| Shopify orders tagged Meta ads | 13 / $1,274.66 | 2 / $134.88 | 19 / $1,545.20 |
| Shopify orders from Google search (paid and free mixed) | 20 / $2,094.93 | 4 / $387.29 | 38 / $4,106.27 |
| Meta real ROAS (tagged sales / spend) | about 0.5, estimate | about 0.24, estimate (Oct 16 measured 0.23) | |
| Google real ROAS | cannot be measured (no UTMs); upper bound 2.7 to 3.2 counting all free Google orders as paid | upper bound about 2.6 | |

Break-even is 3.0 on Shopify net sales. No ad line clears it on Shopify evidence.

### The 3 most important moves
1. **Stop the Proven Videos spend** (P-ads-analyst-20261026-1): about $60 a day for about 1 order a week.
2. **Send Google gift searchers to the page that sells** (P-ads-analyst-20261026-2): the gift collection turns 7.7% of Google visitors into orders; the page the ads use now turns 1.9%.
3. **Measure Google on Shopify** (P-ads-analyst-20261026-3) and **have a Christmas Meta campaign ready, paused** (P-ads-analyst-20261026-4) before demand doubles in mid November.

## Data sources and how fresh they are

| Source | Status |
|---|---|
| Adspirer | Connected to Google (6724994049) and Meta (1493067227536648), but 150 of 150 included calls used; resets Nov 6. No calls made (they would be paid). |
| Facebook connector | Not authorized. **Meta not checked live.** |
| `marketing/data/` Mac pull | Never run (`latest.md`: "Updated: never"; no snapshot files). Not stale: empty. 7 older requests plus 2 new ones (today) are open in `marketing/data/requests.md`. |
| Shopify | Read live, today (orders, sales, referrer, UTM, sessions, landing pages). |
| My last live reads | Google Oct 12 (Adspirer), Meta Oct 16 (Facebook connector). |
| GA4, Search Console | Not read (same Adspirer limit; no snapshots). |

## Judgment by campaign

| Campaign | Platform | Last known budget | Shopify evidence | Judgment |
|---|---|---|---|---|
| Proven Videos Oct26 (120252562193330597) | Meta | $60/day | 2 weeks: 669 visits, 27 add to carts, 2 orders / $90.91; ROAS about 0.11 if budget spent | **Losing.** Under 10 orders, but the spend-to-sales gap is too large to wait for. |
| ALWAYON PROMO -v1 (120252425110090597) | Meta | $20/day (Eden turned it back on Oct 16) | 30 days: 10 orders / $1,023.49; 2 weeks: 98 visits, 3 orders / $244.18; ROAS about 0.87 | **Losing but the only Meta campaign that sells.** Too early to scale; keep as is and judge again Nov 2. Weekly orders falling: 4, 3, 2, 1. |
| retargeting (120252347640260597) | Meta | paused | 38 visits, 0 orders | Paused. Do not resume with the old EARLYBIRD20 creatives. |
| PMax #2 (23775628961) | Google | $48/day | not separable from free Google traffic | **Unknown on Shopify.** Last measured (Oct 12): Google said ROAS 2.92 over 28 days. |
| Brand, Search Campaign #1 - 2026 (17949461961) | Google | $35/day | not separable | **Unknown.** Brand clicks cost about $2.75 each (Oct 12); people searching "memobrick" might come for free. Not proposing a cut without a test; Eden's rule keeps "memobrick" open in PMax. |
| Holiday Gifts (24325020428) | Google | $10/day, ends Dec 15 | its landing page /products/2-2-boards: 105 Google visits, 2 orders | **Fixable**: right keywords, wrong page (proposal 2). |
| NonBrand Photo-to-Brick (24319578231) | Google | paused Oct 12 | | Stays paused. |

## Wasting money

1. **Proven Videos on Meta:** the largest daily budget and the fewest sales per visit (0.3% of visits order; PROMO -v1 3.1%).
2. **Google gift clicks landing on a product page** that converts at a quarter of the gift collection's rate.
3. **Spending without measuring:** Google has no UTMs, so up to about $20 to $50 a day goes out with no way to check it against Eden's 3.0 rule.
4. **Instagram placements** (last read Oct 16): 46% of Meta spend for 6 of 23 Meta purchases; Shopify shows Instagram 242 visits and 2 orders in 30 days. Proposal 4 runs Facebook placements only.
5. Possibly the brand campaign (paying for "memobrick" searches). Not proven either way; needs the Google snapshot.

## Working

- **Google search visitors still buy**: 742 visits, 22 completed checkouts (3.0%) in 30 days, the best of any source. The gift collection page is the best page (7.7%).
- **ALWAYON PROMO -v1** keeps bringing tagged orders at a small budget.
- **Checkout**: 46% of visitors who reach checkout buy (39% last year). The problem is the number of buyers arriving, not the checkout.
- **Last holiday's Meta videos** (couple, cat, dog) returned Meta ROAS 2.6 to 4.1 Nov 1 to Dec 15, 2025, and facebook/paid brought 169 Shopify orders in Q4 2025.

## Proposed changes (blocks in `marketing/reports/2026-10-26-ads-analyst.md`, Status: pending)

| ID | Change | Numbers behind it | Expected effect | Spend effect |
|---|---|---|---|---|
| P-ads-analyst-20261026-1 | Meta: pause Proven Videos (120252562193330597) | 2 orders / $90.91 from up to $840 in 2 weeks | about 1 order a week at risk | **-$60 a day** |
| P-ads-analyst-20261026-2 | Google Holiday Gifts: Final URL to /collections/the-gift-for-everyone, path "gifts" | 7.7% vs 1.9% of Google visitors order | +1 order a week now, +3 to 5 from Nov 16 | none |
| P-ads-analyst-20261026-3 | Google: account-level UTM suffix | 20 Google orders / $2,094.93 cannot be split paid vs free | none directly; makes the 3.0 rule checkable for Google | none |
| P-ads-analyst-20261026-4 | Meta: new Christmas campaign from 2025's couple, cat and dog videos, Facebook placements, $40/day, created **paused** | 2025 oct_29: $6,027, Meta ROAS 3.49 | none until a separate launch approval; then judged on Shopify, stop if under 3.0 after $300 | none while paused; if launched, Meta total $60/day vs $80 now |

Every proposal keeps Eden's rules: no flat-rate shipping, no "free shipping + code" (no code or shipping claim is in any new copy), "memobrick" stays open in Performance Max, "As seen on FOX" only (never "Fox News"), no paid apps or new monthly costs, nothing goes live without approval, and new campaigns are created paused.

## Done
- Status set to working at start; needs_me at end.
- Read Shopify live (orders, net sales, referrer, UTM, sessions, landing pages for 30 days, 7 days and last year), `sales/latest.json`, `sales-goals.json`, `offers-calendar.md`, `product-facts.md`, my reports and numbers since Oct 12, and the approvals queue and archive.
- Checked Adspirer connections and usage (2 free status calls, no data calls).
- Wrote `marketing/analytics/ads-analyst/2026-10-26-numbers.md` and four change drafts in `marketing/analytics/ads-analyst/changes/`.
- Added 2 lines to `marketing/data/requests.md` (Google and Meta spend for these windows).
- No ad account change of any kind.

## Blocked or unknown
- **Ad spend for all windows is missing.** All ROAS and MER figures above are estimates from the last known budgets (Google about $21.50 a day measured Oct 5 to 11 after the NonBrand pause; Meta $80 a day on Oct 16).
- **Meta not checked live**: Facebook connector not authorized; Adspirer has no free calls until Nov 6. Eden's Oct 22 changes (Merriage_video paused, Photo to mosaic 1x1 on, Instagram identity) are still unverified.
- **Google not read since Oct 12.** Whether the Oct 14 changes (Christmas asset group, buyer signal, occasion ad) helped is unknown. Whether any "memobrick" negative is live in PMax #2 is unverified.
- **The Mac data pull has never run.** This is the one fix that unblocks Google, Meta, GA4 and Search Console for every agent at no cost.
- **My Oct 16 afternoon Meta proposals (P-ads-analyst-20261016-2 to -6) never reached the queue** (the coordinator collected only -1 that day) and are now past their Oct 21 expiry. Today's proposals replace them.
- EARLYHOLIDAY20 has no end date, so no new ad uses it. Holiday ad budget is "unknown" in the Facts table.
- Proposals are in my run report, not written into `queue.md`: the approvals skill lets only the marketing-coordinator add items there, and `Status: proposed` is not a status the checker accepts. The coordinator copies them as `pending` on its next run.

## Sales impact
Weak point addressed: "Referred traffic is down 54%, search worst" and the October order gap (66 orders vs goal 125 by Oct 25). Proposal 2 adds about 1 order a week now and 3 to 5 a week from Nov 16 at no extra cost. Proposal 1 saves about $420 a week for about 1 order. Proposals 3 and 4 add no orders this week; they make the November budget decisions measurable and give a ready Christmas campaign for the week demand doubles.

## Next run
Friday Oct 30 weekly. If the Mac pull or a re-authorized Facebook connector gives spend, replace every estimate with measured ROAS. Act on any approved item (Meta through the connector, Google as a Chrome task). Nov 6: Adspirer free calls reset.
