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

interface MachineLearningModelBasedRoutingDetailsProps {
  selectedTechnique: any;
}

export const MachineLearningModelBasedRoutingDetails: React.FC<MachineLearningModelBasedRoutingDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Label Data', detail: 'Create training corpus with routing labels' },
      { num: '2', action: 'Train Model', detail: 'Fine-tune classifier on labeled examples' },
      { num: '3', action: 'Embed Logic', detail: 'Encode routing in model weights' },
      { num: '4', action: 'Deploy', detail: 'Serve model for real-time routing' },
      { num: '5', action: 'Monitor', detail: 'Track accuracy, drift, and performance' }
    ],
    example: 'query → classifier → {support: 0.92, sales: 0.05, billing: 0.03} → route_to_support'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use supervised fine-tuning with domain-specific labeled data', icon: '✅' },
    { type: 'do', text: 'Start with smaller models (BERT-base) for lower latency', icon: '✅' },
    { type: 'do', text: 'Implement confidence thresholds for routing decisions', icon: '✅' },
    { type: 'do', text: 'Monitor class distribution and retrain on drift', icon: '✅' },
    { type: 'do', text: 'Use synthetic data generation from LLMs to augment training set', icon: '✅' },
    { type: 'dont', text: 'Use generative models for real-time routing decisions', icon: '❌' },
    { type: 'dont', text: 'Deploy without fallback mechanisms for low-confidence predictions', icon: '❌' },
    { type: 'dont', text: 'Ignore class imbalance in training data', icon: '❌' },
    { type: 'dont', text: 'Skip A/B testing against baseline routing methods', icon: '❌' },
    { type: 'dont', text: 'Neglect explainability for critical routing decisions', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'High-volume routing with labeled training data',
      'Need sub-10ms routing latency',
      'Clear routing categories/classes',
      'Regulatory requirements for deterministic decisions'
    ],
    avoidWhen: [
      'Limited labeled data (<1000 examples)',
      'Constantly evolving routing rules',
      'Need interpretable routing logic',
      'Small-scale applications'
    ]
  };

  const keyMetrics = [
    { metric: 'Routing Accuracy', measure: 'F1 score per route class' },
    { metric: 'Latency', measure: 'P50/P95/P99 inference time' },
    { metric: 'Model Drift', measure: 'Distribution shift detection' },
    { metric: 'Confidence Calibration', measure: 'ECE (Expected Calibration Error)' },
    { metric: 'Coverage', measure: '% queries above confidence threshold' },
    { metric: 'Cost Efficiency', measure: 'Inference cost per 1M requests' }
  ];

  const topUseCases = [
    'Intent Classification: customer_query → {support: 0.89, sales: 0.08, info: 0.03}',
    'Ticket Routing: issue_description → {technical_L1: 0.72, technical_L2: 0.25, billing: 0.03}',
    'Language Detection: multilingual_text → {en: 0.95, es: 0.03, fr: 0.02}',
    'Priority Triage: request → {urgent: 0.91, normal: 0.07, low: 0.02}',
    'Department Assignment: email → {hr: 0.88, legal: 0.10, finance: 0.02}'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Fine-Tuning Language Models for Classification Tasks (Howard & Ruder, 2018)', url: 'https://arxiv.org/abs/1801.06146' },
        { title: 'BERT: Pre-training of Deep Bidirectional Transformers (Devlin et al., 2019)', url: 'https://arxiv.org/abs/1810.04805' },
        { title: 'Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks (Reimers & Gurevych, 2019)', url: 'https://arxiv.org/abs/1908.10084' },
        { title: 'On Calibration of Modern Neural Networks (Guo et al., 2017)', url: 'https://arxiv.org/abs/1706.04599' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Hugging Face Text Classification Fine-tuning Guide', url: 'https://huggingface.co/docs/transformers/tasks/sequence_classification' },
        { title: 'Google Cloud AutoML Text Classification', url: 'https://cloud.google.com/natural-language/automl/docs/text-classification' },
        { title: 'AWS SageMaker Multi-class Classification', url: 'https://docs.aws.amazon.com/sagemaker/latest/dg/text-classification.html' },
        { title: 'FastAPI + ONNX for Production ML Routing', url: 'https://onnxruntime.ai/docs/tutorials/deploy-bert-model.html' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'SetFit - Efficient Few-shot Learning for Classification', url: 'https://github.com/huggingface/setfit' },
        { title: 'AutoGluon - AutoML for Text Classification', url: 'https://auto.gluon.ai/stable/tutorials/text_prediction/index.html' },
        { title: 'Scikit-learn - Traditional ML Classifiers', url: 'https://scikit-learn.org/stable/supervised_learning.html#supervised-learning' },
        { title: 'ONNX Runtime - High-performance Inference', url: 'https://onnxruntime.ai/' }
      ]
    },
    {
      title: 'Community & Best Practices',
      items: [
        { title: 'MLOps Community - Model Deployment Best Practices', url: 'https://mlops.community/' },
        { title: 'Google ML Crash Course - Text Classification', url: 'https://developers.google.com/machine-learning/guides/text-classification' },
        { title: 'Papers with Code - Text Classification Benchmarks', url: 'https://paperswithcode.com/task/text-classification' },
        { title: 'Model Monitoring and Drift Detection Guide', url: 'https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Fine-tuned discriminative model encoding routing logic in learned weights"
        why="Enables ultra-fast (<10ms) routing decisions with high accuracy after supervised training"
        keyInsight="Routing logic embedded in model parameters, not in prompts - inference without generation"
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

export default MachineLearningModelBasedRoutingDetails;