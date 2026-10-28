# Blog article template upgrade (default template), 2026-10-28

**Revision 2026-10-28 (b), after Eden's "no the picture is not good":** every picture in the template is now a real product photo of a finished Memobrick mosaic (no raw Memobrick Studio exports anywhere), and the hero is a fixed 3:2 frame on desktop (4:3 on phones) filled edge to edge with `object-fit: cover` at the image's focal point, instead of a square picture shrunk inside a white 2:1 box. Checksums of `templates/article.liquid`, `snippets/mb-article-card.liquid` and `snippets/mb-article-related-card.liquid` changed and 5 new assets replace the 5 Studio assets, so this item needs approval again. The featured images themselves are a separate item: `fixes/article-photo-swap.md`.

Built and tested by: site-developer (Jenny), on Eden's request ("add images and make it look nice ... adding Memobrick reviews or something that will drive sales").
Status: built in theme copy **"Memobrick fixes", id 189310075100 (unpublished)**. Nothing live has changed. The connector cannot write to the live theme, so Eden publishes the copy after approval.

**Preview:** https://mymemobrick.com/blogs/news/personalized-christmas-photo-gifts?preview_theme_id=189310075100
(any article on the default template works the same way, for example `/blogs/news/last-minute-personalized-christmas-gifts?preview_theme_id=189310075100` or `/blogs/news/brick-mosaic-calm-activity-autistic-kids-adults?preview_theme_id=189310075100`).

## Important: this copy also holds A-2026W44-016

The same copy already contains the ready-made "your own photo" link (`templates/product.liquid`, A-2026W44-016, pending). The theme count is 20 of 20, so no second copy could be made. Publishing the copy ships both changes.
- If both are approved: publish the copy once.
- If only this one is approved: I put the live `templates/product.liquid` back into the copy first (backup md5 a87bf50f20c4e21363b1ebc297cf44f1), then Eden publishes.
- If only A-2026W44-016 is approved: I put the live `templates/article.liquid` back (md5 82e7b853b14989438f955aeea5f60881) and the new snippets and assets stay unused.
- To make room for separate copies, Eden can delete old themes (for example "Copy of Copy of Copy of xx" 128996770012, "Copy Motty" 151313219804, "Tinker" 158554980572, "memobrick-theme-mobile-bg-fix-22/25/26"). Never delete "Memobrick kit page fix" 188955361500 (undo for the live theme) or "AVADA Assets - DO NOT REMOVE".

## Problem
Every article without a GemPages layout (11 today: the 8 published this morning, brick-mosaic-sizes, gift-for-someone-who-has-everything, personalized-christmas-photo-gifts, plus a few old ones in other blogs) rendered as a plain text page: no featured image on 3 of them, no product, no price, no reviews, no trust signals, and only one plain button at the very end. Blog readers had no easy next step toward an order.

