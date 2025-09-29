'use client';

import React, { useState, useEffect } from 'react';
import { Eye, AlertTriangle, Zap, Activity, PlayCircle, PauseCircle } from 'lucide-react';

type OperationMode = 'autonomous' | 'alert' | 'intervention' | 'human-control' | 'resuming';
type AlertLevel = 'normal' | 'warning' | 'critical';
type PhaseType = 'idle' | 'autonomous-operation' | 'monitoring' | 'anomaly-detection' | 'human-intervention' | 'resume-autonomy' | 'complete';

interface OperationEvent {
  id: string;
  timestamp: number;
  type: 'trade' | 'quality-check' | 'navigation' | 'anomaly';
  description: string;
  status: 'success' | 'warning' | 'error';
  aiConfidence: number;
  requiresIntervention: boolean;
}

interface MonitoringMetric {
  id: string;
  name: string;
  value: number;
  threshold: number;
  status: AlertLevel;
  unit: string;
}

interface Intervention {
  id: string;
  triggerEvent: string;
  reason: string;
  humanAction: string;
  responseTime: number;
  resolved: boolean;
}

interface Supervisor {
  id: string;
  name: string;
  role: string;
  status: 'monitoring' | 'intervening' | 'idle';
  interventionsHandled: number;
  attentionLevel: number;
}

interface HOTLMetrics {
  autonomousOperationTime: number;
  meanTimeToDetection: number;
  interventionResponseTime: number;
  falseAlertRate: number;
  successfulTakeoverRate: number;
  returnToAutonomyTime: number;
}

