'use client';

import React, { useState, useEffect } from 'react';

type PhaseType = 'idle' | 'window-sizing' | 'recency-weighting' | 'relevance-scoring' | 'boundary-management' | 'performance-tuning' | 'complete';
type MessageStatus = 'outside' | 'candidate' | 'retained' | 'dropped';

interface Message {
  id: string;
  turn: number;
  role: 'user' | 'assistant';
  content: string;
  tokens: number;
  timestamp: number;
  recencyScore: number;
  relevanceScore: number;
  finalScore: number;
  status: MessageStatus;
  isKeyContext: boolean;
}

interface WindowState {
  currentSize: number;
  maxSize: number;
  targetSize: number;
  messagesInWindow: number;
  tokensUsed: number;
}

interface Metrics {
  contextUtilization: number;
  coherenceScore: number;
  responseQuality: number;
  memoryEfficiency: number;
  adaptationSpeedMs: number;
  boundarySmoothness: number;
}

const initialMessages: Message[] = [
  { id: 'msg-1', turn: 1, role: 'user', content: 'What is RAG?', tokens: 80, timestamp: 0, recencyScore: 0, relevanceScore: 0, finalScore: 0, status: 'outside', isKeyContext: false },
  { id: 'msg-2', turn: 1, role: 'assistant', content: 'RAG stands for Retrieval-Augmented Generation...', tokens: 320, timestamp: 1, recencyScore: 0, relevanceScore: 0, finalScore: 0, status: 'outside', isKeyContext: true },
  { id: 'msg-3', turn: 2, role: 'user', content: 'Can you explain vector databases?', tokens: 90, timestamp: 2, recencyScore: 0, relevanceScore: 0, finalScore: 0, status: 'outside', isKeyContext: false },
  { id: 'msg-4', turn: 2, role: 'assistant', content: 'Vector databases store embeddings for semantic search...', tokens: 380, timestamp: 3, recencyScore: 0, relevanceScore: 0, finalScore: 0, status: 'outside', isKeyContext: true },
  { id: 'msg-5', turn: 3, role: 'user', content: 'Interesting! What about semantic search?', tokens: 75, timestamp: 4, recencyScore: 0, relevanceScore: 0, finalScore: 0, status: 'outside', isKeyContext: false },
  { id: 'msg-6', turn: 3, role: 'assistant', content: 'Semantic search uses embeddings to find similar content...', tokens: 410, timestamp: 5, recencyScore: 0, relevanceScore: 0, finalScore: 0, status: 'outside', isKeyContext: true },
  { id: 'msg-7', turn: 4, role: 'user', content: 'Tell me more about embeddings', tokens: 85, timestamp: 6, recencyScore: 0, relevanceScore: 0, finalScore: 0, status: 'outside', isKeyContext: false },
  { id: 'msg-8', turn: 4, role: 'assistant', content: 'Embeddings are dense vector representations...', tokens: 360, timestamp: 7, recencyScore: 0, relevanceScore: 0, finalScore: 0, status: 'outside', isKeyContext: true },
  { id: 'msg-9', turn: 5, role: 'user', content: 'How do I implement RAG in Python?', tokens: 95, timestamp: 8, recencyScore: 0, relevanceScore: 0, finalScore: 0, status: 'outside', isKeyContext: true },
  { id: 'msg-10', turn: 5, role: 'assistant', content: 'Here is a complete implementation guide...', tokens: 520, timestamp: 9, recencyScore: 0, relevanceScore: 0, finalScore: 0, status: 'outside', isKeyContext: true },
];

