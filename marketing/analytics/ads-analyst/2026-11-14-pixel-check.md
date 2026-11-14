# Meta pixel and dataset check, 2026-11-14 (read-only)

Dataset: photobrickusa's Pixel, ID 3444389275577775 (active, last browser and server event 2026-11-13 18:57 PT, automatic matching on for email, first and last name). Window: Oct 17 to Nov 13 (Meta days, Pacific time). Shopify orders from `marketing/sales/latest.json` (Oct 17 to Nov 12, ET days). Tools: `ads_get_dataset_details`, `ads_get_dataset_quality`, `ads_get_dataset_stats` (by source, server only, browser only, total, host), `ads_pixel_event_read`, and campaign insights with attribution windows. Nothing was changed.

## The 4 rows

| Check | What Meta shows | Reading |
|---|---|---|
| Sources | Purchase arrives from both. Oct 17 to Nov 12: **128 server (Conversions API) events and 57 browser events against 69 Shopify orders**. Server sends 1.86 Purchase events per order on average, every day (for example Nov 10: 10 server, 5 browser, 5 orders; Nov 11: 9, 4, 4). Events come from two hosts: mymemobrick.com (about 140) and shop.app (about 52). No code-free Purchase rule is set on the pixel (`ads_pixel_event_read` empty). | Two server senders, or one sender firing twice per order. A single correct server feed would send about 1 per order (69). |
| Dedup (event_id coverage) | Not exposed by the API tools: the quality read returns no deduplication or event_id field for Purchase. | **Unverified.** Browser plus server events that share an event_id would be merged, but the server feed alone is already about 2 per order, and two server events of the same order are only merged if they carry the same event_id. Eden's 2-minute Events Manager check (`changes/2026-10-30-pixel-dedup-steps.md`) is still the only way to read the dedup percentage. |
| Event match quality | Purchase 8.3 of 10 (email, name, IP, user agent, fbp all 100%). AddPaymentInfo 8.3, InitiateCheckout 6.7, AddToCart 6.3, PageView 6.3, ViewContent 6.1. Purchase uploads in real time. | Good for Purchase. Not the cause of the gap. Weak spots are earlier events: fbc (click ID) only 7 to 15%, email 12% on AddToCart. |
| Duplicate-purchase diagnostics | No diagnostic or warning field is returned by these tools. Indirect evidence: total Purchase events 192 in 28 days for about 72 orders (2.7 events per order); a third host appears once (memobricks.com, 4 events on Oct 20). | No Meta warning could be read. The counts themselves point to duplicates on the server side. |

## The 3x gap: dedup or attribution?

Meta's 34 purchases over Oct 16 to Nov 12 (5 campaigns: ALWAYON PROMO 11, Proven Videos 9, Billo UGC 6, Proven Winners 5, Christmas 3) split by attribution window:

| Window | Purchases |
|---|---|
| Default (7-day click + 1-day view; Christmas is 7-day click only) | 34 |
| 7-day click only | 23 |
| 1-day view (overlaps) | 13 |

- About 11 of the 34 (one third) are view-through: people who saw an ad and bought within a day without clicking. That is attribution, not a tracking fault.
- The other 23 click-based purchases still compare with 11 UTM-tagged Shopify orders, about 2.1 to 1. That ratio matches the 1.86 server events per order above.

**Answer: both. About one third of the gap is attribution (view-through), and most of the rest is consistent with Purchase being double sent from the server.** The second part is an inference from the counts, because the API does not show event_id coverage.

## What it means for decisions

- Meta's own purchase counts and ROAS should be read at about half. Budget decisions stay on Shopify UTM orders, as the standing rule already says.
- Meta's purchase optimization learns from the doubled counts. If the duplicates are random by order, it still learns from the right buyers, only with inflated volume; if one host (shop.app, Shop Pay) is counted twice and the other once, Meta overweights Shop Pay buyers. Not provable from here.
- Likely fix, for Eden (no proposal today, per the task board): in Events Manager, Settings, check for two Conversions API connections on this dataset (Shopify's Facebook and Instagram app plus a second partner or app), and keep only Shopify's. Steps already written: `marketing/analytics/ads-analyst/changes/2026-10-30-pixel-dedup-steps.md`.

## Raw daily counts (Purchase)

| Day (PT) | Server | Browser | Shopify orders (ET) |
|---|---|---|---|
| Oct 17 | 4 | 2 | 2 |
| Oct 18 | 3 | 1 | 2 |
| Oct 19 | 5 | 2 | 2 |
| Oct 20 | 4 | 2 | 2 |
| Oct 21 | 10 | 4 | 6 |
| Oct 22 | 4 | 2 | 2 |
| Oct 23 | 6 | 3 | 3 |
| Oct 24 | 5 | 2 | 2 |
| Oct 25 | 4 | 2 | 2 |
| Oct 26 | 0 | 0 | 0 |
| Oct 27 | 1 | 0 | 1 |
| Oct 28 | 7 | 3 | 4 |
| Oct 29 | 5 | 2 | 4 |
| Oct 30 | 6 | 2 | 3 |
| Oct 31 | 2 | 1 | 1 |
| Nov 1 | 8 | 4 | 4 |
| Nov 2 | 6 | 3 | 3 |
| Nov 3 | 2 | 1 | 1 |
| Nov 4 | 5 | 2 | 3 |
| Nov 5 | 2 | 1 | 1 |
| Nov 6 | 4 | 2 | 2 |
| Nov 7 | 7 | 3 | 4 |
| Nov 8 | 2 | 1 | 1 |
| Nov 9 | 3 | 1 | 2 |
| Nov 10 | 10 | 5 | 5 |
| Nov 11 | 9 | 4 | 4 |
| Nov 12 | 4 | 2 | 3 |
| Nov 13 (partial) | 5 | 2 | not stored |
| **Oct 17 to Nov 12** | **128** | **57** | **69** |

Meta days are Pacific and Shopify days are Eastern, so single days can differ by an order; the totals are what matter.
