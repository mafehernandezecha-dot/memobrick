# Conversion auditor 2026-11-03

## Summary
- Gift collection page (192 sessions, 12 carts, 6.3%; phone 5.7%) has no button, date or instruction on its first phone screen and is 25 tiles long. One A/B change proposed.
- Whole site: add to cart 4.1% vs 10.3% last year; search buyers convert at 10.6%, social at 3.2%. After the cart the path is healthy.
- Walked size page to checkout on phone and desktop with a generated image: works, no errors found.

## Done
- Task board item done: audited the gift collection page (phone and desktop screenshots, product order, Dec 15 absent, proof offer only in the footer) and wrote one proposal.
- Funnel for 7 days by device, source and landing page, and last year's week. Journey walk with timings: `marketing/conversion/auditor/2026-11-03/`. Audit: `marketing/conversion/auditor/audit-2026-11-03.md`.
- P-conversion-auditor-20261031-1 (dog editor) has not lapsed (A-2026W44-067 pending, expires Nov 18), so not proposed again.
- Appended CA-20261103-01 to `marketing/shared/experiments.md`. Added tool `marketing/conversion/auditor/tools/collection-walk.mjs`.

## Proposed for approval
### P-conversion-auditor-20261103-1
- Agent: conversion-auditor
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/collection-gift-start-block.md
- Reason: If approved, Jenny builds in a theme copy a start block (instruction line, "Order by December 15 to get it before Christmas", red "Create My MemoBrick" button, free proof link) at the top of /collections/the-gift-for-everyone, shown to half the visitors as test CA-20261103-01; today the phone first screen has no button or date and the page converts 5.7% on phones.
- Expires: 2026-11-20
- Status: pending

## Blocked or unknown
- No GA4, Meta or Search Console snapshots exist yet (`marketing/data/latest.md` "never"); requests stay open in `marketing/data/requests.md`. Shopify is used alone.
- Design choice sheet and email gate did not appear in this week's walk (they did last week). Unknown if the live flow changed or only the test state. Owner or Jenny: say if the email gate was removed on purpose.
- Collection tiles open the product page because the theme's editor shortcut no longer matches the live titles. Unknown if the shortcut is wanted; not proposed.
- Cannot test the real Facebook or Instagram in-app browser or iPhone from here.
- Owner steps: none new. A-2026W44-018 and 019 still wait for a free theme slot (Jenny's list of deletable themes).

## Sales impact
Targets the second best landing page (192 sessions a week). If the start block lifts phone add to cart from 5.7% toward 10%, that is about 5 to 9 carts and 1 to 3 orders a week, more in Black Friday weeks. It is a guess, so it is a test with a rule. It does not touch the bigger loss (traffic quality, social 3.2%), which sits with ads-analyst and growth-director.

## Next run
Check whether A-2026W44-067 and P-conversion-auditor-20261103-1 were decided; read the funnel step of any fix that went live; check whether the email gate and design choice sheet are back; audit the Black Friday path (code EARLYHOLIDAY20 until Nov 22) on phone.
