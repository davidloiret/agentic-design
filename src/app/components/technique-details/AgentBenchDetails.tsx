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

interface AgentBenchDetailsProps {
  selectedTechnique: any;
}

export const AgentBenchDetails: React.FC<AgentBenchDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Install', detail: 'git clone https://github.com/THUDM/AgentBench' },
      { num: '2', action: 'Setup', detail: 'Configure API keys and environment dependencies' },
      { num: '3', action: 'Select', detail: 'Choose evaluation environments (1-8)' },
      { num: '4', action: 'Run', detail: 'Execute benchmark against your LLM agent' },
      { num: '5', action: 'Analyze', detail: 'Review performance across environments' }
    ],
    example: 'python run.py --model gpt-4 --environments all --output results.json'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Test across all 8 environments for comprehensive evaluation', icon: '✅' },
    { type: 'do', text: 'Allow sufficient time for multi-turn interactions (4k-13k generations)', icon: '✅' },
    { type: 'do', text: 'Compare results against established baselines (GPT-4, Claude)', icon: '✅' },
    { type: 'do', text: 'Focus on long-term reasoning and decision-making capabilities', icon: '✅' },
    { type: 'do', text: 'Analyze failure modes in complex multi-step tasks', icon: '✅' },
    { type: 'dont', text: 'Rely on single environment results for overall capability assessment', icon: '❌' },
    { type: 'dont', text: 'Skip proper environment setup and dependency configuration', icon: '❌' },
    { type: 'dont', text: 'Ignore instruction following quality in favor of task completion', icon: '❌' },
    { type: 'dont', text: 'Compare models without controlling for prompt engineering', icon: '❌' },
    { type: 'dont', text: 'Assume good performance in one domain transfers to others', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Comprehensive LLM agent capability assessment',
      'Research on agent reasoning and decision-making',
      'Comparing multiple models across diverse tasks',
      'Identifying specific weaknesses in agent performance',
      'Academic research and model development'
    ],
    avoidWhen: [
      'Quick single-domain performance checks',
      'Resource-constrained environments (requires 4k-13k generations)',
      'Real-time evaluation needs',
      'Domain-specific benchmarking only',
      'Models without multi-turn conversation support'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Overall Success Rate', measure: 'Aggregate performance across all 8 environments' },
    { metric: 'Per-Environment Score', measure: 'Domain-specific capability assessment' },
    { metric: 'Multi-turn Coherence', measure: 'Consistency across conversation turns' },
    { metric: 'Instruction Following', measure: 'Adherence to task specifications' },
    { metric: 'Long-term Reasoning', measure: 'Performance on extended reasoning tasks' },
    { metric: 'API vs OSS Gap', measure: 'Commercial vs open-source model comparison' }
  ];

  // Top Use Cases
  const topUseCases = [
    'LLM Agent Research: Comprehensive evaluation of reasoning and decision-making across diverse domains',
    'Model Comparison: Systematic benchmarking of API-based vs open-source models (up to 70B parameters)',
    'Capability Assessment: Identifying specific strengths/weaknesses in SQL, gaming, web, and OS environments',
    'Academic Research: Supporting publications on agent capabilities and multi-turn interaction quality',
    'Agent Development: Guiding improvements in long-term reasoning and instruction following'
  ];

  const references = [
    {
      title: 'Official Paper & Resources',
      items: [
        { title: 'AgentBench: Evaluating LLMs as Agents (Liu et al., ICLR 2024)', url: 'https://arxiv.org/abs/2308.03688' },
        { title: 'AgentBench GitHub Repository', url: 'https://github.com/THUDM/AgentBench' },
        { title: 'ICLR 2024 Poster Presentation', url: 'https://iclr.cc/virtual/2024/poster/17388' },
        { title: 'OpenReview Discussion Forum', url: 'https://openreview.net/forum?id=zAdUB0aCTQ' }
      ]
    },
    {
      title: 'Implementation & Usage',
      items: [
        { title: 'AgentBench Dataset on Papers with Code', url: 'https://paperswithcode.com/dataset/agentbench' },
        { title: 'Hugging Face Paper Page', url: 'https://huggingface.co/papers/2308.03688' },
        { title: 'LLM Agent Benchmark Comparison List', url: 'https://github.com/zhangxjohn/LLM-Agent-Benchmark-List' },
        { title: 'AI Agent Benchmarks Overview (Evidently AI)', url: 'https://www.evidentlyai.com/blog/ai-agent-benchmarks' }
      ]
    },
    {
      title: 'Related Research',
      items: [
        { title: 'Tool Learning with Foundation Models (Qin et al., 2023)', url: 'https://arxiv.org/abs/2304.08354' },
        { title: 'ReAct: Synergizing Reasoning and Acting in Language Models (Yao et al., 2022)', url: 'https://arxiv.org/abs/2210.03629' },
        { title: 'WebShop: Towards Scalable Real-World Web Interaction (Yao et al., 2022)', url: 'https://arxiv.org/abs/2207.01206' },
        { title: 'Toolformer: Language Models Can Teach Themselves to Use Tools (Schick et al., 2023)', url: 'https://arxiv.org/abs/2302.04761' }
      ]
    },
    {
      title: 'Evaluation Frameworks',
      items: [
        { title: 'HELM: Holistic Evaluation of Language Models (Stanford CRFM)', url: 'https://crfm.stanford.edu/helm/' },
        { title: 'BIG-bench: Beyond the Imitation Game Benchmark (Google)', url: 'https://github.com/google/BIG-bench' },
        { title: 'LangChain Agent Evaluation Documentation', url: 'https://python.langchain.com/docs/guides/evaluation/' },
        { title: 'OpenAI Evals Framework', url: 'https://github.com/openai/evals' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="First comprehensive benchmark evaluating LLMs as agents across 8 diverse environments"
        why="Systematic assessment of reasoning, decision-making, and multi-turn interaction capabilities in realistic settings"
        keyInsight="Reveals significant performance gaps between commercial and open-source models in complex agent tasks"
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

export default AgentBenchDetails;