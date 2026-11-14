# seo-blog-writer 2026-11-14

## Summary
- No approved items for me (checker printed nothing; bundle A-2026W46-016 still pending), so nothing was published.
- Task board done: build times are out of the last 8 bundle drafts, all marked `Status: ready for check`. That clears the last flag on A-2026W46-016.
- Daily draft: backlog row 20, `diy-brick-mosaic-kit-from-your-photo` (what is in the box), written and marked taken. Not proposed (task board rule 2; seo-technical checks it first).

## Done
- Approvals: `check.py approvals --agent seo-blog-writer --today 2026-11-14` printed no IDs. Nothing published.
- Task board (Sandra): done. I changed only build-time text. Where a table had a build-time column, it became "Fits" (Shopify people counts, or "not listed") in the same way as the dad draft. Where a "Fits" column added nothing, I removed the column. Lines removed or changed:
  1. `photo-to-brick-mosaic-maker.md`: the H2 "How long does it take to build?" and its paragraph ("about 2.5 hours for the 16×16 and 4 hours for the 20×20 ... up to about 20 hours for the 40×50") are now "Which size should I pick?". The new paragraph has no durations and the same size-guide link.
  2. `personalized-stocking-stuffers.md`: removed "and a build time of about 1 hour (an estimate)". The FAQ "How long does the mini kit take to build? / About 1 hour" is now "What comes in the mini kit?" (contents, frames sold separately) in the body and the JSON-LD.
  3. `black-friday-personalized-photo-gifts.md`: removed "and how long you want the build to last. Build times are Shopify's estimates." The table column "Build time (estimate)" (2.5/4/6/8 hours) is now "Fits" (not listed x3, 1 to 3 people for 40×20). "(fits 1 to 3 people)" moved from the size cell into that column. Removed "for one or two evenings" from the best-value FAQ in the body and the JSON-LD.
  4. `christmas-gifts-for-dog-lovers.md`: removed the "Estimated build time" table column (1/2.5/4/9 hours) and "Build times are estimates and yours may differ." "A 16×16 takes about 2.5 hours, a 20×20 about 4, and a 30×30 about 9 ... Spread it across a long weekend with a movie on." is now "Put a movie on, sort the bags, and take turns placing bricks."
  5. `christmas-gift-for-girlfriend-photo.md`: removed the "Build time (estimate)" table column (2.5/4/6 hours). "keep a quiet evening free" is now "keep some quiet time free". The FAQ "Which size should I choose, and how long does it take to build?" is now "Which size should I choose?". Its answer now gives the 16×16 $69.88 and 20×20 $99.88 in place of the hours, in the body and the JSON-LD.
  6. `photo-christmas-gift-for-husband.md`: "gives him an evening, then a weekend" is now "gives him time to build". The H2 "How long it takes" and "think of them as evenings" are now "Which size to pick", and the table column is now "Fits". Removed "for one or two evenings". "spreads nicely over the holiday week" is now "makes a good holiday project". "a gift and an evening in one" is now "a gift and time together in one". The FAQ "How long does it take to build?" (4/6/8 hours, "a few evenings") is now "Which size should I choose?" with prices, in the body and the JSON-LD.
  7. `christmas-gift-for-mom-from-kids.md`: removed "Build times are estimates, so think in evenings, not minutes" and "takes about 4/6 hours" (piece counts kept). The table column is now "Fits". The FAQ "How long does it take? Does a frame come with it?" is now "Does a frame come with it?" with the answer "No. Frames are sold separately.", in the body and the JSON-LD.
  8. `christmas-gift-for-boyfriend-who-loves-lego.md`: removed the paragraph "Build times are estimates ... 2.5/4/6/8 hours. That is a quiet weekend, or a few evenings." The table column is now "Fits". The FAQ "Which photo works best, and how long does the build take?" is now "Which photo works best?", and its build-time sentence was replaced with "Upload two or three in the editor and compare the previews before you order.", in the body and the JSON-LD. "A boxed set is a nice evening" stays because it describes a boxed set, not our kit.
  - All 8 drafts pass the copy check (exit 0), and every JSON-LD block parses. No price, code, link or other text was changed.
- Daily draft: `marketing/seo/writer/drafts/diy-brick-mosaic-kit-from-your-photo.md` (935 words, title 53 characters, meta 148 characters). It covers what is in the box, how the color map works, difficulty, who it suits, frames, a 3-row size teaser, the editor and the optional free proof, and a 5-question FAQ with FAQPage JSON-LD. The trademark line is included. The CTA goes twice to `/pages/editor?size=20x20&utm_source=blog&utm_medium=seo&utm_campaign=diy-kit#editor`. Prices were re-checked in Shopify today. Links were checked today and all return 200. The featured image is the real 20×20 Shopify product photo. The copy check passes.
- Brief `diy-brick-mosaic-kit-from-your-photo.md` first line is now `Status: drafted`. Backlog row 20 is marked `taken 2026-11-14 (draft exists)`.

## Proposed for approval
None. The task board asked for no new proposal. seo-technical re-checks the 8 edited drafts, re-hashes them in `publish-bundle-2026-11-12.md` under A-2026W46-016, and checks the new DIY kit draft.

## Blocked or unknown
- For seo-technical: the 8 edited drafts changed, so their hashes in `publish-bundle-2026-11-12.md` are out of date until re-hashed. 6 of the 8 had FAQPage JSON-LD changes inside the draft: stocking stuffers, Black Friday, girlfriend, husband, mom and boyfriend. If any `technical/checks/<slug>.md` keeps its own copy of the FAQ schema, it needs the same change. A grep for "hours" or "evenings" in `technical/checks/` found only `brick-mosaic-sizes.md`, which is not in the bundle.
- The row 20 brief asked for build times (16×16 2.5 h, 20×20 4 h, 30×30 9 h). I left them out because the Facts row "Faces per size and build time" is unknown, the same rule as the bundle. The draft notes this at the top.
- What happens if a customer runs out of a color is unknown, so the FAQ only points to `/pages/contact-us`. Shipping time is not in Facts, so the FAQ gives only the free-over-$125 rule, the Dec 15 order-by date and Miami.
- `best-photo-for-a-brick-mosaic` and `photo-to-brick-mosaic-maker` still return 404, so the new draft does not link them yet.

## Sales impact
Addresses the Google search weak point (-69% search visits to the home page), and only through Eden's decision on A-2026W46-016. The bundle now has no open flag, so she can answer with a plain "approved". Then 13 gift-intent articles go live 13 days before Black Friday and a month before the Dec 15 order-by date, each ending at the editor. The DIY kit page targets the last doubt before checkout ("what do I get for the price"). It can help only after it is checked, approved and indexed, so it will not bring orders this weekend. No order comes from today's work until something is published.

## Next run
If A-2026W46-016 is approved and unchanged, publish the bundle in its order, and drop the EARLYHOLIDAY20 lines if publishing after Nov 22. Otherwise take backlog row 6 (`can-you-turn-a-photo-into-a-lego-style-mosaic`), then 23, 22, 14, 15, 7, 24.
