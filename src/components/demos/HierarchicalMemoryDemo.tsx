'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, ArrowUp, ArrowDown, Database, Brain, Clock, TrendingUp, Activity, BarChart3, Layers, Search, FileText, Zap, Target } from 'lucide-react';

interface MemoryItem {
  id: string;
  content: string;
  type: 'message' | 'fact' | 'pattern' | 'skill' | 'preference';
  tier: 1 | 2 | 3 | 4;
  importance: number;
  accessCount: number;
  lastAccessed: number;
  created: number;
  retentionScore: number;
  connections: string[];
}

interface MemoryTier {
  id: number;
  name: string;
  description: string;
  capacity: number;
  retentionTime: string;
  items: MemoryItem[];
  color: string;
  icon: React.ComponentType<any>;
}

interface SystemMetrics {
  totalItems: number;
  promotions: number;
  demotions: number;
  retrievalLatency: number;
  memoryEfficiency: number;
  compressionRatio: number;
}

const initialMemoryItems: MemoryItem[] = [
  {
    id: 'working-1',
    content: 'User asked about weather forecast for tomorrow',
    type: 'message',
    tier: 1,
    importance: 0.7,
    accessCount: 1,
    lastAccessed: Date.now() - 30000,
    created: Date.now() - 30000,
    retentionScore: 0.8,
    connections: []
  },
  {
    id: 'working-2', 
    content: 'Current conversation context: planning weekend activities',
    type: 'pattern',
    tier: 1,
    importance: 0.6,
    accessCount: 3,
    lastAccessed: Date.now() - 60000,
    created: Date.now() - 120000,
    retentionScore: 0.7,
    connections: ['short-1']
  },
  {
    id: 'short-1',
    content: 'User prefers outdoor activities when weather is good',
    type: 'preference',
    tier: 2,
    importance: 0.8,
    accessCount: 5,
    lastAccessed: Date.now() - 3600000,
    created: Date.now() - 86400000,
    retentionScore: 0.85,
    connections: ['medium-1']
  },
  {
    id: 'short-2',
    content: 'Weather API integration patterns and best practices',
    type: 'skill',
    tier: 2,
    importance: 0.75,
    accessCount: 8,
    lastAccessed: Date.now() - 7200000,
    created: Date.now() - 172800000,
    retentionScore: 0.9,
    connections: ['long-1']
  },
  {
    id: 'medium-1',
    content: 'User activity patterns: prefers weekend outdoor plans, checks weather frequently',
    type: 'pattern',
    tier: 3,
    importance: 0.9,
    accessCount: 15,
    lastAccessed: Date.now() - 86400000,
    created: Date.now() - 2592000000,
    retentionScore: 0.95,
    connections: ['long-2']
  },
  {
    id: 'long-1',
    content: 'Weather data structures and API response formats',
    type: 'fact',
    tier: 4,
    importance: 0.95,
    accessCount: 25,
    lastAccessed: Date.now() - 432000000,
    created: Date.now() - 7776000000,
    retentionScore: 1.0,
    connections: []
  },
  {
    id: 'long-2',
    content: 'Core user behavioral model: planning-oriented, weather-conscious',
    type: 'pattern',
    tier: 4,
    importance: 0.98,
    accessCount: 30,
    lastAccessed: Date.now() - 864000000,
    created: Date.now() - 15552000000,
    retentionScore: 1.0,
    connections: ['medium-1']
  }
];

const memoryTiers: MemoryTier[] = [
  {
    id: 1,
    name: 'Working Memory',
    description: 'Active context and recent interactions',
    capacity: 10,
    retentionTime: '5 minutes',
    items: [],
    color: 'from-blue-500 to-blue-600',
    icon: Brain
  },
  {
    id: 2,
    name: 'Short-term Memory',
    description: 'Important recent information',
    capacity: 50,
    retentionTime: '1 week',
    items: [],
    color: 'from-green-500 to-green-600',
    icon: Clock
  },
  {
    id: 3,
    name: 'Medium-term Memory',
    description: 'Consolidated patterns and insights',
    capacity: 200,
    retentionTime: '1 month',
    items: [],
    color: 'from-yellow-500 to-orange-500',
    icon: TrendingUp
  },
  {
    id: 4,
    name: 'Long-term Memory',
    description: 'Core knowledge and learned patterns',
    capacity: 10000,
    retentionTime: 'Permanent',
    items: [],
    color: 'from-purple-500 to-purple-600',
    icon: Database
  }
];

