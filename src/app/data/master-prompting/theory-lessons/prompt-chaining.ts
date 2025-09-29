import { TheoryLesson } from '../../learning-content';

export const promptChainingLesson: TheoryLesson = {
  id: 'prompt-chaining',
  title: 'Prompt Chaining: Orchestrating Complex AI Workflows',
  description: 'Learn to decompose complex tasks into sequential prompts, creating sophisticated AI pipelines for advanced problem-solving',
  estimatedTime: 35,
  difficulty: 'advanced',
  xpReward: 150,
  content: {
    introduction: `
Prompt chaining transforms AI from a single-query tool into a sophisticated reasoning engine capable of tackling complex, multi-stage problems. By breaking down intricate tasks into a sequence of focused prompts, where each output feeds into the next input, we can achieve results far beyond what's possible with a single prompt.

This technique mirrors how humans approach complex problems—breaking them into manageable steps, solving each component, and combining results. Prompt chaining has become essential for production AI systems, enabling everything from autonomous research to complex document generation.
    `,

    sections: [
      {
        title: 'The Architecture of Prompt Chains',
        content: `
Prompt chains consist of interconnected components that work together to solve complex problems:

**Core Components:**

1. **Task Decomposition**
Breaking complex objectives into atomic, single-purpose prompts:
- Each prompt has one clear responsibility
- Outputs are well-defined and parseable
- Dependencies between prompts are explicit

2. **State Management**
Maintaining context and information flow:
- Context accumulation strategies
- Variable storage and retrieval
- Memory optimization techniques

3. **Control Flow**
Determining execution paths:
- Sequential processing
- Conditional branching
- Parallel execution
- Loop structures

4. **Error Handling**
Managing failures and edge cases:
- Validation gates between prompts
- Fallback strategies
- Retry mechanisms

5. **Output Synthesis**
Combining results from multiple prompts:
- Aggregation strategies
- Conflict resolution
- Final formatting

**Chain Topology Types:**

Linear Chain: A → B → C → D
Branching Chain: A → (B | C) → D
Parallel Chain: A → [B, C, D] → E
Recursive Chain: A → B → A (until condition)
Hybrid Chain: Combination of patterns
        `
      },
      {
        title: 'Designing Effective Chains',
        content: `
**Chain Design Principles:**

1. **Single Responsibility Principle**
Each prompt should do one thing well:
\`\`\`
❌ Bad: "Research the topic, write an article, and create social media posts"
✅ Good:
   Prompt 1: "Research key facts about [topic]"
   Prompt 2: "Write article using these facts: [facts]"
   Prompt 3: "Create tweets from article: [article]"
\`\`\`

2. **Clear Input/Output Contracts**
Define exact format for data passing:
\`\`\`python
# Define clear interfaces
ResearchOutput = {
    "key_facts": list[str],
    "sources": list[str],
    "summary": str
}

ArticleInput = {
    "facts": list[str],
    "tone": str,
    "length": int
}
\`\`\`

3. **Progressive Enhancement**
Each step adds value:
\`\`\`
Step 1: Generate basic outline
Step 2: Expand each section
Step 3: Add examples and evidence
Step 4: Polish and format
\`\`\`

4. **Fail-Fast Validation**
Verify outputs early:
\`\`\`python
def validate_research_output(output):
    if len(output['key_facts']) < 3:
        raise ValueError("Insufficient facts gathered")
    if not output['sources']:
        raise ValueError("No sources provided")
    return True
\`\`\`

5. **Context Preservation**
Maintain relevant information:
\`\`\`
Original Query: [saved]
Step 1 Output: [saved]
Step 2 Output: [saved]
Current Context: [Original + Step1 + Step2]
\`\`\`
        `
      },
      {
        title: 'Implementation Patterns',
        content: `
**Pattern 1: Sequential Processing**
\`\`\`python
def sequential_chain(input_data):
    # Step 1: Analysis
    analysis = prompt("Analyze this data: " + input_data)

    # Step 2: Insights
    insights = prompt(f"Extract insights from: {analysis}")

    # Step 3: Recommendations
    recommendations = prompt(f"Based on {insights}, recommend...")

    return recommendations
\`\`\`

**Pattern 2: Conditional Branching**
\`\`\`python
def conditional_chain(query):
    # Classify query type
    query_type = prompt(f"Classify this query: {query}")

    if query_type == "technical":
        result = prompt(f"Technical analysis of: {query}")
    elif query_type == "business":
        result = prompt(f"Business perspective on: {query}")
    else:
        result = prompt(f"General response to: {query}")

    return result
\`\`\`

**Pattern 3: Parallel Execution**
\`\`\`python
async def parallel_chain(topic):
    # Execute multiple prompts simultaneously
    tasks = [
        prompt_async(f"Technical aspects of {topic}"),
        prompt_async(f"Business implications of {topic}"),
        prompt_async(f"Social impact of {topic}")
    ]

    results = await asyncio.gather(*tasks)

    # Synthesize results
    synthesis = prompt(f"Synthesize these perspectives: {results}")
    return synthesis
\`\`\`

**Pattern 4: Recursive Refinement**
\`\`\`python
def recursive_refinement(content, max_iterations=3):
    for i in range(max_iterations):
        # Evaluate current content
        evaluation = prompt(f"Evaluate quality: {content}")

        if "acceptable" in evaluation:
            break

        # Refine based on evaluation
        content = prompt(f"Improve based on: {evaluation}\\nContent: {content}")

    return content
\`\`\`

**Pattern 5: Map-Reduce**
\`\`\`python
def map_reduce_chain(documents):
    # Map: Process each document
    summaries = []
    for doc in documents:
        summary = prompt(f"Summarize: {doc}")
        summaries.append(summary)

    # Reduce: Combine summaries
    final = prompt(f"Synthesize these summaries: {summaries}")
    return final
\`\`\`
        `
      },
      {
        title: 'Advanced Chaining Techniques',
        content: `
**Dynamic Chain Construction**
Build chains based on runtime conditions:
\`\`\`python
class DynamicChain:
    def __init__(self):
        self.chain = []

    def add_step_if(self, condition, prompt_template):
        if condition:
            self.chain.append(prompt_template)

    def execute(self, initial_input):
        result = initial_input
        for step in self.chain:
            result = prompt(step.format(input=result))
        return result
\`\`\`

**Checkpoint and Recovery**
Save intermediate states for fault tolerance:
\`\`\`python
class CheckpointedChain:
    def __init__(self, checkpoint_dir):
        self.checkpoint_dir = checkpoint_dir

    def run_with_checkpoints(self, steps, initial_input):
        current_input = initial_input

        for i, step in enumerate(steps):
            checkpoint_file = f"{self.checkpoint_dir}/step_{i}.json"

            if os.path.exists(checkpoint_file):
                # Resume from checkpoint
                current_input = load_checkpoint(checkpoint_file)
            else:
                # Execute step and save checkpoint
                current_input = prompt(step.format(input=current_input))
                save_checkpoint(checkpoint_file, current_input)

        return current_input
\`\`\`

**Feedback Loops**
Incorporate validation and correction:
\`\`\`python
def feedback_chain(task):
    max_attempts = 3

    for attempt in range(max_attempts):
        # Generate solution
        solution = prompt(f"Solve: {task}")

        # Validate solution
        validation = prompt(f"Check solution: {solution} for task: {task}")

        if "correct" in validation:
            return solution

        # Generate feedback
        feedback = prompt(f"What's wrong with: {solution}")

        # Incorporate feedback
        task = f"{task}\\nPrevious attempt: {solution}\\nFeedback: {feedback}"

    return solution  # Return best attempt
\`\`\`

**Context Window Management**
Optimize context usage across long chains:
\`\`\`python
class ContextManager:
    def __init__(self, max_tokens=4000):
        self.max_tokens = max_tokens
        self.context = []

    def add_context(self, text, priority=1):
        self.context.append({"text": text, "priority": priority})

    def get_optimized_context(self):
        # Sort by priority
        sorted_context = sorted(self.context, key=lambda x: x['priority'], reverse=True)

        # Fit within token limit
        result = []
        token_count = 0

        for item in sorted_context:
            item_tokens = count_tokens(item['text'])
            if token_count + item_tokens <= self.max_tokens:
                result.append(item['text'])
                token_count += item_tokens

        return "\\n".join(result)
\`\`\`
        `
      },
      {
        title: 'Chain Orchestration Strategies',
        content: `
**Strategy 1: Validation Gates**
Ensure quality at each step:
\`\`\`python
def validated_chain(input_data):
    results = []

    for step in chain_steps:
        output = prompt(step.format(input=input_data))

        # Validate output
        is_valid = validate(output, step.validation_rules)

        if not is_valid:
            # Retry with clarification
            output = prompt(f"{step}\\nEnsure you {step.requirements}")

        results.append(output)
        input_data = output

    return results
\`\`\`

**Strategy 2: Ensemble Chaining**
Multiple chains vote on final answer:
\`\`\`python
def ensemble_chain(question):
    chains = [
        analytical_chain,
        creative_chain,
        systematic_chain
    ]

    results = []
    for chain in chains:
        result = chain.execute(question)
        results.append(result)

    # Aggregate results
    final = prompt(f"Synthesize these solutions: {results}")
    return final
\`\`\`

**Strategy 3: Adaptive Chaining**
Modify chain based on intermediate results:
\`\`\`python
def adaptive_chain(problem):
    # Initial analysis
    complexity = prompt(f"Rate complexity of: {problem}")

    if "simple" in complexity:
        return simple_chain(problem)
    elif "moderate" in complexity:
        return moderate_chain(problem)
    else:
        # Complex problem needs decomposition
        sub_problems = prompt(f"Break down: {problem}")
        results = [adaptive_chain(sp) for sp in sub_problems]
        return prompt(f"Combine solutions: {results}")
\`\`\`

**Strategy 4: Streaming Chains**
Process data in chunks:
\`\`\`python
def streaming_chain(data_stream):
    buffer = []
    results = []

    for chunk in data_stream:
        buffer.append(chunk)

        if len(buffer) >= BATCH_SIZE:
            # Process batch
            batch_result = prompt(f"Process: {buffer}")
            results.append(batch_result)

            # Keep summary for context
            buffer = [prompt(f"Summarize: {batch_result}")]

    # Final processing
    return prompt(f"Finalize: {results}")
\`\`\`
        `
      },
      {
        title: 'Error Handling and Recovery',
        content: `
**Common Chain Failures and Solutions:**

1. **Context Overflow**
Problem: Chain accumulates too much context
Solution: Implement summarization steps
\`\`\`python
def manage_context(chain_context, max_size=3000):
    if len(chain_context) > max_size:
        # Summarize older context
        summary = prompt(f"Summarize: {chain_context[:max_size//2]}")
        chain_context = summary + chain_context[max_size//2:]
    return chain_context
\`\`\`

2. **Format Mismatches**
Problem: Output format doesn't match next input expectations
Solution: Add format conversion steps
\`\`\`python
def ensure_format(data, expected_format):
    if not matches_format(data, expected_format):
        data = prompt(f"Convert to {expected_format}: {data}")
    return data
\`\`\`

3. **Cascading Errors**
Problem: Early errors compound through chain
Solution: Implement circuit breakers
\`\`\`python
class ChainCircuitBreaker:
    def __init__(self, error_threshold=0.3):
        self.error_threshold = error_threshold

    def execute_chain(self, steps):
        errors = 0
        results = []

        for step in steps:
            try:
                result = execute_step(step)
                quality = assess_quality(result)

                if quality < 0.5:
                    errors += 1

                if errors / len(results) > self.error_threshold:
                    raise ChainFailure("Too many errors, stopping chain")

                results.append(result)
            except Exception as e:
                # Log and attempt recovery
                result = recovery_prompt(step, str(e))
                results.append(result)

        return results
\`\`\`

4. **Infinite Loops**
Problem: Recursive chains don't terminate
Solution: Implement loop detection
\`\`\`python
def detect_loops(chain_history, current_state, threshold=0.9):
    for previous_state in chain_history[-5:]:
        similarity = calculate_similarity(current_state, previous_state)
        if similarity > threshold:
            return True
    return False
\`\`\`
        `
      },
      {
        title: 'Performance Optimization',
        content: `
**Optimization Techniques:**

1. **Parallel Processing**
\`\`\`python
from concurrent.futures import ThreadPoolExecutor

def optimized_parallel_chain(tasks):
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = [executor.submit(prompt, task) for task in tasks]
        results = [f.result() for f in futures]
    return results
\`\`\`

2. **Caching Intermediate Results**
\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=128)
def cached_prompt(prompt_text):
    return expensive_api_call(prompt_text)

def efficient_chain(input_data):
    # Reuse cached results for repeated prompts
    step1 = cached_prompt(f"Analyze: {input_data}")
    step2 = cached_prompt(f"Expand: {step1}")
    return step2
\`\`\`

3. **Batch Processing**
\`\`\`python
def batch_chain(items, batch_size=10):
    results = []

    for i in range(0, len(items), batch_size):
        batch = items[i:i+batch_size]
        # Process batch in single prompt
        batch_result = prompt(f"Process all: {batch}")
        results.extend(parse_batch_result(batch_result))

    return results
\`\`\`

4. **Lazy Evaluation**
\`\`\`python
class LazyChain:
    def __init__(self):
        self.steps = []

    def add_step(self, prompt_func):
        self.steps.append(prompt_func)
        return self

    def execute(self, input_data):
        result = input_data
        for step in self.steps:
            # Only execute if needed
            if should_execute(step, result):
                result = step(result)
        return result
\`\`\`

**Performance Metrics:**
- Chain completion time
- Tokens per successful outcome
- Error rate per step
- Cache hit rate
- Parallel execution efficiency
        `
      },
      {
        title: 'Real-World Chain Patterns',
        content: `
**Research and Writing Chain**
\`\`\`
1. Query Understanding
   → Parse user intent and requirements

2. Research Planning
   → Identify information needs
   → Generate search queries

3. Information Gathering
   → Execute searches
   → Extract relevant facts

4. Synthesis
   → Organize information
   → Identify patterns and insights

5. Outline Generation
   → Structure the content
   → Prioritize key points

6. Content Creation
   → Write each section
   → Maintain consistency

7. Review and Polish
   → Check accuracy
   → Improve clarity

8. Formatting
   → Apply style guidelines
   → Final presentation
\`\`\`

**Code Generation Chain**
\`\`\`
1. Requirement Analysis
   → Parse specifications
   → Identify constraints

2. Architecture Design
   → Choose patterns
   → Define components

3. Implementation
   → Generate code
   → Handle dependencies

4. Testing
   → Create test cases
   → Validate functionality

5. Optimization
   → Improve performance
   → Refactor for clarity

6. Documentation
   → Generate comments
   → Create usage examples
\`\`\`

**Decision Support Chain**
\`\`\`
1. Problem Definition
   → Clarify objectives
   → Identify stakeholders

2. Data Collection
   → Gather relevant data
   → Validate sources

3. Analysis
   → Statistical analysis
   → Pattern recognition

4. Option Generation
   → Brainstorm solutions
   → Evaluate feasibility

5. Risk Assessment
   → Identify risks
   → Quantify impact

6. Recommendation
   → Synthesize findings
   → Provide action plan
\`\`\`
        `
      }
    ],

    practicalExample: {
      title: 'Building a Research Paper Generator',
      scenario: 'Create a system that generates comprehensive research papers from a topic',
      challenge: 'Transform a simple topic into a full academic paper with citations',
      approach: `
**Implementation of a Research Paper Chain:**

\`\`\`python
class ResearchPaperChain:
    def __init__(self, topic):
        self.topic = topic
        self.context = {"topic": topic}

    def execute(self):
        # Step 1: Topic Expansion
        self.context['expanded'] = prompt(
            f"Expand this research topic with key questions and scope: {self.topic}"
        )

        # Step 2: Literature Review
        search_queries = prompt(
            f"Generate 5 academic search queries for: {self.context['expanded']}"
        )

        # Step 3: Parallel Information Gathering
        sources = []
        for query in search_queries.split('\\n'):
            source = prompt(f"Find key information about: {query}")
            sources.append(source)
        self.context['sources'] = sources

        # Step 4: Thesis Development
        self.context['thesis'] = prompt(
            f"Develop a thesis statement based on: {self.context['sources']}"
        )

        # Step 5: Outline Creation
        self.context['outline'] = prompt(f"""
            Create detailed outline:
            Topic: {self.topic}
            Thesis: {self.context['thesis']}
            Key points from sources: {self.context['sources'][:500]}
        """)

        # Step 6: Section Writing (Parallel)
        sections = []
        for section in self.context['outline'].split('\\n'):
            if section.strip():
                content = prompt(f"""
                    Write academic section:
                    Section: {section}
                    Thesis: {self.context['thesis']}
                    Support with: {self.context['sources'][:300]}
                """)
                sections.append(content)

        # Step 7: Introduction Writing
        introduction = prompt(f"""
            Write compelling introduction:
            Topic: {self.topic}
            Thesis: {self.context['thesis']}
            Preview: {self.context['outline'][:200]}
        """)

        # Step 8: Conclusion Writing
        conclusion = prompt(f"""
            Write strong conclusion:
            Thesis: {self.context['thesis']}
            Key findings: {' '.join(sections)[:500]}
        """)

        # Step 9: Citation Generation
        citations = prompt(f"""
            Generate academic citations for these sources:
            {self.context['sources']}
            Format: APA 7th Edition
        """)

        # Step 10: Final Assembly and Polish
        paper = prompt(f"""
            Assemble and polish academic paper:

            Introduction: {introduction}

            Body Sections: {' '.join(sections)}

            Conclusion: {conclusion}

            References: {citations}

            Ensure smooth transitions and academic tone.
        """)

        # Step 11: Quality Check
        quality_report = prompt(f"""
            Evaluate this paper for:
            - Thesis clarity
            - Argument coherence
            - Evidence support
            - Academic tone
            - Proper citations

            Paper: {paper[:1000]}
        """)

        return {
            "paper": paper,
            "quality_report": quality_report,
            "word_count": len(paper.split())
        }

# Execute the chain
generator = ResearchPaperChain("The impact of AI on employment")
result = generator.execute()
\`\`\`

**Results:**
- Single prompt attempt: Superficial 500-word essay
- Prompt chain result: 3000-word paper with structure
- Quality score: 85% (evaluated by experts)
- Time: 45 seconds (with parallel execution)
- Token usage: ~15,000 tokens
- User satisfaction: 92%
      `
    },

    quiz: [
      {
        question: 'What is the primary advantage of prompt chaining over single prompts?',
        options: [
          'Lower token usage',
          'Faster execution time',
          'Ability to handle complex multi-step tasks',
          'Simpler implementation'
        ],
        correctAnswer: 2,
        explanation: 'Prompt chaining excels at breaking down complex tasks into manageable steps, achieving results impossible with single prompts.'
      },
      {
        question: 'Which pattern is best for processing multiple independent tasks?',
        options: [
          'Sequential chaining',
          'Recursive chaining',
          'Parallel chaining',
          'Linear chaining'
        ],
        correctAnswer: 2,
        explanation: 'Parallel chaining processes independent tasks simultaneously, significantly improving performance for non-dependent operations.'
      }
    ],

    exercises: [
      {
        title: 'Build a Data Analysis Pipeline',
        description: 'Create a prompt chain that takes raw data and produces insights, visualizations, and recommendations',
        hints: [
          'Include data validation step',
          'Parallel process different analyses',
          'Synthesize findings at the end'
        ]
      },
      {
        title: 'Implement Error Recovery Chain',
        description: 'Design a chain with comprehensive error handling and recovery mechanisms',
        hints: [
          'Add validation gates between steps',
          'Implement retry logic',
          'Include fallback prompts'
        ]
      }
    ],

    references: [
      'Wu et al. (2022) - AI Chains: Transparent Multi-Step Reasoning',
      'Chase (2023) - LangChain: Building Applications with LLMs',
      'Microsoft (2024) - Prompt Flow: Orchestrating AI Workflows',
      'Google (2023) - Chain-of-Thought Prompting at Scale'
    ]
  }
};