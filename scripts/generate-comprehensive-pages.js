#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

// Read techniques from all files
async function readAllTechniques() {
  const techniqueFiles = [
    'reasoning-techniques.ts',
    'prompt-chaining.ts', 
    'routing.ts',
    'tool-use.ts',
    'memory-management.ts',
    'workflow-orchestration.ts',
    'security-safety.ts',
    'planning-execution.ts', 
    'parallelization.ts',
    'multi-agent.ts',
    'interpretability.ts',
    'human-ai-collaboration.ts',
    'knowledge-retrieval.ts',
    'knowledge-representation.ts'
  ];

  const allTechniques = [];
  
  for (const fileName of techniqueFiles) {
    const filePath = path.join(__dirname, '..', 'src', 'app', 'techniques', fileName);
    
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      
      // Extract technique objects using regex
      const techniqueMatches = content.match(/{\s*id:\s*'[^']+',[\s\S]*?(?=},\s*{|\s*]\s*;)/g) || [];
      
      for (const match of techniqueMatches) {
        const idMatch = match.match(/id:\s*'([^']+)'/);
        const nameMatch = match.match(/name:\s*'([^']+)'/);
        const categoryMatch = match.match(/category:\s*'([^']+)'/);
        const descMatch = match.match(/description:\s*'([^']+)'/);
        
        if (idMatch && nameMatch) {
          allTechniques.push({
            id: idMatch[1],
            name: nameMatch[1],
            category: categoryMatch ? categoryMatch[1] : fileName.replace('.ts', ''),
            description: descMatch ? descMatch[1] : `${nameMatch[1]} technique`
          });
        }
      }
      
      console.log(`📖 Read ${techniqueMatches.length} techniques from ${fileName}`);
    } catch (error) {
      console.log(`⚠️  Could not read ${fileName}: ${error.message}`);
    }
  }
  
  return allTechniques;
}

// Read categories with detailed descriptions
async function readDetailedCategories() {
  const categoriesContent = await fs.readFile(
    path.join(__dirname, '..', 'src', 'app', 'categories.ts'),
    'utf-8'
  );
  
  const categoryMatches = categoriesContent.match(/{\s*id:\s*'([^']+)',[\s\S]*?detailedDescription[^}]*}/g) || [];
  
  return categoryMatches.map(match => {
    const idMatch = match.match(/id:\s*'([^']+)'/);
    const nameMatch = match.match(/name:\s*'([^']+)'/);
    return {
      id: idMatch ? idMatch[1] : '',
      name: nameMatch ? nameMatch[1] : '',
      detailedDescription: true
    };
  }).filter(cat => cat.id && cat.id !== 'all'); // Exclude commented 'all' category
}

// Generate page content for a technique
function generateTechniquePageContent(technique) {
  return `import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TechniqueDetails } from '../../../components/TechniqueDetails';
import { techniques } from '../../../techniques';
import { categories } from '../../../categories';
import { useCases } from '../../../use-cases';

export async function generateMetadata({ params }: { params: Promise<{ categoryId: string; techniqueId: string }> }): Promise<Metadata> {
  const { categoryId, techniqueId } = await params;
  const technique = techniques.find(t => t.id === techniqueId && t.category === categoryId);
  const category = categories.find(c => c.id === categoryId);
  
  if (!technique || !category) {
    return {
      title: 'Technique Not Found',
    };
  }

  return {
    title: \`\${technique.name} - \${category.name} | Agentic Design Patterns\`,
    description: technique.description,
    openGraph: {
      title: \`\${technique.name} - \${category.name}\`,
      description: technique.description,
      type: 'article',
    },
  };
}

export default async function TechniquePage({ params }: { params: Promise<{ categoryId: string; techniqueId: string }> }) {
  const { categoryId, techniqueId } = await params;
  const technique = techniques.find(t => t.id === techniqueId && t.category === categoryId);
  
  if (!technique) {
    notFound();
  }

  return <TechniqueDetails selectedTechnique={technique} categories={categories} useCases={useCases} />;
}

export function generateStaticParams() {
  return techniques
    .filter(technique => technique.category === '${technique.category}')
    .map(technique => ({
      categoryId: technique.category,
      techniqueId: technique.id,
    }));
}
`;
}

