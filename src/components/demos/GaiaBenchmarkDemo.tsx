'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Globe, Brain, Wrench, Eye, TrendingUp, Users } from 'lucide-react';

type DemoPhase = 'idle' | 'level-selection' | 'question-solving' | 'capability-assessment' | 'comparison' | 'complete';

interface Agent {
  id: string;
  name: string;
  organization: string;
}

interface DifficultyLevel {
  id: number;
  name: string;
  steps: string;
  questions: number;
}

interface Question {
  id: string;
  level: number;
  type: 'reasoning' | 'multimodal' | 'tool-use' | 'web-browsing';
  status: 'pending' | 'solving' | 'correct' | 'incorrect';
}

interface CapabilityScore {
  capability: string;
  icon: React.ComponentType<any>;
  score: number;
  rating: 'excellent' | 'good' | 'fair' | 'poor';
}

interface LevelPerformance {
  level: number;
  agentScore: number;
  humanScore: number;
}

interface BenchmarkComparison {
  agentScore: number;
  h2oScore: number;
  googleScore: number;
  microsoftScore: number;
  humanBaseline: number;
  gpt4Score: number;
}

const GaiaBenchmarkDemo: React.FC = () => {
  const [phase, setPhase] = useState<DemoPhase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [solvedCount, setSolvedCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [capabilityScores, setCapabilityScores] = useState<CapabilityScore[]>([]);
  const [levelPerformance, setLevelPerformance] = useState<LevelPerformance[]>([]);
  const [comparison, setComparison] = useState<BenchmarkComparison | null>(null);

  const agents: Agent[] = [
    { id: 'h2ogpte', name: 'h2oGPTe', organization: 'H2O.ai' },
    { id: 'langfun', name: 'Langfun Agent', organization: 'Google' },
    { id: 'gpt4', name: 'GPT-4', organization: 'OpenAI' },
    { id: 'claude-3', name: 'Claude 3 Opus', organization: 'Anthropic' },
  ];

  const levels: DifficultyLevel[] = [
    { id: 1, name: 'Level 1', steps: '<5 steps', questions: 165 },
    { id: 2, name: 'Level 2', steps: '5-10 steps', questions: 172 },
    { id: 3, name: 'Level 3', steps: 'up to 50 steps', questions: 129 },
  ];

  useEffect(() => {
    if (phase === 'idle') return;

    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'level-selection' && selectedAgent && selectedLevel) {
      const sampleQuestions: Question[] = [
        { id: '1', level: selectedLevel.id, type: 'reasoning', status: 'pending' },
        { id: '2', level: selectedLevel.id, type: 'multimodal', status: 'pending' },
        { id: '3', level: selectedLevel.id, type: 'web-browsing', status: 'pending' },
        { id: '4', level: selectedLevel.id, type: 'tool-use', status: 'pending' },
        { id: '5', level: selectedLevel.id, type: 'reasoning', status: 'pending' },
        { id: '6', level: selectedLevel.id, type: 'multimodal', status: 'pending' },
      ];
      setQuestions(sampleQuestions);

      const timeout = setTimeout(() => {
        setPhase('question-solving');
        setAnimatedPhase(true);
      }, 100);
      timeouts.push(timeout);
    }

    if (phase === 'question-solving') {
      let qIndex = 0;
      const solveNext = () => {
        if (qIndex >= questions.length) {
          const timeout = setTimeout(() => {
            setPhase('capability-assessment');
            setAnimatedPhase(true);
          }, 100);
          timeouts.push(timeout);
          return;
        }

        const timeout1 = setTimeout(() => {
          setQuestions(prev => prev.map((q, idx) =>
            idx === qIndex ? { ...q, status: 'solving' as const } : q
          ));

          const timeout2 = setTimeout(() => {
            let successRate: number;

            if (selectedAgent!.id === 'h2ogpte') {
              if (selectedLevel!.id === 1) successRate = 0.785;
              else if (selectedLevel!.id === 2) successRate = 0.623;
              else successRate = 0.417;
            } else if (selectedAgent!.id === 'langfun') {
              if (selectedLevel!.id === 1) successRate = 0.65;
              else if (selectedLevel!.id === 2) successRate = 0.48;
              else successRate = 0.32;
            } else if (selectedAgent!.id === 'gpt4') {
              if (selectedLevel!.id === 1) successRate = 0.20;
              else if (selectedLevel!.id === 2) successRate = 0.12;
              else successRate = 0.08;
            } else {
              if (selectedLevel!.id === 1) successRate = 0.55;
              else if (selectedLevel!.id === 2) successRate = 0.42;
              else successRate = 0.28;
            }

            const correct = Math.random() < successRate;

            setQuestions(prev => prev.map((q, idx) =>
              idx === qIndex ? { ...q, status: correct ? 'correct' as const : 'incorrect' as const } : q
            ));

            setSolvedCount(qIndex + 1);
            if (correct) {
              setCorrectCount(prev => prev + 1);
            }

            qIndex++;
            solveNext();
          }, 85);
          timeouts.push(timeout2);
        }, 40);
        timeouts.push(timeout1);
      };
      solveNext();
    }

    if (phase === 'capability-assessment') {
      const timeout = setTimeout(() => {
        const capabilities: CapabilityScore[] = [];

        if (selectedAgent!.id === 'h2ogpte') {
          capabilities.push(
            { capability: 'Reasoning', icon: Brain, score: 0.72, rating: 'good' },
            { capability: 'Multi-modal', icon: Eye, score: 0.58, rating: 'fair' },
            { capability: 'Tool-use', icon: Wrench, score: 0.69, rating: 'good' },
            { capability: 'Web browsing', icon: Globe, score: 0.54, rating: 'fair' }
          );
        } else if (selectedAgent!.id === 'langfun') {
          capabilities.push(
            { capability: 'Reasoning', icon: Brain, score: 0.58, rating: 'fair' },
            { capability: 'Multi-modal', icon: Eye, score: 0.48, rating: 'fair' },
            { capability: 'Tool-use', icon: Wrench, score: 0.52, rating: 'fair' },
            { capability: 'Web browsing', icon: Globe, score: 0.42, rating: 'fair' }
          );
        } else if (selectedAgent!.id === 'gpt4') {
          capabilities.push(
            { capability: 'Reasoning', icon: Brain, score: 0.22, rating: 'poor' },
            { capability: 'Multi-modal', icon: Eye, score: 0.15, rating: 'poor' },
            { capability: 'Tool-use', icon: Wrench, score: 0.12, rating: 'poor' },
            { capability: 'Web browsing', icon: Globe, score: 0.08, rating: 'poor' }
          );
        } else {
          capabilities.push(
            { capability: 'Reasoning', icon: Brain, score: 0.52, rating: 'fair' },
            { capability: 'Multi-modal', icon: Eye, score: 0.45, rating: 'fair' },
            { capability: 'Tool-use', icon: Wrench, score: 0.48, rating: 'fair' },
            { capability: 'Web browsing', icon: Globe, score: 0.38, rating: 'fair' }
          );
        }

        setCapabilityScores(capabilities);

        const timeout2 = setTimeout(() => {
          setPhase('comparison');
          setAnimatedPhase(true);
        }, 100);
        timeouts.push(timeout2);
      }, 800);
      timeouts.push(timeout);
    }

    if (phase === 'comparison') {
      const timeout = setTimeout(() => {
        const levelPerf: LevelPerformance[] = [
          { level: 1, agentScore: 0, humanScore: 95 },
          { level: 2, agentScore: 0, humanScore: 92 },
          { level: 3, agentScore: 0, humanScore: 87 }
        ];

        if (selectedAgent!.id === 'h2ogpte') {
          levelPerf[0].agentScore = 78.5;
          levelPerf[1].agentScore = 62.3;
          levelPerf[2].agentScore = 41.7;
        } else if (selectedAgent!.id === 'langfun') {
          levelPerf[0].agentScore = 65;
          levelPerf[1].agentScore = 48;
          levelPerf[2].agentScore = 32;
        } else if (selectedAgent!.id === 'gpt4') {
          levelPerf[0].agentScore = 20;
          levelPerf[1].agentScore = 12;
          levelPerf[2].agentScore = 8;
        } else {
          levelPerf[0].agentScore = 55;
          levelPerf[1].agentScore = 42;
          levelPerf[2].agentScore = 28;
        }

        setLevelPerformance(levelPerf);

        const avgAgentScore = (levelPerf[0].agentScore + levelPerf[1].agentScore + levelPerf[2].agentScore) / 3;

        setComparison({
          agentScore: avgAgentScore,
          h2oScore: 65.0,
          googleScore: 49.0,
          microsoftScore: 38.0,
          humanBaseline: 92.0,
          gpt4Score: 15.0
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
  }, [phase, selectedAgent, selectedLevel, questions.length]);

  const handleStart = (agent: Agent, level: DifficultyLevel) => {
    setSelectedAgent(agent);
    setSelectedLevel(level);
    setPhase('level-selection');
    setAnimatedPhase(false);
  };

  const handleReset = () => {
    setPhase('idle');
    setAnimatedPhase(false);
    setSelectedAgent(null);
    setSelectedLevel(null);
    setQuestions([]);
    setSolvedCount(0);
    setCorrectCount(0);
    setCapabilityScores([]);
    setLevelPerformance([]);
    setComparison(null);
  };

  const getCapabilityColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'fair': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getCapabilityBgColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'bg-green-500/10';
      case 'good': return 'bg-blue-500/10';
      case 'fair': return 'bg-yellow-500/10';
      case 'poor': return 'bg-red-500/10';
      default: return 'bg-slate-800/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reasoning': return <Brain className="w-4 h-4" />;
      case 'multimodal': return <Eye className="w-4 h-4" />;
      case 'tool-use': return <Wrench className="w-4 h-4" />;
      case 'web-browsing': return <Globe className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600/20 to-cyan-700/20 rounded-lg p-6 border border-cyan-500/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">GAIA: General AI Assistants Benchmark</h3>
            <p className="text-cyan-300 text-sm">Real-World Multi-Step Reasoning & Tool Use</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          466 questions across 3 difficulty levels testing reasoning, multi-modality, web browsing, and tool-use proficiency.
          Conceptually simple for humans (92%) yet challenging for AI (best: 65%).
        </p>
      </div>

      {/* Agent and Level Selection */}
      {phase === 'idle' && (
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            Select Agent & Difficulty Level
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map(agent => (
              <div key={agent.id} className="space-y-3">
                <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-white font-medium block">{agent.name}</span>
                      <span className="text-xs text-gray-400">{agent.organization}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {levels.map(level => (
                      <button
                        key={level.id}
                        onClick={() => handleStart(agent, level)}
                        className="w-full bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 rounded p-3 text-left transition-all group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white text-sm font-medium group-hover:text-cyan-400 transition-colors">
                            {level.name}
                          </span>
                          <span className="text-xs text-gray-400">{level.questions} questions</span>
                        </div>
                        <p className="text-xs text-gray-400">{level.steps} reasoning steps</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question Solving */}
      {(phase === 'question-solving' || (phase !== 'idle' && solvedCount > 0)) && (
        <div className={`bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 transition-all ${
          animatedPhase && phase === 'question-solving' ? 'ring-2 ring-cyan-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Question Solving Progress
            <span className="text-gray-400 text-sm font-normal ml-auto">
              {correctCount}/{solvedCount} correct
            </span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {questions.map((question, idx) => (
              <div
                key={question.id}
                className={`rounded-lg p-4 border transition-all ${
                  question.status === 'correct'
                    ? 'bg-green-500/10 border-green-500/50'
                    : question.status === 'incorrect'
                    ? 'bg-red-500/10 border-red-500/50'
                    : question.status === 'solving'
                    ? 'bg-blue-500/10 border-blue-500/50'
                    : 'bg-slate-800/20 border-slate-700/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-gray-400">
                      {getTypeIcon(question.type)}
                    </div>
                    <span className="text-white text-sm font-medium capitalize">
                      {question.type.replace('-', ' ')}
                    </span>
                  </div>
                  {question.status === 'correct' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : question.status === 'incorrect' ? (
                    <XCircle className="w-5 h-5 text-red-400" />
                  ) : question.status === 'solving' ? (
                    <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="w-5 h-5 bg-slate-600/50 rounded-full" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Capability Assessment */}
      {(phase === 'capability-assessment' || phase === 'comparison' || phase === 'complete') && capabilityScores.length > 0 && (
        <div className={`bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 transition-all ${
          animatedPhase && phase === 'capability-assessment' ? 'ring-2 ring-cyan-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Capability Analysis
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilityScores.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.capability}
                  className={`rounded-lg p-4 border ${getCapabilityBgColor(cap.rating)} border-slate-600/50`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${getCapabilityColor(cap.rating)}`} />
                      <span className="text-white font-medium">{cap.capability}</span>
                    </div>
                    <span className={`text-lg font-bold ${getCapabilityColor(cap.rating)}`}>
                      {(cap.score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        cap.rating === 'excellent' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                        cap.rating === 'good' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                        cap.rating === 'fair' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                        'bg-gradient-to-r from-red-500 to-pink-500'
                      }`}
                      style={{ width: `${cap.score * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Level Performance & Comparison */}
      {(phase === 'comparison' || phase === 'complete') && comparison && levelPerformance.length > 0 && (
        <div className={`bg-gradient-to-br from-cyan-600/10 to-blue-600/10 rounded-lg p-6 border border-cyan-500/30 transition-all ${
          animatedPhase && phase === 'comparison' ? 'ring-2 ring-cyan-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Performance Analysis
          </h4>

          {/* Level Breakdown */}
          <div className="mb-6">
            <h5 className="text-white text-sm font-semibold mb-3">Level-wise Performance</h5>
            <div className="space-y-3">
              {levelPerformance.map((level) => (
                <div key={level.level} className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium">Level {level.level}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-cyan-400">{selectedAgent?.name}: {level.agentScore.toFixed(1)}%</span>
                      <span className="text-emerald-400">Human: {level.humanScore}%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-700/30 rounded p-2">
                      <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden mb-1">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500"
                          style={{ width: `${level.agentScore}%` }}
                        />
                      </div>
                    </div>
                    <div className="bg-slate-700/30 rounded p-2">
                      <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden mb-1">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-green-500 h-full transition-all duration-500"
                          style={{ width: `${level.humanScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benchmark Comparison */}
          <div className="mb-6">
            <h5 className="text-white text-sm font-semibold mb-3">Leaderboard Comparison</h5>
            <div className="space-y-3">
              <div className="bg-slate-800/50 rounded-lg p-3 flex items-center justify-between">
                <span className="text-gray-300">Human Baseline</span>
                <span className="text-xl font-bold text-emerald-400">{comparison.humanBaseline}%</span>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 flex items-center justify-between">
                <span className="text-gray-300">h2oGPTe (H2O.ai) - Rank #1</span>
                <span className="text-xl font-bold text-cyan-400">{comparison.h2oScore}%</span>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 flex items-center justify-between">
                <span className="text-gray-300">Langfun Agent (Google)</span>
                <span className="text-lg font-bold text-blue-400">{comparison.googleScore}%</span>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 flex items-center justify-between">
                <span className="text-gray-300">Microsoft Research</span>
                <span className="text-lg font-bold text-yellow-400">{comparison.microsoftScore}%</span>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 flex items-center justify-between">
                <span className="text-gray-300">GPT-4 (without tools)</span>
                <span className="text-lg font-bold text-red-400">{comparison.gpt4Score}%</span>
              </div>
              {selectedAgent && (
                <div className="bg-cyan-500/10 rounded-lg p-3 border border-cyan-500/50 flex items-center justify-between">
                  <span className="text-white font-medium">{selectedAgent.name}</span>
                  <span className="text-2xl font-bold text-cyan-400">{comparison.agentScore.toFixed(1)}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Gap Analysis */}
          <div className="bg-slate-800/50 rounded-lg p-5 border border-cyan-500/30">
            <div className="flex items-start gap-3">
              <Globe className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white font-semibold mb-2">Gap to Human-Level AGI</div>
                <div className="text-sm text-gray-300 space-y-2">
                  <p>• Current gap: {(comparison.humanBaseline - comparison.agentScore).toFixed(1)}% to human baseline</p>
                  <p>• Best system (h2oGPTe): First to achieve C-grade on general intelligence test</p>
                  <p>• Key challenges: Multi-step reasoning (up to 50 steps), tool coordination, multimodal understanding</p>
                  <p>• GPT-4 without tools achieves only 15% - proper tool integration is critical</p>
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
            className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            Run New GAIA Evaluation
          </button>
        </div>
      )}
    </div>
  );
};

export default GaiaBenchmarkDemo;