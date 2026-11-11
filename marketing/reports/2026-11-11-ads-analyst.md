# ads-analyst 2026-11-11

## Summary
- Last 7 days (Nov 4 to 10): ads spent $1,008.73 (Google $427.27, Meta $581.46) for 9 Shopify-tagged orders, $1,302.83, Shopify ROAS 1.29 (1.56 counting first-touch orders). Break-even is 3.0; no campaign reaches it, and no budget raise qualifies.
- Search loss split: of the 1,171 Google sessions lost against last year, about 47% are fewer paid clicks, 27% free Shopping listings (347 down to 36) and 26% organic search. Google's free listings dropped the most, by 90%.
- Moves: (1) send the Black Friday week ad clicks to the gift collection and drop the code from the ads on Nov 23, (2) pause the two clear losers, (3) Eden gives one daily budget number for Nov 16 to 22.

## Done
- Approvals: `check.py approvals --agent ads-analyst --today 2026-11-11` printed nothing. A-2026W44-051 (free-proof Meta ad) is still pending and waits on A-2026W44-018 going live.
- Read Google through Adspirer (usage was 38 of 150 at the start, resets Dec 6; this run used 5 read calls, about 43 now) and Meta through the Facebook connector, both read-only. Matched both to Shopify orders by UTM for Oct 14 to Nov 10. Numbers: `/home/user/memobrick/marketing/analytics/ads-analyst/2026-11-11-numbers.md`.
- Task board (my Friday Nov 13 row, done early): the paid vs organic split table is in the numbers file. The landing proposal is P-ads-analyst-20261111-1. It names no budget and asks Eden for one number.
- Rules: no campaign meets the raise rule. Brand comes closest at 2.80 counting first-touch orders, on 4 orders, so it does not qualify. Five campaigns are below 2.0. I propose cutting the two with no case to keep them. Brand and PMax are held because they bring most of the orders. Billo is held until it is judged Friday. No waste above $50 a day. No rotation is due because the Christmas campaign is paused. No account changes were made.
- Added a Merchant Center request to `/home/user/memobrick/marketing/data/requests.md` (free listings -90%).

## Proposed for approval

### P-ads-analyst-20261111-1
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/bf-week-landing-2026-11-16.md
- Reason: If approved, Daniel moves the 4 Billo dog-page Meta ads to the gift collection (live, no budget change), writes a Chrome task to point any Brand or Holiday Gifts Google ad not already there to the gift collection, and on Nov 23 removes EARLYHOLIDAY20 text from Google ads. Eden: reply with one daily ads budget for Nov 16 to 22 (now about $141).
- Expires: 2026-11-16
- Status: pending

### P-ads-analyst-20261111-2
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/trim-losers-2026-11-11.md
- Reason: If approved, Daniel pauses Meta Proven Winners ($15/day, 1 order from $221 in 28 days) and writes a Chrome task to pause two Holiday Gifts ad groups with $180 spent and 0 conversions; Meta spend drops $15/day, Google budget unchanged.
- Expires: 2026-11-16
- Status: pending

## Blocked or unknown
- No Mac snapshot has ever been pulled (`marketing/data/latest.md`: "Updated: never"), so this run read Google through Adspirer, which still has free calls left.
- The organic part of the split is an estimate. Ad clicks are not the same as sessions, and paid traffic last year carried no UTM. Search Console queries (requested Oct 14 and Nov 2) and the Merchant Center status (requested today) are still missing.
- I did not re-read the live ad text today. It is unconfirmed whether the PMax headline "Use Code EARLYHOLIDAY20" was removed (planned Oct 26), and Part C of P-1 covers this. Two codes appear on tagged orders but not in the offers calendar: MATHS (a Meta order, $477, Nov 8) and EARLYBIRDB20 (a PMax order, Nov 1). They are not ad copy and are flagged for the coordinator.
- Holiday ad budget: unknown (Facts row). P-1 asks Eden for it.
- Meta reports 32 purchases in 28 days, but Shopify shows only 9 tagged orders. Pixel deduplication is still unverified.

## Sales impact
Today's weak point is search traffic. The split shows paid search kept most of its buyers (Google conversions -19% against clicks -49%). Most of the lost buying traffic is free listings and organic search, which more ad money will not fix. The Merchant Center request targets the free listings part. P-1 points Black Friday week ad clicks at the page with the best cart rate, which should bring about 1 extra order a week from the dog ads at no extra cost. It also keeps the ads within the offer rules after Nov 22. P-2 stops about $15 a day that bought 1 order in 4 weeks, and should cost no orders. The money only grows once Eden gives a budget number.

## Next run
Friday Nov 13: weekly review. Judge Billo UGC on its first full week after learning, check the raise rule again (Brand is close), and act on P-1 and P-2 if approved. From Nov 16, run the daily pacing check.
