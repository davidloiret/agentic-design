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

interface MultimodalInteractionPatternsDetailsProps {
  selectedTechnique: any;
}

export const MultimodalInteractionPatternsDetails: React.FC<MultimodalInteractionPatternsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Modality Detection', detail: 'Context-aware communication mode selection' },
      { num: '2', action: 'Input Fusion', detail: 'Voice, gesture, text, visual integration' },
      { num: '3', action: 'Semantic Alignment', detail: 'Cross-modal meaning consistency' },
      { num: '4', action: 'Adaptive Response', detail: 'Context-appropriate output modality' },
      { num: '5', action: 'Transition Management', detail: 'Seamless modality switching' }
    ],
    example: 'context_analysis → modality_selection → input_fusion → semantic_processing → adaptive_response'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Adapt modality selection based on environmental context', icon: '✅' },
    { type: 'do', text: 'Ensure semantic consistency across all input modalities', icon: '✅' },
    { type: 'do', text: 'Support seamless transitions between communication modes', icon: '✅' },
    { type: 'do', text: 'Learn user preferences for modality combinations', icon: '✅' },
    { type: 'do', text: 'Provide fallback options when modalities fail', icon: '✅' },
    { type: 'dont', text: 'Force users into single-modality interactions', icon: '❌' },
    { type: 'dont', text: 'Ignore environmental factors (noise, privacy, accessibility)', icon: '❌' },
    { type: 'dont', text: 'Create jarring transitions between modalities', icon: '❌' },
    { type: 'dont', text: 'Assume all users prefer the same modality mix', icon: '❌' },
    { type: 'dont', text: 'Overwhelm with too many simultaneous input channels', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Natural human-computer interaction',
      'Hands-free operation requirements',
      'Accessibility-focused applications',
      'Context-rich environments'
    ],
    avoidWhen: [
      'Simple text-only applications',
      'High-security environments',
      'Resource-constrained systems',
      'Privacy-sensitive contexts'
    ]
  };

  const keyMetrics = [
    { metric: 'Modality Switch Success', measure: '% seamless transitions between modes' },
    { metric: 'Context Recognition Accuracy', measure: 'Appropriate modality selection rate' },
    { metric: 'Cross-Modal Consistency', measure: 'Semantic alignment across inputs' },
    { metric: 'User Preference Learning', measure: 'Adaptation to individual patterns' },
    { metric: 'Natural Interaction Score', measure: 'User satisfaction with fluidity' },
    { metric: 'Error Recovery Rate', measure: 'Successful fallback handling' }
  ];

  const topUseCases = [
    'Smart Home Control: voice commands + gesture recognition + visual feedback',
    'Automotive Interfaces: speech + touch + eye tracking for hands-free operation',
    'Healthcare Applications: voice notes + gesture input + visual confirmation',
    'Education Platforms: speech + drawing + text for comprehensive learning',
    'Accessibility Tools: multiple input methods for diverse user capabilities'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Multimodal Machine Learning: A Survey and Taxonomy (Baltrušaitis et al., 2018)', url: 'https://doi.org/10.1109/TPAMI.2018.2798607' },
        { title: 'Attention Is All You Need - Transformer Architecture (Vaswani et al., 2017)', url: 'https://arxiv.org/abs/1706.03762' },
        { title: 'CLIP: Learning Transferable Visual Representations (Radford et al., 2021)', url: 'https://arxiv.org/abs/2103.00020' },
        { title: 'Multimodal Deep Learning for Human Communication (Ngiam et al., 2011)', url: 'https://ai.stanford.edu/~ang/papers/icml11-MultimodalDeepLearning.pdf' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Google Multimodal AI - Gemini Integration Patterns', url: 'https://ai.google.dev/docs/multimodal_concepts' },
        { title: 'OpenAI GPT-4V - Vision and Language Integration', url: 'https://platform.openai.com/docs/guides/vision' },
        { title: 'Microsoft Cognitive Services - Speech and Vision APIs', url: 'https://docs.microsoft.com/en-us/azure/cognitive-services/' },
        { title: 'Meta Llama 2 - Multimodal Model Implementation', url: 'https://github.com/facebookresearch/llama' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Hugging Face Transformers - Multimodal Models', url: 'https://github.com/huggingface/transformers' },
        { title: 'OpenCV - Computer Vision and Gesture Recognition', url: 'https://github.com/opencv/opencv' },
        { title: 'SpeechRecognition - Python Speech Processing', url: 'https://github.com/Uberi/speech_recognition' },
        { title: 'MediaPipe - Cross-Platform Multimodal Framework', url: 'https://github.com/google/mediapipe' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Multimodal ML Community (Reddit)', url: 'https://reddit.com/r/MachineLearning' },
        { title: 'Computer Vision and Pattern Recognition Conference', url: 'https://cvpr2024.thecvf.com/' },
        { title: 'ACM Multimodal Interaction Conference', url: 'https://icmi.acm.org/' },
        { title: 'Natural Language Processing with Multimodal Data', url: 'https://github.com/topics/multimodal' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Advanced multimodal agent interactions integrating voice, visual, gesture, and text communication seamlessly"
        why="Enables natural human-computer interaction, supports accessibility, and adapts to environmental contexts"
        keyInsight="Context-aware modality selection + input fusion + semantic alignment → fluid multimodal experiences"
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

export default MultimodalInteractionPatternsDetails;