# conversion-auditor 2026-10-26

## Summary
- The draft-order drop (-86%) is the Etsy shop, permanently suspended May 18 2026: last year 99 of 126 "draft orders" were Etsy sales keyed in by hand (paid "manual"); since June there are none. Real proof-then-invoice orders went 14 to 11, and the free-proof form gets as many submissions as last year.
- Oct 20 and 21 kit orders all have their design or photo; one Oct 23 order (#21109) has a second kit line with nothing attached. The editor attaches the design on phone and desktop.
- The Hulk form could not render here (sandbox blocks cdn.shopify.com). Two small safety fixes are proposed; Eden's real-phone TEST submission is still needed.

## Done
- Approvals: no approved items for conversion-auditor.
- Draft orders by week, fall 2026 vs fall 2025, from Shopify, split by payment method; matched to Etsy sale emails by amount and date (counts only, no customer details kept). Table and evidence: `marketing/conversion/auditor/audit-2026-10-26.md`.
- Free-proof form volume from Hulk's monthly submission emails (2025 and 2026). Walked home page "Not sure yet? Get a free design proof first", the free-proof view and `/pages/free-preview` on phone and desktop. Nothing submitted. New script `marketing/conversion/auditor/tools/freeproof-walk.mjs`.
- Checked every order Oct 19 to 25 by line property keys and path. No Oct 20 or 21 web order lacks its design; #21109 (Oct 23) has an empty second kit line.
- Editor add-to-cart check on phone and desktop with a generated image: cart lines carry Design ID, _design, Final Design and _Build Instructions. New script `marketing/conversion/auditor/tools/attach-check.mjs`. Full walks with `journey.mjs` to the checkout page (stopped there).
- Confirmed the kit page fix is still live in the new theme (both creator buttons, no Buy now).
- Follow-up: phone cart to checkout Oct 19 to 25 is 63% (45% the week before), near the 65% target set for the Oct 20 cart change.
- Screenshots: `marketing/conversion/auditor/2026-10-26/`.

## Proposed for approval

### P-conversion-auditor-20261026-1
- Agent: conversion-auditor
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/freeproof-form-fallback.md
- Reason: If approved, site-developer adds a fallback message and "Email my photo for a free proof" button that appears only when the Hulk free-proof form has not loaded after 8 seconds, on /pages/free-preview and the homepage proof view, in a theme copy for Eden to publish; today a failed form is a blank box, and Hulk warns after every theme publish.
- Expires: 2026-11-15
- Status: pending

### P-conversion-auditor-20261026-2
- Agent: conversion-auditor
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/cart-kit-missing-photo-notice.md
- Reason: If approved, site-developer makes the cart page show "This kit has no photo yet. Add your photo" on any custom kit line with no design or photo attached, in a theme copy for Eden to publish, so photo-less kits like the second line of #21109 are caught before payment ahead of the December rush.
- Expires: 2026-11-30
- Status: pending

## Blocked or unknown
- Free-proof form not testable here: the Hulk script loads from cdn.shopify.com, which this environment blocks. Eden, on a real phone and a computer (5 minutes each):
  1. Open https://mymemobrick.com, tap "Not sure yet? Get a free design proof first". Check the form appears, the photo upload accepts a picture (use any non-personal picture), and fill name "TEST Eden", email your own address, note "TEST please ignore".
  2. Submit. Check a confirmation shows on screen.
  3. Check the notification arrives in the inbox the designers read (Hulk app > Forms > Free Proof > Email notifications). Note: I found no Hulk submission notifications in support@ inbox, only Hulk's monthly reports, so the notifications go somewhere else or are off. Confirm someone reads that address.
  4. Repeat on /pages/free-preview on a computer.
  5. In Hulk app > Submissions, count September and October submissions (the Oct 1 monthly report did not arrive) and compare with the 15 to 30 a month before.
- The draft-order weak point needs re-framing by the owner and coordinator, not a site fix: the lost orders are the Etsy channel (about 12 orders and roughly $1,400 net sales a week last fall). Owner decisions: whether to replace it (another marketplace, with IP-safe listings that never use "LEGO" or other brand names, the reason Etsy gave), or put that demand into Google Shopping and search. Growth-analyst should report draft orders as two lines ("proof invoices" and "manual entries") so the sales plan stops counting the Etsy loss as a conversion problem. Last year's totals in `sales/latest.json` include those Etsy orders, so the year-on-year gap is about 12 orders a week bigger than what the site can win back.
- Eden: look at order #21109 (Oct 23). Its second kit line (20x30 Vertical) has no photo or design attached; ask the customer if it needs its own photo.
- Shop Pay checkout and the cart design picture load only on a real device (blocked here), as before.
- No GA4 or Meta snapshot (`marketing/data/latest.md` still "never"); requests already open in `marketing/data/requests.md`.

## Sales impact
- Biggest effect is on decisions: the coordinator's lever #1 expected +5 to 10 orders a week from fixing the proof flow, but the proof flow is not broken by any measure available (submissions steady, 10 of 11 invoices paid, proof orders down 21% like traffic). Those orders were Etsy's and will not come back from site work. Effort should move to traffic (search, social, ads) and to a decision on a replacement marketplace.
- The two site changes are insurance: the form fallback protects the 4 to 6 proof orders a month if the Hulk form ever fails; the cart notice prevents photo-less paid orders. Expected effect under 1 order a week each.
- Phone cart to checkout is back to 63%, so the Oct 20 cart change is working.

## Next run
- Wednesday Oct 28 weekly audit: funnel by landing page and referrer, the Oct 27 cart check (65% target over 7 days), and Eden's free-proof TEST result if done.
