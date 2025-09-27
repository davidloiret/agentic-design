'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Cpu, Zap, TrendingUp, Brain, BarChart, Settings, Play, Gauge } from 'lucide-react';

interface ComputeMode {
  id: string;
  name: string;
  computeUnits: number;
  samplesGenerated: number;
  color: string;
  description: string;
}

interface Sample {
  id: string;
  solution: string;
  confidence: number;
  computeTime: number;
  reasoning: string[];
}

interface PerformanceMetrics {
  accuracy: number;
  latency: number;
  throughput: number;
  costEfficiency: number;
}

const TTSDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string>('balanced');
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'sampling' | 'voting' | 'aggregating' | 'complete'>('idle');
  const [problemComplexity, setProblemComplexity] = useState<'simple' | 'medium' | 'complex'>('medium');
  const [samples, setSamples] = useState<Sample[]>([]);
  const [finalAnswer, setFinalAnswer] = useState<string>('');
  const [computeProgress, setComputeProgress] = useState(0);
  const [votingResults, setVotingResults] = useState<Map<string, number>>(new Map());
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    accuracy: 0,
    latency: 0,
    throughput: 0,
    costEfficiency: 0
  });

  const computeModes: ComputeMode[] = [
    {
      id: 'minimal',
      name: 'Minimal',
      computeUnits: 1,
      samplesGenerated: 1,
      color: 'text-green-400',
      description: 'Single pass, fastest inference'
    },
    {
      id: 'balanced',
      name: 'Balanced',
      computeUnits: 4,
      samplesGenerated: 8,
      color: 'text-blue-400',
      description: 'Multiple samples with voting'
    },
    {
      id: 'intensive',
      name: 'Intensive',
      computeUnits: 8,
      samplesGenerated: 32,
      color: 'text-purple-400',
      description: 'Many samples with verification'
    },
    {
      id: 'extreme',
      name: 'Extreme',
      computeUnits: 16,
      samplesGenerated: 128,
      color: 'text-red-400',
      description: 'Maximum compute for hard problems'
    }
  ];

  const problems = {
    simple: {
      question: "What is 15 × 24?",
      correctAnswer: "360",
      solutions: ["360", "350", "370", "360", "360", "340", "360", "360"]
    },
    medium: {
      question: "A train travels 180 miles in 3 hours. If it maintains the same speed, how long will it take to travel 420 miles?",
      correctAnswer: "7 hours",
      solutions: ["7 hours", "6.5 hours", "7 hours", "8 hours", "7 hours", "7.5 hours", "7 hours", "7 hours"]
    },
    complex: {
      question: "In a tournament, each team plays every other team exactly once. If there were 45 games total, how many teams participated?",
      correctAnswer: "10 teams",
      solutions: ["10 teams", "9 teams", "10 teams", "11 teams", "10 teams", "10 teams", "8 teams", "10 teams"]
    }
  };

  const generateSample = (index: number, mode: ComputeMode): Sample => {
    const problem = problems[problemComplexity];
    const baseAccuracy = mode.computeUnits * 0.05 + 0.6;
    const isCorrect = Math.random() < baseAccuracy;

    const possibleSolutions = problem.solutions;
    const solution = isCorrect ?
      problem.correctAnswer :
      possibleSolutions[Math.floor(Math.random() * possibleSolutions.length)];

    const reasoningSteps = [
      `Step 1: Parse the problem statement`,
      `Step 2: Identify key values and constraints`,
      `Step 3: Apply relevant mathematical principles`,
      `Step 4: Perform calculations`,
      `Step 5: Verify solution consistency`
    ];

    return {
      id: `sample-${index}`,
      solution,
      confidence: 0.5 + Math.random() * 0.5 * (mode.computeUnits / 10),
      computeTime: 100 + Math.random() * 50 * mode.computeUnits,
      reasoning: reasoningSteps.slice(0, Math.min(3 + Math.floor(mode.computeUnits / 4), 5))
    };
  };

  const aggregateSamples = (samples: Sample[]): string => {
    // Majority voting with confidence weighting
    const voteCounts = new Map<string, number>();

    samples.forEach(sample => {
      const weight = sample.confidence;
      voteCounts.set(
        sample.solution,
        (voteCounts.get(sample.solution) || 0) + weight
      );
    });

    setVotingResults(voteCounts);

    let bestSolution = '';
    let maxVotes = 0;
    voteCounts.forEach((votes, solution) => {
      if (votes > maxVotes) {
        maxVotes = votes;
        bestSolution = solution;
      }
    });

    return bestSolution;
  };

  const calculateMetrics = (mode: ComputeMode, samples: Sample[], finalAnswer: string) => {
    const problem = problems[problemComplexity];
    const isCorrect = finalAnswer === problem.correctAnswer;

    const baseAccuracy = {
      minimal: 65,
      balanced: 78,
      intensive: 88,
      extreme: 95
    }[mode.id] || 70;

    const complexityMultiplier = {
      simple: 1.1,
      medium: 1.0,
      complex: 0.85
    }[problemComplexity];

    const accuracy = Math.min(95, baseAccuracy * complexityMultiplier + (isCorrect ? 5 : -5));
    const avgLatency = samples.reduce((sum, s) => sum + s.computeTime, 0) / samples.length;

    setPerformanceMetrics({
      accuracy,
      latency: avgLatency,
      throughput: 1000 / avgLatency,
      costEfficiency: accuracy / (mode.computeUnits * 10)
    });
  };

  useEffect(() => {
    if (!isRunning) return;

    const mode = computeModes.find(m => m.id === selectedMode)!;

    const runTestTimeScaling = async () => {
      // Phase 1: Sampling
      setCurrentPhase('sampling');
      setSamples([]);
      setComputeProgress(0);

      const generatedSamples: Sample[] = [];
      const totalSamples = mode.samplesGenerated;

      for (let i = 0; i < totalSamples; i++) {
        await new Promise(resolve => setTimeout(resolve, 100 / Math.sqrt(mode.computeUnits)));
        const sample = generateSample(i, mode);
        generatedSamples.push(sample);
        setSamples([...generatedSamples]);
        setComputeProgress((i + 1) / totalSamples * 100);
      }

      // Phase 2: Voting
      setCurrentPhase('voting');
      setComputeProgress(0);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setComputeProgress(100);

      // Phase 3: Aggregating
      setCurrentPhase('aggregating');
      setComputeProgress(0);
      await new Promise(resolve => setTimeout(resolve, 800));

      const answer = aggregateSamples(generatedSamples);
      setFinalAnswer(answer);
      calculateMetrics(mode, generatedSamples, answer);
      setComputeProgress(100);

      // Phase 4: Complete
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentPhase('complete');
      setIsRunning(false);
    };

    runTestTimeScaling();
  }, [isRunning, selectedMode, problemComplexity]);

  const getPhaseDescription = () => {
    switch (currentPhase) {
      case 'sampling':
        return 'Generating multiple solution candidates...';
      case 'voting':
        return 'Performing majority voting on samples...';
      case 'aggregating':
        return 'Aggregating results with confidence weighting...';
      case 'complete':
        return 'Inference complete!';
      default:
        return 'Ready to start inference';
    }
  };

  const getMetricColor = (value: number, metric: string) => {
    if (metric === 'accuracy' || metric === 'costEfficiency') {
      if (value >= 80) return 'text-green-400';
      if (value >= 60) return 'text-yellow-400';
      return 'text-orange-400';
    }
    if (metric === 'latency') {
      if (value <= 200) return 'text-green-400';
      if (value <= 400) return 'text-yellow-400';
      return 'text-orange-400';
    }
    if (metric === 'throughput') {
      if (value >= 5) return 'text-green-400';
      if (value >= 2) return 'text-yellow-400';
      return 'text-orange-400';
    }
    return 'text-gray-400';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Test-Time Scaling Demo</h2>

        {/* Problem Setup */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-300">Problem Complexity</label>
            <div className="flex gap-2">
              {(['simple', 'medium', 'complex'] as const).map(level => (
                <button
                  key={level}
                  onClick={() => !isRunning && setProblemComplexity(level)}
                  disabled={isRunning}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    problemComplexity === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-gray-900 p-4 rounded border border-gray-700">
            <p className="text-gray-100">{problems[problemComplexity].question}</p>
          </div>
        </div>

        {/* Compute Mode Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            Compute Mode
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {computeModes.map(mode => (
              <div
                key={mode.id}
                onClick={() => !isRunning && setSelectedMode(mode.id)}
                className={`p-4 rounded border cursor-pointer transition-all ${
                  selectedMode === mode.id
                    ? 'bg-gray-900 border-blue-500'
                    : 'bg-gray-900 border-gray-700 hover:border-gray-600'
                } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${mode.color}`}>{mode.name}</span>
                  <div className="flex items-center gap-1">
                    <Cpu className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-400">{mode.computeUnits}x</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-2">{mode.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Samples: {mode.samplesGenerated}</span>
                  <span className={mode.color}>
                    {mode.computeUnits <= 4 ? 'Fast' : mode.computeUnits <= 8 ? 'Moderate' : 'Slow'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inference Pipeline */}
        {currentPhase !== 'idle' && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Inference Pipeline
            </h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">{getPhaseDescription()}</span>
                <span className="text-sm font-medium text-blue-400 capitalize">
                  {currentPhase}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${computeProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Generated Samples */}
        {samples.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              Generated Samples ({samples.length})
            </h3>
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
              {samples.slice(0, 8).map((sample, idx) => (
                <div key={sample.id} className="bg-gray-900 p-3 rounded border border-gray-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Sample {idx + 1}</span>
                    <span className="text-xs text-blue-400">
                      {(sample.confidence * 100).toFixed(0)}% conf
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-200">{sample.solution}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {sample.computeTime.toFixed(0)}ms
                  </p>
                </div>
              ))}
              {samples.length > 8 && (
                <div className="col-span-2 text-center text-xs text-gray-500 py-2">
                  ... and {samples.length - 8} more samples
                </div>
              )}
            </div>
          </div>
        )}

        {/* Voting Results */}
        {votingResults.size > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200">Voting Results</h3>
            <div className="space-y-2">
              {Array.from(votingResults.entries())
                .sort(([, a], [, b]) => b - a)
                .map(([solution, votes]) => (
                  <div key={solution} className="bg-gray-900 p-3 rounded border border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{solution}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${(votes / Math.max(...votingResults.values())) * 100}%`
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium text-blue-400">
                          {votes.toFixed(1)} votes
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Final Answer */}
        {finalAnswer && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200">Final Answer</h3>
            <div className={`p-4 rounded border ${
              finalAnswer === problems[problemComplexity].correctAnswer
                ? 'bg-green-950 border-green-800'
                : 'bg-red-950 border-red-800'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-100">{finalAnswer}</span>
                <span className={`text-sm font-medium ${
                  finalAnswer === problems[problemComplexity].correctAnswer
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}>
                  {finalAnswer === problems[problemComplexity].correctAnswer ? '✓ Correct' : '✗ Incorrect'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Performance Metrics */}
        {currentPhase === 'complete' && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <BarChart className="w-5 h-5 text-green-400" />
              Performance Metrics
            </h3>
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <Gauge className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-400">Accuracy</span>
                </div>
                <p className={`text-xl font-bold ${getMetricColor(performanceMetrics.accuracy, 'accuracy')}`}>
                  {performanceMetrics.accuracy.toFixed(1)}%
                </p>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-400">Latency</span>
                </div>
                <p className={`text-xl font-bold ${getMetricColor(performanceMetrics.latency, 'latency')}`}>
                  {performanceMetrics.latency.toFixed(0)}ms
                </p>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-400">Throughput</span>
                </div>
                <p className={`text-xl font-bold ${getMetricColor(performanceMetrics.throughput, 'throughput')}`}>
                  {performanceMetrics.throughput.toFixed(1)}/s
                </p>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <Cpu className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-400">Efficiency</span>
                </div>
                <p className={`text-xl font-bold ${getMetricColor(performanceMetrics.costEfficiency * 10, 'costEfficiency')}`}>
                  {(performanceMetrics.costEfficiency * 10).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* How TTS Works */}
        <div className="bg-gray-900 p-4 rounded border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" />
            How Test-Time Scaling Works
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">1.</span>
              <div>
                <p className="font-medium text-gray-200">Multiple Sampling</p>
                <p className="text-xs text-gray-400">Generate many candidate solutions with the same model</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">2.</span>
              <div>
                <p className="font-medium text-gray-200">Majority Voting</p>
                <p className="text-xs text-gray-400">Aggregate samples through voting or confidence weighting</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">3.</span>
              <div>
                <p className="font-medium text-gray-200">Verification Steps</p>
                <p className="text-xs text-gray-400">Apply additional verification or consistency checks</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">4.</span>
              <div>
                <p className="font-medium text-gray-200">Adaptive Compute</p>
                <p className="text-xs text-gray-400">Scale computation based on problem difficulty</p>
              </div>
            </div>
          </div>
        </div>

        {/* Control Button */}
        <button
          onClick={() => {
            setIsRunning(true);
            setCurrentPhase('idle');
            setSamples([]);
            setFinalAnswer('');
            setVotingResults(new Map());
            setComputeProgress(0);
            setPerformanceMetrics({
              accuracy: 0,
              latency: 0,
              throughput: 0,
              costEfficiency: 0
            });
          }}
          disabled={isRunning}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded text-white font-medium transition-colors flex items-center justify-center gap-2"
        >
          {isRunning ? (
            <>Running Test-Time Scaling...</>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Start Inference with {computeModes.find(m => m.id === selectedMode)?.name} Mode
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TTSDemo;