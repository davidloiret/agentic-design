import { CodeChallenge } from '../learning-content';

// ===========================================
// FEW-SHOT PROMPTING CHALLENGE
// ===========================================

export const implementFewShotChallenge: CodeChallenge = {
  id: 'implement-few-shot',
  title: 'Implement Few-Shot Prompting System',
  description: `Build a few-shot prompting system that can learn patterns from examples and apply them to new inputs.

Your task is to create a system that:
1. Takes a set of input-output examples
2. Constructs an effective few-shot prompt
3. Processes new inputs using the learned pattern
4. Handles different types of tasks (classification, extraction, generation)

This challenge teaches you how to:
- Select representative examples
- Format examples consistently
- Handle edge cases
- Optimize token usage`,

  difficulty: 'medium',
  topic: 'Few-Shot Prompting',

  template: `class FewShotPromptSystem:
    def __init__(self, task_description=""):
        """Initialize the few-shot prompting system."""
        self.task_description = task_description
        self.examples = []
        self.max_examples = 5  # Optimal few-shot range

    def add_example(self, input_text, output_text):
        """
        Add an input-output example for few-shot learning.

        Args:
            input_text: Example input
            output_text: Expected output for this input
        """
        # TODO: Implement example addition with validation
        pass

    def select_best_examples(self, query, n=3):
        """
        Select the most relevant examples for a given query.

        Args:
            query: The new input to process
            n: Number of examples to select

        Returns:
            List of selected examples
        """
        # TODO: Implement smart example selection
        # Consider: similarity, diversity, relevance
        pass

    def construct_prompt(self, query, examples=None):
        """
        Build the complete few-shot prompt.

        Args:
            query: The new input to process
            examples: Specific examples to use (or auto-select)

        Returns:
            Complete formatted prompt string
        """
        # TODO: Build well-structured few-shot prompt
        pass

    def validate_consistency(self):
        """
        Check that all examples follow consistent format.

        Returns:
            (is_valid, issues_list)
        """
        # TODO: Implement format validation
        pass

    def optimize_tokens(self):
        """
        Optimize example selection for token efficiency.

        Returns:
            Optimized examples list
        """
        # TODO: Balance quality vs token usage
        pass`,

  solution: `class FewShotPromptSystem:
    def __init__(self, task_description=""):
        """Initialize the few-shot prompting system."""
        self.task_description = task_description
        self.examples = []
        self.max_examples = 5
        self.format_pattern = None

    def add_example(self, input_text, output_text):
        """Add an input-output example for few-shot learning."""
        if len(self.examples) >= self.max_examples * 2:
            # Keep pool of examples for selection
            print(f"Warning: Example pool size {len(self.examples)} exceeds recommended maximum")

        example = {
            'input': input_text.strip(),
            'output': output_text.strip(),
            'tokens': len(input_text.split()) + len(output_text.split())
        }

        # Detect format pattern from first example
        if not self.examples and not self.format_pattern:
            self.format_pattern = self._detect_format(output_text)

        self.examples.append(example)
        return len(self.examples)

    def select_best_examples(self, query, n=3):
        """Select the most relevant examples for a given query."""
        if not self.examples:
            return []

        n = min(n, len(self.examples), self.max_examples)

        # Score examples by relevance
        scored_examples = []
        for example in self.examples:
            score = self._calculate_relevance(query, example)
            scored_examples.append((score, example))

        # Sort by relevance
        scored_examples.sort(key=lambda x: x[0], reverse=True)

        # Select diverse examples
        selected = []
        selected_texts = set()

        for score, example in scored_examples:
            # Avoid duplicate outputs
            if example['output'] not in selected_texts:
                selected.append(example)
                selected_texts.add(example['output'])
                if len(selected) >= n:
                    break

        return selected

    def construct_prompt(self, query, examples=None):
        """Build the complete few-shot prompt."""
        if examples is None:
            examples = self.select_best_examples(query)

        prompt_parts = []

        # Add task description if provided
        if self.task_description:
            prompt_parts.append(self.task_description)
            prompt_parts.append("")

        # Add examples
        for i, example in enumerate(examples, 1):
            prompt_parts.append(f"Example {i}:")
            prompt_parts.append(f"Input: {example['input']}")
            prompt_parts.append(f"Output: {example['output']}")
            prompt_parts.append("")

        # Add query
        prompt_parts.append("Now process this input:")
        prompt_parts.append(f"Input: {query}")
        prompt_parts.append("Output:")

        return "\\n".join(prompt_parts)

    def validate_consistency(self):
        """Check that all examples follow consistent format."""
        if len(self.examples) < 2:
            return (True, [])

        issues = []

        # Check output format consistency
        output_formats = set()
        for example in self.examples:
            fmt = self._detect_format(example['output'])
            output_formats.add(fmt)

        if len(output_formats) > 1:
            issues.append(f"Inconsistent output formats detected: {output_formats}")

        # Check length variance
        output_lengths = [len(e['output'].split()) for e in self.examples]
        avg_length = sum(output_lengths) / len(output_lengths)
        variance = sum((l - avg_length) ** 2 for l in output_lengths) / len(output_lengths)

        if variance > avg_length * 2:  # High variance threshold
            issues.append(f"High variance in output lengths: {min(output_lengths)}-{max(output_lengths)} words")

        # Check for empty or invalid examples
        for i, example in enumerate(self.examples):
            if not example['input'] or not example['output']:
                issues.append(f"Example {i+1} has empty input or output")

        return (len(issues) == 0, issues)

    def optimize_tokens(self):
        """Optimize example selection for token efficiency."""
        if len(self.examples) <= self.max_examples:
            return self.examples

        # Calculate value score for each example
        scored = []
        for example in self.examples:
            # Prefer shorter examples with clear patterns
            diversity_score = self._calculate_diversity(example, self.examples)
            efficiency = 1.0 / (example['tokens'] + 1)
            value_score = diversity_score * efficiency
            scored.append((value_score, example))

        # Select top examples by value
        scored.sort(key=lambda x: x[0], reverse=True)
        optimized = [example for _, example in scored[:self.max_examples]]

        return optimized

    def _calculate_relevance(self, query, example):
        """Calculate relevance score between query and example."""
        query_words = set(query.lower().split())
        example_words = set(example['input'].lower().split())

        # Jaccard similarity
        intersection = query_words.intersection(example_words)
        union = query_words.union(example_words)

        if not union:
            return 0.0

        return len(intersection) / len(union)

    def _detect_format(self, text):
        """Detect the format pattern of output text."""
        if text.startswith('{') and text.endswith('}'):
            return 'json'
        elif '\\n-' in text or text.startswith('-'):
            return 'list'
        elif '|' in text and '\\n' in text:
            return 'table'
        elif text.count('\\n') > 2:
            return 'multiline'
        else:
            return 'single'

    def _calculate_diversity(self, example, all_examples):
        """Calculate how diverse/unique an example is."""
        if len(all_examples) <= 1:
            return 1.0

        similarities = []
        for other in all_examples:
            if other != example:
                sim = self._calculate_relevance(
                    example['input'],
                    {'input': other['input']}
                )
                similarities.append(sim)

        # Higher diversity = lower average similarity
        avg_similarity = sum(similarities) / len(similarities) if similarities else 0
        return 1.0 - avg_similarity`,

  tests: [
    {
      input: 'Classification task with 3 examples',
      expectedOutput: 'Few-shot prompt with examples and query',
      description: 'Test basic few-shot prompt construction'
    },
    {
      input: 'Inconsistent format examples',
      expectedOutput: 'Validation detects format issues',
      description: 'Test format consistency validation'
    },
    {
      input: 'Token optimization with 10 examples',
      expectedOutput: 'Returns 5 most valuable examples',
      description: 'Test token optimization'
    }
  ],

  hints: [
    'Consider example relevance to the query when selecting',
    'Maintain consistent formatting across all examples',
    'Balance diversity and relevance in example selection',
    'Track token usage for optimization',
    'Validate format consistency before prompt construction'
  ]
};

// ===========================================
// CHAIN OF THOUGHT CHALLENGE
// ===========================================

