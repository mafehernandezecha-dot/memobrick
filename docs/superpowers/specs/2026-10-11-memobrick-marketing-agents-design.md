# Memobrick Marketing Agents: Design

Date: 2026-10-11
Status: Draft for owner review
Source documents: Memobrick Business and Sales Playbook (October 2026), live Shopify data, this repo.

## 1. Goal

Grow profitable Memobrick orders that the business can fulfill on time, using a small team of Claude Code agents for growth analysis, email and recovery, social content, SEO and blogs, backlinks and partnerships, and website conversion.

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
- **Tool choice:** Claude Code, because Shopify, Meta Ads, Omnisend, Gmail, Google Drive, Postiz, and the SEO skills are already available to it.

## 3. Architecture

### File layout

```
.claude/
  agents/
    growth-analyst.md
    email-recovery.md
    content-social.md
    seo-blog.md
    backlinks-pr-creators.md
    conversion.md
  skills/
    memobrick-brand/SKILL.md      shared brand voice, terms, honesty rules, product facts
    memobrick-approvals/SKILL.md  how to write and read the approval queue
marketing/
  README.md               how the system works and the exact command for each agent
  scorecard.md            weekly numbers
  experiments.md          experiment log
  offers-calendar.md      approved offers, codes, dates, exclusions, order-by dates
  content-calendar.md     publishing record
  customer-questions.md   recurring objections and questions (feeds content and SEO)
  seo/                    keyword map, page plan, audit, article drafts
  outreach/               gift-guide targets, PR pitches, creator prospects
  email/                  flow audit, campaign drafts, test records
  conversion/             funnel tests, issue list
  approvals/YYYY-Www.md   this week's items waiting for the owner
  reports/YYYY-MM-DD-<agent>.md   one summary per run
```

The theme folders and zip at the repo root stay unchanged.

### How a run works

1. A scheduled routine starts a fresh cloud session with a one-line instruction such as "Run the seo-blog agent weekly job."
2. The agent loads `memobrick-brand`, reads the shared records it depends on, and pulls live data from connected tools.
3. It writes drafts and findings into its own folder, adds items needing a decision to the current approval file, and writes a run report.
4. It commits to the working branch and pushes, so every change is visible in git history.
5. On the next run, each agent first acts on items the owner marked approved, then starts new work.

### Approval queue

One file per ISO week, `marketing/approvals/2026-W42.md`. Each item has: ID, agent, type (publish, send, ad change, offer, site change), a link to the draft, a one-line reason, and a status line the owner edits to `approved`, `rejected`, or `changes: <note>`. Agents never act on an item without `approved`. Items carry an expiry date so time-sensitive drafts (offers, holiday posts) do not go out late.

### Shared records and handoffs

- Growth analyst owns `scorecard.md` and `experiments.md`. Every agent that runs a test adds a row there.
- Email, social, and SEO agents read `offers-calendar.md`. Only the owner adds offers. Agents may propose them through the approval queue.
- Any agent that sees a recurring customer question adds it to `customer-questions.md`. Content and SEO agents turn those into posts and articles.
- UTM convention: `utm_source=<platform>&utm_medium=<organic|email|paid|referral>&utm_campaign=<yyyy-mm-slug>`, so Shopify can attribute orders to agent work.

## 4. Agents

Each agent file states its job, inputs, tools, weekly job, outputs, and what it must never do. Times are US Eastern.

### 4.1 Growth analyst (priority 1)

- **Job:** One trusted weekly view of sales and what drove them. Keeps the experiment log honest.
- **Inputs:** Shopify analytics, Meta Ads insights, `experiments.md`, `offers-calendar.md`.
- **Weekly (Mon 6:00):** Update `scorecard.md` (net sales, orders, conversion, average order, orders by source, new vs returning). Compare with the prior week and the same week of 2025. Flag anomalies. Review running experiments against their decision rules. Compile the week's approval file summary at the top.
- **Holiday pulse (daily 8:00, Nov 16 to Dec 20):** Orders, sales, and Meta spend vs yesterday, plus any tracking breakage.
- **Never:** Change budgets or campaigns. Add revenue across platforms as if orders were unique.
- **Gap:** Google Ads and Google Analytics are not connected. Search Console access is needed for organic data.

