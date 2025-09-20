import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const hierarchicalMemoryPattern: PatternScenario = {
  id: 'hierarchical-memory',
  title: 'Hierarchical Memory',
  initialNodes: [
    {
      id: 'information-input',
      position: { x: 400, y: 50 },
      data: { label: '📥 Information Input\n"Customer interaction data + context"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 350 },
    },
    // Memory Controller
    {
      id: 'memory-controller',
      position: { x: 375, y: 150 },
      data: { label: '🧠 Memory Controller\nTier management & routing' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 250 },
    },
    // Memory Tiers
    {
      id: 'working-memory',
      position: { x: 100, y: 250 },
      data: { label: '⚡ Working Memory\nTier 1: Immediate\n50 items | 5 min retention' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'short-term-memory',
      position: { x: 300, y: 250 },
      data: { label: '🔄 Short-term Memory\nTier 2: Recent\n200 items | 1 week retention' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'medium-term-memory',
      position: { x: 500, y: 250 },
      data: { label: '📊 Medium-term Memory\nTier 3: Important\n500 items | 1 month retention' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'long-term-memory',
      position: { x: 700, y: 250 },
      data: { label: '🗄️ Long-term Memory\nTier 4: Permanent\nUnlimited | No expiry' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    // Retention Policies
    {
      id: 'lru-policy',
      position: { x: 50, y: 380 },
      data: { label: '🕐 LRU Policy\nLeast Recently Used\nEviction strategy' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'frequency-policy',
      position: { x: 220, y: 380 },
      data: { label: '📈 Frequency Policy\nAccess count tracking\nPromotion trigger' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'importance-policy',
      position: { x: 390, y: 380 },
      data: { label: '⭐ Importance Policy\nCriticality scoring\nPriority retention' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'decay-policy',
      position: { x: 560, y: 380 },
      data: { label: '📉 Decay Policy\nTemporal relevance\nForgetting curve' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'consolidation-policy',
      position: { x: 730, y: 380 },
      data: { label: '🔗 Consolidation\nPattern extraction\nKnowledge merge' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    // Memory Operations
    {
      id: 'tier-promotion',
      position: { x: 100, y: 520 },
      data: { label: '⬆️ Tier Promotion\nMoving up hierarchy' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'tier-demotion',
      position: { x: 280, y: 520 },
      data: { label: '⬇️ Tier Demotion\nMoving down hierarchy' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'cross-tier-search',
      position: { x: 460, y: 520 },
      data: { label: '🔍 Cross-tier Search\nUnified retrieval' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'memory-compaction',
      position: { x: 640, y: 520 },
      data: { label: '🗜️ Compaction\nDefragmentation' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    // Access Patterns
    {
      id: 'hot-access',
      position: { x: 50, y: 640 },
      data: { label: '🔥 Hot Access\nFrequent queries\nWorking memory hit' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'warm-access',
      position: { x: 250, y: 640 },
      data: { label: '♨️ Warm Access\nRecent queries\nShort-term hit' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'cold-access',
      position: { x: 450, y: 640 },
      data: { label: '❄️ Cold Access\nHistorical queries\nLong-term retrieval' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'miss-handling',
      position: { x: 650, y: 640 },
      data: { label: '❌ Miss Handling\nNot found\nFallback strategy' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Performance Metrics
    {
      id: 'hit-ratio',
      position: { x: 100, y: 760 },
      data: { label: '📊 Hit Ratio\n95% L1, 85% L2\n70% L3, 100% L4' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'latency-profile',
      position: { x: 280, y: 760 },
      data: { label: '⏱️ Latency Profile\nL1: <10ms\nL2: <50ms\nL3: <200ms\nL4: <1s' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'memory-usage',
      position: { x: 460, y: 760 },
      data: { label: '💾 Memory Usage\nL1: 2MB\nL2: 10MB\nL3: 50MB\nL4: 500MB+' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'eviction-stats',
      position: { x: 640, y: 760 },
      data: { label: '📈 Eviction Stats\nLRU hits: 1.2K/hr\nPromotions: 450/hr' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    // Optimization
    {
      id: 'adaptive-sizing',
      position: { x: 150, y: 880 },
      data: { label: '🎯 Adaptive Sizing\nDynamic tier capacity' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'predictive-caching',
      position: { x: 320, y: 880 },
      data: { label: '🔮 Predictive Caching\nAnticipatory loading' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'policy-tuning',
      position: { x: 490, y: 880 },
      data: { label: '⚙️ Policy Tuning\nML-based optimization' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'garbage-collection',
      position: { x: 660, y: 880 },
      data: { label: '🗑️ Garbage Collection\nAutomatic cleanup' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'optimized-retrieval',
      position: { x: 400, y: 1000 },
      data: { label: '✨ Optimized Retrieval\nFast, efficient multi-tier memory access' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 380 },
    },
  ],
  initialEdges: [
    // Input to controller
    {
      id: 'input-controller',
      source: 'information-input',
      target: 'memory-controller',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
    },
    // Controller to tiers
    {
      id: 'controller-working',
      source: 'memory-controller',
      target: 'working-memory',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Store',
    },
    {
      id: 'controller-short',
      source: 'memory-controller',
      target: 'short-term-memory',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Route',
    },
    {
      id: 'controller-medium',
      source: 'memory-controller',
      target: 'medium-term-memory',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Route',
    },
    {
      id: 'controller-long',
      source: 'memory-controller',
      target: 'long-term-memory',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Route',
    },
    // Tier transitions
    {
      id: 'working-short',
      source: 'working-memory',
      target: 'short-term-memory',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeWidth: 2 },
      label: 'Promote',
      animated: true,
    },
    {
      id: 'short-medium',
      source: 'short-term-memory',
      target: 'medium-term-memory',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeWidth: 2 },
      label: 'Promote',
      animated: true,
    },
    {
      id: 'medium-long',
      source: 'medium-term-memory',
      target: 'long-term-memory',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeWidth: 2 },
      label: 'Promote',
      animated: true,
    },
    // Policies to tiers
    {
      id: 'lru-working',
      source: 'lru-policy',
      target: 'working-memory',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'frequency-short',
      source: 'frequency-policy',
      target: 'short-term-memory',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'importance-medium',
      source: 'importance-policy',
      target: 'medium-term-memory',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'decay-short',
      source: 'decay-policy',
      target: 'short-term-memory',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'consolidation-long',
      source: 'consolidation-policy',
      target: 'long-term-memory',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    // Memory operations
    {
      id: 'working-promotion',
      source: 'working-memory',
      target: 'tier-promotion',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'short-demotion',
      source: 'short-term-memory',
      target: 'tier-demotion',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'controller-search',
      source: 'memory-controller',
      target: 'cross-tier-search',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'long-compaction',
      source: 'long-term-memory',
      target: 'memory-compaction',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    // Access patterns
    {
      id: 'working-hot',
      source: 'working-memory',
      target: 'hot-access',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'short-warm',
      source: 'short-term-memory',
      target: 'warm-access',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'long-cold',
      source: 'long-term-memory',
      target: 'cold-access',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'search-miss',
      source: 'cross-tier-search',
      target: 'miss-handling',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '5 5' },
    },
    // Access to metrics
    {
      id: 'hot-hit',
      source: 'hot-access',
      target: 'hit-ratio',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'warm-latency',
      source: 'warm-access',
      target: 'latency-profile',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'cold-usage',
      source: 'cold-access',
      target: 'memory-usage',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'miss-eviction',
      source: 'miss-handling',
      target: 'eviction-stats',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    // Optimization connections
    {
      id: 'hit-adaptive',
      source: 'hit-ratio',
      target: 'adaptive-sizing',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'latency-predictive',
      source: 'latency-profile',
      target: 'predictive-caching',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'usage-policy',
      source: 'memory-usage',
      target: 'policy-tuning',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'eviction-gc',
      source: 'eviction-stats',
      target: 'garbage-collection',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    // Final output
    {
      id: 'adaptive-output',
      source: 'adaptive-sizing',
      target: 'optimized-retrieval',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'predictive-output',
      source: 'predictive-caching',
      target: 'optimized-retrieval',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'policy-output',
      source: 'policy-tuning',
      target: 'optimized-retrieval',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'gc-output',
      source: 'garbage-collection',
      target: 'optimized-retrieval',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
  ],
  steps: [
    {
      title: 'Information Input',
      description: 'New information arrives for storage',
      activeNodes: ['information-input', 'memory-controller'],
      activeEdges: ['input-controller'],
    },
    {
      title: 'Tier Routing',
      description: 'Controller routes to appropriate memory tier',
      activeNodes: ['memory-controller', 'working-memory', 'short-term-memory', 'medium-term-memory', 'long-term-memory'],
      activeEdges: ['controller-working', 'controller-short', 'controller-medium', 'controller-long'],
    },
    {
      title: 'Retention Policies',
      description: 'Apply tier-specific retention and eviction policies',
      activeNodes: ['lru-policy', 'frequency-policy', 'importance-policy', 'decay-policy', 'consolidation-policy'],
      activeEdges: ['lru-working', 'frequency-short', 'importance-medium', 'decay-short', 'consolidation-long'],
    },
    {
      title: 'Tier Promotion',
      description: 'Frequently accessed items promoted to higher tiers',
      activeNodes: ['working-memory', 'short-term-memory', 'medium-term-memory', 'long-term-memory'],
      activeEdges: ['working-short', 'short-medium', 'medium-long'],
    },
    {
      title: 'Memory Operations',
      description: 'Promotion, demotion, search, and compaction',
      activeNodes: ['tier-promotion', 'tier-demotion', 'cross-tier-search', 'memory-compaction'],
      activeEdges: ['working-promotion', 'short-demotion', 'controller-search', 'long-compaction'],
    },
    {
      title: 'Access Patterns',
      description: 'Different access patterns for different tiers',
      activeNodes: ['working-memory', 'short-term-memory', 'long-term-memory', 'hot-access', 'warm-access', 'cold-access'],
      activeEdges: ['working-hot', 'short-warm', 'long-cold'],
    },
    {
      title: 'Cross-tier Search',
      description: 'Searching across all memory tiers',
      activeNodes: ['cross-tier-search', 'working-memory', 'short-term-memory', 'medium-term-memory', 'long-term-memory', 'miss-handling'],
      activeEdges: ['controller-search', 'search-miss'],
    },
    {
      title: 'Performance Metrics',
      description: 'Tracking hit ratios, latency, and usage',
      activeNodes: ['hit-ratio', 'latency-profile', 'memory-usage', 'eviction-stats'],
      activeEdges: ['hot-hit', 'warm-latency', 'cold-usage', 'miss-eviction'],
    },
    {
      title: 'Optimization Strategies',
      description: 'Adaptive sizing, predictive caching, and tuning',
      activeNodes: ['adaptive-sizing', 'predictive-caching', 'policy-tuning', 'garbage-collection'],
      activeEdges: ['hit-adaptive', 'latency-predictive', 'usage-policy', 'eviction-gc'],
    },
    {
      title: 'Optimized Retrieval',
      description: 'Efficient multi-tier memory access achieved',
      activeNodes: ['adaptive-sizing', 'predictive-caching', 'policy-tuning', 'garbage-collection', 'optimized-retrieval'],
      activeEdges: ['adaptive-output', 'predictive-output', 'policy-output', 'gc-output'],
    },
  ],
};