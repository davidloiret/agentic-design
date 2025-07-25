import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const scenarioPlanningPattern: PatternScenario = {
  id: 'scenario-planning',
  title: 'Scenario Planning Pattern',
  description: 'Demonstrates strategic planning for multiple possible future scenarios in agentic AI systems design with real-world examples',
  initialNodes: [
    // Strategic context
    {
      id: 'strategic-context',
      type: 'default',
      position: { x: 500, y: 50 },
      data: { label: 'Strategic Context\n"Design autonomous vehicle AI system\nfor next 5 years with regulatory uncertainty"' },
      style: { ...nodeStyle, minWidth: 280, background: '#dc2626', fontSize: '14px' }
    },

    // Environmental scanning
    {
      id: 'environmental-scanning',
      type: 'default',
      position: { x: 500, y: 180 },
      data: { label: 'Environmental Scanning\nAnalyze external factors and trends' },
      style: { ...nodeStyle, minWidth: 220, background: '#059669' }
    },

    // Key drivers identification
    {
      id: 'key-drivers',
      type: 'default',
      position: { x: 200, y: 320 },
      data: { label: 'Key Drivers\n• Regulatory changes\n• Technology advancement\n• Market adoption\n• Safety standards\n• Competition' },
      style: { ...nodeStyle, minWidth: 160, background: '#3b82f6', fontSize: '11px' }
    },

    // Uncertainty factors
    {
      id: 'uncertainty-factors',
      type: 'default',
      position: { x: 500, y: 320 },
      data: { label: 'Uncertainty Factors\n• Government policy shifts\n• Breakthrough technologies\n• Public acceptance\n• Insurance frameworks' },
      style: { ...nodeStyle, minWidth: 160, background: '#f59e0b', fontSize: '11px' }
    },

    // Trend analysis
    {
      id: 'trend-analysis',
      type: 'default',
      position: { x: 800, y: 320 },
      data: { label: 'Trend Analysis\n• AI model improvements\n• Sensor cost reduction\n• 5G/6G deployment\n• Edge computing growth' },
      style: { ...nodeStyle, minWidth: 160, background: '#8b5cf6', fontSize: '11px' }
    },

    // Scenario generation
    {
      id: 'scenario-generation',
      type: 'default',
      position: { x: 500, y: 460 },
      data: { label: 'Scenario Generation\nCreate distinct future scenarios' },
      style: { ...nodeStyle, minWidth: 200, background: '#7c3aed' }
    },

    // Scenario A: Rapid Adoption
    {
      id: 'scenario-a',
      type: 'default',
      position: { x: 150, y: 600 },
      data: { label: 'Scenario A: Rapid Adoption\nProbability: 30%\n• Favorable regulations\n• High public trust\n• Fast tech progress' },
      style: { ...nodeStyle, minWidth: 180, background: '#10b981', fontSize: '11px' }
    },

    // Scenario B: Gradual Integration
    {
      id: 'scenario-b',
      type: 'default',
      position: { x: 400, y: 600 },
      data: { label: 'Scenario B: Gradual Integration\nProbability: 45%\n• Moderate regulations\n• Cautious adoption\n• Steady progress' },
      style: { ...nodeStyle, minWidth: 180, background: '#10b981', fontSize: '11px' }
    },

    // Scenario C: Regulatory Restrictions
    {
      id: 'scenario-c',
      type: 'default',
      position: { x: 650, y: 600 },
      data: { label: 'Scenario C: Regulatory Restrictions\nProbability: 20%\n• Strict regulations\n• Safety concerns\n• Limited deployment' },
      style: { ...nodeStyle, minWidth: 180, background: '#10b981', fontSize: '11px' }
    },

    // Scenario D: Tech Breakthrough
    {
      id: 'scenario-d',
      type: 'default',
      position: { x: 900, y: 600 },
      data: { label: 'Scenario D: Tech Breakthrough\nProbability: 5%\n• AGI breakthrough\n• Quantum computing\n• Revolutionary change' },
      style: { ...nodeStyle, minWidth: 180, background: '#10b981', fontSize: '11px' }
    },

    // Strategy development
    {
      id: 'strategy-development',
      type: 'default',
      position: { x: 500, y: 740 },
      data: { label: 'Strategy Development\nCreate scenario-specific strategies' },
      style: { ...nodeStyle, minWidth: 220, background: '#8b5cf6' }
    },

    // Strategy A: Aggressive Expansion
    {
      id: 'strategy-a',
      type: 'default',
      position: { x: 150, y: 880 },
      data: { label: 'Strategy A: Aggressive Expansion\n• Full L5 autonomy\n• Global deployment\n• High R&D investment\n• Partnership focus' },
      style: { ...nodeStyle, minWidth: 160, background: '#059669', fontSize: '10px' }
    },

    // Strategy B: Conservative Growth
    {
      id: 'strategy-b',
      type: 'default',
      position: { x: 400, y: 880 },
      data: { label: 'Strategy B: Conservative Growth\n• L3/L4 focus\n• Regional rollout\n• Balanced investment\n• Safety emphasis' },
      style: { ...nodeStyle, minWidth: 160, background: '#059669', fontSize: '10px' }
    },

    // Strategy C: Compliance Focus
    {
      id: 'strategy-c',
      type: 'default',
      position: { x: 650, y: 880 },
      data: { label: 'Strategy C: Compliance Focus\n• L2+ assistance\n• Regulatory alignment\n• Safety validation\n• Limited scope' },
      style: { ...nodeStyle, minWidth: 160, background: '#059669', fontSize: '10px' }
    },

    // Strategy D: Innovation Pivot
    {
      id: 'strategy-d',
      type: 'default',
      position: { x: 900, y: 880 },
      data: { label: 'Strategy D: Innovation Pivot\n• Research focus\n• Platform approach\n• Technology licensing\n• Future positioning' },
      style: { ...nodeStyle, minWidth: 160, background: '#059669', fontSize: '10px' }
    },

    // Risk assessment
    {
      id: 'risk-assessment',
      type: 'default',
      position: { x: 300, y: 1020 },
      data: { label: 'Risk Assessment\nEvaluate scenario-specific risks' },
      style: { ...nodeStyle, minWidth: 180, background: '#dc2626' }
    },

    // Contingency planning
    {
      id: 'contingency-planning',
      type: 'default',
      position: { x: 700, y: 1020 },
      data: { label: 'Contingency Planning\nPrepare adaptive responses' },
      style: { ...nodeStyle, minWidth: 180, background: '#f59e0b' }
    },

    // Resource allocation
    {
      id: 'resource-allocation',
      type: 'default',
      position: { x: 500, y: 1160 },
      data: { label: 'Resource Allocation\nOptimize investments across scenarios' },
      style: { ...nodeStyle, minWidth: 220, background: '#3b82f6' }
    },

    // Core capabilities
    {
      id: 'core-capabilities',
      type: 'default',
      position: { x: 200, y: 1300 },
      data: { label: 'Core Capabilities\n• Sensor fusion\n• Path planning\n• Safety systems\n• OTA updates' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981', fontSize: '11px' }
    },

    // Flexible architecture
    {
      id: 'flexible-architecture',
      type: 'default',
      position: { x: 500, y: 1300 },
      data: { label: 'Flexible Architecture\n• Modular design\n• Configurable AI models\n• Scalable infrastructure\n• Multi-deployment ready' },
      style: { ...nodeStyle, minWidth: 180, background: '#10b981', fontSize: '11px' }
    },

    // Strategic options
    {
      id: 'strategic-options',
      type: 'default',
      position: { x: 800, y: 1300 },
      data: { label: 'Strategic Options\n• Partnership agreements\n• Technology licensing\n• Market expansion\n• Pivot capabilities' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981', fontSize: '11px' }
    },

    // Early warning system
    {
      id: 'early-warning',
      type: 'default',
      position: { x: 350, y: 1440 },
      data: { label: 'Early Warning System\nMonitor scenario indicators' },
      style: { ...nodeStyle, minWidth: 180, background: '#8b5cf6' }
    },

    // Decision triggers
    {
      id: 'decision-triggers',
      type: 'default',
      position: { x: 650, y: 1440 },
      data: { label: 'Decision Triggers\nDefine adaptation thresholds' },
      style: { ...nodeStyle, minWidth: 180, background: '#8b5cf6' }
    },

    // Monitoring indicators
    {
      id: 'monitoring-indicators',
      type: 'default',
      position: { x: 200, y: 1580 },
      data: { label: 'Monitoring Indicators\n• Regulatory announcements\n• Technology milestones\n• Market adoption rates\n• Safety incident reports' },
      style: { ...nodeStyle, minWidth: 180, background: '#6366f1', fontSize: '10px' }
    },

    // Adaptive responses
    {
      id: 'adaptive-responses',
      type: 'default',
      position: { x: 500, y: 1580 },
      data: { label: 'Adaptive Responses\n• Strategy adjustments\n• Resource reallocation\n• Partnership changes\n• Technology pivots' },
      style: { ...nodeStyle, minWidth: 180, background: '#6366f1', fontSize: '10px' }
    },

    // Scenario transitions
    {
      id: 'scenario-transitions',
      type: 'default',
      position: { x: 800, y: 1580 },
      data: { label: 'Scenario Transitions\n• Timeline adjustments\n• Strategy migration\n• Capability scaling\n• Market repositioning' },
      style: { ...nodeStyle, minWidth: 180, background: '#6366f1', fontSize: '10px' }
    },

    // Implementation roadmap
    {
      id: 'implementation-roadmap',
      type: 'default',
      position: { x: 500, y: 1720 },
      data: { label: 'Implementation Roadmap\nExecute adaptive strategy' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    }
  ],
  initialEdges: [
    // Main flow
    { id: 'e1', source: 'strategic-context', target: 'environmental-scanning', style: edgeStyle },
    { id: 'e2', source: 'environmental-scanning', target: 'key-drivers', style: edgeStyle },
    { id: 'e3', source: 'environmental-scanning', target: 'uncertainty-factors', style: edgeStyle },
    { id: 'e4', source: 'environmental-scanning', target: 'trend-analysis', style: edgeStyle },
    
    // Scenario generation
    { id: 'e5', source: 'key-drivers', target: 'scenario-generation', style: edgeStyle },
    { id: 'e6', source: 'uncertainty-factors', target: 'scenario-generation', style: edgeStyle },
    { id: 'e7', source: 'trend-analysis', target: 'scenario-generation', style: edgeStyle },
    
    // Scenarios
    { id: 'e8', source: 'scenario-generation', target: 'scenario-a', style: edgeStyle },
    { id: 'e9', source: 'scenario-generation', target: 'scenario-b', style: edgeStyle },
    { id: 'e10', source: 'scenario-generation', target: 'scenario-c', style: edgeStyle },
    { id: 'e11', source: 'scenario-generation', target: 'scenario-d', style: edgeStyle },
    
    // Strategy development
    { id: 'e12', source: 'scenario-a', target: 'strategy-development', style: edgeStyle },
    { id: 'e13', source: 'scenario-b', target: 'strategy-development', style: edgeStyle },
    { id: 'e14', source: 'scenario-c', target: 'strategy-development', style: edgeStyle },
    { id: 'e15', source: 'scenario-d', target: 'strategy-development', style: edgeStyle },
    
    // Strategies
    { id: 'e16', source: 'strategy-development', target: 'strategy-a', style: edgeStyle },
    { id: 'e17', source: 'strategy-development', target: 'strategy-b', style: edgeStyle },
    { id: 'e18', source: 'strategy-development', target: 'strategy-c', style: edgeStyle },
    { id: 'e19', source: 'strategy-development', target: 'strategy-d', style: edgeStyle },
    
    // Risk and contingency
    { id: 'e20', source: 'strategy-a', target: 'risk-assessment', style: edgeStyle },
    { id: 'e21', source: 'strategy-b', target: 'risk-assessment', style: edgeStyle },
    { id: 'e22', source: 'strategy-c', target: 'contingency-planning', style: edgeStyle },
    { id: 'e23', source: 'strategy-d', target: 'contingency-planning', style: edgeStyle },
    
    // Resource allocation
    { id: 'e24', source: 'risk-assessment', target: 'resource-allocation', style: edgeStyle },
    { id: 'e25', source: 'contingency-planning', target: 'resource-allocation', style: edgeStyle },
    
    // Implementation components
    { id: 'e26', source: 'resource-allocation', target: 'core-capabilities', style: edgeStyle },
    { id: 'e27', source: 'resource-allocation', target: 'flexible-architecture', style: edgeStyle },
    { id: 'e28', source: 'resource-allocation', target: 'strategic-options', style: edgeStyle },
    
    // Monitoring system
    { id: 'e29', source: 'core-capabilities', target: 'early-warning', style: edgeStyle },
    { id: 'e30', source: 'flexible-architecture', target: 'early-warning', style: edgeStyle },
    { id: 'e31', source: 'strategic-options', target: 'decision-triggers', style: edgeStyle },
    
    // Adaptive mechanisms
    { id: 'e32', source: 'early-warning', target: 'monitoring-indicators', style: edgeStyle },
    { id: 'e33', source: 'decision-triggers', target: 'adaptive-responses', style: edgeStyle },
    { id: 'e34', source: 'early-warning', target: 'adaptive-responses', style: edgeStyle },
    { id: 'e35', source: 'decision-triggers', target: 'scenario-transitions', style: edgeStyle },
    
    // Final implementation
    { id: 'e36', source: 'monitoring-indicators', target: 'implementation-roadmap', style: edgeStyle },
    { id: 'e37', source: 'adaptive-responses', target: 'implementation-roadmap', style: edgeStyle },
    { id: 'e38', source: 'scenario-transitions', target: 'implementation-roadmap', style: edgeStyle }
  ],
  steps: [
    {
      id: 1,
      title: 'Strategic Context Analysis',
      description: 'Define the strategic challenge and planning horizon for the agentic AI system',
      activeNodes: ['strategic-context', 'environmental-scanning'],
      explanation: 'Establish the strategic context for autonomous vehicle AI development, considering the 5-year planning horizon and key uncertainties around regulations, technology, and market adoption.'
    },
    {
      id: 2,
      title: 'Environmental Scanning',
      description: 'Identify key drivers, uncertainties, and trends that could impact the system',
      activeNodes: ['key-drivers', 'uncertainty-factors', 'trend-analysis'],
      explanation: 'Systematically analyze external factors: regulatory changes (government policy), technological advances (AI/sensor improvements), market dynamics (adoption rates), and competitive landscape changes.'
    },
    {
      id: 3,
      title: 'Scenario Generation',
      description: 'Create distinct, plausible future scenarios based on different combinations of key factors',
      activeNodes: ['scenario-generation', 'scenario-a', 'scenario-b', 'scenario-c', 'scenario-d'],
      explanation: 'Develop four distinct scenarios: Rapid Adoption (30%), Gradual Integration (45%), Regulatory Restrictions (20%), and Tech Breakthrough (5%), each with specific probability assessments.'
    },
    {
      id: 4,
      title: 'Strategic Response Development',
      description: 'Design specific strategies tailored to each scenario\'s conditions and requirements',
      activeNodes: ['strategy-development', 'strategy-a', 'strategy-b', 'strategy-c', 'strategy-d'],
      explanation: 'Create scenario-specific strategies: Aggressive Expansion for rapid adoption, Conservative Growth for gradual integration, Compliance Focus for restrictions, and Innovation Pivot for breakthroughs.'
    },
    {
      id: 5,
      title: 'Risk Assessment & Contingency Planning',
      description: 'Evaluate risks for each scenario and develop contingency plans',
      activeNodes: ['risk-assessment', 'contingency-planning'],
      explanation: 'Assess scenario-specific risks (regulatory, technical, market, competitive) and develop contingency plans with predefined triggers and response mechanisms for rapid adaptation.'
    },
    {
      id: 6,
      title: 'Resource Allocation Strategy',
      description: 'Optimize resource allocation across scenarios and develop core capabilities',
      activeNodes: ['resource-allocation', 'core-capabilities', 'flexible-architecture', 'strategic-options'],
      explanation: 'Allocate resources to build core capabilities that work across scenarios, design flexible architecture for quick adaptation, and maintain strategic options for future pivots.'
    },
    {
      id: 7,
      title: 'Early Warning & Decision Systems',
      description: 'Establish monitoring systems to detect scenario changes and trigger responses',
      activeNodes: ['early-warning', 'decision-triggers', 'monitoring-indicators'],
      explanation: 'Create early warning systems that monitor key indicators (regulatory announcements, tech milestones, adoption rates) and define clear decision triggers for strategy adjustments.'
    },
    {
      id: 8,
      title: 'Adaptive Implementation',
      description: 'Execute the roadmap with built-in adaptation mechanisms for scenario transitions',
      activeNodes: ['adaptive-responses', 'scenario-transitions', 'implementation-roadmap'],
      explanation: 'Implement the strategy with adaptive mechanisms for scenario transitions, including timeline adjustments, resource reallocation, partnership changes, and technology pivots as conditions evolve.'
    }
  ]
};