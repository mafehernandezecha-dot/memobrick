# Approval queue

Written by the marketing-coordinator only. To decide, edit each `Status:` line to `approved`, `rejected`, or `changes: <your note>`.

Updated 2026-10-28. Added A-2026W44-016 to 019 (site-developer, conversion-auditor; 018 and 019 were reported Oct 26 and missed earlier). Archived A-2026W44-013 (expired) and A-2026W43-006 (published Oct 26). Before that, 2026-10-27. Added A-2026W44-013 to 015 (email-campaign-writer). Not queued: the Checkout email 1 test from email-flow-optimizer (no P- ID or Status lines and two draft files on one line; asked to re-propose in the standard format). Archived 11 ads and offer items that their executors report done (A-2026W44-001 to 010 except 011, and 012). Before that, 2026-10-26. No new proposals (growth-analyst, seo-strategist and site-developer reports proposed none; the Oct 25 reports proposed none). Archived 4: A-2026W43-004 and A-2026W41-010 (expired Oct 25), A-2026W43-009 and 010 (done, live theme "Memobrick holiday gift boxes"). Moved A-2026W42-037 to Time-sensitive (expires Oct 31). Weekly Sales Plan: `marketing/coordination/coordinator/sales-plan-2026-10-26.md`. Earlier on 2026-10-25: archived A-2026W42-033, 030, 031 and 032 (expired). Earlier, 2026-10-23. Added A-2026W43-006 (brick mosaic size guide article) and A-2026W43-007 (W45 social batch, Nov 2 to 8). Not queued: the one-offer-per-order cart line (you said "leave it" on Oct 21) and the Art Gift Kit flow (it adds a ship-to form for gift kit orders, which touches fulfillment). Archived 4: A-2026W43-001 (done, live Oct 23), A-2026W42-038, 014 and 023 (expired). Earlier: 2026-10-21: added A-2026W43-001 (kit page buttons fix, urgent), 002 (duplicate of 001, flagged) and 003 (Starry Night and Mona Lisa republish, waits on you). Archived 11 items: 040, 041, 042, 043, 044 and 039 (done), 045 (replaced by 046), 046 (live), 007 (renewed as 040), 018 and 019 (expired Oct 20). Before that, 2026-10-19: no new proposals (growth-analyst, seo-strategist and site-developer reports proposed none); archived A-2026W41-003 (expired Oct 18, never posted). Previously, 2026-10-18: no new proposals; moved items expiring by Oct 25 to Time-sensitive. Earlier, 2026-10-16: Added A-2026W42-038 (ads-analyst: paused photo-to-mosaic Meta ad from the 1:1 video, replaces 006) and A-2026W42-039 (seo-technical: gift-for-someone-who-has-everything article). Archived 8 items: 020, 026, 027 (done on Google by ads-analyst), W41-013, W41-015, W41-016 (done by seo-technical), 006 (replaced by 038) and W41-002 (expired Oct 15). Earlier: 2026-10-15 added A-2026W42-037 and 2026-10-14 added 024 to 035. Items with a `- Flag:` line need the check it names before you approve. Details in `marketing/coordination/coordinator/overlaps-2026-10-16.md`.

## Needs your attention

No Status line needs a fix.

Do first (as of 2026-10-28):

- Reject A-2026W43-002 (moot, kit page fix 001 is live; it expires today). Site-developer asks the same.
- Approve or send back A-2026W44-014 (Black Friday email still sells 20%; your approved offer is 25%). It is the biggest send of the year.
- Reconnect Buffer in claude.ai connector settings (the publisher has had no scheduling tool for days). The W44 batch (A-2026W42-037, approved) cannot go out without it; also check the Mac social-post job.
- Test the free-proof form (/pages/free-preview) on a phone: draft orders are 11 vs 71 last year and are the largest lost-order cause. A-2026W44-018 adds a fallback if the form fails to load.
- A-2026W44-016 and 017 are the same "your own photo" link; approve 016 (built and tested) and reject 017. After approving 016, publish theme copy "Memobrick fixes".
- A-2026W43-007 (W45 posts) is `changes: send preview picture`: the social planner has to answer it; nothing posts until it is re-proposed.
- Reconnect the Facebook connector, and run the Mac data pull (`marketing/data/latest.md` still says never).
- Decide the Google business name swap (remove "Memobrick", add "Memobrick Inc"), see A-2026W44-011.
- YouTube Shorts OK for the W43 and W44 reels is still open (see Missing owner inputs).

## Time-sensitive

(Items expiring within 7 days, highest expected sales impact first.)

## A-2026W42-037
- Agent: social-planner
- Executor: social-publisher
- Type: publish
- Draft: marketing/social/planner/2026-W44/week.md
- Commit: 2e08742
- Reason: Approving it approves all 7 W44 posts (Oct 26 to Nov 1, each on Instagram, Facebook, TikTok and Pinterest) for the social publisher to prepare and post; send single posts back with `changes: <post-id> <note>` and the rest stay approved. Needed by Monday's approval round so the Oct 26 reel can post.
- Expires: 2026-10-31
- Status: approved
- From: P-social-planner-20261015-1
- Note: Uses EARLYHOLIDAY20 (active, no end date set; if it ends before Oct 26 to Nov 1 send the Oct 26, 29 and Nov 1 posts back) and Order by December 15 (Facts table). The Oct 27 post links to /pages/free-preview, whose proof form could not be tested; please submit a test proof before Oct 27. The finished woman-and-cat portrait appears briefly in the Oct 28 reel (same consent question as A-2026W42-033). Thursday prices must be re-checked on Oct 29.
- Note (2026-10-28): Eden approved Hugo's Studio redo in chat ("Yes approved hugos work"): the bricked images of S-20261027-1 to S-20261101-1 are replaced by the Studio files in `marketing/social/planner/2026-W44/redo/` (README there says which file replaces which asset); captions unchanged. Dates: Oct 28 to Nov 1 as planned, S-20261027-1 free-proof moves to Mon Nov 9 19:00 ET. The 6 posts sit as Buffer drafts until the publisher swaps the assets and reschedules.

## A-2026W44-011
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-media-fixes-2026-10-26.md
- Commit: f163066
- Reason: Custom photo kits published to the Google & YouTube channel (done), business name appeal, remove the dead 26% promotion, pause 2 PMax asset groups with 0 sales in 90 days, swap 4 losing PMax headlines.
- Expires: 2026-11-02
- Status: approved
- From: chat
- Note: Eden approved 1-5 in chat on 2026-10-26 ("ok"). Item 1 done the same day; 2-5 through a Claude in Chrome prompt.
- Note (2026-10-27): done except the Google business name: Google allows one name, so "Memobrick Inc" can be added only after removing the disapproved "Memobrick". Waits on you; stays open until you decide.

