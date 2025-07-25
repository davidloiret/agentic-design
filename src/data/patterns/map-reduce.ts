import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const mapReducePattern: PatternScenario = {
  id: 'map-reduce',
  title: 'Map-Reduce Pattern',
  description: 'Demonstrates distributed computation using map and reduce operations for processing large datasets across multiple nodes',
  initialNodes: [
    // Input data
    {
      id: 'input-data',
      type: 'default',
      position: { x: 500, y: 50 },
      data: { label: 'Large Dataset\n"100TB log files"' },
      style: { ...nodeStyle, minWidth: 200, background: '#dc2626' }
    },

    // Job coordinator
    {
      id: 'job-coordinator',
      type: 'default',
      position: { x: 500, y: 180 },
      data: { label: 'Job Coordinator\nTask orchestration' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Data partitioner
    {
      id: 'data-partitioner',
      type: 'default',
      position: { x: 300, y: 320 },
      data: { label: 'Data Partitioner\nSplit into chunks' },
      style: { ...nodeStyle, minWidth: 180, background: '#0369a1' }
    },

    // Task scheduler
    {
      id: 'task-scheduler',
      type: 'default',
      position: { x: 700, y: 320 },
      data: { label: 'Task Scheduler\nDistribute workload' },
      style: { ...nodeStyle, minWidth: 180, background: '#7c3aed' }
    },

    // Data chunks
    {
      id: 'chunk-1',
      type: 'default',
      position: { x: 100, y: 460 },
      data: { label: 'Chunk 1\n25TB data' },
      style: { ...nodeStyle, minWidth: 120, background: '#3b82f6', fontSize: '12px' }
    },
    {
      id: 'chunk-2',
      type: 'default',
      position: { x: 250, y: 460 },
      data: { label: 'Chunk 2\n25TB data' },
      style: { ...nodeStyle, minWidth: 120, background: '#3b82f6', fontSize: '12px' }
    },
    {
      id: 'chunk-3',
      type: 'default',
      position: { x: 400, y: 460 },
      data: { label: 'Chunk 3\n25TB data' },
      style: { ...nodeStyle, minWidth: 120, background: '#3b82f6', fontSize: '12px' }
    },
    {
      id: 'chunk-4',
      type: 'default',
      position: { x: 550, y: 460 },
      data: { label: 'Chunk 4\n25TB data' },
      style: { ...nodeStyle, minWidth: 120, background: '#3b82f6', fontSize: '12px' }
    },

    // Map workers
    {
      id: 'map-worker-1',
      type: 'default',
      position: { x: 100, y: 600 },
      data: { label: 'Map Worker 1\nProcess & transform' },
      style: { ...nodeStyle, minWidth: 140, background: '#f59e0b' }
    },
    {
      id: 'map-worker-2',
      type: 'default',
      position: { x: 250, y: 600 },
      data: { label: 'Map Worker 2\nProcess & transform' },
      style: { ...nodeStyle, minWidth: 140, background: '#f59e0b' }
    },
    {
      id: 'map-worker-3',
      type: 'default',
      position: { x: 400, y: 600 },
      data: { label: 'Map Worker 3\nProcess & transform' },
      style: { ...nodeStyle, minWidth: 140, background: '#f59e0b' }
    },
    {
      id: 'map-worker-4',
      type: 'default',
      position: { x: 550, y: 600 },
      data: { label: 'Map Worker 4\nProcess & transform' },
      style: { ...nodeStyle, minWidth: 140, background: '#f59e0b' }
    },

    // Intermediate storage
    {
      id: 'intermediate-storage',
      type: 'default',
      position: { x: 325, y: 750 },
      data: { label: 'Intermediate Storage\nSorted key-value pairs' },
      style: { ...nodeStyle, minWidth: 200, background: '#6366f1' }
    },

    // Shuffle & Sort
    {
      id: 'shuffle-sort',
      type: 'default',
      position: { x: 325, y: 900 },
      data: { label: 'Shuffle & Sort\nGroup by key' },
      style: { ...nodeStyle, minWidth: 180, background: '#8b5cf6' }
    },

    // Reduce workers
    {
      id: 'reduce-worker-1',
      type: 'default',
      position: { x: 150, y: 1050 },
      data: { label: 'Reduce Worker 1\nAggregate results' },
      style: { ...nodeStyle, minWidth: 140, background: '#10b981' }
    },
    {
      id: 'reduce-worker-2',
      type: 'default',
      position: { x: 325, y: 1050 },
      data: { label: 'Reduce Worker 2\nAggregate results' },
      style: { ...nodeStyle, minWidth: 140, background: '#10b981' }
    },
    {
      id: 'reduce-worker-3',
      type: 'default',
      position: { x: 500, y: 1050 },
      data: { label: 'Reduce Worker 3\nAggregate results' },
      style: { ...nodeStyle, minWidth: 140, background: '#10b981' }
    },

    // Final output
    {
      id: 'final-output',
      type: 'default',
      position: { x: 325, y: 1200 },
      data: { label: 'Final Output\nAggregated results' },
      style: { ...nodeStyle, minWidth: 180, background: '#059669' }
    },

    // Supporting systems
    {
      id: 'resource-manager',
      type: 'default',
      position: { x: 750, y: 180 },
      data: { label: 'Resource Manager\nCluster resources' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc2777' }
    },

    {
      id: 'fault-tolerance',
      type: 'default',
      position: { x: 250, y: 180 },
      data: { label: 'Fault Tolerance\nFailure handling' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc7b16' }
    },

    // Monitoring
    {
      id: 'progress-monitor',
      type: 'default',
      position: { x: 850, y: 320 },
      data: { label: 'Progress Monitor\nTask tracking' },
      style: { ...nodeStyle, minWidth: 160, background: '#7c3aed' }
    },

    // Performance metrics
    {
      id: 'performance-metrics',
      type: 'default',
      position: { x: 50, y: 320 },
      data: { label: 'Performance Metrics\n• Throughput: 2TB/hour\n• Latency: 45 minutes\n• Efficiency: 94%\n• Node utilization: 89%' },
      style: { ...nodeStyle, minWidth: 160, background: '#0369a1', fontSize: '11px' }
    },

    // Data locality optimizer
    {
      id: 'data-locality',
      type: 'default',
      position: { x: 750, y: 460 },
      data: { label: 'Data Locality\nOptimize placement' },
      style: { ...nodeStyle, minWidth: 140, background: '#db2777' }
    },

    // Map output details
    {
      id: 'map-output-1',
      type: 'default',
      position: { x: 700, y: 600 },
      data: { label: 'Map Outputs\n• Key-value pairs\n• Partial results\n• Intermediate data\n• Sort by key' },
      style: { ...nodeStyle, minWidth: 140, background: '#f59e0b', fontSize: '11px' }
    },

    // Combiner (optional)
    {
      id: 'combiner',
      type: 'default',
      position: { x: 550, y: 750 },
      data: { label: 'Combiner\nLocal aggregation' },
      style: { ...nodeStyle, minWidth: 140, background: '#ec4899' }
    },

    // Load balancer
    {
      id: 'load-balancer',
      type: 'default',
      position: { x: 850, y: 600 },
      data: { label: 'Load Balancer\nDistribute load evenly' },
      style: { ...nodeStyle, minWidth: 140, background: '#059669' }
    },

    // Result aggregator
    {
      id: 'result-validator',
      type: 'default',
      position: { x: 500, y: 1200 },
      data: { label: 'Result Validator\nVerify completeness' },
      style: { ...nodeStyle, minWidth: 140, background: '#059669' }
    }
  ],

  initialEdges: [
    // Input to coordinator
    {
      id: 'e-input-coordinator',
      source: 'input-data',
      target: 'job-coordinator',
      style: edgeStyle
    },

    // Coordinator to subsystems
    {
      id: 'e-coordinator-partitioner',
      source: 'job-coordinator',
      target: 'data-partitioner',
      style: { ...edgeStyle, stroke: '#0369a1' }
    },
    {
      id: 'e-coordinator-scheduler',
      source: 'job-coordinator',
      target: 'task-scheduler',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },

    // Supporting systems
    {
      id: 'e-coordinator-resource',
      source: 'job-coordinator',
      target: 'resource-manager',
      style: { ...edgeStyle, stroke: '#dc2777' }
    },
    {
      id: 'e-coordinator-fault',
      source: 'job-coordinator',
      target: 'fault-tolerance',
      style: { ...edgeStyle, stroke: '#dc7b16' }
    },

    // Data partitioning
    {
      id: 'e-partitioner-chunk1',
      source: 'data-partitioner',
      target: 'chunk-1',
      style: { ...edgeStyle, stroke: '#3b82f6' }
    },
    {
      id: 'e-partitioner-chunk2',
      source: 'data-partitioner',
      target: 'chunk-2',
      style: { ...edgeStyle, stroke: '#3b82f6' }
    },
    {
      id: 'e-partitioner-chunk3',
      source: 'data-partitioner',
      target: 'chunk-3',
      style: { ...edgeStyle, stroke: '#3b82f6' }
    },
    {
      id: 'e-partitioner-chunk4',
      source: 'data-partitioner',
      target: 'chunk-4',
      style: { ...edgeStyle, stroke: '#3b82f6' }
    },

    // Task scheduling to map workers
    {
      id: 'e-scheduler-map1',
      source: 'task-scheduler',
      target: 'map-worker-1',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },
    {
      id: 'e-scheduler-map2',
      source: 'task-scheduler',
      target: 'map-worker-2',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },
    {
      id: 'e-scheduler-map3',
      source: 'task-scheduler',
      target: 'map-worker-3',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },
    {
      id: 'e-scheduler-map4',
      source: 'task-scheduler',
      target: 'map-worker-4',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },

    // Chunks to map workers
    {
      id: 'e-chunk1-map1',
      source: 'chunk-1',
      target: 'map-worker-1',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },
    {
      id: 'e-chunk2-map2',
      source: 'chunk-2',
      target: 'map-worker-2',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },
    {
      id: 'e-chunk3-map3',
      source: 'chunk-3',
      target: 'map-worker-3',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },
    {
      id: 'e-chunk4-map4',
      source: 'chunk-4',
      target: 'map-worker-4',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },

    // Map workers to intermediate storage
    {
      id: 'e-map1-intermediate',
      source: 'map-worker-1',
      target: 'intermediate-storage',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },
    {
      id: 'e-map2-intermediate',
      source: 'map-worker-2',
      target: 'intermediate-storage',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },
    {
      id: 'e-map3-intermediate',
      source: 'map-worker-3',
      target: 'intermediate-storage',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },
    {
      id: 'e-map4-intermediate',
      source: 'map-worker-4',
      target: 'intermediate-storage',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },

    // Combiner optimization
    {
      id: 'e-map3-combiner',
      source: 'map-worker-3',
      target: 'combiner',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '3,3' }
    },
    {
      id: 'e-combiner-intermediate',
      source: 'combiner',
      target: 'intermediate-storage',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '3,3' }
    },

    // Intermediate to shuffle
    {
      id: 'e-intermediate-shuffle',
      source: 'intermediate-storage',
      target: 'shuffle-sort',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },

    // Shuffle to reduce workers
    {
      id: 'e-shuffle-reduce1',
      source: 'shuffle-sort',
      target: 'reduce-worker-1',
      style: { ...edgeStyle, stroke: '#10b981' }
    },
    {
      id: 'e-shuffle-reduce2',
      source: 'shuffle-sort',
      target: 'reduce-worker-2',
      style: { ...edgeStyle, stroke: '#10b981' }
    },
    {
      id: 'e-shuffle-reduce3',
      source: 'shuffle-sort',
      target: 'reduce-worker-3',
      style: { ...edgeStyle, stroke: '#10b981' }
    },

    // Reduce workers to output
    {
      id: 'e-reduce1-output',
      source: 'reduce-worker-1',
      target: 'final-output',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-reduce2-output',
      source: 'reduce-worker-2',
      target: 'final-output',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-reduce3-output',
      source: 'reduce-worker-3',
      target: 'final-output',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Validation
    {
      id: 'e-output-validator',
      source: 'final-output',
      target: 'result-validator',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Supporting connections
    {
      id: 'e-metrics-partitioner',
      source: 'performance-metrics',
      target: 'data-partitioner',
      style: { ...edgeStyle, stroke: '#0369a1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-monitor-scheduler',
      source: 'progress-monitor',
      target: 'task-scheduler',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '3,3' }
    },
    {
      id: 'e-locality-chunks',
      source: 'data-locality',
      target: 'chunk-4',
      style: { ...edgeStyle, stroke: '#db2777', strokeDasharray: '5,5' }
    },
    {
      id: 'e-balancer-maps',
      source: 'load-balancer',
      target: 'map-worker-4',
      style: { ...edgeStyle, stroke: '#059669', strokeDasharray: '5,5' }
    },
    {
      id: 'e-maps-output',
      source: 'map-worker-4',
      target: 'map-output-1',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '3,3' }
    }
  ],

  steps: [
    {
      id: 'step1',
      title: 'Job Initialization',
      description: 'Large dataset processing job is submitted to the MapReduce system.',
      input: 'Job submission: Process 100TB of web server logs to extract user behavior patterns.',
      activeNodes: ['input-data'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Job Coordination Setup',
      description: 'Job coordinator initializes the MapReduce workflow and prepares resources.',
      input: 'Job coordination: resource allocation, task planning, fault tolerance setup',
      activeNodes: ['input-data', 'job-coordinator'],
      activeEdges: ['e-input-coordinator']
    },
    {
      id: 'step3',
      title: 'Resource Management',
      description: 'Resource manager allocates cluster resources and fault tolerance systems are activated.',
      input: 'Resource management: cluster capacity assessment, node health checks, backup strategies',
      activeNodes: ['job-coordinator', 'resource-manager', 'fault-tolerance'],
      activeEdges: ['e-coordinator-resource', 'e-coordinator-fault'],
      output: 'Resource Allocation:\n• Available cluster nodes: 16 (all healthy)\n• Total CPU cores: 512\n• Total RAM: 2TB\n• Available storage: 500TB\n• Network bandwidth: 10Gbps\n• Fault tolerance: 3-way replication enabled\n• Estimated job duration: 2.5 hours'
    },
    {
      id: 'step4',
      title: 'Data Partitioning',
      description: 'Large dataset is partitioned into smaller, manageable chunks for parallel processing.',
      input: 'Data partitioning: split 100TB dataset into optimal chunk sizes for distributed processing',
      activeNodes: ['data-partitioner', 'performance-metrics'],
      activeEdges: ['e-coordinator-partitioner', 'e-metrics-partitioner'],
      output: 'Data Partitioning Results:\n• Total data size: 100TB\n• Partition strategy: Size-based splitting\n• Chunk size: 25TB each (optimal for cluster)\n• Number of partitions: 4\n• Partition boundaries: Aligned with file blocks\n• Data distribution: Even across all nodes\n• Metadata overhead: 0.1% of total size\n• Estimated I/O time: 15 minutes per chunk'
    },
    {
      id: 'step5',
      title: 'Task Scheduling',
      description: 'Task scheduler distributes map tasks across available worker nodes.',
      input: 'Task scheduling: assign map tasks to worker nodes based on data locality and resource availability',
      activeNodes: ['task-scheduler', 'progress-monitor'],
      activeEdges: ['e-coordinator-scheduler', 'e-monitor-scheduler'],
      output: 'Task Scheduling Plan:\n• Total map tasks: 4 (one per data chunk)\n• Worker node assignment:\n  - Node cluster-01: Map task 1 (Chunk 1)\n  - Node cluster-02: Map task 2 (Chunk 2)\n  - Node cluster-03: Map task 3 (Chunk 3)\n  - Node cluster-04: Map task 4 (Chunk 4)\n• Data locality achieved: 95%\n• Load balancing efficiency: 92%\n• Estimated parallel execution time: 90 minutes'
    },
    {
      id: 'step6',
      title: 'Data Chunk Distribution',
      description: 'Data chunks are distributed to their assigned processing nodes.',
      input: 'Data distribution: transfer chunks to assigned worker nodes with locality optimization',
      activeNodes: ['chunk-1', 'chunk-2', 'chunk-3', 'chunk-4', 'data-locality'],
      activeEdges: ['e-partitioner-chunk1', 'e-partitioner-chunk2', 'e-partitioner-chunk3', 'e-partitioner-chunk4', 'e-locality-chunks'],
      output: 'Data Distribution Status:\n• Chunk 1 (25TB): Transferred to cluster-01 ✓\n• Chunk 2 (25TB): Transferred to cluster-02 ✓\n• Chunk 3 (25TB): Transferred to cluster-03 ✓\n• Chunk 4 (25TB): Transferred to cluster-04 ✓\n• Transfer rate: 8GB/s average\n• Data locality: 95% local, 5% remote\n• Compression ratio: 3:1 (effective size: 33TB)\n• Integrity verification: All chunks validated'
    },
    {
      id: 'step7',
      title: 'Map Phase Execution',
      description: 'Map workers process their assigned data chunks in parallel.',
      input: 'Map processing: extract key-value pairs from web server logs (IP addresses, user agents, timestamps)',
      activeNodes: ['map-worker-1', 'map-worker-2', 'map-worker-3', 'map-worker-4', 'load-balancer'],
      activeEdges: ['e-scheduler-map1', 'e-scheduler-map2', 'e-scheduler-map3', 'e-scheduler-map4', 'e-chunk1-map1', 'e-chunk2-map2', 'e-chunk3-map3', 'e-chunk4-map4', 'e-balancer-maps'],
      output: 'Map Phase Progress:\n• **Map Worker 1**: Processing 4.2M log entries\n  - Key-value pairs generated: 847K\n  - Progress: 78% complete\n  - Throughput: 12K records/second\n• **Map Worker 2**: Processing 4.1M log entries\n  - Key-value pairs generated: 823K\n  - Progress: 82% complete\n  - Throughput: 11.8K records/second\n• **Map Worker 3**: Processing 4.3M log entries\n  - Key-value pairs generated: 891K\n  - Progress: 75% complete\n  - Throughput: 12.3K records/second\n• **Map Worker 4**: Processing 4.0M log entries\n  - Key-value pairs generated: 801K\n  - Progress: 85% complete\n  - Throughput: 11.5K records/second'
    },
    {
      id: 'step8',
      title: 'Map Output Generation',
      description: 'Map workers generate intermediate key-value pairs with optional local aggregation.',
      input: 'Map output: key-value pairs with local combining and sorting for efficient reduce phase',
      activeNodes: ['map-output-1', 'combiner'],
      activeEdges: ['e-maps-output', 'e-map3-combiner'],
      output: 'Map Output Summary:\n• **Total intermediate records**: 3.2M key-value pairs\n• **Key types**: IP addresses, user agents, request paths\n• **Value types**: Timestamps, response codes, byte sizes\n• **Local aggregation**: 15% reduction via combiners\n• **Sorting**: Keys sorted lexicographically\n• **Partitioning**: Hash-based for reduce distribution\n• **Compression**: 40% size reduction with LZ4\n• **Output format**: Binary sequence files for efficiency'
    },
    {
      id: 'step9',
      title: 'Intermediate Storage',
      description: 'Map outputs are stored in intermediate storage with fault tolerance.',
      input: 'Intermediate storage: persistent storage of map outputs with replication and checksums',
      activeNodes: ['intermediate-storage'],
      activeEdges: ['e-map1-intermediate', 'e-map2-intermediate', 'e-map3-intermediate', 'e-map4-intermediate', 'e-combiner-intermediate'],
      output: 'Intermediate Storage Status:\n• **Total storage used**: 28TB (after compression)\n• **File format**: Sequence files with block compression\n• **Replication factor**: 3x for fault tolerance\n• **Checksum verification**: MD5 hashes validated\n• **Storage distribution**: Across 12 data nodes\n• **Access pattern**: Optimized for sequential reads\n• **Retention policy**: Auto-cleanup after job completion\n• **Performance**: 95% cache hit ratio for local reads'
    },
    {
      id: 'step10',
      title: 'Shuffle and Sort Phase',
      description: 'Intermediate data is shuffled and sorted by key for the reduce phase.',
      input: 'Shuffle & sort: redistribute data by key and sort for efficient reduce processing',
      activeNodes: ['shuffle-sort'],
      activeEdges: ['e-intermediate-shuffle'],
      output: 'Shuffle & Sort Results:\n• **Data redistribution**: Keys regrouped across reduce nodes\n• **Network traffic**: 28TB transferred (optimized routing)\n• **Sort algorithm**: External merge sort for large datasets\n• **Key grouping**: 847K unique keys identified\n• **Partition strategy**: Hash-based with load balancing\n• **Buffer management**: 2GB sort buffers per node\n• **Spill handling**: 3 spill files merged per partition\n• **Network utilization**: 85% of available bandwidth'
    },
    {
      id: 'step11',
      title: 'Reduce Phase Execution',
      description: 'Reduce workers aggregate values for each key to produce final results.',
      input: 'Reduce processing: aggregate user behavior data, calculate statistics, generate insights',
      activeNodes: ['reduce-worker-1', 'reduce-worker-2', 'reduce-worker-3'],
      activeEdges: ['e-shuffle-reduce1', 'e-shuffle-reduce2', 'e-shuffle-reduce3'],
      output: 'Reduce Phase Progress:\n• **Reduce Worker 1**: Processing keys A-H\n  - Keys processed: 245K of 282K\n  - Output records: 18K aggregated results\n  - Progress: 87% complete\n  - Memory usage: 3.2GB of 8GB allocated\n• **Reduce Worker 2**: Processing keys I-P\n  - Keys processed: 289K of 301K\n  - Output records: 21K aggregated results\n  - Progress: 96% complete\n  - Memory usage: 3.8GB of 8GB allocated\n• **Reduce Worker 3**: Processing keys Q-Z\n  - Keys processed: 198K of 264K\n  - Output records: 15K aggregated results\n  - Progress: 75% complete\n  - Memory usage: 2.9GB of 8GB allocated'
    },
    {
      id: 'step12',
      title: 'Result Aggregation and Validation',
      description: 'Final outputs are collected, validated, and stored for delivery.',
      activeNodes: ['final-output', 'result-validator'],
      activeEdges: ['e-reduce1-output', 'e-reduce2-output', 'e-reduce3-output', 'e-output-validator'],
      output: 'MapReduce Job Complete:\n\n**Final Results:**\n• **Total processing time**: 2.1 hours (16% faster than estimated)\n• **Data processed**: 100TB input → 2.3GB output\n• **Compression ratio**: 43,478:1 (excellent aggregation)\n• **Key insights generated**: 54,000 unique user behavior patterns\n• **Record accuracy**: 99.97% (validated against sample)\n\n**Performance Metrics:**\n• **Map phase**: 78 minutes (4 workers parallel)\n• **Shuffle & sort**: 23 minutes (network optimized)\n• **Reduce phase**: 19 minutes (3 workers parallel)\n• **Total throughput**: 47.6TB/hour\n• **CPU utilization**: 91% average across cluster\n• **Memory efficiency**: 89% peak usage\n• **Network utilization**: 78% of available bandwidth\n\n**Resource Efficiency:**\n• **Node failures**: 0 (fault tolerance not triggered)\n• **Task retries**: 2 (automatic recovery)\n• **Data locality**: 95% (minimal network transfer)\n• **Storage efficiency**: 67% via compression\n• **Cost per TB processed**: $0.23 (15% below target)\n\n**Business Value:**\n• **User segments identified**: 12 distinct behavior patterns\n• **Peak traffic hours**: 2-4 PM and 8-10 PM\n• **Top user agents**: Mobile 67%, Desktop 33%\n• **Geographic distribution**: Analyzed across 45 countries\n\n*MapReduce achieved 94% processing efficiency with optimal resource utilization*'
    }
  ]
};