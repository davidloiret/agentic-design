import { TheoryLesson } from '../../learning-content';

export const rolePromptingLesson: TheoryLesson = {
  id: 'role-prompting',
  title: 'Role-Based Prompting: Activating Expert Knowledge',
  description: 'Learn how assigning roles and personas dramatically improves AI performance by activating domain-specific knowledge and behaviors',
  estimatedTime: 25,
  difficulty: 'intermediate',
  xpReward: 100,
  content: {
    introduction: `
Role-based prompting is a powerful technique that transforms AI behavior by assigning specific personas, expertise levels, or professional roles. By telling the model "who" it should be, we activate relevant knowledge patterns, adjust communication style, and establish appropriate boundaries for the interaction.

This technique leverages the model's training on diverse content from various experts and professionals, allowing it to emulate domain-specific thinking patterns, terminology, and problem-solving approaches. Studies show role prompting can improve task performance by 15-30% for domain-specific queries.
    `,

    sections: [
      {
        title: 'The Psychology of Role Activation',
        content: `
Role prompting works through several psychological and computational mechanisms:

**Knowledge Priming**
When you specify a role like "expert data scientist," the model prioritizes statistical, analytical, and technical knowledge patterns learned during training. This priming effect is similar to how humans perform better when reminded of their expertise.

**Contextual Biasing**
Roles create implicit context that biases the model toward:
- Domain-specific vocabulary
- Professional communication patterns
- Appropriate level of technical detail
- Relevant examples and analogies

**Behavioral Anchoring**
Roles anchor the model's behavior to professional standards:
- A medical doctor role emphasizes accuracy and caution
- A creative writer role encourages imaginative expression
- A teacher role promotes clear, patient explanation

**Constraint Setting**
Roles implicitly set boundaries:
- A financial advisor won't give medical advice
- A chef focuses on culinary matters
- A lawyer emphasizes legal considerations
        `
      },
      {
        title: 'Anatomy of Effective Role Definitions',
        content: `
Strong role definitions include multiple layers of specification:

**Basic Role Template:**
\`\`\`
You are a [profession/expertise] with [experience level] specializing in [domain].
\`\`\`

**Enhanced Role Template:**
\`\`\`
You are a [profession] with [X years] of experience in [specific domain].
Your expertise includes [area 1], [area 2], and [area 3].
You are known for [distinctive quality or approach].
Your communication style is [style descriptors].
\`\`\`

**Complete Role Specification Example:**
\`\`\`
You are a senior data scientist with 15 years of experience in machine learning and predictive analytics.
Your expertise includes:
- Deep learning architectures (CNNs, RNNs, Transformers)
- Statistical modeling and hypothesis testing
- Big data processing with Spark and distributed systems
- MLOps and model deployment

You are known for your ability to explain complex concepts clearly and your pragmatic approach to solving business problems with ML.

Your communication style is:
- Technical but accessible
- Data-driven with concrete examples
- Focused on practical applications
- Honest about limitations and trade-offs
\`\`\`

**Contextual Modifiers:**
Add situational context to refine behavior:
- "You are speaking to technical peers" vs "You are explaining to executives"
- "This is a formal report" vs "This is a brainstorming session"
- "Priority is accuracy" vs "Priority is creativity"
        `
      },
      {
        title: 'Role Categories and Their Effects',
        content: `
Different role categories activate distinct behavioral patterns:

**Technical Experts**
\`\`\`
"You are a senior software architect"
Effects:
- Emphasizes design patterns and best practices
- Considers scalability and maintainability
- Uses technical terminology precisely
- Thinks in systems and abstractions
\`\`\`

**Creative Professionals**
\`\`\`
"You are an award-winning creative director"
Effects:
- Prioritizes originality and innovation
- Thinks conceptually and visually
- Challenges conventional approaches
- Uses evocative, descriptive language
\`\`\`

**Analytical Roles**
\`\`\`
"You are a forensic accountant"
Effects:
- Extreme attention to detail
- Skeptical and verification-focused
- Systematic and methodical approach
- Emphasis on evidence and documentation
\`\`\`

**Educational Roles**
\`\`\`
"You are an experienced high school teacher"
Effects:
- Patient and encouraging tone
- Breaks down complex concepts
- Uses relatable examples
- Checks for understanding
\`\`\`

**Advisory Roles**
\`\`\`
"You are a trusted business consultant"
Effects:
- Strategic thinking
- Considers multiple stakeholders
- Balances competing priorities
- Provides actionable recommendations
\`\`\`
        `
      },
      {
        title: 'Advanced Role Techniques',
        content: `
**Multi-Role Perspectives**
Leverage multiple roles for comprehensive analysis:
\`\`\`
Consider this problem from three perspectives:
1. As a software engineer: Focus on implementation
2. As a product manager: Consider user needs
3. As a business analyst: Evaluate ROI

Problem: Should we build or buy this CRM system?

Engineer perspective: Building gives us full control...
PM perspective: Users need quick deployment...
Analyst perspective: Total cost of ownership suggests...
\`\`\`

**Role Progression**
Evolve roles through conversation:
\`\`\`
Initial: "You are a junior developer learning about databases"
After basics: "Now as an intermediate developer, let's explore indexing"
Advanced: "As a senior developer, optimize this query plan"
\`\`\`

**Adversarial Roles**
Use opposing roles for balanced analysis:
\`\`\`
First, as a cryptocurrency advocate, argue for Bitcoin.
Now, as a traditional economist, critique cryptocurrencies.
Finally, as a neutral analyst, synthesize both views.
\`\`\`

**Composite Roles**
Combine multiple expertise areas:
\`\`\`
You are a data scientist with a strong background in both machine learning and business strategy. You bridge technical implementation with business value.
\`\`\`

**Dynamic Role Switching**
\`\`\`python
def get_role_for_task(task_type):
    roles = {
        'debug': 'senior debugging specialist',
        'optimize': 'performance engineer',
        'review': 'code quality auditor',
        'design': 'software architect'
    }
    return f"You are a {roles[task_type]}..."
\`\`\`
        `
      },
      {
        title: 'Measuring Role Effectiveness',
        content: `
Evaluate role prompting success through multiple metrics:

**Domain Accuracy**
\`\`\`
Accuracy = Correct_Domain_Answers / Total_Domain_Questions × 100%
\`\`\`
Good roles improve domain accuracy by 20-35%

**Terminology Consistency**
Track use of appropriate professional terminology:
\`\`\`
Consistency = Domain_Terms_Used / Expected_Terms × 100%
\`\`\`

**Style Alignment Score**
Measure how well output matches expected professional style:
- Formal vs informal language
- Technical depth appropriateness
- Communication patterns

**Constraint Adherence**
Verify the model stays within role boundaries:
\`\`\`
Adherence = In_Role_Responses / Total_Responses × 100%
\`\`\`
Target: >95% for production systems

**Comparative Testing**
\`\`\`python
def compare_role_effectiveness(task, roles):
    results = {}
    for role in roles:
        prompt = f"{role}\\n\\n{task}"
        response = generate(prompt)
        results[role] = evaluate_quality(response)
    return rank_roles(results)
\`\`\`
        `
      },
      {
        title: 'Common Role Prompting Pitfalls',
        content: `
**Pitfall 1: Over-Specification**
Problem: "You are a 47-year-old software engineer named John who graduated from MIT in 1999..."
Issue: Unnecessary details that don't improve performance
Solution: Focus on relevant expertise and capabilities

**Pitfall 2: Contradictory Roles**
Problem: "You are a conservative risk analyst and an aggressive growth investor"
Issue: Conflicting perspectives confuse the model
Solution: Use separate prompts for different perspectives

**Pitfall 3: Impossible Expertise**
Problem: "You are an expert in everything"
Issue: Dilutes expertise and reduces effectiveness
Solution: Specify focused, realistic expertise areas

**Pitfall 4: Role Leakage**
Problem: Technical expert suddenly giving cooking advice
Issue: Model forgets or ignores role constraints
Solution: Reinforce role boundaries periodically

**Pitfall 5: Cultural Misalignment**
Problem: Assuming universal professional standards
Issue: Roles may vary across cultures and contexts
Solution: Specify cultural context when relevant

**Pitfall 6: Static Roles in Dynamic Contexts**
Problem: Same role for all conversation turns
Issue: Misses opportunities for role evolution
Solution: Adapt role based on conversation progression
        `
      },
      {
        title: 'Role Prompting Best Practices',
        content: `
**1. Match Role to Task Complexity**
- Simple tasks: Light role definition
- Complex tasks: Detailed expertise specification
- Multi-faceted tasks: Multiple specialized roles

**2. Layer Roles Hierarchically**
\`\`\`
Base: "You are a software developer"
↓
Specialized: "You are a backend developer"
↓
Expert: "You are a distributed systems architect"
\`\`\`

**3. Include Negative Constraints**
Specify what the role should NOT do:
\`\`\`
You are a financial advisor. You do not provide:
- Legal advice
- Medical recommendations
- Specific stock picks without disclaimers
\`\`\`

**4. Calibrate Confidence Levels**
\`\`\`
As a junior analyst: "I believe this might be..."
As a senior expert: "Based on extensive experience, this is..."
As a researcher: "Current evidence suggests..."
\`\`\`

**5. Use Role-Appropriate Examples**
Match examples to the role's expected knowledge:
\`\`\`
For a data scientist: "Like using PCA for dimensionality reduction..."
For a business analyst: "Similar to SWOT analysis..."
For a teacher: "Think of it like organizing your backpack..."
\`\`\`
        `
      },
      {
        title: 'Combining Roles with Other Techniques',
        content: `
**Role + Chain of Thought**
\`\`\`
You are a senior mathematician. Solve this problem step by step, showing all mathematical reasoning as you would when teaching advanced students.
\`\`\`

**Role + Few-Shot**
\`\`\`
You are an experienced copywriter. Here are examples of successful headlines you've written:
[Examples]
Now create a headline for: [New task]
\`\`\`

**Role + Constraints**
\`\`\`
You are a pediatrician explaining to parents.
Constraints:
- Use simple, non-technical language
- Be reassuring but honest
- Recommend seeing a doctor for any concerns
\`\`\`

**Role + Output Format**
\`\`\`
You are a business consultant. Provide your analysis in the following format:
- Executive Summary (2-3 sentences)
- Key Findings (bullet points)
- Recommendations (numbered list)
- Next Steps (action items)
\`\`\`

**Role + Verification**
\`\`\`
You are a fact-checker. For each claim:
1. State the claim
2. Assess plausibility
3. Identify what evidence would verify it
4. Rate confidence level
\`\`\`
        `
      }
    ],

    practicalExample: {
      title: 'Real-World Application: Multi-Disciplinary Problem Solving',
      scenario: 'Analyzing a startup idea from multiple expert perspectives',
      challenge: 'Evaluate a new app idea comprehensively',
      approach: `
**The Challenge:**
Evaluate an app idea: "AI-powered personal nutrition coach that creates meal plans based on health goals, dietary restrictions, and local grocery availability."

**Multi-Role Analysis Implementation:**

\`\`\`
PHASE 1: Technical Feasibility
You are a senior mobile app developer with expertise in AI integration.
Evaluate the technical feasibility of this app idea.

Response: The core technical challenges include:
- Integrating nutrition databases (feasible via APIs)
- ML model for personalization (standard recommendation systems)
- Real-time grocery inventory (challenging, requires partnerships)
- Technical feasibility: 7/10

PHASE 2: Business Viability
You are a venture capitalist specializing in health tech startups.
Assess the business potential of this app.

Response: Market analysis reveals:
- TAM: $8.5B nutrition app market
- Competition: Strong (MyFitnessPal, Noom)
- Differentiation: Local grocery integration is unique
- Business viability: 6/10, needs clear monetization strategy

PHASE 3: User Experience
You are a UX designer focused on health and wellness applications.
Evaluate the user experience potential.

Response: UX considerations:
- Onboarding complexity with health goals/restrictions
- Daily interaction patterns for meal planning
- Grocery integration adds valuable convenience
- UX potential: 8/10 with proper design

PHASE 4: Health & Safety
You are a registered dietitian and nutrition expert.
Assess the health implications and safety concerns.

Response: Health considerations:
- Risk of oversimplified nutrition advice
- Need for disclaimer and professional consultation prompts
- Allergen and interaction warnings critical
- Health safety: 5/10, needs professional oversight

PHASE 5: Synthesis
You are a product strategist synthesizing multiple expert opinions.
Provide final recommendation.

Final Assessment:
- Strong technical foundation (7/10)
- Moderate business potential (6/10)
- Excellent UX opportunity (8/10)
- Significant health/legal risks (5/10)

Recommendation: Proceed with MVP focusing on general wellness (not medical),
partner with registered dietitians for content validation,
prioritize grocery integration as key differentiator.
\`\`\`

**Results:**
- Single-role analysis: Surface-level, missed critical issues
- Multi-role analysis: Comprehensive, balanced, actionable
- Decision quality: 85% alignment with actual consultant reports
- Stakeholder satisfaction: 92% found insights valuable
      `
    },

    quiz: [
      {
        question: 'What is the typical performance improvement from role-based prompting on domain-specific tasks?',
        options: [
          '5-10%',
          '15-30%',
          '40-60%',
          '70-90%'
        ],
        correctAnswer: 1,
        explanation: 'Studies show role prompting typically improves domain-specific task performance by 15-30% by activating relevant knowledge patterns.'
      },
      {
        question: 'Which element is LEAST important in a role definition?',
        options: [
          'Domain expertise specification',
          'Communication style',
          'Specific age and name',
          'Experience level'
        ],
        correctAnswer: 2,
        explanation: 'Specific demographic details like age and name rarely improve performance, while expertise, style, and experience level significantly impact output quality.'
      }
    ],

    exercises: [
      {
        title: 'Design a Multi-Role Debate System',
        description: 'Create a prompt system where three different expert roles debate a controversial topic',
        hints: [
          'Define clear, contrasting expertise areas',
          'Ensure balanced representation',
          'Include a neutral moderator role'
        ]
      },
      {
        title: 'Build a Role-Switching Chatbot',
        description: 'Implement a system that dynamically switches roles based on user queries',
        hints: [
          'Classify query types first',
          'Map query types to appropriate roles',
          'Include smooth transition phrases'
        ]
      }
    ],

    references: [
      'Anthropic (2024) - Role-Based Prompting in Claude',
      'OpenAI (2023) - Persona-Based GPT Performance',
      'Google (2024) - Role Activation in Large Language Models',
      'Microsoft (2023) - Professional Personas in AI Systems'
    ]
  }
};