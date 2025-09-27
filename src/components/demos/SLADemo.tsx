'use client';

import React, { useState, useEffect } from 'react';
import { Brain, Database, Zap, TrendingUp, Target, BarChart, BookOpen, PlayCircle, CheckCircle, XCircle } from 'lucide-react';

interface LabeledExample {
  id: string;
  state: string;
  action: string;
  reward: number;
  isOptimal: boolean;
  features: {
    environment: number[];
    context: string[];
  };
}

interface TrainingBatch {
  batchId: string;
  examples: LabeledExample[];
  loss: number;
  accuracy: number;
}

interface AgentMetrics {
  decisionAccuracy: number;
  taskCompletion: number;
  learningProgress: number;
  generalization: number;
}

interface TestCase {
  id: string;
  state: string;
  predictedAction: string;
  optimalAction: string;
  confidence: number;
  isCorrect: boolean;
}

const SLADemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'collecting' | 'training' | 'validating' | 'testing' | 'deploying'>('collecting');
  const [trainingEpoch, setTrainingEpoch] = useState(0);
  const [labeledExamples, setLabeledExamples] = useState<LabeledExample[]>([]);
  const [trainingBatches, setTrainingBatches] = useState<TrainingBatch[]>([]);
  const [testResults, setTestResults] = useState<TestCase[]>([]);
  const [agentMetrics, setAgentMetrics] = useState<AgentMetrics>({
    decisionAccuracy: 30,
    taskCompletion: 25,
    learningProgress: 0,
    generalization: 20
  });
  const [animationProgress, setAnimationProgress] = useState(0);
  const [datasetSize, setDatasetSize] = useState(1000);
  const [batchSize, setBatchSize] = useState(32);

  const taskScenarios = [
    {
      state: "Navigate to goal while avoiding obstacles",
      optimalAction: "Calculate path using A* algorithm",
      suboptimalAction: "Move directly towards goal"
    },
    {
      state: "Respond to user query with missing context",
      optimalAction: "Ask clarifying questions first",
      suboptimalAction: "Provide generic response"
    },
    {
      state: "Handle API rate limit error",
      optimalAction: "Implement exponential backoff retry",
      suboptimalAction: "Retry immediately"
    },
    {
      state: "Process large dataset efficiently",
      optimalAction: "Use batch processing with pagination",
      suboptimalAction: "Load entire dataset at once"
    },
    {
      state: "Detect anomaly in system metrics",
      optimalAction: "Compare against baseline and alert",
      suboptimalAction: "Ignore if within threshold"
    }
  ];

  const generateLabeledExample = (index: number): LabeledExample => {
    const scenario = taskScenarios[index % taskScenarios.length];
    const isOptimal = Math.random() > 0.3; // 70% optimal examples

    return {
      id: `example-${index}`,
      state: scenario.state,
      action: isOptimal ? scenario.optimalAction : scenario.suboptimalAction,
      reward: isOptimal ? 0.8 + Math.random() * 0.2 : 0.2 + Math.random() * 0.3,
      isOptimal,
      features: {
        environment: Array.from({ length: 5 }, () => Math.random()),
        context: scenario.state.split(' ').slice(0, 3)
      }
    };
  };

  const trainOnBatch = (examples: LabeledExample[], epoch: number): TrainingBatch => {
    // Simulate training metrics improving over epochs
    const baseAccuracy = 0.3 + (epoch * 0.15);
    const noise = Math.random() * 0.1 - 0.05;
    const accuracy = Math.min(0.95, baseAccuracy + noise);

    const loss = Math.max(0.1, 2.0 - (epoch * 0.4) + Math.random() * 0.2);

    return {
      batchId: `batch-${epoch}-${Math.random().toString(36).substr(2, 9)}`,
      examples,
      loss,
      accuracy: accuracy * 100
    };
  };

  const generateTestCase = (scenario: any, model: { accuracy: number }): TestCase => {
    const isCorrect = Math.random() < model.accuracy;
    const confidence = isCorrect ?
      0.7 + Math.random() * 0.3 :
      0.3 + Math.random() * 0.4;

    return {
      id: `test-${Math.random().toString(36).substr(2, 9)}`,
      state: scenario.state,
      predictedAction: isCorrect ? scenario.optimalAction : scenario.suboptimalAction,
      optimalAction: scenario.optimalAction,
      confidence: confidence * 100,
      isCorrect
    };
  };

  const updateAgentMetrics = (epoch: number, accuracy: number) => {
    setAgentMetrics(prev => ({
      decisionAccuracy: Math.min(95, 30 + epoch * 15 + accuracy * 10),
      taskCompletion: Math.min(92, 25 + epoch * 12 + accuracy * 8),
      learningProgress: Math.min(100, (epoch + 1) * 20),
      generalization: Math.min(88, 20 + epoch * 10 + accuracy * 15)
    }));
  };

  useEffect(() => {
    if (!isRunning) return;

    const runSupervisedLearning = async () => {
      // Phase 1: Collecting labeled examples
      setCurrentPhase('collecting');
      setAnimationProgress(0);
      const examples: LabeledExample[] = [];

      for (let i = 0; i < Math.min(20, datasetSize); i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        examples.push(generateLabeledExample(i));
        setLabeledExamples([...examples]);
        setAnimationProgress((i + 1) / Math.min(20, datasetSize) * 100);
      }

      // Phase 2: Training
      setCurrentPhase('training');
      const batches: TrainingBatch[] = [];
      const epochs = 5;

      for (let epoch = 0; epoch < epochs; epoch++) {
        setTrainingEpoch(epoch);
        setAnimationProgress(0);

        // Simulate batch training
        const batchExamples = examples.slice(0, batchSize);
        const batch = trainOnBatch(batchExamples, epoch);
        batches.push(batch);
        setTrainingBatches([...batches]);

        updateAgentMetrics(epoch, batch.accuracy / 100);

        await new Promise(resolve => setTimeout(resolve, 1000));
        setAnimationProgress(((epoch + 1) / epochs) * 100);
      }

      // Phase 3: Validating
      setCurrentPhase('validating');
      setAnimationProgress(0);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAnimationProgress(100);

      // Phase 4: Testing
      setCurrentPhase('testing');
      setAnimationProgress(0);
      const tests: TestCase[] = [];
      const finalAccuracy = batches[batches.length - 1].accuracy / 100;

      for (const scenario of taskScenarios) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const testCase = generateTestCase(scenario, { accuracy: finalAccuracy });
        tests.push(testCase);
        setTestResults([...tests]);
        setAnimationProgress((tests.length / taskScenarios.length) * 100);
      }

      // Phase 5: Deploying
      setCurrentPhase('deploying');
      setAnimationProgress(0);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnimationProgress(100);

      setIsRunning(false);
    };

    runSupervisedLearning();
  }, [isRunning, datasetSize, batchSize]);

  useEffect(() => {
    if (isRunning && currentPhase !== 'deploying') {
      const interval = setInterval(() => {
        setAnimationProgress(prev => Math.min(prev + 5, 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRunning, currentPhase]);

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'collecting': return <Database className="w-5 h-5" />;
      case 'training': return <Brain className="w-5 h-5" />;
      case 'validating': return <Target className="w-5 h-5" />;
      case 'testing': return <PlayCircle className="w-5 h-5" />;
      case 'deploying': return <CheckCircle className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getProgressBarColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Supervised Learning for Agents Demo</h2>

        {/* Training Configuration */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200">Training Configuration</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Dataset Size</label>
                <span className="text-sm font-mono text-blue-400">{datasetSize}</span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={datasetSize}
                onChange={(e) => !isRunning && setDatasetSize(parseInt(e.target.value))}
                disabled={isRunning}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Batch Size</label>
                <span className="text-sm font-mono text-blue-400">{batchSize}</span>
              </div>
              <input
                type="range"
                min="8"
                max="128"
                step="8"
                value={batchSize}
                onChange={(e) => !isRunning && setBatchSize(parseInt(e.target.value))}
                disabled={isRunning}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Training Pipeline */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200">SLA Pipeline</h3>
          <div className="flex items-center gap-2">
            {['collecting', 'training', 'validating', 'testing', 'deploying'].map((phase, idx) => (
              <React.Fragment key={phase}>
                <div className={`flex-1 bg-gray-900 p-3 rounded border ${
                  currentPhase === phase ? 'border-cyan-500 bg-cyan-950' : 'border-gray-700'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {getPhaseIcon(phase)}
                    <span className="text-xs font-medium text-gray-200 capitalize">
                      {phase}
                    </span>
                  </div>
                  {currentPhase === phase && (
                    <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
                      <div
                        className="bg-cyan-500 h-1.5 rounded-full transition-all duration-300"
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
        {isRunning && currentPhase === 'training' && (
          <div className="mb-6 bg-gray-900 p-4 rounded border border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Training Epoch</span>
              <span className="text-2xl font-bold text-cyan-400">{trainingEpoch + 1}/5</span>
            </div>
          </div>
        )}

        {/* Labeled Examples */}
        {labeledExamples.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-400" />
              Labeled Training Examples ({labeledExamples.length})
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {labeledExamples.slice(0, 4).map((example) => (
                <div key={example.id} className={`p-3 rounded border ${
                  example.isOptimal ? 'bg-green-950 border-green-800' : 'bg-yellow-950 border-yellow-800'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium text-gray-400">State</span>
                    {example.isOptimal ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-300 mb-2 line-clamp-2">{example.state}</p>
                  <div className="mb-2">
                    <span className="text-xs text-gray-500">Action:</span>
                    <p className="text-xs text-gray-200 mt-1 line-clamp-2">{example.action}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Reward</span>
                    <span className={`font-bold ${
                      example.reward > 0.6 ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {example.reward.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {labeledExamples.length > 4 && (
              <p className="text-center text-xs text-gray-500 mt-2">
                ... and {labeledExamples.length - 4} more examples
              </p>
            )}
          </div>
        )}

        {/* Training Progress */}
        {trainingBatches.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Training Progress
            </h3>
            <div className="space-y-2">
              {trainingBatches.map((batch, idx) => (
                <div key={batch.batchId} className="bg-gray-900 p-3 rounded border border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Epoch {idx + 1}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">
                        Loss: <span className={getMetricColor(100 - batch.loss * 20)}>
                          {batch.loss.toFixed(3)}
                        </span>
                      </span>
                      <span className="text-sm font-medium">
                        Accuracy: <span className={getMetricColor(batch.accuracy)}>
                          {batch.accuracy.toFixed(1)}%
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-green-400" />
              Test Performance
            </h3>
            <div className="space-y-2">
              {testResults.slice(0, 3).map((test) => (
                <div key={test.id} className="bg-gray-900 p-3 rounded border border-gray-700">
                  <div className="mb-2">
                    <p className="text-xs text-gray-400">{test.state}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-gray-500">Predicted Action</span>
                      <p className="text-xs text-gray-200 mt-1">{test.predictedAction}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Confidence</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${getMetricColor(test.confidence)}`}>
                          {test.confidence.toFixed(1)}%
                        </span>
                        {test.isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {testResults.length > 0 && (
              <div className="mt-3 p-3 bg-gray-900 rounded border border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Overall Test Accuracy</span>
                  <span className="text-lg font-bold text-cyan-400">
                    {((testResults.filter(t => t.isCorrect).length / testResults.length) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Agent Metrics */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-indigo-400" />
            Agent Performance Metrics
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(agentMetrics).map(([key, value]) => (
              <div key={key} className="bg-gray-900 p-3 rounded border border-gray-700">
                <div className="text-xs text-gray-400 mb-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="text-xl font-bold text-gray-100 mb-2">
                  {value.toFixed(1)}%
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(value)}`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How SLA Works */}
        <div className="bg-gray-900 p-4 rounded border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            How Supervised Learning for Agents Works
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">1.</span>
              <div>
                <p className="font-medium text-gray-200">Data Collection</p>
                <p className="text-xs text-gray-400">Gather labeled examples of optimal agent behaviors</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">2.</span>
              <div>
                <p className="font-medium text-gray-200">Feature Extraction</p>
                <p className="text-xs text-gray-400">Extract state features and context for learning</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">3.</span>
              <div>
                <p className="font-medium text-gray-200">Model Training</p>
                <p className="text-xs text-gray-400">Train neural networks or decision trees on labeled data</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">4.</span>
              <div>
                <p className="font-medium text-gray-200">Validation & Testing</p>
                <p className="text-xs text-gray-400">Evaluate on held-out data to ensure generalization</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">5.</span>
              <div>
                <p className="font-medium text-gray-200">Deployment</p>
                <p className="text-xs text-gray-400">Deploy trained agent for real-world decision making</p>
              </div>
            </div>
          </div>
        </div>

        {/* Control Button */}
        <button
          onClick={() => {
            setIsRunning(true);
            setCurrentPhase('collecting');
            setTrainingEpoch(0);
            setLabeledExamples([]);
            setTrainingBatches([]);
            setTestResults([]);
            setAnimationProgress(0);
            setAgentMetrics({
              decisionAccuracy: 30,
              taskCompletion: 25,
              learningProgress: 0,
              generalization: 20
            });
          }}
          disabled={isRunning}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded text-white font-medium transition-colors"
        >
          {isRunning ? 'Training Agent with Supervised Learning...' : 'Start Supervised Learning'}
        </button>
      </div>
    </div>
  );
};

export default SLADemo;