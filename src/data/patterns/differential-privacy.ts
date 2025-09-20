import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const differentialPrivacyPattern: PatternScenario = {
  id: 'differential-privacy',
  title: 'Differential Privacy Pattern',
  description: 'Privacy-preserving data processing with mathematical privacy guarantees through controlled noise injection and epsilon-delta privacy budgets',
  initialNodes: [
    // Medical research scenario
    {
      id: 'medical-research',
      position: { x: 400, y: 50 },
      data: { label: '🏥 Medical Research Query\n"What\'s the average salary of patients\nwith diabetes in our database?\n(10,000 patient records)"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Privacy challenge
    {
      id: 'privacy-challenge',
      position: { x: 400, y: 200 },
      data: { label: '🔍 Privacy Challenge\n"Direct query could reveal\nindividual patient information\nthrough statistical inference"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 280 },
    },

    // Left path: No privacy protection
    {
      id: 'no-privacy',
      position: { x: 150, y: 350 },
      data: { label: '⚠️ No Privacy Protection\n"Direct database query\nExact statistical results\nNo noise or obfuscation"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 },
    },

    {
      id: 'exact-result',
      position: { x: 150, y: 500 },
      data: { label: '📊 Exact Result\n"Average salary: $47,832.15\n(Precise to the cent)\nStatistically perfect accuracy"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'privacy-breach',
      position: { x: 150, y: 650 },
      data: { label: '🚨 Privacy Vulnerable\n"Auxiliary attacks possible\nIndividual inference risk\nNo plausible deniability"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: Differential privacy protection
    {
      id: 'differential-privacy',
      position: { x: 650, y: 350 },
      data: { label: '🛡️ Differential Privacy\n"ε-differential privacy (ε=0.1)\nLaplace noise mechanism\nPrivacy budget management"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 220 },
    },

    {
      id: 'noise-injection',
      position: { x: 650, y: 500 },
      data: { label: '🎲 Controlled Noise Injection\n"True result: $47,832.15\nNoise: +$1,247.38\nPrivate result: $49,079.53"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    {
      id: 'privacy-guarantee',
      position: { x: 650, y: 650 },
      data: { label: '✅ Mathematical Privacy Guarantee\n"Individual presence/absence\nindistinguishable with high probability\nPlausible deniability preserved"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    {
      id: 'utility-preserved',
      position: { x: 650, y: 800 },
      data: { label: '📈 Utility Preserved\n"Statistical trends maintained\nResearch insights valid\nPrivacy-utility trade-off optimized"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Key privacy principle
    {
      id: 'privacy-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Differential Privacy Principle\n"Mathematical guarantee: Your data inclusion\ncannot be determined from query results\nControlled noise = Quantified privacy"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 320 },
    },
  ],
  initialEdges: [
    // Research query faces privacy challenge
    {
      id: 'e1',
      source: 'medical-research',
      target: 'privacy-challenge',
      ...edgeStyle,
      label: 'creates privacy risk'
    },

    // Split into protected vs unprotected approaches
    {
      id: 'e2',
      source: 'privacy-challenge',
      target: 'no-privacy',
      ...edgeStyle,
      label: 'direct query approach'
    },
    {
      id: 'e3',
      source: 'privacy-challenge',
      target: 'differential-privacy',
      ...edgeStyle,
      label: 'privacy-preserving approach'
    },

    // Left path: No privacy protection risks
    {
      id: 'e4',
      source: 'no-privacy',
      target: 'exact-result',
      ...edgeStyle,
      label: 'returns precise answer'
    },
    {
      id: 'e5',
      source: 'exact-result',
      target: 'privacy-breach',
      ...edgeStyle,
      label: 'enables inference attacks',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },

    // Right path: Differential privacy protection
    {
      id: 'e6',
      source: 'differential-privacy',
      target: 'noise-injection',
      ...edgeStyle,
      label: 'applies Laplace mechanism'
    },
    {
      id: 'e7',
      source: 'noise-injection',
      target: 'privacy-guarantee',
      ...edgeStyle,
      label: 'provides mathematical guarantee'
    },
    {
      id: 'e8',
      source: 'privacy-guarantee',
      target: 'utility-preserved',
      ...edgeStyle,
      label: 'maintains research value'
    },

    // Converge to privacy principle
    {
      id: 'e9',
      source: 'privacy-breach',
      target: 'privacy-principle',
      ...edgeStyle,
      label: 'demonstrates need',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e10',
      source: 'utility-preserved',
      target: 'privacy-principle',
      ...edgeStyle,
      label: 'proves effectiveness',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Medical Research Privacy Challenge",
      description: "Researcher needs average salary of diabetic patients from 10,000 records, but direct query could reveal individual information through statistical inference attacks.",
      activeNodes: ['medical-research', 'privacy-challenge'],
      activeEdges: ['e1']
    },
    {
      title: "Two Data Processing Approaches",
      description: "Same research query processed through two different systems: direct database access (left) vs differential privacy protection (right).",
      activeNodes: ['no-privacy', 'differential-privacy'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Unprotected System: Perfect Accuracy, No Privacy",
      description: "Direct query returns precise result ($47,832.15) with perfect statistical accuracy but enables auxiliary attacks and individual inference with no plausible deniability.",
      activeNodes: ['exact-result', 'privacy-breach'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "Differential Privacy: Controlled Noise Injection",
      description: "ε-differential privacy (ε=0.1) applies Laplace noise mechanism, adding $1,247.38 noise to true result, producing private answer of $49,079.53.",
      activeNodes: ['noise-injection'],
      activeEdges: ['e6']
    },
    {
      title: "Mathematical Privacy Guarantee",
      description: "Noise provides mathematical guarantee that individual presence/absence in database is indistinguishable with high probability, preserving plausible deniability.",
      activeNodes: ['privacy-guarantee'],
      activeEdges: ['e7']
    },
    {
      title: "Privacy-Utility Balance and Core Principle",
      description: "Research utility preserved while privacy protected, demonstrating that controlled noise provides quantified privacy guarantees without destroying statistical insights.",
      activeNodes: ['utility-preserved', 'privacy-principle'],
      activeEdges: ['e8', 'e9', 'e10']
    }
  ]
};