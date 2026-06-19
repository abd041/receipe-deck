# RecipeDeck

A responsive React frontend for browsing interactive digital recipe cards. Users can search, filter, flip, expand, and save favorites locally.

## Features

- Interactive recipe cards with **flip** and **expand** interactions
- Recipe detail view with ingredients / instructions tabs
- Search by recipe name
- Filter by cuisine, difficulty, meal type, and prep time
- Favorites saved in **localStorage**
- Responsive layout for desktop, tablet, and mobile
- Deployment-ready static build

## Tech Stack

- React 18
- Vite
- React Router

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Build for Production

```bash
npm run build
npm run preview
```

The static output is generated in `dist/` and can be deployed to Netlify, Vercel, GitHub Pages, or any static host.

## Project Structure

```
receipe-deck/
├── public/images/          # Recipe images extracted from dataset
├── src/
│   ├── components/         # UI components
│   ├── contexts/           # Shared app state (favorites)
│   ├── data/recipes.json   # Recipe dataset
│   ├── hooks/              # Filters, scroll, media queries
│   └── pages/              # Browse, detail, favorites
├── scripts/extract-recipes.mjs
└── Recipes dataset and images (1).xlsx
```

## Dataset Notes

The client Excel file includes:

- Dish name
- Cuisine
- Meal type
- Ingredients
- Instructions
- Reference images

The following fields currently use **placeholder values** until the client provides an updated dataset:

- Difficulty
- Prep time
- Cook time
- Servings

To regenerate `src/data/recipes.json` and `public/images/` after updating the Excel file:

```bash
npm run extract-data
```

## Deployment

### Netlify / Vercel

1. Push the repository to GitHub
2. Import the project
3. Build command: `npm run build`
4. Publish directory: `dist`

For client-side routing, `public/_redirects` (Netlify) and `vercel.json` (Vercel) are included.

## Client Assets

- `Brand_Color_Reference.webp`
- `Moodboard.webp`
- `RecipeDeck Project Overview PRD.webp`
- `Recipes dataset and images (1).xlsx`

## License

Private client project.
