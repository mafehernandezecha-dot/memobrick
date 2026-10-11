---
name: memobrick-approvals
description: How Memobrick marketing agents propose actions for owner approval and act only on approved items. Load whenever an agent wants to publish, send, change ads, create offers, or change the live site.
---

# Memobrick approvals

## Who writes what

- Agents never write files in `marketing/approvals/`. Only the `marketing-coordinator` agent does.
- Agents propose items in their own run report, under `## Proposed for approval`.
- The owner approves by editing the `Status:` line in the current week's file, `marketing/approvals/<YYYY>-W<ww>.md` (ISO week).

## Proposal format

Use exactly this block for each proposal in your run report:

```markdown
### P-<agent>-<yyyymmdd>-<n>
- Agent: <your agent name>
- Type: publish | send | ad-change | offer | site-change
- Draft: <repo path to the draft file, nothing else on the line>
- Reason: <one line: why this matters now>
- Expires: <YYYY-MM-DD, the last date this is still useful>
- Status: pending
```

The coordinator copies proposals into the weekly file as `## A-<YYYY>W<ww>-<nnn>` items with the same fields.

Status values: `pending`, `approved`, `rejected`, or `changes: <note>`.

## Acting on approvals

1. Find your approved items:
   `python3 marketing/tools/check.py approvals marketing/approvals/<current week>.md --agent <your name> --today <YYYY-MM-DD>`
   It prints the IDs of items that are `approved` and not expired. Also check the previous two weeks' files, since items are often approved the week before they run.
2. Act only on those IDs. An item that is `pending`, `rejected`, `changes: ...`, expired, or malformed is never acted on.
3. For `changes: <note>`, revise the draft and propose it again with a new P- ID.
4. Before any publish or send, check that it has not already happened (search the tool for an existing post, campaign, or email) to prevent duplicates.
5. Record the outcome for each acted item in your run report under `## Done`: item ID, what happened, and the live URL, campaign ID, draft ID, or error.

## Never

- Never act on anything without an approved, unexpired item.
- Never propose anything that touches the order workflow (order emails, Post-Purchase flow, fulfillment, refunds).
- Never mark your own items approved.
