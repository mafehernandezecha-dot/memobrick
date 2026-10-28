# seo-strategist 2026-10-28 (special run for Eden)

## Summary

Found the Christmas searches with buyer intent that no existing post targets, briefed and wrote the three with the highest sales value, and proposed them as one publish item (P-seo-strategist-20261028-1).
Wrote the 2027 seasonal plan (Valentine's, Mother's Day, Graduation, Father's Day): upgrade each existing post in place, plus one new gap article per season.
Nothing published; Eden approves, then Sandra (seo-blog-writer) publishes.

## Done

- Read sales goals and latest.json (referred traffic -51%, Oct 1 to 26 at 52% of order goal), offers-calendar, product-facts, the article list from Shopify (published articles; newest: brick-mosaic-sizes Oct 26, gift-for-someone-who-has-everything Oct 21, the Christmas hub Oct 14), and live pages of the grandparents, couples, pets and dont-wait-until-december posts (curl, live site reachable) to check angles.
- Gap check: none of the September Christmas posts targets late buyers, grandkids as givers, a wife as recipient, stocking stuffers, or dog lovers. The grandparents, couples and pet posts are evergreen with no Christmas angle.
- Briefs (Status: drafted):
  - marketing/seo/strategist/briefs/last-minute-personalized-christmas-gifts.md
  - marketing/seo/strategist/briefs/christmas-gifts-for-grandparents-from-grandkids.md
  - marketing/seo/strategist/briefs/photo-christmas-gift-for-wife.md
- Drafts written by me at Eden's request, following seo-blog-writer.md and memobrick-brand, each with FAQ section and FAQPage JSON-LD, links to the editor (/pages/editor), the free proof page (/pages/free-preview), the Art Gift Kit (/products/unlimited-memobrick) and the matching kit product pages:
  - marketing/seo/writer/drafts/last-minute-personalized-christmas-gifts.md ("Last-Minute Personalized Christmas Gifts (Honest Dates)")
  - marketing/seo/writer/drafts/christmas-gifts-for-grandparents-from-grandkids.md ("Christmas Gifts for Grandparents From the Grandkids")
  - marketing/seo/writer/drafts/photo-christmas-gift-for-wife.md ("A Photo Christmas Gift for Your Wife She Can Build")
- Images: Memobrick Studio exports only, reused from the W44 social redo (couple by the tree, grandmother and granddaughter, couple on the sofa), copied to marketing/seo/writer/drafts/images/ with a `Studio:` line in each draft.
- Checks: check.py copy passes on all three; titles 50 to 55 characters; meta 131 to 143; all 19 internal link targets return 200; the three new handles return 404 (free). Prices re-read in Shopify today (kits, frames, Art Gift Kit sizes).
- Publish batch: marketing/seo/strategist/publish-batches/2026-10-28-christmas-gap-articles.md (three rows with file hashes).
- Updated marketing/seo/strategist/page-plan.md and keyword-map.md; wrote marketing/seo/strategist/plan-2027.md; appended 2 rows to marketing/shared/customer-questions.md.

## Proposed for approval

### P-seo-strategist-20261028-1
- Agent: seo-strategist
- Executor: seo-blog-writer
- Type: publish
- Draft: marketing/seo/strategist/publish-batches/2026-10-28-christmas-gap-articles.md
- Reason: If approved, seo-blog-writer publishes all three Christmas articles live on the Shopify blog (last-minute gifts, gifts for grandparents from the grandkids, photo gift for your wife); live by early November so Google can index them before the December rush.
- Expires: 2026-12-10
- Status: pending

## Blocked or unknown

- One publish item for three articles is a batch; the approvals skill defines batches only for social weeks. The batch file sets the same rules (changes by handle). The coordinator may need to carry it by hand, and the checker may not print per-article lines.
- The normal step "seo-technical checks the draft first" was skipped to meet Eden's timing; the JSON-LD and publishing notes are inside each draft. Inesita can still check them before Eden approves.
- The three Studio images come from W44 social posts that still wait on Eden's OK of the new images. If she rejects one of those images, swap that article's image before publishing.
- The free-proof form on /pages/free-preview did not render in the 2026-10-26 conversion audit (fallback site change pending). The articles link to the page; if the form is still blank, the link sends people to a dead end.
- Art Gift Kit: the gift link block in the order confirmation is not yet confirmed with a real gift kit order (site-developer notes). The articles say only what the product page says.
- Offer codes in the articles carry their dates; after November 30 they are past dates. Refresh planned for Dec 7.
- 2027 order-by dates (Valentine's, Mother's Day, Father's Day, graduation) are unknown; needed in the Facts table before the 2027 pages can state them.
- Search Console, GA4 snapshots still do not exist (data/latest.md "Updated: never"); keyword choices are not tied to measured volume.

## Sales impact

Addresses the weak point "referred traffic down 51%, search weakest". Each article targets a search with someone ready to buy and a direct product link: the last-minute page turns late December searches into Art Gift Kit sales after the December 15 cutoff, which would otherwise be lost; the grandparents and wife pages lead to large family and couple sizes ($149 to $432). If published this week they have about 4 weeks to index before December 1, when last year's orders jumped to about 32 a day. Expected effect is small before mid-November and grows through December; to be measured in Search Console once snapshots exist.

## Next run

Monday 2026-11-02: brief personalized-stocking-stuffers (10×10 mini kit and Art Gift Kit), confirm the three articles are live and ask seo-technical to add hub links down to them. Nov 9: dog lovers. Then the 2027 schedule in plan-2027.md.

---

# seo-strategist 2026-10-28, daily task: brief backlog

## Summary

Created `marketing/seo/strategist/backlog.md` with 11 ready briefs, ranked by sales value and season: 7 Christmas, 1 buyer-question (photo to LEGO-style mosaic), 1 evergreen fix (pet memorial page), 3 for Valentine's 2027 and couples (one is the anniversary hub). The writer can take one a day from tomorrow.
Before writing them, I checked every topic against the article inventory and the live blog (the 8 articles published today, the 2 Christmas hubs and the 8 merged posts).

## Done

- Task board (read at the end of the run, after the growth director published it): Task 1 (backlog with stocking stuffers and dog lovers) is done. Task 2 (3 Christmas articles and the 5 calm-series URLs marked live in page-plan and keyword-map) is done. Task 3 (Thursday) is half done: the husband brief is written. "Christmas gift for mom from the kids" is queued first in the backlog for Thursday. The board's "10 by Nov 2" target is already met, with 11 ready.
- Live site reachable. Checked the blog feed, the products JSON and the live HTML of the hubs, the 3 new Christmas articles, the size guide and the posts to be upgraded. Every internal link named in the briefs returns 200, except the 5 planned pages, which are marked "once live". None of the 11 new handles is in use.
- Ran a WebSearch SERP read for 8 target terms (result types only, not Google, no volumes).
- Briefs (all `Status: ready for writer`, in `marketing/seo/strategist/briefs/`): `personalized-stocking-stuffers`, `christmas-gifts-for-dog-lovers`, `photo-christmas-gift-for-husband`, `babys-first-christmas-gift`, `christmas-gift-in-memory-of-a-loved-one`, `can-you-turn-a-photo-into-a-lego-style-mosaic`, `corporate-christmas-gifts-for-employees`, `pet-memorial-gift-improve-blog-memorial`, `personalized-valentines-day-gift-upgrade`, `valentines-day-gift-for-boyfriend-photo`, `personalized-anniversary-gifts`.
- Overlap check: each brief has a "Must not duplicate" section naming the live page it borders and how it differs. Not planned because they overlap: Christmas gifts for parents, for cat lovers, under $50, and another "build it together" page.
- Updated `page-plan.md` and `keyword-map.md`: C1 to C3 and the calm series are live, the merges are done, and the new rows are added. Added 5 buyer questions to `customer-questions.md`.
- Prices re-checked from the live storefront today. They match `product-facts.md`, and 10×10 is $35.00 with 1,024 bricks and about 1 hour of building (from the product page).

## Proposed for approval

None (briefs only; the writer proposes each draft).

## Blocked or unknown

- **Handle renames not live (for seo-technical).** A-2026W44-023 is logged as applied, but at this run's check the old URLs still return 200 with a self canonical, and the new handles return 404. Examples: `duplicate-from-celebrate-the-pets-who-fill-your-home-with-love` vs `celebrate-the-pets-who-fill-your-home-with-love`, the Valentine's post, and `baby-carrier-jul-10-22-19-45` vs `babys-first-year-photo-mosaic`. The FOX rename is live. The briefs tell the writer to use whichever URL returns 200.
- **LEGO wording:** the photo-to-mosaic brief uses "LEGO-style" as the search phrase and adds a "not affiliated with the LEGO Group" line. If Eden prefers no LEGO wording, the brief gives a title without it.
- Owner facts needed: Valentine's 2027 order-by date (the Valentine's briefs say "order early" with no date). Corporate lead times, minimums and bulk pricing are unknown, so that article sends readers to a quote.
- Search Console and GA4 snapshots still do not exist (`marketing/data/latest.md`: "Updated: never"). The existing requests in `requests.md` cover them, so I added no new line. Search volumes are unknown.
- The product page states "2 to 4 business days" production and free replacement bricks, but neither is in the Facts table, so the briefs tell the writer not to use them.

## Sales impact

Weak point addressed: "Referred traffic down 53%, search weakest" (owners include seo-strategist). Seven of the 11 briefs target Christmas buyer searches. If the writer drafts one a day and Eden approves, they can be live between November 12 and 23. That gives Google 2 to 5 weeks before the December 1 to 15 rush (goal 20 orders a day). The stocking stuffers and dog articles come first because they match the Black Friday weekend codes and the dog ad already running. Expected effect: new organic entry pages within 1 to 3 weeks of publishing. Nothing moves this week's orders. The Valentine's and anniversary briefs are for January and will not affect 2026 sales.

## Next run

Daily: check which rows the writer marked taken. Keep at least 10 at `ready` (next to brief: Christmas refresh plan, then the pet hub upgrade and Mother's Day 2027). Confirm with seo-technical whether the handle renames are live.
