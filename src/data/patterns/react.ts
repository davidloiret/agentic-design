import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const reactPattern: PatternScenario = {
  id: 'react',
  title: 'ReAct Pattern (Reasoning + Acting)',
  description: 'Iterative cycle of reasoning, acting, and observing that enables step-by-step problem solving with external tools',
  initialNodes: [
    {
      id: 'task',
      position: { x: 400, y: 50 },
      data: { label: '❓ Complex Task\n"Find the most recent\nstock price and calculate\nif I can afford 100 shares\nwith my $10K budget"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },
    {
      id: 'think-1',
      position: { x: 150, y: 180 },
      data: { label: '🤔 Thought 1\n"I need current stock\nprice first. Let me\nsearch for stock data."' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'act-1',
      position: { x: 150, y: 280 },
      data: { label: '🔧 Action 1\nSearch: "AAPL current\nstock price API"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'observe-1',
      position: { x: 150, y: 380 },
      data: { label: '👁️ Observation 1\n"Found Alpha Vantage API.\nAAPL: $175.50 per share"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'think-2',
      position: { x: 400, y: 380 },
      data: { label: '🤔 Thought 2\n"Now I can calculate:\n100 × $175.50 = $17,550\nThat exceeds my $10K"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },
    {
      id: 'act-2',
      position: { x: 400, y: 480 },
      data: { label: '🔧 Action 2\nCalculate: Maximum\nshares I can afford\n$10,000 ÷ $175.50' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'observe-2',
      position: { x: 400, y: 580 },
      data: { label: '👁️ Observation 2\n"I can afford 56 shares\n(56 × $175.50 = $9,828)\nLeaving $172 remainder"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },
    {
      id: 'think-3',
      position: { x: 650, y: 380 },
      data: { label: '🤔 Thought 3\n"Let me double-check\nwith real-time data\nto be accurate"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'act-3',
      position: { x: 650, y: 480 },
      data: { label: '🔧 Action 3\nCall API: Get live\nAAPL price data' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'observe-3',
      position: { x: 650, y: 580 },
      data: { label: '👁️ Observation 3\n"Current: $174.25\nBetter! 57 shares possible\n57 × $174.25 = $9,932"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },
    {
      id: 'final-answer',
      position: { x: 400, y: 700 },
      data: { label: '✅ Final Answer\n"You cannot afford 100 shares.\nWith $10K, you can buy\n57 AAPL shares at $174.25,\ntotal cost: $9,932.25"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 280 },
    },
  ],
  initialEdges: [
    {
      id: 'e1',
      source: 'task',
      target: 'think-1',
      ...edgeStyle,
      label: 'reason'
    },
    {
      id: 'e2',
      source: 'think-1',
      target: 'act-1',
      ...edgeStyle,
      label: 'plan action'
    },
    {
      id: 'e3',
      source: 'act-1',
      target: 'observe-1',
      ...edgeStyle,
      label: 'get result'
    },
    {
      id: 'e4',
      source: 'observe-1',
      target: 'think-2',
      ...edgeStyle,
      label: 'process info'
    },
    {
      id: 'e5',
      source: 'think-2',
      target: 'act-2',
      ...edgeStyle,
      label: 'calculate'
    },
    {
      id: 'e6',
      source: 'act-2',
      target: 'observe-2',
      ...edgeStyle,
      label: 'see result'
    },
    {
      id: 'e7',
      source: 'observe-2',
      target: 'think-3',
      ...edgeStyle,
      label: 'verify need'
    },
    {
      id: 'e8',
      source: 'think-3',
      target: 'act-3',
      ...edgeStyle,
      label: 'double-check'
    },
    {
      id: 'e9',
      source: 'act-3',
      target: 'observe-3',
      ...edgeStyle,
      label: 'live data'
    },
    {
      id: 'e10',
      source: 'observe-3',
      target: 'final-answer',
      ...edgeStyle,
      label: 'conclude'
    },
  ],
  steps: [
    {
      title: "Initial Reasoning",
      description: "Agent analyzes complex task requiring external data and breaks it down: need stock price first, then calculate affordability.",
      activeNodes: ['task', 'think-1'],
      activeEdges: ['e1']
    },
    {
      title: "First Action-Observation Cycle",
      description: "Agent searches for stock API, finds Alpha Vantage, and observes AAPL price at $175.50 per share.",
      activeNodes: ['act-1', 'observe-1'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Reasoning from Observation",
      description: "Agent processes the price data and reasons: 100 × $175.50 = $17,550 exceeds the $10K budget.",
      activeNodes: ['think-2'],
      activeEdges: ['e4']
    },
    {
      title: "Calculation Action",
      description: "Agent performs mathematical calculation to determine maximum affordable shares: $10,000 ÷ $175.50 = 56 shares.",
      activeNodes: ['act-2', 'observe-2'],
      activeEdges: ['e5', 'e6']
    },
    {
      title: "Iterative Refinement",
      description: "Agent decides to verify with real-time data, calls live API, finds better price $174.25, enabling 57 shares purchase.",
      activeNodes: ['think-3', 'act-3', 'observe-3'],
      activeEdges: ['e7', 'e8', 'e9']
    },
    {
      title: "Synthesis & Final Answer",
      description: "Agent synthesizes all observations to provide comprehensive answer: cannot buy 100 shares, but can afford 57 shares for $9,932.25.",
      activeNodes: ['final-answer'],
      activeEdges: ['e10']
    }
  ]
};