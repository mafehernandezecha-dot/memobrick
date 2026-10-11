# Memobrick Marketing Agents (Wave 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the shared foundation and the 10 wave 1 marketing agents for Memobrick, dry-run each one, and prepare their scheduled routines.

**Architecture:** Each agent is a Claude Code subagent file in `.claude/agents/`. Three shared skills hold brand rules, the approval protocol, and the standard run routine. Agents exchange work through markdown files under `marketing/`, and a small stdlib Python checker validates agent files, the folder layout, approval files, and customer copy.

**Tech Stack:** Claude Code subagents and skills (markdown with YAML frontmatter), Python 3.13 standard library (`unittest`, no third-party packages), Claude Code scheduled routines, MCP connectors (Shopify, Omnisend, Meta, Google Drive, Postiz CLI).

**Spec:** `docs/superpowers/specs/2026-10-11-memobrick-marketing-agents-design.md`

## Global Constraints

- Agent files are flat: `.claude/agents/<name>.md` (team is a name prefix, not a subfolder), so Claude Code discovers them reliably.
- Agent frontmatter: `name` (equals filename without `.md`) and `description` are required. Omit `tools` so agents inherit the session's MCP connectors.
- Every agent body has these sections in order: `## Job`, `## Inputs`, `## Cadence`, `## Steps`, `## Outputs`, `## Never`, and one line `Output folder: marketing/<team>/<agent-folder>/`.
- Every agent's Steps begin with: "Follow the memobrick-run skill."
- No publishing, sending, ad changes, offers, or live site changes without an `approved` item in the approval file.
- No invented numbers, dates, contacts, rates, or reviews. Unknown stays "unknown".
- Customer-facing copy: no em dashes (U+2014); approved terms "custom brick mosaic", "personalized photo gift", "DIY brick mosaic kit", "40+ colors", "1×1 bricks"; one call to action per message.
- Shipping claim "Miami, Florida" only after the owner verifies it in `offers-calendar.md` facts section.
- UTM format: `utm_source=<platform>&utm_medium=<organic|email|paid|referral>&utm_campaign=<yyyy-mm-slug>`.
- Order workflow is off limits: agents send nothing to customers about their orders and never touch order notifications, fulfillment, refunds, or the Omnisend "Post-Purchase: Build & Delight" flow. Shopify handles orders as today.
- Times are US Eastern (`CRON_TZ=America/New_York`).
- Only the marketing coordinator writes `marketing/approvals/`.
- Do not touch the theme folders or the zip at the repo root.

## Review Focus

- An approval item whose `Expires` date has passed but whose status is `approved`: agents must not act on it (test in Task 1).
- An approval status written loosely by the owner (`Approved`, `approved ` with trailing space, `changes: shorter title`): parsed case-insensitively and trimmed; anything else counts as not approved (test in Task 1).
- An approval item missing a field or with a malformed date: reported as an error, never treated as approved (test in Task 1).
- Customer copy containing an em dash inside otherwise valid text: the checker reports the line number (test in Task 1).
- A proposal from any agent that touches the order workflow (order emails, Post-Purchase flow, fulfillment): the coordinator rejects it from the approval file and flags it (Task 4 coordinator Steps).
- An agent file whose `name` does not match its filename, or whose output folder does not exist: checker fails (test in Task 1, exercised for real agents in Tasks 4 to 8).

---

### Task 1: Checker tool

**Files:**
- Create: `marketing/tools/check.py`
- Test: `marketing/tools/test_check.py`

