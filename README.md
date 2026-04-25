# Wikipedia-style Portfolio

A single-page portfolio website built to mimic the look and feel of a Wikipedia article for Abdullah.

## Files

- `index.html` — main page
- `style.css` — layout and theme styles
- `script.js` — theme persistence, TOC interaction, edit toast, search behavior, and dynamic date
- `assets/logo.svg` — site logo
- `assets/avatar-placeholder.svg` — placeholder photo graphic

## Usage

Open `index.html` in your browser directly, or deploy the folder to GitHub Pages / Netlify.

## Features

- Dark / Light theme toggle with persistent `localStorage` setting
- Wikipedia-style top bar, tabs, breadcrumb, infobox, TOC, sections, references, footer, and mobile behavior
- Sticky TOC on desktop and collapsible TOC on mobile
- Smooth scrolling, `window.print()` support, and active section highlighting with `IntersectionObserver`
