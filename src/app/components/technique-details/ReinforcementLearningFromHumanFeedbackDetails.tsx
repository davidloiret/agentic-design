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

interface ReinforcementLearningFromHumanFeedbackDetailsProps {
  selectedTechnique: any;
}

export const ReinforcementLearningFromHumanFeedbackDetails: React.FC<ReinforcementLearningFromHumanFeedbackDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'SFT', detail: 'Supervised fine-tuning on demonstrations' },
      { num: '2', action: 'Collect', detail: 'Human preference comparisons' },
      { num: '3', action: 'Train RM', detail: 'Reward model on preferences' },
      { num: '4', action: 'PPO', detail: 'Policy optimization with RM rewards' },
      { num: '5', action: 'Evaluate', detail: 'Human preference win rates' }
    ],
    example: 'base_model → sft_model → preference_data → reward_model → aligned_model'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use diverse, high-quality human preference data', icon: '✅' },
    { type: 'do', text: 'Apply KL regularization to prevent policy drift', icon: '✅' },
    { type: 'do', text: 'Monitor reward hacking and Goodhart\'s law effects', icon: '✅' },
    { type: 'do', text: 'Use multiple evaluation metrics beyond reward scores', icon: '✅' },
    { type: 'do', text: 'Implement careful hyperparameter tuning for PPO', icon: '✅' },
    { type: 'do', text: 'Validate reward model correlation with human judgments', icon: '✅' },
    { type: 'dont', text: 'Skip reward model validation on held-out data', icon: '❌' },
    { type: 'dont', text: 'Use biased or low-quality preference annotations', icon: '❌' },
    { type: 'dont', text: 'Ignore distribution shift in deployment', icon: '❌' },
    { type: 'dont', text: 'Optimize purely for reward model scores', icon: '❌' },
    { type: 'dont', text: 'Use unstable RL training without safety measures', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Human preference alignment crucial',
      'Safety and helpfulness requirements',
      'Complex subjective quality judgments',
      'Large-scale deployment with user interaction',
      'Need for controllable AI behavior'
    ],
    avoidWhen: [
      'Simple objective tasks with clear metrics',
      'Limited human annotation budget',
      'Real-time inference requirements',
      'Tasks with well-defined ground truth',
      'Small-scale or research-only applications'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Human Preference Win Rate', measure: '% preferred over baseline' },
    { metric: 'Reward Model Accuracy', measure: 'Agreement with human labels' },
    { metric: 'KL Divergence', measure: 'Policy drift from reference model' },
    { metric: 'Helpfulness Score', measure: 'Task completion quality' },
    { metric: 'Harmlessness Rate', measure: '% safe responses' },
    { metric: 'PPO Training Stability', measure: 'Reward curve convergence' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Conversational AI: Align chatbots for helpful, harmless, honest responses',
    'Content Generation: Optimize creative writing for human preferences',
    'Code Assistants: Improve code quality and safety recommendations', 
    'Summarization: Generate summaries matching human quality judgments',
    'Question Answering: Provide accurate, well-formatted answers',
    'Creative Tools: Align AI art/music generation with aesthetic preferences'
  ];

  const references = [
    {
      title: 'Foundational Papers',
      items: [
        { title: 'Training language models to follow instructions with human feedback (Ouyang et al., 2022)', url: 'https://arxiv.org/abs/2203.02155' },
        { title: 'Learning to summarize from human feedback (Stiennon et al., 2020)', url: 'https://arxiv.org/abs/2009.01325' },
        { title: 'Constitutional AI: Harmlessness from AI Feedback (Bai et al., 2022)', url: 'https://arxiv.org/abs/2212.08073' },
        { title: 'Proximal Policy Optimization Algorithms (Schulman et al., 2017)', url: 'https://arxiv.org/abs/1707.06347' }
      ]
    },
    {
      title: 'Recent Advances (2023-2024)',
      items: [
        { title: 'RLHF: Scaling Reinforcement Learning from Human Feedback with AI Feedback (Bai et al., 2023)', url: 'https://arxiv.org/abs/2309.00267' },
        { title: 'Direct Preference Optimization: Your Language Model is Secretly a Reward Model (Rafailov et al., 2023)', url: 'https://arxiv.org/abs/2305.18290' },
        { title: 'Statistical Rejection Sampling Improves Preference Optimization (Liu et al., 2024)', url: 'https://arxiv.org/abs/2309.06657' },
        { title: 'Secrets of RLHF in Large Language Models (Zheng et al., 2024)', url: 'https://arxiv.org/abs/2307.04964' }
      ]
    },
    {
      title: 'Implementation Resources',
      items: [
        { title: 'Hugging Face TRL Library - RLHF Implementation', url: 'https://github.com/huggingface/trl' },
        { title: 'OpenAI RLHF Training Guide', url: 'https://openai.com/research/learning-from-human-preferences' },
        { title: 'Anthropic Constitutional AI Implementation', url: 'https://www.anthropic.com/constitutional-ai' },
        { title: 'DeepSpeed Chat - RLHF Training Framework', url: 'https://github.com/microsoft/DeepSpeed/tree/master/blogs/deepspeed-chat' }
      ]
    },
    {
      title: 'Industry Applications',
      items: [
        { title: 'ChatGPT Technical Report (OpenAI, 2023)', url: 'https://openai.com/research/instruction-following' },
        { title: 'LLaMA 2: Open Foundation and Fine-Tuned Chat Models (Touvron et al., 2023)', url: 'https://arxiv.org/abs/2307.09288' },
        { title: 'Claude 2 Technical Report (Anthropic, 2023)', url: 'https://www.anthropic.com/claude-2' },
        { title: 'Sparrow: Training helpful and harmless assistants (DeepMind, 2022)', url: 'https://arxiv.org/abs/2209.14375' }
      ]
    },
    {
      title: 'Evaluation & Safety',
      items: [
        { title: 'Red Teaming Language Models to Reduce Harms (Ganguli et al., 2022)', url: 'https://arxiv.org/abs/2209.07858' },
        { title: 'Constitutional AI Evaluation Methods (Anthropic, 2023)', url: 'https://arxiv.org/abs/2212.08073' },
        { title: 'Measuring Progress on Scalable Oversight for Large Language Models (OpenAI, 2022)', url: 'https://openai.com/research/measuring-progress-on-scalable-oversight' },
        { title: 'AI Alignment Forum - RLHF Discussion', url: 'https://www.alignmentforum.org/tag/rlhf' }
      ]
    },
    {
      title: 'Datasets & Benchmarks',
      items: [
        { title: 'Anthropic HH-RLHF Dataset', url: 'https://github.com/anthropics/hh-rlhf' },
        { title: 'OpenAI Human Preference Dataset', url: 'https://github.com/openai/summarize-from-feedback' },
        { title: 'Stanford Human Preferences Dataset (SHP)', url: 'https://huggingface.co/datasets/stanfordnlp/SHP' },
        { title: 'UltraFeedback: Large-scale Preference Dataset', url: 'https://huggingface.co/datasets/openbmb/UltraFeedback' }
      ]
    },
    {
      title: 'Tools & Frameworks',
      items: [
        { title: 'Transformers Reinforcement Learning (TRL)', url: 'https://huggingface.co/docs/trl/index' },
        { title: 'OpenRL: Distributed Reinforcement Learning Framework', url: 'https://github.com/OpenRL-Lab/openrl' },
        { title: 'RLHF Implementation in JAX', url: 'https://github.com/Sea-Snell/JAXSeq' },
        { title: 'RLHF Training with DeepSpeed', url: 'https://github.com/microsoft/DeepSpeedExamples/tree/master/applications/DeepSpeed-Chat' }
      ]
    },
    {
      title: 'Community & Discussion',
      items: [
        { title: 'RLHF Community Discord', url: 'https://discord.gg/rlhf' },
        { title: 'Alignment Research Center', url: 'https://alignment.org/' },
        { title: 'ML Safety Newsletter - RLHF Updates', url: 'https://newsletter.mlsafety.org/' },
        { title: 'EleutherAI RLHF Research Group', url: 'https://www.eleuther.ai/research/rlhf' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Three-phase training: SFT → Reward Model → PPO optimization with human preference alignment"
        why="Aligns AI behavior with human values, improves safety, helpfulness, and reduces harmful outputs"
        keyInsight="Human preferences > reward model > policy optimization creates scalable alignment mechanism"
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

export default ReinforcementLearningFromHumanFeedbackDetails;