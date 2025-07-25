import { Technique } from './types';

export const parallelizationTechniques: Technique[] = [
  {
    id: 'map-reduce',
    name: 'Map-Reduce',
    abbr: '',
    icon: '🗺️',
    color: 'from-yellow-500 to-orange-500',
    category: 'parallelization',
    description: 'Distributes computation across multiple nodes using map and reduce operations',
    features: [
      'Parallel data processing',
      'Fault-tolerant execution',
      'Scalable architecture',
      'Result aggregation'
    ],
    useCases: ['big-data-processing', 'distributed-computing', 'batch-processing', 'analytics'],
    complexity: 'high',
    example: 'Task: Count word frequency in large document corpus\n\nMap Phase:\n• Node A: Process docs 1-1000 → word counts\n• Node B: Process docs 1001-2000 → word counts\n• Node C: Process docs 2001-3000 → word counts\n\nReduce Phase:\n• Aggregate all word counts\n• Output: Final word frequency distribution'
  },
  {
    id: 'scatter-gather',
    name: 'Scatter-Gather',
    abbr: '',
    icon: '📡',
    color: 'from-orange-500 to-red-500',
    category: 'parallelization',
    description: 'Distributes requests to multiple services and collects responses',
    features: [
      'Request distribution',  
      'Response aggregation',
      'Timeout management',
      'Partial result handling'
    ],
    useCases: ['microservices', 'api-orchestration', 'data-federation', 'search-engines'],
    complexity: 'medium',
    example: 'Product Search Request:\n\nScatter:\n• Send query to Inventory Service\n• Send query to Pricing Service\n• Send query to Review Service\n• Send query to Recommendation Service\n\nGather:\n• Collect all responses (timeout: 500ms)\n• Merge product data with prices and reviews\n• Return comprehensive product information'
  },
  {
    id: 'fork-join',
    name: 'Fork-Join',  
    abbr: '',
    icon: '🍴',
    color: 'from-red-500 to-pink-500',
    category: 'parallelization',
    description: 'Forks tasks into parallel subtasks and joins results when complete',
    features: [
      'Task decomposition',
      'Parallel execution',
      'Synchronization points',
      'Result combination'
    ],
    useCases: ['recursive-algorithms', 'divide-conquer', 'parallel-processing', 'optimization'],
    complexity: 'high',
    example: 'Parallel Merge Sort:\n\nFork:\n• Split array [8,3,5,1,7,6,2,4] into halves\n• Left: [8,3,5,1] → Fork again\n• Right: [7,6,2,4] → Fork again\n• Continue until single elements\n\nJoin:\n• Merge sorted subarrays\n• [3,8] + [1,5] → [1,3,5,8]\n• [2,7] + [4,6] → [2,4,6,7]\n• Final: [1,2,3,4,5,6,7,8]'
  },
  {
    id: 'async-await',
    name: 'Async-Await',
    abbr: '',
    icon: '⏳',
    color: 'from-pink-500 to-purple-500',
    category: 'parallelization',
    description: 'Non-blocking asynchronous execution with promise-based coordination',
    features: [
      'Non-blocking operations',
      'Promise-based coordination',
      'Error handling',
      'Resource efficiency'
    ],
    useCases: ['web-services', 'io-operations', 'concurrent-requests', 'responsive-ui'],
    complexity: 'medium',
    example: 'Concurrent API Calls:\n\n```javascript\nasync function fetchUserData(userId) {\n  const [profile, orders, preferences] = await Promise.all([\n    fetchProfile(userId),\n    fetchOrders(userId),\n    fetchPreferences(userId)\n  ]);\n  \n  return { profile, orders, preferences };\n}\n```\n\nAll three requests execute concurrently, reducing total time'
  }
]; 