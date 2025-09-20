import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const accessibilityInAgentDesignPattern: PatternScenario = {
  id: 'accessibility-agent-design',
  title: 'Accessibility in Agent Design',
  description: `Universal design principles for creating inclusive AI agents that support diverse abilities and assistive technologies. This pattern demonstrates how to integrate comprehensive accessibility features from the ground up, ensuring agents work seamlessly with screen readers, voice control, eye tracking, and other assistive technologies.

**Universal Design Principles for AI Agents:**
• **Equitable Use**: Design is usable by people with diverse abilities without special accommodations
• **Flexibility in Use**: Accommodates wide range of preferences and abilities through multiple interaction modes
• **Simple and Intuitive**: Easy to understand regardless of experience, language skills, or concentration level
• **Perceptible Information**: Communicates effectively regardless of ambient conditions or user's sensory abilities
• **Tolerance for Error**: Minimizes hazards of accidental actions and provides error recovery mechanisms
• **Low Physical Effort**: Efficient and comfortable to use with minimal fatigue
• **Size and Space**: Appropriate size and space for approach and use regardless of body size or mobility

**Multi-Modal Accessibility Integration:**
Modern accessibility requires seamless integration across visual, auditory, motor, and cognitive domains. AI agents must provide equivalent functionality through multiple sensory channels while maintaining performance and user experience quality.

**Regulatory Compliance Framework:**
- WCAG 2.1/2.2 Level AA compliance (4.5:1 contrast ratio minimum)
- Section 508 compatibility for government systems
- EN 301 549 European accessibility standards
- ADA Title III compliance for public accommodations
- ISO 14289 for PDF accessibility integration

**Assistive Technology Compatibility:**
- Screen readers (NVDA, JAWS, VoiceOver) with semantic markup
- Voice control systems with speech recognition and natural language processing
- Eye tracking interfaces with gaze-based interaction
- Brain-computer interfaces (BCI) for direct neural control
- Switch navigation for users with motor impairments

**Key Metrics and ROI:**
- Market reach: 1.3 billion people worldwide with disabilities
- Economic impact: $13 trillion global spending power
- ROI: Every $1 invested yields up to $100 in benefits (Forrester Research)
- Legal protection: Reduces average $5,000-$350,000 lawsuit settlements
- SEO benefits: Improved search rankings through semantic structure`,

  initialNodes: [
    {
      id: '1',
      type: 'default',
      position: { x: 300, y: 50 },
      data: {
        label: 'Universal Design Foundation\n7 Core Principles for Inclusive AI Agents\n\n• Equitable Use • Flexibility in Use\n• Simple & Intuitive • Perceptible Information\n• Tolerance for Error • Low Physical Effort\n• Size & Space for Approach'
      },
      style: { ...nodeStyle, minWidth: 320, backgroundColor: '#1e40af', color: 'white', textAlign: 'center' }
    },
    {
      id: '2',
      type: 'default',
      position: { x: 50, y: 200 },
      data: {
        label: 'Visual Accessibility\n\n• WCAG 2.1/2.2 AA (4.5:1 contrast)\n• Color-blind friendly design\n• Dynamic text scaling (up to 200%)\n• High contrast mode support\n• Alternative visual representations\n• Motion sensitivity controls'
      },
      style: { ...nodeStyle, minWidth: 250, backgroundColor: '#7c3aed', color: 'white' }
    },
    {
      id: '3',
      type: 'default',
      position: { x: 350, y: 200 },
      data: {
        label: 'Auditory Accessibility\n\n• Real-time AI captions\n• Audio descriptions\n• Sign language integration\n• Visual transcripts\n• Audio frequency customization\n• Vibro-tactile feedback'
      },
      style: { ...nodeStyle, minWidth: 250, backgroundColor: '#059669', color: 'white' }
    },
    {
      id: '4',
      type: 'default',
      position: { x: 650, y: 200 },
      data: {
        label: 'Motor Accessibility\n\n• Alternative input methods\n• Gesture customization\n• Voice control integration\n• Eye tracking interfaces\n• Switch navigation (48x48dp targets)\n• Timing adjustments'
      },
      style: { ...nodeStyle, minWidth: 250, backgroundColor: '#dc2626', color: 'white' }
    },
    {
      id: '5',
      type: 'default',
      position: { x: 50, y: 380 },
      data: {
        label: 'Cognitive Accessibility\n\n• Clear language processing\n• Memory assistance features\n• Attention management\n• Learning disability support\n• Executive function aids\n• Simplified interaction patterns'
      },
      style: { ...nodeStyle, minWidth: 250, backgroundColor: '#ea580c', color: 'white' }
    },
    {
      id: '6',
      type: 'default',
      position: { x: 350, y: 380 },
      data: {
        label: 'Cultural & Linguistic\n\n• Multilingual support (42+ languages)\n• Cultural context adaptation\n• Reading direction flexibility\n• Regional accessibility standards\n• Indigenous language support\n• Localized interaction patterns'
      },
      style: { ...nodeStyle, minWidth: 250, backgroundColor: '#0891b2', color: 'white' }
    },
    {
      id: '7',
      type: 'default',
      position: { x: 650, y: 380 },
      data: {
        label: 'Assistive Technology\n\n• Screen readers (NVDA, JAWS)\n• Voice control systems\n• Eye tracking (36ms avg latency)\n• Brain-computer interfaces\n• Switch navigation\n• AI-powered adaptations'
      },
      style: { ...nodeStyle, minWidth: 250, backgroundColor: '#7c2d12', color: 'white' }
    },
    {
      id: '8',
      type: 'default',
      position: { x: 200, y: 560 },
      data: {
        label: 'Regulatory Compliance\n\n• WCAG 2.1/2.2 Level AA\n• Section 508 (US Federal)\n• EN 301 549 (European)\n• ADA Title III compliance\n• ISO 14289 (PDF accessibility)'
      },
      style: { ...nodeStyle, minWidth: 250, backgroundColor: '#be185d', color: 'white' }
    },
    {
      id: '9',
      type: 'default',
      position: { x: 500, y: 560 },
      data: {
        label: 'AI-Powered Enhancements\n\n• Real-time adaptation systems\n• Predictive accessibility\n• Context-aware assistance\n• Personalized accommodations\n• Error prevention & correction\n• Multi-modal fusion (EEG + eye tracking)'
      },
      style: { ...nodeStyle, minWidth: 280, backgroundColor: '#166534', color: 'white' }
    },
    {
      id: '10',
      type: 'default',
      position: { x: 350, y: 740 },
      data: {
        label: 'Business Impact & ROI\n\n• Market: 1.3B people globally\n• Economic power: $13T spending\n• ROI: $100 return per $1 invested\n• Legal protection: Avoid $5K-$350K lawsuits\n• SEO benefits: Improved search rankings\n• Brand reputation: Inclusive design leadership'
      },
      style: { ...nodeStyle, minWidth: 320, backgroundColor: '#059669', color: 'white', textAlign: 'center' }
    }
  ],

  initialEdges: [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      style: edgeStyle,
      label: 'Visual Layer'
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3',
      style: edgeStyle,
      label: 'Auditory Layer'
    },
    {
      id: 'e1-4',
      source: '1',
      target: '4',
      style: edgeStyle,
      label: 'Motor Layer'
    },
    {
      id: 'e2-5',
      source: '2',
      target: '5',
      style: edgeStyle,
      label: 'Cognitive Integration'
    },
    {
      id: 'e3-6',
      source: '3',
      target: '6',
      style: edgeStyle,
      label: 'Cultural Adaptation'
    },
    {
      id: 'e4-7',
      source: '4',
      target: '7',
      style: edgeStyle,
      label: 'AT Integration'
    },
    {
      id: 'e5-8',
      source: '5',
      target: '8',
      style: edgeStyle,
      label: 'Compliance Check'
    },
    {
      id: 'e6-8',
      source: '6',
      target: '8',
      style: edgeStyle
    },
    {
      id: 'e7-9',
      source: '7',
      target: '9',
      style: edgeStyle,
      label: 'AI Enhancement'
    },
    {
      id: 'e8-10',
      source: '8',
      target: '10',
      style: edgeStyle,
      label: 'ROI Measurement'
    },
    {
      id: 'e9-10',
      source: '9',
      target: '10',
      style: edgeStyle
    }
  ],

  steps: [
    {
      id: 'step1',
      title: 'Universal Design Foundation',
      description: 'Establish the seven core principles of universal design as the foundation for accessible AI agent development. These principles ensure that accessibility is built into the system architecture from the beginning, not retrofitted later. Research shows that inclusive design from conception is 6x more cost-effective than retrofitting.',
      input: 'AI agent design requirements with accessibility mandate',
      output: 'Universal design framework established with equitable use, flexibility, simplicity, perceptible information, error tolerance, low effort, and appropriate sizing',
      activeNodes: ['1'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Visual Accessibility Implementation',
      description: 'Implement comprehensive visual accessibility features meeting WCAG 2.1/2.2 Level AA standards. This includes 4.5:1 contrast ratios, color-blind friendly design supporting 8% of males and 0.5% of females with color vision deficiency, dynamic text scaling up to 200%, and high contrast mode. These features benefit all users, not just those with visual impairments.',
      input: 'Visual interface components and design elements',
      output: 'WCAG 2.1/2.2 AA compliant visual interface with contrast ratios ≥4.5:1, color-blind friendly palettes, scalable text, and alternative visual representations',
      activeNodes: ['1', '2'],
      activeEdges: ['e1-2']
    },
    {
      id: 'step3',
      title: 'Auditory Accessibility Integration',
      description: 'Deploy AI-powered real-time captioning with 95%+ accuracy, audio descriptions for visual content, sign language integration for the 70 million deaf people worldwide, and visual transcripts. Include vibro-tactile feedback for silent notifications and customizable audio frequency support for hearing aid users.',
      input: 'Audio content, speech interfaces, and sound-based notifications',
      output: 'Multi-modal auditory experience with real-time captions, audio descriptions, sign language support, and haptic feedback alternatives',
      activeNodes: ['1', '3'],
      activeEdges: ['e1-3']
    },
    {
      id: 'step4',
      title: 'Motor Accessibility Adaptation',
      description: 'Implement alternative input methods including voice control with 99%+ recognition accuracy, eye tracking with 36ms average latency, gesture customization, and switch navigation with 48x48dp minimum touch targets. Support brain-computer interfaces for users with severe motor impairments, expanding access to previously unreachable user groups.',
      input: 'Physical interaction requirements and motor accessibility needs',
      output: 'Multi-input system supporting voice, gaze, gesture, switch navigation, and BCI with customizable timing and error prevention',
      activeNodes: ['1', '4'],
      activeEdges: ['e1-4']
    },
    {
      id: 'step5',
      title: 'Cognitive Accessibility Support',
      description: 'Integrate AI-powered clear language processing, memory assistance features that reduce cognitive load by 30%, attention management tools, and learning disability support. Include executive function aids and simplified interaction patterns that benefit users with ADHD, dyslexia, autism, and age-related cognitive changes.',
      input: 'Complex information and interaction patterns requiring cognitive processing',
      output: 'Simplified, clear interfaces with memory aids, attention guidance, and adaptive complexity based on user cognitive profile',
      activeNodes: ['2', '5'],
      activeEdges: ['e2-5']
    },
    {
      id: 'step6',
      title: 'Cultural and Linguistic Accessibility',
      description: 'Deploy multilingual support for 42+ languages including right-to-left reading directions, cultural context adaptation, regional accessibility standards compliance, and indigenous language support. Implement culturally appropriate interaction patterns and localized accessibility features that respect diverse cultural norms.',
      input: 'Global user base with diverse linguistic and cultural backgrounds',
      output: 'Culturally adaptive interface supporting multiple languages, reading directions, and region-specific accessibility standards',
      activeNodes: ['3', '6'],
      activeEdges: ['e3-6']
    },
    {
      id: 'step7',
      title: 'Assistive Technology Integration',
      description: 'Ensure seamless compatibility with leading assistive technologies: NVDA (90% of Windows screen reader users), JAWS (enterprise standard), VoiceOver (Apple ecosystem), voice control systems, eye tracking devices, and emerging brain-computer interfaces. Implement proper semantic markup and ARIA attributes for optimal AT performance.',
      input: 'Interface components requiring assistive technology compatibility',
      output: 'Full AT compatibility with screen readers, voice control, eye tracking, BCI, and switch navigation with semantic markup',
      activeNodes: ['4', '7'],
      activeEdges: ['e4-7']
    },
    {
      id: 'step8',
      title: 'Regulatory Compliance Validation',
      description: 'Validate compliance with international accessibility standards: WCAG 2.1/2.2 Level AA, Section 508 for US federal systems, EN 301 549 for European markets, ADA Title III for public accommodations, and ISO 14289 for PDF accessibility. Use VPAT 2.5 reporting for comprehensive compliance documentation.',
      input: 'Accessibility features and implementations across all modalities',
      output: 'Certified compliance with international standards and comprehensive VPAT 2.5 documentation',
      activeNodes: ['5', '6', '8'],
      activeEdges: ['e5-8', 'e6-8']
    },
    {
      id: 'step9',
      title: 'AI-Powered Enhancement Deployment',
      description: 'Deploy advanced AI features including real-time adaptation systems that learn user preferences, predictive accessibility that anticipates needs, context-aware assistance, and personalized accommodations. Implement multi-modal fusion combining EEG and eye tracking data for enhanced user experience.',
      input: 'User interaction data and accessibility usage patterns',
      output: 'Intelligent accessibility system with real-time adaptation, predictive features, and personalized accommodations',
      activeNodes: ['7', '9'],
      activeEdges: ['e7-9']
    },
    {
      id: 'step10',
      title: 'Business Impact Measurement',
      description: 'Measure and demonstrate ROI through expanded market reach (1.3 billion people with disabilities), economic impact ($13 trillion global spending power), legal risk reduction (avoiding $5,000-$350,000 lawsuit settlements), SEO benefits from semantic structure, and brand reputation enhancement as an inclusive design leader.',
      input: 'Accessibility implementation costs and usage analytics',
      output: 'Comprehensive ROI analysis showing market expansion, legal protection, SEO improvements, and brand value enhancement',
      activeNodes: ['8', '9', '10'],
      activeEdges: ['e8-10', 'e9-10']
    }
  ]
};