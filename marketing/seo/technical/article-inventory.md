# Article inventory (DRY RUN, 2026-10-11)

## Sources

- **Live store data (Shopify Admin API, read only).** Lists all 59 articles in 5 blogs. 54 are published.
- **Live theme `memobrick-theme-v25`.** All 49 `templates/article.*` files are byte-identical to the repo copies in `memobrick-size-zoom-test-latest (2)/templates/` (MD5 compared). The template text analysed here is therefore what the live site serves.
- **Not checked.** The rendered HTML was not fetched: the egress proxy blocks mymemobrick.com and WebFetch DNS failed. The two merges below rest on live store records (published status, handle, assigned template) plus the live template text. Re-check both URLs in a browser before applying.

## Template inventory

| Templates in repo | Count | Notes |
|---|---|---|
| `article.gp-template-*.json` (GemPages v7) | 44 | Each is assigned to exactly one published article |
| `article.gem-*-template.liquid` (GemPages v6) | 4 | 3 hold the same "Perfect Holiday Gift" text. One is the pet memorial article |
| `article.liquid` | 1 | Default template. 6 older articles and the graduation article use it |
| Assigned but missing from the theme | 2 | `gp-template-627595347056657074` (graduation, published, falls back to `article.liquid`) and `gem-591272771804-template` (unpublished Ikram copy) |

## Duplication analysis

**Method.** Body text came from the GemPages settings: every `_text` and `childItem` field in each section of each template. Each article body was split into 5-word shingles. Shingles that appear in 40% or more of the templates were treated as boilerplate and removed (37 shingles: review widgets, FAQ stubs). Overlap was then measured pairwise, as Jaccard and as containment.

**Results:**

| Measure | Result |
|---|---|
| 44 `gp-template` articles (946 pairs) | Highest Jaccard 0.09, highest containment 0.22. Median raw Jaccard 0.002. No pair above 0.5. Median unique-text share 99.8% |
| `gem` v6 templates | `theperfect-holiday` vs the Ikram copy: **0.98** (same article). The Ikram copy vs `gem-backup`: 1.00 (unpublished) |
| Page vs article | `/pages/blog-post` vs the summer souvenirs article: **1.00** (385 words each, identical) |

**Verdict.** There are 2 confirmed live duplicates. The rest of the blog has no text duplication. The real problem is **topic cannibalization** in three clusters:

- **Christmas and holiday:** 10 articles, including the hub. Three use the same "build it together" angle.
- **Why personalized gifts:** 3 articles.
- **Family activity, screen-free:** 5 articles.

These need hubs and interlinking. Merging them now would be premature without Search Console data, and with Christmas traffic about to peak.

## Hubs

| Hub | URL | Cluster |
|---|---|---|
| Christmas gifts | `/blogs/news/dont-wait-until-december-personalized-christmas-gifts-to-order-now` | 9 Christmas/holiday articles plus the hub itself |
| Personalized gifts | `/blogs/news/why-personalized-gifts-feel-so-much-better-than-generic-gifts` | `test-blog-post-07072026`, `what-if-your-next-gift-was-also-an-experience` |
| Family activity | `/blogs/news/fun-screen-free-family-activities-that-bring-everyone-together-kbstga` | 2022 and 2024 family-activity articles |

## Confirmed merges and 301 map (proposed as site-change items)

| From (unpublish) | 301 to | Evidence |
|---|---|---|
| `/blogs/news/ikram-gempages-the-perfect-holiday-gift-for-mindful-creativity` | `/blogs/news/theperfect-holiday` | 98% text overlap. Published 2026-09-10 under the internal title "[Ikram GemPages] ..." |
| `/pages/blog-post` | `/blogs/news/duplicate-from-the-best-summer-vacation-souvenirs-arenand-39-t-bought-theyand-39-re-built` | 100% text overlap, same title |

**Before applying,** delete the existing redirect `/blogs/news/theperfect-holiday` → `https://mymemobrick.com/`. It does nothing today because the article is live, but it would hijack the target if `theperfect-holiday` were ever unpublished.

## Inventory of published articles (54)

"Words" counts the GemPages template text (`n/a` means the article uses `article.liquid` or a v6 Liquid template). "H1" is a heuristic count from the template.

| # | URL (/blogs/news/ unless noted) | Topic | Words | H1 | Verdict |
|---|---|---|---|---|---|
| 1 | best-family-activity-with-memobrick | Best Family Activity | n/a | ok | improve; family-activity cluster, hub `fun-screen-free-family-activities...` (topic overlap only, keep for now) |
| 2 | the-ideal-present | The Ideal Present | n/a | ok | keep; improve meta + H1 as needed |
| 3 | memobrick-ideas-for-game-night | Top Memobrick Ideas For Game Night | n/a | ok | improve; family-activity cluster, hub `fun-screen-free-family-activities...` (topic overlap only, keep for now) |
| 4 | theperfect-holiday | The Perfect Holiday Gift for Mindful Creativity | n/a | ? | keep (canonical for holiday-gift copy); improve: H1, meta, schema; link to Christmas hub |
| 5 | ikram-gempages-the-perfect-holiday-gift-for-mindful-creativity | [Ikram GemPages] The Perfect Holiday Gift for Mindful Creativity | n/a | ? | **merge** into `theperfect-holiday` (98% overlap, confirmed). Unpublish + 301. |
| 6 | /blogs/experience-the-ultimate-bonding-activity-with-memobrick/experience-the-ultimate-bonding-activity-with-memobrick | Experience the Ultimate Bonding Activity with Memobrick | n/a | ok | improve; family-activity cluster, hub `fun-screen-free-family-activities...` (topic overlap only, keep for now) |
| 7 | /blogs/the-top-superlative-ways-to-disconnect-kids-from-technology/the-top-superlative-ways-to-disconnect-kids-from-technology | The Top Superlative Ways to Disconnect Kids from Technology | n/a | ok | improve; family-activity cluster, hub `fun-screen-free-family-activities...` (topic overlap only, keep for now) |
| 8 | memobrick-named-one-of-the-best-holiday-gifts-by-fox-news | Memobrick Named One of the Best Holiday Gifts by Fox News | n/a | ok | keep; link to Christmas hub |
| 9 | blog-memorial | Memorial blog | n/a | ? | improve: title "Memorial blog" should match H1 "Healing After Losing a Pet" |
| 10 | graduation-gift-ideas-theyll-treasure-forever | Graduation Gift Ideas That They'll Treasure Forever | body | ? | improve: fix broken link to `...connections-2` |
| 11 | fathers-day-gift-ideas-that-go-beyond-the-usual-tools-and-gadgets | Father's day Gift Ideas That go Beyond the Usual Tools and Gadgets | 472 | 0 | keep; improve meta + H1 as needed |
| 12 | baby-carrier-jul-10-22-19-45 | Celebrate Baby's First Year with a Custom Photo Mosaic | 315 | 2 | keep; improve: handle is wrong or messy, rename with 301 |
| 13 | test-blog-post-07072026 | Why Personalized Gifts Create Stronger Emotional Connections | 616 | 1 | improve: rename handle (301) or merge candidate into hub `why-personalized-gifts-feel-so-much-better-than-generic-gifts` (same intent; text overlap low, not confirmed duplicate) |
| 14 | duplicate-from-the-best-summer-vacation-souvenirs-arenand-39-t-bought-theyand-39-re-built | The Best Summer Vacation Souvenirs Aren't Bought, They're Built | 385 | 0 | keep (canonical); `/pages/blog-post` is a 100% duplicate to 301 here |
| 15 | duplicate-from-military-homecoming-gifts-that-celebrate-being-together-again | Military Homecoming Gifts That Celebrate Being Together Again | 596 | 0 | keep; improve: handle is wrong or messy, rename with 301 |
| 16 | fun-screen-free-family-activities-that-bring-everyone-together-kbstga | Fun Screen-Free Family Activities That Bring Everyone Together | 507 | 0 | improve; family-activity cluster, hub `fun-screen-free-family-activities...` (topic overlap only, keep for now) |
| 17 | creative-wedding-thank-you-gifts-for-parents-and-bridesmaids-ifqdgg | Creative Wedding Thank You Gifts for Parents and Bridesmaids | 654 | 1 | keep; improve meta + H1 as needed |
| 18 | the-best-personalized-valentineand-39-s-day-gifts-that-last-beyond-flowers | The Best Personalized Valentine&#39;s Day Gifts That Last Beyond Flowers | 527 | 0 | keep; improve: handle is wrong or messy, rename with 301 |
| 19 | looking-beyond-photo-frames-try-these-personalized-photo-gift-ideas-vrrphy | Looking Beyond Photo Frames? Try These Personalized Photo Gift Ideas | 515 | 0 | keep; improve meta + H1 as needed |
| 20 | moving-away-give-a-personalized-gift-theyand-39-ll-always-remember | Moving Away? Give a Personalized Gift They'll Always Remember | 530 | 0 | keep; improve: handle is wrong or messy, rename with 301 |
| 21 | heartwarming-personalized-gifts-every-grandparent-will-love-mxezkd | Heartwarming Personalized Gifts Every Grandparent Will Love | 668 | 1 | keep; improve meta + H1 as needed |
| 22 | duplicate-from-celebrate-the-pets-who-fill-your-home-with-love | Celebrate the Pets Who Fill Your Home with Love | 621 | 1 | keep; improve: handle is wrong or messy, rename with 301 |
| 23 | how-custom-photo-mosaics-become-beautiful-home-decor-qsfiky | How Custom Photo Mosaics Become Beautiful Home Decor | 724 | 0 | keep; improve meta + H1 as needed |
| 24 | thoughtful-thanksgiving-gifts-that-bring-families-closer-together-aug-8-10 | Thoughtful Thanksgiving Gifts That Bring Families Closer Together | 914 | 0 | keep; improve meta + H1 as needed |
| 25 | duplicate-from-how-to-preserve-your-favorite-travel-memories-in-a-unique-way | How to Preserve Your Favorite Travel Memories in a Unique Way | 382 | 0 | keep; improve: handle is wrong or messy, rename with 301 |
| 26 | birthday-photos-that-deserve-to-become-more-than-memories | Birthday Photos That Deserve to Become More Than Memories | 934 | 1 | keep; improve meta + H1 as needed |
| 27 | from-screen-to-keepsake-turn-their-favorite-character-into-something-special | From Screen to Keepsake: Turn Their Favorite Character Into Something Special | 823 | 1 | keep; improve meta + H1 as needed |
| 28 | copy-of-why-your-funniest-photos-might-make-the-best-keepsakes | Made With Heart: The Human Touch Behind Every Memobrick | 999 | 1 | keep; improve: handle is wrong or messy, rename with 301 |
| 29 | what-if-your-next-gift-was-also-an-experience | What If Your Next Gift Was Also an Experience? | 1395 | 1 | keep; improve meta + H1 as needed |
| 30 | the-best-keepsakes-come-from-the-moments-you-least-expect | The Best Keepsakes Come From the Moments You Least Expect | 1247 | 0 | keep; "everyday moments" cluster, link together |
| 31 | why-personalized-gifts-feel-so-much-better-than-generic-gifts | Why Personalized Gifts Feel So Much Better Than Generic Gifts | 1047 | 2 | keep: **personalized-gift hub**; fix double H1 |
| 32 | turn-your-childs-imagination-into-something-you-can-build | Turn Your Child's Imagination Into Something You Can Build | 1109 | 0 | keep; improve meta + H1 as needed |
| 33 | the-christmas-gift-that-turns-a-favorite-moment-into-an-experience | The Christmas Gift That Turns a Favorite Moment Into an Experience | 1803 | 1 | keep; link to Christmas hub |
| 34 | some-memories-deserve-more-than-a-place-on-your-phone | Some Memories Deserve More Than a Place on Your Phone | 1369 | 1 | keep; "everyday moments" cluster, link together |
| 35 | the-gift-they-will-want-to-show-everyone | The Gift They Will Want to Show Everyone | 1313 | 1 | keep; improve meta + H1 as needed |
| 36 | the-gift-that-starts-a-conversation | The Gift That Starts a Conversation | 1500 | 1 | keep; improve meta + H1 as needed |
| 37 | why-your-funniest-photos-might-make-the-best-keepsakes | Why Your Funniest Photos Might Make the Best Keepsakes | 877 | 1 | keep; "everyday moments" cluster, link together |
| 38 | the-most-fun-christmas-gifts-are-the-ones-you-create-together | The Most Fun Christmas Gifts Are the Ones You Create Together | 823 | 0 | improve now; merge candidate into hub `dont-wait-until-december...` after Jan 2027 if GSC shows overlap (same "build together" angle, text overlap ≤0.09) |
| 39 | from-little-drawings-to-lasting-memories-turn-their-art-into-a-keepsake | From Little Drawings to Lasting Memories: Turn Their Art Into a Keepsake | 1052 | 1 | keep; improve meta + H1 as needed |
| 40 | the-little-moments-in-life-that-deserve-a-place-on-your-wall | The Little Moments in Life That Deserve a Place on Your Wall | 997 | 0 | keep; "everyday moments" cluster, link together |
| 41 | baby-carrier-aug-14-20-11-55 | For the Rider Who Has a Story Behind Every Ride | 930 | 2 | keep; improve: handle is wrong or messy, rename with 301 |
| 42 | the-art-on-your-wall-should-have-a-story | The Art on Your Wall Should Have a Story | 1443 | 0 | keep; "everyday moments" cluster, link together |
| 43 | this-christmas-give-them-a-memory-they-can-build | This Christmas, Give Them a Memory They Can Build | 1618 | 0 | improve now; merge candidate into hub `dont-wait-until-december...` after Jan 2027 if GSC shows overlap (same "build together" angle, text overlap ≤0.09) |
| 44 | turn-your-favorite-couple-photos-into-something-you-can-treasure | Turn Your Favorite Couple Photos Into Something You Can Treasure | 820 | 0 | keep; improve meta + H1 as needed |
| 45 | make-your-holiday-gathering-more-than-just-dinner | Make Your Holiday Gathering More Than Just Dinner | 1038 | 1 | keep; link to Christmas hub |
| 46 | the-photos-you-almost-deleted-could-become-your-favorite-keepsakes | The Photos You Almost Deleted Could Become Your Favorite Keepsakes | 1508 | 1 | keep; "everyday moments" cluster, link together |
| 47 | the-perfect-gift-for-someone-who-loves-their-car | The Perfect Gift for Someone Who Loves Their Car | 1236 | 1 | keep; improve meta + H1 as needed |
| 48 | mothers-day-gifts-that-turn-favorite-memories-into-keepsakes | Mother's Day Gifts That Turn Favorite Memories Into Keepsakes | 834 | 0 | keep; improve meta + H1 as needed |
| 49 | a-holiday-activity-everyone-can-actually-join | A Holiday Activity Everyone Can Actually Join | 1677 | 1 | keep; link to Christmas hub |
| 50 | building-art-one-piece-at-a-time | Building Art One Piece at a Time | 1431 | 0 | keep; improve meta + H1 as needed |
| 51 | turn-your-favorite-family-stories-into-something-you-can-see | Turn Your Favorite Family Stories Into Something You Can See | 794 | 1 | keep; improve meta + H1 as needed |
| 52 | give-more-than-a-gift-personalized-christmas-memories-to-build-together-yfpbkl | Give More Than a Gift: Personalized Christmas Memories to Build Together | 684 | 1 | improve now; merge candidate into hub `dont-wait-until-december...` after Jan 2027 if GSC shows overlap (same "build together" angle, text overlap ≤0.09) |
| 53 | dont-wait-until-december-personalized-christmas-gifts-to-order-now | Don't Wait Until December: Personalized Christmas Gifts to Order Now | 1078 | 1 | keep: **Christmas hub** (order-now intent). Improve: add links to all Christmas posts below |
| 54 | make-christmas-memories-last-personalized-gifts-theyll-treasure-for-years-qcaqov | Make Christmas Memories Last: Personalized Gifts They'll Treasure for Years | 967 | 1 | keep; link to Christmas hub |
