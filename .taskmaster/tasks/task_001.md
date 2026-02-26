# Task ID: 1

**Title:** Setup Design Tokens and CSS Variables

**Status:** pending

**Dependencies:** None

**Priority:** high

**Description:** Establish the foundational design system by implementing CSS custom properties for typography, colors, spacing, and grid system in base.css and settings_schema.json

**Details:**

Implementation:
1. Create/modify assets/base.css with CSS custom properties:
   - Typography: --font-heading (Geometric Sans), --font-body (Clean Sans)
   - Colors: --color-base-bg: #FAFAF9, --color-base-text: #1A1A1A, --color-border
   - Spacing: --spacing-unit (8px base), --spacing-xs through --spacing-xxl
   - Grid: --grid-columns-desktop: 12, --grid-columns-mobile: 4
2. Update config/settings_schema.json to expose font and color settings to Theme Editor
3. Implement responsive typography scaling using clamp() for fluid sizing
4. Add uppercase letter-spacing for headers (tracking)
5. Remove Atelier theme default overrides

Pseudo-code:
:root {
  --font-heading: 'Geometric Sans', sans-serif;
  --font-body: 'Clean Sans', system-ui, sans-serif;
  --color-base-bg: #FAFAF9;
  --color-base-text: #1A1A1A;
  --spacing-unit: 8px;
  --grid-max-width: 1440px;
}

h1, h2, h3 { font-family: var(--font-heading); text-transform: uppercase; letter-spacing: 0.05em; }
body { font-family: var(--font-body); color: var(--color-base-text); }

**Test Strategy:**

1. Run Shopify Theme Check CLI to validate CSS syntax
2. Visual inspection at breakpoints (375px, 768px, 1440px)
3. Verify Theme Editor settings appear correctly
4. Check font loading in Network tab (no FOUT/FOIT)
5. Validate color contrast ratios meet WCAG AA standards

## Subtasks

### 1.1. Define CSS Custom Properties in base.css

**Status:** pending  
**Dependencies:** None  

Create or modify assets/base.css to establish CSS custom properties for typography, colors, spacing, and grid system using the provided pseudo-code.

**Details:**

Implement :root variables including --font-heading: 'Geometric Sans', --font-body: 'Clean Sans', --color-base-bg: #FAFAF9, --color-base-text: #1A1A1A, --spacing-unit: 8px, --grid-max-width: 1440px, --grid-columns-desktop: 12, --grid-columns-mobile: 4, and spacing scale from --spacing-xs to --spacing-xxl.

### 1.2. Update settings_schema.json for Theme Editor

**Status:** pending  
**Dependencies:** 1.1  

Modify config/settings_schema.json to expose font families and color settings to the Shopify Theme Editor for customization.

**Details:**

Add schema blocks for typography (heading/body fonts) and colors (base-bg, base-text, border) with input types like 'font_picker' and 'color', ensuring they map to corresponding CSS custom properties.

### 1.3. Implement Responsive Typography with clamp()

**Status:** pending  
**Dependencies:** 1.1  

Apply fluid typography scaling using clamp() function to headings and body text, plus uppercase letter-spacing for headers.

**Details:**

Update h1-h3 selectors with font-family: var(--font-heading), text-transform: uppercase, letter-spacing: 0.05em, and font-size using clamp() like clamp(1.5rem, 4vw, 3rem); body uses var(--font-body) with responsive sizing.

### 1.4. Apply Base Styles and Global Resets

**Status:** pending  
**Dependencies:** 1.1, 1.3  

Set global styles for body background, text color, and basic element resets using the new CSS custom properties.

**Details:**

Add body { font-family: var(--font-body); color: var(--color-base-text); background: var(--color-base-bg); } and basic resets for headings, links, and lists to establish consistent foundation.

### 1.5. Remove Atelier Theme Default Overrides

**Status:** pending  
**Dependencies:** 1.1, 1.2, 1.3, 1.4  

Clean up base.css by removing any Atelier theme-specific CSS overrides, comments, or unused styles.

**Details:**

Search for and delete Atelier-related class names, hardcoded values, or conflicting rules; minify and organize final base.css file for optimal performance.
