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

interface SupervisedLearningAdaptationDetailsProps {
  selectedTechnique: any;
}

export const SupervisedLearningAdaptationDetails: React.FC<SupervisedLearningAdaptationDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Collect', detail: 'Gather task-specific labeled training examples' },
      { num: '2', action: 'Preprocess', detail: 'Format data for target domain and task requirements' },
      { num: '3', action: 'Fine-tune', detail: 'Adapt pre-trained model with supervised objectives' },
      { num: '4', action: 'Validate', detail: 'Test performance on held-out validation set' },
      { num: '5', action: 'Deploy', detail: 'Apply adapted model to target task environment' }
    ],
    example: 'pretrained_model + labeled_data → supervised_fine_tuning → task_adapted_model'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use high-quality, representative labeled datasets for target domain', icon: '✅' },
    { type: 'do', text: 'Implement proper train/validation/test splits to prevent overfitting', icon: '✅' },
    { type: 'do', text: 'Apply appropriate regularization techniques (dropout, weight decay)', icon: '✅' },
    { type: 'do', text: 'Monitor for distribution shift between training and deployment', icon: '✅' },
    { type: 'do', text: 'Use transfer learning from relevant pre-trained models', icon: '✅' },
    { type: 'do', text: 'Implement early stopping based on validation performance', icon: '✅' },
    { type: 'dont', text: 'Train on insufficient or biased labeled data', icon: '❌' },
    { type: 'dont', text: 'Ignore data quality issues and label noise', icon: '❌' },
    { type: 'dont', text: 'Overfit to training data without proper validation', icon: '❌' },
    { type: 'dont', text: 'Apply without considering computational constraints', icon: '❌' },
    { type: 'dont', text: 'Neglect hyperparameter tuning and model selection', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'High-quality labeled data is available for target task',
      'Task has clear input-output relationships',
      'Performance requirements justify supervised training costs',
      'Domain-specific adaptation is needed from general models',
      'Evaluation metrics can be clearly defined'
    ],
    avoidWhen: [
      'Labeled data is scarce, expensive, or low quality',
      'Task requires real-time learning from minimal examples',
      'Unsupervised or self-supervised approaches are sufficient',
      'Privacy constraints prevent data collection',
      'Deployment environment changes frequently'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Task Accuracy', measure: 'Performance on target task vs baseline models' },
    { metric: 'Training Efficiency', measure: 'Convergence speed and computational cost' },
    { metric: 'Generalization', measure: 'Performance on unseen test data' },
    { metric: 'Transfer Quality', measure: 'Knowledge retention from pre-training' },
    { metric: 'Data Efficiency', measure: 'Performance per labeled training example' },
    { metric: 'Robustness', measure: 'Performance under distribution shift' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Domain-Specific Classification: Adapt general classifiers to specialized domains (medical, legal, scientific)',
    'Custom Entity Recognition: Train NER models for domain-specific entities and relationships',
    'Task-Specific Generation: Fine-tune language models for specific writing styles or formats',
    'Sentiment Analysis Adaptation: Customize sentiment models for specific industries or contexts',
    'Code Generation Specialization: Adapt code models for specific programming languages or frameworks',
    'Question Answering Systems: Train QA models on domain-specific knowledge bases'
  ];

  const references = [
    {
      title: 'Foundational Papers',
      items: [
        { title: 'Fine-Tuning Pre-trained Language Models: Weight Initializations, Data Orders, and Early Stopping (Dodge et al., 2020)', url: 'https://arxiv.org/abs/2002.06305' },
        { title: 'How to Fine-Tune BERT for Text Classification? (Sun et al., 2019)', url: 'https://arxiv.org/abs/1905.05583' },
        { title: 'Universal Language Model Fine-tuning for Text Classification (Howard & Ruder, 2018)', url: 'https://arxiv.org/abs/1801.06146' },
        { title: 'Attention Is All You Need (Vaswani et al., 2017)', url: 'https://arxiv.org/abs/1706.03762' }
      ]
    },
    {
      title: 'Transfer Learning & Pre-training',
      items: [
        { title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding (Devlin et al., 2018)', url: 'https://arxiv.org/abs/1810.04805' },
        { title: 'Language Models are Few-Shot Learners (Brown et al., 2020)', url: 'https://arxiv.org/abs/2005.14165' },
        { title: 'T5: Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer (Raffel et al., 2019)', url: 'https://arxiv.org/abs/1910.10683' },
        { title: 'RoBERTa: A Robustly Optimized BERT Pretraining Approach (Liu et al., 2019)', url: 'https://arxiv.org/abs/1907.11692' }
      ]
    },
    {
      title: 'Fine-Tuning Methodologies',
      items: [
        { title: 'LoRA: Low-Rank Adaptation of Large Language Models (Hu et al., 2021)', url: 'https://arxiv.org/abs/2106.09685' },
        { title: 'Prefix-Tuning: Optimizing Continuous Prompts for Generation (Li & Liang, 2021)', url: 'https://arxiv.org/abs/2101.00190' },
        { title: 'The Power of Scale for Parameter-Efficient Prompt Tuning (Lester et al., 2021)', url: 'https://arxiv.org/abs/2104.08691' },
        { title: 'AdaLoRA: Adaptive Budget Allocation for Parameter-Efficient Fine-Tuning (Zhang et al., 2023)', url: 'https://arxiv.org/abs/2303.10512' }
      ]
    },
    {
      title: 'Domain Adaptation Techniques',
      items: [
        { title: 'Domain-Adversarial Training of Neural Networks (Ganin et al., 2016)', url: 'https://arxiv.org/abs/1505.07818' },
        { title: 'Deep Domain Confusion: Maximizing for Domain Invariance (Tzeng et al., 2014)', url: 'https://arxiv.org/abs/1412.3474' },
        { title: 'Unsupervised Domain Adaptation by Backpropagation (Ganin & Lempitsky, 2015)', url: 'https://arxiv.org/abs/1409.7495' },
        { title: 'AdaBound: Adaptive Gradient Methods with Bound for Domain Adaptation (Luo et al., 2019)', url: 'https://arxiv.org/abs/1902.09843' }
      ]
    },
    {
      title: 'Recent Advances (2023-2024)',
      items: [
        { title: 'QLoRA: Efficient Finetuning of Quantized LLMs (Dettmers et al., 2023)', url: 'https://arxiv.org/abs/2305.14314' },
        { title: 'LLaMA-Adapter: Efficient Fine-tuning of Language Models with Zero-init Attention (Zhang et al., 2023)', url: 'https://arxiv.org/abs/2303.16199' },
        { title: 'Instruction Tuning for Large Language Models: A Survey (Zhang et al., 2023)', url: 'https://arxiv.org/abs/2308.10792' },
        { title: 'DoRA: Weight-Decomposed Low-Rank Adaptation (Liu et al., 2024)', url: 'https://arxiv.org/abs/2402.09353' }
      ]
    },
    {
      title: 'Data Efficiency & Few-Shot Learning',
      items: [
        { title: 'Few-Shot Learning with Language Models (Brown et al., 2020)', url: 'https://arxiv.org/abs/2005.14165' },
        { title: 'Making Pre-trained Language Models Better Few-shot Learners (Gao et al., 2021)', url: 'https://arxiv.org/abs/2012.15723' },
        { title: 'What Makes Good In-Context Examples for GPT-3? (Liu et al., 2021)', url: 'https://arxiv.org/abs/2101.06804' },
        { title: 'SetFit: Efficient Few-Shot Learning Without Prompts (Tunstall et al., 2022)', url: 'https://arxiv.org/abs/2209.11055' }
      ]
    },
    {
      title: 'Evaluation & Benchmarking',
      items: [
        { title: 'GLUE: A Multi-Task Benchmark and Analysis Platform for Natural Language Understanding (Wang et al., 2018)', url: 'https://arxiv.org/abs/1804.07461' },
        { title: 'SuperGLUE: A Stickier Benchmark for General-Purpose Language Understanding Systems (Wang et al., 2019)', url: 'https://arxiv.org/abs/1905.00537' },
        { title: 'BIG-bench: Beyond the Imitation Game Benchmark (Srivastava et al., 2022)', url: 'https://arxiv.org/abs/2206.04615' },
        { title: 'HELM: Holistic Evaluation of Language Models (Liang et al., 2022)', url: 'https://arxiv.org/abs/2211.09110' }
      ]
    },
    {
      title: 'Implementation Resources',
      items: [
        { title: 'Hugging Face Transformers - Fine-tuning Tutorial', url: 'https://huggingface.co/docs/transformers/training' },
        { title: 'PEFT: Parameter-Efficient Fine-Tuning Library', url: 'https://github.com/huggingface/peft' },
        { title: 'LoRA Implementation and Best Practices', url: 'https://github.com/microsoft/LoRA' },
        { title: 'Adapter Hub: Pre-trained Adapters Repository', url: 'https://adapterhub.ml/' }
      ]
    },
    {
      title: 'Training Frameworks & Tools',
      items: [
        { title: 'PyTorch Lightning: Simplified Training Framework', url: 'https://pytorch-lightning.readthedocs.io/' },
        { title: 'Accelerate: Distributed Training Library', url: 'https://huggingface.co/docs/accelerate/index' },
        { title: 'DeepSpeed: Optimization Library for Large Models', url: 'https://github.com/microsoft/DeepSpeed' },
        { title: 'FairScale: PyTorch Extensions for Research', url: 'https://github.com/facebookresearch/fairscale' }
      ]
    },
    {
      title: 'Domain-Specific Applications',
      items: [
        { title: 'BioBERT: Biomedical Text Mining with BERT (Lee et al., 2020)', url: 'https://arxiv.org/abs/1901.08746' },
        { title: 'FinBERT: Financial Sentiment Analysis (Araci, 2019)', url: 'https://arxiv.org/abs/1908.10063' },
        { title: 'LegalBERT: Legal Domain Language Model (Chalkidis et al., 2020)', url: 'https://arxiv.org/abs/2010.02559' },
        { title: 'CodeBERT: A Pre-Trained Model for Programming Languages (Feng et al., 2020)', url: 'https://arxiv.org/abs/2002.08155' }
      ]
    },
    {
      title: 'Production Deployment',
      items: [
        { title: 'Model Optimization for Production: ONNX and TensorRT', url: 'https://onnx.ai/' },
        { title: 'TorchServe: PyTorch Model Serving Framework', url: 'https://pytorch.org/serve/' },
        { title: 'MLflow: Machine Learning Lifecycle Management', url: 'https://mlflow.org/' },
        { title: 'Weights & Biases: Experiment Tracking and Model Management', url: 'https://wandb.ai/' }
      ]
    },
    {
      title: 'Best Practices & Guidelines',
      items: [
        { title: 'Fine-Tuning Best Practices (Google AI)', url: 'https://ai.googleblog.com/2019/12/bert-applicability-domain-specific.html' },
        { title: 'Efficient Training of Large Language Models (OpenAI)', url: 'https://openai.com/research/techniques-for-training-large-neural-networks' },
        { title: 'Parameter-Efficient Fine-Tuning Survey (Ding et al., 2022)', url: 'https://arxiv.org/abs/2203.06904' },
        { title: 'Transfer Learning in Natural Language Processing (Kenton & Toutanova, 2019)', url: 'https://arxiv.org/abs/1910.10683' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Adapt pre-trained models to specific tasks through supervised training on labeled target domain data"
        why="Leverages existing model knowledge while specializing for target tasks, achieving high performance with reasonable training costs"
        keyInsight="Transfer learning from pre-trained models combined with task-specific supervision provides optimal balance of generalization and specialization"
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

export default SupervisedLearningAdaptationDetails;