### 4.2 Email and sales recovery (priority 1)

- **Job:** Turn existing interest into orders through Omnisend, and ask for reviews after delivery.
- **Inputs:** Omnisend flows, campaigns, and reports; Shopify orders and abandoned checkouts; `offers-calendar.md`.
- **First run:** Audit active flows (welcome, abandoned checkout, post-purchase, review request), entry rules, purchase suppression, overlaps, and links. Report the top three issues.
- **Weekly (Tue 6:00):** Draft one campaign for the coming week and one flow improvement, with audience, exclusions, test design, and success measure (purchases per delivered email, revenue per recipient).
- **Holiday campaign plan:** Gift-guide email, Black Friday and Cyber Monday, order-by reminders, a last-chance message timed to the confirmed cutoff, and a gift-card or "give the experience" angle for after the cutoff if gift cards are offered.
- **Design recovery:** Only enabled after the site is verified to save design activity tied to a contactable customer with a working return link (playbook rule). Until then, recovery uses abandoned checkouts only.
- **Never:** Send without approval. Imply a designer made the customer's design by hand. Use offers not in `offers-calendar.md`.

### 4.3 Content and social (priority 1)

- **Job:** A steady weekly content plan that shows the photo to mosaic transformation, the building experience, and real customer stories, published through Postiz.
- **Inputs:** Brand skill, `customer-questions.md`, `offers-calendar.md`, product footage and photos in Google Drive, Postiz.
- **Weekly (Thu 6:00):** Build next week's calendar: 3 short videos, 2 photo or carousel posts, Story ideas. Each item is a full package: asset reference, caption, cover, call to action, UTM link, platform, time. Where no suitable footage exists, write a precise shot and edit brief.
- **Daily (once Postiz is connected and the owner allows scheduled publishing):** Check posts due in the last 24 hours went live, record the live URL, flag failures, and check for duplicates before any retry.
- **Weekly results:** Reach, engagement, sessions, and attributed orders per post, organic kept separate from paid.
- **Channels:** Instagram, Facebook, TikTok first. Pinterest proposed as a new channel because people search it for photo gift ideas.
- **Never:** Publish unapproved content. Use AI-generated images that could pass for real orders. Mark a post Published before a live check.

### 4.4 SEO and blog (priority 1)

- **Job:** Grow orders from Google and AI search with useful pages built around real buyer questions.
- **Inputs:** Theme files in this repo, the live site, SEO skills (audit, technical SEO, on-page, schema, keyword clustering, content brief, internal linking, AI visibility), Search Console when connected.
- **First run:** Full audit of mymemobrick.com: indexing, speed on mobile, titles and meta, headings, image alt text, structured data (Product, Review, FAQ, Article), internal links. Inventory existing blog articles. The theme contains about 50 GemPages article templates with heavily repeated "Memobrick ... Gift Idea" phrasing. The audit must confirm on the live site whether these are thin or near-duplicate pages before recommending consolidation.
- **Page plan:** Keyword map grouped into occasion and recipient hubs (Christmas, couples and anniversaries, pets, family, kids, birthdays, memorial) and buyer-question articles (best photo for a mosaic, sizes and number of faces, what is in the kit, how long building takes, gift for someone who has everything). Weak duplicates get merged into hubs with 301 redirects.
- **Weekly (Wed 6:00):** One new or consolidated page drafted to brief, one batch of technical fixes, and updated internal links. Holiday pages first, because Christmas pages need time to be crawled before December.
- **Never:** Mass-produce thin pages. Change the live theme or publish articles without approval. Invent statistics or reviews.

### 4.5 Backlinks, PR and creators (priority 2, starts week 1 for gift guides)