## What changes (only on articles that use the default template; GemPages articles are untouched)
1. **Large featured image** under the title, always in a fixed frame: 3:2 on desktop (1040×693 px), 4:3 on phones (full width), `object-fit: cover`, positioned at the image's focal point set in Shopify admin (default 50% 40%, faces sit in the upper half), served up to 2080 px through srcset. When an article has no featured image, the fallback is a real photo of a finished mosaic: the framed couple on a wall (`mb-real-couple-wall.jpg`); calm series: the labeled color bags (`mb-real-color-bags.jpg`); handles with "dog" or "pet": the framed dog with the dog below it (`mb-real-dog-framed.jpg`). No caption, no raw Studio export.
2. **Readable text column**: 700 px wide, 17 to 17.5 px text, 1.75 line height, clearer H2/H3 spacing, tables that scroll sideways on phones. Read time and the Loox star line under the title.
3. **"Make yours" product card** after the intro (before the first H2) and again at the end: a real photo at 4:3 (the framed couple on a wall, or the woman with her framed portrait when the hero already shows the couple; captioned "A finished mosaic. Frame sold separately"), kit price read live from Shopify (20×20 $99.88 and "sizes from $35.00"; Loox rating 4.9 from the product's Loox data), buttons "Upload my photo" (editor) and "Get a free design proof" (/pages/free-preview), with the note that the proof is optional.
4. **Real Loox reviews**: star summary from Loox's own `loox.global_stats` (4.9, 1,027 reviews today) and up to 10 photo reviews from Loox's own `loox.review_feed_agg` feed, in Loox's order, with "Verified buyer" when Loox marks it. Nothing is typed by hand. A Loox app block cannot be placed in this Liquid template and the Loox script widget is JavaScript only, so the block reads the same Loox data server-side; it updates whenever Loox updates its metafields. "Read all reviews" goes to /pages/happy-customers.
5. **Trust strip**: "As seen on FOX" (FOX 4 holiday gift guide; never "Fox News"), "Free design proof" (optional), "Order by December 15 to receive it before Christmas" (offers calendar Facts), and "Too late? Gift Kit from $35, they pick the photo" (Art Gift Kit, live price). The Dec 15 item hides itself after Dec 15 and the Gift Kit item after Dec 25.
6. **Sticky phone button** (screens up to 760 px) after the reader scrolls past the image: "Your photo in bricks, Kits from $35.00, Upload my photo". It stops 76 px short of the right edge and sits below other widgets (z-index 40), so the Shopify Inbox chat bubble (bottom right) stays visible and tappable. It hides while a product card or the footer is on screen. Desktop: no sticky bar.
7. **Related articles**: 3 cards, hand-picked per series (Christmas, calm building, other), skipping the current and unpublished ones, topped up with the newest articles.
8. **Calm building series (autism)**: the 5 handles (or tag `calm-building`) get the 16×16 kit card ($69.88, 2,500 bricks sorted by color in labeled bags, about 2.5 hours, easy to split into short sessions), a photo of real labeled color bags (the other color set when the hero already shows the first), "Start a 16×16 design" (editor with 16×16 preselected), the small-parts note, calm headings ("What builders say about the kit"), and no Gift Kit push. No health claims anywhere. A link to the Calm Build Gift page appears automatically once a published page with handle `calm-build-gift` exists (none exists today; the gift page is not built yet).
9. **Kept intact**: BlogPosting and Breadcrumb JSON-LD unchanged; the article body is printed whole (split once at its first `<h2>`), so each article's FAQPage JSON-LD stays in place; exactly one H1 (if an article body has its own H1, the template title becomes a styled paragraph).

## Files
| File | Live (MAIN 189177626844) md5 | Copy (189310075100) md5 |
|---|---|---|
| templates/article.liquid | 82e7b853b14989438f955aeea5f60881 | 3ae9ed10c458abef8ea7dec0d36d46ec (was 0a1d696d78529adb1e1487a88c870773) |
| snippets/mb-article-card.liquid (new) | none | 696279d1a8279a12e98dda60cc140892 (was ada6871e8360494d0d3479494d58ac91) |
| snippets/mb-article-reviews.liquid (new) | none | 3a90b9685b75efa613fc05ce3a24fe81 |
| snippets/mb-article-trust.liquid (new) | none | bcfa3cc9f3df649c70f318240f0e25f3 |
| snippets/mb-article-related.liquid (new) | none | 42c76f2755ce24014461721da72631f5 |
| snippets/mb-article-related-card.liquid (new) | none | 7a926ec26064b862fed8eeb58e0a8495 (was 48d11f31db257e18a744a904400455c4) |
| assets/mb-real-couple-wall.jpg (new) | none | d5e99ffa5a2c95f329dc0617a4f10617 |
| assets/mb-real-woman-portrait.jpg (new) | none | edf4aed7bd011c0724fd122ae6769545 |
| assets/mb-real-dog-framed.jpg (new) | none | 0f86f3343c3523874b1eb4d469435b59 |
| assets/mb-real-color-bags.jpg (new) | none | f95d33350865e81d287c848c355e6c90 |
| assets/mb-real-color-bags-soft.jpg (new) | none | fed6af9aeee8c44f4a61ca9c9f5236c8 |
| assets/mb-studio-*.jpg (5 files from the first version) | none | still in the copy but no longer used by any file (the connector refuses theme file deletes); harmless, Eden may delete them in the code editor |
| templates/product.liquid (A-2026W44-016, not part of this item) | a87bf50f20c4e21363b1ebc297cf44f1 | 845d653ed4879952c714e0c4ae2e7220 |

All other files in the copy match live. Full before and after code: `marketing/conversion/site-developer/theme-files/article-upgrade-2026-10-28/live/` (before) and `.../new/` (after, revision b). Backup of the live file: `marketing/conversion/site-developer/backups/2026-10-28-article-upgrade/templates/article.liquid`.

The 5 assets are crops of the store's own real product photos (product media, downloaded through mymemobrick.com/cdn/shop): framed couple on a wall (20×40 product), woman with her framed portrait (20×20 product), framed dog with the dog (20×20 product), and two side-by-side sets of the real bag-of-bricks product photos. No AI images (the 1254 px main product images and the Gift Kit photos 1 to 4 are AI generated and were left out), no raw Studio exports, no Loox review cards, no other brands, no price claims. The people in the photos are never presented as customers or quoted. Contact sheet of all candidates kept: `marketing/conversion/site-developer/2026-10-28-article-photos/contact-sheet.jpg`.

### Before and after: templates/article.liquid (unified diff)

```diff
--- marketing/conversion/site-developer/theme-files/article-upgrade-2026-10-28/live/templates/article.liquid	2026-10-28 07:55:40.759169287 +0000
+++ marketing/conversion/site-developer/theme-files/article-upgrade-2026-10-28/new/templates/article.liquid	2026-10-28 08:04:07.977875771 +0000
@@ -1,11 +1,73 @@
 {%- comment -%}
-  [old comment line, contains a dash character; exact text in live/templates/article.liquid line 2]
-  image, no BlogPosting structured data (what Google uses for article
-  rich results), and the raw article.content had no prose styling (same
-  gap .page-prose already solves on templates/page.liquid). Fixed all of
-  that here, since real blog content is about to start flowing through
-  this template.
+  Default blog article template (every article without a GemPages layout).
+  2026-10-28 upgrade (site-developer): large featured image (3:2 on desktop,
+  4:3 on phones, cropped with object-fit cover at the image's focal point), readable text
+  column, a "Make yours" product card after the intro and at the end, real
+  Loox reviews, a trust strip, related articles and a phone-only sticky
+  button that leaves the chat bubble corner free.
+  The article body is printed whole, in two contiguous parts split at its
+  first <h2>, so the article's own FAQ JSON-LD stays intact and in place.
+  Snippets: mb-article-card, mb-article-reviews, mb-article-trust, mb-article-related.
 {%- endcomment -%}
+{%- liquid
+  comment
+    article.handle comes back as "news/<handle>" on this store, so keep only the last part.
+  endcomment
+  assign mba_handle = article.handle | split: '/' | last
+  assign mba_calm_handles = 'brick-mosaic-calm-activity-autistic-kids-adults,build-together-reader-sorter-builder,sensory-friendly-building-tips,special-interest-brick-mosaic,brick-mosaics-occupational-therapists-teachers' | split: ','
+  assign mba_series = 'default'
+  if mba_calm_handles contains mba_handle or article.tags contains 'calm-building'
+    assign mba_series = 'calm'
+  elsif mba_handle contains 'christmas' or article.tags contains 'christmas'
+    assign mba_series = 'christmas'
+  endif
+
+  comment
+    Fallback hero when the article has no featured image: a real product photo
+    of a finished mosaic (theme asset, 3:2), never a raw Studio export.
+    mba_hero_key tells the card which picture the hero already shows.
+  endcomment
+  assign mba_fallback = 'mb-real-couple-wall.jpg'
+  assign mba_fallback_alt = 'A finished brick mosaic of a smiling couple, framed and hanging on a wall'
+  if mba_series == 'calm'
+    assign mba_fallback = 'mb-real-color-bags.jpg'
+    assign mba_fallback_alt = 'Memobrick bags of 1×1 bricks, each labeled with its color name and number'
+  elsif mba_handle contains 'dog' or mba_handle contains 'pet'
+    assign mba_fallback = 'mb-real-dog-framed.jpg'
+    assign mba_fallback_alt = 'A finished brick mosaic of a dog in a white frame, with the dog sitting below it'
+  endif
+
+  if article.image
+    assign mba_hero_key = article.image.src | split: '?' | first | split: '/' | last
+  else
+    assign mba_hero_key = mba_fallback
+  endif
+
+  assign mba_has_h1 = false
+  if article.content contains '<h1'
+    assign mba_has_h1 = true
+  endif
+
+  assign mba_parts = article.content | split: '<h2'
+  assign mba_intro = mba_parts.first
+  assign mba_rest = article.content | remove_first: mba_intro
+  if mba_parts.size < 2
+    assign mba_rest = ''
+  endif
+
+  assign mba_words = article.content | strip_html | split: ' ' | size
+  assign mba_minutes = mba_words | divided_by: 230 | at_least: 1
+
+  assign mba_stats = shop.metafields.loox.global_stats.value | default: shop.metafields.loox.global_stats | split: ','
+  assign mba_rating = mba_stats[0]
+  assign mba_count = mba_stats[1] | strip
+  assign mba_count_n = mba_count | plus: 0
+  if mba_count_n >= 1000
+    assign mba_k = mba_count_n | divided_by: 1000
+    assign mba_r = mba_count_n | modulo: 1000 | prepend: '00' | slice: -3, 3
+    assign mba_count = mba_k | append: ',' | append: mba_r
+  endif
+-%}
 <script type="application/ld+json">
 {
   "@context": "https://schema.org",
@@ -31,32 +93,127 @@
   ]
 }
 </script>
-<div class="wrap" style="padding:48px 20px 90px;max-width:760px">
-  <p style="font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3)">
-    <a href="/" style="color:inherit;text-decoration:none">MemoBrick</a> <span aria-hidden="true">›</span>
-    <a href="{{ blog.url }}" style="color:inherit;text-decoration:none">{{ blog.title | escape }}</a>
-  </p>
-  <h1 style="font-family:var(--display);font-size:32px;letter-spacing:-.03em;margin:10px 0 8px">{{ article.title | escape }}</h1>
-  <p style="color:var(--ink-3);font-size:13.5px;margin:0 0 28px">
-    {{ article.published_at | date: '%B %-d, %Y' }}{% if article.author != blank %} · {{ article.author }}{% endif %}
-  </p>
-  {%- if article.image -%}
-    <img referrerpolicy="no-referrer" src="{{ article.image | image_url: width: 1200 }}" alt="{{ article.image.alt | default: article.title | escape }}"
-      style="width:100%;height:auto;border-radius:14px;margin-bottom:28px" loading="eager" onerror="this.style.display='none'">
-  {%- endif -%}
-  <div class="page-prose" style="color:var(--ink-2);font-size:16px;line-height:1.7">
-    {{ article.content }}
+<article class="mba mba--{{ mba_series }}">
+  <header class="mba-head">
+    <p class="mba-crumbs">
+      <a href="/">MemoBrick</a> <span aria-hidden="true">›</span>
+      <a href="{{ blog.url }}">{{ blog.title | escape }}</a>
+    </p>
+    {%- if mba_has_h1 -%}
+      <p class="mba-title">{{ article.title | escape }}</p>
+    {%- else -%}
+      <h1 class="mba-title">{{ article.title | escape }}</h1>
+    {%- endif -%}
+    <p class="mba-meta">
+      {{ article.published_at | date: '%B %-d, %Y' }}{% if article.author != blank %} · {{ article.author }}{% endif %} · {{ mba_minutes }} min read
+      {%- if mba_rating != blank %}
+        <a class="mba-meta-stars" href="#mba-reviews"><span aria-hidden="true">★★★★★</span> {{ mba_rating }} from {{ mba_count }} reviews</a>
+      {%- endif %}
+    </p>
+  </header>
+
+  <figure class="mba-hero">
+    {%- if article.image -%}
+      {%- assign mba_focal = article.image.presentation.focal_point | default: '50% 40%' -%}
+      <img src="{{ article.image | image_url: width: 1600 }}"
+        srcset="{{ article.image | image_url: width: 800 }} 800w, {{ article.image | image_url: width: 1200 }} 1200w, {{ article.image | image_url: width: 1600 }} 1600w, {{ article.image | image_url: width: 2080 }} 2080w"
+        sizes="(max-width: 760px) 100vw, 1040px"
+        alt="{{ article.image.alt | default: article.title | escape }}" width="{{ article.image.width }}" height="{{ article.image.height }}"
+        style="object-position:{{ mba_focal }}" loading="eager" fetchpriority="high">
+    {%- else -%}
+      <img src="{{ mba_fallback | asset_url }}" alt="{{ mba_fallback_alt | escape }}" width="1200" height="800" loading="eager" fetchpriority="high">
+    {%- endif -%}
+  </figure>
+
+  {%- render 'mb-article-trust', series: mba_series -%}
+
+  <div class="mba-body page-prose">
+    {{ mba_intro }}
+    {%- if mba_rest != blank -%}
+      {%- render 'mb-article-card', series: mba_series, place: 'intro', hero: mba_hero_key -%}
+      {{ mba_rest }}
+    {%- endif -%}
   </div>
-  <p style="margin-top:40px"><a class="btn btn-red" href="/pages/editor">Start designing your MemoBrick</a></p>
+
+  {%- render 'mb-article-reviews', series: mba_series, rating: mba_rating, count: mba_count -%}
+  {%- render 'mb-article-card', series: mba_series, place: 'end', hero: mba_hero_key -%}
+  {%- render 'mb-article-related', series: mba_series, current: mba_handle -%}
+</article>
+
+{%- liquid
+  if mba_series == 'calm'
+    assign mba_sticky_href = '/pages/editor?size=16x16#editor'
+    assign mba_sticky_text = 'Start a 16×16 design'
+    assign mba_sticky_p = all_products['1-big-board']
+  else
+    assign mba_sticky_href = '/pages/editor'
+    assign mba_sticky_text = 'Upload my photo'
+    assign mba_sticky_p = all_products['custom-bricked-mosaic-10x10']
+  endif
+-%}
+<div class="mba-sticky" id="mbaSticky" hidden>
+  <div class="mba-sticky-info">
+    <b>Your photo in bricks</b>
+    {%- if mba_sticky_p.price_min > 0 -%}<span>Kits from {{ mba_sticky_p.price_min | money }}</span>{%- endif -%}
+  </div>
+  <a class="btn btn-red" href="{{ mba_sticky_href }}" data-mba-cta="sticky">{{ mba_sticky_text }}</a>
 </div>
+<script>
+(function(){
+  var bar = document.getElementById("mbaSticky");
+  if (!bar || !("IntersectionObserver" in window)) return;
+  var mq = window.matchMedia("(max-width:760px)");
+  var hero = document.querySelector(".mba-hero");
+  var cards = document.querySelectorAll(".mba-card, .site-footer, footer");
+  var pastHero = false, cardVisible = 0;
+  function sync(){ bar.hidden = !(mq.matches && pastHero && cardVisible === 0); }
+  if (hero) new IntersectionObserver(function(es){ pastHero = !es[0].isIntersecting && es[0].boundingClientRect.top < 0; sync(); }).observe(hero);
+  var seen = new Set();
+  var io = new IntersectionObserver(function(es){
+    es.forEach(function(e){ if (e.isIntersecting) seen.add(e.target); else seen.delete(e.target); });
+    cardVisible = seen.size; sync();
+  });
+  cards.forEach(function(c){ io.observe(c); });
+  (mq.addEventListener ? mq.addEventListener("change", sync) : mq.addListener(sync));
+})();
+</script>
 {%- render 'site-footer' -%}
 <style>
-  .page-prose h2{font-family:var(--display);font-weight:600;font-size:24px;color:var(--ink);margin:32px 0 12px;letter-spacing:-.01em}
-  .page-prose h3{font-family:var(--display);font-weight:600;font-size:19px;color:var(--ink);margin:26px 0 10px}
-  .page-prose p{margin:0 0 16px}
-  .page-prose ul,.page-prose ol{margin:0 0 16px;padding-left:22px}
-  .page-prose li{margin-bottom:6px}
-  .page-prose a{color:var(--b-red);text-decoration:underline}
-  .page-prose img{max-width:100%;height:auto;border-radius:12px;margin:16px 0}
-  .page-prose strong{color:var(--ink);font-weight:600}
+  .mba{--mba-col:700px;--mba-wide:1040px;padding:36px 20px 40px}
+  .mba > *{margin-left:auto;margin-right:auto}
+  .mba-head,.mba-body{max-width:var(--mba-col)}
+  .mba-crumbs{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3);margin:0}
+  .mba-crumbs a{color:inherit;text-decoration:none}
+  .mba-title{font-family:var(--display);font-weight:700;font-size:clamp(30px,4.4vw,44px);line-height:1.08;letter-spacing:-.03em;color:var(--ink);margin:12px 0 12px}
+  .mba-meta{color:var(--ink-3);font-size:13.5px;margin:0 0 26px;display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center}
+  .mba-meta-stars{color:var(--ink-2);text-decoration:none;font-weight:600}
+  .mba-meta-stars span{color:#f7c90f;letter-spacing:1px}
+  .mba-hero{max-width:var(--mba-wide);margin-top:0;margin-bottom:22px;background:var(--paper,#f3f1ec);border-radius:20px;overflow:hidden;box-shadow:0 18px 40px -26px rgba(21,23,27,.35);position:relative}
+  .mba-hero img{display:block;width:100%;height:auto;aspect-ratio:3/2;object-fit:cover;object-position:50% 40%}
+  .mba-body{color:var(--ink-2);font-size:17.5px;line-height:1.75}
+  .mba-body.page-prose h2{font-family:var(--display);font-weight:600;font-size:clamp(23px,2.6vw,28px);line-height:1.2;color:var(--ink);margin:44px 0 14px;letter-spacing:-.01em}
+  .mba-body.page-prose h3{font-family:var(--display);font-weight:600;font-size:20px;color:var(--ink);margin:30px 0 10px}
+  .mba-body.page-prose p{margin:0 0 18px}
+  .mba-body.page-prose ul,.mba-body.page-prose ol{margin:0 0 18px;padding-left:22px}
+  .mba-body.page-prose li{margin-bottom:8px}
+  .mba-body.page-prose a{color:var(--b-red);text-decoration:underline;text-underline-offset:2px}
+  .mba-body.page-prose a.btn{text-decoration:none}
+  .mba-body.page-prose a.btn-red{color:#fff}
+  .mba-body.page-prose img{max-width:100%;height:auto;border-radius:14px;margin:18px 0}
+  .mba-body.page-prose strong{color:var(--ink);font-weight:600}
+  .mba-body.page-prose table{width:100%;border-collapse:collapse;font-size:15px;margin:0 0 20px;display:block;overflow-x:auto}
+  .mba-body.page-prose th,.mba-body.page-prose td{border-bottom:1px solid var(--line);padding:8px 10px;text-align:left;white-space:nowrap}
+  .mba-body.page-prose blockquote{margin:0 0 18px;padding:4px 0 4px 16px;border-left:4px solid var(--b-red);color:var(--ink)}
+  .mba-sticky{display:none}
+  @media (max-width:760px){
+    .mba{padding:22px 16px 30px}
+    .mba-hero{margin-left:-16px;margin-right:-16px;border-radius:0}
+    .mba-hero img{aspect-ratio:4/3}
+    .mba-body{font-size:17px}
+    .mba-sticky{display:flex;align-items:center;gap:10px;position:fixed;left:0;right:76px;bottom:0;z-index:40;background:var(--card,#fff);border-top:1px solid var(--line);border-right:1px solid var(--line);border-top-right-radius:14px;padding:10px 12px;padding-bottom:calc(10px + env(safe-area-inset-bottom,0px));box-shadow:0 -6px 18px -10px rgba(21,23,27,.25)}
+    .mba-sticky[hidden]{display:none}
+    .mba-sticky-info{display:flex;flex-direction:column;line-height:1.2;font-size:12px;color:var(--ink-3);min-width:0}
+    .mba-sticky-info b{font-family:var(--display);font-weight:600;font-size:14px;color:var(--ink);white-space:nowrap}
+    .mba-sticky .btn{flex:1 1 auto;padding:11px 10px;font-size:14px;white-space:nowrap}
+  }
 </style>
```

### Revision (b) changes: snippets/mb-article-card.liquid (from revision a)

```diff
--- revision-a/snippets/mb-article-card.liquid	2026-10-28 08:03:34.248687341 +0000
+++ marketing/conversion/site-developer/theme-files/article-upgrade-2026-10-28/new/snippets/mb-article-card.liquid	2026-10-28 08:12:43.569906419 +0000
@@ -2,7 +2,7 @@
   "Make yours" product card for blog articles (templates/article.liquid).
   series: 'calm' | 'christmas' | 'default'   place: 'intro' | 'end'   hero: (optional) hero asset name to avoid
   Self-contained (own CSS), so it can also be rendered from a GemPages Liquid element.
-  Price and Loox rating from Shopify; picture is a Memobrick Studio example. Calm series points to the 16×16 kit
+  Price and Loox rating from Shopify; picture is a real photo of a finished mosaic. Calm series points to the 16×16 kit
   (and to the Calm Build Gift page once a published page with handle
   calm-build-gift exists). No health claims.
 {%- endcomment -%}
@@ -18,15 +18,25 @@
     assign size_label = '20×20 in kit'
   endif
   comment
-    Card picture: a Memobrick Studio example mosaic (theme asset), never a
-    lifestyle photo with people. Avoids repeating the hero picture.
+    Card picture: a real product photo of a finished mosaic (theme asset),
+    never a raw Studio export. Avoids repeating the hero picture (hero is the
+    hero image file name).
   endcomment
   if series == 'calm'
-    assign card_img = 'mb-studio-cat.jpg'
-  elsif hero == 'mb-studio-dog.jpg'
-    assign card_img = 'mb-studio-sofa-couple.jpg'
+    assign card_img = 'mb-real-color-bags.jpg'
+    assign card_alt = 'Memobrick bags of 1×1 bricks, each labeled with its color name and number'
+    assign card_cap = 'Bricks sorted by color in labeled bags'
+    if hero contains 'color-bags-bright' or hero == 'mb-real-color-bags.jpg'
+      assign card_img = 'mb-real-color-bags-soft.jpg'
+    endif
+  elsif hero contains 'framed-couple-wall' or hero == 'mb-real-couple-wall.jpg'
+    assign card_img = 'mb-real-woman-portrait.jpg'
+    assign card_alt = 'A woman at home with a finished, framed brick mosaic of her own portrait'
+    assign card_cap = 'A finished mosaic. Frame sold separately'
   else
-    assign card_img = 'mb-studio-dog.jpg'
+    assign card_img = 'mb-real-couple-wall.jpg'
+    assign card_alt = 'A finished brick mosaic of a smiling couple, framed and hanging on a wall'
+    assign card_cap = 'A finished mosaic. Frame sold separately'
   endif
   assign rating = p.metafields.loox.avg_rating.value | default: p.metafields.loox.avg_rating
   assign raters = p.metafields.loox.num_reviews.value | default: p.metafields.loox.num_reviews
@@ -34,8 +44,8 @@
 -%}
 <aside class="mba-card mba-card--{{ place }}" aria-label="Make your own brick mosaic">
   <a class="mba-card-img" href="/pages/editor?size={{ size }}#editor" tabindex="-1" aria-hidden="true">
-    <img src="{{ card_img | asset_url }}" alt="" loading="lazy" width="600" height="600">
-    <span>Example design made in the Memobrick Studio</span>
+    <img src="{{ card_img | asset_url }}" alt="{{ card_alt | escape }}" loading="lazy" width="1200" height="800">
+    <span>{{ card_cap }}</span>
   </a>
   <div class="mba-card-txt">
     {%- if series == 'calm' -%}
@@ -72,7 +82,7 @@
   .mba-card-img{display:block;border-radius:14px;overflow:hidden;background:var(--paper,#f3f1ec)}
   .mba-card-img{position:relative}
   .mba-card-img span{position:absolute;left:8px;bottom:8px;background:rgba(255,255,255,.92);color:var(--ink-2);font-size:11px;line-height:1.2;padding:4px 8px;border-radius:999px}
-  .mba-card-img img{display:block;width:100%;height:auto;aspect-ratio:1/1;object-fit:cover;margin:0;border-radius:0}
+  .mba-card .mba-card-img img{display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;object-position:50% 40%;margin:0 !important;border-radius:0 !important}
   .page-prose .mba-card a.btn{text-decoration:none}
   .mba-card p{margin:0}
   .mba-card-eyebrow{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--b-red)}
```

### Revision (b) changes: snippets/mb-article-related-card.liquid (from revision a)

```diff
--- revision-a/snippets/mb-article-related-card.liquid	2026-10-28 08:03:34.248710876 +0000
+++ marketing/conversion/site-developer/theme-files/article-upgrade-2026-10-28/new/snippets/mb-article-related-card.liquid	2026-10-28 08:04:07.977875771 +0000
@@ -1,21 +1,23 @@
-{%- comment -%} One related-article card (used by mb-article-related). Image: the article's featured image, else a Memobrick Studio example mosaic. {%- endcomment -%}
+{%- comment -%} One related-article card (used by mb-article-related). Image: the article's featured image, else a real photo of a finished mosaic. {%- endcomment -%}
 <a class="mba-rel" href="{{ a.url }}">
   {%- if a.image -%}
     <img src="{{ a.image | image_url: width: 600 }}" alt="{{ a.image.alt | default: a.title | escape }}" loading="lazy" width="600" height="375">
   {%- else -%}
     {%- liquid
-      assign fb = 'mb-studio-dog.jpg'
-      if a.handle contains 'grandparent'
-        assign fb = 'mb-studio-grandma.jpg'
-      elsif a.handle contains 'wife' or a.handle contains 'everything'
-        assign fb = 'mb-studio-sofa-couple.jpg'
-      elsif a.handle contains 'christmas' or a.handle contains 'holiday'
-        assign fb = 'mb-studio-christmas-couple.jpg'
-      elsif a.handle contains 'size'
-        assign fb = 'mb-studio-cat.jpg'
+      assign fb = 'mb-real-couple-wall.jpg'
+      assign fb_alt = 'A finished brick mosaic of a smiling couple, framed on a wall'
+      if a.handle contains 'calm' or a.handle contains 'sensory' or a.handle contains 'build-together' or a.handle contains 'special-interest' or a.handle contains 'occupational'
+        assign fb = 'mb-real-color-bags.jpg'
+        assign fb_alt = 'Memobrick bags of 1×1 bricks, labeled by color'
+      elsif a.handle contains 'dog' or a.handle contains 'pet'
+        assign fb = 'mb-real-dog-framed.jpg'
+        assign fb_alt = 'A finished brick mosaic of a dog in a frame, with the dog below it'
+      elsif a.handle contains 'wife' or a.handle contains 'everything' or a.handle contains 'size'
+        assign fb = 'mb-real-woman-portrait.jpg'
+        assign fb_alt = 'A woman at home with a finished, framed brick mosaic of her portrait'
       endif
     -%}
-    <img src="{{ fb | asset_url }}" alt="Example brick mosaic made in the Memobrick Studio" loading="lazy" width="600" height="375">
+    <img src="{{ fb | asset_url }}" alt="{{ fb_alt }}" loading="lazy" width="600" height="400">
   {%- endif -%}
   <span class="mba-rel-t">{{ a.title | escape }}</span>
   <span class="mba-rel-x">{{ a.excerpt_or_content | strip_html | truncate: 110 }}</span>
```

## Tests of revision (b) (2026-10-28, preview of 189310075100, phone 390×844 at 2x and desktop 1440×900)
- Hero: object-fit cover, desktop box 1040×693 (3:2), phone 390×293 (4:3), on all 11 articles; no horizontal scroll (390 / 1440); no broken images.
- Card pictures: couple photo, or woman photo when the hero is the couple (last-minute stand-in and the no-image fallback both checked); calm series: bright color bags, soft set when the hero is the bright set.
- Fallback (personalized-christmas-photo-gifts, no featured image): framed couple photo at 3:2, card shows the woman photo.
- Screenshots in `marketing/conversion/site-developer/2026-10-28-article-photos/shots/`: `after-full-<phone|desktop>-last-minute-personalized-christmas-gifts-<top|card|full>.jpg`, `after-full-<phone|desktop>-brick-mosaic-calm-activity-autistic-kids-adults-<top|card|full>.jpg` (proposed featured image swapped in the browser as a stand-in), `after-fallback-<phone|desktop>-personalized-christmas-photo-gifts-<top|card|full>.jpg`, before: `before-preview-...` (revision a). All 11 tops, before and after: `marketing/conversion/site-developer/2026-10-28-article-photos/before-after-desktop-top-11.jpg`.
- Test script: `marketing/conversion/site-developer/tools/article-photo-shot.mjs`.

## Tests of revision (a) (2026-10-28, preview of 189310075100 vs live, phone 390×844 Android UA and desktop 1440×900)
Articles: personalized-christmas-photo-gifts (no featured image, fallback hero), last-minute-personalized-christmas-gifts (featured image, published today), brick-mosaic-calm-activity-autistic-kids-adults (calm series).
- One H1 on every page; JSON-LD types unchanged from live: Organization, WebSite, BreadcrumbList, BlogPosting, BreadcrumbList, FAQPage (all parse).
- No horizontal scroll (page width 390 / 1440).
- Cards: 2 per article; buttons go to `/pages/editor?size=20x20#editor` (calm: `size=16x16`) and `/pages/free-preview`.
- Reviews: 10 photo reviews, header "4.9 out of 5 · 1,027 reviews".
- Trust strip texts as listed above (calm: FOX, free proof, sorted by color, Dec 15).
- Related: Christmas pages show the other Christmas articles; the calm hub shows sensory tips, build together, special interest.
- Sticky (phone, scrolled): visible, x 0, width 314 of 390, height 65, leaves the bottom-right 76 px free; hidden on desktop.
- JS errors: only the same two as on the live page (blocked Shop Pay and TikTok hosts in the sandbox); none from the new code.
- Not visible in the sandbox: the Loox review photos (images.loox.io is blocked here, so review cards show text only in the screenshots; real visitors see the photos) and the Inbox chat bubble (its script host is blocked here). The 76 px gap matches the Inbox "lowest, bottom right" position in settings_data; Eden, please glance at one article on a real phone after publishing.

Screenshots (JPEG, about 1000 px wide or less): `marketing/conversion/site-developer/2026-10-28-article-upgrade/`
- before: `before-phone-<handle>-top.jpg`, `-mid.jpg`, `-full.jpg`, `before-desktop-<handle>-top.jpg`, `-full.jpg`
- after: the same names with `after-`
- results: `after-results.json`, `before-results.json`, `before-results-calm.json`
Test script: `marketing/conversion/site-developer/tools/article-shot.mjs`.

## Featured images
Replaced by `marketing/conversion/site-developer/fixes/article-photo-swap.md`: one real product photo per article (11 articles), with old and new image URLs. The earlier body-image suggestions that used Studio exports are withdrawn.

## Expected effect
Blog articles are a growing share of organic entries in the Christmas season (11 default-template articles, 8 of them new today). Each article now offers a priced next step after the intro, at the end and on a sticky phone button, plus real reviews and the Dec 15 date. A realistic goal is article-to-editor clicks going from about zero (one plain end button) to a few percent of article sessions; a small number of extra orders per week until Dec 15. Measure: sessions landing on `/blogs/news/*` with a following `/pages/editor` or `/pages/free-preview` view (referred sessions only), and clicks on links with `data-mba-cta`.

## How to undo
Republish "Memobrick holiday gift boxes" (189177626844), or put back `templates/article.liquid` from the backup (md5 82e7b853b14989438f955aeea5f60881). The new snippets and assets do nothing on their own.

## Notes for the owner
- The theme still states "747 reviews averaging 4.8" in several places (home meta description, collection trust line, happy-customers page, product schema). Loox now reports 4.9 from 1,027. Worth updating in a separate change (seo-technical's A-2026W41-012 covers the hardcoded product rating).
- GemPages articles: `marketing/conversion/site-developer/gempages-article-upgrade.md` (uses these same snippets, so publish this first).
