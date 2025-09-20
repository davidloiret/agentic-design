import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const multimodalInteractionPatternScenario: PatternScenario = {
  id: 'multimodal-interaction-patterns',
  title: 'Multimodal Interaction Patterns',
  description: 'Advanced multimodal agent interaction patterns integrating voice, visual, gesture, and text communication seamlessly for natural human-computer interaction',
  initialNodes: [
    // Main Challenge
    {
      id: 'multimodal-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🤝 Multimodal Interaction Challenge\n"How to create seamless integration of voice, visual,\ngesture, and text communication for natural\nhuman-computer interaction across diverse contexts?"' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 380 },
    },

    // Core Modalities
    {
      id: 'voice-modality',
      position: { x: 100, y: 200 },
      data: { label: '🎤 Voice Modality\n"Speech processing:\n• Real-time speech recognition\n• Natural language understanding\n• Speech synthesis (150ms latency)\n• Emotional tone detection"' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 240 },
    },

    {
      id: 'visual-modality',
      position: { x: 350, y: 200 },
      data: { label: '👁️ Visual Modality\n"Computer vision:\n• Scene understanding\n• Object recognition (50ms latency)\n• Facial expression analysis\n• Gaze tracking integration"' },
      style: { ...nodeStyle, background: '#0891b2', minWidth: 240 },
    },

    {
      id: 'gesture-modality',
      position: { x: 600, y: 200 },
      data: { label: '✋ Gesture Modality\n"Hand & body tracking:\n• Real-time gesture recognition\n• 3D spatial mapping\n• Gesture vocabulary (80ms latency)\n• Cultural adaptation"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },

    {
      id: 'text-modality',
      position: { x: 850, y: 200 },
      data: { label: '📝 Text Modality\n"Language processing:\n• Natural language generation\n• Context understanding\n• Multi-language support (20ms latency)\n• Semantic analysis"' },
      style: { ...nodeStyle, background: '#ea580c', minWidth: 240 },
    },

    // Fusion Strategies
    {
      id: 'attention-fusion',
      position: { x: 150, y: 380 },
      data: { label: '🧠 Cross-Modal Attention Fusion\n"Dynamic attention mechanisms:\n• Transformer-based integration\n• Context-aware weighting\n• Real-time adaptation\n• 95% accuracy improvement"' },
      style: { ...nodeStyle, background: '#be185d', minWidth: 260 },
    },

    {
      id: 'adaptive-orchestration',
      position: { x: 450, y: 380 },
      data: { label: '🎭 Adaptive Interface Orchestration\n"Context-driven selection:\n• Environmental awareness\n• User preference learning\n• Dynamic modality switching\n• Resource optimization"' },
      style: { ...nodeStyle, background: '#16a34a', minWidth: 280 },
    },

    {
      id: 'gesture-voice-coord',
      position: { x: 750, y: 380 },
      data: { label: '🤝 Gesture-Voice Coordination\n"Synchronized interaction:\n• Temporal alignment\n• Semantic fusion\n• Conflict resolution\n• Natural flow patterns"' },
      style: { ...nodeStyle, background: '#0369a1', minWidth: 260 },
    },

    // Processing Pipeline
    {
      id: 'input-capture',
      position: { x: 200, y: 560 },
      data: { label: '📥 Multi-Modal Input Capture\n"Simultaneous processing:\n• Parallel stream capture\n• Temporal synchronization\n• Noise filtering\n• Quality assurance"' },
      style: { ...nodeStyle, background: '#7c2d12', minWidth: 250 },
    },

    {
      id: 'feature-extraction',
      position: { x: 500, y: 560 },
      data: { label: '🔍 Feature Extraction\n"Multi-modal encoding:\n• CNN for visual features\n• RNN for temporal data\n• Transformer attention\n• Semantic embeddings"' },
      style: { ...nodeStyle, background: '#86198f', minWidth: 240 },
    },

    {
      id: 'context-integration',
      position: { x: 800, y: 560 },
      data: { label: '🔄 Context Integration\n"Intelligent fusion:\n• Memory networks\n• Contextual reasoning\n• User modeling\n• Adaptive learning"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },

    // Applications
    {
      id: 'smart-assistants',
      position: { x: 150, y: 740 },
      data: { label: '🏠 Smart Assistants\n"Home automation:\n• Voice + gesture control\n• Visual scene understanding\n• 92% user satisfaction\n• Natural interaction flow"' },
      style: { ...nodeStyle, background: '#1e40af', minWidth: 240 },
    },

    {
      id: 'collaborative-spaces',
      position: { x: 400, y: 740 },
      data: { label: '👥 Collaborative Spaces\n"Virtual teamwork:\n• Mixed reality integration\n• Multi-user interaction\n• Real-time collaboration\n• Cross-platform support"' },
      style: { ...nodeStyle, background: '#be185d', minWidth: 250 },
    },

    {
      id: 'accessibility-interfaces',
      position: { x: 700, y: 740 },
      data: { label: '♿ Accessibility Interfaces\n"Inclusive design:\n• Alternative input methods\n• Adaptive capabilities\n• Universal access\n• Personalized interaction"' },
      style: { ...nodeStyle, background: '#16a34a', minWidth: 250 },
    },

    // Business Impact
    {
      id: 'business-outcomes',
      position: { x: 300, y: 920 },
      data: { label: '💰 Business Outcomes\n"Measurable impact:\n• 40% faster task completion\n• 85% user preference vs single-modal\n• $2.3B market growth (2024)\n• 60% accessibility improvement"' },
      style: { ...nodeStyle, background: '#0f766e', minWidth: 280 },
    },

    {
      id: 'future-trends',
      position: { x: 650, y: 920 },
      data: { label: '🚀 Future Trends\n"Next generation:\n• Brain-computer interfaces\n• Haptic feedback integration\n• Emotion-aware systems\n• Seamless reality blending"' },
      style: { ...nodeStyle, background: '#7c2d12', minWidth: 250 },
    },

    // Core Principle
    {
      id: 'multimodal-principle',
      position: { x: 400, y: 1100 },
      data: { label: '🎯 Multimodal Interaction Principle\n"Natural communication: Seamless integration of voice, visual, gesture, and text creates intuitive interfaces\nAdaptive orchestration: Context-aware modality selection optimizes user experience and accessibility\nIntelligent fusion: Cross-modal attention mechanisms enable robust, natural human-computer interaction"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 520 },
    },
  ],
  initialEdges: [
    // Challenge drives modality development
    {
      id: 'e1',
      source: 'multimodal-challenge',
      target: 'voice-modality',
      ...edgeStyle,
      label: 'requires'
    },
    {
      id: 'e2',
      source: 'multimodal-challenge',
      target: 'visual-modality',
      ...edgeStyle,
      label: 'needs'
    },
    {
      id: 'e3',
      source: 'multimodal-challenge',
      target: 'gesture-modality',
      ...edgeStyle,
      label: 'includes'
    },
    {
      id: 'e4',
      source: 'multimodal-challenge',
      target: 'text-modality',
      ...edgeStyle,
      label: 'integrates'
    },

    // Modalities enable fusion strategies
    {
      id: 'e5',
      source: 'voice-modality',
      target: 'attention-fusion',
      ...edgeStyle,
      label: 'feeds into'
    },
    {
      id: 'e6',
      source: 'visual-modality',
      target: 'attention-fusion',
      ...edgeStyle,
      label: 'contributes to'
    },
    {
      id: 'e7',
      source: 'visual-modality',
      target: 'adaptive-orchestration',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e8',
      source: 'gesture-modality',
      target: 'adaptive-orchestration',
      ...edgeStyle,
      label: 'supports'
    },
    {
      id: 'e9',
      source: 'gesture-modality',
      target: 'gesture-voice-coord',
      ...edgeStyle,
      label: 'coordinates with'
    },
    {
      id: 'e10',
      source: 'voice-modality',
      target: 'gesture-voice-coord',
      ...edgeStyle,
      label: 'synchronizes with'
    },
    {
      id: 'e11',
      source: 'text-modality',
      target: 'adaptive-orchestration',
      ...edgeStyle,
      label: 'enhances'
    },

    // Fusion strategies drive processing pipeline
    {
      id: 'e12',
      source: 'attention-fusion',
      target: 'input-capture',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e13',
      source: 'adaptive-orchestration',
      target: 'input-capture',
      ...edgeStyle,
      label: 'orchestrates'
    },
    {
      id: 'e14',
      source: 'gesture-voice-coord',
      target: 'input-capture',
      ...edgeStyle,
      label: 'coordinates'
    },

    // Processing pipeline flow
    {
      id: 'e15',
      source: 'input-capture',
      target: 'feature-extraction',
      ...edgeStyle,
      label: 'processes'
    },
    {
      id: 'e16',
      source: 'feature-extraction',
      target: 'context-integration',
      ...edgeStyle,
      label: 'feeds to'
    },

    // Context integration enables applications
    {
      id: 'e17',
      source: 'context-integration',
      target: 'smart-assistants',
      ...edgeStyle,
      label: 'powers'
    },
    {
      id: 'e18',
      source: 'context-integration',
      target: 'collaborative-spaces',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e19',
      source: 'context-integration',
      target: 'accessibility-interfaces',
      ...edgeStyle,
      label: 'supports'
    },

    // Applications drive business outcomes
    {
      id: 'e20',
      source: 'smart-assistants',
      target: 'business-outcomes',
      ...edgeStyle,
      label: 'generates'
    },
    {
      id: 'e21',
      source: 'collaborative-spaces',
      target: 'business-outcomes',
      ...edgeStyle,
      label: 'delivers'
    },
    {
      id: 'e22',
      source: 'accessibility-interfaces',
      target: 'business-outcomes',
      ...edgeStyle,
      label: 'creates'
    },

    // Business outcomes inspire future trends
    {
      id: 'e23',
      source: 'business-outcomes',
      target: 'future-trends',
      ...edgeStyle,
      label: 'funds'
    },

    // Cross-connections for reinforcement
    {
      id: 'e24',
      source: 'attention-fusion',
      target: 'adaptive-orchestration',
      ...edgeStyle,
      label: 'enhances'
    },
    {
      id: 'e25',
      source: 'adaptive-orchestration',
      target: 'gesture-voice-coord',
      ...edgeStyle,
      label: 'optimizes'
    },
    {
      id: 'e26',
      source: 'feature-extraction',
      target: 'smart-assistants',
      ...edgeStyle,
      label: 'directly enables'
    },
    {
      id: 'e27',
      source: 'input-capture',
      target: 'accessibility-interfaces',
      ...edgeStyle,
      label: 'supports'
    },

    // Future and outcomes validate principle
    {
      id: 'e28',
      source: 'future-trends',
      target: 'multimodal-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e29',
      source: 'business-outcomes',
      target: 'multimodal-principle',
      ...edgeStyle,
      label: 'proves',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Multimodal Interaction Challenge",
      description: "Organizations need natural human-computer interfaces that seamlessly integrate voice, visual, gesture, and text communication. Traditional single-modal interfaces limit user expression and accessibility, requiring breakthrough approaches to multimodal fusion and coordination.",
      activeNodes: ['multimodal-challenge'],
      activeEdges: []
    },
    {
      title: "Core Modality Foundation",
      description: "Multimodal systems require robust individual modalities: voice processing with 150ms latency, computer vision with 50ms response time, gesture recognition at 80ms, and text processing at 20ms. Each modality must handle real-time processing while maintaining high accuracy and cultural adaptation.",
      activeNodes: ['voice-modality', 'visual-modality', 'gesture-modality', 'text-modality'],
      activeEdges: ['e1', 'e2', 'e3', 'e4']
    },
    {
      title: "Advanced Fusion Strategies",
      description: "Individual modalities enable sophisticated fusion approaches: Cross-modal attention fusion uses transformer-based integration for 95% accuracy improvement, adaptive orchestration provides context-driven modality selection, and gesture-voice coordination ensures synchronized interaction with temporal alignment.",
      activeNodes: ['attention-fusion', 'adaptive-orchestration', 'gesture-voice-coord'],
      activeEdges: ['e5', 'e6', 'e7', 'e8', 'e9', 'e10', 'e11', 'e24', 'e25']
    },
    {
      title: "Intelligent Processing Pipeline",
      description: "Fusion strategies implement a sophisticated processing pipeline starting with multi-modal input capture for simultaneous stream processing, followed by feature extraction using CNNs and transformers, culminating in context integration with memory networks and adaptive learning.",
      activeNodes: ['input-capture', 'feature-extraction', 'context-integration'],
      activeEdges: ['e12', 'e13', 'e14', 'e15', 'e16']
    },
    {
      title: "Real-World Applications",
      description: "Context integration powers diverse applications: smart assistants achieve 92% user satisfaction with voice+gesture control, collaborative spaces enable real-time mixed reality teamwork, and accessibility interfaces provide universal access with personalized interaction patterns.",
      activeNodes: ['smart-assistants', 'collaborative-spaces', 'accessibility-interfaces'],
      activeEdges: ['e17', 'e18', 'e19', 'e26', 'e27']
    },
    {
      title: "Business Impact and Future Innovation",
      description: "Applications generate significant business outcomes including 40% faster task completion, 85% user preference over single-modal interfaces, and $2.3B market growth. Success funds future innovations in brain-computer interfaces, haptic integration, and emotion-aware systems.",
      activeNodes: ['business-outcomes', 'future-trends'],
      activeEdges: ['e20', 'e21', 'e22', 'e23']
    },
    {
      title: "Multimodal Interaction Principle Validation",
      description: "Business outcomes and future trends validate core principles: natural communication through seamless voice/visual/gesture/text integration creates intuitive interfaces, adaptive orchestration optimizes user experience through context-aware selection, and intelligent fusion enables robust human-computer interaction.",
      activeNodes: ['multimodal-principle'],
      activeEdges: ['e28', 'e29']
    }
  ],
  metadata: {
    category: 'Interaction Design',
    complexity: 'Advanced',
    estimatedReadTime: '15 minutes',
    tags: ['Multimodal', 'Voice Interface', 'Gesture Recognition', 'Computer Vision', 'Natural Language', 'Fusion Systems', 'Accessibility', 'Real-time Processing'],
    lastUpdated: '2024-03-20',
    version: '1.0',
    author: 'Multimodal Interaction Research Team',
    references: [
      'IEEE Transactions on Pattern Analysis and Machine Intelligence',
      'ACM Conference on Human Factors in Computing Systems',
      'Cross-Modal Attention for Vision-Language Tasks',
      'Multimodal Machine Learning: A Survey and Taxonomy',
      'Real-time Gesture Recognition Systems',
      'Speech Recognition in Noisy Environments',
      'Universal Design Principles for Accessibility',
      'Context-Aware Computing Systems'
    ]
  }
};