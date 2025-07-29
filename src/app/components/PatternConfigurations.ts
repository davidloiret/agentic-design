export interface PatternConfig {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  userPromptTemplate: string;
  outputStructure: string[];
  expectedBehavior: string;
  examples: {
    input: string;
    expectedOutput: string;
  }[];
}

// Extended interface for multi-step patterns
export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  promptTemplate: string;
  inputMapping: string[]; // Which previous steps to use as input
  outputFormat: 'text' | 'json' | 'structured';
  position?: { x: number; y: number }; // For visual editor
}

export interface WorkflowPattern extends Omit<PatternConfig, 'systemPrompt' | 'userPromptTemplate'> {
  type: 'workflow';
  steps: WorkflowStep[];
  connections: Array<{ from: string; to: string }>;
  finalOutputStep: string;
  systemPrompt?: string; // Optional fallback
  userPromptTemplate?: string; // Optional fallback
}

export interface StepExecution {
  stepId: string;
  input: string;
  output: string;
  timestamp: number;
  tokensUsed: number;
  responseTime: number;
}

export interface WorkflowExecution {
  id: string;
  patternId: string;
  modelId: string;
  originalInput: string;
  steps: StepExecution[];
  finalOutput: string;
  totalTime: number;
  totalTokens: number;
  totalCost: number;
}

