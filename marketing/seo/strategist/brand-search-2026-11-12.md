# Brand search check, 2026-11-12

Owner: seo-strategist (Mariana). Task board 2026-11-12: home page search visits fell by two thirds. Do brand searches land on coupon sites, resellers or competitors instead of our home page?

**How it was checked, and what it can't show.** I used the web search tool in this environment (US results). It is **not Google**. It shows no ads and no Google ranking positions, so it can't say whether a competitor's Google ad sits above us on "memobrick". Those two facts need a Google results page or Search Console data, so I requested both in `marketing/data/requests.md` (2026-11-12 line). I also fetched the home page HTML directly (200 OK).

## The 4 queries

| Query | Who shows first | Who takes the click | Is our site there? | Any result sending people away from our home page? |
|---|---|---|---|---|
| memobrick | MIT Media Lab "programmable bricks" page, then the Etsy shop **Memory Bricks** (etsy.com/shop/MemoryBricks), a different seller of brick keepsakes | No coupon site or reseller. The Etsy shop "Memory Bricks" is the nearest buyer-relevant result, and its name is close to ours | **No.** mymemobrick.com is not in the top 10 | Yes. The only shopping result is the Etsy shop Memory Bricks, a different brand with a similar name |
| memo brick | Etsy **Memory Bricks**, then engraved memorial brick sellers (comforthouse.com, bricksrus.com, fundraisingbrick.com) and memo pads | Engraved memorial bricks and stationery. A Brick Me press page (presshook.com/brands/brick-me) also shows up | **No** | Yes. Etsy Memory Bricks plus a **Brick Me** listing (competitor) |
| memobrick reviews | thingtesting.com/brands/**minebrick** (a different photo-to-brick-figure brand), then reviews of the "Brick" phone blocker | Minebrick (similar brand, different product) and the Brick app. Neither is a review site about us | **No.** No Loox, Trustpilot or other review page for Memobrick shows | Yes. The top result is a page about a similar-sounding brand |
| memobrick coupon | Unrelated coupon pages (Brick Loot 2018, memobottle on DealDrop, MyMemo on dev.to) | Nothing for Memobrick. **No coupon site lists a Memobrick code** (checked "memobrick discount code" too) | **No** | No coupon leak found. The pages that show are for other brands |

Control checks:
- **"memobrick" limited to mymemobrick.com** returns our home page, products, How it works, About us and frames. The site is in this index. It just does not come up for its own name when the search covers the whole web.
- **"mymemobrick"** returns Etsy Memory Bricks, the MyMemo app and Brick Me. Our site does not show.
- **"memobrick brick mosaic photo kit"** returns only Brick Me, Mozabrick and ArtPix3D.

## What this means

1. **No coupon-site or reseller leak was found.** No page lists a Memobrick code or resells our kits. That part of the worry can be ruled out, at least in this index.
2. **The real problem is that the brand name is weak in this index.** A plain-name search does not return our home page. Pages with similar names take the space: Memory Bricks on Etsy, Minebrick, MyMemo, memobottle. Brick Me also shows on the product-type query. If Google behaves the same way, some people who hear "Memobrick" (from FOX, word of mouth or a gift card) end up on Etsy or Brick Me. This is unconfirmed until the Google results page and Search Console brand-query data come in.
3. **Two home page issues on our side probably make it worse** (seen in the HTML today; handed to seo-technical, not proposed by me):
   - The home page has **two `<title>` tags**. Line 10 says `Build Your Own Bricked Mosaic | Memobrick`. Line 659 says `Build Your Own Bricked Mosaic | Memobrick | Memobrick`. That is the known SearchPie second title (seo-technical, applied-2026-10-28). Turning SearchPie off fixes it: that was A-2026W44-025, now re-proposed as A-2026W46-009. Nothing new to ask. The title also starts with a generic phrase, not the brand plus product. A cleaner single title would be something like "Memobrick | Custom Brick Mosaic Kits From Your Photo".
   - The meta description is old copy ("an brick picture", missing space after "bricks.") and doesn't say "custom brick mosaic" or "photo".
   - The Organization schema exists (2 blocks) but I found no `sameAs` links to our Instagram, Facebook, TikTok or Pinterest. Those links help search engines tie the name "Memobrick" to one brand.
4. **What would change orders:** brand searchers are the warmest traffic there is. If even part of the home page drop comes from brand searches landing on Etsy or Brick Me, fixing the single title and the description is free and quick. It needs one Eden or seo-technical change on the home page template, which belongs to the theme or GemPages, not to me.

## Next

- Read the Google results page and Search Console brand queries ("memobrick", "memo brick", "my memobrick", "memobrick reviews", "memobrick coupon": position, CTR and landing page) once the Mac pull brings them (request filed 2026-11-12).
- Double title: point to A-2026W46-009 (SearchPie off). Don't open a new item (task board rule 2).
- Seo-technical: add the home page title and description rewrite and the `sameAs` links to `content-fixes.md` the next time it opens a home page change.

Sources: web search results (2026-11-12), including etsy.com/shop/MemoryBricks, thingtesting.com/brands/minebrick, presshook.com/brands/brick-me, brick.me, dealdrop.com/memobottletm; mymemobrick.com home page HTML fetched 2026-11-12.
