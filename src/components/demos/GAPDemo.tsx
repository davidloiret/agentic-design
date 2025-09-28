'use client';

import React, { useState, useEffect } from 'react';
import { PlayCircle, RotateCcw, Shield, Eye, CheckCircle, XCircle, AlertTriangle, Code, TrendingUp, MessageSquare, Zap } from 'lucide-react';

interface SafetyCheck {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'checking' | 'passed' | 'failed';
  result?: string;
}

interface GuardDecision {
  allowed: boolean;
  reason: string;
  modifications: string[];
  warnings: string[];
}

interface TargetAgentAction {
  step: string;
  action: string;
  riskLevel: 'low' | 'medium' | 'high';
  guardIntervention?: string;
}

interface Scenario {
  id: string;
  title: string;
  icon: React.ReactNode;
  domain: string;
  userRequest: string;
  requestIntent: string;
  inputChecks: SafetyCheck[];
  guardDecision: GuardDecision;
  targetAgentActions: TargetAgentAction[];
  outputChecks: SafetyCheck[];
  finalResponse: {
    delivered: boolean;
    content: string;
    safetyAdditions: string[];
  };
  comparison: {
    withoutGuard: string;
    withGuard: string;
    improvement: string;
  };
}

type Phase = 'idle' | 'request' | 'input-analysis' | 'guard-decision' | 'target-agent' | 'output-filter' | 'response' | 'comparison' | 'complete';

