# conversion-auditor 2026-10-31

## Summary
- The dog page passes the walk on phone and desktop (button on the first screen, price shown, editor, cart and checkout page all work). Its 0 carts from 51 Facebook and Instagram sessions is a signal but not proof: about 2 carts were expected at the site's 4.6% social phone rate.
- Last 7 days: 60 add to carts vs 146 last year (2.6% vs 8.9%), 13 purchases vs 28. Search converts at 8.4%, social at 4.2%; the path after the cart is healthy.
- One proposal: keep the dog message and the price on the editor's first screen, as an A/B test.

## Done
- Task board (Oct 30): walked dog page (with Dog v4 style UTMs), Calm Build Gift, the Christmas article and a ready-made page on phone and desktop; pass or fail per page and screenshots in `marketing/conversion/auditor/audit-2026-10-31.md` and `marketing/conversion/auditor/2026-10-31/`. Done. The Dog v4 ad's real URL is not in any file, so I used UTMs I chose (stated in the audit).
- Funnel from Shopify for the last 7 days vs last year, by device, source, landing page and dog page by source.
- New tool `marketing/conversion/auditor/tools/landing-check.mjs`; `journey.mjs` now accepts `url:<page>` as a start.
- Follow-up: the ready-made "own photo" link is live on the yin-yan page; too early to read.

## Proposed for approval

### P-conversion-auditor-20261031-1
- Agent: conversion-auditor
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/dog-page-editor-continuity.md
- Reason: If approved, site-developer builds in a theme copy a change that shows "Upload your dog's photo" and the kit price on the editor's first screen, only for visitors who come from the dog page, shown to half of them as test CA-20261031-01; today that screen is generic and the dog page has 0 carts from 51 social sessions.
- Expires: 2026-11-18
- Status: pending

## Blocked or unknown
- No GA4, Meta or Search Console snapshots exist yet (`marketing/data/latest.md` says never), so I cannot see editor starts from the dog page. Open lines in `marketing/data/requests.md` cover it; I added none new.
- The real Dog v4 ad link: Daniel to paste it so I can open it exactly.
- Owner: check on a real phone that the cart shows the design picture (the sandbox shows alt text), and the Hulk free-proof form and page speed, as open since Oct 26.
- Whether the dog page's social visitors are real people or in-app browser crawlers is unknown; Shopify cannot split it.

## Sales impact
- Weak point: referred sessions down and add to cart weakest. The dog page is not broken, so the site is not the main loss. Expected effect of the proposal is under 1 order a week at current traffic; its value is settling by about Nov 24 whether dog traffic needs a different page. The bigger order lever is the ad and post match (social 4.2% vs search 8.4%), for ads-analyst.

## Next run
- Wednesday Nov 4: weekly funnel, dog page carts for Oct 31 to Nov 3 (decision rule: if 100+ social sessions and still 0 carts, treat as a page or ad-match fault and escalate), calm and article pages if they get traffic, snapshots if they exist.