export const patternConfigurations: Record<string, PatternConfig> = {
  'cot': {
    id: 'cot',
    name: 'Chain of Thought',
    description: 'Step-by-step reasoning that shows the logical progression of thoughts',
    systemPrompt: `You are an expert problem solver who thinks step by step. For every problem:
1. Break down the problem into clear, logical steps
2. Show your reasoning at each step
3. Build upon previous steps to reach the final answer
4. Use "Step N:" format for each reasoning step`,
    userPromptTemplate: `Problem: {input}

Please solve this step by step, showing your reasoning process clearly.`,
    outputStructure: [
      'Problem analysis',
      'Step-by-step reasoning',
      'Final answer with justification'
    ],
    expectedBehavior: 'Sequential logical reasoning with clear step progression',
    examples: [
      {
        input: 'If a train travels 120 miles in 2 hours, then 180 miles in 3 hours, what is its average speed?',
        expectedOutput: `Step 1: Identify what we need to find
We need to calculate the average speed for the entire journey.

Step 2: Identify the given information
- First segment: 120 miles in 2 hours
- Second segment: 180 miles in 3 hours

Step 3: Calculate total distance
Total distance = 120 miles + 180 miles = 300 miles

Step 4: Calculate total time
Total time = 2 hours + 3 hours = 5 hours

Step 5: Apply the average speed formula
Average speed = Total distance ÷ Total time
Average speed = 300 miles ÷ 5 hours = 60 mph

Therefore, the average speed is 60 miles per hour.`
      }
    ]
  },

  'tot': {
    id: 'tot',
    name: 'Tree of Thought',
    description: 'Explores multiple reasoning paths and evaluates different approaches',
    systemPrompt: `You are an expert problem solver who explores multiple solution paths. For every problem:
1. Generate several different approaches (branches)
2. Evaluate each approach's viability
3. Follow the most promising path while noting alternatives
4. Use tree-like structure: "Branch A:", "Branch B:", etc.
5. Include evaluation: "Evaluation:" after each branch`,
    userPromptTemplate: `Problem: {input}

Explore multiple solution approaches and select the best path to solve this problem.`,
    outputStructure: [
      'Problem analysis',
      'Multiple solution branches',
      'Branch evaluations',
      'Selected optimal path',
      'Final solution'
    ],
    expectedBehavior: 'Multiple parallel reasoning paths with evaluation and selection',
    examples: [
      {
        input: 'How can we reduce energy consumption in a smart home?',
        expectedOutput: `Branch A: Smart Device Automation
- Install smart thermostats with learning algorithms
- Use motion sensors for automatic lighting
- Smart power strips to eliminate phantom loads
Evaluation: High impact, moderate cost, good ROI

Branch B: Renewable Energy Integration
- Solar panels with battery storage
- Smart grid integration for peak shaving
- Energy monitoring dashboard
Evaluation: Very high impact, high upfront cost, long-term savings

Branch C: Behavioral Modification
- Real-time energy feedback displays
- Gamification of energy saving
- Automated suggestions based on usage patterns
Evaluation: Moderate impact, low cost, depends on user engagement

Selected Path: Hybrid approach combining Branch A and C
1. Start with smart device automation (immediate impact)
2. Add behavioral feedback systems
3. Plan for renewable integration in phase 2

This provides immediate benefits while building toward comprehensive energy optimization.`
      }
    ]
  },

  'react': {
    id: 'react',
    name: 'ReAct (Reasoning + Acting)',
    description: 'Combines reasoning and action-taking in an iterative process',
    systemPrompt: `You are an agent that combines reasoning with actions. For every problem:
1. Use "Thought:" to show your reasoning
2. Use "Action:" to describe what you would do
3. Use "Observation:" to note results or new information
4. Iterate this cycle until reaching a conclusion
5. End with "Final Answer:" based on your reasoning and observations`,
    userPromptTemplate: `Task: {input}

Use the ReAct framework (Thought, Action, Observation) to work through this systematically.`,
    outputStructure: [
      'Initial thought',
      'Planned actions',
      'Observations from actions',
      'Iterative reasoning cycles',
      'Final answer'
    ],
    expectedBehavior: 'Alternating between thinking and acting with observable feedback loops',
    examples: [
      {
        input: 'Find the best restaurant for a business dinner in downtown Seattle',
        expectedOutput: `Thought: I need to find a restaurant suitable for business dining in downtown Seattle. This means I should look for places that are upscale, have good reviews, appropriate ambiance, and can accommodate business conversations.

Action: Search for highly-rated upscale restaurants in downtown Seattle with good business dining atmosphere.

Observation: Several restaurants come up: The Metropolitan Grill, Canlis, Wild Ginger, and Salty's on Alki. I need to evaluate them based on location, atmosphere, and business suitability.

Thought: The Metropolitan Grill appears frequently in "best business dining" lists and is located in the heart of downtown. Let me check its specific features.

Action: Analyze The Metropolitan Grill's attributes - location, ambiance, private dining options, and business amenities.

Observation: The Metropolitan Grill is located on 2nd Avenue, has a classic steakhouse atmosphere perfect for business, offers private dining rooms, and has a reputation for excellent service and quiet enough environment for conversations.

Thought: This seems like a strong choice, but I should also consider Wild Ginger as an alternative since it offers excellent Pan-Asian cuisine and might provide a more unique experience.

Action: Compare both options for business dining suitability.

Observation: Both are excellent, but The Metropolitan Grill has a more traditional business dining atmosphere and better downtown accessibility.

Final Answer: The Metropolitan Grill on 2nd Avenue is the best choice for a business dinner in downtown Seattle due to its prime location, upscale steakhouse atmosphere conducive to business conversations, excellent service reputation, and private dining options.`
      }
    ]
  },

  'self-critique': {
    id: 'self-critique',
    name: 'Self-Critique',
    description: 'Generates initial response then critically evaluates and refines it',
    systemPrompt: `You are a meticulous problem solver who always double-checks your work. For every problem:
1. Provide an initial answer
2. Critically evaluate your answer with "Critique:"
3. Check for errors, gaps, or improvements
4. Provide a refined final answer
5. Rate your confidence level (1-10)`,
    userPromptTemplate: `Problem: {input}

Solve this problem, then critique your own solution and provide a refined answer.`,
    outputStructure: [
      'Initial solution attempt',
      'Self-critique and evaluation',
      'Identified improvements',
      'Refined final answer',
      'Confidence assessment'
    ],
    expectedBehavior: 'Initial response followed by critical self-evaluation and refinement',
    examples: [
      {
        input: 'Calculate the compound interest on $10,000 invested at 5% annually for 10 years',
        expectedOutput: `Initial Answer:
Using the compound interest formula A = P(1 + r)^t
A = 10,000(1 + 0.05)^10
A = 10,000(1.05)^10
A = 10,000 × 1.629
A = $16,290
Compound interest = $16,290 - $10,000 = $6,290

Critique:
Let me verify this calculation step by step:
- Formula is correct: A = P(1 + r)^t
- Principal (P) = $10,000 ✓
- Rate (r) = 5% = 0.05 ✓
- Time (t) = 10 years ✓
- Calculation: (1.05)^10 = 1.6288946... 

I should be more precise with the decimal places and provide the exact calculation.

Refined Final Answer:
A = 10,000(1.05)^10
A = 10,000 × 1.6288946267
A = $16,288.95 (rounded to nearest cent)
Compound interest = $16,288.95 - $10,000 = $6,288.95

The compound interest earned is $6,288.95.

Confidence Level: 9/10 (very confident in the mathematical accuracy)`
      }
    ]
  },

  'analogical': {
    id: 'analogical',
    name: 'Analogical Reasoning',
    description: 'Uses analogies and comparisons to solve problems and explain concepts',
    systemPrompt: `You are an expert at using analogies to solve problems and explain concepts. For every problem:
1. Identify a relevant analogy or similar situation
2. Map the problem elements to the analogy
3. Solve using the analogical framework
4. Verify the solution applies back to the original problem
5. Use "Like:" to introduce analogies`,
    userPromptTemplate: `Problem: {input}

Use analogical reasoning to solve this problem by finding relevant analogies or comparisons.`,
    outputStructure: [
      'Problem analysis',
      'Relevant analogy identification',
      'Mapping between problem and analogy',
      'Solution via analogy',
      'Verification and application'
    ],
    expectedBehavior: 'Problem-solving through analogical mapping and comparison',
    examples: [
      {
        input: 'How should a startup manage rapid growth without losing company culture?',
        expectedOutput: `Like: Managing rapid startup growth is like tending a garden that's growing faster than expected.

Analogy Mapping:
- Startup = Garden
- Company culture = Soil quality and ecosystem
- Rapid growth = Plants growing quickly
- New employees = New plants being added
- Management processes = Gardening tools and techniques

Solution via Analogy:
Just as a gardener must:
1. Maintain soil quality while expanding (preserve core values during hiring)
2. Provide proper support structures (create scalable processes)
3. Ensure adequate spacing (don't overcrowd teams)
4. Regular pruning and maintenance (continuous culture reinforcement)
5. Protect the ecosystem balance (maintain communication and relationships)

Applied Solution:
1. Document and actively teach core values to all new hires
2. Create culture ambassadors/mentors for new team members
3. Implement regular culture check-ins and feedback sessions
4. Scale processes gradually rather than reactive restructuring
5. Maintain regular all-hands meetings and team bonding activities
6. Hire for cultural fit alongside skills

Like maintaining a healthy garden ecosystem during rapid growth, the key is intentional nurturing while scaling - you can't just let it grow wild and expect the original character to remain intact.`
      }
    ]
  },

  'meta-cognitive': {
    id: 'meta-cognitive',
    name: 'Meta-Cognitive',
    description: 'Thinks about thinking - monitors and controls the reasoning process',
    systemPrompt: `You are a meta-cognitive problem solver who thinks about your own thinking process. For every problem:
1. Plan your approach with "Strategy:"
2. Monitor your progress with "Progress Check:"
3. Adjust your method if needed with "Adjustment:"
4. Reflect on your reasoning quality
5. Use "Meta-Reflection:" to analyze your own problem-solving process`,
    userPromptTemplate: `Problem: {input}

Solve this using meta-cognitive strategies - plan your approach, monitor your progress, and reflect on your reasoning process.`,
    outputStructure: [
      'Strategic planning',
      'Progress monitoring',
      'Method adjustments',
      'Solution development',
      'Meta-reflection on process'
    ],
    expectedBehavior: 'Explicit monitoring and control of the reasoning process itself',
    examples: [
      {
        input: 'Design a study plan for learning machine learning in 6 months',
        expectedOutput: `Strategy: I'll approach this by first assessing what needs to be learned, then structuring a timeline with milestones, and finally building in feedback mechanisms for adjustment.

Initial Analysis:
Machine learning requires: math foundations, programming skills, theory understanding, and practical application.

Progress Check: Am I considering the right scope? Let me ensure I'm not missing key areas.
- Mathematics: Linear algebra, statistics, calculus ✓
- Programming: Python, relevant libraries ✓
- Theory: Supervised/unsupervised learning, neural networks ✓
- Practice: Projects and real datasets ✓
- Missing: MLOps, deployment considerations

Adjustment: I should include practical deployment and model management aspects.

Month-by-Month Plan:
Month 1-2: Math foundations and Python basics
Month 3: Core ML algorithms and theory
Month 4: Deep learning and neural networks
Month 5: Hands-on projects and advanced topics
Month 6: MLOps, deployment, and portfolio development

Progress Check: Is this timeline realistic? 6 months is ambitious but achievable with 15-20 hours/week commitment.

Adjustment: I should build in review weeks and flexibility for slower/faster progress.

Meta-Reflection: My approach was systematic - I planned, monitored for gaps, and adjusted accordingly. I noticed I initially focused too heavily on theory and needed to balance with practical applications. The meta-cognitive approach helped me catch the missing MLOps component and reconsider timeline realism. This recursive self-monitoring improved the final plan quality.`
      }
    ]
  }
};

