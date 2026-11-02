# ads-analyst 2026-11-02 (first-week review)

## Summary
Meta spent $583 from Oct 26 to Nov 2 for 3 Shopify orders with a Meta ad on the visit ($269 net, ROAS about 0.46 at best). Christmas is losing (Shopify ROAS 0.31 to 0.69 on $388.50). Proposed a 7-to-4-ad rotation for its new $20/day (A-2026W45-053). Google Holiday Gifts: 1 tagged order since the Oct 26 gift-page change; Google spend unknown.

## Done
- Full review: `marketing/analytics/ads-analyst/2026-11-02-first-week-review.md`; raw numbers: `marketing/analytics/ads-analyst/2026-11-02-numbers.md`.
- No approved items acted on. A-2026W44-050 was applied Nov 1 (Proven Winners); no edits before its Nov 4 check. A-2026W45-051 is on hold (Eden).
- Task board row (dated Oct 29, Day 2 read-back): overtaken by this review. Per-ad numbers and Shopify dog-page sessions are in the review (Dog v4: 62 sessions, 0 carts). The pixel event check and the dedup step were not redone; the dedup step is already in `changes/2026-10-28-applied.md`.
- Data request added for Google Ads (Holiday Gifts, Brand, PMax by day, Oct 19 to Nov 1, plus search terms).

## Proposed for approval
- ID: P-ads-analyst-20261102-1 (queued as A-2026W45-053)
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/meta-christmas-rotation-2026-11-02.md
- Reason: Christmas rotation week 1 at $20/day: pause 4 ads (Couple v3, connie v2, mom v2, Gift Pictures v2), switch on gen_vid; 4 live in the main ad set, come-back unchanged; budget unchanged.
- Expires: 2026-11-07

## Blocked or unknown
- Google Ads: no snapshot in `marketing/data/` and Adspirer failed to connect (proxy 403). Google spend and ROAS unknown.
- Order #21116: tagged Facebook paid with no campaign ID; likely XMAS26 anniversary but not provable.
- Meta reports purchases that match Shopify orders from Google (ALWAYON: 3 claimed, 0 tagged). Eden's Events Manager dedup check still open.

## Sales impact
Weak point: Meta spend not turning into Shopify orders. The rotation focuses the Christmas campaign's $20/day on 4 ads instead of 7. Expected effect is small: at most 1 or 2 orders a week at this budget. The bigger sales lever is the Nov 9 decision: if Christmas stays under 2.0, move its $20 to the campaign that brings Shopify orders.

## Next run
- Nov 4: first Proven Winners check (Shopify orders by utm_campaign 120252873643310597).
- After Eden approves A-053: apply it through the Facebook connector, read back, log before and after.
- Nov 9: Christmas Shopify ROAS for Nov 2 to 8; propose a pause if under 2.0.
