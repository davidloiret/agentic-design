import { TheoryLesson } from '../../knowledge-representation/theory-lessons/types';

export const whatIsPromptingLesson: TheoryLesson = {
  id: 'what-is-prompting',
  title: 'Introduction to Prompt Engineering',
  description: 'Master the fundamentals of prompt engineering - the art and science of effectively communicating with AI systems to achieve desired outcomes',

  learningObjectives: [
    'Understand what prompt engineering is and why it has become critical in the AI era',
    'Learn the core principles that make prompts effective',
    'Recognize different types of prompts and their applications',
    'Master the fundamental components of well-structured prompts',
    'Understand how prompts influence AI behavior and output quality'
  ],

  prerequisites: [],

  sections: [
    {
      id: 'what-is-prompt-engineering',
      title: 'What is Prompt Engineering?',
      content: `## The Art and Science of AI Communication

**Prompt engineering** is the practice of designing, crafting, and optimizing inputs (prompts) to AI language models to elicit desired outputs. It's both an art requiring creativity and intuition, and a science demanding systematic methodology and empirical testing.

### Why Prompt Engineering Matters

In the era of large language models (LLMs) like GPT-4, Claude, and Gemini, prompt engineering has become as fundamental as programming itself. Consider these parallels:

| Traditional Programming | Prompt Engineering |
|------------------------|-------------------|
| Write explicit instructions | Craft natural language requests |
| Debug syntax errors | Refine prompt clarity |
| Optimize algorithms | Optimize prompt structures |
| Test edge cases | Test prompt variations |
| Build reusable functions | Create prompt templates |

### The $200 Billion Impact

Recent studies show that effective prompt engineering can improve AI task performance by 50-300%. For businesses using AI at scale, this translates to:

- **10x productivity gains** in content creation
- **75% reduction** in AI compute costs through efficient prompting
- **90% accuracy improvement** in specialized tasks
- **$200B projected market** for prompt engineering tools by 2025

### Real-World Applications

Prompt engineering powers critical applications across industries:

**Healthcare**: Prompts guide AI in analyzing medical images, suggesting diagnoses, and explaining treatment options.

**Finance**: Trading algorithms use prompts to analyze market sentiment and generate investment reports.

**Education**: Personalized tutoring systems use prompts to adapt explanations to student learning styles.

**Software Development**: GitHub Copilot and similar tools rely on prompts to generate code, tests, and documentation.

**Creative Industries**: Artists and writers use prompts to generate ideas, drafts, and visual concepts.`,
      examples: [
        {
          title: 'Basic vs. Engineered Prompt',
          code: `// ❌ Basic Prompt
"Write about climate change"

// ✅ Engineered Prompt
"As an environmental scientist, write a 300-word executive summary
about climate change impacts on coastal cities. Include:
1. Three specific risks with timeframes
2. Economic implications with data
3. Two actionable mitigation strategies
Target audience: City planning committees
Tone: Authoritative but accessible"`,
          description: 'The engineered prompt provides context, structure, constraints, and clear success criteria.'
        }
      ]
    },
    {
      id: 'core-principles',
      title: 'Core Principles of Effective Prompting',
      content: `## The Five Pillars of Prompt Engineering

### 1. Clarity: Precision in Communication

Clear prompts eliminate ambiguity and reduce misinterpretation. Every word should serve a purpose.

**Principles of Clarity:**
- Use specific, unambiguous language
- Define technical terms explicitly
- Avoid pronouns without clear antecedents
- Specify formats and structures

### 2. Context: Setting the Stage

Context provides the AI with necessary background information and constraints to generate relevant outputs.

**Types of Context:**
- **Domain Context**: Field-specific knowledge and terminology
- **Task Context**: What you're trying to accomplish
- **Format Context**: How the output should be structured
- **Audience Context**: Who will consume the output
- **Constraint Context**: Limitations and requirements

### 3. Specificity: Detailed Requirements

Specific prompts yield specific results. Vague requests produce vague responses.

**Specificity Dimensions:**
- **Scope**: Exact boundaries of the task
- **Depth**: Level of detail required
- **Style**: Tone, voice, and formatting
- **Length**: Word counts or time limits
- **Examples**: Concrete illustrations of desired output

### 4. Structure: Logical Organization

Well-structured prompts guide the AI through a logical thought process, improving output quality.

**Structural Elements:**
- **Sequential Instructions**: Step-by-step guidance
- **Hierarchical Organization**: Main points and sub-points
- **Conditional Logic**: If-then scenarios
- **Templates**: Reusable prompt frameworks

### 5. Iteration: Continuous Refinement

Prompt engineering is iterative. Each interaction provides feedback for improvement.

**Iteration Strategy:**
1. Start with a baseline prompt
2. Analyze the output
3. Identify gaps or issues
4. Refine the prompt
5. Test variations
6. Document what works`,
      examples: [
        {
          title: 'Applying the Five Pillars',
          code: `// Prompt demonstrating all five pillars:

"Context: You are a senior data scientist at a Fortune 500 retail company.

Task: Analyze customer churn patterns for Q4 2024.

Requirements:
1. Identify top 3 churn indicators with statistical significance
2. Segment customers into risk categories (high/medium/low)
3. Propose retention strategies for each segment
4. Estimate ROI for proposed interventions

Format: Executive dashboard style with:
- Key metrics in bullet points
- One data visualization description per finding
- Action items in priority order

Constraints:
- Maximum 500 words
- Use only provided dataset metrics
- Assume $50 customer acquisition cost
- Focus on actionable insights

Output in markdown with clear section headers."`,
          description: 'This prompt demonstrates clarity, context, specificity, structure, and sets up for iteration based on output.'
        }
      ]
    },
    {
      id: 'types-of-prompts',
      title: 'Types of Prompts',
      content: `## Prompt Taxonomy: Different Tools for Different Tasks

### 1. Instructional Prompts

Direct commands that tell the AI exactly what to do.

**Characteristics:**
- Clear action verbs (analyze, summarize, create, explain)
- Specific deliverables
- Measurable outcomes

**Best for:** Well-defined tasks with clear success criteria

### 2. Conversational Prompts

Prompts that initiate dialogue or discussion.

**Characteristics:**
- Open-ended questions
- Exploratory tone
- Iterative refinement
- Context building through conversation

**Best for:** Brainstorming, exploration, complex problem-solving

### 3. Role-Based Prompts

Prompts that assign a specific persona or expertise to the AI.

**Characteristics:**
- Defined expertise level
- Domain-specific knowledge
- Consistent voice and perspective
- Professional constraints

**Best for:** Specialized tasks requiring domain expertise

### 4. Template Prompts

Standardized prompts with variable placeholders.

**Characteristics:**
- Reusable structure
- Consistent format
- Parameterized inputs
- Scalable across use cases

**Best for:** Repetitive tasks, automation, API integration

### 5. Chain Prompts

Sequential prompts where outputs feed into subsequent prompts.

**Characteristics:**
- Multi-step processes
- Progressive refinement
- Complex workflows
- Intermediate validation

**Best for:** Complex tasks requiring multiple processing stages

### 6. Few-Shot Prompts

Prompts that include examples of desired input-output pairs.

**Characteristics:**
- Learning from examples
- Pattern recognition
- Consistent formatting
- Style matching

**Best for:** Tasks requiring specific format or style

### 7. Zero-Shot Prompts

Prompts without examples, relying on the model's pre-trained knowledge.

**Characteristics:**
- No examples provided
- Relies on clear instructions
- Tests model capabilities
- Minimal prompt engineering

**Best for:** Simple tasks or testing model understanding`,
      examples: [
        {
          title: 'Prompt Type Examples',
          code: `// Instructional Prompt
"Summarize this article in 3 bullet points, each under 20 words."

// Conversational Prompt
"Let's explore the implications of quantum computing on cryptography.
What are your thoughts on post-quantum algorithms?"

// Role-Based Prompt
"As a constitutional lawyer with 20 years experience, analyze this
contract clause for potential legal vulnerabilities."

// Template Prompt
"Product: [PRODUCT_NAME]
Features: [FEATURE_LIST]
Target Audience: [AUDIENCE]
Generate 5 marketing headlines that emphasize [KEY_BENEFIT]."

// Chain Prompt (Step 1 of 3)
"Step 1: Extract all dates mentioned in this document.
Output format: YYYY-MM-DD, one per line."

// Few-Shot Prompt
"Classify sentiment:
'Great product!' -> Positive
'Terrible service' -> Negative
'It works okay' -> Neutral
'Outstanding experience!' -> ?"

// Zero-Shot Prompt
"Explain photosynthesis to a 10-year-old."`,
          description: 'Each prompt type serves different purposes and yields different results.'
        }
      ]
    },
    {
      id: 'prompt-components',
      title: 'Anatomy of Effective Prompts',
      content: `## The Building Blocks of Great Prompts

### Essential Components

Every effective prompt contains some combination of these elements:

### 1. Role/Persona Definition
Establishes the AI's expertise and perspective.

**Format:** "You are a [role] with [expertise] in [domain]"

**Examples:**
- "You are a senior software architect with 15 years of experience in distributed systems"
- "You are a friendly customer service representative for a luxury hotel chain"
- "You are a strict code reviewer focusing on security vulnerabilities"

### 2. Task Description
Clearly states what needs to be accomplished.

**Format:** "Your task is to [action verb] [object] [specifications]"

**Examples:**
- "Your task is to analyze this dataset and identify three key trends"
- "Your task is to write unit tests for the provided Python function"
- "Your task is to create a meal plan that meets these nutritional requirements"

### 3. Context and Background
Provides necessary information for informed responses.

**Elements to Include:**
- Relevant history or prior events
- Domain-specific constraints
- Environmental factors
- Stakeholder considerations

### 4. Specific Instructions
Step-by-step guidance for complex tasks.

**Best Practices:**
- Number your steps
- Use clear action verbs
- Specify order of operations
- Include decision points

### 5. Format Specifications
Defines how the output should be structured.

**Common Formats:**
- Markdown with headers
- JSON with specific schema
- Bullet points with sub-items
- Tables with defined columns
- Code with comments

### 6. Constraints and Limitations
Sets boundaries for the response.

**Types of Constraints:**
- Length limits (words, sentences, paragraphs)
- Scope boundaries (what to include/exclude)
- Style requirements (formal, casual, technical)
- Resource limitations (time, budget, tools)

### 7. Examples (When Needed)
Provides concrete illustrations of desired output.

**When to Include Examples:**
- Novel or complex formats
- Specific style requirements
- Pattern-based tasks
- Quality benchmarks

### 8. Success Criteria
Defines what constitutes a good response.

**Measurable Criteria:**
- Completeness checks
- Accuracy requirements
- Quality standards
- Performance metrics`,
      examples: [
        {
          title: 'Complete Prompt Anatomy',
          code: `// A prompt with all components clearly labeled:

"[ROLE] You are a senior product manager at a SaaS startup.

[TASK] Your task is to create a product roadmap for our new AI-powered
analytics dashboard.

[CONTEXT] We're a Series B startup with 50 employees and 500 enterprise
customers. Our current product lacks AI features that competitors have
launched. We have a 6-month runway and need to show traction for Series C.

[INSTRUCTIONS]
1. Identify 3 high-impact AI features based on customer feedback
2. Prioritize features using RICE framework
3. Create 3-month development timeline
4. Estimate resource requirements
5. Define success metrics for each feature

[FORMAT] Present your roadmap as:
- Executive Summary (50 words)
- Feature Priority Table (RICE scores)
- Gantt chart description
- Resource allocation matrix
- KPI dashboard mockup

[CONSTRAINTS]
- Maximum 2 developers per feature
- $100K total budget
- Must integrate with existing tech stack
- Launch at least 1 feature in Q1

[SUCCESS CRITERIA]
- Each feature addresses specific customer pain points
- Timeline is realistic given resources
- Clear metrics for measuring success
- Competitive differentiation is evident"`,
          description: 'This comprehensive prompt leaves no room for ambiguity while maintaining flexibility for creative solutions.'
        }
      ]
    },
    {
      id: 'prompt-influence',
      title: 'How Prompts Influence AI Behavior',
      content: `## The Psychology of AI: Understanding Model Responses

### Attention Mechanisms and Prompts

Modern language models use attention mechanisms to process prompts. Understanding this helps explain why certain prompt techniques work:

### 1. Positional Bias
Models pay more attention to information at the beginning and end of prompts.

**Implications:**
- Place critical instructions at prompt start
- Reinforce key requirements at prompt end
- Avoid burying important details in the middle

### 2. Keyword Activation
Certain words and phrases strongly influence model behavior.

**Power Words:**
- "Must", "Critical", "Required" → Increases compliance
- "Step-by-step", "Think carefully" → Improves reasoning
- "Be creative", "Think outside the box" → Enhances creativity
- "Be precise", "Exactly" → Improves accuracy

### 3. Framing Effects
How you frame a request dramatically affects the response.

**Framing Strategies:**

| Framing | Effect | Example |
|---------|--------|---------|
| Positive | Encourages expansive thinking | "What solutions could work?" |
| Negative | Promotes critical analysis | "What could go wrong?" |
| Comparative | Enables nuanced evaluation | "Compare X and Y" |
| Hypothetical | Unlocks creative scenarios | "Imagine if..." |

### 4. Cognitive Load Management
Complex prompts can overwhelm the model's "working memory."

**Load Reduction Techniques:**
- Break complex tasks into subtasks
- Use clear section divisions
- Provide structured templates
- Limit simultaneous requirements

### 5. Priming Effects
Earlier content in the prompt primes certain response patterns.

**Priming Strategies:**
- Set tone with initial sentences
- Establish expertise early
- Provide quality examples upfront
- Define success before the task

### Temperature and Prompting

The temperature parameter interacts with prompt style:

**Low Temperature (0.0-0.3):**
- Best for: Factual, deterministic tasks
- Prompt style: Precise, specific instructions
- Output: Consistent, conservative

**Medium Temperature (0.4-0.7):**
- Best for: Balanced creativity and accuracy
- Prompt style: Guided but flexible
- Output: Varied but coherent

**High Temperature (0.8-1.0):**
- Best for: Creative, exploratory tasks
- Prompt style: Open-ended, inspirational
- Output: Novel, diverse

### Token Economy

Understanding token limits helps optimize prompts:

**Token Optimization Strategies:**
- Use concise language without sacrificing clarity
- Leverage the model's training (don't over-explain common concepts)
- Structure prompts to maximize output tokens
- Consider prompt compression techniques

### Model-Specific Considerations

Different models respond differently to prompt styles:

| Model | Strengths | Optimal Prompt Style |
|-------|-----------|---------------------|
| GPT-4 | Reasoning, creativity | Detailed, structured |
| Claude | Analysis, safety | Clear constraints, ethical framing |
| Gemini | Multimodal, factual | Specific, grounded |
| LLaMA | Efficiency, speed | Concise, direct |`,
      examples: [
        {
          title: 'Prompt Influence Demonstration',
          code: `// Demonstrating how different prompt elements influence output:

// Version 1: Basic prompt
"Write about AI ethics"
// Result: Generic, unfocused essay

// Version 2: With role and framing
"As an AI ethics researcher, critically analyze AI ethics"
// Result: Academic, analytical perspective

// Version 3: With structure and keywords
"You MUST analyze AI ethics following this EXACT structure:
1. Current challenges (be specific)
2. Stakeholder impacts (think carefully)
3. Solutions (be creative but practical)"
// Result: Organized, thorough analysis

// Version 4: With priming and constraints
"Excellent researchers provide balanced, evidence-based analysis.
As a leading AI ethics expert, analyze the three most critical
ethical challenges in AI deployment today.

Requirements:
- Cite real examples from 2024
- Consider multiple perspectives
- Maximum 300 words
- Professional but accessible tone

Focus on actionable insights for policymakers."
// Result: High-quality, targeted, actionable analysis`,
          description: 'Each version demonstrates how additional prompt elements shape the AI response quality and characteristics.'
        }
      ]
    }
  ],

  summary: [
    'Prompt engineering is the critical skill of effectively communicating with AI to achieve desired outcomes',
    'The five pillars of effective prompting are Clarity, Context, Specificity, Structure, and Iteration',
    'Different prompt types (instructional, conversational, role-based, etc.) serve different purposes',
    'Effective prompts contain eight key components from role definition to success criteria',
    'Understanding how prompts influence AI behavior through attention, framing, and priming improves results',
    'Prompt engineering can improve AI task performance by 50-300% with proper techniques',
    'The field combines creativity with systematic methodology for optimal results'
  ],

  checkYourUnderstanding: [
    {
      question: 'What are the five core principles of effective prompting?',
      answer: 'The five pillars are: 1) Clarity (precise, unambiguous communication), 2) Context (providing necessary background), 3) Specificity (detailed requirements), 4) Structure (logical organization), and 5) Iteration (continuous refinement based on outputs).'
    },
    {
      question: 'Why does placing important instructions at the beginning and end of prompts improve results?',
      answer: 'Due to positional bias in attention mechanisms, language models pay more attention to information at the beginning and end of prompts. This makes these positions ideal for critical instructions and key requirements.'
    },
    {
      question: 'When would you use a few-shot prompt versus a zero-shot prompt?',
      answer: 'Use few-shot prompts when you need specific formatting, style matching, or pattern recognition that benefits from examples. Use zero-shot prompts for simple tasks where clear instructions suffice or when testing the model\'s inherent understanding without guidance.'
    },
    {
      question: 'How does the temperature parameter interact with prompt engineering?',
      answer: 'Lower temperatures (0.0-0.3) work best with precise, specific prompts for factual tasks. Medium temperatures (0.4-0.7) balance creativity with accuracy for flexible prompts. High temperatures (0.8-1.0) suit open-ended, creative prompts for novel outputs.'
    }
  ],

  nextSteps: [
    'Practice identifying and writing the eight key components of effective prompts',
    'Experiment with different prompt types for various tasks',
    'Learn specific techniques like Chain of Thought and Few-Shot prompting',
    'Study advanced patterns like prompt chaining and self-consistency',
    'Build a personal library of proven prompt templates'
  ]
};