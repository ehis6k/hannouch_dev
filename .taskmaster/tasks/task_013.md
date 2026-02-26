# Task ID: 13

**Title:** Build Product Detail Page (PDP)

**Status:** pending

**Dependencies:** 1, 5, 7, 8

**Priority:** high

**Description:** Create sections/main-product.liquid with sticky info panel, vertical gallery, variant selector, and accordion details

**Details:**

Implementation:
1. Create sections/main-product.liquid
2. Desktop layout:
   - Left: Vertical scrolling gallery (60% width)
   - Right: Sticky info panel (40% width)
3. Mobile: Swipeable carousel for images, info below
4. Gallery features:
   - Click to open lightbox (desktop)
   - Swipe navigation (mobile)
   - Thumbnail navigation
5. Variant selector:
   - Radio buttons for color/size
   - Update price and URL on change
   - Disable unavailable variants
6. Add to Cart button triggers cart drawer
7. Accordions for:
   - Size Guide
   - Care Instructions
   - Shipping Info
8. Use Shopify product.media for gallery

Pseudo-code:
<div class="product">
  <div class="product__gallery">
    {% for media in product.media %}
      <div class="product__gallery-item">
        <img src="{{ media | image_url: width: 1200, format: 'avif' }}" 
             loading="lazy" 
             data-media-id="{{ media.id }}">
      </div>
    {% endfor %}
  </div>
  
  <div class="product__info">
    <h1>{{ product.title }}</h1>
    {% render 'price', product: product %}
    
    <form action="/cart/add" method="post" data-product-form>
      <div class="product__variants">
        {% for option in product.options_with_values %}
          <fieldset>
            <legend>{{ option.name }}</legend>
            {% for value in option.values %}
              <input type="radio" 
                     name="{{ option.name }}" 
                     value="{{ value }}" 
                     id="{{ option.name }}-{{ value }}">
              <label for="{{ option.name }}-{{ value }}">{{ value }}</label>
            {% endfor %}
          </fieldset>
        {% endfor %}
      </div>
      
      <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
      <button type="submit" class="button button--primary">Add to Cart</button>
    </form>
    
    <div class="product__accordions">
      <details>
        <summary>Size Guide</summary>
        <div>{{ product.metafields.custom.size_guide }}</div>
      </details>
      <details>
        <summary>Care Instructions</summary>
        <div>{{ product.metafields.custom.care_instructions }}</div>
      </details>
    </div>
  </div>
</div>

JS:
class ProductForm extends HTMLElement {
  connectedCallback() {
    this.form = this.querySelector('form');
    this.form.addEventListener('submit', this.onSubmit.bind(this));
    this.querySelectorAll('input[type="radio"]').forEach(input => {
      input.addEventListener('change', this.onVariantChange.bind(this));
    });
  }
  
  async onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this.form);
    const variantId = formData.get('id');
    await CartAPI.addItem(variantId, 1);
  }
  
  onVariantChange() {
    // Update price, URL, availability
  }
}

**Test Strategy:**

1. Test sticky info panel on desktop scroll
2. Verify gallery images load with lazy loading
3. Test variant selection updates price and URL
4. Test unavailable variants are disabled
5. Test Add to Cart opens cart drawer
6. Test mobile swipeable carousel
7. Test accordion expand/collapse
8. Test lightbox on image click (desktop)
9. Verify thumbnail navigation
10. Test with products having multiple variants
11. Check URL updates on variant change (for sharing)
12. Test back button after variant change

## Subtasks

### 13.1. Create Product Gallery with Vertical Scroll and Thumbnails

**Status:** pending  
**Dependencies:** None  

Build the image gallery section using Shopify product.media with vertical scrolling on desktop, thumbnail navigation, lightbox for desktop, and swipeable carousel for mobile.

**Details:**

Implement liquid loop for media, CSS Grid/Flexbox for layout (60% width desktop), JS for lightbox (e.g., PhotoSwipe) and mobile swipe (e.g., Swiper.js). Ensure lazy loading with image_url filter and data-media-id attributes.

### 13.2. Implement Sticky Info Panel Layout

**Status:** pending  
**Dependencies:** 13.1  

Create the right-side sticky product info panel (40% width desktop) with proper positioning that sticks on scroll while gallery scrolls independently.

**Details:**

Use CSS position: sticky on .product__info container, flexbox parent layout, handle overflow issues (change body overflow-x to clip if needed), ensure mobile stacks info below gallery.

### 13.3. Build Variant Selector with Radio Buttons

**Status:** pending  
**Dependencies:** 13.2  

Create radio button selectors for product options (color/size), update selected variant, disable unavailable options, and handle price/URL updates on change.

**Details:**

Loop product.options_with_values in liquid for fieldsets/inputs, JS to find matching variant by option values, update hidden 'id' input, price display, and history.replaceState for URL.

### 13.4. Integrate AJAX Add to Cart Form

**Status:** pending  
**Dependencies:** 13.3  

Implement the product form with Add to Cart button that submits via AJAX, triggers cart drawer, and handles quantity if added later.

**Details:**

Form action='/cart/add', JS class ProductForm with onSubmit preventing default, FormData to get variant ID, call CartAPI.addItem (Shopify fetch '/cart/add.js'), open cart drawer on success.

### 13.5. Add Accordions for Metafields and Final Polish

**Status:** pending  
**Dependencies:** 13.2, 13.3  

Implement native <details> accordions for Size Guide, Care Instructions, Shipping Info using product metafields, integrate price snippet, and finalize responsive styles.

**Details:**

Use {% render 'price' %} snippet, <details><summary> for accordions with {{ product.metafields.custom.size_guide }} etc., add any missing schema/settings, comprehensive CSS for all states.
