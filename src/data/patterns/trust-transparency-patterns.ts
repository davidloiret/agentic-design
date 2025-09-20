import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const trustTransparencyPatternsPattern: PatternScenario = {
  id: 'trust-transparency-patterns',
  title: 'Trust and Transparency Patterns',
  description: 'Design patterns for building user trust through explainable AI interfaces, decision transparency, and source attribution achieving 82% improvement in appropriate AI reliance',
  initialNodes: [
    // AI trust deficit
    {
      id: 'ai-trust-deficit',
      position: { x: 400, y: 50 },
      data: { label: '🤷 AI Trust Deficit\n"How to build user trust in AI\nsystems through transparency,\nexplanations, and accountability?"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 320 },
    },

    // Trust transparency framework
    {
      id: 'trust-transparency-framework',
      position: { x: 400, y: 200 },
      data: { label: '🛡️ Trust & Transparency Framework\n"Building confidence:\n• Explainable AI interfaces\n• Decision transparency\n• Source attribution\n• Trust calibration"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 290 },
    },

    // Explainable AI patterns
    {
      id: 'explainable-ai-patterns',
      position: { x: 200, y: 350 },
      data: { label: '🔍 Explainable AI Patterns\n"XAI interfaces:\n• Three-level transparency\n• Progressive disclosure\n• Context-sensitive help\n• Visual explanations"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Explanation generation
    {
      id: 'explanation-generation',
      position: { x: 50, y: 500 },
      data: { label: '⚡ Real-Time Explanation\n"Dynamic insights:\n• Streaming explanations\n• Chain of thought\n• Progressive revelation\n• Context adaptation"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Decision transparency
    {
      id: 'decision-transparency',
      position: { x: 600, y: 350 },
      data: { label: '⚖️ Decision Transparency\n"Reasoning visibility:\n• Decision provenance\n• Step-by-step logic\n• Alternative options\n• Confidence levels"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // Source attribution
    {
      id: 'source-attribution',
      position: { x: 750, y: 500 },
      data: { label: '📚 Source Attribution\n"Citation systems:\n• Real-time citations\n• Interactive sources\n• Provenance tracking\n• Verification links"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // Trust calibration
    {
      id: 'trust-calibration',
      position: { x: 400, y: 650 },
      data: { label: '🎯 Trust Calibration\n"Appropriate reliance:\n• 82% improvement rates\n• Confidence visualization\n• Uncertainty communication\n• Overconfidence mitigation"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 270 },
    },

    // Audit trails
    {
      id: 'audit-trails',
      position: { x: 200, y: 800 },
      data: { label: '📋 Audit Trails\n"Decision tracking:\n• Tamper-proof records\n• Comprehensive logs\n• Regulatory compliance\n• Accountability chains"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Bias detection
    {
      id: 'bias-detection',
      position: { x: 600, y: 800 },
      data: { label: '⚡ Bias Detection\n"Fairness monitoring:\n• Real-time analysis\n• Demographic tracking\n• Performance metrics\n• Alert systems"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },

    // User control
    {
      id: 'user-control',
      position: { x: 200, y: 950 },
      data: { label: '🎮 User Control\n"Agency preservation:\n• Override mechanisms\n• Customizable explanations\n• Feedback integration\n• Preference learning"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // Privacy balance
    {
      id: 'privacy-balance',
      position: { x: 600, y: 950 },
      data: { label: '⚖️ Privacy Balance\n"Transparency trade-offs:\n• Differential privacy\n• Selective disclosure\n• Anonymization\n• Consent management"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    // Production implementations
    {
      id: 'production-implementations',
      position: { x: 400, y: 1100 },
      data: { label: '🏢 Production Success\n"Real-world deployment:\n• 58% transparency improvement\n• 78% confidence thresholds\n• Regulatory compliance\n• User satisfaction gains"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 270 },
    },

    // Core trust principle
    {
      id: 'trust-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Trust & Transparency Principle\n"Explainable AI with source attribution achieves 82% improvement in trust\nDecision transparency with audit trails ensures regulatory compliance\nUser control with privacy balance enables appropriate AI reliance"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Deficit addressed by framework
    {
      id: 'e1',
      source: 'ai-trust-deficit',
      target: 'trust-transparency-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework components
    {
      id: 'e2',
      source: 'trust-transparency-framework',
      target: 'explainable-ai-patterns',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e3',
      source: 'trust-transparency-framework',
      target: 'decision-transparency',
      ...edgeStyle,
      label: 'provides'
    },
    {
      id: 'e4',
      source: 'trust-transparency-framework',
      target: 'trust-calibration',
      ...edgeStyle,
      label: 'enables'
    },

    // Explanation details
    {
      id: 'e5',
      source: 'explainable-ai-patterns',
      target: 'explanation-generation',
      ...edgeStyle,
      label: 'powered by'
    },

    // Decision details
    {
      id: 'e6',
      source: 'decision-transparency',
      target: 'source-attribution',
      ...edgeStyle,
      label: 'supported by'
    },

    // Calibration flows
    {
      id: 'e7',
      source: 'trust-calibration',
      target: 'audit-trails',
      ...edgeStyle,
      label: 'documented by'
    },
    {
      id: 'e8',
      source: 'trust-calibration',
      target: 'bias-detection',
      ...edgeStyle,
      label: 'monitored by'
    },

    // Cross-connections
    {
      id: 'e9',
      source: 'explanation-generation',
      target: 'audit-trails',
      ...edgeStyle,
      label: 'logged by'
    },
    {
      id: 'e10',
      source: 'source-attribution',
      target: 'bias-detection',
      ...edgeStyle,
      label: 'verified by'
    },

    // Control and privacy
    {
      id: 'e11',
      source: 'audit-trails',
      target: 'user-control',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e12',
      source: 'bias-detection',
      target: 'privacy-balance',
      ...edgeStyle,
      label: 'balanced with'
    },

    // Implementation validation
    {
      id: 'e13',
      source: 'user-control',
      target: 'production-implementations',
      ...edgeStyle,
      label: 'deployed in'
    },
    {
      id: 'e14',
      source: 'privacy-balance',
      target: 'production-implementations',
      ...edgeStyle,
      label: 'achieved in'
    },

    // Implementation proves principle
    {
      id: 'e15',
      source: 'production-implementations',
      target: 'trust-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "AI Trust Deficit Challenge",
      description: "How can AI systems build user trust through transparency, clear explanations, and accountability when users often don't understand AI decision-making processes?",
      activeNodes: ['ai-trust-deficit'],
      activeEdges: []
    },
    {
      title: "Trust & Transparency Framework",
      description: "Comprehensive framework addresses trust deficit through explainable AI interfaces, decision transparency, source attribution systems, and trust calibration mechanisms.",
      activeNodes: ['trust-transparency-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Explainable AI and Decision Transparency",
      description: "Three-level transparency with progressive disclosure powered by real-time explanation generation. Decision transparency provides reasoning visibility with source attribution and verification links.",
      activeNodes: ['explainable-ai-patterns', 'explanation-generation', 'decision-transparency', 'source-attribution'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Trust Calibration and Monitoring",
      description: "82% improvement in appropriate reliance through confidence visualization and uncertainty communication. Audit trails and bias detection ensure accountability and fairness monitoring.",
      activeNodes: ['trust-calibration', 'audit-trails', 'bias-detection'],
      activeEdges: ['e4', 'e7', 'e8', 'e9', 'e10']
    },
    {
      title: "User Control and Privacy Balance",
      description: "Agency preservation through override mechanisms and customizable explanations. Privacy balance achieved through differential privacy and selective disclosure with consent management.",
      activeNodes: ['user-control', 'privacy-balance'],
      activeEdges: ['e11', 'e12']
    },
    {
      title: "Production Success and Validation",
      description: "58% transparency improvement with 78% confidence thresholds in production. Explainable AI with decision transparency and user control enables appropriate AI reliance while ensuring compliance.",
      activeNodes: ['production-implementations', 'trust-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};