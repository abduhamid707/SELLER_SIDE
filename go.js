import fs from 'fs';
import path from 'path';
import os from 'os';

const desktopPath = path.join(os.homedir(), 'Desktop');
const EXCLUDED_DIRS = ['node_modules', '.git', '.next', 'dist', 'build', 'out'];
const comment = process.argv[2] || '';
const inputPath = path.resolve('./src');

const structureLines = [];
const codeLines = [];

if (!fs.existsSync(inputPath)) {
  console.error(`❗ 'src' papkasi topilmadi: ${inputPath}`);
  process.exit(1);
}

structureLines.push(` Izoh: ${comment}\n`);
structureLines.push(`papka> Loyihangiz: src\n`);

function traverseStructure(dirPath, depth = 0) {
  const indent = '  '.repeat(depth);
  const items = fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(item => !EXCLUDED_DIRS.includes(item.name));

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      structureLines.push(`${indent}Papka> ${item.name}`);
      traverseStructure(fullPath, depth + 1);
    } else {
      const ext = path.extname(item.name);
      if (['.js', '.ts', '.jsx', '.tsx'].includes(ext)) {
        structureLines.push(`${indent}File> ${item.name}`);
      }
    }
  }
}

function traverseWithCode(dirPath, depth = 0) {
  const indent = '  '.repeat(depth);
  const items = fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(item => !EXCLUDED_DIRS.includes(item.name));

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    const relativePath = path.relative(inputPath, fullPath).replace(/\\/g, '/');

    if (item.isDirectory()) {
      codeLines.push(`${indent}Papka> ${item.name}`);
      traverseWithCode(fullPath, depth + 1);
    } else {
      const ext = path.extname(item.name);
      if (['.js', '.ts', '.jsx', '.tsx'].includes(ext)) {
        codeLines.push(`${indent}File> ${item.name}`);
        try {
          const code = fs.readFileSync(fullPath, 'utf8');
          const codeIndented = code.split('\n').map(line => `${indent}  ${line}`);
          codeLines.push(...codeIndented);
        } catch (err) {
          codeLines.push(`${indent}  ❌ Xatolik: src/${relativePath}`);
        }
      }
    }
  }
}

// Run
traverseStructure(inputPath);
codeLines.unshift('\n Kodlar:\n');
traverseWithCode(inputPath);

// Save
const final = [...structureLines, ...codeLines].join('\n');
fs.writeFileSync(path.join(desktopPath, 'bundle.txt'), final, 'utf8');

console.log(" Strukturasi + kodlari to‘liq 'bundle.txt' faylga yozildi (Desktop).");
