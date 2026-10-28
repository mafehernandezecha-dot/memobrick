# outreach-link-builder 2026-10-28 (first live run)

## Summary

First run: baseline search of links and mentions (one earned story, the FOX 4 2022 gift guide and its FOX syndications; no third-party link to mymemobrick.com found).
Found 5 new opportunities on Christmas photo gifts, pet gifts and LEGO-style gifts for adults, two of them live HARO requests that close Oct 31.
Proposed the 5 pitches as one send batch, plus one sample kit offer. Nothing was sent.

## Done

- Ran in my own temporary worktree from origin/main (no checkout in the shared folder). Status set to working, committed and pushed.
- Loaded memobrick-run, memobrick-brand, memobrick-approvals. Read sales-goals.json, sales/latest.json (weak point: referred traffic down about half), offers calendar, product facts, talking points, article inventory, blog indexing check, contacts-log.md and every gift-guide-pr target and pitch file.
- Approvals: `check.py approvals --agent outreach-link-builder --today 2026-10-28` printed nothing. No sends, no drafts, no contacts-log rows.
- Links earned baseline: marketing/outreach/link-builder/links-earned.md (FOX 4 plus 5 syndicated FOX pages, a Vocal post, own Walmart/Loox/social profiles; link and follow status unknown because no page could be opened).
- Opportunities: marketing/outreach/link-builder/2026-10-28-opportunities.md (5 kept, 4 or 5 fit; 10 groups dropped with reasons).
- Pitches: marketing/outreach/link-builder/pitches/ (5 pitches, 131 to 157 words, real product photos only, all pass `check.py copy`), batch file 2026-10-28-batch.md with hashes, and the sample kit offer 2026-10-28-sample-kit-samantha-ramos.md.
- Prices checked live in Shopify (read-only): 16×16 $69.88, 20×20 $99.88.

## Proposed for approval

### P-outreach-link-builder-20261028-1
- Agent: outreach-link-builder
- Executor: outreach-link-builder
- Type: send
- Draft: marketing/outreach/link-builder/pitches/2026-10-28-batch.md
- Reason: Approves the 5 listed pitches unchanged; Bertha writes HARO paste sheets (2 HARO requests close Oct 31, so approve by Oct 30) and Gmail drafts or form paste sheets for the rest; Eden sends. Row 1 also needs item -2.
- Expires: 2026-11-07
- Status: pending

### P-outreach-link-builder-20261028-2
- Agent: outreach-link-builder
- Executor: outreach-link-builder
- Type: offer
- Draft: marketing/outreach/link-builder/pitches/2026-10-28-sample-kit-samantha-ramos.md
- Reason: One 16×16 sample kit ($69.88 retail) for Samantha Ramos's HARO family gift guide, which requires a full-size sample; Eden ships it if she replies. If rejected, pitch 1 is dropped.
- Expires: 2026-10-30
- Status: pending

## Blocked or unknown

- No outside page can be opened (DNS blocked), so link presence, anchor and follow/nofollow are unknown for every baseline row, and 3 of 5 contact routes are unverified (HGTV email, Little Bins, The Vet Desk).
- HARO replies need Eden's HARO (Featured) source account. Whether she has one is unknown.
- No backlink data source: Ahrefs failed to connect and Search Console is not reachable here. The Search Console Links report would give the real baseline.
- Search shows a second storefront, https://memobrickofficial.com/, with the same home and product pages, and the old photobrickusa.myshopify.com domain. For seo-technical: confirm both 301 to mymemobrick.com.
- The Luxe List (Merilee Kern) also runs paid TV sponsor segments. We answer only her no-cost editorial query; any fee is declined.

## Sales impact

Addresses the top weak point (referred sessions down about half vs last year) with links from pages real gift buyers read in November. The two HARO requests and HGTV are the fastest route to readers before Black Friday. One gift guide inclusion can bring a few orders in season; the links also help Google trust the Christmas hub and the new dog page. Expect any effect in mid to late November, not this week.

## Next run

- If approved: write the HARO paste sheets first (deadlines Oct 30 to 31), then the other drafts, and log every send in contacts-log.md.
- Check links-earned again; Eden's check of one FOX page decides whether to pitch an unlinked-mention request.
- Next topics: grandparent and couple gifts, Miami and Florida local features, Homegrown Learners (kept for later).

# Executor run: outreach-link-builder 2026-10-28 (approved items)

## Summary

Carried out A-2026W44-039 and A-2026W44-040 after Eden approved them in chat. Two Gmail drafts made (To left empty, no public address found) and one paste sheet with both HARO replies first, then The Vet Desk form. Nothing was sent; Eden sends.

## Done

- Checker (`check.py approvals --agent outreach-link-builder --today 2026-10-28`) printed A-2026W44-039 and A-2026W44-040.
- Hashes: batch file and sample kit file match commit 6404961; all five pitch files match the Hash column of the batch.
- Duplicate check: no existing Gmail drafts for these pitches; none of the five targets in contacts-log.md before today.
- Route search: The Vet Desk contact form https://thevetdesk.com/contact-us/ confirmed in search. No public email found for HGTV (Laura James) or Little Bins for Little Hands.
- A-2026W44-039, pitch 2 (HGTV dog lovers guide): Gmail draft r-2825876246743484738, To empty.
- A-2026W44-039, pitch 4 (Little Bins building gifts + guest post idea): Gmail draft r-3434391702086288504, To empty. Eden checks the "Hi Sarah" name on the site's About page before sending.
- A-2026W44-039, pitches 1, 3, 5 and A-2026W44-040: paste sheet marketing/outreach/link-builder/to-send/2026-10-28.md (Samantha Ramos HARO, deadline Oct 31 3:00 AM ET, with the approved sample kit line; Merilee Kern HARO, deadline Oct 31 12:00 AM ET, so by end of Oct 30; The Vet Desk form). Copy check passed.
- Five rows appended to marketing/shared/contacts-log.md (status prepared or drafted, not sent).

## Proposed for approval

None.

## Blocked or unknown

- HARO replies need Eden's HARO (Featured) source account; the reply box was not seen from this session.
- HGTV and Little Bins addresses not found. If Eden finds none, those drafts wait.
- Links-earned check and new opportunities were not part of this executor run.

## Sales impact

Gets the two time-limited HARO gift guide chances (closing Oct 31) ready to send today, which are the fastest of the five to reach gift buyers before Black Friday, against the referred-sessions weak point.

## Next run

- Ask Eden which pitches went out and update contacts-log.md to sent.
- If Samantha Ramos replies with a photo, Eden ships the 16×16 kit (A-2026W44-040).
- Resume the daily links-earned check and 5 new opportunities.
