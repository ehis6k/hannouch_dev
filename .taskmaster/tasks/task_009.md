# Task ID: 9

**Title:** Create Global Footer Section

**Status:** pending

**Dependencies:** 1, 2, 3

**Priority:** medium

**Description:** Build sections/footer.liquid with clean 4-column layout for newsletter signup, navigation links, trust badges, and copyright

**Details:**

Implementation:
1. Create sections/footer.liquid with schema for customization
2. 4-column desktop layout (collapses to 1-column mobile):
   - Column 1: Newsletter signup form
   - Column 2: Shop links (from linklist)
   - Column 3: About/Info links
   - Column 4: Social icons
3. Bottom bar: Copyright, Payment icons, Trust badges
4. Newsletter form submits to Shopify customer API
5. Use CSS Grid for layout
6. Add schema blocks for merchant customization

Pseudo-code:
<footer class="footer">
  <div class="footer__content">
    <div class="footer__column">
      <h3>Stay Connected</h3>
      <form action="/contact#newsletter" method="post" class="footer__newsletter">
        <input type="email" name="contact[email]" placeholder="Email address" required>
        <button type="submit">Subscribe</button>
      </form>
    </div>
    <div class="footer__column">
      <h3>Shop</h3>
      <ul>
        {% for link in linklists.footer-shop.links %}
          <li><a href="{{ link.url }}">{{ link.title }}</a></li>
        {% endfor %}
      </ul>
    </div>
    <div class="footer__column">
      <h3>About</h3>
      <ul>
        {% for link in linklists.footer-about.links %}
          <li><a href="{{ link.url }}">{{ link.title }}</a></li>
        {% endfor %}
      </ul>
    </div>
    <div class="footer__column">
      <h3>Follow Us</h3>
      <div class="footer__social">
        {% if settings.social_instagram_link %}
          <a href="{{ settings.social_instagram_link }}">Instagram</a>
        {% endif %}
      </div>
    </div>
  </div>
  <div class="footer__bottom">
    <p>&copy; {{ 'now' | date: '%Y' }} {{ shop.name }}</p>
    <div class="footer__payment-icons">{{ payment_icons }}</div>
  </div>
</footer>

**Test Strategy:**

1. Test 4-column layout on desktop
2. Verify responsive collapse to 1-column on mobile
3. Test newsletter form submission
4. Verify links from Shopify Admin render correctly
5. Test social icon links
6. Check payment icons display
7. Verify copyright year updates dynamically
8. Test keyboard navigation through footer links

## Subtasks

### 9.1. Implement Footer Schema and 4-Column Grid Layout

**Status:** pending  
**Dependencies:** None  

Create sections/footer.liquid file with JSON schema for customization blocks and implement CSS Grid for 4-column desktop layout that collapses to 1-column on mobile.

**Details:**

Define schema with blocks for newsletter, shop links, about links, social icons. Use CSS Grid with media queries: grid-template-columns: repeat(4, 1fr) on desktop, 1fr on mobile. Include pseudo-code structure for footer__content container.

### 9.2. Build Newsletter Form, Linklists, Social Icons, and Bottom Bar

**Status:** pending  
**Dependencies:** 9.1  

Implement newsletter signup form submitting to Shopify API, render linklists for shop/about columns, add social icons/payment icons/trust badges, and copyright in bottom bar.

**Details:**

Newsletter: form action='/contact#newsletter' with email input. Linklists: {% for link in linklists.footer-shop.links %}. Social: conditional settings.social_instagram_link. Bottom: {{ 'now' | date: '%Y' }} {{ shop.name }}, {{ payment_icons }}. Add schema settings for merchant control.
