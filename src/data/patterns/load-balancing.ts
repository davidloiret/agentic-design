import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const loadBalancingPattern: PatternScenario = {
  id: 'load-balancing',
  title: 'Load Balancing Pattern',
  description: 'Demonstrates intelligent workload distribution across available processing resources based on real-time performance metrics and capacity',
  initialNodes: [
    // Input
    {
      id: 'input',
      type: 'default',
      position: { x: 500, y: 50 },
      data: { label: 'Incoming Requests\n"High-volume workload"' },
      style: { ...nodeStyle, minWidth: 200, background: '#dc2626' }
    },

    // Load balancer core
    {
      id: 'load-balancer',
      type: 'default',
      position: { x: 500, y: 200 },
      data: { label: 'Load Balancer\nDistribution Engine' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Monitoring systems
    {
      id: 'health-monitor',
      type: 'default',
      position: { x: 200, y: 200 },
      data: { label: 'Health Monitor\nSystem status tracking' },
      style: { ...nodeStyle, minWidth: 180, background: '#0d9488' }
    },

    {
      id: 'metrics-collector',
      type: 'default',
      position: { x: 800, y: 200 },
      data: { label: 'Metrics Collector\nPerformance analytics' },
      style: { ...nodeStyle, minWidth: 180, background: '#0369a1' }
    },

    // Request analyzer
    {
      id: 'request-analyzer',
      type: 'default',
      position: { x: 350, y: 350 },
      data: { label: 'Request Analyzer\nWorkload classification' },
      style: { ...nodeStyle, minWidth: 180, background: '#7c3aed' }
    },

    // Algorithm selector
    {
      id: 'algorithm-selector',
      type: 'default',
      position: { x: 650, y: 350 },
      data: { label: 'Algorithm Selector\nBalancing strategy' },
      style: { ...nodeStyle, minWidth: 180, background: '#db2777' }
    },

    // Processing servers
    {
      id: 'server-a',
      type: 'default',
      position: { x: 150, y: 500 },
      data: { label: 'Server A\nCPU: 45% | RAM: 60%\nTasks: 12' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981' }
    },
    {
      id: 'server-b',
      type: 'default',
      position: { x: 350, y: 500 },
      data: { label: 'Server B\nCPU: 78% | RAM: 85%\nTasks: 18' },
      style: { ...nodeStyle, minWidth: 160, background: '#f59e0b' }
    },
    {
      id: 'server-c',
      type: 'default',
      position: { x: 550, y: 500 },
      data: { label: 'Server C\nCPU: 23% | RAM: 40%\nTasks: 6' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981' }
    },
    {
      id: 'server-d',
      type: 'default',
      position: { x: 750, y: 500 },
      data: { label: 'Server D\nCPU: 67% | RAM: 72%\nTasks: 14' },
      style: { ...nodeStyle, minWidth: 160, background: '#f97316' }
    },

    // Processing queues
    {
      id: 'queue-a',
      type: 'default',
      position: { x: 150, y: 650 },
      data: { label: 'Queue A\n3 pending tasks' },
      style: { ...nodeStyle, minWidth: 140, background: '#6366f1', fontSize: '12px' }
    },
    {
      id: 'queue-b',
      type: 'default',
      position: { x: 350, y: 650 },
      data: { label: 'Queue B\n8 pending tasks' },
      style: { ...nodeStyle, minWidth: 140, background: '#6366f1', fontSize: '12px' }
    },
    {
      id: 'queue-c',
      type: 'default',
      position: { x: 550, y: 650 },
      data: { label: 'Queue C\n1 pending task' },
      style: { ...nodeStyle, minWidth: 140, background: '#6366f1', fontSize: '12px' }
    },
    {
      id: 'queue-d',
      type: 'default',
      position: { x: 750, y: 650 },
      data: { label: 'Queue D\n5 pending tasks' },
      style: { ...nodeStyle, minWidth: 140, background: '#6366f1', fontSize: '12px' }
    },

    // Algorithm options
    {
      id: 'round-robin',
      type: 'default',
      position: { x: 900, y: 350 },
      data: { label: 'Round Robin\nSequential distribution' },
      style: { ...nodeStyle, minWidth: 140, background: '#8b5cf6', fontSize: '11px' }
    },

    {
      id: 'least-connections',
      type: 'default',
      position: { x: 900, y: 420 },
      data: { label: 'Least Connections\nMinimize active tasks' },
      style: { ...nodeStyle, minWidth: 140, background: '#8b5cf6', fontSize: '11px' }
    },

    {
      id: 'weighted-round-robin',
      type: 'default',
      position: { x: 900, y: 490 },
      data: { label: 'Weighted Distribution\nCapacity-based routing' },
      style: { ...nodeStyle, minWidth: 140, background: '#8b5cf6', fontSize: '11px' }
    },

    // Performance metrics
    {
      id: 'performance-metrics',
      type: 'default',
      position: { x: 50, y: 350 },
      data: { label: 'Performance Metrics\n• Response time: 245ms\n• Throughput: 1,200 req/s\n• Error rate: 0.2%\n• Availability: 99.9%' },
      style: { ...nodeStyle, minWidth: 160, background: '#0369a1', fontSize: '11px' }
    },

    // Result aggregator
    {
      id: 'result-aggregator',
      type: 'default',
      position: { x: 450, y: 800 },
      data: { label: 'Result Aggregator\nResponse coordination' },
      style: { ...nodeStyle, minWidth: 180, background: '#059669' }
    },

    // Feedback system
    {
      id: 'feedback-system',
      type: 'default',
      position: { x: 50, y: 500 },
      data: { label: 'Feedback System\nAdaptive optimization' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc2626' }
    },

    // Auto-scaling
    {
      id: 'auto-scaler',
      type: 'default',
      position: { x: 900, y: 200 },
      data: { label: 'Auto Scaler\nDynamic capacity adjustment' },
      style: { ...nodeStyle, minWidth: 160, background: '#7c3aed' }
    }
  ],

  initialEdges: [
    // Input to load balancer
    {
      id: 'e-input-balancer',
      source: 'input',
      target: 'load-balancer',
      style: edgeStyle
    },

    // Monitoring to load balancer
    {
      id: 'e-health-balancer',
      source: 'health-monitor',
      target: 'load-balancer',
      style: { ...edgeStyle, stroke: '#0d9488' }
    },
    {
      id: 'e-metrics-balancer',
      source: 'metrics-collector',
      target: 'load-balancer',
      style: { ...edgeStyle, stroke: '#0369a1' }
    },

    // Load balancer to analyzers
    {
      id: 'e-balancer-analyzer',
      source: 'load-balancer',
      target: 'request-analyzer',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-balancer-selector',
      source: 'load-balancer',
      target: 'algorithm-selector',
      style: { ...edgeStyle, stroke: '#db2777' }
    },

    // Algorithm options
    {
      id: 'e-selector-roundrobin',
      source: 'algorithm-selector',
      target: 'round-robin',
      style: { ...edgeStyle, stroke: '#8b5cf6', strokeDasharray: '3,3' }
    },
    {
      id: 'e-selector-leastconn',
      source: 'algorithm-selector',
      target: 'least-connections',
      style: { ...edgeStyle, stroke: '#8b5cf6', strokeDasharray: '3,3' }
    },
    {
      id: 'e-selector-weighted',
      source: 'algorithm-selector',
      target: 'weighted-round-robin',
      style: { ...edgeStyle, stroke: '#8b5cf6', strokeDasharray: '3,3' }
    },

    // Load balancer to servers
    {
      id: 'e-balancer-server-a',
      source: 'load-balancer',
      target: 'server-a',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'Low Load'
    },
    {
      id: 'e-balancer-server-b',
      source: 'load-balancer',
      target: 'server-b',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      label: 'High Load'
    },
    {
      id: 'e-balancer-server-c',
      source: 'load-balancer',
      target: 'server-c',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'Optimal'
    },
    {
      id: 'e-balancer-server-d',
      source: 'load-balancer',
      target: 'server-d',
      style: { ...edgeStyle, stroke: '#f97316' },
      label: 'Medium Load'
    },

    // Servers to queues
    {
      id: 'e-server-a-queue',
      source: 'server-a',
      target: 'queue-a',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },
    {
      id: 'e-server-b-queue',
      source: 'server-b',
      target: 'queue-b',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },
    {
      id: 'e-server-c-queue',
      source: 'server-c',
      target: 'queue-c',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },
    {
      id: 'e-server-d-queue',
      source: 'server-d',
      target: 'queue-d',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },

    // Queues to aggregator
    {
      id: 'e-queue-a-result',
      source: 'queue-a',
      target: 'result-aggregator',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-queue-c-result',
      source: 'queue-c',
      target: 'result-aggregator',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Monitoring and feedback
    {
      id: 'e-performance-health',
      source: 'performance-metrics',
      target: 'health-monitor',
      style: { ...edgeStyle, stroke: '#0369a1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-feedback-balancer',
      source: 'feedback-system',
      target: 'load-balancer',
      style: { ...edgeStyle, stroke: '#dc2626', strokeDasharray: '8,8' },
      animated: true
    },

    // Auto-scaling
    {
      id: 'e-metrics-autoscaler',
      source: 'metrics-collector',
      target: 'auto-scaler',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    }
  ],

  steps: [
    {
      id: 'step1',
      title: 'Request Ingestion',
      description: 'High-volume requests arrive at the load balancer for distribution.',
      input: 'Incoming traffic: 1,500 concurrent requests requiring processing across distributed infrastructure.',
      activeNodes: ['input'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'System Health Assessment',
      description: 'Monitor current system health and resource availability.',
      input: 'Health monitoring: server status, resource utilization, queue depths',
      activeNodes: ['input', 'health-monitor', 'load-balancer'],
      activeEdges: ['e-input-balancer', 'e-health-balancer']
    },
    {
      id: 'step3',
      title: 'Performance Metrics Collection',
      description: 'Gather real-time performance data from all system components.',
      input: 'Metrics collection: response times, throughput, error rates, capacity utilization',
      activeNodes: ['metrics-collector', 'performance-metrics'],
      activeEdges: ['e-metrics-balancer', 'e-performance-health'],
      output: 'Current System Performance:\n• Average response time: 245ms\n• Throughput: 1,200 requests/second\n• Error rate: 0.2%\n• System availability: 99.9%\n• Peak capacity utilization: 78%'
    },
    {
      id: 'step4',
      title: 'Request Analysis',
      description: 'Analyze incoming requests to determine processing requirements.',
      input: 'Request classification: resource requirements, priority levels, processing complexity',
      activeNodes: ['request-analyzer'],
      activeEdges: ['e-balancer-analyzer'],
      output: 'Request Analysis Results:\n• High-priority requests: 15%\n• CPU-intensive tasks: 40%\n• Memory-intensive tasks: 25%\n• I/O-bound operations: 35%\n• Average processing time: 180ms\n• Resource requirements: Medium complexity'
    },
    {
      id: 'step5',
      title: 'Load Balancing Algorithm Selection',
      description: 'Choose optimal distribution strategy based on current conditions.',
      input: 'Algorithm selection: current load patterns, server capacities, performance goals',
      activeNodes: ['algorithm-selector', 'round-robin', 'least-connections', 'weighted-round-robin'],
      activeEdges: ['e-balancer-selector', 'e-selector-roundrobin', 'e-selector-leastconn', 'e-selector-weighted'],
      output: 'Algorithm Selection:\n• Current strategy: Weighted Round Robin\n• Reasoning: Uneven server capacities detected\n• Server A weight: 0.8 (moderate capacity)\n• Server B weight: 0.3 (high utilization)\n• Server C weight: 1.0 (optimal capacity)\n• Server D weight: 0.6 (medium utilization)\n• Dynamic adjustment: Enabled'
    },
    {
      id: 'step6',
      title: 'Server Capacity Assessment',
      description: 'Evaluate current load and capacity of all available servers.',
      input: 'Server assessment: CPU usage, memory consumption, active connections, queue status',
      activeNodes: ['server-a', 'server-b', 'server-c', 'server-d'],
      activeEdges: [],
      output: 'Server Capacity Report:\n**Server A**: CPU 45%, RAM 60%, 12 active tasks (Healthy)\n**Server B**: CPU 78%, RAM 85%, 18 active tasks (High Load)\n**Server C**: CPU 23%, RAM 40%, 6 active tasks (Optimal)\n**Server D**: CPU 67%, RAM 72%, 14 active tasks (Moderate Load)\n\nRecommendation: Route new requests primarily to Server C'
    },
    {
      id: 'step7',
      title: 'Intelligent Request Distribution',
      description: 'Distribute requests based on server capacity and selected algorithm.',
      input: 'Request routing: weighted distribution to optimize resource utilization',
      activeNodes: ['load-balancer', 'server-c'],
      activeEdges: ['e-balancer-server-c'],
      output: 'Distribution Decision:\n• Primary target: Server C (optimal capacity)\n• Distribution ratio: 40% to Server C, 25% to Server A, 10% to Server B, 25% to Server D\n• Expected response time: 165ms\n• Load balancing efficiency: 94%'
    },
    {
      id: 'step8',
      title: 'Queue Management',
      description: 'Manage processing queues to ensure smooth request handling.',
      input: 'Queue optimization: task prioritization, overflow handling, throughput maximization',
      activeNodes: ['queue-a', 'queue-b', 'queue-c', 'queue-d'],
      activeEdges: ['e-server-a-queue', 'e-server-b-queue', 'e-server-c-queue', 'e-server-d-queue'],
      output: 'Queue Status Update:\n• Queue A: 3 pending → 2 pending (processing)\n• Queue B: 8 pending → 8 pending (capacity limited)\n• Queue C: 1 pending → 3 pending (receiving new tasks)\n• Queue D: 5 pending → 4 pending (steady processing)\n• Average queue wait time: 45ms'
    },
    {
      id: 'step9',
      title: 'Processing and Result Aggregation',
      description: 'Process requests and aggregate results for response coordination.',
      input: 'Result processing: coordinate responses from distributed servers',
      activeNodes: ['queue-c', 'result-aggregator'],
      activeEdges: ['e-queue-c-result', 'e-queue-a-result'],
      output: 'Processing Results:\n• Successfully processed: 1,450 requests\n• Failed requests: 3 (0.2% error rate)\n• Average processing time: 172ms\n• Throughput achieved: 1,380 requests/second\n• Resource efficiency: 89%'
    },
    {
      id: 'step10',
      title: 'Performance Feedback Analysis',
      description: 'Analyze performance metrics to optimize future load balancing decisions.',
      input: 'Feedback analysis: performance trends, bottleneck identification, optimization opportunities',
      activeNodes: ['feedback-system'],
      activeEdges: ['e-feedback-balancer'],
      output: 'Performance Feedback:\n• Server B approaching capacity limit (recommendation: reduce allocation)\n• Server C performing optimally (recommendation: increase allocation)\n• Network latency slightly elevated (investigation needed)\n• Overall system efficiency: 91% (target: 90%+)\n• Optimization applied: Updated server weights'
    },
    {
      id: 'step11',
      title: 'Auto-Scaling Assessment',
      description: 'Evaluate need for dynamic capacity adjustment based on load patterns.',
      input: 'Scaling analysis: traffic trends, resource utilization patterns, capacity planning',
      activeNodes: ['auto-scaler'],
      activeEdges: ['e-metrics-autoscaler'],
      output: 'Auto-Scaling Decision:\n• Current capacity utilization: 78%\n• Traffic trend: +15% over last hour\n• Scaling threshold: 80% (approaching)\n• Recommendation: Prepare additional server instance\n• Estimated time to scale: 3 minutes\n• Cost impact: +$0.15/hour'
    },
    {
      id: 'step12',
      title: 'System Optimization and Reporting',
      description: 'Complete load balancing cycle with system optimization and performance reporting.',
      activeNodes: ['result-aggregator', 'performance-metrics'],
      activeEdges: [],
      output: 'Load Balancing Complete:\n\n**Performance Summary:**\n• Total requests processed: 1,447\n• Average response time: 168ms (target: <200ms) ✓\n• Throughput: 1,380 req/s (target: >1,200) ✓\n• Error rate: 0.2% (target: <0.5%) ✓\n• System availability: 99.9%\n\n**Resource Utilization:**\n• Server A: 52% utilization (+7%)\n• Server B: 78% utilization (stable)\n• Server C: 35% utilization (+12%)\n• Server D: 71% utilization (+4%)\n\n**Optimizations Applied:**\n• Weighted distribution algorithm selected\n• Server allocation ratios adjusted\n• Queue management optimized\n• Auto-scaling prepared for traffic growth\n\n**Cost Efficiency:** $0.08 per 1,000 requests (15% improvement)\n\n*Load balancing achieved 94% distribution efficiency with optimal resource utilization*'
    }
  ]
};