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

export const getAllPatternIds = (): string[] => {
  return Object.keys(patternConfigurations);
};

export const getPatternPrompt = (patternId: string, userInput: string): string => {
  const config = getPatternConfig(patternId);
  if (!config) return userInput;
  
  const systemPrompt = config.systemPrompt;
  const userPrompt = config.userPromptTemplate.replace('{input}', userInput);
  
  return `${systemPrompt}\n\n${userPrompt}`;
};