// Generate category page content  
function generateCategoryPageContent() {
  return `import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryDetails } from '../../components/CategoryDetails';
import { categories } from '../../categories';
import { techniques } from '../../techniques';

export async function generateMetadata({ params }: { params: Promise<{ categoryId: string }> }): Promise<Metadata> {
  const { categoryId } = await params;
  const category = categories.find(c => c.id === categoryId);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: \`\${category.name} Patterns | Agentic Design\`,
    description: category.description,
    openGraph: {
      title: \`\${category.name} Patterns\`,
      description: category.description,
      type: 'article',
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params;
  const category = categories.find(c => c.id === categoryId);
  
  if (!category) {
    notFound();
  }

  const categoryTechniques = techniques.filter(t => t.category === category.id);

  return <CategoryDetails category={category} techniques={categoryTechniques} />;
}

export function generateStaticParams() {
  return categories
    .filter(category => category.detailedDescription)
    .map(category => ({
      categoryId: category.id,
    }));
}
`;
}

async function createDirectoryIfNotExists(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function generateComprehensivePages() {
  console.log('🚀 Generating COMPREHENSIVE pages from actual data...\n');
  
  const techniques = await readAllTechniques();
  const categories = await readDetailedCategories();
  
  console.log(`📊 Found:`);
  console.log(`   🔧 ${techniques.length} techniques`);
  console.log(`   📂 ${categories.length} categories with detailed descriptions`);
  
  const baseDir = path.join(__dirname, '..', 'src', 'app', 'patterns');
  
  // Clean existing pages
  try {
    await fs.rm(path.join(baseDir), { recursive: true, force: true });
    await createDirectoryIfNotExists(baseDir);
  } catch (error) {
    console.log('Note: Could not clean existing pages, continuing...');
  }
  
  let categoryPages = 0;
  let techniquePages = 0;
  
  // Create category pages
  for (const category of categories) {
    const categoryDir = path.join(baseDir, category.id);
    const categoryPagePath = path.join(categoryDir, 'page.tsx');
    
    await createDirectoryIfNotExists(categoryDir);
    
    const categoryContent = generateCategoryPageContent();
    await fs.writeFile(categoryPagePath, categoryContent);
    
    console.log(`✅ Created category page: patterns/${category.id}/page.tsx`);
    categoryPages++;
    
    // Create technique pages for this category
    const categoryTechniques = techniques.filter(t => t.category === category.id);
    
    for (const technique of categoryTechniques) {
      const techniqueDir = path.join(categoryDir, technique.id);
      const techniquePagePath = path.join(techniqueDir, 'page.tsx');
      
      await createDirectoryIfNotExists(techniqueDir);
      
      const techniqueContent = generateTechniquePageContent(technique);
      await fs.writeFile(techniquePagePath, techniqueContent);
      
      console.log(`✅ Created technique page: patterns/${category.id}/${technique.id}/page.tsx`);
      techniquePages++;
    }
  }
  
  console.log(`\n🎉 COMPREHENSIVE GENERATION COMPLETE!`);
  console.log(`📊 Summary:`);
  console.log(`   📂 Category pages: ${categoryPages}`);
  console.log(`   🔧 Technique pages: ${techniquePages}`);
  console.log(`   📄 Total pages: ${categoryPages + techniquePages}`);
  
  console.log(`\n🗺️  All URLs now match sitemap expectations:`);
  categories.forEach(cat => {
    console.log(`   - /patterns/${cat.id}`);
    const catTechniques = techniques.filter(t => t.category === cat.id);
    catTechniques.slice(0, 2).forEach(tech => {
      console.log(`   - /patterns/${cat.id}/${tech.id}`);
    });
    if (catTechniques.length > 2) {
      console.log(`   - ... and ${catTechniques.length - 2} more techniques`);
    }
  });
}

// Run the script
if (require.main === module) {
  generateComprehensivePages().catch(console.error);
}

module.exports = { generateComprehensivePages };