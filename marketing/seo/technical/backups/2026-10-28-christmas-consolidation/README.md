# Backup before A-2026W44-022 (Christmas consolidation), read 2026-10-28 via Admin API

The 8 articles are only unpublished (isPublished true -> false). Their title, handle, body, template and SEO fields are not changed, and they stay saved in Shopify and GemPages. To undo one: set isPublished true and delete its new redirect.

## The 8 articles (all were published)

| # | Article ID | Handle | Title | templateSuffix | publishedAt | SEO title | SEO description |
|---|---|---|---|---|---|---|---|
| 1 | 591249015004 | theperfect-holiday | The Perfect Holiday Gift for Mindful Creativity | gem-591249015004-template | 2023-11-01T19:13:02Z | The Perfect Holiday Gift for Mindful Creativity - Memobrick | Unleash the magic of the holidays with Memobrick - the gift of creativity, mindfulness, and togetherness. Create custom brick mosaics that inspire and connect, making this season truly unforgettable Thoughtful Gifts |
| 2 | 751466414300 | the-christmas-gift-that-turns-a-favorite-moment-into-an-experience | The Christmas Gift That Turns a Favorite Moment Into an Experience | gp-template-634844063287214610 | 2026-09-06T09:22:07Z | none | none |
| 3 | 751466741980 | this-christmas-give-them-a-memory-they-can-build | This Christmas, Give Them a Memory They Can Build | gp-template-635418409265267561 | 2026-09-06T09:55:10Z | none | none |
| 4 | 751467364572 | dont-wait-until-december-personalized-christmas-gifts-to-order-now | Don't Wait Until December: Personalized Christmas Gifts to Order Now | gp-template-632339855845622757 | 2026-09-06T10:14:01Z | none | none |
| 5 | 751467397340 | make-christmas-memories-last-personalized-gifts-theyll-treasure-for-years-qcaqov | Make Christmas Memories Last: Personalized Gifts They'll Treasure for Years | gp-template-632355906591392405 | 2026-09-06T10:14:38Z | none | none |
| 6 | 751466578140 | the-most-fun-christmas-gifts-are-the-ones-you-create-together | The Most Fun Christmas Gifts Are the Ones You Create Together | gp-template-632369708703679125 | 2026-09-06T09:29:49Z | none | none |
| 7 | 751467331804 | give-more-than-a-gift-personalized-christmas-memories-to-build-together-yfpbkl | Give More Than a Gift: Personalized Christmas Memories to Build Together | gp-template-632361451545166485 | 2026-09-06T10:13:27Z | none | none |
| 8 | 751466807516 | make-your-holiday-gathering-more-than-just-dinner | Make Your Holiday Gathering More Than Just Dinner | gp-template-636010617324438182 | 2026-09-06T09:58:22Z | none | none |

No redirect pointed at articles 2 to 8, and no redirect existed at any of the 8 paths.

## Redirects changed (target before)

| ID | Path | Target before |
|---|---|---|
| 607155814620 | /blogs/news/ikram-gempages-the-perfect-holiday-gift-for-mindful-creativity | /blogs/news/theperfect-holiday |
| 445674651868 | /blogs/news/theperfect-holiday-thoughtful-gifts | https://mymemobrick.com/ |
| 445291987164 | /blogs/news/theperfect-holiday-thoughtful%20gifts | https://mymemobrick.com/ |
| 445706600668 | /blogs/news/theperfect-holiday-thoughtful-gifts?fbclid=iwzxh0bgnhzw0cmteaar5xmniwb7scuw20e0mqqraslifbbrb4bb_i_hjr-ulp9dtt-tplngqkgowdcq_aem_3ooyayaegi7fwdic9-rafa | https://mymemobrick.com/ |
| 445706633436 | ...?fbclid=iwzxh0bgnhzw0cmteaar7e2cu5trspmobq0_czzwvuyn8qjdypujbrywmvd6u-pgxlo4xnroq1ubzbva_aem_ep5-xfgeju42nfieyxy-hq | https://mymemobrick.com/ |
| 445706666204 | ...?fbclid=iwzxh0bgnhzw0cmteaar4gg77cw3whmy9zmooiky2x5dyvnexvo2b2cgazsvuhqsawhhudnf3qbkxoga_aem_laipv7crj5yqizrnstalrw | https://mymemobrick.com/ |
| 445706698972 | ...?fbclid=iwzxh0bgnhzw0cmteaar4r02yceiv73gfrae7fcoc-oghj8yabs353lkclxohgaos1rzhahjujh9stmw_aem_3w7m8vbzd2tnnypc51pwnw | https://mymemobrick.com/ |
| 445707059420 | ...?fbclid=iwzxh0bgnhzw0cmteaar40uagqry01kxcb71twm_vmqs0t94qfnx2jcbmpldug-v2fdtopxsybczv0fa_aem_f76ifrt037c33hdayrhiza | https://mymemobrick.com/ |
| 445707092188 | ...?fbclid=iwzxh0bgnhzw0cmteaar6vdb7euyuofmwmejt-ssmthg2i8l0cxhga0pmmcq2lsyw_akcatahgvfd2-q_aem_ms4auhvhcjdff6qh3ucmug | https://mymemobrick.com/ |
| 445707124956 | ...?fbclid=iwzxh0bgnhzw0cmteaar7uj8tndo9ux8vqwgv9hfam8yqmcptyl8oozvd4phjgp1gdshu1ngjynsjnxw_aem_gfft-naq-77vx-wbyrggxa | https://mymemobrick.com/ |
| 445707157724 | ...?fbclid=iwzxh0bgnhzw0cmteaar58u9huo79zitut-olomtwki6xwmhpglxbcnvfmpgqrhilvstcmyfxcazqgsq_aem_hmdxnyeuxn-kcdns2x6emq | https://mymemobrick.com/ |

(`...` = `/blogs/news/theperfect-holiday-thoughtful-gifts`)

## Hub A (Article 751864185052, default template, updatedAt 2026-10-14T02:48:05Z)

Full body before the link fixes: `hub-a-body-before.html` in this folder.
