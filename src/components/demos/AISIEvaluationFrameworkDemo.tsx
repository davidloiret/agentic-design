'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Activity, AlertTriangle, CheckCircle, XCircle, Target, Users, FileText, Zap } from 'lucide-react';

type Phase = 'idle' | 'preregistration' | 'tier-1-auto' | 'tier-2-manual' | 'tier-3-expert' | 'threshold-check' | 'decision' | 'complete';
type CheckStatus = 'pending' | 'running' | 'passed' | 'failed' | 'flagged';
type Decision = 'deploy' | 'mitigate' | 'restrict' | null;

interface CapabilityCheck {
  id: string;
  name: string;
  category: string;
  status: CheckStatus;
  score?: number;
}

interface SafetyCheck {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  status: CheckStatus;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

interface TierSummary {
  tier: number;
  name: string;
  status: 'pending' | 'running' | 'completed';
  checksTotal: number;
  checksPassed: number;
  checksFlagged: number;
}

export default function AISIEvaluationFrameworkDemo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [currentCheck, setCurrentCheck] = useState<CapabilityCheck | SafetyCheck | null>(null);
  const [decision, setDecision] = useState<Decision>(null);
  const [overallScore, setOverallScore] = useState(0);
  const [flaggedIssues, setFlaggedIssues] = useState(0);

  const [capabilityChecks, setCapabilityChecks] = useState<CapabilityCheck[]>([
    { id: 'c1', name: 'Advanced Reasoning', category: 'Cognitive Capability', status: 'pending' },
    { id: 'c2', name: 'Scientific Knowledge', category: 'Domain Expertise', status: 'pending' },
    { id: 'c3', name: 'Code Generation', category: 'Technical Capability', status: 'pending' },
    { id: 'c4', name: 'Multi-modal Understanding', category: 'Perception', status: 'pending' },
    { id: 'c5', name: 'Tool Use & API Integration', category: 'Autonomy', status: 'pending' }
  ]);

  const [safetyChecks, setSafetyChecks] = useState<SafetyCheck[]>([
    // Tier 1: Automated
    { id: 's1', name: 'Adversarial Robustness', tier: 1, status: 'pending' },
    { id: 's2', name: 'Jailbreak Resistance', tier: 1, status: 'pending' },
    { id: 's3', name: 'Harmful Content Filtering', tier: 1, status: 'pending' },
    { id: 's4', name: 'Data Privacy Compliance', tier: 1, status: 'pending' },
    // Tier 2: Manual
    { id: 's5', name: 'Autonomous Capability Test', tier: 2, status: 'pending' },
    { id: 's6', name: 'Misuse Scenario Analysis', tier: 2, status: 'pending' },
    { id: 's7', name: 'Alignment Verification', tier: 2, status: 'pending' },
    // Tier 3: Expert Red-team
    { id: 's8', name: 'Dual-use Risk Assessment', tier: 3, status: 'pending' },
    { id: 's9', name: 'Adversarial Expert Testing', tier: 3, status: 'pending' },
    { id: 's10', name: 'Societal Impact Analysis', tier: 3, status: 'pending' }
  ]);

