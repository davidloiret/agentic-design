import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const transparentDataHandlingPattern: PatternScenario = {
  id: 'transparent-data-handling',
  title: 'Transparent Data Handling Visualization',
  description: 'Real-time visualization of data flows, processing activities, storage locations, and third-party sharing in agent systems, providing users clear understanding of their data lifecycle and enabling informed consent decisions',
  initialNodes: [
    // User data submission
    {
      id: 'user-data-submission',
      position: { x: 400, y: 50 },
      data: { label: '📄 User Document Upload\n"User uploads personal health records\nto AI medical diagnosis agent\nfor symptom analysis and recommendations"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Data entry point
    {
      id: 'data-entry-point',
      position: { x: 400, y: 200 },
      data: { label: '🔍 Data Classification & Analysis\n"Personal health information detected:\n• Medical history (sensitive)\n• Symptoms (personal)\n• Insurance details (financial)"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 280 },
    },

    // Left path: Opaque processing
    {
      id: 'opaque-processing',
      position: { x: 150, y: 350 },
      data: { label: '⚫ Opaque Data Processing\n"Data disappears into black box\nNo visibility into processing steps\nUnknown storage locations"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 },
    },

    {
      id: 'user-uncertainty',
      position: { x: 150, y: 500 },
      data: { label: '❓ User Uncertainty\n"Where is my data stored?\nWho has access to it?\nHow long is it retained?"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'trust-erosion',
      position: { x: 150, y: 650 },
      data: { label: '📉 Trust Erosion\n"Lack of transparency\nUser anxiety about privacy\nReduced system adoption"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: Transparent processing
    {
      id: 'transparent-processing',
      position: { x: 650, y: 350 },
      data: { label: '🔬 Transparent Data Flow Visualization\n"Real-time data journey display\nProcessing step documentation\nStorage location mapping"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 240 },
    },

    // Data flow visualization components
    {
      id: 'processing-visualization',
      position: { x: 450, y: 500 },
      data: { label: '⚙️ Processing Transparency\n"Step 1: Data encryption (AES-256)\nStep 2: Symptom pattern analysis\nStep 3: Medical knowledge matching"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    {
      id: 'storage-transparency',
      position: { x: 700, y: 500 },
      data: { label: '🏠 Storage Transparency\n"Primary: Encrypted EU servers\nBackup: US HIPAA-compliant facility\nRetention: 7 years as required"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    {
      id: 'sharing-disclosure',
      position: { x: 850, y: 500 },
      data: { label: '🤝 Third-Party Sharing\n"Specialist referral network:\n• Anonymized symptoms only\n• Explicit consent required\n• Audit trail maintained"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // Real-time monitoring
    {
      id: 'real-time-monitoring',
      position: { x: 500, y: 650 },
      data: { label: '📊 Real-Time Activity Monitor\n"Live data processing status\nAccess log visualization\nRetention countdown timer"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },

    {
      id: 'user-control-center',
      position: { x: 750, y: 650 },
      data: { label: '🎛️ User Control Center\n"Pause data processing\nRevoke sharing permissions\nRequest data deletion"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    // Outcomes
    {
      id: 'informed-consent',
      position: { x: 500, y: 800 },
      data: { label: '✅ Informed Consent\n"Users understand data journey\nMeaningful consent decisions\nConfident system usage"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    {
      id: 'regulatory-compliance',
      position: { x: 750, y: 800 },
      data: { label: '📋 Regulatory Compliance\n"GDPR transparency requirements\nHIPAA disclosure standards\nCCPA right to know"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Core transparency principle
    {
      id: 'transparency-principle',
      position: { x: 500, y: 950 },
      data: { label: '🎯 Transparency Principle\n"Users have the right to understand how their data is processed,\nstored, and shared in real-time, not just through static policies.\nTransparency enables true informed consent."' },
      style: { ...nodeStyle, background: '#059669', minWidth: 450 },
    },
  ],
  initialEdges: [
    // User submits health data
    {
      id: 'e1',
      source: 'user-data-submission',
      target: 'data-entry-point',
      ...edgeStyle,
      label: 'sensitive data classification'
    },

    // Two processing approaches
    {
      id: 'e2',
      source: 'data-entry-point',
      target: 'opaque-processing',
      ...edgeStyle,
      label: 'traditional black box'
    },
    {
      id: 'e3',
      source: 'data-entry-point',
      target: 'transparent-processing',
      ...edgeStyle,
      label: 'transparency framework'
    },

    // Opaque processing consequences
    {
      id: 'e4',
      source: 'opaque-processing',
      target: 'user-uncertainty',
      ...edgeStyle,
      label: 'creates confusion'
    },
    {
      id: 'e5',
      source: 'user-uncertainty',
      target: 'trust-erosion',
      ...edgeStyle,
      label: 'reduces confidence',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },

    // Transparent processing components
    {
      id: 'e6',
      source: 'transparent-processing',
      target: 'processing-visualization',
      ...edgeStyle,
      label: 'shows processing steps'
    },
    {
      id: 'e7',
      source: 'transparent-processing',
      target: 'storage-transparency',
      ...edgeStyle,
      label: 'reveals storage details'
    },
    {
      id: 'e8',
      source: 'transparent-processing',
      target: 'sharing-disclosure',
      ...edgeStyle,
      label: 'discloses third-party access'
    },

    // Real-time monitoring and control
    {
      id: 'e9',
      source: 'processing-visualization',
      target: 'real-time-monitoring',
      ...edgeStyle,
      label: 'enables live tracking'
    },
    {
      id: 'e10',
      source: 'storage-transparency',
      target: 'real-time-monitoring',
      ...edgeStyle,
      label: 'monitors storage activity'
    },
    {
      id: 'e11',
      source: 'sharing-disclosure',
      target: 'user-control-center',
      ...edgeStyle,
      label: 'provides control options'
    },
    {
      id: 'e12',
      source: 'real-time-monitoring',
      target: 'user-control-center',
      ...edgeStyle,
      label: 'integrates with controls'
    },

    // Positive outcomes
    {
      id: 'e13',
      source: 'real-time-monitoring',
      target: 'informed-consent',
      ...edgeStyle,
      label: 'enables understanding'
    },
    {
      id: 'e14',
      source: 'user-control-center',
      target: 'informed-consent',
      ...edgeStyle,
      label: 'empowers decisions'
    },
    {
      id: 'e15',
      source: 'user-control-center',
      target: 'regulatory-compliance',
      ...edgeStyle,
      label: 'meets legal requirements'
    },

    // Converge to transparency principle
    {
      id: 'e16',
      source: 'trust-erosion',
      target: 'transparency-principle',
      ...edgeStyle,
      label: 'demonstrates need',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e17',
      source: 'informed-consent',
      target: 'transparency-principle',
      ...edgeStyle,
      label: 'validates approach',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e18',
      source: 'regulatory-compliance',
      target: 'transparency-principle',
      ...edgeStyle,
      label: 'confirms requirements',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Sensitive Health Data Submission",
      description: "User uploads personal health records to AI medical diagnosis agent, including medical history, current symptoms, and insurance information requiring careful handling.",
      activeNodes: ['user-data-submission', 'data-entry-point'],
      activeEdges: ['e1']
    },
    {
      title: "Two Data Processing Paradigms",
      description: "Same sensitive health data processed through traditional opaque black box system (left) versus transparent data flow visualization framework (right).",
      activeNodes: ['opaque-processing', 'transparent-processing'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Opaque Processing: User Uncertainty and Trust Erosion",
      description: "Traditional black box approach leaves users questioning data location, access permissions, and retention periods, leading to reduced trust and system adoption.",
      activeNodes: ['user-uncertainty', 'trust-erosion'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "Transparent Data Flow Components",
      description: "Transparency framework provides real-time visualization of processing steps (encryption, analysis, matching), storage locations (EU servers, US backup), and third-party sharing (specialist referrals).",
      activeNodes: ['processing-visualization', 'storage-transparency', 'sharing-disclosure'],
      activeEdges: ['e6', 'e7', 'e8']
    },
    {
      title: "Real-Time Monitoring and User Control",
      description: "Live activity monitoring shows data processing status and access logs, while user control center enables pausing processing, revoking permissions, and requesting deletion.",
      activeNodes: ['real-time-monitoring', 'user-control-center'],
      activeEdges: ['e9', 'e10', 'e11', 'e12']
    },
    {
      title: "Informed Consent and Regulatory Compliance",
      description: "Transparency enables users to make informed consent decisions with full understanding of data journey, while meeting GDPR transparency, HIPAA disclosure, and CCPA right-to-know requirements.",
      activeNodes: ['informed-consent', 'regulatory-compliance'],
      activeEdges: ['e13', 'e14', 'e15']
    },
    {
      title: "Core Transparency Principle",
      description: "Real-time data transparency goes beyond static privacy policies, giving users dynamic visibility into their data lifecycle to enable truly informed consent decisions.",
      activeNodes: ['transparency-principle'],
      activeEdges: ['e16', 'e17', 'e18']
    }
  ]
};