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

interface StepBackPromptingDetailsProps {
  selectedTechnique: any;
}

export const StepBackPromptingDetails: React.FC<StepBackPromptingDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Original Question', detail: 'Present the specific problem to solve' },
      { num: '2', action: 'Step Back', detail: 'Ask broader, more general questions' },
      { num: '3', action: 'High-Level Reasoning', detail: 'Answer abstract principles first' },
      { num: '4', action: 'Apply Principles', detail: 'Use general knowledge for specific problem' },
      { num: '5', action: 'Final Answer', detail: 'Solve original question with enhanced context' }
    ],
    example: 'Specific Q → "What are the general principles?" → Answer principles → Apply to specific Q → Solution'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Ask genuinely broader conceptual questions', icon: '✅' },
    { type: 'do', text: 'Connect general principles to specific instances', icon: '✅' },
    { type: 'do', text: 'Use step-back questions to access relevant knowledge', icon: '✅' },
    { type: 'do', text: 'Ensure step-back questions are answerable', icon: '✅' },
    { type: 'do', text: 'Bridge abstract reasoning back to concrete problem', icon: '✅' },
    { type: 'dont', text: 'Make step-back questions too similar to original', icon: '❌' },
    { type: 'dont', text: 'Step back so far that context is lost', icon: '❌' },
    { type: 'dont', text: 'Skip the connection between general and specific', icon: '❌' },
    { type: 'dont', text: 'Use when direct reasoning is more efficient', icon: '❌' },
    { type: 'dont', text: 'Generate step-back questions without clear purpose', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Complex problems requiring foundational knowledge',
      'Domain-specific questions needing context',
      'When initial reasoning attempts fail',
      'Problems with multiple solution approaches',
      'Educational or explanatory contexts'
    ],
    avoidWhen: [
      'Simple factual queries',
      'Well-defined procedural tasks',
      'When direct knowledge access is sufficient',
      'Time-sensitive quick decisions',
      'Problems with obvious solution paths'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Question Quality', measure: 'Appropriateness and relevance of step-back questions' },
    { metric: 'Knowledge Activation', measure: 'Effectiveness in accessing relevant principles' },
    { metric: 'Principle-Application Bridge', measure: 'Quality of connection between abstract and specific' },
    { metric: 'Solution Improvement', measure: 'Enhanced accuracy vs direct reasoning' },
    { metric: 'Reasoning Depth', measure: 'Richness of conceptual foundation provided' },
    { metric: 'Transfer Efficiency', measure: 'Speed of applying general knowledge to specific case' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Physics Problem: "What\'s the acceleration?" → "What are Newton\'s laws?" → Apply F=ma → Calculate acceleration',
    'Historical Analysis: "Why did Rome fall?" → "What causes empire collapse?" → General patterns → Rome-specific factors',
    'Medical Diagnosis: "What\'s this rash?" → "What are dermatological principles?" → Apply to symptoms → Diagnosis',
    'Business Strategy: "How to increase sales?" → "What drives customer behavior?" → Apply behavioral insights → Strategy',
    'Programming Debug: "Why is this slow?" → "What causes performance issues?" → Performance principles → Specific optimization'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Take a Step Back: Evoking Reasoning via Abstraction in Large Language Models (Zheng et al., 2023)', url: 'https://arxiv.org/abs/2310.06117' },
        { title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2022)', url: 'https://arxiv.org/abs/2201.11903' },
        { title: 'Least-to-Most Prompting Enables Complex Reasoning (Zhou et al., 2022)', url: 'https://arxiv.org/abs/2205.10625' },
        { title: 'Generated Knowledge Prompting for Commonsense Reasoning (Liu et al., 2021)', url: 'https://arxiv.org/abs/2110.08387' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Google DeepMind Step-Back Prompting Guide', url: 'https://deepmind.google/discover/blog/take-a-step-back-evoking-reasoning-via-abstraction/' },
        { title: 'OpenAI Advanced Prompting: Abstraction Techniques', url: 'https://platform.openai.com/docs/guides/prompt-engineering/strategy-split-complex-tasks-into-simpler-subtasks' },
        { title: 'Anthropic Prompt Engineering: Question Reframing', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/think-step-by-step' },
        { title: 'Prompt Engineering Guide: Step-Back Method', url: 'https://www.promptingguide.ai/techniques/step-back' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain Prompt Templates for Step-Back', url: 'https://python.langchain.com/docs/modules/model_io/prompts/prompt_templates/' },
        { title: 'DSPy: Automatic Prompt Optimization', url: 'https://dspy-docs.vercel.app/docs/building-blocks/optimizers' },
        { title: 'Microsoft Guidance: Structured Generation', url: 'https://github.com/microsoft/guidance' },
        { title: 'OpenAI Function Calling for Multi-Step Reasoning', url: 'https://platform.openai.com/docs/guides/function-calling' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'OpenAI Developer Forum - Advanced Prompting', url: 'https://community.openai.com/c/prompting/8' },
        { title: 'LangChain Discord - Reasoning Techniques', url: 'https://discord.gg/langchain' },
        { title: 'r/MachineLearning - Prompting Research', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'Hugging Face Forums - Prompt Engineering', url: 'https://discuss.huggingface.co/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Reasoning strategy that steps back to broader principles before tackling specific problems"
        why="Improves reasoning by accessing relevant foundational knowledge and applying general principles to specific cases"
        keyInsight="Specific problem → Ask broader questions → Answer general principles → Apply to specific → Enhanced solution"
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

export default StepBackPromptingDetails;