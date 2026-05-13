# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal portfolio website for a Unity developer (Viridienne), deployed via GitHub Pages. No build tools, no package manager, no framework — pure HTML/CSS/JS.

## Developing

Preview locally by opening `index.html` directly in a browser, or serve with any static server:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Deploy by pushing to the `main` branch — GitHub Pages serves the repo root automatically.

## Architecture

Three source files + one local image asset:

- `index.html` — all page structure and content. Sections in order: `#home` (hero), `#about`, `#experience`, `#skills`, `#projects`, `#contact`
- `styles.css` — all styling. Dark pixel/retro theme. CSS variables defined in `:root`: `--primary-color`, `--secondary-color`, `--background-color`, `--text-color`, `--card-background`, `--pixel-font`
- `script.js` — smooth scrolling, nav background-on-scroll, contact form handler, skill card scroll-in animation via `IntersectionObserver`
- `the swordman.png` — local project screenshot (only local image; all other images are external URLs)

## Key Patterns

**Project cards** use decorative `div.pixel-corner` and `div.pixel-edge` elements inside each `.project-card` to create the retro pixel-border effect — these are purely visual and must be included when adding new project cards.

**Experience skill toggles** use `toggleSkills(btn)` defined inline at the bottom of `index.html` (not in `script.js`). The button toggles the adjacent `.skills-list` sibling.

**Contact form** currently shows an `alert()` on submit — there is no backend. Integrating a real form service (e.g. Formspree) would require updating the `<form>` action and the submit handler in `script.js`.

**External dependencies** loaded via CDN (no local copies):
- Google Fonts: `Press Start 2P` (pixel font used site-wide via `--pixel-font`)
- Font Awesome 6.0.0 (icons in skills and contact sections)
