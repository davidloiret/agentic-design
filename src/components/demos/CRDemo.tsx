'use client';

import React, { useState, useEffect } from 'react';
import { Zap, TrendingDown, Search, GitBranch, CheckCircle, AlertTriangle, Lightbulb, PlayCircle, RotateCcw, Target, Activity } from 'lucide-react';

interface CausalHypothesis {
  id: string;
  cause: string;
  effect: string;
  mechanism: string[];
  strength: number;
  isValid: boolean;
  confounds: string[];
}

interface InterventionTest {
  id: string;
  action: string;
  prediction: string;
  result: string;
  confirmed: boolean;
}

interface Scenario {
  id: string;
  title: string;
  observation: string;
  initialEffect: string;
  hypotheses: CausalHypothesis[];
  counterfactual: string;
  intervention: InterventionTest;
  causalModel: string;
}

const CRDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('sales');
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'observation' | 'hypotheses' | 'mechanisms' | 'confounds' | 'counterfactual' | 'intervention' | 'complete'>('observation');
  const [revealedHypotheses, setRevealedHypotheses] = useState<Set<string>>(new Set());
  const [activeHypothesis, setActiveHypothesis] = useState<string | null>(null);
  const [mechanismsRevealed, setMechanismsRevealed] = useState<Set<string>>(new Set());
  const [confoundsChecked, setConfoundsChecked] = useState<Set<string>>(new Set());
  const [showCounterfactual, setShowCounterfactual] = useState(false);
  const [interventionTested, setInterventionTested] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  const scenarios: Scenario[] = [
    {
      id: 'sales',
      title: 'Website Sales Drop',
      observation: 'Sales dropped 30% after website redesign last month',
      initialEffect: '📉 30% revenue decline',
      hypotheses: [
        {
          id: 'redesign',
          cause: '💻 Website Redesign',
          effect: 'Confused users → Lower sales',
          mechanism: [
            '1. New checkout button hard to find',
            '2. Users get confused at checkout',
            '3. Users abandon carts',
            '4. Sales drop'
          ],
          strength: 85,
          isValid: true,
          confounds: ['Seasonal trends (ruled out)', 'Economic factors (stable)', 'Competition (no changes)']
        },
        {
          id: 'economy',
          cause: '🌍 Economic Downturn',
          effect: 'Reduced spending → Lower sales',
          mechanism: [
            '1. Economic indicators decline',
            '2. Consumer confidence drops',
            '3. Discretionary spending reduces',
            '4. Sales affected'
          ],
          strength: 30,
          isValid: false,
          confounds: ['Other retailers unaffected', 'Local economy stable', 'Unemployment unchanged']
        },
        {
          id: 'competitor',
          cause: '🏪 Competitor Sale Event',
          effect: 'Customer shift → Lower sales',
          mechanism: [
            '1. Rival launches promotional event',
            '2. Price advantage attracts customers',
            '3. Market share shifts',
            '4. Our sales drop'
          ],
          strength: 45,
          isValid: false,
          confounds: ['No major competitor events', 'Pricing unchanged', 'Market share stable']
        }
      ],
      counterfactual: 'If we had NOT redesigned the website, would sales still have dropped? Analysis: No other major changes occurred, suggesting redesign is causal.',
      intervention: {
        id: 'abtest',
        action: 'A/B test: Show 50% of users old design, 50% new design',
        prediction: 'If redesign causes the drop, old design should have higher conversion',
        result: 'Old design: 2.1% conversion | New design: 1.5% conversion',
        confirmed: true
      },
      causalModel: 'Website Redesign → UI Confusion → Cart Abandonment → Sales Drop (Causal chain confirmed)'
    },
    {
      id: 'performance',
      title: 'Server Performance',
      observation: 'API response time increased from 200ms to 800ms after deployment',
      initialEffect: '⏱️ 4x slower response time',
      hypotheses: [
        {
          id: 'code',
          cause: '💾 New Database Query',
          effect: 'Inefficient query → Slow responses',
          mechanism: [
            '1. New query added without index',
            '2. Full table scan on every request',
            '3. Database CPU spikes to 90%',
            '4. Response time increases'
          ],
          strength: 90,
          isValid: true,
          confounds: ['Traffic volume unchanged', 'Network latency stable', 'Server resources adequate']
        },
        {
          id: 'traffic',
          cause: '📈 Traffic Surge',
          effect: 'High load → Slow responses',
          mechanism: [
            '1. User traffic increases 5x',
            '2. Server capacity exceeded',
            '3. Queuing and throttling',
            '4. Response time degrades'
          ],
          strength: 25,
          isValid: false,
          confounds: ['Traffic logs show normal levels', 'Load balancer not saturated', 'No DDoS detected']
        },
        {
          id: 'network',
          cause: '🌐 Network Issues',
          effect: 'Packet loss → Slow responses',
          mechanism: [
            '1. ISP experiences problems',
            '2. Packet loss increases',
            '3. TCP retransmissions required',
            '4. Latency increases'
          ],
          strength: 20,
          isValid: false,
          confounds: ['Other services unaffected', 'Ping times normal', 'CDN performance stable']
        }
      ],
      counterfactual: 'If we had NOT deployed the new code, would response times still be slow? Rollback test shows old code runs at 200ms.',
      intervention: {
        id: 'addindex',
        action: 'Add database index on the queried column',
        prediction: 'If query is the cause, adding index should restore normal speed',
        result: 'After index: Response time drops to 210ms (near baseline)',
        confirmed: true
      },
      causalModel: 'Unindexed Query → Full Table Scan → Database Overload → Slow Response (Causal chain confirmed)'
    },
    {
      id: 'churn',
      title: 'Customer Churn',
      observation: 'Customer cancellation rate doubled from 5% to 10% per month',
      initialEffect: '👥 50% increase in churn rate',
      hypotheses: [
        {
          id: 'pricing',
          cause: '💰 Price Increase',
          effect: 'Higher cost → More cancellations',
          mechanism: [
            '1. Monthly fee increased by 20%',
            '2. Customers perceive less value',
            '3. Budget-conscious users cancel',
            '4. Churn rate increases'
          ],
          strength: 75,
          isValid: true,
          confounds: ['Competitor pricing similar', 'Premium tier unaffected', 'Value proposition unchanged']
        },
        {
          id: 'support',
          cause: '📞 Support Quality Drop',
          effect: 'Poor service → Frustrated users leave',
          mechanism: [
            '1. Support team turnover',
            '2. Response time increases',
            '3. Customer satisfaction drops',
            '4. Users cancel'
          ],
          strength: 40,
          isValid: false,
          confounds: ['CSAT scores stable', 'Response times unchanged', 'Support volume normal']
        },
        {
          id: 'feature',
          cause: '🚀 Missing Key Feature',
          effect: 'Competitor advantage → Customer loss',
          mechanism: [
            '1. Competitor launches popular feature',
            '2. Feature gap becomes apparent',
            '3. Users switch for that feature',
            '4. Churn increases'
          ],
          strength: 50,
          isValid: false,
          confounds: ['Feature surveys show low demand', 'Switchers cite price not features', 'Usage patterns unchanged']
        }
      ],
      counterfactual: 'If we had NOT raised prices, would churn still increase? Historical data shows churn was stable before price change.',
      intervention: {
        id: 'discount',
        action: 'Offer existing customers a 15% loyalty discount',
        prediction: 'If price is the cause, discount should reduce churn',
        result: 'After discount: Churn drops to 6.5% (significant improvement)',
        confirmed: true
      },
      causalModel: 'Price Increase → Perceived Value Drop → Budget Reevaluation → Cancellation (Causal chain confirmed)'
    }
  ];

  const getCurrentScenario = (): Scenario => {
    return scenarios.find(s => s.id === selectedScenario) || scenarios[0];
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentPhase('observation');
    setRevealedHypotheses(new Set());
    setActiveHypothesis(null);
    setMechanismsRevealed(new Set());
    setConfoundsChecked(new Set());
    setShowCounterfactual(false);
    setInterventionTested(false);
    setAnimationProgress(0);
  };

  const runCausalReasoning = async () => {
    resetDemo();
    setIsRunning(true);
    const scenario = getCurrentScenario();

    // Phase 1: Observation
    setCurrentPhase('observation');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Phase 2: Generate Hypotheses
    setCurrentPhase('hypotheses');
    for (const hyp of scenario.hypotheses) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setRevealedHypotheses(prev => new Set([...prev, hyp.id]));
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Phase 3: Explore Mechanisms
    setCurrentPhase('mechanisms');
    for (const hyp of scenario.hypotheses) {
      setActiveHypothesis(hyp.id);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setMechanismsRevealed(prev => new Set([...prev, hyp.id]));
      setActiveHypothesis(null);
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    // Phase 4: Check Confounds
    setCurrentPhase('confounds');
    for (const hyp of scenario.hypotheses) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setConfoundsChecked(prev => new Set([...prev, hyp.id]));
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Phase 5: Counterfactual
    setCurrentPhase('counterfactual');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowCounterfactual(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Phase 6: Intervention
    setCurrentPhase('intervention');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setAnimationProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setInterventionTested(true);
      }
    }, 150);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setCurrentPhase('complete');
    setIsRunning(false);
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'observation': return 'bg-red-950 border-red-800';
      case 'hypotheses': return 'bg-yellow-950 border-yellow-800';
      case 'mechanisms': return 'bg-blue-950 border-blue-800';
      case 'confounds': return 'bg-purple-950 border-purple-800';
      case 'counterfactual': return 'bg-indigo-950 border-indigo-800';
      case 'intervention': return 'bg-green-950 border-green-800';
      case 'complete': return 'bg-green-950 border-green-600';
      default: return 'bg-gray-900 border-gray-700';
    }
  };

  const scenario = getCurrentScenario();
  const validHypothesis = scenario.hypotheses.find(h => h.isValid);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Causal Reasoning Demo</h2>
        <p className="text-gray-400 mb-6">
          Establish explicit cause-and-effect relationships through mechanism exploration,
          confound checking, counterfactual analysis, and intervention testing.
        </p>

        {/* Scenario Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200">Select Scenario</h3>
          <div className="flex flex-wrap gap-3">
            {scenarios.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedScenario(s.id);
                  resetDemo();
                }}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedScenario === s.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Phase Pipeline */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Causal Analysis Pipeline
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {['observation', 'hypotheses', 'mechanisms', 'confounds', 'counterfactual', 'intervention'].map((phase) => (
              <div
                key={phase}
                className={`px-2 py-2 rounded-lg border-2 transition-all ${
                  currentPhase === phase
                    ? getPhaseColor(phase) + ' scale-105'
                    : currentPhase === 'complete' || ['observation', 'hypotheses', 'mechanisms', 'confounds', 'counterfactual', 'intervention'].indexOf(currentPhase) > ['observation', 'hypotheses', 'mechanisms', 'confounds', 'counterfactual', 'intervention'].indexOf(phase)
                    ? 'bg-gray-800 border-green-700'
                    : 'bg-gray-900 border-gray-700'
                }`}
              >
                <p className="text-xs font-medium text-gray-300 capitalize text-center">
                  {phase}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Observation */}
        <div className={`mb-6 p-4 rounded-lg border-2 transition-all ${
          currentPhase === 'observation' ? 'bg-red-950 border-red-800' : 'bg-gray-900 border-gray-700'
        }`}>
          <h3 className="text-lg font-semibold mb-2 text-gray-200 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-400" />
            Observation (Correlation)
          </h3>
          <p className="text-white text-lg mb-1">{scenario.observation}</p>
          <p className="text-red-300 font-semibold">{scenario.initialEffect}</p>
          <p className="text-xs text-gray-400 mt-2">❓ Question: Is this just correlation, or is there causation?</p>
        </div>

        {/* Causal Hypotheses */}
        {currentPhase !== 'observation' && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <Search className="w-5 h-5 text-yellow-400" />
              Causal Hypotheses
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {scenario.hypotheses.map(hyp => {
                const isRevealed = revealedHypotheses.has(hyp.id);
                const isActive = activeHypothesis === hyp.id;
                const mechanismRevealed = mechanismsRevealed.has(hyp.id);
                const confoundChecked = confoundsChecked.has(hyp.id);

                return (
                  <div
                    key={hyp.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isActive ? 'bg-blue-950 border-blue-600 scale-105' :
                      confoundChecked && hyp.isValid ? 'bg-green-950 border-green-600' :
                      confoundChecked && !hyp.isValid ? 'bg-gray-900 border-gray-600 opacity-60' :
                      mechanismRevealed ? 'bg-purple-950 border-purple-700' :
                      isRevealed ? 'bg-gray-800 border-yellow-600' :
                      'bg-gray-900 border-gray-700 opacity-40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{hyp.cause}</h4>
                      {confoundChecked && (
                        hyp.isValid ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-gray-500" />
                        )
                      )}
                    </div>

                    {isRevealed && (
                      <>
                        <p className="text-sm text-gray-300 mb-2">{hyp.effect}</p>

                        {mechanismRevealed && (
                          <div className="mb-2 pt-2 border-t border-gray-700">
                            <p className="text-xs font-medium text-blue-300 mb-1">Causal Mechanism:</p>
                            <div className="space-y-1">
                              {hyp.mechanism.map((step, idx) => (
                                <p key={idx} className="text-xs text-gray-300">{step}</p>
                              ))}
                            </div>
                          </div>
                        )}

                        {confoundChecked && (
                          <div className="pt-2 border-t border-gray-700">
                            <p className="text-xs font-medium text-purple-300 mb-1">
                              {hyp.isValid ? '✓ Confounds Ruled Out:' : '✗ Confounds Present:'}
                            </p>
                            <div className="space-y-0.5">
                              {hyp.confounds.map((conf, idx) => (
                                <p key={idx} className="text-xs text-gray-400">{conf}</p>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-gray-500">Causal Strength</span>
                          <div className="flex items-center gap-1">
                            <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-500 ${
                                  hyp.isValid ? 'bg-green-500' : 'bg-gray-500'
                                }`}
                                style={{ width: isRevealed ? `${hyp.strength}%` : '0%' }}
                              />
                            </div>
                            <span className={`text-xs font-bold ${hyp.isValid ? 'text-green-400' : 'text-gray-500'}`}>
                              {hyp.strength}%
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Counterfactual Analysis */}
        {showCounterfactual && (
          <div className={`mb-6 p-4 rounded-lg border-2 transition-all ${
            currentPhase === 'counterfactual' ? 'bg-indigo-950 border-indigo-800' : 'bg-gray-900 border-indigo-700'
          }`}>
            <h3 className="text-lg font-semibold mb-2 text-indigo-300 flex items-center gap-2">
              <GitBranch className="w-5 h-5" />
              Counterfactual Analysis
            </h3>
            <p className="text-white">{scenario.counterfactual}</p>
          </div>
        )}

        {/* Intervention Testing */}
        {(currentPhase === 'intervention' || currentPhase === 'complete') && validHypothesis && (
          <div className="mb-6 bg-green-950 border-2 border-green-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-green-300 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Causal Intervention Test
            </h3>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-green-300 mb-1">Action:</p>
                <p className="text-white">{scenario.intervention.action}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-green-300 mb-1">Prediction:</p>
                <p className="text-gray-300 text-sm">{scenario.intervention.prediction}</p>
              </div>

              {currentPhase === 'intervention' && !interventionTested && (
                <div className="pt-2">
                  <p className="text-xs text-gray-400 mb-2">Testing intervention...</p>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${animationProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {interventionTested && (
                <>
                  <div>
                    <p className="text-xs font-medium text-green-300 mb-1">Result:</p>
                    <p className="text-white font-semibold">{scenario.intervention.result}</p>
                  </div>

                  <div className="bg-green-900/50 rounded p-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <p className="text-sm text-green-200">
                      ✓ Causation confirmed through intervention testing
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Causal Model */}
        {currentPhase === 'complete' && (
          <div className="mb-6 bg-cyan-950 border-2 border-cyan-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-cyan-300 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Confirmed Causal Model
            </h3>
            <p className="text-white text-lg font-mono">{scenario.causalModel}</p>
            <p className="text-sm text-cyan-300 mt-2">
              ✓ Evidence-based causal chain established through mechanism analysis, confound control, and intervention testing
            </p>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex gap-3">
          <button
            onClick={runCausalReasoning}
            disabled={isRunning}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2"
          >
            {isRunning ? (
              <>
                <Activity className="w-5 h-5 animate-pulse" />
                Running Causal Analysis...
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5" />
                Run Causal Reasoning
              </>
            )}
          </button>
          <button
            onClick={resetDemo}
            disabled={isRunning}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>

        {/* How It Works */}
        <div className="mt-6 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            How Causal Reasoning Works
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">1.</span>
              <div>
                <p className="font-medium text-gray-200">Observation & Correlation</p>
                <p className="text-xs text-gray-400">Identify patterns but don't assume causation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">2.</span>
              <div>
                <p className="font-medium text-gray-200">Generate Causal Hypotheses</p>
                <p className="text-xs text-gray-400">Consider multiple potential causes for the observed effect</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">3.</span>
              <div>
                <p className="font-medium text-gray-200">Explore Mechanisms</p>
                <p className="text-xs text-gray-400">Understand HOW causes produce effects through step-by-step pathways</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">4.</span>
              <div>
                <p className="font-medium text-gray-200">Check Confounds</p>
                <p className="text-xs text-gray-400">Rule out alternative explanations and verify assumptions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">5.</span>
              <div>
                <p className="font-medium text-gray-200">Counterfactual Analysis</p>
                <p className="text-xs text-gray-400">Consider: "What if the cause hadn't occurred?"</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">6.</span>
              <div>
                <p className="font-medium text-gray-200">Test with Intervention</p>
                <p className="text-xs text-gray-400">Validate causal model by manipulating the cause and observing effect</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insight */}
        <div className="mt-6 bg-purple-950 border border-purple-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-purple-300">Key Insight</h3>
          <p className="text-sm text-purple-200">
            Causal reasoning goes beyond correlation by establishing <strong>mechanisms, ruling out confounds, and testing interventions</strong>.
            This enables accurate prediction of "what if" scenarios and design of effective solutions that address root causes, not just symptoms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CRDemo;