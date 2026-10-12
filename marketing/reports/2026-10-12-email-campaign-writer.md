# email-campaign-writer 2026-10-12

## Summary

The owner asked for design and creativity skills for the email agents. New skill `memobrick-email-design` (creative process, design system, layout blocks, image sources, copy craft, self-critique checklist); the preview tool now renders designed emails and writes Omnisend-ready HTML. The Oct 22 photo tips email was redesigned with it, so it needs approval again.

## Done

- Loaded memobrick-brand and the new memobrick-email-design skill.
- Redesigned `marketing/email/campaign-writer/2026-10-22-photo-tips.md`. Concept: "The moment the faces appear" (chosen from three; the tips become a promise about the moment someone at the table says "wait, that's us!"). New subject: "The photo your family will build together" (41 characters). Same audience, exclusions, send time (Thu Oct 22, 11:00 ET), facts, no offer, and UTM link `2026-10-photo-tips`. Button: "See your photo in bricks". Adds the optional free design proof (owner confirmed).
- Layout: hero photo with serif headline, the build moment story, four tips, photo-to-mosaic pair, navy feeling band, 3-step how it works, closing family image, one button, P.S.
- Images are real product photos from the live site, cropped by the store's image service; all four URLs returned 200 with curl. No AI images were needed. No one shown is presented as a customer.
- Preview: `2026-10-22-photo-tips-preview.png` (desktop) and `-preview-phone.png` (390px), reviewed and revised until the design checklist passed. Omnisend paste-in HTML: `2026-10-22-photo-tips-omnisend.html`.
- `python3 marketing/tools/check.py copy` passes on the draft.

## Proposed for approval

The draft changed after A-2026W41-004 was queued (still pending), so that item can no longer be acted on. Proposing it again; the coordinator can replace A-2026W41-004 with this one.

### P-email-campaign-writer-20261012-1
- Agent: email-campaign-writer
- Executor: email-campaign-writer
- Type: send
- Draft: marketing/email/campaign-writer/2026-10-22-photo-tips.md
- Reason: Redesigned no-offer photo tips email (real product photos, new subject) to the Warm segment; creates the campaign in Omnisend and schedules it for Thu Oct 22, 11:00 ET. Replaces A-2026W41-004.
- Expires: 2026-10-21
- Status: pending

## Blocked or unknown

- The upload page URL is still not recorded in the repo; the button points to the homepage with the UTM.

## Next run

- Tue 2026-10-13 6:00 ET: act on the approval if granted; design next week's campaign with the memobrick-email-design skill.
