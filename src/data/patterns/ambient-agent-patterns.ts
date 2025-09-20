import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const ambientAgentPatternsPattern: PatternScenario = {
  id: 'ambient-agent-patterns',
  title: 'Ambient Agent Patterns',
  description: 'Event-driven agents that listen to data streams and act proactively, engaging humans selectively through notify, question, and review patterns while maintaining persistent state and multi-tasking capabilities',
  initialNodes: [
    // Ambient agent challenge
    {
      id: 'ambient-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Ambient Agent Challenge\n"How to create event-driven agents that listen\nto data streams, act proactively, and engage\nhumans selectively without overwhelming them?"' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 380 },
    },

    // Event Stream Processing
    {
      id: 'event-stream',
      position: { x: 200, y: 200 },
      data: { label: '📡 Event Stream Processing\n"Continuous monitoring:\n• Listen to data streams\n• Real-time event detection\n• Pattern recognition\n• Trigger-based activation"' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 240 },
    },

    // Persistent State Management
    {
      id: 'persistent-state',
      position: { x: 600, y: 200 },
      data: { label: '💾 Persistent State Management\n"Long-term memory:\n• Context preservation\n• Task continuity\n• Multi-session awareness\n• State synchronization"' },
      style: { ...nodeStyle, background: '#0891b2', minWidth: 240 },
    },

    // Human-in-the-Loop Patterns
    {
      id: 'hitl-patterns',
      position: { x: 100, y: 350 },
      data: { label: '👤 Human-in-the-Loop Patterns\n"Selective engagement:\n• Notify: Flag important events\n• Question: Request clarification\n• Review: Seek approval\n• Learn: Adapt from feedback"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 260 },
    },

    // Multi-Task Orchestration
    {
      id: 'multitask-orchestration',
      position: { x: 400, y: 350 },
      data: { label: '⚡ Multi-Task Orchestration\n"Concurrent processing:\n• Parallel task execution\n• Priority management\n• Resource allocation\n• Context switching"' },
      style: { ...nodeStyle, background: '#ea580c', minWidth: 240 },
    },

    // Proactive Problem Detection
    {
      id: 'proactive-detection',
      position: { x: 700, y: 350 },
      data: { label: '🔍 Proactive Problem Detection\n"Anticipatory behavior:\n• Anomaly identification\n• Trend analysis\n• Risk assessment\n• Preventive actions"' },
      style: { ...nodeStyle, background: '#be185d', minWidth: 240 },
    },

    // Intelligent Interruption
    {
      id: 'intelligent-interruption',
      position: { x: 250, y: 500 },
      data: { label: '🧠 Intelligent Interruption\n"Smart engagement:\n• Context-aware timing\n• Urgency assessment\n• Communication channel selection\n• Graceful degradation"' },
      style: { ...nodeStyle, background: '#16a34a', minWidth: 250 },
    },

    // Collaborative Intelligence
    {
      id: 'collaborative-intelligence',
      position: { x: 550, y: 500 },
      data: { label: '🤝 Collaborative Intelligence\n"Human-AI partnership:\n• Complementary strengths\n• Shared decision making\n• Trust building\n• Continuous learning"' },
      style: { ...nodeStyle, background: '#0369a1', minWidth: 250 },
    },

    // Framework-Agnostic Implementation
    {
      id: 'framework-agnostic',
      position: { x: 400, y: 650 },
      data: { label: '🔧 Framework-Agnostic Implementation\n"Universal principles:\n• Event-driven architecture\n• State management patterns\n• Communication protocols\n• Modular design"' },
      style: { ...nodeStyle, background: '#86198f', minWidth: 280 },
    },

    // Core Ambient Agent Principle
    {
      id: 'ambient-principle',
      position: { x: 400, y: 800 },
      data: { label: '🎯 Ambient Agent Principle\n"Event-driven intelligence: Proactive agents that listen, learn, and act\nSelective human engagement through notify, question, and review patterns\nCollaborative intelligence enhances human capabilities without overwhelming"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 480 },
    },
  ],
  initialEdges: [
    // Challenge addressed by foundational components
    {
      id: 'e1',
      source: 'ambient-challenge',
      target: 'event-stream',
      ...edgeStyle,
      label: 'requires'
    },
    {
      id: 'e2',
      source: 'ambient-challenge',
      target: 'persistent-state',
      ...edgeStyle,
      label: 'needs'
    },

    // Core architectural components
    {
      id: 'e3',
      source: 'event-stream',
      target: 'hitl-patterns',
      ...edgeStyle,
      label: 'triggers'
    },
    {
      id: 'e4',
      source: 'event-stream',
      target: 'multitask-orchestration',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e5',
      source: 'persistent-state',
      target: 'proactive-detection',
      ...edgeStyle,
      label: 'powers'
    },

    // Human engagement patterns
    {
      id: 'e6',
      source: 'hitl-patterns',
      target: 'intelligent-interruption',
      ...edgeStyle,
      label: 'utilizes'
    },
    {
      id: 'e7',
      source: 'multitask-orchestration',
      target: 'collaborative-intelligence',
      ...edgeStyle,
      label: 'supports'
    },
    {
      id: 'e8',
      source: 'proactive-detection',
      target: 'intelligent-interruption',
      ...edgeStyle,
      label: 'informs'
    },

    // Integration and implementation
    {
      id: 'e9',
      source: 'intelligent-interruption',
      target: 'framework-agnostic',
      ...edgeStyle,
      label: 'implemented via'
    },
    {
      id: 'e10',
      source: 'collaborative-intelligence',
      target: 'framework-agnostic',
      ...edgeStyle,
      label: 'achieved through'
    },

    // Cross-connections for reinforcement
    {
      id: 'e11',
      source: 'persistent-state',
      target: 'multitask-orchestration',
      ...edgeStyle,
      label: 'maintains'
    },
    {
      id: 'e12',
      source: 'hitl-patterns',
      target: 'collaborative-intelligence',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e13',
      source: 'proactive-detection',
      target: 'collaborative-intelligence',
      ...edgeStyle,
      label: 'enhances'
    },

    // Framework validates principle
    {
      id: 'e14',
      source: 'framework-agnostic',
      target: 'ambient-principle',
      ...edgeStyle,
      label: 'demonstrates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Ambient Agent Challenge",
      description: "Organizations need event-driven agents that can listen to data streams, act proactively, and engage humans selectively without overwhelming them. This requires balancing automation with meaningful human oversight and control.",
      activeNodes: ['ambient-challenge'],
      activeEdges: []
    },
    {
      title: "Core Infrastructure Components",
      description: "Ambient agents require two foundational components: event stream processing for continuous monitoring and real-time detection, and persistent state management for maintaining context across sessions and enabling multi-task continuity.",
      activeNodes: ['event-stream', 'persistent-state'],
      activeEdges: ['e1', 'e2']
    },
    {
      title: "Agent Behavior Patterns",
      description: "Event streams trigger human-in-the-loop patterns (notify, question, review) and enable multi-task orchestration for concurrent processing. Persistent state powers proactive problem detection through trend analysis and anomaly identification.",
      activeNodes: ['hitl-patterns', 'multitask-orchestration', 'proactive-detection'],
      activeEdges: ['e3', 'e4', 'e5']
    },
    {
      title: "Human-Agent Interaction",
      description: "Human-in-the-loop patterns utilize intelligent interruption for context-aware timing and communication. Multi-task orchestration supports collaborative intelligence, while proactive detection informs when and how to engage humans effectively.",
      activeNodes: ['intelligent-interruption', 'collaborative-intelligence'],
      activeEdges: ['e6', 'e7', 'e8']
    },
    {
      title: "Cross-Component Integration",
      description: "Persistent state maintains multi-task orchestration context, human-in-the-loop patterns enable collaborative intelligence, and proactive detection enhances the partnership between humans and agents through informed decision-making.",
      activeNodes: [],
      activeEdges: ['e11', 'e12', 'e13']
    },
    {
      title: "Framework-Agnostic Implementation",
      description: "Intelligent interruption and collaborative intelligence are implemented through universal patterns: event-driven architecture, state management, communication protocols, and modular design that work across different technological frameworks.",
      activeNodes: ['framework-agnostic'],
      activeEdges: ['e9', 'e10']
    },
    {
      title: "Ambient Agent Principle Validation",
      description: "Framework-agnostic implementation demonstrates the core principle that ambient agents achieve collaborative intelligence through event-driven monitoring, selective human engagement, and persistent context management that enhances rather than replaces human capabilities.",
      activeNodes: ['ambient-principle'],
      activeEdges: ['e14']
    }
  ],
  metadata: {
    category: 'Agent Architecture',
    complexity: 'Advanced',
    estimatedReadTime: '10 minutes',
    tags: ['Event-Driven', 'Human-in-the-Loop', 'Persistent State', 'Multi-Tasking', 'Proactive Agents', 'Collaborative Intelligence', 'Stream Processing', 'Framework Agnostic'],
    lastUpdated: '2024-03-20',
    version: '2.0',
    author: 'Ambient Agent Research Team',
    references: [
      'Event-Driven Architecture Patterns',
      'Human-in-the-Loop AI Systems',
      'Stream Processing Fundamentals',
      'Multi-Agent System Design',
      'Collaborative Intelligence Frameworks',
      'State Management Patterns',
      'Proactive AI System Design'
    ]
  }
}