import { Technique } from './types';

export const resourceAwareOptimizationTechniques: Technique[] = [
  {
    id: 'adaptive-compute-scaling',
    name: 'Adaptive Compute Scaling',
    abbr: 'ACS',
    icon: '📈',
    color: 'from-green-500 to-emerald-600',
    category: 'resource-aware-optimization',
    description: 'Dynamically adjusts computational resources based on workload demands and performance requirements',
    features: [
      'Real-time resource monitoring',
      'Dynamic scaling decisions',
      'Performance-based adjustments',
      'Cost optimization',
      'Quality maintenance',
      'Predictive scaling'
    ],
    useCases: ['cloud-services', 'edge-computing', 'mobile-ai', 'cost-optimization'],
    complexity: 'high',
    example: 'AI Service Auto-Scaling:\n\nMonitoring:\n• CPU Usage: 85% (threshold: 80%)\n• Memory: 6.2GB/8GB (77%)\n• Response Time: 1.2s (target: <1s)\n• Queue Length: 45 requests\n• Cost: $12/hour current\n\nDecision Engine:\n• High CPU + slow response → Scale up\n• Queue growing → Add 2 instances\n• Cost constraint → Use spot instances\n• Peak hours ending → Prepare scale down\n\nActions:\n• Launch 2 additional instances\n• Distribute load evenly\n• Monitor for 5 minutes\n• Result: 450ms response time, $18/hour\n\nPredictive Scaling:\n• Historical pattern: +40% load at 2pm\n• Pre-scale at 1:45pm\n• Avoid performance degradation\n• Save 30% on emergency scaling costs'
  },
  {
    id: 'cost-aware-model-selection',
    name: 'Cost-Aware Model Selection',
    abbr: 'CAMS',
    icon: '💰',
    color: 'from-emerald-500 to-teal-600',
    category: 'resource-aware-optimization',
    description: 'Intelligently selects AI models based on cost-performance trade-offs for specific tasks',
    features: [
      'Multi-model comparison',
      'Cost-performance analysis',
      'Dynamic model switching',
      'Quality thresholds',
      'Budget constraints',
      'Performance monitoring'
    ],
    useCases: ['api-optimization', 'budget-management', 'multi-model-systems', 'production-ai'],
    complexity: 'medium',
    example: 'Smart Model Router:\n\nTask: Text summarization\nBudget: $100/day\nQuality requirement: >85% accuracy\n\nModel Options:\n• GPT-4: $0.03/1K tokens, 95% accuracy\n• GPT-3.5: $0.002/1K tokens, 88% accuracy  \n• Local model: $0.0001/1K tokens, 80% accuracy\n\nDecision Logic:\n• High-priority requests → GPT-4\n• Standard requests → GPT-3.5\n• Bulk processing → Local model\n• Budget 80% used → Switch to cheaper models\n\nReal-time Optimization:\n• Monitor quality scores\n• Track cost accumulation\n• Adjust model selection\n• Maintain SLA compliance\n\nResult: 90% cost reduction while maintaining 87% average quality'
  },
  {
    id: 'energy-efficient-inference',
    name: 'Energy-Efficient Inference',
    abbr: 'EEI',
    icon: '🔋',
    color: 'from-teal-500 to-cyan-600',
    category: 'resource-aware-optimization',
    description: 'Optimizes AI inference for minimal energy consumption while maintaining performance',
    features: [
      'Power consumption monitoring',
      'Dynamic frequency scaling',
      'Model compression',
      'Batch optimization',
      'Hardware acceleration',
      'Thermal management'
    ],
    useCases: ['mobile-devices', 'iot-systems', 'edge-ai', 'green-computing'],
    complexity: 'high',
    example: 'Mobile AI Optimization:\n\nDevice State:\n• Battery: 25% remaining\n• Temperature: 42°C\n• CPU frequency: 2.4GHz\n• Available RAM: 2.1GB\n\nEnergy Optimization:\n• Reduce model precision: FP32 → FP16\n• Lower CPU frequency: 2.4GHz → 1.8GHz\n• Batch similar requests\n• Use hardware accelerator (NPU)\n• Cache frequent predictions\n\nTechniques:\n• Quantization: 4x smaller models\n• Pruning: Remove 60% of parameters\n• Knowledge distillation: Teacher-student models\n• Dynamic inference: Skip layers for simple tasks\n\nResults:\n• 70% reduction in energy consumption\n• 3x longer battery life\n• 10°C lower operating temperature\n• Maintained 95% of original accuracy'
  },
  {
    id: 'memory-optimization',
    name: 'Memory Optimization',
    abbr: 'MO',
    icon: '🧠',
    color: 'from-cyan-500 to-blue-600',
    category: 'resource-aware-optimization',
    description: 'Efficiently manages memory usage through caching, compression, and garbage collection strategies',
    features: [
      'Memory pool management',
      'Intelligent caching',
      'Compression algorithms',
      'Garbage collection tuning',
      'Memory-mapped files',
      'Stream processing'
    ],
    useCases: ['large-models', 'streaming-data', 'embedded-systems', 'high-throughput'],
    complexity: 'high',
    example: 'Large Language Model Optimization:\n\nMemory Challenges:\n• Model size: 175B parameters (350GB)\n• Available RAM: 80GB\n• Concurrent users: 1000+\n• Real-time inference required\n\nOptimization Strategies:\n\n1. Model Sharding:\n   • Split across 8 GPUs\n   • Pipeline parallel processing\n   • Minimize inter-GPU communication\n\n2. Dynamic Loading:\n   • Load model layers on-demand\n   • Keep hot layers in memory\n   • Swap cold layers to SSD\n\n3. KV-Cache Optimization:\n   • Compress attention matrices\n   • Use block-sparse attention\n   • Implement sliding window\n\n4. Memory Pool:\n   • Pre-allocate common tensor sizes\n   • Reuse memory buffers\n   • Minimize fragmentation\n\nResults:\n• 80% memory usage reduction\n• 5x improvement in throughput\n• 50ms latency maintained\n• Support 10x more concurrent users'
  },
  {
    id: 'latency-optimization',
    name: 'Latency Optimization',
    abbr: 'LO',
    icon: '⚡',
    color: 'from-blue-500 to-indigo-600',
    category: 'resource-aware-optimization',
    description: 'Minimizes response time through predictive loading, caching, and request optimization',
    features: [
      'Predictive prefetching',
      'Response caching',
      'Request batching',
      'Asynchronous processing',
      'Edge deployment',
      'Connection pooling'
    ],
    useCases: ['real-time-systems', 'interactive-ai', 'gaming', 'live-streaming'],
    complexity: 'medium',
    example: 'Real-time AI Assistant:\n\nLatency Requirements:\n• Voice response: <200ms\n• Text processing: <50ms\n• Image analysis: <500ms\n• User satisfaction: >95%\n\nOptimization Techniques:\n\n1. Predictive Loading:\n   • Analyze user patterns\n   • Pre-load likely models\n   • Warm up frequently used endpoints\n\n2. Intelligent Caching:\n   • Cache common responses\n   • Use semantic similarity\n   • Implement LRU eviction\n\n3. Request Optimization:\n   • Batch similar requests\n   • Parallel processing\n   • Stream partial results\n\n4. Infrastructure:\n   • Edge deployment (50ms closer)\n   • CDN for static content\n   • Dedicated GPU pools\n\nResults:\n• Voice latency: 180ms average\n• Text processing: 35ms average\n• Cache hit rate: 78%\n• User satisfaction: 97%\n• 60% reduction in compute costs'
  }
];