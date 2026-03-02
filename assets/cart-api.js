import { CartAddEvent, CartUpdateEvent, CartErrorEvent } from '@theme/events';

/**
 * Cart API Wrapper
 * Handles all Shopify AJAX Cart API operations
 */
export class CartAPI {
  /**
   * Fetch the current cart state
   * @returns {Promise<Object>} The cart object
   */
  static async getCart() {
    return this.request('/cart.js', 'GET');
  }

  /**
   * Add an item to the cart
   * @param {Object} data - The item data (id, quantity, properties, sections)
   * @param {string} [sourceId] - The ID of the element that triggered the action
   * @returns {Promise<Object>} The added item object (with sections if requested)
   */
  static async addItem(data, sourceId = null) {
    try {
      const response = await this.request('/cart/add.js', 'POST', data);
      
      document.dispatchEvent(new CartAddEvent(response, sourceId, {
        variantId: data.id,
        itemCount: response.quantity, // This is line item quantity
        sections: response.sections
      }));
      
      return response;
    } catch (error) {
      this.handleError(error, sourceId);
      throw error;
    }
  }

  /**
   * Update an item in the cart
   * @param {Object} data - The update data (id/line, quantity, properties, sections)
   * @param {string} [sourceId] - The ID of the element that triggered the action
   * @returns {Promise<Object>} The updated cart object
   */
  static async updateItem(data, sourceId = null) {
    try {
      const response = await this.request('/cart/change.js', 'POST', data);
      
      document.dispatchEvent(new CartUpdateEvent(response, sourceId, {
        variantId: data.id,
        itemCount: response.item_count,
        sections: response.sections
      }));
      
      return response;
    } catch (error) {
      this.handleError(error, sourceId);
      throw error;
    }
  }

  /**
   * Clear the cart
   * @param {string} [sourceId] - The ID of the element that triggered the action
   * @returns {Promise<Object>} The empty cart object
   */
  static async clearCart(sourceId = null) {
    try {
      const response = await this.request('/cart/clear.js', 'POST');
      
      document.dispatchEvent(new CartUpdateEvent(response, sourceId, {
        itemCount: 0,
        sections: response.sections
      }));
      
      return response;
    } catch (error) {
      this.handleError(error, sourceId);
      throw error;
    }
  }

  /**
   * Helper to make AJAX requests
   * @param {string} url 
   * @param {string} method 
   * @param {Object} [body] 
   * @returns {Promise<Object>}
   */
  static async request(url, method, body = null) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // Add CSRF token if available
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken;
    }

    const config = {
      method,
      headers
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);
    let responseData;

    try {
      responseData = await response.json();
    } catch (e) {
      // If response is not JSON (e.g. 500 error page), handle gracefully
      responseData = { message: response.statusText, description: 'Network error or invalid JSON response' };
    }

    if (!response.ok) {
      // Create error object with response data
      const error = new Error(responseData.description || responseData.message || 'Cart request failed');
      error.status = response.status;
      error.description = responseData.description;
      error.message = responseData.message;
      error.errors = responseData.errors;
      throw error;
    }

    return responseData;
  }

  /**
   * Handle errors and dispatch event
   * @param {Error} error 
   * @param {string} sourceId 
   */
  static handleError(error, sourceId) {
    document.dispatchEvent(new CartErrorEvent(
      sourceId,
      error.message,
      error.description,
      error.errors
    ));
  }
}

/**
 * Debounce utility
 * @param {Function} fn 
 * @param {number} wait 
 * @returns {Function}
 */
export function debounce(fn, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(context, args), wait);
  };
}
