# Task ID: 2

**Title:** Configure Global Layout Shell (theme.liquid)

**Status:** pending

**Dependencies:** 1

**Priority:** high

**Description:** Setup the base HTML shell in layout/theme.liquid that loads design tokens, global scripts, and establishes the page structure

**Details:**

Implementation:
1. Modify layout/theme.liquid to:
   - Load base.css in <head>
   - Include viewport meta tag for responsive design
   - Add preconnect hints for font/image CDNs
   - Setup global.js module loading with type='module'
   - Include Shopify's required {{ content_for_header }}
   - Add {{ content_for_layout }} in main wrapper
2. Remove Atelier-specific class names and structure
3. Add semantic HTML5 structure (<header>, <main>, <footer>)
4. Include skip-to-content link for accessibility

Pseudo-code:
<!DOCTYPE html>
<html lang="{{ request.locale.iso_code }}">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  {{ 'base.css' | asset_url | stylesheet_tag }}
  {{ content_for_header }}
</head>
<body>
  <a href="#main" class="skip-link">Skip to content</a>
  {% sections 'header-group' %}
  <main id="main">{{ content_for_layout }}</main>
  {% sections 'footer-group' %}
  <script src="{{ 'global.js' | asset_url }}" type="module"></script>
</body>
</html>

**Test Strategy:**

1. Validate HTML5 structure using W3C validator
2. Verify all CSS and JS assets load without 404 errors
3. Check Shopify required elements render (cart, customer account)
4. Test skip-link keyboard navigation
5. Confirm responsive viewport behavior on mobile devices

## Subtasks

### 2.1. Setup HTML Structure and Remove Atelier Defaults in theme.liquid

**Status:** pending  
**Dependencies:** 2.2  

Create the base HTML5 doctype, html lang attribute, body structure, and remove all existing Atelier-specific class names and legacy structure from layout/theme.liquid

**Details:**

Implement <!DOCTYPE html>, <html lang='{{ request.locale.iso_code }}'>, semantic <header>, <main id='main'>, <footer> wrappers using {% sections 'header-group' %} and {% sections 'footer-group' %}, place {{ content_for_layout }} in main, and completely strip out any Atelier theme classes, divs, or custom structures. Ensure clean slate per pseudo-code.
