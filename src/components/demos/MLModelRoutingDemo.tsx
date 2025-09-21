'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Brain, Activity, TrendingUp, BarChart3, CheckCircle, AlertCircle, Cpu, Layers, Zap, Database } from 'lucide-react';

interface Feature {
  name: string;
  value: number;
  importance: number;
  category: 'lexical' | 'semantic' | 'statistical' | 'contextual';
}

interface ModelPrediction {
  class: string;
  confidence: number;
  probabilities: { [key: string]: number };
  inferenceTime: number;
}

interface TrainingMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  confusionMatrix: number[][];
  trainingExamples: number;
}

interface RoutingModel {
  id: string;
  name: string;
  type: 'logistic' | 'random-forest' | 'neural-net' | 'gradient-boost';
  description: string;
  icon: React.ReactNode;
  color: string;
  metrics: TrainingMetrics;
  avgInferenceTime: number;
  features: string[];
}

interface RoutingClass {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  backgroundColor: string;
  examples: number;
  precision: number;
}

const ROUTING_CLASSES: RoutingClass[] = [
  {
    id: 'technical-support',
    name: 'Technical Support',
    description: 'Complex technical issues and debugging',
    icon: <Cpu className="w-5 h-5" />,
    color: 'text-blue-400',
    backgroundColor: 'bg-blue-900/20 border-blue-500/30',
    examples: 15234,
    precision: 0.94
  },
  {
    id: 'billing-finance',
    name: 'Billing & Finance',
    description: 'Payment, invoicing, and account issues',
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'text-green-400',
    backgroundColor: 'bg-green-900/20 border-green-500/30',
    examples: 12456,
    precision: 0.96
  },
  {
    id: 'product-inquiry',
    name: 'Product Inquiry',
    description: 'Product features and availability',
    icon: <Database className="w-5 h-5" />,
    color: 'text-purple-400',
    backgroundColor: 'bg-purple-900/20 border-purple-500/30',
    examples: 18923,
    precision: 0.92
  },
  {
    id: 'general-support',
    name: 'General Support',
    description: 'General questions and basic help',
    icon: <Activity className="w-5 h-5" />,
    color: 'text-yellow-400',
    backgroundColor: 'bg-yellow-900/20 border-yellow-500/30',
    examples: 9876,
    precision: 0.89
  }
];

const ROUTING_MODEL: RoutingModel = {
  id: 'xgboost-router',
  name: 'XGBoost Classifier',
  type: 'gradient-boost',
  description: 'Gradient boosting model with 500 trees, max depth 6',
  icon: <Brain className="w-5 h-5" />,
  color: 'text-green-400',
  metrics: {
    accuracy: 0.947,
    precision: 0.938,
    recall: 0.941,
    f1Score: 0.939,
    confusionMatrix: [
      [14321, 456, 234, 223],
      [367, 11934, 89, 66],
      [189, 112, 17423, 199],
      [234, 156, 298, 8788]
    ],
    trainingExamples: 56489
  },
  avgInferenceTime: 3.2,
  features: ['tfidf_scores', 'word_count', 'sentiment_score', 'entity_count', 'keyword_matches', 'topic_distribution']
};

