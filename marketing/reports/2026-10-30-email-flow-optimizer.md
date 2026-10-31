# email-flow-optimizer 2026-10-30

## Summary
No flow test is running. Re-proposed the Checkout email 1 clean designed version in the standard format (task board day 3).
New read: the live Checkout email 1 now has 1 attributed order ($281.67) on 76 sent, so "0 orders" is out of date; claims in it are still the reason to change.

## Done
- Task board task: done. Valid P- block below, one Draft path, Status line, no claims, no rating (the 4.9/740+ rating stays out until verified in the Facts table).
- Read-only Omnisend pull, 2026-09-28 to 2026-10-30, by message block (sent / unique clicks / orders / revenue / unsub rate), no complaints anywhere:
  - Welcome: 42 / 1 / 1 ($176.42); 60 / 3 / 10 ($882.26); other welcome-type blocks 88 / 17 / 1 ($46.58) and 83 / 4 / 1 ($205.57).
  - Abandoned Cart: 42 / 6 / 1 ($131.55); 43 / 4 / 0; email 3 (20%) 32 / 2 / 1 ($699.15).
  - Abandoned Checkout email 1 (block ...0002): 76 / 4 / 1 ($281.67). Blocks ...0003: 63 / 13 / 0; ...0004: 67 / 3 / 0; ...0006: 66 / 3 / 0.
  - Other blocks (Browse, Reactivation, unmapped IDs): 70 / 5 / 0; 62 / 1 / 0 (3.2% unsub); 78 / 1 / 0 (2.6% unsub); 79 / 5 / 0 (1.3% unsub); 36 / 0 / 0.
  - Block-to-email mapping for IDs without the flow prefix is inferred from earlier runs, not confirmed.
- Updated the baseline note in `marketing/email/flow-optimizer/test-checkout-first-email-clean-base.md`. Draft, previews and Omnisend HTML are unchanged; copy check passes.
- No approved items for me in the queue; no Omnisend edits made. Post-Purchase not touched.

## Proposed for approval
### P-email-flow-optimizer-20261030-1
- Agent: email-flow-optimizer
- Executor: email-flow-optimizer
- Type: send
- Draft: marketing/email/flow-optimizer/test-checkout-first-email-clean-base-draft.md
- Reason: If approved, I switch off Abandoned Checkout (68ecddff00915ec475c65e01) for about 30 seconds, replace email 1 (block 59841a953e40551380000002) with this designed version that drops five claims we cannot back up (740+ reviews, Fox News/NBC/Yahoo, 2-4 days, lifetime replacements, named quote), keep the saved-design block and checkout link, and re-enable; emails 2 and 3 untouched. Test plan: `test-checkout-first-email-clean-base.md` (EFO-20261027-01).
- Expires: 2026-11-13
- Status: pending

## Blocked or unknown
- Review count, delivery timing, lifetime replacements, and Loox quote permission are unverified; none is used in the draft.
- A true split is not feasible at about 2 sends a day; the test is a before/after read.
- Cart-restore merge tag still unconfirmed. Checkout email 2 and the Cart emails still carry the same unverified claims (not touched).
- `email_preview.py` still fails on Python 3.11 (not needed this run).

## Sales impact
Checkout is the biggest recovery pool (about 76 sends a month, 1 order). Removing risky claims protects the brand; a small lift (1 to 3 extra orders a month) is the honest expectation. Welcome email 1 (10 orders) is left alone.

## Next run
Tuesday 2026-11-03. If approved, apply and record before and after; otherwise report numbers. Holiday: consider a no-discount seasonal Dec 15 order-by line in Checkout email 1 only after this test is decided.
