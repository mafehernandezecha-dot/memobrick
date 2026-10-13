Status: needs owner (both call actions say "created by Google Ads and can't be edited"; there is no Edit settings button)

# Claude in Chrome task: call conversion actions to secondary (approval item: A-2026W42-020, from P-ads-analyst-20261013-2)

Change file: `marketing/analytics/ads-analyst/changes/google-conversion-call-actions-secondary.md`. Do not run until the queue shows the item approved; the ads analyst then sets the first line to `Status: ready` and adds the A- ID here.

Google login: Chrome has several Google accounts signed in. If Google Ads shows an account chooser or the wrong account, open the chooser and try each signed-in Google account until one lists 672-499-4049 (it is not memobrickofficial@gmail.com and not mafehernandezecha2@gmail.com). Never sign in or out, never enter a password.

```
You are helping me in my Google Ads account 672-499-4049 (Memobrick). I approved this change; do exactly this and nothing else.

First confirm the account at the top of Google Ads is 672-499-4049. If it is not, stop and tell me.

Go to Goals > Conversions > Summary.
1. Open "Calls from Smart Campaign Ads". Click Edit settings. Change "Action optimization" from Primary action to Secondary action. Save.
2. Open "Smart campaign ad clicks to call". Do the same. Save.

Do not change "Google Shopping App Purchase" or any other conversion action. Do not remove anything. If either action is already Secondary, leave it and tell me. If the names are different, stop and tell me.

When done, list every conversion action that is Primary.
```

## Result

2026-10-13 run (Google account photobrickusa@gmail.com, authuser=1, lists 672-499-4049):
- "Calls from Smart Campaign Ads" (ID 532070521): Primary. The detail page shows "Phone call leads, Primary action" and "This conversion action was created by Google Ads and can't be edited." There is no Edit settings button, so the task steps can't be followed. Nothing changed.
- "Smart campaign ad clicks to call": Primary in the list. Not opened; it is the same kind of Google-created Smart campaign action. Nothing changed.
- Primary actions in the list (Status: All, 23 rows) include Google Shopping App Purchase, Transactions (All Web Site Data), Purcharse_Photobrick, CompraFinal, Compra_Photobrick, Agregar al carrito, AddCart, Calls from Smart Campaign Ads, Smart campaign ad clicks to call and Clicks to call. Most of the old ones show as Removed. The other rows were not read.
- Next step for the owner or ads analyst: the "Action optimization" cell in the All conversions list, or the goal's "Edit goal" settings, may let you set these to secondary. That is a different path from the approved steps, so the ads analyst should rewrite the task if you want it tried.