const SAMPLE_QUERIES = [
  {
    id: 'api-error',
    text: 'Getting 401 authentication error when calling the REST API with valid credentials',
    expectedClass: 'technical-support',
    features: [
      { name: 'keyword_match_technical', value: 0.89, importance: 0.31, category: 'lexical' as const },
      { name: 'error_pattern_detected', value: 1.0, importance: 0.28, category: 'semantic' as const },
      { name: 'api_terminology', value: 0.92, importance: 0.24, category: 'lexical' as const },
      { name: 'technical_complexity', value: 0.78, importance: 0.19, category: 'statistical' as const },
      { name: 'sentiment_negative', value: 0.65, importance: 0.08, category: 'contextual' as const },
      { name: 'word_count', value: 0.45, importance: 0.05, category: 'statistical' as const }
    ]
  },
  {
    id: 'invoice-missing',
    text: 'I haven\'t received my invoice for last month\'s subscription payment',
    expectedClass: 'billing-finance',
    features: [
      { name: 'billing_keywords', value: 0.95, importance: 0.42, category: 'lexical' as const },
      { name: 'finance_entity', value: 0.88, importance: 0.28, category: 'semantic' as const },
      { name: 'temporal_reference', value: 0.71, importance: 0.15, category: 'contextual' as const },
      { name: 'payment_terms', value: 0.82, importance: 0.22, category: 'lexical' as const },
      { name: 'sentiment_neutral', value: 0.50, importance: 0.06, category: 'contextual' as const },
      { name: 'urgency_score', value: 0.34, importance: 0.04, category: 'statistical' as const }
    ]
  },
  {
    id: 'product-features',
    text: 'What are the key differences between Pro and Enterprise plans?',
    expectedClass: 'product-inquiry',
    features: [
      { name: 'product_comparison', value: 0.93, importance: 0.38, category: 'semantic' as const },
      { name: 'plan_mentions', value: 0.97, importance: 0.35, category: 'lexical' as const },
      { name: 'question_pattern', value: 0.85, importance: 0.18, category: 'statistical' as const },
      { name: 'feature_keywords', value: 0.76, importance: 0.16, category: 'lexical' as const },
      { name: 'commercial_intent', value: 0.68, importance: 0.12, category: 'contextual' as const },
      { name: 'sentiment_positive', value: 0.55, importance: 0.05, category: 'contextual' as const }
    ]
  },
  {
    id: 'password-reset',
    text: 'How do I reset my password?',
    expectedClass: 'general-support',
    features: [
      { name: 'common_query_pattern', value: 0.98, importance: 0.45, category: 'semantic' as const },
      { name: 'account_keywords', value: 0.73, importance: 0.22, category: 'lexical' as const },
      { name: 'simplicity_score', value: 0.91, importance: 0.18, category: 'statistical' as const },
      { name: 'faq_match', value: 0.88, importance: 0.25, category: 'semantic' as const },
      { name: 'word_count_low', value: 0.80, importance: 0.08, category: 'statistical' as const },
      { name: 'sentiment_neutral', value: 0.50, importance: 0.03, category: 'contextual' as const }
    ]
  },
  {
    id: 'refund-request',
    text: 'I was charged twice for my order #12345 and need a refund for the duplicate charge',
    expectedClass: 'billing-finance',
    features: [
      { name: 'refund_keywords', value: 0.99, importance: 0.48, category: 'lexical' as const },
      { name: 'order_number_present', value: 1.0, importance: 0.32, category: 'semantic' as const },
      { name: 'billing_issue', value: 0.94, importance: 0.28, category: 'semantic' as const },
      { name: 'urgency_high', value: 0.78, importance: 0.15, category: 'contextual' as const },
      { name: 'sentiment_negative', value: 0.72, importance: 0.09, category: 'contextual' as const },
      { name: 'duplicate_mention', value: 0.86, importance: 0.12, category: 'lexical' as const }
    ]
  }
];

