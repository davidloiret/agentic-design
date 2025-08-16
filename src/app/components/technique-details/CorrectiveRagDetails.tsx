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

interface CorrectiveRagDetailsProps {
  selectedTechnique: any;
}

export const CorrectiveRagDetails: React.FC<CorrectiveRagDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Initial Retrieval', detail: 'Retrieve candidate documents using dense/sparse/hybrid search' },
      { num: '2', action: 'Quality Assessment', detail: 'Evaluate retrieval quality with confidence scoring (high/medium/low)' },
      { num: '3', action: 'Corrective Action', detail: 'Refine, supplement, or re-retrieve based on confidence band' },
      { num: '4', action: 'Knowledge Refinement', detail: 'Decompose and recompose evidence for optimal context' },
      { num: '5', action: 'Generate & Verify', detail: 'Generate response with citations and optional verification' }
    ],
    example: 'query → retrieve → evaluate_quality → [correct/supplement/re-retrieve] → refine → generate'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Implement explicit retrieval quality evaluator with calibrated confidence thresholds', icon: '✅' },
    { type: 'do', text: 'Use knowledge refinement with decompose-then-recompose for evidence processing', icon: '✅' },
    { type: 'do', text: 'Apply web search supplementation for medium confidence retrieval results', icon: '✅' },
    { type: 'do', text: 'Enforce strict citation requirements with provenance tracking', icon: '✅' },
    { type: 'do', text: 'Cache evaluator outputs and refined knowledge for efficiency', icon: '✅' },
    { type: 'dont', text: 'Allow evaluator miscalibration without regular confidence score validation', icon: '❌' },
    { type: 'dont', text: 'Skip query drift prevention during corrective re-retrieval', icon: '❌' },
    { type: 'dont', text: 'Create unbounded correction loops without cost and latency controls', icon: '❌' },
    { type: 'dont', text: 'Mix outdated and fresh sources without temporal reconciliation', icon: '❌' },
    { type: 'dont', text: 'Neglect abstention mechanisms when confidence remains persistently low', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'High-stakes applications requiring verified accuracy and provenance',
      'Rapidly changing domains with frequent content updates',
      'Noisy or heterogeneous knowledge bases with quality variation',
      'Long-tail queries where initial retrieval often fails',
      'Regulated environments requiring explicit evidence grounding'
    ],
    avoidWhen: [
      'Real-time applications with strict latency requirements',
      'Closed-book tasks where parametric knowledge suffices',
      'High-quality homogeneous corpora with consistent recall',
      'Environments prohibiting external web access for supplementation',
      'Simple factual queries with reliable standard RAG performance'
    ]
  };

  const keyMetrics = [
    { metric: 'Answer Faithfulness', measure: 'Factual correctness and groundedness in retrieved evidence' },
    { metric: 'Evaluator Calibration', measure: 'Accuracy of quality confidence predictions (ROC-AUC, ECE)' },
    { metric: 'Correction Effectiveness', measure: 'Quality improvement from corrective actions' },
    { metric: 'Retrieval Precision', measure: 'Relevance of documents after correction' },
    { metric: 'Citation Coverage', measure: 'Percentage of claims supported by evidence' },
    { metric: 'Action Distribution', measure: 'Balance of use/supplement/re-retrieve decisions' }
  ];

  const topUseCases = [
    'Legal Research: Case law analysis requiring verified sources and temporal accuracy',
    'Medical Q&A: Clinical decision support with evidence-based recommendations and safety checks',
    'Financial Analysis: Market research combining real-time data with historical knowledge',
    'Policy Research: Government and regulatory information requiring up-to-date accuracy',
    'Technical Documentation: Software and API documentation with version-specific corrections'
  ];

  const references = [
    {
      title: 'Foundational Papers & CRAG Research',
      items: [
        { title: 'Corrective Retrieval Augmented Generation (Yan et al., 2024)', url: 'https://arxiv.org/abs/2401.15884' },
        { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al., 2020)', url: 'https://arxiv.org/abs/2005.11401' },
        { title: 'Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection (Asai et al., 2023)', url: 'https://arxiv.org/abs/2310.11511' },
        { title: 'Active Retrieval Augmented Generation (Jiang et al., 2023)', url: 'https://arxiv.org/abs/2305.06983' }
      ]
    },
    {
      title: 'Quality Assessment & Evaluation',
      items: [
        { title: 'Searching for Best Practices in Retrieval-Augmented Generation (Barnett et al., 2024)', url: 'https://arxiv.org/abs/2407.01219' },
        { title: 'RAGAS: Automated Evaluation of Retrieval Augmented Generation (Es et al., 2023)', url: 'https://arxiv.org/abs/2309.15217' },
        { title: 'TruLens: Evaluation and Tracking for LLM Applications', url: 'https://www.trulens.org/trulens_eval/getting_started/core_concepts/rag_triad/' },
        { title: 'RGB: A Comprehensive Evaluation Benchmark for RAG Systems (Chen et al., 2024)', url: 'https://arxiv.org/abs/2309.01431' }
      ]
    },
    {
      title: 'Knowledge Refinement & Processing',
      items: [
        { title: 'Lost in the Middle: How Language Models Use Long Contexts (Liu et al., 2023)', url: 'https://arxiv.org/abs/2307.03172' },
        { title: 'LongLLMLingua: Accelerating Large Language Model Inference via Prompt Compression (Jiang et al., 2023)', url: 'https://arxiv.org/abs/2310.06839' },
        { title: 'Chain-of-Verification Reduces Hallucination in Large Language Models (Dhuliawala et al., 2023)', url: 'https://arxiv.org/abs/2309.11495' },
        { title: 'Factuality Enhanced Language Models for Open-Ended Text Generation (Lee et al., 2022)', url: 'https://arxiv.org/abs/2206.04624' }
      ]
    },
    {
      title: 'Implementation Frameworks & Tools',
      items: [
        { title: 'LlamaIndex Corrective RAG Workflow Implementation', url: 'https://docs.llamaindex.ai/en/stable/examples/workflow/corrective_rag_pack/' },
        { title: 'LangChain RAG Evaluation and Correction Chains', url: 'https://python.langchain.com/docs/use_cases/question_answering/' },
        { title: 'Haystack Document Evaluation and Reranking Components', url: 'https://docs.haystack.deepset.ai/docs/ranker' },
        { title: 'DSPy: Optimizing LM Prompts and Weights for RAG Systems', url: 'https://github.com/stanfordnlp/dspy' }
      ]
    },
    {
      title: 'Web Search Integration & Supplementation',
      items: [
        { title: 'Bing Search API for Real-Time Information Retrieval', url: 'https://docs.microsoft.com/en-us/bing/search-apis/' },
        { title: 'Google Search API Integration for Knowledge Supplementation', url: 'https://developers.google.com/custom-search/v1/overview' },
        { title: 'Tavily Search API for AI Applications', url: 'https://docs.tavily.com/' },
        { title: 'You.com Search API for Developer Integration', url: 'https://documentation.you.com/api-reference' }
      ]
    },
    {
      title: 'Production Deployment & Monitoring',
      items: [
        { title: 'LangSmith: Production Monitoring for RAG Applications', url: 'https://docs.smith.langchain.com/' },
        { title: 'Weights & Biases: Experiment Tracking for CRAG Systems', url: 'https://wandb.ai/' },
        { title: 'Arize AI: ML Observability for RAG Performance Monitoring', url: 'https://arize.com/blog/retrieval-augmented-generation-rag-evaluation/' },
        { title: 'Neptune: Experiment Management for RAG System Optimization', url: 'https://neptune.ai/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Enhanced RAG with explicit retrieval quality evaluation and corrective actions based on confidence scoring"
        why="Reduces hallucinations and improves accuracy through quality assessment and adaptive correction strategies"
        keyInsight="Three-tier correction strategy: refine high-confidence, supplement medium-confidence, re-retrieve low-confidence results"
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