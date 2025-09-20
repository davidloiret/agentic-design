import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const aisiEvaluationFrameworkPattern: PatternScenario = {
  id: 'aisi-evaluation-framework',
  title: 'AISI: AI Safety Institute Evaluation Framework Pattern',
  description: 'UK-US collaborative frontier AI safety evaluation with testing for cyber, biological, chemical, and agent capabilities, featuring Inspect AI open-source framework and pre-deployment assessments',
  initialNodes: [
    // Frontier AI safety evaluation challenge
    {
      id: 'frontier-ai-safety-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🛡️ Frontier AI Safety Challenge\n"How to evaluate advanced AI systems\nfor catastrophic risks before deployment\nwithout established standards?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // AISI evaluation framework
    {
      id: 'aisi-framework',
      position: { x: 400, y: 200 },
      data: { label: '🏛️ AISI Evaluation Framework\n"UK-US collaborative approach:\n• Independent evaluation\n• Pre-deployment testing\n• Open-source tools"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // UK-US collaboration
    {
      id: 'uk-us-collaboration',
      position: { x: 200, y: 350 },
      data: { label: '🤝 UK-US Joint Testing\n"Landmark collaboration:\n• Shared model access\n• Research insights exchange\n• Joint pre-deployment evals"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // International network
    {
      id: 'international-network',
      position: { x: 200, y: 500 },
      data: { label: '🌍 International Network\n"10 AISI equivalents:\n• Coordinated approach\n• Shared methodologies\n• Global safety standards"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    // Four evaluation capabilities
    {
      id: 'four-evaluation-areas',
      position: { x: 600, y: 350 },
      data: { label: '🔍 Four Core Testing Areas\n"Critical risk assessment:\n• Cyber offense capabilities\n• Chemical/biological misuse\n• Autonomous agent abilities"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },

    // Safeguards effectiveness
    {
      id: 'safeguards-effectiveness',
      position: { x: 600, y: 500 },
      data: { label: '🛡️ Safeguards Effectiveness\n"Protection validation:\n• Trust & safety testing\n• Jailbreak resistance\n• Mitigation assessment"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Evaluation methodology
    {
      id: 'evaluation-methodology',
      position: { x: 400, y: 650 },
      data: { label: '⚙️ Multi-Method Evaluation\n"Comprehensive assessment:\n• Automated capability tests\n• Red-teaming exercises\n• Human uplift studies\n• AI agent evaluations"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 270 },
    },

    // Inspect AI framework
    {
      id: 'inspect-ai-framework',
      position: { x: 200, y: 800 },
      data: { label: '💻 Inspect AI Framework\n"Open-source evaluation:\n• 50+ community contributors\n• Multi-turn dialogue support\n• Model-graded evaluations\n• Agent benchmark suite"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Model developer partnership
    {
      id: 'model-developer-partnership',
      position: { x: 600, y: 800 },
      data: { label: '🤝 Developer Partnerships\n"Constructive collaboration:\n• OpenAI o1 evaluation\n• Anthropic Claude testing\n• Voluntary participation\n• Pre-deployment feedback"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // Evaluation requirements
    {
      id: 'evaluation-requirements',
      position: { x: 400, y: 950 },
      data: { label: '📋 Evaluation Requirements\n"Comprehensive access needs:\n• Helpful-Only model versions\n• Safeguard toggle control\n• Fine-tuning API access\n• Confidential methodology"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 280 },
    },

    // Core safety evaluation principle
    {
      id: 'safety-evaluation-principle',
      position: { x: 400, y: 1100 },
      data: { label: '🎯 AI Safety Evaluation Principle\n"Independent pre-deployment testing identifies catastrophic risks\nOpen-source tools enable global safety collaboration\nNascent science requires iterative methodology development"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 380 },
    },
  ],
  initialEdges: [
    // Challenge addressed by AISI framework
    {
      id: 'e1',
      source: 'frontier-ai-safety-challenge',
      target: 'aisi-framework',
      ...edgeStyle,
      label: 'addressed by'
    },

    // Framework implements collaboration and testing areas
    {
      id: 'e2',
      source: 'aisi-framework',
      target: 'uk-us-collaboration',
      ...edgeStyle,
      label: 'establishes collaboration'
    },
    {
      id: 'e3',
      source: 'aisi-framework',
      target: 'four-evaluation-areas',
      ...edgeStyle,
      label: 'tests 4 areas'
    },

    // UK-US collaboration extends to international network
    {
      id: 'e4',
      source: 'uk-us-collaboration',
      target: 'international-network',
      ...edgeStyle,
      label: 'expands globally'
    },

    // Four areas include safeguards
    {
      id: 'e5',
      source: 'four-evaluation-areas',
      target: 'safeguards-effectiveness',
      ...edgeStyle,
      label: 'includes safeguards'
    },

    // Framework uses evaluation methodology
    {
      id: 'e6',
      source: 'aisi-framework',
      target: 'evaluation-methodology',
      ...edgeStyle,
      label: 'applies methodology'
    },

    // Methodology implemented through Inspect AI and partnerships
    {
      id: 'e7',
      source: 'evaluation-methodology',
      target: 'inspect-ai-framework',
      ...edgeStyle,
      label: 'implemented via'
    },
    {
      id: 'e8',
      source: 'evaluation-methodology',
      target: 'model-developer-partnership',
      ...edgeStyle,
      label: 'applied through'
    },

    // All testing requires specific evaluation requirements
    {
      id: 'e9',
      source: 'inspect-ai-framework',
      target: 'evaluation-requirements',
      ...edgeStyle,
      label: 'requires access'
    },
    {
      id: 'e10',
      source: 'model-developer-partnership',
      target: 'evaluation-requirements',
      ...edgeStyle,
      label: 'needs capabilities'
    },

    // Requirements and areas demonstrate principle
    {
      id: 'e11',
      source: 'evaluation-requirements',
      target: 'safety-evaluation-principle',
      ...edgeStyle,
      label: 'enables principle',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e12',
      source: 'safeguards-effectiveness',
      target: 'safety-evaluation-principle',
      ...edgeStyle,
      label: 'validates principle',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e13',
      source: 'international-network',
      target: 'safety-evaluation-principle',
      ...edgeStyle,
      label: 'scales principle',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Frontier AI Safety Evaluation Challenge",
      description: "How can we evaluate advanced AI systems for catastrophic risks before deployment when there are virtually no established standards or best practices for frontier AI safety testing?",
      activeNodes: ['frontier-ai-safety-challenge'],
      activeEdges: []
    },
    {
      title: "AISI Evaluation Framework Introduction",
      description: "UK-US collaborative framework addresses challenge through independent evaluation, pre-deployment testing, and open-source tools, establishing world's first systematic approach to frontier AI safety assessment.",
      activeNodes: ['aisi-framework'],
      activeEdges: ['e1']
    },
    {
      title: "International Collaboration and Core Testing Areas",
      description: "Landmark UK-US partnership (shared model access, joint evaluations) expands to 10-nation network, while framework tests 4 critical areas: cyber offense, chemical/biological misuse, autonomous agents, and safeguards effectiveness.",
      activeNodes: ['uk-us-collaboration', 'international-network', 'four-evaluation-areas', 'safeguards-effectiveness'],
      activeEdges: ['e2', 'e3', 'e4', 'e5']
    },
    {
      title: "Multi-Method Evaluation Methodology",
      description: "Comprehensive assessment approach employs automated capability tests, red-teaming exercises, human uplift studies, and AI agent evaluations to thoroughly evaluate frontier model risks and capabilities.",
      activeNodes: ['evaluation-methodology'],
      activeEdges: ['e6']
    },
    {
      title: "Open-Source Tools and Developer Partnerships",
      description: "Inspect AI framework with 50+ contributors enables community-driven evaluation, while partnerships with OpenAI, Anthropic enable pre-deployment testing of o1, Claude, and other frontier models.",
      activeNodes: ['inspect-ai-framework', 'model-developer-partnership'],
      activeEdges: ['e7', 'e8']
    },
    {
      title: "Comprehensive Evaluation Requirements and Principle",
      description: "Effective evaluation requires Helpful-Only model access, safeguard toggle control, fine-tuning APIs, proving independent pre-deployment testing identifies catastrophic risks while open collaboration advances nascent safety science.",
      activeNodes: ['evaluation-requirements', 'safety-evaluation-principle'],
      activeEdges: ['e9', 'e10', 'e11', 'e12', 'e13']
    }
  ]
};