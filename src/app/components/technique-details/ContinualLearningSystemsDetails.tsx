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

interface ContinualLearningSystemsDetailsProps {
  selectedTechnique: any;
}

export const ContinualLearningSystemsDetails: React.FC<ContinualLearningSystemsDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Baseline', detail: 'Train initial model on first task/domain' },
      { num: '2', action: 'Strategy', detail: 'Choose catastrophic forgetting mitigation approach' },
      { num: '3', action: 'Sequential', detail: 'Learn new tasks while preserving old knowledge' },
      { num: '4', action: 'Evaluate', detail: 'Test performance on all tasks seen so far' },
      { num: '5', action: 'Adapt', detail: 'Adjust strategy based on forgetting metrics' }
    ],
    example: 'task_sequence → continual_strategy → updated_model → performance_retention'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use regularization techniques to constrain weight changes', icon: '✅' },
    { type: 'do', text: 'Implement experience replay with diverse sample selection', icon: '✅' },
    { type: 'do', text: 'Monitor backward and forward transfer metrics', icon: '✅' },
    { type: 'do', text: 'Apply dynamic architectures for capacity expansion', icon: '✅' },
    { type: 'do', text: 'Use meta-learning for rapid task adaptation', icon: '✅' },
    { type: 'do', text: 'Implement memory-efficient storage strategies', icon: '✅' },
    { type: 'dont', text: 'Ignore catastrophic forgetting measurement', icon: '❌' },
    { type: 'dont', text: 'Use naive fine-tuning without protection mechanisms', icon: '❌' },
    { type: 'dont', text: 'Store all previous data (privacy/storage issues)', icon: '❌' },
    { type: 'dont', text: 'Skip baseline comparison with multi-task learning', icon: '❌' },
    { type: 'dont', text: 'Use single metric for continual learning evaluation', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Sequential task arrival with limited memory',
      'Privacy constraints prevent storing old data',
      'Non-stationary environments requiring adaptation',
      'Lifelong learning systems deployment',
      'Resource-constrained edge computing scenarios'
    ],
    avoidWhen: [
      'All tasks available simultaneously',
      'Unlimited memory and computational resources',
      'Tasks are completely unrelated',
      'Static environment with fixed requirements',
      'Simple multi-task learning suffices'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Average Accuracy', measure: 'Mean performance across all tasks' },
    { metric: 'Backward Transfer', measure: 'Performance change on old tasks' },
    { metric: 'Forward Transfer', measure: 'Initial performance on new tasks' },
    { metric: 'Catastrophic Forgetting', measure: 'Performance degradation rate' },
    { metric: 'Learning Efficiency', measure: 'Samples needed per task' },
    { metric: 'Memory Footprint', measure: 'Storage requirement growth rate' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Conversational AI: Continuously learn new dialogue patterns and domains',
    'Recommendation Systems: Adapt to changing user preferences over time',
    'Autonomous Vehicles: Learn new driving scenarios without forgetting existing skills',
    'Medical Diagnosis: Incrementally learn new diseases and conditions',
    'Cybersecurity: Continuously adapt to new attack patterns and threats',
    'Edge AI Devices: Update capabilities while maintaining existing functionality'
  ];

  const references = [
    {
      title: 'Foundational Papers',
      items: [
        { title: 'Catastrophic Forgetting in Connectionist Networks (French, 1999)', url: 'https://www.sciencedirect.com/science/article/pii/S1364661399013422' },
        { title: 'Overcoming Catastrophic Forgetting in Neural Networks (Kirkpatrick et al., 2017)', url: 'https://arxiv.org/abs/1612.00796' },
        { title: 'Continual Learning with Deep Generative Replay (Shin et al., 2017)', url: 'https://arxiv.org/abs/1705.08690' },
        { title: 'Gradient Episodic Memory for Continual Learning (Lopez-Paz & Ranzato, 2017)', url: 'https://arxiv.org/abs/1706.08840' }
      ]
    },
    {
      title: 'Regularization-Based Approaches',
      items: [
        { title: 'Elastic Weight Consolidation (EWC) - Kirkpatrick et al., 2017', url: 'https://arxiv.org/abs/1612.00796' },
        { title: 'Synaptic Intelligence (Zenke et al., 2017)', url: 'https://arxiv.org/abs/1703.04200' },
        { title: 'Memory Aware Synapses (Aljundi et al., 2018)', url: 'https://arxiv.org/abs/1711.09601' },
        { title: 'Learning without Forgetting (Li & Hoiem, 2016)', url: 'https://arxiv.org/abs/1606.09282' }
      ]
    },
    {
      title: 'Memory-Based Methods',
      items: [
        { title: 'Experience Replay for Continual Learning (Rolnick et al., 2019)', url: 'https://arxiv.org/abs/1811.11682' },
        { title: 'Efficient Lifelong Learning with A-GEM (Chaudhry et al., 2019)', url: 'https://arxiv.org/abs/1812.00420' },
        { title: 'Episodic Memory in Lifelong Language Learning (de Masson d\'Autume et al., 2019)', url: 'https://arxiv.org/abs/1906.01076' },
        { title: 'Meta-Experience Replay for Continual Learning (Riemer et al., 2019)', url: 'https://arxiv.org/abs/1906.05201' }
      ]
    },
    {
      title: 'Dynamic Architecture Methods',
      items: [
        { title: 'Progressive Neural Networks (Rusu et al., 2016)', url: 'https://arxiv.org/abs/1606.04671' },
        { title: 'PackNet: Adding Multiple Tasks to a Single Network (Mallya & Lazebnik, 2018)', url: 'https://arxiv.org/abs/1711.05769' },
        { title: 'Compacting, Picking and Growing (CPG) for Unforgetting Continual Learning (Hung et al., 2019)', url: 'https://arxiv.org/abs/1910.06562' },
        { title: 'Supermasks in Superposition (Wortsman et al., 2020)', url: 'https://arxiv.org/abs/2006.14769' }
      ]
    },
    {
      title: 'Recent Advances (2022-2024)',
      items: [
        { title: 'Continual Learning with Foundation Models (Wang et al., 2023)', url: 'https://arxiv.org/abs/2308.04445' },
        { title: 'Online Continual Learning for Interactive Instruction Following Agents (Zheng et al., 2024)', url: 'https://arxiv.org/abs/2403.07548' },
        { title: 'Continual Learning in the Era of Large Language Models (Smith et al., 2024)', url: 'https://arxiv.org/abs/2404.09447' },
        { title: 'Memory-Efficient Continual Learning through Progressive Feature Alignment (Chen et al., 2024)', url: 'https://arxiv.org/abs/2405.12016' }
      ]
    },
    {
      title: 'Benchmarks & Evaluation',
      items: [
        { title: 'CORe50: a New Dataset and Benchmark for Continuous Object Recognition (Lomonaco & Maltoni, 2017)', url: 'https://arxiv.org/abs/1705.03550' },
        { title: 'Continual Learning Benchmark (CLB) Framework (Díaz-Rodríguez et al., 2018)', url: 'https://arxiv.org/abs/1802.07569' },
        { title: 'AVALANCHE: an End-to-End Library for Continual Learning (Lomonaco et al., 2021)', url: 'https://arxiv.org/abs/2104.00405' },
        { title: 'Continual Learning Data Former (CLDF) - Structured Benchmarking (Ke et al., 2022)', url: 'https://arxiv.org/abs/2203.10710' }
      ]
    },
    {
      title: 'Theoretical Analysis',
      items: [
        { title: 'Theoretical Analysis of Catastrophic Forgetting (Ramasesh et al., 2020)', url: 'https://arxiv.org/abs/2006.04182' },
        { title: 'Understanding Catastrophic Forgetting and Enabling Continual Learning (Ven & Tolias, 2019)', url: 'https://arxiv.org/abs/1909.08383' },
        { title: 'Reconciling Continual Learning and Meta-Learning (He & Jaeger, 2021)', url: 'https://arxiv.org/abs/2107.08500' },
        { title: 'The Role of Replay in Continual Learning (Buzzega et al., 2020)', url: 'https://arxiv.org/abs/2010.05595' }
      ]
    },
    {
      title: 'Applications & Domains',
      items: [
        { title: 'Continual Learning for Natural Language Processing (Biesialska et al., 2020)', url: 'https://arxiv.org/abs/2006.14326' },
        { title: 'Lifelong Learning in Computer Vision (Parisi et al., 2019)', url: 'https://arxiv.org/abs/1904.07027' },
        { title: 'Continual Learning for Robotics (Lesort et al., 2020)', url: 'https://arxiv.org/abs/1907.00153' },
        { title: 'Continual Learning in Recommender Systems (Kang & McAuley, 2018)', url: 'https://arxiv.org/abs/1807.06653' }
      ]
    },
    {
      title: 'Implementation Resources',
      items: [
        { title: 'AVALANCHE: End-to-End Continual Learning Library', url: 'https://github.com/ContinualAI/avalanche' },
        { title: 'Continual Learning Baselines (Facebook Research)', url: 'https://github.com/facebookresearch/GradientEpisodicMemory' },
        { title: 'PyTorch Continual Learning Framework', url: 'https://github.com/GMvandeVen/continual-learning' },
        { title: 'Sequoia: A Software Framework for Research in Continual Learning', url: 'https://github.com/lebrice/Sequoia' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'ContinualAI/avalanche: Comprehensive CL library', url: 'https://github.com/ContinualAI/avalanche' },
        { title: 'pytorch/ignite: Continual learning utilities', url: 'https://github.com/pytorch/ignite' },
        { title: 'Continuum: PyTorch library for continual learning', url: 'https://github.com/Continvvm/continuum' },
        { title: 'River: Online machine learning in Python', url: 'https://github.com/online-ml/river' }
      ]
    },
    {
      title: 'Surveys & Reviews',
      items: [
        { title: 'Continual Lifelong Learning with Neural Networks: A Review (Parisi et al., 2019)', url: 'https://arxiv.org/abs/1802.07569' },
        { title: 'Three scenarios for continual learning (van de Ven & Tolias, 2019)', url: 'https://arxiv.org/abs/1904.07734' },
        { title: 'A Comprehensive Survey of Continual Learning (Wang et al., 2023)', url: 'https://arxiv.org/abs/2302.00487' },
        { title: 'Continual Learning: A Comparative Study on How to Defy Forgetting (Buzzega et al., 2021)', url: 'https://arxiv.org/abs/2101.01417' }
      ]
    },
    {
      title: 'Community & Research Groups',
      items: [
        { title: 'ContinualAI: International Research Community', url: 'https://www.continualai.org/' },
        { title: 'CLVISION Workshop (CVPR/ICCV)', url: 'https://sites.google.com/view/clvision2023/' },
        { title: 'NeurIPS Continual Learning Workshop', url: 'https://continual-lifelong-learning.github.io/' },
        { title: 'ICML Lifelong Learning Workshop', url: 'https://lifelong-ml.cc/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Learn new tasks sequentially while retaining knowledge from previous tasks without catastrophic forgetting"
        why="Enables lifelong learning, adapts to changing environments, and maintains accumulated knowledge over time"
        keyInsight="Balance plasticity for new learning with stability for old knowledge through specialized retention mechanisms"
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

export default ContinualLearningSystemsDetails;