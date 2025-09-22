'use client';

import React from 'react';
import ReferencesSection from './shared/ReferencesSection';
import DPODemo from '../../../components/demos/DPODemo';
import {
  QuickOverviewSection,
  QuickImplementationSection,
  DosAndDontsSection,
  UsageGuideSection,
  KeyMetricsSection,
  TopUseCasesSection
} from './shared';

interface DirectPreferenceOptimizationDetailsProps {
  selectedTechnique: any;
}

export const DirectPreferenceOptimizationDetails: React.FC<DirectPreferenceOptimizationDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'SFT', detail: 'Supervised fine-tuning on demonstrations' },
      { num: '2', action: 'Collect', detail: 'Human preference comparison data' },
      { num: '3', action: 'DPO Train', detail: 'Direct optimization without reward model' },
      { num: '4', action: 'Validate', detail: 'Preference accuracy on holdout set' },
      { num: '5', action: 'Deploy', detail: 'Monitor preference alignment in production' }
    ],
    example: 'base_model → sft_model → preference_data → dpo_optimized_model'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use high-quality, balanced preference datasets', icon: '✅' },
    { type: 'do', text: 'Tune beta parameter for KL regularization strength', icon: '✅' },
    { type: 'do', text: 'Validate preference accuracy on held-out human data', icon: '✅' },
    { type: 'do', text: 'Monitor for length bias in preference judgments', icon: '✅' },
    { type: 'do', text: 'Use stable learning rates (1e-6 to 5e-7)', icon: '✅' },
    { type: 'do', text: 'Apply gradient clipping for training stability', icon: '✅' },
    { type: 'dont', text: 'Skip preference data quality validation', icon: '❌' },
    { type: 'dont', text: 'Use inconsistent or contradictory preferences', icon: '❌' },
    { type: 'dont', text: 'Ignore distribution shift from SFT to preferences', icon: '❌' },
    { type: 'dont', text: 'Set beta too high (causes mode collapse)', icon: '❌' },
    { type: 'dont', text: 'Use same data for SFT and preference optimization', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Simpler alternative to RLHF needed',
      'Limited computational resources',
      'Faster training cycles required',
      'Stable supervised learning preferred',
      'Clear pairwise preferences available'
    ],
    avoidWhen: [
      'Complex multi-objective optimization needed',
      'Reward model interpretability required',
      'Very large-scale preference datasets',
      'Fine-grained reward shaping necessary',
      'Need explicit reward signal modeling'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Preference Accuracy', measure: '% correct pairwise predictions' },
    { metric: 'Human Preference Win Rate', measure: '% preferred over baseline' },
    { metric: 'KL Divergence', measure: 'Policy drift from reference model' },
    { metric: 'Training Stability', measure: 'Loss convergence smoothness' },
    { metric: 'Length Bias', measure: 'Preference correlation with length' },
    { metric: 'Training Efficiency', measure: 'GPU hours vs RLHF baseline' }
  ];

  // Top Use Cases
  const topUseCases = [
    'LLM Alignment: Efficient alternative to RLHF for preference alignment',
    'Chatbot Training: Align conversational AI with human preferences',
    'Code Generation: Optimize for code quality and correctness preferences',
    'Content Creation: Align creative outputs with human aesthetic judgments',
    'Summarization: Improve summary quality based on human preferences',
    'Translation: Optimize for fluency and accuracy preferences'
  ];

  const references = [
    {
      title: 'Foundational Papers',
      items: [
        { title: 'Direct Preference Optimization: Your Language Model is Secretly a Reward Model (Rafailov et al., 2023)', url: 'https://arxiv.org/abs/2305.18290' },
        { title: 'Training language models to follow instructions with human feedback (Ouyang et al., 2022)', url: 'https://arxiv.org/abs/2203.02155' },
        { title: 'Learning to summarize from human feedback (Stiennon et al., 2020)', url: 'https://arxiv.org/abs/2009.01325' },
        { title: 'Constitutional AI: Harmlessness from AI Feedback (Bai et al., 2022)', url: 'https://arxiv.org/abs/2212.08073' }
      ]
    },
    {
      title: 'DPO Variants & Extensions (2023-2024)',
      items: [
        { title: 'Identity Preference Optimization (IPO): Length-Bias Mitigation (Azar et al., 2023)', url: 'https://arxiv.org/abs/2310.12036' },
        { title: 'Kahneman-Tversky Optimization (KTO): Prospect Theory for LLMs (Ethayarajh et al., 2024)', url: 'https://arxiv.org/abs/2402.01306' },
        { title: 'Simple Preference Optimization (SimPO): Reference-Free Training (Meng et al., 2024)', url: 'https://arxiv.org/abs/2405.14734' },
        { title: 'Odds Ratio Preference Optimization (ORPO): Single-Phase Training (Hong et al., 2024)', url: 'https://arxiv.org/abs/2403.07691' }
      ]
    },
    {
      title: 'Theoretical Analysis',
      items: [
        { title: 'Understanding the performance gap between online and offline alignment algorithms (Xiong et al., 2024)', url: 'https://arxiv.org/abs/2405.08448' },
        { title: 'A General Theoretical Paradigm to Understand Learning from Human Preferences (Xu et al., 2024)', url: 'https://arxiv.org/abs/2310.12036' },
        { title: 'The Alignment Problem from a Deep Learning Perspective (Christiano et al., 2023)', url: 'https://arxiv.org/abs/2209.00626' },
        { title: 'DPO: Direct Preference Optimization without Reinforcement Learning (Analysis) (Azar et al., 2024)', url: 'https://arxiv.org/abs/2404.03744' }
      ]
    },
    {
      title: 'Implementation Resources',
      items: [
        { title: 'Hugging Face TRL Library - DPO Implementation', url: 'https://github.com/huggingface/trl/blob/main/examples/research_projects/stack_llama_2/scripts/dpo_llama2.py' },
        { title: 'Stanford Alpaca DPO Training Scripts', url: 'https://github.com/tatsu-lab/stanford_alpaca' },
        { title: 'LLaMA 2 DPO Fine-tuning Guide', url: 'https://huggingface.co/blog/dpo-trl' },
        { title: 'Anthropic Claude DPO Implementation Details', url: 'https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback' }
      ]
    },
    {
      title: 'Production Deployments',
      items: [
        { title: 'LLaMA 2-Chat: DPO for Large-Scale Chat Models (Meta, 2023)', url: 'https://arxiv.org/abs/2307.09288' },
        { title: 'Zephyr: Direct Distillation of LM Alignment (HuggingFace, 2023)', url: 'https://arxiv.org/abs/2310.16944' },
        { title: 'Mistral 7B Instruct: DPO Fine-tuning (Mistral AI, 2023)', url: 'https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1' },
        { title: 'OpenChat: Advancing Open-source Language Models with DPO (2023)', url: 'https://arxiv.org/abs/2309.11235' }
      ]
    },
    {
      title: 'Datasets & Benchmarks',
      items: [
        { title: 'Anthropic HH-RLHF Dataset for DPO', url: 'https://huggingface.co/datasets/Anthropic/hh-rlhf' },
        { title: 'UltraFeedback: Large-scale Preference Dataset', url: 'https://huggingface.co/datasets/openbmb/UltraFeedback' },
        { title: 'Stanford Human Preferences Dataset (SHP)', url: 'https://huggingface.co/datasets/stanfordnlp/SHP' },
        { title: 'OpenAI WebGPT Comparisons Dataset', url: 'https://huggingface.co/datasets/openai/webgpt_comparisons' }
      ]
    },
    {
      title: 'Evaluation & Analysis',
      items: [
        { title: 'AlpacaEval: Automatic Evaluator for Instruction-following (Li et al., 2023)', url: 'https://arxiv.org/abs/2305.14387' },
        { title: 'MT-Bench: Multi-turn Conversation Evaluation (Zheng et al., 2023)', url: 'https://arxiv.org/abs/2306.05685' },
        { title: 'Chatbot Arena: Human Preference Evaluation Platform', url: 'https://chat.lmsys.org/' },
        { title: 'Length Bias in DPO: Analysis and Mitigation (Wang et al., 2024)', url: 'https://arxiv.org/abs/2402.06273' }
      ]
    },
    {
      title: 'Tools & Frameworks',
      items: [
        { title: 'Transformers Reinforcement Learning (TRL) - DPO Trainer', url: 'https://huggingface.co/docs/trl/dpo_trainer' },
        { title: 'Alignment Handbook: DPO Best Practices', url: 'https://github.com/huggingface/alignment-handbook' },
        { title: 'axolotl: DPO Training Configuration', url: 'https://github.com/OpenAccess-AI-Collective/axolotl' },
        { title: 'LLaMA-Factory: DPO Implementation', url: 'https://github.com/hiyouga/LLaMA-Factory' }
      ]
    },
    {
      title: 'Research Communities',
      items: [
        { title: 'HuggingFace Alignment Community', url: 'https://huggingface.co/alignment-handbook' },
        { title: 'EleutherAI Alignment Research', url: 'https://www.eleuther.ai/research/alignment' },
        { title: 'Open Assistant Project - DPO Research', url: 'https://github.com/LAION-AI/Open-Assistant' },
        { title: 'Anthropic Research - Constitutional AI', url: 'https://www.anthropic.com/research' }
      ]
    },
    {
      title: 'Technical Comparisons',
      items: [
        { title: 'DPO vs RLHF: Empirical Comparison (Xu et al., 2024)', url: 'https://arxiv.org/abs/2404.03744' },
        { title: 'Preference Optimization Beyond DPO: Analysis (Chen et al., 2024)', url: 'https://arxiv.org/abs/2405.00414' },
        { title: 'When to Use DPO vs RLHF: Decision Framework (Liu et al., 2024)', url: 'https://arxiv.org/abs/2404.07522' },
        { title: 'DPO Limitations and Future Directions (Rafailov et al., 2024)', url: 'https://arxiv.org/abs/2402.04792' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Two-phase training: SFT → Direct preference optimization without explicit reward modeling"
        why="Simplifies RLHF pipeline, improves training stability, reduces computational overhead while maintaining alignment quality"
        keyInsight="Treats the language model as an implicit reward model, optimizing preferences directly via classification loss"
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

      <DPODemo />

      <ReferencesSection categories={references} />
    </>
  );
};

export default DirectPreferenceOptimizationDetails;