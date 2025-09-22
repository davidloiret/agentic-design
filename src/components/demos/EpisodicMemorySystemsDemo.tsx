'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, User, Brain, Calendar, Search, TrendingUp, Filter } from 'lucide-react';

interface Episode {
  id: string;
  timestamp: Date;
  agent: string;
  context: string;
  action: string;
  outcome: 'success' | 'failure' | 'partial';
  confidence: number;
  emotionalValence: number;
  participants: string[];
  tags: string[];
  importance: number;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  episodeCount: number;
  successRate: number;
  activeQuery?: string;
}

interface MemoryCluster {
  type: string;
  episodes: Episode[];
  pattern?: string;
  frequency: number;
}

export default function EpisodicMemorySystemsDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeRange, setSelectedTimeRange] = useState<'all' | '1h' | '24h' | '7d'>('24h');
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [agents, setAgents] = useState<Agent[]>([
    { id: 'customer-service', name: 'Customer Service', role: 'Support', episodeCount: 0, successRate: 92 },
    { id: 'sales-assistant', name: 'Sales Assistant', role: 'Sales', episodeCount: 0, successRate: 88 },
    { id: 'technical-support', name: 'Technical Support', role: 'Engineering', episodeCount: 0, successRate: 95 },
    { id: 'knowledge-expert', name: 'Knowledge Expert', role: 'Research', episodeCount: 0, successRate: 90 },
    { id: 'workflow-manager', name: 'Workflow Manager', role: 'Orchestration', episodeCount: 0, successRate: 93 }
  ]);
  const [memoryClusters, setMemoryClusters] = useState<MemoryCluster[]>([
    { type: 'Customer Complaints', episodes: [], frequency: 0 },
    { type: 'Product Inquiries', episodes: [], frequency: 0 },
    { type: 'Technical Issues', episodes: [], frequency: 0 },
    { type: 'Successful Resolutions', episodes: [], frequency: 0 },
    { type: 'Cross-Agent Collaborations', episodes: [], frequency: 0 }
  ]);
  const [retrievalAccuracy, setRetrievalAccuracy] = useState(95);
  const [patternRecognition, setPatternRecognition] = useState(0);
  const [memoryUtilization, setMemoryUtilization] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const scenarios = [
    {
      agent: 'customer-service',
      context: 'Customer complaint about delayed shipping',
      action: 'Escalated to logistics team, provided tracking update',
      outcome: 'success' as const,
      confidence: 0.92,
      emotionalValence: -0.3,
      participants: ['customer-service', 'workflow-manager'],
      tags: ['shipping', 'complaint', 'escalation'],
      importance: 0.8
    },
    {
      agent: 'sales-assistant',
      context: 'Product recommendation for enterprise client',
      action: 'Retrieved similar past cases, suggested premium package',
      outcome: 'success' as const,
      confidence: 0.88,
      emotionalValence: 0.7,
      participants: ['sales-assistant', 'knowledge-expert'],
      tags: ['enterprise', 'recommendation', 'upsell'],
      importance: 0.9
    },
    {
      agent: 'technical-support',
      context: 'API integration error reported',
      action: 'Identified pattern from previous episodes, applied fix',
      outcome: 'success' as const,
      confidence: 0.95,
      emotionalValence: 0.2,
      participants: ['technical-support'],
      tags: ['api', 'integration', 'bug-fix'],
      importance: 0.85
    },
    {
      agent: 'knowledge-expert',
      context: 'Research request for competitor analysis',
      action: 'Compiled insights from multiple episodes',
      outcome: 'partial' as const,
      confidence: 0.78,
      emotionalValence: 0.0,
      participants: ['knowledge-expert', 'sales-assistant'],
      tags: ['research', 'competitor', 'analysis'],
      importance: 0.7
    },
    {
      agent: 'workflow-manager',
      context: 'Multi-agent task coordination',
      action: 'Orchestrated sequential workflow based on past patterns',
      outcome: 'success' as const,
      confidence: 0.91,
      emotionalValence: 0.5,
      participants: ['workflow-manager', 'customer-service', 'technical-support'],
      tags: ['coordination', 'workflow', 'multi-agent'],
      importance: 0.95
    }
  ];

  const createEpisode = (scenario: typeof scenarios[0]): Episode => {
    const timestamp = new Date(currentTime.getTime() - Math.random() * 3600000); // Random time within last hour
    return {
      id: `episode-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp,
      agent: scenario.agent,
      context: scenario.context,
      action: scenario.action,
      outcome: scenario.outcome,
      confidence: scenario.confidence + (Math.random() - 0.5) * 0.1,
      emotionalValence: scenario.emotionalValence + (Math.random() - 0.5) * 0.2,
      participants: scenario.participants,
      tags: scenario.tags,
      importance: scenario.importance + (Math.random() - 0.5) * 0.1
    };
  };

  const processEpisode = () => {
    if (!isRunning) return;

    // Create new episode
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    const newEpisode = createEpisode(scenario);

    setEpisodes(prev => {
      const updated = [newEpisode, ...prev].slice(0, 100); // Keep last 100 episodes

      // Update memory clusters
      updateMemoryClusters(updated);

      return updated;
    });

    // Update agent stats
    setAgents(prev => prev.map(agent => {
      if (newEpisode.participants.includes(agent.id)) {
        const agentEpisodes = episodes.filter(e => e.participants.includes(agent.id));
        const successCount = agentEpisodes.filter(e => e.outcome === 'success').length;
        return {
          ...agent,
          episodeCount: agent.episodeCount + 1,
          successRate: Math.round((successCount / (agentEpisodes.length + 1)) * 100),
          activeQuery: Math.random() > 0.7 ? `Retrieving similar ${newEpisode.tags[0]} episodes...` : undefined
        };
      }
      return { ...agent, activeQuery: undefined };
    }));

    // Update metrics
    setMemoryUtilization(prev => Math.min(100, prev + 1));
    setPatternRecognition(prev => {
      if (episodes.length > 10) {
        // Check for patterns
        const recentContexts = episodes.slice(0, 10).map(e => e.context);
        const hasPattern = recentContexts.some(c =>
          recentContexts.filter(rc => rc.includes(c.split(' ')[0])).length > 2
        );
        return hasPattern ? Math.min(100, prev + 5) : prev;
      }
      return prev;
    });

    // Simulate retrieval operations
    if (Math.random() > 0.6) {
      setRetrievalAccuracy(95 + Math.random() * 5);
    }

    // Update current time
    setCurrentTime(new Date());
  };

  const updateMemoryClusters = (allEpisodes: Episode[]) => {
    setMemoryClusters(prev => prev.map(cluster => {
      let clusterEpisodes: Episode[] = [];

      switch(cluster.type) {
        case 'Customer Complaints':
          clusterEpisodes = allEpisodes.filter(e =>
            e.tags.includes('complaint') || e.emotionalValence < -0.2
          );
          break;
        case 'Product Inquiries':
          clusterEpisodes = allEpisodes.filter(e =>
            e.tags.includes('product') || e.tags.includes('recommendation')
          );
          break;
        case 'Technical Issues':
          clusterEpisodes = allEpisodes.filter(e =>
            e.tags.includes('technical') || e.tags.includes('bug-fix') || e.tags.includes('api')
          );
          break;
        case 'Successful Resolutions':
          clusterEpisodes = allEpisodes.filter(e => e.outcome === 'success');
          break;
        case 'Cross-Agent Collaborations':
          clusterEpisodes = allEpisodes.filter(e => e.participants.length > 1);
          break;
      }

      return {
        ...cluster,
        episodes: clusterEpisodes,
        frequency: clusterEpisodes.length,
        pattern: clusterEpisodes.length > 3 ? 'Recurring pattern detected' : undefined
      };
    }));
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        processEpisode();
      }, 2000 / speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, speed, episodes]);

  const handleReset = () => {
    setIsRunning(false);
    setEpisodes([]);
    setCurrentTime(new Date());
    setAgents(agents.map(a => ({ ...a, episodeCount: 0, activeQuery: undefined })));
    setMemoryUtilization(0);
    setPatternRecognition(0);
    setRetrievalAccuracy(95);
    setMemoryClusters(memoryClusters.map(c => ({ ...c, episodes: [], frequency: 0, pattern: undefined })));
  };

  const getFilteredEpisodes = () => {
    let filtered = episodes;

    // Filter by time range
    if (selectedTimeRange !== 'all') {
      const now = new Date();
      const timeLimit = new Date();
      switch(selectedTimeRange) {
        case '1h':
          timeLimit.setHours(now.getHours() - 1);
          break;
        case '24h':
          timeLimit.setDate(now.getDate() - 1);
          break;
        case '7d':
          timeLimit.setDate(now.getDate() - 7);
          break;
      }
      filtered = filtered.filter(e => e.timestamp > timeLimit);
    }

    // Filter by agent
    if (selectedAgent !== 'all') {
      filtered = filtered.filter(e => e.participants.includes(selectedAgent));
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(e =>
        e.context.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getOutcomeColor = (outcome: string) => {
    switch(outcome) {
      case 'success': return 'text-green-400';
      case 'failure': return 'text-red-400';
      case 'partial': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getEmotionalValenceEmoji = (valence: number) => {
    if (valence > 0.5) return '😊';
    if (valence > 0) return '🙂';
    if (valence > -0.5) return '😐';
    return '😞';
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Controls */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Episodic Memory System
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  isRunning
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Speed:</span>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-24"
              />
              <span className="text-sm text-gray-300 w-8">{speed}x</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value as any)}
              className="bg-gray-700 text-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="all">All Time</option>
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="bg-gray-700 text-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="all">All Agents</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>{agent.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search episodes..."
              className="bg-gray-700 text-gray-300 rounded px-3 py-1 text-sm flex-1"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Episode Timeline */}
        <div className="col-span-2 space-y-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              Episode Timeline ({getFilteredEpisodes().length} episodes)
            </h4>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {getFilteredEpisodes().slice(0, 20).map((episode) => (
                <div
                  key={episode.id}
                  className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{formatTimestamp(episode.timestamp)}</span>
                      <span className={`text-xs font-medium ${getOutcomeColor(episode.outcome)}`}>
                        {episode.outcome}
                      </span>
                      <span className="text-xs">{getEmotionalValenceEmoji(episode.emotionalValence)}</span>
                    </div>
                    <span className="text-xs text-purple-400">
                      {Math.round(episode.confidence * 100)}% confidence
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-1">{episode.context}</p>
                  <p className="text-xs text-gray-400 mb-2">{episode.action}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {episode.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-gray-700/50 text-gray-400 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex -space-x-2">
                      {episode.participants.map((p, idx) => {
                        const agent = agents.find(a => a.id === p);
                        return (
                          <div
                            key={idx}
                            className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold border-2 border-gray-800"
                            title={agent?.name}
                          >
                            {agent?.name.charAt(0)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {episodes.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No episodes recorded yet. Click Start to begin.
                </div>
              )}
            </div>
          </div>

          {/* Memory Clusters */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              Memory Clusters & Patterns
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {memoryClusters.map((cluster, idx) => (
                <div
                  key={idx}
                  className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">{cluster.type}</span>
                    <span className="text-xs text-gray-500">{cluster.frequency} episodes</span>
                  </div>
                  {cluster.pattern && (
                    <p className="text-xs text-green-400 mb-2">{cluster.pattern}</p>
                  )}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, cluster.frequency * 10)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Agent Activity */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Multi-Agent Activity</h4>
            <div className="space-y-3">
              {agents.map((agent) => (
                <div key={agent.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{agent.name}</span>
                    <span className="text-xs text-gray-500">{agent.episodeCount} episodes</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500">Success Rate:</span>
                    <span className={agent.successRate > 90 ? 'text-green-400' : 'text-yellow-400'}>
                      {agent.successRate}%
                    </span>
                  </div>
                  {agent.activeQuery && (
                    <p className="text-xs text-blue-400 animate-pulse">{agent.activeQuery}</p>
                  )}
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${agent.successRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Metrics */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">System Metrics</h4>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Retrieval Accuracy</span>
                  <span className="text-xs text-green-400">{retrievalAccuracy.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${retrievalAccuracy}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Pattern Recognition</span>
                  <span className="text-xs text-purple-400">{patternRecognition.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${patternRecognition}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Memory Utilization</span>
                  <span className="text-xs text-blue-400">{memoryUtilization.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${memoryUtilization}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Current Time */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">System Time</h4>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">
                {currentTime.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}