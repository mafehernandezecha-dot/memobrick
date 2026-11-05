# email-flow-optimizer 2026-11-05

## Summary
No flow test is running and nothing was approved for me, so no Omnisend edits. A-2026W44-062 (Checkout) and the cart item are still pending.
Task board: audited Welcome email 1 (read-only) and proposed one welcome test. Welcome email 1 is the only converting email in scope: 12 attributed orders from 82 sent since Sep 28.

## Done
- Approvals check: nothing approved for email-flow-optimizer.
- Welcome audit (read-only, Omnisend 2026-11-05). Flow enabled, 3 emails (immediate, +3d, +3d), once per contact, exits on order. 90-day numbers by email:

| Email | Sent | Opens (unique) | Clicks (unique) | Orders | Revenue | Unsubs |
|---|---|---|---|---|---|---|
| 1 "your 20% off is inside" | 181 | 49 | 10 | 14 | $1,262.01 | 1 |
| 2 "the gift that made her cry" | 150 | 33 | 2 | 1 | $176.42 | 0 |
| 3 "your 20% ends in 48 hours" | 41 | 5 | 0 | 0 | $0 | 0 |

  Since the Sep 28 edit: email 1 82 sent, 4 clicks, 12 orders, $1,110.83; email 2 48 sent, 1 click, 1 order; email 3 41 sent, 0 orders. Orders exceed clicks, so attribution includes view-through or code use; read the trend only. Complaints 0, 3 failed sends.
- Email 1 first screen: logo, headline "Welcome, X. Here's 20% off.", code block, button to /pages/editor (good: editor, not cart). Prices on size cards match today's Shopify (build-at-home) minus 20%. Dec 15 date absent. Unbacked claims: 4.8 from 740+ reviews, "As seen on Fox News, NBC and Yahoo", "Ships in 2-4 days", "Free replacements for life", "Nothing is made until you approve", Hope E. quote, "Our most-loved size". Emails 2 and 3 carry the same family of claims plus named quotes and a gallery captioned "Real Memobrick customers". Full table in the test file.
- Test proposed: `marketing/email/flow-optimizer/test-welcome-first-email-claims-fix.md` (EFO-20261105-01) and draft `test-welcome-first-email-claims-fix-draft.md` with `-preview.png`, `-preview-phone.png`, `-preview.html`, `-omnisend.html`. Deliberately a minimal edit: layout, subject, code and images stay, because this email earns the revenue. Row appended to experiments.md. check.py copy passes on both files. I viewed both PNGs: one button, readable on a phone, no unverified claim.

## Proposed for approval
### P-email-flow-optimizer-20261105-1
- Agent: email-flow-optimizer
- Executor: email-flow-optimizer
- Type: send
- Draft: marketing/email/flow-optimizer/test-welcome-first-email-claims-fix-draft.md
- Reason: If approved, I switch off Welcome for memobrick (614cb885f5765e001ced4218) for about 30 seconds, edit email 1 (content 63d8b9065841937e196a9da8) to remove the trust row, three promise tiles, Hope E. quote and superlative card labels, add kit contents, the Dec 15 date and the code terms, keep the 20% code block, subject, images and links, and re-enable; emails 2 and 3 untouched. Test plan EFO-20261105-01. Owner: choose the order against the Checkout (062) and Cart items, since only one flow test runs at a time. My recommendation: welcome first, it carries the most revenue and the change is smallest.
- Expires: 2026-11-24
- Status: pending

## Blocked or unknown
- The preview tool's own screenshot step hangs here (Google fonts blocked by the proxy). I made the PNGs by running headless Chrome on the preview HTML with the font link removed, so they use Georgia and Helvetica instead of Playfair. The tool also needs python3.13.
- The preview cannot render Omnisend's native 20% code block and the live camera-roll image; a band and a product photo stand in.
- Owner inputs still needed: review count and Loox quote permission, delivery timing, replacements policy, and whether the Welcome 20% code (7, 4 and 2 day versions) should be listed as active in offers-calendar.md (it is not listed today).
- Welcome volume is about 16 sends a week; no result is statistically meaningful.

## Sales impact
Protects the one email that brings orders (about $1.1k attributed since Sep 28) while removing claims the brand rules forbid, and adds the true Dec 15 deadline for Christmas gift buyers. Expected effect is flat to a small lift, not a big one. Does not address the traffic drop. Honest note: if you only approve one email change, this carries the most dollars but also the most to lose, which is why it is a minimal edit.

## Next run
Tuesday 2026-11-10. Apply approved items, else report the numbers.
