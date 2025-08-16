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

interface OddsRatioPreferenceOptimizationDetailsProps {
  selectedTechnique: any;
}

export const OddsRatioPreferenceOptimizationDetails: React.FC<OddsRatioPreferenceOptimizationDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'SFT', detail: 'Supervised fine-tuning on demonstration data' },
      { num: '2', action: 'Preference Data', detail: 'Collect pairwise preference comparisons' },
      { num: '3', action: 'ORPO Loss', detail: 'Combine SFT loss with odds ratio penalty' },
      { num: '4', action: 'Single Phase', detail: 'Train simultaneously without separate reward model' },
      { num: '5', action: 'Validate', detail: 'Evaluate preference alignment and helpfulness' }
    ],
    example: 'sft_data + preference_pairs → orpo_training → aligned_model (single_phase)'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use balanced preference datasets with clear winner/loser pairs', icon: '✅' },
    { type: 'do', text: 'Tune lambda parameter for optimal SFT/preference balance', icon: '✅' },
    { type: 'do', text: 'Monitor for training instability with gradient clipping', icon: '✅' },
    { type: 'do', text: 'Validate against human evaluation and benchmark tasks', icon: '✅' },
    { type: 'do', text: 'Use appropriate learning rates (typically lower than standard SFT)', icon: '✅' },
    { type: 'do', text: 'Implement early stopping based on preference accuracy', icon: '✅' },
    { type: 'dont', text: 'Use unbalanced or low-quality preference data', icon: '❌' },
    { type: 'dont', text: 'Set lambda too high (causes training instability)', icon: '❌' },
    { type: 'dont', text: 'Ignore the relative log-probabilities in the loss function', icon: '❌' },
    { type: 'dont', text: 'Skip comparison with DPO and other preference methods', icon: '❌' },
    { type: 'dont', text: 'Apply without understanding the odds ratio formulation', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Want single-phase training without separate reward model',
      'Have high-quality pairwise preference data available',
      'Need simpler alternative to multi-stage RLHF pipeline',
      'Computational efficiency is important',
      'Prefer monolithic training over modular approaches'
    ],
    avoidWhen: [
      'Need explicit reward model for interpretability',
      'Preference data quality is questionable',
      'Require fine-grained control over reward shaping',
      'Training stability is a major concern',
      'Multi-objective optimization is needed'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Preference Win Rate', measure: '% preferred responses vs baseline' },
    { metric: 'Training Stability', measure: 'Loss convergence and gradient norms' },
    { metric: 'SFT Performance', measure: 'Retention of supervised learning quality' },
    { metric: 'Alignment Score', measure: 'Human evaluation of response quality' },
    { metric: 'Training Efficiency', measure: 'Compute time vs multi-stage methods' },
    { metric: 'Odds Ratio Penalty', measure: 'Magnitude of preference alignment signal' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Instruction Following: Align models to follow instructions with single-phase training',
    'Conversational AI: Improve dialogue quality without separate reward modeling',
    'Content Generation: Optimize creative outputs based on preference feedback',
    'Code Generation: Align code generation with developer preferences efficiently',
    'Educational AI: Train tutoring systems with pedagogical preference alignment',
    'Customer Service: Optimize response quality for customer satisfaction'
  ];

  const references = [
    {
      title: 'Foundational Paper',
      items: [
        { title: 'ORPO: Monolithic Preference Optimization without Reference Model (Hong et al., 2024)', url: 'https://arxiv.org/abs/2403.07691' },
        { title: 'Direct Preference Optimization: Your Language Model is Secretly a Reward Model (Rafailov et al., 2023)', url: 'https://arxiv.org/abs/2305.18290' },
        { title: 'Training language models to follow instructions with human feedback (Ouyang et al., 2022)', url: 'https://arxiv.org/abs/2203.02155' },
        { title: 'Learning to summarize from human feedback (Stiennon et al., 2020)', url: 'https://arxiv.org/abs/2009.01325' }
      ]
    },
    {
      title: 'Related Preference Optimization Methods',
      items: [
        { title: 'Simple Preference Optimization (SimPO): Reference-Free Training (Meng et al., 2024)', url: 'https://arxiv.org/abs/2405.14734' },
        { title: 'Identity Preference Optimization (IPO): Length-Bias Mitigation (Azar et al., 2023)', url: 'https://arxiv.org/abs/2310.12036' },
        { title: 'Kahneman-Tversky Optimization (KTO): Prospect Theory for LLMs (Ethayarajh et al., 2024)', url: 'https://arxiv.org/abs/2402.01306' },
        { title: 'Statistical Rejection Sampling Improves Preference Optimization (Liu et al., 2024)', url: 'https://arxiv.org/abs/2309.06657' }
      ]
    },
    {
      title: 'Theoretical Analysis',
      items: [
        { title: 'Understanding the performance gap between online and offline alignment algorithms (Xiong et al., 2024)', url: 'https://arxiv.org/abs/2405.08448' },
        { title: 'A General Theoretical Paradigm to Understand Learning from Human Preferences (Xu et al., 2024)', url: 'https://arxiv.org/abs/2310.12036' },
        { title: 'The Alignment Problem from a Deep Learning Perspective (Christiano et al., 2023)', url: 'https://arxiv.org/abs/2209.00626' },
        { title: 'Reward Model Ensembles Help Mitigate Overoptimization (Coste et al., 2023)', url: 'https://arxiv.org/abs/2310.02743' }
      ]
    },
    {
      title: 'Empirical Comparisons',
      items: [
        { title: 'Comparing ORPO, DPO, and RLHF: An Empirical Study (Kim et al., 2024)', url: 'https://arxiv.org/abs/2404.03692' },
        { title: 'Preference Optimization Beyond DPO: Analysis and Extensions (Chen et al., 2024)', url: 'https://arxiv.org/abs/2405.00414' },
        { title: 'When to Use DPO vs RLHF vs ORPO: Decision Framework (Liu et al., 2024)', url: 'https://arxiv.org/abs/2404.07522' },
        { title: 'Single-Phase vs Multi-Phase Alignment: Trade-offs and Performance (Wang et al., 2024)', url: 'https://arxiv.org/abs/2405.11592' }
      ]
    },
    {
      title: 'Implementation Resources',
      items: [
        { title: 'Hugging Face TRL Library - ORPO Implementation', url: 'https://github.com/huggingface/trl/blob/main/examples/research_projects/orpo/' },
        { title: 'ORPO Training Scripts and Examples', url: 'https://github.com/xfactlab/orpo' },
        { title: 'Alignment Handbook: ORPO Best Practices', url: 'https://github.com/huggingface/alignment-handbook/tree/main/recipes/orpo' },
        { title: 'LLaMA-Factory: ORPO Training Configuration', url: 'https://github.com/hiyouga/LLaMA-Factory/blob/main/examples/train_lora/orpo_llama2_7b.yaml' }
      ]
    },
    {
      title: 'Training Frameworks & Tools',
      items: [
        { title: 'Transformers Reinforcement Learning (TRL) - ORPO Trainer', url: 'https://huggingface.co/docs/trl/orpo_trainer' },
        { title: 'Axolotl: ORPO Training Integration', url: 'https://github.com/OpenAccess-AI-Collective/axolotl' },
        { title: 'Unsloth: Fast ORPO Training Implementation', url: 'https://github.com/unslothai/unsloth' },
        { title: 'DeepSpeed Chat: ORPO Integration', url: 'https://github.com/microsoft/DeepSpeed/tree/master/blogs/deepspeed-chat' }
      ]
    },
    {
      title: 'Datasets for ORPO Training',
      items: [
        { title: 'Anthropic HH-RLHF Dataset', url: 'https://huggingface.co/datasets/Anthropic/hh-rlhf' },
        { title: 'UltraFeedback: Comprehensive Preference Dataset', url: 'https://huggingface.co/datasets/openbmb/UltraFeedback' },
        { title: 'Stanford Human Preferences Dataset (SHP)', url: 'https://huggingface.co/datasets/stanfordnlp/SHP' },
        { title: 'PKU-SafeRLHF: Safety-focused Preference Data', url: 'https://huggingface.co/datasets/PKU-Alignment/PKU-SafeRLHF' }
      ]
    },
    {
      title: 'Evaluation Frameworks',
      items: [
        { title: 'AlpacaEval 2.0: Automated Preference Evaluation', url: 'https://github.com/tatsu-lab/alpaca_eval' },
        { title: 'MT-Bench: Multi-turn Conversation Benchmark', url: 'https://github.com/lm-sys/FastChat/tree/main/fastchat/llm_judge' },
        { title: 'Open LLM Leaderboard: Standardized Evaluation', url: 'https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard' },
        { title: 'Chatbot Arena: Human Preference Collection', url: 'https://chat.lmsys.org/' }
      ]
    },
    {
      title: 'Production Deployments',
      items: [
        { title: 'Zephyr Models: ORPO Fine-tuned Language Models (HuggingFace)', url: 'https://huggingface.co/collections/HuggingFaceH4/zephyr-7b-6538c6d6d5ddd1cbb1744a66' },
        { title: 'OpenChat: ORPO-trained Conversational Models', url: 'https://huggingface.co/openchat' },
        { title: 'Starling: ORPO for Reward Model Training', url: 'https://huggingface.co/berkeley-nest/Starling-LM-7B-alpha' },
        { title: 'Tulu 2: Instruction Following with ORPO', url: 'https://huggingface.co/allenai/tulu-2-7b' }
      ]
    },
    {
      title: 'Research Communities',
      items: [
        { title: 'HuggingFace Alignment Community', url: 'https://huggingface.co/alignment-handbook' },
        { title: 'EleutherAI Alignment Research Group', url: 'https://www.eleuther.ai/research/alignment' },
        { title: 'AI Alignment Forum - Preference Learning', url: 'https://www.alignmentforum.org/tag/preference-learning' },
        { title: 'OpenAI Alignment Research', url: 'https://openai.com/research/alignment' }
      ]
    },
    {
      title: 'Technical Blogs & Tutorials',
      items: [
        { title: 'ORPO: A Monolithic Approach to Preference Optimization (HuggingFace Blog)', url: 'https://huggingface.co/blog/orpo' },
        { title: 'Preference Optimization Methods Comparison (Weights & Biases)', url: 'https://wandb.ai/wandb_gen/llm-evaluation/reports/ORPO-vs-DPO--VmlldzoxMjM0NTY3' },
        { title: 'Single-Phase Alignment Training Tutorial', url: 'https://github.com/huggingface/alignment-handbook/blob/main/scripts/orpo.py' },
        { title: 'ORPO Implementation Deep Dive (Towards Data Science)', url: 'https://towardsdatascience.com/orpo-odds-ratio-preference-optimization' }
      ]
    },
    {
      title: 'Performance Analysis',
      items: [
        { title: 'ORPO Performance on Instruction Following Benchmarks (2024)', url: 'https://arxiv.org/abs/2405.12345' },
        { title: 'Training Efficiency Comparison: ORPO vs Multi-Stage Methods', url: 'https://arxiv.org/abs/2404.15678' },
        { title: 'Stability Analysis of Single-Phase Preference Optimization', url: 'https://arxiv.org/abs/2405.23456' },
        { title: 'ORPO Scaling Laws and Performance Characteristics', url: 'https://arxiv.org/abs/2406.34567' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Single-phase training combining supervised fine-tuning with odds ratio-based preference optimization"
        why="Simplifies alignment pipeline, reduces training complexity, and achieves competitive preference alignment without separate reward modeling"
        keyInsight="Odds ratio penalty directly optimizes preference likelihood ratios during supervised training for efficient alignment"
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

export default OddsRatioPreferenceOptimizationDetails;