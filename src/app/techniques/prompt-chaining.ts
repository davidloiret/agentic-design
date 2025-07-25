import { Technique } from './types';

export const promptChainingTechniques: Technique[] = [
  {
    id: 'sequential-chaining',
    name: 'Sequential Chaining',
    abbr: '',
    icon: '🔗',
    color: 'from-blue-400 to-indigo-500',
    category: 'prompt-chaining',
    description: 'Links prompts in linear sequence where each output feeds the next input',
    features: [
      'Linear workflow execution',
      'Context preservation across steps',
      'Error propagation handling',
      'State management between prompts'
    ],
    useCases: ['content-creation', 'data-processing', 'workflow-automation', 'multi-step-analysis'],
    complexity: 'low',
    example: 'Task: Write a product review\n\nChain:\n1. Research prompt: "Analyze product features of [product]"\n2. Analysis prompt: "Compare [features] with competitors"\n3. Writing prompt: "Write review based on [analysis]"\n4. Editing prompt: "Improve clarity and tone of [review]"\n\nOutput: Polished, well-researched product review'
  },
  {
    id: 'parallel-chaining',
    name: 'Parallel Chaining',
    abbr: '',
    icon: '⚡',
    color: 'from-indigo-500 to-purple-500',
    category: 'prompt-chaining',
    description: 'Executes multiple prompts simultaneously and combines results',
    features: [
      'Concurrent prompt execution',
      'Result aggregation strategies',
      'Load balancing and scaling',
      'Conflict resolution mechanisms'
    ],
    useCases: ['research', 'data-analysis', 'consensus-building', 'rapid-ideation'],
    complexity: 'medium',
    example: 'Task: Market analysis for new product\n\nParallel Chains:\n• Chain A: Analyze competitor pricing\n• Chain B: Research target demographics\n• Chain C: Evaluate market trends\n• Chain D: Assess regulatory requirements\n\nAggregation: Combine all insights into comprehensive market analysis'
  },
  {
    id: 'conditional-chaining',
    name: 'Conditional Chaining',
    abbr: '',
    icon: '🔀',
    color: 'from-purple-500 to-pink-500',
    category: 'prompt-chaining',
    description: 'Routes execution through different prompt paths based on conditions',
    features: [
      'Dynamic path selection',
      'Condition evaluation logic',
      'Branching and merging strategies',
      'Context-aware routing'
    ],
    useCases: ['personalization', 'adaptive-workflows', 'decision-trees', 'user-interfaces'],
    complexity: 'high',
    example: 'Customer Support Chain:\n\nInput: Customer query\n↓\nClassification: Technical/Billing/General\n↓\nIf Technical → Technical expert prompt\nIf Billing → Billing specialist prompt  \nIf General → General support prompt\n↓\nEscalation check: If complex → Human handoff\n↓\nResponse generation'
  },
  {
    id: 'feedback-chaining',
    name: 'Feedback Chaining',
    abbr: '',
    icon: '🔄',
    color: 'from-pink-500 to-rose-500',
    category: 'prompt-chaining',
    description: 'Creates loops where outputs are fed back as inputs for refinement',
    features: [
      'Iterative improvement cycles',
      'Convergence detection',
      'Quality metrics tracking',
      'Stop condition evaluation'
    ],
    useCases: ['content-refinement', 'optimization', 'creative-iteration', 'quality-improvement'],
    complexity: 'medium',
    example: 'Content Improvement Loop:\n\n1. Generate initial content\n2. Evaluate content quality (1-10)\n3. If score < 8: Generate improvement suggestions\n4. Apply improvements and regenerate\n5. Re-evaluate quality\n6. Repeat until score ≥ 8 or max iterations\n\nResult: High-quality, iteratively refined content'
  },
  {
    id: 'hierarchical-chaining',
    name: 'Hierarchical Chaining',
    abbr: '',
    icon: '🏗️',
    color: 'from-rose-500 to-red-500',
    category: 'prompt-chaining',
    description: 'Organizes prompts in hierarchical structure with parent-child relationships',
    features: [
      'Multi-level task decomposition',
      'Parent-child dependencies',
      'Hierarchical result aggregation',
      'Context inheritance patterns'
    ],
    useCases: ['project-planning', 'complex-analysis', 'research-synthesis', 'system-design'],
    complexity: 'high',
    example: 'Business Plan Generation:\n\nLevel 1: Executive Summary\n├─ Level 2: Market Analysis\n│  ├─ Level 3: Competitor Analysis\n│  └─ Level 3: Customer Segments\n├─ Level 2: Financial Projections\n│  ├─ Level 3: Revenue Forecast\n│  └─ Level 3: Cost Analysis\n└─ Level 2: Marketing Strategy\n   ├─ Level 3: Channel Strategy\n   └─ Level 3: Pricing Strategy'
  },
  {
    id: 'iterative-refinement',
    name: 'Iterative Refinement',
    abbr: '',
    icon: '🔄',
    color: 'from-cyan-500 to-blue-500',
    category: 'prompt-chaining',
    description: 'Continuously improves outputs through multiple refinement cycles',
    features: [
      'Multi-cycle improvement process',
      'Quality assessment between iterations',
      'Incremental enhancement tracking',
      'Convergence criteria evaluation'
    ],
    useCases: ['content-polish', 'code-optimization', 'design-iteration', 'research-refinement'],
    complexity: 'medium',
    example: 'Essay Improvement Process:\n\nCycle 1: Initial draft\nCritique: Weak arguments, unclear structure\nRefinement: Strengthen arguments, improve flow\n\nCycle 2: Revised draft\nCritique: Better structure, needs examples\nRefinement: Add supporting evidence\n\nCycle 3: Enhanced draft\nCritique: Good content, minor style issues\nRefinement: Polish language, final edit\n\nResult: High-quality, well-structured essay'
  },
  {
    id: 'parallel-synthesis',
    name: 'Parallel Synthesis',
    abbr: '',
    icon: '🧩',
    color: 'from-violet-500 to-purple-500',
    category: 'prompt-chaining',
    description: 'Combines multiple parallel processing streams into unified outputs',
    features: [
      'Multi-stream processing',
      'Intelligent result merging',
      'Conflict resolution strategies',
      'Quality-weighted aggregation'
    ],
    useCases: ['research-synthesis', 'multi-perspective-analysis', 'consensus-building', 'comprehensive-reports'],
    complexity: 'high',
    example: 'Market Research Synthesis:\n\nParallel Streams:\n• Stream A: Survey data analysis\n• Stream B: Competitor intelligence\n• Stream C: Industry trend analysis\n• Stream D: Customer interview insights\n\nSynthesis Process:\n1. Weight each stream by reliability\n2. Identify common themes\n3. Resolve contradictions\n4. Generate unified insights\n\nOutput: Comprehensive market intelligence report'
  }
];