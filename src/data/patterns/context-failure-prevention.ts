import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const contextFailurePreventionPattern: PatternScenario = {
  id: 'context-failure-prevention',
  title: 'Context Failure Prevention Pattern',
  description: 'Multi-layered defense against context failures including overflow, corruption, injection, and drift achieving 99.8% threat detection with automatic recovery mechanisms',
  initialNodes: [
    // Context failure challenge
    {
      id: 'context-failure-challenge',
      position: { x: 400, y: 50 },
      data: { label: '⚠️ Context Failure Challenge\n"How to prevent context overflow,\ncorruption, injection attacks,\nand performance degradation?"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 320 },
    },

    // Failure prevention framework
    {
      id: 'failure-prevention-framework',
      position: { x: 400, y: 200 },
      data: { label: '🛡️ Prevention Framework\n"Multi-layered defense:\n• Detection mechanisms\n• Prevention strategies\n• Recovery systems\n• Continuous monitoring"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Failure modes
    {
      id: 'failure-modes',
      position: { x: 200, y: 350 },
      data: { label: '🚨 Failure Modes\n"Critical threats:\n• Context overflow\n• Memory corruption\n• Prompt injection\n• Context drift"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // Overflow prevention
    {
      id: 'overflow-prevention',
      position: { x: 50, y: 500 },
      data: { label: '📦 Overflow Prevention\n"Window management:\n• Sliding windows\n• Priority preservation\n• Semantic compression\n• 80% reduction"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Detection systems
    {
      id: 'detection-systems',
      position: { x: 600, y: 350 },
      data: { label: '🔍 Detection Systems\n"Real-time monitoring:\n• Anomaly detection\n• Hash verification\n• Behavioral analysis\n• 99.8% detection rate"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // Injection defense
    {
      id: 'injection-defense',
      position: { x: 750, y: 500 },
      data: { label: '💉 Injection Defense\n"Security layers:\n• Input sanitization\n• Context isolation\n• Output validation\n• Task Shield 2.07% ASR"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // Prevention strategies
    {
      id: 'prevention-strategies',
      position: { x: 400, y: 650 },
      data: { label: '🚧 Prevention Strategies\n"Comprehensive protection:\n• Input validation\n• Boundary checking\n• Integrity monitoring\n• RBAC controls"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 260 },
    },

    // Recovery mechanisms
    {
      id: 'recovery-mechanisms',
      position: { x: 200, y: 800 },
      data: { label: '🔄 Recovery Mechanisms\n"Resilience systems:\n• Fallback contexts\n• Context repair\n• Graceful degradation\n• 95% recovery rate"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Corruption prevention
    {
      id: 'corruption-prevention',
      position: { x: 600, y: 800 },
      data: { label: '🔒 Corruption Prevention\n"Data integrity:\n• Memory poisoning defense\n• Source verification\n• Quarantine systems\n• Hash protection"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 250 },
    },

    // Drift detection
    {
      id: 'drift-detection',
      position: { x: 200, y: 950 },
      data: { label: '📈 Drift Detection\n"Performance monitoring:\n• Data drift tracking\n• Model drift analysis\n• Task alignment\n• 35% error prevention"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 230 },
    },

    // Testing frameworks
    {
      id: 'testing-frameworks',
      position: { x: 600, y: 950 },
      data: { label: '🧪 Testing Frameworks\n"Robustness evaluation:\n• Adversarial testing\n• Red team exercises\n• LLM-as-Judge\n• LiveCodeBench"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },

    // Production metrics
    {
      id: 'production-metrics',
      position: { x: 400, y: 1100 },
      data: { label: '📊 Production Metrics\n"Success indicators:\n• 99.2% state recovery\n• 67% escalation drop\n• 340% ROI average\n• 30-60% cost reduction"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 260 },
    },

    // Core prevention principle
    {
      id: 'prevention-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Context Failure Prevention Principle\n"Multi-layered defense ensures 99.8% threat detection\nAutomatic recovery mechanisms achieve 95% restoration success\nContinuous monitoring prevents 35% of drift-related errors"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'context-failure-challenge',
      target: 'failure-prevention-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework components
    {
      id: 'e2',
      source: 'failure-prevention-framework',
      target: 'failure-modes',
      ...edgeStyle,
      label: 'identifies'
    },
    {
      id: 'e3',
      source: 'failure-prevention-framework',
      target: 'detection-systems',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e4',
      source: 'failure-prevention-framework',
      target: 'prevention-strategies',
      ...edgeStyle,
      label: 'applies'
    },

    // Failure mode responses
    {
      id: 'e5',
      source: 'failure-modes',
      target: 'overflow-prevention',
      ...edgeStyle,
      label: 'addressed by'
    },

    // Detection responses
    {
      id: 'e6',
      source: 'detection-systems',
      target: 'injection-defense',
      ...edgeStyle,
      label: 'triggers'
    },

    // Prevention flows
    {
      id: 'e7',
      source: 'prevention-strategies',
      target: 'recovery-mechanisms',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e8',
      source: 'prevention-strategies',
      target: 'corruption-prevention',
      ...edgeStyle,
      label: 'includes'
    },

    // Cross-connections
    {
      id: 'e9',
      source: 'overflow-prevention',
      target: 'drift-detection',
      ...edgeStyle,
      label: 'prevents'
    },
    {
      id: 'e10',
      source: 'injection-defense',
      target: 'testing-frameworks',
      ...edgeStyle,
      label: 'validated by'
    },

    // Recovery and prevention connections
    {
      id: 'e11',
      source: 'recovery-mechanisms',
      target: 'drift-detection',
      ...edgeStyle,
      label: 'monitors'
    },
    {
      id: 'e12',
      source: 'corruption-prevention',
      target: 'testing-frameworks',
      ...edgeStyle,
      label: 'tested by'
    },

    // Testing and metrics
    {
      id: 'e13',
      source: 'drift-detection',
      target: 'production-metrics',
      ...edgeStyle,
      label: 'improves'
    },
    {
      id: 'e14',
      source: 'testing-frameworks',
      target: 'production-metrics',
      ...edgeStyle,
      label: 'validates'
    },

    // Metrics prove principle
    {
      id: 'e15',
      source: 'production-metrics',
      target: 'prevention-principle',
      ...edgeStyle,
      label: 'demonstrates',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Context Failure Challenge",
      description: "How can we prevent context failures including overflow at 32k tokens, corruption from memory poisoning, injection attacks with 89.6% success rate, and performance degradation?",
      activeNodes: ['context-failure-challenge'],
      activeEdges: []
    },
    {
      title: "Multi-Layered Prevention Framework",
      description: "Comprehensive framework addresses challenge through detection mechanisms, prevention strategies, recovery systems, and continuous monitoring for resilient context management.",
      activeNodes: ['failure-prevention-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Failure Modes and Detection",
      description: "Critical threats include context overflow, memory corruption, prompt injection, and drift. Real-time detection achieves 99.8% threat identification through anomaly detection and behavioral analysis.",
      activeNodes: ['failure-modes', 'overflow-prevention', 'detection-systems', 'injection-defense'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Prevention and Recovery Strategies",
      description: "Comprehensive protection through input validation, boundary checking, and RBAC controls. Recovery mechanisms achieve 95% restoration success with fallback contexts and graceful degradation.",
      activeNodes: ['prevention-strategies', 'recovery-mechanisms', 'corruption-prevention'],
      activeEdges: ['e4', 'e7', 'e8']
    },
    {
      title: "Drift Detection and Testing",
      description: "Performance monitoring tracks data and model drift preventing 35% of errors. Robustness evaluation through adversarial testing, red team exercises, and LLM-as-Judge validation.",
      activeNodes: ['drift-detection', 'testing-frameworks'],
      activeEdges: ['e9', 'e10', 'e11', 'e12']
    },
    {
      title: "Production Success Metrics",
      description: "Achieves 99.2% state recovery, 67% escalation drop, 340% average ROI with 30-60% cost reduction, proving multi-layered defense with automatic recovery ensures reliable context management.",
      activeNodes: ['production-metrics', 'prevention-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};