import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const feedbackChainingPattern: PatternScenario = {
  id: 'feedback-chaining',
  title: 'Feedback Chaining Pattern',
  description: 'Demonstrates iterative improvement through feedback loops until quality targets are achieved',
  initialNodes: [
    // Main flow
    {
      id: 'input',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { label: 'Initial Request\n"Write a product description for wireless headphones"' },
      style: { ...nodeStyle, minWidth: 250, background: '#dc2626' }
    },
    {
      id: 'generate',
      type: 'default',
      position: { x: 400, y: 180 },
      data: { label: 'Content Generation\nCreate initial version' },
      style: { ...nodeStyle, minWidth: 200 }
    },
    {
      id: 'evaluate',
      type: 'default',
      position: { x: 400, y: 310 },
      data: { label: 'Quality Evaluation\nScore content (1-10)' },
      style: { ...nodeStyle, minWidth: 200, background: '#f59e0b' }
    },
    {
      id: 'decision',
      type: 'default',
      position: { x: 400, y: 440 },
      data: { label: 'Quality Check\nScore ≥ Target?' },
      style: { ...nodeStyle, minWidth: 180, background: '#8b5cf6' }
    },
    {
      id: 'feedback',
      type: 'default',
      position: { x: 150, y: 310 },
      data: { label: 'Feedback Analysis\nIdentify improvement areas' },
      style: { ...nodeStyle, minWidth: 200, background: '#ef4444' }
    },
    {
      id: 'improve',
      type: 'default',
      position: { x: 150, y: 180 },
      data: { label: 'Apply Improvements\nRefine based on feedback' },
      style: { ...nodeStyle, minWidth: 200, background: '#f97316' }
    },
    {
      id: 'output',
      type: 'default',
      position: { x: 400, y: 570 },
      data: { label: 'Final Output\nHigh-quality content achieved' },
      style: { ...nodeStyle, minWidth: 220, background: '#059669' }
    },

    // Iteration examples
    {
      id: 'iteration1',
      type: 'default',
      position: { x: 700, y: 180 },
      data: { label: 'Iteration 1\n"Good headphones. Nice sound."\nScore: 3/10' },
      style: { ...nodeStyle, minWidth: 180, background: '#7c3aed', fontSize: '12px' }
    },
    {
      id: 'feedback1',
      type: 'default',
      position: { x: 700, y: 310 },
      data: { label: 'Feedback 1\n• Too generic\n• Missing features\n• Needs details' },
      style: { ...nodeStyle, minWidth: 160, background: '#7c3aed', fontSize: '12px' }
    },
    {
      id: 'iteration2',
      type: 'default',
      position: { x: 900, y: 180 },
      data: { label: 'Iteration 2\n"Wireless headphones with noise cancellation..."\nScore: 6/10' },
      style: { ...nodeStyle, minWidth: 180, background: '#7c3aed', fontSize: '12px' }
    },
    {
      id: 'feedback2',
      type: 'default',
      position: { x: 900, y: 310 },
      data: { label: 'Feedback 2\n• Better details\n• Needs emotional appeal\n• Add benefits' },
      style: { ...nodeStyle, minWidth: 160, background: '#7c3aed', fontSize: '12px' }
    },
    {
      id: 'iteration3',
      type: 'default',
      position: { x: 1100, y: 180 },
      data: { label: 'Iteration 3\n"Transform your listening experience..."\nScore: 9/10' },
      style: { ...nodeStyle, minWidth: 180, background: '#7c3aed', fontSize: '12px' }
    },

    // Process indicators
    {
      id: 'target',
      type: 'default',
      position: { x: 650, y: 440 },
      data: { label: 'Target Quality: 8/10\nMax Iterations: 5' },
      style: { ...nodeStyle, minWidth: 160, background: '#6366f1', fontSize: '12px' }
    }
  ],
  initialEdges: [
    // Main flow
    {
      id: 'e-input-generate',
      source: 'input',
      target: 'generate',
      style: edgeStyle
    },
    {
      id: 'e-generate-evaluate',
      source: 'generate',
      target: 'evaluate',
      style: edgeStyle
    },
    {
      id: 'e-evaluate-decision',
      source: 'evaluate',
      target: 'decision',
      style: edgeStyle
    },
    {
      id: 'e-decision-output',
      source: 'decision',
      target: 'output',
      style: { ...edgeStyle, stroke: '#059669' },
      label: 'Quality ≥ Target'
    },

    // Feedback loop
    {
      id: 'e-decision-feedback',
      source: 'decision',
      target: 'feedback',
      style: { ...edgeStyle, stroke: '#ef4444' },
      label: 'Quality < Target'
    },
    {
      id: 'e-feedback-improve',
      source: 'feedback',
      target: 'improve',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },
    {
      id: 'e-improve-generate',
      source: 'improve',
      target: 'generate',
      style: { ...edgeStyle, stroke: '#f97316', strokeDasharray: '5,5' }
    },
    {
      id: 'e-evaluate-feedback',
      source: 'evaluate',
      target: 'feedback',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '5,5' }
    },

    // Example iterations
    {
      id: 'e-generate-iteration1',
      source: 'generate',
      target: 'iteration1',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    {
      id: 'e-iteration1-feedback1',
      source: 'iteration1',
      target: 'feedback1',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    {
      id: 'e-iteration1-iteration2',
      source: 'iteration1',
      target: 'iteration2',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-iteration2-feedback2',
      source: 'iteration2',
      target: 'feedback2',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    {
      id: 'e-iteration2-iteration3',
      source: 'iteration2',
      target: 'iteration3',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },

    // Configuration
    {
      id: 'e-target-decision',
      source: 'target',
      target: 'decision',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3,3' }
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Initial Request',
      description: 'User provides the content creation task that needs iterative improvement.',
      input: 'Write a compelling product description for Sony WH-1000XM5 wireless headphones.',
      activeNodes: ['input'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'First Generation',
      description: 'System generates initial content version without prior context.',
      input: 'Task: Product description for wireless headphones',
      activeNodes: ['input', 'generate'],
      activeEdges: ['e-input-generate']
    },
    {
      id: 'step3',
      title: 'First Iteration Output',
      description: 'Initial attempt produces basic, generic content.',
      output: 'First Draft: "Good headphones. Nice sound. People like them. You should buy these headphones because they work well."',
      activeNodes: ['generate', 'iteration1'],
      activeEdges: ['e-generate-iteration1']
    },
    {
      id: 'step4',
      title: 'Quality Evaluation',
      description: 'System evaluates the content quality against multiple criteria.',
      input: 'Content evaluation criteria: clarity, detail, engagement, technical accuracy, persuasiveness',
      activeNodes: ['evaluate', 'iteration1'],
      activeEdges: ['e-generate-evaluate']
    },
    {
      id: 'step5',
      title: 'Quality Score Assessment',
      description: 'Content receives low quality score, triggering feedback loop.',
      output: 'Quality Score: 3/10\n• Clarity: 4/10 (too simple)\n• Detail: 2/10 (missing specs)\n• Engagement: 2/10 (boring)\n• Technical: 1/10 (no features)\n• Persuasiveness: 3/10 (weak)',
      activeNodes: ['evaluate', 'decision', 'target'],
      activeEdges: ['e-evaluate-decision', 'e-target-decision']
    },
    {
      id: 'step6',
      title: 'Feedback Analysis',
      description: 'System analyzes the low score and generates specific improvement suggestions.',
      input: 'Quality score 3/10 < Target 8/10 → Generate feedback',
      activeNodes: ['decision', 'feedback', 'feedback1'],
      activeEdges: ['e-decision-feedback', 'e-iteration1-feedback1']
    },
    {
      id: 'step7',
      title: 'Improvement Application',
      description: 'System applies feedback to create enhanced version.',
      output: 'Feedback Analysis:\n• Add specific product features\n• Include technical specifications\n• Use more engaging language\n• Provide concrete benefits\n• Create emotional connection',
      activeNodes: ['feedback', 'improve'],
      activeEdges: ['e-feedback-improve']
    },
    {
      id: 'step8',
      title: 'Second Generation',
      description: 'System generates improved content incorporating feedback.',
      input: 'Original content + Improvement suggestions → Enhanced version',
      activeNodes: ['improve', 'generate', 'iteration2'],
      activeEdges: ['e-improve-generate', 'e-iteration1-iteration2']
    },
    {
      id: 'step9',
      title: 'Second Iteration Output',
      description: 'Improved version shows significant enhancement with specific details.',
      output: 'Second Draft: "Wireless headphones with advanced noise cancellation technology. Features 30-hour battery life, Bluetooth 5.2 connectivity, and premium audio drivers. Lightweight design ensures comfort during extended use."',
      activeNodes: ['iteration2', 'feedback2'],
      activeEdges: ['e-iteration2-feedback2']
    },
    {
      id: 'step10',
      title: 'Continued Iteration',
      description: 'Process continues until quality target is reached.',
      output: 'Score: 6/10 (improved but still below target)\nFeedback: Better technical details, needs emotional appeal and stronger benefits',
      activeNodes: ['iteration2', 'iteration3'],
      activeEdges: ['e-iteration2-iteration3']
    },
    {
      id: 'step11',
      title: 'Target Quality Achieved',
      description: 'Final iteration reaches quality threshold, completing the feedback loop.',
      output: 'Final Draft: "Transform your listening experience with Sony WH-1000XM5 headphones. Industry-leading noise cancellation blocks out distractions while premium 40mm drivers deliver crystal-clear audio. The lightweight design and 30-hour battery ensure all-day comfort and uninterrupted enjoyment. Whether commuting or relaxing, these headphones adapt to your lifestyle with intuitive controls and seamless connectivity."',
      activeNodes: ['iteration3', 'output'],
      activeEdges: ['e-decision-output']
    },
    {
      id: 'step12',
      title: 'Feedback Loop Complete',
      description: 'Quality score meets target (9/10 ≥ 8/10), process terminates successfully.',
      output: 'Final Quality Score: 9/10\n✓ Clarity: 9/10 (well-structured)\n✓ Detail: 8/10 (specific features)\n✓ Engagement: 9/10 (compelling language)\n✓ Technical: 8/10 (accurate specs)\n✓ Persuasiveness: 9/10 (strong benefits)\n\nFeedback loop completed in 3 iterations.',
      activeNodes: ['output'],
      activeEdges: []
    }
  ]
};