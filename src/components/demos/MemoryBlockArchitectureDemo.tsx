'use client';

import React, { useState, useEffect } from 'react';

type PhaseType = 'idle' | 'block-design' | 'hierarchy-setup' | 'caching-strategy' | 'version-control' | 'persistence-layer' | 'complete';
type BlockStatus = 'inactive' | 'initializing' | 'active' | 'cached' | 'versioned' | 'persisted';
type CacheLevel = 'hot' | 'warm' | 'cold' | 'disk';

interface MemoryBlock {
  id: string;
  name: string;
  type: 'profile' | 'history' | 'knowledge' | 'preferences' | 'tasks';
  schema: Record<string, string>;
  data: Record<string, any>;
  status: BlockStatus;
  version: number;
  cacheLevel: CacheLevel;
  accessCount: number;
  lastAccessed: number;
  sizeKB: number;
  parentBlock?: string;
  childBlocks: string[];
}

interface CacheStats {
  hotCount: number;
  warmCount: number;
  coldCount: number;
  diskCount: number;
  hitRate: number;
  totalAccesses: number;
}

interface Metrics {
  blockAccessSpeed: number;
  cacheHitRate: number;
  sessionContinuity: number;
  blockUtilization: number;
  relationshipIntegrity: number;
  versionConsistency: number;
}

const initialBlocks: MemoryBlock[] = [
  {
    id: 'block-profile',
    name: 'User Profile',
    type: 'profile',
    schema: { name: 'string', role: 'string', preferences: 'object' },
    data: { name: 'Alex Chen', role: 'Senior Engineer', preferences: {} },
    status: 'inactive',
    version: 1,
    cacheLevel: 'disk',
    accessCount: 0,
    lastAccessed: 0,
    sizeKB: 2.4,
    childBlocks: ['block-prefs'],
  },
  {
    id: 'block-history',
    name: 'Conversation History',
    type: 'history',
    schema: { messages: 'array', summary: 'string', timestamp: 'number' },
    data: { messages: [], summary: '', timestamp: Date.now() },
    status: 'inactive',
    version: 1,
    cacheLevel: 'disk',
    accessCount: 0,
    lastAccessed: 0,
    sizeKB: 5.8,
    childBlocks: [],
  },
  {
    id: 'block-knowledge',
    name: 'Knowledge Base',
    type: 'knowledge',
    schema: { facts: 'array', concepts: 'object', relationships: 'array' },
    data: { facts: ['Fact 1', 'Fact 2'], concepts: {}, relationships: [] },
    status: 'inactive',
    version: 1,
    cacheLevel: 'disk',
    accessCount: 0,
    lastAccessed: 0,
    sizeKB: 12.5,
    childBlocks: [],
  },
  {
    id: 'block-prefs',
    name: 'User Preferences',
    type: 'preferences',
    schema: { theme: 'string', language: 'string', notifications: 'boolean' },
    data: { theme: 'dark', language: 'en', notifications: true },
    status: 'inactive',
    version: 1,
    cacheLevel: 'disk',
    accessCount: 0,
    lastAccessed: 0,
    sizeKB: 1.2,
    parentBlock: 'block-profile',
    childBlocks: [],
  },
  {
    id: 'block-tasks',
    name: 'Active Tasks',
    type: 'tasks',
    schema: { pending: 'array', completed: 'array', priority: 'object' },
    data: { pending: ['Task A', 'Task B'], completed: [], priority: {} },
    status: 'inactive',
    version: 1,
    cacheLevel: 'disk',
    accessCount: 0,
    lastAccessed: 0,
    sizeKB: 3.6,
    childBlocks: [],
  },
];

