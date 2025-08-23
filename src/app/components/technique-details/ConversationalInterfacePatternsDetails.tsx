'use client';

import React from 'react';
import ReferencesSection from './shared/ReferencesSection';
import { PatternRelationships, RelationshipData } from '../shared/PatternRelationships';
import {
  QuickOverviewSection,
  QuickImplementationSection,
  DosAndDontsSection,
  UsageGuideSection,
  KeyMetricsSection,
  TopUseCasesSection
} from './shared';

interface ConversationalInterfacePatternsDetailsProps {
  selectedTechnique: any;
}

export const ConversationalInterfacePatternsDetails: React.FC<ConversationalInterfacePatternsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Define Persona', detail: 'Create distinct system and user personas with clear roles' },
      { num: '2', action: 'Design Flow', detail: 'Map conversation paths with branching and error handling' },
      { num: '3', action: 'Implement Intent', detail: 'Build intent-based outcome specification interface' },
      { num: '4', action: 'Add Multimodal', detail: 'Integrate voice, text, visual, and gesture inputs' },
      { num: '5', action: 'Test & Refine', detail: 'Iterate on user testing with diverse conversation scenarios' }
    ],
    example: 'persona_design → flow_mapping → intent_interface → multimodal_integration → user_testing'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Design for natural human conversation patterns first', icon: '✅' },
    { type: 'do', text: 'Create clear system persona with consistent personality', icon: '✅' },
    { type: 'do', text: 'Use machine-appropriate language like "processing" not "thinking"', icon: '✅' },
    { type: 'do', text: 'Implement progressive disclosure for complex information', icon: '✅' },
    { type: 'do', text: 'Provide multiple conversation recovery options', icon: '✅' },
    { type: 'do', text: 'Enable seamless modality switching (voice/text/visual)', icon: '✅' },
    { type: 'dont', text: 'Anthropomorphize AI with human emotions or consciousness', icon: '❌' },
    { type: 'dont', text: 'Force single-turn interactions for complex tasks', icon: '❌' },
    { type: 'dont', text: 'Hide AI limitations or pretend system is human', icon: '❌' },
    { type: 'dont', text: 'Use endless scrolling chat for all interaction patterns', icon: '❌' },
    { type: 'dont', text: 'Ignore accessibility and diverse user communication needs', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Natural language interaction is primary UX goal',
      'Complex task guidance needed',
      'User education and onboarding scenarios',
      'Accessibility across diverse abilities required',
      'Multi-step collaborative workflows'
    ],
    avoidWhen: [
      'Simple CRUD operations suffice',
      'Real-time precision control needed',
      'Visual data manipulation required',
      'Users prefer traditional GUI patterns'
    ]
  };

  const keyMetrics = [
    { metric: 'Conversation Completion Rate', measure: '% users completing intended task flow' },
    { metric: 'Intent Recognition Accuracy', measure: 'Success rate of understanding user goals' },
    { metric: 'User Satisfaction Score', measure: 'CSAT rating vs traditional interface' },
    { metric: 'Error Recovery Success', measure: '% failed conversations successfully recovered' },
    { metric: 'Modality Switching Smoothness', measure: 'Friction in voice/text/visual transitions' },
    { metric: 'Accessibility Compliance', measure: 'WCAG 2.1 AA adherence across modalities' }
  ];

  const topUseCases = [
    'Customer Support: Natural troubleshooting → guided resolution → escalation handoff',
    'Educational Tutoring: Adaptive questioning → conceptual explanation → progress tracking',
    'Healthcare Assistance: symptom collection → triage guidance → appointment coordination',
    'Enterprise Workflows: task initiation → step-by-step guidance → completion verification',
    'Content Creation: brainstorming → structured authoring → collaborative editing'
  ];

  const relationshipData: RelationshipData = {
    prerequisites: [],
    nextSteps: [
      {
        id: 'multimodal-interaction-patterns',
        name: 'Multimodal Interaction Patterns',
        category: 'ui-ux-patterns',
        description: 'Advanced integration of voice, visual, gesture, and text communication',
        icon: '🎤',
        complexity: 'high',
        reason: 'Natural evolution to richer, more accessible interaction modalities'
      },
      {
        id: 'adaptive-interface-patterns',
        name: 'Adaptive Interface Patterns',
        category: 'ui-ux-patterns',
        description: 'Dynamic UI adaptation based on user context and behavior',
        icon: '🎯',
        complexity: 'high',
        reason: 'Personalize conversations based on user patterns and preferences'
      },
      {
        id: 'agent-collaboration-ux',
        name: 'Agent Collaboration UX',
        category: 'ui-ux-patterns',
        description: 'Multi-agent coordination with transparent handoffs',
        icon: '🤝',
        complexity: 'high',
        reason: 'Scale conversations to specialized multi-agent workflows'
      }
    ],
    alternatives: [
      {
        id: 'chat-interface-patterns',
        name: 'Chat Interface Patterns',
        category: 'ui-ux-patterns',
        description: 'Traditional chat interfaces with threading and rich media',
        icon: '💭',
        complexity: 'high',
        reason: 'More structured approach when conversation flow is predictable'
      },
      {
        id: 'progressive-disclosure-patterns',
        name: 'Progressive Disclosure UI Patterns',
        category: 'ui-ux-patterns',
        description: 'Gradual information revelation without conversation',
        icon: '📋',
        complexity: 'high',
        reason: 'Better for complex information when conversation adds friction'
      }
    ],

    combinesWith: [
      {
        id: 'human-in-the-loop',
        name: 'Human-in-the-Loop',
        category: 'ui-ux-patterns',
        description: 'Strategic human intervention at conversation decision points',
        icon: '👤',
        complexity: 'medium',
        reason: 'Essential for high-stakes conversations requiring human judgment'
      },
      {
        id: 'trust-transparency-patterns',
        name: 'Trust and Transparency Patterns',
        category: 'ui-ux-patterns',
        description: 'Explainable AI interfaces with decision transparency',
        icon: '🔍',
        complexity: 'high',
        reason: 'Build user confidence through transparent conversation reasoning'
      },
      {
        id: 'confidence-visualization-patterns',
        name: 'Confidence Visualization Patterns',
        category: 'ui-ux-patterns',
        description: 'Visual confidence indicators for AI responses',
        icon: '📊',
        complexity: 'high',
        reason: 'Help users calibrate trust in conversational AI responses'
      }
    ],
    enhancedBy: [
      {
        id: 'accessibility-agent-design',
        name: 'Accessibility in Agent Design',
        category: 'ui-ux-patterns',
        description: 'Universal design for diverse abilities and assistive technologies',
        icon: '♿',
        complexity: 'high',
        reason: 'Critical for inclusive conversational experiences across all users'
      },
      {
        id: 'error-recovery-patterns',
        name: 'Error Handling and Recovery Patterns',
        category: 'ui-ux-patterns',
        description: 'Graceful failure handling in conversation flows',
        icon: '🔧',
        complexity: 'medium',
        reason: 'Essential for maintaining conversation flow when misunderstandings occur'
      },
      {
        id: 'onboarding-education-patterns',
        name: 'Onboarding and Education Patterns',
        category: 'ui-ux-patterns',
        description: 'User education for conversational interface capabilities',
        icon: '🎓',
        complexity: 'medium',
        reason: 'Help users develop appropriate mental models for conversation'
      }
    ],
    enhances: [
      {
        id: 'natural-language-processing',
        name: 'Natural Language Processing',
        category: 'knowledge-representation',
        description: 'Transform NLP capabilities into user-friendly conversational experiences',
        icon: '🗣️',
        complexity: 'medium',
        reason: 'Makes advanced NLP accessible through intuitive conversation'
      },
      {
        id: 'function-calling',
        name: 'Function Calling',
        category: 'tool-use',
        description: 'Wrap structured function calls in natural conversation',
        icon: '🔧',
        complexity: 'medium',
        reason: 'Hide technical complexity behind conversational interfaces'
      }
    ],

    evolvesTo: [
      {
        id: 'ambient-agent-patterns',
        name: 'Ambient Agent Patterns',
        category: 'ui-ux-patterns',
        description: 'Always-present, contextually-aware conversational agents',
        icon: '🌊',
        complexity: 'high',
        reason: 'Evolution toward seamless, environmental conversation integration'
      }
    ],
    variants: [
      {
        id: 'voice-first-interfaces',
        name: 'Voice-First Conversational Interfaces',
        category: 'ui-ux-patterns',
        description: 'Conversation optimized primarily for voice interaction',
        icon: '🗣️',
        complexity: 'medium',
        reason: 'Variant optimized for hands-free and accessibility scenarios'
      },
      {
        id: 'visual-conversation-flows',
        name: 'Visual Conversation Flows',
        category: 'ui-ux-patterns',
        description: 'Conversation enhanced with rich visual elements',
        icon: '👁️',
        complexity: 'medium',
        reason: 'Variant for complex information requiring visual representation'
      }
    ],

    conflictsWith: [],

    industryApplications: [
      {
        domain: 'Healthcare',
        description: 'Patient-centered conversational interfaces for symptom assessment and care coordination',
        patterns: [
          {
            id: 'human-in-the-loop',
            name: 'Human-in-the-Loop',
            category: 'ui-ux-patterns',
            description: 'Clinical decision support with required physician oversight',
            icon: '👤'
          },
          {
            id: 'privacy-security-ux',
            name: 'Privacy and Security UX',
            category: 'ui-ux-patterns',
            description: 'HIPAA-compliant conversational interfaces with transparent data handling',
            icon: '🔒'
          }
        ]
      },
      {
        domain: 'Education Technology',
        description: 'Adaptive tutoring systems with natural conversation-based learning',
        patterns: [
          {
            id: 'adaptive-interface-patterns',
            name: 'Adaptive Interface Patterns',
            category: 'ui-ux-patterns',
            description: 'Personalized learning conversations that adapt to student progress',
            icon: '🎯'
          },
          {
            id: 'multimodal-interaction-patterns',
            name: 'Multimodal Interaction Patterns',
            category: 'ui-ux-patterns',
            description: 'Voice, text, and visual learning modalities in unified conversation',
            icon: '🎤'
          }
        ]
      },
      {
        domain: 'Enterprise Software',
        description: 'Natural language interfaces for complex business workflows and data analysis',
        patterns: [
          {
            id: 'agent-collaboration-ux',
            name: 'Agent Collaboration UX',
            category: 'ui-ux-patterns',
            description: 'Multi-agent systems coordinating through conversational handoffs',
            icon: '🤝'
          },
          {
            id: 'trust-transparency-patterns',
            name: 'Trust and Transparency Patterns',
            category: 'ui-ux-patterns',
            description: 'Explainable business intelligence through conversational interfaces',
            icon: '🔍'
          }
        ]
      }
    ]
  };

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Designing Dialogic Disclaimers: Principles for Ethical Conversational Design in LLM Interfaces (CHI 2024)', url: 'https://dl.acm.org/doi/abs/10.1145/3719160.3737640' },
        { title: 'Building Conversational User Interfaces: An Architectural Exploration with Meta Glasses (ACM CUI 2024)', url: 'https://dl.acm.org/doi/abs/10.1145/3719160.3728625' },
        { title: 'Survey of User Interface Design and Interaction Techniques in Generative AI Applications (ArXiv 2024)', url: 'https://arxiv.org/html/2410.22370v1' },
        { title: 'Key Principles for User Experience Design for Conversational User Interfaces (ResearchGate 2023)', url: 'https://www.researchgate.net/publication/372794111_Key_Principles_Pertinent_to_User_Experience_Design_for_Conversational_User_Interfaces_A_Conceptual_Learning_Model' }
      ]
    },
    {
      title: 'Industry Guidelines',
      items: [
        { title: 'Google Conversation Design Principles - What is Conversation Design', url: 'https://developers.google.com/assistant/conversation-design/what-is-conversation-design' },
        { title: 'Microsoft Generative AI UX Guidance for ISVs (2024)', url: 'https://learn.microsoft.com/en-us/microsoft-cloud/dev/copilot/isv/ux-guidance' },
        { title: 'Microsoft Bot Framework Conversational UX Design Principles', url: 'https://learn.microsoft.com/en-us/azure/bot-service/bot-service-design-principles' },
        { title: 'Nielsen Norman Group: AI User Interface Paradigms (2024)', url: 'https://www.nngroup.com/articles/ai-paradigm/' }
      ]
    },
    {
      title: 'Research Publications',
      items: [
        { title: '10 Guidelines for Developers of Conversational AI (Microsoft Research)', url: 'https://www.microsoft.com/en-us/research/uploads/prod/2018/11/Bot_Guidelines_Nov_2018.pdf' },
        { title: 'Microsoft Human-AI Interaction Design Guidelines', url: 'https://www.microsoft.com/en-us/research/blog/guidelines-for-human-ai-interaction-design/' },
        { title: 'Conversational UX Design: A Practitioner\'s Guide to the Natural Conversation Framework', url: 'https://www.academia.edu/37808966/Conversational_UX_Design_A_Practitioners_Guide_to_the_Natural_Conversation_Framework_book_' },
        { title: 'Designing For Conversational User Interfaces (ArXiv)', url: 'https://arxiv.org/pdf/1802.09055' }
      ]
    },
    {
      title: 'Tools & Platforms',
      items: [
        { title: 'Google Actions Console - Conversation Design Tools', url: 'https://developers.google.com/assistant/console/' },
        { title: 'Microsoft Bot Framework SDK and Composer', url: 'https://github.com/Microsoft/BotFramework-SDK' },
        { title: 'Amazon Alexa Skills Kit - Voice Design Guide', url: 'https://developer.amazon.com/en-US/docs/alexa/alexa-design/get-started.html' },
        { title: 'Rasa Open Source Conversational AI Framework', url: 'https://github.com/RasaHQ/rasa' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Agent-driven conversational interfaces that move beyond traditional chatbots to multimodal, adaptive experiences"
        why="Enables natural human-computer interaction, reduces cognitive load, and provides accessible interfaces for diverse users"
        keyInsight="Intent-based outcome specification with seamless multimodal transitions - conversation becomes the universal interface"
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

      <PatternRelationships
        currentPatternId="conversational-interface-patterns"
        currentPatternName="Conversational Interface Patterns"
        relationships={relationshipData}
        className="mt-8"
      />

      <ReferencesSection categories={references} />
    </>
  );
};

export default ConversationalInterfacePatternsDetails;