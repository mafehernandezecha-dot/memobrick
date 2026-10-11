# Memobrick Marketing Agents: Design

Date: 2026-10-11
Status: Draft for owner review
Source documents: Memobrick Business and Sales Playbook (October 2026), live Shopify data, this repo.

## 1. Goal

Grow profitable Memobrick orders that the business can fulfill on time, using a team of 16 single-purpose Claude Code agents across analytics, SEO and blogs, backlinks and outreach, social media, email, and conversion.

The first target is the 2026 holiday season. Personalized photo gifts peak from Black Friday (Nov 27, 2026) to the Christmas order-by date. Shipping is 2 to 3 days after approval plus 5 to 18 days in transit, so the last safe order date is roughly early December. The owner must confirm the exact date before any agent publishes it.

### Success measures

Measured from Shopify, not from ad or email platform attribution:

- Net sales and paid orders per week, compared with the same weeks of 2025 and with the 90-day baseline below.
- Website conversion rate and average order value.
- Orders from Google organic search, email, and social (tracked with UTM links).
- On-time dispatch rate (growth must not break delivery promises).
- Agent accuracy: share of drafts approved without factual corrections.

### Baseline (Shopify, last 90 days to 2026-10-11)

202 orders, about $22.6k total sales, average order about $112.

| Source | Orders | Sales |
|---|---|---|
| Google search | 75 | $7,856 |
| Direct or unknown | 59 | $5,914 |
| mymemobrick (internal referrer) | 27 | $4,017 |
| Facebook | 19 | $2,451 |
| Instagram | 6 | $672 |
| Coupon sites, Loox, Bing, other | 16 | about $1,700 |

Google organic is the largest known channel. Social is about 13 percent of orders.

## 2. Decisions already made

- **Where agents run:** Claude Code agent files in this repo, started by scheduled cloud routines, with shared records stored as files in the repo (option A).
- **Autonomy:** Agents prepare, the owner approves. Agents may read data, research, and draft on their own. Publishing, sending email or outreach, any ad or budget change, discounts, and changes to the live website need owner approval. Refunds, budgets, and unusual customer commitments always stay with the owner. Autonomy can widen after the week 4 accuracy review.
- **Brand rules:** Taken from the playbook and enforced on every customer-facing draft: warm, personal, clear voice; short sentences; one call to action per message; approved terms ("custom brick mosaic", "personalized photo gift", "DIY brick mosaic kit", "40+ colors", 1×1 bricks); no em dashes in customer copy; no fake reviews, invented scarcity, expired codes, or unverified delivery promises; mockups labeled as such; the Miami, Florida shipping claim used only after the owner verifies it.
- **Order workflow is off limits:** Agents send nothing to customers about their orders and never touch the Shopify order workflow (order confirmations, shipping and delivery notifications, fulfillment, the Post-Purchase: Build & Delight flow, refunds). Shopify handles it as it does today. Agents work only on marketing to subscribers and prospects, content, SEO, and outreach.
- **Tool choice:** Claude Code, because Shopify, Meta Ads, Omnisend, Gmail, Google Drive, Postiz, and the SEO skills are already available to it.

- **Team structure:** One agent per task (16 agents in 6 teams) so every job is organized, separated, and easy to check. A coordinator agent prevents overlap and builds the single weekly approval file. Agents are switched on in two waves (section 6).

## 3. Architecture

### File layout

```
.claude/
  agents/                 flat files, team is the name prefix
    marketing-coordinator.md
    growth-analyst.md
    ads-analyst.md
    seo-strategist.md
    seo-blog-writer.md
    seo-technical.md
    outreach-gift-guide-pr.md
    outreach-link-builder.md
    outreach-creator-scout.md
    social-planner.md
    social-publisher.md
    social-community-manager.md
    email-flow-optimizer.md
    email-campaign-writer.md
    conversion-auditor.md
    conversion-reviews-ugc.md
  skills/
    memobrick-brand/SKILL.md      shared brand voice, terms, honesty rules, product facts
    memobrick-approvals/SKILL.md  how to propose items and act on approved ones
    memobrick-run/SKILL.md        the standard run routine every agent follows
marketing/
  README.md               how the system works and the exact command for each agent
  shared/
    scorecard.md          weekly numbers (growth analyst)
    experiments.md        experiment log (append-only for all agents)
    offers-calendar.md    approved offers, codes, dates, exclusions, order-by dates (owner only)
    content-calendar.md   publishing record (social planner and publisher)
    customer-questions.md recurring objections and questions (append-only for all agents)
    contacts-log.md       every person or site contacted, by whom and when (outreach agents)
  analytics/  seo/  outreach/  social/  email/  conversion/
                          one subfolder per agent, which only that agent writes
  approvals/YYYY-Www.md   this week's items waiting for the owner (coordinator only)
  reports/YYYY-MM-DD-<agent>.md   one summary per run
```

