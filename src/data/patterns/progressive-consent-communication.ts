import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const progressiveConsentCommunicationPattern: PatternScenario = {
  id: 'progressive-consent-communication',
  title: 'Progressive Consent and Communication Flow',
  description: 'Just-in-time permission flows with progressive disclosure, contextual consent mechanisms, clear risk communication, and adaptive privacy notifications that respect user attention while ensuring informed decision-making',
  initialNodes: [
    // Onboarding scenario
    {
      id: 'ai-assistant-onboarding',
      position: { x: 400, y: 50 },
      data: { label: '🤖 AI Personal Assistant Onboarding\n"Welcome! I can help with scheduling,\nemail management, travel planning,\nand personal task automation"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Consent complexity challenge
    {
      id: 'consent-complexity',
      position: { x: 400, y: 200 },
      data: { label: '📋 Complex Consent Requirements\n"Multiple permissions needed:\nCalendar access, email reading, location tracking,\ncontact management, and cloud storage"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // Left path: Traditional consent overload
    {
      id: 'consent-overload',
      position: { x: 150, y: 350 },
      data: { label: '📄 Traditional Consent Overload\n"18-page privacy policy\nAll permissions requested upfront\nLegal jargon and technical terms"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 },
    },

    {
      id: 'user-overwhelm',
      position: { x: 150, y: 500 },
      data: { label: '😵‍💫 User Overwhelm\n"Too much information at once\nUnclear permission implications\nRushed consent decisions"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'blind-acceptance',
      position: { x: 150, y: 650 },
      data: { label: '✅ Blind Acceptance\n"Users click \'Accept All\'\nwithout reading or understanding\nUninformed consent decisions"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: Progressive consent flow
    {
      id: 'progressive-consent',
      position: { x: 650, y: 350 },
      data: { label: '🔄 Progressive Consent Flow\n"Just-in-time permissions\nContextual consent requests\nLayered information disclosure"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 220 },
    },

    // Progressive flow components
    {
      id: 'initial-essential',
      position: { x: 450, y: 500 },
      data: { label: '🏁 Initial Essential Permissions\n"Basic setup: Name and time zone\nCore functionality: Task creation\nMinimal viable consent for start"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    {
      id: 'contextual-requests',
      position: { x: 700, y: 500 },
      data: { label: '📍 Contextual Permission Requests\n"\'Schedule meeting?\' → Calendar access\n\'Check email for updates?\' → Email reading\nJust-in-time with clear purpose"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    {
      id: 'layered-disclosure',
      position: { x: 950, y: 500 },
      data: { label: '📰 Layered Information Disclosure\n"Quick summary → Details on demand\nVisual privacy icons and indicators\nPlain language explanations"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // Communication enhancements
    {
      id: 'risk-communication',
      position: { x: 450, y: 650 },
      data: { label: '⚠️ Clear Risk Communication\n"Low risk: Local calendar access\nMedium risk: Email content analysis\nHigh risk: Location history sharing"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },

    {
      id: 'benefit-explanation',
      position: { x: 700, y: 650 },
      data: { label: '💡 Benefit Explanation\n"With calendar access, I can:\n• Suggest optimal meeting times\n• Avoid scheduling conflicts\n• Send smart reminders"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    {
      id: 'adaptive-notifications',
      position: { x: 950, y: 650 },
      data: { label: '🔔 Adaptive Privacy Notifications\n"Weekly privacy summary\nAlert: New data sharing detected\nQuiet mode: Batch notifications"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },

    // User empowerment features
    {
      id: 'consent-preview',
      position: { x: 500, y: 800 },
      data: { label: '👁️ Consent Preview & Testing\n"Try feature with sample data\nPreview data access before consent\nTrial mode with revocation option"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    {
      id: 'micro-interactions',
      position: { x: 750, y: 800 },
      data: { label: '🎯 Consent Micro-Interactions\n"Swipe to grant temporary access\nHold to confirm permanent permission\nDrag to adjust scope granularity"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Outcomes
    {
      id: 'informed-decisions',
      position: { x: 625, y: 950 },
      data: { label: '🧠 Truly Informed Consent Decisions\n"Users understand implications\nMeaningful choice preservation\nConfident permission granting"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Core principle
    {
      id: 'progressive-principle',
      position: { x: 625, y: 1100 },
      data: { label: '🎯 Progressive Consent Principle\n"Consent should be contextual, timely, and comprehensible,\nrequested when needed with clear purpose,\nnot as overwhelming upfront information dumps."' },
      style: { ...nodeStyle, background: '#059669', minWidth: 450 },
    },
  ],
  initialEdges: [
    // Onboarding creates consent complexity
    {
      id: 'e1',
      source: 'ai-assistant-onboarding',
      target: 'consent-complexity',
      ...edgeStyle,
      label: 'requires multiple permissions'
    },

    // Two consent approaches
    {
      id: 'e2',
      source: 'consent-complexity',
      target: 'consent-overload',
      ...edgeStyle,
      label: 'traditional all-at-once'
    },
    {
      id: 'e3',
      source: 'consent-complexity',
      target: 'progressive-consent',
      ...edgeStyle,
      label: 'progressive just-in-time'
    },

    // Traditional consent problems
    {
      id: 'e4',
      source: 'consent-overload',
      target: 'user-overwhelm',
      ...edgeStyle,
      label: 'creates information overload'
    },
    {
      id: 'e5',
      source: 'user-overwhelm',
      target: 'blind-acceptance',
      ...edgeStyle,
      label: 'leads to uninformed choices',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },

    // Progressive consent components
    {
      id: 'e6',
      source: 'progressive-consent',
      target: 'initial-essential',
      ...edgeStyle,
      label: 'starts with minimal permissions'
    },
    {
      id: 'e7',
      source: 'progressive-consent',
      target: 'contextual-requests',
      ...edgeStyle,
      label: 'requests when needed'
    },
    {
      id: 'e8',
      source: 'progressive-consent',
      target: 'layered-disclosure',
      ...edgeStyle,
      label: 'provides information layers'
    },

    // Communication enhancements
    {
      id: 'e9',
      source: 'initial-essential',
      target: 'risk-communication',
      ...edgeStyle,
      label: 'explains risk levels'
    },
    {
      id: 'e10',
      source: 'contextual-requests',
      target: 'benefit-explanation',
      ...edgeStyle,
      label: 'clarifies value proposition'
    },
    {
      id: 'e11',
      source: 'layered-disclosure',
      target: 'adaptive-notifications',
      ...edgeStyle,
      label: 'enables smart notifications'
    },

    // User empowerment features
    {
      id: 'e12',
      source: 'risk-communication',
      target: 'consent-preview',
      ...edgeStyle,
      label: 'enables trial experiences'
    },
    {
      id: 'e13',
      source: 'benefit-explanation',
      target: 'consent-preview',
      ...edgeStyle,
      label: 'supports testing features'
    },
    {
      id: 'e14',
      source: 'adaptive-notifications',
      target: 'micro-interactions',
      ...edgeStyle,
      label: 'optimizes interaction design'
    },
    {
      id: 'e15',
      source: 'consent-preview',
      target: 'micro-interactions',
      ...edgeStyle,
      label: 'integrates with consent flow'
    },

    // Convergence to informed decisions
    {
      id: 'e16',
      source: 'consent-preview',
      target: 'informed-decisions',
      ...edgeStyle,
      label: 'enables experiential learning'
    },
    {
      id: 'e17',
      source: 'micro-interactions',
      target: 'informed-decisions',
      ...edgeStyle,
      label: 'improves consent UX'
    },

    // Converge to principle
    {
      id: 'e18',
      source: 'blind-acceptance',
      target: 'progressive-principle',
      ...edgeStyle,
      label: 'demonstrates problem',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e19',
      source: 'informed-decisions',
      target: 'progressive-principle',
      ...edgeStyle,
      label: 'validates approach',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "AI Assistant Onboarding with Complex Consent Requirements",
      description: "Personal AI assistant introduction requires multiple permissions (calendar, email, location, contacts, cloud storage) creating complex consent decision challenge for new users.",
      activeNodes: ['ai-assistant-onboarding', 'consent-complexity'],
      activeEdges: ['e1']
    },
    {
      title: "Two Consent Communication Approaches",
      description: "Complex permissions handled through traditional all-at-once consent overload with lengthy privacy policies (left) versus progressive just-in-time consent flow (right).",
      activeNodes: ['consent-overload', 'progressive-consent'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Traditional Consent: Overwhelm and Blind Acceptance",
      description: "18-page privacy policies and upfront permission requests create user overwhelm, leading to rushed decisions and blind 'Accept All' choices without understanding implications.",
      activeNodes: ['user-overwhelm', 'blind-acceptance'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "Progressive Consent Flow Components",
      description: "Progressive approach starts with minimal essential permissions, requests contextual access when features are used, and provides layered information disclosure with visual privacy indicators.",
      activeNodes: ['initial-essential', 'contextual-requests', 'layered-disclosure'],
      activeEdges: ['e6', 'e7', 'e8']
    },
    {
      title: "Enhanced Communication: Risk, Benefits, and Notifications",
      description: "Clear risk level communication (low/medium/high), explicit benefit explanations for each permission, and adaptive privacy notifications that respect user attention.",
      activeNodes: ['risk-communication', 'benefit-explanation', 'adaptive-notifications'],
      activeEdges: ['e9', 'e10', 'e11']
    },
    {
      title: "User Empowerment: Preview and Micro-Interactions",
      description: "Consent preview with sample data testing, trial modes with revocation options, and intuitive micro-interactions (swipe for temporary, hold for permanent, drag for granularity).",
      activeNodes: ['consent-preview', 'micro-interactions'],
      activeEdges: ['e12', 'e13', 'e14', 'e15']
    },
    {
      title: "Truly Informed Consent Decisions",
      description: "Progressive approach enables users to understand implications, preserve meaningful choice, and grant permissions with confidence through experiential learning and clear communication.",
      activeNodes: ['informed-decisions'],
      activeEdges: ['e16', 'e17']
    },
    {
      title: "Progressive Consent Principle",
      description: "Consent should be contextual, timely, and comprehensible—requested when needed with clear purpose, not as overwhelming upfront information dumps that lead to uninformed decisions.",
      activeNodes: ['progressive-principle'],
      activeEdges: ['e18', 'e19']
    }
  ]
};