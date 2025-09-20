import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const mixedInitiativeInterfacePattern: PatternScenario = {
  id: 'mixed-initiative-interface',
  title: 'Mixed-Initiative Interface Pattern',
  description: 'Collaborative UI patterns enabling seamless control switching between human and AI agents with opportunistic initiative-taking, achieving 3 hours/week productivity gains',
  initialNodes: [
    // Control switching challenge
    {
      id: 'control-switching-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🔄 Control Switching Challenge\n"How to enable seamless transitions\nbetween human and AI control\nwhile preserving context and agency?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 340 },
    },

    // Mixed-initiative framework
    {
      id: 'mixed-initiative-framework',
      position: { x: 400, y: 200 },
      data: { label: '🤝 Mixed-Initiative Framework\n"Collaborative control:\n• Opportunistic switching\n• Flexible agency\n• Transparent handoffs\n• State preservation"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Initiative patterns
    {
      id: 'initiative-patterns',
      position: { x: 200, y: 350 },
      data: { label: '🎯 Initiative Patterns\n"When to lead/follow:\n• AI: routine & data tasks\n• Human: strategic & ethical\n• Collaborative: creative work\n• Context-driven decisions"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Decision framework
    {
      id: 'decision-framework',
      position: { x: 50, y: 500 },
      data: { label: '⚖️ Decision Framework\n"Initiative allocation:\n• Task complexity\n• Risk assessment\n• User expertise\n• Time constraints"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Control handoff mechanisms
    {
      id: 'control-handoff-mechanisms',
      position: { x: 600, y: 350 },
      data: { label: '🔀 Control Handoff Mechanisms\n"Transition types:\n• Confidence-based\n• User-initiated\n• Context-triggered\n• Time-scheduled"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 260 },
    },

    // State management
    {
      id: 'state-management',
      position: { x: 750, y: 500 },
      data: { label: '💾 State Management\n"Context preservation:\n• Session state\n• Agent memory\n• Shared context\n• Rollback capability"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 230 },
    },

    // Collaboration models
    {
      id: 'collaboration-models',
      position: { x: 400, y: 650 },
      data: { label: '👥 Collaboration Models\n"Working patterns:\n• Turn-taking sequences\n• Parallel specialization\n• Shared control\n• Supervisor-worker"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Interface affordances
    {
      id: 'interface-affordances',
      position: { x: 200, y: 800 },
      data: { label: '🖥️ Interface Affordances\n"Control indicators:\n• Status badges\n• Take control buttons\n• Transition animations\n• Emergency stops"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Negotiation protocols
    {
      id: 'negotiation-protocols',
      position: { x: 600, y: 800 },
      data: { label: '🗣️ Negotiation Protocols\n"Communication patterns:\n• Consent mechanisms\n• Clarification requests\n• Alternative options\n• Feedback collection"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 250 },
    },

    // Error recovery
    {
      id: 'error-recovery',
      position: { x: 200, y: 950 },
      data: { label: '🔧 Error Recovery\n"Failure handling:\n• Context restoration\n• State rollback\n• Manual override\n• Learning adaptation"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },

    // Production implementations
    {
      id: 'production-implementations',
      position: { x: 600, y: 950 },
      data: { label: '🏢 Production Cases\n"Real-world success:\n• Microsoft Copilot (70% Fortune 500)\n• Google Gemini 2.0\n• Apple Intelligence\n• 3 hours/week saved"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 270 },
    },

    // Design principles
    {
      id: 'design-principles',
      position: { x: 400, y: 1100 },
      data: { label: '📐 Design Principles\n"Implementation guide:\n• Human-centered approach\n• Transparency & trust\n• Control granularity\n• Agency preservation"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 260 },
    },

    // Core initiative principle
    {
      id: 'initiative-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Mixed-Initiative Principle\n"Opportunistic control switching enables 70% enterprise adoption\nSeamless handoffs with state preservation maintain context continuity\nHuman agency preservation with AI efficiency gains achieve optimal collaboration"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'control-switching-challenge',
      target: 'mixed-initiative-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework components
    {
      id: 'e2',
      source: 'mixed-initiative-framework',
      target: 'initiative-patterns',
      ...edgeStyle,
      label: 'defines'
    },
    {
      id: 'e3',
      source: 'mixed-initiative-framework',
      target: 'control-handoff-mechanisms',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e4',
      source: 'mixed-initiative-framework',
      target: 'collaboration-models',
      ...edgeStyle,
      label: 'enables'
    },

    // Initiative details
    {
      id: 'e5',
      source: 'initiative-patterns',
      target: 'decision-framework',
      ...edgeStyle,
      label: 'guided by'
    },

    // Handoff mechanisms
    {
      id: 'e6',
      source: 'control-handoff-mechanisms',
      target: 'state-management',
      ...edgeStyle,
      label: 'requires'
    },

    // Collaboration flows
    {
      id: 'e7',
      source: 'collaboration-models',
      target: 'interface-affordances',
      ...edgeStyle,
      label: 'supported by'
    },
    {
      id: 'e8',
      source: 'collaboration-models',
      target: 'negotiation-protocols',
      ...edgeStyle,
      label: 'uses'
    },

    // Cross-connections
    {
      id: 'e9',
      source: 'decision-framework',
      target: 'interface-affordances',
      ...edgeStyle,
      label: 'informs'
    },
    {
      id: 'e10',
      source: 'state-management',
      target: 'negotiation-protocols',
      ...edgeStyle,
      label: 'enables'
    },

    // Implementation flows
    {
      id: 'e11',
      source: 'interface-affordances',
      target: 'error-recovery',
      ...edgeStyle,
      label: 'includes'
    },
    {
      id: 'e12',
      source: 'negotiation-protocols',
      target: 'production-implementations',
      ...edgeStyle,
      label: 'deployed in'
    },

    // Recovery and validation
    {
      id: 'e13',
      source: 'error-recovery',
      target: 'design-principles',
      ...edgeStyle,
      label: 'guides'
    },
    {
      id: 'e14',
      source: 'production-implementations',
      target: 'design-principles',
      ...edgeStyle,
      label: 'validates'
    },

    // Principles prove effectiveness
    {
      id: 'e15',
      source: 'design-principles',
      target: 'initiative-principle',
      ...edgeStyle,
      label: 'demonstrates',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Control Switching Challenge",
      description: "How can systems enable seamless transitions between human and AI control while preserving context, maintaining user agency, and ensuring effective collaboration?",
      activeNodes: ['control-switching-challenge'],
      activeEdges: []
    },
    {
      title: "Mixed-Initiative Framework",
      description: "Collaborative control framework addresses challenge through opportunistic switching, flexible agency, transparent handoffs, and comprehensive state preservation mechanisms.",
      activeNodes: ['mixed-initiative-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Initiative Patterns and Handoff Mechanisms",
      description: "Decision framework guides when AI leads (routine/data tasks) vs human leads (strategic/ethical). Control handoffs use confidence-based, user-initiated, and context-triggered transitions.",
      activeNodes: ['initiative-patterns', 'decision-framework', 'control-handoff-mechanisms', 'state-management'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Collaboration Models and Communication",
      description: "Working patterns include turn-taking, parallel specialization, and shared control. Interface affordances provide status indicators while negotiation protocols enable consent and clarification.",
      activeNodes: ['collaboration-models', 'interface-affordances', 'negotiation-protocols'],
      activeEdges: ['e4', 'e7', 'e8', 'e9', 'e10']
    },
    {
      title: "Error Recovery and Production Success",
      description: "Failure handling includes context restoration and state rollback. Production implementations like Microsoft Copilot achieve 70% Fortune 500 adoption with 3 hours/week productivity gains.",
      activeNodes: ['error-recovery', 'production-implementations'],
      activeEdges: ['e11', 'e12']
    },
    {
      title: "Design Principles and Validation",
      description: "Human-centered approach with transparency, control granularity, and agency preservation. Opportunistic switching with seamless handoffs enables optimal human-AI collaboration at enterprise scale.",
      activeNodes: ['design-principles', 'initiative-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};