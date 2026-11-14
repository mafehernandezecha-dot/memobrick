# Black Friday theme copy: one copy, one delete, one publish

Written 2026-11-14 by site-developer (task board). Plan only: no copy is created before Eden answers the question on A-2026W44-018 (queue, top). It extends `rebuild-018-019-plan.md`.

## The goal

Put four fixes on one theme copy, so Eden deletes one old theme and publishes once, before Black Friday (Nov 27):

| Item | Status | What visitors get |
|---|---|---|
| A-2026W44-018 | approved, **expires Nov 15** | Free-proof form fallback: "Email my photo for a free proof" when the Hulk form has not loaded after 8 s |
| A-2026W44-019 | approved, expires Nov 30 | Cart notice on a custom kit line with no photo: "This kit has no photo yet. Add your photo..." |
| A-2026W46-017 | pending, expires Nov 30 | Drawer: "Add $X more for free US shipping." / "Your order ships free in the US." plus "Discount codes can't be combined with free shipping." under the bar and on /cart |
| A-2026W45-009 | pending, expires Nov 20 | Start block at the top of /collections/the-gift-for-everyone for half the visitors (test CA-20261103-01): what to do, Dec 15 date, red "Create My MemoBrick" button, free proof link |

## Live today (checked 2026-11-14, read-only)

MAIN is still "Memobrick fixes" 189310075100, updatedAt 2026-10-28T08:37:41Z. Theme count 20 of 20. Files these fixes touch, live md5:

| File | Live md5 | Touched by |
|---|---|---|
| sections/memobrick-site.liquid | f3cd4967b199889ec92a597f38be2450 | 018 (render line, proof view) and 017 (codes line under the homepage drawer bar, line 90 to 93) |
| snippets/free-proof-page.liquid | 79ad60f5c0847f67a7a05463a2d4eba1 | 018 |
| snippets/mb-fp-fallback.liquid | (new) | 018 |
| templates/cart.liquid | 13f6c57bb371bb521b378e0bb574c50a | 019 (kit line check, line 28 to 39) and 017 (line 60, "Taxes are calculated at checkout.") |
| assets/memobrick.js | 0b2713d1c0e521ab1358950fae71d245 | 017 (two drawer strings in renderCart; 250 KB minified, plain string replace) |
| snippets/site-header.liquid | 2c02ec0dbd4b4fe8bb3360004340bfa2 | 017 (codes line under the drawer bar on standalone pages) |
| templates/collection.liquid | ac729b6e73920b20402f6a5f2cda3de3 | 009 (block between the star line and the grid, only for handle `the-gift-for-everyone`) |
| snippets/mb-giftcol-start.liquid | (new) | 009 (the block and its 50/50 split) |

The theme setting `free_shipping_threshold` (default 125) exists in live `config/settings_schema.json`, so 017 reads $125 from it as the draft asks.

Two files carry two fixes each (memobrick-site.liquid, cart.liquid). So when 017 is in, the ready 018/019 "after" files at commit 4c4f202 are the base, and 017's edit goes on top of them. The edits sit in different lines and do not conflict.

## Order to build (one run, about 2 hours, after Eden's answer)

| Step | Item | Files | Minutes |
|---|---|---|---|
| 0 | Eden deletes "Memobrick kit page fix" 188955361500 (or "Memobrick gift kit flow" 188683092188) | none | 1 (Eden) |
| 1 | Recheck live MAIN and the 8 md5 values above; stop and rebuild on any changed file | none | 2 |
| 2 | `themeDuplicate` of 189310075100, name "Memobrick Black Friday"; wait until the file count equals live | whole theme | 4 |
| 3 | 018 + 019: upsert the ready after files by URL (commit 4c4f202): mb-fp-fallback, free-proof-page; build memobrick-site and cart.liquid as 018/019 after plus 017 if approved | 4 | 5 |
| 4 | 017: memobrick.js (2 strings), site-header.liquid (1 line), memobrick-site.liquid (1 line, same as header), cart.liquid (line 60 text). Commit, push, upsert by raw GitHub URL, confirm md5 | 4 (2 shared with step 3) | 20 |
| 5 | 009: new snippet mb-giftcol-start.liquid (block, `ab_giftcol` A/B kept in localStorage, written to the cart as attribute `ab_giftcol` with `/cart/update.js` so add to cart and orders can be read per arm) and one render line in collection.liquid inside `{% if collection.handle == "the-gift-for-everyone" %}` | 2 | 30 |
| 6 | Test on phone 390x844 and desktop 1440x900 (generated test image, stop at the cart): 018 fallback with the form blocked and form shown when not; 019 notice on a photo-less 10x10 kit and "Edit this design again" on a normal kit; 017 drawer at 20x20 ($99.88: "Add $25.12 more for free US shipping.") and at 20x30 ($149: "Your order ships free in the US."), codes line on homepage and standalone drawer, new /cart line; 009 both arms (force A and B), button opens the editor on 20x20, other collections unchanged; no horizontal scroll | none | 45 |
| 7 | Before/after screenshots, one publish card `publish-card-<newId>.md` (preview link, all files with md5, a 60-second phone check, undo), update working-theme.md, report, commit | none | 15 |

Built in this order because 018 and 019 are already approved and ready (lowest risk, and 018 protects proof requests, the largest lost-order source), 017 is small and shares their files, and 009 is the only new code and the only test.

Eden's part after the build: open the preview link, then publish "Memobrick Black Friday" in Online Store > Themes (1 minute), then my next run checks the live store on phone and desktop by checksum and screenshots.

## If only 018 and 019 are approved

Run steps 0 to 3 and 6 to 7 without 017 and 009: the 4 ready files go up as they are, about 25 minutes, exactly as `rebuild-018-019-plan.md` says. The copy is still named "Memobrick Black Friday".
- If Eden approves 017 or 009 before she publishes, I add them to the same unpublished copy (steps 4 and 5) and retest. No new slot, still one publish.
- If she approves them after she publishes, each needs a new copy, so another deleted theme and another publish. That is the cost this combined plan avoids.

## If Eden says the Nov 2 and Nov 3 edits are hers

Then no new copy and no delete are needed: 018 and 019 are already in "Memobrick proof and cart fixes" 189322330332. I add 017 and 009 (steps 4 to 6) to that copy on its current files (memobrick.js 6c93a8d4..., memobrick-site fb445597..., cart.liquid 3f918886...), retest, and she publishes it once, as `publish-card-189322330332.md` says, with the new files added to the card.

## Expiry timing

- A-2026W44-018 lapses Nov 15. If the build or the publish happens after that, I re-propose the same draft that day (no code change).
- A-2026W45-009 lapses Nov 20; 017 and 019 lapse Nov 30. Publish by Nov 20 keeps all four valid and gives the gift-collection test the Black Friday traffic it needs (about 190 sessions a week).
- Other pending site-changes could ride the same copy if approved before the build: A-2026W46-012 (Omnisend "started design" script, theme setting default off, lapses Nov 25) and A-2026W46-011 (dog page editor line). A-2026W44-050 (Dec 15 bar) lapses Nov 15; if it ever goes live, 009's date line is dropped so the date is not shown twice.

## Undo

Before publish: do not publish the copy. After publish: republish "Memobrick fixes" 189310075100 (1 minute).
