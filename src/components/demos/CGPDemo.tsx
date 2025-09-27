'use client';

import React, { useState, useEffect } from 'react';
import { PlayCircle, RotateCcw, Shield, CheckCircle, XCircle, AlertTriangle, MapPin, Clock, User, Database, Activity, Building, CreditCard } from 'lucide-react';

interface ContextFactor {
  id: string;
  name: string;
  icon: React.ReactNode;
  value: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface Rule {
  id: string;
  condition: string;
  action: string;
  reasoning: string;
  triggered: boolean;
}

interface Decision {
  allowed: boolean;
  constraints: string[];
  reasoning: string;
  riskScore: number;
}

interface Scenario {
  id: string;
  title: string;
  icon: React.ReactNode;
  domain: string;
  request: string;
  staticDecision: {
    result: 'block' | 'allow';
    reasoning: string;
    problem: string;
  };
  context: ContextFactor[];
  rules: Rule[];
  contextualDecision: Decision;
  alternativeContext: {
    change: string;
    newDecision: Decision;
    explanation: string;
  };
}

type Phase = 'idle' | 'request' | 'static' | 'context' | 'rules' | 'decision' | 'alternative' | 'complete';

export default function CGPDemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>('healthcare');
  const [phase, setPhase] = useState<Phase>('idle');
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedContext, setRevealedContext] = useState<Set<string>>(new Set());
  const [triggeredRules, setTriggeredRules] = useState<Set<string>>(new Set());

  const scenarios: Scenario[] = [
    {
      id: 'healthcare',
      title: 'Healthcare PHI Access',
      icon: <Activity className="w-5 h-5" />,
      domain: 'Healthcare',
      request: 'Access patient medical records for Sarah Johnson',
      staticDecision: {
        result: 'block',
        reasoning: 'PHI access restricted by default HIPAA policy',
        problem: 'Blocks legitimate doctor access during emergencies, delays critical care'
      },
      context: [
        { id: 'c1', name: 'User Role', icon: <User className="w-4 h-4" />, value: 'Attending Physician', riskLevel: 'low' },
        { id: 'c2', name: 'Location', icon: <MapPin className="w-4 h-4" />, value: 'Hospital ER (authorized)', riskLevel: 'low' },
        { id: 'c3', name: 'Time', icon: <Clock className="w-4 h-4" />, value: 'Business hours (9:15 AM)', riskLevel: 'low' },
        { id: 'c4', name: 'Patient Relationship', icon: <Database className="w-4 h-4" />, value: 'Assigned care team', riskLevel: 'low' },
        { id: 'c5', name: 'Device', icon: <Shield className="w-4 h-4" />, value: 'Hospital workstation (secure)', riskLevel: 'low' }
      ],
      rules: [
        {
          id: 'r1',
          condition: 'IF role = physician AND assigned_patient = true',
          action: 'ALLOW read access',
          reasoning: 'Direct care provider with legitimate need',
          triggered: false
        },
        {
          id: 'r2',
          condition: 'IF location = authorized_facility AND device = secure',
          action: 'ALLOW access without extra auth',
          reasoning: 'Secure environment reduces authentication requirements',
          triggered: false
        },
        {
          id: 'r3',
          condition: 'IF time = business_hours AND audit_log = enabled',
          action: 'ENABLE full access with logging',
          reasoning: 'Normal operating hours with compliance tracking',
          triggered: false
        }
      ],
      contextualDecision: {
        allowed: true,
        constraints: [
          'Read-only access to assigned patient records',
          'All accesses logged for HIPAA compliance',
          'Auto-logout after 15 minutes inactivity',
          'Cannot export PHI without additional approval'
        ],
        reasoning: 'Physician accessing assigned patient from secure hospital location during business hours',
        riskScore: 15
      },
      alternativeContext: {
        change: 'Location: Remote (home network) at 11:30 PM',
        newDecision: {
          allowed: true,
          constraints: [
            'Multi-factor authentication required',
            'VPN connection mandatory',
            'Read-only access only (no edits)',
            'Enhanced audit logging with screenshots',
            'Auto-logout after 5 minutes',
            'Supervisor notification sent'
          ],
          reasoning: 'Higher risk context requires additional security controls',
          riskScore: 65
        },
        explanation: 'Same user, same patient, but remote access at odd hours triggers stricter controls while still enabling emergency care'
      }
    },
    {
      id: 'financial',
      title: 'Financial Transaction',
      icon: <CreditCard className="w-5 h-5" />,
      domain: 'Banking',
      request: 'Transfer $50,000 to external account',
      staticDecision: {
        result: 'block',
        reasoning: 'Large transfer blocked pending manual review',
        problem: 'Delays legitimate business transactions, frustrates customers with good history'
      },
      context: [
        { id: 'c1', name: 'User History', icon: <User className="w-4 h-4" />, value: 'Premier customer (8 years)', riskLevel: 'low' },
        { id: 'c2', name: 'Transaction Pattern', icon: <Activity className="w-4 h-4" />, value: 'Regular business payroll', riskLevel: 'low' },
        { id: 'c3', name: 'Amount Context', icon: <Database className="w-4 h-4" />, value: '$50K (typical for account)', riskLevel: 'low' },
        { id: 'c4', name: 'Recipient', icon: <Building className="w-4 h-4" />, value: 'Verified payroll vendor', riskLevel: 'low' },
        { id: 'c5', name: 'Device & Location', icon: <MapPin className="w-4 h-4" />, value: 'Registered device from office IP', riskLevel: 'low' }
      ],
      rules: [
        {
          id: 'r1',
          condition: 'IF customer_tier = premier AND history > 5_years',
          action: 'INCREASE transaction limits',
          reasoning: 'Long-term trusted customer relationship',
          triggered: false
        },
        {
          id: 'r2',
          condition: 'IF recipient = verified_vendor AND pattern = recurring',
          action: 'ALLOW without manual review',
          reasoning: 'Established business relationship with regular pattern',
          triggered: false
        },
        {
          id: 'r3',
          condition: 'IF device = registered AND location = expected',
          action: 'REDUCE friction, maintain monitoring',
          reasoning: 'Normal operating context reduces fraud risk',
          triggered: false
        }
      ],
      contextualDecision: {
        allowed: true,
        constraints: [
          'Instant approval (no delay)',
          'Standard fraud monitoring applied',
          'Transaction logged for audit',
          'Confirmation sent to registered email/phone'
        ],
        reasoning: 'Trusted customer making regular business payment from known location to verified vendor',
        riskScore: 12
      },
      alternativeContext: {
        change: 'Device: New mobile device from foreign country at 3 AM',
        newDecision: {
          allowed: false,
          constraints: [
            'Transaction blocked pending verification',
            'Multi-channel verification required (SMS + email + call)',
            'Fraud team notification triggered',
            'Account temporarily restricted',
            '24-hour cooling-off period',
            'Re-verification of recipient details required'
          ],
          reasoning: 'High-risk indicators: new device, unusual location, unusual time',
          riskScore: 92
        },
        explanation: 'Same transaction amount, but suspicious context (new device, foreign location, odd time) triggers fraud prevention'
      }
    },
    {
      id: 'enterprise',
      title: 'Enterprise Data Access',
      icon: <Building className="w-5 h-5" />,
      domain: 'Corporate',
      request: 'Access confidential M&A documents for Project Phoenix',
      staticDecision: {
        result: 'block',
        reasoning: 'Confidential documents restricted to executive team only',
        problem: 'Blocks deal team members who need access to do their jobs'
      },
      context: [
        { id: 'c1', name: 'User Role', icon: <User className="w-4 h-4" />, value: 'Senior Analyst - M&A Team', riskLevel: 'low' },
        { id: 'c2', name: 'Project Assignment', icon: <Database className="w-4 h-4" />, value: 'Assigned to Project Phoenix', riskLevel: 'low' },
        { id: 'c3', name: 'NDA Status', icon: <Shield className="w-4 h-4" />, value: 'Signed & current', riskLevel: 'low' },
        { id: 'c4', name: 'Location & Device', icon: <MapPin className="w-4 h-4" />, value: 'Corporate VPN, managed laptop', riskLevel: 'low' },
        { id: 'c5', name: 'Data Classification', icon: <AlertTriangle className="w-4 h-4" />, value: 'Confidential (not top secret)', riskLevel: 'medium' }
      ],
      rules: [
        {
          id: 'r1',
          condition: 'IF project_team_member = true AND nda_signed = true',
          action: 'GRANT project-scoped access',
          reasoning: 'Team member with proper legal protections',
          triggered: false
        },
        {
          id: 'r2',
          condition: 'IF device = managed AND vpn = corporate',
          action: 'ALLOW access with DLP monitoring',
          reasoning: 'Secure channel with data loss prevention',
          triggered: false
        },
        {
          id: 'r3',
          condition: 'IF classification <= confidential AND role = analyst',
          action: 'ENABLE read access with watermarking',
          reasoning: 'Appropriate access level for role and data sensitivity',
          triggered: false
        }
      ],
      contextualDecision: {
        allowed: true,
        constraints: [
          'Read-only access to Project Phoenix documents',
          'Cannot download or print without approval',
          'All documents watermarked with user ID',
          'Screen recording blocked',
          'Copy/paste to external apps disabled',
          'Access expires when project closes'
        ],
        reasoning: 'Project team member with NDA accessing from secure corporate environment',
        riskScore: 25
      },
      alternativeContext: {
        change: 'Location: Public WiFi at airport, attempting document download',
        newDecision: {
          allowed: true,
          constraints: [
            'View-only mode (no download)',
            'Additional authentication required',
            'Session limited to 30 minutes',
            'Enhanced monitoring active',
            'Screen capture blocked',
            'Security team notification sent',
            'Temporary audit flag on account'
          ],
          reasoning: 'Elevated risk from public network requires stricter controls',
          riskScore: 58
        },
        explanation: 'Same user, same documents, but public WiFi location increases risk - access granted with enhanced restrictions'
      }
    }
  ];

  const currentScenario = scenarios.find(s => s.id === selectedScenario) || scenarios[0];

  useEffect(() => {
    setPhase('idle');
    setRevealedContext(new Set());
    setTriggeredRules(new Set());
  }, [selectedScenario]);

  const runDemo = async () => {
    setIsAnimating(true);
    setPhase('idle');
    setRevealedContext(new Set());
    setTriggeredRules(new Set());

    await new Promise(resolve => setTimeout(resolve, 300));
    setPhase('request');

    await new Promise(resolve => setTimeout(resolve, 1200));
    setPhase('static');

    await new Promise(resolve => setTimeout(resolve, 1500));
    setPhase('context');

    for (const ctx of currentScenario.context) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setRevealedContext(prev => new Set([...prev, ctx.id]));
    }

    await new Promise(resolve => setTimeout(resolve, 800));
    setPhase('rules');

    for (const rule of currentScenario.rules) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setTriggeredRules(prev => new Set([...prev, rule.id]));
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    setPhase('decision');

    await new Promise(resolve => setTimeout(resolve, 1500));
    setPhase('alternative');

    await new Promise(resolve => setTimeout(resolve, 1200));
    setPhase('complete');
    setIsAnimating(false);
  };

  const reset = () => {
    setPhase('idle');
    setRevealedContext(new Set());
    setTriggeredRules(new Set());
  };

  const getPhaseStyle = (currentPhase: Phase, targetPhase: Phase) => {
    if (phase === targetPhase) return 'border-blue-500 bg-blue-500/10';
    if (phases.indexOf(phase) > phases.indexOf(targetPhase)) return 'border-green-500 bg-green-500/10';
    return 'border-slate-600 bg-slate-800/50';
  };

  const phases: Phase[] = ['idle', 'request', 'static', 'context', 'rules', 'decision', 'alternative', 'complete'];

  const getRiskColor = (riskLevel: 'low' | 'medium' | 'high') => {
    switch (riskLevel) {
      case 'low': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/30';
    }
  };

  return (
    <div className="w-full space-y-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Shield className="w-8 h-8 text-cyan-400" />
          Contextual Guardrailing Pattern (CGP)
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

      <div className="grid grid-cols-7 gap-2 mb-6">
        {[
          { phase: 'request', label: 'Request', icon: '📝' },
          { phase: 'static', label: 'Static', icon: '🚫' },
          { phase: 'context', label: 'Context', icon: '🔍' },
          { phase: 'rules', label: 'Rules', icon: '⚙️' },
          { phase: 'decision', label: 'Decision', icon: '✓' },
          { phase: 'alternative', label: 'Alt Context', icon: '🔄' },
          { phase: 'complete', label: 'Done', icon: '✅' }
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
        <div className="bg-slate-900/50 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Access Request: {currentScenario.domain}</h3>
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="text-white font-medium">{currentScenario.request}</div>
          </div>
        </div>
      )}

      {(phase === 'static' || phases.indexOf(phase) > phases.indexOf('static')) && (
        <div className="bg-slate-900/50 border border-red-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" />
            Static Rule Approach (Context-Blind)
          </h3>
          <div className="space-y-3">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🚫</span>
                <span className="font-semibold text-white text-lg">
                  {currentScenario.staticDecision.result.toUpperCase()}
                </span>
              </div>
              <div className="text-sm text-slate-300 mb-2">
                <span className="font-medium text-slate-400">Reasoning:</span> {currentScenario.staticDecision.reasoning}
              </div>
              <div className="bg-slate-800/50 rounded p-3 mt-3">
                <div className="text-xs text-red-400 font-semibold mb-1">⚠️ Problem with Static Rules:</div>
                <div className="text-xs text-slate-300">{currentScenario.staticDecision.problem}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(phase === 'context' || phases.indexOf(phase) > phases.indexOf('context')) && (
        <div className="bg-slate-900/50 border border-purple-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🔍</span>
            Context Analysis (Multi-Dimensional)
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentScenario.context.map(ctx => (
              <div
                key={ctx.id}
                className={`rounded-lg border-2 p-4 transition-all ${
                  revealedContext.has(ctx.id)
                    ? 'border-purple-500 bg-purple-500/10 opacity-100'
                    : 'border-slate-700 bg-slate-800/50 opacity-30'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {ctx.icon}
                  <div className="font-semibold text-white text-sm">{ctx.name}</div>
                </div>
                <div className="text-slate-300 text-sm mb-2">{ctx.value}</div>
                <div className={`text-xs px-2 py-1 rounded border inline-block ${getRiskColor(ctx.riskLevel)}`}>
                  {ctx.riskLevel.toUpperCase()} RISK
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(phase === 'rules' || phases.indexOf(phase) > phases.indexOf('rules')) && (
        <div className="bg-slate-900/50 border border-yellow-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            Contextual Rules Evaluation
          </h3>
          <div className="space-y-3">
            {currentScenario.rules.map(rule => (
              <div
                key={rule.id}
                className={`rounded-lg border-2 p-4 transition-all ${
                  triggeredRules.has(rule.id)
                    ? 'border-yellow-500 bg-yellow-500/10 opacity-100'
                    : 'border-slate-700 bg-slate-800/50 opacity-30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    triggeredRules.has(rule.id) ? 'text-yellow-400' : 'text-slate-600'
                  }`} />
                  <div className="flex-1">
                    <div className="font-mono text-sm text-blue-300 mb-2">{rule.condition}</div>
                    <div className="text-sm text-white mb-2">
                      <span className="font-semibold text-yellow-400">→</span> {rule.action}
                    </div>
                    <div className="text-xs text-slate-400 italic">{rule.reasoning}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(phase === 'decision' || phases.indexOf(phase) > phases.indexOf('decision')) && (
        <div className="bg-slate-900/50 border border-green-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Contextual Decision
          </h3>
          <div className="space-y-4">
            <div className={`rounded-lg border-2 p-4 ${
              currentScenario.contextualDecision.allowed
                ? 'bg-green-900/20 border-green-500/30'
                : 'bg-red-900/20 border-red-500/30'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {currentScenario.contextualDecision.allowed ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                  <span className="text-xl font-bold text-white">
                    {currentScenario.contextualDecision.allowed ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Risk Score</div>
                  <div className={`text-2xl font-bold ${
                    currentScenario.contextualDecision.riskScore < 30 ? 'text-green-400' :
                    currentScenario.contextualDecision.riskScore < 60 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {currentScenario.contextualDecision.riskScore}
                  </div>
                </div>
              </div>
              <div className="text-sm text-slate-300 mb-3">
                <span className="font-medium text-slate-400">Reasoning:</span> {currentScenario.contextualDecision.reasoning}
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="font-semibold text-white text-sm mb-2">Applied Constraints:</div>
                <div className="space-y-1">
                  {currentScenario.contextualDecision.constraints.map((constraint, idx) => (
                    <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400">•</span>
                      <span>{constraint}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(phase === 'alternative' || phase === 'complete') && (
        <div className="bg-slate-900/50 border border-orange-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🔄</span>
            Alternative Context (Same Request, Different Context)
          </h3>
          <div className="space-y-4">
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
              <div className="font-semibold text-white mb-2">Context Change:</div>
              <div className="text-sm text-slate-300">{currentScenario.alternativeContext.change}</div>
            </div>
            <div className={`rounded-lg border-2 p-4 ${
              currentScenario.alternativeContext.newDecision.allowed
                ? 'bg-yellow-900/20 border-yellow-500/30'
                : 'bg-red-900/20 border-red-500/30'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {currentScenario.alternativeContext.newDecision.allowed ? (
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                  <span className="text-lg font-bold text-white">
                    {currentScenario.alternativeContext.newDecision.allowed ? 'ALLOWED WITH RESTRICTIONS' : 'DENIED'}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">New Risk Score</div>
                  <div className={`text-2xl font-bold ${
                    currentScenario.alternativeContext.newDecision.riskScore < 30 ? 'text-green-400' :
                    currentScenario.alternativeContext.newDecision.riskScore < 60 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {currentScenario.alternativeContext.newDecision.riskScore}
                  </div>
                </div>
              </div>
              <div className="text-sm text-slate-300 mb-3">
                <span className="font-medium text-slate-400">Reasoning:</span> {currentScenario.alternativeContext.newDecision.reasoning}
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 mb-3">
                <div className="font-semibold text-white text-sm mb-2">New Constraints:</div>
                <div className="space-y-1">
                  {currentScenario.alternativeContext.newDecision.constraints.map((constraint, idx) => (
                    <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-orange-400">•</span>
                      <span>{constraint}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-cyan-900/20 border border-cyan-500/30 rounded p-3">
                <div className="text-xs text-cyan-300">{currentScenario.alternativeContext.explanation}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <div className="font-semibold text-purple-400">1. Context Detection</div>
            <div className="text-slate-300">
              Analyze multiple dimensions: user, role, location, time, device, data, relationship
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-yellow-400">2. Rule Matching</div>
            <div className="text-slate-300">
              Evaluate IF-THIS-THEN-THAT conditions based on detected context factors
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-green-400">3. Dynamic Decision</div>
            <div className="text-slate-300">
              Grant access with appropriate constraints based on risk assessment
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-blue-400">4. Risk Scoring</div>
            <div className="text-slate-300">
              Calculate risk level from context factors to determine control strictness
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-cyan-400">5. Adaptive Controls</div>
            <div className="text-slate-300">
              Apply constraints proportional to risk: higher risk = stricter controls
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-orange-400">6. Audit & Learn</div>
            <div className="text-slate-300">
              Log all decisions for compliance and continuously refine rules
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
            Contextual Guardrailing enables <span className="text-cyan-400 font-semibold">intelligent security</span> by
            adapting rules dynamically based on <span className="text-purple-400 font-semibold">multi-dimensional context</span>.
            Instead of rigid allow/deny decisions, it applies <span className="text-yellow-400 font-semibold">risk-appropriate constraints</span>:
            low-risk contexts get frictionless access, high-risk contexts get enhanced controls.
            This balances <span className="text-green-400 font-semibold">security with usability</span>,
            preventing both under-protection and over-restriction.
          </p>
        </div>
      )}
    </div>
  );
}