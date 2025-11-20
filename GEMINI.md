## Gemini Added Memories
- You are an AI assistant. Your primary priority is to modify and update code. You have permission to change, replace, or add new code as required by my tasks. **Strict Instruction:** You are NOT permitted to delete, replace, or modify any non-code content (such as text, headlines, descriptions, or images) without my explicit and direct consent. If a task seems to require a content change, you must ask for permission before making any non-code alterations.

# Project: [Ruruberry]

## Architecture
- Frontend: HTML5, CSS3, Vanilla JavaScript
- No framework dependencies
- Progressive enhancement approach
- Mobile-first responsive design

## Your Main Tasks
- Help me build a modern, responsive website using HTML, CSS, and JavaScript
- Follow web best practices and accessibility standards (WCAG 2.1 AA minimum)
- Provide clean, well-commented code
- Suggest improvements for performance and user experience
- Think through problems step-by-step before implementing solutions

## Code Generation Rules

When generating code:
1. **Completeness**: Always provide complete, working code files (not just snippets)
2. **Semantic HTML**: Use appropriate HTML5 elements (nav, article, section, aside, etc.)
3. **Mobile-First CSS**: Write responsive CSS starting from smallest screens
4. **Modern CSS**: Prefer CSS Grid/Flexbox over floats; use CSS custom properties for theming
5. **Clean JavaScript**: ES6+ syntax, avoid jQuery, use vanilla JS
6. **Naming Conventions**: 
   - CSS: kebab-case (`.main-header`, `.btn-primary`)
   - JavaScript: camelCase (`getUserData`, `isValidEmail`)
   - Files: kebab-case (`main-styles.css`, `form-validation.js`)
7. **Comments**: Explain complex logic and "why", not obvious "what"
8. **Browser Compatibility**: Ensure code works on Chrome, Firefox, Safari, Edge (last 2 versions)

## Best Practices to Follow

### HTML
- Use semantic elements appropriately
- Implement proper heading hierarchy (single h1, logical h2-h6 flow)
- Add descriptive alt text to all images (empty alt="" for decorative images)
- Include meta viewport tag for responsive design
- Use aria-labels and roles where appropriate for accessibility

### CSS
- Mobile-first media queries: start small, scale up with `min-width`
- Use CSS Grid for page layouts, Flexbox for component layouts
- Ensure color contrast ratio meets WCAG AA (4.5:1 for normal text, 3:1 for large)
- Use CSS custom properties for colors, spacing, and typography
- Avoid `!important` unless absolutely necessary
- Use relative units (rem, em, %, vh/vw) over fixed pixels
- Optimize for Core Web Vitals (LCP, FID, CLS)

### JavaScript
- Use event delegation for better performance
- Avoid global variables; use modules or IIFE patterns
- Implement debouncing/throttling for scroll and resize events
- Provide loading states for async operations
- Handle errors gracefully with try-catch
- Validate user inputs on both client and server side

### Performance
- Optimize and compress images (WebP format when possible)
- Lazy load images below the fold
- Minify CSS and JavaScript for production
- Use async/defer for non-critical scripts
- Minimize DOM manipulations
- Leverage browser caching

### Accessibility
- Ensure keyboard navigation works (Tab, Enter, Space, Escape)
- Test with screen readers
- Provide focus indicators for interactive elements
- Use sufficient color contrast
- Don't rely solely on color to convey information
- Add skip-to-content links for keyboard users

## When Providing Solutions

Before writing code:
1. **Explain the approach**: Outline the strategy and reasoning
2. **Highlight compatibility concerns**: Mention any browser-specific issues
3. **Suggest alternatives**: Provide multiple approaches when applicable
4. **Flag performance implications**: Warn about potential bottlenecks
5. **Include testing steps**: Specify how to verify the solution works

After providing code:
- Mention any dependencies or prerequisites
- Suggest improvements or next steps
- Note any trade-offs made in the solution

## Debugging Help

When I encounter errors:
1. **Ask for context**: Request relevant code, error messages, browser console output
2. **Identify root cause**: Explain what's causing the issue and why
3. **Provide the fix**: Show corrected code with clear explanations
3. **Prevent recurrence**: Suggest how to avoid similar issues in the future
4. **Testing verification**: Recommend how to confirm the fix works

Common debugging approaches:
- Use console.log() strategically for JavaScript issues
- Validate HTML with W3C validator
- Check browser DevTools for CSS issues
- Test in different browsers and devices
- Use Lighthouse for performance audits

## Progressive Enhancement

