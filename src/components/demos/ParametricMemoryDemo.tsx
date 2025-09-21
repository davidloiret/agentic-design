'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Brain, Zap, Database, Search, AlertTriangle, CheckCircle, Cpu } from 'lucide-react';

// Types
type KnowledgeType = 'factual' | 'procedural' | 'linguistic' | 'domain' | 'common-sense';
type LayerType = 'embedding' | 'attention' | 'ffn' | 'output';
type QueryStatus = 'idle' | 'processing' | 'retrieving' | 'complete';

interface ParameterLayer {
  id: LayerType;
  name: string;
  parameters: number;
  activation: number;
  knowledge: KnowledgeType[];
  processing: boolean;
}

interface KnowledgeItem {
  id: string;
  type: KnowledgeType;
  content: string;
  confidence: number;
  source: LayerType;
  timestamp: number;
}

interface Agent {
  id: string;
  name: string;
  specialty: KnowledgeType;
  queries: number;
  latency: number;
  accuracy: number;
  active: boolean;
}

interface Query {
  id: string;
  text: string;
  requiredKnowledge: KnowledgeType[];
  status: QueryStatus;
  response?: string;
  confidence?: number;
  latency?: number;
}

interface MemoryMetrics {
  totalParameters: number;
  activeParameters: number;
  knowledgeDensity: number;
  retrievalSpeed: number;
  accuracy: number;
  hallucinationRisk: number;
}

const ParametricMemoryDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [layers, setLayers] = useState<ParameterLayer[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [queries, setQueries] = useState<Query[]>([]);
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [metrics, setMetrics] = useState<MemoryMetrics | null>(null);
  const [selectedKnowledgeType, setSelectedKnowledgeType] = useState<KnowledgeType | 'all'>('all');
  const [currentQuery, setCurrentQuery] = useState<Query | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sample queries
  const sampleQueries: Omit<Query, 'id' | 'status'>[] = [
    {
      text: "What are the key principles of quantum computing?",
      requiredKnowledge: ['factual', 'domain'],
    },
    {
      text: "How do you implement a binary search algorithm?",
      requiredKnowledge: ['procedural', 'domain'],
    },
    {
      text: "Explain the grammar rules for passive voice",
      requiredKnowledge: ['linguistic', 'procedural'],
    },
    {
      text: "What happens when you mix acids and bases?",
      requiredKnowledge: ['factual', 'common-sense'],
    },
    {
      text: "Describe the process of photosynthesis",
      requiredKnowledge: ['factual', 'procedural', 'domain'],
    },
  ];

  // Initialize demo
  useEffect(() => {
    initializeLayers();
    initializeAgents();
    initializeMetrics();
  }, []);

  const initializeLayers = () => {
    const initialLayers: ParameterLayer[] = [
      {
        id: 'embedding',
        name: 'Embedding Layer',
        parameters: 500000000, // 500M
        activation: 0,
        knowledge: ['factual', 'linguistic'],
        processing: false,
      },
      {
        id: 'attention',
        name: 'Attention Layers',
        parameters: 70000000000, // 70B
        activation: 0,
        knowledge: ['linguistic', 'procedural', 'common-sense'],
        processing: false,
      },
      {
        id: 'ffn',
        name: 'Feed-Forward Networks',
        parameters: 100000000000, // 100B
        activation: 0,
        knowledge: ['factual', 'domain', 'procedural'],
        processing: false,
      },
      {
        id: 'output',
        name: 'Output Layer',
        parameters: 5000000000, // 5B
        activation: 0,
        knowledge: ['linguistic'],
        processing: false,
      },
    ];
    setLayers(initialLayers);
  };

  const initializeAgents = () => {
    const initialAgents: Agent[] = [
      {
        id: 'research-agent',
        name: 'Research Agent',
        specialty: 'factual',
        queries: 0,
        latency: 0,
        accuracy: 95,
        active: false,
      },
      {
        id: 'analysis-agent',
        name: 'Analysis Agent',
        specialty: 'procedural',
        queries: 0,
        latency: 0,
        accuracy: 92,
        active: false,
      },
      {
        id: 'writing-agent',
        name: 'Writing Agent',
        specialty: 'linguistic',
        queries: 0,
        latency: 0,
        accuracy: 94,
        active: false,
      },
      {
        id: 'domain-agent',
        name: 'Domain Expert',
        specialty: 'domain',
        queries: 0,
        latency: 0,
        accuracy: 96,
        active: false,
      },
      {
        id: 'reasoning-agent',
        name: 'Reasoning Agent',
        specialty: 'common-sense',
        queries: 0,
        latency: 0,
        accuracy: 90,
        active: false,
      },
    ];
    setAgents(initialAgents);
  };

  const initializeMetrics = () => {
    setMetrics({
      totalParameters: 175500000000, // 175.5B
      activeParameters: 0,
      knowledgeDensity: 0,
      retrievalSpeed: 0,
      accuracy: 0,
      hallucinationRisk: 15,
    });
  };

  // Process query through parametric memory
  const processQuery = useCallback((query: Query) => {
    setCurrentQuery({ ...query, status: 'processing' });

    // Step 1: Activate embedding layer
    setTimeout(() => {
      setLayers(prev => prev.map(layer =>
        layer.id === 'embedding'
          ? { ...layer, activation: 80 + Math.random() * 20, processing: true }
          : layer
      ));

      // Step 2: Propagate through attention
      setTimeout(() => {
        setLayers(prev => prev.map(layer => {
          if (layer.id === 'attention') {
            return { ...layer, activation: 75 + Math.random() * 20, processing: true };
          }
          if (layer.id === 'embedding') {
            return { ...layer, processing: false };
          }
          return layer;
        }));

        // Step 3: Process in FFN layers (where most knowledge is stored)
        setTimeout(() => {
          setLayers(prev => prev.map(layer => {
            if (layer.id === 'ffn') {
              return { ...layer, activation: 90 + Math.random() * 10, processing: true };
            }
            if (layer.id === 'attention') {
              return { ...layer, processing: false };
            }
            return layer;
          }));

          // Extract knowledge from parameters
          const extractedKnowledge = query.requiredKnowledge.map(type => {
            const confidence = 70 + Math.random() * 30;
            const item: KnowledgeItem = {
              id: `knowledge-${Date.now()}-${type}`,
              type,
              content: generateKnowledgeContent(type, query.text),
              confidence,
              source: 'ffn',
              timestamp: Date.now(),
            };
            return item;
          });

          setKnowledgeItems(prev => [...extractedKnowledge, ...prev].slice(0, 20));

          // Step 4: Generate output
          setTimeout(() => {
            setLayers(prev => prev.map(layer => {
              if (layer.id === 'output') {
                return { ...layer, activation: 85 + Math.random() * 15, processing: true };
              }
              if (layer.id === 'ffn') {
                return { ...layer, processing: false };
              }
              return layer;
            }));

            // Complete query
            setTimeout(() => {
              const avgConfidence = extractedKnowledge.reduce((sum, item) => sum + item.confidence, 0) / extractedKnowledge.length;
              const latency = 30 + Math.random() * 20;

              setCurrentQuery({
                ...query,
                status: 'complete',
                response: generateResponse(query.text),
                confidence: avgConfidence,
                latency,
              });

              setQueries(prev => [...prev, {
                ...query,
                status: 'complete',
                response: generateResponse(query.text),
                confidence: avgConfidence,
                latency,
              }].slice(-10));

              // Update metrics
              setMetrics(prev => {
                if (!prev) return null;
                const activeParams = prev.totalParameters * (avgConfidence / 100) * 0.1;
                return {
                  ...prev,
                  activeParameters: activeParams,
                  knowledgeDensity: extractedKnowledge.length / (activeParams / 1000000000),
                  retrievalSpeed: 1000 / latency,
                  accuracy: avgConfidence,
                  hallucinationRisk: Math.max(5, 100 - avgConfidence),
                };
              });

              // Reset layers
              setLayers(prev => prev.map(layer => ({
                ...layer,
                activation: 0,
                processing: false,
              })));

              // Activate relevant agents
              setAgents(prev => prev.map(agent => {
                const isRelevant = query.requiredKnowledge.includes(agent.specialty);
                if (isRelevant) {
                  return {
                    ...agent,
                    active: true,
                    queries: agent.queries + 1,
                    latency: latency + Math.random() * 10 - 5,
                    accuracy: Math.min(100, agent.accuracy + (Math.random() - 0.5) * 2),
                  };
                }
                return { ...agent, active: false };
              }));

              // Deactivate agents after a delay
              setTimeout(() => {
                setAgents(prev => prev.map(agent => ({ ...agent, active: false })));
              }, 1000 / speed);
            }, 200 / speed);
          }, 300 / speed);
        }, 400 / speed);
      }, 300 / speed);
    }, 200 / speed);
  }, [speed]);

  const generateKnowledgeContent = (type: KnowledgeType, query: string): string => {
    const knowledgeMap: Record<KnowledgeType, string[]> = {
      factual: [
        "Quantum bits (qubits) can exist in superposition",
        "Photosynthesis converts light energy to chemical energy",
        "Binary search has O(log n) time complexity",
        "Acids have pH < 7, bases have pH > 7",
      ],
      procedural: [
        "1. Divide array in half 2. Compare with middle element 3. Recurse on appropriate half",
        "1. Light absorption 2. Electron transport 3. ATP synthesis 4. Carbon fixation",
        "1. Initialize qubits 2. Apply quantum gates 3. Measure results",
      ],
      linguistic: [
        "Passive voice: Subject receives the action (be + past participle)",
        "Active voice: Subject performs the action",
        "Grammar rules: Subject-verb agreement, tense consistency",
      ],
      domain: [
        "Quantum entanglement enables instant correlation",
        "Chlorophyll absorbs red and blue light, reflects green",
        "Divide-and-conquer algorithm paradigm",
        "Neutralization reaction: H+ + OH- → H2O",
      ],
      'common-sense': [
        "Mixing acids and bases produces heat and salt",
        "Plants need sunlight to grow",
        "Searching sorted data is faster than unsorted",
        "Quantum effects only matter at very small scales",
      ],
    };

    const options = knowledgeMap[type];
    return options[Math.floor(Math.random() * options.length)];
  };

  const generateResponse = (query: string): string => {
    const responses: Record<string, string> = {
      "What are the key principles of quantum computing?":
        "Quantum computing leverages superposition, entanglement, and interference. Qubits can exist in multiple states simultaneously, enabling parallel computation.",
      "How do you implement a binary search algorithm?":
        "Binary search: 1) Compare target with middle element 2) If equal, return index 3) If less, search left half 4) If greater, search right half. Requires sorted array.",
      "Explain the grammar rules for passive voice":
        "Passive voice is formed with 'be' + past participle. The subject receives the action rather than performing it. Example: 'The ball was thrown' vs active 'John threw the ball'.",
      "What happens when you mix acids and bases?":
        "Acids and bases undergo neutralization, producing salt and water. The reaction is exothermic (releases heat). H+ ions from acid combine with OH- ions from base.",
      "Describe the process of photosynthesis":
        "Photosynthesis: Light reactions in thylakoids produce ATP/NADPH. Calvin cycle in stroma fixes CO2 into glucose. Overall: 6CO2 + 6H2O + light → C6H12O6 + 6O2.",
    };

    return responses[query] || "Knowledge retrieved from parametric memory. Processing complete.";
  };

  // Simulation runner
  useEffect(() => {
    if (isRunning && !currentQuery) {
      intervalRef.current = setInterval(() => {
        const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
        const query: Query = {
          ...randomQuery,
          id: `query-${Date.now()}`,
          status: 'idle',
        };
        processQuery(query);
      }, 5000 / speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, currentQuery, speed, processQuery]);

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentQuery(null);
    setQueries([]);
    setKnowledgeItems([]);
    initializeLayers();
    initializeAgents();
    initializeMetrics();
  };

  const formatParameters = (params: number): string => {
    if (params >= 1000000000) {
      return `${(params / 1000000000).toFixed(1)}B`;
    }
    if (params >= 1000000) {
      return `${(params / 1000000).toFixed(1)}M`;
    }
    return params.toString();
  };

  const getKnowledgeTypeColor = (type: KnowledgeType): string => {
    const colors: Record<KnowledgeType, string> = {
      factual: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      procedural: 'text-green-400 bg-green-400/10 border-green-400/20',
      linguistic: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
      domain: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
      'common-sense': 'text-pink-400 bg-pink-400/10 border-pink-400/20',
    };
    return colors[type];
  };

  const getKnowledgeTypeIcon = (type: KnowledgeType) => {
    const icons: Record<KnowledgeType, string> = {
      factual: '📚',
      procedural: '⚙️',
      linguistic: '🗣️',
      domain: '🎓',
      'common-sense': '💡',
    };
    return icons[type];
  };

  return (
    <div className="w-full space-y-6">
      {/* Control Panel */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayPause}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                isRunning
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
          <div className="flex items-center gap-4">
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
              <span className="text-sm text-gray-300 w-12">{speed}x</span>
            </div>
          </div>
        </div>

        {/* Knowledge Type Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedKnowledgeType('all')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              selectedKnowledgeType === 'all'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All Knowledge
          </button>
          {(['factual', 'procedural', 'linguistic', 'domain', 'common-sense'] as KnowledgeType[]).map(type => (
            <button
              key={type}
              onClick={() => setSelectedKnowledgeType(type)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                selectedKnowledgeType === type
                  ? getKnowledgeTypeColor(type)
                  : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {getKnowledgeTypeIcon(type)}
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Current Query Display */}
      {currentQuery && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-400" />
              Current Query
            </h3>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              currentQuery.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
              currentQuery.status === 'retrieving' ? 'bg-blue-500/20 text-blue-400' :
              currentQuery.status === 'complete' ? 'bg-green-500/20 text-green-400' :
              'bg-gray-600 text-gray-300'
            }`}>
              {currentQuery.status.toUpperCase()}
            </span>
          </div>
          <div className="text-gray-300 mb-2">{currentQuery.text}</div>
          {currentQuery.response && (
            <div className="mt-3 p-3 bg-gray-700/30 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Response:</div>
              <div className="text-gray-200">{currentQuery.response}</div>
              <div className="flex gap-4 mt-2 text-sm">
                {currentQuery.confidence && (
                  <span className="text-gray-400">
                    Confidence: <span className="text-green-400">{currentQuery.confidence.toFixed(1)}%</span>
                  </span>
                )}
                {currentQuery.latency && (
                  <span className="text-gray-400">
                    Latency: <span className="text-blue-400">{currentQuery.latency.toFixed(1)}ms</span>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parameter Layers */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              Model Parameter Layers
            </h3>
            <div className="space-y-3">
              {layers.map(layer => (
                <div
                  key={layer.id}
                  className={`p-4 rounded-lg border transition-all ${
                    layer.processing
                      ? 'border-purple-400 bg-purple-400/10'
                      : 'border-gray-600 bg-gray-700/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium text-gray-200">{layer.name}</div>
                      <div className="text-sm text-gray-400">
                        {formatParameters(layer.parameters)} parameters
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Activation</div>
                      <div className={`text-lg font-bold ${
                        layer.activation > 0 ? 'text-purple-400' : 'text-gray-500'
                      }`}>
                        {layer.activation.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {layer.knowledge.map(type => (
                      <span
                        key={type}
                        className={`px-2 py-1 rounded text-xs ${getKnowledgeTypeColor(type)}`}
                      >
                        {getKnowledgeTypeIcon(type)} {type}
                      </span>
                    ))}
                  </div>
                  {layer.activation > 0 && (
                    <div className="mt-2 h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-400 transition-all duration-500"
                        style={{ width: `${layer.activation}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Multi-Agent Access */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-orange-400" />
              Multi-Agent Access
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {agents.map(agent => (
                <div
                  key={agent.id}
                  className={`p-3 rounded-lg border transition-all ${
                    agent.active
                      ? 'border-orange-400 bg-orange-400/10'
                      : 'border-gray-600 bg-gray-700/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm text-gray-200">{agent.name}</span>
                    {agent.active && (
                      <Zap className="w-4 h-4 text-orange-400 animate-pulse" />
                    )}
                  </div>
                  <div className="text-xs space-y-1 text-gray-400">
                    <div className={`${getKnowledgeTypeColor(agent.specialty)} inline-block px-2 py-0.5 rounded`}>
                      {getKnowledgeTypeIcon(agent.specialty)} {agent.specialty}
                    </div>
                    <div>Queries: {agent.queries}</div>
                    {agent.latency > 0 && (
                      <div>Latency: {agent.latency.toFixed(1)}ms</div>
                    )}
                    <div>Accuracy: {agent.accuracy.toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics and Knowledge */}
        <div className="space-y-4">
          {/* System Metrics */}
          {metrics && (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">System Metrics</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Total Parameters</span>
                    <span className="text-gray-200">{formatParameters(metrics.totalParameters)}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Active Parameters</span>
                    <span className="text-purple-400">{formatParameters(metrics.activeParameters)}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Knowledge Density</span>
                    <span className="text-blue-400">{metrics.knowledgeDensity.toFixed(2)} items/B</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Retrieval Speed</span>
                    <span className="text-green-400">{metrics.retrievalSpeed.toFixed(1)} queries/s</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Accuracy</span>
                    <span className="text-green-400">{metrics.accuracy.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-400 transition-all"
                      style={{ width: `${metrics.accuracy}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Hallucination Risk</span>
                    <span className={`${metrics.hallucinationRisk > 20 ? 'text-red-400' : 'text-yellow-400'}`}>
                      {metrics.hallucinationRisk.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${metrics.hallucinationRisk > 20 ? 'bg-red-400' : 'bg-yellow-400'} transition-all`}
                      style={{ width: `${metrics.hallucinationRisk}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Retrieved Knowledge */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" />
              Retrieved Knowledge
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {knowledgeItems
                .filter(item => selectedKnowledgeType === 'all' || item.type === selectedKnowledgeType)
                .slice(0, 8)
                .map(item => (
                  <div
                    key={item.id}
                    className={`p-2 rounded border text-xs ${getKnowledgeTypeColor(item.type)}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium flex items-center gap-1">
                        {getKnowledgeTypeIcon(item.type)}
                        {item.type}
                      </span>
                      <span className="text-gray-500">
                        {item.confidence.toFixed(0)}%
                      </span>
                    </div>
                    <div className="text-gray-300 line-clamp-2">{item.content}</div>
                    <div className="text-gray-500 mt-1">Source: {item.source}</div>
                  </div>
                ))}
              {knowledgeItems.length === 0 && (
                <div className="text-gray-500 text-center py-4">No knowledge retrieved yet</div>
              )}
            </div>
          </div>

          {/* Warnings */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              System Status
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <span className="text-gray-300">Fast context-free retrieval active</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <span className="text-gray-300">Multi-agent parallel access enabled</span>
              </div>
              {metrics && metrics.hallucinationRisk > 20 && (
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                  <span className="text-gray-300">Elevated hallucination risk detected</span>
                </div>
              )}
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                <span className="text-gray-300">Consider hybrid approach with RAG</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Query History */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-200 mb-4">Query History</h3>
        <div className="space-y-2">
          {queries.slice(-5).reverse().map(query => (
            <div key={query.id} className="flex items-center justify-between p-2 bg-gray-700/30 rounded">
              <div className="flex-1">
                <div className="text-sm text-gray-300">{query.text}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {query.requiredKnowledge.map(k => getKnowledgeTypeIcon(k)).join(' ')}
                </div>
              </div>
              <div className="text-right text-xs">
                {query.confidence && (
                  <div className="text-green-400">{query.confidence.toFixed(1)}% confidence</div>
                )}
                {query.latency && (
                  <div className="text-blue-400">{query.latency.toFixed(1)}ms</div>
                )}
              </div>
            </div>
          ))}
          {queries.length === 0 && (
            <div className="text-gray-500 text-center py-4">No queries processed yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParametricMemoryDemo;