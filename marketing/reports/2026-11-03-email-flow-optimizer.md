# email-flow-optimizer 2026-11-03

## Summary
A-2026W44-062 (Checkout email 1) is still pending (expires 2026-11-13), so no Omnisend edits and no test is running.
Audited Abandoned Cart emails 1 to 3 (read-only) and proposed one test: cart email 1 clean designed version, sequenced after the checkout test.

## Done
- Approvals check: nothing approved for me.
- Eden note (Checkout email 1, A-2026W44-062): 3 lines. (1) Approving it removes five claims we cannot back up from the largest recovery email and swaps in a designed layout. (2) Expected effect: 97 reached checkout, 44 bought in 30 days, about 53 lost buyers; recovering 1 to 3 of them a month. (3) It must be live before the Black Friday sends to read in time; it lapses Nov 13.
- Cart audit (read-only, Omnisend content as of 2026-09-28 edits):
  - Email 1 "your mosaic is saved": first screen is good (headline plus the saved-design image). No Dec 15 date. Contains 740+ reviews, Fox/NBC/Yahoo, "Ships in 2-4 days from Miami", "Free replacements for life", "nothing is made until you approve", named quote. All CTAs go to plain /cart, which only shows the cart in the same browser. Three CTAs.
  - Email 2 "here's how it looks finished": gallery captioned "Real Memobrick customers" (if those are planner or AI images that presents them as real customers; owner to confirm), three named quotes, 740+ reviews twice, "a real Memobrick designer will build your mosaic". No Dec 15.
  - Email 3 "20% off your Memobrick (3 days)": 20% offer is active in the calendar and fine; same 740+, 2-4 business days, lifetime replacement and named quote claims. No Dec 15.
  - None of the three mentions the Dec 15 order-by date, a verified fact.
- Test proposed: `marketing/email/flow-optimizer/test-cart-first-email-clean-base.md` (EFO-20261103-01), draft `test-cart-first-email-clean-base-draft.md` with `-preview.html` and `-omnisend.html`. Row appended to experiments.md. check.py copy passes on both files.
- Numbers (2026-09-28 to 11-02, from last run): cart 47 / 44 / 35 sent, 4 / 6 / 3 clicks, 0 / 1 / 1 orders; checkout 79 / 68 / 71 sent, 1 order total.

## Proposed for approval
### P-email-flow-optimizer-20261103-1
- Agent: email-flow-optimizer
- Executor: email-flow-optimizer
- Type: send
- Draft: marketing/email/flow-optimizer/test-cart-first-email-clean-base-draft.md
- Reason: If approved, I switch off Abandoned Cart (64e86fedc0c2565cbe9d8ac8) for about 30 seconds, replace email 1 (content 64e86fed3e80b6e748f5b7cd) with this designed version that drops five unbackable claims and adds the true Dec 15 deadline, keep the saved-design block and cart link, and re-enable; emails 2 and 3 untouched. Starts after A-2026W44-062 has read, unless you say in chat both may run. Test plan EFO-20261103-01.
- Expires: 2026-11-24
- Status: pending

## Blocked or unknown
- Rendered PNG previews could not be made: headless Chrome timed out here (proxy blocks Google hosts), and the preview tool needed python3.13 because it fails on 3.11. The `-preview.html` and `-omnisend.html` files exist; the owner should check them before approving. Self-critique on phone layout is therefore unchecked.
- Review count, delivery timing, lifetime replacements, Loox quote permission, and whether the "Real Memobrick customers" gallery is real remain unverified.
- One-test rule: the cart test cannot start until the checkout test is decided and read, which may be late for the Dec 15 rush.
- Volumes are tiny; no result is statistically meaningful.

## Sales impact
Targets cart abandoners, the warmest lost buyers. Honest expectation 1 to 2 extra orders a month from email 1, plus removing compliance risk. Adds the Dec 15 deadline, a true urgency line. Does not address the traffic drop, the biggest weak point.

## Next run
Tuesday 2026-11-10. Apply approved items (062 first), else report numbers.
