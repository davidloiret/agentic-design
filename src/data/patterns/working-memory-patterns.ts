import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const workingMemoryPatternsPattern: PatternScenario = {
  id: 'working-memory-patterns',
  title: 'Working Memory Patterns',
  description: 'Active memory management system for maintaining and manipulating information during complex problem-solving tasks, with attention-based resource allocation and constraint tracking.',
  initialNodes: [
    {
      id: 'task-input',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Task Input\n"Solve complex problem while tracking constraints"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 380 },
    },
    // Working Memory Core
    {
      id: 'working-memory-core',
      position: { x: 375, y: 150 },
      data: { label: '🧠 Working Memory Core\n7±2 item capacity' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 250 },
    },
    // Attention Control
    {
      id: 'attention-filter',
      position: { x: 100, y: 250 },
      data: { label: '🔍 Attention Filter\nRelevance screening\nPriority detection' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'focus-controller',
      position: { x: 300, y: 250 },
      data: { label: '🎯 Focus Controller\nSelective attention\nDistraction suppression' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'capacity-monitor',
      position: { x: 500, y: 250 },
      data: { label: '📊 Capacity Monitor\nLoad tracking\nOverflow detection' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'refresh-system',
      position: { x: 700, y: 250 },
      data: { label: '🔄 Refresh System\nActive maintenance\nDecay prevention' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    // Memory Components
    {
      id: 'phonological-loop',
      position: { x: 50, y: 380 },
      data: { label: '🗣️ Phonological Loop\nVerbal information\nInner speech' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'visuospatial-sketchpad',
      position: { x: 220, y: 380 },
      data: { label: '👁️ Visuospatial Pad\nVisual imagery\nSpatial relations' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'episodic-buffer',
      position: { x: 390, y: 380 },
      data: { label: '📚 Episodic Buffer\nIntegrated info\nMultimodal binding' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'central-executive',
      position: { x: 560, y: 380 },
      data: { label: '⚙️ Central Executive\nCoordination\nTask switching' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'goal-stack',
      position: { x: 730, y: 380 },
      data: { label: '🎯 Goal Stack\nActive goals\nSub-tasks' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    // Processing Strategies
    {
      id: 'chunking-processor',
      position: { x: 100, y: 520 },
      data: { label: '🔢 Chunking\nGroup related items\nExpand capacity' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'rehearsal-loop',
      position: { x: 280, y: 520 },
      data: { label: '🔁 Rehearsal Loop\nMaintenance rehearsal\nElaborative rehearsal' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'updating-mechanism',
      position: { x: 460, y: 520 },
      data: { label: '🔄 Updating\nReplace old info\nMaintain relevance' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'switching-control',
      position: { x: 640, y: 520 },
      data: { label: '🔀 Task Switching\nContext switching\nSet reconfiguration' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    // Interference Management
    {
      id: 'proactive-interference',
      position: { x: 50, y: 640 },
      data: { label: '⬅️ Proactive Interference\nOld info disrupts new' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'retroactive-interference',
      position: { x: 250, y: 640 },
      data: { label: '➡️ Retroactive Interference\nNew info disrupts old' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'interference-resolution',
      position: { x: 450, y: 640 },
      data: { label: '🛡️ Interference Resolution\nConflict detection\nSuppression' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'cognitive-control',
      position: { x: 650, y: 640 },
      data: { label: '🎮 Cognitive Control\nInhibition\nFlexibility' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Load Management
    {
      id: 'intrinsic-load',
      position: { x: 100, y: 760 },
      data: { label: '📏 Intrinsic Load\nTask complexity\nInherent difficulty' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'extraneous-load',
      position: { x: 280, y: 760 },
      data: { label: '🌀 Extraneous Load\nIrrelevant processing\nPoor design' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'germane-load',
      position: { x: 460, y: 760 },
      data: { label: '💡 Germane Load\nSchema construction\nDeep processing' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'load-balancing',
      position: { x: 640, y: 760 },
      data: { label: '⚖️ Load Balancing\nOptimal distribution\nResource allocation' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    // Performance Optimization
    {
      id: 'dual-coding',
      position: { x: 150, y: 880 },
      data: { label: '🎨 Dual Coding\nVerbal + visual\nEnhanced encoding' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'external-aids',
      position: { x: 350, y: 880 },
      data: { label: '📝 External Aids\nNote-taking\nDiagrams' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'metacognitive-monitoring',
      position: { x: 550, y: 880 },
      data: { label: '🔍 Metacognition\nSelf-monitoring\nStrategy selection' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'optimized-processing',
      position: { x: 400, y: 1000 },
      data: { label: '✨ Optimized Processing\nEfficient working memory utilization for complex tasks' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Input to core
    {
      id: 'input-core',
      source: 'task-input',
      target: 'working-memory-core',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
    },
    // Core to controllers
    {
      id: 'core-attention',
      source: 'working-memory-core',
      target: 'attention-filter',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Filter',
    },
    {
      id: 'core-focus',
      source: 'working-memory-core',
      target: 'focus-controller',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Focus',
    },
    {
      id: 'core-capacity',
      source: 'working-memory-core',
      target: 'capacity-monitor',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Monitor',
    },
    {
      id: 'core-refresh',
      source: 'working-memory-core',
      target: 'refresh-system',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Refresh',
    },
    // Controllers to components
    {
      id: 'attention-phonological',
      source: 'attention-filter',
      target: 'phonological-loop',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'focus-visuospatial',
      source: 'focus-controller',
      target: 'visuospatial-sketchpad',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'capacity-episodic',
      source: 'capacity-monitor',
      target: 'episodic-buffer',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'refresh-executive',
      source: 'refresh-system',
      target: 'central-executive',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'executive-goals',
      source: 'central-executive',
      target: 'goal-stack',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    // Components to strategies
    {
      id: 'phonological-chunking',
      source: 'phonological-loop',
      target: 'chunking-processor',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'visuospatial-rehearsal',
      source: 'visuospatial-sketchpad',
      target: 'rehearsal-loop',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'episodic-updating',
      source: 'episodic-buffer',
      target: 'updating-mechanism',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'goals-switching',
      source: 'goal-stack',
      target: 'switching-control',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    // Strategies to interference
    {
      id: 'chunking-proactive',
      source: 'chunking-processor',
      target: 'proactive-interference',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'rehearsal-retroactive',
      source: 'rehearsal-loop',
      target: 'retroactive-interference',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'updating-resolution',
      source: 'updating-mechanism',
      target: 'interference-resolution',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'switching-control',
      source: 'switching-control',
      target: 'cognitive-control',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    // Interference to load
    {
      id: 'proactive-intrinsic',
      source: 'proactive-interference',
      target: 'intrinsic-load',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'retroactive-extraneous',
      source: 'retroactive-interference',
      target: 'extraneous-load',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'resolution-germane',
      source: 'interference-resolution',
      target: 'germane-load',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'cognitive-balancing',
      source: 'cognitive-control',
      target: 'load-balancing',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    // Load to optimization
    {
      id: 'intrinsic-dual',
      source: 'intrinsic-load',
      target: 'dual-coding',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'extraneous-external',
      source: 'extraneous-load',
      target: 'external-aids',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'germane-metacognitive',
      source: 'germane-load',
      target: 'metacognitive-monitoring',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    // Balancing to optimization
    {
      id: 'balancing-dual',
      source: 'load-balancing',
      target: 'dual-coding',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '5 5' },
    },
    {
      id: 'balancing-external',
      source: 'load-balancing',
      target: 'external-aids',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '5 5' },
    },
    {
      id: 'balancing-metacognitive',
      source: 'load-balancing',
      target: 'metacognitive-monitoring',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '5 5' },
    },
    // Optimization to output
    {
      id: 'dual-output',
      source: 'dual-coding',
      target: 'optimized-processing',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'external-output',
      source: 'external-aids',
      target: 'optimized-processing',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'metacognitive-output',
      source: 'metacognitive-monitoring',
      target: 'optimized-processing',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
    // Feedback loop
    {
      id: 'output-feedback',
      source: 'optimized-processing',
      target: 'working-memory-core',
      style: { ...edgeStyle, stroke: '#10b981', strokeDasharray: '5 5' },
      label: 'Feedback',
    },
  ],
  steps: [
    {
      title: 'Task Input',
      description: 'Complex task requiring working memory',
      activeNodes: ['task-input', 'working-memory-core'],
      activeEdges: ['input-core'],
    },
    {
      title: 'Attention Control',
      description: 'Filtering and focusing on relevant information',
      activeNodes: ['working-memory-core', 'attention-filter', 'focus-controller', 'capacity-monitor', 'refresh-system'],
      activeEdges: ['core-attention', 'core-focus', 'core-capacity', 'core-refresh'],
    },
    {
      title: 'Memory Components',
      description: 'Distributing information across working memory subsystems',
      activeNodes: ['phonological-loop', 'visuospatial-sketchpad', 'episodic-buffer', 'central-executive', 'goal-stack'],
      activeEdges: ['attention-phonological', 'focus-visuospatial', 'capacity-episodic', 'refresh-executive', 'executive-goals'],
    },
    {
      title: 'Processing Strategies',
      description: 'Applying chunking, rehearsal, updating, and switching',
      activeNodes: ['chunking-processor', 'rehearsal-loop', 'updating-mechanism', 'switching-control'],
      activeEdges: ['phonological-chunking', 'visuospatial-rehearsal', 'episodic-updating', 'goals-switching'],
    },
    {
      title: 'Interference Management',
      description: 'Handling proactive and retroactive interference',
      activeNodes: ['proactive-interference', 'retroactive-interference', 'interference-resolution', 'cognitive-control'],
      activeEdges: ['chunking-proactive', 'rehearsal-retroactive', 'updating-resolution', 'switching-control'],
    },
    {
      title: 'Cognitive Load',
      description: 'Managing intrinsic, extraneous, and germane load',
      activeNodes: ['intrinsic-load', 'extraneous-load', 'germane-load', 'load-balancing'],
      activeEdges: ['proactive-intrinsic', 'retroactive-extraneous', 'resolution-germane', 'cognitive-balancing'],
    },
    {
      title: 'Load Distribution',
      description: 'Balancing cognitive load across resources',
      activeNodes: ['load-balancing', 'dual-coding', 'external-aids', 'metacognitive-monitoring'],
      activeEdges: ['balancing-dual', 'balancing-external', 'balancing-metacognitive'],
    },
    {
      title: 'Performance Optimization',
      description: 'Applying optimization strategies',
      activeNodes: ['dual-coding', 'external-aids', 'metacognitive-monitoring'],
      activeEdges: ['intrinsic-dual', 'extraneous-external', 'germane-metacognitive'],
    },
    {
      title: 'Optimized Output',
      description: 'Achieving efficient working memory utilization',
      activeNodes: ['dual-coding', 'external-aids', 'metacognitive-monitoring', 'optimized-processing'],
      activeEdges: ['dual-output', 'external-output', 'metacognitive-output'],
    },
    {
      title: 'Feedback Loop',
      description: 'Learning from performance to improve future processing',
      activeNodes: ['optimized-processing', 'working-memory-core'],
      activeEdges: ['output-feedback'],
    },
  ],
};