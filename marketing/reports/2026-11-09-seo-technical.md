# Report: seo-technical 2026-11-09 (daily)

## Summary
Checked the baby's first Christmas draft (passes, proposed to publish). All 8 Christmas/mosaic articles plus Black Friday and baby are still not live.
Four approved items remain unapplied; SearchPie duplicate title/description tags are still live (A-2026W44-025).

## Done
- Approvals checker printed A-2026W43-003, A-2026W44-025, A-2026W41-012, A-2026W41-014. None applied: W44-025 is Eden's SearchPie switch (live /blogs/news/brick-mosaic-sizes still shows two titles and two descriptions, the second ending "| Memobrick" / "Memobrick"); W43-003 waits for Eden's yes on the kits (expires 2026-11-10); W41-012 and W41-014 are theme writes, blocked from here.
- Draft check: `babys-first-christmas-gift` (notes in `marketing/seo/technical/checks/babys-first-christmas-gift.md`), status set to `checked`, copy check passed.
- Live re-test of /blogs/news/ (site reachable, some 429 rate limits retried):

| Article | Today | Approval that unblocks it |
|---|---|---|
| photo-christmas-gift-for-husband | 404 | A-2026W45-006 |
| christmas-gift-for-girlfriend-photo | 404 | A-2026W45-013 |
| christmas-gift-for-boyfriend-who-loves-lego | 404 | A-2026W45-016 |
| christmas-gift-for-mom-from-kids | 404 | A-2026W44-068 |
| christmas-gifts-for-dog-lovers | 404 | A-2026W44-070 |
| best-photo-for-a-brick-mosaic | 404 | A-2026W44-056 |
| personalized-stocking-stuffers | 404 | A-2026W44-055 |
| photo-to-brick-mosaic-maker | 404 | A-2026W45-021 (approve A-2026W44-056 first) |
| personalized-gifts-black-friday | 404 | P-seo-technical-20261107-1 (pending) |
| babys-first-christmas-gift (new) | 404 | P-seo-technical-20261109-1 below |

- Sitemap returns 200. Not picked: content-fixes items (nothing publishable changes while the articles are unpublished).

## Proposed for approval

### P-seo-technical-20261109-1
- Agent: seo-technical
- Executor: seo-blog-writer
- Type: publish
- Draft: marketing/seo/writer/drafts/babys-first-christmas-gift.md
- Reason: Will publish "Baby's First Christmas Gift: A Photo Keepsake to Build" live on the Shopify blog, default article template (looks different from the GemPages articles; Eden can rebuild it in GemPages afterward). Targets high-intent baby gift searches with a $35 entry kit; publish by Nov 19 to be indexed before the Dec 15 cut-off.
- Expires: 2026-11-16
- Status: pending

## Blocked or unknown
- Eden: A-2026W44-025 (SearchPie off) is still the top SEO fix; A-2026W43-003 needs her yes on the kits and expires Nov 10.
- Theme writes blocked, so A-2026W41-012 and A-2026W41-014 cannot be applied.
- /products/1-big-board and /products/unlimited-memobrick hit a 429 rate limit during the link test; writer reported 200 today.
- No data snapshots yet (marketing/data/latest.md says nothing pulled): no impressions ranking; Search Console task unchanged, do not request unpublished URLs.

## Sales impact
Eleven gift articles for buying-intent searches are written and checked but unpublished; the Christmas ones are the biggest. The Dec 15 cut-off shrinks indexing time daily. Approving the queued publish items is the fastest SEO sales lever; A-2026W44-056 first.

## Next run
Tue Nov 10 (daily): recheck the 404 table, apply any approved item, check new drafts.
