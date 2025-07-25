'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Database, Brain, Target, ArrowRight, CheckCircle, AlertCircle, BarChart3, Filter, Zap, Layers, Shuffle, Activity } from 'lucide-react';

interface ContextSource {
  id: string;
  name: string;
  type: 'document' | 'database' | 'api' | 'knowledge-base' | 'real-time';
  relevanceScore: number;
  quality: number;
  freshness: number;
  size: number;
  icon: React.ReactNode;
  color: string;
  data: string[];
  isActive: boolean;
}

interface QueryAnalysis {
  primaryDomains: string[];
  intent: string;
  complexity: 'low' | 'medium' | 'high';
  timeSensitivity: 'low' | 'medium' | 'high';
  requiredExpertise: string[];
}

interface AssemblyStrategy {
  totalContextWindow: number;
  allocations: {
    sourceId: string;
    percentage: number;
    justification: string;
  }[];
  optimizations: string[];
}

interface AssemblyPhase {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  duration: number;
  icon: React.ReactNode;
}

const SAMPLE_QUERIES = [
  {
    id: 'quantum-crypto',
    text: 'How do quantum computing advances affect cryptocurrency security?',
    analysis: {
      primaryDomains: ['Quantum Computing', 'Cryptography', 'Blockchain'],
      intent: 'Impact analysis with security implications',
      complexity: 'high',
      timeSensitivity: 'medium',
      requiredExpertise: ['quantum-algorithms', 'cryptography', 'blockchain-security']
    } as QueryAnalysis
  },
  {
    id: 'climate-policy',
    text: 'What are the latest developments in carbon trading policies across different regions?',
    analysis: {
      primaryDomains: ['Climate Policy', 'Finance', 'Regulation'],
      intent: 'Current policy analysis across regions',
      complexity: 'high',
      timeSensitivity: 'high',
      requiredExpertise: ['environmental-policy', 'carbon-markets', 'international-law']
    } as QueryAnalysis
  },
  {
    id: 'ai-ethics',
    text: 'Compare different approaches to AI ethics frameworks in healthcare applications',
    analysis: {
      primaryDomains: ['AI Ethics', 'Healthcare', 'Regulation'],
      intent: 'Comparative analysis of ethical frameworks',
      complexity: 'high',
      timeSensitivity: 'low',
      requiredExpertise: ['medical-ethics', 'ai-governance', 'healthcare-regulation']
    } as QueryAnalysis
  }
];

const CONTEXT_SOURCES: ContextSource[] = [
  {
    id: 'quantum-papers',
    name: 'Quantum Computing Research',
    type: 'document',
    relevanceScore: 0,
    quality: 95,
    freshness: 92,
    size: 1200,
    icon: <Database className="w-4 h-4" />,
    color: 'from-blue-500 to-cyan-500',
    data: ['Latest quantum computing research papers', 'Quantum algorithm developments', 'Hardware advances'],
    isActive: false
  },
  {
    id: 'crypto-security',
    name: 'Cryptography Security DB',
    type: 'database',
    relevanceScore: 0,
    quality: 88,
    freshness: 85,
    size: 800,
    icon: <Target className="w-4 h-4" />,
    color: 'from-red-500 to-pink-500',
    data: ['Current cryptographic methods', 'Security vulnerabilities', 'Post-quantum cryptography'],
    isActive: false
  },
  {
    id: 'blockchain-data',
    name: 'Blockchain Knowledge',
    type: 'knowledge-base',
    relevanceScore: 0,
    quality: 82,
    freshness: 78,
    size: 600,
    icon: <Layers className="w-4 h-4" />,
    color: 'from-green-500 to-emerald-500',
    data: ['Blockchain protocols', 'Cryptocurrency implementations', 'Security practices'],
    isActive: false
  },
  {
    id: 'industry-reports',
    name: 'Industry Reports API',
    type: 'api',
    relevanceScore: 0,
    quality: 75,
    freshness: 95,
    size: 400,
    icon: <Activity className="w-4 h-4" />,
    color: 'from-purple-500 to-violet-500',
    data: ['Market analysis', 'Technology trends', 'Implementation timelines'],
    isActive: false
  },
  {
    id: 'real-time-news',
    name: 'Real-time News Feed',
    type: 'real-time',
    relevanceScore: 0,
    quality: 65,
    freshness: 99,
    size: 200,
    icon: <Zap className="w-4 h-4" />,
    color: 'from-yellow-500 to-orange-500',
    data: ['Breaking news', 'Recent announcements', 'Expert opinions'],
    isActive: false
  }
];

