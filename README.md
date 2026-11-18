# Nathaniel Marbell — Digital Marketing Portfolio

A static, single-page portfolio site built from the *Digital Marketing Portfolio* deck.
Theme: deep navy (`#0B1C33`) + signal orange (`#FF6B23`), League Spartan + DM Sans.

**Sections:** Home · Introduction · About · Services · Approach · Case Studies (filterable) · Skills & Tools · Contact

## Structure
```
index.html      # all content
styles.css      # theme + responsive layout
script.js       # nav, scroll reveal, count-up stats, case-study filters
assets/img/     # images extracted from the deck
vercel.json     # static hosting config
```

## Run locally
No build step. Open `index.html` via any static server, e.g.:
```bash
npx serve .
```

## Deploy to Vercel
1. Push this repo to GitHub.
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework preset: **Other**. Leave build command empty, output directory `./`.
4. Deploy. Every push to `main` redeploys automatically.

## Editing content
All text lives in `index.html`. Colors are CSS variables at the top of `styles.css`.
