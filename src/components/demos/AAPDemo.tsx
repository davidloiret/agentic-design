'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, TrendingUp, Zap, Brain, RefreshCw } from 'lucide-react';

interface SafetyRule {
  id: string;
  rule: string;
  confidence: number;
  violations: number;
  effectiveness: number;
  status: 'initial' | 'active' | 'refined' | 'generated';
}

interface Threat {
  id: string;
  type: string;
  description: string;
  isNovel: boolean;
  detected: boolean;
}

interface AdaptationPhase {
  name: string;
  description: string;
  status: 'pending' | 'active' | 'complete';
}

interface Scenario {
  id: string;
  name: string;
  context: string;
  initialRules: SafetyRule[];
  threats: Threat[];
}

const scenarios: Scenario[] = [
  {
    id: 'chatbot',
    name: 'Customer Service',
    context: 'AI chatbot handling customer inquiries',
    initialRules: [
      {
        id: 'rule-1',
        rule: 'Do not share customer personal data',
        confidence: 90,
        violations: 0,
        effectiveness: 95,
        status: 'initial'
      },
      {
        id: 'rule-2',
        rule: 'Maintain polite and professional tone',
        confidence: 85,
        violations: 0,
        effectiveness: 90,
        status: 'initial'
      }
    ],
    threats: [
      {
        id: 'threat-1',
        type: 'Social Engineering',
        description: 'User tricks bot into generating phishing email templates',
        isNovel: true,
        detected: false
      },
      {
        id: 'threat-2',
        type: 'Indirect Extraction',
        description: 'User requests "examples" to extract sensitive patterns',
        isNovel: true,
        detected: false
      }
    ]
  },
  {
    id: 'trading',
    name: 'Financial Trading',
    context: 'AI agent executing market trades',
    initialRules: [
      {
        id: 'rule-1',
        rule: 'Never exceed $10K per trade limit',
        confidence: 95,
        violations: 0,
        effectiveness: 98,
        status: 'initial'
      },
      {
        id: 'rule-2',
        rule: 'Require human approval for high-risk trades',
        confidence: 90,
        violations: 0,
        effectiveness: 92,
        status: 'initial'
      }
    ],
    threats: [
      {
        id: 'threat-1',
        type: 'Market Manipulation',
        description: 'Coordinated small trades to manipulate market prices',
        isNovel: true,
        detected: false
      },
      {
        id: 'threat-2',
        type: 'Flash Trading',
        description: 'High-frequency micro-trades exploit timing vulnerabilities',
        isNovel: true,
        detected: false
      }
    ]
  },
  {
    id: 'content',
    name: 'Content Moderation',
    context: 'AI moderating user-generated content',
    initialRules: [
      {
        id: 'rule-1',
        rule: 'Block explicit hate speech keywords',
        confidence: 88,
        violations: 0,
        effectiveness: 85,
        status: 'initial'
      },
      {
        id: 'rule-2',
        rule: 'Flag violent imagery for review',
        confidence: 92,
        violations: 0,
        effectiveness: 90,
        status: 'initial'
      }
    ],
    threats: [
      {
        id: 'threat-1',
        type: 'Obfuscation Attack',
        description: 'Hate speech using emoji substitutions and leetspeak',
        isNovel: true,
        detected: false
      },
      {
        id: 'threat-2',
        type: 'Context Manipulation',
        description: 'Harmful content disguised as educational material',
        isNovel: true,
        detected: false
      }
    ]
  }
];

type Phase = 'idle' | 'initial-operation' | 'threat-emergence' | 'violation-detection' | 'rule-generation' | 'refinement' | 'adaptation-complete' | 'comparison' | 'complete';