const newDataItems = [
  { content: 'User: Will it be sunny this weekend?', type: 'message' as const, importance: 0.8 },
  { content: 'Retrieved weather forecast: Saturday sunny, Sunday cloudy', type: 'fact' as const, importance: 0.75 },
  { content: 'User expressed excitement about hiking plans', type: 'message' as const, importance: 0.7 },
  { content: 'Pattern detected: User correlates weather with activity planning', type: 'pattern' as const, importance: 0.85 },
  { content: 'User: Can you recommend hiking trails nearby?', type: 'message' as const, importance: 0.8 },
  { content: 'Location-based trail recommendations retrieved', type: 'fact' as const, importance: 0.7 },
  { content: 'User preference: Moderate difficulty trails preferred', type: 'preference' as const, importance: 0.9 },
  { content: 'Cross-reference: Weather + location + activity preferences', type: 'pattern' as const, importance: 0.95 }
];

export const HierarchicalMemoryDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [memoryItems, setMemoryItems] = useState<MemoryItem[]>(initialMemoryItems);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [processedItems, setProcessedItems] = useState(0);
  const [metrics, setMetrics] = useState<SystemMetrics>({
    totalItems: 7,
    promotions: 0,
    demotions: 0,
    retrievalLatency: 45,
    memoryEfficiency: 78,
    compressionRatio: 65
  });
  const [operationLog, setOperationLog] = useState<string[]>([]);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [promotionAnimation, setPromotionAnimation] = useState<{itemId: string, fromTier: number, toTier: number} | null>(null);
  const [selectedItem, setSelectedItem] = useState<MemoryItem | null>(null);

  const addLogEntry = (message: string) => {
    setOperationLog(prev => [...prev.slice(-9), `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const resetDemo = useCallback(() => {
    setIsRunning(false);
    setMemoryItems(initialMemoryItems);
    setCurrentItemIndex(0);
    setProcessedItems(0);
    setMetrics({
      totalItems: 7,
      promotions: 0,
      demotions: 0,
      retrievalLatency: 45,
      memoryEfficiency: 78,
      compressionRatio: 65
    });
    setOperationLog([]);
    setCurrentOperation('');
    setPromotionAnimation(null);
    setSelectedItem(null);
  }, []);

  const calculateRetentionScore = (item: MemoryItem): number => {
    const ageWeight = Math.max(0, 1 - (Date.now() - item.created) / (30 * 24 * 60 * 60 * 1000));
    const accessWeight = Math.min(1, item.accessCount / 10);
    const importanceWeight = item.importance;
    const recencyWeight = Math.max(0, 1 - (Date.now() - item.lastAccessed) / (7 * 24 * 60 * 60 * 1000));
    
    return (ageWeight * 0.2 + accessWeight * 0.3 + importanceWeight * 0.3 + recencyWeight * 0.2);
  };

  const promoteItem = async (item: MemoryItem, newTier: number) => {
    setPromotionAnimation({ itemId: item.id, fromTier: item.tier, toTier: newTier });
    addLogEntry(`Promoting "${item.content.substring(0, 30)}..." from Tier ${item.tier} to Tier ${newTier}`);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setMemoryItems(prev => prev.map(i => 
      i.id === item.id ? { ...i, tier: newTier as any, retentionScore: calculateRetentionScore({...i, tier: newTier as any}) } : i
    ));
    
    setMetrics(prev => ({ ...prev, promotions: prev.promotions + 1 }));
    setPromotionAnimation(null);
  };

  const processNewItem = useCallback(async () => {
    if (currentItemIndex >= newDataItems.length) {
      setIsRunning(false);
      addLogEntry('Memory processing simulation completed');
      return;
    }

    const newData = newDataItems[currentItemIndex];
    setCurrentOperation('Analyzing new information...');
    addLogEntry(`Processing: "${newData.content.substring(0, 40)}..."`);
    
    await new Promise(resolve => setTimeout(resolve, 800));

    // Create new memory item
    const newItem: MemoryItem = {
      id: `item-${Date.now()}`,
      content: newData.content,
      type: newData.type,
      tier: 1, // Start in working memory
      importance: newData.importance,
      accessCount: 1,
      lastAccessed: Date.now(),
      created: Date.now(),
      retentionScore: newData.importance,
      connections: []
    };

    setCurrentOperation('Storing in working memory...');
    setMemoryItems(prev => [...prev, newItem]);
    
    await new Promise(resolve => setTimeout(resolve, 600));

    // Check for promotion opportunities
    setCurrentOperation('Evaluating promotion criteria...');
    
    const itemsToPromote = memoryItems.filter(item => {
      const score = calculateRetentionScore(item);
      return (
        (item.tier === 1 && score > 0.7 && item.accessCount >= 3) ||
        (item.tier === 2 && score > 0.8 && item.accessCount >= 8) ||
        (item.tier === 3 && score > 0.9 && item.accessCount >= 15)
      );
    });

    if (itemsToPromote.length > 0) {
      const itemToPromote = itemsToPromote[0];
      await promoteItem(itemToPromote, (itemToPromote.tier + 1) as any);
    }

    await new Promise(resolve => setTimeout(resolve, 400));

    // Update access patterns and retention scores
    setCurrentOperation('Updating retention scores...');
    setMemoryItems(prev => prev.map(item => ({
      ...item,
      retentionScore: calculateRetentionScore(item),
      accessCount: item.id === newItem.id ? item.accessCount : item.accessCount + (Math.random() < 0.3 ? 1 : 0)
    })));

    setMetrics(prev => ({
      ...prev,
      totalItems: prev.totalItems + 1,
      retrievalLatency: prev.retrievalLatency + Math.random() * 5 - 2.5,
      memoryEfficiency: Math.max(60, Math.min(95, prev.memoryEfficiency + Math.random() * 4 - 2)),
      compressionRatio: Math.max(50, Math.min(85, prev.compressionRatio + Math.random() * 3 - 1.5))
    }));

    setProcessedItems(prev => prev + 1);
    setCurrentItemIndex(prev => prev + 1);
    setCurrentOperation('');
    
  }, [currentItemIndex, memoryItems]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        processNewItem();
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [isRunning, processNewItem]);

  const startDemo = () => {
    setIsRunning(true);
    addLogEntry('Hierarchical memory simulation started');
  };

  const pauseDemo = () => {
    setIsRunning(false);
    addLogEntry('Simulation paused');
  };

  const getItemsByTier = (tier: number) => {
    return memoryItems.filter(item => item.tier === tier);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'message': return '💬';
      case 'fact': return '📋';
      case 'pattern': return '🔗';
      case 'skill': return '🛠️';
      case 'preference': return '⭐';
      default: return '📄';
    }
  };

  const getRetentionColor = (score: number) => {
    if (score >= 0.8) return 'text-green-400';
    if (score >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Hierarchical Memory Management</h2>
          <p className="text-gray-400">Multi-tier memory system with automatic promotion and intelligent retention</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={isRunning ? pauseDemo : startDemo}
            disabled={!isRunning && currentItemIndex >= newDataItems.length}
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
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Current Operation Status */}
      {currentOperation && (
        <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-blue-300">{currentOperation}</span>
          </div>
        </div>
      )}

      {/* Promotion Animation */}
      {promotionAnimation && (
        <div className="mb-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-2">
            <ArrowUp className="w-4 h-4 text-green-400 animate-bounce" />
            <span className="text-green-300">
              Promoting item from Tier {promotionAnimation.fromTier} to Tier {promotionAnimation.toTier}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Memory Hierarchy Visualization */}
        <div className="lg:col-span-2 space-y-4">
          {memoryTiers.map((tier) => {
            const tierItems = getItemsByTier(tier.id);
            const TierIcon = tier.icon;
            
            return (
              <div key={tier.id} className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${tier.color} flex items-center justify-center`}>
                      <TierIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                      <p className="text-sm text-gray-400">{tier.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-300">
                      {tierItems.length} / {tier.capacity === 10000 ? '∞' : tier.capacity}
                    </div>
                    <div className="text-xs text-gray-500">{tier.retentionTime}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {tierItems.length === 0 ? (
                    <div className="text-center text-gray-500 py-4">
                      <Layers className="w-6 h-6 mx-auto mb-2 opacity-50" />
                      <div className="text-sm">No items in this tier</div>
                    </div>
                  ) : (
                    tierItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedItem?.id === item.id
                            ? 'border-blue-500/50 bg-blue-500/10'
                            : 'border-gray-600/50 bg-gray-700/30 hover:bg-gray-700/50'
                        } ${
                          promotionAnimation?.itemId === item.id
                            ? 'ring-2 ring-green-400 animate-pulse'
                            : ''
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getTypeIcon(item.type)}</span>
                            <div>
                              <div className="text-sm font-medium text-white capitalize">{item.type}</div>
                              <div className="text-xs text-gray-400">
                                Accessed {item.accessCount} times
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-400">Retention</div>
                            <div className={`text-sm font-medium ${getRetentionColor(item.retentionScore)}`}>
                              {(item.retentionScore * 100).toFixed(0)}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-300 mb-2">{item.content}</div>
                        
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center p-1 bg-gray-800/30 rounded">
                            <div className="text-blue-400">{item.importance.toFixed(2)}</div>
                            <div className="text-gray-500">Importance</div>
                          </div>
                          <div className="text-center p-1 bg-gray-800/30 rounded">
                            <div className="text-green-400">
                              {Math.floor((Date.now() - item.lastAccessed) / 60000)}m
                            </div>
                            <div className="text-gray-500">Last Access</div>
                          </div>
                          <div className="text-center p-1 bg-gray-800/30 rounded">
                            <div className="text-purple-400">{item.connections.length}</div>
                            <div className="text-gray-500">Connections</div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Control Panel & Metrics */}
        <div className="space-y-6">
          {/* System Metrics */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              System Metrics
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Items:</span>
                <span className="font-medium text-cyan-400">{metrics.totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Promotions:</span>
                <span className="font-medium text-green-400">{metrics.promotions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Retrieval Latency:</span>
                <span className="font-medium text-blue-400">{metrics.retrievalLatency.toFixed(1)}ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Memory Efficiency:</span>
                <span className="font-medium text-yellow-400">{metrics.memoryEfficiency.toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Compression:</span>
                <span className="font-medium text-purple-400">{metrics.compressionRatio.toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* Item Details */}
          {selectedItem && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-orange-400" />
                Item Details
              </h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-400 mb-1">Content:</div>
                  <div className="text-gray-200">{selectedItem.content}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-gray-400">Type:</div>
                    <div className="text-gray-200 capitalize">{selectedItem.type}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Tier:</div>
                    <div className="text-gray-200">{selectedItem.tier}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-gray-400">Access Count:</div>
                    <div className="text-green-400">{selectedItem.accessCount}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Importance:</div>
                    <div className="text-blue-400">{selectedItem.importance.toFixed(2)}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-400">Created:</div>
                  <div className="text-gray-200 text-xs">
                    {new Date(selectedItem.created).toLocaleString()}
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-400">Last Accessed:</div>
                  <div className="text-gray-200 text-xs">
                    {new Date(selectedItem.lastAccessed).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Operation Log */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Operation Log
            </h3>
            
            <div className="space-y-1 text-xs max-h-48 overflow-y-auto">
              {operationLog.map((entry, index) => (
                <div key={index} className="text-gray-300 py-1 border-b border-gray-700/30 last:border-b-0">
                  {entry}
                </div>
              ))}
              {operationLog.length === 0 && (
                <div className="text-center text-gray-400 py-4">
                  <Clock className="w-6 h-6 mx-auto mb-2 opacity-50" />
                  <p>Waiting for operations to start...</p>
                </div>
              )}
            </div>
          </div>

          {/* Promotion Rules */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              Promotion Rules
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <ArrowUp className="w-4 h-4 text-green-400 mt-0.5" />
                <div>
                  <div className="font-medium text-green-400">Tier 1 → 2</div>
                  <div className="text-gray-400">Retention > 70%, Access ≥ 3</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <ArrowUp className="w-4 h-4 text-yellow-400 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-400">Tier 2 → 3</div>
                  <div className="text-gray-400">Retention > 80%, Access ≥ 8</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <ArrowUp className="w-4 h-4 text-purple-400 mt-0.5" />
                <div>
                  <div className="font-medium text-purple-400">Tier 3 → 4</div>
                  <div className="text-gray-400">Retention > 90%, Access ≥ 15</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Explanation */}
      <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Hierarchical Memory Algorithm
        </h4>
        <div className="text-sm text-gray-300 space-y-2">
          <p><strong>Core Principle:</strong> Multi-tier memory architecture that automatically promotes important information through memory levels based on access patterns, importance scores, and retention policies.</p>
          <p><strong>Retention Formula:</strong> Score = (age × 0.2) + (access_frequency × 0.3) + (importance × 0.3) + (recency × 0.2)</p>
          <p><strong>Benefits:</strong> Optimized memory usage, intelligent long-term retention, automatic knowledge consolidation, efficient retrieval across tiers.</p>
          <p><strong>Applications:</strong> Personal assistants, learning systems, knowledge management, adaptive AI systems with long-term memory requirements.</p>
        </div>
      </div>
    </div>
  );
};

export default HierarchicalMemoryDemo;