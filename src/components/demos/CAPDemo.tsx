'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, FileText, Eye, Activity, Lock, Book } from 'lucide-react';

interface ComplianceRule {
  regulation: string;
  rule: string;
  status: 'idle' | 'checking' | 'passed' | 'failed';
  finding?: string;
}

interface AuditEntry {
  timestamp: string;
  action: string;
  regulation: string;
  result: 'pass' | 'fail';
}

interface Operation {
  action: string;
  description: string;
  dataType: string;
  isCompliant: boolean;
}

interface Scenario {
  id: string;
  name: string;
  context: string;
  regulations: string[];
  operation: Operation;
  rules: ComplianceRule[];
}

const scenarios: Scenario[] = [
  {
    id: 'healthcare',
    name: 'Healthcare System',
    context: 'AI diagnosis assistant processing patient records',
    regulations: ['HIPAA', 'GDPR', 'FDA'],
    operation: {
      action: 'Share patient diagnosis with research team',
      description: 'Export anonymized patient data for clinical research',
      dataType: 'Protected Health Information (PHI)',
      isCompliant: true
    },
    rules: [
      {
        regulation: 'HIPAA',
        rule: 'PHI must be de-identified before sharing',
        status: 'idle'
      },
      {
        regulation: 'GDPR',
        rule: 'User consent verified',
        status: 'idle'
      },
      {
        regulation: 'FDA',
        rule: 'Audit trails maintained',
        status: 'idle'
      }
    ]
  },
  {
    id: 'financial',
    name: 'Financial System',
    context: 'AI trading assistant processing financial transactions',
    regulations: ['SOX', 'GDPR', 'SEC'],
    operation: {
      action: 'Execute automated trading decision',
      description: 'Process $500K trade based on AI recommendation',
      dataType: 'Financial Records',
      isCompliant: true
    },
    rules: [
      {
        regulation: 'SOX',
        rule: 'Transaction audit trails required',
        status: 'idle'
      },
      {
        regulation: 'GDPR',
        rule: 'Data encrypted at rest',
        status: 'idle'
      },
      {
        regulation: 'SEC',
        rule: 'Oversight controls active',
        status: 'idle'
      }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise System',
    context: 'AI HR assistant managing employee data',
    regulations: ['GDPR', 'CCPA', 'EEOC'],
    operation: {
      action: 'Process employee performance review',
      description: 'Store and analyze employee performance metrics',
      dataType: 'Personal Employment Data',
      isCompliant: true
    },
    rules: [
      {
        regulation: 'GDPR',
        rule: 'Right to erasure must be supported',
        status: 'idle'
      },
      {
        regulation: 'CCPA',
        rule: 'Opt-out rights supported',
        status: 'idle'
      },
      {
        regulation: 'EEOC',
        rule: 'Automated decisions must avoid discriminatory bias',
        status: 'idle'
      }
    ]
  }
];

type Phase = 'idle' | 'operation' | 'policy-check' | 'compliance-validation' | 'audit-generation' | 'enforcement' | 'comparison' | 'complete';

export default function CAPDemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id);
  const [phase, setPhase] = useState<Phase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);

  const [complianceRules, setComplianceRules] = useState<ComplianceRule[]>([]);
  const [auditTrail, setAuditTrail] = useState<AuditEntry[]>([]);
  const [enforcementDecision, setEnforcementDecision] = useState<{ allowed: boolean; reason: string } | null>(null);
  const [revealedComparisons, setRevealedComparisons] = useState<Set<string>>(new Set());

  const scenario = scenarios.find(s => s.id === selectedScenario)!;

  useEffect(() => {
    setPhase('idle');
    setAnimatedPhase(false);
    setComplianceRules(scenario.rules);
    setAuditTrail([]);
    setEnforcementDecision(null);
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

    if (phase === 'operation') {
      const timer = setTimeout(() => setPhase('policy-check'), 1200);
      return () => clearTimeout(timer);
    }

    if (phase === 'policy-check') {
      const timer = setTimeout(() => setPhase('compliance-validation'), 800);
      return () => clearTimeout(timer);
    }

    if (phase === 'compliance-validation') {
      // Check rules sequentially
      let currentRuleIndex = 0;
      const totalRules = complianceRules.length;
      const checkNextRule = () => {
        if (currentRuleIndex >= totalRules) {
          setTimeout(() => setPhase('audit-generation'), 400);
          return;
        }

        const currentIndex = currentRuleIndex;

        setComplianceRules(prev => prev.map((rule, idx) =>
          idx === currentIndex ? { ...rule, status: 'checking' } : rule
        ));

        setTimeout(() => {
          const currentRegulation = complianceRules[currentIndex].regulation;
          const passed = scenario.operation.isCompliant;

          setComplianceRules(prev => prev.map((rule, idx) => {
            if (idx === currentIndex) {
              return {
                ...rule,
                status: passed ? 'passed' : 'failed',
                finding: passed
                  ? `✓ Compliant with ${rule.regulation} requirements`
                  : `✗ Violation: ${rule.regulation} policy not met`
              };
            }
            return rule;
          }));

          // Add to audit trail separately
          const now = new Date();
          const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

          setAuditTrail(prev => [...prev, {
            timestamp,
            action: scenario.operation.action,
            regulation: currentRegulation,
            result: passed ? 'pass' : 'fail'
          }]);

          currentRuleIndex++;
          setTimeout(checkNextRule, 300);
        }, 400);
      };

      checkNextRule();
    }

    if (phase === 'audit-generation') {
      const timer = setTimeout(() => setPhase('enforcement'), 800);
      return () => clearTimeout(timer);
    }

    if (phase === 'enforcement') {
      const timer = setTimeout(() => {
        const allPassed = complianceRules.every(rule => rule.status === 'passed');
        setEnforcementDecision({
          allowed: allPassed,
          reason: allPassed
            ? `All ${scenario.regulations.length} regulatory requirements satisfied. Operation approved with complete audit trail.`
            : 'Compliance violations detected. Operation automatically blocked to prevent regulatory breach.'
        });
        setTimeout(() => setPhase('comparison'), 2000);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (phase === 'comparison') {
      const items = ['manual', 'automated', 'impact'];
      items.forEach((item, index) => {
        setTimeout(() => {
          setRevealedComparisons(prev => new Set([...prev, item]));
          if (index === items.length - 1) {
            setTimeout(() => setPhase('complete'), 1000);
          }
        }, index * 600);
      });
    }
  }, [phase, animatedPhase, complianceRules, scenario.regulations.length, scenario.operation.isCompliant, scenario.operation.action]);

  const handleStart = () => {
    setPhase('operation');
    setAnimatedPhase(false);
    setComplianceRules(scenario.rules);
    setAuditTrail([]);
    setEnforcementDecision(null);
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
              {scenario.name} Compliance Automation
            </h3>
            <p className="text-gray-400 text-sm mb-2">
              Context: {scenario.context}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {scenario.regulations.map((reg) => (
                <span key={reg} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                  {reg}
                </span>
              ))}
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
                    phase === 'operation' ? '14%' :
                    phase === 'policy-check' ? '28%' :
                    phase === 'compliance-validation' ? '42%' :
                    phase === 'audit-generation' ? '56%' :
                    phase === 'enforcement' ? '70%' :
                    phase === 'comparison' ? '85%' :
                    '100%'
                }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span className={phase === 'operation' ? 'text-cyan-400 font-semibold' : ''}>Operation</span>
            <span className={phase === 'policy-check' ? 'text-cyan-400 font-semibold' : ''}>Policy</span>
            <span className={phase === 'compliance-validation' ? 'text-cyan-400 font-semibold' : ''}>Validate</span>
            <span className={phase === 'audit-generation' ? 'text-cyan-400 font-semibold' : ''}>Audit</span>
            <span className={phase === 'enforcement' ? 'text-cyan-400 font-semibold' : ''}>Enforce</span>
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
              Start Compliance Automation
            </button>
          </div>
        )}

        {phase === 'operation' && (
          <div className={`transition-all duration-500 ${animatedPhase ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-cyan-400" />
                <h4 className="font-semibold text-white">Operation Request</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded p-3">
                  <div className="text-xs text-gray-400 mb-1">Action</div>
                  <div className="text-sm font-semibold text-white">{scenario.operation.action}</div>
                </div>
                <div className="bg-gray-800 rounded p-3">
                  <div className="text-xs text-gray-400 mb-1">Description</div>
                  <div className="text-sm text-gray-300">{scenario.operation.description}</div>
                </div>
                <div className="bg-gray-800 rounded p-3">
                  <div className="text-xs text-gray-400 mb-1">Data Type</div>
                  <div className="text-sm text-orange-300">{scenario.operation.dataType}</div>
                </div>
              </div>
              <div className="mt-4 bg-orange-500/10 border border-orange-500/30 rounded p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-orange-300">
                    Processing sensitive data requires compliance validation against {scenario.regulations.length} regulatory frameworks
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(phase === 'policy-check' || phase === 'compliance-validation' || phase === 'audit-generation' || phase === 'enforcement') && (
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-cyan-400" />
                <h4 className="font-semibold text-white">Operation</h4>
              </div>
              <div className="text-sm text-gray-300">{scenario.operation.action}</div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Book className="w-5 h-5 text-purple-400" />
                <h4 className="font-semibold text-white">Automated Compliance Checks</h4>
              </div>
              <div className="space-y-3">
                {complianceRules.map((rule) => (
                  <div key={rule.regulation} className="bg-gray-800 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded font-semibold">
                          {rule.regulation}
                        </span>
                        <span className="font-medium text-white text-sm">{rule.rule}</span>
                      </div>
                      {rule.status === 'idle' && (
                        <span className="text-xs text-gray-400">Pending</span>
                      )}
                      {rule.status === 'checking' && (
                        <span className="text-xs text-cyan-400">Checking...</span>
                      )}
                      {rule.status === 'passed' && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                      {rule.status === 'failed' && (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    {rule.finding && (
                      <div className={`text-sm rounded p-2 mt-2 ${
                        rule.status === 'passed' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {rule.finding}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {auditTrail.length > 0 && (
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-yellow-400" />
                  <h4 className="font-semibold text-white">Audit Trail</h4>
                </div>
                <div className="bg-gray-800 rounded p-3 max-h-40 overflow-y-auto">
                  {auditTrail.map((entry, idx) => (
                    <div key={idx} className="text-xs font-mono text-gray-300 py-1 border-b border-gray-700 last:border-0">
                      <span className="text-gray-500">[{entry.timestamp}]</span>{' '}
                      <span className="text-purple-400">{entry.regulation}</span>:{' '}
                      <span className={entry.result === 'pass' ? 'text-green-400' : 'text-red-400'}>
                        {entry.result.toUpperCase()}
                      </span>{' '}
                      - {entry.action}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Immutable audit log for regulatory reporting and compliance verification
                </div>
              </div>
            )}

            {enforcementDecision && (
              <div className={`rounded-lg p-4 border-2 ${
                enforcementDecision.allowed ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'
              }`}>
                <div className="flex items-start gap-3">
                  {enforcementDecision.allowed ? (
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  )}
                  <div>
                    <div className={`font-semibold mb-2 ${
                      enforcementDecision.allowed ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {enforcementDecision.allowed ? 'Operation Approved' : 'Operation Blocked'}
                    </div>
                    <div className="text-sm text-gray-300">
                      {enforcementDecision.reason}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {(phase === 'comparison' || phase === 'complete') && (
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">Approach Comparison</h4>

            {revealedComparisons.has('manual') && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-red-400 mb-2">Manual Compliance Review</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Humans manually check each operation against regulations
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Slow, error-prone, and inconsistent application
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Incomplete audit trails and missing violations
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Costly fines from regulatory breaches
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {revealedComparisons.has('automated') && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-green-400 mb-2">Compliance Automation</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Real-time automated validation against all regulations
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Consistent, fast, and comprehensive policy enforcement
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Complete immutable audit trails for every operation
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Proactive violation prevention and risk mitigation
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
                      Compliance Automation Patterns enable AI systems to operate within complex regulatory frameworks
                      like GDPR, HIPAA, SOX, and FDA requirements through real-time automated policy checking. By
                      validating every operation against applicable regulations, generating complete audit trails, and
                      automatically enforcing compliance decisions, these patterns prevent costly regulatory violations
                      while maintaining operational velocity. This is essential for deploying AI in regulated industries
                      where manual compliance review would be prohibitively slow and error-prone.
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
              <Book className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-purple-400">Policy Checking:</span> Automated validation against codified regulatory requirements (GDPR, HIPAA, SOX, etc.)
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Eye className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-orange-400">Compliance Validation:</span> Real-time verification that operations meet all applicable regulations
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-yellow-400">Audit Trail Generation:</span> Immutable logs of every compliance check for regulatory reporting
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Lock className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-cyan-400">Automated Enforcement:</span> Immediate blocking of non-compliant operations to prevent violations
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}