'use client';

import React, { useState, useEffect } from 'react';
import { Settings, CheckCircle, XCircle, AlertTriangle, TrendingUp, Zap, Shield } from 'lucide-react';

interface Factor {
  id: string;
  number: number;
  name: string;
  category: 'foundation' | 'control' | 'production';
  description: string;
  status: 'pending' | 'evaluating' | 'compliant' | 'partial' | 'non-compliant';
  score: number;
}

interface AgentArchitecture {
  id: string;
  name: string;
  description: string;
  type: 'traditional' | '12-factor';
}

interface ComplianceMetric {
  category: string;
  score: number;
  status: 'excellent' | 'good' | 'needs-work' | 'critical';
}

type Phase = 'idle' | 'architecture-selection' | 'factor-evaluation' | 'compliance-analysis' | 'production-readiness' | 'complete';

const TwelveFactorAgentDemo: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);

  const architectures: AgentArchitecture[] = [
    { id: 'traditional', name: 'Traditional Agent', description: 'Prompt + Tools + Loop approach', type: 'traditional' },
    { id: '12-factor', name: '12-Factor Agent', description: 'Production-ready engineering methodology', type: '12-factor' },
  ];

  const [selectedArchitecture, setSelectedArchitecture] = useState<AgentArchitecture | null>(null);
  const [currentFactor, setCurrentFactor] = useState<number>(0);

  const [factors, setFactors] = useState<Factor[]>([
    { id: 'f1', number: 1, name: 'JSON Extraction as Foundation', category: 'foundation', description: 'Natural language → structured data', status: 'pending', score: 0 },
    { id: 'f2', number: 2, name: 'Own Your Prompts', category: 'foundation', description: 'Hand-crafted prompts, not abstractions', status: 'pending', score: 0 },
    { id: 'f3', number: 3, name: 'Manage Context Windows', category: 'foundation', description: 'Explicit context management', status: 'pending', score: 0 },
    { id: 'f4', number: 4, name: 'Tools Are JSON and Code', category: 'foundation', description: 'Demystify tool use as routing', status: 'pending', score: 0 },
    { id: 'f5', number: 5, name: 'Own Your Control Flow', category: 'control', description: 'Explicit OODA loops in code', status: 'pending', score: 0 },
    { id: 'f6', number: 6, name: 'Stateless Agent Design', category: 'control', description: 'Enable pause/resume capability', status: 'pending', score: 0 },
    { id: 'f7', number: 7, name: 'Separate Business from State', category: 'control', description: 'Different lifecycles, different needs', status: 'pending', score: 0 },
    { id: 'f8', number: 8, name: 'Contact Humans First-Class', category: 'control', description: 'Human-in-the-loop as core feature', status: 'pending', score: 0 },
    { id: 'f9', number: 9, name: 'Meet Users Where They Are', category: 'production', description: 'Multi-channel by design', status: 'pending', score: 0 },
    { id: 'f10', number: 10, name: 'Small, Focused Agents', category: 'production', description: '3-10 steps max for reliability', status: 'pending', score: 0 },
    { id: 'f11', number: 11, name: 'Explicit Error Handling', category: 'production', description: 'Intelligent error processing', status: 'pending', score: 0 },
    { id: 'f12', number: 12, name: 'Find the Bleeding Edge', category: 'production', description: 'Engineer at capability boundary', status: 'pending', score: 0 },
  ]);

  const [complianceMetrics, setComplianceMetrics] = useState<ComplianceMetric[]>([
    { category: 'Foundation', score: 0, status: 'needs-work' },
    { category: 'Control', score: 0, status: 'needs-work' },
    { category: 'Production', score: 0, status: 'needs-work' },
  ]);

  const [overallScore, setOverallScore] = useState<number>(0);
  const [productionReadiness, setProductionReadiness] = useState<'pending' | 'ready' | 'needs-work' | 'not-ready'>('pending');

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'foundation': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'control': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'production': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'partial': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'non-compliant': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return null;
    }
  };

  const startEvaluation = () => {
    setPhase('architecture-selection');
    setAnimatedPhase(true);
  };

  const selectArchitectureAndStart = (arch: AgentArchitecture) => {
    setSelectedArchitecture(arch);
    setPhase('factor-evaluation');
    setAnimatedPhase(true);
  };

  const reset = () => {
    setPhase('idle');
    setAnimatedPhase(false);
    setSelectedArchitecture(null);
    setCurrentFactor(0);
    setFactors(prev => prev.map(f => ({ ...f, status: 'pending' as const, score: 0 })));
    setComplianceMetrics([
      { category: 'Foundation', score: 0, status: 'needs-work' },
      { category: 'Control', score: 0, status: 'needs-work' },
      { category: 'Production', score: 0, status: 'needs-work' },
    ]);
    setOverallScore(0);
    setProductionReadiness('pending');
  };

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'factor-evaluation') {
      let factorIndex = 0;
      const evaluateNext = () => {
        if (factorIndex >= factors.length) {
          const timeout = setTimeout(() => {
            setPhase('compliance-analysis');
            setAnimatedPhase(true);
          }, 100);
          timeouts.push(timeout);
          return;
        }

        const timeout1 = setTimeout(() => {
          setFactors(prev => prev.map((f, idx) =>
            idx === factorIndex ? { ...f, status: 'evaluating' as const } : f
          ));
          setCurrentFactor(factorIndex);

          const timeout2 = setTimeout(() => {
            let score: number;
            let status: 'compliant' | 'partial' | 'non-compliant';

            if (selectedArchitecture?.type === '12-factor') {
              score = 0.85 + Math.random() * 0.15;
              status = score >= 0.9 ? 'compliant' : 'partial';
            } else {
              if (factorIndex < 4) {
                score = 0.5 + Math.random() * 0.3;
                status = 'partial';
              } else {
                score = 0.1 + Math.random() * 0.3;
                status = 'non-compliant';
              }
            }

            setFactors(prev => prev.map((f, idx) =>
              idx === factorIndex ? { ...f, status, score } : f
            ));

            factorIndex++;
            evaluateNext();
          }, 60);
          timeouts.push(timeout2);
        }, 25);
        timeouts.push(timeout1);
      };
      evaluateNext();
    }

    if (phase === 'compliance-analysis') {
      const timeout = setTimeout(() => {
        const foundationFactors = factors.filter(f => f.category === 'foundation');
        const controlFactors = factors.filter(f => f.category === 'control');
        const productionFactors = factors.filter(f => f.category === 'production');

        const foundationScore = foundationFactors.reduce((sum, f) => sum + f.score, 0) / foundationFactors.length;
        const controlScore = controlFactors.reduce((sum, f) => sum + f.score, 0) / controlFactors.length;
        const productionScore = productionFactors.reduce((sum, f) => sum + f.score, 0) / productionFactors.length;

        const getStatus = (score: number): 'excellent' | 'good' | 'needs-work' | 'critical' => {
          if (score >= 0.9) return 'excellent';
          if (score >= 0.7) return 'good';
          if (score >= 0.5) return 'needs-work';
          return 'critical';
        };

        setComplianceMetrics([
          { category: 'Foundation', score: foundationScore, status: getStatus(foundationScore) },
          { category: 'Control', score: controlScore, status: getStatus(controlScore) },
          { category: 'Production', score: productionScore, status: getStatus(productionScore) },
        ]);

        setPhase('production-readiness');
        setAnimatedPhase(true);
      }, 150);
      timeouts.push(timeout);
    }

    if (phase === 'production-readiness') {
      const timeout = setTimeout(() => {
        const avgScore = factors.reduce((sum, f) => sum + f.score, 0) / factors.length;
        setOverallScore(avgScore);

        if (avgScore >= 0.85) {
          setProductionReadiness('ready');
        } else if (avgScore >= 0.6) {
          setProductionReadiness('needs-work');
        } else {
          setProductionReadiness('not-ready');
        }

        setPhase('complete');
      }, 150);
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [phase, factors, selectedArchitecture]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">12-Factor Agent Evaluation</h3>
              <p className="text-sm text-slate-400">Production-ready methodology assessment</p>
            </div>
          </div>
          {phase === 'idle' ? (
            <button
              onClick={startEvaluation}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200"
            >
              Evaluate Agent
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

        {phase === 'architecture-selection' && (
          <div className="mt-6 animate-fadeIn">
            <h4 className="text-md font-medium text-white mb-4">Select Agent Architecture</h4>
            <div className="grid grid-cols-2 gap-4">
              {architectures.map(arch => (
                <button
                  key={arch.id}
                  onClick={() => selectArchitectureAndStart(arch)}
                  className={`p-6 rounded-lg border transition-all duration-200 text-left ${
                    arch.type === '12-factor'
                      ? 'bg-blue-500/10 border-blue-500/50 hover:border-blue-400 hover:bg-blue-500/20'
                      : 'bg-red-500/10 border-red-500/50 hover:border-red-400 hover:bg-red-500/20'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {arch.type === '12-factor' ? (
                      <Shield className="w-6 h-6 text-blue-400" />
                    ) : (
                      <Zap className="w-6 h-6 text-red-400" />
                    )}
                    <span className="text-white font-semibold text-lg">{arch.name}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{arch.description}</p>
                  {arch.type === 'traditional' && (
                    <div className="mt-3 text-xs text-red-400">
                      ⚠️ Gets 70% functionality quickly, last 20% debugging nightmare
                    </div>
                  )}
                  {arch.type === '12-factor' && (
                    <div className="mt-3 text-xs text-blue-400">
                      ✓ Engineering discipline for production-ready systems
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {(phase === 'factor-evaluation' || phase === 'compliance-analysis' || phase === 'production-readiness' || phase === 'complete') && (
          <>
            <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-slate-400">Architecture:</span>
                  <span className={`ml-2 text-white font-medium ${
                    selectedArchitecture?.type === '12-factor' ? 'text-blue-400' : 'text-red-400'
                  }`}>
                    {selectedArchitecture?.name}
                  </span>
                </div>
                {phase === 'factor-evaluation' && (
                  <div className="flex items-center gap-2 text-blue-400">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent"></div>
                    <span className="text-sm">Evaluating factors {currentFactor + 1}/12...</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-md font-medium text-white mb-4">12 Factor Compliance Assessment</h4>
              <div className="space-y-2">
                {factors.map((factor, idx) => (
                  <div
                    key={factor.id}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      factor.status === 'evaluating'
                        ? 'bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/20'
                        : factor.status === 'compliant'
                        ? 'bg-green-500/10 border-green-500/30'
                        : factor.status === 'partial'
                        ? 'bg-yellow-500/10 border-yellow-500/30'
                        : factor.status === 'non-compliant'
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'bg-slate-800/30 border-slate-700/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          factor.status === 'evaluating' ? 'bg-blue-500 text-white' :
                          factor.status === 'compliant' ? 'bg-green-500 text-white' :
                          factor.status === 'partial' ? 'bg-yellow-500 text-white' :
                          factor.status === 'non-compliant' ? 'bg-red-500 text-white' :
                          'bg-slate-600 text-slate-400'
                        }`}>
                          {factor.number}
                        </div>
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">{factor.name}</div>
                          <div className="text-xs text-slate-400">{factor.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs border ${getCategoryColor(factor.category)}`}>
                          {factor.category}
                        </span>
                        {factor.status === 'evaluating' && (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent"></div>
                        )}
                        {(factor.status === 'compliant' || factor.status === 'partial' || factor.status === 'non-compliant') && (
                          <>
                            <span className={`text-sm font-medium w-12 text-right ${
                              factor.status === 'compliant' ? 'text-green-400' :
                              factor.status === 'partial' ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {(factor.score * 100).toFixed(0)}%
                            </span>
                            {getStatusIcon(factor.status)}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {(phase === 'production-readiness' || phase === 'complete') && (
              <>
                <div className="mt-6 animate-fadeIn">
                  <h4 className="text-md font-medium text-white mb-4">Category Compliance Analysis</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {complianceMetrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border ${
                          metric.status === 'excellent' ? 'bg-green-500/10 border-green-500/30' :
                          metric.status === 'good' ? 'bg-blue-500/10 border-blue-500/30' :
                          metric.status === 'needs-work' ? 'bg-yellow-500/10 border-yellow-500/30' :
                          'bg-red-500/10 border-red-500/30'
                        }`}
                      >
                        <div className="text-sm text-slate-400 mb-2">{metric.category} Factors</div>
                        <div className={`text-2xl font-bold mb-2 ${
                          metric.status === 'excellent' ? 'text-green-400' :
                          metric.status === 'good' ? 'text-blue-400' :
                          metric.status === 'needs-work' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {(metric.score * 100).toFixed(0)}%
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              metric.status === 'excellent' ? 'bg-green-500' :
                              metric.status === 'good' ? 'bg-blue-500' :
                              metric.status === 'needs-work' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${metric.score * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 animate-fadeIn">
                  <div className="p-6 bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-lg border border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Production Readiness Assessment</h4>
                        <div className="flex items-center gap-4 mb-3">
                          <div>
                            <span className="text-sm text-slate-400">Overall Compliance:</span>
                            <span className="ml-2 text-2xl font-bold text-white">{(overallScore * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                          productionReadiness === 'ready'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : productionReadiness === 'needs-work'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {productionReadiness === 'ready' ? (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              <span className="font-medium">Production Ready</span>
                            </>
                          ) : productionReadiness === 'needs-work' ? (
                            <>
                              <AlertTriangle className="w-5 h-5" />
                              <span className="font-medium">Needs Improvement</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5" />
                              <span className="font-medium">Not Production Ready</span>
                            </>
                          )}
                        </div>
                      </div>
                      <TrendingUp className="w-16 h-16 text-slate-600" />
                    </div>
                    <div className="mt-4 text-sm text-slate-400">
                      {productionReadiness === 'ready' && (
                        <p>✓ Agent demonstrates strong compliance with 12-Factor methodology. Well-engineered software with LLM capabilities strategically integrated at control points. Ready for production deployment.</p>
                      )}
                      {productionReadiness === 'needs-work' && (
                        <p>⚠ Agent shows moderate compliance but requires improvements in key areas. Focus on stateless design, explicit control flow, and human-in-the-loop integration before production deployment.</p>
                      )}
                      {productionReadiness === 'not-ready' && selectedArchitecture?.type === 'traditional' && (
                        <p>❌ Traditional "prompt + tools + loop" approach achieves 70% functionality quickly but struggles with production requirements. Lacks explicit control flow, stateless design, and proper error handling. Recommend adopting 12-Factor methodology.</p>
                      )}
                      {productionReadiness === 'not-ready' && selectedArchitecture?.type === '12-factor' && (
                        <p>❌ Implementation requires significant work to achieve 12-Factor compliance. Review each factor systematically and refactor for production readiness.</p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
        <h4 className="text-sm font-medium text-white mb-2">About 12-Factor Agent Methodology</h4>
        <p className="text-sm text-slate-400 leading-relaxed">
          The 12-Factor Agent methodology adapts proven software engineering principles from 12-factor apps for
          production-ready AI agents. It emphasizes: JSON extraction as foundation, owned prompts and context, explicit
          control flow, stateless design, human-in-the-loop as first-class operations, small focused agents (3-10 steps),
          and explicit error handling. Most successful agents aren't the most "agentic" - they're well-engineered software
          systems leveraging LLMs at strategic control points, moving beyond 70-80% prototype reliability to production-grade systems.
        </p>
      </div>
    </div>
  );
};

export default TwelveFactorAgentDemo;