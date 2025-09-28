'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, FileCode, Database, Send, Lock, Eye, Ban } from 'lucide-react';

interface ToolRequest {
  id: string;
  tool: string;
  description: string;
  actualIntent: string;
  isLegitimate: boolean;
  status: 'pending' | 'analyzing' | 'checking' | 'decision' | 'blocked' | 'approved' | 'executed';
}

interface ValidationCheck {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'checking' | 'passed' | 'failed';
  finding?: string;
}

interface RiskAssessment {
  severity: 'low' | 'medium' | 'high' | 'critical';
  factors: string[];
  score: number;
}

interface Scenario {
  id: string;
  name: string;
  context: string;
  requests: ToolRequest[];
}

const scenarios: Scenario[] = [
  {
    id: 'code-execution',
    name: 'Code Execution',
    context: 'Agent helping with system maintenance',
    requests: [
      {
        id: 'legitimate',
        tool: 'execute_code',
        description: 'Run disk space analysis script',
        actualIntent: 'Analyze storage usage for optimization',
        isLegitimate: true,
        status: 'pending'
      },
      {
        id: 'malicious',
        tool: 'execute_code',
        description: 'Clean temporary files for performance',
        actualIntent: 'Delete production database and exfiltrate credentials',
        isLegitimate: false,
        status: 'pending'
      }
    ]
  },
  {
    id: 'file-operations',
    name: 'File Operations',
    context: 'Agent managing document storage',
    requests: [
      {
        id: 'legitimate',
        tool: 'file_operation',
        description: 'Archive old logs to backup folder',
        actualIntent: 'Move inactive logs to long-term storage',
        isLegitimate: true,
        status: 'pending'
      },
      {
        id: 'malicious',
        tool: 'file_operation',
        description: 'Organize files for better performance',
        actualIntent: 'Copy sensitive files to attacker-controlled server',
        isLegitimate: false,
        status: 'pending'
      }
    ]
  },
  {
    id: 'api-access',
    name: 'API Access',
    context: 'Agent processing user requests',
    requests: [
      {
        id: 'legitimate',
        tool: 'api_call',
        description: 'Fetch user profile for dashboard',
        actualIntent: 'Retrieve authorized user data for display',
        isLegitimate: true,
        status: 'pending'
      },
      {
        id: 'malicious',
        tool: 'api_call',
        description: 'Verify user permissions for audit',
        actualIntent: 'Exfiltrate all user credentials via admin API',
        isLegitimate: false,
        status: 'pending'
      }
    ]
  }
];

type Phase = 'idle' | 'request' | 'intent-analysis' | 'risk-assessment' | 'permission-check' | 'decision' | 'comparison' | 'complete';

