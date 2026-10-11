# Memobrick marketing agents

A team of single-purpose Claude Code agents that grow Memobrick sales through SEO, blogs, gift guides and PR, social media, and email. Agents research and draft on their own. Anything that publishes, sends, changes ads, creates offers, or changes the live website waits for the owner's approval. Agents never touch the Shopify order workflow.

Design: `docs/superpowers/specs/2026-10-11-memobrick-marketing-agents-design.md`

## How it works

1. Each agent runs on a schedule (or when you ask) and follows the `memobrick-run` skill.
2. It writes drafts to its own folder under `marketing/` and a run report to `marketing/reports/`.
3. On Monday the marketing coordinator collects every proposal into one rolling file: `marketing/approvals/queue.md`.
4. You open that file and change each `Status: pending` line to `approved`, `rejected`, or `changes: <your note>`.
5. On its next run, the agent named as Executor acts only on items marked `approved` that have not expired and whose draft has not changed since it was queued. Finished, rejected, and expired items move to `marketing/approvals/archive/`.

## How to approve

Open `marketing/approvals/queue.md` on the main branch (the GitHub web editor works). Time-sensitive items are at the top. Edit the `Status:` line of each item to exactly `approved`, `rejected`, or `changes: <your note>`, then commit. Each item's Reason says what will happen if you approve it.

## The team

### Wave 1 (active)

| Agent | Job | Schedule (ET) |
|---|---|---|
| marketing-coordinator | Builds the weekly approval file, catches overlaps | Mon 7:00; daily 9:00 Nov 16 to Dec 20 |
| growth-analyst | Weekly sales scorecard | Mon 6:00; daily 8:00 Nov 16 to Dec 20 |
| seo-strategist | Keyword map and one article brief a week | Mon 8:00 |
| seo-blog-writer | Writes the briefed article or hub page | Wed 6:00 |
| seo-technical | Site audit, checks drafts, schema, redirects | Fri 6:00 |
| outreach-gift-guide-pr | Holiday gift guides and press pitches | Tue 6:00 |
| social-planner | Next week's post packages | Thu 6:00 |
| social-publisher | Schedules approved posts in Postiz, checks they went live | Daily 18:00 (once Postiz is connected) |
| email-flow-optimizer | Improves existing Omnisend flows (not order emails) | Tue 8:00 |
| email-campaign-writer | Weekly campaigns and the holiday plan | Tue 6:00 |

### Wave 2 (after the week 4 review)

ads-analyst, outreach-link-builder, outreach-creator-scout, social-community-manager, conversion-auditor, conversion-reviews-ugc.

## Run an agent yourself

In a Claude Code session in this repo:

- Normal run: `Use the <agent name> agent to run its weekly job.`
- Safe test with no external changes: `Use the <agent name> agent to run its weekly job, dry run.`

Example: `Use the seo-strategist agent to run its weekly job, dry run.`

## Checks

- `python3 marketing/tools/check.py agents` validates every agent file.
- `python3 marketing/tools/check.py layout` checks the shared files exist.
- `python3 marketing/tools/check.py copy <file>` finds em dashes in customer copy.
- `python3 marketing/tools/check.py approvals marketing/approvals/queue.md --agent <name>` lists the approved items that agent should carry out.
- `python3 -m unittest marketing/tools/test_check.py` runs the checker's tests.

## Shared files

| File | What it holds | Who writes |
|---|---|---|
| `shared/scorecard.md` | Weekly numbers | growth-analyst |
| `shared/experiments.md` | Every test and its result | Any agent (append only) |
| `shared/offers-calendar.md` | Approved offers and verified facts such as the order-by date | Owner only |
| `shared/content-calendar.md` | Every social post and its status | social-planner, social-publisher |
| `shared/customer-questions.md` | Recurring questions and objections | Any agent (append only) |
| `shared/contacts-log.md` | Everyone contacted for outreach | Outreach agents (append only) |

## What the owner needs to provide

| Item | Needed by | Blocks |
|---|---|---|
| Postiz API key and which social accounts are connected | Week 1 | Social scheduling and live checks |
| Search Console access for mymemobrick.com | Week 1 | SEO data |
| Product footage and customer photos with permission (Drive folder) | Week 1 | Social content |
| Canva sign-in (claude.ai connector settings) | Week 2 | Social images and covers |
| Christmas order-by date, current offers and codes | Week 2 | Holiday emails and posts |
| Fulfillment location claim (Miami, Florida) verified | Week 2 | Shipping copy, local PR |
| Product margins and holiday ad budget | Week 3 | Offer and ad recommendations |
| Google Ads and Google Analytics access (optional) | Week 3 | Full paid and funnel view |

Put verified facts and offers in `shared/offers-calendar.md`. Anything missing stays "unknown" and agents will not guess it.

## Scheduled routines

Agents work on the `main` branch: they pull it at the start of every run and push to it at the end, and your approvals must be on main too. Merge this system's branch into main before turning on any schedule.

(Routine IDs are recorded here once the schedules are created.)
