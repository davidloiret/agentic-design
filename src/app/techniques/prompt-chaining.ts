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
    useCases: ['content-creation', 'data-processing', 'workflow-automation', 'multi-step-analysis', 'complex-qa', 'code', 'research-synthesis'],
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
];