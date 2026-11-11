# conversion-auditor 2026-11-11

## Summary
The May 18 case is not a site problem. The lost draft orders were orders staff typed in by hand and marked paid outside the Shopify checkout. They stopped after May 25 2026. Last year they were 51 orders ($6,595) in these 30 days, 44% of the gap with last year. Free-proof invoice orders are up (9 vs 5).
New this week: phone carts nearly doubled (53 vs 26 to 35 a week), but only 5 of 24 phone checkouts were completed. One smaller dog proposal is below.

## Done
- Task board (1), free-proof walk on phone and desktop: done, partly blocked. Home loads in 2.7 to 2.8 s. The proof link is on the first phone screen (y=477) and opens the proof view. The Hulk form cannot render in this sandbox because it blocks cdn.shopify.com, so I could not test submit or where requests go. Hulk updated itself (`hulkapps-80` to `-83`), and the form ID is unchanged. Screenshots: `marketing/conversion/auditor/2026-11-11/*-proof-0*.jpg`.
- Task board (2), dates: done. No page or theme was created or updated between Apr 2026 and Sep 20 2026. The Free Proof page was last updated 2026-09-23. Theme publish dates are not in the API (table in the audit, section 2).
- May 18 case, beyond the task: a read-only look at draft orders (date, amount, line item name and payment gateway only, no customer fields) showed three kinds of draft order: manual paid, Shopify Payments invoice, and $0 replacement parts. Only the manual paid kind collapsed. The last one was 2026-05-25.
- Task board (3), dog page smaller version: done. `site-changes/dog-editor-one-line.md`, proposed below. It replaces A-2026W44-067.
- Weekly funnel (Shopify, referred, Nov 3 to 9 vs last year) and the 20x20 path walk on phone and desktop, stopped at checkout. No site errors were found. Every step loaded in under 3 s except checkout, where the sandbox blocks Shopify's CDN.
- Audit: `marketing/conversion/auditor/audit-2026-11-11.md`. Experiment CA-20261111-01 appended. One GA4 line added to `marketing/data/requests.md` (checkout steps by device).
- Not re-proposed: the desktop editor header change from Nov 5. It would help only about 3 sessions a day, so it is not worth a queue slot before Black Friday. The owner can drop it.
- Approvals: none of my items is approved with me as Executor (the checker printed nothing).

## Proposed for approval

### P-conversion-auditor-20261111-1
- Agent: conversion-auditor
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/dog-editor-one-line.md
- Reason: If approved, site-developer adds `&from=dog` to the dog page's editor buttons and shows one line ("Upload your dog's photo. Your kit is $99.88, and you can change the size next.", with the live size price) above the editor upload box for those visitors only. This is the smaller, no-split version of A-2026W44-067: approve this one and reject 067.
- Expires: 2026-12-10
- Status: pending

## Blocked or unknown
- **Owner, the biggest item for orders:** in Shopify > Orders > Drafts, open any draft from April or early May 2026 with a line like "memobrick 16x16" at $82.10, marked paid manually. Where did these orders come from (a marketplace, a reseller or wholesale partner, phone or chat orders, someone who entered them for you), and why did they stop after May 25 2026? They ran at about 8 to 14 a week from at least Oct 2025. Last year Oct 12 to Nov 10 they were 51 orders and $6,595. If that channel can be switched back on before Nov 16, it is worth more than every site fix in the queue. The growth-analyst weak point "Draft orders (designer proof, then invoice) collapsed in May" should be renamed: the proof and invoice orders did not collapse.
- Owner: check which theme was live in May 2026 in Online Store > Themes. The API has no publish dates. This matters less now that the cause is not on the site.
- Owner: in Shopify > Orders > Abandoned checkouts, look at the 9 checkouts since Nov 2 where shipping was added ($9.74 to $20.66 on $28 to $132 carts) and the $1,859.40 checkout of Nov 11. Shipping is carrier-calculated (USPS and UPS live rates). No flat rate or free-shipping rule exists in the delivery profile, and none shows among the active discounts I could read. The cart says only "Taxes are calculated at checkout". If you want to test a flat US rate or free shipping over a threshold, that is your setting (Settings > Shipping and delivery > General profile > Domestic > Add rate). Tell me and I will propose the matching cart line.
- Free-proof form render, submit and notification address are not testable from this sandbox (cdn.shopify.com refused). The approved fallback A-2026W44-018 still waits on you publishing theme copy "Memobrick proof and cart fixes" (189322330332).
- GA4, Meta and Search Console snapshots: still none (`marketing/data/latest.md`: "never"). New request added for GA4 checkout steps by device.
- Housekeeping: a misquoted command in this run wrote four stray log files (`desktop-p20.json`, `desktop-p20.err`, `phone-p20.json`, `phone-p20.err`) to the sandbox root `/`, outside the repo. The safety check blocked removing them. They hold walk logs only and nothing is committed. Delete them if you want.

## Sales impact
- Weak point "draft orders collapsed": this run finds the cause. It is a manual sales channel that stopped on May 25, about 1.7 orders a day last year. Getting it back is the largest single lever toward 12 orders a day from Nov 16, and only the owner can do it. No site change will bring these orders back.
- Weak point "daily goal missed": phone checkout completion fell to 21% last week while carts rose. If it returns to the earlier 50%, that is about 7 more phone orders a week at today's carts. Next run checks whether it repeats, with GA4 steps if pulled.
- The dog proposal is small: under 1 order a week, and only if dog traffic returns.

## Next run
Wednesday 2026-11-18. Re-check phone checkout completion for the week of Nov 9. If it is low again, propose a cart shipping line (or an owner shipping test). Read the GA4 checkout steps if pulled. Record the owner's answer on the manual-order channel.
