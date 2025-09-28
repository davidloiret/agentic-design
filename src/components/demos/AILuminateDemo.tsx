'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, TrendingUp, BarChart3 } from 'lucide-react';

interface HazardCategory {
  id: number;
  name: string;
  description: string;
  icon: string;
  testPrompts: number;
  status: 'pending' | 'testing' | 'evaluated';
  safetyScore: number;
  grade: 'Poor' | 'Fair' | 'Good' | 'Very Good' | 'Excellent';
}

interface TestModel {
  id: string;
  name: string;
  provider: string;
  version: string;
}

type Phase = 'idle' | 'model-selection' | 'hazard-testing' | 'evaluation' | 'grading' | 'report' | 'complete';

const AILuminateDemo: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);

  const testModels: TestModel[] = [
    { id: 'enterprise-llm', name: 'Enterprise LLM', provider: 'InternalAI', version: 'v3.2' },
    { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', version: 'gpt-4-0125' },
    { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic', version: 'opus' },
  ];

  const [selectedModel, setSelectedModel] = useState<TestModel>(testModels[0]);
  const [hazardCategories, setHazardCategories] = useState<HazardCategory[]>([
    { id: 1, name: 'Violent Crimes', description: 'Violence, assault, homicide', icon: '⚔️', testPrompts: 2000, status: 'pending', safetyScore: 0, grade: 'Poor' },
    { id: 2, name: 'Indiscriminate Weapons', description: 'CBRNE weapons, explosives', icon: '💣', testPrompts: 2000, status: 'pending', safetyScore: 0, grade: 'Poor' },
    { id: 3, name: 'Suicide & Self-Harm', description: 'Self-injury, suicide assistance', icon: '🩹', testPrompts: 2000, status: 'pending', safetyScore: 0, grade: 'Poor' },
    { id: 4, name: 'Nonviolent Crimes', description: 'Theft, fraud, cybercrime', icon: '🚫', testPrompts: 2000, status: 'pending', safetyScore: 0, grade: 'Poor' },
    { id: 5, name: 'Sex-Related Crimes', description: 'Sex trafficking, revenge porn', icon: '🔞', testPrompts: 2000, status: 'pending', safetyScore: 0, grade: 'Poor' },
    { id: 6, name: 'Child Sexual Exploitation', description: 'CSAM, child grooming', icon: '🛡️', testPrompts: 2000, status: 'pending', safetyScore: 0, grade: 'Poor' },
    { id: 7, name: 'Hate Speech', description: 'Discrimination, harassment', icon: '💬', testPrompts: 2000, status: 'pending', safetyScore: 0, grade: 'Poor' },
    { id: 8, name: 'Defamation', description: 'False statements, libel', icon: '📰', testPrompts: 2000, status: 'pending', safetyScore: 0, grade: 'Poor' },
    { id: 9, name: 'Sexual Content', description: 'Erotic, pornographic content', icon: '🔕', testPrompts: 2000, status: 'pending', safetyScore: 0, grade: 'Poor' },
    { id: 10, name: 'Intellectual Property', description: 'Copyright, trademark violation', icon: '©️', testPrompts: 2000, status: 'pending', safetyScore: 0, grade: 'Poor' },
    { id: 11, name: 'Privacy Violations', description: 'PII disclosure, doxxing', icon: '🔒', testPrompts: 2000, status: 'pending', safetyScore: 0, grade: 'Poor' },
    { id: 12, name: 'Specialized Advice', description: 'Legal, medical, financial advice', icon: '⚕️', testPrompts: 2000, status: 'pending', safetyScore: 0, grade: 'Poor' },
  ]);

  const [overallSafetyScore, setOverallSafetyScore] = useState<number>(0);
  const [overallGrade, setOverallGrade] = useState<string>('Not Evaluated');
  const [deploymentDecision, setDeploymentDecision] = useState<'pending' | 'approved' | 'rejected' | 'caution'>('pending');
  const [evaluatedCount, setEvaluatedCount] = useState<number>(0);

  const getGradeFromScore = (score: number): 'Poor' | 'Fair' | 'Good' | 'Very Good' | 'Excellent' => {
    if (score >= 0.9) return 'Excellent';
    if (score >= 0.8) return 'Very Good';
    if (score >= 0.7) return 'Good';
    if (score >= 0.6) return 'Fair';
    return 'Poor';
  };

  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case 'Excellent': return 'text-green-400';
      case 'Very Good': return 'text-emerald-400';
      case 'Good': return 'text-blue-400';
      case 'Fair': return 'text-yellow-400';
      case 'Poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const startBenchmark = () => {
    setPhase('model-selection');
    setAnimatedPhase(true);
  };

  const selectModelAndStart = (model: TestModel) => {
    setSelectedModel(model);
    setPhase('hazard-testing');
    setAnimatedPhase(true);
  };

  const reset = () => {
    setPhase('idle');
    setAnimatedPhase(false);
    setHazardCategories(prev => prev.map(cat => ({
      ...cat,
      status: 'pending' as const,
      safetyScore: 0,
      grade: 'Poor' as const
    })));
    setOverallSafetyScore(0);
    setOverallGrade('Not Evaluated');
    setDeploymentDecision('pending');
    setEvaluatedCount(0);
  };

  useEffect(() => {
    if (!animatedPhase) return;
    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'hazard-testing') {
      let currentIndex = 0;
      const testNext = () => {
        if (currentIndex >= hazardCategories.length) {
          const timeout = setTimeout(() => {
            setPhase('evaluation');
            setAnimatedPhase(true);
          }, 100);
          timeouts.push(timeout);
          return;
        }

        const timeout1 = setTimeout(() => {
          setHazardCategories(prev => prev.map((cat, idx) =>
            idx === currentIndex ? { ...cat, status: 'testing' as const } : cat
          ));

          const timeout2 = setTimeout(() => {
            const randomScore = 0.75 + Math.random() * 0.2;
            const grade = getGradeFromScore(randomScore);

            setHazardCategories(prev => prev.map((cat, idx) =>
              idx === currentIndex ? { ...cat, status: 'evaluated' as const, safetyScore: randomScore, grade } : cat
            ));

            setEvaluatedCount(currentIndex + 1);
            currentIndex++;
            testNext();
          }, 80);
          timeouts.push(timeout2);
        }, 30);
        timeouts.push(timeout1);
      };
      testNext();
    }

    if (phase === 'evaluation') {
      const timeout = setTimeout(() => {
        const avgScore = hazardCategories.reduce((sum, cat) => sum + cat.safetyScore, 0) / hazardCategories.length;
        setOverallSafetyScore(avgScore);
        setPhase('grading');
        setAnimatedPhase(true);
      }, 150);
      timeouts.push(timeout);
    }

    if (phase === 'grading') {
      const timeout = setTimeout(() => {
        const grade = getGradeFromScore(overallSafetyScore);
        setOverallGrade(grade);

        if (overallSafetyScore >= 0.9) {
          setDeploymentDecision('approved');
        } else if (overallSafetyScore >= 0.75) {
          setDeploymentDecision('caution');
        } else {
          setDeploymentDecision('rejected');
        }

        setPhase('report');
        setAnimatedPhase(true);
      }, 150);
      timeouts.push(timeout);
    }

    if (phase === 'report') {
      const timeout = setTimeout(() => {
        setPhase('complete');
      }, 100);
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [animatedPhase, phase, hazardCategories, overallSafetyScore]);

  return (
    <div className="p-6 bg-slate-800/30 rounded-lg">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-6 h-6 text-red-400" />
          <h3 className="text-xl font-bold text-white">MLCommons AILuminate v1.0 Safety Benchmark</h3>
        </div>
        <p className="text-sm text-gray-400">
          Comprehensive safety evaluation across 12 hazard categories with 24,000+ test prompts and automated grading system.
        </p>
      </div>

      {phase === 'idle' && (
        <div className="text-center py-12">
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-white mb-2">Production-Ready Safety Evaluation</h4>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            Systematic assessment of LLM safety across standardized hazard taxonomy with automated evaluators and 5-point grading system.
          </p>
          <button
            onClick={startBenchmark}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/20"
          >
            Run Safety Benchmark
          </button>
        </div>
      )}

      {phase === 'model-selection' && (
        <div className="space-y-4">
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-red-400" />
              Select Model for Testing
            </h4>
            <div className="space-y-2">
              {testModels.map(model => (
                <button
                  key={model.id}
                  onClick={() => selectModelAndStart(model)}
                  className="w-full text-left p-3 bg-slate-700/50 hover:bg-slate-700 rounded border border-slate-600/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{model.name}</div>
                      <div className="text-xs text-gray-400">{model.provider} • {model.version}</div>
                    </div>
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {(phase === 'hazard-testing' || phase === 'evaluation' || phase === 'grading' || phase === 'report' || phase === 'complete') && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-white font-semibold">Testing Model: {selectedModel.name}</h4>
                <p className="text-xs text-gray-400">{selectedModel.provider} • {selectedModel.version}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Progress</div>
                <div className="text-lg font-bold text-red-400">
                  {evaluatedCount}/{hazardCategories.length}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {hazardCategories.filter(cat => cat != null).map(category => (
                <div
                  key={category.id}
                  className={`p-3 rounded border transition-all ${
                    category.status === 'evaluated'
                      ? 'bg-slate-700/50 border-slate-600/50'
                      : category.status === 'testing'
                      ? 'bg-red-500/10 border-red-500/50 animate-pulse'
                      : 'bg-slate-800/30 border-slate-700/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{category.icon}</span>
                      <div>
                        <div className="text-white text-sm font-medium">{category.name}</div>
                        <div className="text-xs text-gray-500">{category.description}</div>
                      </div>
                    </div>
                    {category.status === 'evaluated' ? (
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    ) : category.status === 'testing' ? (
                      <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 animate-pulse" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    )}
                  </div>

                  {category.status === 'evaluated' && (
                    <div className="mt-2 pt-2 border-t border-slate-600/30">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Safety Score:</span>
                        <span className="text-sm font-bold text-white">{(category.safetyScore * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400">Grade:</span>
                        <span className={`text-sm font-bold ${getGradeColor(category.grade)}`}>
                          {category.grade}
                        </span>
                      </div>
                    </div>
                  )}

                  {category.status === 'testing' && (
                    <div className="mt-2">
                      <div className="text-xs text-gray-400">Testing {category.testPrompts.toLocaleString()} prompts...</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {(phase === 'evaluation' || phase === 'grading' || phase === 'report' || phase === 'complete') && (
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-red-400" />
                Automated Safety Evaluation
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                  <span className="text-gray-300">Test Prompts Processed</span>
                  <span className="text-white font-bold">24,000+</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                  <span className="text-gray-300">Hazard Categories Evaluated</span>
                  <span className="text-white font-bold">{evaluatedCount}/12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                  <span className="text-gray-300">Overall Safety Score</span>
                  <span className="text-white font-bold">{(overallSafetyScore * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          )}

          {(phase === 'grading' || phase === 'report' || phase === 'complete') && (
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                Safety Assessment Report
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Overall Safety Grade</span>
                    <span className={`text-2xl font-bold ${getGradeColor(overallGrade)}`}>
                      {overallGrade}
                    </span>
                  </div>
                  <div className="w-full bg-slate-600/50 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        overallSafetyScore >= 0.9
                          ? 'bg-green-500'
                          : overallSafetyScore >= 0.75
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${overallSafetyScore * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 font-medium">Deployment Decision</span>
                    <div className="flex items-center gap-2">
                      {deploymentDecision === 'approved' && (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-bold">✓ Approved</span>
                        </>
                      )}
                      {deploymentDecision === 'caution' && (
                        <>
                          <AlertTriangle className="w-5 h-5 text-yellow-400" />
                          <span className="text-yellow-400 font-bold">⚠ Proceed with Caution</span>
                        </>
                      )}
                      {deploymentDecision === 'rejected' && (
                        <>
                          <XCircle className="w-5 h-5 text-red-400" />
                          <span className="text-red-400 font-bold">✗ Not Recommended</span>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {deploymentDecision === 'approved' && 'Model demonstrates excellent safety across all hazard categories. Recommended for production deployment with standard monitoring.'}
                    {deploymentDecision === 'caution' && 'Model shows good safety performance but requires additional review in specific hazard categories before production deployment.'}
                    {deploymentDecision === 'rejected' && 'Model safety scores below production threshold. Additional safety measures and re-testing required before deployment.'}
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex gap-3">
                    <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-blue-400 font-semibold text-sm mb-1">
                        Standardized Safety Evaluation Principle
                      </div>
                      <p className="text-gray-300 text-sm">
                        Systematic assessment with comprehensive hazard taxonomy ensures reliable safety validation.
                        AILuminate v1.0 provides industry-standard benchmark with reproducible results for deployment decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {phase === 'complete' && (
            <div className="text-center">
              <button
                onClick={reset}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Run Another Evaluation
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AILuminateDemo;