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

**Everyone works every day (Eden, 2026-10-28: "make sure everyone will work all the time").** Every agent in this skill runs every day. On its table day an agent does its full weekly run; on every other day it does its task from the task board `marketing/shared/task-board.md` (written each morning by growth-director), plus any approved items it must carry out. An agent with no task on the board still checks its approved items and its own backlog, then exits quickly.

Then add, in this order:

- growth-director (Gabriel) every day, right after growth-analyst: writes the task board every other agent reads (Eden, 2026-10-28).
- growth-analyst every day, first (its daily sales pulse feeds the dashboard and tells everyone the weak points).
- social-community-manager (Patricia) every day, after outreach-link-builder (Eden, 2026-10-28: Facebook group posts, prepared for her to post by hand).
- outreach-link-builder (Bertha) every day, after growth-analyst (Eden, 2026-10-28: daily link building on all Memobrick topics).
- seo-strategist, seo-blog-writer and seo-technical every day, in that order, after social-community-manager (Eden, 2026-10-28: "make sure seo and blog always have task"). On their table day they do their full weekly run; on other days the "Daily task" section of their agent file. Skip the extra daily run only if the agent is already due today from the table.
- ads-analyst every day from November 16 to December 20 (its daily pacing check), if not already due.
- site-developer every day, after the day's other agents (it exits quickly when there is nothing to build or apply).
- marketing-coordinator every day, so proposals reach the owner's Your turn the same day (the Sales Plan is still written on Mondays).
- social-publisher every day, last.

Not in this routine: outreach-creator-scout (María Beatriz). Shopify Collabs has no API in the Shopify connector and needs the owner's logged-in Chrome, so she runs only on the owner's Mac (the `com.memobrick.collabs` job and the `memobrick-collabs` skill), Mondays and, from November 1 to December 15, Thursdays. Never start her from here.

Order of the run: growth-analyst first, then growth-director, then outreach-link-builder, then social-community-manager, then seo-strategist, seo-blog-writer and seo-technical, then all other table agents (outreach-gift-guide-pr, email-campaign-writer, email-flow-optimizer, conversion-auditor, social-planner, ads-analyst), then site-developer, then marketing-coordinator, then social-publisher.

## 2. Run them

`git checkout main && git pull origin main`, then for each due agent, one after another, start it with the Agent tool (`subagent_type` = the agent's name) and this prompt:

> Scheduled live run for <YYYY-MM-DD>. Follow your agent instructions and the memobrick-run skill. Not a dry run.

Wait for each agent to finish before starting the next. If one fails or stops early, note why and carry on with the rest.

## 3. Finish

`git pull origin main` and check every agent that ran left `marketing/reports/<YYYY-MM-DD>-<agent>.md` and a status file that is not `working`. For any agent that did not, write its status file as `idle` with task "Run did not finish", commit as `daily: <agent> did not finish`, and push. Reply with one line per agent: ran, or failed and why.

## Never

- Run the same agent twice in one day.
- Do any agent's work yourself.
