# ads-analyst 2026-10-16 (weekly review)

## Summary

Meta is losing on Shopify evidence: 7 days $511.91 spent, 1 Shopify order tagged facebook/paid ($116.29), ROAS 0.23 (28 days about 0.40); Meta itself reports 6 purchases / $776.52. The 4 Christmas ads have only $6.40 spend in 2 days, too early.
Google was not read this week (no snapshots, 0 Adspirer calls until Nov 6). Store: Oct 1 to 15 is 42 orders vs goal 75.
Nothing changed in any account this run. Numbers: `marketing/analytics/ads-analyst/2026-10-16-numbers.md`.

## Account summary

| | Last 7 days | Last 28 days |
|---|---|---|
| Meta spend | $511.91 | about $2,030 (Oct 14 figure) |
| Meta-reported purchases | 6 / $776.52 | not re-read |
| Shopify orders, facebook/paid UTM | 1 / $116.29 | 7 / $810.70 |
| Shopify-based Meta ROAS | 0.23 | about 0.40 (break-even 3.0) |
| Google spend | not read (Oct 12: $290.73) | $611.47 (to Oct 11) |
| Whole store | 20 orders / $2,912 | 57 orders |

Top 3 moves:
1. Decide on the Meta mix by Oct 20: Dog_vid is the only ad with a purchase; if the Christmas ads still get under $15 total by Oct 18, ask Meta to spread delivery (a separate ad set for the Christmas ads at $15/day taken from Proven Videos, total unchanged). I will propose it with the Oct 18 numbers.
2. Unblock Google: A-2026W42-019 (Holiday Gifts page and code) and the search-terms task A-2026W42-018 are both `needs owner` because the Save/Create clicks were blocked; both need Eden to run the pasted prompt by hand. Expires Oct 20.
3. Get the Mac data pull running (Google impression share, Search Console); without it I cannot split paid from organic Google.

## Done

- Status working, then this report.
- Approvals: A-2026W42-020, 026, 027 are done (Chrome results read; 026 ad B live, 027 segment created, asset group skipped by owner decision). 018 and 019 still need owner. 006: not done, see Blocked.
- Meta read through the free connector (account, campaign, ad level). Shopify read-only by UTM. Zero Adspirer calls. No account changes.
- Offer check: live Meta copy uses only EARLYHOLIDAY20 (active in offers-calendar.md, end date still unconfirmed). Nothing new found.
- Copy check passed on new files.

## Proposed for approval

### P-ads-analyst-20261016-1
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/meta-photo-to-mosaic-ad-existing-1x1.md
- Reason: If approved, ads-analyst creates one PAUSED Meta ad from the photo-to-mosaic video already in the account (1:1 crop), replacing A-2026W42-006 which cannot upload the 9:16 file; launching is separate.
- Expires: 2026-10-21
- Status: pending

## Blocked or unknown

- A-2026W42-006 not done: the Facebook connector cannot upload from Drive (no public URL, no file picker in a scheduled run) and I cannot view video to run the face check. Expires Oct 17; replaced by the item above.
- `marketing/data/` still has no snapshots; Oct 14 requests (Google impression share, Search Console) are unfulfilled, so Google was not read.
- Shopify referrer split by Google paid vs organic is unavailable in ShopifyQL here; UTM split used instead. Untagged paid clicks would show as no UTM, so Meta's Shopify ROAS may be understated, but Meta's own 6 purchases vs 1 tagged order is a gap to check (conversion-auditor / Meta CAPI).
- EARLYHOLIDAY20 end date and holiday budget unknown.

## Sales impact

Weak point: referred traffic fell (names ads-analyst). This run changed nothing live, so no direct order effect; it confirms Meta is not yet profitable and keeps spend flat at $60/day until the Christmas ads show results. The Google unblock (018, 019) is the nearest order-bringing action, about +1 order a week now and more from Nov 16.

## Next run

Daily pacing starts Nov 16; next weekly Oct 23. Check Christmas ad delivery on Oct 18 (propose ad set split if still starved), apply any approval, read the data snapshots if the Mac pull has run.