**Interfaces:**
- Produces:
  - `parse_frontmatter(text: str) -> dict[str, str]` (simple `key: value` lines between the first two `---` lines; returns `{}` if absent)
  - `check_agent_file(path: pathlib.Path, repo_root: pathlib.Path) -> list[str]` (error strings; empty means valid)
  - `find_em_dashes(text: str) -> list[int]` (1-based line numbers)
  - `parse_approvals(text: str) -> tuple[list[dict], list[str]]` (items, errors). Item keys: `id, agent, type, draft, reason, expires (datetime.date), status`. `status` is normalized to lowercase and trimmed.
  - `approved_items_for(items: list[dict], agent: str, today: datetime.date) -> list[dict]` (status exactly `approved`, agent matches, `expires >= today`)
  - `check_layout(repo_root: pathlib.Path) -> list[str]` (missing required files)
  - CLI: `python3 marketing/tools/check.py agents|layout|copy <paths...>|approvals <file> [--agent NAME --today YYYY-MM-DD]`, exit 0 on success, 1 on errors, printing one error per line. `approvals --agent` prints approved item IDs, one per line.

Approval file format (pinned; Tasks 2 and 4 document it):

```markdown
## A-2026W42-001
- Agent: seo-blog-writer
- Type: publish
- Draft: marketing/seo/writer/drafts/christmas-photo-gifts.md
- Reason: Christmas hub page, needs crawl time before December
- Expires: 2026-10-25
- Status: pending
```

`Type` is one of `publish, send, ad-change, offer, site-change`. `Status` is `pending`, `approved`, `rejected`, or `changes: <note>`.

Required layout for `check_layout`: `marketing/README.md`, `marketing/shared/{scorecard,experiments,offers-calendar,content-calendar,customer-questions,contacts-log}.md`, `marketing/approvals/TEMPLATE.md`, `.claude/skills/{memobrick-brand,memobrick-approvals,memobrick-run}/SKILL.md`.

- [ ] **Step 1: Write the failing tests** in `marketing/tools/test_check.py` (`unittest`, temp dirs via `tempfile.TemporaryDirectory`):
  - `test_frontmatter_parsed`: `"---\nname: growth-analyst\ndescription: x\n---\nbody"` gives `{"name": "growth-analyst", "description": "x"}`.
  - `test_valid_agent_file_passes`: a file with matching name, description, all six sections in order, `Follow the memobrick-run skill.`, and an existing output folder returns `[]`.
  - `test_agent_name_mismatch_fails`: `name: wrong` in `growth-analyst.md` returns an error containing `"name"`.
  - `test_agent_missing_section_fails`: no `## Never` returns an error containing `"## Never"`.
  - `test_agent_missing_output_folder_fails`: output folder path that does not exist returns an error containing `"Output folder"`.
  - `test_em_dash_lines`: `"ok\nbad — here\nfine"` gives `[2]`; text with only hyphens gives `[]`.
  - `test_parse_approvals_valid`: the sample above gives one item with `expires == date(2026,10,25)` and `status == "pending"`, no errors.
  - `test_status_normalized`: `Status:  Approved ` gives `"approved"`; `Status: changes: shorter title` gives `"changes: shorter title"`.
  - `test_missing_field_is_error`: item without `Expires` gives an error containing the item ID and the item is excluded.
  - `test_bad_date_is_error`: `Expires: Oct 25` gives an error and the item is excluded.
  - `test_approved_items_for_filters`: three items for `seo-blog-writer` (approved and not expired, approved but expired on 2026-10-10 with today 2026-10-11, pending) plus one approved item for another agent gives only the first.
  - `test_layout_reports_missing`: empty temp dir returns one error per required file.

- [ ] **Step 2: Run tests to verify they fail**

Run: `python3 -m unittest marketing/tools/test_check.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'check'` (test file inserts its own directory into `sys.path`).