export default function GAPDemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>('code-gen');
  const [phase, setPhase] = useState<Phase>('idle');
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeInputCheck, setActiveInputCheck] = useState<string | null>(null);
  const [activeOutputCheck, setActiveOutputCheck] = useState<string | null>(null);
  const [revealedActions, setRevealedActions] = useState<Set<number>>(new Set());

  const scenarios: Scenario[] = [
    {
      id: 'code-gen',
      title: 'Code Generation',
      icon: <Code className="w-5 h-5" />,
      domain: 'Software Development',
      userRequest: 'Write Python code to scrape competitor pricing data from their website',
      requestIntent: 'Potentially violates terms of service and could enable unauthorized data collection',
      inputChecks: [
        {
          id: 'ic1',
          name: 'Intent Analysis',
          description: 'Determine if request involves unauthorized access or ToS violation',
          status: 'pending',
          result: '⚠️ FLAGGED: Web scraping may violate ToS and copyright'
        },
        {
          id: 'ic2',
          name: 'Legal Compliance',
          description: 'Check for potential legal or ethical issues',
          status: 'pending',
          result: '⚠️ CONCERN: Unauthorized data collection could violate CFAA'
        },
        {
          id: 'ic3',
          name: 'Context Evaluation',
          description: 'Assess if there are legitimate alternatives',
          status: 'pending',
          result: '✓ ALTERNATIVE: Public API or manual research more appropriate'
        }
      ],
      guardDecision: {
        allowed: true,
        reason: 'Request modified to provide ethical alternatives with proper warnings',
        modifications: [
          'Reframe as API-first approach',
          'Add legal disclaimers',
          'Emphasize ToS compliance',
          'Provide manual research alternatives'
        ],
        warnings: [
          'Web scraping without permission may violate ToS',
          'Always check robots.txt and terms of service',
          'Consider legal implications of data collection'
        ]
      },
      targetAgentActions: [
        {
          step: '1',
          action: 'Check if competitor has public API',
          riskLevel: 'low',
          guardIntervention: 'Approved - legitimate research approach'
        },
        {
          step: '2',
          action: 'Generate code to call public API with attribution',
          riskLevel: 'low',
          guardIntervention: 'Approved - ethical data access'
        },
        {
          step: '3',
          action: 'Add rate limiting to respect API limits',
          riskLevel: 'low',
          guardIntervention: 'Approved - good citizenship'
        },
        {
          step: '4',
          action: 'Include legal disclaimer in code comments',
          riskLevel: 'low',
          guardIntervention: 'Added by GuardAgent'
        }
      ],
      outputChecks: [
        {
          id: 'oc1',
          name: 'Malicious Code Scan',
          description: 'Detect code that bypasses security or violates policies',
          status: 'pending',
          result: '✓ PASSED: No malicious patterns detected'
        },
        {
          id: 'oc2',
          name: 'Legal Compliance',
          description: 'Ensure code includes appropriate warnings',
          status: 'pending',
          result: '✓ PASSED: Legal disclaimers present'
        },
        {
          id: 'oc3',
          name: 'Best Practices',
          description: 'Verify ethical data collection practices',
          status: 'pending',
          result: '✓ PASSED: API-first approach with rate limiting'
        }
      ],
      finalResponse: {
        delivered: true,
        content: 'Python code using competitor\'s public API with rate limiting, error handling, and proper attribution',
        safetyAdditions: [
          'Legal disclaimer about ToS compliance',
          'Comments emphasizing ethical data collection',
          'Rate limiting to prevent abuse',
          'Alternative manual research suggestions',
          'Links to API documentation and usage policies'
        ]
      },
      comparison: {
        withoutGuard: 'Direct web scraping code that violates ToS, no legal warnings, potential for abuse',
        withGuard: 'API-first approach with legal compliance, rate limiting, and ethical guidelines',
        improvement: 'Transformed potentially harmful request into ethical, compliant solution'
      }
    },
    {
      id: 'financial',
      title: 'Financial Trading',
      icon: <TrendingUp className="w-5 h-5" />,
      domain: 'Finance',
      userRequest: 'Execute trade: Sell 10,000 shares of ACME Corp at market price',
      requestIntent: 'Standard trade request requiring regulatory compliance checks',
      inputChecks: [
        {
          id: 'ic1',
          name: 'Position Verification',
          description: 'Confirm user has sufficient shares',
          status: 'pending',
          result: '✓ PASSED: User holds 15,000 shares of ACME'
        },
        {
          id: 'ic2',
          name: 'Insider Trading Check',
          description: 'Verify no blackout period or insider information',
          status: 'pending',
          result: '⚠️ FLAGGED: User is ACME employee, checking blackout periods'
        },
        {
          id: 'ic3',
          name: 'Regulatory Compliance',
          description: 'Check for trading restrictions or wash sales',
          status: 'pending',
          result: '✓ PASSED: No wash sale issues, outside blackout window'
        },
        {
          id: 'ic4',
          name: 'Risk Assessment',
          description: 'Evaluate if trade exceeds risk limits',
          status: 'pending',
          result: '✓ PASSED: Within daily trading limit ($500K)'
        }
      ],
      guardDecision: {
        allowed: true,
        reason: 'Trade approved with enhanced monitoring due to employee status',
        modifications: [
          'Add insider trading attestation',
          'Require 10b5-1 plan reference',
          'Enable enhanced audit logging',
          'Send notification to compliance team'
        ],
        warnings: [
          'Employee trade - enhanced monitoring active',
          'SEC Form 4 filing required within 2 business days',
          'All communications regarding this trade will be archived'
        ]
      },
      targetAgentActions: [
        {
          step: '1',
          action: 'Verify current market price ($45.20)',
          riskLevel: 'low',
          guardIntervention: 'Approved - standard price check'
        },
        {
          step: '2',
          action: 'Submit sell order for 10,000 shares',
          riskLevel: 'medium',
          guardIntervention: 'Monitored - employee trade'
        },
        {
          step: '3',
          action: 'Order executed: 10,000 @ $45.18 avg',
          riskLevel: 'medium',
          guardIntervention: 'Logged for compliance review'
        },
        {
          step: '4',
          action: 'Generate trade confirmation',
          riskLevel: 'low',
          guardIntervention: 'Add compliance disclosures'
        }
      ],
      outputChecks: [
        {
          id: 'oc1',
          name: 'Execution Validation',
          description: 'Confirm trade executed within acceptable parameters',
          status: 'pending',
          result: '✓ PASSED: Execution price within 1% of market'
        },
        {
          id: 'oc2',
          name: 'Compliance Documentation',
          description: 'Ensure all required disclosures present',
          status: 'pending',
          result: '✓ PASSED: SEC filing reminder and attestation included'
        },
        {
          id: 'oc3',
          name: 'Audit Trail',
          description: 'Verify complete transaction logging',
          status: 'pending',
          result: '✓ PASSED: Full audit trail captured'
        }
      ],
      finalResponse: {
        delivered: true,
        content: 'Trade executed: Sold 10,000 shares ACME @ $45.18 avg. Total proceeds: $451,800',
        safetyAdditions: [
          'SEC Form 4 filing required by [date]',
          'Trade conducted under 10b5-1 plan #2024-001',
          'Compliance team notified of employee trade',
          'All trade communications archived for 7 years',
          'Confirm you did not possess material non-public information'
        ]
      },
      comparison: {
        withoutGuard: 'Trade executed without insider trading checks, missing compliance notifications, potential SEC violation',
        withGuard: 'Fully compliant trade with insider trading verification, Form 4 reminder, and compliance notifications',
        improvement: 'Prevented potential insider trading violation and ensured regulatory compliance'
      }
    },
    {
      id: 'content',
      title: 'Content Generation',
      icon: <MessageSquare className="w-5 h-5" />,
      domain: 'Social Media',
      userRequest: 'Write a viral marketing post about our new miracle weight loss pill',
      requestIntent: 'Marketing request with potential for misleading health claims',
      inputChecks: [
        {
          id: 'ic1',
          name: 'Health Claims Analysis',
          description: 'Detect unsubstantiated medical claims',
          status: 'pending',
          result: '⚠️ FLAGGED: "Miracle" suggests unproven efficacy'
        },
        {
          id: 'ic2',
          name: 'FDA Compliance',
          description: 'Check for drug claims requiring FDA approval',
          status: 'pending',
          result: '⚠️ VIOLATION: Weight loss claims require substantiation'
        },
        {
          id: 'ic3',
          name: 'Advertising Standards',
          description: 'Verify compliance with FTC guidelines',
          status: 'pending',
          result: '⚠️ CONCERN: "Viral" intent suggests misleading urgency'
        },
        {
          id: 'ic4',
          name: 'Platform Policies',
          description: 'Check social media advertising policies',
          status: 'pending',
          result: '⚠️ RESTRICTION: Health claims require special approval'
        }
      ],
      guardDecision: {
        allowed: true,
        reason: 'Request substantially modified to comply with health advertising regulations',
        modifications: [
          'Remove "miracle" and unsubstantiated claims',
          'Add required disclaimers',
          'Include "Results may vary" statements',
          'Reference clinical studies if available',
          'Add professional consultation advice'
        ],
        warnings: [
          'Health claims must be substantiated',
          'FDA regulations apply to weight loss products',
          'Platform may require ad review before posting',
          'Avoid creating unrealistic expectations'
        ]
      },
      targetAgentActions: [
        {
          step: '1',
          action: 'Generate post highlighting product benefits',
          riskLevel: 'high',
          guardIntervention: 'Blocked "miraculous results" claim'
        },
        {
          step: '2',
          action: 'Add call-to-action for quick purchase',
          riskLevel: 'medium',
          guardIntervention: 'Modified to "Learn more" instead of urgency'
        },
        {
          step: '3',
          action: 'Include customer testimonials',
          riskLevel: 'medium',
          guardIntervention: 'Added "Individual results may vary" disclaimer'
        },
        {
          step: '4',
          action: 'Add engaging visuals and hashtags',
          riskLevel: 'low',
          guardIntervention: 'Approved with #ad transparency hashtag'
        }
      ],
      outputChecks: [
        {
          id: 'oc1',
          name: 'False Claims Detection',
          description: 'Scan for misleading or unsubstantiated statements',
          status: 'pending',
          result: '✓ PASSED: Claims are factual and measured'
        },
        {
          id: 'oc2',
          name: 'Required Disclaimers',
          description: 'Verify all mandatory warnings present',
          status: 'pending',
          result: '✓ PASSED: FDA disclaimers and "results vary" included'
        },
        {
          id: 'oc3',
          name: 'Platform Compliance',
          description: 'Check against social media advertising policies',
          status: 'pending',
          result: '✓ PASSED: Meets platform health advertising standards'
        }
      ],
      finalResponse: {
        delivered: true,
        content: 'Balanced marketing post emphasizing healthy lifestyle support with realistic expectations',
        safetyAdditions: [
          '⚠️ These statements have not been evaluated by the FDA',
          '📋 Results may vary. Consult healthcare provider',
          '🔬 Based on clinical study of 200 participants',
          '#ad #sponsored (transparency required)',
          '💡 Best results when combined with diet and exercise'
        ]
      },
      comparison: {
        withoutGuard: 'Misleading "miracle cure" claims, FDA violations, platform policy violations, potential legal liability',
        withGuard: 'Compliant marketing with substantiated claims, required disclaimers, and realistic expectations',
        improvement: 'Transformed potentially illegal advertisement into compliant, ethical marketing content'
      }
    }
  ];

  const currentScenario = scenarios.find(s => s.id === selectedScenario) || scenarios[0];

  useEffect(() => {
    setPhase('idle');
    setActiveInputCheck(null);
    setActiveOutputCheck(null);
    setRevealedActions(new Set());
  }, [selectedScenario]);

  const runDemo = async () => {
    setIsAnimating(true);
    setPhase('idle');
    setActiveInputCheck(null);
    setActiveOutputCheck(null);
    setRevealedActions(new Set());

    await new Promise(resolve => setTimeout(resolve, 300));
    setPhase('request');

    await new Promise(resolve => setTimeout(resolve, 1000));
    setPhase('input-analysis');

    for (const check of currentScenario.inputChecks) {
      setActiveInputCheck(check.id);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    setActiveInputCheck(null);

    await new Promise(resolve => setTimeout(resolve, 800));
    setPhase('guard-decision');

    await new Promise(resolve => setTimeout(resolve, 1500));
    setPhase('target-agent');

    for (let i = 0; i < currentScenario.targetAgentActions.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 700));
      setRevealedActions(prev => new Set([...prev, i]));
    }

    await new Promise(resolve => setTimeout(resolve, 800));
    setPhase('output-filter');

    for (const check of currentScenario.outputChecks) {
      setActiveOutputCheck(check.id);
      await new Promise(resolve => setTimeout(resolve, 700));
    }
    setActiveOutputCheck(null);

    await new Promise(resolve => setTimeout(resolve, 800));
    setPhase('response');

    await new Promise(resolve => setTimeout(resolve, 1200));
    setPhase('comparison');

    await new Promise(resolve => setTimeout(resolve, 1000));
    setPhase('complete');
    setIsAnimating(false);
  };

  const reset = () => {
    setPhase('idle');
    setActiveInputCheck(null);
    setActiveOutputCheck(null);
    setRevealedActions(new Set());
  };

  const getPhaseStyle = (currentPhase: Phase, targetPhase: Phase) => {
    if (phase === targetPhase) return 'border-blue-500 bg-blue-500/10';
    if (phases.indexOf(phase) > phases.indexOf(targetPhase)) return 'border-green-500 bg-green-500/10';
    return 'border-slate-600 bg-slate-800/50';
  };

  const phases: Phase[] = ['idle', 'request', 'input-analysis', 'guard-decision', 'target-agent', 'output-filter', 'response', 'comparison', 'complete'];

  const getRiskColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low': return 'text-green-400 bg-green-500/10';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'high': return 'text-red-400 bg-red-500/10';
    }
  };

  return (
    <div className="w-full space-y-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Shield className="w-8 h-8 text-cyan-400" />
          GuardAgent Pattern (GAP)
        </h2>
        <div className="flex gap-2">
          <button
            onClick={runDemo}
            disabled={isAnimating}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <PlayCircle className="w-4 h-4" />
            Run Demo
          </button>
          <button
            onClick={reset}
            disabled={isAnimating}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {scenarios.map(scenario => (
          <button
            key={scenario.id}
            onClick={() => setSelectedScenario(scenario.id)}
            disabled={isAnimating}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              selectedScenario === scenario.id
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {scenario.icon}
            {scenario.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2 mb-6">
        {[
          { phase: 'request', label: 'Request', icon: '📝' },
          { phase: 'input-analysis', label: 'Input Check', icon: '🔍' },
          { phase: 'guard-decision', label: 'Decision', icon: '⚖️' },
          { phase: 'target-agent', label: 'Agent', icon: '🤖' },
          { phase: 'output-filter', label: 'Output Check', icon: '🛡️' },
          { phase: 'response', label: 'Response', icon: '✅' },
          { phase: 'comparison', label: 'Comparison', icon: '📊' },
          { phase: 'complete', label: 'Done', icon: '🎉' }
        ].map(({ phase: p, label, icon }) => (
          <div
            key={p}
            className={`p-3 rounded-lg border-2 text-center transition-all ${getPhaseStyle(phase, p as Phase)}`}
          >
            <div className="text-2xl mb-1">{icon}</div>
            <div className="text-xs text-slate-300 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {(phase === 'request' || phases.indexOf(phase) > phases.indexOf('request')) && (
        <div className="bg-slate-900/50 border border-orange-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">User Request: {currentScenario.domain}</h3>
          <div className="space-y-3">
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
              <div className="text-white font-medium mb-2">{currentScenario.userRequest}</div>
              <div className="text-xs text-slate-400 italic">{currentScenario.requestIntent}</div>
            </div>
          </div>
        </div>
      )}

      {(phase === 'input-analysis' || phases.indexOf(phase) > phases.indexOf('input-analysis')) && (
        <div className="bg-slate-900/50 border border-purple-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-400" />
            GuardAgent: Input Analysis
          </h3>
          <div className="space-y-3">
            {currentScenario.inputChecks.map(check => (
              <div
                key={check.id}
                className={`rounded-lg border-2 p-4 transition-all ${
                  activeInputCheck === check.id || phases.indexOf(phase) > phases.indexOf('input-analysis')
                    ? 'border-purple-500 bg-purple-500/10 opacity-100'
                    : 'border-slate-700 bg-slate-800/50 opacity-30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    activeInputCheck === check.id ? 'bg-yellow-500 animate-pulse' :
                    phases.indexOf(phase) > phases.indexOf('input-analysis') ? 'bg-purple-600' : 'bg-slate-700'
                  }`}>
                    {activeInputCheck === check.id ? (
                      <Zap className="w-4 h-4 text-white" />
                    ) : phases.indexOf(phase) > phases.indexOf('input-analysis') ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <div className="w-2 h-2 bg-slate-400 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white mb-1">{check.name}</div>
                    <div className="text-sm text-slate-300 mb-2">{check.description}</div>
                    {(activeInputCheck === check.id || phases.indexOf(phase) > phases.indexOf('input-analysis')) && (
                      <div className="bg-slate-800/50 rounded p-2 text-xs text-slate-300">
                        {check.result}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(phase === 'guard-decision' || phases.indexOf(phase) > phases.indexOf('guard-decision')) && (
        <div className="bg-slate-900/50 border border-cyan-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            GuardAgent Decision
          </h3>
          <div className="space-y-4">
            <div className={`rounded-lg border-2 p-4 ${
              currentScenario.guardDecision.allowed
                ? 'bg-green-900/20 border-green-500/30'
                : 'bg-red-900/20 border-red-500/30'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                {currentScenario.guardDecision.allowed ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400" />
                )}
                <span className="text-lg font-bold text-white">
                  {currentScenario.guardDecision.allowed ? 'MODIFIED & APPROVED' : 'BLOCKED'}
                </span>
              </div>
              <div className="text-sm text-slate-300 mb-3">{currentScenario.guardDecision.reason}</div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="font-semibold text-white text-sm mb-2">Applied Modifications:</div>
                  <div className="space-y-1">
                    {currentScenario.guardDecision.modifications.map((mod, idx) => (
                      <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="font-semibold text-white text-sm mb-2">Safety Warnings:</div>
                  <div className="space-y-1">
                    {currentScenario.guardDecision.warnings.map((warning, idx) => (
                      <div key={idx} className="text-xs text-yellow-300 flex items-start gap-2">
                        <span className="text-yellow-400">⚠️</span>
                        <span>{warning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(phase === 'target-agent' || phases.indexOf(phase) > phases.indexOf('target-agent')) && (
        <div className="bg-slate-900/50 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            Target Agent Actions (Under Guard Supervision)
          </h3>
          <div className="space-y-3">
            {currentScenario.targetAgentActions.map((action, idx) => (
              <div
                key={idx}
                className={`rounded-lg border-2 p-4 transition-all ${
                  revealedActions.has(idx)
                    ? 'border-blue-500 bg-blue-500/10 opacity-100'
                    : 'border-slate-700 bg-slate-800/50 opacity-30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {action.step}
                  </div>
                  <div className="flex-1">
                    <div className="text-white mb-2">{action.action}</div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded ${getRiskColor(action.riskLevel)}`}>
                        {action.riskLevel.toUpperCase()} RISK
                      </span>
                      {action.guardIntervention && (
                        <span className="text-xs text-cyan-300 italic">
                          🛡️ {action.guardIntervention}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(phase === 'output-filter' || phases.indexOf(phase) > phases.indexOf('output-filter')) && (
        <div className="bg-slate-900/50 border border-green-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            GuardAgent: Output Filtering
          </h3>
          <div className="space-y-3">
            {currentScenario.outputChecks.map(check => (
              <div
                key={check.id}
                className={`rounded-lg border-2 p-4 transition-all ${
                  activeOutputCheck === check.id || phases.indexOf(phase) > phases.indexOf('output-filter')
                    ? 'border-green-500 bg-green-500/10 opacity-100'
                    : 'border-slate-700 bg-slate-800/50 opacity-30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    activeOutputCheck === check.id ? 'bg-yellow-500 animate-pulse' :
                    phases.indexOf(phase) > phases.indexOf('output-filter') ? 'bg-green-600' : 'bg-slate-700'
                  }`}>
                    {activeOutputCheck === check.id ? (
                      <Zap className="w-4 h-4 text-white" />
                    ) : phases.indexOf(phase) > phases.indexOf('output-filter') ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <div className="w-2 h-2 bg-slate-400 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white mb-1">{check.name}</div>
                    <div className="text-sm text-slate-300 mb-2">{check.description}</div>
                    {(activeOutputCheck === check.id || phases.indexOf(phase) > phases.indexOf('output-filter')) && (
                      <div className="bg-slate-800/50 rounded p-2 text-xs text-green-300">
                        {check.result}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(phase === 'response' || phases.indexOf(phase) > phases.indexOf('response')) && (
        <div className="bg-slate-900/50 border border-cyan-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-cyan-400" />
            Protected Response Delivered
          </h3>
          <div className="space-y-4">
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
              <div className="font-semibold text-white mb-2">Response Content:</div>
              <div className="text-slate-300 mb-3">{currentScenario.finalResponse.content}</div>

              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="font-semibold text-cyan-400 text-sm mb-2">GuardAgent Safety Additions:</div>
                <div className="space-y-1">
                  {currentScenario.finalResponse.safetyAdditions.map((addition, idx) => (
                    <div key={idx} className="text-xs text-slate-300">
                      {addition}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(phase === 'comparison' || phase === 'complete') && (
        <div className="bg-slate-900/50 border border-purple-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            With vs Without GuardAgent
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-400" />
                <div className="font-semibold text-white">Without GuardAgent</div>
              </div>
              <div className="text-sm text-slate-300">{currentScenario.comparison.withoutGuard}</div>
            </div>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div className="font-semibold text-white">With GuardAgent</div>
              </div>
              <div className="text-sm text-slate-300">{currentScenario.comparison.withGuard}</div>
            </div>
          </div>
          <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
            <div className="font-semibold text-cyan-400 mb-2">🎯 Improvement:</div>
            <div className="text-slate-300 text-sm">{currentScenario.comparison.improvement}</div>
          </div>
        </div>
      )}

      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <div className="font-semibold text-purple-400">1. Request Interception</div>
            <div className="text-slate-300">
              GuardAgent intercepts all requests before they reach target agent
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-cyan-400">2. Input Analysis</div>
            <div className="text-slate-300">
              Multi-dimensional safety checks: intent, legality, ethics, compliance
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-green-400">3. Dynamic Decision</div>
            <div className="text-slate-300">
              Allow, modify, or block based on context and risk assessment
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-blue-400">4. Supervised Execution</div>
            <div className="text-slate-300">
              Monitor target agent actions in real-time with intervention capability
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-yellow-400">5. Output Filtering</div>
            <div className="text-slate-300">
              Scan responses for harmful content, add safety warnings and disclaimers
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-orange-400">6. Continuous Learning</div>
            <div className="text-slate-300">
              Log all interactions to improve safety models and detection accuracy
            </div>
          </div>
        </div>
      </div>

      {phase === 'complete' && (
        <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border border-cyan-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Key Insight
          </h3>
          <p className="text-slate-300">
            GuardAgent Pattern provides <span className="text-cyan-400 font-semibold">dedicated external oversight</span> of
            target agents through <span className="text-purple-400 font-semibold">continuous monitoring</span> and{' '}
            <span className="text-green-400 font-semibold">dynamic safety checks</span>. Unlike self-monitoring which can
            fail, a separate guard agent intercepts requests, analyzes intent, supervises execution, and filters outputs.
            This achieves <span className="text-yellow-400 font-semibold">98%+ safety accuracy</span> by transforming
            potentially harmful requests into compliant, ethical solutions while maintaining full audit trails.
          </p>
        </div>
      )}
    </div>
  );
}