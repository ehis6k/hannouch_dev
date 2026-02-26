# Task ID: 3

**Title:** Create SVG Icon Set and Snippets

**Status:** pending

**Dependencies:** None

**Priority:** medium

**Description:** Build reusable SVG icon snippets for cart, menu, search, and other UI elements used throughout the theme

**Details:**

Implementation:
1. Create snippets/icon-cart.liquid with inline SVG
2. Create snippets/icon-menu.liquid (hamburger)
3. Create snippets/icon-close.liquid (X)
4. Create snippets/icon-search.liquid
5. Create snippets/icon-chevron.liquid (for accordions)
6. Create snippets/icon-arrow.liquid (for CTAs)
7. Each snippet accepts parameters: size, color, class
8. Use currentColor for fill/stroke to inherit text color
9. Add aria-hidden="true" to decorative icons

Pseudo-code:
{% comment %} snippets/icon-cart.liquid {% endcomment %}
<svg class="icon icon-cart {{ class }}" 
     width="{{ size | default: 24 }}" 
     height="{{ size | default: 24 }}" 
     viewBox="0 0 24 24" 
     fill="none" 
     stroke="currentColor" 
     aria-hidden="true">
  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5M17 13l1.4 5M9 21a1 1 0 100-2 1 1 0 000 2zM17 21a1 1 0 100-2 1 1 0 000 2z"/>
</svg>

**Test Strategy:**

1. Render each icon snippet in isolation to verify SVG markup
2. Test size parameter variations (16px, 24px, 32px)
3. Verify currentColor inheritance with different parent text colors
4. Check accessibility: icons should not be announced by screen readers
5. Validate SVG optimization (no unnecessary attributes)

## Subtasks

### 3.1. Create Cart, Menu, and Close Icon Snippets

**Status:** pending  
**Dependencies:** None  

Implement snippets/icon-cart.liquid, icon-menu.liquid (hamburger), and icon-close.liquid (X) with size, color, class parameters, currentColor for stroke/fill, and aria-hidden='true'.

**Details:**

Follow pseudo-code pattern: SVG with class='icon {{ class }}', width/height='{{ size | default: 24 }}', viewBox='0 0 24 24', stroke='currentColor', aria-hidden='true'. Source paths from standard icon sets ensuring optimization.

### 3.2. Create Search, Chevron, and Arrow Icon Snippets

**Status:** pending  
**Dependencies:** None  

Implement snippets/icon-search.liquid, icon-chevron.liquid (accordions), and icon-arrow.liquid (CTAs) with full parameter handling, accessibility, and currentColor inheritance.

**Details:**

Use identical structure as cart icon: parameters for size/color/class, fill/stroke='currentColor', aria-hidden='true', viewBox optimized for 24x24. Ensure paths are clean and scalable.