- [ ] **Step 3: Implement `marketing/tools/check.py`** with the interfaces above. Standard library only. `parse_approvals` splits on lines starting `## `, reads `- Key: value` lines, uses `datetime.date.fromisoformat` for `Expires`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `python3 -m unittest marketing/tools/test_check.py -v`
Expected: all 12 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add marketing/tools/
git commit -m "Add checker for agent files, approvals, layout, and copy"
```

### Task 2: Shared skills

**Files:**
- Create: `.claude/skills/memobrick-brand/SKILL.md`
- Create: `.claude/skills/memobrick-approvals/SKILL.md`
- Create: `.claude/skills/memobrick-run/SKILL.md`

**Interfaces:**
- Consumes: approval format and CLI from Task 1.
- Produces: skill names `memobrick-brand`, `memobrick-approvals`, `memobrick-run`, referenced by every agent.

Content requirements:
- **memobrick-brand:** Product facts from the playbook "What Memobrick is" and "What we sell"; the voice table (Use and Avoid) verbatim; approved terms; honesty rules; the shipping claim rule; the order-of-work priority; brand description paragraph verbatim; the rule that customer copy is checked with `python3 marketing/tools/check.py copy <file>` before proposing.
- **memobrick-approvals:** Agents never write `marketing/approvals/`. They list proposals in their run report under `## Proposed for approval` using the pinned item format with `Status: pending` and an ID of `P-<agent>-<yyyymmdd>-<n>`; the coordinator assigns final `A-` IDs. Agents act only on items returned by `python3 marketing/tools/check.py approvals <current week file> --agent <name> --today <date>`. After acting, the agent records the outcome (live URL, campaign ID, or error) in its run report.
- **memobrick-run:** The run routine every agent follows:
  1. `git pull` on the working branch.
  2. Load `memobrick-brand`.
  3. Act on approved items (via `memobrick-approvals`).
  4. Read the inputs listed in the agent file and `marketing/shared/offers-calendar.md`.
  5. Do the job. Write only to the agent's output folder, plus appended rows in `shared/experiments.md`, `shared/customer-questions.md`, or `shared/contacts-log.md`.
  6. Write `marketing/reports/<YYYY-MM-DD>-<agent>.md` with sections `## Summary`, `## Done`, `## Proposed for approval`, `## Blocked or unknown`, `## Next run`.
  7. Run `python3 marketing/tools/check.py copy` on any customer-facing draft created.
  8. Commit with message `<agent>: <one-line summary>` and push; on push conflict, pull and retry.
  9. If a connector fails, record it under `## Blocked or unknown`, finish what is possible, and never retry a publish or send blindly.
  - **Dry run mode:** if the instruction contains "dry run", skip step 3, make no external writes (no publish, send, schedule, or edit in any tool), and prefix the report title with `DRY RUN`.

- [ ] **Step 1: Write the three SKILL.md files** with frontmatter `name` and `description` and the content above.
- [ ] **Step 2: Verify frontmatter and copy**

