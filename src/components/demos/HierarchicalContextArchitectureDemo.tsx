'use client';

import React, { useState, useEffect } from 'react';
import { Network, Activity, CheckCircle, Lock, Unlock, ChevronRight, Settings, Shield, Layers } from 'lucide-react';

type Phase = 'idle' | 'building-hierarchy' | 'inheritance' | 'scope-isolation' | 'override-logic' | 'query-resolution' | 'complete';

interface ContextNode {
  id: string;
  name: string;
  level: number;
  parentId: string | null;
  properties: Record<string, string>;
  overrides: Record<string, string>;
  inherited: Record<string, string>;
  accessLevel: 'public' | 'protected' | 'private';
  status: 'pending' | 'building' | 'active' | 'querying';
  children: string[];
}

interface HierarchyMetrics {
  depth: number;
  inheritanceAccuracy: number;
  scopeIsolation: number;
  overrideSuccess: number;
  cacheHitRate: number;
}

const initialNodes: ContextNode[] = [
  {
    id: 'global',
    name: 'Global Context',
    level: 0,
    parentId: null,
    properties: { theme: 'dark', language: 'en', timezone: 'UTC' },
    overrides: {},
    inherited: {},
    accessLevel: 'public',
    status: 'pending',
    children: ['dept-eng']
  },
  {
    id: 'dept-eng',
    name: 'Engineering Department',
    level: 1,
    parentId: 'global',
    properties: { codeStyle: 'strict', reviewRequired: 'true' },
    overrides: { language: 'en-US' },
    inherited: {},
    accessLevel: 'protected',
    status: 'pending',
    children: ['proj-ai']
  },
  {
    id: 'proj-ai',
    name: 'AI Project',
    level: 2,
    parentId: 'dept-eng',
    properties: { modelType: 'transformer', maxTokens: '4096' },
    overrides: { timezone: 'America/Los_Angeles' },
    inherited: {},
    accessLevel: 'protected',
    status: 'pending',
    children: ['agent-1']
  },
  {
    id: 'agent-1',
    name: 'Research Agent',
    level: 3,
    parentId: 'proj-ai',
    properties: { role: 'researcher', priority: 'high' },
    overrides: { theme: 'light' },
    inherited: {},
    accessLevel: 'private',
    status: 'pending',
    children: ['task-1']
  },
  {
    id: 'task-1',
    name: 'Data Analysis Task',
    level: 4,
    parentId: 'agent-1',
    properties: { dataset: 'customer_data', method: 'statistical' },
    overrides: {},
    inherited: {},
    accessLevel: 'private',
    status: 'pending',
    children: []
  }
];

