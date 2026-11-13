# ads-analyst 2026-11-13 (Friday weekly review)

Chrome task drafted (waits on approval): `marketing/analytics/ads-analyst/chrome-tasks/2026-11-16-brand-budget-plus15.md`

## Summary
- Last 7 days (Nov 6 to 12): ads spent $960.50 (Google $386.16, Meta $574.34) for 13 Shopify-tagged orders, $2,052.42, Shopify ROAS 2.14 (2.42 counting first touch). That is the best week since tracking began (Nov 4 to 10 was 1.29), but still under the 3.0 break-even. Ads brought 13 of the store's 21 orders.
- No campaign qualifies for a budget raise. Billo UGC ($464 a week, ROAS 1.18, and 0.15 without one $477 order) is now below the cut line after its first full week out of learning. Proven Winners turned around: 3 orders on $110 (ROAS 3.25), so pausing it (Part A of A-2026W46-008) now rests on old numbers.
- Moves: (1) the brand budget proposal from the task board (+$15, below, with an honest caveat), (2) Eden: approve A-2026W46-008 with `changes: skip Part A` so the two zero-order Holiday Gifts ad groups pause and Proven Winners keeps running, (3) the growth director should give my row room for a Billo cut proposal on Monday.

## Done
- Approvals: `check.py approvals --agent ads-analyst --today 2026-11-13` printed nothing. A-2026W46-007, A-2026W46-008 and A-2026W44-051 are still pending. Nothing to act on.
- Read Google through Adspirer (46 of 150 used at the start, resets Dec 6; this run used 3 counted read calls, about 49 now) and Meta through the Facebook connector, read-only. Matched both to Shopify orders by UTM for Oct 16 to Nov 12. Numbers: `/home/user/memobrick/marketing/analytics/ads-analyst/2026-11-13-numbers.md`.
- Task board row: done. (1) The proposal block is below, P-ads-analyst-20261113-1. (2) The Chrome task is drafted. It cannot be `Status: ready` before approval, because the evening routine marks an unapproved ready task as skipped and then never runs it. So on approval either I flip it to ready on my next run (I run daily from Nov 16) and it runs that evening, or Eden pastes the box herself the moment she approves. (3) The weekly numbers file is written.
- Billo UGC judged on its first full week out of learning: 7 days $463.95, 233 landing page views, 42 add to carts, Meta says 6 purchases, Shopify shows 2 tagged orders ($546.88, one of them $477 with code MATHS). ROAS 1.18 (0.15 without that order), 0.89 over 28 days. It meets the cut line (below 2.0 for 7 days). I did not propose it today because task board rule 2 allows only the proposal my row asks for.
- Raise rule on Nov 6 to 12: no campaign qualifies. Brand 4.32 on 2 orders (needs 5). PMax 2.75 on 5 orders (needs above 2.8; 3.30 counting first touch, but the rule is read on last touch as in every earlier week). Proven Winners 3.25 on 3 orders. No budget was changed.
- Budgets found changed in Google Ads by someone else: Brand now $45 a day (was $35), Holiday Gifts $5 a day (was $10). No approved item or change file of mine covers this.
- Waste above $50 a day: none. Rotation: none due (the Christmas campaign is paused). The daily pacing check starts Nov 16.

## Proposed for approval

### P-ads-analyst-20261113-1
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-brand-budget-plus15-2026-11-16.md
- Reason: If approved, Daniel has the Mac raise the Google brand campaign (17949461961) from $45 to $60 a day by Chrome task (above the $25 Search cap, so Eden's OK is needed). It lost 55.5% of impressions to budget at 9.2% conversion and $3.44 a click, so $15 should buy about 4.4 clicks and 0.4 orders a day. Caveat: it spent only $16 a day of $45 in Nov 6 to 12, so part of the $15 may go unspent.
- Expires: 2026-11-16
- Status: pending

## Blocked or unknown
- No Mac snapshot has ever been pulled (`marketing/data/latest.md`: "Updated: never"), so Google was read through Adspirer, which still has free calls left.
- Who raised Brand to $45 and cut Holiday Gifts to $5, and when: unknown. The budget-loss figure of 55.5% (Oct 12 to Nov 8) is mostly from before that raise. In Nov 6 to 12 Google reported no budget loss for Brand.
- Meta reports about 3 times the purchases Shopify shows (34 against 11 in 28 days). Pixel deduplication is still unverified.
- Codes on tagged orders that `offers-calendar.md` does not list as active: 20OFF (PMax order, Nov 11), MATHS (Billo order, Nov 8), EARLYBIRDB20 (PMax order, Nov 1). As far as I know none of them is in ad copy. Flagged for the coordinator.
- Holiday ad budget for Nov 16 to 22: unknown. Eden's number is asked for in A-2026W46-007 and is not asked again here.

## Sales impact
Today's weak points are Etsy (not mine) and Google search. The brand raise targets the second one: if the budget is the limit, the math gives about 3 extra orders a week at about $37 of ad spend each. If it is not the limit, it costs almost nothing. The bigger lever is the money in Billo: $65 a day bought 2 orders this week, while Google bought 8 orders on $55 a day. Moving most of Billo's budget to Google and to Proven Winners should bring more orders for the same spend from Nov 16. I will propose that on Monday if the board allows. Skipping Part A of A-2026W46-008 keeps a campaign that just brought 3 orders in 7 days.

## Next run
Mon Nov 16: first daily pacing check (yesterday's spend against Shopify orders, fast spenders with no purchases, broken ads or tracking). If A-2026W46-008 or P-ads-analyst-20261113-1 is approved, set the Chrome task to ready (or apply Meta parts). If the board allows, propose cutting Billo UGC (below 2.0 for 7 days) and moving the money to the campaigns that bring orders.
