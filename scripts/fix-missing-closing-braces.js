const fs = require('fs');
const path = require('path');

const AI_DRIVEN_DEV_CONTENT_DIR = path.join(__dirname, '../src/app/(main)/ai-driven-dev/@content');

function getAllPageDirs() {
  const entries = fs.readdirSync(AI_DRIVEN_DEV_CONTENT_DIR, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory() && entry.name !== 'page.tsx')
    .map(entry => entry.name);
}

function fixPage(pageId) {
  const pageDir = path.join(AI_DRIVEN_DEV_CONTENT_DIR, pageId);
  const pagePath = path.join(pageDir, 'page.tsx');

  if (!fs.existsSync(pagePath)) {
    return;
  }

  let content = fs.readFileSync(pagePath, 'utf-8');

  // Check if file is missing closing brace (ends with ); but no closing brace)
  if (content.trim().endsWith(');') && !content.trim().endsWith(');\n}')) {
    content += '\n}\n';
    fs.writeFileSync(pagePath, content);
    console.log(`✅ Fixed ${pageId}`);
    return true;
  }

  return false;
}

function main() {
  console.log('🔧 Fixing missing closing braces...\n');

  const pageDirs = getAllPageDirs();
  let fixedCount = 0;

  for (const pageId of pageDirs) {
    try {
      if (fixPage(pageId)) {
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ ${pageId} - error:`, error.message);
    }
  }

  console.log(`\n✅ Fixed ${fixedCount} files`);
}

main();