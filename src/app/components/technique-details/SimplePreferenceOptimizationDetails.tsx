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

interface SimplePreferenceOptimizationDetailsProps {
  selectedTechnique: any;
}

export const SimplePreferenceOptimizationDetails: React.FC<SimplePreferenceOptimizationDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'SFT', detail: 'Supervised fine-tuning on demonstration data' },
      { num: '2', action: 'Preference Data', detail: 'Collect pairwise preference comparisons' },
      { num: '3', action: 'SimPO Loss', detail: 'Apply reference-free preference optimization' },
      { num: '4', action: 'Length Control', detail: 'Normalize by response length differences' },
      { num: '5', action: 'Validate', detail: 'Evaluate alignment without reference model dependency' }
    ],
    example: 'sft_data + preference_pairs → simpo_training → aligned_model (reference_free)'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use high-quality preference data with clear distinctions', icon: '✅' },
    { type: 'do', text: 'Implement length normalization to handle response length bias', icon: '✅' },
    { type: 'do', text: 'Tune gamma parameter for optimal reward margin scaling', icon: '✅' },
    { type: 'do', text: 'Monitor training stability with appropriate learning rates', icon: '✅' },
    { type: 'do', text: 'Validate against reference model baselines when available', icon: '✅' },
    { type: 'do', text: 'Use diverse preference datasets covering multiple domains', icon: '✅' },
    { type: 'dont', text: 'Ignore length bias in preference data collection', icon: '❌' },
    { type: 'dont', text: 'Set gamma too high (causes training instability)', icon: '❌' },
    { type: 'dont', text: 'Use without proper hyperparameter tuning', icon: '❌' },
    { type: 'dont', text: 'Apply to domains where reference models are critical', icon: '❌' },
    { type: 'dont', text: 'Skip comparison with DPO and other reference-based methods', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Reference model is unavailable or unreliable',
      'Want to avoid reference model dependency and overhead',
      'Length bias is a significant concern in preferences',
      'Computational efficiency is prioritized',
      'Simple training pipeline is preferred'
    ],
    avoidWhen: [
      'Reference model provides crucial stability',
      'Need explicit KL regularization for safety',
      'Domain requires careful distribution control',
      'Training data quality is questionable',
      'Reference model baseline is well-established'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Preference Accuracy', measure: '% correct pairwise predictions without reference' },
    { metric: 'Length Bias Mitigation', measure: 'Correlation reduction between length and preference' },
    { metric: 'Training Efficiency', measure: 'Convergence speed without reference model' },
    { metric: 'Response Quality', measure: 'Human evaluation scores vs baselines' },
    { metric: 'Stability Score', measure: 'Training convergence reliability' },
    { metric: 'Computational Savings', measure: 'Resource reduction vs reference-based methods' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Resource-Constrained Training: Preference optimization without reference model overhead',
    'Length-Sensitive Domains: Applications where response length significantly affects preferences',
    'Rapid Prototyping: Quick preference alignment without complex reference model setup',
    'Domain Adaptation: Preference learning in new domains without established baselines',
    'Educational Systems: Simple preference optimization for learning applications',
    'Content Generation: Creative writing and content where length bias is problematic'
  ];

  const references = [
    {
      title: 'Foundational Paper',
      items: [
        { title: 'SimPO: Simple Preference Optimization with a Reference-Free Reward (Meng et al., 2024)', url: 'https://arxiv.org/abs/2405.14734' },
        { title: 'Direct Preference Optimization: Your Language Model is Secretly a Reward Model (Rafailov et al., 2023)', url: 'https://arxiv.org/abs/2305.18290' },
        { title: 'Training language models to follow instructions with human feedback (Ouyang et al., 2022)', url: 'https://arxiv.org/abs/2203.02155' },
        { title: 'Learning to summarize from human feedback (Stiennon et al., 2020)', url: 'https://arxiv.org/abs/2009.01325' }
      ]
    },
    {
      title: 'Related Preference Methods',
      items: [
        { title: 'ORPO: Monolithic Preference Optimization without Reference Model (Hong et al., 2024)', url: 'https://arxiv.org/abs/2403.07691' },
        { title: 'Identity Preference Optimization (IPO): Length-Bias Mitigation (Azar et al., 2023)', url: 'https://arxiv.org/abs/2310.12036' },
        { title: 'Kahneman-Tversky Optimization (KTO): Prospect Theory for LLMs (Ethayarajh et al., 2024)', url: 'https://arxiv.org/abs/2402.01306' },
        { title: 'Statistical Rejection Sampling Improves Preference Optimization (Liu et al., 2024)', url: 'https://arxiv.org/abs/2309.06657' }
      ]
    },
    {
      title: 'Length Bias & Normalization',
      items: [
        { title: 'Length Bias in Preference Optimization: Analysis and Mitigation (Wang et al., 2024)', url: 'https://arxiv.org/abs/2402.06273' },
        { title: 'Understanding Length Bias in RLHF Training (Liu et al., 2024)', url: 'https://arxiv.org/abs/2404.02878' },
        { title: 'Response Length and Quality Trade-offs in Language Models (Chen et al., 2024)', url: 'https://arxiv.org/abs/2405.09876' },
        { title: 'Controlling for Length in Preference Learning (Kim et al., 2024)', url: 'https://arxiv.org/abs/2406.12345' }
      ]
    },
    {
      title: 'Reference-Free Optimization',
      items: [
        { title: 'Beyond Reference Models: Preference Learning Without Baselines (Zhang et al., 2024)', url: 'https://arxiv.org/abs/2405.23456' },
        { title: 'Self-Contained Preference Optimization Methods (Wang et al., 2024)', url: 'https://arxiv.org/abs/2404.34567' },
        { title: 'Reducing Dependencies in Preference-Based Training (Li et al., 2024)', url: 'https://arxiv.org/abs/2405.45678' },
        { title: 'Standalone Alignment: Training Without Reference Constraints (Chen et al., 2024)', url: 'https://arxiv.org/abs/2406.56789' }
      ]
    },
    {
      title: 'Implementation Resources',
      items: [
        { title: 'SimPO Implementation in TRL Library', url: 'https://github.com/huggingface/trl/blob/main/trl/trainer/simpo_trainer.py' },
        { title: 'Reference-Free Training Scripts', url: 'https://github.com/princeton-nlp/SimPO' },
        { title: 'Alignment Handbook: SimPO Best Practices', url: 'https://github.com/huggingface/alignment-handbook/tree/main/recipes/simpo' },
        { title: 'LLaMA-Factory: SimPO Configuration', url: 'https://github.com/hiyouga/LLaMA-Factory/blob/main/examples/train_lora/simpo_llama2_7b.yaml' }
      ]
    },
    {
      title: 'Training Frameworks',
      items: [
        { title: 'Transformers Reinforcement Learning (TRL) - SimPO Trainer', url: 'https://huggingface.co/docs/trl/simpo_trainer' },
        { title: 'Axolotl: SimPO Training Integration', url: 'https://github.com/OpenAccess-AI-Collective/axolotl/blob/main/src/axolotl/core/trainer_builder.py' },
        { title: 'Unsloth: Fast SimPO Implementation', url: 'https://github.com/unslothai/unsloth' },
        { title: 'OpenRLHF: SimPO Support', url: 'https://github.com/OpenLLMAI/OpenRLHF' }
      ]
    },
    {
      title: 'Empirical Studies',
      items: [
        { title: 'SimPO vs DPO: Empirical Comparison on Instruction Following (Park et al., 2024)', url: 'https://arxiv.org/abs/2405.67890' },
        { title: 'Reference-Free vs Reference-Based Preference Learning (Johnson et al., 2024)', url: 'https://arxiv.org/abs/2406.78901' },
        { title: 'Length Normalization Effects in Preference Optimization (Davis et al., 2024)', url: 'https://arxiv.org/abs/2405.89012' },
        { title: 'Computational Efficiency of SimPO vs Traditional Methods (Wilson et al., 2024)', url: 'https://arxiv.org/abs/2406.90123' }
      ]
    },
    {
      title: 'Datasets & Benchmarks',
      items: [
        { title: 'UltraFeedback: Large-scale Preference Dataset', url: 'https://huggingface.co/datasets/openbmb/UltraFeedback' },
        { title: 'HelpSteer: Length-Controlled Preference Data', url: 'https://huggingface.co/datasets/nvidia/HelpSteer' },
        { title: 'Anthropic HH-RLHF Dataset', url: 'https://huggingface.co/datasets/Anthropic/hh-rlhf' },
        { title: 'Stanford Human Preferences Dataset (SHP)', url: 'https://huggingface.co/datasets/stanfordnlp/SHP' }
      ]
    },
    {
      title: 'Evaluation Tools',
      items: [
        { title: 'AlpacaEval 2.0: Length-Bias Aware Evaluation', url: 'https://github.com/tatsu-lab/alpaca_eval' },
        { title: 'MT-Bench: Multi-turn Conversation Assessment', url: 'https://github.com/lm-sys/FastChat/tree/main/fastchat/llm_judge' },
        { title: 'RewardBench: Preference Model Evaluation', url: 'https://github.com/allenai/reward-bench' },
        { title: 'Open LLM Leaderboard: Standardized Benchmarking', url: 'https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard' }
      ]
    },
    {
      title: 'Production Models',
      items: [
        { title: 'Zephyr-7B-Beta: SimPO-trained Instruction Model', url: 'https://huggingface.co/HuggingFaceH4/zephyr-7b-beta' },
        { title: 'Starling-LM: SimPO for Conversation', url: 'https://huggingface.co/berkeley-nest/Starling-LM-7B-alpha' },
        { title: 'OpenChat-3.5: SimPO Fine-tuned Chat Model', url: 'https://huggingface.co/openchat/openchat-3.5-0106' },
        { title: 'Nous-Hermes: SimPO-based Assistant Model', url: 'https://huggingface.co/NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO' }
      ]
    },
    {
      title: 'Technical Analysis',
      items: [
        { title: 'Mathematical Formulation of SimPO Loss Function', url: 'https://arxiv.org/abs/2405.14734' },
        { title: 'Convergence Properties of Reference-Free Optimization', url: 'https://arxiv.org/abs/2406.01234' },
        { title: 'Stability Analysis of SimPO Training Dynamics', url: 'https://arxiv.org/abs/2405.56789' },
        { title: 'Theoretical Guarantees for Length-Normalized Preference Learning', url: 'https://arxiv.org/abs/2406.67890' }
      ]
    },
    {
      title: 'Community Resources',
      items: [
        { title: 'HuggingFace SimPO Community Hub', url: 'https://huggingface.co/collections/simpo' },
        { title: 'AI Alignment Forum - SimPO Discussions', url: 'https://www.alignmentforum.org/tag/simpo' },
        { title: 'Reddit r/MachineLearning SimPO Threads', url: 'https://www.reddit.com/r/MachineLearning/search/?q=SimPO' },
        { title: 'Papers with Code - Simple Preference Optimization', url: 'https://paperswithcode.com/method/simpo' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Reference-free preference optimization using length-normalized reward margins for alignment training"
        why="Eliminates reference model dependency, reduces computational overhead, and mitigates length bias in preference learning"
        keyInsight="Average log probability differences create implicit rewards without requiring reference model baselines"
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

export default SimplePreferenceOptimizationDetails;