  const [tiers, setTiers] = useState<TierSummary[]>([
    { tier: 1, name: 'Automated Testing', status: 'pending', checksTotal: 4, checksPassed: 0, checksFlagged: 0 },
    { tier: 2, name: 'Manual Testing', status: 'pending', checksTotal: 3, checksPassed: 0, checksFlagged: 0 },
    { tier: 3, name: 'Expert Red-teaming', status: 'pending', checksTotal: 3, checksPassed: 0, checksFlagged: 0 }
  ]);

  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'preregistration') {
      timeouts.push(setTimeout(() => setPhase('tier-1-auto'), 400));
    }

    if (phase === 'tier-1-auto') {
      setTiers(prev => prev.map(t => t.tier === 1 ? { ...t, status: 'running' } : t));

      const tier1Checks = safetyChecks.filter(c => c.tier === 1);
      let checkIndex = 0;

      const runNextCheck = () => {
        if (checkIndex >= tier1Checks.length) {
          setCurrentCheck(null);
          setTiers(prev => prev.map(t => t.tier === 1 ? { ...t, status: 'completed' } : t));
          timeouts.push(setTimeout(() => setPhase('tier-2-manual'), 200));
          return;
        }

        const check = tier1Checks[checkIndex];
        setCurrentCheck(check);
        setSafetyChecks(prev => prev.map(c => c.id === check.id ? { ...c, status: 'running' } : c));

        timeouts.push(setTimeout(() => {
          const passed = Math.random() > 0.15;
          const severity = passed ? undefined : (['low', 'medium', 'high'] as const)[Math.floor(Math.random() * 3)];

          setSafetyChecks(prev => prev.map(c =>
            c.id === check.id ? { ...c, status: passed ? 'passed' : 'flagged', severity } : c
          ));

          setTiers(prev => prev.map(t =>
            t.tier === 1 ? {
              ...t,
              checksPassed: t.checksPassed + (passed ? 1 : 0),
              checksFlagged: t.checksFlagged + (passed ? 0 : 1)
            } : t
          ));

          if (!passed) {
            setFlaggedIssues(prev => prev + 1);
          }

          checkIndex++;
          timeouts.push(setTimeout(runNextCheck, 120));
        }, 150));
      };

      runNextCheck();
    }

    if (phase === 'tier-2-manual') {
      setTiers(prev => prev.map(t => t.tier === 2 ? { ...t, status: 'running' } : t));

      const tier2Checks = safetyChecks.filter(c => c.tier === 2);
      let checkIndex = 0;

      const runNextCheck = () => {
        if (checkIndex >= tier2Checks.length) {
          setCurrentCheck(null);
          setTiers(prev => prev.map(t => t.tier === 2 ? { ...t, status: 'completed' } : t));
          timeouts.push(setTimeout(() => setPhase('tier-3-expert'), 200));
          return;
        }

        const check = tier2Checks[checkIndex];
        setCurrentCheck(check);
        setSafetyChecks(prev => prev.map(c => c.id === check.id ? { ...c, status: 'running' } : c));

        timeouts.push(setTimeout(() => {
          const passed = Math.random() > 0.2;
          const severity = passed ? undefined : (['medium', 'high', 'critical'] as const)[Math.floor(Math.random() * 3)];

          setSafetyChecks(prev => prev.map(c =>
            c.id === check.id ? { ...c, status: passed ? 'passed' : 'flagged', severity } : c
          ));

          setTiers(prev => prev.map(t =>
            t.tier === 2 ? {
              ...t,
              checksPassed: t.checksPassed + (passed ? 1 : 0),
              checksFlagged: t.checksFlagged + (passed ? 0 : 1)
            } : t
          ));

          if (!passed) {
            setFlaggedIssues(prev => prev + 1);
          }

          checkIndex++;
          timeouts.push(setTimeout(runNextCheck, 150));
        }, 180));
      };

      runNextCheck();
    }

    if (phase === 'tier-3-expert') {
      setTiers(prev => prev.map(t => t.tier === 3 ? { ...t, status: 'running' } : t));

      const tier3Checks = safetyChecks.filter(c => c.tier === 3);
      let checkIndex = 0;

      const runNextCheck = () => {
        if (checkIndex >= tier3Checks.length) {
          setCurrentCheck(null);
          setTiers(prev => prev.map(t => t.tier === 3 ? { ...t, status: 'completed' } : t));
          timeouts.push(setTimeout(() => setPhase('threshold-check'), 200));
          return;
        }

        const check = tier3Checks[checkIndex];
        setCurrentCheck(check);
        setSafetyChecks(prev => prev.map(c => c.id === check.id ? { ...c, status: 'running' } : c));

        timeouts.push(setTimeout(() => {
          const passed = Math.random() > 0.25;
          const severity = passed ? undefined : (['high', 'critical'] as const)[Math.floor(Math.random() * 2)];

          setSafetyChecks(prev => prev.map(c =>
            c.id === check.id ? { ...c, status: passed ? 'passed' : 'flagged', severity } : c
          ));

          setTiers(prev => prev.map(t =>
            t.tier === 3 ? {
              ...t,
              checksPassed: t.checksPassed + (passed ? 1 : 0),
              checksFlagged: t.checksFlagged + (passed ? 0 : 1)
            } : t
          ));

          if (!passed) {
            setFlaggedIssues(prev => prev + 1);
          }

          checkIndex++;
          timeouts.push(setTimeout(runNextCheck, 180));
        }, 200));
      };

      runNextCheck();
    }

    if (phase === 'threshold-check') {
      // Calculate overall score
      const totalChecks = safetyChecks.length;
      const passedChecks = safetyChecks.filter(c => c.status === 'passed').length;
      const score = Math.round((passedChecks / totalChecks) * 100);

      setOverallScore(score);

      timeouts.push(setTimeout(() => setPhase('decision'), 600));
    }

    if (phase === 'decision') {
      // Decision logic based on flagged issues and score
      let finalDecision: Decision;

      if (flaggedIssues === 0 && overallScore >= 85) {
        finalDecision = 'deploy';
      } else if (flaggedIssues <= 2 && overallScore >= 70) {
        finalDecision = 'mitigate';
      } else {
        finalDecision = 'restrict';
      }

      setDecision(finalDecision);

      timeouts.push(setTimeout(() => {
        setPhase('complete');
        setIsRunning(false);
      }, 800));
    }

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [phase, isRunning, safetyChecks, flaggedIssues, overallScore]);

  const handleStart = () => {
    setIsRunning(true);
    setPhase('preregistration');
    setDecision(null);
    setOverallScore(0);
    setFlaggedIssues(0);
    setCurrentCheck(null);

    setCapabilityChecks(prev => prev.map(c => ({ ...c, status: 'pending', score: undefined })));
    setSafetyChecks(prev => prev.map(c => ({ ...c, status: 'pending', severity: undefined })));
    setTiers([
      { tier: 1, name: 'Automated Testing', status: 'pending', checksTotal: 4, checksPassed: 0, checksFlagged: 0 },
      { tier: 2, name: 'Manual Testing', status: 'pending', checksTotal: 3, checksPassed: 0, checksFlagged: 0 },
      { tier: 3, name: 'Expert Red-teaming', status: 'pending', checksTotal: 3, checksPassed: 0, checksFlagged: 0 }
    ]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('idle');
    setDecision(null);
    setOverallScore(0);
    setFlaggedIssues(0);
    setCurrentCheck(null);

    setCapabilityChecks(prev => prev.map(c => ({ ...c, status: 'pending', score: undefined })));
    setSafetyChecks(prev => prev.map(c => ({ ...c, status: 'pending', severity: undefined })));
    setTiers([
      { tier: 1, name: 'Automated Testing', status: 'pending', checksTotal: 4, checksPassed: 0, checksFlagged: 0 },
      { tier: 2, name: 'Manual Testing', status: 'pending', checksTotal: 3, checksPassed: 0, checksFlagged: 0 },
      { tier: 3, name: 'Expert Red-teaming', status: 'pending', checksTotal: 3, checksPassed: 0, checksFlagged: 0 }
    ]);
  };

  const getPhaseLabel = () => {
    switch (phase) {
      case 'preregistration': return 'Preregistering evaluation design...';
      case 'tier-1-auto': return 'Tier 1: Automated Testing';
      case 'tier-2-manual': return 'Tier 2: Manual Testing';
      case 'tier-3-expert': return 'Tier 3: Expert Red-teaming';
      case 'threshold-check': return 'Comparing against safety thresholds...';
      case 'decision': return 'Generating safety decision...';
      case 'complete': return 'Evaluation Complete';
      default: return 'Ready to evaluate';
    }
  };

  const getTierIcon = (tier: number) => {
    switch (tier) {
      case 1: return <Zap className="w-4 h-4" />;
      case 2: return <FileText className="w-4 h-4" />;
      case 3: return <Users className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity?: 'low' | 'medium' | 'high' | 'critical') => {
    switch (severity) {
      case 'low': return 'text-yellow-400';
      case 'medium': return 'text-orange-400';
      case 'high': return 'text-red-400';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-6 shadow-2xl border border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">AISI Evaluation Framework</h3>
            <p className="text-sm text-gray-400">Frontier AI Safety Assessment</p>
          </div>
        </div>

        <div className="flex gap-2">
          {!isRunning && phase !== 'complete' && (
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              Start Evaluation
            </button>
          )}
          {(phase === 'complete' || isRunning) && (
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-200"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Phase Indicator */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className={`w-5 h-5 ${isRunning ? 'text-purple-400 animate-pulse' : 'text-gray-400'}`} />
            <span className="font-semibold text-white">{getPhaseLabel()}</span>
          </div>
          {phase === 'complete' && decision && (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              decision === 'deploy' ? 'bg-green-500/20 text-green-400' :
              decision === 'mitigate' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {decision === 'deploy' && <CheckCircle className="w-4 h-4" />}
              {decision === 'mitigate' && <AlertTriangle className="w-4 h-4" />}
              {decision === 'restrict' && <XCircle className="w-4 h-4" />}
              <span className="font-semibold uppercase text-sm">{decision}</span>
            </div>
          )}
        </div>
      </div>

      {/* Current Check Display */}
      {currentCheck && (phase === 'tier-1-auto' || phase === 'tier-2-manual' || phase === 'tier-3-expert') && (
        <div className="mb-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-blue-400" />
            <h4 className="font-semibold text-white">Current Check</h4>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">{currentCheck.name}</div>
              <div className="text-xs text-gray-400 mt-1">
                {'tier' in currentCheck && `Tier ${currentCheck.tier} • `}
                {phase === 'tier-1-auto' && 'Automated Test'}
                {phase === 'tier-2-manual' && 'Manual Assessment'}
                {phase === 'tier-3-expert' && 'Expert Red-team'}
              </div>
            </div>
            <Activity className="w-5 h-5 text-blue-400 animate-spin" />
          </div>
        </div>
      )}

      {/* Three-Tier Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {tiers.map((tier) => (
          <div
            key={tier.tier}
            className={`p-4 rounded-lg border transition-all duration-300 ${
              tier.status === 'running' ? 'bg-blue-500/10 border-blue-500/50' :
              tier.status === 'completed' ? 'bg-green-500/10 border-green-500/50' :
              'bg-slate-800/50 border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`p-1.5 rounded ${
                tier.status === 'running' ? 'bg-blue-500/20 text-blue-400' :
                tier.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                'bg-slate-700 text-gray-400'
              }`}>
                {getTierIcon(tier.tier)}
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Tier {tier.tier}</div>
                <div className="text-xs text-gray-400">{tier.name}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Progress</span>
                <span className="text-white font-medium">
                  {tier.checksPassed + tier.checksFlagged}/{tier.checksTotal}
                </span>
              </div>

              {tier.status !== 'pending' && (
                <>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Passed</span>
                    <span className="text-green-400 font-medium">{tier.checksPassed}</span>
                  </div>

                  {tier.checksFlagged > 0 && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">Flagged</span>
                      <span className="text-red-400 font-medium">{tier.checksFlagged}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Safety Checks Grid */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Safety Checks ({safetyChecks.filter(c => c.status === 'passed').length}/{safetyChecks.length} passed)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {safetyChecks.map((check) => (
            <div
              key={check.id}
              className={`p-3 rounded-lg border text-sm transition-all duration-200 ${
                check.status === 'running' ? 'bg-blue-500/10 border-blue-500/50' :
                check.status === 'passed' ? 'bg-green-500/10 border-green-500/30' :
                check.status === 'flagged' ? 'bg-red-500/10 border-red-500/30' :
                'bg-slate-800/30 border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    check.tier === 1 ? 'bg-blue-500/20 text-blue-400' :
                    check.tier === 2 ? 'bg-purple-500/20 text-purple-400' :
                    'bg-pink-500/20 text-pink-400'
                  }`}>
                    T{check.tier}
                  </span>
                  <span className="text-white">{check.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  {check.status === 'running' && (
                    <Activity className="w-4 h-4 text-blue-400 animate-spin" />
                  )}
                  {check.status === 'passed' && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                  {check.status === 'flagged' && (
                    <>
                      <span className={`text-xs ${getSeverityColor(check.severity)}`}>
                        {check.severity?.toUpperCase()}
                      </span>
                      <AlertTriangle className={`w-4 h-4 ${getSeverityColor(check.severity)}`} />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Decision Panel */}
      {(phase === 'threshold-check' || phase === 'decision' || phase === 'complete') && (
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Safety Threshold Assessment
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Overall Score</div>
              <div className={`text-2xl font-bold ${
                overallScore >= 85 ? 'text-green-400' :
                overallScore >= 70 ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {overallScore}%
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Flagged Issues</div>
              <div className={`text-2xl font-bold ${
                flaggedIssues === 0 ? 'text-green-400' :
                flaggedIssues <= 2 ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {flaggedIssues}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Recommendation</div>
              <div className={`text-sm font-bold mt-2 ${
                decision === 'deploy' ? 'text-green-400' :
                decision === 'mitigate' ? 'text-yellow-400' :
                decision === 'restrict' ? 'text-red-400' :
                'text-gray-400'
              }`}>
                {decision ? decision.toUpperCase() : 'ANALYZING...'}
              </div>
            </div>
          </div>

          {decision && (
            <div className={`p-3 rounded-lg border ${
              decision === 'deploy' ? 'bg-green-500/10 border-green-500/30' :
              decision === 'mitigate' ? 'bg-yellow-500/10 border-yellow-500/30' :
              'bg-red-500/10 border-red-500/30'
            }`}>
              <div className="text-sm text-white">
                {decision === 'deploy' && (
                  <span>✓ System meets safety thresholds. Approved for deployment with 6-month monitoring.</span>
                )}
                {decision === 'mitigate' && (
                  <span>⚠ System requires mitigation measures. Address flagged issues before deployment.</span>
                )}
                {decision === 'restrict' && (
                  <span>✗ System does not meet safety requirements. Deployment restricted pending remediation.</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}