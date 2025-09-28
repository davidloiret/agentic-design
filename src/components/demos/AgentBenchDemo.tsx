'use client';

import React, { useState, useEffect } from 'react';
import { Bot, Brain, Zap, Target, TrendingUp, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface Environment {
  id: number;
  name: string;
  category: 'technical' | 'interactive' | 'web';
  icon: string;
  interactions: number;
  status: 'pending' | 'testing' | 'evaluated';
  successRate: number;
}

interface TestModel {
  id: string;
  name: string;
  provider: string;
  type: 'commercial' | 'oss';
}

interface Capability {
  name: string;
  score: number;
  icon: React.ReactNode;
}

type Phase = 'idle' | 'model-selection' | 'environment-testing' | 'capability-assessment' | 'overall-evaluation' | 'deployment-readiness' | 'complete';

const AgentBenchDemo: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);

  const testModels: TestModel[] = [
    { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', type: 'commercial' },
    { id: 'claude-3', name: 'Claude 3 Opus', provider: 'Anthropic', type: 'commercial' },
    { id: 'palm-2', name: 'PaLM-2', provider: 'Google', type: 'commercial' },
    { id: 'llama-70b', name: 'LLaMA-70B', provider: 'Meta', type: 'oss' },
  ];

  const [selectedModel, setSelectedModel] = useState<TestModel>(testModels[0]);
  const [environments, setEnvironments] = useState<Environment[]>([
    { id: 1, name: 'Operating System', category: 'technical', icon: '💻', interactions: 4000, status: 'pending', successRate: 0 },
    { id: 2, name: 'Database (SQL)', category: 'technical', icon: '🗄️', interactions: 5000, status: 'pending', successRate: 0 },
    { id: 3, name: 'Knowledge Graph', category: 'technical', icon: '🕸️', interactions: 6000, status: 'pending', successRate: 0 },
    { id: 4, name: 'Digital Card Game', category: 'interactive', icon: '🎮', interactions: 8000, status: 'pending', successRate: 0 },
    { id: 5, name: 'Lateral Thinking Puzzles', category: 'interactive', icon: '🧩', interactions: 7000, status: 'pending', successRate: 0 },
    { id: 6, name: 'House-Holding Tasks', category: 'interactive', icon: '🏠', interactions: 13000, status: 'pending', successRate: 0 },
    { id: 7, name: 'Web Shopping', category: 'web', icon: '🛒', interactions: 9000, status: 'pending', successRate: 0 },
    { id: 8, name: 'Web Browsing', category: 'web', icon: '🌐', interactions: 10000, status: 'pending', successRate: 0 },
  ]);

  const [capabilities, setCapabilities] = useState<Capability[]>([
    { name: 'Long-Term Reasoning', score: 0, icon: <Brain className="w-5 h-5" /> },
    { name: 'Environmental Adaptation', score: 0, icon: <Target className="w-5 h-5" /> },
    { name: 'Interactive Capabilities', score: 0, icon: <Zap className="w-5 h-5" /> },
  ]);

  const [overallScore, setOverallScore] = useState<number>(0);
  const [deploymentReadiness, setDeploymentReadiness] = useState<'pending' | 'production-ready' | 'needs-improvement' | 'not-ready'>('pending');
  const [testedCount, setTestedCount] = useState<number>(0);

  const getSuccessRateColor = (rate: number): string => {
    if (rate >= 0.75) return 'text-green-400';
    if (rate >= 0.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'technical': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'interactive': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'web': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const startBenchmark = () => {
    setPhase('model-selection');
    setAnimatedPhase(true);
  };

  const selectModelAndStart = (model: TestModel) => {
    setSelectedModel(model);
    setPhase('environment-testing');
    setAnimatedPhase(true);
  };

  const reset = () => {
    setPhase('idle');
    setAnimatedPhase(false);
    setEnvironments(prev => prev.map(env => ({
      ...env,
      status: 'pending' as const,
      successRate: 0
    })));
    setCapabilities(prev => prev.map(cap => ({ ...cap, score: 0 })));
    setOverallScore(0);
    setDeploymentReadiness('pending');
    setTestedCount(0);
  };

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'environment-testing') {
      let currentIndex = 0;
      const testNext = () => {
        if (currentIndex >= environments.length) {
          const timeout = setTimeout(() => {
            setPhase('capability-assessment');
            setAnimatedPhase(true);
          }, 100);
          timeouts.push(timeout);
          return;
        }

        const timeout1 = setTimeout(() => {
          setEnvironments(prev => prev.map((env, idx) =>
            idx === currentIndex ? { ...env, status: 'testing' as const } : env
          ));

          const timeout2 = setTimeout(() => {
            const baseRate = selectedModel.type === 'commercial' ? 0.65 : 0.45;
            const randomRate = baseRate + Math.random() * 0.25;

            setEnvironments(prev => prev.map((env, idx) =>
              idx === currentIndex ? { ...env, status: 'evaluated' as const, successRate: randomRate } : env
            ));

            setTestedCount(currentIndex + 1);
            currentIndex++;
            testNext();
          }, 70);
          timeouts.push(timeout2);
        }, 30);
        timeouts.push(timeout1);
      };
      testNext();
    }

    if (phase === 'capability-assessment') {
      const timeout = setTimeout(() => {
        const avgSuccessRate = environments.reduce((sum, env) => sum + env.successRate, 0) / environments.length;

        const baseScore = selectedModel.type === 'commercial' ? 0.7 : 0.5;
        const reasoning = baseScore + Math.random() * 0.2;
        const adaptation = baseScore + Math.random() * 0.15;
        const interaction = baseScore + Math.random() * 0.18;

        setCapabilities([
          { name: 'Long-Term Reasoning', score: reasoning, icon: <Brain className="w-5 h-5" /> },
          { name: 'Environmental Adaptation', score: adaptation, icon: <Target className="w-5 h-5" /> },
          { name: 'Interactive Capabilities', score: interaction, icon: <Zap className="w-5 h-5" /> },
        ]);

        setPhase('overall-evaluation');
        setAnimatedPhase(true);
      }, 150);
      timeouts.push(timeout);
    }

    if (phase === 'overall-evaluation') {
      const timeout = setTimeout(() => {
        const avgCapability = capabilities.reduce((sum, cap) => sum + cap.score, 0) / capabilities.length;
        setOverallScore(avgCapability);

        if (avgCapability >= 0.75) {
          setDeploymentReadiness('production-ready');
        } else if (avgCapability >= 0.55) {
          setDeploymentReadiness('needs-improvement');
        } else {
          setDeploymentReadiness('not-ready');
        }

        setPhase('deployment-readiness');
        setAnimatedPhase(true);
      }, 150);
      timeouts.push(timeout);
    }

    if (phase === 'deployment-readiness') {
      const timeout = setTimeout(() => {
        setPhase('complete');
      }, 100);
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [phase, environments, capabilities, selectedModel]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">AgentBench Evaluation</h3>
              <p className="text-sm text-slate-400">Comprehensive LLM agent testing across 8 environments</p>
            </div>
          </div>
          {phase === 'idle' ? (
            <button
              onClick={startBenchmark}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-200"
            >
              Run AgentBench
            </button>
          ) : phase === 'complete' ? (
            <button
              onClick={reset}
              className="px-6 py-2.5 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
            >
              Reset Demo
            </button>
          ) : null}
        </div>

        {phase === 'model-selection' && (
          <div className="mt-6 animate-fadeIn">
            <h4 className="text-md font-medium text-white mb-4">Select Model to Evaluate</h4>
            <div className="grid grid-cols-2 gap-3">
              {testModels.map(model => (
                <button
                  key={model.id}
                  onClick={() => selectModelAndStart(model)}
                  className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg hover:border-cyan-500/50 hover:bg-slate-700/30 transition-all duration-200 text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{model.name}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      model.type === 'commercial'
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'bg-purple-500/20 text-purple-400'
                    }`}>
                      {model.type === 'commercial' ? 'Commercial' : 'Open Source'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{model.provider}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {(phase === 'environment-testing' || phase === 'capability-assessment' || phase === 'overall-evaluation' || phase === 'deployment-readiness' || phase === 'complete') && (
          <>
            <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Testing Model:</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{selectedModel.name}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    selectedModel.type === 'commercial'
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {selectedModel.type === 'commercial' ? 'Commercial' : 'OSS'}
                  </span>
                </div>
              </div>
              {phase === 'environment-testing' && (
                <div className="mt-3 flex items-center gap-2 text-cyan-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-cyan-400 border-t-transparent"></div>
                  <span className="text-sm">Testing environments {testedCount}/8...</span>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h4 className="text-md font-medium text-white mb-4 flex items-center gap-2">
                <span>Environment Test Results</span>
                {phase === 'environment-testing' && (
                  <span className="text-sm text-slate-400">Progress {testedCount}/8</span>
                )}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {environments.map(env => (
                  <div
                    key={env.id}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      env.status === 'testing'
                        ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                        : env.status === 'evaluated'
                        ? 'bg-slate-800/50 border-slate-700/50'
                        : 'bg-slate-800/30 border-slate-700/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{env.icon}</span>
                        <span className="text-white text-sm font-medium">{env.name}</span>
                      </div>
                      {env.status === 'testing' && (
                        <div className="animate-spin rounded-full h-3 w-3 border-2 border-cyan-400 border-t-transparent"></div>
                      )}
                      {env.status === 'evaluated' && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs border ${getCategoryColor(env.category)}`}>
                        {env.category}
                      </span>
                      {env.status === 'evaluated' && (
                        <span className={`text-sm font-medium ${getSuccessRateColor(env.successRate)}`}>
                          {(env.successRate * 100).toFixed(1)}%
                        </span>
                      )}
                      {env.status === 'testing' && (
                        <span className="text-xs text-cyan-400">{env.interactions.toLocaleString()} turns</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {(phase === 'capability-assessment' || phase === 'overall-evaluation' || phase === 'deployment-readiness' || phase === 'complete') && (
              <div className="mt-6 animate-fadeIn">
                <h4 className="text-md font-medium text-white mb-4">Agent Capability Assessment</h4>
                <div className="grid grid-cols-3 gap-4">
                  {capabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg"
                    >
                      <div className="flex items-center gap-2 mb-3 text-slate-300">
                        {cap.icon}
                        <span className="text-sm font-medium">{cap.name}</span>
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {(cap.score * 100).toFixed(1)}%
                      </div>
                      <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            cap.score >= 0.75 ? 'bg-green-500' : cap.score >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${cap.score * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(phase === 'deployment-readiness' || phase === 'complete') && (
              <div className="mt-6 animate-fadeIn">
                <div className="p-6 bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-lg border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Overall Agent Performance</h4>
                      <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold text-white">
                          {(overallScore * 100).toFixed(1)}%
                        </div>
                        <div className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                          deploymentReadiness === 'production-ready'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : deploymentReadiness === 'needs-improvement'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {deploymentReadiness === 'production-ready' ? (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              <span className="font-medium">Production Ready</span>
                            </>
                          ) : deploymentReadiness === 'needs-improvement' ? (
                            <>
                              <AlertTriangle className="w-5 h-5" />
                              <span className="font-medium">Needs Improvement</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5" />
                              <span className="font-medium">Not Ready</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <TrendingUp className="w-16 h-16 text-slate-600" />
                  </div>
                  <div className="mt-4 text-sm text-slate-400">
                    {deploymentReadiness === 'production-ready' && (
                      <p>Model demonstrates strong agent capabilities across all environments and is suitable for autonomous deployment.</p>
                    )}
                    {deploymentReadiness === 'needs-improvement' && (
                      <p>Model shows moderate agent capabilities but requires optimization for production deployment in complex scenarios.</p>
                    )}
                    {deploymentReadiness === 'not-ready' && (
                      <p>Model exhibits limited agent capabilities and significant improvement needed before autonomous deployment.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
        <h4 className="text-sm font-medium text-white mb-2">About AgentBench</h4>
        <p className="text-sm text-slate-400 leading-relaxed">
          AgentBench is the first comprehensive benchmark for evaluating LLMs as agents across 8 diverse environments
          (OS, Database, Knowledge Graph, Card Game, Puzzles, House-Holding, Web Shopping, Web Browsing). It assesses
          long-term reasoning, environmental adaptation, and interactive capabilities through 4K-13K multi-turn interactions
          per environment, revealing significant gaps between commercial and open-source models.
        </p>
      </div>
    </div>
  );
};

export default AgentBenchDemo;