import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const conversationalInterfacePatternsPattern: PatternScenario = {
  id: 'conversational-interface-patterns',
  title: 'Conversational Interface Patterns',
  description: 'Advanced multimodal conversational experiences beyond traditional chatbots, featuring agent-driven flows, emotional intelligence, and context-aware dialogue achieving 82% user preference',
  initialNodes: [
    // Traditional chatbot limitations
    {
      id: 'traditional-chatbot-limitations',
      position: { x: 400, y: 50 },
      data: { label: '💬 Traditional Chatbot Limitations\n"How to evolve beyond simple\nQ&A patterns to sophisticated\nconversational experiences?"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 320 },
    },

    // Advanced conversational framework
    {
      id: 'advanced-conversational-framework',
      position: { x: 400, y: 200 },
      data: { label: '🚀 Advanced Conversational Framework\n"Next-gen patterns:\n• Multimodal integration\n• Agent-driven flows\n• Context awareness\n• Emotional intelligence"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 300 },
    },

    // Multimodal conversation
    {
      id: 'multimodal-conversation',
      position: { x: 200, y: 350 },
      data: { label: '🎭 Multimodal Conversation\n"Integrated modalities:\n• Text & voice\n• Visual & gesture\n• Real-time fusion\n• 40% AI adoption by 2027"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Advanced models
    {
      id: 'advanced-models',
      position: { x: 50, y: 500 },
      data: { label: '🧠 Advanced Models\n"Leading systems:\n• GPT-4o multimodal\n• Claude 3 visual\n• Gemini 2.0 Flash\n• EVI 3 emotional"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Context-aware dialogue
    {
      id: 'context-aware-dialogue',
      position: { x: 600, y: 350 },
      data: { label: '🧩 Context-Aware Dialogue\n"Memory systems:\n• Episodic memory\n• Semantic networks\n• State management\n• 40-60% load reduction"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // Memory architecture
    {
      id: 'memory-architecture',
      position: { x: 750, y: 500 },
      data: { label: '💾 Memory Architecture\n"Context layers:\n• Session persistence\n• Working memory\n• Hierarchical context\n• Sliding windows"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // Agent-driven flows
    {
      id: 'agent-driven-flows',
      position: { x: 400, y: 650 },
      data: { label: '🎯 Agent-Driven Flows\n"Proactive intelligence:\n• Initiative taking\n• Need anticipation\n• Inner thoughts framework\n• Mixed-initiative control"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 260 },
    },

    // Emotional intelligence
    {
      id: 'emotional-intelligence',
      position: { x: 200, y: 800 },
      data: { label: '❤️ Emotional Intelligence\n"Empathetic responses:\n• Emotion recognition\n• Context-sensitive empathy\n• Personality consistency\n• Cultural adaptation"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 250 },
    },

    // Conversation repair
    {
      id: 'conversation-repair',
      position: { x: 600, y: 800 },
      data: { label: '🔧 Conversation Repair\n"Error handling:\n• Misunderstanding recovery\n• Context restoration\n• Clarification protocols\n• Learning adaptation"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Complex task completion
    {
      id: 'complex-task-completion',
      position: { x: 200, y: 950 },
      data: { label: '⚙️ Complex Task Completion\n"Hybrid interfaces:\n• Visual intent mapping\n• Progressive disclosure\n• Workflow components\n• Multi-turn state"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    // Accessibility design
    {
      id: 'accessibility-design',
      position: { x: 600, y: 950 },
      data: { label: '♿ Accessibility Design\n"Inclusive patterns:\n• Speech-to-text/TTS\n• Multilingual support\n• WCAG compliance\n• Multiple interaction modes"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },

    // Production success
    {
      id: 'production-success',
      position: { x: 400, y: 1100 },
      data: { label: '📊 Production Success\n"Enterprise results:\n• 70% Fortune 500 adoption\n• 3 hours/week saved\n• 82% user preference\n• $129.4M annual ROI"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 260 },
    },

    // Core conversational principle
    {
      id: 'conversational-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Advanced Conversational Principle\n"Multimodal integration with emotional intelligence achieves 82% user preference\nAgent-driven flows with context awareness enable 3 hours/week productivity gains\nInclusive design ensures accessibility across diverse user populations"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Limitations addressed by framework
    {
      id: 'e1',
      source: 'traditional-chatbot-limitations',
      target: 'advanced-conversational-framework',
      ...edgeStyle,
      label: 'evolved into'
    },

    // Framework components
    {
      id: 'e2',
      source: 'advanced-conversational-framework',
      target: 'multimodal-conversation',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e3',
      source: 'advanced-conversational-framework',
      target: 'context-aware-dialogue',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e4',
      source: 'advanced-conversational-framework',
      target: 'agent-driven-flows',
      ...edgeStyle,
      label: 'provides'
    },

    // Multimodal details
    {
      id: 'e5',
      source: 'multimodal-conversation',
      target: 'advanced-models',
      ...edgeStyle,
      label: 'powered by'
    },

    // Context details
    {
      id: 'e6',
      source: 'context-aware-dialogue',
      target: 'memory-architecture',
      ...edgeStyle,
      label: 'built on'
    },

    // Agent flow connections
    {
      id: 'e7',
      source: 'agent-driven-flows',
      target: 'emotional-intelligence',
      ...edgeStyle,
      label: 'includes'
    },
    {
      id: 'e8',
      source: 'agent-driven-flows',
      target: 'conversation-repair',
      ...edgeStyle,
      label: 'handles'
    },

    // Cross-connections
    {
      id: 'e9',
      source: 'advanced-models',
      target: 'emotional-intelligence',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e10',
      source: 'memory-architecture',
      target: 'conversation-repair',
      ...edgeStyle,
      label: 'supports'
    },

    // Implementation flows
    {
      id: 'e11',
      source: 'emotional-intelligence',
      target: 'complex-task-completion',
      ...edgeStyle,
      label: 'enhances'
    },
    {
      id: 'e12',
      source: 'conversation-repair',
      target: 'accessibility-design',
      ...edgeStyle,
      label: 'ensures'
    },

    // Success validation
    {
      id: 'e13',
      source: 'complex-task-completion',
      target: 'production-success',
      ...edgeStyle,
      label: 'achieves'
    },
    {
      id: 'e14',
      source: 'accessibility-design',
      target: 'production-success',
      ...edgeStyle,
      label: 'enables'
    },

    // Success proves principle
    {
      id: 'e15',
      source: 'production-success',
      target: 'conversational-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Traditional Chatbot Limitations",
      description: "How can conversational interfaces evolve beyond simple question-answering patterns to sophisticated, multimodal experiences that understand context and anticipate user needs?",
      activeNodes: ['traditional-chatbot-limitations'],
      activeEdges: []
    },
    {
      title: "Advanced Conversational Framework",
      description: "Next-generation framework addresses limitations through multimodal integration, agent-driven flows, context awareness, and emotional intelligence for superior user experiences.",
      activeNodes: ['advanced-conversational-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Multimodal and Context-Aware Systems",
      description: "Integrated text, voice, visual, and gesture processing powered by GPT-4o, Claude 3, and Gemini 2.0. Context-aware dialogue uses episodic memory and hierarchical context achieving 40-60% cognitive load reduction.",
      activeNodes: ['multimodal-conversation', 'advanced-models', 'context-aware-dialogue', 'memory-architecture'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Agent-Driven Intelligence and Emotional Awareness",
      description: "Proactive intelligence with Inner Thoughts framework enables need anticipation. Emotional intelligence provides empathetic responses with personality consistency and cultural adaptation.",
      activeNodes: ['agent-driven-flows', 'emotional-intelligence', 'conversation-repair'],
      activeEdges: ['e4', 'e7', 'e8', 'e9', 'e10']
    },
    {
      title: "Complex Tasks and Inclusive Design",
      description: "Hybrid interfaces combine visual intent mapping with progressive disclosure. Accessibility design ensures speech-to-text/TTS, multilingual support, and WCAG compliance for inclusive experiences.",
      activeNodes: ['complex-task-completion', 'accessibility-design'],
      activeEdges: ['e11', 'e12']
    },
    {
      title: "Production Success and Validation",
      description: "70% Fortune 500 adoption with 3 hours/week productivity gains. 82% user preference and $129.4M annual ROI validate multimodal integration with emotional intelligence for inclusive conversational experiences.",
      activeNodes: ['production-success', 'conversational-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};