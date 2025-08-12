'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface AttentionMechanismsDetailsProps {
  selectedTechnique: any;
}

export const AttentionMechanismsDetails: React.FC<AttentionMechanismsDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Define attention scoring functions based on semantic similarity, temporal relevance, and contextual importance.',
    'Compute attention weights for each element in the input sequence or memory using scoring functions.',
    'Apply attention weights to create focused representations highlighting most relevant information.',
    'Implement multi-head attention for capturing different types of relationships and attention patterns.',
    'Optimize attention computation for efficiency using sparse attention, caching, or approximation methods.',
    'Monitor attention patterns and adapt scoring functions based on task performance and quality metrics.'
  ];

  const bestPractices = [
    'Use multiple attention heads to capture diverse relationship types: syntactic, semantic, and positional.',
    'Implement sparse attention patterns for long sequences to reduce computational complexity from O(n²) to O(n√n).',
    'Design attention masking strategies to prevent information leakage and maintain causality constraints.',
    'Cache attention computations for repeated queries and similar input patterns to improve efficiency.',
    'Apply attention dropout and regularization to prevent overfitting and improve generalization.',
    'Monitor attention alignment with human intuition and task requirements to validate mechanism effectiveness.',
    'Use learned positional encodings and relative position representations for better temporal understanding.'
  ];

  const whenNotToUse = [
    'Short sequences where simple averaging or max pooling provides sufficient information aggregation.',
    'Tasks with uniform importance across all input elements where attention provides no selectivity benefit.',
    'Resource-constrained environments where attention computation overhead exceeds performance gains.',
    'Real-time applications where attention computation latency is incompatible with response time requirements.',
    'Simple pattern matching tasks where rule-based selection is more interpretable and efficient.'
  ];

  const commonPitfalls = [
    'Attention collapse where all weight concentrates on few elements, losing important contextual information.',
    'Inefficient attention computation leading to quadratic scaling that becomes prohibitive for long sequences.',
    'Poor attention masking causing information leakage and violating task constraints or causality requirements.',
    'Over-reliance on attention without considering computational costs and efficiency trade-offs.',
    'Inadequate attention visualization and analysis making it difficult to debug and optimize mechanisms.',
    'Ignoring attention pattern drift over time leading to degraded performance on evolving data distributions.'
  ];

  const keyFeatures = [
    'Multi-head attention supporting diverse relationship types and attention pattern specialization',
    'Sparse attention patterns optimized for long sequences with efficient computation and memory usage',
    'Attention masking and causality constraints for maintaining temporal consistency and preventing leakage',
    'Dynamic attention scoring with adaptive functions based on semantic, temporal, and contextual factors',
    'Attention visualization and analysis tools for understanding and debugging attention patterns',
    'Efficient attention computation with caching, approximation, and hardware optimization strategies'
  ];

  const kpiMetrics = [
    'Attention alignment: Correlation between attention weights and human importance judgments or ground truth.',
    'Information retention: Proportion of relevant information preserved through attention-weighted aggregation.',
    'Attention entropy: Diversity of attention distribution indicating appropriate selectivity vs concentration.',
    'Computational efficiency: Attention computation time and memory usage relative to sequence length.',
    'Pattern stability: Consistency of attention patterns across similar inputs and temporal sequences.',
    'Task performance correlation: Relationship between attention quality and downstream task success metrics.'
  ];

  const tokenUsage = [
    'Attention computation itself uses minimal tokens; primary usage comes from processing attended content.',
    'Multi-head attention scales linearly with head count; balance diversity against computational cost.',
    'Sparse attention can reduce token usage by 30-70% while maintaining 90%+ of attention quality.',
    'Cache attention matrices for repeated patterns to minimize redundant computation and token usage.',
    'Monitor attention focus to identify most important content and optimize context window allocation.',
    'Use attention patterns to guide dynamic context selection and reduce unnecessary token consumption.'
  ];

  const bestUseCases = [
    'Long document processing requiring selective focus on most relevant sections and passages.',
    'Multi-modal systems integrating attention across text, images, and audio for unified understanding.',
    'Conversational systems maintaining attention to relevant dialogue history and contextual cues.',
    'Information retrieval and question answering requiring precise attention to relevant evidence.',
    'Sequence-to-sequence tasks like translation and summarization needing alignment between inputs and outputs.',
    'Time-series analysis with temporal attention for identifying important patterns and dependencies.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Attention Is All You Need (Vaswani et al., 2017)', url: 'https://arxiv.org/abs/1706.03762' },
        { title: 'Neural Machine Translation by Jointly Learning to Align and Translate (Bahdanau et al., 2015)', url: 'https://arxiv.org/abs/1409.0473' },
        { title: 'Effective Approaches to Attention-based Neural Machine Translation (Luong et al., 2015)', url: 'https://arxiv.org/abs/1508.04025' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Hugging Face Transformers - Attention Mechanisms', url: 'https://huggingface.co/docs/transformers/model_doc/attention' },
        { title: 'PyTorch Multi-Head Attention Implementation', url: 'https://pytorch.org/docs/stable/generated/torch.nn.MultiheadAttention.html' },
        { title: 'TensorFlow Attention Layers and Mechanisms', url: 'https://www.tensorflow.org/api_docs/python/tf/keras/layers/MultiHeadAttention' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Hugging Face Transformers with multi-head attention implementations', url: '#' },
        { title: 'PyTorch attention modules and custom attention mechanisms', url: '#' },
        { title: 'TensorFlow attention layers and attention-based models', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Hugging Face Community - Attention mechanism discussions', url: 'https://huggingface.co/community' },
        { title: 'r/MachineLearning - Attention and transformer architecture', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'PyTorch Community - Attention implementation patterns', url: 'https://discuss.pytorch.org/' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-rose-500/10 to-pink-500/10"
        borderClass="border-rose-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Attention Mechanisms enable dynamic focus on relevant information by computing importance weights across 
          input sequences. This pattern allows models to selectively attend to different parts of the input based 
          on context, improving performance on tasks requiring selective information processing.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-xs text-gray-400 mb-1">Score</div>
            <div className="text-sm font-medium text-white">Importance weights</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">👁️</div>
            <div className="text-xs text-gray-400 mb-1">Focus</div>
            <div className="text-sm font-medium text-white">Selective attention</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🧠</div>
            <div className="text-xs text-gray-400 mb-1">Multi-head</div>
            <div className="text-sm font-medium text-white">Diverse patterns</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-xs text-gray-400 mb-1">Efficient</div>
            <div className="text-sm font-medium text-white">Sparse computation</div>
          </div>
        </div>
      </TechniqueSection>

      {/* Workflow / Steps */}
      <ListSection
        title="Workflow / Steps"
        items={workflowSteps}
        colorClass="bg-purple-500"
        ordered={true}
      />

      {/* Best Practices */}
      <BestPracticesSection practices={bestPractices} />

      {/* When NOT to Use */}
      <ListSection
        title="When NOT to Use"
        items={whenNotToUse}
        colorClass="bg-red-500"
      />

      {/* Common Pitfalls */}
      <ListSection
        title="Common Pitfalls"
        items={commonPitfalls}
        colorClass="bg-amber-500"
      />

      {/* Key Features */}
      <KeyFeaturesSection features={keyFeatures} />

      {/* KPIs / Success Metrics */}
      <ListSection
        title="KPIs / Success Metrics"
        items={kpiMetrics}
        colorClass="bg-emerald-500"
      />

      {/* Token / Resource Usage */}
      <ListSection
        title="Token / Resource Usage"
        items={tokenUsage}
        colorClass="bg-indigo-500"
      />

      {/* Best Use Cases */}
      <ListSection
        title="Best Use Cases"
        items={bestUseCases}
        colorClass="bg-fuchsia-500"
      />

      {/* References & Further Reading */}
      <ReferencesSection categories={references} />
    </>
  );
};

export default AttentionMechanismsDetails;