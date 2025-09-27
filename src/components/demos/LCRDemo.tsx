'use client';

import React, { useState, useEffect } from 'react';
import { Server, HardDrive, Cpu, Network, AlertTriangle, CheckCircle, RefreshCw, Save, Zap, Activity } from 'lucide-react';

interface DeviceNode {
  id: string;
  type: 'primary' | 'proxy' | 'backup';
  status: 'healthy' | 'warning' | 'failed' | 'recovering';
  load: number;
  memory: number;
  checkpoints: Checkpoint[];
  isActive: boolean;
}

interface Checkpoint {
  id: string;
  timestamp: number;
  layer: number;
  tokens: number;
  size: number; // MB
  critical: boolean;
}

interface TopologyState {
  nodes: DeviceNode[];
  connections: Connection[];
  activeProcessing: string | null;
}

interface Connection {
  from: string;
  to: string;
  bandwidth: number;
  latency: number;
  active: boolean;
}

interface RecoveryMetrics {
  checkpointRate: number;
  recoveryTime: number;
  dataLoss: number;
  availability: number;
}

const LCRDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'normal' | 'checkpointing' | 'failure' | 'recovering' | 'restored'>('normal');
  const [topology, setTopology] = useState<TopologyState>({
    nodes: [],
    connections: [],
    activeProcessing: null
  });
  const [failureSimulated, setFailureSimulated] = useState(false);
  const [recoveryMetrics, setRecoveryMetrics] = useState<RecoveryMetrics>({
    checkpointRate: 0,
    recoveryTime: 0,
    dataLoss: 0,
    availability: 99.9
  });
  const [checkpointStrategy, setCheckpointStrategy] = useState<'aggressive' | 'balanced' | 'lazy'>('balanced');
  const [animationProgress, setAnimationProgress] = useState(0);
  const [processingTokens, setProcessingTokens] = useState(0);
  const [lastCheckpointToken, setLastCheckpointToken] = useState(0);

  const initializeTopology = (): TopologyState => {
    const nodes: DeviceNode[] = [
      {
        id: 'primary-1',
        type: 'primary',
        status: 'healthy',
        load: 75,
        memory: 80,
        checkpoints: [],
        isActive: true
      },
      {
        id: 'proxy-1',
        type: 'proxy',
        status: 'healthy',
        load: 20,
        memory: 30,
        checkpoints: [],
        isActive: false
      },
      {
        id: 'proxy-2',
        type: 'proxy',
        status: 'healthy',
        load: 15,
        memory: 25,
        checkpoints: [],
        isActive: false
      },
      {
        id: 'backup-1',
        type: 'backup',
        status: 'healthy',
        load: 10,
        memory: 40,
        checkpoints: [],
        isActive: false
      }
    ];

    const connections: Connection[] = [
      { from: 'primary-1', to: 'proxy-1', bandwidth: 100, latency: 5, active: true },
      { from: 'primary-1', to: 'proxy-2', bandwidth: 100, latency: 8, active: true },
      { from: 'proxy-1', to: 'backup-1', bandwidth: 50, latency: 10, active: false },
      { from: 'proxy-2', to: 'backup-1', bandwidth: 50, latency: 12, active: false }
    ];

    return { nodes, connections, activeProcessing: 'primary-1' };
  };

  const createCheckpoint = (nodeId: string, tokens: number): Checkpoint => {
    const criticalLayers = [4, 8, 12, 16]; // Critical attention layers
    const layer = Math.floor(Math.random() * 24) + 1;

    return {
      id: `checkpoint-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      layer,
      tokens,
      size: Math.random() * 50 + 10, // 10-60 MB
      critical: criticalLayers.includes(layer)
    };
  };

  const shouldCreateCheckpoint = (tokens: number, strategy: string): boolean => {
    const tokensSinceLastCheckpoint = tokens - lastCheckpointToken;

    switch (strategy) {
      case 'aggressive':
        return tokensSinceLastCheckpoint >= 100; // Every 100 tokens
      case 'balanced':
        return tokensSinceLastCheckpoint >= 500; // Every 500 tokens
      case 'lazy':
        return tokensSinceLastCheckpoint >= 2000; // Every 2000 tokens
      default:
        return false;
    }
  };

  const simulateFailure = () => {
    setTopology(prev => ({
      ...prev,
      nodes: prev.nodes.map(node =>
        node.id === 'primary-1'
          ? { ...node, status: 'failed' as const, load: 0, memory: 0, isActive: false }
          : node
      ),
      activeProcessing: null
    }));
    setFailureSimulated(true);
    setCurrentPhase('failure');
  };

  const performRecovery = async () => {
    setCurrentPhase('recovering');
    setAnimationProgress(0);

    // Step 1: Activate proxy node
    await new Promise(resolve => setTimeout(resolve, 500));
    setTopology(prev => ({
      ...prev,
      nodes: prev.nodes.map(node =>
        node.id === 'proxy-1'
          ? { ...node, status: 'recovering' as const, isActive: true, load: 40 }
          : node
      )
    }));
    setAnimationProgress(25);

    // Step 2: Load checkpoints
    await new Promise(resolve => setTimeout(resolve, 800));
    const primaryCheckpoints = topology.nodes.find(n => n.id === 'primary-1')?.checkpoints || [];
    const lastCriticalCheckpoint = [...primaryCheckpoints]
      .reverse()
      .find(cp => cp.critical);

    if (lastCriticalCheckpoint) {
      setTopology(prev => ({
        ...prev,
        nodes: prev.nodes.map(node =>
          node.id === 'proxy-1'
            ? { ...node, checkpoints: [lastCriticalCheckpoint], memory: 60 }
            : node
        )
      }));
    }
    setAnimationProgress(50);

    // Step 3: Reconstruct partial topology
    await new Promise(resolve => setTimeout(resolve, 600));
    setTopology(prev => ({
      ...prev,
      connections: prev.connections.map(conn =>
        conn.from === 'proxy-1' || conn.to === 'proxy-1'
          ? { ...conn, active: true }
          : conn
      )
    }));
    setAnimationProgress(75);

    // Step 4: Resume processing
    await new Promise(resolve => setTimeout(resolve, 500));
    setTopology(prev => ({
      ...prev,
      nodes: prev.nodes.map(node =>
        node.id === 'proxy-1'
          ? { ...node, status: 'healthy' as const, load: 70, memory: 75 }
          : node.id === 'backup-1'
          ? { ...node, status: 'healthy' as const, isActive: true, load: 30 }
          : node
      ),
      activeProcessing: 'proxy-1'
    }));
    setAnimationProgress(100);

    // Calculate recovery metrics
    const recoveryTime = 2.4; // seconds
    const dataLoss = lastCriticalCheckpoint
      ? processingTokens - lastCriticalCheckpoint.tokens
      : processingTokens;

    setRecoveryMetrics({
      checkpointRate: topology.nodes[0].checkpoints.length / (processingTokens / 1000),
      recoveryTime,
      dataLoss,
      availability: 99.5 // Slightly reduced due to failure
    });

    setCurrentPhase('restored');
    setFailureSimulated(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setProcessingTokens(prev => {
        const newTokens = prev + 50;

        // Create checkpoints based on strategy
        if (shouldCreateCheckpoint(newTokens, checkpointStrategy)) {
          setCurrentPhase('checkpointing');
          const checkpoint = createCheckpoint('primary-1', newTokens);

          setTopology(prevTopology => ({
            ...prevTopology,
            nodes: prevTopology.nodes.map(node => {
              if (node.id === 'primary-1') {
                return {
                  ...node,
                  checkpoints: [...node.checkpoints.slice(-9), checkpoint]
                };
              }
              // Replicate critical checkpoints to proxies
              if (checkpoint.critical && (node.id === 'proxy-1' || node.id === 'proxy-2')) {
                return {
                  ...node,
                  checkpoints: [...node.checkpoints.slice(-4), checkpoint]
                };
              }
              return node;
            })
          }));

          setLastCheckpointToken(newTokens);
          setTimeout(() => setCurrentPhase('normal'), 300);
        }

        // Simulate failure at random point
        if (newTokens > 5000 && !failureSimulated && Math.random() > 0.98) {
          simulateFailure();
        }

        return newTokens;
      });

      // Update node metrics
      setTopology(prev => ({
        ...prev,
        nodes: prev.nodes.map(node => {
          if (node.status === 'healthy' && node.isActive) {
            return {
              ...node,
              load: Math.min(95, node.load + Math.random() * 5 - 2),
              memory: Math.min(95, node.memory + Math.random() * 3 - 1)
            };
          }
          return node;
        })
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, checkpointStrategy, failureSimulated, processingTokens]);

  useEffect(() => {
    if (currentPhase === 'failure' && !isRunning) {
      // Auto-recover after failure detection
      setTimeout(() => performRecovery(), 1000);
    }
  }, [currentPhase, isRunning]);

  const getNodeColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      case 'recovering': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'normal': return 'text-green-400';
      case 'checkpointing': return 'text-blue-400';
      case 'failure': return 'text-red-400';
      case 'recovering': return 'text-yellow-400';
      case 'restored': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">LLM Checkpoint Recovery (Mnemosyne) Demo</h2>

        {/* Checkpoint Strategy */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200">Checkpoint Strategy</h3>
          <div className="grid grid-cols-3 gap-3">
            {(['aggressive', 'balanced', 'lazy'] as const).map(strategy => (
              <button
                key={strategy}
                onClick={() => !isRunning && setCheckpointStrategy(strategy)}
                disabled={isRunning}
                className={`p-3 rounded border transition-all ${
                  checkpointStrategy === strategy
                    ? 'bg-blue-950 border-blue-500 text-blue-300'
                    : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="font-medium capitalize mb-1">{strategy}</div>
                <div className="text-xs">
                  {strategy === 'aggressive' && 'Every 100 tokens'}
                  {strategy === 'balanced' && 'Every 500 tokens'}
                  {strategy === 'lazy' && 'Every 2000 tokens'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-200">System Status</h3>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${getPhaseColor(currentPhase)} uppercase`}>
                {currentPhase}
              </span>
              {isRunning && (
                <Activity className="w-4 h-4 text-green-400 animate-pulse" />
              )}
            </div>
          </div>
          <div className="bg-gray-900 p-4 rounded border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Tokens Processed</span>
              <span className="text-xl font-mono text-cyan-400">{processingTokens.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Last Checkpoint</span>
              <span className="text-sm font-mono text-blue-400">
                {lastCheckpointToken > 0 ? `Token ${lastCheckpointToken}` : 'None'}
              </span>
            </div>
          </div>
        </div>

        {/* Device Topology */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Network className="w-5 h-5 text-purple-400" />
            Device Topology
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {topology.nodes.map(node => (
              <div
                key={node.id}
                className={`bg-gray-900 p-4 rounded border ${
                  node.isActive ? 'border-cyan-500' : 'border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {node.type === 'primary' ? <Server className="w-4 h-4" /> :
                     node.type === 'proxy' ? <Cpu className="w-4 h-4" /> :
                     <HardDrive className="w-4 h-4" />}
                    <span className="text-sm font-medium text-gray-200 capitalize">
                      {node.type}
                    </span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${getNodeColor(node.status)}`} />
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Load</span>
                      <span className="text-gray-400">{node.load}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          node.load > 80 ? 'bg-red-500' :
                          node.load > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${node.load}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Memory</span>
                      <span className="text-gray-400">{node.memory}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-blue-500"
                        style={{ width: `${node.memory}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Checkpoints</span>
                    <div className="flex items-center gap-1">
                      <Save className="w-3 h-3 text-gray-600" />
                      <span className="text-gray-400">{node.checkpoints.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkpoint Timeline */}
        {topology.nodes[0]?.checkpoints.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <Save className="w-5 h-5 text-blue-400" />
              Checkpoint Timeline
            </h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-700">
              <div className="flex items-center gap-2 overflow-x-auto">
                {topology.nodes[0].checkpoints.map((checkpoint, idx) => (
                  <div
                    key={checkpoint.id}
                    className={`flex-shrink-0 p-2 rounded border ${
                      checkpoint.critical
                        ? 'bg-purple-950 border-purple-700'
                        : 'bg-gray-800 border-gray-700'
                    }`}
                  >
                    <div className="text-xs text-gray-400">Layer {checkpoint.layer}</div>
                    <div className="text-xs font-mono text-gray-300">
                      {checkpoint.tokens} tokens
                    </div>
                    <div className="text-xs text-gray-500">{checkpoint.size.toFixed(1)} MB</div>
                    {checkpoint.critical && (
                      <div className="text-xs text-purple-400 mt-1">Critical</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recovery Progress */}
        {currentPhase === 'recovering' && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-yellow-400 animate-spin" />
              Recovery in Progress
            </h3>
            <div className="bg-gray-900 p-4 rounded border border-yellow-700">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Activating proxy device...</span>
                  {animationProgress >= 25 && <CheckCircle className="w-4 h-4 text-green-400" />}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Loading checkpoints...</span>
                  {animationProgress >= 50 && <CheckCircle className="w-4 h-4 text-green-400" />}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Reconstructing topology...</span>
                  {animationProgress >= 75 && <CheckCircle className="w-4 h-4 text-green-400" />}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Resuming processing...</span>
                  {animationProgress >= 100 && <CheckCircle className="w-4 h-4 text-green-400" />}
                </div>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 mt-4">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${animationProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Recovery Metrics */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400" />
            Recovery Metrics
          </h3>
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Checkpoint Rate</div>
              <div className="text-xl font-bold text-cyan-400">
                {recoveryMetrics.checkpointRate.toFixed(2)}/k
              </div>
              <div className="text-xs text-gray-500">per 1k tokens</div>
            </div>
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Recovery Time</div>
              <div className="text-xl font-bold text-yellow-400">
                {recoveryMetrics.recoveryTime.toFixed(1)}s
              </div>
              <div className="text-xs text-gray-500">to restore</div>
            </div>
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Data Loss</div>
              <div className="text-xl font-bold text-orange-400">
                {recoveryMetrics.dataLoss}
              </div>
              <div className="text-xs text-gray-500">tokens lost</div>
            </div>
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Availability</div>
              <div className="text-xl font-bold text-green-400">
                {recoveryMetrics.availability.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500">uptime</div>
            </div>
          </div>
        </div>

        {/* How Mnemosyne Works */}
        <div className="bg-gray-900 p-4 rounded border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" />
            How Mnemosyne Works
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">1.</span>
              <div>
                <p className="font-medium text-gray-200">Just-In-Time Checkpointing</p>
                <p className="text-xs text-gray-400">Save critical layer states during inference based on strategy</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">2.</span>
              <div>
                <p className="font-medium text-gray-200">Lightweight Proxy Devices</p>
                <p className="text-xs text-gray-400">Low-resource devices that can quickly take over processing</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">3.</span>
              <div>
                <p className="font-medium text-gray-200">Selective Replication</p>
                <p className="text-xs text-gray-400">Only critical checkpoints replicated to proxy nodes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">4.</span>
              <div>
                <p className="font-medium text-gray-200">Partial Topology Reconstruction</p>
                <p className="text-xs text-gray-400">Rebuild only essential connections for continued operation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">5.</span>
              <div>
                <p className="font-medium text-gray-200">Fast Recovery</p>
                <p className="text-xs text-gray-400">Resume from last critical checkpoint with minimal data loss</p>
              </div>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (isRunning) {
                setIsRunning(false);
              } else {
                setTopology(initializeTopology());
                setProcessingTokens(0);
                setLastCheckpointToken(0);
                setFailureSimulated(false);
                setCurrentPhase('normal');
                setRecoveryMetrics({
                  checkpointRate: 0,
                  recoveryTime: 0,
                  dataLoss: 0,
                  availability: 99.9
                });
                setIsRunning(true);
              }
            }}
            className={`flex-1 py-3 rounded text-white font-medium transition-colors ${
              isRunning
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isRunning ? 'Stop Processing' : 'Start LLM Processing'}
          </button>

          {!isRunning && !failureSimulated && processingTokens > 1000 && (
            <button
              onClick={simulateFailure}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded text-white font-medium transition-colors flex items-center gap-2"
            >
              <AlertTriangle className="w-5 h-5" />
              Simulate Failure
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LCRDemo;