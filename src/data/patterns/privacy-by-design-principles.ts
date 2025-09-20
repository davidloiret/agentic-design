import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const privacyByDesignPrinciplesPattern: PatternScenario = {
  id: 'privacy-by-design-principles',
  title: 'Privacy-by-Design Principles for Agent Systems',
  description: 'Foundational privacy principles embedded into agent system architecture from conception, ensuring proactive data protection, user empowerment, and regulatory compliance through design rather than afterthought implementation',
  initialNodes: [
    // User interaction scenario
    {
      id: 'user-agent-interaction',
      position: { x: 400, y: 50 },
      data: { label: '👤 User-Agent Interaction\n"I need help managing my finances,\nanalyze my spending patterns\nand suggest budget optimizations"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Data collection challenge
    {
      id: 'data-collection-challenge',
      position: { x: 400, y: 200 },
      data: { label: '💳 Financial Data Requirements\n"Agent needs access to bank transactions,\ncredit card statements, investment accounts,\nand personal spending behavior data"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 280 },
    },

    // Left path: Traditional data-first approach
    {
      id: 'traditional-approach',
      position: { x: 100, y: 350 },
      data: { label: '📊 Traditional Data-First Approach\n"Collect all available financial data\nBroad permissions and access\nRetain data indefinitely"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 },
    },

    {
      id: 'privacy-risks',
      position: { x: 100, y: 500 },
      data: { label: '⚠️ Privacy Risks\n"Excessive data collection\nUnclear retention policies\nNo user control mechanisms"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'compliance-issues',
      position: { x: 100, y: 650 },
      data: { label: '🚨 Compliance Vulnerabilities\n"GDPR/CCPA violations\nNo data subject rights\nRetroactive privacy fixes"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Center path: Privacy-by-Design implementation
    {
      id: 'privacy-by-design',
      position: { x: 400, y: 350 },
      data: { label: '🛡️ Privacy-by-Design Framework\n"Proactive privacy protection\nPrivacy as default setting\nEnd-to-end privacy architecture"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 250 },
    },

    // Seven Privacy-by-Design principles
    {
      id: 'data-minimization',
      position: { x: 150, y: 500 },
      data: { label: '📏 Data Minimization\n"Collect only transaction categories\nand spending amounts needed\nfor budget analysis"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    {
      id: 'purpose-limitation',
      position: { x: 400, y: 500 },
      data: { label: '🎯 Purpose Limitation\n"Data used only for declared\nbudget optimization purpose\nNo secondary use cases"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    {
      id: 'transparency',
      position: { x: 650, y: 500 },
      data: { label: '🔍 Transparency\n"Clear data flow visualization\nReal-time processing disclosure\nUser-friendly privacy notices"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    {
      id: 'user-control',
      position: { x: 150, y: 650 },
      data: { label: '🎛️ User Control\n"Granular consent mechanisms\nData deletion on demand\nAccess and portability rights"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    {
      id: 'privacy-by-default',
      position: { x: 400, y: 650 },
      data: { label: '🔒 Privacy by Default\n"Strictest privacy settings\nOpt-in not opt-out model\nAutomatic data protection"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    {
      id: 'embedded-privacy',
      position: { x: 650, y: 650 },
      data: { label: '🏗️ Privacy Embedded in Design\n"Security architecture foundation\nPrivacy-preserving algorithms\nBuilt-in protection mechanisms"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    {
      id: 'full-functionality',
      position: { x: 325, y: 800 },
      data: { label: '⚡ Full Functionality\n"Privacy without compromise\nAll features remain available\nNo privacy-utility trade-offs"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    // Right path: Regulatory compliance outcomes
    {
      id: 'regulatory-compliance',
      position: { x: 700, y: 350 },
      data: { label: '📋 Regulatory Compliance\n"GDPR Article 25 compliance\nCCPA privacy-by-design\nEU AI Act conformity"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    {
      id: 'user-trust',
      position: { x: 700, y: 500 },
      data: { label: '🤝 User Trust & Adoption\n"Transparent data practices\nUser empowerment\nPrivacy-first reputation"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    {
      id: 'competitive-advantage',
      position: { x: 700, y: 650 },
      data: { label: '🚀 Competitive Advantage\n"Privacy as differentiator\nReduced compliance costs\nFuture-proof architecture"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Core principle
    {
      id: 'privacy-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Privacy-by-Design Core Principle\n"Privacy must be embedded into the design from the start,\nnot bolted on as an afterthought.\nProactive protection through architectural choices."' },
      style: { ...nodeStyle, background: '#059669', minWidth: 400 },
    },
  ],
  initialEdges: [
    // User interaction creates data requirements
    {
      id: 'e1',
      source: 'user-agent-interaction',
      target: 'data-collection-challenge',
      ...edgeStyle,
      label: 'requires sensitive data access'
    },

    // Three approaches to data handling
    {
      id: 'e2',
      source: 'data-collection-challenge',
      target: 'traditional-approach',
      ...edgeStyle,
      label: 'data-first approach'
    },
    {
      id: 'e3',
      source: 'data-collection-challenge',
      target: 'privacy-by-design',
      ...edgeStyle,
      label: 'privacy-first approach'
    },
    {
      id: 'e4',
      source: 'data-collection-challenge',
      target: 'regulatory-compliance',
      ...edgeStyle,
      label: 'compliance-driven approach'
    },

    // Traditional approach risks
    {
      id: 'e5',
      source: 'traditional-approach',
      target: 'privacy-risks',
      ...edgeStyle,
      label: 'creates vulnerabilities'
    },
    {
      id: 'e6',
      source: 'privacy-risks',
      target: 'compliance-issues',
      ...edgeStyle,
      label: 'leads to violations',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },

    // Privacy-by-Design principles
    {
      id: 'e7',
      source: 'privacy-by-design',
      target: 'data-minimization',
      ...edgeStyle,
      label: 'principle 1'
    },
    {
      id: 'e8',
      source: 'privacy-by-design',
      target: 'purpose-limitation',
      ...edgeStyle,
      label: 'principle 2'
    },
    {
      id: 'e9',
      source: 'privacy-by-design',
      target: 'transparency',
      ...edgeStyle,
      label: 'principle 3'
    },
    {
      id: 'e10',
      source: 'data-minimization',
      target: 'user-control',
      ...edgeStyle,
      label: 'enables principle 4'
    },
    {
      id: 'e11',
      source: 'purpose-limitation',
      target: 'privacy-by-default',
      ...edgeStyle,
      label: 'supports principle 5'
    },
    {
      id: 'e12',
      source: 'transparency',
      target: 'embedded-privacy',
      ...edgeStyle,
      label: 'requires principle 6'
    },
    {
      id: 'e13',
      source: 'user-control',
      target: 'full-functionality',
      ...edgeStyle,
      label: 'maintains principle 7'
    },
    {
      id: 'e14',
      source: 'privacy-by-default',
      target: 'full-functionality',
      ...edgeStyle,
      label: 'preserves usability'
    },
    {
      id: 'e15',
      source: 'embedded-privacy',
      target: 'full-functionality',
      ...edgeStyle,
      label: 'ensures performance'
    },

    // Regulatory compliance outcomes
    {
      id: 'e16',
      source: 'regulatory-compliance',
      target: 'user-trust',
      ...edgeStyle,
      label: 'builds confidence'
    },
    {
      id: 'e17',
      source: 'user-trust',
      target: 'competitive-advantage',
      ...edgeStyle,
      label: 'creates market value'
    },

    // Converge to core principle
    {
      id: 'e18',
      source: 'compliance-issues',
      target: 'privacy-principle',
      ...edgeStyle,
      label: 'demonstrates necessity',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e19',
      source: 'full-functionality',
      target: 'privacy-principle',
      ...edgeStyle,
      label: 'proves effectiveness',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e20',
      source: 'competitive-advantage',
      target: 'privacy-principle',
      ...edgeStyle,
      label: 'validates approach',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "User Financial Data Request",
      description: "User requests financial analysis from AI agent, creating need to access sensitive banking, credit card, and investment data for budget optimization recommendations.",
      activeNodes: ['user-agent-interaction', 'data-collection-challenge'],
      activeEdges: ['e1']
    },
    {
      title: "Three Design Approaches to Data Handling",
      description: "Same data requirements approached through traditional data-first collection (left), privacy-by-design framework (center), and regulatory compliance-driven design (right).",
      activeNodes: ['traditional-approach', 'privacy-by-design', 'regulatory-compliance'],
      activeEdges: ['e2', 'e3', 'e4']
    },
    {
      title: "Traditional Approach: Privacy Risks and Compliance Issues",
      description: "Data-first approach collects excessive information with broad permissions, creating privacy vulnerabilities that lead to GDPR/CCPA violations and costly retroactive fixes.",
      activeNodes: ['privacy-risks', 'compliance-issues'],
      activeEdges: ['e5', 'e6']
    },
    {
      title: "Privacy-by-Design: The Seven Foundational Principles",
      description: "Privacy-by-design framework implements seven core principles: data minimization (collect only necessary transaction data), purpose limitation (budget analysis only), and transparency (clear data flow visualization).",
      activeNodes: ['data-minimization', 'purpose-limitation', 'transparency'],
      activeEdges: ['e7', 'e8', 'e9']
    },
    {
      title: "User Control, Default Privacy, and Embedded Protection",
      description: "Remaining principles ensure user control (granular consent and deletion rights), privacy by default (strictest settings automatically), and privacy embedded in architecture design.",
      activeNodes: ['user-control', 'privacy-by-default', 'embedded-privacy'],
      activeEdges: ['e10', 'e11', 'e12']
    },
    {
      title: "Full Functionality Without Privacy Trade-offs",
      description: "All seven principles converge to deliver complete agent functionality while maintaining privacy protection, proving that security and usability can coexist through proper design.",
      activeNodes: ['full-functionality'],
      activeEdges: ['e13', 'e14', 'e15']
    },
    {
      title: "Regulatory Compliance and Competitive Advantage",
      description: "Privacy-by-design naturally achieves GDPR Article 25 and CCPA compliance, building user trust that creates competitive advantage through privacy-first reputation.",
      activeNodes: ['user-trust', 'competitive-advantage'],
      activeEdges: ['e16', 'e17']
    },
    {
      title: "Core Principle: Privacy as Foundation, Not Afterthought",
      description: "Privacy-by-design demonstrates that privacy must be embedded from architectural conception, not retrofitted later, creating proactive protection through fundamental design choices.",
      activeNodes: ['privacy-principle'],
      activeEdges: ['e18', 'e19', 'e20']
    }
  ]
};