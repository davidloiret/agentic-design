import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const contextEngineeringFrameworksPattern: PatternScenario = {
  id: 'context-engineering-frameworks',
  title: 'Context Engineering Frameworks Pattern',
  description: 'Systematic frameworks for designing, optimizing, and managing contexts using tools like DSPy, LangChain, and Semantic Kernel achieving 340% ROI with automated optimization',
  initialNodes: [
    // Context engineering challenge
    {
      id: 'context-engineering-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Context Engineering Challenge\n"How to systematically design,\noptimize, and manage contexts\nfor production LLM applications?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // Framework ecosystem
    {
      id: 'framework-ecosystem',
      position: { x: 400, y: 200 },
      data: { label: '🏗️ Framework Ecosystem\n"Production systems:\n• LangChain/LangGraph\n• DSPy programming\n• Semantic Kernel\n• Prompt Flow"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // DSPy optimization
    {
      id: 'dspy-optimization',
      position: { x: 200, y: 350 },
      data: { label: '🔧 DSPy Framework\n"Programming prompts:\n• Declarative signatures\n• Automatic optimization\n• BootstrapFewShot\n• MIPRO/COPRO"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // Automatic optimization
    {
      id: 'automatic-optimization',
      position: { x: 50, y: 500 },
      data: { label: '🚀 Automatic Optimization\n"AI-driven tuning:\n• Example selection\n• Format optimization\n• Instruction tuning\n• 70% compression"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // LangChain ecosystem
    {
      id: 'langchain-ecosystem',
      position: { x: 600, y: 350 },
      data: { label: '🔗 LangChain/LangGraph\n"Workflow orchestration:\n• LCEL composition\n• Stateful graphs\n• Tool integration\n• Production agents"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // Template systems
    {
      id: 'template-systems',
      position: { x: 750, y: 500 },
      data: { label: '📝 Template Systems\n"Structured prompts:\n• Variable injection\n• XML/JSON formats\n• Version control\n• Security validation"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // Context assembly
    {
      id: 'context-assembly',
      position: { x: 400, y: 650 },
      data: { label: '🔄 Dynamic Assembly\n"Task-aware construction:\n• Relevance scoring\n• Priority weighting\n• Window optimization\n• 85% relevance gain"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 270 },
    },

    // Prompt chaining
    {
      id: 'prompt-chaining',
      position: { x: 200, y: 800 },
      data: { label: '⛓️ Prompt Chaining\n"Composition patterns:\n• Sequential flows\n• Parallel processing\n• Conditional routing\n• Cyclical refinement"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Evaluation frameworks
    {
      id: 'evaluation-frameworks',
      position: { x: 600, y: 800 },
      data: { label: '📊 Evaluation Systems\n"Testing platforms:\n• PromptLayer\n• LangSmith\n• ChainForge\n• Security testing"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 210 },
    },

    // Context management
    {
      id: 'context-management',
      position: { x: 200, y: 950 },
      data: { label: '💾 Context Management\n"Window optimization:\n• Lost-in-middle fix\n• Sliding windows\n• Semantic compression\n• Cache strategies"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    // Multi-turn handling
    {
      id: 'multi-turn-handling',
      position: { x: 600, y: 950 },
      data: { label: '🗣️ Multi-Turn Handling\n"Conversation context:\n• Session persistence\n• Memory hierarchies\n• Progressive compression\n• 100% continuity"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },

    // Production deployment
    {
      id: 'production-deployment',
      position: { x: 400, y: 1100 },
      data: { label: '🚢 Production Deployment\n"Enterprise implementation:\n• 340% ROI average\n• 30-60% cost reduction\n• 67% escalation drop\n• Security compliance"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 270 },
    },

    // Core engineering principle
    {
      id: 'engineering-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Context Engineering Principle\n"Systematic frameworks enable reliable production deployment\nAutomatic optimization achieves 70% compression with 97% fidelity\nDynamic assembly and evaluation ensure continuous improvement"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Challenge addressed by ecosystem
    {
      id: 'e1',
      source: 'context-engineering-challenge',
      target: 'framework-ecosystem',
      ...edgeStyle,
      label: 'solved by'
    },

    // Ecosystem branches
    {
      id: 'e2',
      source: 'framework-ecosystem',
      target: 'dspy-optimization',
      ...edgeStyle,
      label: 'includes'
    },
    {
      id: 'e3',
      source: 'framework-ecosystem',
      target: 'langchain-ecosystem',
      ...edgeStyle,
      label: 'provides'
    },
    {
      id: 'e4',
      source: 'framework-ecosystem',
      target: 'context-assembly',
      ...edgeStyle,
      label: 'enables'
    },

    // DSPy details
    {
      id: 'e5',
      source: 'dspy-optimization',
      target: 'automatic-optimization',
      ...edgeStyle,
      label: 'performs'
    },

    // LangChain details
    {
      id: 'e6',
      source: 'langchain-ecosystem',
      target: 'template-systems',
      ...edgeStyle,
      label: 'implements'
    },

    // Assembly connections
    {
      id: 'e7',
      source: 'context-assembly',
      target: 'prompt-chaining',
      ...edgeStyle,
      label: 'utilizes'
    },
    {
      id: 'e8',
      source: 'context-assembly',
      target: 'evaluation-frameworks',
      ...edgeStyle,
      label: 'validated by'
    },

    // Cross-connections
    {
      id: 'e9',
      source: 'automatic-optimization',
      target: 'context-management',
      ...edgeStyle,
      label: 'optimizes'
    },
    {
      id: 'e10',
      source: 'template-systems',
      target: 'multi-turn-handling',
      ...edgeStyle,
      label: 'supports'
    },

    // Management flows
    {
      id: 'e11',
      source: 'prompt-chaining',
      target: 'context-management',
      ...edgeStyle,
      label: 'requires'
    },
    {
      id: 'e12',
      source: 'evaluation-frameworks',
      target: 'multi-turn-handling',
      ...edgeStyle,
      label: 'tests'
    },

    // Production connections
    {
      id: 'e13',
      source: 'context-management',
      target: 'production-deployment',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e14',
      source: 'multi-turn-handling',
      target: 'production-deployment',
      ...edgeStyle,
      label: 'ensures'
    },

    // Deployment validates principle
    {
      id: 'e15',
      source: 'production-deployment',
      target: 'engineering-principle',
      ...edgeStyle,
      label: 'demonstrates',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Context Engineering Challenge",
      description: "How can we systematically design, optimize, and manage contexts for production LLM applications while ensuring reliability, efficiency, and maintainability?",
      activeNodes: ['context-engineering-challenge'],
      activeEdges: []
    },
    {
      title: "Framework Ecosystem Overview",
      description: "Production frameworks provide comprehensive solutions: LangChain/LangGraph for workflows, DSPy for programmatic optimization, Semantic Kernel for enterprise integration, and Prompt Flow for visual development.",
      activeNodes: ['framework-ecosystem'],
      activeEdges: ['e1']
    },
    {
      title: "DSPy and LangChain Frameworks",
      description: "DSPy treats prompting as programming with declarative signatures and automatic optimization achieving 70% compression, while LangChain provides LCEL composition with stateful graphs and production tool integration.",
      activeNodes: ['dspy-optimization', 'automatic-optimization', 'langchain-ecosystem', 'template-systems'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Dynamic Context Assembly",
      description: "Task-aware construction analyzes requirements for relevance scoring and priority weighting, achieving 85% relevance gain through intelligent window optimization and component selection.",
      activeNodes: ['context-assembly', 'prompt-chaining', 'evaluation-frameworks'],
      activeEdges: ['e4', 'e7', 'e8']
    },
    {
      title: "Context and Conversation Management",
      description: "Context management fixes lost-in-middle problem with sliding windows and semantic compression, while multi-turn handling ensures 100% session continuity through memory hierarchies and progressive compression.",
      activeNodes: ['context-management', 'multi-turn-handling'],
      activeEdges: ['e9', 'e10', 'e11', 'e12']
    },
    {
      title: "Production Deployment Success",
      description: "Enterprise implementations achieve 340% average ROI with 30-60% cost reduction and 67% escalation drop, proving systematic frameworks with automatic optimization enable reliable deployment with continuous improvement.",
      activeNodes: ['production-deployment', 'engineering-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};