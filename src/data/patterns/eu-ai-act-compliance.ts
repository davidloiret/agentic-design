import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const euAiActCompliancePattern: PatternScenario = {
  id: 'eu-ai-act-compliance',
  title: 'EU AI Act Compliance Framework Pattern',
  description: 'World\'s first comprehensive AI regulation with 4 risk categories, strict high-risk requirements, conformity assessments, and penalties up to €40M or 7% turnover, fully applicable by 2026',
  initialNodes: [
    // AI regulation compliance challenge
    {
      id: 'ai-regulation-challenge',
      position: { x: 400, y: 50 },
      data: { label: '⚖️ AI Regulation Compliance Challenge\n"How to ensure AI systems comply with\nworld\'s first comprehensive AI regulation\nwhile maintaining innovation?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // EU AI Act framework
    {
      id: 'eu-ai-act-framework',
      position: { x: 400, y: 200 },
      data: { label: '🏛️ EU AI Act Framework\n"Regulation (EU) 2024/1689:\n• 4 risk categories\n• Risk-based approach\n• In force August 2024"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Four risk categories
    {
      id: 'four-risk-categories',
      position: { x: 200, y: 350 },
      data: { label: '📊 Four Risk Categories\n"Risk-based classification:\n• Unacceptable (Prohibited)\n• High Risk (Regulated)\n• Limited Risk (Transparency)"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Prohibited AI systems
    {
      id: 'prohibited-ai-systems',
      position: { x: 50, y: 500 },
      data: { label: '🚫 Prohibited AI Systems\n"Unacceptable risk banned:\n• Social scoring systems\n• Cognitive manipulation\n• Real-time biometric ID"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // High-risk AI systems
    {
      id: 'high-risk-ai-systems',
      position: { x: 250, y: 500 },
      data: { label: '⚠️ High-Risk AI Systems\n"Strict requirements:\n• Critical infrastructure\n• Law enforcement\n• Employment, education"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Limited/minimal risk
    {
      id: 'limited-minimal-risk',
      position: { x: 450, y: 500 },
      data: { label: '💬 Limited/Minimal Risk\n"Transparency obligations:\n• Chatbots disclosure\n• Deepfake labeling\n• Most AI unregulated"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },

    // High-risk requirements
    {
      id: 'high-risk-requirements',
      position: { x: 600, y: 350 },
      data: { label: '📋 High-Risk Requirements\n"Provider obligations:\n• Risk management system\n• Data governance\n• Technical documentation"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // Additional requirements
    {
      id: 'additional-requirements',
      position: { x: 600, y: 500 },
      data: { label: '👁️ Oversight & Quality\n"Core compliance:\n• Human oversight design\n• Quality management system\n• Record-keeping automation"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    // Conformity assessment
    {
      id: 'conformity-assessment',
      position: { x: 400, y: 650 },
      data: { label: '✅ Conformity Assessment\n"Compliance validation:\n• Internal control (most cases)\n• Third-party (product safety)\n• CE marking required"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 270 },
    },

    // Penalties and fines
    {
      id: 'penalties-fines',
      position: { x: 200, y: 800 },
      data: { label: '💰 Penalties & Fines\n"Tiered enforcement:\n• Prohibited AI: €40M or 7%\n• Data/transparency: €20M or 4%\n• Other violations: €15M or 3%"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 230 },
    },

    // Implementation timeline
    {
      id: 'implementation-timeline',
      position: { x: 600, y: 800 },
      data: { label: '📅 Implementation Timeline\n"Phased rollout 2024-2027:\n• Feb 2025: Prohibitions apply\n• Aug 2025: GPAI obligations\n• Aug 2026: Full application"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    // Core compliance principle
    {
      id: 'compliance-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 AI Act Compliance Principle\n"Risk-based regulation balances innovation with protection\nTransparency and human oversight ensure trustworthy AI\nSubstantial penalties drive serious compliance efforts"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 370 },
    },
  ],
  initialEdges: [
    // Challenge addressed by EU AI Act
    {
      id: 'e1',
      source: 'ai-regulation-challenge',
      target: 'eu-ai-act-framework',
      ...edgeStyle,
      label: 'addressed by'
    },

    // Framework implements risk categories and requirements
    {
      id: 'e2',
      source: 'eu-ai-act-framework',
      target: 'four-risk-categories',
      ...edgeStyle,
      label: 'implements 4 categories'
    },
    {
      id: 'e3',
      source: 'eu-ai-act-framework',
      target: 'high-risk-requirements',
      ...edgeStyle,
      label: 'defines requirements'
    },

    // Risk categories breakdown
    {
      id: 'e4',
      source: 'four-risk-categories',
      target: 'prohibited-ai-systems',
      ...edgeStyle,
      label: 'includes prohibited'
    },
    {
      id: 'e5',
      source: 'four-risk-categories',
      target: 'high-risk-ai-systems',
      ...edgeStyle,
      label: 'includes high-risk'
    },
    {
      id: 'e6',
      source: 'four-risk-categories',
      target: 'limited-minimal-risk',
      ...edgeStyle,
      label: 'includes limited/minimal'
    },

    // High-risk systems connect to requirements
    {
      id: 'e7',
      source: 'high-risk-ai-systems',
      target: 'high-risk-requirements',
      ...edgeStyle,
      label: 'must fulfill'
    },

    // Requirements include additional obligations
    {
      id: 'e8',
      source: 'high-risk-requirements',
      target: 'additional-requirements',
      ...edgeStyle,
      label: 'extends to'
    },

    // Requirements lead to conformity assessment
    {
      id: 'e9',
      source: 'additional-requirements',
      target: 'conformity-assessment',
      ...edgeStyle,
      label: 'validated via'
    },

    // Violations lead to penalties
    {
      id: 'e10',
      source: 'prohibited-ai-systems',
      target: 'penalties-fines',
      ...edgeStyle,
      label: 'violations penalized',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },
    {
      id: 'e11',
      source: 'conformity-assessment',
      target: 'penalties-fines',
      ...edgeStyle,
      label: 'non-compliance fined'
    },

    // Framework has implementation timeline
    {
      id: 'e12',
      source: 'eu-ai-act-framework',
      target: 'implementation-timeline',
      ...edgeStyle,
      label: 'follows timeline'
    },

    // All elements demonstrate compliance principle
    {
      id: 'e13',
      source: 'penalties-fines',
      target: 'compliance-principle',
      ...edgeStyle,
      label: 'enforces principle',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e14',
      source: 'implementation-timeline',
      target: 'compliance-principle',
      ...edgeStyle,
      label: 'implements principle',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "AI Regulation Compliance Challenge",
      description: "How can organizations ensure AI systems comply with the world's first comprehensive AI regulation while maintaining innovation and competitiveness in the global market?",
      activeNodes: ['ai-regulation-challenge'],
      activeEdges: []
    },
    {
      title: "EU AI Act Framework Introduction",
      description: "Regulation (EU) 2024/1689 establishes world's first comprehensive AI legal framework with risk-based approach, 4 risk categories, in force August 2024 with phased implementation through 2027.",
      activeNodes: ['eu-ai-act-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Four Risk Categories Classification",
      description: "Framework implements risk-based classification: Unacceptable/Prohibited (social scoring, manipulation), High Risk (critical infrastructure, law enforcement), Limited Risk (chatbots), Minimal Risk (most current AI).",
      activeNodes: ['four-risk-categories', 'prohibited-ai-systems', 'high-risk-ai-systems', 'limited-minimal-risk'],
      activeEdges: ['e2', 'e4', 'e5', 'e6']
    },
    {
      title: "High-Risk AI System Requirements",
      description: "High-risk systems must fulfill strict provider obligations: risk management system, data governance, technical documentation, human oversight design, quality management system, automated record-keeping.",
      activeNodes: ['high-risk-requirements', 'additional-requirements'],
      activeEdges: ['e3', 'e7', 'e8']
    },
    {
      title: "Conformity Assessment and Validation",
      description: "Compliance validated through conformity assessment: internal control for most high-risk systems, third-party for product safety components, resulting in CE marking and EU Technical Documentation Certificate.",
      activeNodes: ['conformity-assessment'],
      activeEdges: ['e9']
    },
    {
      title: "Penalties and Implementation Timeline",
      description: "Tiered penalties enforce compliance (€40M/7% for prohibited AI, €20M/4% for data violations) with phased implementation: Feb 2025 prohibitions, Aug 2025 GPAI obligations, Aug 2026 full application, proving risk-based regulation balances innovation with protection.",
      activeNodes: ['penalties-fines', 'implementation-timeline', 'compliance-principle'],
      activeEdges: ['e10', 'e11', 'e12', 'e13', 'e14']
    }
  ]
};