export default function MemoryBlockArchitectureDemo() {
  const [phase, setPhase] = useState<PhaseType>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [blocks, setBlocks] = useState<MemoryBlock[]>(initialBlocks);
  const [cacheStats, setCacheStats] = useState<CacheStats>({
    hotCount: 0,
    warmCount: 0,
    coldCount: 0,
    diskCount: 5,
    hitRate: 0,
    totalAccesses: 0,
  });
  const [metrics, setMetrics] = useState<Metrics>({
    blockAccessSpeed: 0,
    cacheHitRate: 0,
    sessionContinuity: 0,
    blockUtilization: 0,
    relationshipIntegrity: 0,
    versionConsistency: 0,
  });

  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];
    const startTime = Date.now();

    if (phase === 'idle') {
      timeouts.push(setTimeout(() => setPhase('block-design'), 100));
    }

    else if (phase === 'block-design') {
      let blockIndex = 0;

      const initializeBlock = () => {
        if (blockIndex >= initialBlocks.length) {
          timeouts.push(setTimeout(() => setPhase('hierarchy-setup'), 300));
          return;
        }

        const block = initialBlocks[blockIndex];

        setBlocks(prev => prev.map(b =>
          b.id === block.id
            ? { ...b, status: 'initializing' as BlockStatus }
            : b
        ));

        timeouts.push(setTimeout(() => {
          setBlocks(prev => prev.map(b =>
            b.id === block.id
              ? { ...b, status: 'active' as BlockStatus }
              : b
          ));
        }, 150));

        blockIndex++;
        timeouts.push(setTimeout(initializeBlock, 200));
      };

      initializeBlock();
    }

    else if (phase === 'hierarchy-setup') {
      // Establish parent-child relationships
      const blockWithParent = blocks.find(b => b.parentBlock);

      if (blockWithParent) {
        setBlocks(prev => prev.map(b => {
          if (b.id === blockWithParent.id || b.id === blockWithParent.parentBlock) {
            return { ...b, status: 'active' as BlockStatus };
          }
          return b;
        }));
      }

      timeouts.push(setTimeout(() => setPhase('caching-strategy'), 500));
    }

    else if (phase === 'caching-strategy') {
      // Simulate access patterns and cache promotion
      const accessSequence = [
        'block-profile',  // High frequency
        'block-prefs',    // High frequency
        'block-history',  // Medium frequency
        'block-profile',  // High frequency
        'block-knowledge',// Low frequency
        'block-prefs',    // High frequency
        'block-tasks',    // Medium frequency
        'block-profile',  // High frequency
        'block-history',  // Medium frequency
        'block-prefs',    // High frequency
      ];

      let accessIndex = 0;

      const processAccess = () => {
        if (accessIndex >= accessSequence.length) {
          // Update cache statistics
          const hotCount = blocks.filter(b => b.cacheLevel === 'hot').length;
          const warmCount = blocks.filter(b => b.cacheLevel === 'warm').length;
          const coldCount = blocks.filter(b => b.cacheLevel === 'cold').length;
          const diskCount = blocks.filter(b => b.cacheLevel === 'disk').length;
          const totalAccesses = blocks.reduce((sum, b) => sum + b.accessCount, 0);
          const cacheHits = blocks.filter(b => b.cacheLevel === 'hot' || b.cacheLevel === 'warm').reduce((sum, b) => sum + b.accessCount, 0);
          const hitRate = totalAccesses > 0 ? (cacheHits / totalAccesses) * 100 : 0;

          setCacheStats({
            hotCount,
            warmCount,
            coldCount,
            diskCount,
            hitRate,
            totalAccesses,
          });

          timeouts.push(setTimeout(() => setPhase('version-control'), 300));
          return;
        }

        const blockId = accessSequence[accessIndex];
        const now = Date.now();

        setBlocks(prev => prev.map(b => {
          if (b.id === blockId) {
            const newAccessCount = b.accessCount + 1;

            // Promote to cache based on access frequency
            let newCacheLevel: CacheLevel = b.cacheLevel;
            if (newAccessCount >= 4) {
              newCacheLevel = 'hot';
            } else if (newAccessCount >= 2) {
              newCacheLevel = 'warm';
            } else if (newAccessCount >= 1) {
              newCacheLevel = 'cold';
            }

            return {
              ...b,
              status: 'cached' as BlockStatus,
              accessCount: newAccessCount,
              lastAccessed: now,
              cacheLevel: newCacheLevel,
            };
          }
          return b;
        }));

        accessIndex++;
        timeouts.push(setTimeout(processAccess, 150));
      };

      processAccess();
    }

    else if (phase === 'version-control') {
      // Simulate version updates for modified blocks
      const blocksToUpdate = ['block-profile', 'block-history', 'block-prefs'];

      let updateIndex = 0;

      const updateBlock = () => {
        if (updateIndex >= blocksToUpdate.length) {
          timeouts.push(setTimeout(() => setPhase('persistence-layer'), 300));
          return;
        }

        const blockId = blocksToUpdate[updateIndex];

        setBlocks(prev => prev.map(b =>
          b.id === blockId
            ? { ...b, version: b.version + 1, status: 'versioned' as BlockStatus }
            : b
        ));

        updateIndex++;
        timeouts.push(setTimeout(updateBlock, 200));
      };

      updateBlock();
    }

    else if (phase === 'persistence-layer') {
      // Persist all blocks to disk
      let persistIndex = 0;

      const persistBlock = () => {
        if (persistIndex >= blocks.length) {
          // Calculate final metrics
          const avgAccessSpeed = 15 + Math.random() * 10; // 15-25ms
          const cacheHitRate = cacheStats.hitRate;
          const sessionContinuity = 96 + Math.random() * 4;
          const activeBlocks = blocks.filter(b => b.accessCount > 0).length;
          const blockUtilization = (activeBlocks / blocks.length) * 100;
          const validRelationships = blocks.filter(b => {
            if (b.parentBlock) {
              return blocks.some(parent => parent.id === b.parentBlock);
            }
            return true;
          }).length;
          const relationshipIntegrity = (validRelationships / blocks.length) * 100;
          const versionConsistency = 98 + Math.random() * 2;

          setMetrics({
            blockAccessSpeed: avgAccessSpeed,
            cacheHitRate,
            sessionContinuity,
            blockUtilization,
            relationshipIntegrity,
            versionConsistency,
          });

          timeouts.push(setTimeout(() => setPhase('complete'), 400));
          return;
        }

        const block = blocks[persistIndex];

        setBlocks(prev => prev.map(b =>
          b.id === block.id
            ? { ...b, status: 'persisted' as BlockStatus }
            : b
        ));

        persistIndex++;
        timeouts.push(setTimeout(persistBlock, 120));
      };

      persistBlock();
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [phase, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setPhase('idle');
    setBlocks(initialBlocks);
    setCacheStats({
      hotCount: 0,
      warmCount: 0,
      coldCount: 0,
      diskCount: 5,
      hitRate: 0,
      totalAccesses: 0,
    });
    setMetrics({
      blockAccessSpeed: 0,
      cacheHitRate: 0,
      sessionContinuity: 0,
      blockUtilization: 0,
      relationshipIntegrity: 0,
      versionConsistency: 0,
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('idle');
    setBlocks(initialBlocks);
    setCacheStats({
      hotCount: 0,
      warmCount: 0,
      coldCount: 0,
      diskCount: 5,
      hitRate: 0,
      totalAccesses: 0,
    });
    setMetrics({
      blockAccessSpeed: 0,
      cacheHitRate: 0,
      sessionContinuity: 0,
      blockUtilization: 0,
      relationshipIntegrity: 0,
      versionConsistency: 0,
    });
  };

  const getPhaseStatus = (targetPhase: PhaseType): 'pending' | 'active' | 'completed' => {
    const phaseOrder: PhaseType[] = ['idle', 'block-design', 'hierarchy-setup', 'caching-strategy', 'version-control', 'persistence-layer', 'complete'];
    const currentIndex = phaseOrder.indexOf(phase);
    const targetIndex = phaseOrder.indexOf(targetPhase);

    if (currentIndex > targetIndex) return 'completed';
    if (currentIndex === targetIndex) return 'active';
    return 'pending';
  };

  const getStatusColor = (status: BlockStatus): string => {
    switch (status) {
      case 'initializing': return 'text-blue-400';
      case 'active': return 'text-purple-400';
      case 'cached': return 'text-yellow-400';
      case 'versioned': return 'text-cyan-400';
      case 'persisted': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getCacheLevelColor = (level: CacheLevel): string => {
    switch (level) {
      case 'hot': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'warm': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'cold': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'disk': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getBlockTypeIcon = (type: string): string => {
    switch (type) {
      case 'profile': return '👤';
      case 'history': return '📜';
      case 'knowledge': return '📚';
      case 'preferences': return '⚙️';
      case 'tasks': return '✓';
      default: return '📦';
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Memory Block Architecture</h3>
          <p className="text-gray-400 text-sm">
            Structured context management through discrete, functional memory blocks with intelligent caching
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Initialize Memory
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {(['block-design', 'hierarchy-setup', 'caching-strategy', 'version-control', 'persistence-layer'] as const).map((p) => {
            const status = getPhaseStatus(p);
            return (
              <div
                key={p}
                className={`p-3 rounded-lg border ${
                  status === 'completed'
                    ? 'bg-green-500/10 border-green-500/30'
                    : status === 'active'
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                <div className="text-xs font-medium text-gray-300 mb-1">
                  {p.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </div>
                <div className={`text-xs ${
                  status === 'completed' ? 'text-green-400' : status === 'active' ? 'text-blue-400' : 'text-gray-500'
                }`}>
                  {status === 'completed' ? '✓ Done' : status === 'active' ? '⟳ Running' : 'Pending'}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Memory Blocks</h4>
              <div className="space-y-2">
                {blocks.map((block) => (
                  <div
                    key={block.id}
                    className={`p-3 rounded-lg border ${
                      block.status === 'persisted'
                        ? 'bg-green-500/10 border-green-500/30'
                        : block.status === 'versioned'
                        ? 'bg-cyan-500/10 border-cyan-500/30'
                        : block.status === 'cached'
                        ? 'bg-yellow-500/10 border-yellow-500/30'
                        : block.status === 'active'
                        ? 'bg-purple-500/10 border-purple-500/30'
                        : block.status === 'initializing'
                        ? 'bg-blue-500/10 border-blue-500/30'
                        : 'bg-slate-800 border-slate-700'
                    }`}
                    style={{ marginLeft: block.parentBlock ? '20px' : '0' }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getBlockTypeIcon(block.type)}</span>
                        <div>
                          <div className="text-sm font-medium text-white">{block.name}</div>
                          {block.parentBlock && (
                            <div className="text-xs text-gray-500">
                              ↳ Child of {blocks.find(b => b.id === block.parentBlock)?.name}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className={`text-xs ${getStatusColor(block.status)}`}>
                        {block.status === 'inactive' ? 'Inactive' :
                         block.status === 'initializing' ? '⟳ Init' :
                         block.status === 'active' ? '✓ Active' :
                         block.status === 'cached' ? '⚡ Cached' :
                         block.status === 'versioned' ? 'v' + block.version :
                         '💾 Saved'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="text-xs">
                        <span className="text-gray-500">Size: </span>
                        <span className="text-gray-400 font-mono">{block.sizeKB}KB</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-500">Version: </span>
                        <span className="text-gray-400 font-mono">v{block.version}</span>
                      </div>
                      {block.accessCount > 0 && (
                        <>
                          <div className="text-xs">
                            <span className="text-gray-500">Accesses: </span>
                            <span className="text-blue-400 font-mono">{block.accessCount}</span>
                          </div>
                          <div className="text-xs">
                            <span className={`px-1.5 py-0.5 rounded border text-[10px] ${getCacheLevelColor(block.cacheLevel)}`}>
                              {block.cacheLevel.toUpperCase()}
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="text-xs text-gray-600">
                      Schema: {Object.keys(block.schema).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Cache Statistics</h4>
              <div className="space-y-2">
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-red-500/10 border border-red-500/30 rounded">
                      <div className="text-xs text-gray-400">Hot</div>
                      <div className="text-lg font-mono text-red-400">{cacheStats.hotCount}</div>
                    </div>
                    <div className="text-center p-2 bg-orange-500/10 border border-orange-500/30 rounded">
                      <div className="text-xs text-gray-400">Warm</div>
                      <div className="text-lg font-mono text-orange-400">{cacheStats.warmCount}</div>
                    </div>
                    <div className="text-center p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                      <div className="text-xs text-gray-400">Cold</div>
                      <div className="text-lg font-mono text-blue-400">{cacheStats.coldCount}</div>
                    </div>
                    <div className="text-center p-2 bg-gray-500/10 border border-gray-500/30 rounded">
                      <div className="text-xs text-gray-400">Disk</div>
                      <div className="text-lg font-mono text-gray-400">{cacheStats.diskCount}</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Cache Hit Rate</span>
                    <span className={`text-sm font-mono ${
                      cacheStats.hitRate > 0
                        ? cacheStats.hitRate >= 60 ? 'text-green-400' : 'text-yellow-400'
                        : 'text-gray-500'
                    }`}>
                      {cacheStats.hitRate > 0 ? `${cacheStats.hitRate.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Total accesses: {cacheStats.totalAccesses}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Architecture Metrics</h4>
              <div className="space-y-2">
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Block Access Speed</span>
                    <span className={`text-sm font-mono ${
                      metrics.blockAccessSpeed > 0 ? 'text-green-400' : 'text-gray-500'
                    }`}>
                      {metrics.blockAccessSpeed > 0 ? `${metrics.blockAccessSpeed.toFixed(1)}ms` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Cache Hit Rate</span>
                    <span className={`text-sm font-mono ${
                      metrics.cacheHitRate > 0
                        ? metrics.cacheHitRate >= 60 ? 'text-green-400' : 'text-yellow-400'
                        : 'text-gray-500'
                    }`}>
                      {metrics.cacheHitRate > 0 ? `${metrics.cacheHitRate.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Session Continuity</span>
                    <span className={`text-sm font-mono ${
                      metrics.sessionContinuity > 0 ? 'text-green-400' : 'text-gray-500'
                    }`}>
                      {metrics.sessionContinuity > 0 ? `${metrics.sessionContinuity.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Block Utilization</span>
                    <span className={`text-sm font-mono ${
                      metrics.blockUtilization > 0 ? 'text-blue-400' : 'text-gray-500'
                    }`}>
                      {metrics.blockUtilization > 0 ? `${metrics.blockUtilization.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Relationship Integrity</span>
                    <span className={`text-sm font-mono ${
                      metrics.relationshipIntegrity > 0 ? 'text-purple-400' : 'text-gray-500'
                    }`}>
                      {metrics.relationshipIntegrity > 0 ? `${metrics.relationshipIntegrity.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Version Consistency</span>
                    <span className={`text-sm font-mono ${
                      metrics.versionConsistency > 0 ? 'text-cyan-400' : 'text-gray-500'
                    }`}>
                      {metrics.versionConsistency > 0 ? `${metrics.versionConsistency.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Block Relationships</h4>
              <div className="space-y-2">
                {blocks.filter(b => b.childBlocks.length > 0 || b.parentBlock).map((block) => (
                  <div key={block.id} className="text-xs">
                    {block.parentBlock && (
                      <div className="text-gray-400">
                        {block.name} <span className="text-gray-600">↑ parent</span> {blocks.find(b => b.id === block.parentBlock)?.name}
                      </div>
                    )}
                    {block.childBlocks.length > 0 && (
                      <div className="text-gray-400">
                        {block.name} <span className="text-gray-600">↓ children</span> {block.childBlocks.map(cid => blocks.find(b => b.id === cid)?.name).join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="text-xs text-blue-300 font-medium mb-1">LRU Cache Strategy</div>
              <div className="text-xs text-gray-400">
                Blocks promoted to hot cache after 4+ accesses, warm after 2+, cold after 1+. Least recently used blocks demoted to disk.
              </div>
            </div>
          </div>
        </div>

        {phase === 'complete' && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="text-sm font-medium text-green-400 mb-2">
              ✓ Memory Block Architecture Initialized
            </div>
            <div className="text-xs text-gray-300 space-y-1">
              <div>• Initialized {blocks.length} memory blocks with structured schemas ({blocks.reduce((sum, b) => sum + b.sizeKB, 0).toFixed(1)}KB total)</div>
              <div>• Established hierarchical relationships: {blocks.filter(b => b.parentBlock || b.childBlocks.length > 0).length} blocks with parent/child links</div>
              <div>• LRU cache performance: {metrics.cacheHitRate.toFixed(1)}% hit rate with {cacheStats.hotCount} hot, {cacheStats.warmCount} warm blocks</div>
              <div>• Version control: {blocks.filter(b => b.version > 1).length} blocks updated with consistent versioning ({metrics.versionConsistency.toFixed(1)}%)</div>
              <div>• Cross-session persistence: {metrics.sessionContinuity.toFixed(1)}% continuity with {metrics.blockAccessSpeed.toFixed(1)}ms avg access speed</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}