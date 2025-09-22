'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Database, Clock, TrendingUp, Search, Edit3, Trash2, Archive, Zap, Brain, Filter, BarChart, Lock, Unlock, Activity, AlertCircle, CheckCircle } from 'lucide-react';

interface MemoryEntry {
  id: string;
  content: string;
  type: 'fact' | 'event' | 'concept' | 'procedure' | 'episode';
  timestamp: number;
  accessCount: number;
  lastAccessed: number;
  importance: number;
  relevance: number;
  recency: number;
  decay: number;
  locked: boolean;
  tags: string[];
  source: string;
  embeddings?: number[];
}

interface Agent {
  id: string;
  name: string;
  color: string;
  icon: string;
  specialization: string;
  memoryAccess: {
    reads: number;
    writes: number;
    deletes: number;
    currentOperation?: 'read' | 'write' | 'delete' | 'search';
  };
}

interface MemoryOperation {
  id: string;
  type: 'read' | 'write' | 'update' | 'delete' | 'search' | 'consolidate';
  agentId: string;
  memoryId?: string;
  query?: string;
  content?: string;
  timestamp: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: any;
}

interface MemoryMetrics {
  totalEntries: number;
  activeMemories: number;
  archivedMemories: number;
  avgAccessTime: number;
  hitRate: number;
  memoryUtilization: number;
  fragmentationLevel: number;
}

const INITIAL_MEMORIES: MemoryEntry[] = [
  {
    id: 'mem-1',
    content: 'Customer prefers email communication over phone calls',
    type: 'fact',
    timestamp: Date.now() - 86400000,
    accessCount: 5,
    lastAccessed: Date.now() - 3600000,
    importance: 0.8,
    relevance: 0.9,
    recency: 0.7,
    decay: 0.05,
    locked: false,
    tags: ['customer', 'preferences', 'communication'],
    source: 'agent-sales'
  },
  {
    id: 'mem-2',
    content: 'Product launch scheduled for Q2 2024',
    type: 'event',
    timestamp: Date.now() - 172800000,
    accessCount: 12,
    lastAccessed: Date.now() - 7200000,
    importance: 0.95,
    relevance: 0.85,
    recency: 0.6,
    decay: 0.02,
    locked: true,
    tags: ['product', 'launch', 'timeline'],
    source: 'agent-planning'
  },
  {
    id: 'mem-3',
    content: 'Machine learning model accuracy improved by 15% after latest training',
    type: 'fact',
    timestamp: Date.now() - 43200000,
    accessCount: 8,
    lastAccessed: Date.now() - 1800000,
    importance: 0.75,
    relevance: 0.8,
    recency: 0.85,
    decay: 0.03,
    locked: false,
    tags: ['ml', 'performance', 'improvement'],
    source: 'agent-ml'
  },
  {
    id: 'mem-4',
    content: 'Standard operating procedure for incident response',
    type: 'procedure',
    timestamp: Date.now() - 604800000,
    accessCount: 25,
    lastAccessed: Date.now() - 86400000,
    importance: 0.9,
    relevance: 0.7,
    recency: 0.3,
    decay: 0.01,
    locked: true,
    tags: ['procedure', 'incident', 'response'],
    source: 'agent-security'
  },
  {
    id: 'mem-5',
    content: 'Customer success meeting outcomes and action items',
    type: 'episode',
    timestamp: Date.now() - 21600000,
    accessCount: 3,
    lastAccessed: Date.now() - 10800000,
    importance: 0.7,
    relevance: 0.75,
    recency: 0.9,
    decay: 0.04,
    locked: false,
    tags: ['meeting', 'customer', 'actions'],
    source: 'agent-support'
  }
];

