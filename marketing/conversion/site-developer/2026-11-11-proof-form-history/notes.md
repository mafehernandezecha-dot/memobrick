# Free-proof form code: live theme vs the oldest copies (2026-11-11)

Read-only. Source: Shopify Admin GraphQL `themes` and `theme { files }` (filenames, checksums, bodies). No theme was written.

## Theme copies created before May 18 2026

| Theme | id | Created | Updated (theme) | Has free-proof template | Form ID in template |
|---|---|---|---|---|---|
| Copy of Copy of Copy of xx | 128996770012 | 2021-11-17 | 2026-09-22 | page.freepreview.liquid (2022-01-10) md5 4628e45e... | 2n1U3xnqHKzKiTv9oc59VA |
| Copy of Copy of Copy of Copy of xx | 136537997532 | 2022-10-20 | 2026-09-22 | same file, same md5 | 2n1U3xnqHKzKiTv9oc59VA |
| Copy Motty | 151313219804 | 2025-05-06 | 2026-09-22 | same file, same md5 | 2n1U3xnqHKzKiTv9oc59VA |
| Copy of Copy of Copy of Copy of xx | 152914067676 | 2025-07-03 | 2026-09-22 | same file, same md5 | 2n1U3xnqHKzKiTv9oc59VA |
| Tinker | 158554980572 | 2026-01-04 | 2026-09-22 | none (falls back to page.json: title, page body, a Shopify "Get in touch" contact form) | no Hulk div in theme |
| Copy of Tinker | 160846643420 | 2026-03-16 | 2026-09-22 | none (same page.json, same md5 e5630eaf...) | no Hulk div in theme |

No theme was created or had these files changed between Mar 17 and Sep 20 2026. The 2026-09-22 "updated" dates on all six are a bulk touch (all within 4 minutes, 16:10 to 16:14 UTC), not form edits: their free-proof template files keep their original dates.

## What differs

| | Old (Pipeline theme copies, 2021 to 2025) | Live "Memobrick fixes" 189310075100 |
|---|---|---|
| Template | `templates/page.freepreview.liquid`: page title + `page.content` + Shopkeeper/smk blocks + the Hulk div | `page.freepreview.liquid` (alias) and `page.free-preview.liquid` both render `snippets/free-proof-page.liquid`: hero, 3 steps, example, Hulk div in `#proofForm` |
| Hulk embed | `<div class="pxFormGenerator" id="2n1U3xnqHKzKiTv9oc59VA">` | same div, id from `settings.hulk_freeproof_form_id`, default `2n1U3xnqHKzKiTv9oc59VA` |
| Hulk script | not in theme.liquid; loaded by the app through `content_for_header` | same |
| Page body (`/pages/free-preview`, template suffix `freepreview`) | rendered by old template | now empty (page updated 2026-09-23); live template does not print it |

## Conclusion

The free-proof form is the same Hulk form (same ID, same embed method) in every copy from 2022 to today. No theme copy and no free-proof file is dated near May 18 2026. The only theme family without the Hulk form on that page is Tinker (Jan to Mar 2026); if Tinker had been live, the page would show a generic contact form, but Hulk submissions in May (32) and June (30) 2026 were normal (Wilson, audit 2026-10-26), so the form worked through May.

This supports Wilson's finding (audit-2026-11-11.md, section 1): the May 18 drop is in manually keyed "memobrick NxN" draft orders paid outside checkout, not in the free-proof form. Putting an old form back would not return those orders. Which theme was live in May 2026 is not visible through the API (Online Store > Themes shows Eden).