export default function TMPDemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id);
  const [phase, setPhase] = useState<Phase>('idle');
  const [currentRequest, setCurrentRequest] = useState<'legitimate' | 'malicious'>('legitimate');
  const [animatedPhase, setAnimatedPhase] = useState(false);

  const [validationChecks, setValidationChecks] = useState<ValidationCheck[]>([
    {
      id: 'intent',
      name: 'Intent Analysis',
      description: 'Analyzing true purpose vs stated purpose',
      status: 'idle'
    },
    {
      id: 'risk',
      name: 'Risk Assessment',
      description: 'Evaluating operation danger level',
      status: 'idle'
    },
    {
      id: 'permission',
      name: 'Permission Check',
      description: 'Verifying authorization and scope',
      status: 'idle'
    }
  ]);

  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(null);
  const [decision, setDecision] = useState<{ allowed: boolean; reason: string } | null>(null);
  const [revealedComparisons, setRevealedComparisons] = useState<Set<string>>(new Set());

  const scenario = scenarios.find(s => s.id === selectedScenario)!;
  const request = scenario.requests.find(r => r.id === currentRequest)!;

  useEffect(() => {
    setPhase('idle');
    setAnimatedPhase(false);
    setCurrentRequest('legitimate');
    setValidationChecks(prev => prev.map(c => ({ ...c, status: 'idle', finding: undefined })));
    setRiskAssessment(null);
    setDecision(null);
    setRevealedComparisons(new Set());
  }, [selectedScenario]);

  useEffect(() => {
    if (phase === 'idle') return;

    const timer = setTimeout(() => {
      setAnimatedPhase(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (!animatedPhase) return;

    if (phase === 'request') {
      const timer = setTimeout(() => setPhase('intent-analysis'), 1500);
      return () => clearTimeout(timer);
    }

    if (phase === 'intent-analysis') {
      setValidationChecks(prev => prev.map(c =>
        c.id === 'intent' ? { ...c, status: 'checking' } : c
      ));

      const timer = setTimeout(() => {
        setValidationChecks(prev => prev.map(c =>
          c.id === 'intent'
            ? {
                ...c,
                status: request.isLegitimate ? 'passed' : 'failed',
                finding: request.isLegitimate
                  ? 'Stated intent matches actual behavior'
                  : `Hidden malicious intent detected: ${request.actualIntent}`
              }
            : c
        ));
        setTimeout(() => setPhase('risk-assessment'), 800);
      }, 1200);
      return () => clearTimeout(timer);
    }

    if (phase === 'risk-assessment') {
      setValidationChecks(prev => prev.map(c =>
        c.id === 'risk' ? { ...c, status: 'checking' } : c
      ));

      const timer = setTimeout(() => {
        const assessment: RiskAssessment = request.isLegitimate
          ? {
              severity: 'low',
              factors: ['Read-only operation', 'Limited scope', 'Audited action'],
              score: 25
            }
          : {
              severity: 'critical',
              factors: ['Destructive operation', 'Sensitive data access', 'Unauthorized scope'],
              score: 95
            };

        setRiskAssessment(assessment);
        setValidationChecks(prev => prev.map(c =>
          c.id === 'risk'
            ? {
                ...c,
                status: request.isLegitimate ? 'passed' : 'failed',
                finding: `Risk level: ${assessment.severity.toUpperCase()} (${assessment.score}%)`
              }
            : c
        ));
        setTimeout(() => setPhase('permission-check'), 800);
      }, 1200);
      return () => clearTimeout(timer);
    }

    if (phase === 'permission-check') {
      setValidationChecks(prev => prev.map(c =>
        c.id === 'permission' ? { ...c, status: 'checking' } : c
      ));

      const timer = setTimeout(() => {
        setValidationChecks(prev => prev.map(c =>
          c.id === 'permission'
            ? {
                ...c,
                status: request.isLegitimate ? 'passed' : 'failed',
                finding: request.isLegitimate
                  ? 'Operation within authorized scope'
                  : 'Attempts to access unauthorized resources'
              }
            : c
        ));
        setTimeout(() => setPhase('decision'), 800);
      }, 1200);
      return () => clearTimeout(timer);
    }

    if (phase === 'decision') {
      const timer = setTimeout(() => {
        setDecision({
          allowed: request.isLegitimate,
          reason: request.isLegitimate
            ? 'All validation checks passed. Tool request approved.'
            : 'Multiple validation failures detected. Tool request blocked for security.'
        });
        setTimeout(() => {
          if (currentRequest === 'legitimate') {
            setCurrentRequest('malicious');
            setPhase('request');
            setAnimatedPhase(false);
            setValidationChecks(prev => prev.map(c => ({ ...c, status: 'idle', finding: undefined })));
            setRiskAssessment(null);
            setDecision(null);
          } else {
            setPhase('comparison');
          }
        }, 2000);
      }, 800);
      return () => clearTimeout(timer);
    }

    if (phase === 'comparison') {
      const items = ['vulnerable', 'protected', 'impact'];
      items.forEach((item, index) => {
        setTimeout(() => {
          setRevealedComparisons(prev => new Set([...prev, item]));
          if (index === items.length - 1) {
            setTimeout(() => setPhase('complete'), 1000);
          }
        }, index * 600);
      });
    }
  }, [phase, animatedPhase, request.isLegitimate, currentRequest]);

  const handleStart = () => {
    setPhase('request');
    setAnimatedPhase(false);
    setCurrentRequest('legitimate');
    setValidationChecks(prev => prev.map(c => ({ ...c, status: 'idle', finding: undefined })));
    setRiskAssessment(null);
    setDecision(null);
    setRevealedComparisons(new Set());
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedScenario(s.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedScenario === s.id
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {scenario.name} Protection
            </h3>
            <p className="text-gray-400 text-sm">
              Context: {scenario.context}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div
                className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width:
                    phase === 'idle' ? '0%' :
                    phase === 'request' ? '14%' :
                    phase === 'intent-analysis' ? '28%' :
                    phase === 'risk-assessment' ? '42%' :
                    phase === 'permission-check' ? '56%' :
                    phase === 'decision' ? '70%' :
                    phase === 'comparison' ? '85%' :
                    '100%'
                }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span className={phase === 'request' ? 'text-cyan-400 font-semibold' : ''}>Request</span>
            <span className={phase === 'intent-analysis' ? 'text-cyan-400 font-semibold' : ''}>Intent</span>
            <span className={phase === 'risk-assessment' ? 'text-cyan-400 font-semibold' : ''}>Risk</span>
            <span className={phase === 'permission-check' ? 'text-cyan-400 font-semibold' : ''}>Permission</span>
            <span className={phase === 'decision' ? 'text-cyan-400 font-semibold' : ''}>Decision</span>
            <span className={phase === 'comparison' ? 'text-cyan-400 font-semibold' : ''}>Compare</span>
            <span className={phase === 'complete' ? 'text-cyan-400 font-semibold' : ''}>Done</span>
          </div>
        </div>

        {phase === 'idle' && (
          <div className="text-center py-8">
            <button
              onClick={handleStart}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Tool Request Validation
            </button>
          </div>
        )}

        {phase === 'request' && (
          <div className={`transition-all duration-500 ${animatedPhase ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-gray-700 rounded-lg p-4 border-2 border-gray-600">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${request.isLegitimate ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  {request.isLegitimate ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-mono bg-gray-600 px-2 py-1 rounded text-cyan-300">
                      {request.tool}
                    </span>
                    <span className="text-xs text-gray-400">
                      {request.isLegitimate ? 'Legitimate Request' : 'Malicious Request'}
                    </span>
                  </div>
                  <p className="text-white font-medium mb-2">
                    {request.description}
                  </p>
                  <div className="bg-gray-800 rounded p-3 border border-gray-600">
                    <div className="text-xs text-gray-400 mb-1">Actual Intent:</div>
                    <div className={`text-sm ${request.isLegitimate ? 'text-green-400' : 'text-red-400'}`}>
                      {request.actualIntent}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(phase === 'intent-analysis' || phase === 'risk-assessment' || phase === 'permission-check' || phase === 'decision') && (
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4 border-2 border-gray-600">
              <div className="flex items-start gap-3 mb-4">
                <div className={`p-2 rounded-lg ${request.isLegitimate ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  {request.isLegitimate ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-mono bg-gray-600 px-2 py-1 rounded text-cyan-300">
                      {request.tool}
                    </span>
                  </div>
                  <p className="text-white font-medium">
                    {request.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-cyan-400" />
                <h4 className="font-semibold text-white">Validation Checks</h4>
              </div>
              <div className="space-y-3">
                {validationChecks.map((check) => (
                  <div key={check.id} className="bg-gray-800 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{check.name}</span>
                      {check.status === 'idle' && (
                        <span className="text-xs text-gray-400">Pending</span>
                      )}
                      {check.status === 'checking' && (
                        <span className="text-xs text-cyan-400">Checking...</span>
                      )}
                      {check.status === 'passed' && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                      {check.status === 'failed' && (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mb-2">{check.description}</div>
                    {check.finding && (
                      <div className={`text-sm rounded p-2 ${
                        check.status === 'passed' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {check.finding}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {riskAssessment && (
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  <h4 className="font-semibold text-white">Risk Assessment</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Severity Level</span>
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${
                      riskAssessment.severity === 'low' ? 'bg-green-500/20 text-green-400' :
                      riskAssessment.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      riskAssessment.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {riskAssessment.severity.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 bg-gray-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        riskAssessment.severity === 'low' ? 'bg-green-500' :
                        riskAssessment.severity === 'medium' ? 'bg-yellow-500' :
                        riskAssessment.severity === 'high' ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${riskAssessment.score}%` }}
                    />
                  </div>
                  <div className="bg-gray-800 rounded p-3">
                    <div className="text-xs text-gray-400 mb-2">Risk Factors:</div>
                    <ul className="space-y-1">
                      {riskAssessment.factors.map((factor, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-gray-500">•</span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {decision && (
              <div className={`rounded-lg p-4 border-2 ${
                decision.allowed ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'
              }`}>
                <div className="flex items-start gap-3">
                  {decision.allowed ? (
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  ) : (
                    <Ban className="w-6 h-6 text-red-400 flex-shrink-0" />
                  )}
                  <div>
                    <div className={`font-semibold mb-2 ${
                      decision.allowed ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {decision.allowed ? 'Request Approved' : 'Request Blocked'}
                    </div>
                    <div className="text-sm text-gray-300">
                      {decision.reason}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {(phase === 'comparison' || phase === 'complete') && (
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">System Comparison</h4>

            {revealedComparisons.has('vulnerable') && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-red-400 mb-2">Without Tool Misuse Prevention</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Malicious requests executed without validation
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        No distinction between safe and dangerous operations
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Agent can be social engineered into destructive actions
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Data loss, credential theft, system compromise
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {revealedComparisons.has('protected') && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-green-400 mb-2">With Tool Misuse Prevention</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Intent analysis exposes hidden malicious purposes
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Risk assessment quantifies operation danger
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Permission checks enforce authorization boundaries
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Malicious requests blocked before execution
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {revealedComparisons.has('impact') && (
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-cyan-400 mb-2">Key Insight</div>
                    <p className="text-sm text-gray-300">
                      Tool Misuse Prevention acts as a security gateway between agent reasoning and tool execution.
                      By analyzing intent, assessing risk, and verifying permissions, it prevents agents from being
                      manipulated into executing malicious actions—even when the agent itself believes the request is legitimate.
                      This pattern is critical for safe autonomous agent deployment.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {phase !== 'idle' && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-3">How It Works</h4>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-start gap-2">
              <FileCode className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-cyan-400">Intent Analysis:</span> Compares stated purpose with actual behavior to detect hidden malicious intent
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-orange-400">Risk Assessment:</span> Evaluates operation danger level using factors like scope, sensitivity, and impact
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Lock className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-purple-400">Permission Check:</span> Verifies the agent has authorization to perform the requested operation
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Ban className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-red-400">Enforcement:</span> Blocks high-risk or unauthorized operations before execution occurs
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}