export const getPatternConfig = (patternId: string): PatternConfig | null => {
  return patternConfigurations[patternId] || null;
};

// Multi-step workflow patterns
export const workflowPatterns: Record<string, WorkflowPattern> = {
  'graph-of-thought': {
    id: 'graph-of-thought',
    name: 'Graph of Thought',
    description: 'Multi-dimensional reasoning with exploration, evaluation, and synthesis phases',
    type: 'workflow',
    outputStructure: [
      'Initial problem decomposition',
      'Multi-path exploration',
      'Cross-path evaluation and connection',
      'Synthesis and integration',
      'Final comprehensive solution'
    ],
    expectedBehavior: 'Non-linear reasoning that explores multiple dimensions and synthesizes insights',
    steps: [
      {
        id: 'decompose',
        name: 'Problem Decomposition',
        description: 'Break down the problem into multiple aspects and dimensions',
        promptTemplate: `Analyze the following problem and decompose it into key aspects, dimensions, and sub-problems that need to be explored:

Problem: {input}

Identify:
1. Core components of the problem
2. Different perspectives or angles to consider
3. Potential sub-problems or related questions
4. Key constraints and requirements
5. Success criteria

Format your response as a structured breakdown that will guide further exploration.`,
        inputMapping: ['input'],
        outputFormat: 'structured'
      },
      {
        id: 'explore_paths',
        name: 'Multi-Path Exploration',
        description: 'Explore different solution paths for each aspect identified',
        promptTemplate: `Based on the problem decomposition below, explore multiple solution paths for each aspect. Generate diverse approaches and reasoning chains:

Problem Decomposition:
{decompose}

For each aspect identified, explore 2-3 different solution approaches. Be creative and consider:
- Traditional/conventional approaches
- Innovative/unconventional approaches  
- Hybrid approaches combining different methods
- Edge cases and alternative perspectives

Format as: "Aspect X: [aspect name]" followed by "Path A:", "Path B:", etc.`,
        inputMapping: ['decompose'],
        outputFormat: 'structured'
      },
      {
        id: 'evaluate_connections',
        name: 'Cross-Path Evaluation',
        description: 'Evaluate paths and identify connections between different approaches',
        promptTemplate: `Analyze the exploration paths below and evaluate their effectiveness. Also identify connections, synergies, and conflicts between different paths:

Multi-Path Exploration:
{explore_paths}

Provide:
1. Evaluation of each path (strengths, weaknesses, feasibility)
2. Connections between paths (which ones complement each other?)
3. Conflicts or contradictions between approaches
4. Emerging patterns or themes across paths
5. Most promising combinations or integrations

Rate each path's potential (1-10) and explain your reasoning.`,
        inputMapping: ['explore_paths'],
        outputFormat: 'structured'
      },
      {
        id: 'synthesize',
        name: 'Synthesis & Integration',
        description: 'Synthesize insights from all paths into a comprehensive solution',
        promptTemplate: `Using all the analysis above, synthesize a comprehensive solution that integrates the best elements from different paths:

Original Problem: {input}

Problem Decomposition: {decompose}

Path Exploration: {explore_paths}

Path Evaluation: {evaluate_connections}

Create a final integrated solution that:
1. Addresses all key aspects of the original problem
2. Combines the strongest elements from different paths
3. Resolves or acknowledges any conflicts identified
4. Provides concrete, actionable recommendations
5. Includes implementation considerations and potential challenges

Present this as a cohesive, comprehensive solution strategy.`,
        inputMapping: ['input', 'decompose', 'explore_paths', 'evaluate_connections'],
        outputFormat: 'text'
      }
    ],
    connections: [
      { from: 'input', to: 'decompose' },
      { from: 'decompose', to: 'explore_paths' },
      { from: 'explore_paths', to: 'evaluate_connections' },
      { from: 'input', to: 'synthesize' },
      { from: 'decompose', to: 'synthesize' },
      { from: 'explore_paths', to: 'synthesize' },
      { from: 'evaluate_connections', to: 'synthesize' }
    ],
    finalOutputStep: 'synthesize',
    examples: [
      {
        input: 'How can we design a sustainable urban transportation system for a city of 2 million people?',
        expectedOutput: `[This would show the complete multi-step workflow output with each step's results leading to a comprehensive integrated solution]`
      }
    ]
  },

  'multi-agent-debate': {
    id: 'multi-agent-debate',
    name: 'Multi-Agent Debate',
    description: 'Multiple AI agents with different perspectives debate a problem to reach consensus',
    type: 'workflow',
    outputStructure: [
      'Problem framing and agent role assignment',
      'Initial position statements from each agent',
      'Debate rounds with rebuttals and counterarguments',
      'Consensus building and compromise identification',
      'Final synthesized solution'
    ],
    expectedBehavior: 'Adversarial reasoning leading to robust, well-tested solutions',
    steps: [
      {
        id: 'assign_roles',
        name: 'Agent Role Assignment',
        description: 'Define different agent perspectives and roles for the debate',
        promptTemplate: `For the following problem, define 3-4 different agent roles that would bring diverse perspectives to the debate:

Problem: {input}

Create agents with different:
- Professional backgrounds/expertise
- Philosophical approaches
- Stakeholder interests
- Risk tolerances
- Time horizons

For each agent, provide:
1. Role name and title
2. Background and expertise
3. Key concerns and priorities
4. Likely stance on the problem
5. Potential biases or blind spots

Format as "Agent X: [Role Name]" with detailed descriptions.`,
        inputMapping: ['input'],
        outputFormat: 'structured'
      },
      {
        id: 'initial_positions',
        name: 'Initial Position Statements',
        description: 'Each agent presents their initial position on the problem',
        promptTemplate: `Based on the agent roles defined below, present each agent's initial position on the problem:

Problem: {input}
Agent Roles: {assign_roles}

For each agent, provide their initial position including:
1. Problem analysis from their perspective
2. Proposed solution approach
3. Key priorities and concerns
4. Anticipated challenges or objections
5. Success metrics from their viewpoint

Each position should be substantive (2-3 paragraphs) and reflect their unique perspective.`,
        inputMapping: ['input', 'assign_roles'],
        outputFormat: 'structured'
      },
      {
        id: 'debate_rounds',
        name: 'Debate Rounds',
        description: 'Agents debate, challenge each other, and refine their positions',
        promptTemplate: `Conduct 2-3 rounds of debate between the agents based on their initial positions:

Problem: {input}
Initial Positions: {initial_positions}

Round 1: Each agent critiques others' positions and defends their own
Round 2: Agents address criticisms and identify areas of potential agreement
Round 3: Agents work toward compromise and integration of ideas

For each round, show:
- Agent responses and rebuttals  
- Evolution of positions
- Emerging points of agreement
- Remaining disagreements
- New insights or considerations raised

Maintain each agent's unique voice and perspective throughout.`,
        inputMapping: ['input', 'initial_positions'],
        outputFormat: 'structured'
      },
      {
        id: 'consensus_solution',
        name: 'Consensus Solution',
        description: 'Synthesize the debate into a final consensus solution',
        promptTemplate: `Based on the full debate process, synthesize a consensus solution:

Original Problem: {input}
Agent Roles: {assign_roles}
Initial Positions: {initial_positions}
Debate Process: {debate_rounds}

Create a final solution that:
1. Incorporates the strongest arguments from each agent
2. Addresses the main concerns raised by all parties
3. Provides compromises where positions conflicted
4. Acknowledges remaining uncertainties or trade-offs
5. Includes implementation recommendations that consider all perspectives

Present this as a well-reasoned, balanced solution that reflects the collective wisdom of the debate process.`,
        inputMapping: ['input', 'assign_roles', 'initial_positions', 'debate_rounds'],
        outputFormat: 'text'
      }
    ],
    connections: [
      { from: 'input', to: 'assign_roles' },
      { from: 'input', to: 'initial_positions' },
      { from: 'assign_roles', to: 'initial_positions' },
      { from: 'input', to: 'debate_rounds' },
      { from: 'initial_positions', to: 'debate_rounds' },
      { from: 'input', to: 'consensus_solution' },
      { from: 'assign_roles', to: 'consensus_solution' },
      { from: 'initial_positions', to: 'consensus_solution' },
      { from: 'debate_rounds', to: 'consensus_solution' }
    ],
    finalOutputStep: 'consensus_solution',
    examples: [
      {
        input: 'Should AI systems be required to explain their decision-making processes?',
        expectedOutput: `[Multi-step debate process with different agents arguing from technical, ethical, regulatory, and user perspectives]`
      }
    ]
  }
};

