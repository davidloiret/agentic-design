'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Server, Network, Database, Zap, GitBranch, Shield, AlertCircle, CheckCircle, Clock, Activity, BarChart3, Cpu, HardDrive, Globe, Lock, RefreshCw, Layers } from 'lucide-react';

interface MemoryShard {
  id: string;
  nodeId: string;
  data: Map<string, any>;
  version: number;
  lastSync: number;
  status: 'active' | 'syncing' | 'stale' | 'offline';
  replicationFactor: number;
  consistency: 'strong' | 'eventual' | 'weak';
}

interface DistributedNode {
  id: string;
  name: string;
  type: 'primary' | 'replica' | 'cache';
  region: string;
  capacity: number;
  used: number;
  latency: number;
  status: 'online' | 'syncing' | 'degraded' | 'offline';
  shards: string[];
  lastHeartbeat: number;
  consistencyLevel: 'strong' | 'eventual' | 'weak';
}

interface SyncOperation {
  id: string;
  type: 'read' | 'write' | 'replicate' | 'partition' | 'merge' | 'consensus';
  source: string;
  targets: string[];
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'conflict';
  timestamp: number;
  data?: any;
  conflictResolution?: 'lww' | 'mvcc' | 'crdt' | 'manual';
}

interface ConsistencyMetrics {
  replicationLag: number;
  syncQueueSize: number;
  conflictRate: number;
  partitionTolerance: number;
  availabilityScore: number;
  consistencyScore: number;
  throughput: number;
  averageLatency: number;
}

const initialNodes: DistributedNode[] = [
  {
    id: 'node-primary-1',
    name: 'Primary Node US-East',
    type: 'primary',
    region: 'us-east',
    capacity: 1000,
    used: 450,
    latency: 5,
    status: 'online',
    shards: ['shard-1', 'shard-2'],
    lastHeartbeat: Date.now(),
    consistencyLevel: 'strong'
  },
  {
    id: 'node-replica-1',
    name: 'Replica Node EU-West',
    type: 'replica',
    region: 'eu-west',
    capacity: 1000,
    used: 380,
    latency: 45,
    status: 'online',
    shards: ['shard-1', 'shard-3'],
    lastHeartbeat: Date.now(),
    consistencyLevel: 'eventual'
  },
  {
    id: 'node-replica-2',
    name: 'Replica Node AP-South',
    type: 'replica',
    region: 'ap-south',
    capacity: 1000,
    used: 420,
    latency: 120,
    status: 'online',
    shards: ['shard-2', 'shard-4'],
    lastHeartbeat: Date.now(),
    consistencyLevel: 'eventual'
  },
  {
    id: 'node-cache-1',
    name: 'Cache Node US-West',
    type: 'cache',
    region: 'us-west',
    capacity: 500,
    used: 180,
    latency: 2,
    status: 'online',
    shards: ['shard-cache-1'],
    lastHeartbeat: Date.now(),
    consistencyLevel: 'weak'
  },
  {
    id: 'node-cache-2',
    name: 'Cache Node EU-North',
    type: 'cache',
    region: 'eu-north',
    capacity: 500,
    used: 210,
    latency: 3,
    status: 'online',
    shards: ['shard-cache-2'],
    lastHeartbeat: Date.now(),
    consistencyLevel: 'weak'
  }
];

const initialShards: MemoryShard[] = [
  {
    id: 'shard-1',
    nodeId: 'node-primary-1',
    data: new Map([
      ['user:1001', { name: 'Alice', score: 95 }],
      ['user:1002', { name: 'Bob', score: 87 }]
    ]),
    version: 1,
    lastSync: Date.now(),
    status: 'active',
    replicationFactor: 3,
    consistency: 'strong'
  },
  {
    id: 'shard-2',
    nodeId: 'node-primary-1',
    data: new Map([
      ['product:2001', { name: 'Widget A', price: 29.99 }],
      ['product:2002', { name: 'Widget B', price: 39.99 }]
    ]),
    version: 1,
    lastSync: Date.now(),
    status: 'active',
    replicationFactor: 3,
    consistency: 'strong'
  },
  {
    id: 'shard-3',
    nodeId: 'node-replica-1',
    data: new Map([
      ['session:3001', { userId: '1001', active: true }],
      ['session:3002', { userId: '1002', active: false }]
    ]),
    version: 1,
    lastSync: Date.now(),
    status: 'active',
    replicationFactor: 2,
    consistency: 'eventual'
  },
  {
    id: 'shard-4',
    nodeId: 'node-replica-2',
    data: new Map([
      ['config:4001', { feature: 'darkMode', enabled: true }],
      ['config:4002', { feature: 'betaAccess', enabled: false }]
    ]),
    version: 1,
    lastSync: Date.now(),
    status: 'active',
    replicationFactor: 2,
    consistency: 'eventual'
  }
];

export const DistributedMemoryArchitecturesDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const isRunningRef = useRef(false);
  const [nodes, setNodes] = useState<DistributedNode[]>(initialNodes);
  const [shards, setShards] = useState<MemoryShard[]>(initialShards);
  const [operations, setOperations] = useState<SyncOperation[]>([]);
  const [currentOperation, setCurrentOperation] = useState<SyncOperation | null>(null);
  const [metrics, setMetrics] = useState<ConsistencyMetrics>({
    replicationLag: 15,
    syncQueueSize: 0,
    conflictRate: 0.02,
    partitionTolerance: 0.98,
    availabilityScore: 0.99,
    consistencyScore: 0.95,
    throughput: 5000,
    averageLatency: 25
  });
  const [operationLog, setOperationLog] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const addLogEntry = useCallback((message: string) => {
    setOperationLog(prev => [...prev.slice(-8), `[${new Date().toLocaleTimeString()}] ${message}`]);
  }, []);

  const resetDemo = useCallback(() => {
    setIsRunning(false);
    isRunningRef.current = false;
    setNodes(initialNodes);
    setShards(initialShards);
    setOperations([]);
    setCurrentOperation(null);
    setMetrics({
      replicationLag: 15,
      syncQueueSize: 0,
      conflictRate: 0.02,
      partitionTolerance: 0.98,
      availabilityScore: 0.99,
      consistencyScore: 0.95,
      throughput: 5000,
      averageLatency: 25
    });
    setOperationLog([]);
    setSelectedNode(null);
  }, []);

  // Draw network topology visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw connections between nodes
    const nodePositions = new Map<string, { x: number; y: number }>();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) * 0.35;

    nodes.forEach((node, index) => {
      const angle = (index / nodes.length) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      nodePositions.set(node.id, { x, y });
    });

    // Draw sync operations as animated connections
    if (currentOperation) {
      const sourcePos = nodePositions.get(currentOperation.source);
      currentOperation.targets.forEach(targetId => {
        const targetPos = nodePositions.get(targetId);
        if (sourcePos && targetPos) {
          ctx.strokeStyle =
            currentOperation.status === 'completed' ? 'rgba(34, 197, 94, 0.6)' :
            currentOperation.status === 'failed' ? 'rgba(239, 68, 68, 0.6)' :
            currentOperation.status === 'conflict' ? 'rgba(251, 146, 60, 0.6)' :
            'rgba(59, 130, 246, 0.6)';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(sourcePos.x, sourcePos.y);
          ctx.lineTo(targetPos.x, targetPos.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });
    }

    // Draw replication paths
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.lineWidth = 1;
    shards.forEach(shard => {
      const sourcePos = nodePositions.get(shard.nodeId);
      if (sourcePos && shard.replicationFactor > 1) {
        nodes.filter(n => n.id !== shard.nodeId && n.shards.includes(shard.id))
          .forEach(targetNode => {
            const targetPos = nodePositions.get(targetNode.id);
            if (targetPos) {
              ctx.beginPath();
              ctx.moveTo(sourcePos.x, sourcePos.y);
              ctx.lineTo(targetPos.x, targetPos.y);
              ctx.stroke();
            }
          });
      }
    });

    // Draw nodes
    nodePositions.forEach((pos, nodeId) => {
      const node = nodes.find(n => n.id === nodeId);
      if (!node) return;

      // Node circle
      ctx.fillStyle =
        node.status === 'offline' ? '#ef4444' :
        node.status === 'degraded' ? '#fb923c' :
        node.status === 'syncing' ? '#3b82f6' :
        '#22c55e';

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
      ctx.fill();

      // Node icon
      ctx.fillStyle = 'white';
      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const icon =
        node.type === 'primary' ? '⚡' :
        node.type === 'replica' ? '🔄' :
        '💾';
      ctx.fillText(icon, pos.x, pos.y);

      // Node label
      ctx.fillStyle = selectedNode === node.id ? '#3b82f6' : '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(node.name, pos.x, pos.y + 35);

      // Capacity bar
      const barWidth = 40;
      const barHeight = 4;
      const barX = pos.x - barWidth / 2;
      const barY = pos.y + 45;

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(barX, barY, barWidth, barHeight);

      ctx.fillStyle = node.used / node.capacity > 0.8 ? '#ef4444' : '#22c55e';
      ctx.fillRect(barX, barY, (node.used / node.capacity) * barWidth, barHeight);
    });

  }, [nodes, shards, currentOperation, selectedNode]);

  const simulateOperation = useCallback(async () => {
    const operationTypes: SyncOperation['type'][] = ['read', 'write', 'replicate', 'partition', 'merge', 'consensus'];
    const operationType = operationTypes[Math.floor(Math.random() * operationTypes.length)];

    const onlineNodes = nodes.filter(n => n.status !== 'offline');
    if (onlineNodes.length < 2) return;

    const sourceNode = onlineNodes[Math.floor(Math.random() * onlineNodes.length)];
    const targetNodes = onlineNodes
      .filter(n => n.id !== sourceNode.id)
      .slice(0, Math.floor(Math.random() * 3) + 1);

    const operation: SyncOperation = {
      id: `op-${Date.now()}`,
      type: operationType,
      source: sourceNode.id,
      targets: targetNodes.map(n => n.id),
      status: 'pending',
      timestamp: Date.now(),
      conflictResolution: Math.random() > 0.5 ? 'lww' : 'crdt'
    };

    setCurrentOperation(operation);
    setOperations(prev => [...prev.slice(-10), operation]);

    let logMessage = '';
    switch (operationType) {
      case 'write':
        logMessage = `Write operation from ${sourceNode.name} to ${targetNodes.length} node(s)`;
        break;
      case 'read':
        logMessage = `Read request from ${sourceNode.name} (consistency: ${sourceNode.consistencyLevel})`;
        break;
      case 'replicate':
        logMessage = `Replicating shard from ${sourceNode.name} to replicas`;
        break;
      case 'partition':
        logMessage = `Handling network partition at ${sourceNode.region}`;
        break;
      case 'merge':
        logMessage = `Merging conflicting versions using ${operation.conflictResolution}`;
        break;
      case 'consensus':
        logMessage = `Consensus protocol initiated for ${targetNodes.length + 1} nodes`;
        break;
    }
    addLogEntry(logMessage);

    // Simulate operation progression
    await new Promise(resolve => setTimeout(resolve, 500));

    setCurrentOperation(prev => prev ? { ...prev, status: 'in-progress' } : null);

    // Update metrics based on operation
    setMetrics(prev => ({
      ...prev,
      syncQueueSize: Math.max(0, prev.syncQueueSize + Math.random() * 5 - 2),
      throughput: prev.throughput + Math.random() * 1000 - 500,
      averageLatency: prev.averageLatency + Math.random() * 10 - 5
    }));

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Determine operation outcome
    const success = Math.random() > 0.1;
    const hasConflict = operationType === 'write' && Math.random() > 0.8;

    setCurrentOperation(prev => prev ? {
      ...prev,
      status: hasConflict ? 'conflict' : success ? 'completed' : 'failed'
    } : null);

    if (hasConflict) {
      addLogEntry(`Conflict detected! Resolving using ${operation.conflictResolution?.toUpperCase()}`);
      setMetrics(prev => ({ ...prev, conflictRate: Math.min(0.1, prev.conflictRate + 0.01) }));
    } else if (success) {
      addLogEntry(`Operation completed successfully (${Date.now() - operation.timestamp}ms)`);

      // Update node status
      setNodes(prev => prev.map(node => {
        if (node.id === sourceNode.id || targetNodes.some(t => t.id === node.id)) {
          return {
            ...node,
            lastHeartbeat: Date.now(),
            used: Math.min(node.capacity, node.used + Math.random() * 20)
          };
        }
        return node;
      }));

      // Update consistency metrics
      setMetrics(prev => ({
        ...prev,
        replicationLag: Math.max(5, prev.replicationLag - 1),
        consistencyScore: Math.min(1, prev.consistencyScore + 0.01)
      }));
    } else {
      addLogEntry(`Operation failed - initiating retry with exponential backoff`);
      setMetrics(prev => ({
        ...prev,
        availabilityScore: Math.max(0.9, prev.availabilityScore - 0.01)
      }));
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    setCurrentOperation(null);

  }, [nodes, addLogEntry]);

  const runDemo = useCallback(async () => {
    setIsRunning(true);
    isRunningRef.current = true;
    addLogEntry('Distributed memory system initialized with 5 nodes across 3 regions');

    while (isRunningRef.current) {
      await simulateOperation();

      // Simulate node failures and recoveries
      if (Math.random() > 0.95) {
        const node = nodes[Math.floor(Math.random() * nodes.length)];
        setNodes(prev => prev.map(n =>
          n.id === node.id ? { ...n, status: 'degraded' as const } : n
        ));
        addLogEntry(`Node ${node.name} entered degraded state`);
      }

      // Simulate recovery
      setNodes(prev => prev.map(node => {
        if (node.status === 'degraded' && Math.random() > 0.7) {
          addLogEntry(`Node ${node.name} recovered to online state`);
          return { ...node, status: 'online' as const };
        }
        return node;
      }));

      // Update heartbeats
      setNodes(prev => prev.map(node => ({
        ...node,
        lastHeartbeat: node.status === 'online' ? Date.now() : node.lastHeartbeat
      })));

      await new Promise(resolve => setTimeout(resolve, 2000));
    }

  }, [simulateOperation, nodes, addLogEntry]);

  const startDemo = () => {
    runDemo();
  };

  const pauseDemo = () => {
    setIsRunning(false);
    isRunningRef.current = false;
    addLogEntry('System paused - maintaining current state');
  };

  const getNodeTypeColor = (type: string) => {
    switch (type) {
      case 'primary': return 'text-yellow-400';
      case 'replica': return 'text-blue-400';
      case 'cache': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'syncing': return 'text-blue-400';
      case 'degraded': return 'text-orange-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getConsistencyColor = (level: string) => {
    switch (level) {
      case 'strong': return 'text-green-400';
      case 'eventual': return 'text-yellow-400';
      case 'weak': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Distributed Memory Architectures</h2>
          <p className="text-gray-400">Scalable memory systems with coordinated access patterns and consistency mechanisms</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={isRunning ? pauseDemo : startDemo}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              isRunning
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetDemo}
            disabled={isRunning}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 rounded-lg font-medium transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Current Operation */}
      {currentOperation && (
        <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCw className={`w-4 h-4 text-blue-400 ${currentOperation.status === 'in-progress' ? 'animate-spin' : ''}`} />
              <span className="text-blue-300">
                {currentOperation.type.toUpperCase()} operation: {currentOperation.source} → {currentOperation.targets.join(', ')}
              </span>
            </div>
            <span className={`text-sm ${
              currentOperation.status === 'completed' ? 'text-green-400' :
              currentOperation.status === 'failed' ? 'text-red-400' :
              currentOperation.status === 'conflict' ? 'text-orange-400' :
              'text-blue-400'
            }`}>
              {currentOperation.status}
            </span>
          </div>
        </div>
      )}

      {/* Network Topology Visualization */}
      <div className="mb-6 bg-gray-800/50 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Network className="w-5 h-5 text-cyan-400" />
          Network Topology
        </h3>
        <canvas
          ref={canvasRef}
          className="w-full h-64 bg-gray-900/50 rounded-lg"
          style={{ width: '100%', height: '256px' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Node Status */}
        <div className="lg:col-span-2 bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-400" />
            Distributed Nodes
          </h3>

          <div className="space-y-3">
            {nodes.map(node => (
              <div
                key={node.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedNode === node.id
                    ? 'border-blue-500/50 bg-blue-500/10'
                    : 'border-gray-600/50 bg-gray-700/30 hover:bg-gray-700/50'
                }`}
                onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {node.type === 'primary' ? <Cpu className="w-4 h-4 text-yellow-400" /> :
                     node.type === 'replica' ? <Database className="w-4 h-4 text-blue-400" /> :
                     <HardDrive className="w-4 h-4 text-purple-400" />}
                    <span className={`font-medium ${getNodeTypeColor(node.type)}`}>
                      {node.name}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(node.status)}`}>
                      {node.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Latency</div>
                    <div className="text-sm font-medium text-cyan-400">{node.latency}ms</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-2">
                  <div>
                    <div className="text-xs text-gray-400">Region</div>
                    <div className="text-sm flex items-center gap-1">
                      <Globe className="w-3 h-3 text-gray-500" />
                      {node.region}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Consistency</div>
                    <div className={`text-sm ${getConsistencyColor(node.consistencyLevel)}`}>
                      {node.consistencyLevel}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Shards</div>
                    <div className="text-sm text-blue-400">{node.shards.length}</div>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Storage</span>
                    <span className="text-gray-300">{node.used}/{node.capacity} MB</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        node.used / node.capacity > 0.8 ? 'bg-red-500' :
                        node.used / node.capacity > 0.6 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${(node.used / node.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics and Operations */}
        <div className="space-y-6">
          {/* Consistency Metrics */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Consistency Metrics
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Replication Lag:</span>
                <span className="font-medium text-yellow-400">{metrics.replicationLag.toFixed(0)}ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sync Queue:</span>
                <span className="font-medium text-blue-400">{metrics.syncQueueSize.toFixed(0)} ops</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Conflict Rate:</span>
                <span className="font-medium text-orange-400">{(metrics.conflictRate * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Partition Tolerance:</span>
                <span className="font-medium text-green-400">{(metrics.partitionTolerance * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Availability:</span>
                <span className="font-medium text-green-400">{(metrics.availabilityScore * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Consistency:</span>
                <span className="font-medium text-cyan-400">{(metrics.consistencyScore * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Throughput:</span>
                <span className="font-medium text-purple-400">{metrics.throughput.toFixed(0)} ops/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avg Latency:</span>
                <span className="font-medium text-indigo-400">{metrics.averageLatency.toFixed(1)}ms</span>
              </div>
            </div>
          </div>

          {/* Operation Log */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              Operation Log
            </h3>

            <div className="space-y-1 text-xs overflow-y-auto" style={{ maxHeight: '180px' }}>
              {operationLog.map((entry, index) => (
                <div key={index} className="text-gray-300 py-1 border-b border-gray-700/30 last:border-b-0">
                  {entry}
                </div>
              ))}
              {operationLog.length === 0 && (
                <div className="text-center text-gray-400 py-4">
                  <Clock className="w-6 h-6 mx-auto mb-2 opacity-50" />
                  <p>Waiting for operations...</p>
                </div>
              )}
            </div>
          </div>

          {/* CAP Theorem */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              CAP Properties
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <div>
                  <div className="font-medium text-green-400">Consistency</div>
                  <div className="text-gray-400">All nodes see the same data simultaneously</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <div>
                  <div className="font-medium text-green-400">Availability</div>
                  <div className="text-gray-400">System remains operational 99.9% of the time</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-400">Partition Tolerance</div>
                  <div className="text-gray-400">Handles network failures gracefully</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Explanation */}
      <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <Layers className="w-5 h-5 text-yellow-400" />
          Distributed Memory Algorithm
        </h4>
        <div className="text-sm text-gray-300 space-y-2">
          <p><strong>Core Principle:</strong> Distributed, fault-tolerant memory system with configurable consistency levels, automatic sharding, and multi-region replication.</p>
          <p><strong>Key Mechanisms:</strong> Consistent hashing for data distribution, vector clocks for conflict resolution, gossip protocol for membership, Raft/Paxos for consensus, and CRDT for eventual consistency.</p>
          <p><strong>Consistency Models:</strong> Strong (linearizable), Eventual (AP-optimized), Weak (cache-friendly), with tunable read/write quorum levels.</p>
          <p><strong>Benefits:</strong> Horizontal scalability, fault tolerance, geographic distribution, low latency access, and flexible consistency guarantees.</p>
        </div>
      </div>
    </div>
  );
};

export default DistributedMemoryArchitecturesDemo;