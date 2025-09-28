'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Lock, Eye, EyeOff, Users, Zap, Calculator } from 'lucide-react';

interface Party {
  id: string;
  name: string;
  privateData: number;
  shares: number[];
  revealed: boolean;
}

interface ComputationStep {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'active' | 'complete';
}

interface Scenario {
  id: string;
  name: string;
  context: string;
  question: string;
  parties: Party[];
  unit: string;
}

const scenarios: Scenario[] = [
  {
    id: 'banking',
    name: 'Banking Fraud',
    context: 'Three banks detecting cross-bank fraud patterns',
    question: 'Total suspicious transactions across all banks',
    parties: [
      {
        id: 'bank-a',
        name: 'Bank A',
        privateData: 127,
        shares: [],
        revealed: false
      },
      {
        id: 'bank-b',
        name: 'Bank B',
        privateData: 89,
        shares: [],
        revealed: false
      },
      {
        id: 'bank-c',
        name: 'Bank C',
        privateData: 143,
        shares: [],
        revealed: false
      }
    ],
    unit: ' transactions'
  },
  {
    id: 'healthcare',
    name: 'Healthcare Research',
    context: 'Three hospitals analyzing patient outcomes',
    question: 'Average recovery time across all hospitals',
    parties: [
      {
        id: 'hospital-1',
        name: 'Hospital 1',
        privateData: 12,
        shares: [],
        revealed: false
      },
      {
        id: 'hospital-2',
        name: 'Hospital 2',
        privateData: 15,
        shares: [],
        revealed: false
      },
      {
        id: 'hospital-3',
        name: 'Hospital 3',
        privateData: 14,
        shares: [],
        revealed: false
      }
    ],
    unit: ' days'
  },
  {
    id: 'salary',
    name: 'Salary Benchmarking',
    context: 'Three companies benchmarking salaries',
    question: 'Industry average salary (without revealing individual company data)',
    parties: [
      {
        id: 'company-a',
        name: 'Company A',
        privateData: 95000,
        shares: [],
        revealed: false
      },
      {
        id: 'company-b',
        name: 'Company B',
        privateData: 102000,
        shares: [],
        revealed: false
      },
      {
        id: 'company-c',
        name: 'Company C',
        privateData: 88000,
        shares: [],
        revealed: false
      }
    ],
    unit: '$'
  }
];

type Phase = 'idle' | 'private-data' | 'secret-sharing' | 'share-distribution' | 'computation' | 'reconstruction' | 'result' | 'comparison' | 'complete';

