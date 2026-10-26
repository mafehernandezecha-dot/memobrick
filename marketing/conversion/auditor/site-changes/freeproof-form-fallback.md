# Site change: free-proof form shows a fallback when the Hulk form does not load

Proposed by: conversion-auditor, 2026-10-26
Executor: site-developer
Audit: marketing/conversion/auditor/audit-2026-10-26.md (problem 2)

## Problem

The free-proof request form on `/pages/free-preview` and in the homepage "Let us design it" view
("Not sure yet? Get a free design proof first") is an empty `<div class="pxFormGenerator">` that
the Hulk Form Builder script fills in after the page loads. The script comes from
`cdn.shopify.com/extensions/.../form-builder-by-hulkapps-80/assets/form-builder-script.js`.

If that script does not run (ad or privacy blocker, slow phone network, the Hulk app embed
switched off after a theme change, or a Hulk outage), the visitor sees an empty white box with
no message and no other way to ask for a proof. In our test browser the script was blocked and
the form card stayed blank on phone and desktop: `marketing/conversion/auditor/2026-10-26/phone-proof-03-free-preview.jpg`,
`desktop-proof-03-free-preview.jpg`, `phone-proof-02-home-proof-view.jpg`.

Hulk has emailed "Action required: Setup app snippets in the new theme" after each theme publish
(Sep 12 to 15, Oct 20, 22 and 25), so every publish is a moment the form can silently break. The
app embed is on in the live theme today (seen in the live HTML), so this is a safety net, not a
fix for a confirmed outage.

## Change (two places, same snippet)

Files in a fresh copy of the live theme ("Memobrick holiday gift boxes", 189177626844):

1. The `/pages/free-preview` template. The page uses template suffix `freepreview`, so the file is
   `templates/page.freepreview.liquid` (check: Pages > Free Proof > Theme template).
2. `sections/memobrick-site.liquid`, inside `<section class="view" id="view-freeproof" ...>`.

**Before (both files, the Hulk embed):**

```liquid
      <div class="hulk-form-embed">
        <div style="margin:0 auto;" class="pxFormGenerator" id="{{ ... | escape }}"></div>
      </div>
```

(The `id` expression differs: `hulk_fp_id` on the page template, `settings.hulk_freeproof_form_id`
in the section. Keep each file's own expression.)

**After (both files):**

```liquid
      <div class="hulk-form-embed">
        <div style="margin:0 auto;" class="pxFormGenerator" id="{{ ... | escape }}"></div>
        <div class="fp-fallback" hidden style="text-align:center;padding:20px 8px">
          <p style="margin:0 0 12px;font-size:15px;color:var(--ink-2)">The form is taking a while to load. You can also email your photo to us and our designers will send your free proof.</p>
          <a class="btn btn-red big" href="mailto:support@memobrickofficial.com?subject=Free%20design%20proof%20request&amp;body=Please%20attach%20your%20photo%20and%20tell%20us%20the%20size%20you%20like.">Email my photo for a free proof</a>
        </div>
      </div>
      <script>
        (function () {
          var wrap = document.currentScript.previousElementSibling;
          if (!wrap) return;
          function check() {
            var form = wrap.querySelector('.pxFormGenerator');
            var fb = wrap.querySelector('.fp-fallback');
            if (!form || !fb) return;
            var ready = form.querySelector('input, textarea, select, iframe');
            fb.hidden = !!ready;
          }
          setTimeout(check, 8000);
          setTimeout(check, 15000);
        })();
      </script>
```

Notes for the builder:
- In the homepage section the view is hidden until the visitor taps the link. The 8 and 15 second
  checks still run; if the form is ready by then the fallback stays hidden. If you prefer, also run
  `check()` when the `freeproof` view is opened.
- The fallback never shows when the Hulk form has rendered any field, so real visitors with a
  working form see no change.

## Test (theme copy, phone 390x844 and desktop 1440x900)

1. Preview `/pages/free-preview` and the homepage "Not sure yet? Get a free design proof first" link: the Hulk form appears and the fallback stays hidden.
2. Block `cdn.shopify.com/extensions/*hulkapps*` in DevTools (Network request blocking) and reload: after 8 seconds the fallback text and the email button appear in the white card.
3. Do not submit the Hulk form with real data. If you submit to prove the form works, use an entry clearly marked TEST and tell the owner.

## Expected effect

Hulk counted 16 to 32 free-proof submissions a month this year (monthly Hulk emails). About one in
four to five turns into a paid proof-and-invoice order (11 invoiced draft orders Aug 31 to Oct 25).
The fallback only matters for visitors whose form fails to load; it protects those requests rather
than adding new ones. Small, but it costs nothing and removes a silent failure before the
holiday rush.

## Undo

Remove the `fp-fallback` div and the script from both files, or republish the previous theme.
