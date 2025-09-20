import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const distributedMemoryArchitecturesPattern: PatternScenario = {
  id: 'distributed-memory-architectures',
  title: 'Distributed Memory Architectures',
  description: 'Scalable memory systems distributed across multiple nodes with load balancing, replication, and consistency mechanisms to handle large-scale agent memory requirements.',
  initialNodes: [
    {
      id: 'memory-request',
      position: { x: 400, y: 50 },
      data: { label: '🌐 Distributed Memory Request\n"Access knowledge across multiple nodes and regions"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 420 },
    },
    // Central Coordinator
    {
      id: 'memory-orchestrator',
      position: { x: 375, y: 150 },
      data: { label: '🎛️ Memory Orchestrator\nDistributed coordination & routing' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 250 },
    },
    // Memory Nodes
    {
      id: 'node-region-1',
      position: { x: 100, y: 250 },
      data: { label: '📍 Region 1\nNorth America\nLocal memories' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'node-region-2',
      position: { x: 300, y: 250 },
      data: { label: '📍 Region 2\nEurope\nLocal memories' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'node-region-3',
      position: { x: 500, y: 250 },
      data: { label: '📍 Region 3\nAsia Pacific\nLocal memories' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'node-region-4',
      position: { x: 700, y: 250 },
      data: { label: '📍 Region 4\nGlobal Edge\nCache nodes' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    // Storage Layers
    {
      id: 'local-cache',
      position: { x: 50, y: 380 },
      data: { label: '💨 Local Cache\nHot data\n<10ms latency' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'regional-storage',
      position: { x: 220, y: 380 },
      data: { label: '🗄️ Regional Storage\nFrequent access\n<50ms latency' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'global-repository',
      position: { x: 390, y: 380 },
      data: { label: '🌍 Global Repository\nComplete dataset\n<200ms latency' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'archive-storage',
      position: { x: 560, y: 380 },
      data: { label: '📦 Archive Storage\nCold data\n<1s latency' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'backup-replicas',
      position: { x: 730, y: 380 },
      data: { label: '🔐 Backup Replicas\nDisaster recovery\nRedundancy' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    // Distribution Mechanisms
    {
      id: 'partitioning-strategy',
      position: { x: 100, y: 520 },
      data: { label: '✂️ Partitioning\nData sharding\nLoad distribution' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'replication-manager',
      position: { x: 280, y: 520 },
      data: { label: '📋 Replication\nCopy management\nConsistency' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'synchronization-service',
      position: { x: 460, y: 520 },
      data: { label: '🔄 Synchronization\nCross-node sync\nConflict resolution' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'routing-optimizer',
      position: { x: 640, y: 520 },
      data: { label: '🛣️ Routing\nOptimal path\nLoad balancing' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    // Consistency Models
    {
      id: 'strong-consistency',
      position: { x: 50, y: 640 },
      data: { label: '🔒 Strong Consistency\nLinearizable\nImmediate sync' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'eventual-consistency',
      position: { x: 250, y: 640 },
      data: { label: '🔄 Eventual Consistency\nConverges over time\nHigh availability' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'causal-consistency',
      position: { x: 450, y: 640 },
      data: { label: '➡️ Causal Consistency\nOrder preserved\nRelated operations' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'read-write-quorum',
      position: { x: 650, y: 640 },
      data: { label: '📊 Quorum\nMajority agreement\nTunable consistency' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Fault Tolerance
    {
      id: 'failure-detector',
      position: { x: 100, y: 760 },
      data: { label: '🚨 Failure Detection\nNode monitoring\nHealth checks' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'failover-controller',
      position: { x: 280, y: 760 },
      data: { label: '🔀 Failover\nAutomatic switching\nBackup activation' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'recovery-manager',
      position: { x: 460, y: 760 },
      data: { label: '🔧 Recovery\nData restoration\nRebuild process' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'consensus-protocol',
      position: { x: 640, y: 760 },
      data: { label: '🤝 Consensus\nRaft/Paxos\nAgreement protocol' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    // Performance Optimization
    {
      id: 'cdn-integration',
      position: { x: 150, y: 880 },
      data: { label: '🌐 CDN Integration\nEdge caching\nGlobal delivery' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'compression-layer',
      position: { x: 350, y: 880 },
      data: { label: '🗜️ Compression\nData reduction\nBandwidth saving' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'prefetch-engine',
      position: { x: 550, y: 880 },
      data: { label: '🔮 Prefetching\nPredictive loading\nLatency reduction' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'distributed-response',
      position: { x: 400, y: 1000 },
      data: { label: '✨ Distributed Response\nFast, reliable, globally distributed memory access' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Request to orchestrator
    {
      id: 'request-orchestrator',
      source: 'memory-request',
      target: 'memory-orchestrator',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
    },
    // Orchestrator to regions
    {
      id: 'orchestrator-region1',
      source: 'memory-orchestrator',
      target: 'node-region-1',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Route',
    },
    {
      id: 'orchestrator-region2',
      source: 'memory-orchestrator',
      target: 'node-region-2',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Route',
    },
    {
      id: 'orchestrator-region3',
      source: 'memory-orchestrator',
      target: 'node-region-3',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Route',
    },
    {
      id: 'orchestrator-region4',
      source: 'memory-orchestrator',
      target: 'node-region-4',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Route',
    },
    // Regions to storage
    {
      id: 'region1-cache',
      source: 'node-region-1',
      target: 'local-cache',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'region2-regional',
      source: 'node-region-2',
      target: 'regional-storage',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'region3-global',
      source: 'node-region-3',
      target: 'global-repository',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'region4-archive',
      source: 'node-region-4',
      target: 'archive-storage',
      style: { ...edgeStyle, stroke: '#7c3aed' },
    },
    // Inter-region connections
    {
      id: 'region1-region2',
      source: 'node-region-1',
      target: 'node-region-2',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeDasharray: '3 3' },
      label: 'Sync',
    },
    {
      id: 'region2-region3',
      source: 'node-region-2',
      target: 'node-region-3',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeDasharray: '3 3' },
      label: 'Sync',
    },
    {
      id: 'region3-region4',
      source: 'node-region-3',
      target: 'node-region-4',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeDasharray: '3 3' },
      label: 'Sync',
    },
    // Storage to backup
    {
      id: 'global-backup',
      source: 'global-repository',
      target: 'backup-replicas',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
      label: 'Backup',
    },
    // Storage to mechanisms
    {
      id: 'cache-partitioning',
      source: 'local-cache',
      target: 'partitioning-strategy',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'regional-replication',
      source: 'regional-storage',
      target: 'replication-manager',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'global-sync',
      source: 'global-repository',
      target: 'synchronization-service',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'archive-routing',
      source: 'archive-storage',
      target: 'routing-optimizer',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    // Mechanisms to consistency
    {
      id: 'partitioning-strong',
      source: 'partitioning-strategy',
      target: 'strong-consistency',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'replication-eventual',
      source: 'replication-manager',
      target: 'eventual-consistency',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'sync-causal',
      source: 'synchronization-service',
      target: 'causal-consistency',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'routing-quorum',
      source: 'routing-optimizer',
      target: 'read-write-quorum',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    // Consistency to fault tolerance
    {
      id: 'strong-failure',
      source: 'strong-consistency',
      target: 'failure-detector',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'eventual-failover',
      source: 'eventual-consistency',
      target: 'failover-controller',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'causal-recovery',
      source: 'causal-consistency',
      target: 'recovery-manager',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'quorum-consensus',
      source: 'read-write-quorum',
      target: 'consensus-protocol',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    // Fault tolerance to optimization
    {
      id: 'failure-cdn',
      source: 'failure-detector',
      target: 'cdn-integration',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'failover-compression',
      source: 'failover-controller',
      target: 'compression-layer',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'recovery-prefetch',
      source: 'recovery-manager',
      target: 'prefetch-engine',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    // Consensus feedback
    {
      id: 'consensus-orchestrator',
      source: 'consensus-protocol',
      target: 'memory-orchestrator',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '5 5' },
      label: 'Consensus',
    },
    // Optimization to response
    {
      id: 'cdn-response',
      source: 'cdn-integration',
      target: 'distributed-response',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'compression-response',
      source: 'compression-layer',
      target: 'distributed-response',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'prefetch-response',
      source: 'prefetch-engine',
      target: 'distributed-response',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
  ],
  steps: [
    {
      title: 'Memory Request',
      description: 'Distributed memory request arrives at orchestrator',
      activeNodes: ['memory-request', 'memory-orchestrator'],
      activeEdges: ['request-orchestrator'],
    },
    {
      title: 'Regional Distribution',
      description: 'Request routed to appropriate regional nodes',
      activeNodes: ['memory-orchestrator', 'node-region-1', 'node-region-2', 'node-region-3', 'node-region-4'],
      activeEdges: ['orchestrator-region1', 'orchestrator-region2', 'orchestrator-region3', 'orchestrator-region4'],
    },
    {
      title: 'Storage Access',
      description: 'Accessing different storage layers based on data locality',
      activeNodes: ['node-region-1', 'node-region-2', 'node-region-3', 'node-region-4', 'local-cache', 'regional-storage', 'global-repository', 'archive-storage'],
      activeEdges: ['region1-cache', 'region2-regional', 'region3-global', 'region4-archive'],
    },
    {
      title: 'Inter-Region Sync',
      description: 'Synchronizing data across regions',
      activeNodes: ['node-region-1', 'node-region-2', 'node-region-3', 'node-region-4'],
      activeEdges: ['region1-region2', 'region2-region3', 'region3-region4'],
    },
    {
      title: 'Backup & Replication',
      description: 'Maintaining backup replicas for fault tolerance',
      activeNodes: ['global-repository', 'backup-replicas'],
      activeEdges: ['global-backup'],
    },
    {
      title: 'Distribution Mechanisms',
      description: 'Partitioning, replication, synchronization, and routing',
      activeNodes: ['partitioning-strategy', 'replication-manager', 'synchronization-service', 'routing-optimizer'],
      activeEdges: ['cache-partitioning', 'regional-replication', 'global-sync', 'archive-routing'],
    },
    {
      title: 'Consistency Models',
      description: 'Applying appropriate consistency guarantees',
      activeNodes: ['strong-consistency', 'eventual-consistency', 'causal-consistency', 'read-write-quorum'],
      activeEdges: ['partitioning-strong', 'replication-eventual', 'sync-causal', 'routing-quorum'],
    },
    {
      title: 'Fault Tolerance',
      description: 'Detecting failures and managing recovery',
      activeNodes: ['failure-detector', 'failover-controller', 'recovery-manager', 'consensus-protocol'],
      activeEdges: ['strong-failure', 'eventual-failover', 'causal-recovery', 'quorum-consensus'],
    },
    {
      title: 'Consensus Feedback',
      description: 'Consensus protocol updates orchestrator',
      activeNodes: ['consensus-protocol', 'memory-orchestrator'],
      activeEdges: ['consensus-orchestrator'],
    },
    {
      title: 'Performance Optimization',
      description: 'CDN integration, compression, and prefetching',
      activeNodes: ['cdn-integration', 'compression-layer', 'prefetch-engine'],
      activeEdges: ['failure-cdn', 'failover-compression', 'recovery-prefetch'],
    },
    {
      title: 'Distributed Response',
      description: 'Optimized response delivered from distributed architecture',
      activeNodes: ['cdn-integration', 'compression-layer', 'prefetch-engine', 'distributed-response'],
      activeEdges: ['cdn-response', 'compression-response', 'prefetch-response'],
    },
  ],
};