# site-developer 2026-11-13

## Summary
Task board done: the rebuild plan for A-2026W44-018 and 019 is ready at `marketing/conversion/site-developer/fixes/rebuild-018-019-plan.md`. It runs in about 25 minutes the same day Eden answers "not mine", once she deletes one old theme (store is at 20 of 20). No copy was created yet.
History answer: Shopify does not record who edited theme files. The Nov 3 edits (4 files within one second) look like a tool or script upload, not hand edits.

## Done
- Approvals: check.py lists A-2026W44-018 (expires 2026-11-15) and 019 (expires 2026-11-30). Still not applied: they sit in unpublished copy 189322330332, which waits on Eden's answer about the outside edits. The connector refuses live-theme writes, and I may not publish.
- Checked live, read-only: MAIN is still "Memobrick fixes" 189310075100, unchanged since Oct 28. Its four target files have the same md5 as the repo "before" files. The four "after" files at commit 4c4f202 download from raw GitHub with the right md5, so they can be upserted as they are. Copy 189322330332 has not changed since Nov 3 19:40 UTC.
- Rebuild plan (task board): what Eden does first (delete "Memobrick kit page fix" 188955361500 or "Memobrick gift kit flow" 188683092188), the 4 files with before and after md5, the exact diffs (two one-line render lines, one new 31-line snippet, an 11-line cart check), 6 steps with minutes (about 25 minutes in total, test with `tools/test-018-019.mjs`), the undo, and the expiry timing.
- History question (task board): theme files carry only createdAt, updatedAt, size and md5, with no author. The store `events` log has no theme subject type and shows nothing about themes on Nov 2 and 3. Timing clues: Nov 2 edits ran 8:59 to 9:14 ET; the Nov 3 edits hit 4 files at 2:40:03 to 2:40:04 PM ET, which looks like a theme upload or CLI push. Eden can check Settings > Users (last logins) and each file's "Older versions" in the code editor.
- `working-theme.md` updated.

## Proposed for approval
None

## Blocked or unknown
- **Eden, one answer unblocks the free-proof fix:** were the Nov 2 (phone text size) and Nov 3 ("within 14 days of delivery" missing-brick wording) edits in 189322330332 yours or your developer's?
  - Yes: publish 189322330332 as the publish card says, before Nov 15.
  - No: delete "Memobrick kit page fix" 188955361500 in Online Store > Themes (this frees a slot) and reply. I will then build the clean copy the same run.
  - A-2026W44-018 lapses Nov 15. If publishing slips past that, I re-propose the same draft.
- Who made the edits cannot be found through the API (see Done).
- The 14-day missing-brick wording is still not in `product-facts.md`. If it is the real policy, it should be added there.
- A-2026W46-017 (Wilson's free-shipping and codes cart line) is pending and waits on the same answer.
- Funnel follow-up: nothing new has gone live since Oct 28, so there is nothing new to measure.

## Sales impact
No orders today by itself. With the plan ready, a "not mine" answer no longer costs days. The free-proof fallback (018) protects proof requests, the largest lost-order source, and it can be live before Black Friday week starts on Nov 16. 019 catches photo-less kits before payment.

## Next run
If Eden answered "yes": verify 189322330332 is MAIN by checksum and run the live phone and desktop check. If she answered "no" and a slot is free: run the rebuild plan. Otherwise exit quickly.
