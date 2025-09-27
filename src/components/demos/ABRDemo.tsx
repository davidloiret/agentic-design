'use client';

import React, { useState, useEffect } from 'react';
import { Search, Lightbulb, TrendingUp, CheckCircle, AlertCircle, HelpCircle, PlayCircle, RotateCcw, Eye, Target, Sparkles } from 'lucide-react';

interface Evidence {
  id: string;
  observation: string;
  type: 'fact' | 'missing' | 'anomaly';
  icon: string;
}

interface Hypothesis {
  id: string;
  explanation: string;
  reasoning: string;
  evidenceFit: {
    explains: string[];
    doesNotExplain: string[];
    predictions: string[];
  };
  plausibilityScore: number;
  complexity: 'simple' | 'moderate' | 'complex';
  priorProbability: 'high' | 'medium' | 'low';
  isBest: boolean;
}

interface Scenario {
  id: string;
  title: string;
  context: string;
  incompleteEvidence: Evidence[];
  hypotheses: Hypothesis[];
  bestExplanation: string;
  confirmation: string;
}

const ABRDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('system');
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'observation' | 'generation' | 'evaluation' | 'ranking' | 'selection' | 'confirmation' | 'complete'>('observation');
  const [revealedEvidence, setRevealedEvidence] = useState<Set<string>>(new Set());
  const [generatedHypotheses, setGeneratedHypotheses] = useState<Set<string>>(new Set());
  const [evaluatedHypotheses, setEvaluatedHypotheses] = useState<Set<string>>(new Set());
  const [activeHypothesis, setActiveHypothesis] = useState<string | null>(null);
  const [showRankings, setShowRankings] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  const scenarios: Scenario[] = [
    {
      id: 'system',
      title: 'Server Crash Investigation',
      context: 'Production server crashed at 3 AM. System logs are incomplete. Need to determine root cause.',
      incompleteEvidence: [
        { id: 'e1', observation: 'Server crashed at 3:00 AM', type: 'fact', icon: '💥' },
        { id: 'e2', observation: 'High CPU usage logged (95%)', type: 'fact', icon: '📊' },
        { id: 'e3', observation: 'New code deployed yesterday', type: 'fact', icon: '🚀' },
        { id: 'e4', observation: 'No error logs found', type: 'missing', icon: '❓' },
        { id: 'e5', observation: 'Memory usage normal before crash', type: 'fact', icon: '💾' },
        { id: 'e6', observation: 'Network traffic spike at 2:45 AM', type: 'anomaly', icon: '📈' }
      ],
      hypotheses: [
        {
          id: 'h1',
          explanation: 'Code Bug (Memory Leak)',
          reasoning: 'New deployment introduced infinite loop or memory leak causing gradual CPU spike',
          evidenceFit: {
            explains: ['Timing fits deployment', 'CPU spike pattern', 'Memory behavior'],
            doesNotExplain: ['Missing error logs unusual', 'Network spike timing'],
            predictions: ['Code diff shows loop', 'Restart triggers recurrence', 'Memory grows over time']
          },
          plausibilityScore: 70,
          complexity: 'simple',
          priorProbability: 'high',
          isBest: true
        },
        {
          id: 'h2',
          explanation: 'Cyber Attack (DDoS)',
          reasoning: 'Network spike indicates distributed denial of service overwhelming server',
          evidenceFit: {
            explains: ['Network traffic spike', 'CPU exhaustion', 'Timing (early morning)'],
            doesNotExplain: ['No security alerts', 'Normal memory', 'Attack pattern unclear'],
            predictions: ['Firewall shows malicious IPs', 'Traffic pattern is distributed', 'Similar attacks on other servers']
          },
          plausibilityScore: 25,
          complexity: 'moderate',
          priorProbability: 'medium',
          isBest: false
        },
        {
          id: 'h3',
          explanation: 'Hardware Failure (Thermal)',
          reasoning: 'Cooling fan failure caused thermal throttling and system instability',
          evidenceFit: {
            explains: ['CPU behavior', 'Crash timing'],
            doesNotExplain: ['Recent deployment timing', 'Network spike', 'High CPU usage pattern'],
            predictions: ['Temperature logs show spike', 'Hardware diagnostics fail', 'Physical inspection reveals issue']
          },
          plausibilityScore: 15,
          complexity: 'simple',
          priorProbability: 'low',
          isBest: false
        },
        {
          id: 'h4',
          explanation: 'Resource Exhaustion (DB Lock)',
          reasoning: 'Database deadlock from new code caused connection pool exhaustion',
          evidenceFit: {
            explains: ['CPU spike waiting on locks', 'Deployment timing', 'No error logs (timeout)'],
            doesNotExplain: ['Network spike', 'Crash vs freeze distinction'],
            predictions: ['DB logs show deadlock', 'Connection pool maxed', 'Query timeout in new code']
          },
          plausibilityScore: 45,
          complexity: 'moderate',
          priorProbability: 'medium',
          isBest: false
        }
      ],
      bestExplanation: 'Code bug is the most plausible explanation due to timing with deployment, CPU pattern fit, and simplicity (Occam\'s razor)',
      confirmation: 'Code review reveals infinite loop in batch processing job deployed yesterday. Hypothesis confirmed!'
    },
    {
      id: 'medical',
      title: 'Medical Diagnosis',
      context: 'Patient presents with unusual symptoms. Medical history is partially available.',
      incompleteEvidence: [
        { id: 'm1', observation: 'Persistent fatigue (3 weeks)', type: 'fact', icon: '😴' },
        { id: 'm2', observation: 'Unexplained weight loss (10 lbs)', type: 'fact', icon: '⚖️' },
        { id: 'm3', observation: 'Occasional night sweats', type: 'fact', icon: '🌡️' },
        { id: 'm4', observation: 'No fever or chills', type: 'fact', icon: '❄️' },
        { id: 'm5', observation: 'Recent travel history unknown', type: 'missing', icon: '❓' },
        { id: 'm6', observation: 'Elevated white blood cell count', type: 'anomaly', icon: '🔬' }
      ],
      hypotheses: [
        {
          id: 'm-h1',
          explanation: 'Thyroid Disorder (Hyperthyroidism)',
          reasoning: 'Overactive thyroid causing metabolic changes and systemic symptoms',
          evidenceFit: {
            explains: ['Fatigue', 'Weight loss', 'Night sweats', 'No infection signs'],
            doesNotExplain: ['Elevated WBC unusual for thyroid'],
            predictions: ['TSH levels abnormal', 'T3/T4 elevated', 'Heart rate elevated']
          },
          plausibilityScore: 55,
          complexity: 'simple',
          priorProbability: 'high',
          isBest: false
        },
        {
          id: 'm-h2',
          explanation: 'Chronic Infection (TB)',
          reasoning: 'Tuberculosis causing constitutional symptoms and immune response',
          evidenceFit: {
            explains: ['All symptoms match classic TB', 'WBC elevation', 'Night sweats pattern'],
            doesNotExplain: ['No fever is atypical', 'Travel history needed'],
            predictions: ['Chest X-ray shows infiltrates', 'TB test positive', 'Sputum culture positive']
          },
          plausibilityScore: 40,
          complexity: 'moderate',
          priorProbability: 'medium',
          isBest: false
        },
        {
          id: 'm-h3',
          explanation: 'Lymphoma (Cancer)',
          reasoning: 'Lymphatic system cancer causing B symptoms and blood abnormalities',
          evidenceFit: {
            explains: ['All classic B symptoms', 'WBC elevation', 'Weight loss pattern'],
            doesNotExplain: ['Would expect lymph node swelling'],
            predictions: ['CT scan shows enlarged nodes', 'Biopsy confirms malignancy', 'LDH elevated']
          },
          plausibilityScore: 65,
          complexity: 'complex',
          priorProbability: 'low',
          isBest: true
        },
        {
          id: 'm-h4',
          explanation: 'Chronic Stress/Depression',
          reasoning: 'Psychological factors manifesting as physical symptoms',
          evidenceFit: {
            explains: ['Fatigue', 'Weight changes', 'Sleep issues'],
            doesNotExplain: ['WBC elevation', 'Night sweats pattern', 'Severity of symptoms'],
            predictions: ['Psychological assessment positive', 'No organic findings', 'Stress markers elevated']
          },
          plausibilityScore: 20,
          complexity: 'simple',
          priorProbability: 'medium',
          isBest: false
        }
      ],
      bestExplanation: 'Lymphoma is most likely despite lower prior probability because it best explains ALL symptoms including WBC elevation',
      confirmation: 'CT scan reveals enlarged lymph nodes. Biopsy confirms Hodgkin\'s lymphoma. Early detection enables treatment!'
    },
    {
      id: 'security',
      title: 'Security Incident Analysis',
      context: 'Unusual activity detected on corporate network. Incomplete security logs available.',
      incompleteEvidence: [
        { id: 's1', observation: 'Multiple failed login attempts (user: admin)', type: 'fact', icon: '🔐' },
        { id: 's2', observation: 'Data exfiltration to unknown IP', type: 'anomaly', icon: '📤' },
        { id: 's3', observation: 'New user account created at 2 AM', type: 'anomaly', icon: '👤' },
        { id: 's4', observation: 'No malware detected by antivirus', type: 'fact', icon: '🛡️' },
        { id: 's5', observation: 'VPN logs incomplete', type: 'missing', icon: '❓' },
        { id: 's6', observation: 'Employee reported phishing email yesterday', type: 'fact', icon: '🎣' }
      ],
      hypotheses: [
        {
          id: 's-h1',
          explanation: 'Compromised Credentials (Phishing)',
          reasoning: 'Phishing email led to credential theft, enabling unauthorized access',
          evidenceFit: {
            explains: ['Failed logins (testing creds)', 'Account creation', 'Data exfiltration', 'No malware'],
            doesNotExplain: ['Timing between phishing and activity'],
            predictions: ['Email contained credential form', 'Employee clicked link', 'Creds match stolen database']
          },
          plausibilityScore: 80,
          complexity: 'simple',
          priorProbability: 'high',
          isBest: true
        },
        {
          id: 's-h2',
          explanation: 'Insider Threat (Malicious Employee)',
          reasoning: 'Disgruntled employee stealing data before leaving company',
          evidenceFit: {
            explains: ['Account creation', 'Data access', 'Failed admin attempts'],
            doesNotExplain: ['Phishing report timing', 'External IP destination'],
            predictions: ['Employee has resignation pending', 'Access patterns match work hours', 'Personal grievance documented']
          },
          plausibilityScore: 35,
          complexity: 'moderate',
          priorProbability: 'low',
          isBest: false
        },
        {
          id: 's-h3',
          explanation: 'Advanced Persistent Threat (APT)',
          reasoning: 'Sophisticated nation-state attack with zero-day exploit',
          evidenceFit: {
            explains: ['No malware detection', 'Sophisticated techniques', 'Data targeting'],
            doesNotExplain: ['Failed login attempts (too crude)', 'Timing inconsistent with APT stealth'],
            predictions: ['Sophisticated evasion techniques', 'Multiple systems compromised', 'High-value data targeted']
          },
          plausibilityScore: 15,
          complexity: 'complex',
          priorProbability: 'low',
          isBest: false
        }
      ],
      bestExplanation: 'Phishing-based credential compromise is most plausible: explains all evidence, simple explanation, high prior probability',
      confirmation: 'Analysis of phishing email reveals credential harvesting form. Employee\'s stolen credentials found on dark web forum!'
    }
  ];

  const getCurrentScenario = (): Scenario => {
    return scenarios.find(s => s.id === selectedScenario) || scenarios[0];
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentPhase('observation');
    setRevealedEvidence(new Set());
    setGeneratedHypotheses(new Set());
    setEvaluatedHypotheses(new Set());
    setActiveHypothesis(null);
    setShowRankings(false);
    setShowConfirmation(false);
    setAnimationProgress(0);
  };

  const runAbductiveReasoning = async () => {
    resetDemo();
    setIsRunning(true);
    const scenario = getCurrentScenario();

    // Phase 1: Observation
    setCurrentPhase('observation');
    for (const evidence of scenario.incompleteEvidence) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setRevealedEvidence(prev => new Set([...prev, evidence.id]));
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Phase 2: Hypothesis Generation
    setCurrentPhase('generation');
    for (const hyp of scenario.hypotheses) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setGeneratedHypotheses(prev => new Set([...prev, hyp.id]));
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Phase 3: Evaluation
    setCurrentPhase('evaluation');
    for (const hyp of scenario.hypotheses) {
      setActiveHypothesis(hyp.id);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setEvaluatedHypotheses(prev => new Set([...prev, hyp.id]));
      setActiveHypothesis(null);
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    // Phase 4: Ranking
    setCurrentPhase('ranking');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowRankings(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Phase 5: Selection
    setCurrentPhase('selection');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Phase 6: Confirmation
    setCurrentPhase('confirmation');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setAnimationProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setShowConfirmation(true);
      }
    }, 150);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setCurrentPhase('complete');
    setIsRunning(false);
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'observation': return 'bg-red-950 border-red-800';
      case 'generation': return 'bg-yellow-950 border-yellow-800';
      case 'evaluation': return 'bg-blue-950 border-blue-800';
      case 'ranking': return 'bg-purple-950 border-purple-800';
      case 'selection': return 'bg-indigo-950 border-indigo-800';
      case 'confirmation': return 'bg-green-950 border-green-800';
      case 'complete': return 'bg-green-950 border-green-600';
      default: return 'bg-gray-900 border-gray-700';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'text-green-400';
      case 'moderate': return 'text-yellow-400';
      case 'complex': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const scenario = getCurrentScenario();
  const bestHypothesis = scenario.hypotheses.find(h => h.isBest);
  const sortedHypotheses = [...scenario.hypotheses].sort((a, b) => b.plausibilityScore - a.plausibilityScore);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Abductive Reasoning Demo</h2>
        <p className="text-gray-400 mb-6">
          Infer the best explanation from incomplete observations by generating competing hypotheses
          and evaluating their plausibility through evidence fit and simplicity.
        </p>

        {/* Scenario Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200">Select Investigation Scenario</h3>
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
            <Search className="w-5 h-5 text-cyan-400" />
            Abductive Reasoning Process
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {['observation', 'generation', 'evaluation', 'ranking', 'selection', 'confirmation'].map((phase) => (
              <div
                key={phase}
                className={`px-2 py-2 rounded-lg border-2 transition-all ${
                  currentPhase === phase
                    ? getPhaseColor(phase) + ' scale-105'
                    : currentPhase === 'complete' || ['observation', 'generation', 'evaluation', 'ranking', 'selection', 'confirmation'].indexOf(currentPhase) > ['observation', 'generation', 'evaluation', 'ranking', 'selection', 'confirmation'].indexOf(phase)
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

        {/* Context */}
        <div className={`mb-6 p-4 rounded-lg border-2 transition-all ${
          currentPhase === 'observation' ? 'bg-red-950 border-red-800' : 'bg-gray-900 border-gray-700'
        }`}>
          <h3 className="text-lg font-semibold mb-2 text-gray-200 flex items-center gap-2">
            <Eye className="w-5 h-5 text-red-400" />
            Context & Incomplete Evidence
          </h3>
          <p className="text-white mb-3">{scenario.context}</p>

          {currentPhase !== 'observation' && revealedEvidence.size > 0 && (
            <div className="space-y-2">
              {scenario.incompleteEvidence.map(ev => {
                const isRevealed = revealedEvidence.has(ev.id);
                return isRevealed ? (
                  <div
                    key={ev.id}
                    className={`p-2 rounded flex items-start gap-2 ${
                      ev.type === 'fact' ? 'bg-blue-900/30 border border-blue-800' :
                      ev.type === 'missing' ? 'bg-gray-800 border border-gray-600' :
                      'bg-orange-900/30 border border-orange-800'
                    }`}
                  >
                    <span className="text-xl">{ev.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm text-white">{ev.observation}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {ev.type === 'fact' ? 'Confirmed fact' :
                         ev.type === 'missing' ? 'Missing information' :
                         'Anomaly detected'}
                      </p>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Hypotheses */}
        {currentPhase !== 'observation' && generatedHypotheses.size > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              Competing Explanatory Hypotheses
            </h3>
            <div className="space-y-3">
              {scenario.hypotheses.map((hyp, idx) => {
                const isGenerated = generatedHypotheses.has(hyp.id);
                const isEvaluated = evaluatedHypotheses.has(hyp.id);
                const isActive = activeHypothesis === hyp.id;
                const showRanking = showRankings && isEvaluated;

                return isGenerated ? (
                  <div
                    key={hyp.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isActive ? 'bg-blue-950 border-blue-600 scale-105' :
                      currentPhase === 'selection' && hyp.isBest ? 'bg-green-950 border-green-600' :
                      showRanking && hyp.isBest ? 'bg-green-950 border-green-700' :
                      isEvaluated ? 'bg-gray-800 border-purple-700' :
                      'bg-gray-900 border-yellow-600'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white flex items-center gap-2">
                          {hyp.explanation}
                          {showRanking && (
                            <span className="text-xs bg-purple-900 text-purple-300 px-2 py-0.5 rounded">
                              #{idx + 1}
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">{hyp.reasoning}</p>
                      </div>
                      {currentPhase === 'selection' && hyp.isBest && (
                        <Target className="w-6 h-6 text-green-400 flex-shrink-0" />
                      )}
                    </div>

                    {isEvaluated && (
                      <>
                        <div className="grid md:grid-cols-3 gap-3 mb-3 pt-3 border-t border-gray-700">
                          <div>
                            <p className="text-xs font-medium text-green-300 mb-1">✓ Explains:</p>
                            <ul className="text-xs text-gray-300 space-y-0.5">
                              {hyp.evidenceFit.explains.slice(0, 2).map((item, i) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-red-300 mb-1">✗ Doesn't Explain:</p>
                            <ul className="text-xs text-gray-400 space-y-0.5">
                              {hyp.evidenceFit.doesNotExplain.slice(0, 2).map((item, i) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-blue-300 mb-1">Predictions:</p>
                            <ul className="text-xs text-gray-300 space-y-0.5">
                              {hyp.evidenceFit.predictions.slice(0, 2).map((item, i) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-400">Complexity:</span>
                              <span className={`text-xs font-bold ${getComplexityColor(hyp.complexity)}`}>
                                {hyp.complexity}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-400">Prior:</span>
                              <span className={`text-xs font-bold ${
                                hyp.priorProbability === 'high' ? 'text-green-400' :
                                hyp.priorProbability === 'medium' ? 'text-yellow-400' :
                                'text-orange-400'
                              }`}>
                                {hyp.priorProbability}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Plausibility</span>
                            <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  hyp.isBest ? 'bg-green-500' : 'bg-purple-500'
                                }`}
                                style={{ width: `${hyp.plausibilityScore}%` }}
                              />
                            </div>
                            <span className={`text-sm font-bold ${hyp.isBest ? 'text-green-400' : 'text-purple-400'}`}>
                              {hyp.plausibilityScore}%
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Best Explanation */}
        {(currentPhase === 'selection' || currentPhase === 'confirmation' || currentPhase === 'complete') && bestHypothesis && (
          <div className="mb-6 bg-indigo-950 border-2 border-indigo-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-indigo-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Abductive Inference: Best Explanation
            </h3>
            <p className="text-white text-lg font-semibold mb-2">{bestHypothesis.explanation}</p>
            <p className="text-indigo-200 text-sm mb-3">{scenario.bestExplanation}</p>
            <div className="bg-indigo-900/50 rounded p-3">
              <p className="text-xs text-indigo-300 mb-1">Why this explanation wins:</p>
              <ul className="text-xs text-indigo-200 space-y-1">
                <li>• Highest evidence fit (explains {bestHypothesis.evidenceFit.explains.length} observations)</li>
                <li>• Simplicity: {bestHypothesis.complexity} explanation (Occam's razor)</li>
                <li>• Prior probability: {bestHypothesis.priorProbability} likelihood in domain</li>
                <li>• Plausibility score: {bestHypothesis.plausibilityScore}% confidence</li>
              </ul>
            </div>
          </div>
        )}

        {/* Confirmation */}
        {(currentPhase === 'confirmation' || currentPhase === 'complete') && (
          <div className="mb-6 bg-green-950 border-2 border-green-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-green-300 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Seeking Confirmation
            </h3>

            {!showConfirmation && (
              <div>
                <p className="text-gray-300 text-sm mb-3">Testing predictions from best hypothesis...</p>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${animationProgress}%` }}
                  />
                </div>
              </div>
            )}

            {showConfirmation && (
              <>
                <p className="text-white text-lg mb-2">{scenario.confirmation}</p>
                <div className="bg-green-900/50 rounded p-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <p className="text-sm text-green-200">
                    ✓ Abductive inference validated through additional evidence gathering
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex gap-3">
          <button
            onClick={runAbductiveReasoning}
            disabled={isRunning}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2"
          >
            {isRunning ? (
              <>
                <Search className="w-5 h-5 animate-pulse" />
                Running Abductive Reasoning...
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5" />
                Run Abductive Reasoning
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
            How Abductive Reasoning Works
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">1.</span>
              <div>
                <p className="font-medium text-gray-200">Incomplete Observations</p>
                <p className="text-xs text-gray-400">Start with surprising facts, anomalies, or missing information</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">2.</span>
              <div>
                <p className="font-medium text-gray-200">Generate Hypotheses</p>
                <p className="text-xs text-gray-400">Create multiple competing explanations for observations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">3.</span>
              <div>
                <p className="font-medium text-gray-200">Evaluate Evidence Fit</p>
                <p className="text-xs text-gray-400">Assess how well each hypothesis explains the observed evidence</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">4.</span>
              <div>
                <p className="font-medium text-gray-200">Rank by Plausibility</p>
                <p className="text-xs text-gray-400">Consider simplicity (Occam's razor), prior probability, and explanatory power</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">5.</span>
              <div>
                <p className="font-medium text-gray-200">Select Best Explanation</p>
                <p className="text-xs text-gray-400">Choose hypothesis with highest overall plausibility</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">6.</span>
              <div>
                <p className="font-medium text-gray-200">Seek Confirmation</p>
                <p className="text-xs text-gray-400">Test predictions and gather additional evidence to validate inference</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insight */}
        <div className="mt-6 bg-purple-950 border border-purple-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-purple-300">Key Insight</h3>
          <p className="text-sm text-purple-200">
            Abductive reasoning is <strong>"inference to the best explanation"</strong> - it doesn't guarantee the truth
            (like deduction) or estimate probability (like induction), but finds the <strong>most plausible account</strong> of
            incomplete observations by balancing explanatory power with simplicity (Occam's razor).
          </p>
        </div>
      </div>
    </div>
  );
};

export default ABRDemo;