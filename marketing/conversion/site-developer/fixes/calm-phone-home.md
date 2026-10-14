# Site fix: a calm phone home page (one main button, free-proof link always visible)

**Revised 2026-10-14 at Eden's request ("keep the color dots"):** the dot row now stays on phones, smaller (14 px dots), just below the free-proof link and above the video. Everything else is as first proposed. New file md5 883ec9b9756b04c28eb971b7bb625ff9 (was 6795f9091b0a8bd9361c992806a9ab0b).

**Revised again 2026-10-14 (approved item A-2026W42-036):** the promo strip in this file now says EARLYHOLIDAY20 instead of EARLYBIRD20 (one-word change made on main, commit 1c2cb58). **Current file md5 d641ed44212004aaa1ab2be733f6829f.** This is the file in the preview copy below.

Built and tested by: site-developer (Jenny), 2026-10-14
Executor: site-developer
Asked by: Eden, 2026-10-14, after publishing "Memobrick fixes": "I don't like how busy the website looks."
Expires: 2026-10-21

## The problem (phone home page, live theme "Memobrick fixes", id 188683092188)

Measured today on the live site at 390x844 (iPhone screen size):

- **Too many red buttons.** Five on the page: "Create My MemoBrick" at y = 403 (first screen) and again at y = 1,180 (right under the video), "See your photo in bricks" at 1,879, "Create My MemoBrick" at 2,856 and at 5,584. On top of that a sixth, floating "Create My MemoBrick" bar (`#mobCta`) is pinned to the bottom of the screen as soon as the first button scrolls away. That floating bar is what the pink "Get 20% off" pill and the Chat bubble sit on.
- **The free-proof link is far from the main button.** "Not sure yet? Get a free design proof first" is at y = 1,432, a screen and a half below the button, and once you scroll to it the floating bar and the two app bubbles crowd it. Free-proof sales fell from 67 to 4 against last year.
- **Decoration.** A row of 8 colored dots sits between the button and the video.
- **Big video.** The phone video is up to 58% of the screen tall; with the poster fallback it was 557 px (66%).

Desktop (1440x900) is already calm: one button and the free-proof link on the first screen, and the next button a full screen lower. It is not changed.

## What changes (one file: `sections/memobrick-site.liquid`)

Phones and small tablets only (up to 900 px wide; the floating-bar rule up to 700 px, where that bar exists). Nothing is deleted from the page code; the changes are CSS in the small `<style>` block that already sits in the hero, plus a class on two button paragraphs.

| Before (phone) | After (phone) |
|---|---|
| Button, price line, dot row, video, second button, text, free-proof link, trust line | Button, "Kits from $35" line, **free-proof link right under it**, compact dot row, video (shorter), text, trust line |
| 5 red buttons on the page plus a floating bar | **2**: the main one on the first screen and one at the end (FAQ), each with a free-proof link under it |
| Floating "Create My MemoBrick" bar pinned to the bottom | Removed on phones, so the app bubbles no longer sit on a button |
| Dot row of 22 px dots between price line and video | Kept, 14 px dots, centered, 16 px below the free-proof link |
| Video up to 58% of the screen | Up to 52% (50% where the browser has no `svh`), muted autoplay loop unchanged |

The "Send a photo and get a free proof" link in How it works, the size cards' own "Try this size" buttons, and the FAQ button with "Not ready yet? Get a free proof first" all stay.

### Exact diff against the live file (md5 809e6c2ebf0eef90eeb81352bf190c94)

Plus one line in the promo strip (A-2026W42-036): `with code <b>EARLYBIRD20</b>` becomes `with code <b>EARLYHOLIDAY20</b>`.

```diff
@@ -109,6 +109,24 @@
           .wrap.hero .hero-cta-top{display:flex;flex-direction:column;align-items:stretch;order:2;gap:8px;margin:0}
           .hero .hero-cta-top .hero-cta-note{margin:0;font-size:14px;line-height:1.4;color:var(--ink-2,#5E636C);text-align:center}
         }
+        /* Calm phone home (2026-10-14): one main button, free-proof link right under it, compact dot row under the link, shorter video, no repeated buttons. Desktop (901px+) unchanged. */
+        @media (max-width:900px){
+          .wrap.hero{gap:14px}
+          .hero .rail{order:4;justify-content:center;gap:7px;margin:2px 0 0}
+          .hero .rail i{width:14px;height:14px}
+          .hero .hero-tertiary{order:3;margin:-4px 0 0;font-size:15px;line-height:1.3}
+          .hero .hero-tertiary .linky2{display:inline-block;padding:10px 6px;min-height:44px}
+          .hero .hero-img{order:5;margin-top:6px}
+          .hero .hero-img video{max-height:50vh;max-height:52svh}
+          .hero .hero-img .hero-poster{aspect-ratio:4/5;object-fit:cover;max-height:50vh;max-height:52svh}
+          .hero .lede,.hero .lede:first-of-type{order:6;margin:6px 0 0;font-size:16px}
+          .wrap.hero > .hero-cta:not(.hero-cta-top){display:none}
+          .hero-trustbar{order:7;margin-top:6px}
+          .mb-mid-cta{display:none}
+        }
+        @media (max-width:700px){
+          #mobCta{display:none!important}
+        }
       </style>
       <div class="rail" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
       <figure class="hero-img">
@@ -142,7 +160,7 @@
-      <p style="text-align:center;margin-top:24px">
+      <p class="mb-mid-cta" style="text-align:center;margin-top:24px">
         <a class="btn btn-red big" href="/pages/editor">See your photo in bricks</a>
@@ -175,7 +193,7 @@
-      <p style="text-align:center;margin-top:24px">
+      <p class="mb-mid-cta" style="text-align:center;margin-top:24px">
         <a class="btn btn-red big" href="/pages/editor">Create My MemoBrick</a>
```

