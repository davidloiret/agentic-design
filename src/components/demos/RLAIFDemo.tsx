'use client';

import React, { useState, useEffect } from 'react';
import { Bot, Brain, Zap, TrendingUp, Target, BarChart, Sparkles, RefreshCw, CheckCircle } from 'lucide-react';

interface Response {
  id: string;
  text: string;
  quality: number;
}

interface AIFeedback {
  responseId: string;
  helpfulness: number;
  accuracy: number;
  safety: number;
  coherence: number;
  overall: number;
  explanation: string;
}

interface TrainingBatch {
  iteration: number;
  responses: Response[];
  feedback: AIFeedback[];
  reward: number;
  improvement: number;
}

interface ModelMetrics {
  quality: number;
  alignment: number;
  efficiency: number;
  consistency: number;
}

const RLAIFDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'generation' | 'ai-evaluation' | 'reward-modeling' | 'optimization' | 'complete'>('generation');
  const [currentIteration, setCurrentIteration] = useState(0);
  const [trainingBatches, setTrainingBatches] = useState<TrainingBatch[]>([]);
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics>({
    quality: 45,
    alignment: 40,
    efficiency: 50,
    consistency: 42
  });
  const [currentResponses, setCurrentResponses] = useState<Response[]>([]);
  const [currentFeedback, setCurrentFeedback] = useState<AIFeedback[]>([]);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [totalReward, setTotalReward] = useState(0);

  const userPrompt = "Explain how to build a successful startup in the tech industry";

  const generateResponses = (iteration: number): Response[] => {
    const baseQuality = 45 + (iteration * 15);

    const templates = [
      {
        text: `Building a successful tech startup requires: 1) Identify a genuine problem worth solving through market research and user interviews. 2) Build an MVP to validate your solution quickly. 3) Focus on customer acquisition and retention metrics. 4) Iterate based on user feedback. 5) Scale thoughtfully once product-market fit is achieved.`,
        qualityBonus: 5
      },
      {
        text: `To build a successful startup: Start with a clear vision and problem statement. Assemble a strong founding team with complementary skills. Develop a minimum viable product focusing on core features. Engage early adopters for feedback. Build a sustainable business model. Seek appropriate funding when needed. Scale operations based on validated demand.`,
        qualityBonus: 3
      },
      {
        text: `Tech startup success formula: Solve real problems, not imaginary ones. Move fast but maintain quality. Listen to customers obsessively. Build a culture of experimentation. Focus on unit economics early. Hire slowly, fire quickly. Preserve cash runway. Network extensively within your industry. Learn from failures rapidly.`,
        qualityBonus: 7
      }
    ];

    return templates.map((template, idx) => ({
      id: `response-${iteration}-${idx}`,
      text: template.text,
      quality: Math.min(95, baseQuality + template.qualityBonus + Math.random() * 10)
    }));
  };

  const generateAIFeedback = (response: Response, iteration: number): AIFeedback => {
    // AI evaluator improves its assessment quality over iterations
    const evaluatorQuality = 0.6 + (iteration * 0.1);
    const baseScore = response.quality / 100;

    const scores = {
      helpfulness: Math.min(1, baseScore + (Math.random() * 0.2 - 0.1)) * evaluatorQuality + (1 - evaluatorQuality) * 0.5,
      accuracy: Math.min(1, baseScore + (Math.random() * 0.15 - 0.075)) * evaluatorQuality + (1 - evaluatorQuality) * 0.5,
      safety: Math.min(1, 0.9 + Math.random() * 0.1), // Safety should be consistently high
      coherence: Math.min(1, baseScore + (Math.random() * 0.1 - 0.05)) * evaluatorQuality + (1 - evaluatorQuality) * 0.5,
    };

    const overall = (scores.helpfulness * 0.3 + scores.accuracy * 0.3 + scores.safety * 0.2 + scores.coherence * 0.2);

    const explanations = [
      `Response provides comprehensive startup guidance with actionable steps. ${overall > 0.7 ? 'Strong practical focus.' : 'Could include more specific examples.'}`,
      `Clear structure and logical flow. ${overall > 0.75 ? 'Excellent coverage of key topics.' : 'Some areas need more depth.'}`,
      `Balanced approach to startup building. ${overall > 0.8 ? 'Particularly strong on execution details.' : 'Consider adding metrics and milestones.'}`,
    ];

    return {
      responseId: response.id,
      helpfulness: scores.helpfulness,
      accuracy: scores.accuracy,
      safety: scores.safety,
      coherence: scores.coherence,
      overall,
      explanation: explanations[parseInt(response.id.split('-')[2]) % explanations.length]
    };
  };

  const calculateReward = (feedback: AIFeedback[]): number => {
    const totalScore = feedback.reduce((sum, f) => sum + f.overall, 0);
    return totalScore / feedback.length;
  };

  const updateModelMetrics = (reward: number, iteration: number) => {
    const learningRate = 0.15;
    const momentum = 0.9;

    setModelMetrics(prev => ({
      quality: Math.min(95, prev.quality + (reward * 100 - prev.quality) * learningRate),
      alignment: Math.min(95, prev.alignment + (reward * 100 - prev.alignment) * learningRate * 1.1),
      efficiency: Math.min(95, prev.efficiency + iteration * 5),
      consistency: Math.min(95, prev.consistency * momentum + reward * 100 * (1 - momentum))
    }));
  };

  useEffect(() => {
    if (!isRunning) return;

    const runRLAIF = async () => {
      const maxIterations = 4;

      for (let iter = 0; iter < maxIterations; iter++) {
        setCurrentIteration(iter);

        // Phase 1: Generate responses
        setCurrentPhase('generation');
        setAnimationProgress(0);
        const responses = generateResponses(iter);
        setCurrentResponses(responses);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Phase 2: AI Evaluation
        setCurrentPhase('ai-evaluation');
        setAnimationProgress(0);
        const feedback: AIFeedback[] = [];
        for (const response of responses) {
          const fb = generateAIFeedback(response, iter);
          feedback.push(fb);
          setCurrentFeedback([...feedback]);
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Phase 3: Reward Modeling
        setCurrentPhase('reward-modeling');
        setAnimationProgress(0);
        const reward = calculateReward(feedback);
        setTotalReward(prev => prev + reward);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Phase 4: Policy Optimization
        setCurrentPhase('optimization');
        setAnimationProgress(0);
        updateModelMetrics(reward, iter);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Store batch
        const batch: TrainingBatch = {
          iteration: iter,
          responses,
          feedback,
          reward,
          improvement: iter > 0 ? (reward - (trainingBatches[iter - 1]?.reward || 0.5)) * 100 : 0
        };

        setTrainingBatches(prev => [...prev, batch]);
      }

      setCurrentPhase('complete');
      setIsRunning(false);
    };

    runRLAIF();
  }, [isRunning]);

  useEffect(() => {
    if (isRunning && currentPhase !== 'complete') {
      const interval = setInterval(() => {
        setAnimationProgress(prev => Math.min(prev + 10, 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRunning, currentPhase]);

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'generation': return <Brain className="w-5 h-5" />;
      case 'ai-evaluation': return <Bot className="w-5 h-5" />;
      case 'reward-modeling': return <Target className="w-5 h-5" />;
      case 'optimization': return <TrendingUp className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-400';
    if (score >= 0.6) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getMetricColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">RLAIF Demo</h2>

        {/* User Prompt */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-300">Training Prompt</label>
          <div className="bg-gray-900 p-3 rounded border border-gray-700">
            <p className="text-gray-100">{userPrompt}</p>
          </div>
        </div>

        {/* Training Pipeline */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200">RLAIF Training Pipeline</h3>
          <div className="flex items-center gap-2">
            {['generation', 'ai-evaluation', 'reward-modeling', 'optimization', 'complete'].map((phase, idx) => (
              <React.Fragment key={phase}>
                <div className={`flex-1 bg-gray-900 p-3 rounded border ${
                  currentPhase === phase ? 'border-purple-500 bg-purple-950' : 'border-gray-700'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {getPhaseIcon(phase)}
                    <span className="text-sm font-medium text-gray-200 capitalize">
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
                {idx < 4 && <Zap className="w-4 h-4 text-gray-600" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Current Iteration Info */}
        {isRunning && (
          <div className="mb-6 bg-gray-900 p-4 rounded border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Training Iteration</span>
              <span className="text-2xl font-bold text-purple-400">{currentIteration + 1}/4</span>
            </div>
            <div className="text-xs text-gray-400">
              Generating responses and collecting AI feedback...
            </div>
          </div>
        )}

        {/* Current Responses & Feedback */}
        {currentResponses.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Current Generation
            </h3>
            <div className="space-y-3">
              {currentResponses.map((response, idx) => {
                const feedback = currentFeedback.find(f => f.responseId === response.id);
                return (
                  <div key={response.id} className="bg-gray-900 p-4 rounded border border-gray-700">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">Response {idx + 1}</span>
                      {feedback && (
                        <span className={`font-bold ${getScoreColor(feedback.overall)}`}>
                          Score: {(feedback.overall * 100).toFixed(1)}%
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{response.text}</p>

                    {feedback && (
                      <div className="mt-3 pt-3 border-t border-gray-800">
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <div className="text-center">
                            <div className="text-xs text-gray-500">Helpful</div>
                            <div className={`text-sm font-bold ${getScoreColor(feedback.helpfulness)}`}>
                              {(feedback.helpfulness * 100).toFixed(0)}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500">Accurate</div>
                            <div className={`text-sm font-bold ${getScoreColor(feedback.accuracy)}`}>
                              {(feedback.accuracy * 100).toFixed(0)}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500">Safe</div>
                            <div className={`text-sm font-bold ${getScoreColor(feedback.safety)}`}>
                              {(feedback.safety * 100).toFixed(0)}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500">Coherent</div>
                            <div className={`text-sm font-bold ${getScoreColor(feedback.coherence)}`}>
                              {(feedback.coherence * 100).toFixed(0)}%
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 italic">{feedback.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Model Metrics */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-blue-400" />
            Model Performance Metrics
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(modelMetrics).map(([key, value]) => (
              <div key={key} className="bg-gray-900 p-3 rounded border border-gray-700">
                <div className="text-xs text-gray-400 mb-1 capitalize">{key}</div>
                <div className="text-xl font-bold text-gray-100 mb-2">
                  {value.toFixed(1)}%
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getMetricColor(value)}`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training History */}
        {trainingBatches.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-green-400" />
              Training Progress
            </h3>
            <div className="space-y-2">
              {trainingBatches.map((batch, idx) => (
                <div key={idx} className="bg-gray-900 p-3 rounded border border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-300">Iteration {batch.iteration + 1}</span>
                    <span className="text-sm text-gray-400">
                      {batch.responses.length} responses evaluated
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-medium ${
                      batch.improvement > 0 ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {batch.improvement > 0 && '+'}
                      {batch.improvement.toFixed(1)}% improvement
                    </span>
                    <span className="text-lg font-bold text-purple-400">
                      {(batch.reward * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {trainingBatches.length >= 4 && (
              <div className="mt-3 p-3 bg-green-950 rounded border border-green-800">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-300">
                    Training complete! Model improved by {
                      ((trainingBatches[trainingBatches.length - 1].reward - trainingBatches[0].reward) * 100).toFixed(1)
                    }% overall
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* How RLAIF Works */}
        <div className="bg-gray-900 p-4 rounded border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" />
            How RLAIF Works
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">1.</span>
              <div>
                <p className="font-medium text-gray-200">Response Generation</p>
                <p className="text-xs text-gray-400">Model generates multiple candidate responses to training prompts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">2.</span>
              <div>
                <p className="font-medium text-gray-200">AI Evaluation</p>
                <p className="text-xs text-gray-400">AI evaluator assesses responses on multiple criteria (no human input needed)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">3.</span>
              <div>
                <p className="font-medium text-gray-200">Reward Signal</p>
                <p className="text-xs text-gray-400">Convert AI feedback into reward signals for reinforcement learning</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">4.</span>
              <div>
                <p className="font-medium text-gray-200">Policy Update</p>
                <p className="text-xs text-gray-400">Optimize model parameters using PPO or similar RL algorithms</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">5.</span>
              <div>
                <p className="font-medium text-gray-200">Iteration</p>
                <p className="text-xs text-gray-400">Repeat process for continuous improvement without human bottleneck</p>
              </div>
            </div>
          </div>
        </div>

        {/* Control Button */}
        <button
          onClick={() => {
            setIsRunning(true);
            setCurrentPhase('generation');
            setCurrentIteration(0);
            setTrainingBatches([]);
            setCurrentResponses([]);
            setCurrentFeedback([]);
            setModelMetrics({
              quality: 45,
              alignment: 40,
              efficiency: 50,
              consistency: 42
            });
            setTotalReward(0);
            setAnimationProgress(0);
          }}
          disabled={isRunning}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded text-white font-medium transition-colors"
        >
          {isRunning ? 'Training Model with AI Feedback...' : 'Start RLAIF Training'}
        </button>
      </div>
    </div>
  );
};

export default RLAIFDemo;