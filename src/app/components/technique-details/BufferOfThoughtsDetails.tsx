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

interface BufferOfThoughtsDetailsProps {
  selectedTechnique: any;
}

export const BufferOfThoughtsDetails: React.FC<BufferOfThoughtsDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Thought Collection', detail: 'Generate diverse reasoning thoughts & approaches' },
      { num: '2', action: 'Buffer Storage', detail: 'Store thoughts in structured buffer memory' },
      { num: '3', action: 'Distillation', detail: 'Extract key insights and patterns from buffer' },
      { num: '4', action: 'Template Creation', detail: 'Create reusable reasoning templates' },
      { num: '5', action: 'Application', detail: 'Apply distilled knowledge to new problems' }
    ],
    example: 'Problem → Generate many thoughts → Store in buffer → Distill patterns → Create templates → Apply'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Encourage diverse and creative thought generation', icon: '✅' },
    { type: 'do', text: 'Implement efficient buffer storage and retrieval', icon: '✅' },
    { type: 'do', text: 'Focus distillation on actionable insights', icon: '✅' },
    { type: 'do', text: 'Create templates that generalize across problems', icon: '✅' },
    { type: 'do', text: 'Update buffer with new successful reasoning patterns', icon: '✅' },
    { type: 'dont', text: 'Fill buffer with redundant or low-quality thoughts', icon: '❌' },
    { type: 'dont', text: 'Skip the distillation step (raw thoughts ≠ knowledge)', icon: '❌' },
    { type: 'dont', text: 'Create overly specific templates without generalization', icon: '❌' },
    { type: 'dont', text: 'Ignore buffer capacity limits (memory overflow)', icon: '❌' },
    { type: 'dont', text: 'Use stale templates without updating from experience', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Problems requiring creative reasoning approaches',
      'Domains where experience accumulation helps',
      'Multi-step reasoning with reusable patterns',
      'When building reasoning expertise over time',
      'Complex problem-solving requiring diverse perspectives'
    ],
    avoidWhen: [
      'Simple, one-off reasoning tasks',
      'Domains with well-established procedures',
      'Memory-constrained environments',
      'Real-time applications requiring immediate response',
      'Problems with no reusable reasoning patterns'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Thought Diversity', measure: 'Variety and creativity of generated reasoning approaches' },
    { metric: 'Distillation Quality', measure: 'Effectiveness of pattern extraction from buffer' },
    { metric: 'Template Reusability', measure: 'Success rate of applying templates to new problems' },
    { metric: 'Buffer Efficiency', measure: 'Storage utilization vs reasoning performance' },
    { metric: 'Knowledge Transfer', measure: 'Improvement in similar problem-solving over time' },
    { metric: 'Reasoning Innovation', measure: 'Discovery of novel solution approaches' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Research Methodology: Collect research approaches → Buffer strategies → Distill best practices → Create methodology templates',
    'Creative Problem Solving: Generate solution ideas → Store in buffer → Extract patterns → Build innovation frameworks',
    'Code Architecture: Collect design patterns → Buffer approaches → Distill principles → Create architecture templates',
    'Strategic Planning: Gather strategic thoughts → Buffer insights → Extract frameworks → Build planning templates',
    'Learning System: Accumulate reasoning examples → Buffer successful approaches → Distill learning patterns → Create educational templates'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Buffer of Thoughts: Thought-Augmented Reasoning with Large Language Models (Yang et al., 2024)', url: 'https://arxiv.org/abs/2406.04271' },
        { title: 'Skeleton-of-Thought: Large Language Models Can Do Parallel Decoding (Ning et al., 2023)', url: 'https://arxiv.org/abs/2307.15337' },
        { title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2022)', url: 'https://arxiv.org/abs/2201.11903' },
        { title: 'Tree of Thoughts: Deliberate Problem Solving with Large Language Models (Yao et al., 2023)', url: 'https://arxiv.org/abs/2305.10601' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Memory Systems for Thought Storage', url: 'https://python.langchain.com/docs/modules/memory/' },
        { title: 'OpenAI Advanced Reasoning with Memory', url: 'https://platform.openai.com/docs/guides/reasoning' },
        { title: 'Anthropic Constitutional AI: Iterative Improvement', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/constitutional-ai' },
        { title: 'Microsoft Semantic Kernel: Memory and Planning', url: 'https://learn.microsoft.com/en-us/semantic-kernel/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain ConversationBufferMemory', url: 'https://python.langchain.com/docs/modules/memory/types/buffer' },
        { title: 'Llama Index Memory Systems', url: 'https://docs.llamaindex.ai/en/stable/module_guides/storing/storing/' },
        { title: 'Chroma Vector Database for Thought Storage', url: 'https://github.com/chroma-core/chroma' },
        { title: 'Pinecone: Vector Memory for AI Applications', url: 'https://www.pinecone.io/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Discord - Memory Patterns', url: 'https://discord.gg/langchain' },
        { title: 'OpenAI Developer Forum - Advanced Memory', url: 'https://community.openai.com/c/api/20' },
        { title: 'r/MachineLearning - Reasoning and Memory', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'Hugging Face Forums - Memory-Augmented Models', url: 'https://discuss.huggingface.co/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Thought-augmented reasoning that collects diverse approaches in a buffer, distills patterns, and creates reusable templates"
        why="Builds reasoning expertise over time by learning from diverse thought processes and creating reusable knowledge structures"
        keyInsight="Generate diverse thoughts → Buffer storage → Distill patterns → Create templates → Apply to new problems"
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

export default BufferOfThoughtsDetails;