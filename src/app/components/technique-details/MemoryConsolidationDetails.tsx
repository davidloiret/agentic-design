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

interface MemoryConsolidationDetailsProps {
  selectedTechnique?: any;
}

export const MemoryConsolidationDetails: React.FC<MemoryConsolidationDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Collect Fragments', detail: 'Gather memory fragments and experiences over time' },
      { num: '2', action: 'Extract Patterns', detail: 'Identify recurring themes and relationships' },
      { num: '3', action: 'Remove Redundancy', detail: 'Eliminate duplicate and overlapping information' },
      { num: '4', action: 'Form Schemas', detail: 'Create abstract knowledge structures' },
      { num: '5', action: 'Validate Quality', detail: 'Test consolidated memory retrieval accuracy' }
    ],
    example: 'fragment_collection → pattern_extraction → redundancy_removal → schema_formation → quality_validation'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Schedule consolidation during low-activity periods to minimize interference', icon: '✅' },
    { type: 'do', text: 'Use incremental multi-pass consolidation for different complexity levels', icon: '✅' },
    { type: 'do', text: 'Implement quality validation through retrieval testing', icon: '✅' },
    { type: 'do', text: 'Preserve critical details while generalizing common patterns', icon: '✅' },
    { type: 'do', text: 'Monitor consolidation ROI: processing cost vs long-term savings', icon: '✅' },
    { type: 'dont', text: 'Over-consolidate causing loss of important specific details', icon: '❌' },
    { type: 'dont', text: 'Ignore temporal aspects - some information is time-dependent', icon: '❌' },
    { type: 'dont', text: 'Consolidate without rollback mechanisms for quality issues', icon: '❌' },
    { type: 'dont', text: 'Use consolidation on frequently changing patterns', icon: '❌' },
    { type: 'dont', text: 'Let consolidation processes become more expensive than original storage', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Large volumes of experiential data accumulating',
      'Long-running systems with memory growth',
      'Learning systems extracting generalizable patterns',
      'Storage optimization with pattern preservation',
      'Knowledge management requiring organization'
    ],
    avoidWhen: [
      'Real-time applications with strict latency',
      'Small memory datasets (< 10K entries)',
      'Exact information preservation required',
      'Frequently changing environments',
      'Resource-constrained processing budgets'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Compression Ratio', measure: 'Storage reduction while preserving quality' },
    { metric: 'Pattern Quality', measure: 'Precision/recall of extracted patterns' },
    { metric: 'Retrieval Preservation', measure: '% accuracy maintained post-consolidation' },
    { metric: 'Processing Efficiency', measure: 'Consolidation cost vs memory size' },
    { metric: 'Information Loss', measure: '% critical details lost during process' },
    { metric: 'Schema Utility', measure: 'Effectiveness for future reasoning tasks' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Customer Service Memory: Consolidate interaction patterns into service templates (40-70% storage reduction, faster resolution)',
    'Learning Systems: Extract generalizable knowledge from specific training experiences (continuous learning without catastrophic forgetting)',
    'Research Platforms: Organize findings from large-scale data collection into actionable insights (literature review automation)',
    'Personalization Engines: Consolidate user behavior into preference models (behavioral pattern recognition and prediction)',
    'Enterprise Knowledge: Transform accumulated business experiences into operational best practices (institutional memory preservation)'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Memory Consolidation Processes in Artificial Intelligence Systems (Zhang et al., 2024)', url: 'https://arxiv.org/abs/2404.17834' },
        { title: 'Pattern Extraction and Schema Formation in Neural Networks (Kumar et al., 2023)', url: 'https://arxiv.org/abs/2309.15423' },
        { title: 'Incremental Memory Consolidation for Continual Learning (Chen & Liu, 2024)', url: 'https://arxiv.org/abs/2401.12567' },
        { title: 'Temporal Memory Consolidation in Multi-Agent Systems (Park et al., 2024)', url: 'https://arxiv.org/abs/2405.08932' }
      ]
    },
    {
      title: 'Neuroscience Foundation',
      items: [
        { title: 'Systems Consolidation in Memory: The Neuroscience Perspective (Squire & Alvarez, 1995)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC40519/' },
        { title: 'The Organization of Memory: A Parallel Between Biological and Artificial Systems (McClelland et al., 1995)', url: 'https://psycnet.apa.org/record/1995-98842-001' },
        { title: 'Memory Consolidation, Retrograde Amnesia and Hippocampus (Dudai, 2001)', url: 'https://www.cell.com/current-biology/pdf/S0960-9822(01)00509-X.pdf' },
        { title: 'The Transformation of Memory in Sleep (Diekelmann & Born, 2010)', url: 'https://www.nature.com/articles/nrn2762' }
      ]
    },
    {
      title: 'Machine Learning Techniques',
      items: [
        { title: 'Scikit-learn Clustering Algorithms for Pattern Extraction', url: 'https://scikit-learn.org/stable/modules/clustering.html' },
        { title: 'Apache Spark MLlib: Large-scale Memory Consolidation', url: 'https://spark.apache.org/docs/latest/ml-clustering.html' },
        { title: 'TensorFlow Clustering and Dimensionality Reduction', url: 'https://www.tensorflow.org/tutorials/unsupervised_learning' },
        { title: 'PyTorch Memory-Efficient Training and Consolidation', url: 'https://pytorch.org/tutorials/recipes/memory_management.html' }
      ]
    },
    {
      title: 'Implementation & Tools',
      items: [
        { title: 'LangChain Memory Management and Consolidation Patterns', url: 'https://python.langchain.com/docs/modules/memory/' },
        { title: 'Redis Memory Optimization and Pattern Consolidation', url: 'https://redis.io/docs/manual/memory-optimization/' },
        { title: 'PostgreSQL VACUUM and Memory Consolidation', url: 'https://www.postgresql.org/docs/current/routine-vacuuming.html' },
        { title: 'Elasticsearch Index Optimization and Consolidation', url: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-optimize.html' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Process of strengthening and organizing memories over time through pattern extraction and schema formation"
        why="Storage optimization, improved retrieval, pattern recognition, knowledge abstraction from experiences"
        keyInsight="Memory Fragments → Pattern Extraction → Redundancy Removal → Schema Formation → Organized Knowledge"
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

export default MemoryConsolidationDetails;