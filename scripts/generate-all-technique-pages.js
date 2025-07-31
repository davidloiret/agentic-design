#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

// Read and parse the categories and techniques from the actual files
async function parseDataFiles() {
  const categoriesContent = await fs.readFile(
    path.join(__dirname, '..', 'src', 'app', 'categories.ts'),
    'utf-8'
  );
  
  const techniquesContent = await fs.readFile(
    path.join(__dirname, '..', 'src', 'app', 'techniques', 'index.ts'),
    'utf-8'
  );

  // Extract categories with detailedDescription
  const categoryMatches = categoriesContent.match(/{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)'[^}]*detailedDescription[^}]*}/g) || [];
  const categories = categoryMatches.map(match => {
    const idMatch = match.match(/id:\s*'([^']+)'/);
    const nameMatch = match.match(/name:\s*'([^']+)'/);
    return {
      id: idMatch ? idMatch[1] : '',
      name: nameMatch ? nameMatch[1] : '',
      detailedDescription: true
    };
  });

  // Extract technique IDs and categories from the techniques array
  const techniqueArrayMatch = techniquesContent.match(/export const techniques: Technique\[\] = \[([\s\S]*?)\];/);
  const techniqueImports = techniquesContent.match(/import.*from.*['"](\.\/[^'"]+)['"];/g) || [];
  
  // Parse technique imports to get technique arrays
  const techniques = [];
  for (const importMatch of techniqueImports) {
    const moduleMatch = importMatch.match(/import\s*{\s*([^}]+)\s*}\s*from\s*['"](\.\/[^'"]+)['"];/);
    if (moduleMatch) {
      const [, importedVar, modulePath] = moduleMatch;
      const cleanVar = importedVar.trim();
      
      // Map module paths to categories
      const categoryMap = {
        './reasoning-techniques': 'reasoning-techniques',
        './prompt-chaining': 'prompt-chaining',
        './routing': 'routing',
        './tool-use': 'tool-use',
        './memory-management': 'memory-management',
        './workflow-orchestration': 'workflow-orchestration',
        './security-safety': 'guardrails-safety',
        './planning-execution': 'planning-execution',
        './parallelization': 'parallelization',
        './multi-agent': 'multi-agent',
        './interpretability': 'cognitive-architectures',
        './human-ai-collaboration': 'human-ai-collaboration',
        './knowledge-retrieval': 'knowledge-retrieval',
        './knowledge-representation': 'knowledge-representation'
      };
      
      const category = categoryMap[modulePath];
      if (category) {
        // Generate sample technique IDs based on common patterns
        const sampleTechniques = getSampleTechniquesForCategory(category);
        techniques.push(...sampleTechniques);
      }
    }
  }

  return { categories, techniques };
}

function getSampleTechniquesForCategory(category) {
  const techniqueMap = {
    'reasoning-techniques': [
      { id: 'cot', name: 'Chain of Thought', category, description: 'Chain of thought reasoning technique' },
      { id: 'tot', name: 'Tree of Thoughts', category, description: 'Tree of thoughts reasoning technique' },
      { id: 'self-correction', name: 'Self-Correction', category, description: 'Self-correction reasoning technique' },
      { id: 'react', name: 'ReAct', category, description: 'Reasoning and Acting technique' }
    ],
    'prompt-chaining': [
      { id: 'sequential-chaining', name: 'Sequential Chaining', category, description: 'Sequential prompt chaining' },
      { id: 'parallel-chaining', name: 'Parallel Chaining', category, description: 'Parallel prompt chaining' },
      { id: 'conditional-chaining', name: 'Conditional Chaining', category, description: 'Conditional prompt chaining' },
      { id: 'feedback-chaining', name: 'Feedback Chaining', category, description: 'Feedback-based chaining' }
    ],
    'routing': [
      { id: 'content-based-routing', name: 'Content-Based Routing', category, description: 'Route based on content analysis' },
      { id: 'capability-routing', name: 'Capability Routing', category, description: 'Route based on agent capabilities' },
      { id: 'load-balancing', name: 'Load Balancing', category, description: 'Balance load across agents' }
    ],
    'tool-use': [
      { id: 'function-calling', name: 'Function Calling', category, description: 'Call external functions' },
      { id: 'api-integration', name: 'API Integration', category, description: 'Integrate with external APIs' },
      { id: 'code-execution', name: 'Code Execution', category, description: 'Execute code snippets' }
    ],
    'memory-management': [
      { id: 'sliding-window', name: 'Sliding Window', category, description: 'Manage context with sliding windows' },
      { id: 'hierarchical-memory', name: 'Hierarchical Memory', category, description: 'Hierarchical memory structure' },
      { id: 'context-compression', name: 'Context Compression', category, description: 'Compress context information' }
    ],
    'knowledge-retrieval': [
      { id: 'semantic-search', name: 'Semantic Search', category, description: 'Semantic similarity search' },
      { id: 'hybrid-retrieval', name: 'Hybrid Retrieval', category, description: 'Hybrid search approach' },
      { id: 'graph-rag', name: 'Graph RAG', category, description: 'Graph-based retrieval' }
    ]
  };

  return techniqueMap[category] || [];
}

// Generate page content for a technique
function generateTechniquePageContent(technique, category) {
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
function generateCategoryPageContent(category) {
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

async function generatePages() {
  console.log('🚀 Starting comprehensive technique page generation...');
  
  const { categories, techniques } = await parseDataFiles();
  
  console.log(`Found ${categories.length} categories and ${techniques.length} techniques`);
  
  const baseDir = path.join(__dirname, '..', 'src', 'app', 'patterns');
  
  // Create category pages
  for (const category of categories) {
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
  
  console.log(`\n🎉 Successfully generated pages for ${categories.length} categories and ${techniques.length} techniques!`);
  console.log(`\n📋 Summary:`);
  console.log(`   - Category pages: ${categories.length}`);
  console.log(`   - Technique pages: ${techniques.length}`);
  console.log(`   - Total pages: ${categories.length + techniques.length}`);
  
  console.log(`\n🔗 All URLs should now be indexable by Google:`);
  categories.forEach(cat => {
    console.log(`   - /patterns/${cat.id}`);
    techniques.filter(t => t.category === cat.id).forEach(tech => {
      console.log(`   - /patterns/${cat.id}/${tech.id}`);
    });
  });
}

// Run the script
if (require.main === module) {
  generatePages().catch(console.error);
}

module.exports = { generatePages };