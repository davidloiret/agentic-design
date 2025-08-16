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

interface UnsupervisedLearningAdaptationDetailsProps {
  selectedTechnique: any;
}

export const UnsupervisedLearningAdaptationDetails: React.FC<UnsupervisedLearningAdaptationDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Collect', detail: 'Gather unlabeled target domain data' },
      { num: '2', action: 'Preprocess', detail: 'Clean and structure data without labels' },
      { num: '3', action: 'Self-supervise', detail: 'Apply self-supervised learning objectives' },
      { num: '4', action: 'Adapt', detail: 'Fine-tune on domain-specific patterns' },
      { num: '5', action: 'Evaluate', detail: 'Assess adaptation using proxy tasks or downstream performance' }
    ],
    example: 'pretrained_model + unlabeled_domain_data → self_supervised_objectives → adapted_model'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use diverse self-supervised objectives (masking, contrastive, generative)', icon: '✅' },
    { type: 'do', text: 'Implement domain-specific data augmentation strategies', icon: '✅' },
    { type: 'do', text: 'Monitor representation quality through probing tasks', icon: '✅' },
    { type: 'do', text: 'Apply gradual unfreezing and layer-wise adaptation', icon: '✅' },
    { type: 'do', text: 'Use contrastive learning for robust feature extraction', icon: '✅' },
    { type: 'do', text: 'Validate on downstream tasks to measure adaptation success', icon: '✅' },
    { type: 'dont', text: 'Ignore data quality and distribution characteristics', icon: '❌' },
    { type: 'dont', text: 'Use inappropriate self-supervised objectives for domain', icon: '❌' },
    { type: 'dont', text: 'Overtrain without proper regularization', icon: '❌' },
    { type: 'dont', text: 'Skip evaluation of learned representations', icon: '❌' },
    { type: 'dont', text: 'Apply without understanding domain-specific patterns', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Large amounts of unlabeled domain data are available',
      'Labeled data is expensive or impossible to obtain',
      'Need to adapt to new domains with different distributions',
      'Self-supervised signals can be extracted from data structure',
      'Domain has rich inherent patterns and regularities'
    ],
    avoidWhen: [
      'High-quality labeled data is readily available',
      'Domain lacks clear self-supervised signals',
      'Computational resources are severely limited',
      'Immediate deployment without adaptation time',
      'Simple transfer learning is sufficient'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Representation Quality', measure: 'Performance on probing tasks and linear evaluation' },
    { metric: 'Domain Adaptation Score', measure: 'Improvement over pre-trained baseline on target domain' },
    { metric: 'Self-Supervised Loss', measure: 'Convergence and stability of unsupervised objectives' },
    { metric: 'Downstream Performance', measure: 'Task performance after adaptation' },
    { metric: 'Transfer Efficiency', measure: 'Learning speed on target domain tasks' },
    { metric: 'Robustness', measure: 'Performance under domain shift and noise' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Domain Adaptation: Adapt models to new industries, languages, or specialized domains without labels',
    'Cross-Modal Learning: Learn shared representations between text, images, and other modalities',
    'Temporal Adaptation: Adapt models to evolving data distributions over time',
    'Low-Resource Languages: Adapt language models to languages with limited labeled data',
    'Scientific Data Analysis: Learn patterns in specialized scientific datasets without annotations',
    'Privacy-Preserving Adaptation: Adapt models without accessing sensitive labeled information'
  ];

  const references = [
    {
      title: 'Foundational Self-Supervised Learning',
      items: [
        { title: 'Self-Supervised Learning: Generative or Contrastive (Liu et al., 2021)', url: 'https://arxiv.org/abs/2006.08218' },
        { title: 'A Simple Framework for Contrastive Learning of Visual Representations (Chen et al., 2020)', url: 'https://arxiv.org/abs/2002.05709' },
        { title: 'Momentum Contrast for Unsupervised Visual Representation Learning (He et al., 2020)', url: 'https://arxiv.org/abs/1911.05722' },
        { title: 'Bootstrap Your Own Latent: A New Approach to Self-Supervised Learning (Grill et al., 2020)', url: 'https://arxiv.org/abs/2006.07733' }
      ]
    },
    {
      title: 'Language Model Self-Supervision',
      items: [
        { title: 'BERT: Pre-training of Deep Bidirectional Transformers (Devlin et al., 2018)', url: 'https://arxiv.org/abs/1810.04805' },
        { title: 'RoBERTa: A Robustly Optimized BERT Pretraining Approach (Liu et al., 2019)', url: 'https://arxiv.org/abs/1907.11692' },
        { title: 'DeBERTa: Decoding-enhanced BERT with Disentangled Attention (He et al., 2020)', url: 'https://arxiv.org/abs/2006.03654' },
        { title: 'ELECTRA: Pre-training Text Encoders as Discriminators Rather Than Generators (Clark et al., 2020)', url: 'https://arxiv.org/abs/2003.10555' }
      ]
    },
    {
      title: 'Domain Adaptation Techniques',
      items: [
        { title: 'Domain-Adversarial Training of Neural Networks (Ganin et al., 2016)', url: 'https://arxiv.org/abs/1505.07818' },
        { title: 'Unsupervised Domain Adaptation by Backpropagation (Ganin & Lempitsky, 2015)', url: 'https://arxiv.org/abs/1409.7495' },
        { title: 'Deep CORAL: Correlation Alignment for Deep Domain Adaptation (Sun & Saenko, 2016)', url: 'https://arxiv.org/abs/1607.01719' },
        { title: 'Adversarial Discriminative Domain Adaptation (Tzeng et al., 2017)', url: 'https://arxiv.org/abs/1702.05464' }
      ]
    },
    {
      title: 'Contrastive Learning Methods',
      items: [
        { title: 'SimCLR: A Simple Framework for Contrastive Learning (Chen et al., 2020)', url: 'https://arxiv.org/abs/2002.05709' },
        { title: 'SwAV: Unsupervised Learning of Visual Features by Contrasting Cluster Assignments (Caron et al., 2020)', url: 'https://arxiv.org/abs/2006.09882' },
        { title: 'SimCSE: Simple Contrastive Learning of Sentence Embeddings (Gao et al., 2021)', url: 'https://arxiv.org/abs/2104.08821' },
        { title: 'SupCon: Supervised Contrastive Learning (Khosla et al., 2020)', url: 'https://arxiv.org/abs/2004.11362' }
      ]
    },
    {
      title: 'Masked Language Modeling',
      items: [
        { title: 'BERT: Pre-training of Deep Bidirectional Transformers (Devlin et al., 2018)', url: 'https://arxiv.org/abs/1810.04805' },
        { title: 'SpanBERT: Improving Pre-training by Representing and Predicting Spans (Joshi et al., 2020)', url: 'https://arxiv.org/abs/1907.10529' },
        { title: 'ERNIE: Enhanced Representation through Knowledge Integration (Zhang et al., 2019)', url: 'https://arxiv.org/abs/1905.07129' },
        { title: 'ALBERT: A Lite BERT for Self-supervised Learning (Lan et al., 2019)', url: 'https://arxiv.org/abs/1909.11942' }
      ]
    },
    {
      title: 'Recent Advances (2023-2024)',
      items: [
        { title: 'MAE: Masked Autoencoders Are Scalable Vision Learners (He et al., 2022)', url: 'https://arxiv.org/abs/2111.06377' },
        { title: 'SimMIM: A Simple Framework for Masked Image Modeling (Xie et al., 2022)', url: 'https://arxiv.org/abs/2111.09886' },
        { title: 'BEiT: BERT Pre-Training of Image Transformers (Bao et al., 2021)', url: 'https://arxiv.org/abs/2106.08254' },
        { title: 'Data2vec: A General Framework for Self-supervised Learning (Baevski et al., 2022)', url: 'https://arxiv.org/abs/2202.03555' }
      ]
    },
    {
      title: 'Multimodal Self-Supervision',
      items: [
        { title: 'CLIP: Learning Transferable Visual Representations from Natural Language Supervision (Radford et al., 2021)', url: 'https://arxiv.org/abs/2103.00020' },
        { title: 'ALIGN: Scaling Up Visual and Vision-Language Representation Learning (Jia et al., 2021)', url: 'https://arxiv.org/abs/2102.05918' },
        { title: 'Florence: A New Foundation Model for Computer Vision (Yuan et al., 2021)', url: 'https://arxiv.org/abs/2111.11432' },
        { title: 'DALLE-2: Hierarchical Text-Conditional Image Generation (Ramesh et al., 2022)', url: 'https://arxiv.org/abs/2204.06125' }
      ]
    },
    {
      title: 'Cross-Domain Adaptation',
      items: [
        { title: 'Domain Adaptation for Neural Networks: A Review (Farahani et al., 2021)', url: 'https://arxiv.org/abs/2007.04267' },
        { title: 'Unsupervised Cross-domain Representation Learning (Hoffman et al., 2018)', url: 'https://arxiv.org/abs/1707.01217' },
        { title: 'Deep Transfer Learning: A New Deep Learning Research Direction (Tan et al., 2018)', url: 'https://arxiv.org/abs/1808.01974' },
        { title: 'A Survey on Deep Transfer Learning and Domain Adaptation (Wilson & Cook, 2020)', url: 'https://arxiv.org/abs/2007.04267' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'PyTorch Self-Supervised Learning Library (PyTorch-SSL)', url: 'https://github.com/facebookresearch/vissl' },
        { title: 'SimCLR Implementation in TensorFlow', url: 'https://github.com/google-research/simclr' },
        { title: 'Hugging Face Transformers - Self-Supervised Models', url: 'https://huggingface.co/docs/transformers/model_doc/bert' },
        { title: 'Self-Supervised Learning Zoo (SSL-Zoo)', url: 'https://github.com/facebookresearch/ssl-zoo' }
      ]
    },
    {
      title: 'Evaluation & Benchmarks',
      items: [
        { title: 'ImageNet Linear Evaluation Protocol', url: 'https://github.com/facebookresearch/vissl/blob/main/docs/source/evaluations/linear_eval.md' },
        { title: 'SentEval: Evaluation Toolkit for Sentence Embeddings', url: 'https://github.com/facebookresearch/SentEval' },
        { title: 'GLUE: General Language Understanding Evaluation', url: 'https://gluebenchmark.com/' },
        { title: 'Domain Adaptation Benchmarks (Office-31, VisDA)', url: 'https://github.com/thuml/Transfer-Learning-Library' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'VISSL: Computer Vision Self-Supervised Learning', url: 'https://github.com/facebookresearch/vissl' },
        { title: 'Lightly: Self-Supervised Learning Framework', url: 'https://github.com/lightly-ai/lightly' },
        { title: 'Solo-learn: Self-Supervised Learning Library', url: 'https://github.com/vturrisi/solo-learn' },
        { title: 'TorchSSL: PyTorch SSL Implementation', url: 'https://github.com/TorchSSL/TorchSSL' }
      ]
    },
    {
      title: 'Production Applications',
      items: [
        { title: 'Facebook AI: Self-Supervised Learning at Scale', url: 'https://ai.facebook.com/blog/self-supervised-learning/' },
        { title: 'Google Research: SimCLR and Beyond', url: 'https://ai.googleblog.com/2020/04/advancing-self-supervised-and-semi.html' },
        { title: 'OpenAI CLIP: Production Multimodal Models', url: 'https://openai.com/research/clip' },
        { title: 'DeepMind: Self-Supervised Learning Research', url: 'https://deepmind.com/research/publications/2020' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Adapt models to new domains using unlabeled data through self-supervised learning objectives"
        why="Leverages abundant unlabeled data to learn domain-specific patterns without expensive annotation requirements"
        keyInsight="Self-supervised pretext tasks create supervisory signals from data structure, enabling effective domain adaptation"
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

export default UnsupervisedLearningAdaptationDetails;