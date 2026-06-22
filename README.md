# RecipeDeck

Interactive digital recipe card collection built with React. Browse, search, filter, flip, expand, and save favorites — all in the browser with no backend required.

## Delivery Package Contents

| Item | Location |
|------|----------|
| Source code | `src/` |
| Recipe dataset (JSON) | `src/data/recipes.json` |
| Recipe images | `public/images/` |
| Original Excel dataset | `Recipes dataset and images (1).xlsx` |
| Data extraction script | `scripts/extract-recipes.mjs` |
| Package manifest | `package.json` |
| Build config | `vite.config.js` |
| SPA routing (Netlify) | `public/_redirects` |
| SPA routing (Vercel) | `vercel.json` |
| Brand references | `Brand_Color_Reference.webp`, `Moodboard.webp` |
| Project requirements | `RecipeDeck Project Overview PRD.webp` |

## Features

- **Full dataset** — All 10 recipes from the provided Excel file, with images
- **Instant filters** — Cuisine, Difficulty, Preparation Time, and Meal Type update results immediately (no page reload)
- **Interactive cards** — Flip for ingredients, expand for a recipe preview before opening full details
- **Recipe detail view** — Ingredients, instructions, preparation time, cooking time, serving size, and cuisine category
- **Favorites** — Saved to `localStorage`
- **Responsive** — Desktop, laptop, tablet, and mobile layouts

## Tech Stack

- React 18
- Vite 5
- React Router 6

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Production Build

```bash
npm run build
```

Output is written to `dist/`.

Preview the production build locally:

```bash
npm run preview
```

## Deployment

### Netlify

1. Connect the repository
2. **Build command:** `npm run build`
3. **Publish directory:** `dist`
4. `public/_redirects` handles client-side routing automatically

### Vercel

1. Import the project
2. **Build command:** `npm run build`
3. **Output directory:** `dist`
4. `vercel.json` rewrites all routes to `index.html`

### Other static hosts

Upload the contents of `dist/` after running `npm run build`. Configure the host to serve `index.html` for all routes (SPA fallback).

## Project Structure

```
receipe-deck/
├── public/
│   ├── images/              # Recipe images (recipe-1.png … recipe-10.png)
│   ├── _redirects           # Netlify SPA fallback
│   └── favicon.svg
├── src/
│   ├── components/          # UI components (cards, filters, hero, etc.)
│   ├── contexts/            # Shared state (favorites)
│   ├── data/recipes.json    # Generated recipe dataset
│   ├── hooks/               # Filters, scroll, media queries
│   └── pages/               # Home, recipe detail, favorites
├── scripts/
│   ├── extract-recipes.mjs  # Regenerate JSON + images from Excel
│   └── count-recipes.mjs    # Verify recipe count in Excel
├── package.json
├── vite.config.js
└── Recipes dataset and images (1).xlsx
```

## Dataset

The Excel file provides:

- Dish name
- Cuisine
- Meal type
- Ingredients
- Instructions
- Reference images

**10 recipes** are included (verified against the source file):

1. Avocado Toast  
2. Masala Dosa  
3. Shakshuka  
4. Chicken Tikka Bowl  
5. Veggie Buddha Bowl  
6. Thai Green Curry  
7. Grilled Salmon  
8. Paneer Butter Masala  
9. Vegetable Stir Fry  
10. Chocolate Chip Cookies  

### Regenerating data after an Excel update

```bash
npm run extract-data
```

This updates `src/data/recipes.json` and `public/images/`.

### Verify recipe count

```bash
node scripts/count-recipes.mjs
```

### Placeholder metadata

Difficulty, preparation time, cooking time, and serving size use generated values until the client provides these columns in the Excel file. Re-run `npm run extract-data` after updating the spreadsheet.

## Brand & Design

Colors and card interactions follow the client references:

- **Olive green** `#6b8e23` — primary actions and accents
- **Cream** `#fffff5` — page background
- **Beige** `#f2e8d5` — card backs and panels
- **Charcoal** `#1f1f1f` — body text

The recipe card collection is the primary focus on the home page, with browse and filters placed directly below the hero.

## Routes

| URL | Page |
|-----|------|
| `/` | Home — browse, search, filters, card grid |
| `/recipe/:id` | Full recipe detail |
| `/favorites` | Saved favorites |

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). JavaScript required.

## License

Private client project.
