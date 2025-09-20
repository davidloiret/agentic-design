import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const onboardingEducationPatternsPattern: PatternScenario = {
  id: 'onboarding-education-patterns',
  title: 'Onboarding and Education Patterns for AI Agents',
  description: 'Comprehensive patterns for user education, mental model formation, progressive capability introduction, and trust-building in AI agent systems achieving 78% adoption rates and 86% loyalty improvements',
  initialNodes: [
    // Challenge of AI agent adoption
    {
      id: 'adoption-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🤔 AI Agent Adoption Challenge\n"How to onboard users to AI agents\nwhile building appropriate mental models,\ntrust, and sustained engagement?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 340 },
    },

    // Mental model formation
    {
      id: 'mental-model-formation',
      position: { x: 150, y: 200 },
      data: { label: '🧠 Mental Model Formation\n"Building understanding:\n• Existing model alignment\n• Expectation calibration\n• Capability boundaries\n• Adaptation feedback"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 260 },
    },

    // Progressive disclosure
    {
      id: 'progressive-disclosure',
      position: { x: 650, y: 200 },
      data: { label: '📚 Progressive Disclosure\n"Scaffolded learning:\n• Staged feature unlock\n• Complexity management\n• Contextual guidance\n• Incremental mastery"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 250 },
    },

    // Trust building mechanisms
    {
      id: 'trust-building',
      position: { x: 100, y: 350 },
      data: { label: '🔐 Trust Building Mechanisms\n"Establishing confidence:\n• Transparency patterns\n• Mindful friction\n• Explainable decisions\n• Human oversight"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },

    // Capability introduction
    {
      id: 'capability-introduction',
      position: { x: 300, y: 350 },
      data: { label: '🎯 Capability Introduction\n"Strategic feature reveal:\n• Core function first\n• Secondary features\n• Advanced capabilities\n• Use case expansion"' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 240 },
    },

    // Interactive tutorials
    {
      id: 'interactive-tutorials',
      position: { x: 500, y: 350 },
      data: { label: '🎮 Interactive Tutorials\n"Guided experiences:\n• Hands-on exploration\n• Step-by-step learning\n• Safe practice space\n• Immediate feedback"' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 240 },
    },

    // Multimodal education
    {
      id: 'multimodal-education',
      position: { x: 700, y: 350 },
      data: { label: '🎨 Multimodal Education\n"Learning formats:\n• Visual demonstrations\n• Interactive content\n• Audio guidance\n• Kinesthetic practice"' },
      style: { ...nodeStyle, background: '#0891b2', minWidth: 240 },
    },

    // Misconception correction
    {
      id: 'misconception-correction',
      position: { x: 50, y: 500 },
      data: { label: '🔧 Misconception Correction\n"Calibration patterns:\n• Boundary communication\n• Error explanation\n• Expectation adjustment\n• Reality grounding"' },
      style: { ...nodeStyle, background: '#ea580c', minWidth: 240 },
    },

    // Social proof validation
    {
      id: 'social-proof',
      position: { x: 250, y: 500 },
      data: { label: '👥 Social Proof Validation\n"Community learning:\n• User testimonials\n• Success stories\n• Peer interactions\n• Expert endorsements"' },
      style: { ...nodeStyle, background: '#16a34a', minWidth: 240 },
    },

    // Contextual help
    {
      id: 'contextual-help',
      position: { x: 450, y: 500 },
      data: { label: '🆘 Contextual Help\n"Just-in-time support:\n• Situational guidance\n• Smart suggestions\n• Adaptive tooltips\n• Progressive hints"' },
      style: { ...nodeStyle, background: '#0369a1', minWidth: 240 },
    },

    // Assessment validation
    {
      id: 'assessment-validation',
      position: { x: 650, y: 500 },
      data: { label: '📊 Assessment & Validation\n"Competency tracking:\n• Skill evaluation\n• Progress metrics\n• Performance analytics\n• Success indicators"' },
      style: { ...nodeStyle, background: '#be185d', minWidth: 240 },
    },

    // Industry implementations
    {
      id: 'industry-implementations',
      position: { x: 200, y: 650 },
      data: { label: '🏢 Industry Implementations\n"Real-world success:\n• Healthcare: 30% efficiency\n• Finance: 25% accuracy\n• Tech: 40% productivity\n• Education: 35% engagement"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 260 },
    },

    // Metrics and evaluation
    {
      id: 'metrics-evaluation',
      position: { x: 600, y: 650 },
      data: { label: '📈 Metrics & Evaluation\n"Success measurement:\n• 78% adoption rate\n• 86% loyalty increase\n• 105 min/day saved\n• 30% error reduction"' },
      style: { ...nodeStyle, background: '#7c2d12', minWidth: 250 },
    },

    // Adaptive learning systems
    {
      id: 'adaptive-learning',
      position: { x: 150, y: 800 },
      data: { label: '🔄 Adaptive Learning Systems\n"Personalization engine:\n• Learning path optimization\n• Individual pacing\n• Skill gap analysis\n• Content customization"' },
      style: { ...nodeStyle, background: '#1e40af', minWidth: 250 },
    },

    // Continuous improvement
    {
      id: 'continuous-improvement',
      position: { x: 650, y: 800 },
      data: { label: '🔄 Continuous Improvement\n"Evolution patterns:\n• Feedback integration\n• A/B testing\n• Performance monitoring\n• Pattern refinement"' },
      style: { ...nodeStyle, background: '#0f766e', minWidth: 240 },
    },

    // Framework integration
    {
      id: 'framework-integration',
      position: { x: 400, y: 950 },
      data: { label: '🚀 Framework Integration\n"System deployment:\n• CLASSic evaluation\n• HITL collaboration\n• Regulatory compliance\n• Enterprise scaling"' },
      style: { ...nodeStyle, background: '#86198f', minWidth: 250 },
    },

    // Core onboarding principle
    {
      id: 'onboarding-principle',
      position: { x: 400, y: 1100 },
      data: { label: '🎯 Onboarding & Education Principle\n"Progressive disclosure with scaffolded learning achieves 78% adoption rates\nMultimodal trust-building reduces misconceptions by 86%\nInteractive tutorials with social proof validation enable sustained engagement"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 450 },
    },
  ],
  initialEdges: [
    // Challenge addressed by core patterns
    {
      id: 'e1',
      source: 'adoption-challenge',
      target: 'mental-model-formation',
      ...edgeStyle,
      label: 'addresses via'
    },
    {
      id: 'e2',
      source: 'adoption-challenge',
      target: 'progressive-disclosure',
      ...edgeStyle,
      label: 'solved by'
    },

    // Mental model connections
    {
      id: 'e3',
      source: 'mental-model-formation',
      target: 'trust-building',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e4',
      source: 'mental-model-formation',
      target: 'capability-introduction',
      ...edgeStyle,
      label: 'guides'
    },
    {
      id: 'e5',
      source: 'mental-model-formation',
      target: 'misconception-correction',
      ...edgeStyle,
      label: 'requires'
    },

    // Progressive disclosure implementation
    {
      id: 'e6',
      source: 'progressive-disclosure',
      target: 'interactive-tutorials',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e7',
      source: 'progressive-disclosure',
      target: 'multimodal-education',
      ...edgeStyle,
      label: 'utilizes'
    },
    {
      id: 'e8',
      source: 'progressive-disclosure',
      target: 'contextual-help',
      ...edgeStyle,
      label: 'provides'
    },

    // Trust building mechanisms
    {
      id: 'e9',
      source: 'trust-building',
      target: 'social-proof',
      ...edgeStyle,
      label: 'leverages'
    },

    // Capability introduction patterns
    {
      id: 'e10',
      source: 'capability-introduction',
      target: 'assessment-validation',
      ...edgeStyle,
      label: 'validated by'
    },

    // Interactive learning connections
    {
      id: 'e11',
      source: 'interactive-tutorials',
      target: 'adaptive-learning',
      ...edgeStyle,
      label: 'powered by'
    },

    // Validation and metrics
    {
      id: 'e12',
      source: 'social-proof',
      target: 'industry-implementations',
      ...edgeStyle,
      label: 'evidenced in'
    },
    {
      id: 'e13',
      source: 'assessment-validation',
      target: 'metrics-evaluation',
      ...edgeStyle,
      label: 'feeds into'
    },

    // Industry success patterns
    {
      id: 'e14',
      source: 'industry-implementations',
      target: 'continuous-improvement',
      ...edgeStyle,
      label: 'drives'
    },
    {
      id: 'e15',
      source: 'metrics-evaluation',
      target: 'continuous-improvement',
      ...edgeStyle,
      label: 'informs'
    },

    // System integration
    {
      id: 'e16',
      source: 'adaptive-learning',
      target: 'framework-integration',
      ...edgeStyle,
      label: 'scales via'
    },
    {
      id: 'e17',
      source: 'continuous-improvement',
      target: 'framework-integration',
      ...edgeStyle,
      label: 'enables'
    },

    // Cross-connections for reinforcement
    {
      id: 'e18',
      source: 'misconception-correction',
      target: 'contextual-help',
      ...edgeStyle,
      label: 'supported by'
    },
    {
      id: 'e19',
      source: 'multimodal-education',
      target: 'assessment-validation',
      ...edgeStyle,
      label: 'evaluated via'
    },

    // Framework proves principle
    {
      id: 'e20',
      source: 'framework-integration',
      target: 'onboarding-principle',
      ...edgeStyle,
      label: 'demonstrates',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "AI Agent Adoption Challenge",
      description: "Organizations face the complex challenge of onboarding users to AI agent systems while building appropriate mental models, establishing trust, and ensuring sustained engagement across diverse user populations.",
      activeNodes: ['adoption-challenge'],
      activeEdges: []
    },
    {
      title: "Mental Model Formation and Progressive Disclosure",
      description: "Address adoption challenges through structured mental model formation that aligns with existing user understanding and progressive disclosure that scaffolds learning through staged feature introduction and contextual guidance.",
      activeNodes: ['mental-model-formation', 'progressive-disclosure'],
      activeEdges: ['e1', 'e2']
    },
    {
      title: "Trust Building and Capability Introduction",
      description: "Mental model formation enables trust building through transparency patterns and mindful friction, while guiding strategic capability introduction from core functions to advanced features, supported by misconception correction mechanisms.",
      activeNodes: ['trust-building', 'capability-introduction', 'misconception-correction'],
      activeEdges: ['e3', 'e4', 'e5']
    },
    {
      title: "Interactive Learning and Multimodal Education",
      description: "Progressive disclosure implements interactive tutorials for hands-on exploration and utilizes multimodal education formats, while providing contextual help and just-in-time support to enhance the learning experience.",
      activeNodes: ['interactive-tutorials', 'multimodal-education', 'contextual-help'],
      activeEdges: ['e6', 'e7', 'e8']
    },
    {
      title: "Social Proof and Assessment Validation",
      description: "Trust building leverages social proof through community testimonials and success stories, while capability introduction is validated through comprehensive assessment and competency tracking mechanisms.",
      activeNodes: ['social-proof', 'assessment-validation'],
      activeEdges: ['e9', 'e10', 'e18', 'e19']
    },
    {
      title: "Adaptive Learning and Industry Success",
      description: "Interactive tutorials are powered by adaptive learning systems that personalize content and pacing. Social proof is evidenced in industry implementations showing 30-40% productivity improvements across healthcare, finance, and technology sectors.",
      activeNodes: ['adaptive-learning', 'industry-implementations'],
      activeEdges: ['e11', 'e12']
    },
    {
      title: "Metrics Evaluation and Continuous Improvement",
      description: "Assessment validation feeds into comprehensive metrics evaluation tracking 78% adoption rates and 86% loyalty increases. Industry implementations and metrics evaluation drive continuous improvement cycles that refine patterns based on real-world feedback.",
      activeNodes: ['metrics-evaluation', 'continuous-improvement'],
      activeEdges: ['e13', 'e14', 'e15']
    },
    {
      title: "Framework Integration and Principle Validation",
      description: "Adaptive learning and continuous improvement enable enterprise framework integration using CLASSic evaluation standards, HITL collaboration, and regulatory compliance. This demonstrates the core principle that progressive disclosure with scaffolded learning and multimodal trust-building achieves sustained user engagement.",
      activeNodes: ['framework-integration', 'onboarding-principle'],
      activeEdges: ['e16', 'e17', 'e20']
    }
  ]
};