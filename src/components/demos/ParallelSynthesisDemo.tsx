'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap, TrendingUp, Users, BarChart3, Search, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';

interface AnalysisStream {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  status: 'pending' | 'running' | 'completed';
  confidence: number;
  weight: number;
  findings: string[];
  data: any;
  executionTime: number;
}

interface SynthesisPhase {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed';
  result?: string;
}

const RESEARCH_SCENARIOS = [
  {
    id: 'market-analysis',
    title: 'Market Analysis for AI Startup',
    description: 'Comprehensive market research combining surveys, competitive intelligence, trend analysis, and customer interviews',
    streams: [
      {
        id: 'surveys',
        name: 'Survey Data Analysis',
        description: 'Quantitative analysis of market surveys and industry reports',
        icon: <BarChart3 className="w-5 h-5" />,
        color: 'bg-blue-600',
        confidence: 85,
        weight: 0.85,
        findings: [
          'Total Addressable Market: $50B',
          'Annual growth rate: 25% YoY',
          'Enterprise adoption: 35% planning',
          'SMB adoption: 60% interested',
          'Primary driver: Cost reduction'
        ],
        data: { sampleSize: 542, responseRate: '34%', geographic: 'Global' },
        executionTime: 8
      },
      {
        id: 'competitive',
        name: 'Competitive Intelligence',
        description: 'Analysis of competitive landscape and market positioning',
        icon: <Search className="w-5 h-5" />,
        color: 'bg-green-600',
        confidence: 90,
        weight: 0.90,
        findings: [
          '15 direct competitors identified',
          'Market highly fragmented',
          'Top 3 players: 40% market share',
          'Average Series A: $25M',
          'Key differentiator: Integration ease'
        ],
        data: { companiesAnalyzed: 45, fundingData: 'Complete', marketShare: 'Estimated' },
        executionTime: 12
      },
      {
        id: 'trends',
        name: 'Industry Trend Analysis',
        description: 'Technology and market trend analysis',
        icon: <TrendingUp className="w-5 h-5" />,
        color: 'bg-purple-600',
        confidence: 75,
        weight: 0.75,
        findings: [
          'AI/ML adoption up 40% YoY',
          'Cloud-first strategies dominate',
          'Integration complexity barrier',
          'Remote work drives demand',
          'Regulatory compliance increasing'
        ],
        data: { trendsTracked: 28, timeframe: '24 months', sources: 'Multiple' },
        executionTime: 6
      },
      {
        id: 'interviews',
        name: 'Customer Interviews',
        description: 'Qualitative insights from target customer conversations',
        icon: <Users className="w-5 h-5" />,
        color: 'bg-orange-600',
        confidence: 95,
        weight: 0.95,
        findings: [
          'Pain point: System integration',
          'Budget: $50K average annually',
          'Decision timeline: 6-12 months',
          'Stakeholders: IT + Operations',
          'Success metric: Time saved'
        ],
        data: { interviews: 25, companies: 22, roles: 'C-level to Manager' },
        executionTime: 10
      }
    ]
  },
  {
    id: 'product-research',
    title: 'Product Development Research',
    description: 'Multi-faceted research for new product development',
    streams: [
      {
        id: 'user-research',
        name: 'User Research',
        description: 'User behavior analysis and needs assessment',
        icon: <Users className="w-5 h-5" />,
        color: 'bg-indigo-600',
        confidence: 88,
        weight: 0.88,
        findings: [
          'Primary use case: Daily workflow',
          'Preferred interface: Mobile-first',
          'Key frustration: Complex navigation',
          'Desired feature: Real-time sync',
          'Willingness to pay: $15/month'
        ],
        data: { participants: 120, sessions: 180, methods: 'Mixed' },
        executionTime: 7
      },
      {
        id: 'technical',
        name: 'Technical Feasibility',
        description: 'Technical architecture and implementation analysis',
        icon: <Zap className="w-5 h-5" />,
        color: 'bg-yellow-600',
        confidence: 92,
        weight: 0.92,
        findings: [
          'Core technology: Proven',
          'Development time: 8 months',
          'Infrastructure cost: $50K/month',
          'Team required: 12 engineers',
          'Risk level: Medium'
        ],
        data: { prototypes: 3, feasibilityScore: '87%', architecture: 'Microservices' },
        executionTime: 9
      },
      {
        id: 'market-fit',
        name: 'Market Fit Analysis',
        description: 'Product-market fit assessment and validation',
        icon: <BarChart3 className="w-5 h-5" />,
        color: 'bg-red-600',
        confidence: 80,
        weight: 0.80,
        findings: [
          'Market demand: High',
          'Differentiation: Strong',
          'Pricing sensitivity: Moderate',
          'Competition: Intense',
          'Timing: Optimal'
        ],
        data: { surveys: 350, focusGroups: 8, betaUsers: 45 },
        executionTime: 5
      },
      {
        id: 'business-model',
        name: 'Business Model Analysis',
        description: 'Revenue model and business strategy evaluation',
        icon: <TrendingUp className="w-5 h-5" />,
        color: 'bg-teal-600',
        confidence: 85,
        weight: 0.85,
        findings: [
          'Model: SaaS subscription',
          'Revenue projection: $2M Year 1',
          'Customer acquisition: $150',
          'Lifetime value: $1,800',
          'Break-even: Month 14'
        ],
        data: { scenarios: 5, models: 'Tested', projections: '3-year' },
        executionTime: 8
      }
    ]
  }
];

