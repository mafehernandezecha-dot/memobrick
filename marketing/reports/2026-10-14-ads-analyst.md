# ads-analyst 2026-10-14 (audience plan, owner request)

Chrome tasks: `marketing/analytics/ads-analyst/chrome-tasks/2026-10-13-conversion-call-actions-secondary.md` (rewritten, Status: ready, A-2026W42-020). Drafts awaiting approval: `chrome-tasks/2026-10-14-holiday-gifts-occasion-ads.md`, `chrome-tasks/2026-10-14-pmax-christmas-signals.md`.

## Summary

Visits fell because Google shows our ads far less (lost to ad rank, not budget: PMax 86%, Holiday Gifts 76%) and Meta spends 56% less on evergreen ads with no Christmas message (Google search visits -76%, Facebook -52%, Sep 14 to Oct 13 YoY).
Plan: buyer-led Christmas ads (family, partner, pet, mom and grandparents) from last year's best videos, consolidate Meta onto the cheaper campaign, occasion copy and audience signals on Google. Total spend unchanged.
Full plan: `marketing/analytics/ads-analyst/audience-plan-2026-10-14.md`. Numbers: `marketing/analytics/ads-analyst/2026-10-14-numbers.md`.

## Account summary

| | Last 7 days (to Oct 12) | Last 28 days |
|---|---|---|
| Meta spend | $549.01 (PROMO -v1 $400.06, Proven Videos $105.94, retargeting $43.01) | about $2,030 |
| Google spend | not read (no free calls; Oct 12 pull: $290.73 for 7 days) | $611.47 (to Oct 11) |
| Shopify orders with Meta UTMs | | 9 / $995.48 (Sep 16 to Oct 13) |
| Shopify Google-referrer orders (paid and organic mixed) | 6 / $765.75 (Oct 12 numbers) | 15 / $1,557.13 |
| Shopify-based ROAS | Meta about 0.49 (28 days); Google at most 2.55 ($1,557 / $611, upper bound because it includes organic) | |
| Whole store | 20 orders / $2,269.56 (to Oct 11) | 48 / $5,071.41 |

The 3 most important moves:
1. Launch Christmas gift ads on Meta for our buyer (P-ads-analyst-20261014-2, created paused, launch Oct 20).
2. Pause ALWAYON PROMO -v1 and move its $20 into Proven Videos (P-ads-analyst-20261014-1, same total).
3. Unblock the approved Holiday Gifts landing page fix and add occasion ads on Google (A-2026W42-019, P-ads-analyst-20261014-3).

## Done

- Status set to working and pushed (87c06ee).
- Approvals (`check.py approvals --agent ads-analyst --today 2026-10-14` printed A-2026W42-018, 019, 020, 001, 002, 003, 005, 006):
  - A-2026W42-001, 002, 003, 005: already applied (Oct 12 and 13). Read-back today: ALWAYON PROMO -v1 daily budget $20 (spent $19.99 on Oct 12). Coordinator can archive.
  - A-2026W42-018 (search terms): Chrome task still `Status: ready`; not run yet. Nothing for me to do until it runs.
  - A-2026W42-019 (Holiday Gifts landing page and code): Chrome task `needs owner`; the save click was blocked by Claude Code's permission check, nothing saved. Needs Eden (allow save clicks for the routine and reset to ready, or edit by hand). Expires Oct 20.
  - A-2026W42-020 (call conversions to secondary): the detail pages say Google-created actions cannot be edited. Rewrote the same change with a second path (Action optimization cell in the conversions list; if that fails, read-only check of the "Phone call leads" goal) and set the task back to `Status: ready`.
  - A-2026W42-006 (Meta paused photo-to-mosaic ad): still deferred to Friday's run (expires Oct 17). Not duplicated by today's Christmas ads, which reuse different videos.
- Meta read through the free Facebook connector: campaigns, ad sets, ads (7, 28, 90 days), age and gender, placements, last holiday by campaign, ad set and ad, same 30 days last year, ad set learning state, creatives, Opportunity Score (96, one CAPI match recommendation), benchmark and trend checks. No Meta changes made (none approved this run).
- Shopify (read-only): sessions by source both years, social landing pages (now and last holiday), Meta UTM orders.
- Zero Adspirer calls. Added two lines to `marketing/data/requests.md` for tomorrow's 7:07 pull: Google Ads impression share, CTR, auction insights and Quality Score both years; Search Console both years.
- Offer check: new copy uses only EARLYHOLIDAY20 (active), "Order by Dec 15" and "As seen on FOX" (Facts table), free proof as optional. BEMYVALENTINE is not listed in offers-calendar.md, so the Valentine's plan waits for Eden. Old EARLYBIRD20 creatives (not active) remain in the Meta account but in no active ad; the paused retargeting campaign must not be resumed with them.
- Copy check passed (`check.py copy`, exit 0) on all four change files, both new Chrome task drafts and the plan.

## Proposed for approval

### P-ads-analyst-20261014-1
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/meta-consolidate-into-proven-videos.md
- Reason: If approved, ads-analyst pauses Meta ALWAYON PROMO -v1 (Shopify ROAS about 1.06, learning limited), raises Proven Videos from $40 to $60 a day (total Meta spend unchanged at $60), pauses one ad with LEGO hashtags, and launches copies of the 2 cheapest PROMO ads in Proven Videos, via the Meta connector.
- Expires: 2026-10-19
- Status: pending

### P-ads-analyst-20261014-2
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/meta-christmas-family-ads-paused.md
- Reason: If approved, ads-analyst creates 4 Christmas gift ads (family, partner, pet, mom and grandparents) PAUSED in Proven Videos from last year's best videos, with Order by Dec 15, EARLYHOLIDAY20 and As seen on FOX; launching them is a separate approval.
- Expires: 2026-10-21
- Status: pending

### P-ads-analyst-20261014-3
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-holiday-gifts-occasion-ads.md
- Reason: If approved, ads-analyst readies a Chrome task that adds and launches one buyer-occasion search ad (mom, partner, grandparents, pet, Christmas) per Holiday Gifts ad group, landing on the gift collection, same $10/day.
- Expires: 2026-10-21
- Status: pending

### P-ads-analyst-20261014-4
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-pmax-christmas-signals.md
- Reason: If approved, ads-analyst readies a Chrome task that adds a buyer search-term audience signal to PMax #2 and launches one Christmas Gifts asset group on the gift collection, inside the same budget, to win back impressions lost to ad rank.
- Expires: 2026-10-21
- Status: pending

## Blocked or unknown

- Adspirer: 0 free calls until Nov 6; no Google Ads or GA4 reads. `marketing/data/` has no snapshots yet (latest.md: "Updated: never"), so last year's Google impression share, CTR and Search Console are unknown until the Mac pull fulfils today's requests.
- A-2026W42-019 blocked by Claude Code's permission check on the Google Ads save click (needs Eden).
- Meta landing URLs of the live ads were not returned by the connector (creative link fields empty); the conversion-auditor's request covers them.
- Meta landing page views are 76% of link clicks (93% last year): possible slow mobile load or broken redirects; worth a site-developer check.
- EARLYHOLIDAY20 end date unconfirmed; holiday ad budget unknown; BEMYVALENTINE not listed; Merchant Center not readable by me.
- `marketing/social/planner/audience-insights.md` does not exist yet; organic results start with W42.

## Sales impact

Weak point addressed: "Referred traffic fell by almost two thirds" (names ads-analyst). Expected, at today's spend: Meta consolidation +5 visits a day and +0.5 to 1 order a week now; Meta Christmas ads, once launched Oct 20, about 1 Shopify-tracked order a day if they reach last holiday's $30 per Meta purchase; Google occasion ads plus the approved landing page fix +1 order a week now and +3 to 5 a week from Nov 16; PMax signal and Christmas group +1 to 2 a week. These are estimates on small samples; I judge each on Shopify orders 7 days after it goes live. Total ad spend is not raised.

## Next run

Friday 2026-10-16: weekly review; apply any approved items from today (Meta via connector, Google tasks set to ready); create the A-2026W42-006 paused ad; read the data pull (Google impression share, Search Console) if it ran; ask Hugo for 4:5 and 9:16 cuts before proposing the Christmas ads' launch for Oct 20.


# ads-analyst 2026-10-14, second run (approved changes applied)

Chrome tasks set to ready: `marketing/analytics/ads-analyst/chrome-tasks/2026-10-14-holiday-gifts-occasion-ads.md` (A-2026W42-026) and `marketing/analytics/ads-analyst/chrome-tasks/2026-10-14-pmax-christmas-signals.md` (A-2026W42-027).

