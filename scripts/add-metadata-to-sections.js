const fs = require('fs');
const path = require('path');

const sections = [
  {
    name: 'ai-inference',
    path: 'src/app/(main)/ai-inference/@content',
    dataFile: 'ai-inference-pages',
    metadataFunction: 'generateAIInferenceMetadata',
    getPageByIdFunction: 'getAIInferencePageById'
  },
  {
    name: 'fine-tuning',
    path: 'src/app/(main)/fine-tuning/@content',
    dataFile: 'fine-tuning-pages',
    metadataFunction: 'generateFineTuningMetadata',
    getPageByIdFunction: 'getFineTuningPageById'
  },
  {
    name: 'prompt-hub',
    path: 'src/app/(main)/prompt-hub/@content',
    dataFile: 'prompt-hub-pages',
    metadataFunction: 'generatePromptHubMetadata',
    getPageByIdFunction: 'getPromptHubPageById',
    nested: true // prompt-hub has nested structure
  }
];

function addMetadataToPage(section, pageId, pagePath) {
  if (!fs.existsSync(pagePath)) {
    return false;
  }

  let content = fs.readFileSync(pagePath, 'utf-8');

  // Skip if already has metadata
  if (content.includes('export const metadata') || content.includes('generateMetadata')) {
    console.log(`  ⏭️  ${pageId} - already has metadata`);
    return false;
  }

  // Extract function name and content
  const functionMatch = content.match(/export default function (\w+)\(\)/);
  if (!functionMatch) {
    console.log(`  ⚠️  ${pageId} - couldn't find function`);
    return false;
  }

  const functionName = functionMatch[1];
  const functionBody = content.substring(content.indexOf('export default'));

  // Create new file content with metadata
  const newContent = `import { Metadata } from 'next';
import { ${section.metadataFunction} } from '@/app/lib/metadata';
import { ${section.getPageByIdFunction} } from '@/app/${section.dataFile}';
${content.split('\n').filter(line => line.startsWith('import') && !line.includes('Metadata')).join('\n')}

const pageData = ${section.getPageByIdFunction}('${pageId}')!;

export const metadata: Metadata = ${section.metadataFunction}(pageData);

${functionBody}`;

  fs.writeFileSync(pagePath, newContent);
  return true;
}

function processSection(section) {
  console.log(`\n📂 Processing ${section.name}...\n`);

  const contentDir = path.join(__dirname, '..', section.path);

  if (!fs.existsSync(contentDir)) {
    console.log(`  ❌ Directory not found: ${contentDir}`);
    return;
  }

  const entries = fs.readdirSync(contentDir, { withFileTypes: true });
  let successCount = 0;
  let skipCount = 0;

  for (const entry of entries) {
    if (!entry.isDirectory() && entry.name !== 'page.tsx') continue;
    if (entry.name === 'page.tsx') continue; // Skip the main page.tsx

    const pageDir = entry.isDirectory() ? entry.name : null;
    if (!pageDir) continue;

    let pagePath, pageId;

    if (section.nested) {
      // For prompt-hub, check if it's a provider directory
      const providerDir = path.join(contentDir, pageDir);
      const models = fs.readdirSync(providerDir, { withFileTypes: true });

      for (const model of models) {
        if (model.isDirectory()) {
          pageId = `${pageDir}/${model.name}`;
          pagePath = path.join(providerDir, model.name, 'page.tsx');

          if (fs.existsSync(pagePath)) {
            try {
              if (addMetadataToPage(section, pageId, pagePath)) {
                console.log(`  ✅ ${pageId}`);
                successCount++;
              } else {
                skipCount++;
              }
            } catch (error) {
              console.error(`  ❌ ${pageId} - error:`, error.message);
            }
          }
        }
      }
    } else {
      pageId = pageDir;
      pagePath = path.join(contentDir, pageDir, 'page.tsx');

      try {
        if (addMetadataToPage(section, pageId, pagePath)) {
          console.log(`  ✅ ${pageId}`);
          successCount++;
        } else {
          skipCount++;
        }
      } catch (error) {
        console.error(`  ❌ ${pageId} - error:`, error.message);
      }
    }
  }

  console.log(`\n  📊 ${section.name}: ${successCount} added, ${skipCount} skipped`);
}

function main() {
  console.log('🚀 Adding metadata to all sections...\n');

  for (const section of sections) {
    processSection(section);
  }

  console.log('\n✨ Done!');
}

main();