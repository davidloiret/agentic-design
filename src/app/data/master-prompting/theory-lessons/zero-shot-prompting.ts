import { TheoryLesson } from '../../knowledge-representation/theory-lessons/types';

export const zeroShotPromptingLesson: TheoryLesson = {
  id: 'zero-shot-prompting',
  title: 'Zero-Shot Prompting: Mastering AI Without Examples',
  description: 'Learn how to craft effective prompts that leverage AI\'s pre-trained knowledge without providing examples',

  learningObjectives: [
    'Understand zero-shot prompting and its role in the prompt engineering hierarchy',
    'Master techniques for writing clear, unambiguous zero-shot prompts',
    'Learn when zero-shot prompting is optimal versus other approaches',
    'Develop skills for task decomposition and instruction clarity',
    'Understand the limitations and best practices of zero-shot prompting'
  ],

  prerequisites: ['what-is-prompting'],

  sections: [
    {
      id: 'understanding-zero-shot',
      title: 'Understanding Zero-Shot Prompting',
      content: `## Zero-Shot: The Foundation of Prompt Engineering

**Zero-shot prompting** is the technique of instructing an AI model to perform a task without providing any examples, relying entirely on the model's pre-trained knowledge and your instructions.

### The Power of Pre-Training

Modern language models are trained on trillions of tokens of text, giving them:

- **Broad Knowledge Base**: Facts, concepts, and relationships across domains
- **Task Understanding**: Ability to recognize and execute common tasks
- **Language Patterns**: Understanding of formats, styles, and structures
- **Reasoning Capabilities**: Logic, inference, and problem-solving skills

### Zero-Shot in the Learning Paradigm

| Paradigm | Examples Provided | Use Case |
|----------|------------------|----------|
| Zero-Shot | 0 examples | Simple tasks, clear instructions |
| One-Shot | 1 example | Format demonstration |
| Few-Shot | 2-5 examples | Pattern learning |
| Many-Shot | 10+ examples | Complex patterns |

### When Zero-Shot Excels

Zero-shot prompting is particularly effective for:

1. **Well-Defined Tasks**: Tasks the model likely encountered during training
2. **Standard Operations**: Summarization, translation, classification
3. **Clear Instructions**: When requirements can be precisely specified
4. **Resource Constraints**: When creating examples is time-consuming
5. **Generalization Testing**: Evaluating model capabilities

### The Economics of Zero-Shot

Zero-shot prompting offers significant advantages:

- **Lower Token Cost**: No examples mean fewer input tokens
- **Faster Development**: No need to curate example sets
- **Greater Flexibility**: Easy to modify requirements
- **Reduced Bias**: No example-induced biases
- **Scalability**: Same prompt works across different contexts`,
      examples: [
        {
          title: 'Zero-Shot vs Few-Shot Comparison',
          code: `// Zero-Shot Approach (Efficient)
"Classify the sentiment of this text as positive, negative, or neutral:
'The product exceeded my expectations in every way.'"

// Output: "positive"
// Tokens used: ~25

// Few-Shot Approach (More tokens, same result)
"Classify sentiment:
'Great service!' -> positive
'Terrible experience' -> negative
'It was okay' -> neutral
'The product exceeded my expectations in every way.' -> ?"

// Output: "positive"
// Tokens used: ~50

// For simple tasks, zero-shot is more efficient`,
          description: 'Zero-shot uses 50% fewer tokens for the same result in straightforward tasks.'
        }
      ]
    },
    {
      id: 'crafting-zero-shot-prompts',
      title: 'Crafting Effective Zero-Shot Prompts',
      content: `## The Art of Instruction Writing

### Principle 1: Explicit Task Definition

Zero-shot prompts must leave no room for interpretation about the task.

**Components of Task Definition:**
- **Action Verb**: Precisely what to do (analyze, summarize, generate, classify)
- **Target Object**: What to act upon (text, data, concept, code)
- **Success Criteria**: What constitutes completion
- **Output Format**: How to structure the response

### Principle 2: Leverage Natural Language

Write instructions as you would explain to a highly capable human colleague.

**Natural Language Patterns:**
- Use complete sentences
- Employ logical connectors (therefore, however, additionally)
- Include reasoning words (because, since, considering)
- Reference common knowledge appropriately

### Principle 3: Structured Thinking

Guide the model's reasoning process through structure.

**Structural Elements:**
- **Sequential Steps**: "First... Then... Finally..."
- **Categorization**: "Consider these aspects: A, B, C"
- **Conditional Logic**: "If X, then Y; otherwise Z"
- **Hierarchical Organization**: Main points with sub-points

### Principle 4: Constraint Specification

Clearly define boundaries and limitations.

**Types of Constraints:**
- **Scope**: What to include/exclude
- **Format**: Output structure and style
- **Length**: Word or sentence limits
- **Tone**: Formal, casual, technical
- **Perspective**: First-person, third-person, objective

### Principle 5: Output Formatting

Specify exactly how you want the response structured.

**Format Specifications:**
- **Lists**: Numbered, bulleted, nested
- **Sections**: Headers, paragraphs, divisions
- **Data Structures**: Tables, JSON, CSV
- **Code**: Language, style, comments
- **Documents**: Reports, emails, articles

### Common Zero-Shot Patterns

**1. Direct Instruction Pattern**
\`"[Action] [Object] [Constraints] [Format]"\`

**2. Question-Answer Pattern**
\`"Answer the following question: [Question]. Provide [specifications]."\`

**3. Analysis Pattern**
\`"Analyze [subject] focusing on [aspects]. Present findings as [format]."\`

**4. Generation Pattern**
\`"Create [output type] that [requirements]. Ensure [constraints]."\`

**5. Transformation Pattern**
\`"Convert [input] to [output format] while [maintaining/changing aspects]."\``,
      examples: [
        {
          title: 'Well-Crafted Zero-Shot Prompts',
          code: `// Example 1: Direct Instruction Pattern
"Summarize this research paper in exactly 3 paragraphs:
- Paragraph 1: Main research question and methodology (50 words)
- Paragraph 2: Key findings and results (75 words)
- Paragraph 3: Implications and future work (50 words)
Use academic tone. Avoid technical jargon."

// Example 2: Analysis Pattern
"Analyze this business proposal from three perspectives:
1. Financial viability (ROI, break-even point)
2. Market opportunity (size, competition, timing)
3. Execution risk (technical, operational, regulatory)
Present each perspective as a brief assessment with a 1-10 score."

// Example 3: Generation Pattern
"Create a Python function that validates email addresses.
Requirements:
- Check for @ symbol and domain
- Verify TLD is at least 2 characters
- Handle edge cases (empty string, None)
- Include docstring and type hints
- Add 3 test cases as comments"

// Example 4: Transformation Pattern
"Convert this technical documentation to a user-friendly FAQ.
Transform each technical concept into a question-answer pair.
Use simple language suitable for non-technical users.
Maintain accuracy while improving accessibility.
Format: Q: [question] A: [answer in 2-3 sentences]"

// Example 5: Complex Zero-Shot Task
"You are evaluating a machine learning model's performance.
Given these metrics:
- Accuracy: 0.92
- Precision: 0.89
- Recall: 0.95
- F1: 0.92
- Dataset: 10,000 medical images

Provide:
1. Interpretation of what these metrics mean for this use case
2. Whether this model is ready for production (yes/no with reasoning)
3. Top 3 recommendations for improvement
4. Potential risks if deployed as-is

Format your response with clear sections and bullet points."`,
          description: 'Each example demonstrates clear task definition without requiring examples.'
        }
      ]
    },
    {
      id: 'advanced-techniques',
      title: 'Advanced Zero-Shot Techniques',
      content: `## Elevating Zero-Shot Performance

### Technique 1: Chain of Thought (CoT) Zero-Shot

Adding "Let's think step by step" triggers reasoning without examples.

**Why It Works:**
- Activates the model's reasoning pathways
- Encourages systematic problem decomposition
- Improves accuracy on complex tasks by 10-40%

**When to Use:**
- Mathematical problems
- Logic puzzles
- Multi-step reasoning
- Complex analysis

### Technique 2: Role Priming

Assigning expertise without examples enhances performance.

**Effective Roles:**
- Domain Expert: "As a [field] expert with [years] experience..."
- Analytical Thinker: "As a critical analyst..."
- Creative Professional: "As an award-winning [profession]..."
- Teacher: "As an experienced educator..."

### Technique 3: Task Decomposition

Breaking complex tasks into subtasks improves zero-shot success.

**Decomposition Strategies:**
- **Temporal**: "First do X, then Y, finally Z"
- **Categorical**: "Address aspects A, B, and C separately"
- **Hierarchical**: "Start with overview, then details"
- **Analytical**: "Identify, analyze, synthesize, conclude"

### Technique 4: Metacognitive Prompting

Asking the model to reflect on its approach improves quality.

**Metacognitive Triggers:**
- "Before answering, consider..."
- "Think about the best approach..."
- "Reflect on potential issues..."
- "Verify your reasoning..."

### Technique 5: Negative Instruction

Specifying what NOT to do can be as powerful as positive instructions.

**Negative Instruction Patterns:**
- "Avoid using..."
- "Do not include..."
- "Exclude any mention of..."
- "Refrain from..."

### Technique 6: Confidence Calibration

Requesting confidence levels improves reliability.

**Confidence Patterns:**
- "Rate your confidence (1-10) in this answer"
- "Indicate if any part is uncertain"
- "Highlight assumptions made"
- "Note areas requiring verification"

### Technique 7: Self-Consistency Checking

Building verification into the prompt improves accuracy.

**Self-Check Patterns:**
- "Double-check your calculations"
- "Verify this meets all requirements"
- "Confirm consistency across sections"
- "Review for logical errors"`,
      examples: [
        {
          title: 'Advanced Zero-Shot Techniques in Action',
          code: `// Technique 1: CoT Zero-Shot
"Calculate the compound interest on $10,000 at 5% annual rate for 3 years.
Let's think step by step."

// Technique 2: Role Priming
"As a senior financial analyst with expertise in investment strategies,
evaluate whether a 25-year-old should prioritize paying off student loans
(6% interest) or investing in index funds (historical 10% return)."

// Technique 3: Task Decomposition
"Debug this Python function by:
1. First, identify what the function is supposed to do
2. Then, trace through the logic line by line
3. Next, spot any logical or syntax errors
4. Finally, provide the corrected version"

// Technique 4: Metacognitive Prompting
"Before providing investment advice, consider:
- The person's risk tolerance
- Time horizon for the investment
- Current market conditions
- Tax implications
Now, recommend an investment strategy for a risk-averse retiree."

// Technique 5: Negative Instruction
"Explain quantum computing to a high school student.
Avoid: Mathematical formulas, physics jargon, unnecessary complexity.
Focus on: Practical applications, simple analogies, real-world impact."

// Technique 6: Confidence Calibration
"Diagnose the likely cause of these server symptoms:
- High CPU usage
- Slow response times
- Memory usage normal
- Occurs during peak hours
Provide your diagnosis and rate confidence (1-10) with reasoning."

// Technique 7: Self-Consistency with Complex Task
"Create a project timeline for launching a mobile app:
Requirements: 6 months, 5 developers, $500K budget
Include: Development phases, testing, deployment
Verify: All tasks fit within timeline, resources don't exceed limits
Double-check: Dependencies are logical, no resource conflicts"`,
          description: 'Each technique enhances zero-shot performance for different task types.'
        }
      ]
    },
    {
      id: 'optimization-strategies',
      title: 'Optimizing Zero-Shot Performance',
      content: `## Maximizing Zero-Shot Effectiveness

### Performance Metrics

Understanding how to measure zero-shot success:

| Metric | Description | Target |
|--------|-------------|--------|
| Task Completion | Did it do what was asked? | 100% |
| Accuracy | Correctness of information | >95% |
| Format Compliance | Followed structure requirements | 100% |
| Relevance | Stayed on topic | >95% |
| Coherence | Logical flow and consistency | >90% |

### Common Failure Modes and Solutions

**1. Ambiguity Misinterpretation**
- *Problem*: Model interprets instructions differently than intended
- *Solution*: Use precise language, define terms, provide context

**2. Format Deviation**
- *Problem*: Output doesn't match requested format
- *Solution*: Provide explicit format templates, use structured markers

**3. Scope Creep**
- *Problem*: Response includes irrelevant information
- *Solution*: Set clear boundaries, use "only" and "exactly"

**4. Incomplete Execution**
- *Problem*: Model stops before completing all requirements
- *Solution*: Number tasks explicitly, use completion checkers

**5. Over-Generalization**
- *Problem*: Response too generic or high-level
- *Solution*: Request specifics, set depth requirements

### A/B Testing Zero-Shot Prompts

Systematic optimization through testing:

**Test Variables:**
- Instruction phrasing (imperative vs. descriptive)
- Structure (linear vs. hierarchical)
- Constraint placement (beginning vs. end)
- Role assignment (with vs. without)
- Reasoning triggers (CoT vs. direct)

**Testing Protocol:**
1. Create baseline prompt
2. Identify variable to test
3. Create variant prompts
4. Run on identical inputs
5. Measure performance metrics
6. Statistical significance testing
7. Document winning patterns

### Zero-Shot Prompt Templates

Proven templates for common tasks:

**Summarization Template:**
\`"Summarize [content] in [length] focusing on [key aspects].
Use [style] tone. Structure: [format requirements]."\`

**Analysis Template:**
\`"Analyze [subject] considering:
1. [Dimension 1]
2. [Dimension 2]
3. [Dimension 3]
Present findings as [format] with [constraints]."\`

**Generation Template:**
\`"Generate [output type] that meets these criteria:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]
Format: [structure]. Length: [constraints]. Style: [tone]."\`

**Decision Template:**
\`"Given [context], decide [choice] based on:
- [Criterion 1]: [weight/importance]
- [Criterion 2]: [weight/importance]
Provide: Decision, reasoning, confidence level, alternatives considered."\``,
      examples: [
        {
          title: 'Zero-Shot Optimization Examples',
          code: `// Before Optimization (Ambiguous)
"Write about machine learning"
// Result: Generic, unfocused essay

// After Optimization (Precise)
"Write a 200-word technical introduction to machine learning for
software engineers. Cover:
1. Definition and core concept (50 words)
2. Three main algorithm categories with examples (100 words)
3. Most relevant application to software development (50 words)
Use technical but accessible language. No math formulas."
// Result: Targeted, useful content

// A/B Test Example
// Variant A: Imperative
"Analyze this code for security vulnerabilities."

// Variant B: Structured
"Security analysis required:
1. Identify potential vulnerabilities
2. Rate severity (Critical/High/Medium/Low)
3. Suggest fixes
Focus: SQL injection, XSS, authentication"

// Variant C: Role + Structure
"As a senior security engineer, perform security analysis:
1. Vulnerability scan (common OWASP top 10)
2. Risk assessment (likelihood × impact)
3. Remediation priority
Output: Markdown table with findings"

// Testing shows Variant C performs best:
// - 95% vulnerability detection (vs 70% for A)
// - 100% format compliance (vs 60% for A)
// - More actionable recommendations`,
          description: 'Optimization can improve zero-shot performance by 25-50% on average.'
        }
      ]
    },
    {
      id: 'zero-shot-limitations',
      title: 'Limitations and When to Move Beyond Zero-Shot',
      content: `## Understanding Zero-Shot Boundaries

### Inherent Limitations

Zero-shot prompting has fundamental constraints:

**1. Lack of Specific Context**
- Cannot learn unique patterns
- Misses domain-specific nuances
- Limited style matching ability

**2. Ambiguity in Novel Tasks**
- Unfamiliar tasks may be misunderstood
- Creative interpretation varies widely
- No reference point for quality

**3. Format Learning Challenges**
- Complex formats hard to specify
- Subtle style requirements missed
- Consistency across outputs varies

**4. Reasoning Depth Limits**
- Very complex multi-step reasoning may fail
- Nuanced judgment calls inconsistent
- Abstract concepts may be oversimplified

### When to Upgrade from Zero-Shot

| Scenario | Zero-Shot Performance | Recommended Approach |
|----------|----------------------|---------------------|
| Standard summarization | Excellent (90%+) | Stay with zero-shot |
| Custom format generation | Poor (40-60%) | Move to few-shot |
| Style matching | Poor (30-50%) | Use few-shot examples |
| Complex reasoning | Moderate (60-70%) | Add CoT examples |
| Novel task types | Poor (20-40%) | Provide many examples |
| Domain-specific work | Variable (40-80%) | Combine with fine-tuning |

### Red Flags Indicating Zero-Shot Isn't Enough

**Consistency Issues:**
- Output format varies between runs
- Quality fluctuates significantly
- Important details frequently missed

**Comprehension Problems:**
- Misinterprets instructions regularly
- Focuses on wrong aspects
- Generates irrelevant content

**Quality Concerns:**
- Below acceptable accuracy threshold
- Lacks necessary depth or detail
- Missing domain expertise

### Hybrid Approaches

Combining zero-shot with other techniques:

**Zero-Shot + Chain of Thought:**
- Maintains efficiency
- Improves reasoning
- Good for logical tasks

**Zero-Shot + Role Definition:**
- Adds expertise context
- Improves domain accuracy
- Maintains generality

**Zero-Shot + Structured Output:**
- Forces format compliance
- Improves parseability
- Reduces variation

**Zero-Shot + Verification:**
- Adds quality checks
- Improves reliability
- Catches errors

### Cost-Benefit Analysis

When deciding on zero-shot vs. alternatives:

**Zero-Shot Benefits:**
- ✅ Lowest token cost
- ✅ Fastest to implement
- ✅ Most flexible
- ✅ No example bias

**Zero-Shot Costs:**
- ❌ Lower accuracy on complex tasks
- ❌ Less control over output
- ❌ Format inconsistency
- ❌ Limited style matching

**Break-Even Analysis:**
If creating examples takes X minutes and saves Y tokens per query:
- Use zero-shot if: queries < (X × rate) / (Y × token_cost)
- Use few-shot if: queries > (X × rate) / (Y × token_cost)`,
      examples: [
        {
          title: 'Recognizing When to Move Beyond Zero-Shot',
          code: `// Task: Generate product descriptions in brand voice

// Zero-Shot Attempt (Fails to match brand voice)
"Write a product description for our new wireless headphones.
Make it exciting and appealing to young professionals."
// Result: Generic, misses brand voice

// Few-Shot Solution (Captures brand voice)
"Write a product description following our brand style:

Example 1:
Product: Smart Watch
Description: 'Meet your wrist's new best friend. Our Smart Watch
doesn't just tell time—it tells your story. From sunrise yoga to
midnight emails, it's there for every beat of your day.'

Example 2:
Product: Wireless Earbuds
Description: 'Sound that moves with you. These earbuds don't just
play music—they soundtrack your life. Conference call to cardio
class, they're your audio co-pilot.'

Now write for: Wireless Headphones"
// Result: Perfectly matches brand voice

// Task: Complex Data Extraction

// Zero-Shot Attempt (Misses edge cases)
"Extract all dates, monetary amounts, and company names from this text."
// Accuracy: 70%, misses formatted variants

// Few-Shot Solution (Handles edge cases)
"Extract information as shown:

Text: 'Apple Inc. announced Q3 revenue of $81.4B on July 27th'
Output: {
  dates: ['July 27th'],
  amounts: ['$81.4B'],
  companies: ['Apple Inc.']
}

Text: 'Microsoft (MSFT) will invest 10 billion over 5 years starting 2024-01-01'
Output: {
  dates: ['2024-01-01'],
  amounts: ['10 billion'],
  companies: ['Microsoft', 'MSFT']
}

Now extract from: [target text]"
// Accuracy: 95%, catches variants`,
          description: 'Moving to few-shot when zero-shot falls short of requirements.'
        }
      ]
    }
  ],

  summary: [
    'Zero-shot prompting leverages pre-trained knowledge without examples, offering efficiency and flexibility',
    'Effective zero-shot prompts require explicit task definition, clear constraints, and structured thinking',
    'Advanced techniques like CoT prompting and role priming can improve zero-shot performance by 10-40%',
    'Zero-shot excels at standard tasks but struggles with novel formats and style matching',
    'Optimization through A/B testing and templates can significantly improve results',
    'Recognizing when to move beyond zero-shot to few-shot or other techniques is crucial',
    'Zero-shot offers the best token economy and development speed for appropriate tasks'
  ],

  checkYourUnderstanding: [
    {
      question: 'When is zero-shot prompting most effective versus few-shot prompting?',
      answer: 'Zero-shot is most effective for well-defined, standard tasks that the model likely encountered during training (like summarization, translation, basic classification). Few-shot becomes necessary when you need specific formatting, style matching, or pattern recognition that requires examples to demonstrate.'
    },
    {
      question: 'What does adding "Let\'s think step by step" do to a zero-shot prompt?',
      answer: 'This phrase triggers Chain of Thought (CoT) reasoning in zero-shot contexts, causing the model to break down complex problems systematically. It can improve accuracy on reasoning tasks by 10-40% without requiring examples.'
    },
    {
      question: 'Name three techniques for improving zero-shot prompt performance.',
      answer: 'Three key techniques are: 1) Role priming (assigning expertise), 2) Task decomposition (breaking complex tasks into subtasks), and 3) Negative instruction (specifying what NOT to do). These can significantly improve output quality without examples.'
    },
    {
      question: 'What are the main limitations of zero-shot prompting?',
      answer: 'Main limitations include: inability to learn unique patterns, difficulty with novel task types, challenges in matching specific styles or formats, and inconsistency in very complex multi-step reasoning. These limitations often require moving to few-shot or fine-tuning approaches.'
    }
  ],

  nextSteps: [
    'Practice writing zero-shot prompts for different task types',
    'Experiment with Chain of Thought prompting for reasoning tasks',
    'Learn few-shot prompting for when zero-shot isn\'t sufficient',
    'Master prompt optimization through systematic A/B testing',
    'Build a library of proven zero-shot templates for common tasks'
  ]
};