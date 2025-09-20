import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const granularPrivacyControlsPattern: PatternScenario = {
  id: 'granular-privacy-controls',
  title: 'Granular Privacy Controls UX Pattern',
  description: 'Fine-grained permission management system enabling users to control specific data types, processing purposes, sharing contexts, and retention periods with contextual consent mechanisms and easy revocation controls',
  initialNodes: [
    // User scenario
    {
      id: 'smart-home-setup',
      position: { x: 400, y: 50 },
      data: { label: '🏠 Smart Home Agent Setup\n"User configures AI home assistant\nfor energy optimization, security monitoring,\nand family schedule coordination"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Permission complexity
    {
      id: 'permission-complexity',
      position: { x: 400, y: 200 },
      data: { label: '🔐 Complex Permission Requirements\n"Multiple data types: location, voice, video\nVarious purposes: optimization, security, convenience\nDifferent sharing needs and privacy levels"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 280 },
    },

    // Left path: Binary consent model
    {
      id: 'binary-consent',
      position: { x: 150, y: 350 },
      data: { label: '⚫⚪ Binary Consent Model\n"All-or-nothing permissions\nAccept all terms or no service\nNo contextual controls"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 },
    },

    {
      id: 'user-frustration',
      position: { x: 150, y: 500 },
      data: { label: '😤 User Frustration\n"Forced to over-share data\nLack of meaningful choice\nPrivacy concerns ignored"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'system-abandonment',
      position: { x: 150, y: 650 },
      data: { label: '🚪 System Abandonment\n"Users reject invasive terms\nReduced adoption rates\nMissed functionality benefits"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: Granular controls
    {
      id: 'granular-controls',
      position: { x: 650, y: 350 },
      data: { label: '🎛️ Granular Privacy Controls\n"Fine-grained permission system\nContextual consent mechanisms\nPurpose-specific authorizations"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 220 },
    },

    // Data type controls
    {
      id: 'data-type-controls',
      position: { x: 450, y: 500 },
      data: { label: '📊 Data Type Controls\n"Location: Energy optimization only\nVoice: Commands, not conversations\nVideo: Security zones, not bedrooms"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // Purpose limitation controls
    {
      id: 'purpose-controls',
      position: { x: 700, y: 500 },
      data: { label: '🎯 Purpose Limitation Controls\n"Energy data: Optimization only\nSecurity data: Threat detection\nSchedule data: Family coordination"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // Temporal controls
    {
      id: 'temporal-controls',
      position: { x: 950, y: 500 },
      data: { label: '⏰ Temporal Controls\n"Voice commands: Delete daily\nSecurity alerts: 30-day retention\nEnergy patterns: Annual storage"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    // Sharing controls
    {
      id: 'sharing-controls',
      position: { x: 450, y: 650 },
      data: { label: '🤝 Sharing Controls\n"Emergency services: Security data only\nUtility company: Anonymous energy stats\nFamily members: Schedule info only"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },

    // Contextual consent
    {
      id: 'contextual-consent',
      position: { x: 700, y: 650 },
      data: { label: '📍 Contextual Consent\n"Just-in-time permissions\nSituation-aware prompts\nAutomatic policy application"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    // Easy revocation
    {
      id: 'easy-revocation',
      position: { x: 950, y: 650 },
      data: { label: '🔄 Easy Revocation\n"One-click permission removal\nGranular setting adjustments\nImmediate effect application"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    // Outcomes
    {
      id: 'user-empowerment',
      position: { x: 575, y: 800 },
      data: { label: '💪 User Empowerment\n"Meaningful privacy choices\nComfortable data sharing\nTrust in system controls"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    {
      id: 'optimal-functionality',
      position: { x: 825, y: 800 },
      data: { label: '⚡ Optimal Functionality\n"Balanced privacy-utility\nCustomized user experience\nMaximized system value"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Core granular control principle
    {
      id: 'granular-principle',
      position: { x: 650, y: 950 },
      data: { label: '🎯 Granular Control Principle\n"Users should have fine-grained control over their data,\nspecifying not just what is shared, but how, when, why,\nwith whom, and for how long—with easy changes anytime."' },
      style: { ...nodeStyle, background: '#059669', minWidth: 450 },
    },
  ],
  initialEdges: [
    // Smart home setup requires complex permissions
    {
      id: 'e1',
      source: 'smart-home-setup',
      target: 'permission-complexity',
      ...edgeStyle,
      label: 'requires multiple data types'
    },

    // Two permission approaches
    {
      id: 'e2',
      source: 'permission-complexity',
      target: 'binary-consent',
      ...edgeStyle,
      label: 'all-or-nothing model'
    },
    {
      id: 'e3',
      source: 'permission-complexity',
      target: 'granular-controls',
      ...edgeStyle,
      label: 'fine-grained control model'
    },

    // Binary consent problems
    {
      id: 'e4',
      source: 'binary-consent',
      target: 'user-frustration',
      ...edgeStyle,
      label: 'forces over-sharing'
    },
    {
      id: 'e5',
      source: 'user-frustration',
      target: 'system-abandonment',
      ...edgeStyle,
      label: 'leads to rejection',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },

    // Granular control components
    {
      id: 'e6',
      source: 'granular-controls',
      target: 'data-type-controls',
      ...edgeStyle,
      label: 'specific data permissions'
    },
    {
      id: 'e7',
      source: 'granular-controls',
      target: 'purpose-controls',
      ...edgeStyle,
      label: 'purpose-specific consent'
    },
    {
      id: 'e8',
      source: 'granular-controls',
      target: 'temporal-controls',
      ...edgeStyle,
      label: 'time-based limits'
    },

    // Advanced control features
    {
      id: 'e9',
      source: 'data-type-controls',
      target: 'sharing-controls',
      ...edgeStyle,
      label: 'enables sharing decisions'
    },
    {
      id: 'e10',
      source: 'purpose-controls',
      target: 'contextual-consent',
      ...edgeStyle,
      label: 'supports just-in-time prompts'
    },
    {
      id: 'e11',
      source: 'temporal-controls',
      target: 'easy-revocation',
      ...edgeStyle,
      label: 'facilitates adjustments'
    },

    // Cross-connections for comprehensive control
    {
      id: 'e12',
      source: 'sharing-controls',
      target: 'contextual-consent',
      ...edgeStyle,
      label: 'context-aware sharing'
    },
    {
      id: 'e13',
      source: 'contextual-consent',
      target: 'easy-revocation',
      ...edgeStyle,
      label: 'immediate adjustment'
    },

    // Positive outcomes
    {
      id: 'e14',
      source: 'sharing-controls',
      target: 'user-empowerment',
      ...edgeStyle,
      label: 'creates meaningful choice'
    },
    {
      id: 'e15',
      source: 'contextual-consent',
      target: 'user-empowerment',
      ...edgeStyle,
      label: 'builds confidence'
    },
    {
      id: 'e16',
      source: 'easy-revocation',
      target: 'optimal-functionality',
      ...edgeStyle,
      label: 'encourages experimentation'
    },
    {
      id: 'e17',
      source: 'user-empowerment',
      target: 'optimal-functionality',
      ...edgeStyle,
      label: 'enables custom experience'
    },

    // Converge to granular principle
    {
      id: 'e18',
      source: 'system-abandonment',
      target: 'granular-principle',
      ...edgeStyle,
      label: 'demonstrates necessity',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e19',
      source: 'user-empowerment',
      target: 'granular-principle',
      ...edgeStyle,
      label: 'validates approach',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e20',
      source: 'optimal-functionality',
      target: 'granular-principle',
      ...edgeStyle,
      label: 'proves effectiveness',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Smart Home Agent Complex Permission Requirements",
      description: "User sets up AI home assistant requiring multiple data types (location, voice, video) for various purposes (energy optimization, security monitoring, family coordination) with different privacy sensitivities.",
      activeNodes: ['smart-home-setup', 'permission-complexity'],
      activeEdges: ['e1']
    },
    {
      title: "Two Permission Management Approaches",
      description: "Same complex permission requirements handled through binary all-or-nothing consent model (left) versus granular fine-grained control system (right).",
      activeNodes: ['binary-consent', 'granular-controls'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Binary Consent: User Frustration and System Abandonment",
      description: "All-or-nothing model forces users to over-share data or lose functionality, creating frustration that leads to system rejection and reduced adoption rates.",
      activeNodes: ['user-frustration', 'system-abandonment'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "Granular Control Components: Data, Purpose, and Time",
      description: "Fine-grained system provides specific controls for data types (location for energy only), purposes (security data for threats only), and retention periods (voice commands deleted daily).",
      activeNodes: ['data-type-controls', 'purpose-controls', 'temporal-controls'],
      activeEdges: ['e6', 'e7', 'e8']
    },
    {
      title: "Advanced Control Features: Sharing, Context, and Revocation",
      description: "Sophisticated controls enable sharing decisions (emergency services get security data only), contextual consent (just-in-time prompts), and easy permission revocation with immediate effect.",
      activeNodes: ['sharing-controls', 'contextual-consent', 'easy-revocation'],
      activeEdges: ['e9', 'e10', 'e11', 'e12', 'e13']
    },
    {
      title: "User Empowerment and Optimal Functionality",
      description: "Granular controls create meaningful privacy choices that build user confidence, enabling customized experiences that balance privacy with functionality for maximum system value.",
      activeNodes: ['user-empowerment', 'optimal-functionality'],
      activeEdges: ['e14', 'e15', 'e16', 'e17']
    },
    {
      title: "Core Granular Control Principle",
      description: "Users deserve fine-grained control over their data, specifying not just what is shared, but how, when, why, with whom, and for how long, with the ability to change these settings easily at any time.",
      activeNodes: ['granular-principle'],
      activeEdges: ['e18', 'e19', 'e20']
    }
  ]
};