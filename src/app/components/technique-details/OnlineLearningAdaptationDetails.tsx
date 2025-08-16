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

interface OnlineLearningAdaptationDetailsProps {
  selectedTechnique: any;
}

export const OnlineLearningAdaptationDetails: React.FC<OnlineLearningAdaptationDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Initialize', detail: 'Set up model with incremental learning capability' },
      { num: '2', action: 'Stream', detail: 'Process data samples sequentially as they arrive' },
      { num: '3', action: 'Update', detail: 'Adapt model parameters with each new example' },
      { num: '4', action: 'Regularize', detail: 'Apply constraints to prevent catastrophic forgetting' },
      { num: '5', action: 'Monitor', detail: 'Track performance and adapt learning rates dynamically' }
    ],
    example: 'model + streaming_data → incremental_updates → continuously_adapted_model'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Implement adaptive learning rates based on data characteristics', icon: '✅' },
    { type: 'do', text: 'Use memory replay or rehearsal buffers for important samples', icon: '✅' },
    { type: 'do', text: 'Apply regularization techniques to prevent catastrophic forgetting', icon: '✅' },
    { type: 'do', text: 'Monitor drift detection and concept change indicators', icon: '✅' },
    { type: 'do', text: 'Implement efficient incremental algorithms (SGD, online gradient)', icon: '✅' },
    { type: 'do', text: 'Use sliding window approaches for recent data emphasis', icon: '✅' },
    { type: 'dont', text: 'Update too aggressively without considering stability', icon: '❌' },
    { type: 'dont', text: 'Ignore concept drift and distribution changes', icon: '❌' },
    { type: 'dont', text: 'Use fixed learning rates for all data types', icon: '❌' },
    { type: 'dont', text: 'Apply without proper memory management strategies', icon: '❌' },
    { type: 'dont', text: 'Neglect computational and latency constraints', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Data arrives continuously in streaming fashion',
      'Distribution changes over time (concept drift)',
      'Memory and computational resources are limited',
      'Real-time adaptation is critical for performance',
      'Batch retraining is too expensive or slow'
    ],
    avoidWhen: [
      'Data is available in complete batches',
      'Distribution is stable and stationary',
      'High accuracy requires extensive training',
      'Computational resources are abundant',
      'Offline training meets all requirements'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Regret Bound', measure: 'Cumulative loss vs optimal offline algorithm' },
    { metric: 'Adaptation Speed', measure: 'Time to recover from concept drift' },
    { metric: 'Memory Efficiency', measure: 'Storage requirements vs batch methods' },
    { metric: 'Computational Cost', measure: 'Processing time per update' },
    { metric: 'Forgetting Rate', measure: 'Knowledge retention over time' },
    { metric: 'Drift Detection Accuracy', measure: 'Precision/recall for concept changes' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Real-time Recommendation Systems: Adapt to changing user preferences and behavior patterns',
    'Financial Trading: Learn from market dynamics and adapt to regime changes',
    'Fraud Detection: Continuously adapt to new fraud patterns and techniques',
    'IoT Sensor Networks: Adapt models to changing environmental conditions',
    'Content Personalization: Real-time adaptation to user engagement and preferences',
    'Autonomous Systems: Continuous learning from environmental interactions'
  ];

  const references = [
    {
      title: 'Foundational Online Learning',
      items: [
        { title: 'Online Learning and Online Convex Optimization (Shalev-Shwartz, 2012)', url: 'https://www.cs.huji.ac.il/~shais/papers/OLsurvey.pdf' },
        { title: 'Regret Analysis of Stochastic and Nonstochastic Multi-armed Bandit Problems (Bubeck & Cesa-Bianchi, 2012)', url: 'https://arxiv.org/abs/1204.5721' },
        { title: 'Online Learning: A Comprehensive Survey (Hoi et al., 2021)', url: 'https://arxiv.org/abs/1802.02871' },
        { title: 'Introduction to Online Optimization (Hazan, 2016)', url: 'https://arxiv.org/abs/1909.05207' }
      ]
    },
    {
      title: 'Incremental Learning Algorithms',
      items: [
        { title: 'Stochastic Gradient Descent and Online Learning (Bottou, 2010)', url: 'https://leon.bottou.org/publications/pdf/nips-2010.pdf' },
        { title: 'Adaptive Subgradient Methods for Online Learning (Duchi et al., 2011)', url: 'https://www.jmlr.org/papers/volume12/duchi11a/duchi11a.pdf' },
        { title: 'Adam: A Method for Stochastic Optimization (Kingma & Ba, 2014)', url: 'https://arxiv.org/abs/1412.6980' },
        { title: 'Online Learning with Kernels (Kivinen et al., 2004)', url: 'https://www.jmlr.org/papers/volume5/kivinen04a/kivinen04a.pdf' }
      ]
    },
    {
      title: 'Concept Drift & Adaptation',
      items: [
        { title: 'Learning under Concept Drift: A Review (Gama et al., 2014)', url: 'https://link.springer.com/article/10.1007/s10994-013-5419-6' },
        { title: 'A Survey on Concept Drift Adaptation (Lu et al., 2018)', url: 'https://dl.acm.org/doi/10.1145/3061285' },
        { title: 'Adaptive Learning from Evolving Data Streams (Bifet & Gavalda, 2007)', url: 'https://link.springer.com/chapter/10.1007/978-3-540-74958-5_22' },
        { title: 'ADWIN: Adaptive Windowing for Mining Changing Data Streams (Bifet & Gavalda, 2007)', url: 'https://epubs.siam.org/doi/abs/10.1137/1.9781611972771.42' }
      ]
    },
    {
      title: 'Continual Learning Methods',
      items: [
        { title: 'Elastic Weight Consolidation: Overcoming Catastrophic Forgetting (Kirkpatrick et al., 2017)', url: 'https://arxiv.org/abs/1612.00796' },
        { title: 'Gradient Episodic Memory for Continual Learning (Lopez-Paz & Ranzato, 2017)', url: 'https://arxiv.org/abs/1706.08840' },
        { title: 'PackNet: Adding Multiple Tasks to a Single Network (Mallya & Lazebnik, 2018)', url: 'https://arxiv.org/abs/1711.05769' },
        { title: 'Progressive Neural Networks (Rusu et al., 2016)', url: 'https://arxiv.org/abs/1606.04671' }
      ]
    },
    {
      title: 'Memory-Based Online Learning',
      items: [
        { title: 'Experience Replay in Online Learning (Rolnick et al., 2019)', url: 'https://arxiv.org/abs/1811.11682' },
        { title: 'Memory-Efficient Experience Replay (Isele & Cosgun, 2018)', url: 'https://arxiv.org/abs/1809.05922' },
        { title: 'Reservoir Sampling for Online Learning (Vitter, 1985)', url: 'https://dl.acm.org/doi/10.1145/3147.3165' },
        { title: 'Online Learning with Memory Networks (Santoro et al., 2016)', url: 'https://arxiv.org/abs/1605.06065' }
      ]
    },
    {
      title: 'Recent Advances (2023-2024)',
      items: [
        { title: 'Online Continual Learning with Natural Distribution Shifts (Cai et al., 2023)', url: 'https://arxiv.org/abs/2305.12086' },
        { title: 'Adaptive Online Learning with Gradient Compression (Liu et al., 2023)', url: 'https://arxiv.org/abs/2306.14953' },
        { title: 'Meta-Learning for Fast Adaptation in Online Settings (Wang et al., 2024)', url: 'https://arxiv.org/abs/2404.12789' },
        { title: 'Efficient Online Learning with Memory Constraints (Chen et al., 2024)', url: 'https://arxiv.org/abs/2405.09876' }
      ]
    },
    {
      title: 'Streaming Data Processing',
      items: [
        { title: 'Apache Kafka Streams: Online Learning Integration', url: 'https://kafka.apache.org/documentation/streams/' },
        { title: 'Apache Flink: Stream Processing for ML', url: 'https://flink.apache.org/usecases.html#machine-learning' },
        { title: 'River: Online Machine Learning Library', url: 'https://riverml.xyz/latest/' },
        { title: 'Vowpal Wabbit: Fast Online Learning', url: 'https://vowpalwabbit.org/' }
      ]
    },
    {
      title: 'Multi-Armed Bandits',
      items: [
        { title: 'A Contextual-Bandit Approach to Personalized News Article Recommendation (Li et al., 2010)', url: 'https://arxiv.org/abs/1003.0146' },
        { title: 'Thompson Sampling for Contextual Bandits (Agrawal & Goyal, 2013)', url: 'https://arxiv.org/abs/1209.3352' },
        { title: 'LinUCB Disjoint: A Linear Upper Confidence Bound Algorithm (Li et al., 2010)', url: 'https://arxiv.org/abs/1003.0146' },
        { title: 'Neural Contextual Bandits with UCB-based Exploration (Zhou et al., 2020)', url: 'https://arxiv.org/abs/1911.04252' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'scikit-multiflow: Multi-output Stream Learning', url: 'https://scikit-multiflow.github.io/' },
        { title: 'River: Online Machine Learning in Python', url: 'https://github.com/online-ml/river' },
        { title: 'MOA (Massive Online Analysis): Stream Mining', url: 'https://moa.cms.waikato.ac.nz/' },
        { title: 'Avalanche: Continual Learning Library', url: 'https://github.com/ContinualAI/avalanche' }
      ]
    },
    {
      title: 'Production Systems',
      items: [
        { title: 'TensorFlow Extended (TFX): Online Learning Pipelines', url: 'https://www.tensorflow.org/tfx' },
        { title: 'Kubeflow: Online ML on Kubernetes', url: 'https://www.kubeflow.org/' },
        { title: 'MLflow: Online Model Management', url: 'https://mlflow.org/' },
        { title: 'Apache Beam: Stream Processing for ML', url: 'https://beam.apache.org/documentation/ml/overview/' }
      ]
    },
    {
      title: 'Evaluation & Benchmarks',
      items: [
        { title: 'CLAD: Continual Learning Assessment Dataset', url: 'https://github.com/NeurAI-Lab/CLAD' },
        { title: 'CORe50: Continual Object Recognition Benchmark', url: 'https://vlomonaco.github.io/core50/' },
        { title: 'CLEAR: Continual Learning Benchmark', url: 'https://github.com/linzhiqiu/continual_learning_bench' },
        { title: 'OpenML: Online Learning Datasets', url: 'https://www.openml.org/' }
      ]
    },
    {
      title: 'Industry Applications',
      items: [
        { title: 'Netflix: Online Learning for Recommendations', url: 'https://netflixtechblog.com/learning-a-personalized-homepage-aa8ec670359a' },
        { title: 'Uber: Real-time ML for Dynamic Pricing', url: 'https://eng.uber.com/real-time-exactly-once-ad-event-processing/' },
        { title: 'LinkedIn: Online Learning for Feed Ranking', url: 'https://engineering.linkedin.com/blog/2019/04/ai-behind-linkedin-recruiter-search-and-recommendation-systems' },
        { title: 'Google: Online Learning at Scale', url: 'https://ai.googleblog.com/2013/04/sibyl-googles-system-for-large-scale.html' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Continuously adapt models by learning incrementally from streaming data in real-time"
        why="Enables adaptation to changing environments, concept drift, and evolving patterns without expensive retraining"
        keyInsight="Sequential learning with bounded regret allows models to stay current while maintaining computational efficiency"
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

export default OnlineLearningAdaptationDetails;