export default function AAPDemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id);
  const [phase, setPhase] = useState<Phase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);

  const [safetyRules, setSafetyRules] = useState<SafetyRule[]>([]);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [adaptationPhases, setAdaptationPhases] = useState<AdaptationPhase[]>([
    { name: 'Threat Detection', description: 'Identifying novel attack patterns', status: 'pending' },
    { name: 'Violation Analysis', description: 'Analyzing safety rule bypasses', status: 'pending' },
    { name: 'Rule Generation', description: 'Creating new safety checks', status: 'pending' },
    { name: 'Refinement', description: 'Improving existing rules', status: 'pending' }
  ]);

  const [generatedRules, setGeneratedRules] = useState<SafetyRule[]>([]);
  const [revealedComparisons, setRevealedComparisons] = useState<Set<string>>(new Set());

  const scenario = scenarios.find(s => s.id === selectedScenario)!;

  useEffect(() => {
    setPhase('idle');
    setAnimatedPhase(false);
    setSafetyRules(scenario.initialRules);
    setThreats(scenario.threats);
    setAdaptationPhases([
      { name: 'Threat Detection', description: 'Identifying novel attack patterns', status: 'pending' },
      { name: 'Violation Analysis', description: 'Analyzing safety rule bypasses', status: 'pending' },
      { name: 'Rule Generation', description: 'Creating new safety checks', status: 'pending' },
      { name: 'Refinement', description: 'Improving existing rules', status: 'pending' }
    ]);
    setGeneratedRules([]);
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

    if (phase === 'initial-operation') {
      const timer = setTimeout(() => setPhase('threat-emergence'), 2000);
      return () => clearTimeout(timer);
    }

    if (phase === 'threat-emergence') {
      const timer = setTimeout(() => {
        setThreats(prev => prev.map(t => ({ ...t, detected: false })));
        setTimeout(() => setPhase('violation-detection'), 1500);
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (phase === 'violation-detection') {
      setAdaptationPhases(prev => prev.map((p, idx) =>
        idx === 0 ? { ...p, status: 'active' } : p
      ));

      const timer = setTimeout(() => {
        setThreats(prev => prev.map(t => ({ ...t, detected: true })));
        setSafetyRules(prev => prev.map(r => ({
          ...r,
          violations: r.violations + 1
        })));
        setAdaptationPhases(prev => prev.map((p, idx) =>
          idx === 0 ? { ...p, status: 'complete' } : idx === 1 ? { ...p, status: 'active' } : p
        ));
        setTimeout(() => setPhase('rule-generation'), 1200);
      }, 1800);
      return () => clearTimeout(timer);
    }

    if (phase === 'rule-generation') {
      setAdaptationPhases(prev => prev.map((p, idx) =>
        idx === 1 ? { ...p, status: 'complete' } : idx === 2 ? { ...p, status: 'active' } : p
      ));

      const timer = setTimeout(() => {
        const newRules: SafetyRule[] = selectedScenario === 'chatbot' ? [
          {
            id: 'generated-1',
            rule: 'Block requests for template generation that match phishing patterns',
            confidence: 75,
            violations: 0,
            effectiveness: 88,
            status: 'generated'
          },
          {
            id: 'generated-2',
            rule: 'Detect indirect extraction attempts via "example" requests',
            confidence: 70,
            violations: 0,
            effectiveness: 82,
            status: 'generated'
          }
        ] : selectedScenario === 'trading' ? [
          {
            id: 'generated-1',
            rule: 'Monitor aggregate trade patterns for market manipulation',
            confidence: 78,
            violations: 0,
            effectiveness: 85,
            status: 'generated'
          },
          {
            id: 'generated-2',
            rule: 'Rate-limit high-frequency trading below manipulation threshold',
            confidence: 72,
            violations: 0,
            effectiveness: 80,
            status: 'generated'
          }
        ] : [
          {
            id: 'generated-1',
            rule: 'Detect hate speech using semantic analysis, not just keywords',
            confidence: 80,
            violations: 0,
            effectiveness: 90,
            status: 'generated'
          },
          {
            id: 'generated-2',
            rule: 'Flag educational disclaimers used to bypass content rules',
            confidence: 73,
            violations: 0,
            effectiveness: 83,
            status: 'generated'
          }
        ];

        setGeneratedRules(newRules);
        setAdaptationPhases(prev => prev.map((p, idx) =>
          idx === 2 ? { ...p, status: 'complete' } : p
        ));
        setTimeout(() => setPhase('refinement'), 1500);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (phase === 'refinement') {
      setAdaptationPhases(prev => prev.map((p, idx) =>
        idx === 3 ? { ...p, status: 'active' } : p
      ));

      const timer = setTimeout(() => {
        setSafetyRules(prev => prev.map(r => ({
          ...r,
          status: 'refined',
          confidence: Math.min(100, r.confidence + 8),
          effectiveness: Math.min(100, r.effectiveness + 5)
        })));
        setGeneratedRules(prev => prev.map(r => ({
          ...r,
          status: 'active',
          confidence: Math.min(100, r.confidence + 10)
        })));
        setAdaptationPhases(prev => prev.map((p, idx) =>
          idx === 3 ? { ...p, status: 'complete' } : p
        ));
        setTimeout(() => setPhase('adaptation-complete'), 1200);
      }, 1800);
      return () => clearTimeout(timer);
    }

    if (phase === 'adaptation-complete') {
      const timer = setTimeout(() => setPhase('comparison'), 1500);
      return () => clearTimeout(timer);
    }

    if (phase === 'comparison') {
      const items = ['static', 'adaptive', 'impact'];
      items.forEach((item, index) => {
        setTimeout(() => {
          setRevealedComparisons(prev => new Set([...prev, item]));
          if (index === items.length - 1) {
            setTimeout(() => setPhase('complete'), 1000);
          }
        }, index * 600);
      });
    }
  }, [phase, animatedPhase, selectedScenario]);

  const handleStart = () => {
    setPhase('initial-operation');
    setAnimatedPhase(false);
    setSafetyRules(scenario.initialRules);
    setThreats(scenario.threats);
    setAdaptationPhases([
      { name: 'Threat Detection', description: 'Identifying novel attack patterns', status: 'pending' },
      { name: 'Violation Analysis', description: 'Analyzing safety rule bypasses', status: 'pending' },
      { name: 'Rule Generation', description: 'Creating new safety checks', status: 'pending' },
      { name: 'Refinement', description: 'Improving existing rules', status: 'pending' }
    ]);
    setGeneratedRules([]);
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
              {scenario.name} Adaptive Safety
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
                    phase === 'initial-operation' ? '12.5%' :
                    phase === 'threat-emergence' ? '25%' :
                    phase === 'violation-detection' ? '37.5%' :
                    phase === 'rule-generation' ? '50%' :
                    phase === 'refinement' ? '62.5%' :
                    phase === 'adaptation-complete' ? '75%' :
                    phase === 'comparison' ? '87.5%' :
                    '100%'
                }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span className={phase === 'initial-operation' ? 'text-cyan-400 font-semibold' : ''}>Initial</span>
            <span className={phase === 'threat-emergence' ? 'text-cyan-400 font-semibold' : ''}>Threat</span>
            <span className={phase === 'violation-detection' ? 'text-cyan-400 font-semibold' : ''}>Detect</span>
            <span className={phase === 'rule-generation' ? 'text-cyan-400 font-semibold' : ''}>Generate</span>
            <span className={phase === 'refinement' ? 'text-cyan-400 font-semibold' : ''}>Refine</span>
            <span className={phase === 'adaptation-complete' ? 'text-cyan-400 font-semibold' : ''}>Adapt</span>
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
              Start Adaptive Safety System
            </button>
          </div>
        )}

        {phase === 'initial-operation' && (
          <div className={`transition-all duration-500 ${animatedPhase ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <h4 className="font-semibold text-white">Initial Safety Rules</h4>
              </div>
              <div className="space-y-3">
                {safetyRules.map((rule) => (
                  <div key={rule.id} className="bg-gray-800 rounded p-3">
                    <div className="text-sm text-white mb-2">{rule.rule}</div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-gray-400">
                        Confidence: <span className="text-cyan-400 font-semibold">{rule.confidence}%</span>
                      </span>
                      <span className="text-gray-400">
                        Effectiveness: <span className="text-green-400 font-semibold">{rule.effectiveness}%</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {(phase === 'threat-emergence' || phase === 'violation-detection' || phase === 'rule-generation' || phase === 'refinement' || phase === 'adaptation-complete') && (
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h4 className="font-semibold text-white">Novel Threats Detected</h4>
              </div>
              <div className="space-y-3">
                {threats.map((threat) => (
                  <div key={threat.id} className={`rounded p-3 border transition-all duration-500 ${
                    threat.detected
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-gray-800 border-gray-700'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-semibold text-white">{threat.type}</span>
                      {threat.detected && (
                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Detected</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">{threat.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-purple-400" />
                <h4 className="font-semibold text-white">Adaptation Process</h4>
              </div>
              <div className="space-y-3">
                {adaptationPhases.map((adaptPhase, idx) => (
                  <div key={idx} className="bg-gray-800 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{adaptPhase.name}</span>
                      {adaptPhase.status === 'pending' && (
                        <span className="text-xs text-gray-400">Pending</span>
                      )}
                      {adaptPhase.status === 'active' && (
                        <span className="text-xs text-cyan-400 flex items-center gap-1">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Active
                        </span>
                      )}
                      {adaptPhase.status === 'complete' && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <div className="text-xs text-gray-400">{adaptPhase.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {generatedRules.length > 0 && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-green-400" />
                  <h4 className="font-semibold text-white">Newly Generated Safety Rules</h4>
                </div>
                <div className="space-y-3">
                  {generatedRules.map((rule) => (
                    <div key={rule.id} className="bg-gray-800 rounded p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                          {rule.status === 'generated' ? 'New' : 'Active'}
                        </span>
                        <span className="text-sm text-white">{rule.rule}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-gray-400">
                          Confidence: <span className="text-cyan-400 font-semibold">{rule.confidence}%</span>
                        </span>
                        <span className="text-gray-400">
                          Effectiveness: <span className="text-green-400 font-semibold">{rule.effectiveness}%</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {phase === 'refinement' || phase === 'adaptation-complete' ? (
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <h4 className="font-semibold text-white">Refined Existing Rules</h4>
                </div>
                <div className="space-y-3">
                  {safetyRules.map((rule) => (
                    <div key={rule.id} className="bg-gray-800 rounded p-3">
                      <div className="flex items-center gap-2 mb-2">
                        {rule.status === 'refined' && (
                          <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Refined</span>
                        )}
                        <span className="text-sm text-white">{rule.rule}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-gray-400">
                          Confidence: <span className="text-cyan-400 font-semibold">{rule.confidence}%</span>
                          {rule.status === 'refined' && (
                            <span className="text-green-400 ml-1">↑</span>
                          )}
                        </span>
                        <span className="text-gray-400">
                          Effectiveness: <span className="text-green-400 font-semibold">{rule.effectiveness}%</span>
                          {rule.status === 'refined' && (
                            <span className="text-green-400 ml-1">↑</span>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}

        {(phase === 'comparison' || phase === 'complete') && (
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">System Comparison</h4>

            {revealedComparisons.has('static') && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-red-400 mb-2">Static Safety System</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Fixed rules cannot adapt to novel threats
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        No mechanism to learn from safety violations
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Vulnerabilities remain open indefinitely
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Requires manual updates for every new attack pattern
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {revealedComparisons.has('adaptive') && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-green-400 mb-2">AGrail Adaptive System</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Automatically detects novel threat patterns
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Generates new safety rules from violations
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Refines existing rules based on experience
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Continuously improves safety coverage over time
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
                      AGrail Adaptive Pattern implements lifelong learning for AI safety. By continuously monitoring
                      operations, detecting novel threats, generating new safety checks, and refining existing rules,
                      it creates a safety system that evolves with emerging attack patterns. This pattern is critical
                      for long-running AI systems deployed in adversarial environments where threat landscapes constantly change.
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
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-red-400">Threat Detection:</span> Continuously monitors for novel attack patterns and safety violations
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Brain className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-purple-400">Violation Analysis:</span> Analyzes how existing rules were bypassed to understand attack mechanisms
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-green-400">Rule Generation:</span> Automatically generates new safety checks targeting discovered vulnerabilities
              </div>
            </div>
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-cyan-400">Continuous Refinement:</span> Improves rule effectiveness over time based on operational experience
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}