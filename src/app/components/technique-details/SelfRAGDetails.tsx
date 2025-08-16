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

interface SelfRAGDetailsProps {
  selectedTechnique: any;
}

export const SelfRAGDetails: React.FC<SelfRAGDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Retrieval Gate', detail: 'Assess whether external knowledge is needed for the query' },
      { num: '2', action: 'Retrieve & Rank', detail: 'Fetch relevant passages and apply neural reranking' },
      { num: '3', action: 'Generate Draft', detail: 'Create initial response using retrieved context' },
      { num: '4', action: 'Self-Critique', detail: 'Use reflection tokens to evaluate response quality' },
      { num: '5', action: 'Refine Output', detail: 'Iteratively improve based on self-assessment' }
    ],
    example: 'query → retrieval_gate → retrieve → generate → self_critique → [refine] → final_response'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Train models with reflection tokens ([Retrieve], [IsRel], [IsSup], [IsUse])', icon: '✅' },
    { type: 'do', text: 'Implement retrieval necessity prediction to avoid unnecessary context', icon: '✅' },
    { type: 'do', text: 'Use calibrated confidence thresholds for triggering refinement', icon: '✅' },
    { type: 'do', text: 'Enforce citation requirements with evidence grounding', icon: '✅' },
    { type: 'do', text: 'Cache reflection outputs and retrieval results for efficiency', icon: '✅' },
    { type: 'dont', text: 'Allow unconstrained reflection tokens that become verbose', icon: '❌' },
    { type: 'dont', text: 'Skip validation of self-critique calibration against ground truth', icon: '❌' },
    { type: 'dont', text: 'Create infinite refinement loops without iteration limits', icon: '❌' },
    { type: 'dont', text: 'Rely solely on self-assessment without external validation', icon: '❌' },
    { type: 'dont', text: 'Ignore computational cost of multiple generation rounds', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Factual accuracy and verifiability are critical requirements',
      'Domain expertise requires balancing parametric and retrieved knowledge',
      'Applications need confidence calibration and uncertainty quantification',
      'High-stakes decisions requiring explainable reasoning and citations',
      'Knowledge-intensive tasks in medical, legal, or scientific domains'
    ],
    avoidWhen: [
      'Simple queries where standard RAG provides sufficient accuracy',
      'Real-time applications with strict latency constraints',
      'Resource-constrained environments limiting multiple generation rounds',
      'Domains with insufficient training data for reliable self-critique',
      'Applications where citation overhead is unnecessary'
    ]
  };

  const keyMetrics = [
    { metric: 'Answer Faithfulness', measure: 'Factual accuracy and consistency with retrieved evidence' },
    { metric: 'Reflection Calibration', measure: 'Correlation between confidence scores and actual accuracy' },
    { metric: 'Retrieval Precision', measure: 'Proportion of retrieved passages that are genuinely useful' },
    { metric: 'Citation Coverage', measure: 'Percentage of claims supported by retrieved evidence' },
    { metric: 'Refinement Effectiveness', measure: 'Quality improvement through iterative self-correction' },
    { metric: 'Computational Efficiency', measure: 'Quality gains per additional token or retrieval call' }
  ];

  const topUseCases = [
    'Medical Q&A: Clinical decision support requiring high accuracy and evidence-based responses',
    'Legal Research: Case law analysis with citation requirements and confidence assessment',
    'Scientific Literature Review: Research synthesis with source attribution and uncertainty quantification',
    'Financial Analysis: Investment research requiring balanced parametric and real-time market data',
    'Educational Content: Academic tutoring with verified information and learning confidence tracking'
  ];

  const references = [
    {
      title: 'Foundational Papers & Self-RAG Research',
      items: [
        { title: 'Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection (Asai et al., 2023)', url: 'https://arxiv.org/abs/2310.11511' },
        { title: 'SELF-REFINE: Iterative Refinement with Self-Feedback (Madaan et al., 2023)', url: 'https://arxiv.org/abs/2303.17651' },
        { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al., 2020)', url: 'https://arxiv.org/abs/2005.11401' },
        { title: 'Teaching Language Models to Self-Correct via Reinforcement Learning (Welleck et al., 2023)', url: 'https://arxiv.org/abs/2305.09635' }
      ]
    },
    {
      title: 'Reflection Tokens & Training Methods',
      items: [
        { title: 'Self-RAG Official Implementation: Reflection Token Training', url: 'https://github.com/AkariAsai/self-rag' },
        { title: 'Constitutional AI: Harmlessness from AI Feedback (Bai et al., 2022)', url: 'https://arxiv.org/abs/2212.08073' },
        { title: 'Training Language Models with Language Feedback at Scale (Scheurer et al., 2023)', url: 'https://arxiv.org/abs/2303.16755' },
        { title: 'Self-Consistency Improves Chain of Thought Reasoning (Wang et al., 2022)', url: 'https://arxiv.org/abs/2203.11171' }
      ]
    },
    {
      title: 'Retrieval & Context Assessment',
      items: [
        { title: 'When Not to Trust Language Models: Investigating Effectiveness of Parametric and Non-Parametric Memories (Mallen et al., 2023)', url: 'https://arxiv.org/abs/2212.10511' },
        { title: 'Active Retrieval Augmented Generation (Jiang et al., 2023)', url: 'https://arxiv.org/abs/2305.06983' },
        { title: 'FiD: Fusion-in-Decoder for Open-Domain Question Answering (Izacard & Grave, 2021)', url: 'https://arxiv.org/abs/2007.01282' },
        { title: 'Dense Passage Retrieval for Open-Domain Question Answering (Karpukhin et al., 2020)', url: 'https://arxiv.org/abs/2004.04906' }
      ]
    },
    {
      title: 'Implementation Frameworks & Tools',
      items: [
        { title: 'LangChain Self-Query Retrieval and Reflection Chains', url: 'https://python.langchain.com/docs/use_cases/question_answering/how_to/self_query' },
        { title: 'LlamaIndex Self-Reflection Agent Implementation', url: 'https://docs.llamaindex.ai/en/stable/examples/agent/self_reflection_agent/' },
        { title: 'Haystack Self-Correcting RAG Pipeline Tutorial', url: 'https://haystack.deepset.ai/tutorials/self-correcting-rag' },
        { title: 'Transformers Library: Self-RAG Model Integration', url: 'https://huggingface.co/models?other=self-rag' }
      ]
    },
    {
      title: 'Evaluation & Calibration Methods',
      items: [
        { title: 'RAGAS: Automated Evaluation of RAG Applications', url: 'https://github.com/explodinggradients/ragas' },
        { title: 'TruLens: Evaluation and Observability for LLM Applications', url: 'https://www.trulens.org/trulens_eval/getting_started/core_concepts/rag_triad/' },
        { title: 'Calibrating Sequence Likelihood Improves Conditional Language Generation (Zhao et al., 2022)', url: 'https://arxiv.org/abs/2210.00045' },
        { title: 'Teaching Models to Express Their Uncertainty in Words (Lin et al., 2022)', url: 'https://arxiv.org/abs/2205.14334' }
      ]
    },
    {
      title: 'Production Deployment & Optimization',
      items: [
        { title: 'LangSmith: Monitoring and Evaluation for Self-RAG Systems', url: 'https://docs.smith.langchain.com/' },
        { title: 'OpenAI Function Calling for Self-Critique Implementation', url: 'https://platform.openai.com/docs/guides/function-calling' },
        { title: 'Anthropic Constitutional AI Training Methods', url: 'https://www.anthropic.com/news/constitutional-ai-harmlessness-from-ai-feedback' },
        { title: 'Weights & Biases: Experiment Tracking for Self-RAG', url: 'https://wandb.ai/site/articles/rag-evaluation-with-ragas' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="RAG system with adaptive retrieval decisions and self-reflection using trained reflection tokens for quality assessment"
        why="Improves factual accuracy and reduces hallucinations through iterative self-critique and selective knowledge retrieval"
        keyInsight="Reflection tokens ([Retrieve], [IsRel], [IsSup], [IsUse]) enable models to assess retrieval necessity and response quality"
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

export default SelfRAGDetails;