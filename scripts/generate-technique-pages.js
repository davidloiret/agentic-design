#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

// Generate page content for a technique
function generateTechniquePageContent(technique, category) {
  return `import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TechniqueDetails } from '../../../../../components/TechniqueDetails';

export async function generateMetadata({ params }: { params: { categoryId: string; techniqueId: string } }): Promise<Metadata> {
  // Import data dynamically to avoid build-time issues
  const { techniques } = await import('../../../../../techniques/index');
  const { categories } = await import('../../../../../categories');
  
  const technique = techniques.find(t => t.id === params.techniqueId && t.category === params.categoryId);
  const category = categories.find(c => c.id === params.categoryId);
  
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

export default async function TechniquePage({ params }: { params: { categoryId: string; techniqueId: string } }) {
  // Import data dynamically
  const { techniques } = await import('../../../../../techniques/index');
  const { categories } = await import('../../../../../categories');
  
  const technique = techniques.find(t => t.id === params.techniqueId && t.category === params.categoryId);
  const category = categories.find(c => c.id === params.categoryId);
  
  if (!technique || !category) {
    notFound();
  }

  return <TechniqueDetails technique={technique} category={category} />;
}

export async function generateStaticParams() {
  const { techniques } = await import('../../../../../techniques/index');
  
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
function generateCategoryPageContent(category) {
  return `import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryDetails } from '../../../../components/CategoryDetails';

export async function generateMetadata({ params }: { params: { categoryId: string } }): Promise<Metadata> {
  const { categories } = await import('../../../../categories');
  
  const category = categories.find(c => c.id === params.categoryId);
  
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

export default async function CategoryPage({ params }: { params: { categoryId: string } }) {
  const { categories } = await import('../../../../categories');
  const { techniques } = await import('../../../../techniques/index');
  
  const category = categories.find(c => c.id === params.categoryId);
  
  if (!category) {
    notFound();
  }

  const categoryTechniques = techniques.filter(t => t.category === category.id);

  return <CategoryDetails category={category} techniques={categoryTechniques} />;
}

export async function generateStaticParams() {
  const { categories } = await import('../../../../categories');
  
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

async function generatePages() {
  console.log('🚀 Starting technique page generation...');
  
  // Read the techniques and categories data directly
  const techniquesModulePath = path.join(__dirname, '..', 'src', 'app', 'techniques', 'index.ts');
  const categoriesModulePath = path.join(__dirname, '..', 'src', 'app', 'categories.ts');
  
  // For this script, we'll parse simple data structures
  // In a real implementation, you might want to use a proper TypeScript parser
  
  // Simple mock data for demonstration - replace with actual parsing
  const categories = [
    { id: 'prompt-chaining', name: 'Prompt Chaining', detailedDescription: true },
    { id: 'routing', name: 'Routing', detailedDescription: true },
    { id: 'reasoning-techniques', name: 'Reasoning Techniques', detailedDescription: true },
    // Add more categories as needed
  ];
  
  const techniques = [
    { id: 'sequential-chaining', name: 'Sequential Chaining', category: 'prompt-chaining', description: 'Sequential prompt chaining technique' },
    { id: 'cot', name: 'Chain of Thought', category: 'reasoning-techniques', description: 'Chain of thought reasoning' },
    // Add more techniques as needed
  ];
  
  const baseDir = path.join(__dirname, '..', 'src', 'app', 'patterns');
  
  // Create category pages
  for (const category of categories) {
    if (!category.detailedDescription) continue;
    
    const categoryDir = path.join(baseDir, category.id);
    const categoryPagePath = path.join(categoryDir, 'page.tsx');
    
    await createDirectoryIfNotExists(categoryDir);
    
    const categoryContent = generateCategoryPageContent(category);
    await fs.writeFile(categoryPagePath, categoryContent);
    
    console.log(`✅ Created category page: patterns/${category.id}/page.tsx`);
    
    // Create technique pages for this category
    const categoryTechniques = techniques.filter(t => t.category === category.id);
    
    for (const technique of categoryTechniques) {
      const techniqueDir = path.join(categoryDir, technique.id);
      const techniquePagePath = path.join(techniqueDir, 'page.tsx');
      
      await createDirectoryIfNotExists(techniqueDir);
      
      const techniqueContent = generateTechniquePageContent(technique, category);
      await fs.writeFile(techniquePagePath, techniqueContent);
      
      console.log(`✅ Created technique page: patterns/${category.id}/${technique.id}/page.tsx`);
    }
  }
  
  console.log(`\n🎉 Successfully generated pages for ${categories.filter(c => c.detailedDescription).length} categories and ${techniques.length} techniques!`);
  console.log(`\n📋 Summary:`);
  console.log(`   - Category pages: ${categories.filter(c => c.detailedDescription).length}`);
  console.log(`   - Technique pages: ${techniques.length}`);
  console.log(`   - Total pages: ${categories.filter(c => c.detailedDescription).length + techniques.length}`);
}

// Run the script
if (require.main === module) {
  generatePages().catch(console.error);
}

module.exports = { generatePages };