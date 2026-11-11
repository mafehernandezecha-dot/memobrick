# site-developer 2026-11-11

## Summary
Task board done (read-only): the free-proof form is the same Hulk form (ID 2n1U3xnqHKzKiTv9oc59VA, same embed) in every theme copy from 2022 to the live theme; nothing changed near May 18 2026.
MAIN is still "Memobrick fixes" 189310075100; approved A-2026W44-018 and -019 wait on Eden publishing 189322330332. Still 20 of 20 themes, so nothing new built.

## Done
- Approvals: check.py lists A-2026W44-018 (expires 2026-11-15) and A-2026W44-019 (expires 2026-11-30). Both are in unpublished copy 189322330332 (unchanged since 2026-11-03). Not applied: the copy is not MAIN, I may not publish it, and the connector refuses live-theme writes.
- Task board (done): compared the free-proof page code in live 189310075100 with the six copies created before May 18 2026 (2021-11-17, 2022-10-20, 2025-05-06, 2025-07-03, Tinker 2026-01-04, Copy of Tinker 2026-03-16). Notes: `marketing/conversion/site-developer/2026-11-11-proof-form-history/notes.md`.
  - Old Pipeline copies: `page.freepreview.liquid` (unchanged since 2022, one md5) prints the page body plus the Hulk div with the same form ID as live.
  - Live: the same Hulk div inside the designed `free-proof-page` snippet. Hulk's script is loaded by the app in both, not by the theme.
  - Tinker copies have no free-proof template (a generic page with a Shopify contact form), but no theme file changed Mar 17 to Sep 20 2026, and Hulk submissions in May and June 2026 were normal.
  - This agrees with Wilson's audit-2026-11-11: the May 18 drop is manually keyed draft orders, not the form. Putting an old form back would not bring those orders back.

## Proposed for approval
None

## Blocked or unknown
- Publish of 189322330332 for A-2026W44-018 (lapses 2026-11-15) and -019: already in the queue and on Eden's card (task board, coordinator row 1). Undo: republish "Memobrick fixes" 189310075100.
- Which theme was live in May 2026 is not visible through the API (only Online Store > Themes shows it).
- Funnel follow-up for earlier fixes: no referred-session data in this run.

## Sales impact
Nothing today. The comparison rules out the form as the cause of the May 18 drop, so the team can stop looking at the site there and ask Eden where the manual orders came from (about 12 a week last fall). 018/019 help only once 189322330332 is published.

## Next run
Check whether 189322330332 is MAIN and verify its files by checksum. Build the desktop editor header fix once a theme slot is free.
