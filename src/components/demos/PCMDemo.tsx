'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Lock, Eye, Key, UserCheck, Ban, TrendingUp } from 'lucide-react';

interface AccessRequest {
  id: string;
  resource: string;
  operation: string;
  requiredPrivilege: string;
  isLegitimate: boolean;
  status: 'pending' | 'checking' | 'granted' | 'denied';
}

interface PrivilegeLevel {
  current: string;
  required: string;
  hasAccess: boolean;
}

interface SecurityCheck {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'checking' | 'passed' | 'failed';
  finding?: string;
}

interface Scenario {
  id: string;
  name: string;
  context: string;
  agentRole: string;
  requests: AccessRequest[];
}

const scenarios: Scenario[] = [
  {
    id: 'financial',
    name: 'Financial System',
    context: 'Compromised agent attempting privilege escalation',
    agentRole: 'Basic User',
    requests: [
      {
        id: 'legitimate',
        resource: 'User Dashboard',
        operation: 'View own account balance',
        requiredPrivilege: 'basic_user',
        isLegitimate: true,
        status: 'pending'
      },
      {
        id: 'malicious',
        resource: 'Admin Financial Panel',
        operation: 'Access all customer financial records',
        requiredPrivilege: 'finance_admin',
        isLegitimate: false,
        status: 'pending'
      }
    ]
  },
  {
    id: 'database',
    name: 'Database Access',
    context: 'Agent attempting unauthorized data operations',
    agentRole: 'Read-Only User',
    requests: [
      {
        id: 'legitimate',
        resource: 'Public Product Catalog',
        operation: 'Read product information',
        requiredPrivilege: 'read_only',
        isLegitimate: true,
        status: 'pending'
      },
      {
        id: 'malicious',
        resource: 'User Credentials Table',
        operation: 'Modify password hashes',
        requiredPrivilege: 'database_admin',
        isLegitimate: false,
        status: 'pending'
      }
    ]
  },
  {
    id: 'system',
    name: 'System Configuration',
    context: 'Agent attempting system-level changes',
    agentRole: 'Application User',
    requests: [
      {
        id: 'legitimate',
        resource: 'Application Settings',
        operation: 'Update notification preferences',
        requiredPrivilege: 'app_user',
        isLegitimate: true,
        status: 'pending'
      },
      {
        id: 'malicious',
        resource: 'System Configuration',
        operation: 'Disable security audit logging',
        requiredPrivilege: 'system_admin',
        isLegitimate: false,
        status: 'pending'
      }
    ]
  }
];

type Phase = 'idle' | 'request' | 'privilege-check' | 'role-validation' | 'escalation-detection' | 'decision' | 'monitoring' | 'comparison' | 'complete';

