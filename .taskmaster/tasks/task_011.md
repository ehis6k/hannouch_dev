# Task ID: 11

**Title:** Create Editorial Split Section for Homepage

**Status:** pending

**Dependencies:** 1, 2

**Priority:** medium

**Description:** Build sections/editorial-split.liquid with 50/50 split layout showing lifestyle imagery paired with text narrative

**Details:**

Implementation:
1. Create sections/editorial-split.liquid with schema
2. Desktop: 50/50 split (image left, text right or vice versa)
3. Mobile: Stack vertically (image first, then text)
4. Support for:
   - Image upload
   - Heading, body text, caption
   - Optional CTA button
   - Reverse layout option
5. Use CSS Grid for layout
6. Add subtle entrance animation on scroll (optional)

Pseudo-code:
<section class="editorial-split {% if section.settings.reverse %}editorial-split--reverse{% endif %}">
  <div class="editorial-split__media">
    <img src="{{ section.settings.image | image_url: width: 1000 }}" 
         loading="lazy" 
         alt="{{ section.settings.image.alt }}">
  </div>
  <div class="editorial-split__content">
    <h2>{{ section.settings.heading }}</h2>
    <p>{{ section.settings.body }}</p>
    {% if section.settings.caption %}
      <p class="editorial-split__caption">{{ section.settings.caption }}</p>
    {% endif %}
    {% if section.settings.cta_link %}
      <a href="{{ section.settings.cta_link }}" class="button">
        {{ section.settings.cta_text }}
      </a>
    {% endif %}
  </div>
</section>

CSS:
.editorial-split { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-xl); }
@media (max-width: 768px) {
  .editorial-split { grid-template-columns: 1fr; }
}

**Test Strategy:**

1. Test 50/50 split layout on desktop
2. Verify vertical stack on mobile
3. Test reverse layout option
4. Verify image lazy loading
5. Test with and without CTA button
6. Check text readability and spacing
7. Test multiple instances on same page
8. Verify responsive behavior at breakpoints

## Subtasks

### 11.1. Create Editorial Split Section Schema and Basic Structure

**Status:** pending  
**Dependencies:** None  

Implement the Shopify section schema and basic HTML structure for sections/editorial-split.liquid including image upload, heading, body text, caption, CTA button, and reverse layout option.

**Details:**

Define complete schema with settings for image (image_picker), heading (text), body (textarea), caption (text), cta_text (text), cta_link (url), reverse (checkbox). Create basic section wrapper with conditional reverse class and media/content divs using provided pseudo-code structure. Ensure proper Shopify section attributes and lazy loading on image.