export const implementCoTPromptChallenge: CodeChallenge = {
  id: 'implement-cot-prompt',
  title: 'Build Chain of Thought Reasoning System',
  description: `Implement a Chain of Thought (CoT) prompting system that guides AI through step-by-step reasoning.

Create a system that:
1. Automatically adds CoT triggers for appropriate tasks
2. Structures multi-step reasoning
3. Implements self-consistency with multiple reasoning paths
4. Validates reasoning steps

Learn how to:
- Identify tasks that benefit from CoT
- Structure reasoning steps
- Implement self-consistency voting
- Handle reasoning errors`,

  difficulty: 'medium',
  topic: 'Chain of Thought',

  template: `class ChainOfThoughtSystem:
    def __init__(self):
        """Initialize the Chain of Thought system."""
        self.reasoning_triggers = [
            "Let's think step by step",
            "Let's work through this systematically",
            "Let's break this down"
        ]

    def identify_task_type(self, prompt):
        """
        Determine if a task benefits from CoT reasoning.

        Returns: 'reasoning', 'factual', 'creative', or 'simple'
        """
        # TODO: Implement task classification
        pass

    def add_cot_trigger(self, prompt, task_type=None):
        """
        Add appropriate CoT trigger to prompt.

        Args:
            prompt: Original prompt
            task_type: Type of task (auto-detect if None)

        Returns:
            Enhanced prompt with CoT trigger
        """
        # TODO: Add appropriate reasoning trigger
        pass

    def structure_reasoning(self, problem):
        """
        Structure a problem for step-by-step reasoning.

        Returns:
            Structured prompt with reasoning steps
        """
        # TODO: Create structured reasoning template
        pass

    def implement_self_consistency(self, prompt, n_paths=3):
        """
        Generate multiple reasoning paths and vote.

        Args:
            prompt: The reasoning prompt
            n_paths: Number of reasoning paths to generate

        Returns:
            (final_answer, reasoning_paths, confidence)
        """
        # TODO: Implement self-consistency voting
        pass

    def validate_reasoning(self, reasoning_text):
        """
        Check reasoning for common errors.

        Returns:
            (is_valid, errors_found)
        """
        # TODO: Validate reasoning steps
        pass`,

  solution: `class ChainOfThoughtSystem:
    def __init__(self):
        """Initialize the Chain of Thought system."""
        self.reasoning_triggers = [
            "Let's think step by step",
            "Let's work through this systematically",
            "Let's break this down",
            "Let me reason through this carefully"
        ]

        # Keywords indicating reasoning tasks
        self.reasoning_keywords = {
            'calculate', 'solve', 'analyze', 'compare', 'evaluate',
            'determine', 'derive', 'prove', 'explain why', 'figure out'
        }

        self.factual_keywords = {
            'what is', 'who is', 'when did', 'where is', 'define'
        }

    def identify_task_type(self, prompt):
        """Determine if a task benefits from CoT reasoning."""
        prompt_lower = prompt.lower()

        # Check for mathematical operations
        if any(op in prompt for op in ['+', '-', '*', '/', '=', '%']):
            return 'reasoning'

        # Check for reasoning keywords
        if any(keyword in prompt_lower for keyword in self.reasoning_keywords):
            return 'reasoning'

        # Check for factual keywords
        if any(keyword in prompt_lower for keyword in self.factual_keywords):
            return 'factual'

        # Check for creative tasks
        if any(word in prompt_lower for word in ['create', 'write', 'generate', 'imagine']):
            return 'creative'

        # Check complexity (multiple sentences, conditions)
        if prompt.count('.') > 2 or 'if' in prompt_lower:
            return 'reasoning'

        return 'simple'

    def add_cot_trigger(self, prompt, task_type=None):
        """Add appropriate CoT trigger to prompt."""
        if task_type is None:
            task_type = self.identify_task_type(prompt)

        if task_type != 'reasoning':
            # CoT not beneficial for this task type
            return prompt

        # Select appropriate trigger based on content
        if 'math' in prompt.lower() or any(op in prompt for op in ['+', '-', '*', '/']):
            trigger = "Let's solve this step by step, showing all calculations:"
        elif 'compare' in prompt.lower():
            trigger = "Let's compare these systematically:"
        elif 'analyze' in prompt.lower():
            trigger = "Let's analyze this step by step:"
        else:
            trigger = self.reasoning_triggers[0]

        # Add trigger appropriately
        if prompt.endswith('?'):
            enhanced = f"{prompt}\\n\\n{trigger}"
        else:
            enhanced = f"{prompt}\\n\\n{trigger}"

        return enhanced

    def structure_reasoning(self, problem):
        """Structure a problem for step-by-step reasoning."""
        structured = []

        # Add problem statement
        structured.append("Problem: " + problem)
        structured.append("")

        # Add reasoning framework
        structured.append("Let me work through this systematically:")
        structured.append("")
        structured.append("Step 1: Understand what we're looking for")
        structured.append("[Identify the goal]")
        structured.append("")
        structured.append("Step 2: Identify given information")
        structured.append("[List what we know]")
        structured.append("")
        structured.append("Step 3: Determine the approach")
        structured.append("[Choose method/strategy]")
        structured.append("")
        structured.append("Step 4: Execute the solution")
        structured.append("[Work through the steps]")
        structured.append("")
        structured.append("Step 5: Verify the result")
        structured.append("[Check the answer]")
        structured.append("")
        structured.append("Final Answer: [Provide clear answer]")

        return "\\n".join(structured)

    def implement_self_consistency(self, prompt, n_paths=3):
        """Generate multiple reasoning paths and vote."""
        import random

        reasoning_paths = []
        answers = []

        # Simulate generating multiple reasoning paths
        # In production, this would call the LLM multiple times
        for i in range(n_paths):
            # Add variation to trigger
            trigger_idx = i % len(self.reasoning_triggers)
            enhanced_prompt = prompt + "\\n\\n" + self.reasoning_triggers[trigger_idx]

            # Simulate reasoning path (in production, call LLM)
            reasoning = f"Reasoning Path {i+1}:\\n"
            reasoning += f"Using approach: {self.reasoning_triggers[trigger_idx]}\\n"

            # Simulate different answers (in production, extract from LLM output)
            # For demo, generate slightly different answers
            base_answer = "42"  # Placeholder
            if random.random() > 0.7:  # 30% chance of different answer
                answer = str(int(base_answer) + random.randint(-2, 2))
            else:
                answer = base_answer

            reasoning += f"Final answer: {answer}"
            reasoning_paths.append(reasoning)
            answers.append(answer)

        # Vote on most common answer
        answer_counts = {}
        for answer in answers:
            answer_counts[answer] = answer_counts.get(answer, 0) + 1

        # Get majority answer
        final_answer = max(answer_counts.keys(), key=lambda k: answer_counts[k])
        confidence = answer_counts[final_answer] / len(answers)

        return (final_answer, reasoning_paths, confidence)

    def validate_reasoning(self, reasoning_text):
        """Check reasoning for common errors."""
        errors = []

        # Check for reasoning steps
        if "step" not in reasoning_text.lower():
            errors.append("No clear reasoning steps found")

        # Check for conclusion
        conclusion_markers = ['therefore', 'thus', 'so', 'final answer', 'conclusion']
        if not any(marker in reasoning_text.lower() for marker in conclusion_markers):
            errors.append("No clear conclusion stated")

        # Check for logical connectors
        connectors = ['because', 'since', 'if', 'then', 'therefore']
        connector_count = sum(1 for c in connectors if c in reasoning_text.lower())
        if connector_count < 2:
            errors.append("Insufficient logical connectors")

        # Check for potential errors
        error_patterns = [
            ('circular reasoning', 'because it is'),
            ('assumption', 'assuming that'),
            ('uncertainty', 'i think', 'maybe', 'probably'),
            ('contradiction', 'but earlier', 'however this contradicts')
        ]

        for pattern_name, *patterns in error_patterns:
            if any(p in reasoning_text.lower() for p in patterns):
                errors.append(f"Potential {pattern_name} detected")

        # Check reasoning length (too short or too long)
        word_count = len(reasoning_text.split())
        if word_count < 50:
            errors.append("Reasoning too brief")
        elif word_count > 1000:
            errors.append("Reasoning excessively verbose")

        is_valid = len(errors) == 0
        return (is_valid, errors)`,

  tests: [
    {
      input: 'Math problem: 25 * 4 + 10',
      expectedOutput: 'Enhanced prompt with step-by-step trigger',
      description: 'Test CoT trigger for math'
    },
    {
      input: 'Self-consistency with 3 paths',
      expectedOutput: 'Majority vote answer with confidence',
      description: 'Test self-consistency voting'
    },
    {
      input: 'Validate reasoning text',
      expectedOutput: 'Validation finds any reasoning errors',
      description: 'Test reasoning validation'
    }
  ],

  hints: [
    'Identify task types that benefit from step-by-step reasoning',
    'Use appropriate triggers for different problem types',
    'Self-consistency improves accuracy through voting',
    'Validate reasoning for logical errors and completeness',
    'Structure templates guide systematic thinking'
  ]
};

