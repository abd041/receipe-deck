import AdmZip from 'adm-zip';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const zip = new AdmZip(path.join(root, 'Recipes dataset and images (1).xlsx'));
const sharedStringsXml = zip.readAsText('xl/sharedStrings.xml');
const sheetXml = zip.readAsText('xl/worksheets/sheet1.xml');

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

const strings = parseSharedStrings(sharedStringsXml);
const rows = parseRows(sheetXml, strings);
const dataRows = rows.slice(1).filter((row) => row.A?.trim());

console.log(`Recipes with names: ${dataRows.length}`);
dataRows.forEach((row, index) => {
  console.log(`${index + 1}. ${row.A} | ${row.B} | ${row.C}`);
});
