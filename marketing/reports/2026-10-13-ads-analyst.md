# ads-analyst 2026-10-13 (Google Ads year-over-year audit, owner request)

Chrome task ready tonight: `marketing/analytics/ads-analyst/chrome-tasks/2026-10-13-search-terms.md`

## Summary

Sep 15 to Oct 12 orders fell from 157 (2025) to 50 (2026). More than half the gap is free-design-proof sales (draft orders 63 to 4, stopped in late May); the rest is search traffic (sessions -75%, Google-referrer orders 30 to 15) and Meta.
Search-term cleanup and 23 new buyer keywords are ready as an owner-approved Chrome task; 2 more Google changes are proposed. Adspirer was at 150 of 150 calls, so no Google calls were made.

## Account summary

| | Sep 15 to Oct 12, 2025 | Sep 15 to Oct 12, 2026 |
|---|---|---|
| Shopify orders / net sales | 157 / $16,766.82 | 50 / $5,077.15 |
| Google-referrer orders (paid and organic mixed) | 30 / $3,065.23 | 15 / $1,427.05 |
| Google spend | not read (quota) | $611.47 (Sep 14 to Oct 11, Oct 12 pull) |
| Google upper-bound Shopify ROAS | not read | 2.33 or less ($1,427.05 / $611.47, windows one day apart) |

The 3 most important moves:
1. Restore the free-design-proof path (Eden) and advertise "Free design proof on request".
2. Run the approved search-term Chrome task tonight.
3. Approve P-ads-analyst-20261013-1 (Holiday Gifts to the gift collection page, which converted 6.3% last holiday, plus the live EARLYHOLIDAY20 code).

Full audit: `marketing/analytics/ads-analyst/google-audit-2026-10-13.md`. Raw numbers: `marketing/analytics/ads-analyst/2026-10-13-numbers.md`.

## Done

- Status set to working and pushed.
- Checked origin/main for partial work from the interrupted attempt: no audit file and no 2026-10-13 Chrome task existed, so nothing was duplicated.
- Approvals (`check.py approvals --agent ads-analyst --today 2026-10-13` printed A-2026W42-001 to 006):
  - A-2026W42-001 (PMax text): Chrome task `chrome-tasks/2026-10-12-pmax-cleanup.md` is ready and the owner is applying it now. Not duplicated.
  - A-2026W42-002, 003, 005: already applied on 2026-10-12 (commit 97a7743). Nothing to do; the coordinator can archive them.
  - A-2026W42-004 (PMax brand negatives): **held, not applied.** Today's owner instruction says never block converting brand terms, and "memobrick" converted 5 times in PMax in 30 days. Excluding it from PMax would route those buyers to the brand Search campaign, but that conflicts with the instruction as written. Eden: reply "go" to run it as approved, or reject it.
  - A-2026W42-006 (Meta paused ad from the photo-to-mosaic reel): deferred to Friday's run (still within its Oct 17 expiry). The coordinator's note says Eden asked for a different video on the organic post that uses the same clip; I will create it Friday unless Eden marks it `changes:`.
- Approved in chat 2026-10-13 (owner, search terms only), recorded as an approved ad-change:
  - Change file: `marketing/analytics/ads-analyst/changes/google-search-terms-2026-10-13.md`
  - Chrome task: `marketing/analytics/ads-analyst/chrome-tasks/2026-10-13-search-terms.md`, `Status: ready`, naming "Approved by owner in chat 2026-10-13". It adds a shared negative list (16 exact LEGO terms, 19 phrase non-buyer terms), each checked first against the 90-day search-term report; pauses 5 named non-converting keywords plus any non-brand keyword with $15+ and 0 conversions in 90 days; adds 23 keywords to Holiday Gifts and 3 former-brand keywords ("photobrick") to the brand campaign; and records last year's impression share and Q4 2025 converting terms (read only, Part C). No budget, bid strategy or status change.
- Shopify history pulled (read-only): monthly orders, sales channel, referrer, UTM, products, discount codes, sessions and landing pages for Sep 2024 to Oct 2026 and the same-period and Q4 windows.
- Offer check: the ads use EARLYHOLIDAY20 (active since 2026-10-12, 1 order so far), "Order by Dec 15" (Facts table) and, if approved, "As Seen On FOX" (Facts table). EXTRA10 remains only in paused PMax groups and is not listed in offers-calendar.md.

## Proposed for approval

### P-ads-analyst-20261013-1
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-holiday-gifts-gift-page-and-code.md
- Reason: If approved, ads-analyst readies a Chrome task that points the 2 Holiday Gifts ads to the gift collection (6.3% checkout last holiday vs 2.3% now) and adds the live EARLYHOLIDAY20 code headline.
- Expires: 2026-10-20
- Status: pending

### P-ads-analyst-20261013-2
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-conversion-call-actions-secondary.md
- Reason: If approved, ads-analyst readies a Chrome task that sets the 2 Smart campaign call conversions to secondary, so Purchase is the only primary conversion before the holiday season.
- Expires: 2026-10-20
- Status: pending

## Blocked or unknown

- Adspirer: 150 of 150 included calls used (`get_usage_status`, resets 2026-11-06). No Google Ads or Google Analytics calls made this run (0 used, 0 left). Last year's Google campaign, keyword and impression-share data come from Part C of tonight's Chrome task, or from Eden's export (steps at the end of the audit).
- The Chrome routine (`memobrick-chrome-tasks` step 3) checks the named approval in queue.md. This task has no A- ID ("Approved by owner in chat 2026-10-13"), so the routine may mark it skipped. Coordinator: please record the chat approval in the queue; or Eden can paste the prompt from the task file into Claude in Chrome herself.
- Gmail needs re-authentication (could not read Google Ads monthly emails). Drive had no Google Ads exports.
- Why proof (draft-order) sales stopped in late May 2026: unknown. Needs Eden.
- How customers request a free proof (form, email, chat): unknown; needed for a proof-request conversion.
- Merchant Center feed status: not readable by me.
- About 1,100 direct sessions in the last 4 weeks landed on old URLs with trailing slashes and zero cart adds (for example /products/bricked-mosaic-portrait-10x10-yin-yan/, 639). Likely bots or broken links; worth a look by seo-technical or site-developer.

## Sales impact

Weak point addressed: orders at about a third of last year's pace (2.6 a day vs a 5-a-day goal). The search-term task stops about $15 to $25 a week of spend that never sold and should add 1 to 2 orders a week at the same spend. Proposal 1 adds about 1 order a week now and 3 to 5 a week from Nov 16. The biggest lever, the proof-sale path (up to 2 orders a day last year), is outside ads and needs Eden. Total ad spend is not raised.

## Next run

Friday 2026-10-16: read the search-term task's Result (Part C impression share and Q4 2025 terms), judge the first days of new keywords, create the Meta paused ad (A-2026W42-006) unless changed, and run the weekly Meta and Google review within quota (Google reads resume Nov 6).