// ===========================================
// PROMPT CHAINING CHALLENGE
// ===========================================

export const buildPromptChainChallenge: CodeChallenge = {
  id: 'build-prompt-chain',
  title: 'Build Advanced Prompt Chaining System',
  description: `Create a sophisticated prompt chaining system that orchestrates multiple prompts for complex tasks.

Implement a system that:
1. Manages sequential and parallel prompt chains
2. Handles state passing between prompts
3. Implements error handling and recovery
4. Optimizes chain execution

Master:
- Chain orchestration patterns
- State management strategies
- Error handling and fallbacks
- Performance optimization`,

  difficulty: 'hard',
  topic: 'Prompt Chaining',

  template: `class PromptChainOrchestrator:
    def __init__(self):
        """Initialize the prompt chain orchestrator."""
        self.chains = {}
        self.execution_history = []

    def create_chain(self, chain_id, chain_type='sequential'):
        """
        Create a new prompt chain.

        Args:
            chain_id: Unique identifier for the chain
            chain_type: 'sequential', 'parallel', or 'conditional'
        """
        # TODO: Initialize chain structure
        pass

    def add_prompt(self, chain_id, prompt_config):
        """
        Add a prompt to a chain.

        Args:
            chain_id: Chain to add prompt to
            prompt_config: {
                'id': unique_id,
                'template': prompt_text,
                'depends_on': [previous_prompt_ids],
                'validator': validation_function,
                'fallback': fallback_prompt
            }
        """
        # TODO: Add prompt with dependencies
        pass

    def execute_chain(self, chain_id, initial_input):
        """
        Execute a complete prompt chain.

        Returns:
            {
                'final_output': result,
                'intermediate_results': [...],
                'execution_time': seconds,
                'tokens_used': count
            }
        """
        # TODO: Implement chain execution
        pass

    def parallel_execute(self, prompts, input_data):
        """
        Execute multiple prompts in parallel.

        Returns:
            List of results in order
        """
        # TODO: Implement parallel execution
        pass

    def handle_error(self, error, context):
        """
        Handle errors in chain execution.

        Returns:
            Recovery action or raises exception
        """
        # TODO: Implement error recovery
        pass`,

  solution: `import time
import asyncio
from typing import Dict, List, Any, Optional
from concurrent.futures import ThreadPoolExecutor
import json

class PromptChainOrchestrator:
    def __init__(self):
        """Initialize the prompt chain orchestrator."""
        self.chains = {}
        self.execution_history = []
        self.executor = ThreadPoolExecutor(max_workers=5)

    def create_chain(self, chain_id, chain_type='sequential'):
        """Create a new prompt chain."""
        if chain_id in self.chains:
            raise ValueError(f"Chain {chain_id} already exists")

        self.chains[chain_id] = {
            'type': chain_type,
            'prompts': [],
            'prompt_map': {},
            'state': {},
            'created_at': time.time()
        }
        return chain_id

    def add_prompt(self, chain_id, prompt_config):
        """Add a prompt to a chain."""
        if chain_id not in self.chains:
            raise ValueError(f"Chain {chain_id} not found")

        chain = self.chains[chain_id]
        prompt_id = prompt_config['id']

        # Validate dependencies exist
        depends_on = prompt_config.get('depends_on', [])
        for dep_id in depends_on:
            if dep_id not in chain['prompt_map']:
                raise ValueError(f"Dependency {dep_id} not found")

        # Add prompt to chain
        prompt_node = {
            'id': prompt_id,
            'template': prompt_config['template'],
            'depends_on': depends_on,
            'validator': prompt_config.get('validator'),
            'fallback': prompt_config.get('fallback'),
            'retry_count': prompt_config.get('retry_count', 3),
            'timeout': prompt_config.get('timeout', 30)
        }

        chain['prompts'].append(prompt_node)
        chain['prompt_map'][prompt_id] = prompt_node

        return prompt_id

    def execute_chain(self, chain_id, initial_input):
        """Execute a complete prompt chain."""
        if chain_id not in self.chains:
            raise ValueError(f"Chain {chain_id} not found")

        chain = self.chains[chain_id]
        chain_type = chain['type']

        execution_record = {
            'chain_id': chain_id,
            'start_time': time.time(),
            'initial_input': initial_input,
            'intermediate_results': {},
            'tokens_used': 0
        }

        try:
            if chain_type == 'sequential':
                result = self._execute_sequential(chain, initial_input, execution_record)
            elif chain_type == 'parallel':
                result = self._execute_parallel(chain, initial_input, execution_record)
            elif chain_type == 'conditional':
                result = self._execute_conditional(chain, initial_input, execution_record)
            else:
                raise ValueError(f"Unknown chain type: {chain_type}")

            execution_record['final_output'] = result
            execution_record['execution_time'] = time.time() - execution_record['start_time']
            execution_record['status'] = 'success'

        except Exception as e:
            execution_record['error'] = str(e)
            execution_record['status'] = 'failed'
            execution_record['execution_time'] = time.time() - execution_record['start_time']
            raise

        finally:
            self.execution_history.append(execution_record)

        return {
            'final_output': execution_record.get('final_output'),
            'intermediate_results': execution_record['intermediate_results'],
            'execution_time': execution_record['execution_time'],
            'tokens_used': execution_record['tokens_used']
        }

    def _execute_sequential(self, chain, initial_input, execution_record):
        """Execute prompts sequentially."""
        current_input = initial_input

        for prompt_node in chain['prompts']:
            prompt_id = prompt_node['id']

            # Build context from dependencies
            context = self._build_context(
                prompt_node,
                execution_record['intermediate_results'],
                current_input
            )

            # Execute prompt
            result = self._execute_single_prompt(prompt_node, context, execution_record)

            # Store result
            execution_record['intermediate_results'][prompt_id] = result
            current_input = result

        return current_input

    def _execute_parallel(self, chain, initial_input, execution_record):
        """Execute prompts in parallel where possible."""
        # Group prompts by dependency level
        levels = self._topological_sort(chain['prompts'])

        current_input = initial_input

        for level in levels:
            if len(level) == 1:
                # Single prompt, execute normally
                prompt_node = chain['prompt_map'][level[0]]
                context = self._build_context(
                    prompt_node,
                    execution_record['intermediate_results'],
                    current_input
                )
                result = self._execute_single_prompt(prompt_node, context, execution_record)
                execution_record['intermediate_results'][level[0]] = result
                current_input = result
            else:
                # Multiple prompts, execute in parallel
                prompts = [chain['prompt_map'][pid] for pid in level]
                contexts = [
                    self._build_context(p, execution_record['intermediate_results'], current_input)
                    for p in prompts
                ]

                results = self.parallel_execute(prompts, contexts, execution_record)

                for prompt_id, result in zip(level, results):
                    execution_record['intermediate_results'][prompt_id] = result

                # Aggregate results for next level
                current_input = self._aggregate_results(results)

        return current_input

    def _execute_conditional(self, chain, initial_input, execution_record):
        """Execute prompts conditionally based on results."""
        current_input = initial_input

        for prompt_node in chain['prompts']:
            prompt_id = prompt_node['id']

            # Check conditions
            if 'condition' in prompt_node:
                if not self._evaluate_condition(
                    prompt_node['condition'],
                    execution_record['intermediate_results'],
                    current_input
                ):
                    continue

            # Build context and execute
            context = self._build_context(
                prompt_node,
                execution_record['intermediate_results'],
                current_input
            )
            result = self._execute_single_prompt(prompt_node, context, execution_record)

            execution_record['intermediate_results'][prompt_id] = result
            current_input = result

        return current_input

    def _execute_single_prompt(self, prompt_node, context, execution_record):
        """Execute a single prompt with retry and error handling."""
        prompt_id = prompt_node['id']
        retry_count = prompt_node['retry_count']

        for attempt in range(retry_count):
            try:
                # Format prompt with context
                formatted_prompt = prompt_node['template'].format(**context)

                # Simulate LLM call (in production, actual API call)
                result = self._simulate_llm_call(formatted_prompt)

                # Update token count
                execution_record['tokens_used'] += len(formatted_prompt.split())
                execution_record['tokens_used'] += len(result.split())

                # Validate result if validator provided
                if prompt_node['validator']:
                    is_valid = prompt_node['validator'](result)
                    if not is_valid:
                        raise ValueError(f"Validation failed for prompt {prompt_id}")

                return result

            except Exception as e:
                if attempt == retry_count - 1:
                    # Last attempt, try fallback
                    if prompt_node['fallback']:
                        return self._execute_fallback(prompt_node['fallback'], context)
                    else:
                        raise e
                else:
                    time.sleep(2 ** attempt)  # Exponential backoff

    def parallel_execute(self, prompts, contexts, execution_record):
        """Execute multiple prompts in parallel."""
        futures = []

        for prompt, context in zip(prompts, contexts):
            future = self.executor.submit(
                self._execute_single_prompt,
                prompt,
                context,
                execution_record
            )
            futures.append(future)

        results = [future.result() for future in futures]
        return results

    def handle_error(self, error, context):
        """Handle errors in chain execution."""
        error_type = type(error).__name__

        recovery_strategies = {
            'ValueError': self._handle_validation_error,
            'TimeoutError': self._handle_timeout_error,
            'ConnectionError': self._handle_connection_error
        }

        strategy = recovery_strategies.get(error_type, self._handle_generic_error)
        return strategy(error, context)

    def _build_context(self, prompt_node, intermediate_results, current_input):
        """Build context for prompt execution."""
        context = {'input': current_input}

        # Add dependencies to context
        for dep_id in prompt_node['depends_on']:
            if dep_id in intermediate_results:
                context[dep_id] = intermediate_results[dep_id]

        return context

    def _topological_sort(self, prompts):
        """Sort prompts into execution levels based on dependencies."""
        # Build dependency graph
        graph = {p['id']: p['depends_on'] for p in prompts}
        in_degree = {p['id']: len(p['depends_on']) for p in prompts}

        levels = []

        while in_degree:
            # Find nodes with no dependencies
            current_level = [
                node for node, degree in in_degree.items()
                if degree == 0
            ]

            if not current_level:
                raise ValueError("Circular dependency detected")

            levels.append(current_level)

            # Remove processed nodes and update degrees
            for node in current_level:
                del in_degree[node]
                for other in in_degree:
                    if node in graph.get(other, []):
                        in_degree[other] -= 1

        return levels

    def _aggregate_results(self, results):
        """Aggregate multiple parallel results."""
        if not results:
            return ""

        # Simple aggregation - can be customized
        if isinstance(results[0], dict):
            # Merge dictionaries
            aggregated = {}
            for result in results:
                aggregated.update(result)
            return aggregated
        else:
            # Concatenate strings
            return "\\n".join(str(r) for r in results)

    def _evaluate_condition(self, condition, intermediate_results, current_input):
        """Evaluate a condition for conditional execution."""
        # Simple condition evaluation - can be extended
        return condition(intermediate_results, current_input)

    def _simulate_llm_call(self, prompt):
        """Simulate an LLM API call."""
        # In production, this would be an actual API call
        return f"Response to: {prompt[:50]}..."

    def _execute_fallback(self, fallback, context):
        """Execute fallback prompt."""
        if callable(fallback):
            return fallback(context)
        else:
            return fallback.format(**context)

    def _handle_validation_error(self, error, context):
        """Handle validation errors."""
        return f"Validation failed: {str(error)}. Using default response."

    def _handle_timeout_error(self, error, context):
        """Handle timeout errors."""
        return "Request timed out. Please try with simpler input."

    def _handle_connection_error(self, error, context):
        """Handle connection errors."""
        return "Connection failed. Using cached response."

    def _handle_generic_error(self, error, context):
        """Handle generic errors."""
        return f"Error occurred: {str(error)}. Using fallback."`,

  tests: [
    {
      input: 'Sequential chain with 3 prompts',
      expectedOutput: 'Executes prompts in order with state passing',
      description: 'Test sequential execution'
    },
    {
      input: 'Parallel chain with independent prompts',
      expectedOutput: 'Executes prompts concurrently',
      description: 'Test parallel execution'
    },
    {
      input: 'Error handling with retry and fallback',
      expectedOutput: 'Retries failed prompts and uses fallback',
      description: 'Test error recovery'
    }
  ],

  hints: [
    'Use topological sort for dependency resolution',
    'Implement proper state management between prompts',
    'Handle errors gracefully with retries and fallbacks',
    'Optimize parallel execution for independent prompts',
    'Track execution metrics for analysis'
  ]
};

