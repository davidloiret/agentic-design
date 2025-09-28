'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Database, Lock, TrendingUp, Server, CheckCircle, Zap } from 'lucide-react';

type Phase =
  | 'idle'
  | 'local-processing'
  | 'anonymization'
  | 'distant-aggregation'
  | 'insights'
  | 'comparison'
  | 'complete';

interface DataRecord {
  id: string;
  type: string;
  sensitivity: 'critical' | 'high' | 'medium';
  rawValue: string;
  anonymizedValue?: string;
}

interface LocalAgent {
  id: number;
  name: string;
  location: string;
  status: 'idle' | 'processing' | 'anonymizing' | 'complete';
  recordsProcessed: number;
  totalRecords: number;
}

interface AnonymizationTechnique {
  name: string;
  description: string;
  applied: boolean;
  privacyGuarantee: string;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  localAgents: LocalAgent[];
  dataRecords: DataRecord[];
  anonymizationTechniques: AnonymizationTechnique[];
  insights: string[];
  comparisonData: {
    centralizedRisk: string;
    distributedRisk: string;
    centralizedCompliance: string;
    distributedCompliance: string;
  };
}

const scenarios: Scenario[] = [
  {
    id: 'healthcare',
    name: 'Healthcare AI Network',
    description: '1000+ hospitals collaborating on cancer treatment AI',
    localAgents: [
      { id: 1, name: 'Hospital A', location: 'Boston', status: 'idle', recordsProcessed: 0, totalRecords: 15000 },
      { id: 2, name: 'Hospital B', location: 'Seattle', status: 'idle', recordsProcessed: 0, totalRecords: 12000 },
      { id: 3, name: 'Hospital C', location: 'Miami', status: 'idle', recordsProcessed: 0, totalRecords: 18000 },
    ],
    dataRecords: [
      { id: '1', type: 'Patient Demographics', sensitivity: 'critical', rawValue: 'John Doe, 45, SSN: 123-45-6789' },
      { id: '2', type: 'Treatment History', sensitivity: 'high', rawValue: 'Stage 2 cancer, chemotherapy cycle 3' },
      { id: '3', type: 'Lab Results', sensitivity: 'high', rawValue: 'White blood cell count: 4,500/μL' },
      { id: '4', type: 'Clinical Outcomes', sensitivity: 'medium', rawValue: 'Response rate: positive at 6 months' },
    ],
    anonymizationTechniques: [
      { name: 'K-Anonymity (k=10)', description: 'Generalize data so each record is indistinguishable from at least 9 others', applied: false, privacyGuarantee: 'Re-identification risk < 10%' },
      { name: 'Differential Privacy (ε=0.1)', description: 'Add calibrated noise to protect individual contributions', applied: false, privacyGuarantee: 'Mathematically provable privacy' },
      { name: 'Homomorphic Encryption', description: 'Compute on encrypted data without decryption', applied: false, privacyGuarantee: 'Zero raw data exposure' },
    ],
    insights: [
      'Treatment protocol X shows 23% better outcomes for Stage 2 patients',
      'Early intervention within 2 weeks improves survival rate by 18%',
      'Combination therapy reduces side effects in 67% of cases',
      'Geographic variations suggest environmental factors in 12% of cases',
    ],
    comparisonData: {
      centralizedRisk: '1M+ patient records exposed',
      distributedRisk: 'Zero raw records exposed',
      centralizedCompliance: 'HIPAA violations, $500M fines',
      distributedCompliance: 'Full HIPAA compliance maintained',
    },
  },
  {
    id: 'finance',
    name: 'Financial Fraud Detection',
    description: 'Banks collaborating on fraud detection patterns',
    localAgents: [
      { id: 1, name: 'Bank A', location: 'New York', status: 'idle', recordsProcessed: 0, totalRecords: 250000 },
      { id: 2, name: 'Bank B', location: 'London', status: 'idle', recordsProcessed: 0, totalRecords: 180000 },
      { id: 3, name: 'Bank C', location: 'Tokyo', status: 'idle', recordsProcessed: 0, totalRecords: 220000 },
    ],
    dataRecords: [
      { id: '1', type: 'Account Details', sensitivity: 'critical', rawValue: 'Acct: 9876543210, Balance: $125,000' },
      { id: '2', type: 'Transaction Patterns', sensitivity: 'high', rawValue: '$5,000 transfer to offshore account' },
      { id: '3', type: 'User Behavior', sensitivity: 'high', rawValue: 'Login from 3 countries in 24 hours' },
      { id: '4', type: 'Risk Indicators', sensitivity: 'medium', rawValue: 'Unusual transaction velocity detected' },
    ],
    anonymizationTechniques: [
      { name: 'K-Anonymity (k=15)', description: 'Generalize transaction data to protect account identities', applied: false, privacyGuarantee: 'Account re-ID risk < 6.7%' },
      { name: 'Differential Privacy (ε=0.05)', description: 'Add noise to transaction statistics', applied: false, privacyGuarantee: 'Privacy budget controlled' },
      { name: 'Secure Multi-Party Computation', description: 'Compute fraud scores without sharing raw data', applied: false, privacyGuarantee: 'Cryptographic privacy' },
    ],
    insights: [
      'Cross-border fraud patterns identified in 3.2% of transactions',
      'Account takeover attempts increase 45% during holidays',
      'ML model detects novel fraud schemes with 94% accuracy',
      'Collaborative detection reduces false positives by 62%',
    ],
    comparisonData: {
      centralizedRisk: '500K+ account records exposed',
      distributedRisk: 'Zero account data shared',
      centralizedCompliance: 'GDPR violations, regulatory fines',
      distributedCompliance: 'Full regulatory compliance',
    },
  },
  {
    id: 'retail',
    name: 'Retail Customer Insights',
    description: 'Retailers collaborating on customer behavior analysis',
    localAgents: [
      { id: 1, name: 'Retailer A', location: 'San Francisco', status: 'idle', recordsProcessed: 0, totalRecords: 85000 },
      { id: 2, name: 'Retailer B', location: 'Chicago', status: 'idle', recordsProcessed: 0, totalRecords: 72000 },
      { id: 3, name: 'Retailer C', location: 'Atlanta', status: 'idle', recordsProcessed: 0, totalRecords: 91000 },
    ],
    dataRecords: [
      { id: '1', type: 'Customer Profile', sensitivity: 'critical', rawValue: 'Email: user@example.com, Purchase history' },
      { id: '2', type: 'Shopping Behavior', sensitivity: 'high', rawValue: 'Browsed 15 products, cart abandonment' },
      { id: '3', type: 'Preferences', sensitivity: 'medium', rawValue: 'Prefers eco-friendly products, price-sensitive' },
      { id: '4', type: 'Engagement Metrics', sensitivity: 'medium', rawValue: 'Email open rate 35%, click rate 8%' },
    ],
    anonymizationTechniques: [
      { name: 'K-Anonymity (k=20)', description: 'Generalize customer segments to protect identities', applied: false, privacyGuarantee: 'Customer re-ID risk < 5%' },
      { name: 'Differential Privacy (ε=0.2)', description: 'Add noise to aggregate shopping patterns', applied: false, privacyGuarantee: 'Individual privacy protected' },
      { name: 'Federated Analytics', description: 'Analyze trends without centralizing customer data', applied: false, privacyGuarantee: 'Local data stays local' },
    ],
    insights: [
      'Sustainable product demand increased 38% year-over-year',
      'Cross-retailer loyalty programs boost retention by 27%',
      'Price sensitivity correlates with economic indicators',
      'Personalization increases conversion rate by 41%',
    ],
    comparisonData: {
      centralizedRisk: '250K+ customer profiles exposed',
      distributedRisk: 'Zero PII shared across retailers',
      centralizedCompliance: 'CCPA violations, class action lawsuits',
      distributedCompliance: 'Privacy-by-design compliance',
    },
  },
];

const LDADPDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id);
  const [phase, setPhase] = useState<Phase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState<Phase | null>(null);
  const [localAgents, setLocalAgents] = useState<LocalAgent[]>(scenarios[0].localAgents);
  const [anonymizedRecords, setAnonymizedRecords] = useState<DataRecord[]>([]);
  const [appliedTechniques, setAppliedTechniques] = useState<AnonymizationTechnique[]>([]);
  const [generatedInsights, setGeneratedInsights] = useState<string[]>([]);
  const [aggregationProgress, setAggregationProgress] = useState(0);

  const scenario = scenarios.find(s => s.id === selectedScenario) || scenarios[0];

  const startDemo = () => {
    setPhase('local-processing');
    setAnimatedPhase('local-processing');
    setLocalAgents(scenario.localAgents.map(agent => ({ ...agent, status: 'idle', recordsProcessed: 0 })));
    setAnonymizedRecords([]);
    setAppliedTechniques([]);
    setGeneratedInsights([]);
    setAggregationProgress(0);
  };

  const resetDemo = () => {
    setPhase('idle');
    setAnimatedPhase(null);
    setLocalAgents(scenario.localAgents.map(agent => ({ ...agent, status: 'idle', recordsProcessed: 0 })));
    setAnonymizedRecords([]);
    setAppliedTechniques([]);
    setGeneratedInsights([]);
    setAggregationProgress(0);
  };

  useEffect(() => {
    if (!animatedPhase) return;

    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'local-processing') {
      localAgents.forEach((agent, index) => {
        const timeout1 = setTimeout(() => {
          setLocalAgents(prev => prev.map(a =>
            a.id === agent.id ? { ...a, status: 'processing' as const } : a
          ));

          let progress = 0;
          const progressInterval = setInterval(() => {
            progress += 20;
            setLocalAgents(prev => prev.map(a =>
              a.id === agent.id ? { ...a, recordsProcessed: Math.floor(a.totalRecords * progress / 100) } : a
            ));

            if (progress >= 100) {
              clearInterval(progressInterval);
              setLocalAgents(prev => prev.map(a =>
                a.id === agent.id ? { ...a, status: 'complete' as const, recordsProcessed: a.totalRecords } : a
              ));

              if (index === localAgents.length - 1) {
                const timeout2 = setTimeout(() => setPhase('anonymization'), 500);
                timeouts.push(timeout2);
              }
            }
          }, 300);
        }, index * 800);
        timeouts.push(timeout1);
      });
    } else if (phase === 'anonymization') {
      scenario.anonymizationTechniques.forEach((technique, index) => {
        const timeout = setTimeout(() => {
          setAppliedTechniques(prev => [...prev, { ...technique, applied: true }]);

          if (index === scenario.anonymizationTechniques.length - 1) {
            const timeout2 = setTimeout(() => {
              setAnonymizedRecords(scenario.dataRecords.map(record => ({
                ...record,
                anonymizedValue: record.type.includes('Demographics') || record.type.includes('Account') || record.type.includes('Customer')
                  ? 'Generalized: Age group 40-50, Region: Northeast'
                  : record.type.includes('Transaction') || record.type.includes('Shopping')
                  ? 'Statistical pattern: Cluster ID 7, Risk score: 0.23'
                  : 'Encrypted aggregate: [Homomorphic encrypted value]'
              })));
              const timeout3 = setTimeout(() => setPhase('distant-aggregation'), 500);
              timeouts.push(timeout3);
            }, 600);
            timeouts.push(timeout2);
          }
        }, index * 700);
        timeouts.push(timeout);
      });
    } else if (phase === 'distant-aggregation') {
      let progress = 0;
      const aggregationInterval = setInterval(() => {
        progress += 10;
        setAggregationProgress(progress);
        if (progress >= 100) {
          clearInterval(aggregationInterval);
          const timeout = setTimeout(() => setPhase('insights'), 500);
          timeouts.push(timeout);
        }
      }, 200);
    } else if (phase === 'insights') {
      scenario.insights.forEach((insight, index) => {
        const timeout = setTimeout(() => {
          setGeneratedInsights(prev => [...prev, insight]);

          if (index === scenario.insights.length - 1) {
            const timeout2 = setTimeout(() => setPhase('comparison'), 600);
            timeouts.push(timeout2);
          }
        }, index * 500);
        timeouts.push(timeout);
      });
    } else if (phase === 'comparison') {
      const timeout = setTimeout(() => setPhase('complete'), 1500);
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [animatedPhase, phase, selectedScenario]);

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'idle': return 'bg-slate-700 text-slate-400';
      case 'processing': return 'bg-yellow-900/40 text-yellow-200';
      case 'anonymizing': return 'bg-purple-900/40 text-purple-200';
      case 'complete': return 'bg-green-900/40 text-green-200';
      default: return 'bg-slate-700 text-slate-400';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Local-Distant Agent Data Protection</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Select Collaboration Scenario</label>
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
              disabled={phase !== 'idle'}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white disabled:opacity-50"
            >
              {scenarios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} - {s.description}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            {phase === 'idle' ? (
              <button
                onClick={startDemo}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/30"
              >
                <Shield className="w-4 h-4" />
                Start Privacy-Preserving AI
              </button>
            ) : (
              <button
                disabled
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-700 text-slate-400 rounded-lg cursor-not-allowed"
              >
                <Shield className="w-4 h-4" />
                Start Privacy-Preserving AI
              </button>
            )}
            <button
              onClick={resetDemo}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {phase !== 'idle' && (
        <>
          {(phase === 'local-processing' || phase === 'anonymization' || phase === 'distant-aggregation' || phase === 'insights' || phase === 'comparison' || phase === 'complete') && (
            <div className="bg-slate-800/30 backdrop-blur border border-cyan-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-5 h-5 text-cyan-400" />
                <h4 className="font-semibold text-white">Local Processing Agents</h4>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {localAgents.map((agent) => (
                  <div key={agent.id} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="w-4 h-4 text-cyan-400" />
                      <div className="text-sm font-semibold text-white">{agent.name}</div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="text-slate-400">{agent.location}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Records:</span>
                        <span className="text-white font-medium">{agent.recordsProcessed.toLocaleString()} / {agent.totalRecords.toLocaleString()}</span>
                      </div>
                      {agent.recordsProcessed > 0 && agent.recordsProcessed < agent.totalRecords && (
                        <div className="w-full bg-slate-600 rounded-full h-1.5">
                          <div
                            className="bg-cyan-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${(agent.recordsProcessed / agent.totalRecords) * 100}%` }}
                          />
                        </div>
                      )}
                      <div className={`mt-2 px-2 py-1 rounded text-xs font-medium ${getAgentStatusColor(agent.status)}`}>
                        {agent.status === 'idle' && '⏸️ Idle'}
                        {agent.status === 'processing' && '⚡ Processing'}
                        {agent.status === 'complete' && '✓ Complete'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(phase === 'anonymization' || phase === 'distant-aggregation' || phase === 'insights' || phase === 'comparison' || phase === 'complete') && appliedTechniques.length > 0 && (
            <div className="bg-slate-800/30 backdrop-blur border border-purple-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-purple-400" />
                <h4 className="font-semibold text-white">Advanced Anonymization Layer</h4>
              </div>

              <div className="space-y-3">
                {appliedTechniques.filter(t => t != null).map((technique, idx) => (
                  <div key={idx} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      <div className="text-sm font-semibold text-white">{technique.name}</div>
                    </div>
                    <div className="text-xs text-slate-300 mb-2">{technique.description}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-green-400 font-medium">✓ {technique.privacyGuarantee}</div>
                    </div>
                  </div>
                ))}
              </div>

              {anonymizedRecords.length > 0 && (
                <div className="mt-4 bg-purple-900/20 border border-purple-500/30 rounded p-3">
                  <div className="text-xs font-semibold text-purple-300 mb-2">Sample Anonymization:</div>
                  <div className="space-y-2">
                    {anonymizedRecords.slice(0, 2).filter(r => r != null).map((record) => (
                      <div key={record.id} className="flex items-start gap-2 text-xs">
                        <div className="text-slate-400 min-w-[100px]">{record.type}:</div>
                        <div className="flex-1">
                          <div className="text-red-400 line-through">{record.rawValue}</div>
                          <div className="text-green-400 mt-1">→ {record.anonymizedValue}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {(phase === 'distant-aggregation' || phase === 'insights' || phase === 'comparison' || phase === 'complete') && (
            <div className="bg-slate-800/30 backdrop-blur border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-green-400" />
                <h4 className="font-semibold text-white">Distant Aggregation Agents</h4>
                {aggregationProgress === 100 && <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Aggregating anonymized patterns from {localAgents.length} local agents</span>
                    <span>{aggregationProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-200"
                      style={{ width: `${aggregationProgress}%` }}
                    />
                  </div>
                </div>

                {aggregationProgress === 100 && (
                  <div className="text-xs text-green-300 bg-green-900/20 border border-green-500/30 p-3 rounded">
                    ✓ Aggregation complete • No raw data accessed • Privacy preserved
                  </div>
                )}
              </div>
            </div>
          )}

          {(phase === 'insights' || phase === 'comparison' || phase === 'complete') && generatedInsights.length > 0 && (
            <div className="bg-slate-800/30 backdrop-blur border border-amber-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                <h4 className="font-semibold text-white">Privacy-Preserving Global Insights</h4>
              </div>

              <div className="space-y-2">
                {generatedInsights.filter(i => i != null).map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-700/50 rounded">
                    <div className="text-green-400 mt-0.5">✓</div>
                    <div className="text-sm text-slate-200">{insight}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-green-900/20 border border-green-500/30 p-3 rounded">
                <div className="text-xs text-green-300">
                  <strong>Privacy Achievement:</strong> Global insights generated from {localAgents.reduce((sum, a) => sum + a.totalRecords, 0).toLocaleString()} records without exposing any individual raw data.
                </div>
              </div>
            </div>
          )}

          {(phase === 'comparison' || phase === 'complete') && (
            <div className="bg-slate-800/30 backdrop-blur border border-red-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-red-400" />
                <h4 className="font-semibold text-white">Centralized vs Distributed Protection</h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-red-900/40 p-3 rounded">
                    <h5 className="font-semibold text-red-200 mb-2">❌ Centralized Data Sharing</h5>
                    <ul className="text-sm space-y-2 text-slate-300">
                      <li>• All raw data sent to central system</li>
                      <li>• Single point of vulnerability</li>
                      <li className="text-red-300 font-medium">• Risk: {scenario.comparisonData.centralizedRisk}</li>
                      <li className="text-red-300 font-medium">• {scenario.comparisonData.centralizedCompliance}</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-green-900/40 p-3 rounded">
                    <h5 className="font-semibold text-green-200 mb-2">✓ Local-Distant Architecture (LDADP)</h5>
                    <ul className="text-sm space-y-2 text-slate-300">
                      <li>• Raw data stays at local agents</li>
                      <li>• Multi-layer anonymization</li>
                      <li className="text-green-300 font-medium">• Risk: {scenario.comparisonData.distributedRisk}</li>
                      <li className="text-green-300 font-medium">• {scenario.comparisonData.distributedCompliance}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-purple-900/20 border border-purple-500/30 p-3 rounded">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-purple-200">
                    <strong>Distributed Protection Principle:</strong> Local processing + distant aggregation enables global AI collaboration without compromising individual privacy. Keep raw data local, share insights globally.
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LDADPDemo;