import { Flashcard } from '../learning-content';

// ===========================================
// PROMPT COMPONENTS FLASHCARDS
// ===========================================

export const promptComponentsFlashcards: Flashcard[] = [
  {
    id: 'pc-role-definition',
    front: 'What is the purpose of role/persona definition in prompts?',
    back: 'Role definition establishes the AI\'s expertise and perspective, like "You are a senior software architect". This primes specific knowledge domains, sets appropriate tone, and ensures consistent responses aligned with that role\'s expertise.',
    difficulty: 'easy',
    topic: 'Prompt Components',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'pc-task-description',
    front: 'What makes an effective task description in a prompt?',
    back: 'An effective task description includes: 1) Clear action verb (analyze, create, summarize), 2) Specific object (what to act on), 3) Success criteria (what constitutes completion), 4) Scope boundaries (what to include/exclude).',
    difficulty: 'medium',
    topic: 'Prompt Components',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'pc-constraints',
    front: 'What types of constraints should prompts include?',
    back: 'Key constraints: Length limits (word/token count), Format requirements (structure, style), Scope boundaries (include/exclude), Tone specifications (formal, casual), Perspective (first-person, objective), Resource limitations (time, tools available).',
    difficulty: 'medium',
    topic: 'Prompt Components',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'pc-format-spec',
    front: 'Why are format specifications crucial in prompts?',
    back: 'Format specifications ensure consistent, parseable output. They define structure (markdown, JSON, tables), organization (headers, sections), data types, and visual layout. This reduces variation and makes outputs immediately usable.',
    difficulty: 'easy',
    topic: 'Prompt Components',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'pc-success-criteria',
    front: 'What are success criteria in prompt engineering?',
    back: 'Success criteria define what constitutes a good response: Completeness (all requirements met), Accuracy standards, Quality thresholds, Performance metrics. They provide measurable goals for the AI to achieve.',
    difficulty: 'medium',
    topic: 'Prompt Components',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'pc-examples',
    front: 'When should you include examples in prompts?',
    back: 'Include examples for: Novel/complex formats, Specific style requirements, Pattern-based tasks, Quality benchmarks, Unusual output structures. Avoid examples for: Simple well-known tasks, When you want creative variation, Zero-shot capable tasks.',
    difficulty: 'hard',
    topic: 'Prompt Components',
    reviewCount: 0,
    correctCount: 0
  }
];

// ===========================================
// ZERO-SHOT PROMPTING FLASHCARDS
// ===========================================

export const zeroShotPromptingFlashcards: Flashcard[] = [
  {
    id: 'zs-definition',
    front: 'What is zero-shot prompting?',
    back: 'Zero-shot prompting is instructing an AI to perform tasks without providing any examples, relying entirely on the model\'s pre-trained knowledge and clear instructions. It\'s the most token-efficient approach.',
    difficulty: 'easy',
    topic: 'Zero-Shot Prompting',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'zs-cot-trigger',
    front: 'What does "Let\'s think step by step" do in zero-shot prompts?',
    back: 'This phrase triggers Chain of Thought (CoT) reasoning without examples, causing the model to break down problems systematically. It improves accuracy on reasoning tasks by 10-40% in zero-shot contexts.',
    difficulty: 'medium',
    topic: 'Zero-Shot Prompting',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'zs-best-use-cases',
    front: 'When is zero-shot prompting most effective?',
    back: 'Zero-shot excels at: Well-defined standard tasks (summarization, translation), Clear instructions tasks, Common operations the model knows, Resource-constrained scenarios, Quick prototyping. It struggles with: Novel formats, Style matching, Complex patterns.',
    difficulty: 'medium',
    topic: 'Zero-Shot Prompting',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'zs-optimization',
    front: 'What are key techniques for optimizing zero-shot prompts?',
    back: 'Key techniques: 1) Role priming (assign expertise), 2) Task decomposition (break into steps), 3) Negative instruction (specify what NOT to do), 4) Metacognitive prompting (ask to consider approach), 5) Self-consistency checking (build verification into prompt).',
    difficulty: 'hard',
    topic: 'Zero-Shot Prompting',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'zs-vs-fewshot',
    front: 'How do you decide between zero-shot and few-shot prompting?',
    back: 'Use zero-shot when: Task is well-defined, Instructions are clear, Token budget is limited, Examples hard to create. Use few-shot when: Need specific format/style, Pattern matching required, Novel task type, Consistency crucial.',
    difficulty: 'medium',
    topic: 'Zero-Shot Prompting',
    reviewCount: 0,
    correctCount: 0
  }
];

