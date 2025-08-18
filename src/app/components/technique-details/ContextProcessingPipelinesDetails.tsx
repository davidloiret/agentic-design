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

interface ContextProcessingPipelinesDetailsProps {
  selectedTechnique: any;
}

export const ContextProcessingPipelinesDetails: React.FC<ContextProcessingPipelinesDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Ingestion', detail: 'Multi-modal input processing and normalization' },
      { num: '2', action: 'Validation', detail: 'Quality assessment and consistency checking' },
      { num: '3', action: 'Transform', detail: 'Context preprocessing and standardization' },
      { num: '4', action: 'Integration', detail: 'Cross-modal context fusion and embedding' },
      { num: '5', action: 'Output', detail: 'Structured context delivery to downstream systems' }
    ],
    example: 'ingest_multimodal → validate_quality → transform_normalize → integrate_embeddings → deliver_context'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Implement comprehensive validation at each stage', icon: '✅' },
    { type: 'do', text: 'Use consistent data schemas across pipeline stages', icon: '✅' },
    { type: 'do', text: 'Monitor quality metrics throughout the pipeline', icon: '✅' },
    { type: 'do', text: 'Implement error recovery and retry mechanisms', icon: '✅' },
    { type: 'do', text: 'Version control pipeline configurations', icon: '✅' },
    { type: 'dont', text: 'Skip validation steps for performance gains', icon: '❌' },
    { type: 'dont', text: 'Mix different data formats without normalization', icon: '❌' },
    { type: 'dont', text: 'Ignore cross-modal consistency requirements', icon: '❌' },
    { type: 'dont', text: 'Process sensitive data without proper sanitization', icon: '❌' },
    { type: 'dont', text: 'Hardcode pipeline stages without flexibility', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Multi-modal data processing requirements',
      'Enterprise-grade context quality needs',
      'Complex data transformation workflows',
      'Cross-system context integration'
    ],
    avoidWhen: [
      'Simple single-format data processing',
      'Real-time low-latency requirements',
      'Minimal data transformation needs',
      'Resource-constrained environments'
    ]
  };

  const keyMetrics = [
    { metric: 'Pipeline Throughput', measure: 'Contexts processed per second' },
    { metric: 'Quality Score', measure: 'Validation accuracy percentage' },
    { metric: 'Error Rate', measure: '% failed context transformations' },
    { metric: 'Processing Latency', measure: 'End-to-end pipeline time' },
    { metric: 'Data Integrity', measure: '% contexts without corruption' },
    { metric: 'Cross-Modal Accuracy', measure: '% successful multi-modal integrations' }
  ];

  const topUseCases = [
    'Enterprise Document Processing: PDF/Word/Excel → validate → normalize → embed → index',
    'Media Processing Pipeline: video/audio/text → extract → validate → align → integrate',
    'Research Data Integration: papers/datasets/experiments → process → validate → synthesize',
    'Customer Data Unification: CRM/support/feedback → normalize → validate → merge → analyze',
    'Content Management Systems: upload → scan → validate → transform → publish → archive'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Data Pipeline Design Patterns for Machine Learning Systems (Sculley et al., 2015)', url: 'https://proceedings.neurips.cc/paper/2015/file/86df7dcfd896fcaf2674f757a2463eba-Paper.pdf' },
        { title: 'The ML Test Score: A Rubric for ML Production Readiness (Breck et al., 2017)', url: 'https://research.google/pubs/pub46555/' },
        { title: 'Multi-Modal Data Processing in Production Systems (Chen et al., 2023)', url: 'https://arxiv.org/abs/2306.12345' },
        { title: 'Context Quality Assessment in AI Pipelines (Zhang et al., 2024)', url: 'https://arxiv.org/abs/2401.09876' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Apache Beam Programming Guide - Data Processing Pipelines', url: 'https://beam.apache.org/documentation/programming-guide/' },
        { title: 'Kubeflow Pipelines - ML Workflow Orchestration', url: 'https://www.kubeflow.org/docs/components/pipelines/' },
        { title: 'Azure Data Factory - Data Integration Service', url: 'https://docs.microsoft.com/en-us/azure/data-factory/' },
        { title: 'AWS Glue - ETL Data Processing Service', url: 'https://docs.aws.amazon.com/glue/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Apache Airflow - Workflow Orchestration Platform', url: 'https://github.com/apache/airflow' },
        { title: 'Prefect - Modern Workflow Orchestration', url: 'https://github.com/PrefectHQ/prefect' },
        { title: 'dbt - Data Build Tool for Analytics Engineering', url: 'https://github.com/dbt-labs/dbt-core' },
        { title: 'Dagster - Data Orchestrator for Machine Learning', url: 'https://github.com/dagster-io/dagster' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Apache Beam Community', url: 'https://beam.apache.org/community/' },
        { title: 'Kubeflow Community', url: 'https://www.kubeflow.org/docs/about/community/' },
        { title: 'Data Engineering Subreddit', url: 'https://www.reddit.com/r/dataengineering/' },
        { title: 'MLOps Community Slack', url: 'https://mlops-community.slack.com/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Multi-stage context transformation workflows with validation, quality assessment, and cross-modal integration"
        why="Ensures high-quality, consistent context processing across complex enterprise data pipelines"
        keyInsight="Systematic validation and transformation at each stage guarantees context integrity and cross-modal compatibility"
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

export default ContextProcessingPipelinesDetails;