The theme folders and zip at the repo root stay unchanged.

### How a run works

1. A scheduled routine starts a fresh cloud session with a one-line instruction such as "Run the blog-writer agent weekly job."
2. The agent follows `memobrick-run`: pull the latest repo, load `memobrick-brand`, read its inputs, and act first on any of its items marked `approved`.
3. It pulls live data from connected tools, does its one job, and writes output only to its own folder plus append-only rows in shared logs.
4. It lists anything needing a decision in its run report under "Proposed for approval".
5. It commits and pushes, so every change is visible in git history.

### Approval queue

> Updated during build (final review): approvals use one rolling file, `marketing/approvals/queue.md`, with archived items in `marketing/approvals/archive/`, instead of one file per week. Each item names an Executor (the agent that carries it out) and the Commit of its draft; an item whose draft changed after queuing needs re-approval. Agents work on the `main` branch.

- Agents propose; only the coordinator writes the approval file.
- One file per ISO week, `marketing/approvals/2026-W42.md`. Each item has an ID, the agent, type (publish, send, ad change, offer, site change), a link to the draft, a one-line reason, an expiry date, and a status line the owner edits to `approved`, `rejected`, or `changes: <note>`.
- Agents never act on an item without `approved`. Expired items are not executed.
- Time-sensitive items (holiday posts and emails) are flagged at the top.

### Handoffs between agents

| From | To | Handoff file |
|---|---|---|
| SEO strategist | Blog writer | `seo/strategist/briefs/<slug>.md` |
| Blog writer | Technical SEO | `seo/writer/drafts/<slug>.md` (status: ready for check) |
| Technical SEO | Coordinator | checked draft plus schema and redirect notes |
| Social planner | Social publisher | `shared/content-calendar.md` row marked Ready, then approved |
| Social publisher | Growth analyst | live URL and results in `content-calendar.md` |
| Reviews and UGC | Social planner, blog writer, campaign writer | `conversion/reviews-ugc/approved-stories.md` (permission recorded) |
| Any agent | Social planner, SEO strategist | `shared/customer-questions.md` |
| Outreach agents | Each other | `shared/contacts-log.md` checked before any new pitch |
| All agents | Coordinator | run reports and "Proposed for approval" lists |

UTM convention for every link: `utm_source=<platform>&utm_medium=<organic|email|paid|referral>&utm_campaign=<yyyy-mm-slug>`, so Shopify can attribute orders to agent work.

## 4. Agents

Every agent file states its one job, inputs, tools, cadence, outputs, and what it must never do. All agents share these rules: no publishing, sending, ad changes, offers, or live site changes without approval; no invented numbers, dates, contacts, rates, or reviews (unknown stays unknown); brand skill applied to every customer-facing draft. Times are US Eastern.

### Coordination

**1. Marketing coordinator** (wave 1)
- **Job:** Keep the system organized and give the owner one place to decide.
- **Cadence:** Mon 7:00 weekly, plus a daily 9:00 check from Nov 16 to Dec 20.
- **Does:** Reads all run reports, builds the weekly approval file, flags overlaps (same person contacted twice, same offer posted twice, conflicting dates), checks every draft uses only offers in `offers-calendar.md`, and lists missing owner inputs.
- **Never:** Approve anything itself or change another agent's output.

### Analytics

**2. Growth analyst** (wave 1)
- **Job:** One trusted weekly view of sales and what drove them.
- **Inputs:** Shopify analytics, `experiments.md`, `content-calendar.md`.
- **Cadence:** Mon 6:00 weekly; daily 8:00 holiday pulse Nov 16 to Dec 20.
- **Does:** Updates `scorecard.md` (net sales, orders, conversion, average order, orders by source, new vs returning), compares with the prior week and the same week of 2025, flags anomalies, and checks running experiments against their decision rules.
- **Never:** Add revenue across platforms as if orders were unique.

