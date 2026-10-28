# What needs Eden, 2026-10-28 (after applying A-2026W44-022 to 026)

Everything the Shopify connector could do is done (see `marketing/reports/2026-10-28-seo-technical.md`). Three things are left for you, in this order.

## 1. Switch off SearchPie's duplicate title and description (A-2026W44-025), 2 to 5 minutes

Why: every page has two `<title>` tags and two meta descriptions. The second set comes from the SearchPie app. On 36 blog articles the only description Google finds is "  Memobrick". The connector cannot do this: Shopify blocks app tools from changing the live theme, and the SearchPie app settings are only reachable in your admin.

Backup already saved: `marketing/seo/technical/backups/2026-10-28-searchpie/` (the live `config/settings_data.json`, checksum matched).

**Try A first (keeps SearchPie's other features):**

1. Shopify admin > **Apps** > **SearchPie SEO & Speed**.
2. Look for the meta tags feature: a section named something like **Meta tags**, **Meta title & description**, **Bulk meta tags** or **SEO templates**. If it has an on/off switch for writing meta title and meta description tags on the storefront, switch it **off** and save. Leave every other SearchPie feature as it is.
3. If you cannot find a switch that only does that, use B.

**B, if A has no such switch (the approved fallback):**

1. Shopify admin > **Online Store** > **Themes**.
2. On the live theme **Memobrick holiday gift boxes**, click **Customize**.
3. In the left sidebar, click the **App embeds** icon (in the icon column on the far left).
4. Find **SearchPie SEO & Speed** and switch it **off**. Do not touch any other embed (Avada SEO Suite, GemPages, Loox, Omnisend and the rest stay as they are).
5. Click **Save** (top right).

What B also turns off, so you know: SearchPie's broken-link detector, internal links, social tags, local SEO, and its JSON-LD. I checked the live pages: the theme already writes Open Graph tags, Organization and WebSite data, and breadcrumbs on the default-template articles. **One loss:** on GemPages articles, the only breadcrumb data (BreadcrumbList) comes from SearchPie, so B removes it there. That is a small loss next to the junk titles; approved item A-2026W41-014 (article schema in the theme) would put it back, and it still needs a theme edit too.

**Check after (1 minute):** open https://mymemobrick.com/blogs/news, right click > **View Page Source**, press Cmd+F and search `<title`. You should see it once. Search `SearchPie meta tags`: it should not be found. Then tell me (or the next seo-technical run checks it).

**Undo:** switch the setting or the embed back on.

## 2. Search Console (A-2026W44-026)

Open `marketing/seo/technical/chrome-tasks/2026-10-28-search-console-indexing.md`. The top of the file says what to paste: **Part A** today (after step 1 if you can), **Part B** on Oct 29 or later.

## 3. GemPages edits (optional, not urgent)

`marketing/seo/technical/gempages-changes-2026-10-28.md` is updated:
- The FOX retitle (A-2026W44-024) needs **no** GemPages edit. No published article shows "Fox News" now. Only the homepage still does (site developer's area).
- Item 1 (links on the holiday activity hub, now the Christmas family hub) is the one that matters most for sales.
- New item 6: two GemPages articles still link to old addresses. They work through the 301s; update them when you are in the editor anyway.
