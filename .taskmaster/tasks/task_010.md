# Task ID: 10

**Title:** Build Hero Video Section for Homepage

**Status:** pending

**Dependencies:** 1, 2

**Priority:** medium

**Description:** Create sections/hero-video.liquid with full-viewport media block, autoplay video, text overlay, and CTA button

**Details:**

Implementation:
1. Create sections/hero-video.liquid with schema for customization
2. Support both video and image backgrounds
3. Full viewport height (100vh)
4. Video settings:
   - Autoplay, muted, loop, playsinline
   - Poster image fallback
5. Text overlay with positioning options (center, left, right)
6. CTA button linking to collection/product
7. Mobile: Use image instead of video for performance
8. Add subtle overlay for text readability

Pseudo-code:
<section class="hero-video" style="height: 100vh; position: relative;">
  {% if section.settings.video_url %}
    <video class="hero-video__media" 
           autoplay 
           muted 
           loop 
           playsinline 
           poster="{{ section.settings.poster_image | image_url }}">
      <source src="{{ section.settings.video_url }}" type="video/mp4">
    </video>
  {% else %}
    <img src="{{ section.settings.image | image_url: width: 1920 }}" class="hero-video__media">
  {% endif %}
  <div class="hero-video__overlay"></div>
  <div class="hero-video__content">
    <h1>{{ section.settings.heading }}</h1>
    <p>{{ section.settings.subheading }}</p>
    <a href="{{ section.settings.cta_link }}" class="button button--primary">
      {{ section.settings.cta_text }}
    </a>
  </div>
</section>

{% schema %}
{
  "name": "Hero Video",
  "settings": [
    { "type": "video_url", "id": "video_url", "label": "Video URL" },
    { "type": "image_picker", "id": "poster_image", "label": "Poster Image" },
    { "type": "text", "id": "heading", "label": "Heading" },
    { "type": "url", "id": "cta_link", "label": "CTA Link" }
  ]
}
{% endschema %}

**Test Strategy:**

1. Test video autoplay on desktop (muted)
2. Verify poster image displays before video loads
3. Test mobile fallback to image
4. Verify text overlay is readable (contrast)
5. Test CTA button link
6. Check full viewport height on various devices
7. Test video loop behavior
8. Verify performance (video file size, loading time)

## Subtasks

### 10.1. Implement Video/Image Media Block with Fallbacks

**Status:** pending  
**Dependencies:** None  

Create the core media handling logic in hero-video.liquid supporting both video (autoplay, muted, loop, playsinline, poster) and image backgrounds with full viewport height and subtle overlay.

**Details:**

Use provided pseudo-code as base. Add video attributes, conditional rendering for video vs image, position:relative container, 100vh height, and dark overlay div for text readability. Ensure object-fit:cover for media.

### 10.2. Build Schema, Text Overlay, CTA, and Mobile Optimizations

**Status:** pending  
**Dependencies:** 10.1  

Add comprehensive schema settings, positioned text overlay with options, CTA button, and mobile-specific image fallback for performance.

**Details:**

Extend schema with image_picker, mobile_image, text fields (heading, subheading), positioning (center/left/right), cta_text/link, overlay opacity. Add CSS media queries (@media screen max-width 768px) to swap video for mobile_image. Style content positioning absolutely.
