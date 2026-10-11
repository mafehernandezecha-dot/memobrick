# DRY RUN: marketing-coordinator 2026-10-11

## Summary

- Built `marketing/approvals/2026-W41.md` from 9 run reports: 16 items (5 publish, 6 send, 5 site-change). 3 are time-sensitive.
- None was dropped and 6 were flagged: 5 outreach pitches offer sample kits whose availability is unknown, and the cart flow test shares blocks that make unverified delivery and Miami claims.
- The most urgent owner input does not appear in any proposal. Omnisend campaigns with unlisted offers are already scheduled, starting Oct 14.

## Done

- Loaded memobrick-run, memobrick-brand and memobrick-approvals. Skipped `git pull`, approvals and commit/push, as dry run rules require.
- Read every report dated 2026-10-11. This is the first coordinator run, so there was no earlier report.
- Read `offers-calendar.md`, `contacts-log.md` (empty), `content-calendar.md` and `TEMPLATE.md`. There are no previous approval files (no W40).
- Checked every proposal against the five rules and confirmed each draft file exists.
- Wrote `marketing/approvals/2026-W41.md`:
  - **Time-sensitive** (A-2026W41-001 to 003): social posts expiring Oct 12, Oct 15 and Oct 18.
  - **This week** (A-2026W41-004 to 016).
  - **Flagged** and **Missing owner inputs** sections.
- Wrote `marketing/coordination/coordinator/overlaps-2026-10-11.md`.
- `python3 marketing/tools/check.py approvals marketing/approvals/2026-W41.md` exited 0 and parsed all 16 items.

**Items added:**

| Items | Source | Proposals |
|---|---|---|
| A-001 to 003 | social-planner | P-social-planner-20261011-1 to 3 |
| A-004 | email-campaign-writer | P-email-campaign-writer-20261011-1 |
| A-005 to 009 | outreach-gift-guide-pr | P-outreach-gift-guide-pr-20261011-1 to 5 |
| A-010 | email-flow-optimizer | P-email-flow-optimizer-20261011-1 |
| A-011 to 016 | seo-technical | P-seo-technical-20261011-6, then 4, 1, 5, 2, 3 (ordered by expiry) |

**Flagged:** A-005 to A-009 and A-010. The reasons are listed in the overlaps file and on each item's `- Flag:` line.

**Approved since last run but not yet acted on:** none. There is no earlier approval file.

**Expired items:** none.

## Proposed for approval

None (the coordinator has no items of its own).

## Blocked or unknown

**Owner inputs.** All are listed under `## Missing owner inputs` in `2026-W41.md`: 8 unknown Facts rows plus every agent blocker. The two most urgent:

- Unapproved scheduled Omnisend campaigns. The first sends Oct 14.
- The Mon Oct 12 19:00 social post needs a decision before the regular Monday review.

**Instruction gaps found:**

- The rules do not say where to record flags on proposals that are copied rather than dropped. A `## Flagged` section and a `- Flag:` line were added to the weekly file.
- The approval week is ambiguous. Social posts for W42 are approved in the W41 file, while social-publisher names `2026-W42.md`.

## Next run

- Mon 2026-10-12, 7:00 ET, after growth-analyst.
- Carry W41 decisions forward and report approved items not yet acted on.
- The daily holiday check starts Nov 16.
