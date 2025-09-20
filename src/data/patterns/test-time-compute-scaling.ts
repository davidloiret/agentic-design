import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const testTimeComputeScalingPattern: PatternScenario = {
  id: 'test-time-compute-scaling',
  title: 'Test-Time Compute Scaling',
  description: 'Dynamically allocates computational resources and reasoning depth based on problem complexity and available time',
  initialNodes: [
    {
      id: 'problem-input',
      position: { x: 400, y: 50 },
      data: { label: '📥 Problem Input\n"Optimize supply chain\nfor 1000+ locations\nwith budget constraints"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },
    {
      id: 'complexity-analyzer',
      position: { x: 400, y: 150 },
      data: { label: '🔍 Complexity Analyzer\nProblem size: Large\nConstraints: High\nComplexity Score: 8.5/10' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'resource-allocator',
      position: { x: 400, y: 250 },
      data: { label: '⚙️ Resource Allocator\nAllocated: 16 CPU cores\n32GB RAM, 45 minutes\nReasoning depth: Level 3' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },
    {
      id: 'quick-heuristic',
      position: { x: 150, y: 350 },
      data: { label: '⚡ Quick Heuristic\n(2 minutes, 1 core)\n"Use nearest neighbor\napproach for initial solution"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 180 },
    },
    {
      id: 'intermediate-search',
      position: { x: 400, y: 350 },
      data: { label: '🔍 Intermediate Search\n(15 minutes, 8 cores)\n"Genetic algorithm with\nlocal optimization"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'deep-optimization',
      position: { x: 650, y: 350 },
      data: { label: '🧠 Deep Optimization\n(28 minutes, 16 cores)\n"Mixed-integer programming\nwith constraint satisfaction"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 220 },
    },
    {
      id: 'progress-monitor',
      position: { x: 400, y: 450 },
      data: { label: '📊 Progress Monitor\nTime: 15/45 minutes\nSolution quality: 65%\nContinue deep search?' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },
    {
      id: 'adaptive-decision',
      position: { x: 400, y: 550 },
      data: { label: '🎯 Adaptive Decision\n"Quality improving slowly.\nAllocate more resources\nto promising branches."' },
      style: { ...nodeStyle, background: '#f97316', minWidth: 200 },
    },
    {
      id: 'resource-boost',
      position: { x: 400, y: 650 },
      data: { label: '🚀 Resource Boost\nScale up: 24 cores\nParallel branch exploration\nRemaining time: 30 min' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'final-solution',
      position: { x: 400, y: 750 },
      data: { label: '✅ Optimized Solution\n"87% cost reduction\nUsed 42/45 minutes\nTotal compute: 18.5 core-hours"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },
    // Comparison scenarios
    {
      id: 'simple-problem',
      position: { x: 100, y: 150 },
      data: { label: '📝 Simple Problem\n"What\'s 2+2?"\nComplexity: 0.1/10' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 150 },
    },
    {
      id: 'minimal-compute',
      position: { x: 100, y: 250 },
      data: { label: '💻 Minimal Compute\n1 core, 0.01 seconds\nDirect calculation' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 150 },
    },
    {
      id: 'instant-answer',
      position: { x: 100, y: 350 },
      data: { label: '⚡ Answer: 4\nEfficiency: 100%' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 120 },
    },
  ],
  initialEdges: [
    {
      id: 'e1',
      source: 'problem-input',
      target: 'complexity-analyzer',
      ...edgeStyle,
      label: 'analyze'
    },
    {
      id: 'e2',
      source: 'complexity-analyzer',
      target: 'resource-allocator',
      ...edgeStyle,
      label: 'high complexity'
    },
    {
      id: 'e3a',
      source: 'resource-allocator',
      target: 'quick-heuristic',
      ...edgeStyle,
      label: 'parallel track 1'
    },
    {
      id: 'e3b',
      source: 'resource-allocator',
      target: 'intermediate-search',
      ...edgeStyle,
      label: 'parallel track 2'
    },
    {
      id: 'e3c',
      source: 'resource-allocator',
      target: 'deep-optimization',
      ...edgeStyle,
      label: 'parallel track 3'
    },
    {
      id: 'e4a',
      source: 'intermediate-search',
      target: 'progress-monitor',
      ...edgeStyle,
      label: 'monitor progress'
    },
    {
      id: 'e4b',
      source: 'deep-optimization',
      target: 'progress-monitor',
      ...edgeStyle,
      label: 'monitor progress'
    },
    {
      id: 'e5',
      source: 'progress-monitor',
      target: 'adaptive-decision',
      ...edgeStyle,
      label: 'evaluate status'
    },
    {
      id: 'e6',
      source: 'adaptive-decision',
      target: 'resource-boost',
      ...edgeStyle,
      label: 'need more compute'
    },
    {
      id: 'e7',
      source: 'resource-boost',
      target: 'final-solution',
      ...edgeStyle,
      label: 'optimize further'
    },
    // Simple problem path
    {
      id: 'es1',
      source: 'simple-problem',
      target: 'minimal-compute',
      ...edgeStyle,
      label: 'low complexity'
    },
    {
      id: 'es2',
      source: 'minimal-compute',
      target: 'instant-answer',
      ...edgeStyle,
      label: 'direct solve'
    },
    // Feedback loop
    {
      id: 'e8',
      source: 'progress-monitor',
      target: 'deep-optimization',
      ...edgeStyle,
      label: 'focus resources',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Problem Complexity Assessment",
      description: "System analyzes incoming problem (supply chain optimization) and assigns complexity score 8.5/10 based on size, constraints, and solution space.",
      activeNodes: ['problem-input', 'complexity-analyzer'],
      activeEdges: ['e1']
    },
    {
      title: "Dynamic Resource Allocation",
      description: "Based on high complexity, system allocates significant compute resources: 16 cores, 32GB RAM, 45-minute time budget, and reasoning depth level 3.",
      activeNodes: ['resource-allocator'],
      activeEdges: ['e2']
    },
    {
      title: "Multi-Track Parallel Processing",
      description: "System launches three parallel approaches with different compute intensities: quick heuristic (1 core), intermediate search (8 cores), deep optimization (16 cores).",
      activeNodes: ['quick-heuristic', 'intermediate-search', 'deep-optimization'],
      activeEdges: ['e3a', 'e3b', 'e3c']
    },
    {
      title: "Adaptive Progress Monitoring",
      description: "System continuously monitors solution quality (65%) and time usage (15/45 minutes), deciding whether to continue or reallocate resources.",
      activeNodes: ['progress-monitor', 'adaptive-decision'],
      activeEdges: ['e4a', 'e4b', 'e5', 'e8']
    },
    {
      title: "Dynamic Resource Scaling",
      description: "System detects promising optimization direction and scales up to 24 cores, demonstrating adaptive compute allocation based on intermediate results achieving 87% optimization.",
      activeNodes: ['resource-boost', 'final-solution'],
      activeEdges: ['e6', 'e7']
    },
    {
      title: "Efficiency Comparison",
      description: "Contrast with simple problem (2+2) shows system's efficiency: minimal compute (0.01 seconds, 1 core) for trivial tasks vs. intensive compute for complex optimization.",
      activeNodes: ['simple-problem', 'minimal-compute', 'instant-answer'],
      activeEdges: ['es1', 'es2']
    }
  ]
};