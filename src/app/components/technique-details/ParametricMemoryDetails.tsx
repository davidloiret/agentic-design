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

interface ParametricMemoryDetailsProps {
  selectedTechnique: any;
}

export const ParametricMemoryDetails: React.FC<ParametricMemoryDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Pre-train', detail: 'Embed domain knowledge in model weights' },
      { num: '2', action: 'Fine-tune', detail: 'Use PEFT methods (LoRA, QLoRA) for efficiency' },
      { num: '3', action: 'Specialize', detail: 'Create agent-specific parameter branches' },
      { num: '4', action: 'Share Base', detail: 'Common foundation across agent network' },
      { num: '5', action: 'Monitor', detail: 'Track knowledge access & parameter usage' }
    ],
    example: 'base_llm → domain_finetune → agent_specialization → shared_deployment'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use parameter-efficient fine-tuning (LoRA, QLoRA, MoRA)', icon: '✅' },
    { type: 'do', text: 'Share base parameters across agent network for consistency', icon: '✅' },
    { type: 'do', text: 'Monitor parameter specialization patterns for knowledge storage', icon: '✅' },
    { type: 'do', text: 'Implement knowledge consolidation to prevent parameter bloat', icon: '✅' },
    { type: 'do', text: 'Version control model parameters for rollback capability', icon: '✅' },
    { type: 'dont', text: 'Full parameter retraining for new knowledge (expensive & risky)', icon: '❌' },
    { type: 'dont', text: 'Store time-sensitive information in parametric memory', icon: '❌' },
    { type: 'dont', text: 'Ignore knowledge cutoff dates and factual accuracy degradation', icon: '❌' },
    { type: 'dont', text: 'Deploy without parameter redundancy for fault tolerance', icon: '❌' },
    { type: 'dont', text: 'Mix incompatible parameter versions across agent instances', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Stable domain knowledge required',
      'Fast inference speed critical',
      'Multi-agent consistency needed',
      'Offline deployment scenarios',
      'Cost-sensitive applications'
    ],
    avoidWhen: [
      'Rapidly changing information',
      'Regulatory compliance updates',
      'Real-time data integration',
      'User-specific customization',
      'Frequent knowledge updates'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Knowledge Accuracy', measure: '% correct factual responses' },
    { metric: 'Inference Speed', measure: 'Tokens/second generation rate' },
    { metric: 'Parameter Efficiency', measure: 'Knowledge/parameter ratio' },
    { metric: 'Consistency Score', measure: 'Cross-agent response similarity' },
    { metric: 'Memory Footprint', measure: 'GB required per agent' },
    { metric: 'Update Cost', measure: '$ per knowledge refresh cycle' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Scientific Research Agents: Physics, chemistry, biology knowledge embedded (consistent across 100+ agents)',
    'Legal Document Analysis: Case law, statutes, procedures in parameters (instant access, no external DB)',
    'Medical Diagnosis Support: Medical knowledge, drug interactions, symptoms (HIPAA-compliant, offline)',
    'Financial Analysis: Market fundamentals, accounting principles, regulations (real-time inference)',
    'Code Generation: Programming languages, frameworks, best practices (multi-language consistency)'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'A Survey on the Memory Mechanism of Large Language Model based Agents (Zhang et al., 2024)', url: 'https://arxiv.org/abs/2404.13501' },
        { title: 'The Rise of Parameter Specialization for Knowledge Storage (Hong et al., 2024)', url: 'https://arxiv.org/html/2505.17260' },
        { title: 'Parametric vs Non-parametric Memory in Retrieval-augmented LLMs (Farahani & Johansson, 2024)', url: 'https://aclanthology.org/2024.emnlp-main.943/' },
        { title: 'Augmented Large Language Models with Parametric Knowledge Guiding (Luo et al., 2023)', url: 'https://arxiv.org/abs/2305.04757' }
      ]
    },
    {
      title: 'Parameter-Efficient Methods',
      items: [
        { title: 'MoDE: Multi-task Parameter Efficient Fine-Tuning (Ning et al., 2024)', url: 'https://arxiv.org/abs/2408.01505' },
        { title: 'L4Q: Parameter Efficient Quantization-Aware Fine-Tuning (Jeon et al., 2024)', url: 'https://arxiv.org/abs/2402.04902' },
        { title: 'UNLEARN: Efficient Knowledge Removal in LLMs (Lizzo & Heck, 2024)', url: 'https://arxiv.org/abs/2408.04140' },
        { title: 'LoRA: Low-Rank Adaptation of Large Language Models (Hu et al., 2021)', url: 'https://arxiv.org/abs/2106.09685' }
      ]
    },
    {
      title: 'Multi-Agent Systems',
      items: [
        { title: 'Multi-Agent Collaboration Mechanisms: A Survey of LLMs (2024)', url: 'https://arxiv.org/html/2501.06322v1' },
        { title: 'LLM Multi-Agent Systems: Challenges and Open Problems (2024)', url: 'https://arxiv.org/html/2402.03578v1' },
        { title: 'LLM Agent Memory Survey - GitHub Repository', url: 'https://github.com/nuster1128/LLM_Agent_Memory_Survey' },
        { title: 'Efficient LLMs Survey - GitHub Repository', url: 'https://github.com/AIoT-MLSys-Lab/Efficient-LLMs-Survey' }
      ]
    },
    {
      title: 'Industry Implementation',
      items: [
        { title: 'Anthropic Claude Memory Management Documentation', url: 'https://docs.anthropic.com/en/docs/claude-code/memory' },
        { title: 'Model Context Protocol (MCP) - Anthropic Standard', url: 'https://www.anthropic.com/news/model-context-protocol' },
        { title: 'Hugging Face PEFT (Parameter-Efficient Fine-Tuning) Library', url: 'https://github.com/huggingface/peft' },
        { title: 'OpenAI Fine-tuning Cookbook - How to Fine-tune Chat Models', url: 'https://cookbook.openai.com/examples/how_to_finetune_chat_models' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Knowledge implicitly stored within model parameters, enabling fast context-free access"
        why="Sub-millisecond retrieval, no external dependencies, consistent across agents, scales to 1000+ agents"
        keyInsight="Pre-trained knowledge → PEFT specialization → shared base parameters across agent network"
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

export default ParametricMemoryDetails;