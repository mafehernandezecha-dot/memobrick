# site-developer 2026-11-02

## Summary
Built Eden's font fix ("yes, fix the fonts") in the unpublished copy "Memobrick proof and cart fixes" 189322330332: JetBrains Mono replaced by Inter, font weights trimmed, phone text at least 14px (body copy 15px).
Tested live vs preview on phone 390 and desktop 1366 (home, 20x20 kit page, cart, Creator): no JetBrains Mono left, no visible phone text under 14px except 3 icon badges, no layout breaks, desktop sizes unchanged.
Nothing published and the live theme was not touched; Eden publishes the copy.

## Done
- Special run for Eden's chat request (task board is from 2026-10-29; its Task 1 still waits on Eden publishing 189322330332, which has not happened: live is still "Memobrick fixes" 189310075100).
- Compared the font files of the copy with live by checksum before editing: theme.liquid, memobrick.css, memobrick.js identical, so nothing newer on live is reverted. GemPages layout theme.gem-layout-none.liquid differs and was left alone.
- Copy 189322330332: layout/theme.liquid (new font link and stylesheet tag) and new assets/memobrick-type.css. Checksums confirmed after upload. Files, before/after code, table, exceptions and undo: marketing/site/font-fix-2026-11-02/fix.md.
- Screenshots (before = live, after = preview) in marketing/site/font-fix-2026-11-02/screenshots/.
- No approved items with me as Executor were acted on in this run (special run limited to the font fix).

## Proposed for approval

### P-site-developer-20261102-1
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/site/font-fix-2026-11-02/fix.md
- Reason: Eden publishes theme copy 189322330332 herself (already built and tested), which replaces the code-style label font with Inter, drops one font file and makes phone labels, prices per brick, review dates and cart lines at least 14px; publishing also puts the approved A-2026W44-018 and -019 live; I then check the live files and phone and desktop views.
- Expires: 2026-11-09
- Status: pending

## Blocked or unknown
- Publishing is Eden's: the connector refuses live-theme writes and theme publishing. In Shopify admin: Online Store > Themes > "Memobrick proof and cart fixes" > Publish. Undo: publish "Memobrick fixes".
- Requested type was "site"; the approvals format only allows site-change, so it is filed as site-change.
- GemPages layouts (theme.gem-layout-none and theme.gempages.*) still request JetBrains Mono in their own font link; left alone because GemPages templates are out of scope. They were not tested.
- Two tiny weight changes from the trim: Inter 500 on three small buttons draws at 400, and the struck-through $159.00 in the phone product sticky bar (Fredoka 400) draws at 600. Say if either should be kept and I will add that weight back.
- Store is at 20 of 20 themes, so the existing copy was reused as asked.

## Sales impact
Addresses phone readability on the product page and cart (the weak point is too few orders from phone visits). Expected: easier reading of size, price per brick, delivery and cart details, and one fewer font download per page. The effect on orders is small and not measurable alone; I will compare phone add-to-cart rate (referred sessions) 7 days after publishing vs 7 days before.

## Next run
After Eden publishes: check live theme.liquid f32a7472... and memobrick-type.css d0a02db0..., plus A-018/-019 files, on phone and desktop; then the task board items.
