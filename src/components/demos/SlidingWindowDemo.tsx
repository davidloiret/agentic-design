'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, ArrowLeft, Database, Clock, Zap, TrendingUp, Activity, BarChart3, Settings, AlertTriangle, CheckCircle } from 'lucide-react';
import { usePlausible } from '@/hooks/usePlausible';

interface WindowItem {
  id: string;
  content: string;
  timestamp: number;
  priority: number;
  type: 'message' | 'system' | 'context' | 'data';
  age: number;
  relevanceScore: number;
}

interface WindowMetrics {
  totalItems: number;
  memoryUsage: number;
  hitRate: number;
  compressionRatio: number;
  avgLatency: number;
  evictionCount: number;
}

const initialWindowItems: WindowItem[] = [
  {
    id: 'item-1',
    content: 'User: What is the weather today?',
    timestamp: Date.now() - 30000,
    priority: 0.95,
    type: 'message',
    age: 30,
    relevanceScore: 0.92
  },
  {
    id: 'item-2',
    content: 'Context: Location = San Francisco, CA',
    timestamp: Date.now() - 45000,
    priority: 0.85,
    type: 'context',
    age: 45,
    relevanceScore: 0.88
  },
  {
    id: 'item-3',
    content: 'AI: Temperature is 72°F, partly cloudy',
    timestamp: Date.now() - 60000,
    priority: 0.75,
    type: 'message',
    age: 60,
    relevanceScore: 0.82
  },
  {
    id: 'item-4',
    content: 'System: Weather API response cached',
    timestamp: Date.now() - 120000,
    priority: 0.65,
    type: 'system',
    age: 120,
    relevanceScore: 0.75
  },
  {
    id: 'item-5',
    content: 'User: Previous weather query about weekend',
    timestamp: Date.now() - 300000,
    priority: 0.35,
    type: 'message',
    age: 300,
    relevanceScore: 0.45
  }
];

const newDataItems = [
  'User: Will it rain tomorrow?',
  'Context: User preferences = detailed forecasts',
  'System: Weather forecast API call initiated',
  'Data: Tomorrow forecast - 68°F, 30% rain chance',
  'User: What about this weekend?',
  'Context: Weekend plans = outdoor activities',
  'AI: Saturday sunny 75°F, Sunday cloudy 70°F',
  'System: Extended forecast cached for 6 hours',
  'User: Should I bring an umbrella?',
  'Context: Current location = downtown SF',
  'Data: Rain probability analysis complete',
  'AI: Light rain possible, umbrella recommended'
];

