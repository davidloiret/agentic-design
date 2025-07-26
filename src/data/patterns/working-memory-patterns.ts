import { PatternScenario } from './types';

export const workingMemoryPatternsPattern: PatternScenario = {
  id: 'working-memory-patterns',
  title: 'Working Memory Patterns',
  description: 'Short-term context management for active cognitive processing with limited capacity management and priority-based retention',
  steps: [
    {
      id: 'input-processing',
      title: 'Input Processing & Attention Control',
      description: 'Filter incoming information and direct attention to relevant stimuli',
      input: 'Raw sensory input, task demands, and environmental stimuli',
      output: 'Filtered information streams and attention allocation priorities',
      activeNodes: ['attention-filter', 'stimulus-processor', 'priority-detector', 'relevance-assessor'],
      activeEdges: ['input-to-filter', 'filter-to-processor', 'processor-to-priority', 'priority-to-assessor']
    },
    {
      id: 'capacity-management',
      title: 'Capacity Management & Load Balancing',
      description: 'Manage the 7±2 item limit and distribute cognitive load effectively',
      input: 'Filtered information and current working memory load',
      output: 'Optimized memory allocation and load distribution',
      activeNodes: ['capacity-monitor', 'load-balancer', 'chunk-organizer', 'overflow-handler'],
      activeEdges: ['assessor-to-monitor', 'monitor-to-balancer', 'balancer-to-organizer', 'organizer-to-overflow']
    },
    {
      id: 'active-maintenance',
      title: 'Active Information Maintenance',
      description: 'Keep relevant information active through rehearsal and refresh cycles',
      input: 'Priority-weighted information items and maintenance schedules',
      output: 'Actively maintained working memory contents',
      activeNodes: ['rehearsal-system', 'refresh-controller', 'decay-preventer', 'activation-booster'],
      activeEdges: ['overflow-to-rehearsal', 'rehearsal-to-refresh', 'refresh-to-decay', 'decay-to-activation']
    },
    {
      id: 'context-updating',
      title: 'Real-time Context Updates',
      description: 'Dynamically update working memory based on task progression and new information',
      input: 'Active memory contents and contextual changes',
      output: 'Updated working memory state with current context',
      activeNodes: ['context-monitor', 'update-scheduler', 'conflict-resolver', 'synchronizer'],
      activeEdges: ['activation-to-context', 'context-to-scheduler', 'scheduler-to-resolver', 'resolver-to-sync']
    },
    {
      id: 'goal-management',
      title: 'Goal Management & Task Coordination',
      description: 'Maintain current goals and coordinate sub-task execution',
      input: 'Current goals, sub-tasks, and execution status',
      output: 'Goal hierarchy and task coordination signals',
      activeNodes: ['goal-tracker', 'task-coordinator', 'sub-goal-manager', 'execution-monitor'],
      activeEdges: ['sync-to-goal', 'goal-to-coordinator', 'coordinator-to-subgoal', 'subgoal-to-execution']
    },
    {
      id: 'interference-control',
      title: 'Interference Control & Distraction Management',
      description: 'Prevent irrelevant information from disrupting active processing',
      input: 'Competing information and distraction sources',
      output: 'Protected working memory with interference suppression',
      activeNodes: ['interference-detector', 'distraction-filter', 'suppression-system', 'focus-maintainer'],
      activeEdges: ['execution-to-interference', 'interference-to-distraction', 'distraction-to-suppression', 'suppression-to-focus']
    },
    {
      id: 'memory-integration',
      title: 'Working Memory Integration & Transfer',
      description: 'Integrate information across different working memory subsystems',
      input: 'Multi-modal working memory contents and integration requirements',
      output: 'Coherent integrated working memory representation',
      activeNodes: ['integration-controller', 'cross-modal-linker', 'coherence-checker', 'transfer-manager'],
      activeEdges: ['focus-to-integration', 'integration-to-modal', 'modal-to-coherence', 'coherence-to-transfer']
    }
  ],
  initialNodes: [
    {
      id: 'attention-filter',
      type: 'input',
      position: { x: 50, y: 100 },
      data: {
        label: 'Attention Filter',
        description: 'Filters incoming information based on relevance and priority',
        type: 'input',
        status: 'idle'
      }
    },
    {
      id: 'stimulus-processor',
      type: 'default',
      position: { x: 250, y: 100 },
      data: {
        label: 'Stimulus Processor',
        description: 'Processes and categorizes filtered stimuli',
        type: 'processor',
        status: 'idle'
      }
    },
    {
      id: 'priority-detector',
      type: 'default',
      position: { x: 450, y: 100 },
      data: {
        label: 'Priority Detector',
        description: 'Detects priority levels of processed stimuli',
        type: 'detector',
        status: 'idle'
      }
    },
    {
      id: 'relevance-assessor',
      type: 'default',
      position: { x: 650, y: 100 },
      data: {
        label: 'Relevance Assessor',
        description: 'Assesses relevance to current task context',
        type: 'assessor',
        status: 'idle'
      }
    },
    {
      id: 'capacity-monitor',
      type: 'default',
      position: { x: 100, y: 250 },
      data: {
        label: 'Capacity Monitor',
        description: 'Monitors current memory load (7±2 items)',
        type: 'monitor',
        status: 'idle'
      }
    },
    {
      id: 'load-balancer',
      type: 'default',
      position: { x: 300, y: 250 },
      data: {
        label: 'Load Balancer',
        description: 'Distributes cognitive load across memory systems',
        type: 'balancer',
        status: 'idle'
      }
    },
    {
      id: 'chunk-organizer',
      type: 'default',
      position: { x: 500, y: 250 },
      data: {
        label: 'Chunk Organizer',
        description: 'Organizes information into meaningful chunks',
        type: 'organizer',
        status: 'idle'
      }
    },
    {
      id: 'overflow-handler',
      type: 'default',
      position: { x: 700, y: 250 },
      data: {
        label: 'Overflow Handler',
        description: 'Manages information when capacity is exceeded',
        type: 'handler',
        status: 'idle'
      }
    },
    {
      id: 'rehearsal-system',
      type: 'default',
      position: { x: 150, y: 400 },
      data: {
        label: 'Rehearsal System',
        description: 'Maintains information through active rehearsal',
        type: 'system',
        status: 'idle'
      }
    },
    {
      id: 'refresh-controller',
      type: 'default',
      position: { x: 350, y: 400 },
      data: {
        label: 'Refresh Controller',
        description: 'Controls refresh cycles for active information',
        type: 'controller',
        status: 'idle'
      }
    },
    {
      id: 'decay-preventer',
      type: 'default',
      position: { x: 550, y: 400 },
      data: {
        label: 'Decay Preventer',
        description: 'Prevents information decay through activation',
        type: 'preventer',
        status: 'idle'
      }
    },
    {
      id: 'activation-booster',
      type: 'default',
      position: { x: 750, y: 400 },
      data: {
        label: 'Activation Booster',
        description: 'Boosts activation levels of important information',
        type: 'booster',
        status: 'idle'
      }
    },
    {
      id: 'context-monitor',
      type: 'default',
      position: { x: 100, y: 550 },
      data: {
        label: 'Context Monitor',
        description: 'Monitors changes in task context and environment',
        type: 'monitor',
        status: 'idle'
      }
    },
    {
      id: 'update-scheduler',
      type: 'default',
      position: { x: 300, y: 550 },
      data: {
        label: 'Update Scheduler',
        description: 'Schedules context updates and memory refreshes',
        type: 'scheduler',
        status: 'idle'
      }
    },
    {
      id: 'conflict-resolver',
      type: 'default',
      position: { x: 500, y: 550 },
      data: {
        label: 'Conflict Resolver',
        description: 'Resolves conflicts between competing information',
        type: 'resolver',
        status: 'idle'
      }
    },
    {
      id: 'synchronizer',
      type: 'default',
      position: { x: 700, y: 550 },
      data: {
        label: 'Synchronizer',
        description: 'Synchronizes working memory with task demands',
        type: 'synchronizer',
        status: 'idle'
      }
    },
    {
      id: 'goal-tracker',
      type: 'default',
      position: { x: 150, y: 700 },
      data: {
        label: 'Goal Tracker',
        description: 'Tracks current goals and their status',
        type: 'tracker',
        status: 'idle'
      }
    },
    {
      id: 'task-coordinator',
      type: 'default',
      position: { x: 350, y: 700 },
      data: {
        label: 'Task Coordinator',
        description: 'Coordinates execution of multiple tasks',
        type: 'coordinator',
        status: 'idle'
      }
    },
    {
      id: 'sub-goal-manager',
      type: 'default',
      position: { x: 550, y: 700 },
      data: {
        label: 'Sub-goal Manager',
        description: 'Manages hierarchy of sub-goals and dependencies',
        type: 'manager',
        status: 'idle'
      }
    },
    {
      id: 'execution-monitor',
      type: 'default',
      position: { x: 750, y: 700 },
      data: {
        label: 'Execution Monitor',
        description: 'Monitors task execution progress and outcomes',
        type: 'monitor',
        status: 'idle'
      }
    },
    {
      id: 'interference-detector',
      type: 'default',
      position: { x: 100, y: 850 },
      data: {
        label: 'Interference Detector',
        description: 'Detects sources of cognitive interference',
        type: 'detector',
        status: 'idle'
      }
    },
    {
      id: 'distraction-filter',
      type: 'default',
      position: { x: 300, y: 850 },
      data: {
        label: 'Distraction Filter',
        description: 'Filters out irrelevant distracting information',
        type: 'filter',
        status: 'idle'
      }
    },
    {
      id: 'suppression-system',
      type: 'default',
      position: { x: 500, y: 850 },
      data: {
        label: 'Suppression System',
        description: 'Suppresses competing irrelevant activations',
        type: 'system',
        status: 'idle'
      }
    },
    {
      id: 'focus-maintainer',
      type: 'default',
      position: { x: 700, y: 850 },
      data: {
        label: 'Focus Maintainer',
        description: 'Maintains focus on task-relevant information',
        type: 'maintainer',
        status: 'idle'
      }
    },
    {
      id: 'integration-controller',
      type: 'default',
      position: { x: 150, y: 1000 },
      data: {
        label: 'Integration Controller',
        description: 'Controls integration across memory subsystems',
        type: 'controller',
        status: 'idle'
      }
    },
    {
      id: 'cross-modal-linker',
      type: 'default',
      position: { x: 350, y: 1000 },
      data: {
        label: 'Cross-modal Linker',
        description: 'Links information across different modalities',
        type: 'linker',
        status: 'idle'
      }
    },
    {
      id: 'coherence-checker',
      type: 'default',
      position: { x: 550, y: 1000 },
      data: {
        label: 'Coherence Checker',
        description: 'Ensures coherence of integrated representations',
        type: 'checker',
        status: 'idle'
      }
    },
    {
      id: 'transfer-manager',
      type: 'output',
      position: { x: 750, y: 1000 },
      data: {
        label: 'Transfer Manager',
        description: 'Manages transfer to long-term memory systems',
        type: 'output',
        status: 'idle'
      }
    }
  ],
  initialEdges: [
    {
      id: 'input-to-filter',
      source: 'attention-filter',
      target: 'stimulus-processor',
      type: 'smoothstep',
      label: 'filtered stimuli'
    },
    {
      id: 'filter-to-processor',
      source: 'stimulus-processor',
      target: 'priority-detector',
      type: 'smoothstep',
      label: 'processed information'
    },
    {
      id: 'processor-to-priority',
      source: 'priority-detector',
      target: 'relevance-assessor',
      type: 'smoothstep',
      label: 'priority-tagged items'
    },
    {
      id: 'priority-to-assessor',
      source: 'relevance-assessor',
      target: 'capacity-monitor',
      type: 'smoothstep',
      label: 'relevance scores'
    },
    {
      id: 'assessor-to-monitor',
      source: 'capacity-monitor',
      target: 'load-balancer',
      type: 'smoothstep',
      label: 'capacity status'
    },
    {
      id: 'monitor-to-balancer',
      source: 'load-balancer',
      target: 'chunk-organizer',
      type: 'smoothstep',
      label: 'load distribution'
    },
    {
      id: 'balancer-to-organizer',
      source: 'chunk-organizer',
      target: 'overflow-handler',
      type: 'smoothstep',
      label: 'organized chunks'
    },
    {
      id: 'organizer-to-overflow',
      source: 'overflow-handler',
      target: 'rehearsal-system',
      type: 'smoothstep',
      label: 'managed overflow'
    },
    {
      id: 'overflow-to-rehearsal',
      source: 'rehearsal-system',
      target: 'refresh-controller',
      type: 'smoothstep',
      label: 'rehearsed items'
    },
    {
      id: 'rehearsal-to-refresh',
      source: 'refresh-controller',
      target: 'decay-preventer',
      type: 'smoothstep',
      label: 'refresh cycles'
    },
    {
      id: 'refresh-to-decay',
      source: 'decay-preventer',
      target: 'activation-booster',
      type: 'smoothstep',
      label: 'preserved activation'
    },
    {
      id: 'decay-to-activation',
      source: 'activation-booster',
      target: 'context-monitor',
      type: 'smoothstep',
      label: 'boosted signals'
    },
    {
      id: 'activation-to-context',
      source: 'context-monitor',
      target: 'update-scheduler',
      type: 'smoothstep',
      label: 'context changes'
    },
    {
      id: 'context-to-scheduler',
      source: 'update-scheduler',
      target: 'conflict-resolver',
      type: 'smoothstep',
      label: 'update schedules'
    },
    {
      id: 'scheduler-to-resolver',
      source: 'conflict-resolver',
      target: 'synchronizer',
      type: 'smoothstep',
      label: 'resolved conflicts'
    },
    {
      id: 'resolver-to-sync',
      source: 'synchronizer',
      target: 'goal-tracker',
      type: 'smoothstep',
      label: 'synchronized state'
    },
    {
      id: 'sync-to-goal',
      source: 'goal-tracker',
      target: 'task-coordinator',
      type: 'smoothstep',
      label: 'goal status'
    },
    {
      id: 'goal-to-coordinator',
      source: 'task-coordinator',
      target: 'sub-goal-manager',
      type: 'smoothstep',
      label: 'task coordination'
    },
    {
      id: 'coordinator-to-subgoal',
      source: 'sub-goal-manager',
      target: 'execution-monitor',
      type: 'smoothstep',
      label: 'sub-goal hierarchy'
    },
    {
      id: 'subgoal-to-execution',
      source: 'execution-monitor',
      target: 'interference-detector',
      type: 'smoothstep',
      label: 'execution feedback'
    },
    {
      id: 'execution-to-interference',
      source: 'interference-detector',
      target: 'distraction-filter',
      type: 'smoothstep',
      label: 'interference signals'
    },
    {
      id: 'interference-to-distraction',
      source: 'distraction-filter',
      target: 'suppression-system',
      type: 'smoothstep',
      label: 'filtered distractions'
    },
    {
      id: 'distraction-to-suppression',
      source: 'suppression-system',
      target: 'focus-maintainer',
      type: 'smoothstep',
      label: 'suppression signals'
    },
    {
      id: 'suppression-to-focus',
      source: 'focus-maintainer',
      target: 'integration-controller',
      type: 'smoothstep',
      label: 'focused attention'
    },
    {
      id: 'focus-to-integration',
      source: 'integration-controller',
      target: 'cross-modal-linker',
      type: 'smoothstep',
      label: 'integration commands'
    },
    {
      id: 'integration-to-modal',
      source: 'cross-modal-linker',
      target: 'coherence-checker',
      type: 'smoothstep',
      label: 'cross-modal links'
    },
    {
      id: 'modal-to-coherence',
      source: 'coherence-checker',
      target: 'transfer-manager',
      type: 'smoothstep',
      label: 'coherent representation'
    },
    {
      id: 'coherence-to-transfer',
      source: 'transfer-manager',
      target: 'attention-filter',
      type: 'smoothstep',
      label: 'memory transfer',
      style: { strokeDasharray: '5,5' }
    }
  ]
};