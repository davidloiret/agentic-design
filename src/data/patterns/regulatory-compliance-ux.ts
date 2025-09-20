import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const regulatoryComplianceUXPattern: PatternScenario = {
  id: 'regulatory-compliance-ux',
  title: 'Regulatory Compliance UX Pattern',
  description: 'User experience design for GDPR, CCPA, and emerging AI regulations including right to explanation interfaces, data subject rights automation, compliance dashboard visualization, and proactive regulatory adherence through design',
  initialNodes: [
    // Global AI service scenario
    {
      id: 'global-ai-service',
      position: { x: 400, y: 50 },
      data: { label: '🌍 Global AI Service Launch\n"AI recruitment platform expanding\nto EU (GDPR), California (CCPA),\nand preparing for EU AI Act compliance"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Regulatory complexity
    {
      id: 'regulatory-complexity',
      position: { x: 400, y: 200 },
      data: { label: '⚖️ Multi-Jurisdiction Compliance\n"GDPR: Right to explanation + data portability\nCCPA: Transparency + deletion rights\nEU AI Act: High-risk system requirements"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // Left path: Reactive compliance approach
    {
      id: 'reactive-compliance',
      position: { x: 150, y: 350 },
      data: { label: '🚨 Reactive Compliance Approach\n"Legal team reviews after development\nRetrofit privacy features\nManual compliance processes"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 },
    },

    {
      id: 'compliance-friction',
      position: { x: 150, y: 500 },
      data: { label: '⚙️ High Compliance Friction\n"Manual data subject requests\nTime-consuming legal reviews\nInconsistent user experiences"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'regulatory-risk',
      position: { x: 150, y: 650 },
      data: { label: '💸 Regulatory Risk & Penalties\n"€20M GDPR fines possible\n$7,500 per violation (CCPA)\nMarket access restrictions"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: Proactive compliance design
    {
      id: 'proactive-compliance',
      position: { x: 650, y: 350 },
      data: { label: '🛡️ Proactive Compliance by Design\n"Built-in regulatory adherence\nAutomated compliance workflows\nUser-centric rights interfaces"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 240 },
    },

    // GDPR compliance interfaces
    {
      id: 'gdpr-interfaces',
      position: { x: 450, y: 500 },
      data: { label: '🇪🇺 GDPR Compliance Interfaces\n"Right to Access: Data download portal\nRight to Rectification: Inline editing\nRight to Erasure: \'Forget me\' button"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    {
      id: 'explanation-interface',
      position: { x: 700, y: 500 },
      data: { label: '🔍 AI Decision Explanation UI\n"Why was I rejected?\n• Experience: 65% weight\n• Skills match: 23% weight\n• Location: 12% weight"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // CCPA compliance features
    {
      id: 'ccpa-interfaces',
      position: { x: 950, y: 500 },
      data: { label: '🇺🇸 CCPA Compliance Features\n"Do Not Sell My Data toggle\nPersonal Info Categories disclosure\nThird-party sharing transparency"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // EU AI Act compliance
    {
      id: 'ai-act-compliance',
      position: { x: 450, y: 650 },
      data: { label: '🤖 EU AI Act High-Risk System UI\n"Risk Assessment: Documented\nHuman Oversight: Always enabled\nBias Monitoring: Real-time alerts"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },

    // Compliance automation
    {
      id: 'compliance-automation',
      position: { x: 700, y: 650 },
      data: { label: '⚙️ Automated Compliance Engine\n"Data retention auto-deletion\nConsent expiry notifications\nRegulatory report generation"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },

    // Compliance dashboard
    {
      id: 'compliance-dashboard',
      position: { x: 950, y: 650 },
      data: { label: '📊 Compliance Health Dashboard\n"GDPR: 98% compliant\nCCPA: 100% compliant\nAI Act: Preparation 85%"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    // User trust and business outcomes
    {
      id: 'regulatory-confidence',
      position: { x: 575, y: 800 },
      data: { label: '✅ Regulatory Confidence\n"Users trust data handling\nSeamless rights exercise\nTransparent AI decisions"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    {
      id: 'business-advantages',
      position: { x: 825, y: 800 },
      data: { label: '🚀 Competitive Business Advantage\n"Faster global market entry\nReduced legal costs\nPrivacy-first brand reputation"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Core compliance principle
    {
      id: 'compliance-principle',
      position: { x: 650, y: 950 },
      data: { label: '🎯 Regulatory Compliance UX Principle\n"Compliance should enhance user experience, not hinder it.\nRegulatory requirements become opportunities\nfor user empowerment and trust building."' },
      style: { ...nodeStyle, background: '#059669', minWidth: 450 },
    },
  ],
  initialEdges: [
    // Global service faces regulatory complexity
    {
      id: 'e1',
      source: 'global-ai-service',
      target: 'regulatory-complexity',
      ...edgeStyle,
      label: 'must navigate multiple jurisdictions'
    },

    // Two compliance approaches
    {
      id: 'e2',
      source: 'regulatory-complexity',
      target: 'reactive-compliance',
      ...edgeStyle,
      label: 'traditional reactive approach'
    },
    {
      id: 'e3',
      source: 'regulatory-complexity',
      target: 'proactive-compliance',
      ...edgeStyle,
      label: 'proactive design approach'
    },

    // Reactive compliance problems
    {
      id: 'e4',
      source: 'reactive-compliance',
      target: 'compliance-friction',
      ...edgeStyle,
      label: 'creates operational burden'
    },
    {
      id: 'e5',
      source: 'compliance-friction',
      target: 'regulatory-risk',
      ...edgeStyle,
      label: 'increases violation risk',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },

    // Proactive compliance implementations
    {
      id: 'e6',
      source: 'proactive-compliance',
      target: 'gdpr-interfaces',
      ...edgeStyle,
      label: 'implements GDPR rights'
    },
    {
      id: 'e7',
      source: 'proactive-compliance',
      target: 'explanation-interface',
      ...edgeStyle,
      label: 'provides AI transparency'
    },
    {
      id: 'e8',
      source: 'proactive-compliance',
      target: 'ccpa-interfaces',
      ...edgeStyle,
      label: 'enables CCPA compliance'
    },

    // Advanced compliance features
    {
      id: 'e9',
      source: 'gdpr-interfaces',
      target: 'ai-act-compliance',
      ...edgeStyle,
      label: 'integrates with AI governance'
    },
    {
      id: 'e10',
      source: 'explanation-interface',
      target: 'compliance-automation',
      ...edgeStyle,
      label: 'feeds automated systems'
    },
    {
      id: 'e11',
      source: 'ccpa-interfaces',
      target: 'compliance-dashboard',
      ...edgeStyle,
      label: 'monitors compliance status'
    },

    // System integration
    {
      id: 'e12',
      source: 'ai-act-compliance',
      target: 'compliance-automation',
      ...edgeStyle,
      label: 'automates risk monitoring'
    },
    {
      id: 'e13',
      source: 'compliance-automation',
      target: 'compliance-dashboard',
      ...edgeStyle,
      label: 'provides real-time status'
    },

    // Positive outcomes
    {
      id: 'e14',
      source: 'ai-act-compliance',
      target: 'regulatory-confidence',
      ...edgeStyle,
      label: 'builds user trust'
    },
    {
      id: 'e15',
      source: 'compliance-dashboard',
      target: 'regulatory-confidence',
      ...edgeStyle,
      label: 'demonstrates transparency'
    },
    {
      id: 'e16',
      source: 'regulatory-confidence',
      target: 'business-advantages',
      ...edgeStyle,
      label: 'creates market value'
    },

    // Converge to principle
    {
      id: 'e17',
      source: 'regulatory-risk',
      target: 'compliance-principle',
      ...edgeStyle,
      label: 'highlights compliance importance',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e18',
      source: 'regulatory-confidence',
      target: 'compliance-principle',
      ...edgeStyle,
      label: 'validates user-centric approach',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e19',
      source: 'business-advantages',
      target: 'compliance-principle',
      ...edgeStyle,
      label: 'proves business value',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Global AI Service Multi-Jurisdiction Compliance Challenge",
      description: "AI recruitment platform expanding globally must navigate GDPR (right to explanation, data portability), CCPA (transparency, deletion rights), and prepare for EU AI Act high-risk system requirements.",
      activeNodes: ['global-ai-service', 'regulatory-complexity'],
      activeEdges: ['e1']
    },
    {
      title: "Two Regulatory Compliance Approaches",
      description: "Multi-jurisdiction requirements addressed through traditional reactive compliance with legal retrofitting (left) versus proactive compliance-by-design with built-in adherence (right).",
      activeNodes: ['reactive-compliance', 'proactive-compliance'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Reactive Compliance: Friction and Regulatory Risk",
      description: "Manual compliance processes and retroactive privacy features create operational burden, time-consuming legal reviews, and increased risk of €20M GDPR fines or $7,500 CCPA violations.",
      activeNodes: ['compliance-friction', 'regulatory-risk'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "Proactive GDPR and AI Transparency Interfaces",
      description: "Built-in GDPR compliance with data download portals, inline editing for rectification, 'Forget me' buttons, and AI decision explanation interfaces showing algorithmic decision factors and weights.",
      activeNodes: ['gdpr-interfaces', 'explanation-interface', 'ccpa-interfaces'],
      activeEdges: ['e6', 'e7', 'e8']
    },
    {
      title: "Advanced Compliance: EU AI Act and Automation",
      description: "EU AI Act high-risk system compliance with documented risk assessments, human oversight controls, bias monitoring, plus automated compliance engine with retention deletion and consent management.",
      activeNodes: ['ai-act-compliance', 'compliance-automation', 'compliance-dashboard'],
      activeEdges: ['e9', 'e10', 'e11', 'e12', 'e13']
    },
    {
      title: "Regulatory Confidence and Business Advantages",
      description: "Proactive compliance builds user trust through transparent data handling and seamless rights exercise, creating competitive advantages through faster market entry and privacy-first reputation.",
      activeNodes: ['regulatory-confidence', 'business-advantages'],
      activeEdges: ['e14', 'e15', 'e16']
    },
    {
      title: "Regulatory Compliance UX Principle",
      description: "Compliance should enhance user experience, not hinder it. Regulatory requirements become opportunities for user empowerment and trust building, transforming legal obligations into competitive advantages.",
      activeNodes: ['compliance-principle'],
      activeEdges: ['e17', 'e18', 'e19']
    }
  ]
};