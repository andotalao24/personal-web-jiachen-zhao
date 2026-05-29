# Jiachen Zhao — Personal Homepage

Personal academic homepage for Jiachen Zhao, a PhD student at Northeastern
University. Hand-written static HTML / CSS / vanilla JavaScript — no
framework, no build step.

- **link:** https://andotalao24.github.io/personal-web-jiachen-zhao/ 
- **Author:** Jiachen Zhao
- **Class:** _(replace with the course's Canvas / syllabus link)_

## Project objective

Build a small, fast, easy-to-maintain personal site that:

1. Surfaces recent publications and research projects at a glance.
2. Demonstrates the course's required practices — ES6 modules, separated
   CSS/JS/images folders, semantic HTML, meta tags, Prettier formatting,
   ESLint, and at least one original interactive component (the
   year-and-keyword publication filter).
3. Stays small enough that updates are a single edit to one HTML file.


## Pages

| URL              | Source          | Purpose                                                         |
| ---------------- | --------------- | --------------------------------------------------------------- |
| `/`              | `index.html`    | Bio, publications (filterable by year + keyword)                |
| `/projects.html` | `projects.html` | Research projects with supervisors and dates                    |
| `/photos.html`   | `photos.html`   | Tadao Ando photo gallery with hover captions (AI-assisted page) |

## Folder layout

```
.
├── index.html              homepage
├── projects.html           research projects
├── photos.html             photo space (AI-assisted)
├── css/
│   └── styles.css
├── js/
│   ├── main.js             ES module entry
│   └── components/
│       └── pub-filter.js   original interactive component
├── images/                 avatar, favicon
├── files/                  PDFs linked from publications
├── photos/                 (drop user photos here)
├── design_document/
│   ├── design.md           design document
│   └── mockups/            (optional design assets)
├── package.json            type=module, dev deps
├── eslint.config.js
├── .prettierrc
├── .nojekyll               disables Jekyll on GitHub Pages
└── LICENSE
```

## Build / run instructions

The site is plain static files, so there is nothing to compile. You only
need a local HTTP server because ES modules do not load over `file://`.

### Prerequisites

- A modern browser
- One of: Python 3, Node.js, or a "Live Server"-style editor extension

### Run locally

Pick any one:

```bash
# Python (no install needed on most systems)
python -m http.server 8000
# → open http://localhost:8000/
```

```bash
# Node
npx serve .
# → opens at the URL it prints
```

```bash
# VS Code
# Install the "Live Server" extension, right-click index.html → Open with Live Server
```

### Format and lint (optional, requires Node)

```bash
npm install           # one-time, installs Prettier + ESLint
npm run format        # Prettier — formats HTML / CSS / JS
npm run lint          # ESLint — checks js/
```

### Deploy

Push to `andotalao24/andotalao24.github.io`. GitHub Pages serves the repo
root over HTTPS automatically; the `.nojekyll` file disables Jekyll
processing so the files are served as-is.

```bash
git add -A
git commit -m "Update site"
git push
```

The site goes live at `https://andotalao24.github.io/` within ~1 minute.

## Original component

`js/components/pub-filter.js` is the original interactive component:

- Text search over publication titles and authors.
- Year filter (button group) — switches the visible year.
- Combines both filters and additionally hides year headings (`<h3>`) when
  all of their publications are filtered out.

The component is loaded as an ES module:

```html
<script type="module" src="js/main.js"></script>
```

## Design document

See [`design_document/design.md`](design_document/design.md) for the full design document —
project description, user personas, user stories, and mockups.

## License

MIT — see [`LICENSE`](LICENSE).