Full new file: `marketing/conversion/site-developer/theme-files/calm-phone-home/sections/memobrick-site.liquid`, md5 **d641ed44212004aaa1ab2be733f6829f** (includes the EARLYHOLIDAY20 promo line, A-2026W42-036), also at
https://github.com/mafehernandezecha-dot/memobrick/raw/1c2cb58870ec81e5fc31d95d6900b7d774e2a07c/marketing/conversion/site-developer/theme-files/calm-phone-home/sections/memobrick-site.liquid
(checked: that link downloads exactly this md5).

The same section renders `/pages/editor`, where the home view is hidden, so the editor is not affected. `memobrick.js` still shows/hides `#mobCta` as before; the CSS keeps it hidden on phones (no JavaScript change).

## Preview link

**https://mymemobrick.com/?preview_theme_id=188697510108**

Theme "Memobrick calm home", id 188697510108 (gid://shopify/OnlineStoreTheme/188697510108), UNPUBLISHED, created 2026-10-14 with `themeDuplicate` from the live theme "Memobrick fixes" (188683092188) after Eden freed theme slots. Only `sections/memobrick-site.liquid` was uploaded (from commit 1c2cb58, md5 d641ed44212004aaa1ab2be733f6829f, confirmed by Shopify's checksum). Compared all 514 theme files of the copy and the live theme by checksum: this is the only difference.

Tested in the preview (`tools/calm-home-test.mjs preview <dir> 188697510108`): same results as the table below (button y = 383, proof link y = 477 to 521, dots y = 537 to 551, 2 red buttons, no floating bar, no sideways scroll at 390 and 360, desktop unchanged), the promo strip reads EARLYHOLIDAY20, the free-proof link opens the free-proof view, and the main button opens the editor (`/pages/editor`, upload view) on both phone sizes. Preview screenshots: `2026-10-14-calm-phone-home/preview-*.jpg`.

## How it was tested today

Because no copy could be made, I tested the exact change on the live page in a test browser: Playwright (Chromium) loads the live home page and adds the same CSS and the same two classes before the page renders (`marketing/conversion/site-developer/tools/calm-home-test.mjs`, CSS in `tools/calm-home-test.css`). Nothing on the live site was changed. Results in `2026-10-14-calm-phone-home/test-results.json`.

| Check | Before (live) | After |
|---|---|---|
| Phone 390x844: main button | y = 403 | y = 383, "See your photo in bricks in seconds. Kits from $35." under it |
| Phone 390x844: free-proof link | y = 1,432, 17 px tall, not on the first screen | y = 477, 44 px tall tap area, fully on the first screen |
| Phone 360x740 (small phone): free-proof link | y = 1,355 | y = 468, fully on the first screen |
| Red buttons in the home page (phone) | 5, plus the floating bar from y = 800 on | 2 (y = 383 and the FAQ one at y = 5,000), no floating bar at any scroll point |
| Dot row (phone) | 22 px dots at y = 533, between price line and video | 14 px dots at y = 537 to 551, 16 px below the free-proof link (ends y = 521), above the video |
| Hero media height (phone) | 557 px (66% of the screen, poster fallback) | 439 px (52%); the video uses the same limit |
| Video settings | muted, autoplay, loop, playsinline | unchanged |
| Page length (phone) | 6,183 px | 5,599 px |
| Sideways scroll | none (390 = 390, 360 = 360) | none (390 = 390, 360 = 360) |
| Main button and free-proof link tappable (nothing on top) | button yes, link off screen | both yes (checked with the element at the tap point) |
| Main button and free-proof link under the app bubbles | | no overlap on the first screen with grey placeholders at the teaser's and chat's real positions (bottom-left 12 px, bottom-right 16 px) |
| Tap free-proof link | opens the free-proof view | opens the free-proof view |
| Tap main button | starts navigation to /pages/editor | same |
| Desktop 1440x900 | 4 buttons (558, 1,223, 1,967, 4,131), proof link at 631, page 4,623 px | identical positions and page height (the new rules only apply up to 900 px; the screenshots differ only in animated details) |

Notes on the test environment: this sandbox cannot load cdn.shopify.com or the apps' own servers, and its Chromium cannot play the H.264 video, so the screenshots show the poster image with a play button where your phone plays the video, the review photos are blank, and the Omnisend pill and Chat bubble are shown as grey "SIM" boxes at their configured spots. After the button tap, Shopify's bot check sends this test browser to shop.app; that happens before and after the change and does not affect real visitors.

Screenshots (`marketing/conversion/site-developer/2026-10-14-calm-phone-home/`, about 1000 px wide):

- In the preview theme 188697510108 (the real copy, no test-browser patching): `preview-phone-screen1.jpg`, `preview-phone-y800.jpg`, `preview-phone-y1700.jpg`, `preview-phone360-screen1.jpg`, `preview-phone-full.jpg`, `preview-desktop-screen1.jpg`, `preview-desktop-full.jpg`
- First phone screen: `before-phone-screen1.jpg`, `after-phone-screen1.jpg`
- Phone scrolled 800 px and 1,700 px: `before-phone-y800.jpg`, `after-phone-y800.jpg`, `before-phone-y1700.jpg`, `after-phone-y1700.jpg` (before: the floating bar under the SIM bubbles; after: none)
- Small phone: `before-phone360-screen1.jpg`, `after-phone360-screen1.jpg`
- Whole phone page (500 px wide): `before-phone-full.jpg`, `after-phone-full.jpg`
- Desktop: `before-desktop-screen1.jpg`, `after-desktop-screen1.jpg`, `before-desktop-full.jpg`, `after-desktop-full.jpg`

## Expected effect

- Free proof: the link moves from 1.7 screens down to the first screen, directly under the button, with a proper tap area. It was the only free-proof entry near the top of the page, and free-proof sales are 4 against 67 last year; I expect free-proof requests from phone home visits to rise clearly (measure: free-proof form submissions and `/pages/free-preview` sessions from referred phone traffic, 14 days before and after).
- Add to cart from the phone home page (6.6% against 12.5% last year): one clear choice on the first screen and nothing covering it. Removing the floating bar is a trade-off: it was the only button visible mid-page. The first-screen button and the FAQ button remain, and the size cards keep their own buttons. If phone home-to-editor clicks drop more than 10% in 14 days, the floating bar can come back in a small version that leaves room for the chat bubble.

## What Eden clicks

1. Done: theme slots freed, copy "Memobrick calm home" (188697510108) created and tested.
2. **Look at the preview on your phone:** https://mymemobrick.com/?preview_theme_id=188697510108
3. **Approve this item** in the queue (Status: approved).
4. **Publish, one click:** Online Store > Themes > "Memobrick calm home" > "..." > Publish. Open the home page on your phone.

Alternative without publishing a new theme: after step 3, Online Store > Themes > "Memobrick fixes" > "..." > Edit code > `sections/memobrick-site.liquid` > select all, paste the full file from the GitHub link above, Save (2 minutes). The connector blocks my writes to the live theme, so this paste is the only way without a copy.

## How to undo

- If you published the copy: Online Store > Themes > "Memobrick fixes" > "..." > Publish (one click). I will not change or delete it.
- If you pasted the file: Edit code > `sections/memobrick-site.liquid` > paste the backup `marketing/conversion/site-developer/backups/2026-10-14-calm-phone-home/sections/memobrick-site.liquid` (md5 809e6c2ebf0eef90eeb81352bf190c94, byte-identical to the live file today) > Save.
- To bring back only the floating bar: delete the three lines `@media (max-width:700px){`, `#mobCta{display:none!important}`, `}`.

## Not done in the theme: the two floating app bubbles (app settings, Eden's steps)

Both are drawn by apps, not by theme code, and their scripts cannot load in my test browser, so I could not safely restyle them from the theme. With the floating bar gone they no longer sit on a button; these settings make them smaller and keep the pill off the first screen.

**"🎁 Get 20% off" pill = Omnisend pop-up teaser.** Omnisend > Forms > "Exit-Intent 10% Welcome (gentle)" (popup, enabled since 2026-09-24) > Teaser:
- Teaser display: change from "Always" to show the teaser only after the visitor has closed the pop-up. New visitors then see no pill on the first screen; it appears only for people who saw the offer and closed it.
- Size: font size 15 px to 13 px, padding 10/16 px to 6/12 px; text can stay "🎁 Get 20% off".
- Position: keep bottom-left. Save and publish the form.
- Also check: the form's name says "10%" and it tags people `exit_intent_welcome10`, but it promises 20% off; make sure the welcome email sends a 20% code. The 20% welcome offer is not listed in `marketing/shared/offers-calendar.md`.

**"Chat" bubble = Shopify Inbox app embed.** Online Store > Themes > live theme > Customize > App embeds (left bar) > Shopify Inbox: Button text from "Chat with us" to the icon-only option (no text), Position "Bottom right", Save. Do this after the theme is published (or before I make the copy), because a copy made earlier keeps the old setting. Today's settings: `button_text: chat_with_us`, `button_horizontal_position: bottom_right`, `button_vertical_position: lowest`, black button.

Other floating app embeds switched on in the theme, in case anything else shows on your phone: Google & YouTube store widget (bottom-left, 46 px up on phones), BixGrow affiliate widget, UpPromote message bar, Vitals. If one of them shows, App embeds > its toggle turns it off.