Development order:
1. **Start with HTML**: Create a fully functional, accessible document structure
2. **Layer on CSS**: Add presentation and responsive design
3. **Enhance with JavaScript**: Add interactivity and dynamic features
4. **Graceful degradation**: Ensure core functionality works without JavaScript

Critical features should work without JS. Enhanced features can require JS.

## Testing Requirements

Before marking any feature complete, verify:
- **Cross-browser compatibility**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Responsive design**: Test on mobile (375px), tablet (768px), desktop (1200px+)
- **Accessibility**: Keyboard navigation, screen reader compatibility
- **Performance**: Lighthouse scores - Performance >90, Accessibility >95
- **Validation**: HTML validates with W3C validator
- **JavaScript**: No console errors, handles edge cases

## Never Modify Without Permission
- `.env` files
- Configuration files
- `index.html` (ask before major structural changes)
- Any file marked as "DO NOT EDIT"

## Communication Style
- Be concise but thorough
- Explain trade-offs and decisions
- Ask clarifying questions when requirements are ambiguous
- Provide examples for complex concepts
- Use analogies when explaining technical concepts

---

## Media Query Guidelines (2025)

The goal in 2025 is to build a fluid, resilient foundation first, and then use media queries and container queries surgically for specific adjustments.

### 1. Build a "Flow-First" Foundation

Before writing a single media query, create a layout that is naturally responsive using modern CSS.

*   **Use Modern Layouts:** CSS Grid and Flexbox are essential. Use features like `flex-wrap` and `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));` to create flexible grids and components that automatically reflow as their available space changes.
*   **Use Fluid Units:** Rely on relative units.
    *   `rem` for `font-size`, `padding`, `margin` to ensure consistent and accessible scaling.
    *   `%`, `vw`, `vh` for layout elements that need to scale with the viewport.
*   **Use `clamp()` for Fluid Typography & Spacing:** This is a game-changer. Use `clamp(MIN, PREFERRED, MAX)` to create font sizes and spacing that grow with the viewport, but are constrained within a minimum and maximum size. This alone can eliminate many media queries.

    ```css
    h1 {
      /* Font scales with viewport width, but won't shrink below 2rem or grow past 4rem */
      font-size: clamp(2rem, 1rem + 5vw, 4rem);
    }
    ```

### 2. Use Container Queries for Components

This is the most significant evolution in responsive design.

*   **Media Queries:** Change the **global page layout**.
*   **Container Queries:** Change a **component's internal layout**.

This allows you to build truly modular components that adapt to the space they are placed in, not the entire viewport.

**Example:** A card component that can be placed in a main content area or a narrow sidebar.

```css
/* 1. Define the parent as a query container */
.card-wrapper {
  container-type: inline-size;
}

/* 2. The card's default, narrow (stacked) style */
.card {
  display: block;
}
.card img {
  width: 100%;
}

/* 3. The card's style when its container is wide enough */
@container (min-width: 450px) {
  .card {
    display: flex;
  }
  .card img {
    width: 150px;
    margin-right: 1rem;
  }
}
```

### 3. Use Media Queries Strategically

With a fluid foundation and container queries, media queries become a tool for specific, high-level changes.

#### A. For Major Layout Changes
Use them when the entire page structure needs to change.
*   Switching from a single-column to a two-column layout.
*   Showing or hiding a main navigation element.
*   Rearranging major sections of the page.

**Best Practice:** Stick to a **mobile-first** approach with `min-width`.

```css
/* Base styles (mobile) */
.main-content {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .main-layout {
    display: grid;
    grid-template-columns: 3fr 1fr; /* Add a sidebar */
    gap: 2rem;
  }
}
```

#### B. For User Preference Features (Accessibility & UX)
This is a critical modern use case.
*   **Dark Mode:** `@media (prefers-color-scheme: dark)`
*   **Reduced Motion:** `@media (prefers-reduced-motion: reduce)`
*   **Input Device:** `@media (hover: hover)` and `@media (pointer: fine)` to apply hover styles only for mouse users, preventing sticky hover states on touch devices.

```css
/* Only apply hover effect on devices that can actually hover */
@media (hover: hover) {
  .button:hover {
    background-color: #333;
    color: white;
  }
  }
```

### Summary: The 2025 Responsive Design Workflow

1.  **Foundation:** Build with fluid layouts (Grid/Flexbox) and fluid values (`rem`, `clamp()`).
2.  **Components:** Make components self-aware and adaptable using **Container Queries**.
3.  **Global Layout:** Use **Media Queries** for major page structure changes (mobile-first).
4.  **UX/Accessibility:** Use **User Preference Media Queries** to adapt to user needs like dark mode and reduced motion.

By following this guide, you'll write less CSS, create more predictable and maintainable designs, and build better experiences for all users.