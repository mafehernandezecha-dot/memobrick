# Blog article template upgrade (default template), 2026-10-28

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
1. **Large featured image** under the title: the article's own featured image, or, when it has none, a Memobrick Studio example mosaic labeled "Example design made in the Memobrick Studio" (never presented as a customer). Full width on phones, up to 1040 px on desktop.
2. **Readable text column**: 700 px wide, 17 to 17.5 px text, 1.75 line height, clearer H2/H3 spacing, tables that scroll sideways on phones. Read time and the Loox star line under the title.
3. **"Make yours" product card** after the intro (before the first H2) and again at the end: Studio example mosaic, kit price read live from Shopify (20×20 $99.88 and "sizes from $35.00"; Loox rating 4.9 from the product's Loox data), buttons "Upload my photo" (editor) and "Get a free design proof" (/pages/free-preview), with the note that the proof is optional.
4. **Real Loox reviews**: star summary from Loox's own `loox.global_stats` (4.9, 1,027 reviews today) and up to 10 photo reviews from Loox's own `loox.review_feed_agg` feed, in Loox's order, with "Verified buyer" when Loox marks it. Nothing is typed by hand. A Loox app block cannot be placed in this Liquid template and the Loox script widget is JavaScript only, so the block reads the same Loox data server-side; it updates whenever Loox updates its metafields. "Read all reviews" goes to /pages/happy-customers.
5. **Trust strip**: "As seen on FOX" (FOX 4 holiday gift guide; never "Fox News"), "Free design proof" (optional), "Order by December 15 to receive it before Christmas" (offers calendar Facts), and "Too late? Gift Kit from $35, they pick the photo" (Art Gift Kit, live price). The Dec 15 item hides itself after Dec 15 and the Gift Kit item after Dec 25.
6. **Sticky phone button** (screens up to 760 px) after the reader scrolls past the image: "Your photo in bricks, Kits from $35.00, Upload my photo". It stops 76 px short of the right edge and sits below other widgets (z-index 40), so the Shopify Inbox chat bubble (bottom right) stays visible and tappable. It hides while a product card or the footer is on screen. Desktop: no sticky bar.
7. **Related articles**: 3 cards, hand-picked per series (Christmas, calm building, other), skipping the current and unpublished ones, topped up with the newest articles.
8. **Calm building series (autism)**: the 5 handles (or tag `calm-building`) get the 16×16 kit card ($69.88, 2,500 bricks sorted by color in labeled bags, about 2.5 hours, easy to split into short sessions), a cat Studio mosaic, "Start a 16×16 design" (editor with 16×16 preselected), the small-parts note, calm headings ("What builders say about the kit"), and no Gift Kit push. No health claims anywhere. A link to the Calm Build Gift page appears automatically once a published page with handle `calm-build-gift` exists (none exists today; the gift page is not built yet).
9. **Kept intact**: BlogPosting and Breadcrumb JSON-LD unchanged; the article body is printed whole (split once at its first `<h2>`), so each article's FAQPage JSON-LD stays in place; exactly one H1 (if an article body has its own H1, the template title becomes a styled paragraph).

## Files
| File | Live (MAIN 189177626844) md5 | Copy (189310075100) md5 |
|---|---|---|
| templates/article.liquid | 82e7b853b14989438f955aeea5f60881 | 0a1d696d78529adb1e1487a88c870773 |
| snippets/mb-article-card.liquid (new) | none | ada6871e8360494d0d3479494d58ac91 |
| snippets/mb-article-reviews.liquid (new) | none | 3a90b9685b75efa613fc05ce3a24fe81 |
| snippets/mb-article-trust.liquid (new) | none | bcfa3cc9f3df649c70f318240f0e25f3 |
| snippets/mb-article-related.liquid (new) | none | 42c76f2755ce24014461721da72631f5 |
| snippets/mb-article-related-card.liquid (new) | none | 48d11f31db257e18a744a904400455c4 |
| assets/mb-studio-christmas-couple.jpg (new) | none | b40a47cb2249bc0dbc0b6450c73d75f5 |
| assets/mb-studio-grandma.jpg (new) | none | fa5d75a75ad4ce604dd201151b01d098 |
| assets/mb-studio-sofa-couple.jpg (new) | none | e8451e18b8377e5df98a2eab61d46abb |
| assets/mb-studio-dog.jpg (new) | none | 61b84423d7285c33e76473300234cea8 |
| assets/mb-studio-cat.jpg (new) | none | c5a8a8280cc718034187e64b14cbdc04 |
| templates/product.liquid (A-2026W44-016, not part of this item) | a87bf50f20c4e21363b1ebc297cf44f1 | 845d653ed4879952c714e0c4ae2e7220 |

All other files in the copy match live. Full before and after code: `marketing/conversion/site-developer/theme-files/article-upgrade-2026-10-28/live/` (before) and `.../new/` (after), commit e1dfe50. Backup of the live file: `marketing/conversion/site-developer/backups/2026-10-28-article-upgrade/templates/article.liquid`.

Studio assets come from `marketing/social/planner/2026-W44/redo/` (S-20261101-1, S-20261027-1, S-20261029-1, S-20261030-1) and `2026-W43/redo/` (S-20261024-1) raw Studio exports, resized to 1200 px JPEG. No AI-drawn mosaics, no AI people shown as customers, no product lifestyle photos with people.

### Before and after: templates/article.liquid (unified diff)

```diff
--- marketing/conversion/site-developer/theme-files/article-upgrade-2026-10-28/live/templates/article.liquid	2026-10-28 07:37:45.621311912 +0000
+++ marketing/conversion/site-developer/theme-files/article-upgrade-2026-10-28/new/templates/article.liquid	2026-10-28 07:49:12.589822547 +0000
@@ -1,11 +1,73 @@
 {%- comment -%}
-  [old comment line, contains a dash character; exact text in live/templates/article.liquid line 2]
-  image, no BlogPosting structured data (what Google uses for article
-  rich results), and the raw article.content had no prose styling (same
-  gap .page-prose already solves on templates/page.liquid). Fixed all of
-  that here, since real blog content is about to start flowing through
-  this template.
+  Default blog article template (every article without a GemPages layout).
+  2026-10-28 upgrade (site-developer): large featured image, readable text
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
+    Fallback hero when the article has no featured image: a Memobrick Studio
+    example mosaic (theme asset), captioned as an example, never as a customer.
+  endcomment
+  assign mba_fallback = 'mb-studio-dog.jpg'
+  assign mba_fallback_alt = 'Example brick mosaic of a golden retriever, made of 1×1 bricks in the Memobrick Studio'
+  if mba_handle contains 'grandparent'
+    assign mba_fallback = 'mb-studio-grandma.jpg'
+    assign mba_fallback_alt = 'Example brick mosaic of a grandmother and granddaughter, made of 1×1 bricks in the Memobrick Studio'
+  elsif mba_handle contains 'wife' or mba_handle contains 'someone-who-has-everything'
+    assign mba_fallback = 'mb-studio-sofa-couple.jpg'
+    assign mba_fallback_alt = 'Example brick mosaic of a couple on a sofa, made of 1×1 bricks in the Memobrick Studio'
+  elsif mba_series == 'christmas'
+    assign mba_fallback = 'mb-studio-christmas-couple.jpg'
+    assign mba_fallback_alt = 'Example brick mosaic of a couple in holiday sweaters, made of 1×1 bricks in the Memobrick Studio'
+  endif
+
+  assign mba_hero_asset = ''
+  unless article.image
+    assign mba_hero_asset = mba_fallback
+  endunless
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
@@ -31,32 +93,128 @@
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
+      <img src="{{ article.image | image_url: width: 1400 }}"
+        srcset="{{ article.image | image_url: width: 700 }} 700w, {{ article.image | image_url: width: 1100 }} 1100w, {{ article.image | image_url: width: 1600 }} 1600w"
+        sizes="(max-width: 760px) 100vw, 1040px"
+        alt="{{ article.image.alt | default: article.title | escape }}" width="{{ article.image.width }}" height="{{ article.image.height }}"
+        loading="eager" fetchpriority="high">
+    {%- else -%}
+      <img src="{{ mba_fallback | asset_url }}" alt="{{ mba_fallback_alt | escape }}" width="1200" height="1200" loading="eager" fetchpriority="high">
+      <figcaption>Example design made in the Memobrick Studio</figcaption>
+    {%- endif -%}
+  </figure>
+
+  {%- render 'mb-article-trust', series: mba_series -%}
+
+  <div class="mba-body page-prose">
+    {{ mba_intro }}
+    {%- if mba_rest != blank -%}
+      {%- render 'mb-article-card', series: mba_series, place: 'intro', hero: mba_hero_asset -%}
+      {{ mba_rest }}
+    {%- endif -%}
   </div>
-  <p style="margin-top:40px"><a class="btn btn-red" href="/pages/editor">Start designing your MemoBrick</a></p>
+
+  {%- render 'mb-article-reviews', series: mba_series, rating: mba_rating, count: mba_count -%}
+  {%- render 'mb-article-card', series: mba_series, place: 'end', hero: mba_hero_asset -%}
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
+  .mba-hero{max-width:var(--mba-wide);margin-top:0;margin-bottom:22px;background:var(--card,#fff);border-radius:20px;overflow:hidden;box-shadow:0 18px 40px -26px rgba(21,23,27,.35);position:relative}
+  .mba-hero img{display:block;width:100%;height:auto;max-height:520px;object-fit:contain;aspect-ratio:2/1;background:var(--card,#fff)}
+  .mba-hero figcaption{position:absolute;left:12px;bottom:12px;background:rgba(255,255,255,.92);color:var(--ink-2);font-size:12px;padding:5px 10px;border-radius:999px}
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
+    .mba-hero img{aspect-ratio:1/1;max-height:none}
+    .mba-body{font-size:17px}
+    .mba-sticky{display:flex;align-items:center;gap:10px;position:fixed;left:0;right:76px;bottom:0;z-index:40;background:var(--card,#fff);border-top:1px solid var(--line);border-right:1px solid var(--line);border-top-right-radius:14px;padding:10px 12px;padding-bottom:calc(10px + env(safe-area-inset-bottom,0px));box-shadow:0 -6px 18px -10px rgba(21,23,27,.25)}
+    .mba-sticky[hidden]{display:none}
+    .mba-sticky-info{display:flex;flex-direction:column;line-height:1.2;font-size:12px;color:var(--ink-3);min-width:0}
+    .mba-sticky-info b{font-family:var(--display);font-weight:600;font-size:14px;color:var(--ink);white-space:nowrap}
+    .mba-sticky .btn{flex:1 1 auto;padding:11px 10px;font-size:14px;white-space:nowrap}
+  }
 </style>
```

## Tests (2026-10-28, preview of 189310075100 vs live, phone 390×844 Android UA and desktop 1440×900)
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

## Images for Sandra (body images; I did not edit any article body)
None of the 11 default-template articles has an image inside the text. Proposed, 1 to 2 each, all from existing Studio exports or Shopify product photos (no AI people, no AI-drawn mosaics):
| Article | Image 1 (where) | Image 2 (where) |
|---|---|---|
| personalized-christmas-photo-gifts | Featured image (it has none): `2026-W44/redo/S-20261101-1-studio-mosaic.png`, alt "Example brick mosaic of a couple in holiday sweaters, made in the Memobrick Studio" | Under "How a custom brick mosaic works": Shopify product photo of a labeled brick bag (e.g. Bag-of-Bricks-Shiny-Blue-05) |
| brick-mosaic-sizes | Featured image (it has none): `2026-W44/redo/S-20261030-1-studio-mosaic.png` (20×30 cat) | In the size table section: `S-20261031-1-studio-mosaic.png` (16×16) next to `S-20261029-1-studio-mosaic.png` (20×20), captioned with their sizes |
| gift-for-someone-who-has-everything | Featured image (it has none): `2026-W44/redo/S-20261029-1-studio-mosaic.png` (couple on sofa) | Under "How a custom brick mosaic works": brick bag product photo |
| last-minute-personalized-christmas-gifts | Under "Missed the date? Give the Art Gift Kit": the Gift Kit product photo `gift-kit-main-2026-10-26.jpg` (Shopify) | none |
| christmas-gifts-for-grandparents-from-grandkids | Under "Which photo to use": `2026-W43/redo/S-20261024-1-studio-mosaic.png` (dog, for "include the family pet") | none |
| photo-christmas-gift-for-wife | Under "Choosing a size for your wall": `2026-W44/redo/S-20261101-1-studio-mosaic.png` | none |
| brick-mosaic-calm-activity-autistic-kids-adults | Under "A clear map with no guessing": a second brick bag photo (e.g. Bag-of-Bricks-Aqua-Blue-07) | Optional: the Calm Build Plan tracker page as an image once the gift page exists |
| build-together-reader-sorter-builder | Under "The three roles": two or three brick bag photos side by side (sorter role) | none |
| sensory-friendly-building-tips | Under "Sort colors first": brick bag photos of 3 colors | none |
| special-interest-brick-mosaic | Under "Pets": `2026-W44/redo/S-20261031-1-studio-mosaic.png` is a dog in a Halloween hat, so prefer `2026-W43/redo/S-20261024-1-studio-mosaic.png` (dog) | none (no characters) |
| brick-mosaics-occupational-therapists-teachers | Under "What the kit involves": brick bag photo | none |
Also: the calm series featured images are small bag photos on white, which look small in the new large hero. A Studio pet mosaic (cat or dog above) as the featured image would fill it better.

## Expected effect
Blog articles are a growing share of organic entries in the Christmas season (11 default-template articles, 8 of them new today). Each article now offers a priced next step after the intro, at the end and on a sticky phone button, plus real reviews and the Dec 15 date. A realistic goal is article-to-editor clicks going from about zero (one plain end button) to a few percent of article sessions; a small number of extra orders per week until Dec 15. Measure: sessions landing on `/blogs/news/*` with a following `/pages/editor` or `/pages/free-preview` view (referred sessions only), and clicks on links with `data-mba-cta`.

## How to undo
Republish "Memobrick holiday gift boxes" (189177626844), or put back `templates/article.liquid` from the backup (md5 82e7b853b14989438f955aeea5f60881). The new snippets and assets do nothing on their own.

## Notes for the owner
- The theme still states "747 reviews averaging 4.8" in several places (home meta description, collection trust line, happy-customers page, product schema). Loox now reports 4.9 from 1,027. Worth updating in a separate change (seo-technical's A-2026W41-012 covers the hardcoded product rating).
- GemPages articles: `marketing/conversion/site-developer/gempages-article-upgrade.md` (uses these same snippets, so publish this first).