## A-2026W44-016
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/ready-made-own-photo-link.md
- Commit: 530f23d
- Reason: Adds a text link "Want it with your own photo?" under Buy now on ready-made design pages for half of visitors (A/B test CA-20261028-01); built and tested in theme copy "Memobrick fixes" (189310075100). Ready-made pages have about 640 sessions a month and no path to the editor.
- Expires: 2026-11-04
- Status: approved
- From: P-site-developer-20261028-1
- Note (2026-10-28): Eden approved in chat: "016 and 032 approved". Eden publishes theme copy "Memobrick fixes" once the picture and homepage fixes are in.
- Note: The connector cannot write to the live theme, so you publish the copy after approving. Approve this built version rather than A-2026W44-017. Theme count is 20 of 20; delete old copies so new ones can be made.

## A-2026W42-029
- Agent: outreach-creator-scout
- Executor: outreach-creator-scout
- Type: offer
- Draft: marketing/outreach/creator-scout/floor-2026-10-14.md
- Commit: 081512d
- Reason: Sets the engagement floor to 2% real engagement instead of 10%, so real creators like Niki Loheit (2.7%, LEGO Masters S5) can be proposed for approval with a message on the next run. Fakes stay out on the other checks.
- Expires: 2026-10-28
- Status: approved
- From: P-outreach-creator-scout-20261014-2
- Note: At 10% no applicant passes, so no creator can be proposed. Separate owner decision in her report: reactivate Evan Rubin (24 orders, $1,787, paused since 2023).

## A-2026W42-034
- Agent: social-planner
- Executor: social-planner
- Type: offer
- Draft: marketing/social/planner/follower-goals.md
- Commit: 44b5d76
- Reason: Weekly follower goals as growth rates (IG +1.5%, FB +0.5%, TikTok +3%, Pinterest +2%) because current counts are missing; nothing automatic happens, and the planner then reports against them weekly.
- Expires: 2026-10-29
- Status: approved
- From: P-social-planner-20261014-2

## A-2026W42-028
- Agent: outreach-creator-scout
- Executor: outreach-creator-scout
- Type: send
- Draft: marketing/outreach/creator-scout/batches/2026-10-14-batch.md
- Commit: 081512d
- Reason: On the next Mac run, declines 42 fake, coupon or off-brand applicants silently in Collabs (no message, no reason); approves nobody and sends no messages. Clears the worst of the 452-application queue.
- Expires: 2026-10-28
- Status: approved
- From: P-outreach-creator-scout-20261014-1
- Note: Housekeeping; no direct orders expected. It shows whether her evidence standard is accepted before larger decline batches.

## A-2026W42-035
- Agent: outreach-creator-scout
- Executor: outreach-creator-scout
- Type: send
- Draft: marketing/outreach/creator-scout/batches/2026-10-14-batch-2.md
- Commit: 91545c8
- Reason: On the next Mac run, declines 47 more coupon, deal, review and empty-account applicants silently in Collabs (no message, no reason); approves nobody and sends no messages. With batch 1 this clears every applicant who has a Facebook, TikTok or YouTube account, leaving only the coupon-domain Instagram farm.
- Expires: 2026-10-28
- Status: approved
- From: P-outreach-creator-scout-20261014-3
- Note: Checked: no applicant is also in batch 1 (A-2026W42-028). Housekeeping, no orders expected.

## A-2026W43-002
- Agent: conversion-auditor
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/product-page-creator-check-title.md
- Commit: 04e6a7e
- Reason: Same kit page bug as A-2026W43-001, found by the conversion auditor (the creator check tests the product title "Custom Bricked Mosaic", which the Oct 20 rewrite removed). Its draft also offers a fallback: restore the old titles on the 22 kits with seo-technical's restore.py.
- Expires: 2026-10-28
- Status: approved
- From: P-conversion-auditor-20261021-1
- Flag: Duplicate of A-2026W43-001, which is the built and tested version (site-developer asks to approve that one and let this one close). 001 went live Oct 23, so this one is moot: reject it.

## Open

(Highest expected sales impact first.)

## A-2026W44-020
- Agent: seo-blog-writer
- Executor: seo-blog-writer
- Type: publish
- Draft: marketing/seo/writer/drafts/calm-building-series.md
- Commit: d30ba59
- Reason: Publishes 5 articles for a new audience (autistic kids and adults, families, OTs, special-education teachers): hub "Brick Mosaics: A Calm Activity for Autistic Kids and Adults", plus build-together roles, sensory-friendly tips, special interests, and an OT/teacher guide. No health claims, no quotes, small-parts note, FAQ schema. Default article template (not GemPages).
- Expires: 2026-11-30
- Status: approved
- From: P-seo-blog-writer-20261028-1
- Note (2026-10-28): Eden approved in chat: "approve 020 and 021".
- Note: Eden asked in chat on 2026-10-28 to publish these today ("i want them to publish today"); set Status to approved when she confirms the final drafts.

## A-2026W44-021
- Agent: seo-strategist
- Executor: seo-blog-writer
- Type: publish
- Draft: marketing/seo/strategist/publish-batches/2026-10-28-christmas-gap-articles.md
- Commit: a03477d
- Reason: Publishes 3 Christmas articles on searches no existing post targets: last-minute personalized Christmas gifts (honest Dec 15 date, Gift Kit after), Christmas gifts for grandparents from grandkids, photo Christmas gift for wife. All checks passed 2026-10-28 (links, prices, FAQ schema, Studio images, "As seen on FOX").
- Expires: 2026-12-10
- Status: approved
- From: P-seo-strategist-20261028-1
- Note (2026-10-28): Eden approved in chat: "publish christmas 3".
- Note: If seo-technical's Christmas consolidation is approved, the last-minute article's link to "dont-wait-until-december" moves to the kept hub.

## A-2026W44-022
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/consolidate-christmas-articles.md
- Commit: be1a05b
- Reason: Merges 10 competing Christmas posts into 2 hubs (personalized-christmas-photo-gifts and a-holiday-activity-everyone-can-actually-join): hides 8 posts (kept, not deleted) with 301s, repoints 11 old redirects that go to the homepage, fixes hub links. Visible GemPages edits are on Eden's change list.
- Expires: 2026-11-04
- Status: approved
- From: P-seo-technical-20261028-1
- Note (2026-10-28): Eden approved in chat: "approve 022 to 026".

## A-2026W44-023
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/clean-article-handles.md
- Commit: be1a05b
- Reason: Clean handles with 301s for 14 articles (baby-carrier-..., test-blog-post-..., copy-of-..., duplicate-from-..., random suffixes); grandparents waits until after Jan 4, Thanksgiving until after Nov 27.
- Expires: 2026-11-11
- Status: approved
- From: P-seo-technical-20261028-2
- Note (2026-10-28): Eden approved in chat: "approve 022 to 026".

## A-2026W44-024
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/retitle-fox-article.md
- Commit: be1a05b
- Reason: Retitles the 2024 Fox article to "As Seen on FOX: Memobrick in a Holiday Gift Guide" (handle memobrick-as-seen-on-fox, 301), fixes its SEO fields, removes "Fox News" from two other articles.
- Expires: 2026-11-04
- Status: approved
- From: P-seo-technical-20261028-3
- Note (2026-10-28): Eden approved in chat: "approve 022 to 026".

