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

interface VisualReasoningPatternsDetailsProps {
  selectedTechnique: any;
}

export const VisualReasoningPatternsDetails: React.FC<VisualReasoningPatternsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Decision Trees', detail: 'Visualize reasoning paths and logic flow' },
      { num: '2', action: 'Progress Indicators', detail: 'Step-by-step workflow transparency' },
      { num: '3', action: 'Confidence Metrics', detail: 'Uncertainty and reliability display' },
      { num: '4', action: 'Source Attribution', detail: 'Information provenance highlighting' },
      { num: '5', action: 'Interactive Exploration', detail: 'Drill-down and comparison capabilities' }
    ],
    example: 'reasoning_data → decision_tree → progress_visualization → confidence_display → interactive_exploration'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Show step-by-step reasoning process visually', icon: '✅' },
    { type: 'do', text: 'Use progressive disclosure for complex decision trees', icon: '✅' },
    { type: 'do', text: 'Display confidence levels and uncertainty ranges', icon: '✅' },
    { type: 'do', text: 'Highlight key information sources and influences', icon: '✅' },
    { type: 'do', text: 'Provide interactive exploration of reasoning paths', icon: '✅' },
    { type: 'dont', text: 'Overwhelm users with too much detail at once', icon: '❌' },
    { type: 'dont', text: 'Hide uncertainty or low confidence areas', icon: '❌' },
    { type: 'dont', text: 'Use static visualizations for complex reasoning', icon: '❌' },
    { type: 'dont', text: 'Ignore the need for comparison views', icon: '❌' },
    { type: 'dont', text: 'Make visualizations purely decorative without function', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'High-stakes decision support systems',
      'Complex reasoning transparency needs',
      'Educational and training contexts',
      'Debugging agent behavior'
    ],
    avoidWhen: [
      'Simple query-response interactions',
      'Speed-critical applications',
      'Minimal UI requirements',
      'Low-complexity decisions'
    ]
  };

  const keyMetrics = [
    { metric: 'Reasoning Clarity', measure: 'User understanding of agent logic' },
    { metric: 'Trust Calibration', measure: 'Appropriate confidence in decisions' },
    { metric: 'Exploration Depth', measure: 'User interaction with reasoning paths' },
    { metric: 'Decision Quality', measure: 'Improved outcomes with transparency' },
    { metric: 'Learning Effectiveness', measure: 'Knowledge transfer from visualizations' },
    { metric: 'Error Detection', measure: 'User ability to spot reasoning flaws' }
  ];

  const topUseCases = [
    'Medical Diagnosis: decision tree visualization, confidence intervals, source evidence',
    'Financial Analysis: risk assessment paths, model explanations, data provenance',
    'Legal Research: case law connections, argument structures, precedent weights',
    'Scientific Discovery: hypothesis exploration, evidence chains, uncertainty mapping',
    'Business Strategy: scenario analysis, decision factors, outcome probabilities'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Visual Analytics for Explainable AI (Spinner et al., 2020)', url: 'https://doi.org/10.1007/s12650-020-00692-4' },
        { title: 'The Mythos of Model Interpretability (Lipton, 2018)', url: 'https://doi.org/10.1145/3236386.3241340' },
        { title: 'Visualizing and Understanding Neural Networks (Zeiler & Fergus, 2014)', url: 'https://arxiv.org/abs/1311.2901' },
        { title: 'LIME: Explaining Machine Learning Predictions (Ribeiro et al., 2016)', url: 'https://doi.org/10.1145/2939672.2939778' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Google AI Explainability - Model Cards and Visualizations', url: 'https://cloud.google.com/explainable-ai' },
        { title: 'Microsoft Responsible AI - Interpretability Toolkit', url: 'https://docs.microsoft.com/en-us/azure/machine-learning/how-to-machine-learning-interpretability' },
        { title: 'IBM Watson OpenScale - AI Explanation Dashboard', url: 'https://www.ibm.com/cloud/watson-openscale' },
        { title: 'SHAP (SHapley Additive exPlanations) Documentation', url: 'https://shap.readthedocs.io/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'D3.js - Data Visualization Library', url: 'https://github.com/d3/d3' },
        { title: 'Observable Plot - Grammar of Graphics', url: 'https://github.com/observablehq/plot' },
        { title: 'Plotly - Interactive Visualization Platform', url: 'https://github.com/plotly/plotly.js' },
        { title: 'TensorBoard - Machine Learning Visualization', url: 'https://github.com/tensorflow/tensorboard' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Explainable AI Community (Reddit)', url: 'https://reddit.com/r/MachineLearning' },
        { title: 'Data Visualization Society', url: 'https://www.datavisualizationsociety.org/' },
        { title: 'IEEE VIS Conference - Visualization Research', url: 'https://ieeevis.org/' },
        { title: 'Interpretable ML Community', url: 'https://github.com/jphall663/awesome-machine-learning-interpretability' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Visual representation of agent reasoning processes, decision trees, and cognitive transparency for better understanding"
        why="Builds user trust, enables debugging, supports learning, and improves decision quality through transparency"
        keyInsight="Visual reasoning paths + confidence metrics + interactive exploration → transparent AI decisions"
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

export default VisualReasoningPatternsDetails;