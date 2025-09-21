'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Brain, Zap, Activity, Target, Layers, GitBranch, Settings, AlertTriangle, CheckCircle, Info, TrendingUp } from 'lucide-react';

interface ReasoningStrategy {
  id: string;
  name: string;
  type: 'analytical' | 'creative' | 'systematic' | 'heuristic';
  complexity: 'low' | 'medium' | 'high';
  timeComplexity: number;
  accuracyRate: number;
  description: string;
  strengths: string[];
  weaknesses: string[];
  bestFor: string[];
}

interface Problem {
  id: string;
  description: string;
  type: 'optimization' | 'classification' | 'generation' | 'analysis';
  complexity: 'simple' | 'moderate' | 'complex';
  constraints: string[];
  objectives: string[];
  timeLimit: number;
  knownSolutions: number;
}

interface MetaDecision {
  problemId: string;
  selectedStrategy: string;
  reasoning: string;
  confidenceScore: number;
  alternativeStrategies: Array<{
    strategy: string;
    score: number;
    reason: string;
  }>;
  resourceAllocation: {
    time: number;
    compute: number;
    memory: number;
  };
}

interface StrategyExecution {
  strategyId: string;
  startTime: number;
  endTime: number;
  progress: number;
  intermediateResults: any[];
  resourceUsage: {
    time: number;
    compute: number;
    memory: number;
  };
  status: 'pending' | 'running' | 'completed' | 'failed' | 'switched';
}

interface MonitoringMetrics {
  currentProgress: number;
  expectedProgress: number;
  confidenceLevel: number;
  earlyStoppingSignals: string[];
  adaptationTriggers: string[];
  performanceIndicators: {
    accuracy: number;
    efficiency: number;
    robustness: number;
  };
}

interface StrategyAdaptation {
  timestamp: number;
  fromStrategy: string;
  toStrategy: string;
  reason: string;
  triggerType: 'performance' | 'timeout' | 'constraint' | 'discovery';
  improvement: number;
}

const REASONING_STRATEGIES: ReasoningStrategy[] = [
  {
    id: 'divide-conquer',
    name: 'Divide & Conquer',
    type: 'systematic',
    complexity: 'medium',
    timeComplexity: 3,
    accuracyRate: 0.85,
    description: 'Break complex problems into smaller subproblems',
    strengths: ['Handles complexity well', 'Parallelizable', 'Clear structure'],
    weaknesses: ['Overhead for simple problems', 'May miss holistic patterns'],
    bestFor: ['Large-scale problems', 'Hierarchical structures', 'Independent subtasks']
  },
  {
    id: 'first-principles',
    name: 'First Principles',
    type: 'analytical',
    complexity: 'high',
    timeComplexity: 5,
    accuracyRate: 0.92,
    description: 'Reason from fundamental truths and axioms',
    strengths: ['Deep understanding', 'Novel solutions', 'High accuracy'],
    weaknesses: ['Time-intensive', 'Requires domain knowledge', 'Complex setup'],
    bestFor: ['Novel problems', 'Scientific reasoning', 'Root cause analysis']
  },
  {
    id: 'analogical',
    name: 'Analogical Reasoning',
    type: 'creative',
    complexity: 'low',
    timeComplexity: 2,
    accuracyRate: 0.75,
    description: 'Draw parallels from similar problems',
    strengths: ['Fast insights', 'Creative solutions', 'Low overhead'],
    weaknesses: ['May miss nuances', 'Depends on good analogies', 'Variable accuracy'],
    bestFor: ['Familiar domains', 'Quick estimates', 'Creative tasks']
  },
  {
    id: 'constraint-satisfaction',
    name: 'Constraint Satisfaction',
    type: 'systematic',
    complexity: 'high',
    timeComplexity: 4,
    accuracyRate: 0.88,
    description: 'Find solutions within defined constraints',
    strengths: ['Handles complex requirements', 'Optimal solutions', 'Verifiable'],
    weaknesses: ['Computationally expensive', 'Rigid framework', 'Setup overhead'],
    bestFor: ['Optimization problems', 'Resource allocation', 'Scheduling']
  },
  {
    id: 'monte-carlo',
    name: 'Monte Carlo Tree Search',
    type: 'heuristic',
    complexity: 'medium',
    timeComplexity: 3,
    accuracyRate: 0.80,
    description: 'Explore solution space through sampling',
    strengths: ['Handles uncertainty', 'Anytime algorithm', 'Probabilistic guarantees'],
    weaknesses: ['Requires many samples', 'Approximate solutions', 'Randomness'],
    bestFor: ['Game playing', 'Decision trees', 'Uncertain environments']
  },
  {
    id: 'case-based',
    name: 'Case-Based Reasoning',
    type: 'heuristic',
    complexity: 'low',
    timeComplexity: 1,
    accuracyRate: 0.70,
    description: 'Adapt solutions from similar past cases',
    strengths: ['Very fast', 'Experience-based', 'Practical'],
    weaknesses: ['Limited to known patterns', 'May miss optimal solutions'],
    bestFor: ['Routine problems', 'Pattern matching', 'Quick decisions']
  }
];

