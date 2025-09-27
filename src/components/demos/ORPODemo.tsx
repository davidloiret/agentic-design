'use client';

import React, { useState, useEffect } from 'react';
import { Scale, Zap, Brain, TrendingUp, Target, BarChart, Sparkles, GitBranch, Activity } from 'lucide-react';

interface ResponsePair {
  id: string;
  instruction: string;
  chosen: string;
  rejected: string;
  chosenLogProb: number;
  rejectedLogProb: number;
  oddsRatio: number;
}

interface TrainingMetrics {
  sftLoss: number;
  orLoss: number;
  totalLoss: number;
  alignment: number;
  instructionFollowing: number;
}

interface TrainingEpoch {
  epoch: number;
  pairs: ResponsePair[];
  metrics: TrainingMetrics;
  modelImprovement: number;
}

const ORPODemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'sampling' | 'computing-odds' | 'optimization' | 'evaluation' | 'complete'>('sampling');
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [trainingEpochs, setTrainingEpochs] = useState<TrainingEpoch[]>([]);
  const [currentPairs, setCurrentPairs] = useState<ResponsePair[]>([]);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [lambda, setLambda] = useState(0.1); // ORPO hyperparameter
  const [modelPerformance, setModelPerformance] = useState({
    instructionAccuracy: 50,
    alignmentScore: 45,
    efficiency: 60,
    coherence: 48
  });

  const trainingInstructions = [
    {
      instruction: "Write a Python function to calculate factorial",
      chosen: "def factorial(n):\n    if n < 0:\n        raise ValueError('Factorial undefined for negative numbers')\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)",
      rejected: "def fact(x):\n    result = 1\n    for i in range(x):\n        result = result * i\n    return result"
    },
    {
      instruction: "Explain quantum computing in simple terms",
      chosen: "Quantum computing uses quantum bits (qubits) that can exist in multiple states simultaneously, unlike classical bits which are either 0 or 1. This allows quantum computers to process many calculations in parallel, making them potentially powerful for specific problems like cryptography and drug discovery.",
      rejected: "Quantum computing is very complex and uses quantum mechanics. It's faster than regular computers and will replace them soon. It uses strange physics to compute things."
    },
    {
      instruction: "Suggest a healthy breakfast option",
      chosen: "A balanced breakfast could include: Greek yogurt with berries and a sprinkle of granola for protein and antioxidants, whole grain toast with avocado for healthy fats and fiber, and a glass of water or green tea. This provides sustained energy without excessive sugar.",
      rejected: "Just eat cereal with milk. Maybe add a banana if you want. Coffee is good too."
    }
  ];

  const generateResponsePair = (instruction: any, epoch: number): ResponsePair => {
    // Simulate log probabilities improving over epochs
    const baseQuality = 0.5 + (epoch * 0.1);
    const chosenLogProb = -Math.random() * 2 * (1 - baseQuality); // Better responses have higher (less negative) log probs
    const rejectedLogProb = -Math.random() * 4 - 2; // Rejected responses have lower log probs

    const oddsRatio = Math.exp(chosenLogProb - rejectedLogProb);

    return {
      id: `pair-${epoch}-${Math.random().toString(36).substr(2, 9)}`,
      instruction: instruction.instruction,
      chosen: instruction.chosen,
      rejected: instruction.rejected,
      chosenLogProb,
      rejectedLogProb,
      oddsRatio
    };
  };

  const computeORPOLoss = (pairs: ResponsePair[]): TrainingMetrics => {
    // Compute SFT loss (negative log likelihood of chosen responses)
    const avgChosenLogProb = pairs.reduce((sum, p) => sum + p.chosenLogProb, 0) / pairs.length;
    const sftLoss = -avgChosenLogProb;

    // Compute OR loss (odds ratio penalty)
    const avgOddsRatio = pairs.reduce((sum, p) => sum + p.oddsRatio, 0) / pairs.length;
    // Sigmoid function: 1 / (1 + e^(-x))
    const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
    const orLoss = -Math.log(sigmoid(Math.log(avgOddsRatio)));

    // Combined loss
    const totalLoss = sftLoss + lambda * orLoss;

    // Compute performance metrics
    const alignment = Math.min(95, 45 + currentEpoch * 15 + Math.random() * 10);
    const instructionFollowing = Math.min(95, 50 + currentEpoch * 12 + Math.random() * 8);

    return {
      sftLoss,
      orLoss,
      totalLoss,
      alignment,
      instructionFollowing
    };
  };

  const updateModelPerformance = (metrics: TrainingMetrics, epoch: number) => {
    setModelPerformance(prev => ({
      instructionAccuracy: Math.min(95, prev.instructionAccuracy + metrics.instructionFollowing * 0.1),
      alignmentScore: Math.min(95, prev.alignmentScore + metrics.alignment * 0.12),
      efficiency: Math.min(95, prev.efficiency + epoch * 8),
      coherence: Math.min(95, prev.coherence + (metrics.instructionFollowing + metrics.alignment) * 0.05)
    }));
  };

  useEffect(() => {
    if (!isRunning) return;

    const runORPO = async () => {
      const maxEpochs = 3;
      const allEpochs: TrainingEpoch[] = [];

      for (let epoch = 0; epoch < maxEpochs; epoch++) {
        setCurrentEpoch(epoch);

        // Phase 1: Sampling response pairs
        setCurrentPhase('sampling');
        setAnimationProgress(0);
        const pairs: ResponsePair[] = [];

        for (const instruction of trainingInstructions) {
          await new Promise(resolve => setTimeout(resolve, 500));
          const pair = generateResponsePair(instruction, epoch);
          pairs.push(pair);
          setCurrentPairs([...pairs]);
          setAnimationProgress((pairs.length / trainingInstructions.length) * 100);
        }

        // Phase 2: Computing odds ratios
        setCurrentPhase('computing-odds');
        setAnimationProgress(0);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAnimationProgress(100);

        // Phase 3: Optimization
        setCurrentPhase('optimization');
        setAnimationProgress(0);
        const metrics = computeORPOLoss(pairs);
        await new Promise(resolve => setTimeout(resolve, 1500));
        updateModelPerformance(metrics, epoch);
        setAnimationProgress(100);

        // Phase 4: Evaluation
        setCurrentPhase('evaluation');
        setAnimationProgress(0);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAnimationProgress(100);

        const epochData: TrainingEpoch = {
          epoch,
          pairs,
          metrics,
          modelImprovement: epoch > 0 ?
            ((metrics.alignment + metrics.instructionFollowing) / 2) -
            ((allEpochs[epoch - 1].metrics.alignment + allEpochs[epoch - 1].metrics.instructionFollowing) / 2) :
            0
        };

        allEpochs.push(epochData);
        setTrainingEpochs([...allEpochs]);
      }

      setCurrentPhase('complete');
      setIsRunning(false);
    };

    runORPO();
  }, [isRunning]);

  useEffect(() => {
    if (isRunning && currentPhase !== 'complete') {
      const interval = setInterval(() => {
        setAnimationProgress(prev => Math.min(prev + 5, 100));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isRunning, currentPhase]);

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'sampling': return <Brain className="w-5 h-5" />;
      case 'computing-odds': return <Scale className="w-5 h-5" />;
      case 'optimization': return <Target className="w-5 h-5" />;
      case 'evaluation': return <Activity className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const getLossColor = (loss: number) => {
    if (loss < 1) return 'text-green-400';
    if (loss < 2) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getMetricBarColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">ORPO Demo</h2>

        {/* Key Concept */}
        <div className="mb-6 bg-gray-900 p-4 rounded border border-gray-700">
          <h3 className="text-sm font-semibold mb-2 text-purple-400">Key Innovation</h3>
          <p className="text-sm text-gray-300">
            ORPO unifies instruction tuning and preference alignment in a single training phase by directly optimizing the odds ratio between chosen and rejected responses, eliminating the need for a separate reference model.
          </p>
        </div>

        {/* Hyperparameter Control */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">Lambda (λ) - OR Weight</label>
            <span className="text-sm font-mono text-blue-400">{lambda.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="0.5"
            step="0.01"
            value={lambda}
            onChange={(e) => !isRunning && setLambda(parseFloat(e.target.value))}
            disabled={isRunning}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>More SFT</span>
            <span>Balanced</span>
            <span>More Alignment</span>
          </div>
        </div>

        {/* Training Pipeline */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200">ORPO Training Pipeline</h3>
          <div className="flex items-center gap-2">
            {['sampling', 'computing-odds', 'optimization', 'evaluation', 'complete'].map((phase, idx) => (
              <React.Fragment key={phase}>
                <div className={`flex-1 bg-gray-900 p-3 rounded border ${
                  currentPhase === phase ? 'border-purple-500 bg-purple-950' : 'border-gray-700'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {getPhaseIcon(phase)}
                    <span className="text-xs font-medium text-gray-200 capitalize">
                      {phase.replace('-', ' ')}
                    </span>
                  </div>
                  {currentPhase === phase && phase !== 'complete' && (
                    <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
                      <div
                        className="bg-purple-500 h-1.5 rounded-full transition-all duration-300"
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

        {/* Current Training Info */}
        {isRunning && currentEpoch !== undefined && (
          <div className="mb-6 bg-gray-900 p-4 rounded border border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Training Epoch</span>
              <span className="text-2xl font-bold text-purple-400">{currentEpoch + 1}/3</span>
            </div>
          </div>
        )}

        {/* Response Pairs */}
        {currentPairs.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-blue-400" />
              Response Pairs
            </h3>
            <div className="space-y-3">
              {currentPairs.slice(0, 2).map((pair, idx) => (
                <div key={pair.id} className="bg-gray-900 p-4 rounded border border-gray-700">
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-400">Instruction:</span>
                    <p className="text-sm text-gray-200 mt-1">{pair.instruction}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-950 p-3 rounded border border-green-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-green-400">✓ Chosen</span>
                        <span className="text-xs text-green-300">
                          logP: {pair.chosenLogProb.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 line-clamp-3 font-mono">
                        {pair.chosen.substring(0, 100)}...
                      </p>
                    </div>

                    <div className="bg-red-950 p-3 rounded border border-red-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-red-400">✗ Rejected</span>
                        <span className="text-xs text-red-300">
                          logP: {pair.rejectedLogProb.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 line-clamp-3 font-mono">
                        {pair.rejected.substring(0, 100)}...
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between bg-gray-800 p-2 rounded">
                    <span className="text-xs text-gray-400">Odds Ratio</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-purple-500 h-1.5 rounded-full"
                          style={{ width: `${Math.min(pair.oddsRatio * 20, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-purple-400">
                        {pair.oddsRatio.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {currentPairs.length > 2 && (
                <div className="text-center text-xs text-gray-500">
                  ... and {currentPairs.length - 2} more pairs
                </div>
              )}
            </div>
          </div>
        )}

        {/* Training Metrics */}
        {trainingEpochs.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <BarChart className="w-5 h-5 text-green-400" />
              Training Progress
            </h3>
            <div className="space-y-3">
              {trainingEpochs.map((epoch, idx) => (
                <div key={idx} className="bg-gray-900 p-4 rounded border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-200">Epoch {epoch.epoch + 1}</span>
                    <div className="flex items-center gap-4">
                      {epoch.modelImprovement > 0 && (
                        <span className="text-sm text-green-400">
                          +{epoch.modelImprovement.toFixed(1)}% improvement
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center">
                      <div className="text-xs text-gray-500">SFT Loss</div>
                      <div className={`text-lg font-bold ${getLossColor(epoch.metrics.sftLoss)}`}>
                        {epoch.metrics.sftLoss.toFixed(3)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500">OR Loss</div>
                      <div className={`text-lg font-bold ${getLossColor(epoch.metrics.orLoss)}`}>
                        {epoch.metrics.orLoss.toFixed(3)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Total Loss</div>
                      <div className={`text-lg font-bold ${getLossColor(epoch.metrics.totalLoss)}`}>
                        {epoch.metrics.totalLoss.toFixed(3)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Instruction Following</span>
                        <span className="text-gray-300">{epoch.metrics.instructionFollowing.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${getMetricBarColor(epoch.metrics.instructionFollowing)}`}
                          style={{ width: `${epoch.metrics.instructionFollowing}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Alignment</span>
                        <span className="text-gray-300">{epoch.metrics.alignment.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${getMetricBarColor(epoch.metrics.alignment)}`}
                          style={{ width: `${epoch.metrics.alignment}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Model Performance */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Model Performance
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(modelPerformance).map(([key, value]) => (
              <div key={key} className="bg-gray-900 p-3 rounded border border-gray-700">
                <div className="text-xs text-gray-400 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="text-xl font-bold text-gray-100 mb-2">
                  {value.toFixed(1)}%
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getMetricBarColor(value)}`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How ORPO Works */}
        <div className="bg-gray-900 p-4 rounded border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" />
            How ORPO Works
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">1.</span>
              <div>
                <p className="font-medium text-gray-200">Single-Phase Training</p>
                <p className="text-xs text-gray-400">Combines SFT and preference alignment without needing a reference model</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">2.</span>
              <div>
                <p className="font-medium text-gray-200">Odds Ratio Optimization</p>
                <p className="text-xs text-gray-400">Maximizes ratio P(chosen)/P(rejected) to increase preference margins</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">3.</span>
              <div>
                <p className="font-medium text-gray-200">Combined Loss Function</p>
                <p className="text-xs text-gray-400">L = L_SFT + λ * L_OR balances instruction following and alignment</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">4.</span>
              <div>
                <p className="font-medium text-gray-200">Memory Efficient</p>
                <p className="text-xs text-gray-400">No KL divergence computation or reference model storage needed</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">5.</span>
              <div>
                <p className="font-medium text-gray-200">Direct Optimization</p>
                <p className="text-xs text-gray-400">Directly increases likelihood gap between preferred and rejected outputs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Control Button */}
        <button
          onClick={() => {
            setIsRunning(true);
            setCurrentPhase('sampling');
            setCurrentEpoch(0);
            setTrainingEpochs([]);
            setCurrentPairs([]);
            setAnimationProgress(0);
            setModelPerformance({
              instructionAccuracy: 50,
              alignmentScore: 45,
              efficiency: 60,
              coherence: 48
            });
          }}
          disabled={isRunning}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded text-white font-medium transition-colors"
        >
          {isRunning ? 'Training with ORPO...' : 'Start ORPO Training'}
        </button>
      </div>
    </div>
  );
};

export default ORPODemo;