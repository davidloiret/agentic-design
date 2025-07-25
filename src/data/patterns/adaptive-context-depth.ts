import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const adaptiveContextDepthPattern: PatternScenario = {
  id: 'adaptive-context-depth',
  title: 'Adaptive Context Depth in Multi-Agent Systems',
  description: 'Dynamic adjustment of memory depth and context complexity based on task requirements for optimal resource utilization',
  steps: [
    {
      id: 'step-1',
      title: 'Task Reception & Analysis',
      description: 'System receives query and performs initial task categorization and complexity estimation',
      input: 'Query: "Design an AI system for autonomous vehicle safety in urban environments"',
      activeNodes: ['task-input', 'task-analyzer', 'complexity-metrics'],
      activeEdges: ['input-to-analyzer'],
      nodeUpdates: {
        'task-input': {
          data: { label: 'Task Input\\nReceiving complex query...\\nInitial processing' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'task-analyzer': {
          data: { label: 'Task Analyzer\\nParsing requirements\\nDomain identification' },
          style: { ...nodeStyle, background: '#f59e0b' }
        },
        'complexity-metrics': {
          data: { label: 'Complexity Metrics\\nMulti-domain: 4 areas\\nEstimated complexity: HIGH' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        }
      }
    },
    {
      id: 'step-2',
      title: 'Complexity Assessment',
      description: 'Multi-dimensional analysis determines task complexity score and required processing depth',
      activeNodes: ['task-analyzer', 'complexity-assessor', 'domain-mapper'],
      activeEdges: ['analyzer-to-assessor', 'assessor-to-mapper'],
      nodeUpdates: {
        'complexity-assessor': {
          data: { label: 'Complexity Assessor\\nAnalyzing dimensions:\\n• Technical complexity: 5/5\\n• Multi-domain: 4 areas' },
          style: { ...nodeStyle, background: '#f59e0b' }
        },
        'domain-mapper': {
          data: { label: 'Domain Mapper\\nIdentified domains:\\n• Computer Vision\\n• Control Systems\\n• Safety Analysis\\n• Ethics' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        }
      }
    },
    {
      id: 'step-3',
      title: 'Context Depth Selection',
      description: 'System selects optimal context depth level based on complexity assessment and available resources',
      activeNodes: ['complexity-assessor', 'depth-controller', 'context-level-5', 'resource-monitor'],
      activeEdges: ['assessor-to-depth', 'depth-to-level5', 'monitor-to-depth'],
      nodeUpdates: {
        'depth-controller': {
          data: { label: 'Depth Controller\\nSelected: Level 5\\nSystem Design Context\\nFull complexity handling' },
          style: { ...nodeStyle, background: '#06b6d4' }
        },
        'context-level-5': {
          data: { label: 'Context Level 5\\nSystem Design Mode\\nMemory: 2500 tokens\\nActive with full depth' },
          style: { ...nodeStyle, background: '#ec4899' }
        },
        'resource-monitor': {
          data: { label: 'Resource Monitor\\nMonitoring availability\\nOptimal allocation confirmed' },
          style: { ...nodeStyle, background: '#10b981' }
        }
      }
    },
    {
      id: 'step-4',
      title: 'Agent Selection & Assignment',
      description: 'Optimal agent combination selected based on required domains and current workload distribution',
      activeNodes: ['depth-controller', 'agent-coordinator', 'cv-agent', 'control-agent', 'safety-agent', 'ethics-agent'],
      activeEdges: ['depth-to-coordinator', 'coordinator-to-cv', 'coordinator-to-control', 'coordinator-to-safety', 'coordinator-to-ethics'],
      nodeUpdates: {
        'agent-coordinator': {
          data: { label: 'Agent Coordinator\\nAssigning 4 specialists:\\nOptimal team composition' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        },
        'cv-agent': {
          data: { label: 'Computer Vision Agent\\nAssigned: Visual processing\\nContext depth: 5\\nMemory: 600 tokens' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'control-agent': {
          data: { label: 'Control Systems Agent\\nAssigned: Vehicle control\\nContext depth: 5\\nMemory: 650 tokens' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'safety-agent': {
          data: { label: 'Safety Analysis Agent\\nAssigned: Safety protocols\\nContext depth: 5\\nMemory: 700 tokens' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'ethics-agent': {
          data: { label: 'Ethics Agent\\nAssigned: Ethical compliance\\nContext depth: 5\\nMemory: 550 tokens' },
          style: { ...nodeStyle, background: '#3b82f6' }
        }
      }
    },
    {
      id: 'step-5',
      title: 'Dynamic Resource Allocation',
      description: 'Memory and compute resources allocated based on context depth requirements and agent needs',
      activeNodes: ['resource-allocator', 'memory-pool', 'compute-scheduler', 'context-level-5'],
      activeEdges: ['allocator-to-memory', 'allocator-to-compute', 'allocator-to-context'],
      nodeUpdates: {
        'resource-allocator': {
          data: { label: 'Resource Allocator\\nAllocating for Level 5:\\n• Total memory: 2500 tokens\\n• Compute: High priority' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        },
        'memory-pool': {
          data: { label: 'Memory Pool\\nAllocated: 2500 tokens\\n• Agent memory: 2000\\n• Shared context: 500\\nUtilization: 85%' },
          style: { ...nodeStyle, background: '#10b981' }
        },
        'compute-scheduler': {
          data: { label: 'Compute Scheduler\\nHigh-priority processing\\nParallel agent execution\\nEstimated time: 1.2s' },
          style: { ...nodeStyle, background: '#10b981' }
        }
      }
    },
    {
      id: 'step-6',
      title: 'Parallel Processing Execution',
      description: 'All assigned agents process their specialized tasks in parallel using allocated context depth',
      activeNodes: ['cv-agent', 'control-agent', 'safety-agent', 'ethics-agent', 'context-level-5', 'coordination-hub'],
      activeEdges: ['agents-to-coordination'],
      nodeUpdates: {
        'cv-agent': {
          data: { label: 'Computer Vision Agent\\nProcessing: Visual sensors\\nProgress: 75%\\nContext: Urban scenarios' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'control-agent': {
          data: { label: 'Control Systems Agent\\nProcessing: Control logic\\nProgress: 80%\\nContext: Vehicle dynamics' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'safety-agent': {
          data: { label: 'Safety Analysis Agent\\nProcessing: Safety protocols\\nProgress: 70%\\nContext: Risk assessment' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'ethics-agent': {
          data: { label: 'Ethics Agent\\nProcessing: Ethical frameworks\\nProgress: 85%\\nContext: Decision ethics' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'coordination-hub': {
          data: { label: 'Coordination Hub\\nSynchronizing outputs\\nCross-domain integration\\nSystem coherence check' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        }
      }
    },
    {
      id: 'step-7',
      title: 'Performance Monitoring & Feedback',
      description: 'Real-time performance monitoring with adaptive adjustments based on system load and efficiency',
      activeNodes: ['performance-monitor', 'efficiency-analyzer', 'load-balancer', 'resource-monitor'],
      activeEdges: ['monitor-to-analyzer', 'analyzer-to-balancer', 'balancer-to-resources'],
      nodeUpdates: {
        'performance-monitor': {
          data: { label: 'Performance Monitor\\nReal-time metrics:\\n• Processing: 95% complete\\n• Efficiency: 92%\\n• Memory usage: 85%' },
          style: { ...nodeStyle, background: '#10b981' }
        },
        'efficiency-analyzer': {
          data: { label: 'Efficiency Analyzer\\nAnalyzing performance:\\n• Context depth: Optimal\\n• Agent utilization: High\\n• Quality maintained' },
          style: { ...nodeStyle, background: '#f59e0b' }
        },
        'load-balancer': {
          data: { label: 'Load Balancer\\nBalancing workload:\\nOptimal distribution\\nNo bottlenecks detected' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        }
      }
    },
    {
      id: 'step-8',
      title: 'Adaptive Optimization',
      description: 'System learns from performance metrics and optimizes context depth strategy for future similar tasks',
      activeNodes: ['adaptive-optimizer', 'learning-module', 'context-strategy', 'system-output'],
      activeEdges: ['optimizer-to-learning', 'learning-to-strategy', 'strategy-to-output'],
      output: 'Autonomous Vehicle AI System Design:\\n\\n• Computer Vision: Multi-sensor fusion with LIDAR, cameras, radar\\n• Control Systems: Hierarchical control with safety guarantees\\n• Safety Analysis: Comprehensive risk assessment framework\\n• Ethics Module: Decision-making with ethical constraints\\n\\nProcessing completed in 1.2 seconds\\nMemory efficiency: 92%\\nContext depth optimization successful\\nSystem ready for deployment planning',
      nodeUpdates: {
        'adaptive-optimizer': {
          data: { label: 'Adaptive Optimizer\\nOptimizing strategy:\\nContext depth: Validated\\nEfficiency: 92%' },
          style: { ...nodeStyle, background: '#10b981' }
        },
        'learning-module': {
          data: { label: 'Learning Module\\nUpdating models:\\nTask pattern recognized\\nFuture optimization rules' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        },
        'context-strategy': {
          data: { label: 'Context Strategy\\nStrategy updated:\\nLevel 5 for system design\\nAgent coordination improved' },
          style: { ...nodeStyle, background: '#f59e0b' }
        },
        'system-output': {
          data: { label: 'System Output\\nComprehensive design ✓\\nAll domains integrated\\nHigh-quality result delivered' },
          style: { ...nodeStyle, background: '#10b981' }
        }
      }
    }
  ],
  initialNodes: [
    // Input Processing
    {
      id: 'task-input',
      position: { x: 100, y: 300 },
      data: { label: 'Task Input\\nQuery reception and parsing' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },
    {
      id: 'task-analyzer',
      position: { x: 300, y: 200 },
      data: { label: 'Task Analyzer\\nRequirement analysis and categorization' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },

    // Complexity Assessment
    {
      id: 'complexity-metrics',
      position: { x: 300, y: 100 },
      data: { label: 'Complexity Metrics\\nMulti-dimensional complexity scoring' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'complexity-assessor',
      position: { x: 500, y: 150 },
      data: { label: 'Complexity Assessor\\nTask difficulty evaluation engine' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'domain-mapper',
      position: { x: 500, y: 250 },
      data: { label: 'Domain Mapper\\nIdentifies required specialist domains' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },

    // Context Depth Control
    {
      id: 'depth-controller',
      position: { x: 700, y: 200 },
      data: { label: 'Depth Controller\\nDynamic context depth selection' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },

    // Context Levels
    {
      id: 'context-level-1',
      position: { x: 900, y: 50 },
      data: { label: 'Context Level 1\\nBasic factual retrieval' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 130 }
    },
    {
      id: 'context-level-3',
      position: { x: 900, y: 150 },
      data: { label: 'Context Level 3\\nMulti-step analysis' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 130 }
    },
    {
      id: 'context-level-5',
      position: { x: 900, y: 250 },
      data: { label: 'Context Level 5\\nComplex system design' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 130 }
    },

    // Agent Coordination
    {
      id: 'agent-coordinator',
      position: { x: 700, y: 400 },
      data: { label: 'Agent Coordinator\\nOptimal agent selection and assignment' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 170 }
    },

    // Specialist Agents
    {
      id: 'cv-agent',
      position: { x: 1100, y: 300 },
      data: { label: 'Computer Vision Agent\\nVisual processing specialist' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },
    {
      id: 'control-agent',
      position: { x: 1100, y: 400 },
      data: { label: 'Control Systems Agent\\nVehicle control specialist' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },
    {
      id: 'safety-agent',
      position: { x: 1100, y: 500 },
      data: { label: 'Safety Analysis Agent\\nSafety protocol specialist' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },
    {
      id: 'ethics-agent',
      position: { x: 1100, y: 600 },
      data: { label: 'Ethics Agent\\nEthical compliance specialist' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },

    // Resource Management
    {
      id: 'resource-allocator',
      position: { x: 500, y: 400 },
      data: { label: 'Resource Allocator\\nDynamic memory and compute allocation' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 170 }
    },
    {
      id: 'memory-pool',
      position: { x: 300, y: 500 },
      data: { label: 'Memory Pool\\nAdaptive memory management' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },
    {
      id: 'compute-scheduler',
      position: { x: 500, y: 500 },
      data: { label: 'Compute Scheduler\\nParallel processing coordination' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },

    // Coordination & Integration
    {
      id: 'coordination-hub',
      position: { x: 900, y: 450 },
      data: { label: 'Coordination Hub\\nCross-agent integration and synchronization' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 180 }
    },

    // Performance Monitoring
    {
      id: 'performance-monitor',
      position: { x: 700, y: 600 },
      data: { label: 'Performance Monitor\\nReal-time system performance tracking' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 170 }
    },
    {
      id: 'efficiency-analyzer',
      position: { x: 500, y: 650 },
      data: { label: 'Efficiency Analyzer\\nContext depth efficiency evaluation' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 170 }
    },
    {
      id: 'load-balancer',
      position: { x: 300, y: 650 },
      data: { label: 'Load Balancer\\nWorkload distribution optimization' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'resource-monitor',
      position: { x: 700, y: 100 },
      data: { label: 'Resource Monitor\\nResource availability tracking' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },

    // Adaptive Learning
    {
      id: 'adaptive-optimizer',
      position: { x: 100, y: 600 },
      data: { label: 'Adaptive Optimizer\\nContinuous strategy optimization' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'learning-module',
      position: { x: 100, y: 700 },
      data: { label: 'Learning Module\\nPattern recognition and strategy learning' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 170 }
    },
    {
      id: 'context-strategy',
      position: { x: 300, y: 750 },
      data: { label: 'Context Strategy\\nAdaptive context depth strategies' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 170 }
    },

    // Output
    {
      id: 'system-output',
      position: { x: 900, y: 700 },
      data: { label: 'System Output\\nIntegrated solution delivery' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    }
  ],
  initialEdges: [
    // Input processing flow
    {
      id: 'input-to-analyzer',
      source: 'task-input',
      target: 'task-analyzer',
      style: edgeStyle
    },
    {
      id: 'analyzer-to-metrics',
      source: 'task-analyzer',
      target: 'complexity-metrics',
      style: edgeStyle
    },

    // Complexity assessment flow
    {
      id: 'analyzer-to-assessor',
      source: 'task-analyzer',
      target: 'complexity-assessor',
      style: edgeStyle
    },
    {
      id: 'assessor-to-mapper',
      source: 'complexity-assessor',
      target: 'domain-mapper',
      style: edgeStyle
    },

    // Context depth control
    {
      id: 'assessor-to-depth',
      source: 'complexity-assessor',
      target: 'depth-controller',
      style: { ...edgeStyle, strokeWidth: 3 }
    },
    {
      id: 'depth-to-level1',
      source: 'depth-controller',
      target: 'context-level-1',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'depth-to-level3',
      source: 'depth-controller',
      target: 'context-level-3',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'depth-to-level5',
      source: 'depth-controller',
      target: 'context-level-5',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },

    // Agent coordination
    {
      id: 'depth-to-coordinator',
      source: 'depth-controller',
      target: 'agent-coordinator',
      style: { ...edgeStyle, strokeWidth: 3 }
    },
    {
      id: 'coordinator-to-cv',
      source: 'agent-coordinator',
      target: 'cv-agent',
      style: edgeStyle
    },
    {
      id: 'coordinator-to-control',
      source: 'agent-coordinator',
      target: 'control-agent',
      style: edgeStyle
    },
    {
      id: 'coordinator-to-safety',
      source: 'agent-coordinator',
      target: 'safety-agent',
      style: edgeStyle
    },
    {
      id: 'coordinator-to-ethics',
      source: 'agent-coordinator',
      target: 'ethics-agent',
      style: edgeStyle
    },

    // Resource allocation
    {
      id: 'mapper-to-allocator',
      source: 'domain-mapper',
      target: 'resource-allocator',
      style: edgeStyle
    },
    {
      id: 'allocator-to-memory',
      source: 'resource-allocator',
      target: 'memory-pool',
      style: edgeStyle
    },
    {
      id: 'allocator-to-compute',
      source: 'resource-allocator',
      target: 'compute-scheduler',
      style: edgeStyle
    },
    {
      id: 'allocator-to-context',
      source: 'resource-allocator',
      target: 'context-level-5',
      style: edgeStyle
    },

    // Agent coordination and integration
    {
      id: 'agents-to-coordination',
      source: 'cv-agent',
      target: 'coordination-hub',
      style: edgeStyle
    },
    {
      id: 'control-to-coordination',
      source: 'control-agent',
      target: 'coordination-hub',
      style: edgeStyle
    },
    {
      id: 'safety-to-coordination',
      source: 'safety-agent',
      target: 'coordination-hub',
      style: edgeStyle
    },
    {
      id: 'ethics-to-coordination',
      source: 'ethics-agent',
      target: 'coordination-hub',
      style: edgeStyle
    },

    // Performance monitoring
    {
      id: 'coordination-to-monitor',
      source: 'coordination-hub',
      target: 'performance-monitor',
      style: edgeStyle
    },
    {
      id: 'monitor-to-analyzer',
      source: 'performance-monitor',
      target: 'efficiency-analyzer',
      style: edgeStyle
    },
    {
      id: 'analyzer-to-balancer',
      source: 'efficiency-analyzer',
      target: 'load-balancer',
      style: edgeStyle
    },
    {
      id: 'balancer-to-resources',
      source: 'load-balancer',
      target: 'resource-allocator',
      style: { ...edgeStyle, strokeDasharray: '3,3' }
    },

    // Resource monitoring feedback
    {
      id: 'monitor-to-depth',
      source: 'resource-monitor',
      target: 'depth-controller',
      style: { ...edgeStyle, strokeDasharray: '3,3' }
    },

    // Adaptive learning
    {
      id: 'monitor-to-optimizer',
      source: 'performance-monitor',
      target: 'adaptive-optimizer',
      style: edgeStyle
    },
    {
      id: 'optimizer-to-learning',
      source: 'adaptive-optimizer',
      target: 'learning-module',
      style: edgeStyle
    },
    {
      id: 'learning-to-strategy',
      source: 'learning-module',
      target: 'context-strategy',
      style: edgeStyle
    },

    // Final output
    {
      id: 'coordination-to-output',
      source: 'coordination-hub',
      target: 'system-output',
      style: { ...edgeStyle, strokeWidth: 3 }
    },
    {
      id: 'strategy-to-output',
      source: 'context-strategy',
      target: 'system-output',
      style: edgeStyle
    }
  ]
};