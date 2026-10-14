---
name: memobrick-approvals
description: How Memobrick marketing agents propose actions for owner approval and act only on approved items. Load whenever an agent wants to publish, send, change ads, create offers, or change the live site.
---

# Memobrick approvals

## Who writes what

- There is one rolling queue: `marketing/approvals/queue.md`. Only the `marketing-coordinator` agent adds, carries, or archives items in it.
- Agents propose items in their own run report, under `## Proposed for approval`.
- The owner approves by editing an item's `Status:` line in `queue.md`.
- Finished, rejected, and expired items are moved by the coordinator to `marketing/approvals/archive/<YYYY>-W<ww>.md`.

## Proposal format

Use exactly this block for each proposal in your run report:

```markdown
### P-<agent>-<yyyymmdd>-<n>
- Agent: <your agent name>
- Executor: <the agent that will carry it out once approved>
- Type: publish | send | ad-change | offer | site-change
- Draft: <repo path to one draft file, nothing else on the line>
- Reason: <one line: what happens if approved, and why now>
- Expires: <YYYY-MM-DD, the last date this is still useful>
- Status: pending
```

One draft file per proposal. Never point two proposals at the same file or add notes after the path.

The coordinator copies each proposal into `queue.md` as `## A-<YYYY>W<ww>-<nnn>` with the same fields plus `- Commit: <short sha>` (the last commit that changed the draft) and `- From: <P- ID>`.

Status values: `pending`, `approved`, `rejected`, or `changes: <note>`. Anything else is an error and is never treated as approved.

## What each type means when approved

| Type | Executor does |
|---|---|
| publish (article) | seo-blog-writer publishes the article live on the Shopify blog |
| publish (social post) | social-publisher prepares a ready-to-post kit that the owner's Mac posts itself at the post time through Claude in Chrome (or schedules it in Postiz if connected) |
| send (email campaign) | email-campaign-writer creates the campaign in Omnisend and schedules it for its send time, or applies the approved edit to an existing scheduled campaign |
| send (flow test) | email-flow-optimizer makes the flow change exactly as written |
| send (outreach pitch) | outreach-gift-guide-pr creates a Gmail draft for the owner to send |
| send (Collabs creators) | outreach-creator-scout, on the owner's Mac in Shopify Collabs: approves the listed creators into the fixed 10% commission, 10% discount tier, sends each one's message word for word, and declines the listed creators silently (a batch item, or one Top 3 creator per item) |
| site-change | site-developer (store and conversion fixes) or seo-technical (SEO fixes) applies exactly the change in the draft, after saving a backup |
| ad-change | Meta: ads-analyst applies exactly the change through the Meta connector. Google: ads-analyst writes a ready-to-paste task for the owner to run with the Claude extension in Chrome. New campaigns and ads are created paused unless the item says to launch |
| offer | nothing automatic; the owner applies it. Exceptions for outreach-creator-scout: a sample kit item approves the kit version of that creator's Collabs message (the owner ships the kit), and an engagement floor item sets the floor she sorts by |

Write the Reason so the owner knows exactly which of these will happen.

## Acting on approvals

1. Find your approved items:
   `python3 marketing/tools/check.py approvals marketing/approvals/queue.md --agent <your name> --today <YYYY-MM-DD>`
   It prints the IDs where you are the Executor, the status is `approved`, the item has not expired, and the draft has not changed since the item's Commit. A draft changed after approval is reported as needing re-approval; do not act on it, propose it again.
2. Act only on the printed IDs. Anything `pending`, `rejected`, `changes: ...`, expired, malformed, or changed is never acted on.
3. For `changes: <note>`, revise the draft and propose it again with a new P- ID.
4. Before any publish or send, check that it has not already happened (search the tool for an existing post, campaign, article, or email) to prevent duplicates.
5. Record the outcome for each acted item in your run report under `## Done`: item ID, what happened, and the live URL, campaign ID, article ID, draft ID, or error. The coordinator archives it from there.

## Never

- Never act on anything without an approved, unexpired, unchanged item where you are the Executor.
- Never propose anything that touches the order workflow (order emails, Post-Purchase flow, fulfillment, refunds).
- Never edit `queue.md` or mark your own items approved.
