# Task ID: 4

**Title:** Build Editorial Product Card Snippet

**Status:** pending

**Dependencies:** 1, 3

**Priority:** high

**Description:** Create the core reusable product card component (snippets/card-product.liquid) with 3:4 aspect ratio, hover effects, and minimal metadata display

**Details:**

Implementation:
1. Create snippets/card-product.liquid accepting card_product parameter
2. Create assets/component-card.css for styling
3. Structure:
   - Wrapper <div class="card-product">
   - Link wrapping entire card ({{ card_product.url }})
   - Image container with 3:4 aspect ratio (padding-bottom: 133.33%)
   - Primary image with loading="lazy"
   - Secondary image (card_product.media[1]) for hover fade
   - Badge overlay for sale/new (if applicable)
   - Info section: Title, Price (using snippets/price.liquid), Color swatch
4. CSS: Desktop hover triggers opacity transition on secondary image
5. Entire card clickable (no separate Add to Cart button)
6. Use Shopify image_url filter with width parameter and format: 'avif'

Pseudo-code:
<div class="card-product">
  <a href="{{ card_product.url }}" class="card-product__link">
    <div class="card-product__media" style="padding-bottom: 133.33%; position: relative;">
      <img src="{{ card_product.featured_image | image_url: width: 600, format: 'avif' }}" 
           loading="lazy" 
           class="card-product__image card-product__image--primary">
      {% if card_product.media[1] %}
        <img src="{{ card_product.media[1] | image_url: width: 600, format: 'avif' }}" 
             class="card-product__image card-product__image--secondary">
      {% endif %}
    </div>
    <div class="card-product__info">
      <h3 class="card-product__title">{{ card_product.title }}</h3>
      {% render 'price', product: card_product %}
    </div>
  </a>
</div>

CSS:
.card-product__image--secondary { opacity: 0; transition: opacity 0.3s; }
.card-product:hover .card-product__image--secondary { opacity: 1; }

**Test Strategy:**

1. Test with products having 1 image vs multiple images
2. Verify 3:4 aspect ratio maintained across all viewport sizes
3. Test hover effect on desktop (smooth fade)
4. Verify lazy loading works (check Network tab)
5. Test with sale products to ensure badge displays
6. Validate entire card is clickable (no dead zones)
7. Check AVIF format fallback for unsupported browsers

## Subtasks

### 4.1. Create Liquid Template Structure and CSS File

**Status:** pending  
**Dependencies:** None  

Build the core HTML structure for snippets/card-product.liquid and create assets/component-card.css with basic card wrapper, link, media container, and info section.

**Details:**

Implement div.card-product wrapper, a href link around entire card, 3:4 aspect ratio media container using padding-bottom:133.33%, primary/secondary image placeholders, title h3, and price render call. Add basic CSS positioning.

### 4.2. Implement Image Handling and Hover Effects

**Status:** pending  
**Dependencies:** 4.1  

Add Shopify image_url filters with AVIF format and width:600, lazy loading for primary image, conditional secondary image from card_product.media[1], and CSS hover opacity transition.

**Details:**

Use {{ card_product.featured_image | image_url: width: 600, format: 'avif' }} for primary, same for media[1] if exists. CSS: .card-product__image--secondary {opacity:0; transition:opacity 0.3s;} .card-product:hover .card-product__image--secondary {opacity:1;}.

### 4.3. Add Info Section, Price Snippet, and Badge Logic

**Status:** pending  
**Dependencies:** 4.1  

Complete card-product.liquid with product title display, {% render 'price', product: card_product %}, color swatch placeholder, and conditional sale/new badges as overlays.

**Details:**

Add badge logic checking product tags or compare_at_price > price for sale/new badges positioned absolutely over media. Ensure price snippet integration works with Task 5 dependency. Style info section with proper typography and spacing.