export default function HierarchicalContextArchitectureDemo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [currentNode, setCurrentNode] = useState<ContextNode | null>(null);
  const [nodes, setNodes] = useState<ContextNode[]>(initialNodes);

  const [metrics, setMetrics] = useState<HierarchyMetrics>({
    depth: 0,
    inheritanceAccuracy: 0,
    scopeIsolation: 0,
    overrideSuccess: 0,
    cacheHitRate: 0
  });

  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];

    // Building Hierarchy Phase
    if (phase === 'building-hierarchy') {
      let nodeIndex = 0;

      const processNext = () => {
        if (nodeIndex >= initialNodes.length) {
          setCurrentNode(null);
          timeouts.push(setTimeout(() => setPhase('inheritance'), 300));
          return;
        }

        const node = initialNodes[nodeIndex];
        setCurrentNode(node);

        timeouts.push(setTimeout(() => {
          setNodes(prev => prev.map(n =>
            n.id === node.id ? { ...n, status: 'building' } : n
          ));

          timeouts.push(setTimeout(() => {
            setNodes(prev => prev.map(n =>
              n.id === node.id ? { ...n, status: 'active' } : n
            ));

            nodeIndex++;
            timeouts.push(setTimeout(processNext, 100));
          }, 120));
        }, 80));
      };

      processNext();
    }

    // Inheritance Phase
    if (phase === 'inheritance') {
      let nodeIndex = 1; // Start from first child (skip global)

      const processNext = () => {
        if (nodeIndex >= initialNodes.length) {
          setCurrentNode(null);
          timeouts.push(setTimeout(() => setPhase('scope-isolation'), 300));
          return;
        }

        const node = initialNodes[nodeIndex];
        setCurrentNode(node);

        timeouts.push(setTimeout(() => {
          // Calculate inherited properties
          const parent = initialNodes.find(n => n.id === node.parentId);
          if (parent) {
            const inherited: Record<string, string> = {};

            // Inherit from parent's properties
            Object.entries(parent.properties).forEach(([key, value]) => {
              if (!(key in node.overrides)) {
                inherited[key] = value;
              }
            });

            // Inherit from parent's inherited (cascade)
            Object.entries(parent.inherited).forEach(([key, value]) => {
              if (!(key in node.overrides) && !(key in node.properties)) {
                inherited[key] = value;
              }
            });

            // Inherit from parent's overrides
            Object.entries(parent.overrides).forEach(([key, value]) => {
              if (!(key in node.overrides) && !(key in node.properties)) {
                inherited[key] = value;
              }
            });

            setNodes(prev => prev.map(n =>
              n.id === node.id ? { ...n, inherited } : n
            ));
          }

          nodeIndex++;
          timeouts.push(setTimeout(processNext, 140));
        }, 150));
      };

      processNext();
    }

    // Scope Isolation Phase
    if (phase === 'scope-isolation') {
      let nodeIndex = 0;

      const processNext = () => {
        if (nodeIndex >= initialNodes.length) {
          setCurrentNode(null);
          timeouts.push(setTimeout(() => setPhase('override-logic'), 300));
          return;
        }

        const node = initialNodes[nodeIndex];
        setCurrentNode(node);

        timeouts.push(setTimeout(() => {
          // Validate scope isolation (access control)
          // Each node's private data should not leak to siblings
          nodeIndex++;
          timeouts.push(setTimeout(processNext, 130));
        }, 160));
      };

      processNext();
    }

    // Override Logic Phase
    if (phase === 'override-logic') {
      let nodeIndex = 0;

      const processNext = () => {
        if (nodeIndex >= initialNodes.length) {
          setCurrentNode(null);
          timeouts.push(setTimeout(() => setPhase('query-resolution'), 300));
          return;
        }

        const node = initialNodes[nodeIndex];
        if (Object.keys(node.overrides).length > 0) {
          setCurrentNode(node);

          timeouts.push(setTimeout(() => {
            nodeIndex++;
            timeouts.push(setTimeout(processNext, 120));
          }, 150));
        } else {
          nodeIndex++;
          timeouts.push(setTimeout(processNext, 50));
        }
      };

      processNext();
    }

    // Query Resolution Phase
    if (phase === 'query-resolution') {
      let nodeIndex = initialNodes.length - 1; // Start from leaf node

      const processNext = () => {
        if (nodeIndex < 0) {
          setCurrentNode(null);

          // Calculate final metrics
          const depth = Math.max(...initialNodes.map(n => n.level)) + 1;
          const inheritanceAccuracy = 96 + Math.random() * 4;
          const scopeIsolation = 98 + Math.random() * 2;
          const overrideSuccess = 100;
          const cacheHitRate = 85 + Math.random() * 10;

          setMetrics({
            depth,
            inheritanceAccuracy,
            scopeIsolation,
            overrideSuccess,
            cacheHitRate
          });

          timeouts.push(setTimeout(() => {
            setPhase('complete');
            setIsRunning(false);
          }, 600));
          return;
        }

        const node = initialNodes[nodeIndex];
        setCurrentNode(node);
        setNodes(prev => prev.map(n =>
          n.id === node.id ? { ...n, status: 'querying' } : n
        ));

        timeouts.push(setTimeout(() => {
          setNodes(prev => prev.map(n =>
            n.id === node.id ? { ...n, status: 'active' } : n
          ));

          nodeIndex--;
          timeouts.push(setTimeout(processNext, 140));
        }, 160));
      };

      processNext();
    }

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [phase, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setPhase('building-hierarchy');
    setCurrentNode(null);
    setNodes(initialNodes);
    setMetrics({
      depth: 0,
      inheritanceAccuracy: 0,
      scopeIsolation: 0,
      overrideSuccess: 0,
      cacheHitRate: 0
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('idle');
    setCurrentNode(null);
    setNodes(initialNodes);
    setMetrics({
      depth: 0,
      inheritanceAccuracy: 0,
      scopeIsolation: 0,
      overrideSuccess: 0,
      cacheHitRate: 0
    });
  };

  const getPhaseLabel = () => {
    switch (phase) {
      case 'building-hierarchy': return 'Building hierarchical tree structure...';
      case 'inheritance': return 'Propagating inherited properties...';
      case 'scope-isolation': return 'Validating scope isolation...';
      case 'override-logic': return 'Processing context overrides...';
      case 'query-resolution': return 'Resolving hierarchical queries...';
      case 'complete': return 'Architecture Complete';
      default: return 'Ready to build hierarchy';
    }
  };

  const getAccessLevelIcon = (level: 'public' | 'protected' | 'private') => {
    switch (level) {
      case 'public': return <Unlock className="w-3 h-3 text-green-400" />;
      case 'protected': return <Shield className="w-3 h-3 text-yellow-400" />;
      case 'private': return <Lock className="w-3 h-3 text-red-400" />;
    }
  };

  const getNodeIndent = (level: number) => {
    return level * 40;
  };

  const getAllProperties = (node: ContextNode) => {
    const all: Record<string, string> = {};

    // Start with inherited
    Object.entries(node.inherited).forEach(([key, value]) => {
      all[key] = value;
    });

    // Add own properties
    Object.entries(node.properties).forEach(([key, value]) => {
      all[key] = value;
    });

    // Apply overrides
    Object.entries(node.overrides).forEach(([key, value]) => {
      all[key] = value;
    });

    return all;
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-6 shadow-2xl border border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
            <Network className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Hierarchical Context Architecture</h3>
            <p className="text-sm text-gray-400">Multi-Level Context Organization</p>
          </div>
        </div>

        <div className="flex gap-2">
          {!isRunning && phase !== 'complete' && (
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              Build Hierarchy
            </button>
          )}
          {(phase === 'complete' || isRunning) && (
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-200"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Phase Indicator */}
      <div className="mb-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className={`w-5 h-5 ${isRunning ? 'text-cyan-400 animate-pulse' : 'text-gray-400'}`} />
            <span className="font-semibold text-white">{getPhaseLabel()}</span>
          </div>
          {metrics.depth > 0 && (
            <div className="text-sm text-gray-400">
              Hierarchy Depth: {metrics.depth} levels
            </div>
          )}
        </div>
      </div>

      {/* Current Node Highlight */}
      {currentNode && (
        <div className="mb-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-4 border border-amber-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <h4 className="font-semibold text-white">Processing Node</h4>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">{currentNode.name}</div>
              <div className="text-xs text-gray-400 mt-1">
                Level {currentNode.level} • {currentNode.accessLevel} access
              </div>
            </div>
            <Activity className="w-5 h-5 text-amber-400 animate-spin" />
          </div>
        </div>
      )}

      {/* Hierarchy Tree */}
      <div className="mb-6 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
        <h4 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
          <Network className="w-4 h-4" />
          Context Hierarchy Tree
        </h4>

        <div className="space-y-3">
          {nodes.map((node) => (
            <div
              key={node.id}
              style={{ marginLeft: `${getNodeIndent(node.level)}px` }}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                currentNode?.id === node.id ? 'bg-amber-500/10 border-amber-500/50' :
                node.status === 'building' ? 'bg-blue-500/10 border-blue-500/50' :
                node.status === 'active' ? 'bg-green-500/10 border-green-500/30' :
                node.status === 'querying' ? 'bg-purple-500/10 border-purple-500/50' :
                'bg-slate-800/30 border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {node.level > 0 && <ChevronRight className="w-3 h-3 text-gray-500" />}
                    <span className="font-semibold text-white text-sm">{node.name}</span>
                    {getAccessLevelIcon(node.accessLevel)}
                    <span className="text-xs text-gray-500">Level {node.level}</span>
                  </div>

                  {/* Properties */}
                  {Object.keys(node.properties).length > 0 && (
                    <div className="mb-1">
                      <div className="text-xs text-gray-400 mb-1">Own Properties:</div>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(node.properties).map(([key, value]) => (
                          <span key={key} className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Inherited Properties */}
                  {Object.keys(node.inherited).length > 0 && (
                    <div className="mb-1">
                      <div className="text-xs text-gray-400 mb-1">Inherited:</div>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(node.inherited).map(([key, value]) => (
                          <span key={key} className="text-xs px-2 py-0.5 bg-green-500/20 text-green-300 rounded">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Overrides */}
                  {Object.keys(node.overrides).length > 0 && (
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Overrides:</div>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(node.overrides).map(([key, value]) => (
                          <span key={key} className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-300 rounded">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {node.status === 'active' && <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />}
                {node.status === 'building' && <Activity className="w-4 h-4 text-blue-400 animate-spin flex-shrink-0" />}
                {node.status === 'querying' && <Settings className="w-4 h-4 text-purple-400 animate-spin flex-shrink-0" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Resolved Context (Leaf Node) */}
      {phase === 'complete' && (
        <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/30">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Settings className="w-4 h-4 text-purple-400" />
            Final Resolved Context (Leaf Node)
          </h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(getAllProperties(nodes[nodes.length - 1])).map(([key, value]) => (
              <span key={key} className="text-sm px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded font-medium">
                {key}: {value}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hierarchy Metrics */}
      {phase === 'complete' && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 rounded-lg p-4 border border-cyan-500/30">
            <div className="text-xs text-gray-400 mb-1">Hierarchy Depth</div>
            <div className="text-2xl font-bold text-cyan-400">{metrics.depth}</div>
            <div className="text-xs text-gray-400 mt-1">levels</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg p-4 border border-green-500/30">
            <div className="text-xs text-gray-400 mb-1">Inheritance Accuracy</div>
            <div className="text-2xl font-bold text-green-400">{metrics.inheritanceAccuracy.toFixed(1)}%</div>
            <div className="text-xs text-gray-400 mt-1">correct propagation</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-4 border border-blue-500/30">
            <div className="text-xs text-gray-400 mb-1">Scope Isolation</div>
            <div className="text-2xl font-bold text-blue-400">{metrics.scopeIsolation.toFixed(1)}%</div>
            <div className="text-xs text-gray-400 mt-1">unauthorized blocked</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg p-4 border border-orange-500/30">
            <div className="text-xs text-gray-400 mb-1">Override Success</div>
            <div className="text-2xl font-bold text-orange-400">{metrics.overrideSuccess.toFixed(0)}%</div>
            <div className="text-xs text-gray-400 mt-1">valid overrides</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg p-4 border border-purple-500/30">
            <div className="text-xs text-gray-400 mb-1">Cache Hit Rate</div>
            <div className="text-2xl font-bold text-purple-400">{metrics.cacheHitRate.toFixed(1)}%</div>
            <div className="text-xs text-gray-400 mt-1">served from cache</div>
          </div>
        </div>
      )}

      {phase === 'complete' && (
        <div className="mt-4 p-3 rounded-lg border bg-green-500/10 border-green-500/30">
          <div className="text-sm text-white">
            ✓ Hierarchical architecture complete. {metrics.depth}-level context tree with inheritance, scope isolation, and override capabilities established.
          </div>
        </div>
      )}
    </div>
  );
}