# Report: seo-technical 2026-11-12 (daily)

## Summary
Made one bundle item so Eden can publish all 13 checked articles with one "approved". It includes today's new check, the custom brick portrait draft, which passes.
Feed check: all 4 top kits are on Google & YouTube with full Product schema. The best-selling 20x20 frame is not on that channel, and every product page has two Product blocks. So the channel does not explain the drop in free listings. Merchant Center does.

## Done
- Task board (1): done. Bundle item P-seo-technical-20261112-1 (Expires 2026-11-25) lists all 13 unpublished checked drafts with their path, hash, handle and the queue item each one covers. File: `marketing/seo/technical/publish-bundle-2026-11-12.md`. Every target URL returned 404 today. Every internal link returned 200 except best-photo, which is itself in the bundle and goes out before the maker article.
- Task board (2): done. 5-row table in `marketing/seo/technical/product-feed-check-2026-11-12.md`. The top kits (20x20, 16x16, 30x20, 20x30) are on Google & YouTube and their pages have price, InStock, brand Memobrick and an image. Gaps found:
  - The 20x20 frame (top 5), the 20x30/30x20 frame, the 40x50 frame, two gift cards and two art pieces are not on the channel.
  - Each product page has two Product blocks: Vitals with the rating but no availability, and the theme with availability but no rating.
  - There is no GTIN or MPN setting that I can see.
- Approvals: the checker printed A-2026W41-012 and A-2026W41-014. Neither was applied, because theme writes are still blocked and I did not retry. A live check today found:
  - A-2026W41-012: the hardcoded 4.8/747 rating is gone from the live product pages, so nothing is left to apply. The coordinator can archive it as "already live".
  - A-2026W41-014: BlogPosting now shows on the default-template articles, including hub A, but the GemPages article `blog-memorial` still has no BlogPosting. The item stays open for the GemPages articles.
- Draft check: `marketing/seo/technical/checks/custom-brick-portrait-from-photo.md`.
  - Title is 42 characters, meta description 139. Headings are in order, FAQPage matches the visible FAQ, all 16 links return 200, and prices match the live store today. The copy check passes.
  - I set its status to `checked` and put it in the bundle as row 3, with no separate item.
  - Optional wording note for the writer: "Shopify lists..." could be "our product pages list".
- 7-day check: the blog feed was last updated 2026-10-28, so no article was published or changed in the last 7 days. 11 of the checked handles still return 404, plus the 2 checked today (13 in all). gift-for-someone-who-has-everything and the hub return 200.
- Content fixes: none proposed today (board rule 2: only the bundle is asked for).
- Search Console task: unchanged. A-2026W44-026 has no result yet, and editing the approved file would void its approval. The next indexing list for after the bundle goes live is written at the end of the bundle file.

## Proposed for approval

### P-seo-technical-20261112-1
- Agent: seo-technical
- Executor: seo-blog-writer
- Type: publish
- Draft: marketing/seo/technical/publish-bundle-2026-11-12.md
- Reason: One "approved" publishes all 13 checked articles live on the Shopify blog, in the bundle file's order. That covers A-2026W44-055, 056, 068, 070, A-2026W45-006, 013, 016, 021, 023, A-2026W46-001, 003, 010, plus the new portrait article. They use the default article template, so they look different from the GemPages articles; Eden can rebuild any of them in GemPages afterward. Every week of delay is a week less for Google to index them before the Dec 15 order-by date.
- Expires: 2026-11-25
- Status: pending

## Blocked or unknown
- Theme writes are still blocked, so A-2026W41-014 (article schema on GemPages articles) cannot be applied from here.
- The free-listing drop (347 to 36 sessions) needs Merchant Center data. ads-analyst already asked for it in `marketing/data/requests.md` on Nov 11, so I added no duplicate request. There are still no data snapshots (`latest.md` says "Updated: never").
- Not proposed today because of board rule 2. Both are ready to write up when the owner wants them:
  - Adding the frames to the Google & YouTube channel.
  - Merging the two Product blocks into one.
- Live site reachable. Shopify was read only.

## Sales impact
Weak point: search visits down by two thirds. One decision puts 13 gift-search pages live, all leading to the editor, the free proof and the size products, three weeks before the Dec 15 order-by date. That is the largest lever I have: if Eden approves this week, they can start bringing visits and a few orders a week from late November. The feed check shows the channel setup is not why free listings fell; the cause is in Merchant Center. Adding the 20x20 frame to Google is a small gain, since frames are add-ons.

## Next run
Fri Nov 13 (weekly). If the bundle is approved, verify each published URL (200, canonical, schema, sitemap) and write the indexing list. Otherwise re-test the 404s, check new drafts and re-check SearchPie.
