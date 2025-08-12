'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface MapReduceDetailsProps {
  selectedTechnique: any;
}

export const MapReduceDetails: React.FC<MapReduceDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Split input into chunks with balanced size and semantic coherence for optimal processing.',
    'Map phase: process each chunk independently with specialized prompts and consistent output schemas.',
    'Shuffle/partition intermediate results by key or category for logical grouping and aggregation.',
    'Reduce phase: combine mapped results with aggregation strategies (merge, vote, synthesize).',
    'Validate final output for completeness, consistency, and quality against acceptance criteria.',
    'Optimize for fault tolerance with retry logic and graceful handling of partial failures.'
  ];

  const bestPractices = [
    'Design chunks for balanced processing time; avoid skewed data distribution and hotspots.',
    'Use structured output formats (JSON) with consistent schemas to simplify reduction logic.',
    'Implement deterministic mapping functions for consistent results across retry attempts.',
    'Handle stragglers with speculative execution and bounded retries with exponential backoff.',
    'Exploit data locality by colocating compute with storage and caching intermediate results.',
    'For LLM map-reduce summarization, maintain stable chunk sizes and use structure-aware aggregation prompts.',
    'Monitor resource utilization and implement adaptive scaling based on workload characteristics.'
  ];

  const whenNotToUse = [
    'Small datasets where the overhead of distribution exceeds the benefits of parallelization.',
    'Tasks requiring tight coordination between chunks that cannot be processed independently.',
    'Real-time scenarios where the latency of multi-phase processing is unacceptable.',
    'Cases where data dependencies make clean chunk separation difficult or ineffective.',
    'Simple aggregations that can be efficiently handled with single-pass algorithms.'
  ];

  const commonPitfalls = [
    'Poor chunk sizing leading to load imbalance and stragglers affecting overall performance.',
    'Inconsistent output formats from mappers causing reduction phase failures or quality degradation.',
    'Inadequate error handling for partial failures leaving gaps in final aggregated results.',
    'Over-partitioning creating excessive coordination overhead without performance benefits.',
    'Ignoring data locality and network costs in distributed processing environments.',
    'Insufficient validation of intermediate and final results leading to quality issues.'
  ];

  const keyFeatures = [
    'Scalable parallel processing with independent chunk processing and fault tolerance',
    'Two-phase architecture with mapping for transformation and reduction for aggregation',
    'Flexible partitioning strategies supporting key-based and content-based data organization',
    'Robust error handling with retry logic and graceful degradation for partial failures',
    'Performance optimization through load balancing, caching, and adaptive resource scaling',
    'Quality assurance with validation checkpoints and consistency verification across phases'
  ];

  const kpiMetrics = [
    'Processing throughput: Total data volume processed per unit time across all workers.',
    'Load balance efficiency: Variance in processing time across chunks and workers.',
    'Fault tolerance rate: Success rate of handling worker failures and retry operations.',
    'Data locality ratio: Percentage of processing performed with local data access.',
    'Aggregation quality: Consistency and completeness of reduced results vs ground truth.',
    'Resource utilization: CPU, memory, and network efficiency across distributed infrastructure.'
  ];

  const tokenUsage = [
    'Total cost scales with chunk count and aggregation complexity: map tokens + reduce tokens.',
    'Mapper tokens depend on chunk size and prompt complexity; keep chunks consistently sized.',
    'Reducer tokens scale with intermediate result volume; use structured aggregation to minimize bloat.',
    'Overhead from coordination and retries typically adds 10-20% to base processing costs.',
    'Optimize with smaller models for simple mapping operations and stronger models for complex reductions.',
    'Cache stable intermediate results and implement deduplication to reduce redundant processing.'
  ];

  const bestUseCases = [
    'Large-scale document processing requiring consistent analysis across massive corpora.',
    'Distributed data analysis with independent processing and statistical aggregation requirements.',
    'Content summarization at scale with hierarchical reduction and quality consistency.',
    'Batch processing workflows requiring fault tolerance and scalable throughput.',
    'Research data processing with reproducible results and parallel execution capabilities.',
    'ETL pipelines requiring transformation, validation, and aggregation of heterogeneous data sources.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'MapReduce: Simplified Data Processing on Large Clusters (Dean & Ghemawat, 2004)', url: 'https://research.google/pubs/pub62/' },
        { title: 'The Map-Reduce Framework for Distributed Computing (Lämmel, 2008)', url: 'https://userpages.uni-koblenz.de/~laemmel/MapReduce/' },
        { title: 'Resilient Distributed Datasets: A Fault-Tolerant Abstraction (Zaharia et al., 2012)', url: 'https://www.usenix.org/system/files/conference/nsdi12/nsdi12-final138.pdf' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Map-Reduce Document Processing', url: 'https://python.langchain.com/docs/modules/chains/document/' },
        { title: 'Apache Spark Programming Guide', url: 'https://spark.apache.org/docs/latest/programming-guide.html' },
        { title: 'Hadoop MapReduce Tutorial', url: 'https://hadoop.apache.org/docs/current/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain map-reduce document chains for LLM processing', url: '#' },
        { title: 'Apache Spark for large-scale distributed data processing', url: '#' },
        { title: 'Dask for Python-based distributed computing', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Community - Document processing patterns', url: 'https://discord.gg/langchain' },
        { title: 'Apache Spark Community - Distributed processing best practices', url: 'https://spark.apache.org/community.html' },
        { title: 'r/MachineLearning - Large-scale ML processing discussions', url: 'https://www.reddit.com/r/MachineLearning/' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-orange-500/10 to-red-500/10"
        borderClass="border-orange-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Map-Reduce splits large tasks into chunks for parallel processing (map phase), then aggregates results through 
          reduction operations. This pattern enables scalable distributed computing with fault tolerance, load balancing, 
          and efficient resource utilization for data-intensive workloads.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">📂</div>
            <div className="text-xs text-gray-400 mb-1">Split</div>
            <div className="text-sm font-medium text-white">Chunk data</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-xs text-gray-400 mb-1">Map</div>
            <div className="text-sm font-medium text-white">Parallel processing</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🔄</div>
            <div className="text-xs text-gray-400 mb-1">Shuffle</div>
            <div className="text-sm font-medium text-white">Organize results</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-xs text-gray-400 mb-1">Reduce</div>
            <div className="text-sm font-medium text-white">Aggregate output</div>
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

export default MapReduceDetails;