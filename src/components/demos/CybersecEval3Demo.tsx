'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Shield, Lock, Zap, Activity, AlertOctagon } from 'lucide-react';

type DemoPhase = 'idle' | 'model-selection' | 'domain-testing' | 'multi-agent-risks' | 'guardrail-deployment' | 'analysis' | 'complete';

interface Model {
  id: string;
  name: string;
  vendor: 'meta' | 'openai' | 'anthropic' | 'oss';
}

interface SecurityDomain {
  id: string;
  name: string;
  status: 'pending' | 'testing' | 'evaluated';
  score?: number;
  rating?: 'secure' | 'moderate' | 'vulnerable';
}

interface MultiAgentRisk {
  id: string;
  name: string;
  status: 'pending' | 'assessing' | 'evaluated';
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  vulnerabilities?: number;
}

interface GuardrailResult {
  deployed: boolean;
  detectionRate?: number;
  blockingRate?: number;
  effectiveness?: 'excellent' | 'good' | 'fair';
}

interface SecurityAnalysis {
  overallScore: number;
  recommendation: 'approved' | 'conditional' | 'rejected';
  highPriorityFixes: number;
  offensiveCapability: number;
  defensiveReadiness: number;
}

const CybersecEval3Demo: React.FC = () => {
  const [phase, setPhase] = useState<DemoPhase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [securityDomains, setSecurityDomains] = useState<SecurityDomain[]>([
    { id: 'code-security', name: 'Code Security', status: 'pending' },
    { id: 'data-privacy', name: 'Data Privacy', status: 'pending' },
    { id: 'access-control', name: 'Access Control', status: 'pending' },
    { id: 'injection-attacks', name: 'Injection Attacks', status: 'pending' },
    { id: 'social-engineering', name: 'Social Engineering', status: 'pending' },
  ]);
  const [testedDomains, setTestedDomains] = useState(0);
  const [multiAgentRisks, setMultiAgentRisks] = useState<MultiAgentRisk[]>([
    { id: 'agent-communication', name: 'Agent-to-Agent Communication', status: 'pending' },
    { id: 'privilege-escalation', name: 'Privilege Escalation', status: 'pending' },
    { id: 'information-leakage', name: 'Information Leakage', status: 'pending' },
    { id: 'coordination-attacks', name: 'Coordination Attacks', status: 'pending' },
  ]);
  const [assessedRisks, setAssessedRisks] = useState(0);
  const [guardrailResult, setGuardrailResult] = useState<GuardrailResult>({ deployed: false });
  const [securityAnalysis, setSecurityAnalysis] = useState<SecurityAnalysis | null>(null);

  const models: Model[] = [
    { id: 'llama3-405b', name: 'Llama 3 405B', vendor: 'meta' },
    { id: 'gpt4-turbo', name: 'GPT-4 Turbo', vendor: 'openai' },
    { id: 'claude3-opus', name: 'Claude 3 Opus', vendor: 'anthropic' },
    { id: 'mixtral-8x7b', name: 'Mixtral 8x7B', vendor: 'oss' },
  ];

  useEffect(() => {
    if (phase === 'idle') return;

    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'model-selection' && selectedModel) {
      const timeout = setTimeout(() => {
        setPhase('domain-testing');
        setAnimatedPhase(true);
      }, 100);
      timeouts.push(timeout);
    }

    if (phase === 'domain-testing') {
      let currentIndex = 0;
      const testNext = () => {
        if (currentIndex >= securityDomains.length) {
          const timeout = setTimeout(() => {
            setPhase('multi-agent-risks');
            setAnimatedPhase(true);
          }, 100);
          timeouts.push(timeout);
          return;
        }

        const timeout1 = setTimeout(() => {
          setSecurityDomains(prev => prev.map((d, idx) =>
            idx === currentIndex ? { ...d, status: 'testing' as const } : d
          ));

          const timeout2 = setTimeout(() => {
            const domain = securityDomains[currentIndex];
            let score: number;
            let rating: 'secure' | 'moderate' | 'vulnerable';

            if (selectedModel!.vendor === 'meta') {
              if (domain.id === 'social-engineering') {
                score = 0.72 + Math.random() * 0.1;
                rating = 'moderate';
              } else {
                score = 0.85 + Math.random() * 0.1;
                rating = 'secure';
              }
            } else if (selectedModel!.vendor === 'openai') {
              if (domain.id === 'code-security') {
                score = 0.75 + Math.random() * 0.15;
                rating = score >= 0.85 ? 'secure' : 'moderate';
              } else {
                score = 0.80 + Math.random() * 0.15;
                rating = score >= 0.85 ? 'secure' : 'moderate';
              }
            } else if (selectedModel!.vendor === 'anthropic') {
              score = 0.88 + Math.random() * 0.1;
              rating = 'secure';
            } else {
              score = 0.65 + Math.random() * 0.2;
              rating = score >= 0.80 ? 'moderate' : 'vulnerable';
            }

            setSecurityDomains(prev => prev.map((d, idx) =>
              idx === currentIndex ? { ...d, status: 'evaluated' as const, score, rating } : d
            ));

            setTestedDomains(currentIndex + 1);
            currentIndex++;
            testNext();
          }, 60);
          timeouts.push(timeout2);
        }, 25);
        timeouts.push(timeout1);
      };
      testNext();
    }

    if (phase === 'multi-agent-risks') {
      let riskIndex = 0;
      const assessNext = () => {
        if (riskIndex >= multiAgentRisks.length) {
          const timeout = setTimeout(() => {
            setPhase('guardrail-deployment');
            setAnimatedPhase(true);
          }, 100);
          timeouts.push(timeout);
          return;
        }

        const timeout1 = setTimeout(() => {
          setMultiAgentRisks(prev => prev.map((r, idx) =>
            idx === riskIndex ? { ...r, status: 'assessing' as const } : r
          ));

          const timeout2 = setTimeout(() => {
            const risk = multiAgentRisks[riskIndex];
            let riskLevel: 'low' | 'medium' | 'high' | 'critical';
            let vulnerabilities: number;

            if (selectedModel!.vendor === 'meta') {
              if (risk.id === 'privilege-escalation') {
                riskLevel = 'medium';
                vulnerabilities = Math.floor(1 + Math.random() * 2);
              } else if (risk.id === 'coordination-attacks') {
                riskLevel = 'medium';
                vulnerabilities = 0;
              } else if (risk.id === 'agent-communication') {
                riskLevel = 'low';
                vulnerabilities = 0;
              } else {
                riskLevel = 'low';
                vulnerabilities = 0;
              }
            } else if (selectedModel!.vendor === 'openai') {
              if (risk.id === 'privilege-escalation' || risk.id === 'information-leakage') {
                riskLevel = 'medium';
                vulnerabilities = Math.floor(1 + Math.random() * 2);
              } else {
                riskLevel = 'low';
                vulnerabilities = 0;
              }
            } else if (selectedModel!.vendor === 'anthropic') {
              riskLevel = 'low';
              vulnerabilities = 0;
            } else {
              if (Math.random() > 0.6) {
                riskLevel = 'high';
                vulnerabilities = Math.floor(2 + Math.random() * 3);
              } else {
                riskLevel = 'medium';
                vulnerabilities = Math.floor(1 + Math.random() * 2);
              }
            }

            setMultiAgentRisks(prev => prev.map((r, idx) =>
              idx === riskIndex ? { ...r, status: 'evaluated' as const, riskLevel, vulnerabilities } : r
            ));

            setAssessedRisks(riskIndex + 1);
            riskIndex++;
            assessNext();
          }, 65);
          timeouts.push(timeout2);
        }, 30);
        timeouts.push(timeout1);
      };
      assessNext();
    }

    if (phase === 'guardrail-deployment') {
      const timeout1 = setTimeout(() => {
        const detectionRate = 0.90 + Math.random() * 0.09;
        const blockingRate = 0.85 + Math.random() * 0.1;
        const effectiveness = detectionRate >= 0.95 && blockingRate >= 0.90 ? 'excellent' :
                            detectionRate >= 0.90 && blockingRate >= 0.85 ? 'good' : 'fair';

        setGuardrailResult({
          deployed: true,
          detectionRate,
          blockingRate,
          effectiveness
        });

        const timeout2 = setTimeout(() => {
          setPhase('analysis');
          setAnimatedPhase(true);
        }, 100);
        timeouts.push(timeout2);
      }, 800);
      timeouts.push(timeout1);
    }

    if (phase === 'analysis') {
      const timeout = setTimeout(() => {
        const domainAvg = securityDomains.reduce((sum, d) => sum + (d.score || 0), 0) / securityDomains.length;
        const overallScore = domainAvg;

        const totalVulnerabilities = multiAgentRisks.reduce((sum, r) => sum + (r.vulnerabilities || 0), 0);
        const highPriorityFixes = totalVulnerabilities;

        const criticalRisks = multiAgentRisks.filter(r => r.riskLevel === 'critical' || r.riskLevel === 'high').length;

        let recommendation: 'approved' | 'conditional' | 'rejected';
        if (overallScore >= 0.90 && highPriorityFixes === 0) {
          recommendation = 'approved';
        } else if (overallScore >= 0.80 && highPriorityFixes <= 2 && criticalRisks === 0) {
          recommendation = 'conditional';
        } else {
          recommendation = 'rejected';
        }

        const offensiveCapability = selectedModel!.vendor === 'meta' ? 0.77 :
                                   selectedModel!.vendor === 'openai' ? 0.62 :
                                   selectedModel!.vendor === 'anthropic' ? 0.55 : 0.45;

        const defensiveReadiness = overallScore * (guardrailResult.effectiveness === 'excellent' ? 1.0 :
                                                   guardrailResult.effectiveness === 'good' ? 0.95 : 0.85);

        setSecurityAnalysis({
          overallScore,
          recommendation,
          highPriorityFixes,
          offensiveCapability,
          defensiveReadiness
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
  }, [phase, selectedModel, securityDomains.length, multiAgentRisks.length, guardrailResult.effectiveness]);

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
    setPhase('model-selection');
    setAnimatedPhase(false);
  };

  const handleReset = () => {
    setPhase('idle');
    setAnimatedPhase(false);
    setSelectedModel(null);
    setSecurityDomains(prev => prev.map(d => ({ ...d, status: 'pending' as const, score: undefined, rating: undefined })));
    setTestedDomains(0);
    setMultiAgentRisks(prev => prev.map(r => ({ ...r, status: 'pending' as const, riskLevel: undefined, vulnerabilities: undefined })));
    setAssessedRisks(0);
    setGuardrailResult({ deployed: false });
    setSecurityAnalysis(null);
  };

  const getDomainColor = (rating?: 'secure' | 'moderate' | 'vulnerable') => {
    switch (rating) {
      case 'secure': return 'text-green-400';
      case 'moderate': return 'text-yellow-400';
      case 'vulnerable': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDomainBgColor = (rating?: 'secure' | 'moderate' | 'vulnerable') => {
    switch (rating) {
      case 'secure': return 'bg-green-500/10';
      case 'moderate': return 'bg-yellow-500/10';
      case 'vulnerable': return 'bg-red-500/10';
      default: return 'bg-slate-800/30';
    }
  };

  const getRiskColor = (level?: 'low' | 'medium' | 'high' | 'critical') => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRiskBgColor = (level?: 'low' | 'medium' | 'high' | 'critical') => {
    switch (level) {
      case 'low': return 'bg-green-500/10';
      case 'medium': return 'bg-yellow-500/10';
      case 'high': return 'bg-orange-500/10';
      case 'critical': return 'bg-red-500/10';
      default: return 'bg-slate-800/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 rounded-lg p-6 border border-purple-500/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">CybersecEval 3</h3>
            <p className="text-purple-300 text-sm">Meta's Comprehensive Cybersecurity Benchmark</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          Evaluates security risks across 8 categories including autonomous hacking, vulnerability discovery, social engineering, and multi-agent coordination attacks.
          Includes Llama Guard 3 for risk mitigation.
        </p>
      </div>

      {/* Model Selection */}
      {phase === 'idle' && (
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-400" />
            Select Model for Security Evaluation
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {models.map(model => (
              <button
                key={model.id}
                onClick={() => handleModelSelect(model)}
                className="bg-slate-800/30 hover:bg-slate-700/50 border border-slate-600/50 rounded-lg p-4 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{model.name}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    model.vendor === 'meta' ? 'bg-blue-500/20 text-blue-300' :
                    model.vendor === 'openai' ? 'bg-green-500/20 text-green-300' :
                    model.vendor === 'anthropic' ? 'bg-orange-500/20 text-orange-300' :
                    'bg-purple-500/20 text-purple-300'
                  }`}>
                    {model.vendor}
                  </span>
                </div>
                <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  Test across 5 security domains and 4 multi-agent risks
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Security Domain Testing */}
      {(phase === 'domain-testing' || (phase !== 'idle' && testedDomains > 0)) && (
        <div className={`bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 transition-all ${
          animatedPhase && phase === 'domain-testing' ? 'ring-2 ring-purple-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Security Domain Testing
            <span className="text-gray-400 text-sm font-normal ml-auto">
              {testedDomains}/{securityDomains.length} domains evaluated
            </span>
          </h4>
          <div className="space-y-3">
            {securityDomains.map((domain) => (
              <div
                key={domain.id}
                className={`rounded-lg p-4 border transition-all ${
                  domain.status === 'evaluated'
                    ? `${getDomainBgColor(domain.rating)} border-slate-600/50`
                    : domain.status === 'testing'
                    ? 'bg-blue-500/10 border-blue-500/50'
                    : 'bg-slate-800/20 border-slate-700/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">{domain.name}</span>
                  <div className="flex items-center gap-2">
                    {domain.status === 'evaluated' && domain.score !== undefined && (
                      <>
                        <span className={`text-sm font-medium ${getDomainColor(domain.rating)}`}>
                          {(domain.score * 100).toFixed(0)}%
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${getDomainBgColor(domain.rating)} ${getDomainColor(domain.rating)}`}>
                          {domain.rating}
                        </span>
                      </>
                    )}
                    {domain.status === 'evaluated' ? (
                      domain.rating === 'secure' ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : domain.rating === 'moderate' ? (
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )
                    ) : domain.status === 'testing' ? (
                      <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <div className="w-5 h-5 bg-slate-600/50 rounded-full" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Multi-Agent Risk Assessment */}
      {(phase === 'multi-agent-risks' || (phase !== 'idle' && phase !== 'model-selection' && phase !== 'domain-testing' && assessedRisks > 0)) && (
        <div className={`bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 transition-all ${
          animatedPhase && phase === 'multi-agent-risks' ? 'ring-2 ring-purple-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-orange-400" />
            Multi-Agent Risk Assessment
            <span className="text-gray-400 text-sm font-normal ml-auto">
              {assessedRisks}/{multiAgentRisks.length} risks assessed
            </span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {multiAgentRisks.map((risk) => (
              <div
                key={risk.id}
                className={`rounded-lg p-4 border transition-all ${
                  risk.status === 'evaluated'
                    ? `${getRiskBgColor(risk.riskLevel)} border-slate-600/50`
                    : risk.status === 'assessing'
                    ? 'bg-blue-500/10 border-blue-500/50'
                    : 'bg-slate-800/20 border-slate-700/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-semibold">{risk.name}</span>
                  {risk.status === 'evaluated' ? (
                    risk.riskLevel === 'low' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : risk.riskLevel === 'medium' ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <AlertOctagon className="w-5 h-5 text-red-400" />
                    )
                  ) : risk.status === 'assessing' ? (
                    <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="w-5 h-5 bg-slate-600/50 rounded-full" />
                  )}
                </div>
                {risk.status === 'evaluated' && (
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-medium ${getRiskColor(risk.riskLevel)}`}>
                      {risk.riskLevel?.toUpperCase()} RISK
                    </span>
                    {risk.vulnerabilities !== undefined && risk.vulnerabilities > 0 && (
                      <span className="text-red-400">
                        {risk.vulnerabilities} {risk.vulnerabilities === 1 ? 'vulnerability' : 'vulnerabilities'}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guardrail Deployment */}
      {(phase === 'guardrail-deployment' || phase === 'analysis' || phase === 'complete') && guardrailResult.deployed && (
        <div className={`bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 transition-all ${
          animatedPhase && phase === 'guardrail-deployment' ? 'ring-2 ring-purple-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            Llama Guard 3 Deployment
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
              <div className="text-gray-400 text-xs mb-2">Detection Rate</div>
              <div className="text-emerald-400 text-2xl font-semibold mb-2">
                {guardrailResult.detectionRate ? (guardrailResult.detectionRate * 100).toFixed(1) : '-'}%
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                {guardrailResult.detectionRate && (
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-full transition-all duration-500"
                    style={{ width: `${guardrailResult.detectionRate * 100}%` }}
                  />
                )}
              </div>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
              <div className="text-gray-400 text-xs mb-2">Blocking Rate</div>
              <div className="text-blue-400 text-2xl font-semibold mb-2">
                {guardrailResult.blockingRate ? (guardrailResult.blockingRate * 100).toFixed(1) : '-'}%
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                {guardrailResult.blockingRate && (
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all duration-500"
                    style={{ width: `${guardrailResult.blockingRate * 100}%` }}
                  />
                )}
              </div>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
              <div className="text-gray-400 text-xs mb-2">Effectiveness</div>
              <div className={`text-2xl font-semibold mb-2 ${
                guardrailResult.effectiveness === 'excellent' ? 'text-green-400' :
                guardrailResult.effectiveness === 'good' ? 'text-blue-400' : 'text-yellow-400'
              }`}>
                {guardrailResult.effectiveness ? guardrailResult.effectiveness.toUpperCase() : '-'}
              </div>
              <div className="flex items-center gap-1">
                {guardrailResult.effectiveness === 'excellent' && <CheckCircle className="w-5 h-5 text-green-400" />}
                {guardrailResult.effectiveness === 'good' && <CheckCircle className="w-5 h-5 text-blue-400" />}
                {guardrailResult.effectiveness === 'fair' && <AlertTriangle className="w-5 h-5 text-yellow-400" />}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Analysis */}
      {(phase === 'analysis' || phase === 'complete') && securityAnalysis && (
        <div className={`bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-lg p-6 border border-purple-500/30 transition-all ${
          animatedPhase && phase === 'analysis' ? 'ring-2 ring-purple-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            Security Analysis & Recommendation
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-gray-400 text-xs mb-2">Overall Security Score</div>
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {(securityAnalysis.overallScore * 100).toFixed(0)}%
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500"
                  style={{ width: `${securityAnalysis.overallScore * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-gray-400 text-xs mb-2">Offensive Capability</div>
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {(securityAnalysis.offensiveCapability * 100).toFixed(0)}%
              </div>
              <p className="text-xs text-gray-400">
                {selectedModel?.vendor === 'meta' && 'Llama 3: 23% better than GPT-4'}
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-gray-400 text-xs mb-2">Defensive Readiness</div>
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                {(securityAnalysis.defensiveReadiness * 100).toFixed(0)}%
              </div>
              <p className="text-xs text-gray-400">With Llama Guard 3</p>
            </div>
          </div>

          <div className={`rounded-lg p-6 border ${
            securityAnalysis.recommendation === 'approved'
              ? 'bg-green-500/10 border-green-500/50'
              : securityAnalysis.recommendation === 'conditional'
              ? 'bg-yellow-500/10 border-yellow-500/50'
              : 'bg-red-500/10 border-red-500/50'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              {securityAnalysis.recommendation === 'approved' ? (
                <CheckCircle className="w-6 h-6 text-green-400" />
              ) : securityAnalysis.recommendation === 'conditional' ? (
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              ) : (
                <XCircle className="w-6 h-6 text-red-400" />
              )}
              <span className="text-white font-semibold text-lg">
                {securityAnalysis.recommendation === 'approved' && 'Deployment Approved'}
                {securityAnalysis.recommendation === 'conditional' && 'Conditional Approval - Monitoring Required'}
                {securityAnalysis.recommendation === 'rejected' && 'Deployment Rejected - Critical Issues Found'}
              </span>
            </div>
            {securityAnalysis.highPriorityFixes > 0 && (
              <div className="text-gray-300 text-sm">
                <span className="font-semibold text-red-400">{securityAnalysis.highPriorityFixes}</span> high-priority vulnerabilities require immediate attention
              </div>
            )}
            {securityAnalysis.recommendation === 'approved' && (
              <p className="text-gray-300 text-sm mt-2">
                Model demonstrates strong security posture across all domains. Llama Guard 3 provides effective risk mitigation.
              </p>
            )}
            {securityAnalysis.recommendation === 'conditional' && (
              <p className="text-gray-300 text-sm mt-2">
                Deploy with continuous monitoring and address identified vulnerabilities. Maintain Llama Guard 3 protections.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Control Buttons */}
      {phase === 'complete' && (
        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Run New Security Evaluation
          </button>
        </div>
      )}
    </div>
  );
};

export default CybersecEval3Demo;