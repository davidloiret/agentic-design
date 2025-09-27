'use client';

import React, { useState, useEffect } from 'react';
import { Brain, MessageSquare, GitBranch, HardDrive, AlertTriangle, CheckCircle, RefreshCw, Save, Shield, Database } from 'lucide-react';

interface ConversationTurn {
  id: string;
  role: 'user' | 'agent';
  message: string;
  timestamp: number;
  preserved: boolean;
}

interface MemoryState {
  shortTerm: string[];
  longTerm: string[];
  workingMemory: string[];
  episodic: Array<{
    event: string;
    timestamp: number;
    importance: number;
  }>;
}

interface ReasoningChain {
  id: string;
  step: number;
  thought: string;
  action: string;
  observation: string;
  preserved: boolean;
}

interface ContextSnapshot {
  id: string;
  timestamp: number;
  conversation: ConversationTurn[];
  memory: MemoryState;
  reasoning: ReasoningChain[];
  metadata: {
    turnCount: number;
    memorySize: number;
    reasoningDepth: number;
  };
}

interface RecoveryMetrics {
  contextIntegrity: number;
  memoryRecovery: number;
  reasoningContinuity: number;
  recoveryTime: number;
}

const ACPDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [systemStatus, setSystemStatus] = useState<'active' | 'preserving' | 'failed' | 'recovering' | 'restored'>('active');
  const [conversation, setConversation] = useState<ConversationTurn[]>([]);
  const [memoryState, setMemoryState] = useState<MemoryState>({
    shortTerm: [],
    longTerm: [],
    workingMemory: [],
    episodic: []
  });
  const [reasoningChains, setReasoningChains] = useState<ReasoningChain[]>([]);
  const [snapshots, setSnapshots] = useState<ContextSnapshot[]>([]);
  const [recoveryMetrics, setRecoveryMetrics] = useState<RecoveryMetrics>({
    contextIntegrity: 100,
    memoryRecovery: 100,
    reasoningContinuity: 100,
    recoveryTime: 0
  });
  const [preservationStrategy, setPreservationStrategy] = useState<'full' | 'incremental' | 'critical'>('incremental');
  const [failureSimulated, setFailureSimulated] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  const simulationMessages = [
    { role: 'user', message: 'Help me debug this authentication issue in my app' },
    { role: 'agent', message: 'I\'ll help you debug the authentication issue. Let me analyze the problem step by step.' },
    { role: 'user', message: 'Users can\'t log in after the recent update' },
    { role: 'agent', message: 'Let me check common causes: 1) Token validation, 2) Session management, 3) API endpoints' },
    { role: 'user', message: 'The error says "Invalid token signature"' },
    { role: 'agent', message: 'This indicates a JWT signing key mismatch. Let\'s verify your environment variables.' },
    { role: 'user', message: 'The JWT_SECRET seems different in production' },
    { role: 'agent', message: 'That\'s the issue! The JWT secrets must match between services. Update your production config.' }
  ];

  const generateReasoningStep = (stepNum: number): ReasoningChain => {
    const thoughts = [
      'Analyzing user authentication flow',
      'Checking token validation process',
      'Examining session management',
      'Reviewing API endpoint configuration',
      'Identifying JWT signature mismatch',
      'Formulating solution approach'
    ];

    const actions = [
      'RETRIEVE: Authentication documentation',
      'ANALYZE: Error logs and stack traces',
      'COMPARE: Development vs Production configs',
      'VALIDATE: JWT token structure',
      'IDENTIFY: Configuration discrepancy',
      'PROPOSE: Configuration update solution'
    ];

    const observations = [
      'Authentication flow appears standard',
      'Error occurs during token validation',
      'Environment configurations differ',
      'JWT signature validation failing',
      'JWT_SECRET mismatch confirmed',
      'Solution requires config synchronization'
    ];

    return {
      id: `reasoning-${stepNum}`,
      step: stepNum,
      thought: thoughts[stepNum % thoughts.length],
      action: actions[stepNum % actions.length],
      observation: observations[stepNum % observations.length],
      preserved: false
    };
  };

  const updateMemoryState = (turn: ConversationTurn) => {
    setMemoryState(prev => {
      const newShortTerm = [...prev.shortTerm.slice(-4), turn.message.substring(0, 50)];
      const newWorkingMemory = turn.role === 'user'
        ? [...prev.workingMemory.slice(-2), `Query: ${turn.message.substring(0, 30)}`]
        : [...prev.workingMemory.slice(-2), `Response: ${turn.message.substring(0, 30)}`];

      // Add important items to long-term memory
      if (turn.message.toLowerCase().includes('issue') || turn.message.toLowerCase().includes('error')) {
        prev.longTerm.push(`Important: ${turn.message.substring(0, 40)}`);
      }

      // Add to episodic memory
      const newEpisodic = {
        event: turn.message.substring(0, 40),
        timestamp: turn.timestamp,
        importance: turn.message.toLowerCase().includes('error') ? 0.9 : 0.5
      };

      return {
        shortTerm: newShortTerm,
        longTerm: prev.longTerm.slice(-10),
        workingMemory: newWorkingMemory,
        episodic: [...prev.episodic.slice(-5), newEpisodic]
      };
    });
  };

  const createSnapshot = (): ContextSnapshot => {
    const snapshot: ContextSnapshot = {
      id: `snapshot-${Date.now()}`,
      timestamp: Date.now(),
      conversation: preservationStrategy === 'critical'
        ? conversation.filter(c => c.message.toLowerCase().includes('error') || c.message.toLowerCase().includes('issue'))
        : conversation,
      memory: {
        ...memoryState,
        shortTerm: preservationStrategy === 'full' ? memoryState.shortTerm : memoryState.shortTerm.slice(-2),
        workingMemory: memoryState.workingMemory
      },
      reasoning: preservationStrategy === 'critical'
        ? reasoningChains.filter(r => r.step % 2 === 0) // Keep even steps only
        : reasoningChains,
      metadata: {
        turnCount: conversation.length,
        memorySize: memoryState.shortTerm.length + memoryState.longTerm.length,
        reasoningDepth: reasoningChains.length
      }
    };

    // Mark items as preserved
    setConversation(prev => prev.map(c => ({ ...c, preserved: true })));
    setReasoningChains(prev => prev.map(r => ({ ...r, preserved: true })));

    return snapshot;
  };

  const simulateFailure = () => {
    if (!failureSimulated) {
      setSystemStatus('failed');
      setFailureSimulated(true);

      // Clear current state to simulate loss
      setTimeout(() => {
        setConversation([]);
        setMemoryState({
          shortTerm: [],
          longTerm: [],
          workingMemory: [],
          episodic: []
        });
        setReasoningChains([]);
      }, 500);
    }
  };

  const performRecovery = async () => {
    if (snapshots.length === 0) return;

    setSystemStatus('recovering');
    setAnimationProgress(0);
    const recoveryStartTime = Date.now();

    // Get most recent snapshot
    const latestSnapshot = snapshots[snapshots.length - 1];

    // Phase 1: Restore conversation context
    await new Promise(resolve => setTimeout(resolve, 600));
    setConversation(latestSnapshot.conversation);
    setAnimationProgress(30);

    // Phase 2: Restore memory state
    await new Promise(resolve => setTimeout(resolve, 800));
    setMemoryState(latestSnapshot.memory);
    setAnimationProgress(60);

    // Phase 3: Restore reasoning chains
    await new Promise(resolve => setTimeout(resolve, 700));
    setReasoningChains(latestSnapshot.reasoning);
    setAnimationProgress(90);

    // Phase 4: Validate and complete
    await new Promise(resolve => setTimeout(resolve, 500));
    setAnimationProgress(100);

    const recoveryTime = (Date.now() - recoveryStartTime) / 1000;

    // Calculate recovery metrics
    const contextIntegrity = (latestSnapshot.conversation.length / latestSnapshot.metadata.turnCount) * 100;
    const memoryRecovery = (latestSnapshot.memory.shortTerm.length / latestSnapshot.metadata.memorySize) * 100;
    const reasoningContinuity = (latestSnapshot.reasoning.length / latestSnapshot.metadata.reasoningDepth) * 100;

    setRecoveryMetrics({
      contextIntegrity: Math.min(100, contextIntegrity),
      memoryRecovery: Math.min(100, memoryRecovery),
      reasoningContinuity: Math.min(100, reasoningContinuity),
      recoveryTime
    });

    setSystemStatus('restored');
    setFailureSimulated(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    let messageIndex = 0;
    let reasoningStep = 0;

    const interval = setInterval(() => {
      // Add conversation turns sequentially
      if (messageIndex < simulationMessages.length && !failureSimulated && systemStatus !== 'failed') {
        const msg = simulationMessages[messageIndex];
        const turn: ConversationTurn = {
          id: `turn-${Date.now()}-${messageIndex}`,
          role: msg.role as 'user' | 'agent',
          message: msg.message,
          timestamp: Date.now(),
          preserved: false
        };

        setConversation(prev => [...prev, turn]);
        updateMemoryState(turn);

        // Add reasoning for agent responses
        if (msg.role === 'agent') {
          const reasoning = generateReasoningStep(reasoningStep);
          setReasoningChains(prev => [...prev, reasoning]);
          reasoningStep++;
        }

        messageIndex++;

        // Create snapshots based on strategy
        const shouldSnapshot = preservationStrategy === 'full'
          ? messageIndex % 2 === 0  // Every 2 messages
          : preservationStrategy === 'incremental'
          ? messageIndex % 3 === 0  // Every 3 messages
          : messageIndex % 4 === 0; // Every 4 messages for critical

        if (shouldSnapshot && messageIndex > 0) {
          setSystemStatus('preserving');
          const snapshot = createSnapshot();
          setSnapshots(prev => [...prev.slice(-4), snapshot]);
          setTimeout(() => {
            setSystemStatus('active');
          }, 300);
        }

        // Simulate failure after 6 messages
        if (messageIndex === 6 && !failureSimulated) {
          setTimeout(() => {
            simulateFailure();
          }, 1000);
        }
      }

      // Stop interval if we've processed all messages or system failed
      if (messageIndex >= simulationMessages.length || systemStatus === 'failed') {
        clearInterval(interval);
      }

    }, 2000); // Slightly slower for better visibility

    return () => clearInterval(interval);
  }, [isRunning, systemStatus, failureSimulated, preservationStrategy]);

  useEffect(() => {
    if (systemStatus === 'failed' && snapshots.length > 0) {
      setTimeout(() => performRecovery(), 1500);
    }
  }, [systemStatus, snapshots]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-950';
      case 'preserving': return 'text-blue-400 bg-blue-950';
      case 'failed': return 'text-red-400 bg-red-950';
      case 'recovering': return 'text-yellow-400 bg-yellow-950';
      case 'restored': return 'text-cyan-400 bg-cyan-950';
      default: return 'text-gray-400 bg-gray-900';
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 90) return 'text-green-400';
    if (value >= 70) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Agent Context Preservation & Recovery Demo</h2>

        {/* Preservation Strategy */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200">Preservation Strategy</h3>
          <div className="grid grid-cols-3 gap-3">
            {(['full', 'incremental', 'critical'] as const).map(strategy => (
              <button
                key={strategy}
                onClick={() => !isRunning && setPreservationStrategy(strategy)}
                disabled={isRunning}
                className={`p-3 rounded border transition-all ${
                  preservationStrategy === strategy
                    ? 'bg-purple-950 border-purple-500 text-purple-300'
                    : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="font-medium capitalize mb-1">{strategy}</div>
                <div className="text-xs">
                  {strategy === 'full' && 'Complete context & memory'}
                  {strategy === 'incremental' && 'Periodic checkpoints'}
                  {strategy === 'critical' && 'Essential data only'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-200">System Status</h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(systemStatus)}`}>
              {systemStatus.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Conversation Context */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            Conversation Context
          </h3>
          <div className="bg-gray-900 p-4 rounded border border-gray-700 max-h-64 overflow-y-auto">
            {conversation.length === 0 ? (
              <p className="text-gray-500 text-sm">No conversation yet...</p>
            ) : (
              <div className="space-y-2">
                {conversation.map(turn => (
                  <div
                    key={turn.id}
                    className={`flex gap-3 ${turn.role === 'user' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[70%] p-3 rounded-lg ${
                      turn.role === 'user'
                        ? 'bg-gray-800 text-gray-200'
                        : 'bg-blue-900 text-blue-100'
                    } ${turn.preserved ? 'ring-2 ring-green-500 ring-opacity-30' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium">
                          {turn.role === 'user' ? 'User' : 'Agent'}
                        </span>
                        {turn.preserved && (
                          <Shield className="w-3 h-3 text-green-400" />
                        )}
                      </div>
                      <p className="text-sm">{turn.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Memory State */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Memory State
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="text-xs font-medium text-gray-400 mb-2">Short-Term Memory</div>
              <div className="space-y-1">
                {memoryState.shortTerm.slice(-3).map((item, idx) => (
                  <div key={idx} className="text-xs text-gray-300 truncate">{item}</div>
                ))}
                {memoryState.shortTerm.length === 0 && (
                  <div className="text-xs text-gray-600">Empty</div>
                )}
              </div>
            </div>

            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="text-xs font-medium text-gray-400 mb-2">Working Memory</div>
              <div className="space-y-1">
                {memoryState.workingMemory.slice(-3).map((item, idx) => (
                  <div key={idx} className="text-xs text-gray-300 truncate">{item}</div>
                ))}
                {memoryState.workingMemory.length === 0 && (
                  <div className="text-xs text-gray-600">Empty</div>
                )}
              </div>
            </div>

            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="text-xs font-medium text-gray-400 mb-2">Long-Term Memory</div>
              <div className="space-y-1">
                {memoryState.longTerm.slice(-3).map((item, idx) => (
                  <div key={idx} className="text-xs text-gray-300 truncate">{item}</div>
                ))}
                {memoryState.longTerm.length === 0 && (
                  <div className="text-xs text-gray-600">Empty</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reasoning Chains */}
        {reasoningChains.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-cyan-400" />
              Reasoning Chains
            </h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-700">
              <div className="space-y-2">
                {reasoningChains.slice(-3).map(chain => (
                  <div
                    key={chain.id}
                    className={`p-3 bg-gray-800 rounded ${
                      chain.preserved ? 'ring-2 ring-green-500 ring-opacity-30' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-400">Step {chain.step}</span>
                      {chain.preserved && <Shield className="w-3 h-3 text-green-400" />}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Thought:</span>
                        <p className="text-gray-300 mt-1">{chain.thought}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Action:</span>
                        <p className="text-cyan-300 mt-1">{chain.action}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Observation:</span>
                        <p className="text-green-300 mt-1">{chain.observation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Context Snapshots */}
        {snapshots.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-green-400" />
              Context Snapshots
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {snapshots.slice(-2).map((snapshot, idx) => (
                <div key={snapshot.id} className="bg-gray-900 p-3 rounded border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">
                      Snapshot {snapshots.length - (snapshots.length - idx - 1)}
                    </span>
                    <Save className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Conversation:</span>
                      <span className="text-gray-300">{snapshot.metadata.turnCount} turns</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Memory Size:</span>
                      <span className="text-gray-300">{snapshot.metadata.memorySize} items</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Reasoning:</span>
                      <span className="text-gray-300">{snapshot.metadata.reasoningDepth} steps</span>
                    </div>
                    <div className="text-gray-600 mt-2">
                      {new Date(snapshot.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recovery Progress */}
        {systemStatus === 'recovering' && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-yellow-400 animate-spin" />
              Recovery in Progress
            </h3>
            <div className="bg-gray-900 p-4 rounded border border-yellow-700">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Restoring conversation context...</span>
                  {animationProgress >= 30 && <CheckCircle className="w-4 h-4 text-green-400" />}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Recovering memory state...</span>
                  {animationProgress >= 60 && <CheckCircle className="w-4 h-4 text-green-400" />}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Rebuilding reasoning chains...</span>
                  {animationProgress >= 90 && <CheckCircle className="w-4 h-4 text-green-400" />}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Validating integrity...</span>
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
            <Database className="w-5 h-5 text-indigo-400" />
            Recovery Metrics
          </h3>
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Context Integrity</div>
              <div className={`text-xl font-bold ${getMetricColor(recoveryMetrics.contextIntegrity)}`}>
                {recoveryMetrics.contextIntegrity.toFixed(1)}%
              </div>
            </div>
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Memory Recovery</div>
              <div className={`text-xl font-bold ${getMetricColor(recoveryMetrics.memoryRecovery)}`}>
                {recoveryMetrics.memoryRecovery.toFixed(1)}%
              </div>
            </div>
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Reasoning Continuity</div>
              <div className={`text-xl font-bold ${getMetricColor(recoveryMetrics.reasoningContinuity)}`}>
                {recoveryMetrics.reasoningContinuity.toFixed(1)}%
              </div>
            </div>
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Recovery Time</div>
              <div className="text-xl font-bold text-cyan-400">
                {recoveryMetrics.recoveryTime.toFixed(1)}s
              </div>
            </div>
          </div>
        </div>

        {/* How ACP Works */}
        <div className="bg-gray-900 p-4 rounded border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            How Agent Context Preservation Works
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">1.</span>
              <div>
                <p className="font-medium text-gray-200">Continuous Snapshotting</p>
                <p className="text-xs text-gray-400">Periodically save conversation, memory, and reasoning state</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">2.</span>
              <div>
                <p className="font-medium text-gray-200">Multi-Level Memory</p>
                <p className="text-xs text-gray-400">Preserve short-term, working, long-term, and episodic memory</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">3.</span>
              <div>
                <p className="font-medium text-gray-200">Reasoning Chain Tracking</p>
                <p className="text-xs text-gray-400">Maintain thought-action-observation sequences</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">4.</span>
              <div>
                <p className="font-medium text-gray-200">Smart Recovery</p>
                <p className="text-xs text-gray-400">Restore from latest snapshot with integrity validation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">5.</span>
              <div>
                <p className="font-medium text-gray-200">Context Continuity</p>
                <p className="text-xs text-gray-400">Seamlessly resume conversations after failures</p>
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
                setSystemStatus('active');
              } else {
                // Reset everything for fresh start
                setConversation([]);
                setMemoryState({
                  shortTerm: [],
                  longTerm: [],
                  workingMemory: [],
                  episodic: []
                });
                setReasoningChains([]);
                setSnapshots([]);
                setFailureSimulated(false);
                setSystemStatus('active');
                setAnimationProgress(0);
                setRecoveryMetrics({
                  contextIntegrity: 100,
                  memoryRecovery: 100,
                  reasoningContinuity: 100,
                  recoveryTime: 0
                });
                setIsRunning(true);
              }
            }}
            className={`flex-1 py-3 rounded text-white font-medium transition-colors ${
              isRunning
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isRunning ? 'Stop Agent' : 'Start Agent Conversation'}
          </button>

          {!isRunning && conversation.length > 3 && !failureSimulated && (
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

export default ACPDemo;