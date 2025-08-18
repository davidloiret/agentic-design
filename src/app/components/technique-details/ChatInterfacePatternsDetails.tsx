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

interface ChatInterfacePatternsDetailsProps {
  selectedTechnique: any;
}

export const ChatInterfacePatternsDetails: React.FC<ChatInterfacePatternsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Threading System', detail: 'Conversation branching & merging logic' },
      { num: '2', action: 'Rich Content', detail: 'Documents, code, images, interactive widgets' },
      { num: '3', action: 'Agent Features', detail: 'Thinking indicators & source citations' },
      { num: '4', action: 'Collaboration', detail: 'Real-time presence & message reactions' },
      { num: '5', action: 'Context Management', detail: 'Thread preservation & summarization' }
    ],
    example: 'user_message → thread_routing → content_rendering → agent_response → context_update'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Support threaded conversations for topic exploration', icon: '✅' },
    { type: 'do', text: 'Show agent thinking process with visual indicators', icon: '✅' },
    { type: 'do', text: 'Integrate rich media (documents, code, images)', icon: '✅' },
    { type: 'do', text: 'Provide source citations with expandable details', icon: '✅' },
    { type: 'do', text: 'Enable message reactions and collaborative editing', icon: '✅' },
    { type: 'dont', text: 'Force linear conversation flow only', icon: '❌' },
    { type: 'dont', text: 'Hide agent reasoning process from users', icon: '❌' },
    { type: 'dont', text: 'Limit to text-only interactions', icon: '❌' },
    { type: 'dont', text: 'Lose context when switching between threads', icon: '❌' },
    { type: 'dont', text: 'Overwhelm with too many concurrent features', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Team collaboration scenarios',
      'Customer support interactions',
      'Educational platform discussions',
      'Content creation workflows'
    ],
    avoidWhen: [
      'Simple query-response needs',
      'High-security environments',
      'Minimal UI requirements',
      'Single-user applications'
    ]
  };

  const keyMetrics = [
    { metric: 'Thread Engagement', measure: 'Active branches per conversation' },
    { metric: 'Content Interaction', measure: 'Rich media usage & sharing rate' },
    { metric: 'Collaboration Rate', measure: 'Multi-participant conversation %' },
    { metric: 'Context Retention', measure: 'Thread switching without loss' },
    { metric: 'User Satisfaction', measure: 'Interface usability score' },
    { metric: 'Problem Resolution', measure: 'Time to solution in threaded chats' }
  ];

  const topUseCases = [
    'Customer Support: threaded issue tracking, document sharing, escalation management',
    'Educational Platforms: topic discussions, resource sharing, collaborative learning',
    'Team Collaboration: project threads, code review, real-time brainstorming',
    'Content Creation: draft collaboration, feedback threads, version discussions',
    'Technical Support: troubleshooting threads, log analysis, solution documentation'
  ];

  const references = [
    {
      title: 'Design Patterns',
      items: [
        { title: 'Conversational UI Design Principles (Nielsen Norman Group)', url: 'https://www.nngroup.com/articles/chatbots/' },
        { title: 'Threading in Chat Applications - UX Patterns', url: 'https://ui-patterns.com/patterns/ThreadedDiscussion' },
        { title: 'Rich Content in Messaging - Material Design Guidelines', url: 'https://material.io/design/communication/conversation.html' },
        { title: 'Agent Interface Design - Human-Computer Interaction Patterns', url: 'https://www.interaction-design.org/literature/topics/human-computer-interaction' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Slack Threading Architecture', url: 'https://api.slack.com/messaging/managing-context-and-conversations' },
        { title: 'Discord Rich Embeds and Interactions', url: 'https://discord.com/developers/docs/interactions/message-components' },
        { title: 'Microsoft Teams Bot Framework', url: 'https://docs.microsoft.com/en-us/microsoftteams/platform/bots/what-are-bots' },
        { title: 'WhatsApp Business API - Rich Messages', url: 'https://developers.facebook.com/docs/whatsapp/cloud-api' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Stream Chat SDK - React Components', url: 'https://github.com/GetStream/stream-chat-react' },
        { title: 'Matrix Protocol - Decentralized Chat', url: 'https://github.com/matrix-org/matrix-js-sdk' },
        { title: 'Rocket.Chat - Open Source Platform', url: 'https://github.com/RocketChat/Rocket.Chat' },
        { title: 'Mattermost - Team Collaboration Platform', url: 'https://github.com/mattermost/mattermost-server' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Chat Interface Design Community (Reddit)', url: 'https://reddit.com/r/userexperience' },
        { title: 'Conversational UX Slack Community', url: 'https://conversationalux.slack.com' },
        { title: 'UX Mastery - Chat Interface Articles', url: 'https://uxmastery.com/tag/chat-interface/' },
        { title: 'Chatbot Design Weekly Newsletter', url: 'https://chatbotdesign.substack.com/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Specialized chat interfaces optimized for agent interactions with threading, rich content, and collaborative features"
        why="Enables complex multi-topic conversations, rich media sharing, and seamless human-AI collaboration"
        keyInsight="Threading + rich content + agent-specific features → enhanced conversational experiences"
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

export default ChatInterfacePatternsDetails;