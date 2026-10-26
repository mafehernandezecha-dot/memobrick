# ads-analyst 2026-10-26: Google Search holiday expansion proposal (Holiday Gifts)

## Summary
Eden asked for many more keywords and search terms on the Google Search campaign and whether to switch to Maximize Conversions. Proposal: 90 new keywords in 7 new tight ad groups plus the existing "Christmas Photo Gifts", a 52-term negative list, 7 new ads, and Maximize Conversion Value (no target) instead of Maximize Conversions. Nothing in Google Ads was changed.

## Done
- Read my Oct 13 search-term plan and the Oct 14 Chrome result (never applied: blocked at the first write, and the campaign names did not match), today's audit and numbers, the SEO keyword map, offers-calendar.md and product-facts.md.
- Read Shopify live (read only): product range and prices ($35 to $853), best sellers Q4 2025 and last 60 days, collections (gift collection "Custom Photo Brick Mosaic Kits"), pages (no pet page exists; Free Proof page exists), and the Art Gift Kit (/products/unlimited-memobrick, buy now, recipient picks the photo).
- Wrote the proposal `marketing/analytics/ads-analyst/changes/google-search-expansion-2026-10-26.md`: keyword tables with reason and evidence, landing pages, negatives, 7 responsive search ads, bidding and budget plan.
- Wrote `changes/google-holiday-gifts-bidding-2026-10-26.md` (bid strategy) and `changes/google-holiday-gifts-lego-exact-optional.md` (optional LEGO exact group).
- Wrote the apply prompt `chrome-tasks/2026-10-26-search-expansion.md` (Status: waiting for approval, so the evening routine skips it) and the read-only Keyword Planner prompt `chrome-tasks/2026-10-26-keyword-planner-read.md`.
- Added one Keyword Planner line to `marketing/data/requests.md`.
- Checked by script: every headline 30 characters or less, every description 90 or less, no "LEGO" or "News" in ad text, no brand name in any negative, no negative blocks any new keyword. Copy check passed on all files.
- No Adspirer calls (0 free left until Nov 6). Did not touch Meta or the Meta Christmas files.

## Proposed for approval

### P-ads-analyst-20261026-5
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-search-expansion-2026-10-26.md
- Reason: If approved, ads-analyst sets the Chrome task ready so Eden's Mac adds 90 keywords in 7 new ad groups (3 created paused until Nov 16), a 52-term negative list and 7 new ads to Google Holiday Gifts before the season; budget stays $10/day.
- Expires: 2026-10-31
- Status: pending

### P-ads-analyst-20261026-6
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-holiday-gifts-bidding-2026-10-26.md
- Reason: If approved, the same Chrome task switches Google Holiday Gifts to Maximize Conversion Value with no target (not Maximize Conversions), so learning ends before Nov 16; budget unchanged.
- Expires: 2026-10-31
- Status: pending

### P-ads-analyst-20261026-7
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-holiday-gifts-lego-exact-optional.md
- Reason: Optional. If approved, the Chrome task adds 4 exact-match LEGO-brand searches that converted in 90 days, with an ad that never says LEGO; if rejected, it adds "lego" as a negative on Holiday Gifts only.
- Expires: 2026-10-31
- Status: pending

## Blocked or unknown
- Google not read live: Adspirer at 150 of 150 until Nov 6; no Google snapshot in `marketing/data/`. Current bid strategy, 30-day cost, conversions, CPCs, current keywords and Quality Scores of Holiday Gifts are missing; Eden's read-only Chrome report will fill them, and Part 0 of the apply prompt records them before any change.
- Search Console has never been pulled, so no keyword here is backed by Search Console queries (open requests from Oct 14 and Oct 20).
- Keyword volumes and bids are missing until the Keyword Planner prompt runs.
- The contents of the existing shared negative lists ("brand searches", 4,682 keywords; "Keywords Negativas", 2,923) are unknown; they could block new keywords or brand terms. The apply prompt checks read-only.
- No pet landing page exists. Suggest a pet collection or page to the site developer; the pet ads use the gift collection until then.
- The Christmas cutoff for the Art Gift Kit (recipient picks the photo later) is unknown, so its ad has no date.
- The brand skill does not say anything about LEGO in keywords; item -7 asks Eden.
- The Oct 13 brand keywords ([photobrick], "photo brick", "photobrick usa") were never added; out of scope here, to be proposed again with the brand budget review.

## Sales impact
Weak point: search traffic and Google orders down (Google search 20 orders in 30 days vs 38 last year; Holiday Gifts lost about 76% of impressions to rank on Oct 11). Specific keywords and matching ads on the 7.7% gift collection page should win back rank at the same $10/day. Estimate: 1 to 3 orders a week by mid November, 3 to 6 a week from Nov 16 to Dec 15 if the Shopify ROAS 3.0 budget gates pass ($10 to $15, $20, $25 a day; up to $840 total spend, break-even about 25 orders). Estimates, because CPCs are missing.

## Next run
Friday Oct 30 weekly. If approved: set the Chrome task to ready with the A- IDs and the APPROVED PARTS line. Use Eden's Chrome report and the Keyword Planner result to trim weak keywords before it runs. Nov 13: propose the first budget step with Shopify UTM numbers.
