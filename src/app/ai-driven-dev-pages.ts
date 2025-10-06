export interface AIDrivenDevPage {
  id: string;
  title: string;
  description: string;
  category: string;
  keywords?: string[];
  priority?: number;
}

export const aiDrivenDevPages: AIDrivenDevPage[] = [
  // Getting Started
  {
    id: 'tools',
    title: 'AI Development Tools Directory',
    description: '40+ AI-powered development tools including IDE assistants, terminal agents, code review tools, and autonomous coding agents. Compare features, pricing, and use cases.',
    category: 'Getting Started',
    keywords: ['AI tools', 'development tools', 'IDE assistants', 'terminal agents', 'code review'],
    priority: 0.9
  },
  {
    id: 'decision-guide',
    title: 'AI Development Tool Decision Guide',
    description: 'Choose the right AI development tool for your workflow. Compare IDE assistants, terminal agents, web platforms, and more with our comprehensive decision framework.',
    category: 'Getting Started',
    keywords: ['tool selection', 'decision guide', 'AI tool comparison'],
    priority: 0.8
  },
  {
    id: 'environment-setup',
    title: 'AI Development Environment Setup',
    description: 'Set up your AI-powered development environment with IDE assistants, terminal agents, and essential tools for modern software development.',
    category: 'Getting Started',
    keywords: ['environment setup', 'development environment', 'AI setup'],
    priority: 0.8
  },
  {
    id: 'first-project',
    title: 'Your First AI-Assisted Project',
    description: 'Build your first project with AI assistance. Learn practical workflows, prompting techniques, and best practices for AI-driven development.',
    category: 'Getting Started',
    keywords: ['first project', 'getting started', 'AI tutorial'],
    priority: 0.8
  },
  {
    id: 'choosing-tools',
    title: 'Choosing the Right AI Development Tools',
    description: 'Expert guidance on selecting AI development tools based on your tech stack, team size, and project requirements.',
    category: 'Getting Started',
    keywords: ['tool selection', 'choosing tools', 'AI tools'],
    priority: 0.7
  },

  // Tools & Platforms
  {
    id: 'comparison',
    title: 'AI Development Tools Comparison Matrix',
    description: 'Side-by-side comparison of popular AI development tools including Claude Code, Cursor, Windsurf, GitHub Copilot, and more. Compare features, pricing, and capabilities.',
    category: 'Tools & Platforms',
    keywords: ['comparison', 'tool comparison', 'AI tools matrix', 'Claude Code', 'Cursor', 'GitHub Copilot'],
    priority: 0.9
  },
  {
    id: 'ide-assistants',
    title: 'AI IDE Assistants - Cursor, Windsurf, GitHub Copilot',
    description: 'In-depth comparison of AI-powered IDE assistants. Learn about Cursor, Windsurf, GitHub Copilot, and other integrated development environment AI tools.',
    category: 'Tools & Platforms',
    keywords: ['IDE assistants', 'Cursor', 'Windsurf', 'GitHub Copilot', 'integrated development'],
    priority: 0.8
  },
  {
    id: 'terminal-agents',
    title: 'AI Terminal Agents - Claude Code, Aider, GPT Engineer',
    description: 'Explore autonomous terminal agents like Claude Code, Aider, GPT Engineer, and DevPod that can write code, run commands, and execute complex tasks.',
    category: 'Tools & Platforms',
    keywords: ['terminal agents', 'Claude Code', 'Aider', 'GPT Engineer', 'autonomous coding'],
    priority: 0.8
  },
  {
    id: 'vscode-extensions',
    title: 'VS Code AI Extensions',
    description: 'The best AI-powered VS Code extensions for code completion, refactoring, testing, and documentation generation.',
    category: 'Tools & Platforms',
    keywords: ['VS Code', 'extensions', 'VS Code AI', 'code completion'],
    priority: 0.7
  },
  {
    id: 'web-platforms',
    title: 'AI Web Development Platforms',
    description: 'Cloud-based AI development platforms including Replit, Bolt.new, and others for instant development environments and collaboration.',
    category: 'Tools & Platforms',
    keywords: ['web platforms', 'Replit', 'Bolt.new', 'cloud development'],
    priority: 0.7
  },
  {
    id: 'autocomplete-tools',
    title: 'AI Code Autocomplete Tools',
    description: 'Intelligent code completion tools powered by AI including GitHub Copilot, Tabnine, CodeWhisperer, and more.',
    category: 'Tools & Platforms',
    keywords: ['autocomplete', 'code completion', 'GitHub Copilint', 'Tabnine'],
    priority: 0.7
  },
  {
    id: 'code-review',
    title: 'AI-Powered Code Review Tools',
    description: 'Automated code review tools that use AI to catch bugs, suggest improvements, and enforce coding standards.',
    category: 'Tools & Platforms',
    keywords: ['code review', 'automated review', 'code quality'],
    priority: 0.7
  },
  {
    id: 'testing-quality',
    title: 'AI Testing and Quality Assurance Tools',
    description: 'AI-powered testing tools for unit tests, integration tests, test generation, and quality assurance automation.',
    category: 'Tools & Platforms',
    keywords: ['testing', 'QA', 'test automation', 'quality assurance'],
    priority: 0.7
  },
  {
    id: 'autonomous-agents',
    title: 'Autonomous AI Coding Agents',
    description: 'Fully autonomous agents that can plan, code, test, and deploy software with minimal human intervention.',
    category: 'Tools & Platforms',
    keywords: ['autonomous agents', 'AI agents', 'autonomous coding'],
    priority: 0.8
  },
  {
    id: 'autonomous',
    title: 'Autonomous Development Workflows',
    description: 'Build workflows with autonomous AI agents that handle complex development tasks end-to-end.',
    category: 'Tools & Platforms',
    keywords: ['autonomous', 'workflows', 'AI automation'],
    priority: 0.7
  },
  {
    id: 'no-code-builders',
    title: 'AI No-Code Development Platforms',
    description: 'Build applications without code using AI-powered no-code platforms and visual development tools.',
    category: 'Tools & Platforms',
    keywords: ['no-code', 'low-code', 'visual development', 'AI builders'],
    priority: 0.7
  },
  {
    id: 'no-code',
    title: 'No-Code AI Development',
    description: 'Leverage AI to build software without traditional coding using natural language and visual interfaces.',
    category: 'Tools & Platforms',
    keywords: ['no-code', 'AI development', 'visual programming'],
    priority: 0.7
  },

  // Methodologies
  {
    id: 'vibe-coding',
    title: 'Vibe Coding - Intuitive AI-Driven Development',
    description: 'A new approach to development where you describe what you want and AI figures out how to build it. Learn the philosophy and practices of vibe coding.',
    category: 'Methodologies',
    keywords: ['vibe coding', 'intuitive development', 'AI methodology'],
    priority: 0.8
  },
  {
    id: 'spec-driven',
    title: 'Spec-Driven AI Development',
    description: 'Write comprehensive specifications and let AI generate implementation. Learn how to create effective specs for AI-assisted development.',
    category: 'Methodologies',
    keywords: ['spec-driven', 'specifications', 'requirements', 'AI generation'],
    priority: 0.8
  },
  {
    id: 'test-driven-ai',
    title: 'Test-Driven Development with AI',
    description: 'Combine TDD principles with AI assistance. Write tests first, then use AI to generate implementation that passes your tests.',
    category: 'Methodologies',
    keywords: ['TDD', 'test-driven', 'testing', 'AI testing'],
    priority: 0.8
  },
  {
    id: 'ddd',
    title: 'Domain-Driven Design with AI',
    description: 'Use AI to implement Domain-Driven Design patterns, bounded contexts, aggregates, and domain models effectively.',
    category: 'Methodologies',
    keywords: ['DDD', 'domain-driven design', 'domain modeling', 'bounded context'],
    priority: 0.8
  },
  {
    id: 'ddd-with-ai',
    title: 'AI-Assisted Domain-Driven Design',
    description: 'Leverage AI to discover domain models, define bounded contexts, and implement DDD patterns in your codebase.',
    category: 'Methodologies',
    keywords: ['DDD', 'domain-driven design', 'AI-assisted DDD'],
    priority: 0.7
  },
  {
    id: 'hexagonal',
    title: 'Hexagonal Architecture with AI',
    description: 'Build maintainable applications with hexagonal (ports and adapters) architecture using AI assistance for boilerplate and structure.',
    category: 'Methodologies',
    keywords: ['hexagonal architecture', 'ports and adapters', 'clean architecture'],
    priority: 0.8
  },
  {
    id: 'hexagonal-architecture',
    title: 'Implementing Hexagonal Architecture',
    description: 'Step-by-step guide to implementing hexagonal architecture patterns with AI-assisted code generation.',
    category: 'Methodologies',
    keywords: ['hexagonal', 'architecture', 'implementation'],
    priority: 0.7
  },
  {
    id: 'ai-pair-programming',
    title: 'AI Pair Programming',
    description: 'Real-time collaboration between human and AI. Learn the driver/navigator model and best practices for effective AI pair programming.',
    category: 'Methodologies',
    keywords: ['pair programming', 'collaboration', 'AI pairing'],
    priority: 0.8
  },
  {
    id: 'prompt-libraries',
    title: 'Prompt Libraries for Development',
    description: 'Curated collection of effective prompts for common development tasks including refactoring, testing, documentation, and debugging.',
    category: 'Methodologies',
    keywords: ['prompts', 'prompt engineering', 'prompt library', 'templates'],
    priority: 0.8
  },
  {
    id: 'tdd-workflows',
    title: 'Test-Driven Development Workflows',
    description: 'Production-ready TDD workflows with AI assistance for writing tests, implementing features, and maintaining quality.',
    category: 'Methodologies',
    keywords: ['TDD', 'workflows', 'testing workflows'],
    priority: 0.7
  },

  // Production Workflows
  {
    id: 'spec-to-deploy',
    title: 'Spec to Deploy Pipeline',
    description: 'Complete pipeline from specification to production deployment using AI. Automate planning, implementation, testing, and deployment.',
    category: 'Production Workflows',
    keywords: ['deployment', 'pipeline', 'CI/CD', 'automation'],
    priority: 0.8
  },
  {
    id: 'harper-reed-workflow',
    title: 'Harper Reed Development Method',
    description: 'Learn Harper Reed\'s workflow for building production software with AI assistance, from concept to deployment.',
    category: 'Production Workflows',
    keywords: ['Harper Reed', 'workflow', 'methodology', 'production'],
    priority: 0.7
  },
  {
    id: '70-percent-problem',
    title: 'The 70% Problem in AI Development',
    description: 'Understand the 70% problem: AI is great at scaffolding but struggles with the final 30%. Learn strategies to overcome this challenge.',
    category: 'Production Workflows',
    keywords: ['70% problem', 'AI limitations', 'completion', 'polish'],
    priority: 0.7
  },

  // Real Examples
  {
    id: 'fullstack-app',
    title: 'Building a Full-Stack App with AI',
    description: 'Complete walkthrough of building a full-stack application from scratch using AI assistance for frontend, backend, and database.',
    category: 'Real Examples',
    keywords: ['full-stack', 'web app', 'tutorial', 'end-to-end'],
    priority: 0.8
  },
  {
    id: 'saas-from-scratch',
    title: 'Building a SaaS from Scratch with AI',
    description: 'Build a complete SaaS application with AI assistance including auth, payments, multi-tenancy, and deployment.',
    category: 'Real Examples',
    keywords: ['SaaS', 'startup', 'application', 'from scratch'],
    priority: 0.8
  },
  {
    id: 'mobile-app-mvp',
    title: 'Building a Mobile App MVP with AI',
    description: 'Create a mobile app MVP using AI assistance for React Native, Flutter, or native development.',
    category: 'Real Examples',
    keywords: ['mobile app', 'MVP', 'React Native', 'Flutter'],
    priority: 0.7
  },
  {
    id: 'api-wrapper-library',
    title: 'Building an API Wrapper Library',
    description: 'Create a production-ready API wrapper library with AI assistance including TypeScript types, error handling, and documentation.',
    category: 'Real Examples',
    keywords: ['API', 'library', 'wrapper', 'SDK'],
    priority: 0.7
  },
  {
    id: 'refactoring-legacy',
    title: 'Refactoring Legacy Code with AI',
    description: 'Strategies for understanding, refactoring, and modernizing legacy codebases using AI assistance.',
    category: 'Real Examples',
    keywords: ['refactoring', 'legacy code', 'modernization'],
    priority: 0.7
  },
  {
    id: 'legacy-modernization',
    title: 'Legacy Application Modernization',
    description: 'Modernize legacy applications with AI assistance for migration, refactoring, and technology updates.',
    category: 'Real Examples',
    keywords: ['legacy', 'modernization', 'migration', 'refactoring'],
    priority: 0.7
  },
  {
    id: 'debugging',
    title: 'Debugging with AI',
    description: 'Advanced debugging techniques using AI to identify issues, understand stack traces, and fix bugs faster.',
    category: 'Real Examples',
    keywords: ['debugging', 'troubleshooting', 'bug fixing'],
    priority: 0.7
  },
  {
    id: 'bug-hunting-production',
    title: 'Bug Hunting in Production with AI',
    description: 'Use AI to analyze logs, traces, and metrics to identify and fix production bugs quickly.',
    category: 'Real Examples',
    keywords: ['production', 'bug hunting', 'debugging', 'monitoring'],
    priority: 0.7
  },
  {
    id: 'api-development',
    title: 'API Development with AI',
    description: 'Design and build RESTful and GraphQL APIs with AI assistance for endpoints, validation, and documentation.',
    category: 'Real Examples',
    keywords: ['API', 'REST', 'GraphQL', 'backend'],
    priority: 0.7
  },
  {
    id: 'microservices',
    title: 'Building Microservices with AI',
    description: 'Design and implement microservices architecture with AI assistance for service boundaries, communication, and deployment.',
    category: 'Real Examples',
    keywords: ['microservices', 'architecture', 'distributed systems'],
    priority: 0.7
  },
  {
    id: 'open-source-contribution',
    title: 'Contributing to Open Source with AI',
    description: 'Use AI to understand codebases, find good first issues, and make meaningful open source contributions.',
    category: 'Real Examples',
    keywords: ['open source', 'contribution', 'GitHub', 'community'],
    priority: 0.7
  },
  {
    id: 'performance',
    title: 'Performance Optimization with AI',
    description: 'Identify and fix performance bottlenecks using AI analysis of profiling data, metrics, and code patterns.',
    category: 'Real Examples',
    keywords: ['performance', 'optimization', 'profiling', 'speed'],
    priority: 0.7
  },
  {
    id: 'security-best-practices',
    title: 'Security Best Practices for AI Development',
    description: 'Learn security best practices when using AI coding assistants including prompt injection prevention, secrets management, and code review.',
    category: 'Getting Started',
    keywords: ['security', 'best practices', 'AI safety', 'code security'],
    priority: 0.7
  },
  {
    id: 'visual-development',
    title: 'Visual Development with AI',
    description: 'Screenshot-to-code generation, visual UI debugging, and design-to-implementation workflows. Learn how AI can convert designs into production-ready code.',
    category: 'Tools & Platforms',
    keywords: ['visual development', 'screenshot-to-code', 'UI debugging', 'design-to-code', 'Figma', 'Playwright MCP'],
    priority: 0.8
  }
];

export function getAIDrivenDevPageById(id: string): AIDrivenDevPage | undefined {
  return aiDrivenDevPages.find(page => page.id === id);
}

export function getAIDrivenDevPagesByCategory(category: string): AIDrivenDevPage[] {
  return aiDrivenDevPages.filter(page => page.category === category);
}

export const aiDrivenDevCategories = [
  'Getting Started',
  'Tools & Platforms',
  'Methodologies',
  'Production Workflows',
  'Real Examples'
];