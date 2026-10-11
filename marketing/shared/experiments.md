# Experiments

Append-only for all agents. One major funnel test and one creative test at a time. Keep inconclusive results inconclusive.

| ID | Agent | Hypothesis | Baseline | Primary metric | Guardrails | Start | End | Decision rule | Result | Decision |
|---|---|---|---|---|---|---|---|---|---|---|
| EFO-20261011-01 | email-flow-optimizer | DRY RUN proposal. Abandoned Cart email 3: a reassurance version (kit contents, size help, reply for help, no discount) gets at least as many purchases per delivered email as the current 20% discount | 90d: 88 delivered, 0 clicks, 0 purchases (mostly pre-2026-09-28 content) | Purchases per delivered email, email 3, per arm | Unsubs (stop if variant >1% and +0.5pp vs control), complaints (stop at 2), discount cost redeemed in control | not started | | After 8 weeks and 100 delivered per arm: variant adopted if purchases >= control; control kept if ahead by 3+; else inconclusive. See marketing/email/flow-optimizer/test-cart-last-email-reassurance.md | | |
