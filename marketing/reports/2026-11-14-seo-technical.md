# seo-technical 2026-11-14

## Summary
I re-checked the writer's 8 edited drafts. No build time is left in any of the 13 bundle drafts, all are `checked`, and the bundle has new hashes under the same item, A-2026W46-016. The bundle has no open flag.
I also checked the new DIY kit draft (it passes, set to `checked`, not proposed per board rule 2). Nothing was published or changed on the live site in the last 7 days, so there was nothing new to verify.

## Done
- **Approvals.** The checker printed A-2026W41-014 (article schema on GemPages articles). Not applied: Shopify blocks writes to the live theme, same as Nov 10 to 13. I did not retry.
- **Task board: done (all 4 steps).**
  1. Re-checked the 8 drafts from the writer's commit 3105e18: photo-to-brick-mosaic-maker, personalized-stocking-stuffers, black-friday-personalized-photo-gifts, christmas-gifts-for-dog-lovers, girlfriend, husband, mom-from-kids, boyfriend.
     - No build time, hours or evenings about the kit in the body or the FAQPage JSON-LD. The boyfriend line "A boxed set is a nice evening" is about boxed sets, not our kit, so it stays.
     - Each has one H1 and clean heading order. Title and meta lengths are fine. FAQPage parses and matches the visible FAQ.
     - Every price matches the live store today. The "Fits" column (40×20: 1 to 3 people) matches the product page.
     - 38 unique site URLs, all 200 except best-photo-for-a-brick-mosaic (row 1 of the same bundle, published first). Every handle still returns 404. Copy check passes on all 8.
     - Technical fix: in photo-to-brick-mosaic-maker (2 answers) and personalized-stocking-stuffers (1 answer) the FAQPage answer text was worded differently from the visible answer. I set the JSON-LD to the visible wording. No visible text changed.
     - Each draft set to `Status: checked`, with a re-check section added to its note in `marketing/seo/technical/checks/`.
  2. New hashes in `marketing/seo/technical/publish-bundle-2026-11-12.md` for rows 2 and 4 to 10 (d67c3ed95f61, 24609995ccba, 5397c11405a2, 62c24457b505, 4e6bdf7240cb, bc240a0c40ef, feb8a0992ec9, 9fb49d1323fc), plus a 2026-11-14 re-check section. Rows 1, 3, 11, 12, 13 still match their hashes.
  3. The portrait headline and row 3 title were already "Custom Brick Portrait From Your Photo" (done Nov 13). No change needed.
  4. **Note for the coordinator:** A-2026W46-016 has no open flag. Its draft, the bundle file, changed in this run's commit, so the item's Commit line needs this commit or the checker will report it as changed. Non-blocking notes: the mom draft (row 7) still marks its featured image NEEDED, and the EARLYHOLIDAY20 lines come out if it is published after Nov 22.
- **Daily: articles changed in the last 7 days.** None. `sitemap_articles_1.xml` has 56 articles, and none has a lastmod after Nov 7. All 14 draft handles still return 404.
- **Daily: new drafts.** `diy-brick-mosaic-kit-from-your-photo` passes and is set to `checked`. The check note is `marketing/seo/technical/checks/diy-brick-mosaic-kit-from-your-photo.md`, with the Article JSON-LD and link suggestions. All checks pass:
  - title 53 characters, meta 148
  - one H1
  - FAQPage matches the visible FAQ
  - every price is a live variant price
  - all 13 site URLs and the image return 200
  - the editor CTA follows board rule 1
  - copy check passes
- **Daily: content fixes / GemPages.** No proposal (board rule 2). I added item 7 to Eden's list in `marketing/seo/technical/gempages-changes-2026-10-28.md`: `/pages/dog-brick-mosaic` still has two H1s (checked live today). It is a 2-minute tag change she can make herself.
- **Daily: Search Console Chrome task.** Part B has not been run. Its 9 URLs all return 200 today, so it is still current. After the bundle is published, the next 10 URLs are in the bundle file (rows 1, 2, 3, 6, 7, 8, 9, 10, 12, 13).

## Proposed for approval
None (board rule 2). The DIY kit draft is ready to propose on the next run the board allows, or to add to a bundle.

## Blocked or unknown
- Live theme writes are blocked, so A-2026W41-014 cannot be applied (expires Nov 30). Writes are allowed only to the unpublished copy 189322330332. The item names the live theme, so I left it.
- No data snapshots (`marketing/data/latest.md`: "Updated: never"), so pages cannot be ranked by impressions. Search Console is already requested in `marketing/data/requests.md`, so I added no duplicate.

## Sales impact
Weak point: Google search traffic (-69% to the home page). With today's re-hash, Eden can answer A-2026W46-016 with a plain "approved" and put 13 gift-search articles live 13 days before Black Friday. They bring orders only once published and indexed, so not this weekend. The dog-page H1 change and the DIY check bring no orders on their own.

## Next run
Sun Nov 15: daily task. If A-2026W46-016 is approved and published, verify all 13 URLs (200, canonical, schema, sitemap) and put the first 10 on the Search Console list.
