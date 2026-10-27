# site-developer 2026-10-27

## Summary
check.py printed A-2026W43-002 as approved, but I did not apply it: it duplicates A-2026W43-001, which is already live, so applying it would change nothing useful.
No new fix built this run; no live writes, no backups needed.

## Done
- A-2026W43-002 (creator check on kit pages): not acted on. Read live MAIN theme "Memobrick holiday gift boxes" (189177626844, updated 2026-10-25) `templates/product.liquid`: `is_creator_product` already tests `size_id != ""` and "Custom Photo Brick Mosaic", so the "Design your own" and "Order with Pro Design" buttons render. Coordinator and the item's Flag both say to reject it. Nothing was written to Shopify.
- Follow-up on cart fixes (whole store, all devices; Shopify analytics here gives no phone or referred split, so this is only a rough read):
  - Oct 14-20: 1,494 sessions, conversion 0.87%, added to cart 5.29%, reached checkout 3.48%.
  - Oct 21-26: 2,100 sessions, conversion 0.76%, added to cart 3.14%, reached checkout 5.71%.
  - Reached checkout rose while add to cart fell (the larger traffic from Oct 21 is likely less qualified, and bots inflate sessions), so no clear verdict. The 65% phone cart-to-checkout target cannot be measured from this tool.

## Proposed for approval
None.

## Blocked or unknown
- Owner: please set A-2026W43-002 to rejected (moot, duplicate of live A-2026W43-001). It expires 2026-10-28.
- Phone and referred-only funnel numbers need GA4 (the data pull has not run) or a Shopify report with a device filter.
- Still open for the owner: kit orders of Oct 20-21 with no design; compare cart shipping quotes with checkout using a real address.

## Sales impact
None this run: nothing to apply and no unbuilt backlog item. The kit page buttons that matter for orders are confirmed live.

## Next run
Recheck live theme id (now 189177626844) before any new copy; apply any approved item; retry the funnel follow-up once GA4 data exists.
