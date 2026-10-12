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

| Agent | Job | Day |
|---|---|---|
| marketing-coordinator | Builds the weekly approval file and the Monday Sales Plan, catches overlaps | Daily (after the day's other agents); Sales Plan Mon |
| growth-analyst | Daily sales pulse against the goals and the weak points; weekly scorecard | Daily (first); scorecard Mon |
| seo-strategist | Keyword map and one article brief a week | Mon |
| seo-blog-writer | Writes the briefed article or hub page | Wed |
| seo-technical | Site audit, checks drafts, schema, redirects | Fri |
| outreach-gift-guide-pr | Holiday gift guides and press pitches | Tue |
| social-planner | Next week's posts, one a day: videos edited from Drive footage, real photos, and realistic AI lifestyle images | Thu |
| social-publisher | Turns approved posts into ready-to-post kits you publish by hand (Postiz optional), records live links | Daily (last) |
| email-flow-optimizer | Improves existing Omnisend flows (not order emails) | Tue |
| email-campaign-writer | Weekly campaigns and the holiday plan | Tue |
| ads-analyst | Google and Meta ads judged on Shopify sales; budget moves, pauses, new ads (applies approved changes) | Fri; daily Nov 16 to Dec 20 |
| conversion-auditor | Walks the store like a customer, finds what stops people buying, proposes fixes | Wed |
| site-developer | Builds store fixes in a theme copy, tests them on phone and desktop, applies approved ones with a backup | Daily |

### Wave 2 (after the week 4 review)

outreach-link-builder, outreach-creator-scout, social-community-manager, conversion-reviews-ugc. (ads-analyst and conversion-auditor started early, on 2026-10-12.)

## Run an agent yourself

In a Claude Code session in this repo:

- Normal run: `Use the <agent name> agent to run its weekly job.`
- Safe test with no external changes: `Use the <agent name> agent to run its weekly job, dry run.`

Example: `Use the seo-strategist agent to run its weekly job, dry run.`

## Checks

- `python3 marketing/tools/check.py agents` validates every agent file.
- `python3 marketing/tools/check.py layout` checks the shared files exist.
- `python3 marketing/tools/check.py copy <file>` finds em dashes in customer copy.
- `python3 marketing/tools/email_preview.py <draft>` renders an email draft as the subscriber will see it (`<draft>-preview.png` and `.html` next to it) and adds the image to the top of the draft. The email agents run it on every email draft.
- `python3 marketing/tools/check.py approvals marketing/approvals/queue.md --agent <name>` lists the approved items that agent should carry out.
- `python3 -m unittest marketing/tools/test_check.py` runs the tests for the checker and the email preview tool.

## Shared files

| File | What it holds | Who writes |
|---|---|---|
| `shared/scorecard.md` | Weekly numbers | growth-analyst |
| `shared/experiments.md` | Every test and its result | Any agent (append only) |
| `shared/offers-calendar.md` | Approved offers and verified facts such as the order-by date | Owner only |
| `shared/content-calendar.md` | Every social post and its status | social-planner, social-publisher |
| `shared/customer-questions.md` | Recurring questions and objections | Any agent (append only) |
| `shared/contacts-log.md` | Everyone contacted for outreach | Outreach agents (append only) |
| `shared/product-facts.md` | Sizes, pieces, prices, kit contents, and how the product looks | Any agent may update it from live Shopify data |
| `social/footage-rights.md` | Who appears in each Drive clip and whether it may be used | social-planner adds clips; only the owner marks them `ok` |

## What the owner needs to provide

| Item | Needed by | Blocks |
|---|---|---|
| Postiz API key (optional; skipped for now to save cost) | Later | Automatic scheduling instead of posting by hand |
| Search Console access for mymemobrick.com | Week 1 | SEO data |
| Product footage in the Drive footage library, with each clip's rights confirmed in `social/footage-rights.md` | Week 1 | Edited social videos |
| Canva sign-in (claude.ai connector settings) | Week 2 | Social images and covers |
| Christmas order-by date, current offers and codes | Week 2 | Holiday emails and posts |
| Fulfillment location claim (Miami, Florida) verified | Week 2 | Shipping copy, local PR |
| Product margins and holiday ad budget | Week 3 | Offer and ad recommendations |
| Google Ads and Google Analytics access (optional) | Week 3 | Full paid and funnel view |

Put verified facts and offers in `shared/offers-calendar.md`. Anything missing stays "unknown" and agents will not guess it.

## Scheduled routines

Agents work on the `main` branch: they pull it at the start of every run and push to it at the end, and your approvals must be on main too. Merge this system's branch into main before turning on any schedule.

One routine runs everything: every morning at about 5:45 ET it follows the `memobrick-daily` skill, which works out who is due that day (the Day column above) and runs those agents one after another. The routine is created in claude.ai (Routines), with this repository, the cloud environment, and the Shopify, Omnisend, Google Drive, Gmail and Facebook connectors attached. Its prompt:

> Follow the memobrick-daily skill in this repository. Live run.

AI images need a Gemini API key saved as a secret in the cloud environment's settings (host `generativelanguage.googleapis.com`, header `x-goog-api-key`), or as a `GEMINI_API_KEY` environment variable.
