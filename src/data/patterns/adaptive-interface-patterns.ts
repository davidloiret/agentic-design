import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const adaptiveInterfacePatternsPattern: PatternScenario = {
  id: 'adaptive-interface-patterns',
  title: 'Adaptive Interface Patterns',
  description: 'Dynamic UI/UX adaptation and personalization patterns that customize agent interfaces based on user context, behavior, and preferences achieving 40% revenue increase',
  initialNodes: [
    // Static interface limitations
    {
      id: 'static-interface-limitations',
      position: { x: 400, y: 50 },
      data: { label: '📱 Static Interface Limitations\n"How to create interfaces that\nadapt dynamically to user context,\npreferences, and behavior patterns?"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 320 },
    },

    // Adaptive interface framework
    {
      id: 'adaptive-interface-framework',
      position: { x: 400, y: 200 },
      data: { label: '🔄 Adaptive Interface Framework\n"Dynamic personalization:\n• Context awareness\n• Behavior learning\n• Real-time adaptation\n• Continuous optimization"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Context-aware adaptation
    {
      id: 'context-aware-adaptation',
      position: { x: 200, y: 350 },
      data: { label: '🌍 Context-Aware Adaptation\n"Environmental sensing:\n• Device & location\n• Time & activity\n• IoT sensor fusion\n• Privacy-preserving inference"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 260 },
    },

    // Environmental integration
    {
      id: 'environmental-integration',
      position: { x: 50, y: 500 },
      data: { label: '🏠 Environmental Integration\n"Smart adaptation:\n• Lighting & temperature\n• Occupancy detection\n• Energy optimization\n• Behavioral patterns"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // User behavior analysis
    {
      id: 'user-behavior-analysis',
      position: { x: 600, y: 350 },
      data: { label: '📊 User Behavior Analysis\n"Pattern recognition:\n• Interaction sequences\n• Preference learning\n• 87% prediction accuracy\n• Real-time processing"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // ML-driven personalization
    {
      id: 'ml-driven-personalization',
      position: { x: 750, y: 500 },
      data: { label: '🤖 ML-Driven Personalization\n"Advanced algorithms:\n• Reinforcement learning\n• Collaborative filtering\n• Deep learning models\n• Continuous optimization"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    // Dynamic UI generation
    {
      id: 'dynamic-ui-generation',
      position: { x: 400, y: 650 },
      data: { label: '⚡ Dynamic UI Generation\n"Real-time creation:\n• GenUI systems\n• Component selection\n• Layout optimization\n• Modular architecture"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Accessibility adaptation
    {
      id: 'accessibility-adaptation',
      position: { x: 200, y: 800 },
      data: { label: '♿ Accessibility Adaptation\n"Inclusive design:\n• Real-time adjustment\n• Multi-modal options\n• WCAG compliance\n• Universal access"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Multi-modal interfaces
    {
      id: 'multi-modal-interfaces',
      position: { x: 600, y: 800 },
      data: { label: '🎭 Multi-Modal Interfaces\n"Adaptive modalities:\n• Voice + visual\n• Gesture + speech\n• Eye-tracking feedback\n• Seamless transitions"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 240 },
    },

    // Privacy preservation
    {
      id: 'privacy-preservation',
      position: { x: 200, y: 950 },
      data: { label: '🔐 Privacy Preservation\n"Secure personalization:\n• Federated learning\n• Differential privacy\n• Local processing\n• Data protection"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // Continuous optimization
    {
      id: 'continuous-optimization',
      position: { x: 600, y: 950 },
      data: { label: '🔄 Continuous Optimization\n"Living interfaces:\n• A/B testing\n• Performance metrics\n• Autonomous evolution\n• Real-time analytics"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    // Production success
    {
      id: 'production-success',
      position: { x: 400, y: 1100 },
      data: { label: '🏆 Production Success\n"Industry results:\n• Netflix: 80% content streamed\n• 40% revenue increase\n• 35% efficiency gains\n• 31% engagement boost"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 260 },
    },

    // Core adaptive principle
    {
      id: 'adaptive-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Adaptive Interface Principle\n"Context-aware adaptation with behavior learning achieves 87% prediction accuracy\nDynamic UI generation with accessibility ensures universal access\nPrivacy-preserving personalization enables 40% revenue increase with user trust"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Limitations addressed by framework
    {
      id: 'e1',
      source: 'static-interface-limitations',
      target: 'adaptive-interface-framework',
      ...edgeStyle,
      label: 'evolved into'
    },

    // Framework components
    {
      id: 'e2',
      source: 'adaptive-interface-framework',
      target: 'context-aware-adaptation',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e3',
      source: 'adaptive-interface-framework',
      target: 'user-behavior-analysis',
      ...edgeStyle,
      label: 'performs'
    },
    {
      id: 'e4',
      source: 'adaptive-interface-framework',
      target: 'dynamic-ui-generation',
      ...edgeStyle,
      label: 'enables'
    },

    // Context adaptation details
    {
      id: 'e5',
      source: 'context-aware-adaptation',
      target: 'environmental-integration',
      ...edgeStyle,
      label: 'includes'
    },

    // Behavior analysis details
    {
      id: 'e6',
      source: 'user-behavior-analysis',
      target: 'ml-driven-personalization',
      ...edgeStyle,
      label: 'powered by'
    },

    // UI generation flows
    {
      id: 'e7',
      source: 'dynamic-ui-generation',
      target: 'accessibility-adaptation',
      ...edgeStyle,
      label: 'ensures'
    },
    {
      id: 'e8',
      source: 'dynamic-ui-generation',
      target: 'multi-modal-interfaces',
      ...edgeStyle,
      label: 'creates'
    },

    // Cross-connections
    {
      id: 'e9',
      source: 'environmental-integration',
      target: 'accessibility-adaptation',
      ...edgeStyle,
      label: 'enhances'
    },
    {
      id: 'e10',
      source: 'ml-driven-personalization',
      target: 'multi-modal-interfaces',
      ...edgeStyle,
      label: 'optimizes'
    },

    // Privacy and optimization
    {
      id: 'e11',
      source: 'accessibility-adaptation',
      target: 'privacy-preservation',
      ...edgeStyle,
      label: 'protected by'
    },
    {
      id: 'e12',
      source: 'multi-modal-interfaces',
      target: 'continuous-optimization',
      ...edgeStyle,
      label: 'improved by'
    },

    // Success validation
    {
      id: 'e13',
      source: 'privacy-preservation',
      target: 'production-success',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e14',
      source: 'continuous-optimization',
      target: 'production-success',
      ...edgeStyle,
      label: 'achieves'
    },

    // Success proves principle
    {
      id: 'e15',
      source: 'production-success',
      target: 'adaptive-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Static Interface Limitations",
      description: "How can interfaces evolve beyond static designs to dynamically adapt to user context, preferences, and behavior patterns for improved usability and engagement?",
      activeNodes: ['static-interface-limitations'],
      activeEdges: []
    },
    {
      title: "Adaptive Interface Framework",
      description: "Dynamic personalization framework addresses limitations through context awareness, behavior learning, real-time adaptation, and continuous optimization mechanisms.",
      activeNodes: ['adaptive-interface-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Context and Behavior Analysis",
      description: "Environmental sensing includes IoT fusion and privacy-preserving inference. User behavior analysis achieves 87% prediction accuracy through pattern recognition and real-time processing.",
      activeNodes: ['context-aware-adaptation', 'environmental-integration', 'user-behavior-analysis', 'ml-driven-personalization'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Dynamic Generation and Multi-Modal Access",
      description: "GenUI systems create real-time interfaces with modular architecture. Accessibility adaptation ensures universal access while multi-modal interfaces provide voice, visual, and gesture integration.",
      activeNodes: ['dynamic-ui-generation', 'accessibility-adaptation', 'multi-modal-interfaces'],
      activeEdges: ['e4', 'e7', 'e8', 'e9', 'e10']
    },
    {
      title: "Privacy and Continuous Improvement",
      description: "Federated learning and differential privacy protect user data. Continuous optimization through A/B testing and autonomous evolution improves performance metrics in real-time.",
      activeNodes: ['privacy-preservation', 'continuous-optimization'],
      activeEdges: ['e11', 'e12']
    },
    {
      title: "Production Success and Validation",
      description: "Netflix achieves 80% content streaming through recommendations. 40% revenue increase with 35% efficiency gains validates context-aware adaptation with privacy-preserving personalization at scale.",
      activeNodes: ['production-success', 'adaptive-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};