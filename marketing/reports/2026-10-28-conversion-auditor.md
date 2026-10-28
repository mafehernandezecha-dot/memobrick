# conversion-auditor 2026-10-28

## Summary
- The site path works on phone and desktop (kit page or home to editor to cart to checkout, no errors). The loss is visitors: Google search sessions -67%, Facebook -27%, Instagram -64%, 16x16 board page -88% vs last year. Visitors who arrive still add to cart at 8% from Google but only 4% from Facebook (9% last year).
- Last 7 days: 98 add to carts vs 195 last year, 18 purchases vs 42. Phone cart to checkout is 60% (target 65%); phone home page add to cart is up to 8.8% from 6.8% after the button moved above the fold.
- One new proposal: a text link to the editor on ready-made design pages, run as an A/B test.

## Done
- Approvals: no approved items for conversion-auditor in this run.
- Funnel from Shopify for 7 and 30 days vs last year, by device, source and landing page: `marketing/conversion/auditor/audit-2026-10-28.md`.
- Walks on phone (390x844) and desktop (1440x900) from the 20x20 kit page and from the home page, to the checkout page (stopped there), plus the ready-made design pages. Screenshots in `marketing/conversion/auditor/2026-10-28/`. New script `marketing/conversion/auditor/tools/ready-made-check.mjs`; Chromium path in the three tools updated to the installed build.
- Follow-up on the Oct 20 cart change, the Oct 12 home button fix and the Oct 23 kit page buttons (in the audit).

## Proposed for approval

### P-conversion-auditor-20261028-1
- Agent: conversion-auditor
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/ready-made-own-photo-link.md
- Reason: If approved, site-developer adds a text link "Want it with your own photo? Make yours in the editor" under Buy now on ready-made design pages, shown to half of visitors as test CA-20261028-01, built in a theme copy for Eden to publish; these pages (about 640 sessions a month on two of them) have no path to the editor today.
- Expires: 2026-11-18
- Status: pending

Still pending from Oct 26: P-conversion-auditor-20261026-1 and -2.

## Blocked or unknown
- No GA4, Search Console or Meta snapshots exist (`marketing/data/latest.md` says never pulled). Existing lines in `marketing/data/requests.md` remain open. Without Search Console I cannot say which queries lost Google traffic.
- Owner: the Hulk free-proof form real-phone test from the Oct 26 report is still needed. Also check the kit and home pages on a real phone for speed (the sandbox timings are inflated and Shop Pay and Hulk cannot load here).
- Sessions with no device type (about 700 a week) and no referrer (about 2,100 a week) look like bots; Shopify cannot filter them, so all-session add-to-cart rates are understated. Referred-only rates are used for decisions.

## Sales impact
- Weak point addressed: "Referred traffic down 53%, add-to-cart and search weakest". The audit shows the checkout and path are healthy (checkout to purchase 44% vs 39%), so the recoverable orders are in Google search and Facebook traffic and landing match, which are for ads-analyst and seo-strategist. Order of size: Google search about 20 orders a month at last year's rates, Facebook about 10.
- The one site proposal is a small test; expected effect 0 to 5 orders a month, and the test decides.

## Next run
- Wednesday Nov 4: weekly funnel, follow-up on test CA-20261028-01 if released, GA4 and Search Console snapshots if they exist, Eden's free-proof result.
