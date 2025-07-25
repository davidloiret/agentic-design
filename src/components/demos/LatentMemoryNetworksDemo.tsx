'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Brain, Database, Network, Zap, ArrowRight, Clock, ChevronRight, Share2, Search, Lightbulb } from 'lucide-react';

interface MemoryPattern {
  id: string;
  concept: string;
  domain: string;
  encoding: number[];
  clusterId: string;
  strength: number;
  connections: string[];
}

interface Agent {
  id: string;
  name: string;
  specialty: string;
  status: 'idle' | 'encoding' | 'retrieving' | 'processing';
  currentPattern?: MemoryPattern;
  icon: React.ComponentType<any>;
}

interface MemoryCluster {
  id: string;
  name: string;
  domain: string;
  patterns: MemoryPattern[];
  centroid: number[];
  density: number;
}

interface LatentMemoryNetworksDemoProps {
  className?: string;
}

const generateRandomVector = (dim: number): number[] => {
  return Array.from({ length: dim }, () => (Math.random() - 0.5) * 2);
};

const calculateSimilarity = (vec1: number[], vec2: number[]): number => {
  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const norm1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
  const norm2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
  return Math.max(0, dotProduct / (norm1 * norm2));
};

const initialPatterns: MemoryPattern[] = [
  {
    id: 'p1',
    concept: 'Backpropagation',
    domain: 'Machine Learning',
    encoding: [0.8, -0.2, 0.6, 0.3, -0.4],
    clusterId: 'learning-methods',
    strength: 0.9,
    connections: ['p2', 'p3']
  },
  {
    id: 'p2',
    concept: 'Gradient Descent',
    domain: 'Optimization',
    encoding: [0.7, -0.1, 0.5, 0.4, -0.3],
    clusterId: 'learning-methods',
    strength: 0.85,
    connections: ['p1', 'p4']
  },
  {
    id: 'p3',
    concept: 'Attention Mechanism',
    domain: 'Neural Networks',
    encoding: [-0.2, 0.8, 0.4, -0.6, 0.7],
    clusterId: 'attention-patterns',
    strength: 0.92,
    connections: ['p5', 'p6']
  },
  {
    id: 'p4',
    concept: 'Adam Optimizer',
    domain: 'Optimization',
    encoding: [0.6, 0.1, 0.3, 0.5, -0.2],
    clusterId: 'learning-methods',
    strength: 0.78,
    connections: ['p2', 'p7']
  },
  {
    id: 'p5',
    concept: 'Transformer Architecture',
    domain: 'Neural Networks',
    encoding: [-0.1, 0.9, 0.3, -0.5, 0.8],
    clusterId: 'attention-patterns',
    strength: 0.95,
    connections: ['p3', 'p6']
  },
  {
    id: 'p6',
    concept: 'Self-Attention',
    domain: 'Neural Networks',
    encoding: [-0.3, 0.7, 0.5, -0.4, 0.6],
    clusterId: 'attention-patterns',
    strength: 0.88,
    connections: ['p3', 'p5']
  }
];

const initialClusters: MemoryCluster[] = [
  {
    id: 'learning-methods',
    name: 'Learning Methods',
    domain: 'Optimization',
    patterns: [],
    centroid: [0.7, -0.1, 0.5, 0.4, -0.3],
    density: 0.85
  },
  {
    id: 'attention-patterns',
    name: 'Attention Patterns',
    domain: 'Neural Networks',
    patterns: [],
    centroid: [-0.2, 0.8, 0.4, -0.5, 0.7],
    density: 0.92
  },
  {
    id: 'game-theory',
    name: 'Game Theory',
    domain: 'Strategic Thinking',
    patterns: [],
    centroid: [0.2, -0.6, -0.8, 0.4, 0.1],
    density: 0.0
  }
];

