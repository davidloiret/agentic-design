import { Technique } from './types';

export const planningExecutionTechniques: Technique[] = [
  {
    id: 'adaptive-complexity-scaling',
    name: 'Adaptive Complexity Scaling',
    abbr: 'ACS',
    icon: '📈',
    color: 'from-indigo-600 to-purple-700',
    category: 'planning-execution',
    description: 'Dynamically adjusts planning complexity based on task difficulty and available resources',
    features: [
      'Real-time complexity assessment',
      'Resource-aware planning depth',
      'Dynamic algorithm selection',
      'Performance-based optimization',
      'Energy-efficient processing',
      'Quality-speed trade-offs'
    ],
    useCases: ['real-time-systems', 'resource-constrained-devices', 'adaptive-ai', 'edge-computing'],
    complexity: 'high',
    example: 'Adaptive Planning System:\n\nSimple Task: "Schedule a meeting"\n→ Complexity Score: 2/10\n→ Planning Depth: Basic (1-2 steps)\n→ Resources: Minimal CPU, 50ms\n→ Algorithm: Simple constraint matching\n\nComplex Task: "Optimize supply chain network"\n→ Complexity Score: 9/10\n→ Planning Depth: Deep (15+ steps)\n→ Resources: High CPU, distributed processing\n→ Algorithm: Advanced optimization with simulation\n\nAdaptive Benefits:\n• 80% reduction in unnecessary computation\n• Maintains quality while reducing latency\n• Scales from mobile devices to data centers\n• Self-optimizes based on performance feedback\n\nReal-world Impact:\n• Simple queries: 10x faster response\n• Complex queries: Better solutions through deeper analysis\n• Resource usage: Optimal allocation per task complexity'
  },
  {
    id: 'self-regulating-depth-control',
    name: 'Self-Regulating Depth Control',
    abbr: 'SRDC',
    icon: '🎛️',
    color: 'from-cyan-600 to-blue-700',
    category: 'planning-execution',
    description: 'AI systems that automatically determine optimal reasoning depth without human intervention',
    features: [
      'Autonomous depth determination',
      'Confidence-based stopping criteria',
      'Quality threshold monitoring',
      'Cost-benefit analysis',
      'Uncertainty-driven iteration',
      'Self-calibrating parameters'
    ],
    useCases: ['autonomous-systems', 'real-time-decision-making', 'resource-optimization', 'adaptive-ai'],
    complexity: 'high',
    example: 'Autonomous Financial Trading Agent:\n\nMarket Analysis Request: "Should I buy TSLA?"\n\nSelf-Regulation Process:\n1. Initial Analysis (Depth 1):\n   • Basic price trends: Confidence 60%\n   • Threshold not met, continue deeper\n\n2. Extended Analysis (Depth 2):\n   • Technical indicators: Confidence 75%\n   • Market sentiment: Confidence 70%\n   • Combined confidence: 72%, still below 85% threshold\n\n3. Deep Analysis (Depth 3):\n   • Fundamental analysis: Confidence 80%\n   • Competitor comparison: Confidence 85%\n   • Regulatory factors: Confidence 88%\n   • Combined confidence: 87% > 85% threshold\n   → STOP, sufficient confidence achieved\n\nFinal Decision: "BUY - High confidence recommendation"\nResources Used: 3 analysis cycles (optimal trade-off)\nTime Taken: 2.3 seconds vs potential 10+ seconds for max depth\n\nSelf-Learning:\n• Track decision outcomes vs depth used\n• Adjust confidence thresholds based on accuracy\n• Optimize for better depth predictions'
  },
  {
    id: 'meta-reasoning-orchestration',
    name: 'Meta-Reasoning Orchestration',
    abbr: 'MRO',
    icon: '🧠',
    color: 'from-purple-600 to-pink-700',
    category: 'planning-execution',
    description: 'Higher-order reasoning that manages and optimizes lower-level reasoning processes',
    features: [
      'Reasoning strategy selection',
      'Multi-level reasoning coordination',
      'Strategy performance monitoring',
      'Dynamic strategy switching',
      'Reasoning resource allocation',
      'Cross-domain strategy transfer'
    ],
    useCases: ['complex-problem-solving', 'multi-domain-reasoning', 'adaptive-intelligence', 'cognitive-architectures'],
    complexity: 'high',
    example: 'Multi-Domain Problem: "Design a sustainable smart city"\n\nMeta-Reasoning Orchestration:\n\n1. Problem Analysis (Meta-Level):\n   • Identifies sub-domains: Urban planning, Energy, Transport, Economics\n   • Selects reasoning strategies per domain:\n     - Urban planning: Hierarchical planning\n     - Energy: Constraint satisfaction\n     - Transport: Graph optimization\n     - Economics: Scenario planning\n\n2. Strategy Coordination:\n   • Parallel reasoning in each domain\n   • Cross-domain constraint sharing\n   • Conflict resolution between domains\n   • Resource allocation: 40% energy, 30% transport, 20% urban, 10% economics\n\n3. Dynamic Adaptation:\n   • Energy analysis shows renewable constraints\n   • Meta-reasoner increases energy allocation to 50%\n   • Switches transport strategy to electric-focused optimization\n   • Updates economic projections based on energy costs\n\n4. Synthesis:\n   • Integrates domain-specific solutions\n   • Resolves cross-domain conflicts\n   • Produces coherent integrated plan\n\nMeta-Reasoning Benefits:\n• Optimal strategy selection per problem type\n• Dynamic reallocation based on progress\n• Cross-domain knowledge transfer\n• 3x improvement in complex problem solving'
  },
  {
    id: 'hierarchical-planning',
    name: 'Hierarchical Planning',
    abbr: 'HTN',
    icon: '🏗️',
    color: 'from-blue-600 to-purple-600',
    category: 'planning-execution',
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
    category: 'planning-execution',
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
    category: 'planning-execution',
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
    category: 'planning-execution',
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
  }
];