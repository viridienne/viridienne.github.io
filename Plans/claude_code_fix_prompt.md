## ⚠️ Read the actual code first — do not assume class names

Before making ANY change, read `index.html` and `styles.css` in full. Use only the selectors and class names that actually exist in those files.

**Confirmed project structure (verified from Finder):**
```
viridienne.github.io/
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── pixel_art_steel_sword_db67aeffb683404f9afa14e6616cbd60.png   ← Gameplay icon
    ├── blue_pixel_diamond_0c3fb284b94c43868499cafa293f360c.png      ← Engine & Code icon
    ├── glowing_pixel_heart_6d969c742ee6434e8224a7f6f57fd5ea.png     ← Pipeline & Tools icon
    ├── open_treasure_chest_pixel_ef2ad4b43f264e0f9d938abf3184a223.png ← Platform & SDK icon
    └── ... (other project images already in use)
```

---

## Fix 1 — Hero Section

**Problem (visible in screenshot):**
- Hero content is top-aligned — large empty black area in the bottom half
- Left gradient is too dark/opaque, the background landscape is nearly invisible on the left
- Text has too little left padding, starts very close to screen edge

**What to do (using actual selectors from `styles.css`):**

1. Find the hero section CSS rule → make it a flex container with `align-items: center` and `min-height: 100vh`. Remove `height: 100vh` if present (it clips on small screens).

2. Find the hero gradient overlay (likely a `::before` or an overlay div) → change the gradient to:
```css
background: linear-gradient(
  to right,
  rgba(0, 0, 0, 0.80) 0%,
  rgba(0, 0, 0, 0.60) 45%,
  rgba(0, 0, 0, 0.10) 100%
);
```

3. Find the hero content wrapper → set `padding-left` to at least `80px` and `max-width` to `580px`.

---

## Fix 2 — Skills Section Icons

**Problem (visible in screenshot):**
The 4 skill cards are using placeholder icons (emoji/icon-font). The correct PNG files are already in `assets/` but are not being used in the HTML.

**What to do:**

1. Open `index.html` → find the 4 skill cards.
2. Identify whatever element is currently used as the icon inside each card (could be `<i>`, `<span>`, emoji text, or a small existing `<img>`).
3. Replace that element with an `<img>` tag pointing to the correct asset file:

| Card | Replace icon with this `src` |
|---|---|
| Gameplay | `assets/pixel_art_steel_sword_db67aeffb683404f9afa14e6616cbd60.png` |
| Engine & Code | `assets/blue_pixel_diamond_0c3fb284b94c43868499cafa293f360c.png` |
| Pipeline & Tools | `assets/glowing_pixel_heart_6d969c742ee6434e8224a7f6f57fd5ea.png` |
| Platform & SDK | `assets/open_treasure_chest_pixel_ef2ad4b43f264e0f9d938abf3184a223.png` |

4. In `styles.css`, find the icon element's CSS rule and set:
```css
width: 72px;
height: 72px;
object-fit: contain;
```

5. Find the skill card hover rule (or add one) and set:
```css
border-color: rgba(255, 184, 0, 0.75);
box-shadow: 0 0 20px rgba(255, 184, 0, 0.15);
```

---

## Do NOT touch
- Any text content (card bullets, titles, taglines)
- The 4-column grid layout
- Any other section (About, Projects, Experience, Footer)
- Existing working asset filenames — do not rename any files
