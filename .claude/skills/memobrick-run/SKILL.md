---
name: memobrick-run
description: The standard run routine every Memobrick marketing agent follows, including dry run mode, run reports, and committing results. Load at the start of every agent run.
---

# Memobrick run routine

## Sales first

Memobrick's agents share one goal: as many sales as possible, every day. The daily goals are in `marketing/shared/sales-goals.json` and today's numbers and weak points are in `marketing/sales/latest.json`. Before you work, read both. Spend your run on what is most likely to bring orders soon, fix the weak points that name you before anything else, and say plainly when a task of yours will not move sales so the owner can drop it.

Every agent run follows these steps in order.

1. **Update.** Work on the repository's default branch: `git checkout main && git pull origin main`. Then set your live status to `working` (see Live status below), commit it with message `<agent>: status working` and push.
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
   - `## Sales impact` (how this run's work should bring orders, which weak point it addresses, and the expected effect; "None" is allowed but say why)
   - `## Next run`
7. **Copy check.** Run `python3 marketing/tools/check.py copy <file>` on every customer-facing draft you created. Fix em dashes and re-run until it passes.
8. **Commit.** Set your live status to `needs_me` if you proposed items for approval this run, otherwise `idle`. `git add` your files and the status file, commit with message `<agent>: <one-line summary>`, and `git push origin main`. If the push is rejected, `git pull --rebase origin main` and push again. The owner's approvals and every agent's reports live on main, so never leave work on another branch.

## Live status

The owner's dashboard (Memobrick OS) shows each agent working, idle, or waiting on the owner from `marketing/status/<agent>.json`, where `<agent>` is your agent name (for example `seo-technical`). Write the whole file each time:

```json
{"state": "working", "task": "Technical site audit", "updated": "2026-10-11T09:00:00-04:00"}
```

- `state`: `working` while you run, `needs_me` at the end if you proposed items for approval, `idle` otherwise.
- `task`: a few words in English saying what you are doing, shown in a speech bubble over your figure. Empty when idle.
- `updated`: the current time in ISO 8601 with the ET offset.

This file is the only exception to the write list in step 5. Write it in dry run mode too.

## When the live site is unreachable

If https://mymemobrick.com cannot be fetched (the environment's network policy may block it), read the same content through read-only Shopify queries instead (`search_products`, `get-product`, and `graphql_query` for `pages`, `blogs`, and `articles` with their handles, titles, and body HTML). Say in your report that the live site was unreachable and which fallback you used. Never write to Shopify in this fallback.

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