const HumanOnTheLoopDemo: React.FC = () => {
  const [phase, setPhase] = useState<PhaseType>('idle');
  const [operationMode, setOperationMode] = useState<OperationMode>('autonomous');
  const [events, setEvents] = useState<OperationEvent[]>([]);
  const [monitoringMetrics, setMonitoringMetrics] = useState<MonitoringMetric[]>([]);
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [supervisor, setSupervisor] = useState<Supervisor>({
    id: 'sup-1',
    name: 'John Martinez',
    role: 'Senior Systems Supervisor',
    status: 'monitoring',
    interventionsHandled: 0,
    attentionLevel: 85,
  });
  const [metrics, setMetrics] = useState<HOTLMetrics>({
    autonomousOperationTime: 0,
    meanTimeToDetection: 0,
    interventionResponseTime: 0,
    falseAlertRate: 0,
    successfulTakeoverRate: 0,
    returnToAutonomyTime: 0,
  });
  const [totalEvents, setTotalEvents] = useState(0);
  const [autonomousEvents, setAutonomousEvents] = useState(0);

  const initialMetrics: MonitoringMetric[] = [
    { id: 'metric-1', name: 'Trading Velocity', value: 145, threshold: 200, status: 'normal', unit: 'trades/min' },
    { id: 'metric-2', name: 'Market Volatility', value: 12, threshold: 25, status: 'normal', unit: '%' },
    { id: 'metric-3', name: 'Risk Exposure', value: 1.8, threshold: 3.0, status: 'normal', unit: 'M$' },
    { id: 'metric-4', name: 'System Latency', value: 45, threshold: 100, status: 'normal', unit: 'ms' },
  ];

  useEffect(() => {
    if (phase === 'idle') {
      const timer = setTimeout(() => {
        setPhase('autonomous-operation');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'autonomous-operation') {
      setMonitoringMetrics(initialMetrics);
      setOperationMode('autonomous');

      const autonomousEvents: OperationEvent[] = [
        {
          id: 'evt-1',
          timestamp: Date.now(),
          type: 'trade',
          description: 'Executed 50 AAPL shares at $182.50',
          status: 'success',
          aiConfidence: 94,
          requiresIntervention: false,
        },
        {
          id: 'evt-2',
          timestamp: Date.now() + 500,
          type: 'trade',
          description: 'Executed 100 GOOGL shares at $140.25',
          status: 'success',
          aiConfidence: 92,
          requiresIntervention: false,
        },
        {
          id: 'evt-3',
          timestamp: Date.now() + 1000,
          type: 'trade',
          description: 'Executed 75 MSFT shares at $415.80',
          status: 'success',
          aiConfidence: 96,
          requiresIntervention: false,
        },
        {
          id: 'evt-4',
          timestamp: Date.now() + 1500,
          type: 'quality-check',
          description: 'Portfolio rebalance completed',
          status: 'success',
          aiConfidence: 89,
          requiresIntervention: false,
        },
      ];

      setTotalEvents(prev => prev + autonomousEvents.length);
      setAutonomousEvents(prev => prev + autonomousEvents.length);

      let eventIndex = 0;
      const eventInterval = setInterval(() => {
        if (eventIndex < autonomousEvents.length) {
          const event = autonomousEvents[eventIndex];
          setEvents(prev => [...prev, event]);
          eventIndex++;
        } else {
          clearInterval(eventInterval);
          setTimeout(() => setPhase('monitoring'), 400);
        }
      }, 300);

      return () => clearInterval(eventInterval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'monitoring') {
      setSupervisor(prev => ({ ...prev, status: 'monitoring', attentionLevel: 85 }));
      setTimeout(() => setPhase('anomaly-detection'), 1500);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'anomaly-detection') {
      setOperationMode('alert');

      setTimeout(() => {
        setMonitoringMetrics(prev => prev.map(m =>
          m.id === 'metric-2'
            ? { ...m, value: 32, status: 'critical' }
            : m.id === 'metric-3'
            ? { ...m, value: 3.5, status: 'critical' }
            : m
        ));
      }, 300);

      setTimeout(() => {
        const anomalyEvent: OperationEvent = {
          id: 'evt-5',
          timestamp: Date.now() + 2000,
          type: 'anomaly',
          description: 'CRITICAL: Market volatility spike + risk breach',
          status: 'error',
          aiConfidence: 45,
          requiresIntervention: true,
        };

        setEvents(prev => [...prev, anomalyEvent]);
        setTotalEvents(prev => prev + 1);
        setSupervisor(prev => ({ ...prev, attentionLevel: 100 }));
        setTimeout(() => setPhase('human-intervention'), 800);
      }, 800);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'human-intervention') {
      setOperationMode('intervention');
      setSupervisor(prev => ({ ...prev, status: 'intervening' }));

      setTimeout(() => {
        setOperationMode('human-control');

        const intervention: Intervention = {
          id: 'int-1',
          triggerEvent: 'Market volatility spike + risk exposure breach',
          reason: 'Volatility: 32% (threshold: 25%), Risk: $3.5M (threshold: $3.0M)',
          humanAction: 'Pause automated trading, liquidate high-risk positions, reduce exposure to $1.2M',
          responseTime: 2.3,
          resolved: false,
        };

        setInterventions([intervention]);
        setSupervisor(prev => ({ ...prev, interventionsHandled: prev.interventionsHandled + 1 }));

        setTimeout(() => {
          setInterventions(prev => prev.map(i => ({ ...i, resolved: true })));

          setMonitoringMetrics(prev => prev.map(m =>
            m.id === 'metric-2'
              ? { ...m, value: 18, status: 'normal' }
              : m.id === 'metric-3'
              ? { ...m, value: 1.2, status: 'normal' }
              : m
          ));

          const recoveryEvent: OperationEvent = {
            id: 'evt-6',
            timestamp: Date.now() + 3500,
            type: 'quality-check',
            description: 'Human intervention: Risk reduced to safe levels',
            status: 'success',
            aiConfidence: 100,
            requiresIntervention: false,
          };

          setEvents(prev => [...prev, recoveryEvent]);
          setTotalEvents(prev => prev + 1);

          setTimeout(() => setPhase('resume-autonomy'), 800);
        }, 1500);
      }, 1000);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'resume-autonomy') {
      setOperationMode('resuming');
      setSupervisor(prev => ({ ...prev, status: 'monitoring', attentionLevel: 75 }));

      setTimeout(() => {
        setOperationMode('autonomous');

        const resumeEvents: OperationEvent[] = [
          {
            id: 'evt-7',
            timestamp: Date.now() + 4500,
            type: 'trade',
            description: 'Resumed automated trading with reduced risk parameters',
            status: 'success',
            aiConfidence: 91,
            requiresIntervention: false,
          },
          {
            id: 'evt-8',
            timestamp: Date.now() + 5000,
            type: 'trade',
            description: 'Executed 30 SPY shares at $582.10',
            status: 'success',
            aiConfidence: 93,
            requiresIntervention: false,
          },
        ];

        setTotalEvents(prev => prev + resumeEvents.length);
        setAutonomousEvents(prev => prev + resumeEvents.length);

        resumeEvents.forEach((event, index) => {
          setTimeout(() => {
            setEvents(prev => [...prev, event]);
          }, index * 400);
        });

        setTimeout(() => {
          const autonomousOperationTime = Math.round((autonomousEvents / totalEvents) * 100);
          const interventionRate = 100 - autonomousOperationTime;

          setMetrics({
            autonomousOperationTime: 75,
            meanTimeToDetection: 1.2,
            interventionResponseTime: 2.3,
            falseAlertRate: 8,
            successfulTakeoverRate: 100,
            returnToAutonomyTime: 3.5,
          });

          setPhase('complete');
        }, resumeEvents.length * 400 + 800);
      }, 1200);
    }
  }, [phase, autonomousEvents, totalEvents]);

  const getOperationModeColor = (mode: OperationMode): string => {
    switch (mode) {
      case 'autonomous': return 'bg-green-600';
      case 'alert': return 'bg-yellow-600';
      case 'intervention': return 'bg-orange-600';
      case 'human-control': return 'bg-red-600';
      case 'resuming': return 'bg-blue-600';
      default: return 'bg-slate-700';
    }
  };

  const getOperationModeIcon = (mode: OperationMode) => {
    switch (mode) {
      case 'autonomous': return <Zap className="w-5 h-5 text-white" />;
      case 'alert': return <AlertTriangle className="w-5 h-5 text-white" />;
      case 'intervention': return <PauseCircle className="w-5 h-5 text-white" />;
      case 'human-control': return <Eye className="w-5 h-5 text-white" />;
      case 'resuming': return <PlayCircle className="w-5 h-5 text-white" />;
      default: return <Activity className="w-5 h-5 text-white" />;
    }
  };

  const getMetricStatusColor = (status: AlertLevel): string => {
    switch (status) {
      case 'normal': return 'bg-green-600/20 border-green-600/50';
      case 'warning': return 'bg-yellow-600/20 border-yellow-600/50';
      case 'critical': return 'bg-red-600/20 border-red-600/50';
      default: return 'bg-slate-700 border-slate-600';
    }
  };

  const getEventStatusColor = (status: string): string => {
    switch (status) {
      case 'success': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'error': return 'bg-red-600';
      default: return 'bg-slate-700';
    }
  };

  const getPhaseDescription = (): string => {
    switch (phase) {
      case 'idle': return 'Initializing Human-on-the-Loop system...';
      case 'autonomous-operation': return 'AI operating autonomously - executing trades and managing portfolio...';
      case 'monitoring': return 'Human supervisor monitoring system health and metrics...';
      case 'anomaly-detection': return 'ALERT: Anomaly detected - market volatility spike and risk breach...';
      case 'human-intervention': return 'Human supervisor taking control to mitigate risk...';
      case 'resume-autonomy': return 'Returning to autonomous operation with updated parameters...';
      case 'complete': return 'HOTL cycle complete with 75% autonomous operation and successful intervention';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${getOperationModeColor(operationMode)}`}>
            {getOperationModeIcon(operationMode)}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Human-on-the-Loop Operation</h3>
            <p className="text-sm text-gray-400 mt-1">{getPhaseDescription()}</p>
          </div>
          <div className={`px-4 py-2 rounded-lg ${getOperationModeColor(operationMode)}`}>
            <span className="text-xs font-bold text-white uppercase">
              {operationMode === 'human-control' ? 'MANUAL' : operationMode.replace('-', ' ')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {(['autonomous-operation', 'monitoring', 'anomaly-detection', 'human-intervention', 'resume-autonomy'] as PhaseType[]).map((p, idx) => (
            <React.Fragment key={p}>
              <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                phase === p ? 'bg-purple-500' :
                ['monitoring', 'anomaly-detection', 'human-intervention', 'resume-autonomy', 'complete'].includes(phase) && idx === 0 ? 'bg-green-600' :
                ['anomaly-detection', 'human-intervention', 'resume-autonomy', 'complete'].includes(phase) && idx === 1 ? 'bg-green-600' :
                ['human-intervention', 'resume-autonomy', 'complete'].includes(phase) && idx === 2 ? 'bg-green-600' :
                ['resume-autonomy', 'complete'].includes(phase) && idx === 3 ? 'bg-green-600' :
                phase === 'complete' && idx === 4 ? 'bg-green-600' :
                'bg-slate-700'
              }`} />
              {idx < 4 && <div className="w-2 h-2 rounded-full bg-slate-600" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-blue-400" />
            <h4 className="font-semibold text-white">Real-Time Monitoring</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {monitoringMetrics.map((metric) => (
              <div
                key={metric.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${getMetricStatusColor(metric.status)}`}
              >
                <div className="text-xs text-gray-400 mb-1">{metric.name}</div>
                <div className="text-2xl font-bold text-white mb-1">
                  {metric.value}
                  <span className="text-sm font-normal ml-1">{metric.unit}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Threshold: {metric.threshold} {metric.unit}
                </div>
                {metric.status === 'critical' && (
                  <div className="mt-2 text-xs font-bold text-red-400 uppercase">
                    ⚠️ BREACH
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-4 h-4 text-purple-400" />
            <h4 className="font-semibold text-white">Supervisor Status</h4>
          </div>
          <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-medium text-white">{supervisor.name}</div>
                <div className="text-xs text-gray-400">{supervisor.role}</div>
              </div>
              <div className={`px-3 py-1 rounded-lg ${
                supervisor.status === 'intervening' ? 'bg-red-600' :
                supervisor.status === 'monitoring' ? 'bg-green-600' :
                'bg-slate-600'
              }`}>
                <span className="text-xs font-bold text-white uppercase">{supervisor.status}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Attention Level</span>
                  <span>{supervisor.attentionLevel}%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      supervisor.attentionLevel >= 90 ? 'bg-red-500' :
                      supervisor.attentionLevel >= 70 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${supervisor.attentionLevel}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Interventions Handled</span>
                <span className="text-white font-semibold">{supervisor.interventionsHandled}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-green-400" />
            <h4 className="font-semibold text-white">Operation Events ({events.length})</h4>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {events.map((event) => (
              <div
                key={event.id}
                className={`p-3 rounded-lg border transition-all duration-300 ${getEventStatusColor(event.status)} border-slate-600`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-white uppercase">{event.type}</span>
                  {event.requiresIntervention && (
                    <AlertTriangle className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="text-xs text-white">{event.description}</div>
                <div className="text-xs text-gray-300 mt-1">
                  AI Confidence: {event.aiConfidence}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {interventions.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <h4 className="font-semibold text-white">Human Interventions</h4>
            </div>
            <div className="space-y-3">
              {interventions.map((intervention) => (
                <div
                  key={intervention.id}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    intervention.resolved ? 'bg-green-600/20 border-green-600/50' : 'bg-red-600/20 border-red-600/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white uppercase">Intervention</span>
                    <span className="text-xs text-gray-400">{intervention.responseTime}s response</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-gray-400">Trigger:</div>
                      <div className="text-xs text-white">{intervention.triggerEvent}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Reason:</div>
                      <div className="text-xs text-yellow-300">{intervention.reason}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Action Taken:</div>
                      <div className="text-xs text-green-300">{intervention.humanAction}</div>
                    </div>
                    {intervention.resolved && (
                      <div className="mt-2 pt-2 border-t border-slate-600">
                        <div className="text-xs font-bold text-green-400">✓ RESOLVED</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {phase === 'complete' && (
        <div className="bg-gradient-to-r from-green-900/20 to-purple-900/20 border border-green-700/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-green-400" />
            <h4 className="font-semibold text-white">HOTL Performance Metrics</h4>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Autonomous Operation Time</div>
              <div className="text-2xl font-bold text-green-400">{metrics.autonomousOperationTime}%</div>
              <div className="text-xs text-gray-500 mt-1">Running without intervention</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Mean Time to Detection</div>
              <div className="text-2xl font-bold text-blue-400">{metrics.meanTimeToDetection}s</div>
              <div className="text-xs text-gray-500 mt-1">Anomaly detection speed</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Intervention Response Time</div>
              <div className="text-2xl font-bold text-orange-400">{metrics.interventionResponseTime}s</div>
              <div className="text-xs text-gray-500 mt-1">Alert to human action</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">False Alert Rate</div>
              <div className="text-2xl font-bold text-yellow-400">{metrics.falseAlertRate}%</div>
              <div className="text-xs text-gray-500 mt-1">Unnecessary alerts</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Successful Takeover Rate</div>
              <div className="text-2xl font-bold text-purple-400">{metrics.successfulTakeoverRate}%</div>
              <div className="text-xs text-gray-500 mt-1">Intervention success</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Return to Autonomy Time</div>
              <div className="text-2xl font-bold text-pink-400">{metrics.returnToAutonomyTime}s</div>
              <div className="text-xs text-gray-500 mt-1">Resume normal operation</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-green-900/20 border border-green-700/30 rounded-lg">
            <div className="text-sm text-green-300">
              <strong>HOTL Summary:</strong> System operated autonomously for {metrics.autonomousOperationTime}% of time
              ({autonomousEvents}/{totalEvents} events). Detected critical anomaly in {metrics.meanTimeToDetection}s
              (volatility spike + risk breach). Human supervisor intervened in {metrics.interventionResponseTime}s,
              successfully took control, and mitigated risk. System resumed autonomous operation in {metrics.returnToAutonomyTime}s
              with updated parameters. {metrics.successfulTakeoverRate}% takeover success with only {metrics.falseAlertRate}% false alerts.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HumanOnTheLoopDemo;