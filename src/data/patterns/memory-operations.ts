import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const memoryOperationsPattern: PatternScenario = {
  id: 'memory-reading-writing-operations',
  title: 'Memory Reading/Writing Operations',
  initialNodes: [
    {
      id: 'agent-request',
      position: { x: 400, y: 50 },
      data: { label: '🤖 Agent Memory Request\n"Store experience + Retrieve similar cases"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 380 },
    },
    // Memory Controller
    {
      id: 'memory-controller',
      position: { x: 375, y: 150 },
      data: { label: '🎛️ Memory Controller\nOrchestrates R/W operations' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 250 },
    },
    // Memory Access Patterns
    {
      id: 'recency-manager',
      position: { x: 100, y: 250 },
      data: { label: '🕐 Recency Manager\nTemporal ordering\nLRU/MRU tracking' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'relevance-scorer',
      position: { x: 300, y: 250 },
      data: { label: '🎯 Relevance Scorer\nSemantic similarity\nContext matching' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'importance-evaluator',
      position: { x: 500, y: 250 },
      data: { label: '⭐ Importance Evaluator\nCriticality assessment\nImpact scoring' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'access-optimizer',
      position: { x: 700, y: 250 },
      data: { label: '⚡ Access Optimizer\nCaching strategy\nPrefetching logic' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    // Write Operations
    {
      id: 'write-request',
      position: { x: 50, y: 380 },
      data: { label: '✍️ Write Request\nNew experience data' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'data-validation',
      position: { x: 220, y: 380 },
      data: { label: '✅ Data Validation\nSchema check\nIntegrity verify' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'encoding-processor',
      position: { x: 390, y: 380 },
      data: { label: '🔐 Encoding\nVector embedding\nCompression' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'index-update',
      position: { x: 560, y: 380 },
      data: { label: '📇 Index Update\nMetadata tagging\nSearch indices' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'storage-commit',
      position: { x: 730, y: 380 },
      data: { label: '💾 Storage Commit\nPersistent write\nReplication' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    // Read Operations
    {
      id: 'read-request',
      position: { x: 50, y: 520 },
      data: { label: '📖 Read Request\n"Similar shipping issues"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'query-parsing',
      position: { x: 220, y: 520 },
      data: { label: '🔍 Query Parsing\nIntent extraction\nFilter criteria' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'memory-search',
      position: { x: 390, y: 520 },
      data: { label: '🔎 Memory Search\nVector similarity\nKeyword match' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'ranking-filter',
      position: { x: 560, y: 520 },
      data: { label: '📊 Ranking & Filter\nScore threshold\nTop-K selection' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'retrieval-output',
      position: { x: 730, y: 520 },
      data: { label: '📤 Retrieval Output\nFormatted results\nMetadata included' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    // Memory Stores
    {
      id: 'hot-cache',
      position: { x: 100, y: 640 },
      data: { label: '🔥 Hot Cache\nFrequent access\n< 100ms latency' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'warm-storage',
      position: { x: 280, y: 640 },
      data: { label: '♨️ Warm Storage\nRecent memories\n< 1s latency' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'cold-archive',
      position: { x: 460, y: 640 },
      data: { label: '❄️ Cold Archive\nHistorical data\n< 10s latency' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'vector-db',
      position: { x: 640, y: 640 },
      data: { label: '🗄️ Vector DB\nEmbedding store\nSimilarity search' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    // Access Control
    {
      id: 'permission-check',
      position: { x: 100, y: 760 },
      data: { label: '🔒 Permission Check\nAgent authorization' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'rate-limiter',
      position: { x: 280, y: 760 },
      data: { label: '🚦 Rate Limiter\nThrottle control' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'concurrency-control',
      position: { x: 460, y: 760 },
      data: { label: '🔄 Concurrency Control\nLock management' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'audit-logging',
      position: { x: 640, y: 760 },
      data: { label: '📝 Audit Logging\nAccess tracking' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    // Optimization Strategies
    {
      id: 'adaptive-caching',
      position: { x: 150, y: 880 },
      data: { label: '🎯 Adaptive Caching\nDynamic cache sizing' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'predictive-prefetch',
      position: { x: 350, y: 880 },
      data: { label: '🔮 Predictive Prefetch\nAnticipatory loading' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'memory-compaction',
      position: { x: 550, y: 880 },
      data: { label: '🗜️ Memory Compaction\nDefragmentation' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'operation-complete',
      position: { x: 400, y: 1000 },
      data: { label: '✨ Operation Complete\nMemory written + Similar cases retrieved efficiently' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Request to controller
    {
      id: 'request-controller',
      source: 'agent-request',
      target: 'memory-controller',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
    },
    // Controller to managers
    {
      id: 'controller-recency',
      source: 'memory-controller',
      target: 'recency-manager',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Track',
    },
    {
      id: 'controller-relevance',
      source: 'memory-controller',
      target: 'relevance-scorer',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Score',
    },
    {
      id: 'controller-importance',
      source: 'memory-controller',
      target: 'importance-evaluator',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Evaluate',
    },
    {
      id: 'controller-optimizer',
      source: 'memory-controller',
      target: 'access-optimizer',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Optimize',
    },
    // Write flow
    {
      id: 'controller-write',
      source: 'memory-controller',
      target: 'write-request',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'write-validation',
      source: 'write-request',
      target: 'data-validation',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'validation-encoding',
      source: 'data-validation',
      target: 'encoding-processor',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'encoding-index',
      source: 'encoding-processor',
      target: 'index-update',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'index-storage',
      source: 'index-update',
      target: 'storage-commit',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    // Read flow
    {
      id: 'controller-read',
      source: 'memory-controller',
      target: 'read-request',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'read-parsing',
      source: 'read-request',
      target: 'query-parsing',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'parsing-search',
      source: 'query-parsing',
      target: 'memory-search',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'search-ranking',
      source: 'memory-search',
      target: 'ranking-filter',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'ranking-retrieval',
      source: 'ranking-filter',
      target: 'retrieval-output',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    // Storage connections
    {
      id: 'storage-hot',
      source: 'storage-commit',
      target: 'hot-cache',
      style: { ...edgeStyle, stroke: '#ec4899' },
      label: 'Write',
    },
    {
      id: 'storage-warm',
      source: 'storage-commit',
      target: 'warm-storage',
      style: { ...edgeStyle, stroke: '#ec4899' },
      label: 'Write',
    },
    {
      id: 'storage-cold',
      source: 'storage-commit',
      target: 'cold-archive',
      style: { ...edgeStyle, stroke: '#ec4899' },
      label: 'Archive',
    },
    {
      id: 'encoding-vector',
      source: 'encoding-processor',
      target: 'vector-db',
      style: { ...edgeStyle, stroke: '#ec4899' },
      label: 'Store',
    },
    // Memory search connections
    {
      id: 'search-hot',
      source: 'memory-search',
      target: 'hot-cache',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '3 3' },
      label: 'Query',
    },
    {
      id: 'search-warm',
      source: 'memory-search',
      target: 'warm-storage',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '3 3' },
      label: 'Query',
    },
    {
      id: 'search-vector',
      source: 'memory-search',
      target: 'vector-db',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '3 3' },
      label: 'Search',
    },
    // Access control
    {
      id: 'controller-permission',
      source: 'memory-controller',
      target: 'permission-check',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'permission-rate',
      source: 'permission-check',
      target: 'rate-limiter',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'rate-concurrency',
      source: 'rate-limiter',
      target: 'concurrency-control',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'concurrency-audit',
      source: 'concurrency-control',
      target: 'audit-logging',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    // Access patterns influence
    {
      id: 'recency-hot',
      source: 'recency-manager',
      target: 'hot-cache',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeDasharray: '5 5' },
      label: 'Manage',
    },
    {
      id: 'relevance-ranking',
      source: 'relevance-scorer',
      target: 'ranking-filter',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeDasharray: '5 5' },
      label: 'Score',
    },
    {
      id: 'importance-storage',
      source: 'importance-evaluator',
      target: 'storage-commit',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeDasharray: '5 5' },
      label: 'Prioritize',
    },
    // Optimization strategies
    {
      id: 'optimizer-caching',
      source: 'access-optimizer',
      target: 'adaptive-caching',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'optimizer-prefetch',
      source: 'access-optimizer',
      target: 'predictive-prefetch',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'optimizer-compaction',
      source: 'access-optimizer',
      target: 'memory-compaction',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    // Optimization to stores
    {
      id: 'caching-hot',
      source: 'adaptive-caching',
      target: 'hot-cache',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3 3' },
    },
    {
      id: 'prefetch-warm',
      source: 'predictive-prefetch',
      target: 'warm-storage',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3 3' },
    },
    {
      id: 'compaction-cold',
      source: 'memory-compaction',
      target: 'cold-archive',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3 3' },
    },
    // Complete
    {
      id: 'storage-complete',
      source: 'storage-commit',
      target: 'operation-complete',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 2 },
    },
    {
      id: 'retrieval-complete',
      source: 'retrieval-output',
      target: 'operation-complete',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
  ],
  steps: [
    {
      title: 'Memory Request',
      description: 'Agent requests write and read operations',
      activeNodes: ['agent-request', 'memory-controller'],
      activeEdges: ['request-controller'],
    },
    {
      title: 'Access Pattern Analysis',
      description: 'Analyzing recency, relevance, and importance',
      activeNodes: ['memory-controller', 'recency-manager', 'relevance-scorer', 'importance-evaluator', 'access-optimizer'],
      activeEdges: ['controller-recency', 'controller-relevance', 'controller-importance', 'controller-optimizer'],
    },
    {
      title: 'Write Operation',
      description: 'Processing write request through validation and encoding',
      activeNodes: ['write-request', 'data-validation', 'encoding-processor'],
      activeEdges: ['controller-write', 'write-validation', 'validation-encoding'],
    },
    {
      title: 'Index and Storage',
      description: 'Updating indices and committing to storage',
      activeNodes: ['encoding-processor', 'index-update', 'storage-commit', 'vector-db'],
      activeEdges: ['encoding-index', 'index-storage', 'encoding-vector'],
    },
    {
      title: 'Storage Distribution',
      description: 'Writing to appropriate storage tiers',
      activeNodes: ['storage-commit', 'hot-cache', 'warm-storage', 'cold-archive'],
      activeEdges: ['storage-hot', 'storage-warm', 'storage-cold'],
    },
    {
      title: 'Read Operation',
      description: 'Processing read request and parsing query',
      activeNodes: ['read-request', 'query-parsing', 'memory-search'],
      activeEdges: ['controller-read', 'read-parsing', 'parsing-search'],
    },
    {
      title: 'Memory Search',
      description: 'Searching across storage tiers and vector database',
      activeNodes: ['memory-search', 'hot-cache', 'warm-storage', 'vector-db'],
      activeEdges: ['search-hot', 'search-warm', 'search-vector'],
    },
    {
      title: 'Ranking and Filtering',
      description: 'Scoring and filtering results by relevance',
      activeNodes: ['memory-search', 'ranking-filter', 'relevance-scorer', 'retrieval-output'],
      activeEdges: ['search-ranking', 'relevance-ranking', 'ranking-retrieval'],
    },
    {
      title: 'Access Control',
      description: 'Enforcing permissions and rate limits',
      activeNodes: ['permission-check', 'rate-limiter', 'concurrency-control', 'audit-logging'],
      activeEdges: ['controller-permission', 'permission-rate', 'rate-concurrency', 'concurrency-audit'],
    },
    {
      title: 'Cache Management',
      description: 'Managing cache based on recency patterns',
      activeNodes: ['recency-manager', 'hot-cache', 'importance-evaluator', 'storage-commit'],
      activeEdges: ['recency-hot', 'importance-storage'],
    },
    {
      title: 'Optimization Strategies',
      description: 'Applying adaptive caching and prefetching',
      activeNodes: ['access-optimizer', 'adaptive-caching', 'predictive-prefetch', 'memory-compaction'],
      activeEdges: ['optimizer-caching', 'optimizer-prefetch', 'optimizer-compaction'],
    },
    {
      title: 'Operation Complete',
      description: 'Memory written and similar cases retrieved successfully',
      activeNodes: ['storage-commit', 'retrieval-output', 'operation-complete'],
      activeEdges: ['storage-complete', 'retrieval-complete'],
    },
  ],
};