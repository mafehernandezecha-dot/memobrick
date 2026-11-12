# ads-analyst 2026-11-12

## Summary
- Task board row done: the 3-row answer table is in `marketing/analytics/ads-analyst/2026-11-12-numbers.md`.
- Brand search: mostly we showed less. Brand lost 55% of its possible impressions to budget, and last year the same campaign also matched broader searches. How often people search "memobrick" needs Search Console.
- Merchant Center status can't be read through Adspirer (2 Merchant Center accounts are linked). The "Use Code EARLYHOLIDAY20" headline is gone, but the code is still in 4 PMax assets, which must be cleared on Nov 23.

## Done
- Approvals: `check.py approvals --agent ads-analyst --today 2026-11-12` printed nothing. A-2026W46-007, A-2026W46-008 and A-2026W44-051 are still pending.
- Adspirer usage check first: 42 of 150 used (resets Dec 6). This run made 4 read calls (2 brand performance reads, the Merchant Center link list, the PMax text list), so about 46 are used now. No changes made in any account.
- Task board: the answer table has 3 rows. (1) Brand. Over Oct 12 to Nov 8 Google shows impression share 66% and 55% lost to budget. On the same 14 days as last year (Adspirer only has 2025 data from Oct 27): 746 impressions, 94 clicks, $322.90 this year, against 7,139 impressions, 459 clicks, $760.49 last year. Last year's CTR was 6.4% against 12.6% this year, which points to wider matching last year, not only less demand. (2) Merchant Center: there is no tool for it. The exact error and both account IDs are in the numbers file, and a refined request is added to `marketing/data/requests.md`. (3) PMax text: that exact headline is gone. Five assets still carry the code or "20% off" (IDs listed for Nov 23, Part C of A-2026W46-007). EXTRA10 sits only in the asset groups paused since Oct 12.

## Proposed for approval
None (board rule 2: my row asks for no proposal).

## Blocked or unknown
- No Mac snapshot has ever been pulled (`marketing/data/latest.md`: "Updated: never").
- Merchant Center product counts and issues: no Adspirer tool. This needs the Mac pull (requests of Nov 11 and Nov 12).
- 2025 brand impression share: Adspirer returned null. Brand query volume needs Search Console (seo-strategist request, Nov 12).
- The asset list does not show asset group status. The paused state of groups 6703639661, 6703639667 and 6703639670 dates from Oct 12 and was not re-checked today.

## Sales impact
This run brings no order directly. It tells the team where the Google search loss is. On brand searches, we are cutting ourselves off with budget: brand converts at 9% of clicks and is the cheapest Google source. Free listings need a Merchant Center look, and that costs nothing to fix if the feed is the problem. The exact asset list makes the Nov 23 code cleanup a 10-minute task, which keeps the ads honest going into Black Friday.

## Next run
Friday Nov 13: weekly review (Billo after its first full week out of learning, the raise rule on Nov 6 to 12 with Brand closest, Meta pacing), and act on A-2026W46-007 and 008 if approved.
