import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const accessibilityAgentDesignPattern: PatternScenario = {
  id: 'accessibility-agent-design',
  title: 'Accessibility in Agent Design',
  description: 'Universal design patterns for accessible agent interfaces supporting diverse abilities and assistive technologies achieving 100% WCAG compliance and $100 ROI per $1 invested',
  initialNodes: [
    // Accessibility challenge
    {
      id: 'accessibility-challenge',
      position: { x: 400, y: 50 },
      data: { label: '♿ Accessibility Challenge\n"How to design agent interfaces that serve\n1.3 billion people with disabilities while meeting\nWCAG 2.2 standards and business goals?"' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 380 },
    },

    // Universal Design Foundation
    {
      id: 'universal-design',
      position: { x: 400, y: 200 },
      data: { label: '🌍 Universal Design Foundation\n"Seven core principles:\n• Equitable use for all\n• Flexibility in interaction\n• Simple and intuitive\n• Perceptible information"' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 280 },
    },

    // Visual Accessibility
    {
      id: 'visual-accessibility',
      position: { x: 100, y: 350 },
      data: { label: '👁️ Visual Accessibility\n"WCAG compliance:\n• 4.5:1 contrast ratio\n• Color-blind support (8% males)\n• 200% text scaling\n• High contrast modes"' },
      style: { ...nodeStyle, background: '#0891b2', minWidth: 240 },
    },

    // Auditory Accessibility
    {
      id: 'auditory-accessibility',
      position: { x: 350, y: 350 },
      data: { label: '🔊 Auditory Accessibility\n"Multi-sensory support:\n• Real-time captions (95% accuracy)\n• Audio descriptions\n• Sign language integration\n• Haptic feedback alternatives"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },

    // Motor Accessibility
    {
      id: 'motor-accessibility',
      position: { x: 600, y: 350 },
      data: { label: '🤲 Motor Accessibility\n"Alternative inputs:\n• Voice control (99% accuracy)\n• Eye tracking (36ms latency)\n• Switch navigation\n• Gesture customization"' },
      style: { ...nodeStyle, background: '#ea580c', minWidth: 240 },
    },

    // Cognitive Accessibility
    {
      id: 'cognitive-accessibility',
      position: { x: 850, y: 350 },
      data: { label: '🧠 Cognitive Accessibility\n"Mental support:\n• Clear language patterns\n• Memory assistance (30% reduction)\n• Attention management\n• Executive function aids"' },
      style: { ...nodeStyle, background: '#be185d', minWidth: 240 },
    },

    // Assistive Technology Integration
    {
      id: 'assistive-tech',
      position: { x: 150, y: 500 },
      data: { label: '🦾 Assistive Technology\n"Integration standards:\n• Screen readers (NVDA, JAWS)\n• Voice control systems\n• BCI interfaces\n• Switch navigation (48x48dp)"' },
      style: { ...nodeStyle, background: '#16a34a', minWidth: 240 },
    },

    // Cultural Linguistic Access
    {
      id: 'cultural-linguistic',
      position: { x: 400, y: 500 },
      data: { label: '🌐 Cultural & Linguistic Access\n"Global inclusivity:\n• 42+ language support\n• Right-to-left reading\n• Indigenous languages\n• Regional standards (EN 301 549)"' },
      style: { ...nodeStyle, background: '#0369a1', minWidth: 250 },
    },

    // AI-Powered Accessibility
    {
      id: 'ai-powered-features',
      position: { x: 650, y: 500 },
      data: { label: '🤖 AI-Powered Accessibility\n"Intelligent adaptation:\n• Real-time personalization\n• Predictive assistance\n• Context-aware support\n• Automatic descriptions"' },
      style: { ...nodeStyle, background: '#7c2d12', minWidth: 240 },
    },

    // Regulatory Compliance
    {
      id: 'regulatory-compliance',
      position: { x: 200, y: 650 },
      data: { label: '⚖️ Regulatory Compliance\n"Legal requirements:\n• WCAG 2.1/2.2 AA level\n• Section 508 (US Federal)\n• ADA Title III compliance\n• ISO 14289 standards"' },
      style: { ...nodeStyle, background: '#86198f', minWidth: 250 },
    },

    // Business Impact & ROI
    {
      id: 'business-impact',
      position: { x: 600, y: 650 },
      data: { label: '💰 Business Impact & ROI\n"Measurable benefits:\n• $100 return per $1 invested\n• $13T global spending power\n• Reduced legal risk ($5K-$350K)\n• 50% organic traffic increase"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 260 },
    },

    // Industry Success Stories
    {
      id: 'industry-success',
      position: { x: 150, y: 800 },
      data: { label: '🏆 Industry Success Stories\n"Real-world impact:\n• Microsoft: Copilot accessibility\n• Apple: Vision Pro visionOS\n• Google: Live Caption 40+ languages\n• Tesco: £35K → £13M annual sales"' },
      style: { ...nodeStyle, background: '#0f766e', minWidth: 280 },
    },

    // Emerging Technologies
    {
      id: 'emerging-tech',
      position: { x: 650, y: 800 },
      data: { label: '🚀 Emerging Technologies\n"Future innovations:\n• Hybrid BCI systems\n• Real-time AI translation\n• Predictive accessibility\n• Context-aware adaptation"' },
      style: { ...nodeStyle, background: '#1e40af', minWidth: 250 },
    },

    // Core Accessibility Principle
    {
      id: 'accessibility-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Universal Design Principle\n"Accessible design benefits everyone: 100% WCAG compliance achieves $100 ROI per $1\nUniversal design reduces cognitive load by 30% for all users\nInclusive interfaces expand market reach to 1.3 billion people with disabilities"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 520 },
    },
  ],
  initialEdges: [
    // Challenge addressed by universal design
    {
      id: 'e1',
      source: 'accessibility-challenge',
      target: 'universal-design',
      ...edgeStyle,
      label: 'solved by'
    },

    // Universal design enables accessibility domains
    {
      id: 'e2',
      source: 'universal-design',
      target: 'visual-accessibility',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e3',
      source: 'universal-design',
      target: 'auditory-accessibility',
      ...edgeStyle,
      label: 'supports'
    },
    {
      id: 'e4',
      source: 'universal-design',
      target: 'motor-accessibility',
      ...edgeStyle,
      label: 'facilitates'
    },
    {
      id: 'e5',
      source: 'universal-design',
      target: 'cognitive-accessibility',
      ...edgeStyle,
      label: 'enhances'
    },

    // Accessibility domains integrate with assistive technology
    {
      id: 'e6',
      source: 'visual-accessibility',
      target: 'assistive-tech',
      ...edgeStyle,
      label: 'integrates'
    },
    {
      id: 'e7',
      source: 'motor-accessibility',
      target: 'assistive-tech',
      ...edgeStyle,
      label: 'utilizes'
    },

    // Cultural and AI-powered features
    {
      id: 'e8',
      source: 'auditory-accessibility',
      target: 'cultural-linguistic',
      ...edgeStyle,
      label: 'includes'
    },
    {
      id: 'e9',
      source: 'cognitive-accessibility',
      target: 'ai-powered-features',
      ...edgeStyle,
      label: 'leverages'
    },
    {
      id: 'e10',
      source: 'assistive-tech',
      target: 'ai-powered-features',
      ...edgeStyle,
      label: 'enhanced by'
    },

    // Compliance and business impact
    {
      id: 'e11',
      source: 'visual-accessibility',
      target: 'regulatory-compliance',
      ...edgeStyle,
      label: 'ensures'
    },
    {
      id: 'e12',
      source: 'cultural-linguistic',
      target: 'regulatory-compliance',
      ...edgeStyle,
      label: 'meets'
    },
    {
      id: 'e13',
      source: 'regulatory-compliance',
      target: 'business-impact',
      ...edgeStyle,
      label: 'drives'
    },

    // Success stories and innovation
    {
      id: 'e14',
      source: 'ai-powered-features',
      target: 'industry-success',
      ...edgeStyle,
      label: 'proven in'
    },
    {
      id: 'e15',
      source: 'business-impact',
      target: 'industry-success',
      ...edgeStyle,
      label: 'evidenced by'
    },
    {
      id: 'e16',
      source: 'industry-success',
      target: 'emerging-tech',
      ...edgeStyle,
      label: 'inspires'
    },
    {
      id: 'e17',
      source: 'ai-powered-features',
      target: 'emerging-tech',
      ...edgeStyle,
      label: 'evolves into'
    },

    // Cross-connections for reinforcement
    {
      id: 'e18',
      source: 'motor-accessibility',
      target: 'cultural-linguistic',
      ...edgeStyle,
      label: 'adapts to'
    },
    {
      id: 'e19',
      source: 'auditory-accessibility',
      target: 'ai-powered-features',
      ...edgeStyle,
      label: 'powered by'
    },
    {
      id: 'e20',
      source: 'emerging-tech',
      target: 'business-impact',
      ...edgeStyle,
      label: 'multiplies'
    },

    // Evolution proves principle
    {
      id: 'e21',
      source: 'emerging-tech',
      target: 'accessibility-principle',
      ...edgeStyle,
      label: 'demonstrates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e22',
      source: 'business-impact',
      target: 'accessibility-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Accessibility Challenge in Agent Design",
      description: "Organizations face the critical challenge of designing agent interfaces that serve 1.3 billion people with disabilities while meeting WCAG 2.2 standards, avoiding legal risks, and achieving business objectives across diverse global markets.",
      activeNodes: ['accessibility-challenge'],
      activeEdges: []
    },
    {
      title: "Universal Design Foundation",
      description: "Address accessibility challenges through universal design principles that create equitable use, flexible interaction modes, simple interfaces, and perceptible information systems that benefit all users regardless of abilities.",
      activeNodes: ['universal-design'],
      activeEdges: ['e1']
    },
    {
      title: "Core Accessibility Domains",
      description: "Universal design enables comprehensive accessibility across four critical domains: visual accessibility with 4.5:1 contrast ratios, auditory accessibility with real-time captions, motor accessibility with alternative inputs, and cognitive accessibility with clear language patterns.",
      activeNodes: ['visual-accessibility', 'auditory-accessibility', 'motor-accessibility', 'cognitive-accessibility'],
      activeEdges: ['e2', 'e3', 'e4', 'e5']
    },
    {
      title: "Assistive Technology Integration",
      description: "Visual and motor accessibility integrate with assistive technologies including screen readers (NVDA, JAWS), voice control systems with 99% accuracy, eye tracking with 36ms latency, and switch navigation with 48x48dp minimum targets.",
      activeNodes: ['assistive-tech'],
      activeEdges: ['e6', 'e7']
    },
    {
      title: "Cultural and AI-Powered Enhancement",
      description: "Auditory accessibility includes cultural and linguistic support for 42+ languages and right-to-left reading, while cognitive accessibility leverages AI-powered features for real-time personalization and predictive assistance. Assistive technology is enhanced by AI capabilities.",
      activeNodes: ['cultural-linguistic', 'ai-powered-features'],
      activeEdges: ['e8', 'e9', 'e10']
    },
    {
      title: "Regulatory Compliance and Business Impact",
      description: "Visual accessibility and cultural/linguistic support ensure regulatory compliance with WCAG 2.1/2.2, Section 508, and international standards. Compliance drives measurable business impact with $100 ROI per $1 invested and access to $13 trillion global spending power.",
      activeNodes: ['regulatory-compliance', 'business-impact'],
      activeEdges: ['e11', 'e12', 'e13', 'e18']
    },
    {
      title: "Industry Success and Innovation",
      description: "AI-powered features and business impact are proven through industry success stories like Microsoft's Copilot accessibility, Apple's Vision Pro visionOS, and Google's Live Caption. Success stories inspire emerging technologies while AI features evolve into cutting-edge innovations.",
      activeNodes: ['industry-success', 'emerging-tech'],
      activeEdges: ['e14', 'e15', 'e16', 'e17', 'e19']
    },
    {
      title: "Universal Design Principle Validation",
      description: "Emerging technologies multiply business impact and both validate the core principle that accessible design benefits everyone. Universal design achieves 100% WCAG compliance with $100 ROI per $1 invested, reduces cognitive load by 30% for all users, and expands market reach to 1.3 billion people.",
      activeNodes: ['accessibility-principle'],
      activeEdges: ['e20', 'e21', 'e22']
    }
  ],
  metadata: {
    category: 'Accessibility & Inclusion',
    complexity: 'Expert',
    estimatedReadTime: '15 minutes',
    tags: ['Universal Design', 'WCAG Compliance', 'Assistive Technology', 'Screen Readers', 'Voice Control', 'Motor Accessibility', 'Cognitive Support', 'Cultural Accessibility', 'AI Enhancement', 'Business ROI'],
    lastUpdated: '2024-03-20',
    version: '1.0',
    author: 'Accessibility & Inclusive Design Research Team',
    references: [
      'WCAG 2.1/2.2 Guidelines',
      'Section 508 Accessibility Standards',
      'ADA Title III Requirements',
      'EN 301 549 European Standard',
      'Microsoft Inclusive Design Toolkit',
      'Apple Accessibility Human Interface Guidelines',
      'Google Material Design Accessibility',
      'WebAIM Accessibility Resources'
    ]
  }
}