# email-flow-optimizer 2026-10-27

## Summary
No flow test is running (EFO-20261011-01 expired unapproved on Oct 25). Since the Sep 28 re-enable, Welcome email 1 is the winner (10 orders, $882 from 54 sent); Checkout emails sent 181 with 0 orders.
Proposed a new test on Checkout email 1: a designed, claim-free version (before/after, not a split). Needs owner approval.

## Done
- Read-only Omnisend pull, Sep 28 to Oct 27 (sent / unique clicks / attributed orders / revenue), by email:
  - Welcome: 22 / 0 / 0; 35 / 1 / 1 ($176.42); 54 / 3 / 10 ($882.26). Welcome total 11 orders, $1,058.68.
  - Browse Abandonment: 50 / 9 / 0.
  - Abandoned Cart: 38 / 4 / 0; 38 / 6 / 1 ($131.55); email 3 (20%) 28 / 2 / 1 ($699.15).
  - Abandoned Checkout: 64 / 2 / 0; 57 / 3 / 0; 60 / 2 / 0 (the 20% email).
  - Reactivation: 70 / 1 / 0, 2 unsubscribes (2.9%).
  - No complaints in any in-scope flow. Out-of-scope flows not analyzed.
- Read Checkout flow and email 1 content: it still contains 740+ reviews, "Fox News, NBC and Yahoo", "2-4 days", lifetime replacements, "nothing is made until you approve", and a named quote.
- Wrote the test, a designed draft with desktop and phone previews and Omnisend HTML: `marketing/email/flow-optimizer/test-checkout-first-email-clean-base.md` and `-draft.md`. Copy check passes. Appended EFO-20261027-01 to experiments.md.
- Tool note: `email_preview.py` fails on Python 3.11 (f-string syntax) and its Chrome flags hang here; I ran it with python3.12 and a wrapper that drops `--user-data-dir`, `--hide-scrollbars` and `--virtual-time-budget`. The tool should be fixed.

## Proposed for approval
### Checkout email 1: clean designed version
- Executor: email-flow-optimizer
- Type: send
- Action: disable Abandoned Checkout flow (68ecddff00915ec475c65e01), replace the content of email 1 with the draft (keep the personalized saved-design block and the checkout link), re-enable with contacts kept. About 30 seconds off. Email 2 and 3 untouched.
- Draft: `marketing/email/flow-optimizer/test-checkout-first-email-clean-base-draft.md`, test: `test-checkout-first-email-clean-base.md`
- Needs from the owner: yes/no; optional: verified review count, timing, or Loox quote permission, which could be added back later.
- Expires: 2026-11-10

## Blocked or unknown
- A true split is not feasible at about 2 sends a day (100 per arm is about 100 days).
- Cart-restore merge tag still unconfirmed; email 2 of Checkout and Cart emails keep the same unverified claims (not touched).
- Welcome emails 1 to 3 order mapping by block ID is inferred from sent counts.

## Sales impact
Checkout is the largest lost-order pool (181 recovery sends, 0 orders). Even 3 to 5 percent of 64 sends a month is 2 to 3 orders; honest expectation is small. It also removes claims that could hurt the brand. Welcome email 1 is left alone because it is the one converting email.

## Next run
Tuesday 2026-11-03. If approved, apply and record before and after; otherwise report numbers again.
