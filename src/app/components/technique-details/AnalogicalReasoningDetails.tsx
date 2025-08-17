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

interface AnalogicalReasoningDetailsProps {
  selectedTechnique: any;
}

export const AnalogicalReasoningDetails: React.FC<AnalogicalReasoningDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Source Identification', detail: 'Find relevant analogous situations or domains' },
      { num: '2', action: 'Structural Mapping', detail: 'Identify correspondences between source and target' },
      { num: '3', action: 'Knowledge Transfer', detail: 'Apply insights from source to target problem' },
      { num: '4', action: 'Adaptation', detail: 'Modify transferred knowledge for target context' },
      { num: '5', action: 'Validation', detail: 'Verify analogy validity and solution quality' }
    ],
    example: 'Target Problem → Find Similar Case → Map Structure → Transfer Solution → Adapt & Validate'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Focus on structural similarities rather than surface features', icon: '✅' },
    { type: 'do', text: 'Use multiple analogies to strengthen reasoning', icon: '✅' },
    { type: 'do', text: 'Explicitly map relationships between source and target', icon: '✅' },
    { type: 'do', text: 'Consider disanalogies and limitations of the mapping', icon: '✅' },
    { type: 'do', text: 'Validate transferred knowledge in target domain', icon: '✅' },
    { type: 'dont', text: 'Rely solely on superficial similarities', icon: '❌' },
    { type: 'dont', text: 'Use weak or irrelevant analogies without justification', icon: '❌' },
    { type: 'dont', text: 'Transfer knowledge without adapting to context', icon: '❌' },
    { type: 'dont', text: 'Ignore when analogies break down or fail', icon: '❌' },
    { type: 'dont', text: 'Over-extend analogies beyond their valid scope', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Novel problems with existing similar solutions',
      'Creative problem-solving and innovation',
      'Educational explanations and concept transfer',
      'Cross-domain knowledge application',
      'When direct solution methods are unclear'
    ],
    avoidWhen: [
      'Highly domain-specific technical problems',
      'When direct methods are more efficient',
      'Problems requiring precise quantitative analysis',
      'When no meaningful analogies exist',
      'Real-time critical decision making'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Analogy Quality', measure: 'Structural similarity and relevance to target problem' },
    { metric: 'Mapping Accuracy', measure: 'Correctness of source-target correspondences' },
    { metric: 'Transfer Success', measure: 'Effectiveness of knowledge application' },
    { metric: 'Solution Validity', measure: 'Correctness in target domain after adaptation' },
    { metric: 'Creative Insight', measure: 'Novel solutions generated through analogical thinking' },
    { metric: 'Reasoning Efficiency', measure: 'Speed of solution discovery vs direct methods' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Scientific Discovery: Darwin\'s evolution theory inspired by Malthus population theory → Natural selection mechanism',
    'Engineering Design: Velcro invention inspired by burr seeds → Hook and loop fastener design',
    'Business Strategy: Netflix disruption analogous to Amazon retail model → Platform-based streaming strategy',
    'Software Architecture: Circuit breaker pattern from electrical systems → Fault tolerance in distributed systems',
    'Medical Diagnosis: Heart pump analogy for understanding circulatory problems → Treatment approach insights'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Structure-Mapping: A Theoretical Framework for Analogy (Gentner, 1983)', url: 'https://groups.psych.northwestern.edu/gentner/papers/Gentner83.pdf' },
        { title: 'Analogical Problem Solving in Large Language Models (Yasunaga et al., 2023)', url: 'https://arxiv.org/abs/2310.12962' },
        { title: 'Learning Analogical Reasoning from Text (Chen et al., 2022)', url: 'https://arxiv.org/abs/2209.01228' },
        { title: 'The Analogical Mind: Perspectives from Cognitive Science (Holyoak & Morrison, 2005)', url: 'https://www.jstor.org/stable/1423780' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'OpenAI Analogical Reasoning Prompting Strategies', url: 'https://platform.openai.com/docs/guides/prompt-engineering/strategy-use-external-tools' },
        { title: 'Anthropic Constitutional AI: Analogical Examples', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-examples' },
        { title: 'Google AI Analogical Learning in Language Models', url: 'https://ai.googleblog.com/2023/05/analogical-reasoning-in-language-models.html' },
        { title: 'MIT Computational Analogical Reasoning Framework', url: 'https://groups.csail.mit.edu/vision/analogical-reasoning/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'OpenAnalogy: Computational Analogy Toolkit', url: 'https://github.com/uiuc-focal-lab/OpenAnalogy' },
        { title: 'SME: Structure-Mapping Engine Implementation', url: 'https://www.qrg.northwestern.edu/software/sme/' },
        { title: 'LISA: Learning and Inference with Schemas and Analogies', url: 'https://cognitiveai.org/lisa/' },
        { title: 'ConceptNet: Commonsense Knowledge for Analogical Reasoning', url: 'https://conceptnet.io/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Cognitive Science Society - Analogical Reasoning', url: 'https://cognitivesciencesociety.org/' },
        { title: 'r/CognitiveScience - Analogical Thinking Research', url: 'https://www.reddit.com/r/cogsci/' },
        { title: 'OpenAI Developer Forum - Creative Reasoning', url: 'https://community.openai.com/c/prompting/8' },
        { title: 'Hugging Face Forums - Reasoning and Transfer Learning', url: 'https://discuss.huggingface.co/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Reasoning by finding structural similarities between familiar and unfamiliar domains to transfer knowledge and solutions"
        why="Leverages existing knowledge to solve new problems by identifying patterns and relationships that transcend specific domains"
        keyInsight="Identify analogous source → Map structural relationships → Transfer insights → Adapt to target context → Validate"
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

export default AnalogicalReasoningDetails;