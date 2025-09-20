import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const producerCriticPattern: PatternScenario = {
  id: 'producer-critic',
  title: 'Producer-Critic Pattern',
  description: 'Demonstrates separate producer and critic agents collaborating for quality improvement',
  initialNodes: [
    {
      id: 'task',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { label: 'Task Request\n"Write a technical blog post about microservices"' },
      style: { ...nodeStyle, minWidth: 350 }
    },
    // Producer Agent
    {
      id: 'producer-agent',
      type: 'default',
      position: { x: 200, y: 160 },
      data: { label: '✍️ Producer Agent\nContent Generation Specialist' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 250 }
    },
    {
      id: 'initial-output',
      type: 'default',
      position: { x: 200, y: 280 },
      data: { label: 'Initial Output\nBlog post draft v1\n"Microservices are small..."' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 220 }
    },
    // Critic Agent
    {
      id: 'critic-agent',
      type: 'default',
      position: { x: 600, y: 160 },
      data: { label: '🔍 Critic Agent\nQuality Evaluation Specialist' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 250 }
    },
    {
      id: 'evaluation-criteria',
      type: 'default',
      position: { x: 850, y: 160 },
      data: { label: '📋 Evaluation Rubric\n• Technical accuracy\n• Clarity & structure\n• Code examples\n• Best practices' },
      style: { ...nodeStyle, background: '#1f2937', minWidth: 180, fontSize: 11 }
    },
    {
      id: 'critique-output',
      type: 'default',
      position: { x: 600, y: 380 },
      data: { label: '📝 Critique Report\nScore: 6.5/10\n• Missing examples\n• Unclear benefits section\n• Add deployment tips' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 }
    },
    // Refinement Loop
    {
      id: 'refinement-decision',
      type: 'default',
      position: { x: 400, y: 480 },
      data: { label: '🎯 Refinement Decision\nScore < 8.0\n⚡ Needs improvement' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 }
    },
    {
      id: 'producer-refine',
      type: 'default',
      position: { x: 200, y: 580 },
      data: { label: '✏️ Producer Refinement\nIncorporating feedback' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 220 }
    },
    {
      id: 'refined-output',
      type: 'default',
      position: { x: 200, y: 700 },
      data: { label: 'Refined Output\nBlog post draft v2\nWith examples & improvements' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 }
    },
    // Second Critique
    {
      id: 'critic-reeval',
      type: 'default',
      position: { x: 600, y: 580 },
      data: { label: '🔍 Critic Re-evaluation\nSecond review pass' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 220 }
    },
    {
      id: 'final-critique',
      type: 'default',
      position: { x: 600, y: 700 },
      data: { label: '✅ Final Critique\nScore: 8.7/10\nAccepted for publication' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 }
    },
    // Final Output
    {
      id: 'final-output',
      type: 'default',
      position: { x: 400, y: 820 },
      data: { label: 'Final Output\nHigh-quality blog post\nReady for publication' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 }
    },
    // Feedback Memory
    {
      id: 'feedback-memory',
      type: 'default',
      position: { x: 850, y: 480 },
      data: { label: '💾 Feedback Memory\nStoring critique patterns\nfor future improvements' },
      style: { ...nodeStyle, background: '#1f2937', minWidth: 180, fontSize: 11 }
    }
  ],
  initialEdges: [
    {
      id: 'e-task-producer',
      source: 'task',
      target: 'producer-agent',
      style: edgeStyle,
      animated: true
    },
    {
      id: 'e-task-critic',
      source: 'task',
      target: 'critic-agent',
      style: edgeStyle
    },
    {
      id: 'e-critic-rubric',
      source: 'critic-agent',
      target: 'evaluation-criteria',
      style: { ...edgeStyle, stroke: '#1f2937', strokeDasharray: '5,5' }
    },
    {
      id: 'e-producer-output',
      source: 'producer-agent',
      target: 'initial-output',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      label: 'Generate'
    },
    {
      id: 'e-output-critic',
      source: 'initial-output',
      target: 'critic-agent',
      style: edgeStyle,
      animated: true,
      label: 'Submit'
    },
    {
      id: 'e-critic-critique',
      source: 'critic-agent',
      target: 'critique-output',
      style: { ...edgeStyle, stroke: '#ef4444' },
      label: 'Evaluate'
    },
    {
      id: 'e-critique-decision',
      source: 'critique-output',
      target: 'refinement-decision',
      style: edgeStyle
    },
    {
      id: 'e-critique-memory',
      source: 'critique-output',
      target: 'feedback-memory',
      style: { ...edgeStyle, stroke: '#1f2937', strokeDasharray: '5,5' }
    },
    {
      id: 'e-decision-producer',
      source: 'refinement-decision',
      target: 'producer-refine',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      label: 'Refine'
    },
    {
      id: 'e-critique-producer',
      source: 'critique-output',
      target: 'producer-refine',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '5,5' },
      label: 'Feedback'
    },
    {
      id: 'e-producer-refined',
      source: 'producer-refine',
      target: 'refined-output',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },
    {
      id: 'e-refined-critic',
      source: 'refined-output',
      target: 'critic-reeval',
      style: edgeStyle,
      animated: true,
      label: 'Resubmit'
    },
    {
      id: 'e-critic-final',
      source: 'critic-reeval',
      target: 'final-critique',
      style: { ...edgeStyle, stroke: '#10b981' }
    },
    {
      id: 'e-final-memory',
      source: 'final-critique',
      target: 'feedback-memory',
      style: { ...edgeStyle, stroke: '#1f2937', strokeDasharray: '5,5' }
    },
    {
      id: 'e-final-output',
      source: 'final-critique',
      target: 'final-output',
      style: { ...edgeStyle, stroke: '#059669' },
      label: 'Approve'
    },
    {
      id: 'e-refined-final',
      source: 'refined-output',
      target: 'final-output',
      style: { ...edgeStyle, stroke: '#059669', strokeDasharray: '5,5' }
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Task Distribution',
      description: 'Task is distributed to both Producer and Critic agents with their specialized roles.',
      input: 'Task: "Write a technical blog post about microservices architecture, benefits, and best practices"\n\nRequirements:\n• 1500-2000 words\n• Include code examples\n• Cover deployment strategies',
      activeNodes: ['task', 'producer-agent', 'critic-agent'],
      activeEdges: ['e-task-producer', 'e-task-critic']
    },
    {
      id: 'step2',
      title: 'Critic Prepares Evaluation',
      description: 'Critic agent loads evaluation criteria and prepares to assess the output.',
      output: 'Evaluation Rubric Loaded:\n\n1. Technical Accuracy (0-10)\n2. Content Structure (0-10)\n3. Code Examples Quality (0-10)\n4. Best Practices Coverage (0-10)\n5. Clarity & Readability (0-10)\n\nMinimum acceptable score: 8.0/10',
      activeNodes: ['critic-agent', 'evaluation-criteria'],
      activeEdges: ['e-critic-rubric']
    },
    {
      id: 'step3',
      title: 'Producer Generates Initial Output',
      description: 'Producer agent creates the first draft of the blog post.',
      output: 'Blog Post Draft v1:\n\n"Understanding Microservices Architecture\n\nMicroservices are small, independent services that work together. Each service is self-contained and implements a single business capability.\n\nBenefits:\n• Scalability\n• Technology diversity\n• Fault isolation\n\n[Content continues...]\n\nTotal words: 1,200\nCode examples: 0\nDeployment section: Missing"',
      activeNodes: ['producer-agent', 'initial-output'],
      activeEdges: ['e-producer-output']
    },
    {
      id: 'step4',
      title: 'Submit for Critique',
      description: 'Initial output is submitted to the Critic agent for evaluation.',
      input: 'Submission to Critic:\n• Draft version: 1\n• Word count: 1,200\n• Sections: Introduction, Benefits\n• Missing: Examples, deployment, best practices',
      activeNodes: ['initial-output', 'critic-agent'],
      activeEdges: ['e-output-critic']
    },
    {
      id: 'step5',
      title: 'Critic Evaluates Output',
      description: 'Critic agent thoroughly evaluates the content against the rubric.',
      output: 'Critique Report:\n\nOverall Score: 6.5/10\n\n✓ Strengths:\n• Clear introduction\n• Good benefit explanations\n\n✗ Weaknesses:\n• No code examples (0/10)\n• Missing deployment strategies\n• Too short (1,200 < 1,500 words)\n• Lacks real-world scenarios\n\nRecommendations:\n1. Add 3-4 code examples\n2. Include Docker deployment section\n3. Add troubleshooting tips\n4. Expand to meet word count',
      activeNodes: ['critic-agent', 'critique-output', 'feedback-memory'],
      activeEdges: ['e-critic-critique', 'e-critique-memory']
    },
    {
      id: 'step6',
      title: 'Refinement Decision',
      description: 'System determines if refinement is needed based on the score.',
      output: 'Decision Logic:\n\nCurrent Score: 6.5/10\nThreshold: 8.0/10\n\n6.5 < 8.0 → Refinement Required\n\nAction: Send feedback to Producer for improvements',
      activeNodes: ['critique-output', 'refinement-decision'],
      activeEdges: ['e-critique-decision']
    },
    {
      id: 'step7',
      title: 'Producer Incorporates Feedback',
      description: 'Producer agent refines the content based on specific critique points.',
      output: 'Refinement Process:\n\n1. Adding code examples:\n   • Node.js service example\n   • Docker compose configuration\n   • API gateway setup\n\n2. New section: Deployment Strategies\n   • Kubernetes orchestration\n   • Service mesh integration\n\n3. Expanding content:\n   • Real-world case studies\n   • Troubleshooting guide\n   • Performance optimization\n\nWord count: 1,850',
      activeNodes: ['refinement-decision', 'critique-output', 'producer-refine'],
      activeEdges: ['e-decision-producer', 'e-critique-producer']
    },
    {
      id: 'step8',
      title: 'Generate Refined Output',
      description: 'Producer creates an improved version incorporating all feedback.',
      output: 'Blog Post Draft v2:\n\n"Mastering Microservices: Architecture, Implementation, and Deployment\n\n[Introduction enhanced...]\n\nCode Example - Node.js Microservice:\n```javascript\nconst express = require(\'express\');\nconst app = express();\n// Service implementation\n```\n\n[Docker deployment section added...]\n[Best practices section added...]\n\nTotal words: 1,850\nCode examples: 4\nAll sections complete"',
      activeNodes: ['producer-refine', 'refined-output'],
      activeEdges: ['e-producer-refined']
    },
    {
      id: 'step9',
      title: 'Critic Re-evaluation',
      description: 'Critic performs a second evaluation of the refined output.',
      output: 'Re-evaluation Report:\n\nOverall Score: 8.7/10\n\n✓ Improvements Made:\n• Excellent code examples (9/10)\n• Comprehensive deployment section (8/10)\n• Met word count requirement\n• Added practical scenarios\n\n✓ Quality Assessment:\n• Technical Accuracy: 9/10\n• Content Structure: 8/10\n• Code Examples: 9/10\n• Best Practices: 8/10\n• Clarity: 9/10\n\nVerdict: APPROVED for publication',
      activeNodes: ['refined-output', 'critic-reeval', 'final-critique'],
      activeEdges: ['e-refined-critic', 'e-critic-final']
    },
    {
      id: 'step10',
      title: 'Final Output Delivery',
      description: 'Approved content is finalized and ready for publication.',
      output: 'Final Blog Post:\n\n"Mastering Microservices: Architecture, Implementation, and Deployment"\n\n✅ Quality Assured\n✅ Peer Reviewed\n✅ Production Ready\n\nMetrics:\n• Quality Score: 8.7/10\n• Iterations: 2\n• Time to completion: 45 minutes\n• Feedback items addressed: 4/4\n\nLearnings stored for future improvements:\n• Always include code examples\n• Check word count requirements\n• Cover deployment strategies',
      activeNodes: ['final-critique', 'final-output', 'feedback-memory'],
      activeEdges: ['e-final-output', 'e-refined-final', 'e-final-memory']
    }
  ]
};