const ASSEMBLY_PHASES: AssemblyPhase[] = [
  {
    id: 'query-analysis',
    name: 'Query Analysis',
    description: 'Analyze query intent, complexity, and domain requirements',
    status: 'pending',
    duration: 1500,
    icon: <Brain className="w-4 h-4" />
  },
  {
    id: 'source-identification',
    name: 'Source Identification',
    description: 'Identify and evaluate available context sources',
    status: 'pending',
    duration: 2000,
    icon: <Database className="w-4 h-4" />
  },
  {
    id: 'relevance-scoring',
    name: 'Relevance Scoring',
    description: 'Score sources based on relevance, quality, and freshness',
    status: 'pending',
    duration: 1800,
    icon: <BarChart3 className="w-4 h-4" />
  },
  {
    id: 'context-assembly',
    name: 'Context Assembly',
    description: 'Assemble optimal context window with strategic allocation',
    status: 'pending',
    duration: 2500,
    icon: <Filter className="w-4 h-4" />
  },
  {
    id: 'optimization',
    name: 'Real-time Optimization',
    description: 'Monitor utilization and adjust allocations dynamically',
    status: 'pending',
    duration: 1200,
    icon: <Shuffle className="w-4 h-4" />
  }
];

export const DynamicContextAssemblyDemo: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState(SAMPLE_QUERIES[0]);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [phases, setPhases] = useState<AssemblyPhase[]>(ASSEMBLY_PHASES.map(p => ({ ...p })));
  const [contextSources, setContextSources] = useState<ContextSource[]>(CONTEXT_SOURCES.map(s => ({ ...s })));
  const [queryAnalysis, setQueryAnalysis] = useState<QueryAnalysis | null>(null);
  const [assemblyStrategy, setAssemblyStrategy] = useState<AssemblyStrategy | null>(null);
  const [speed, setSpeed] = useState(2);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [utilizationStats, setUtilizationStats] = useState<{ [key: string]: number }>({});

  const resetDemo = useCallback(() => {
    setCurrentPhase('');
    setIsRunning(false);
    setPhases(ASSEMBLY_PHASES.map(p => ({ ...p, status: 'pending' })));
    setContextSources(CONTEXT_SOURCES.map(s => ({ ...s, relevanceScore: 0, isActive: false })));
    setQueryAnalysis(null);
    setAssemblyStrategy(null);
    setExecutionLog([]);
    setUtilizationStats({});
  }, []);

  useEffect(() => {
    resetDemo();
  }, [selectedQuery, resetDemo]);

  const calculateRelevanceScores = (query: typeof selectedQuery): { [key: string]: number } => {
    const scores: { [key: string]: number } = {};
    
    // Score based on query analysis
    contextSources.forEach(source => {
      let score = 0;
      
      // Base relevance by domain matching
      if (source.id === 'quantum-papers' && query.analysis.primaryDomains.includes('Quantum Computing')) score += 40;
      if (source.id === 'crypto-security' && query.analysis.primaryDomains.includes('Cryptography')) score += 40;
      if (source.id === 'blockchain-data' && query.analysis.primaryDomains.includes('Blockchain')) score += 35;
      if (source.id === 'industry-reports') score += 25; // Always somewhat relevant
      if (source.id === 'real-time-news' && query.analysis.timeSensitivity === 'high') score += 30;
      else if (source.id === 'real-time-news') score += 15;
      
      // Quality and freshness adjustments
      const qualityBonus = (source.quality - 70) * 0.3;
      const freshnessBonus = query.analysis.timeSensitivity === 'high' ? (source.freshness - 70) * 0.2 : 0;
      
      score += qualityBonus + freshnessBonus;
      scores[source.id] = Math.max(0, Math.min(100, score));
    });
    
    return scores;
  };

  const generateAssemblyStrategy = (sources: ContextSource[]): AssemblyStrategy => {
    const activeSources = sources.filter(s => s.isActive).sort((a, b) => b.relevanceScore - a.relevanceScore);
    const totalContextWindow = 4000; // tokens
    
    let remainingWindow = totalContextWindow;
    const allocations = activeSources.map((source, index) => {
      let percentage;
      if (index === 0) {
        // Highest relevance source gets largest allocation
        percentage = Math.min(40, (source.relevanceScore / 100) * 50);
      } else if (index === 1) {
        percentage = Math.min(30, (source.relevanceScore / 100) * 40);
      } else {
        percentage = Math.min(20, (source.relevanceScore / 100) * 30);
      }
      
      return {
        sourceId: source.id,
        percentage,
        justification: `${source.relevanceScore.toFixed(0)}% relevance, ${source.quality}% quality`
      };
    });
    
    // Normalize to 100%
    const totalPercentage = allocations.reduce((sum, alloc) => sum + alloc.percentage, 0);
    allocations.forEach(alloc => {
      alloc.percentage = (alloc.percentage / totalPercentage) * 100;
    });

    return {
      totalContextWindow,
      allocations,
      optimizations: [
        'Prioritize high-relevance sources',
        'Balance quality vs. freshness based on query needs',
        'Reserve buffer for real-time adjustments',
        'Monitor utilization for dynamic reallocation'
      ]
    };
  };

  const runDynamicAssembly = useCallback(async () => {
    setIsRunning(true);
    setExecutionLog(['🚀 Starting Dynamic Context Assembly process...']);

    // Phase 1: Query Analysis
    setCurrentPhase('query-analysis');
    setPhases(prev => prev.map(p => p.id === 'query-analysis' ? { ...p, status: 'active' } : p));
    setExecutionLog(prev => [...prev, '🧠 Analyzing query structure and requirements...']);
    
    await new Promise(resolve => setTimeout(resolve, ASSEMBLY_PHASES[0].duration / speed));
    
    setQueryAnalysis(selectedQuery.analysis);
    setPhases(prev => prev.map(p => p.id === 'query-analysis' ? { ...p, status: 'completed' } : p));
    setExecutionLog(prev => [...prev, `✅ Query analysis complete: ${selectedQuery.analysis.complexity} complexity, ${selectedQuery.analysis.primaryDomains.length} domains`]);

    // Phase 2: Source Identification
    setCurrentPhase('source-identification');
    setPhases(prev => prev.map(p => p.id === 'source-identification' ? { ...p, status: 'active' } : p));
    setExecutionLog(prev => [...prev, '🔍 Identifying available context sources...']);
    
    await new Promise(resolve => setTimeout(resolve, ASSEMBLY_PHASES[1].duration / speed));
    
    setPhases(prev => prev.map(p => p.id === 'source-identification' ? { ...p, status: 'completed' } : p));
    setExecutionLog(prev => [...prev, `✅ Found ${contextSources.length} available context sources`]);

    // Phase 3: Relevance Scoring
    setCurrentPhase('relevance-scoring');
    setPhases(prev => prev.map(p => p.id === 'relevance-scoring' ? { ...p, status: 'active' } : p));
    setExecutionLog(prev => [...prev, '📊 Calculating relevance scores for each source...']);
    
    await new Promise(resolve => setTimeout(resolve, ASSEMBLY_PHASES[2].duration / speed));
    
    const relevanceScores = calculateRelevanceScores(selectedQuery);
    setContextSources(prev => prev.map(source => ({
      ...source,
      relevanceScore: relevanceScores[source.id] || 0,
      isActive: relevanceScores[source.id] > 60 // Activate high-relevance sources
    })));
    
    setPhases(prev => prev.map(p => p.id === 'relevance-scoring' ? { ...p, status: 'completed' } : p));
    const activeCount = Object.values(relevanceScores).filter(score => score > 60).length;
    setExecutionLog(prev => [...prev, `✅ Relevance scoring complete: ${activeCount} sources selected for assembly`]);

    // Phase 4: Context Assembly
    setCurrentPhase('context-assembly');
    setPhases(prev => prev.map(p => p.id === 'context-assembly' ? { ...p, status: 'active' } : p));
    setExecutionLog(prev => [...prev, '🔧 Assembling optimal context window...']);
    
    await new Promise(resolve => setTimeout(resolve, ASSEMBLY_PHASES[3].duration / speed));
    
    const activeSources = contextSources.filter(s => relevanceScores[s.id] > 60);
    const strategy = generateAssemblyStrategy(activeSources.map(s => ({ ...s, relevanceScore: relevanceScores[s.id], isActive: true })));
    setAssemblyStrategy(strategy);
    
    setPhases(prev => prev.map(p => p.id === 'context-assembly' ? { ...p, status: 'completed' } : p));
    setExecutionLog(prev => [...prev, `✅ Context assembly complete: ${strategy.allocations.length} sources allocated across ${strategy.totalContextWindow} token window`]);

    // Phase 5: Real-time Optimization
    setCurrentPhase('optimization');
    setPhases(prev => prev.map(p => p.id === 'optimization' ? { ...p, status: 'active' } : p));
    setExecutionLog(prev => [...prev, '⚡ Starting real-time optimization monitoring...']);
    
    await new Promise(resolve => setTimeout(resolve, ASSEMBLY_PHASES[4].duration / speed));
    
    // Simulate utilization statistics
    const utilization: { [key: string]: number } = {};
    strategy.allocations.forEach(alloc => {
      utilization[alloc.sourceId] = Math.random() * 0.4 + 0.6; // 60-100% utilization
    });
    setUtilizationStats(utilization);
    
    setPhases(prev => prev.map(p => p.id === 'optimization' ? { ...p, status: 'completed' } : p));
    setExecutionLog(prev => [...prev, '✅ Optimization monitoring active: Dynamic reallocation enabled']);
    
    setCurrentPhase('complete');
    setIsRunning(false);
    setExecutionLog(prev => [...prev, '🎯 Dynamic Context Assembly complete! Context optimally configured for query.']);
  }, [selectedQuery, contextSources, speed]);

  const getPhaseStatus = (phaseId: string) => {
    const phase = phases.find(p => p.id === phaseId);
    if (!phase) return 'border-gray-600 bg-gray-800/20';
    
    switch (phase.status) {
      case 'active':
        return 'border-blue-500 bg-blue-900/20';
      case 'completed':
        return 'border-green-500 bg-green-900/20';
      default:
        return 'border-gray-600 bg-gray-800/20';
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">🔧</span>
          Dynamic Context Assembly Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch how context is intelligently assembled from multiple sources with real-time optimization and relevance scoring.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sample Query
            </label>
            <select
              value={selectedQuery.id}
              onChange={(e) => {
                const query = SAMPLE_QUERIES.find(q => q.id === e.target.value);
                if (query) setSelectedQuery(query);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SAMPLE_QUERIES.map((query) => (
                <option key={query.id} value={query.id}>
                  {query.text.substring(0, 50)}...
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Processing Speed
            </label>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full accent-blue-500"
            />
            <div className="text-sm text-gray-400">{speed}x speed</div>
          </div>

          <div className="flex items-end">
            <div className="flex space-x-2">
              <button
                onClick={runDynamicAssembly}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  isRunning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Assembling...' : 'Start Assembly'}
              </button>
              
              <button
                onClick={resetDemo}
                disabled={isRunning}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Current Query */}
        <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
          <h4 className="font-medium text-white mb-2">Current Query</h4>
          <p className="text-gray-300 italic">"{selectedQuery.text}"</p>
          {queryAnalysis && (
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><span className="text-gray-400">Domains:</span> <span className="text-blue-400">{queryAnalysis.primaryDomains.join(', ')}</span></div>
              <div><span className="text-gray-400">Complexity:</span> <span className="text-purple-400 capitalize">{queryAnalysis.complexity}</span></div>
              <div><span className="text-gray-400">Time Sensitivity:</span> <span className="text-green-400 capitalize">{queryAnalysis.timeSensitivity}</span></div>
              <div><span className="text-gray-400">Intent:</span> <span className="text-yellow-400">{queryAnalysis.intent}</span></div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Assembly Pipeline */}
        <div className="xl:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Assembly Pipeline</h3>
          
          {/* Processing Phases */}
          <div className="space-y-4 mb-6">
            {phases.map((phase) => (
              <div key={phase.id} className={`p-4 rounded-lg border transition-all ${getPhaseStatus(phase.id)}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white flex items-center gap-2">
                    {phase.icon}
                    {phase.name}
                  </h4>
                  {phase.status === 'active' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                  {phase.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-400" />}
                </div>
                <p className="text-sm text-gray-300">{phase.description}</p>
                {phase.status === 'active' && (
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Context Sources Flow */}
          <div>
            <h4 className="font-medium text-white mb-3">Context Sources & Scoring</h4>
            <div className="space-y-3">
              {contextSources.map((source) => (
                <div
                  key={source.id}
                  className={`p-4 rounded-lg border transition-all ${
                    source.isActive 
                      ? `bg-gradient-to-r ${source.color} bg-opacity-10 border-opacity-50` 
                      : 'border-gray-600 bg-gray-800/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded bg-gradient-to-r ${source.color}`}>
                        {source.icon}
                      </div>
                      <div>
                        <h5 className="font-medium text-white text-sm">{source.name}</h5>
                        <div className="text-xs text-gray-400 capitalize">{source.type.replace('-', ' ')}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      {source.relevanceScore > 0 && (
                        <div className="text-sm font-medium text-white">{source.relevanceScore.toFixed(0)}% relevance</div>
                      )}
                      {source.isActive && <div className="text-xs text-green-400">ACTIVE</div>}
                    </div>
                  </div>
                  
                  {source.relevanceScore > 0 && (
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-300">
                      <div>Quality: <span className="text-blue-400">{source.quality}%</span></div>
                      <div>Freshness: <span className="text-green-400">{source.freshness}%</span></div>
                      <div>Size: <span className="text-purple-400">{source.size}kb</span></div>
                    </div>
                  )}

                  {source.isActive && utilizationStats[source.id] && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Utilization</span>
                        <span>{(utilizationStats[source.id] * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-1.5 rounded-full transition-all duration-1000" 
                          style={{ width: `${utilizationStats[source.id] * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results & Strategy */}
        <div className="space-y-6">
          {/* Assembly Strategy */}
          {assemblyStrategy && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Assembly Strategy</h3>
              <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4">
                <div className="mb-4">
                  <div className="text-sm text-gray-400">Context Window</div>
                  <div className="text-lg font-medium text-white">{assemblyStrategy.totalContextWindow.toLocaleString()} tokens</div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="text-sm font-medium text-white">Source Allocations:</div>
                  {assemblyStrategy.allocations.map((alloc) => {
                    const source = contextSources.find(s => s.id === alloc.sourceId);
                    return (
                      <div key={alloc.sourceId} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded bg-gradient-to-r ${source?.color}`}></div>
                          <span className="text-gray-300">{source?.name}</span>
                        </div>
                        <div>
                          <span className="text-white font-medium">{alloc.percentage.toFixed(0)}%</span>
                          <div className="text-xs text-gray-400">{alloc.justification}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <div className="text-sm font-medium text-white mb-2">Optimizations:</div>
                  <ul className="text-xs text-gray-300 space-y-1">
                    {assemblyStrategy.optimizations.map((opt, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Execution Log */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Process Log</h3>
            <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 h-64 overflow-y-auto">
              {executionLog.length === 0 ? (
                <div className="text-gray-400 text-center text-sm mt-8">
                  Process log will appear here...
                </div>
              ) : (
                <div className="space-y-2">
                  {executionLog.map((log, index) => (
                    <div key={index} className="text-sm text-gray-300 font-mono">
                      <span className="text-gray-500 mr-2">{String(index + 1).padStart(2, '0')}.</span>
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quality Metrics */}
          {assemblyStrategy && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Quality Metrics</h3>
              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30 p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Context Relevance</div>
                    <div className="text-lg font-medium text-green-400">98%</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Coverage Score</div>
                    <div className="text-lg font-medium text-blue-400">94%</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Optimization Level</div>
                    <div className="text-lg font-medium text-purple-400">96%</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Response Quality</div>
                    <div className="text-lg font-medium text-yellow-400">95%</div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-300">
                  Context optimally assembled with {assemblyStrategy.allocations.length} sources active
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicContextAssemblyDemo;