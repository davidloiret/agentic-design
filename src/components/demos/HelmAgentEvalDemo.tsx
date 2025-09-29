'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, BarChart3, Shield, Zap } from 'lucide-react';

type DemoPhase = 'idle' | 'model-selection' | 'scenario-testing' | 'metric-evaluation' | 'analysis' | 'complete';

interface Model {
  id: string;
  name: string;
  type: 'commercial' | 'oss';
}

interface Scenario {
  id: string;
  name: string;
  category: 'core' | 'multimodal' | 'tool-use';
  status: 'pending' | 'testing' | 'evaluated';
  performance?: number;
}

interface Metric {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'evaluating' | 'evaluated';
  score?: number;
  rating?: 'excellent' | 'good' | 'fair' | 'poor';
}

interface HolisticAnalysis {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  tradeoffs: string[];
}

const HelmAgentEvalDemo: React.FC = () => {
  const [phase, setPhase] = useState<DemoPhase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([
    { id: 'qa', name: 'Question Answering', category: 'core', status: 'pending' },
    { id: 'summarization', name: 'Summarization', category: 'core', status: 'pending' },
    { id: 'sentiment', name: 'Sentiment Analysis', category: 'core', status: 'pending' },
    { id: 'reasoning', name: 'Reasoning Tasks', category: 'core', status: 'pending' },
    { id: 'vision-qa', name: 'Vision-Language QA', category: 'multimodal', status: 'pending' },
    { id: 'image-caption', name: 'Image Captioning', category: 'multimodal', status: 'pending' },
    { id: 'api-integration', name: 'API Integration', category: 'tool-use', status: 'pending' },
    { id: 'tool-selection', name: 'Tool Selection', category: 'tool-use', status: 'pending' },
  ]);
  const [testedScenarios, setTestedScenarios] = useState(0);
  const [metrics, setMetrics] = useState<Metric[]>([
    { id: 'accuracy', name: 'Accuracy', description: 'Task performance', status: 'pending' },
    { id: 'calibration', name: 'Calibration', description: 'Confidence alignment', status: 'pending' },
    { id: 'robustness', name: 'Robustness', description: 'Perturbation resistance', status: 'pending' },
    { id: 'fairness', name: 'Fairness', description: 'Group consistency', status: 'pending' },
    { id: 'bias', name: 'Bias', description: 'Systematic fairness', status: 'pending' },
    { id: 'toxicity', name: 'Toxicity', description: 'Harmful content', status: 'pending' },
    { id: 'efficiency', name: 'Efficiency', description: 'Resource usage', status: 'pending' },
  ]);
  const [evaluatedMetrics, setEvaluatedMetrics] = useState(0);
  const [holisticAnalysis, setHolisticAnalysis] = useState<HolisticAnalysis | null>(null);

  const models: Model[] = [
    { id: 'gpt4', name: 'GPT-4 Turbo', type: 'commercial' },
    { id: 'claude', name: 'Claude 3 Opus', type: 'commercial' },
    { id: 'llama', name: 'LLaMA-70B', type: 'oss' },
    { id: 'mistral', name: 'Mixtral 8x7B', type: 'oss' },
  ];

  useEffect(() => {
    if (phase === 'idle') return;

    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'model-selection' && selectedModel) {
      const timeout = setTimeout(() => {
        setPhase('scenario-testing');
        setAnimatedPhase(true);
      }, 100);
      timeouts.push(timeout);
    }

    if (phase === 'scenario-testing') {
      let currentIndex = 0;
      const testNext = () => {
        if (currentIndex >= scenarios.length) {
          const timeout = setTimeout(() => {
            setPhase('metric-evaluation');
            setAnimatedPhase(true);
          }, 100);
          timeouts.push(timeout);
          return;
        }

        const timeout1 = setTimeout(() => {
          setScenarios(prev => prev.map((s, idx) =>
            idx === currentIndex ? { ...s, status: 'testing' as const } : s
          ));

          const timeout2 = setTimeout(() => {
            const scenario = scenarios[currentIndex];
            const basePerf = selectedModel!.type === 'commercial' ? 0.75 : 0.60;
            const categoryBonus = scenario.category === 'core' ? 0.15 : 0.05;
            const performance = basePerf + categoryBonus + Math.random() * 0.1;

            setScenarios(prev => prev.map((s, idx) =>
              idx === currentIndex ? { ...s, status: 'evaluated' as const, performance } : s
            ));

            setTestedScenarios(currentIndex + 1);
            currentIndex++;
            testNext();
          }, 55);
          timeouts.push(timeout2);
        }, 25);
        timeouts.push(timeout1);
      };
      testNext();
    }

    if (phase === 'metric-evaluation') {
      let metricIndex = 0;
      const evaluateNext = () => {
        if (metricIndex >= metrics.length) {
          const timeout = setTimeout(() => {
            setPhase('analysis');
            setAnimatedPhase(true);
          }, 100);
          timeouts.push(timeout);
          return;
        }

        const timeout1 = setTimeout(() => {
          setMetrics(prev => prev.map((m, idx) =>
            idx === metricIndex ? { ...m, status: 'evaluating' as const } : m
          ));

          const timeout2 = setTimeout(() => {
            const metric = metrics[metricIndex];
            let score: number;
            let rating: 'excellent' | 'good' | 'fair' | 'poor';

            if (selectedModel!.type === 'commercial') {
              if (metric.id === 'accuracy') {
                score = 0.85 + Math.random() * 0.1;
                rating = 'excellent';
              } else if (metric.id === 'efficiency') {
                score = 0.70 + Math.random() * 0.15;
                rating = 'good';
              } else if (metric.id === 'toxicity') {
                score = 0.95 + Math.random() * 0.05;
                rating = 'excellent';
              } else if (metric.id === 'bias') {
                score = 0.80 + Math.random() * 0.1;
                rating = 'good';
              } else {
                score = 0.75 + Math.random() * 0.15;
                rating = score >= 0.85 ? 'excellent' : 'good';
              }
            } else {
              if (metric.id === 'accuracy') {
                score = 0.70 + Math.random() * 0.15;
                rating = 'good';
              } else if (metric.id === 'efficiency') {
                score = 0.85 + Math.random() * 0.1;
                rating = 'excellent';
              } else if (metric.id === 'toxicity' || metric.id === 'bias') {
                score = 0.65 + Math.random() * 0.15;
                rating = 'fair';
              } else {
                score = 0.60 + Math.random() * 0.2;
                rating = score >= 0.75 ? 'good' : 'fair';
              }
            }

            setMetrics(prev => prev.map((m, idx) =>
              idx === metricIndex ? { ...m, status: 'evaluated' as const, score, rating } : m
            ));

            setEvaluatedMetrics(metricIndex + 1);
            metricIndex++;
            evaluateNext();
          }, 60);
          timeouts.push(timeout2);
        }, 25);
        timeouts.push(timeout1);
      };
      evaluateNext();
    }

    if (phase === 'analysis') {
      const timeout = setTimeout(() => {
        const avgScore = metrics.reduce((sum, m) => sum + (m.score || 0), 0) / metrics.length;

        const strengths: string[] = [];
        const weaknesses: string[] = [];
        const tradeoffs: string[] = [];

        if (selectedModel!.type === 'commercial') {
          strengths.push('High accuracy and calibration');
          strengths.push('Excellent safety (low toxicity)');
          weaknesses.push('Moderate efficiency (inference cost)');
          tradeoffs.push('Accuracy vs Efficiency: Favors accuracy');
          tradeoffs.push('Safety vs Helpfulness: Balanced approach');
        } else {
          strengths.push('Excellent efficiency (low cost)');
          strengths.push('Good performance on core tasks');
          weaknesses.push('Lower safety scores (bias, toxicity)');
          weaknesses.push('Fair calibration and robustness');
          tradeoffs.push('Accuracy vs Efficiency: Favors efficiency');
          tradeoffs.push('Performance vs Safety: Performance priority');
        }

        setHolisticAnalysis({
          overallScore: avgScore,
          strengths,
          weaknesses,
          tradeoffs
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
  }, [phase, selectedModel, scenarios.length, metrics.length]);

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
    setPhase('model-selection');
    setAnimatedPhase(false);
  };

  const handleReset = () => {
    setPhase('idle');
    setAnimatedPhase(false);
    setSelectedModel(null);
    setScenarios(prev => prev.map(s => ({ ...s, status: 'pending' as const, performance: undefined })));
    setTestedScenarios(0);
    setMetrics(prev => prev.map(m => ({ ...m, status: 'pending' as const, score: undefined, rating: undefined })));
    setEvaluatedMetrics(0);
    setHolisticAnalysis(null);
  };

  const getMetricColor = (rating?: 'excellent' | 'good' | 'fair' | 'poor') => {
    switch (rating) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'fair': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getMetricBgColor = (rating?: 'excellent' | 'good' | 'fair' | 'poor') => {
    switch (rating) {
      case 'excellent': return 'bg-green-500/10';
      case 'good': return 'bg-blue-500/10';
      case 'fair': return 'bg-yellow-500/10';
      case 'poor': return 'bg-red-500/10';
      default: return 'bg-slate-800/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-lg p-6 border border-red-500/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">HELM Agent Evaluation</h3>
            <p className="text-red-300 text-sm">Stanford CRFM's Holistic Evaluation Framework</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          Comprehensive evaluation across 7 metrics: Accuracy, Calibration, Robustness, Fairness, Bias, Toxicity, and Efficiency.
          Tests multimodal tasks, tool use, and simulation environments for holistic assessment.
        </p>
      </div>

      {/* Model Selection */}
      {phase === 'idle' && (
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" />
            Select Model for HELM Evaluation
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {models.map(model => (
              <button
                key={model.id}
                onClick={() => handleModelSelect(model)}
                className="bg-slate-800/30 hover:bg-slate-700/50 border border-slate-600/50 rounded-lg p-4 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{model.name}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    model.type === 'commercial'
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-green-500/20 text-green-300'
                  }`}>
                    {model.type === 'commercial' ? 'Commercial' : 'Open Source'}
                  </span>
                </div>
                <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  Evaluate across 42 scenarios and 7 core metrics
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Scenario Testing Phase */}
      {(phase === 'scenario-testing' || (phase !== 'idle' && testedScenarios > 0)) && (
        <div className={`bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 transition-all ${
          animatedPhase && phase === 'scenario-testing' ? 'ring-2 ring-red-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Scenario Testing
            <span className="text-gray-400 text-sm font-normal ml-auto">
              {testedScenarios}/{scenarios.length} scenarios evaluated
            </span>
          </h4>
          <div className="space-y-3">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className={`rounded-lg p-4 border transition-all ${
                  scenario.status === 'evaluated'
                    ? 'bg-slate-800/30 border-slate-600/50'
                    : scenario.status === 'testing'
                    ? 'bg-blue-500/10 border-blue-500/50'
                    : 'bg-slate-800/20 border-slate-700/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded ${
                      scenario.category === 'core'
                        ? 'bg-purple-500/20 text-purple-300'
                        : scenario.category === 'multimodal'
                        ? 'bg-pink-500/20 text-pink-300'
                        : 'bg-orange-500/20 text-orange-300'
                    }`}>
                      {scenario.category}
                    </span>
                    <span className="text-white text-sm font-medium">{scenario.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {scenario.status === 'evaluated' && scenario.performance !== undefined && (
                      <span className="text-gray-300 text-sm">
                        {(scenario.performance * 100).toFixed(1)}%
                      </span>
                    )}
                    {scenario.status === 'evaluated' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : scenario.status === 'testing' ? (
                      <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <div className="w-5 h-5 bg-slate-600/50 rounded-full" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* The 7 Core Metrics Evaluation */}
      {(phase === 'metric-evaluation' || (phase !== 'idle' && phase !== 'scenario-testing' && evaluatedMetrics > 0)) && (
        <div className={`bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 transition-all ${
          animatedPhase && phase === 'metric-evaluation' ? 'ring-2 ring-red-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-red-400" />
            The 7 Core Metrics
            <span className="text-gray-400 text-sm font-normal ml-auto">
              {evaluatedMetrics}/{metrics.length} metrics evaluated
            </span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className={`rounded-lg p-4 border transition-all ${
                  metric.status === 'evaluated'
                    ? `${getMetricBgColor(metric.rating)} border-slate-600/50`
                    : metric.status === 'evaluating'
                    ? 'bg-blue-500/10 border-blue-500/50'
                    : 'bg-slate-800/20 border-slate-700/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-semibold">{metric.name}</span>
                  <div className="flex items-center gap-2">
                    {metric.status === 'evaluated' && metric.score !== undefined && (
                      <span className={`text-sm font-medium ${getMetricColor(metric.rating)}`}>
                        {(metric.score * 100).toFixed(1)}%
                      </span>
                    )}
                    {metric.status === 'evaluated' ? (
                      <CheckCircle className={`w-5 h-5 ${getMetricColor(metric.rating)}`} />
                    ) : metric.status === 'evaluating' ? (
                      <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <div className="w-5 h-5 bg-slate-600/50 rounded-full" />
                    )}
                  </div>
                </div>
                <p className="text-gray-400 text-xs">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Holistic Analysis */}
      {(phase === 'analysis' || phase === 'complete') && holisticAnalysis && (
        <div className={`bg-gradient-to-br from-red-600/10 to-pink-600/10 rounded-lg p-6 border border-red-500/30 transition-all ${
          animatedPhase && phase === 'analysis' ? 'ring-2 ring-red-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-red-400" />
            Holistic Analysis
          </h4>

          <div className="mb-6 bg-slate-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Overall HELM Score</span>
              <span className="text-2xl font-bold text-red-400">
                {(holisticAnalysis.overallScore * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-500 to-pink-500 h-full transition-all duration-500"
                style={{ width: `${holisticAnalysis.overallScore * 100}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800/30 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold text-sm mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Strengths
              </h5>
              <ul className="space-y-2">
                {holisticAnalysis.strengths.map((strength, idx) => (
                  <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/30 rounded-lg p-4">
              <h5 className="text-yellow-400 font-semibold text-sm mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Weaknesses
              </h5>
              <ul className="space-y-2">
                {holisticAnalysis.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-lg p-4">
            <h5 className="text-blue-400 font-semibold text-sm mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Trade-off Analysis
            </h5>
            <ul className="space-y-2">
              {holisticAnalysis.tradeoffs.map((tradeoff, idx) => (
                <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">⚖️</span>
                  <span>{tradeoff}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      {phase === 'complete' && (
        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-red-500/50 transition-all"
          >
            Run New Evaluation
          </button>
        </div>
      )}
    </div>
  );
};

export default HelmAgentEvalDemo;