# GemPages article upgrade: reviews, product card, trust strip

For Eden. Written by site-developer (Jenny), 2026-10-28. About 10 minutes per article.

The 11 articles on the theme's default template get these blocks automatically once theme copy "Memobrick fixes" (189310075100) is published (see `fixes/article-template-upgrade.md`). The 47 GemPages articles need them added by hand in GemPages, because I cannot use the GemPages editor.

## Before you start

1. Publish theme copy "Memobrick fixes" first. The blocks below come from 4 small theme files (snippets) that are only in that copy until it is published. If you add them in GemPages before publishing, the page shows an error line instead.
2. Open each article in the GemPages editor (Shopify admin > Apps > GemPages > Pages > Articles), not in the Shopify theme editor.

## The 3 blocks (copy exactly)

Each block is one GemPages **Liquid** element. In the GemPages element list it is under Advanced. It may be called "Liquid", "Custom Code" or "HTML/Liquid" in your version; use the one that accepts Liquid code. Paste one line per element.

| Block | Code to paste (Christmas and gift articles) |
|---|---|
| Trust strip | `{% render 'mb-article-trust', series: 'christmas' %}` |
| Product card (after the intro) | `{% render 'mb-article-card', series: 'christmas', place: 'intro' %}` |
| Loox reviews | `{% render 'mb-article-reviews', series: 'christmas' %}` |
| Product card (at the end) | `{% render 'mb-article-card', series: 'christmas', place: 'end' %}` |

For articles that are not about Christmas or gifts, use `series: 'default'` instead of `series: 'christmas'` (the card's small heading changes; everything else is the same).

What each block shows:
- **Trust strip:** As seen on FOX (FOX 4 holiday gift guide), Free design proof (optional), Order by December 15 to receive it before Christmas, and "Too late? Gift Kit" with its live price. The December 15 item hides itself after Dec 15 and the Gift Kit item after Dec 25, so nobody has to remember to remove them.
- **Product card:** a real photo of a finished, framed mosaic, the 20×20 kit price and Loox rating read live from Shopify, and two buttons: "Upload my photo" (editor) and "Get a free design proof".
- **Loox reviews:** the real star summary (4.9 from 1,027 reviews today) and up to 10 photo reviews from Loox's own review feed. Nothing is typed in, so the reviews are always real and update when Loox updates.

## Article 1: personalized-christmas-photo-gifts

Nothing to do in GemPages. This article uses the theme's default template (not GemPages), so it gets every block automatically when the theme copy is published. It is one of the two tested pages; screenshots are in `2026-10-28-article-upgrade/`.

## Article 2: a-holiday-activity-everyone-can-actually-join (GemPages layout 635767739457209060)

The page has two sections: the top section (title "A Holiday Activity Everyone Can Actually Join", intro text, a product image and an Add to cart block) and the long body section with a hand-built "Reviews from Happy Customers" row.

1. Open the article in GemPages.
2. **Trust strip:** drag a Liquid element directly under the title "A Holiday Activity Everyone Can Actually Join" (above the first paragraph). Paste the trust strip line.
3. **Product card after the intro:** drag a Liquid element under the intro paragraph that ends "You simply start with the pieces and build from there." Paste the "after the intro" card line.
4. **Reviews:** select the "Reviews from Happy Customers" row (the heading and the typed quotes from Candice L., Aaron M., Kelsey M. and Aaryn C.). Add a Liquid element right above it and paste the Loox reviews line. Then hide or delete the old typed row.
   - Why: the typed quotes are copied by hand, so names, photos and text can drift apart (check, for example, that "I split the photo in half... 60x20" sits under Candice L., whose Loox review it is). The Loox block always pairs the right name, photo and text, and stays current.
5. **Product card at the end:** drag a Liquid element under the last paragraph ("This holiday, build something together."). Paste the "at the end" card line.
6. Optional: the top section's Add to cart block adds a kit with no photo. Consider replacing it with the product card (which sends people to the editor to upload their photo) so nobody buys a custom kit without a design.
7. Save, then Preview on a phone and a desktop. Check: one star line and real photos in the reviews row, both card buttons open the editor and the free proof page, nothing overlaps the chat bubble.
8. Publish in GemPages.

## Article 3: this-christmas-give-them-a-memory-they-can-build (GemPages layout 635418409265267561)

The second GemPages Christmas hub. Same steps as Article 2:
1. Trust strip under the title.
2. Product card under the first one or two intro paragraphs (before the first subheading).
3. Loox reviews block before the closing section; hide any typed review row.
4. Product card at the end.
5. Preview on phone and desktop, then publish.

## Then the other GemPages articles, in this order

Do the Christmas ones first (most traffic until Dec 15), then the rest when there is time:
1. the-christmas-gift-that-turns-a-favorite-moment-into-an-experience
2. give-more-than-a-gift-personalized-christmas-memories-to-build-together-yfpbkl
3. make-christmas-memories-last-personalized-gifts-theyll-treasure-for-years-qcaqov
4. dont-wait-until-december-personalized-christmas-gifts-to-order-now
5. the-most-fun-christmas-gifts-are-the-ones-you-create-together
6. make-your-holiday-gathering-more-than-just-dinner
7. thoughtful-thanksgiving-gifts-that-bring-families-closer-together-aug-8-10
8. All other GemPages articles with `series: 'default'`.

Tip: after the first article, use GemPages "Save as template" or copy the 4 Liquid elements as a saved section, so each next article is a drag and drop.

## If you prefer Loox's own GemPages element

GemPages also has Loox elements (search "Loox" in the element list). Its review widgets are built for product pages and need a product picked. On an article, choose the "all reviews" or carousel type if your GemPages version offers it, set it to photo reviews, and check in Preview that it shows reviews from all products. If it shows nothing or asks for a product, use the Liquid line above instead; it reads the same Loox data.

## What not to do

- Do not type reviews or star numbers by hand, and do not add a review next to an AI-made picture.
- Do not write "Fox News". Say "As seen on FOX" or "FOX 4's holiday gift guide".
- Do not add a second H1 (the article title is already the H1).
- Do not remove an article's FAQ section or its FAQ JSON-LD.
- For the calm building series (autism) articles, which are on the default template anyway, the theme uses `series: 'calm'` (16×16 kit, calm wording, small-parts note). Do not use the Christmas blocks there.

## Undo

Delete the Liquid elements in GemPages and unhide the old review row, then publish. Nothing else changes.
