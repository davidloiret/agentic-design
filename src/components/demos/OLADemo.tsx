'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Activity, TrendingUp, Zap, AlertTriangle, RefreshCw, BarChart, Clock, Waves, Target } from 'lucide-react';

interface DataStream {
  id: string;
  timestamp: number;
  features: number[];
  label?: string;
  concept: 'stable' | 'drift' | 'shift';
  environmentState: string;
}

interface ModelState {
  accuracy: number;
  adaptationRate: number;
  driftDetection: number;
  stabilityIndex: number;
}

interface LearningWindow {
  windowId: string;
  dataPoints: DataStream[];
  modelUpdate: {
    beforeAccuracy: number;
    afterAccuracy: number;
    adaptationTime: number;
  };
}

interface ConceptDrift {
  detectedAt: number;
  severity: 'low' | 'medium' | 'high';
  adapted: boolean;
  description: string;
}

const OLADemo: React.FC = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'monitoring' | 'detecting' | 'adapting' | 'updating' | 'stable'>('monitoring');
  const [streamData, setStreamData] = useState<DataStream[]>([]);
  const [modelState, setModelState] = useState<ModelState>({
    accuracy: 75,
    adaptationRate: 0,
    driftDetection: 0,
    stabilityIndex: 85
  });
  const [learningWindows, setLearningWindows] = useState<LearningWindow[]>([]);
  const [detectedDrifts, setDetectedDrifts] = useState<ConceptDrift[]>([]);
  const [currentWindow, setCurrentWindow] = useState<DataStream[]>([]);
  const [streamSpeed, setStreamSpeed] = useState(1000); // ms between data points
  const [windowSize, setWindowSize] = useState(10);
  const [adaptationStrategy, setAdaptationStrategy] = useState<'incremental' | 'batch' | 'ensemble'>('incremental');
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const environmentStates = [
    'Normal Operations',
    'High Load',
    'Network Congestion',
    'Resource Constraints',
    'Security Threat',
    'Maintenance Mode'
  ];

  const generateDataPoint = (index: number): DataStream => {
    // Simulate concept drift after certain points
    const conceptPhase = Math.floor(index / 30);
    const hasDrift = conceptPhase > 0 && index % 30 < 5;
    const hasShift = index > 60 && index < 70;

    // Generate features with drift/shift
    const baseBias = conceptPhase * 0.2;
    const features = Array.from({ length: 5 }, (_, i) => {
      const base = Math.random();
      if (hasDrift) return base + baseBias + Math.random() * 0.3;
      if (hasShift) return 1 - base; // Sudden concept shift
      return base + baseBias * 0.1;
    });

    return {
      id: `stream-${index}`,
      timestamp: Date.now(),
      features,
      label: features[0] > 0.5 ? 'positive' : 'negative',
      concept: hasShift ? 'shift' : hasDrift ? 'drift' : 'stable',
      environmentState: environmentStates[Math.floor(Math.random() * environmentStates.length)]
    };
  };

  const detectConceptDrift = (window: DataStream[]): ConceptDrift | null => {
    if (window.length < windowSize) return null;

    const driftPoints = window.filter(d => d.concept === 'drift').length;
    const shiftPoints = window.filter(d => d.concept === 'shift').length;

    if (shiftPoints > windowSize * 0.3) {
      return {
        detectedAt: Date.now(),
        severity: 'high',
        adapted: false,
        description: 'Sudden concept shift detected - immediate adaptation required'
      };
    }

    if (driftPoints > windowSize * 0.4) {
      return {
        detectedAt: Date.now(),
        severity: 'medium',
        adapted: false,
        description: 'Gradual concept drift detected - incremental adaptation initiated'
      };
    }

    if (driftPoints > windowSize * 0.2) {
      return {
        detectedAt: Date.now(),
        severity: 'low',
        adapted: false,
        description: 'Minor distribution change detected - monitoring closely'
      };
    }

    return null;
  };

  const updateModel = (window: DataStream[], drift: ConceptDrift | null) => {
    const baseAccuracy = modelState.accuracy;
    let newAccuracy = baseAccuracy;
    let adaptationRate = 0;

    if (drift) {
      // Accuracy drops with drift
      const accuracyDrop = drift.severity === 'high' ? 20 : drift.severity === 'medium' ? 10 : 5;
      newAccuracy = Math.max(40, baseAccuracy - accuracyDrop);

      // Adaptation recovers accuracy
      if (adaptationStrategy === 'incremental') {
        adaptationRate = 0.3;
        newAccuracy = Math.min(95, newAccuracy + accuracyDrop * 0.7);
      } else if (adaptationStrategy === 'batch') {
        adaptationRate = 0.5;
        newAccuracy = Math.min(95, newAccuracy + accuracyDrop * 0.8);
      } else if (adaptationStrategy === 'ensemble') {
        adaptationRate = 0.7;
        newAccuracy = Math.min(95, newAccuracy + accuracyDrop * 0.9);
      }

      // Mark drift as adapted
      setDetectedDrifts(prev => prev.map(d =>
        d.detectedAt === drift.detectedAt ? { ...d, adapted: true } : d
      ));
    } else {
      // Gradual improvement in stable conditions
      newAccuracy = Math.min(95, baseAccuracy + 1);
      adaptationRate = 0.1;
    }

    setModelState(prev => ({
      accuracy: newAccuracy,
      adaptationRate: adaptationRate * 100,
      driftDetection: drift ? (drift.severity === 'high' ? 90 : drift.severity === 'medium' ? 60 : 30) : 0,
      stabilityIndex: drift ? Math.max(20, prev.stabilityIndex - 20) : Math.min(95, prev.stabilityIndex + 5)
    }));

    return { beforeAccuracy: baseAccuracy, afterAccuracy: newAccuracy, adaptationTime: 150 + Math.random() * 100 };
  };

  const processStreamData = (data: DataStream) => {
    setStreamData(prev => [...prev.slice(-50), data]);
    setCurrentWindow(prev => {
      const newWindow = [...prev, data].slice(-windowSize);

      // Check for concept drift
      const drift = detectConceptDrift(newWindow);
      if (drift) {
        setDetectedDrifts(prev => [...prev.slice(-5), drift]);
        setCurrentPhase('detecting');

        // Trigger adaptation
        setTimeout(() => {
          setCurrentPhase('adapting');
          setTimeout(() => {
            setCurrentPhase('updating');
            const update = updateModel(newWindow, drift);

            // Record learning window
            setLearningWindows(prev => [...prev.slice(-5), {
              windowId: `window-${Date.now()}`,
              dataPoints: newWindow,
              modelUpdate: update
            }]);

            setTimeout(() => {
              setCurrentPhase('stable');
              setTimeout(() => setCurrentPhase('monitoring'), 1000);
            }, 500);
          }, 800);
        }, 500);
      } else {
        // Regular update without drift
        if (newWindow.length === windowSize && Math.random() > 0.7) {
          updateModel(newWindow, null);
        }
      }

      return newWindow;
    });
  };

  // Start/stop streaming
  useEffect(() => {
    if (isStreaming) {
      let index = streamData.length;
      streamIntervalRef.current = setInterval(() => {
        const data = generateDataPoint(index++);
        processStreamData(data);
      }, streamSpeed);

      return () => {
        if (streamIntervalRef.current) {
          clearInterval(streamIntervalRef.current);
        }
      };
    } else {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    }
  }, [isStreaming, streamSpeed, windowSize, adaptationStrategy]);

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'detecting': return 'text-yellow-400 bg-yellow-950';
      case 'adapting': return 'text-orange-400 bg-orange-950';
      case 'updating': return 'text-blue-400 bg-blue-950';
      case 'stable': return 'text-green-400 bg-green-950';
      default: return 'text-gray-400 bg-gray-900';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getMetricColor = (value: number, metric: string) => {
    if (metric === 'stability') {
      if (value >= 70) return 'text-green-400';
      if (value >= 40) return 'text-yellow-400';
      return 'text-red-400';
    }
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Online Learning for Agents Demo</h2>

        {/* Streaming Configuration */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200">Streaming Configuration</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Stream Speed</label>
                <span className="text-sm font-mono text-blue-400">{streamSpeed}ms</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={streamSpeed}
                onChange={(e) => setStreamSpeed(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Window Size</label>
                <span className="text-sm font-mono text-blue-400">{windowSize}</span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="1"
                value={windowSize}
                onChange={(e) => setWindowSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2">Adaptation Strategy</label>
              <select
                value={adaptationStrategy}
                onChange={(e) => setAdaptationStrategy(e.target.value as any)}
                className="w-full px-3 py-1 bg-gray-900 border border-gray-700 rounded text-gray-100 text-sm"
              >
                <option value="incremental">Incremental</option>
                <option value="batch">Batch</option>
                <option value="ensemble">Ensemble</option>
              </select>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            System Status
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {['monitoring', 'detecting', 'adapting', 'updating', 'stable'].map(phase => (
              <div
                key={phase}
                className={`p-3 rounded border text-center transition-all ${
                  currentPhase === phase
                    ? `border-cyan-500 ${getPhaseColor(phase)}`
                    : 'border-gray-700 bg-gray-900 text-gray-500'
                }`}
              >
                <span className="text-xs font-medium capitalize">{phase}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Data Stream Visualization */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Waves className="w-5 h-5 text-blue-400" />
            Live Data Stream
          </h3>
          <div className="bg-gray-900 p-4 rounded border border-gray-700">
            <div className="flex items-center gap-1 h-20 overflow-hidden">
              {streamData.slice(-30).map((data, idx) => {
                const height = Math.max(10, data.features[0] * 100);
                const color = data.concept === 'shift' ? 'bg-red-500' :
                              data.concept === 'drift' ? 'bg-yellow-500' : 'bg-blue-500';
                return (
                  <div
                    key={idx}
                    className={`w-2 ${color} rounded-t transition-all`}
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-gray-500">← Older</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded" />
                  <span className="text-gray-400">Stable</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded" />
                  <span className="text-gray-400">Drift</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded" />
                  <span className="text-gray-400">Shift</span>
                </div>
              </div>
              <span className="text-gray-500">Newer →</span>
            </div>
          </div>
        </div>

        {/* Model Performance Metrics */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-green-400" />
            Model Performance
          </h3>
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-400">Accuracy</span>
              </div>
              <div className="text-2xl font-bold text-gray-100 mb-1">
                <span className={getMetricColor(modelState.accuracy, 'accuracy')}>
                  {modelState.accuracy.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    modelState.accuracy >= 80 ? 'bg-green-500' :
                    modelState.accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${modelState.accuracy}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <RefreshCw className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-400">Adaptation Rate</span>
              </div>
              <div className="text-2xl font-bold text-gray-100 mb-1">
                <span className={getMetricColor(modelState.adaptationRate, 'adaptation')}>
                  {modelState.adaptationRate.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5">
                <div
                  className="bg-cyan-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${modelState.adaptationRate}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-400">Drift Detection</span>
              </div>
              <div className="text-2xl font-bold text-gray-100 mb-1">
                <span className={modelState.driftDetection > 0 ? 'text-yellow-400' : 'text-green-400'}>
                  {modelState.driftDetection.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    modelState.driftDetection > 60 ? 'bg-red-500' :
                    modelState.driftDetection > 30 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${modelState.driftDetection}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-400">Stability Index</span>
              </div>
              <div className="text-2xl font-bold text-gray-100 mb-1">
                <span className={getMetricColor(modelState.stabilityIndex, 'stability')}>
                  {modelState.stabilityIndex.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    modelState.stabilityIndex >= 70 ? 'bg-green-500' :
                    modelState.stabilityIndex >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${modelState.stabilityIndex}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Detected Concept Drifts */}
        {detectedDrifts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Concept Drift History
            </h3>
            <div className="space-y-2">
              {detectedDrifts.slice(-3).reverse().map((drift, idx) => (
                <div key={idx} className="bg-gray-900 p-3 rounded border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-medium ${getSeverityColor(drift.severity)}`}>
                        {drift.severity.toUpperCase()} DRIFT
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(drift.detectedAt).toLocaleTimeString()}
                      </span>
                    </div>
                    {drift.adapted && (
                      <span className="text-xs text-green-400 flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" />
                        Adapted
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-300 mt-1">{drift.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Learning Windows */}
        {learningWindows.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              Recent Learning Windows
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {learningWindows.slice(-2).map((window, idx) => (
                <div key={idx} className="bg-gray-900 p-3 rounded border border-gray-700">
                  <div className="text-xs text-gray-400 mb-2">
                    Window Size: {window.dataPoints.length} samples
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500">Before</span>
                      <p className="text-sm font-medium text-red-400">
                        {window.modelUpdate.beforeAccuracy.toFixed(1)}%
                      </p>
                    </div>
                    <TrendingUp className="w-4 h-4 text-gray-600" />
                    <div>
                      <span className="text-xs text-gray-500">After</span>
                      <p className="text-sm font-medium text-green-400">
                        {window.modelUpdate.afterAccuracy.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Adaptation time: {window.modelUpdate.adaptationTime.toFixed(0)}ms
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How OLA Works */}
        <div className="bg-gray-900 p-4 rounded border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-indigo-400" />
            How Online Learning for Agents Works
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">1.</span>
              <div>
                <p className="font-medium text-gray-200">Continuous Monitoring</p>
                <p className="text-xs text-gray-400">Process streaming data in real-time as it arrives</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">2.</span>
              <div>
                <p className="font-medium text-gray-200">Drift Detection</p>
                <p className="text-xs text-gray-400">Monitor for concept drift and distribution shifts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">3.</span>
              <div>
                <p className="font-medium text-gray-200">Incremental Updates</p>
                <p className="text-xs text-gray-400">Update model parameters without full retraining</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">4.</span>
              <div>
                <p className="font-medium text-gray-200">Adaptive Strategies</p>
                <p className="text-xs text-gray-400">Choose between incremental, batch, or ensemble methods</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">5.</span>
              <div>
                <p className="font-medium text-gray-200">Performance Tracking</p>
                <p className="text-xs text-gray-400">Monitor accuracy and stability in dynamic environments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Control Button */}
        <button
          onClick={() => {
            if (isStreaming) {
              setIsStreaming(false);
              setCurrentPhase('monitoring');
            } else {
              setIsStreaming(true);
              if (streamData.length === 0) {
                setStreamData([]);
                setCurrentWindow([]);
                setLearningWindows([]);
                setDetectedDrifts([]);
                setModelState({
                  accuracy: 75,
                  adaptationRate: 0,
                  driftDetection: 0,
                  stabilityIndex: 85
                });
              }
            }
          }}
          className={`w-full py-3 rounded text-white font-medium transition-colors ${
            isStreaming
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-cyan-600 hover:bg-cyan-700'
          }`}
        >
          {isStreaming ? 'Stop Streaming' : 'Start Online Learning'}
        </button>
      </div>
    </div>
  );
};

export default OLADemo;