const SAMPLE_PROBLEMS: Problem[] = [
  {
    id: 'route-optimization',
    description: 'Find optimal delivery route for 20 packages',
    type: 'optimization',
    complexity: 'complex',
    constraints: ['Time windows', 'Vehicle capacity', 'Traffic patterns'],
    objectives: ['Minimize distance', 'Meet deadlines', 'Reduce fuel'],
    timeLimit: 10,
    knownSolutions: 3
  },
  {
    id: 'sentiment-analysis',
    description: 'Classify customer feedback sentiment',
    type: 'classification',
    complexity: 'moderate',
    constraints: ['Multiple languages', 'Sarcasm detection', 'Context awareness'],
    objectives: ['High accuracy', 'Fast processing', 'Explainability'],
    timeLimit: 5,
    knownSolutions: 2
  },
  {
    id: 'creative-writing',
    description: 'Generate marketing copy for new product',
    type: 'generation',
    complexity: 'moderate',
    constraints: ['Brand voice', 'Word limit', 'Target audience'],
    objectives: ['Engagement', 'Clarity', 'Conversion'],
    timeLimit: 7,
    knownSolutions: 4
  },
  {
    id: 'system-diagnosis',
    description: 'Diagnose performance bottleneck in distributed system',
    type: 'analysis',
    complexity: 'complex',
    constraints: ['Limited monitoring', 'Intermittent issue', 'Production system'],
    objectives: ['Find root cause', 'Minimize downtime', 'Prevent recurrence'],
    timeLimit: 15,
    knownSolutions: 1
  },
  {
    id: 'resource-allocation',
    description: 'Allocate compute resources across tasks',
    type: 'optimization',
    complexity: 'simple',
    constraints: ['Budget limit', 'Priority levels', 'Dependencies'],
    objectives: ['Maximize throughput', 'Meet SLAs', 'Cost efficiency'],
    timeLimit: 3,
    knownSolutions: 2
  }
];