// ===========================================
// SELF-CONSISTENCY CHALLENGE
// ===========================================

export const implementSelfConsistencyChallenge: CodeChallenge = {
  id: 'implement-self-consistency',
  title: 'Implement Self-Consistency Verification',
  description: `Build a self-consistency system that improves prompt reliability through multiple sampling and voting.

Create a system that:
1. Generates multiple outputs for the same prompt
2. Implements voting mechanisms
3. Calculates confidence scores
4. Handles disagreement resolution

Learn to:
- Sample multiple reasoning paths
- Implement majority voting
- Calculate confidence metrics
- Resolve conflicts intelligently`,

  difficulty: 'hard',
  topic: 'Self-Consistency',

  template: `class SelfConsistencySystem:
    def __init__(self, temperature_range=(0.7, 0.9)):
        """Initialize self-consistency system."""
        self.temperature_range = temperature_range
        self.voting_history = []

    def generate_samples(self, prompt, n_samples=5):
        """
        Generate multiple samples with variation.

        Returns:
            List of generated responses
        """
        # TODO: Generate samples with temperature variation
        pass

    def extract_answer(self, response):
        """
        Extract the answer from a response.

        Returns:
            Extracted answer in normalized form
        """
        # TODO: Implement answer extraction
        pass

    def majority_vote(self, answers):
        """
        Perform majority voting on answers.

        Returns:
            (winning_answer, vote_distribution, confidence)
        """
        # TODO: Implement voting mechanism
        pass

    def weighted_vote(self, answers, weights):
        """
        Perform weighted voting based on quality scores.

        Returns:
            (winning_answer, weighted_scores, confidence)
        """
        # TODO: Implement weighted voting
        pass

    def calculate_agreement(self, responses):
        """
        Calculate agreement metrics between responses.

        Returns:
            Agreement score (0-1)
        """
        # TODO: Calculate inter-response agreement
        pass`,

  solution: `import re
from collections import Counter
from typing import List, Tuple, Dict, Any
import random
import hashlib

class SelfConsistencySystem:
    def __init__(self, temperature_range=(0.7, 0.9)):
        """Initialize self-consistency system."""
        self.temperature_range = temperature_range
        self.voting_history = []
        self.answer_patterns = {
            'number': r'\\b\\d+\\.?\\d*\\b',
            'yes_no': r'\\b(yes|no)\\b',
            'choice': r'\\b([A-D])\\b',
            'text': r'.*'
        }

    def generate_samples(self, prompt, n_samples=5):
        """Generate multiple samples with variation."""
        samples = []

        for i in range(n_samples):
            # Vary temperature for diversity
            temp = random.uniform(*self.temperature_range)

            # Add slight prompt variations for diversity
            variations = [
                prompt,
                prompt + "\\n\\nLet's think about this carefully:",
                prompt + "\\n\\nLet me work through this step-by-step:",
                prompt + "\\n\\nThinking systematically:",
                prompt + "\\n\\nLet me reason through this:",
            ]

            varied_prompt = variations[i % len(variations)]

            # Simulate LLM call with temperature
            # In production, this would be actual API calls
            response = self._simulate_generation(varied_prompt, temp, i)

            samples.append({
                'response': response,
                'temperature': temp,
                'prompt_variation': i % len(variations),
                'raw_text': response
            })

        return samples

    def extract_answer(self, response):
        """Extract the answer from a response."""
        response_lower = response.lower()

        # Try to find explicit answer markers
        answer_markers = [
            r'final answer[:\\s]+([^\\n.]+)',
            r'therefore[:\\s]+([^\\n.]+)',
            r'the answer is[:\\s]+([^\\n.]+)',
            r'conclusion[:\\s]+([^\\n.]+)',
            r'result[:\\s]+([^\\n.]+)'
        ]

        for marker in answer_markers:
            match = re.search(marker, response_lower)
            if match:
                answer = match.group(1).strip()
                return self._normalize_answer(answer)

        # Fallback: extract last number or substantive text
        numbers = re.findall(r'\\b\\d+\\.?\\d*\\b', response)
        if numbers:
            return numbers[-1]

        # Extract last sentence as answer
        sentences = response.strip().split('.')
        if sentences:
            last = sentences[-1].strip()
            if last:
                return self._normalize_answer(last)

        return response.strip()

    def majority_vote(self, answers):
        """Perform majority voting on answers."""
        if not answers:
            return (None, {}, 0.0)

        # Normalize answers for comparison
        normalized = [self._normalize_answer(ans) for ans in answers]

        # Count votes
        vote_counts = Counter(normalized)
        total_votes = len(normalized)

        # Get winner
        winner = vote_counts.most_common(1)[0]
        winning_answer = winner[0]
        winning_votes = winner[1]

        # Calculate vote distribution
        vote_distribution = {
            answer: count / total_votes
            for answer, count in vote_counts.items()
        }

        # Calculate confidence
        confidence = winning_votes / total_votes

        # Add to history
        self.voting_history.append({
            'answers': answers,
            'winner': winning_answer,
            'distribution': vote_distribution,
            'confidence': confidence
        })

        return (winning_answer, vote_distribution, confidence)

    def weighted_vote(self, answers, weights):
        """Perform weighted voting based on quality scores."""
        if not answers or not weights:
            return (None, {}, 0.0)

        if len(answers) != len(weights):
            raise ValueError("Answers and weights must have same length")

        # Normalize weights
        total_weight = sum(weights)
        if total_weight == 0:
            weights = [1.0] * len(weights)
            total_weight = len(weights)

        norm_weights = [w / total_weight for w in weights]

        # Calculate weighted scores
        weighted_scores = {}
        for answer, weight in zip(answers, norm_weights):
            norm_answer = self._normalize_answer(answer)
            weighted_scores[norm_answer] = weighted_scores.get(norm_answer, 0) + weight

        # Get winner
        winning_answer = max(weighted_scores.keys(), key=lambda k: weighted_scores[k])
        confidence = weighted_scores[winning_answer]

        return (winning_answer, weighted_scores, confidence)

    def calculate_agreement(self, responses):
        """Calculate agreement metrics between responses."""
        if len(responses) < 2:
            return 1.0  # Perfect agreement with single response

        # Extract answers
        answers = [self.extract_answer(resp) for resp in responses]
        normalized = [self._normalize_answer(ans) for ans in answers]

        # Calculate pairwise agreement
        agreement_scores = []

        for i in range(len(normalized)):
            for j in range(i + 1, len(normalized)):
                # Calculate similarity
                similarity = self._calculate_similarity(normalized[i], normalized[j])
                agreement_scores.append(similarity)

        # Return average agreement
        if agreement_scores:
            return sum(agreement_scores) / len(agreement_scores)
        return 0.0

    def _normalize_answer(self, answer):
        """Normalize answer for comparison."""
        if not answer:
            return ""

        answer_str = str(answer).lower().strip()

        # Remove punctuation and extra spaces
        answer_str = re.sub(r'[^\\w\\s.-]', '', answer_str)
        answer_str = re.sub(r'\\s+', ' ', answer_str)

        # Normalize numbers
        numbers = re.findall(r'\\d+\\.?\\d*', answer_str)
        if numbers:
            # If answer is primarily numeric, return the number
            try:
                return str(float(numbers[0]))
            except ValueError:
                pass

        # Normalize yes/no
        if answer_str in ['yes', 'y', 'true', 'correct', 'right']:
            return 'yes'
        elif answer_str in ['no', 'n', 'false', 'incorrect', 'wrong']:
            return 'no'

        return answer_str

    def _calculate_similarity(self, text1, text2):
        """Calculate similarity between two texts."""
        if text1 == text2:
            return 1.0

        # Try numeric comparison
        try:
            num1 = float(text1)
            num2 = float(text2)
            # Calculate relative similarity for numbers
            if num1 == 0 and num2 == 0:
                return 1.0
            max_val = max(abs(num1), abs(num2))
            diff = abs(num1 - num2)
            return max(0, 1 - diff / max_val)
        except (ValueError, TypeError):
            pass

        # Calculate text similarity (Jaccard similarity)
        words1 = set(text1.split())
        words2 = set(text2.split())

        if not words1 and not words2:
            return 1.0
        if not words1 or not words2:
            return 0.0

        intersection = words1.intersection(words2)
        union = words1.union(words2)

        return len(intersection) / len(union)

    def _simulate_generation(self, prompt, temperature, seed):
        """Simulate LLM generation with variation."""
        # In production, this would be an actual LLM API call
        random.seed(hashlib.md5(f"{prompt}{seed}".encode()).hexdigest())

        # Simulate different reasoning paths
        reasoning_templates = [
            "Let me think about this.\\n{analysis}\\nFinal answer: {answer}",
            "Working through this step by step:\\n{analysis}\\nTherefore: {answer}",
            "Analyzing the problem:\\n{analysis}\\nThe answer is: {answer}",
            "After careful consideration:\\n{analysis}\\nConclusion: {answer}"
        ]

        template = reasoning_templates[seed % len(reasoning_templates)]

        # Generate mock analysis and answer
        if "calculate" in prompt.lower() or "solve" in prompt.lower():
            # Math problem
            answer = 42 + random.randint(-5, 5) if temperature > 0.8 else 42
            analysis = f"Calculating... {answer}"
        elif "yes" in prompt.lower() or "no" in prompt.lower():
            # Yes/no question
            answer = "yes" if random.random() > 0.3 else "no"
            analysis = f"Considering the factors... {answer}"
        else:
            # General question
            answer = f"answer_{seed}"
            analysis = f"Analyzing the question... {answer}"

        return template.format(analysis=analysis, answer=answer)`,

  tests: [
    {
      input: 'Generate 5 samples of math problem',
      expectedOutput: '5 diverse responses with answers',
      description: 'Test sample generation'
    },
    {
      input: 'Majority vote on answers',
      expectedOutput: 'Winner with confidence score',
      description: 'Test voting mechanism'
    },
    {
      input: 'Calculate agreement between responses',
      expectedOutput: 'Agreement score between 0-1',
      description: 'Test agreement calculation'
    }
  ],

  hints: [
    'Vary temperature to get diverse samples',
    'Normalize answers before voting',
    'Consider different answer types (numeric, text, yes/no)',
    'Weight votes by response quality when available',
    'Track voting history for analysis'
  ]
};

