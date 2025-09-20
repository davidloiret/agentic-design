import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const userEmpowermentPrivacyDashboardPattern: PatternScenario = {
  id: 'user-empowerment-privacy-dashboard',
  title: 'User Empowerment Privacy Dashboard',
  description: 'Comprehensive self-sovereign data management interface providing users complete visibility and control over their personal data across agent systems, including privacy insights, data portability, and automated privacy rights enforcement',
  initialNodes: [
    // User privacy awareness need
    {
      id: 'privacy-awareness-need',
      position: { x: 400, y: 50 },
      data: { label: '🤔 Privacy Awareness Challenge\n"User realizes multiple AI agents\nhave collected personal data but lacks\nvisibility into what, where, and how"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // Data sprawl problem
    {
      id: 'data-sprawl',
      position: { x: 400, y: 200 },
      data: { label: '📈 Data Sprawl Across Systems\n"Financial agent: Banking data\nHealth agent: Medical records\nSmart home: Behavioral patterns"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 280 },
    },

    // Left path: Fragmented visibility
    {
      id: 'fragmented-visibility',
      position: { x: 150, y: 350 },
      data: { label: '🔍 Fragmented Privacy Visibility\n"Separate privacy policies\nScattered data locations\nNo unified control interface"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 },
    },

    {
      id: 'user-helplessness',
      position: { x: 150, y: 500 },
      data: { label: '😵 User Helplessness\n"Can\'t track data usage\nUnclear deletion procedures\nNo meaningful control"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'privacy-fatigue',
      position: { x: 150, y: 650 },
      data: { label: '😴 Privacy Fatigue\n"Overwhelmed by complexity\nGives up on privacy management\nAccepts default settings"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: Empowerment dashboard
    {
      id: 'empowerment-dashboard',
      position: { x: 650, y: 350 },
      data: { label: '📊 User Empowerment Dashboard\n"Unified privacy control center\nComprehensive data visibility\nSelf-sovereign data management"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 240 },
    },

    // Dashboard core features
    {
      id: 'data-inventory',
      position: { x: 450, y: 500 },
      data: { label: '📋 Personal Data Inventory\n"Complete data catalog across systems\nData type classification\nCollection date and source tracking"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    {
      id: 'usage-insights',
      position: { x: 700, y: 500 },
      data: { label: '📈 Usage Insights & Analytics\n"Data access frequency charts\nProcessing activity timeline\nThird-party sharing reports"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    {
      id: 'privacy-score',
      position: { x: 950, y: 500 },
      data: { label: '🏆 Privacy Health Score\n"Real-time privacy rating\nRisk assessment indicators\nPersonalized recommendations"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    // Control features
    {
      id: 'data-portability',
      position: { x: 400, y: 650 },
      data: { label: '📦 Data Portability Hub\n"One-click export to standard formats\nCross-platform data migration\nAPI access for data integration"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },

    {
      id: 'automated-rights',
      position: { x: 650, y: 650 },
      data: { label: '⚙️ Automated Rights Enforcement\n"Scheduled data deletion\nAutomatic consent withdrawal\nPolicy violation alerts"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },

    {
      id: 'privacy-assistant',
      position: { x: 900, y: 650 },
      data: { label: '🤖 AI Privacy Assistant\n"Personalized privacy recommendations\nThreat detection and warnings\nOptimal settings suggestions"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },

    // Advanced features
    {
      id: 'consent-management',
      position: { x: 450, y: 800 },
      data: { label: '✅ Centralized Consent Management\n"Universal consent revocation\nGranular permission adjustments\nConsent history tracking"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    {
      id: 'privacy-marketplace',
      position: { x: 750, y: 800 },
      data: { label: '🏪 Privacy Marketplace\n"Data monetization options\nPrivacy service recommendations\nTrust score vendor ratings"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Outcomes
    {
      id: 'true-empowerment',
      position: { x: 600, y: 950 },
      data: { label: '💪 True User Empowerment\n"Complete data sovereignty\nInformed privacy decisions\nMeaningful control over digital life"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Core empowerment principle
    {
      id: 'empowerment-principle',
      position: { x: 600, y: 1100 },
      data: { label: '🎯 User Empowerment Principle\n"Users should have complete sovereignty over their data\nwith comprehensive visibility, effortless control,\nand proactive protection across all systems."' },
      style: { ...nodeStyle, background: '#059669', minWidth: 450 },
    },
  ],
  initialEdges: [
    // Privacy awareness creates data sprawl recognition
    {
      id: 'e1',
      source: 'privacy-awareness-need',
      target: 'data-sprawl',
      ...edgeStyle,
      label: 'reveals complexity'
    },

    // Two approaches to data sprawl
    {
      id: 'e2',
      source: 'data-sprawl',
      target: 'fragmented-visibility',
      ...edgeStyle,
      label: 'traditional scattered approach'
    },
    {
      id: 'e3',
      source: 'data-sprawl',
      target: 'empowerment-dashboard',
      ...edgeStyle,
      label: 'unified empowerment approach'
    },

    // Fragmented visibility problems
    {
      id: 'e4',
      source: 'fragmented-visibility',
      target: 'user-helplessness',
      ...edgeStyle,
      label: 'creates confusion'
    },
    {
      id: 'e5',
      source: 'user-helplessness',
      target: 'privacy-fatigue',
      ...edgeStyle,
      label: 'leads to abandonment',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },

    // Dashboard core features
    {
      id: 'e6',
      source: 'empowerment-dashboard',
      target: 'data-inventory',
      ...edgeStyle,
      label: 'provides data catalog'
    },
    {
      id: 'e7',
      source: 'empowerment-dashboard',
      target: 'usage-insights',
      ...edgeStyle,
      label: 'shows activity analytics'
    },
    {
      id: 'e8',
      source: 'empowerment-dashboard',
      target: 'privacy-score',
      ...edgeStyle,
      label: 'calculates privacy health'
    },

    // Control features integration
    {
      id: 'e9',
      source: 'data-inventory',
      target: 'data-portability',
      ...edgeStyle,
      label: 'enables export capabilities'
    },
    {
      id: 'e10',
      source: 'usage-insights',
      target: 'automated-rights',
      ...edgeStyle,
      label: 'triggers automated actions'
    },
    {
      id: 'e11',
      source: 'privacy-score',
      target: 'privacy-assistant',
      ...edgeStyle,
      label: 'powers AI recommendations'
    },

    // Advanced features connections
    {
      id: 'e12',
      source: 'data-portability',
      target: 'consent-management',
      ...edgeStyle,
      label: 'integrates with consent'
    },
    {
      id: 'e13',
      source: 'automated-rights',
      target: 'consent-management',
      ...edgeStyle,
      label: 'automates consent changes'
    },
    {
      id: 'e14',
      source: 'privacy-assistant',
      target: 'privacy-marketplace',
      ...edgeStyle,
      label: 'recommends services'
    },
    {
      id: 'e15',
      source: 'consent-management',
      target: 'privacy-marketplace',
      ...edgeStyle,
      label: 'manages vendor permissions'
    },

    // Convergence to empowerment
    {
      id: 'e16',
      source: 'consent-management',
      target: 'true-empowerment',
      ...edgeStyle,
      label: 'enables control'
    },
    {
      id: 'e17',
      source: 'privacy-marketplace',
      target: 'true-empowerment',
      ...edgeStyle,
      label: 'provides options'
    },

    // Final principle
    {
      id: 'e18',
      source: 'privacy-fatigue',
      target: 'empowerment-principle',
      ...edgeStyle,
      label: 'demonstrates need',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e19',
      source: 'true-empowerment',
      target: 'empowerment-principle',
      ...edgeStyle,
      label: 'validates approach',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Privacy Awareness and Data Sprawl Recognition",
      description: "User becomes aware that multiple AI agents (financial, health, smart home) have collected extensive personal data across different systems, creating complex data sprawl without unified visibility.",
      activeNodes: ['privacy-awareness-need', 'data-sprawl'],
      activeEdges: ['e1']
    },
    {
      title: "Two Approaches to Privacy Management",
      description: "Data sprawl managed through traditional fragmented visibility with scattered privacy policies (left) versus unified user empowerment dashboard approach (right).",
      activeNodes: ['fragmented-visibility', 'empowerment-dashboard'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Fragmented Approach: Helplessness and Privacy Fatigue",
      description: "Scattered privacy controls across systems create user confusion and helplessness, leading to privacy fatigue where users give up on meaningful privacy management.",
      activeNodes: ['user-helplessness', 'privacy-fatigue'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "Dashboard Core Features: Inventory, Insights, and Health Score",
      description: "Empowerment dashboard provides complete personal data inventory across systems, usage analytics with activity timelines, and real-time privacy health scoring with personalized recommendations.",
      activeNodes: ['data-inventory', 'usage-insights', 'privacy-score'],
      activeEdges: ['e6', 'e7', 'e8']
    },
    {
      title: "Control Features: Portability, Automation, and AI Assistant",
      description: "Advanced control features enable one-click data export, automated rights enforcement with scheduled deletions, and AI privacy assistant providing personalized threat detection and settings optimization.",
      activeNodes: ['data-portability', 'automated-rights', 'privacy-assistant'],
      activeEdges: ['e9', 'e10', 'e11']
    },
    {
      title: "Advanced Empowerment: Consent Management and Privacy Marketplace",
      description: "Sophisticated features include centralized consent management with universal revocation capabilities and privacy marketplace for data monetization options with vendor trust ratings.",
      activeNodes: ['consent-management', 'privacy-marketplace'],
      activeEdges: ['e12', 'e13', 'e14', 'e15']
    },
    {
      title: "True User Empowerment Achievement",
      description: "Comprehensive dashboard achieves complete data sovereignty with informed privacy decisions and meaningful control over digital life, transforming users from passive subjects to active privacy managers.",
      activeNodes: ['true-empowerment'],
      activeEdges: ['e16', 'e17']
    },
    {
      title: "Core User Empowerment Principle",
      description: "Users deserve complete sovereignty over their data with comprehensive visibility, effortless control, and proactive protection across all systems, not fragmented privacy theater.",
      activeNodes: ['empowerment-principle'],
      activeEdges: ['e18', 'e19']
    }
  ]
};