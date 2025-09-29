'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Zap, Clock, TrendingUp, Users, FlaskConical } from 'lucide-react';

type DemoPhase = 'idle' | 'setup' | 'task-execution' | 'human-comparison' | 'time-scaling' | 'analysis' | 'complete';

interface Model {
  id: string;
  name: string;
  vendor: 'anthropic' | 'openai' | 'meta' | 'google';
}

interface TimeBudget {
  id: string;
  hours: number;
  label: string;
}

interface ResearchCapability {
  id: string;
  name: string;
  status: 'pending' | 'executing' | 'completed';
  agentScore?: number;
  humanScore?: number;
}

interface TimeScalingData {
  budget: string;
  agentScore: number;
  humanScore: number;
  agentAdvantage: number;
}

interface BenchmarkAnalysis {
  overallAgentScore: number;
  overallHumanScore: number;
  taskCompletion: number;
  codeQuality: number;
  researchInsights: number;
  timeEfficiency: number;
  novelApproaches: number;
  speedAdvantage: number;
  recommendation: string;
}

const MetrReBenchDemo: React.FC = () => {
  const [phase, setPhase] = useState<DemoPhase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<TimeBudget | null>(null);
  const [capabilities, setCapabilities] = useState<ResearchCapability[]>([
    { id: 'data-prep', name: 'Data Preprocessing', status: 'pending' },
    { id: 'model-impl', name: 'Model Implementation', status: 'pending' },
    { id: 'exp-design', name: 'Experiment Design', status: 'pending' },
    { id: 'result-analysis', name: 'Result Analysis', status: 'pending' },
    { id: 'paper-writing', name: 'Paper Writing', status: 'pending' },
  ]);
  const [executedCapabilities, setExecutedCapabilities] = useState(0);
  const [timeScalingData, setTimeScalingData] = useState<TimeScalingData[]>([]);
  const [benchmarkAnalysis, setBenchmarkAnalysis] = useState<BenchmarkAnalysis | null>(null);

  const models: Model[] = [
    { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', vendor: 'anthropic' },
    { id: 'o1-preview', name: 'o1-preview', vendor: 'openai' },
    { id: 'gemini-pro', name: 'Gemini Pro', vendor: 'google' },
    { id: 'llama-3-70b', name: 'Llama 3 70B', vendor: 'meta' },
  ];

  const timeBudgets: TimeBudget[] = [
    { id: '2h', hours: 2, label: '2 hours' },
    { id: '8h', hours: 8, label: '8 hours' },
    { id: '32h', hours: 32, label: '32 hours' },
  ];

  useEffect(() => {
    if (phase === 'idle') return;

    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'setup' && selectedModel && selectedBudget) {
      const timeout = setTimeout(() => {
        setPhase('task-execution');
        setAnimatedPhase(true);
      }, 100);
      timeouts.push(timeout);
    }

    if (phase === 'task-execution') {
      let capIndex = 0;
      const executeNext = () => {
        if (capIndex >= capabilities.length) {
          const timeout = setTimeout(() => {
            setPhase('human-comparison');
            setAnimatedPhase(true);
          }, 100);
          timeouts.push(timeout);
          return;
        }

        const timeout1 = setTimeout(() => {
          setCapabilities(prev => prev.map((c, idx) =>
            idx === capIndex ? { ...c, status: 'executing' as const } : c
          ));

          const timeout2 = setTimeout(() => {
            const capability = capabilities[capIndex];
            const budgetHours = selectedBudget!.hours;

            let agentBaseScore: number;
            let humanBaseScore: number;

            if (capability.id === 'data-prep') {
              agentBaseScore = 0.85;
              humanBaseScore = 0.82;
            } else if (capability.id === 'model-impl') {
              agentBaseScore = 0.65;
              humanBaseScore = 0.70;
            } else if (capability.id === 'exp-design') {
              agentBaseScore = 0.32;
              humanBaseScore = 0.68;
            } else if (capability.id === 'result-analysis') {
              agentBaseScore = 0.54;
              humanBaseScore = 0.72;
            } else {
              agentBaseScore = 0.20;
              humanBaseScore = 0.55;
            }

            if (budgetHours === 2) {
              agentBaseScore *= 1.2;
              humanBaseScore *= 0.7;
            } else if (budgetHours === 32) {
              agentBaseScore *= 0.6;
              humanBaseScore *= 1.3;
            }

            const agentScore = Math.min(1, agentBaseScore + Math.random() * 0.05);
            const humanScore = Math.min(1, humanBaseScore + Math.random() * 0.05);

            setCapabilities(prev => prev.map((c, idx) =>
              idx === capIndex ? { ...c, status: 'completed' as const, agentScore, humanScore } : c
            ));

            setExecutedCapabilities(capIndex + 1);
            capIndex++;
            executeNext();
          }, 70);
          timeouts.push(timeout2);
        }, 30);
        timeouts.push(timeout1);
      };
      executeNext();
    }

    if (phase === 'human-comparison') {
      const timeout = setTimeout(() => {
        setPhase('time-scaling');
        setAnimatedPhase(true);
      }, 1000);
      timeouts.push(timeout);
    }

    if (phase === 'time-scaling') {
      const timeout = setTimeout(() => {
        const scalingData: TimeScalingData[] = [
          {
            budget: '2h',
            agentScore: 0.65,
            humanScore: 0.40,
            agentAdvantage: 4.0
          },
          {
            budget: '8h',
            agentScore: 0.52,
            humanScore: 0.58,
            agentAdvantage: 0.9
          },
          {
            budget: '32h',
            agentScore: 0.38,
            humanScore: 0.76,
            agentAdvantage: 0.5
          }
        ];

        setTimeScalingData(scalingData);

        const timeout2 = setTimeout(() => {
          setPhase('analysis');
          setAnimatedPhase(true);
        }, 100);
        timeouts.push(timeout2);
      }, 800);
      timeouts.push(timeout);
    }

    if (phase === 'analysis') {
      const timeout = setTimeout(() => {
        const avgAgentScore = capabilities.reduce((sum, c) => sum + (c.agentScore || 0), 0) / capabilities.length;
        const avgHumanScore = capabilities.reduce((sum, c) => sum + (c.humanScore || 0), 0) / capabilities.length;

        const taskCompletion = selectedBudget!.hours === 2 ? 0.65 : selectedBudget!.hours === 8 ? 0.42 : 0.28;
        const humanTaskCompletion = selectedBudget!.hours === 2 ? 0.45 : selectedBudget!.hours === 8 ? 0.60 : 0.78;

        const codeQuality = 3.2;
        const humanCodeQuality = 4.1;

        const researchInsights = 2.8;
        const humanResearchInsights = 4.3;

        const timeEfficiency = 0.8;
        const novelApproaches = 0.15;
        const humanNovelApproaches = 0.45;

        const speedAdvantage = 10.0;

        let recommendation: string;
        if (selectedBudget!.hours === 2) {
          recommendation = 'Agent excels at rapid prototyping and short-term tasks with 4x performance advantage';
        } else if (selectedBudget!.hours === 8) {
          recommendation = 'Human-agent collaboration optimal at this budget with comparable performance';
        } else {
          recommendation = 'Humans significantly outperform agents at extended research with 2x advantage';
        }

        setBenchmarkAnalysis({
          overallAgentScore: avgAgentScore,
          overallHumanScore: avgHumanScore,
          taskCompletion: taskCompletion / humanTaskCompletion,
          codeQuality: codeQuality / humanCodeQuality,
          researchInsights: researchInsights / humanResearchInsights,
          timeEfficiency,
          novelApproaches: novelApproaches / humanNovelApproaches,
          speedAdvantage,
          recommendation
        });

        const timeout2 = setTimeout(() => {
          setPhase('complete');
        }, 150);
        timeouts.push(timeout2);
      }, 100);
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [phase, selectedModel, selectedBudget, capabilities.length]);

  const handleStart = (model: Model, budget: TimeBudget) => {
    setSelectedModel(model);
    setSelectedBudget(budget);
    setPhase('setup');
    setAnimatedPhase(false);
  };

  const handleReset = () => {
    setPhase('idle');
    setAnimatedPhase(false);
    setSelectedModel(null);
    setSelectedBudget(null);
    setCapabilities(prev => prev.map(c => ({ ...c, status: 'pending' as const, agentScore: undefined, humanScore: undefined })));
    setExecutedCapabilities(0);
    setTimeScalingData([]);
    setBenchmarkAnalysis(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.7) return 'text-green-400';
    if (score >= 0.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600/20 to-amber-700/20 rounded-lg p-6 border border-amber-500/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
            <FlaskConical className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">METR RE-Bench</h3>
            <p className="text-amber-300 text-sm">ML Research Engineering Benchmark</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          Comparing frontier AI agents against 71 human experts across 7 ML research engineering environments.
          Evaluates R&D automation capabilities at multiple time budgets (2h, 8h, 32h).
        </p>
      </div>

      {/* Model and Budget Selection */}
      {phase === 'idle' && (
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Select Frontier Model & Time Budget
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {models.map(model => (
                <div key={model.id} className="space-y-3">
                  <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-medium">{model.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        model.vendor === 'anthropic' ? 'bg-orange-500/20 text-orange-300' :
                        model.vendor === 'openai' ? 'bg-green-500/20 text-green-300' :
                        model.vendor === 'google' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-purple-500/20 text-purple-300'
                      }`}>
                        {model.vendor}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {timeBudgets.map(budget => (
                        <button
                          key={budget.id}
                          onClick={() => handleStart(model, budget)}
                          className="w-full bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 rounded p-2 text-left transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                              {budget.label}
                            </span>
                            <Clock className="w-4 h-4 text-gray-400 group-hover:text-amber-400 transition-colors" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Task Execution */}
      {(phase === 'task-execution' || (phase !== 'idle' && executedCapabilities > 0)) && (
        <div className={`bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 transition-all ${
          animatedPhase && phase === 'task-execution' ? 'ring-2 ring-amber-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Research Capability Evaluation
            <span className="text-gray-400 text-sm font-normal ml-auto">
              {executedCapabilities}/{capabilities.length} capabilities tested
            </span>
          </h4>
          <div className="space-y-3">
            {capabilities.map((capability) => (
              <div
                key={capability.id}
                className={`rounded-lg p-4 border transition-all ${
                  capability.status === 'completed'
                    ? 'bg-slate-800/30 border-slate-600/50'
                    : capability.status === 'executing'
                    ? 'bg-blue-500/10 border-blue-500/50'
                    : 'bg-slate-800/20 border-slate-700/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">{capability.name}</span>
                  {capability.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : capability.status === 'executing' ? (
                    <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="w-5 h-5 bg-slate-600/50 rounded-full" />
                  )}
                </div>
                {capability.status === 'completed' && capability.agentScore !== undefined && capability.humanScore !== undefined && (
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="bg-slate-700/30 rounded p-2">
                      <div className="text-xs text-gray-400 mb-1">AI Agent</div>
                      <div className={`text-lg font-semibold ${getScoreColor(capability.agentScore)}`}>
                        {(capability.agentScore * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="bg-slate-700/30 rounded p-2">
                      <div className="text-xs text-gray-400 mb-1">Human Expert</div>
                      <div className={`text-lg font-semibold ${getScoreColor(capability.humanScore)}`}>
                        {(capability.humanScore * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Time Scaling Analysis */}
      {(phase === 'time-scaling' || phase === 'analysis' || phase === 'complete') && timeScalingData.length > 0 && (
        <div className={`bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 transition-all ${
          animatedPhase && phase === 'time-scaling' ? 'ring-2 ring-amber-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            Time Budget Scaling Analysis
          </h4>
          <div className="space-y-4">
            {timeScalingData.map((data) => (
              <div key={data.budget} className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-semibold">{data.budget} Budget</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    data.agentAdvantage > 1
                      ? 'bg-green-500/20 text-green-300'
                      : data.agentAdvantage < 0.7
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {data.agentAdvantage > 1 ? `${data.agentAdvantage.toFixed(1)}x Agent Advantage` :
                     `${(1 / data.agentAdvantage).toFixed(1)}x Human Advantage`}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-2">AI Agent</div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 bg-slate-700/50 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all duration-500"
                          style={{ width: `${data.agentScore * 100}%` }}
                        />
                      </div>
                      <span className="text-white text-sm font-medium w-12 text-right">
                        {(data.agentScore * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-2">Human Expert</div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 bg-slate-700/50 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-green-500 h-full transition-all duration-500"
                          style={{ width: `${data.humanScore * 100}%` }}
                        />
                      </div>
                      <span className="text-white text-sm font-medium w-12 text-right">
                        {(data.humanScore * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benchmark Analysis */}
      {(phase === 'analysis' || phase === 'complete') && benchmarkAnalysis && (
        <div className={`bg-gradient-to-br from-amber-600/10 to-orange-600/10 rounded-lg p-6 border border-amber-500/30 transition-all ${
          animatedPhase && phase === 'analysis' ? 'ring-2 ring-amber-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            Human vs Agent Comparison
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-gray-400 text-xs mb-2">Task Completion</div>
              <div className={`text-2xl font-bold ${
                benchmarkAnalysis.taskCompletion >= 1 ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {(benchmarkAnalysis.taskCompletion * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-gray-400 mt-1">vs human baseline</div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-gray-400 text-xs mb-2">Code Quality</div>
              <div className="text-2xl font-bold text-yellow-400">
                {(benchmarkAnalysis.codeQuality * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-gray-400 mt-1">vs human baseline</div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-gray-400 text-xs mb-2">Research Insights</div>
              <div className="text-2xl font-bold text-orange-400">
                {(benchmarkAnalysis.researchInsights * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-gray-400 mt-1">vs human baseline</div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-gray-400 text-xs mb-2">Time Efficiency</div>
              <div className="text-2xl font-bold text-blue-400">
                {(benchmarkAnalysis.timeEfficiency * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-gray-400 mt-1">of human speed</div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-gray-400 text-xs mb-2">Novel Approaches</div>
              <div className="text-2xl font-bold text-red-400">
                {(benchmarkAnalysis.novelApproaches * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-gray-400 mt-1">vs human baseline</div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-gray-400 text-xs mb-2">Speed Advantage</div>
              <div className="text-2xl font-bold text-emerald-400">
                {benchmarkAnalysis.speedAdvantage.toFixed(0)}x
              </div>
              <div className="text-xs text-gray-400 mt-1">solution generation</div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-5 border border-amber-500/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white font-semibold mb-2">Benchmark Findings</div>
                <p className="text-gray-300 text-sm leading-relaxed">{benchmarkAnalysis.recommendation}</p>
                <div className="mt-3 pt-3 border-t border-slate-700/50">
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>• 82% of human experts achieved non-zero scores</div>
                    <div>• 24% matched or exceeded reference solutions</div>
                    <div>• Agents generate/test solutions 10x faster than humans</div>
                    <div>• Significant gap remains on extended research tasks (32h+)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      {phase === 'complete' && (
        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-amber-500/50 transition-all"
          >
            Run New RE-Bench Evaluation
          </button>
        </div>
      )}
    </div>
  );
};

export default MetrReBenchDemo;