'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Activity, Target, Zap, FileText, Eye, Lock, CheckCircle, XCircle, Clock } from 'lucide-react';

interface ThreatIndicator {
  metric: string;
  baseline: number;
  current: number;
  status: 'normal' | 'suspicious' | 'critical';
  anomalyScore: number;
}

interface ResponseAction {
  action: string;
  target: string;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  timestamp?: string;
}

interface IncidentLog {
  timestamp: string;
  threatType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  outcome: 'blocked' | 'mitigated' | 'neutralized';
  responseTime: string;
}

interface ThreatScenario {
  id: string;
  name: string;
  context: string;
  threatType: string;
  indicators: ThreatIndicator[];
  responseActions: ResponseAction[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  isBlocked: boolean;
}

const scenarios: ThreatScenario[] = [
  {
    id: 'network-intrusion',
    name: 'Network Intrusion',
    context: 'Suspicious traffic from known malicious IP attempting database access',
    threatType: 'SQL Injection Attack',
    severity: 'critical',
    isBlocked: true,
    indicators: [
      {
        metric: 'Failed Login Attempts',
        baseline: 2,
        current: 847,
        status: 'critical',
        anomalyScore: 98.7
      },
      {
        metric: 'Query Pattern Anomaly',
        baseline: 0,
        current: 234,
        status: 'critical',
        anomalyScore: 95.3
      },
      {
        metric: 'Traffic Volume (MB/s)',
        baseline: 12,
        current: 156,
        status: 'critical',
        anomalyScore: 92.1
      }
    ],
    responseActions: [
      {
        action: 'Block Source IP',
        target: '192.168.45.23',
        status: 'pending'
      },
      {
        action: 'Isolate Database',
        target: 'prod-db-cluster',
        status: 'pending'
      },
      {
        action: 'Alert Security Team',
        target: 'SOC Team',
        status: 'pending'
      }
    ]
  },
  {
    id: 'api-abuse',
    name: 'API Rate Limit Abuse',
    context: 'Automated bot attempting credential stuffing attack via API endpoints',
    threatType: 'Credential Stuffing',
    severity: 'high',
    isBlocked: true,
    indicators: [
      {
        metric: 'API Request Rate',
        baseline: 100,
        current: 8547,
        status: 'critical',
        anomalyScore: 96.8
      },
      {
        metric: 'Failed Auth Attempts',
        baseline: 5,
        current: 3421,
        status: 'critical',
        anomalyScore: 94.2
      },
      {
        metric: 'Unique User Agents',
        baseline: 50,
        current: 3,
        status: 'suspicious',
        anomalyScore: 89.5
      }
    ],
    responseActions: [
      {
        action: 'Enable Rate Limiting',
        target: 'API Gateway',
        status: 'pending'
      },
      {
        action: 'Block Suspicious IPs',
        target: 'Firewall Rules',
        status: 'pending'
      },
      {
        action: 'Activate CAPTCHA',
        target: 'Auth Endpoints',
        status: 'pending'
      }
    ]
  },
  {
    id: 'data-exfiltration',
    name: 'Data Exfiltration',
    context: 'Compromised service account attempting bulk data export',
    threatType: 'Insider Threat',
    severity: 'critical',
    isBlocked: true,
    indicators: [
      {
        metric: 'Data Transfer Volume',
        baseline: 50,
        current: 4567,
        status: 'critical',
        anomalyScore: 99.1
      },
      {
        metric: 'Off-hours Activity',
        baseline: 0,
        current: 1,
        status: 'critical',
        anomalyScore: 97.4
      },
      {
        metric: 'External Destinations',
        baseline: 3,
        current: 47,
        status: 'critical',
        anomalyScore: 93.8
      }
    ],
    responseActions: [
      {
        action: 'Revoke Access Tokens',
        target: 'service-account-prod',
        status: 'pending'
      },
      {
        action: 'Block Outbound Traffic',
        target: 'Network Egress',
        status: 'pending'
      },
      {
        action: 'Preserve Evidence',
        target: 'Forensics Storage',
        status: 'pending'
      }
    ]
  }
];

type Phase = 'idle' | 'threat-detected' | 'analysis' | 'threat-classification' | 'response' | 'mitigation' | 'incident-log' | 'comparison' | 'complete';

export default function TDRDemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id);
  const [phase, setPhase] = useState<Phase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);

  const [indicators, setIndicators] = useState<ThreatIndicator[]>([]);
  const [responseActions, setResponseActions] = useState<ResponseAction[]>([]);
  const [incidentLog, setIncidentLog] = useState<IncidentLog | null>(null);
  const [threatClassification, setThreatClassification] = useState<{ type: string; severity: string; confidence: number } | null>(null);
  const [revealedComparisons, setRevealedComparisons] = useState<Set<string>>(new Set());

  const scenario = scenarios.find(s => s.id === selectedScenario)!;

  useEffect(() => {
    setPhase('idle');
    setAnimatedPhase(false);
    setIndicators(scenario.indicators.map(i => ({ ...i, status: 'normal' })));
    setResponseActions(scenario.responseActions);
    setIncidentLog(null);
    setThreatClassification(null);
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

    if (phase === 'threat-detected') {
      let currentIndicatorIndex = 0;
      const totalIndicators = indicators.length;

      const revealNextIndicator = () => {
        if (currentIndicatorIndex >= totalIndicators) {
          setTimeout(() => setPhase('analysis'), 400);
          return;
        }

        const currentIndex = currentIndicatorIndex;

        setTimeout(() => {
          setIndicators(prev => prev.map((ind, idx) =>
            idx === currentIndex ? { ...ind, status: scenario.indicators[idx].status } : ind
          ));

          currentIndicatorIndex++;
          setTimeout(revealNextIndicator, 200);
        }, 300);
      };

      revealNextIndicator();
    }

    if (phase === 'analysis') {
      const timer = setTimeout(() => setPhase('threat-classification'), 1200);
      return () => clearTimeout(timer);
    }

    if (phase === 'threat-classification') {
      const timer = setTimeout(() => {
        const avgAnomaly = scenario.indicators.reduce((acc, ind) => acc + ind.anomalyScore, 0) / scenario.indicators.length;
        setThreatClassification({
          type: scenario.threatType,
          severity: scenario.severity.toUpperCase(),
          confidence: Math.round(avgAnomaly * 10) / 10
        });
        setTimeout(() => setPhase('response'), 1500);
      }, 800);
      return () => clearTimeout(timer);
    }

    if (phase === 'response') {
      let currentActionIndex = 0;
      const totalActions = responseActions.length;

      const executeNextAction = () => {
        if (currentActionIndex >= totalActions) {
          setTimeout(() => setPhase('mitigation'), 400);
          return;
        }

        const currentIndex = currentActionIndex;

        setResponseActions(prev => prev.map((action, idx) =>
          idx === currentIndex ? { ...action, status: 'executing' } : action
        ));

        setTimeout(() => {
          const now = new Date();
          const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

          setResponseActions(prev => prev.map((action, idx) =>
            idx === currentIndex ? { ...action, status: 'completed', timestamp } : action
          ));

          currentActionIndex++;
          setTimeout(executeNextAction, 250);
        }, 400);
      };

      executeNextAction();
    }

    if (phase === 'mitigation') {
      const timer = setTimeout(() => setPhase('incident-log'), 1000);
      return () => clearTimeout(timer);
    }

    if (phase === 'incident-log') {
      const timer = setTimeout(() => {
        const now = new Date();
        const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        const startTime = Date.now() - 3200;
        const responseTime = `${((Date.now() - startTime) / 1000).toFixed(1)}s`;

        setIncidentLog({
          timestamp,
          threatType: scenario.threatType,
          severity: scenario.severity,
          outcome: 'neutralized',
          responseTime
        });

        setTimeout(() => setPhase('comparison'), 2000);
      }, 800);
      return () => clearTimeout(timer);
    }

    if (phase === 'comparison') {
      const items = ['manual', 'automated', 'impact'];
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
    setPhase('threat-detected');
    setAnimatedPhase(false);
  };

  const resetDemo = () => {
    setPhase('idle');
    setAnimatedPhase(false);
    setIndicators(scenario.indicators.map(i => ({ ...i, status: 'normal' })));
    setResponseActions(scenario.responseActions.map(a => ({ ...a, status: 'pending', timestamp: undefined })));
    setIncidentLog(null);
    setThreatClassification(null);
    setRevealedComparisons(new Set());
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-semibold text-white">Threat Detection & Response</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Select Threat Scenario</label>
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
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              {phase === 'complete' ? 'Run Again' : 'Start Detection'}
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
          <div className={`bg-slate-800/50 backdrop-blur border rounded-lg p-6 transition-all duration-500 ${
            phase === 'threat-detected' && animatedPhase ? 'border-red-500 shadow-lg shadow-red-500/20' : 'border-slate-700'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h4 className="text-lg font-semibold text-white">Threat Detection</h4>
              {phase === 'threat-detected' && animatedPhase && (
                <span className="ml-auto text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full animate-pulse">
                  ACTIVE THREAT
                </span>
              )}
            </div>

            <div className="mb-3 p-3 bg-slate-900/50 rounded border border-slate-700">
              <p className="text-sm text-slate-300">{scenario.context}</p>
            </div>

            <div className="space-y-2">
              {indicators.map((indicator, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    indicator.status === 'critical' ? 'bg-red-500/10 border-red-500/50' :
                    indicator.status === 'suspicious' ? 'bg-orange-500/10 border-orange-500/50' :
                    'bg-slate-900/50 border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{indicator.metric}</span>
                    {indicator.status !== 'normal' && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        indicator.status === 'critical' ? 'bg-red-500/20 text-red-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        Anomaly: {indicator.anomalyScore}%
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>Baseline: {indicator.baseline}</span>
                    <span className={indicator.status !== 'normal' ? 'text-red-400 font-semibold' : ''}>
                      Current: {indicator.current}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {(phase === 'analysis' || phase === 'threat-classification' || phase === 'response' || phase === 'mitigation' || phase === 'incident-log' || phase === 'comparison' || phase === 'complete') && (
            <div className={`bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 transition-all duration-500 ${
              animatedPhase && phase === 'analysis' ? 'border-purple-500 shadow-lg shadow-purple-500/20' : ''
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-purple-400" />
                <h4 className="text-lg font-semibold text-white">Threat Analysis</h4>
                {phase === 'analysis' && animatedPhase && (
                  <span className="ml-auto text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full animate-pulse">
                    ANALYZING
                  </span>
                )}
              </div>

              {!threatClassification && phase === 'analysis' && (
                <div className="flex items-center gap-3 text-slate-400">
                  <Activity className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Correlating threat patterns and analyzing attack vectors...</span>
                </div>
              )}

              {threatClassification && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                    <div className="text-xs text-slate-400 mb-1">Threat Type</div>
                    <div className="text-lg font-semibold text-white">{threatClassification.type}</div>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded-lg border border-red-500/50">
                    <div className="text-xs text-slate-400 mb-1">Severity</div>
                    <div className="text-lg font-semibold text-red-400">{threatClassification.severity}</div>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                    <div className="text-xs text-slate-400 mb-1">Confidence</div>
                    <div className="text-lg font-semibold text-purple-400">{threatClassification.confidence}%</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {(phase === 'response' || phase === 'mitigation' || phase === 'incident-log' || phase === 'comparison' || phase === 'complete') && (
            <div className={`bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 transition-all duration-500 ${
              animatedPhase && phase === 'response' ? 'border-amber-500 shadow-lg shadow-amber-500/20' : ''
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-amber-400" />
                <h4 className="text-lg font-semibold text-white">Automated Response</h4>
                {phase === 'response' && animatedPhase && (
                  <span className="ml-auto text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full animate-pulse">
                    EXECUTING
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {responseActions.map((action, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      action.status === 'completed' ? 'bg-green-500/10 border-green-500/50' :
                      action.status === 'executing' ? 'bg-amber-500/10 border-amber-500/50' :
                      'bg-slate-900/50 border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {action.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-400" />}
                        {action.status === 'executing' && <Activity className="w-4 h-4 text-amber-400 animate-spin" />}
                        {action.status === 'pending' && <Clock className="w-4 h-4 text-slate-500" />}
                        <div>
                          <div className="text-sm font-medium text-white">{action.action}</div>
                          <div className="text-xs text-slate-400">Target: {action.target}</div>
                        </div>
                      </div>
                      {action.timestamp && (
                        <span className="text-xs text-slate-400">{action.timestamp}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {incidentLog && (
            <div className={`bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 transition-all duration-500 ${
              animatedPhase && phase === 'incident-log' ? 'border-green-500 shadow-lg shadow-green-500/20' : ''
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-green-400" />
                <h4 className="text-lg font-semibold text-white">Incident Log</h4>
                <span className="ml-auto text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                  THREAT NEUTRALIZED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">Timestamp</div>
                  <div className="text-sm font-medium text-white">{incidentLog.timestamp}</div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">Response Time</div>
                  <div className="text-sm font-semibold text-green-400">{incidentLog.responseTime}</div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">Threat Type</div>
                  <div className="text-sm font-medium text-white">{incidentLog.threatType}</div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">Outcome</div>
                  <div className="text-sm font-semibold text-green-400 capitalize">{incidentLog.outcome}</div>
                </div>
              </div>
            </div>
          )}

          {phase === 'comparison' || phase === 'complete' ? (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-5 h-5 text-blue-400" />
                <h4 className="text-lg font-semibold text-white">Manual vs Automated Response</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-4 bg-red-500/5 border border-red-500/30 rounded-lg transition-all duration-500 ${
                  revealedComparisons.has('manual') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <h5 className="font-semibold text-red-400">Manual Security</h5>
                  </div>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>• Detection: 15-60 minutes</li>
                    <li>• Response: 30-120 minutes</li>
                    <li>• Limited to business hours</li>
                    <li>• Human analysis required</li>
                    <li>• Inconsistent response quality</li>
                  </ul>
                </div>

                <div className={`p-4 bg-green-500/5 border border-green-500/30 rounded-lg transition-all duration-500 ${
                  revealedComparisons.has('automated') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <h5 className="font-semibold text-green-400">Automated TDR</h5>
                  </div>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>• Detection: &lt;5 seconds</li>
                    <li>• Response: &lt;10 seconds</li>
                    <li>• 24/7 continuous monitoring</li>
                    <li>• ML-powered analysis</li>
                    <li>• Consistent, rapid response</li>
                  </ul>
                </div>
              </div>

              {revealedComparisons.has('impact') && (
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg transition-all duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-5 h-5 text-blue-400" />
                    <h5 className="font-semibold text-blue-400">Real-World Impact</h5>
                  </div>
                  <p className="text-sm text-slate-300">
                    Automated threat detection and response reduces average breach containment time from 277 days to under 1 hour,
                    preventing an estimated 95% of potential damage and saving organizations millions in incident costs.
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