const agents: Agent[] = [
  {
    id: 'research-agent',
    name: 'Research Agent',
    specialty: 'Learning algorithms and optimization methods',
    status: 'idle',
    icon: Brain
  },
  {
    id: 'analysis-agent', 
    name: 'Analysis Agent',
    specialty: 'Pattern recognition and neural architectures',
    status: 'idle',
    icon: Zap
  },
  {
    id: 'synthesis-agent',
    name: 'Synthesis Agent',
    specialty: 'Knowledge fusion and cross-domain transfer',
    status: 'idle',
    icon: Share2
  },
  {
    id: 'query-agent',
    name: 'Query Agent',
    specialty: 'Information retrieval and similarity search',
    status: 'idle',
    icon: Search
  }
];

export const LatentMemoryNetworksDemo: React.FC<LatentMemoryNetworksDemoProps> = ({ className = '' }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [agentStates, setAgentStates] = useState<Agent[]>(agents);
  const [memoryPatterns, setMemoryPatterns] = useState<MemoryPattern[]>(initialPatterns);
  const [memoryClusters, setMemoryClusters] = useState<MemoryCluster[]>(initialClusters);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [retrievalResults, setRetrievalResults] = useState<MemoryPattern[]>([]);
  const [crossDomainInsights, setCrossDomainInsights] = useState<string[]>([]);
  const [systemMetrics, setSystemMetrics] = useState({
    totalPatterns: initialPatterns.length,
    avgSimilarity: 0.82,
    memoryEfficiency: 91,
    crossDomainConnections: 12,
    processingTime: 0
  });

  const steps = [
    'Pattern Encoding',
    'Memory Formation', 
    'Cluster Organization',
    'Cross-Agent Sharing',
    'Semantic Retrieval',
    'Cross-Domain Transfer',
    'Knowledge Synthesis'
  ];

  const resetDemo = useCallback(() => {
    setIsRunning(false);
    setCurrentStep(0);
    setAgentStates(agents);
    setMemoryPatterns(initialPatterns);
    setMemoryClusters(initialClusters);
    setCurrentQuery('');
    setRetrievalResults([]);
    setCrossDomainInsights([]);
    setSystemMetrics({
      totalPatterns: initialPatterns.length,
      avgSimilarity: 0.82,
      memoryEfficiency: 91,
      crossDomainConnections: 12,
      processingTime: 0
    });
  }, []);

  const updateAgentStatus = (agentId: string, status: Agent['status'], pattern?: MemoryPattern) => {
    setAgentStates(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status, currentPattern: pattern }
        : agent
    ));
  };

  const addNewPattern = (concept: string, domain: string, agentId: string) => {
    const encoding = generateRandomVector(5);
    const newPattern: MemoryPattern = {
      id: `p${Date.now()}`,
      concept,
      domain,
      encoding,
      clusterId: domain.toLowerCase().replace(' ', '-'),
      strength: Math.random() * 0.3 + 0.7,
      connections: []
    };

    setMemoryPatterns(prev => [...prev, newPattern]);
    updateAgentStatus(agentId, 'encoding', newPattern);
    
    // Update metrics
    setSystemMetrics(prev => ({
      ...prev,
      totalPatterns: prev.totalPatterns + 1,
      processingTime: prev.processingTime + Math.random() * 50 + 25
    }));

    return newPattern;
  };

  const simulateQuery = (query: string) => {
    setCurrentQuery(query);
    updateAgentStatus('query-agent', 'retrieving');

    // Simulate retrieval based on query
    const queryVector = generateRandomVector(5);
    const similarities = memoryPatterns.map(pattern => ({
      pattern,
      similarity: calculateSimilarity(queryVector, pattern.encoding)
    }));

    const topResults = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3)
      .map(item => item.pattern);

    setRetrievalResults(topResults);

    // Generate cross-domain insights
    const insights = [
      "Attention mechanisms can be applied to optimization problems",
      "Game theory principles enhance adversarial training",
      "Transformer patterns improve gradient flow in deep networks"
    ];
    setCrossDomainInsights(insights);

    // Update metrics
    setSystemMetrics(prev => ({
      ...prev,
      avgSimilarity: similarities[0]?.similarity || 0.82,
      crossDomainConnections: prev.crossDomainConnections + 3
    }));
  };

  const runSimulation = useCallback(async () => {
    if (!isRunning) return;

    switch (currentStep) {
      case 0: // Pattern Encoding
        updateAgentStatus('research-agent', 'encoding');
        setTimeout(() => {
          addNewPattern('Reinforcement Learning', 'Machine Learning', 'research-agent');
        }, 1000);
        break;

      case 1: // Memory Formation
        updateAgentStatus('research-agent', 'processing');
        setTimeout(() => {
          updateAgentStatus('research-agent', 'idle');
        }, 1500);
        break;

      case 2: // Cluster Organization
        setMemoryClusters(prev => prev.map(cluster => ({
          ...cluster,
          density: cluster.density + Math.random() * 0.05,
          patterns: memoryPatterns.filter(p => p.clusterId === cluster.id)
        })));
        break;

      case 3: // Cross-Agent Sharing
        updateAgentStatus('analysis-agent', 'encoding');
        setTimeout(() => {
          addNewPattern('Convolutional Layers', 'Neural Networks', 'analysis-agent');
        }, 1000);
        break;

      case 4: // Semantic Retrieval
        simulateQuery("How to improve sequence modeling performance?");
        break;

      case 5: // Cross-Domain Transfer
        updateAgentStatus('synthesis-agent', 'processing');
        setTimeout(() => {
          addNewPattern('Nash Equilibrium', 'Game Theory', 'synthesis-agent');
        }, 1000);
        break;

      case 6: // Knowledge Synthesis
        updateAgentStatus('query-agent', 'processing');
        setTimeout(() => {
          setCrossDomainInsights(prev => [
            ...prev,
            "Novel insight: Combining attention with game theory for multi-agent coordination"
          ]);
          setAgentStates(prev => prev.map(agent => ({ ...agent, status: 'idle' as const })));
        }, 1500);
        break;
    }

    // Auto-progress to next step
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsRunning(false);
      }
    }, 2500);
  }, [isRunning, currentStep, memoryPatterns]);

  useEffect(() => {
    if (isRunning) {
      runSimulation();
    }
  }, [isRunning, currentStep, runSimulation]);

  const startDemo = () => {
    setIsRunning(true);
    setCurrentStep(0);
  };

  const pauseDemo = () => {
    setIsRunning(false);
  };

  return (
    <div className={`bg-gray-900 text-white p-6 rounded-lg ${className}`}>
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Latent Memory Networks Simulation</h2>
          <p className="text-gray-400">Multi-agent knowledge sharing through latent space representations</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={isRunning ? pauseDemo : startDemo}
            disabled={!isRunning && currentStep >= steps.length - 1}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              isRunning
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-purple-600 hover:bg-purple-700'
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

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">Progress</span>
          <span className="text-sm text-gray-400">{currentStep + 1} / {steps.length}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-purple-400">
          {steps[currentStep]}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Agents Panel */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-400" />
            AI Agents
          </h3>
          <div className="space-y-3">
            {agentStates.map((agent) => (
              <div
                key={agent.id}
                className={`p-3 rounded-lg border transition-all ${
                  agent.status === 'idle'
                    ? 'border-gray-600 bg-gray-700/30'
                    : agent.status === 'encoding'
                    ? 'border-blue-500 bg-blue-500/10'
                    : agent.status === 'retrieving'
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-green-500 bg-green-500/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <agent.icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{agent.name}</div>
                    <div className="text-xs text-gray-400">{agent.specialty}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    agent.status === 'idle'
                      ? 'bg-gray-600 text-gray-300'
                      : agent.status === 'encoding'
                      ? 'bg-blue-600 text-blue-100'
                      : agent.status === 'retrieving'
                      ? 'bg-purple-600 text-purple-100'
                      : 'bg-green-600 text-green-100'
                  }`}>
                    {agent.status.toUpperCase()}
                  </span>
                  {agent.status !== 'idle' && (
                    <Clock className="w-4 h-4 text-gray-400 animate-pulse" />
                  )}
                </div>
                {agent.currentPattern && (
                  <div className="mt-2 text-xs text-gray-300">
                    Working on: {agent.currentPattern.concept}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Memory Clusters */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-400" />
            Memory Clusters
          </h3>
          <div className="space-y-3">
            {memoryClusters.map((cluster) => (
              <div key={cluster.id} className="p-3 rounded-lg bg-gray-700/30 border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{cluster.name}</span>
                  <span className="text-xs text-purple-400">
                    {(cluster.density * 100).toFixed(0)}% density
                  </span>
                </div>
                <div className="text-xs text-gray-400 mb-2">{cluster.domain}</div>
                <div className="space-y-1">
                  {memoryPatterns
                    .filter(p => p.clusterId === cluster.id)
                    .slice(0, 3)
                    .map((pattern) => (
                      <div key={pattern.id} className="text-xs p-2 bg-gray-600/30 rounded flex items-center justify-between">
                        <span>{pattern.concept}</span>
                        <span className="text-green-400">{(pattern.strength * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Query & Retrieval */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-green-400" />
            Query & Retrieval
          </h3>
          
          {currentQuery && (
            <div className="mb-4 p-3 bg-gray-700/30 rounded-lg">
              <div className="text-sm font-medium mb-1">Active Query:</div>
              <div className="text-xs text-gray-300">"{currentQuery}"</div>
            </div>
          )}

          {retrievalResults.length > 0 && (
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Top Results:</div>
              <div className="space-y-2">
                {retrievalResults.map((pattern, index) => (
                  <div key={pattern.id} className="text-xs p-2 bg-green-500/10 border border-green-500/30 rounded">
                    <div className="flex items-center justify-between">
                      <span>{pattern.concept}</span>
                      <span className="text-green-400">#{index + 1}</span>
                    </div>
                    <div className="text-gray-400">{pattern.domain}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {crossDomainInsights.length > 0 && (
            <div>
              <div className="text-sm font-medium mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                Cross-Domain Insights
              </div>
              <div className="space-y-2">
                {crossDomainInsights.map((insight, index) => (
                  <div key={index} className="text-xs p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-yellow-200">
                    {insight}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* System Metrics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-400">{systemMetrics.totalPatterns}</div>
          <div className="text-xs text-gray-400">Total Patterns</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-400">{(systemMetrics.avgSimilarity * 100).toFixed(0)}%</div>
          <div className="text-xs text-gray-400">Avg Similarity</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-purple-400">{systemMetrics.memoryEfficiency}%</div>
          <div className="text-xs text-gray-400">Memory Efficiency</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-yellow-400">{systemMetrics.crossDomainConnections}</div>
          <div className="text-xs text-gray-400">Cross-Domain Links</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-red-400">{systemMetrics.processingTime.toFixed(0)}ms</div>
          <div className="text-xs text-gray-400">Processing Time</div>
        </div>
      </div>

      {/* Step Information */}
      <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Current Step: {steps[currentStep]}</h4>
        <div className="text-sm text-gray-300">
          {currentStep === 0 && "AI agents encode new knowledge into dense vector representations in continuous latent space."}
          {currentStep === 1 && "Encoded patterns are stored in the shared memory network with automatic similarity indexing."}
          {currentStep === 2 && "Similar patterns automatically cluster together based on semantic relationships in latent space."}
          {currentStep === 3 && "Different specialist agents contribute their domain knowledge to the shared memory pool."}
          {currentStep === 4 && "Query agents retrieve relevant patterns using semantic similarity rather than keyword matching."}
          {currentStep === 5 && "System discovers connections between different domains through latent space proximity."}
          {currentStep === 6 && "Multiple insights are synthesized to generate novel cross-domain knowledge and innovations."}
        </div>
      </div>
    </div>
  );
};

export default LatentMemoryNetworksDemo;