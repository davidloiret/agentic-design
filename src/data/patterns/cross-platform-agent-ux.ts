import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const crossPlatformAgentUxPattern: PatternScenario = {
  id: 'cross-platform-agent-ux',
  title: 'Cross-Platform Agent UX',
  description: 'Consistent agent experience patterns across devices and platforms with seamless synchronization and adaptation, achieving 25-40% improvement in user retention and 9,900% UX ROI',
  initialNodes: [
    // Cross-platform challenge
    {
      id: 'crossplatform-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🌐 Cross-Platform Challenge\n"How to deliver consistent agent experiences\nacross diverse devices while adapting to platform\nconventions and maintaining seamless synchronization?"' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 380 },
    },

    // Design System Foundation
    {
      id: 'design-system',
      position: { x: 150, y: 200 },
      data: { label: '🎨 Design System Foundation\n"Cohesive experiences:\n• Design token architecture\n• Universal design language\n• Brand consistency\n• Component-based systems"' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 260 },
    },

    // Platform Adaptation
    {
      id: 'platform-adaptation',
      position: { x: 650, y: 200 },
      data: { label: '📱 Platform Adaptation\n"Platform-specific optimization:\n• Native conventions (HIG, Material)\n• Device capabilities integration\n• Performance optimization\n• Input method adaptation"' },
      style: { ...nodeStyle, background: '#0891b2', minWidth: 260 },
    },

    // Synchronization Engine
    {
      id: 'synchronization-engine',
      position: { x: 100, y: 350 },
      data: { label: '🔄 Synchronization Engine\n"Real-time state management:\n• Event-driven architecture\n• Conversation continuity\n• Context preservation\n• Conflict resolution strategies"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 260 },
    },

    // Device-Specific Interfaces
    {
      id: 'device-interfaces',
      position: { x: 400, y: 350 },
      data: { label: '💻 Device-Specific Interfaces\n"Adaptive layouts:\n• Mobile optimization\n• Desktop scaling\n• Tablet hybrid experiences\n• Smart TV adaptations"' },
      style: { ...nodeStyle, background: '#ea580c', minWidth: 240 },
    },

    // Identity & Continuity
    {
      id: 'identity-continuity',
      position: { x: 700, y: 350 },
      data: { label: '👤 Identity & Continuity\n"Cross-device persistence:\n• SCIM standardization\n• Syncable passkeys (AAL2)\n• Profile synchronization\n• Preference management"' },
      style: { ...nodeStyle, background: '#be185d', minWidth: 240 },
    },

    // Multi-Modal Interactions
    {
      id: 'multimodal-interactions',
      position: { x: 150, y: 500 },
      data: { label: '🎙️ Multi-Modal Interactions\n"Adaptive input methods:\n• Touch vs mouse interfaces\n• Voice interaction (27% growth)\n• Gesture recognition (17% growth)\n• Keyboard navigation"' },
      style: { ...nodeStyle, background: '#16a34a', minWidth: 260 },
    },

    // Performance Optimization
    {
      id: 'performance-optimization',
      position: { x: 400, y: 500 },
      data: { label: '⚡ Performance Optimization\n"Platform-specific efficiency:\n• Network adaptation\n• Resource management\n• Battery optimization\n• Hardware acceleration"' },
      style: { ...nodeStyle, background: '#0369a1', minWidth: 240 },
    },

    // Accessibility Integration
    {
      id: 'accessibility-integration',
      position: { x: 650, y: 500 },
      data: { label: '♿ Accessibility Integration\n"Inclusive experiences:\n• Platform accessibility APIs\n• Cross-platform screen readers\n• AI-powered assistive tech\n• WCAG 2.1 compliance"' },
      style: { ...nodeStyle, background: '#7c2d12', minWidth: 250 },
    },

    // Development Frameworks
    {
      id: 'development-frameworks',
      position: { x: 200, y: 650 },
      data: { label: '🛠️ Development Frameworks\n"Implementation efficiency:\n• Flutter, React Native\n• Kotlin Multiplatform\n• Progressive Web Apps\n• 37% development time reduction"' },
      style: { ...nodeStyle, background: '#86198f', minWidth: 270 },
    },

    // Industry Success Stories
    {
      id: 'industry-success',
      position: { x: 600, y: 650 },
      data: { label: '🏢 Industry Success Stories\n"Real-world implementations:\n• Microsoft 365 ecosystem\n• Google Workspace consistency\n• Slack cross-platform experience\n• WhatsApp multi-device support"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 280 },
    },

    // Business Impact
    {
      id: 'business-impact',
      position: { x: 150, y: 800 },
      data: { label: '💰 Business Impact\n"Measurable outcomes:\n• 9,900% UX ROI ($100 per $1)\n• 25-40% retention improvement\n• 30-50% development cost reduction\n• Enhanced user satisfaction"' },
      style: { ...nodeStyle, background: '#0f766e', minWidth: 280 },
    },

    // Future Evolution
    {
      id: 'future-evolution',
      position: { x: 650, y: 800 },
      data: { label: '🚀 Future Evolution\n"Emerging trends:\n• Brain-computer interfaces\n• Spatial computing integration\n• AI-powered adaptations\n• Context-aware experiences"' },
      style: { ...nodeStyle, background: '#1e40af', minWidth: 250 },
    },

    // Core Cross-Platform Principle
    {
      id: 'crossplatform-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Cross-Platform UX Principle\n"Cohesive adaptation: Design systems with platform-specific optimizations achieve 40% retention gains\nSeamless synchronization enables continuous user experiences across all devices\nUniversal accessibility with multi-modal interactions creates inclusive agent experiences"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 550 },
    },
  ],
  initialEdges: [
    // Challenge addressed by foundation systems
    {
      id: 'e1',
      source: 'crossplatform-challenge',
      target: 'design-system',
      ...edgeStyle,
      label: 'requires'
    },
    {
      id: 'e2',
      source: 'crossplatform-challenge',
      target: 'platform-adaptation',
      ...edgeStyle,
      label: 'needs'
    },

    // Foundation enables core capabilities
    {
      id: 'e3',
      source: 'design-system',
      target: 'synchronization-engine',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e4',
      source: 'design-system',
      target: 'device-interfaces',
      ...edgeStyle,
      label: 'guides'
    },
    {
      id: 'e5',
      source: 'platform-adaptation',
      target: 'identity-continuity',
      ...edgeStyle,
      label: 'supports'
    },

    // Core systems integration
    {
      id: 'e6',
      source: 'synchronization-engine',
      target: 'multimodal-interactions',
      ...edgeStyle,
      label: 'coordinates'
    },
    {
      id: 'e7',
      source: 'device-interfaces',
      target: 'performance-optimization',
      ...edgeStyle,
      label: 'optimizes'
    },
    {
      id: 'e8',
      source: 'identity-continuity',
      target: 'accessibility-integration',
      ...edgeStyle,
      label: 'ensures'
    },

    // Implementation and deployment
    {
      id: 'e9',
      source: 'multimodal-interactions',
      target: 'development-frameworks',
      ...edgeStyle,
      label: 'implemented via'
    },
    {
      id: 'e10',
      source: 'performance-optimization',
      target: 'development-frameworks',
      ...edgeStyle,
      label: 'achieved through'
    },
    {
      id: 'e11',
      source: 'accessibility-integration',
      target: 'industry-success',
      ...edgeStyle,
      label: 'proven in'
    },

    // Business outcomes and innovation
    {
      id: 'e12',
      source: 'development-frameworks',
      target: 'business-impact',
      ...edgeStyle,
      label: 'drives'
    },
    {
      id: 'e13',
      source: 'industry-success',
      target: 'business-impact',
      ...edgeStyle,
      label: 'generates'
    },
    {
      id: 'e14',
      source: 'industry-success',
      target: 'future-evolution',
      ...edgeStyle,
      label: 'inspires'
    },

    // Cross-connections for reinforcement
    {
      id: 'e15',
      source: 'platform-adaptation',
      target: 'device-interfaces',
      ...edgeStyle,
      label: 'informs'
    },
    {
      id: 'e16',
      source: 'synchronization-engine',
      target: 'identity-continuity',
      ...edgeStyle,
      label: 'maintains'
    },
    {
      id: 'e17',
      source: 'device-interfaces',
      target: 'multimodal-interactions',
      ...edgeStyle,
      label: 'supports'
    },
    {
      id: 'e18',
      source: 'performance-optimization',
      target: 'accessibility-integration',
      ...edgeStyle,
      label: 'enhances'
    },
    {
      id: 'e19',
      source: 'business-impact',
      target: 'future-evolution',
      ...edgeStyle,
      label: 'funds'
    },

    // Future validates principle
    {
      id: 'e20',
      source: 'future-evolution',
      target: 'crossplatform-principle',
      ...edgeStyle,
      label: 'demonstrates',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e21',
      source: 'business-impact',
      target: 'crossplatform-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Cross-Platform Design Challenge",
      description: "Organizations need to deliver consistent agent experiences across diverse devices while adapting to platform conventions, maintaining performance, and ensuring seamless synchronization of user context and preferences.",
      activeNodes: ['crossplatform-challenge'],
      activeEdges: []
    },
    {
      title: "Foundation Systems Architecture",
      description: "Address cross-platform challenges through robust design system foundations using design token architecture and universal design language, combined with platform adaptation strategies that respect native conventions while maintaining brand consistency.",
      activeNodes: ['design-system', 'platform-adaptation'],
      activeEdges: ['e1', 'e2']
    },
    {
      title: "Core Platform Capabilities",
      description: "Design systems enable synchronization engines for real-time state management and guide device-specific interfaces. Platform adaptation supports identity continuity through SCIM standardization and syncable passkeys, while informing device interface design.",
      activeNodes: ['synchronization-engine', 'device-interfaces', 'identity-continuity'],
      activeEdges: ['e3', 'e4', 'e5', 'e15', 'e16']
    },
    {
      title: "Interaction and Performance Integration",
      description: "Synchronization engines coordinate multi-modal interactions across touch, voice, and gesture inputs. Device interfaces optimize performance through platform-specific resource management. Identity continuity ensures accessibility integration across all platforms and user needs.",
      activeNodes: ['multimodal-interactions', 'performance-optimization', 'accessibility-integration'],
      activeEdges: ['e6', 'e7', 'e8', 'e17', 'e18']
    },
    {
      title: "Development and Industry Implementation",
      description: "Multi-modal interactions and performance optimization are implemented through development frameworks like Flutter, React Native, and Progressive Web Apps, achieving 37% development time reduction. Accessibility integration is proven across industry success stories like Microsoft 365 and Google Workspace.",
      activeNodes: ['development-frameworks', 'industry-success'],
      activeEdges: ['e9', 'e10', 'e11']
    },
    {
      title: "Business Impact and Innovation",
      description: "Development frameworks drive measurable business impact including 9,900% UX ROI and 25-40% retention improvements. Industry success generates substantial business value while inspiring future evolution including brain-computer interfaces and spatial computing integration.",
      activeNodes: ['business-impact', 'future-evolution'],
      activeEdges: ['e12', 'e13', 'e14', 'e19']
    },
    {
      title: "Cross-Platform UX Principle Validation",
      description: "Future evolution and business impact validate the core principle that cohesive adaptation through design systems with platform-specific optimizations achieves significant retention gains, seamless synchronization enables continuous experiences, and universal accessibility creates inclusive agent interactions.",
      activeNodes: ['crossplatform-principle'],
      activeEdges: ['e20', 'e21']
    }
  ],
  metadata: {
    category: 'User Experience Design',
    complexity: 'Expert',
    estimatedReadTime: '13 minutes',
    tags: ['Cross Platform', 'Synchronization', 'Design Systems', 'Platform Adaptation', 'Multi Modal', 'Identity Management', 'Performance', 'Accessibility', 'Development Frameworks'],
    lastUpdated: '2024-03-20',
    version: '1.0',
    author: 'Cross-Platform UX Research Team',
    references: [
      'Apple Human Interface Guidelines',
      'Material Design Cross-Platform Guidelines',
      'Microsoft Fluent Design System',
      'SCIM 2.0 Identity Management Standard',
      'WCAG 2.1 Accessibility Guidelines',
      'React Native Best Practices',
      'Flutter Cross-Platform Framework',
      'Progressive Web App Standards'
    ]
  }
}