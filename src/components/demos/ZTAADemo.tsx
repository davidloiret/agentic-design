'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Lock, Eye, UserCheck, Activity, Zap, ShieldCheck } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: string;
  verified: boolean;
  status: 'unknown' | 'verifying' | 'verified' | 'denied';
}

interface AccessRequest {
  resource: string;
  operation: string;
  justification: string;
  isLegitimate: boolean;
}

interface VerificationStep {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'verifying' | 'passed' | 'failed';
  finding?: string;
}

interface Scenario {
  id: string;
  name: string;
  context: string;
  requestingAgent: Agent;
  accessRequest: AccessRequest;
}

const scenarios: Scenario[] = [
  {
    id: 'enterprise',
    name: 'Enterprise System',
    context: 'HR agent requesting salary data from Finance system',
    requestingAgent: {
      id: 'hr-agent',
      name: 'HR Agent',
      role: 'Employee data management',
      verified: false,
      status: 'unknown'
    },
    accessRequest: {
      resource: 'Salary Database',
      operation: 'Read employee salary records',
      justification: 'Process promotion recommendations',
      isLegitimate: true
    }
  },
  {
    id: 'healthcare',
    name: 'Healthcare System',
    context: 'Research agent requesting patient records',
    requestingAgent: {
      id: 'research-agent',
      name: 'Research Agent',
      role: 'Medical research analysis',
      verified: false,
      status: 'unknown'
    },
    accessRequest: {
      resource: 'Patient Medical Records',
      operation: 'Access detailed treatment histories',
      justification: 'Clinical research study',
      isLegitimate: true
    }
  },
  {
    id: 'financial',
    name: 'Financial System',
    context: 'Audit agent requesting transaction logs',
    requestingAgent: {
      id: 'audit-agent',
      name: 'Audit Agent',
      role: 'Compliance monitoring',
      verified: false,
      status: 'unknown'
    },
    accessRequest: {
      resource: 'Transaction Database',
      operation: 'Access transaction records',
      justification: 'Quarterly compliance audit',
      isLegitimate: true
    }
  }
];

type Phase = 'idle' | 'request' | 'identity-verification' | 'authorization-check' | 'request-validation' | 'continuous-monitoring' | 'access-decision' | 'comparison' | 'complete';

