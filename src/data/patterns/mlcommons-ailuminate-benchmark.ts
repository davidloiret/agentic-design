import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const mlcommonsAiluminateBenchmarkPattern: PatternScenario = {
  id: 'mlcommons-ailuminate-benchmark',
  title: 'MLCommons AILuminate v1.0 Benchmark Pattern',
  description: 'Comprehensive AI safety evaluation framework with standardized hazard taxonomy, safety evaluators, and grading system for measuring LLM resistance to harmful prompts across 12 risk categories',
  initialNodes: [
    // Enterprise LLM deployment scenario
    {
      id: 'enterprise-llm-deployment',
      position: { x: 400, y: 50 },
      data: { label: '🏢 Enterprise LLM Deployment\n"Company deploying customer service\nLLM handling 100K+ daily interactions\nNeeds safety validation before launch"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Safety assessment challenge
    {
      id: 'safety-assessment-challenge',
      position: { x: 400, y: 200 },
      data: { label: '🤔 Safety Assessment Challenge\n"How to systematically evaluate\nLLM safety across all potential\nrisk categories and attack vectors?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // Left path: Ad-hoc safety testing (inadequate)
    {
      id: 'adhoc-safety-testing',
      position: { x: 150, y: 350 },
      data: { label: '⚠️ Ad-hoc Safety Testing\n"Manual testing of obvious risks\nNo systematic methodology\nInconsistent evaluation criteria"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 220 },
    },

    {
      id: 'coverage-gaps',
      position: { x: 150, y: 500 },
      data: { label: '🕳️ Critical Coverage Gaps\n"Missed specialized advice risks\nNo child exploitation testing\nInconsistent defamation checks"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'post-deployment-incidents',
      position: { x: 150, y: 650 },
      data: { label: '🚨 Post-Deployment Incidents\n"LLM provides harmful advice\nRegulatory investigation\nPublic trust damage"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: AILuminate v1.0 systematic evaluation
    {
      id: 'ailuminate-framework',
      position: { x: 650, y: 350 },
      data: { label: '🛡️ AILuminate v1.0 Framework\n"Comprehensive safety benchmark:\n• 12 standardized hazard categories\n• 24,000+ test prompts\n• Automated safety evaluators"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 260 },
    },

    // 12 hazard categories (grouped)
    {
      id: 'physical-hazards',
      position: { x: 500, y: 500 },
      data: { label: '⚔️ Physical Hazards\n"• Violent crimes\n• Indiscriminate weapons\n• Suicide & self-harm"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },

    {
      id: 'criminal-hazards',
      position: { x: 650, y: 500 },
      data: { label: '🚫 Criminal Hazards\n"• Nonviolent crimes\n• Sex-related crimes\n• Child sexual exploitation"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },

    {
      id: 'social-hazards',
      position: { x: 800, y: 500 },
      data: { label: '💬 Social Hazards\n"• Hate speech\n• Defamation\n• Sexual content"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },

    {
      id: 'information-hazards',
      position: { x: 575, y: 600 },
      data: { label: '📋 Information Hazards\n"• Intellectual property\n• Privacy violations\n• Specialized advice"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },

    // Safety evaluation system
    {
      id: 'safety-evaluation-system',
      position: { x: 650, y: 700 },
      data: { label: '🔍 Automated Safety Evaluation\n"Ensemble of safety evaluator models\nStandardized grading (Poor to Excellent)\nConsistent assessment criteria"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // Comprehensive safety validation
    {
      id: 'comprehensive-validation',
      position: { x: 650, y: 850 },
      data: { label: '✅ Comprehensive Safety Validation\n"Systematic coverage of all risk areas\nStandardized industry benchmark\nReproducible safety assessment"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },

    // Key standardized evaluation principle
    {
      id: 'standardized-evaluation-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Standardized Safety Evaluation Principle\n"Systematic assessment beats ad-hoc testing\nComprehensive taxonomy ensures coverage\nAutomated evaluation enables scalability"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 350 },
    },
  ],
  initialEdges: [
    // Enterprise deployment faces safety assessment challenge
    {
      id: 'e1',
      source: 'enterprise-llm-deployment',
      target: 'safety-assessment-challenge',
      ...edgeStyle,
      label: 'needs safety validation'
    },

    // Split into ad-hoc vs systematic approaches
    {
      id: 'e2',
      source: 'safety-assessment-challenge',
      target: 'adhoc-safety-testing',
      ...edgeStyle,
      label: 'ad-hoc approach'
    },
    {
      id: 'e3',
      source: 'safety-assessment-challenge',
      target: 'ailuminate-framework',
      ...edgeStyle,
      label: 'systematic approach'
    },

    // Left path: Ad-hoc testing failures
    {
      id: 'e4',
      source: 'adhoc-safety-testing',
      target: 'coverage-gaps',
      ...edgeStyle,
      label: 'misses critical risks',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },
    {
      id: 'e5',
      source: 'coverage-gaps',
      target: 'post-deployment-incidents',
      ...edgeStyle,
      label: 'leads to incidents',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },

    // Right path: AILuminate systematic evaluation
    {
      id: 'e6',
      source: 'ailuminate-framework',
      target: 'physical-hazards',
      ...edgeStyle,
      label: 'evaluates physical risks'
    },
    {
      id: 'e7',
      source: 'ailuminate-framework',
      target: 'criminal-hazards',
      ...edgeStyle,
      label: 'evaluates criminal risks'
    },
    {
      id: 'e8',
      source: 'ailuminate-framework',
      target: 'social-hazards',
      ...edgeStyle,
      label: 'evaluates social risks'
    },
    {
      id: 'e9',
      source: 'ailuminate-framework',
      target: 'information-hazards',
      ...edgeStyle,
      label: 'evaluates information risks'
    },

    // All hazard categories feed into evaluation system
    {
      id: 'e10',
      source: 'physical-hazards',
      target: 'safety-evaluation-system',
      ...edgeStyle,
      label: 'assessed by'
    },
    {
      id: 'e11',
      source: 'criminal-hazards',
      target: 'safety-evaluation-system',
      ...edgeStyle,
      label: 'evaluated by'
    },
    {
      id: 'e12',
      source: 'social-hazards',
      target: 'safety-evaluation-system',
      ...edgeStyle,
      label: 'graded by'
    },
    {
      id: 'e13',
      source: 'information-hazards',
      target: 'safety-evaluation-system',
      ...edgeStyle,
      label: 'scored by'
    },

    // Evaluation system produces comprehensive validation
    {
      id: 'e14',
      source: 'safety-evaluation-system',
      target: 'comprehensive-validation',
      ...edgeStyle,
      label: 'produces validation'
    },

    // Converge to standardized evaluation principle
    {
      id: 'e15',
      source: 'post-deployment-incidents',
      target: 'standardized-evaluation-principle',
      ...edgeStyle,
      label: 'demonstrates need',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e16',
      source: 'comprehensive-validation',
      target: 'standardized-evaluation-principle',
      ...edgeStyle,
      label: 'proves effectiveness',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Enterprise LLM Safety Validation Challenge",
      description: "Company deploying customer service LLM for 100K+ daily interactions needs systematic safety validation before launch to prevent harmful outputs and regulatory issues.",
      activeNodes: ['enterprise-llm-deployment', 'safety-assessment-challenge'],
      activeEdges: ['e1']
    },
    {
      title: "Two Safety Testing Approaches",
      description: "Safety assessment challenge addressed through ad-hoc manual testing vs AILuminate v1.0's systematic framework with comprehensive hazard taxonomy and automated evaluation.",
      activeNodes: ['adhoc-safety-testing', 'ailuminate-framework'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Ad-hoc Testing: Critical Coverage Gaps",
      description: "Manual testing misses specialized advice risks, child exploitation scenarios, and has inconsistent evaluation criteria, leading to post-deployment incidents and regulatory investigations.",
      activeNodes: ['coverage-gaps', 'post-deployment-incidents'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "AILuminate's 12 Hazard Category Taxonomy",
      description: "Comprehensive framework evaluates all risk areas: Physical hazards (violence, weapons, self-harm), Criminal hazards (crimes, exploitation), Social hazards (hate, defamation), Information hazards (privacy, IP, advice).",
      activeNodes: ['physical-hazards', 'criminal-hazards', 'social-hazards', 'information-hazards'],
      activeEdges: ['e6', 'e7', 'e8', 'e9']
    },
    {
      title: "Automated Safety Evaluation System",
      description: "24,000+ test prompts across 12 categories processed by ensemble of safety evaluator models using standardized grading system (Poor to Excellent) with consistent assessment criteria.",
      activeNodes: ['safety-evaluation-system'],
      activeEdges: ['e10', 'e11', 'e12', 'e13']
    },
    {
      title: "Comprehensive Validation and Core Principle",
      description: "AILuminate provides systematic coverage of all risk areas as standardized industry benchmark, proving that systematic assessment with comprehensive taxonomy beats ad-hoc testing.",
      activeNodes: ['comprehensive-validation', 'standardized-evaluation-principle'],
      activeEdges: ['e14', 'e15', 'e16']
    }
  ]
};