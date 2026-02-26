# Task ID: 7

**Title:** Build AJAX Cart API Wrapper

**Status:** pending

**Dependencies:** None

**Priority:** high

**Description:** Create a JavaScript utility module (assets/cart.js) to handle all cart operations via Shopify AJAX API with proper error handling

**Details:**

Implementation:
1. Create assets/cart.js as ES6 module
2. Implement functions:
   - addItem(variantId, quantity): POST to /cart/add.js
   - updateItem(lineKey, quantity): POST to /cart/change.js
   - getCart(): GET /cart.js
   - clearCart(): POST to /cart/clear.js
3. All functions return Promises
4. Dispatch custom events for cart updates (cart:updated, cart:error)
5. Handle errors gracefully (out of stock, invalid variant)
6. Include CSRF token handling
7. Implement debouncing for rapid updates

Pseudo-code:
export class CartAPI {
  static async addItem(variantId, quantity = 1) {
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity })
      });
      if (!response.ok) throw new Error('Add to cart failed');
      const item = await response.json();
      document.dispatchEvent(new CustomEvent('cart:updated', { detail: item }));
      return item;
    } catch (error) {
      document.dispatchEvent(new CustomEvent('cart:error', { detail: error }));
      throw error;
    }
  }
  
  static async getCart() {
    const response = await fetch('/cart.js');
    return response.json();
  }
  
  static async updateItem(lineKey, quantity) {
    const response = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: lineKey, quantity })
    });
    const cart = await response.json();
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
    return cart;
  }
}

**Test Strategy:**

1. Test addItem with valid variant ID
2. Test addItem with invalid/out-of-stock variant (error handling)
3. Test updateItem with quantity changes (increase/decrease)
4. Test updateItem with quantity 0 (item removal)
5. Test getCart returns current cart state
6. Verify custom events fire correctly
7. Test rapid successive calls (debouncing)
8. Check Network tab for proper API calls and responses

## Subtasks

### 7.1. Implement Core Cart API Methods

**Status:** pending  
**Dependencies:** None  

Create the four main API functions (addItem, updateItem, getCart, clearCart) using Shopify AJAX endpoints with basic fetch requests and Promise returns

**Details:**

Implement POST /cart/add.js, POST /cart/change.js, GET /cart.js, POST /cart/clear.js using fetch API with proper JSON headers and body formatting per Shopify docs. Ensure all methods return Promises resolving to API response data.

### 7.2. Add Error Handling and Custom Events

**Status:** pending  
**Dependencies:** 7.1  

Implement comprehensive error handling for common Shopify errors (out of stock, invalid variant) and dispatch cart:updated/cart:error custom events

**Details:**

Wrap all fetch calls in try-catch, check response.ok status, parse specific Shopify error messages, dispatch CustomEvent to document with relevant detail payloads for both success and failure cases.

### 7.3. Add CSRF Token, Debouncing, and Module Export

**Status:** pending  
**Dependencies:** 7.1, 7.2  

Complete the ES6 module with CSRF token extraction, debouncing for rapid updates, and proper export as CartAPI class

**Details:**

Extract CSRF token from meta[name='csrf-token'], implement debounce utility (200-300ms) for updateItem/addItem, export as default CartAPI class from assets/cart.js. Add locale-aware URLs if needed.
