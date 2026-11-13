# conversion-auditor 2026-11-13

## Summary
Phone review of the gift collection (task board): prices show without a tap, but there is no Christmas date, no free-shipping threshold and no first-screen button. Sizes take 13 screens of 70-character titles to compare.
The page now converts 10.5% to cart on phones (285 sessions, Nov 6 to 12), but only 4 of 17 phone checkouts became orders (8 of 15 last year).
No new proposal: pending A-2026W45-009 already fixes gaps 1 and 3 in one theme-copy change. It expires Nov 20.

## Done
- Task board, gift collection phone review: done. The 3-item list, the funnel and the evidence are in `marketing/conversion/auditor/audit-2026-11-13.md`. Screenshots are in `marketing/conversion/auditor/2026-11-13/`. It was read-only: no cart, no checkout, no photo uploaded.
  1. No Dec 15 order-by line on the collection. On the 20x20 product page it sits about 3 screens down (y 2,717).
  2. No free US shipping at $125 line on the collection or product pages. The best sellers (20x20 at $99.88, 16x16 at $69.88) are under it.
  3. No button on the first screen (the header button is hidden on phone, and the free proof link is at the very bottom). Sizes appear only in long titles across 23 tiles, about 1.5 tiles per screen.
- Checked fine: prices on every tile, the first one on screen one. The path tile, then "Design this in the creator", then the editor opened for 10x10 and 20x20. Load 2.8 s, product page 1.8 s, no site errors.
- Shopify funnel for sessions landing on the page, by device: last 7 days, 30 days, and the same 30 days last year. Table in the audit.
- Approvals: the checker printed nothing for me as Executor.
- Proposal: "no proposal" (see Sales impact). The weekly Wednesday full walk was done on Nov 11 and 12 and is next due Nov 18.

## Proposed for approval
None. The gaps found today are covered by pending A-2026W45-009 (collection start block: date, button, free proof link; expires Nov 20) and A-2026W46-017 (cart free-shipping line).

## Blocked or unknown
- Owner: A-2026W45-009 needs a free theme slot (20 of 20 used) and your publish. If A-2026W46-007 moves Meta traffic to this page on Nov 16, approving 009 by Nov 20 lets its test settle before Black Friday. It needs about 6 days at today's traffic.
- Owner, a merchandising setting with no code change: in Products > Collections > "the-gift-for-everyone", the gift card sits at tile 19 among $500+ kits. If you sort this collection manually, moving the gift card next to the 10x10 gives last-minute buyers a cheap option early. This is optional and untested.
- Free-shipping wording on product pages: not proposed today (one-proposal limit). If A-2026W46-017 is approved, I can propose the same line for the product page price area next.
- GA4, Meta and Search Console snapshots: still none (`marketing/data/latest.md` says "never"). The GA4 checkout-steps request from Nov 11 is still open.
- Sandbox: the Shop cart-sync and TikTok pixel scripts are blocked here. One of 3 editor taps hit a network error page and the 2 retries worked, so I do not count it as a site fault.

## Sales impact
- Weak point: this week needs about 24 more orders, and the goal rises to 12 a day on Nov 16, while Black Friday paid traffic is pointed at this page. Today's review adds no change of its own. It confirms that the pending A-2026W45-009 targets this page's real gaps, and that at today's traffic its test can decide within a week.
- As estimated on Nov 3: if the missing first-screen action and date are the cause, the change brings 1 to 3 more orders a week now and more in the Black Friday weeks. It is a guess, to be decided by test CA-20261103-01.
- The bigger loss on this page is after the cart (4 of 17 phone checkouts). That needs the owner's shipping call and A-2026W46-017, not a collection change.

## Next run
Wednesday 2026-11-18: full weekly funnel and walk. Re-check this page's phone funnel after A-2026W46-007 (if approved) and A-2026W45-009 (if live). Measure phone checkout completion for Nov 9 to 15.