- **Job:** Earn links and mentions from relevant sites, and find creators who can make real content.
- **Gift guides (urgent):** Holiday gift guides from publishers and bloggers are being written now. Each week, research 15 relevant guides and editors (personalized gifts, gifts for couples, pet lovers, families), record the exact URL, the public contact route, and fit, and draft a short personalized pitch.
- **Ongoing backlinks:** Unlinked brand mentions, resource and gift-idea pages, local Miami and Florida press (only if fulfillment location is verified), wedding, pet, and photography partners. Track every target and outcome in `outreach/`.
- **Creators:** Research 20 creators per week in the playbook niches, shortlist 5 with evidence, and draft outreach and a brief (real kit, photo to design story, build footage, reveal, reuse rights).
- **Weekly (Fri 6:00):** New targets, drafts for approval, status update on sent outreach.
- **Never:** Buy links, use private networks, or guess private contact details. Send outreach without approval. Invent rates or audience data.
- **Gap:** Ahrefs is configured but blocked from this environment. Backlink data comes from public research until a backlink tool is reachable.

### 4.6 Website conversion (priority 2)

- **Job:** Find and rank what stops visitors from buying.
- **Inputs:** Shopify sessions and funnel data, the live site via the preinstalled Playwright browser, `customer-questions.md`.
- **First run:** Walk the full path on mobile and desktop (land, upload photo, preview, size choice, cart, checkout up to payment). Record load times, errors, unclear steps, and missing reassurance (size and faces guide, kit contents, delivery dates, real photos, reviews). Deliver the five most consequential issues with evidence.
- **Every two weeks (Wed):** Re-test after changes and propose one test for `experiments.md`.
- **Never:** Place real orders, change the theme, or alter the design engine without approval.

### Later agents (not built now)

Customer support, order coordinator, inventory, and corporate gifting sales. These are added once the first six run reliably and the order handoff is verified, as the playbook recommends.

## 5. Schedule summary

| Agent | Cadence | Day and time (ET) |
|---|---|---|
| Growth analyst | Weekly, plus daily Nov 16 to Dec 20 | Mon 6:00; daily 8:00 |
| Email and recovery | Weekly | Tue 6:00 |
| SEO and blog | Weekly | Wed 6:00 |
| Conversion | Every two weeks | Wed 9:00 |
| Content and social | Weekly, plus daily live check once enabled | Thu 6:00; daily 18:00 |
| Backlinks, PR, creators | Weekly | Fri 6:00 |

The owner reviews the approval file once a week (suggested Monday) and approves time-sensitive items as they appear.

## 6. Rollout

- **Week 1 (Oct 12 to 18):** Build agent files, brand and approval skills, and records. Growth analyst baseline. SEO audit. Email audit. First gift-guide target list and pitches. Conversion first run.
- **Week 2 (Oct 19 to 25):** First approved outputs go live. Holiday offer calendar and order-by date confirmed by owner. First social calendar. First Christmas hub page drafted.
- **Weeks 3 to 4 (Oct 26 to Nov 8):** Black Friday and Cyber Monday email and social plan approved. Creator pilot if budget allows. Duplicate articles consolidated.
- **Week 4 review (around Nov 8):** Check agent accuracy, approval workload, and early results. Decide whether to allow scheduled social publishing without per-post approval.
- **Peak (Nov 16 to Dec 20):** Daily holiday pulse. Order-by countdown content.
- **January:** Post-season review. Plan the later agents.

## 7. What the owner needs to provide

| Item | Needed by | Blocks |
|---|---|---|
| Postiz API key and which social accounts are connected | Week 1 | Social scheduling and live checks |
| Confirm Omnisend is the email platform in use | Week 1 | Email agent |
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
- **Conflicting runs:** Each agent writes only to its own folder plus append-only rows in shared logs. Agents pull before writing and push after.
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
- Removing the zip and duplicate theme folder from the repo.
