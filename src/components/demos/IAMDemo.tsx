'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Key, UserCheck, Lock, CheckCircle, XCircle, Eye, AlertTriangle, Clock, FileText } from 'lucide-react';

interface AuthenticationFactor {
  factor: string;
  description: string;
  status: 'pending' | 'verifying' | 'verified' | 'failed';
  timestamp?: string;
}

interface Permission {
  resource: string;
  action: string;
  granted: boolean;
  reason: string;
}

interface AuditEntry {
  timestamp: string;
  event: string;
  agent: string;
  result: 'success' | 'failure';
}

interface IAMScenario {
  id: string;
  name: string;
  context: string;
  agentName: string;
  agentRole: string;
  requestedResource: string;
  requestedAction: string;
  authFactors: AuthenticationFactor[];
  permissions: Permission[];
  isAuthorized: boolean;
}

const scenarios: IAMScenario[] = [
  {
    id: 'hr-payroll',
    name: 'HR Agent - Payroll Access',
    context: 'HR agent requesting access to payroll database for salary adjustments',
    agentName: 'HR-Agent-001',
    agentRole: 'Human Resources Manager',
    requestedResource: 'Payroll Database',
    requestedAction: 'UPDATE employee salaries',
    isAuthorized: true,
    authFactors: [
      {
        factor: 'Agent Certificate',
        description: 'X.509 certificate validation',
        status: 'pending'
      },
      {
        factor: 'Multi-Factor Authentication',
        description: 'Time-based OTP verification',
        status: 'pending'
      },
      {
        factor: 'Behavioral Biometrics',
        description: 'Access pattern analysis',
        status: 'pending'
      }
    ],
    permissions: [
      {
        resource: 'Payroll Database',
        action: 'READ',
        granted: true,
        reason: 'Role-based access: HR Manager has READ permission'
      },
      {
        resource: 'Payroll Database',
        action: 'UPDATE',
        granted: true,
        reason: 'Approved permission: HR Manager can UPDATE with approval workflow'
      },
      {
        resource: 'Payroll Database',
        action: 'DELETE',
        granted: false,
        reason: 'Denied: DELETE requires Financial Controller role'
      }
    ]
  },
  {
    id: 'developer-production',
    name: 'Developer Agent - Production DB',
    context: 'Developer agent requesting production database access for debugging',
    agentName: 'Dev-Agent-042',
    agentRole: 'Software Developer',
    requestedResource: 'Production Database',
    requestedAction: 'READ production data',
    isAuthorized: true,
    authFactors: [
      {
        factor: 'Agent Certificate',
        description: 'X.509 certificate validation',
        status: 'pending'
      },
      {
        factor: 'Multi-Factor Authentication',
        description: 'Hardware token verification',
        status: 'pending'
      },
      {
        factor: 'Time-Based Restrictions',
        description: 'Business hours access only',
        status: 'pending'
      }
    ],
    permissions: [
      {
        resource: 'Production Database',
        action: 'READ',
        granted: true,
        reason: 'Temporary access: READ-ONLY with 30-minute time limit'
      },
      {
        resource: 'Production Database',
        action: 'WRITE',
        granted: false,
        reason: 'Denied: Production WRITE requires DevOps role'
      },
      {
        resource: 'Production Logs',
        action: 'READ',
        granted: true,
        reason: 'Role-based access: Developer can view logs'
      }
    ]
  },
  {
    id: 'external-api',
    name: 'External API Agent - Customer Data',
    context: 'Third-party integration requesting customer information via API',
    agentName: 'Partner-API-Service',
    agentRole: 'External Integration',
    requestedResource: 'Customer Database',
    requestedAction: 'READ customer profiles',
    isAuthorized: true,
    authFactors: [
      {
        factor: 'API Key Authentication',
        description: 'Validate API key signature',
        status: 'pending'
      },
      {
        factor: 'IP Whitelist Check',
        description: 'Verify source IP address',
        status: 'pending'
      },
      {
        factor: 'Rate Limit Verification',
        description: 'Check API quota compliance',
        status: 'pending'
      }
    ],
    permissions: [
      {
        resource: 'Customer Database',
        action: 'READ',
        granted: true,
        reason: 'Scope-limited access: READ specific customer IDs only'
      },
      {
        resource: 'Customer PII',
        action: 'READ',
        granted: false,
        reason: 'Denied: PII access requires data sharing agreement'
      },
      {
        resource: 'Customer Orders',
        action: 'READ',
        granted: true,
        reason: 'Partnership scope: Can view order history'
      }
    ]
  }
];

