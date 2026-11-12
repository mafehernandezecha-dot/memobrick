# site-developer 2026-11-12

## Summary
Task board done: Eden's one-screen publish card is at `marketing/conversion/site-developer/publish-card-189322330332.md`, checked against a fresh phone and desktop test of the preview.
Checksum result: live 189310075100 has not changed since Oct 28, so nothing needs rebuilding. But copy 189322330332 was edited outside the team on Nov 2 and Nov 3 (bigger phone text; missing-brick promise cut from "as long as you own the kit" to "within 14 days of delivery"). Publishing ships those changes too, so Eden must confirm they are hers.

## Done
- Approvals: check.py lists A-2026W44-018 (expires 2026-11-15) and A-2026W44-019. Not applied: they are in unpublished copy 189322330332, the connector refuses live-theme writes, and I may not publish.
- Checksums (Shopify `theme { files }`, every file in the live theme by updatedAt, key files by md5 in both themes):
  - Live "Memobrick fixes" 189310075100: no file updated after the copy was made (08:37:08 UTC Oct 28) except `layout/theme.gem-layout-none.liquid` at 08:37:41 (GemPages regenerated it: 4 extra blank lines, no visible effect). **Nothing to rebuild.**
  - Copy 189322330332: my 018/019 files are as built (mb-fp-fallback 86b716ab..., free-proof-page 5cf45bec..., cart.liquid 3f918886...). **Changes not made by the team**:
    - Nov 2, 12:59 to 13:14 UTC: `layout/theme.liquid` and a new `assets/memobrick-type.css` (phone text at least 14 px, one font family dropped).
    - Nov 3, 19:40 UTC: missing-brick wording changed from "replacements free, for as long as you own the kit" to "within 14 days of delivery ... replacements free" in `assets/memobrick.js`, `sections/memobrick-site.liquid` (was c67bbe7a..., now fb445597...), `templates/product.liquid`, `templates/page.faqs.liquid`.
    - No agent commit at those times. My earlier reports (Nov 3 to 11) said the copy was unchanged since Nov 3. They did not catch these edits.
  - App embeds (Hulk, Vitals, SearchPie, Loox, Inbox, UpPromote, Google merchant widget) render in both preview and live. Only their order differs. `config/settings_data.json` is the same md5 in both.
- Preview smoke test of 189322330332 (tool `marketing/conversion/site-developer/tools/publish-card-check.mjs`, screenshots in `marketing/conversion/site-developer/2026-11-12-publish-card/`):
  - Phone 390x844: home shows "Create My MemoBrick" on the first screen, the free-proof fallback appears, the product page loads, and the cart with a no-photo 10x10 kit shows the 019 notice.
  - Desktop 1440x900: home, free proof (fallback shown) and product page pass.
  - No horizontal scroll anywhere. The only page errors come from third-party scripts (shop-js, TikTok pixel), not the theme.
  - Desktop cart was blocked by Shopify's bot check (429), so it was not retested today. It passed on Oct 28.
- Card written as the task asked: preview link, the 4 files and what each does, a 60-second phone check, the undo, "no free slot needed to publish", and 3 copies safe to delete later (189177626844, 188683092188, 188955361500). The warning about the outside edits is at the top.
- `working-theme.md` updated with today's checksums.

## Proposed for approval
None

## Blocked or unknown
- **Eden, before publishing 189322330332:** did you or your developer edit this copy on Nov 2 (phone text size) and Nov 3 (missing-brick promise now "within 14 days of delivery")? If yes, publish as the card says. If no, reply here: I will not change someone else's edits, but I can build 018/019 on a fresh copy of live once a slot is free. That would not happen before Nov 15. Who made these edits cannot be seen through the API.
- The 14-day missing-brick wording is a policy claim not in `product-facts.md` or `offers-calendar.md` Facts. If it is the real policy, it should be added there so emails (welcome email 3 still says "for as long as you own the kit") can match.
- Wilson's new draft `marketing/conversion/auditor/site-changes/cart-free-shipping-code-line.md` (free US shipping and codes line) is not built. It needs approval first. It would go into this same copy only after Eden confirms the outside edits.
- Funnel follow-up for applied fixes: nothing new is live since Oct 28, and no referred-session data was pulled this run.

## Sales impact
Today's work brings no orders by itself. It makes the one approved site click (018/019) safe and quick. 018 protects free-proof requests when the form fails to load (draft orders are the largest lost-order source). 019 stops photo-less kits before the December rush. Catching the outside edits keeps an unreviewed change to the missing-brick promise from going live without anyone noticing.

## Next run
Check whether 189322330332 is MAIN. If it is, verify its files by checksum and run the live phone and desktop check. If Eden says the outside edits are not hers, plan a clean rebuild of 018/019 once a slot is free.
