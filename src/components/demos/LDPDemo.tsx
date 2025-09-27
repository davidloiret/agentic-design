'use client';

import React, { useState, useEffect } from 'react';
import { PlayCircle, RotateCcw, Shield, AlertTriangle, CheckCircle, XCircle, Users, DollarSign, Activity, Scale } from 'lucide-react';

interface DefenseLayer {
  id: string;
  name: string;
  icon: string;
  blockRate: number;
  mechanism: string;
  vulnerabilities: string[];
  status: 'idle' | 'processing' | 'blocked' | 'bypassed';
}

interface ThreatAttempt {
  description: string;
  technique: string;
  initialSeverity: number;
}

interface Scenario {
  id: string;
  title: string;
  icon: React.ReactNode;
  domain: string;
  threat: ThreatAttempt;
  layers: DefenseLayer[];
  finalBlockRate: number;
  escapeScenario: {
    condition: string;
    probability: number;
    mitigation: string;
  };
  realWorldImpact: string;
}

type Phase = 'idle' | 'threat' | 'layer1' | 'layer2' | 'layer3' | 'layer4' | 'layer5' | 'statistics' | 'improvement' | 'complete';

export default function LDPDemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>('financial');
  const [phase, setPhase] = useState<Phase>('idle');
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [bypassedLayers, setBypassedLayers] = useState<Set<string>>(new Set());
  const [remainingThreat, setRemainingThreat] = useState(100);

  const scenarios: Scenario[] = [
    {
      id: 'financial',
      title: 'Financial AI Assistant',
      icon: <DollarSign className="w-5 h-5" />,
      domain: 'FinTech',
      threat: {
        description: 'Generate fake investment advice to manipulate stock prices',
        technique: 'Social engineering via euphemistic language and fake credentials',
        initialSeverity: 100
      },
      layers: [
        {
          id: 'l1',
          name: 'API Gateway & Auth',
          icon: '🔐',
          blockRate: 92,
          mechanism: 'Rate limiting, JWT validation, suspicious pattern detection',
          vulnerabilities: ['Valid stolen tokens', 'Low-volume attacks', 'Credential stuffing'],
          status: 'idle'
        },
        {
          id: 'l2',
          name: 'Input Content Filter',
          icon: '🛡️',
          blockRate: 85,
          mechanism: 'Keyword blocking, PII detection, financial regulation compliance',
          vulnerabilities: ['Euphemisms', 'Indirect phrasing', 'Code-switching'],
          status: 'idle'
        },
        {
          id: 'l3',
          name: 'Intent Classifier',
          icon: '🧠',
          blockRate: 88,
          mechanism: 'ML-based intent detection, manipulation pattern recognition',
          vulnerabilities: ['Novel attack patterns', 'Academic framing', 'Adversarial inputs'],
          status: 'idle'
        },
        {
          id: 'l4',
          name: 'Model Constitutional AI',
          icon: '⚙️',
          blockRate: 90,
          mechanism: 'Constitutional training, refusal mechanisms, ethical bounds',
          vulnerabilities: ['Edge cases not in training', 'Subtle implications', 'Context confusion'],
          status: 'idle'
        },
        {
          id: 'l5',
          name: 'Output Validation',
          icon: '🔍',
          blockRate: 83,
          mechanism: 'Response scanning, compliance checking, harmful content detection',
          vulnerabilities: ['Plausible-sounding misinformation', 'Subtle bias', 'Implicit harm'],
          status: 'idle'
        }
      ],
      finalBlockRate: 99.998,
      escapeScenario: {
        condition: 'All 5 layers fail simultaneously due to novel attack vector',
        probability: 0.002,
        mitigation: 'Human review queue for high-stakes financial advice, post-deployment monitoring'
      },
      realWorldImpact: 'Prevented $2.4M potential fraud through layered defenses in Q4 2024'
    },
    {
      id: 'healthcare',
      title: 'Healthcare Chatbot',
      icon: <Activity className="w-5 h-5" />,
      domain: 'Healthcare',
      threat: {
        description: 'Extract patient PHI or provide dangerous medical advice',
        technique: 'Impersonation attack with social engineering and HIPAA exploitation',
        initialSeverity: 100
      },
      layers: [
        {
          id: 'l1',
          name: 'HIPAA Auth Layer',
          icon: '🏥',
          blockRate: 95,
          mechanism: 'Multi-factor auth, role-based access, audit logging',
          vulnerabilities: ['Credential theft', 'Session hijacking', 'Insider threats'],
          status: 'idle'
        },
        {
          id: 'l2',
          name: 'PHI Detection Filter',
          icon: '🔒',
          blockRate: 91,
          mechanism: 'Named entity recognition, PII/PHI pattern matching, data loss prevention',
          vulnerabilities: ['Obfuscated PHI', 'Indirect references', 'Code words'],
          status: 'idle'
        },
        {
          id: 'l3',
          name: 'Medical Intent Analysis',
          icon: '🩺',
          blockRate: 87,
          mechanism: 'Clinical intent classification, harm detection, scope validation',
          vulnerabilities: ['Medical jargon manipulation', 'Edge case symptoms', 'Ambiguous queries'],
          status: 'idle'
        },
        {
          id: 'l4',
          name: 'Clinical Safety Guardrails',
          icon: '⚕️',
          blockRate: 93,
          mechanism: 'Medical knowledge base validation, dosage checking, contraindication detection',
          vulnerabilities: ['Rare drug interactions', 'Off-label usage', 'Novel treatments'],
          status: 'idle'
        },
        {
          id: 'l5',
          name: 'Output Medical Review',
          icon: '👨‍⚕️',
          blockRate: 89,
          mechanism: 'Medical terminology validation, harm assessment, disclaimer enforcement',
          vulnerabilities: ['Subtle medical errors', 'Incomplete information', 'Context-dependent advice'],
          status: 'idle'
        }
      ],
      finalBlockRate: 99.997,
      escapeScenario: {
        condition: 'Novel medical query with obfuscated PHI bypasses all automated layers',
        probability: 0.003,
        mitigation: 'Licensed medical professional review for critical advice, immediate escalation protocols'
      },
      realWorldImpact: 'Blocked 47,000+ PHI extraction attempts and prevented 2,300+ unsafe medical recommendations'
    },
    {
      id: 'legal',
      title: 'Legal AI Assistant',
      icon: <Scale className="w-5 h-5" />,
      domain: 'Legal Services',
      threat: {
        description: 'Generate unethical legal advice or breach attorney-client privilege',
        technique: 'Privilege escalation via impersonation and legal loophole exploitation',
        initialSeverity: 100
      },
      layers: [
        {
          id: 'l1',
          name: 'Client Verification',
          icon: '🔑',
          blockRate: 93,
          mechanism: 'Bar association validation, client-attorney matching, case access control',
          vulnerabilities: ['Stolen credentials', 'Social engineering', 'Privilege confusion'],
          status: 'idle'
        },
        {
          id: 'l2',
          name: 'Privilege Detection',
          icon: '🔐',
          blockRate: 89,
          mechanism: 'Privileged communication detection, confidentiality boundaries, ethical walls',
          vulnerabilities: ['Indirect privilege requests', 'Cross-case contamination', 'Public record confusion'],
          status: 'idle'
        },
        {
          id: 'l3',
          name: 'Legal Ethics Classifier',
          icon: '⚖️',
          blockRate: 91,
          mechanism: 'ABA model rules enforcement, conflict detection, professional responsibility checks',
          vulnerabilities: ['Ethical gray areas', 'Jurisdiction variations', 'Novel situations'],
          status: 'idle'
        },
        {
          id: 'l4',
          name: 'Case Law Validation',
          icon: '📚',
          blockRate: 88,
          mechanism: 'Citation verification, precedent checking, jurisdiction applicability',
          vulnerabilities: ['Overruled cases', 'Narrow holdings', 'Distinguishable facts'],
          status: 'idle'
        },
        {
          id: 'l5',
          name: 'Attorney Review Queue',
          icon: '👨‍⚖️',
          blockRate: 86,
          mechanism: 'Licensed attorney validation, advice quality control, disclaimer enforcement',
          vulnerabilities: ['Time pressure shortcuts', 'Complex multi-jurisdictional issues', 'Rapidly evolving law'],
          status: 'idle'
        }
      ],
      finalBlockRate: 99.996,
      escapeScenario: {
        condition: 'Sophisticated privilege escalation bypasses automated checks in novel legal area',
        probability: 0.004,
        mitigation: 'Senior partner review for sensitive matters, ethics committee escalation, malpractice insurance'
      },
      realWorldImpact: 'Protected 12,000+ client privileged communications and prevented 850+ ethical violations'
    }
  ];

  const currentScenario = scenarios.find(s => s.id === selectedScenario) || scenarios[0];

  useEffect(() => {
    setPhase('idle');
    setActiveLayer(null);
    setBypassedLayers(new Set());
    setRemainingThreat(100);
  }, [selectedScenario]);

  const runDemo = async () => {
    setIsAnimating(true);
    setPhase('idle');
    setActiveLayer(null);
    setBypassedLayers(new Set());
    setRemainingThreat(100);

    await new Promise(resolve => setTimeout(resolve, 300));
    setPhase('threat');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const layerPhases: Phase[] = ['layer1', 'layer2', 'layer3', 'layer4', 'layer5'];
    let currentThreat = 100;

    for (let i = 0; i < currentScenario.layers.length; i++) {
      const layer = currentScenario.layers[i];
      setPhase(layerPhases[i]);
      setActiveLayer(layer.id);

      await new Promise(resolve => setTimeout(resolve, 1200));

      const blocked = Math.random() * 100 < layer.blockRate;
      if (!blocked) {
        setBypassedLayers(prev => new Set([...prev, layer.id]));
        currentThreat = currentThreat * (1 - layer.blockRate / 100);
        setRemainingThreat(currentThreat);
      }

      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setActiveLayer(null);
    setPhase('statistics');

    await new Promise(resolve => setTimeout(resolve, 1500));
    setPhase('improvement');

    await new Promise(resolve => setTimeout(resolve, 1200));
    setPhase('complete');
    setIsAnimating(false);
  };

  const reset = () => {
    setPhase('idle');
    setActiveLayer(null);
    setBypassedLayers(new Set());
    setRemainingThreat(100);
  };

  const getPhaseStyle = (currentPhase: Phase, targetPhase: Phase) => {
    if (phase === targetPhase) return 'border-blue-500 bg-blue-500/10';
    if (phases.indexOf(phase) > phases.indexOf(targetPhase)) return 'border-green-500 bg-green-500/10';
    return 'border-slate-600 bg-slate-800/50';
  };

  const phases: Phase[] = ['idle', 'threat', 'layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'statistics', 'improvement', 'complete'];

  const getLayerColor = (layerId: string) => {
    if (bypassedLayers.has(layerId)) return 'border-red-500 bg-red-500/10';
    if (activeLayer === layerId) return 'border-yellow-500 bg-yellow-500/10';
    if (phases.indexOf(phase) > phases.indexOf(`layer${parseInt(layerId.slice(1))}` as Phase)) return 'border-green-500 bg-green-500/10';
    return 'border-slate-600 bg-slate-800/50';
  };

  return (
    <div className="w-full space-y-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-400" />
          Layered Defense Pattern (Swiss Cheese Model)
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
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {scenario.icon}
            {scenario.title}
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <span className="text-2xl">🧀</span>
          Swiss Cheese Model
        </h3>
        <p className="text-slate-300 text-sm">
          Each defense layer has vulnerabilities (holes in the cheese), but multiple independent layers prevent harm
          because the holes <span className="text-purple-400 font-semibold">rarely align</span>. Only when all layers
          fail simultaneously can a threat penetrate the system.
        </p>
      </div>

      {(phase === 'threat' || phases.indexOf(phase) > phases.indexOf('threat')) && (
        <div className="bg-slate-900/50 border border-red-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Threat: {currentScenario.domain}
          </h3>
          <div className="space-y-3">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <div className="font-semibold text-white mb-2">Attack Description:</div>
              <div className="text-sm text-slate-300">{currentScenario.threat.description}</div>
            </div>
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
              <div className="font-semibold text-white mb-2">Attack Technique:</div>
              <div className="text-sm text-slate-300">{currentScenario.threat.technique}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-400">Initial Threat Level:</div>
              <div className="flex-1 bg-slate-800 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-red-500 h-full flex items-center justify-center text-white text-xs font-bold transition-all duration-500"
                  style={{ width: `${remainingThreat}%` }}
                >
                  {remainingThreat.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {phases.indexOf(phase) >= phases.indexOf('layer1') && (
        <div className="bg-slate-900/50 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Defense Layers (Attack Progression)
          </h3>
          <div className="space-y-4">
            {currentScenario.layers.map((layer, index) => (
              <div
                key={layer.id}
                className={`rounded-lg border-2 p-4 transition-all ${getLayerColor(layer.id)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl">
                      {layer.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-white">Layer {index + 1}: {layer.name}</div>
                      <div className="flex items-center gap-2">
                        {bypassedLayers.has(layer.id) ? (
                          <span className="text-red-400 text-sm font-semibold flex items-center gap-1">
                            <XCircle className="w-4 h-4" />
                            BYPASSED
                          </span>
                        ) : phases.indexOf(phase) > phases.indexOf(`layer${index + 1}` as Phase) ? (
                          <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            BLOCKED
                          </span>
                        ) : activeLayer === layer.id ? (
                          <span className="text-yellow-400 text-sm font-semibold animate-pulse">
                            ANALYZING...
                          </span>
                        ) : null}
                        <span className="text-blue-400 text-sm font-semibold">{layer.blockRate}% effective</span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-300 mb-3">
                      <span className="font-medium text-slate-400">Mechanism:</span> {layer.mechanism}
                    </div>
                    {(activeLayer === layer.id || bypassedLayers.has(layer.id)) && (
                      <div className="bg-slate-800/50 rounded-lg p-3 mt-2">
                        <div className="text-xs text-slate-400 mb-2">Known Vulnerabilities (holes in this layer):</div>
                        <div className="space-y-1">
                          {layer.vulnerabilities.map((vuln, idx) => (
                            <div key={idx} className="text-xs text-red-300 flex items-start gap-1">
                              <span>•</span>
                              <span>{vuln}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(phase === 'statistics' || phase === 'improvement' || phase === 'complete') && (
        <div className="bg-slate-900/50 border border-green-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Defense Statistics
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-400 mb-2">{currentScenario.finalBlockRate}%</div>
              <div className="text-sm text-slate-300">Overall Threat Block Rate</div>
              <div className="text-xs text-slate-400 mt-2">
                Layered defenses provide multiplicative protection
              </div>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-400 mb-2">{(100 - currentScenario.finalBlockRate).toFixed(3)}%</div>
              <div className="text-sm text-slate-300">Escape Probability</div>
              <div className="text-xs text-slate-400 mt-2">
                Extremely rare - requires all layers to fail simultaneously
              </div>
            </div>
            <div className="md:col-span-2 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="font-semibold text-white mb-2">Escape Scenario:</div>
              <div className="text-sm text-slate-300 mb-2">{currentScenario.escapeScenario.condition}</div>
              <div className="text-xs text-yellow-400 mb-2">
                Probability: {currentScenario.escapeScenario.probability}%
              </div>
              <div className="text-xs text-slate-400">
                <span className="font-medium text-slate-300">Mitigation:</span> {currentScenario.escapeScenario.mitigation}
              </div>
            </div>
            <div className="md:col-span-2 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <div className="font-semibold text-white mb-2">Real-World Impact:</div>
              <div className="text-sm text-slate-300">{currentScenario.realWorldImpact}</div>
            </div>
          </div>
        </div>
      )}

      {(phase === 'improvement' || phase === 'complete') && (
        <div className="bg-slate-900/50 border border-purple-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🔄</span>
            Continuous Improvement Loop
          </h3>
          <div className="space-y-4">
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
              <div className="font-semibold text-white mb-2">Learn from Failures</div>
              <div className="text-sm text-slate-300">
                Analyze rare escape cases to identify novel attack vectors and strengthen vulnerable layers
              </div>
            </div>
            <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4">
              <div className="font-semibold text-white mb-2">Optimize Defenses</div>
              <div className="text-sm text-slate-300">
                Use blocked threat data to tune detection thresholds and reduce false positives
              </div>
            </div>
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
              <div className="font-semibold text-white mb-2">Add New Layers</div>
              <div className="text-sm text-slate-300">
                Introduce additional defensive mechanisms as new threat patterns emerge
              </div>
            </div>
            <div className="bg-teal-900/20 border border-teal-500/30 rounded-lg p-4">
              <div className="font-semibold text-white mb-2">Patch Vulnerabilities</div>
              <div className="text-sm text-slate-300">
                Close discovered holes in existing layers through targeted improvements
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <div className="font-semibold text-blue-400">1. Multiple Independent Layers</div>
            <div className="text-slate-300">
              Each layer uses different detection mechanisms with independent failure modes
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-purple-400">2. Multiplicative Protection</div>
            <div className="text-slate-300">
              Threat probability decreases exponentially: 10% × 15% × 12% × 10% × 17% = 0.002%
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-green-400">3. Swiss Cheese Model</div>
            <div className="text-slate-300">
              Vulnerabilities in different layers rarely align, preventing complete breaches
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-yellow-400">4. Fail-Safe Defaults</div>
            <div className="text-slate-300">
              When uncertain, layers default to blocking rather than allowing threats through
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-orange-400">5. Defense in Depth</div>
            <div className="text-slate-300">
              Early layers catch obvious threats; deeper layers catch sophisticated attacks
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-red-400">6. Continuous Learning</div>
            <div className="text-slate-300">
              System evolves by learning from both successful blocks and rare failures
            </div>
          </div>
        </div>
      </div>

      {phase === 'complete' && (
        <div className="bg-gradient-to-r from-blue-900/30 to-green-900/30 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Key Insight
          </h3>
          <p className="text-slate-300">
            Layered Defense Pattern implements the <span className="text-blue-400 font-semibold">Swiss Cheese Model</span>:
            no single layer is perfect, but multiple independent layers with{' '}
            <span className="text-purple-400 font-semibold">non-aligned vulnerabilities</span> create{' '}
            <span className="text-green-400 font-semibold">99.99%+ protection</span>. Each layer catches threats
            the others might miss, making simultaneous failure extremely unlikely. Combined with{' '}
            <span className="text-yellow-400 font-semibold">continuous improvement</span>, the system becomes
            progressively more secure over time.
          </p>
        </div>
      )}
    </div>
  );
}