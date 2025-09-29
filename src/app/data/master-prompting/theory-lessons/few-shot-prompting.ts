import { TheoryLesson } from '../../learning-content';

export const fewShotPromptingLesson: TheoryLesson = {
  id: 'few-shot-prompting',
  title: 'Few-Shot Prompting: Teaching by Example',
  description: 'Master the art of providing examples to guide AI behavior and achieve consistent, high-quality outputs',
  estimatedTime: 25,
  difficulty: 'intermediate',
  xpReward: 100,
  content: {
    introduction: `
Few-shot prompting is one of the most powerful techniques in prompt engineering, allowing you to teach AI models new tasks by providing a small number of examples. This approach leverages the model's pattern recognition capabilities to understand and replicate the desired behavior without explicit programming or fine-tuning.

Think of few-shot prompting as teaching someone a new skill by demonstration. Instead of explaining every rule and exception, you show them a few examples of the task done correctly, and they learn to apply the same patterns to new situations.
    `,

    sections: [
      {
        title: 'Understanding Few-Shot Learning',
        content: `
Few-shot learning bridges the gap between zero-shot prompting (no examples) and fine-tuning (many examples). It's particularly effective when you need:

**Pattern Consistency**: The AI learns the exact format, style, or structure you want from the examples provided.

**Domain Adaptation**: Examples help the model understand domain-specific terminology, conventions, or requirements.

**Complex Formatting**: When outputs need to follow specific templates or structures that are difficult to describe in words.

**Style Matching**: Teaching the model to match a particular writing style, tone, or voice.

The power of few-shot prompting lies in its efficiency—typically just 2-5 examples are enough to achieve significant improvements in task performance.
        `
      },
      {
        title: 'The Anatomy of Few-Shot Prompts',
        content: `
A well-structured few-shot prompt consists of several key components:

**1. Task Description (Optional but Recommended)**
Start with a brief description of what you want the model to do. This provides context for the examples that follow.

**2. Examples Section**
Present your examples in a consistent format:
- Input/Output pairs
- Clear delimiters between examples
- Consistent formatting across all examples

**3. Transition Phrase**
Signal the end of examples and the beginning of the actual task.

**4. The Actual Input**
The new input that needs to be processed using the learned pattern.

Example Structure:
\`\`\`
Task: Classify customer sentiment from reviews.

Examples:
Review: "This product exceeded my expectations! Fast shipping too."
Sentiment: Positive

Review: "Completely broken on arrival. Waste of money."
Sentiment: Negative

Review: "It works as described, nothing special though."
Sentiment: Neutral

Now classify this review:
Review: "Amazing quality, but took forever to arrive."
Sentiment:
\`\`\`
        `
      },
      {
        title: 'Optimal Number of Examples',
        content: `
Research and practical experience have shown that the effectiveness of few-shot prompting follows a specific pattern:

**1-2 Examples**: Often insufficient for complex patterns but can work for simple format demonstrations.

**3-5 Examples**: The sweet spot for most tasks. Provides enough variety without overwhelming the context window.

**6-8 Examples**: Useful for highly complex tasks or when demonstrating edge cases, but diminishing returns begin.

**9+ Examples**: Rarely necessary and can actually hurt performance due to:
- Context window limitations
- Increased token costs
- Potential overfitting to example patterns
- Confusion from too many patterns

The optimal number depends on:
- Task complexity
- Pattern variety needed
- Available context window
- Token budget constraints
        `
      },
      {
        title: 'Example Selection Strategies',
        content: `
Choosing the right examples is crucial for few-shot success:

**Diversity Strategy**
Include examples that cover different scenarios, edge cases, and variations:
- Different input lengths
- Various complexity levels
- Multiple valid output formats (if applicable)

**Boundary Examples**
Include examples near decision boundaries to clarify ambiguous cases:
- Almost positive vs. clearly positive
- Edge cases that might be misclassified
- Borderline examples with clear classifications

**Progressive Complexity**
Arrange examples from simple to complex, helping the model understand the pattern gradually:
1. Start with clear, straightforward examples
2. Add moderate complexity
3. Include nuanced or challenging cases

**Common Mistakes Coverage**
Include examples that specifically address common errors or misconceptions:
- What NOT to do (with corrections)
- Easily confused categories
- Subtle distinctions
        `
      },
      {
        title: 'Advanced Few-Shot Techniques',
        content: `
**Dynamic Example Selection**
Choose examples based on the specific input:
\`\`\`python
def select_examples(input_text, example_bank):
    # Select most relevant examples based on similarity
    similarities = [compute_similarity(input_text, ex) for ex in example_bank]
    return select_top_k(example_bank, similarities, k=3)
\`\`\`

**Chain-of-Thought Few-Shot**
Combine few-shot with reasoning steps:
\`\`\`
Q: Is 17 prime?
A: Let me check if 17 is divisible by any number from 2 to √17 ≈ 4.
   17 ÷ 2 = 8.5 (not divisible)
   17 ÷ 3 = 5.67 (not divisible)
   17 ÷ 4 = 4.25 (not divisible)
   Since no divisions work, 17 is prime.

Q: Is 21 prime?
A: Let me check if 21 is divisible by any number from 2 to √21 ≈ 4.
   21 ÷ 2 = 10.5 (not divisible)
   21 ÷ 3 = 7 (divisible!)
   Since 21 = 3 × 7, it's not prime.
\`\`\`

**Contrastive Examples**
Show both correct and incorrect examples:
\`\`\`
Correct: "The meeting is scheduled for 3 PM EST"
Format: Time + Timezone

Incorrect: "The meeting is at 3"
Issue: Missing timezone

Correct: "Please arrive by 2:45 PM EST"
Format: Time + Timezone
\`\`\`
        `
      },
      {
        title: 'Common Pitfalls and Solutions',
        content: `
**Pitfall 1: Inconsistent Example Formatting**
Problem: Examples use different formats, confusing the model.
Solution: Use a template for all examples and validate consistency.

**Pitfall 2: Biased Example Distribution**
Problem: 4 positive examples, 1 negative example leads to positive bias.
Solution: Balance examples across all categories or explicitly note if imbalance is intentional.

**Pitfall 3: Over-Specific Examples**
Problem: Examples are too similar, model doesn't generalize.
Solution: Deliberately include variety in length, style, and complexity.

**Pitfall 4: Ambiguous Delimiters**
Problem: Unclear where examples end and task begins.
Solution: Use clear, consistent delimiters like "---" or "###".

**Pitfall 5: Example Leakage**
Problem: Test input accidentally included in examples.
Solution: Implement proper data separation and validation.
        `
      },
      {
        title: 'Few-Shot vs. Other Approaches',
        content: `
**When to Use Few-Shot:**
- Specific output format required
- Pattern is hard to describe but easy to demonstrate
- Style or tone matching needed
- Domain-specific conventions
- Classification with custom categories

**When to Use Zero-Shot:**
- Task is straightforward and well-defined
- Model already understands the domain
- Need maximum flexibility
- Token budget is very limited

**When to Use Chain-of-Thought:**
- Reasoning process is important
- Need explainable outputs
- Complex multi-step problems
- Mathematical or logical tasks

**When to Consider Fine-Tuning:**
- Need consistent performance across thousands of examples
- Very specific domain with unique patterns
- Performance requirements exceed few-shot capabilities
- Have sufficient training data and resources
        `
      },
      {
        title: 'Performance Metrics',
        content: `
Measuring few-shot effectiveness requires specific metrics:

**Accuracy Improvement**
\`\`\`
Improvement = (Few_Shot_Accuracy - Zero_Shot_Accuracy) / Zero_Shot_Accuracy × 100%
\`\`\`
Typical improvements: 15-40% for classification tasks

**Format Compliance Rate**
Percentage of outputs matching the expected format exactly.
Target: >95% for production systems

**Token Efficiency**
\`\`\`
Efficiency = Quality_Score / (Input_Tokens + Output_Tokens)
\`\`\`
Compare against zero-shot and optimize example count.

**Consistency Score**
Measure variance across multiple runs with same examples.
Lower variance indicates more reliable prompting.

**Generalization Testing**
Test on inputs significantly different from examples to ensure the model learned patterns, not memorized specifics.
        `
      }
    ],

    practicalExample: {
      title: 'Real-World Application: Customer Support Ticket Classification',
      scenario: 'Building a system to automatically categorize support tickets',
      challenge: 'Classify tickets into: Technical, Billing, Feature Request, or General',
      approach: `
**Step 1: Analyze the Categories**
- Technical: System errors, bugs, performance issues
- Billing: Payment, subscription, refund issues
- Feature Request: New functionality suggestions
- General: Everything else

**Step 2: Select Representative Examples**
Choose examples that clearly demonstrate each category and boundary cases.

**Step 3: Implement Few-Shot Prompt**
\`\`\`
Classify customer support tickets into one of four categories.

Examples:
Ticket: "I can't log into my account, it keeps saying invalid password even though I reset it."
Category: Technical

Ticket: "I was charged twice for my subscription this month. Please refund the extra charge."
Category: Billing

Ticket: "It would be great if you could add dark mode to the mobile app."
Category: Feature Request

Ticket: "How do I export my data to Excel format?"
Category: General

Now classify this ticket:
Ticket: "The application crashes whenever I try to upload files larger than 10MB."
Category:
\`\`\`

**Step 4: Test and Refine**
- Test with diverse real-world examples
- Add examples for commonly misclassified tickets
- Adjust example selection based on error patterns

**Results**
- Zero-shot accuracy: 68%
- Few-shot accuracy (5 examples): 89%
- Token cost increase: 3.2x
- Processing time: +120ms
- Business value: 21% improvement worth the costs
      `
    },

    quiz: [
      {
        question: 'What is typically the optimal number of examples for few-shot prompting?',
        options: [
          '1-2 examples',
          '3-5 examples',
          '10-15 examples',
          'As many as possible'
        ],
        correctAnswer: 1,
        explanation: 'Research shows 3-5 examples provide the best balance between pattern demonstration and token efficiency.'
      },
      {
        question: 'Which scenario is LEAST suitable for few-shot prompting?',
        options: [
          'Teaching specific output formatting',
          'Simple well-understood tasks',
          'Style and tone matching',
          'Domain-specific classifications'
        ],
        correctAnswer: 1,
        explanation: 'Simple, well-understood tasks are better suited for zero-shot prompting to save tokens and maintain flexibility.'
      }
    ],

    exercises: [
      {
        title: 'Design a Few-Shot Sentiment Analyzer',
        description: 'Create a few-shot prompt that classifies product reviews into 5 sentiment levels (Very Negative, Negative, Neutral, Positive, Very Positive)',
        hints: [
          'Include boundary examples between adjacent categories',
          'Balance examples across all five categories',
          'Consider mixed sentiment reviews'
        ]
      },
      {
        title: 'Optimize Example Selection',
        description: 'Given 20 labeled examples, select the best 4 for a few-shot prompt',
        hints: [
          'Prioritize diversity over similarity',
          'Include edge cases',
          'Ensure category balance'
        ]
      }
    ],

    references: [
      'Brown et al. (2020) - Language Models are Few-Shot Learners',
      'Liu et al. (2021) - What Makes Good In-Context Examples for GPT-3?',
      'Min et al. (2022) - Rethinking the Role of Demonstrations',
      'Anthropic (2024) - Constitutional AI and Few-Shot Learning'
    ]
  }
};