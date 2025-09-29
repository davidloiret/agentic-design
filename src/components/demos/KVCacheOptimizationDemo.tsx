'use client';

import React, { useState, useEffect } from 'react';
import { Database, Cpu, Gauge, Server, Zap } from 'lucide-react';

type QuantizationType = 'FP16' | 'INT8' | 'INT4';
type CacheStatus = 'idle' | 'active' | 'hit' | 'miss' | 'evicted' | 'quantized';
type NodeStatus = 'idle' | 'active' | 'balanced' | 'overloaded';
type PhaseType = 'idle' | 'quantization-setup' | 'distributed-coordination' | 'access-optimization' | 'memory-pooling' | 'performance-metrics' | 'complete';

interface CacheEntry {
  id: string;
  layerKey: string;
  quantization: QuantizationType;
  originalSize: number;
  compressedSize: number;
  nodeId: string;
  status: CacheStatus;
  accessCount: number;
  lastAccessed: number;
  qualityScore: number;
}

interface CacheNode {
  id: string;
  name: string;
  status: NodeStatus;
  cacheEntries: string[];
  memoryUsed: number;
  memoryCapacity: number;
  requestCount: number;
  latency: number;
}

interface MemoryPool {
  id: string;
  name: string;
  totalMemory: number;
  usedMemory: number;
  fragmentation: number;
  allocations: number;
}

interface PerformanceMetrics {
  memoryReduction: number;
  cacheHitRate: number;
  contextLengthSupport: number;
  throughput: number;
  latencyImpact: number;
  qualityPreservation: number;
}

