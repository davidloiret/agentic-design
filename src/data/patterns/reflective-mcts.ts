import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const reflectiveMctsPattern: PatternScenario = {
  id: 'reflective-mcts',
  title: 'Reflective Monte Carlo Tree Search',
  description: 'Enhanced MCTS with contrastive reflection that learns from both successful and failed paths to improve exploration and decision quality',
  initialNodes: [
    {
      id: 'game-state',
      position: { x: 400, y: 50 },
      data: { label: '♛ Chess Position\n"Mid-game: White to move\nMaterial equal\nKing safety critical"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'root-node',
      position: { x: 400, y: 150 },
      data: { label: '🌳 Root Node\nCurrent position\nVisits: 0\nValue: Unknown' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },
    // First iteration - Standard MCTS
    {
      id: 'move-a',
      position: { x: 200, y: 250 },
      data: { label: '♞ Move A: Nf3\nVisits: 150\nWin rate: 45%' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 150 },
    },
    {
      id: 'move-b',
      position: { x: 400, y: 250 },
      data: { label: '♝ Move B: Bc4\nVisits: 200\nWin rate: 52%' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 150 },
    },
    {
      id: 'move-c',
      position: { x: 600, y: 250 },
      data: { label: '♜ Move C: 0-0-0\nVisits: 100\nWin rate: 38%' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 150 },
    },
    // Simulation results
    {
      id: 'simulation-bc4',
      position: { x: 400, y: 350 },
      data: { label: '🎲 Simulation: Bc4\n"Led to tactical blunder\nin 8 moves → Loss"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    // Reflective Analysis
    {
      id: 'reflection-engine',
      position: { x: 400, y: 450 },
      data: { label: '🔍 Reflection Engine\n"Why did Bc4 fail?\nAnalyzing decision path\nand failure modes"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'contrastive-analysis',
      position: { x: 150, y: 550 },
      data: { label: '⚖️ Contrastive Analysis\n"Bc4 exposed king\nvs Nf3 developed safely\nPattern: Development vs Attack"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },
    {
      id: 'failure-pattern',
      position: { x: 400, y: 550 },
      data: { label: '❌ Failure Pattern\n"Premature attacks\nwithout king safety\nlead to tactical holes"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },
    {
      id: 'success-pattern',
      position: { x: 650, y: 550 },
      data: { label: '✅ Success Pattern\n"Solid development\nfirst, then attack\nwhen position secure"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    // Enhanced exploration
    {
      id: 'enhanced-selection',
      position: { x: 400, y: 650 },
      data: { label: '🧠 Enhanced Selection\n"Bias against risky attacks\nFavor solid moves\nExplore Nf3 variations"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },
    {
      id: 'new-candidate',
      position: { x: 100, y: 750 },
      data: { label: '🆕 New Move: Nf3\nReflection-guided\nVisits: 300\nWin rate: 58%' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    {
      id: 'avoided-move',
      position: { x: 300, y: 750 },
      data: { label: '🚫 Avoided: Qh5\n"Reflection flagged:\nPremature attack\nSimilar to Bc4 failure"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    {
      id: 'final-decision',
      position: { x: 400, y: 850 },
      data: { label: '✅ Best Move: Nf3\n"Reflective MCTS found\nsolid development\nover flashy attacks"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },
  ],
  initialEdges: [
    {
      id: 'e1',
      source: 'game-state',
      target: 'root-node',
      ...edgeStyle,
      label: 'initialize'
    },
    // MCTS expansion
    {
      id: 'e2a',
      source: 'root-node',
      target: 'move-a',
      ...edgeStyle,
      label: 'explore'
    },
    {
      id: 'e2b',
      source: 'root-node',
      target: 'move-b',
      ...edgeStyle,
      label: 'explore'
    },
    {
      id: 'e2c',
      source: 'root-node',
      target: 'move-c',
      ...edgeStyle,
      label: 'explore'
    },
    // Simulation
    {
      id: 'e3',
      source: 'move-b',
      target: 'simulation-bc4',
      ...edgeStyle,
      label: 'simulate'
    },
    // Reflection process
    {
      id: 'e4',
      source: 'simulation-bc4',
      target: 'reflection-engine',
      ...edgeStyle,
      label: 'analyze failure'
    },
    {
      id: 'e5a',
      source: 'reflection-engine',
      target: 'contrastive-analysis',
      ...edgeStyle,
      label: 'compare moves'
    },
    {
      id: 'e5b',
      source: 'reflection-engine',
      target: 'failure-pattern',
      ...edgeStyle,
      label: 'extract pattern'
    },
    {
      id: 'e5c',
      source: 'reflection-engine',
      target: 'success-pattern',
      ...edgeStyle,
      label: 'identify success'
    },
    // Enhanced selection
    {
      id: 'e6',
      source: 'contrastive-analysis',
      target: 'enhanced-selection',
      ...edgeStyle,
      label: 'guide exploration'
    },
    {
      id: 'e7',
      source: 'failure-pattern',
      target: 'enhanced-selection',
      ...edgeStyle,
      label: 'bias against'
    },
    {
      id: 'e8',
      source: 'success-pattern',
      target: 'enhanced-selection',
      ...edgeStyle,
      label: 'bias toward'
    },
    // New exploration
    {
      id: 'e9a',
      source: 'enhanced-selection',
      target: 'new-candidate',
      ...edgeStyle,
      label: 'prioritize'
    },
    {
      id: 'e9b',
      source: 'enhanced-selection',
      target: 'avoided-move',
      ...edgeStyle,
      label: 'avoid'
    },
    // Final decision
    {
      id: 'e10',
      source: 'new-candidate',
      target: 'final-decision',
      ...edgeStyle,
      label: 'best path'
    },
    // Feedback loop
    {
      id: 'e11',
      source: 'enhanced-selection',
      target: 'move-a',
      ...edgeStyle,
      label: 'reexplore',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Standard MCTS Exploration",
      description: "Traditional MCTS explores three candidate moves (Nf3, Bc4, 0-0-0) through simulation, with Bc4 initially appearing promising at 52% win rate.",
      activeNodes: ['game-state', 'root-node', 'move-a', 'move-b', 'move-c'],
      activeEdges: ['e1', 'e2a', 'e2b', 'e2c']
    },
    {
      title: "Simulation & Failure Detection",
      description: "Deep simulation of Bc4 reveals it leads to tactical blunder and loss in 8 moves, despite initial promise - a key learning moment.",
      activeNodes: ['simulation-bc4'],
      activeEdges: ['e3']
    },
    {
      title: "Reflective Analysis Engine",
      description: "Unlike standard MCTS, system analyzes WHY Bc4 failed, examining the decision path and extracting failure modes for future learning.",
      activeNodes: ['reflection-engine'],
      activeEdges: ['e4']
    },
    {
      title: "Contrastive Pattern Learning",
      description: "System contrasts failed Bc4 (premature attack) with safer Nf3 (solid development), identifying key patterns: king safety before attack.",
      activeNodes: ['contrastive-analysis', 'failure-pattern', 'success-pattern'],
      activeEdges: ['e5a', 'e5b', 'e5c']
    },
    {
      title: "Enhanced Exploration Strategy",
      description: "Reflection insights guide future exploration: bias toward solid development moves, avoid premature attacks, prioritize king safety patterns.",
      activeNodes: ['enhanced-selection', 'new-candidate', 'avoided-move'],
      activeEdges: ['e6', 'e7', 'e8', 'e9a', 'e9b', 'e11']
    },
    {
      title: "Reflection-Improved Decision",
      description: "Enhanced MCTS finds Nf3 (58% win rate) as optimal choice, avoiding similar risky moves like Qh5 through learned failure patterns.",
      activeNodes: ['final-decision'],
      activeEdges: ['e10']
    }
  ]
};