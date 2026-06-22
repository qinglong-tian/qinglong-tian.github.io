# Qinglong Tian — Personal Academic Website

Single-page static site deployed on GitHub Pages at [qinglong-tian.github.io](https://qinglong-tian.github.io).

## Tech Stack

- **HTML** — single page with all sections
- **CSS** — local stylesheet, no build step or CDN dependency
- **Vanilla JavaScript** — dark mode, scroll animations, mobile nav

## Local Development

No build step required. Serve with any static server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000`.

## Deploy

Push to the `main` branch. GitHub Pages serves the root `index.html` automatically.

## File Structure

```
index.html              — Main page
assets/
  css/style.css         — Visual system and responsive layout
  js/main.js            — Theme, navigation, and reveal interactions
```

## Design

Apple-inspired minimalist design with system fonts, generous whitespace, dark/light mode, and scroll-triggered animations.
