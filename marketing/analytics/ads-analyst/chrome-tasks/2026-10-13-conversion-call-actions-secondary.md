Status: ready

# Claude in Chrome task: call conversion actions to secondary (approval item: A-2026W42-020, from P-ads-analyst-20261013-2)

Change file: `marketing/analytics/ads-analyst/changes/google-conversion-call-actions-secondary.md`. Do not run until the queue shows the item approved; the ads analyst then sets the first line to `Status: ready` and adds the A- ID here.

Google login: Chrome has several Google accounts signed in. If Google Ads shows an account chooser or the wrong account, open the chooser and try each signed-in Google account until one lists 672-499-4049 (it is not memobrickofficial@gmail.com and not mafehernandezecha2@gmail.com). Never sign in or out, never enter a password.

Rewritten 2026-10-14 by the ads analyst (same approved change, second path, because the detail pages have no Edit settings button): Step 3 only reads.

```
You are helping me in my Google Ads account 672-499-4049 (Memobrick). I approved this change; do exactly this and nothing else.

First confirm the account at the top of Google Ads is 672-499-4049. If it is not, stop and tell me.

Go to Goals > Conversions > Summary and switch the table view to show all conversion actions (Status: All).
1. In the row "Calls from Smart Campaign Ads", click the value in the "Action optimization" column (it says Primary). If a menu offers "Secondary", choose it and confirm. Save if asked.
2. Do the same in the row "Smart campaign ad clicks to call".
3. If the Action optimization cell cannot be changed for these rows, change nothing. Instead open the goal "Phone call leads" (Goals > Summary), and tell me: whether it says "Account-default goal", which conversion actions it holds, and which campaigns use it. Do not edit or remove the goal.

Do not change "Google Shopping App Purchase" or any other conversion action. Do not remove anything. If either action is already Secondary, leave it and tell me. If the names are different, stop and tell me.

When done, list every conversion action that is Primary.
```

## Result

(2026-10-14 run: filled in by the owner's Chrome routine)

Previous run:

2026-10-13 run (Google account photobrickusa@gmail.com, authuser=1, lists 672-499-4049):
- "Calls from Smart Campaign Ads" (ID 532070521): Primary. The detail page shows "Phone call leads, Primary action" and "This conversion action was created by Google Ads and can't be edited." There is no Edit settings button, so the task steps can't be followed. Nothing changed.
- "Smart campaign ad clicks to call": Primary in the list. Not opened; it is the same kind of Google-created Smart campaign action. Nothing changed.
- Primary actions in the list (Status: All, 23 rows) include Google Shopping App Purchase, Transactions (All Web Site Data), Purcharse_Photobrick, CompraFinal, Compra_Photobrick, Agregar al carrito, AddCart, Calls from Smart Campaign Ads, Smart campaign ad clicks to call and Clicks to call. Most of the old ones show as Removed. The other rows were not read.
- Next step for the owner or ads analyst: the "Action optimization" cell in the All conversions list, or the goal's "Edit goal" settings, may let you set these to secondary. That is a different path from the approved steps, so the ads analyst should rewrite the task if you want it tried.
