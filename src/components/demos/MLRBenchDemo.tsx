'use client';

import React, { useState, useEffect } from 'react';
import { FlaskConical, Lightbulb, FileText, Code, AlertTriangle, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

interface ResearchStage {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'executing' | 'completed';
  score: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
}

interface ResearchDomain {
  id: string;
  name: string;
  icon: string;
  tasksCount: number;
}

interface TestModel {
  id: string;
  name: string;
  provider: string;
}

interface PerformanceMetric {
  name: string;
  score: number;
  status: 'success' | 'warning' | 'critical';
}

type Phase = 'idle' | 'model-selection' | 'domain-selection' | 'pipeline-execution' | 'stage-evaluation' | 'performance-analysis' | 'research-readiness' | 'complete';

const MLRBenchDemo: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);

  const testModels: TestModel[] = [
    { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
    { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic' },
    { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google' },
  ];

  const researchDomains: ResearchDomain[] = [
    { id: 'llm', name: 'Large Language Models', icon: '💬', tasksCount: 35 },
    { id: 'cv', name: 'Computer Vision', icon: '👁️', tasksCount: 28 },
    { id: 'rl', name: 'Reinforcement Learning', icon: '🎮', tasksCount: 25 },
    { id: 'ai4science', name: 'AI for Science', icon: '🔬', tasksCount: 22 },
    { id: 'ml-theory', name: 'ML Theory', icon: '📐', tasksCount: 20 },
    { id: 'multimodal', name: 'Multimodal Learning', icon: '🎨', tasksCount: 18 },
    { id: 'graph-ml', name: 'Graph ML', icon: '🕸️', tasksCount: 16 },
    { id: 'robotics', name: 'Robotics', icon: '🤖', tasksCount: 19 },
    { id: 'nlp', name: 'Natural Language Processing', icon: '📝', tasksCount: 18 },
  ];

  const [selectedModel, setSelectedModel] = useState<TestModel>(testModels[0]);
  const [selectedDomain, setSelectedDomain] = useState<ResearchDomain>(researchDomains[0]);
  const [currentStage, setCurrentStage] = useState<number>(0);

  const [researchStages, setResearchStages] = useState<ResearchStage[]>([
    { id: 'idea', name: 'Idea Generation', description: 'Creative problem identification and novel approach design', icon: <Lightbulb className="w-5 h-5" />, status: 'pending', score: 0, quality: 'poor' },
    { id: 'proposal', name: 'Proposal Formulation', description: 'Structured methodology and experimental framework', icon: <FileText className="w-5 h-5" />, status: 'pending', score: 0, quality: 'poor' },
    { id: 'experiment', name: 'Experimentation', description: 'Implementation and experimental validation', icon: <Code className="w-5 h-5" />, status: 'pending', score: 0, quality: 'poor' },
    { id: 'writing', name: 'Paper Writing', description: 'Coherent structure and clear presentation', icon: <FileText className="w-5 h-5" />, status: 'pending', score: 0, quality: 'poor' },
  ]);

  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([
    { name: 'Innovation Index', score: 0, status: 'success' },
    { name: 'Technical Soundness', score: 0, status: 'warning' },
    { name: 'Experimental Reliability', score: 0, status: 'critical' },
  ]);

  const [overallScore, setOverallScore] = useState<number>(0);
  const [researchReadiness, setResearchReadiness] = useState<'pending' | 'ready' | 'needs-work' | 'not-ready'>('pending');
  const [experimentalReliability, setExperimentalReliability] = useState<number>(0);

  const getQualityColor = (quality: string): string => {
    switch (quality) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'fair': return 'text-yellow-400';
      case 'poor': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getQualityFromScore = (score: number): 'excellent' | 'good' | 'fair' | 'poor' | 'critical' => {
    if (score >= 0.85) return 'excellent';
    if (score >= 0.7) return 'good';
    if (score >= 0.5) return 'fair';
    if (score >= 0.3) return 'poor';
    return 'critical';
  };

  const startBenchmark = () => {
    setPhase('model-selection');
    setAnimatedPhase(true);
  };

  const selectModelAndContinue = (model: TestModel) => {
    setSelectedModel(model);
    setPhase('domain-selection');
    setAnimatedPhase(true);
  };

  const selectDomainAndStart = (domain: ResearchDomain) => {
    setSelectedDomain(domain);
    setPhase('pipeline-execution');
    setAnimatedPhase(true);
  };

  const reset = () => {
    setPhase('idle');
    setAnimatedPhase(false);
    setCurrentStage(0);
    setResearchStages([
      { id: 'idea', name: 'Idea Generation', description: 'Creative problem identification and novel approach design', icon: <Lightbulb className="w-5 h-5" />, status: 'pending', score: 0, quality: 'poor' },
      { id: 'proposal', name: 'Proposal Formulation', description: 'Structured methodology and experimental framework', icon: <FileText className="w-5 h-5" />, status: 'pending', score: 0, quality: 'poor' },
      { id: 'experiment', name: 'Experimentation', description: 'Implementation and experimental validation', icon: <Code className="w-5 h-5" />, status: 'pending', score: 0, quality: 'poor' },
      { id: 'writing', name: 'Paper Writing', description: 'Coherent structure and clear presentation', icon: <FileText className="w-5 h-5" />, status: 'pending', score: 0, quality: 'poor' },
    ]);
    setPerformanceMetrics([
      { name: 'Innovation Index', score: 0, status: 'success' },
      { name: 'Technical Soundness', score: 0, status: 'warning' },
      { name: 'Experimental Reliability', score: 0, status: 'critical' },
    ]);
    setOverallScore(0);
    setResearchReadiness('pending');
    setExperimentalReliability(0);
  };

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'pipeline-execution') {
      let stageIndex = 0;
      const executeNext = () => {
        if (stageIndex >= researchStages.length) {
          const timeout = setTimeout(() => {
            setPhase('stage-evaluation');
            setAnimatedPhase(true);
          }, 100);
          timeouts.push(timeout);
          return;
        }

        const timeout1 = setTimeout(() => {
          setResearchStages(prev => prev.map((stage, idx) =>
            idx === stageIndex ? { ...stage, status: 'executing' as const } : stage
          ));
          setCurrentStage(stageIndex);

          const timeout2 = setTimeout(() => {
            let score: number;
            if (stageIndex === 0) {
              score = 0.75 + Math.random() * 0.2;
            } else if (stageIndex === 1) {
              score = 0.7 + Math.random() * 0.2;
            } else if (stageIndex === 2) {
              score = 0.1 + Math.random() * 0.15;
            } else {
              score = 0.72 + Math.random() * 0.18;
            }

            const quality = getQualityFromScore(score);

            setResearchStages(prev => prev.map((stage, idx) =>
              idx === stageIndex ? { ...stage, status: 'completed' as const, score, quality } : stage
            ));

            stageIndex++;
            executeNext();
          }, 70);
          timeouts.push(timeout2);
        }, 30);
        timeouts.push(timeout1);
      };
      executeNext();
    }

    if (phase === 'stage-evaluation') {
      const timeout = setTimeout(() => {
        const ideaScore = researchStages[0].score;
        const proposalScore = researchStages[1].score;
        const experimentScore = researchStages[2].score;
        const writingScore = researchStages[3].score;

        const innovationScore = (ideaScore + proposalScore) / 2;
        const technicalScore = (proposalScore + experimentScore + writingScore) / 3;
        const experimentalReliability = experimentScore;

        setPerformanceMetrics([
          { name: 'Innovation Index', score: innovationScore, status: 'success' },
          { name: 'Technical Soundness', score: technicalScore, status: 'warning' },
          { name: 'Experimental Reliability', score: experimentalReliability, status: 'critical' },
        ]);

        setExperimentalReliability(experimentalReliability);

        setPhase('performance-analysis');
        setAnimatedPhase(true);
      }, 150);
      timeouts.push(timeout);
    }

    if (phase === 'performance-analysis') {
      const timeout = setTimeout(() => {
        const avgScore = researchStages.reduce((sum, stage) => sum + stage.score, 0) / researchStages.length;
        setOverallScore(avgScore);

        if (avgScore >= 0.6 && experimentalReliability >= 0.3) {
          setResearchReadiness('needs-work');
        } else if (avgScore >= 0.5) {
          setResearchReadiness('needs-work');
        } else {
          setResearchReadiness('not-ready');
        }

        setPhase('research-readiness');
        setAnimatedPhase(true);
      }, 150);
      timeouts.push(timeout);
    }

    if (phase === 'research-readiness') {
      const timeout = setTimeout(() => {
        setPhase('complete');
      }, 100);
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [phase, researchStages, experimentalReliability]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
              <FlaskConical className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">MLR-Bench Evaluation</h3>
              <p className="text-sm text-slate-400">201 ML research tasks from top conferences</p>
            </div>
          </div>
          {phase === 'idle' ? (
            <button
              onClick={startBenchmark}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200"
            >
              Run Research Benchmark
            </button>
          ) : phase === 'complete' ? (
            <button
              onClick={reset}
              className="px-6 py-2.5 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
            >
              Reset Demo
            </button>
          ) : null}
        </div>

        {phase === 'model-selection' && (
          <div className="mt-6 animate-fadeIn">
            <h4 className="text-md font-medium text-white mb-4">Select Research AI Agent</h4>
            <div className="grid grid-cols-3 gap-3">
              {testModels.map(model => (
                <button
                  key={model.id}
                  onClick={() => selectModelAndContinue(model)}
                  className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg hover:border-purple-500/50 hover:bg-slate-700/30 transition-all duration-200 text-left"
                >
                  <div className="text-white font-medium mb-1">{model.name}</div>
                  <p className="text-sm text-slate-400">{model.provider}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 'domain-selection' && (
          <div className="mt-6 animate-fadeIn">
            <h4 className="text-md font-medium text-white mb-4">Select Research Domain</h4>
            <div className="grid grid-cols-3 gap-3">
              {researchDomains.slice(0, 6).map(domain => (
                <button
                  key={domain.id}
                  onClick={() => selectDomainAndStart(domain)}
                  className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg hover:border-purple-500/50 hover:bg-slate-700/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{domain.icon}</span>
                    <span className="text-white font-medium text-sm">{domain.name}</span>
                  </div>
                  <span className="text-xs text-slate-400">{domain.tasksCount} research tasks</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {(phase === 'pipeline-execution' || phase === 'stage-evaluation' || phase === 'performance-analysis' || phase === 'research-readiness' || phase === 'complete') && (
          <>
            <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Research Agent:</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{selectedModel.name}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-white">{selectedDomain.name}</span>
                </div>
              </div>
              {phase === 'pipeline-execution' && (
                <div className="mt-3 flex items-center gap-2 text-purple-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-400 border-t-transparent"></div>
                  <span className="text-sm">Executing research pipeline...</span>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h4 className="text-md font-medium text-white mb-4">4-Stage Research Pipeline</h4>
              <div className="space-y-3">
                {researchStages.map((stage, idx) => (
                  <div
                    key={stage.id}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      stage.status === 'executing'
                        ? 'bg-purple-500/10 border-purple-500/50 shadow-lg shadow-purple-500/20'
                        : stage.status === 'completed'
                        ? stage.quality === 'critical'
                          ? 'bg-red-500/10 border-red-500/50'
                          : 'bg-slate-800/50 border-slate-700/50'
                        : 'bg-slate-800/30 border-slate-700/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`${
                          stage.status === 'executing' ? 'text-purple-400' :
                          stage.status === 'completed' ? 'text-white' : 'text-slate-500'
                        }`}>
                          {stage.icon}
                        </div>
                        <div>
                          <div className="text-white font-medium">{stage.name}</div>
                          <div className="text-xs text-slate-400">{stage.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {stage.status === 'executing' && (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-400 border-t-transparent"></div>
                        )}
                        {stage.status === 'completed' && (
                          <>
                            <span className={`text-sm font-medium ${getQualityColor(stage.quality)}`}>
                              {(stage.score * 100).toFixed(0)}%
                            </span>
                            {stage.quality === 'critical' ? (
                              <XCircle className="w-5 h-5 text-red-400" />
                            ) : stage.quality === 'poor' ? (
                              <AlertTriangle className="w-5 h-5 text-orange-400" />
                            ) : (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    {stage.status === 'completed' && stage.id === 'experiment' && stage.quality === 'critical' && (
                      <div className="mt-3 p-2 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-400">
                        ⚠️ Critical Issue: 80% fabricated results - experimental validation failed
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {(phase === 'performance-analysis' || phase === 'research-readiness' || phase === 'complete') && (
              <div className="mt-6 animate-fadeIn">
                <h4 className="text-md font-medium text-white mb-4">Performance Analysis</h4>
                <div className="grid grid-cols-3 gap-4">
                  {performanceMetrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border ${
                        metric.status === 'critical'
                          ? 'bg-red-500/10 border-red-500/30'
                          : metric.status === 'warning'
                          ? 'bg-yellow-500/10 border-yellow-500/30'
                          : 'bg-green-500/10 border-green-500/30'
                      }`}
                    >
                      <div className="text-sm text-slate-400 mb-2">{metric.name}</div>
                      <div className={`text-2xl font-bold ${
                        metric.status === 'critical' ? 'text-red-400' :
                        metric.status === 'warning' ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {(metric.score * 100).toFixed(0)}%
                      </div>
                      <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            metric.status === 'critical' ? 'bg-red-500' :
                            metric.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${metric.score * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(phase === 'research-readiness' || phase === 'complete') && (
              <div className="mt-6 animate-fadeIn">
                <div className="p-6 bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-lg border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Research Quality Assessment</h4>
                      <div className="flex items-center gap-4 mb-3">
                        <div>
                          <span className="text-sm text-slate-400">Overall Score:</span>
                          <span className="ml-2 text-2xl font-bold text-white">{(overallScore * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                        researchReadiness === 'ready'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : researchReadiness === 'needs-work'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {researchReadiness === 'ready' ? (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">Research Ready</span>
                          </>
                        ) : researchReadiness === 'needs-work' ? (
                          <>
                            <AlertTriangle className="w-5 h-5" />
                            <span className="font-medium">Needs Improvement</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5" />
                            <span className="font-medium">Not Research Ready</span>
                          </>
                        )}
                      </div>
                    </div>
                    <TrendingUp className="w-16 h-16 text-slate-600" />
                  </div>
                  <div className="mt-4 text-sm text-slate-400">
                    {experimentalReliability < 0.3 && (
                      <p>⚠️ Critical experimental reliability issue detected. Agent excels at idea generation and paper writing but fails catastrophically at experimental validation (80% fabricated results). Trustworthy research requires reliable experimentation.</p>
                    )}
                    {experimentalReliability >= 0.3 && researchReadiness === 'needs-work' && (
                      <p>Agent shows promise in conceptual work and writing but requires significant improvement in experimental implementation before production research deployment.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
        <h4 className="text-sm font-medium text-white mb-2">About MLR-Bench</h4>
        <p className="text-sm text-slate-400 leading-relaxed">
          MLR-Bench evaluates AI agents on 201 open-ended machine learning research tasks from top-tier conferences
          (NeurIPS, ICLR, ICML). It assesses the complete research pipeline through 4 stages: idea generation, proposal
          formulation, experimentation, and paper writing. Critical finding: while agents excel at ideas and writing,
          80% produce fabricated experimental results, highlighting the experimental reliability gap as the key bottleneck
          for trustworthy AI research automation.
        </p>
      </div>
    </div>
  );
};

export default MLRBenchDemo;