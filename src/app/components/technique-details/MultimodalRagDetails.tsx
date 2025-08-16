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

interface MultimodalRagDetailsProps {
  selectedTechnique: any;
}

export const MultimodalRagDetails: React.FC<MultimodalRagDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Multi-Modal Ingest', detail: 'Process text, images, audio, video with modality-specific preprocessing' },
      { num: '2', action: 'Index & Encode', detail: 'Create per-modality embeddings using specialized encoders (CLIP, BLIP-2)' },
      { num: '3', action: 'Query & Retrieve', detail: 'Search across modalities using hybrid retrieval strategies' },
      { num: '4', action: 'Fusion & Rerank', detail: 'Combine multi-modal results with learned fusion weights' },
      { num: '5', action: 'Generate & Cite', detail: 'Use vision-language models with cross-modal evidence citations' }
    ],
    example: 'multi_modal_query → [text_search, image_search, audio_search] → fusion → vlm_generation → response'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use modality-specific encoders (CLIP for vision, Whisper for audio)', icon: '✅' },
    { type: 'do', text: 'Implement hybrid retrieval combining lexical and vector search per modality', icon: '✅' },
    { type: 'do', text: 'Apply learned fusion weights calibrated for different modality combinations', icon: '✅' },
    { type: 'do', text: 'Cache OCR, ASR, and visual features to reduce preprocessing overhead', icon: '✅' },
    { type: 'do', text: 'Include temporal alignment for audio/video with precise timestamps', icon: '✅' },
    { type: 'dont', text: 'Rely solely on text embeddings for visual or audio content', icon: '❌' },
    { type: 'dont', text: 'Skip quality validation for OCR/ASR outputs that may be noisy', icon: '❌' },
    { type: 'dont', text: 'Inline raw media files instead of using feature references', icon: '❌' },
    { type: 'dont', text: 'Mix incomparable similarity scores across modalities without calibration', icon: '❌' },
    { type: 'dont', text: 'Ignore privacy and compliance requirements for sensitive media content', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Document analysis requiring understanding of both text and visual elements',
      'Media-rich content search across images, videos, and audio',
      'E-commerce and product discovery with visual and textual attributes',
      'Educational content combining slides, audio lectures, and notes',
      'Healthcare applications integrating medical imaging with clinical text'
    ],
    avoidWhen: [
      'Pure text-based applications where other modalities add no value',
      'Strict latency requirements incompatible with multi-modal processing',
      'Limited computational resources unable to handle vision/audio models',
      'Privacy-sensitive environments restricting image/audio processing',
      'Domains with poor OCR/ASR quality where visual/audio signals are unreliable'
    ]
  };

  const keyMetrics = [
    { metric: 'Cross-Modal Retrieval', measure: 'Recall@k and MRR across different modality combinations' },
    { metric: 'Fusion Effectiveness', measure: 'Performance improvement from multi-modal vs single-modal retrieval' },
    { metric: 'Generation Faithfulness', measure: 'Accuracy of vision-language model outputs with multi-modal evidence' },
    { metric: 'Citation Quality', measure: 'Precision of cross-modal evidence attribution and source linking' },
    { metric: 'Modality Coverage', measure: 'Balanced utilization of available modalities in retrieval results' },
    { metric: 'Processing Efficiency', measure: 'Latency and cost per modality including preprocessing overhead' }
  ];

  const topUseCases = [
    'Scientific Document Analysis: Research papers with figures, tables, and mathematical equations',
    'E-commerce Search: Product discovery combining visual appearance with textual descriptions',
    'Educational Content: Course materials integrating lecture slides, audio, and supplementary text',
    'Technical Support: Troubleshooting guides with screenshots, videos, and written instructions',
    'Medical Research: Clinical studies combining medical imaging, patient records, and literature'
  ];

  const references = [
    {
      title: 'Foundational Papers & Multimodal RAG Research',
      items: [
        { title: 'Ask in Any Modality: A Comprehensive Survey on Multimodal Retrieval-Augmented Generation (Zhang et al., 2025)', url: 'https://arxiv.org/abs/2502.08826' },
        { title: 'Benchmarking Retrieval-Augmented Generation in Multi-Modal Contexts (Wang et al., 2025)', url: 'https://arxiv.org/abs/2502.17297' },
        { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al., 2020)', url: 'https://arxiv.org/abs/2005.11401' },
        { title: 'Multimodal RAG: A Comprehensive Survey (Li et al., 2024)', url: 'https://arxiv.org/abs/2411.14021' }
      ]
    },
    {
      title: 'Vision-Language Models & Encoders',
      items: [
        { title: 'CLIP: Learning Transferable Visual Representations From Natural Language Supervision (Radford et al., 2021)', url: 'https://arxiv.org/abs/2103.00020' },
        { title: 'BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders (Li et al., 2023)', url: 'https://arxiv.org/abs/2301.12597' },
        { title: 'LLaVA: Large Language and Vision Assistant (Liu et al., 2024)', url: 'https://arxiv.org/abs/2304.08485' },
        { title: 'Chameleon: Mixed-Modal Early-Fusion Foundation Models (Team et al., 2024)', url: 'https://arxiv.org/abs/2405.09818' }
      ]
    },
    {
      title: 'Audio Processing & Speech Recognition',
      items: [
        { title: 'Whisper: Robust Speech Recognition via Large-Scale Weak Supervision (Radford et al., 2022)', url: 'https://arxiv.org/abs/2212.04356' },
        { title: 'Speech-T5: Unified-Modal Encoder-Decoder Pre-Training for Spoken Language Processing (Ao et al., 2022)', url: 'https://arxiv.org/abs/2110.07205' },
        { title: 'WavLM: Large-Scale Self-Supervised Pre-Training for Full Stack Speech Processing (Chen et al., 2022)', url: 'https://arxiv.org/abs/2110.13900' },
        { title: 'ImageBind: One Embedding Space To Bind Them All (Girdhar et al., 2023)', url: 'https://arxiv.org/abs/2305.05665' }
      ]
    },
    {
      title: 'Multi-Modal Fusion & Architecture',
      items: [
        { title: 'ViLBERT: Pretraining Task-Agnostic Visiolinguistic Representations (Lu et al., 2019)', url: 'https://arxiv.org/abs/1908.02265' },
        { title: 'LXMERT: Learning Cross-Modality Encoder Representations from Transformers (Tan & Bansal, 2019)', url: 'https://arxiv.org/abs/1908.07490' },
        { title: 'Flamingo: a Visual Language Model for Few-Shot Learning (Alayrac et al., 2022)', url: 'https://arxiv.org/abs/2204.14198' },
        { title: 'ALIGN: Scaling Up Visual and Vision-Language Representation Learning (Jia et al., 2021)', url: 'https://arxiv.org/abs/2102.05918' }
      ]
    },
    {
      title: 'Implementation Frameworks & APIs',
      items: [
        { title: 'OpenAI GPT-4V Vision API Documentation and Best Practices', url: 'https://platform.openai.com/docs/guides/vision' },
        { title: 'Anthropic Claude 3 Vision Capabilities and Integration Guide', url: 'https://docs.anthropic.com/claude/docs/vision' },
        { title: 'Google Gemini Multimodal API Documentation', url: 'https://ai.google.dev/gemini-api/docs/vision' },
        { title: 'LangChain Multimodal RAG Tutorial and Implementation Examples', url: 'https://python.langchain.com/docs/tutorials/multimodal_rag' }
      ]
    },
    {
      title: 'Evaluation & Benchmarking',
      items: [
        { title: 'MM-RAG: A Comprehensive Benchmark for Multi-Modal RAG Systems (Chen et al., 2024)', url: 'https://arxiv.org/abs/2407.21232' },
        { title: 'MIRAG: Multimodal Retrieval-Augmented Generation Benchmark (Zhang et al., 2024)', url: 'https://arxiv.org/abs/2410.02330' },
        { title: 'VQA: Visual Question Answering Evaluation Framework', url: 'https://visualqa.org/' },
        { title: 'TextVQA: Questions Requiring Reading and Reasoning about Text in Images', url: 'https://arxiv.org/abs/1904.08920' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Multi-modal RAG system that retrieves and fuses evidence across text, images, audio, and video using specialized encoders"
        why="Enables comprehensive understanding by combining information from multiple modalities that text-only systems miss"
        keyInsight="Per-modality encoders (CLIP, Whisper, BLIP-2) with learned fusion weights for cross-modal evidence integration"
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