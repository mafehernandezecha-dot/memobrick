# ads-analyst 2026-11-14 (task board check, read-only)

## Summary
- Meta's 3x purchase overcount is both: about one third is attribution (11 of 34 purchases are 1-day view-through) and most of the rest matches the server feed sending 1.86 Purchase events per Shopify order (128 server events for 69 orders, Oct 17 to Nov 12).
- Purchase match quality is good (8.3 of 10). Dedup (event_id coverage) cannot be read through the API; Eden's 2-minute Events Manager check is still the only direct read.
- No change and no proposal today, as the board asks.

## Done
- Task board row: done. The 4-row table (sources, dedup, match quality, diagnostics) and the attribution split are in `marketing/analytics/ads-analyst/2026-11-14-pixel-check.md`.
  - Sources: Purchase arrives from both browser (57) and Conversions API (128) against 69 Shopify orders. Hosts: mymemobrick.com and shop.app. No code-free Purchase rule on the pixel.
  - Dedup: not exposed by the dataset tools. Unverified; the server feed alone is about 2 per order, which a browser-server dedup would not remove.
  - Match quality: Purchase 8.3, InitiateCheckout 6.7, AddToCart 6.3. Weak spot is the click ID (fbc) on early events, 7 to 15%.
  - Diagnostics: no warning field readable through these tools.
- One line: **the 3x gap is about one third attribution (view-through) and two thirds likely double-sent server Purchase events.**
- Approvals: `check.py approvals --agent ads-analyst --today 2026-11-14` printed nothing. Nothing to act on. Chrome tasks: none ready or newly done.
- Adspirer: no calls this run. Meta reads only (Facebook connector, free).

## Proposed for approval
None (task board rule 2).

## Blocked or unknown
- Event_id dedup coverage and Meta's own duplicate-event warnings are not available through the connector. Eden's steps: `marketing/analytics/ads-analyst/changes/2026-10-30-pixel-dedup-steps.md` (the second Conversions API sender check in step 4 is the likely fix).
- Whether the duplicate server events come from a second integration or from Shop Pay checkouts on shop.app: unknown, inference only.
- No Mac data snapshot yet (`marketing/data/latest.md` still "never").

## Sales impact
No order today from this run; it is a measurement check. It matters for Black Friday budgets: Meta's purchase counts and ROAS should be read at about half, so no Meta budget should rise on Meta's numbers, and decisions stay on Shopify UTM orders. If Eden removes the duplicate sender, Meta's purchase optimization learns from true counts before the Nov 27 to 30 sale days.

## Next run
Mon Nov 16: first daily pacing check. If allowed by the board, propose the Billo UGC cut (below 2.0 for 7 days) and moving the money to campaigns with Shopify orders. If A-2026W46-008 or the brand budget item is approved, set its Chrome task to ready.
