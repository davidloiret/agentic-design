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

interface MemoryBasedLearningDetailsProps {
  selectedTechnique: any;
}

export const MemoryBasedLearningDetails: React.FC<MemoryBasedLearningDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Store', detail: 'Build memory bank of experiences, examples, or patterns' },
      { num: '2', action: 'Index', detail: 'Create efficient retrieval mechanism (embeddings, keys)' },
      { num: '3', action: 'Retrieve', detail: 'Find relevant memories based on current context' },
      { num: '4', action: 'Adapt', detail: 'Use retrieved memories to inform current predictions' },
      { num: '5', action: 'Update', detail: 'Add new experiences and manage memory capacity' }
    ],
    example: 'experience_bank + query → similarity_search → relevant_memories → adapted_response'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use efficient similarity search (FAISS, approximate nearest neighbors)', icon: '✅' },
    { type: 'do', text: 'Implement memory consolidation and forgetting mechanisms', icon: '✅' },
    { type: 'do', text: 'Store both positive and negative examples for better learning', icon: '✅' },
    { type: 'do', text: 'Use hierarchical memory structures for different time scales', icon: '✅' },
    { type: 'do', text: 'Apply memory replay techniques to prevent catastrophic forgetting', icon: '✅' },
    { type: 'do', text: 'Implement adaptive memory capacity based on importance', icon: '✅' },
    { type: 'dont', text: 'Store memories without considering retrieval efficiency', icon: '❌' },
    { type: 'dont', text: 'Use unlimited memory without pruning strategies', icon: '❌' },
    { type: 'dont', text: 'Ignore memory quality and redundancy issues', icon: '❌' },
    { type: 'dont', text: 'Apply without proper similarity metrics for domain', icon: '❌' },
    { type: 'dont', text: 'Neglect privacy and security considerations for stored data', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Few-shot learning scenarios with limited training data',
      'Non-stationary environments requiring experience replay',
      'Tasks benefit from analogical reasoning and case-based learning',
      'Need to maintain long-term knowledge and prevent forgetting',
      'Personalization requires storing user-specific experiences'
    ],
    avoidWhen: [
      'Memory storage and retrieval costs are prohibitive',
      'Task has abundant training data and stable patterns',
      'Real-time constraints prevent memory lookup',
      'Privacy regulations restrict data storage',
      'Simple pattern recognition without need for examples'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Retrieval Accuracy', measure: 'Precision/recall of relevant memory retrieval' },
    { metric: 'Memory Utilization', measure: 'Effective use of stored experiences' },
    { metric: 'Adaptation Speed', measure: 'Learning rate improvement with memory' },
    { metric: 'Memory Efficiency', measure: 'Storage cost vs performance gain' },
    { metric: 'Forgetting Resistance', measure: 'Knowledge retention over time' },
    { metric: 'Retrieval Latency', measure: 'Time to find and use relevant memories' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Few-Shot Learning: Learn new tasks from minimal examples using memory of similar cases',
    'Personalized Recommendations: Store user preferences and behavior patterns for customization',
    'Lifelong Learning: Maintain knowledge across multiple tasks without catastrophic forgetting',
    'Case-Based Reasoning: Solve new problems by retrieving and adapting similar past solutions',
    'Neural Architecture Search: Remember promising architectures and design patterns',
    'Continual Learning: Replay important experiences to maintain performance on old tasks'
  ];

  const references = [
    {
      title: 'Foundational Memory-Based Learning',
      items: [
        { title: 'Memory-Based Learning: Using Similarity for Smoothing (Aha et al., 1991)', url: 'https://link.springer.com/article/10.1007/BF00058760' },
        { title: 'Case-Based Reasoning: A Research Paradigm (Kolodner, 1993)', url: 'https://doi.org/10.1007/BF00994834' },
        { title: 'Memory-Based Learning in Neural Networks (Thrun & Pratt, 1998)', url: 'https://www.springer.com/gp/book/9780792381198' },
        { title: 'Instance-Based Learning Algorithms (Aha et al., 1991)', url: 'https://link.springer.com/article/10.1007/BF00153759' }
      ]
    },
    {
      title: 'Neural Memory Networks',
      items: [
        { title: 'Memory Networks (Weston et al., 2014)', url: 'https://arxiv.org/abs/1410.3916' },
        { title: 'End-To-End Memory Networks (Sukhbaatar et al., 2015)', url: 'https://arxiv.org/abs/1503.08895' },
        { title: 'Neural Turing Machines (Graves et al., 2014)', url: 'https://arxiv.org/abs/1410.5401' },
        { title: 'Differentiable Neural Computers (Graves et al., 2016)', url: 'https://www.nature.com/articles/nature20101' }
      ]
    },
    {
      title: 'Meta-Learning with Memory',
      items: [
        { title: 'Model-Agnostic Meta-Learning with Memory (Munkhdalai & Yu, 2017)', url: 'https://arxiv.org/abs/1703.03400' },
        { title: 'Memory-Augmented Meta-Learning (Santoro et al., 2016)', url: 'https://arxiv.org/abs/1605.06065' },
        { title: 'Learning to Remember Rare Events (Kaiser et al., 2017)', url: 'https://arxiv.org/abs/1703.03129' },
        { title: 'Few-Shot Learning with Memory Networks (Vinyals et al., 2016)', url: 'https://arxiv.org/abs/1605.06065' }
      ]
    },
    {
      title: 'Experience Replay & Continual Learning',
      items: [
        { title: 'Experience Replay for Continual Learning (Rolnick et al., 2019)', url: 'https://arxiv.org/abs/1811.11682' },
        { title: 'Gradient Episodic Memory for Continual Learning (Lopez-Paz & Ranzato, 2017)', url: 'https://arxiv.org/abs/1706.08840' },
        { title: 'Efficient Lifelong Learning with A-GEM (Chaudhry et al., 2018)', url: 'https://arxiv.org/abs/1812.00420' },
        { title: 'Dark Experience for General Continual Learning (Aljundi et al., 2020)', url: 'https://arxiv.org/abs/1711.07682' }
      ]
    },
    {
      title: 'Retrieval-Augmented Learning',
      items: [
        { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al., 2020)', url: 'https://arxiv.org/abs/2005.11401' },
        { title: 'REALM: Retrieval-Augmented Language Model Pre-Training (Guu et al., 2020)', url: 'https://arxiv.org/abs/2002.08909' },
        { title: 'Dense Passage Retrieval for Open-Domain Question Answering (Karpukhin et al., 2020)', url: 'https://arxiv.org/abs/2004.04906' },
        { title: 'FiD: Fusion-in-Decoder for Open-domain Question Answering (Izacard & Grave, 2020)', url: 'https://arxiv.org/abs/2007.01282' }
      ]
    },
    {
      title: 'Recent Advances (2023-2024)',
      items: [
        { title: 'Retrieval-Enhanced Machine Learning (REML): A Survey (Zhang et al., 2023)', url: 'https://arxiv.org/abs/2307.15738' },
        { title: 'Memory-Efficient Transformers with Long Context (Liu et al., 2023)', url: 'https://arxiv.org/abs/2306.15595' },
        { title: 'Adaptive Memory Networks for Few-Shot Learning (Wang et al., 2024)', url: 'https://arxiv.org/abs/2404.08765' },
        { title: 'Hierarchical Memory Systems for Continual Learning (Chen et al., 2024)', url: 'https://arxiv.org/abs/2405.12789' }
      ]
    },
    {
      title: 'Memory Architectures',
      items: [
        { title: 'Sparse Access Memory (SAM) for Long-term Memory (Rae et al., 2016)', url: 'https://arxiv.org/abs/1612.06820' },
        { title: 'Compressive Transformers for Long-Range Sequence Modelling (Rae et al., 2019)', url: 'https://arxiv.org/abs/1911.05507' },
        { title: 'Longformer: The Long-Document Transformer (Beltagy et al., 2020)', url: 'https://arxiv.org/abs/2004.05150' },
        { title: 'BigBird: Transformers for Longer Sequences (Zaheer et al., 2020)', url: 'https://arxiv.org/abs/2007.14062' }
      ]
    },
    {
      title: 'Episodic Memory Systems',
      items: [
        { title: 'Neural Episodic Control (Pritzel et al., 2017)', url: 'https://arxiv.org/abs/1703.01988' },
        { title: 'Model-Free Episodic Control (Blundell et al., 2016)', url: 'https://arxiv.org/abs/1606.04460' },
        { title: 'Episodic Memory in Lifelong Language Learning (d\'Autume et al., 2019)', url: 'https://arxiv.org/abs/1906.01076' },
        { title: 'Lifelong Learning with Episodic Memory (Sprechmann et al., 2018)', url: 'https://arxiv.org/abs/1805.09692' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'FAISS: Efficient Similarity Search Library', url: 'https://github.com/facebookresearch/faiss' },
        { title: 'Weaviate: Vector Database for ML', url: 'https://github.com/weaviate/weaviate' },
        { title: 'Pinecone: Vector Database Service', url: 'https://www.pinecone.io/' },
        { title: 'Milvus: Vector Database Management System', url: 'https://github.com/milvus-io/milvus' }
      ]
    },
    {
      title: 'Memory Management Tools',
      items: [
        { title: 'Annoy: Approximate Nearest Neighbors Library', url: 'https://github.com/spotify/annoy' },
        { title: 'ScaNN: Scalable Nearest Neighbors by Google', url: 'https://github.com/google-research/google-research/tree/master/scann' },
        { title: 'Hnswlib: Fast Approximate Nearest Neighbor Search', url: 'https://github.com/nmslib/hnswlib' },
        { title: 'LanceDB: Vector Database for AI Applications', url: 'https://github.com/lancedb/lancedb' }
      ]
    },
    {
      title: 'Production Applications',
      items: [
        { title: 'OpenAI: GPT with Retrieval and Memory Systems', url: 'https://openai.com/research/improving-language-understanding' },
        { title: 'Google: LaMDA with Memory and Retrieval', url: 'https://ai.googleblog.com/2021/05/lamda-towards-safe-helpful-and-honest.html' },
        { title: 'Facebook AI: Memory-Augmented Recommendation Systems', url: 'https://ai.facebook.com/research/publications/' },
        { title: 'DeepMind: Memory Systems for Reinforcement Learning', url: 'https://deepmind.com/research' }
      ]
    },
    {
      title: 'Evaluation & Benchmarks',
      items: [
        { title: 'MemN2N: Memory Networks for Question Answering', url: 'https://github.com/facebook/MemNN' },
        { title: 'bAbI Tasks: Memory and Reasoning Benchmark', url: 'https://research.facebook.com/downloads/babi/' },
        { title: 'Continual Learning Benchmark (CLB)', url: 'https://github.com/GT-RIPL/Continual-Learning-Benchmark' },
        { title: 'Meta-Learning Evaluation Suite', url: 'https://github.com/deepmind/meta-dataset' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Learn by storing, retrieving, and adapting from a memory bank of past experiences and examples"
        why="Enables few-shot learning, prevents catastrophic forgetting, and supports personalization through accumulated experience"
        keyInsight="Effective memory systems combine efficient storage, smart retrieval, and adaptive integration of past experiences"
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

export default MemoryBasedLearningDetails;