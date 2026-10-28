# Ready-made design pages: "your own photo" link (A/B test), 2026-10-28

Built and tested by: site-developer (Jenny). Source: Wilson's draft `conversion/auditor/site-changes/ready-made-own-photo-link.md` (test CA-20261028-01).
Status: built in a theme copy, waiting for approval. The connector refuses writes to the live theme, so the owner (Eden) publishes the copy after approval.

## Problem

Ready-made design pages (yin-yan 10x10, caterpillar 16x16, silvestre and the like) offer only "Buy now" straight to checkout. A visitor who likes the idea but wants their own photo has no path to the editor. 30 days: yin-yan pages 334 sessions and 0 add to cart; caterpillar 302 sessions, 13 add to cart.

## Preview

- Theme copy **"Memobrick fixes"**, id 189310075100 (unpublished, duplicated from live "Memobrick holiday gift boxes" 189177626844 on 2026-10-28). Only `templates/product.liquid` differs: live md5 a87bf50f20c4e21363b1ebc297cf44f1, copy 845d653ed4879952c714e0c4ae2e7220.
- Preview: https://mymemobrick.com/products/bricked-mosaic-portrait-10x10-yin-yan?preview_theme_id=189310075100 (the preview shows arm A or B at random; to force one, run in the browser console `localStorage.mb_ab_ownphoto="B"` and reload).
- Publish: Shopify admin > Online Store > Themes > "Memobrick fixes" > ... > Publish. Undo: publish "Memobrick holiday gift boxes" (189177626844) again. If anyone edits the live theme first, tell me and I rebuild the copy.

## Change (one file, one block)

In `templates/product.liquid`, inside the `{% else %}` branch for ready-made products, after the Buy now `</form>`:

```liquid
        </form>
        {%- comment -%} A/B test CA-20261028-01 ... {%- endcomment -%}
        <p class="pdp-note pdp-own-photo" id="pdpOwnPhoto" hidden><a href="/pages/editor?from=ready-made#editor">Want it with your own photo? Make yours in the editor &rarr;</a></p>
        <script>
        (function(){
          var el = document.getElementById("pdpOwnPhoto"); if (!el) return;
          var arm = null;
          try { arm = localStorage.getItem("mb_ab_ownphoto"); } catch (e) {}
          if (arm !== "A" && arm !== "B") {
            arm = Math.random() < 0.5 ? "A" : "B";
            try { localStorage.setItem("mb_ab_ownphoto", arm); } catch (e) {}
          }
          if (arm === "B") el.hidden = false;
        })();
        </script>
      {% endif %}
```

Before: the `</form>` was followed directly by `{% endif %}`. Nothing else changes. Arm A sees the page exactly as today; arm B sees one extra text link. The link carries `?from=ready-made`, so editor visits from these pages are countable by landing URL in Shopify analytics. No cart attribute, order field or checkout change.

## Tests (390x844 and 1440x900, preview)

| Check | Result |
|---|---|
| Yin-yan, arm A | link hidden, "Buy now" unchanged, no horizontal scroll |
| Yin-yan, arm B | link visible under the button, opens `/pages/editor?from=ready-made#editor` ("Memobrick Editor") on phone and desktop |
| Kit page 20x20 (both arms) | no link, "Design your own MemoBrick" unchanged |
| Page errors | same 2 on kit and ready-made pages (sandbox blocks third-party scripts); none new |

Screenshots: `conversion/site-developer/2026-10-28-ready-made-own-photo/` (`phone-after-armA.jpg`, `phone-after-armB.jpg`, `desktop-after-armA.jpg`, `desktop-after-armB.jpg`, `phone-after-editor.jpg`, `desktop-after-editor.jpg`). Before = arm A.

## Expected effect

Unknown and small; this is a test. About 640 sessions a month land on these pages, so arm B has roughly 320. Decision rule from Wilson's draft: adopt B if editor visits from these pages rise and "Buy now" clicks hold (not down more than 10%); under 300 sessions per arm is inconclusive, so run it about 4 weeks. Note that arm assignment lives in the visitor's browser, so Shopify cannot split orders by arm directly; compare editor landings with `from=ready-made` against Buy now starts.

## Undo

Publish "Memobrick holiday gift boxes" (189177626844), or delete the block above.
