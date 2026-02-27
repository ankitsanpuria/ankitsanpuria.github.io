# UI Theme System Documentation

This document describes the dynamic theme system used in this project. You can reuse it in other projects for consistent theming with light/dark support and multiple color palettes.

---

## Overview

The theme system provides:

- **Three semantic color scales**: `primary`, `secondary`, `tertiary` (50–950)
- **Four surface tokens**: `surface`, `surface-raised`, `surface-overlay`, `surface-inset` (for backgrounds that adapt to light/dark)
- **Five themes**: 3 light (default, emerald, rose) and 2 dark (midnight, nightfall)
- **Runtime switching** via `data-theme` on `<html>`

Requires **Tailwind CSS v4** and **OKLCH** color format for perceptual uniformity.

---

## File Structure

```
src/
├── theme.css          # Token definitions + theme palettes
├── index.css          # Base styles, imports theme.css
└── index.html         # data-theme on <html>
```

---

## 1. Color Tokens

### Primary, Secondary, Tertiary (50–950)

Each scale has 11 steps: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`.

| Scale      | Role                                                                 |
|-----------|----------------------------------------------------------------------|
| **Primary**   | Brand color, CTAs, links, focus rings                                |
| **Secondary** | Neutrals, text, borders, subtle backgrounds; **inverted in dark mode** |
| **Tertiary**  | Accent / complementary color                                         |

**Usage in Tailwind:**
```
bg-primary-500        text-primary-700        border-primary-300
bg-secondary-100      text-secondary-800      border-secondary-200
bg-tertiary-50        text-tertiary-600
```

### Surface Tokens

For backgrounds that must work in both light and dark themes. **Never use `bg-white` or `bg-black`** for themeable surfaces.

| Token             | Light mode         | Dark mode           | Use for                          |
|-------------------|--------------------|---------------------|----------------------------------|
| `surface`         | Light gray         | Very dark           | Page background, body            |
| `surface-raised`  | White              | Slightly lighter    | Cards, sidebar, header, dropdowns|
| `surface-overlay` | White              | Elevated dark       | Modals, tooltips, popovers       |
| `surface-inset`   | Light gray         | Darker              | Input backgrounds, search bars   |

**Usage:**
```
bg-surface
bg-surface-raised
bg-surface-overlay
bg-surface-inset
```

---

## 2. theme.css Implementation

### Step 1: @theme inline (Tailwind v4)

Map CSS variables to Tailwind color utilities:

```css
@theme inline {
  /* Primary */
  --color-primary-50: var(--primary-50);
  --color-primary-100: var(--primary-100);
  /* ... 50 through 950 */
  
  /* Secondary */
  --color-secondary-50: var(--secondary-50);
  /* ... */
  
  /* Tertiary */
  --color-tertiary-50: var(--tertiary-50);
  /* ... */
  
  /* Surface tokens */
  --color-surface: var(--surface);
  --color-surface-raised: var(--surface-raised);
  --color-surface-overlay: var(--surface-overlay);
  --color-surface-inset: var(--surface-inset);
}
```

### Step 2: Define Theme Palettes

For each theme, set `--primary-*`, `--secondary-*`, `--tertiary-*`, and `--surface*`.

**Light themes:** Secondary scale is normal (50 = lightest, 950 = darkest).

```css
:root,
[data-theme='default'] {
  color-scheme: light;
  --surface: oklch(0.984 0.003 247.858);
  --surface-raised: oklch(1 0 0);
  --surface-overlay: oklch(1 0 0);
  --surface-inset: oklch(0.968 0.007 247.896);
  
  --primary-50: oklch(0.97 0.014 254.604);
  --primary-100: oklch(0.932 0.032 255.585);
  /* ... primary-200 through primary-950 */
  
  --secondary-50: oklch(0.984 0.003 247.858);
  /* ... secondary-100 through secondary-950 */
  
  --tertiary-50: oklch(0.969 0.016 293.756);
  /* ... tertiary-100 through tertiary-950 */
}
```

**Dark themes:** Invert the secondary scale (50 = darkest bg, 950 = lightest text).

```css
[data-theme='midnight'] {
  color-scheme: dark;
  --surface: oklch(0.145 0.014 265);
  --surface-raised: oklch(0.185 0.014 265);
  --surface-overlay: oklch(0.21 0.014 265);
  --surface-inset: oklch(0.125 0.014 265);
  
  /* Primary: brighter for dark bg */
  --primary-50: oklch(0.24 0.06 260);
  --primary-500: oklch(0.65 0.22 259);
  --primary-900: oklch(0.92 0.05 255);
  /* ... */
  
  /* Secondary: inverted */
  --secondary-50: oklch(0.145 0.014 265);   /* darkest */
  --secondary-950: oklch(0.96 0.003 253);   /* lightest */
  /* ... */
}
```

---

## 3. index.css Integration

```css
@import 'tailwindcss';
@import './theme.css';

