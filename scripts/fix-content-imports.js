const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all content.tsx files
const contentFiles = execSync(
  'find /Users/dlo/code/agentic-design/src/app -name "content.tsx"',
  { encoding: 'utf8' }
).trim().split('\n');

function extractUsedIcons(content) {
  // Find all JSX elements that look like icon components (PascalCase)
  const iconPattern = /<([A-Z][a-zA-Z0-9]*)\s/g;
  const icons = new Set();
  let match;

  while ((match = iconPattern.exec(content)) !== null) {
    icons.add(match[1]);
  }

  return Array.from(icons).filter(icon =>
    // Filter out obvious non-icons
    !['PromptSection', 'JsonLd', 'Fragment'].includes(icon)
  ).sort();
}

function addIconImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has lucide-react import
  if (content.includes('from \'lucide-react\'')) {
    console.log(`⊘ Skipping ${path.basename(path.dirname(filePath))} - already has lucide-react import`);
    return;
  }

  // Extract used icons
  const usedIcons = extractUsedIcons(content);

  if (usedIcons.length === 0) {
    console.log(`⊘ Skipping ${path.basename(path.dirname(filePath))} - no icons used`);
    return;
  }

  // Find where to insert the import (after "use client" and existing imports)
  const lines = content.split('\n');
  let insertIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('"use client"') || lines[i].includes('import')) {
      insertIndex = i + 1;
    } else if (lines[i].trim() === '' && insertIndex > 0) {
      continue;
    } else if (insertIndex > 0) {
      break;
    }
  }

  // Create the import statement
  const importStatement = `import {\n  ${usedIcons.join(',\n  ')}\n} from 'lucide-react';`;

  // Insert the import
  lines.splice(insertIndex, 0, importStatement);
  content = lines.join('\n');

  fs.writeFileSync(filePath, content);
  console.log(`✓ Added ${usedIcons.length} icon imports to ${path.basename(path.dirname(filePath))}/content.tsx`);
}

console.log(`\nAdding lucide-react imports to ${contentFiles.length} content.tsx files...\n`);

for (const file of contentFiles) {
  if (!file) continue;
  try {
    addIconImports(file);
  } catch (err) {
    console.error(`✗ Error processing ${file}:`, err.message);
  }
}

console.log('\n✓ All imports added!');