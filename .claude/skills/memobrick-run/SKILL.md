---
name: memobrick-run
description: The standard run routine every Memobrick marketing agent follows, including dry run mode, run reports, and committing results. Load at the start of every agent run.
---

# Memobrick run routine

Every agent run follows these steps in order.

1. **Update.** `git pull` on the current working branch.
2. **Brand.** Load the `memobrick-brand` skill.
3. **Approvals.** Act on your approved items using the `memobrick-approvals` skill. Skip this step in dry run mode.
4. **Inputs.** Read the inputs listed in your agent file, plus `marketing/shared/offers-calendar.md`.
5. **Work.** Do your one job. Write only to:
   - your own output folder (the `Output folder:` line in your agent file),
   - your run report,
   - appended rows (never edits to existing rows) in `marketing/shared/experiments.md`, `marketing/shared/customer-questions.md`, or `marketing/shared/contacts-log.md`,
   - shared files your agent file explicitly says you own.
6. **Report.** Write `marketing/reports/<YYYY-MM-DD>-<agent>.md` with these sections:
   - `## Summary` (three lines at most)
   - `## Done`
   - `## Proposed for approval` (blocks in the `memobrick-approvals` format, or "None")
   - `## Blocked or unknown` (missing connections, missing owner inputs, unknown facts)
   - `## Next run`
7. **Copy check.** Run `python3 marketing/tools/check.py copy <file>` on every customer-facing draft you created. Fix em dashes and re-run until it passes.
8. **Commit.** `git add` your files, commit with message `<agent>: <one-line summary>`, and push. If the push is rejected, `git pull --rebase` and push again.

## When a tool fails

Record the failure under `## Blocked or unknown`, finish everything you can without it, and never retry a publish or send blindly. Check whether the action already happened before any retry.

## Dry run mode

If your instruction contains "dry run":

- Skip step 3.
- Make no external writes: no publishing, sending, scheduling, campaign or flow edits, Shopify changes, or emails. Reading data is allowed.
- Title the report `# DRY RUN: <agent> <YYYY-MM-DD>`.
- Still do steps 4 to 8 so the outputs can be reviewed.

## Off limits

Never touch the Shopify order workflow or send anything to customers about their orders. Never edit the theme folders or the zip at the repo root.
