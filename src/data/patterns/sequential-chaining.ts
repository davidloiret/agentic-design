import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const sequentialChainingPattern: PatternScenario = {
  id: 'sequential-chaining',
  title: 'Sequential Chaining Pattern',
  description: 'Demonstrates linear workflow execution where each output feeds the next input',
  initialNodes: [
    {
      id: 'input',
      type: 'default',
      position: { x: 250, y: 50 },
      data: { label: 'Input Request\n"Write a product review for wireless headphones"' },
      style: { ...nodeStyle, minWidth: 250 }
    },
    {
      id: 'research',
      type: 'default',
      position: { x: 250, y: 180 },
      data: { label: 'Chain 1: Research Phase\nAnalyze product features' },
      style: { ...nodeStyle, minWidth: 200 }
    },
    {
      id: 'compare',
      type: 'default',
      position: { x: 250, y: 310 },
      data: { label: 'Chain 2: Comparison Phase\nCompare with competitors' },
      style: { ...nodeStyle, minWidth: 200 }
    },
    {
      id: 'write',
      type: 'default',
      position: { x: 250, y: 440 },
      data: { label: 'Chain 3: Writing Phase\nGenerate review content' },
      style: { ...nodeStyle, minWidth: 200 }
    },
    {
      id: 'edit',
      type: 'default',
      position: { x: 250, y: 570 },
      data: { label: 'Chain 4: Editing Phase\nImprove clarity and tone' },
      style: { ...nodeStyle, minWidth: 200 }
    },
    {
      id: 'output',
      type: 'default',
      position: { x: 250, y: 700 },
      data: { label: 'Final Output\nPolished Product Review' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 }
    },
    // Context flow nodes
    {
      id: 'context1',
      type: 'default',
      position: { x: 550, y: 180 },
      data: { label: 'Research Output\n• Noise cancellation: 95%\n• Battery life: 30hrs\n• Price: $299' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 }
    },
    {
      id: 'context2',
      type: 'default',
      position: { x: 550, y: 310 },
      data: { label: 'Comparison Output\n• Competitor A: $349, 25hrs\n• Competitor B: $279, 20hrs\n• Best value proposition' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 }
    },
    {
      id: 'context3',
      type: 'default',
      position: { x: 550, y: 440 },
      data: { label: 'Draft Review\n"Excellent headphones with\ngreat battery life..."' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 }
    },
    {
      id: 'context4',
      type: 'default',
      position: { x: 550, y: 570 },
      data: { label: 'Edited Review\nImproved flow, corrected\ngrammar, enhanced tone' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 }
    }
  ],
  initialEdges: [
    {
      id: 'e-input-research',
      source: 'input',
      target: 'research',
      style: edgeStyle
    },
    {
      id: 'e-research-compare',
      source: 'research',
      target: 'compare',
      style: edgeStyle
    },
    {
      id: 'e-compare-write',
      source: 'compare',
      target: 'write',
      style: edgeStyle
    },
    {
      id: 'e-write-edit',
      source: 'write',
      target: 'edit',
      style: edgeStyle
    },
    {
      id: 'e-edit-output',
      source: 'edit',
      target: 'output',
      style: edgeStyle
    },
    // Context flow edges
    {
      id: 'e-research-context1',
      source: 'research',
      target: 'context1',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    {
      id: 'e-context1-compare',
      source: 'context1',
      target: 'compare',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    {
      id: 'e-compare-context2',
      source: 'compare',
      target: 'context2',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    {
      id: 'e-context2-write',
      source: 'context2',
      target: 'write',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    {
      id: 'e-write-context3',
      source: 'write',
      target: 'context3',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    {
      id: 'e-context3-edit',
      source: 'context3',
      target: 'edit',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    {
      id: 'e-edit-context4',
      source: 'edit',
      target: 'context4',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Initial Request',
      description: 'User provides the task that needs to be accomplished through sequential processing.',
      input: 'Write a comprehensive product review for Sony WH-1000XM5 wireless headphones.',
      activeNodes: ['input'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Research Chain Activation',
      description: 'First chain analyzes product specifications, features, and technical details.',
      input: 'Product: Sony WH-1000XM5\nTask: Extract key features and specifications',
      activeNodes: ['input', 'research'],
      activeEdges: ['e-input-research']
    },
    {
      id: 'step3',
      title: 'Research Output Generation',
      description: 'Research chain produces structured data about the product features.',
      output: 'Features Analysis:\n• Noise Cancellation: Industry-leading ANC\n• Battery Life: 30 hours\n• Audio Quality: Hi-Res Audio certified\n• Price Point: $399 MSRP\n• Comfort: Lightweight design\n• Connectivity: Bluetooth 5.2, multipoint',
      activeNodes: ['research', 'context1'],
      activeEdges: ['e-research-context1']
    },
    {
      id: 'step4',
      title: 'Comparison Chain Activation',
      description: 'Second chain receives research output and performs competitive analysis.',
      input: 'Research data + Task: Compare with competitor products',
      activeNodes: ['context1', 'compare'],
      activeEdges: ['e-context1-compare']
    },
    {
      id: 'step5',
      title: 'Comparison Output Generation',
      description: 'Comparison chain generates competitive positioning analysis.',
      output: 'Competitive Analysis:\n• vs Bose QuietComfort 45: Better battery (30 vs 24hrs)\n• vs Apple AirPods Max: More affordable ($399 vs $549)\n• vs Sennheiser Momentum 4: Similar price, better ANC\n• Market Position: Premium tier, excellent value\n• Key Differentiators: Battery life + ANC quality',
      activeNodes: ['compare', 'context2'],
      activeEdges: ['e-compare-context2']
    },
    {
      id: 'step6',
      title: 'Writing Chain Activation',
      description: 'Third chain combines research and comparison data to create the review content.',
      input: 'Research data + Comparison analysis + Task: Write engaging review',
      activeNodes: ['context2', 'write'],
      activeEdges: ['e-context2-write']
    },
    {
      id: 'step7',
      title: 'Draft Review Generation',
      description: 'Writing chain produces the initial review draft.',
      output: 'Draft Review:\n\n"The Sony WH-1000XM5 headphones deliver exceptional performance in the premium wireless category. With industry-leading noise cancellation and impressive 30-hour battery life, they outperform competitors like the Bose QuietComfort 45. The Hi-Res Audio certification ensures superior sound quality, while the lightweight design provides all-day comfort. At $399, they offer excellent value compared to pricier alternatives like Apple\'s AirPods Max. The Bluetooth 5.2 connectivity with multipoint pairing adds practical convenience for daily use."',
      activeNodes: ['write', 'context3'],
      activeEdges: ['e-write-context3']
    },
    {
      id: 'step8',
      title: 'Editing Chain Activation',
      description: 'Fourth chain receives the draft and improves clarity, flow, and engagement.',
      input: 'Draft review + Task: Improve clarity, flow, and reader engagement',
      activeNodes: ['context3', 'edit'],
      activeEdges: ['e-context3-edit']
    },
    {
      id: 'step9',
      title: 'Final Polish and Enhancement',
      description: 'Editing chain refines the review for publication quality.',
      output: 'Editing Improvements:\n• Enhanced introduction hook\n• Improved paragraph transitions\n• Added specific use case examples\n• Strengthened conclusion with clear recommendation\n• Corrected grammar and enhanced readability\n• Added pros/cons structure for clarity',
      activeNodes: ['edit', 'context4'],
      activeEdges: ['e-edit-context4']
    },
    {
      id: 'step10',
      title: 'Final Polished Review',
      description: 'The complete sequential chain delivers a publication-ready product review.',
      output: 'Final Review:\n\n**Sony WH-1000XM5: Premium Wireless Excellence**\n\nIf you\'re searching for wireless headphones that deliver on every front, the Sony WH-1000XM5 should top your list. After extensive testing, these headphones prove why Sony dominates the premium audio market.\n\n**Standout Performance**\nThe noise cancellation is simply outstanding—whether you\'re on a busy flight or working in a noisy café, external sounds virtually disappear. The 30-hour battery life outshines competitors like the Bose QuietComfort 45 (24 hours), making these perfect for long trips or heavy daily use.\n\n**Superior Value**\nAt $399, they\'re significantly more affordable than Apple\'s AirPods Max ($549) while delivering comparable audio quality. The Hi-Res Audio certification isn\'t just marketing—you\'ll hear the difference in your favorite tracks.\n\n**Pros:**\n• Best-in-class noise cancellation\n• Exceptional 30-hour battery life\n• Lightweight, comfortable design\n• Excellent value vs competitors\n\n**Cons:**\n• Touch controls can be oversensitive\n• No wired audio when battery dies\n\n**Verdict:** The WH-1000XM5 headphones offer premium features at a reasonable price, making them an easy recommendation for anyone serious about audio quality.',
      activeNodes: ['output'],
      activeEdges: ['e-edit-output']
    }
  ]
};