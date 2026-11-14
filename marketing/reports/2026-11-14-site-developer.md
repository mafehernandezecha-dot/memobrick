# site-developer 2026-11-14

## Summary
Task board done: one combined "Black Friday theme copy" plan, `marketing/conversion/site-developer/fixes/black-friday-theme-copy-plan.md`, linked from the Nov 13 rebuild plan. 018, 019, 017 and 009 go on one copy: one deleted theme, one publish, about 2 hours of build in one run.
No copy created (waiting on Eden's answer on A-2026W44-018). Live theme unchanged since Oct 28.

## Done
- Approvals: A-2026W44-018 (expires Nov 15) and 019 (Nov 30) are approved but still not live. They wait on Eden's answer in the queue (top question on A-2026W44-018). The connector refuses writes to the live theme, and I may not publish.
- Read-only check of live: MAIN is still "Memobrick fixes" 189310075100. The md5 values of all 6 files the four fixes touch are recorded in the plan. `free_shipping_threshold` exists in the live settings schema, so 017 can read $125 from it. Theme count is 20 of 20.
- Plan (task board): files and md5 for each item, where they overlap (memobrick-site.liquid holds 018 and 017, cart.liquid holds 019 and 017, in different lines), and the build order with minutes: 018 and 019 first (ready files, 5 min), then 017 (20 min), then 009 (30 min), then tests (45 min) and one publish card (15 min). What happens if only 018 and 019 are approved: the 25-minute rebuild runs on its own. 017 or 009 can still join the same unpublished copy if approved before Eden publishes. After she publishes, each would need its own slot and publish. If the Nov 2 and 3 edits are Eden's, no new copy is needed: 017 and 009 go into 189322330332.
- `working-theme.md` updated.

## Proposed for approval
None

## Blocked or unknown
- Eden's answer on A-2026W44-018 (queue, top question) still blocks every theme fix. No new question here.
- A-2026W44-018 lapses Nov 15. If the publish slips past that, I re-propose the same draft that day.
- To ship all four together, 017 and 009 need approval. 009 lapses Nov 20.

## Sales impact
This run brings no order by itself. The plan turns four fixes into one 1-minute publish before Black Friday. Those fixes are the free-proof fallback (proof requests are the largest lost-order cause), the missing-photo cart notice, the honest free-shipping and codes line (phone checkout completion is at 24%), and the gift-collection start block (phone add to cart is at 5.7%).

## Next run
If Eden answered and a slot is free, build the copy as the plan says, with only the approved items. If 189322330332 was published, verify it live by checksum on phone and desktop. Otherwise exit quickly.
