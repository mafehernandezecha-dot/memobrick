# Site change: Add BlogPosting and breadcrumb schema to GemPages article templates

Source: site-changes-2026-10-11.md item 5

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