**3. Ads analyst** (wave 2)
- **Job:** Meta ads review and test proposals.
- **Inputs:** Meta Ads insights, Shopify orders, product margins, an ad change log.
- **Cadence:** Mon 6:30 weekly.
- **Does:** Results by campaign and creative angle (couples, pets, family, birthdays, anniversaries), tracking warnings, one proposed test with budget and decision rule.
- **Never:** Change budgets, campaigns, or audiences.
- **Gap:** Google Ads is not connected.

### SEO and blog

**4. SEO strategist** (wave 1)
- **Job:** Decide what pages to create or improve, and brief them.
- **Inputs:** Live site, Search Console when connected, `customer-questions.md`, SEO skills (keyword clustering, content strategy, content brief, AI visibility).
- **Cadence:** Mon 8:00 weekly.
- **Does:** Keeps the keyword map grouped into occasion and recipient hubs (Christmas, couples and anniversaries, pets, family, kids, birthdays, memorial) and buyer-question articles (best photo for a mosaic, sizes and number of faces, what is in the kit, how long building takes). Writes one brief per week, holiday pages first. Tracks how Memobrick appears in AI answers for gift searches.

**5. Blog writer** (wave 1)
- **Job:** Write pages from the strategist's briefs.
- **Cadence:** Wed 6:00 weekly.
- **Does:** One article or hub page per week, with title, meta description, headings, internal links, FAQ, and real product facts. Uses only approved customer stories.
- **Never:** Write without a brief, mass-produce thin pages, or invent statistics or quotes.

**6. Technical SEO** (wave 1)
- **Job:** Site health and checking drafts before approval.
- **Inputs:** Theme files in this repo, live site, SEO skills (audit, technical SEO, on-page, schema, internal linking, broken links).
- **Cadence:** First run is a full audit; then Fri 6:00 weekly.
- **Does:** Indexing, mobile speed, titles and meta, image alt text, structured data (Product, Review, FAQ, Article), broken links. Confirms on the live site whether the ~50 GemPages "Gift Idea" articles are thin or near-duplicate, then proposes which to merge into hubs with 301 redirects. Checks each blog draft for on-page SEO and adds schema.
- **Never:** Change the live theme without approval.

### Backlinks and outreach

**7. Gift guide and PR** (wave 1)
- **Job:** Get Memobrick into holiday gift guides and press.
- **Cadence:** Tue 6:00 weekly.
- **Does:** 15 relevant gift guides and editors per week (personalized gifts, couples, pet lovers, families), with exact URL, public contact route, fit, and a short personalized pitch. Local Florida press only after the fulfillment location is verified.
- **Never:** Send pitches without approval, guess private emails, or pay for links.

**8. Link builder** (wave 2)
- **Job:** Earn lasting links outside the holiday rush.
- **Cadence:** Thu 6:00 weekly.
- **Does:** Unlinked brand mentions, resource and gift-idea pages, wedding, pet, and photography partners. Tracks every target and outcome.
- **Never:** Buy links or use link networks.
- **Gap:** Ahrefs is blocked from this environment, so research is public-web only until a backlink tool is reachable.

**9. Creator scout** (wave 2)
- **Job:** Find creators who can make real Memobrick content.
- **Cadence:** Fri 8:00 weekly.
- **Does:** 20 creators per week in the playbook niches (personalized gifts, couples, pets, family memories, DIY and crafts, home decor), shortlist 5 with evidence, draft outreach and a brief (real kit, photo to design story, build footage, reveal, reuse rights).
- **Never:** Invent rates or audience data, or contact anyone without approval.

### Social

**10. Social planner** (wave 1)
- **Job:** Plan next week's content as complete post packages.
- **Inputs:** Brand skill, `customer-questions.md`, `offers-calendar.md`, approved customer stories, footage and photos in Google Drive.
- **Cadence:** Thu 6:00 weekly.
- **Does:** 3 short videos, 2 photo or carousel posts, Story ideas. Each package has asset, caption, cover, call to action, UTM link, platform, and time. Writes a shot and edit brief where footage is missing. Proposes Pinterest as a new channel.
- **Never:** Use AI images that could pass for real orders.

