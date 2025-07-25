import { PatternScenario } from './types';

export const controlPlanePattern: PatternScenario = {
  id: 'control-plane',
  title: 'Control Plane as a Tool',
  description: 'Scalable design pattern that exposes a single tool interface while encapsulating modular tool routing logic',
  steps: [
    {
      id: 'step1',
      title: 'Agent Request',
      description: 'Agent makes a request through unified tool interface',
      input: 'Tool request: "Analyze customer sentiment and generate report"',
      output: 'Request received by control plane',
      activeNodes: ['agent', 'control-plane'],
      activeEdges: ['agent-control']
    },
    {
      id: 'step2',
      title: 'Request Analysis',
      description: 'Control plane analyzes request and determines required tools',
      input: 'Complex multi-step request',
      output: 'Routing plan: Text Analysis → Sentiment API → Report Generator',
      activeNodes: ['control-plane', 'routing-logic'],
      activeEdges: ['control-routing'],
      nodeUpdates: {
        'control-plane': { 
          data: { 
            label: 'Control Plane\n(Analyzing Request)',
            style: { backgroundColor: '#3B82F6' }
          }
        }
      }
    },
    {
      id: 'step3',
      title: 'Tool Orchestration',
      description: 'Route to appropriate backend tools based on capabilities',
      input: 'Routing plan',
      output: 'Parallel tool invocations',
      activeNodes: ['control-plane', 'text-tool', 'sentiment-tool', 'report-tool'],
      activeEdges: ['control-text', 'control-sentiment', 'control-report'],
      nodeUpdates: {
        'control-plane': { 
          data: { 
            label: 'Control Plane\n(Orchestrating)',
            style: { backgroundColor: '#10B981' }
          }
        }
      }
    },
    {
      id: 'step4',
      title: 'Result Aggregation',
      description: 'Collect and combine results from multiple tools',
      input: 'Individual tool outputs',
      output: 'Aggregated comprehensive result',
      activeNodes: ['text-tool', 'sentiment-tool', 'report-tool', 'control-plane'],
      activeEdges: ['text-control', 'sentiment-control', 'report-control'],
      nodeUpdates: {
        'control-plane': { 
          data: { 
            label: 'Control Plane\n(Aggregating)',
            style: { backgroundColor: '#F59E0B' }
          }
        }
      }
    },
    {
      id: 'step5',
      title: 'Unified Response',
      description: 'Return single coherent response to agent',
      input: 'Aggregated results',
      output: 'Complete sentiment analysis report with visualizations',
      activeNodes: ['control-plane', 'agent'],
      activeEdges: ['control-agent']
    }
  ],
  initialNodes: [
    {
      id: 'agent',
      position: { x: 100, y: 150 },
      data: { 
        label: 'AI Agent',
        style: { backgroundColor: '#1F2937', color: 'white' }
      },
      type: 'default'
    },
    {
      id: 'control-plane',
      position: { x: 400, y: 150 },
      data: { 
        label: 'Control Plane\n(Unified Interface)',
        style: { backgroundColor: '#6366F1', color: 'white' }
      },
      type: 'default'
    },
    {
      id: 'routing-logic',
      position: { x: 600, y: 80 },
      data: { 
        label: 'Routing Logic\n& Policies',
        style: { backgroundColor: '#8B5CF6', color: 'white' }
      },
      type: 'default'
    },
    {
      id: 'text-tool',
      position: { x: 600, y: 150 },
      data: { 
        label: 'Text Analysis\nTool',
        style: { backgroundColor: '#10B981', color: 'white' }
      },
      type: 'default'
    },
    {
      id: 'sentiment-tool',
      position: { x: 600, y: 220 },
      data: { 
        label: 'Sentiment API\nTool',
        style: { backgroundColor: '#F59E0B', color: 'white' }
      },
      type: 'default'
    },
    {
      id: 'report-tool',
      position: { x: 600, y: 290 },
      data: { 
        label: 'Report Generator\nTool',
        style: { backgroundColor: '#EF4444', color: 'white' }
      },
      type: 'default'
    }
  ],
  initialEdges: [
    {
      id: 'agent-control',
      source: 'agent',
      target: 'control-plane',
      type: 'smoothstep',
      animated: false,
      label: 'Unified Request'
    },
    {
      id: 'control-routing',
      source: 'control-plane',
      target: 'routing-logic',
      type: 'smoothstep',
      animated: false,
      style: { strokeDasharray: '5,5' }
    },
    {
      id: 'control-text',
      source: 'control-plane',
      target: 'text-tool',
      type: 'smoothstep',
      animated: false
    },
    {
      id: 'control-sentiment',
      source: 'control-plane',
      target: 'sentiment-tool',
      type: 'smoothstep',
      animated: false
    },
    {
      id: 'control-report',
      source: 'control-plane',
      target: 'report-tool',
      type: 'smoothstep',
      animated: false
    },
    {
      id: 'text-control',
      source: 'text-tool',
      target: 'control-plane',
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#6B7280', strokeDasharray: '3,3' }
    },
    {
      id: 'sentiment-control',
      source: 'sentiment-tool',
      target: 'control-plane',
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#6B7280', strokeDasharray: '3,3' }
    },
    {
      id: 'report-control',
      source: 'report-tool',
      target: 'control-plane',
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#6B7280', strokeDasharray: '3,3' }
    },
    {
      id: 'control-agent',
      source: 'control-plane',
      target: 'agent',
      type: 'smoothstep',
      animated: false,
      label: 'Unified Response'
    }
  ]
}; 