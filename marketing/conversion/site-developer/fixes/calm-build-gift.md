# Publish the "Calm Build Gift" page (site-change)

Asked by Eden on 2026-10-28 ("ok run" to "Want me to have Jenny build the page?"). Concept: `marketing/conversion/calm-build-gift/README.md`. Wording rules: `marketing/seo/briefs/2026-10-28-autism-calm-building-research.md`.

## What approval does

site-developer runs one Shopify Admin mutation on one page and nothing else:

```graphql
mutation { pageUpdate(id: "gid://shopify/Page/167408763100", page: { isPublished: true }) { page { id handle isPublished } userErrors { field message } } }
```

The page then goes live at https://mymemobrick.com/pages/calm-build-gift. The theme, products, prices, checkout, apps and navigation stay as they are. The page is not added to any menu. Sandra (hub article) and Mario (outreach) link to it once it is live.

## The page as it is now (unpublished)

| Field | Value |
|---|---|
| Page | "Calm Build Gift", id gid://shopify/Page/167408763100, handle `calm-build-gift`, isPublished false, template: the theme's default `templates/page.liquid` (live theme 189177626844) |
| Preview | Shopify admin: https://admin.shopify.com/store/photobrickusa/pages/167408763100 (click "Preview"). An unpublished page has no public URL, so the storefront link only works after publishing |
| Body | `marketing/conversion/site-developer/calm-build-gift/page-body.html` (what was sent). Shopify stored it with only extra line breaks after some opening tags: `calm-build-gift/page-body-as-stored.html` |
| Free plan PDF | Shopify Files, gid://shopify/GenericFile/46715090305244, status READY, 9,604 bytes, same file as `marketing/conversion/calm-build-gift/calm-build-plan.pdf` (md5 eba7eb32ff9c520931d5eed67e1d217e). Link on the page: `/cdn/shop/files/calm-build-plan.pdf?v=1793172038` (returns 200 application/pdf on mymemobrick.com) |
| Images | Real Shopify product photos only, no people: the 16×16 Bernese mountain dog mosaic next to its photo (16×16 kit product image), and the black 16×16 frame (frame product image). Loaded through the store domain |

## What is on the page

1. Intro: calm, predictable, a clear finish, built one row at a time, together or alone, short sessions.
2. One line saying who we had in mind, and that we say "autistic people" because many autistic self-advocates prefer it (said once).
3. What's in the gift: the 16×16 kit at **$69.88** (re-checked in Shopify 2026-10-28: variant "No (Build at home)" 69.88), their own photo, the free plan, the optional black 16×16 frame at **$49** (re-checked 2026-10-28).
4. Download button for the Calm Build Plan PDF ("No email needed").
5. How to use the plan in 3 steps.
6. Building together: map reader, color finder, builder. Swap jobs, or build alone.
7. Main button "Make your 16×16 mosaic" to `/pages/editor?size=16x16#editor`, the same link the theme's size buttons use (product.liquid `href="/pages/editor?size={{ size_id }}#editor"` with size_id 16x16). Tested: after a test upload the editor shows 16 × 16" $69.88 on phone and desktop.
8. Free proof link to `/pages/free-preview` (the store's published "Free Proof" page).
9. Small-parts note: small bricks, not for young children or anyone who may put small pieces in their mouth. No age is stated because `product-facts.md` has none.
10. FAQ (7 questions), the first one: "Is this a therapy or a treatment? No ..."

Hard rules checked: no health, therapy or improvement claims; no testimonials, quotes or "families tell us"; no people in any image (no AI people); no trademarked characters; no discount code; only facts from `product-facts.md` and the Facts table of `offers-calendar.md` (Free US shipping at $125, rates by address below that, order by December 15 for Christmas). `check.py copy` passes.

Sandra's autism hub article is not live yet (no Shopify article matches "autism" on 2026-10-28), so the page does not link to it. Once it is live, adding that link is a small follow-up edit.

## Tests (2026-10-28)

Because an unpublished page cannot be opened on the storefront, the test loaded the live published page /pages/about-us, which uses the same default page template, and swapped in this page's title and stored body, at phone 390×844 and desktop 1440×900. Script: `marketing/conversion/site-developer/calm-build-gift/test-page.mjs`.

- No horizontal scroll (scroll width 390 on phone, 1440 on desktop). Both images load. The FAQ opens and closes.
- Links: PDF 200 application/pdf, editor 200, free proof 200 (curl through the store domain).
- Main button: the editor opened at `?size=16x16`; a generated test image (orange circle on blue and green, no person) uploaded; the editor showed 16 × 16" $69.88 on phone and desktop.
- The site logo is missing in the desktop screenshots only because the sandbox blocks cdn.shopify.com, where the logo file lives. The live page shows it.

Screenshots in `marketing/conversion/site-developer/2026-10-28-calm-build-gift/`:
- `final-phone-first-screen.jpg`, `final-phone-full.jpg`, `final-phone-faq-open.jpg`, `final-phone-cta-editor.jpg`, `final-phone-cta-editor-after-upload.jpg`
- `final-desktop-first-screen.jpg`, `final-desktop-full.jpg`, `final-desktop-faq-open.jpg`, `final-desktop-cta-editor.jpg`, `final-desktop-cta-editor-after-upload.jpg`

## Expected effect

A new landing page for a new audience (autistic adults, parents, OTs, sensory-friendly gift guides), sending visitors straight into the 16×16 editor. It has no traffic until Sandra's hub and Mario's outreach link to it, so expect few orders at first; the plan download is the useful hook and the 16×16 kit ($69.88) is the order. Watch: page sessions (referred only), clicks to the editor, and 16×16 orders after a visit.

## Undo

```graphql
mutation { pageUpdate(id: "gid://shopify/Page/167408763100", page: { isPublished: false }) { page { id isPublished } userErrors { field message } } }
```

Nothing else changes, so nothing else needs undoing. The PDF in Shopify Files can stay (it is free and linked from the blog hub too).

## Live (2026-10-28)
- A-2026W44-027 done: the main session published the page (isPublished true) on 2026-10-28; live at https://mymemobrick.com/pages/calm-build-gift .
- 08:48 UTC: added a link to the live autism hub article under "Building together": "For more ideas, read our guide Building a Brick Mosaic as a Calm, Shared Activity for Autistic Kids and Adults" -> /blogs/news/brick-mosaic-calm-activity-autistic-kids-adults. Nothing else changed. Backup of the body before: backups/2026-10-28-calm-build-gift-hub-link/page-body-before.html; body now: calm-build-gift/page-body-live-2026-10-28-hub-link.html.
- Checked live on phone and desktop: link present, it opens the article, no horizontal scroll. Screenshots: 2026-10-28-calm-build-gift/after-phone-calm-build-gift-hub-link.jpg, after-desktop-calm-build-gift-hub-link.jpg.
- Undo for the link: pageUpdate with the backup body.
