import { PatternScenario } from './types';

export const latentRecurrentThinkingPattern: PatternScenario = {
  id: 'lrt',
  title: 'Latent Recurrent Thinking (LRT)',
  description: 'AI reasoning through iterative refinement in continuous latent space without explicit token generation',
  steps: [
    {
      id: 'step1',
      title: 'Problem Encoding',
      description: 'Convert input problem into high-dimensional latent representation',
      input: 'Complex optimization problem: "Design efficient logistics network"',
      output: 'Encoded as 1024-dimensional latent vector z₀',
      activeNodes: ['input', 'encoder'],
      activeEdges: ['input-encoder']
    },
    {
      id: 'step2',
      title: 'Latent Iteration 1',
      description: 'First recurrent refinement cycle in latent space',
      input: 'z₀ (initial encoding)',
      output: 'z₁ (refined with constraint mapping)',
      activeNodes: ['encoder', 'latent-processor'],
      activeEdges: ['encoder-latent'],
      nodeUpdates: {
        'latent-processor': { 
          data: { 
            label: 'Latent Processor\n(Cycle 1: Constraints)',
            style: { backgroundColor: '#8B5CF6' }
          }
        }
      }
    },
    {
      id: 'step3',
      title: 'Latent Iteration 2',
      description: 'Second refinement cycle focusing on optimization',
      input: 'z₁ (constraint-aware state)',
      output: 'z₂ (optimized solution space)',
      activeNodes: ['latent-processor'],
      activeEdges: ['latent-recurrent'],
      nodeUpdates: {
        'latent-processor': { 
          data: { 
            label: 'Latent Processor\n(Cycle 2: Optimization)',
            style: { backgroundColor: '#7C3AED' }
          }
        }
      }
    },
    {
      id: 'step4',
      title: 'Latent Iteration 3',
      description: 'Final refinement cycle with risk assessment',
      input: 'z₂ (optimized state)',
      output: 'z₃ (risk-adjusted final state)',
      activeNodes: ['latent-processor'],
      activeEdges: ['latent-recurrent'],
      nodeUpdates: {
        'latent-processor': { 
          data: { 
            label: 'Latent Processor\n(Cycle 3: Risk Assessment)',
            style: { backgroundColor: '#6D28D9' }
          }
        }
      }
    },
    {
      id: 'step5',
      title: 'Solution Decoding',
      description: 'Transform final latent state into human-readable solution',
      input: 'z₃ (final refined state)',
      output: 'Optimized logistics plan with 23% cost reduction',
      activeNodes: ['latent-processor', 'decoder', 'output'],
      activeEdges: ['latent-decoder', 'decoder-output']
    }
  ],
  initialNodes: [
    {
      id: 'input',
      position: { x: 50, y: 100 },
      data: { 
        label: 'Complex Problem\nInput',
        style: { backgroundColor: '#EF4444', color: 'white' }
      },
      type: 'default'
    },
    {
      id: 'encoder',
      position: { x: 250, y: 100 },
      data: { 
        label: 'Encoder\n(→ Latent Space)',
        style: { backgroundColor: '#3B82F6', color: 'white' }
      },
      type: 'default'
    },
    {
      id: 'latent-processor',
      position: { x: 450, y: 100 },
      data: { 
        label: 'Latent Processor\n(Iterative Refinement)',
        style: { backgroundColor: '#8B5CF6', color: 'white' }
      },
      type: 'default'
    },
    {
      id: 'decoder',
      position: { x: 650, y: 100 },
      data: { 
        label: 'Decoder\n(← Human Readable)',
        style: { backgroundColor: '#10B981', color: 'white' }
      },
      type: 'default'
    },
    {
      id: 'output',
      position: { x: 850, y: 100 },
      data: { 
        label: 'Optimized\nSolution',
        style: { backgroundColor: '#F59E0B', color: 'white' }
      },
      type: 'default'
    }
  ],
  initialEdges: [
    {
      id: 'input-encoder',
      source: 'input',
      target: 'encoder',
      type: 'smoothstep',
      animated: false
    },
    {
      id: 'encoder-latent',
      source: 'encoder',
      target: 'latent-processor',
      type: 'smoothstep',
      animated: false
    },
    {
      id: 'latent-recurrent',
      source: 'latent-processor',
      target: 'latent-processor',
      type: 'smoothstep',
      animated: false,
      style: { strokeDasharray: '5,5' },
      label: 'Recurrent Cycles'
    },
    {
      id: 'latent-decoder',
      source: 'latent-processor',
      target: 'decoder',
      type: 'smoothstep',
      animated: false
    },
    {
      id: 'decoder-output',
      source: 'decoder',
      target: 'output',
      type: 'smoothstep',
      animated: false
    }
  ]
}; 