export const getAllPatternIds = (): string[] => {
  return [...Object.keys(patternConfigurations), ...Object.keys(workflowPatterns)];
};

// Utility functions for workflow patterns
export const getWorkflowPattern = (patternId: string): WorkflowPattern | null => {
  return workflowPatterns[patternId] || null;
};

export const isWorkflowPattern = (patternId: string): boolean => {
  return patternId in workflowPatterns;
};

export const getPatternPrompt = (patternId: string, userInput: string): string => {
  const config = getPatternConfig(patternId);
  if (!config) return userInput;
  
  const systemPrompt = config.systemPrompt;
  const userPrompt = config.userPromptTemplate.replace('{input}', userInput);
  
  return `${systemPrompt}\n\n${userPrompt}`;
};

// Get step-specific prompt for workflow patterns
export const getWorkflowStepPrompt = (
  patternId: string, 
  stepId: string, 
  inputs: Record<string, string>
): string => {
  const workflow = getWorkflowPattern(patternId);
  if (!workflow) return '';
  
  const step = workflow.steps.find(s => s.id === stepId);
  if (!step) return '';
  
  let prompt = step.promptTemplate;
  
  // Replace all input placeholders
  step.inputMapping.forEach(inputKey => {
    const inputValue = inputs[inputKey] || '';
    prompt = prompt.replace(new RegExp(`{${inputKey}}`, 'g'), inputValue);
  });
  
  return prompt;
};

// Get pattern configuration (handles both simple and workflow patterns)
export const getAnyPatternConfig = (patternId: string): PatternConfig | WorkflowPattern | null => {
  return getPatternConfig(patternId) || getWorkflowPattern(patternId);
};