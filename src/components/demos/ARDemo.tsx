'use client';

import React, { useState, useEffect } from 'react';
import { Lightbulb, Search, ArrowRight, CheckCircle, AlertTriangle, Sparkles, PlayCircle, RotateCcw, Network, Target } from 'lucide-react';

interface AnalogousDomain {
  id: string;
  name: string;
  icon: string;
  description: string;
  similarities: string[];
  conceptMappings: { source: string; target: string }[];
  solution: string;
  relevanceScore: number;
}

interface ProblemScenario {
  id: string;
  title: string;
  problem: string;
  targetContext: string;
  domains: AnalogousDomain[];
  synthesizedSolution: string;
  boundaries: string[];
}

const ARDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('traffic');
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'problem' | 'search' | 'mapping' | 'validation' | 'synthesis' | 'complete'>('problem');
  const [discoveredDomains, setDiscoveredDomains] = useState<Set<string>>(new Set());
  const [activeDomain, setActiveDomain] = useState<string | null>(null);
  const [mappingsRevealed, setMappingsRevealed] = useState<Set<string>>(new Set());
  const [validationResults, setValidationResults] = useState<{ valid: boolean; boundaries: string[] } | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  const scenarios: ProblemScenario[] = [
    {
      id: 'traffic',
      title: 'Traffic Congestion',
      problem: 'How to manage traffic congestion in city center during rush hours?',
      targetContext: 'Urban planning challenge with limited road capacity and high demand',
      domains: [
        {
          id: 'water',
          name: 'Water Systems',
          icon: '💧',
          description: 'Pipes, valves, and pressure management',
          similarities: ['Flow control', 'Capacity limits', 'Pressure points', 'Distribution network'],
          conceptMappings: [
            { source: 'Pipe diameter', target: 'Road capacity' },
            { source: 'Valve control', target: 'Traffic lights' },
            { source: 'Water pressure', target: 'Congestion level' },
            { source: 'Flow rate', target: 'Vehicles per hour' }
          ],
          solution: 'Use dynamic valve control (traffic signals) to regulate flow based on pressure (congestion)',
          relevanceScore: 85
        },
        {
          id: 'network',
          name: 'Network Traffic',
          icon: '🌐',
          description: 'Data packets, routers, and bandwidth management',
          similarities: ['Congestion control', 'Load balancing', 'Queue management', 'Routing algorithms'],
          conceptMappings: [
            { source: 'Router', target: 'Intersection' },
            { source: 'Packet', target: 'Vehicle' },
            { source: 'Bandwidth', target: 'Road capacity' },
            { source: 'Load balancer', target: 'Route optimizer' }
          ],
          solution: 'Implement load balancing (alternate routes) and smart routing (GPS navigation)',
          relevanceScore: 90
        },
        {
          id: 'airline',
          name: 'Airline Scheduling',
          icon: '✈️',
          description: 'Gates, runways, and slot management',
          similarities: ['Time slot allocation', 'Resource scarcity', 'Delay costs', 'Priority systems'],
          conceptMappings: [
            { source: 'Runway slot', target: 'Road time slot' },
            { source: 'Gate assignment', target: 'Parking allocation' },
            { source: 'Priority boarding', target: 'HOV lanes' },
            { source: 'Dynamic pricing', target: 'Congestion pricing' }
          ],
          solution: 'Apply dynamic pricing (congestion charges) to manage demand',
          relevanceScore: 75
        }
      ],
      synthesizedSolution: 'Dynamic congestion pricing + Smart routing algorithms + Adaptive signal timing → 40% congestion reduction',
      boundaries: ['Human behavior ≠ data packets', 'Social equity concerns', 'Political constraints', 'Emergency vehicle access']
    },
    {
      id: 'memory',
      title: 'Database Caching',
      problem: 'Optimize database query performance with limited memory?',
      targetContext: 'Software engineering challenge with memory constraints and high query volume',
      domains: [
        {
          id: 'library',
          name: 'Library System',
          icon: '📚',
          description: 'Book storage, checkout, and popular titles',
          similarities: ['Limited shelf space', 'Frequently accessed items', 'Storage hierarchy', 'Retrieval speed'],
          conceptMappings: [
            { source: 'Popular books (front)', target: 'Hot data (cache)' },
            { source: 'Archive (back)', target: 'Cold data (disk)' },
            { source: 'Return frequency', target: 'Access pattern' },
            { source: 'Shelf space limit', target: 'Memory limit' }
          ],
          solution: 'Keep frequently accessed items readily available, archive rarely used ones',
          relevanceScore: 80
        },
        {
          id: 'restaurant',
          name: 'Restaurant Kitchen',
          icon: '🍳',
          description: 'Ingredient prep, mise en place, and order speed',
          similarities: ['Pre-preparation', 'Quick access', 'Space constraints', 'Predictive stocking'],
          conceptMappings: [
            { source: 'Prep station', target: 'Cache layer' },
            { source: 'Pantry', target: 'Database' },
            { source: 'Popular dishes', target: 'Hot queries' },
            { source: 'Prep time', target: 'Query time' }
          ],
          solution: 'Pre-compute and store results for common requests (mise en place)',
          relevanceScore: 75
        },
        {
          id: 'brain',
          name: 'Human Memory',
          icon: '🧠',
          description: 'Working memory, long-term storage, and recall',
          similarities: ['Multi-tier storage', 'Recency effects', 'Forgetting curve', 'Importance weighting'],
          conceptMappings: [
            { source: 'Working memory', target: 'L1 cache' },
            { source: 'Long-term memory', target: 'Disk storage' },
            { source: 'Recall frequency', target: 'Access pattern' },
            { source: 'Memory consolidation', target: 'Cache warming' }
          ],
          solution: 'Multi-tier caching with recency and frequency-based eviction (like human memory)',
          relevanceScore: 85
        }
      ],
      synthesizedSolution: 'LRU cache + Query result pre-computation + Multi-tier storage hierarchy → 10x query speedup',
      boundaries: ['Perfect recall not possible', 'Stale data concerns', 'Cache invalidation complexity', 'Memory overhead']
    },
    {
      id: 'security',
      title: 'API Rate Limiting',
      problem: 'Protect API from abuse while serving legitimate users?',
      targetContext: 'Security challenge balancing availability and protection',
      domains: [
        {
          id: 'bouncer',
          name: 'Club Bouncer',
          icon: '🚪',
          description: 'Entry control, VIP passes, and capacity management',
          similarities: ['Access control', 'Priority levels', 'Capacity limits', 'Suspicious behavior detection'],
          conceptMappings: [
            { source: 'Guest list', target: 'API keys' },
            { source: 'VIP pass', target: 'Premium tier' },
            { source: 'Capacity limit', target: 'Rate limit' },
            { source: 'Bounce troublemakers', target: 'Block abusers' }
          ],
          solution: 'Tiered access with capacity limits and behavior monitoring',
          relevanceScore: 85
        },
        {
          id: 'toll',
          name: 'Toll Road',
          icon: '🛣️',
          description: 'Toll collection, express lanes, and congestion management',
          similarities: ['Usage-based charging', 'Fast lanes', 'Peak pricing', 'Throughput control'],
          conceptMappings: [
            { source: 'Toll booth', target: 'API gateway' },
            { source: 'Express lane', target: 'Priority queue' },
            { source: 'Peak pricing', target: 'Surge limits' },
            { source: 'E-ZPass', target: 'Auth token' }
          ],
          solution: 'Usage-based limits with premium fast lanes and surge protection',
          relevanceScore: 80
        },
        {
          id: 'immune',
          name: 'Immune System',
          icon: '🛡️',
          description: 'Pathogen detection, response adaptation, and memory',
          similarities: ['Threat detection', 'Graduated response', 'Pattern recognition', 'Adaptive defense'],
          conceptMappings: [
            { source: 'Antibodies', target: 'Request filters' },
            { source: 'Immune response', target: 'Rate limiting' },
            { source: 'Pathogen memory', target: 'Blocklist' },
            { source: 'Inflammation', target: 'Temporary restrictions' }
          ],
          solution: 'Adaptive rate limiting that learns and responds to attack patterns',
          relevanceScore: 90
        }
      ],
      synthesizedSolution: 'Tiered rate limits + Adaptive throttling + Pattern-based blocking → 99.9% uptime with abuse protection',
      boundaries: ['False positives', 'Legitimate burst traffic', 'Multi-account attacks', 'Distributed attacks']
    }
  ];

  const getCurrentScenario = (): ProblemScenario => {
    return scenarios.find(s => s.id === selectedScenario) || scenarios[0];
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentPhase('problem');
    setDiscoveredDomains(new Set());
    setActiveDomain(null);
    setMappingsRevealed(new Set());
    setValidationResults(null);
    setAnimationProgress(0);
  };

  const runAnalogicalReasoning = async () => {
    resetDemo();
    setIsRunning(true);
    const scenario = getCurrentScenario();

    // Phase 1: Problem Recognition
    setCurrentPhase('problem');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Phase 2: Search for Analogies
    setCurrentPhase('search');
    for (const domain of scenario.domains) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setDiscoveredDomains(prev => new Set([...prev, domain.id]));
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Phase 3: Concept Mapping
    setCurrentPhase('mapping');
    for (const domain of scenario.domains) {
      setActiveDomain(domain.id);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setMappingsRevealed(prev => new Set([...prev, domain.id]));
      setActiveDomain(null);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Phase 4: Validation
    setCurrentPhase('validation');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setValidationResults({
      valid: true,
      boundaries: scenario.boundaries
    });
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Phase 5: Solution Synthesis
    setCurrentPhase('synthesis');
    await new Promise(resolve => setTimeout(resolve, 2000));

    setCurrentPhase('complete');
    setIsRunning(false);
  };

  useEffect(() => {
    if (currentPhase === 'synthesis' && isRunning) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setAnimationProgress(progress);
        if (progress >= 100) clearInterval(interval);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [currentPhase, isRunning]);

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'problem': return 'bg-red-950 border-red-800';
      case 'search': return 'bg-yellow-950 border-yellow-800';
      case 'mapping': return 'bg-blue-950 border-blue-800';
      case 'validation': return 'bg-purple-950 border-purple-800';
      case 'synthesis': return 'bg-green-950 border-green-800';
      case 'complete': return 'bg-green-950 border-green-600';
      default: return 'bg-gray-900 border-gray-700';
    }
  };

  const scenario = getCurrentScenario();

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Analogical Reasoning Demo</h2>
        <p className="text-gray-400 mb-6">
          Solve problems by finding and applying similar patterns from known domains.
          Watch how insights transfer across different contexts through structural mapping.
        </p>

        {/* Scenario Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200">Select Problem Scenario</h3>
          <div className="flex flex-wrap gap-3">
            {scenarios.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedScenario(s.id);
                  resetDemo();
                }}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedScenario === s.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Current Phase Indicator */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            Reasoning Process
          </h3>
          <div className="flex items-center gap-2">
            {['problem', 'search', 'mapping', 'validation', 'synthesis'].map((phase, idx) => (
              <React.Fragment key={phase}>
                <div
                  className={`flex-1 px-3 py-2 rounded-lg border-2 transition-all ${
                    currentPhase === phase
                      ? getPhaseColor(phase) + ' scale-105'
                      : currentPhase === 'complete' || (['search', 'mapping', 'validation', 'synthesis'].indexOf(currentPhase) > ['search', 'mapping', 'validation', 'synthesis'].indexOf(phase))
                      ? 'bg-gray-800 border-green-700'
                      : 'bg-gray-900 border-gray-700'
                  }`}
                >
                  <p className="text-xs font-medium text-gray-300 capitalize text-center">
                    {phase === 'problem' ? 'Problem' :
                     phase === 'search' ? 'Search' :
                     phase === 'mapping' ? 'Mapping' :
                     phase === 'validation' ? 'Validation' : 'Synthesis'}
                  </p>
                </div>
                {idx < 4 && <ArrowRight className="w-4 h-4 text-gray-600" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Problem Statement */}
        <div className={`mb-6 p-4 rounded-lg border-2 transition-all ${
          currentPhase === 'problem' ? 'bg-red-950 border-red-800' : 'bg-gray-900 border-gray-700'
        }`}>
          <h3 className="text-lg font-semibold mb-2 text-gray-200 flex items-center gap-2">
            <Target className="w-5 h-5 text-red-400" />
            Target Problem
          </h3>
          <p className="text-white text-lg mb-2">{scenario.problem}</p>
          <p className="text-sm text-gray-400">{scenario.targetContext}</p>
        </div>

        {/* Analogous Domains */}
        {currentPhase !== 'problem' && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <Search className="w-5 h-5 text-yellow-400" />
              Analogous Domains Discovered
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {scenario.domains.map(domain => {
                const isDiscovered = discoveredDomains.has(domain.id);
                const isActive = activeDomain === domain.id;
                const isMapped = mappingsRevealed.has(domain.id);

                return (
                  <div
                    key={domain.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isActive ? 'bg-blue-950 border-blue-600 scale-105' :
                      isMapped ? 'bg-green-950 border-green-700' :
                      isDiscovered ? 'bg-gray-800 border-yellow-600' :
                      'bg-gray-900 border-gray-700 opacity-40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{domain.icon}</span>
                        <h4 className="font-semibold text-white">{domain.name}</h4>
                      </div>
                      {isMapped && <CheckCircle className="w-5 h-5 text-green-400" />}
                    </div>

                    {isDiscovered && (
                      <>
                        <p className="text-xs text-gray-400 mb-2">{domain.description}</p>

                        <div className="mb-2">
                          <p className="text-xs font-medium text-blue-300 mb-1">Similarities:</p>
                          <div className="flex flex-wrap gap-1">
                            {domain.similarities.slice(0, 2).map((sim, idx) => (
                              <span key={idx} className="text-xs bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded">
                                {sim}
                              </span>
                            ))}
                          </div>
                        </div>

                        {isMapped && (
                          <>
                            <div className="mb-2 pt-2 border-t border-gray-700">
                              <p className="text-xs font-medium text-green-300 mb-1">Concept Mappings:</p>
                              <div className="space-y-1">
                                {domain.conceptMappings.slice(0, 2).map((mapping, idx) => (
                                  <div key={idx} className="text-xs flex items-center gap-1">
                                    <span className="text-gray-400">{mapping.source}</span>
                                    <ArrowRight className="w-3 h-3 text-green-400" />
                                    <span className="text-white">{mapping.target}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="pt-2 border-t border-gray-700">
                              <p className="text-xs font-medium text-purple-300 mb-1">Transferred Solution:</p>
                              <p className="text-xs text-gray-300">{domain.solution}</p>
                            </div>
                          </>
                        )}

                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-gray-500">Relevance</span>
                          <div className="flex items-center gap-1">
                            <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-500 transition-all duration-500"
                                style={{ width: isDiscovered ? `${domain.relevanceScore}%` : '0%' }}
                              />
                            </div>
                            <span className="text-xs font-bold text-yellow-400">{domain.relevanceScore}%</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Validation Results */}
        {validationResults && (currentPhase === 'validation' || currentPhase === 'synthesis' || currentPhase === 'complete') && (
          <div className="mb-6 grid md:grid-cols-2 gap-4">
            <div className="bg-green-950 border-2 border-green-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-green-300 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Validated Patterns
              </h3>
              <ul className="space-y-1 text-sm text-green-200">
                <li>✓ Limited capacity + High demand</li>
                <li>✓ Flow control mechanisms</li>
                <li>✓ Resource optimization strategies</li>
                <li>✓ Structural similarities confirmed</li>
              </ul>
            </div>

            <div className="bg-orange-950 border-2 border-orange-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-orange-300 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Analogy Boundaries
              </h3>
              <ul className="space-y-1 text-sm text-orange-200">
                {validationResults.boundaries.map((boundary, idx) => (
                  <li key={idx}>⚠️ {boundary}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Synthesized Solution */}
        {(currentPhase === 'synthesis' || currentPhase === 'complete') && (
          <div className="mb-6 bg-green-950 border-2 border-green-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-green-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Synthesized Solution
            </h3>
            <p className="text-white text-lg mb-3">{scenario.synthesizedSolution}</p>
            {currentPhase === 'synthesis' && (
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${animationProgress}%` }}
                />
              </div>
            )}
            {currentPhase === 'complete' && (
              <p className="text-sm text-green-300">
                ✓ Solution generated by combining insights from multiple analogous domains
              </p>
            )}
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex gap-3">
          <button
            onClick={runAnalogicalReasoning}
            disabled={isRunning}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2"
          >
            {isRunning ? (
              <>
                <Network className="w-5 h-5 animate-pulse" />
                Running Analogical Reasoning...
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5" />
                Run Analogical Reasoning
              </>
            )}
          </button>
          <button
            onClick={resetDemo}
            disabled={isRunning}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>

        {/* How It Works */}
        <div className="mt-6 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            How Analogical Reasoning Works
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">1.</span>
              <div>
                <p className="font-medium text-gray-200">Problem Recognition</p>
                <p className="text-xs text-gray-400">Identify the core challenge and its structural properties</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">2.</span>
              <div>
                <p className="font-medium text-gray-200">Analogy Search</p>
                <p className="text-xs text-gray-400">Find domains with similar structural patterns and relationships</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">3.</span>
              <div>
                <p className="font-medium text-gray-200">Concept Mapping</p>
                <p className="text-xs text-gray-400">Create explicit mappings between source and target concepts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">4.</span>
              <div>
                <p className="font-medium text-gray-200">Validation & Boundaries</p>
                <p className="text-xs text-gray-400">Verify analogies hold and identify where they break down</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">5.</span>
              <div>
                <p className="font-medium text-gray-200">Solution Synthesis</p>
                <p className="text-xs text-gray-400">Combine and adapt insights from multiple analogies into novel solution</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insight */}
        <div className="mt-6 bg-purple-950 border border-purple-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-purple-300">Key Insight</h3>
          <p className="text-sm text-purple-200">
            Analogical reasoning leverages <strong>structural similarities</strong> rather than surface features.
            By finding patterns that transcend specific domains, we can transfer proven solutions to novel problems,
            enabling creative problem-solving and innovation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ARDemo;