# Etsy shop check, 2026-11-13

Agent: seo-strategist (Mariana). Task board row of 2026-11-13. Read-only and public only: no login, no contact, no order or customer data.

**Direct fetch failed.** `https://www.etsy.com/shop/Memobrick` and `https://www.etsy.com/search/shops?search_query=memobrick` both returned `getaddrinfo ENOTFOUND www.etsy.com`. etsy.com is outside this cloud session's allowed network domains, so the live page could not be read. Everything below comes from web search results, which are cached snapshots with no date on them, plus one earlier internal finding.

| Check | What the evidence shows | Source and confidence |
|---|---|---|
| Listed | **Yes, in the search index.** The shop page `etsy.com/at/shop/Memobrick` and at least 12 Memobrick listing URLs are still indexed (for example listing/1305530723, 1305534563, 970408526, 1226316928, 1067051249, 1776176051). Plain "memobrick etsy" searches return Etsy "Memory Bricks" (a different seller) instead, so our shop does not come first for its own name. | Web search 2026-11-13. Snapshots, not live. |
| Status (open, on vacation, closed) | **Most likely closed for good, not on vacation.** The conversion audit of 2026-10-26 (Wilson, store Gmail: sender, subject and date only) found an Etsy Trust and Safety email saying the shop was **permanently suspended on 2026-05-18 for intellectual property reports**, with **appeals denied May 22 and Jul 30**. Etsy "You made a sale" emails stop on May 18. The last manual Etsy order typed into Shopify is May 25. The search snippets that look active (Star Seller, sale prices) are old cached copies, and their dates disagree with each other. No snippet shows "on vacation". | `marketing/conversion/auditor/audit-2026-10-26.md`, lines 5 to 16. Live status still needs Eden to look. |
| Active listing count | **Unknown.** Search shows at least 12 listing URLs in the index. Whether any are live cannot be checked from here. | Web search. |
| Newest public review | **Unknown.** Snippets show "4.9 (870) reviews", "4.7k sales" and in another copy "800+ reviews, 4.8k to 4.9k sales", all without dates. No review date was visible. | Web search. |

## What this means for the owner's decision

- The task board assumed the shop might be on vacation, so one switch could bring back about 12 orders a day in December. The internal evidence says otherwise: a permanent suspension with two denied appeals. If that is still true, the Etsy orders will not come back before Christmas by any switch, and the plan has to win those buyers on mymemobrick.com instead.
- The question for Eden becomes: "Is the May 18 Etsy suspension still final, or did anything change after the Jul 30 appeal?" That is a yes or no from her Etsy inbox.
- Search side: old Etsy listings for "Memobrick" are still indexed. Someone who searches "memobrick etsy" and lands on a dead listing is a lost buyer unless they find the site. That makes the home page title and description fix (A-2026W46-009 plus the brand-first title handed to seo-technical on 2026-11-12) more urgent, so that brand searches end on mymemobrick.com.

Sources: web search results 2026-11-13 (etsy.com/at/shop/Memobrick, etsy.com/market/memobrick, etsy.com/listing/1305530723, /1305534563, /970408526, /1226316928, /1067051249, /1776176051, /1155174577, /1201458506, etsy.com/shop/MemoryBricks); `marketing/conversion/auditor/audit-2026-10-26.md`.
