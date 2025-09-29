const fs = require('fs');
const path = require('path');

const AI_DRIVEN_DEV_CONTENT_DIR = path.join(__dirname, '../src/app/(main)/ai-driven-dev/@content');

function getAllPageDirs() {
  const entries = fs.readdirSync(AI_DRIVEN_DEV_CONTENT_DIR, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory() && entry.name !== 'page.tsx')
    .map(entry => entry.name);
}

function fixNamingConflict(pageId) {
  const pageDir = path.join(AI_DRIVEN_DEV_CONTENT_DIR, pageId);
  const pagePath = path.join(pageDir, 'page.tsx');

  if (!fs.existsSync(pagePath)) {
    return false;
  }

  let content = fs.readFileSync(pagePath, 'utf-8');

  // Find import statement with component name
  const importMatch = content.match(/import (\w+) from '\.\/content'/);
  if (!importMatch) {
    return false;
  }

  const importedName = importMatch[1];

  // Check if function name matches imported name (conflict)
  const functionMatch = content.match(/export default function (\w+)\(\)/);
  if (!functionMatch) {
    return false;
  }

  const functionName = functionMatch[1];

  if (importedName === functionName) {
    // Conflict! Rename function to something safe
    const newFunctionName = functionName.replace(/Redirect|Content/i, 'Page');
    content = content.replace(
      `export default function ${functionName}()`,
      `export default function ${newFunctionName}()`
    );

    fs.writeFileSync(pagePath, content);
    console.log(`✅ Fixed naming conflict in ${pageId}: ${functionName} -> ${newFunctionName}`);
    return true;
  }

  return false;
}

function main() {
  console.log('🔧 Fixing naming conflicts...\n');

  const pageDirs = getAllPageDirs();
  let fixedCount = 0;

  for (const pageId of pageDirs) {
    try {
      if (fixNamingConflict(pageId)) {
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ ${pageId} - error:`, error.message);
    }
  }

  console.log(`\n✅ Fixed ${fixedCount} naming conflicts`);
}

main();