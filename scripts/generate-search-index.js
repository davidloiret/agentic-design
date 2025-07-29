#!/usr/bin/env node

/**
 * Intelligent Search Index Generator
 * 
 * This script automatically scans the entire codebase to generate a comprehensive
 * search index with proper categorization for the perfect search experience.
 */

const fs = require('fs');
const path = require('path');

// Main categories mapping
const CATEGORY_MAPPING = {
  'patterns': {
    id: 'patterns',
    name: 'AI Patterns', 
    description: 'AI agent design patterns and techniques',
    keywords: ['patterns', 'techniques', 'design patterns', 'architecture']
  },
  'ai-red-teaming': {
    id: 'security',
    name: 'AI Red Teaming',
    description: 'Security testing and vulnerability assessment for AI systems',
    keywords: ['red teaming', 'security', 'vulnerabilities', 'testing', 'adversarial']
  },
  'fine-tuning': {
    id: 'training',
    name: 'Fine Tuning',
    description: 'Model training and fine-tuning techniques',
    keywords: ['fine-tuning', 'training', 'optimization', 'models']
  },
  'ai-inference': {
    id: 'deployment',
    name: 'AI Inference',
    description: 'Model deployment and inference optimization',
    keywords: ['inference', 'deployment', 'production', 'serving']
  },
  'prompt-hub': {
    id: 'prompts',
    name: 'Prompt Hub',
    description: 'Collection of system prompts and examples',
    keywords: ['prompts', 'system prompts', 'examples']
  },
  'project-hub': {
    id: 'projects',
    name: 'Project Hub',
    description: 'Showcase of AI projects and implementations',
    keywords: ['projects', 'showcase', 'examples', 'case studies']
  },
  'news-hub': {
    id: 'news',
    name: 'News Hub',
    description: 'Latest updates in AI and technology',
    keywords: ['news', 'updates', 'research', 'announcements']
  },
  'learning-hub': {
    id: 'education',
    name: 'Learning Hub',
    description: 'Educational resources and tutorials',
    keywords: ['learning', 'tutorials', 'courses', 'education']
  }
};

class SearchIndexGenerator {
  constructor() {
    this.searchIndex = [];
    this.srcPath = path.join(__dirname, '../src');
    this.appPath = path.join(this.srcPath, 'app');
  }

  /**
   * Extract metadata from a React component file
   */
  extractPageMetadata(filePath, urlPath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Extract title from metadata export or component
      const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/i) || 
                        content.match(/<title[^>]*>([^<]+)<\/title>/i) ||
                        content.match(/const title = ['"`]([^'"`]+)['"`]/i);
      
      // Extract description
      const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/i) ||
                       content.match(/<meta[^>]*description[^>]*content=['"`]([^'"`]+)['"`]/i);
      
      // Extract keywords from content
      const keywords = this.extractKeywordsFromContent(content);
      
      return {
        title: titleMatch ? titleMatch[1] : this.generateTitleFromPath(urlPath),
        description: descMatch ? descMatch[1] : this.generateDescriptionFromPath(urlPath),
        keywords: keywords,
        content: this.extractTextContent(content)
      };
    } catch (error) {
      console.warn(`Warning: Could not extract metadata from ${filePath}:`, error.message);
      return {
        title: this.generateTitleFromPath(urlPath),
        description: this.generateDescriptionFromPath(urlPath),
        keywords: [],
        content: ''
      };
    }
  }

  /**
   * Extract meaningful keywords from file content
   */
  extractKeywordsFromContent(content) {
    const keywords = new Set();
    
    // Extract from JSX text content
    const jsxTextMatches = content.match(/>\s*([^<>{}\n]+)\s*</g) || [];
    jsxTextMatches.forEach(match => {
      const text = match.replace(/[><]/g, '').trim();
      if (text.length > 3 && text.length < 50) {
        keywords.add(text.toLowerCase());
      }
    });
    
    // Extract from string literals
    const stringMatches = content.match(/['"`]([^'"`\n]{4,50})['"`]/g) || [];
    stringMatches.forEach(match => {
      const text = match.replace(/['"`]/g, '').trim();
      if (!text.includes('\\') && !text.includes('/')) {
        keywords.add(text.toLowerCase());
      }
    });
    