export const SlidingWindowDemo: React.FC = () => {
  const { trackEvent } = usePlausible();
  const [isRunning, setIsRunning] = useState(false);
  const [windowItems, setWindowItems] = useState<WindowItem[]>(initialWindowItems);
  const [windowSize] = useState(5);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [processedItems, setProcessedItems] = useState(0);
  const [metrics, setMetrics] = useState<WindowMetrics>({
    totalItems: 5,
    memoryUsage: 82,
    hitRate: 94,
    compressionRatio: 68,
    avgLatency: 12,
    evictionCount: 0
  });
  const [operationLog, setOperationLog] = useState<string[]>([]);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [showEvictionAnimation, setShowEvictionAnimation] = useState(false);
  const [evictedItem, setEvictedItem] = useState<WindowItem | null>(null);

  const addLogEntry = (message: string) => {
    setOperationLog(prev => [...prev.slice(-7), `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const resetDemo = useCallback(() => {
    trackEvent('Demo Interaction', {
      action: 'reset_demo',
      demo_type: 'sliding_window',
      final_processed_items: processedItems,
      final_item_index: currentItemIndex
    });

    setIsRunning(false);
    setWindowItems(initialWindowItems);
    setCurrentItemIndex(0);
    setProcessedItems(0);
    setMetrics({
      totalItems: 5,
      memoryUsage: 82,
      hitRate: 94,
      compressionRatio: 68,
      avgLatency: 12,
      evictionCount: 0
    });
    setOperationLog([]);
    setCurrentOperation('');
    setShowEvictionAnimation(false);
    setEvictedItem(null);
  }, []);

  const addNewItem = useCallback(async () => {
    if (currentItemIndex >= newDataItems.length) {
      setIsRunning(false);
      addLogEntry('Simulation completed - all items processed');
      return;
    }

    const newContent = newDataItems[currentItemIndex];
    const newItem: WindowItem = {
      id: `item-${Date.now()}`,
      content: newContent,
      timestamp: Date.now(),
      priority: 0.9 + Math.random() * 0.1,
      type: newContent.includes('User:') ? 'message' : 
            newContent.includes('Context:') ? 'context' :
            newContent.includes('Data:') ? 'data' : 'system',
      age: 0,
      relevanceScore: 0.85 + Math.random() * 0.15
    };

    setCurrentOperation('Analyzing new data item...');
    addLogEntry(`New item received: "${newContent.substring(0, 30)}..."`);
    
    await new Promise(resolve => setTimeout(resolve, 800));

    setCurrentOperation('Checking window capacity...');
    addLogEntry(`Window capacity check: ${windowItems.length}/${windowSize} slots used`);
    
    await new Promise(resolve => setTimeout(resolve, 600));

    if (windowItems.length >= windowSize) {
      // Need to evict oldest item
      const oldestItem = windowItems.reduce((oldest, current) => 
        current.timestamp < oldest.timestamp ? current : oldest
      );
      
      setCurrentOperation('Evicting oldest item...');
      setEvictedItem(oldestItem);
      setShowEvictionAnimation(true);
      addLogEntry(`Evicting: "${oldestItem.content.substring(0, 30)}..." (age: ${oldestItem.age}s)`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setWindowItems(prev => {
        const filtered = prev.filter(item => item.id !== oldestItem.id);
        return [...filtered, newItem];
      });
      
      setMetrics(prev => ({
        ...prev,
        evictionCount: prev.evictionCount + 1,
        memoryUsage: Math.min(98, prev.memoryUsage + Math.random() * 3),
        hitRate: Math.max(85, prev.hitRate - Math.random() * 2),
        avgLatency: prev.avgLatency + Math.random() * 2
      }));
      
      setShowEvictionAnimation(false);
      setEvictedItem(null);
    } else {
      // Add to available slot
      setWindowItems(prev => [...prev, newItem]);
      setMetrics(prev => ({
        ...prev,
        memoryUsage: Math.min(95, prev.memoryUsage + Math.random() * 4),
        hitRate: Math.min(98, prev.hitRate + Math.random() * 1)
      }));
    }

    setCurrentOperation('Updating indices and metadata...');
    addLogEntry(`Item added successfully. Priority: ${newItem.priority.toFixed(2)}`);
    
    await new Promise(resolve => setTimeout(resolve, 500));

    setCurrentOperation('Window operation complete');
    setProcessedItems(prev => prev + 1);
    setCurrentItemIndex(prev => prev + 1);
    
    // Age existing items
    setWindowItems(prev => prev.map(item => ({
      ...item,
      age: item.age + 5,
      priority: Math.max(0.1, item.priority - 0.05),
      relevanceScore: Math.max(0.3, item.relevanceScore - 0.02)
    })));

    await new Promise(resolve => setTimeout(resolve, 500));
    setCurrentOperation('');
    
  }, [currentItemIndex, windowItems, windowSize]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        addNewItem();
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isRunning, addNewItem]);

  const startDemo = () => {
    trackEvent('Demo Interaction', {
      action: 'start_demo',
      demo_type: 'sliding_window',
      window_size: windowSize,
      current_item_index: currentItemIndex
    });

    setIsRunning(true);
    addLogEntry('Sliding window simulation started');
  };

  const pauseDemo = () => {
    trackEvent('Demo Interaction', {
      action: 'pause_demo',
      demo_type: 'sliding_window',
      processed_items: processedItems,
      current_item_index: currentItemIndex
    });

    setIsRunning(false);
    addLogEntry('Simulation paused');
  };

  const getItemTypeColor = (type: string) => {
    switch (type) {
      case 'message': return 'from-blue-500 to-blue-600';
      case 'context': return 'from-green-500 to-green-600';
      case 'system': return 'from-purple-500 to-purple-600';
      case 'data': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getItemTypeIcon = (type: string) => {
    switch (type) {
      case 'message': return '💬';
      case 'context': return '🎯';
      case 'system': return '⚙️';
      case 'data': return '📊';
      default: return '📄';
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Sliding Window Memory Management</h2>
          <p className="text-gray-400">Live demonstration of fixed-size memory window with automatic eviction</p>
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

      {/* Window Configuration */}
      <div className="mb-6">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            Window Configuration
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-gray-700/50 rounded">
              <div className="font-semibold text-blue-400">{windowSize}</div>
              <div className="text-gray-400">Window Size</div>
            </div>
            <div className="text-center p-3 bg-gray-700/50 rounded">
              <div className="font-semibold text-green-400">FIFO</div>
              <div className="text-gray-400">Eviction Policy</div>
            </div>
            <div className="text-center p-3 bg-gray-700/50 rounded">
              <div className="font-semibold text-yellow-400">{processedItems}</div>
              <div className="text-gray-400">Items Processed</div>
            </div>
            <div className="text-center p-3 bg-gray-700/50 rounded">
              <div className="font-semibold text-purple-400">{metrics.evictionCount}</div>
              <div className="text-gray-400">Items Evicted</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Memory Window Visualization */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-400" />
              Memory Window ({windowItems.length}/{windowSize} slots)
            </h3>
            
            {/* Current Operation Status */}
            {currentOperation && (
              <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span className="text-blue-300 text-sm">{currentOperation}</span>
                </div>
              </div>
            )}

            {/* Eviction Animation */}
            {showEvictionAnimation && evictedItem && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 text-red-400 animate-bounce" />
                  <span className="text-red-300 text-sm">
                    Evicting: {evictedItem.content.substring(0, 40)}...
                  </span>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              {windowItems
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((item, index) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg border transition-all ${
                    index === 0 ? 'border-green-500/50 bg-green-500/5' : 
                    index === windowItems.length - 1 ? 'border-red-500/30 bg-red-500/5' :
                    'border-gray-600/50 bg-gray-700/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getItemTypeIcon(item.type)}</span>
                      <div>
                        <div className="text-sm font-medium text-white">
                          Slot {index + 1} {index === 0 ? '(Newest)' : index === windowItems.length - 1 ? '(Oldest)' : ''}
                        </div>
                        <div className="text-xs text-gray-400 capitalize">{item.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Priority</div>
                      <div className="text-sm font-medium text-yellow-400">{item.priority.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-300 mb-2">{item.content}</div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-1 bg-gray-800/30 rounded">
                      <div className="text-blue-400">{item.age}s</div>
                      <div className="text-gray-500">Age</div>
                    </div>
                    <div className="text-center p-1 bg-gray-800/30 rounded">
                      <div className="text-green-400">{item.relevanceScore.toFixed(2)}</div>
                      <div className="text-gray-500">Relevance</div>
                    </div>
                    <div className="text-center p-1 bg-gray-800/30 rounded">
                      <div className="text-purple-400">{new Date(item.timestamp).toLocaleTimeString()}</div>
                      <div className="text-gray-500">Time</div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Empty slots */}
              {Array.from({ length: windowSize - windowItems.length }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="p-3 rounded-lg border border-dashed border-gray-600/30 bg-gray-800/20"
                >
                  <div className="text-center text-gray-500">
                    <Database className="w-6 h-6 mx-auto mb-2 opacity-50" />
                    <div className="text-sm">Empty Slot {windowItems.length + index + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics Dashboard */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              Performance Metrics
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Memory Usage:</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${metrics.memoryUsage}%` }}
                    />
                  </div>
                  <span className="text-cyan-400 font-medium">{metrics.memoryUsage}%</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Hit Rate:</span>
                <span className="font-medium text-green-400">{metrics.hitRate}%</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Avg Latency:</span>
                <span className="font-medium text-blue-400">{metrics.avgLatency.toFixed(1)}ms</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Compression Ratio:</span>
                <span className="font-medium text-purple-400">{metrics.compressionRatio}%</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Total Evictions:</span>
                <span className="font-medium text-orange-400">{metrics.evictionCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Operation Log & Next Items */}
        <div className="space-y-6">
          {/* Operation Log */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-400" />
              Operation Log
            </h3>
            
            <div className="space-y-1 text-xs max-h-64 overflow-y-auto">
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

          {/* Upcoming Data Stream */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
              Incoming Data Stream
            </h3>
            
            <div className="space-y-2">
              {newDataItems.slice(currentItemIndex, currentItemIndex + 5).map((item, index) => (
                <div
                  key={index}
                  className={`p-2 rounded text-sm ${
                    index === 0 && isRunning
                      ? 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-300'
                      : 'bg-gray-700/30 text-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {index === 0 && isRunning && <ArrowRight className="w-4 h-4 text-yellow-400" />}
                    <span>{item}</span>
                  </div>
                </div>
              ))}
              
              {currentItemIndex >= newDataItems.length && (
                <div className="text-center text-gray-400 py-4">
                  <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-400" />
                  <p>All data items processed</p>
                </div>
              )}
            </div>
          </div>

          {/* Window Operations Guide */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              Window Operations
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div>
                  <div className="font-medium text-green-400">Add Operation</div>
                  <div className="text-gray-400">Insert new item, check capacity, assign priority</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                <div>
                  <div className="font-medium text-red-400">Evict Operation</div>
                  <div className="text-gray-400">Remove oldest item when window is full</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div>
                  <div className="font-medium text-blue-400">Update Operation</div>
                  <div className="text-gray-400">Refresh timestamps and relevance scores</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                <div>
                  <div className="font-medium text-purple-400">Compress Operation</div>
                  <div className="text-gray-400">Reduce memory footprint while preserving key info</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Explanation */}
      <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          Sliding Window Algorithm
        </h4>
        <div className="text-sm text-gray-300 space-y-2">
          <p><strong>Core Principle:</strong> Maintain a fixed-size memory buffer that automatically discards the oldest information when new data arrives, ensuring constant memory usage regardless of input volume.</p>
          <p><strong>Eviction Policy:</strong> First-In-First-Out (FIFO) - oldest items by timestamp are removed first when capacity is reached.</p>
          <p><strong>Benefits:</strong> Predictable memory usage, excellent for real-time systems, natural recency bias, simple implementation.</p>
          <p><strong>Trade-offs:</strong> May lose important historical context, no semantic awareness of content importance.</p>
        </div>
      </div>
    </div>
  );
};

export default SlidingWindowDemo;