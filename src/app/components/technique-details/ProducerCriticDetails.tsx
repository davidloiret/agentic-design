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

interface ProducerCriticDetailsProps {
  selectedTechnique: any;
}

export const ProducerCriticDetails: React.FC<ProducerCriticDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Define Roles', detail: 'Producer generates, Critic evaluates' },
      { num: '2', action: 'Separate Prompts', detail: 'Distinct system prompts for each agent' },
      { num: '3', action: 'Producer Executes', detail: 'Initial content generation' },
      { num: '4', action: 'Critic Analyzes', detail: 'Structured evaluation & feedback' },
      { num: '5', action: 'Iterate', detail: 'Producer refines based on critique' }
    ],
    example: 'Producer(draft_code) → Critic(review) → Producer(refined_code)'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use distinct personas (e.g., "Senior Engineer" for critic)', icon: '✅' },
    { type: 'do', text: 'Provide structured evaluation criteria to the critic', icon: '✅' },
    { type: 'do', text: 'Separate concerns completely between producer and critic', icon: '✅' },
    { type: 'do', text: 'Consider different critic implementations (LLM, rules, human)', icon: '✅' },
    { type: 'do', text: 'Implement stopping conditions to prevent infinite loops', icon: '✅' },
    { type: 'dont', text: 'Use the same prompt/persona for both roles', icon: '❌' },
    { type: 'dont', text: 'Let producer see critic instructions (bias prevention)', icon: '❌' },
    { type: 'dont', text: 'Skip validation of critic feedback quality', icon: '❌' },
    { type: 'dont', text: 'Allow unlimited iterations without convergence checks', icon: '❌' },
    { type: 'dont', text: 'Ignore computational costs of dual-agent approach', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'High-quality content generation',
      'Code review and optimization',
      'Complex reasoning validation',
      'Creative work refinement'
    ],
    avoidWhen: [
      'Simple, straightforward tasks',
      'Real-time applications',
      'Limited computational budget',
      'Well-defined single-pass solutions'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Quality Delta', measure: 'Improvement from v1 to final' },
    { metric: 'Critique Precision', measure: 'Valid issues / Total critiques' },
    { metric: 'Convergence Rate', measure: 'Iterations to acceptable quality' },
    { metric: 'Cost Efficiency', measure: 'Quality gain / Token cost' },
    { metric: 'Bias Reduction', measure: 'Objective evaluation score' },
    { metric: 'Error Detection', measure: '% of actual errors caught' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Code Generation: Developer writes → Senior Engineer reviews → Developer refines',
    'Content Creation: Writer drafts → Editor critiques → Writer polishes',
    'Research Analysis: Analyst presents → Peer reviews → Analyst strengthens',
    'Design Documents: Architect proposes → Tech Lead evaluates → Architect improves',
    'LLM-as-Judge Implementation: Multiple outputs → LLM critic ranks/scores → Select best'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Self-Refine: Iterative Refinement with Self-Feedback (Madaan et al., 2023)', url: 'https://arxiv.org/abs/2303.17651' },
        { title: 'Constitutional AI: Harmlessness from AI Feedback (Bai et al., 2022)', url: 'https://arxiv.org/abs/2212.08073' },
        { title: 'Reflexion: Language Agents with Verbal Reinforcement Learning (Shinn et al., 2023)', url: 'https://arxiv.org/abs/2303.11366' },
        { title: 'Training Language Models to Self-Correct via RL (Kumar et al., 2024)', url: 'https://arxiv.org/abs/2409.12917' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Multi-Agent Workflows Documentation', url: 'https://python.langchain.com/docs/use_cases/agent_simulations/' },
        { title: 'Google ADK Producer-Reviewer Pattern Guide', url: 'https://google.github.io/adk-docs/agents/multi-agents/' },
        { title: 'CrewAI Agent Collaboration Patterns', url: 'https://docs.crewai.com/core-concepts/Collaboration/' },
        { title: 'AutoGen Multi-Agent Conversation Framework', url: 'https://microsoft.github.io/autogen/docs/Use-Cases/agent_chat' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangGraph - Stateful Multi-Agent Applications', url: 'https://langchain-ai.github.io/langgraph/' },
        { title: 'Google Agent Developer Kit (ADK)', url: 'https://github.com/google/adk' },
        { title: 'Microsoft AutoGen - Multi-Agent Conversations', url: 'https://github.com/microsoft/autogen' },
        { title: 'CrewAI - AI Agent Teams Framework', url: 'https://github.com/joaomdmoura/crewAI' }
      ]
    },
    {
      title: 'Related Patterns',
      items: [
        { title: 'LLM-as-Judge Pattern (Specific Implementation)', url: '#llm-as-judge' },
        { title: 'Actor-Critic in Reinforcement Learning', url: 'https://spinningup.openai.com/en/latest/algorithms/sac.html' },
        { title: 'Peer Review Systems in Academia', url: 'https://www.nature.com/articles/d41586-023-00403-8' },
        { title: 'Code Review Best Practices', url: 'https://google.github.io/eng-practices/review/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Separate producer and critic agents for unbiased quality improvement"
        why="Prevents self-evaluation bias, enables specialized critique, improves output quality"
        keyInsight="Producer focuses on creation, Critic provides objective evaluation → Higher quality"
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

export default ProducerCriticDetails;