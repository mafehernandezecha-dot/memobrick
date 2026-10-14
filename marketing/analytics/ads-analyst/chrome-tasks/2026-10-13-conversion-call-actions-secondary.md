Status: done 2026-10-14

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

2026-10-14 run (Google account photobrickusa@gmail.com, authuser=1, account 672-499-4049 confirmed in the account menu). Nothing was changed.

- Step 1, "Calls from Smart Campaign Ads": the Action optimization cell says Primary. Clicking it opens no menu. The row has a lock icon and a greyed-out checkbox, so it can't be edited. Not changed.
- Step 2, "Smart campaign ad clicks to call": same as step 1 (Primary, locked, no menu). Not changed.
- Step 3, goal "Phone call lead" (Goals > Summary, read only):
  - Not "Account-default". Only Purchase is marked Account-default.
  - Conversion actions in the goal: 1, "Calls from Smart Campaign Ads" (Primary, Call from Ads, Awaiting conversions, 0 conversions).
  - Campaigns using it: 0 of 45. Status: Needs attention.
  - "Smart campaign ad clicks to call" is not in this goal. In the All conversions list it is grouped under "Contacts" (Included in account-level goals: Yes). There is no "Contacts" goal card on the Summary page; the cards there are Purchase, Add to cart, Begin checkout, Phone call lead, Other and Page view, plus Custom goals.
- Not touched: "Google Shopping App Purchase" and every other conversion action. No goal was edited or removed.
- Primary conversion actions (Status: All, 23 rows):
  - Active: Google Shopping App Purchase (Needs attention); Calls from Smart Campaign Ads (locked, Awaiting conversions); Smart campaign ad clicks to call (locked, Awaiting conversions).
  - Removed: Transactions (All Web Site Data), Purcharse_Photobrick, CompraFinal, Compra_Photobrick, Agregar al carrito, AddCart, Clicks to call, Local actions - Directions, Android installs (all other apps), Local actions - Other engagements, Local actions - Website visits.
- Still to do: the two Google-created Smart campaign call actions stay Primary because Google Ads doesn't let you edit them. "Phone call lead" is used by 0 campaigns. "Smart campaign ad clicks to call" counts toward the account-level goals, but the Purchase goal on all 45 campaigns has 1 primary action. The ads analyst should check whether this still matters for bidding, or try "Edit goal" on the account-level goals. That would be a new task.

Previous run:

2026-10-13 run (Google account photobrickusa@gmail.com, authuser=1, lists 672-499-4049):
- "Calls from Smart Campaign Ads" (ID 532070521): Primary. The detail page shows "Phone call leads, Primary action" and "This conversion action was created by Google Ads and can't be edited." There is no Edit settings button, so the task steps can't be followed. Nothing changed.
- "Smart campaign ad clicks to call": Primary in the list. Not opened; it is the same kind of Google-created Smart campaign action. Nothing changed.
- Primary actions in the list (Status: All, 23 rows) include Google Shopping App Purchase, Transactions (All Web Site Data), Purcharse_Photobrick, CompraFinal, Compra_Photobrick, Agregar al carrito, AddCart, Calls from Smart Campaign Ads, Smart campaign ad clicks to call and Clicks to call. Most of the old ones show as Removed. The other rows were not read.
- Next step for the owner or ads analyst: the "Action optimization" cell in the All conversions list, or the goal's "Edit goal" settings, may let you set these to secondary. That is a different path from the approved steps, so the ads analyst should rewrite the task if you want it tried.