    return Array.from(keywords).slice(0, 10); // Limit to top 10 keywords
  }

  /**
   * Extract readable text content from component
   */
  extractTextContent(content) {
    // Remove imports, exports, and technical code
    let cleanContent = content
      .replace(/import\s+.*?from\s+['"`][^'"`]+['"`];?/g, '')
      .replace(/export\s+.*?;/g, '')
      .replace(/const\s+\w+\s*=\s*.*?;/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '');
    
    // Extract meaningful text from JSX
    const textMatches = cleanContent.match(/>\s*([^<>{}\n]+)\s*</g) || [];
    const meaningfulText = textMatches
      .map(match => match.replace(/[><]/g, '').trim())
      .filter(text => text.length > 10)
      .join(' ');
    
    return meaningfulText.substring(0, 500); // Limit content length
  }

  /**
   * Generate title from URL path
   */
  generateTitleFromPath(urlPath) {
    const segments = urlPath.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || 'Home';
    
    return lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Generate description from URL path
   */
  generateDescriptionFromPath(urlPath) {
    const category = this.getCategoryFromPath(urlPath);
    const title = this.generateTitleFromPath(urlPath);
    
    if (category && CATEGORY_MAPPING[category]) {
      return `${title} - ${CATEGORY_MAPPING[category].description}`;
    }
    
    return `Learn about ${title.toLowerCase()} and related concepts`;
  }

  /**
   * Get category from URL path
   */
  getCategoryFromPath(urlPath) {
    for (const [key] of Object.entries(CATEGORY_MAPPING)) {
      if (urlPath.includes(`/${key}/`) || urlPath.includes(`${key}/`) || urlPath === `/${key}`) {
        return key;
      }
    }
    return null;
  }

  /**
   * Convert file path to URL path
   */
  filePathToUrl(filePath) {
    const relativePath = path.relative(this.appPath, filePath);
    
    let urlPath = relativePath
      .replace(/\\/g, '/')
      .replace(/\/page\.tsx$/, '')
      .replace(/\/@content/g, '')
      .replace(/\(main\)\//g, '')  // Remove (main)/ pattern
      .replace(/\/\(main\)/g, '')  // Remove /(main) pattern  
      .replace(/\(main\)/g, '')    // Remove any remaining (main)
      .replace(/\[([^\]]+)\]/g, ':$1'); // Convert [param] to :param for now
    
    // Add leading slash if not present
    if (!urlPath.startsWith('/')) {
      urlPath = '/' + urlPath;
    }
    
    // Clean up the URL - multiple slashes, trailing slash
    urlPath = urlPath.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
    
    return urlPath;
  }

  /**
   * Recursively find all page.tsx files
   */
  findPageFiles(dir, files = []) {
    try {
      if (!fs.existsSync(dir)) {
        return files;
      }
      
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          this.findPageFiles(fullPath, files);
        } else if (entry.name === 'page.tsx') {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not read directory ${dir}:`, error.message);
    }
    
    return files;
  }

  /**
   * Scan all page files and generate search entries
   */
  async scanPages() {
    console.log('🔍 Scanning page files...');
    
    const pageFiles = this.findPageFiles(this.appPath);
    
    for (const filePath of pageFiles) {
      const urlPath = this.filePathToUrl(filePath);
      const metadata = this.extractPageMetadata(filePath, urlPath);
      const category = this.getCategoryFromPath(urlPath);
      
      // Skip dynamic route templates for now
      if (urlPath.includes(':')) {
        continue;
      }
      
      const searchEntry = {
        id: this.generateId(urlPath),
        title: metadata.title,
        description: metadata.description,
        content: metadata.content,
        url: urlPath,
        category: category ? CATEGORY_MAPPING[category].id : 'main',
        type: 'page',
        tags: [
          ...metadata.keywords,
          ...(category ? CATEGORY_MAPPING[category].keywords : [])
        ].filter((tag, index, arr) => arr.indexOf(tag) === index) // Remove duplicates
      };
      
      this.searchIndex.push(searchEntry);
      console.log(`✅ Added: ${searchEntry.title} (${searchEntry.url})`);
    }
  }

  /**
   * Load and process techniques data
   */
  async loadTechniques() {
    console.log('🔍 Loading techniques data...');
    
    try {
      // We'll need to import techniques data - for now let's read the files directly
      const techniquesPath = path.join(this.srcPath, 'app/techniques');
      
      if (fs.existsSync(techniquesPath)) {
        const files = fs.readdirSync(techniquesPath).filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'index.ts');
        
        for (const file of files) {
          const filePath = path.join(techniquesPath, file);
          const content = fs.readFileSync(filePath, 'utf8');
          
          // Extract technique definitions from the file
          this.extractTechniquesFromFile(content, file);
        }
      }
    } catch (error) {
      console.warn('Warning: Could not load techniques data:', error.message);
    }
  }

  /**
   * Extract technique definitions from technique files
   */
  extractTechniquesFromFile(content, filename) {
    const categoryName = filename.replace('.ts', '').replace(/-/g, ' ');
    
    // Match technique objects in the array
    const techniqueMatches = content.match(/{\s*id:\s*['"`]([^'"`]+)['"`][\s\S]*?}/g) || [];
    
    techniqueMatches.forEach(match => {
      try {
        const idMatch = match.match(/id:\s*['"`]([^'"`]+)['"`]/);
        const nameMatch = match.match(/name:\s*['"`]([^'"`]+)['"`]/);
        const descriptionMatch = match.match(/description:\s*['"`]([^'"`]+)['"`]/);
        const tagsMatch = match.match(/tags:\s*\[(.*?)\]/s);
        
        if (idMatch && nameMatch) {
          const technique = {
            id: `technique-${idMatch[1]}`,
            title: nameMatch[1],
            description: descriptionMatch ? descriptionMatch[1] : `Learn about ${nameMatch[1]} technique`,
            content: match, // Store the full match as content
            url: `/patterns/reasoning-techniques/${idMatch[1]}`, // Assuming most are reasoning techniques
            category: 'patterns',
            subcategory: 'reasoning',
            type: 'technique',
            tags: []
          };
          
          // Extract tags if present
          if (tagsMatch) {
            const tagsString = tagsMatch[1];
            const tags = tagsString.match(/['"`]([^'"`]+)['"`]/g) || [];
            technique.tags = tags.map(tag => tag.replace(/['"`]/g, ''));
          }
          
          // Add category-based tags
          technique.tags.push(categoryName, 'technique', 'pattern');
          technique.tags = [...new Set(technique.tags)]; // Remove duplicates
          
          this.searchIndex.push(technique);
          console.log(`✅ Added technique: ${technique.title}`);
        }
      } catch (error) {
        console.warn(`Warning: Could not parse technique from ${filename}:`, error.message);
      }
    });
  }

  /**
   * Generate a unique ID for the search entry
   */
  generateId(urlPath) {
    return urlPath
      .replace(/^\//, '')
      .replace(/\//g, '-')
      .replace(/[^a-z0-9-]/gi, '')
      .toLowerCase() || 'home';
  }

  /**
   * Add main navigation pages
   */
  addMainPages() {
    console.log('📄 Adding main navigation pages...');
    
    const mainPages = [
      {
        id: 'home',
        title: 'Home',
        description: 'Learn how to build reliable and secure AI systems',
        content: 'Welcome to Agentic Design. Explore comprehensive resources for building AI agents, including design patterns, red teaming techniques, fine-tuning guides, and more.',
        url: '/',
        category: 'main',
        type: 'page',
        tags: ['home', 'overview', 'getting started', 'ai', 'agents']
      },
      {
        id: 'about',
        title: 'About',
        description: 'Learn about Agentic Design',
        content: 'Discover our mission, team, and the story behind Agentic Design.',
        url: '/about',
        category: 'main',
        type: 'page',
        tags: ['about', 'team', 'mission', 'company']
      },
      {
        id: 'interactive-demo',
        title: 'Interactive Demo',
        description: 'Try AI patterns in action',
        content: 'Interactive demonstrations of AI patterns, prompt engineering, and agent architectures.',
        url: '/interactive-demo',
        category: 'main',
        type: 'page',
        tags: ['demo', 'interactive', 'playground', 'examples']
      }
    ];
    
    mainPages.forEach(page => {
      this.searchIndex.push(page);
      console.log(`✅ Added main page: ${page.title}`);
    });
  }

  /**
   * Generate the complete search index
   */
  async generateIndex() {
    console.log('🚀 Starting search index generation...\n');
    
    // Add main pages
    this.addMainPages();
    
    // Scan all page files
    await this.scanPages();
    
    // Load techniques data
    await this.loadTechniques();
    
    console.log(`\n✨ Generated ${this.searchIndex.length} search entries`);
    
    return this.searchIndex;
  }

  /**
   * Write the generated index to file
   */
  writeIndexToFile(outputPath) {
    const indexContent = `import { SearchResult } from '@/contexts/SearchContext';

export interface SearchableContent {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  category: string;
  subcategory?: string;
  type: 'page' | 'prompt' | 'pattern' | 'technique' | 'article' | 'project';
  tags?: string[];
  metadata?: Record<string, any>;
}

// Auto-generated comprehensive search index
// Generated on: ${new Date().toISOString()}
// Total entries: ${this.searchIndex.length}
export const searchIndex: SearchableContent[] = ${JSON.stringify(this.searchIndex, null, 2)};

// Helper function to get all unique categories
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  searchIndex.forEach(item => categories.add(item.category));
  return Array.from(categories).sort();
}

// Helper function to get all unique types
export function getAllTypes(): string[] {
  const types = new Set<string>();
  searchIndex.forEach(item => types.add(item.type));
  return Array.from(types).sort();
}

// Helper function to get popular tags
export function getPopularTags(limit: number = 10): string[] {
  const tagCount = new Map<string, number>();
  
  searchIndex.forEach(item => {
    if (item.tags) {
      item.tags.forEach(tag => {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
      });
    }
  });
  
  return Array.from(tagCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}
`;
    
    fs.writeFileSync(outputPath, indexContent);
    console.log(`\n💾 Search index written to: ${outputPath}`);
  }
}

// Main execution
async function main() {
  const generator = new SearchIndexGenerator();
  
  try {
    await generator.generateIndex();
    
    const outputPath = path.join(__dirname, '../src/lib/searchIndex.ts');
    generator.writeIndexToFile(outputPath);
    
    console.log('\n🎉 Search index generation completed successfully!');
    console.log('\nSummary:');
    console.log(`- Total entries: ${generator.searchIndex.length}`);
    console.log(`- Categories: ${[...new Set(generator.searchIndex.map(item => item.category))].join(', ')}`);
    console.log(`- Types: ${[...new Set(generator.searchIndex.map(item => item.type))].join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error generating search index:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { SearchIndexGenerator };