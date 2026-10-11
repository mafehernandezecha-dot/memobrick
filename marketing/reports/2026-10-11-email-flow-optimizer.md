# DRY RUN: email-flow-optimizer 2026-10-11

## Summary

First run: 90-day review of the six in-scope Omnisend flows. Together they were credited with 11 purchases ($1,335.12) from 1,235 delivered emails (0.89% purchases per delivered email), out of 202 store orders.
Both 20% last emails (cart and checkout) delivered 164 times with 0 purchases. One test proposed: reassurance vs discount in the Abandoned Cart last email.

## Done

- Followed memobrick-run in dry run mode: skipped step 1 (git pull), step 3 (approvals), and step 8 (commit/push), as the dry run instruction says. Loaded memobrick-brand. Read inputs: experiments.md (empty), offers-calendar.md, Shopify 90-day aggregate (202 orders, $20,164.72 net sales).
- Omnisend, read-only: `get_automations_id` for all six flows, `post_analytics_reports` (last90Days, by flow and email), `get_email_content_id` for all 12 emails. `tool_schema` and `tool_documentation` were called before the first `execute` of each tool. No create, patch, put, enable, disable, copy, delete, or send calls. Post-Purchase and order notifications were not touched.
- Wrote `marketing/email/flow-optimizer/review-2026-10-11.md` (tables per flow and email, content checks, top three improvements).
- Wrote `marketing/email/flow-optimizer/test-cart-last-email-reassurance.md`. `check.py copy` passed.
- Appended row EFO-20261011-01 to `marketing/shared/experiments.md` (Result blank).

Per-flow results (90 days):

| Flow | Delivered | Purchases | Revenue | Purch/delivered | Revenue/recipient |
|---|---|---|---|---|---|
| Welcome | 342 | 6 | $590.62 | 1.75% | $3.47 |
| Browse Abandonment | 72 | 0 | $0 | 0.00% | $0.00 |
| Abandoned Cart | 283 | 1 | $88.78 | 0.35% | $0.90 |
| Abandoned Checkout | 239 | 4 | $655.72 | 1.67% | $7.90 |
| Reactivation | 299 | 0 | $0 | 0.00% | $0.00 |
| Back in Stock | 0 | 0 | $0 | n/a | n/a |

Top three improvements (ranked by expected purchases):
1. Abandoned Cart links all go to plain /cart (no cart restore). Email 1: 10 clicks, 0 purchases.
2. Test reassurance vs 20% in the cart last email. Also fix the checkout email 3 discount button, which links to /cart.
3. Welcome email 2: 165 delivered, 1 click, 0 purchases. Give it one CTA and reuse the code from email 1.

## Proposed for approval

### P-email-flow-optimizer-20261011-1
- Agent: email-flow-optimizer
- Type: send
- Draft: marketing/email/flow-optimizer/test-cart-last-email-reassurance.md
- Reason: The 20% last email in Abandoned Cart got 0 clicks and 0 purchases from 88 delivered. Test a no-discount reassurance version before holiday traffic.
- Expires: 2026-10-25
- Status: pending

Note: run this only after the owner decides on the brand blockers listed in the review (shared blocks in both arms), and after confirming that a 50/50 split block can be set up.

## Blocked or unknown

- Data caveat: all in-scope flows were disabled and re-enabled on 2026-09-28, and all email content was updated on 2026-09-24 to 2026-09-28. Most of the 90-day data describes older content. Volumes are very small.
- Omnisend has no unique-recipient metric. "Revenue per recipient" uses the first email's delivered count as a proxy.
- Brand and honesty conflicts in live emails need an owner decision: Miami shipping and "2–4 business days" (Facts: unknown, no delivery timing listed); "As seen on Fox News, NBC and Yahoo"; "4.8 from 740+ verified reviews"; "free proof" by "a real Memobrick designer" and "nothing is made until you approve"; lifetime free replacements; named customer quotes (no `approved-stories.md` in the repo; Hope E. has two different quotes); "your photo stays on your device".
- The Welcome 20% code is live but not listed as an active offer in `offers-calendar.md`.
- Delivery timing: the agent file asks for "delivery timing from the Facts table" in the reassurance email, but the Facts table has none. The block is left out of the variant.
- Split mechanism: not confirmed that Omnisend's API supports a random split block inside an automation. `get_reference_documentation` (automations topic) is not in the agent's allowed read-tool list, so it was not executed.
- Cart-restore merge tag for the cart flow is not confirmed.
- Checkout email 1: 7 of 90 sends failed. Bounce reasons were not pulled (`post_analytics_statistics` could break them down).
- Back in Stock: no sends in 90 days; the template is the unedited Omnisend default.
- Omnisend MCP connection dropped and reconnected several times during the run; all calls eventually succeeded.

## Next run

Tuesday 2026-10-13, 8:00 ET (weekly). If the test item is approved and the brand blockers are resolved, read the flow with `get_automations_id` first, then make the change exactly as written. Otherwise, report status and recheck the cart and checkout numbers.
