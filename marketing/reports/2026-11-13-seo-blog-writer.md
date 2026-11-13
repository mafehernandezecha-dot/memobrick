# seo-blog-writer 2026-11-13

## Summary
- No approved items for me (checker printed nothing; bundle A-2026W46-016 is still pending), so nothing was published.
- Task board done: cleaned the three flags on bundle A-2026W46-016 in the dad, memorial, portrait and baby drafts. All four are now `Status: ready for check`.
- No new draft today, as the task board asked. 8 other drafts in the bundle still have build-time lines (see Blocked).

## Done
- Approvals: `check.py approvals --agent seo-blog-writer --today 2026-11-13` printed no IDs. A-2026W46-016 is pending, so nothing was published.
- Task board (Sandra): done. Changes:
  1. Build time removed (the Facts row "Faces per size and build time" is unknown):
     - `christmas-gift-for-dad-from-kids.md`: the table column is now "Fits" (Shopify people counts or "not listed"). I removed the "one or two evenings" sentence and changed "an evening of building" to "the fun of building it". The FAQ "How long does it take..." is now "Does a frame come with it?" in the body and in the FAQPage JSON-LD.
     - `christmas-gift-in-memory-of-a-loved-one.md`: the table column is now "Fits" and the "Building times are estimates" line is gone. "An evening of building" is now "time building together" in the body and the JSON-LD.
     - `custom-brick-portrait-from-photo.md`: removed the build-time column and the "Shopify's estimates" line. The "2.5 to 20 hours" sentence is rewritten with no duration.
     - `babys-first-christmas-gift.md`: also had "about 1 hour", "about 2.5 hours" and "about 4 hours", which I removed the same way.
  2. Portrait title is now "Custom Brick Portrait From Your Photo" in Title and H1. The old title stays as a `Title option (Eden's choice)` header line. The trademark FAQ is unchanged.
  3. Baby article: BRICKFRIDAY25 and CYBERBRICK20 now read "(scheduled) ... scheduled for", as the offers calendar says.
- Copy check passed on all four (exit 0, no em dashes).
- Briefs and backlog unchanged. No new brief taken.

## Proposed for approval
None. seo-technical re-checks the four drafts, updates the hashes in `publish-bundle-2026-11-12.md` and keeps item A-2026W46-016.

## Blocked or unknown
- For seo-technical: the Article JSON-LD headline in `marketing/seo/technical/checks/custom-brick-portrait-from-photo.md` still says "Custom LEGO-Style Portrait From Your Photo". It should match whichever title Eden picks. The bundle table title for row 3 needs the same change.
- 8 other bundle drafts still state build times, which the Facts table says are unknown: photo-to-brick-mosaic-maker (1 line), personalized-stocking-stuffers (1), black-friday-personalized-photo-gifts (6), christmas-gifts-for-dog-lovers (6), girlfriend (6), husband (7), mom-from-kids (8), boyfriend-who-loves-lego (8). I did not edit them, so their checked hashes and the bundle stay as they are. Two ways out: Eden adds the build times to the Facts table, or I strip the lines in one pass tomorrow and seo-technical re-hashes. The owner or coordinator decides.
- Build time and faces per size are still unknown in offers-calendar.md.

## Sales impact
Addresses the weak point on Google search visits. These edits make the 13-article bundle easier to approve, and those articles bring 0 visits while they wait. Once published and indexed before the Dec 15 order-by date, they send gift searchers to the editor and size pages. No orders come in until Eden approves A-2026W46-016.

## Next run
If A-2026W46-016 is approved and unchanged, publish the bundle in its order. Remove the EARLYHOLIDAY20 lines if publishing after Nov 22. Otherwise take backlog row 20 (DIY kit, Nov 19), or strip build times from the 8 drafts if the coordinator asks.
