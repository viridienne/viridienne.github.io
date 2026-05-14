# Claude Code Prompt: Viridienne Portfolio Redesign

## Task
Rebuild my Unity developer portfolio website (`viridienne.github.io`) with a modernized design while keeping all existing content, the dark gaming aesthetic, and the amber/yellow color identity. The goal is to upgrade the visual design to match 2025 trending portfolio standards — more editorial, more breathable, more polished — without losing the game dev personality.

## Reference Materials
- **Current site**: https://viridienne.github.io/
- **Current screenshots**: [attach the 5 screenshots]
- **Target redesign**: [attach the AI-generated redesign reference image]

---

## Design System to Apply

### Colors
```
Background:        #0f0f0f  (near black)
Surface cards:     #1a1a1a
Border/divider:    #2a2a2a
Accent primary:    #FFB800  (amber/yellow — keep this, it's the brand)
Accent glow:       rgba(255, 184, 0, 0.15)
Text primary:      #ffffff
Text secondary:    #a0a0a0
Text muted:        #555555
```

### Typography
```
Section headings:  Keep pixel font (Press Start 2P or current font) — but ONLY for section titles
Body / Nav / Tags: DM Sans or Inter (clean modern sans-serif) — replace current monospace body text
Heading sizes:     Hero name 72px, Section titles 28px, Card titles 20px, Body 15px
```

### Spacing & Layout
```
Max content width: 1200px centered
Section padding:   120px top/bottom
Grid gap:          24px
Border radius:     12px for cards, 8px for tags/buttons
```

---

## Section-by-Section Rebuild Instructions

### 1. Navbar
- Sticky, transparent on scroll-top → solid `#0f0f0f` + subtle bottom border on scroll
- Left: "Viridienne" logo with amber dot pulse animation beside it
- Right: nav links (Home, About, Skills, Projects, Experience, Contact) in DM Sans, uppercase, small tracking
- Active link: amber underline indicator
- Far right: gamepad icon button (decorative, links to itch.io)
- No background box — fully transparent blur navbar

### 2. Hero Section
- **Full-bleed background**: keep the dark fantasy landscape image, remove the black centered box entirely
- Add a dark gradient overlay: `linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.2) 100%)`
- Content LEFT-ALIGNED, vertically centered, max-width 600px
- Layout (top to bottom):
  - Small label: `● UNITY DEVELOPER` in amber, DM Sans, uppercase, letter-spacing
  - H1: `Hi, I'm Viridienne` — bold, white, 72px, DM Sans
  - H2: `Unity Developer` — amber color, 36px, can keep pixel font here
  - Tagline: `Transforming gaming passion into a profession` — gray, 16px, DM Sans
  - Two CTA buttons side by side:
    - Primary: amber fill, dark text, `View My Work →`
    - Secondary: transparent, amber border, `About Me`
  - Social icons row: GitHub, LinkedIn, email — small, circular, subtle
- Add floating particle/sparkle CSS animation (small amber dots floating upward) on the hero

### 3. About Section
- Remove the background image entirely — plain dark background
- Two-column layout: left = large quote-style text, right = quick stats
- Left: Large italic quote `"I make games that click."` in amber, then body paragraph in DM Sans gray
- Right: 3–4 stat boxes (e.g., `3+ yrs experience`, `10+ shipped titles`, `4 companies`)
- Clean, no cards — just spacing and typography

### 4. Skills Section
- Keep section heading in pixel font: `SKILLS & TECHNOLOGIES`
- Replace 12 individual cards with **4 grouped category cards** (glassmorphism style):
  - `Gameplay` — Systems, mechanics, combat, puzzle design, game feel
  - `Engine & Code` — Unity, C#, DOTS, Shader Graph, Cinemachine
  - `Pipeline & Tools` — MCP, Claude Code, Cursor, AI workflows, GitLab
  - `Platform & SDK` — Firebase, Ads SDK, IAP, Mobile, Balancy
- Each card: dark surface `#1a1a1a`, amber glow border `1px solid rgba(255,184,0,0.3)`, icon on top, category name in pixel font, bullet list in DM Sans
- Hover: border brightens to full amber, subtle amber glow box-shadow

### 5. Featured Projects
- Keep section heading in pixel font: `FEATURED PROJECTS`
- Change card layout to **full-bleed image cards with overlay**:
  - Full card = game screenshot background
  - Dark gradient overlay from bottom 60%: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)`
  - Title + tags + CTA links sit ON TOP of the overlay at the bottom of the card
  - Card height: 380px
  - On hover: image scales up slightly (transform: scale(1.03)), overlay darkens, external link icon appears top-right
- 3-column grid, all 9–10 projects shown (or paginated with "Load More")

### 6. Experience Section
- Keep section heading in pixel font: `EXPERIENCE`
- Replace plain cards with a **vertical timeline layout**:
  - Left column (120px wide): date range in amber, small, DM Sans (e.g., `FEB 2025 – NOW`)
  - Center: amber vertical line with amber circle dot at each entry
  - Right column: card with `#1a1a1a` background:
    - Company logo (keep existing logos/icons) + Role title in amber pixel font + company name + location
    - Summary paragraph in DM Sans gray
    - Bullet points in DM Sans white
    - Tech tag chips (outlined, amber text, dark fill)
- Animate on scroll: each timeline entry slides in from right with opacity fade

### 7. Contact / Footer
- Add a full-width CTA strip above footer:
  - Dark surface `#111`, centered text: `"Let's build something legendary."`
  - Subtext: `Open to new opportunities, collaborations, and exciting game projects.`
  - Amber button: `Get In Touch →`
- Footer: minimal — copyright left, social icons center, nav links right

---

## Animations & Interactions

```
Scroll reveal:     All sections fade-in + translateY(30px → 0) on entering viewport
                   Use IntersectionObserver, threshold 0.1, staggered children

Nav scroll:        Transparent → solid background transition on scroll > 80px

Hero particles:    Small amber dots (4–6px), random float upward, opacity 0→1→0
                   CSS keyframes, 6–8 particles, staggered delays

Project cards:     image scale + overlay darken on hover (transition: 0.3s ease)

Skill cards:       border-color + box-shadow glow on hover (transition: 0.25s)

Timeline entries:  slide-in from right on scroll, 0.1s stagger between items

Buttons:           subtle translateY(-2px) + brightness on hover
```

---

## Technical Requirements
- **Pure HTML + CSS + vanilla JS** (no framework) — keep the same stack as current site
- All animations via CSS transitions / keyframes + IntersectionObserver in JS
- Mobile responsive: single column below 768px, stacked timeline on mobile
- Keep all existing links (itch.io, Google Play, App Store, YouTube) exactly as they are
- Keep all existing content (bio text, bullet points, project descriptions) word-for-word
- Google Fonts import: `DM Sans` (weights 400, 500, 600, 700)
- Do NOT remove the pixel font — keep it for section headings and role titles only
- Preserve the hero background image and all project screenshot images

---

## What to Keep Exactly As-Is
- All text content (bio, experience bullets, project descriptions, tagline)
- All external links (itch.io, Play Store, App Store, GitHub, LinkedIn, email)
- The hero background fantasy landscape image
- All project screenshot images
- The amber + dark color identity
- The pixel font for headings (just not for body text anymore)
- Contact email and social handles
