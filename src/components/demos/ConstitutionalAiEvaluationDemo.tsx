'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Activity, AlertTriangle, CheckCircle, XCircle, Target, BookOpen, Zap, Lock } from 'lucide-react';

type Phase = 'idle' | 'constitution-setup' | 'classifier-training' | 'red-team-testing' | 'evaluation' | 'complete';
type AttackStatus = 'pending' | 'testing' | 'blocked' | 'succeeded' | 'over-refusal';

interface ConstitutionalPrinciple {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'validated';
}

interface JailbreakAttempt {
  id: string;
  name: string;
  type: 'synthetic' | 'human' | 'universal';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: AttackStatus;
  blocked: boolean;
}

interface ClassifierMetrics {
  inputClassifier: number;
  outputClassifier: number;
  combinedEffectiveness: number;
}

export default function ConstitutionalAiEvaluationDemo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [currentAttempt, setCurrentAttempt] = useState<JailbreakAttempt | null>(null);
  const [classifierMetrics, setClassifierMetrics] = useState<ClassifierMetrics>({
    inputClassifier: 0,
    outputClassifier: 0,
    combinedEffectiveness: 0
  });

  const [principles, setPrinciples] = useState<ConstitutionalPrinciple[]>([
    { id: 'p1', name: 'Harmlessness', description: 'Avoid generating harmful, dangerous, or unethical content', status: 'pending' },
    { id: 'p2', name: 'Honesty', description: 'Provide truthful and accurate information', status: 'pending' },
    { id: 'p3', name: 'Helpfulness', description: 'Assist users while respecting safety boundaries', status: 'pending' },
    { id: 'p4', name: 'Privacy', description: 'Protect user data and personal information', status: 'pending' },
    { id: 'p5', name: 'Non-discrimination', description: 'Treat all users fairly and without bias', status: 'pending' }
  ]);

  const [jailbreakAttempts, setJailbreakAttempts] = useState<JailbreakAttempt[]>([
    { id: 'j1', name: 'Role-play Jailbreak', type: 'synthetic', severity: 'medium', status: 'pending', blocked: false },
    { id: 'j2', name: 'DAN (Do Anything Now)', type: 'human', severity: 'high', status: 'pending', blocked: false },
    { id: 'j3', name: 'Token Smuggling', type: 'synthetic', severity: 'medium', status: 'pending', blocked: false },
    { id: 'j4', name: 'Prompt Injection', type: 'human', severity: 'high', status: 'pending', blocked: false },
    { id: 'j5', name: 'Context Overflow', type: 'synthetic', severity: 'low', status: 'pending', blocked: false },
    { id: 'j6', name: 'Character Encoding Attack', type: 'universal', severity: 'critical', status: 'pending', blocked: false },
    { id: 'j7', name: 'Ethical Framing Exploit', type: 'human', severity: 'medium', status: 'pending', blocked: false },
    { id: 'j8', name: 'Multi-turn Persuasion', type: 'human', severity: 'high', status: 'pending', blocked: false },
    { id: 'j9', name: 'Base64 Obfuscation', type: 'synthetic', severity: 'medium', status: 'pending', blocked: false },
    { id: 'j10', name: 'Universal Adversarial Suffix', type: 'universal', severity: 'critical', status: 'pending', blocked: false },
    { id: 'j11', name: 'Hypothetical Scenario', type: 'synthetic', severity: 'low', status: 'pending', blocked: false },
    { id: 'j12', name: 'Authority Impersonation', type: 'human', severity: 'high', status: 'pending', blocked: false }
  ]);

  const [stats, setStats] = useState({
    totalAttempts: 0,
    blocked: 0,
    succeeded: 0,
    overRefusal: 0,
    blockRate: 0,
    overRefusalRate: 0
  });

  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'constitution-setup') {
      setPrinciples(prev => prev.map(p => ({ ...p, status: 'active' as const })));
      timeouts.push(setTimeout(() => setPhase('classifier-training'), 600));
    }

    if (phase === 'classifier-training') {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 15;
        if (progress >= 100) {
          clearInterval(interval);
          setClassifierMetrics({
            inputClassifier: 87 + Math.random() * 8,
            outputClassifier: 92 + Math.random() * 6,
            combinedEffectiveness: 95.6
          });
          setPrinciples(prev => prev.map(p => ({ ...p, status: 'validated' as const })));
          timeouts.push(setTimeout(() => setPhase('red-team-testing'), 400));
        }
      }, 100);

      return () => clearInterval(interval);
    }

    if (phase === 'red-team-testing') {
      let attemptIndex = 0;

      const testNextAttempt = () => {
        if (attemptIndex >= jailbreakAttempts.length) {
          setCurrentAttempt(null);
          timeouts.push(setTimeout(() => setPhase('evaluation'), 300));
          return;
        }

        const attempt = jailbreakAttempts[attemptIndex];
        setCurrentAttempt({ ...attempt, status: 'testing' });
        setJailbreakAttempts(prev => prev.map(a =>
          a.id === attempt.id ? { ...a, status: 'testing' as const } : a
        ));

        timeouts.push(setTimeout(() => {
          // Constitutional classifiers achieve 95.6% blocking rate
          // Universal jailbreaks are hardest (critical severity)
          let blockProbability = 0.956; // Default 95.6%

          if (attempt.severity === 'critical') {
            blockProbability = 0.85; // Universal jailbreaks harder to block
          } else if (attempt.severity === 'high') {
            blockProbability = 0.95;
          } else if (attempt.severity === 'low') {
            blockProbability = 0.98;
          }

          const blocked = Math.random() < blockProbability;

          // Over-refusal rate: 0.38% (very low false positives)
          const overRefusal = !blocked && Math.random() < 0.0038;

          const finalStatus: AttackStatus = overRefusal ? 'over-refusal' : (blocked ? 'blocked' : 'succeeded');

          setJailbreakAttempts(prev => prev.map(a =>
            a.id === attempt.id ? { ...a, status: finalStatus, blocked } : a
          ));

          setStats(prev => ({
            ...prev,
            totalAttempts: prev.totalAttempts + 1,
            blocked: prev.blocked + (blocked ? 1 : 0),
            succeeded: prev.succeeded + (!blocked && !overRefusal ? 1 : 0),
            overRefusal: prev.overRefusal + (overRefusal ? 1 : 0),
            blockRate: 0,
            overRefusalRate: 0
          }));

          attemptIndex++;
          timeouts.push(setTimeout(testNextAttempt, 120));
        }, 150));
      };

      testNextAttempt();
    }

    if (phase === 'evaluation') {
      const totalAttempts = jailbreakAttempts.length;
      const blocked = jailbreakAttempts.filter(a => a.status === 'blocked').length;
      const succeeded = jailbreakAttempts.filter(a => a.status === 'succeeded').length;
      const overRefusal = jailbreakAttempts.filter(a => a.status === 'over-refusal').length;

      setStats({
        totalAttempts,
        blocked,
        succeeded,
        overRefusal,
        blockRate: (blocked / totalAttempts) * 100,
        overRefusalRate: (overRefusal / totalAttempts) * 100
      });

      timeouts.push(setTimeout(() => {
        setPhase('complete');
        setIsRunning(false);
      }, 800));
    }

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [phase, isRunning, jailbreakAttempts]);

  const handleStart = () => {
    setIsRunning(true);
    setPhase('constitution-setup');
    setCurrentAttempt(null);
    setClassifierMetrics({ inputClassifier: 0, outputClassifier: 0, combinedEffectiveness: 0 });

    setPrinciples([
      { id: 'p1', name: 'Harmlessness', description: 'Avoid generating harmful, dangerous, or unethical content', status: 'pending' },
      { id: 'p2', name: 'Honesty', description: 'Provide truthful and accurate information', status: 'pending' },
      { id: 'p3', name: 'Helpfulness', description: 'Assist users while respecting safety boundaries', status: 'pending' },
      { id: 'p4', name: 'Privacy', description: 'Protect user data and personal information', status: 'pending' },
      { id: 'p5', name: 'Non-discrimination', description: 'Treat all users fairly and without bias', status: 'pending' }
    ]);

    setJailbreakAttempts([
      { id: 'j1', name: 'Role-play Jailbreak', type: 'synthetic', severity: 'medium', status: 'pending', blocked: false },
      { id: 'j2', name: 'DAN (Do Anything Now)', type: 'human', severity: 'high', status: 'pending', blocked: false },
      { id: 'j3', name: 'Token Smuggling', type: 'synthetic', severity: 'medium', status: 'pending', blocked: false },
      { id: 'j4', name: 'Prompt Injection', type: 'human', severity: 'high', status: 'pending', blocked: false },
      { id: 'j5', name: 'Context Overflow', type: 'synthetic', severity: 'low', status: 'pending', blocked: false },
      { id: 'j6', name: 'Character Encoding Attack', type: 'universal', severity: 'critical', status: 'pending', blocked: false },
      { id: 'j7', name: 'Ethical Framing Exploit', type: 'human', severity: 'medium', status: 'pending', blocked: false },
      { id: 'j8', name: 'Multi-turn Persuasion', type: 'human', severity: 'high', status: 'pending', blocked: false },
      { id: 'j9', name: 'Base64 Obfuscation', type: 'synthetic', severity: 'medium', status: 'pending', blocked: false },
      { id: 'j10', name: 'Universal Adversarial Suffix', type: 'universal', severity: 'critical', status: 'pending', blocked: false },
      { id: 'j11', name: 'Hypothetical Scenario', type: 'synthetic', severity: 'low', status: 'pending', blocked: false },
      { id: 'j12', name: 'Authority Impersonation', type: 'human', severity: 'high', status: 'pending', blocked: false }
    ]);

    setStats({
      totalAttempts: 0,
      blocked: 0,
      succeeded: 0,
      overRefusal: 0,
      blockRate: 0,
      overRefusalRate: 0
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('idle');
    setCurrentAttempt(null);
    setClassifierMetrics({ inputClassifier: 0, outputClassifier: 0, combinedEffectiveness: 0 });

    setPrinciples([
      { id: 'p1', name: 'Harmlessness', description: 'Avoid generating harmful, dangerous, or unethical content', status: 'pending' },
      { id: 'p2', name: 'Honesty', description: 'Provide truthful and accurate information', status: 'pending' },
      { id: 'p3', name: 'Helpfulness', description: 'Assist users while respecting safety boundaries', status: 'pending' },
      { id: 'p4', name: 'Privacy', description: 'Protect user data and personal information', status: 'pending' },
      { id: 'p5', name: 'Non-discrimination', description: 'Treat all users fairly and without bias', status: 'pending' }
    ]);

    setJailbreakAttempts([
      { id: 'j1', name: 'Role-play Jailbreak', type: 'synthetic', severity: 'medium', status: 'pending', blocked: false },
      { id: 'j2', name: 'DAN (Do Anything Now)', type: 'human', severity: 'high', status: 'pending', blocked: false },
      { id: 'j3', name: 'Token Smuggling', type: 'synthetic', severity: 'medium', status: 'pending', blocked: false },
      { id: 'j4', name: 'Prompt Injection', type: 'human', severity: 'high', status: 'pending', blocked: false },
      { id: 'j5', name: 'Context Overflow', type: 'synthetic', severity: 'low', status: 'pending', blocked: false },
      { id: 'j6', name: 'Character Encoding Attack', type: 'universal', severity: 'critical', status: 'pending', blocked: false },
      { id: 'j7', name: 'Ethical Framing Exploit', type: 'human', severity: 'medium', status: 'pending', blocked: false },
      { id: 'j8', name: 'Multi-turn Persuasion', type: 'human', severity: 'high', status: 'pending', blocked: false },
      { id: 'j9', name: 'Base64 Obfuscation', type: 'synthetic', severity: 'medium', status: 'pending', blocked: false },
      { id: 'j10', name: 'Universal Adversarial Suffix', type: 'universal', severity: 'critical', status: 'pending', blocked: false },
      { id: 'j11', name: 'Hypothetical Scenario', type: 'synthetic', severity: 'low', status: 'pending', blocked: false },
      { id: 'j12', name: 'Authority Impersonation', type: 'human', severity: 'high', status: 'pending', blocked: false }
    ]);

    setStats({
      totalAttempts: 0,
      blocked: 0,
      succeeded: 0,
      overRefusal: 0,
      blockRate: 0,
      overRefusalRate: 0
    });
  };

  const getPhaseLabel = () => {
    switch (phase) {
      case 'constitution-setup': return 'Establishing constitutional principles...';
      case 'classifier-training': return 'Training input/output classifiers...';
      case 'red-team-testing': return 'Red team adversarial testing...';
      case 'evaluation': return 'Evaluating jailbreak resistance...';
      case 'complete': return 'Evaluation Complete';
      default: return 'Ready to evaluate';
    }
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high' | 'critical') => {
    switch (severity) {
      case 'low': return 'text-yellow-400 bg-yellow-500/20';
      case 'medium': return 'text-orange-400 bg-orange-500/20';
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'critical': return 'text-red-600 bg-red-600/20';
    }
  };

  const getTypeColor = (type: 'synthetic' | 'human' | 'universal') => {
    switch (type) {
      case 'synthetic': return 'text-blue-400 bg-blue-500/20';
      case 'human': return 'text-purple-400 bg-purple-500/20';
      case 'universal': return 'text-pink-400 bg-pink-500/20';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-6 shadow-2xl border border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Constitutional AI Evaluation</h3>
            <p className="text-sm text-gray-400">Jailbreak Resistance & Harmlessness Assessment</p>
          </div>
        </div>

        <div className="flex gap-2">
          {!isRunning && phase !== 'complete' && (
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
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
      <div className="mb-6 p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className={`w-5 h-5 ${isRunning ? 'text-emerald-400 animate-pulse' : 'text-gray-400'}`} />
            <span className="font-semibold text-white">{getPhaseLabel()}</span>
          </div>
          {stats.totalAttempts > 0 && (
            <div className="text-sm text-gray-400">
              {stats.totalAttempts}/{jailbreakAttempts.length} attempts tested
            </div>
          )}
        </div>
      </div>

      {/* Constitutional Principles */}
      {(phase === 'constitution-setup' || phase === 'classifier-training') && (
        <div className="mb-6 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <h4 className="font-semibold text-white">Constitutional Principles</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {principles.map((principle) => (
              <div
                key={principle.id}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  principle.status === 'validated' ? 'bg-green-500/10 border-green-500/30' :
                  principle.status === 'active' ? 'bg-emerald-500/10 border-emerald-500/30' :
                  'bg-slate-800/30 border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white text-sm">{principle.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{principle.description}</div>
                  </div>
                  {principle.status === 'validated' && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                  {principle.status === 'active' && (
                    <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Classifier Metrics */}
      {(phase === 'classifier-training' || phase === 'red-team-testing' || phase === 'evaluation' || phase === 'complete') && classifierMetrics.combinedEffectiveness > 0 && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-4 border border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-blue-400" />
              <h4 className="text-sm font-semibold text-gray-300">Input Classifier</h4>
            </div>
            <div className="text-2xl font-bold text-blue-400">
              {classifierMetrics.inputClassifier.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-400 mt-1">Detection accuracy</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg p-4 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-purple-400" />
              <h4 className="text-sm font-semibold text-gray-300">Output Classifier</h4>
            </div>
            <div className="text-2xl font-bold text-purple-400">
              {classifierMetrics.outputClassifier.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-400 mt-1">Filtering accuracy</div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-lg p-4 border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-semibold text-gray-300">Combined Effectiveness</h4>
            </div>
            <div className="text-2xl font-bold text-emerald-400">
              {classifierMetrics.combinedEffectiveness.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-400 mt-1">Jailbreak blocking</div>
          </div>
        </div>
      )}

      {/* Current Attack Display */}
      {currentAttempt && phase === 'red-team-testing' && (
        <div className="mb-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg p-4 border border-red-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-red-400" />
            <h4 className="font-semibold text-white">Testing Jailbreak Attempt</h4>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">{currentAttempt.name}</div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs px-2 py-1 rounded ${getTypeColor(currentAttempt.type)}`}>
                  {currentAttempt.type}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(currentAttempt.severity)}`}>
                  {currentAttempt.severity}
                </span>
              </div>
            </div>
            <Activity className="w-5 h-5 text-red-400 animate-spin" />
          </div>
        </div>
      )}

      {/* Jailbreak Attempts Grid */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Red Team Jailbreak Attempts ({jailbreakAttempts.filter(a => a.status === 'blocked').length}/{jailbreakAttempts.length} blocked)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {jailbreakAttempts.map((attempt) => (
            <div
              key={attempt.id}
              className={`p-3 rounded-lg border text-sm transition-all duration-200 ${
                attempt.status === 'testing' ? 'bg-yellow-500/10 border-yellow-500/50' :
                attempt.status === 'blocked' ? 'bg-green-500/10 border-green-500/30' :
                attempt.status === 'succeeded' ? 'bg-red-500/10 border-red-500/30' :
                attempt.status === 'over-refusal' ? 'bg-orange-500/10 border-orange-500/30' :
                'bg-slate-800/30 border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-white font-medium">{attempt.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded ${getTypeColor(attempt.type)}`}>
                      {attempt.type}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${getSeverityColor(attempt.severity)}`}>
                      {attempt.severity}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {attempt.status === 'testing' && (
                    <Activity className="w-4 h-4 text-yellow-400 animate-spin" />
                  )}
                  {attempt.status === 'blocked' && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                  {attempt.status === 'succeeded' && (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                  {attempt.status === 'over-refusal' && (
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Statistics */}
      {(phase === 'evaluation' || phase === 'complete') && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg p-4 border border-green-500/30">
            <div className="text-xs text-gray-400 mb-1">Blocked</div>
            <div className="text-2xl font-bold text-green-400">{stats.blocked}</div>
            <div className="text-xs text-green-400 mt-1">{stats.blockRate.toFixed(1)}%</div>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-lg p-4 border border-red-500/30">
            <div className="text-xs text-gray-400 mb-1">Succeeded</div>
            <div className="text-2xl font-bold text-red-400">{stats.succeeded}</div>
            <div className="text-xs text-red-400 mt-1">{((stats.succeeded / stats.totalAttempts) * 100).toFixed(1)}%</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg p-4 border border-orange-500/30">
            <div className="text-xs text-gray-400 mb-1">Over-refusal</div>
            <div className="text-2xl font-bold text-orange-400">{stats.overRefusal}</div>
            <div className="text-xs text-orange-400 mt-1">{stats.overRefusalRate.toFixed(2)}%</div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-lg p-4 border border-emerald-500/30">
            <div className="text-xs text-gray-400 mb-1">Total Tests</div>
            <div className="text-2xl font-bold text-emerald-400">{stats.totalAttempts}</div>
            <div className="text-xs text-emerald-400 mt-1">Red team attacks</div>
          </div>
        </div>
      )}

      {phase === 'complete' && (
        <div className={`mt-4 p-3 rounded-lg border ${
          stats.blockRate >= 90 ? 'bg-green-500/10 border-green-500/30' :
          stats.blockRate >= 70 ? 'bg-yellow-500/10 border-yellow-500/30' :
          'bg-red-500/10 border-red-500/30'
        }`}>
          <div className="text-sm text-white">
            {stats.blockRate >= 90 && (
              <span>✓ Excellent jailbreak resistance ({stats.blockRate.toFixed(1)}%). Constitutional classifiers performing optimally with {stats.overRefusalRate.toFixed(2)}% over-refusal rate.</span>
            )}
            {stats.blockRate >= 70 && stats.blockRate < 90 && (
              <span>⚠ Moderate jailbreak resistance ({stats.blockRate.toFixed(1)}%). Consider strengthening constitutional principles and classifier training.</span>
            )}
            {stats.blockRate < 70 && (
              <span>✗ Insufficient jailbreak resistance ({stats.blockRate.toFixed(1)}%). Immediate improvements required to constitutional classifiers.</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}