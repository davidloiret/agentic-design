'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Brain, Search, Lightbulb, Network, ArrowRight, Clock, ChevronRight, Zap, Sparkles, Link, Eye } from 'lucide-react';

interface LatentConcept {
  id: string;
  name: string;
  domain: string;
  abstractPattern: string;
  similarity: number;
  discovered: boolean;
  connections: string[];
}

interface Agent {
  id: string;
  name: string;
  specialty: string;
  status: 'idle' | 'exploring' | 'discovering' | 'synthesizing';
  currentPattern?: string;
  discoveredConcepts: string[];
  icon: React.ComponentType<any>;
}

interface Challenge {
  id: string;
  query: string;
  type: string;
  expectedKeywords: string[];
  abstractPatterns: string[];
  latentSolution?: string;
}

interface LatentKnowledgeRetrievalDemoProps {
  className?: string;
}

const sampleChallenges: Challenge[] = [
  {
    id: 'c1',
    query: "How can we solve the urban heat island effect?",
    type: "Environmental Challenge",
    expectedKeywords: ['green roofs', 'albedo', 'HVAC', 'urban planning'],
    abstractPatterns: ['thermal regulation', 'distributed cooling', 'adaptive systems'],
    latentSolution: "Mycelial Urban Cooling Network"
  },
  {
    id: 'c2',
    query: "Design a more efficient traffic management system",
    type: "Systems Optimization",
    expectedKeywords: ['traffic lights', 'sensors', 'AI routing', 'congestion'],
    abstractPatterns: ['swarm intelligence', 'flow dynamics', 'emergent coordination'],
    latentSolution: "Ant Colony Traffic Orchestration"
  },
  {
    id: 'c3',
    query: "Create a sustainable food production system",
    type: "Sustainability Challenge",
    expectedKeywords: ['vertical farming', 'hydroponics', 'LED grow lights', 'automation'],
    abstractPatterns: ['ecosystem symbiosis', 'resource cycling', 'regenerative systems'],
    latentSolution: "Mycorrhizal Food Web Networks"
  }
];

const latentConcepts: LatentConcept[] = [
  // Biomimetic Concepts
  {
    id: 'elephant-cooling',
    name: 'Elephant Ear Cooling',
    domain: 'Biomimetics',
    abstractPattern: 'thermal regulation through vascular networks',
    similarity: 0.0,
    discovered: false,
    connections: ['termite-ventilation', 'forest-canopy']
  },
  {
    id: 'termite-ventilation',
    name: 'Termite Mound Ventilation',
    domain: 'Biomimetics',
    abstractPattern: 'passive airflow through structured channels',
    similarity: 0.0,
    discovered: false,
    connections: ['elephant-cooling', 'ant-pathfinding']
  },
  {
    id: 'mycelial-networks',
    name: 'Mycelial Networks',
    domain: 'Biology',
    abstractPattern: 'distributed resource sharing and communication',
    similarity: 0.0,
    discovered: false,
    connections: ['swarm-intelligence', 'forest-canopy']
  },
  {
    id: 'ant-pathfinding',
    name: 'Ant Colony Pathfinding',
    domain: 'Swarm Intelligence',
    abstractPattern: 'emergent optimization through pheromone trails',
    similarity: 0.0,
    discovered: false,
    connections: ['termite-ventilation', 'swarm-intelligence']
  },

  // System Patterns
  {
    id: 'ocean-thermal-layers',
    name: 'Ocean Thermal Layers',
    domain: 'Fluid Dynamics',
    abstractPattern: 'stratified thermal management in large systems',
    similarity: 0.0,
    discovered: false,
    connections: ['forest-canopy', 'phase-change']
  },
  {
    id: 'forest-canopy',
    name: 'Forest Canopy Dynamics',
    domain: 'Ecology',
    abstractPattern: 'multi-layer environmental regulation',
    similarity: 0.0,
    discovered: false,
    connections: ['ocean-thermal-layers', 'mycelial-networks']
  },
  {
    id: 'immune-adaptation',
    name: 'Immune System Adaptation',
    domain: 'Biology',
    abstractPattern: 'adaptive response to environmental stress',
    similarity: 0.0,
    discovered: false,
    connections: ['swarm-intelligence', 'phase-change']
  },
  {
    id: 'swarm-intelligence',
    name: 'Swarm Intelligence',
    domain: 'Collective Behavior',
    abstractPattern: 'emergent intelligence from simple interactions',
    similarity: 0.0,
    discovered: false,
    connections: ['immune-adaptation', 'mycelial-networks']
  },

  // Physical Phenomena
  {
    id: 'phase-change',
    name: 'Phase Change Materials',
    domain: 'Materials Science',
    abstractPattern: 'energy storage and release through state transitions',
    similarity: 0.0,
    discovered: false,
    connections: ['ocean-thermal-layers', 'immune-adaptation']
  }
];

