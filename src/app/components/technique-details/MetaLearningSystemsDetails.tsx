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

interface MetaLearningSystemsDetailsProps {
  selectedTechnique: any;
}

export const MetaLearningSystemsDetails: React.FC<MetaLearningSystemsDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Tasks', detail: 'Define distribution of related learning tasks' },
      { num: '2', action: 'Meta-Train', detail: 'Learn to adapt quickly across task distribution' },
      { num: '3', action: 'Support Set', detail: 'Provide few examples of new target task' },
      { num: '4', action: 'Adapt', detail: 'Rapidly specialize to new task using meta-knowledge' },
      { num: '5', action: 'Query', detail: 'Perform target task with minimal examples' }
    ],
    example: 'task_distribution → meta_model → support_examples → adapted_model → predictions'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Design diverse meta-training task distributions', icon: '✅' },
    { type: 'do', text: 'Balance task complexity and similarity in meta-training', icon: '✅' },
    { type: 'do', text: 'Use proper train/validation/test task splits', icon: '✅' },
    { type: 'do', text: 'Monitor for overfitting to meta-training tasks', icon: '✅' },
    { type: 'do', text: 'Implement gradient-based and gradient-free approaches', icon: '✅' },
    { type: 'do', text: 'Track adaptation speed and final performance metrics', icon: '✅' },
    { type: 'dont', text: 'Use identical tasks in meta-training and meta-testing', icon: '❌' },
    { type: 'dont', text: 'Ignore computational overhead of meta-optimization', icon: '❌' },
    { type: 'dont', text: 'Apply to domains with insufficient task diversity', icon: '❌' },
    { type: 'dont', text: 'Skip ablation studies on meta-learning components', icon: '❌' },
    { type: 'dont', text: 'Use inadequate support set sizes for evaluation', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Many related tasks with limited data each',
      'Need rapid adaptation to new domains',
      'Tasks share underlying structure or patterns',
      'Few-shot learning requirements are critical',
      'Domain has natural task distribution'
    ],
    avoidWhen: [
      'Single task with abundant training data',
      'Tasks are completely unrelated',
      'Real-time inference constraints are severe',
      'Limited computational resources for meta-training',
      'Task distribution is poorly defined'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Few-Shot Accuracy', measure: 'Performance with K examples per class' },
    { metric: 'Adaptation Speed', measure: 'Gradient steps to convergence' },
    { metric: 'Transfer Efficiency', measure: 'Performance vs baseline on new tasks' },
    { metric: 'Meta-Generalization', measure: 'Performance on unseen task types' },
    { metric: 'Sample Efficiency', measure: 'Examples needed for target performance' },
    { metric: 'Computational Cost', measure: 'FLOPs for meta-training and adaptation' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Few-Shot Classification: Image recognition with limited labeled examples per class',
    'Domain Adaptation: Rapidly adapt models to new domains with minimal data',
    'Neural Architecture Search: Learn to design architectures for new tasks',
    'Hyperparameter Optimization: Learn optimal hyperparameters across task families',
    'Reinforcement Learning: Quick adaptation to new environments and reward structures',
    'Natural Language Processing: Few-shot text classification and named entity recognition'
  ];

  const references = [
    {
      title: 'Foundational Papers',
      items: [
        { title: 'Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks (Finn et al., 2017)', url: 'https://arxiv.org/abs/1703.03400' },
        { title: 'Learning to Learn by Gradient Descent by Gradient Descent (Andrychowicz et al., 2016)', url: 'https://arxiv.org/abs/1606.04474' },
        { title: 'Matching Networks for One Shot Learning (Vinyals et al., 2016)', url: 'https://arxiv.org/abs/1606.04080' },
        { title: 'Prototypical Networks for Few-shot Learning (Snell et al., 2017)', url: 'https://arxiv.org/abs/1703.05175' }
      ]
    },
    {
      title: 'MAML Variants & Extensions',
      items: [
        { title: 'On First-Order Meta-Learning Algorithms (Nichol et al., 2018)', url: 'https://arxiv.org/abs/1803.02999' },
        { title: 'How to train your MAML (Antoniou et al., 2018)', url: 'https://arxiv.org/abs/1810.09502' },
        { title: 'MAML++: A Domain-Agnostic Meta-Learning Algorithm (Antoniou et al., 2019)', url: 'https://arxiv.org/abs/1910.06943' },
        { title: 'Gradient-Based Meta-Learning with Learned Layerwise Metric and Subspace (Li et al., 2018)', url: 'https://arxiv.org/abs/1801.05558' }
      ]
    },
    {
      title: 'Optimization-Based Meta-Learning',
      items: [
        { title: 'Meta-SGD: Learning to Learn Quickly for Few-Shot Learning (Li et al., 2017)', url: 'https://arxiv.org/abs/1707.09835' },
        { title: 'Learning to learn without gradient descent by gradient descent (Chen et al., 2016)', url: 'https://arxiv.org/abs/1611.03824' },
        { title: 'Optimization as a Model for Few-Shot Learning (Ravi & Larochelle, 2016)', url: 'https://openreview.net/forum?id=rJY0-Kcll' },
        { title: 'Meta-Learning with Differentiable Convex Optimization (Lee et al., 2019)', url: 'https://arxiv.org/abs/1904.03758' }
      ]
    },
    {
      title: 'Memory-Based Meta-Learning',
      items: [
        { title: 'Meta-Learning with Memory-Augmented Neural Networks (Santoro et al., 2016)', url: 'https://arxiv.org/abs/1605.06065' },
        { title: 'Neural Turing Machines (Graves et al., 2014)', url: 'https://arxiv.org/abs/1410.5401' },
        { title: 'Differentiable Neural Computers (Graves et al., 2016)', url: 'https://arxiv.org/abs/1610.06258' },
        { title: 'Learning to Remember Rare Events (Kaiser et al., 2017)', url: 'https://arxiv.org/abs/1703.03129' }
      ]
    },
    {
      title: 'Meta-Learning Theory',
      items: [
        { title: 'A Theoretical Analysis of the Number of Shots in Few-Shot Learning (Cao et al., 2019)', url: 'https://arxiv.org/abs/1909.11722' },
        { title: 'Understanding and Improving Meta-Learning (Raghu et al., 2019)', url: 'https://arxiv.org/abs/1909.13458' },
        { title: 'Reconciling meta-learning and continual learning with online mixtures of tasks (Jerfel et al., 2019)', url: 'https://arxiv.org/abs/1812.06080' },
        { title: 'Meta-Learning: A Survey (Hospedales et al., 2020)', url: 'https://arxiv.org/abs/2004.05439' }
      ]
    },
    {
      title: 'Recent Advances (2022-2024)',
      items: [
        { title: 'MetaICL: Learning to Learn In Context (Min et al., 2022)', url: 'https://arxiv.org/abs/2110.15943' },
        { title: 'In-Context Learning and Gradient-Based Meta-Learning (Akyürek et al., 2022)', url: 'https://arxiv.org/abs/2211.02422' },
        { title: 'Language Models are Few-Shot Learners (Brown et al., 2020)', url: 'https://arxiv.org/abs/2005.14165' },
        { title: 'Meta-Learning via Language Model In-context Tuning (Chen et al., 2022)', url: 'https://arxiv.org/abs/2110.07814' }
      ]
    },
    {
      title: 'Neural Architecture Search & AutoML',
      items: [
        { title: 'DARTS: Differentiable Architecture Search (Liu et al., 2018)', url: 'https://arxiv.org/abs/1806.09055' },
        { title: 'Neural Architecture Search with Reinforcement Learning (Zoph & Le, 2016)', url: 'https://arxiv.org/abs/1611.01578' },
        { title: 'Auto-Meta: Automated Gradient Based Meta Learner Search (Kim et al., 2018)', url: 'https://arxiv.org/abs/1806.06927' },
        { title: 'MetaNAS: Meta Neural Architecture Search (Elsken et al., 2020)', url: 'https://arxiv.org/abs/2006.04647' }
      ]
    },
    {
      title: 'Applications & Domains',
      items: [
        { title: 'Learning to Reinforcement Learn (Wang et al., 2016)', url: 'https://arxiv.org/abs/1611.05763' },
        { title: 'Meta-Learning for Few-Shot Natural Language Processing (Bansal et al., 2019)', url: 'https://arxiv.org/abs/1911.03863' },
        { title: 'Model-Agnostic Meta-Learning for Multilingual Machine Translation (Gu et al., 2018)', url: 'https://arxiv.org/abs/1808.09068' },
        { title: 'Few-Shot Object Detection with Attention-RPN and Multi-Relation Detector (Fan et al., 2019)', url: 'https://arxiv.org/abs/1908.01998' }
      ]
    },
    {
      title: 'Implementation Resources',
      items: [
        { title: 'learn2learn: A PyTorch Meta-Learning Library', url: 'https://github.com/learnables/learn2learn' },
        { title: 'MAML Implementation in TensorFlow', url: 'https://github.com/cbfinn/maml' },
        { title: 'Torchmeta: A Meta-Learning library for PyTorch', url: 'https://github.com/tristandeleu/pytorch-meta' },
        { title: 'Higher: A pytorch library for higher-order optimization', url: 'https://github.com/facebookresearch/higher' }
      ]
    },
    {
      title: 'Datasets & Benchmarks',
      items: [
        { title: 'Omniglot Dataset for Few-Shot Learning', url: 'https://github.com/brendenlake/omniglot' },
        { title: 'miniImageNet: A Dataset for Few-Shot Learning', url: 'https://github.com/yaoyao-liu/mini-imagenet-tools' },
        { title: 'Meta-Dataset: A Dataset of Datasets for Few-Shot Learning', url: 'https://github.com/google-research/meta-dataset' },
        { title: 'VTAB: Visual Task Adaptation Benchmark', url: 'https://github.com/google-research/task_adaptation' }
      ]
    },
    {
      title: 'Tools & Frameworks',
      items: [
        { title: 'JAX-based MAML Implementation', url: 'https://github.com/deepmind/dm-haiku' },
        { title: 'TensorFlow Meta-Learning (TF-Agents)', url: 'https://github.com/tensorflow/agents' },
        { title: 'PyTorch Lightning Meta-Learning', url: 'https://pytorch-lightning.readthedocs.io/en/stable/' },
        { title: 'Avalanche: Continual Learning Library', url: 'https://github.com/ContinualAI/avalanche' }
      ]
    },
    {
      title: 'Community & Research Groups',
      items: [
        { title: 'Meta-Learning Workshop (NeurIPS)', url: 'https://meta-learn.github.io/' },
        { title: 'Few-Shot Learning Research Community', url: 'https://few-shot.org/' },
        { title: 'Berkeley AI Research (BAIR) - Meta-Learning', url: 'https://bair.berkeley.edu/blog/tag/meta-learning/' },
        { title: 'OpenAI Meta-Learning Research', url: 'https://openai.com/research/reptile' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Learn to learn: acquire meta-knowledge enabling rapid adaptation to new tasks with minimal data"
        why="Enables few-shot learning, rapid domain adaptation, and efficient knowledge transfer across related tasks"
        keyInsight="Models learn optimization procedures and inductive biases that generalize across task distributions"
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

export default MetaLearningSystemsDetails;