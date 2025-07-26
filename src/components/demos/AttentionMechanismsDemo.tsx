'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Eye, Search, Brain, Target, Zap, BarChart3, Activity, Layers, Filter, TrendingUp, Clock, AlertCircle } from 'lucide-react';

interface MemoryItem {
  id: string;
  content: string;
  type: 'conversation' | 'fact' | 'context' | 'preference' | 'event';
  timestamp: number;
  semanticVector: number[];
  attentionScore: number;
  relevanceScore: number;
  temporalScore: number;
  contextScore: number;
  isSelected: boolean;
}

interface AttentionQuery {
  text: string;
  intent: string;
  keywords: string[];
  complexity: 'simple' | 'moderate' | 'complex';
  semanticVector: number[];
}

interface AttentionMetrics {
  totalItems: number;
  selectedItems: number;
  maxAttention: number;
  avgAttention: number;
  focusSharpness: number;
  processingTime: number;
}

const initialMemoryItems: MemoryItem[] = [
  {
    id: 'item-1',
    content: 'Paris vacation photos from last summer',
    type: 'event',
    timestamp: Date.now() - 15552000000, // 6 months ago
    semanticVector: [0.8, 0.3, 0.9, 0.2, 0.6],
    attentionScore: 0,
    relevanceScore: 0,
    temporalScore: 0,
    contextScore: 0,
    isSelected: false
  },
  {
    id: 'item-2',
    content: 'Weather forecast for Paris during vacation',
    type: 'fact',
    timestamp: Date.now() - 15638400000, // 6 months ago
    semanticVector: [0.9, 0.2, 0.8, 0.1, 0.7],
    attentionScore: 0,
    relevanceScore: 0,
    temporalScore: 0,
    contextScore: 0,
    isSelected: false
  },
  {
    id: 'item-3',
    content: 'Flight booking confirmation to Paris',
    type: 'event',
    timestamp: Date.now() - 16723200000, // 6.5 months ago
    semanticVector: [0.7, 0.1, 0.9, 0.3, 0.5],
    attentionScore: 0,
    relevanceScore: 0,
    temporalScore: 0,
    contextScore: 0,
    isSelected: false
  },
  {
    id: 'item-4',
    content: 'Restaurant recommendations in Paris 7th arrondissement',
    type: 'preference',
    timestamp: Date.now() - 15984000000, // 6.2 months ago
    semanticVector: [0.6, 0.4, 0.8, 0.9, 0.3],
    attentionScore: 0,
    relevanceScore: 0,
    temporalScore: 0,
    contextScore: 0,
    isSelected: false
  },
  {
    id: 'item-5',
    content: 'Downloaded weather app for travel planning',
    type: 'context',
    timestamp: Date.now() - 20736000000, // 8 months ago
    semanticVector: [0.4, 0.1, 0.3, 0.2, 0.8],
    attentionScore: 0,
    relevanceScore: 0,
    temporalScore: 0,
    contextScore: 0,
    isSelected: false
  },
  {
    id: 'item-6',
    content: 'Meeting notes from last Tuesday about project timeline',
    type: 'context',
    timestamp: Date.now() - 432000000, // 5 days ago
    semanticVector: [0.2, 0.8, 0.1, 0.3, 0.4],
    attentionScore: 0,
    relevanceScore: 0,
    temporalScore: 0,
    contextScore: 0,
    isSelected: false
  },
  {
    id: 'item-7',
    content: 'User preference: detailed weather information with hourly forecasts',
    type: 'preference',
    timestamp: Date.now() - 2592000000, // 1 month ago
    semanticVector: [0.8, 0.2, 0.6, 0.1, 0.9],
    attentionScore: 0,
    relevanceScore: 0,
    temporalScore: 0,
    contextScore: 0,
    isSelected: false
  },
  {
    id: 'item-8',
    content: 'Current weather in San Francisco for context',
    type: 'fact',
    timestamp: Date.now() - 3600000, // 1 hour ago
    semanticVector: [0.7, 0.1, 0.4, 0.2, 0.6],
    attentionScore: 0,
    relevanceScore: 0,
    temporalScore: 0,
    contextScore: 0,
    isSelected: false
  }
];

