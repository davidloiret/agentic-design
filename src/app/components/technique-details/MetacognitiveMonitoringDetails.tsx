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

interface MetacognitiveMonitoringDetailsProps {
  selectedTechnique: any;
}

export const MetacognitiveMonitoringDetails: React.FC<MetacognitiveMonitoringDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Self-Awareness', detail: 'Monitor reasoning process & confidence levels' },
      { num: '2', action: 'Strategy Check', detail: 'Evaluate current approach effectiveness' },
      { num: '3', action: 'Error Detection', detail: 'Identify potential mistakes or gaps' },
      { num: '4', action: 'Adapt Method', detail: 'Switch strategies when needed' },
      { num: '5', action: 'Validate Result', detail: 'Cross-check solution quality' }
    ],
    example: 'Problem → Monitor confidence → "Low confidence, switch strategy" → New approach → Validate'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Continuously assess reasoning confidence levels', icon: '✅' },
    { type: 'do', text: 'Implement explicit strategy evaluation checkpoints', icon: '✅' },
    { type: 'do', text: 'Use calibrated confidence scoring (0-100%)', icon: '✅' },
    { type: 'do', text: 'Build error detection patterns for common mistakes', icon: '✅' },
    { type: 'do', text: 'Create strategy switching triggers and fallbacks', icon: '✅' },
    { type: 'dont', text: 'Monitor without acting on low confidence signals', icon: '❌' },
    { type: 'dont', text: 'Use vague confidence assessments ("maybe", "probably")', icon: '❌' },
    { type: 'dont', text: 'Skip validation when switching reasoning strategies', icon: '❌' },
    { type: 'dont', text: 'Ignore consistent pattern of reasoning failures', icon: '❌' },
    { type: 'dont', text: 'Over-monitor simple tasks (cognitive overhead)', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'High-stakes decisions requiring reliability',
      'Complex multi-step reasoning tasks',
      'Domains prone to systematic errors',
      'When multiple solution approaches exist',
      'Learning or adaptation scenarios'
    ],
    avoidWhen: [
      'Simple, well-defined problems',
      'Highly time-sensitive applications',
      'When reasoning patterns are stable',
      'Resource-constrained environments',
      'Routine/repetitive tasks'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Confidence Calibration', measure: 'Alignment between confidence and actual accuracy' },
    { metric: 'Error Detection Rate', measure: 'Percentage of mistakes caught before final answer' },
    { metric: 'Strategy Switch Success', measure: 'Improvement after method adaptation' },
    { metric: 'Monitoring Overhead', measure: 'Additional computational cost vs benefit' },
    { metric: 'Self-Correction Accuracy', measure: 'Quality of reasoning adjustments' },
    { metric: 'Adaptation Speed', measure: 'Time to recognize and change ineffective strategies' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Medical Diagnosis: Monitor confidence → "Low confidence on rare disease" → Switch to specialist consultation mode',
    'Financial Analysis: Track reasoning quality → Detect overconfidence in predictions → Apply conservative adjustments',
    'Code Review: Monitor understanding → "Complex logic, low confidence" → Request additional validation steps',
    'Research Synthesis: Assess source integration → Identify knowledge gaps → Adapt search strategy',
    'Strategic Planning: Monitor assumption validity → Detect weak reasoning → Strengthen analysis foundation'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Metacognitive Prompting Improves LLM Reasoning (Zhao et al., 2024)', url: 'https://arxiv.org/abs/2410.14878' },
        { title: 'Teaching Large Language Models to Self-Debug (Chen et al., 2023)', url: 'https://arxiv.org/abs/2304.05128' },
        { title: 'Self-Refine: Iterative Refinement with Self-Feedback (Madaan et al., 2023)', url: 'https://arxiv.org/abs/2303.17651' },
        { title: 'Constitutional AI: Harmlessness from AI Feedback (Bai et al., 2022)', url: 'https://arxiv.org/abs/2212.08073' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Self-Correction Patterns', url: 'https://python.langchain.com/docs/modules/agents/agent_types/self_ask_with_search' },
        { title: 'OpenAI GPT-4 System Message Patterns', url: 'https://platform.openai.com/docs/guides/prompt-engineering/strategy-instruct-the-model-to-work-out-its-own-solution' },
        { title: 'Anthropic Constitutional AI Methods', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/constitutional-ai' },
        { title: 'Microsoft Guidance: Self-Correction Flows', url: 'https://github.com/microsoft/guidance/blob/main/notebooks/tutorials/self_correction.ipynb' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain Self-Ask with Search Agent', url: 'https://python.langchain.com/docs/modules/agents/agent_types/self_ask_with_search' },
        { title: 'DSPy Self-Correction Modules', url: 'https://dspy-docs.vercel.app/docs/building-blocks/assertions' },
        { title: 'Guardrails: Validation and Self-Correction', url: 'https://github.com/guardrails-ai/guardrails' },
        { title: 'LlamaIndex Self-Reflection Query Engine', url: 'https://docs.llamaindex.ai/en/stable/examples/agent/self_reflection_agent/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'OpenAI Developer Forum - Self-Improvement Patterns', url: 'https://community.openai.com/c/prompting/8' },
        { title: 'LangChain Discord - Agent Self-Correction', url: 'https://discord.gg/langchain' },
        { title: 'Anthropic Discord - Constitutional AI Discussions', url: 'https://discord.gg/anthropic' },
        { title: 'r/MachineLearning - Metacognitive AI Research', url: 'https://www.reddit.com/r/MachineLearning/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Continuous self-awareness and strategy adjustment during reasoning processes"
        why="Enables adaptive problem-solving through confidence tracking, error detection, and method switching"
        keyInsight="Monitor reasoning quality → Detect low confidence/errors → Adapt strategy → Validate improvements"
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

export default MetacognitiveMonitoringDetails;