export default function SMPCDemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id);
  const [phase, setPhase] = useState<Phase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);

  const [parties, setParties] = useState<Party[]>([]);
  const [computationSteps, setComputationSteps] = useState<ComputationStep[]>([
    {
      id: 'sharing',
      name: 'Secret Sharing',
      description: 'Split private data into encrypted shares',
      status: 'idle'
    },
    {
      id: 'distribution',
      name: 'Share Distribution',
      description: 'Distribute shares to all parties',
      status: 'idle'
    },
    {
      id: 'computation',
      name: 'Secure Computation',
      description: 'Compute on encrypted shares',
      status: 'idle'
    },
    {
      id: 'reconstruction',
      name: 'Result Reconstruction',
      description: 'Combine shares to reveal only final result',
      status: 'idle'
    }
  ]);

  const [computedResult, setComputedResult] = useState<number | null>(null);
  const [revealedComparisons, setRevealedComparisons] = useState<Set<string>>(new Set());

  const scenario = scenarios.find(s => s.id === selectedScenario)!;

  useEffect(() => {
    setPhase('idle');
    setAnimatedPhase(false);
    setParties(scenario.parties.map(p => ({ ...p, shares: [], revealed: false })));
    setComputationSteps([
      {
        id: 'sharing',
        name: 'Secret Sharing',
        description: 'Split private data into encrypted shares',
        status: 'idle'
      },
      {
        id: 'distribution',
        name: 'Share Distribution',
        description: 'Distribute shares to all parties',
        status: 'idle'
      },
      {
        id: 'computation',
        name: 'Secure Computation',
        description: 'Compute on encrypted shares',
        status: 'idle'
      },
      {
        id: 'reconstruction',
        name: 'Result Reconstruction',
        description: 'Combine shares to reveal only final result',
        status: 'idle'
      }
    ]);
    setComputedResult(null);
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

    if (phase === 'private-data') {
      const timer = setTimeout(() => setPhase('secret-sharing'), 2500);
      return () => clearTimeout(timer);
    }

    if (phase === 'secret-sharing') {
      setComputationSteps(prev => prev.map(s =>
        s.id === 'sharing' ? { ...s, status: 'active' } : s
      ));

      const timer = setTimeout(() => {
        // Generate secret shares using additive secret sharing
        // For each party, split their data into n shares that sum to the original value
        const updatedParties = parties.map(party => {
          const n = parties.length;
          const shares: number[] = [];
          let sum = 0;

          // Generate n-1 random shares
          for (let i = 0; i < n - 1; i++) {
            const randomShare = Math.floor(Math.random() * party.privateData * 2) - party.privateData;
            shares.push(randomShare);
            sum += randomShare;
          }

          // Last share ensures sum equals original value
          shares.push(party.privateData - sum);

          return { ...party, shares };
        });

        setParties(updatedParties);
        setComputationSteps(prev => prev.map(s =>
          s.id === 'sharing' ? { ...s, status: 'complete' } : s
        ));
        setTimeout(() => setPhase('share-distribution'), 1000);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (phase === 'share-distribution') {
      setComputationSteps(prev => prev.map(s =>
        s.id === 'distribution' ? { ...s, status: 'active' } : s
      ));

      const timer = setTimeout(() => {
        setComputationSteps(prev => prev.map(s =>
          s.id === 'distribution' ? { ...s, status: 'complete' } : s
        ));
        setTimeout(() => setPhase('computation'), 1000);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (phase === 'computation') {
      setComputationSteps(prev => prev.map(s =>
        s.id === 'computation' ? { ...s, status: 'active' } : s
      ));

      const timer = setTimeout(() => {
        setComputationSteps(prev => prev.map(s =>
          s.id === 'computation' ? { ...s, status: 'complete' } : s
        ));
        setTimeout(() => setPhase('reconstruction'), 1000);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (phase === 'reconstruction') {
      setComputationSteps(prev => prev.map(s =>
        s.id === 'reconstruction' ? { ...s, status: 'active' } : s
      ));

      const timer = setTimeout(() => {
        // Compute sum of all private data
        const sum = parties.reduce((acc, party) => acc + party.privateData, 0);
        const result = selectedScenario === 'healthcare' ? sum / parties.length : sum;

        setComputedResult(result);
        setComputationSteps(prev => prev.map(s =>
          s.id === 'reconstruction' ? { ...s, status: 'complete' } : s
        ));
        setTimeout(() => setPhase('result'), 1000);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (phase === 'result') {
      const timer = setTimeout(() => setPhase('comparison'), 2000);
      return () => clearTimeout(timer);
    }

    if (phase === 'comparison') {
      const items = ['traditional', 'smpc', 'impact'];
      items.forEach((item, index) => {
        setTimeout(() => {
          setRevealedComparisons(prev => new Set([...prev, item]));
          if (index === items.length - 1) {
            setTimeout(() => setPhase('complete'), 1000);
          }
        }, index * 600);
      });
    }
  }, [phase, animatedPhase, parties, selectedScenario]);

  const handleStart = () => {
    setPhase('private-data');
    setAnimatedPhase(false);
    setParties(scenario.parties.map(p => ({ ...p, shares: [], revealed: false })));
    setComputationSteps([
      {
        id: 'sharing',
        name: 'Secret Sharing',
        description: 'Split private data into encrypted shares',
        status: 'idle'
      },
      {
        id: 'distribution',
        name: 'Share Distribution',
        description: 'Distribute shares to all parties',
        status: 'idle'
      },
      {
        id: 'computation',
        name: 'Secure Computation',
        description: 'Compute on encrypted shares',
        status: 'idle'
      },
      {
        id: 'reconstruction',
        name: 'Result Reconstruction',
        description: 'Combine shares to reveal only final result',
        status: 'idle'
      }
    ]);
    setComputedResult(null);
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
              {scenario.name} SMPC
            </h3>
            <p className="text-gray-400 text-sm mb-1">
              Context: {scenario.context}
            </p>
            <p className="text-gray-300 text-sm font-medium">
              Goal: {scenario.question}
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
                    phase === 'private-data' ? '12.5%' :
                    phase === 'secret-sharing' ? '25%' :
                    phase === 'share-distribution' ? '37.5%' :
                    phase === 'computation' ? '50%' :
                    phase === 'reconstruction' ? '62.5%' :
                    phase === 'result' ? '75%' :
                    phase === 'comparison' ? '87.5%' :
                    '100%'
                }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span className={phase === 'private-data' ? 'text-cyan-400 font-semibold' : ''}>Private</span>
            <span className={phase === 'secret-sharing' ? 'text-cyan-400 font-semibold' : ''}>Share</span>
            <span className={phase === 'share-distribution' ? 'text-cyan-400 font-semibold' : ''}>Distribute</span>
            <span className={phase === 'computation' ? 'text-cyan-400 font-semibold' : ''}>Compute</span>
            <span className={phase === 'reconstruction' ? 'text-cyan-400 font-semibold' : ''}>Reconstruct</span>
            <span className={phase === 'result' ? 'text-cyan-400 font-semibold' : ''}>Result</span>
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
              Start SMPC Protocol
            </button>
          </div>
        )}

        {phase === 'private-data' && (
          <div className={`transition-all duration-500 ${animatedPhase ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-purple-400" />
                <h4 className="font-semibold text-white">Parties with Private Data</h4>
              </div>
              <div className="space-y-3">
                {parties.map((party) => (
                  <div key={party.id} className="bg-gray-800 rounded p-3 border-2 border-purple-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-purple-400" />
                        <span className="font-medium text-white">{party.name}</span>
                      </div>
                      <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                        Private
                      </span>
                    </div>
                    <div className="bg-purple-900/30 rounded p-2">
                      <div className="text-xs text-purple-300 mb-1">Private Data (Secret)</div>
                      <div className="text-lg font-bold text-purple-400">
                        {scenario.id === 'salary' ? scenario.unit : ''}{party.privateData.toLocaleString()}{scenario.id !== 'salary' ? scenario.unit : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-orange-500/10 border border-orange-500/30 rounded p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-orange-300">
                    Parties cannot share their private data due to privacy laws, competitive concerns, and regulatory compliance
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(phase === 'secret-sharing' || phase === 'share-distribution' || phase === 'computation' || phase === 'reconstruction' || phase === 'result') && (
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-cyan-400" />
                <h4 className="font-semibold text-white">SMPC Protocol Steps</h4>
              </div>
              <div className="space-y-3">
                {computationSteps.map((step) => (
                  <div key={step.id} className="bg-gray-800 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{step.name}</span>
                      {step.status === 'idle' && (
                        <span className="text-xs text-gray-400">Pending</span>
                      )}
                      {step.status === 'active' && (
                        <span className="text-xs text-cyan-400">Processing...</span>
                      )}
                      {step.status === 'complete' && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <div className="text-xs text-gray-400">{step.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {parties[0].shares.length > 0 && (
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-5 h-5 text-yellow-400" />
                  <h4 className="font-semibold text-white">Encrypted Shares</h4>
                </div>
                <div className="space-y-3">
                  {parties.map((party) => (
                    <div key={party.id} className="bg-gray-800 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{party.name}</span>
                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                          Encrypted
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {party.shares.map((share, idx) => (
                          <div key={idx} className="bg-gray-900 rounded p-2">
                            <div className="text-xs text-gray-400 mb-1">Share {idx + 1}</div>
                            <div className="text-sm font-mono text-yellow-300">{share}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Shares sum to original value, but individual shares reveal nothing
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {computedResult !== null && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-5 h-5 text-green-400" />
                  <h4 className="font-semibold text-white">Secure Computation Result</h4>
                </div>
                <div className="bg-gray-800 rounded p-4 text-center">
                  <div className="text-sm text-gray-400 mb-2">{scenario.question}</div>
                  <div className="text-3xl font-bold text-green-400">
                    {scenario.id === 'salary' ? scenario.unit : ''}{Math.round(computedResult).toLocaleString()}{scenario.id !== 'salary' ? scenario.unit : ''}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Computed without revealing individual private data
                  </div>
                </div>
                <div className="mt-3 bg-green-900/30 rounded p-3">
                  <div className="flex items-center gap-2">
                    <EyeOff className="w-4 h-4 text-green-400" />
                    <div className="text-xs text-green-300">
                      Privacy Preserved: Each party's private data remains secret
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

            {revealedComparisons.has('traditional') && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-red-400 mb-2">Traditional Data Sharing</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        All parties reveal raw private data
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Violates privacy laws (GDPR, HIPAA)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Exposes competitive intelligence
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Creates single point of failure for data breach
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {revealedComparisons.has('smpc') && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-green-400 mb-2">Secure Multi-Party Computation</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Private data never leaves each party's control
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Cryptographic guarantees of privacy preservation
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Compute on encrypted shares, reveal only final result
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Compliant with privacy regulations
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
                      Secure Multi-Party Computation enables privacy-preserving collaboration between multiple AI agents
                      or organizations. Through cryptographic secret sharing, parties split their private data into
                      encrypted shares, perform computations on those shares, and reconstruct only the final result—without
                      ever revealing individual private inputs. This enables valuable cross-organizational AI applications
                      (fraud detection, medical research, benchmarking) while maintaining strict privacy guarantees essential
                      for regulatory compliance and competitive protection.
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
                <span className="font-semibold text-purple-400">Secret Sharing:</span> Each party splits their private data into encrypted shares using additive secret sharing
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-yellow-400">Share Distribution:</span> Shares distributed to all parties; individual shares reveal nothing about original data
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calculator className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-orange-400">Secure Computation:</span> Parties jointly compute on encrypted shares using cryptographic protocols
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-cyan-400">Result Reconstruction:</span> Shares combined to reveal only final result, preserving privacy of all inputs
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}