# Site fix: the main button and a price on the first phone screen of the home page

Built and tested by: site-developer (Jenny), 2026-10-12
Executor: site-developer
Audit: marketing/conversion/auditor/audit-2026-10-12.md (problem 3)
Replaces Wilson's draft `marketing/conversion/auditor/site-changes/home-phone-cta-above-fold.md` (same idea, now built and tested; the CSS had to change to work with the phone hero layout). Queue only this one.

## Problem

The home page is the top landing page (5,010 of 10,630 sessions in 30 days) and most real visitors are on phones. On a 390×844 phone the first screen shows the promo strip, the headline and the top of the video. The **Create My MemoBrick** button started at y = 1,072 px (measured today in the preview), below the screen, and no price showed until the size cards far down the page. Phone visitors from social and search who land on `/` add to cart at 6.6% against 12.5% last year.

## What changes (one file: `sections/memobrick-site.liquid`)

On screens up to 900 px wide (phones and small tablets), a button and one line of help now sit right under the headline, above the video:

> **Create My MemoBrick**
> See your photo in bricks in seconds. Kits from $35.

- The button text is the same theme setting as the existing button (`hero_button_1`), and it links to the same `/pages/editor`.
- The price is read live from Shopify: the lowest price of the 10×10 kit (`custom-bricked-mosaic-10x10`, $35.00 in Shopify on 2026-10-12, "one face only"). If that product is ever unavailable, it falls back to the 16×16 kit (`1-big-board`, $69.88). If neither exists, the price part is left out.
- Desktop (901 px and up) is unchanged: the new block is hidden there, and the desktop button was already on the first screen.
- The existing button below the video stays, so nothing else on the page moves except down by the height of the new block.

The theme's phone hero is a flex column that orders its children with CSS `order` (the old button has `order: 5`, after the video). The new block uses `order: 2` so it sits right after the headline. The CSS sits in a small `<style>` block next to the markup, so `assets/memobrick.css` does not need to change.

### Exact diff against the live theme (memobrick-theme-v25, file checksum 5516bd7733c1c1bb254e448f26450ca2)

```diff
--- live sections/memobrick-site.liquid
+++ fix sections/memobrick-site.liquid
@@ -93,6 +93,23 @@
     <div class="wrap hero">
       <p class="eyebrow">{{ section.settings.hero_eyebrow }}</p>
       <h1>{{ section.settings.hero_heading }}</h1>
+      {%- liquid
+        assign mb_from_product = all_products['custom-bricked-mosaic-10x10']
+        if mb_from_product == empty or mb_from_product.available == false
+          assign mb_from_product = all_products['1-big-board']
+        endif
+      -%}
+      <div class="hero-cta hero-cta-top">
+        <a class="btn btn-red big" href="/pages/editor">{{ section.settings.hero_button_1 }}</a>
+        <p class="hero-cta-note">See your photo in bricks in seconds.{% if mb_from_product != empty %} Kits from {{ mb_from_product.price_min | money_without_trailing_zeros }}.{% endif %}</p>
+      </div>
+      <style>
+        .hero-cta-top{display:none}
+        @media (max-width:900px){
+          .wrap.hero .hero-cta-top{display:flex;flex-direction:column;align-items:stretch;order:2;gap:8px;margin:0}
+          .hero .hero-cta-top .hero-cta-note{margin:0;font-size:14px;line-height:1.4;color:var(--ink-2,#5E636C);text-align:center}
+        }
+      </style>
       <div class="rail" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
       <figure class="hero-img">
         <video id="heroVid" referrerpolicy="no-referrer" poster="{{ 'mb-hero-poster.jpg' | asset_url }}" data-poster-mobile="{{ 'mb-hero-short-poster.jpg' | asset_url }}" autoplay muted loop playsinline preload="metadata" aria-label="A customer's hands placing a brick while building their MemoBrick photo mosaic"></video>
```

Full new file: `marketing/conversion/site-developer/theme-files/home-phone-cta-above-fold/sections/memobrick-site.liquid` (md5 809e6c2ebf0eef90eeb81352bf190c94). It is the file now in the "Memobrick fixes" theme.

The same section also renders `/pages/editor`, where `#view-home` is hidden, so the editor page is not affected.

## Preview

https://mymemobrick.com/?preview_theme_id=188594847964

## What was tested (Playwright, Chromium, preview of theme 188594847964)

| Check | Before | After |
|---|---|---|
| Phone 390×844: top of first Create button | y = 1,072 (below the 844 px screen) | y = 403, price line at y = 467 to 487 |
| Phone 360×740: top of first Create button | not measured before | y = 394, price line ends at y = 478 |
| Phone: horizontal scroll | none (390 = 390) | none (390 = 390, 360 = 360) |
| Phone: tapping the new button opens the editor | | yes, `/pages/editor` in 2.4 to 2.7 s |
| Desktop 1440×900: hero | button at y = 558 | unchanged, button at y = 558, new block hidden |
| Desktop: button opens the editor | 2.0 s | 1.7 to 1.9 s |

Screenshots (`marketing/conversion/site-developer/2026-10-12-home-phone-cta-above-fold/`):

- `phone-before-home-first-screen.jpg` and `phone-after-home-first-screen.jpg`
- `phone360-after-home-first-screen.jpg`
- `phone-after-cta-opens-editor.jpg`
- `desktop-before-home-first-screen.jpg` and `desktop-after-home-first-screen.jpg` (identical, as intended)

The sandbox gets Shopify's cookie banner; the test declined it before taking screenshots. US visitors may not see that banner.

## Expected effect

About 830 real phone home visits a month now see the button and a starting price without scrolling. Wilson's estimate: about 5 to 15 more orders per 30 days. Measure: phone sessions landing on `/` with an add to cart, non-direct referrers. Baseline 55 of 828 (6.6%), 2026-09-12 to 2026-10-11. Check 14 and 28 days after release.

## How it will be applied, once approved

1. Save the live `sections/memobrick-site.liquid` to `marketing/conversion/site-developer/backups/<date>-home-phone-cta-above-fold/`.
2. Check the live file still has checksum 5516bd7733c1c1bb254e448f26450ca2. If not, rebuild on the new live file and propose again.
3. Write the new file to the live theme. The Shopify connector refuses writes to the live (MAIN) theme, so this step may need the owner: Shopify admin, Online Store, Themes, live theme "..." menu, Edit code, `sections/memobrick-site.liquid`, find the line `<h1>{{ section.settings.hero_heading }}</h1>` inside `view-home` (line 95), paste the 17 added lines from the diff right under it, Save.
4. Check the live home page on phone (390 and 360 wide) and desktop.

## How to undo

Delete the 17 added lines (from `{%- liquid` to `</style>`) under the hero headline and save, or paste back the backup file.