**11. Social publisher** (wave 1, once Postiz is connected)
- **Job:** Get approved posts live and prove it.
- **Cadence:** Daily 18:00.
- **Does:** Schedules approved packages in Postiz, checks each due post went live, records the live URL, flags failures, and checks for duplicates before any retry. Weekly results per post (reach, engagement, sessions, attributed orders).
- **Never:** Publish anything not approved, or mark a post Published before a live check.

**12. Community manager** (wave 2)
- **Job:** Handle comments and route buyers.
- **Cadence:** Daily 12:00.
- **Does:** Drafts replies to routine comments using approved answers, sends buying questions to the owner as sales leads, flags complaints, and adds recurring questions to `customer-questions.md`.
- **Gap:** No connected tool reads Instagram or Facebook comments yet. Until one does, this agent works from comments the owner pastes or exports.

### Email (Omnisend)

Current Omnisend setup (read 2026-10-11, reworked 2026-09-28):

| Flow | Status | Notes |
|---|---|---|
| Welcome for memobrick | On | Signup-form subscribers, exits on order |
| Browse Abandonment (viewed product) | On | Exits on add to cart or order |
| Abandoned Cart (3 emails, 20% in last) | On | Exits on checkout started or order, so it hands off to the checkout flow |
| Abandoned Checkout (3 emails, 20% in last) | On | Exits on order. The customer's design shows in cart and checkout emails |
| Post-Purchase: Build & Delight | On | Order workflow, off limits to agents |
| Customer Reactivation, Next Memory (20%) | On | 20% code valid 14 days |
| Back in Stock | On | |
| Old design-to-cart flow, Copy of Order Confirmation | Off | Replaced, leave off |

**13. Flow optimizer** (wave 1)
- **Job:** Improve the existing flows, not rebuild them.
- **Cadence:** First run is a 90-day performance review; then Tue 8:00 weekly.
- **Scope:** Welcome, Browse Abandonment, Abandoned Cart, Abandoned Checkout, Customer Reactivation, and Back in Stock. Post-Purchase and any order notifications are out of scope.
- **Does:** Purchases per delivered email, revenue per recipient, unsubscribes, and complaints per flow and per email. Checks links, mobile rendering, and that the design image shows. Proposes one test at a time, starting with a reassurance version (size help, kit contents, delivery date) against the 20% discount in one recovery flow.
- **Never:** Enable, disable, or edit flows without approval.

**14. Campaign writer** (wave 1)
- **Job:** Weekly campaigns and the holiday plan.
- **Cadence:** Tue 6:00 weekly.
- **Does:** Drafts the coming week's campaign with audience, exclusions, and success measure. Holiday plan: gift-guide email, Black Friday, Cyber Monday, order-by reminders, a last-chance email at the confirmed cutoff, and a gift-card angle after the cutoff if gift cards are offered. No stacking with the 20% recovery codes unless approved.
- **Never:** Send without approval or use offers not in `offers-calendar.md`.

### Conversion and trust

**15. Conversion auditor** (wave 2)
- **Job:** Find and rank what stops visitors from buying.
- **Cadence:** First run is a full journey test; then every two weeks, Wed 9:00.
- **Does:** Walks land, upload, preview, size choice, cart, and checkout up to payment on mobile and desktop using the preinstalled browser. Records load times, errors, unclear steps, and missing reassurance. Delivers the five most consequential issues with evidence and proposes one test.
- **Never:** Place real orders or change the theme or design engine.

**16. Reviews and UGC** (wave 2)
- **Job:** Find the best honest reviews and customer stories already collected, for use in marketing.
- **Cadence:** Wed 6:00 weekly.
- **Does:** Reads reviews and photos customers already shared through Loox, picks the strongest stories, and keeps `approved-stories.md` listing only content with reuse permission already given (for example through Loox's photo review terms or a customer's own public post). It sends nothing to customers; if a story needs permission, it flags it for the owner.
- **Never:** Use a customer photo or quote without recorded permission, or write fake reviews.

### Later (not in this design)

Customer support, order coordinator, inventory, and corporate gifting sales, once the order handoff is verified.

