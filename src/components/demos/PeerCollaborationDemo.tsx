'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Users, MessageSquare, GitBranch, Share2, Brain, Zap, CheckCircle, AlertCircle, Loader, ArrowRight, ArrowLeft, RefreshCw, Network } from 'lucide-react';

interface Peer {
  id: string;
  name: string;
  expertise: string;
  icon: React.ReactNode;
  color: string;
  status: 'idle' | 'proposing' | 'evaluating' | 'contributing' | 'consensus' | 'completed';
  currentProposal?: Proposal;
  connections: string[];
  reputation: number;
  contributions: number;
}

interface Proposal {
  id: string;
  fromPeer: string;
  type: 'solution' | 'improvement' | 'validation' | 'question';
  content: string;
  confidence: number;
  votes: Record<string, 'support' | 'oppose' | 'abstain'>;
  timestamp: number;
}

interface Message {
  id: string;
  from: string;
  to: string | 'broadcast';
  type: 'proposal' | 'vote' | 'request' | 'share' | 'consensus';
  content: any;
  timestamp: number;
}

interface ConsensusResult {
  accepted: boolean;
  proposal: Proposal;
  supportPercentage: number;
  leadPeer?: string;
}

interface CollaborationTask {
  id: string;
  name: string;
  description: string;
  requiredConsensus: number; // Percentage required for consensus
  phases: string[];
}

const PEERS: Peer[] = [
  {
    id: 'peer-alpha',
    name: 'Alpha Node',
    expertise: 'Data Analysis',
    icon: <Brain className="w-4 h-4" />,
    color: 'text-blue-400',
    status: 'idle',
    connections: ['peer-beta', 'peer-gamma', 'peer-delta'],
    reputation: 0.85,
    contributions: 0
  },
  {
    id: 'peer-beta',
    name: 'Beta Node',
    expertise: 'Algorithm Design',
    icon: <Zap className="w-4 h-4" />,
    color: 'text-yellow-400',
    status: 'idle',
    connections: ['peer-alpha', 'peer-gamma', 'peer-epsilon'],
    reputation: 0.78,
    contributions: 0
  },
  {
    id: 'peer-gamma',
    name: 'Gamma Node',
    expertise: 'Security Review',
    icon: <GitBranch className="w-4 h-4" />,
    color: 'text-green-400',
    status: 'idle',
    connections: ['peer-alpha', 'peer-beta', 'peer-delta', 'peer-epsilon'],
    reputation: 0.92,
    contributions: 0
  },
  {
    id: 'peer-delta',
    name: 'Delta Node',
    expertise: 'Performance Optimization',
    icon: <RefreshCw className="w-4 h-4" />,
    color: 'text-purple-400',
    status: 'idle',
    connections: ['peer-alpha', 'peer-gamma', 'peer-zeta'],
    reputation: 0.81,
    contributions: 0
  },
  {
    id: 'peer-epsilon',
    name: 'Epsilon Node',
    expertise: 'Quality Assurance',
    icon: <CheckCircle className="w-4 h-4" />,
    color: 'text-red-400',
    status: 'idle',
    connections: ['peer-beta', 'peer-gamma', 'peer-zeta'],
    reputation: 0.88,
    contributions: 0
  },
  {
    id: 'peer-zeta',
    name: 'Zeta Node',
    expertise: 'Integration Testing',
    icon: <Share2 className="w-4 h-4" />,
    color: 'text-cyan-400',
    status: 'idle',
    connections: ['peer-delta', 'peer-epsilon'],
    reputation: 0.75,
    contributions: 0
  }
];

const TASKS: CollaborationTask[] = [
  {
    id: 'consensus-algorithm',
    name: 'Design Consensus Algorithm',
    description: 'Collaboratively design a distributed consensus algorithm',
    requiredConsensus: 50,  // Lowered threshold
    phases: ['proposal', 'discussion', 'refinement', 'validation', 'consensus']
  },
  {
    id: 'distributed-system',
    name: 'Distributed System Architecture',
    description: 'Design a fault-tolerant distributed system',
    requiredConsensus: 55,  // Lowered threshold
    phases: ['requirements', 'architecture', 'validation', 'optimization', 'consensus']
  },
  {
    id: 'security-protocol',
    name: 'Security Protocol Design',
    description: 'Create a peer-to-peer security protocol',
    requiredConsensus: 60,  // Lowered threshold
    phases: ['threat-model', 'protocol-design', 'peer-review', 'testing', 'consensus']
  }
];

export default function PeerCollaborationDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const [peers, setPeers] = useState<Peer[]>(PEERS);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(-1);
  const [consensusResults, setConsensusResults] = useState<ConsensusResult[]>([]);
  const [logs, setLogs] = useState<Array<{ timestamp: string; type: string; message: string }>>([]);
  const [activeConnections, setActiveConnections] = useState<Array<{ from: string; to: string }>>([]);
  const [networkStats, setNetworkStats] = useState({
    totalMessages: 0,
    consensusReached: 0,
    averageConvergenceTime: 0,
    networkEfficiency: 100
  });

  const addLog = useCallback((type: string, message: string) => {
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    }]);
  }, []);

  const broadcastMessage = useCallback(async (fromPeer: Peer, content: any, type: Message['type']) => {
    const message: Message = {
      id: `msg-${Date.now()}-${Math.random()}`,
      from: fromPeer.id,
      to: 'broadcast',
      type,
      content,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, message]);
    setNetworkStats(prev => ({ ...prev, totalMessages: prev.totalMessages + 1 }));

    // Animate connections quickly
    setActiveConnections(fromPeer.connections.map(c => ({ from: fromPeer.id, to: c })));
    await new Promise(resolve => setTimeout(resolve, 150 / speed));
    setActiveConnections([]);

    addLog('broadcast', `${fromPeer.name} broadcasted ${type} to network`);
  }, [speed, addLog]);

  const createProposal = useCallback((peer: Peer, phase: string): Proposal => {
    const proposals = [
      `Implement ${phase} using Byzantine fault tolerance`,
      `Apply Raft consensus for ${phase}`,
      `Use Paxos algorithm for ${phase}`,
      `Leverage blockchain for ${phase}`,
      `Implement gossip protocol for ${phase}`,
      `Use vector clocks for ${phase}`
    ];

    return {
      id: `prop-${Date.now()}-${peer.id}`,
      fromPeer: peer.id,
      type: Math.random() > 0.5 ? 'solution' : 'improvement',
      content: proposals[Math.floor(Math.random() * proposals.length)],
      confidence: peer.reputation * (0.7 + Math.random() * 0.3),
      votes: {},
      timestamp: Date.now()
    };
  }, []);

  const evaluateProposal = useCallback((peer: Peer, proposal: Proposal): 'support' | 'oppose' | 'abstain' => {
    // Peers vote based on reputation, confidence, and random factor
    // More likely to support high-confidence proposals from high-reputation peers
    const proposerPeer = peers.find(p => p.id === proposal.fromPeer);
    const proposerReputation = proposerPeer?.reputation || 0.5;

    // Base score from proposal confidence and proposer reputation
    const baseScore = (proposal.confidence * 0.6) + (proposerReputation * 0.4);

    // Peer's evaluation threshold (high reputation peers are more critical)
    const threshold = 0.5 - (peer.reputation - 0.7) * 0.2;

    // Add some randomness for realistic variation
    const finalScore = baseScore + (Math.random() * 0.3 - 0.15);

    if (finalScore > threshold + 0.1) return 'support';
    if (finalScore < threshold - 0.2) return 'oppose';
    return 'abstain';
  }, [peers]);

  const processPhase = useCallback(async (phase: string, phaseIndex: number) => {
    const task = TASKS[selectedTaskIndex];
    setCurrentPhaseIndex(phaseIndex);
    addLog('phase', `📊 Starting phase: ${phase}`);

    // Phase 1: Peers generate proposals
    const phaseProposals: Proposal[] = [];

    // Random subset of peers propose
    const proposingPeers = peers.filter(() => Math.random() > 0.4);

    for (const peer of proposingPeers) {
      setPeers(prev => prev.map(p =>
        p.id === peer.id ? { ...p, status: 'proposing' } : p
      ));

      await new Promise(resolve => setTimeout(resolve, 500 / speed));

      const proposal = createProposal(peer, phase);
      phaseProposals.push(proposal);
      setProposals(prev => [...prev, proposal]);

      setPeers(prev => prev.map(p =>
        p.id === peer.id ? { ...p, currentProposal: proposal, contributions: p.contributions + 1 } : p
      ));

      await broadcastMessage(peer, proposal, 'proposal');
    }

    // Phase 2: Peer evaluation and voting
    addLog('voting', '🗳️ Peers evaluating proposals');

    for (const proposal of phaseProposals) {
      const votes: Record<string, 'support' | 'oppose' | 'abstain'> = {};

      // Each peer evaluates
      for (const peer of peers) {
        if (peer.id !== proposal.fromPeer) {
          setPeers(prev => prev.map(p =>
            p.id === peer.id ? { ...p, status: 'evaluating' } : p
          ));

          await new Promise(resolve => setTimeout(resolve, 200 / speed));

          const vote = evaluateProposal(peer, proposal);
          votes[peer.id] = vote;

          // Send vote message
          const voteMessage: Message = {
            id: `vote-${Date.now()}-${peer.id}`,
            from: peer.id,
            to: proposal.fromPeer,
            type: 'vote',
            content: { proposalId: proposal.id, vote },
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, voteMessage]);
        }
      }

      // Update proposal with votes
      proposal.votes = votes;
      setProposals(prev => prev.map(p =>
        p.id === proposal.id ? { ...p, votes } : p
      ));
    }

    // Phase 3: Consensus building
    addLog('consensus', '🤝 Building consensus');

    setPeers(prev => prev.map(p => ({ ...p, status: 'consensus' })));
    await new Promise(resolve => setTimeout(resolve, 800 / speed));

    // Determine winning proposal
    let bestProposal: Proposal | null = null;
    let bestScore = 0;

    for (const proposal of phaseProposals) {
      const supportCount = Object.values(proposal.votes).filter(v => v === 'support').length;
      const totalVotes = Object.keys(proposal.votes).length;
      const supportPercentage = totalVotes > 0 ? (supportCount / totalVotes) * 100 : 0;

      if (supportPercentage > bestScore) {
        bestScore = supportPercentage;
        bestProposal = proposal;
      }
    }

    if (bestProposal && bestScore >= task.requiredConsensus) {
      const result: ConsensusResult = {
        accepted: true,
        proposal: bestProposal,
        supportPercentage: bestScore,
        leadPeer: bestProposal.fromPeer
      };

      setConsensusResults(prev => [...prev, result]);
      addLog('success', `✅ Consensus reached (${bestScore.toFixed(0)}% support)`);

      // Update peer reputations
      setPeers(prev => prev.map(p => {
        if (p.id === bestProposal.fromPeer) {
          return { ...p, reputation: Math.min(1, p.reputation + 0.05) };
        }
        return p;
      }));
    } else {
      addLog('retry', `⚠️ No consensus reached (best: ${bestScore.toFixed(0)}%)`);
    }

    // Reset peer statuses
    setPeers(prev => prev.map(p => ({ ...p, status: 'idle', currentProposal: undefined })));
  }, [selectedTaskIndex, peers, speed, addLog, createProposal, evaluateProposal, broadcastMessage]);

  const runPeerCollaboration = useCallback(async () => {
    if (isRunning) return;

    setIsRunning(true);
    const task = TASKS[selectedTaskIndex];

    // Reset state
    setPeers(PEERS.map(p => ({ ...p, status: 'idle', contributions: 0 })));
    setProposals([]);
    setMessages([]);
    setConsensusResults([]);
    setCurrentPhaseIndex(-1);
    setLogs([]);
    setActiveConnections([]);
    setNetworkStats({
      totalMessages: 0,
      consensusReached: 0,
      averageConvergenceTime: 0,
      networkEfficiency: 100
    });

    addLog('start', `🚀 Starting peer collaboration: ${task.name}`);
    addLog('info', task.description);
    addLog('config', `Required consensus: ${task.requiredConsensus}%`);

    const startTime = Date.now();
    let totalConsensusReached = 0;

    // Process each phase
    for (let i = 0; i < task.phases.length; i++) {
      await processPhase(task.phases[i], i);

      if (i < task.phases.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500 / speed));
      }
    }

    const endTime = Date.now();
    const totalTime = (endTime - startTime) / 1000;

    // Get final consensus count
    setConsensusResults(prev => {
      totalConsensusReached = prev.length;
      return prev;
    });

    // Update network stats with a delay to ensure state is updated
    setTimeout(() => {
      setNetworkStats(prev => ({
        ...prev,
        consensusReached: totalConsensusReached,
        averageConvergenceTime: totalTime / task.phases.length,
        networkEfficiency: (totalConsensusReached / task.phases.length) * 100
      }));

      addLog('complete', `🎉 Collaboration completed in ${totalTime.toFixed(1)}s`);
      addLog('stats', `Consensus rounds: ${totalConsensusReached}/${task.phases.length}`);
    }, 100);

    // Mark all peers as completed
    setPeers(prev => prev.map(p => ({ ...p, status: 'completed' })));

    setCurrentPhaseIndex(-1);
    setIsRunning(false);
  }, [isRunning, selectedTaskIndex, speed, processPhase, addLog]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setPeers(PEERS.map(p => ({ ...p, status: 'idle', contributions: 0 })));
    setProposals([]);
    setMessages([]);
    setConsensusResults([]);
    setCurrentPhaseIndex(-1);
    setLogs([]);
    setActiveConnections([]);
    setNetworkStats({
      totalMessages: 0,
      consensusReached: 0,
      averageConvergenceTime: 0,
      networkEfficiency: 100
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-purple-400" />
            Peer Collaboration Demo
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Decentralized collaboration between equal agents without central authority
          </p>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={selectedTaskIndex}
            onChange={(e) => setSelectedTaskIndex(Number(e.target.value))}
            className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-sm text-white"
            disabled={isRunning}
          >
            {TASKS.map((task, idx) => (
              <option key={idx} value={idx}>{task.name}</option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Speed:</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-24"
              disabled={isRunning}
            />
            <span className="text-sm text-gray-400 w-12">{speed}x</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runPeerCollaboration}
              disabled={isRunning}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                isRunning
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  Running
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Collaboration
                </>
              )}
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Peer Network Visualization */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-white">Peer Network</h4>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>Phase: {currentPhaseIndex >= 0 ? TASKS[selectedTaskIndex].phases[currentPhaseIndex] : 'idle'}</span>
            <span>Messages: {networkStats.totalMessages}</span>
          </div>
        </div>

        <div className="relative h-64">
          {/* Network connections */}
          <svg className="absolute inset-0 w-full h-full">
            {peers.map(peer => (
              peer.connections.map(connectionId => {
                const targetPeer = peers.find(p => p.id === connectionId);
                if (!targetPeer) return null;
                const fromIndex = peers.indexOf(peer);
                const toIndex = peers.indexOf(targetPeer);
                if (fromIndex < toIndex) {
                  const isActive = activeConnections.some(
                    c => (c.from === peer.id && c.to === connectionId) ||
                         (c.from === connectionId && c.to === peer.id)
                  );
                  const x1 = 100 + (fromIndex % 3) * 200;
                  const y1 = 60 + Math.floor(fromIndex / 3) * 120;
                  const x2 = 100 + (toIndex % 3) * 200;
                  const y2 = 60 + Math.floor(toIndex / 3) * 120;

                  return (
                    <line
                      key={`${peer.id}-${connectionId}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isActive ? '#a855f7' : '#374151'}
                      strokeWidth={isActive ? 2 : 1}
                      strokeDasharray={isActive ? '0' : '5,5'}
                      className={isActive ? 'animate-pulse' : ''}
                    />
                  );
                }
                return null;
              })
            ))}
          </svg>

          {/* Peer nodes */}
          {peers.map((peer, idx) => {
            const x = 50 + (idx % 3) * 200;
            const y = 20 + Math.floor(idx / 3) * 120;

            return (
              <div
                key={peer.id}
                className="absolute"
                style={{ left: `${x}px`, top: `${y}px` }}
              >
                <div className={`relative bg-gray-800 rounded-lg p-3 border-2 transition-all ${
                  peer.status === 'proposing' ? 'border-yellow-500 animate-pulse' :
                  peer.status === 'evaluating' ? 'border-blue-500' :
                  peer.status === 'consensus' ? 'border-green-500' :
                  peer.status === 'completed' ? 'border-green-600' :
                  'border-gray-700'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={peer.color}>{peer.icon}</span>
                    <div className="text-xs">
                      <div className="font-semibold text-white">{peer.name}</div>
                      <div className="text-gray-400">{peer.expertise}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Rep: {(peer.reputation * 100).toFixed(0)}%</span>
                    <span className="text-gray-500">Contrib: {peer.contributions}</span>
                  </div>

                  {peer.status !== 'idle' && (
                    <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${
                      peer.status === 'proposing' ? 'bg-yellow-500' :
                      peer.status === 'evaluating' ? 'bg-blue-500' :
                      peer.status === 'consensus' ? 'bg-green-500' :
                      'bg-gray-500'
                    } animate-pulse`} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Proposals & Consensus */}
      <div className="grid grid-cols-2 gap-4">
        {/* Active Proposals */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-5 h-5 text-yellow-400" />
            <h4 className="text-sm font-semibold text-white">Active Proposals</h4>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {proposals.slice(-5).reverse().map(proposal => {
              const peer = peers.find(p => p.id === proposal.fromPeer);
              const supportCount = Object.values(proposal.votes).filter(v => v === 'support').length;
              const totalVotes = Object.keys(proposal.votes).length;

              return (
                <div key={proposal.id} className="bg-gray-900 rounded p-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-semibold ${peer?.color}`}>
                      {peer?.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {(proposal.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 mb-1">{proposal.content}</div>
                  {totalVotes > 0 && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-green-400">↑ {supportCount}</span>
                      <span className="text-red-400">
                        ↓ {Object.values(proposal.votes).filter(v => v === 'oppose').length}
                      </span>
                      <span className="text-gray-500">
                        - {Object.values(proposal.votes).filter(v => v === 'abstain').length}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Consensus Results */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h4 className="text-sm font-semibold text-white">Consensus Achieved</h4>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {consensusResults.length > 0 ? (
              consensusResults.map((result, idx) => {
                const peer = peers.find(p => p.id === result.leadPeer);
                return (
                  <div key={idx} className="bg-gray-900 rounded p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-semibold ${peer?.color}`}>
                        {peer?.name}
                      </span>
                      <span className="text-xs text-green-400">
                        {result.supportPercentage.toFixed(0)}% support
                      </span>
                    </div>
                    <div className="text-xs text-gray-300">{result.proposal.content}</div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-gray-500 py-4">
                <div className="text-sm">No consensus reached yet</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Total Messages</div>
          <div className="text-xl font-bold text-white">{networkStats.totalMessages}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Consensus Reached</div>
          <div className="text-xl font-bold text-white">{networkStats.consensusReached}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Avg Convergence</div>
          <div className="text-xl font-bold text-white">
            {networkStats.averageConvergenceTime > 0 ? `${networkStats.averageConvergenceTime.toFixed(1)}s` : '-'}
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Network Efficiency</div>
          <div className="text-xl font-bold text-white">{networkStats.networkEfficiency.toFixed(0)}%</div>
        </div>
      </div>

      {/* Collaboration Log */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 h-48 overflow-y-auto">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-semibold text-white">Collaboration Log</h4>
        </div>

        <div className="space-y-1 font-mono text-xs">
          {logs.map((log, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-gray-600">{log.timestamp}</span>
              <span className={`font-semibold ${
                log.type === 'start' ? 'text-blue-400' :
                log.type === 'phase' ? 'text-purple-400' :
                log.type === 'broadcast' ? 'text-yellow-400' :
                log.type === 'voting' ? 'text-cyan-400' :
                log.type === 'consensus' ? 'text-pink-400' :
                log.type === 'success' ? 'text-green-400' :
                log.type === 'retry' ? 'text-orange-400' :
                log.type === 'complete' ? 'text-green-400' :
                log.type === 'stats' ? 'text-blue-400' :
                'text-gray-400'
              }`}>
                [{log.type.toUpperCase()}]
              </span>
              <span className="text-gray-300">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}