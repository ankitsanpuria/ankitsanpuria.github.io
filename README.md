# Personal Portfolio

A production-ready personal portfolio website built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Optimized for GitHub Pages deployment.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** – Fast build tooling
- **Tailwind CSS v4** – Utility-first styling
- **Framer Motion** – Animations
- **GitHub Pages** – Static hosting

## Project Structure

```
src/
├── components/
│   ├── layout/       # Header, Section wrapper
│   ├── sections/     # Hero, About, Skills, Projects, Experience, Architecture, Contact, Footer
│   └── ui/           # Button, Card, Modal, ThemeToggle
├── context/          # ThemeContext (dark/light)
├── data/             # content.ts – placeholder content for sections
├── hooks/            # useIntersectionObserver
├── types/            # Shared TypeScript interfaces
├── App.tsx
├── main.tsx
└── index.css
```

## Features

- **Responsive** – Mobile-first design
- **Dark/Light theme** – Toggle with persistence
- **Accessible** – Semantic HTML, ARIA, focus management
- **SEO** – Meta tags, JSON-LD schema
- **Smooth scrolling** – In-page navigation
- **Project modals** – Detailed project view with filtering
- **Intersection observer** – Scroll-triggered animations

## Customization

Edit `src/data/content.ts` to update:

- `siteConfig` – Name, title, tagline
- `projects` – Project cards and modal content
- `experience` – Timeline entries
- `skills` – Skill groups
- `aboutContent` – About section
- `architectureHighlights` – Architecture section
- `contactLinks` – LinkedIn, GitHub, email URLs

Add `public/resume.pdf` for the resume download button. Update `index.html` meta tags and `public/favicon.svg` as needed.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output goes to `dist/`.

## GitHub Pages Deployment

### Option 1: GitHub Actions (recommended)

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

2. Enable GitHub Pages: **Settings → Pages → Source: GitHub Actions**.

### Option 2: Manual deploy

1. Run `npm run build`
2. Copy contents of `dist/` into a `gh-pages` branch or use `gh-pages`:

```bash
npm install -D gh-pages
```

Add to `package.json`:

```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

Then: `npm run deploy`

### Base URL

- **User/org site** (`username.github.io`): `base: '/'` in `vite.config.ts` (default)
- **Project site** (`username.github.io/repo`): set `base: '/repo/'` in `vite.config.ts`

## License

MIT
