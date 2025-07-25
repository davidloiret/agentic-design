import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const capabilityRoutingPattern: PatternScenario = {
  id: 'capability-routing',
  title: 'Capability Routing Pattern',
  description: 'Demonstrates routing decisions based on system capabilities, resource availability, and performance optimization',
  initialNodes: [
    // Input
    {
      id: 'input',
      type: 'default',
      position: { x: 500, y: 50 },
      data: { label: 'Task Request\n"Process this workload"' },
      style: { ...nodeStyle, minWidth: 200, background: '#dc2626' }
    },

    // Task analysis
    {
      id: 'task-analyzer',
      type: 'default',
      position: { x: 300, y: 180 },
      data: { label: 'Task Analyzer\nRequirements & constraints' },
      style: { ...nodeStyle, minWidth: 180, background: '#8b5cf6' }
    },

    // Capability discovery
    {
      id: 'capability-scanner',
      type: 'default',
      position: { x: 700, y: 180 },
      data: { label: 'Capability Scanner\nDiscover available resources' },
      style: { ...nodeStyle, minWidth: 180, background: '#6366f1' }
    },

    // Resource monitoring
    {
      id: 'resource-monitor',
      type: 'default',
      position: { x: 500, y: 180 },
      data: { label: 'Resource Monitor\nCurrent utilization & limits' },
      style: { ...nodeStyle, minWidth: 180, background: '#f59e0b' }
    },

    // Capability matcher
    {
      id: 'capability-matcher',
      type: 'default',
      position: { x: 500, y: 320 },
      data: { label: 'Capability Matcher\nMatch requirements to resources' },
      style: { ...nodeStyle, minWidth: 200, background: '#ef4444' }
    },

    // Load balancer
    {
      id: 'load-balancer',
      type: 'default',
      position: { x: 500, y: 460 },
      data: { label: 'Load Balancer\nOptimal resource allocation' },
      style: { ...nodeStyle, minWidth: 200, background: '#f97316' }
    },

    // Capability nodes
    {
      id: 'cpu-intensive',
      type: 'default',
      position: { x: 150, y: 600 },
      data: { label: 'CPU-Intensive Node\nHigh compute capacity' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981' }
    },
    {
      id: 'memory-optimized',
      type: 'default',
      position: { x: 350, y: 600 },
      data: { label: 'Memory-Optimized Node\nLarge RAM capacity' },
      style: { ...nodeStyle, minWidth: 160, background: '#3b82f6' }
    },
    {
      id: 'gpu-accelerated',
      type: 'default',
      position: { x: 550, y: 600 },
      data: { label: 'GPU-Accelerated Node\nParallel processing' },
      style: { ...nodeStyle, minWidth: 160, background: '#8b5cf6' }
    },
    {
      id: 'specialized-node',
      type: 'default',
      position: { x: 750, y: 600 },
      data: { label: 'Specialized Node\nDomain-specific hardware' },
      style: { ...nodeStyle, minWidth: 160, background: '#ec4899' }
    },

    // Processing engines
    {
      id: 'compute-engine',
      type: 'default',
      position: { x: 150, y: 750 },
      data: { label: 'Compute Engine\nCPU-bound processing' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed', fontSize: '12px' }
    },
    {
      id: 'memory-engine',
      type: 'default',
      position: { x: 350, y: 750 },
      data: { label: 'Memory Engine\nLarge dataset handling' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed', fontSize: '12px' }
    },
    {
      id: 'parallel-engine',
      type: 'default',
      position: { x: 550, y: 750 },
      data: { label: 'Parallel Engine\nGPU/ML acceleration' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed', fontSize: '12px' }
    },
    {
      id: 'custom-engine',
      type: 'default',
      position: { x: 750, y: 750 },
      data: { label: 'Custom Engine\nFPGA/ASIC processing' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed', fontSize: '12px' }
    },

    // System capabilities
    {
      id: 'capability-registry',
      type: 'default',
      position: { x: 900, y: 320 },
      data: { label: 'Capability Registry\n• CPU cores: 128\n• RAM: 512GB\n• GPU: 8x V100\n• Storage: 10TB NVMe\n• Network: 100Gbps' },
      style: { ...nodeStyle, minWidth: 160, background: '#6366f1', fontSize: '11px' }
    },

    // Task requirements
    {
      id: 'task-requirements',
      type: 'default',
      position: { x: 100, y: 320 },
      data: { label: 'Task Requirements\n• Compute intensity\n• Memory needs\n• Parallelization\n• Latency constraints\n• Throughput goals' },
      style: { ...nodeStyle, minWidth: 160, background: '#8b5cf6', fontSize: '11px' }
    },

    // Performance metrics
    {
      id: 'performance-monitor',
      type: 'default',
      position: { x: 300, y: 460 },
      data: { label: 'Performance Monitor\nLatency, throughput, utilization' },
      style: { ...nodeStyle, minWidth: 160, background: '#f97316' }
    },

    // Routing decisions
    {
      id: 'routing-decisions',
      type: 'default',
      position: { x: 700, y: 460 },
      data: { label: 'Routing Decisions\n• Capability match: 95%\n• Load distribution\n• Failover planning\n• Performance optimization' },
      style: { ...nodeStyle, minWidth: 160, background: '#f97316', fontSize: '11px' }
    },

    // Result aggregator
    {
      id: 'result-aggregator',
      type: 'default',
      position: { x: 500, y: 900 },
      data: { label: 'Result Aggregator\nCombine & optimize outputs' },
      style: { ...nodeStyle, minWidth: 180, background: '#059669' }
    },

    // Feedback loop
    {
      id: 'capability-optimizer',
      type: 'default',
      position: { x: 200, y: 460 },
      data: { label: 'Capability Optimizer\nLearn & adapt routing' },
      style: { ...nodeStyle, minWidth: 160, background: '#ef4444' }
    }
  ],
  initialEdges: [
    // Input analysis
    {
      id: 'e-input-task',
      source: 'input',
      target: 'task-analyzer',
      style: edgeStyle
    },
    {
      id: 'e-input-monitor',
      source: 'input',
      target: 'resource-monitor',
      style: edgeStyle
    },
    {
      id: 'e-input-scanner',
      source: 'input',
      target: 'capability-scanner',
      style: edgeStyle
    },

    // Analysis to matcher
    {
      id: 'e-task-matcher',
      source: 'task-analyzer',
      target: 'capability-matcher',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },
    {
      id: 'e-monitor-matcher',
      source: 'resource-monitor',
      target: 'capability-matcher',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },
    {
      id: 'e-scanner-matcher',
      source: 'capability-scanner',
      target: 'capability-matcher',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },

    // Matcher to load balancer
    {
      id: 'e-matcher-balancer',
      source: 'capability-matcher',
      target: 'load-balancer',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },

    // Load balancer to nodes
    {
      id: 'e-balancer-cpu',
      source: 'load-balancer',
      target: 'cpu-intensive',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'CPU Tasks'
    },
    {
      id: 'e-balancer-memory',
      source: 'load-balancer',
      target: 'memory-optimized',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      label: 'Memory Tasks'
    },
    {
      id: 'e-balancer-gpu',
      source: 'load-balancer',
      target: 'gpu-accelerated',
      style: { ...edgeStyle, stroke: '#8b5cf6' },
      label: 'Parallel Tasks'
    },
    {
      id: 'e-balancer-specialized',
      source: 'load-balancer',
      target: 'specialized-node',
      style: { ...edgeStyle, stroke: '#ec4899' },
      label: 'Specialized Tasks'
    },

    // Nodes to engines
    {
      id: 'e-cpu-compute',
      source: 'cpu-intensive',
      target: 'compute-engine',
      style: { ...edgeStyle, stroke: '#10b981' }
    },
    {
      id: 'e-memory-engine',
      source: 'memory-optimized',
      target: 'memory-engine',
      style: { ...edgeStyle, stroke: '#3b82f6' }
    },
    {
      id: 'e-gpu-parallel',
      source: 'gpu-accelerated',
      target: 'parallel-engine',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },
    {
      id: 'e-specialized-custom',
      source: 'specialized-node',
      target: 'custom-engine',
      style: { ...edgeStyle, stroke: '#ec4899' }
    },

    // Engines to aggregator
    {
      id: 'e-compute-result',
      source: 'compute-engine',
      target: 'result-aggregator',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-memory-result',
      source: 'memory-engine',
      target: 'result-aggregator',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-parallel-result',
      source: 'parallel-engine',
      target: 'result-aggregator',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-custom-result',
      source: 'custom-engine',
      target: 'result-aggregator',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },

    // Supporting information
    {
      id: 'e-requirements-task',
      source: 'task-requirements',
      target: 'task-analyzer',
      style: { ...edgeStyle, stroke: '#8b5cf6', strokeDasharray: '3,3' }
    },
    {
      id: 'e-registry-scanner',
      source: 'capability-registry',
      target: 'capability-scanner',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-performance-balancer',
      source: 'performance-monitor',
      target: 'load-balancer',
      style: { ...edgeStyle, stroke: '#f97316', strokeDasharray: '3,3' }
    },
    {
      id: 'e-decisions-balancer',
      source: 'routing-decisions',
      target: 'load-balancer',
      style: { ...edgeStyle, stroke: '#f97316', strokeDasharray: '3,3' }
    },

    // Optimization feedback
    {
      id: 'e-optimizer-matcher',
      source: 'capability-optimizer',
      target: 'capability-matcher',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '8,8' },
      animated: true
    },
    {
      id: 'e-performance-optimizer',
      source: 'performance-monitor',
      target: 'capability-optimizer',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '5,5' }
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Task Request Ingestion',
      description: 'System receives a computational task requiring optimal resource allocation.',
      input: 'Task Request: "Train deep learning model on 10TB dataset with real-time inference requirements"',
      activeNodes: ['input'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Multi-Dimensional Analysis',
      description: 'Task is analyzed for requirements while system capabilities and resources are assessed.',
      input: 'Parallel analysis: Task requirements + Capability discovery + Resource monitoring',
      activeNodes: ['input', 'task-analyzer', 'capability-scanner', 'resource-monitor'],
      activeEdges: ['e-input-task', 'e-input-scanner', 'e-input-monitor']
    },
    {
      id: 'step3',
      title: 'Task Requirement Analysis',
      description: 'Analyze computational requirements, constraints, and performance goals.',
      input: 'Task analysis: resource needs, performance constraints, scalability requirements',
      activeNodes: ['task-analyzer', 'task-requirements'],
      activeEdges: ['e-requirements-task'],
      output: 'Task Requirements Analysis:\n• Compute intensity: Very High (ML training)\n• Memory requirements: 128GB+ RAM\n• Parallelization: High (GPU acceleration beneficial)\n• Storage I/O: High bandwidth needed\n• Latency: Training flexible, inference <100ms\n• Duration: Long-running (hours/days)'
    },
    {
      id: 'step4',
      title: 'Capability Discovery',
      description: 'Scan and catalog available system capabilities and specialized resources.',
      input: 'Capability scan: hardware inventory, software stack, specialized accelerators',
      activeNodes: ['capability-scanner', 'capability-registry'],
      activeEdges: ['e-registry-scanner'],
      output: 'Available Capabilities:\n• CPU Cluster: 128 cores, 512GB RAM\n• GPU Cluster: 8x NVIDIA V100, 32GB VRAM each\n• Storage: 10TB NVMe SSD, 100TB HDD\n• Network: 100Gbps InfiniBand\n• Specialized: TPU pods available\n• Current utilization: 60% average'
    },
    {
      id: 'step5',
      title: 'Resource Monitoring',
      description: 'Assess current resource utilization and availability.',
      input: 'Resource monitoring: current loads, available capacity, performance metrics',
      activeNodes: ['resource-monitor'],
      activeEdges: [],
      output: 'Resource Status:\n• CPU utilization: 65% (35% available)\n• GPU utilization: 40% (60% available) \n• Memory usage: 70% (30% available)\n• Storage I/O: 45% capacity\n• Network: 30% bandwidth utilized\n• Queue depth: 12 pending tasks'
    },
    {
      id: 'step6',
      title: 'Capability Matching',
      description: 'Match task requirements with available capabilities and constraints.',
      input: 'Capability matching: requirements vs. available resources',
      activeNodes: ['capability-matcher'],
      activeEdges: ['e-task-matcher', 'e-monitor-matcher', 'e-scanner-matcher'],
      output: 'Capability Match Analysis:\n• Best fit: GPU cluster for training phase\n• CPU cluster: Good for data preprocessing\n• Memory: Sufficient for batch processing\n• Storage: NVMe for training data, HDD for archives\n• Match confidence: 92%\n• Estimated performance: 85% of theoretical max'
    },
    {
      id: 'step7',
      title: 'Load Balancing Strategy',
      description: 'Determine optimal distribution across available capabilities.',
      input: 'Load balancing: distribute workload optimally across resources',
      activeNodes: ['load-balancer', 'performance-monitor', 'routing-decisions'],
      activeEdges: ['e-matcher-balancer', 'e-performance-balancer', 'e-decisions-balancer'],
      output: 'Load Balancing Decision:\n• Training: GPU cluster (8x V100) - 70% allocation\n• Preprocessing: CPU cluster - 20% allocation\n• Inference: Specialized TPU - 10% allocation\n• Storage strategy: Hot data on NVMe, cold on HDD\n• Failover: CPU cluster backup for GPU tasks'
    },
    {
      id: 'step8',
      title: 'GPU-Accelerated Processing',
      description: 'Route ML training tasks to GPU-accelerated nodes.',
      input: 'ML training workload → GPU cluster allocation',
      activeNodes: ['load-balancer', 'gpu-accelerated'],
      activeEdges: ['e-balancer-gpu'],
      output: 'GPU Cluster Activation:\n• Allocated: 6x V100 GPUs (2 reserved for failover)\n• Model: Distributed training across GPUs\n• Memory: 192GB VRAM total\n• Expected training time: 18 hours\n• Throughput: 1,200 samples/second'
    },
    {
      id: 'step9',
      title: 'Parallel Engine Execution',
      description: 'Execute training using parallel processing engines optimized for ML workloads.',
      input: 'Parallel processing: distributed ML training execution',
      activeNodes: ['gpu-accelerated', 'parallel-engine'],
      activeEdges: ['e-gpu-parallel'],
      output: 'Parallel Processing Results:\n• Training progress: 15% complete\n• GPU utilization: 98% across cluster\n• Memory efficiency: 92%\n• Gradient synchronization: 45ms latency\n• Model convergence: On track\n• Power consumption: 2.1kW'
    },
    {
      id: 'step10',
      title: 'Multi-Node Coordination',
      description: 'Show how different capability nodes handle different aspects of the workload.',
      input: 'Coordinated processing across specialized capability nodes',
      activeNodes: ['cpu-intensive', 'memory-optimized', 'specialized-node'],
      activeEdges: ['e-balancer-cpu', 'e-balancer-memory', 'e-balancer-specialized'],
      output: 'Multi-Node Processing:\n• CPU nodes: Data preprocessing and validation\n• Memory nodes: Large batch preparation and caching\n• Specialized nodes: Real-time inference serving\n• Coordination overhead: 3% of total compute\n• Load balancing efficiency: 94%'
    },
    {
      id: 'step11',
      title: 'Performance Optimization',
      description: 'Continuous monitoring and optimization of capability routing decisions.',
      input: 'Performance feedback → Routing optimization',
      activeNodes: ['performance-monitor', 'capability-optimizer'],
      activeEdges: ['e-performance-optimizer', 'e-optimizer-matcher'],
      output: 'Optimization Feedback:\n• GPU memory usage could be optimized (reduce by 15%)\n• CPU preprocessing bottleneck identified\n• Network bandwidth underutilized\n• Suggested: Increase batch size, add CPU nodes\n• Updated routing weights for similar future tasks'
    },
    {
      id: 'step12',
      title: 'Result Aggregation and Delivery',
      description: 'Combine outputs from all capability nodes into final result.',
      activeNodes: ['result-aggregator'],
      activeEdges: ['e-parallel-result', 'e-compute-result', 'e-memory-result', 'e-custom-result'],
      output: 'Final Results:\n\n**ML Model Training Complete**\n• Training accuracy: 94.2%\n• Validation accuracy: 91.8%\n• Training time: 16.5 hours (8.3% faster than estimated)\n• Resource utilization: GPU 96%, CPU 78%, Memory 85%\n• Power efficiency: 15% better than baseline\n• Model size: 2.3GB\n• Inference latency: 67ms (target: <100ms)\n\n**Capability Routing Performance:**\n• Routing accuracy: 94% optimal allocation\n• Resource waste: 6% (industry best: 5%)\n• Failover events: 0\n• Cost efficiency: $0.85 per GPU-hour\n\n*Processing optimized via Capability Routing with dynamic load balancing*'
    }
  ]
};