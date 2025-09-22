'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, User, Bot, Brain, Target, TrendingUp, Activity, Zap, Award, BarChart3, MessageSquare, ThumbsUp, ThumbsDown, Sparkles, ArrowRight } from 'lucide-react';

// ... (keep interfaces the same)
interface Response {
  id: string;
  text: string;
  quality: number;
  feedback: 'positive' | 'negative' | null;
  reward?: number;
}

interface TrainingExample {
  id: string;
  prompt: string;
  responses: Response[];
  humanFeedback?: {
    selectedId: string;
    ranking: string[];
    timestamp: number;
  };
  modelUpdate?: {
    rewardSignal: number;
    policyGradient: number;
    valueEstimate: number;
  };
}

interface RewardSignal {
  id: string;
  value: number;
  source: 'human' | 'reward_model' | 'ppo';
  timestamp: number;
}

interface PolicyMetrics {
  averageReward: number;
  kldivergence: number;
  ppoClipRatio: number;
  valueAccuracy: number;
  humanAlignment: number;
  responseQuality: number;
}

// Generate diverse responses with varying quality
const generateResponses = (prompt: string): Response[] => {
  const templates = {
    default: [
      {
        text: "Here's a comprehensive response that addresses your question thoroughly and accurately...",
        quality: 0.85
      },
      {
        text: "Let me provide a brief but informative answer to your query...",
        quality: 0.65
      },
      {
        text: "This is a complex topic, but I'll try to explain it simply...",
        quality: 0.7
      }
    ]
  };

  const responseSet = templates.default;

  return responseSet.map((r, i) => ({
    id: `response-${Date.now()}-${i}`,
    text: r.text,
    quality: r.quality + (Math.random() * 0.1 - 0.05),
    feedback: null,
    reward: undefined
  }));
};

