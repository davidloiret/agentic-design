import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const hierarchicalChainingPattern: PatternScenario = {
  id: 'hierarchical-chaining',
  title: 'Hierarchical Chaining Pattern',
  description: 'Demonstrates multi-level task decomposition with parent-child dependencies and hierarchical execution',
  initialNodes: [
    // Root level
    {
      id: 'root',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { label: 'Root Task\n"Create Business Plan"' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 180, fontSize: '14px', fontWeight: 'bold' }
    },
    
    // Level 1 - Main sections
    {
      id: 'exec-summary',
      type: 'default',
      position: { x: 100, y: 180 },
      data: { label: 'Executive\nSummary' },
      style: { ...nodeStyle, background: '#ea580c', minWidth: 140 }
    },
    {
      id: 'market-analysis',
      type: 'default',
      position: { x: 280, y: 180 },
      data: { label: 'Market\nAnalysis' },
      style: { ...nodeStyle, background: '#ea580c', minWidth: 140 }
    },
    {
      id: 'financial-proj',
      type: 'default',
      position: { x: 460, y: 180 },
      data: { label: 'Financial\nProjections' },
      style: { ...nodeStyle, background: '#ea580c', minWidth: 140 }
    },
    {
      id: 'marketing-strategy',
      type: 'default',
      position: { x: 640, y: 180 },
      data: { label: 'Marketing\nStrategy' },
      style: { ...nodeStyle, background: '#ea580c', minWidth: 140 }
    },
    
    // Level 2 - Sub-tasks for Market Analysis
    {
      id: 'competitor-analysis',
      type: 'default',
      position: { x: 180, y: 320 },
      data: { label: 'Competitor\nAnalysis' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 120 }
    },
    {
      id: 'target-customers', 
      type: 'default',
      position: { x: 320, y: 320 },
      data: { label: 'Target\nCustomers' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 120 }
    },
    {
      id: 'market-size',
      type: 'default',
      position: { x: 260, y: 460 },
      data: { label: 'Market Size\nAnalysis' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 120 }
    },
    
    // Level 2 - Sub-tasks for Financial Projections
    {
      id: 'revenue-forecast',
      type: 'default',
      position: { x: 380, y: 320 },
      data: { label: 'Revenue\nForecast' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 120 }
    },
    {
      id: 'cost-analysis',
      type: 'default',
      position: { x: 520, y: 320 },
      data: { label: 'Cost\nAnalysis' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 120 }
    },
    {
      id: 'funding-req',
      type: 'default',
      position: { x: 450, y: 460 },
      data: { label: 'Funding\nRequirements' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 120 }
    },
    
    // Level 2 - Sub-tasks for Executive Summary (depends on others)
    {
      id: 'vision-mission',
      type: 'default',
      position: { x: 50, y: 320 },
      data: { label: 'Vision &\nMission' },
      style: { ...nodeStyle, background: '#eab308', minWidth: 120 }
    },
    {
      id: 'key-highlights',
      type: 'default',
      position: { x: 100, y: 460 },
      data: { label: 'Key Business\nHighlights' },
      style: { ...nodeStyle, background: '#eab308', minWidth: 120 }
    },
    
    // Context/Output nodes
    {
      id: 'market-output',
      type: 'default',
      position: { x: 850, y: 320 },
      data: { label: 'Market Insights\n• TAM: $2.5B\n• Competition: Moderate\n• Growth: 15% YoY' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160, fontSize: '12px' }
    },
    {
      id: 'financial-output',
      type: 'default',
      position: { x: 850, y: 460 },
      data: { label: 'Financial Model\n• Year 1: $2M revenue\n• Break-even: Month 18\n• Funding: $5M needed' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160, fontSize: '12px' }
    },
    {
      id: 'final-output',
      type: 'default',
      position: { x: 400, y: 600 },
      data: { label: 'Complete Business Plan\nReady for Investors' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200, fontWeight: 'bold' }
    }
  ],
  initialEdges: [
    // Root to Level 1 connections
    {
      id: 'e-root-exec',
      source: 'root',
      target: 'exec-summary',
      style: edgeStyle
    },
    {
      id: 'e-root-market',
      source: 'root',
      target: 'market-analysis',
      style: edgeStyle
    },
    {
      id: 'e-root-financial',
      source: 'root',
      target: 'financial-proj',
      style: edgeStyle
    },
    {
      id: 'e-root-marketing',
      source: 'root',
      target: 'marketing-strategy',
      style: edgeStyle
    },
    
    // Market Analysis hierarchy
    {
      id: 'e-market-competitor',
      source: 'market-analysis',
      target: 'competitor-analysis',
      style: edgeStyle
    },
    {
      id: 'e-market-customers',
      source: 'market-analysis',
      target: 'target-customers',
      style: edgeStyle
    },
    {
      id: 'e-customers-size',
      source: 'target-customers',
      target: 'market-size',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },
    
    // Financial Projections hierarchy
    {
      id: 'e-financial-revenue',
      source: 'financial-proj',
      target: 'revenue-forecast',
      style: edgeStyle
    },
    {
      id: 'e-financial-cost',
      source: 'financial-proj',
      target: 'cost-analysis',
      style: edgeStyle
    },
    {
      id: 'e-revenue-funding',
      source: 'revenue-forecast',
      target: 'funding-req',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },
    {
      id: 'e-cost-funding',
      source: 'cost-analysis',
      target: 'funding-req',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },
    {
      id: 'e-size-revenue',
      source: 'market-size',
      target: 'revenue-forecast',
      style: { ...edgeStyle, stroke: '#10b981', strokeDasharray: '5,5' }
    },
    
    // Executive Summary hierarchy (depends on other sections)
    {
      id: 'e-exec-vision',
      source: 'exec-summary',
      target: 'vision-mission',
      style: edgeStyle
    },
    {
      id: 'e-exec-highlights',
      source: 'exec-summary',
      target: 'key-highlights',
      style: edgeStyle
    },
    
    // Dependencies for Executive Summary
    {
      id: 'e-market-highlights',
      source: 'market-analysis',
      target: 'key-highlights',
      style: { ...edgeStyle, stroke: '#10b981', strokeDasharray: '5,5' }
    },
    {
      id: 'e-financial-highlights',
      source: 'financial-proj',
      target: 'key-highlights',
      style: { ...edgeStyle, stroke: '#10b981', strokeDasharray: '5,5' }
    },
    
    // Output generation
    {
      id: 'e-market-output',
      source: 'market-analysis',
      target: 'market-output',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    {
      id: 'e-financial-output-edge',
      source: 'financial-proj',
      target: 'financial-output',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    
    // Final aggregation
    {
      id: 'e-exec-final',
      source: 'exec-summary',
      target: 'final-output',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-market-final',
      source: 'market-output',
      target: 'final-output',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-financial-final',
      source: 'financial-output',
      target: 'final-output',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-marketing-final',
      source: 'marketing-strategy',
      target: 'final-output',
      style: { ...edgeStyle, stroke: '#059669' }
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Root Task Definition',
      description: 'Define the top-level objective that will be broken down hierarchically.',
      input: 'Create a comprehensive business plan for an AI startup',
      activeNodes: ['root'],
      activeEdges: []
    },
    {
      id: 'step2', 
      title: 'Level 1 Decomposition',
      description: 'Break down the root task into major sections that can be worked on independently.',
      input: 'Root task → 4 main sections: Executive Summary, Market Analysis, Financial Projections, Marketing Strategy',
      activeNodes: ['root', 'exec-summary', 'market-analysis', 'financial-proj', 'marketing-strategy'],
      activeEdges: ['e-root-exec', 'e-root-market', 'e-root-financial', 'e-root-marketing']
    },
    {
      id: 'step3',
      title: 'Market Analysis Breakdown',
      description: 'The Market Analysis section is decomposed into specific research tasks.',
      input: 'Market Analysis → Competitor Analysis + Target Customers + Market Size',
      activeNodes: ['market-analysis', 'competitor-analysis', 'target-customers', 'market-size'],
      activeEdges: ['e-market-competitor', 'e-market-customers', 'e-customers-size']
    },
    {
      id: 'step4',
      title: 'Financial Projections Breakdown', 
      description: 'Financial section is decomposed with clear dependencies between sub-tasks.',
      input: 'Financial Projections → Revenue Forecast + Cost Analysis → Funding Requirements',
      activeNodes: ['financial-proj', 'revenue-forecast', 'cost-analysis', 'funding-req'],
      activeEdges: ['e-financial-revenue', 'e-financial-cost', 'e-revenue-funding', 'e-cost-funding']
    },
    {
      id: 'step5',
      title: 'Cross-Hierarchy Dependencies',
      description: 'Market Size analysis feeds into Revenue Forecast, showing cross-branch dependencies.',
      input: 'Market Size data → Revenue Forecast calculations',
      activeNodes: ['market-size', 'revenue-forecast'],
      activeEdges: ['e-size-revenue'],
      output: 'Market size of $2.5B TAM enables realistic revenue projections'
    },
    {
      id: 'step6',
      title: 'Market Analysis Completion',
      description: 'Market analysis tasks complete and generate consolidated insights.',
      output: 'Market Analysis Output:\n• Total Addressable Market: $2.5B\n• Competition Level: Moderate intensity\n• Growth Rate: 15% annually\n• Key Opportunities: SME market underserved',
      activeNodes: ['market-analysis', 'market-output'],
      activeEdges: ['e-market-output']
    },
    {
      id: 'step7',
      title: 'Financial Model Completion',
      description: 'Financial projections complete with funding requirements calculated.',
      output: 'Financial Model Output:\n• Year 1 Revenue: $2M projected\n• Break-even: Month 18\n• Funding Required: $5M Series A\n• Key Metrics: 40% gross margin',
      activeNodes: ['financial-proj', 'financial-output'],
      activeEdges: ['e-financial-output-edge']
    },
    {
      id: 'step8',
      title: 'Executive Summary Dependencies',
      description: 'Executive Summary depends on other sections being completed first.',
      input: 'Market insights + Financial model → Executive Summary key highlights',
      activeNodes: ['exec-summary', 'vision-mission', 'key-highlights'],
      activeEdges: ['e-exec-vision', 'e-exec-highlights', 'e-market-highlights', 'e-financial-highlights']
    },
    {
      id: 'step9',
      title: 'Final Aggregation',
      description: 'All sections are combined into the final comprehensive business plan.',
      input: 'Executive Summary + Market Analysis + Financial Projections + Marketing Strategy',
      activeNodes: ['final-output'],
      activeEdges: ['e-exec-final', 'e-market-final', 'e-financial-final', 'e-marketing-final'],
      output: 'Complete Business Plan:\n✓ Executive Summary with vision and key highlights\n✓ Comprehensive market analysis with $2.5B TAM\n✓ Financial projections showing path to profitability\n✓ Marketing strategy for customer acquisition\n\nReady for investor presentation'
    }
  ]
};