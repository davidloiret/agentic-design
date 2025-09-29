'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Code, GitBranch, Play, TrendingUp, FileCode } from 'lucide-react';

type DemoPhase = 'idle' | 'variant-selection' | 'issue-resolution' | 'quality-assessment' | 'repository-analysis' | 'comparison' | 'complete';

interface Model {
  id: string;
  name: string;
  vendor: 'anthropic' | 'openai' | 'meta' | 'oss';
}

interface Variant {
  id: string;
  name: string;
  issues: number;
  description: string;
}

interface Issue {
  id: string;
  repository: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'pending' | 'resolving' | 'resolved' | 'failed';
  success?: boolean;
}

interface QualityMetrics {
  compilationRate: number;
  testPassRate: number;
  styleCompliance: number;
}

interface RepositoryPerformance {
  repo: string;
  issues: number;
  resolved: number;
  percentage: number;
}

interface BenchmarkComparison {
  agentScore: number;
  o3Score: number;
  humanBaseline: number;
  gpt4_2023: number;
}

const SweBenchSuiteDemo: React.FC = () => {
  const [phase, setPhase] = useState<DemoPhase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [issues, setIssues] = useState<Issue[]>([
    { id: '1', repository: 'Django', difficulty: 'easy', status: 'pending' },
    { id: '2', repository: 'Flask', difficulty: 'medium', status: 'pending' },
    { id: '3', repository: 'Requests', difficulty: 'easy', status: 'pending' },
    { id: '4', repository: 'Matplotlib', difficulty: 'hard', status: 'pending' },
    { id: '5', repository: 'Scikit-learn', difficulty: 'medium', status: 'pending' },
    { id: '6', repository: 'Pytest', difficulty: 'hard', status: 'pending' },
  ]);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [qualityMetrics, setQualityMetrics] = useState<QualityMetrics | null>(null);
  const [repoPerformance, setRepoPerformance] = useState<RepositoryPerformance[]>([]);
  const [comparison, setComparison] = useState<BenchmarkComparison | null>(null);

  const models: Model[] = [
    { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', vendor: 'anthropic' },
    { id: 'o3', name: 'OpenAI o3', vendor: 'openai' },
    { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', vendor: 'openai' },
    { id: 'llama-3-70b', name: 'Llama 3 70B', vendor: 'meta' },
  ];

  const variants: Variant[] = [
    { id: 'verified', name: 'SWE-bench Verified', issues: 500, description: 'Human-validated, reliable evaluation' },
    { id: 'original', name: 'SWE-bench Original', issues: 2294, description: 'Full dataset (32.67% leakage)' },
    { id: 'live', name: 'SWE-bench Live', issues: 1319, description: 'Contamination-free, post-2024' },
    { id: 'multimodal', name: 'SWE-bench Multimodal', issues: 517, description: 'Visual debugging tasks' },
  ];

  useEffect(() => {
    if (phase === 'idle') return;

    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'variant-selection' && selectedModel && selectedVariant) {
      const timeout = setTimeout(() => {
        setPhase('issue-resolution');
        setAnimatedPhase(true);
      }, 100);
      timeouts.push(timeout);
    }

    if (phase === 'issue-resolution') {
      let issueIndex = 0;
      const resolveNext = () => {
        if (issueIndex >= issues.length) {
          const timeout = setTimeout(() => {
            setPhase('quality-assessment');
            setAnimatedPhase(true);
          }, 100);
          timeouts.push(timeout);
          return;
        }

        const timeout1 = setTimeout(() => {
          setIssues(prev => prev.map((issue, idx) =>
            idx === issueIndex ? { ...issue, status: 'resolving' as const } : issue
          ));

          const timeout2 = setTimeout(() => {
            const issue = issues[issueIndex];
            let successRate: number;

            if (selectedModel!.vendor === 'openai' && selectedModel!.id === 'o3') {
              if (selectedVariant!.id === 'verified') {
                successRate = 0.691;
              } else {
                successRate = 0.65;
              }
            } else if (selectedModel!.vendor === 'anthropic') {
              if (selectedVariant!.id === 'verified') {
                successRate = 0.49;
              } else {
                successRate = 0.43;
              }
            } else if (selectedModel!.id === 'gpt-4-turbo') {
              successRate = 0.38;
            } else {
              successRate = 0.25;
            }

            if (issue.difficulty === 'easy') {
              successRate *= 1.4;
            } else if (issue.difficulty === 'hard') {
              successRate *= 0.6;
            }

            const success = Math.random() < Math.min(0.95, successRate);

            setIssues(prev => prev.map((i, idx) =>
              idx === issueIndex ? { ...i, status: success ? 'resolved' as const : 'failed' as const, success } : i
            ));

            if (success) {
              setResolvedCount(prev => prev + 1);
            }

            issueIndex++;
            resolveNext();
          }, 80);
          timeouts.push(timeout2);
        }, 35);
        timeouts.push(timeout1);
      };
      resolveNext();
    }

    if (phase === 'quality-assessment') {
      const timeout = setTimeout(() => {
        const compilationRate = 0.90 + Math.random() * 0.08;
        const testPassRate = 0.82 + Math.random() * 0.1;
        const styleCompliance = 0.88 + Math.random() * 0.08;

        setQualityMetrics({
          compilationRate,
          testPassRate,
          styleCompliance
        });

        const timeout2 = setTimeout(() => {
          setPhase('repository-analysis');
          setAnimatedPhase(true);
        }, 100);
        timeouts.push(timeout2);
      }, 800);
      timeouts.push(timeout);
    }

    if (phase === 'repository-analysis') {
      const timeout = setTimeout(() => {
        const repos = ['Django', 'Flask', 'Requests', 'Matplotlib', 'Scikit-learn', 'Pytest'];
        const repoData: RepositoryPerformance[] = repos.map(repo => {
          const issueCount = Math.floor(40 + Math.random() * 60);
          let baseResolveRate: number;

          if (selectedModel!.vendor === 'openai' && selectedModel!.id === 'o3') {
            baseResolveRate = 0.65 + Math.random() * 0.1;
          } else if (selectedModel!.vendor === 'anthropic') {
            baseResolveRate = 0.45 + Math.random() * 0.1;
          } else if (selectedModel!.id === 'gpt-4-turbo') {
            baseResolveRate = 0.35 + Math.random() * 0.1;
          } else {
            baseResolveRate = 0.20 + Math.random() * 0.1;
          }

          const resolved = Math.floor(issueCount * baseResolveRate);
          const percentage = (resolved / issueCount) * 100;

          return {
            repo,
            issues: issueCount,
            resolved,
            percentage
          };
        });

        setRepoPerformance(repoData);

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
        const resolvedPercentage = (resolvedCount / issues.length) * 100;

        let agentScore: number;
        if (selectedModel!.vendor === 'openai' && selectedModel!.id === 'o3') {
          agentScore = selectedVariant!.id === 'verified' ? 69.1 : 65.0;
        } else if (selectedModel!.vendor === 'anthropic') {
          agentScore = selectedVariant!.id === 'verified' ? 49.0 : 43.2;
        } else if (selectedModel!.id === 'gpt-4-turbo') {
          agentScore = 38.0;
        } else {
          agentScore = 25.0;
        }

        setComparison({
          agentScore,
          o3Score: 69.1,
          humanBaseline: 85.0,
          gpt4_2023: 1.96
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
  }, [phase, selectedModel, selectedVariant, issues.length, resolvedCount]);

  const handleStart = (model: Model, variant: Variant) => {
    setSelectedModel(model);
    setSelectedVariant(variant);
    setPhase('variant-selection');
    setAnimatedPhase(false);
  };

  const handleReset = () => {
    setPhase('idle');
    setAnimatedPhase(false);
    setSelectedModel(null);
    setSelectedVariant(null);
    setIssues(prev => prev.map(i => ({ ...i, status: 'pending' as const, success: undefined })));
    setResolvedCount(0);
    setQualityMetrics(null);
    setRepoPerformance([]);
    setComparison(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600/20 to-green-700/20 rounded-lg p-6 border border-green-500/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <Code className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">SWE-bench Suite</h3>
            <p className="text-green-300 text-sm">Real-World Software Engineering Benchmark</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          Comprehensive evaluation suite with 4 variants: Verified (500 issues), Original (2,294), Live (1,319), and Multimodal (517).
          Tests coding agents on authentic GitHub issues from 12+ popular Python repositories.
        </p>
      </div>

      {/* Model and Variant Selection */}
      {phase === 'idle' && (
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-green-400" />
            Select Model & Benchmark Variant
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {models.map(model => (
              <div key={model.id} className="space-y-3">
                <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium">{model.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      model.vendor === 'anthropic' ? 'bg-orange-500/20 text-orange-300' :
                      model.vendor === 'openai' ? 'bg-green-500/20 text-green-300' :
                      model.vendor === 'meta' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-purple-500/20 text-purple-300'
                    }`}>
                      {model.vendor}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {variants.map(variant => (
                      <button
                        key={variant.id}
                        onClick={() => handleStart(model, variant)}
                        className="w-full bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 rounded p-3 text-left transition-all group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white text-sm font-medium group-hover:text-green-400 transition-colors">
                            {variant.name}
                          </span>
                          <span className="text-xs text-gray-400">{variant.issues} issues</span>
                        </div>
                        <p className="text-xs text-gray-400">{variant.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Issue Resolution */}
      {(phase === 'issue-resolution' || (phase !== 'idle' && resolvedCount > 0)) && (
        <div className={`bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 transition-all ${
          animatedPhase && phase === 'issue-resolution' ? 'ring-2 ring-green-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 text-blue-400" />
            GitHub Issue Resolution
            <span className="text-gray-400 text-sm font-normal ml-auto">
              {resolvedCount}/{issues.length} resolved
            </span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className={`rounded-lg p-4 border transition-all ${
                  issue.status === 'resolved'
                    ? 'bg-green-500/10 border-green-500/50'
                    : issue.status === 'failed'
                    ? 'bg-red-500/10 border-red-500/50'
                    : issue.status === 'resolving'
                    ? 'bg-blue-500/10 border-blue-500/50'
                    : 'bg-slate-800/20 border-slate-700/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-gray-400" />
                    <span className="text-white text-sm font-medium">{issue.repository}</span>
                  </div>
                  {issue.status === 'resolved' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : issue.status === 'failed' ? (
                    <XCircle className="w-5 h-5 text-red-400" />
                  ) : issue.status === 'resolving' ? (
                    <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="w-5 h-5 bg-slate-600/50 rounded-full" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${getDifficultyColor(issue.difficulty)}`}>
                    {issue.difficulty.toUpperCase()}
                  </span>
                  {issue.status !== 'pending' && (
                    <span className={`text-xs ${
                      issue.status === 'resolved' ? 'text-green-400' :
                      issue.status === 'failed' ? 'text-red-400' : 'text-blue-400'
                    }`}>
                      {issue.status === 'resolving' ? 'Generating patch...' : issue.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quality Assessment */}
      {(phase === 'quality-assessment' || phase === 'repository-analysis' || phase === 'comparison' || phase === 'complete') && qualityMetrics && (
        <div className={`bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 transition-all ${
          animatedPhase && phase === 'quality-assessment' ? 'ring-2 ring-green-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            Code Quality Metrics
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
              <div className="text-gray-400 text-xs mb-2">Compilation Rate</div>
              <div className="text-2xl font-bold text-green-400 mb-2">
                {(qualityMetrics.compilationRate * 100).toFixed(1)}%
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${qualityMetrics.compilationRate * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
              <div className="text-gray-400 text-xs mb-2">Test Pass Rate</div>
              <div className="text-2xl font-bold text-blue-400 mb-2">
                {(qualityMetrics.testPassRate * 100).toFixed(1)}%
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all duration-500"
                  style={{ width: `${qualityMetrics.testPassRate * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
              <div className="text-gray-400 text-xs mb-2">Style Compliance</div>
              <div className="text-2xl font-bold text-purple-400 mb-2">
                {(qualityMetrics.styleCompliance * 100).toFixed(1)}%
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500"
                  style={{ width: `${qualityMetrics.styleCompliance * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Repository Performance */}
      {(phase === 'repository-analysis' || phase === 'comparison' || phase === 'complete') && repoPerformance.length > 0 && (
        <div className={`bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 transition-all ${
          animatedPhase && phase === 'repository-analysis' ? 'ring-2 ring-green-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-orange-400" />
            Repository Coverage
          </h4>
          <div className="space-y-3">
            {repoPerformance.map((repo) => (
              <div key={repo.repo} className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{repo.repo}</span>
                  <span className="text-gray-400 text-sm">
                    {repo.resolved}/{repo.issues} resolved
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-700/50 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-500"
                      style={{ width: `${repo.percentage}%` }}
                    />
                  </div>
                  <span className={`text-sm font-semibold w-12 text-right ${
                    repo.percentage >= 60 ? 'text-green-400' :
                    repo.percentage >= 40 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {repo.percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benchmark Comparison */}
      {(phase === 'comparison' || phase === 'complete') && comparison && (
        <div className={`bg-gradient-to-br from-green-600/10 to-emerald-600/10 rounded-lg p-6 border border-green-500/30 transition-all ${
          animatedPhase && phase === 'comparison' ? 'ring-2 ring-green-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Benchmark Comparison
          </h4>

          <div className="space-y-4 mb-6">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{selectedModel?.name}</span>
                <span className="text-2xl font-bold text-green-400">{comparison.agentScore.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${comparison.agentScore}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">OpenAI o3 (Top Model)</span>
                <span className="text-xl font-bold text-blue-400">{comparison.o3Score.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all duration-500"
                  style={{ width: `${comparison.o3Score}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Human Baseline</span>
                <span className="text-xl font-bold text-emerald-400">{comparison.humanBaseline.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-green-500 h-full transition-all duration-500"
                  style={{ width: `${comparison.humanBaseline}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">GPT-4 (2023)</span>
                <span className="text-xl font-bold text-gray-500">{comparison.gpt4_2023.toFixed(2)}%</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-gray-600 to-gray-500 h-full transition-all duration-500"
                  style={{ width: `${comparison.gpt4_2023}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-5 border border-green-500/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white font-semibold mb-2">Performance Insights</div>
                <div className="text-sm text-gray-300 space-y-2">
                  <p>• {selectedVariant?.name} selected: {selectedVariant?.description}</p>
                  <p>• Gap to human baseline: {(comparison.humanBaseline - comparison.agentScore).toFixed(1)}%</p>
                  <p>• Industry standard: Claude 3.5 Sonnet (49%), o3 (69.1%) on Verified</p>
                  {selectedVariant?.id === 'original' && (
                    <p className="text-yellow-400">⚠️ Original benchmark has 32.67% solution leakage - consider Verified variant</p>
                  )}
                  {selectedVariant?.id === 'live' && (
                    <p className="text-green-400">✓ Live benchmark ensures contamination-free evaluation</p>
                  )}
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
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-green-500/50 transition-all"
          >
            Run New SWE-bench Evaluation
          </button>
        </div>
      )}
    </div>
  );
};

export default SweBenchSuiteDemo;