# seo-blog-writer 2026-11-11

## Summary
- Nothing to publish: none of my 11 queued article items is approved yet (all `pending`).
- Wrote one new draft, `christmas-gift-in-memory-of-a-loved-one` (publish by Nov 19). Its status is ready for check, and it is handed to seo-technical.
- 12 checked drafts are still waiting on Eden. Approving them would bring more sales than any new draft.

## Done
- Approvals: ran `check.py approvals --agent seo-blog-writer --today 2026-11-11`. It printed nothing. All 11 article items where I am the Executor are `pending`: A-2026W44-055, -056, -068, -070, A-2026W45-006, -013, -016, -021, -023, A-2026W46-001, -003. Nothing was published.
- Task board: done. The next ready brief by publish-by date is due Nov 19, which is before the Nov 25 cutoff, so I wrote one draft. Following the board, it links both the gift collection and the editor.
- Draft: `marketing/seo/writer/drafts/christmas-gift-in-memory-of-a-loved-one.md`, from backlog row 5, the top `ready` row.
  - Length: about 1,140 words.
  - Title is 41 characters, meta description 153.
  - Tone follows the brief: gentle, no discount codes, no exclamation marks, one soft call to action to the editor.
  - Includes the free proof, the Art Gift Kit route, the Dec 15, 2026 order-by date, and the Miami claim (verified in the Facts table).
  - FAQ with FAQPage JSON-LD.
  - Featured image is a real Shopify product photo.
- Checks run on 2026-11-11:
  - Prices on the live store: all match product-facts.
  - Internal links: all return 200. best-photo-for-a-brick-mosaic returns 404, so I left it out.
  - Copy check passed with no em dashes.
- Brief's first line set to `Status: drafted`. Backlog row 5 set to `taken 2026-11-11 (draft exists)`.

## Proposed for approval
None. seo-technical checks the draft first and proposes it.

## Blocked or unknown
- Customer stories: `marketing/conversion/reviews-ugc/approved-stories.md` does not exist, so the article quotes no one.
- Search volume for the target keyword is unknown.
- The live site rate-limited some requests (429). A retry got 200 on every link that matters.

## Sales impact
- A new draft does not bring visits until it is live. The weak point is search traffic, which is down 56%.
- This page targets buyers with strong emotional intent before the Dec 15 order-by date. It sends them to the editor and the free proof, and it lists sizes from $69.88 to $279.00.
- Expected sessions are unknown.
- The biggest sales lever in my lane is still Eden approving the waiting queue, starting with A-2026W44-055 (stocking stuffers, expires Nov 12) and A-2026W44-056 (best photo, expires Nov 12). Every unpublished article brings 0 visits.

## Next run
- Publish whatever Eden approves, the same day.
- Next ready brief by publish-by date: custom-brick-portrait-from-photo, diy-brick-mosaic-kit-from-your-photo or christmas-gift-for-sister-photo (all due Nov 19). Write one only if the board still asks for it.