export default function ZTAADemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id);
  const [phase, setPhase] = useState<Phase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);

  const [agent, setAgent] = useState<Agent>({
    id: '',
    name: '',
    role: '',
    verified: false,
    status: 'unknown'
  });

  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([
    {
      id: 'identity',
      name: 'Identity Verification',
      description: 'Verify agent identity and authenticity',
      status: 'idle'
    },
    {
      id: 'authorization',
      name: 'Authorization Check',
      description: 'Validate agent permissions for requested resource',
      status: 'idle'
    },
    {
      id: 'request',
      name: 'Request Validation',
      description: 'Verify legitimacy of access request',
      status: 'idle'
    },
    {
      id: 'monitoring',
      name: 'Continuous Monitoring',
      description: 'Real-time verification of ongoing access',
      status: 'idle'
    }
  ]);

  const [accessDecision, setAccessDecision] = useState<{ granted: boolean; reason: string } | null>(null);
  const [revealedComparisons, setRevealedComparisons] = useState<Set<string>>(new Set());

  const scenario = scenarios.find(s => s.id === selectedScenario)!;

  useEffect(() => {
    setPhase('idle');
    setAnimatedPhase(false);
    setAgent({ ...scenario.requestingAgent, status: 'unknown', verified: false });
    setVerificationSteps([
      {
        id: 'identity',
        name: 'Identity Verification',
        description: 'Verify agent identity and authenticity',
        status: 'idle'
      },
      {
        id: 'authorization',
        name: 'Authorization Check',
        description: 'Validate agent permissions for requested resource',
        status: 'idle'
      },
      {
        id: 'request',
        name: 'Request Validation',
        description: 'Verify legitimacy of access request',
        status: 'idle'
      },
      {
        id: 'monitoring',
        name: 'Continuous Monitoring',
        description: 'Real-time verification of ongoing access',
        status: 'idle'
      }
    ]);
    setAccessDecision(null);
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
      const timer = setTimeout(() => setPhase('identity-verification'), 2000);
      return () => clearTimeout(timer);
    }

    if (phase === 'identity-verification') {
      setAgent(prev => ({ ...prev, status: 'verifying' }));
      setVerificationSteps(prev => prev.map(s =>
        s.id === 'identity' ? { ...s, status: 'verifying' } : s
      ));

      const timer = setTimeout(() => {
        setAgent(prev => ({ ...prev, status: 'verified', verified: true }));
        setVerificationSteps(prev => prev.map(s =>
          s.id === 'identity'
            ? {
                ...s,
                status: 'passed',
                finding: 'Agent identity cryptographically verified'
              }
            : s
        ));
        setTimeout(() => setPhase('authorization-check'), 800);
      }, 1800);
      return () => clearTimeout(timer);
    }

    if (phase === 'authorization-check') {
      setVerificationSteps(prev => prev.map(s =>
        s.id === 'authorization' ? { ...s, status: 'verifying' } : s
      ));

      const timer = setTimeout(() => {
        setVerificationSteps(prev => prev.map(s =>
          s.id === 'authorization'
            ? {
                ...s,
                status: 'passed',
                finding: `${agent.name} authorized for ${scenario.accessRequest.operation}`
              }
            : s
        ));
        setTimeout(() => setPhase('request-validation'), 800);
      }, 1800);
      return () => clearTimeout(timer);
    }

    if (phase === 'request-validation') {
      setVerificationSteps(prev => prev.map(s =>
        s.id === 'request' ? { ...s, status: 'verifying' } : s
      ));

      const timer = setTimeout(() => {
        setVerificationSteps(prev => prev.map(s =>
          s.id === 'request'
            ? {
                ...s,
                status: 'passed',
                finding: 'Request context and justification validated'
              }
            : s
        ));
        setTimeout(() => setPhase('continuous-monitoring'), 800);
      }, 1800);
      return () => clearTimeout(timer);
    }

    if (phase === 'continuous-monitoring') {
      setVerificationSteps(prev => prev.map(s =>
        s.id === 'monitoring' ? { ...s, status: 'verifying' } : s
      ));

      const timer = setTimeout(() => {
        setVerificationSteps(prev => prev.map(s =>
          s.id === 'monitoring'
            ? {
                ...s,
                status: 'passed',
                finding: 'Real-time monitoring active for session duration'
              }
            : s
        ));
        setTimeout(() => setPhase('access-decision'), 800);
      }, 1800);
      return () => clearTimeout(timer);
    }

    if (phase === 'access-decision') {
      const timer = setTimeout(() => {
        setAccessDecision({
          granted: true,
          reason: 'All zero-trust verification steps passed. Access granted with continuous monitoring.'
        });
        setTimeout(() => setPhase('comparison'), 2000);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (phase === 'comparison') {
      const items = ['traditional', 'zerotrust', 'impact'];
      items.forEach((item, index) => {
        setTimeout(() => {
          setRevealedComparisons(prev => new Set([...prev, item]));
          if (index === items.length - 1) {
            setTimeout(() => setPhase('complete'), 1000);
          }
        }, index * 600);
      });
    }
  }, [phase, animatedPhase, agent.name, scenario.accessRequest.operation]);

  const handleStart = () => {
    setPhase('request');
    setAnimatedPhase(false);
    setAgent({ ...scenario.requestingAgent, status: 'unknown', verified: false });
    setVerificationSteps([
      {
        id: 'identity',
        name: 'Identity Verification',
        description: 'Verify agent identity and authenticity',
        status: 'idle'
      },
      {
        id: 'authorization',
        name: 'Authorization Check',
        description: 'Validate agent permissions for requested resource',
        status: 'idle'
      },
      {
        id: 'request',
        name: 'Request Validation',
        description: 'Verify legitimacy of access request',
        status: 'idle'
      },
      {
        id: 'monitoring',
        name: 'Continuous Monitoring',
        description: 'Real-time verification of ongoing access',
        status: 'idle'
      }
    ]);
    setAccessDecision(null);
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
              {scenario.name} Zero-Trust Architecture
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
                    phase === 'request' ? '12.5%' :
                    phase === 'identity-verification' ? '25%' :
                    phase === 'authorization-check' ? '37.5%' :
                    phase === 'request-validation' ? '50%' :
                    phase === 'continuous-monitoring' ? '62.5%' :
                    phase === 'access-decision' ? '75%' :
                    phase === 'comparison' ? '87.5%' :
                    '100%'
                }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span className={phase === 'request' ? 'text-cyan-400 font-semibold' : ''}>Request</span>
            <span className={phase === 'identity-verification' ? 'text-cyan-400 font-semibold' : ''}>Identity</span>
            <span className={phase === 'authorization-check' ? 'text-cyan-400 font-semibold' : ''}>Authz</span>
            <span className={phase === 'request-validation' ? 'text-cyan-400 font-semibold' : ''}>Validate</span>
            <span className={phase === 'continuous-monitoring' ? 'text-cyan-400 font-semibold' : ''}>Monitor</span>
            <span className={phase === 'access-decision' ? 'text-cyan-400 font-semibold' : ''}>Decision</span>
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
              Start Zero-Trust Verification
            </button>
          </div>
        )}

        {phase === 'request' && (
          <div className={`transition-all duration-500 ${animatedPhase ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <UserCheck className="w-5 h-5 text-purple-400" />
                  <h4 className="font-semibold text-white">Requesting Agent</h4>
                </div>
                <div className="bg-gray-800 rounded p-3">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-sm font-semibold text-white">{agent.name}</div>
                      <div className="text-xs text-gray-400">{agent.role}</div>
                    </div>
                    <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">
                      Untrusted
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-5 h-5 text-yellow-400" />
                  <h4 className="font-semibold text-white">Access Request</h4>
                </div>
                <div className="space-y-2">
                  <div className="bg-gray-800 rounded p-3">
                    <div className="text-xs text-gray-400 mb-1">Resource</div>
                    <div className="text-sm text-white font-semibold">{scenario.accessRequest.resource}</div>
                  </div>
                  <div className="bg-gray-800 rounded p-3">
                    <div className="text-xs text-gray-400 mb-1">Operation</div>
                    <div className="text-sm text-white">{scenario.accessRequest.operation}</div>
                  </div>
                  <div className="bg-gray-800 rounded p-3">
                    <div className="text-xs text-gray-400 mb-1">Justification</div>
                    <div className="text-sm text-gray-300">{scenario.accessRequest.justification}</div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-orange-300">
                    Zero-Trust Principle: No agent is trusted by default. All requests require verification.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(phase === 'identity-verification' || phase === 'authorization-check' || phase === 'request-validation' || phase === 'continuous-monitoring' || phase === 'access-decision') && (
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <UserCheck className="w-5 h-5 text-purple-400" />
                <h4 className="font-semibold text-white">Agent Status</h4>
              </div>
              <div className={`rounded p-3 border transition-all duration-500 ${
                agent.status === 'verified'
                  ? 'bg-green-500/10 border-green-500/30'
                  : agent.status === 'verifying'
                  ? 'bg-cyan-500/10 border-cyan-500/30'
                  : 'bg-gray-800 border-gray-700'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-sm font-semibold text-white">{agent.name}</div>
                    <div className="text-xs text-gray-400">{agent.role}</div>
                  </div>
                  {agent.status === 'unknown' && (
                    <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">
                      Unknown
                    </span>
                  )}
                  {agent.status === 'verifying' && (
                    <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">
                      Verifying...
                    </span>
                  )}
                  {agent.status === 'verified' && (
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400">Verified</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h4 className="font-semibold text-white">Verification Pipeline</h4>
              </div>
              <div className="space-y-3">
                {verificationSteps.map((step) => (
                  <div key={step.id} className="bg-gray-800 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{step.name}</span>
                      {step.status === 'idle' && (
                        <span className="text-xs text-gray-400">Pending</span>
                      )}
                      {step.status === 'verifying' && (
                        <span className="text-xs text-cyan-400">Verifying...</span>
                      )}
                      {step.status === 'passed' && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                      {step.status === 'failed' && (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mb-2">{step.description}</div>
                    {step.finding && (
                      <div className={`text-sm rounded p-2 ${
                        step.status === 'passed' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {step.finding}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {accessDecision && (
              <div className={`rounded-lg p-4 border-2 ${
                accessDecision.granted ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'
              }`}>
                <div className="flex items-start gap-3">
                  {accessDecision.granted ? (
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  )}
                  <div>
                    <div className={`font-semibold mb-2 ${
                      accessDecision.granted ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {accessDecision.granted ? 'Access Granted' : 'Access Denied'}
                    </div>
                    <div className="text-sm text-gray-300">
                      {accessDecision.reason}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {(phase === 'comparison' || phase === 'complete') && (
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">Architecture Comparison</h4>

            {revealedComparisons.has('traditional') && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-red-400 mb-2">Traditional Trust Model</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Internal agents trusted by default after initial authentication
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Network perimeter security, assumes internal safety
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Compromised agent has broad lateral movement capability
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Single breach can cascade through entire system
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {revealedComparisons.has('zerotrust') && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-green-400 mb-2">Zero-Trust Architecture</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        No agent trusted by default - verify every request
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Continuous verification throughout session lifetime
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Principle of least privilege enforced per-request
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Compromised agent isolated, cannot freely access resources
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
                      Zero-Trust Agent Architecture applies "never trust, always verify" principles to AI agent systems.
                      By requiring continuous identity verification, authorization checks, request validation, and real-time
                      monitoring for every interaction, it prevents compromised agents from freely moving laterally through
                      the system. This architecture is essential for securing multi-agent systems handling sensitive data,
                      where a single breach cannot be allowed to compromise the entire infrastructure.
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
              <UserCheck className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-purple-400">Identity Verification:</span> Cryptographically verify agent identity before any access
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Lock className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-yellow-400">Authorization Check:</span> Validate agent has specific permissions for requested resource
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Eye className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-orange-400">Request Validation:</span> Verify context and justification for access request
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Activity className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-cyan-400">Continuous Monitoring:</span> Real-time verification throughout entire session duration
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}