// ===========================================
// A/B TESTING CHALLENGE
// ===========================================

export const implementPromptTestingChallenge: CodeChallenge = {
  id: 'implement-prompt-testing',
  title: 'Build Prompt A/B Testing Framework',
  description: `Create a comprehensive A/B testing framework for prompt optimization.

Implement a system that:
1. Designs and runs A/B tests
2. Calculates statistical significance
3. Tracks multiple metrics
4. Provides actionable insights

Master:
- Experiment design
- Statistical analysis
- Metric tracking
- Decision making`,

  difficulty: 'hard',
  topic: 'A/B Testing',

  template: `class PromptABTestingFramework:
    def __init__(self):
        """Initialize A/B testing framework."""
        self.experiments = {}
        self.results = {}

    def create_experiment(self, experiment_id, config):
        """
        Create a new A/B test experiment.

        config = {
            'control': control_prompt,
            'treatment': treatment_prompt,
            'metrics': ['accuracy', 'latency', 'cost'],
            'sample_size': required_samples,
            'significance_level': 0.05
        }
        """
        # TODO: Set up experiment
        pass

    def run_test(self, experiment_id, test_input):
        """
        Run a single test in the experiment.

        Returns:
            Test results for both variants
        """
        # TODO: Execute test on both variants
        pass

    def calculate_significance(self, experiment_id):
        """
        Calculate statistical significance.

        Returns:
            (is_significant, p_value, confidence_interval)
        """
        # TODO: Implement statistical testing
        pass

    def calculate_sample_size(self, effect_size, power=0.8):
        """
        Calculate required sample size.

        Returns:
            Required samples per variant
        """
        # TODO: Implement sample size calculation
        pass

    def get_recommendation(self, experiment_id):
        """
        Provide recommendation based on results.

        Returns:
            Recommendation with reasoning
        """
        # TODO: Analyze and recommend
        pass`,

  solution: `import numpy as np
from scipy import stats
import json
from dataclasses import dataclass
from typing import Dict, List, Tuple, Any
import time
import random

@dataclass
class ExperimentConfig:
    control: str
    treatment: str
    metrics: List[str]
    sample_size: int
    significance_level: float = 0.05
    power: float = 0.8

class PromptABTestingFramework:
    def __init__(self):
        """Initialize A/B testing framework."""
        self.experiments = {}
        self.results = {}
        self.metrics_registry = {
            'accuracy': self._measure_accuracy,
            'latency': self._measure_latency,
            'cost': self._measure_cost,
            'quality': self._measure_quality,
            'tokens': self._measure_tokens
        }

    def create_experiment(self, experiment_id, config):
        """Create a new A/B test experiment."""
        if experiment_id in self.experiments:
            raise ValueError(f"Experiment {experiment_id} already exists")

        exp_config = ExperimentConfig(**config) if isinstance(config, dict) else config

        self.experiments[experiment_id] = exp_config
        self.results[experiment_id] = {
            'control': {'samples': [], 'metrics': {m: [] for m in exp_config.metrics}},
            'treatment': {'samples': [], 'metrics': {m: [] for m in exp_config.metrics}},
            'metadata': {
                'start_time': time.time(),
                'status': 'running',
                'samples_collected': 0
            }
        }

        return experiment_id

    def run_test(self, experiment_id, test_input):
        """Run a single test in the experiment."""
        if experiment_id not in self.experiments:
            raise ValueError(f"Experiment {experiment_id} not found")

        exp = self.experiments[experiment_id]
        results = self.results[experiment_id]

        # Randomly assign to control or treatment
        variant = 'control' if random.random() < 0.5 else 'treatment'
        prompt = exp.control if variant == 'control' else exp.treatment

        # Run test
        test_result = self._execute_prompt_test(prompt, test_input)

        # Measure metrics
        for metric in exp.metrics:
            if metric in self.metrics_registry:
                value = self.metrics_registry[metric](test_result)
                results[variant]['metrics'][metric].append(value)

        # Store sample
        results[variant]['samples'].append({
            'input': test_input,
            'output': test_result['output'],
            'timestamp': time.time()
        })

        # Update metadata
        results['metadata']['samples_collected'] += 1

        # Check if enough samples collected
        control_samples = len(results['control']['samples'])
        treatment_samples = len(results['treatment']['samples'])

        if control_samples >= exp.sample_size and treatment_samples >= exp.sample_size:
            results['metadata']['status'] = 'complete'

        return {
            'variant': variant,
            'result': test_result,
            'metrics': {
                m: results[variant]['metrics'][m][-1]
                for m in exp.metrics
            }
        }

    def calculate_significance(self, experiment_id):
        """Calculate statistical significance."""
        if experiment_id not in self.experiments:
            raise ValueError(f"Experiment {experiment_id} not found")

        exp = self.experiments[experiment_id]
        results = self.results[experiment_id]

        significance_results = {}

        for metric in exp.metrics:
            control_data = results['control']['metrics'][metric]
            treatment_data = results['treatment']['metrics'][metric]

            if len(control_data) < 2 or len(treatment_data) < 2:
                significance_results[metric] = {
                    'is_significant': False,
                    'p_value': None,
                    'confidence_interval': None,
                    'error': 'Insufficient data'
                }
                continue

            # Perform t-test
            t_stat, p_value = stats.ttest_ind(control_data, treatment_data)

            # Calculate confidence interval
            control_mean = np.mean(control_data)
            treatment_mean = np.mean(treatment_data)
            diff_mean = treatment_mean - control_mean

            control_std = np.std(control_data, ddof=1)
            treatment_std = np.std(treatment_data, ddof=1)

            n_control = len(control_data)
            n_treatment = len(treatment_data)

            # Standard error of difference
            se_diff = np.sqrt(control_std**2/n_control + treatment_std**2/n_treatment)

            # 95% confidence interval
            ci_lower = diff_mean - 1.96 * se_diff
            ci_upper = diff_mean + 1.96 * se_diff

            # Calculate effect size (Cohen's d)
            pooled_std = np.sqrt(((n_control-1)*control_std**2 + (n_treatment-1)*treatment_std**2) / (n_control+n_treatment-2))
            cohens_d = diff_mean / pooled_std if pooled_std > 0 else 0

            significance_results[metric] = {
                'is_significant': p_value < exp.significance_level,
                'p_value': p_value,
                'confidence_interval': (ci_lower, ci_upper),
                't_statistic': t_stat,
                'effect_size': cohens_d,
                'control_mean': control_mean,
                'treatment_mean': treatment_mean,
                'difference': diff_mean,
                'relative_improvement': (diff_mean / control_mean * 100) if control_mean != 0 else 0
            }

        return significance_results

    def calculate_sample_size(self, effect_size, power=0.8, significance=0.05):
        """Calculate required sample size."""
        # Using formula for two-sample t-test
        # n = 2 * ((z_alpha + z_beta) / effect_size)^2

        z_alpha = stats.norm.ppf(1 - significance/2)  # Two-tailed
        z_beta = stats.norm.ppf(power)

        n = 2 * ((z_alpha + z_beta) / effect_size) ** 2

        return int(np.ceil(n))

    def get_recommendation(self, experiment_id):
        """Provide recommendation based on results."""
        if experiment_id not in self.experiments:
            raise ValueError(f"Experiment {experiment_id} not found")

        results = self.results[experiment_id]

        if results['metadata']['status'] != 'complete':
            return {
                'recommendation': 'Continue testing',
                'reason': 'Insufficient data',
                'confidence': 'Low',
                'details': f"Collected {results['metadata']['samples_collected']} samples"
            }

        # Calculate significance
        sig_results = self.calculate_significance(experiment_id)

        # Analyze results
        treatment_wins = 0
        control_wins = 0
        significant_metrics = []

        for metric, result in sig_results.items():
            if result.get('is_significant'):
                significant_metrics.append(metric)
                if result['difference'] > 0:
                    treatment_wins += 1
                else:
                    control_wins += 1

        # Generate recommendation
        if not significant_metrics:
            recommendation = {
                'recommendation': 'No significant difference',
                'winner': 'Neither',
                'reason': 'No metrics showed statistically significant differences',
                'confidence': 'Low',
                'action': 'Consider extending test or checking for practical significance'
            }
        elif treatment_wins > control_wins:
            recommendation = {
                'recommendation': 'Deploy treatment',
                'winner': 'Treatment',
                'reason': f"Treatment significantly better on {treatment_wins} metrics",
                'confidence': 'High' if treatment_wins >= 2 else 'Medium',
                'improvements': {
                    m: f"{sig_results[m]['relative_improvement']:.1f}%"
                    for m in significant_metrics
                    if sig_results[m]['difference'] > 0
                },
                'action': 'Proceed with treatment prompt'
            }
        else:
            recommendation = {
                'recommendation': 'Keep control',
                'winner': 'Control',
                'reason': f"Control significantly better on {control_wins} metrics",
                'confidence': 'High' if control_wins >= 2 else 'Medium',
                'action': 'Maintain current prompt'
            }

        # Add detailed statistics
        recommendation['statistics'] = {
            metric: {
                'p_value': result['p_value'],
                'effect_size': result['effect_size'],
                'improvement': f"{result['relative_improvement']:.1f}%"
            }
            for metric, result in sig_results.items()
            if result.get('p_value') is not None
        }

        recommendation['test_duration'] = time.time() - results['metadata']['start_time']
        recommendation['total_samples'] = results['metadata']['samples_collected']

        return recommendation

    def _execute_prompt_test(self, prompt, test_input):
        """Execute prompt test (simulated)."""
        # In production, this would call actual LLM API
        start_time = time.time()

        # Simulate execution
        output = f"Response to: {test_input[:30]}... using prompt template"
        latency = random.uniform(0.5, 2.0)  # seconds
        tokens = len(prompt.split()) + len(output.split())

        # Simulate quality and accuracy
        quality = random.uniform(0.6, 1.0)
        accuracy = random.uniform(0.7, 1.0)

        return {
            'output': output,
            'latency': latency,
            'tokens': tokens,
            'quality': quality,
            'accuracy': accuracy,
            'cost': tokens * 0.00002  # Simulated cost
        }

    def _measure_accuracy(self, result):
        """Measure accuracy metric."""
        return result.get('accuracy', 0.0)

    def _measure_latency(self, result):
        """Measure latency metric."""
        return result.get('latency', 0.0)

    def _measure_cost(self, result):
        """Measure cost metric."""
        return result.get('cost', 0.0)

    def _measure_quality(self, result):
        """Measure quality metric."""
        return result.get('quality', 0.0)

    def _measure_tokens(self, result):
        """Measure token usage."""
        return result.get('tokens', 0)`,

  tests: [
    {
      input: 'Create experiment with metrics',
      expectedOutput: 'Experiment created and configured',
      description: 'Test experiment setup'
    },
    {
      input: 'Run 100 tests and calculate significance',
      expectedOutput: 'Statistical significance calculated',
      description: 'Test statistical analysis'
    },
    {
      input: 'Get recommendation from results',
      expectedOutput: 'Actionable recommendation with reasoning',
      description: 'Test decision making'
    }
  ],

  hints: [
    'Use proper statistical tests (t-test for continuous metrics)',
    'Calculate effect size in addition to p-values',
    'Consider multiple metrics in recommendations',
    'Track metadata for experiment analysis',
    'Provide confidence intervals for transparency'
  ]
};

