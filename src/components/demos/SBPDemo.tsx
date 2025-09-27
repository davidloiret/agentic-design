'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Lightbulb, Target, CheckCircle, Layers, BookOpen, PlayCircle, RotateCcw, Sparkles, TrendingUp, ArrowDown } from 'lucide-react';

interface StepBackQuestion {
  id: string;
  question: string;
  principle: string;
  explanation: string;
}

interface Approach {
  id: string;
  name: string;
  principle: string;
  steps: string[];
  result: string;
}

interface Scenario {
  id: string;
  title: string;
  specificProblem: string;
  directApproach: {
    solution: string;
    limitations: string[];
  };
  stepBackQuestions: StepBackQuestion[];
  principleBasedApproaches: Approach[];
  deeperInsight: string;
  transferableKnowledge: string[];
}

const SBPDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('geometry');
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'problem' | 'stepback' | 'principles' | 'apply' | 'insight' | 'transfer' | 'complete'>('problem');
  const [showDirectApproach, setShowDirectApproach] = useState(false);
  const [revealedQuestions, setRevealedQuestions] = useState<Set<string>>(new Set());
  const [revealedPrinciples, setRevealedPrinciples] = useState<Set<string>>(new Set());
  const [appliedApproaches, setAppliedApproaches] = useState<Set<string>>(new Set());
  const [activeApproach, setActiveApproach] = useState<string | null>(null);
  const [showInsight, setShowInsight] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  const scenarios: Scenario[] = [
    {
      id: 'geometry',
      title: 'Calculate Trapezoid Area',
      specificProblem: 'Calculate the area of a trapezoid with bases 12cm and 8cm, and height 5cm',
      directApproach: {
        solution: 'Apply formula: A = ½(b₁ + b₂)h = ½(12 + 8) × 5 = 50cm²',
        limitations: [
          'Formula memorization without understanding',
          'No verification method',
          'Can\'t adapt to irregular shapes',
          'Limited transfer to other problems'
        ]
      },
      stepBackQuestions: [
        {
          id: 'q1',
          question: 'What is the fundamental concept of area?',
          principle: 'Area Fundamentals',
          explanation: 'Area represents the amount of 2D space enclosed by a shape. It can be measured, decomposed, and approximated using various methods.'
        },
        {
          id: 'q2',
          question: 'How can complex shapes be broken down?',
          principle: 'Geometric Decomposition',
          explanation: 'Complex shapes can be divided into simpler components (rectangles, triangles) whose areas are easier to calculate and then summed.'
        },
        {
          id: 'q3',
          question: 'What verification strategies exist for geometric calculations?',
          principle: 'Mathematical Verification',
          explanation: 'Multiple independent methods should yield the same result. Cross-verification ensures accuracy and builds confidence.'
        }
      ],
      principleBasedApproaches: [
        {
          id: 'a1',
          name: 'Decomposition Method',
          principle: 'Break complex shapes into simple components',
          steps: [
            'Split trapezoid into rectangle (8×5) and triangle (4×5)',
            'Calculate rectangle: 8 × 5 = 40cm²',
            'Calculate triangle: ½ × 4 × 5 = 10cm²',
            'Sum components: 40 + 10 = 50cm²'
          ],
          result: '50cm² (verified through component analysis)'
        },
        {
          id: 'a2',
          name: 'Averaging Method',
          principle: 'Use averaging to approximate irregular shapes',
          steps: [
            'Average the two bases: (12 + 8) ÷ 2 = 10cm',
            'Multiply average by height: 10 × 5',
            'Result: 50cm²',
            'Insight: This IS the trapezoid formula!'
          ],
          result: '50cm² (understood as averaged base × height)'
        },
        {
          id: 'a3',
          name: 'Formula Verification',
          principle: 'Multiple methods confirm correctness',
          steps: [
            'Apply standard formula: A = ½(b₁ + b₂)h',
            'Calculate: ½(12 + 8) × 5 = 50cm²',
            'Compare with other methods: ✓ All agree!',
            'Confidence: High (triple-verified)'
          ],
          result: '50cm² (confirmed by convergence)'
        }
      ],
      deeperInsight: 'The trapezoid formula IS averaging! ½(b₁ + b₂) computes the average base, then multiplies by height. All methods connect to fundamental area principles of decomposition and averaging.',
      transferableKnowledge: [
        'Any polygon can be decomposed into triangles',
        'Integration uses averaging to find area under curves',
        'Volume formulas extend these 2D principles to 3D',
        'Verification through multiple methods is universally applicable'
      ]
    },
    {
      id: 'performance',
      title: 'Optimize Database Query',
      specificProblem: 'Query taking 5 seconds to fetch user data from database. How to optimize?',
      directApproach: {
        solution: 'Add an index on the user_id column: CREATE INDEX idx_user_id ON users(user_id)',
        limitations: [
          'Doesn\'t explain why it\'s slow',
          'May not work for all query types',
          'Doesn\'t consider trade-offs',
          'No systematic approach for future issues'
        ]
      },
      stepBackQuestions: [
        {
          id: 'p1',
          question: 'What are the fundamental causes of database slowness?',
          principle: 'Database Performance Principles',
          explanation: 'Queries are slow due to: full table scans, missing indexes, inefficient joins, network latency, or resource contention. Understanding the cause guides the solution.'
        },
        {
          id: 'p2',
          question: 'How do indexes improve query performance?',
          principle: 'Index Data Structures',
          explanation: 'Indexes create sorted data structures (B-trees, hash tables) that enable O(log n) lookups instead of O(n) full scans. Trade-off: write performance and storage.'
        },
        {
          id: 'p3',
          question: 'What are the optimization strategies for data access?',
          principle: 'Query Optimization Hierarchy',
          explanation: 'Optimize in order: 1) Query design (minimize data), 2) Indexes (fast access), 3) Caching (avoid queries), 4) Scaling (more resources).'
        }
      ],
      principleBasedApproaches: [
        {
          id: 'p-a1',
          name: 'Analyze Execution Plan',
          principle: 'Understand before optimizing',
          steps: [
            'Run EXPLAIN on query to see execution plan',
            'Identify: Full table scan on users table (500K rows)',
            'Bottleneck: No index on frequently searched column',
            'Solution: Add index on user_id'
          ],
          result: 'Query time: 5s → 50ms (100x improvement)'
        },
        {
          id: 'p-a2',
          name: 'Reduce Data Transfer',
          principle: 'Minimize data movement',
          steps: [
            'Review query: SELECT * FROM users',
            'Identify: Fetching 50 columns, only need 5',
            'Optimize: SELECT id, name, email, status, created_at',
            'Result: Less network transfer, less memory'
          ],
          result: 'Query time: 5s → 2s, plus memory savings'
        },
        {
          id: 'p-a3',
          name: 'Implement Caching',
          principle: 'Cache frequently accessed data',
          steps: [
            'Pattern: User data rarely changes, frequently read',
            'Strategy: Cache in Redis with 5-minute TTL',
            'Implementation: Check cache → DB on miss → Update cache',
            'Result: 95% cache hit rate'
          ],
          result: 'Average query time: 5s → 5ms (1000x for cached)'
        }
      ],
      deeperInsight: 'Performance optimization is hierarchical: First understand the bottleneck (execution plan), then apply appropriate strategy (indexing, caching, query optimization). The solution depends on the root cause, not just symptoms.',
      transferableKnowledge: [
        'Always measure before optimizing (execution plans, profiling)',
        'Optimize in layers: query design → indexes → caching → scaling',
        'Trade-offs exist: index speed vs write cost, cache freshness vs speed',
        'Same principles apply to API optimization, frontend performance, etc.'
      ]
    },
    {
      id: 'business',
      title: 'Increase Customer Retention',
      specificProblem: 'Customer churn rate is 15% per month. How to reduce it?',
      directApproach: {
        solution: 'Offer 20% discount to customers who are about to leave',
        limitations: [
          'Treats symptom, not root cause',
          'Erodes profit margins',
          'Doesn\'t address why customers leave',
          'Not sustainable long-term'
        ]
      },
      stepBackQuestions: [
        {
          id: 'b1',
          question: 'What drives customer loyalty and retention?',
          principle: 'Customer Retention Psychology',
          explanation: 'Customers stay when they receive value, have positive experiences, face switching costs, and build habits. Understanding drivers enables targeted intervention.'
        },
        {
          id: 'b2',
          question: 'How do successful companies reduce churn?',
          principle: 'Retention Best Practices',
          explanation: 'Leading companies: 1) Measure engagement metrics, 2) Identify at-risk customers early, 3) Improve product value, 4) Build community, 5) Create switching barriers.'
        },
        {
          id: 'b3',
          question: 'What are the stages of customer lifecycle?',
          principle: 'Customer Journey Framework',
          explanation: 'Acquisition → Onboarding → Activation → Engagement → Retention → Advocacy. Each stage needs different strategies. Churn often stems from poor onboarding/activation.'
        }
      ],
      principleBasedApproaches: [
        {
          id: 'b-a1',
          name: 'Identify Churn Drivers',
          principle: 'Understand root causes through data',
          steps: [
            'Analyze churned customers: 60% never activated key feature',
            'Survey feedback: "Couldn\'t figure out how to use it"',
            'Insight: Onboarding problem, not value problem',
            'Focus: Improve activation, not discount pricing'
          ],
          result: 'Churn reduced: 15% → 8% (targeting root cause)'
        },
        {
          id: 'b-a2',
          name: 'Improve Onboarding',
          principle: 'First 7 days determine retention',
          steps: [
            'Create interactive product tour for new users',
            'Send email series explaining key features',
            'Offer 1-on-1 onboarding call for enterprise',
            'Measure: Time to first value (activation metric)'
          ],
          result: 'Activation rate: 40% → 75% (early success = retention)'
        },
        {
          id: 'b-a3',
          name: 'Build Engagement Loop',
          principle: 'Create habits through regular value',
          steps: [
            'Identify core value action: Report generation',
            'Send weekly insights email (pull users back)',
            'Add collaboration features (team lock-in)',
            'Gamification: Progress tracking, milestones'
          ],
          result: 'DAU/MAU ratio: 25% → 45% (stronger engagement)'
        }
      ],
      deeperInsight: 'Churn is rarely about price - it\'s about value delivery and engagement. By stepping back to understand customer psychology and journey stages, we identify that poor onboarding (not value) drives churn. Address the root cause, not symptoms.',
      transferableKnowledge: [
        'Data analysis reveals true problems vs perceived problems',
        'Customer psychology applies across products and industries',
        'Lifecycle stage thinking (onboarding, engagement, retention) is universal',
        'Sustainable solutions address root causes, not symptoms'
      ]
    }
  ];

  const getCurrentScenario = (): Scenario => {
    return scenarios.find(s => s.id === selectedScenario) || scenarios[0];
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentPhase('problem');
    setShowDirectApproach(false);
    setRevealedQuestions(new Set());
    setRevealedPrinciples(new Set());
    setAppliedApproaches(new Set());
    setActiveApproach(null);
    setShowInsight(false);
    setShowTransfer(false);
    setAnimationProgress(0);
  };

  const runStepBackPrompting = async () => {
    resetDemo();
    setIsRunning(true);
    const scenario = getCurrentScenario();

    // Phase 1: Show Problem & Direct Approach
    setCurrentPhase('problem');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowDirectApproach(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Phase 2: Step Back to Broader Questions
    setCurrentPhase('stepback');
    for (const question of scenario.stepBackQuestions) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setRevealedQuestions(prev => new Set([...prev, question.id]));
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Phase 3: Answer with Principles
    setCurrentPhase('principles');
    for (const question of scenario.stepBackQuestions) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRevealedPrinciples(prev => new Set([...prev, question.id]));
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Phase 4: Apply Principles to Specific Problem
    setCurrentPhase('apply');
    for (const approach of scenario.principleBasedApproaches) {
      setActiveApproach(approach.id);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAppliedApproaches(prev => new Set([...prev, approach.id]));
      setActiveApproach(null);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Phase 5: Deeper Insight
    setCurrentPhase('insight');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowInsight(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Phase 6: Transferable Knowledge
    setCurrentPhase('transfer');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowTransfer(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCurrentPhase('complete');
    setIsRunning(false);
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'problem': return 'bg-red-950 border-red-800';
      case 'stepback': return 'bg-yellow-950 border-yellow-800';
      case 'principles': return 'bg-purple-950 border-purple-800';
      case 'apply': return 'bg-blue-950 border-blue-800';
      case 'insight': return 'bg-indigo-950 border-indigo-800';
      case 'transfer': return 'bg-green-950 border-green-800';
      case 'complete': return 'bg-green-950 border-green-600';
      default: return 'bg-gray-900 border-gray-700';
    }
  };

  const scenario = getCurrentScenario();

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Step-Back Prompting Demo</h2>
        <p className="text-gray-400 mb-6">
          Abstract to higher-level principles before tackling specific problems. Step back to gain
          broader perspective, then apply general knowledge to achieve better solutions.
        </p>

        {/* Scenario Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200">Select Problem Domain</h3>
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

        {/* Phase Pipeline */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Step-Back Reasoning Process
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {['problem', 'stepback', 'principles', 'apply', 'insight', 'transfer'].map((phase) => (
              <div
                key={phase}
                className={`px-2 py-2 rounded-lg border-2 transition-all ${
                  currentPhase === phase
                    ? getPhaseColor(phase) + ' scale-105'
                    : currentPhase === 'complete' || ['problem', 'stepback', 'principles', 'apply', 'insight', 'transfer'].indexOf(currentPhase) > ['problem', 'stepback', 'principles', 'apply', 'insight', 'transfer'].indexOf(phase)
                    ? 'bg-gray-800 border-green-700'
                    : 'bg-gray-900 border-gray-700'
                }`}
              >
                <p className="text-xs font-medium text-gray-300 capitalize text-center">
                  {phase === 'stepback' ? 'Step Back' : phase}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Specific Problem */}
        <div className={`mb-6 p-4 rounded-lg border-2 transition-all ${
          currentPhase === 'problem' ? 'bg-red-950 border-red-800' : 'bg-gray-900 border-gray-700'
        }`}>
          <h3 className="text-lg font-semibold mb-2 text-gray-200 flex items-center gap-2">
            <Target className="w-5 h-5 text-red-400" />
            Specific Problem
          </h3>
          <p className="text-white text-lg mb-3">{scenario.specificProblem}</p>

          {showDirectApproach && (
            <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-600">
              <p className="text-xs font-medium text-gray-400 mb-2 flex items-center gap-2">
                <ArrowDown className="w-4 h-4" />
                ❌ Direct Approach (Limited Understanding)
              </p>
              <p className="text-sm text-gray-300 mb-2">{scenario.directApproach.solution}</p>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-red-400">Limitations:</p>
                {scenario.directApproach.limitations.map((lim, idx) => (
                  <p key={idx} className="text-xs text-gray-400">• {lim}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step-Back Questions */}
        {currentPhase !== 'problem' && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <ArrowUp className="w-5 h-5 text-yellow-400" />
              Step Back: Ask Broader Questions
            </h3>
            <div className="space-y-3">
              {scenario.stepBackQuestions.map(question => {
                const isRevealed = revealedQuestions.has(question.id);
                const isPrincipleRevealed = revealedPrinciples.has(question.id);

                return isRevealed ? (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      currentPhase === 'stepback' && !isPrincipleRevealed ? 'bg-yellow-950 border-yellow-600' :
                      isPrincipleRevealed ? 'bg-purple-950 border-purple-700' :
                      'bg-gray-900 border-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <Lightbulb className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        isPrincipleRevealed ? 'text-purple-400' : 'text-yellow-400'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-300 mb-1">{question.question}</p>

                        {isPrincipleRevealed && (
                          <div className="mt-3 pt-3 border-t border-purple-700">
                            <p className="text-xs font-semibold text-purple-300 mb-1">
                              {question.principle}
                            </p>
                            <p className="text-sm text-purple-200">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Apply Principles */}
        {appliedApproaches.size > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <ArrowDown className="w-5 h-5 text-blue-400" />
              Apply Principles to Specific Problem
            </h3>
            <div className="space-y-3">
              {scenario.principleBasedApproaches.map(approach => {
                const isApplied = appliedApproaches.has(approach.id);
                const isActive = activeApproach === approach.id;

                return isApplied ? (
                  <div
                    key={approach.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isActive ? 'bg-blue-950 border-blue-600 scale-105' :
                      'bg-blue-950 border-blue-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                      <h4 className="font-semibold text-white">{approach.name}</h4>
                    </div>
                    <p className="text-xs text-blue-300 mb-3 italic">
                      Principle: {approach.principle}
                    </p>
                    <div className="space-y-1 mb-3">
                      {approach.steps.map((step, idx) => (
                        <p key={idx} className="text-sm text-gray-300 pl-4">
                          {idx + 1}. {step}
                        </p>
                      ))}
                    </div>
                    <div className="bg-blue-900/50 rounded p-2">
                      <p className="text-sm font-medium text-blue-200">
                        ✓ {approach.result}
                      </p>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Deeper Insight */}
        {showInsight && (
          <div className={`mb-6 p-4 rounded-lg border-2 transition-all ${
            currentPhase === 'insight' ? 'bg-indigo-950 border-indigo-600' : 'bg-indigo-950 border-indigo-700'
          }`}>
            <h3 className="text-lg font-semibold mb-2 text-indigo-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Deeper Insight Through Abstraction
            </h3>
            <p className="text-white">{scenario.deeperInsight}</p>
          </div>
        )}

        {/* Transferable Knowledge */}
        {showTransfer && (
          <div className="mb-6 bg-green-950 border-2 border-green-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-green-300 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Transferable Knowledge (Generalization)
            </h3>
            <p className="text-sm text-green-200 mb-3">
              By reasoning at the principle level, these insights transfer to other domains:
            </p>
            <div className="space-y-2">
              {scenario.transferableKnowledge.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-100">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex gap-3">
          <button
            onClick={runStepBackPrompting}
            disabled={isRunning}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2"
          >
            {isRunning ? (
              <>
                <Layers className="w-5 h-5 animate-pulse" />
                Running Step-Back Reasoning...
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5" />
                Run Step-Back Prompting
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
            <BookOpen className="w-5 h-5 text-yellow-400" />
            How Step-Back Prompting Works
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">1.</span>
              <div>
                <p className="font-medium text-gray-200">Recognize Specific Problem</p>
                <p className="text-xs text-gray-400">Start with concrete problem that needs solving</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">2.</span>
              <div>
                <p className="font-medium text-gray-200">Step Back to Broader Questions</p>
                <p className="text-xs text-gray-400">Ask about general principles, concepts, and patterns</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">3.</span>
              <div>
                <p className="font-medium text-gray-200">Answer at Principle Level</p>
                <p className="text-xs text-gray-400">Establish foundational understanding first</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">4.</span>
              <div>
                <p className="font-medium text-gray-200">Apply Principles to Specific</p>
                <p className="text-xs text-gray-400">Use general knowledge to solve particular problem</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">5.</span>
              <div>
                <p className="font-medium text-gray-200">Gain Deeper Insight</p>
                <p className="text-xs text-gray-400">Understand WHY solutions work, not just HOW</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">6.</span>
              <div>
                <p className="font-medium text-gray-200">Transfer Knowledge</p>
                <p className="text-xs text-gray-400">Apply learned principles to new domains and problems</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insight */}
        <div className="mt-6 bg-purple-950 border border-purple-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-purple-300">Key Insight</h3>
          <p className="text-sm text-purple-200">
            Step-Back Prompting <strong>abstracts to higher-level principles</strong> before diving into specifics.
            This provides <strong>broader perspective, multiple solution paths, deeper understanding, and transferable knowledge</strong> -
            avoiding the limitations of pattern-matching direct approaches.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SBPDemo;