const AGENTS: Agent[] = [
  {
    id: 'agent-orchestrator',
    name: 'Memory Orchestrator',
    color: 'text-purple-400',
    icon: '🎯',
    specialization: 'Coordinates memory operations across agents',
    memoryAccess: { reads: 0, writes: 0, deletes: 0 }
  },
  {
    id: 'agent-writer',
    name: 'Memory Writer',
    color: 'text-green-400',
    icon: '✍️',
    specialization: 'Creates and updates memory entries',
    memoryAccess: { reads: 0, writes: 0, deletes: 0 }
  },
  {
    id: 'agent-reader',
    name: 'Memory Reader',
    color: 'text-blue-400',
    icon: '📖',
    specialization: 'Retrieves and searches memories',
    memoryAccess: { reads: 0, writes: 0, deletes: 0 }
  },
  {
    id: 'agent-analyst',
    name: 'Memory Analyst',
    color: 'text-yellow-400',
    icon: '📊',
    specialization: 'Analyzes memory patterns and importance',
    memoryAccess: { reads: 0, writes: 0, deletes: 0 }
  },
  {
    id: 'agent-cleaner',
    name: 'Memory Cleaner',
    color: 'text-red-400',
    icon: '🧹',
    specialization: 'Archives and removes outdated memories',
    memoryAccess: { reads: 0, writes: 0, deletes: 0 }
  }
];

export default function MemoryReadWriteOperationsDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [memories, setMemories] = useState<MemoryEntry[]>(INITIAL_MEMORIES);
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [operations, setOperations] = useState<MemoryOperation[]>([]);
  const [metrics, setMetrics] = useState<MemoryMetrics>({
    totalEntries: INITIAL_MEMORIES.length,
    activeMemories: INITIAL_MEMORIES.length,
    archivedMemories: 0,
    avgAccessTime: 45,
    hitRate: 0.92,
    memoryUtilization: 0.68,
    fragmentationLevel: 0.12
  });
  const [selectedMemory, setSelectedMemory] = useState<MemoryEntry | null>(null);
  const [sortBy, setSortBy] = useState<'recency' | 'relevance' | 'importance'>('recency');
  const [filterType, setFilterType] = useState<string>('all');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  const calculateMemoryScore = useCallback((memory: MemoryEntry): number => {
    const weights = {
      recency: 0.3,
      relevance: 0.4,
      importance: 0.3
    };

    return (
      memory.recency * weights.recency +
      memory.relevance * weights.relevance +
      memory.importance * weights.importance
    );
  }, []);

  const updateMemoryDecay = useCallback(() => {
    setMemories(prev => prev.map(memory => {
      const timeSinceAccess = Date.now() - memory.lastAccessed;
      const decayFactor = Math.exp(-memory.decay * (timeSinceAccess / 3600000));

      return {
        ...memory,
        recency: Math.max(0.1, memory.recency * decayFactor),
        relevance: Math.max(0.1, memory.relevance * 0.995)
      };
    }));
  }, []);

  const performMemoryOperation = useCallback(async (
    agent: Agent,
    type: MemoryOperation['type'],
    memoryId?: string,
    content?: string
  ) => {
    const operation: MemoryOperation = {
      id: `op-${Date.now()}-${Math.random()}`,
      type,
      agentId: agent.id,
      memoryId,
      content,
      timestamp: Date.now(),
      status: 'pending'
    };

    setOperations(prev => [...prev, operation]);

    // Update agent status
    setAgents(prev => prev.map(a =>
      a.id === agent.id
        ? { ...a, memoryAccess: { ...a.memoryAccess, currentOperation: type as any } }
        : a
    ));

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 500 / speed));

    setOperations(prev => prev.map(op =>
      op.id === operation.id ? { ...op, status: 'processing' } : op
    ));

    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Execute operation
    switch (type) {
      case 'read':
        if (memoryId) {
          setMemories(prev => prev.map(m =>
            m.id === memoryId
              ? {
                  ...m,
                  accessCount: m.accessCount + 1,
                  lastAccessed: Date.now(),
                  recency: Math.min(1, m.recency + 0.1)
                }
              : m
          ));

          setAgents(prev => prev.map(a =>
            a.id === agent.id
              ? { ...a, memoryAccess: { ...a.memoryAccess, reads: a.memoryAccess.reads + 1 } }
              : a
          ));
        }
        break;

      case 'write':
        if (content) {
          const newMemory: MemoryEntry = {
            id: `mem-${Date.now()}`,
            content,
            type: 'fact',
            timestamp: Date.now(),
            accessCount: 0,
            lastAccessed: Date.now(),
            importance: Math.random() * 0.4 + 0.6,
            relevance: Math.random() * 0.3 + 0.7,
            recency: 1,
            decay: 0.03,
            locked: false,
            tags: content.toLowerCase().split(' ').slice(0, 3),
            source: agent.id
          };

          setMemories(prev => [...prev, newMemory]);

          setAgents(prev => prev.map(a =>
            a.id === agent.id
              ? { ...a, memoryAccess: { ...a.memoryAccess, writes: a.memoryAccess.writes + 1 } }
              : a
          ));

          setMetrics(prev => ({
            ...prev,
            totalEntries: prev.totalEntries + 1,
            activeMemories: prev.activeMemories + 1
          }));
        }
        break;

      case 'delete':
        if (memoryId) {
          setMemories(prev => prev.filter(m => m.id !== memoryId));

          setAgents(prev => prev.map(a =>
            a.id === agent.id
              ? { ...a, memoryAccess: { ...a.memoryAccess, deletes: a.memoryAccess.deletes + 1 } }
              : a
          ));

          setMetrics(prev => ({
            ...prev,
            totalEntries: prev.totalEntries - 1,
            activeMemories: prev.activeMemories - 1,
            archivedMemories: prev.archivedMemories + 1
          }));
        }
        break;

      case 'search':
        // Simulate semantic search
        const searchResults = memories
          .map(m => ({ ...m, score: calculateMemoryScore(m) }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 3);

        operation.result = searchResults;
        break;

      case 'consolidate':
        // Simulate memory consolidation
        setMemories(prev => prev.map(m => ({
          ...m,
          importance: m.accessCount > 10 ? Math.min(1, m.importance + 0.1) : m.importance
        })));
        break;
    }

    setOperations(prev => prev.map(op =>
      op.id === operation.id ? { ...op, status: 'completed' } : op
    ));

    // Clear agent operation status
    setAgents(prev => prev.map(a =>
      a.id === agent.id
        ? { ...a, memoryAccess: { ...a.memoryAccess, currentOperation: undefined } }
        : a
    ));
  }, [speed, memories, calculateMemoryScore]);

  const drawVisualization = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, rect.width, rect.height);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxRadius = Math.min(rect.width, rect.height) * 0.4;

    // Draw memory nodes
    memories.forEach((memory, index) => {
      const angle = (index / memories.length) * Math.PI * 2;
      const score = calculateMemoryScore(memory);
      const radius = maxRadius * (0.5 + score * 0.5);

      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      // Draw connection to center
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = `rgba(147, 51, 234, ${score * 0.3})`;
      ctx.lineWidth = score * 2;
      ctx.stroke();

      // Draw memory node
      const nodeRadius = 5 + memory.accessCount * 0.5;
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);

      // Color based on type
      const colors = {
        fact: '#60a5fa',
        event: '#34d399',
        concept: '#f59e0b',
        procedure: '#a78bfa',
        episode: '#f87171'
      };

      ctx.fillStyle = colors[memory.type] || '#9ca3af';
      ctx.fill();

      if (memory.locked) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw importance indicator
      if (memory.importance > 0.8) {
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius + 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(251, 191, 36, ${memory.importance})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Draw active operations
    operations.filter(op => op.status === 'processing').forEach(op => {
      const agent = agents.find(a => a.id === op.agentId);
      if (!agent) return;

      const agentIndex = agents.indexOf(agent);
      const agentAngle = (agentIndex / agents.length) * Math.PI * 2;
      const agentX = centerX + Math.cos(agentAngle) * (maxRadius * 1.3);
      const agentY = centerY + Math.sin(agentAngle) * (maxRadius * 1.3);

      if (op.memoryId) {
        const memory = memories.find(m => m.id === op.memoryId);
        if (memory) {
          const memIndex = memories.indexOf(memory);
          const memAngle = (memIndex / memories.length) * Math.PI * 2;
          const memX = centerX + Math.cos(memAngle) * (maxRadius * 0.7);
          const memY = centerY + Math.sin(memAngle) * (maxRadius * 0.7);

          // Animate connection
          const progress = (Date.now() % 1000) / 1000;
          const currentX = agentX + (memX - agentX) * progress;
          const currentY = agentY + (memY - agentY) * progress;

          ctx.beginPath();
          ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
          ctx.fillStyle = agent.color.replace('text-', '#').replace('400', 'a5fa');
          ctx.fill();
        }
      }
    });

    // Draw central hub
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
    ctx.fillStyle = '#8b5cf6';
    ctx.fill();
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw metrics
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px monospace';
    ctx.fillText(`Memories: ${memories.length}`, 10, 20);
    ctx.fillText(`Operations: ${operations.filter(op => op.status === 'processing').length}`, 10, 35);
    ctx.fillText(`Hit Rate: ${(metrics.hitRate * 100).toFixed(0)}%`, 10, 50);
  }, [memories, agents, operations, metrics, calculateMemoryScore]);

  useEffect(() => {
    const animate = () => {
      drawVisualization();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [drawVisualization]);

  const simulateMRWO = useCallback(async () => {
    // Phase 1: Memory Reading
    const reader = agents.find(a => a.id === 'agent-reader')!;
    await performMemoryOperation(reader, 'read', memories[0].id);

    // Phase 2: Memory Writing
    const writer = agents.find(a => a.id === 'agent-writer')!;
    await performMemoryOperation(writer, 'write', undefined, 'New insight discovered from data analysis');

    // Phase 3: Memory Search
    const analyst = agents.find(a => a.id === 'agent-analyst')!;
    await performMemoryOperation(analyst, 'search');

    // Phase 4: Memory Consolidation
    const orchestrator = agents.find(a => a.id === 'agent-orchestrator')!;
    await performMemoryOperation(orchestrator, 'consolidate');

    // Phase 5: Memory Cleanup
    const cleaner = agents.find(a => a.id === 'agent-cleaner')!;
    const oldMemory = memories.find(m => m.recency < 0.3);
    if (oldMemory && !oldMemory.locked) {
      await performMemoryOperation(cleaner, 'delete', oldMemory.id);
    }

    // Update decay
    updateMemoryDecay();
  }, [agents, memories, performMemoryOperation, updateMemoryDecay]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        simulateMRWO();
      }, 5000 / speed);

      return () => clearInterval(interval);
    }
  }, [isRunning, speed, simulateMRWO]);

  const sortedMemories = [...memories].sort((a, b) => {
    switch (sortBy) {
      case 'recency':
        return b.recency - a.recency;
      case 'relevance':
        return b.relevance - a.relevance;
      case 'importance':
        return b.importance - a.importance;
      default:
        return 0;
    }
  });

  const filteredMemories = filterType === 'all'
    ? sortedMemories
    : sortedMemories.filter(m => m.type === filterType);

  return (
    <div className="w-full space-y-6">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Memory Read/Write Operations (MRWO) Demo</h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Speed:</label>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="bg-gray-800 text-white px-3 py-1 rounded text-sm border border-gray-700"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={3}>3x</option>
              </select>
            </div>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>

            <button
              onClick={() => {
                setMemories(INITIAL_MEMORIES);
                setAgents(AGENTS);
                setOperations([]);
                setIsRunning(false);
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Memory Visualization */}
          <div className="col-span-7">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Memory Network
                </h4>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-400">Fact</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-400">Event</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-400">Concept</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-400">Procedure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-gray-400">Episode</span>
                  </div>
                </div>
              </div>
              <canvas
                ref={canvasRef}
                className="w-full h-64 bg-gray-900 rounded"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>

            {/* Memory Table */}
            <div className="mt-4 bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-white">Memory Store</h4>
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-gray-700 text-white px-2 py-1 rounded text-xs"
                  >
                    <option value="recency">Sort by Recency</option>
                    <option value="relevance">Sort by Relevance</option>
                    <option value="importance">Sort by Importance</option>
                  </select>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-gray-700 text-white px-2 py-1 rounded text-xs"
                  >
                    <option value="all">All Types</option>
                    <option value="fact">Facts</option>
                    <option value="event">Events</option>
                    <option value="concept">Concepts</option>
                    <option value="procedure">Procedures</option>
                    <option value="episode">Episodes</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredMemories.map(memory => (
                  <div
                    key={memory.id}
                    onClick={() => setSelectedMemory(memory)}
                    className={`p-3 bg-gray-900 rounded cursor-pointer transition-all hover:bg-gray-850 ${
                      selectedMemory?.id === memory.id ? 'ring-2 ring-purple-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            memory.type === 'fact' ? 'bg-blue-900 text-blue-300' :
                            memory.type === 'event' ? 'bg-green-900 text-green-300' :
                            memory.type === 'concept' ? 'bg-yellow-900 text-yellow-300' :
                            memory.type === 'procedure' ? 'bg-purple-900 text-purple-300' :
                            'bg-red-900 text-red-300'
                          }`}>
                            {memory.type}
                          </span>
                          {memory.locked && <Lock className="w-3 h-3 text-yellow-400" />}
                          <span className="text-xs text-gray-500">
                            {memory.tags.map(tag => `#${tag}`).join(' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 line-clamp-2">{memory.content}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>Access: {memory.accessCount}</span>
                          <span>R: {(memory.recency * 100).toFixed(0)}%</span>
                          <span>V: {(memory.relevance * 100).toFixed(0)}%</span>
                          <span>I: {(memory.importance * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Agents and Metrics */}
          <div className="col-span-5 space-y-4">
            {/* Agents */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-3">Memory Agents</h4>
              <div className="space-y-3">
                {agents.map(agent => (
                  <div key={agent.id} className="bg-gray-900 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{agent.icon}</span>
                        <div>
                          <div className={`text-sm font-semibold ${agent.color}`}>
                            {agent.name}
                          </div>
                          <div className="text-xs text-gray-500">{agent.specialization}</div>
                        </div>
                      </div>
                      {agent.memoryAccess.currentOperation && (
                        <span className="text-xs px-2 py-1 bg-yellow-900 text-yellow-300 rounded">
                          {agent.memoryAccess.currentOperation}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <div className="text-gray-500">Reads</div>
                        <div className="text-white font-semibold">{agent.memoryAccess.reads}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-500">Writes</div>
                        <div className="text-white font-semibold">{agent.memoryAccess.writes}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-500">Deletes</div>
                        <div className="text-white font-semibold">{agent.memoryAccess.deletes}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <BarChart className="w-4 h-4" />
                Memory Metrics
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Memory Utilization</span>
                    <span className="text-white">{(metrics.memoryUtilization * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                      style={{ width: `${metrics.memoryUtilization * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Hit Rate</span>
                    <span className="text-white">{(metrics.hitRate * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-600 to-green-400"
                      style={{ width: `${metrics.hitRate * 100}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-gray-900 rounded p-2">
                    <div className="text-gray-500">Total Entries</div>
                    <div className="text-white font-semibold">{metrics.totalEntries}</div>
                  </div>
                  <div className="bg-gray-900 rounded p-2">
                    <div className="text-gray-500">Active</div>
                    <div className="text-white font-semibold">{metrics.activeMemories}</div>
                  </div>
                  <div className="bg-gray-900 rounded p-2">
                    <div className="text-gray-500">Archived</div>
                    <div className="text-white font-semibold">{metrics.archivedMemories}</div>
                  </div>
                  <div className="bg-gray-900 rounded p-2">
                    <div className="text-gray-500">Avg Access Time</div>
                    <div className="text-white font-semibold">{metrics.avgAccessTime}ms</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Operations */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Recent Operations
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {operations.slice(-5).reverse().map(op => {
                  const agent = agents.find(a => a.id === op.agentId);
                  return (
                    <div key={op.id} className="flex items-center gap-2 text-xs">
                      <span className={agent?.color}>{agent?.name}</span>
                      <span className="text-gray-500">→</span>
                      <span className={`px-2 py-0.5 rounded ${
                        op.type === 'read' ? 'bg-blue-900 text-blue-300' :
                        op.type === 'write' ? 'bg-green-900 text-green-300' :
                        op.type === 'delete' ? 'bg-red-900 text-red-300' :
                        op.type === 'search' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-purple-900 text-purple-300'
                      }`}>
                        {op.type}
                      </span>
                      <span className={`ml-auto ${
                        op.status === 'completed' ? 'text-green-400' :
                        op.status === 'processing' ? 'text-yellow-400' :
                        op.status === 'failed' ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {op.status === 'completed' && <CheckCircle className="w-3 h-3" />}
                        {op.status === 'processing' && <Clock className="w-3 h-3" />}
                        {op.status === 'failed' && <AlertCircle className="w-3 h-3" />}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}