// ===========================================
// PROMPT TEMPLATE LIBRARY CHALLENGE
// ===========================================

export const buildPromptLibraryChallenge: CodeChallenge = {
  id: 'build-prompt-library',
  title: 'Build Reusable Prompt Template Library',
  description: `Create a production-ready prompt template library with versioning and optimization.

Build a system that:
1. Manages reusable prompt templates
2. Supports variable substitution
3. Tracks performance metrics
4. Implements version control

Master:
- Template design patterns
- Variable management
- Performance tracking
- Version control`,

  difficulty: 'expert',
  topic: 'Prompt Templates',

  template: `class PromptTemplateLibrary:
    def __init__(self):
        """Initialize prompt template library."""
        self.templates = {}
        self.versions = {}
        self.metrics = {}

    def register_template(self, template_id, template_config):
        """
        Register a new prompt template.

        template_config = {
            'template': template_string,
            'variables': ['var1', 'var2'],
            'metadata': {...},
            'validators': [...]
        }
        """
        # TODO: Register template with validation
        pass

    def render_template(self, template_id, variables):
        """
        Render template with variables.

        Returns:
            Rendered prompt string
        """
        # TODO: Implement safe template rendering
        pass

    def optimize_template(self, template_id, test_data):
        """
        Optimize template based on performance data.

        Returns:
            Optimized template version
        """
        # TODO: Implement template optimization
        pass

    def version_template(self, template_id, new_template):
        """
        Create new version of template.

        Returns:
            New version identifier
        """
        # TODO: Implement versioning
        pass

    def get_best_template(self, category, context=None):
        """
        Get best performing template for category.

        Returns:
            Template ID and rendered prompt
        """
        # TODO: Select best template based on metrics
        pass`,

  solution: `import json
import hashlib
import time
from typing import Dict, List, Any, Optional
from string import Template
import re
from collections import defaultdict

class PromptTemplateLibrary:
    def __init__(self):
        """Initialize prompt template library."""
        self.templates = {}
        self.versions = {}
        self.metrics = defaultdict(lambda: {
            'usage_count': 0,
            'success_rate': 0.0,
            'avg_quality': 0.0,
            'avg_tokens': 0,
            'feedback_scores': []
        })
        self.categories = defaultdict(list)
        self.active_versions = {}

    def register_template(self, template_id, template_config):
        """Register a new prompt template."""
        if template_id in self.templates and template_id not in self.versions:
            # First versioning of existing template
            self.versions[template_id] = {
                'v1.0': self.templates[template_id]
            }

        # Validate template
        self._validate_template(template_config)

        # Extract variables from template
        variables = self._extract_variables(template_config['template'])

        # Create template object
        template_obj = {
            'id': template_id,
            'template': template_config['template'],
            'variables': variables,
            'required_variables': template_config.get('required_variables', variables),
            'optional_variables': template_config.get('optional_variables', []),
            'metadata': template_config.get('metadata', {}),
            'validators': template_config.get('validators', []),
            'category': template_config.get('category', 'general'),
            'created_at': time.time(),
            'version': template_config.get('version', 'v1.0')
        }

        # Store template
        self.templates[template_id] = template_obj

        # Track active version
        self.active_versions[template_id] = template_obj['version']

        # Add to category
        category = template_obj['category']
        if template_id not in self.categories[category]:
            self.categories[category].append(template_id)

        return template_id

    def render_template(self, template_id, variables):
        """Render template with variables."""
        if template_id not in self.templates:
            raise ValueError(f"Template {template_id} not found")

        template_obj = self._get_active_template(template_id)

        # Validate required variables
        missing_vars = set(template_obj['required_variables']) - set(variables.keys())
        if missing_vars:
            raise ValueError(f"Missing required variables: {missing_vars}")

        # Add default values for optional variables
        render_vars = {}
        for var in template_obj['optional_variables']:
            render_vars[var] = variables.get(var, template_obj['metadata'].get(f'default_{var}', ''))
        render_vars.update(variables)

        # Validate variables using validators
        for validator in template_obj['validators']:
            if not validator(render_vars):
                raise ValueError(f"Variable validation failed")

        # Render template
        try:
            # Support both $\{var\} and {var} syntax
            template_str = template_obj['template']

            # Replace $\{var\} with {var} for Python formatting
            template_str = re.sub(r'\\$\\{([^}]+)\\}', r'{\\1}', template_str)

            # Handle conditional sections
            template_str = self._process_conditionals(template_str, render_vars)

            # Render variables
            rendered = template_str.format(**render_vars)

            # Track usage
            self._track_usage(template_id)

            return rendered

        except KeyError as e:
            raise ValueError(f"Template variable {e} not found in provided variables")

    def optimize_template(self, template_id, test_data):
        """Optimize template based on performance data."""
        if template_id not in self.templates:
            raise ValueError(f"Template {template_id} not found")

        current_template = self._get_active_template(template_id)
        metrics = self.metrics[template_id]

        # Analyze performance
        optimizations = []

        # Check if template is too long
        if metrics['avg_tokens'] > 500:
            optimizations.append('shorten')

        # Check if success rate is low
        if metrics['success_rate'] < 0.7:
            optimizations.append('clarify')

        # Check feedback scores
        if metrics['feedback_scores'] and np.mean(metrics['feedback_scores']) < 3.5:
            optimizations.append('improve_quality')

        # Generate optimized version
        optimized = self._apply_optimizations(current_template, optimizations, test_data)

        # Create new version
        new_version = self.version_template(template_id, optimized)

        # Run A/B test to validate improvement
        if test_data:
            improvement = self._test_improvement(current_template, optimized, test_data)

            if improvement > 0.1:  # 10% improvement threshold
                self.active_versions[template_id] = new_version
                return optimized

        return current_template

    def version_template(self, template_id, new_template):
        """Create new version of template."""
        if template_id not in self.templates:
            raise ValueError(f"Template {template_id} not found")

        # Initialize version history if needed
        if template_id not in self.versions:
            self.versions[template_id] = {}
            current = self.templates[template_id]
            self.versions[template_id][current['version']] = current.copy()

        # Generate new version number
        versions = list(self.versions[template_id].keys())
        latest_version = sorted(versions, key=lambda v: float(v[1:]))[-1]
        major, minor = latest_version[1:].split('.')
        new_version_num = f"v{major}.{int(minor) + 1}"

        # Create new version
        if isinstance(new_template, str):
            new_template_obj = self.templates[template_id].copy()
            new_template_obj['template'] = new_template
        else:
            new_template_obj = new_template

        new_template_obj['version'] = new_version_num
        new_template_obj['created_at'] = time.time()
        new_template_obj['parent_version'] = latest_version

        # Store version
        self.versions[template_id][new_version_num] = new_template_obj

        # Update main template if specified
        if new_template_obj.get('make_active', False):
            self.templates[template_id] = new_template_obj
            self.active_versions[template_id] = new_version_num

        return new_version_num

    def get_best_template(self, category, context=None):
        """Get best performing template for category."""
        if category not in self.categories:
            raise ValueError(f"Category {category} not found")

        template_ids = self.categories[category]
        if not template_ids:
            return None, None

        # Score templates
        scores = {}
        for template_id in template_ids:
            score = self._calculate_template_score(template_id, context)
            scores[template_id] = score

        # Get best template
        best_template_id = max(scores.keys(), key=lambda k: scores[k])

        # Render with context if provided
        if context:
            try:
                rendered = self.render_template(best_template_id, context)
            except Exception:
                # Fallback to template without rendering
                rendered = self.templates[best_template_id]['template']
        else:
            rendered = self.templates[best_template_id]['template']

        return best_template_id, rendered

    def _validate_template(self, template_config):
        """Validate template configuration."""
        if 'template' not in template_config:
            raise ValueError("Template must include 'template' field")

        template_str = template_config['template']

        # Check for balanced braces
        if template_str.count('{') != template_str.count('}'):
            raise ValueError("Unbalanced braces in template")

        # Check for invalid variable names
        variables = self._extract_variables(template_str)
        for var in variables:
            if not var.replace('_', '').isalnum():
                raise ValueError(f"Invalid variable name: {var}")

    def _extract_variables(self, template_str):
        """Extract variables from template string."""
        # Find {var} and $\{var\} patterns
        pattern1 = re.findall(r'\\{([^{}]+)\\}', template_str)
        pattern2 = re.findall(r'\\$\\{([^}]+)\\}', template_str)

        variables = list(set(pattern1 + pattern2))

        # Filter out conditionals
        variables = [v for v in variables if not v.startswith('if ') and not v.startswith('endif')]

        return variables

    def _process_conditionals(self, template_str, variables):
        """Process conditional sections in template."""
        # Simple conditional processing
        # {if var}...{endif} syntax

        def replace_conditional(match):
            condition = match.group(1).strip()
            content = match.group(2)

            # Simple variable existence check
            if condition in variables and variables[condition]:
                return content
            return ''

        # Process conditionals
        pattern = r'\\{if ([^}]+)\\}(.*?)\\{endif\\}'
        processed = re.sub(pattern, replace_conditional, template_str, flags=re.DOTALL)

        return processed

    def _get_active_template(self, template_id):
        """Get active version of template."""
        if template_id in self.versions:
            active_version = self.active_versions.get(template_id, 'v1.0')
            if active_version in self.versions[template_id]:
                return self.versions[template_id][active_version]

        return self.templates[template_id]

    def _track_usage(self, template_id):
        """Track template usage."""
        self.metrics[template_id]['usage_count'] += 1

    def _calculate_template_score(self, template_id, context):
        """Calculate template performance score."""
        metrics = self.metrics[template_id]

        # Base score from metrics
        score = 0.0

        # Success rate (40% weight)
        score += metrics['success_rate'] * 0.4

        # Quality score (30% weight)
        score += metrics['avg_quality'] * 0.3

        # Usage frequency (10% weight) - popular templates
        usage_score = min(metrics['usage_count'] / 100, 1.0)
        score += usage_score * 0.1

        # Efficiency (20% weight) - prefer shorter templates
        if metrics['avg_tokens'] > 0:
            efficiency = max(0, 1 - metrics['avg_tokens'] / 1000)
            score += efficiency * 0.2

        # Context relevance bonus
        if context:
            template = self.templates[template_id]
            required_vars = set(template['required_variables'])
            provided_vars = set(context.keys())

            # Bonus for matching required variables
            if required_vars.issubset(provided_vars):
                score += 0.1

        return score

    def _apply_optimizations(self, template, optimizations, test_data):
        """Apply optimizations to template."""
        optimized = template.copy()

        for opt in optimizations:
            if opt == 'shorten':
                # Remove redundant phrases
                optimized['template'] = self._shorten_template(optimized['template'])

            elif opt == 'clarify':
                # Add clarifying instructions
                optimized['template'] = self._clarify_template(optimized['template'])

            elif opt == 'improve_quality':
                # Add quality-improving elements
                optimized['template'] = self._improve_quality(optimized['template'])

        return optimized

    def _shorten_template(self, template_str):
        """Shorten template by removing redundancy."""
        # Remove repeated instructions
        lines = template_str.split('\\n')
        seen = set()
        shortened = []

        for line in lines:
            if line.strip() and line.strip() not in seen:
                shortened.append(line)
                seen.add(line.strip())

        return '\\n'.join(shortened)

    def _clarify_template(self, template_str):
        """Add clarifying instructions."""
        clarifications = [
            "Be specific and precise in your response.",
            "Focus on the key requirements.",
            "Provide clear, actionable information."
        ]

        # Add clarification if not present
        if not any(c.lower() in template_str.lower() for c in clarifications):
            template_str = clarifications[0] + "\\n\\n" + template_str

        return template_str

    def _improve_quality(self, template_str):
        """Improve template quality."""
        improvements = {
            'structure': "\\n\\nStructure your response with clear sections.",
            'examples': "\\n\\nInclude relevant examples where appropriate.",
            'reasoning': "\\n\\nExplain your reasoning when applicable."
        }

        # Add quality improvements
        for key, improvement in improvements.items():
            if key not in template_str.lower():
                template_str += improvement
                break  # Add one improvement at a time

        return template_str

    def _test_improvement(self, old_template, new_template, test_data):
        """Test if new template is better than old."""
        # Simplified testing - in production would run actual tests
        old_score = 0.7  # Simulated baseline
        new_score = 0.8  # Simulated improvement

        return new_score - old_score`,

  tests: [
    {
      input: 'Register template with variables',
      expectedOutput: 'Template registered and validated',
      description: 'Test template registration'
    },
    {
      input: 'Render template with context',
      expectedOutput: 'Rendered prompt with substituted variables',
      description: 'Test template rendering'
    },
    {
      input: 'Get best template for category',
      expectedOutput: 'Returns highest performing template',
      description: 'Test template selection'
    }
  ],

  hints: [
    'Use safe variable substitution to prevent injection',
    'Track performance metrics for optimization',
    'Implement versioning for rollback capability',
    'Support conditional sections in templates',
    'Consider context when selecting templates'
  ]
};

// Export all code challenges
export const allPromptingCodeChallenges = [
  implementFewShotChallenge,
  implementCoTPromptChallenge,
  buildPromptChainChallenge,
  implementSelfConsistencyChallenge,
  implementPromptTestingChallenge,
  buildPromptLibraryChallenge
];