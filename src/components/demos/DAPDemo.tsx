'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Database, Users, BarChart3, Sparkles, CheckCircle, XCircle, Eye, Lock, AlertTriangle } from 'lucide-react';

interface DataRecord {
  id: string;
  age: string;
  zipCode: string;
  diagnosis: string;
  salary?: string;
}

interface AnonymizationTechnique {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'processing' | 'completed';
  metric?: string;
  result?: string;
}

interface PrivacyMetrics {
  kAnonymity: number;
  lDiversity: number;
  tCloseness: number;
  reidentificationRisk: number;
}

interface DAPScenario {
  id: string;
  name: string;
  context: string;
  dataType: string;
  originalRecords: DataRecord[];
  techniques: AnonymizationTechnique[];
  privacyMetrics: PrivacyMetrics;
}

const scenarios: DAPScenario[] = [
  {
    id: 'medical',
    name: 'Medical Records',
    context: 'Hospital patient data anonymization for AI training',
    dataType: 'Patient health records',
    originalRecords: [
      { id: '1', age: '28', zipCode: '94301', diagnosis: 'HIV+' },
      { id: '2', age: '29', zipCode: '94301', diagnosis: 'Cancer' },
      { id: '3', age: '28', zipCode: '94302', diagnosis: 'Diabetes' },
      { id: '4', age: '32', zipCode: '94305', diagnosis: 'HIV+' },
      { id: '5', age: '31', zipCode: '94305', diagnosis: 'Heart Disease' }
    ],
    techniques: [
      {
        id: 'k-anonymity',
        name: 'K-Anonymity (k=3)',
        description: 'Generalize quasi-identifiers so each record is indistinguishable from at least 2 others',
        status: 'idle'
      },
      {
        id: 'l-diversity',
        name: 'L-Diversity (l=2)',
        description: 'Ensure each equivalence class has at least 2 diverse sensitive values',
        status: 'idle'
      },
      {
        id: 't-closeness',
        name: 'T-Closeness (t=0.3)',
        description: 'Maintain statistical distribution similarity within 30% of overall distribution',
        status: 'idle'
      },
      {
        id: 'synthetic',
        name: 'Synthetic Data Generation',
        description: 'Generate artificial records with same statistical properties',
        status: 'idle'
      }
    ],
    privacyMetrics: {
      kAnonymity: 3,
      lDiversity: 2,
      tCloseness: 0.28,
      reidentificationRisk: 0.08
    }
  },
  {
    id: 'financial',
    name: 'Financial Records',
    context: 'Bank customer data anonymization for fraud detection model',
    dataType: 'Customer financial data',
    originalRecords: [
      { id: '1', age: '35', zipCode: '10001', diagnosis: 'Account Type: Premium', salary: '$150K' },
      { id: '2', age: '36', zipCode: '10001', diagnosis: 'Account Type: Standard', salary: '$85K' },
      { id: '3', age: '35', zipCode: '10002', diagnosis: 'Account Type: Premium', salary: '$200K' },
      { id: '4', age: '42', zipCode: '10005', diagnosis: 'Account Type: Business', salary: '$120K' },
      { id: '5', age: '41', zipCode: '10005', diagnosis: 'Account Type: Standard', salary: '$95K' }
    ],
    techniques: [
      {
        id: 'k-anonymity',
        name: 'K-Anonymity (k=4)',
        description: 'Generalize age and location to create larger equivalence classes',
        status: 'idle'
      },
      {
        id: 'l-diversity',
        name: 'L-Diversity (l=3)',
        description: 'Ensure diverse account types and salary ranges in each group',
        status: 'idle'
      },
      {
        id: 't-closeness',
        name: 'T-Closeness (t=0.25)',
        description: 'Preserve income distribution patterns for fraud detection',
        status: 'idle'
      },
      {
        id: 'synthetic',
        name: 'Synthetic Data Generation',
        description: 'Generate synthetic customer profiles maintaining correlations',
        status: 'idle'
      }
    ],
    privacyMetrics: {
      kAnonymity: 4,
      lDiversity: 3,
      tCloseness: 0.22,
      reidentificationRisk: 0.05
    }
  },
  {
    id: 'employment',
    name: 'Employment Records',
    context: 'HR analytics data anonymization for workforce planning',
    dataType: 'Employee records',
    originalRecords: [
      { id: '1', age: '45', zipCode: '60601', diagnosis: 'Department: Engineering', salary: '$180K' },
      { id: '2', age: '46', zipCode: '60601', diagnosis: 'Department: Sales', salary: '$140K' },
      { id: '3', age: '45', zipCode: '60602', diagnosis: 'Department: Engineering', salary: '$195K' },
      { id: '4', age: '52', zipCode: '60605', diagnosis: 'Department: Executive', salary: '$300K' },
      { id: '5', age: '51', zipCode: '60605', diagnosis: 'Department: Marketing', salary: '$125K' }
    ],
    techniques: [
      {
        id: 'k-anonymity',
        name: 'K-Anonymity (k=5)',
        description: 'Strong anonymization for employee privacy protection',
        status: 'idle'
      },
      {
        id: 'l-diversity',
        name: 'L-Diversity (l=3)',
        description: 'Diverse departments and salary ranges in equivalence classes',
        status: 'idle'
      },
      {
        id: 't-closeness',
        name: 'T-Closeness (t=0.2)',
        description: 'Maintain accurate salary distribution for planning',
        status: 'idle'
      },
      {
        id: 'synthetic',
        name: 'Synthetic Data Generation',
        description: 'Create synthetic workforce data for analysis',
        status: 'idle'
      }
    ],
    privacyMetrics: {
      kAnonymity: 5,
      lDiversity: 3,
      tCloseness: 0.18,
      reidentificationRisk: 0.03
    }
  }
];

