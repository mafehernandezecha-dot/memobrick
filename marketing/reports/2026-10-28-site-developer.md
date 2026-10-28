# site-developer 2026-10-28

## Summary
Special run (Eden's request): blog article template upgrade built and tested in the same copy 189310075100; proposed as P-site-developer-20261028-2. GemPages steps for Eden written.
Built and tested one fix: an A/B "your own photo" link on ready-made design pages (Wilson's audit problem 3), in theme copy 189310075100.
A-2026W43-002 again printed as approved but is moot (the kit page fix is live); not applied. No live writes.
Special run (Eden's "ok run"): built the Calm Build Gift page, unpublished (page 167408763100), uploaded the free plan PDF to Shopify Files, tested, and proposed the publish.

## Done
- A-2026W43-002: not acted on. Duplicate of A-2026W43-001, already live; live `product.liquid` has the creator check. It expires today.
- Live theme is still "Memobrick holiday gift boxes" (189177626844, updated 2026-10-25). Created working copy "Memobrick fixes" (189310075100) and changed only `templates/product.liquid`.
- Tested on phone and desktop: arm A unchanged, arm B shows the link and it reaches the editor, kit pages unchanged, no horizontal scroll. Screenshots in `marketing/conversion/site-developer/2026-10-28-ready-made-own-photo/`.
- Draft: `marketing/conversion/site-developer/fixes/ready-made-own-photo-link.md`.
- Special run, Calm Build Gift (Eden: "ok run"): uploaded `calm-build-plan.pdf` to Shopify Files (gid://shopify/GenericFile/46715090305244, READY). Created page "Calm Build Gift" (gid://shopify/Page/167408763100, handle `calm-build-gift`, unpublished, default page template). Prices re-checked in Shopify today: 16×16 kit $69.88, 16×16 frame $49. Main button `/pages/editor?size=16x16#editor` (same link as the theme's size buttons), free proof link `/pages/free-preview`. Images: two real product photos, no people. Tested at 390×844 and 1440×900 (stored body rendered in the live default page template): no horizontal scroll, images load, PDF/editor/free-proof links 200, a generated test image uploaded and the editor showed 16 × 16" $69.88. Screenshots: `marketing/conversion/site-developer/2026-10-28-calm-build-gift/`. Draft: `marketing/conversion/site-developer/fixes/calm-build-gift.md`. Preview (admin): https://admin.shopify.com/store/photobrickusa/pages/167408763100

## Proposed for approval
### P-site-developer-20261028-1
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/ready-made-own-photo-link.md
- Reason: Adds a text link "Want it with your own photo?" to ready-made design pages for half of visitors (A/B test CA-20261028-01); the owner publishes theme copy "Memobrick fixes" (189310075100) after approval because the connector cannot write to the live theme.
- Expires: 2026-11-04
- Status: pending

### P-site-developer-20261028-2
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/calm-build-gift.md
- Reason: site-developer publishes the unpublished Shopify page "Calm Build Gift" (page 167408763100, one pageUpdate isPublished true) at mymemobrick.com/pages/calm-build-gift so Sandra's autism hub and Mario's outreach can link to it; no theme, product or price change.
- Expires: 2026-11-04
- Status: pending

### P-site-developer-20261028-2
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/article-template-upgrade.md
- Reason: Upgrades the default blog article template (large image, readable column, priced "Make yours" cards, real Loox reviews, FOX/free proof/Dec 15/Gift Kit strip, sticky phone button, related articles; calm series points to the 16×16 kit) in theme copy "Memobrick fixes" 189310075100, which Eden publishes; the 8 articles published today and 3 older ones sell better before Dec 15.
- Expires: 2026-11-04
- Status: pending

## Blocked or unknown
- The Shopify connector blocks live-theme writes, so approved items still need the owner to publish the copy.
- Orders cannot be split by A/B arm (arm is stored in the browser). The test measures editor landings with `?from=ready-made`.
- Owner: set A-2026W43-002 to rejected.
- Theme count is 20 of 20; the owner may delete old copies (for example the memobrick-theme-v22 to v26 and "Copy of" themes) so new copies can be made.
- Phone and referred-only funnel numbers still need GA4 or a device-filtered Shopify report.
- Calm Build Gift: Sandra's autism hub article is not live (no Shopify article matches "autism"), so the page does not link to it yet; add the link in a follow-up once it is published. An unpublished page cannot be opened on the storefront, so the test rendered its stored body inside the live default page template (/pages/about-us); Eden can see the real page with "Preview" in Shopify admin. No age warning exists in `product-facts.md`, so the small-parts note states no age. The README's step 3 (one autistic adult or parent and one OT try the plan) is still open and is the owner's call before a wider push.

## Sales impact
Addresses Wilson's problem 3 (ready-made pages with 0 add to cart from about 640 monthly sessions). Expected effect is small and unproven (a few orders a month at best); it is a test, not a promise.
Calm Build Gift: a new landing page for a new audience that leads into the 16×16 editor ($69.88). No orders until it is published and linked from the hub and outreach; expect a small number at first.

## Next run
Apply P-site-developer-20261028-1 once approved and published; recheck the live theme id; follow up the funnel numbers when GA4 data exists. Publish the Calm Build Gift page once P-site-developer-20261028-2 is approved; then add the hub link when Sandra's article is live.

## Special run: blog article upgrade (Eden's request, 2026-10-28)

### Done
- Rebuilt the default article template (`templates/article.liquid`) plus 5 new snippets and 5 Studio example images in theme copy "Memobrick fixes" (189310075100). No live writes, no article bodies edited.
- Found and fixed on the way: on this store `article.handle` returns "news/<handle>", so handle checks strip the blog prefix.
- Tested on phone and desktop against live for personalized-christmas-photo-gifts, last-minute-personalized-christmas-gifts and the calm hub: one H1, JSON-LD unchanged (FAQPage intact), no horizontal scroll, cards, Loox reviews, trust strip, related, sticky. Screenshots: `marketing/conversion/site-developer/2026-10-28-article-upgrade/`.
- Draft: `marketing/conversion/site-developer/fixes/article-template-upgrade.md` (files, diff, preview, tests, image list for Sandra, undo).
- GemPages steps for Eden: `marketing/conversion/site-developer/gempages-article-upgrade.md` (same snippets via a GemPages Liquid element; starts with a-holiday-activity-everyone-can-actually-join and this-christmas-give-them-a-memory-they-can-build; personalized-christmas-photo-gifts is on the default template, so it needs nothing in GemPages).
- Preview: https://mymemobrick.com/blogs/news/personalized-christmas-photo-gifts?preview_theme_id=189310075100

### Blocked or unknown
- Theme count 20 of 20: the article change shares copy 189310075100 with A-2026W44-016 (product.liquid). Publishing ships both; the draft says how to split them if only one is approved. Deleting one or more old themes (for example "Copy Motty" 151313219804 or "Tinker" 158554980572) would allow separate copies. Never delete 188955361500 (undo for live).
- No Calm Build Gift page exists yet (no page with handle calm-build-gift); the calm card will link to it automatically once it is published.
- Sandbox blocks images.loox.io and the Inbox chat script, so review photos and the chat bubble could not be seen in tests; check one article on a real phone after publishing.
- Loox now reports 4.9 from 1,027 reviews; the theme still says 747 and 4.8 in several places.
- The 16×16 and 20×20 product lifestyle photos may be AI scenes (one shows a girl holding a mosaic); the cards use Studio example mosaics instead.

### Sales impact
Addresses the blog as an entry point with no priced next step. 11 default-template articles (8 new today, aimed at Christmas and calm-building searches) now carry three priced calls to action, real reviews and the Dec 15 date. Expected: article-to-editor clicks from near zero to a few percent of article sessions; a small number of extra orders per week until Dec 15.

### Next run
Once approved and published: confirm live md5s, take after-screenshots on the live store, then follow up on article to editor sessions (referred only). If A-2026W44-016 and this item get different decisions, split the copy as described in the draft.

## Special run: dog landing page for Meta "XMAS26 Dog v2" (Eden's request, 2026-10-28)

### Summary
Built the unpublished Shopify page "Your Dog in Bricks" (handle `dog-brick-mosaic`, page 167410106588), tested on phone and desktop, and proposed the publish as P-site-developer-20261028-3.

### Done
- Re-checked prices in Shopify today: 16×16 $69.88, 20×20 $99.88, 30×30 $209.99 (variant "No (Build at home)"); Gift Kit from $35; Loox 4.9 from 1,027 reviews.
- Uploaded the Studio dog mosaic to Shopify Files (`dog-brick-mosaic-studio.jpg`, gid://shopify/MediaImage/46715505049820, READY).
- Created page gid://shopify/Page/167410106588, unpublished, default page template, with SEO title and description. Body: `marketing/conversion/site-developer/dog-landing-page/page-body.html`; read back from Shopify, style and script kept.
- Reviews: four real 5-star verified Loox dog reviews found in the Loox metafields (Loox's widget cannot filter by keyword), quoted word for word, no photos.
- Tested at 390×844 and 1440×900: hero button inside the first phone screen, no horizontal scroll, images load, editor opens with 20×20 $99.88 (hero), 16×16 $69.88 and 30×30 $209.99 after a generated test upload; date lines hide after Nov 22 and Dec 15. Screenshots: `marketing/conversion/site-developer/2026-10-28-dog-landing-page/`.
- Draft: `marketing/conversion/site-developer/fixes/dog-landing-page.md`. Admin preview: https://admin.shopify.com/store/photobrickusa/pages/167410106588

### Proposed for approval
### P-site-developer-20261028-3
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/dog-landing-page.md
- Reason: site-developer publishes the unpublished page "Your Dog in Bricks" (page 167410106588, one pageUpdate isPublished true) at mymemobrick.com/pages/dog-brick-mosaic; then Daniel points Meta ad XMAS26 Dog v2 to it (A-2026W44-031 item 1). No theme, product or price change.
- Expires: 2026-11-04
- Status: pending

### Blocked or unknown
- An unpublished page has no public URL, so the test rendered the body inside the live default page template (/pages/about-us). Eden sees the real page with "Preview" in Shopify admin.
- images.loox.io is blocked here, so no review photos are used (one checked review photo shows a couple, not a dog).
- This report already lists P-site-developer-20261028-2 twice (calm page and article upgrade); this proposal uses -3 to avoid a third clash.
- Daniel must wait for the page to return 200 before changing Dog v2's link.

### Sales impact
Targets the Dog v2 ad (51 landing page views, 0 purchases in 7 days on a general page). A dog-specific page with price and a size-set editor button on the first phone screen should turn some of those clicks into editor starts and orders; expect 1 to 3 orders a week at today's spend, judged on the Nov 2 review.

### Next run
Once P-site-developer-20261028-3 is approved: confirm the page is not already published, publish it, check it returns 200 on phone and desktop, take live screenshots, and tell Daniel to repoint Dog v2.
