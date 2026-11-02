# email-flow-optimizer 2026-11-02

## Summary
No flow test is running; A-2026W44-062 (Checkout email 1 clean base, EFO-20261027-01) is still pending, so I made no Omnisend edits.
Task board task done: recommendation on Checkout emails below. No new proposal, so the owner has one open decision, not two.

## Done
- Read-only Omnisend pull, 2026-09-28 to 2026-11-02 (sent / unique clicks / attributed orders / revenue / unsub rate; no complaints anywhere). Post-Purchase rows in the same pull were ignored and not analyzed.
  - Welcome: 43 / 1 / 1 ($176.42); 66 / 3 / 10 ($882.26); 37 / 0 / 0.
  - Abandoned Cart: 47 / 4 / 0; 44 / 6 / 1 ($131.55); email 3 (20%) 35 / 3 / 1 ($699.15).
  - Abandoned Checkout: ...0002 (email 1) 79 / 4 / 1 ($281.67); ...0004 68 / 3 / 0; ...0006 71 / 3 / 0. Block ...0003 sent nothing in this window (earlier 63 / 13 / 0). Block to email mapping is inferred from earlier runs.
  - Browse Abandonment: 65 / 13 / 1 ($149).
  - Customer Reactivation: 84 / 1 / 0, 2.4% unsubscribes (watch).
- Checkout recommendation (task board): after email 1, test email 2 next (block ...0004, 68 sent, 3 clicks, 0 orders). It carries the same unverified claims as email 1 and sees the same warm buyers, so one clean base across 1 and 2 is the next step. Email 3 (...0006, 71 sent, 3 clicks, 0 orders) holds the 20% code; do not test it until 1 and 2 are clean. Only one test runs at a time, so this waits for EFO-20261027-01 to start and read. Rough size: checkout pool is about 75 sends a month, so any test is a before/after read over 4 weeks, not a split.
- Welcome email 2 (10 orders on 66 sent) is the best performer; left alone.

## Proposed for approval
None new. A-2026W44-062 stays pending (expires 2026-11-13).

## Blocked or unknown
- Approval of A-2026W44-062 is pending, so the test has not started.
- Review count, delivery timing, lifetime replacements and Loox quote permission remain unverified; Cart emails and Checkout email 2 still carry them.
- Omnisend MCP disconnected briefly after the pull; the data above was retrieved before that.
- Volumes are tiny (1 to 10 orders per block); no result here is statistically meaningful.

## Sales impact
Nothing changes live this run. Expected effect comes from A-2026W44-062: removing risky claims from the largest recovery email, honest expectation 1 to 3 extra orders a month. Approving it this week lets it read before the Black Friday sends.

## Next run
Tuesday 2026-11-09. If A-2026W44-062 is approved, apply it (get_automations_id first, record before and after). Otherwise report numbers again.
