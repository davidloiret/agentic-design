import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const chatInterfacePatternsPattern: PatternScenario = {
  id: 'chat-interface-patterns',
  title: 'Chat Interface Patterns',
  description: 'Modern conversational UI/UX design patterns for AI agents and chatbots achieving 82% user satisfaction through multi-modal accessibility, rich content, and performance optimization',
  initialNodes: [
    // Chat interface challenge
    {
      id: 'chat-challenge',
      position: { x: 400, y: 50 },
      data: { label: '💬 Chat Interface Challenge\n"How to design conversational interfaces that feel\nnatural, accessible, and engaging while supporting\nrich content and multi-modal interactions?"' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 380 },
    },

    // Core Interface Components
    {
      id: 'core-components',
      position: { x: 150, y: 200 },
      data: { label: '🧩 Core Interface Components\n"Essential elements:\n• Message bubbles & threading\n• Input field design & states\n• Typing indicators & presence\n• Status indicators & history"' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 260 },
    },

    // Conversational Flow
    {
      id: 'conversational-flow',
      position: { x: 650, y: 200 },
      data: { label: '🔄 Conversational Flow\n"Natural dialogue:\n• Turn-taking mechanics\n• Context switching\n• Multi-turn management\n• Conversation repair"' },
      style: { ...nodeStyle, background: '#0891b2', minWidth: 240 },
    },

    // Rich Content Types
    {
      id: 'rich-content',
      position: { x: 100, y: 350 },
      data: { label: '🎨 Rich Content Types\n"Beyond text messaging:\n• Interactive elements (200% engagement)\n• Rich media integration\n• Code blocks & syntax highlighting\n• Structured data presentation"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 260 },
    },

    // User Experience Patterns
    {
      id: 'ux-patterns',
      position: { x: 400, y: 350 },
      data: { label: '✨ User Experience Patterns\n"Seamless interactions:\n• Progressive disclosure\n• Quick replies (13 max)\n• Loading states (<300ms)\n• Error handling & recovery"' },
      style: { ...nodeStyle, background: '#ea580c', minWidth: 240 },
    },

    // Multi-Modal Input
    {
      id: 'multimodal-input',
      position: { x: 700, y: 350 },
      data: { label: '🎙️ Multi-Modal Input\n"Cross-modal fusion:\n• Voice & text integration\n• Gesture recognition\n• Touch interactions\n• Real-time synchronization"' },
      style: { ...nodeStyle, background: '#be185d', minWidth: 240 },
    },

    // Accessibility Features
    {
      id: 'accessibility',
      position: { x: 150, y: 500 },
      data: { label: '♿ Accessibility Features\n"Inclusive design:\n• WCAG 2.2 compliance\n• Screen reader support\n• Keyboard navigation\n• Alternative input methods"' },
      style: { ...nodeStyle, background: '#16a34a', minWidth: 240 },
    },

    // Trust & Safety
    {
      id: 'trust-safety',
      position: { x: 400, y: 500 },
      data: { label: '🛡️ Trust & Safety\n"Secure conversations:\n• Content moderation (AI + human)\n• Privacy controls\n• User verification\n• Report & block functionality"' },
      style: { ...nodeStyle, background: '#0369a1', minWidth: 250 },
    },

    // Performance Optimization
    {
      id: 'performance',
      position: { x: 650, y: 500 },
      data: { label: '⚡ Performance Optimization\n"High-speed interactions:\n• Sub-millisecond latency\n• Cursor-based pagination\n• WebSocket real-time sync\n• CDN distribution"' },
      style: { ...nodeStyle, background: '#7c2d12', minWidth: 240 },
    },

    // Cross-Platform Design
    {
      id: 'cross-platform',
      position: { x: 200, y: 650 },
      data: { label: '📱 Cross-Platform Design\n"Unified experience:\n• Responsive layouts\n• Mobile-first approach\n• Platform adaptations\n• Offline capabilities"' },
      style: { ...nodeStyle, background: '#86198f', minWidth: 250 },
    },

    // Industry Applications
    {
      id: 'industry-applications',
      position: { x: 600, y: 650 },
      data: { label: '🏢 Industry Applications\n"Real-world success:\n• AI assistants (ChatGPT, Claude)\n• Collaboration tools (Slack, Teams)\n• Messaging apps (WhatsApp)\n• Customer service widgets"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 270 },
    },

    // Business Impact
    {
      id: 'business-impact',
      position: { x: 150, y: 800 },
      data: { label: '💰 Business Impact\n"Measurable outcomes:\n• $34B market by 2024\n• 82% user satisfaction\n• 3 hours/week productivity gains\n• $129.4M annual ROI"' },
      style: { ...nodeStyle, background: '#0f766e', minWidth: 250 },
    },

    // Future Innovations
    {
      id: 'future-innovations',
      position: { x: 650, y: 800 },
      data: { label: '🚀 Future Innovations\n"Next generation:\n• Emotional intelligence\n• Advanced AI cards\n• Immersive experiences\n• Context-aware adaptation"' },
      style: { ...nodeStyle, background: '#1e40af', minWidth: 250 },
    },

    // Core Chat Design Principle
    {
      id: 'chat-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Chat Interface Design Principle\n"Natural conversation: Multi-modal accessibility with rich content achieves 82% satisfaction\nPerformance optimization with trust & safety enables enterprise-scale deployment\nUser-centered patterns deliver measurable productivity gains and business ROI"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 520 },
    },
  ],
  initialEdges: [
    // Challenge addressed by core components
    {
      id: 'e1',
      source: 'chat-challenge',
      target: 'core-components',
      ...edgeStyle,
      label: 'requires'
    },
    {
      id: 'e2',
      source: 'chat-challenge',
      target: 'conversational-flow',
      ...edgeStyle,
      label: 'needs'
    },

    // Core components enable rich interactions
    {
      id: 'e3',
      source: 'core-components',
      target: 'rich-content',
      ...edgeStyle,
      label: 'supports'
    },
    {
      id: 'e4',
      source: 'core-components',
      target: 'ux-patterns',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e5',
      source: 'conversational-flow',
      target: 'multimodal-input',
      ...edgeStyle,
      label: 'facilitates'
    },

    // User experience integration
    {
      id: 'e6',
      source: 'rich-content',
      target: 'accessibility',
      ...edgeStyle,
      label: 'includes'
    },
    {
      id: 'e7',
      source: 'ux-patterns',
      target: 'trust-safety',
      ...edgeStyle,
      label: 'incorporates'
    },
    {
      id: 'e8',
      source: 'multimodal-input',
      target: 'performance',
      ...edgeStyle,
      label: 'optimizes'
    },

    // Platform and deployment considerations
    {
      id: 'e9',
      source: 'accessibility',
      target: 'cross-platform',
      ...edgeStyle,
      label: 'ensures'
    },
    {
      id: 'e10',
      source: 'trust-safety',
      target: 'industry-applications',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e11',
      source: 'performance',
      target: 'industry-applications',
      ...edgeStyle,
      label: 'powers'
    },

    // Business outcomes and innovation
    {
      id: 'e12',
      source: 'cross-platform',
      target: 'business-impact',
      ...edgeStyle,
      label: 'drives'
    },
    {
      id: 'e13',
      source: 'industry-applications',
      target: 'business-impact',
      ...edgeStyle,
      label: 'generates'
    },
    {
      id: 'e14',
      source: 'industry-applications',
      target: 'future-innovations',
      ...edgeStyle,
      label: 'inspires'
    },

    // Cross-connections for reinforcement
    {
      id: 'e15',
      source: 'conversational-flow',
      target: 'ux-patterns',
      ...edgeStyle,
      label: 'improves'
    },
    {
      id: 'e16',
      source: 'multimodal-input',
      target: 'accessibility',
      ...edgeStyle,
      label: 'enhances'
    },
    {
      id: 'e17',
      source: 'performance',
      target: 'cross-platform',
      ...edgeStyle,
      label: 'supports'
    },
    {
      id: 'e18',
      source: 'business-impact',
      target: 'future-innovations',
      ...edgeStyle,
      label: 'funds'
    },

    // Future validates principle
    {
      id: 'e19',
      source: 'future-innovations',
      target: 'chat-principle',
      ...edgeStyle,
      label: 'demonstrates',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e20',
      source: 'business-impact',
      target: 'chat-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Chat Interface Design Challenge",
      description: "Organizations need conversational interfaces that feel natural and engaging while supporting rich content, multi-modal interactions, accessibility requirements, and enterprise-scale performance across diverse platforms and use cases.",
      activeNodes: ['chat-challenge'],
      activeEdges: []
    },
    {
      title: "Foundation Components and Flow",
      description: "Chat interfaces require core components including message bubbles, input fields, typing indicators, and status systems. These must support natural conversational flow with turn-taking mechanics, context switching, and multi-turn dialogue management.",
      activeNodes: ['core-components', 'conversational-flow'],
      activeEdges: ['e1', 'e2']
    },
    {
      title: "Rich Content and User Experience",
      description: "Core components support rich content types including interactive elements that increase engagement by 200%, while enabling user experience patterns like progressive disclosure, quick replies (maximum 13), and sub-300ms loading states. Conversational flow facilitates multi-modal input integration.",
      activeNodes: ['rich-content', 'ux-patterns', 'multimodal-input'],
      activeEdges: ['e3', 'e4', 'e5', 'e15']
    },
    {
      title: "Accessibility, Safety, and Performance",
      description: "Rich content includes accessibility features for WCAG 2.2 compliance and screen reader support. User experience patterns incorporate trust and safety measures including AI-powered content moderation. Multi-modal input requires performance optimization for real-time synchronization and sub-millisecond latency.",
      activeNodes: ['accessibility', 'trust-safety', 'performance'],
      activeEdges: ['e6', 'e7', 'e8', 'e16']
    },
    {
      title: "Cross-Platform Deployment",
      description: "Accessibility ensures cross-platform compatibility with responsive layouts and mobile-first design. Trust & safety and performance optimization enable industry applications across AI assistants, collaboration tools, messaging apps, and customer service platforms.",
      activeNodes: ['cross-platform', 'industry-applications'],
      activeEdges: ['e9', 'e10', 'e11', 'e17']
    },
    {
      title: "Business Impact and Innovation",
      description: "Cross-platform design and industry applications drive measurable business impact including $34B market size, 82% user satisfaction, and $129.4M annual ROI. Success in industry applications inspires future innovations while business impact funds continued advancement.",
      activeNodes: ['business-impact', 'future-innovations'],
      activeEdges: ['e12', 'e13', 'e14', 'e18']
    },
    {
      title: "Chat Interface Design Principle Validation",
      description: "Future innovations and business impact validate the core principle that natural conversation through multi-modal accessibility and rich content achieves 82% user satisfaction, performance optimization with trust & safety enables enterprise deployment, and user-centered patterns deliver measurable ROI.",
      activeNodes: ['chat-principle'],
      activeEdges: ['e19', 'e20']
    }
  ],
  metadata: {
    category: 'User Interface Design',
    complexity: 'Advanced',
    estimatedReadTime: '12 minutes',
    tags: ['Conversational UI', 'Chat Interface', 'Multi-Modal Input', 'Rich Content', 'Accessibility', 'Performance', 'Trust Safety', 'Cross Platform', 'User Experience'],
    lastUpdated: '2024-03-20',
    version: '1.0',
    author: 'Chat Interface Design Team',
    references: [
      'WCAG 2.2 Accessibility Guidelines',
      'Material Design Conversation Guidelines',
      'Apple Human Interface Guidelines - Messages',
      'Microsoft Fluent UI Chat Patterns',
      'Rich Communication Services (RCS) Standards',
      'Web Speech API Documentation',
      'Real-time Communication Best Practices',
      'Digital Services Act Compliance (2024)'
    ]
  }
}