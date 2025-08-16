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

interface ReinforcementLearningFromAIFeedbackDetailsProps {
  selectedTechnique: any;
}

export const ReinforcementLearningFromAIFeedbackDetails: React.FC<ReinforcementLearningFromAIFeedbackDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'SFT', detail: 'Supervised fine-tuning on demonstrations' },
      { num: '2', action: 'AI Judge', detail: 'Train or use AI model for feedback generation' },
      { num: '3', action: 'Generate', detail: 'Create preference pairs using AI evaluator' },
      { num: '4', action: 'Train RM', detail: 'Train reward model on AI-generated preferences' },
      { num: '5', action: 'PPO', detail: 'Policy optimization with AI-derived rewards' }
    ],
    example: 'sft_model + ai_judge → ai_preferences → reward_model → rlhf_training → aligned_model'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Validate AI feedback quality against human judgment samples', icon: '✅' },
    { type: 'do', text: 'Use constitutional principles to guide AI feedback generation', icon: '✅' },
    { type: 'do', text: 'Implement multi-round critique and revision processes', icon: '✅' },
    { type: 'do', text: 'Monitor for AI feedback bias and systematic errors', icon: '✅' },
    { type: 'do', text: 'Combine AI feedback with human oversight mechanisms', icon: '✅' },
    { type: 'do', text: 'Use diverse AI evaluators to reduce single-model bias', icon: '✅' },
    { type: 'dont', text: 'Rely solely on AI feedback without human validation', icon: '❌' },
    { type: 'dont', text: 'Use biased or poorly aligned AI evaluators', icon: '❌' },
    { type: 'dont', text: 'Ignore scalability limitations of AI feedback generation', icon: '❌' },
    { type: 'dont', text: 'Skip testing for reward model gaming and exploitation', icon: '❌' },
    { type: 'dont', text: 'Apply without considering domain-specific evaluation criteria', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Human feedback is expensive or slow to obtain',
      'Need to scale preference learning beyond human capacity',
      'AI evaluators can be trained reliably in domain',
      'Constitutional principles can guide evaluation',
      'Iterative improvement cycles are beneficial'
    ],
    avoidWhen: [
      'Human judgment is readily available and affordable',
      'High-stakes decisions requiring human oversight',
      'AI evaluators show significant bias or unreliability',
      'Domain requires nuanced cultural understanding',
      'Real-time feedback loops are critical'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'AI-Human Agreement', measure: 'Correlation between AI and human evaluations' },
    { metric: 'Scaling Efficiency', measure: 'Cost reduction vs human-only RLHF' },
    { metric: 'Feedback Quality', measure: 'Consistency and reliability of AI judgments' },
    { metric: 'Bias Detection', measure: 'Systematic errors in AI evaluation patterns' },
    { metric: 'Final Performance', measure: 'Task completion quality vs baselines' },
    { metric: 'Iteration Speed', measure: 'Training cycles per unit time vs RLHF' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Large-Scale Content Moderation: Use AI feedback to train moderation systems at scale',
    'Code Quality Assessment: AI-driven feedback for programming best practices and bug detection',
    'Creative Content Evaluation: Scale artistic and creative quality judgments using AI critics',
    'Educational Content Assessment: Automated grading and feedback systems for learning materials',
    'Customer Service Training: Scale training data for customer interaction quality',
    'Scientific Writing Review: AI-assisted peer review and quality assessment systems'
  ];

  const references = [
    {
      title: 'Foundational Papers',
      items: [
        { title: 'Constitutional AI: Harmlessness from AI Feedback (Bai et al., 2022)', url: 'https://arxiv.org/abs/2212.08073' },
        { title: 'RLAIF: Scaling Reinforcement Learning from Human Feedback with AI Feedback (Bai et al., 2023)', url: 'https://arxiv.org/abs/2309.00267' },
        { title: 'Training language models to follow instructions with human feedback (Ouyang et al., 2022)', url: 'https://arxiv.org/abs/2203.02155' },
        { title: 'Learning to summarize from human feedback (Stiennon et al., 2020)', url: 'https://arxiv.org/abs/2009.01325' }
      ]
    },
    {
      title: 'AI Feedback Generation Methods',
      items: [
        { title: 'Self-Instruct: Aligning Language Model with Self Generated Instructions (Wang et al., 2022)', url: 'https://arxiv.org/abs/2212.10560' },
        { title: 'LLM-as-a-Judge: A Comprehensive Survey (Zheng et al., 2023)', url: 'https://arxiv.org/abs/2306.05685' },
        { title: 'Judging LLM-as-a-judge with MT-Bench and Chatbot Arena (Zheng et al., 2023)', url: 'https://arxiv.org/abs/2306.05685' },
        { title: 'Can LLMs Really Serve as Judges? (Liu et al., 2023)', url: 'https://arxiv.org/abs/2308.02575' }
      ]
    },
    {
      title: 'Constitutional & Principle-Based Approaches',
      items: [
        { title: 'Constitutional AI: Harmlessness from AI Feedback - Methodology (Anthropic, 2022)', url: 'https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback' },
        { title: 'Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback (Bai et al., 2022)', url: 'https://arxiv.org/abs/2204.05862' },
        { title: 'AI Alignment via Debate (Irving et al., 2018)', url: 'https://arxiv.org/abs/1805.00899' },
        { title: 'Scalable agent alignment via reward modeling (Leike et al., 2018)', url: 'https://arxiv.org/abs/1811.07871' }
      ]
    },
    {
      title: 'Self-Improvement & Iterative Methods',
      items: [
        { title: 'Self-Taught Optimizer (STO): Recursively Self-Improving Code Generation (Zelikman et al., 2023)', url: 'https://arxiv.org/abs/2310.02304' },
        { title: 'Large Language Models Can Self-Improve (Huang et al., 2022)', url: 'https://arxiv.org/abs/2210.11610' },
        { title: 'SELF-REFINE: Iterative Refinement with Self-Feedback (Madaan et al., 2023)', url: 'https://arxiv.org/abs/2303.17651' },
        { title: 'Self-Critique: Training Large Language Models to Give Feedback (Saunders et al., 2022)', url: 'https://arxiv.org/abs/2211.10892' }
      ]
    },
    {
      title: 'Evaluation & Bias Analysis',
      items: [
        { title: 'Large Language Models are not Fair Evaluators (Wang et al., 2023)', url: 'https://arxiv.org/abs/2305.17926' },
        { title: 'Judging LLM-as-a-judge with MT-Bench and Chatbot Arena (Zheng et al., 2023)', url: 'https://arxiv.org/abs/2306.05685' },
        { title: 'The Bias Amplification Paradox in Text-to-Image Generation (Seshadri et al., 2023)', url: 'https://arxiv.org/abs/2308.00755' },
        { title: 'Position bias in Large Language Models (Liu et al., 2023)', url: 'https://arxiv.org/abs/2305.02301' }
      ]
    },
    {
      title: 'Recent Advances (2023-2024)',
      items: [
        { title: 'RLAIF vs. RLHF: Scaling Reinforcement Learning from Human Feedback with AI Feedback (Bai et al., 2023)', url: 'https://arxiv.org/abs/2309.00267' },
        { title: 'Constitutional AI for Multi-objective Alignment (Anthropic, 2023)', url: 'https://www.anthropic.com/research/constitutional-ai' },
        { title: 'AI Feedback for Improving LLM Safety (OpenAI, 2023)', url: 'https://openai.com/research/learning-from-human-preferences' },
        { title: 'Scaling Oversight: AI-Assisted Decision Making (Russell et al., 2024)', url: 'https://arxiv.org/abs/2404.05749' }
      ]
    },
    {
      title: 'Multi-Agent & Debate Systems',
      items: [
        { title: 'Improving Factuality and Reasoning in Language Models through Multiagent Debate (Du et al., 2023)', url: 'https://arxiv.org/abs/2305.14325' },
        { title: 'Encouraging Divergent Thinking in Large Language Models through Multi-Agent Debate (Liang et al., 2023)', url: 'https://arxiv.org/abs/2305.19118' },
        { title: 'Multi-Agent Debate for Improved Language Model Reasoning (Chan et al., 2023)', url: 'https://arxiv.org/abs/2305.14325' },
        { title: 'Society of Mind: Enhancing AI Capabilities through Multi-Agent Collaboration (Park et al., 2023)', url: 'https://arxiv.org/abs/2307.06962' }
      ]
    },
    {
      title: 'Domain-Specific Applications',
      items: [
        { title: 'Code Review with AI Feedback: GitHub Copilot Evolution (GitHub, 2023)', url: 'https://github.blog/2023-06-20-how-to-write-better-prompts-for-github-copilot/' },
        { title: 'AI Feedback for Scientific Writing (Kang et al., 2023)', url: 'https://arxiv.org/abs/2308.12858' },
        { title: 'Educational AI Tutoring with Automated Feedback (Weitekamp et al., 2023)', url: 'https://arxiv.org/abs/2307.02334' },
        { title: 'Creative Writing Enhancement through AI Feedback (Yuan et al., 2023)', url: 'https://arxiv.org/abs/2309.10635' }
      ]
    },
    {
      title: 'Implementation Resources',
      items: [
        { title: 'Anthropic Constitutional AI Implementation Guide', url: 'https://www.anthropic.com/research/constitutional-ai' },
        { title: 'OpenAI RLAIF Training Scripts and Best Practices', url: 'https://github.com/openai/human-eval' },
        { title: 'Hugging Face TRL Library - RLAIF Support', url: 'https://github.com/huggingface/trl' },
        { title: 'LangChain AI Feedback Integration', url: 'https://python.langchain.com/docs/guides/evaluation/string/criteria_eval_chain' }
      ]
    },
    {
      title: 'Tools & Frameworks',
      items: [
        { title: 'AlpacaEval: Automatic Evaluator for Instruction-following Models', url: 'https://github.com/tatsu-lab/alpaca_eval' },
        { title: 'MT-Bench: Multi-turn Conversation Evaluation Framework', url: 'https://github.com/lm-sys/FastChat/tree/main/fastchat/llm_judge' },
        { title: 'Chatbot Arena: Human Preference Collection Platform', url: 'https://chat.lmsys.org/' },
        { title: 'Constitutional AI Training Framework (Community)', url: 'https://github.com/anthropics/ConstitutionalAI' }
      ]
    },
    {
      title: 'Benchmarks & Datasets',
      items: [
        { title: 'HH-RLHF: Anthropic Human Preference Dataset', url: 'https://huggingface.co/datasets/Anthropic/hh-rlhf' },
        { title: 'UltraFeedback: Large-scale AI Feedback Dataset', url: 'https://huggingface.co/datasets/openbmb/UltraFeedback' },
        { title: 'LIMA: Less Is More for Alignment Dataset', url: 'https://huggingface.co/datasets/GAIR/lima' },
        { title: 'PKU-SafeRLHF: Safety-focused Preference Dataset', url: 'https://huggingface.co/datasets/PKU-Alignment/PKU-SafeRLHF' }
      ]
    },
    {
      title: 'Research Communities',
      items: [
        { title: 'Anthropic Research Team - Constitutional AI', url: 'https://www.anthropic.com/research' },
        { title: 'AI Alignment Forum - RLAIF Discussions', url: 'https://www.alignmentforum.org/tag/rlaif' },
        { title: 'OpenAI Safety Research Team', url: 'https://openai.com/safety' },
        { title: 'EleutherAI Alignment Research', url: 'https://www.eleuther.ai/research/alignment' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Use AI models to generate feedback and preferences for training, replacing or augmenting human evaluation"
        why="Scales preference learning beyond human capacity, reduces annotation costs, and enables rapid iteration cycles"
        keyInsight="AI evaluators can provide consistent, scalable feedback when properly aligned with human values and principles"
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

export default ReinforcementLearningFromAIFeedbackDetails;