## 5. Weekly schedule

| Day | Wave 1 | Wave 2 |
|---|---|---|
| Mon | 6:00 Growth analyst, 7:00 Coordinator, 8:00 SEO strategist | 6:30 Ads analyst |
| Tue | 6:00 Campaign writer, 6:00 Gift guide and PR, 8:00 Flow optimizer | |
| Wed | 6:00 Blog writer | 6:00 Reviews and UGC, 9:00 Conversion auditor (every 2 weeks) |
| Thu | 6:00 Social planner | 6:00 Link builder |
| Fri | 6:00 Technical SEO | 8:00 Creator scout |
| Daily | 18:00 Social publisher | 12:00 Community manager |
| Daily Nov 16 to Dec 20 | 8:00 Growth analyst pulse, 9:00 Coordinator check | |

The owner reviews the approval file on Monday after the coordinator runs, and approves time-sensitive items as they appear.

## 6. Rollout

- **Week 1 (Oct 12 to 18):** Build the shared skills, records, and the 10 wave 1 agent files. Dry run each one. Growth analyst baseline, technical SEO audit, flow optimizer 90-day review, first gift guide list and pitches.
- **Week 2 (Oct 19 to 25):** Scheduled routines on for wave 1. Owner confirms the order-by date and offers. First approved outputs go live. First Christmas hub page drafted. First social calendar.
- **Weeks 3 to 4 (Oct 26 to Nov 8):** Black Friday and Cyber Monday plan approved. Duplicate articles consolidated.
- **Week 4 review (around Nov 8):** Agent accuracy, approval workload, early results. Decide on wave 2 and whether routine social publishing can skip per-post approval.
- **Wave 2 (from Nov 9, or January if the holiday workload is too high):** Ads analyst, link builder, creator scout, community manager, conversion auditor, reviews and UGC.
- **Peak (Nov 16 to Dec 20):** Daily pulse and coordinator checks. Order-by countdown content.
- **January:** Post-season review. Plan the later agents.

## 7. What the owner needs to provide

| Item | Needed by | Blocks |
|---|---|---|
| Postiz API key and which social accounts are connected | Week 1 | Social scheduling and live checks |
| Search Console access for mymemobrick.com | Week 1 | SEO data |
| Canva sign-in (claude.ai connector settings) | Week 2 | Social images and covers |
| Christmas order-by date, current offers and codes | Week 2 | Holiday emails and posts |
| Fulfillment location claim (Miami, Florida) verified | Week 2 | Shipping copy, local PR |
| Product margins and holiday ad budget | Week 3 | Offer and ad recommendations |
| Google Ads and Google Analytics access (optional) | Week 3 | Full paid and funnel view |
| Product footage and customer photos with permission (Drive folder) | Week 1 | Content |

Anything not provided stays marked unknown, and the affected agent prepares a brief instead of guessing.

## 8. Error handling

- **Tool not connected or failing:** The agent records the failure in its run report and the approval file, finishes the parts it can, and does not retry publishing actions blindly.
- **Missing facts:** Written as unknown. No invented numbers, dates, contacts, or reviews.
- **Conflicting runs:** Each agent writes only to its own folder plus append-only rows in shared logs. Only the coordinator writes the approval file. Agents pull before writing and push after, and runs are staggered in time.
- **Stale approvals:** Expired items are not executed; the agent re-proposes them if still relevant.
- **Duplicate posts or emails:** Check for existing scheduled or sent items before creating new ones.

## 9. Testing and acceptance

- Each agent passes a dry run that produces its full output without publishing, sending, or changing anything external.
- Brand check on every customer-facing draft (voice, terms, no em dashes, one call to action) using the brand skill and the brand-voice quality check.
- Spot-check every number in the first two scorecards against Shopify.
- A test approval item goes through the full cycle (draft, owner approves, agent acts, live result recorded) before any agent acts on real approvals.
- Scheduled routines fire on time for one full week before the peak period.

## 10. Out of scope

- Changing the website's design engine or checkout.
- Automatic ad budget changes.
- Customer support, order coordination, inventory, and corporate sales agents (later phase).
- Wave 2 agent files are specified here but built only after the week 4 review.
- Removing the zip and duplicate theme folder from the repo.