const initialAgents: Agent[] = [
  {
    id: 'research-agent',
    name: 'Research Agent',
    specialty: 'Biomimetic patterns and natural systems',
    status: 'idle',
    discoveredConcepts: [],
    icon: Brain
  },
  {
    id: 'analysis-agent',
    name: 'Analysis Agent',
    specialty: 'System dynamics and network patterns',
    status: 'idle',
    discoveredConcepts: [],
    icon: Zap
  },
  {
    id: 'innovation-agent',
    name: 'Innovation Agent',
    specialty: 'Phase dynamics and material systems',
    status: 'idle',
    discoveredConcepts: [],
    icon: Lightbulb
  },
  {
    id: 'synthesis-agent',
    name: 'Synthesis Agent',
    specialty: 'Cross-domain pattern integration',
    status: 'idle',
    discoveredConcepts: [],
    icon: Link
  }
];

export const LatentKnowledgeRetrievalDemo: React.FC<LatentKnowledgeRetrievalDemoProps> = ({ className = '' }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [concepts, setConcepts] = useState<LatentConcept[]>(latentConcepts);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [discoveredPatterns, setDiscoveredPatterns] = useState<string[]>([]);
  const [emergentInsights, setEmergentInsights] = useState<string[]>([]);
  const [synthesizedSolution, setSynthesizedSolution] = useState<string>('');
  const [systemMetrics, setSystemMetrics] = useState({
    noveltyScore: 0,
    crossDomainConnections: 0,
    abstractionLevel: 0,
    emergentInsights: 0,
    explorationDepth: 0,
    synthesisComplexity: 0
  });

  const steps = [
    'Abstract Pattern Recognition',
    'Multi-Agent Latent Exploration',
    'Cross-Domain Concept Discovery',
    'Implicit Reasoning Navigation',
    'Pattern Synthesis Integration',
    'Emergent Insight Generation'
  ];

  const resetDemo = useCallback(() => {
    setIsRunning(false);
    setCurrentStep(0);
    setAgents(initialAgents);
    setConcepts(latentConcepts);
    setCurrentChallenge(null);
    setChallengeIndex(0);
    setDiscoveredPatterns([]);
    setEmergentInsights([]);
    setSynthesizedSolution('');
    setSystemMetrics({
      noveltyScore: 0,
      crossDomainConnections: 0,
      abstractionLevel: 0,
      emergentInsights: 0,
      explorationDepth: 0,
      synthesisComplexity: 0
    });
  }, []);

  const calculateSimilarity = (pattern: string, conceptPattern: string): number => {
    // Simulate semantic similarity calculation
    const keywords1 = pattern.toLowerCase().split(' ');
    const keywords2 = conceptPattern.toLowerCase().split(' ');
    const overlap = keywords1.filter(word => keywords2.some(w => w.includes(word) || word.includes(w)));
    return Math.min(0.95, overlap.length / Math.max(keywords1.length, keywords2.length) + Math.random() * 0.3);
  };

  const discoverConceptsForAgent = (agent: Agent, abstractPattern: string) => {
    const relevantConcepts = concepts.filter(concept => {
      if (agent.id === 'research-agent') return concept.domain === 'Biomimetics' || concept.domain === 'Biology';
      if (agent.id === 'analysis-agent') return concept.domain === 'Swarm Intelligence' || concept.domain === 'Collective Behavior';
      if (agent.id === 'innovation-agent') return concept.domain === 'Materials Science' || concept.domain === 'Fluid Dynamics';
      if (agent.id === 'synthesis-agent') return concept.domain === 'Ecology' || concept.abstractPattern.includes('adaptive');
      return false;
    });

    return relevantConcepts.slice(0, 2).map(concept => {
      const similarity = calculateSimilarity(abstractPattern, concept.abstractPattern);
      return { ...concept, similarity, discovered: true };
    });
  };

  const updateAgentStatus = (agentId: string, status: Agent['status'], pattern?: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status, currentPattern: pattern }
        : agent
    ));
  };

  const runSimulation = useCallback(async () => {
    if (!isRunning) return;

    const challenge = sampleChallenges[challengeIndex];
    setCurrentChallenge(challenge);

    // Step 0: Abstract Pattern Recognition
    setCurrentStep(0);
    setDiscoveredPatterns([]);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDiscoveredPatterns(challenge.abstractPatterns);

    // Step 1: Multi-Agent Latent Exploration
    setCurrentStep(1);
    agents.forEach(agent => {
      updateAgentStatus(agent.id, 'exploring', challenge.abstractPatterns[0]);
    });
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 2: Cross-Domain Concept Discovery
    setCurrentStep(2);
    const discoveredConcepts: LatentConcept[] = [];
    
    for (const agent of agents) {
      updateAgentStatus(agent.id, 'discovering');
      const agentConcepts = discoverConceptsForAgent(agent, challenge.abstractPatterns[0]);
      discoveredConcepts.push(...agentConcepts);
      
      setAgents(prev => prev.map(a => 
        a.id === agent.id 
          ? { ...a, discoveredConcepts: agentConcepts.map(c => c.id) }
          : a
      ));
    }
    
    setConcepts(prev => prev.map(concept => {
      const discovered = discoveredConcepts.find(dc => dc.id === concept.id);
      return discovered ? { ...concept, ...discovered } : concept;
    }));

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 3: Implicit Reasoning Navigation
    setCurrentStep(3);
    const insights = [
      "Connection found: Thermal regulation patterns similar across biological and urban systems",
      "Emergent insight: Distributed networks show self-organizing properties",
      "Cross-domain link: Adaptive systems exhibit similar feedback mechanisms"
    ];
    setEmergentInsights(insights);
    
    setSystemMetrics(prev => ({
      ...prev,
      noveltyScore: 0.7,
      crossDomainConnections: discoveredConcepts.length * 2,
      abstractionLevel: 3,
      emergentInsights: insights.length
    }));

    await new Promise(resolve => setTimeout(resolve, 1800));

    // Step 4: Pattern Synthesis Integration
    setCurrentStep(4);
    agents.forEach(agent => updateAgentStatus(agent.id, 'synthesizing'));
    
    setSystemMetrics(prev => ({
      ...prev,
      explorationDepth: 5,
      synthesisComplexity: 8
    }));

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 5: Emergent Insight Generation
    setCurrentStep(5);
    setSynthesizedSolution(challenge.latentSolution || "Novel cross-domain solution");
    
    const finalInsights = [
      ...insights,
      "Breakthrough: Novel solution combines multiple biological principles",
      "Innovation: Self-regulating infrastructure using adaptive feedback"
    ];
    setEmergentInsights(finalInsights);
    
    setSystemMetrics(prev => ({
      ...prev,
      noveltyScore: 0.92,
      emergentInsights: finalInsights.length
    }));

    // Reset agents
    agents.forEach(agent => updateAgentStatus(agent.id, 'idle'));

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Move to next challenge or stop
    if (challengeIndex < sampleChallenges.length - 1) {
      setChallengeIndex(prev => prev + 1);
      setCurrentStep(0);
    } else {
      setIsRunning(false);
    }
  }, [isRunning, challengeIndex, agents]);

  useEffect(() => {
    if (isRunning) {
      runSimulation();
    }
  }, [isRunning, runSimulation]);

  const startDemo = () => {
    setIsRunning(true);
    setChallengeIndex(0);
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
          <h2 className="text-2xl font-bold text-white mb-2">Latent Knowledge Retrieval Simulation</h2>
          <p className="text-gray-400">Abstract pattern-based discovery beyond explicit keyword matching</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={isRunning ? pauseDemo : startDemo}
            disabled={!isRunning && challengeIndex >= sampleChallenges.length}
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
          <span className="text-sm font-medium text-gray-300">Exploration Progress</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Current Challenge Panel */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-purple-400" />
            Current Challenge
          </h3>
          {currentChallenge ? (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <div className="font-medium text-purple-300 mb-2">{currentChallenge.type}</div>
                <div className="text-sm text-gray-300 mb-3">"{currentChallenge.query}"</div>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-400 text-xs">Expected Keywords:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {currentChallenge.expectedKeywords.map(keyword => (
                        <span key={keyword} className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-300">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-400 text-xs">Abstract Patterns:</span>
                    <div className="space-y-1 mt-1">
                      {discoveredPatterns.map(pattern => (
                        <div key={pattern} className="text-xs p-2 bg-purple-500/10 rounded text-purple-300">
                          {pattern}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Waiting for challenge...</p>
            </div>
          )}
        </div>

        {/* AI Agents Panel */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-400" />
            AI Agents
          </h3>
          <div className="space-y-3">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`p-3 rounded-lg border transition-all ${
                  agent.status === 'idle'
                    ? 'border-gray-600 bg-gray-700/30'
                    : agent.status === 'exploring'
                    ? 'border-blue-500 bg-blue-500/10'
                    : agent.status === 'discovering'
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-cyan-500 bg-cyan-500/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <agent.icon className="w-4 h-4" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{agent.name}</div>
                    <div className="text-xs text-gray-400">{agent.specialty}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    agent.status === 'idle'
                      ? 'bg-gray-600 text-gray-300'
                      : agent.status === 'exploring'
                      ? 'bg-blue-600 text-blue-100'
                      : agent.status === 'discovering'
                      ? 'bg-purple-600 text-purple-100'
                      : 'bg-cyan-600 text-cyan-100'
                  }`}>
                    {agent.status.toUpperCase()}
                  </span>
                  {agent.status !== 'idle' && (
                    <Clock className="w-3 h-3 text-gray-400 animate-pulse" />
                  )}
                </div>
                {agent.currentPattern && (
                  <div className="text-xs text-gray-300 mb-2">
                    Pattern: {agent.currentPattern}
                  </div>
                )}
                {agent.discoveredConcepts.length > 0 && (
                  <div className="text-xs">
                    <span className="text-gray-400">Discovered:</span>
                    <div className="text-green-400 mt-1">
                      {agent.discoveredConcepts.length} concepts
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Latent Concepts */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Network className="w-5 h-5 text-pink-400" />
            Latent Concepts
          </h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {concepts.filter(c => c.discovered).map((concept) => (
              <div key={concept.id} className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm text-pink-300">{concept.name}</span>
                  <span className="text-xs text-yellow-400">{(concept.similarity * 100).toFixed(0)}%</span>
                </div>
                <div className="text-xs text-gray-400 mb-1">{concept.domain}</div>
                <div className="text-xs text-gray-300">{concept.abstractPattern}</div>
                {concept.connections.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {concept.connections.slice(0, 2).map(conn => (
                      <span key={conn} className="text-xs px-1 py-0.5 bg-gray-700 rounded text-gray-400">
                        {conn}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {concepts.filter(c => c.discovered).length === 0 && (
              <div className="text-center text-gray-400 py-4">
                <Eye className="w-6 h-6 mx-auto mb-2 opacity-50" />
                <p className="text-xs">No concepts discovered yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Emergent Insights */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-green-400" />
            Emergent Insights
          </h3>
          
          <div className="space-y-4">
            {/* Discovered Insights */}
            <div>
              <div className="text-sm font-medium mb-2">Discovered Insights</div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {emergentInsights.map((insight, index) => (
                  <div key={index} className="text-xs p-2 bg-green-500/10 border border-green-500/30 rounded text-green-200">
                    {insight}
                  </div>
                ))}
              </div>
            </div>

            {/* Synthesized Solution */}
            {synthesizedSolution && (
              <div>
                <div className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-400" />
                  Novel Solution
                </div>
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                  <div className="font-medium text-yellow-300 text-sm">{synthesizedSolution}</div>
                  <div className="text-xs text-gray-300 mt-1">
                    Generated through cross-domain latent exploration
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-purple-400">{(systemMetrics.noveltyScore * 100).toFixed(0)}%</div>
          <div className="text-xs text-gray-400">Novelty Score</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-400">{systemMetrics.crossDomainConnections}</div>
          <div className="text-xs text-gray-400">Cross-Domain Links</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-400">{systemMetrics.abstractionLevel}</div>
          <div className="text-xs text-gray-400">Abstraction Level</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-yellow-400">{systemMetrics.emergentInsights}</div>
          <div className="text-xs text-gray-400">Emergent Insights</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-cyan-400">{systemMetrics.explorationDepth}</div>
          <div className="text-xs text-gray-400">Exploration Depth</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-pink-400">{systemMetrics.synthesisComplexity}</div>
          <div className="text-xs text-gray-400">Synthesis Complexity</div>
        </div>
      </div>

      {/* Step Information */}
      <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Current Step: {steps[currentStep]}</h4>
        <div className="text-sm text-gray-300">
          {currentStep === 0 && "System analyzes the query for abstract reasoning patterns rather than explicit keywords."}
          {currentStep === 1 && "Multiple AI agents explore different dimensions of the abstract pattern space in parallel."}
          {currentStep === 2 && "Agents discover unexpected connections in latent knowledge space across different domains."}
          {currentStep === 3 && "System navigates implicit reasoning patterns to find non-obvious conceptual relationships."}
          {currentStep === 4 && "Cross-pattern synthesis combines multiple latent concepts into integrated frameworks."}
          {currentStep === 5 && "Novel insights emerge that transcend the original query scope through pattern abstraction."}
        </div>
      </div>
    </div>
  );
};

export default LatentKnowledgeRetrievalDemo;