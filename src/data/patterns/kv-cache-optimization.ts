import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const kvCacheOptimizationPattern: PatternScenario = {
  id: 'kv-cache-optimization',
  title: 'KV Cache Optimization Pattern',
  description: 'Memory-efficient caching strategies for LLM inference using quantization, eviction policies, and architectural optimizations achieving up to 80% memory reduction',
  initialNodes: [
    // KV cache challenge
    {
      id: 'kv-cache-challenge',
      position: { x: 400, y: 50 },
      data: { label: '💾 KV Cache Challenge\n"How to manage KV cache\nthat grows to 320GB and\nexceeds model weights?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // KV optimization framework
    {
      id: 'kv-optimization-framework',
      position: { x: 400, y: 200 },
      data: { label: '🎯 KV Optimization Framework\n"Multi-strategy approach:\n• Quantization\n• Eviction policies\n• Memory management\n• Architectural changes"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Quantization techniques
    {
      id: 'quantization-techniques',
      position: { x: 200, y: 350 },
      data: { label: '🗜️ Quantization\n"Precision reduction:\n• 1-bit CQ extreme\n• 2-bit MiniKV\n• 4-bit FlexGen\n• INT8/FP8 TensorRT"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 230 },
    },

    // KVComp compression
    {
      id: 'kvcomp-compression',
      position: { x: 50, y: 500 },
      data: { label: '📦 KVComp\n"Hybrid compression:\n• Fine-grained quant\n• Huffman encoding\n• 83% compression\n• GPU optimized"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 210 },
    },

    // Eviction strategies
    {
      id: 'eviction-strategies',
      position: { x: 600, y: 350 },
      data: { label: '🚫 Eviction Strategies\n"Selective caching:\n• H2O heavy-hitters\n• Scissorhands pivotal\n• FastGen error-based\n• 80% reduction"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // H2O algorithm
    {
      id: 'h2o-algorithm',
      position: { x: 750, y: 500 },
      data: { label: '💧 H2O Algorithm\n"Heavy-Hitter Oracle:\n• Attention scoring\n• Cumulative tracking\n• Low-score eviction\n• Important retention"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 230 },
    },

    // Memory management
    {
      id: 'memory-management',
      position: { x: 400, y: 650 },
      data: { label: '📄 Memory Management\n"Efficient allocation:\n• PagedAttention\n• RadixAttention\n• Dynamic chunks\n• Prefix sharing"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // PagedAttention
    {
      id: 'paged-attention',
      position: { x: 200, y: 800 },
      data: { label: '📚 PagedAttention\n"Dynamic allocation:\n• On-demand chunks\n• Reduced fragmentation\n• Paged layout\n• Flexible sizing"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // RadixAttention
    {
      id: 'radix-attention',
      position: { x: 600, y: 800 },
      data: { label: '🌳 RadixAttention\n"Prefix sharing:\n• Radix tree storage\n• Cross-request reuse\n• Efficient search\n• Cache retention"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },

    // Architectural changes
    {
      id: 'architectural-changes',
      position: { x: 200, y: 950 },
      data: { label: '🏗️ Architectural Changes\n"Design optimizations:\n• MQA/GQA heads\n• SWA windows\n• StreamingLLM\n• XKV layerwise"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    // Performance metrics
    {
      id: 'performance-metrics',
      position: { x: 600, y: 950 },
      data: { label: '📊 Performance Gains\n"Optimization results:\n• 80% memory reduction\n• 2.1x speedup\n• 1MB/token savings\n• Larger batch sizes"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },

    // System integration
    {
      id: 'system-integration',
      position: { x: 400, y: 1100 },
      data: { label: '🔗 System Integration\n"Production deployment:\n• vLLM support\n• TensorRT-LLM\n• Co-design benefits\n• Throughput gains"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 260 },
    },

    // Core optimization principle
    {
      id: 'optimization-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 KV Cache Optimization Principle\n"Intelligent caching reduces memory from gigabytes to megabytes\nSelective retention preserves accuracy while evicting redundancy\nHybrid strategies combine quantization, eviction, and architecture"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'kv-cache-challenge',
      target: 'kv-optimization-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework implements strategies
    {
      id: 'e2',
      source: 'kv-optimization-framework',
      target: 'quantization-techniques',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e3',
      source: 'kv-optimization-framework',
      target: 'eviction-strategies',
      ...edgeStyle,
      label: 'applies'
    },
    {
      id: 'e4',
      source: 'kv-optimization-framework',
      target: 'memory-management',
      ...edgeStyle,
      label: 'utilizes'
    },

    // Quantization details
    {
      id: 'e5',
      source: 'quantization-techniques',
      target: 'kvcomp-compression',
      ...edgeStyle,
      label: 'advanced by'
    },

    // Eviction details
    {
      id: 'e6',
      source: 'eviction-strategies',
      target: 'h2o-algorithm',
      ...edgeStyle,
      label: 'exemplified by'
    },

    // Memory management details
    {
      id: 'e7',
      source: 'memory-management',
      target: 'paged-attention',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e8',
      source: 'memory-management',
      target: 'radix-attention',
      ...edgeStyle,
      label: 'includes'
    },

    // Cross-connections
    {
      id: 'e9',
      source: 'kvcomp-compression',
      target: 'architectural-changes',
      ...edgeStyle,
      label: 'combines with'
    },
    {
      id: 'e10',
      source: 'h2o-algorithm',
      target: 'performance-metrics',
      ...edgeStyle,
      label: 'achieves'
    },

    // Architecture and memory connections
    {
      id: 'e11',
      source: 'paged-attention',
      target: 'architectural-changes',
      ...edgeStyle,
      label: 'enhances'
    },
    {
      id: 'e12',
      source: 'radix-attention',
      target: 'performance-metrics',
      ...edgeStyle,
      label: 'improves'
    },

    // Integration connections
    {
      id: 'e13',
      source: 'architectural-changes',
      target: 'system-integration',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e14',
      source: 'performance-metrics',
      target: 'system-integration',
      ...edgeStyle,
      label: 'validates'
    },

    // Integration proves principle
    {
      id: 'e15',
      source: 'system-integration',
      target: 'optimization-principle',
      ...edgeStyle,
      label: 'demonstrates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "KV Cache Memory Challenge",
      description: "How can we manage KV cache that grows to 320GB for complex tasks, consuming more memory than model weights and limiting batch sizes?",
      activeNodes: ['kv-cache-challenge'],
      activeEdges: []
    },
    {
      title: "Multi-Strategy Optimization Framework",
      description: "Comprehensive framework addresses challenge through quantization for precision reduction, eviction policies for selective caching, memory management for efficient allocation, and architectural changes.",
      activeNodes: ['kv-optimization-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Quantization and Compression Techniques",
      description: "Precision reduction from 1-bit CQ extreme to 4-bit FlexGen and INT8/FP8 TensorRT, with KVComp achieving 83% compression through fine-grained quantization and Huffman encoding.",
      activeNodes: ['quantization-techniques', 'kvcomp-compression'],
      activeEdges: ['e2', 'e5']
    },
    {
      title: "Intelligent Eviction Strategies",
      description: "H2O tracks cumulative attention scores evicting low-score tokens, Scissorhands identifies pivotal tokens, FastGen uses error-based eviction, achieving 80% memory reduction with minimal accuracy loss.",
      activeNodes: ['eviction-strategies', 'h2o-algorithm'],
      activeEdges: ['e3', 'e6']
    },
    {
      title: "Advanced Memory Management",
      description: "PagedAttention uses dynamic on-demand chunks reducing fragmentation, while RadixAttention enables prefix sharing across requests using radix tree storage for efficient cache reuse.",
      activeNodes: ['memory-management', 'paged-attention', 'radix-attention'],
      activeEdges: ['e4', 'e7', 'e8']
    },
    {
      title: "System Integration and Performance",
      description: "Architectural changes like MQA/GQA and StreamingLLM combine with optimization strategies achieving 80% memory reduction, 2.1x speedup, enabling larger batch sizes in production systems like vLLM and TensorRT-LLM.",
      activeNodes: ['architectural-changes', 'performance-metrics', 'system-integration', 'optimization-principle'],
      activeEdges: ['e9', 'e10', 'e11', 'e12', 'e13', 'e14', 'e15']
    }
  ]
};