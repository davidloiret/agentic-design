import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const slidingWindowPattern: PatternScenario = {
  id: 'sliding-window',
  title: 'Sliding Window Memory Management Pattern',
  description: 'Demonstrates efficient memory management using a fixed-size sliding window to maintain relevant context in agentic AI systems',
  initialNodes: [
    // Input stream
    {
      id: 'input-stream',
      type: 'default',
      position: { x: 500, y: 50 },
      data: { label: 'Input Stream\n"Continuous data flow from user interactions,\nsensor readings, or system events"' },
      style: { ...nodeStyle, minWidth: 280, background: '#dc2626', fontSize: '14px' }
    },

    // Memory manager
    {
      id: 'memory-manager',
      type: 'default',
      position: { x: 500, y: 180 },
      data: { label: 'Memory Manager\nCoordinates sliding window operations' },
      style: { ...nodeStyle, minWidth: 220, background: '#059669' }
    },

    // Window configuration
    {
      id: 'window-config',
      type: 'default',
      position: { x: 200, y: 320 },
      data: { label: 'Window Configuration\n• Window size: 1024 tokens\n• Overlap: 256 tokens\n• Retention policy: FIFO\n• Compression threshold: 80%' },
      style: { ...nodeStyle, minWidth: 180, background: '#3b82f6', fontSize: '11px' }
    },

    // Content analyzer
    {
      id: 'content-analyzer',
      type: 'default',
      position: { x: 500, y: 320 },
      data: { label: 'Content Analyzer\nEvaluates information relevance' },
      style: { ...nodeStyle, minWidth: 180, background: '#f59e0b' }
    },

    // Priority scorer
    {
      id: 'priority-scorer',
      type: 'default',
      position: { x: 800, y: 320 },
      data: { label: 'Priority Scorer\n• Recency: 0.4\n• Relevance: 0.3\n• Frequency: 0.2\n• Context: 0.1' },
      style: { ...nodeStyle, minWidth: 160, background: '#8b5cf6', fontSize: '11px' }
    },

    // Sliding window buffer
    {
      id: 'sliding-window',
      type: 'default',
      position: { x: 500, y: 460 },
      data: { label: 'Sliding Window Buffer\nFixed-size memory container' },
      style: { ...nodeStyle, minWidth: 200, background: '#7c3aed' }
    },

    // Active memory slots
    {
      id: 'slot-1',
      type: 'default',
      position: { x: 100, y: 600 },
      data: { label: 'Slot 1: Recent\n"User: What is the weather?"\nTimestamp: 14:35:22\nPriority: 0.95' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981', fontSize: '10px' }
    },

    {
      id: 'slot-2',
      type: 'default',
      position: { x: 300, y: 600 },
      data: { label: 'Slot 2: Context\n"Location: San Francisco"\nTimestamp: 14:35:18\nPriority: 0.85' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981', fontSize: '10px' }
    },

    {
      id: 'slot-3',
      type: 'default',
      position: { x: 500, y: 600 },
      data: { label: 'Slot 3: Previous\n"AI: Temperature is 72°F"\nTimestamp: 14:34:55\nPriority: 0.75' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981', fontSize: '10px' }
    },

    {
      id: 'slot-4',
      type: 'default',
      position: { x: 700, y: 600 },
      data: { label: 'Slot 4: Background\n"Preferences: Celsius"\nTimestamp: 14:32:10\nPriority: 0.65' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981', fontSize: '10px' }
    },

    {
      id: 'slot-5',
      type: 'default',
      position: { x: 900, y: 600 },
      data: { label: 'Slot 5: Oldest\n"Previous weather query"\nTimestamp: 14:25:33\nPriority: 0.35' },
      style: { ...nodeStyle, minWidth: 160, background: '#6b7280', fontSize: '10px' }
    },

    // Window operations
    {
      id: 'window-operations',
      type: 'default',
      position: { x: 500, y: 740 },
      data: { label: 'Window Operations\nManage memory lifecycle' },
      style: { ...nodeStyle, minWidth: 180, background: '#8b5cf6' }
    },

    // Add operation
    {
      id: 'add-operation',
      type: 'default',
      position: { x: 200, y: 880 },
      data: { label: 'Add Operation\n1. Check capacity\n2. Assign priority\n3. Insert at head\n4. Update indices' },
      style: { ...nodeStyle, minWidth: 140, background: '#059669', fontSize: '10px' }
    },

    // Remove operation
    {
      id: 'remove-operation',
      type: 'default',
      position: { x: 400, y: 880 },
      data: { label: 'Remove Operation\n1. Identify oldest\n2. Check dependencies\n3. Archive if needed\n4. Free memory slot' },
      style: { ...nodeStyle, minWidth: 140, background: '#dc2626', fontSize: '10px' }
    },

    // Compress operation
    {
      id: 'compress-operation',
      type: 'default',
      position: { x: 600, y: 880 },
      data: { label: 'Compress Operation\n1. Identify candidates\n2. Extract key info\n3. Create summary\n4. Replace original' },
      style: { ...nodeStyle, minWidth: 140, background: '#f59e0b', fontSize: '10px' }
    },

    // Retrieve operation
    {
      id: 'retrieve-operation',
      type: 'default',
      position: { x: 800, y: 880 },
      data: { label: 'Retrieve Operation\n1. Query relevance\n2. Score matching\n3. Rank results\n4. Return context' },
      style: { ...nodeStyle, minWidth: 140, background: '#3b82f6', fontSize: '10px' }
    },

    // Memory optimization
    {
      id: 'memory-optimization',
      type: 'default',
      position: { x: 500, y: 1020 },
      data: { label: 'Memory Optimization\nContinuous efficiency improvements' },
      style: { ...nodeStyle, minWidth: 220, background: '#7c3aed' }
    },

    // Compression engine
    {
      id: 'compression-engine',
      type: 'default',
      position: { x: 250, y: 1160 },
      data: { label: 'Compression Engine\n• Semantic clustering\n• Redundancy removal\n• Summary generation\n• Token reduction: 70%' },
      style: { ...nodeStyle, minWidth: 160, background: '#f59e0b', fontSize: '10px' }
    },

    // Relevance tracker
    {
      id: 'relevance-tracker',
      type: 'default',
      position: { x: 500, y: 1160 },
      data: { label: 'Relevance Tracker\n• Context matching\n• Semantic similarity\n• Usage frequency\n• Temporal decay' },
      style: { ...nodeStyle, minWidth: 160, background: '#3b82f6', fontSize: '10px' }
    },

    // Garbage collector
    {
      id: 'garbage-collector',
      type: 'default',
      position: { x: 750, y: 1160 },
      data: { label: 'Garbage Collector\n• Identify unused data\n• Clean orphaned refs\n• Defragment memory\n• Update indices' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc2626', fontSize: '10px' }
    },

    // Context retrieval
    {
      id: 'context-retrieval',
      type: 'default',
      position: { x: 500, y: 1300 },
      data: { label: 'Context Retrieval\nIntelligent information access' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Query processor
    {
      id: 'query-processor',
      type: 'default',
      position: { x: 200, y: 1440 },
      data: { label: 'Query Processor\n• Parse request\n• Extract keywords\n• Semantic analysis\n• Intent recognition' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981', fontSize: '10px' }
    },

    // Similarity matcher
    {
      id: 'similarity-matcher',
      type: 'default',
      position: { x: 500, y: 1440 },
      data: { label: 'Similarity Matcher\n• Vector embeddings\n• Cosine similarity\n• Semantic distance\n• Context overlap' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981', fontSize: '10px' }
    },

    // Result ranker
    {
      id: 'result-ranker',
      type: 'default',
      position: { x: 800, y: 1440 },
      data: { label: 'Result Ranker\n• Relevance scoring\n• Temporal weighting\n• Context importance\n• User preferences' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981', fontSize: '10px' }
    },

    // Context assembler
    {
      id: 'context-assembler',
      type: 'default',
      position: { x: 350, y: 1580 },
      data: { label: 'Context Assembler\nCombine relevant information' },
      style: { ...nodeStyle, minWidth: 180, background: '#8b5cf6' }
    },

    // Response generator
    {
      id: 'response-generator',
      type: 'default',
      position: { x: 650, y: 1580 },
      data: { label: 'Response Generator\nGenerate contextual responses' },
      style: { ...nodeStyle, minWidth: 180, background: '#8b5cf6' }
    },

    // Performance monitoring
    {
      id: 'performance-monitor',
      type: 'default',
      position: { x: 500, y: 1720 },
      data: { label: 'Performance Monitoring\nTrack efficiency metrics' },
      style: { ...nodeStyle, minWidth: 200, background: '#6366f1' }
    },

    // Metrics dashboard
    {
      id: 'metrics-dashboard',
      type: 'default',
      position: { x: 200, y: 1860 },
      data: { label: 'Metrics Dashboard\n• Memory usage: 85%\n• Hit rate: 94%\n• Avg latency: 12ms\n• Compression: 68%' },
      style: { ...nodeStyle, minWidth: 160, background: '#6366f1', fontSize: '10px' }
    },

    // Adaptive controller
    {
      id: 'adaptive-controller',
      type: 'default',
      position: { x: 500, y: 1860 },
      data: { label: 'Adaptive Controller\n• Window size tuning\n• Threshold adjustment\n• Priority rebalancing\n• Policy optimization' },
      style: { ...nodeStyle, minWidth: 160, background: '#6366f1', fontSize: '10px' }
    },

    // Alert system
    {
      id: 'alert-system',
      type: 'default',
      position: { x: 800, y: 1860 },
      data: { label: 'Alert System\n• Memory pressure\n• Performance degradation\n• Context loss warnings\n• Optimization suggestions' },
      style: { ...nodeStyle, minWidth: 160, background: '#6366f1', fontSize: '10px' }
    }
  ],
  initialEdges: [
    // Main flow
    { id: 'e1', source: 'input-stream', target: 'memory-manager', style: edgeStyle },
    { id: 'e2', source: 'memory-manager', target: 'window-config', style: edgeStyle },
    { id: 'e3', source: 'memory-manager', target: 'content-analyzer', style: edgeStyle },
    { id: 'e4', source: 'memory-manager', target: 'priority-scorer', style: edgeStyle },
    
    // Window management
    { id: 'e5', source: 'window-config', target: 'sliding-window', style: edgeStyle },
    { id: 'e6', source: 'content-analyzer', target: 'sliding-window', style: edgeStyle },
    { id: 'e7', source: 'priority-scorer', target: 'sliding-window', style: edgeStyle },
    
    // Memory slots
    { id: 'e8', source: 'sliding-window', target: 'slot-1', style: edgeStyle },
    { id: 'e9', source: 'sliding-window', target: 'slot-2', style: edgeStyle },
    { id: 'e10', source: 'sliding-window', target: 'slot-3', style: edgeStyle },
    { id: 'e11', source: 'sliding-window', target: 'slot-4', style: edgeStyle },
    { id: 'e12', source: 'sliding-window', target: 'slot-5', style: edgeStyle },
    
    // Operations
    { id: 'e13', source: 'slot-1', target: 'window-operations', style: edgeStyle },
    { id: 'e14', source: 'slot-2', target: 'window-operations', style: edgeStyle },
    { id: 'e15', source: 'slot-3', target: 'window-operations', style: edgeStyle },
    { id: 'e16', source: 'slot-4', target: 'window-operations', style: edgeStyle },
    { id: 'e17', source: 'slot-5', target: 'window-operations', style: edgeStyle },
    
    // Operation types
    { id: 'e18', source: 'window-operations', target: 'add-operation', style: edgeStyle },
    { id: 'e19', source: 'window-operations', target: 'remove-operation', style: edgeStyle },
    { id: 'e20', source: 'window-operations', target: 'compress-operation', style: edgeStyle },
    { id: 'e21', source: 'window-operations', target: 'retrieve-operation', style: edgeStyle },
    
    // Optimization
    { id: 'e22', source: 'add-operation', target: 'memory-optimization', style: edgeStyle },
    { id: 'e23', source: 'remove-operation', target: 'memory-optimization', style: edgeStyle },
    { id: 'e24', source: 'compress-operation', target: 'memory-optimization', style: edgeStyle },
    { id: 'e25', source: 'retrieve-operation', target: 'memory-optimization', style: edgeStyle },
    
    // Optimization components
    { id: 'e26', source: 'memory-optimization', target: 'compression-engine', style: edgeStyle },
    { id: 'e27', source: 'memory-optimization', target: 'relevance-tracker', style: edgeStyle },
    { id: 'e28', source: 'memory-optimization', target: 'garbage-collector', style: edgeStyle },
    
    // Context retrieval
    { id: 'e29', source: 'compression-engine', target: 'context-retrieval', style: edgeStyle },
    { id: 'e30', source: 'relevance-tracker', target: 'context-retrieval', style: edgeStyle },
    { id: 'e31', source: 'garbage-collector', target: 'context-retrieval', style: edgeStyle },
    
    // Retrieval components
    { id: 'e32', source: 'context-retrieval', target: 'query-processor', style: edgeStyle },
    { id: 'e33', source: 'context-retrieval', target: 'similarity-matcher', style: edgeStyle },
    { id: 'e34', source: 'context-retrieval', target: 'result-ranker', style: edgeStyle },
    
    // Response generation
    { id: 'e35', source: 'query-processor', target: 'context-assembler', style: edgeStyle },
    { id: 'e36', source: 'similarity-matcher', target: 'context-assembler', style: edgeStyle },
    { id: 'e37', source: 'result-ranker', target: 'response-generator', style: edgeStyle },
    { id: 'e38', source: 'context-assembler', target: 'response-generator', style: edgeStyle },
    
    // Monitoring
    { id: 'e39', source: 'response-generator', target: 'performance-monitor', style: edgeStyle },
    { id: 'e40', source: 'context-assembler', target: 'performance-monitor', style: edgeStyle },
    
    // Monitoring components
    { id: 'e41', source: 'performance-monitor', target: 'metrics-dashboard', style: edgeStyle },
    { id: 'e42', source: 'performance-monitor', target: 'adaptive-controller', style: edgeStyle },
    { id: 'e43', source: 'performance-monitor', target: 'alert-system', style: edgeStyle }
  ],
  steps: [
    {
      id: 1,
      title: 'Input Processing & Memory Management',
      description: 'Receive input stream and initialize memory management components',
      activeNodes: ['input-stream', 'memory-manager', 'window-config'],
      explanation: 'The system receives continuous input from user interactions or system events and initializes the memory manager with configured window parameters including size, overlap, and retention policies.'
    },
    {
      id: 2,
      title: 'Content Analysis & Priority Scoring',
      description: 'Analyze incoming content for relevance and assign priority scores',
      activeNodes: ['content-analyzer', 'priority-scorer'],
      explanation: 'Each piece of information is analyzed for semantic content and assigned priority scores based on recency (40%), relevance (30%), frequency (20%), and contextual importance (10%).'
    },
    {
      id: 3,
      title: 'Sliding Window Buffer Management',
      description: 'Maintain fixed-size memory buffer with intelligent slot allocation',
      activeNodes: ['sliding-window', 'slot-1', 'slot-2', 'slot-3', 'slot-4', 'slot-5'],
      explanation: 'The sliding window maintains 5 memory slots with decreasing priority from recent to oldest. New information pushes out the least important content while preserving essential context.'
    },
    {
      id: 4,
      title: 'Window Operations Execution',
      description: 'Execute memory operations: add, remove, compress, and retrieve',
      activeNodes: ['window-operations', 'add-operation', 'remove-operation', 'compress-operation', 'retrieve-operation'],
      explanation: 'Four core operations manage the memory lifecycle: adding new content with priority assignment, removing outdated information, compressing similar content, and retrieving relevant context.'
    },
    {
      id: 5,
      title: 'Memory Optimization Process',
      description: 'Optimize memory usage through compression, relevance tracking, and garbage collection',
      activeNodes: ['memory-optimization', 'compression-engine', 'relevance-tracker', 'garbage-collector'],
      explanation: 'Continuous optimization reduces memory footprint by 70% through semantic clustering, tracks information relevance over time, and removes unused references while maintaining data integrity.'
    },
    {
      id: 6,
      title: 'Intelligent Context Retrieval',
      description: 'Process queries and retrieve relevant context using semantic matching',
      activeNodes: ['context-retrieval', 'query-processor', 'similarity-matcher', 'result-ranker'],
      explanation: 'When context is needed, the system processes queries using semantic analysis, matches content using vector embeddings and cosine similarity, then ranks results by relevance and temporal importance.'
    },
    {
      id: 7,
      title: 'Context Assembly & Response Generation',
      description: 'Combine relevant information and generate contextually appropriate responses',
      activeNodes: ['context-assembler', 'response-generator'],
      explanation: 'Retrieved context is intelligently assembled into coherent information packages, which then inform response generation with proper context awareness and relevance.'
    },
    {
      id: 8,
      title: 'Performance Monitoring & Adaptation',
      description: 'Monitor system performance and adapt parameters for optimal efficiency',
      activeNodes: ['performance-monitor', 'metrics-dashboard', 'adaptive-controller', 'alert-system'],
      explanation: 'Continuous monitoring tracks memory usage (85%), hit rate (94%), latency (12ms), and compression ratio (68%). The adaptive controller adjusts parameters while alerts notify of performance issues.'
    }
  ]
};