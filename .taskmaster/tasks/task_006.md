# Task ID: 6

**Title:** Implement Global Header Section

**Status:** pending

**Dependencies:** 1, 2, 3

**Priority:** high

**Description:** Build sections/header.liquid with minimalist sticky navigation, transparent-to-solid scroll behavior, and responsive mobile hamburger menu

**Details:**

Implementation:
1. Create sections/header.liquid with schema for menu settings
2. Desktop layout: Logo center, Nav links left, Icons (Search, Cart) right
3. Mobile layout: Hamburger left, Logo center, Cart icon right
4. Sticky positioning with scroll behavior:
   - Initial: transparent background
   - On scroll (>50px): solid white background with shadow
5. Create assets/component-header.js as Web Component
6. Mobile menu drawer slides from left
7. Use linklists from Shopify Admin for navigation
8. Cart icon shows item count badge

Pseudo-code:
<header class="header" data-header>
  <div class="header__wrapper">
    <button class="header__menu-toggle" aria-label="Menu">{% render 'icon-menu' %}</button>
    <a href="/" class="header__logo">{{ shop.name }}</a>
    <nav class="header__nav">
      {% for link in linklists.main-menu.links %}
        <a href="{{ link.url }}">{{ link.title }}</a>
      {% endfor %}
    </nav>
    <div class="header__icons">
      <button class="header__search">{% render 'icon-search' %}</button>
      <button class="header__cart" data-cart-count="{{ cart.item_count }}">{% render 'icon-cart' %}</button>
    </div>
  </div>
</header>

JS:
class HeaderComponent extends HTMLElement {
  connectedCallback() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }
  handleScroll() {
    if (window.scrollY > 50) {
      this.classList.add('header--scrolled');
    } else {
      this.classList.remove('header--scrolled');
    }
  }
}

**Test Strategy:**

1. Test sticky behavior on scroll (transparent to solid transition)
2. Verify mobile hamburger opens/closes drawer smoothly
3. Test backdrop click closes mobile menu
4. Verify cart count badge updates correctly
5. Test navigation links from Shopify Admin render correctly
6. Check z-index stacking (header above other content)
7. Test keyboard navigation (tab through links)
8. Verify smooth transition animation (<100ms perceived)

## Subtasks

### 6.1. Create header.liquid with Schema and Base Layout

**Status:** pending  
**Dependencies:** None  

Build sections/header.liquid file with schema for menu settings and initial HTML structure using provided pseudo-code

**Details:**

Include header wrapper, hamburger button, centered logo with shop.name, main nav with linklists.main-menu.links loop, and icons section with search/cart buttons. Add schema for menu/linklist selection.

### 6.2. Implement Desktop and Mobile Responsive Layouts

**Status:** pending  
**Dependencies:** 6.1  

Style header for desktop (nav left, logo center, icons right) and mobile (hamburger left, logo center, cart right) layouts with CSS classes

**Details:**

Use flexbox/grid for responsive wrapper positioning. Desktop: nav visible left-aligned. Mobile: nav hidden, hamburger visible. Ensure logo remains centered at all breakpoints using CSS media queries.

### 6.3. Build Sticky Scroll JS Web Component

**Status:** pending  
**Dependencies:** 6.1  

Create assets/component-header.js as Web Component with scroll listener for transparent-to-solid background transition at 50px

**Details:**

Extend HTMLElement, add scroll event listener in connectedCallback, toggle 'header--scrolled' class based on window.scrollY > 50. Include initial sticky positioning CSS: position: sticky; top: 0; with transparent bg transitioning to solid white + shadow.

### 6.4. Add Mobile Drawer, Cart Badge, and Search Integration

**Status:** pending  
**Dependencies:** 6.1, 6.2, 6.3  

Implement left-slide mobile menu drawer, cart item count badge, and basic search functionality with icon dependencies

**Details:**

Add drawer overlay with slide-in animation (transform: translateX). Cart button shows {{ cart.item_count }} badge. Hamburger toggles drawer visibility. Use icon snippets (icon-menu, icon-cart, icon-search) from Task 3. Include backdrop click to close.
