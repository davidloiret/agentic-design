'use client';

import React from 'react';
import ReferencesSection from './shared/ReferencesSection';
import {
  QuickOverviewSection,
  QuickImplementationSection,
  DosAndDontsSection,
  UsageGuideSection,
  KeyMetricsSection,
  TopUseCasesSection
} from './shared';

interface PredictiveAgentFaultToleranceDetailsProps {
  selectedTechnique: any;
}

export const PredictiveAgentFaultToleranceDetails: React.FC<PredictiveAgentFaultToleranceDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Monitor Setup', detail: 'Deploy multi-dimensional monitoring (performance, behavior, communication)' },
      { num: '2', action: 'ML Training', detail: 'Train anomaly detection models on historical failure patterns' },
      { num: '3', action: 'Predictive Models', detail: 'Implement LSTM, Isolation Forest, and ensemble methods' },
      { num: '4', action: 'Alert System', detail: 'Configure tiered alerts with confidence thresholds' },
      { num: '5', action: 'Auto-Recovery', detail: 'Trigger preemptive actions based on predictions' }
    ],
    example: 'monitoring_data → anomaly_detection → failure_prediction → preemptive_action → prevention_success'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use ensemble methods (Random Forest + LSTM + Isolation Forest)', icon: '✅' },
    { type: 'do', text: 'Monitor behavioral patterns, not just performance metrics', icon: '✅' },
    { type: 'do', text: 'Implement dynamic baselines that evolve with system behavior', icon: '✅' },
    { type: 'do', text: 'Create prediction confidence intervals and uncertainty quantification', icon: '✅' },
    { type: 'do', text: 'Use federated learning for multi-agent anomaly detection', icon: '✅' },
    { type: 'dont', text: 'Rely solely on reactive threshold-based monitoring', icon: '❌' },
    { type: 'dont', text: 'Ignore communication anomalies between agents', icon: '❌' },
    { type: 'dont', text: 'Train models on incomplete or imbalanced failure datasets', icon: '❌' },
    { type: 'dont', text: 'Deploy predictions without interpretability mechanisms', icon: '❌' },
    { type: 'dont', text: 'Skip validation on real-world deployment environments', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Mission-critical production systems',
      'Multi-agent collaborative environments',
      'High-cost failure scenarios',
      'Systems with historical failure data'
    ],
    avoidWhen: [
      'Simple single-agent applications',
      'Environments without failure history',
      'Ultra-low latency requirements',
      'Resource-constrained edge deployments'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Prediction Accuracy', measure: '% correct failure predictions (precision/recall)' },
    { metric: 'False Positive Rate', measure: '% incorrect failure alarms' },
    { metric: 'Lead Time', measure: 'Minutes/hours before failure prediction' },
    { metric: 'Prevention Success', measure: '% failures avoided through preemptive action' },
    { metric: 'Model Confidence', measure: 'Uncertainty quantification scores' },
    { metric: 'Detection Latency', measure: 'Time to identify anomalous patterns' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Enterprise AI Fleets: Monitor 100+ agents with 97.2% accuracy for behavioral anomalies',
    'Cloud Infrastructure: Predict resource exhaustion and capacity issues before failures',
    'Trading Systems: Detect model drift and performance degradation in real-time',
    'Healthcare AI: Monitor diagnostic agent reliability and prevent misdiagnosis cascades',
    'Manufacturing: Predict equipment failures through IoT sensor anomaly patterns'
  ];

  const references = [
    {
      title: 'Core Academic Research (2024)',
      items: [
        { title: 'A Proactive Approach to Fault Tolerance Using Predictive Machine Learning Models in Distributed Systems (IJERR 2024)', url: 'https://www.researchgate.net/publication/385502216_A_Proactive_Approach_to_Fault_Tolerance_Using_Predictive_Machine_Learning_Models_in_Distributed_Systems' },
        { title: 'Anomaly Detection in Sensor Data with Machine Learning: Predictive Maintenance for Industrial Systems (JES 2024)', url: 'https://journal.esrgroups.org/jes/article/view/5137' },
        { title: 'A Comprehensive Investigation of Anomaly Detection Methods in Deep Learning and Machine Learning 2019-2023 (IET 2024)', url: 'https://ietresearch.onlinelibrary.wiley.com/doi/full/10.1049/2024/8821891' },
        { title: 'AI-Enabled Anomaly Detection in Industrial Systems: A New Era in Predictive Maintenance (2024)', url: 'https://www.researchgate.net/publication/386443676_AI-Enabled_Anomaly_Detection_in_Industrial_Systems_A_New_Era_in_Predictive_Maintenance' }
      ]
    },
    {
      title: 'Machine Learning & Predictive Analytics',
      items: [
        { title: 'Artificial Intelligence for Predictive Maintenance Applications: Key Components and Future Trends (MDPI 2024)', url: 'https://www.mdpi.com/2076-3417/14/2/898' },
        { title: 'Federated Learning for Predictive Maintenance and Anomaly Detection Using Time Series Data (MDPI Sensors 2024)', url: 'https://www.mdpi.com/1424-8220/23/17/7331' },
        { title: 'Predictive Maintenance in Industry 4.0: A Survey of Planning Models and ML Techniques (PMC 2024)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11157603/' },
        { title: 'A Survey on Failure Analysis and Fault Injection in AI Systems (arXiv 2024)', url: 'https://arxiv.org/html/2407.00125v1' }
      ]
    },
    {
      title: 'Multi-Agent & Behavioral Monitoring',
      items: [
        { title: 'Real-Time Anomaly Detection for Multi-Agent AI Systems (Galileo AI 2024)', url: 'https://galileo.ai/blog/real-time-anomaly-detection-multi-agent-ai' },
        { title: 'Pattern Anomaly Detection AI Agents (Relevance AI 2024)', url: 'https://relevanceai.com/agent-templates-tasks/pattern-anomaly-detection' },
        { title: 'AI in IT Operations: Predictive Analytics & Anomaly Detection (Medium 2024)', url: 'https://payodatechnologyinc.medium.com/ai-in-it-operations-predictive-analytics-anomaly-detection-36a3b4a7fd3c' },
        { title: 'Keeping Medical AI Healthy: Detection and Correction Methods for System Degradation (arXiv 2024)', url: 'https://arxiv.org/html/2506.17442' }
      ]
    },
    {
      title: 'Industry Applications & Tools',
      items: [
        { title: 'AI-Powered Anomaly Detection: Ultimate Guide for Businesses (2024)', url: 'https://www.rapidinnovation.io/post/ai-in-anomaly-detection-for-businesses' },
        { title: 'Machine Learning Anomaly Detection: Transforming Modern Observability (FusionReactor 2024)', url: 'https://fusion-reactor.com/blog/machine-learning-anomaly-detection-transforming-modern-observability-2024-guide/' },
        { title: 'Anomaly Detection Powered by AI (Dynatrace)', url: 'https://www.dynatrace.com/platform/artificial-intelligence/anomaly-detection/' },
        { title: 'AI-Assisted Metrics Monitoring: Anomaly Detection and Predictive Correlations (Datadog)', url: 'https://www.datadoghq.com/blog/ai-powered-metrics-monitoring/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="AI-driven predictive systems that anticipate agent failures before they occur using ML-based anomaly detection"
        why="Proactive failure prevention vs reactive response, 78% reduction in unplanned downtime, 67% faster mean time to recovery"
        keyInsight="Ensemble ML models (Random Forest + LSTM + Isolation Forest) + behavioral monitoring = failure prediction with lead times"
      />

      <QuickImplementationSection
        steps={quickImplementation.steps}
        example={quickImplementation.example}
      />

      <DosAndDontsSection items={dosAndDonts} />

      <UsageGuideSection
        useWhen={usageGuide.useWhen}
        avoidWhen={usageGuide.avoidWhen}
      />

      <KeyMetricsSection metrics={keyMetrics} />

      <TopUseCasesSection useCases={topUseCases} />

      <ReferencesSection categories={references} />
    </>
  );
};

export default PredictiveAgentFaultToleranceDetails;