const sampleQueries: AttentionQuery[] = [
  {
    text: 'What was the weather like during our Paris trip?',
    intent: 'historical_weather_query',
    keywords: ['weather', 'Paris', 'trip'],
    complexity: 'moderate',
    semanticVector: [0.85, 0.25, 0.8, 0.15, 0.7]
  },
  {
    text: 'Show me vacation photos',
    intent: 'media_retrieval',
    keywords: ['vacation', 'photos'],
    complexity: 'simple',
    semanticVector: [0.9, 0.1, 0.95, 0.3, 0.4]
  },
  {
    text: 'What restaurants did we plan to visit in Paris?',
    intent: 'preference_recall',
    keywords: ['restaurants', 'Paris', 'visit', 'plan'],
    complexity: 'complex',
    semanticVector: [0.6, 0.3, 0.85, 0.9, 0.4]
  }
];

export const AttentionMechanismsDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentQuery, setCurrentQuery] = useState<AttentionQuery>(sampleQueries[0]);
  const [memoryItems, setMemoryItems] = useState<MemoryItem[]>(initialMemoryItems);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [metrics, setMetrics] = useState<AttentionMetrics>({
    totalItems: 8,
    selectedItems: 0,
    maxAttention: 0,
    avgAttention: 0,
    focusSharpness: 0,
    processingTime: 0
  });
  const [operationLog, setOperationLog] = useState<string[]>([]);
  const [attentionThreshold, setAttentionThreshold] = useState(0.5);
  const [showAttentionHeatmap, setShowAttentionHeatmap] = useState(false);

  const phases = [
    'Query Processing & Intent Analysis',
    'Memory Content Scanning',
    'Semantic Similarity Calculation',
    'Temporal Relevance Scoring',
    'Contextual Importance Evaluation',
    'Attention Score Aggregation',
    'Softmax Normalization',
    'Selective Filtering & Ranking'
  ];

  const addLogEntry = (message: string) => {
    setOperationLog(prev => [...prev.slice(-9), `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const resetDemo = useCallback(() => {
    setIsRunning(false);
    setCurrentPhase(0);
    setMemoryItems(initialMemoryItems);
    setMetrics({
      totalItems: 8,
      selectedItems: 0,
      maxAttention: 0,
      avgAttention: 0,
      focusSharpness: 0,
      processingTime: 0
    });
    setOperationLog([]);
    setShowAttentionHeatmap(false);
  }, []);

  const calculateSemanticSimilarity = (vec1: number[], vec2: number[]): number => {
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (mag1 * mag2);
  };

  const calculateTemporalScore = (timestamp: number): number => {
    const ageInDays = (Date.now() - timestamp) / (24 * 60 * 60 * 1000);
    return Math.exp(-ageInDays / 30); // Exponential decay with 30-day half-life
  };

  const calculateContextScore = (item: MemoryItem, query: AttentionQuery): number => {
    let score = 0.5; // Base score
    
    // Boost score based on content type relevance
    if (query.intent === 'historical_weather_query' && (item.type === 'fact' || item.type === 'event')) {
      score += 0.3;
    }
    if (query.intent === 'media_retrieval' && item.type === 'event') {
      score += 0.4;
    }
    if (query.intent === 'preference_recall' && item.type === 'preference') {
      score += 0.3;
    }
    
    // Keyword matching boost
    const matchingKeywords = query.keywords.filter(keyword => 
      item.content.toLowerCase().includes(keyword.toLowerCase())
    ).length;
    score += (matchingKeywords / query.keywords.length) * 0.2;
    
    return Math.min(1, score);
  };

  const softmax = (scores: number[]): number[] => {
    const maxScore = Math.max(...scores);
    const expScores = scores.map(score => Math.exp(score - maxScore));
    const sumExp = expScores.reduce((sum, val) => sum + val, 0);
    return expScores.map(exp => exp / sumExp);
  };

  const runAttentionMechanism = useCallback(async () => {
    if (!isRunning) return;

    const startTime = Date.now();
    
    // Phase 0: Query Processing
    setCurrentPhase(0);
    addLogEntry(`Processing query: "${currentQuery.text}"`);
    addLogEntry(`Intent detected: ${currentQuery.intent}`);
    addLogEntry(`Keywords extracted: ${currentQuery.keywords.join(', ')}`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Phase 1: Memory Scanning
    setCurrentPhase(1);
    addLogEntry(`Scanning ${memoryItems.length} memory items for relevance`);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Phase 2: Semantic Similarity
    setCurrentPhase(2);
    addLogEntry('Calculating semantic similarity scores...');
    const updatedItems = memoryItems.map(item => ({
      ...item,
      relevanceScore: calculateSemanticSimilarity(item.semanticVector, currentQuery.semanticVector)
    }));
    setMemoryItems(updatedItems);
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Phase 3: Temporal Scoring
    setCurrentPhase(3);
    addLogEntry('Evaluating temporal relevance...');
    setMemoryItems(prev => prev.map(item => ({
      ...item,
      temporalScore: calculateTemporalScore(item.timestamp)
    })));
    await new Promise(resolve => setTimeout(resolve, 900));

    // Phase 4: Context Scoring
    setCurrentPhase(4);
    addLogEntry('Analyzing contextual importance...');
    setMemoryItems(prev => prev.map(item => ({
      ...item,
      contextScore: calculateContextScore(item, currentQuery)
    })));
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Phase 5: Attention Aggregation
    setCurrentPhase(5);
    addLogEntry('Aggregating multi-dimensional attention scores...');
    const rawScores = memoryItems.map(item => 
      item.relevanceScore * 0.4 + item.temporalScore * 0.2 + item.contextScore * 0.4
    );
    await new Promise(resolve => setTimeout(resolve, 800));

    // Phase 6: Softmax Normalization
    setCurrentPhase(6);
    addLogEntry('Applying softmax normalization...');
    const normalizedScores = softmax(rawScores);
    setMemoryItems(prev => prev.map((item, index) => ({
      ...item,
      attentionScore: normalizedScores[index]
    })));
    await new Promise(resolve => setTimeout(resolve, 700));

    // Phase 7: Selective Filtering
    setCurrentPhase(7);
    addLogEntry(`Filtering items with attention &gt; ${attentionThreshold}`);
    const finalItems = memoryItems.map((item, index) => ({
      ...item,
      attentionScore: normalizedScores[index],
      isSelected: normalizedScores[index] >= attentionThreshold
    }));
    
    setMemoryItems(finalItems);
    setShowAttentionHeatmap(true);

    const selectedCount = finalItems.filter(item => item.isSelected).length;
    const maxAttention = Math.max(...normalizedScores);
    const avgAttention = normalizedScores.reduce((sum, score) => sum + score, 0) / normalizedScores.length;
    const focusSharpness = maxAttention / avgAttention;
    const processingTime = Date.now() - startTime;

    setMetrics({
      totalItems: memoryItems.length,
      selectedItems: selectedCount,
      maxAttention,
      avgAttention,
      focusSharpness,
      processingTime
    });

    addLogEntry(`Attention processing complete: ${selectedCount} items selected`);
    addLogEntry(`Focus sharpness: ${focusSharpness.toFixed(2)}, Processing time: ${processingTime}ms`);
    
    setIsRunning(false);
  }, [isRunning, currentQuery, memoryItems, attentionThreshold]);

  useEffect(() => {
    if (isRunning) {
      runAttentionMechanism();
    }
  }, [isRunning, runAttentionMechanism]);

  const startDemo = () => {
    setIsRunning(true);
    setCurrentPhase(0);
  };

  const pauseDemo = () => {
    setIsRunning(false);
  };

  const changeQuery = (index: number) => {
    if (!isRunning) {
      setCurrentQuery(sampleQueries[index]);
      resetDemo();
    }
  };

  const getAttentionColor = (score: number): string => {
    if (score >= 0.8) return 'from-red-500 to-red-600';
    if (score >= 0.6) return 'from-orange-500 to-orange-600';
    if (score >= 0.4) return 'from-yellow-500 to-yellow-600';
    if (score >= 0.2) return 'from-blue-500 to-blue-600';
    return 'from-gray-500 to-gray-600';
  };

  const getAttentionIntensity = (score: number): string => {
    return `${Math.round(score * 100)}%`;
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Attention Mechanisms</h2>
          <p className="text-gray-400">Selective focus on relevant information through dynamic attention scoring</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={isRunning ? pauseDemo : startDemo}
            disabled={false}
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

      {/* Query Selection */}
      <div className="mb-6">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-400" />
            Query Selection
          </h3>
          <div className="space-y-2">
            {sampleQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => changeQuery(index)}
                disabled={isRunning}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  currentQuery.text === query.text
                    ? 'border-blue-500/50 bg-blue-500/10'
                    : 'border-gray-600/50 bg-gray-700/30 hover:bg-gray-700/50'
                }`}
              >
                <div className="font-medium text-white">{query.text}</div>
                <div className="text-sm text-gray-400 mt-1">
                  Intent: {query.intent} • Keywords: {query.keywords.join(', ')} • Complexity: {query.complexity}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Processing Status */}
      {isRunning && (
        <div className="mb-6">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              Processing Status
            </h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Current Phase</span>
              <span className="text-sm text-gray-400">{currentPhase + 1} / {phases.length}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentPhase + 1) / phases.length) * 100}%` }}
              />
            </div>
            <div className="text-sm text-purple-400">{phases[currentPhase]}</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Memory Items & Attention Visualization */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Eye className="w-5 h-5 text-orange-400" />
                Memory Items & Attention Scores
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Threshold:</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={attentionThreshold}
                    onChange={(e) => setAttentionThreshold(parseFloat(e.target.value))}
                    disabled={isRunning}
                    className="w-20"
                  />
                  <span className="text-sm text-white">{attentionThreshold.toFixed(1)}</span>
                </div>
                <button
                  onClick={() => setShowAttentionHeatmap(!showAttentionHeatmap)}
                  className="text-sm px-2 py-1 bg-gray-600 rounded hover:bg-gray-500"
                >
                  {showAttentionHeatmap ? 'Hide' : 'Show'} Heatmap
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              {memoryItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border transition-all ${
                    item.isSelected 
                      ? 'border-green-500/50 bg-green-500/10 ring-1 ring-green-500/20' 
                      : 'border-gray-600/50 bg-gray-700/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="text-sm text-white font-medium mb-1">{item.content}</div>
                      <div className="text-xs text-gray-400 capitalize">
                        {item.type} • {new Date(item.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                    {item.isSelected && (
                      <div className="ml-3">
                        <Target className="w-5 h-5 text-green-400" />
                      </div>
                    )}
                  </div>
                  
                  {showAttentionHeatmap && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="text-center p-1 bg-gray-800/30 rounded">
                          <div className="text-blue-400">{item.relevanceScore.toFixed(3)}</div>
                          <div className="text-gray-500">Semantic</div>
                        </div>
                        <div className="text-center p-1 bg-gray-800/30 rounded">
                          <div className="text-yellow-400">{item.temporalScore.toFixed(3)}</div>
                          <div className="text-gray-500">Temporal</div>
                        </div>
                        <div className="text-center p-1 bg-gray-800/30 rounded">
                          <div className="text-purple-400">{item.contextScore.toFixed(3)}</div>
                          <div className="text-gray-500">Context</div>
                        </div>
                        <div className="text-center p-1 bg-gray-800/30 rounded">
                          <div className="text-orange-400 font-semibold">{item.attentionScore.toFixed(3)}</div>
                          <div className="text-gray-500">Attention</div>
                        </div>
                      </div>
                      
                      {item.attentionScore > 0 && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-400">Attention Intensity</span>
                            <span className="text-xs text-orange-400">{getAttentionIntensity(item.attentionScore)}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${getAttentionColor(item.attentionScore)} transition-all duration-300`}
                              style={{ width: getAttentionIntensity(item.attentionScore) }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics & Controls */}
        <div className="space-y-6">
          {/* Attention Metrics */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              Attention Metrics
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Items:</span>
                <span className="font-medium text-cyan-400">{metrics.totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Selected Items:</span>
                <span className="font-medium text-green-400">{metrics.selectedItems}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Max Attention:</span>
                <span className="font-medium text-orange-400">{metrics.maxAttention.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avg Attention:</span>
                <span className="font-medium text-blue-400">{metrics.avgAttention.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Focus Sharpness:</span>
                <span className="font-medium text-purple-400">{metrics.focusSharpness.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Processing Time:</span>
                <span className="font-medium text-yellow-400">{metrics.processingTime}ms</span>
              </div>
            </div>
          </div>

          {/* Operation Log */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
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
                  <p>Waiting for attention processing...</p>
                </div>
              )}
            </div>
          </div>

          {/* Attention Formula */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-emerald-400" />
              Attention Formula
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-gray-700/30 rounded-lg font-mono text-xs">
                <div className="text-emerald-400 mb-2">Attention Score =</div>
                <div className="text-gray-300">
                  • Semantic Similarity × 0.4<br/>
                  • Temporal Relevance × 0.2<br/>
                  • Contextual Importance × 0.4
                </div>
              </div>
              
              <div className="text-xs text-gray-400">
                <div className="mb-2"><strong>Semantic:</strong> Cosine similarity between query and content vectors</div>
                <div className="mb-2"><strong>Temporal:</strong> Exponential decay based on age (30-day half-life)</div>
                <div><strong>Context:</strong> Intent matching + keyword overlap + content type relevance</div>
              </div>
            </div>
          </div>

          {/* Attention Patterns */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-pink-400" />
              Attention Patterns
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                <div>
                  <div className="font-medium text-red-400">High Attention (&gt; 0.8)</div>
                  <div className="text-gray-400">Primary focus items for response generation</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                <div>
                  <div className="font-medium text-orange-400">Medium Attention (0.4-0.8)</div>
                  <div className="text-gray-400">Supporting context and background information</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-500 rounded-full mt-2" />
                <div>
                  <div className="font-medium text-gray-400">Low Attention (&lt; 0.4)</div>
                  <div className="text-gray-400">Filtered out as irrelevant to current query</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Explanation */}
      <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-400" />
          Attention Mechanisms Algorithm
        </h4>
        <div className="text-sm text-gray-300 space-y-2">
          <p><strong>Core Principle:</strong> Dynamically focus computational resources on the most relevant information by calculating multi-dimensional attention scores that combine semantic similarity, temporal relevance, and contextual importance.</p>
          <p><strong>Process:</strong> Query analysis → Memory scanning → Multi-dimensional scoring → Softmax normalization → Selective filtering → Contextual assembly</p>
          <p><strong>Benefits:</strong> Efficient processing, improved relevance, context-aware responses, computational focus optimization.</p>
          <p><strong>Applications:</strong> Information retrieval, context selection, cognitive modeling, transformer architectures, recommendation systems.</p>
        </div>
      </div>
    </div>
  );
};

export default AttentionMechanismsDemo;