type Phase = 'idle' | 'k-anonymity' | 'l-diversity' | 't-closeness' | 'synthetic-generation' | 'privacy-validation' | 'comparison' | 'complete';

export default function DAPDemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id);
  const [phase, setPhase] = useState<Phase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);

  const [techniques, setTechniques] = useState<AnonymizationTechnique[]>([]);
  const [anonymizedRecords, setAnonymizedRecords] = useState<DataRecord[]>([]);
  const [privacyMetrics, setPrivacyMetrics] = useState<PrivacyMetrics | null>(null);
  const [syntheticRecords, setSyntheticRecords] = useState<DataRecord[]>([]);
  const [revealedComparisons, setRevealedComparisons] = useState<Set<string>>(new Set());

  const scenario = scenarios.find(s => s.id === selectedScenario)!;

  useEffect(() => {
    setPhase('idle');
    setAnimatedPhase(false);
    setTechniques(scenario.techniques.map(t => ({ ...t, status: 'idle', metric: undefined, result: undefined })));
    setAnonymizedRecords([]);
    setPrivacyMetrics(null);
    setSyntheticRecords([]);
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

    if (phase === 'k-anonymity') {
      setTechniques(prev => prev.map(t =>
        t.id === 'k-anonymity' ? { ...t, status: 'processing' } : t
      ));

      setTimeout(() => {
        const generalizedRecords = scenario.originalRecords.map(r => ({
          ...r,
          age: r.age.startsWith('2') ? '20-30' : r.age.startsWith('3') ? '30-40' : r.age.startsWith('4') ? '40-50' : '50+',
          zipCode: r.zipCode.substring(0, 3) + 'XX'
        }));

        setAnonymizedRecords(generalizedRecords);
        setTechniques(prev => prev.map(t =>
          t.id === 'k-anonymity' ? {
            ...t,
            status: 'completed',
            metric: `k=${scenario.privacyMetrics.kAnonymity}`,
            result: 'Equivalence classes formed'
          } : t
        ));

        setTimeout(() => setPhase('l-diversity'), 800);
      }, 1500);
    }

    if (phase === 'l-diversity') {
      setTechniques(prev => prev.map(t =>
        t.id === 'l-diversity' ? { ...t, status: 'processing' } : t
      ));

      setTimeout(() => {
        setTechniques(prev => prev.map(t =>
          t.id === 'l-diversity' ? {
            ...t,
            status: 'completed',
            metric: `l=${scenario.privacyMetrics.lDiversity}`,
            result: 'Diverse sensitive values ensured'
          } : t
        ));

        setTimeout(() => setPhase('t-closeness'), 800);
      }, 1500);
    }

    if (phase === 't-closeness') {
      setTechniques(prev => prev.map(t =>
        t.id === 't-closeness' ? { ...t, status: 'processing' } : t
      ));

      setTimeout(() => {
        setTechniques(prev => prev.map(t =>
          t.id === 't-closeness' ? {
            ...t,
            status: 'completed',
            metric: `t=${scenario.privacyMetrics.tCloseness}`,
            result: 'Distribution preserved'
          } : t
        ));

        setTimeout(() => setPhase('synthetic-generation'), 800);
      }, 1500);
    }

    if (phase === 'synthetic-generation') {
      setTechniques(prev => prev.map(t =>
        t.id === 'synthetic' ? { ...t, status: 'processing' } : t
      ));

      setTimeout(() => {
        const synth = [
          { id: 's1', age: '20-30', zipCode: '943XX', diagnosis: scenario.id === 'medical' ? 'Diabetes' : 'Account Type: Standard' },
          { id: 's2', age: '30-40', zipCode: '943XX', diagnosis: scenario.id === 'medical' ? 'Cancer' : 'Account Type: Premium' },
          { id: 's3', age: '20-30', zipCode: '943XX', diagnosis: scenario.id === 'medical' ? 'Heart Disease' : 'Account Type: Business' }
        ];
        setSyntheticRecords(synth);

        setTechniques(prev => prev.map(t =>
          t.id === 'synthetic' ? {
            ...t,
            status: 'completed',
            result: `${synth.length} synthetic records generated`
          } : t
        ));

        setTimeout(() => setPhase('privacy-validation'), 800);
      }, 2000);
    }

    if (phase === 'privacy-validation') {
      const timer = setTimeout(() => {
        setPrivacyMetrics(scenario.privacyMetrics);
        setTimeout(() => setPhase('comparison'), 2000);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (phase === 'comparison') {
      const items = ['simple', 'comprehensive', 'impact'];
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
    setPhase('k-anonymity');
    setAnimatedPhase(false);
  };

  const resetDemo = () => {
    setPhase('idle');
    setAnimatedPhase(false);
    setTechniques(scenario.techniques.map(t => ({ ...t, status: 'idle', metric: undefined, result: undefined })));
    setAnonymizedRecords([]);
    setPrivacyMetrics(null);
    setSyntheticRecords([]);
    setRevealedComparisons(new Set());
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Data Anonymization Patterns</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Select Data Type</label>
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
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Database className="w-4 h-4" />
              {phase === 'complete' ? 'Run Again' : 'Start Anonymization'}
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
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-5 h-5 text-slate-400" />
              <h4 className="text-lg font-semibold text-white">Original Data Sample</h4>
              <span className="ml-auto text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">
                IDENTIFIABLE
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left p-2 text-slate-400">Age</th>
                    <th className="text-left p-2 text-slate-400">ZIP Code</th>
                    <th className="text-left p-2 text-slate-400">Sensitive Attribute</th>
                  </tr>
                </thead>
                <tbody>
                  {scenario.originalRecords.slice(0, 3).map((record, idx) => (
                    <tr key={idx} className="border-b border-slate-700/50">
                      <td className="p-2 text-white">{record.age}</td>
                      <td className="p-2 text-white">{record.zipCode}</td>
                      <td className="p-2 text-white">{record.diagnosis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-red-400 mt-2">⚠️ Quasi-identifiers (age + ZIP) enable re-identification attacks</p>
          </div>

          <div className={`bg-slate-800/50 backdrop-blur border rounded-lg p-6 transition-all duration-500 ${
            (phase === 'k-anonymity' || phase === 'l-diversity' || phase === 't-closeness') && animatedPhase
              ? 'border-purple-500 shadow-lg shadow-purple-500/20'
              : 'border-slate-700'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-purple-400" />
              <h4 className="text-lg font-semibold text-white">Anonymization Techniques</h4>
            </div>

            <div className="space-y-3">
              {techniques.map((technique, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    technique.status === 'completed' ? 'bg-green-500/10 border-green-500/50' :
                    technique.status === 'processing' ? 'bg-purple-500/10 border-purple-500/50' :
                    'bg-slate-900/50 border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {technique.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-400" />}
                      {technique.status === 'processing' && <BarChart3 className="w-5 h-5 text-purple-400 animate-pulse" />}
                      {technique.status === 'idle' && <Lock className="w-5 h-5 text-slate-500" />}
                      <div>
                        <div className="text-sm font-semibold text-white">{technique.name}</div>
                        <div className="text-xs text-slate-400">{technique.description}</div>
                      </div>
                    </div>
                    {technique.metric && (
                      <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
                        {technique.metric}
                      </span>
                    )}
                  </div>
                  {technique.result && (
                    <div className="text-xs text-green-400 mt-2">✓ {technique.result}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {anonymizedRecords.length > 0 && (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-green-400" />
                <h4 className="text-lg font-semibold text-white">Anonymized Data</h4>
                <span className="ml-auto text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                  PRIVACY-PRESERVED
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left p-2 text-slate-400">Age Range</th>
                      <th className="text-left p-2 text-slate-400">ZIP Prefix</th>
                      <th className="text-left p-2 text-slate-400">Sensitive Attribute</th>
                    </tr>
                  </thead>
                  <tbody>
                    {anonymizedRecords.slice(0, 3).map((record, idx) => (
                      <tr key={idx} className="border-b border-slate-700/50">
                        <td className="p-2 text-white">{record.age}</td>
                        <td className="p-2 text-white">{record.zipCode}</td>
                        <td className="p-2 text-white">{record.diagnosis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-green-400 mt-2">✓ Generalized quasi-identifiers prevent re-identification</p>
            </div>
          )}

          {syntheticRecords.length > 0 && (
            <div className={`bg-slate-800/50 backdrop-blur border rounded-lg p-6 transition-all duration-500 ${
              animatedPhase && phase === 'synthetic-generation' ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' : 'border-slate-700'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h4 className="text-lg font-semibold text-white">Synthetic Data Generation</h4>
                {phase === 'synthetic-generation' && animatedPhase && (
                  <span className="ml-auto text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full animate-pulse">
                    GENERATING
                  </span>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left p-2 text-slate-400">Age Range</th>
                      <th className="text-left p-2 text-slate-400">ZIP Prefix</th>
                      <th className="text-left p-2 text-slate-400">Sensitive Attribute</th>
                    </tr>
                  </thead>
                  <tbody>
                    {syntheticRecords.map((record, idx) => (
                      <tr key={idx} className="border-b border-slate-700/50">
                        <td className="p-2 text-cyan-400">{record.age}</td>
                        <td className="p-2 text-cyan-400">{record.zipCode}</td>
                        <td className="p-2 text-cyan-400">{record.diagnosis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-cyan-400 mt-2">✨ Synthetic records contain no real individual data</p>
            </div>
          )}

          {privacyMetrics && (
            <div className={`bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 transition-all duration-500 ${
              animatedPhase && phase === 'privacy-validation' ? 'border-green-500 shadow-lg shadow-green-500/20' : ''
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-5 h-5 text-green-400" />
                <h4 className="text-lg font-semibold text-white">Privacy Metrics</h4>
                <span className="ml-auto text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                  VALIDATED
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">K-Anonymity</div>
                  <div className="text-2xl font-bold text-purple-400">k={privacyMetrics.kAnonymity}</div>
                  <div className="text-xs text-slate-500 mt-1">Indistinguishability</div>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">L-Diversity</div>
                  <div className="text-2xl font-bold text-blue-400">l={privacyMetrics.lDiversity}</div>
                  <div className="text-xs text-slate-500 mt-1">Value diversity</div>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">T-Closeness</div>
                  <div className="text-2xl font-bold text-cyan-400">t={privacyMetrics.tCloseness}</div>
                  <div className="text-xs text-slate-500 mt-1">Distribution</div>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-lg border border-green-500/50">
                  <div className="text-xs text-slate-400 mb-1">Re-ID Risk</div>
                  <div className="text-2xl font-bold text-green-400">{(privacyMetrics.reidentificationRisk * 100).toFixed(1)}%</div>
                  <div className="text-xs text-green-500 mt-1">Safe threshold</div>
                </div>
              </div>
            </div>
          )}

          {phase === 'comparison' || phase === 'complete' ? (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-5 h-5 text-blue-400" />
                <h4 className="text-lg font-semibold text-white">Simple vs Comprehensive Anonymization</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-4 bg-red-500/5 border border-red-500/30 rounded-lg transition-all duration-500 ${
                  revealedComparisons.has('simple') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <h5 className="font-semibold text-red-400">Simple Masking</h5>
                  </div>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>• Remove direct identifiers only</li>
                    <li>• Quasi-identifiers remain</li>
                    <li>• Vulnerable to linkage attacks</li>
                    <li>• No mathematical guarantees</li>
                    <li>• Re-ID risk: 30-40%</li>
                  </ul>
                </div>

                <div className={`p-4 bg-green-500/5 border border-green-500/30 rounded-lg transition-all duration-500 ${
                  revealedComparisons.has('comprehensive') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <h5 className="font-semibold text-green-400">Multi-Technique DAP</h5>
                  </div>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>• K-anonymity + L-diversity + T-closeness</li>
                    <li>• Generalization + suppression</li>
                    <li>• Synthetic data generation</li>
                    <li>• Mathematical privacy guarantees</li>
                    <li>• Re-ID risk: &lt;0.1%</li>
                  </ul>
                </div>
              </div>

              {revealedComparisons.has('impact') && (
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg transition-all duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <h5 className="font-semibold text-blue-400">Real-World Impact</h5>
                  </div>
                  <p className="text-sm text-slate-300">
                    Comprehensive anonymization techniques reduce re-identification risk from 42% to less than 0.1%, enabling
                    safe data sharing for AI training while maintaining 95% of statistical utility and ensuring regulatory compliance
                    with HIPAA, GDPR, and other privacy regulations.
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