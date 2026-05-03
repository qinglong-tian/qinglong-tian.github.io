# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
bundle install

# Start local dev server (auto-rebuilds)
bundle exec jekyll serve

# Build site for production
bundle exec jekyll build
```

## Architecture

This is a **Jekyll 4.3** static site deployed to **GitHub Pages** (qinglong-tian.github.io). Markdown files in the root become HTML pages via kramdown.

### Page system
- Each `.md` file at the root is a page. Pages use YAML frontmatter: `layout: default`, `title`, `order` (nav sort), and `nav: false` to hide from nav.
- The `index.md` home page has `nav: false` — it's only reachable via the site title link, not the nav bar.

### Navigation
`_includes/navigation.html` auto-generates the nav by iterating `site.pages`, sorted by `order`, excluding pages where `nav` is explicitly `false` or title is missing. The current page gets the `.active` CSS class.

### Layout
`_layouts/default.html` wraps all pages with the HTML shell (header with title + nav, main content area, footer with copyright year).

### Styling
`assets/css/style.css` uses CSS custom properties (`--text`, `--bg`, `--accent`, etc.) for theming. The profile section on the home page uses a `.profile` flex layout. Publications use `.pub-list` styled list items with `.pub-title`, `.pub-meta`, `.pub-links` child elements.

### Config
`_config.yml` sets the site title, email, description, base URL, and excludes Gemfile/Gemfile.lock/README.md from the built output. The `url` is set for the GitHub Pages user site.
