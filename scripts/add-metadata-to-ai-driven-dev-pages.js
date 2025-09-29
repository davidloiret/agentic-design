const fs = require('fs');
const path = require('path');

const AI_DRIVEN_DEV_CONTENT_DIR = path.join(__dirname, '../src/app/(main)/ai-driven-dev/@content');

// Pages to skip (already done or special cases)
const SKIP_PAGES = ['comparison', 'page.tsx'];

function getAllPageDirs() {
  const entries = fs.readdirSync(AI_DRIVEN_DEV_CONTENT_DIR, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory() && !SKIP_PAGES.includes(entry.name))
    .map(entry => entry.name);
}

function processPage(pageId) {
  const pageDir = path.join(AI_DRIVEN_DEV_CONTENT_DIR, pageId);
  const pagePath = path.join(pageDir, 'page.tsx');

  // Check if page.tsx exists
  if (!fs.existsSync(pagePath)) {
    console.log(`⏭️  Skipping ${pageId} - no page.tsx found`);
    return;
  }

  // Read current page content
  const content = fs.readFileSync(pagePath, 'utf-8');

  // Check if already converted (has import from './content')
  if (content.includes("from './content'")) {
    console.log(`✅ ${pageId} - already converted`);
    return;
  }

  // Check if it's a client component
  if (!content.includes('"use client"')) {
    console.log(`⏭️  Skipping ${pageId} - not a client component`);
    return;
  }

  // Extract the export default function name
  const functionMatch = content.match(/export default function (\w+)/);
  if (!functionMatch) {
    console.log(`⚠️  ${pageId} - couldn't find function name`);
    return;
  }

  const functionName = functionMatch[1];
  const contentFunctionName = functionName.replace('Page', 'Content');

  // Create content.tsx with the client component
  const contentFilePath = path.join(pageDir, 'content.tsx');

  // Replace function name in content
  const contentCode = content.replace(
    `export default function ${functionName}`,
    `export default function ${contentFunctionName}`
  );

  fs.writeFileSync(contentFilePath, contentCode);

  // Create new page.tsx with metadata
  const newPageCode = `import { Metadata } from 'next';
import { generateAIDrivenDevMetadata } from '@/app/lib/metadata';
import { getAIDrivenDevPageById } from '@/app/ai-driven-dev-pages';
import ${contentFunctionName} from './content';

const pageData = getAIDrivenDevPageById('${pageId}')!;

export const metadata: Metadata = generateAIDrivenDevMetadata(pageData);

export default function ${functionName}() {
  return <${contentFunctionName} />;
}`;

  fs.writeFileSync(pagePath, newPageCode);

  console.log(`✅ ${pageId} - converted successfully`);
}

function main() {
  console.log('🚀 Starting metadata addition to AI-Driven Dev pages...\n');

  const pageDirs = getAllPageDirs();
  console.log(`📄 Found ${pageDirs.length} pages to process\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const pageId of pageDirs) {
    try {
      processPage(pageId);
      successCount++;
    } catch (error) {
      console.error(`❌ ${pageId} - error:`, error.message);
      errorCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ⏭️  Skipped: ${skipCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log('\n✨ Done!');
}

main();