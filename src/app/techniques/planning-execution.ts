import { Technique } from './types';

export const planningExecutionTechniques: Technique[] = [
  {
    id: 'meta-reasoning',
    name: 'Meta-Reasoning',
    abbr: 'MR',
    icon: '🧠',
    color: 'from-purple-600 to-pink-700',
    category: 'planning-execution',
    description: 'Higher-order reasoning about reasoning processes, including strategy selection and monitoring',
    features: [
      'Reasoning strategy selection',
      'Multi-level reasoning coordination',
      'Strategy performance monitoring',
      'Dynamic strategy switching',
      'Cross-domain strategy transfer',
      'Meta-cognitive monitoring'
    ],
    useCases: ['complex-problem-solving', 'multi-domain-reasoning', 'adaptive-intelligence'],
    complexity: 'high',
    example: 'Multi-Domain Problem: "Design a sustainable smart city"\n\nMeta-Reasoning Process:\n\n1. Problem Analysis (Meta-Level):\n   • Identifies sub-domains: Urban planning, Energy, Transport, Economics\n   • Selects reasoning strategies per domain:\n     - Urban planning: Hierarchical task networks\n     - Energy: Constraint satisfaction\n     - Transport: Graph optimization\n     - Economics: Probabilistic modeling\n\n2. Strategy Coordination:\n   • Parallel reasoning in each domain\n   • Cross-domain constraint sharing\n   • Conflict resolution between domains\n   • Resource allocation based on complexity\n\n3. Dynamic Adaptation:\n   • Energy analysis shows renewable constraints\n   • Meta-reasoner switches transport strategy to electric-focused\n   • Updates economic projections based on energy costs\n   • Monitors progress and adjusts strategies\n\n4. Meta-Cognitive Monitoring:\n   • "Am I using the right reasoning approach?"\n   • "Is progress sufficient for the time remaining?"\n   • "Should I try a different strategy?"\n\nMeta-Reasoning Benefits:\n• Optimal strategy selection per problem type\n• Dynamic adaptation based on progress\n• Cross-domain knowledge transfer\n• Self-awareness of reasoning processes',
    references: [
      'Establishing Meta-Decision-Making for AI: An Ontology of Relevance, Representation and Reasoning (ArXiv 2022)',
      'A meta-cognitive architecture for planning in uncertain environments (ScienceDirect 2013)',
      'Meta-Reasoning in Agents - Evidence-Based Advances in Reflective AI Systems (Computer Society)'
    ]
  },
  {
    id: 'hierarchical-task-network-planning',
    name: 'Hierarchical Task Network (HTN) Planning',
    abbr: 'HTN',
    icon: '🏗️',
    color: 'from-blue-600 to-purple-600',
    category: 'planning-execution',
    description: 'Automated planning approach that decomposes complex tasks into hierarchically structured networks of simpler tasks using domain knowledge',
    features: [
      'Hierarchical task decomposition',
      'Domain knowledge integration',
      'Multi-level task abstraction',
      'Dependency constraint management',
      'Primitive and compound task handling',
      'Method-based task refinement'
    ],
    useCases: ['autonomous-agents', 'multi-agent-systems', 'complex-workflow-automation', 'robotics-planning'],
    complexity: 'high',
    example: 'HTN Planning for Autonomous Research Agent:\n\nTop-Level Task: "Conduct Market Analysis"\n\nHTN Decomposition:\n├─ Method 1: Comprehensive Analysis\n│  ├─ Task: Gather Data Sources\n│  │  ├─ Primitive: Search Academic Papers\n│  │  ├─ Primitive: Query Market Databases\n│  │  └─ Primitive: Scrape Industry Reports\n│  ├─ Task: Process Information\n│  │  ├─ Compound: Statistical Analysis\n│  │  │  ├─ Primitive: Calculate Trends\n│  │  │  └─ Primitive: Identify Correlations\n│  │  └─ Compound: Competitive Analysis\n│  └─ Task: Generate Report\n│     ├─ Primitive: Structure Findings\n│     └─ Primitive: Create Visualizations\n\nConstraints:\n• Data gathering must complete before processing\n• Statistical analysis precedes competitive analysis\n• All analysis must finish before report generation\n\nHTN Advantages:\n• Domain expertise encoded in methods\n• Efficient search through task hierarchy\n• Reusable task decomposition patterns\n• Human-interpretable plan structure',
    references: [
      'An Overview of Hierarchical Task Network Planning (ArXiv 2014) - https://arxiv.org/abs/1403.7426',
      'HTN planning: Overview, comparison, and beyond (ScienceDirect 2015)',
      'Hierarchical Task Network Planning for Facilitating Cooperative Multi-Agent Reinforcement Learning (ArXiv 2023)'
    ]
  },
  {
    id: 'task-management-orchestration',
    name: 'Task Management & Orchestration',
    abbr: 'TMO',
    icon: '✅',
    color: 'from-green-600 to-blue-600',
    category: 'planning-execution',
    description: 'Systematic task decomposition, progress tracking, and adaptive workflow management for complex multi-step processes',
    features: [
      'Dynamic task decomposition',
      'Progress state tracking',
      'Dependency management',
      'Priority orchestration',
      'Real-time adaptation',
      'Completion validation',
      'Bottleneck detection',
      'Parallel execution coordination'
    ],
    useCases: ['project-management', 'workflow-orchestration', 'cognitive-load-management', 'progress-tracking', 'collaborative-coordination', 'quality-assurance'],
    complexity: 'medium',
    example: 'AI Model Development Project:\n\n**Task Registry Initialization:**\n```\nProject: "Customer Sentiment Model"\nTasks: [\n  {id: "data-collection", status: "completed", priority: "high"},\n  {id: "data-cleaning", status: "in_progress", depends_on: ["data-collection"]},\n  {id: "feature-engineering", status: "pending", depends_on: ["data-cleaning"]},\n  {id: "model-training", status: "pending", depends_on: ["feature-engineering"]},\n  {id: "validation", status: "pending", depends_on: ["model-training"]},\n  {id: "deployment", status: "pending", depends_on: ["validation"]}\n]\n```\n\n**Orchestration Flow:**\n1. **Dependency Resolution**: Automatically unblocks "data-cleaning" when "data-collection" completes\n2. **Progress Tracking**: Real-time visibility: 1/6 completed, 1/6 in_progress, 4/6 pending\n3. **Adaptive Prioritization**: Urgent deployment deadline → increases priority of dependent tasks\n4. **Parallel Execution**: "documentation" and "testing" tasks run parallel to main pipeline\n5. **Bottleneck Detection**: "data-cleaning" taking longer than expected → alerts and resource reallocation\n\n**Benefits:**\n• Clear progress visibility for stakeholders\n• Automatic dependency management prevents errors\n• Adaptive scheduling responds to changing requirements\n• Reduces cognitive load through systematic organization'
  },
  {
    id: 'goal-decomposition',
    name: 'Intelligent Goal Decomposition',
    abbr: 'IGD',
    icon: '🎯',
    color: 'from-orange-500 to-yellow-600',
    category: 'planning-execution',
    description: 'Systematic breakdown of complex objectives into achievable, measurable sub-goals with clear success criteria',
    features: [
      'SMART goal creation',
      'Dependency analysis',
      'Resource requirement estimation',
      'Risk assessment',
      'Success metrics definition',
      'Milestone identification'
    ],
    useCases: ['project-planning', 'personal-development', 'business-strategy', 'learning-objectives'],
    complexity: 'medium',
    example: 'AI Model Performance Improvement Goal:\n\nOriginal Goal: "Improve AI model performance"\n→ Problem: Vague, unmeasurable, no timeline\n\nIntelligent Decomposition:\n\nLevel 1 - Strategic Objective:\n"Increase model accuracy from 87% to 95% within 3 months while maintaining <200ms latency"\n\nLevel 2 - Tactical Sub-Goals:\n1. Data Quality Improvement (Month 1)\n   • Clean existing dataset\n   • Add 10,000 high-quality samples\n   • Reduce data noise by 50%\n   • Success: Dataset quality score >90%\n\n2. Model Architecture Optimization (Month 2)\n   • Experiment with 5 architecture variants\n   • Implement ensemble methods\n   • Optimize hyperparameters\n   • Success: >92% accuracy on validation set\n\n3. Training Process Enhancement (Month 2-3)\n   • Implement advanced training techniques\n   • Add regularization methods\n   • Optimize training pipeline\n   • Success: Reduce overfitting by 30%\n\n4. Performance Validation (Month 3)\n   • Comprehensive testing on unseen data\n   • Latency benchmarking\n   • A/B testing in production\n   • Success: Meet all performance criteria\n\nLevel 3 - Operational Tasks:\nData Quality Improvement:\n• Identify data quality issues (2 days)\n• Implement automated cleaning pipeline (5 days)\n• Source additional training data (7 days)\n• Validate data quality improvements (1 day)\n\nResource Requirements:\n• Human resources: 2 ML engineers, 1 data scientist\n• Computational: 4 GPU-hours/day for training\n• Data storage: 500GB additional capacity\n• Budget: $15,000 for data acquisition\n\nRisk Assessment:\n• High risk: New data may not improve performance\n• Medium risk: Architecture changes affect latency\n• Low risk: Training time exceeds estimates\n• Mitigation: Parallel experiments, rollback plans\n\nProgress Tracking:\nWeek 4 Results:\n• Data quality: 92% complete (ahead of schedule)\n• Model accuracy: 89.5% (good progress)\n• Latency: 185ms (within limits)\n• Risk status: All risks under control\n\nAdaptive Refinement:\n• Discovery: Ensemble methods show promise\n• Adjustment: Allocate more resources to ensembles\n• Timeline: Maintain 3-month deadline\n• Quality gate: 93% accuracy by end of month 2\n\nResults:\n• Final accuracy: 94.8% (close to target)\n• Latency: 178ms (exceeded target)\n• Timeline: Delivered 1 week early\n• Team satisfaction: Clear goals improved focus'
  }
];