import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const parallelSynthesisPattern: PatternScenario = {
  id: 'parallel-synthesis',
  title: 'Parallel Synthesis Pattern',
  description: 'Demonstrates how multiple parallel processing streams are combined into unified, comprehensive outputs',
  initialNodes: [
    // Input
    {
      id: 'input',
      type: 'default',
      position: { x: 500, y: 50 },
      data: { label: 'Research Task\n"Comprehensive market analysis for AI startup"' },
      style: { ...nodeStyle, minWidth: 280, background: '#dc2626' }
    },

    // Parallel streams
    {
      id: 'stream-a',
      type: 'default',
      position: { x: 200, y: 200 },
      data: { label: 'Stream A\nSurvey Data Analysis' },
      style: { ...nodeStyle, minWidth: 160, background: '#f59e0b' }
    },
    {
      id: 'stream-b',
      type: 'default',
      position: { x: 400, y: 200 },
      data: { label: 'Stream B\nCompetitor Intelligence' },
      style: { ...nodeStyle, minWidth: 160, background: '#f97316' }
    },
    {
      id: 'stream-c',
      type: 'default',
      position: { x: 600, y: 200 },
      data: { label: 'Stream C\nIndustry Trend Analysis' },
      style: { ...nodeStyle, minWidth: 160, background: '#ea580c' }
    },
    {
      id: 'stream-d',
      type: 'default',
      position: { x: 800, y: 200 },
      data: { label: 'Stream D\nCustomer Interviews' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc2626' }
    },

    // Stream outputs
    {
      id: 'output-a',
      type: 'default',
      position: { x: 200, y: 350 },
      data: { label: 'Market Size Data\n• TAM: $50B\n• Growth: 25% YoY\n• Confidence: 85%' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed', fontSize: '11px' }
    },
    {
      id: 'output-b',
      type: 'default',
      position: { x: 400, y: 350 },
      data: { label: 'Competitive Landscape\n• 15 direct competitors\n• Market fragmented\n• Confidence: 90%' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed', fontSize: '11px' }
    },
    {
      id: 'output-c',
      type: 'default',
      position: { x: 600, y: 350 },
      data: { label: 'Technology Trends\n• AI adoption up 40%\n• Cloud-first strategy\n• Confidence: 75%' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed', fontSize: '11px' }
    },
    {
      id: 'output-d',
      type: 'default',
      position: { x: 800, y: 350 },
      data: { label: 'Customer Insights\n• Pain point: Integration\n• Budget: $50K average\n• Confidence: 95%' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed', fontSize: '11px' }
    },

    // Synthesis process
    {
      id: 'weight-analysis',
      type: 'default',
      position: { x: 350, y: 500 },
      data: { label: 'Weight Analysis\nAssess reliability & relevance' },
      style: { ...nodeStyle, minWidth: 180, background: '#8b5cf6' }
    },
    {
      id: 'theme-identification',
      type: 'default',
      position: { x: 550, y: 500 },
      data: { label: 'Theme Identification\nFind common patterns' },
      style: { ...nodeStyle, minWidth: 180, background: '#8b5cf6' }
    },
    {
      id: 'conflict-resolution',
      type: 'default',
      position: { x: 450, y: 630 },
      data: { label: 'Conflict Resolution\nReconcile contradictions' },
      style: { ...nodeStyle, minWidth: 180, background: '#6366f1' }
    },
    {
      id: 'synthesis',
      type: 'default',
      position: { x: 500, y: 760 },
      data: { label: 'Unified Synthesis\nGenerate integrated insights' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Process indicators
    {
      id: 'weights',
      type: 'default',
      position: { x: 100, y: 500 },
      data: { label: 'Stream Weights\nA: 0.85 (high conf.)\nB: 0.90 (verified)\nC: 0.75 (emerging)\nD: 0.95 (direct)' },
      style: { ...nodeStyle, minWidth: 140, background: '#6366f1', fontSize: '10px' }
    },
    {
      id: 'themes',
      type: 'default',
      position: { x: 750, y: 500 },
      data: { label: 'Common Themes\n• Market growth\n• Integration challenges\n• Price sensitivity' },
      style: { ...nodeStyle, minWidth: 140, background: '#6366f1', fontSize: '11px' }
    },
    {
      id: 'conflicts',
      type: 'default',
      position: { x: 700, y: 630 },
      data: { label: 'Conflicts Found\n• Market size estimates\n• Competitive intensity\n• Adoption timeline' },
      style: { ...nodeStyle, minWidth: 140, background: '#ef4444', fontSize: '11px' }
    },

    // Final output
    {
      id: 'final-report',
      type: 'default',
      position: { x: 500, y: 900 },
      data: { label: 'Comprehensive Market Report\nWeighted insights with confidence scores' },
      style: { ...nodeStyle, minWidth: 250, background: '#059669', fontWeight: 'bold' }
    }
  ],
  initialEdges: [
    // Input to streams
    {
      id: 'e-input-a',
      source: 'input',
      target: 'stream-a',
      style: edgeStyle
    },
    {
      id: 'e-input-b',
      source: 'input',
      target: 'stream-b',
      style: edgeStyle
    },
    {
      id: 'e-input-c',
      source: 'input',
      target: 'stream-c',
      style: edgeStyle
    },
    {
      id: 'e-input-d',
      source: 'input',
      target: 'stream-d',
      style: edgeStyle
    },

    // Streams to outputs
    {
      id: 'e-a-output',
      source: 'stream-a',
      target: 'output-a',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },
    {
      id: 'e-b-output',
      source: 'stream-b',
      target: 'output-b',
      style: { ...edgeStyle, stroke: '#f97316' }
    },
    {
      id: 'e-c-output',
      source: 'stream-c',
      target: 'output-c',
      style: { ...edgeStyle, stroke: '#ea580c' }
    },
    {
      id: 'e-d-output',
      source: 'stream-d',
      target: 'output-d',
      style: { ...edgeStyle, stroke: '#dc2626' }
    },

    // Outputs to synthesis process
    {
      id: 'e-output-a-weight',
      source: 'output-a',
      target: 'weight-analysis',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    {
      id: 'e-output-b-weight',
      source: 'output-b',
      target: 'weight-analysis',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    {
      id: 'e-output-c-theme',
      source: 'output-c',
      target: 'theme-identification',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    {
      id: 'e-output-d-theme',
      source: 'output-d',
      target: 'theme-identification',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },

    // Synthesis process flow
    {
      id: 'e-weight-conflict',
      source: 'weight-analysis',
      target: 'conflict-resolution',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },
    {
      id: 'e-theme-conflict',
      source: 'theme-identification',
      target: 'conflict-resolution',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },
    {
      id: 'e-conflict-synthesis',
      source: 'conflict-resolution',
      target: 'synthesis',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },
    {
      id: 'e-synthesis-final',
      source: 'synthesis',
      target: 'final-report',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Process indicators
    {
      id: 'e-weights-weight-analysis',
      source: 'weights',
      target: 'weight-analysis',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-themes-theme-id',
      source: 'themes',
      target: 'theme-identification',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-conflicts-conflict-res',
      source: 'conflicts',
      target: 'conflict-resolution',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '3,3' }
    },

    // Cross-stream connections (showing synthesis complexity)
    {
      id: 'e-output-a-theme',
      source: 'output-a',
      target: 'theme-identification',
      style: { ...edgeStyle, stroke: '#10b981', strokeDasharray: '8,8', opacity: 0.6 }
    },
    {
      id: 'e-output-c-weight',
      source: 'output-c',
      target: 'weight-analysis', 
      style: { ...edgeStyle, stroke: '#10b981', strokeDasharray: '8,8', opacity: 0.6 }
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Task Definition',
      description: 'Define a complex research task that benefits from multiple analytical perspectives.',
      input: 'Create a comprehensive market analysis for an AI startup entering the enterprise automation space.',
      activeNodes: ['input'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Parallel Stream Deployment',
      description: 'Launch multiple independent analysis streams to gather diverse data types.',
      input: 'Deploy 4 parallel streams: Survey analysis, competitor research, trend analysis, and customer interviews',
      activeNodes: ['input', 'stream-a', 'stream-b', 'stream-c', 'stream-d'],
      activeEdges: ['e-input-a', 'e-input-b', 'e-input-c', 'e-input-d']
    },
    {
      id: 'step3',
      title: 'Stream A: Survey Data Analysis',
      description: 'Quantitative analysis of market surveys and industry reports.',
      input: 'Analyze 500+ enterprise survey responses and 12 industry reports',
      activeNodes: ['stream-a', 'output-a'],
      activeEdges: ['e-a-output'],
      output: 'Market Insights:\n• Total Addressable Market: $50B\n• Annual growth rate: 25%\n• Enterprise adoption: 35% planning implementation\n• Confidence level: 85% (large sample size)'
    },
    {
      id: 'step4',
      title: 'Stream B: Competitor Intelligence',
      description: 'Analysis of competitive landscape and market positioning.',
      input: 'Research 15 direct competitors and 30 adjacent players',
      activeNodes: ['stream-b', 'output-b'],
      activeEdges: ['e-b-output'],
      output: 'Competitive Analysis:\n• 15 direct competitors identified\n• Market highly fragmented\n• Top 3 players hold 40% market share\n• Average funding: $25M Series A\n• Confidence level: 90% (verified data)'
    },
    {
      id: 'step5',
      title: 'Stream C: Industry Trend Analysis',
      description: 'Analysis of technological and market trends affecting the space.',
      input: 'Analyze technology adoption patterns and industry forecasts',
      activeNodes: ['stream-c', 'output-c'],
      activeEdges: ['e-c-output'],
      output: 'Technology Trends:\n• AI/ML adoption increased 40% YoY\n• Cloud-first strategies dominate\n• Integration complexity is key barrier\n• Remote work driving automation demand\n• Confidence level: 75% (emerging trends)'
    },
    {
      id: 'step6',
      title: 'Stream D: Customer Interview Insights',
      description: 'Qualitative insights from direct customer conversations.',
      input: 'Conduct 25 in-depth interviews with target customers',
      activeNodes: ['stream-d', 'output-d'],
      activeEdges: ['e-d-output'],
      output: 'Customer Insights:\n• Primary pain point: System integration complexity\n• Average budget allocation: $50K annually\n• Decision timeline: 6-12 months\n• Key stakeholders: IT + Operations\n• Confidence level: 95% (direct feedback)'
    },
    {
      id: 'step7',
      title: 'Weight Analysis',
      description: 'Assess the reliability and relevance of each stream\'s findings.',
      input: 'Evaluate confidence levels, sample sizes, and data quality',
      activeNodes: ['weight-analysis', 'weights'],
      activeEdges: ['e-output-a-weight', 'e-output-b-weight', 'e-weights-weight-analysis'],
      output: 'Stream Weights Calculated:\n• Survey Data (A): 0.85 - High confidence, large sample\n• Competitor Intel (B): 0.90 - Verified, comprehensive\n• Trend Analysis (C): 0.75 - Emerging patterns, some uncertainty\n• Customer Interviews (D): 0.95 - Direct feedback, high relevance'
    },
    {
      id: 'step8',
      title: 'Theme Identification',
      description: 'Identify common patterns and themes across all streams.',
      input: 'Cross-analyze findings to identify recurring themes',
      activeNodes: ['theme-identification', 'themes'],
      activeEdges: ['e-output-c-theme', 'e-output-d-theme', 'e-themes-theme-id'],
      output: 'Common Themes Identified:\n• Strong market growth trajectory (confirmed across A, C)\n• Integration complexity as primary barrier (confirmed in C, D)\n• Budget availability with long decision cycles (confirmed in B, D)\n• Cloud/remote work acceleration (confirmed in A, C, D)'
    },
    {
      id: 'step9',
      title: 'Conflict Resolution',
      description: 'Identify and resolve contradictions between different streams.',
      input: 'Address discrepancies in market size estimates and competitive intensity',
      activeNodes: ['conflict-resolution', 'conflicts'],
      activeEdges: ['e-weight-conflict', 'e-theme-conflict', 'e-conflicts-conflict-res'],
      output: 'Conflicts Resolved:\n• Market size variance ($45B-$55B) → Weighted average: $50B\n• Competitive intensity disagreement → Fragmented but intensifying\n• Adoption timeline (6-18 months) → Depends on company size\n• Resolution method: Weighted confidence scoring'
    },
    {
      id: 'step10',
      title: 'Cross-Stream Synthesis',
      description: 'Demonstrate how insights from different streams enrich each other.',
      input: 'Allow quantitative data to validate qualitative insights and vice versa',
      activeNodes: ['output-a', 'output-c', 'weight-analysis', 'theme-identification'],
      activeEdges: ['e-output-a-theme', 'e-output-c-weight'],
      output: 'Cross-Stream Validation:\n• Survey growth data (25%) confirms interview urgency\n• Trend analysis validates customer integration concerns\n• Competitive landscape explains customer budget patterns'
    },
    {
      id: 'step11',
      title: 'Unified Synthesis Generation',
      description: 'Combine all weighted, reconciled insights into comprehensive analysis.',
      input: 'Integrate weighted findings with resolved conflicts and common themes',
      activeNodes: ['synthesis'],
      activeEdges: ['e-conflict-synthesis'],
      output: 'Synthesis Complete:\n• Market opportunity validated with high confidence\n• Customer needs clearly defined and prioritized\n• Competitive landscape mapped with entry strategies\n• Risk factors identified with mitigation approaches'
    },
    {
      id: 'step12',
      title: 'Comprehensive Market Report',
      description: 'Deliver final integrated analysis with confidence scores and recommendations.',
      activeNodes: ['final-report'],
      activeEdges: ['e-synthesis-final'],
      output: 'Final Market Analysis Report:\n\n**Market Opportunity**: $50B TAM growing 25% annually (Confidence: 87%)\n**Customer Profile**: Enterprise IT/Ops with $50K budgets, 6-12 month decisions (Confidence: 93%)\n**Competitive Landscape**: Fragmented market with integration focus opportunity (Confidence: 88%)\n**Go-to-Market Strategy**: Cloud-first, integration-focused positioning with enterprise sales model\n**Risk Assessment**: Technical complexity and sales cycle length identified as primary challenges\n\n*Report synthesized from 4 independent analysis streams with weighted confidence scoring*'
    }
  ]
};