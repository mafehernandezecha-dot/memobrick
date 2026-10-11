# Site change: Retire the duplicate "Perfect Holiday Gift" article

Source: site-changes-2026-10-11.md item 1

Where: Shopify admin, under Blog posts and under Navigation > URL redirects.

**Before:**

- `/blogs/news/ikram-gempages-the-perfect-holiday-gift-for-mindful-creativity` is published, with SEO title "[Ikram GemPages] The Perfect Holiday Gift for Mindful Creativity". It has 98% overlap with `/blogs/news/theperfect-holiday`.
- A redirect exists from `/blogs/news/theperfect-holiday` to `https://mymemobrick.com/`. It is dormant while the article is live.

**After:**

1. Delete the redirect `/blogs/news/theperfect-holiday` → `https://mymemobrick.com/`.
2. Set article `gid://shopify/Article/591273525468` to hidden (unpublished). Do not delete it.
3. Add the redirect `/blogs/news/ikram-gempages-the-perfect-holiday-gift-for-mindful-creativity` → `/blogs/news/theperfect-holiday`.

**Verify:** the old URL returns a 301 to `theperfect-holiday`, and that page returns 200.