export const RLHFDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'generation' | 'feedback' | 'training' | 'evaluation'>('generation');
  const [currentExample, setCurrentExample] = useState<TrainingExample | null>(null);
  const [trainingExamples, setTrainingExamples] = useState<TrainingExample[]>([]);
  const [rewardSignals, setRewardSignals] = useState<RewardSignal[]>([
    { id: 'init-1', value: 0.3, source: 'human', timestamp: Date.now() - 10000 },
    { id: 'init-2', value: 0.7, source: 'reward_model', timestamp: Date.now() - 9000 },
    { id: 'init-3', value: -0.2, source: 'ppo', timestamp: Date.now() - 8000 },
  ]);
  const [metrics, setMetrics] = useState<PolicyMetrics>({
    averageReward: 0.25,
    kldivergence: 0.015,
    ppoClipRatio: 0.2,
    valueAccuracy: 0.68,
    humanAlignment: 0.45,
    responseQuality: 0.52
  });
  const [modelVersion, setModelVersion] = useState(1);
  const [trainingStep, setTrainingStep] = useState(0);

  // Use interval for demo progression
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(async () => {
      if (currentPhase === 'generation') {
        // Generate new example
        const prompts = [
          'Explain quantum computing to a 10-year-old',
          'Write a haiku about artificial intelligence',
          'Describe the process of photosynthesis',
          'What are the benefits of meditation?',
          'How does blockchain technology work?'
        ];
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

        const newExample: TrainingExample = {
          id: `example-${Date.now()}`,
          prompt: randomPrompt,
          responses: generateResponses(randomPrompt)
        };

        setCurrentExample(newExample);
        setCurrentPhase('feedback');

        // Add generation signal
        setRewardSignals(prev => [...prev.slice(-19), {
          id: `gen-${Date.now()}`,
          value: 0.3 + Math.random() * 0.2,
          source: 'reward_model',
          timestamp: Date.now()
        }]);
      } else if (currentPhase === 'feedback' && currentExample) {
        // Simulate feedback
        const responses = currentExample.responses;
        const bestResponse = responses.reduce((best, r) =>
          r.quality > best.quality ? r : best
        );

        // Add human feedback signals
        setRewardSignals(prev => [...prev.slice(-19), {
          id: `human-${Date.now()}`,
          value: 0.7 + Math.random() * 0.3,
          source: 'human',
          timestamp: Date.now()
        }]);

        const updatedExample = { ...currentExample };
        updatedExample.humanFeedback = {
          selectedId: bestResponse.id,
          ranking: [bestResponse.id],
          timestamp: Date.now()
        };
        updatedExample.responses = updatedExample.responses.map(r => ({
          ...r,
          feedback: r.id === bestResponse.id ? 'positive' : 'negative'
        }));

        setCurrentExample(updatedExample);
        setCurrentPhase('training');
      } else if (currentPhase === 'training' && currentExample) {
        // Training phase
        const updatedExample = { ...currentExample };

        // Calculate rewards
        updatedExample.responses.forEach(response => {
          const baseReward = response.quality;
          const feedbackBoost = response.feedback === 'positive' ? 0.3 : -0.3;
          response.reward = Math.tanh(baseReward + feedbackBoost + (Math.random() * 0.2 - 0.1));
        });

        // Add training signals
        setRewardSignals(prev => [...prev.slice(-19), {
          id: `train-${Date.now()}`,
          value: 0.5 + Math.random() * 0.3,
          source: 'reward_model',
          timestamp: Date.now()
        }]);

        // Add PPO signal
        setTimeout(() => {
          setRewardSignals(prev => [...prev.slice(-19), {
            id: `ppo-${Date.now()}`,
            value: 0.4 + Math.random() * 0.3,
            source: 'ppo',
            timestamp: Date.now()
          }]);
        }, 200);

        const avgReward = updatedExample.responses.reduce((sum, r) => sum + (r.reward || 0), 0) / updatedExample.responses.length;

        updatedExample.modelUpdate = {
          rewardSignal: avgReward,
          policyGradient: Math.tanh(avgReward * 2),
          valueEstimate: avgReward * 0.8 + Math.random() * 0.2
        };

        setCurrentExample(updatedExample);
        setTrainingExamples(prev => [...prev.slice(-9), updatedExample]);
        setTrainingStep(prev => prev + 1);

        // Update metrics
        setMetrics(prev => ({
          averageReward: Math.min(0.9, prev.averageReward * 0.9 + avgReward * 0.1),
          kldivergence: Math.max(0, prev.kldivergence * 0.95 + Math.random() * 0.05),
          ppoClipRatio: 0.2,
          valueAccuracy: Math.min(1, prev.valueAccuracy * 0.9 + 0.1),
          humanAlignment: Math.min(1, prev.humanAlignment * 0.9 + 0.1),
          responseQuality: Math.min(1, prev.responseQuality * 0.9 + 0.1)
        }));

        if (trainingStep > 0 && trainingStep % 10 === 0) {
          setModelVersion(prev => prev + 1);
        }

        setCurrentPhase('evaluation');
      } else if (currentPhase === 'evaluation') {
        // Evaluation phase
        setRewardSignals(prev => [...prev.slice(-19), {
          id: `eval-${Date.now()}`,
          value: 0.6 + Math.random() * 0.3,
          source: 'ppo',
          timestamp: Date.now()
        }]);

        setCurrentPhase('generation');
        setCurrentExample(null);
      }
    }, 800); // Run every 800ms

    return () => clearInterval(interval);
  }, [isRunning, currentPhase, currentExample, trainingStep]);

  const startDemo = () => {
    setIsRunning(true);
  };

  const pauseDemo = () => {
    setIsRunning(false);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentPhase('generation');
    setCurrentExample(null);
    setTrainingExamples([]);
    setRewardSignals([]);
    setMetrics({
      averageReward: 0.25,
      kldivergence: 0.015,
      ppoClipRatio: 0.2,
      valueAccuracy: 0.68,
      humanAlignment: 0.45,
      responseQuality: 0.52
    });
    setModelVersion(1);
    setTrainingStep(0);
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'generation': return 'text-blue-400';
      case 'feedback': return 'text-yellow-400';
      case 'training': return 'text-purple-400';
      case 'evaluation': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getRewardColor = (value: number) => {
    if (value > 0.5) return 'text-green-400';
    if (value > 0) return 'text-green-300';
    if (value > -0.5) return 'text-red-300';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Reinforcement Learning from Human Feedback</h2>
          <p className="text-gray-400">Interactive RLHF training pipeline with human preferences</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={isRunning ? pauseDemo : startDemo}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              isRunning
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
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

      {/* Pipeline Visualization */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          RLHF Pipeline
        </h3>
        <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
          <div className={`text-center ${currentPhase === 'generation' ? 'scale-110' : ''} transition-transform`}>
            <div className={`w-12 h-12 rounded-full ${currentPhase === 'generation' ? 'bg-blue-600' : 'bg-gray-700'} flex items-center justify-center mb-2`}>
              <Bot className="w-6 h-6" />
            </div>
            <span className={`text-sm ${getPhaseColor('generation')}`}>Generation</span>
          </div>

          <ChevronRight className="w-5 h-5 text-gray-600" />

          <div className={`text-center ${currentPhase === 'feedback' ? 'scale-110' : ''} transition-transform`}>
            <div className={`w-12 h-12 rounded-full ${currentPhase === 'feedback' ? 'bg-yellow-600' : 'bg-gray-700'} flex items-center justify-center mb-2`}>
              <User className="w-6 h-6" />
            </div>
            <span className={`text-sm ${getPhaseColor('feedback')}`}>Feedback</span>
          </div>

          <ChevronRight className="w-5 h-5 text-gray-600" />

          <div className={`text-center ${currentPhase === 'training' ? 'scale-110' : ''} transition-transform`}>
            <div className={`w-12 h-12 rounded-full ${currentPhase === 'training' ? 'bg-purple-600' : 'bg-gray-700'} flex items-center justify-center mb-2`}>
              <Brain className="w-6 h-6" />
            </div>
            <span className={`text-sm ${getPhaseColor('training')}`}>Training</span>
          </div>

          <ChevronRight className="w-5 h-5 text-gray-600" />

          <div className={`text-center ${currentPhase === 'evaluation' ? 'scale-110' : ''} transition-transform`}>
            <div className={`w-12 h-12 rounded-full ${currentPhase === 'evaluation' ? 'bg-green-600' : 'bg-gray-700'} flex items-center justify-center mb-2`}>
              <Target className="w-6 h-6" />
            </div>
            <span className={`text-sm ${getPhaseColor('evaluation')}`}>Evaluation</span>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-400 text-center">
          Model Version: <span className="text-white font-semibold">v{modelVersion}</span>
          {' • '}
          Training Steps: <span className="text-white font-semibold">{trainingStep}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Example */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            Current Example
          </h3>
          {currentExample ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Prompt</span>
                </div>
                <p className="text-gray-200">{currentExample.prompt}</p>
              </div>

              <div className="space-y-3">
                {currentExample.responses.map((response, idx) => (
                  <div
                    key={response.id}
                    className={`p-3 rounded-lg border transition-all ${
                      response.feedback === 'positive'
                        ? 'bg-green-900/20 border-green-600'
                        : response.feedback === 'negative'
                        ? 'bg-red-900/20 border-red-600'
                        : 'bg-gray-700/50 border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Response {idx + 1}</span>
                      </div>
                      {response.feedback && (
                        <div className="flex items-center gap-2">
                          {response.feedback === 'positive' ? (
                            <ThumbsUp className="w-4 h-4 text-green-400" />
                          ) : (
                            <ThumbsDown className="w-4 h-4 text-red-400" />
                          )}
                          {response.reward !== undefined && (
                            <span className={`text-sm font-mono ${getRewardColor(response.reward)}`}>
                              {response.reward.toFixed(3)}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm">{response.text}</p>
                  </div>
                ))}
              </div>

              {currentExample.modelUpdate && (
                <div className="mt-4 p-3 bg-purple-900/20 rounded-lg border border-purple-600">
                  <div className="text-sm space-y-1">
                    <div>Reward Signal: <span className="text-purple-400">{currentExample.modelUpdate.rewardSignal.toFixed(3)}</span></div>
                    <div>Policy Gradient: <span className="text-purple-400">{currentExample.modelUpdate.policyGradient.toFixed(3)}</span></div>
                    <div>Value Estimate: <span className="text-purple-400">{currentExample.modelUpdate.valueEstimate.toFixed(3)}</span></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Bot className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p>Waiting for generation...</p>
            </div>
          )}
        </div>

        {/* Metrics Panel */}
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
                  <span className="text-sm text-gray-400">Average Reward</span>
                  <span className="text-sm font-mono text-green-400">{metrics.averageReward.toFixed(3)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${metrics.averageReward * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">KL Divergence</span>
                  <span className="text-sm font-mono text-yellow-400">{metrics.kldivergence.toFixed(4)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, metrics.kldivergence * 1000)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Human Alignment</span>
                  <span className="text-sm font-mono text-blue-400">{(metrics.humanAlignment * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${metrics.humanAlignment * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Response Quality</span>
                  <span className="text-sm font-mono text-purple-400">{(metrics.responseQuality * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${metrics.responseQuality * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reward Signals */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              Reward Signals
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {rewardSignals.slice(-10).reverse().map((signal) => (
                <div
                  key={signal.id}
                  className="flex items-center justify-between py-1 px-2 rounded bg-gray-700/50"
                >
                  <div className="flex items-center gap-2">
                    {signal.source === 'human' && <User className="w-3 h-3 text-blue-400" />}
                    {signal.source === 'reward_model' && <Brain className="w-3 h-3 text-purple-400" />}
                    {signal.source === 'ppo' && <Zap className="w-3 h-3 text-yellow-400" />}
                    <span className="text-xs text-gray-400">{signal.source}</span>
                  </div>
                  <span className={`text-sm font-mono ${getRewardColor(signal.value)}`}>
                    {signal.value > 0 ? '+' : ''}{signal.value.toFixed(3)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" /> Human
              </span>
              <span className="flex items-center gap-1">
                <Brain className="w-3 h-3" /> Reward Model
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" /> PPO
              </span>
            </div>
          </div>

          {/* Training History */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Training History
            </h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {trainingExamples.length > 0 ? (
                trainingExamples.slice(-5).reverse().map((example) => (
                  <div key={example.id} className="flex items-center justify-between py-1">
                    <span className="text-sm text-gray-400 truncate flex-1">
                      {example.prompt}
                    </span>
                    {example.modelUpdate && (
                      <span className={`text-sm font-mono ml-2 ${getRewardColor(example.modelUpdate.rewardSignal)}`}>
                        R: {example.modelUpdate.rewardSignal.toFixed(2)}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No training examples yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RLHF Overview */}
      <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          RLHF Algorithm Overview
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-400 mb-1">
              <strong>Core Process:</strong> Generate multiple responses → Collect human preferences → Train reward model → Optimize policy with PPO while maintaining KL constraint.
            </p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">
              <strong>Key Components:</strong> Supervised fine-tuning (SFT), reward modeling from preferences, proximal policy optimization (PPO) with KL penalty.
            </p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">
              <strong>Human Feedback:</strong> Pairwise comparisons, rankings, or direct ratings that teach the model human values and preferences.
            </p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">
              <strong>Benefits:</strong> Aligns model behavior with human values, improves helpfulness and safety, reduces harmful outputs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RLHFDemo;