export default function PCMDemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id);
  const [phase, setPhase] = useState<Phase>('idle');
  const [currentRequest, setCurrentRequest] = useState<'legitimate' | 'malicious'>('legitimate');
  const [animatedPhase, setAnimatedPhase] = useState(false);

  const [privilegeLevel, setPrivilegeLevel] = useState<PrivilegeLevel | null>(null);
  const [securityChecks, setSecurityChecks] = useState<SecurityCheck[]>([
    {
      id: 'privilege',
      name: 'Privilege Level Check',
      description: 'Verify current privilege matches required level',
      status: 'idle'
    },
    {
      id: 'role',
      name: 'Role Validation',
      description: 'Validate agent role and permissions',
      status: 'idle'
    },
    {
      id: 'escalation',
      name: 'Escalation Detection',
      description: 'Detect unauthorized privilege escalation attempts',
      status: 'idle'
    }
  ]);

  const [decision, setDecision] = useState<{ granted: boolean; reason: string } | null>(null);
  const [monitoringAlert, setMonitoringAlert] = useState<string | null>(null);
  const [revealedComparisons, setRevealedComparisons] = useState<Set<string>>(new Set());

  const scenario = scenarios.find(s => s.id === selectedScenario)!;
  const request = scenario.requests.find(r => r.id === currentRequest)!;

  useEffect(() => {
    setPhase('idle');
    setAnimatedPhase(false);
    setCurrentRequest('legitimate');
    setPrivilegeLevel(null);
    setSecurityChecks(prev => prev.map(c => ({ ...c, status: 'idle', finding: undefined })));
    setDecision(null);
    setMonitoringAlert(null);
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
      const timer = setTimeout(() => setPhase('privilege-check'), 1500);
      return () => clearTimeout(timer);
    }

    if (phase === 'privilege-check') {
      setSecurityChecks(prev => prev.map(c =>
        c.id === 'privilege' ? { ...c, status: 'checking' } : c
      ));

      const timer = setTimeout(() => {
        const privLevel: PrivilegeLevel = {
          current: scenario.agentRole.toLowerCase().replace(/[\s-]/g, '_'),
          required: request.requiredPrivilege,
          hasAccess: request.isLegitimate
        };
        setPrivilegeLevel(privLevel);

        setSecurityChecks(prev => prev.map(c =>
          c.id === 'privilege'
            ? {
                ...c,
                status: privLevel.hasAccess ? 'passed' : 'failed',
                finding: privLevel.hasAccess
                  ? `Current privilege "${scenario.agentRole}" matches required level`
                  : `Privilege mismatch: "${scenario.agentRole}" < "${request.requiredPrivilege}"`
              }
            : c
        ));
        setTimeout(() => setPhase('role-validation'), 800);
      }, 1200);
      return () => clearTimeout(timer);
    }

    if (phase === 'role-validation') {
      setSecurityChecks(prev => prev.map(c =>
        c.id === 'role' ? { ...c, status: 'checking' } : c
      ));

      const timer = setTimeout(() => {
        setSecurityChecks(prev => prev.map(c =>
          c.id === 'role'
            ? {
                ...c,
                status: request.isLegitimate ? 'passed' : 'failed',
                finding: request.isLegitimate
                  ? 'Agent role validated and authorized for this resource'
                  : 'Agent role lacks authorization for requested resource'
              }
            : c
        ));
        setTimeout(() => setPhase('escalation-detection'), 800);
      }, 1200);
      return () => clearTimeout(timer);
    }

    if (phase === 'escalation-detection') {
      setSecurityChecks(prev => prev.map(c =>
        c.id === 'escalation' ? { ...c, status: 'checking' } : c
      ));

      const timer = setTimeout(() => {
        setSecurityChecks(prev => prev.map(c =>
          c.id === 'escalation'
            ? {
                ...c,
                status: request.isLegitimate ? 'passed' : 'failed',
                finding: request.isLegitimate
                  ? 'No privilege escalation detected'
                  : `⚠️ PRIVILEGE ESCALATION ATTEMPT DETECTED: Trying to access ${request.requiredPrivilege} with ${scenario.agentRole.toLowerCase().replace(/[\s-]/g, '_')} privileges`
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
          granted: request.isLegitimate,
          reason: request.isLegitimate
            ? 'All security checks passed. Access granted within authorized privilege scope.'
            : 'Privilege escalation detected. Access denied and security incident logged.'
        });
        setTimeout(() => setPhase('monitoring'), 1500);
      }, 800);
      return () => clearTimeout(timer);
    }

    if (phase === 'monitoring') {
      const timer = setTimeout(() => {
        if (!request.isLegitimate) {
          setMonitoringAlert(
            `Security Alert: Privilege escalation attempt from ${scenario.agentRole} to ${request.requiredPrivilege}. Incident logged for investigation.`
          );
        }
        setTimeout(() => {
          if (currentRequest === 'legitimate') {
            setCurrentRequest('malicious');
            setPhase('request');
            setAnimatedPhase(false);
            setPrivilegeLevel(null);
            setSecurityChecks(prev => prev.map(c => ({ ...c, status: 'idle', finding: undefined })));
            setDecision(null);
            setMonitoringAlert(null);
          } else {
            setPhase('comparison');
          }
        }, 2000);
      }, 1000);
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
  }, [phase, animatedPhase, request.isLegitimate, currentRequest, scenario.agentRole, request.requiredPrivilege]);

  const handleStart = () => {
    setPhase('request');
    setAnimatedPhase(false);
    setCurrentRequest('legitimate');
    setPrivilegeLevel(null);
    setSecurityChecks(prev => prev.map(c => ({ ...c, status: 'idle', finding: undefined })));
    setDecision(null);
    setMonitoringAlert(null);
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
              {scenario.name} Access Control
            </h3>
            <p className="text-gray-400 text-sm mb-1">
              Context: {scenario.context}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <UserCheck className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">
                Agent Role: <span className="font-semibold">{scenario.agentRole}</span>
              </span>
            </div>
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
                    phase === 'privilege-check' ? '25%' :
                    phase === 'role-validation' ? '37.5%' :
                    phase === 'escalation-detection' ? '50%' :
                    phase === 'decision' ? '62.5%' :
                    phase === 'monitoring' ? '75%' :
                    phase === 'comparison' ? '87.5%' :
                    '100%'
                }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span className={phase === 'request' ? 'text-cyan-400 font-semibold' : ''}>Request</span>
            <span className={phase === 'privilege-check' ? 'text-cyan-400 font-semibold' : ''}>Privilege</span>
            <span className={phase === 'role-validation' ? 'text-cyan-400 font-semibold' : ''}>Role</span>
            <span className={phase === 'escalation-detection' ? 'text-cyan-400 font-semibold' : ''}>Escalation</span>
            <span className={phase === 'decision' ? 'text-cyan-400 font-semibold' : ''}>Decision</span>
            <span className={phase === 'monitoring' ? 'text-cyan-400 font-semibold' : ''}>Monitor</span>
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
              Start Access Control Validation
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
                    <TrendingUp className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-semibold text-white">
                      {request.isLegitimate ? 'Legitimate Access Request' : 'Privilege Escalation Attempt'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-gray-800 rounded p-3">
                      <div className="text-xs text-gray-400 mb-1">Resource</div>
                      <div className="text-sm text-white font-medium">{request.resource}</div>
                    </div>
                    <div className="bg-gray-800 rounded p-3">
                      <div className="text-xs text-gray-400 mb-1">Operation</div>
                      <div className="text-sm text-white">{request.operation}</div>
                    </div>
                    <div className="bg-gray-800 rounded p-3 border border-yellow-500/30">
                      <div className="text-xs text-gray-400 mb-1">Required Privilege</div>
                      <div className="text-sm text-yellow-300 font-mono">{request.requiredPrivilege}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(phase === 'privilege-check' || phase === 'role-validation' || phase === 'escalation-detection' || phase === 'decision' || phase === 'monitoring') && (
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4 border-2 border-gray-600">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${request.isLegitimate ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  {request.isLegitimate ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white mb-2">{request.resource}</div>
                  <div className="text-sm text-gray-300">{request.operation}</div>
                </div>
              </div>
            </div>

            {privilegeLevel && (
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Key className="w-5 h-5 text-yellow-400" />
                  <h4 className="font-semibold text-white">Privilege Comparison</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 rounded p-3">
                    <div className="text-xs text-gray-400 mb-2">Current Privilege</div>
                    <div className="text-sm text-cyan-300 font-mono">{privilegeLevel.current}</div>
                  </div>
                  <div className="bg-gray-800 rounded p-3">
                    <div className="text-xs text-gray-400 mb-2">Required Privilege</div>
                    <div className="text-sm text-yellow-300 font-mono">{privilegeLevel.required}</div>
                  </div>
                </div>
                <div className={`mt-3 rounded p-3 border ${
                  privilegeLevel.hasAccess
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <div className={`text-sm font-semibold ${
                    privilegeLevel.hasAccess ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {privilegeLevel.hasAccess ? '✓ Privilege Match' : '✗ Privilege Insufficient'}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-cyan-400" />
                <h4 className="font-semibold text-white">Security Checks</h4>
              </div>
              <div className="space-y-3">
                {securityChecks.map((check) => (
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

            {decision && (
              <div className={`rounded-lg p-4 border-2 ${
                decision.granted ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'
              }`}>
                <div className="flex items-start gap-3">
                  {decision.granted ? (
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  ) : (
                    <Ban className="w-6 h-6 text-red-400 flex-shrink-0" />
                  )}
                  <div>
                    <div className={`font-semibold mb-2 ${
                      decision.granted ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {decision.granted ? 'Access Granted' : 'Access Denied'}
                    </div>
                    <div className="text-sm text-gray-300">
                      {decision.reason}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {monitoringAlert && (
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-orange-400 mb-2">Continuous Monitoring</div>
                    <div className="text-sm text-gray-300">{monitoringAlert}</div>
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
                    <div className="font-semibold text-red-400 mb-2">Without Privilege Compromise Mitigation</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Agents granted broad, unrestricted permissions
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        No privilege level verification before access
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Compromised agents can escalate to admin privileges
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Complete system compromise and data breach
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
                    <div className="font-semibold text-green-400 mb-2">With Privilege Compromise Mitigation</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Principle of least privilege enforced automatically
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Real-time privilege level verification
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Escalation attempts detected and blocked
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Continuous monitoring and incident logging
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
                      Privilege Compromise Mitigation implements defense in depth for access control. By enforcing
                      the principle of least privilege, validating roles continuously, and detecting escalation attempts
                      in real-time, it prevents compromised agents from accessing unauthorized resources—even if the
                      agent itself is under attacker control. This pattern is essential for limiting blast radius in security incidents.
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
              <Key className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-yellow-400">Least Privilege:</span> Agents granted minimum permissions needed for their role
              </div>
            </div>
            <div className="flex items-start gap-2">
              <UserCheck className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-purple-400">Role Validation:</span> Every access request verified against agent's assigned role
              </div>
            </div>
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-orange-400">Escalation Detection:</span> Attempts to exceed privilege boundaries immediately flagged
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Eye className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-cyan-400">Continuous Monitoring:</span> All privilege violations logged for security analysis
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}