# Proposed site changes, 2026-10-11 (DRY RUN, nothing applied)

Each change is a `site-change` item in `marketing/reports/2026-10-11-seo-technical.md`. Apply only the items that are approved, and apply exactly what is written below.

## 1. Retire the duplicate "Perfect Holiday Gift" article

Where: Shopify admin, under Blog posts and under Navigation > URL redirects.

**Before:**

- `/blogs/news/ikram-gempages-the-perfect-holiday-gift-for-mindful-creativity` is published, with SEO title "[Ikram GemPages] The Perfect Holiday Gift for Mindful Creativity". It has 98% overlap with `/blogs/news/theperfect-holiday`.
- A redirect exists from `/blogs/news/theperfect-holiday` to `https://mymemobrick.com/`. It is dormant while the article is live.

**After:**

1. Delete the redirect `/blogs/news/theperfect-holiday` → `https://mymemobrick.com/`.
2. Set article `gid://shopify/Article/591273525468` to hidden (unpublished). Do not delete it.
3. Add the redirect `/blogs/news/ikram-gempages-the-perfect-holiday-gift-for-mindful-creativity` → `/blogs/news/theperfect-holiday`.

**Verify:** the old URL returns a 301 to `theperfect-holiday`, and that page returns 200.

## 2. Retire the duplicate summer souvenirs page

**Before:** `/pages/blog-post` is published (template `page.gp-template-627889406102995579`). It is identical to the article at `/blogs/news/duplicate-from-the-best-summer-vacation-souvenirs-arenand-39-t-bought-theyand-39-re-built`.

**After:**

1. Hide page `blog-post`. Do not delete it.
2. Add the redirect `/pages/blog-post` → `/blogs/news/duplicate-from-the-best-summer-vacation-souvenirs-arenand-39-t-bought-theyand-39-re-built`.

## 3. Fix the wrong redirect and the broken link to the "emotional connections" article

**Before:**

- The redirect `/blogs/news/why-personalized-gifts-create-stronger-emotional-connections` points to `/blogs/news/graduation-gift-ideas-theyll-treasure-forever`. That is the wrong article.
- The graduation article body links to `/blogs/news/why-personalized-gifts-create-stronger-emotional-connections-2`. No article or redirect exists at that path.

**After:**

1. Edit the redirect `/blogs/news/why-personalized-gifts-create-stronger-emotional-connections` so its target is `/blogs/news/test-blog-post-07072026`.
2. Add the redirect `/blogs/news/why-personalized-gifts-create-stronger-emotional-connections-2` → `/blogs/news/test-blog-post-07072026`.

## 4. Remove the hardcoded rating from Product schema

Where: live theme file `templates/product.liquid`, inside the `application/ld+json` Product block.

**Before:**

```liquid
    {%- if product.selected_or_first_available_variant.sku != blank %}
    "sku": {{ product.selected_or_first_available_variant.sku | json }},
    {%- endif %}
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "747" },
    "offers": {
```

**After:**

```liquid
    {%- if product.selected_or_first_available_variant.sku != blank %}
    "sku": {{ product.selected_or_first_available_variant.sku | json }},
    {%- endif %}
    "offers": {
```

**Why:** a fixed 4.8 rating from 747 reviews is currently stamped on every product, including products with no reviews. Google's review-snippet policy requires the rating to belong to the specific item. A violation risks a manual action that removes stars from every result.

**Follow-up for the owner, not part of this item:** if Loox stores per-product ratings in metafields, add an `aggregateRating` built from those values. Check first that Loox does not already inject its own rating schema.

## 5. Add BlogPosting and breadcrumb schema to GemPages article templates

Where: live theme file `layout/theme.liquid`, directly after the closing `</script>` of the WebSite JSON-LD block.

**Before:**

```liquid
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": {{ shop.name | json }},
    "url": {{ request.origin | append: '/' | json }}
  }
  </script>

  {%- comment -%}
    Shopify requires content_for_header for analytics, apps and checkout.
```

**After:**

```liquid
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": {{ shop.name | json }},
    "url": {{ request.origin | append: '/' | json }}
  }
  </script>
  {%- if template.name == 'article' and template.suffix != blank -%}
  {%- comment -%} GemPages article templates skip article.liquid, so they get no BlogPosting/Breadcrumb schema. Default-template articles already output it in article.liquid. {%- endcomment -%}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": {{ article.title | json }},
    "datePublished": {{ article.published_at | date: '%Y-%m-%d' | json }},
    {%- if meta_description != blank %}"description": {{ meta_description | json }},{% endif -%}
    {%- if article.image %}"image": {{ article.image | image_url: width: 1200 | prepend: 'https:' | json }},{% endif -%}
    "publisher": { "@type": "Organization", "name": {{ shop.name | json }} },
    "mainEntityOfPage": {{ canonical_url | json }}
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": {{ shop.name | json }}, "item": {{ request.origin | append: '/' | json }} },
      { "@type": "ListItem", "position": 2, "name": {{ blog.title | json }}, "item": {{ blog.url | prepend: request.origin | json }} },
      { "@type": "ListItem", "position": 3, "name": {{ article.title | json }}, "item": {{ canonical_url | json }} }
    ]
  }
  </script>
  {%- endif -%}

  {%- comment -%}
    Shopify requires content_for_header for analytics, apps and checkout.
```

**Notes:**

- The `template.suffix != blank` guard skips default-template articles, which already output this schema from `article.liquid`. That includes the graduation article, whose assigned template is missing, so Shopify serves it from `article.liquid`.
- **Verify the guard on that article first.** It is not certain whether `template.suffix` stays set on graduation even though Shopify serves it from `article.liquid`. If it does, graduation would get BlogPosting and Breadcrumb schema twice.
- The author field is left out on purpose: every GemPages article is authored "GemPages".
- After publishing, test 3 articles with the Rich Results Test.
