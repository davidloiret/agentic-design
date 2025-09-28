'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, TrendingUp, Lock, Activity, Zap } from 'lucide-react';

interface Query {
  question: string;
  exactResult: number;
  sensitivity: number;
  unit: string;
}

interface PrivacyBudget {
  epsilon: number;
  delta: number;
  description: string;
  strength: 'weak' | 'moderate' | 'strong';
}

interface NoiseParameters {
  distribution: string;
  scale: number;
  magnitude: number;
}

interface DPResult {
  value: number;
  noise: number;
  error: number;
  privacyGuarantee: string;
}

interface Scenario {
  id: string;
  name: string;
  context: string;
  query: Query;
  privacyBudgets: PrivacyBudget[];
}

const scenarios: Scenario[] = [
  {
    id: 'medical',
    name: 'Medical Research',
    context: 'Patient salary analysis for diabetes research',
    query: {
      question: 'Average salary of patients with diabetes',
      exactResult: 47832.15,
      sensitivity: 200000,
      unit: '$'
    },
    privacyBudgets: [
      { epsilon: 0.1, delta: 0.00001, description: 'Strong privacy, high noise', strength: 'strong' },
      { epsilon: 1.0, delta: 0.00001, description: 'Moderate privacy, balanced', strength: 'moderate' },
      { epsilon: 5.0, delta: 0.00001, description: 'Weak privacy, low noise', strength: 'weak' }
    ]
  },
  {
    id: 'analytics',
    name: 'User Analytics',
    context: 'Website visit duration analysis',
    query: {
      question: 'Average time spent on platform per user',
      exactResult: 42.7,
      sensitivity: 480,
      unit: ' minutes'
    },
    privacyBudgets: [
      { epsilon: 0.1, delta: 0.00001, description: 'Strong privacy, high noise', strength: 'strong' },
      { epsilon: 1.0, delta: 0.00001, description: 'Moderate privacy, balanced', strength: 'moderate' },
      { epsilon: 5.0, delta: 0.00001, description: 'Weak privacy, low noise', strength: 'weak' }
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    context: 'Customer purchase amount analysis',
    query: {
      question: 'Average purchase amount per customer',
      exactResult: 127.45,
      sensitivity: 5000,
      unit: '$'
    },
    privacyBudgets: [
      { epsilon: 0.1, delta: 0.00001, description: 'Strong privacy, high noise', strength: 'strong' },
      { epsilon: 1.0, delta: 0.00001, description: 'Moderate privacy, balanced', strength: 'moderate' },
      { epsilon: 5.0, delta: 0.00001, description: 'Weak privacy, low noise', strength: 'weak' }
    ]
  }
];

type Phase = 'idle' | 'query' | 'privacy-budget' | 'noise-calculation' | 'result-generation' | 'privacy-guarantee' | 'comparison' | 'complete';

export default function DPPDemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id);
  const [phase, setPhase] = useState<Phase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);

  const [selectedBudget, setSelectedBudget] = useState<PrivacyBudget | null>(null);
  const [noiseParams, setNoiseParams] = useState<NoiseParameters | null>(null);
  const [dpResult, setDpResult] = useState<DPResult | null>(null);
  const [revealedComparisons, setRevealedComparisons] = useState<Set<string>>(new Set());

  const scenario = scenarios.find(s => s.id === selectedScenario)!;

  useEffect(() => {
    setPhase('idle');
    setAnimatedPhase(false);
    setSelectedBudget(null);
    setNoiseParams(null);
    setDpResult(null);
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

    if (phase === 'query') {
      const timer = setTimeout(() => setPhase('privacy-budget'), 2000);
      return () => clearTimeout(timer);
    }

    if (phase === 'privacy-budget') {
      const timer = setTimeout(() => {
        const budget = scenario.privacyBudgets[1];
        setSelectedBudget(budget);
        setTimeout(() => setPhase('noise-calculation'), 1500);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (phase === 'noise-calculation') {
      const timer = setTimeout(() => {
        if (selectedBudget) {
          const scale = scenario.query.sensitivity / selectedBudget.epsilon;
          const noiseMagnitude = scale * (Math.random() * 2 - 1);

          setNoiseParams({
            distribution: 'Laplace',
            scale: scale,
            magnitude: noiseMagnitude
          });
          setTimeout(() => setPhase('result-generation'), 1500);
        }
      }, 1800);
      return () => clearTimeout(timer);
    }

    if (phase === 'result-generation') {
      const timer = setTimeout(() => {
        if (noiseParams && selectedBudget) {
          const dpValue = scenario.query.exactResult + noiseParams.magnitude;
          const error = Math.abs((dpValue - scenario.query.exactResult) / scenario.query.exactResult * 100);

          setDpResult({
            value: dpValue,
            noise: noiseParams.magnitude,
            error: error,
            privacyGuarantee: `ε=${selectedBudget.epsilon}, δ=${selectedBudget.delta}`
          });
          setTimeout(() => setPhase('privacy-guarantee'), 1500);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (phase === 'privacy-guarantee') {
      const timer = setTimeout(() => setPhase('comparison'), 2000);
      return () => clearTimeout(timer);
    }

    if (phase === 'comparison') {
      const items = ['exact', 'dp', 'impact'];
      items.forEach((item, index) => {
        setTimeout(() => {
          setRevealedComparisons(prev => new Set([...prev, item]));
          if (index === items.length - 1) {
            setTimeout(() => setPhase('complete'), 1000);
          }
        }, index * 600);
      });
    }
  }, [phase, animatedPhase, selectedBudget, noiseParams, scenario.query.exactResult, scenario.query.sensitivity, scenario.privacyBudgets]);

  const handleStart = () => {
    setPhase('query');
    setAnimatedPhase(false);
    setSelectedBudget(null);
    setNoiseParams(null);
    setDpResult(null);
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
              {scenario.name} Differential Privacy
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
                    phase === 'query' ? '14%' :
                    phase === 'privacy-budget' ? '28%' :
                    phase === 'noise-calculation' ? '42%' :
                    phase === 'result-generation' ? '56%' :
                    phase === 'privacy-guarantee' ? '70%' :
                    phase === 'comparison' ? '85%' :
                    '100%'
                }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span className={phase === 'query' ? 'text-cyan-400 font-semibold' : ''}>Query</span>
            <span className={phase === 'privacy-budget' ? 'text-cyan-400 font-semibold' : ''}>Budget</span>
            <span className={phase === 'noise-calculation' ? 'text-cyan-400 font-semibold' : ''}>Noise</span>
            <span className={phase === 'result-generation' ? 'text-cyan-400 font-semibold' : ''}>Result</span>
            <span className={phase === 'privacy-guarantee' ? 'text-cyan-400 font-semibold' : ''}>Guarantee</span>
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
              Start Differential Privacy Demo
            </button>
          </div>
        )}

        {phase === 'query' && (
          <div className={`transition-all duration-500 ${animatedPhase ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-cyan-400" />
                <h4 className="font-semibold text-white">Statistical Query</h4>
              </div>
              <div className="bg-gray-800 rounded p-3 mb-3">
                <div className="text-sm text-white mb-3">{scenario.query.question}</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-900 rounded p-3">
                    <div className="text-xs text-gray-400 mb-1">Exact Result</div>
                    <div className="text-lg font-bold text-red-400">
                      {scenario.query.unit}{scenario.query.exactResult.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">No privacy protection</div>
                  </div>
                  <div className="bg-gray-900 rounded p-3">
                    <div className="text-xs text-gray-400 mb-1">Sensitivity</div>
                    <div className="text-lg font-bold text-purple-400">
                      {scenario.query.unit}{scenario.query.sensitivity.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Maximum individual impact</div>
                  </div>
                </div>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-orange-300">
                    Direct query reveals exact statistics, enabling privacy attacks through auxiliary information
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(phase === 'privacy-budget' || phase === 'noise-calculation' || phase === 'result-generation' || phase === 'privacy-guarantee') && (
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-cyan-400" />
                <h4 className="font-semibold text-white">Statistical Query</h4>
              </div>
              <div className="text-sm text-gray-300">{scenario.query.question}</div>
            </div>

            {selectedBudget && (
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-5 h-5 text-purple-400" />
                  <h4 className="font-semibold text-white">Privacy Budget</h4>
                </div>
                <div className="bg-gray-800 rounded p-3 mb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-sm font-semibold text-white mb-1">
                        ε (epsilon) = {selectedBudget.epsilon}
                      </div>
                      <div className="text-xs text-gray-400">{selectedBudget.description}</div>
                    </div>
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      selectedBudget.strength === 'strong' ? 'bg-green-500/20 text-green-400' :
                      selectedBudget.strength === 'moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {selectedBudget.strength.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        selectedBudget.strength === 'strong' ? 'bg-green-500' :
                        selectedBudget.strength === 'moderate' ? 'bg-yellow-500' :
                        'bg-orange-500'
                      }`}
                      style={{
                        width: selectedBudget.strength === 'strong' ? '20%' :
                               selectedBudget.strength === 'moderate' ? '50%' : '90%'
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Strong Privacy</span>
                    <span>Weak Privacy</span>
                  </div>
                </div>
                <div className="bg-gray-800 rounded p-3">
                  <div className="text-xs text-gray-400 mb-1">δ (delta) = {selectedBudget.delta}</div>
                  <div className="text-xs text-gray-500">Probability of privacy breach</div>
                </div>
              </div>
            )}

            {noiseParams && (
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h4 className="font-semibold text-white">Noise Injection</h4>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-800 rounded p-3">
                    <div className="text-xs text-gray-400 mb-2">Mechanism</div>
                    <div className="text-sm text-white font-semibold">{noiseParams.distribution} Distribution</div>
                  </div>
                  <div className="bg-gray-800 rounded p-3">
                    <div className="text-xs text-gray-400 mb-2">Noise Scale (Sensitivity / ε)</div>
                    <div className="text-sm text-white font-mono">
                      {scenario.query.sensitivity.toLocaleString()} / {selectedBudget?.epsilon} = {noiseParams.scale.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded p-3">
                    <div className="text-xs text-gray-400 mb-2">Noise Added</div>
                    <div className={`text-sm font-semibold ${noiseParams.magnitude >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {noiseParams.magnitude >= 0 ? '+' : ''}{scenario.query.unit}{noiseParams.magnitude.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {dpResult && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h4 className="font-semibold text-white">Differentially Private Result</h4>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-gray-800 rounded p-3">
                    <div className="text-xs text-gray-400 mb-1">DP Result</div>
                    <div className="text-lg font-bold text-green-400">
                      {scenario.query.unit}{dpResult.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded p-3">
                    <div className="text-xs text-gray-400 mb-1">Relative Error</div>
                    <div className="text-lg font-bold text-cyan-400">
                      {dpResult.error.toFixed(2)}%
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded p-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <div className="text-xs text-gray-400">Privacy Guarantee:</div>
                    <div className="text-sm font-mono text-purple-300">{dpResult.privacyGuarantee}</div>
                  </div>
                </div>
              </div>
            )}

            {phase === 'privacy-guarantee' && (
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-cyan-400 mb-2">Mathematical Privacy Guarantee</div>
                    <p className="text-sm text-gray-300 mb-2">
                      With (ε, δ)-differential privacy, the presence or absence of any individual's data changes
                      the probability of any output by at most a factor of e^ε, except with probability δ.
                    </p>
                    <div className="text-xs text-gray-400">
                      This provides <span className="text-cyan-400 font-semibold">plausible deniability</span> for
                      all individuals in the dataset.
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

            {revealedComparisons.has('exact') && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-red-400 mb-2">Exact Statistics (No Privacy)</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Perfect accuracy: {scenario.query.unit}{scenario.query.exactResult.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        No privacy protection whatsoever
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Vulnerable to membership inference attacks
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Individuals can be re-identified with auxiliary data
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {revealedComparisons.has('dp') && dpResult && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-green-400 mb-2">Differential Privacy</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Approximate result: {scenario.query.unit}{dpResult.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({dpResult.error.toFixed(2)}% error)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Mathematical privacy guarantee ({dpResult.privacyGuarantee})
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Plausible deniability for all individuals
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Resistant to auxiliary information attacks
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
                      Differential Privacy provides a rigorous mathematical framework for privacy-preserving data analysis.
                      By adding calibrated noise proportional to the query's sensitivity and inverse to the privacy budget (ε),
                      it ensures that the presence or absence of any individual's data has minimal impact on query results.
                      This enables useful statistical analysis while providing provable privacy guarantees—the gold standard
                      for privacy protection in machine learning and AI systems.
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
              <Lock className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-purple-400">Privacy Budget (ε):</span> Controls privacy-utility tradeoff; smaller ε = stronger privacy, more noise
              </div>
            </div>
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-yellow-400">Sensitivity:</span> Maximum change in query result from adding/removing one individual
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-orange-400">Laplace Noise:</span> Random noise drawn from Laplace distribution with scale = sensitivity / ε
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-cyan-400">Privacy Guarantee:</span> Mathematically provable bound on information leakage about individuals
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}