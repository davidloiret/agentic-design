import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const contextStateMachinesPattern: PatternScenario = {
  id: 'context-state-machines',
  title: 'Context State Machines Pattern',
  description: 'Structured conversation management using finite state machines to control LLM behavior, enforce valid transitions, maintain dialog context, and orchestrate multi-agent workflows',
  initialNodes: [
    // Conversation management challenge
    {
      id: 'conversation-management-challenge',
      position: { x: 400, y: 50 },
      data: { label: '💬 Conversation Management Challenge\n"How to maintain structured dialog flow\nwhile handling dynamic user inputs\nand complex multi-turn interactions?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // Context state machine solution
    {
      id: 'context-state-machine',
      position: { x: 400, y: 200 },
      data: { label: '🎯 Context State Machine\n"FSM-controlled conversations:\n• Defined states & transitions\n• Context preservation\n• Workflow orchestration"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // State definition
    {
      id: 'state-definition',
      position: { x: 200, y: 350 },
      data: { label: '📊 State Definition\n"Conversation states:\n• Initial/greeting state\n• Information gathering\n• Processing/action states\n• Terminal/completion"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // State properties
    {
      id: 'state-properties',
      position: { x: 50, y: 500 },
      data: { label: '🔧 State Properties\n"State components:\n• Unique identifiers\n• Entry/exit actions\n• Prompt templates\n• Valid transitions"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Transition management
    {
      id: 'transition-management',
      position: { x: 600, y: 350 },
      data: { label: '🔄 Transition Management\n"Controlled flow:\n• Conditional branches\n• Guard conditions\n• Event triggers\n• Fallback paths"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 230 },
    },

    // LLM integration
    {
      id: 'llm-integration',
      position: { x: 750, y: 500 },
      data: { label: '🤖 LLM Integration\n"State-aware generation:\n• Context injection\n• Constrained outputs\n• Response validation\n• Token gating"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Context tracking layer
    {
      id: 'context-tracking',
      position: { x: 400, y: 650 },
      data: { label: '📝 Context Tracking Layer\n"Memory management:\n• Conversation history\n• State variables\n• User preferences\n• Session metadata"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 260 },
    },

    // Multi-agent orchestration
    {
      id: 'multi-agent-orchestration',
      position: { x: 200, y: 800 },
      data: { label: '👥 Multi-Agent Orchestration\n"Agent coordination:\n• State-based handoffs\n• Payload passing\n• Supervisor control\n• Tool calling flows"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // StateFlow implementation
    {
      id: 'stateflow-implementation',
      position: { x: 600, y: 800 },
      data: { label: '⚡ StateFlow Implementation\n"Performance gains:\n• 4-6x cost reduction\n• Reduced context length\n• Faster task completion\n• Improved accuracy"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 230 },
    },

    // Dynamic adaptability
    {
      id: 'dynamic-adaptability',
      position: { x: 200, y: 950 },
      data: { label: '🔀 Dynamic Adaptability\n"Flexible behavior:\n• Runtime state creation\n• Learning from feedback\n• Context-aware routing\n• Self-modification"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 230 },
    },

    // Human-in-the-loop control
    {
      id: 'human-in-loop',
      position: { x: 600, y: 950 },
      data: { label: '👤 Human-in-the-Loop\n"Manual intervention:\n• Approval gates\n• State rewinding\n• Override capabilities\n• Steering mechanisms"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Core state machine principle
    {
      id: 'state-machine-principle',
      position: { x: 400, y: 1100 },
      data: { label: '🎯 Context State Machine Principle\n"Structured state machines bring predictability to LLM conversations\nExplicit transitions ensure valid dialog flows and context preservation\nFSM control enables complex multi-agent orchestration at scale"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Challenge addressed by state machine
    {
      id: 'e1',
      source: 'conversation-management-challenge',
      target: 'context-state-machine',
      ...edgeStyle,
      label: 'solved by'
    },

    // State machine implements states and transitions
    {
      id: 'e2',
      source: 'context-state-machine',
      target: 'state-definition',
      ...edgeStyle,
      label: 'defines states'
    },
    {
      id: 'e3',
      source: 'context-state-machine',
      target: 'transition-management',
      ...edgeStyle,
      label: 'controls flow'
    },

    // State definition details
    {
      id: 'e4',
      source: 'state-definition',
      target: 'state-properties',
      ...edgeStyle,
      label: 'specifies'
    },

    // Transition connects to LLM
    {
      id: 'e5',
      source: 'transition-management',
      target: 'llm-integration',
      ...edgeStyle,
      label: 'guides'
    },

    // States and transitions feed context
    {
      id: 'e6',
      source: 'state-properties',
      target: 'context-tracking',
      ...edgeStyle,
      label: 'updates'
    },
    {
      id: 'e7',
      source: 'llm-integration',
      target: 'context-tracking',
      ...edgeStyle,
      label: 'maintains'
    },

    // Context enables orchestration
    {
      id: 'e8',
      source: 'context-tracking',
      target: 'multi-agent-orchestration',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e9',
      source: 'context-tracking',
      target: 'stateflow-implementation',
      ...edgeStyle,
      label: 'optimizes'
    },

    // Orchestration features
    {
      id: 'e10',
      source: 'multi-agent-orchestration',
      target: 'dynamic-adaptability',
      ...edgeStyle,
      label: 'supports'
    },
    {
      id: 'e11',
      source: 'stateflow-implementation',
      target: 'human-in-loop',
      ...edgeStyle,
      label: 'includes'
    },

    // Feedback loops
    {
      id: 'e12',
      source: 'dynamic-adaptability',
      target: 'state-definition',
      ...edgeStyle,
      label: 'modifies',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e13',
      source: 'human-in-loop',
      target: 'transition-management',
      ...edgeStyle,
      label: 'overrides',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },

    // Features demonstrate principle
    {
      id: 'e14',
      source: 'dynamic-adaptability',
      target: 'state-machine-principle',
      ...edgeStyle,
      label: 'validates'
    },
    {
      id: 'e15',
      source: 'human-in-loop',
      target: 'state-machine-principle',
      ...edgeStyle,
      label: 'proves',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Conversation Management Challenge",
      description: "How can we maintain structured dialog flows with predictable behavior while handling dynamic user inputs and complex multi-turn interactions in LLM-based systems?",
      activeNodes: ['conversation-management-challenge'],
      activeEdges: []
    },
    {
      title: "Context State Machine Solution",
      description: "Finite State Machine (FSM) controlled conversations address challenge through defined states, explicit transitions, context preservation, and structured workflow orchestration.",
      activeNodes: ['context-state-machine'],
      activeEdges: ['e1']
    },
    {
      title: "State Definition and Transition Management",
      description: "System defines conversation states (greeting, information gathering, processing, completion) with properties including unique IDs, prompt templates, and valid transitions controlled by conditional branches and guard conditions.",
      activeNodes: ['state-definition', 'state-properties', 'transition-management', 'llm-integration'],
      activeEdges: ['e2', 'e3', 'e4', 'e5']
    },
    {
      title: "Context Tracking and Memory Management",
      description: "Central context layer maintains conversation history, state variables, user preferences, and session metadata, enabling state-aware LLM generation with constrained outputs and response validation.",
      activeNodes: ['context-tracking'],
      activeEdges: ['e6', 'e7']
    },
    {
      title: "Multi-Agent Orchestration and Performance",
      description: "State machines enable multi-agent coordination through state-based handoffs and supervisor control, with StateFlow achieving 4-6x cost reduction and improved accuracy through optimized context management.",
      activeNodes: ['multi-agent-orchestration', 'stateflow-implementation'],
      activeEdges: ['e8', 'e9']
    },
    {
      title: "Dynamic Adaptability and Human Control",
      description: "System supports runtime state creation, learning from feedback, and human-in-the-loop controls including approval gates and state rewinding, proving structured FSMs bring predictability to complex LLM orchestration.",
      activeNodes: ['dynamic-adaptability', 'human-in-loop', 'state-machine-principle'],
      activeEdges: ['e10', 'e11', 'e12', 'e13', 'e14', 'e15']
    }
  ]
};