## Summary

Eden approved P-ads-analyst-20261014-1 to -4 in chat ("make them work on the ads as well, the traffic needs to improve today"); queued as A-2026W42-024 to 027, all approved.
Meta is now one campaign at $60/day (same total) with 4 new Christmas ads live plus the POV ad. PROMO -v1 and the LEGO-hashtag ad are paused.
Both Google changes are written as ready Chrome tasks, each with a short prompt Eden can paste into Claude in Chrome by hand.

## Done

- A-2026W42-024 (Meta consolidation): PROMO -v1 paused, Proven Videos $40 to $60, "PV, pinkdog_video" (LEGO hashtags) paused, "PV, POV reasons" created and launched. The budget edit force-paused Proven Videos; I reactivated it within a minute. The "MEN" ad could not be copied: its creative is a page post with no website link, which Meta refuses in a Sales campaign. Before and after: `marketing/analytics/ads-analyst/changes/meta-consolidate-into-proven-videos.md`.
- A-2026W42-025 (Meta Christmas ads): 4 ads created and launched now, as Eden asked in chat, inside the $60/day: XMAS, Family; XMAS, Partner; XMAS, Pet; XMAS, Grandparents. All land on the gift collection with Order by Dec 15, 20% off with code EARLYHOLIDAY20 (no end date stated) and "As seen on FOX" (never "Fox News"). FOX moved into the primary text because Facebook Feed hides the description line. Read back: all ACTIVE, in Meta review. Details: `marketing/analytics/ads-analyst/changes/meta-christmas-family-ads-paused.md`.
- A-2026W42-026 and 027 (Google): Chrome tasks set to `Status: ready` with their A- IDs. Each one starts with a short "Run it now" prompt that works pasted into the Claude in Chrome extension by hand, and tells the scheduled Mac run to stop and mark `needs owner` if the permission check blocks a Save click, instead of retrying.
- Copy check passed (exit 0) on the Christmas ad file and both Chrome tasks. Google text lengths checked (headlines 30 characters or fewer, descriptions 90 or fewer).
- Zero Adspirer calls. No spend increase anywhere.

## Proposed for approval

None.

## Blocked or unknown

- A-2026W42-019 (Holiday Gifts landing page and EARLYHOLIDAY20 headline, expires Oct 20) is still `needs owner`: the Mac run's permission check blocked the Save click on Oct 13. Eden can paste its prompt into Claude in Chrome by hand, or allow Google Ads save clicks for the routine and set the task back to `Status: ready`. It matters most: the Holiday Gifts ads still land on /products/2-2-boards.
- "PV, MEN post" not created (no website link on that creative). Fixing it would need a new creative with a link, which means new copy and a new approval.
- The connector lists no Instagram account for this ad account, so the new creatives have none set. Meta's preview still shows Instagram placements; delivery there is unconfirmed.
- New video thumbnails are Meta's small cover frames (could not download full-size frames from here). Videos autoplay in Feed, so impact should be small. A 4:5 and 9:16 cut from Hugo would still help.
- EARLYHOLIDAY20 end date still unconfirmed. If Eden sets one before Dec 15, the 4 Christmas ads must be replaced that day.

## Sales impact

Weak point: referred traffic fell by almost two thirds (names ads-analyst). The same $60/day now buys cheaper reach (Proven Videos CPM $13.71 vs $24.34 on PROMO -v1), so about +5 Facebook visits a day, and the first Christmas, order-by-date and code message our buyers have seen this season. If the Christmas ads reach last holiday's $30 per Meta purchase, that is about 2 Meta purchases a day, which has meant about 1 Shopify-tracked order a day. Google: occasion ads plus the PMax Christmas group and buyer signal, once applied, about +1 to 3 orders a week. These are estimates on small samples. I judge each on Shopify orders 7 days after it goes live.

## Next run

Tomorrow 2026-10-15: check Meta review status and first-day delivery of the 4 XMAS ads and the POV ad (spend, link clicks, CTR, landing page views vs clicks), and Shopify orders with utm_campaign 120252562193330597. Check whether the Google tasks ran (Status done or needs owner) and close or follow up. Friday 2026-10-16: weekly review.
