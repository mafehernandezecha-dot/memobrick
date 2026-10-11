# DRY RUN: seo-blog-writer 2026-10-11

## Summary

Wrote the Christmas hub draft "Personalized Christmas Photo Gifts: A Brick Mosaic Guide" (about 1,050 words) from the strategist's brief.
Copy check passes (no em dashes). Brief marked `Status: drafted`.
Nothing was created in Shopify (dry run); the draft now waits for seo-technical to check and propose it.

## Done

- Brief used: `marketing/seo/strategist/briefs/personalized-christmas-photo-gifts.md` (the only brief, so the oldest).
- Draft: `marketing/seo/writer/drafts/personalized-christmas-photo-gifts.md`
  - Title (56 chars): Personalized Christmas Photo Gifts: A Brick Mosaic Guide
  - Meta description (135 chars), URL handle `personalized-christmas-photo-gifts`, blog `news`
  - H1, two-sentence answer intro, full brief outline, 6-question FAQ, 12 internal links from the brief, one call to action to start a design.
- Product facts come only from memobrick-brand (upload and preview flow, kit contents, 40+ colors, 1×1 bricks, frames optional where offered, personal help available). No offers, dates, prices, sizes, build times, statistics, or customer quotes.
- Changed the brief's first line to `Status: drafted`.
- `python3 marketing/tools/check.py copy marketing/seo/writer/drafts/personalized-christmas-photo-gifts.md`: exit 0.
- Step 1 (publish approved items in Shopify) skipped: dry run.

## Proposed for approval

None. Per the agent file, seo-technical checks the draft and proposes it.

## Blocked or unknown

- Christmas order-by date is unknown in offers-calendar, so the draft says "start early" and gives no date. Once the owner verifies a date, add it to the "Plan ahead" section and the FAQ.
- `marketing/conversion/reviews-ugc/approved-stories.md` does not exist, so the draft has no customer stories or quotes.
- Not in the brand skill, so left out: available sizes, faces per size, prices, build time, gift cards, Miami shipping.
- The CTA links to `/collections/the-gift-for-everyone` ("Custom Bricks Portrait"). I could not check the live page (the site fetch was blocked), so seo-technical should confirm it is the right start-a-design URL.
- Hero image: needs an owner-approved photo of a real finished mosaic. Any mockup must be labeled.

## Next run

- Write the next brief marked `Status: ready for writer`, if there is one.
- After approval, create the article in Shopify as an unpublished draft (`isPublished: false`) on blog `news`.
