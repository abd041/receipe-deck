# RecipeDeck — Client Delivery Notes

**Version:** 1.1 (Revision 2)  
**Stack:** React 18 + Vite + React Router  
**Dataset:** 10 recipes from `Recipes dataset and images (1).xlsx`

---

## Quick Start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
```

---

## What Was Already in Version 1

- Interactive recipe cards with **flip** (ingredients on back) and **expand**
- Home page with hero, featured recipe, how-it-works, and recipe grid
- Search by recipe name
- Filters for cuisine, difficulty, meal type, and prep time
- Recipe detail page with ingredients and instructions
- Favorites saved in browser localStorage
- Responsive layout (desktop, tablet, mobile)
- Static production build (`dist/`)

---

## What Was Updated in Revision 2

### Dataset
- Confirmed all **10 recipes** from the Excel file are included with images
- Added recipe count verification script: `npm run count-recipes`
- Extraction script skips empty rows when regenerating data

### Filters
- Renamed filter to **Preparation time** (per requirements)
- Reordered filters: Cuisine → Difficulty → Preparation time → Meal type
- Preparation time uses standard buckets (10–40 min); results update **instantly** without page reload
- Fixed mobile dropdown menus appearing behind recipe cards

### Card expansion
- Expand now shows a full **recipe preview** before the detail page:
  - Preview badge, description, prep/cook/servings/difficulty/meal type
  - Key ingredients list
  - Collapse and View Recipe actions
- Smooth expand animation and scroll-into-view on mobile

### UI & brand alignment
- Recipe **card collection moved to primary position** (directly below hero)
- Cards styled with brand cream/beige surfaces and olive accents
- Hero height reduced so users reach the deck faster

### Recipe detail page
- Structured info grid showing:
  - Cuisine, difficulty, preparation time, cooking time, serving size, meal type
- Ingredients and instructions (side-by-side on desktop, tabs on mobile)
- Start Cooking scrolls to instructions

### Deployment package
- Complete README with install, build, deploy, and project structure
- Netlify (`public/_redirects`) and Vercel (`vercel.json`) SPA routing configs
- `package.json` with all scripts documented

---

## Note on Placeholder Data

The Excel file does not include columns for **difficulty**, **preparation time**, **cooking time**, or **serving size**. These values are generated during extraction. When the client adds these columns to the spreadsheet, run:

```bash
npm run extract-data
```

---

## Routes

| URL | Description |
|-----|-------------|
| `/` | Browse, search, filter, and interact with cards |
| `/recipe/:id` | Full recipe detail |
| `/favorites` | Saved favorites |
