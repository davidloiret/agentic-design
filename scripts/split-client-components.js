const fs = require('fs');
const path = require('path');

// Files that need to be split (have useState and metadata)
const filesToSplit = [
  '/Users/dlo/code/agentic-design/src/app/(main)/fine-tuning/@content/models/page.tsx',
  // Prompt-Hub files will be added dynamically
];

// Add all Prompt-Hub page.tsx files
const promptHubDir = '/Users/dlo/code/agentic-design/src/app/(main)/prompt-hub/@content';

function findPromptHubPages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      findPromptHubPages(fullPath);
    } else if (entry.name === 'page.tsx') {
      const content = fs.readFileSync(fullPath, 'utf8');
      // Only add if it uses useState (client component functionality)
      if (content.includes('useState')) {
        filesToSplit.push(fullPath);
      }
    }
  }
}

findPromptHubPages(promptHubDir);

function splitFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const dir = path.dirname(filePath);

  // Skip if already has content.tsx
  if (fs.existsSync(path.join(dir, 'content.tsx'))) {
    console.log(`⊘ Skipping ${path.basename(dir)} - already has content.tsx`);
    return;
  }

  // Extract metadata-related imports and code
  const lines = content.split('\n');
  let metadataImports = [];
  let metadataCode = [];
  let componentCode = [];
  let inMetadataSection = true;
  let functionName = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Capture metadata imports
    if (line.includes('import { Metadata }') ||
        line.includes('import { generate') && line.includes('Metadata') ||
        line.includes('import { get') && line.includes('PageById')) {
      metadataImports.push(line);
      continue;
    }

    // Capture pageData and metadata export
    if (line.includes('const pageData = get') || line.includes('export const metadata')) {
      metadataCode.push(line);
      if (line.includes('export const metadata')) {
        inMetadataSection = false;
      }
      continue;
    }

    // Everything else goes to component code
    if (!inMetadataSection || (!line.includes('Metadata') && !line.includes('pageData'))) {
      componentCode.push(line);

      // Extract function name
      if (line.includes('export default function') && !functionName) {
        const match = line.match(/export default function (\w+)/);
        if (match) functionName = match[1];
      }
    }
  }

  // Create new page.tsx (server component with metadata)
  const newPageContent = `${metadataImports.join('\n')}
import ${functionName}Content from './content';

${metadataCode.join('\n')}

export default function ${functionName}() {
  return <${functionName}Content />;
}
`;

  // Create content.tsx (client component with UI)
  const contentContent = `"use client"
${componentCode.join('\n')}`.replace(`export default function ${functionName}()`, `export default function ${functionName}Content()`);

  // Write files
  fs.writeFileSync(filePath, newPageContent);
  fs.writeFileSync(path.join(dir, 'content.tsx'), contentContent);

  console.log(`✓ Split ${path.basename(dir)}/page.tsx`);
}

console.log(`\nSplitting ${filesToSplit.length} files with client component issues...\n`);

for (const file of filesToSplit) {
  try {
    splitFile(file);
  } catch (err) {
    console.error(`✗ Error splitting ${file}:`, err.message);
  }
}

console.log('\n✓ All files split!');