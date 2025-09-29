const fs = require('fs');
const path = require('path');

const AI_DRIVEN_DEV_CONTENT_DIR = path.join(__dirname, '../src/app/(main)/ai-driven-dev/@content');

// Pages to skip
const SKIP_PAGES = ['page.tsx'];

function getAllPageDirs() {
  const entries = fs.readdirSync(AI_DRIVEN_DEV_CONTENT_DIR, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory() && !SKIP_PAGES.includes(entry.name))
    .map(entry => entry.name);
}

function addStructuredDataToPage(pageId) {
  const pageDir = path.join(AI_DRIVEN_DEV_CONTENT_DIR, pageId);
  const pagePath = path.join(pageDir, 'page.tsx');

  // Check if page.tsx exists
  if (!fs.existsSync(pagePath)) {
    console.log(`⏭️  Skipping ${pageId} - no page.tsx found`);
    return;
  }

  // Read current page content
  let content = fs.readFileSync(pagePath, 'utf-8');

  // Check if already has structured data
  if (content.includes('JsonLd') || content.includes('structuredData')) {
    console.log(`✅ ${pageId} - already has structured data`);
    return;
  }

  // Extract imports and rest of code
  const lines = content.split('\n');
  const importLines = [];
  const restLines = [];
  let inImports = true;

  for (const line of lines) {
    if (inImports && (line.startsWith('import ') || line.trim() === '')) {
      importLines.push(line);
    } else {
      inImports = false;
      restLines.push(line);
    }
  }

  // Add JsonLd import
  if (!content.includes("from '@/components/JsonLd'")) {
    importLines.push("import JsonLd from '@/components/JsonLd';");
  }

  // Add structured data constant before the function
  const functionIndex = restLines.findIndex(line => line.includes('export default function'));
  if (functionIndex === -1) {
    console.log(`⚠️  ${pageId} - couldn't find export default function`);
    return;
  }

  const structuredDataCode = `
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: pageData.title,
  description: pageData.description,
  author: {
    '@type': 'Organization',
    name: 'Agentic Design Team'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Agentic Design',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://agentic-design.ai'
  },
  datePublished: new Date().toISOString(),
  dateModified: new Date().toISOString(),
  articleSection: pageData.category,
  keywords: pageData.keywords?.join(', ')
};
`;

  // Find the return statement and add JsonLd
  const returnIndex = restLines.findIndex(line => line.trim().startsWith('return'));
  if (returnIndex === -1) {
    console.log(`⚠️  ${pageId} - couldn't find return statement`);
    return;
  }

  // Update the return statement to include JsonLd
  const contentComponentMatch = restLines[returnIndex].match(/<(\w+)\s*\/>/);
  if (!contentComponentMatch) {
    console.log(`⚠️  ${pageId} - couldn't parse return statement`);
    return;
  }

  const contentComponent = contentComponentMatch[1];
  restLines[returnIndex] = `  return (
    <>
      <JsonLd data={structuredData} />
      <${contentComponent} />
    </>
  );`;

  // Remove closing brace if it exists on next line
  if (restLines[returnIndex + 1]?.trim() === '}') {
    restLines.splice(returnIndex + 1, 1);
  }

  // Reconstruct the file
  const newContent = [
    ...importLines,
    '',
    ...restLines.slice(0, functionIndex),
    structuredDataCode,
    ...restLines.slice(functionIndex)
  ].join('\n');

  fs.writeFileSync(pagePath, newContent);
  console.log(`✅ ${pageId} - added structured data`);
}

function main() {
  console.log('🚀 Starting structured data addition...\n');

  const pageDirs = getAllPageDirs();
  console.log(`📄 Found ${pageDirs.length} pages to process\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const pageId of pageDirs) {
    try {
      addStructuredDataToPage(pageId);
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