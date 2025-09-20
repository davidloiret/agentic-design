import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const privacySecurityUxPattern: PatternScenario = {
  id: 'privacy-security-ux',
  title: 'Privacy and Security UX',
  description: 'Privacy-first design patterns for agent systems with transparent data handling, granular controls, and user empowerment achieving 97%+ user trust through comprehensive privacy protection',
  initialNodes: [
    // Privacy challenge
    {
      id: 'privacy-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🛡️ Privacy & Security Challenge\n"How to design agent systems with\nprivacy-first principles, transparent data handling,\nand user empowerment while maintaining functionality?"' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 380 },
    },

    // Privacy-by-Design Principles
    {
      id: 'privacy-by-design',
      position: { x: 100, y: 200 },
      data: { label: '🏗️ Privacy-by-Design Principles\n"Foundational approach:\n• Data minimization\n• Purpose limitation\n• Transparency by default\n• Proactive protection"' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 260 },
    },

    // Transparent Data Handling
    {
      id: 'transparent-data-handling',
      position: { x: 700, y: 200 },
      data: { label: '🔍 Transparent Data Handling\n"Real-time visibility:\n• Data flow visualization\n• Processing transparency\n• Storage locations\n• Retention timers"' },
      style: { ...nodeStyle, background: '#0891b2', minWidth: 260 },
    },

    // Granular Privacy Controls
    {
      id: 'granular-controls',
      position: { x: 50, y: 350 },
      data: { label: '🎛️ Granular Privacy Controls\n"Fine-grained management:\n• Data type permissions\n• Purpose limitation\n• Temporal controls\n• Contextual consent"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },

    // User Empowerment Dashboard
    {
      id: 'user-empowerment',
      position: { x: 300, y: 350 },
      data: { label: '📊 User Empowerment Dashboard\n"Self-sovereign control:\n• Personal data inventory\n• Usage insights\n• Privacy health score\n• Data portability"' },
      style: { ...nodeStyle, background: '#0369a1', minWidth: 240 },
    },

    // Advanced Privacy Technologies
    {
      id: 'advanced-privacy-tech',
      position: { x: 550, y: 350 },
      data: { label: '🔐 Advanced Privacy Technologies\n"Cryptographic protection:\n• Differential privacy\n• Federated learning\n• Homomorphic encryption\n• Zero-knowledge proofs"' },
      style: { ...nodeStyle, background: '#7c2d12', minWidth: 240 },
    },

    // Progressive Consent Flow
    {
      id: 'progressive-consent',
      position: { x: 800, y: 350 },
      data: { label: '📝 Progressive Consent Flow\n"Just-in-time permissions:\n• Layered disclosure\n• Risk communication\n• Adaptive notifications\n• Consent preview"' },
      style: { ...nodeStyle, background: '#be185d', minWidth: 240 },
    },

    // Regulatory Compliance UX
    {
      id: 'regulatory-compliance',
      position: { x: 150, y: 500 },
      data: { label: '⚖️ Regulatory Compliance UX\n"Legal framework integration:\n• GDPR data rights\n• CCPA transparency\n• EU AI Act compliance\n• Automated enforcement"' },
      style: { ...nodeStyle, background: '#ea580c', minWidth: 250 },
    },

    // Trust & Verification Systems
    {
      id: 'trust-verification',
      position: { x: 650, y: 500 },
      data: { label: '✅ Trust & Verification Systems\n"Cryptographic assurance:\n• Audit trails\n• Compliance indicators\n• Incident response\n• Third-party verification"' },
      style: { ...nodeStyle, background: '#16a34a', minWidth: 250 },
    },

    // Industry Implementations
    {
      id: 'industry-implementations',
      position: { x: 200, y: 650 },
      data: { label: '🏢 Industry Implementations\n"Real-world success:\n• Apple: Privacy nutrition labels\n• Signal: End-to-end encryption\n• DuckDuckGo: No tracking\n• Enterprise: Privacy dashboards"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 280 },
    },

    // Privacy Metrics
    {
      id: 'privacy-metrics',
      position: { x: 600, y: 650 },
      data: { label: '📈 Privacy Metrics & Benefits\n"Measurable outcomes:\n• 97%+ user trust scores\n• 23% reduced compliance costs\n• 40% trust improvement\n• 60% less permission fatigue"' },
      style: { ...nodeStyle, background: '#1e40af', minWidth: 260 },
    },

    // Privacy Innovation
    {
      id: 'privacy-innovation',
      position: { x: 150, y: 800 },
      data: { label: '🚀 Privacy Innovation Trends\n"Emerging technologies:\n• Hybrid privacy approaches\n• VPFL frameworks\n• SmartNIC acceleration\n• Multi-encryption switching"' },
      style: { ...nodeStyle, background: '#86198f', minWidth: 250 },
    },

    // Continuous Privacy Evolution
    {
      id: 'continuous-evolution',
      position: { x: 650, y: 800 },
      data: { label: '🔄 Continuous Privacy Evolution\n"Adaptive improvement:\n• Privacy technology updates\n• Regulatory compliance\n• User feedback integration\n• Threat landscape response"' },
      style: { ...nodeStyle, background: '#0f766e', minWidth: 250 },
    },

    // Core Privacy Principle
    {
      id: 'privacy-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Privacy-First Design Principle\n"Privacy-by-design with transparent data handling achieves 97%+ user trust\nGranular controls with progressive consent reduce permission fatigue by 60%\nAdvanced privacy technologies maintain functionality while ensuring protection"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 480 },
    },
  ],
  initialEdges: [
    // Challenge addressed by core principles
    {
      id: 'e1',
      source: 'privacy-challenge',
      target: 'privacy-by-design',
      ...edgeStyle,
      label: 'addressed by'
    },
    {
      id: 'e2',
      source: 'privacy-challenge',
      target: 'transparent-data-handling',
      ...edgeStyle,
      label: 'solved by'
    },

    // Privacy-by-design foundation
    {
      id: 'e3',
      source: 'privacy-by-design',
      target: 'granular-controls',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e4',
      source: 'privacy-by-design',
      target: 'user-empowerment',
      ...edgeStyle,
      label: 'empowers'
    },
    {
      id: 'e5',
      source: 'privacy-by-design',
      target: 'regulatory-compliance',
      ...edgeStyle,
      label: 'ensures'
    },

    // Transparent data handling connections
    {
      id: 'e6',
      source: 'transparent-data-handling',
      target: 'progressive-consent',
      ...edgeStyle,
      label: 'informs'
    },
    {
      id: 'e7',
      source: 'transparent-data-handling',
      target: 'trust-verification',
      ...edgeStyle,
      label: 'validates'
    },

    // Granular controls implementation
    {
      id: 'e8',
      source: 'granular-controls',
      target: 'user-empowerment',
      ...edgeStyle,
      label: 'integrates'
    },
    {
      id: 'e9',
      source: 'granular-controls',
      target: 'advanced-privacy-tech',
      ...edgeStyle,
      label: 'utilizes'
    },

    // User empowerment connections
    {
      id: 'e10',
      source: 'user-empowerment',
      target: 'privacy-metrics',
      ...edgeStyle,
      label: 'measured by'
    },

    // Advanced privacy technology
    {
      id: 'e11',
      source: 'advanced-privacy-tech',
      target: 'privacy-innovation',
      ...edgeStyle,
      label: 'evolves into'
    },
    {
      id: 'e12',
      source: 'advanced-privacy-tech',
      target: 'trust-verification',
      ...edgeStyle,
      label: 'verified by'
    },

    // Progressive consent flow
    {
      id: 'e13',
      source: 'progressive-consent',
      target: 'regulatory-compliance',
      ...edgeStyle,
      label: 'complies with'
    },

    // Regulatory compliance validation
    {
      id: 'e14',
      source: 'regulatory-compliance',
      target: 'industry-implementations',
      ...edgeStyle,
      label: 'proven in'
    },

    // Trust verification outcomes
    {
      id: 'e15',
      source: 'trust-verification',
      target: 'privacy-metrics',
      ...edgeStyle,
      label: 'generates'
    },

    // Industry success drives innovation
    {
      id: 'e16',
      source: 'industry-implementations',
      target: 'continuous-evolution',
      ...edgeStyle,
      label: 'drives'
    },
    {
      id: 'e17',
      source: 'privacy-metrics',
      target: 'continuous-evolution',
      ...edgeStyle,
      label: 'informs'
    },

    // Innovation feedback loop
    {
      id: 'e18',
      source: 'privacy-innovation',
      target: 'continuous-evolution',
      ...edgeStyle,
      label: 'enables'
    },

    // Cross-connections for reinforcement
    {
      id: 'e19',
      source: 'progressive-consent',
      target: 'privacy-metrics',
      ...edgeStyle,
      label: 'improves'
    },
    {
      id: 'e20',
      source: 'industry-implementations',
      target: 'privacy-innovation',
      ...edgeStyle,
      label: 'inspires'
    },

    // Evolution proves principle
    {
      id: 'e21',
      source: 'continuous-evolution',
      target: 'privacy-principle',
      ...edgeStyle,
      label: 'demonstrates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Privacy & Security Challenge",
      description: "Organizations face the critical challenge of designing agent systems that maintain privacy-first principles while ensuring transparent data handling, granular user controls, and regulatory compliance across diverse use cases and jurisdictions.",
      activeNodes: ['privacy-challenge'],
      activeEdges: []
    },
    {
      title: "Privacy-by-Design Foundation and Transparency",
      description: "Address privacy challenges through foundational privacy-by-design principles embedding data minimization and purpose limitation, combined with transparent data handling that provides real-time visibility into data flows and processing activities.",
      activeNodes: ['privacy-by-design', 'transparent-data-handling'],
      activeEdges: ['e1', 'e2']
    },
    {
      title: "Granular Controls and User Empowerment",
      description: "Privacy-by-design enables granular privacy controls for fine-grained permission management and empowers users through comprehensive dashboards, while ensuring regulatory compliance through proactive design patterns.",
      activeNodes: ['granular-controls', 'user-empowerment', 'regulatory-compliance'],
      activeEdges: ['e3', 'e4', 'e5']
    },
    {
      title: "Progressive Consent and Trust Verification",
      description: "Transparent data handling informs progressive consent flows with just-in-time permissions and validates trust through cryptographic verification systems, while granular controls integrate with user empowerment dashboards.",
      activeNodes: ['progressive-consent', 'trust-verification'],
      activeEdges: ['e6', 'e7', 'e8']
    },
    {
      title: "Advanced Privacy Technologies",
      description: "Granular controls utilize advanced privacy technologies including differential privacy, federated learning, and homomorphic encryption. These technologies are verified by trust systems and user empowerment is measured through comprehensive privacy metrics.",
      activeNodes: ['advanced-privacy-tech', 'privacy-metrics'],
      activeEdges: ['e9', 'e10', 'e12']
    },
    {
      title: "Regulatory Compliance and Industry Success",
      description: "Progressive consent complies with regulatory frameworks, which are proven through industry implementations across major technology companies. Trust verification generates measurable privacy metrics showing significant improvements in user trust and engagement.",
      activeNodes: ['industry-implementations'],
      activeEdges: ['e13', 'e14', 'e15', 'e19']
    },
    {
      title: "Innovation and Continuous Evolution",
      description: "Advanced privacy technologies evolve into cutting-edge innovations like VPFL frameworks and SmartNIC acceleration. Industry implementations and privacy metrics drive continuous evolution that responds to emerging threats and regulatory changes.",
      activeNodes: ['privacy-innovation', 'continuous-evolution'],
      activeEdges: ['e11', 'e16', 'e17', 'e18', 'e20']
    },
    {
      title: "Privacy-First Design Principle Validation",
      description: "Continuous evolution demonstrates the core principle that privacy-by-design with transparent data handling achieves 97%+ user trust, granular controls with progressive consent reduce permission fatigue by 60%, and advanced privacy technologies maintain full functionality while ensuring comprehensive protection.",
      activeNodes: ['privacy-principle'],
      activeEdges: ['e21']
    }
  ],
  metadata: {
    category: 'Privacy & Security',
    complexity: 'Expert',
    estimatedReadTime: '12 minutes',
    tags: ['Privacy-by-Design', 'Data Protection', 'GDPR', 'CCPA', 'User Empowerment', 'Differential Privacy', 'Federated Learning', 'Zero-Knowledge Proofs', 'Regulatory Compliance'],
    lastUpdated: '2024-03-20',
    version: '1.0',
    author: 'Privacy & Security UX Research Team',
    references: [
      'GDPR Article 25 - Data Protection by Design',
      'California Consumer Privacy Act (CCPA)',
      'EU AI Act Privacy Requirements',
      'Apple Privacy Nutrition Labels',
      'Signal Transparency Reports',
      'Differential Privacy Research (Google)',
      'Federated Learning Best Practices'
    ]
  }
}