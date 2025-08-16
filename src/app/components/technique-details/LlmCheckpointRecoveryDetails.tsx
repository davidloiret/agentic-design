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

interface LlmCheckpointRecoveryDetailsProps {
  selectedTechnique: any;
}

export const LlmCheckpointRecoveryDetails: React.FC<LlmCheckpointRecoveryDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Setup Proxy', detail: 'Deploy device proxy layer for error interception' },
      { num: '2', action: 'Configure CCL', detail: 'Initialize flexible collective communication library' },
      { num: '3', action: 'Enable JIT', detail: 'Activate just-in-time checkpointing triggers' },
      { num: '4', action: 'Partial Recovery', detail: 'Implement incremental topology reconstruction' },
      { num: '5', action: 'Monitor', detail: 'Track failure patterns and recovery times' }
    ],
    example: 'device_proxy → failure_detection → checkpoint_trigger → partial_reconstruction → resume_training'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use lightweight device proxies optimized for fault tolerance', icon: '✅' },
    { type: 'do', text: 'Implement partial topology reconstruction around failed nodes', icon: '✅' },
    { type: 'do', text: 'Cache gradient states and optimizer checkpoints separately', icon: '✅' },
    { type: 'do', text: 'Use incremental communication reinitialization (not full restart)', icon: '✅' },
    { type: 'do', text: 'Monitor memory usage patterns to predict failures', icon: '✅' },
    { type: 'dont', text: 'Rely on elastic training features for pure fault tolerance', icon: '❌' },
    { type: 'dont', text: 'Perform global communication reinitialization on single failures', icon: '❌' },
    { type: 'dont', text: 'Store massive checkpoints to slow storage during training', icon: '❌' },
    { type: 'dont', text: 'Ignore temporal dominance of communication overhead', icon: '❌' },
    { type: 'dont', text: 'Use generic checkpointing for 70B+ parameter models', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Distributed LLM training (7B+ parameters)',
      'Multi-week training cycles',
      'High failure rate environments',
      'Limited checkpoint storage bandwidth'
    ],
    avoidWhen: [
      'Small model training (<1B parameters)',
      'Single-node deployments',
      'Stable hardware environments',
      'Short training cycles (<24h)'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Recovery Time', measure: 'Seconds to resume training' },
    { metric: 'Overhead', measure: '% daily training time lost' },
    { metric: 'Checkpoint Size', measure: 'GB per model snapshot' },
    { metric: 'Failure Detection', measure: 'Time to detect node failure' },
    { metric: 'Memory Utilization', measure: '% peak memory preserved' },
    { metric: 'Communication Cost', measure: 'Bandwidth for reconstruction' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'LLM Pre-training: 70B+ parameter models with week-long training cycles',
    'Distributed Fine-tuning: Multi-node adaptation with frequent hardware failures',
    'MoE Training: Sparse mixture-of-experts with massive checkpoint sizes',
    'Hybrid Parallelism: Data/tensor/pipeline parallel combinations with complex failure modes',
    'Cloud Training: Spot instance training with predictable interruptions'
  ];

  const references = [
    {
      title: 'Core Academic Research (2024)',
      items: [
        { title: 'Mnemosyne: Lightweight and Fast Error Recovery for LLM Training (Asia-Pacific Workshop on Networking 2024)', url: 'https://dl.acm.org/doi/10.1145/3735358.3735372' },
        { title: 'Efficient Training of Large Language Models on Distributed Infrastructures: A Survey (July 2024)', url: 'https://arxiv.org/html/2407.20018v1' },
        { title: 'Fault-Tolerant Hybrid-Parallel Training at Scale with Reliable and Efficient In-memory Checkpointing (August 2024)', url: 'https://arxiv.org/html/2310.12670' },
        { title: 'MoC-System: Efficient Fault Tolerance for Sparse Mixture-of-Experts Model Training (2024)', url: 'https://arxiv.org/html/2408.04307' }
      ]
    },
    {
      title: 'Technical Foundations',
      items: [
        { title: 'Gemini: Fast Failure Recovery in Distributed Training (SOSP 2023)', url: 'https://www.cs.rice.edu/~eugeneng/papers/SOSP23.pdf' },
        { title: 'REFT: Reliable and Efficient Fault Tolerance for Hybrid Parallel Training', url: 'https://arxiv.org/abs/2310.12670' },
        { title: 'Amazon Science: More-efficient recovery from failures during large-ML-model training', url: 'https://www.amazon.science/blog/more-efficient-recovery-from-failures-during-large-ml-model-training' },
        { title: 'VAST Data: A Checkpoint on Checkpoints in Large Language Models', url: 'https://www.vastdata.com/blog/a-checkpoint-on-checkpoints-in-llms' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'DeepSpeed Checkpointing and ZeRO Optimizer States', url: 'https://deepspeed.readthedocs.io/en/latest/zero.html#checkpointing' },
        { title: 'PyTorch FSDP: Fully Sharded Data Parallel with Checkpointing', url: 'https://pytorch.org/tutorials/intermediate/FSDP_tutorial.html' },
        { title: 'Megatron-LM: Checkpointing for Large Transformer Models', url: 'https://github.com/NVIDIA/Megatron-LM' },
        { title: 'FairScale: Facebook AI Research Scaling Library', url: 'https://github.com/facebookresearch/fairscale' }
      ]
    },
    {
      title: 'Industry & Community',
      items: [
        { title: 'Gradient AI: Distributed LLM Training - Orchestration & Fault Tolerance', url: 'https://www.gradient.ai/blog/distributed-llm-training-part-1' },
        { title: 'MLOps for Large Models: Checkpointing & Fault Tolerance Course', url: 'https://apxml.com/courses/mlops-for-large-models-llmops/chapter-3-llm-training-finetuning-ops/checkpointing-fault-tolerance' },
        { title: 'ML Systems Papers: Curated Collection on Fault Tolerance', url: 'https://github.com/byungsoo-oh/ml-systems-papers' },
        { title: 'Demystifying Distributed Checkpointing (Technical Blog)', url: 'https://expertofobsolescence.substack.com/p/demystifying-distributed-checkpointing' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Device proxy architecture with just-in-time checkpointing for LLM fault recovery"
        why="Reduces recovery overhead by 58.8% vs traditional approaches, enables partial topology reconstruction"
        keyInsight="Lightweight device proxies + flexible CCL + incremental communication reinitialization = 3.6% daily overhead"
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

export default LlmCheckpointRecoveryDetails;