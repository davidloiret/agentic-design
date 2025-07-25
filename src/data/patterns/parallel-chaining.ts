import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const parallelChainingPattern: PatternScenario = {
  id: 'parallel-chaining',
  title: 'Parallel Chaining Pattern',
  description: 'Demonstrates concurrent execution of multiple prompts with result aggregation',
  initialNodes: [
    {
      id: 'input',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { label: 'Input Request\n"Market analysis for new AI product"' },
      style: { ...nodeStyle, minWidth: 250 }
    },
    {
      id: 'dispatcher',
      type: 'default',
      position: { x: 400, y: 180 },
      data: { label: 'Task Dispatcher\nDistribute to parallel chains' },
      style: { ...nodeStyle, minWidth: 200, background: '#ea580c' }
    },
    // Parallel chains
    {
      id: 'chain1',
      type: 'default',
      position: { x: 100, y: 310 },
      data: { label: 'Chain A: Competitor Analysis\nAnalyze market competitors' },
      style: { ...nodeStyle, minWidth: 180, background: '#059669' }
    },
    {
      id: 'chain2',
      type: 'default',
      position: { x: 300, y: 310 },
      data: { label: 'Chain B: Target Demographics\nIdentify user segments' },
      style: { ...nodeStyle, minWidth: 180, background: '#0891b2' }
    },
    {
      id: 'chain3',
      type: 'default',
      position: { x: 500, y: 310 },
      data: { label: 'Chain C: Market Trends\nAnalyze industry trends' },
      style: { ...nodeStyle, minWidth: 180, background: '#7c3aed' }
    },
    {
      id: 'chain4',
      type: 'default',
      position: { x: 700, y: 310 },
      data: { label: 'Chain D: Regulatory\nCompliance requirements' },
      style: { ...nodeStyle, minWidth: 180, background: '#dc2626' }
    },
    // Results from parallel chains
    {
      id: 'result1',
      type: 'default',
      position: { x: 100, y: 440 },
      data: { label: 'Competitor Results\n• OpenAI: $80B valuation\n• Anthropic: $15B valuation\n• Google: Dominant search' },
      style: { ...nodeStyle, minWidth: 180, background: '#065f46' }
    },
    {
      id: 'result2',
      type: 'default',
      position: { x: 300, y: 440 },
      data: { label: 'Demographics Results\n• Developers: 40%\n• Enterprises: 35%\n• Researchers: 25%' },
      style: { ...nodeStyle, minWidth: 180, background: '#0c4a6e' }
    },
    {
      id: 'result3',
      type: 'default',
      position: { x: 500, y: 440 },
      data: { label: 'Trends Results\n• AI adoption: +300%\n• Automation demand: High\n• Privacy concerns: Rising' },
      style: { ...nodeStyle, minWidth: 180, background: '#581c87' }
    },
    {
      id: 'result4',
      type: 'default',
      position: { x: 700, y: 440 },
      data: { label: 'Regulatory Results\n• GDPR compliance needed\n• AI Act requirements\n• Data localization' },
      style: { ...nodeStyle, minWidth: 180, background: '#991b1b' }
    },
    {
      id: 'aggregator',
      type: 'default',
      position: { x: 400, y: 570 },
      data: { label: 'Result Aggregator\nCombine all insights' },
      style: { ...nodeStyle, minWidth: 200, background: '#ea580c' }
    },
    {
      id: 'synthesis',
      type: 'default',
      position: { x: 400, y: 700 },
      data: { label: 'Market Analysis Report\nComprehensive insights' },
      style: { ...nodeStyle, minWidth: 220, background: '#059669' }
    }
  ],
  initialEdges: [
    // Input to dispatcher
    {
      id: 'e-input-dispatcher',
      source: 'input',
      target: 'dispatcher',
      style: edgeStyle
    },
    // Dispatcher to parallel chains
    {
      id: 'e-dispatcher-chain1',
      source: 'dispatcher',
      target: 'chain1',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-dispatcher-chain2',
      source: 'dispatcher',
      target: 'chain2',
      style: { ...edgeStyle, stroke: '#0891b2' }
    },
    {
      id: 'e-dispatcher-chain3',
      source: 'dispatcher',
      target: 'chain3',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-dispatcher-chain4',
      source: 'dispatcher',
      target: 'chain4',
      style: { ...edgeStyle, stroke: '#dc2626' }
    },
    // Chains to results
    {
      id: 'e-chain1-result1',
      source: 'chain1',
      target: 'result1',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-chain2-result2',
      source: 'chain2',
      target: 'result2',
      style: { ...edgeStyle, stroke: '#0891b2' }
    },
    {
      id: 'e-chain3-result3',
      source: 'chain3',
      target: 'result3',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-chain4-result4',
      source: 'chain4',
      target: 'result4',
      style: { ...edgeStyle, stroke: '#dc2626' }
    },
    // Results to aggregator
    {
      id: 'e-result1-aggregator',
      source: 'result1',
      target: 'aggregator',
      style: edgeStyle
    },
    {
      id: 'e-result2-aggregator',
      source: 'result2',
      target: 'aggregator',
      style: edgeStyle
    },
    {
      id: 'e-result3-aggregator',
      source: 'result3',
      target: 'aggregator',
      style: edgeStyle
    },
    {
      id: 'e-result4-aggregator',
      source: 'result4',
      target: 'aggregator',
      style: edgeStyle
    },
    // Aggregator to final synthesis
    {
      id: 'e-aggregator-synthesis',
      source: 'aggregator',
      target: 'synthesis',
      style: edgeStyle
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Market Analysis Request',
      description: 'User requests comprehensive market analysis requiring multiple research areas to be investigated simultaneously.',
      input: 'Conduct comprehensive market analysis for our new AI-powered productivity assistant targeting enterprise customers.',
      activeNodes: ['input'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Task Distribution',
      description: 'Dispatcher identifies parallel research areas and distributes tasks to specialized chains simultaneously.',
      input: 'Task breakdown:\n• Competitor landscape analysis\n• Target demographic research\n• Market trend analysis\n• Regulatory compliance review',
      activeNodes: ['input', 'dispatcher'],
      activeEdges: ['e-input-dispatcher']
    },
    {
      id: 'step3',
      title: 'Parallel Chain Activation',
      description: 'All four specialized chains begin processing their assigned research areas concurrently.',
      activeNodes: ['dispatcher', 'chain1', 'chain2', 'chain3', 'chain4'],
      activeEdges: ['e-dispatcher-chain1', 'e-dispatcher-chain2', 'e-dispatcher-chain3', 'e-dispatcher-chain4']
    },
    {
      id: 'step4',
      title: 'Competitor Analysis Complete',
      description: 'Chain A completes competitor research and provides market positioning insights.',
      output: 'Competitor Analysis Results:\n\n**Major Players:**\n• OpenAI (ChatGPT): $80B valuation, 100M+ users\n• Microsoft (Copilot): Integrated across Office suite\n• Google (Bard/Gemini): Search integration advantage\n• Anthropic (Claude): Focus on safety and reasoning\n\n**Market Gaps:**\n• Enterprise-specific workflow integration\n• Industry-specific customization\n• Advanced privacy controls\n\n**Pricing Analysis:**\n• Consumer: $20/month standard\n• Enterprise: $25-30/user/month\n• API costs: $0.01-0.06 per 1K tokens',
      activeNodes: ['chain1', 'result1'],
      activeEdges: ['e-chain1-result1']
    },
    {
      id: 'step5',
      title: 'Demographics Analysis Complete',
      description: 'Chain B finishes target audience research and segments potential users.',
      output: 'Target Demographics Results:\n\n**Primary Segments:**\n• Software Developers (40%): Code completion, debugging\n• Business Analysts (25%): Data analysis, reporting\n• Content Creators (20%): Writing, editing assistance\n• Executives (15%): Decision support, summarization\n\n**Geographic Distribution:**\n• North America: 45%\n• Europe: 30%\n• Asia-Pacific: 20%\n• Other regions: 5%\n\n**Company Size Preference:**\n• Enterprise (1000+ employees): 60%\n• Mid-market (100-999 employees): 30%\n• Small business (<100 employees): 10%',
      activeNodes: ['chain2', 'result2'],
      activeEdges: ['e-chain2-result2']
    },
    {
      id: 'step6',
      title: 'Market Trends Analysis Complete',
      description: 'Chain C provides comprehensive industry trend analysis and growth projections.',
      output: 'Market Trends Results:\n\n**Growth Metrics:**\n• AI productivity tools market: +300% YoY\n• Enterprise AI adoption: 78% (up from 35%)\n• Remote work tools demand: Sustained high\n\n**Emerging Trends:**\n• Multi-modal AI interfaces (text + voice + visual)\n• Industry-specific AI assistants\n• Real-time collaboration with AI\n• Privacy-first AI solutions\n\n**Technology Shifts:**\n• On-premise AI deployment growing\n• Edge computing for AI inference\n• Integration with existing enterprise systems\n\n**Investment Activity:**\n• $50B+ invested in AI productivity tools (2024)\n• Average funding round: $25M\n• 67% of enterprises planning AI tool procurement',
      activeNodes: ['chain3', 'result3'],
      activeEdges: ['e-chain3-result3']
    },
    {
      id: 'step7',
      title: 'Regulatory Analysis Complete',
      description: 'Chain D completes compliance and regulatory landscape review.',
      output: 'Regulatory Requirements Results:\n\n**Key Compliance Areas:**\n• GDPR (Europe): Data protection, right to explanation\n• CCPA (California): Consumer privacy rights\n• EU AI Act: High-risk AI system requirements\n• SOC 2 Type II: Enterprise security standards\n\n**Data Requirements:**\n• Data residency: 73% of enterprises require local storage\n• Audit trails: Mandatory for financial/healthcare sectors\n• Encryption: End-to-end encryption becoming standard\n\n**Liability Considerations:**\n• AI decision transparency requirements\n• Human oversight mandates\n• Error correction and appeal processes\n\n**Compliance Costs:**\n• Initial setup: $200K-500K\n• Annual compliance: $50K-150K\n• Risk of non-compliance: $10M+ fines',
      activeNodes: ['chain4', 'result4'],
      activeEdges: ['e-chain4-result4']
    },
    {
      id: 'step8',
      title: 'Result Aggregation',
      description: 'All parallel chain results are collected and prepared for synthesis into a comprehensive report.',
      input: 'Aggregating results from all parallel chains:\n• Competitor analysis data\n• Target demographics insights\n• Market trend projections\n• Regulatory compliance requirements',
      activeNodes: ['result1', 'result2', 'result3', 'result4', 'aggregator'],
      activeEdges: ['e-result1-aggregator', 'e-result2-aggregator', 'e-result3-aggregator', 'e-result4-aggregator']
    },
    {
      id: 'step9',
      title: 'Comprehensive Market Analysis',
      description: 'Final synthesis combines all parallel research into actionable market intelligence.',
      output: '# Comprehensive Market Analysis Report\n## AI-Powered Productivity Assistant\n\n### Executive Summary\nThe AI productivity tools market presents a $15B opportunity with 300% YoY growth. Our analysis reveals strong enterprise demand with clear differentiation opportunities.\n\n### Market Opportunity\n**Size & Growth:**\n• Total Addressable Market: $15B (2024)\n• Annual Growth Rate: 300%\n• Enterprise segment: $12B (80% of market)\n\n**Target Segments (Priority Order):**\n1. **Software Developers** (40% of market)\n   - Primary need: Code completion, debugging assistance\n   - Willingness to pay: $30-50/month\n   - Decision makers: Engineering leads, CTOs\n\n2. **Business Analysts** (25% of market)\n   - Primary need: Data analysis, automated reporting\n   - Willingness to pay: $25-40/month\n   - Decision makers: Data team leads, CDOs\n\n### Competitive Landscape\n**Direct Competitors:**\n• OpenAI ChatGPT: Consumer-focused, limited enterprise features\n• Microsoft Copilot: Strong integration, enterprise focused\n• Google Gemini: Search advantage, enterprise adoption growing\n\n**Differentiation Opportunities:**\n• Industry-specific customization (finance, healthcare, legal)\n• Advanced privacy controls and on-premise deployment\n• Seamless workflow integration beyond basic chat\n\n### Go-to-Market Strategy\n**Pricing Recommendation:**\n• Tier 1 (Basic): $25/user/month\n• Tier 2 (Professional): $45/user/month\n• Tier 3 (Enterprise): $75/user/month + custom features\n\n**Geographic Priority:**\n1. North America (45% of demand)\n2. Europe (30% of demand, high privacy requirements)\n3. Asia-Pacific (20% of demand, growing rapidly)\n\n### Risk Mitigation\n**Regulatory Compliance:**\n• Budget $300K for initial GDPR/AI Act compliance\n• Implement privacy-by-design architecture\n• Establish audit trail capabilities from day one\n\n**Competitive Response:**\n• Focus on enterprise workflow integration\n• Build industry-specific knowledge bases\n• Develop superior on-premise deployment options\n\n### Financial Projections\n**Year 1 Targets:**\n• 50 enterprise customers\n• $2.5M ARR\n• 25% market share in target segments\n\n**Investment Required:**\n• Product development: $5M\n• Compliance & security: $500K\n• Go-to-market: $3M\n• Total: $8.5M\n\n### Next Steps\n1. Validate findings with 20 target customer interviews\n2. Develop MVP focusing on developer and analyst segments\n3. Establish compliance framework before product launch\n4. Build strategic partnerships with system integrators',
      activeNodes: ['synthesis'],
      activeEdges: ['e-aggregator-synthesis']
    }
  ]
};