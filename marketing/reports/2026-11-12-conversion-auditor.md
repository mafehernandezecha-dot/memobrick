# conversion-auditor 2026-11-12

## Summary
Of the 14 abandoned checkouts with shipping added from Nov 2 to 11, 5 had a discount code and 2 were at or over $125. Both of those had a code, so they paid shipping ($20.66 and $26.44) after the cart drawer had told them free shipping was unlocked.
Correction: free US shipping over $125 exists, as an automatic discount that does not combine with codes. My Nov 11 note was wrong.
The cart mentions the $125 threshold in the drawer only. It never says US only or that codes don't combine. One cart-line proposal is below.

## Done
- Task board (1), counts: done. Read-only abandoned checkouts Nov 2 to 11 (amounts and codes only, no customer fields): 16 in total, 14 with shipping added ($7.72 to $26.44, $190.48 in all). **With a code: 5** (EARLYHOLIDAY20 x2, two unique codes, one FB-EMAIL code). **At or over $125: 2**, both with a code ($164.88 to $131.91 after the code, +$20.66 shipping; $487.99 to $414.80, +$26.44). The other 9 were under $125 with no code (8 kits and one $0 proof line). Table in the audit, section 2.
- Task board (2), correction: done. The Nov 11 audit and report said there was no free-shipping rule. Wrong: the automatic discount "Free Shipping on US Orders Over $125" is active, and an Oct 28 $149 checkout shows it applied ($12.85 shipping discount). Codes do not combine with it. The correction is in the audit, section 1.
- Task board (3), cart check on phone and desktop: done. The drawer says "Add $25.12 more for free shipping". At $125 or more the live script says "You've unlocked free shipping! 🎉". Neither message says US only or mentions codes. `/cart` says only "Taxes are calculated at checkout." I proposed one change covering the drawer and cart lines: `site-changes/cart-free-shipping-code-line.md` (below).
- Phone checkout completion, Nov 9 to 11: 4 of 17 (24%), vs 8 of 13 (62%) on the same weekdays last year. Last week's low rate repeats.
- Live 20x20 walk on phone and desktop, stopped at the checkout page (no payment, no order). Every step was under 3 s except checkout, where the sandbox blocks Shopify's CDN and shop.app. No site errors. Screenshots: `marketing/conversion/auditor/2026-11-12/`.
- Audit: `marketing/conversion/auditor/audit-2026-11-12.md`.
- Approvals: the checker printed nothing for me as Executor.

## Proposed for approval

### P-conversion-auditor-20261112-1
- Agent: conversion-auditor
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/cart-free-shipping-code-line.md
- Reason: If approved, site-developer changes the cart drawer to "Add $X more for free US shipping." / "Your order ships free in the US." and adds "Discount codes can't be combined with free shipping." under the bar and on /cart, in a theme copy. Today the drawer promises free shipping that a code then removes at checkout, and Black Friday codes start Nov 27.
- Expires: 2026-11-30
- Status: pending

## Blocked or unknown
- Owner: the products "Memobrick Proof" and "Free MemoBrick Proof" are $0 but set to require shipping. A Nov 10 checkout of 5 "Memobrick Proof" was charged $8.95 shipping and abandoned. If proofs are digital, untick "This is a physical product" on both (Products > the proof product > Shipping). If they are meant to charge shipping, ignore this.
- Owner: since Oct 23, one $2,066 cart (50x60 + 70x60) was opened with about 40 guessed codes (FREE, SAVE25, WELCOME, CHRISTMAS, first names), and almost every try shows a 10% discount. It looks like a code guesser. Check in Discounts that short generic codes such as FREE, WELCOME, SAVE25 or HOLIDAY are not live. If they are, anyone can find them.
- Shipping on carts under $125 with no code (9 of 14 abandoned) stays at live carrier rates by owner decision (Facts, 2026-10-12). The proposed cart line only warns that shipping is added at checkout. If you want to test a flat US rate before Black Friday, that is your setting, and I will measure it.
- The live theme (t/215) differs from the repo theme folder, so site-developer must build from a fresh copy of the live theme (noted in the draft).
- GA4, Meta and Search Console snapshots: still none (`marketing/data/latest.md`). The GA4 checkout-steps request from Nov 11 is still open.
- No answer yet on the manual draft-order channel that stopped May 25 (Nov 11 report). It is still the largest lever, and only the owner can act on it.

## Sales impact
- Weak point: phone checkout completion is 24% this week vs 62% last year. This change fixes the one place where the site promises something checkout does not deliver: carts of $125 or more with a code, about 1 a week now and more Nov 27 to 30 when BRICKFRIDAY25 is live. I expect 1 to 2 more orders a week in the Black Friday weeks. That is a guess, to be measured as phone completion for 14 days after publish vs 14 days before.
- It does not fix shipping cost on carts under $125 with no code, which most abandoned checkouts are. Only a shipping setting can change that, and it is the owner's call.

## Next run
Wednesday 2026-11-18: full weekly funnel and walk. Re-check phone checkout completion for Nov 9 to 15 and abandoned checkouts by code and amount. Measure the cart line if it goes live. Read GA4 checkout steps if they have been pulled.
