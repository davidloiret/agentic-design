import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const iterativeRefinementPattern: PatternScenario = {
  id: 'iterative-refinement',
  title: 'Iterative Refinement Pattern',
  description: 'Demonstrates continuous improvement through multiple refinement cycles with incremental enhancements',
  initialNodes: [
    // Main flow
    {
      id: 'input',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { label: 'Initial Task\n"Write an essay on renewable energy"' },
      style: { ...nodeStyle, minWidth: 250, background: '#dc2626' }
    },
    {
      id: 'draft',
      type: 'default',
      position: { x: 400, y: 180 },
      data: { label: 'Create Initial Draft\nGenerate baseline content' },
      style: { ...nodeStyle, minWidth: 200 }
    },
    {
      id: 'cycle1',
      type: 'default',
      position: { x: 200, y: 320 },
      data: { label: 'Refinement Cycle 1\nStructure & Clarity' },
      style: { ...nodeStyle, minWidth: 180, background: '#f59e0b' }
    },
    {
      id: 'cycle2',
      type: 'default',
      position: { x: 400, y: 320 },
      data: { label: 'Refinement Cycle 2\nContent & Evidence' },
      style: { ...nodeStyle, minWidth: 180, background: '#f97316' }
    },
    {
      id: 'cycle3',
      type: 'default',
      position: { x: 600, y: 320 },
      data: { label: 'Refinement Cycle 3\nStyle & Polish' },
      style: { ...nodeStyle, minWidth: 180, background: '#ea580c' }
    },
    {
      id: 'convergence',
      type: 'default',
      position: { x: 400, y: 460 },
      data: { label: 'Convergence Check\nAssess improvement rate' },
      style: { ...nodeStyle, minWidth: 200, background: '#8b5cf6' }
    },
    {
      id: 'output',
      type: 'default',
      position: { x: 400, y: 590 },
      data: { label: 'Polished Output\nHigh-quality refined content' },
      style: { ...nodeStyle, minWidth: 220, background: '#059669' }
    },

    // Refinement details
    {
      id: 'structure-detail',
      type: 'default',
      position: { x: 50, y: 180 },
      data: { label: 'Structure Focus\n• Clear introduction\n• Logical flow\n• Better transitions' },
      style: { ...nodeStyle, minWidth: 160, background: '#7c3aed', fontSize: '12px' }
    },
    {
      id: 'content-detail',
      type: 'default',
      position: { x: 400, y: 480 },
      data: { label: 'Content Focus\n• Add evidence\n• Include examples\n• Strengthen arguments' },
      style: { ...nodeStyle, minWidth: 160, background: '#7c3aed', fontSize: '12px' }
    },
    {
      id: 'style-detail',
      type: 'default',
      position: { x: 750, y: 180 },
      data: { label: 'Style Focus\n• Improve readability\n• Fix grammar\n• Enhance tone' },
      style: { ...nodeStyle, minWidth: 160, background: '#7c3aed', fontSize: '12px' }
    },

    // Quality progression
    {
      id: 'quality-track',
      type: 'default',
      position: { x: 800, y: 320 },
      data: { label: 'Quality Tracking\nDraft: 4/10\nCycle 1: 6/10\nCycle 2: 7.5/10\nCycle 3: 9/10' },
      style: { ...nodeStyle, minWidth: 140, background: '#6366f1', fontSize: '11px' }
    },

    // Process controls
    {
      id: 'criteria',
      type: 'default',
      position: { x: 650, y: 460 },
      data: { label: 'Stop Criteria\n• Quality threshold\n• Max iterations\n• Diminishing returns' },
      style: { ...nodeStyle, minWidth: 160, background: '#6366f1', fontSize: '12px' }
    }
  ],
  initialEdges: [
    // Main flow
    {
      id: 'e-input-draft',
      source: 'input',
      target: 'draft',
      style: edgeStyle
    },
    {
      id: 'e-draft-cycle1',
      source: 'draft',
      target: 'cycle1',
      style: edgeStyle
    },
    {
      id: 'e-cycle1-cycle2',
      source: 'cycle1',
      target: 'cycle2',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },
    {
      id: 'e-cycle2-cycle3',
      source: 'cycle2',
      target: 'cycle3',
      style: { ...edgeStyle, stroke: '#f97316' }
    },
    {
      id: 'e-cycle3-convergence',
      source: 'cycle3',
      target: 'convergence',
      style: { ...edgeStyle, stroke: '#ea580c' }
    },
    {
      id: 'e-convergence-output',
      source: 'convergence',
      target: 'output',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Refinement details
    {
      id: 'e-structure-cycle1',
      source: 'structure-detail',
      target: 'cycle1',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    {
      id: 'e-content-cycle2',
      source: 'content-detail',
      target: 'cycle2',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    {
      id: 'e-style-cycle3',
      source: 'style-detail',
      target: 'cycle3',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },

    // Quality tracking
    {
      id: 'e-draft-quality',
      source: 'draft',
      target: 'quality-track',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-quality-convergence',
      source: 'quality-track',
      target: 'convergence',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3,3' }
    },

    // Process controls
    {
      id: 'e-criteria-convergence',
      source: 'criteria',
      target: 'convergence',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3,3' }
    },

    // Iterative connections
    {
      id: 'e-cycle2-cycle1-loop',
      source: 'cycle2',
      target: 'cycle1',
      style: { ...edgeStyle, stroke: '#10b981', strokeDasharray: '8,8' },
      animated: true
    },
    {
      id: 'e-cycle3-cycle2-loop',
      source: 'cycle3',
      target: 'cycle2',
      style: { ...edgeStyle, stroke: '#10b981', strokeDasharray: '8,8' },
      animated: true
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Initial Task Definition',
      description: 'Define the content creation task that will be refined through multiple iterations.',
      input: 'Write a comprehensive essay on renewable energy and its impact on climate change.',
      activeNodes: ['input'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Initial Draft Creation',
      description: 'Create a baseline version that covers the basic requirements.',
      input: 'Topic: Renewable energy essay\nLength: 1000 words\nAudience: General public',
      activeNodes: ['input', 'draft'],
      activeEdges: ['e-input-draft']
    },
    {
      id: 'step3',
      title: 'Baseline Content Generated',
      description: 'First draft provides foundational content but needs refinement.',
      output: 'Initial Draft (Quality: 4/10):\n"Renewable energy is important for the environment. Solar panels and wind turbines make clean electricity. This helps reduce pollution and climate change. Many countries are using more renewable energy now. It costs money to build but saves money later. Fossil fuels are bad for the planet."',
      activeNodes: ['draft', 'quality-track'],
      activeEdges: ['e-draft-quality']
    },
    {
      id: 'step4',
      title: 'Refinement Cycle 1: Structure & Clarity',
      description: 'Focus on improving organization, flow, and logical structure.',
      input: 'Refinement focus: Structure and clarity improvements',
      activeNodes: ['cycle1', 'structure-detail'],
      activeEdges: ['e-draft-cycle1', 'e-structure-cycle1']
    },
    {
      id: 'step5',
      title: 'Structure Improvements Applied',
      description: 'Better organization and clearer argument structure established.',
      output: 'After Cycle 1 (Quality: 6/10):\n"Introduction: The global shift toward renewable energy represents a critical response to climate change.\n\nBody: Solar and wind technologies have matured significantly, offering cost-effective alternatives to fossil fuels. Government policies and market forces drive adoption.\n\nConclusion: Renewable energy transition is essential for environmental sustainability."',
      activeNodes: ['cycle1', 'cycle2'],
      activeEdges: ['e-cycle1-cycle2']
    },
    {
      id: 'step6',
      title: 'Refinement Cycle 2: Content & Evidence',
      description: 'Add supporting evidence, examples, and strengthen arguments.',
      input: 'Refinement focus: Content depth and evidence',
      activeNodes: ['cycle2', 'content-detail'],
      activeEdges: ['e-content-cycle2']
    },
    {
      id: 'step7',
      title: 'Content Enhancements Added',
      description: 'Stronger arguments with data, examples, and evidence integrated.',
      output: 'After Cycle 2 (Quality: 7.5/10):\n"Solar energy costs dropped 85% between 2010-2020 (IRENA). Denmark generates 140% of its electricity from wind power, exporting surplus to neighbors. China leads in renewable capacity with 895 GW installed. Economic benefits include job creation: 12 million renewable energy jobs globally."',
      activeNodes: ['cycle2', 'cycle3'],
      activeEdges: ['e-cycle2-cycle3']
    },
    {
      id: 'step8',
      title: 'Refinement Cycle 3: Style & Polish',
      description: 'Focus on readability, grammar, tone, and final polish.',
      input: 'Refinement focus: Writing style and polish',
      activeNodes: ['cycle3', 'style-detail'],
      activeEdges: ['e-style-cycle3']
    },
    {
      id: 'step9',
      title: 'Style Refinements Applied',
      description: 'Enhanced readability, improved flow, and professional polish.',
      output: 'After Cycle 3 (Quality: 9/10):\n"The renewable energy revolution has transformed from environmental aspiration to economic imperative. As solar costs plummeted and wind technology matured, nations discovered that sustainability and prosperity align. Denmark\'s wind energy success demonstrates how early investment yields lasting dividends, while China\'s massive deployment proves scalability."',
      activeNodes: ['cycle3', 'convergence', 'quality-track'],
      activeEdges: ['e-cycle3-convergence', 'e-quality-convergence']
    },
    {
      id: 'step10',
      title: 'Convergence Assessment',
      description: 'Evaluate if further refinement yields diminishing returns.',
      input: 'Quality progression: 4→6→7.5→9\nImprovement rate: 2→1.5→1.5 (diminishing)\nTarget: 8+ achieved',
      activeNodes: ['convergence', 'criteria'],
      activeEdges: ['e-criteria-convergence']
    },
    {
      id: 'step11',
      title: 'Iterative Cross-Pollination',
      description: 'Later cycles can inform earlier ones for comprehensive improvement.',
      input: 'Style insights improve structure, content insights enhance clarity',
      activeNodes: ['cycle1', 'cycle2', 'cycle3'],
      activeEdges: ['e-cycle2-cycle1-loop', 'e-cycle3-cycle2-loop']
    },
    {
      id: 'step12',
      title: 'Refined Output Complete',
      description: 'Multi-cycle refinement produces high-quality, polished content.',
      output: 'Final Essay: Comprehensive, well-structured analysis with compelling arguments, strong evidence, and polished presentation. Quality score 9/10 achieved through systematic refinement across structure, content, and style dimensions.',
      activeNodes: ['output'],
      activeEdges: ['e-convergence-output']
    }
  ]
};