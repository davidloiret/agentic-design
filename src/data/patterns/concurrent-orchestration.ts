import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const concurrentOrchestrationPattern: PatternScenario = {
  id: 'concurrent-orchestration',
  title: 'Concurrent Orchestration',
  initialNodes: [
    {
      id: 'complex-problem',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Complex Problem\n"Design sustainable smart city infrastructure"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 320 },
    },
    {
      id: 'orchestration-hub',
      position: { x: 375, y: 150 },
      data: { label: '🎛️ Orchestration Hub\nCoordinate concurrent agents' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 250 },
    },
    // Problem Broadcasting
    {
      id: 'task-broadcaster',
      position: { x: 200, y: 250 },
      data: { label: '📡 Task Broadcaster\nSend to all agents' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    {
      id: 'context-provider',
      position: { x: 400, y: 250 },
      data: { label: '📚 Context Provider\nShared knowledge base' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    {
      id: 'sync-coordinator',
      position: { x: 600, y: 250 },
      data: { label: '🔄 Sync Coordinator\nManage parallel work' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    // Concurrent Agents (Working Simultaneously)
    {
      id: 'urban-planner',
      position: { x: 50, y: 380 },
      data: { label: '🏙️ Urban Planner Agent\nCity layout & zoning\nProgress: 75%' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 170 },
    },
    {
      id: 'energy-expert',
      position: { x: 220, y: 380 },
      data: { label: '⚡ Energy Expert Agent\nRenewable systems\nProgress: 80%' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 170 },
    },
    {
      id: 'transport-specialist',
      position: { x: 390, y: 380 },
      data: { label: '🚇 Transport Specialist\nMobility solutions\nProgress: 70%' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 170 },
    },
    {
      id: 'environmental-analyst',
      position: { x: 560, y: 380 },
      data: { label: '🌳 Environmental Analyst\nSustainability metrics\nProgress: 85%' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 170 },
    },
    {
      id: 'tech-architect',
      position: { x: 730, y: 380 },
      data: { label: '💻 Tech Architect\nIoT & connectivity\nProgress: 65%' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 170 },
    },
    // Parallel Outputs
    {
      id: 'urban-solution',
      position: { x: 50, y: 500 },
      data: { label: '📋 Urban Design\nMixed-use districts' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 150 },
    },
    {
      id: 'energy-solution',
      position: { x: 220, y: 500 },
      data: { label: '📋 Energy Plan\nSolar grid + storage' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 150 },
    },
    {
      id: 'transport-solution',
      position: { x: 390, y: 500 },
      data: { label: '📋 Transport Map\nAutonomous network' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 150 },
    },
    {
      id: 'environmental-solution',
      position: { x: 560, y: 500 },
      data: { label: '📋 Green Strategy\nCarbon negative' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 150 },
    },
    {
      id: 'tech-solution',
      position: { x: 730, y: 500 },
      data: { label: '📋 Tech Blueprint\n5G + edge computing' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 150 },
    },
    // Cross-Agent Communication
    {
      id: 'perspective-exchange',
      position: { x: 100, y: 620 },
      data: { label: '💡 Perspective Exchange\nShare insights in real-time' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 200 },
    },
    {
      id: 'conflict-detector',
      position: { x: 320, y: 620 },
      data: { label: '⚖️ Conflict Detector\nIdentify incompatibilities' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 200 },
    },
    {
      id: 'synergy-finder',
      position: { x: 540, y: 620 },
      data: { label: '🔗 Synergy Finder\nDiscover opportunities' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 200 },
    },
    // Convergence Layer
    {
      id: 'solution-aggregator',
      position: { x: 200, y: 740 },
      data: { label: '🔀 Solution Aggregator\nCombine perspectives' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    {
      id: 'consensus-builder',
      position: { x: 400, y: 740 },
      data: { label: '🤝 Consensus Builder\nResolve differences' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    {
      id: 'integration-engine',
      position: { x: 600, y: 740 },
      data: { label: '⚙️ Integration Engine\nUnify solutions' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    // Quality & Validation
    {
      id: 'diversity-checker',
      position: { x: 150, y: 860 },
      data: { label: '🎨 Diversity Checker\nEnsure varied perspectives' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'completeness-validator',
      position: { x: 350, y: 860 },
      data: { label: '✅ Completeness Validator\nAll aspects covered' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'quality-assessor',
      position: { x: 550, y: 860 },
      data: { label: '⭐ Quality Assessor\nEvaluate solutions' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'final-solution',
      position: { x: 400, y: 980 },
      data: { label: '✨ Integrated Solution\nComprehensive smart city plan with diverse perspectives' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 350 },
    },
  ],
  initialEdges: [
    {
      id: 'problem-hub',
      source: 'complex-problem',
      target: 'orchestration-hub',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      animated: true,
    },
    {
      id: 'hub-broadcaster',
      source: 'orchestration-hub',
      target: 'task-broadcaster',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      label: 'Distribute',
    },
    {
      id: 'hub-context',
      source: 'orchestration-hub',
      target: 'context-provider',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      label: 'Context',
    },
    {
      id: 'hub-sync',
      source: 'orchestration-hub',
      target: 'sync-coordinator',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      label: 'Coordinate',
    },
    // Broadcast to all agents (simultaneous)
    {
      id: 'broadcast-urban',
      source: 'task-broadcaster',
      target: 'urban-planner',
      style: { ...edgeStyle, stroke: '#22c55e', strokeWidth: 3 },
      animated: true,
    },
    {
      id: 'broadcast-energy',
      source: 'task-broadcaster',
      target: 'energy-expert',
      style: { ...edgeStyle, stroke: '#22c55e', strokeWidth: 3 },
      animated: true,
    },
    {
      id: 'broadcast-transport',
      source: 'task-broadcaster',
      target: 'transport-specialist',
      style: { ...edgeStyle, stroke: '#22c55e', strokeWidth: 3 },
      animated: true,
    },
    {
      id: 'broadcast-environmental',
      source: 'task-broadcaster',
      target: 'environmental-analyst',
      style: { ...edgeStyle, stroke: '#22c55e', strokeWidth: 3 },
      animated: true,
    },
    {
      id: 'broadcast-tech',
      source: 'task-broadcaster',
      target: 'tech-architect',
      style: { ...edgeStyle, stroke: '#22c55e', strokeWidth: 3 },
      animated: true,
    },
    // Context to all agents
    {
      id: 'context-urban',
      source: 'context-provider',
      target: 'urban-planner',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'context-energy',
      source: 'context-provider',
      target: 'energy-expert',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'context-transport',
      source: 'context-provider',
      target: 'transport-specialist',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'context-environmental',
      source: 'context-provider',
      target: 'environmental-analyst',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'context-tech',
      source: 'context-provider',
      target: 'tech-architect',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    // Agents to solutions
    {
      id: 'urban-output',
      source: 'urban-planner',
      target: 'urban-solution',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'energy-output',
      source: 'energy-expert',
      target: 'energy-solution',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'transport-output',
      source: 'transport-specialist',
      target: 'transport-solution',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'environmental-output',
      source: 'environmental-analyst',
      target: 'environmental-solution',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'tech-output',
      source: 'tech-architect',
      target: 'tech-solution',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    // Cross-agent communication (mesh)
    {
      id: 'urban-energy-comm',
      source: 'urban-planner',
      target: 'energy-expert',
      style: { ...edgeStyle, stroke: '#64748b', strokeDasharray: '3 3' },
      label: 'Share',
    },
    {
      id: 'energy-transport-comm',
      source: 'energy-expert',
      target: 'transport-specialist',
      style: { ...edgeStyle, stroke: '#64748b', strokeDasharray: '3 3' },
      label: 'Share',
    },
    {
      id: 'transport-environmental-comm',
      source: 'transport-specialist',
      target: 'environmental-analyst',
      style: { ...edgeStyle, stroke: '#64748b', strokeDasharray: '3 3' },
      label: 'Share',
    },
    {
      id: 'environmental-tech-comm',
      source: 'environmental-analyst',
      target: 'tech-architect',
      style: { ...edgeStyle, stroke: '#64748b', strokeDasharray: '3 3' },
      label: 'Share',
    },
    {
      id: 'tech-urban-comm',
      source: 'tech-architect',
      target: 'urban-planner',
      style: { ...edgeStyle, stroke: '#64748b', strokeDasharray: '3 3' },
      label: 'Share',
    },
    // Solutions to exchange mechanisms
    {
      id: 'solutions-exchange',
      source: 'urban-solution',
      target: 'perspective-exchange',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'solutions-conflict',
      source: 'transport-solution',
      target: 'conflict-detector',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'solutions-synergy',
      source: 'environmental-solution',
      target: 'synergy-finder',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    // Exchange to convergence
    {
      id: 'exchange-aggregator',
      source: 'perspective-exchange',
      target: 'solution-aggregator',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'conflict-consensus',
      source: 'conflict-detector',
      target: 'consensus-builder',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'synergy-integration',
      source: 'synergy-finder',
      target: 'integration-engine',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    // All solutions to aggregator
    {
      id: 'urban-aggregator',
      source: 'urban-solution',
      target: 'solution-aggregator',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'energy-aggregator',
      source: 'energy-solution',
      target: 'solution-aggregator',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'transport-aggregator',
      source: 'transport-solution',
      target: 'solution-aggregator',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'environmental-aggregator',
      source: 'environmental-solution',
      target: 'solution-aggregator',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'tech-aggregator',
      source: 'tech-solution',
      target: 'solution-aggregator',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    // Convergence to validation
    {
      id: 'aggregator-diversity',
      source: 'solution-aggregator',
      target: 'diversity-checker',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'consensus-completeness',
      source: 'consensus-builder',
      target: 'completeness-validator',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'integration-quality',
      source: 'integration-engine',
      target: 'quality-assessor',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    // Validation to final
    {
      id: 'diversity-final',
      source: 'diversity-checker',
      target: 'final-solution',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'completeness-final',
      source: 'completeness-validator',
      target: 'final-solution',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'quality-final',
      source: 'quality-assessor',
      target: 'final-solution',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    // Sync coordination
    {
      id: 'sync-urban',
      source: 'sync-coordinator',
      target: 'urban-planner',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
      label: 'Sync',
    },
    {
      id: 'sync-energy',
      source: 'sync-coordinator',
      target: 'energy-expert',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
      label: 'Sync',
    },
  ],
  steps: [
    {
      title: 'Problem Input',
      description: 'Complex problem requiring diverse perspectives',
      activeNodes: ['complex-problem'],
      activeEdges: ['problem-hub'],
    },
    {
      title: 'Orchestration Setup',
      description: 'Initialize hub with broadcasting and coordination systems',
      activeNodes: ['orchestration-hub', 'task-broadcaster', 'context-provider', 'sync-coordinator'],
      activeEdges: ['hub-broadcaster', 'hub-context', 'hub-sync'],
    },
    {
      title: 'Simultaneous Broadcast',
      description: 'Problem sent to all agents at the same time',
      activeNodes: ['task-broadcaster', 'urban-planner', 'energy-expert', 'transport-specialist', 'environmental-analyst', 'tech-architect'],
      activeEdges: ['broadcast-urban', 'broadcast-energy', 'broadcast-transport', 'broadcast-environmental', 'broadcast-tech'],
    },
    {
      title: 'Shared Context',
      description: 'All agents receive same knowledge base and constraints',
      activeNodes: ['context-provider', 'urban-planner', 'energy-expert', 'transport-specialist', 'environmental-analyst', 'tech-architect'],
      activeEdges: ['context-urban', 'context-energy', 'context-transport', 'context-environmental', 'context-tech'],
    },
    {
      title: 'Concurrent Processing',
      description: 'All agents work simultaneously on the same problem',
      activeNodes: ['urban-planner', 'energy-expert', 'transport-specialist', 'environmental-analyst', 'tech-architect'],
      activeEdges: ['sync-urban', 'sync-energy'],
    },
    {
      title: 'Cross-Agent Communication',
      description: 'Agents share insights while working',
      activeNodes: ['urban-planner', 'energy-expert', 'transport-specialist', 'environmental-analyst', 'tech-architect'],
      activeEdges: ['urban-energy-comm', 'energy-transport-comm', 'transport-environmental-comm', 'environmental-tech-comm', 'tech-urban-comm'],
    },
    {
      title: 'Parallel Solutions',
      description: 'Each agent produces their perspective solution',
      activeNodes: ['urban-solution', 'energy-solution', 'transport-solution', 'environmental-solution', 'tech-solution'],
      activeEdges: ['urban-output', 'energy-output', 'transport-output', 'environmental-output', 'tech-output'],
    },
    {
      title: 'Perspective Analysis',
      description: 'Exchange insights, detect conflicts, find synergies',
      activeNodes: ['perspective-exchange', 'conflict-detector', 'synergy-finder'],
      activeEdges: ['solutions-exchange', 'solutions-conflict', 'solutions-synergy'],
    },
    {
      title: 'Solution Convergence',
      description: 'Aggregate all perspectives into unified solution',
      activeNodes: ['solution-aggregator', 'consensus-builder', 'integration-engine'],
      activeEdges: ['exchange-aggregator', 'conflict-consensus', 'synergy-integration', 'urban-aggregator', 'energy-aggregator', 'transport-aggregator', 'environmental-aggregator', 'tech-aggregator'],
    },
    {
      title: 'Quality Validation',
      description: 'Ensure diversity, completeness, and quality',
      activeNodes: ['diversity-checker', 'completeness-validator', 'quality-assessor'],
      activeEdges: ['aggregator-diversity', 'consensus-completeness', 'integration-quality'],
    },
    {
      title: 'Final Integration',
      description: 'Deliver comprehensive solution with all perspectives',
      activeNodes: ['final-solution'],
      activeEdges: ['diversity-final', 'completeness-final', 'quality-final'],
    },
  ],
};