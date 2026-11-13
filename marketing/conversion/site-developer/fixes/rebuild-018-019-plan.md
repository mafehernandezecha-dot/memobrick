# Rebuild plan: A-2026W44-018 and 019 on a clean copy of live

Written 2026-11-13 by site-developer. Run it only if Eden says the Nov 2 and Nov 3 edits in "Memobrick proof and cart fixes" 189322330332 are **not** hers. If they are hers, ignore this plan and publish 189322330332 as `publish-card-189322330332.md` says.

The copy is not created yet (task board: wait for her answer).

## What Eden does first (1 minute)

The store is at the 20 of 20 theme limit, so a new copy cannot be made. In Online Store > Themes, delete one old unpublished copy. Safe choices, none needed as an undo:
- "Memobrick kit page fix" 188955361500 (first choice)
- "Memobrick gift kit flow" 188683092188

Do not delete "Memobrick holiday gift boxes" 189177626844 or "Memobrick proof and cart fixes" 189322330332 (that one holds the outside edits, which stay untouched).

## Starting point (checked 2026-11-13)

Live (MAIN) "Memobrick fixes" 189310075100, updatedAt 2026-10-28T08:37:41Z, unchanged since Oct 28. Its four target files match the repo "before" files byte for byte:

| File | Live md5 = repo before | After md5 |
|---|---|---|
| sections/memobrick-site.liquid | f3cd4967b199889ec92a597f38be2450 | c67bbe7abbac00e09eb4a91520a69a22 |
| snippets/free-proof-page.liquid | 79ad60f5c0847f67a7a05463a2d4eba1 | 5cf45bec111a17e1c086de062367fa68 |
| snippets/mb-fp-fallback.liquid | (new file) | 86b716ab97761cfb62f1f4cc3cf67489 |
| templates/cart.liquid | 13f6c57bb371bb521b378e0bb574c50a | 3f9188860173dc2d1ef499567d804c50 |

After files: `theme-files/proof-cart-2026-10-28/after/` at commit 4c4f202e04b08fc2502c4ea92c3b5daf674dd24e. All four raw GitHub URLs were fetched today and their md5 matches the table, so they can be upserted by URL as they are:
`https://raw.githubusercontent.com/mafehernandezecha-dot/memobrick/4c4f202e04b08fc2502c4ea92c3b5daf674dd24e/marketing/conversion/site-developer/theme-files/proof-cart-2026-10-28/after/<file>`

The new copy gets nothing else: no layout/theme.liquid change, no memobrick-type.css, no missing-brick wording change.

## The diffs

018, sections/memobrick-site.liquid (homepage proof view), one line added after line 413:
```
             <div style="margin:0 auto;" class="pxFormGenerator" id="{{ settings.hulk_freeproof_form_id | escape }}"></div>
+            {%- render 'mb-fp-fallback' -%}
           </div>
```

018, snippets/free-proof-page.liquid (/pages/free-preview), one line added after line 50:
```
         <div style="margin:0 auto;" class="pxFormGenerator" id="{{ hulk_fp_id | escape }}"></div>
+        {%- render 'mb-fp-fallback' -%}
       </div>
```

018, snippets/mb-fp-fallback.liquid (new, 31 lines): a hidden box with "The form is taking a while to load. You can also email your photo to us and our designers will send your free proof." and the button "Email my photo for a free proof" (mailto the shop email). A script shows it if the Hulk form has no field after 8 seconds, rechecks every 3 seconds up to 60 seconds, and hides it as soon as the form appears. Full file in the repo path above.

019, templates/cart.liquid, around line 28: `{% if forloop.last %}` becomes a check for a "Custom Photo Mosaic Kit" line with none of Design ID, Final Design, _design, Original photo, _Build Instructions. Such a line shows "This kit has no photo yet. Add your photo so we can make your design, then remove this line." (link to /pages/editor#editor); otherwise the existing "Edit this design again" link shows as before (`{% elsif forloop.last %}`). 11 lines added, 1 changed.

## Steps and minutes (about 25 minutes, all in one run)

1. (1 min) Recheck live: `themes` role MAIN is still 189310075100 and the four files still have the "before" md5. If any changed, stop and rebuild the two one-line edits on the new file instead.
2. (2 to 4 min) `themeDuplicate` of 189310075100, name "Memobrick 018 019 clean". Wait until the copy lists all files (compare file count with live).
3. (2 min) One `themeFilesUpsert` to the new copy with the four files, body type URL, URLs above.
4. (1 min) `theme { files }` on the new copy: the four after md5 values match; every other file md5 equals live (spot check layout/theme.liquid 733c51e6..., assets/memobrick.js 0b2713d1..., templates/product.liquid ace1fe68..., templates/page.faqs.liquid 22866b45...; no assets/memobrick-type.css).
5. (10 min) `TEST_PHOTO=<generated image> node marketing/conversion/site-developer/tools/test-018-019.mjs <newId> marketing/conversion/site-developer/<date>-rebuild-018-019 rb` on phone 390x844 and desktop 1440x900: home first screen, free-proof fallback with the form blocked, form shown when not blocked, cart notice for a photo-less 10x10 kit, normal kit line still shows "Edit this design again", no horizontal scroll. If Shopify's bot check (429) blocks a page, wait a few minutes and rerun that page with a fresh browser context.
6. (5 min) Publish card `publish-card-<newId>.md` (preview link, 4 files, 60-second phone check, undo: republish 189310075100), update `working-theme.md`, report, commit, push.

## Timing against the approval

A-2026W44-018 expires 2026-11-15; 019 expires 2026-11-30. The rebuild can run the same day as Eden's answer if a theme slot is free. If Eden publishes after Nov 15, 018 needs a fresh approval (same draft, no code change), which I would propose that day.

## Undo

Before publish: delete nothing, simply do not publish the new copy. After publish: republish "Memobrick fixes" 189310075100.

## Who made the Nov 2 and Nov 3 edits

The connector cannot say. Theme files carry only `createdAt`, `updatedAt`, size and md5, with no author. The store events log (`events`) has no theme subject type (its types are articles, blogs, collections, customers, discounts, orders, pages, products and similar), and nothing theme-related appears in it between Nov 2 12:00 UTC and Nov 3 21:00 UTC. What can be seen: the Nov 2 edits ran 12:59 to 13:14 UTC (8:59 to 9:14 ET) and the Nov 3 edits all landed at 19:40:03 to 19:40:04 UTC (2:40 PM ET), four files within one second, which looks like a tool or script (for example a theme upload or the Shopify CLI), not hand edits in the code editor. Eden can check in Shopify admin: Settings > Users (last login of each staff or collaborator account) and, in the theme code editor, each file's "Older versions" list for those times.