## A-2026W44-025
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/disable-searchpie-meta-tags.md
- Commit: be1a05b
- Reason: Turns off SearchPie's meta tags: every page now shows two titles and two descriptions (36 articles show only "  Memobrick").
- Expires: 2026-11-11
- Status: approved
- From: P-seo-technical-20261028-4
- Note (2026-10-28): Eden approved in chat: "approve 022 to 026".

## A-2026W44-026
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/chrome-tasks/2026-10-28-search-console-indexing.md
- Commit: be1a05b
- Reason: Search Console task for Eden's Chrome: resubmit sitemap, read Pages report, request indexing (up to 10 URLs a day); part B after 022 to 024.
- Expires: 2026-11-04
- Status: approved
- From: P-seo-technical-20261028-5
- Note (2026-10-28): Eden approved in chat: "approve 022 to 026".

## A-2026W44-027
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/calm-build-gift.md
- Commit: 28d31cd
- Reason: Publishes the "Calm Build Gift" page (/pages/calm-build-gift): 16×16 kit $69.88, optional frame $49, free Calm Build Plan PDF, build-together roles, link to the 16×16 editor and free proof, small-parts note, FAQ (not a therapy). Built unpublished and tested on phone and desktop. Undo: unpublish.
- Expires: 2026-11-04
- Status: approved
- From: P-site-developer-20261028-2
- Note (2026-10-28): Eden approved in chat: "approve 027, 033, 034, 035, 036, 039, 040".

## A-2026W44-028
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/batches/2026-10-28-autism-outreach.md
- Commit: 7255305
- Reason: 10 pitches to autistic creators, autistic parents, OTs, special-education teachers and sensory-friendly gift guides (Growing Hands-On Kids, NeuroDivergent Rebel, Life Skills Advocate, Neurodiverging, Miss Jaime OT, Autistic Mama, Not An Autism Mom, TN Disability Pathfinder, Autism Classroom Resources, TPGA). Contact routes are from search results: confirm each page before sending. No health claims.
- Expires: 2026-11-07
- Status: approved
- From: P-outreach-gift-guide-pr-20261028-1
- Note (2026-10-28): Eden approved in chat: "approve pitches and both kits".

## A-2026W44-029
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: offer
- Draft: marketing/outreach/gift-guide-pr/kit-offers/growing-hands-on-kids-kit.md
- Commit: 7255305
- Reason: One free 16×16 kit ($69.88) for Heather Greutman (Growing Hands-On Kids, OT, sensory gifts guide), for an honest view, no obligation to post.
- Expires: 2026-11-07
- Status: approved
- From: P-outreach-gift-guide-pr-20261028-2
- Note (2026-10-28): Eden approved in chat: "approve pitches and both kits".

## A-2026W44-030
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: offer
- Draft: marketing/outreach/gift-guide-pr/kit-offers/neurodivergent-rebel-kit.md
- Commit: 7255305
- Reason: One free 16×16 kit ($69.88) for Lyric Rivera (NeuroDivergent Rebel, autistic self-advocate), for honest feedback, no obligation to post.
- Expires: 2026-11-07
- Status: approved
- From: P-outreach-gift-guide-pr-20261028-3
- Note (2026-10-28): Eden approved in chat: "approve pitches and both kits".

## A-2026W44-031
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/meta-christmas-boost-2026-10-28.md
- Commit: 15c372a
- Reason: Christmas ad set spent $120 with 0 sales (Dog v2 $82, 51 landing views). Copies the 3 proven ALWAYON winners into Christmas, adds a $10/day come-back ad set (30-day visitors and carts), turns on Instagram placements, adds deadline/FOX/free-proof lines, checks purchase tracking; Dog v2 moves to a dog page once it is live.
- Expires: 2026-11-04
- Status: approved
- From: chat
- Note (2026-10-28): Eden approved in chat: "ok approve" (to "have Daniel prepare items 2 to 6 ... and Jenny build the dog landing page").

