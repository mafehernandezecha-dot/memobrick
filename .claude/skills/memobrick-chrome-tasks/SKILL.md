---
name: memobrick-chrome-tasks
description: Runs the owner-approved Google Ads changes that the ads analyst prepared as Chrome tasks, using Claude in Chrome on the owner's Mac. Load when a local scheduled task says to follow the memobrick-chrome-tasks skill.
---

# Memobrick Chrome tasks

This runs on the owner's Mac (a local scheduled task in the Claude desktop app, or a scheduled task in the Claude in Chrome extension using `extension-prompt.md`), because Google Ads changes are made in the owner's own Chrome, through Claude in Chrome, at no extra connector cost.

## Steps

1. `git pull origin main` in the memobrick folder.
2. List `marketing/analytics/ads-analyst/chrome-tasks/*.md` whose first line is `Status: ready`. If there are none, reply "No Chrome tasks today" and stop.
3. For each ready task, oldest first:
   - Check that the approval item it names (for example A-2026W42-001) is `approved` and not expired in `marketing/approvals/queue.md`. If it is not, set its first line to `Status: skipped (not approved)` and move on.
   - Open Google Ads in Chrome (ads.google.com, account 672-499-4049) and carry out exactly the prompt inside the task's box: only the listed changes, nothing else. If you hit a login page, a CAPTCHA, or anything that does not match the task, stop that task, set `Status: needs owner` with one line saying why, and move on.
   - After the changes, look at each changed item again and confirm it matches.
   - Set the first line to `Status: done <YYYY-MM-DD>` and add a `## Result` section at the end: what changed, item by item, and anything left undone.
4. Commit only the task files you changed with the message `chrome-tasks: <task names> done`, then `git pull --rebase origin main && git push origin main`.
5. Reply with one line per task: done, skipped, or needs owner, and why.

## Never

- Change anything in Google Ads that the task does not list: budgets, bids, campaigns, or settings.
- Run a task whose approval item is not approved and unexpired.
- Touch any site other than Google Ads, or any account other than 672-499-4049.
