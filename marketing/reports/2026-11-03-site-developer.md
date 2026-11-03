# site-developer 2026-11-03

## Summary
"Memobrick proof and cart fixes" (189322330332, A-2026W44-018 and -019) is still not published; MAIN is "Memobrick fixes" 189310075100 (updated 2026-10-28). Nothing to apply, nothing new built (20 of 20 themes).
Delete list for Eden below.

## Done
- Approvals: check.py printed 016, 032, 038 (live since 2026-10-28), and 018, 019 (built and tested in 189322330332, waiting for Eden to publish; the connector refuses live-theme writes).
- Task board: not published, so no live check and nothing new built.
- Theme list re-read from Shopify: no theme changed since yesterday.

### Delete list for Eden (one page)
Online Store > Themes > three dots > Delete. Never delete MAIN, the undo theme, the copy waiting to be published, or the AVADA one.

Keep:
| Theme | Id | Updated | Why |
|---|---|---|---|
| Memobrick fixes (MAIN) | 189310075100 | 2026-10-28 | live |
| Memobrick proof and cart fixes | 189322330332 | 2026-11-02 | waiting to be published (018, 019) |
| Memobrick holiday gift boxes | 189177626844 | 2026-10-28 | undo theme for the live one, keep a few days |
| AVADA Assets - DO NOT REMOVE | 137369288924 | 2023-09-15 | app assets |

Safe to delete (unpublished, none is the undo or a pending copy), oldest first:
| Theme | Id | Updated |
|---|---|---|
| Copy of Copy of Copy of xx | 128996770012 | 2026-09-22 |
| Copy of Copy of Copy of Copy of xx | 136537997532 | 2026-09-22 |
| Copy Motty | 151313219804 | 2026-09-22 |
| Copy of Copy of Copy of Copy of xx | 152914067676 | 2026-09-22 |
| Tinker | 158554980572 | 2026-09-22 |
| Copy of Tinker | 160846643420 | 2026-09-22 |
| memobrick-theme-mobile-bg-fix-22 | 166959874268 | 2026-09-22 |
| memobrick-theme-mobile-bg-fix-25 | 166960300252 | 2026-09-21 |
| memobrick-theme-mobile-bg-fix-26 | 166960398556 | 2026-09-22 |
| memobrick-theme-updated-33 | 167067975900 | 2026-09-23 |
| memobrick-theme-v23 | 188209397980 | 2026-10-03 |
| memobrick-theme-v22 | 188241772764 | 2026-10-04 |
| memobrick-theme-v26 | 188260253916 | 2026-10-05 |
| memobrick-theme-v25 | 188263596252 | 2026-10-13 |
| Memobrick kit page fix | 188955361500 | 2026-10-25 |
| Memobrick gift kit flow | 188683092188 | 2026-10-25 |

Suggested minimum: delete "Memobrick kit page fix", "Memobrick gift kit flow" and the two oldest "Copy of Copy..." themes to get 4 free slots. The older numbered v22 to v26 themes are earlier versions of the store theme; delete them last if you want a longer history.

## Proposed for approval
None

## Blocked or unknown
- Eden: publish "Memobrick proof and cart fixes" (189322330332). Undo: republish "Memobrick fixes" 189310075100. 018 expires 2026-11-15.
- Eden: delete themes from the list above so a slot is free for the Dec 15 bar (not yet approved).
- Wilson's 2026-11-03 audit says the design choice sheet and email gate did not appear in his walk this week. I did not retest this run; the gate fix (A-2026W42-009 A/B) is live, so this may be the A/B test arm or a changed state. Will recheck next run.
- Funnel follow-up for 016/032 needs referred-session data, not available.

## Sales impact
None today. 018 and 019 help only after publishing (draft orders are the largest lost-order cause). Freeing slots unblocks the Dec 15 bar before the December rush.

## Next run
Check whether 189322330332 is live and verify its 4 files by checksum, then phone and desktop live check; retest the upload flow for the missing design sheet and email gate.
