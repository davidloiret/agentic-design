import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const chainOfDebatesPattern: PatternScenario = {
  id: 'cod',
  title: 'Chain of Debates (CoD) Reasoning',
  description: `A collaborative AI reasoning technique where multiple perspectives engage in structured debate to reach well-reasoned conclusions through dialectical discourse, peer review, and collective intelligence synthesis.

Chain of Debates (CoD) transforms single-model reasoning into a multi-perspective collaborative process. Instead of relying on one AI's perspective, CoD orchestrates multiple viewpoints to debate, challenge, and refine ideas through structured argumentation.

**Core Principles:**
• **Multi-Perspective Analysis**: Multiple agents present different viewpoints and arguments
• **Dialectical Reasoning**: Structured debate with thesis, antithesis, and synthesis
• **Peer Review Mechanism**: Each perspective is challenged and validated by others
• **Collective Intelligence**: Final conclusions emerge from collaborative reasoning
• **Bias Reduction**: Individual model biases are balanced through diverse perspectives

**Why CoD Matters:**
This approach mirrors human collaborative decision-making processes like academic peer review, legal debates, and scientific discourse. It addresses the limitations of single-model reasoning by leveraging diverse perspectives and reducing individual biases through structured argumentation.

**Key Applications:**
- Strategic business decision making and policy analysis
- Complex ethical dilemmas requiring multiple viewpoints
- Technical architecture decisions with trade-offs
- Research analysis and literature review
- Legal case analysis and argument construction
- Product design decisions with stakeholder perspectives`,

  initialNodes: [
    // Input stage
    {
      id: 'problem',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { label: 'Complex Problem\n"Should we adopt microservices?"' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 200, fontSize: '14px', fontWeight: 'bold' }
    },
    
    // Debater agents
    {
      id: 'advocate',
      type: 'default',
      position: { x: 150, y: 200 },
      data: { label: 'Advocate\n(Pro-Microservices)' },
      style: { ...nodeStyle, background: '#059669', minWidth: 160 }
    },
    {
      id: 'skeptic',
      type: 'default',
      position: { x: 400, y: 200 },
      data: { label: 'Skeptic\n(Anti-Microservices)' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 160 }
    },
    {
      id: 'analyst',
      type: 'default',
      position: { x: 650, y: 200 },
      data: { label: 'Analyst\n(Context-Dependent)' },
      style: { ...nodeStyle, background: '#7c2d12', minWidth: 160 }
    },
    
    // Argument collection
    {
      id: 'arguments',
      type: 'default', 
      position: { x: 400, y: 350 },
      data: { label: 'Argument\nCollection' },
      style: { ...nodeStyle, background: '#1f2937', minWidth: 140 }
    },
    
    // Debate rounds
    {
      id: 'round1',
      type: 'default',
      position: { x: 200, y: 500 },
      data: { label: 'Round 1\nInitial Arguments' },
      style: { ...nodeStyle, background: '#374151', minWidth: 140 }
    },
    {
      id: 'round2', 
      type: 'default',
      position: { x: 400, y: 500 },
      data: { label: 'Round 2\nCounterarguments' },
      style: { ...nodeStyle, background: '#374151', minWidth: 140 }
    },
    {
      id: 'round3',
      type: 'default',
      position: { x: 600, y: 500 },
      data: { label: 'Round 3\nRefinement' },
      style: { ...nodeStyle, background: '#374151', minWidth: 140 }
    },
    
    // Synthesis and conclusion
    {
      id: 'moderator',
      type: 'default',
      position: { x: 400, y: 650 },
      data: { label: 'Moderator\n(Synthesis)' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 140 }
    },
    {
      id: 'consensus',
      type: 'default',
      position: { x: 400, y: 800 },
      data: { label: 'Consensus\nDecision' },
      style: { ...nodeStyle, background: '#059669', minWidth: 140 }
    }
  ],

  initialEdges: [
    // Problem to debaters
    {
      id: 'e-problem-advocate',
      source: 'problem',
      target: 'advocate',
      style: edgeStyle
    },
    {
      id: 'e-problem-skeptic',
      source: 'problem',
      target: 'skeptic',
      style: edgeStyle
    },
    {
      id: 'e-problem-analyst',
      source: 'problem',
      target: 'analyst',
      style: edgeStyle
    },
    
    // Debaters to arguments
    {
      id: 'e-advocate-args',
      source: 'advocate',
      target: 'arguments',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-skeptic-args',
      source: 'skeptic',
      target: 'arguments',
      style: { ...edgeStyle, stroke: '#dc2626' }
    },
    {
      id: 'e-analyst-args',
      source: 'analyst',
      target: 'arguments',
      style: { ...edgeStyle, stroke: '#7c2d12' }
    },
    
    // Arguments to debate rounds
    {
      id: 'e-args-round1',
      source: 'arguments',
      target: 'round1',
      style: edgeStyle
    },
    {
      id: 'e-round1-round2',
      source: 'round1',
      target: 'round2',
      style: edgeStyle
    },
    {
      id: 'e-round2-round3',
      source: 'round2',
      target: 'round3',
      style: edgeStyle
    },
    
    // Rounds to moderator
    {
      id: 'e-round1-mod',
      source: 'round1',
      target: 'moderator',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-round2-mod',
      source: 'round2',
      target: 'moderator',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-round3-mod',
      source: 'round3',
      target: 'moderator',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    
    // Moderator to consensus
    {
      id: 'e-mod-consensus',
      source: 'moderator',
      target: 'consensus',
      style: { ...edgeStyle, stroke: '#059669' }
    }
  ],

  steps: [
    {
      id: 'step1',
      title: 'Problem Presentation',
      description: 'A complex problem requiring multiple perspectives is presented to the debate system.',
      input: 'Complex problem: "Should our startup adopt microservices architecture?"',
      activeNodes: ['problem'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Perspective Assignment',
      description: 'Different AI agents are assigned specific perspectives to argue from.',
      input: 'Assign perspectives: Pro-microservices (Advocate), Anti-microservices (Skeptic), Context-dependent (Analyst)',
      activeNodes: ['problem', 'advocate', 'skeptic', 'analyst'],
      activeEdges: ['e-problem-advocate', 'e-problem-skeptic', 'e-problem-analyst']
    },
    {
      id: 'step3',
      title: 'Initial Arguments',
      description: 'Each perspective presents their initial arguments and reasoning.',
      input: 'Advocate: "Microservices enable scaling, independent deployment, technology diversity..."\nSkeptic: "Complex for startups, operational overhead, distributed system challenges..."\nAnalyst: "Depends on team size, growth rate, technical debt tolerance..."',
      activeNodes: ['advocate', 'skeptic', 'analyst', 'arguments', 'round1'],
      activeEdges: ['e-advocate-args', 'e-skeptic-args', 'e-analyst-args', 'e-args-round1']
    },
    {
      id: 'step4',
      title: 'Cross-Examination',
      description: 'Each perspective challenges the others\' arguments with counterpoints.',
      input: 'Advocate counters: "Startup complexity is temporary, scaling benefits are permanent..."\nSkeptic counters: "Most startups fail before scaling becomes relevant..."\nAnalyst adds: "Consider gradual migration strategies..."',
      activeNodes: ['round1', 'round2'],
      activeEdges: ['e-round1-round2']
    },
    {
      id: 'step5',
      title: 'Argument Refinement',
      description: 'Perspectives refine their positions based on the debate.',
      input: 'Refined positions with acknowledged trade-offs and conditions for each approach.',
      activeNodes: ['round2', 'round3'],
      activeEdges: ['e-round2-round3']
    },
    {
      id: 'step6',
      title: 'Synthesis & Moderation',
      description: 'A moderator synthesizes the debate into a balanced conclusion.',
      input: 'Moderator analyzes all arguments and identifies key decision factors.',
      activeNodes: ['round1', 'round2', 'round3', 'moderator'],
      activeEdges: ['e-round1-mod', 'e-round2-mod', 'e-round3-mod']
    },
    {
      id: 'step7',
      title: 'Consensus Decision',
      description: 'Final recommendation based on the complete debate analysis.',
      input: 'Final decision: "For teams <10: Monolithic. For rapid scaling: Microservices. For uncertain growth: Hybrid approach with migration plan."',
      activeNodes: ['moderator', 'consensus'],
      activeEdges: ['e-mod-consensus']
    }
  ]
}; 