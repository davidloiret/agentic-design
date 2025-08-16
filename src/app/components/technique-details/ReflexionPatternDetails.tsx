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

interface ReflexionPatternDetailsProps {
  selectedTechnique: any;
}

export const ReflexionPatternDetails: React.FC<ReflexionPatternDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Actor Executes', detail: 'Generate actions/text for task' },
      { num: '2', action: 'Environment Responds', detail: 'Get feedback/results' },
      { num: '3', action: 'Evaluator Scores', detail: 'Assess performance objectively' },
      { num: '4', action: 'Self-Reflect', detail: 'Generate verbal reinforcement' },
      { num: '5', action: 'Update Memory', detail: 'Store reflection for next trial' }
    ],
    example: 'Actor(task) → Result → Evaluate → Reflect(verbal) → Memory → Actor(improved)'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Convert feedback into actionable linguistic hints', icon: '✅' },
    { type: 'do', text: 'Maintain episodic memory of past reflections', icon: '✅' },
    { type: 'do', text: 'Use specific, concrete reflection prompts', icon: '✅' },
    { type: 'do', text: 'Implement clear evaluation metrics', icon: '✅' },
    { type: 'do', text: 'Limit reflection depth to avoid overthinking', icon: '✅' },
    { type: 'dont', text: 'Store raw trajectories without reflection', icon: '❌' },
    { type: 'dont', text: 'Use vague reflections like "do better"', icon: '❌' },
    { type: 'dont', text: 'Skip environment feedback integration', icon: '❌' },
    { type: 'dont', text: 'Allow unlimited reflection cycles', icon: '❌' },
    { type: 'dont', text: 'Ignore memory constraints in long tasks', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Multi-step reasoning tasks',
      'Programming challenges',
      'Sequential decision making',
      'Learning from failures'
    ],
    avoidWhen: [
      'Single-shot tasks',
      'Time-critical applications',
      'Simple Q&A',
      'Deterministic problems'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Success Rate', measure: 'Task completion over trials' },
    { metric: 'Learning Curve', measure: 'Performance improvement rate' },
    { metric: 'Reflection Quality', measure: 'Actionability of insights' },
    { metric: 'Memory Efficiency', measure: 'Relevant recall vs storage' },
    { metric: 'Convergence Speed', measure: 'Trials to optimal performance' },
    { metric: 'Generalization', measure: 'Transfer to similar tasks' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Code Generation: Write → Test → Reflect on errors → Fix bugs → Improve',
    'Game Playing: Move → Observe → Evaluate → Reflect on strategy → Adapt',
    'Problem Solving: Attempt → Check → Analyze failure → Learn → Retry',
    'Writing Tasks: Draft → Review → Reflect on weaknesses → Revise → Polish',
    'Agent Training: Act → Get reward → Reflect on decisions → Update policy'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Reflexion: Language Agents with Verbal Reinforcement Learning (Shinn et al., 2023)', url: 'https://arxiv.org/abs/2303.11366' },
        { title: 'ReAct: Synergizing Reasoning and Acting in Language Models (Yao et al., 2023)', url: 'https://arxiv.org/abs/2210.03629' },
        { title: 'Self-Refine: Iterative Refinement with Self-Feedback (Madaan et al., 2023)', url: 'https://arxiv.org/abs/2303.17651' },
        { title: 'Teaching Large Language Models to Self-Debug (Chen et al., 2023)', url: 'https://arxiv.org/abs/2304.05128' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Reflexion Implementation', url: 'https://github.com/langchain-ai/langchain/tree/master/cookbook/reflexion.ipynb' },
        { title: 'LlamaIndex ReAct Agent Guide', url: 'https://docs.llamaindex.ai/en/stable/examples/agent/react_agent/' },
        { title: 'Reflexion Official Implementation', url: 'https://github.com/noahshinn/reflexion' },
        { title: 'AutoGPT Reflection & Self-Criticism', url: 'https://docs.agpt.co/concepts/reflection/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain ReAct Agent', url: 'https://python.langchain.com/docs/modules/agents/agent_types/react' },
        { title: 'Reflexion Python Package', url: 'https://pypi.org/project/reflexion/' },
        { title: 'AgentGym - Multi-Agent Training', url: 'https://github.com/WooooDyy/AgentGym' },
        { title: 'Voyager - Embodied Reflexion Agent', url: 'https://github.com/MineDojo/Voyager' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Discord - Reflexion Patterns', url: 'https://discord.gg/langchain' },
        { title: 'Papers With Code - Reflexion', url: 'https://paperswithcode.com/paper/reflexion-language-agents-with-verbal' },
        { title: 'Reddit r/MachineLearning - Agent Learning', url: 'https://reddit.com/r/MachineLearning' },
        { title: 'AI Alignment Forum - Self-Improvement', url: 'https://www.alignmentforum.org/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Agents learn from experience through verbal self-reflection"
        why="Converts failures into linguistic insights, enabling learning without fine-tuning"
        keyInsight="Actor → Evaluator → Self-Reflection → Memory → Improved Performance"
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

export default ReflexionPatternDetails;