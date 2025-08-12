'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';


export const SlidingWindowDetails = () => {
  const workflowSteps = [
    'Define window size parameters based on computational limits, task complexity, and quality requirements.',
    'Implement efficient data structures for window management with fast insertion, deletion, and access patterns.',
    'Design eviction policies: FIFO, LRU, temporal decay, or importance-based retention strategies.',
    'Process incoming data incrementally while maintaining window boundaries and consistency constraints.',
    'Apply sliding operations: move window, update aggregations, and refresh computational state.',
    'Monitor window performance metrics and adapt size or eviction policies based on task effectiveness.'
  ];

  const bestPractices = [
    'Choose window size based on task context length requirements balanced against computational constraints.',
    'Use circular buffers and efficient data structures to minimize memory allocation and garbage collection.',
    'Implement overlapping windows for continuity when strict boundaries would cause information loss.',
    'Design hybrid strategies combining recency, frequency, and importance factors for intelligent eviction.',
    'Cache computed features and summaries at window boundaries to reduce redundant processing overhead.',
    'Monitor window hit rates and quality metrics to optimize size and eviction policy parameters.',
    'Implement graceful degradation for edge cases when window constraints conflict with task requirements.'
  ];

  const whenNotToUse = [
    'Small datasets that fit entirely in memory without requiring windowing for resource management.',
    'Tasks requiring access to complete historical context where windowing would degrade quality significantly.',
    'Real-time scenarios where window management overhead impacts latency requirements unacceptably.',
    'Stateless operations where temporal locality and sliding window benefits are not applicable.',
    'Simple stream processing where basic buffering is sufficient without sophisticated window management.'
  ];

  const commonPitfalls = [
    'Window size too small causing excessive context loss and degraded task performance.',
    'Inefficient eviction policies that discard important information while retaining irrelevant data.',
    'Poor boundary handling causing discontinuities and inconsistencies at window edges.',
    'Memory leaks from improperly managed window data structures and cleanup operations.',
    'Inadequate monitoring of window effectiveness leading to suboptimal size and policy configurations.',
    'Ignoring task-specific temporal patterns when designing window management strategies.'
  ];

  const keyFeatures = [
    'Configurable window sizes with dynamic adjustment based on resource availability and task requirements',
    'Multiple eviction policies supporting FIFO, LRU, importance-based, and hybrid retention strategies',
    'Efficient data structures optimized for sliding window operations and memory management',
    'Overlapping window support for maintaining context continuity across window boundaries',
    'Performance monitoring with metrics tracking window hit rates and task quality correlation',
    'Adaptive window management with automatic size and policy optimization based on usage patterns'
  ];

  const kpiMetrics = [
    'Memory utilization efficiency: Ratio of useful context retained vs total memory consumption.',
    'Window hit rate: Percentage of required information available within the current window.',
    'Context continuity: Quality preservation across window boundaries and sliding operations.',
    'Eviction accuracy: Precision of removing least important information while preserving critical context.',
    'Processing throughput: Data processing rate improvement from efficient window management.',
    'Quality degradation: Impact of windowing on task performance compared to unlimited context.'
  ];

  const tokenUsage = [
    'Token usage scales with window size: larger windows consume more tokens but provide better context.',
    'Sliding operations add minimal overhead; primary cost is in context processing within the window.',
    'Smart eviction can reduce token usage by 30-70% while maintaining 80-90% of context quality.',
    'Overlapping windows increase token usage by overlap percentage but improve continuity.',
    'Monitor token efficiency ratio: quality per token to optimize window size and eviction policies.',
    'Cache window summaries and embeddings to reduce redundant token consumption across slides.'
  ];

  const bestUseCases = [
    'Long document processing requiring incremental analysis with bounded memory consumption.',
    'Streaming data analysis where recent information is more relevant than historical data.',
    'Real-time conversation systems maintaining contextual awareness within resource constraints.',
    'Time-series analysis with temporal locality where recent patterns are most predictive.',
    'Large-scale text processing requiring efficient context window management for quality and performance.',
    'Interactive systems needing responsive performance while preserving relevant conversational history.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Attention Is All You Need (Vaswani et al., 2017)', url: 'https://arxiv.org/abs/1706.03762' },
        { title: 'Sliding Window Attention for Efficient Processing of Long Sequences', url: 'https://arxiv.org/abs/2004.05150' },
        { title: 'Longformer: The Long-Document Transformer (Beltagy et al., 2020)', url: 'https://arxiv.org/abs/2004.05150' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Hugging Face Transformers - Long Document Processing', url: 'https://huggingface.co/docs/transformers/model_doc/longformer' },
        { title: 'OpenAI GPT Context Window Management', url: 'https://platform.openai.com/docs/guides/text-generation/managing-tokens' },
        { title: 'LangChain Memory Management and Sliding Windows', url: 'https://python.langchain.com/docs/modules/memory/types/buffer_window' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain ConversationBufferWindowMemory for sliding context windows', url: '#' },
        { title: 'Transformers sliding window attention implementations', url: '#' },
        { title: 'Apache Kafka for streaming data sliding window operations', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Hugging Face Community - Long sequence processing strategies', url: 'https://huggingface.co/community' },
        { title: 'r/MachineLearning - Attention mechanisms and sliding windows', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'OpenAI Community - Context management best practices', url: 'https://community.openai.com/' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-indigo-500/10 to-purple-500/10"
        borderClass="border-indigo-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Sliding Window maintains a fixed-size context buffer that moves through data streams, automatically evicting 
          old information while incorporating new content. This pattern enables bounded memory usage with configurable 
          retention policies optimized for temporal locality and resource constraints.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🪟</div>
            <div className="text-xs text-gray-400 mb-1">Window</div>
            <div className="text-sm font-medium text-white">Fixed-size buffer</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">➡️</div>
            <div className="text-xs text-gray-400 mb-1">Sliding</div>
            <div className="text-sm font-medium text-white">Continuous movement</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🗑️</div>
            <div className="text-xs text-gray-400 mb-1">Eviction</div>
            <div className="text-sm font-medium text-white">Smart retention</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-xs text-gray-400 mb-1">Efficiency</div>
            <div className="text-sm font-medium text-white">Bounded memory</div>
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

export default SlidingWindowDetails;