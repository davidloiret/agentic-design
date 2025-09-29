import { TheoryLesson } from '../../learning-content';

export const chainOfThoughtLesson: TheoryLesson = {
  id: 'chain-of-thought',
  title: 'Chain of Thought: Teaching AI to Think Step by Step',
  description: 'Master Chain of Thought prompting to dramatically improve reasoning accuracy on complex problems',
  estimatedTime: 30,
  difficulty: 'intermediate',
  xpReward: 120,
  content: {
    introduction: `
Chain of Thought (CoT) prompting revolutionized how we interact with language models by making their reasoning process explicit and transparent. Instead of jumping directly to an answer, CoT guides models through intermediate reasoning steps, similar to how humans work through complex problems on paper.

This technique has shown remarkable improvements in mathematical reasoning, logical deduction, common sense reasoning, and complex problem-solving—often improving accuracy by 10-40% on challenging tasks that require multi-step thinking.
    `,

    sections: [
      {
        title: 'The Science Behind Chain of Thought',
        content: `
Chain of Thought works by activating the model's latent reasoning capabilities through explicit verbalization of intermediate steps. This approach addresses several fundamental challenges in AI reasoning:

**The Hidden Reasoning Problem**
Without CoT, models perform reasoning "in their heads"—computing answers through implicit neural activations. This black-box approach often leads to errors that compound invisibly.

**The Working Memory Advantage**
By externalizing reasoning steps as text, CoT effectively extends the model's working memory. Each step becomes a checkpoint that the model can reference, reducing cognitive load and improving accuracy.

**Error Localization**
When reasoning is explicit, errors become visible and can be traced to specific steps. This transparency enables debugging, verification, and iterative improvement.

**Attention Mechanism Optimization**
Writing out steps helps the model's attention mechanism focus on relevant information at each stage, rather than trying to process everything simultaneously.
        `
      },
      {
        title: 'Core Components of CoT Prompting',
        content: `
Effective Chain of Thought prompts share several key characteristics:

**1. Step Indicators**
Use clear markers to delineate reasoning steps:
- "Step 1:", "Step 2:", etc.
- "First,", "Next,", "Then,", "Finally,"
- "Let's break this down:", "Let's think through this:"

**2. Intermediate Calculations**
Show all work, even trivial calculations:
\`\`\`
Question: If a store has 156 apples and sells 89, how many remain?

Let's solve step by step:
Step 1: Identify initial amount = 156 apples
Step 2: Identify amount sold = 89 apples
Step 3: Calculate remaining = 156 - 89 = 67 apples
Therefore, 67 apples remain.
\`\`\`

**3. Reasoning Justification**
Explain WHY each step is taken:
\`\`\`
Question: Is this argument valid? "All birds can fly. Penguins are birds. Therefore, penguins can fly."

Let's analyze the logical structure:
Step 1: Identify the premise - "All birds can fly" (universal statement)
Step 2: Check if premise is true - This is FALSE, as some birds cannot fly
Step 3: Even with valid logic structure (syllogism), false premise leads to false conclusion
Step 4: The argument is logically valid in form but unsound due to false premise
Conclusion: The argument is invalid because the first premise is factually incorrect.
\`\`\`

**4. Progressive Refinement**
Build understanding gradually:
- Start with simple observations
- Add complexity progressively
- Synthesize at the end
        `
      },
      {
        title: 'CoT Prompting Strategies',
        content: `
**Zero-Shot CoT**
The simplest approach - just add "Let's think step by step":
\`\`\`
Q: A zoo has 15 zebras. They buy 7 more zebras, then 1/3 of the zebras are moved to another zoo. How many zebras remain?

A: Let's think step by step.
[Model generates reasoning steps]
\`\`\`

**Few-Shot CoT**
Provide examples with explicit reasoning:
\`\`\`
Q: Jack has 5 apples. He buys 3 more, then gives 2 to Jill. How many does Jack have?
A: Let's work through this:
- Jack starts with 5 apples
- He buys 3 more: 5 + 3 = 8 apples
- He gives 2 to Jill: 8 - 2 = 6 apples
Jack has 6 apples.

Q: [New question]
A: Let's work through this:
[Model follows the pattern]
\`\`\`

**Prompted CoT with Structure**
Provide explicit structure for reasoning:
\`\`\`
Solve this problem using the following structure:
1. Identify given information
2. Determine what we're solving for
3. Choose appropriate method/formula
4. Execute calculations step by step
5. Verify the answer makes sense
6. State final answer clearly
\`\`\`

**Self-Ask CoT**
Model asks itself clarifying questions:
\`\`\`
Q: Would a typical US president have been alive during the construction of the pyramids?

A: Let me ask myself relevant questions:
- When were the pyramids built? Around 2500-2000 BCE
- How long do humans typically live? 70-80 years, rarely over 100
- When did the US exist? Founded in 1776 CE
- Time gap? About 4000+ years
No, impossible given human lifespan and historical timeline.
\`\`\`
        `
      },
      {
        title: 'Advanced CoT Techniques',
        content: `
**Tree of Thought (ToT)**
Explore multiple reasoning paths:
\`\`\`
Problem: Find the optimal move in this position...

Thought 1: Attack the king directly
- Evaluate: Leads to checkmate in 3 moves
- Probability: 60% if opponent doesn't see threat

Thought 2: Secure positional advantage
- Evaluate: Slower but more certain victory
- Probability: 85% success rate

Thought 3: Trade pieces for endgame
- Evaluate: Simplifies to winning endgame
- Probability: 90% but takes longer

Best path: Thought 3 for highest certainty
\`\`\`

**Self-Consistency with CoT**
Generate multiple reasoning chains and vote:
\`\`\`python
def self_consistent_cot(question, num_samples=5):
    reasonings = []
    answers = []

    for _ in range(num_samples):
        reasoning = generate_cot(question, temperature=0.7)
        answer = extract_answer(reasoning)
        reasonings.append(reasoning)
        answers.append(answer)

    # Majority vote on final answers
    final_answer = most_common(answers)
    confidence = answers.count(final_answer) / num_samples

    return final_answer, confidence, reasonings
\`\`\`

**Least-to-Most Prompting**
Decompose complex problems into simpler subproblems:
\`\`\`
Complex Problem: Calculate compound interest for irregular deposits

Decomposition:
1. First, let's understand simple interest
2. Then, compound interest with regular deposits
3. Finally, handle irregular deposit schedule

Subproblem 1: Simple interest on $1000 at 5% for 1 year
Solution: Interest = 1000 × 0.05 × 1 = $50

Subproblem 2: Compound interest, monthly deposits...
[Continue building up]
\`\`\`

**Chain of Verification (CoVe)**
Add verification steps to check reasoning:
\`\`\`
Step 1: Calculate total cost = $45.50 × 3 = $136.50
Verification: Is $136.50 reasonable for 3 items at ~$45 each? Yes ✓

Step 2: Apply 20% discount = $136.50 × 0.20 = $27.30
Verification: Is $27.30 equal to 20% of $136.50? Yes ✓

Step 3: Final price = $136.50 - $27.30 = $109.20
Verification: Is $109.20 less than original $136.50? Yes ✓
\`\`\`
        `
      },
      {
        title: 'When CoT Excels and When It Does Not',
        content: `
**Where CoT Shines:**

Mathematical Problems
- Multi-step calculations: +35% accuracy
- Word problems: +40% accuracy
- Algebraic reasoning: +30% accuracy

Logical Reasoning
- Syllogisms and formal logic: +25% accuracy
- Causal reasoning: +20% accuracy
- Constraint satisfaction: +30% accuracy

Complex Analysis
- Multi-factor decision making: +15% accuracy
- Strategic planning: +20% accuracy
- Debugging and troubleshooting: +25% accuracy

**Where CoT May Not Help:**

Simple Tasks
- Basic factual retrieval: No improvement
- Simple pattern matching: May decrease performance
- Direct translations: Unnecessary overhead

Creative Tasks
- Poetry and creative writing: Can reduce creativity
- Brainstorming: May constrain thinking
- Artistic interpretation: Too structured

Time-Sensitive Applications
- Real-time responses: Too slow
- High-volume processing: Token cost prohibitive
- Streaming applications: Latency issues

**The Overthinking Trap**
Sometimes CoT can lead to overthinking simple problems:
\`\`\`
Q: What color is the sky?
Bad CoT: Let me think about atmospheric scattering, Rayleigh scattering of light wavelengths...
Good: The sky is typically blue during clear daytime conditions.
\`\`\`
        `
      },
      {
        title: 'Measuring CoT Effectiveness',
        content: `
Key metrics for evaluating Chain of Thought performance:

**Accuracy Improvement**
\`\`\`
CoT_Gain = (CoT_Accuracy - Baseline_Accuracy) / Baseline_Accuracy × 100%
\`\`\`
Typical gains: 10-40% for reasoning tasks

**Reasoning Validity Score**
Evaluate each reasoning step for logical validity:
\`\`\`
Validity = (Valid_Steps / Total_Steps) × 100%
\`\`\`
Target: >95% for production systems

**Answer Consistency Rate**
How often same problem yields same answer:
\`\`\`
Consistency = Same_Answers / Total_Runs × 100%
\`\`\`
Good CoT improves consistency by 15-20%

**Token Efficiency Ratio**
\`\`\`
Efficiency = Accuracy_Gain / Additional_Tokens
\`\`\`
Helps determine if CoT is worth the cost

**Error Attribution Rate**
Percentage of errors that can be traced to specific reasoning steps.
Higher is better for debugging and improvement.
        `
      },
      {
        title: 'Common CoT Pitfalls',
        content: `
**Pitfall 1: Hallucinated Reasoning**
Problem: Model creates plausible-sounding but incorrect reasoning.
Solution: Implement verification steps and fact-checking.

**Pitfall 2: Circular Reasoning**
Problem: Model uses conclusion to justify premises.
Example: "This must be true because the answer is X, and X means this is true."
Solution: Enforce forward-only reasoning flow.

**Pitfall 3: Skipping Critical Steps**
Problem: Model jumps over important intermediate steps.
Solution: Provide explicit step structure and requirements.

**Pitfall 4: Arithmetic Errors**
Problem: Simple calculation mistakes in reasoning chain.
Solution: Add explicit verification steps for calculations.

**Pitfall 5: Inconsistent Notation**
Problem: Switching between units, variables, or representations.
Solution: Define notation clearly upfront and enforce consistency.

**Pitfall 6: Overly Verbose Reasoning**
Problem: Unnecessarily long explanations that obscure key logic.
Solution: Emphasize conciseness while maintaining completeness.
        `
      },
      {
        title: 'Optimizing CoT for Production',
        content: `
**Selective CoT Application**
\`\`\`python
def should_use_cot(problem):
    # Use CoT only when beneficial
    if problem.complexity < THRESHOLD:
        return False
    if problem.type in ['factual', 'lookup', 'translation']:
        return False
    if problem.requires_reasoning:
        return True
    return problem.num_steps > 2
\`\`\`

**Caching Reasoning Patterns**
Store successful reasoning patterns for similar problems:
\`\`\`python
reasoning_cache = {
    'percentage_calculation': "Step 1: Identify base amount...",
    'rate_problem': "Step 1: Identify rate and time...",
    'logic_puzzle': "Step 1: List all constraints..."
}
\`\`\`

**Parallel CoT for Verification**
Run multiple reasoning chains in parallel:
\`\`\`python
async def parallel_cot(problem):
    tasks = [
        generate_cot_async(problem, temperature=0.5)
        for _ in range(3)
    ]
    results = await asyncio.gather(*tasks)
    return majority_vote(results)
\`\`\`

**Progressive CoT Enhancement**
Start simple, add complexity only if needed:
1. Try zero-shot first
2. If fails, add "think step by step"
3. If still fails, provide one example
4. If still fails, use full few-shot CoT
        `
      }
    ],

    practicalExample: {
      title: 'Real-World Application: Investment Analysis Bot',
      scenario: 'Building an AI system to analyze investment opportunities',
      challenge: 'Evaluate whether a stock is a good investment based on multiple factors',
      approach: `
**The Prompt Structure:**

\`\`\`
Analyze this investment opportunity using step-by-step reasoning.

Stock: TechCorp (TECH)
Current Price: $45.50
P/E Ratio: 28.3
Revenue Growth (3yr): 22% annually
Profit Margin: 15.2%
Debt-to-Equity: 0.4
Industry Average P/E: 24.5

Perform a comprehensive investment analysis:

Step 1: Evaluate Valuation
- Current P/E of 28.3 vs Industry average of 24.5
- The stock trades at a 15.5% premium to peers
- This suggests the stock might be slightly overvalued

Step 2: Assess Growth Quality
- Revenue growth of 22% annually is strong
- This is likely above industry average (typically 10-15%)
- Growth justifies some premium valuation

Step 3: Analyze Profitability
- 15.2% profit margin indicates efficient operations
- Healthy margin provides buffer against competition
- Sustainable profitability supports growth

Step 4: Examine Financial Health
- Debt-to-Equity of 0.4 is conservative
- Low leverage means lower financial risk
- Company can weather economic downturns

Step 5: Calculate Fair Value Estimate
- Justified P/E = Industry P/E × (1 + Growth Premium)
- Justified P/E = 24.5 × 1.2 = 29.4
- Current P/E of 28.3 is below justified P/E

Step 6: Risk Assessment
- Risks: Tech sector volatility, valuation premium
- Strengths: Strong growth, good margins, low debt

Investment Recommendation: BUY
Reasoning: Despite trading at premium to industry, strong growth and financial health justify valuation. The stock appears fairly valued with upside potential.
\`\`\`

**Results:**
- Zero-shot accuracy: 61% agreement with human analysts
- CoT accuracy: 84% agreement with human analysts
- Average reasoning steps: 6-8
- Processing time: +2.5 seconds
- User trust score: 92% (users trust transparent reasoning)
      `
    },

    quiz: [
      {
        question: 'What is the typical accuracy improvement from Chain of Thought on mathematical reasoning tasks?',
        options: [
          '5-10%',
          '10-40%',
          '50-70%',
          '70-90%'
        ],
        correctAnswer: 1,
        explanation: 'Chain of Thought typically improves mathematical reasoning accuracy by 10-40%, with complex multi-step problems showing the greatest gains.'
      },
      {
        question: 'Which is NOT a benefit of Chain of Thought prompting?',
        options: [
          'Makes reasoning transparent and debuggable',
          'Reduces token usage',
          'Improves accuracy on complex problems',
          'Enables error localization'
        ],
        correctAnswer: 1,
        explanation: 'CoT actually increases token usage due to explicit reasoning steps. This is a trade-off for improved accuracy and transparency.'
      }
    ],

    exercises: [
      {
        title: 'Design a CoT Prompt for Logic Puzzles',
        description: 'Create a Chain of Thought prompt that solves the classic "Einstein\'s Riddle" puzzle',
        hints: [
          'Break down into constraint tracking',
          'Use systematic elimination',
          'Verify consistency at each step'
        ]
      },
      {
        title: 'Implement Self-Consistency CoT',
        description: 'Build a system that generates multiple CoT reasoning paths and aggregates answers',
        hints: [
          'Use temperature variation for diversity',
          'Implement weighted voting based on confidence',
          'Track reasoning validity'
        ]
      }
    ],

    references: [
      'Wei et al. (2022) - Chain-of-Thought Prompting Elicits Reasoning',
      'Wang et al. (2023) - Self-Consistency Improves Chain of Thought',
      'Yao et al. (2023) - Tree of Thoughts: Deliberate Problem Solving',
      'Zhou et al. (2023) - Least-to-Most Prompting'
    ]
  }
};