export const MLModelRoutingDemo: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState(SAMPLE_QUERIES[0]);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [extractedFeatures, setExtractedFeatures] = useState<Feature[]>([]);
  const [modelPrediction, setModelPrediction] = useState<ModelPrediction | null>(null);
  const [selectedClass, setSelectedClass] = useState<RoutingClass | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [finalResult, setFinalResult] = useState<string>('');
  const [speed, setSpeed] = useState(2);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [showFeatureImportance, setShowFeatureImportance] = useState(false);

  const resetDemo = useCallback(() => {
    setCurrentPhase('');
    setIsRunning(false);
    setExtractedFeatures([]);
    setModelPrediction(null);
    setSelectedClass(null);
    setIsProcessing(false);
    setFinalResult('');
    setExecutionLog([]);
    setShowFeatureImportance(false);
  }, []);

  useEffect(() => {
    resetDemo();
  }, [selectedQuery, resetDemo]);

  const generatePrediction = (query: any): ModelPrediction => {
    // Simulate model prediction
    const classes = ROUTING_CLASSES.map(c => c.id);
    const expectedIdx = classes.indexOf(query.expectedClass);

    const probabilities: { [key: string]: number } = {};
    let remaining = 1.0;

    // Give high probability to expected class
    const expectedProb = 0.85 + Math.random() * 0.13;
    probabilities[query.expectedClass] = expectedProb;
    remaining -= expectedProb;

    // Distribute remaining probability
    classes.forEach((cls, idx) => {
      if (idx !== expectedIdx) {
        const prob = remaining * (0.2 + Math.random() * 0.3);
        probabilities[cls] = Math.min(prob, remaining);
        remaining -= probabilities[cls];
      }
    });

    return {
      class: query.expectedClass,
      confidence: probabilities[query.expectedClass],
      probabilities,
      inferenceTime: 2.8 + Math.random() * 1.5
    };
  };

  const generateResult = (routingClass: RoutingClass, query: any): string => {
    const results: { [key: string]: { [key: string]: string } } = {
      'technical-support': {
        'api-error': '**Technical Support Routing Result:**\n\n🔧 **Issue Classification:**\n• Category: API Authentication Error\n• Severity: High\n• Estimated Resolution Time: 15-20 minutes\n\n**Model Analysis:**\n• Pattern Match: REST API 401 error pattern (98% confidence)\n• Similar Issues: 1,247 resolved cases in knowledge base\n• Root Cause Probability:\n  - Token expiration: 42%\n  - Incorrect scope: 28%\n  - Rate limiting: 18%\n  - Other: 12%\n\n**Routing Decision:**\n✅ Assigned to: Senior Technical Support Team\n✅ Specialist: API & Authentication Expert\n✅ Priority Queue: Position #3\n✅ SLA: 30-minute response time\n\n**Automated Actions:**\n• Knowledge base articles attached\n• API logs pulled for analysis\n• Customer account status verified',
        'default': 'Routed to Technical Support team for specialized assistance with complex technical issues.'
      },
      'billing-finance': {
        'invoice-missing': '**Billing & Finance Routing Result:**\n\n💰 **Request Classification:**\n• Type: Missing Invoice Request\n• Account Status: Active subscription\n• Billing Period: Previous month\n\n**Model Analysis:**\n• Confidence Score: 96.2%\n• Pattern Recognition: Standard invoice inquiry\n• Customer Segment: Subscription user\n• Historical Billing: No issues detected\n\n**Routing Decision:**\n✅ Assigned to: Billing Support Team\n✅ Queue Priority: Standard\n✅ Expected Resolution: 5-10 minutes\n✅ Automation Available: Yes\n\n**Automated Actions:**\n• Invoice retrieval initiated\n• Email template prepared\n• Account history reviewed\n• Duplicate check completed',
        'refund-request': '**Billing & Finance Routing Result:**\n\n💳 **Refund Request Analysis:**\n• Order Number: #12345 (verified)\n• Issue Type: Duplicate charge\n• Amount: Detected from order history\n• Risk Score: Low (verified customer)\n\n**Model Classification:**\n• Confidence: 99.1%\n• Fraud Risk: 0.3% (legitimate request)\n• Customer Lifetime Value: High\n• Previous Refunds: 0\n\n**Routing Decision:**\n✅ Assigned to: Refund Processing Team\n✅ Approval Level: Auto-approved (within policy)\n✅ Processing Time: 2-3 business days\n✅ Priority: High (duplicate charge)\n\n**Automated Actions:**\n• Refund pre-authorized\n• Confirmation email queued\n• Transaction logs archived\n• Quality assurance flagged',
        'default': 'Routed to Billing & Finance team for payment and account-related assistance.'
      },
      'product-inquiry': {
        'product-features': '**Product Inquiry Routing Result:**\n\n📦 **Query Classification:**\n• Intent: Product Comparison\n• Products: Pro vs Enterprise plans\n• Purchase Intent Score: 78%\n• Customer Stage: Evaluation\n\n**Model Analysis:**\n• Confidence: 93.5%\n• Query Type: Feature comparison\n• Complexity: Medium\n• Sales Opportunity: High\n\n**Routing Decision:**\n✅ Assigned to: Product Specialist Team\n✅ Secondary: Sales Team (notified)\n✅ Response Type: Detailed comparison\n✅ Follow-up: Scheduled in 24 hours\n\n**Automated Actions:**\n• Comparison chart generated\n• Pricing calculator linked\n• Demo access prepared\n• Sales team alerted',
        'default': 'Routed to Product Specialist team for detailed product information and comparisons.'
      },
      'general-support': {
        'password-reset': '**General Support Routing Result:**\n\n🔑 **Request Classification:**\n• Type: Password Reset\n• Frequency: Common request (FAQ #3)\n• Complexity: Low\n• Self-service Available: Yes\n\n**Model Analysis:**\n• Confidence: 98.7%\n• Pattern: Standard account recovery\n• Risk Assessment: Low\n• Automation Eligible: Yes\n\n**Routing Decision:**\n✅ Assigned to: Self-Service Portal\n✅ Fallback: General Support Queue\n✅ Resolution Path: Automated\n✅ Expected Time: < 2 minutes\n\n**Automated Actions:**\n• Password reset link sent\n• Security verification initiated\n• Help article provided\n• Activity logged for security',
        'default': 'Routed to General Support for standard assistance and FAQ resolution.'
      }
    };

    const classResults = results[routingClass.id];
    return classResults[query.id] || classResults['default'];
  };

  const runMLRouting = useCallback(async () => {
    setIsRunning(true);
    setExecutionLog(['🚀 Starting ML model-based routing...']);

    // Phase 1: Feature Extraction
    setCurrentPhase('extraction');
    setExecutionLog(prev => [...prev, '🔍 Extracting features from query text...']);
    await new Promise(resolve => setTimeout(resolve, 1200 / speed));

    // Extract features
    setExtractedFeatures(selectedQuery.features);
    setExecutionLog(prev => [...prev, `✅ Extracted ${selectedQuery.features.length} features`]);

    // Log top features
    const topFeatures = selectedQuery.features
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 3);
    topFeatures.forEach(f => {
      setExecutionLog(prev => [...prev, `  → ${f.name}: ${(f.value * 100).toFixed(1)}% (importance: ${(f.importance * 100).toFixed(1)}%)`]);
    });

    // Phase 2: Model Inference
    setCurrentPhase('inference');
    setShowFeatureImportance(true);
    setExecutionLog(prev => [...prev, '🧠 Running XGBoost classifier inference...']);
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    const prediction = generatePrediction(selectedQuery);
    setModelPrediction(prediction);
    setExecutionLog(prev => [...prev, `✅ Model inference completed in ${prediction.inferenceTime.toFixed(1)}ms`]);
    setExecutionLog(prev => [...prev, `✅ Predicted class: ${prediction.class} (${(prediction.confidence * 100).toFixed(1)}% confidence)`]);

    // Phase 3: Class Assignment
    setCurrentPhase('assignment');
    setExecutionLog(prev => [...prev, '🎯 Assigning to routing class...']);
    await new Promise(resolve => setTimeout(resolve, 800 / speed));

    const assignedClass = ROUTING_CLASSES.find(c => c.id === prediction.class)!;
    setSelectedClass(assignedClass);
    setExecutionLog(prev => [...prev, `✅ Assigned to: ${assignedClass.name}`]);
    setExecutionLog(prev => [...prev, `  → Training examples: ${assignedClass.examples.toLocaleString()}`]);
    setExecutionLog(prev => [...prev, `  → Class precision: ${(assignedClass.precision * 100).toFixed(1)}%`]);

    // Phase 4: Processing
    setCurrentPhase('processing');
    setIsProcessing(true);
    setExecutionLog(prev => [...prev, `⚡ Processing through ${assignedClass.name}...`]);
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    const result = generateResult(assignedClass, selectedQuery);
    setFinalResult(result);
    setIsProcessing(false);
    setExecutionLog(prev => [...prev, '✅ Routing completed successfully']);

    // Log performance metrics
    setExecutionLog(prev => [...prev, '📊 Performance Metrics:']);
    setExecutionLog(prev => [...prev, `  → Total latency: ${(prediction.inferenceTime + 12).toFixed(1)}ms`]);
    setExecutionLog(prev => [...prev, `  → Model accuracy: ${(ROUTING_MODEL.metrics.accuracy * 100).toFixed(1)}%`]);
    setExecutionLog(prev => [...prev, `  → Confidence threshold: ✓ Passed (>85%)`]);

    setCurrentPhase('complete');
    setIsRunning(false);
    setExecutionLog(prev => [...prev, '🎯 ML model routing completed!']);
  }, [selectedQuery, speed]);

  const getPhaseStatus = (phase: string) => {
    if (currentPhase === phase) return 'border-blue-500 bg-blue-900/20';
    if (currentPhase === 'complete' ||
        (phase === 'extraction' && (currentPhase === 'inference' || currentPhase === 'assignment' || currentPhase === 'processing')) ||
        (phase === 'inference' && (currentPhase === 'assignment' || currentPhase === 'processing')) ||
        (phase === 'assignment' && currentPhase === 'processing')) {
      return 'border-green-500 bg-green-900/20';
    }
    return 'border-gray-600 bg-gray-800/20';
  };

  const getFeatureCategoryColor = (category: string) => {
    switch (category) {
      case 'lexical': return 'text-blue-400';
      case 'semantic': return 'text-purple-400';
      case 'statistical': return 'text-green-400';
      case 'contextual': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">🤖</span>
          Machine Learning Model-Based Routing Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch how a trained classifier model extracts features and makes sub-10ms routing decisions with high confidence.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sample Query
            </label>
            <select
              value={selectedQuery.id}
              onChange={(e) => {
                const query = SAMPLE_QUERIES.find(q => q.id === e.target.value);
                if (query) setSelectedQuery(query);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SAMPLE_QUERIES.map((query) => (
                <option key={query.id} value={query.id}>
                  {query.text.substring(0, 50)}...
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Processing Speed
            </label>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full accent-blue-500"
            />
            <div className="text-sm text-gray-400">{speed}x speed</div>
          </div>

          <div className="flex items-end">
            <div className="flex space-x-2">
              <button
                onClick={runMLRouting}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  isRunning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Processing...' : 'Start Routing'}
              </button>

              <button
                onClick={resetDemo}
                disabled={isRunning}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Query & Model Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
            <h4 className="font-medium text-white mb-2">Input Query</h4>
            <p className="text-gray-300 italic">"{selectedQuery.text}"</p>
          </div>
          <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Active Model: {ROUTING_MODEL.name}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="text-gray-400">Accuracy:</span> <span className="text-green-400">{(ROUTING_MODEL.metrics.accuracy * 100).toFixed(1)}%</span></div>
              <div><span className="text-gray-400">Avg Latency:</span> <span className="text-yellow-400">{ROUTING_MODEL.avgInferenceTime}ms</span></div>
              <div><span className="text-gray-400">Training Data:</span> <span className="text-blue-400">{ROUTING_MODEL.metrics.trainingExamples.toLocaleString()}</span></div>
              <div><span className="text-gray-400">Model Type:</span> <span className="text-purple-400">XGBoost</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ML Pipeline */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">ML Routing Pipeline</h3>

          {/* Processing Phases */}
          <div className="space-y-4 mb-6">
            {/* Feature Extraction */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('extraction')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Feature Extraction
                </h4>
                {currentPhase === 'extraction' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {['inference', 'assignment', 'processing', 'complete'].includes(currentPhase) && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {extractedFeatures.length > 0 && (
                <div className="space-y-2">
                  {extractedFeatures.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <span className={`${getFeatureCategoryColor(feature.category)} text-xs`}>
                        {feature.category}
                      </span>
                      <span className="flex-1 text-gray-300">{feature.name}</span>
                      <div className="w-24 bg-gray-700 rounded h-2 relative">
                        <div
                          className="absolute top-0 left-0 h-full rounded bg-gradient-to-r from-blue-500 to-green-500"
                          style={{ width: `${feature.value * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{(feature.value * 100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Model Inference */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('inference')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Model Inference
                </h4>
                {currentPhase === 'inference' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {['assignment', 'processing', 'complete'].includes(currentPhase) && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {modelPrediction && (
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="text-gray-400 mb-1">Class Probabilities:</div>
                    {Object.entries(modelPrediction.probabilities)
                      .sort(([, a], [, b]) => b - a)
                      .map(([cls, prob]) => {
                        const routingClass = ROUTING_CLASSES.find(c => c.id === cls);
                        return (
                          <div key={cls} className="flex items-center gap-2 mb-1">
                            <span className={`text-xs ${routingClass?.color} w-32`}>
                              {routingClass?.name}
                            </span>
                            <div className="flex-1 bg-gray-700 rounded h-2 relative">
                              <div
                                className={`absolute top-0 left-0 h-full rounded ${
                                  cls === modelPrediction.class ? 'bg-green-500' : 'bg-gray-600'
                                }`}
                                style={{ width: `${prob * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400">{(prob * 100).toFixed(1)}%</span>
                          </div>
                        );
                      })}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-400">Inference Time:</span>
                    <span className="text-yellow-400">{modelPrediction.inferenceTime.toFixed(1)}ms</span>
                  </div>
                </div>
              )}
            </div>

            {/* Class Assignment */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('assignment')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Class Assignment
                </h4>
                {currentPhase === 'assignment' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {['processing', 'complete'].includes(currentPhase) && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {selectedClass && modelPrediction && (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${selectedClass.color === 'text-blue-400' ? 'bg-blue-600' : selectedClass.color === 'text-green-400' ? 'bg-green-600' : selectedClass.color === 'text-purple-400' ? 'bg-purple-600' : 'bg-yellow-600'}`}>
                      {selectedClass.icon}
                    </div>
                    <div>
                      <div className="font-medium text-white">{selectedClass.name}</div>
                      <div className="text-sm text-gray-400">Confidence: {(modelPrediction.confidence * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div><span className="text-gray-400">Training Examples:</span> <span className="text-blue-400">{selectedClass.examples.toLocaleString()}</span></div>
                    <div><span className="text-gray-400">Class Precision:</span> <span className="text-green-400">{(selectedClass.precision * 100).toFixed(0)}%</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Processing */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('processing')}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Handler Processing
                </h4>
                {isProcessing && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {currentPhase === 'complete' && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {selectedClass && isProcessing && (
                <div className="text-sm text-gray-300">
                  Processing through {selectedClass.name}...
                </div>
              )}
            </div>
          </div>

          {/* Feature Importance */}
          {showFeatureImportance && extractedFeatures.length > 0 && (
            <div>
              <h4 className="font-medium text-white mb-3">Feature Importance</h4>
              <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4">
                {extractedFeatures
                  .sort((a, b) => b.importance - a.importance)
                  .map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-500 w-4">{idx + 1}</span>
                      <span className={`text-xs ${getFeatureCategoryColor(feature.category)} w-20`}>
                        {feature.category}
                      </span>
                      <span className="text-sm text-gray-300 flex-1">{feature.name}</span>
                      <div className="w-24 bg-gray-700 rounded h-2 relative">
                        <div
                          className="absolute top-0 left-0 h-full rounded bg-gradient-to-r from-orange-500 to-red-500"
                          style={{ width: `${feature.importance * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{(feature.importance * 100).toFixed(0)}%</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Model Metrics & Results */}
        <div className="space-y-6">
          {/* Model Performance */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Model Metrics</h3>
            <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-400">Accuracy:</span>
                  <div className="text-green-400 font-mono">{(ROUTING_MODEL.metrics.accuracy * 100).toFixed(1)}%</div>
                </div>
                <div>
                  <span className="text-gray-400">F1 Score:</span>
                  <div className="text-blue-400 font-mono">{(ROUTING_MODEL.metrics.f1Score * 100).toFixed(1)}%</div>
                </div>
                <div>
                  <span className="text-gray-400">Precision:</span>
                  <div className="text-purple-400 font-mono">{(ROUTING_MODEL.metrics.precision * 100).toFixed(1)}%</div>
                </div>
                <div>
                  <span className="text-gray-400">Recall:</span>
                  <div className="text-yellow-400 font-mono">{(ROUTING_MODEL.metrics.recall * 100).toFixed(1)}%</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-700">
                <span className="text-xs text-gray-400">Training Set:</span>
                <div className="text-xs text-gray-300">{ROUTING_MODEL.metrics.trainingExamples.toLocaleString()} labeled examples</div>
              </div>
            </div>
          </div>

          {/* Execution Log */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Execution Log</h3>
            <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 h-64 overflow-y-auto">
              {executionLog.length === 0 ? (
                <div className="text-gray-400 text-center text-sm mt-8">
                  Execution log will appear here...
                </div>
              ) : (
                <div className="space-y-1">
                  {executionLog.map((log, index) => (
                    <div key={index} className="text-sm text-gray-300 font-mono">
                      <span className="text-gray-500 mr-2">{String(index + 1).padStart(2, '0')}.</span>
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Final Result */}
          {finalResult && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Routing Result</h3>
              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30 p-4">
                <div className="flex items-center gap-2 mb-3">
                  {selectedClass?.icon}
                  <span className="font-medium text-white">{selectedClass?.name}</span>
                  <span className="text-xs bg-green-600 px-2 py-1 rounded">ML ROUTED</span>
                </div>
                <div className="text-sm text-gray-200 whitespace-pre-line">
                  {finalResult}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MLModelRoutingDemo;