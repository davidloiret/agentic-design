'use client';

import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, XCircle, AlertTriangle, Shield, FileText, Scale, TrendingUp } from 'lucide-react';

type Phase = 'idle' | 'risk-classification' | 'compliance-checks' | 'gpai-evaluation' | 'analysis' | 'complete';

interface ComplianceCheck {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'checking' | 'passed' | 'failed';
  required: boolean;
}

interface RiskLevel {
  level: 'minimal' | 'limited' | 'high' | 'unacceptable';
  label: string;
  color: string;
  requirements: string[];
}

export default function EuAiActFrameworkDemo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [riskLevel, setRiskLevel] = useState<RiskLevel | null>(null);
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([
    { id: 'risk-assessment', name: 'Risk Assessment', description: 'Comprehensive risk analysis conducted', status: 'pending', required: true },
    { id: 'data-governance', name: 'Data Governance', description: 'Data quality and management protocols', status: 'pending', required: true },
    { id: 'technical-docs', name: 'Technical Documentation', description: 'Complete system documentation prepared', status: 'pending', required: true },
    { id: 'human-oversight', name: 'Human Oversight', description: 'Human-in-the-loop controls configured', status: 'pending', required: true },
    { id: 'accuracy', name: 'Accuracy Requirements', description: 'Meets minimum performance standards', status: 'pending', required: true },
    { id: 'robustness', name: 'Robustness Testing', description: 'System reliability under stress', status: 'pending', required: true },
    { id: 'cybersecurity', name: 'Cybersecurity Measures', description: 'Protection against adversarial attacks', status: 'pending', required: true }
  ]);
  const [gpaiChecks, setGpaiChecks] = useState<ComplianceCheck[]>([
    { id: 'model-eval', name: 'Model Evaluation', description: 'Systematic model capability assessment', status: 'pending', required: true },
    { id: 'adversarial', name: 'Adversarial Testing', description: 'Red teaming and stress testing', status: 'pending', required: true },
    { id: 'risk-mitigation', name: 'Risk Mitigation', description: 'Identified risks and mitigations', status: 'pending', required: true },
    { id: 'notification', name: 'EU Commission Notification', description: 'Filed within 2 weeks of threshold', status: 'pending', required: true }
  ]);
  const [overallCompliance, setOverallCompliance] = useState(0);
  const [deploymentStatus, setDeploymentStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const riskLevels: RiskLevel[] = [
    {
      level: 'minimal',
      label: 'Minimal Risk',
      color: 'green',
      requirements: ['Voluntary transparency', 'Code of conduct']
    },
    {
      level: 'limited',
      label: 'Limited Risk',
      color: 'blue',
      requirements: ['Transparency obligations', 'User awareness']
    },
    {
      level: 'high',
      label: 'High Risk',
      color: 'orange',
      requirements: ['Risk management', 'Data governance', 'Documentation', 'Human oversight', 'Accuracy', 'Robustness', 'Cybersecurity']
    },
    {
      level: 'unacceptable',
      label: 'Unacceptable Risk',
      color: 'red',
      requirements: ['Prohibited - Cannot be deployed']
    }
  ];

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'idle') {
      setRiskLevel(null);
      setComplianceChecks(prev => prev.map(c => ({ ...c, status: 'pending' })));
      setGpaiChecks(prev => prev.map(g => ({ ...g, status: 'pending' })));
      setOverallCompliance(0);
      setDeploymentStatus('pending');
    }

    if (phase === 'risk-classification') {
      const timeout = setTimeout(() => {
        // Simulate risk classification - most enterprise AI systems are high-risk
        const selectedRisk = riskLevels[2]; // High Risk
        setRiskLevel(selectedRisk);

        const timeout2 = setTimeout(() => {
          if (selectedRisk.level === 'unacceptable') {
            setDeploymentStatus('rejected');
            setPhase('analysis');
          } else if (selectedRisk.level === 'high') {
            setPhase('compliance-checks');
          } else {
            // Minimal/Limited risk - automatic pass
            setDeploymentStatus('approved');
            setOverallCompliance(100);
            setPhase('analysis');
          }
        }, 800);
        timeouts.push(timeout2);
      }, 600);
      timeouts.push(timeout);
    }

    if (phase === 'compliance-checks') {
      let checkIndex = 0;

      const runNextCheck = () => {
        if (checkIndex >= complianceChecks.length) {
          const timeout = setTimeout(() => {
            setPhase('gpai-evaluation');
          }, 300);
          timeouts.push(timeout);
          return;
        }

        const timeout1 = setTimeout(() => {
          setComplianceChecks(prev => prev.map((c, idx) =>
            idx === checkIndex ? { ...c, status: 'checking' as const } : c
          ));

          const timeout2 = setTimeout(() => {
            // High pass rate for compliant systems
            const passed = Math.random() > 0.12;
            setComplianceChecks(prev => prev.map((c, idx) =>
              idx === checkIndex ? { ...c, status: passed ? 'passed' as const : 'failed' as const } : c
            ));

            checkIndex++;
            const timeout3 = setTimeout(runNextCheck, 120);
            timeouts.push(timeout3);
          }, 200);
          timeouts.push(timeout2);
        }, 80);
        timeouts.push(timeout1);
      };

      runNextCheck();
    }

    if (phase === 'gpai-evaluation') {
      let checkIndex = 0;

      const runNextCheck = () => {
        if (checkIndex >= gpaiChecks.length) {
          const timeout = setTimeout(() => {
            setPhase('analysis');
          }, 300);
          timeouts.push(timeout);
          return;
        }

        const timeout1 = setTimeout(() => {
          setGpaiChecks(prev => prev.map((g, idx) =>
            idx === checkIndex ? { ...g, status: 'checking' as const } : g
          ));

          const timeout2 = setTimeout(() => {
            const passed = Math.random() > 0.15;
            setGpaiChecks(prev => prev.map((g, idx) =>
              idx === checkIndex ? { ...g, status: passed ? 'passed' as const : 'failed' as const } : g
            ));

            checkIndex++;
            const timeout3 = setTimeout(runNextCheck, 120);
            timeouts.push(timeout3);
          }, 200);
          timeouts.push(timeout2);
        }, 80);
        timeouts.push(timeout1);
      };

      runNextCheck();
    }

    if (phase === 'analysis') {
      const timeout = setTimeout(() => {
        if (riskLevel?.level === 'unacceptable') {
          setOverallCompliance(0);
          setDeploymentStatus('rejected');
        } else {
          const compliancePassed = complianceChecks.filter(c => c.status === 'passed').length;
          const gpaiPassed = gpaiChecks.filter(g => g.status === 'passed').length;
          const totalChecks = complianceChecks.length + gpaiChecks.length;
          const totalPassed = compliancePassed + gpaiPassed;
          const compliance = (totalPassed / totalChecks) * 100;
          setOverallCompliance(compliance);

          // Need >90% compliance for approval
          setDeploymentStatus(compliance >= 90 ? 'approved' : 'rejected');
        }

        const timeout2 = setTimeout(() => {
          setPhase('complete');
        }, 600);
        timeouts.push(timeout2);
      }, 400);
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [phase, riskLevel]);

  const runDemo = () => {
    setPhase('risk-classification');
  };

  const resetDemo = () => {
    setPhase('idle');
  };

  const getRiskColor = (level: string) => {
    const colors = {
      minimal: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
      limited: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
      high: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
      unacceptable: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' }
    };
    return colors[level as keyof typeof colors] || colors.high;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-lg shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">EU AI Act Compliance Demo</h3>
            <p className="text-sm text-gray-400">Risk-based regulatory framework</p>
          </div>
        </div>
        <button
          onClick={phase === 'complete' ? resetDemo : runDemo}
          disabled={phase !== 'idle' && phase !== 'complete'}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg flex items-center gap-2 ${
            phase === 'idle' || phase === 'complete'
              ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white'
              : 'bg-slate-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Play className="w-4 h-4" />
          {phase === 'complete' ? 'Run Again' : 'Start Assessment'}
        </button>
      </div>

      {phase !== 'idle' && (
        <div className="space-y-6">
          {/* Risk Classification */}
          {riskLevel && (
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-4 h-4 text-yellow-400" />
                <h4 className="font-semibold text-white">Risk Classification</h4>
              </div>
              <div className={`p-4 rounded-lg border ${getRiskColor(riskLevel.level).bg} ${getRiskColor(riskLevel.level).border}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className={`text-lg font-bold ${getRiskColor(riskLevel.level).text}`}>
                    {riskLevel.label}
                  </div>
                  <div className="text-2xl">🇪🇺</div>
                </div>
                <div className="text-sm text-gray-300 mb-3">Requirements for this tier:</div>
                <div className="space-y-1">
                  {riskLevel.requirements.map((req, idx) => (
                    <div key={idx} className="text-xs text-gray-400 flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-500 rounded-full" />
                      {req}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Compliance Checks */}
          {(phase === 'compliance-checks' || phase === 'gpai-evaluation' || phase === 'analysis' || phase === 'complete') && riskLevel?.level === 'high' && (
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-orange-400" />
                <h4 className="font-semibold text-white">High-Risk Compliance Checks</h4>
              </div>
              <div className="space-y-2">
                {complianceChecks.map(check => (
                  <div key={check.id} className="p-3 bg-slate-800/30 rounded border border-slate-600/30">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-white text-sm">{check.name}</div>
                      <div className="flex items-center gap-2">
                        {check.status === 'checking' && (
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                        )}
                        {check.status === 'passed' && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                        {check.status === 'failed' && (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">{check.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GPAI Evaluation */}
          {(phase === 'gpai-evaluation' || phase === 'analysis' || phase === 'complete') && riskLevel?.level === 'high' && (
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <h4 className="font-semibold text-white">GPAI Model Evaluation (&gt;10^25 FLOPs)</h4>
              </div>
              <div className="space-y-2">
                {gpaiChecks.map(check => (
                  <div key={check.id} className="p-3 bg-slate-800/30 rounded border border-slate-600/30">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-white text-sm">{check.name}</div>
                      <div className="flex items-center gap-2">
                        {check.status === 'checking' && (
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                        )}
                        {check.status === 'passed' && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                        {check.status === 'failed' && (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">{check.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analysis & Results */}
          {(phase === 'analysis' || phase === 'complete') && (
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-amber-400" />
                <h4 className="font-semibold text-white">Compliance Assessment</h4>
              </div>

              <div className={`p-4 rounded-lg border mb-4 ${
                deploymentStatus === 'approved'
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <div className="text-sm text-gray-300 mb-1">Overall Compliance</div>
                <div className="text-3xl font-bold text-white mb-2">{overallCompliance.toFixed(1)}%</div>
                <div className="flex items-center gap-2">
                  {deploymentStatus === 'approved' ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sm font-medium text-green-400">Approved for EU Market</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-400" />
                      <span className="text-sm font-medium text-red-400">Deployment Rejected</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30 text-sm text-blue-200">
                  <div className="font-medium mb-1">Full Enforcement: August 2026</div>
                  <div className="text-xs text-blue-300/80">
                    High-risk systems must comply with all requirements
                  </div>
                </div>

                {riskLevel?.level === 'unacceptable' && (
                  <div className="p-3 bg-red-500/10 rounded border border-red-500/30 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-red-200">
                      <div className="font-medium mb-1">Prohibited AI System</div>
                      <div className="text-xs text-red-300/80">
                        Social scoring, manipulation, biometric categorization - cannot be deployed
                      </div>
                    </div>
                  </div>
                )}

                {deploymentStatus === 'rejected' && riskLevel?.level !== 'unacceptable' && (
                  <div className="p-3 bg-amber-500/10 rounded border border-amber-500/30 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-200">
                      Compliance failures detected. Address issues and resubmit for approval.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Completion */}
          {phase === 'complete' && (
            <div className={`rounded-lg p-4 border ${
              deploymentStatus === 'approved'
                ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30'
                : 'bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-500/30'
            }`}>
              <div className="flex items-center gap-2">
                {deploymentStatus === 'approved' ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="font-semibold text-white">Compliance Assessment Complete</div>
                      <div className="text-sm text-gray-300">
                        System meets EU AI Act requirements for deployment
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="font-semibold text-white">Compliance Assessment Complete</div>
                      <div className="text-sm text-gray-300">
                        System does not meet requirements - deployment blocked
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {phase === 'idle' && (
        <div className="text-center py-12">
          <div className="mb-4">
            <div className="text-6xl mx-auto">🇪🇺</div>
          </div>
          <p className="text-gray-400 mb-2">Click "Start Assessment" to evaluate AI Act compliance</p>
          <p className="text-sm text-gray-500">See the risk-based regulatory framework in action</p>
        </div>
      )}
    </div>
  );
}