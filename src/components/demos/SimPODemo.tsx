'use client';

import React, { useState, useEffect } from 'react';
import { Zap, Brain, TrendingUp, Minus, Plus, BarChart, Settings, Target, Activity } from 'lucide-react';

interface PreferencePair {
  id: string;
  prompt: string;
  winner: string;
  loser: string;
  winnerLength: number;
  loserLength: number;
  avgLogProb: {
    winner: number;
    loser: number;
  };
  margin: number;
}

interface TrainingMetrics {
  loss: number;
  accuracy: number;
  efficiency: number;
  convergenceRate: number;
}

interface TrainingStep {
  step: number;
  batch: PreferencePair[];
  metrics: TrainingMetrics;
  beta: number;
  gamma: number;
}

interface ModelState {
  alignment: number;
  simplicity: number;
  performance: number;
  efficiency: number;
}

const SimPODemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'loading' | 'computing' | 'optimizing' | 'updating' | 'complete'>('loading');
  const [currentStep, setCurrentStep] = useState(0);
  const [trainingSteps, setTrainingSteps] = useState<TrainingStep[]>([]);
  const [currentBatch, setCurrentBatch] = useState<PreferencePair[]>([]);
  const [modelState, setModelState] = useState<ModelState>({
    alignment: 45,
    simplicity: 70,
    performance: 50,
    efficiency: 80
  });
  const [beta, setBeta] = useState(2.0); // SimPO temperature parameter
  const [gamma, setGamma] = useState(0.5); // Length normalization weight
  const [animationProgress, setAnimationProgress] = useState(0);

  const trainingPrompts = [
    {
      prompt: "Explain machine learning",
      winner: "Machine learning enables computers to learn patterns from data without explicit programming. It uses algorithms that improve through experience, finding insights and making decisions based on input data.",
      loser: "ML is when computers learn stuff automatically from data using math and statistics to do things."
    },
    {
      prompt: "Write a function to sort an array",
      winner: "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr",
      loser: "def sort(a):\n    # sorts the array\n    return sorted(a)"
    },
    {
      prompt: "Describe the water cycle",
      winner: "The water cycle is Earth's continuous process of water movement: evaporation from oceans and lakes, condensation into clouds, precipitation as rain or snow, and collection back into water bodies. This cycle is driven by solar energy and gravity.",
      loser: "Water goes up into clouds then falls down as rain and repeats forever."
    }
  ];

  const generatePreferencePair = (data: any, stepNum: number): PreferencePair => {
    const winnerLength = data.winner.length;
    const loserLength = data.loser.length;

    // SimPO uses average log probability normalized by length
    const baseQuality = 0.5 + (stepNum * 0.1);
    const winnerAvgLogProb = -Math.random() * 1.5 * (1 - baseQuality) - 0.5;
    const loserAvgLogProb = -Math.random() * 2.5 - 1.5;

    // SimPO margin: β * (avgLogP_winner - avgLogP_loser) - γ
    const margin = beta * (winnerAvgLogProb - loserAvgLogProb) - gamma;

    return {
      id: `pair-${stepNum}-${Math.random().toString(36).substr(2, 9)}`,
      prompt: data.prompt,
      winner: data.winner,
      loser: data.loser,
      winnerLength,
      loserLength,
      avgLogProb: {
        winner: winnerAvgLogProb,
        loser: loserAvgLogProb
      },
      margin
    };
  };

  const computeSimPOLoss = (pairs: PreferencePair[]): number => {
    // SimPO loss: -log(sigmoid(margin))
    const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

    const losses = pairs.map(pair => {
      const loss = -Math.log(sigmoid(pair.margin));
      return loss;
    });

    return losses.reduce((sum, loss) => sum + loss, 0) / losses.length;
  };

  const calculateMetrics = (pairs: PreferencePair[], loss: number, step: number): TrainingMetrics => {
    // Calculate accuracy based on margin (positive margin = correct preference)
    const correctPairs = pairs.filter(p => p.margin > 0).length;
    const accuracy = (correctPairs / pairs.length) * 100;

    // Efficiency improves with SimPO due to no reference model
    const efficiency = Math.min(95, 80 + step * 3);

    // Convergence rate based on loss decrease
    const convergenceRate = Math.max(0, 100 - loss * 20);

    return {
      loss,
      accuracy,
      efficiency,
      convergenceRate
    };
  };

  const updateModelState = (metrics: TrainingMetrics, step: number) => {
    const learningRate = 0.1;

    setModelState(prev => ({
      alignment: Math.min(95, prev.alignment + metrics.accuracy * 0.01 * (1 + step * 0.2)),
      simplicity: Math.min(95, 70 + step * 5), // SimPO is inherently simple
      performance: Math.min(95, prev.performance + metrics.convergenceRate * 0.01 * (1 + step * 0.15)),
      efficiency: Math.min(95, prev.efficiency + step * 2) // No reference model = high efficiency
    }));
  };

  useEffect(() => {
    if (!isRunning) return;

    const runSimPO = async () => {
      const totalSteps = 4;
      const allSteps: TrainingStep[] = [];

      for (let step = 0; step < totalSteps; step++) {
        setCurrentStep(step);

        // Phase 1: Loading batch
        setCurrentPhase('loading');
        setAnimationProgress(0);
        await new Promise(resolve => setTimeout(resolve, 800));

        // Generate batch
        const batch: PreferencePair[] = [];
        for (const prompt of trainingPrompts) {
          const pair = generatePreferencePair(prompt, step);
          batch.push(pair);
        }
        setCurrentBatch(batch);
        setAnimationProgress(100);

        // Phase 2: Computing margins
        setCurrentPhase('computing');
        setAnimationProgress(0);
        await new Promise(resolve => setTimeout(resolve, 1200));
        setAnimationProgress(100);

        // Phase 3: Optimizing
        setCurrentPhase('optimizing');
        setAnimationProgress(0);
        const loss = computeSimPOLoss(batch);
        const metrics = calculateMetrics(batch, loss, step);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setAnimationProgress(100);

        // Phase 4: Updating model
        setCurrentPhase('updating');
        setAnimationProgress(0);
        updateModelState(metrics, step);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAnimationProgress(100);

        // Store step data
        const stepData: TrainingStep = {
          step,
          batch,
          metrics,
          beta,
          gamma
        };

        allSteps.push(stepData);
        setTrainingSteps([...allSteps]);
      }

      setCurrentPhase('complete');
      setIsRunning(false);
    };

    runSimPO();
  }, [isRunning, beta, gamma]);

  useEffect(() => {
    if (isRunning && currentPhase !== 'complete' && currentPhase !== 'loading') {
      const interval = setInterval(() => {
        setAnimationProgress(prev => Math.min(prev + 10, 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRunning, currentPhase]);

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'loading': return <Brain className="w-5 h-5" />;
      case 'computing': return <Target className="w-5 h-5" />;
      case 'optimizing': return <TrendingUp className="w-5 h-5" />;
      case 'updating': return <Activity className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const getPhaseDescription = (phase: string) => {
    switch (phase) {
      case 'loading': return 'Loading preference pairs...';
      case 'computing': return 'Computing length-normalized margins...';
      case 'optimizing': return 'Optimizing without reference model...';
      case 'updating': return 'Updating model parameters...';
      case 'complete': return 'Training complete!';
      default: return 'Ready';
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">SimPO Demo</h2>

        {/* Key Features */}
        <div className="mb-6 bg-gray-900 p-4 rounded border border-gray-700">
          <h3 className="text-sm font-semibold mb-3 text-purple-400">SimPO Advantages</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <Minus className="w-4 h-4 text-red-400" />
              <span className="text-xs text-gray-300">No Reference Model</span>
            </div>
            <div className="flex items-center gap-2">
              <Minus className="w-4 h-4 text-red-400" />
              <span className="text-xs text-gray-300">No Reward Margin</span>
            </div>
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-300">Length Normalization</span>
            </div>
          </div>
        </div>

        {/* Hyperparameters */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            Hyperparameters
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Beta (β)</label>
                <span className="text-sm font-mono text-blue-400">{beta.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={beta}
                onChange={(e) => !isRunning && setBeta(parseFloat(e.target.value))}
                disabled={isRunning}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-1">Temperature for margin scaling</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Gamma (γ)</label>
                <span className="text-sm font-mono text-blue-400">{gamma.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="2.0"
                step="0.1"
                value={gamma}
                onChange={(e) => !isRunning && setGamma(parseFloat(e.target.value))}
                disabled={isRunning}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-1">Target reward margin</p>
            </div>
          </div>
        </div>

        {/* Training Pipeline */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200">SimPO Pipeline</h3>
          <div className="flex items-center gap-2">
            {['loading', 'computing', 'optimizing', 'updating', 'complete'].map((phase, idx) => (
              <React.Fragment key={phase}>
                <div className={`flex-1 bg-gray-900 p-3 rounded border ${
                  currentPhase === phase ? 'border-indigo-500 bg-indigo-950' : 'border-gray-700'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {getPhaseIcon(phase)}
                    <span className="text-xs font-medium text-gray-200 capitalize">
                      {phase}
                    </span>
                  </div>
                  {currentPhase === phase && phase !== 'complete' && (
                    <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
                      <div
                        className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${animationProgress}%` }}
                      />
                    </div>
                  )}
                </div>
                {idx < 4 && <Zap className="w-3 h-3 text-gray-600" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Current Status */}
        {isRunning && (
          <div className="mb-6 bg-gray-900 p-4 rounded border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{getPhaseDescription(currentPhase)}</span>
              <span className="text-lg font-bold text-indigo-400">Step {currentStep + 1}/4</span>
            </div>
          </div>
        )}

        {/* Current Batch */}
        {currentBatch.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              Preference Pairs
            </h3>
            <div className="space-y-3">
              {currentBatch.slice(0, 2).map((pair, idx) => (
                <div key={pair.id} className="bg-gray-900 p-4 rounded border border-gray-700">
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-400">Prompt:</span>
                    <p className="text-sm text-gray-200 mt-1">{pair.prompt}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-green-950 p-3 rounded border border-green-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-green-400">✓ Winner</span>
                        <span className="text-xs text-gray-400">
                          {pair.winnerLength} tokens
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 line-clamp-2">{pair.winner}</p>
                      <div className="mt-2 text-xs text-green-300">
                        Avg Log P: {pair.avgLogProb.winner.toFixed(3)}
                      </div>
                    </div>

                    <div className="bg-red-950 p-3 rounded border border-red-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-red-400">✗ Loser</span>
                        <span className="text-xs text-gray-400">
                          {pair.loserLength} tokens
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 line-clamp-2">{pair.loser}</p>
                      <div className="mt-2 text-xs text-red-300">
                        Avg Log P: {pair.avgLogProb.loser.toFixed(3)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-gray-800 p-2 rounded">
                    <span className="text-xs text-gray-400">
                      SimPO Margin: β(r̄_w - r̄_l) - γ
                    </span>
                    <span className={`text-sm font-bold ${
                      pair.margin > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {pair.margin.toFixed(3)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Training Progress */}
        {trainingSteps.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <BarChart className="w-5 h-5 text-green-400" />
              Training Progress
            </h3>
            <div className="space-y-3">
              {trainingSteps.map((step, idx) => (
                <div key={idx} className="bg-gray-900 p-4 rounded border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-200">Step {step.step + 1}</span>
                    <div className="flex items-center gap-4">
                      <span className={`text-sm ${getLossColor(step.metrics.loss)}`}>
                        Loss: {step.metrics.loss.toFixed(3)}
                      </span>
                      <span className={`text-sm font-medium ${getMetricColor(step.metrics.accuracy)}`}>
                        {step.metrics.accuracy.toFixed(1)}% accurate
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Convergence</span>
                        <span className="text-gray-300">{step.metrics.convergenceRate.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${step.metrics.convergenceRate}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Efficiency</span>
                        <span className="text-gray-300">{step.metrics.efficiency.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div
                          className="bg-green-500 h-1.5 rounded-full"
                          style={{ width: `${step.metrics.efficiency}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Model State */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            Model State
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(modelState).map(([key, value]) => (
              <div key={key} className="bg-gray-900 p-3 rounded border border-gray-700">
                <div className="text-xs text-gray-400 mb-1 capitalize">{key}</div>
                <div className="text-xl font-bold text-gray-100 mb-2">
                  {value.toFixed(1)}%
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      value >= 80 ? 'bg-green-500' : value >= 60 ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How SimPO Works */}
        <div className="bg-gray-900 p-4 rounded border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" />
            How SimPO Works
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">1.</span>
              <div>
                <p className="font-medium text-gray-200">Average Log Probability</p>
                <p className="text-xs text-gray-400">Use sequence-level average log probability as implicit reward</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">2.</span>
              <div>
                <p className="font-medium text-gray-200">Length Normalization</p>
                <p className="text-xs text-gray-400">Normalize by sequence length to prevent length bias</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">3.</span>
              <div>
                <p className="font-medium text-gray-200">Direct Optimization</p>
                <p className="text-xs text-gray-400">Optimize Bradley-Terry objective without reference model</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">4.</span>
              <div>
                <p className="font-medium text-gray-200">Simple Loss Function</p>
                <p className="text-xs text-gray-400">L = -log σ(β(r̄_w - r̄_l) - γ)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">5.</span>
              <div>
                <p className="font-medium text-gray-200">Memory Efficient</p>
                <p className="text-xs text-gray-400">No reference model, no explicit rewards, minimal memory overhead</p>
              </div>
            </div>
          </div>
        </div>

        {/* Control Button */}
        <button
          onClick={() => {
            setIsRunning(true);
            setCurrentPhase('loading');
            setCurrentStep(0);
            setTrainingSteps([]);
            setCurrentBatch([]);
            setAnimationProgress(0);
            setModelState({
              alignment: 45,
              simplicity: 70,
              performance: 50,
              efficiency: 80
            });
          }}
          disabled={isRunning}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded text-white font-medium transition-colors"
        >
          {isRunning ? 'Training with SimPO...' : 'Start SimPO Training'}
        </button>
      </div>
    </div>
  );
};

const getLossColor = (loss: number) => {
  if (loss < 0.5) return 'text-green-400';
  if (loss < 1.0) return 'text-yellow-400';
  return 'text-orange-400';
};

export default SimPODemo;