export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  parent?: string;
  children?: string[];
}

export const categories: Category[] = [
  { id: 'all', name: 'All Patterns', icon: '🔮', description: 'View all available patterns' },
  { 
    id: 'reasoning', 
    name: 'Reasoning Patterns', 
    icon: '🧠', 
    description: 'Advanced reasoning and thinking techniques',
    children: ['basic-reasoning', 'advanced-reasoning']
  },
  { 
    id: 'basic-reasoning', 
    name: 'Basic Reasoning', 
    icon: '💭', 
    description: 'Simple reasoning techniques',
    parent: 'reasoning'
  },
  { 
    id: 'advanced-reasoning', 
    name: 'Advanced Reasoning', 
    icon: '🎯', 
    description: 'Complex reasoning patterns',
    parent: 'reasoning'
  },
  { 
    id: 'safety', 
    name: 'Guardrails & Safety', 
    icon: '🛡️', 
    description: 'Safety measures and content filtering',
    children: ['input-validation', 'output-filtering']
  },
  { 
    id: 'input-validation', 
    name: 'Input Validation', 
    icon: '🔍', 
    description: 'Validate and sanitize inputs',
    parent: 'safety'
  },
  { 
    id: 'output-filtering', 
    name: 'Output Filtering', 
    icon: '🚧', 
    description: 'Filter and moderate outputs',
    parent: 'safety'
  },
  { 
    id: 'chaining', 
    name: 'Prompt Chaining', 
    icon: '🔗', 
    description: 'Multi-step prompt orchestration patterns',
    children: ['sequential', 'parallel', 'conditional']
  },
  { 
    id: 'sequential', 
    name: 'Sequential Chaining', 
    icon: '➡️', 
    description: 'Step-by-step sequential execution',
    parent: 'chaining'
  },
  { 
    id: 'parallel', 
    name: 'Parallel Chaining', 
    icon: '⚡', 
    description: 'Concurrent parallel execution',
    parent: 'chaining'
  },
  { 
    id: 'conditional', 
    name: 'Conditional Chaining', 
    icon: '🔀', 
    description: 'Dynamic branching logic',
    parent: 'chaining'
  }
];
