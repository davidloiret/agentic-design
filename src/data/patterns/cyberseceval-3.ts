import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const cybersecEval3Pattern: PatternScenario = {
  id: 'cyberseceval-3',
  title: 'CybersecEval 3: LLM Security Assessment Pattern',
  description: 'Meta AI\'s comprehensive cybersecurity evaluation framework assessing 8 risk categories across offensive and defensive capabilities, with real-world human studies and guardrail effectiveness testing',
  initialNodes: [
    // LLM cybersecurity risk assessment challenge
    {
      id: 'cybersecurity-risk-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🛡️ LLM Cybersecurity Risk Challenge\n"How to empirically measure and mitigate\nLLM cybersecurity risks and offensive\ncapabilities in real-world scenarios?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // CybersecEval 3 comprehensive framework
    {
      id: 'cyberseceval3-framework',
      position: { x: 400, y: 200 },
      data: { label: '🔍 CybersecEval 3 Framework\n"Comprehensive security benchmark:\n• 8 risk categories assessed\n• Offensive & defensive capabilities\n• Real-world human studies"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // 8 risk categories system
    {
      id: 'eight-risk-categories',
      position: { x: 200, y: 350 },
      data: { label: '📊 8 Risk Categories System\n"Comprehensive threat assessment:\n• Third-party risks\n• Developer/end-user risks\n• Offensive capabilities evaluation"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Third-party risks (1-4)
    {
      id: 'third-party-risks',
      position: { x: 50, y: 500 },
      data: { label: '🎯 Third-Party Risks (1-4)\n"• Automated social engineering\n• Scaling offensive operations\n• Autonomous cyber operations\n• Vulnerability discovery/exploitation"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },

    // Developer/user risks (5-8)
    {
      id: 'developer-user-risks',
      position: { x: 350, y: 500 },
      data: { label: '⚠️ Developer/User Risks (5-8)\n"• Prompt injection attacks\n• Malicious code execution\n• Cyber attack facilitation\n• Insecure code suggestions"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // Human uplift study methodology
    {
      id: 'human-uplift-study',
      position: { x: 600, y: 350 },
      data: { label: '👥 Human Uplift Study\n"62 Meta employees tested:\n• 31 security experts\n• 31 technical non-experts\n• Hack The Box CTF challenges"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },

    // Two-stage evaluation process
    {
      id: 'two-stage-evaluation',
      position: { x: 600, y: 500 },
      data: { label: '⚙️ Two-Stage Evaluation Process\n"1-hour stages each:\n• Stage 1: Without LLM assistance\n• Stage 2: With Llama 3 405B\n• CTF completion rate measurement"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // Key findings: Mixed offensive capabilities
    {
      id: 'offensive-capabilities-findings',
      position: { x: 200, y: 650 },
      data: { label: '🔍 Offensive Capabilities Findings\n"Limited uplift in cyberattacks:\n• 22% novice improvement\n• No expert enhancement\n• No complete novice success"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Phishing automation results
    {
      id: 'phishing-automation-results',
      position: { x: 450, y: 650 },
      data: { label: '📧 Phishing Automation Results\n"Llama 3 405B capabilities:\n• Moderately persuasive attacks\n• Multi-turn spear-phishing\n• Comparable to GPT-4 Turbo"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },

    // Guardrail protection system
    {
      id: 'guardrail-protection-system',
      position: { x: 700, y: 650 },
      data: { label: '🛡️ Guardrail Protection System\n"Three-layer defense:\n• PromptGuard (injection detection)\n• CodeShield (insecure code blocking)\n• LlamaGuard 3 (malicious intent prevention)"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },

    // Risk mitigation effectiveness
    {
      id: 'risk-mitigation-effectiveness',
      position: { x: 400, y: 800 },
      data: { label: '✅ Risk Mitigation Effectiveness\n"Guardrails significantly reduce:\n• Malicious code generation\n• Prompt injection success rates\n• Offensive capability amplification"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 270 },
    },

    // Core cybersecurity evaluation principle
    {
      id: 'cybersecurity-evaluation-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 LLM Cybersecurity Evaluation Principle\n"Empirical risk assessment with human studies reveals\nLLM offensive capabilities exist but are limited and mitigatable\nMulti-layered guardrails provide effective protection"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 370 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'cybersecurity-risk-challenge',
      target: 'cyberseceval3-framework',
      ...edgeStyle,
      label: 'addressed by'
    },

    // Framework implements risk assessment and human study
    {
      id: 'e2',
      source: 'cyberseceval3-framework',
      target: 'eight-risk-categories',
      ...edgeStyle,
      label: 'implements 8 categories'
    },
    {
      id: 'e3',
      source: 'cyberseceval3-framework',
      target: 'human-uplift-study',
      ...edgeStyle,
      label: 'conducts human study'
    },

    // Eight risk categories split into two domains
    {
      id: 'e4',
      source: 'eight-risk-categories',
      target: 'third-party-risks',
      ...edgeStyle,
      label: 'includes offensive risks'
    },
    {
      id: 'e5',
      source: 'eight-risk-categories',
      target: 'developer-user-risks',
      ...edgeStyle,
      label: 'includes development risks'
    },

    // Human study implements two-stage evaluation
    {
      id: 'e6',
      source: 'human-uplift-study',
      target: 'two-stage-evaluation',
      ...edgeStyle,
      label: 'uses methodology'
    },

    // Risk categories and evaluation produce findings
    {
      id: 'e7',
      source: 'third-party-risks',
      target: 'offensive-capabilities-findings',
      ...edgeStyle,
      label: 'assessed through'
    },
    {
      id: 'e8',
      source: 'third-party-risks',
      target: 'phishing-automation-results',
      ...edgeStyle,
      label: 'reveals capabilities'
    },
    {
      id: 'e9',
      source: 'two-stage-evaluation',
      target: 'offensive-capabilities-findings',
      ...edgeStyle,
      label: 'measures uplift'
    },
    {
      id: 'e10',
      source: 'developer-user-risks',
      target: 'guardrail-protection-system',
      ...edgeStyle,
      label: 'mitigated by'
    },

    // All findings contribute to mitigation effectiveness
    {
      id: 'e11',
      source: 'offensive-capabilities-findings',
      target: 'risk-mitigation-effectiveness',
      ...edgeStyle,
      label: 'informs mitigation'
    },
    {
      id: 'e12',
      source: 'phishing-automation-results',
      target: 'risk-mitigation-effectiveness',
      ...edgeStyle,
      label: 'guides protection'
    },
    {
      id: 'e13',
      source: 'guardrail-protection-system',
      target: 'risk-mitigation-effectiveness',
      ...edgeStyle,
      label: 'achieves effectiveness'
    },

    // Mitigation effectiveness demonstrates core principle
    {
      id: 'e14',
      source: 'risk-mitigation-effectiveness',
      target: 'cybersecurity-evaluation-principle',
      ...edgeStyle,
      label: 'proves principle',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "LLM Cybersecurity Risk Assessment Challenge",
      description: "How can we empirically measure and mitigate LLM cybersecurity risks and offensive capabilities in real-world scenarios beyond theoretical assessments?",
      activeNodes: ['cybersecurity-risk-challenge'],
      activeEdges: []
    },
    {
      title: "CybersecEval 3 Comprehensive Framework",
      description: "Meta AI's systematic approach deploys comprehensive security benchmark with 8 risk categories assessment covering offensive and defensive capabilities through real-world human studies.",
      activeNodes: ['cyberseceval3-framework'],
      activeEdges: ['e1']
    },
    {
      title: "8 Risk Categories and Human Study Methodology",
      description: "Framework implements comprehensive threat assessment across third-party risks (offensive operations, social engineering) and developer/user risks (prompt injection, insecure code) with 62 Meta employee study.",
      activeNodes: ['eight-risk-categories', 'third-party-risks', 'developer-user-risks', 'human-uplift-study'],
      activeEdges: ['e2', 'e3', 'e4', 'e5']
    },
    {
      title: "Two-Stage Evaluation Process",
      description: "Human study uses rigorous methodology: 1-hour stages with/without Llama 3 405B assistance on Hack The Box CTF challenges, measuring completion rates across security experts and novices.",
      activeNodes: ['two-stage-evaluation'],
      activeEdges: ['e6']
    },
    {
      title: "Mixed Offensive Capabilities Findings",
      description: "Evaluation reveals limited LLM offensive uplift: 22% novice improvement, no expert enhancement, no complete novice success, but demonstrates moderately persuasive phishing automation comparable to GPT-4 Turbo.",
      activeNodes: ['offensive-capabilities-findings', 'phishing-automation-results'],
      activeEdges: ['e7', 'e8', 'e9']
    },
    {
      title: "Effective Multi-Layered Risk Mitigation",
      description: "Three-layer guardrail system (PromptGuard, CodeShield, LlamaGuard 3) significantly reduces malicious code generation and prompt injection attacks, proving empirical risk assessment reveals limited but mitigatable LLM offensive capabilities.",
      activeNodes: ['guardrail-protection-system', 'risk-mitigation-effectiveness', 'cybersecurity-evaluation-principle'],
      activeEdges: ['e10', 'e11', 'e12', 'e13', 'e14']
    }
  ]
};