export const ParallelSynthesisDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(RESEARCH_SCENARIOS[0]);
  const [streams, setStreams] = useState<AnalysisStream[]>([]);
  const [synthesisPhases, setSynthesisPhases] = useState<SynthesisPhase[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [speed, setSpeed] = useState(2);
  const [executionLog, setExecutionLog] = useState<string[]>([]);

  const initializeSynthesisPhases = () => [
    {
      id: 'weighting',
      name: 'Weight Analysis',
      description: 'Assess reliability and relevance of each stream',
      status: 'pending' as const
    },
    {
      id: 'themes',
      name: 'Theme Identification',
      description: 'Find common patterns across streams',
      status: 'pending' as const
    },
    {
      id: 'conflicts',
      name: 'Conflict Resolution',
      description: 'Reconcile contradictions between streams',
      status: 'pending' as const
    },
    {
      id: 'synthesis',
      name: 'Unified Synthesis',
      description: 'Generate integrated comprehensive insights',
      status: 'pending' as const
    }
  ];

  const resetDemo = useCallback(() => {
    const initialStreams: AnalysisStream[] = selectedScenario.streams.map(stream => ({
      ...stream,
      status: 'pending' as const
    }));
    setStreams(initialStreams);
    setSynthesisPhases(initializeSynthesisPhases());
    setIsRunning(false);
    setCurrentPhase('');
    setExecutionLog([]);
  }, [selectedScenario]);

  useEffect(() => {
    resetDemo();
  }, [resetDemo]);

  const runParallelSynthesis = useCallback(async () => {
    setIsRunning(true);
    setExecutionLog(['🚀 Starting parallel synthesis process...']);

    // Phase 1: Launch all streams in parallel
    setCurrentPhase('parallel-processing');
    setExecutionLog(prev => [...prev, '⚡ Launching all analysis streams in parallel...']);
    
    // Start all streams simultaneously
    setStreams(prev => prev.map(stream => ({ ...stream, status: 'running' })));
    
    // Simulate parallel execution with different completion times
    const streamPromises = streams.map(async (stream, index) => {
      const executionTime = (stream.executionTime * 1000) / speed;
      await new Promise(resolve => setTimeout(resolve, executionTime));
      
      setStreams(prev => prev.map(s => 
        s.id === stream.id ? { ...s, status: 'completed' } : s
      ));
      
      setExecutionLog(prev => [...prev, `✅ ${stream.name} completed (${stream.confidence}% confidence)`]);
      return stream;
    });

    await Promise.all(streamPromises);
    
    setExecutionLog(prev => [...prev, '🔄 All streams completed. Beginning synthesis...']);
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Phase 2: Synthesis process
    const phases = initializeSynthesisPhases();
    
    for (const phase of phases) {
      setCurrentPhase(phase.id);
      setSynthesisPhases(prev => prev.map(p => 
        p.id === phase.id ? { ...p, status: 'running' } : p
      ));
      
      setExecutionLog(prev => [...prev, `🔍 ${phase.name}: ${phase.description}`]);
      
      await new Promise(resolve => setTimeout(resolve, 2000 / speed));
      
      // Generate phase-specific results
      let result = '';
      switch (phase.id) {
        case 'weighting':
          result = `Confidence weights calculated: ${streams.map(s => `${s.name}: ${s.weight}`).join(', ')}`;
          break;
        case 'themes':
          result = 'Common themes: Growth opportunity, Integration challenges, Customer readiness';
          break;
        case 'conflicts':
          result = 'Resolved conflicts in market sizing and competitive intensity through weighted averaging';
          break;
        case 'synthesis':
          result = 'Unified insights generated with cross-stream validation and confidence scoring';
          break;
      }
      
      setSynthesisPhases(prev => prev.map(p => 
        p.id === phase.id ? { ...p, status: 'completed', result } : p
      ));
      
      setExecutionLog(prev => [...prev, `✅ ${phase.name} completed: ${result}`]);
    }

    setExecutionLog(prev => [...prev, '🎯 Parallel synthesis complete! Comprehensive report generated.']);
    setIsRunning(false);
    setCurrentPhase('');
  }, [streams, speed]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'running': return <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />;
      default: return <div className="w-4 h-4 rounded-full border-2 border-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500 bg-green-900/20';
      case 'running': return 'border-blue-500 bg-blue-900/20';
      default: return 'border-gray-600 bg-gray-800/20';
    }
  };

  const allStreamsCompleted = streams.length > 0 && streams.every(s => s.status === 'completed');
  const anyPhaseRunning = synthesisPhases.some(p => p.status === 'running');

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">🧩</span>
          Parallel Synthesis Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch multiple analysis streams run in parallel, then observe how their outputs are synthesized into unified insights.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Research Scenario
            </label>
            <select
              value={selectedScenario.id}
              onChange={(e) => {
                const scenario = RESEARCH_SCENARIOS.find(s => s.id === e.target.value);
                if (scenario) setSelectedScenario(scenario);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {RESEARCH_SCENARIOS.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>{scenario.title}</option>
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
              className="w-full accent-purple-500"
            />
            <div className="text-sm text-gray-400">{speed}x speed</div>
          </div>

          <div className="flex items-end">
            <div className="flex space-x-2">
              <button
                onClick={runParallelSynthesis}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  isRunning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Processing...' : 'Start Synthesis'}
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

        {/* Scenario Description */}
        <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
          <h4 className="font-medium text-white mb-2">Research Scenario</h4>
          <p className="text-sm text-gray-300">{selectedScenario.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parallel Streams */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Parallel Analysis Streams</h3>
            <div className="text-sm text-gray-400">
              {streams.filter(s => s.status === 'completed').length}/{streams.length} completed
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {streams.map((stream) => (
              <div
                key={stream.id}
                className={`p-4 rounded-lg border transition-all ${getStatusColor(stream.status)}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded ${stream.color} text-white`}>
                      {stream.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-sm">{stream.name}</h4>
                      <p className="text-xs text-gray-400">{stream.description}</p>
                    </div>
                  </div>
                  {getStatusIcon(stream.status)}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Confidence:</span>
                    <span className="text-blue-400">{stream.confidence}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Weight:</span>
                    <span className="text-purple-400">{stream.weight}</span>
                  </div>
                </div>

                {stream.status === 'completed' && (
                  <div className="mt-3 pt-3 border-t border-gray-600">
                    <h5 className="text-xs font-medium text-gray-300 mb-1">Key Findings:</h5>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {stream.findings.slice(0, 3).map((finding, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-400 mr-1">•</span>
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Synthesis Process */}
          {allStreamsCompleted && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Synthesis Process</h3>
              <div className="space-y-3">
                {synthesisPhases.map((phase) => (
                  <div
                    key={phase.id}
                    className={`p-4 rounded-lg border transition-all ${getStatusColor(phase.status)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{phase.name}</h4>
                        <p className="text-sm text-gray-400">{phase.description}</p>
                        {phase.result && (
                          <p className="text-xs text-gray-300 mt-2 italic">{phase.result}</p>
                        )}
                      </div>
                      {getStatusIcon(phase.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Execution Log */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Process Log</h3>
          <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 h-96 overflow-y-auto">
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
      </div>

      {/* Results Summary */}
      {!isRunning && allStreamsCompleted && synthesisPhases.every(p => p.status === 'completed') && (
        <div className="mt-6 p-6 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30">
          <h4 className="font-medium text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            Synthesis Complete: Unified Research Report
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-300">Streams Processed:</span>
              <span className="text-white ml-2">{streams.length}</span>
            </div>
            <div>
              <span className="font-medium text-gray-300">Average Confidence:</span>
              <span className="text-green-400 ml-2">
                {Math.round(streams.reduce((acc, s) => acc + s.confidence, 0) / streams.length)}%
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-300">Synthesis Quality:</span>
              <span className="text-blue-400 ml-2">High</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-800/40 rounded border-l-4 border-purple-400">
            <p className="text-sm text-gray-200">
              <strong>Final Output:</strong> Comprehensive analysis successfully synthesized from {streams.length} parallel streams. 
              Cross-validated insights with weighted confidence scoring provide robust foundation for strategic decision-making. 
              Conflicts resolved through statistical weighting and domain expertise integration.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParallelSynthesisDemo;