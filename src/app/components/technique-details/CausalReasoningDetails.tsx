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

interface CausalReasoningDetailsProps {
  selectedTechnique: any;
}

export const CausalReasoningDetails: React.FC<CausalReasoningDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Causal Model', detail: 'Identify variables and potential causal relationships' },
      { num: '2', action: 'Mechanism Analysis', detail: 'Understand how causes produce effects' },
      { num: '3', action: 'Confound Control', detail: 'Account for alternative explanations' },
      { num: '4', action: 'Intervention Reasoning', detail: 'Predict outcomes of hypothetical actions' },
      { num: '5', action: 'Counterfactual Analysis', detail: 'Consider what would happen if conditions changed' }
    ],
    example: 'X causes Y → Mechanism: X→M→Y → Control Z → Predict: do(X) → Counterfact: X=0?'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Distinguish correlation from causation explicitly', icon: '✅' },
    { type: 'do', text: 'Identify plausible causal mechanisms and pathways', icon: '✅' },
    { type: 'do', text: 'Consider confounding variables and alternative explanations', icon: '✅' },
    { type: 'do', text: 'Use interventional thinking (what if we change X?)', icon: '✅' },
    { type: 'do', text: 'Apply temporal precedence (causes precede effects)', icon: '✅' },
    { type: 'dont', text: 'Assume correlation implies causation', icon: '❌' },
    { type: 'dont', text: 'Ignore potential confounding factors', icon: '❌' },
    { type: 'dont', text: 'Use post-hoc reasoning without mechanism', icon: '❌' },
    { type: 'dont', text: 'Make causal claims without sufficient evidence', icon: '❌' },
    { type: 'dont', text: 'Oversimplify complex causal systems', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Understanding cause-effect relationships',
      'Predicting intervention outcomes',
      'Root cause analysis and troubleshooting',
      'Policy analysis and decision making',
      'Scientific explanation and theory building'
    ],
    avoidWhen: [
      'Purely descriptive or classificatory tasks',
      'When only correlational data is available',
      'Simple pattern recognition problems',
      'When causal mechanisms are unknowable',
      'Real-time systems requiring immediate responses'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Causal Validity', measure: 'Accuracy of identified cause-effect relationships' },
    { metric: 'Mechanism Plausibility', measure: 'Reasonableness of proposed causal pathways' },
    { metric: 'Confound Detection', measure: 'Identification of alternative explanations' },
    { metric: 'Intervention Prediction', measure: 'Accuracy of predicted outcomes from actions' },
    { metric: 'Counterfactual Reasoning', measure: 'Quality of what-if scenario analysis' },
    { metric: 'Evidence Integration', measure: 'Synthesis of multiple sources for causal claims' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Medical Diagnosis: Symptoms → Disease mechanism → Treatment intervention → Predicted recovery',
    'Business Analysis: Marketing spend → Customer acquisition mechanism → Revenue impact → ROI optimization',
    'Software Debugging: Error symptoms → Root cause identification → Code fix → System restoration',
    'Policy Analysis: Regulation → Behavioral change mechanism → Economic effects → Unintended consequences',
    'Scientific Research: Hypothesis → Experimental design → Causal inference → Theory validation'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Causal Inference in Statistics: A Primer (Pearl et al., 2016)', url: 'https://bayes.cs.ucla.edu/PRIMER/' },
        { title: 'Causal Reasoning in Large Language Models (Jin et al., 2023)', url: 'https://arxiv.org/abs/2305.00050' },
        { title: 'The Book of Why: The New Science of Cause and Effect (Pearl & Mackenzie, 2018)', url: 'https://www.basicbooks.com/titles/judea-pearl/the-book-of-why/9780465097609/' },
        { title: 'Causal Discovery with Language Models (Kiciman et al., 2023)', url: 'https://arxiv.org/abs/2301.13608' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Microsoft DoWhy: Causal Inference Framework', url: 'https://www.pywhy.org/dowhy/v0.11.1/' },
        { title: 'Causal AI: OpenAI Approaches to Causal Reasoning', url: 'https://platform.openai.com/docs/guides/reasoning' },
        { title: 'Google Research: Causal Inference with ML', url: 'https://research.google/teams/brain/causal-inference/' },
        { title: 'MIT Causality in Machine Learning Course', url: 'https://www.eecs.mit.edu/academics-admissions/subjects/6-s080' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'DoWhy: Python Library for Causal Inference', url: 'https://github.com/py-why/dowhy' },
        { title: 'CausalML: Machine Learning for Causal Inference', url: 'https://github.com/uber/causalml' },
        { title: 'pgmpy: Probabilistic Graphical Models', url: 'https://github.com/pgmpy/pgmpy' },
        { title: 'Causal Discovery Toolbox', url: 'https://github.com/FenTechSolutions/CausalDiscoveryToolbox' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Causal Inference Community on Reddit', url: 'https://www.reddit.com/r/causalinference/' },
        { title: 'Cross Validated: Causal Inference Questions', url: 'https://stats.stackexchange.com/questions/tagged/causal-inference' },
        { title: 'OpenAI Developer Forum - Reasoning Systems', url: 'https://community.openai.com/c/prompting/8' },
        { title: 'Causal Data Science Meetup Groups', url: 'https://www.meetup.com/topics/causal-inference/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Reasoning about cause-effect relationships, mechanisms, and interventions to understand how changes produce outcomes"
        why="Enables prediction, explanation, and decision-making by understanding the underlying causal structure of systems"
        keyInsight="Identify causes → Understand mechanisms → Control confounds → Predict interventions → Analyze counterfactuals"
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

export default CausalReasoningDetails;