'use client';

import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, TrendingUp, Shield, Cpu, HardDrive, Network, Zap, Eye, CheckCircle } from 'lucide-react';

interface SystemMetric {
  timestamp: number;
  cpu: number;
  memory: number;
  latency: number;
  errorRate: number;
  throughput: number;
}

interface Anomaly {
  id: string;
  type: 'cpu_spike' | 'memory_leak' | 'latency_increase' | 'error_surge' | 'throughput_drop';
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  predictedFailureTime: number;
  description: string;
}

interface PredictiveModel {
  accuracy: number;
  precision: number;
  recall: number;
  leadTime: number; // Average time before failure prediction
}

interface PreemptiveMeasure {
  id: string;
  type: 'scale_resources' | 'redistribute_load' | 'cache_warmup' | 'circuit_breaker' | 'backup_activation';
  status: 'pending' | 'executing' | 'completed' | 'failed';
  effectiveness: number;
  timestamp: number;
}

interface AgentHealth {
  overall: number;
  components: {
    reasoning: number;
    memory: number;
    execution: number;
    communication: number;
  };
}

const PAFDemo: React.FC = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [detectedAnomalies, setDetectedAnomalies] = useState<Anomaly[]>([]);
  const [predictiveModel, setPredictiveModel] = useState<PredictiveModel>({
    accuracy: 92,
    precision: 88,
    recall: 85,
    leadTime: 120 // seconds
  });
  const [preemptiveMeasures, setPreemptiveMeasures] = useState<PreemptiveMeasure[]>([]);
  const [agentHealth, setAgentHealth] = useState<AgentHealth>({
    overall: 95,
    components: {
      reasoning: 92,
      memory: 94,
      execution: 96,
      communication: 98
    }
  });
  const [predictionConfidence, setPredictionConfidence] = useState(0);
  const [timeToFailure, setTimeToFailure] = useState<number | null>(null);
  const [currentPhase, setCurrentPhase] = useState<'monitoring' | 'detecting' | 'predicting' | 'preventing' | 'recovered'>('monitoring');
  const [animationProgress, setAnimationProgress] = useState(0);

  const generateSystemMetric = (index: number): SystemMetric => {
    // Simulate gradual degradation patterns
    const timeProgress = index / 100;
    const hasAnomaly = index > 30 && index < 70;

    return {
      timestamp: Date.now(),
      cpu: Math.min(95, 40 + (hasAnomaly ? timeProgress * 50 : Math.random() * 20)),
      memory: Math.min(95, 50 + (hasAnomaly ? timeProgress * 30 : Math.random() * 15)),
      latency: Math.max(10, 50 + (hasAnomaly ? timeProgress * 100 : Math.random() * 20)),
      errorRate: Math.max(0, hasAnomaly ? timeProgress * 5 : Math.random() * 0.5),
      throughput: Math.max(100, 500 - (hasAnomaly ? timeProgress * 200 : Math.random() * 50))
    };
  };

  const detectAnomalies = (metrics: SystemMetric[]): Anomaly[] => {
    if (metrics.length < 5) return [];

    const anomalies: Anomaly[] = [];
    const latest = metrics[metrics.length - 1];
    const recent = metrics.slice(-10);

    // CPU anomaly detection
    const avgCpu = recent.reduce((sum, m) => sum + m.cpu, 0) / recent.length;
    if (latest.cpu > avgCpu * 1.3) {
      anomalies.push({
        id: `anomaly-cpu-${Date.now()}`,
        type: 'cpu_spike',
        severity: latest.cpu > 80 ? 'high' : latest.cpu > 60 ? 'medium' : 'low',
        confidence: Math.min(95, 70 + (latest.cpu - avgCpu)),
        predictedFailureTime: Date.now() + 60000, // 1 minute
        description: 'CPU usage trending above normal thresholds'
      });
    }

    // Memory leak detection
    const memoryTrend = recent.map((m, i) => i > 0 ? m.memory - recent[i - 1].memory : 0).filter(d => d > 0);
    if (memoryTrend.length > 3 && memoryTrend.every(d => d > 0)) {
      anomalies.push({
        id: `anomaly-memory-${Date.now()}`,
        type: 'memory_leak',
        severity: latest.memory > 85 ? 'high' : 'medium',
        confidence: Math.min(90, 60 + memoryTrend.length * 5),
        predictedFailureTime: Date.now() + 120000, // 2 minutes
        description: 'Potential memory leak detected'
      });
    }

    // Latency anomaly
    const avgLatency = recent.reduce((sum, m) => sum + m.latency, 0) / recent.length;
    if (latest.latency > avgLatency * 1.5) {
      anomalies.push({
        id: `anomaly-latency-${Date.now()}`,
        type: 'latency_increase',
        severity: latest.latency > 150 ? 'high' : 'medium',
        confidence: Math.min(85, 65 + (latest.latency - avgLatency) / 5),
        predictedFailureTime: Date.now() + 90000, // 1.5 minutes
        description: 'Response times degrading'
      });
    }

    return anomalies;
  };

  const predictFailure = (anomalies: Anomaly[]): number | null => {
    if (anomalies.length === 0) return null;

    // Weight anomalies by severity and confidence
    const weights = {
      low: 1,
      medium: 2,
      high: 3
    };

    let totalWeight = 0;
    let weightedTime = 0;

    anomalies.forEach(anomaly => {
      const weight = weights[anomaly.severity] * (anomaly.confidence / 100);
      totalWeight += weight;
      weightedTime += anomaly.predictedFailureTime * weight;
    });

    if (totalWeight === 0) return null;

    const predictedTime = weightedTime / totalWeight;
    const confidence = Math.min(95, anomalies.reduce((sum, a) => sum + a.confidence, 0) / anomalies.length);

    setPredictionConfidence(confidence);
    return predictedTime;
  };

  const implementPreemptiveMeasures = (anomalies: Anomaly[]) => {
    const measures: PreemptiveMeasure[] = [];

    anomalies.forEach(anomaly => {
      let measure: PreemptiveMeasure | null = null;

      switch (anomaly.type) {
        case 'cpu_spike':
          measure = {
            id: `measure-${Date.now()}-cpu`,
            type: 'scale_resources',
            status: 'pending',
            effectiveness: 0,
            timestamp: Date.now()
          };
          break;

        case 'memory_leak':
          measure = {
            id: `measure-${Date.now()}-memory`,
            type: 'cache_warmup',
            status: 'pending',
            effectiveness: 0,
            timestamp: Date.now()
          };
          break;

        case 'latency_increase':
          measure = {
            id: `measure-${Date.now()}-latency`,
            type: 'redistribute_load',
            status: 'pending',
            effectiveness: 0,
            timestamp: Date.now()
          };
          break;

        case 'error_surge':
          measure = {
            id: `measure-${Date.now()}-error`,
            type: 'circuit_breaker',
            status: 'pending',
            effectiveness: 0,
            timestamp: Date.now()
          };
          break;

        case 'throughput_drop':
          measure = {
            id: `measure-${Date.now()}-throughput`,
            type: 'backup_activation',
            status: 'pending',
            effectiveness: 0,
            timestamp: Date.now()
          };
          break;
      }

      if (measure) {
        measures.push(measure);
      }
    });

    setPreemptiveMeasures(prev => [...prev.slice(-4), ...measures]);

    // Execute measures over time
    measures.forEach((measure, index) => {
      setTimeout(() => {
        setPreemptiveMeasures(prev => prev.map(m =>
          m.id === measure.id ? { ...m, status: 'executing' } : m
        ));

        setTimeout(() => {
          const effectiveness = 60 + Math.random() * 35; // 60-95% effectiveness
          setPreemptiveMeasures(prev => prev.map(m =>
            m.id === measure.id ? { ...m, status: 'completed', effectiveness } : m
          ));

          // Improve health based on effectiveness
          setAgentHealth(prev => ({
            overall: Math.min(100, prev.overall + effectiveness / 20),
            components: {
              reasoning: Math.min(100, prev.components.reasoning + effectiveness / 25),
              memory: Math.min(100, prev.components.memory + effectiveness / 22),
              execution: Math.min(100, prev.components.execution + effectiveness / 20),
              communication: Math.min(100, prev.components.communication + effectiveness / 18)
            }
          }));
        }, 1500);
      }, index * 500);
    });
  };

  useEffect(() => {
    if (!isMonitoring) return;

    let metricIndex = 0;
    let anomalyCheckCounter = 0;

    const interval = setInterval(() => {
      // Generate new metric
      const newMetric = generateSystemMetric(metricIndex++);
      setSystemMetrics(prev => [...prev.slice(-29), newMetric]);

      // Check for anomalies every 5 metrics
      anomalyCheckCounter++;
      if (anomalyCheckCounter % 5 === 0) {
        setCurrentPhase('detecting');
        const metrics = systemMetrics.slice(-10);
        if (metrics.length >= 5) {
          const anomalies = detectAnomalies([...metrics, newMetric]);

          if (anomalies.length > 0) {
            setDetectedAnomalies(prev => [...prev.slice(-5), ...anomalies]);
            setCurrentPhase('predicting');

            // Predict failure
            const predictedTime = predictFailure(anomalies);
            if (predictedTime) {
              setTimeToFailure(Math.floor((predictedTime - Date.now()) / 1000));

              // Implement preemptive measures
              setTimeout(() => {
                setCurrentPhase('preventing');
                implementPreemptiveMeasures(anomalies);

                setTimeout(() => {
                  setCurrentPhase('recovered');
                  setTimeout(() => setCurrentPhase('monitoring'), 2000);
                }, 3000);
              }, 1000);
            }
          } else {
            setTimeout(() => setCurrentPhase('monitoring'), 500);
          }
        }
      }

      // Simulate health degradation
      if (!detectedAnomalies.length || currentPhase === 'monitoring') {
        setAgentHealth(prev => ({
          overall: Math.max(50, prev.overall - Math.random() * 0.5),
          components: {
            reasoning: Math.max(40, prev.components.reasoning - Math.random() * 0.6),
            memory: Math.max(45, prev.components.memory - Math.random() * 0.4),
            execution: Math.max(50, prev.components.execution - Math.random() * 0.5),
            communication: Math.max(55, prev.components.communication - Math.random() * 0.3)
          }
        }));
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isMonitoring, systemMetrics]);

  useEffect(() => {
    if (timeToFailure !== null && timeToFailure > 0) {
      const timer = setTimeout(() => {
        setTimeToFailure(prev => prev !== null ? prev - 1 : null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeToFailure]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getHealthColor = (value: number) => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getMeasureIcon = (type: string) => {
    switch (type) {
      case 'scale_resources': return <Cpu className="w-4 h-4" />;
      case 'redistribute_load': return <Network className="w-4 h-4" />;
      case 'cache_warmup': return <HardDrive className="w-4 h-4" />;
      case 'circuit_breaker': return <Shield className="w-4 h-4" />;
      case 'backup_activation': return <Zap className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'monitoring': return 'text-blue-400 bg-blue-950';
      case 'detecting': return 'text-yellow-400 bg-yellow-950';
      case 'predicting': return 'text-orange-400 bg-orange-950';
      case 'preventing': return 'text-purple-400 bg-purple-950';
      case 'recovered': return 'text-green-400 bg-green-950';
      default: return 'text-gray-400 bg-gray-900';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Predictive Agent Fault Tolerance Demo</h2>

        {/* System Status */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-200">System Status</h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPhaseColor(currentPhase)}`}>
              {currentPhase.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Real-time Metrics Visualization */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Real-time System Metrics
          </h3>
          <div className="bg-gray-900 p-4 rounded border border-gray-700">
            <div className="grid grid-cols-5 gap-4 mb-4">
              {systemMetrics.length > 0 && (() => {
                const latest = systemMetrics[systemMetrics.length - 1];
                return (
                  <>
                    <div>
                      <div className="text-xs text-gray-500">CPU</div>
                      <div className={`text-lg font-bold ${getHealthColor(100 - latest.cpu)}`}>
                        {latest.cpu.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Memory</div>
                      <div className={`text-lg font-bold ${getHealthColor(100 - latest.memory)}`}>
                        {latest.memory.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Latency</div>
                      <div className={`text-lg font-bold ${getHealthColor(150 - latest.latency)}`}>
                        {latest.latency.toFixed(0)}ms
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Errors</div>
                      <div className={`text-lg font-bold ${getHealthColor(100 - latest.errorRate * 20)}`}>
                        {latest.errorRate.toFixed(2)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Throughput</div>
                      <div className={`text-lg font-bold ${getHealthColor(latest.throughput / 5)}`}>
                        {latest.throughput.toFixed(0)}/s
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Metrics Graph */}
            <div className="h-20 flex items-end gap-1">
              {systemMetrics.slice(-30).map((metric, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t opacity-70"
                  style={{ height: `${metric.cpu}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Predictive Model Performance */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-400" />
            Predictive Model Performance
          </h3>
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Accuracy</div>
              <div className="text-xl font-bold text-purple-400">
                {predictiveModel.accuracy}%
              </div>
            </div>
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Precision</div>
              <div className="text-xl font-bold text-blue-400">
                {predictiveModel.precision}%
              </div>
            </div>
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Recall</div>
              <div className="text-xl font-bold text-cyan-400">
                {predictiveModel.recall}%
              </div>
            </div>
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Lead Time</div>
              <div className="text-xl font-bold text-green-400">
                {predictiveModel.leadTime}s
              </div>
            </div>
          </div>
        </div>

        {/* Failure Prediction */}
        {timeToFailure !== null && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-400 animate-pulse" />
              Failure Prediction
            </h3>
            <div className="bg-orange-950 p-4 rounded border border-orange-700">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm text-orange-300">Predicted Failure In</div>
                  <div className="text-3xl font-bold text-orange-400">{timeToFailure}s</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Confidence</div>
                  <div className="text-2xl font-bold text-orange-400">
                    {predictionConfidence.toFixed(0)}%
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${predictionConfidence}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Detected Anomalies */}
        {detectedAnomalies.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Detected Anomalies
            </h3>
            <div className="space-y-2">
              {detectedAnomalies.slice(-3).map(anomaly => (
                <div key={anomaly.id} className="bg-gray-900 p-3 rounded border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-sm font-medium ${getSeverityColor(anomaly.severity)} uppercase`}>
                        {anomaly.severity}
                      </span>
                      <span className="text-sm text-gray-400 ml-3">
                        {anomaly.type.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {anomaly.confidence.toFixed(0)}% confident
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{anomaly.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Preemptive Measures */}
        {preemptiveMeasures.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Preemptive Measures
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {preemptiveMeasures.slice(-4).map(measure => (
                <div key={measure.id} className="bg-gray-900 p-3 rounded border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getMeasureIcon(measure.type)}
                      <span className="text-sm font-medium text-gray-200">
                        {measure.type.replace(/_/g, ' ')}
                      </span>
                    </div>
                    {measure.status === 'completed' && (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`capitalize ${
                      measure.status === 'completed' ? 'text-green-400' :
                      measure.status === 'executing' ? 'text-yellow-400' :
                      'text-gray-400'
                    }`}>
                      {measure.status}
                    </span>
                    {measure.effectiveness > 0 && (
                      <span className="text-gray-400">
                        {measure.effectiveness.toFixed(0)}% effective
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agent Health */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            Agent Health
          </h3>
          <div className="bg-gray-900 p-4 rounded border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-gray-200">Overall Health</span>
              <span className={`text-2xl font-bold ${getHealthColor(agentHealth.overall)}`}>
                {agentHealth.overall.toFixed(1)}%
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(agentHealth.components).map(([component, value]) => (
                <div key={component}>
                  <div className="text-xs text-gray-500 mb-1 capitalize">{component}</div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        value >= 80 ? 'bg-green-500' :
                        value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{value.toFixed(0)}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How PAF Works */}
        <div className="bg-gray-900 p-4 rounded border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-400" />
            How Predictive Agent Fault Tolerance Works
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">1.</span>
              <div>
                <p className="font-medium text-gray-200">Continuous Monitoring</p>
                <p className="text-xs text-gray-400">Track CPU, memory, latency, errors, and throughput in real-time</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">2.</span>
              <div>
                <p className="font-medium text-gray-200">Anomaly Detection</p>
                <p className="text-xs text-gray-400">AI models identify patterns indicating potential failures</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">3.</span>
              <div>
                <p className="font-medium text-gray-200">Failure Prediction</p>
                <p className="text-xs text-gray-400">Estimate time to failure with confidence scores</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">4.</span>
              <div>
                <p className="font-medium text-gray-200">Preemptive Action</p>
                <p className="text-xs text-gray-400">Automatically implement recovery measures before failure</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">5.</span>
              <div>
                <p className="font-medium text-gray-200">Health Recovery</p>
                <p className="text-xs text-gray-400">Monitor effectiveness and maintain system stability</p>
              </div>
            </div>
          </div>
        </div>

        {/* Control Button */}
        <button
          onClick={() => {
            if (isMonitoring) {
              setIsMonitoring(false);
            } else {
              setSystemMetrics([]);
              setDetectedAnomalies([]);
              setPreemptiveMeasures([]);
              setTimeToFailure(null);
              setPredictionConfidence(0);
              setCurrentPhase('monitoring');
              setAgentHealth({
                overall: 95,
                components: {
                  reasoning: 92,
                  memory: 94,
                  execution: 96,
                  communication: 98
                }
              });
              setIsMonitoring(true);
            }
          }}
          className={`w-full py-3 rounded text-white font-medium transition-colors ${
            isMonitoring
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isMonitoring ? 'Stop Monitoring' : 'Start Predictive Monitoring'}
        </button>
      </div>
    </div>
  );
};

export default PAFDemo;