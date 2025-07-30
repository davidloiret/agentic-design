import { Technique } from './types';

export const promptChainingTechniques: Technique[] = [
  {
    id: 'sequential-chaining',
    name: 'Sequential Chaining',
    abbr: '',
    icon: '🔗',
    color: 'from-blue-400 to-indigo-500',
    category: 'prompt-chaining',
    description: 'A fundamental prompt engineering technique that breaks complex tasks into smaller, interconnected prompts where each output serves as input for the next step, creating a structured reasoning pipeline that significantly improves LLM performance on multi-step problems',
    features: [
      'Linear workflow execution with step-by-step processing',
      'Context preservation and state management across prompts',
      'Error isolation and recovery at each step',
      'Transparent reasoning process for debugging',
      'Reduced hallucination through focused prompts',
      'Improved accuracy on complex tasks vs monolithic prompts'
    ],
    useCases: ['content-creation', 'data-processing', 'workflow-automation', 'multi-step-analysis', 'document-qa', 'code-generation', 'research-synthesis'],
    complexity: 'low',
    example: 'Task: Generate comprehensive market analysis report\n\nSequential Chain Implementation:\n1. Data Extraction: "Extract key metrics from Q4 2024 sales data"\n   → Output: Revenue: $2.4M, Growth: 15%, Top products...\n\n2. Trend Analysis: "Analyze trends from [extracted metrics]"\n   → Output: Upward trajectory in mobile segment, seasonal patterns...\n\n3. Competitor Research: "Compare [our metrics] with industry benchmarks"\n   → Output: Above industry average growth, pricing opportunities...\n\n4. Synthesis: "Create executive summary from [trends] and [comparison]"\n   → Output: Strategic recommendations based on data-driven insights\n\n5. Polish: "Enhance clarity and add visualizations to [summary]"\n   → Final Output: Publication-ready market analysis with actionable insights\n\nResearch shows this approach achieves 15.6% better accuracy than single prompts (2024 studies)'
  },
  {
    id: 'parallel-chaining',
    name: 'Parallel Chaining',
    abbr: '',
    icon: '⚡',
    color: 'from-indigo-500 to-purple-500',
    category: 'prompt-chaining',
    description: 'Executes multiple independent prompts concurrently and intelligently combines their outputs, enabling faster processing and multi-perspective analysis that leverages parallel computation for complex tasks requiring diverse viewpoints or data sources',
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
    description: 'Implements dynamic branching logic where prompt execution paths are determined by intermediate outputs, enabling adaptive workflows that respond intelligently to varying inputs and contexts - essential for personalization and decision trees',
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
    description: 'Implements iterative improvement cycles where outputs are evaluated and fed back as inputs until quality criteria are met, proven to enhance output quality through convergence-based refinement - particularly effective for creative and optimization tasks',
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
    description: 'Structures prompts in multi-level parent-child relationships enabling complex task decomposition, where high-level goals are systematically broken down into manageable subtasks with context inheritance - ideal for project planning and system design',
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
    description: 'Employs systematic multi-pass refinement where each iteration focuses on specific quality improvements, with research showing 3-5 cycles typically achieve optimal results before diminishing returns - essential for content polish and code optimization',
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
    description: 'Advanced technique that orchestrates multiple parallel processing streams with intelligent conflict resolution and quality-weighted aggregation, enabling synthesis of diverse perspectives into coherent, comprehensive outputs - crucial for research and consensus-building',
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