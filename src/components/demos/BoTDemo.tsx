'use client';

import React, { useState, useEffect } from 'react';
import { PlayCircle, RotateCcw, Brain, Search, Zap, BookOpen, TrendingUp, Database, ShoppingCart, Users } from 'lucide-react';

interface ThoughtPattern {
  id: string;
  name: string;
  icon: string;
  template: string[];
  successRate: number;
  usageCount: number;
  domain: string;
  status: 'stored' | 'matching' | 'applied' | 'updated';
}

interface Problem {
  id: string;
  description: string;
  context: string;
  status: 'new' | 'analyzing' | 'solved';
}

interface PatternMatch {
  patternId: string;
  relevance: number;
  application: string[];
  result: string;
}

interface Scenario {
  id: string;
  title: string;
  icon: React.ReactNode;
  initialBuffer: ThoughtPattern[];
  problem: Problem;
  matches: PatternMatch[];
  newPattern: ThoughtPattern;
  nextProblem: Problem;
  reuseDemo: {
    matchedPattern: string;
    quickSolution: string;
  };
}

type Phase = 'idle' | 'buffer' | 'problem' | 'matching' | 'application' | 'update' | 'reuse' | 'complete';

export default function BoTDemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>('ecommerce');
  const [phase, setPhase] = useState<Phase>('idle');
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedPatterns, setRevealedPatterns] = useState<Set<string>>(new Set());
  const [revealedMatches, setRevealedMatches] = useState<Set<string>>(new Set());

  const scenarios: Scenario[] = [
    {
      id: 'ecommerce',
      title: 'E-Commerce Optimization',
      icon: <ShoppingCart className="w-5 h-5" />,
      initialBuffer: [
        {
          id: 'opt-1',
          name: 'Bottleneck Analysis',
          icon: '🔍',
          template: [
            'Identify the slowest component',
            'Measure baseline performance',
            'Apply targeted optimization',
            'Verify improvement'
          ],
          successRate: 87,
          usageCount: 24,
          domain: 'Performance',
          status: 'stored'
        },
        {
          id: 'opt-2',
          name: 'Systematic Debugging',
          icon: '🐛',
          template: [
            'Isolate variables',
            'Test each component',
            'Identify root cause',
            'Apply fix and validate'
          ],
          successRate: 92,
          usageCount: 31,
          domain: 'Debugging',
          status: 'stored'
        },
        {
          id: 'opt-3',
          name: 'Gradual Rollout',
          icon: '📈',
          template: [
            'Start with small test group',
            'Monitor metrics closely',
            'Expand incrementally',
            'Full deployment after validation'
          ],
          successRate: 95,
          usageCount: 18,
          domain: 'Deployment',
          status: 'stored'
        }
      ],
      problem: {
        id: 'prob-1',
        description: 'Checkout process taking 45 seconds',
        context: 'Customer complaints about slow payment processing',
        status: 'new'
      },
      matches: [
        {
          patternId: 'opt-1',
          relevance: 95,
          application: [
            'Identified bottleneck: Payment API',
            'Baseline: 45s per checkout',
            'Found 7 redundant API calls',
            'Optimization: Batch requests'
          ],
          result: 'Reduced to 12 seconds (73% improvement)'
        },
        {
          patternId: 'opt-2',
          relevance: 88,
          application: [
            'Isolated payment step',
            'Tested API call sequence',
            'Root cause: Sequential processing',
            'Fix: Parallel request processing'
          ],
          result: 'Further reduced to 8 seconds'
        },
        {
          patternId: 'opt-3',
          relevance: 90,
          application: [
            'Test group: 10% of traffic',
            'Monitor: Error rates, latency',
            'Expand: 10% → 50% → 100%',
            'Full deployment after 48hrs'
          ],
          result: 'Safe rollout with zero incidents'
        }
      ],
      newPattern: {
        id: 'new-1',
        name: 'API Request Optimization',
        icon: '⚡',
        template: [
          'Audit all API calls in flow',
          'Identify redundant/sequential calls',
          'Implement batching and parallelization',
          'Monitor performance impact'
        ],
        successRate: 0,
        usageCount: 0,
        domain: 'API Performance',
        status: 'stored'
      },
      nextProblem: {
        id: 'prob-2',
        description: 'Search API responding slowly',
        context: 'Product search taking 6 seconds',
        status: 'new'
      },
      reuseDemo: {
        matchedPattern: 'API Request Optimization',
        quickSolution: 'Applied learned pattern: Found 12 redundant search calls, implemented caching, reduced to 1.2s'
      }
    },
    {
      id: 'database',
      title: 'Database Performance',
      icon: <Database className="w-5 h-5" />,
      initialBuffer: [
        {
          id: 'db-1',
          name: 'Query Analysis',
          icon: '🔍',
          template: [
            'Profile slow queries',
            'Analyze execution plans',
            'Identify missing indexes',
            'Implement optimizations'
          ],
          successRate: 89,
          usageCount: 42,
          domain: 'Database',
          status: 'stored'
        },
        {
          id: 'db-2',
          name: 'Caching Strategy',
          icon: '💾',
          template: [
            'Identify frequently accessed data',
            'Design cache key structure',
            'Implement cache layer',
            'Set TTL and invalidation rules'
          ],
          successRate: 91,
          usageCount: 28,
          domain: 'Caching',
          status: 'stored'
        },
        {
          id: 'db-3',
          name: 'Load Distribution',
          icon: '⚖️',
          template: [
            'Analyze query patterns',
            'Separate read/write workloads',
            'Implement read replicas',
            'Balance traffic distribution'
          ],
          successRate: 85,
          usageCount: 15,
          domain: 'Scalability',
          status: 'stored'
        }
      ],
      problem: {
        id: 'db-prob-1',
        description: 'User dashboard loading in 8 seconds',
        context: 'Complex aggregation queries on large dataset',
        status: 'new'
      },
      matches: [
        {
          patternId: 'db-1',
          relevance: 93,
          application: [
            'Profiled dashboard queries',
            'Found 3 full table scans',
            'Missing indexes on user_id, created_at',
            'Added composite indexes'
          ],
          result: 'Query time: 8s → 2.5s'
        },
        {
          patternId: 'db-2',
          relevance: 90,
          application: [
            'Dashboard data updates hourly',
            'Cache key: user_id + date',
            'Implemented Redis cache layer',
            'TTL: 1 hour with smart invalidation'
          ],
          result: 'Cache hit ratio: 85%, load time: 0.3s'
        },
        {
          patternId: 'db-3',
          relevance: 82,
          application: [
            'Dashboard is read-heavy',
            'Separated analytics queries',
            'Added 2 read replicas',
            'Route dashboard to replicas'
          ],
          result: 'Primary DB load reduced 60%'
        }
      ],
      newPattern: {
        id: 'new-db',
        name: 'Analytics Query Optimization',
        icon: '📊',
        template: [
          'Profile aggregation queries',
          'Add strategic indexes',
          'Implement materialized views or cache',
          'Route to read-optimized replicas'
        ],
        successRate: 0,
        usageCount: 0,
        domain: 'Analytics',
        status: 'stored'
      },
      nextProblem: {
        id: 'db-prob-2',
        description: 'Sales report generation taking 15 seconds',
        context: 'Monthly aggregations across millions of records',
        status: 'new'
      },
      reuseDemo: {
        matchedPattern: 'Analytics Query Optimization',
        quickSolution: 'Applied learned pattern: Created materialized view, added indexes, implemented hourly refresh, reduced to 1.8s'
      }
    },
    {
      id: 'engagement',
      title: 'User Engagement',
      icon: <Users className="w-5 h-5" />,
      initialBuffer: [
        {
          id: 'eng-1',
          name: 'User Journey Mapping',
          icon: '🗺️',
          template: [
            'Track user behavior flows',
            'Identify drop-off points',
            'Analyze friction causes',
            'Optimize critical paths'
          ],
          successRate: 86,
          usageCount: 22,
          domain: 'UX Analysis',
          status: 'stored'
        },
        {
          id: 'eng-2',
          name: 'A/B Testing Framework',
          icon: '🧪',
          template: [
            'Define hypothesis and metrics',
            'Create variant designs',
            'Split traffic evenly',
            'Measure statistical significance'
          ],
          successRate: 88,
          usageCount: 35,
          domain: 'Experimentation',
          status: 'stored'
        },
        {
          id: 'eng-3',
          name: 'Feedback Loop',
          icon: '🔄',
          template: [
            'Collect user feedback',
            'Categorize pain points',
            'Prioritize by impact',
            'Iterate on solutions'
          ],
          successRate: 84,
          usageCount: 19,
          domain: 'Product Development',
          status: 'stored'
        }
      ],
      problem: {
        id: 'eng-prob-1',
        description: 'Only 12% of users complete onboarding',
        context: '5-step signup process with high abandonment',
        status: 'new'
      },
      matches: [
        {
          patternId: 'eng-1',
          relevance: 94,
          application: [
            'Mapped complete onboarding flow',
            'Drop-off: 45% at step 3 (verification)',
            'Friction: Email verification required',
            'Optimization: Optional verification'
          ],
          result: 'Completion rate: 12% → 32%'
        },
        {
          patternId: 'eng-2',
          relevance: 91,
          application: [
            'Hypothesis: Shorter flow increases completion',
            'Variant A: 5 steps, B: 3 steps, C: Progressive',
            'Split: 33% each variant',
            'Winner: Progressive (42% completion)'
          ],
          result: 'Implemented progressive onboarding'
        },
        {
          patternId: 'eng-3',
          relevance: 87,
          application: [
            'Surveyed incomplete users',
            'Top complaint: Too many fields',
            'Priority: Reduce required info',
            'Solution: Ask only essentials upfront'
          ],
          result: 'Final completion rate: 47%'
        }
      ],
      newPattern: {
        id: 'new-eng',
        name: 'Progressive Onboarding',
        icon: '🚀',
        template: [
          'Map entire user journey',
          'Identify and reduce friction points',
          'Test simplified variations',
          'Implement progressive disclosure'
        ],
        successRate: 0,
        usageCount: 0,
        domain: 'Onboarding',
        status: 'stored'
      },
      nextProblem: {
        id: 'eng-prob-2',
        description: 'Feature adoption rate at 8%',
        context: 'New collaborative feature not being used',
        status: 'new'
      },
      reuseDemo: {
        matchedPattern: 'Progressive Onboarding',
        quickSolution: 'Applied learned pattern: Simplified feature intro, progressive tooltips, in-app guidance, adoption increased to 34%'
      }
    }
  ];

  const currentScenario = scenarios.find(s => s.id === selectedScenario) || scenarios[0];

  useEffect(() => {
    setPhase('idle');
    setRevealedPatterns(new Set());
    setRevealedMatches(new Set());
  }, [selectedScenario]);

  const runDemo = async () => {
    setIsAnimating(true);
    setPhase('idle');
    setRevealedPatterns(new Set());
    setRevealedMatches(new Set());

    await new Promise(resolve => setTimeout(resolve, 300));

    setPhase('buffer');
    for (let i = 0; i < currentScenario.initialBuffer.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setRevealedPatterns(prev => new Set([...prev, currentScenario.initialBuffer[i].id]));
    }

    await new Promise(resolve => setTimeout(resolve, 800));
    setPhase('problem');

    await new Promise(resolve => setTimeout(resolve, 1000));
    setPhase('matching');

    await new Promise(resolve => setTimeout(resolve, 1200));
    setPhase('application');
    for (let i = 0; i < currentScenario.matches.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setRevealedMatches(prev => new Set([...prev, currentScenario.matches[i].patternId]));
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    setPhase('update');

    await new Promise(resolve => setTimeout(resolve, 1200));
    setPhase('reuse');

    await new Promise(resolve => setTimeout(resolve, 800));
    setPhase('complete');
    setIsAnimating(false);
  };

  const reset = () => {
    setPhase('idle');
    setRevealedPatterns(new Set());
    setRevealedMatches(new Set());
  };

  const getPhaseStyle = (currentPhase: Phase, targetPhase: Phase) => {
    if (phase === targetPhase) return 'border-blue-500 bg-blue-500/10';
    if (phases.indexOf(phase) > phases.indexOf(targetPhase)) return 'border-green-500 bg-green-500/10';
    return 'border-slate-600 bg-slate-800/50';
  };

  const phases: Phase[] = ['idle', 'buffer', 'problem', 'matching', 'application', 'update', 'reuse', 'complete'];

  return (
    <div className="w-full space-y-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Brain className="w-8 h-8 text-purple-400" />
          Buffer of Thoughts (BoT)
        </h2>
        <div className="flex gap-2">
          <button
            onClick={runDemo}
            disabled={isAnimating}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <PlayCircle className="w-4 h-4" />
            Run Demo
          </button>
          <button
            onClick={reset}
            disabled={isAnimating}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {scenarios.map(scenario => (
          <button
            key={scenario.id}
            onClick={() => setSelectedScenario(scenario.id)}
            disabled={isAnimating}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              selectedScenario === scenario.id
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {scenario.icon}
            {scenario.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {[
          { phase: 'buffer', label: 'Buffer', icon: '🧠' },
          { phase: 'problem', label: 'Problem', icon: '❓' },
          { phase: 'matching', label: 'Match', icon: '🔍' },
          { phase: 'application', label: 'Apply', icon: '⚡' },
          { phase: 'update', label: 'Learn', icon: '📝' },
          { phase: 'reuse', label: 'Reuse', icon: '🔄' },
          { phase: 'complete', label: 'Done', icon: '✅' }
        ].map(({ phase: p, label, icon }) => (
          <div
            key={p}
            className={`p-3 rounded-lg border-2 text-center transition-all ${getPhaseStyle(phase, p as Phase)}`}
          >
            <div className="text-2xl mb-1">{icon}</div>
            <div className="text-xs text-slate-300 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {(phase === 'buffer' || phases.indexOf(phase) > phases.indexOf('buffer')) && (
        <div className="bg-slate-900/50 border border-purple-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Thought Buffer (Stored Patterns)
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {currentScenario.initialBuffer.map(pattern => (
              <div
                key={pattern.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  revealedPatterns.has(pattern.id)
                    ? 'border-purple-500 bg-purple-500/10 opacity-100'
                    : 'border-slate-700 bg-slate-800/50 opacity-30'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{pattern.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">{pattern.name}</div>
                    <div className="text-xs text-slate-400">{pattern.domain}</div>
                  </div>
                </div>
                <div className="space-y-1 mb-3">
                  {pattern.template.map((step, idx) => (
                    <div key={idx} className="text-xs text-slate-300 flex items-start gap-1">
                      <span className="text-purple-400">→</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 text-xs">
                  <span className="text-green-400">✓ {pattern.successRate}% success</span>
                  <span className="text-blue-400">↻ {pattern.usageCount} uses</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(phase === 'problem' || phases.indexOf(phase) > phases.indexOf('problem')) && (
        <div className="bg-slate-900/50 border border-red-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">❓</span>
            New Problem Arrives
          </h3>
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="font-semibold text-white mb-2">{currentScenario.problem.description}</div>
            <div className="text-sm text-slate-300">{currentScenario.problem.context}</div>
          </div>
        </div>
      )}

      {(phase === 'matching' || phases.indexOf(phase) > phases.indexOf('matching')) && (
        <div className="bg-slate-900/50 border border-yellow-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-yellow-400" />
            Pattern Matching (Analogical Reasoning)
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {currentScenario.matches.map(match => {
              const pattern = currentScenario.initialBuffer.find(p => p.id === match.patternId);
              return (
                <div
                  key={match.patternId}
                  className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg">{pattern?.icon}</span>
                    <span className="text-xs font-semibold text-yellow-400">{match.relevance}% match</span>
                  </div>
                  <div className="font-semibold text-white text-sm mb-2">{pattern?.name}</div>
                  <div className="text-xs text-slate-400">Pattern retrieved from buffer</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {(phase === 'application' || phases.indexOf(phase) > phases.indexOf('application')) && (
        <div className="bg-slate-900/50 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-400" />
            Pattern Application & Results
          </h3>
          <div className="space-y-4">
            {currentScenario.matches.map(match => {
              const pattern = currentScenario.initialBuffer.find(p => p.id === match.patternId);
              return (
                <div
                  key={match.patternId}
                  className={`rounded-lg border-2 p-4 transition-all ${
                    revealedMatches.has(match.patternId)
                      ? 'border-blue-500 bg-blue-500/10 opacity-100'
                      : 'border-slate-700 bg-slate-800/50 opacity-30'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{pattern?.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-white mb-1">{pattern?.name} Applied</div>
                      <div className="grid md:grid-cols-2 gap-2">
                        {match.application.map((step, idx) => (
                          <div key={idx} className="text-xs text-slate-300 flex items-start gap-1">
                            <span className="text-blue-400">{idx + 1}.</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-900/30 border border-green-500/30 rounded px-3 py-2 text-sm text-green-300">
                    <span className="font-semibold">Result:</span> {match.result}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {(phase === 'update' || phases.indexOf(phase) > phases.indexOf('update')) && (
        <div className="bg-slate-900/50 border border-green-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-400" />
            Buffer Update: New Pattern Learned
          </h3>
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{currentScenario.newPattern.icon}</span>
              <div>
                <div className="font-semibold text-white text-lg">{currentScenario.newPattern.name}</div>
                <div className="text-sm text-slate-400">{currentScenario.newPattern.domain}</div>
              </div>
              <div className="ml-auto">
                <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold">
                  ✨ NEW
                </span>
              </div>
            </div>
            <div className="space-y-1">
              {currentScenario.newPattern.template.map((step, idx) => (
                <div key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-green-400 font-semibold">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-green-300 italic">
              Pattern extracted from successful solution and added to buffer for future reuse
            </div>
          </div>
        </div>
      )}

      {(phase === 'reuse' || phase === 'complete') && (
        <div className="bg-slate-900/50 border border-cyan-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Accelerated Problem Solving (Pattern Reuse)
          </h3>
          <div className="space-y-4">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
              <div className="font-semibold text-white text-sm mb-1">Next Problem:</div>
              <div className="text-sm text-slate-300">{currentScenario.nextProblem.description}</div>
              <div className="text-xs text-slate-400 mt-1">{currentScenario.nextProblem.context}</div>
            </div>
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="font-semibold text-white mb-2">
                    Instant Match: {currentScenario.reuseDemo.matchedPattern}
                  </div>
                  <div className="text-sm text-slate-300 mb-3">
                    {currentScenario.reuseDemo.quickSolution}
                  </div>
                  <div className="text-xs text-cyan-300 italic">
                    ⚡ Problem solved in seconds using learned pattern - no need to derive solution from scratch!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <div className="font-semibold text-purple-400">1. Buffer Maintenance</div>
            <div className="text-slate-300">
              System maintains a dynamic buffer of proven thought patterns with success rates and usage tracking
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-yellow-400">2. Analogical Matching</div>
            <div className="text-slate-300">
              When new problems arrive, system finds relevant patterns through similarity matching
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-blue-400">3. Pattern Application</div>
            <div className="text-slate-300">
              Retrieved patterns are adapted and applied to solve the current problem
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-green-400">4. Learning & Storage</div>
            <div className="text-slate-300">
              Successful solutions are abstracted into new patterns and added to buffer
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-cyan-400">5. Accelerated Reuse</div>
            <div className="text-slate-300">
              Future similar problems are solved instantly using learned patterns
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-orange-400">6. Continuous Improvement</div>
            <div className="text-slate-300">
              Buffer evolves over time, pruning ineffective patterns and promoting successful ones
            </div>
          </div>
        </div>
      </div>

      {phase === 'complete' && (
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Key Insight
          </h3>
          <p className="text-slate-300">
            Buffer of Thoughts creates a <span className="text-purple-400 font-semibold">learning system</span> that gets smarter over time.
            By maintaining reusable thought patterns and applying them through analogical reasoning,
            it enables <span className="text-cyan-400 font-semibold">instant problem-solving</span> for similar challenges
            without deriving solutions from scratch each time.
          </p>
        </div>
      )}
    </div>
  );
}