// ===========================================
// FEW-SHOT PROMPTING FLASHCARDS
// ===========================================

export const fewShotPromptingFlashcards: Flashcard[] = [
  {
    id: 'fs-definition',
    front: 'What is few-shot prompting?',
    back: 'Few-shot prompting provides 2-5 input-output examples to demonstrate desired patterns before the actual task. It enables pattern learning, format matching, and style consistency without fine-tuning.',
    difficulty: 'easy',
    topic: 'Few-Shot Prompting',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fs-example-selection',
    front: 'What makes good few-shot examples?',
    back: 'Good examples are: Diverse (cover different cases), Representative (typical of task), Clear (unambiguous mapping), Consistent (same format/style), Progressive (simple to complex), Correct (high-quality outputs).',
    difficulty: 'medium',
    topic: 'Few-Shot Prompting',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fs-optimal-number',
    front: 'How many examples should few-shot prompts include?',
    back: 'Typically 2-5 examples. Factors: Task complexity (more complex = more examples), Pattern clarity (subtle patterns = more examples), Token budget (each example costs tokens), Diminishing returns (beyond 5-7 rarely helps).',
    difficulty: 'medium',
    topic: 'Few-Shot Prompting',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fs-format-consistency',
    front: 'Why is format consistency critical in few-shot examples?',
    back: 'The model learns patterns from examples, including formatting. Inconsistent formats confuse pattern recognition, leading to unpredictable outputs. Every example should follow identical structure, style, and conventions.',
    difficulty: 'easy',
    topic: 'Few-Shot Prompting',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fs-common-mistakes',
    front: 'What are common mistakes in few-shot prompting?',
    back: 'Common mistakes: 1) Inconsistent example formats, 2) Biased example selection, 3) Too many similar examples, 4) Examples with errors, 5) Mismatched complexity (examples easier than task), 6) No edge cases covered.',
    difficulty: 'hard',
    topic: 'Few-Shot Prompting',
    reviewCount: 0,
    correctCount: 0
  }
];

// ===========================================
// CHAIN OF THOUGHT FLASHCARDS
// ===========================================

export const chainOfThoughtFlashcards: Flashcard[] = [
  {
    id: 'cot-definition',
    front: 'What is Chain of Thought (CoT) prompting?',
    back: 'CoT prompting guides AI to show step-by-step reasoning before reaching conclusions. It improves accuracy on complex reasoning tasks by making the thinking process explicit and systematic.',
    difficulty: 'easy',
    topic: 'Chain of Thought',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'cot-trigger-phrases',
    front: 'What phrases trigger Chain of Thought reasoning?',
    back: 'Effective triggers: "Let\'s think step by step", "Let\'s work through this systematically", "Show your reasoning", "Break this down", "Think carefully". These activate systematic reasoning pathways.',
    difficulty: 'medium',
    topic: 'Chain of Thought',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'cot-performance-gains',
    front: 'How much does CoT improve task performance?',
    back: 'CoT improves: Math problems by 20-50%, Logic puzzles by 30-40%, Multi-step reasoning by 25-35%, Complex analysis by 15-25%. Gains are highest on tasks requiring systematic decomposition.',
    difficulty: 'medium',
    topic: 'Chain of Thought',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'cot-self-consistency',
    front: 'What is self-consistency in Chain of Thought?',
    back: 'Self-consistency samples multiple reasoning paths and takes majority vote. It reduces errors from single reasoning chains by 5-15%. Especially effective for tasks with multiple valid approaches.',
    difficulty: 'hard',
    topic: 'Chain of Thought',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'cot-limitations',
    front: 'What are the limitations of Chain of Thought prompting?',
    back: 'Limitations: Increases token usage (2-3x), Can introduce reasoning errors, May overthink simple tasks, Not helpful for factual retrieval, Can produce verbose outputs, Sometimes creates false reasoning to justify answers.',
    difficulty: 'hard',
    topic: 'Chain of Thought',
    reviewCount: 0,
    correctCount: 0
  }
];

// ===========================================
// PROMPT CHAINING FLASHCARDS
// ===========================================

export const promptChainingFlashcards: Flashcard[] = [
  {
    id: 'chain-definition',
    front: 'What is prompt chaining?',
    back: 'Prompt chaining connects multiple prompts where outputs from one become inputs to the next. It enables complex multi-step workflows, progressive refinement, and handling tasks too complex for single prompts.',
    difficulty: 'easy',
    topic: 'Prompt Chaining',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'chain-types',
    front: 'What are the main types of prompt chains?',
    back: 'Main types: Sequential (linear A→B→C), Parallel (concurrent processing), Conditional (if-then branching), Iterative (loops with refinement), Hierarchical (parent-child relationships), Hybrid (combining patterns).',
    difficulty: 'medium',
    topic: 'Prompt Chaining',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'chain-state-management',
    front: 'How do you manage state in prompt chains?',
    back: 'State management strategies: Context accumulation (append outputs), Key extraction (pass only relevant parts), Summary propagation (compress information), Variable tracking (maintain key values), Memory systems (vector stores for long chains).',
    difficulty: 'hard',
    topic: 'Prompt Chaining',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'chain-error-handling',
    front: 'How should prompt chains handle errors?',
    back: 'Error handling: Validation gates (check outputs before proceeding), Retry logic (attempt failed steps), Fallback paths (alternative chains), Circuit breakers (stop on critical failures), Error accumulation (track issues for final report).',
    difficulty: 'hard',
    topic: 'Prompt Chaining',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'chain-optimization',
    front: 'How do you optimize prompt chain performance?',
    back: 'Optimization strategies: Parallelize independent steps, Cache repeated operations, Minimize token passing between steps, Use compression/summarization, Implement early termination conditions, Profile bottlenecks.',
    difficulty: 'medium',
    topic: 'Prompt Chaining',
    reviewCount: 0,
    correctCount: 0
  }
];

// ===========================================
// PROMPT METRICS FLASHCARDS
// ===========================================

export const promptMetricsFlashcards: Flashcard[] = [
  {
    id: 'metrics-categories',
    front: 'What are the four main categories of prompt evaluation metrics?',
    back: 'Four categories: 1) Task Performance (accuracy, quality, completeness), 2) Efficiency (tokens, latency, cost), 3) Reliability (consistency, format stability, failure rate), 4) Business Impact (user satisfaction, time saved, ROI).',
    difficulty: 'medium',
    topic: 'Prompt Metrics',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'metrics-ter',
    front: 'What is Token Efficiency Ratio (TER)?',
    back: 'TER = Quality Score / Token Count. It measures output quality per token consumed. Higher TER indicates better prompt efficiency. Used to compare prompts that trade off between quality and token usage.',
    difficulty: 'medium',
    topic: 'Prompt Metrics',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'metrics-ab-testing',
    front: 'What are key considerations for A/B testing prompts?',
    back: 'Key considerations: Define clear hypothesis, Calculate required sample size, Randomize assignment, Control for variables, Use appropriate statistical tests, Consider effect size not just significance, Account for multiple comparisons.',
    difficulty: 'hard',
    topic: 'Prompt Metrics',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'metrics-cohen-d',
    front: 'What is Cohen\'s d and how is it interpreted?',
    back: 'Cohen\'s d measures standardized effect size between two groups. d = (μ₁ - μ₂) / σ_pooled. Interpretation: 0.2 = small effect, 0.5 = medium effect, 0.8 = large effect. Helps determine if statistically significant results are practically meaningful.',
    difficulty: 'hard',
    topic: 'Prompt Metrics',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'metrics-benchmarks',
    front: 'What makes a good prompt evaluation benchmark?',
    back: 'Good benchmarks have: Diverse test cases (easy to complex), Representative real-world examples, Edge cases and adversarial inputs, Clear success criteria, Version control, Regular updates, Statistical validity, Correlation with business metrics.',
    difficulty: 'medium',
    topic: 'Prompt Metrics',
    reviewCount: 0,
    correctCount: 0
  }
];

// ===========================================
// ADVANCED TECHNIQUES FLASHCARDS
// ===========================================

export const advancedTechniquesFlashcards: Flashcard[] = [
  {
    id: 'adv-role-prompting',
    front: 'What makes role-based prompting effective?',
    back: 'Role prompting works by: Activating domain-specific knowledge, Setting appropriate tone/style, Establishing expertise level, Creating consistent perspective. Effective roles are specific ("senior DevOps engineer" vs "technical person").',
    difficulty: 'medium',
    topic: 'Advanced Techniques',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'adv-meta-prompting',
    front: 'What is meta-prompting?',
    back: 'Meta-prompting asks the model to reason about its own approach before executing. Examples: "Before answering, consider the best approach", "Think about potential issues", "Plan your response structure". Improves quality by 10-20%.',
    difficulty: 'hard',
    topic: 'Advanced Techniques',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'adv-tree-of-thought',
    front: 'How does Tree of Thought (ToT) differ from Chain of Thought?',
    back: 'ToT explores multiple reasoning paths with backtracking, while CoT follows single linear path. ToT maintains search tree, evaluates branches, can abandon poor paths. Better for problems with multiple solutions or dead ends.',
    difficulty: 'hard',
    topic: 'Advanced Techniques',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'adv-constitutional-ai',
    front: 'What is constitutional prompting?',
    back: 'Constitutional prompting embeds principles/rules the AI must follow. Example: "Follow these principles: 1) Be helpful, 2) Be harmless, 3) Be honest". It shapes responses to align with specified values and constraints.',
    difficulty: 'medium',
    topic: 'Advanced Techniques',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'adv-prompt-ensembling',
    front: 'What is prompt ensembling?',
    back: 'Prompt ensembling uses multiple prompt variations and aggregates results. Methods: Majority voting, Weighted averaging, Best-of-N selection, Mixture of experts. Reduces variance and improves reliability by 15-25%.',
    difficulty: 'hard',
    topic: 'Advanced Techniques',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'adv-retrieval-augmented',
    front: 'How does Retrieval-Augmented Generation (RAG) enhance prompting?',
    back: 'RAG retrieves relevant context from external knowledge bases and includes it in prompts. Benefits: Current information, Domain expertise, Reduced hallucination, Verifiable sources. Critical for knowledge-intensive tasks.',
    difficulty: 'hard',
    topic: 'Advanced Techniques',
    reviewCount: 0,
    correctCount: 0
  }
];

// ===========================================
// COMMON PITFALLS FLASHCARDS
// ===========================================

export const commonPitfallsFlashcards: Flashcard[] = [
  {
    id: 'pitfall-ambiguity',
    front: 'What is the ambiguity pitfall in prompting?',
    back: 'Ambiguous prompts lead to unpredictable outputs. Common causes: Vague instructions ("make it good"), Unclear pronouns ("fix this"), Undefined terms, Multiple interpretations possible. Solution: Be explicit and specific.',
    difficulty: 'easy',
    topic: 'Common Pitfalls',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'pitfall-overloading',
    front: 'What is cognitive overload in prompts?',
    back: 'Cognitive overload occurs when prompts contain too many simultaneous requirements, complex nested logic, or excessive constraints. It degrades performance. Solution: Break into steps, prioritize requirements, simplify structure.',
    difficulty: 'medium',
    topic: 'Common Pitfalls',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'pitfall-bias',
    front: 'How can prompts introduce bias?',
    back: 'Bias sources: Leading questions ("Why is X bad?"), Loaded language, Non-representative examples, Assumptions in framing. Effects: Skewed outputs, Limited perspectives, Reinforced stereotypes. Mitigation: Neutral language, diverse examples.',
    difficulty: 'medium',
    topic: 'Common Pitfalls',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'pitfall-hallucination',
    front: 'How do prompts influence hallucination rates?',
    back: 'Prompts increase hallucination when: Asking for non-existent information, Requesting excessive detail, Using confident language ("Explain the well-known..."), No uncertainty allowed. Reduce by: Allowing "I don\'t know", Requesting sources, Focusing on known domains.',
    difficulty: 'hard',
    topic: 'Common Pitfalls',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'pitfall-format-rigidity',
    front: 'What is the format rigidity trap?',
    back: 'Over-specifying format can prevent good content. Example: Forcing exactly 3 points when 2 or 4 make more sense. Balance structure with flexibility: "Provide 3-5 key points" vs "Provide exactly 3 points".',
    difficulty: 'medium',
    topic: 'Common Pitfalls',
    reviewCount: 0,
    correctCount: 0
  }
];

// Export all flashcard sets
export const allPromptingFlashcards = [
  ...promptComponentsFlashcards,
  ...zeroShotPromptingFlashcards,
  ...fewShotPromptingFlashcards,
  ...chainOfThoughtFlashcards,
  ...promptChainingFlashcards,
  ...promptMetricsFlashcards,
  ...advancedTechniquesFlashcards,
  ...commonPitfallsFlashcards
];