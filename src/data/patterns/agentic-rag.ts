import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const agenticRagPattern: PatternScenario = {
  id: 'agentic-rag-systems',
  title: 'Agentic RAG (Autonomous Retrieval-Augmented Generation)',
  description: 'Autonomous retrieval-augmented generation systems with self-directed planning, retrieval, and reasoning capabilities that can independently research complex topics and make strategic decisions.',
  initialNodes: [
    {
      id: 'complex-query',
      position: { x: 400, y: 50 },
      data: { label: '❓ Complex Query\n"Should my startup pivot\nfrom B2B to B2C given\ncurrent market conditions?"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },
    {
      id: 'autonomous-planner',
      position: { x: 400, y: 150 },
      data: { label: '🧠 Autonomous Planner\n"I need to research:\n1. Market trends\n2. Startup pivots\n3. B2B vs B2C dynamics"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },
    {
      id: 'research-plan',
      position: { x: 400, y: 250 },
      data: { label: '📋 Research Plan\nStep 1: Market analysis\nStep 2: Pivot case studies\nStep 3: Decision framework' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'market-research',
      position: { x: 150, y: 350 },
      data: { label: '📈 Market Research\nRetrieve: 2024 trends\nB2B/B2C market data\nEconomic indicators' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 180 },
    },
    {
      id: 'case-study-research',
      position: { x: 400, y: 350 },
      data: { label: '📚 Case Study Research\nFind: Successful pivots\nFailed pivots\nTiming factors' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 180 },
    },
    {
      id: 'framework-research',
      position: { x: 650, y: 350 },
      data: { label: '🔍 Framework Research\nDecision models\nPivot methodologies\nRisk assessment tools' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 180 },
    },
    {
      id: 'reasoning-engine',
      position: { x: 400, y: 450 },
      data: { label: '🤔 Reasoning Engine\n"Market shows B2C growth\nbut pivot risks are high.\nNeed more specific data."' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },
    {
      id: 'adaptive-retrieval',
      position: { x: 400, y: 550 },
      data: { label: '🔄 Adaptive Retrieval\n"Let me research your\nspecific industry and\ncompetitor pivots"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'synthesis-agent',
      position: { x: 400, y: 650 },
      data: { label: '🔗 Synthesis Agent\nIntegrate findings:\nMarket + Cases + Framework\n+ Industry context' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 220 },
    },
    {
      id: 'decision-generator',
      position: { x: 400, y: 750 },
      data: { label: '⚖️ Decision Generator\nWeigh pros/cons\nRisk assessment\nRecommendation logic' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'final-recommendation',
      position: { x: 400, y: 850 },
      data: { label: '✅ Strategic Recommendation\n"Given 65% B2C growth vs\n23% B2B, consider gradual\npivot with risk mitigation"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 280 },
    },
  ],
  initialEdges: [
    {
      id: 'e1',
      source: 'complex-query',
      target: 'autonomous-planner',
      ...edgeStyle,
      label: 'analyze'
    },
    {
      id: 'e2',
      source: 'autonomous-planner',
      target: 'research-plan',
      ...edgeStyle,
      label: 'create plan'
    },
    {
      id: 'e3a',
      source: 'research-plan',
      target: 'market-research',
      ...edgeStyle,
      label: 'execute step 1'
    },
    {
      id: 'e3b',
      source: 'research-plan',
      target: 'case-study-research',
      ...edgeStyle,
      label: 'execute step 2'
    },
    {
      id: 'e3c',
      source: 'research-plan',
      target: 'framework-research',
      ...edgeStyle,
      label: 'execute step 3'
    },
    {
      id: 'e4a',
      source: 'market-research',
      target: 'reasoning-engine',
      ...edgeStyle,
      label: 'market data'
    },
    {
      id: 'e4b',
      source: 'case-study-research',
      target: 'reasoning-engine',
      ...edgeStyle,
      label: 'case studies'
    },
    {
      id: 'e4c',
      source: 'framework-research',
      target: 'reasoning-engine',
      ...edgeStyle,
      label: 'frameworks'
    },
    {
      id: 'e5',
      source: 'reasoning-engine',
      target: 'adaptive-retrieval',
      ...edgeStyle,
      label: 'need more data'
    },
    {
      id: 'e6',
      source: 'adaptive-retrieval',
      target: 'synthesis-agent',
      ...edgeStyle,
      label: 'additional context'
    },
    {
      id: 'e7',
      source: 'reasoning-engine',
      target: 'synthesis-agent',
      ...edgeStyle,
      label: 'initial findings'
    },
    {
      id: 'e8',
      source: 'synthesis-agent',
      target: 'decision-generator',
      ...edgeStyle,
      label: 'synthesized insights'
    },
    {
      id: 'e9',
      source: 'decision-generator',
      target: 'final-recommendation',
      ...edgeStyle,
      label: 'generate'
    },
  ],
  steps: [
    {
      title: "Autonomous Planning",
      description: "Agent analyzes complex business query and autonomously creates multi-step research plan: market analysis, pivot case studies, decision frameworks.",
      activeNodes: ['complex-query', 'autonomous-planner', 'research-plan'],
      activeEdges: ['e1', 'e2']
    },
    {
      title: "Self-Directed Parallel Research",
      description: "Agent executes research plan independently across multiple domains: market trends, successful/failed pivot cases, and decision methodologies.",
      activeNodes: ['market-research', 'case-study-research', 'framework-research'],
      activeEdges: ['e3a', 'e3b', 'e3c']
    },
    {
      title: "Autonomous Reasoning & Gap Detection",
      description: "Reasoning engine analyzes collected information, identifies knowledge gaps, and autonomously decides additional research is needed.",
      activeNodes: ['reasoning-engine'],
      activeEdges: ['e4a', 'e4b', 'e4c']
    },
    {
      title: "Adaptive Information Gathering",
      description: "Agent autonomously conducts targeted follow-up research on industry-specific factors and competitor pivot strategies to fill identified gaps.",
      activeNodes: ['adaptive-retrieval'],
      activeEdges: ['e5']
    },
    {
      title: "Strategic Synthesis & Recommendation",
      description: "Agent synthesizes all research, applies decision frameworks, and generates strategic recommendation with specific data and risk assessment.",
      activeNodes: ['synthesis-agent', 'decision-generator', 'final-recommendation'],
      activeEdges: ['e6', 'e7', 'e8', 'e9']
    }
  ]
};