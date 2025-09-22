'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, TrendingUp, TrendingDown, Zap, Target, BarChart3, GitBranch, Activity, Sparkles, ChevronRight, ThumbsUp, ThumbsDown, Scale, Brain } from 'lucide-react';

interface PreferencePair {
  id: string;
  prompt: string;
  chosen: {
    text: string;
    logProb: number;
    reward: number;
  };
  rejected: {
    text: string;
    logProb: number;
    reward: number;
  };
  margin: number;
  beta: number;
}

interface PolicyMetrics {
  klDivergence: number;
  preferenceAccuracy: number;
  marginSatisfaction: number;
  policyImprovement: number;
  chosenReward: number;
  rejectedReward: number;
}

interface OptimizationSignal {
  id: string;
  type: 'gradient' | 'preference' | 'kl_penalty' | 'policy_update';
  value: number;
  timestamp: number;
}

const generatePreferencePair = (promptIndex: number): PreferencePair => {
  const prompts = [
    'Explain machine learning',
    'Write code for sorting',
    'Describe climate change',
    'Explain quantum physics',
    'Write a story opening'
  ];

  const responses = {
    'Explain machine learning': {
      chosen: "Machine learning is a subset of AI where algorithms learn patterns from data to make predictions without explicit programming.",
      rejected: "ML is when computers learn stuff from data and can predict things."
    },
    'Write code for sorting': {
      chosen: "def quicksort(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[len(arr)//2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)",
      rejected: "arr.sort() # This sorts the array"
    },
    'Describe climate change': {
      chosen: "Climate change refers to long-term shifts in global temperatures and weather patterns, primarily driven by human activities since the Industrial Revolution, particularly fossil fuel burning which increases greenhouse gas concentrations.",
      rejected: "Climate change is when the Earth gets hotter because of pollution and stuff."
    },
    'Explain quantum physics': {
      chosen: "Quantum physics describes nature at the smallest scales, where particles exhibit wave-particle duality and phenomena like superposition and entanglement challenge classical intuitions about reality.",
      rejected: "Quantum physics is really complicated science about tiny particles that act weird."
    },
    'Write a story opening': {
      chosen: "The lighthouse keeper hadn't spoken to another soul in three months, which made the knock at his door all the more unsettling on this storm-lashed Tuesday evening.",
      rejected: "There was once a man who lived in a lighthouse. He was lonely."
    }
  };

  const prompt = prompts[promptIndex % prompts.length];
  const pair = responses[prompt];

  // Simulate log probabilities (chosen should have higher probability)
  const chosenLogProb = -0.5 - Math.random() * 0.3;
  const rejectedLogProb = -1.2 - Math.random() * 0.5;

  return {
    id: `pair-${Date.now()}`,
    prompt,
    chosen: {
      text: pair.chosen,
      logProb: chosenLogProb,
      reward: Math.random() * 0.3 + 0.6 // 0.6 to 0.9
    },
    rejected: {
      text: pair.rejected,
      logProb: rejectedLogProb,
      reward: Math.random() * 0.3 + 0.1 // 0.1 to 0.4
    },
    margin: chosenLogProb - rejectedLogProb,
    beta: 0.1 // KL penalty coefficient
  };
};

