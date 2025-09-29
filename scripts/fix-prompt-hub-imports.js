const fs = require('fs');
const path = require('path');

const promptHubDir = path.join(__dirname, '../src/app/(main)/prompt-hub/@content');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  // Find and remove the broken "import { " line (usually line 5)
  const fixedLines = lines.filter((line, index) => {
    // Remove lines that are just "import { " with nothing after
    if (line.trim() === 'import {') {
      console.log(`Removing broken import line ${index + 1} from ${path.basename(path.dirname(filePath))}/${path.basename(filePath)}`);
      return false;
    }
    return true;
  });

  const fixedContent = fixedLines.join('\n');
  fs.writeFileSync(filePath, fixedContent);
  console.log(`✓ Fixed ${path.basename(path.dirname(filePath))}/${path.basename(filePath)}`);
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name === 'page.tsx') {
      fixFile(fullPath);
    }
  }
}

console.log('Fixing Prompt-Hub import statements...\n');
processDirectory(promptHubDir);
console.log('\n✓ All Prompt-Hub pages fixed!');