'use client';

import React, { useState, useEffect } from 'react';
import { Brain, Layers, Network, Search, Sparkles, BarChart, Eye, Shuffle, CircleDot } from 'lucide-react';

interface DataPoint {
  id: string;
  features: number[];
  clusterId?: number;
  anomalyScore?: number;
  embedding?: number[];
}

interface Cluster {
  id: number;
  centroid: number[];
  points: DataPoint[];
  label: string;
  color: string;
}

interface Pattern {
  type: 'cluster' | 'anomaly' | 'correlation' | 'dimension';
  description: string;
  confidence: number;
  dataPoints: number;
}

interface LearningMetrics {
  clusterQuality: number;
  anomalyDetection: number;
  dimensionReduction: number;
  patternDiscovery: number;
}

const ULADemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'collecting' | 'clustering' | 'reducing' | 'anomaly' | 'analyzing' | 'complete'>('collecting');
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [discoveredPatterns, setDiscoveredPatterns] = useState<Pattern[]>([]);
  const [learningMetrics, setLearningMetrics] = useState<LearningMetrics>({
    clusterQuality: 0,
    anomalyDetection: 0,
    dimensionReduction: 0,
    patternDiscovery: 0
  });
  const [animationProgress, setAnimationProgress] = useState(0);
  const [numClusters, setNumClusters] = useState(4);
  const [dimensionality, setDimensionality] = useState(10);
  const [iteration, setIteration] = useState(0);

  const clusterLabels = [
    { label: 'Navigation Tasks', color: 'bg-blue-500' },
    { label: 'Communication Patterns', color: 'bg-green-500' },
    { label: 'Error Handling', color: 'bg-red-500' },
    { label: 'Data Processing', color: 'bg-purple-500' },
    { label: 'User Interactions', color: 'bg-yellow-500' },
    { label: 'System Monitoring', color: 'bg-cyan-500' }
  ];

  const generateDataPoint = (index: number): DataPoint => {
    // Generate synthetic high-dimensional data
    const features = Array.from({ length: dimensionality }, () => {
      // Create some natural clustering
      const clusterBias = Math.floor(index / 20) % numClusters;
      return Math.random() * 0.5 + (clusterBias * 0.2);
    });

    return {
      id: `point-${index}`,
      features
    };
  };

  const performKMeansClustering = (points: DataPoint[], k: number): Cluster[] => {
    // Simplified K-means clustering simulation
    const clusters: Cluster[] = [];

    for (let i = 0; i < k; i++) {
      const clusterPoints = points.filter((_, idx) => idx % k === i);
      const centroid = Array.from({ length: dimensionality }, (_, dim) => {
        return clusterPoints.reduce((sum, p) => sum + p.features[dim], 0) / clusterPoints.length;
      });

      clusters.push({
        id: i,
        centroid,
        points: clusterPoints.map(p => ({ ...p, clusterId: i })),
        label: clusterLabels[i % clusterLabels.length].label,
        color: clusterLabels[i % clusterLabels.length].color
      });
    }

    return clusters;
  };

  const performDimensionalityReduction = (points: DataPoint[]): DataPoint[] => {
    // Simulate PCA/t-SNE dimension reduction to 2D
    return points.map(point => ({
      ...point,
      embedding: [
        point.features.reduce((sum, f, i) => sum + f * Math.cos(i), 0) / Math.sqrt(dimensionality),
        point.features.reduce((sum, f, i) => sum + f * Math.sin(i), 0) / Math.sqrt(dimensionality)
      ]
    }));
  };

  const detectAnomalies = (points: DataPoint[], clusters: Cluster[]): DataPoint[] => {
    // Calculate anomaly scores based on distance from cluster centroids
    return points.map(point => {
      if (point.clusterId === undefined) return point;

      const cluster = clusters.find(c => c.id === point.clusterId);
      if (!cluster) return point;

      const distance = Math.sqrt(
        point.features.reduce((sum, f, i) =>
          sum + Math.pow(f - cluster.centroid[i], 2), 0
        )
      );

      const anomalyScore = Math.min(1, distance / Math.sqrt(dimensionality));

      return {
        ...point,
        anomalyScore
      };
    });
  };

  const discoverPatterns = (clusters: Cluster[], points: DataPoint[]): Pattern[] => {
    const patterns: Pattern[] = [];

    // Cluster patterns
    clusters.forEach(cluster => {
      if (cluster.points.length > 0) {
        patterns.push({
          type: 'cluster',
          description: `Found ${cluster.label} cluster with ${cluster.points.length} behaviors`,
          confidence: Math.min(0.95, 0.6 + cluster.points.length / 100),
          dataPoints: cluster.points.length
        });
      }
    });

    // Anomaly patterns
    const anomalies = points.filter(p => p.anomalyScore && p.anomalyScore > 0.7);
    if (anomalies.length > 0) {
      patterns.push({
        type: 'anomaly',
        description: `Detected ${anomalies.length} unusual behavioral patterns`,
        confidence: 0.85,
        dataPoints: anomalies.length
      });
    }

    // Correlation patterns
    patterns.push({
      type: 'correlation',
      description: 'Strong correlation between navigation and error recovery behaviors',
      confidence: 0.78,
      dataPoints: Math.floor(points.length * 0.3)
    });

    // Dimension reduction insights
    patterns.push({
      type: 'dimension',
      description: `Reduced ${dimensionality}D space to 2D while preserving 85% variance`,
      confidence: 0.85,
      dataPoints: points.length
    });

    return patterns;
  };

  const updateLearningMetrics = (iteration: number, clusters: Cluster[], patterns: Pattern[]) => {
    setLearningMetrics(prev => ({
      clusterQuality: Math.min(95, 20 + iteration * 20 + Math.random() * 10),
      anomalyDetection: Math.min(90, 15 + iteration * 18 + Math.random() * 8),
      dimensionReduction: Math.min(85, 25 + iteration * 15),
      patternDiscovery: Math.min(92, patterns.length * 15 + iteration * 10)
    }));
  };

  useEffect(() => {
    if (!isRunning) return;

    const runUnsupervisedLearning = async () => {
      // Phase 1: Collecting unlabeled data
      setCurrentPhase('collecting');
      setAnimationProgress(0);
      const points: DataPoint[] = [];

      for (let i = 0; i < 100; i++) {
        if (i % 10 === 0) {
          await new Promise(resolve => setTimeout(resolve, 50));
          setAnimationProgress((i / 100) * 100);
        }
        points.push(generateDataPoint(i));
      }
      setDataPoints(points);

      // Phase 2: Clustering
      setCurrentPhase('clustering');
      setAnimationProgress(0);

      for (let iter = 0; iter < 3; iter++) {
        setIteration(iter);
        await new Promise(resolve => setTimeout(resolve, 800));
        const clusteredData = performKMeansClustering(points, numClusters);
        setClusters(clusteredData);
        setAnimationProgress(((iter + 1) / 3) * 100);
      }

      // Phase 3: Dimensionality Reduction
      setCurrentPhase('reducing');
      setAnimationProgress(0);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const reducedPoints = performDimensionalityReduction(points);
      setDataPoints(reducedPoints);
      setAnimationProgress(100);

      // Phase 4: Anomaly Detection
      setCurrentPhase('anomaly');
      setAnimationProgress(0);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const finalClusters = performKMeansClustering(reducedPoints, numClusters);
      const pointsWithAnomalies = detectAnomalies(reducedPoints, finalClusters);
      setDataPoints(pointsWithAnomalies);
      setClusters(finalClusters);
      setAnimationProgress(100);

      // Phase 5: Pattern Analysis
      setCurrentPhase('analyzing');
      setAnimationProgress(0);
      await new Promise(resolve => setTimeout(resolve, 1200));

      const patterns = discoverPatterns(finalClusters, pointsWithAnomalies);
      setDiscoveredPatterns(patterns);
      updateLearningMetrics(2, finalClusters, patterns);
      setAnimationProgress(100);

      // Complete
      setCurrentPhase('complete');
      setIsRunning(false);
    };

    runUnsupervisedLearning();
  }, [isRunning, numClusters, dimensionality]);

  useEffect(() => {
    if (isRunning && currentPhase !== 'complete') {
      const interval = setInterval(() => {
        setAnimationProgress(prev => Math.min(prev + 5, 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRunning, currentPhase]);

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'collecting': return <Shuffle className="w-5 h-5" />;
      case 'clustering': return <Network className="w-5 h-5" />;
      case 'reducing': return <Layers className="w-5 h-5" />;
      case 'anomaly': return <Search className="w-5 h-5" />;
      case 'analyzing': return <Brain className="w-5 h-5" />;
      case 'complete': return <Sparkles className="w-5 h-5" />;
      default: return <Eye className="w-5 h-5" />;
    }
  };

  const getPhaseDescription = (phase: string) => {
    switch (phase) {
      case 'collecting': return 'Collecting unlabeled agent behaviors...';
      case 'clustering': return 'Discovering natural groupings...';
      case 'reducing': return 'Reducing dimensionality for visualization...';
      case 'anomaly': return 'Detecting unusual patterns...';
      case 'analyzing': return 'Analyzing discovered structures...';
      case 'complete': return 'Pattern discovery complete!';
      default: return 'Ready';
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-400';
    if (confidence >= 0.6) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Unsupervised Learning for Agents Demo</h2>

        {/* Configuration */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200">Learning Configuration</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Number of Clusters (K)</label>
                <span className="text-sm font-mono text-blue-400">{numClusters}</span>
              </div>
              <input
                type="range"
                min="2"
                max="6"
                step="1"
                value={numClusters}
                onChange={(e) => !isRunning && setNumClusters(parseInt(e.target.value))}
                disabled={isRunning}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Feature Dimensions</label>
                <span className="text-sm font-mono text-blue-400">{dimensionality}</span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="1"
                value={dimensionality}
                onChange={(e) => !isRunning && setDimensionality(parseInt(e.target.value))}
                disabled={isRunning}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Learning Pipeline */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200">ULA Pipeline</h3>
          <div className="grid grid-cols-3 gap-2">
            {['collecting', 'clustering', 'reducing', 'anomaly', 'analyzing', 'complete'].map((phase, idx) => (
              <div
                key={phase}
                className={`bg-gray-900 p-3 rounded border ${
                  currentPhase === phase ? 'border-teal-500 bg-teal-950' : 'border-gray-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {getPhaseIcon(phase)}
                  <span className="text-xs font-medium text-gray-200 capitalize">
                    {phase === 'anomaly' ? 'Anomaly' : phase}
                  </span>
                </div>
                {currentPhase === phase && phase !== 'complete' && (
                  <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
                    <div
                      className="bg-teal-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${animationProgress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Status */}
        {isRunning && (
          <div className="mb-6 bg-gray-900 p-4 rounded border border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{getPhaseDescription(currentPhase)}</span>
              {currentPhase === 'clustering' && (
                <span className="text-lg font-bold text-teal-400">Iteration {iteration + 1}/3</span>
              )}
            </div>
          </div>
        )}

        {/* Discovered Clusters */}
        {clusters.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <Network className="w-5 h-5 text-purple-400" />
              Discovered Clusters
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {clusters.map((cluster) => (
                <div key={cluster.id} className="bg-gray-900 p-4 rounded border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${cluster.color}`} />
                      <span className="text-sm font-medium text-gray-200">{cluster.label}</span>
                    </div>
                    <span className="text-xs text-gray-400">{cluster.points.length} points</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">
                    Centroid: [{cluster.centroid.slice(0, 3).map(v => v.toFixed(2)).join(', ')}...]
                  </div>
                  <div className="flex items-center gap-2">
                    {cluster.points.slice(0, 5).map((point, idx) => (
                      <CircleDot key={idx} className={`w-3 h-3 ${cluster.color.replace('bg-', 'text-')}`} />
                    ))}
                    {cluster.points.length > 5 && (
                      <span className="text-xs text-gray-500">+{cluster.points.length - 5}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2D Visualization */}
        {dataPoints.some(p => p.embedding) && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-400" />
              2D Embedding Visualization
            </h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-700">
              <div className="relative h-48 bg-gray-950 rounded">
                {dataPoints.filter(p => p.embedding).slice(0, 50).map((point, idx) => {
                  const x = (point.embedding![0] + 1) * 50; // Normalize to 0-100%
                  const y = (point.embedding![1] + 1) * 50;
                  const cluster = clusters.find(c => c.id === point.clusterId);
                  const isAnomaly = point.anomalyScore && point.anomalyScore > 0.7;

                  return (
                    <div
                      key={idx}
                      className={`absolute w-2 h-2 rounded-full ${
                        isAnomaly ? 'bg-red-500 ring-2 ring-red-300' :
                        cluster ? cluster.color : 'bg-gray-500'
                      }`}
                      style={{ left: `${x}%`, top: `${y}%` }}
                    />
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs">
                <span className="text-gray-400">Each point represents an agent behavior pattern</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full ring-2 ring-red-300" />
                  <span className="text-gray-400">Anomaly</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Discovered Patterns */}
        {discoveredPatterns.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Discovered Patterns
            </h3>
            <div className="space-y-2">
              {discoveredPatterns.map((pattern, idx) => (
                <div key={idx} className="bg-gray-900 p-3 rounded border border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-400 capitalize">
                          {pattern.type} Pattern
                        </span>
                        <span className={`text-xs font-bold ${getConfidenceColor(pattern.confidence)}`}>
                          {(pattern.confidence * 100).toFixed(0)}% confidence
                        </span>
                      </div>
                      <p className="text-sm text-gray-200">{pattern.description}</p>
                    </div>
                    <span className="text-xs text-gray-500 ml-3">
                      {pattern.dataPoints} points
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Learning Metrics */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-indigo-400" />
            Learning Metrics
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(learningMetrics).map(([key, value]) => (
              <div key={key} className="bg-gray-900 p-3 rounded border border-gray-700">
                <div className="text-xs text-gray-400 mb-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="text-xl font-bold text-gray-100 mb-2">
                  {value.toFixed(1)}%
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      value >= 80 ? 'bg-green-500' : value >= 60 ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How ULA Works */}
        <div className="bg-gray-900 p-4 rounded border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" />
            How Unsupervised Learning for Agents Works
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">1.</span>
              <div>
                <p className="font-medium text-gray-200">Data Collection</p>
                <p className="text-xs text-gray-400">Gather unlabeled behavioral data from agent interactions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">2.</span>
              <div>
                <p className="font-medium text-gray-200">Clustering</p>
                <p className="text-xs text-gray-400">Group similar behaviors using K-means, DBSCAN, or hierarchical methods</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">3.</span>
              <div>
                <p className="font-medium text-gray-200">Dimensionality Reduction</p>
                <p className="text-xs text-gray-400">Use PCA or t-SNE to visualize high-dimensional patterns</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">4.</span>
              <div>
                <p className="font-medium text-gray-200">Anomaly Detection</p>
                <p className="text-xs text-gray-400">Identify outliers and unusual behavioral patterns</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold">5.</span>
              <div>
                <p className="font-medium text-gray-200">Pattern Discovery</p>
                <p className="text-xs text-gray-400">Extract meaningful structures and relationships from data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Control Button */}
        <button
          onClick={() => {
            setIsRunning(true);
            setCurrentPhase('collecting');
            setDataPoints([]);
            setClusters([]);
            setDiscoveredPatterns([]);
            setIteration(0);
            setAnimationProgress(0);
            setLearningMetrics({
              clusterQuality: 0,
              anomalyDetection: 0,
              dimensionReduction: 0,
              patternDiscovery: 0
            });
          }}
          disabled={isRunning}
          className="w-full py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded text-white font-medium transition-colors"
        >
          {isRunning ? 'Discovering Patterns in Unlabeled Data...' : 'Start Unsupervised Learning'}
        </button>
      </div>
    </div>
  );
};

export default ULADemo;