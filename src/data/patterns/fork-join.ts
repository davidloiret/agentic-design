import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const forkJoinPattern: PatternScenario = {
  id: 'fork-join',
  title: 'Fork-Join Pattern',
  description: 'Demonstrates recursive task decomposition with parallel execution and synchronized result combination using divide-and-conquer approach',
  initialNodes: [
    // Initial task
    {
      id: 'initial-task',
      type: 'default',
      position: { x: 500, y: 50 },
      data: { label: 'Initial Task\n"Sort array [8,3,5,1,7,6,2,4]"' },
      style: { ...nodeStyle, minWidth: 200, background: '#dc2626' }
    },

    // Task analyzer
    {
      id: 'task-analyzer',
      type: 'default',
      position: { x: 500, y: 180 },
      data: { label: 'Task Analyzer\nEvaluate decomposition strategy' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Fork coordinator
    {
      id: 'fork-coordinator',
      type: 'default',
      position: { x: 500, y: 320 },
      data: { label: 'Fork Coordinator\nManage task decomposition' },
      style: { ...nodeStyle, minWidth: 200, background: '#f59e0b' }
    },

    // Level 1 Fork - Split into two halves
    {
      id: 'fork-left-1',
      type: 'default',
      position: { x: 250, y: 480 },
      data: { label: 'Left Subtask L1\n[8,3,5,1]' },
      style: { ...nodeStyle, minWidth: 160, background: '#3b82f6' }
    },
    {
      id: 'fork-right-1',
      type: 'default',
      position: { x: 750, y: 480 },
      data: { label: 'Right Subtask L1\n[7,6,2,4]' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981' }
    },

    // Level 2 Fork - Split halves again
    {
      id: 'fork-left-2a',
      type: 'default',
      position: { x: 150, y: 620 },
      data: { label: 'Left Subtask L2A\n[8,3]' },
      style: { ...nodeStyle, minWidth: 140, background: '#8b5cf6' }
    },
    {
      id: 'fork-left-2b',
      type: 'default',
      position: { x: 350, y: 620 },
      data: { label: 'Right Subtask L2B\n[5,1]' },
      style: { ...nodeStyle, minWidth: 140, background: '#ec4899' }
    },
    {
      id: 'fork-right-2a',
      type: 'default',
      position: { x: 650, y: 620 },
      data: { label: 'Left Subtask L2C\n[7,6]' },
      style: { ...nodeStyle, minWidth: 140, background: '#f97316' }
    },
    {
      id: 'fork-right-2b',
      type: 'default',
      position: { x: 850, y: 620 },
      data: { label: 'Right Subtask L2D\n[2,4]' },
      style: { ...nodeStyle, minWidth: 140, background: '#06b6d4' }
    },

    // Level 3 Fork - Individual elements (base case)
    {
      id: 'element-1',
      type: 'default',
      position: { x: 100, y: 760 },
      data: { label: 'Element\n[8]' },
      style: { ...nodeStyle, minWidth: 80, background: '#6366f1', fontSize: '11px' }
    },
    {
      id: 'element-2',
      type: 'default',
      position: { x: 200, y: 760 },
      data: { label: 'Element\n[3]' },
      style: { ...nodeStyle, minWidth: 80, background: '#6366f1', fontSize: '11px' }
    },
    {
      id: 'element-3',
      type: 'default',
      position: { x: 300, y: 760 },
      data: { label: 'Element\n[5]' },
      style: { ...nodeStyle, minWidth: 80, background: '#6366f1', fontSize: '11px' }
    },
    {
      id: 'element-4',
      type: 'default',
      position: { x: 400, y: 760 },
      data: { label: 'Element\n[1]' },
      style: { ...nodeStyle, minWidth: 80, background: '#6366f1', fontSize: '11px' }
    },
    {
      id: 'element-5',
      type: 'default',
      position: { x: 600, y: 760 },
      data: { label: 'Element\n[7]' },
      style: { ...nodeStyle, minWidth: 80, background: '#6366f1', fontSize: '11px' }
    },
    {
      id: 'element-6',
      type: 'default',
      position: { x: 700, y: 760 },
      data: { label: 'Element\n[6]' },
      style: { ...nodeStyle, minWidth: 80, background: '#6366f1', fontSize: '11px' }
    },
    {
      id: 'element-7',
      type: 'default',
      position: { x: 800, y: 760 },
      data: { label: 'Element\n[2]' },
      style: { ...nodeStyle, minWidth: 80, background: '#6366f1', fontSize: '11px' }
    },
    {
      id: 'element-8',
      type: 'default',
      position: { x: 900, y: 760 },
      data: { label: 'Element\n[4]' },
      style: { ...nodeStyle, minWidth: 80, background: '#6366f1', fontSize: '11px' }
    },

    // Level 3 Join - Merge pairs
    {
      id: 'join-3a',
      type: 'default',
      position: { x: 150, y: 900 },
      data: { label: 'Join L3A\n[3,8]' },
      style: { ...nodeStyle, minWidth: 120, background: '#db2777' }
    },
    {
      id: 'join-3b',
      type: 'default',
      position: { x: 350, y: 900 },
      data: { label: 'Join L3B\n[1,5]' },
      style: { ...nodeStyle, minWidth: 120, background: '#db2777' }
    },
    {
      id: 'join-3c',
      type: 'default',
      position: { x: 650, y: 900 },
      data: { label: 'Join L3C\n[6,7]' },
      style: { ...nodeStyle, minWidth: 120, background: '#db2777' }
    },
    {
      id: 'join-3d',
      type: 'default',
      position: { x: 850, y: 900 },
      data: { label: 'Join L3D\n[2,4]' },
      style: { ...nodeStyle, minWidth: 120, background: '#db2777' }
    },

    // Level 2 Join - Merge quartets
    {
      id: 'join-2a',
      type: 'default',
      position: { x: 250, y: 1040 },
      data: { label: 'Join L2A\n[1,3,5,8]' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed' }
    },
    {
      id: 'join-2b',
      type: 'default',
      position: { x: 750, y: 1040 },
      data: { label: 'Join L2B\n[2,4,6,7]' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed' }
    },

    // Level 1 Join - Final merge
    {
      id: 'join-1',
      type: 'default',
      position: { x: 500, y: 1180 },
      data: { label: 'Final Join\n[1,2,3,4,5,6,7,8]' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Supporting systems
    {
      id: 'thread-pool',
      type: 'default',
      position: { x: 200, y: 320 },
      data: { label: 'Thread Pool\nManage parallel execution' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc7b16' }
    },

    {
      id: 'synchronizer',
      type: 'default',
      position: { x: 800, y: 320 },
      data: { label: 'Synchronizer\nCoordinate join operations' },
      style: { ...nodeStyle, minWidth: 160, background: '#ef4444' }
    },

    // Work stealing queue
    {
      id: 'work-stealing',
      type: 'default',
      position: { x: 100, y: 480 },
      data: { label: 'Work Stealing\nLoad balancing' },
      style: { ...nodeStyle, minWidth: 140, background: '#0369a1' }
    },

    // Task scheduler
    {
      id: 'task-scheduler',
      type: 'default',
      position: { x: 900, y: 480 },
      data: { label: 'Task Scheduler\nOptimize execution' },
      style: { ...nodeStyle, minWidth: 140, background: '#059669' }
    },

    // Performance monitor
    {
      id: 'performance-monitor',
      type: 'default',
      position: { x: 50, y: 180 },
      data: { label: 'Performance Monitor\n• Parallel efficiency: 85%\\n• Thread utilization: 92%\\n• Fork overhead: 12ms\\n• Join latency: 8ms\\n• Speedup factor: 3.2x' },
      style: { ...nodeStyle, minWidth: 160, background: '#0369a1', fontSize: '11px' }
    },

    // Memory manager
    {
      id: 'memory-manager',
      type: 'default',
      position: { x: 950, y: 180 },
      data: { label: 'Memory Manager\n• Stack allocation: 2.4MB\\n• Heap usage: 1.8MB\\n• GC pressure: Low\\n• Memory locality: High\\n• Cache efficiency: 94%' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc7b16', fontSize: '11px' }
    },

    // Recursion depth tracker
    {
      id: 'recursion-tracker',
      type: 'default',
      position: { x: 500, y: 1320 },
      data: { label: 'Recursion Tracker\nDepth: 3 levels\\nStack frames: 15\\nBase cases: 8' },
      style: { ...nodeStyle, minWidth: 180, background: '#6366f1' }
    },

    // Result validator
    {
      id: 'result-validator',
      type: 'default',
      position: { x: 300, y: 1320 },
      data: { label: 'Result Validator\nVerify sorted order\\nIntegrity check' },
      style: { ...nodeStyle, minWidth: 160, background: '#059669' }
    },

    // Complexity analyzer
    {
      id: 'complexity-analyzer',
      type: 'default',
      position: { x: 700, y: 1320 },
      data: { label: 'Complexity Analyzer\nTime: O(n log n)\\nSpace: O(log n)\\nParallel: O(n)' },
      style: { ...nodeStyle, minWidth: 160, background: '#ec4899' }
    }
  ],

  initialEdges: [
    // Initial flow
    {
      id: 'e-initial-analyzer',
      source: 'initial-task',
      target: 'task-analyzer',
      style: edgeStyle
    },
    {
      id: 'e-analyzer-coordinator',
      source: 'task-analyzer',
      target: 'fork-coordinator',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },

    // Support systems
    {
      id: 'e-coordinator-pool',
      source: 'fork-coordinator',
      target: 'thread-pool',
      style: { ...edgeStyle, stroke: '#dc7b16' }
    },
    {
      id: 'e-coordinator-sync',
      source: 'fork-coordinator',
      target: 'synchronizer',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },

    // Level 1 Fork
    {
      id: 'e-fork-left-1',
      source: 'fork-coordinator',
      target: 'fork-left-1',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      label: 'Fork Left'
    },
    {
      id: 'e-fork-right-1',
      source: 'fork-coordinator',
      target: 'fork-right-1',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'Fork Right'
    },

    // Work stealing and scheduling
    {
      id: 'e-stealing-left',
      source: 'work-stealing',
      target: 'fork-left-1',
      style: { ...edgeStyle, stroke: '#0369a1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-scheduler-right',
      source: 'task-scheduler',
      target: 'fork-right-1',
      style: { ...edgeStyle, stroke: '#059669', strokeDasharray: '3,3' }
    },

    // Level 2 Fork
    {
      id: 'e-left-1-2a',
      source: 'fork-left-1',
      target: 'fork-left-2a',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },
    {
      id: 'e-left-1-2b',
      source: 'fork-left-1',
      target: 'fork-left-2b',
      style: { ...edgeStyle, stroke: '#ec4899' }
    },
    {
      id: 'e-right-1-2a',
      source: 'fork-right-1',
      target: 'fork-right-2a',
      style: { ...edgeStyle, stroke: '#f97316' }
    },
    {
      id: 'e-right-1-2b',
      source: 'fork-right-1',
      target: 'fork-right-2b',
      style: { ...edgeStyle, stroke: '#06b6d4' }
    },

    // Level 3 Fork to elements
    {
      id: 'e-2a-e1',
      source: 'fork-left-2a',
      target: 'element-1',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },
    {
      id: 'e-2a-e2',
      source: 'fork-left-2a',
      target: 'element-2',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },
    {
      id: 'e-2b-e3',
      source: 'fork-left-2b',
      target: 'element-3',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },
    {
      id: 'e-2b-e4',
      source: 'fork-left-2b',
      target: 'element-4',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },
    {
      id: 'e-2c-e5',
      source: 'fork-right-2a',
      target: 'element-5',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },
    {
      id: 'e-2c-e6',
      source: 'fork-right-2a',
      target: 'element-6',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },
    {
      id: 'e-2d-e7',
      source: 'fork-right-2b',
      target: 'element-7',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },
    {
      id: 'e-2d-e8',
      source: 'fork-right-2b',
      target: 'element-8',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },

    // Level 3 Join from elements
    {
      id: 'e-e1-j3a',
      source: 'element-1',
      target: 'join-3a',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-e2-j3a',
      source: 'element-2',
      target: 'join-3a',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-e3-j3b',
      source: 'element-3',
      target: 'join-3b',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-e4-j3b',
      source: 'element-4',
      target: 'join-3b',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-e5-j3c',
      source: 'element-5',
      target: 'join-3c',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-e6-j3c',
      source: 'element-6',
      target: 'join-3c',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-e7-j3d',
      source: 'element-7',
      target: 'join-3d',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-e8-j3d',
      source: 'element-8',
      target: 'join-3d',
      style: { ...edgeStyle, stroke: '#db2777' }
    },

    // Level 2 Join
    {
      id: 'e-j3a-j2a',
      source: 'join-3a',
      target: 'join-2a',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-j3b-j2a',
      source: 'join-3b',
      target: 'join-2a',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-j3c-j2b',
      source: 'join-3c',
      target: 'join-2b',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-j3d-j2b',
      source: 'join-3d',
      target: 'join-2b',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },

    // Level 1 Join
    {
      id: 'e-j2a-j1',
      source: 'join-2a',
      target: 'join-1',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-j2b-j1',
      source: 'join-2b',
      target: 'join-1',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Final processing
    {
      id: 'e-j1-validator',
      source: 'join-1',
      target: 'result-validator',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-j1-tracker',
      source: 'join-1',
      target: 'recursion-tracker',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },
    {
      id: 'e-j1-complexity',
      source: 'join-1',
      target: 'complexity-analyzer',
      style: { ...edgeStyle, stroke: '#ec4899' }
    },

    // Monitoring
    {
      id: 'e-perf-coordinator',
      source: 'performance-monitor',
      target: 'fork-coordinator',
      style: { ...edgeStyle, stroke: '#0369a1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-memory-coordinator',
      source: 'memory-manager',
      target: 'fork-coordinator',
      style: { ...edgeStyle, stroke: '#dc7b16', strokeDasharray: '3,3' }
    }
  ],

  steps: [
    {
      id: 'step1',
      title: 'Initial Task Reception',
      description: 'Receive the initial problem requiring divide-and-conquer approach.',
      input: 'Task: Sort array [8,3,5,1,7,6,2,4] using parallel merge sort algorithm',
      activeNodes: ['initial-task'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Task Analysis and Strategy',
      description: 'Analyze the task to determine optimal decomposition strategy and parallelization approach.',
      input: 'Analysis: Array size 8, divide-and-conquer suitable, target depth 3 levels, 8 base cases',
      activeNodes: ['initial-task', 'task-analyzer'],
      activeEdges: ['e-initial-analyzer'],
      output: 'Task Analysis Results:\\n• **Problem Type**: Sorting algorithm (merge sort)\\n• **Input Size**: 8 elements\\n• **Decomposition Strategy**: Binary recursive splitting\\n• **Target Depth**: 3 levels (log₂(8))\\n• **Base Case**: Single elements (trivially sorted)\\n• **Parallelization**: Fork at each level, join with merge\\n• **Expected Complexity**: O(n log n) sequential, O(n) parallel\\n• **Memory Requirements**: O(log n) stack space\\n• **Thread Pool Size**: 4 threads recommended'
    },
    {
      id: 'step3',
      title: 'Fork Coordinator Setup',
      description: 'Initialize the fork coordinator to manage task decomposition and thread allocation.',
      input: 'Coordinator setup: thread pool configuration, synchronization strategy, memory allocation',
      activeNodes: ['fork-coordinator', 'thread-pool', 'synchronizer'],
      activeEdges: ['e-analyzer-coordinator', 'e-coordinator-pool', 'e-coordinator-sync'],
      output: 'Fork Coordinator Configuration:\\n• **Thread Pool**: 4 worker threads initialized\\n• **Synchronizer**: CountDownLatch for join coordination\\n• **Memory Strategy**: Stack-based allocation for efficiency\\n• **Load Balancing**: Work-stealing queue enabled\\n• **Recursion Limit**: Max depth 10 levels (safety)\\n• **Task Scheduling**: Fair scheduling with priority queues\\n• **Exception Handling**: Robust error propagation\\n• **Performance Tracking**: Metrics collection enabled'
    },
    {
      id: 'step4',
      title: 'Level 1 Fork - Primary Split',
      description: 'Split the initial array into two halves for parallel processing.',
      input: 'Fork operation: divide array [8,3,5,1,7,6,2,4] into left [8,3,5,1] and right [7,6,2,4]',
      activeNodes: ['fork-left-1', 'fork-right-1', 'work-stealing', 'task-scheduler'],
      activeEdges: ['e-fork-left-1', 'e-fork-right-1', 'e-stealing-left', 'e-scheduler-right'],
      output: 'Level 1 Fork Results:\\n• **Left Subtask**: [8,3,5,1] assigned to Thread-1\\n• **Right Subtask**: [7,6,2,4] assigned to Thread-2\\n• **Fork Overhead**: 2.3ms for task creation\\n• **Memory Allocation**: 512KB per subtask\\n• **Work Stealing**: Enabled between threads\\n• **Task Scheduling**: Round-robin assignment\\n• **Synchronization Point**: Barrier set for join phase\\n• **Progress Tracking**: 50% of tasks forked'
    },
    {
      id: 'step5',
      title: 'Level 2 Fork - Secondary Split',
      description: 'Further decompose the halves into quarters for increased parallelism.',
      input: 'Secondary fork: split [8,3,5,1] into [8,3] and [5,1], split [7,6,2,4] into [7,6] and [2,4]',
      activeNodes: ['fork-left-2a', 'fork-left-2b', 'fork-right-2a', 'fork-right-2b'],
      activeEdges: ['e-left-1-2a', 'e-left-1-2b', 'e-right-1-2a', 'e-right-1-2b'],
      output: 'Level 2 Fork Results:\\n• **Subtask L2A**: [8,3] → Thread-1 (continued)\\n• **Subtask L2B**: [5,1] → Thread-3 (work stealing)\\n• **Subtask L2C**: [7,6] → Thread-2 (continued)\\n• **Subtask L2D**: [2,4] → Thread-4 (work stealing)\\n• **Parallelism Level**: 4 concurrent tasks\\n• **Thread Utilization**: 100% (all 4 threads active)\\n• **Memory Usage**: 2.1MB total allocated\\n• **Fork Depth**: 2/3 levels completed'
    },
    {
      id: 'step6',
      title: 'Level 3 Fork - Base Case Decomposition',
      description: 'Break down to individual elements (base case) for trivial sorting.',
      input: 'Base case fork: decompose pairs into individual elements for trivial sort base case',
      activeNodes: ['element-1', 'element-2', 'element-3', 'element-4', 'element-5', 'element-6', 'element-7', 'element-8'],
      activeEdges: ['e-2a-e1', 'e-2a-e2', 'e-2b-e3', 'e-2b-e4', 'e-2c-e5', 'e-2c-e6', 'e-2d-e7', 'e-2d-e8'],
      output: 'Base Case Decomposition:\\n• **Elements**: 8 individual elements reached\\n• **Thread Distribution**:\\n  - Thread-1: Elements [8], [3]\\n  - Thread-2: Elements [7], [6]\\n  - Thread-3: Elements [5], [1]\\n  - Thread-4: Elements [2], [4]\\n• **Base Case Recognition**: Single elements trivially sorted\\n• **Memory Footprint**: Minimal (32 bytes per element)\\n• **Fork Overhead**: Complete (8 fork operations total)\\n• **Ready for Join Phase**: All base cases identified'
    },
    {
      id: 'step7',
      title: 'Level 3 Join - Pair Merging',
      description: 'Begin joining by merging pairs of individual elements into sorted pairs.',
      input: 'Pair merge: combine [8],[3] → [3,8], [5],[1] → [1,5], [7],[6] → [6,7], [2],[4] → [2,4]',
      activeNodes: ['join-3a', 'join-3b', 'join-3c', 'join-3d'],
      activeEdges: ['e-e1-j3a', 'e-e2-j3a', 'e-e3-j3b', 'e-e4-j3b', 'e-e5-j3c', 'e-e6-j3c', 'e-e7-j3d', 'e-e8-j3d'],
      output: 'Level 3 Join (Pair Merging):\\n• **Join L3A**: [8] + [3] → [3,8] (1 comparison)\\n• **Join L3B**: [5] + [1] → [1,5] (1 comparison)\\n• **Join L3C**: [7] + [6] → [6,7] (1 comparison)\\n• **Join L3D**: [2] + [4] → [2,4] (1 comparison)\\n• **Parallel Execution**: 4 merge operations concurrent\\n• **Total Comparisons**: 4 (optimal for this level)\\n• **Join Latency**: 1.2ms average per merge\\n• **Memory Efficiency**: In-place merging where possible\\n• **Progress**: 25% of join operations complete'
    },
    {
      id: 'step8',
      title: 'Level 2 Join - Quartet Merging',
      description: 'Merge sorted pairs into sorted quartets using parallel merge operations.',
      input: 'Quartet merge: combine [3,8] + [1,5] → [1,3,5,8], [6,7] + [2,4] → [2,4,6,7]',
      activeNodes: ['join-2a', 'join-2b'],
      activeEdges: ['e-j3a-j2a', 'e-j3b-j2a', 'e-j3c-j2b', 'e-j3d-j2b'],
      output: 'Level 2 Join (Quartet Merging):\\n• **Join L2A**: [3,8] + [1,5] → [1,3,5,8]\\n  - Merge algorithm: Two-way merge\\n  - Comparisons needed: 4\\n  - Execution time: 2.8ms\\n• **Join L2B**: [6,7] + [2,4] → [2,4,6,7]\\n  - Merge algorithm: Two-way merge\\n  - Comparisons needed: 4\\n  - Execution time: 2.6ms\\n• **Parallelism**: 2 concurrent merge operations\\n• **Thread Synchronization**: Successful barrier passage\\n• **Progress**: 50% of join operations complete\\n• **Memory Usage**: 1.6MB (reduced from peak)'
    },
    {
      id: 'step9',
      title: 'Level 1 Join - Final Merge',
      description: 'Perform the final merge to combine all elements into the fully sorted result.',
      input: 'Final merge: combine sorted quartets [1,3,5,8] + [2,4,6,7] → [1,2,3,4,5,6,7,8]',
      activeNodes: ['join-1'],
      activeEdges: ['e-j2a-j1', 'e-j2b-j1'],
      output: 'Final Join (Complete Merge):\\n• **Final Merge**: [1,3,5,8] + [2,4,6,7] → [1,2,3,4,5,6,7,8]\\n• **Algorithm**: Two-way merge with sentinel values\\n• **Comparisons**: 7 comparisons total\\n• **Execution Time**: 3.2ms\\n• **Memory Operations**: 8 element moves\\n• **Result Validation**: All elements present and ordered\\n• **Thread Coordination**: All worker threads synchronized\\n• **Total Sort Time**: 15.4ms (including fork overhead)\\n• **Speedup**: 3.2x compared to sequential merge sort'
    },
    {
      id: 'step10',
      title: 'Result Validation and Verification',
      description: 'Validate the sorted result and verify algorithm correctness.',
      input: 'Validation: check sorted order, verify all elements present, validate algorithm correctness',
      activeNodes: ['result-validator', 'recursion-tracker', 'complexity-analyzer'],
      activeEdges: ['e-j1-validator', 'e-j1-tracker', 'e-j1-complexity'],
      output: 'Result Validation:\\n• **Sorted Order**: ✓ Verified ([1,2,3,4,5,6,7,8])\\n• **Element Integrity**: ✓ All 8 original elements present\\n• **No Duplicates**: ✓ Confirmed\\n• **Algorithm Correctness**: ✓ Merge sort invariants maintained\\n\\n**Recursion Analysis**:\\n• **Maximum Depth**: 3 levels (optimal for n=8)\\n• **Total Stack Frames**: 15 frames created\\n• **Base Cases**: 8 (all single elements)\\n• **Memory Efficiency**: Stack usage within limits\\n\\n**Complexity Analysis**:\\n• **Time Complexity**: O(n log n) = O(8 × log₂(8)) = O(24)\\n• **Space Complexity**: O(log n) = O(3) for recursion stack\\n• **Parallel Time**: O(n) = O(8) with sufficient processors\\n• **Actual Performance**: 15.4ms total, 85% parallel efficiency'
    },
    {
      id: 'step11',
      title: 'Performance Analysis and Metrics',
      description: 'Analyze performance metrics and system resource utilization.',
      activeNodes: ['performance-monitor', 'memory-manager'],
      activeEdges: ['e-perf-coordinator', 'e-memory-coordinator'],
      output: 'Performance Metrics Analysis:\\n\\n**Parallel Efficiency**:\\n• **Speedup Factor**: 3.2x (theoretical max: 4x)\\n• **Parallel Efficiency**: 85% (excellent)\\n• **Thread Utilization**: 92% average\\n• **Load Balancing**: Well distributed\\n\\n**Memory Management**:\\n• **Peak Memory Usage**: 2.4MB\\n• **Stack Allocation**: Efficient recursive calls\\n• **Heap Pressure**: Minimal (mostly stack-based)\\n• **Garbage Collection**: Zero GC events\\n• **Memory Locality**: High cache efficiency (94%)\\n\\n**Timing Breakdown**:\\n• **Fork Overhead**: 12ms total\\n• **Join Latency**: 8ms average\\n• **Merge Operations**: 24 comparisons total\\n• **Thread Synchronization**: <1ms overhead'
    },
    {
      id: 'step12',
      title: 'Fork-Join Completion Summary',
      description: 'Summarize the complete fork-join execution with final results and insights.',
      output: 'Fork-Join Pattern Execution Complete:\\n\\n**Algorithm**: Parallel Merge Sort using Fork-Join Framework\\n**Input**: [8,3,5,1,7,6,2,4] (8 elements)\\n**Output**: [1,2,3,4,5,6,7,8] (fully sorted)\\n\\n**Execution Summary**:\\n• **Total Execution Time**: 15.4ms\\n• **Sequential Comparison**: ~48ms (estimated)\\n• **Speedup Achieved**: 3.2x performance improvement\\n• **Parallel Efficiency**: 85% (very good)\\n• **Resource Utilization**: 4 threads, 92% average utilization\\n\\n**Fork-Join Benefits Demonstrated**:\\n✓ **Recursive Decomposition**: Elegant divide-and-conquer\\n✓ **Automatic Parallelization**: Framework handles thread management\\n✓ **Work Stealing**: Optimal load balancing\\n✓ **Synchronization**: Clean join semantics\\n✓ **Scalability**: Efficient use of available cores\\n\\n**Key Insights**:\\n• Fork-join excels at recursive, parallelizable algorithms\\n• Work-stealing prevents thread idle time\\n• Memory locality crucial for cache performance\\n• Synchronization overhead minimal with proper design\\n\\n**Complexity Analysis**:\\n• **Time**: O(n log n) sequential → O(n) parallel (optimal)\\n• **Space**: O(log n) stack space (minimal)\\n• **Processors**: Scales well up to O(n) cores\\n\\n*Fork-join pattern achieved 3.2x speedup with 85% parallel efficiency on 4-core system*'
    }
  ]
};