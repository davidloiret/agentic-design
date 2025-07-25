import { PatternScenario } from './types';

export const graphOfThoughtPattern: PatternScenario = {
  id: 'got',
  title: 'Graph-of-Thought (GoT)',
  description: 'Non-linear reasoning where thoughts are vertices and dependencies are edges in a dynamic graph structure',
  steps: [
    {
      id: 'step1',
      title: 'Initial Thought Generation',
      description: 'Generate multiple initial thought nodes for the problem',
      input: 'Problem: "Design sustainable smart city"',
      output: 'Core thought nodes: Energy, Transport, Housing, Economics',
      activeNodes: ['problem', 'energy-thought', 'transport-thought', 'housing-thought', 'economic-thought'],
      activeEdges: ['problem-energy', 'problem-transport', 'problem-housing', 'problem-economic']
    },
    {
      id: 'step2',
      title: 'Dependency Mapping',
      description: 'Establish connections and dependencies between thoughts',
      input: 'Core thought nodes',
      output: 'Interconnected graph with bidirectional dependencies',
      activeNodes: ['energy-thought', 'transport-thought', 'housing-thought', 'economic-thought'],
      activeEdges: ['energy-transport', 'energy-housing', 'transport-housing', 'housing-economic', 'economic-energy'],
    },
    {
      id: 'step3',
      title: 'Synergistic Expansion',
      description: 'Generate new thoughts from combinations and intersections',
      input: 'Interconnected thought network',
      output: 'Synergistic nodes: Solar+Transit, Green+Water, Mixed-Use zones',
      activeNodes: ['energy-thought', 'transport-thought', 'housing-thought', 'synergy1', 'synergy2', 'synergy3'],
      activeEdges: ['energy-synergy1', 'transport-synergy1', 'housing-synergy2', 'synergy2-synergy3'],
      newNodes: [
        {
          id: 'synergy1',
          position: { x: 300, y: 50 },
          data: { 
            label: 'Solar + Transit\nSynergy',
            style: { backgroundColor: '#F59E0B', color: 'white', borderRadius: '20px' }
          },
          type: 'default'
        },
        {
          id: 'synergy2',
          position: { x: 500, y: 50 },
          data: { 
            label: 'Green + Water\nIntegration',
            style: { backgroundColor: '#10B981', color: 'white', borderRadius: '20px' }
          },
          type: 'default'
        },
        {
          id: 'synergy3',
          position: { x: 400, y: 250 },
          data: { 
            label: 'Mixed-Use\nDevelopment',
            style: { backgroundColor: '#8B5CF6', color: 'white', borderRadius: '20px' }
          },
          type: 'default'
        }
      ]
    },
    {
      id: 'step4',
      title: 'Feedback Integration',
      description: 'Refine thoughts through feedback loops and backtracking',
      input: 'Expanded graph with synergies',
      output: 'Refined graph with feedback-adjusted strengths',
      activeNodes: ['synergy1', 'synergy2', 'synergy3', 'feedback-node'],
      activeEdges: ['feedback-synergy1', 'feedback-synergy2', 'feedback-synergy3'],
      newNodes: [
        {
          id: 'feedback-node',
          position: { x: 400, y: 150 },
          data: { 
            label: 'Feedback\nIntegration',
            style: { backgroundColor: '#DC2626', color: 'white', borderRadius: '15px' }
          },
          type: 'default'
        }
      ]
    },
    {
      id: 'step5',
      title: 'Solution Distillation',
      description: 'Extract coherent solution from the refined thought graph',
      input: 'Refined thought network with feedback',
      output: 'Integrated eco-districts with energy-positive buildings and autonomous transit',
      activeNodes: ['synergy1', 'synergy2', 'synergy3', 'solution'],
      activeEdges: ['synergy1-solution', 'synergy2-solution', 'synergy3-solution'],
      newNodes: [
        {
          id: 'solution',
          position: { x: 700, y: 150 },
          data: { 
            label: 'Distilled Solution\nEco-Districts',
            style: { backgroundColor: '#059669', color: 'white', borderRadius: '25px', fontSize: '12px' }
          },
          type: 'default'
        }
      ]
    }
  ],
  initialNodes: [
    {
      id: 'problem',
      position: { x: 100, y: 150 },
      data: { 
        label: 'Problem:\nSustainable\nSmart City',
        style: { backgroundColor: '#1F2937', color: 'white' }
      },
      type: 'default'
    },
    {
      id: 'energy-thought',
      position: { x: 300, y: 100 },
      data: { 
        label: 'Energy\nSystems',
        style: { backgroundColor: '#F59E0B', color: 'white' }
      },
      type: 'default'
    },
    {
      id: 'transport-thought',
      position: { x: 300, y: 200 },
      data: { 
        label: 'Transportation\nNetworks',
        style: { backgroundColor: '#3B82F6', color: 'white' }
      },
      type: 'default'
    },
    {
      id: 'housing-thought',
      position: { x: 500, y: 100 },
      data: { 
        label: 'Housing\nPolicies',
        style: { backgroundColor: '#10B981', color: 'white' }
      },
      type: 'default'
    },
    {
      id: 'economic-thought',
      position: { x: 500, y: 200 },
      data: { 
        label: 'Economic\nZones',
        style: { backgroundColor: '#8B5CF6', color: 'white' }
      },
      type: 'default'
    }
  ],
  initialEdges: [
    {
      id: 'problem-energy',
      source: 'problem',
      target: 'energy-thought',
      type: 'smoothstep',
      animated: false
    },
    {
      id: 'problem-transport',
      source: 'problem',
      target: 'transport-thought',
      type: 'smoothstep',
      animated: false
    },
    {
      id: 'problem-housing',
      source: 'problem',
      target: 'housing-thought',
      type: 'smoothstep',
      animated: false
    },
    {
      id: 'problem-economic',
      source: 'problem',
      target: 'economic-thought',
      type: 'smoothstep',
      animated: false
    },
    {
      id: 'energy-transport',
      source: 'energy-thought',
      target: 'transport-thought',
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#6B7280', strokeDasharray: '3,3' },
      label: 'influences'
    },
    {
      id: 'energy-housing',
      source: 'energy-thought',
      target: 'housing-thought',
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#6B7280', strokeDasharray: '3,3' },
      label: 'affects'
    },
    {
      id: 'transport-housing',
      source: 'transport-thought',
      target: 'housing-thought',
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#6B7280', strokeDasharray: '3,3' },
      label: 'connects'
    },
    {
      id: 'housing-economic',
      source: 'housing-thought',
      target: 'economic-thought',
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#6B7280', strokeDasharray: '3,3' },
      label: 'enables'
    },
    {
      id: 'economic-energy',
      source: 'economic-thought',
      target: 'energy-thought',
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#6B7280', strokeDasharray: '3,3' },
      label: 'funds'
    }
  ]
}; 