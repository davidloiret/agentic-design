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

interface InContextLearningDetailsProps {
  selectedTechnique: any;
}

export const InContextLearningDetails: React.FC<InContextLearningDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Select', detail: 'Choose relevant examples for task context' },
      { num: '2', action: 'Format', detail: 'Structure examples with input-output pairs' },
      { num: '3', action: 'Prompt', detail: 'Combine examples with target query' },
      { num: '4', action: 'Infer', detail: 'Model learns pattern from examples' },
      { num: '5', action: 'Generate', detail: 'Apply learned pattern to new input' }
    ],
    example: 'examples + query → model_inference → output'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use diverse, high-quality examples representative of task', icon: '✅' },
    { type: 'do', text: 'Maintain consistent formatting across all examples', icon: '✅' },
    { type: 'do', text: 'Order examples from simple to complex when possible', icon: '✅' },
    { type: 'do', text: 'Include edge cases and boundary conditions', icon: '✅' },
    { type: 'do', text: 'Test with different example counts (1-shot to few-shot)', icon: '✅' },
    { type: 'do', text: 'Use clear separators between examples', icon: '✅' },
    { type: 'dont', text: 'Use contradictory or inconsistent examples', icon: '❌' },
    { type: 'dont', text: 'Overload context with too many examples', icon: '❌' },
    { type: 'dont', text: 'Use biased or non-representative examples', icon: '❌' },
    { type: 'dont', text: 'Mix different task types in same prompt', icon: '❌' },
    { type: 'dont', text: 'Ignore example selection and ordering effects', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Quick adaptation to new tasks needed',
      'Limited or no training data available',
      'Task requires demonstration over description',
      'Rapid prototyping and experimentation',
      'Model needs to understand complex patterns'
    ],
    avoidWhen: [
      'Large amounts of training data available',
      'Task requires extensive domain knowledge',
      'Context window limitations are severe',
      'High precision requirements exceed ICL capability',
      'Consistent performance across variations needed'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Few-Shot Accuracy', measure: 'Performance with K examples' },
    { metric: 'Example Efficiency', measure: 'Performance gain per example' },
    { metric: 'Context Utilization', measure: 'Token usage vs performance' },
    { metric: 'Task Transfer', measure: 'Generalization to unseen inputs' },
    { metric: 'Example Sensitivity', measure: 'Performance variance across example sets' },
    { metric: 'Ordering Robustness', measure: 'Stability across example orders' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Text Classification: Sentiment analysis, topic categorization with labeled examples',
    'Data Extraction: Named entity recognition, information extraction from documents',
    'Format Translation: JSON to XML, structured data transformation',
    'Question Answering: Domain-specific QA with example question-answer pairs',
    'Code Generation: Programming tasks with input-output code examples',
    'Creative Writing: Style transfer, content generation with stylistic examples'
  ];

  const references = [
    {
      title: 'Foundational Papers',
      items: [
        { title: 'Language Models are Few-Shot Learners (Brown et al., 2020)', url: 'https://arxiv.org/abs/2005.14165' },
        { title: 'Learning to Retrieve Prompts for In-Context Learning (Rubin et al., 2021)', url: 'https://arxiv.org/abs/2112.08633' },
        { title: 'What Makes Good In-Context Examples for GPT-3? (Liu et al., 2021)', url: 'https://arxiv.org/abs/2101.06804' },
        { title: 'Calibrate Before Use: Improving Few-Shot Performance (Zhao et al., 2021)', url: 'https://arxiv.org/abs/2102.09690' }
      ]
    },
    {
      title: 'Theoretical Understanding (2022-2024)',
      items: [
        { title: 'Why Can GPT Learn In-Context? Language Models Secretly Perform Gradient Descent (Dai et al., 2022)', url: 'https://arxiv.org/abs/2212.10559' },
        { title: 'Transformers Learn In-Context by Gradient Descent (von Oswald et al., 2022)', url: 'https://arxiv.org/abs/2212.07677' },
        { title: 'In-context Learning and Induction Heads (Olsson et al., 2022)', url: 'https://arxiv.org/abs/2209.11895' },
        { title: 'What learning algorithm is in-context learning? Investigations with linear models (Akyürek et al., 2022)', url: 'https://arxiv.org/abs/2211.15661' }
      ]
    },
    {
      title: 'Example Selection & Optimization',
      items: [
        { title: 'Learning To Retrieve Prompts for In-Context Learning (Rubin et al., 2021)', url: 'https://arxiv.org/abs/2112.08633' },
        { title: 'In-Context Example Selection with Influences (Nguyen & Wong, 2023)', url: 'https://arxiv.org/abs/2302.11042' },
        { title: 'Active Example Selection for In-Context Learning (Zhang et al., 2022)', url: 'https://arxiv.org/abs/2211.04486' },
        { title: 'Compositional Exemplars for In-context Learning (Ye et al., 2023)', url: 'https://arxiv.org/abs/2302.05698' }
      ]
    },
    {
      title: 'Chain-of-Thought & Reasoning',
      items: [
        { title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2022)', url: 'https://arxiv.org/abs/2201.11903' },
        { title: 'Least-to-Most Prompting Enables Complex Reasoning in Large Language Models (Zhou et al., 2022)', url: 'https://arxiv.org/abs/2205.10625' },
        { title: 'Self-Consistency Improves Chain of Thought Reasoning in Language Models (Wang et al., 2022)', url: 'https://arxiv.org/abs/2203.11171' },
        { title: 'Large Language Models are Zero-Shot Reasoners (Kojima et al., 2022)', url: 'https://arxiv.org/abs/2205.11916' }
      ]
    },
    {
      title: 'Recent Advances (2023-2024)',
      items: [
        { title: 'In-Context Learning Creates Task Vectors (Hendel et al., 2023)', url: 'https://arxiv.org/abs/2310.15916' },
        { title: 'Many-Shot In-Context Learning (Agarwal et al., 2024)', url: 'https://arxiv.org/abs/2404.11018' },
        { title: 'In-Context Learning with Long Context (Bertsch et al., 2024)', url: 'https://arxiv.org/abs/2404.02060' },
        { title: 'Understanding In-Context Learning via Supportive Pretraining Data (Shin et al., 2024)', url: 'https://arxiv.org/abs/2306.15091' }
      ]
    },
    {
      title: 'Multimodal In-Context Learning',
      items: [
        { title: 'Flamingo: a Visual Language Model for Few-Shot Learning (Alayrac et al., 2022)', url: 'https://arxiv.org/abs/2204.14198' },
        { title: 'Multimodal Few-Shot Learning with Frozen Language Models (Tsimpoukelli et al., 2021)', url: 'https://arxiv.org/abs/2106.13884' },
        { title: 'GPT-4V(ision) System Card (OpenAI, 2023)', url: 'https://openai.com/research/gpt-4v-system-card' },
        { title: 'Visual In-Context Learning for Large Vision-Language Models (Yang et al., 2023)', url: 'https://arxiv.org/abs/2402.11574' }
      ]
    },
    {
      title: 'Implementation Resources',
      items: [
        { title: 'LangChain Few-Shot Prompt Templates', url: 'https://python.langchain.com/docs/modules/model_io/prompts/few_shot_examples' },
        { title: 'OpenAI Best Practices for Prompt Engineering', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
        { title: 'Anthropic Prompt Engineering Guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
        { title: 'HuggingFace Transformers In-Context Learning', url: 'https://huggingface.co/docs/transformers/tasks/prompting' }
      ]
    },
    {
      title: 'Datasets & Benchmarks',
      items: [
        { title: 'LAMA: LAnguage Model Analysis (Petroni et al., 2019)', url: 'https://github.com/facebookresearch/LAMA' },
        { title: 'BIG-bench: Beyond the Imitation Game Benchmark', url: 'https://github.com/google/BIG-bench' },
        { title: 'HELM: Holistic Evaluation of Language Models', url: 'https://crfm.stanford.edu/helm/' },
        { title: 'SuperGLUE: A Stickier Benchmark for General-Purpose Language Understanding', url: 'https://super.gluebenchmark.com/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Guidance: A guidance language for controlling large language models', url: 'https://github.com/guidance-ai/guidance' },
        { title: 'DSPy: Programming—not prompting—foundation models', url: 'https://github.com/stanfordnlp/dspy' },
        { title: 'PromptSource: An Integrated Development Environment for Natural Language Prompts', url: 'https://github.com/bigscience-workshop/promptsource' },
        { title: 'OpenPrompt: An Open-Source Framework for Prompt-learning', url: 'https://github.com/thunlp/OpenPrompt' }
      ]
    },
    {
      title: 'Analysis & Evaluation',
      items: [
        { title: 'Measuring and Narrowing the Compositionality Gap in Language Models (Press et al., 2022)', url: 'https://arxiv.org/abs/2210.03350' },
        { title: 'Rethinking the Role of Demonstrations: What Makes In-Context Learning Work? (Min et al., 2022)', url: 'https://arxiv.org/abs/2202.12837' },
        { title: 'Ground-Truth Labels Matter: A Deeper Look into Input-Label Demonstrations (Yoo et al., 2022)', url: 'https://arxiv.org/abs/2205.12685' },
        { title: 'Fantastically Ordered Prompts and Where to Find Them (Lu et al., 2021)', url: 'https://arxiv.org/abs/2104.08786' }
      ]
    },
    {
      title: 'Community & Discussion',
      items: [
        { title: 'r/MachineLearning - In-Context Learning Discussions', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'AI Alignment Forum - In-Context Learning', url: 'https://www.alignmentforum.org/tag/in-context-learning' },
        { title: 'EleutherAI Discord - Prompt Engineering Channel', url: 'https://discord.gg/eleutherai' },
        { title: 'Prompt Engineering Discord Community', url: 'https://discord.gg/promptengineering' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Provide task examples in prompt to enable model learning without parameter updates"
        why="Enables rapid task adaptation, requires no training, leverages model's pattern recognition for immediate performance"
        keyInsight="Models can learn from demonstrations in context, performing implicit gradient descent during inference"
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

export default InContextLearningDetails;