export const DPODemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPair, setCurrentPair] = useState<PreferencePair | null>(null);
  const [trainingStep, setTrainingStep] = useState(0);
  const [epoch, setEpoch] = useState(0);
  const [pairIndex, setPairIndex] = useState(0);
  const [phase, setPhase] = useState<'sampling' | 'comparing' | 'optimizing'>('sampling');

  const [metrics, setMetrics] = useState<PolicyMetrics>({
    klDivergence: 0.01,
    preferenceAccuracy: 0.65,
    marginSatisfaction: 0.7,
    policyImprovement: 0.0,
    chosenReward: 0.6,
    rejectedReward: 0.3
  });

  const [optimizationSignals, setOptimizationSignals] = useState<OptimizationSignal[]>([
    { id: 'init-1', type: 'gradient', value: 0.02, timestamp: Date.now() - 1000 },
    { id: 'init-2', type: 'preference', value: 0.7, timestamp: Date.now() - 800 },
    { id: 'init-3', type: 'kl_penalty', value: -0.01, timestamp: Date.now() - 600 }
  ]);

  const [trainingHistory, setTrainingHistory] = useState<Array<{
    step: number;
    accuracy: number;
    klDiv: number;
    margin: number;
  }>>([]);

  // Animation loop for the demo
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (phase === 'sampling') {
        // Generate new preference pair
        const newPair = generatePreferencePair(pairIndex);
        setCurrentPair(newPair);
        setPairIndex(prev => prev + 1);

        // Add sampling signal
        setOptimizationSignals(prev => [...prev.slice(-19), {
          id: `sample-${Date.now()}`,
          type: 'preference',
          value: newPair.margin,
          timestamp: Date.now()
        }]);

        setPhase('comparing');
      } else if (phase === 'comparing' && currentPair) {
        // Compare preferences and calculate gradients
        const gradient = currentPair.margin * (1 - metrics.preferenceAccuracy);

        setOptimizationSignals(prev => [...prev.slice(-19), {
          id: `gradient-${Date.now()}`,
          type: 'gradient',
          value: gradient,
          timestamp: Date.now()
        }]);

        // Update preference accuracy based on margin
        setMetrics(prev => ({
          ...prev,
          preferenceAccuracy: Math.min(0.95, prev.preferenceAccuracy + gradient * 0.05),
          marginSatisfaction: Math.min(1.0, prev.marginSatisfaction + 0.02)
        }));

        setPhase('optimizing');
      } else if (phase === 'optimizing' && currentPair) {
        // Apply DPO optimization
        const klPenalty = currentPair.beta * metrics.klDivergence;

        // Add KL penalty signal
        setOptimizationSignals(prev => [...prev.slice(-19), {
          id: `kl-${Date.now()}`,
          type: 'kl_penalty',
          value: -klPenalty,
          timestamp: Date.now()
        }]);

        // Calculate policy update
        const policyUpdate = currentPair.margin - klPenalty;

        setOptimizationSignals(prev => [...prev.slice(-19), {
          id: `policy-${Date.now()}`,
          type: 'policy_update',
          value: policyUpdate,
          timestamp: Date.now()
        }]);

        // Update metrics
        setMetrics(prev => ({
          ...prev,
          klDivergence: Math.max(0.001, prev.klDivergence + (Math.random() - 0.5) * 0.002),
          policyImprovement: prev.policyImprovement * 0.9 + policyUpdate * 0.1,
          chosenReward: Math.min(0.95, prev.chosenReward + 0.01),
          rejectedReward: Math.max(0.1, prev.rejectedReward - 0.005)
        }));

        // Update training history
        setTrainingStep(prev => prev + 1);
        if (trainingStep % 5 === 0) {
          setTrainingHistory(prev => [...prev.slice(-19), {
            step: trainingStep,
            accuracy: metrics.preferenceAccuracy,
            klDiv: metrics.klDivergence,
            margin: currentPair.margin
          }]);
        }

        // Update epoch
        if (trainingStep > 0 && trainingStep % 20 === 0) {
          setEpoch(prev => prev + 1);
        }

        setPhase('sampling');
        setCurrentPair(null);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [isRunning, phase, currentPair, pairIndex, metrics, trainingStep]);

  const startDemo = () => setIsRunning(true);
  const pauseDemo = () => setIsRunning(false);
  const resetDemo = () => {
    setIsRunning(false);
    setCurrentPair(null);
    setTrainingStep(0);
    setEpoch(0);
    setPairIndex(0);
    setPhase('sampling');
    setMetrics({
      klDivergence: 0.01,
      preferenceAccuracy: 0.65,
      marginSatisfaction: 0.7,
      policyImprovement: 0.0,
      chosenReward: 0.6,
      rejectedReward: 0.3
    });
    setOptimizationSignals([]);
    setTrainingHistory([]);
  };

  const getSignalColor = (type: string) => {
    switch (type) {
      case 'gradient': return 'text-blue-400';
      case 'preference': return 'text-green-400';
      case 'kl_penalty': return 'text-yellow-400';
      case 'policy_update': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'gradient': return <TrendingUp className="w-3 h-3" />;
      case 'preference': return <ThumbsUp className="w-3 h-3" />;
      case 'kl_penalty': return <Scale className="w-3 h-3" />;
      case 'policy_update': return <Brain className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Direct Preference Optimization (DPO)</h2>
          <p className="text-gray-400">Simplified alignment without explicit reward modeling</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={isRunning ? pauseDemo : startDemo}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetDemo}
            disabled={isRunning}
            className="px-4 py-2 rounded-lg font-medium transition-all bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* DPO Pipeline */}
      <div className="mb-6 bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-purple-400" />
          DPO Pipeline
        </h3>
        <div className="flex items-center justify-between">
          <div className={`text-center ${phase === 'sampling' ? 'scale-110' : ''} transition-transform`}>
            <div className={`w-12 h-12 rounded-full ${phase === 'sampling' ? 'bg-blue-600' : 'bg-gray-700'} flex items-center justify-center mb-2`}>
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-sm text-gray-300">Sample Pairs</span>
          </div>

          <ChevronRight className="w-5 h-5 text-gray-600" />

          <div className={`text-center ${phase === 'comparing' ? 'scale-110' : ''} transition-transform`}>
            <div className={`w-12 h-12 rounded-full ${phase === 'comparing' ? 'bg-green-600' : 'bg-gray-700'} flex items-center justify-center mb-2`}>
              <Scale className="w-6 h-6" />
            </div>
            <span className="text-sm text-gray-300">Compare</span>
          </div>

          <ChevronRight className="w-5 h-5 text-gray-600" />

          <div className={`text-center ${phase === 'optimizing' ? 'scale-110' : ''} transition-transform`}>
            <div className={`w-12 h-12 rounded-full ${phase === 'optimizing' ? 'bg-purple-600' : 'bg-gray-700'} flex items-center justify-center mb-2`}>
              <Target className="w-6 h-6" />
            </div>
            <span className="text-sm text-gray-300">Optimize</span>
          </div>
        </div>
        <div className="mt-3 text-center text-sm text-gray-400">
          Epoch: <span className="text-white font-semibold">{epoch}</span>
          {' • '}
          Step: <span className="text-white font-semibold">{trainingStep}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Preference Pair */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-green-400" />
            Preference Pair
          </h3>
          {currentPair ? (
            <div className="space-y-4">
              <div className="p-3 bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Prompt:</p>
                <p className="text-gray-200">{currentPair.prompt}</p>
              </div>

              {/* Chosen Response */}
              <div className="p-3 bg-green-900/20 border border-green-600/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">Chosen</span>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span className="text-gray-400">
                      log P: <span className="text-green-400 font-mono">{currentPair.chosen.logProb.toFixed(3)}</span>
                    </span>
                    <span className="text-gray-400">
                      R: <span className="text-green-400 font-mono">{currentPair.chosen.reward.toFixed(3)}</span>
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-300">{currentPair.chosen.text}</p>
              </div>

              {/* Rejected Response */}
              <div className="p-3 bg-red-900/20 border border-red-600/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ThumbsDown className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-medium text-red-400">Rejected</span>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span className="text-gray-400">
                      log P: <span className="text-red-400 font-mono">{currentPair.rejected.logProb.toFixed(3)}</span>
                    </span>
                    <span className="text-gray-400">
                      R: <span className="text-red-400 font-mono">{currentPair.rejected.reward.toFixed(3)}</span>
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-300">{currentPair.rejected.text}</p>
              </div>

              {/* Margin */}
              <div className="p-2 bg-purple-900/20 rounded-lg text-center">
                <span className="text-xs text-gray-400">Preference Margin: </span>
                <span className="text-sm font-mono text-purple-400">{currentPair.margin.toFixed(4)}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <Scale className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Waiting for preference pairs...</p>
              </div>
            </div>
          )}
        </div>

        {/* Metrics and Signals */}
        <div className="space-y-4">
          {/* Policy Metrics */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Policy Metrics
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Preference Accuracy</span>
                  <span className="text-sm font-mono text-green-400">{(metrics.preferenceAccuracy * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${metrics.preferenceAccuracy * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">KL Divergence</span>
                  <span className="text-sm font-mono text-yellow-400">{metrics.klDivergence.toFixed(4)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, metrics.klDivergence * 1000)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Margin Satisfaction</span>
                  <span className="text-sm font-mono text-blue-400">{(metrics.marginSatisfaction * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${metrics.marginSatisfaction * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Policy Improvement</span>
                  <span className="text-sm font-mono text-purple-400">{metrics.policyImprovement.toFixed(4)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.abs(metrics.policyImprovement) * 50 + 50}%` }}
                  />
                </div>
              </div>

              {/* Reward Comparison */}
              <div className="mt-3 p-2 bg-gray-700/50 rounded">
                <div className="flex justify-between items-center">
                  <div className="text-xs">
                    <span className="text-gray-400">Chosen R: </span>
                    <span className="text-green-400 font-mono">{metrics.chosenReward.toFixed(3)}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-400">Rejected R: </span>
                    <span className="text-red-400 font-mono">{metrics.rejectedReward.toFixed(3)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Optimization Signals */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Optimization Signals
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {optimizationSignals.slice(-8).reverse().map((signal) => (
                <div
                  key={signal.id}
                  className="flex items-center justify-between py-1 px-2 rounded bg-gray-700/50"
                >
                  <div className="flex items-center gap-2">
                    {getSignalIcon(signal.type)}
                    <span className={`text-xs ${getSignalColor(signal.type)}`}>
                      {signal.type.replace('_', ' ')}
                    </span>
                  </div>
                  <span className={`text-sm font-mono ${signal.value >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {signal.value >= 0 ? '+' : ''}{signal.value.toFixed(4)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Training History */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Training Progress
            </h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {trainingHistory.length > 0 ? (
                trainingHistory.slice(-10).reverse().map((record) => (
                  <div key={record.step} className="flex items-center justify-between py-1 text-xs">
                    <span className="text-gray-500">Step {record.step}</span>
                    <div className="flex gap-3">
                      <span className="text-gray-400">
                        Acc: <span className="text-green-400 font-mono">{(record.accuracy * 100).toFixed(1)}%</span>
                      </span>
                      <span className="text-gray-400">
                        KL: <span className="text-yellow-400 font-mono">{record.klDiv.toFixed(4)}</span>
                      </span>
                      <span className="text-gray-400">
                        M: <span className="text-blue-400 font-mono">{record.margin.toFixed(3)}</span>
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No training history yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DPO Algorithm Overview */}
      <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          DPO Algorithm Overview
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-400">
              <strong>Direct Optimization:</strong> Skip reward modeling and directly optimize the policy using preference data with a closed-form solution.
            </p>
          </div>
          <div>
            <p className="text-gray-400">
              <strong>Bradley-Terry Model:</strong> Model human preferences probabilistically based on the difference in rewards between chosen and rejected responses.
            </p>
          </div>
          <div>
            <p className="text-gray-400">
              <strong>KL Constraint:</strong> Maintain proximity to reference policy through KL divergence penalty (β parameter) to prevent overfitting.
            </p>
          </div>
          <div>
            <p className="text-gray-400">
              <strong>Advantages:</strong> Simpler than RLHF, more stable training, no reward model needed, computationally efficient.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DPODemo;