# Task ID: 12

**Title:** Build Collection Grid with Filters

**Status:** pending

**Dependencies:** 1, 4, 5

**Priority:** high

**Description:** Create sections/main-collection.liquid with rhythmic product grid, AJAX filters, and lifestyle image breaks

**Details:**

Implementation:
1. Create sections/main-collection.liquid
2. Grid layout: 4-up desktop, 2-up mobile
3. Implement Shopify native filters:
   - Desktop: Horizontal sticky filter bar
   - Mobile: Filter drawer
4. AJAX filtering (no page reload) using Shopify Section Rendering API
5. Lifestyle breaks: Insert image block every 8 products
   - Use Metaobjects or section blocks for lifestyle images
6. Empty state handling
7. Pagination or infinite scroll
8. Sort options (Featured, Price, Newest)

Pseudo-code:
<div class="collection">
  <div class="collection__filters" data-filters>
    {% for filter in collection.filters %}
      <div class="filter-group">
        <h3>{{ filter.label }}</h3>
        {% for value in filter.values %}
          <label>
            <input type="checkbox" 
                   name="{{ filter.param_name }}" 
                   value="{{ value.value }}" 
                   {% if value.active %}checked{% endif %}>
            {{ value.label }} ({{ value.count }})
          </label>
        {% endfor %}
      </div>
    {% endfor %}
  </div>
  
  <div class="collection__grid">
    {% for product in collection.products %}
      {% if forloop.index == 8 and section.blocks.size > 0 %}
        <div class="collection__lifestyle-break">
          <img src="{{ section.blocks[0].settings.image | image_url: width: 800 }}">
        </div>
      {% endif %}
      {% render 'card-product', card_product: product %}
    {% endfor %}
  </div>
</div>

JS:
class CollectionFilters extends HTMLElement {
  connectedCallback() {
    this.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', this.onFilterChange.bind(this));
    });
  }
  
  async onFilterChange() {
    const formData = new FormData(this.querySelector('form'));
    const params = new URLSearchParams(formData).toString();
    const response = await fetch(`${window.location.pathname}?section_id=main-collection&${params}`);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const newGrid = doc.querySelector('.collection__grid');
    this.querySelector('.collection__grid').innerHTML = newGrid.innerHTML;
  }
}

**Test Strategy:**

1. Test filter selection updates grid via AJAX
2. Verify no page reload on filter change
3. Test multiple filter combinations
4. Test empty state (no products match filters)
5. Verify lifestyle breaks appear at correct intervals
6. Test 4-up desktop and 2-up mobile grid
7. Test mobile filter drawer open/close
8. Verify filter counts update correctly
9. Test sort functionality
10. Check URL updates with filter parameters (for sharing)

## Subtasks

### 12.1. Create Grid Layout and Product Rendering

**Status:** pending  
**Dependencies:** None  

Build the core product grid structure with 4-up desktop and 2-up mobile responsive layout using CSS Grid or Flexbox.

**Details:**

Implement collection__grid container with proper CSS classes for rhythmic spacing. Render product cards using existing card-product snippet. Ensure semantic HTML structure.

### 12.2. Implement Filter UI for Desktop and Mobile

**Status:** pending  
**Dependencies:** 12.1  

Create horizontal sticky filter bar for desktop and slide-out drawer for mobile using Shopify native collection.filters.

**Details:**

Build collection__filters container with filter-group structure from pseudo-code. Add CSS for sticky positioning (desktop) and off-canvas drawer (mobile). Include filter counts and active states.

### 12.3. Build AJAX Filtering with Section Rendering API

**Status:** pending  
**Dependencies:** 12.1, 12.2  

Implement JavaScript class for handling filter changes with AJAX requests to update grid without page reload.

**Details:**

Extend CollectionFilters class from pseudo-code. Use fetch() with section_id=main-collection and filter parameters. Parse response and update collection__grid innerHTML. Handle URL updates.

### 12.4. Add Lifestyle Image Breaks Every 8 Products

**Status:** pending  
**Dependencies:** 12.1  

Insert lifestyle images at rhythmic intervals (every 8th product) using section blocks or metaobjects.

**Details:**

Implement forloop logic from pseudo-code to check forloop.index == 8. Render section.blocks[0].settings.image. Add collection__lifestyle-break styling with full-width responsive images.

### 12.5. Implement Pagination and Sort Options

**Status:** pending  
**Dependencies:** 12.3  

Add pagination or infinite scroll functionality plus sort dropdown (Featured, Price, Newest) with AJAX updates.

**Details:**

Extend AJAX filtering to handle sort_by and page parameters. Implement load more button or intersection observer for infinite scroll. Update URL params on sort changes.

### 12.6. Handle Empty States and Error Cases

**Status:** pending  
**Dependencies:** 12.3  

Create empty state messaging for no products matching filters and handle AJAX errors gracefully.

**Details:**

Add conditional logic in collection__grid for when collection.products.size == 0. Design friendly empty state with call-to-action. Implement error fallback for failed AJAX requests.
