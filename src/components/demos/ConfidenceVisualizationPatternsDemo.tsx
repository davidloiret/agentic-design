'use client';

import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';

type ConfidenceLevel = 'very-high' | 'high' | 'medium' | 'low' | 'very-low';
type VisualizationType = 'progress-bar' | 'gauge' | 'uncertainty-band' | 'gradient' | 'icon-based';
type PhaseType = 'idle' | 'medical-diagnosis' | 'financial-prediction' | 'content-moderation' | 'translation-quality' | 'complete';

interface Prediction {
  id: string;
  category: string;
  prediction: string;
  confidence: number;
  confidenceLevel: ConfidenceLevel;
  uncertaintyRange: { min: number; max: number };
  factors: ConfidenceFactor[];
  calibrationAccuracy: number;
}

interface ConfidenceFactor {
  name: string;
  contribution: number;
  description: string;
}

interface MetricsData {
  calibrationAccuracy: number;
  userTrust: number;
  decisionQuality: number;
  comprehensionRate: number;
  uncertaintyTolerance: number;
  overrideFrequency: number;
}

const ConfidenceVisualizationPatternsDemo: React.FC = () => {
  const [phase, setPhase] = useState<PhaseType>('idle');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [activeVisualization, setActiveVisualization] = useState<VisualizationType>('progress-bar');
  const [metrics, setMetrics] = useState<MetricsData>({
    calibrationAccuracy: 0,
    userTrust: 0,
    decisionQuality: 0,
    comprehensionRate: 0,
    uncertaintyTolerance: 0,
    overrideFrequency: 0,
  });

  const allPredictions: Prediction[] = [
    {
      id: 'med-1',
      category: 'Medical Diagnosis',
      prediction: 'Type 2 Diabetes - likely based on HbA1c and glucose levels',
      confidence: 89,
      confidenceLevel: 'very-high',
      uncertaintyRange: { min: 84, max: 94 },
      factors: [
        { name: 'HbA1c Level', contribution: 35, description: 'Elevated to 7.2% (threshold: 6.5%)' },
        { name: 'Fasting Glucose', contribution: 28, description: 'Consistently above 126 mg/dL' },
        { name: 'Patient History', contribution: 18, description: 'Family history of diabetes' },
        { name: 'Symptoms Match', contribution: 19, description: 'Classic triad present' },
      ],
      calibrationAccuracy: 91,
    },
    {
      id: 'fin-1',
      category: 'Financial Prediction',
      prediction: 'Stock price likely to increase 5-8% in next quarter',
      confidence: 62,
      confidenceLevel: 'medium',
      uncertaintyRange: { min: 52, max: 72 },
      factors: [
        { name: 'Historical Trends', contribution: 25, description: 'Strong Q4 performance historically' },
        { name: 'Market Sentiment', contribution: 20, description: 'Positive analyst ratings' },
        { name: 'Volatility Index', contribution: -15, description: 'High market uncertainty' },
        { name: 'Sector Performance', contribution: 32, description: 'Tech sector outperforming' },
      ],
      calibrationAccuracy: 68,
    },
    {
      id: 'mod-1',
      category: 'Content Moderation',
      prediction: 'Borderline content - may violate community guidelines',
      confidence: 48,
      confidenceLevel: 'low',
      uncertaintyRange: { min: 38, max: 58 },
      factors: [
        { name: 'Language Pattern', contribution: 22, description: 'Ambiguous phrasing detected' },
        { name: 'Context Analysis', contribution: 15, description: 'Limited conversation history' },
        { name: 'Similar Cases', contribution: 11, description: 'Mixed outcomes in past decisions' },
      ],
      calibrationAccuracy: 52,
    },
    {
      id: 'trans-1',
      category: 'Translation Quality',
      prediction: 'High-quality translation with preserved meaning',
      confidence: 94,
      confidenceLevel: 'very-high',
      uncertaintyRange: { min: 91, max: 97 },
      factors: [
        { name: 'Linguistic Match', contribution: 38, description: 'Direct idiom equivalents found' },
        { name: 'Grammar Accuracy', contribution: 32, description: 'Zero grammatical errors' },
        { name: 'Context Preservation', contribution: 24, description: 'Cultural nuances maintained' },
      ],
      calibrationAccuracy: 96,
    },
  ];

  useEffect(() => {
    if (phase === 'idle') {
      const timer = setTimeout(() => {
        setPhase('medical-diagnosis');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'medical-diagnosis') {
      setPredictions([allPredictions[0]]);
      setTimeout(() => setPhase('financial-prediction'), 2000);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'financial-prediction') {
      setPredictions(prev => [...prev, allPredictions[1]]);
      setTimeout(() => setPhase('content-moderation'), 2000);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'content-moderation') {
      setPredictions(prev => [...prev, allPredictions[2]]);
      setTimeout(() => setPhase('translation-quality'), 2000);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'translation-quality') {
      setPredictions(prev => [...prev, allPredictions[3]]);

      setTimeout(() => {
        const avgCalibration = Math.round(
          allPredictions.reduce((sum, p) => sum + p.calibrationAccuracy, 0) / allPredictions.length
        );

        setMetrics({
          calibrationAccuracy: avgCalibration,
          userTrust: 87,
          decisionQuality: 91,
          comprehensionRate: 84,
          uncertaintyTolerance: 78,
          overrideFrequency: 12,
        });

        setPhase('complete');
      }, 2000);
    }
  }, [phase]);

  const getConfidenceColor = (level: ConfidenceLevel): string => {
    switch (level) {
      case 'very-high': return 'text-green-400';
      case 'high': return 'text-blue-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-orange-400';
      case 'very-low': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getConfidenceBgGradient = (level: ConfidenceLevel): string => {
    switch (level) {
      case 'very-high': return 'from-green-600/20 to-green-600/5';
      case 'high': return 'from-blue-600/20 to-blue-600/5';
      case 'medium': return 'from-yellow-600/20 to-yellow-600/5';
      case 'low': return 'from-orange-600/20 to-orange-600/5';
      case 'very-low': return 'from-red-600/20 to-red-600/5';
      default: return 'from-gray-600/20 to-gray-600/5';
    }
  };

  const getConfidenceIcon = (level: ConfidenceLevel) => {
    switch (level) {
      case 'very-high': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'high': return <TrendingUp className="w-5 h-5 text-blue-400" />;
      case 'medium': return <Info className="w-5 h-5 text-yellow-400" />;
      case 'low': return <AlertTriangle className="w-5 h-5 text-orange-400" />;
      case 'very-low': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default: return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };

  const getConfidenceLabel = (level: ConfidenceLevel): string => {
    switch (level) {
      case 'very-high': return 'Very High Confidence';
      case 'high': return 'High Confidence';
      case 'medium': return 'Medium Confidence';
      case 'low': return 'Low Confidence';
      case 'very-low': return 'Very Low Confidence';
      default: return 'Unknown';
    }
  };

  const getPhaseDescription = (): string => {
    switch (phase) {
      case 'idle': return 'Initializing confidence visualization patterns...';
      case 'medical-diagnosis': return 'Medical Diagnosis - Displaying confidence with supporting factors';
      case 'financial-prediction': return 'Financial Prediction - Showing uncertainty range and market factors';
      case 'content-moderation': return 'Content Moderation - Indicating low confidence for human review';
      case 'translation-quality': return 'Translation Quality - High confidence with linguistic validation';
      case 'complete': return 'All confidence patterns demonstrated with calibration metrics';
      default: return '';
    }
  };

  const renderProgressBar = (prediction: Prediction) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">Confidence</span>
        <span className={`font-bold ${getConfidenceColor(prediction.confidenceLevel)}`}>
          {prediction.confidence}%
        </span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${
            prediction.confidenceLevel === 'very-high' ? 'bg-green-500' :
            prediction.confidenceLevel === 'high' ? 'bg-blue-500' :
            prediction.confidenceLevel === 'medium' ? 'bg-yellow-500' :
            prediction.confidenceLevel === 'low' ? 'bg-orange-500' :
            'bg-red-500'
          }`}
          style={{ width: `${prediction.confidence}%` }}
        />
      </div>
    </div>
  );

  const renderUncertaintyBand = (prediction: Prediction) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">Prediction Range</span>
        <span className="text-gray-300">
          {prediction.uncertaintyRange.min}% - {prediction.uncertaintyRange.max}%
        </span>
      </div>
      <div className="relative w-full h-8 bg-slate-700 rounded-lg overflow-hidden">
        <div
          className={`absolute h-full transition-all duration-500 ${
            prediction.confidenceLevel === 'very-high' ? 'bg-green-500/30' :
            prediction.confidenceLevel === 'high' ? 'bg-blue-500/30' :
            prediction.confidenceLevel === 'medium' ? 'bg-yellow-500/30' :
            prediction.confidenceLevel === 'low' ? 'bg-orange-500/30' :
            'bg-red-500/30'
          }`}
          style={{
            left: `${prediction.uncertaintyRange.min}%`,
            width: `${prediction.uncertaintyRange.max - prediction.uncertaintyRange.min}%`
          }}
        />
        <div
          className={`absolute h-full w-1 transition-all duration-500 ${
            prediction.confidenceLevel === 'very-high' ? 'bg-green-500' :
            prediction.confidenceLevel === 'high' ? 'bg-blue-500' :
            prediction.confidenceLevel === 'medium' ? 'bg-yellow-500' :
            prediction.confidenceLevel === 'low' ? 'bg-orange-500' :
            'bg-red-500'
          }`}
          style={{ left: `${prediction.confidence}%` }}
        />
      </div>
    </div>
  );

  const renderGauge = (prediction: Prediction) => (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative w-32 h-16">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <path
            d="M 10 45 A 40 40 0 0 1 90 45"
            fill="none"
            stroke="#334155"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d={`M 10 45 A 40 40 0 0 1 ${10 + (prediction.confidence * 0.8)} ${45 - Math.sin((prediction.confidence / 100) * Math.PI) * 40}`}
            fill="none"
            stroke={
              prediction.confidenceLevel === 'very-high' ? '#22c55e' :
              prediction.confidenceLevel === 'high' ? '#3b82f6' :
              prediction.confidenceLevel === 'medium' ? '#eab308' :
              prediction.confidenceLevel === 'low' ? '#f97316' :
              '#ef4444'
            }
            strokeWidth="8"
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
      </div>
      <div className={`text-2xl font-bold ${getConfidenceColor(prediction.confidenceLevel)}`}>
        {prediction.confidence}%
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${phase === 'complete' ? 'bg-green-600' : 'bg-blue-600'}`}>
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Confidence Visualization Patterns</h3>
            <p className="text-sm text-gray-400 mt-1">{getPhaseDescription()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {(['medical-diagnosis', 'financial-prediction', 'content-moderation', 'translation-quality'] as PhaseType[]).map((p, idx) => (
            <React.Fragment key={p}>
              <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                phase === p ? 'bg-blue-500' :
                ['financial-prediction', 'content-moderation', 'translation-quality', 'complete'].includes(phase) && idx === 0 ? 'bg-green-600' :
                ['content-moderation', 'translation-quality', 'complete'].includes(phase) && idx === 1 ? 'bg-green-600' :
                ['translation-quality', 'complete'].includes(phase) && idx === 2 ? 'bg-green-600' :
                phase === 'complete' && idx === 3 ? 'bg-green-600' :
                'bg-slate-700'
              }`} />
              {idx < 3 && <div className="w-2 h-2 rounded-full bg-slate-600" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {predictions.map((prediction) => (
          <div
            key={prediction.id}
            className={`bg-gradient-to-r ${getConfidenceBgGradient(prediction.confidenceLevel)} border border-slate-700 rounded-xl p-6`}
          >
            <div className="flex items-start gap-4 mb-4">
              {getConfidenceIcon(prediction.confidenceLevel)}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white">{prediction.category}</h4>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    prediction.confidenceLevel === 'very-high' ? 'bg-green-600 text-white' :
                    prediction.confidenceLevel === 'high' ? 'bg-blue-600 text-white' :
                    prediction.confidenceLevel === 'medium' ? 'bg-yellow-600 text-white' :
                    prediction.confidenceLevel === 'low' ? 'bg-orange-600 text-white' :
                    'bg-red-600 text-white'
                  }`}>
                    {getConfidenceLabel(prediction.confidenceLevel)}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-4">{prediction.prediction}</p>

                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <div className="text-xs text-gray-400 mb-2 uppercase font-semibold">Progress Bar</div>
                    {renderProgressBar(prediction)}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-2 uppercase font-semibold">Gauge Meter</div>
                    {renderGauge(prediction)}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs text-gray-400 mb-2 uppercase font-semibold">Uncertainty Range</div>
                  {renderUncertaintyBand(prediction)}
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <div className="text-xs text-gray-400 mb-3 uppercase font-semibold">Confidence Factors</div>
                  <div className="grid grid-cols-2 gap-3">
                    {prediction.factors.map((factor, idx) => (
                      <div key={idx} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-white">{factor.name}</span>
                          <span className={`text-xs font-bold ${
                            factor.contribution > 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {factor.contribution > 0 ? '+' : ''}{factor.contribution}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">{factor.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Calibration Accuracy</span>
                    <span className="text-sm font-bold text-blue-400">{prediction.calibrationAccuracy}%</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Historical alignment of confidence vs actual correctness
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {phase === 'complete' && (
        <div className="bg-gradient-to-r from-blue-900/20 to-green-900/20 border border-blue-700/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h4 className="font-semibold text-white">Confidence Visualization Metrics</h4>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Calibration Accuracy</div>
              <div className="text-2xl font-bold text-green-400">{metrics.calibrationAccuracy}%</div>
              <div className="text-xs text-gray-500 mt-1">Confidence vs correctness</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">User Trust</div>
              <div className="text-2xl font-bold text-blue-400">{metrics.userTrust}%</div>
              <div className="text-xs text-gray-500 mt-1">Appropriate AI reliance</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Decision Quality</div>
              <div className="text-2xl font-bold text-purple-400">{metrics.decisionQuality}%</div>
              <div className="text-xs text-gray-500 mt-1">Improved outcomes</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Comprehension Rate</div>
              <div className="text-2xl font-bold text-yellow-400">{metrics.comprehensionRate}%</div>
              <div className="text-xs text-gray-500 mt-1">Users understanding</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Uncertainty Tolerance</div>
              <div className="text-2xl font-bold text-orange-400">{metrics.uncertaintyTolerance}%</div>
              <div className="text-xs text-gray-500 mt-1">Comfort with limitations</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Override Frequency</div>
              <div className="text-2xl font-bold text-red-400">{metrics.overrideFrequency}%</div>
              <div className="text-xs text-gray-500 mt-1">Human contrary decisions</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
            <div className="text-sm text-blue-300">
              <strong>Visualization Summary:</strong> Demonstrated 4 confidence visualization patterns across Medical (89% - Very High),
              Financial (62% - Medium), Content Moderation (48% - Low), and Translation (94% - Very High) use cases.
              Multiple visualization types: progress bars, gauge meters, uncertainty bands, and gradient backgrounds with supporting
              confidence factors. Achieved {metrics.calibrationAccuracy}% calibration accuracy with {metrics.userTrust}% user trust,
              {metrics.decisionQuality}% decision quality improvement, and {metrics.comprehensionRate}% comprehension rate.
              Only {metrics.overrideFrequency}% override frequency indicates appropriate confidence communication.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfidenceVisualizationPatternsDemo;