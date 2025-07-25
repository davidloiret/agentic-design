import { Technique } from './types';

export const planningExecutionTechniques: Technique[] = [
  {
    id: 'hierarchical-planning',
    name: 'Hierarchical Planning',
    abbr: 'HTN',
    icon: '🏗️',
    color: 'from-blue-600 to-purple-600',
    category: 'planning',
    description: 'Decomposes high-level goals into hierarchical sub-tasks',
    features: [
      'Goal decomposition',
      'Multi-level abstraction',
      'Dependency management',
      'Resource allocation'
    ],
    useCases: ['project-management', 'complex-workflows', 'strategic-planning', 'system-design'],
    complexity: 'high',
    example: 'Goal: Launch new product\n\nLevel 1: Product Launch\n├─ Level 2: Product Development\n│  ├─ Level 3: Market Research\n│  ├─ Level 3: Design & Engineering\n│  └─ Level 3: Testing & QA\n├─ Level 2: Marketing Strategy\n└─ Level 3: Go-to-Market Plan\n\nEach level has specific tasks, timelines, and dependencies'
  },
  {
    id: 'goal-decomposition',
    name: 'Goal Decomposition',
    abbr: '',
    icon: '🎯',
    color: 'from-purple-600 to-pink-600',
    category: 'planning',
    description: 'Breaks down complex goals into manageable sub-goals',
    features: [
      'SMART goal creation',
      'Dependency analysis',
      'Priority assignment',
      'Progress tracking'
    ],
    useCases: ['task-management', 'goal-setting', 'project-planning', 'personal-productivity'],
    complexity: 'medium',
    example: 'Main Goal: "Improve website performance"\n\nDecomposition:\n• Sub-goal 1: Optimize images (reduce size by 50%)\n• Sub-goal 2: Minimize JavaScript (reduce bundle by 30%)\n• Sub-goal 3: Implement caching (achieve 90% cache hit rate)\n• Sub-goal 4: Upgrade server (reduce response time by 40%)\n\nEach sub-goal has specific metrics and deadlines'
  },
  {
    id: 'constraint-satisfaction',
    name: 'Constraint Satisfaction',
    abbr: 'CSP',
    icon: '⚖️',
    color: 'from-pink-600 to-red-600',
    category: 'planning',
    description: 'Plans solutions within specified constraints and limitations',
    features: [
      'Constraint modeling',
      'Solution space exploration',
      'Trade-off analysis',  
      'Optimization algorithms'
    ],
    useCases: ['resource-allocation', 'scheduling', 'optimization', 'configuration'],
    complexity: 'high',
    example: 'Scheduling Problem:\n\nConstraints:\n• 5 tasks, 3 workers\n• Worker A: 8-hour availability\n• Worker B: 6-hour availability  \n• Worker C: 4-hour availability\n• Task dependencies: A→B, C→D\n• Deadline: 2 days\n\nSolution: Optimal task assignment and timeline\nrespecting all constraints'
  },
  {  
    id: 'scenario-planning',
    name: 'Scenario Planning',
    abbr: '',
    icon: '🔮',
    color: 'from-red-600 to-orange-600',
    category: 'planning',
    description: 'Develops plans for multiple possible future scenarios',
    features: [
      'Scenario generation',
      'Probability assessment',
      'Contingency planning',
      'Risk mitigation'
    ],
    useCases: ['strategic-planning', 'risk-management', 'business-planning', 'decision-making'],
    complexity: 'high',
    example: 'Business Planning Scenarios:\n\nScenario A (40%): Economic growth\n• Strategy: Aggressive expansion\n• Resources: High investment\n• Timeline: 18 months\n\nScenario B (35%): Economic stability\n• Strategy: Steady growth\n• Resources: Moderate investment\n• Timeline: 24 months\n\nScenario C (25%): Economic downturn\n• Strategy: Cost optimization\n• Resources: Minimal investment\n• Timeline: Conservative approach'
  },
  {
    id: 'map-reduce',
    name: 'Map-Reduce',
    abbr: '',
    icon: '🗺️',
    color: 'from-yellow-500 to-orange-500',
    category: 'parallelization',
    description: 'Distributes computation across multiple nodes using map and reduce operations',
    features: [
      'Parallel data processing',
      'Fault-tolerant execution',
      'Scalable architecture',
      'Result aggregation'
    ],
    useCases: ['big-data-processing', 'distributed-computing', 'batch-processing', 'analytics'],
    complexity: 'high',
    example: 'Task: Count word frequency in large document corpus\n\nMap Phase:\n• Node A: Process docs 1-1000 → word counts\n• Node B: Process docs 1001-2000 → word counts\n• Node C: Process docs 2001-3000 → word counts\n\nReduce Phase:\n• Aggregate all word counts\n• Output: Final word frequency distribution'
  },
  {
    id: 'scatter-gather',
    name: 'Scatter-Gather',
    abbr: '',
    icon: '📡',
    color: 'from-orange-500 to-red-500',
    category: 'parallelization',
    description: 'Distributes requests to multiple services and collects responses',
    features: [
      'Request distribution',
      'Response aggregation',
      'Timeout management',
      'Partial result handling'
    ],
    useCases: ['microservices', 'api-orchestration', 'data-federation', 'search-engines'],
    complexity: 'medium',
    example: 'Product Search Request:\n\nScatter:\n• Send query to Inventory Service\n• Send query to Pricing Service\n• Send query to Review Service\n• Send query to Recommendation Service\n\nGather:\n• Collect all responses (timeout: 500ms)\n• Merge product data with prices and reviews\n• Return comprehensive product information'
  },
  {
    id: 'fork-join',
    name: 'Fork-Join',  
    abbr: '',
    icon: '🍴',
    color: 'from-red-500 to-pink-500',
    category: 'parallelization',
    description: 'Forks tasks into parallel subtasks and joins results when complete',
    features: [
      'Task decomposition',
      'Parallel execution',
      'Synchronization points',
      'Result combination'
    ],
    useCases: ['recursive-algorithms', 'divide-conquer', 'parallel-processing', 'optimization'],
    complexity: 'high',
    example: 'Parallel Merge Sort:\n\nFork:\n• Split array [8,3,5,1,7,6,2,4] into halves\n• Left: [8,3,5,1] → Fork again\n• Right: [7,6,2,4] → Fork again\n• Continue until single elements\n\nJoin:\n• Merge sorted subarrays\n• [3,8] + [1,5] → [1,3,5,8]\n• [2,7] + [4,6] → [2,4,6,7]\n• Final: [1,2,3,4,5,6,7,8]'
  },
  {
    id: 'async-await',
    name: 'Async-Await',
    abbr: '',
    icon: '⏳',
    color: 'from-pink-500 to-purple-500',
    category: 'parallelization',
    description: 'Non-blocking asynchronous execution with promise-based coordination',
    features: [
      'Non-blocking operations',
      'Promise-based coordination',
      'Error handling',
      'Resource efficiency'
    ],
    useCases: ['web-services', 'io-operations', 'concurrent-requests', 'responsive-ui'],
    complexity: 'medium',
    example: 'Concurrent API Calls:\n\n```javascript\nasync function fetchUserData(userId) {\n  const [profile, orders, preferences] = await Promise.all([\n    fetchProfile(userId),\n    fetchOrders(userId),\n    fetchPreferences(userId)\n  ]);\n  \n  return { profile, orders, preferences };\n}\n```\n\nAll three requests execute concurrently, reducing total time'
  }
];