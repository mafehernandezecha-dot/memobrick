# DRY RUN: social-planner 2026-10-11

## Summary

Planned 2026-W42 (Oct 12 to 18): 3 short videos using Drive footage (Ready) and 2 carousels with shot briefs (Creating), plus 3 Story ideas.
No prior results, no approved customer stories, no checked SEO pages, and no active public offers or verified dates, so none are used.
All post files pass the copy check. Nothing was scheduled or published.

## Done

- Loaded memobrick-brand. Skipped approvals (dry run). Skipped git pull and commit (dry run override).
- Read inputs: offers-calendar.md (only automated email offers active; all Facts unknown), content-calendar.md (empty), customer-questions.md (empty). approved-stories.md does not exist. No SEO drafts in marketing/seo/writer/drafts/.
- Searched Google Drive (read only). Found folder "Memobrick videos" (subfolders: couples video, Family video, pet videos) plus loose MEMOBRICK_video_original_* clips. Used three as assets.
- Post packages:
  - marketing/social/planner/2026-W42/S-20261012-1.md: Reel/TikTok, transformation, Mon 19:00, Ready
  - marketing/social/planner/2026-W42/S-20261013-1.md: Carousel, how to pick the right photo, Tue 19:00, Creating (shot brief)
  - marketing/social/planner/2026-W42/S-20261015-1.md: Reel/TikTok, building with the map and 1×1 bricks, Thu 12:00, Ready
  - marketing/social/planner/2026-W42/S-20261016-1.md: Carousel, what is in the kit, Fri 19:00, Creating (shot brief)
  - marketing/social/planner/2026-W42/S-20261018-1.md: Reel/TikTok, family photo transformation (Billo creator clip), Sun 11:00, Ready
- marketing/social/planner/2026-W42/stories.md (3 Story ideas), marketing/social/planner/2026-W42/results.md (no prior results), marketing/social/planner/2026-W42/pinterest-proposal.md (optional first-run proposal, 3 example pins).
- Appended 5 rows to marketing/shared/content-calendar.md.
- python3 marketing/tools/check.py copy on all files in marketing/social/planner/2026-W42: pass (exit 0).

## Proposed for approval

### P-social-planner-20261011-1
- Agent: social-planner
- Type: publish
- Draft: marketing/social/planner/2026-W42/S-20261012-1.md
- Reason: Transformation Reel opens the week with the core photo to mosaic story.
- Expires: 2026-10-12
- Status: pending

### P-social-planner-20261011-2
- Agent: social-planner
- Type: publish
- Draft: marketing/social/planner/2026-W42/S-20261015-1.md
- Reason: Building experience video shows the hands-on value ahead of holiday gift planning.
- Expires: 2026-10-15
- Status: pending

### P-social-planner-20261011-3
- Agent: social-planner
- Type: publish
- Draft: marketing/social/planner/2026-W42/S-20261018-1.md
- Reason: Family transformation video for the family gift audience.
- Expires: 2026-10-18
- Status: pending

S-20261013-1 and S-20261016-1 are Creating (no asset yet) and are not proposed. They will be proposed once the photos exist.

## Blocked or unknown

- Video contents unverified: the planner cannot play Drive videos. Owner must confirm each Ready clip matches its brief, shows no customer face or name without recorded permission, and that usage rights cover organic posting (S-20261018-1 appears to be Billo creator content).
- Some Drive clips have unclear rights (videoplayback.mp4, Snaptik_*.mp4 look like downloads); not used.
- Live site unreachable from this environment (DNS failure for mymemobrick.com; proxy refused curl). Destination paths /pages/editor and /pages/how-it-works come from the theme files in the repo and were not verified live.
- No product photos or kit flat lays found in Drive for the two carousels.
- No approved customer stories file, so no real-story post this week.
- Christmas order-by date unknown: no order-by reminders.
- Timing: Mon 2026-10-12 19:00 post may expire before the Monday approval cycle completes.

## Next run

- Thursday 2026-10-15 06:00 ET: plan 2026-W43. Propose the two carousels if the owner adds kit and photo-choice images to Drive.