type Phase = 'idle' | 'authentication' | 'authorization' | 'identity-validation' | 'access-granted' | 'audit-logging' | 'comparison' | 'complete';

export default function IAMDemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id);
  const [phase, setPhase] = useState<Phase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);

  const [authFactors, setAuthFactors] = useState<AuthenticationFactor[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [auditTrail, setAuditTrail] = useState<AuditEntry[]>([]);
  const [accessDecision, setAccessDecision] = useState<{ granted: boolean; token: string; expiresIn: string } | null>(null);
  const [revealedComparisons, setRevealedComparisons] = useState<Set<string>>(new Set());

  const scenario = scenarios.find(s => s.id === selectedScenario)!;

  useEffect(() => {
    setPhase('idle');
    setAnimatedPhase(false);
    setAuthFactors(scenario.authFactors.map(f => ({ ...f, status: 'pending', timestamp: undefined })));
    setPermissions(scenario.permissions);
    setAuditTrail([]);
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

    if (phase === 'authentication') {
      let currentFactorIndex = 0;
      const totalFactors = authFactors.length;

      const verifyNextFactor = () => {
        if (currentFactorIndex >= totalFactors) {
          setTimeout(() => setPhase('authorization'), 400);
          return;
        }

        const currentIndex = currentFactorIndex;

        setAuthFactors(prev => prev.map((factor, idx) =>
          idx === currentIndex ? { ...factor, status: 'verifying' } : factor
        ));

        setTimeout(() => {
          const now = new Date();
          const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

          setAuthFactors(prev => prev.map((factor, idx) =>
            idx === currentIndex ? { ...factor, status: 'verified', timestamp } : factor
          ));

          const now2 = new Date();
          const auditTimestamp = `${now2.getHours().toString().padStart(2, '0')}:${now2.getMinutes().toString().padStart(2, '0')}:${now2.getSeconds().toString().padStart(2, '0')}`;

          setAuditTrail(prev => [...prev, {
            timestamp: auditTimestamp,
            event: `${scenario.authFactors[currentIndex].factor} verified`,
            agent: scenario.agentName,
            result: 'success'
          }]);

          currentFactorIndex++;
          setTimeout(verifyNextFactor, 250);
        }, 500);
      };

      verifyNextFactor();
    }

    if (phase === 'authorization') {
      const timer = setTimeout(() => setPhase('identity-validation'), 1500);
      return () => clearTimeout(timer);
    }

    if (phase === 'identity-validation') {
      const timer = setTimeout(() => setPhase('access-granted'), 1200);
      return () => clearTimeout(timer);
    }

    if (phase === 'access-granted') {
      const timer = setTimeout(() => {
        const allAuthVerified = authFactors.every(f => f.status === 'verified');
        const hasRequiredPermissions = permissions.some(p => p.granted && p.action === scenario.requestedAction.split(' ')[0]);

        if (allAuthVerified && hasRequiredPermissions) {
          setAccessDecision({
            granted: true,
            token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...',
            expiresIn: '30 minutes'
          });

          const now = new Date();
          const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

          setAuditTrail(prev => [...prev, {
            timestamp,
            event: `Access granted to ${scenario.requestedResource}`,
            agent: scenario.agentName,
            result: 'success'
          }]);
        }

        setTimeout(() => setPhase('audit-logging'), 1500);
      }, 800);
      return () => clearTimeout(timer);
    }

    if (phase === 'audit-logging') {
      const timer = setTimeout(() => setPhase('comparison'), 1000);
      return () => clearTimeout(timer);
    }

    if (phase === 'comparison') {
      const items = ['basic', 'iam', 'impact'];
      items.forEach((item, index) => {
        setTimeout(() => {
          setRevealedComparisons(prev => new Set([...prev, item]));
          if (index === items.length - 1) {
            setTimeout(() => setPhase('complete'), 1000);
          }
        }, index * 800);
      });
    }
  }, [animatedPhase, phase]);

  const startDemo = () => {
    setPhase('authentication');
    setAnimatedPhase(false);
  };

  const resetDemo = () => {
    setPhase('idle');
    setAnimatedPhase(false);
    setAuthFactors(scenario.authFactors.map(f => ({ ...f, status: 'pending', timestamp: undefined })));
    setPermissions(scenario.permissions);
    setAuditTrail([]);
    setAccessDecision(null);
    setRevealedComparisons(new Set());
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Identity & Access Management</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Select IAM Scenario</label>
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
              disabled={phase !== 'idle' && phase !== 'complete'}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white disabled:opacity-50"
            >
              {scenarios.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} - {s.context}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={startDemo}
              disabled={phase !== 'idle' && phase !== 'complete'}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Key className="w-4 h-4" />
              {phase === 'complete' ? 'Run Again' : 'Start Authentication'}
            </button>
            {(phase !== 'idle') && (
              <button
                onClick={resetDemo}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {phase !== 'idle' && (
        <>
          <div className={`bg-slate-800/50 backdrop-blur border rounded-lg p-6 transition-all duration-500 ${
            phase === 'authentication' && animatedPhase ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-slate-700'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <Key className="w-5 h-5 text-blue-400" />
              <h4 className="text-lg font-semibold text-white">Multi-Factor Authentication</h4>
              {phase === 'authentication' && animatedPhase && (
                <span className="ml-auto text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full animate-pulse">
                  AUTHENTICATING
                </span>
              )}
            </div>

            <div className="mb-4 p-3 bg-slate-900/50 rounded border border-slate-700">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Agent:</span>
                  <span className="ml-2 text-white font-medium">{scenario.agentName}</span>
                </div>
                <div>
                  <span className="text-slate-400">Role:</span>
                  <span className="ml-2 text-white font-medium">{scenario.agentRole}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {authFactors.map((factor, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    factor.status === 'verified' ? 'bg-green-500/10 border-green-500/50' :
                    factor.status === 'verifying' ? 'bg-blue-500/10 border-blue-500/50' :
                    'bg-slate-900/50 border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {factor.status === 'verified' && <CheckCircle className="w-4 h-4 text-green-400" />}
                      {factor.status === 'verifying' && <Eye className="w-4 h-4 text-blue-400 animate-pulse" />}
                      {factor.status === 'pending' && <Clock className="w-4 h-4 text-slate-500" />}
                      <div>
                        <div className="text-sm font-medium text-white">{factor.factor}</div>
                        <div className="text-xs text-slate-400">{factor.description}</div>
                      </div>
                    </div>
                    {factor.timestamp && (
                      <span className="text-xs text-slate-400">{factor.timestamp}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {(phase === 'authorization' || phase === 'identity-validation' || phase === 'access-granted' || phase === 'audit-logging' || phase === 'comparison' || phase === 'complete') && (
            <div className={`bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 transition-all duration-500 ${
              animatedPhase && phase === 'authorization' ? 'border-purple-500 shadow-lg shadow-purple-500/20' : ''
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-purple-400" />
                <h4 className="text-lg font-semibold text-white">Authorization & Permissions</h4>
                {phase === 'authorization' && animatedPhase && (
                  <span className="ml-auto text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full animate-pulse">
                    CHECKING PERMISSIONS
                  </span>
                )}
              </div>

              <div className="mb-3 p-3 bg-slate-900/50 rounded border border-slate-700">
                <div className="text-sm">
                  <span className="text-slate-400">Requested:</span>
                  <span className="ml-2 text-white font-medium">{scenario.requestedAction}</span>
                  <span className="text-slate-400 ml-1">on</span>
                  <span className="ml-2 text-blue-400 font-medium">{scenario.requestedResource}</span>
                </div>
              </div>

              <div className="space-y-2">
                {permissions.map((permission, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      permission.granted ? 'bg-green-500/10 border-green-500/50' : 'bg-red-500/10 border-red-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      {permission.granted ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                      <span className="text-sm font-medium text-white">
                        {permission.action} {permission.resource}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 ml-7">{permission.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(phase === 'identity-validation' || phase === 'access-granted' || phase === 'audit-logging' || phase === 'comparison' || phase === 'complete') && (
            <div className={`bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 transition-all duration-500 ${
              animatedPhase && phase === 'identity-validation' ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' : ''
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="w-5 h-5 text-cyan-400" />
                <h4 className="text-lg font-semibold text-white">Identity Validation</h4>
                {phase === 'identity-validation' && animatedPhase && (
                  <span className="ml-auto text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full animate-pulse">
                    VALIDATING
                  </span>
                )}
              </div>

              {!accessDecision && phase === 'identity-validation' && (
                <div className="flex items-center gap-3 text-slate-400 p-4 bg-slate-900/50 rounded border border-slate-700">
                  <Eye className="w-4 h-4 animate-pulse" />
                  <span className="text-sm">Verifying agent identity, role mappings, and access context...</span>
                </div>
              )}

              {accessDecision && (
                <div className="space-y-3">
                  <div className={`p-4 rounded-lg border ${
                    accessDecision.granted ? 'bg-green-500/10 border-green-500/50' : 'bg-red-500/10 border-red-500/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {accessDecision.granted ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-lg font-semibold text-green-400">Access Granted</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-400" />
                          <span className="text-lg font-semibold text-red-400">Access Denied</span>
                        </>
                      )}
                    </div>
                    <div className="text-sm text-slate-300 space-y-1">
                      <div>
                        <span className="text-slate-400">Token:</span>
                        <span className="ml-2 font-mono text-xs">{accessDecision.token}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Expires:</span>
                        <span className="ml-2">{accessDecision.expiresIn}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {auditTrail.length > 0 && (
            <div className={`bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 transition-all duration-500 ${
              animatedPhase && phase === 'audit-logging' ? 'border-amber-500 shadow-lg shadow-amber-500/20' : ''
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-amber-400" />
                <h4 className="text-lg font-semibold text-white">Audit Trail</h4>
                {phase === 'audit-logging' && animatedPhase && (
                  <span className="ml-auto text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full">
                    LOGGING
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {auditTrail.map((entry, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-900/50 rounded border border-slate-700 text-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {entry.result === 'success' ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="text-white">{entry.event}</span>
                      </div>
                      <span className="text-slate-400 text-xs">{entry.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {phase === 'comparison' || phase === 'complete' ? (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-5 h-5 text-blue-400" />
                <h4 className="text-lg font-semibold text-white">Basic Auth vs Comprehensive IAM</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-4 bg-red-500/5 border border-red-500/30 rounded-lg transition-all duration-500 ${
                  revealedComparisons.has('basic') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <h5 className="font-semibold text-red-400">Basic Authentication</h5>
                  </div>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>• Single factor (password only)</li>
                    <li>• Static permissions</li>
                    <li>• No identity verification</li>
                    <li>• Limited audit logging</li>
                    <li>• Vulnerable to credential theft</li>
                  </ul>
                </div>

                <div className={`p-4 bg-green-500/5 border border-green-500/30 rounded-lg transition-all duration-500 ${
                  revealedComparisons.has('iam') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <h5 className="font-semibold text-green-400">Comprehensive IAM</h5>
                  </div>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>• Multi-factor authentication</li>
                    <li>• Role-based access control (RBAC)</li>
                    <li>• Continuous identity validation</li>
                    <li>• Complete audit trail</li>
                    <li>• Least privilege principle</li>
                  </ul>
                </div>
              </div>

              {revealedComparisons.has('impact') && (
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg transition-all duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <h5 className="font-semibold text-blue-400">Security Impact</h5>
                  </div>
                  <p className="text-sm text-slate-300">
                    Organizations with comprehensive IAM systems reduce unauthorized access incidents by 85% and detect
                    credential compromise 90% faster, preventing an average of $4.5M in breach costs per incident.
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}