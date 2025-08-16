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

interface SelfCritiqueDetailsProps {
  selectedTechnique: any;
}

export const SelfCritiqueDetails: React.FC<SelfCritiqueDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Generate', detail: 'Initial response to task' },
      { num: '2', action: 'Critique', detail: 'Systematic quality evaluation' },
      { num: '3', action: 'Identify', detail: 'Specific issues & improvements' },
      { num: '4', action: 'Revise', detail: 'Address identified weaknesses' },
      { num: '5', action: 'Iterate', detail: 'Repeat until quality threshold' }
    ],
    example: 'generate(task) → critique(output) → revise(issues) → validate() → final_output'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Define clear, objective critique criteria for the task', icon: '✅' },
    { type: 'do', text: 'Use structured evaluation templates (accuracy, completeness, clarity)', icon: '✅' },
    { type: 'do', text: 'Set maximum iteration limits (typically 2-3 cycles)', icon: '✅' },
    { type: 'do', text: 'Track quality metrics to measure improvement', icon: '✅' },
    { type: 'do', text: 'Document critique reasoning for transparency', icon: '✅' },
    { type: 'dont', text: 'Allow infinite revision loops without stopping criteria', icon: '❌' },
    { type: 'dont', text: 'Use vague criteria like "make it better"', icon: '❌' },
    { type: 'dont', text: 'Over-critique acceptable responses', icon: '❌' },
    { type: 'dont', text: 'Ignore computational cost vs quality gain tradeoffs', icon: '❌' },
    { type: 'dont', text: 'Apply same critique template to all task types', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'High-stakes content generation',
      'Complex reasoning tasks',
      'Quality > speed requirements',
      'Iterative improvement needed'
    ],
    avoidWhen: [
      'Real-time applications',
      'Simple/straightforward tasks',
      'Limited compute budget',
      'Subjective quality domains'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Quality Gain', measure: '% improvement from v1 to final' },
    { metric: 'Iteration Count', measure: 'Average cycles to convergence' },
    { metric: 'Critique Accuracy', measure: 'Valid issues / Total critiques' },
    { metric: 'Token Efficiency', measure: 'Quality gain / Extra tokens' },
    { metric: 'Time to Converge', measure: 'Total processing time' },
    { metric: 'Error Reduction', measure: '% decrease in mistakes' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Academic Writing: Draft → Critique logic/evidence → Strengthen arguments → Polish',
    'Code Generation: Initial code → Identify bugs/inefficiencies → Fix → Optimize',
    'Technical Docs: First version → Check accuracy/completeness → Fill gaps → Clarify',
    'Analysis Reports: Raw analysis → Verify conclusions → Add context → Refine insights',
    'Creative Content: Draft → Evaluate engagement/clarity → Enhance → Final edit'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Self-Refine: Iterative Refinement with Self-Feedback (Madaan et al., 2023)', url: 'https://arxiv.org/abs/2303.17651' },
        { title: 'Constitutional AI: Harmlessness from AI Feedback (Bai et al., 2022)', url: 'https://arxiv.org/abs/2212.08073' },
        { title: 'CRITIC: Large Language Models Can Self-Correct (Gou et al., 2024)', url: 'https://arxiv.org/abs/2305.11738' },
        { title: 'Self-Consistency Improves Chain of Thought Reasoning (Wang et al., 2022)', url: 'https://arxiv.org/abs/2203.11171' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Self-Critique Chains Documentation', url: 'https://python.langchain.com/docs/use_cases/self_critique' },
        { title: 'OpenAI Guide: Self-Evaluation Strategies', url: 'https://platform.openai.com/docs/guides/prompt-engineering#strategy-ask-the-model-to-evaluate-its-own-outputs' },
        { title: 'Anthropic Constitutional AI Tutorial', url: 'https://docs.anthropic.com/en/docs/constitutional-ai-training' },
        { title: 'DSPy Self-Refinement Module', url: 'https://dspy-docs.vercel.app/docs/building-blocks/modules#selfrefine' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain ConstitutionalChain', url: 'https://python.langchain.com/docs/guides/safety/constitutional_chain' },
        { title: 'Guidance Self-Critique Templates', url: 'https://github.com/guidance-ai/guidance' },
        { title: 'Outlines - Structured Generation with Validation', url: 'https://github.com/outlines-dev/outlines' },
        { title: 'Instructor - Validated LLM Outputs', url: 'https://github.com/jxnl/instructor' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Discord - Self-Improvement Channel', url: 'https://discord.gg/langchain' },
        { title: 'r/LocalLLaMA - Self-Critique Discussions', url: 'https://reddit.com/r/LocalLLaMA' },
        { title: 'HuggingFace Forums - Model Self-Evaluation', url: 'https://discuss.huggingface.co/' },
        { title: 'AI Safety Discord - Constitutional AI', url: 'https://discord.gg/aisafety' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Single agent evaluates and iteratively improves its own outputs"
        why="Catches errors, improves quality, ensures completeness without external validation"
        keyInsight="Generate → Critique → Revise → Repeat until quality threshold met"
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

export default SelfCritiqueDetails;