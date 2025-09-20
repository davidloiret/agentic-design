import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const leastToMostPromptingPattern: PatternScenario = {
  id: 'least-to-most-prompting',
  title: 'Least-to-Most Prompting',
  description: 'Progressive problem decomposition that breaks complex problems into simpler sub-problems, solving from easiest to most complex while building understanding',
  initialNodes: [
    {
      id: 'complex-problem',
      position: { x: 400, y: 50 },
      data: { label: '🧮 Complex Problem\n"Calculate compound interest\nfor $10,000 invested at 8%\nfor 15 years with quarterly\ncompounding"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 280 },
    },
    {
      id: 'decomposition',
      position: { x: 400, y: 170 },
      data: { label: '🔍 Problem Decomposition\n"This requires understanding:\n1. Simple interest\n2. Compound periods\n3. Compound interest formula"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 250 },
    },
    // Level 1: Simplest concepts
    {
      id: 'simple-interest',
      position: { x: 150, y: 300 },
      data: { label: '📐 Level 1: Simple Interest\n"What is 8% of $10,000?\n$10,000 × 0.08 = $800\nper year"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'understand-periods',
      position: { x: 400, y: 300 },
      data: { label: '📅 Level 1: Time Periods\n"Quarterly = 4 times/year\n15 years = 15 × 4 = 60\ncompounding periods"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'basic-growth',
      position: { x: 650, y: 300 },
      data: { label: '📈 Level 1: Growth Concept\n"Money grows each period\nNew amount becomes\nbase for next period"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    // Level 2: Combine simple concepts
    {
      id: 'quarterly-rate',
      position: { x: 200, y: 450 },
      data: { label: '🔢 Level 2: Quarterly Rate\n"Annual 8% ÷ 4 quarters\n= 2% per quarter\n= 0.02 decimal"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'compound-concept',
      position: { x: 400, y: 450 },
      data: { label: '💰 Level 2: Compound Growth\n"After Q1: $10,000 × 1.02\nAfter Q2: (result) × 1.02\nPattern: multiply by 1.02"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 220 },
    },
    {
      id: 'simple-compound',
      position: { x: 600, y: 450 },
      data: { label: '🧮 Level 2: Simple Calculation\n"After 2 quarters:\n$10,000 × (1.02)²\n= $10,404"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 180 },
    },
    // Level 3: General formula
    {
      id: 'formula-derivation',
      position: { x: 400, y: 600 },
      data: { label: '📚 Level 3: General Formula\n"For n periods at rate r:\nFinal = Principal × (1 + r)ⁿ\nA = P(1 + r/n)^(nt)"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },
    // Level 4: Apply to original problem
    {
      id: 'substitute-values',
      position: { x: 400, y: 750 },
      data: { label: '🎯 Level 4: Substitute Values\nA = $10,000(1 + 0.08/4)^(4×15)\nA = $10,000(1.02)^60' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },
    {
      id: 'final-calculation',
      position: { x: 400, y: 850 },
      data: { label: '✅ Final Answer\nA = $10,000 × 3.281\nA = $32,810\n\n"Built understanding step-by-step!"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },
    // Show contrast with direct approach
    {
      id: 'direct-failure',
      position: { x: 100, y: 170 },
      data: { label: '❌ Direct Approach Fails\n"Jump to complex formula\nwithout understanding\n→ Confusion & errors"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
  ],
  initialEdges: [
    {
      id: 'e1',
      source: 'complex-problem',
      target: 'decomposition',
      ...edgeStyle,
      label: 'break down'
    },
    // Level 1 foundations
    {
      id: 'e2a',
      source: 'decomposition',
      target: 'simple-interest',
      ...edgeStyle,
      label: 'start simple'
    },
    {
      id: 'e2b',
      source: 'decomposition',
      target: 'understand-periods',
      ...edgeStyle,
      label: 'start simple'
    },
    {
      id: 'e2c',
      source: 'decomposition',
      target: 'basic-growth',
      ...edgeStyle,
      label: 'start simple'
    },
    // Level 2 combinations
    {
      id: 'e3a',
      source: 'simple-interest',
      target: 'quarterly-rate',
      ...edgeStyle,
      label: 'combine'
    },
    {
      id: 'e3b',
      source: 'understand-periods',
      target: 'quarterly-rate',
      ...edgeStyle,
      label: 'combine'
    },
    {
      id: 'e3c',
      source: 'basic-growth',
      target: 'compound-concept',
      ...edgeStyle,
      label: 'build on'
    },
    {
      id: 'e3d',
      source: 'quarterly-rate',
      target: 'compound-concept',
      ...edgeStyle,
      label: 'apply rate'
    },
    {
      id: 'e3e',
      source: 'compound-concept',
      target: 'simple-compound',
      ...edgeStyle,
      label: 'practice'
    },
    // Level 3 generalization
    {
      id: 'e4a',
      source: 'compound-concept',
      target: 'formula-derivation',
      ...edgeStyle,
      label: 'generalize'
    },
    {
      id: 'e4b',
      source: 'simple-compound',
      target: 'formula-derivation',
      ...edgeStyle,
      label: 'generalize'
    },
    // Level 4 application
    {
      id: 'e5',
      source: 'formula-derivation',
      target: 'substitute-values',
      ...edgeStyle,
      label: 'apply formula'
    },
    {
      id: 'e6',
      source: 'substitute-values',
      target: 'final-calculation',
      ...edgeStyle,
      label: 'calculate'
    },
    // Contrast
    {
      id: 'ef',
      source: 'complex-problem',
      target: 'direct-failure',
      ...edgeStyle,
      label: 'direct attempt',
      style: { ...edgeStyle.style, stroke: '#ef4444', strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Problem Recognition & Decomposition",
      description: "Complex compound interest problem is recognized as too difficult for direct solution. System decomposes it into fundamental concepts: simple interest, compounding periods, and growth patterns.",
      activeNodes: ['complex-problem', 'decomposition', 'direct-failure'],
      activeEdges: ['e1', 'ef']
    },
    {
      title: "Level 1: Master Simple Foundations",
      description: "Start with easiest concepts: calculate simple interest (8% of $10,000 = $800), understand quarterly periods (4 per year), grasp basic growth concept (money grows each period).",
      activeNodes: ['simple-interest', 'understand-periods', 'basic-growth'],
      activeEdges: ['e2a', 'e2b', 'e2c']
    },
    {
      title: "Level 2: Combine Simple Concepts",
      description: "Build on foundations by combining concepts: quarterly rate (8%÷4 = 2%), compound growth pattern (multiply by 1.02 each quarter), practice with simple 2-quarter calculation.",
      activeNodes: ['quarterly-rate', 'compound-concept', 'simple-compound'],
      activeEdges: ['e3a', 'e3b', 'e3c', 'e3d', 'e3e']
    },
    {
      title: "Level 3: Generalize to Formula",
      description: "With understanding of compound mechanics, derive general formula A = P(1 + r/n)^(nt) from the pattern observed in simpler calculations.",
      activeNodes: ['formula-derivation'],
      activeEdges: ['e4a', 'e4b']
    },
    {
      title: "Level 4: Apply to Original Complex Problem",
      description: "Now equipped with deep understanding, confidently apply formula to original problem: A = $10,000(1.02)^60 = $32,810, building from simple to complex understanding.",
      activeNodes: ['substitute-values', 'final-calculation'],
      activeEdges: ['e5', 'e6']
    }
  ]
};