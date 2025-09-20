import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const skeletonOfThoughtsPattern: PatternScenario = {
  id: 'skeleton-of-thoughts',
  title: 'Skeleton of Thoughts',
  description: 'Creates structured yet adaptable reasoning frameworks that provide consistent logical scaffolding while being flexible enough to accommodate different specific details and contexts',
  initialNodes: [
    {
      id: 'problem-category',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Problem Category\n"Business Strategy Decision"\nNeeds structured framework\nfor consistent analysis' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },
    {
      id: 'skeleton-framework',
      position: { x: 400, y: 180 },
      data: { label: '🦴 Skeleton Framework\n"1. Current State Analysis\n2. Goal Definition\n3. Option Generation\n4. Evaluation Criteria\n5. Decision & Implementation"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 280 },
    },
    // Specific problem instance 1
    {
      id: 'problem-1',
      position: { x: 150, y: 320 },
      data: { label: '📋 Problem 1\n"Should we expand\ninto European markets\nnext quarter?"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    // Framework application 1
    {
      id: 'filled-framework-1',
      position: { x: 150, y: 450 },
      data: { label: '🔍 Framework Applied\n1. Current: US market 70% saturated\n2. Goal: 30% revenue growth\n3. Options: EU, Asia, Canada\n4. Criteria: ROI, risk, timeline\n5. Decision: EU expansion Q2' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 220 },
    },
    // Specific problem instance 2
    {
      id: 'problem-2',
      position: { x: 650, y: 320 },
      data: { label: '📋 Problem 2\n"Should we acquire\nCompetitor X or build\ninternally?"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    // Framework application 2
    {
      id: 'filled-framework-2',
      position: { x: 650, y: 450 },
      data: { label: '🔍 Framework Applied\n1. Current: Missing AI capability\n2. Goal: AI product line launch\n3. Options: Acquire, build, partner\n4. Criteria: Speed, cost, talent\n5. Decision: Acquire Competitor X' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },
    // Framework adaptation
    {
      id: 'skeleton-adaptation',
      position: { x: 400, y: 580 },
      data: { label: '🔄 Framework Adaptation\n"Same skeleton structure\nDifferent content details\nConsistent reasoning process"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },
    // Cross-domain application
    {
      id: 'domain-transfer',
      position: { x: 400, y: 710 },
      data: { label: '🌐 Cross-Domain Transfer\n"Skeleton adapts to:\n• Product decisions\n• Hiring strategies\n• Technology choices"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    // Benefits demonstration
    {
      id: 'consistency-benefit',
      position: { x: 150, y: 580 },
      data: { label: '✅ Consistency Benefit\n"Same logical structure\nensures thorough analysis\nReduces cognitive load"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    {
      id: 'flexibility-benefit',
      position: { x: 650, y: 580 },
      data: { label: '🔧 Flexibility Benefit\n"Framework accommodates\ndifferent content types\nwhile maintaining structure"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },
    // Skeleton refinement
    {
      id: 'skeleton-refinement',
      position: { x: 400, y: 840 },
      data: { label: '📈 Skeleton Refinement\n"Add: Risk assessment step\nModify: Evaluation weights\nImprove: Implementation detail"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },
    // Compare to rigid approaches
    {
      id: 'rigid-comparison',
      position: { x: 100, y: 180 },
      data: { label: '❌ Rigid Approach\n"Fixed checklist\nNo adaptation\nBreaks on edge cases"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'ad-hoc-comparison',
      position: { x: 700, y: 180 },
      data: { label: '❌ Ad-hoc Approach\n"No structure\nInconsistent analysis\nMissing considerations"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
  ],
  initialEdges: [
    // Framework creation
    {
      id: 'e1',
      source: 'problem-category',
      target: 'skeleton-framework',
      ...edgeStyle,
      label: 'create skeleton'
    },
    // Apply to problems
    {
      id: 'e2a',
      source: 'problem-1',
      target: 'filled-framework-1',
      ...edgeStyle,
      label: 'fill skeleton'
    },
    {
      id: 'e2b',
      source: 'problem-2',
      target: 'filled-framework-2',
      ...edgeStyle,
      label: 'fill skeleton'
    },
    // Framework guides application
    {
      id: 'e3a',
      source: 'skeleton-framework',
      target: 'filled-framework-1',
      ...edgeStyle,
      label: 'provides structure'
    },
    {
      id: 'e3b',
      source: 'skeleton-framework',
      target: 'filled-framework-2',
      ...edgeStyle,
      label: 'provides structure'
    },
    // Benefits
    {
      id: 'e4a',
      source: 'filled-framework-1',
      target: 'consistency-benefit',
      ...edgeStyle,
      label: 'demonstrates'
    },
    {
      id: 'e4b',
      source: 'filled-framework-2',
      target: 'flexibility-benefit',
      ...edgeStyle,
      label: 'demonstrates'
    },
    // Adaptation
    {
      id: 'e5a',
      source: 'consistency-benefit',
      target: 'skeleton-adaptation',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e5b',
      source: 'flexibility-benefit',
      target: 'skeleton-adaptation',
      ...edgeStyle,
      label: 'enables'
    },
    // Transfer
    {
      id: 'e6',
      source: 'skeleton-adaptation',
      target: 'domain-transfer',
      ...edgeStyle,
      label: 'enables'
    },
    // Refinement
    {
      id: 'e7',
      source: 'domain-transfer',
      target: 'skeleton-refinement',
      ...edgeStyle,
      label: 'leads to'
    },
    {
      id: 'e8',
      source: 'skeleton-refinement',
      target: 'skeleton-framework',
      ...edgeStyle,
      label: 'improves',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    // Comparisons
    {
      id: 'ec1',
      source: 'problem-category',
      target: 'rigid-comparison',
      ...edgeStyle,
      label: 'alternative',
      style: { ...edgeStyle.style, stroke: '#ef4444', strokeDasharray: '5,5' }
    },
    {
      id: 'ec2',
      source: 'problem-category',
      target: 'ad-hoc-comparison',
      ...edgeStyle,
      label: 'alternative',
      style: { ...edgeStyle.style, stroke: '#ef4444', strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Skeleton Framework Creation",
      description: "For business strategy decisions, creates structured skeleton framework with 5 key steps: current state analysis, goal definition, option generation, evaluation criteria, and decision implementation.",
      activeNodes: ['problem-category', 'skeleton-framework', 'rigid-comparison', 'ad-hoc-comparison'],
      activeEdges: ['e1', 'ec1', 'ec2']
    },
    {
      title: "Framework Application to Specific Problems",
      description: "Same skeleton structure accommodates different problems: European expansion (market analysis) and acquisition decision (capability analysis), each filling framework with relevant details.",
      activeNodes: ['problem-1', 'problem-2', 'filled-framework-1', 'filled-framework-2'],
      activeEdges: ['e2a', 'e2b', 'e3a', 'e3b']
    },
    {
      title: "Dual Benefits: Consistency & Flexibility",
      description: "Framework provides consistent logical structure (reduces cognitive load) while remaining flexible enough to accommodate different content types and problem contexts.",
      activeNodes: ['consistency-benefit', 'flexibility-benefit'],
      activeEdges: ['e4a', 'e4b']
    },
    {
      title: "Adaptive Framework Evolution",
      description: "Skeleton maintains structure while adapting to different domains (product decisions, hiring strategies, technology choices), demonstrating transferability across contexts.",
      activeNodes: ['skeleton-adaptation', 'domain-transfer'],
      activeEdges: ['e5a', 'e5b', 'e6']
    },
    {
      title: "Iterative Skeleton Refinement",
      description: "Through application across domains, skeleton framework evolves: adding risk assessment step, modifying evaluation weights, improving implementation details for better future use.",
      activeNodes: ['skeleton-refinement'],
      activeEdges: ['e7', 'e8']
    }
  ]
};