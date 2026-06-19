import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const xlsxPath = path.join(root, 'Recipes dataset and images (1).xlsx');

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
const PREP_TIMES = [10, 15, 20, 25, 30, 35, 40];
const COOK_TIMES = [10, 15, 20, 25, 30, 35, 45];
const SERVINGS = [2, 3, 4, 6];

const DESCRIPTIONS = {
  'Avocado Toast':
    'Crispy sourdough topped with creamy mashed avocado and fresh cherry tomatoes.',
  'Masala Dosa':
    'A South Indian classic — crisp fermented crepe filled with spiced potato masala.',
  Shakshuka:
    'Eggs poached in a rich, spiced tomato and pepper sauce. Perfect for brunch.',
  'Chicken Tikka Bowl':
    'Tender spiced chicken tikka served over fragrant rice with fresh vegetables.',
  'Veggie Buddha Bowl':
    'A nourishing bowl of quinoa, roasted vegetables, chickpeas, and creamy avocado.',
  'Thai Green Curry':
    'A fragrant coconut curry with vegetables and your choice of tofu or chicken.',
  'Grilled Salmon':
    'Perfectly grilled salmon with Nordic-inspired herbs and a light citrus finish.',
  'Paneer Butter Masala':
    'Rich and creamy tomato-based curry with soft paneer cubes and warm spices.',
  'Vegetable Stir Fry':
    'Quick and colorful wok-tossed vegetables in a savory garlic-ginger sauce.',
  'Chocolate Chip Cookies':
    'Classic chewy cookies loaded with melty chocolate chips — always a crowd pleaser.',
};

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function parseIngredients(text) {
  return text
    .split(/,\s*/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseSteps(text) {
  return text
    .split(/\n+/)
    .map((line) => line.replace(/^\d+\.\s*/, '').trim())
    .filter(Boolean);
}

function decodeXml(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function parseSharedStrings(xml) {
  const strings = [];
  const siRegex = /<si>([\s\S]*?)<\/si>/g;
  let match;
  while ((match = siRegex.exec(xml)) !== null) {
    const tRegex = /<t[^>]*>([\s\S]*?)<\/t>/g;
    let text = '';
    let tMatch;
    while ((tMatch = tRegex.exec(match[1])) !== null) {
      text += decodeXml(tMatch[1]);
    }
    strings.push(text);
  }
  return strings;
}

function parseRows(xml, strings) {
  const rows = [];
  const rowRegex = /<row[^>]*>([\s\S]*?)<\/row>/g;
  let rowMatch;
  while ((rowMatch = rowRegex.exec(xml)) !== null) {
    const cells = {};
    const cellRegex = /<c\b([^>]*)>(?:<v>([\s\S]*?)<\/v>)?/g;
    let cellMatch;
    while ((cellMatch = cellRegex.exec(rowMatch[1])) !== null) {
      const attrs = cellMatch[1];
      const ref = attrs.match(/\br="([A-Z]+\d+)"/)?.[1];
      if (!ref) continue;
      const col = ref.replace(/\d+/, '');
      let value = cellMatch[2]?.trim() ?? '';
      if (attrs.includes('t="s"') && /^\d+$/.test(value)) {
        value = strings[Number(value)] ?? value;
      }
      cells[col] = decodeXml(value);
    }
    if (Object.keys(cells).length) rows.push(cells);
  }
  return rows;
}

async function main() {
  const { default: AdmZip } = await import('adm-zip');
  const zip = new AdmZip(xlsxPath);
  const entries = zip.getEntries();

  const sharedStringsXml = zip.readAsText('xl/sharedStrings.xml');
  const sheetXml = zip.readAsText('xl/worksheets/sheet1.xml');
  const strings = parseSharedStrings(sharedStringsXml);
  const rows = parseRows(sheetXml, strings);

  const imagesDir = path.join(root, 'public', 'images');
  fs.mkdirSync(imagesDir, { recursive: true });

  const mediaFiles = entries
    .filter((e) => e.entryName.startsWith('xl/media/') && !e.isDirectory)
    .sort((a, b) => {
      const numA = Number(a.entryName.match(/(\d+)/)?.[1] ?? 0);
      const numB = Number(b.entryName.match(/(\d+)/)?.[1] ?? 0);
      return numA - numB;
    });

  mediaFiles.forEach((entry, index) => {
    const ext = path.extname(entry.entryName) || '.png';
    const filename = `recipe-${index + 1}${ext}`;
    fs.writeFileSync(path.join(imagesDir, filename), entry.getData());
  });

  const dataRows = rows.slice(1);
  const recipes = dataRows.map((row, index) => {
    const name = row.A || `Recipe ${index + 1}`;
    const id = slugify(name);

    return {
      id,
      name,
      cuisine: row.B || 'International',
      mealType: row.C || 'Lunch',
      difficulty: DIFFICULTIES[index % DIFFICULTIES.length],
      prepTime: PREP_TIMES[index % PREP_TIMES.length],
      cookTime: COOK_TIMES[(index + 2) % COOK_TIMES.length],
      servings: SERVINGS[index % SERVINGS.length],
      description:
        DESCRIPTIONS[name] ||
        `A delicious ${row.B || 'homestyle'} ${row.C || 'dish'} worth adding to your recipe box.`,
      ingredients: parseIngredients(row.D || ''),
      instructions: parseSteps(row.E || ''),
      image: `/images/recipe-${index + 1}.png`,
    };
  });

  const dataDir = path.join(root, 'src', 'data');
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(
    path.join(dataDir, 'recipes.json'),
    JSON.stringify(recipes, null, 2),
    'utf8'
  );

  console.log(`Extracted ${recipes.length} recipes to src/data/recipes.json`);
  console.log(`Saved ${mediaFiles.length} images to public/images/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
