'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface SelfRAGDetailsProps {
  selectedTechnique: any;
}

export const SelfRAGDetails: React.FC<SelfRAGDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Assess retrieval necessity (predict whether external knowledge is needed).',
    'Retrieve candidate passages (dense/sparse/hybrid) and optionally rerank.',
    'Draft answer conditioned on top-k context and parametric knowledge.',
    'Self-critique with reflection tokens: rate faithfulness, sufficiency, and usefulness of context and answer.',
    'If low confidence or inconsistencies detected: refine query, re-retrieve, and regenerate.',
    'Finalize answer with calibrated confidence and source attributions.'
  ];

  const bestPractices = [
    'Use retrieval-necessity gating to avoid unnecessary context pulls.',
    'Employ strong rerankers and deduplication to improve context precision before generation.',
    'Constrain critique format (scores + short rationale) to limit reflection drift and token bloat.',
    'Enforce citation grounding: require evidence spans for factual claims.',
    'Cache retrieval results and use semantic compression to control context size.',
    'Track confidence thresholds to trigger re-retrieval vs. abstention/deferral.'
  ];

  const whenNotToUse = [
    'Simple factual queries where standard RAG provides sufficient accuracy.',
    'Latency-sensitive applications that cannot afford the reflection and refinement overhead.',
    'Domains where self-critique may be unreliable due to lack of training data.',
    'Resource-constrained environments where multiple generation rounds are prohibitive.'
  ];

  const commonPitfalls = [
    'Reflection tokens becoming verbose or drifting from useful critique patterns.',
    'Over-reliance on self-assessment without external validation or ground truth.',
    'Infinite loops in refinement when confidence thresholds are poorly calibrated.',
    'Poor retrieval quality undermining the entire self-reflection process.',
    'Insufficient training data for effective self-critique in specialized domains.'
  ];

  const keyFeatures = [
    'Adaptive retrieval necessity assessment and selective context gathering',
    'Self-reflection tokens for rating answer quality and context relevance',
    'Iterative refinement with re-retrieval based on confidence assessment',
    'Integrated citation generation with evidence grounding requirements',
    'Calibrated confidence scoring for answer reliability estimation',
    'Hybrid retrieval combining parametric and retrieved knowledge'
  ];

  const kpiMetrics = [
    'Answer accuracy and factual correctness compared to ground truth.',
    'Retrieval precision: proportion of retrieved passages that are actually useful.',
    'Self-critique calibration: correlation between confidence scores and actual accuracy.',
    'Citation coverage: percentage of claims supported by retrieved evidence.',
    'Refinement effectiveness: improvement in quality through iterative loops.',
    'Computational efficiency: quality gains per additional token or retrieval call.'
  ];

  const tokenUsage = [
    'Base cost includes retrieval assessment, context processing, and initial generation.',
    'Self-critique adds 200-800 tokens per reflection depending on format constraints.',
    'Refinement loops can multiply total cost by 2-4x for complex queries.',
    'Retrieved context compression can reduce input tokens by 30-50%.',
    'Monitor refinement frequency and set maximum iteration limits to control costs.'
  ];

  const bestUseCases = [
    'Factual question answering where accuracy and verifiability are critical.',
    'Research and analysis tasks requiring high-quality source attribution.',
    'Knowledge-intensive domains like medical, legal, or scientific information.',
    'Applications where explaining reasoning and confidence levels adds value.',
    'Systems that need to balance parametric knowledge with up-to-date retrieved information.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection (Asai et al., 2023)', url: 'https://arxiv.org/abs/2310.11511' },
        { title: 'SELF-REFINE: Iterative Refinement with Self-Feedback (Madaan et al., 2023)', url: 'https://arxiv.org/abs/2303.17651' },
        { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al., 2020)', url: 'https://arxiv.org/abs/2005.11401' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain: Self-Reflecting RAG Chains', url: 'https://python.langchain.com/docs/use_cases/question_answering/how_to/self_query' },
        { title: 'LlamaIndex: Self-Reflection and Critique', url: 'https://docs.llamaindex.ai/en/stable/examples/agent/self_reflection_agent/' },
        { title: 'Haystack: Self-Correcting RAG Pipelines', url: 'https://haystack.deepset.ai/tutorials/self-correcting-rag' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Self-RAG official implementation and models', url: '#' },
        { title: 'LangChain reflection and critique chains', url: '#' },
        { title: 'Transformers library with self-reflection capabilities', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'r/MachineLearning - Self-RAG discussions', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'Hugging Face Forums - Self-reflection in NLP', url: 'https://discuss.huggingface.co/' },
        { title: 'LangChain Community - RAG improvements', url: 'https://discord.gg/langchain' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism (short conceptual overview)"
        colorClass="bg-blue-500"
        gradient="from-purple-500/10 to-indigo-500/10"
        borderClass="border-purple-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed">
          Self-RAG augments generation with adaptive retrieval and self-reflection. The model decides if/what to retrieve, 
          generates an answer, then critiques both retrieved context and its own output (via reflection/critique tokens) to 
          improve factuality and relevance, optionally re-retrieving and refining before finalizing with citations.
        </p>
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

export default SelfRAGDetails;