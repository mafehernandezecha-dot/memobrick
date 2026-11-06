# Site change: written meta descriptions for 8 articles, and two title fixes

Proposed 2026-11-06. Source: `content-fixes.md` (8 articles whose only description is a 320-character auto excerpt cut mid-sentence) and the task board of 2026-11-06.

These are Shopify SEO fields (`global.description_tag`, `global.title_tag`) and work through the Shopify API for GemPages articles too. Nothing in the GemPages layout, body or images changes. Handles are the current ones (renamed 2026-10-28). Lengths counted by script; all descriptions are 155 characters or fewer and have no em dashes.

Note: until A-2026W44-025 (SearchPie off) is done, SearchPie still prints a second description. The fields below are what Google reads once that is done.

## Meta descriptions

| # | Article ID | Handle | Meta description (new) |
|---|---|---|---|
| 1 | 750991900892 | graduation-gift-ideas-theyll-treasure-forever | Cash and gift cards get spent fast. Give a graduation gift they keep: a custom brick mosaic built from a photo of their big day. |
| 2 | 751000387804 | fathers-day-gift-ideas-that-go-beyond-the-usual-tools-and-gadgets | Skip the tie. Give Dad a favorite memory as a custom brick mosaic he can build himself, then hang on the wall for years. |
| 3 | 751000420572 | babys-first-year-photo-mosaic | Turn a photo from baby's first year into a custom brick mosaic you build, display and keep. Ideas for the best photo and size. |
| 4 | 751000453340 | why-personalized-gifts-create-stronger-emotional-connections | Generic gifts get forgotten, personal ones get kept. See why a custom brick mosaic made from your own photo feels so memorable. |
| 5 | 751257485532 | summer-vacation-souvenirs-you-build | Skip the airport gift shop. Turn a favorite vacation photo into a custom brick mosaic the whole family builds together. |
| 6 | 751257583836 | military-homecoming-gifts | A homecoming deserves more than a banner. Turn a reunion photo into a custom brick mosaic keepsake they can build and display. |
| 7 | 751257649372 | fun-screen-free-family-activities | Looking for screen-free family time? A custom brick mosaic from your own photo is a hands-on activity everyone can join. |
| 8 | 751257747676 | wedding-thank-you-gifts-for-parents-and-bridesmaids | Thank parents and bridesmaids with more than a candle. A custom brick mosaic of a wedding photo is a keepsake they will display. |

Before: field empty (the theme falls back to the 320-character excerpt cut mid-sentence).

## Title fixes (Shopify title field)

| # | Article ID | Before | After |
|---|---|---|---|
| 9 | 751257485532 | The Best Summer Vacation Souvenirs Aren't Bought[U+2014 dash, no spaces]They're Built | The Best Summer Vacation Souvenirs Aren't Bought, They're Built |
| 10 | 751000387804 | Father's day Gift Ideas That go Beyond the Usual Tools and Gadgets | Father's Day Gift Ideas That Go Beyond the Usual Tools and Gadgets |

Handles do not change, so no redirect is needed. Row 9 removes the em dash; row 10 fixes the capitalization.

## Backup and verify

- Before writing, save the current `title`, `handle` and metafield values of the 8 articles to `marketing/seo/technical/backups/2026-11-06-article-meta/` and commit them.
- Write `global.description_tag` (and `global.title_tag` only where a title row exists, same text as the new title) through the Shopify API. Do not touch body, template, handle, publish state or tags.
- Verify on each live URL: status 200, one description tag from the theme with the new text, handle unchanged.
- If any article's handle or title differs from the table when applying, stop for that article and report it.