## A-2026W44-032
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/article-template-upgrade.md
- Commit: e82bb72
- Reason: New default article template (all non-GemPages articles, incl. today's 8): large image, "Make yours" card with live price, real Loox star summary and photo reviews (from Loox data), trust strip (As seen on FOX, free proof, Dec 15, Gift Kit), phone sticky button clear of the chat bubble, related articles. Built in theme copy "Memobrick fixes" (189310075100); preview https://mymemobrick.com/blogs/news/last-minute-personalized-christmas-gifts?preview_theme_id=189310075100
- Expires: 2026-11-04
- Status: approved
- From: P-site-developer-20261028-2
- Note (2026-10-28, revision b): real product photos in the card and fallback, fixed 3:2 / 4:3 hero; covered by Eden's "approve photos" after seeing the before/after sheet.
- Note (2026-10-28): Eden approved in chat: "016 and 032 approved". Eden publishes theme copy "Memobrick fixes" once the picture and homepage fixes are in.
- Note: Same theme copy as A-2026W44-016 (your-own-photo link); publishing it ships both, the draft says how to split. Eden publishes the theme copy after approving.

## A-2026W44-033
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/batches/2026-10-28-autism-outreach-email.md
- Commit: 9a2260b
- Reason: 10 more pitches, each with a public business email (Gmail drafts, Eden sends): The Childhood Collective (ADHD gift guide, send first), The Autism Dad, The Mom Kind, Raising Lifelong Learners, Calm the Chaos, Black Girl Lost Keys, BrickNerd, Parenting Special Needs Magazine, Room Escape Artist, Mrs. D's Corner. Commission only, no kits, no health claims.
- Expires: 2026-11-07
- Status: approved
- From: P-outreach-gift-guide-pr-20261028-4
- Note (2026-10-28): Eden approved in chat: "approve 027, 033, 034, 035, 036, 039, 040".

## A-2026W44-034
- Agent: outreach-creator-scout
- Executor: outreach-creator-scout
- Type: send
- Draft: marketing/outreach/creator-scout/creators/2026-10-28-nikibuildsbricks.md
- Commit: 97ac25a
- Reason: Approves Niki Loheit (LEGO Masters S5, IG 1,903, 2.7% real engagement, already follows Memobrick) into the 10%/10% tier and sends her welcome message as written, on the next Mac Collabs run.
- Expires: 2026-11-11
- Status: approved
- From: P-outreach-creator-scout-20261028-2
- Note (2026-10-28): Eden approved in chat: "approve 027, 033, 034, 035, 036, 039, 040".

## A-2026W44-035
- Agent: outreach-creator-scout
- Executor: outreach-creator-scout
- Type: offer
- Draft: marketing/outreach/creator-scout/kits/2026-10-28-nikibuildsbricks.md
- Commit: 97ac25a
- Reason: Offers Niki one sample kit to build on camera (welcome message then includes the kit line); Eden ships after she replies.
- Expires: 2026-11-11
- Status: approved
- From: P-outreach-creator-scout-20261028-3
- Note (2026-10-28): Eden approved in chat: "approve 027, 033, 034, 035, 036, 039, 040".

## A-2026W44-036
- Agent: outreach-creator-scout
- Executor: outreach-creator-scout
- Type: send
- Draft: marketing/outreach/creator-scout/batches/2026-10-28-batch.md
- Commit: 97ac25a
- Reason: Declines 4 more fake or coupon applicants silently (Duc Chung 2026-03-31, Baldo Vivian, Huy Hoang, Sonia England); no messages.
- Expires: 2026-11-11
- Status: approved
- From: P-outreach-creator-scout-20261028-1
- Note (2026-10-28): Eden approved in chat: "approve 027, 033, 034, 035, 036, 039, 040".

## A-2026W44-037
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/dog-landing-page.md
- Commit: d92d379
- Reason: Publishes "Your Dog in Bricks" (/pages/dog-brick-mosaic) for the Meta Dog ads (51 landing views, 0 sales on a general page): real dog mosaic photo, "Upload your dog's photo" (20×20 editor), 3 steps, size cards 16×16/20×20/30×30, 4 real Loox dog reviews, FOX / free proof / Dec 15 / EARLYHOLIDAY20 (hides after Nov 22), Gift Kit, FAQ. Preview: https://admin.shopify.com/store/photobrickusa/pages/167410106588 . After it is live, Daniel points the Dog ads to it.
- Expires: 2026-11-04
- Status: approved
- From: P-site-developer-20261028-3
- Note (2026-10-28): Eden approved in chat: "approve 037". Published by the main session the same day (pageUpdate isPublished true); live at /pages/dog-brick-mosaic.

## A-2026W44-038
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/fox-wording-and-live-rating.md
- Commit: 838f602
- Reason: In theme copy "Memobrick fixes": every "Fox News" on home, editor and product pages becomes "As seen on FOX"; the hardcoded "4.8 / 747" rating becomes Loox's live store rating (4.9 from 1,027); A-2026W41-012's hardcoded product aggregateRating removed. Goes live when Eden publishes the copy.
- Expires: 2026-11-04
- Status: approved
- From: P-site-developer-20261028-4
- Note (2026-10-28): Eden approved in chat: "yes" (to fixing "As seen on Fox News" on the home page) and "publish this ... becomes your live Loox rating".

## A-2026W44-039
- Agent: outreach-link-builder
- Executor: outreach-link-builder
- Type: send
- Draft: marketing/outreach/link-builder/pitches/2026-10-28-batch.md
- Commit: 6404961
- Reason: Bertha's first 5 link pitches: HARO family gift guide (Samantha Ramos, deadline Oct 31 3am ET, needs the kit in 040), HGTV best gifts for dog lovers, HARO Luxe List free editorial (deadline Oct 31), Little Bins for Little Hands LEGO gifts + guest post idea, The Vet Desk cat lover gifts.
- Expires: 2026-11-07
- Status: approved
- From: P-outreach-link-builder-20261028-1
- Note (2026-10-28): Eden approved in chat: "approve 027, 033, 034, 035, 036, 039, 040".
- Note: HARO replies need Eden's HARO (Featured) source account. Approve by Oct 30.

## A-2026W44-040
- Agent: outreach-link-builder
- Executor: outreach-link-builder
- Type: offer
- Draft: marketing/outreach/link-builder/pitches/2026-10-28-sample-kit-samantha-ramos.md
- Commit: 6404961
- Reason: One 16×16 sample kit ($69.88) for Samantha Ramos's family holiday gift guide (HARO requires a full-size sample). If rejected, her pitch is dropped.
- Expires: 2026-10-30
- Status: approved
- From: P-outreach-link-builder-20261028-2
- Note (2026-10-28): Eden approved in chat: "approve 027, 033, 034, 035, 036, 039, 040".

## A-2026W44-041
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/article-photo-swap.md
- Commit: e82bb72
- Reason: Replaces the featured images of 11 default-template articles with sharp real product photos (framed couple on a wall, woman with her portrait, framed pets, labeled color bags...). Old URLs kept in the draft for undo.
- Expires: 2026-11-04
- Status: approved
- From: P-site-developer-20261028-4 (photo swap)
- Note (2026-10-28): Eden approved in chat after seeing the before/after sheet: "approve photos".

## A-2026W44-042
- Agent: social-community-manager
- Executor: social-community-manager
- Type: publish
- Draft: marketing/social/community/2026-10-28-posts.md
- Commit: 7ebfa16
- Reason: Patricia's first 5 Facebook group posts (Special Needs Community and East Bay Autism Parents with the free Calm Build Plan and calm hub article; Dog Lover with the dog page; Naples Moms Marketplace holiday post; KC adult LEGO fans mosaic question) plus 3 gift-question answers. Eden posts by hand or via the Claude in Chrome prompt, only where each group's rules allow.
- Expires: 2026-11-04
- Status: changes: replaced by A-2026W44-044 (Eden: posts should not sell)
- From: P-social-community-manager-20261028-1

## A-2026W44-043
- Agent: social-community-manager
- Executor: social-community-manager
- Type: publish
- Draft: marketing/social/community/own-group.md
- Commit: 7ebfa16
- Reason: Plan for Memobrick's own Facebook group "Memobrick Builders": 7 rules, pinned welcome post, 14 daily prompts, monthly "Show your mosaic" day.
- Expires: 2026-11-15
- Status: approved
- From: P-social-community-manager-20261028-2
- Note (2026-10-28): Eden approved in chat: "approved" (reply to: approve 044 for the group posts, approve 043 for the own-group plan).

## A-2026W44-044
- Agent: social-community-manager
- Executor: social-community-manager
- Type: publish
- Draft: marketing/social/community/2026-10-28-posts-v2.md
- Commit: 4a658c2
- Reason: Today's 5 Facebook group posts and 3 gift answers rewritten as awareness posts (no prices, codes, deadlines or sales calls to action), per Eden: "the post don't need to sell, the idea is for people to know about memobrick". Replaces 042.
- Expires: 2026-11-04
- Status: approved
- From: P-social-community-manager-20261028-3
- Note (2026-10-28): Eden approved in chat: "approved" (reply to: approve 044 for the group posts, approve 043 for the own-group plan).

## A-2026W44-045
- Agent: social-planner
- Executor: social-publisher
- Type: publish
- Draft: marketing/social/planner/sprint-2026-10-29/week.md
- Commit: 1297315
- Reason: Instagram follower sprint, 2 extra reels at 12:00 ET (Studio mosaics only): S-20261029-2 "We brick your pet" Ep. 1 (Oct 29) and S-20261030-2 "Same photo, 3 sizes" (Oct 30), on IG, FB, TikTok, Pinterest, YouTube Shorts. AI label on (AI-made photos).
- Expires: 2026-10-29
- Status: changes: replaced by A-2026W44-047 (Eden: "Use new footage")
- From: P-social-planner-20261028-1

## A-2026W44-046
- Agent: social-planner
- Executor: social-planner
- Type: offer
- Draft: marketing/social/planner/follower-goals.md
- Commit: 1c2cb58
- Reason: Re-approval of the weekly follower goals (A-2026W42-034), whose draft changed after approval (one Pinterest note).
- Expires: 2026-11-04
- Status: pending
- From: P-social-planner-20261028-2

## A-2026W44-047
- Agent: social-planner
- Executor: social-publisher
- Type: publish
- Draft: marketing/social/planner/sprint-2026-10-29/week-v2.md
- Commit: 89919a1
- Reason: Instagram sprint reels rebuilt from real cleared footage (no AI, AI label off): S-20261029-2 v2 "We brick your pet" Ep. 1 (Oct 29 12:00 ET) and S-20261030-2 v2 "Same photo, 3 sizes" (Oct 30 12:00 ET, Studio mosaics from the Billo couple clip). IG, FB, TikTok, Pinterest, YouTube Shorts. Replaces 045.
- Expires: 2026-10-30
- Status: pending
- From: P-social-planner-20261028-3

## A-2026W44-014
- Agent: email-campaign-writer
- Executor: email-campaign-writer
- Type: send
- Draft: marketing/email/campaign-writer/improve-nov27-black-friday.md
- Commit: 239cb86
- Reason: Edits the scheduled "Q4 | Nov 27 | Black Friday 20% (Warm)" campaign (6ab3af11a46e779522c64477) to sell BRICKFRIDAY25 at 25% through Sunday Nov 29, replacing the 20% personal code and the two images that have 20% printed in them. Without it the biggest send of the year advertises the wrong offer.
- Expires: 2026-11-25
- Status: approved
- From: P-email-campaign-writer-20261027-2
- Note: BRICKFRIDAY25 is in the offers calendar (scheduled, your word in chat Oct 26). Edit of an existing campaign, so its offer and dates are kept as the owner's own.

## A-2026W44-018
- Agent: conversion-auditor
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/freeproof-form-fallback.md
- Commit: 0bc1f7c
- Reason: Adds a fallback message and an "Email my photo for a free proof" button that shows only when the Hulk free-proof form has not loaded after 8 seconds, on /pages/free-preview and the homepage proof view, in a theme copy for you to publish. Today a failed form is a blank box. Draft orders are the largest lost-order cause (11 vs 71 last year).
- Expires: 2026-11-15
- Status: approved
- From: P-conversion-auditor-20261026-1
- Note: Reported Oct 26 but missed by earlier runs; first queued Oct 28.

## A-2026W44-015
- Agent: email-campaign-writer
- Executor: email-campaign-writer
- Type: send
- Draft: marketing/email/campaign-writer/2026-11-20-code-ends-sunday.md
- Commit: 239cb86
- Reason: Creates and schedules a new Omnisend campaign "Q4 | Nov 20 | EARLYHOLIDAY20 Ends Sunday (Warm)" for Fri Nov 20, 10:00 ET, to Warm minus Past Buyers, recent buyers and Unengaged 180d, using the real Nov 22 end date. Last year's best email was a deadline email.
- Expires: 2026-11-19
- Status: approved
- From: P-email-campaign-writer-20261027-3
- Flag: A scheduled "VIP 20%" campaign goes out Nov 19, the day before, and its content has not been read (the writer lists it as next run work). Check it does not use another code or tell the same people the same thing before you approve.

## A-2026W44-019
- Agent: conversion-auditor
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/cart-kit-missing-photo-notice.md
- Commit: 0bc1f7c
- Reason: The cart page shows "This kit has no photo yet. Add your photo" on any custom kit line with no design or photo attached, in a theme copy for you to publish, so photo-less kits like the second line of #21109 are caught before payment ahead of the December rush.
- Expires: 2026-11-30
- Status: approved
- From: P-conversion-auditor-20261026-2
- Note: Cart display only; it changes no order email, checkout step or fulfillment. Reported Oct 26 but missed by earlier runs; first queued Oct 28.

## A-2026W44-017
- Agent: conversion-auditor
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/ready-made-own-photo-link.md
- Commit: cf844f1
- Reason: Same fix as A-2026W44-016, as the auditor specified it: a text link "Want it with your own photo? Make yours in the editor" under Buy now on ready-made design pages, shown to half of visitors as test CA-20261028-01.
- Expires: 2026-11-18
- Status: approved
- From: P-conversion-auditor-20261028-1
- Flag: Duplicate of A-2026W44-016 (site-developer built and tested it). Approve 016 and reject this one.

## A-2026W43-007
- Agent: social-planner
- Executor: social-publisher
- Type: publish
- Draft: marketing/social/planner/2026-W45/week.md
- Commit: 63e84af
- Reason: Approving this item approves all 7 W45 posts (Nov 2 to 8) on every channel in each post's Channels column, including YouTube Shorts for the 3 reels; the publisher then prepares and schedules each one. Single posts can be sent back with `changes: <post-id> <note>` (posts not named stay approved).
- Expires: 2026-11-07
- Status: changes: send preview picture
- From: P-social-planner-20261022-1
- Note: Mon and Thu posts use EARLYHOLIDAY20 (active, end date still unknown) and Dec 15. If you end the code first, send those two back with `changes:`. All 7 posts need the AI label on.

## A-2026W43-005
- Agent: social-planner
- Executor: social-planner
- Type: publish
- Draft: marketing/social/planner/research/2026-10-21-facebook-groups-test.md
- Commit: 1c92140
- Reason: 2-week Facebook groups test in 5 groups (Dog Mom Club, Golden Doodle Owners, Cat Lovers Group Official, Craft & Creative Ideas DIY, Scrapbooking, Cards, & Crafts), done by hand by Eden from her own profile: read-only rules check Oct 23 to 27, join and comment only Oct 28 to Nov 3, one post per group Nov 4 to 8, result Nov 11. Starts nothing automatic; the Mac does nothing in groups without a separate item. Real photos only, "I run Memobrick" in every post, tracked links (utm_medium=group) only when asked.
- Expires: 2026-11-11
- Status: approved
- From: chat
- Note: Eden approved in chat on 2026-10-21 ("approve groups test"), recorded by the coordinator session. Proposal P-social-planner-20261021-1. Who does the read-only rules check (Eden or the Mac) is still open.

## A-2026W41-012
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/remove-hardcoded-product-rating.md
- Commit: 22411dc
- Reason: A hardcoded 4.8/747 AggregateRating sits on every product. That risks a Google manual action removing star snippets sitewide just before Q4.
- Expires: 2026-11-15
- Status: approved
- From: P-seo-technical-20261011-4

## A-2026W43-003
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/republish-public-domain-designs.md
- Commit: db7271f
- Reason: Republishes the Starry Night (20x20, 20x30) and Mona Lisa kits with new listings on the Online Store and Google channels. These pages drew search buyers last holiday and are drafts today.
- Expires: 2026-11-10
- Status: approved
- From: P-seo-technical-20261020-3
- Flag: Not approved on Oct 20: waits for Eden to confirm these designs can still be made. Do not approve until then.

## A-2026W41-014
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/add-article-breadcrumb-schema.md
- Commit: 22411dc
- Reason: 47 GemPages articles, including 8 of the 10 Christmas and holiday posts, have no BlogPosting or Breadcrumb schema.
- Expires: 2026-11-30
- Status: approved
- From: P-seo-technical-20261011-5

## A-2026W43-008
- Agent: social-publisher
- Executor: social-publisher
- Type: publish
- Draft: marketing/social/publisher/music/compose.py
- Commit: 525b435
- Reason: Add original background music to every video post. The 4 scheduled videos (guess-the-photo Oct 23 and Oct 30, couple-gift Oct 26, build-time Oct 28) had no sound; music versions replace them in Buffer on Instagram, Facebook and TikTok. Captions unchanged. Music is composed by marketing/social/publisher/music/compose.py and rendered with the MIT-licensed FluidR3 soundfont, so no license or cost. Future reels get music when they are cut.
- Expires: 2026-12-31
- Status: approved
- From: chat
- Note: Eden chose option 1 in chat on 2026-10-23 ("1": Hugo adds free music to the videos before scheduling; she may add trending sounds by hand when she has time).

## Flagged

Run 10 (2026-10-28). Details in `marketing/coordination/coordinator/overlaps-2026-10-28.md`.

- A-2026W44-017 copied with a flag: duplicate of A-2026W44-016 (same ready-made "your own photo" link, test CA-20261028-01; site-developer's version is built and tested).
- A-2026W44-018 and 019 are conversion-auditor proposals of Oct 26 that earlier runs never queued; copied now. Neither touches order emails, fulfillment or checkout steps (018 is a fallback on the free-proof form, 019 a cart-page display notice). Drafts exist and are unshared; no offers or dates used; contacts log empty.
- Still not queued: the Checkout email 1 test from email-flow-optimizer (no re-proposal in the standard format yet).
- Archived: A-2026W44-013 (expired Oct 27, Status pending) and A-2026W43-006 (seo-blog-writer reports it was already published Oct 26).

Run 9Run 9 (2026-10-27). Details in `marketing/coordination/coordinator/overlaps-2026-10-27.md`.

- Not queued, malformed: the email-flow-optimizer proposal "Checkout email 1: clean designed version" has no P- ID, Agent, or Status line, and its Draft line holds two files with notes. Both draft files exist. It would replace the claims in Abandoned Checkout email 1 (181 sends, 0 orders); worth re-proposing in the standard format with one Draft path. Not order workflow (it is a recovery email flow, not order emails or Post-Purchase).
- A-2026W44-015 copied with a flag: the Nov 19 VIP 20% campaign (content unread) sits a day before it.
- A-2026W44-013 to 015: drafts exist and are unshared; BRICKFRIDAY25 and EARLYHOLIDAY20 (ends Nov 22) are in the offers calendar; Nov 20 is a date from that calendar; contacts log empty; none touches order emails or the Post-Purchase flow; Executor is correct (email-campaign-writer creates and edits Omnisend campaigns).
- Not proposals: the outreach-gift-guide-pr, growth-analyst and site-developer reports of Oct 27 proposed none.
Run 8 (2026-10-26). No new proposals, so nothing flagged or dropped. A-2026W42-037 (W44 batch): the checker prints all 7 posts as approved and unchanged. Details in `marketing/coordination/coordinator/overlaps-2026-10-26.md`.

Run 7 (2026-10-23). Details in `marketing/coordination/coordinator/overlaps-2026-10-23.md`.

- Not queued, order workflow: P-site-developer-20261023-1 (Art Gift Kit flow). It adds a gift mode and a ship-to form that emails the store and must be checked against the order before production, so it touches fulfillment. The tested theme copy "Memobrick gift kit flow" (188683092188) exists; tell me if you want it queued anyway.
- Not queued, owner already decided: P-site-developer-20261021-2 (cart line "One offer per order"). You said "leave it" on Oct 21 and the draft says not to propose it again.
- Not queued, already copied: P-social-planner-20261021-1 (A-2026W43-005, approved in chat).
- A-2026W43-006 and 007: drafts exist and are unshared, hashes current, only the Dec 15 date (Facts table) and EARLYHOLIDAY20 (active) are used, contacts log empty, no conflict with other items. Executors checked against the approvals table.

Run 6 (2026-10-21). Details in `marketing/coordination/coordinator/overlaps-2026-10-21.md`.

- A-2026W43-002 (conversion-auditor): same kit page fix as A-2026W43-001 (site-developer, built and tested). Copied with a flag so you can pick; approve 001 and reject 002.
- A-2026W43-003 (seo-technical): copied as `pending` with a flag; you did not approve it on Oct 20 because the designs must be confirmed makeable first.
- Not queued, already copied: P-email-campaign-writer-20261020-1 (A-2026W42-042), P-seo-technical-20261020-1 and -2 (A-2026W42-043, 044).
- No proposal touches the order workflow; both new drafts exist and are unshared; no offer or date outside offers-calendar; contacts log empty.
- Stale approvals archived with Status lines untouched: 018 and 019 expired unapplied.

Run 5 (2026-10-16). Added A-2026W42-038 and 039; no flags (neither touches the order workflow, both drafts exist and are unshared, no offer or code used, Dec 15 is in the Facts table, contacts log is empty, no other item overlaps). A-2026W42-006 was archived as replaced; 012 and 014 (theme-file SEO changes) remain approved but could not be applied because Shopify blocks live-theme writes.

Run 4 (2026-10-15). Added A-2026W42-037; no flags (not order workflow, draft exists and is unshared, hashes current, EARLYHOLIDAY20 and Dec 15 in offers-calendar, contacts log not involved, no other item posts on Oct 26 to Nov 1). Not queued: P-site-developer-20261014-3 (the calm home is already live, so there is nothing left to approve). A-2026W41-002 (changes requested) expires today and its Oct 15 12:00 post will be missed.

Run 3 (2026-10-14). Added A-2026W42-033 to 035. No flags: none touches the order workflow, all drafts exist and are unshared, EARLYHOLIDAY20 and Dec 15 are in offers-calendar, contacts log is empty, batch 2 does not overlap batch 1, and no other open item posts to W43 dates. Not queued: P-outreach-gift-guide-pr-20261014-4, -5 and -6 (withdrawn, see run 2 below).

Run 2 (2026-10-14). No proposal touches the order workflow, every new draft file exists, and no two open items share a draft file. Contacts log is still empty, so no 30-day matches.

- A-2026W42-030, 031, 032 (outreach pitches): each names the Collabs creator tier (10% commission, 10% code), which is not listed as active in offers-calendar.md. The fixed-tier exception covers only creator-scout items. Outreach asked you to add it there.
- Not queued, withdrawn by outreach-gift-guide-pr in run 2: P-outreach-gift-guide-pr-20261014-4 (The Frugal Ginger, fit score 2), -5 (Green Wedding Shoes pitch, already covered by approved A-2026W42-023 on the same draft) and -6 (Green Wedding Shoes free kit).
- Not queued again: P-site-developer-20261014-1 and -2 were already copied as A-2026W42-021 and -022.
- A-2026W42-025 and A-2026W42-007 use EARLYHOLIDAY20, which is active but has no end date. Not a flag; confirm the end date before Oct 20.
- A-2026W42-024, 025 and 006 all add ads to the Meta Proven Videos ad set with different videos, so they are not duplicates. A-2026W42-026 and approved -019 both edit Google Holiday Gifts and work together.
- A-2026W42-008 (approved, stale old-theme sticky bar) was moved to the archive as replaced by -022, so it can no longer be applied by mistake. Its Status line was not changed.
- A-2026W41-009 (Frugal Ginger, approved with a free kit) was moved to the archive as withdrawn; outreach will not act on it.
- Still open from earlier: A-2026W41-010 (cart flow test) is approved but on hold; the shared blocks state "2-4 business days", which is not in the Facts table. A-2026W42-010 writes a cart attribute for its A/B test; it changes no order email, fulfillment or checkout step, so it was kept.

## Missing owner inputs

**New 2026-10-28:**

- Ready-made pages A/B link: theme copy "Memobrick fixes" must be published by you after approving A-2026W44-016; the theme count is 20 of 20, so delete old copies (memobrick-theme-v22 to v26 and "Copy of" themes) to make room (site-developer).
- Orders cannot be split by A/B arm; the test measures editor landings. Phone and referred-only funnel numbers still need GA4 (the data pull has not run).


**New 2026-10-27:**

- Black Friday and Cyber Monday offers are now decided (BRICKFRIDAY25, CYBERBRICK20) and EARLYHOLIDAY20 ends Nov 22; the older lines below that call them unknown are out of date.
- Email: the Nov 19 VIP and Dec 3 to Dec 14 countdown campaigns were not read for code or date conflicts (email-campaign-writer). The Oct 14 send to Unengaged 180d failed on 31% of sends.
- Welcome 20% code, checkout email claims ("740+ reviews", "Fox News, NBC and Yahoo", "2-4 days", lifetime replacements, named quote): verified review count, timing and permission still needed before they go back into emails (email-flow-optimizer).
- Outreach: whether to pursue two Help a Reporter leads (Ginger Casa, a Nov 1 family roundup); unknown whether earlier pitches (SheScribes, Love Tabitha, Emily Reviews) are approved, and Emily Reviews wants pitches by Nov 15 (outreach-gift-guide-pr). No Status shows approved for them.
- Phone and referred-only funnel numbers need GA4 (the data pull has not run) (site-developer).
- Tool bug: `email_preview.py` fails on Python 3.11 (reported by two email agents).

**New 2026-10-26:**

- Reconnect Buffer (publisher, third run in a row) and check the Mac social-post job: kit 2026-10-20-holiday-build-together (Oct 24 19:00) and the Oct 25 kits are still `ready`.
- Kit orders of Oct 20 and 21 with no design attached (site-developer): check them.
- Cart funnel follow-up (phone cart to checkout, target 65% or more) is due Oct 27 (site-developer).
- Black Friday and Cyber Monday offers are not in the offers calendar; the Nov 16 season goal is 12 orders a day. Decide the offers by early November so email, social and ads can prepare.
- Email orders are unknown: no omnisend referrer shows in Shopify (growth-analyst).

**New 2026-10-23:**

- Publish "Memobrick gift kit flow" is not queued (see Flagged); confirm the gift kit is 20x20 with credit 99 and who reads the gift ship-to emails if you want it.
- Reconnect the Buffer connector (publisher) and authorize the Facebook connector (ads-analyst, social-planner).
- Confirm the EARLYHOLIDAY20 end date; W45 posts on Nov 2 and Nov 5 use it.
- The Mac data pull has never run (`marketing/data/latest.md` says never), so Google, GA4, Search Console and Meta numbers are missing for every agent. Adspirer is at 150/150 calls until Nov 6.
- Paste the one-line rating removal (A-2026W41-012) by hand in Shopify admin; the hardcoded 4.8/747 rating is still live.

**New 2026-10-21:**

- Publish "Memobrick kit page fix" (A-2026W43-001) once approved; check Oct 20 and 21 kit orders for missing designs.
- Real iPhone check in Instagram: add a kit, tap Checkout, stop before paying. Also look at the cart mosaic picture on a phone (it showed broken in the auditor's sandbox).
- Delete the unused theme copy "Memobrick cart rollback" (188955361500); the store is at 20 of 20 themes. Say whether the drawer's older "Add $X more for free shipping" bar should go too.
- Product data errors (seo-technical): 60x20 shows 50x60 specs; 60x30 and 60x60 list 32 baseplates; the 20x20 guide says 4,092 bricks vs 4,096; art titles Lion, Rose and Colorful Zebra show the wrong subject; one product (`yelow-cat...20x30`) has conflicting size data.
- IP risk: 52 Artist Collection designs show celebrities, logos or studio characters (2 live: `lady-bricked-mosaic-home-decor-20x30`, `heatblast-ben-10-art-piece...-20x30`); gallery images on 10x10, 16x16, 20x20 and two 30x30 kits look like recognizable actors or anime characters. Decide whether to unpublish or replace.
- Meta Oct 27 "Early Bird LAST CALL" is now 20% (A-2026W42-041 done); confirm EARLYHOLIDAY20 end date before "ends" wording.
- Merchant Center "Needs attention" export (Eden) and Search Console/GA4/Meta data pull: `marketing/data/` is still empty.
- Cookie banner covers the main button on phones (app setting); no featured image on the two new articles.
- Page load is 4.3 to 4.6 s on phone, cause not diagnosed.
- Draft orders: 8 in 30 days vs 77 last year (largest lost-order cause); test the free-proof form.

**YouTube Shorts for the already-approved W43 and W44 reels (Eden, OK needed):**

- YouTube: pending. Reels now also post to YouTube Shorts. The W43 and W44 batches (A-2026W42-033, A-2026W42-037) were approved before that, and their post files cannot change without breaking the approval, so the YouTube title and description were added only to the kits, as an "added channel" section: S-20261019-1, S-20261021-1, S-20261023-1, S-20261026-1, S-20261028-1, S-20261030-1 (marketing/social/publisher/to-post/). Read them there, then write `OK` at the end of this line (or say so in chat) to let them post on YouTube too. Until then the Mac posts these reels on the other four channels only. OK by Wed Oct 21 before 19:00 ET so Wednesday's reel goes to YouTube on time.

**Facts marked unknown or incomplete:**

- Holiday ad budget
- Product margins (also "Margin checked: unknown" for all three offers)
- Faces per size and build time
- EARLYHOLIDAY20 (active since 2026-10-12): end date and exclusions to confirm. The Oct 20 and Oct 27 Early Bird emails, the Meta Christmas ads (A-2026W42-025) and any "ends" wording depend on it

**Blockers reported by agents:**

- **New 2026-10-16:**
  - Seo-technical: Shopify blocks writes to the live theme, so approved A-2026W41-012 (remove hardcoded 4.8/747 rating) and A-2026W41-014 (article schema) are not applied. Paste the before/after in Shopify admin or give a route that allows it. The rating one is the higher risk before Q4.
  - Ads-analyst: Google not read this week (no data snapshots; Adspirer has 0 calls until Nov 6); A-2026W42-018 and 019 need Eden to run the prompts by hand. Meta reports 6 purchases in 7 days but Shopify shows 1 tagged facebook/paid order (tracking gap to check).
  - Data pull: `marketing/data/` still has no snapshots, so Google, GA4, Search Console and Meta cross-checks are missing across agents.

- **New today (run 2):**
  - Ads: A-2026W42-019 blocked by the Claude Code permission check on the Google Ads save click (needs Eden). Meta landing page views are 76% of link clicks vs 93% last year (possible slow mobile load; worth a site-developer check). BEMYVALENTINE is not in offers-calendar, so the Valentine's plan waits. Adspirer has 0 free calls until Nov 6.
  - Creator-scout: Evan Rubin reactivation: owner said no (2026-10-14). Do not reactivate or contact him. Discount groups BF15 (15%) and freelifemiami (20%) are active at rates other than 10%, and other Collabs programs exist (Family 15% commission, a legacy 0% program with warnings). 407 applications not read yet.
  - Outreach: the 10%/10% creator offer is now in offers-calendar.md (owner confirmed 2026-10-14), so the flag on A-2026W42-030 to 032 is cleared. The Collabs page copy (https://mymemobrick.com/pages/collabs) is outdated (reads like a job ad, names a toy brand). No contact route for the two best fits, Shop TODAY and CNN Underscored, or for NCOA, Dogster, Catster, iHeartDogs and The Mom Edit. Green Wedding Shoes is approved commission only (A-2026W42-023).
  - Social-publisher: S-20261015-1 (A-2026W41-002, changes requested) posts Oct 15 12:00 and will be missed unless the planner revises it today.
- **Earlier today:**
  - Site-developer: owner to confirm the free-shipping discount covers Alaska, Hawaii and Puerto Rico, and to compare cart-quoted rates to checkout rates with a real address (2 minutes, no payment).
  - Conversion-auditor and others: marketing/data/latest.md shows nothing pulled (Updated: never), so GA4 and Meta cross-checks are missing; owner-side data pull needed.
  - Site-developer: EARLYBIRD20 is still advertised on the home page but is not in offers-calendar.md. Live theme writes may be refused by the connector.
  - Draft orders fell to 4 in 30 days from 71 last year (growth-analyst weak point, owner action: test the free-proof form and why proof requests are not invoiced).

- **Urgent (email-campaign-writer):** Omnisend has campaigns scheduled with no approval item, using offers that are not in offers-calendar:
  - Re-engagement 10% (Oct 14)
  - Early Bird 15% (Oct 20 and Oct 27)
  - VIP 20% (Nov 19)
  - Black Friday 20% (Nov 27)
  - Cyber Monday 20% (Nov 30)
  - a countdown series (Dec 3 to Dec 14) that implies a Dec 15 order-by date
  - "Real Customer Builds" (Oct 13), which may use customer content with no recorded permission

  Add these to offers-calendar or pause them in Omnisend.
- **Offers and codes:**
  - EXTRA10 is active in Shopify (515 uses) but not in offers-calendar; it sits only in paused PMax asset groups, which must not be resumed with it (ads-analyst).
  - Old EARLYBIRD20 creatives remain in the Meta account; the paused retargeting campaign must not be resumed with them (ads-analyst).
  - Black Friday and Cyber Monday offers are unknown (email-campaign-writer).
  - The Welcome 20% code is live but not listed as active (email-flow-optimizer).
  - "Additional 10% off when buying from 2 pcs" appears in the Baby's First Year article (seo-technical).
- **Brand conflicts live on the site and in emails** (seo-technical, email-flow-optimizer, outreach):
  - "2–4 business days" delivery claim
  - "free proof" from "a real Memobrick designer"
  - "nothing is made until you approve"
  - "As seen on Fox News, NBC and Yahoo" (only "As seen on FOX" is allowed)
  - review and customer counts that disagree (4.8, 740+, 747, +700, 1,015, 1000+, 22,500+)
  - lifetime free replacements
  - named customer quotes with no permission file
  - "your photo stays on your device"
  - the `/pages/free-preview` page titled "Free Proof"
  - em dashes in the theme's meta fallbacks
- **Missing permissions and assets:**
  - `marketing/conversion/reviews-ugc/approved-stories.md` does not exist, so no customer stories or quotes can be used (seo-blog-writer, social-planner, email-flow-optimizer).
  - Some Drive clips have unclear rights; confirm the Billo license for A-2026W41-003 (social-planner, social-publisher).
  - There are no product photos or kit flat lays for the two carousels (social-planner).
  - No featured image for the published Christmas hub article or the new "person who has everything" draft (seo-blog-writer).
- **Connections and access:**
  - The live site is unreachable from the agents' environment (all web agents).
  - Search Console and PageSpeed are not connected (seo-strategist, seo-technical).
  - Postiz is not connected: no API URL, no CLI (social-publisher).
  - The Omnisend API split block is unconfirmed, and the automations reference tool is not allowed (email-flow-optimizer).
  - The search tool refuses major glossy publishers; Similarweb and Ahrefs failed to connect (outreach-gift-guide-pr).
  - Google Ads has no UTM tracking template, so paid and organic Google orders cannot be separated in Shopify (ads-analyst).
  - Meta performance-trend tool returns no data, and Meta ad landing URLs are not returned (ads-analyst).
  - The Shopify connector's read-only GraphQL needs a permission this session lacks (creator-scout).
- **Unknown facts and data:**
  - The upload page URL is not recorded; the email CTA uses the homepage (email-campaign-writer).
  - No 14-day recent-purchaser segment exists (email-campaign-writer).
  - The cart-restore merge tag is unconfirmed (email-flow-optimizer).
  - Checkout email 1 bounce reasons were not pulled (email-flow-optimizer).
  - The Back in Stock template is the unedited default (email-flow-optimizer).
  - Email orders and organic versus paid Google traffic are not separable (growth-analyst).
  - Orders have no gift note or occasion field (outreach-gift-guide-pr).
  - The redirect count is at least 10,000, and a full export is needed (seo-technical).
  - Sizes, prices, faces per size and build time are not in the brand skill (seo-strategist, seo-blog-writer).
  - `page.custom-brick-mosaic-vs-alternatives` has no published page (seo-strategist).
