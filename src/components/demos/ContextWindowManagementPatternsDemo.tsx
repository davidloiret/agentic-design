'use client';

import React, { useState, useEffect } from 'react';
import {
  Gauge,
  AlertTriangle,
  Pin,
  Minimize2,
  Maximize2,
  Trash2,
  Archive,
  ChevronDown,
  ChevronRight,
  Settings,
  Zap,
  TrendingDown,
  Eye,
  EyeOff,
  Info,
  DollarSign
} from 'lucide-react';

// Types for context window management
type MessagePriority = 'critical' | 'important' | 'normal' | 'low';
type CompressionLevel = 'none' | 'light' | 'medium' | 'aggressive';
type ManagementMode = 'manual' | 'assisted' | 'automatic';
type ContextPhase = 'monitoring' | 'warning' | 'optimizing' | 'compressed' | 'recovered';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  tokens: number;
  timestamp: number;
  priority: MessagePriority;
  pinned: boolean;
  compressed: boolean;
  originalTokens?: number;
  summary?: string;
}

interface ContextWindow {
  maxTokens: number;
  currentTokens: number;
  inputTokens: number;
  outputTokens: number;
  reservedTokens: number;
  compressionSavings: number;
}

interface CompressionStrategy {
  id: string;
  name: string;
  description: string;
  savingsEstimate: number;
  risk: 'low' | 'medium' | 'high';
  applied: boolean;
}

