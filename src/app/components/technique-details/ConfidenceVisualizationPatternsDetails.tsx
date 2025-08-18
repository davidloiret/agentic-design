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

interface ConfidenceVisualizationPatternsDetailsProps {
  selectedTechnique?: any;
}

export const ConfidenceVisualizationPatternsDetails: React.FC<ConfidenceVisualizationPatternsDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Define Scale', detail: 'Use 0-100% or Low/Med/High confidence levels' },
      { num: '2', action: 'Visual Design', detail: 'Progress bars, color gradients, or uncertainty bands' },
      { num: '3', action: 'Context Display', detail: 'Show what drives confidence (data quality, model certainty)' },
      { num: '4', action: 'Action Triggers', detail: 'Different UI states based on confidence thresholds' },
      { num: '5', action: 'User Education', detail: 'Help users understand confidence meaning' }
    ],
    example: 'High (95%): Green check → Medium (70%): Orange caution → Low (30%): Red warning'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use consistent color schemes for confidence levels', icon: '✅' },
    { type: 'do', text: 'Explain what factors influence confidence scores', icon: '✅' },
    { type: 'do', text: 'Provide confidence calibration with historical accuracy', icon: '✅' },
    { type: 'do', text: 'Show uncertainty ranges not just point estimates', icon: '✅' },
    { type: 'do', text: 'Include confidence in voice/conversational interfaces', icon: '✅' },
    { type: 'dont', text: 'Show false precision (99.73% vs ~very high)', icon: '❌' },
    { type: 'dont', text: 'Hide uncertainty when model is genuinely unsure', icon: '❌' },
    { type: 'dont', text: 'Use confidence as the only decision factor', icon: '❌' },
    { type: 'dont', text: 'Overwhelm users with technical probability details', icon: '❌' },
    { type: 'dont', text: 'Make low confidence visually alarming for normal uncertainty', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'High-stakes decision making',
      'Model predictions with varying certainty',
      'User needs to understand AI limitations',
      'Multiple competing interpretations exist'
    ],
    avoidWhen: [
      'Simple confirmatory tasks',
      'Deterministic rule-based outputs',
      'Users prefer definitive answers',
      'Low-risk casual interactions'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Calibration Accuracy', measure: 'Confidence vs actual correctness alignment' },
    { metric: 'User Trust', measure: 'Appropriate reliance on AI recommendations' },
    { metric: 'Decision Quality', measure: 'Improved outcomes with confidence info' },
    { metric: 'Comprehension Rate', measure: '% users understanding confidence meaning' },
    { metric: 'Uncertainty Tolerance', measure: 'User comfort with model limitations' },
    { metric: 'Override Frequency', measure: 'Human decisions contrary to AI confidence' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Medical Diagnosis: Show diagnostic confidence with supporting evidence strength',
    'Financial Advice: Display prediction confidence with market uncertainty factors',
    'Content Moderation: Indicate detection confidence for borderline content',
    'Translation Quality: Show confidence in meaning preservation and accuracy',
    'Search Results: Rank with relevance confidence and source reliability'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Visualizing Uncertainty in Artificial Intelligence (Kale et al., 2019)', url: 'https://arxiv.org/abs/1909.03794' },
        { title: 'CHI 2024: Confidence Indicators in Human-AI Collaboration', url: 'https://dl.acm.org/doi/proceedings/10.1145/3613904' },
        { title: 'Uncertainty Quantification in Deep Learning (Gal, 2016)', url: 'https://arxiv.org/abs/1506.02142' },
        { title: 'Trust Calibration in Automated Systems (Lee & See, 2004)', url: 'https://journals.sagepub.com/doi/10.1518/hfes.46.1.50.30392' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Google PAIR - Confidence Indicators Design Patterns', url: 'https://pair.withgoogle.com/' },
        { title: 'Microsoft Guidelines for AI Confidence Display', url: 'https://www.microsoft.com/en-us/ai/responsible-ai' },
        { title: 'IBM Watson Design Patterns - Uncertainty Communication', url: 'https://www.ibm.com/design/ai/ethics/trust/' },
        { title: 'Apple Machine Learning Guidelines - User Trust', url: 'https://developer.apple.com/machine-learning/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'TensorFlow Probability for Uncertainty Estimation', url: 'https://www.tensorflow.org/probability' },
        { title: 'PyTorch Uncertainty Toolkit', url: 'https://github.com/pytorch/uncertainty' },
        { title: 'Plotly Uncertainty Visualization', url: 'https://plotly.com/javascript/continuous-error-bars/' },
        { title: 'D3.js Confidence Interval Visualizations', url: 'https://observablehq.com/@d3/confidence-interval' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Uncertainty in AI Visualization Community', url: 'https://ieeevis.org/' },
        { title: 'CHI Conference Proceedings - Trust in AI', url: 'https://chi.acm.org/' },
        { title: 'Human-Computer Interaction Stack Exchange', url: 'https://ux.stackexchange.com/questions/tagged/artificial-intelligence' },
        { title: 'AI Ethics & Trust Research Groups', url: 'https://www.partnershiponai.org/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Display AI model confidence to help users make informed decisions"
        why="Users need to understand when AI is certain vs uncertain to build appropriate trust"
        keyInsight="Show not just what AI thinks, but how confident it is + explain what drives that confidence"
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

export default ConfidenceVisualizationPatternsDetails;