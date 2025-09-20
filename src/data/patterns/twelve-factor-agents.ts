import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const twelveFactorAgentsPattern: PatternScenario = {
  id: 'twelve-factor-agents',
  title: '12-Factor Agent Methodology Pattern',
  description: 'Production-ready AI agent engineering framework inspired by 12-Factor Apps, transforming experimental prototypes into reliable, scalable, maintainable LLM-powered software systems',
  initialNodes: [
    // Production AI challenge
    {
      id: 'production-ai-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🚀 Production AI Agent Challenge\n"How to build LLM-powered software\nreliable enough for production customers\nbeyond experimental prototypes?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // Traditional approach failure
    {
      id: 'traditional-approach-failure',
      position: { x: 150, y: 200 },
      data: { label: '❌ Traditional Framework Failure\n"Prompt + Tools + Loop approach:\n• 70% functionality quickly\n• Last 20% debugging nightmare\n• Unreliable in production"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 240 },
    },

    // 12-Factor Agent methodology
    {
      id: 'twelve-factor-methodology',
      position: { x: 650, y: 200 },
      data: { label: '🏗️ 12-Factor Agent Methodology\n"Engineering discipline for AI agents:\n• Production-ready principles\n• Modeled after 12-Factor Apps\n• Mostly software + strategic LLM"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Foundation factors (1-4)
    {
      id: 'foundation-factors',
      position: { x: 400, y: 350 },
      data: { label: '🏛️ Foundation Factors (1-4)\n"Core engineering principles:\n• Natural Language → JSON extraction\n• Own your prompts & context\n• Tools as structured outputs"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 270 },
    },

    // Factor 1: JSON extraction
    {
      id: 'json-extraction',
      position: { x: 200, y: 500 },
      data: { label: '1️⃣ Natural Language → JSON\n"Core LLM superpower:\nConvert unstructured language\nto structured, actionable data"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    // Factor 2: Own prompts
    {
      id: 'own-prompts',
      position: { x: 400, y: 500 },
      data: { label: '2️⃣ Own Your Prompts\n"Production quality requires\nhand-crafted prompts,\nnot generic abstractions"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },

    // Factor 3: Context management
    {
      id: 'context-management',
      position: { x: 600, y: 500 },
      data: { label: '3️⃣ Own Your Context Window\n"Actively curate what LLM sees\nAvoid blind information appending\nExplicit context management"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    // State & control factors (5-8)
    {
      id: 'state-control-factors',
      position: { x: 400, y: 650 },
      data: { label: '⚙️ State & Control Factors (5-8)\n"Execution management:\n• Stateless agent design\n• Explicit control flow\n• Human integration as first-class"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 270 },
    },

    // Factor 6: Stateless design
    {
      id: 'stateless-design',
      position: { x: 200, y: 800 },
      data: { label: '6️⃣ Stateless Agent Design\n"Enable pause/resume capability\nSupport horizontal scaling\nPure functions transforming state"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Factor 7: Human integration
    {
      id: 'human-integration',
      position: { x: 400, y: 800 },
      data: { label: '7️⃣ Contact Humans First-Class\n"Human interaction as core feature\nNot edge case, but fundamental\ndesign consideration"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Factor 10: Small focused agents
    {
      id: 'small-focused-agents',
      position: { x: 600, y: 800 },
      data: { label: '🔟 Small, Focused Agents\n"Limit to 3-10 steps max\nImprove reliability through simplicity\nMicro-agents for specific tasks"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    // Production excellence outcome
    {
      id: 'production-excellence',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Production-Ready Agent Excellence\n"Reliable, scalable, maintainable LLM systems\nMostly traditional software + strategic LLM\nEngineering discipline transforms prototypes"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 320 },
    },

    // Core principle
    {
      id: 'core-principle',
      position: { x: 400, y: 1100 },
      data: { label: '🎯 12-Factor Agent Principle\n"Successful production agents are sophisticated hybrids:\nwell-engineered software with LLM capabilities\ncarefully integrated at strategic control points"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 350 },
    },
  ],
  initialEdges: [
    // Challenge splits into two approaches
    {
      id: 'e1',
      source: 'production-ai-challenge',
      target: 'traditional-approach-failure',
      ...edgeStyle,
      label: 'traditional approach'
    },
    {
      id: 'e2',
      source: 'production-ai-challenge',
      target: 'twelve-factor-methodology',
      ...edgeStyle,
      label: 'engineering approach'
    },

    // Methodology implements foundation factors
    {
      id: 'e3',
      source: 'twelve-factor-methodology',
      target: 'foundation-factors',
      ...edgeStyle,
      label: 'establishes foundations'
    },

    // Foundation factors include specific principles
    {
      id: 'e4',
      source: 'foundation-factors',
      target: 'json-extraction',
      ...edgeStyle,
      label: 'includes Factor 1'
    },
    {
      id: 'e5',
      source: 'foundation-factors',
      target: 'own-prompts',
      ...edgeStyle,
      label: 'includes Factor 2'
    },
    {
      id: 'e6',
      source: 'foundation-factors',
      target: 'context-management',
      ...edgeStyle,
      label: 'includes Factor 3'
    },

    // Foundation leads to state & control
    {
      id: 'e7',
      source: 'foundation-factors',
      target: 'state-control-factors',
      ...edgeStyle,
      label: 'enables advanced control'
    },

    // State & control factors include specific implementations
    {
      id: 'e8',
      source: 'state-control-factors',
      target: 'stateless-design',
      ...edgeStyle,
      label: 'includes Factor 6'
    },
    {
      id: 'e9',
      source: 'state-control-factors',
      target: 'human-integration',
      ...edgeStyle,
      label: 'includes Factor 7'
    },
    {
      id: 'e10',
      source: 'state-control-factors',
      target: 'small-focused-agents',
      ...edgeStyle,
      label: 'includes Factor 10'
    },

    // All factors contribute to production excellence
    {
      id: 'e11',
      source: 'json-extraction',
      target: 'production-excellence',
      ...edgeStyle,
      label: 'enables reliability'
    },
    {
      id: 'e12',
      source: 'own-prompts',
      target: 'production-excellence',
      ...edgeStyle,
      label: 'ensures quality'
    },
    {
      id: 'e13',
      source: 'context-management',
      target: 'production-excellence',
      ...edgeStyle,
      label: 'improves control'
    },
    {
      id: 'e14',
      source: 'stateless-design',
      target: 'production-excellence',
      ...edgeStyle,
      label: 'enables scaling'
    },
    {
      id: 'e15',
      source: 'human-integration',
      target: 'production-excellence',
      ...edgeStyle,
      label: 'ensures usability'
    },
    {
      id: 'e16',
      source: 'small-focused-agents',
      target: 'production-excellence',
      ...edgeStyle,
      label: 'improves reliability'
    },

    // Production excellence demonstrates core principle
    {
      id: 'e17',
      source: 'production-excellence',
      target: 'core-principle',
      ...edgeStyle,
      label: 'proves hybrid approach',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },

    // Traditional failure also validates principle
    {
      id: 'e18',
      source: 'traditional-approach-failure',
      target: 'core-principle',
      ...edgeStyle,
      label: 'demonstrates need',
      style: { ...edgeStyle.style, strokeDasharray: '5,5', stroke: '#ef4444' }
    },
  ],
  steps: [
    {
      title: "Production AI Agent Engineering Challenge",
      description: "How do we build LLM-powered software that's reliable enough for production customers? Moving beyond experimental prototypes requires systematic engineering discipline.",
      activeNodes: ['production-ai-challenge'],
      activeEdges: []
    },
    {
      title: "Traditional vs Engineering Approaches",
      description: "Traditional 'prompt + tools + loop' frameworks get 70% functionality quickly but fail in production. 12-Factor methodology applies software engineering discipline to AI agents.",
      activeNodes: ['traditional-approach-failure', 'twelve-factor-methodology'],
      activeEdges: ['e1', 'e2']
    },
    {
      title: "Foundation Factors: Core Engineering Principles",
      description: "Establish fundamental engineering practices: natural language to JSON extraction as core superpower, hand-crafted prompts over abstractions, explicit context window management.",
      activeNodes: ['foundation-factors', 'json-extraction', 'own-prompts', 'context-management'],
      activeEdges: ['e3', 'e4', 'e5', 'e6']
    },
    {
      title: "State & Control Factors: Advanced Management",
      description: "Implement sophisticated execution control: stateless design for scalability, human integration as first-class feature, small focused agents for reliability improvement.",
      activeNodes: ['state-control-factors', 'stateless-design', 'human-integration', 'small-focused-agents'],
      activeEdges: ['e7', 'e8', 'e9', 'e10']
    },
    {
      title: "Production Excellence Through Engineering Discipline",
      description: "All 12 factors converge to create production-ready systems: JSON extraction enables reliability, owned prompts ensure quality, stateless design enables scaling, human integration ensures usability.",
      activeNodes: ['production-excellence'],
      activeEdges: ['e11', 'e12', 'e13', 'e14', 'e15', 'e16']
    },
    {
      title: "Core 12-Factor Agent Principle",
      description: "Successful production agents are sophisticated hybrids: well-engineered traditional software with LLM capabilities strategically integrated, proving engineering discipline transforms prototypes into reliable systems.",
      activeNodes: ['core-principle'],
      activeEdges: ['e17', 'e18']
    }
  ]
};