export default function MetaReasoningDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'analyzing' | 'selecting' | 'executing' | 'monitoring' | 'adapting' | 'complete'>('idle');
  const [metaDecision, setMetaDecision] = useState<MetaDecision | null>(null);
  const [execution, setExecution] = useState<StrategyExecution | null>(null);
  const [monitoring, setMonitoring] = useState<MonitoringMetrics | null>(null);
  const [adaptations, setAdaptations] = useState<StrategyAdaptation[]>([]);
  const [logs, setLogs] = useState<Array<{ timestamp: string; type: string; message: string }>>([]);
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);

  const addLog = useCallback((type: string, message: string) => {
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    }]);
  }, []);

  const analyzeProblem = useCallback(async (problem: Problem) => {
    addLog('analyze', `Analyzing problem: ${problem.description}`);
    addLog('analyze', `Type: ${problem.type}, Complexity: ${problem.complexity}`);
    addLog('analyze', `Constraints: ${problem.constraints.join(', ')}`);
    addLog('analyze', `Objectives: ${problem.objectives.join(', ')}`);

    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    addLog('analyze', 'Extracted problem features and requirements');
    addLog('analyze', `Time budget: ${problem.timeLimit}s, Known solutions: ${problem.knownSolutions}`);
  }, [speed, addLog]);

  const selectStrategy = useCallback(async (problem: Problem): Promise<MetaDecision> => {
    addLog('select', 'Evaluating available reasoning strategies...');

    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Score each strategy based on problem characteristics
    const scores = REASONING_STRATEGIES.map(strategy => {
      let score = strategy.accuracyRate * 100;

      // Adjust based on complexity match
      if (problem.complexity === 'complex' && strategy.complexity === 'high') score += 20;
      if (problem.complexity === 'simple' && strategy.complexity === 'low') score += 15;
      if (problem.complexity === 'moderate' && strategy.complexity === 'medium') score += 15;

      // Adjust based on time constraints
      if (strategy.timeComplexity <= problem.timeLimit / 3) score += 10;
      if (strategy.timeComplexity > problem.timeLimit) score -= 30;

      // Type matching bonus
      if (problem.type === 'optimization' && ['constraint-satisfaction', 'divide-conquer'].includes(strategy.id)) score += 15;
      if (problem.type === 'classification' && ['case-based', 'first-principles'].includes(strategy.id)) score += 15;
      if (problem.type === 'generation' && ['analogical', 'monte-carlo'].includes(strategy.id)) score += 15;
      if (problem.type === 'analysis' && ['first-principles', 'divide-conquer'].includes(strategy.id)) score += 15;

      return { strategy, score: Math.min(100, Math.max(0, score)) };
    }).sort((a, b) => b.score - a.score);

    const selected = scores[0];
    const alternatives = scores.slice(1, 4);

    addLog('select', `Selected: ${selected.strategy.name} (confidence: ${selected.score.toFixed(1)}%)`);

    const decision: MetaDecision = {
      problemId: problem.id,
      selectedStrategy: selected.strategy.id,
      reasoning: `Best match for ${problem.type} problem with ${problem.complexity} complexity`,
      confidenceScore: selected.score / 100,
      alternativeStrategies: alternatives.map(alt => ({
        strategy: alt.strategy.name,
        score: alt.score,
        reason: `Alternative approach with ${alt.score.toFixed(1)}% confidence`
      })),
      resourceAllocation: {
        time: selected.strategy.timeComplexity,
        compute: selected.strategy.complexity === 'high' ? 80 : selected.strategy.complexity === 'medium' ? 50 : 30,
        memory: selected.strategy.type === 'systematic' ? 60 : 40
      }
    };

    addLog('select', `Resource allocation - Time: ${decision.resourceAllocation.time}s, Compute: ${decision.resourceAllocation.compute}%, Memory: ${decision.resourceAllocation.memory}%`);

    return decision;
  }, [speed, addLog]);

  const executeStrategy = useCallback(async (strategy: ReasoningStrategy, problem: Problem): Promise<StrategyExecution> => {
    const startTime = Date.now();
    const exec: StrategyExecution = {
      strategyId: strategy.id,
      startTime,
      endTime: 0,
      progress: 0,
      intermediateResults: [],
      resourceUsage: { time: 0, compute: 0, memory: 0 },
      status: 'running'
    };

    addLog('execute', `Starting ${strategy.name} strategy execution`);

    // Simulate execution phases
    const phases = [
      { progress: 25, message: 'Initializing reasoning framework' },
      { progress: 50, message: 'Processing problem constraints' },
      { progress: 75, message: 'Generating solution candidates' },
      { progress: 90, message: 'Validating and optimizing results' },
      { progress: 100, message: 'Finalizing solution' }
    ];

    for (const phase of phases) {
      await new Promise(resolve => setTimeout(resolve, (strategy.timeComplexity * 200) / speed));
      exec.progress = phase.progress;
      exec.intermediateResults.push(phase.message);
      exec.resourceUsage.time = (Date.now() - startTime) / 1000;
      exec.resourceUsage.compute = Math.min(80, exec.resourceUsage.compute + 15);
      exec.resourceUsage.memory = Math.min(60, exec.resourceUsage.memory + 10);

      addLog('execute', `${phase.message} (${phase.progress}%)`);
      setExecution({ ...exec });

      // Check for monitoring triggers
      if (phase.progress >= 50 && Math.random() > 0.7) {
        const metrics: MonitoringMetrics = {
          currentProgress: phase.progress,
          expectedProgress: phase.progress + 10,
          confidenceLevel: 0.75 + Math.random() * 0.2,
          earlyStoppingSignals: [],
          adaptationTriggers: Math.random() > 0.8 ? ['Performance below threshold'] : [],
          performanceIndicators: {
            accuracy: 0.7 + Math.random() * 0.25,
            efficiency: 0.6 + Math.random() * 0.3,
            robustness: 0.65 + Math.random() * 0.3
          }
        };
        setMonitoring(metrics);
      }
    }

    exec.endTime = Date.now();
    exec.status = 'completed';

    addLog('execute', `Strategy execution completed in ${exec.resourceUsage.time.toFixed(2)}s`);

    return exec;
  }, [speed, addLog]);

  const monitorAndAdapt = useCallback(async (
    execution: StrategyExecution,
    monitoring: MonitoringMetrics,
    problem: Problem
  ): Promise<StrategyAdaptation | null> => {
    addLog('monitor', 'Monitoring execution performance...');
    addLog('monitor', `Accuracy: ${(monitoring.performanceIndicators.accuracy * 100).toFixed(1)}%`);
    addLog('monitor', `Efficiency: ${(monitoring.performanceIndicators.efficiency * 100).toFixed(1)}%`);

    // Check adaptation triggers
    if (monitoring.adaptationTriggers.length > 0) {
      addLog('adapt', `Adaptation triggered: ${monitoring.adaptationTriggers[0]}`);

      const currentStrategy = REASONING_STRATEGIES.find(s => s.id === execution.strategyId);
      const alternativeStrategies = REASONING_STRATEGIES.filter(s =>
        s.id !== execution.strategyId &&
        s.timeComplexity <= problem.timeLimit - execution.resourceUsage.time
      );

      if (alternativeStrategies.length > 0 && currentStrategy) {
        const newStrategy = alternativeStrategies[0];

        const adaptation: StrategyAdaptation = {
          timestamp: Date.now(),
          fromStrategy: currentStrategy.name,
          toStrategy: newStrategy.name,
          reason: monitoring.adaptationTriggers[0],
          triggerType: 'performance',
          improvement: Math.random() * 0.2
        };

        addLog('adapt', `Switching from ${adaptation.fromStrategy} to ${adaptation.toStrategy}`);
        addLog('adapt', `Expected improvement: ${(adaptation.improvement * 100).toFixed(1)}%`);

        await new Promise(resolve => setTimeout(resolve, 500 / speed));

        return adaptation;
      }
    }

    addLog('monitor', 'Performance within acceptable bounds, continuing execution');
    return null;
  }, [speed, addLog]);

  const runMetaReasoning = useCallback(async () => {
    const problem = SAMPLE_PROBLEMS[selectedProblemIndex];
    setCurrentProblem(problem);
    setLogs([]);
    setMetaDecision(null);
    setExecution(null);
    setMonitoring(null);
    setAdaptations([]);

    addLog('start', 'Initiating meta-reasoning process');

    // Phase 1: Analyze Problem
    setCurrentPhase('analyzing');
    await analyzeProblem(problem);

    // Phase 2: Select Strategy
    setCurrentPhase('selecting');
    const decision = await selectStrategy(problem);
    setMetaDecision(decision);

    // Phase 3: Execute Strategy
    setCurrentPhase('executing');
    const strategy = REASONING_STRATEGIES.find(s => s.id === decision.selectedStrategy)!;
    const exec = await executeStrategy(strategy, problem);
    setExecution(exec);

    // Phase 4: Monitor & Adapt (if needed)
    if (monitoring && Math.random() > 0.6) {
      setCurrentPhase('adapting');
      const adaptation = await monitorAndAdapt(exec, monitoring, problem);
      if (adaptation) {
        setAdaptations([adaptation]);

        // Execute new strategy
        const newStrategy = REASONING_STRATEGIES.find(s => s.name === adaptation.toStrategy);
        if (newStrategy) {
          await executeStrategy(newStrategy, problem);
        }
      }
    }

    setCurrentPhase('complete');
    addLog('complete', 'Meta-reasoning process completed successfully');
    addLog('result', `Final confidence: ${((decision.confidenceScore + (adaptations.length > 0 ? 0.1 : 0)) * 100).toFixed(1)}%`);
  }, [selectedProblemIndex, analyzeProblem, selectStrategy, executeStrategy, monitorAndAdapt, monitoring, adaptations.length, addLog]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && currentPhase === 'idle') {
      runMetaReasoning();
    } else if (isRunning && currentPhase === 'complete') {
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, currentPhase, runMetaReasoning]);

  const handleReset = () => {
    setIsRunning(false);
    setCurrentPhase('idle');
    setCurrentProblem(null);
    setMetaDecision(null);
    setExecution(null);
    setMonitoring(null);
    setAdaptations([]);
    setLogs([]);
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Meta-Reasoning Demo</h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Problem:</label>
              <select
                value={selectedProblemIndex}
                onChange={(e) => setSelectedProblemIndex(Number(e.target.value))}
                className="bg-gray-800 text-white px-3 py-1 rounded text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isRunning}
              >
                {SAMPLE_PROBLEMS.map((problem, idx) => (
                  <option key={problem.id} value={idx}>
                    {problem.id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Speed:</label>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="bg-gray-800 text-white px-3 py-1 rounded text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={3}>3x</option>
              </select>
            </div>

            <button
              onClick={() => setIsRunning(!isRunning)}
              disabled={currentPhase === 'complete'}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>

            <button
              onClick={handleReset}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7 space-y-4">
            {/* Current Problem */}
            {currentProblem && (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-blue-400" />
                  <h4 className="text-sm font-semibold text-white">Current Problem</h4>
                </div>
                <p className="text-gray-300 text-sm mb-2">{currentProblem.description}</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <span className="ml-2 text-gray-400">{currentProblem.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Complexity:</span>
                    <span className="ml-2 text-gray-400">{currentProblem.complexity}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Objectives:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {currentProblem.objectives.map((obj, idx) => (
                        <span key={idx} className="bg-gray-700 px-2 py-1 rounded text-gray-400">
                          {obj}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Meta Decision */}
            {metaDecision && (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-5 h-5 text-purple-400" />
                  <h4 className="text-sm font-semibold text-white">Strategy Selection</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-300">
                        Selected: {REASONING_STRATEGIES.find(s => s.id === metaDecision.selectedStrategy)?.name}
                      </span>
                      <span className="text-xs text-purple-400">
                        {(metaDecision.confidenceScore * 100).toFixed(1)}% confidence
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${metaDecision.confidenceScore * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-xs text-gray-400">
                    <div>Alternatives considered:</div>
                    {metaDecision.alternativeStrategies.map((alt, idx) => (
                      <div key={idx} className="flex items-center justify-between mt-1">
                        <span>{alt.strategy}</span>
                        <span className="text-gray-500">{alt.score.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Execution Progress */}
            {execution && (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-5 h-5 text-green-400" />
                  <h4 className="text-sm font-semibold text-white">Execution Progress</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-300">Progress</span>
                      <span className="text-xs text-gray-400">{execution.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${execution.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-gray-700 rounded p-2">
                      <div className="text-gray-500">Time</div>
                      <div className="text-gray-300">{execution.resourceUsage.time.toFixed(1)}s</div>
                    </div>
                    <div className="bg-gray-700 rounded p-2">
                      <div className="text-gray-500">Compute</div>
                      <div className="text-gray-300">{execution.resourceUsage.compute}%</div>
                    </div>
                    <div className="bg-gray-700 rounded p-2">
                      <div className="text-gray-500">Memory</div>
                      <div className="text-gray-300">{execution.resourceUsage.memory}%</div>
                    </div>
                  </div>

                  <div className={`text-xs px-2 py-1 rounded inline-block ${
                    execution.status === 'completed' ? 'bg-green-900 text-green-300' :
                    execution.status === 'running' ? 'bg-blue-900 text-blue-300' :
                    execution.status === 'failed' ? 'bg-red-900 text-red-300' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    Status: {execution.status}
                  </div>
                </div>
              </div>
            )}

            {/* Monitoring Metrics */}
            {monitoring && (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="w-5 h-5 text-yellow-400" />
                  <h4 className="text-sm font-semibold text-white">Monitoring & Adaptation</h4>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Accuracy</div>
                      <div className="relative w-16 h-16 mx-auto">
                        <svg className="transform -rotate-90 w-16 h-16">
                          <circle cx="32" cy="32" r="28" stroke="#374151" strokeWidth="4" fill="none" />
                          <circle
                            cx="32" cy="32" r="28"
                            stroke="#10b981"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${monitoring.performanceIndicators.accuracy * 175.93} 175.93`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-white">
                            {(monitoring.performanceIndicators.accuracy * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Efficiency</div>
                      <div className="relative w-16 h-16 mx-auto">
                        <svg className="transform -rotate-90 w-16 h-16">
                          <circle cx="32" cy="32" r="28" stroke="#374151" strokeWidth="4" fill="none" />
                          <circle
                            cx="32" cy="32" r="28"
                            stroke="#3b82f6"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${monitoring.performanceIndicators.efficiency * 175.93} 175.93`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-white">
                            {(monitoring.performanceIndicators.efficiency * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Robustness</div>
                      <div className="relative w-16 h-16 mx-auto">
                        <svg className="transform -rotate-90 w-16 h-16">
                          <circle cx="32" cy="32" r="28" stroke="#374151" strokeWidth="4" fill="none" />
                          <circle
                            cx="32" cy="32" r="28"
                            stroke="#f59e0b"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${monitoring.performanceIndicators.robustness * 175.93} 175.93`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-white">
                            {(monitoring.performanceIndicators.robustness * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {monitoring.adaptationTriggers.length > 0 && (
                    <div className="bg-yellow-900/30 border border-yellow-700 rounded p-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs text-yellow-300">
                          Adaptation Trigger: {monitoring.adaptationTriggers[0]}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Adaptations */}
            {adaptations.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <GitBranch className="w-5 h-5 text-orange-400" />
                  <h4 className="text-sm font-semibold text-white">Strategy Adaptations</h4>
                </div>
                <div className="space-y-2">
                  {adaptations.map((adapt, idx) => (
                    <div key={idx} className="bg-gray-700 rounded p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-300">
                          {adapt.fromStrategy} → {adapt.toStrategy}
                        </span>
                        <span className="text-xs text-green-400">
                          +{(adapt.improvement * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Reason: {adapt.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-span-5">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 h-[600px] flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h4 className="text-sm font-semibold text-white">Meta-Reasoning Log</h4>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-gray-600">{log.timestamp}</span>
                    <span className={`font-semibold ${
                      log.type === 'start' ? 'text-blue-400' :
                      log.type === 'analyze' ? 'text-purple-400' :
                      log.type === 'select' ? 'text-cyan-400' :
                      log.type === 'execute' ? 'text-green-400' :
                      log.type === 'monitor' ? 'text-yellow-400' :
                      log.type === 'adapt' ? 'text-orange-400' :
                      log.type === 'complete' ? 'text-green-400' :
                      log.type === 'result' ? 'text-blue-400' :
                      'text-gray-400'
                    }`}>
                      [{log.type.toUpperCase()}]
                    </span>
                    <span className="text-gray-300 flex-1">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Phase Indicator */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            {['analyzing', 'selecting', 'executing', 'monitoring', 'adapting', 'complete'].map((phase) => (
              <div key={phase} className="flex-1 text-center">
                <div className={`text-xs mb-1 ${
                  currentPhase === phase ? 'text-white font-semibold' : 'text-gray-500'
                }`}>
                  {phase.charAt(0).toUpperCase() + phase.slice(1)}
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`h-0.5 w-full ${
                      ['analyzing', 'selecting', 'executing', 'monitoring', 'adapting', 'complete'].indexOf(phase) <=
                      ['analyzing', 'selecting', 'executing', 'monitoring', 'adapting', 'complete'].indexOf(currentPhase)
                        ? 'bg-purple-500' : 'bg-gray-700'
                    }`} />
                  </div>
                  <div className={`relative w-3 h-3 mx-auto rounded-full border-2 ${
                    currentPhase === phase
                      ? 'bg-purple-500 border-purple-400 animate-pulse'
                      : ['analyzing', 'selecting', 'executing', 'monitoring', 'adapting', 'complete'].indexOf(phase) <
                        ['analyzing', 'selecting', 'executing', 'monitoring', 'adapting', 'complete'].indexOf(currentPhase)
                        ? 'bg-purple-500 border-purple-400'
                        : 'bg-gray-800 border-gray-600'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}