export default function ContextWindowManagementPatternsDemo() {
  const [phase, setPhase] = useState<ContextPhase>('monitoring');
  const [managementMode, setManagementMode] = useState<ManagementMode>('assisted');
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('light');
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);

  const [contextWindow, setContextWindow] = useState<ContextWindow>({
    maxTokens: 8192,
    currentTokens: 2847,
    inputTokens: 2134,
    outputTokens: 713,
    reservedTokens: 512,
    compressionSavings: 0
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      role: 'system',
      content: 'You are a helpful AI assistant for code review and technical documentation.',
      tokens: 15,
      timestamp: Date.now() - 3600000,
      priority: 'critical',
      pinned: true,
      compressed: false
    },
    {
      id: 'msg-2',
      role: 'user',
      content: 'I need help reviewing this React component for performance issues. The component renders a large list of items...',
      tokens: 145,
      timestamp: Date.now() - 3000000,
      priority: 'normal',
      pinned: false,
      compressed: false
    },
    {
      id: 'msg-3',
      role: 'assistant',
      content: 'I\'ll analyze your React component for performance issues. Let me examine the code for common performance bottlenecks like unnecessary re-renders, missing memoization, and inefficient list rendering...',
      tokens: 287,
      timestamp: Date.now() - 2400000,
      priority: 'normal',
      pinned: false,
      compressed: false
    },
    {
      id: 'msg-4',
      role: 'user',
      content: 'Here\'s the full component code with all the imports, state management, and rendering logic. It includes custom hooks and context providers...',
      tokens: 1847,
      timestamp: Date.now() - 1800000,
      priority: 'important',
      pinned: false,
      compressed: false
    },
    {
      id: 'msg-5',
      role: 'assistant',
      content: 'Based on my analysis, I\'ve identified several performance issues: 1) Missing React.memo() on child components causing unnecessary re-renders, 2) Using index as key in list items, 3) Inline function definitions in render...',
      tokens: 453,
      timestamp: Date.now() - 1200000,
      priority: 'important',
      pinned: true,
      compressed: false
    },
    {
      id: 'msg-6',
      role: 'user',
      content: 'Can you show me the optimized version with all the performance improvements applied?',
      tokens: 20,
      timestamp: Date.now() - 600000,
      priority: 'normal',
      pinned: false,
      compressed: false
    }
  ]);

  const [compressionStrategies] = useState<CompressionStrategy[]>([
    {
      id: 'summarize-old',
      name: 'Summarize Old Messages',
      description: 'Compress messages older than 30 minutes',
      savingsEstimate: 847,
      risk: 'low',
      applied: false
    },
    {
      id: 'remove-code',
      name: 'Extract Code Blocks',
      description: 'Move large code blocks to references',
      savingsEstimate: 1234,
      risk: 'medium',
      applied: false
    },
    {
      id: 'compress-responses',
      name: 'Compress Assistant Responses',
      description: 'Summarize verbose explanations',
      savingsEstimate: 456,
      risk: 'medium',
      applied: false
    },
    {
      id: 'clear-context',
      name: 'Clear Non-Essential Context',
      description: 'Remove low-priority unpinned messages',
      savingsEstimate: 234,
      risk: 'high',
      applied: false
    }
  ]);

  const [metrics] = useState({
    efficiency: 72,
    compressionRatio: 23,
    userSatisfaction: 89,
    conversationLength: 156,
    errorsPrevented: 12,
    costSaved: 34.7
  });

  // Simulate context window filling up
  useEffect(() => {
    if (phase === 'monitoring') {
      const timer = setInterval(() => {
        setContextWindow(prev => {
          const newTokens = prev.currentTokens + Math.random() * 200;
          if (newTokens / prev.maxTokens > 0.75) {
            setPhase('warning');
            clearInterval(timer);
          }
          return {
            ...prev,
            currentTokens: Math.min(newTokens, prev.maxTokens),
            inputTokens: prev.inputTokens + Math.random() * 150,
            outputTokens: prev.outputTokens + Math.random() * 50
          };
        });
      }, 1000);
      return () => clearInterval(timer);
    }

    if (phase === 'warning') {
      const timer = setTimeout(() => {
        setPhase('optimizing');
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (phase === 'optimizing') {
      const timer = setTimeout(() => {
        // Apply compression
        setMessages(prev => prev.map(msg => {
          if (!msg.pinned && msg.priority !== 'critical' && msg.content.length > 100) {
            return {
              ...msg,
              compressed: true,
              originalTokens: msg.tokens,
              tokens: Math.floor(msg.tokens * 0.3),
              summary: msg.content.substring(0, 50) + '...'
            };
          }
          return msg;
        }));

        setContextWindow(prev => ({
          ...prev,
          currentTokens: Math.floor(prev.currentTokens * 0.6),
          compressionSavings: Math.floor(prev.currentTokens * 0.4)
        }));

        setPhase('compressed');
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (phase === 'compressed') {
      const timer = setTimeout(() => {
        setPhase('recovered');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const togglePin = (messageId: string) => {
    setMessages(prev => prev.map(msg =>
      msg.id === messageId ? { ...msg, pinned: !msg.pinned } : msg
    ));
  };

  const compressMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && !msg.compressed) {
        const compressed = {
          ...msg,
          compressed: true,
          originalTokens: msg.tokens,
          tokens: Math.floor(msg.tokens * 0.3),
          summary: msg.content.substring(0, 50) + '...'
        };

        setContextWindow(prev => ({
          ...prev,
          currentTokens: prev.currentTokens - (msg.tokens - compressed.tokens),
          compressionSavings: prev.compressionSavings + (msg.tokens - compressed.tokens)
        }));

        return compressed;
      }
      return msg;
    }));
  };

  const expandMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && msg.compressed && msg.originalTokens) {
        setContextWindow(prev => ({
          ...prev,
          currentTokens: prev.currentTokens + (msg.originalTokens - msg.tokens),
          compressionSavings: Math.max(0, prev.compressionSavings - (msg.originalTokens - msg.tokens))
        }));

        return {
          ...msg,
          compressed: false,
          tokens: msg.originalTokens
        };
      }
      return msg;
    }));
  };

  const getUsagePercentage = () => (contextWindow.currentTokens / contextWindow.maxTokens) * 100;
  const getUsageColor = () => {
    const percentage = getUsagePercentage();
    if (percentage > 90) return 'text-red-400 bg-red-500/20 border-red-500/30';
    if (percentage > 75) return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
    if (percentage > 50) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    return 'text-green-400 bg-green-500/20 border-green-500/30';
  };

  const getPriorityColor = (priority: MessagePriority) => {
    switch (priority) {
      case 'critical': return 'text-red-400';
      case 'important': return 'text-orange-400';
      case 'normal': return 'text-blue-400';
      case 'low': return 'text-gray-400';
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg text-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Gauge className="w-6 h-6 text-blue-400" />
          Context Window Management UI Demo
        </h3>
        <p className="text-gray-400">
          Visual patterns for managing LLM context limits and token optimization
        </p>
      </div>

      {/* Token Usage Meter */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">Context Window Usage</h4>
          <span className="text-sm text-gray-400">
            {contextWindow.currentTokens.toLocaleString()} / {contextWindow.maxTokens.toLocaleString()} tokens
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-6 mb-3 overflow-hidden">
          <div className="h-full flex">
            <div
              className="bg-blue-500 transition-all duration-500"
              style={{ width: `${(contextWindow.inputTokens / contextWindow.maxTokens) * 100}%` }}
            />
            <div
              className="bg-purple-500 transition-all duration-500"
              style={{ width: `${(contextWindow.outputTokens / contextWindow.maxTokens) * 100}%` }}
            />
            <div
              className="bg-gray-600 transition-all duration-500"
              style={{ width: `${(contextWindow.reservedTokens / contextWindow.maxTokens) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              Input: {contextWindow.inputTokens.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              Output: {contextWindow.outputTokens.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-600 rounded-full" />
              Reserved: {contextWindow.reservedTokens.toLocaleString()}
            </span>
          </div>
          {contextWindow.compressionSavings > 0 && (
            <span className="text-green-400">
              Saved: {contextWindow.compressionSavings.toLocaleString()} tokens
            </span>
          )}
        </div>
      </div>

      {/* Warning Banner */}
      {phase === 'warning' && (
        <div className="mb-6 p-3 bg-orange-500/10 rounded-lg border border-orange-500/30 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5" />
          <div>
            <p className="font-medium text-orange-400">Context Window Warning</p>
            <p className="text-sm text-gray-300 mt-1">
              You're using {Math.round(getUsagePercentage())}% of available context. Consider compressing or removing old messages.
            </p>
          </div>
        </div>
      )}

      {/* Management Controls */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Management:</span>
          <div className="flex gap-2">
            {(['manual', 'assisted', 'automatic'] as ManagementMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setManagementMode(mode)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  managementMode === mode
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-gray-400" />
          <select
            value={compressionLevel}
            onChange={(e) => setCompressionLevel(e.target.value as CompressionLevel)}
            className="bg-gray-800 text-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="none">No Compression</option>
            <option value="light">Light Compression</option>
            <option value="medium">Medium Compression</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>
      </div>

      {/* Message List with Management */}
      <div className="mb-6 space-y-2 max-h-64 overflow-y-auto">
        {messages.map(msg => (
          <div key={msg.id} className={`p-3 bg-gray-800 rounded border ${
            msg.pinned ? 'border-blue-500/50' : 'border-gray-700'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium ${
                    msg.role === 'user' ? 'text-blue-400' :
                    msg.role === 'assistant' ? 'text-purple-400' :
                    'text-gray-400'
                  }`}>
                    {msg.role.toUpperCase()}
                  </span>
                  <span className={`text-xs ${getPriorityColor(msg.priority)}`}>
                    {msg.priority}
                  </span>
                  {msg.pinned && <Pin className="w-3 h-3 text-blue-400" />}
                  {msg.compressed && <Minimize2 className="w-3 h-3 text-yellow-400" />}
                  <span className="text-xs text-gray-500">{msg.tokens} tokens</span>
                </div>
                <p className="text-sm text-gray-300">
                  {msg.compressed && msg.summary ? msg.summary :
                   msg.content.length > 100 && !expandedMessage ?
                   msg.content.substring(0, 100) + '...' : msg.content}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => togglePin(msg.id)}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                  title={msg.pinned ? 'Unpin' : 'Pin'}
                >
                  <Pin className={`w-4 h-4 ${msg.pinned ? 'text-blue-400' : 'text-gray-500'}`} />
                </button>
                {!msg.compressed ? (
                  <button
                    onClick={() => compressMessage(msg.id)}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                    title="Compress"
                  >
                    <Minimize2 className="w-4 h-4 text-gray-500" />
                  </button>
                ) : (
                  <button
                    onClick={() => expandMessage(msg.id)}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                    title="Expand"
                  >
                    <Maximize2 className="w-4 h-4 text-yellow-400" />
                  </button>
                )}
                <button
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compression Strategies */}
      {managementMode !== 'manual' && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            Optimization Suggestions
          </h4>
          <div className="space-y-2">
            {compressionStrategies.map(strategy => (
              <div key={strategy.id} className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-300">
                      {strategy.name}
                    </span>
                    <span className={`text-xs px-1 py-0.5 rounded ${
                      strategy.risk === 'low' ? 'bg-green-500/20 text-green-400' :
                      strategy.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {strategy.risk} risk
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{strategy.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-400">
                    Save ~{strategy.savingsEstimate} tokens
                  </span>
                  {managementMode === 'automatic' ? (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      strategy.applied ? 'bg-green-500/20' : 'bg-gray-700'
                    }`}>
                      {strategy.applied && '✓'}
                    </div>
                  ) : (
                    <button className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs hover:bg-blue-500/30">
                      Apply
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Efficiency</span>
            <TrendingDown className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-xl font-bold text-green-400">{metrics.efficiency}%</div>
          <div className="text-xs text-gray-500">Useful tokens</div>
        </div>

        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Compression</span>
            <Archive className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-blue-400">{metrics.compressionRatio}%</div>
          <div className="text-xs text-gray-500">Space saved</div>
        </div>

        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Cost Saved</span>
            <DollarSign className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-purple-400">${metrics.costSaved}</div>
          <div className="text-xs text-gray-500">This month</div>
        </div>
      </div>

      {/* Phase Indicator */}
      <div className="mt-6 flex items-center justify-center">
        <div className="flex items-center gap-2">
          {['monitoring', 'warning', 'optimizing', 'compressed', 'recovered'].map((p, i) => (
            <div key={p} className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${
                phase === p ? 'bg-blue-400' :
                i < ['monitoring', 'warning', 'optimizing', 'compressed', 'recovered'].indexOf(phase)
                  ? 'bg-blue-400/40'
                  : 'bg-gray-700'
              }`} />
              {i < 4 && (
                <div className={`w-6 h-0.5 ${
                  i < ['monitoring', 'warning', 'optimizing', 'compressed', 'recovered'].indexOf(phase)
                    ? 'bg-blue-400/40'
                    : 'bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}