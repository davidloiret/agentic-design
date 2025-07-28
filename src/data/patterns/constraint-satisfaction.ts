import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const constraintSatisfactionPattern: PatternScenario = {
  id: 'constraint-satisfaction',
  title: 'Constraint Satisfaction Pattern',
  description: 'Demonstrates systematic solution finding within specified constraints and limitations for agentic AI systems',
  initialNodes: [
    // Problem input
    {
      id: 'problem-input',
      type: 'default',
      position: { x: 500, y: 50 },
      data: { label: 'Problem Input\n"Deploy 5 AI agents across 3 servers\nwith resource and compliance constraints"' },
      style: { ...nodeStyle, minWidth: 280, background: '#dc2626', fontSize: '14px' }
    },

    // Constraint analyzer
    {
      id: 'constraint-analyzer',
      type: 'default',
      position: { x: 500, y: 180 },
      data: { label: 'Constraint Analyzer\nIdentify all constraints and requirements' },
      style: { ...nodeStyle, minWidth: 220, background: '#059669' }
    },

    // Hard constraints
    {
      id: 'hard-constraints',
      type: 'default',
      position: { x: 200, y: 320 },
      data: { label: 'Hard Constraints\n• Server A: 8GB RAM max\n• Server B: 4GB RAM max\n• Server C: 12GB RAM max\n• Agent dependencies: A1→A2\n• Compliance: GDPR zones' },
      style: { ...nodeStyle, minWidth: 180, background: '#dc2626', fontSize: '11px' }
    },

    // Soft constraints
    {
      id: 'soft-constraints',
      type: 'default',
      position: { x: 500, y: 320 },
      data: { label: 'Soft Constraints\n• Preferred latency < 100ms\n• Load balancing desired\n• Cost optimization\n• Redundancy preferred' },
      style: { ...nodeStyle, minWidth: 180, background: '#f59e0b', fontSize: '11px' }
    },

    // Optimization criteria
    {
      id: 'optimization-criteria',
      type: 'default',
      position: { x: 800, y: 320 },
      data: { label: 'Optimization Criteria\n• Minimize total cost\n• Maximize performance\n• Ensure fault tolerance\n• Meet SLA requirements' },
      style: { ...nodeStyle, minWidth: 180, background: '#3b82f6', fontSize: '11px' }
    },

    // Domain modeling
    {
      id: 'domain-modeling',
      type: 'default',
      position: { x: 500, y: 460 },
      data: { label: 'Domain Modeling\nCreate formal constraint model' },
      style: { ...nodeStyle, minWidth: 200, background: '#8b5cf6' }
    },

    // Variables definition
    {
      id: 'variables',
      type: 'default',
      position: { x: 200, y: 600 },
      data: { label: 'Variables\n• Agent assignments: X[i,j]\n• Resource allocation: R[i]\n• Timing: T[i]\n• Configuration: C[i]' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981', fontSize: '11px' }
    },

    // Constraint network
    {
      id: 'constraint-network',
      type: 'default',
      position: { x: 500, y: 600 },
      data: { label: 'Constraint Network\nBuild relationships between variables' },
      style: { ...nodeStyle, minWidth: 180, background: '#10b981', fontSize: '11px' }
    },

    // Domain restrictions
    {
      id: 'domain-restrictions',
      type: 'default',
      position: { x: 800, y: 600 },
      data: { label: 'Domain Restrictions\n• Agent types: [ML, NLP, CV]\n• Server regions: [US, EU, ASIA]\n• Resource tiers: [S, M, L, XL]' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981', fontSize: '11px' }
    },

    // Solution engine
    {
      id: 'solution-engine',
      type: 'default',
      position: { x: 500, y: 740 },
      data: { label: 'CSP Solution Engine\nApply constraint solving algorithms' },
      style: { ...nodeStyle, minWidth: 220, background: '#7c3aed' }
    },

    // Backtracking search
    {
      id: 'backtracking-search',
      type: 'default',
      position: { x: 150, y: 880 },
      data: { label: 'Backtracking Search\nSystematic variable assignment' },
      style: { ...nodeStyle, minWidth: 160, background: '#059669', fontSize: '11px' }
    },

    // Arc consistency
    {
      id: 'arc-consistency',
      type: 'default',
      position: { x: 350, y: 880 },
      data: { label: 'Arc Consistency\nPreprocess constraints' },
      style: { ...nodeStyle, minWidth: 140, background: '#059669', fontSize: '11px' }
    },

    // Forward checking
    {
      id: 'forward-checking',
      type: 'default',
      position: { x: 550, y: 880 },
      data: { label: 'Forward Checking\nPropagate constraints early' },
      style: { ...nodeStyle, minWidth: 140, background: '#059669', fontSize: '11px' }
    },

    // Heuristics
    {
      id: 'heuristics',
      type: 'default',
      position: { x: 750, y: 880 },
      data: { label: 'Heuristics\n• MRV: Most constraining\n• LCV: Least constraining\n• Degree heuristic' },
      style: { ...nodeStyle, minWidth: 140, background: '#059669', fontSize: '11px' }
    },

    // Local search
    {
      id: 'local-search',
      type: 'default',
      position: { x: 950, y: 880 },
      data: { label: 'Local Search\nMin-conflicts optimization' },
      style: { ...nodeStyle, minWidth: 140, background: '#059669', fontSize: '11px' }
    },

    // Solution validation
    {
      id: 'solution-validation',
      type: 'default',
      position: { x: 500, y: 1020 },
      data: { label: 'Solution Validation\nVerify all constraints satisfied' },
      style: { ...nodeStyle, minWidth: 200, background: '#f59e0b' }
    },

    // Hard constraint check
    {
      id: 'hard-constraint-check',
      type: 'default',
      position: { x: 250, y: 1160 },
      data: { label: 'Hard Constraint Check\nAll mandatory constraints met' },
      style: { ...nodeStyle, minWidth: 180, background: '#dc2626', fontSize: '11px' }
    },

    // Soft constraint evaluation
    {
      id: 'soft-constraint-eval',
      type: 'default',
      position: { x: 500, y: 1160 },
      data: { label: 'Soft Constraint Evaluation\nScore preference satisfaction' },
      style: { ...nodeStyle, minWidth: 180, background: '#f59e0b', fontSize: '11px' }
    },

    // Optimization score
    {
      id: 'optimization-score',
      type: 'default',
      position: { x: 750, y: 1160 },
      data: { label: 'Optimization Score\nCalculate objective function value' },
      style: { ...nodeStyle, minWidth: 180, background: '#3b82f6', fontSize: '11px' }
    },

    // Solution refinement
    {
      id: 'solution-refinement',
      type: 'default',
      position: { x: 500, y: 1300 },
      data: { label: 'Solution Refinement\nOptimize based on preferences' },
      style: { ...nodeStyle, minWidth: 200, background: '#8b5cf6' }
    },

    // Trade-off analysis
    {
      id: 'tradeoff-analysis',
      type: 'default',
      position: { x: 200, y: 1440 },
      data: { label: 'Trade-off Analysis\n• Cost vs Performance\n• Reliability vs Speed\n• Compliance vs Efficiency' },
      style: { ...nodeStyle, minWidth: 160, background: '#7c3aed', fontSize: '11px' }
    },

    // Multi-objective optimization
    {
      id: 'multi-objective',
      type: 'default',
      position: { x: 500, y: 1440 },
      data: { label: 'Multi-objective Optimization\nBalance competing objectives' },
      style: { ...nodeStyle, minWidth: 180, background: '#7c3aed', fontSize: '11px' }
    },

    // Pareto optimization
    {
      id: 'pareto-optimization',
      type: 'default',
      position: { x: 800, y: 1440 },
      data: { label: 'Pareto Optimization\nFind non-dominated solutions' },
      style: { ...nodeStyle, minWidth: 160, background: '#7c3aed', fontSize: '11px' }
    },

    // Final solution
    {
      id: 'final-solution',
      type: 'default',
      position: { x: 500, y: 1580 },
      data: { label: 'Final Solution\nOptimal agent deployment configuration' },
      style: { ...nodeStyle, minWidth: 240, background: '#059669' }
    },

    // Deployment plan
    {
      id: 'deployment-plan',
      type: 'default',
      position: { x: 200, y: 1720 },
      data: { label: 'Deployment Plan\n• Agent A1: Server A (4GB)\n• Agent A2: Server A (3GB)\n• Agent A3: Server B (4GB)\n• Agent A4: Server C (6GB)\n• Agent A5: Server C (5GB)' },
      style: { ...nodeStyle, minWidth: 180, background: '#10b981', fontSize: '10px' }
    },

    // Resource allocation
    {
      id: 'resource-allocation',
      type: 'default',
      position: { x: 500, y: 1720 },
      data: { label: 'Resource Allocation\n• Total RAM: 22GB used/24GB\n• CPU utilization: 75%\n• Network bandwidth: optimal\n• Cost: $847/month' },
      style: { ...nodeStyle, minWidth: 180, background: '#10b981', fontSize: '10px' }
    },

    // Compliance verification
    {
      id: 'compliance-verification',
      type: 'default',
      position: { x: 800, y: 1720 },
      data: { label: 'Compliance Verification\n• GDPR: EU agents in EU servers ✓\n• Data residency: compliant ✓\n• Security zones: validated ✓' },
      style: { ...nodeStyle, minWidth: 180, background: '#10b981', fontSize: '10px' }
    },

    // Monitoring setup
    {
      id: 'monitoring-setup',
      type: 'default',
      position: { x: 500, y: 1860 },
      data: { label: 'Monitoring & Adaptation\nContinuous constraint satisfaction' },
      style: { ...nodeStyle, minWidth: 220, background: '#6366f1' }
    }
  ],
  initialEdges: [
    // Main flow
    { id: 'e1', source: 'problem-input', target: 'constraint-analyzer', style: edgeStyle },
    { id: 'e2', source: 'constraint-analyzer', target: 'hard-constraints', style: edgeStyle },
    { id: 'e3', source: 'constraint-analyzer', target: 'soft-constraints', style: edgeStyle },
    { id: 'e4', source: 'constraint-analyzer', target: 'optimization-criteria', style: edgeStyle },
    
    // Domain modeling
    { id: 'e5', source: 'hard-constraints', target: 'domain-modeling', style: edgeStyle },
    { id: 'e6', source: 'soft-constraints', target: 'domain-modeling', style: edgeStyle },
    { id: 'e7', source: 'optimization-criteria', target: 'domain-modeling', style: edgeStyle },
    
    // Variables and constraints
    { id: 'e8', source: 'domain-modeling', target: 'variables', style: edgeStyle },
    { id: 'e9', source: 'domain-modeling', target: 'constraint-network', style: edgeStyle },
    { id: 'e10', source: 'domain-modeling', target: 'domain-restrictions', style: edgeStyle },
    
    // Solution engine
    { id: 'e11', source: 'variables', target: 'solution-engine', style: edgeStyle },
    { id: 'e12', source: 'constraint-network', target: 'solution-engine', style: edgeStyle },
    { id: 'e13', source: 'domain-restrictions', target: 'solution-engine', style: edgeStyle },
    
    // Solving algorithms
    { id: 'e14', source: 'solution-engine', target: 'backtracking-search', style: edgeStyle },
    { id: 'e15', source: 'solution-engine', target: 'arc-consistency', style: edgeStyle },
    { id: 'e16', source: 'solution-engine', target: 'forward-checking', style: edgeStyle },
    { id: 'e17', source: 'solution-engine', target: 'heuristics', style: edgeStyle },
    { id: 'e18', source: 'solution-engine', target: 'local-search', style: edgeStyle },
    
    // Validation flow
    { id: 'e19', source: 'backtracking-search', target: 'solution-validation', style: edgeStyle },
    { id: 'e20', source: 'arc-consistency', target: 'solution-validation', style: edgeStyle },
    { id: 'e21', source: 'forward-checking', target: 'solution-validation', style: edgeStyle },
    { id: 'e22', source: 'heuristics', target: 'solution-validation', style: edgeStyle },
    { id: 'e23', source: 'local-search', target: 'solution-validation', style: edgeStyle },
    
    // Validation components
    { id: 'e24', source: 'solution-validation', target: 'hard-constraint-check', style: edgeStyle },
    { id: 'e25', source: 'solution-validation', target: 'soft-constraint-eval', style: edgeStyle },
    { id: 'e26', source: 'solution-validation', target: 'optimization-score', style: edgeStyle },
    
    // Refinement
    { id: 'e27', source: 'hard-constraint-check', target: 'solution-refinement', style: edgeStyle },
    { id: 'e28', source: 'soft-constraint-eval', target: 'solution-refinement', style: edgeStyle },
    { id: 'e29', source: 'optimization-score', target: 'solution-refinement', style: edgeStyle },
    
    // Optimization
    { id: 'e30', source: 'solution-refinement', target: 'tradeoff-analysis', style: edgeStyle },
    { id: 'e31', source: 'solution-refinement', target: 'multi-objective', style: edgeStyle },
    { id: 'e32', source: 'solution-refinement', target: 'pareto-optimization', style: edgeStyle },
    
    // Final solution
    { id: 'e33', source: 'tradeoff-analysis', target: 'final-solution', style: edgeStyle },
    { id: 'e34', source: 'multi-objective', target: 'final-solution', style: edgeStyle },
    { id: 'e35', source: 'pareto-optimization', target: 'final-solution', style: edgeStyle },
    
    // Implementation
    { id: 'e36', source: 'final-solution', target: 'deployment-plan', style: edgeStyle },
    { id: 'e37', source: 'final-solution', target: 'resource-allocation', style: edgeStyle },
    { id: 'e38', source: 'final-solution', target: 'compliance-verification', style: edgeStyle },
    
    // Monitoring
    { id: 'e39', source: 'deployment-plan', target: 'monitoring-setup', style: edgeStyle },
    { id: 'e40', source: 'resource-allocation', target: 'monitoring-setup', style: edgeStyle },
    { id: 'e41', source: 'compliance-verification', target: 'monitoring-setup', style: edgeStyle }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Problem Analysis',
      description: 'Analyze the constraint satisfaction problem and identify all requirements',
      activeNodes: ['problem-input', 'constraint-analyzer'],
      explanation: 'The system receives a complex deployment problem with multiple agents, servers, and constraints that must be satisfied simultaneously.'
    },
    {
      id: 'step2',
      title: 'Constraint Identification',
      description: 'Categorize constraints into hard requirements, soft preferences, and optimization criteria',
      activeNodes: ['hard-constraints', 'soft-constraints', 'optimization-criteria'],
      explanation: 'Hard constraints are mandatory (server capacity, dependencies), soft constraints are preferences (latency, load balancing), and optimization criteria define success metrics.'
    },
    {
      id: 'step3',
      title: 'Domain Modeling',
      description: 'Create formal mathematical model of the constraint satisfaction problem',
      activeNodes: ['domain-modeling', 'variables', 'constraint-network', 'domain-restrictions'],
      explanation: 'Transform the real-world problem into a formal CSP with variables (agent assignments), domains (possible values), and constraints (relationships).'
    },
    {
      id: 'step4',
      title: 'Solution Search',
      description: 'Apply constraint solving algorithms to find valid solutions',
      activeNodes: ['solution-engine', 'backtracking-search', 'arc-consistency', 'forward-checking', 'heuristics', 'local-search'],
      explanation: 'Multiple algorithms work together: backtracking for systematic search, arc consistency for preprocessing, forward checking for early constraint propagation, and heuristics for intelligent ordering.'
    },
    {
      id: 'step5',
      title: 'Solution Validation',
      description: 'Verify that proposed solutions satisfy all constraints and evaluate quality',
      activeNodes: ['solution-validation', 'hard-constraint-check', 'soft-constraint-eval', 'optimization-score'],
      explanation: 'Each solution candidate is rigorously tested against all hard constraints (must pass), soft constraints (scored), and optimization objectives (measured).'
    },
    {
      id: 'step6',
      title: 'Multi-objective Optimization',
      description: 'Balance competing objectives and analyze trade-offs between different solutions',
      activeNodes: ['solution-refinement', 'tradeoff-analysis', 'multi-objective', 'pareto-optimization'],
      explanation: 'When multiple valid solutions exist, the system analyzes trade-offs between cost, performance, and reliability to find the best compromise or Pareto-optimal solutions.'
    },
    {
      id: 'step7',
      title: 'Solution Implementation',
      description: 'Generate detailed deployment plan with resource allocation and compliance verification',
      activeNodes: ['final-solution', 'deployment-plan', 'resource-allocation', 'compliance-verification'],
      explanation: 'The optimal solution is translated into actionable deployment instructions with specific agent-to-server assignments, resource allocations, and compliance confirmations.'
    },
    {
      id: 'step8',
      title: 'Continuous Monitoring',
      description: 'Setup monitoring and adaptation mechanisms for dynamic constraint satisfaction',
      activeNodes: ['monitoring-setup'],
      explanation: 'The system establishes monitoring to detect constraint violations or changing conditions, enabling dynamic re-optimization when the environment changes.'
    }
  ]
};