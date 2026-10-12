---
name: memobrick-daily
description: The one daily Memobrick routine. Works out which marketing agents are due today and runs them in order. Load when a scheduled run says to follow the memobrick-daily skill.
---

# Memobrick daily run

One routine fires every morning at about 5:45 ET and follows this skill. It runs each agent that is due today, one at a time, so their git pushes never overlap.

## 1. Who is due today

Use today's date and weekday in America/New_York.

| Day | Agents |
|---|---|
| Monday | seo-strategist |
| Tuesday | outreach-gift-guide-pr, email-campaign-writer, email-flow-optimizer |
| Wednesday | seo-blog-writer, conversion-auditor |
| Thursday | social-planner |
| Friday | seo-technical, ads-analyst |

Then add, in this order:

- growth-analyst every day, first (its daily sales pulse feeds the dashboard and tells everyone the weak points).
- ads-analyst every day from November 16 to December 20 (its daily pacing check), if not already due.
- marketing-coordinator on Mondays, and every day from November 16 to December 20.
- social-publisher every day, last.

Order of the run: growth-analyst first, then the day's other agents in the table order, then marketing-coordinator, then social-publisher.

## 2. Run them

`git checkout main && git pull origin main`, then for each due agent, one after another, start it with the Agent tool (`subagent_type` = the agent's name) and this prompt:

> Scheduled live run for <YYYY-MM-DD>. Follow your agent instructions and the memobrick-run skill. Not a dry run.

Wait for each agent to finish before starting the next. If one fails or stops early, note why and carry on with the rest.

## 3. Finish

`git pull origin main` and check every agent that ran left `marketing/reports/<YYYY-MM-DD>-<agent>.md` and a status file that is not `working`. For any agent that did not, write its status file as `idle` with task "Run did not finish", commit as `daily: <agent> did not finish`, and push. Reply with one line per agent: ran, or failed and why.

## Never

- Run an agent that is not due today, or the same agent twice in one day.
- Do any agent's work yourself.