:root {
  font-family: 'Figtree', system-ui, sans-serif;
  color: var(--secondary-800);
  background-color: var(--surface);
  /* ... */
}

/* Links use primary */
a {
  color: var(--primary-600);
}
a:hover {
  color: var(--primary-700);
}

/* Do NOT reset button border/background/padding globally—components need them */
button {
  cursor: pointer;
}
```

---

## 4. HTML Setup

Set the initial theme on `<html>`:

```html
<html lang="en" data-theme="default">
```

---

## 5. Theme Switcher (JavaScript/React)

To switch themes at runtime:

```ts
const themes = ['default', 'emerald', 'rose', 'midnight', 'nightfall'] as const
type Theme = typeof themes[number]

function setTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('membership_theme', theme)  // optional: persist
}

function getTheme(): Theme {
  return (localStorage.getItem('membership_theme') as Theme) 
    ?? (document.documentElement.getAttribute('data-theme') as Theme) 
    ?? 'default'
}
```

Initialize on mount:

```ts
useEffect(() => {
  const stored = getTheme()
  document.documentElement.setAttribute('data-theme', stored)
}, [])
```

---

## 6. Component Usage Guidelines

### Do

- Use `bg-surface`, `bg-surface-raised`, `bg-surface-overlay`, `bg-surface-inset` instead of `bg-white` / `bg-black`
- Use `text-secondary-800` for headings, `text-secondary-600` for body, `text-secondary-500` for muted
- Use `border-secondary-200` for borders
- Use `bg-primary-600` for primary buttons, `text-primary-600` for links

### Don't

- Use global `button { border: none; background: none; padding: 0 }` — it overrides Tailwind utilities
- Use hardcoded `bg-white` or `#ffffff` for themeable surfaces
- Use `text-black` / `text-white` for themeable text; use secondary scale instead

---

## 7. Adding a New Theme

1. Add a new `[data-theme='your-theme']` block in `theme.css`.
2. Define `--surface*`, `--primary-*`, `--secondary-*`, `--tertiary-*`.
3. Set `color-scheme: light` or `color-scheme: dark`.
4. Add `'your-theme'` to the themes array in your theme switcher.

Example (light theme):

```css
[data-theme='ocean'] {
  color-scheme: light;
  --surface: oklch(0.98 0.01 220);
  --surface-raised: oklch(1 0 0);
  --surface-overlay: oklch(1 0 0);
  --surface-inset: oklch(0.97 0.01 220);
  /* primary: teal/cyan tones */
  --primary-50: oklch(0.97 0.02 195);
  /* ... */
  /* secondary: slate */
  --secondary-50: oklch(0.985 0.005 250);
  /* ... */
  /* tertiary: amber */
  --tertiary-50: oklch(0.97 0.03 85);
  /* ... */
}
```

---

## 8. OKLCH Reference

Colors use **OKLCH** for perceptual uniformity:
- `L` = lightness (0–1)
- `C` = chroma (0–0.4 typical)
- `H` = hue (0–360): blue ~250, green ~150, red ~25, violet ~300

Tool: [oklch.com](https://oklch.com) for picking values.

---

## 9. Built-in Themes Summary

| Theme     | Type | Primary   | Vibe                 |
|-----------|------|-----------|----------------------|
| default   | Light| Blue      | Neutral, professional|
| emerald   | Light| Green     | Fresh, growth        |
| rose      | Light| Red/pink  | Warm, accent         |
| midnight  | Dark | Blue      | Cool dark            |
| nightfall | Dark | Violet    | Warm dark            |

---

## 10. Quick Copy Checklist

When porting to a new project:

1. Copy `theme.css` into `src/`.
2. Add `@import './theme.css'` after `@import 'tailwindcss'` in your main CSS.
3. Set `data-theme="default"` on `<html>` in `index.html`.
4. Use surface tokens instead of `bg-white` / `bg-black`.
5. Implement a theme switcher that sets `document.documentElement.setAttribute('data-theme', theme)`.
6. Avoid global button resets that strip `border`, `background`, `padding`.
