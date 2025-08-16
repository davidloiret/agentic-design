import { Technique } from './types';

export const goalSettingMonitoringTechniques: Technique[] = [
  {
    id: 'adaptive-complexity-scaling',
    name: 'Adaptive Complexity Scaling',
    abbr: 'ACS',
    icon: '📈',
    color: 'from-indigo-500 to-purple-600',
    category: 'goal-setting-monitoring',
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
    color: 'from-purple-500 to-pink-600',
    category: 'goal-setting-monitoring',
    description: 'Automatically adjusts reasoning depth based on problem complexity and confidence thresholds',
    features: [
      'Confidence-based stopping',
      'Progressive depth increase',
      'Quality threshold monitoring',
      'Computational budget management',
      'Uncertainty quantification',
      'Meta-cognitive awareness'
    ],
    useCases: ['decision-making', 'problem-solving', 'resource-optimization', 'quality-control'],
    complexity: 'high',
    example: 'Medical Diagnosis Depth Control:\n\nInitial Assessment (Depth 1):\n• Symptoms: Chest pain, shortness of breath\n• Quick diagnosis: Possible heart attack (60% confidence)\n• Decision: Confidence too low, continue deeper\n\nIntermediate Analysis (Depth 2):\n• Additional data: Age 35, active lifestyle, no history\n• Refined diagnosis: Anxiety attack (75% confidence)\n• Decision: Above threshold but life-critical, go deeper\n\nDeep Analysis (Depth 3):\n• Comprehensive evaluation: ECG normal, stress factors\n• Final diagnosis: Panic disorder (92% confidence)\n• Decision: Confidence sufficient, stop here\n\nAdaptive Control:\n• Life-critical cases: Higher confidence thresholds\n• Routine cases: Standard thresholds\n• Resource constraints: Lower depth limits\n• Emergency situations: Time-bounded analysis\n\nResults:\n• Diagnostic accuracy: 96% with optimal resource use\n• Average reasoning time: 40% reduction\n• Critical case handling: 100% meet depth requirements\n• Resource efficiency: 65% improvement'
  },
  {
    id: 'meta-reasoning-orchestration',
    name: 'Meta-Reasoning Orchestration',
    abbr: 'MRO',
    icon: '🧠',
    color: 'from-pink-500 to-red-600',
    category: 'goal-setting-monitoring',
    description: 'Higher-level reasoning about reasoning processes, optimizing cognitive strategies dynamically',
    features: [
      'Strategy selection',
      'Process monitoring',
      'Performance evaluation',
      'Adaptive method switching',
      'Cognitive load balancing',
      'Learning from experience'
    ],
    useCases: ['complex-problem-solving', 'multi-strategy-systems', 'adaptive-learning'],
    complexity: 'high',
    example: 'Multi-Strategy Problem Solver:\n\nProblem: "Design optimal delivery routes for 1000+ packages"\n\nMeta-Reasoning Process:\n\n1. Strategy Assessment:\n   • Available methods: Genetic Algorithm, Simulated Annealing, ML-based\n   • Problem characteristics: Large scale, time-critical, dynamic constraints\n   • Resource constraints: 2-hour time limit, 8 CPU cores\n   • Historical performance: GA best for similar problems\n\n2. Initial Strategy Selection:\n   • Primary: Genetic Algorithm (85% success rate)\n   • Backup: Simulated Annealing (75% success rate)\n   • Hybrid: ML-based initialization + GA refinement\n   • Monitoring: Track solution quality every 15 minutes\n\n3. Real-time Strategy Monitoring:\n   • 30 minutes: GA showing slow convergence\n   • Meta-decision: Switch to hybrid approach\n   • Action: Use ML to seed GA with better initial population\n   • Result: 40% improvement in convergence rate\n\n4. Adaptive Strategy Switching:\n   • 90 minutes: Quality plateau detected\n   • Meta-analysis: Exploration vs exploitation balance\n   • Action: Increase mutation rate, add random restarts\n   • Result: Breakthrough to better solution space\n\n5. Performance Evaluation:\n   • Final solution: 23% better than baseline\n   • Time used: 1.8 hours (within budget)\n   • Strategy effectiveness: Hybrid > Pure GA > SA\n   • Learning: Update strategy preferences\n\nMeta-Cognitive Monitoring:\n• "Am I using the right approach?"\n• "Is progress sufficient for the time remaining?"\n• "Should I try a different strategy?"\n• "What can I learn for similar future problems?"\n\nAdaptive Learning:\n• Strategy success patterns stored\n• Problem-strategy mappings refined\n• Resource usage optimized\n• Failure modes documented\n\nResults:\n• Solution quality: +35% vs single-strategy\n• Resource efficiency: +50% vs brute force\n• Success rate: 94% vs 67% baseline\n• Learning improvement: Each problem improves future performance'
  },
  {
    id: 'hierarchical-planning',
    name: 'Hierarchical Goal Planning',
    abbr: 'HGP',
    icon: '🏗️',
    color: 'from-red-500 to-orange-600',
    category: 'goal-setting-monitoring',
    description: 'Multi-level planning that breaks complex goals into manageable hierarchical sub-goals with dependencies',
    features: [
      'Goal decomposition',
      'Dependency tracking',
      'Multi-level abstraction',
      'Priority propagation',
      'Progress aggregation',
      'Dynamic re-planning'
    ],
    useCases: ['project-management', 'strategic-planning', 'task-automation', 'workflow-design'],
    complexity: 'high',
    example: 'Software Development Project Planning:\n\nTop-Level Goal: "Launch e-commerce platform in 6 months"\n\nLevel 1 (Strategic Goals):\n1. Complete frontend development (Month 1-3)\n2. Build backend infrastructure (Month 1-4)\n3. Implement payment systems (Month 2-4)\n4. Conduct testing and QA (Month 4-5)\n5. Deploy and launch (Month 5-6)\n\nLevel 2 (Tactical Goals):\nFrontend Development:\n• Design user interface (2 weeks)\n• Implement product catalog (3 weeks)\n• Build shopping cart (2 weeks)\n• Create user authentication (2 weeks)\n• Optimize for mobile (1 week)\n\nLevel 3 (Operational Tasks):\nUser Interface Design:\n• Create wireframes (3 days)\n• Design mockups (4 days)\n• User testing (2 days)\n• Iterate based on feedback (1 day)\n\nDependency Management:\n• UI Design → Frontend Implementation\n• Backend API → Frontend Integration\n• Payment Gateway → Checkout Flow\n• All Components → Testing Phase\n\nProgress Monitoring:\n\nWeek 4 Status:\n• Level 1: Frontend 40% complete (on track)\n• Level 2: UI Design 100%, Product Catalog 60%\n• Level 3: 23 of 35 tasks completed\n• Issues: Payment integration delayed 1 week\n\nDynamic Re-planning:\n• Issue detected: Payment API changes\n• Impact analysis: Affects checkout flow\n• Mitigation: Parallel development of alternative\n• Timeline adjustment: +1 week buffer added\n• Resource reallocation: 2 devs to payment team\n\nHierarchical Benefits:\n1. Clear Progress Tracking:\n   • Executive view: Strategic milestones\n   • Manager view: Tactical progress\n   • Developer view: Daily tasks\n\n2. Risk Management:\n   • Early issue detection at task level\n   • Impact propagation analysis\n   • Mitigation at appropriate level\n\n3. Resource Optimization:\n   • Load balancing across teams\n   • Critical path identification\n   • Parallel work maximization\n\nResults:\n• Project delivery: On time despite setbacks\n• Team coordination: 85% improvement\n• Stakeholder satisfaction: 9.2/10\n• Resource utilization: 94% efficiency'
  },
  {
    id: 'constraint-satisfaction',
    name: 'Constraint Satisfaction Planning',
    abbr: 'CSP',
    icon: '⚖️',
    color: 'from-yellow-500 to-green-600',
    category: 'goal-setting-monitoring',
    description: 'Planning approach that simultaneously satisfies multiple constraints while optimizing objectives',
    features: [
      'Multi-constraint optimization',
      'Feasibility checking',
      'Conflict resolution',
      'Trade-off analysis',
      'Solution space exploration',
      'Constraint propagation'
    ],
    useCases: ['scheduling', 'resource-allocation', 'configuration-management', 'logistics'],
    complexity: 'high',
    example: 'Conference Scheduling System:\n\nConstraints and Variables:\n\nHard Constraints (Must be satisfied):\n• Speakers can\'t be in multiple places simultaneously\n• Room capacity must exceed expected attendance\n• Equipment requirements must be met\n• Keynote speakers get prime time slots\n• No speaker conflicts with their own sessions\n\nSoft Constraints (Optimize when possible):\n• Popular sessions avoid time conflicts\n• Related topics scheduled in sequence\n• Speaker preferences for time slots\n• Minimize room changes for attendees\n• Balance session distribution across days\n\nVariables:\n• 45 sessions to schedule\n• 8 rooms with different capacities\n• 3 days, 6 time slots per day\n• 32 speakers with availability constraints\n• 12 equipment setups (projectors, microphones, etc.)\n\nConstraint Satisfaction Process:\n\n1. Domain Reduction:\n   • Filter impossible assignments\n   • Room 1 (500 capacity): Only keynotes and popular sessions\n   • Room 8 (50 capacity): Only workshops and small groups\n   • Morning slots: Prefer high-energy content\n\n2. Constraint Propagation:\n   • Keynote assigned to Room 1, Day 2, 9 AM\n   • Propagation: No other sessions in Room 1 at 9 AM\n   • Chain reaction: Related sessions shift to 10 AM\n   • Equipment: Main projector reserved for Room 1\n\n3. Backtracking Search:\n   • Attempt: AI session in Room 3, Day 1, 2 PM\n   • Conflict: Speaker also presenting at 3 PM same day\n   • Backtrack: Try different time slot\n   • Success: Move to Day 2, 2 PM\n\n4. Optimization Phase:\n   • All hard constraints satisfied\n   • Optimize soft constraints:\n     - Minimize attendee conflicts: 89% success\n     - Honor speaker preferences: 76% satisfied\n     - Sequence related topics: 94% achieved\n\nConstraint Satisfaction Results:\n\nFeasibility Analysis:\n• Initial problem: 45 sessions, 48 available slots\n• Constraint violations: 23 hard, 67 soft\n• Iterative refinement: 12 rounds of optimization\n• Final solution: 0 hard violations, 8 soft violations\n\nPerformance Metrics:\n• Schedule generation time: 3.2 seconds\n• Attendee satisfaction: 4.6/5.0\n• Speaker satisfaction: 4.3/5.0\n• Room utilization: 94% efficiency\n\nConflict Resolution Examples:\n• Speaker double-booking: Automatic rescheduling\n• Popular session conflicts: Load balancing\n• Equipment shortage: Alternative room assignment\n• Last-minute changes: Real-time re-optimization\n\nAdaptive Capabilities:\n• New constraint addition: Real-time integration\n• Preference learning: Improve future schedules\n• Conflict patterns: Predictive avoidance\n• Performance tuning: Algorithm selection\n\nBusiness Impact:\n• Scheduling time: 95% reduction (8 hours → 24 minutes)\n• Attendee conflicts: 78% reduction\n• Organizer satisfaction: "Game-changing efficiency"\n• Revenue impact: Better sessions → higher ratings → more registrations'
  },
  {
    id: 'scenario-planning',
    name: 'Scenario-Based Planning',
    abbr: 'SBP',
    icon: '🎭',
    color: 'from-green-500 to-blue-600',
    category: 'goal-setting-monitoring',
    description: 'Multi-scenario planning that prepares for different possible futures and uncertain conditions',
    features: [
      'Multiple scenario modeling',
      'Uncertainty quantification',
      'Robust strategy development',
      'Contingency planning',
      'Risk assessment',
      'Adaptive decision-making'
    ],
    useCases: ['strategic-planning', 'risk-management', 'business-continuity', 'investment-planning'],
    complexity: 'high',
    example: 'AI Startup Business Planning:\n\nScenario Framework:\n\n1. Optimistic Scenario (30% probability):\n   • Market adoption: Rapid (18 months to profitability)\n   • Competition: Limited, first-mover advantage\n   • Funding: Series A $5M, Series B $20M\n   • Team growth: 50 employees by year 2\n   • Revenue: $10M ARR by year 3\n\n2. Realistic Scenario (50% probability):\n   • Market adoption: Moderate (30 months to profitability)\n   • Competition: 3-4 major competitors emerge\n   • Funding: Series A $3M, Series B $12M\n   • Team growth: 25 employees by year 2\n   • Revenue: $5M ARR by year 3\n\n3. Pessimistic Scenario (20% probability):\n   • Market adoption: Slow (48+ months to profitability)\n   • Competition: Saturated market, big tech entry\n   • Funding: Difficulty raising Series B\n   • Team growth: 15 employees maximum\n   • Revenue: $2M ARR by year 3\n\nScenario-Robust Planning:\n\nCore Strategy (Works in all scenarios):\n• Focus on product-market fit\n• Build strong technical moat\n• Maintain low burn rate\n• Develop key partnerships\n• Build adaptable team culture\n\nScenario-Specific Strategies:\n\nOptimistic Path:\n• Aggressive hiring and expansion\n• Multiple product lines\n• Geographic expansion\n• Premium pricing strategy\n• IPO preparation by year 4\n\nRealistic Path:\n• Measured growth and hiring\n• Focus on core product\n• Strategic partnerships\n• Competitive pricing\n• Acquisition opportunities\n\nPessimistic Path:\n• Minimal hiring, efficiency focus\n• Pivot to niche markets\n• Bootstrap growth\n• Value pricing strategy\n• Consider strategic sale\n\nContingency Triggers:\n\n6-Month Checkpoints:\n• Revenue milestone: $100K ARR\n• If missed: Shift toward pessimistic planning\n• If exceeded: Move toward optimistic planning\n• Customer count: 50 paying customers\n• Team size: 8 full-time employees\n\n12-Month Evaluation:\n• Scenario probability updates based on reality\n• Strategy adjustment: 15% toward pessimistic\n• Reason: Competition increased faster than expected\n• Action: Focus more on differentiation\n\nRisk Mitigation:\n\nCross-Scenario Risks:\n• Key person dependency: Document processes\n• Technology obsolescence: R&D investment\n• Market saturation: Diversification planning\n• Funding gaps: Revenue acceleration focus\n\nScenario-Specific Mitigations:\n• Optimistic: Don\'t over-hire too quickly\n• Realistic: Maintain competitive differentiation\n• Pessimistic: Preserve cash, extend runway\n\nAdaptive Decision Framework:\n\nMonthly Reviews:\n• Which scenario are we trending toward?\n• What new information changes probabilities?\n• Should we adjust our current strategy?\n• Are contingency triggers being approached?\n\nStrategic Flexibility:\n• Hiring: Contractors vs full-time based on scenario\n• Product: Core features vs nice-to-have features\n• Marketing: Broad vs focused based on competition\n• Funding: Timing and amount based on trajectory\n\nResults After 18 Months:\n• Actual scenario: Between realistic and optimistic\n• Revenue: $750K ARR (above realistic projection)\n• Team: 18 employees (planned for this scenario)\n• Funding: Successfully raised $4M Series A\n• Strategic decisions: 87% aligned with scenario planning\n• Avoided risks: 5 major pitfalls anticipated and mitigated'
  }
];