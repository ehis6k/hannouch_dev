# Task ID: 5

**Title:** Create Shared Price Snippet

**Status:** pending

**Dependencies:** 1

**Priority:** medium

**Description:** Build a reusable price display snippet (snippets/price.liquid) that handles regular, sale, and compare-at pricing with proper semantic markup

**Details:**

Implementation:
1. Create snippets/price.liquid accepting product parameter
2. Logic to detect sale pricing (compare_at_price > price)
3. Display structure:
   - Regular price in <span class="price">
   - Compare-at price in <s class="price--compare">
   - Sale badge if applicable
4. Use Shopify money filters with proper currency formatting
5. Add microdata for SEO (schema.org/Offer)
6. Handle variant price ranges (from $X)

Pseudo-code:
{% if product.compare_at_price > product.price %}
  <div class="price price--on-sale">
    <span class="price__sale">
      {{ product.price | money }}
    </span>
    <s class="price__compare">
      {{ product.compare_at_price | money }}
    </s>
  </div>
{% else %}
  <div class="price">
    <span class="price__regular">
      {{ product.price | money }}
    </span>
  </div>
{% endif %}

**Test Strategy:**

1. Test with regular priced products
2. Test with sale products (compare_at_price set)
3. Test with variant price ranges
4. Verify currency formatting for different locales
5. Validate semantic HTML (proper use of <s> for strikethrough)
6. Check screen reader announcement of prices

## Subtasks

### 5.1. Implement Core Price Logic for Regular, Sale, and Compare-at Pricing

**Status:** pending  
**Dependencies:** None  

Create the foundational Liquid logic in snippets/price.liquid to detect pricing states (regular, sale with compare-at) and render appropriate price structures using Shopify money filters.

**Details:**

Accept product parameter; use conditional logic if product.compare_at_price > product.price; display sale price in price__sale span, compare-at in strikethrough price__compare; fallback to regular price display; ensure proper currency formatting with | money filter. Reference pseudo-code provided.
