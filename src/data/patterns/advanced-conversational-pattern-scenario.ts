import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const advancedConversationalPatternScenario: PatternScenario = {
  id: 'advanced-conversational-interface-patterns',
  title: 'Advanced Conversational Interface Patterns',
  description: 'Next-generation conversational UI/UX patterns that move beyond traditional chatbots to agent-driven, multimodal experiences with adaptive intelligence',
  initialNodes: [
    // Main Challenge
    {
      id: 'conversational-challenge',
      position: { x: 400, y: 50 },
      data: { label: '💬 Advanced Conversational Interface Challenge\n"How to create intelligent, multimodal conversational\ninterfaces that proactively assist users through\nagent-driven experiences beyond traditional chatbots?"' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 400 },
    },

    // Core Evolution Areas
    {
      id: 'beyond-chatbots',
      position: { x: 100, y: 200 },
      data: { label: '🚀 Beyond Traditional Chatbots\n"Evolution from reactive to proactive:\n• Agent-driven conversation flow\n• Context-aware assistance\n• Intelligent task orchestration\n• Predictive user needs"' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 260 },
    },

    {
      id: 'multimodal-integration',
      position: { x: 400, y: 200 },
      data: { label: '🎭 Multimodal Integration\n"Rich communication channels:\n• Voice + Visual + Gesture + Text\n• Synchronized modal outputs\n• Cross-modal understanding\n• Adaptive modal selection"' },
      style: { ...nodeStyle, background: '#0891b2', minWidth: 260 },
    },

    {
      id: 'agent-intelligence',
      position: { x: 700, y: 200 },
      data: { label: '🧠 Agent Intelligence\n"Smart conversational agents:\n• Intent prediction (95% accuracy)\n• Context preservation\n• Learning from interactions\n• Proactive suggestions"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 260 },
    },

    // Agent-Driven Patterns
    {
      id: 'proactive-initiation',
      position: { x: 150, y: 380 },
      data: { label: '🎯 Proactive Conversation Initiation\n"Agent-led interactions:\n• Context analysis triggers\n• Predictive assistance\n• Smart notifications\n• Workflow optimization"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    {
      id: 'guided-dialogue',
      position: { x: 450, y: 380 },
      data: { label: '🗣️ Guided Dialogue Management\n"Conversational scaffolding:\n• Progressive disclosure\n• Expert guidance patterns\n• Multi-turn coordination\n• Intent clarification"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 250 },
    },

    {
      id: 'task-orchestration',
      position: { x: 750, y: 380 },
      data: { label: '🎭 Background Task Orchestration\n"Seamless multi-system coordination:\n• API orchestration\n• Parallel processing\n• State management\n• Progress transparency"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },

    // Multimodal Capabilities
    {
      id: 'voice-visual-sync',
      position: { x: 200, y: 560 },
      data: { label: '🎤👁️ Voice-Visual Synchronization\n"Coordinated communication:\n• Real-time speech processing\n• Visual feedback alignment\n• Lip-sync accuracy\n• Context-aware responses"' },
      style: { ...nodeStyle, background: '#ea580c', minWidth: 260 },
    },

    {
      id: 'gesture-integration',
      position: { x: 500, y: 560 },
      data: { label: '👋 Gesture Integration\n"Spatial interaction patterns:\n• Hand tracking (80ms latency)\n• 3D manipulation\n• Pointing gestures\n• Cultural adaptation"' },
      style: { ...nodeStyle, background: '#be185d', minWidth: 240 },
    },

    {
      id: 'adaptive-modality',
      position: { x: 800, y: 560 },
      data: { label: '🔄 Adaptive Modality Selection\n"Context-driven interface:\n• Environmental awareness\n• User preference learning\n• Accessibility adaptation\n• Resource optimization"' },
      style: { ...nodeStyle, background: '#16a34a', minWidth: 240 },
    },

    // Advanced UX Patterns
    {
      id: 'contextual-ui',
      position: { x: 150, y: 740 },
      data: { label: '🎨 Contextual UI Adaptation\n"Dynamic interface evolution:\n• Real-time UI morphing\n• Feature surfacing\n• Content personalization\n• Progressive complexity"' },
      style: { ...nodeStyle, background: '#0369a1', minWidth: 250 },
    },

    {
      id: 'emotional-intelligence',
      position: { x: 450, y: 740 },
      data: { label: '❤️ Emotional Intelligence\n"Empathetic interactions:\n• Sentiment analysis\n• Emotional state tracking\n• Adaptive tone matching\n• Therapeutic communication"' },
      style: { ...nodeStyle, background: '#7c2d12', minWidth: 250 },
    },

    {
      id: 'memory-continuity',
      position: { x: 750, y: 740 },
      data: { label: '🧠 Memory & Continuity\n"Persistent relationship building:\n• Long-term memory\n• Conversation history\n• Preference tracking\n• Relationship depth"' },
      style: { ...nodeStyle, background: '#86198f', minWidth: 240 },
    },

    // Applications & Impact
    {
      id: 'real-world-applications',
      position: { x: 250, y: 920 },
      data: { label: '🏢 Real-World Applications\n"Transformative implementations:\n• Personal AI assistants\n• Healthcare companions\n• Educational tutors\n• Creative collaborators"' },
      style: { ...nodeStyle, background: '#1e40af', minWidth: 280 },
    },

    {
      id: 'business-transformation',
      position: { x: 650, y: 920 },
      data: { label: '💰 Business Transformation\n"Measurable impact:\n• 60% faster task completion\n• 89% user satisfaction\n• $45B market by 2025\n• 40% support cost reduction"' },
      style: { ...nodeStyle, background: '#0f766e', minWidth: 260 },
    },

    // Future Innovation
    {
      id: 'future-evolution',
      position: { x: 400, y: 1100 },
      data: { label: '🚀 Future Evolution\n"Next-generation capabilities:\n• Brain-computer interfaces\n• Holographic interactions\n• Quantum-enhanced processing\n• Universal translation"' },
      style: { ...nodeStyle, background: '#7c2d12', minWidth: 280 },
    },

    // Core Principle
    {
      id: 'conversational-principle',
      position: { x: 400, y: 1280 },
      data: { label: '🎯 Advanced Conversational Interface Principle\n"Agent-driven intelligence: Proactive AI agents orchestrate sophisticated multi-modal conversations\nContextual adaptation: Interfaces dynamically evolve based on user needs and environmental context\nHuman-centered design: Technology amplifies natural human communication patterns for seamless interaction"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 520 },
    },
  ],
  initialEdges: [
    // Challenge drives evolution areas
    {
      id: 'e1',
      source: 'conversational-challenge',
      target: 'beyond-chatbots',
      ...edgeStyle,
      label: 'requires'
    },
    {
      id: 'e2',
      source: 'conversational-challenge',
      target: 'multimodal-integration',
      ...edgeStyle,
      label: 'demands'
    },
    {
      id: 'e3',
      source: 'conversational-challenge',
      target: 'agent-intelligence',
      ...edgeStyle,
      label: 'needs'
    },

    // Evolution areas enable specific patterns
    {
      id: 'e4',
      source: 'beyond-chatbots',
      target: 'proactive-initiation',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e5',
      source: 'beyond-chatbots',
      target: 'guided-dialogue',
      ...edgeStyle,
      label: 'supports'
    },
    {
      id: 'e6',
      source: 'agent-intelligence',
      target: 'task-orchestration',
      ...edgeStyle,
      label: 'powers'
    },

    // Multimodal integration drives capabilities
    {
      id: 'e7',
      source: 'multimodal-integration',
      target: 'voice-visual-sync',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e8',
      source: 'multimodal-integration',
      target: 'gesture-integration',
      ...edgeStyle,
      label: 'includes'
    },
    {
      id: 'e9',
      source: 'agent-intelligence',
      target: 'adaptive-modality',
      ...edgeStyle,
      label: 'optimizes'
    },

    // Cross-connections between patterns
    {
      id: 'e10',
      source: 'proactive-initiation',
      target: 'voice-visual-sync',
      ...edgeStyle,
      label: 'triggers'
    },
    {
      id: 'e11',
      source: 'guided-dialogue',
      target: 'gesture-integration',
      ...edgeStyle,
      label: 'enhances'
    },
    {
      id: 'e12',
      source: 'task-orchestration',
      target: 'adaptive-modality',
      ...edgeStyle,
      label: 'coordinates'
    },

    // Patterns enable advanced UX
    {
      id: 'e13',
      source: 'voice-visual-sync',
      target: 'contextual-ui',
      ...edgeStyle,
      label: 'drives'
    },
    {
      id: 'e14',
      source: 'gesture-integration',
      target: 'emotional-intelligence',
      ...edgeStyle,
      label: 'enriches'
    },
    {
      id: 'e15',
      source: 'adaptive-modality',
      target: 'memory-continuity',
      ...edgeStyle,
      label: 'learns from'
    },

    // Advanced UX patterns reinforce each other
    {
      id: 'e16',
      source: 'contextual-ui',
      target: 'emotional-intelligence',
      ...edgeStyle,
      label: 'adapts to'
    },
    {
      id: 'e17',
      source: 'emotional-intelligence',
      target: 'memory-continuity',
      ...edgeStyle,
      label: 'informs'
    },
    {
      id: 'e18',
      source: 'memory-continuity',
      target: 'contextual-ui',
      ...edgeStyle,
      label: 'personalizes'
    },

    // UX patterns enable applications
    {
      id: 'e19',
      source: 'contextual-ui',
      target: 'real-world-applications',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e20',
      source: 'emotional-intelligence',
      target: 'real-world-applications',
      ...edgeStyle,
      label: 'powers'
    },
    {
      id: 'e21',
      source: 'memory-continuity',
      target: 'real-world-applications',
      ...edgeStyle,
      label: 'supports'
    },

    // Applications drive business transformation
    {
      id: 'e22',
      source: 'real-world-applications',
      target: 'business-transformation',
      ...edgeStyle,
      label: 'generates'
    },

    // Success enables future innovation
    {
      id: 'e23',
      source: 'business-transformation',
      target: 'future-evolution',
      ...edgeStyle,
      label: 'funds'
    },

    // Additional cross-connections
    {
      id: 'e24',
      source: 'proactive-initiation',
      target: 'contextual-ui',
      ...edgeStyle,
      label: 'informs'
    },
    {
      id: 'e25',
      source: 'guided-dialogue',
      target: 'emotional-intelligence',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e26',
      source: 'task-orchestration',
      target: 'memory-continuity',
      ...edgeStyle,
      label: 'tracks'
    },

    // Future validates principle
    {
      id: 'e27',
      source: 'future-evolution',
      target: 'conversational-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e28',
      source: 'business-transformation',
      target: 'conversational-principle',
      ...edgeStyle,
      label: 'proves',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Advanced Conversational Interface Challenge",
      description: "Organizations need to move beyond traditional chatbots to create intelligent, multimodal conversational interfaces that proactively assist users through agent-driven experiences. Modern applications require sophisticated understanding, natural interaction patterns, and seamless integration across communication modalities.",
      activeNodes: ['conversational-challenge'],
      activeEdges: []
    },
    {
      title: "Evolution Beyond Traditional Chatbots",
      description: "The challenge drives three key evolution areas: moving beyond reactive chatbots to proactive agent-driven systems, integrating multiple communication modalities for rich interaction, and developing intelligent agents with 95% intent prediction accuracy that learn from user interactions.",
      activeNodes: ['beyond-chatbots', 'multimodal-integration', 'agent-intelligence'],
      activeEdges: ['e1', 'e2', 'e3']
    },
    {
      title: "Agent-Driven Interaction Patterns",
      description: "Evolution areas enable sophisticated agent patterns: proactive conversation initiation using context analysis and predictive assistance, guided dialogue management with conversational scaffolding and expert guidance, and background task orchestration with API coordination and transparent progress tracking.",
      activeNodes: ['proactive-initiation', 'guided-dialogue', 'task-orchestration'],
      activeEdges: ['e4', 'e5', 'e6', 'e24', 'e25', 'e26']
    },
    {
      title: "Multimodal Communication Capabilities",
      description: "Multimodal integration and agent intelligence drive advanced capabilities: voice-visual synchronization with real-time speech processing and visual feedback alignment, gesture integration with 80ms latency hand tracking, and adaptive modality selection based on context and user preferences.",
      activeNodes: ['voice-visual-sync', 'gesture-integration', 'adaptive-modality'],
      activeEdges: ['e7', 'e8', 'e9', 'e10', 'e11', 'e12']
    },
    {
      title: "Advanced UX Pattern Integration",
      description: "Communication capabilities enable sophisticated UX patterns that reinforce each other: contextual UI adaptation with real-time interface morphing, emotional intelligence with sentiment analysis and adaptive tone matching, and memory continuity with long-term relationship building and preference tracking.",
      activeNodes: ['contextual-ui', 'emotional-intelligence', 'memory-continuity'],
      activeEdges: ['e13', 'e14', 'e15', 'e16', 'e17', 'e18']
    },
    {
      title: "Real-World Applications and Business Impact",
      description: "Advanced UX patterns enable transformative real-world applications including personal AI assistants, healthcare companions, educational tutors, and creative collaborators. These applications generate significant business transformation with 60% faster task completion, 89% user satisfaction, and $45B market opportunity by 2025.",
      activeNodes: ['real-world-applications', 'business-transformation'],
      activeEdges: ['e19', 'e20', 'e21', 'e22']
    },
    {
      title: "Future Evolution and Principle Validation",
      description: "Business success funds future evolution including brain-computer interfaces, holographic interactions, and quantum-enhanced processing. This success validates core principles: agent-driven intelligence orchestrates sophisticated conversations, contextual adaptation dynamically evolves interfaces, and human-centered design amplifies natural communication.",
      activeNodes: ['future-evolution', 'conversational-principle'],
      activeEdges: ['e23', 'e27', 'e28']
    }
  ],
  metadata: {
    category: 'User Interface Design',
    complexity: 'Advanced',
    estimatedReadTime: '15 minutes',
    tags: ['Conversational AI', 'Agent-Driven UX', 'Multimodal Interfaces', 'Voice UI', 'Gesture Recognition', 'Contextual Adaptation', 'Emotional Intelligence', 'Proactive Assistance'],
    lastUpdated: '2024-03-20',
    version: '1.0',
    author: 'Advanced Conversational Interface Research Team',
    references: [
      'Designing AI Beyond Conversational Interfaces (Smashing Magazine 2024)',
      'AI Conversation Design in 2025 (Botpress)',
      'Conversational UX in Chatbot Design (Toptal)',
      'UI/UX Patterns for AI Products (Medium)',
      'The Future of Conversational AI: Trends for 2024',
      'Visual Chain-of-Thought Prompting (AAAI 2024)',
      'Multimodal Interaction Design Principles',
      'Agent-Driven Interface Architecture'
    ]
  }
};