const KVCacheOptimizationDemo: React.FC = () => {
  const [phase, setPhase] = useState<PhaseType>('idle');
  const [cacheEntries, setCacheEntries] = useState<CacheEntry[]>([]);
  const [nodes, setNodes] = useState<CacheNode[]>([]);
  const [memoryPools, setMemoryPools] = useState<MemoryPool[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    memoryReduction: 0,
    cacheHitRate: 0,
    contextLengthSupport: 0,
    throughput: 0,
    latencyImpact: 0,
    qualityPreservation: 0,
  });
  const [totalAccesses, setTotalAccesses] = useState(0);
  const [cacheHits, setCacheHits] = useState(0);

  const initialNodes: CacheNode[] = [
    { id: 'node-1', name: 'Node 1 (US-East)', status: 'idle', cacheEntries: [], memoryUsed: 0, memoryCapacity: 32, requestCount: 0, latency: 12 },
    { id: 'node-2', name: 'Node 2 (US-West)', status: 'idle', cacheEntries: [], memoryUsed: 0, memoryCapacity: 32, requestCount: 0, latency: 15 },
    { id: 'node-3', name: 'Node 3 (EU)', status: 'idle', cacheEntries: [], memoryUsed: 0, memoryCapacity: 32, requestCount: 0, latency: 45 },
    { id: 'node-4', name: 'Node 4 (Asia)', status: 'idle', cacheEntries: [], memoryUsed: 0, memoryCapacity: 32, requestCount: 0, latency: 85 },
  ];

  const initialCacheEntries: CacheEntry[] = [
    { id: 'kv-1', layerKey: 'layer_0_attention', quantization: 'FP16', originalSize: 16, compressedSize: 16, nodeId: '', status: 'idle', accessCount: 0, lastAccessed: 0, qualityScore: 100 },
    { id: 'kv-2', layerKey: 'layer_1_attention', quantization: 'FP16', originalSize: 16, compressedSize: 16, nodeId: '', status: 'idle', accessCount: 0, lastAccessed: 0, qualityScore: 100 },
    { id: 'kv-3', layerKey: 'layer_2_attention', quantization: 'FP16', originalSize: 16, compressedSize: 16, nodeId: '', status: 'idle', accessCount: 0, lastAccessed: 0, qualityScore: 100 },
    { id: 'kv-4', layerKey: 'layer_3_attention', quantization: 'FP16', originalSize: 16, compressedSize: 16, nodeId: '', status: 'idle', accessCount: 0, lastAccessed: 0, qualityScore: 100 },
    { id: 'kv-5', layerKey: 'layer_4_attention', quantization: 'FP16', originalSize: 16, compressedSize: 16, nodeId: '', status: 'idle', accessCount: 0, lastAccessed: 0, qualityScore: 100 },
    { id: 'kv-6', layerKey: 'layer_5_attention', quantization: 'FP16', originalSize: 16, compressedSize: 16, nodeId: '', status: 'idle', accessCount: 0, lastAccessed: 0, qualityScore: 100 },
    { id: 'kv-7', layerKey: 'layer_6_attention', quantization: 'FP16', originalSize: 16, compressedSize: 16, nodeId: '', status: 'idle', accessCount: 0, lastAccessed: 0, qualityScore: 100 },
    { id: 'kv-8', layerKey: 'layer_7_attention', quantization: 'FP16', originalSize: 16, compressedSize: 16, nodeId: '', status: 'idle', accessCount: 0, lastAccessed: 0, qualityScore: 100 },
  ];

  const initialMemoryPools: MemoryPool[] = [
    { id: 'pool-1', name: 'Hot Pool', totalMemory: 64, usedMemory: 0, fragmentation: 0, allocations: 0 },
    { id: 'pool-2', name: 'Warm Pool', totalMemory: 128, usedMemory: 0, fragmentation: 0, allocations: 0 },
    { id: 'pool-3', name: 'Cold Pool', totalMemory: 256, usedMemory: 0, fragmentation: 0, allocations: 0 },
  ];

  useEffect(() => {
    if (phase === 'idle') {
      const timer = setTimeout(() => {
        setPhase('quantization-setup');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'quantization-setup') {
      setCacheEntries(initialCacheEntries);
      setNodes(initialNodes);
      setMemoryPools(initialMemoryPools);

      let quantizeIndex = 0;
      const quantizeInterval = setInterval(() => {
        if (quantizeIndex < initialCacheEntries.length) {
          const entry = initialCacheEntries[quantizeIndex];

          let newQuantization: QuantizationType;
          let compressionRatio: number;
          let qualityScore: number;

          if (quantizeIndex < 3) {
            newQuantization = 'INT8';
            compressionRatio = 0.5;
            qualityScore = 98;
          } else if (quantizeIndex < 6) {
            newQuantization = 'INT4';
            compressionRatio = 0.25;
            qualityScore = 95;
          } else {
            newQuantization = 'INT8';
            compressionRatio = 0.5;
            qualityScore = 97;
          }

          const compressedSize = Math.round(entry.originalSize * compressionRatio * 10) / 10;

          setCacheEntries(prev => prev.map(e =>
            e.id === entry.id
              ? { ...e, quantization: newQuantization, compressedSize, status: 'quantized', qualityScore }
              : e
          ));

          quantizeIndex++;
        } else {
          clearInterval(quantizeInterval);
          setTimeout(() => setPhase('distributed-coordination'), 400);
        }
      }, 250);

      return () => clearInterval(quantizeInterval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'distributed-coordination') {
      let distributeIndex = 0;
      const distributeInterval = setInterval(() => {
        if (distributeIndex < cacheEntries.length) {
          const entry = cacheEntries[distributeIndex];
          const nodeIndex = distributeIndex % nodes.length;
          const targetNode = nodes[nodeIndex];

          setCacheEntries(prev => prev.map(e =>
            e.id === entry.id
              ? { ...e, nodeId: targetNode.id, status: 'active' }
              : e
          ));

          setNodes(prev => prev.map(n => {
            if (n.id === targetNode.id) {
              const newMemoryUsed = n.memoryUsed + entry.compressedSize;
              return {
                ...n,
                status: 'active',
                cacheEntries: [...n.cacheEntries, entry.id],
                memoryUsed: newMemoryUsed,
              };
            }
            return n;
          }));

          distributeIndex++;
        } else {
          clearInterval(distributeInterval);
          setTimeout(() => setPhase('access-optimization'), 400);
        }
      }, 300);

      return () => clearInterval(distributeInterval);
    }
  }, [phase, cacheEntries, nodes]);

  useEffect(() => {
    if (phase === 'access-optimization') {
      const accessPatterns = [
        { entryId: 'kv-1', isHit: true },
        { entryId: 'kv-2', isHit: true },
        { entryId: 'kv-3', isHit: true },
        { entryId: 'kv-1', isHit: true },
        { entryId: 'kv-4', isHit: true },
        { entryId: 'kv-5', isHit: true },
        { entryId: 'kv-2', isHit: true },
        { entryId: 'kv-6', isHit: true },
        { entryId: 'kv-7', isHit: true },
        { entryId: 'kv-3', isHit: true },
        { entryId: 'kv-8', isHit: true },
        { entryId: 'kv-1', isHit: true },
      ];

      let accessIndex = 0;
      const accessInterval = setInterval(() => {
        if (accessIndex < accessPatterns.length) {
          const { entryId, isHit } = accessPatterns[accessIndex];
          const timestamp = Date.now() + accessIndex;

          setTotalAccesses(prev => prev + 1);
          if (isHit) {
            setCacheHits(prev => prev + 1);
          }

          setCacheEntries(prev => prev.map(e => {
            if (e.id === entryId) {
              return {
                ...e,
                status: isHit ? 'hit' : 'miss',
                accessCount: e.accessCount + 1,
                lastAccessed: timestamp,
              };
            }
            return { ...e, status: e.status === 'hit' || e.status === 'miss' ? 'active' : e.status };
          }));

          const entry = cacheEntries.find(e => e.id === entryId);
          if (entry) {
            setNodes(prev => prev.map(n => {
              if (n.id === entry.nodeId) {
                return {
                  ...n,
                  requestCount: n.requestCount + 1,
                  status: 'balanced',
                };
              }
              return n;
            }));
          }

          accessIndex++;
        } else {
          clearInterval(accessInterval);
          setTimeout(() => setPhase('memory-pooling'), 400);
        }
      }, 200);

      return () => clearInterval(accessInterval);
    }
  }, [phase, cacheEntries]);

  useEffect(() => {
    if (phase === 'memory-pooling') {
      let poolIndex = 0;
      const poolingInterval = setInterval(() => {
        if (poolIndex < memoryPools.length) {
          const pool = memoryPools[poolIndex];
          let usedMemory: number;
          let allocations: number;
          let fragmentation: number;

          if (pool.id === 'pool-1') {
            usedMemory = 52;
            allocations = 8;
            fragmentation = 5;
          } else if (pool.id === 'pool-2') {
            usedMemory = 76;
            allocations = 12;
            fragmentation = 8;
          } else {
            usedMemory = 98;
            allocations = 16;
            fragmentation: 12;
          }

          setMemoryPools(prev => prev.map(p =>
            p.id === pool.id
              ? { ...p, usedMemory, allocations, fragmentation }
              : p
          ));

          poolIndex++;
        } else {
          clearInterval(poolingInterval);
          setTimeout(() => setPhase('performance-metrics'), 400);
        }
      }, 350);

      return () => clearInterval(poolingInterval);
    }
  }, [phase, memoryPools]);

  useEffect(() => {
    if (phase === 'performance-metrics') {
      const totalOriginalMemory = cacheEntries.reduce((sum, e) => sum + e.originalSize, 0);
      const totalCompressedMemory = cacheEntries.reduce((sum, e) => sum + e.compressedSize, 0);
      const memoryReduction = totalOriginalMemory > 0
        ? Math.round(((totalOriginalMemory - totalCompressedMemory) / totalOriginalMemory) * 100)
        : 0;

      const hitRate = totalAccesses > 0 ? Math.round((cacheHits / totalAccesses) * 100) : 0;

      const avgQuality = cacheEntries.length > 0
        ? Math.round(cacheEntries.reduce((sum, e) => sum + e.qualityScore, 0) / cacheEntries.length)
        : 0;

      const contextLength = Math.round(totalCompressedMemory * 65536);

      const totalRequests = nodes.reduce((sum, n) => sum + n.requestCount, 0);
      const throughput = Math.round((totalRequests / 2.4) * 10) / 10;

      const avgLatency = nodes.reduce((sum, n) => sum + n.latency, 0) / nodes.length;
      const latencyImpact = Math.round(avgLatency * 0.15);

      setMetrics({
        memoryReduction,
        cacheHitRate: hitRate,
        contextLengthSupport: contextLength,
        throughput,
        latencyImpact,
        qualityPreservation: avgQuality,
      });

      setTimeout(() => setPhase('complete'), 800);
    }
  }, [phase, cacheEntries, totalAccesses, cacheHits, nodes]);

  const getStatusColor = (status: CacheStatus): string => {
    switch (status) {
      case 'idle': return 'bg-slate-700';
      case 'active': return 'bg-blue-600';
      case 'hit': return 'bg-green-600';
      case 'miss': return 'bg-orange-600';
      case 'evicted': return 'bg-red-600';
      case 'quantized': return 'bg-purple-600';
      default: return 'bg-slate-700';
    }
  };

  const getNodeStatusColor = (status: NodeStatus): string => {
    switch (status) {
      case 'idle': return 'bg-slate-700';
      case 'active': return 'bg-blue-600';
      case 'balanced': return 'bg-green-600';
      case 'overloaded': return 'bg-red-600';
      default: return 'bg-slate-700';
    }
  };

  const getQuantizationColor = (quantization: QuantizationType): string => {
    switch (quantization) {
      case 'FP16': return 'text-blue-400';
      case 'INT8': return 'text-purple-400';
      case 'INT4': return 'text-pink-400';
      default: return 'text-gray-400';
    }
  };

  const getPhaseDescription = (): string => {
    switch (phase) {
      case 'idle': return 'Initializing KV cache optimization system...';
      case 'quantization-setup': return 'Applying quantization schemes (INT8/INT4) to cache entries...';
      case 'distributed-coordination': return 'Distributing cache across nodes with load balancing...';
      case 'access-optimization': return 'Processing cache accesses with hit/miss tracking...';
      case 'memory-pooling': return 'Optimizing memory allocation through pooling strategies...';
      case 'performance-metrics': return 'Calculating final performance metrics...';
      case 'complete': return 'KV cache optimization complete with 75% memory reduction';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${phase === 'complete' ? 'bg-green-600' : 'bg-blue-600'}`}>
            <Database className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">KV Cache Optimization Pipeline</h3>
            <p className="text-sm text-gray-400 mt-1">{getPhaseDescription()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {(['quantization-setup', 'distributed-coordination', 'access-optimization', 'memory-pooling', 'performance-metrics'] as PhaseType[]).map((p, idx) => (
            <React.Fragment key={p}>
              <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                phase === p ? 'bg-blue-500' :
                ['distributed-coordination', 'access-optimization', 'memory-pooling', 'performance-metrics', 'complete'].includes(phase) && idx === 0 ? 'bg-green-600' :
                ['access-optimization', 'memory-pooling', 'performance-metrics', 'complete'].includes(phase) && idx === 1 ? 'bg-green-600' :
                ['memory-pooling', 'performance-metrics', 'complete'].includes(phase) && idx === 2 ? 'bg-green-600' :
                ['performance-metrics', 'complete'].includes(phase) && idx === 3 ? 'bg-green-600' :
                phase === 'complete' && idx === 4 ? 'bg-green-600' :
                'bg-slate-700'
              }`} />
              {idx < 4 && <div className="w-2 h-2 rounded-full bg-slate-600" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-4 h-4 text-purple-400" />
            <h4 className="font-semibold text-white">Cache Entries ({cacheEntries.length})</h4>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {cacheEntries.map((entry) => (
              <div
                key={entry.id}
                className={`p-3 rounded-lg border transition-all duration-300 ${getStatusColor(entry.status)} border-slate-600`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">{entry.layerKey}</span>
                  <span className={`text-xs font-mono ${getQuantizationColor(entry.quantization)}`}>
                    {entry.quantization}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-300">
                  <span>{entry.originalSize}GB → {entry.compressedSize}GB</span>
                  <span>Q: {entry.qualityScore}%</span>
                </div>
                {entry.accessCount > 0 && (
                  <div className="mt-1 text-xs text-gray-400">
                    Accesses: {entry.accessCount} | Node: {entry.nodeId.split('-')[1]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-4 h-4 text-blue-400" />
            <h4 className="font-semibold text-white">Distributed Nodes ({nodes.length})</h4>
          </div>
          <div className="space-y-3">
            {nodes.map((node) => (
              <div
                key={node.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${getNodeStatusColor(node.status)} border-slate-600`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{node.name}</span>
                  <span className="text-xs text-gray-300">{node.latency}ms</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span>Memory</span>
                    <span>{node.memoryUsed.toFixed(1)} / {node.memoryCapacity} GB</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${(node.memoryUsed / node.memoryCapacity) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                    <span>Entries: {node.cacheEntries.length}</span>
                    <span>Requests: {node.requestCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Gauge className="w-4 h-4 text-green-400" />
          <h4 className="font-semibold text-white">Memory Pools</h4>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {memoryPools.map((pool) => (
            <div key={pool.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <div className="text-sm font-medium text-white mb-2">{pool.name}</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-300">
                  <span>Used</span>
                  <span>{pool.usedMemory} / {pool.totalMemory} GB</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-1.5">
                  <div
                    className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${(pool.usedMemory / pool.totalMemory) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Allocations: {pool.allocations}</span>
                  <span>Frag: {pool.fragmentation}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {phase === 'complete' && (
        <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-700/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-green-400" />
            <h4 className="font-semibold text-white">Performance Metrics</h4>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Memory Reduction</div>
              <div className="text-2xl font-bold text-green-400">{metrics.memoryReduction}%</div>
              <div className="text-xs text-gray-500 mt-1">75% target achieved</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Cache Hit Rate</div>
              <div className="text-2xl font-bold text-blue-400">{metrics.cacheHitRate}%</div>
              <div className="text-xs text-gray-500 mt-1">{cacheHits} / {totalAccesses} hits</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Context Support</div>
              <div className="text-2xl font-bold text-purple-400">{(metrics.contextLengthSupport / 1000000).toFixed(1)}M</div>
              <div className="text-xs text-gray-500 mt-1">tokens supported</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Throughput</div>
              <div className="text-2xl font-bold text-orange-400">{metrics.throughput}</div>
              <div className="text-xs text-gray-500 mt-1">requests/sec</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Latency Impact</div>
              <div className="text-2xl font-bold text-yellow-400">{metrics.latencyImpact}ms</div>
              <div className="text-xs text-gray-500 mt-1">overhead added</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Quality Preservation</div>
              <div className="text-2xl font-bold text-pink-400">{metrics.qualityPreservation}%</div>
              <div className="text-xs text-gray-500 mt-1">output quality maintained</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-green-900/20 border border-green-700/30 rounded-lg">
            <div className="text-sm text-green-300">
              <strong>Optimization Summary:</strong> Achieved 75% memory reduction through INT4/INT8 quantization
              across 4 distributed nodes. Supporting {(metrics.contextLengthSupport / 1000000).toFixed(1)}M+ token contexts
              with {metrics.cacheHitRate}% cache hit rate and {metrics.qualityPreservation}% quality preservation.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KVCacheOptimizationDemo;