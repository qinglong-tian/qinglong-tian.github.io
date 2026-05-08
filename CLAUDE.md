# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

No build step required — this is a pure static HTML site.

```bash
# Serve locally (any static server works)
python3 -m http.server 8000

# Or if you have Node.js
npx serve .
```

## Architecture

This is a **single-page static HTML site** deployed to **GitHub Pages** (qinglong-tian.github.io). No build step, no framework — just HTML, Tailwind CSS (CDN), and vanilla JS.

### File structure

```
index.html              — Single page with all sections
assets/
  css/style.css         — Custom properties (theming), animations, component styles
  js/main.js            — Dark mode, scroll animations, mobile nav, active link tracking
  img/                  — Images and photos
```

### Sections (in order)
1. **Nav** — Fixed glassmorphism nav with dark/light toggle and mobile hamburger menu
2. **Hero** — Name, Chinese name, affiliation, contact links, photo
3. **Research** — Summary with 3 focus area cards (gray background)
4. **Publications** — Full chronological list (20 papers) with year labels
5. **Teaching** — Policy cards for undergraduate research and reference letters
6. **Service & Awards** — Reviewer roles, program committees, education
7. **About/Personal** — Short bio, interests (gray background)
8. **Footer** — Copyright, email, GitHub

### Design system
- **Colors**: CSS custom properties (`--bg`, `--text`, `--accent`, etc.) with light/dark variants controlled by `.dark` class on `<html>`
- **Typography**: System font stack (`-apple-system, BlinkMacSystemFont, ...`), tight tracking, large headlines
- **Animations**: `.reveal` elements observed via IntersectionObserver — fade-in-up with staggered delays (`.reveal-delay-1` through `.reveal-delay-8`)
- **Dark mode**: Toggle in nav, persisted to `localStorage`, respects `prefers-color-scheme`
- **Responsive**: Mobile-first, breakpoints at `md` (768px) and `lg` (1024px)

### Tailwind
Tailwind v4 is loaded via CDN in `<head>`. Dark mode is configured via `darkMode: 'class'`. Custom colors come from CSS variables — Tailwind classes like `bg-[var(--bg-surface)]` reference them directly.

### JavaScript (vanilla, ~3 KB)
All interactive behavior in `assets/js/main.js`:
- `toggleTheme()` — global function bound to the theme toggle button
- IntersectionObserver — reveals `.reveal` elements on scroll
- Scroll listener — adds `.scrolled` class to nav for border
- Mobile nav — hamburger toggle with body scroll lock
- Active section tracking — highlights nav link for visible section

### Legacy Jekyll files
The `.md` files at root (`index.md`, `research.md`, `teaching.md`, `other.md`) and `_layouts/`, `_includes/`, `_config.yml`, `Gemfile` are from the previous Jekyll-based site. They are no longer used for the live site and can be removed.
