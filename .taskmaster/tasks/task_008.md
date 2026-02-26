# Task ID: 8

**Title:** Build Cart Drawer Section

**Status:** pending

**Dependencies:** 1, 4, 5, 7

**Priority:** high

**Description:** Create sections/cart-drawer.liquid with slide-out UI, free shipping progress bar, and AJAX-powered updates without page reload

**Details:**

Implementation:
1. Create sections/cart-drawer.liquid with cart rendering
2. Create assets/component-drawer.css for styling
3. Create assets/cart-drawer.js as Web Component
4. Structure:
   - Overlay backdrop
   - Drawer panel (400px desktop, 90% mobile)
   - Header with close button
   - Line items list (using card-product for thumbnails)
   - Quantity selectors
   - Subtotal display
   - Free shipping progress bar
   - Checkout button
5. Drawer opens on cart:updated event
6. Calculate free shipping threshold (e.g., $100)
7. Update cart via CartAPI on quantity change
8. Slide animation from right

Pseudo-code:
<cart-drawer class="cart-drawer">
  <div class="cart-drawer__overlay"></div>
  <div class="cart-drawer__panel">
    <div class="cart-drawer__header">
      <h2>Cart ({{ cart.item_count }})</h2>
      <button class="cart-drawer__close">{% render 'icon-close' %}</button>
    </div>
    <div class="cart-drawer__items">
      {% for item in cart.items %}
        <div class="cart-drawer__item">
          <img src="{{ item.image | image_url: width: 100 }}">
          <div class="cart-drawer__item-details">
            <h3>{{ item.product.title }}</h3>
            <p>{{ item.variant.title }}</p>
            {% render 'price', product: item %}
            <quantity-selector data-line="{{ item.key }}" value="{{ item.quantity }}"></quantity-selector>
          </div>
        </div>
      {% endfor %}
    </div>
    <div class="cart-drawer__footer">
      <div class="cart-drawer__shipping-bar">
        <progress value="{{ cart.total_price }}" max="10000"></progress>
        <p>{{ shipping_message }}</p>
      </div>
      <div class="cart-drawer__subtotal">
        <span>Subtotal</span>
        <span>{{ cart.total_price | money }}</span>
      </div>
      <a href="/checkout" class="button button--primary">Checkout</a>
    </div>
  </div>
</cart-drawer>

JS:
customElements.define('cart-drawer', class extends HTMLElement {
  connectedCallback() {
    document.addEventListener('cart:updated', () => this.open());
    this.querySelector('.cart-drawer__close').addEventListener('click', () => this.close());
  }
  open() { this.classList.add('is-open'); }
  close() { this.classList.remove('is-open'); }
});

**Test Strategy:**

1. Test drawer opens on Add to Cart action
2. Verify slide animation is smooth (<100ms perceived)
3. Test quantity updates via AJAX (no page reload)
4. Test item removal (quantity to 0)
5. Verify free shipping bar calculates correctly
6. Test close via X button and backdrop click
7. Test responsive sizing (400px desktop, 90% mobile)
8. Verify subtotal updates in real-time
9. Test empty cart state message

## Subtasks

### 8.1. Create Cart Drawer Liquid Template

**Status:** pending  
**Dependencies:** None  

Build sections/cart-drawer.liquid with complete cart rendering structure including overlay, panel, header, items list, footer, and empty state handling.

**Details:**

Include Liquid loops for cart.items, render 'icon-close', integrate 'price' and 'quantity-selector' snippets, add conditional empty cart message, compute shipping_message variable based on cart.total_price vs threshold.

### 8.2. Implement Cart Drawer CSS Styling

**Status:** pending  
**Dependencies:** 8.1  

Create assets/component-drawer.css with responsive drawer layout, slide animation from right, overlay backdrop, and free shipping progress bar styles.

**Details:**

Style panel at 400px desktop/90% mobile with translateX animation; overlay full-screen with backdrop blur; progress bar with dynamic width; use CSS custom properties for shipping threshold; ensure mobile responsiveness.

### 8.3. Develop Cart Drawer Web Component JS

**Status:** pending  
**Dependencies:** 8.1, 8.2  

Create assets/cart-drawer.js defining customElements 'cart-drawer' with open/close methods, cart:updated event listener, and backdrop/close button handlers.

**Details:**

Extend HTMLElement with connectedCallback for event listeners; implement open() adding 'is-open' class, close() removing it; handle overlay click to close; dispatch custom events for updates.

### 8.4. Integrate Quantity Selectors with AJAX

**Status:** pending  
**Dependencies:** 8.3  

Enhance quantity-selector component to update cart via CartAPI on change, trigger cart:updated event, and refresh drawer contents dynamically.

**Details:**

Add change event listener to quantity-selector elements; use fetch('/cart/change.js') with line and quantity params; handle success by dispatching cart:updated; include error handling and loading states.

### 8.5. Add Free Shipping Progress Bar Logic

**Status:** pending  
**Dependencies:** 8.1, 8.3, 8.4  

Implement dynamic free shipping progress calculation in Liquid/JS, update progress bar value and messaging on every cart update.

**Details:**

Set threshold (e.g., 10000 cents); compute progress as (cart.total_price / threshold * 100); render <progress> with value/max; JS updates aria-valuenow and message text (e.g., '$15 until free shipping'); handle empty cart.
