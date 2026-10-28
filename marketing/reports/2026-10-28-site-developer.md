# site-developer 2026-10-28

## Summary
Built and tested one fix: an A/B "your own photo" link on ready-made design pages (Wilson's audit problem 3), in theme copy 189310075100.
A-2026W43-002 again printed as approved but is moot (the kit page fix is live); not applied. No live writes.

## Done
- A-2026W43-002: not acted on. Duplicate of A-2026W43-001, already live; live `product.liquid` has the creator check. It expires today.
- Live theme is still "Memobrick holiday gift boxes" (189177626844, updated 2026-10-25). Created working copy "Memobrick fixes" (189310075100) and changed only `templates/product.liquid`.
- Tested on phone and desktop: arm A unchanged, arm B shows the link and it reaches the editor, kit pages unchanged, no horizontal scroll. Screenshots in `marketing/conversion/site-developer/2026-10-28-ready-made-own-photo/`.
- Draft: `marketing/conversion/site-developer/fixes/ready-made-own-photo-link.md`.

## Proposed for approval
### P-site-developer-20261028-1
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/ready-made-own-photo-link.md
- Reason: Adds a text link "Want it with your own photo?" to ready-made design pages for half of visitors (A/B test CA-20261028-01); the owner publishes theme copy "Memobrick fixes" (189310075100) after approval because the connector cannot write to the live theme.
- Expires: 2026-11-04
- Status: pending

## Blocked or unknown
- The Shopify connector blocks live-theme writes, so approved items still need the owner to publish the copy.
- Orders cannot be split by A/B arm (arm is stored in the browser). The test measures editor landings with `?from=ready-made`.
- Owner: set A-2026W43-002 to rejected.
- Theme count is 20 of 20; the owner may delete old copies (for example the memobrick-theme-v22 to v26 and "Copy of" themes) so new copies can be made.
- Phone and referred-only funnel numbers still need GA4 or a device-filtered Shopify report.

## Sales impact
Addresses Wilson's problem 3 (ready-made pages with 0 add to cart from about 640 monthly sessions). Expected effect is small and unproven (a few orders a month at best); it is a test, not a promise.

## Next run
Apply P-site-developer-20261028-1 once approved and published; recheck the live theme id; follow up the funnel numbers when GA4 data exists.