export default function SlidingWindowManagementDemo() {
  const [phase, setPhase] = useState<PhaseType>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [windowState, setWindowState] = useState<WindowState>({
    currentSize: 0,
    maxSize: 2000,
    targetSize: 1600,
    messagesInWindow: 0,
    tokensUsed: 0,
  });
  const [metrics, setMetrics] = useState<Metrics>({
    contextUtilization: 0,
    coherenceScore: 0,
    responseQuality: 0,
    memoryEfficiency: 0,
    adaptationSpeedMs: 0,
    boundarySmoothness: 0,
  });

  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];
    const startTime = Date.now();

    if (phase === 'idle') {
      timeouts.push(setTimeout(() => setPhase('window-sizing'), 100));
    }

    else if (phase === 'window-sizing') {
      const totalTokens = initialMessages.reduce((sum, msg) => sum + msg.tokens, 0);
      const complexityFactor = totalTokens > 2500 ? 1.2 : 1.0;
      const targetSize = Math.floor(windowState.maxSize * 0.8 * complexityFactor);

      setWindowState(prev => ({
        ...prev,
        targetSize: Math.min(targetSize, prev.maxSize),
      }));

      timeouts.push(setTimeout(() => setPhase('recency-weighting'), 400));
    }

    else if (phase === 'recency-weighting') {
      const maxTimestamp = Math.max(...initialMessages.map(m => m.timestamp));
      const decayRate = 0.15;

      let msgIndex = 0;
      const processMessage = () => {
        if (msgIndex >= initialMessages.length) {
          timeouts.push(setTimeout(() => setPhase('relevance-scoring'), 300));
          return;
        }

        const msg = initialMessages[msgIndex];
        const age = maxTimestamp - msg.timestamp;
        const recencyScore = Math.exp(-decayRate * age);

        setMessages(prev => prev.map(m =>
          m.id === msg.id
            ? { ...m, recencyScore, status: 'candidate' as MessageStatus }
            : m
        ));

        msgIndex++;
        timeouts.push(setTimeout(processMessage, 120));
      };

      processMessage();
    }

    else if (phase === 'relevance-scoring') {
      let msgIndex = 0;

      const processMessage = () => {
        if (msgIndex >= initialMessages.length) {
          timeouts.push(setTimeout(() => setPhase('boundary-management'), 300));
          return;
        }

        const msg = initialMessages[msgIndex];

        let relevanceScore = 0.5;
        if (msg.isKeyContext) relevanceScore += 0.3;
        if (msg.role === 'assistant') relevanceScore += 0.1;
        if (msg.tokens > 300) relevanceScore += 0.1;

        const currentMsg = messages.find(m => m.id === msg.id);
        const finalScore = (currentMsg?.recencyScore || 0) * 0.6 + relevanceScore * 0.4;

        setMessages(prev => prev.map(m =>
          m.id === msg.id
            ? { ...m, relevanceScore, finalScore }
            : m
        ));

        msgIndex++;
        timeouts.push(setTimeout(processMessage, 120));
      };

      processMessage();
    }

    else if (phase === 'boundary-management') {
      const sortedMessages = [...messages].sort((a, b) => b.finalScore - a.finalScore);

      let tokensUsed = 0;
      let messagesInWindow = 0;
      const retained = new Set<string>();

      for (const msg of sortedMessages) {
        if (tokensUsed + msg.tokens <= windowState.targetSize) {
          retained.add(msg.id);
          tokensUsed += msg.tokens;
          messagesInWindow++;
        }
      }

      let msgIndex = 0;
      const updateStatus = () => {
        if (msgIndex >= initialMessages.length) {
          setWindowState(prev => ({
            ...prev,
            currentSize: tokensUsed,
            tokensUsed,
            messagesInWindow,
          }));

          timeouts.push(setTimeout(() => setPhase('performance-tuning'), 300));
          return;
        }

        const msg = initialMessages[msgIndex];
        const status: MessageStatus = retained.has(msg.id) ? 'retained' : 'dropped';

        setMessages(prev => prev.map(m =>
          m.id === msg.id ? { ...m, status } : m
        ));

        msgIndex++;
        timeouts.push(setTimeout(updateStatus, 100));
      };

      updateStatus();
    }

    else if (phase === 'performance-tuning') {
      const retainedMessages = messages.filter(m => m.status === 'retained');
      const keyContextRetained = retainedMessages.filter(m => m.isKeyContext).length;
      const totalKeyContext = messages.filter(m => m.isKeyContext).length;

      const contextUtilization = (retainedMessages.length / messages.length) * 100;
      const coherenceScore = (keyContextRetained / totalKeyContext) * 100;
      const responseQuality = Math.min(100, (windowState.tokensUsed / windowState.targetSize) * 95);
      const memoryEfficiency = (retainedMessages.length / windowState.tokensUsed) * 1000;
      const adaptationSpeedMs = Date.now() - startTime;
      const boundarySmoothness = messages.filter(m => m.status === 'dropped' && !m.isKeyContext).length / messages.filter(m => m.status === 'dropped').length * 100;

      setMetrics({
        contextUtilization,
        coherenceScore,
        responseQuality,
        memoryEfficiency,
        adaptationSpeedMs,
        boundarySmoothness: isNaN(boundarySmoothness) ? 100 : boundarySmoothness,
      });

      timeouts.push(setTimeout(() => setPhase('complete'), 400));
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [phase, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setPhase('idle');
    setMessages(initialMessages);
    setWindowState({
      currentSize: 0,
      maxSize: 2000,
      targetSize: 1600,
      messagesInWindow: 0,
      tokensUsed: 0,
    });
    setMetrics({
      contextUtilization: 0,
      coherenceScore: 0,
      responseQuality: 0,
      memoryEfficiency: 0,
      adaptationSpeedMs: 0,
      boundarySmoothness: 0,
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('idle');
    setMessages(initialMessages);
    setWindowState({
      currentSize: 0,
      maxSize: 2000,
      targetSize: 1600,
      messagesInWindow: 0,
      tokensUsed: 0,
    });
    setMetrics({
      contextUtilization: 0,
      coherenceScore: 0,
      responseQuality: 0,
      memoryEfficiency: 0,
      adaptationSpeedMs: 0,
      boundarySmoothness: 0,
    });
  };

  const getPhaseStatus = (targetPhase: PhaseType): 'pending' | 'active' | 'completed' => {
    const phaseOrder: PhaseType[] = ['idle', 'window-sizing', 'recency-weighting', 'relevance-scoring', 'boundary-management', 'performance-tuning', 'complete'];
    const currentIndex = phaseOrder.indexOf(phase);
    const targetIndex = phaseOrder.indexOf(targetPhase);

    if (currentIndex > targetIndex) return 'completed';
    if (currentIndex === targetIndex) return 'active';
    return 'pending';
  };

  const getStatusColor = (status: MessageStatus): string => {
    switch (status) {
      case 'candidate': return 'text-blue-400';
      case 'retained': return 'text-green-400';
      case 'dropped': return 'text-gray-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusBorderColor = (status: MessageStatus): string => {
    switch (status) {
      case 'candidate': return 'border-blue-500/30';
      case 'retained': return 'border-green-500/50';
      case 'dropped': return 'border-slate-700/50';
      default: return 'border-slate-700';
    }
  };

  const getStatusBgColor = (status: MessageStatus): string => {
    switch (status) {
      case 'candidate': return 'bg-blue-500/5';
      case 'retained': return 'bg-green-500/10';
      case 'dropped': return 'bg-slate-800/30';
      default: return 'bg-slate-800';
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Sliding Window Management</h3>
          <p className="text-gray-400 text-sm">
            Dynamic window management with recency bias, relevance scoring, and intelligent retention
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Start Window Management
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {(['window-sizing', 'recency-weighting', 'relevance-scoring', 'boundary-management', 'performance-tuning'] as const).map((p) => {
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
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-300">Window Status</h4>
                <div className="text-xs text-gray-500">
                  {windowState.tokensUsed} / {windowState.targetSize} tokens
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="text-xs text-gray-400 mb-2">Window Utilization</div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-green-500/60 transition-all duration-500"
                      style={{ width: `${(windowState.tokensUsed / windowState.targetSize) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Messages in window</span>
                    <span className="text-green-400 font-mono">{windowState.messagesInWindow} / {messages.length}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="text-xs text-gray-400 mb-2">Window Configuration</div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Max Size</span>
                      <span className="text-blue-400 font-mono">{windowState.maxSize}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Target Size</span>
                      <span className="text-purple-400 font-mono">{windowState.targetSize}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Current Size</span>
                      <span className="text-green-400 font-mono">{windowState.currentSize}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Performance Metrics</h4>
              <div className="space-y-2">
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Context Utilization</span>
                    <span className={`text-sm font-mono ${
                      metrics.contextUtilization > 0 ? 'text-green-400' : 'text-gray-500'
                    }`}>
                      {metrics.contextUtilization > 0 ? `${metrics.contextUtilization.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Coherence Score</span>
                    <span className={`text-sm font-mono ${
                      metrics.coherenceScore > 0
                        ? metrics.coherenceScore >= 80 ? 'text-green-400' : 'text-yellow-400'
                        : 'text-gray-500'
                    }`}>
                      {metrics.coherenceScore > 0 ? `${metrics.coherenceScore.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Response Quality</span>
                    <span className={`text-sm font-mono ${
                      metrics.responseQuality > 0 ? 'text-green-400' : 'text-gray-500'
                    }`}>
                      {metrics.responseQuality > 0 ? `${metrics.responseQuality.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Memory Efficiency</span>
                    <span className={`text-sm font-mono ${
                      metrics.memoryEfficiency > 0 ? 'text-blue-400' : 'text-gray-500'
                    }`}>
                      {metrics.memoryEfficiency > 0 ? metrics.memoryEfficiency.toFixed(2) : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Adaptation Speed</span>
                    <span className={`text-sm font-mono ${
                      metrics.adaptationSpeedMs > 0 ? 'text-blue-400' : 'text-gray-500'
                    }`}>
                      {metrics.adaptationSpeedMs > 0 ? `${metrics.adaptationSpeedMs}ms` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Boundary Smoothness</span>
                    <span className={`text-sm font-mono ${
                      metrics.boundarySmoothness > 0 ? 'text-green-400' : 'text-gray-500'
                    }`}>
                      {metrics.boundarySmoothness > 0 ? `${metrics.boundarySmoothness.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Conversation History</h4>
            <div className="space-y-2 max-h-[700px] overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-lg border ${getStatusBorderColor(msg.status)} ${getStatusBgColor(msg.status)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium ${msg.role === 'user' ? 'text-blue-300' : 'text-purple-300'}`}>
                          Turn {msg.turn} - {msg.role === 'user' ? 'User' : 'Assistant'}
                        </span>
                        {msg.isKeyContext && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-300 px-1.5 py-0.5 rounded border border-yellow-500/30">
                            Key
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-300 mb-2">{msg.content}</div>
                    </div>
                    <span className={`text-xs ml-2 ${getStatusColor(msg.status)}`}>
                      {msg.status === 'outside' ? 'Outside' :
                       msg.status === 'candidate' ? '⟳ Eval' :
                       msg.status === 'retained' ? '✓ Keep' : '✗ Drop'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-xs">
                      <span className="text-gray-500">Tokens: </span>
                      <span className="text-gray-400 font-mono">{msg.tokens}</span>
                    </div>
                    {msg.recencyScore > 0 && (
                      <div className="text-xs">
                        <span className="text-gray-500">Recency: </span>
                        <span className="text-blue-400 font-mono">{(msg.recencyScore * 100).toFixed(0)}%</span>
                      </div>
                    )}
                    {msg.relevanceScore > 0 && (
                      <div className="text-xs">
                        <span className="text-gray-500">Relevance: </span>
                        <span className="text-purple-400 font-mono">{(msg.relevanceScore * 100).toFixed(0)}%</span>
                      </div>
                    )}
                    {msg.finalScore > 0 && (
                      <div className="text-xs">
                        <span className="text-gray-500">Final: </span>
                        <span className={`font-mono ${
                          msg.status === 'retained' ? 'text-green-400' : 'text-gray-400'
                        }`}>
                          {(msg.finalScore * 100).toFixed(0)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {phase === 'complete' && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="text-sm font-medium text-green-400 mb-2">
              ✓ Window Management Complete
            </div>
            <div className="text-xs text-gray-300 space-y-1">
              <div>• Managed {messages.length} messages totaling {messages.reduce((sum, m) => sum + m.tokens, 0)} tokens</div>
              <div>• Retained {windowState.messagesInWindow} messages ({windowState.tokensUsed} tokens) within {windowState.targetSize} token window</div>
              <div>• Applied exponential decay (15% rate) for recency weighting and relevance scoring</div>
              <div>• Achieved {metrics.coherenceScore.toFixed(1)}% coherence by prioritizing key context</div>
              <div>• Memory efficiency: {metrics.memoryEfficiency.toFixed(2)} messages per 1K tokens with {metrics.boundarySmoothness.toFixed(1)}% boundary smoothness</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}