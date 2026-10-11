# Site change: Remove the hardcoded rating from Product schema

Source: site-changes-2026-10-11.md item 4

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
