# Free-proof form fallback (A-2026W44-018), built 2026-10-28

Built and tested by: site-developer (Jenny). Approved item: A-2026W44-018 (Wilson's draft `marketing/conversion/auditor/site-changes/freeproof-form-fallback.md`).
Status: in theme copy **"Memobrick proof and cart fixes", id 189322330332** (unpublished), together with A-2026W44-019. Eden publishes it. The connector refuses live-theme writes.

## Why a new copy
"Memobrick fixes" (189310075100) became the live (MAIN) theme at 08:36 UTC on 2026-10-28, during this run, with 016, 032 rev b and 038. The connector cannot write to a live theme, so I duplicated the live theme into "Memobrick proof and cart fixes" at 08:37 UTC and built 018 and 019 there. Before writing, all three changed files in the copy matched live by checksum.

## Problem
The free-proof form (Hulk Form Builder) is an empty `pxFormGenerator` box that Hulk's script fills after load. When the script does not run (blocker, slow phone, Hulk app embed off after a theme publish, Hulk outage), visitors see a blank white card with no other way to ask for a proof. Draft orders (proof then invoice) are the largest lost-order cause (11 vs 71 last year).

## Change
| File | Live md5 (before) | Copy md5 (after) |
|---|---|---|
| snippets/mb-fp-fallback.liquid (new) | none | 86b716ab97761cfb62f1f4cc3cf67489 |
| snippets/free-proof-page.liquid (used by /pages/free-preview) | 79ad60f5c0847f67a7a05463a2d4eba1 | 5cf45bec111a17e1c086de062367fa68 |
| sections/memobrick-site.liquid (home "Let us design it" view) | f3cd4967b199889ec92a597f38be2450 | c67bbe7abbac00e09eb4a91520a69a22 |

Before and after files: `marketing/conversion/site-developer/theme-files/proof-cart-2026-10-28/before/` and `after/`.

Note: Wilson's draft named `templates/page.freepreview.liquid`. That template only renders `snippets/free-proof-page.liquid`, so the change is made in the snippet.

Before (both places):
```liquid
<div class="hulk-form-embed">
  <div style="margin:0 auto;" class="pxFormGenerator" id="..."></div>
</div>
```
After (both places):
```liquid
<div class="hulk-form-embed">
  <div style="margin:0 auto;" class="pxFormGenerator" id="..."></div>
  {%- render 'mb-fp-fallback' -%}
</div>
```
The new snippet holds Wilson's fallback (text "The form is taking a while to load. You can also email your photo to us and our designers will send your free proof." and a red button "Email my photo for a free proof", mailto the shop email `support@memobrickofficial.com`, checked in Shopify). Changes from Wilson's version: one shared snippet instead of two copies, and it re-checks every 3 seconds from 8 to 60 seconds, so it hides again if the Hulk form shows up late (the homepage view is hidden until tapped).

## Tests (preview of 189322330332, phone 390x844 and desktop 1440x900)
In this sandbox the Hulk script never loads (the same as for a visitor with a blocker), so the failure case is the real one here. The working-form case was simulated by putting a field into the Hulk box, as Hulk's script does.
- /pages/free-preview: fallback hidden at 4 s, shown at 11 s, button 293 px wide, no horizontal scroll. Phone and desktop.
- Form that loads at 3 s: fallback stays hidden at 12 s. Phone and desktop.
- Form that loads late (14 s): fallback shown at 10 s, hidden again by 14 s. Phone and desktop.
- Homepage "Not sure yet? Get a free design proof first": fallback shown in the view after 11 s. Phone and desktop.
- No page errors from theme code. Live (before) shows the blank card on the same pages.
- Not tested: the real Hulk form rendering, because it does not load in this sandbox. The fallback only checks for fields inside the Hulk box, so a working form hides it.

Screenshots (`marketing/conversion/site-developer/2026-10-28-proof-fallback-cart-notice/`): before-/after-phone-free-preview.jpg, before-/after-desktop-free-preview.jpg, before-/after-phone-home-proof-view.jpg, before-/after-desktop-home-proof-view.jpg.

Preview: https://mymemobrick.com/pages/free-preview?preview_theme_id=189322330332

## Expected effect
Protects free-proof requests from visitors whose form fails to load. It adds no new requests by itself. Hulk counts 16 to 32 submissions a month, and about one in four to five becomes a paid order.

## Undo
Publish "Memobrick fixes" (189310075100) again, or remove the two `render 'mb-fp-fallback'` lines.