Run: `python3 -c "import sys; sys.path.insert(0,'marketing/tools'); import check, pathlib; [print(p, check.parse_frontmatter(p.read_text())['name']) for p in pathlib.Path('.claude/skills').glob('*/SKILL.md')]"`
Expected: three lines naming `memobrick-brand`, `memobrick-approvals`, `memobrick-run`.

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/
git commit -m "Add shared brand, approvals, and run skills"
```

### Task 3: Shared records and layout

**Files:**
- Create: `marketing/README.md`
- Create: `marketing/shared/scorecard.md`, `experiments.md`, `offers-calendar.md`, `content-calendar.md`, `customer-questions.md`, `contacts-log.md`
- Create: `marketing/approvals/TEMPLATE.md`
- Create: `.gitkeep` in each wave 1 output folder: `marketing/coordination/coordinator/`, `marketing/analytics/growth-analyst/`, `marketing/seo/strategist/briefs/`, `marketing/seo/writer/drafts/`, `marketing/seo/technical/`, `marketing/outreach/gift-guide-pr/`, `marketing/social/planner/`, `marketing/social/publisher/`, `marketing/email/flow-optimizer/`, `marketing/email/campaign-writer/`, `marketing/reports/`

**Interfaces:**
- Consumes: `check_layout` from Task 1.
- Produces: the record files and columns every agent reads and appends to.

Record columns (markdown tables):
- `scorecard.md`: Week, Net sales, Orders, Conversion, AOV, Google organic orders, Email orders, Social orders, New customers, Returning customers, Notes. Seed row: "90-day baseline to 2026-10-11: 202 orders, $22.6k total sales, AOV about $112" plus the source table from spec section 1.
- `experiments.md`: ID, Agent, Hypothesis, Baseline, Primary metric, Guardrails, Start, End, Decision rule, Result, Decision.
- `offers-calendar.md`: two sections. `## Offers` table (Code, Discount, Start, End, Exclusions, Margin checked, Status) with existing Omnisend codes listed as "20% recovery and reactivation codes (automated)". `## Facts` table (Fact, Value, Verified by owner on) with rows: Christmas order-by date = unknown, Fulfillment location claim = unknown, Ad budget = unknown, Margins = unknown. Header line: "Only the owner edits this file."
- `content-calendar.md`: Post ID, Campaign, Channel, Asset, Caption file, CTA, Destination URL, Scheduled (ET), Status (Idea, Creating, Ready, Scheduled, Published, Failed), Live URL, Error, Results.
- `customer-questions.md`: Date, Source, Question or objection, Count, Used in.
- `contacts-log.md`: Date, Agent, Person or site, URL, Contact route, Purpose, Status.
- `README.md`: one paragraph on how the system works, the agent roster with schedule (spec section 5), how to approve (edit `Status:` lines in the current week's file), the exact instruction to run each agent manually ("Use the <name> agent to run its weekly job." and "... dry run."), and the owner inputs table from spec section 7.

- [ ] **Step 1: Run layout check to verify it fails**

Run: `python3 marketing/tools/check.py layout`
Expected: exit 1, listing the missing `marketing/` files (skills already exist from Task 2).

- [ ] **Step 2: Create the files and folders above.**
- [ ] **Step 3: Run layout check to verify it passes**

Run: `python3 marketing/tools/check.py layout`
Expected: exit 0, no output.

- [ ] **Step 4: Commit**

```bash
git add marketing/
git commit -m "Add shared marketing records and folder layout"
```

### Task 4: Coordination and analytics agents

**Files:**
- Create: `.claude/agents/marketing-coordinator.md` (Output folder: `marketing/coordination/coordinator/`)
- Create: `.claude/agents/growth-analyst.md` (Output folder: `marketing/analytics/growth-analyst/`)

**Interfaces:**
- Consumes: skills (Task 2), records (Task 3), checker (Task 1).
- Produces: `marketing/approvals/<YYYY>-W<ww>.md` (coordinator only), `marketing/shared/scorecard.md` rows (growth analyst).

Behavior from spec section 4, agents 1 and 2. Coordinator Steps must include: collect `## Proposed for approval` from all reports since its last run, assign `A-<YYYY>W<ww>-<nnn>` IDs, put items expiring within 7 days at the top under `## Time-sensitive`, flag overlaps (same contact in `contacts-log.md` within 30 days, same offer in two drafts, dates conflicting with `offers-calendar.md`), list missing owner inputs from the Facts table, drop and flag any proposal touching the order workflow, and validate the result with `check.py approvals`. Growth analyst Steps must name the ShopifyQL queries for net sales, orders, conversion, AOV, and orders by referrer source for the last 7 days and the same week of 2025.

- [ ] **Step 1: Write both agent files.**
- [ ] **Step 2: Validate**

Run: `python3 marketing/tools/check.py agents`
Expected: exit 0.

- [ ] **Step 3: Dry run growth analyst**

Run in a Claude Code session: "Use the growth-analyst agent to run its weekly job, dry run."
Expected: `marketing/reports/<date>-growth-analyst.md` titled `DRY RUN`, a scorecard row whose order count and sales match `FROM sales SHOW orders, total_sales SINCE -7d UNTIL today` run directly.

- [ ] **Step 4: Commit**

```bash
git add .claude/agents/marketing-coordinator.md .claude/agents/growth-analyst.md marketing/
git commit -m "Add marketing coordinator and growth analyst agents"
```

### Task 5: SEO and blog agents

**Files:**
- Create: `.claude/agents/seo-strategist.md` (Output folder: `marketing/seo/strategist/`)
- Create: `.claude/agents/seo-blog-writer.md` (Output folder: `marketing/seo/writer/`)
- Create: `.claude/agents/seo-technical.md` (Output folder: `marketing/seo/technical/`)

**Interfaces:**
- Produces: briefs at `marketing/seo/strategist/briefs/<slug>.md` with front lines `Status: ready for writer`, `Target keyword:`, `Hub:`; drafts at `marketing/seo/writer/drafts/<slug>.md` with `Status: ready for check`; technical SEO sets `Status: checked` and writes `marketing/seo/technical/checks/<slug>.md` (schema JSON-LD, redirect notes, issues).

Behavior from spec section 4, agents 4 to 6. Strategist Steps name the skills `searchfit-seo:keyword-clustering`, `searchfit-seo:content-brief`, `searchfit-seo:ai-visibility`. Writer Steps name `searchfit-seo:create-content` and require the copy check. Technical Steps name `searchfit-seo:seo-audit`, `searchfit-seo:technical-seo`, `searchfit-seo:schema-markup`, `searchfit-seo:broken-links`, and require the first run to inventory the GemPages article templates in `memobrick-size-zoom-test-latest (2)/templates/article.*` and compare against live URLs before proposing merges.

- [ ] **Step 1: Write the three agent files.**
- [ ] **Step 2: Validate** with `python3 marketing/tools/check.py agents`. Expected: exit 0.
- [ ] **Step 3: Dry run the chain**: strategist, then writer, then technical, each "dry run". Expected: one brief, one draft that passes `check.py copy`, one check file, and a technical audit at `marketing/seo/technical/audit-<date>.md`.
- [ ] **Step 4: Commit** `git commit -m "Add SEO strategist, blog writer, and technical SEO agents"`.

### Task 6: Email agents

**Files:**
- Create: `.claude/agents/email-flow-optimizer.md` (Output folder: `marketing/email/flow-optimizer/`)
- Create: `.claude/agents/email-campaign-writer.md` (Output folder: `marketing/email/campaign-writer/`)

**Interfaces:**
- Produces: `marketing/email/flow-optimizer/review-<date>.md`; campaign drafts at `marketing/email/campaign-writer/<yyyy-mm-dd>-<slug>.md` with Subject, Preview, Body, Audience, Exclusions, Send time, Success measure.

Behavior from spec section 4, agents 13 and 14, including the current flow table. Both Steps must follow the Omnisend MCP gate (call `tool_schema` and `tool_documentation` before `execute`), exclude the Post-Purchase flow and order notifications from all analysis and proposals, use only read tools (`get_automations`, `get_automations_id`, `post_analytics_statistics`, `post_analytics_reports`, `get_campaigns`, `get_segments`) unless acting on an approved item, and create campaigns in Omnisend only as drafts after approval, never `post_campaigns_id_send` without a separate approved `send` item.

- [ ] **Step 1: Write both agent files.**
- [ ] **Step 2: Validate** with `python3 marketing/tools/check.py agents`. Expected: exit 0.
- [ ] **Step 3: Dry run both.** Expected: a 90-day flow review naming the top three improvements with numbers from Omnisend, and one campaign draft that passes `check.py copy` and uses no code absent from `offers-calendar.md`.
- [ ] **Step 4: Commit** `git commit -m "Add email flow optimizer and campaign writer agents"`.

### Task 7: Social agents

**Files:**
- Create: `.claude/agents/social-planner.md` (Output folder: `marketing/social/planner/`)
- Create: `.claude/agents/social-publisher.md` (Output folder: `marketing/social/publisher/`)

**Interfaces:**
- Consumes: `shared/content-calendar.md` columns from Task 3.
- Produces: post packages at `marketing/social/planner/<week>/<post-id>.md`; calendar rows moved Idea to Ready (planner) and Scheduled, Published, or Failed (publisher).

Behavior from spec section 4, agents 10 and 11. Publisher Steps follow the Postiz skill hard rules (authenticate first, upload media with `postiz upload`, TikTok `DIRECT_POST`, read `integrations:settings` before scheduling), check for an existing post before any retry, and stop with a `## Blocked or unknown` entry if `POSTIZ_API_URL` or credentials are absent.

- [ ] **Step 1: Write both agent files.**
- [ ] **Step 2: Validate** with `python3 marketing/tools/check.py agents`. Expected: exit 0.
- [ ] **Step 3: Dry run both.** Expected: 5 post packages (3 video, 2 carousel) with UTM links and passing copy checks; publisher report lists what it would schedule, or reports Postiz as blocked.
- [ ] **Step 4: Commit** `git commit -m "Add social planner and publisher agents"`.

### Task 8: Gift guide and PR agent

**Files:**
- Create: `.claude/agents/outreach-gift-guide-pr.md` (Output folder: `marketing/outreach/gift-guide-pr/`)

**Interfaces:**
- Produces: `marketing/outreach/gift-guide-pr/targets-<date>.md` (Publication, Guide URL, Editor or author, Public contact route, Fit, Pitch file) and pitches at `marketing/outreach/gift-guide-pr/pitches/<slug>.md`; appends to `shared/contacts-log.md` only after a pitch is approved and sent.

Behavior from spec section 4, agent 7. Steps require checking `contacts-log.md` before adding any target, recording "unknown" for any contact not publicly listed, and sending only through Gmail drafts created for an approved `send` item.

- [ ] **Step 1: Write the agent file.**
- [ ] **Step 2: Validate** with `python3 marketing/tools/check.py agents`. Expected: exit 0.
- [ ] **Step 3: Dry run.** Expected: 15 targets with exact URLs and 15 pitches passing `check.py copy`.
- [ ] **Step 4: Commit** `git commit -m "Add gift guide and PR agent"`.

### Task 9: End-to-end approval cycle and schedules

**Files:**
- Modify: `marketing/README.md` (add the routine list and IDs)
- Create: `marketing/approvals/<current week>.md` (by the coordinator)

**Interfaces:**
- Consumes: all wave 1 agents.

- [ ] **Step 1: Coordinator dry run** over all Task 4 to 8 dry run reports. Expected: an approval file that passes `python3 marketing/tools/check.py approvals marketing/approvals/<week>.md` and lists missing owner inputs.
- [ ] **Step 2: Test item cycle.** Coordinator adds one low-risk item (a blog draft marked `publish` to a hidden or draft blog post in Shopify). Owner marks it `approved`. Run the blog writer (not dry run). Expected: the article exists as an unpublished Shopify draft and the report records its ID.
- [ ] **Step 3: Owner confirms schedules**, then create one scheduled routine per wave 1 agent with `create_new_session_on_fire=true`, cron from spec section 5 in `CRON_TZ=America/New_York` (jittered minutes per the routine tool's guidance), and prompt "Use the <name> agent to run its weekly job." Holiday pulse routines (growth analyst daily 8:00, coordinator daily 9:00) are daily crons whose prompt starts "If today is outside Nov 16 to Dec 20, 2026, stop without doing anything." and are disabled after Dec 20. Social publisher daily 18:00 is created disabled until Postiz is connected.
- [ ] **Step 4: Record routine IDs in `marketing/README.md` and commit** `git commit -m "Document wave 1 schedules and approval cycle"`.

---

## Not in this plan

Wave 2 agents (ads analyst, link builder, creator scout, community manager, conversion auditor, reviews and UGC) get their own plan after the week 4 review.
