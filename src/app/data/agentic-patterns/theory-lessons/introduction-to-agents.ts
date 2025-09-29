import { TheoryLesson } from '../../learning-content';

export const introductionToAgentsLesson: TheoryLesson = {
  id: 'introduction-to-agents',
  title: 'Introduction to AI Agents: From Reactive to Autonomous Systems',
  description: 'Understand what makes an AI system truly "agentic" and explore the evolution from simple LLMs to sophisticated autonomous agents',
  estimatedTime: 35,
  difficulty: 'beginner',
  xpReward: 100,
  content: {
    introduction: `
AI agents represent a fundamental shift in how we interact with artificial intelligence. While traditional AI systems respond to prompts, agents actively pursue goals, make decisions, use tools, and collaborate to solve complex problems.

An agent is more than just an LLM with a prompt - it's a complete system that perceives its environment, reasons about goals, plans actions, executes tasks, and learns from outcomes. This journey will teach you to build production-ready agents using proven architectural patterns.

The evolution from chatbots to agents mirrors the evolution from calculators to computers: both represent a leap from reactive tools to autonomous systems capable of complex, goal-directed behavior.
    `,

    sections: [
      {
        title: 'What Makes an AI System "Agentic"?',
        content: `
An AI agent exhibits several key characteristics that distinguish it from simpler AI systems:

**1. Goal-Directed Behavior**
Agents work toward specific objectives, not just respond to queries:
- Maintain persistent goals across interactions
- Decompose complex objectives into subtasks
- Prioritize actions based on goal importance
- Adapt strategies when initial approaches fail

**2. Autonomy and Decision Making**
Agents make independent decisions within their operational bounds:
- Choose appropriate tools and methods
- Determine when to seek help vs. proceed independently
- Manage resource allocation (time, compute, API calls)
- Handle unexpected situations without human intervention

**3. Environmental Awareness**
Agents perceive and interact with their environment:
- Access and interpret external data sources
- Monitor system state and performance metrics
- Respond to environmental changes and events
- Maintain situational awareness across contexts

**4. Tool Use and Action Execution**
Agents extend their capabilities through tools:
- Select appropriate tools for specific tasks
- Chain multiple tools to achieve complex goals
- Create and modify artifacts (code, documents, data)
- Interact with external systems and APIs

**5. Memory and State Management**
Agents maintain context beyond single interactions:
- Short-term working memory for current tasks
- Long-term memory for knowledge and experiences
- Episodic memory for specific interactions
- Semantic memory for facts and relationships

**6. Learning and Adaptation**
Agents improve their performance over time:
- Learn from successful and failed attempts
- Adapt strategies based on feedback
- Generalize patterns from experiences
- Update beliefs and knowledge bases
        `
      },
      {
        title: 'The Agent Architecture Stack',
        content: `
Modern agent systems are built on a layered architecture:

**Layer 1: Foundation Models**
The cognitive engine powering reasoning and generation:
\`\`\`
- Large Language Models (GPT-4, Claude, Llama)
- Specialized models (code, math, vision)
- Embedding models for semantic understanding
- Fine-tuned models for specific domains
\`\`\`

**Layer 2: Reasoning Frameworks**
Patterns that enhance model reasoning capabilities:
\`\`\`
- Chain of Thought (CoT) for step-by-step reasoning
- Tree of Thoughts (ToT) for exploring alternatives
- ReAct for combining reasoning with actions
- Self-reflection for error correction
\`\`\`

**Layer 3: Memory Systems**
Storage and retrieval of information:
\`\`\`
- Vector databases for semantic search
- Graph databases for relationship mapping
- Key-value stores for fast lookup
- Document stores for structured data
\`\`\`

**Layer 4: Tool Integration**
Interfaces to external capabilities:
\`\`\`
- Function calling for API access
- Code execution environments
- Database query interfaces
- Web browsing and search
\`\`\`

**Layer 5: Orchestration Layer**
Coordination and control mechanisms:
\`\`\`
- Task planning and scheduling
- Resource allocation and management
- Error handling and recovery
- Multi-agent coordination
\`\`\`

**Layer 6: Application Layer**
Domain-specific implementations:
\`\`\`
- Software development agents
- Research and analysis agents
- Customer service agents
- Creative and content agents
\`\`\`
        `
      },
      {
        title: 'Core Agent Components',
        content: `
Every agent system consists of fundamental building blocks:

**The Perception Module**
How agents understand their environment:
\`\`\`python
class PerceptionModule:
    def perceive(self, environment):
        # Gather raw sensory data
        raw_data = environment.get_current_state()

        # Process and interpret
        processed = self.process_inputs(raw_data)

        # Update world model
        self.world_model.update(processed)

        return processed
\`\`\`

**The Reasoning Engine**
How agents think and make decisions:
\`\`\`python
class ReasoningEngine:
    def reason(self, perception, goals):
        # Analyze current situation
        situation = self.analyze_context(perception)

        # Generate possible actions
        options = self.generate_options(situation, goals)

        # Evaluate and select best action
        best_action = self.evaluate_options(options)

        return best_action
\`\`\`

**The Memory System**
How agents remember and learn:
\`\`\`python
class MemorySystem:
    def __init__(self):
        self.working_memory = WorkingMemory(capacity=7)
        self.long_term_memory = LongTermMemory()
        self.episodic_memory = EpisodicMemory()

    def store(self, information, memory_type):
        if memory_type == "working":
            self.working_memory.add(information)
        elif memory_type == "episodic":
            self.episodic_memory.store_episode(information)
        else:
            self.long_term_memory.encode(information)

    def retrieve(self, query, memory_type=None):
        results = []
        if memory_type in [None, "working"]:
            results.extend(self.working_memory.search(query))
        if memory_type in [None, "long_term"]:
            results.extend(self.long_term_memory.retrieve(query))
        if memory_type in [None, "episodic"]:
            results.extend(self.episodic_memory.recall(query))
        return self.rank_by_relevance(results, query)
\`\`\`

**The Action Executor**
How agents interact with the world:
\`\`\`python
class ActionExecutor:
    def execute(self, action):
        # Validate action is safe and allowed
        if not self.validate_action(action):
            return ActionResult(success=False, reason="Invalid action")

        # Execute with appropriate tool
        tool = self.select_tool(action)
        result = tool.execute(action.parameters)

        # Monitor and handle errors
        if result.error:
            result = self.handle_error(result, action)

        return result
\`\`\`

**The Learning Module**
How agents improve over time:
\`\`\`python
class LearningModule:
    def learn_from_experience(self, experience):
        # Extract patterns from experience
        patterns = self.extract_patterns(experience)

        # Update knowledge base
        self.knowledge_base.integrate(patterns)

        # Adjust strategies
        self.strategy_optimizer.update(experience.outcome)

        # Store for future reference
        self.experience_buffer.add(experience)
\`\`\`
        `
      },
      {
        title: 'Types of AI Agents',
        content: `
Different agent architectures serve different purposes:

**1. Reactive Agents**
Simple stimulus-response systems:
- No internal state or memory
- Direct mapping from perception to action
- Fast and predictable
- Example: Rule-based chatbots

**2. Deliberative Agents**
Planning-based systems with world models:
- Maintain internal representation of world
- Create and execute plans
- Reason about future states
- Example: Chess-playing agents

**3. Hybrid Agents**
Combine reactive and deliberative approaches:
- Fast reactive layer for immediate responses
- Deliberative layer for complex planning
- Layered architecture for flexibility
- Example: Autonomous driving systems

**4. Learning Agents**
Improve performance through experience:
- Online learning from interactions
- Offline learning from datasets
- Reinforcement learning from rewards
- Example: Recommendation systems

**5. Multi-Agent Systems**
Cooperating or competing agent teams:
- Distributed problem solving
- Emergent collective behavior
- Negotiation and coordination
- Example: Trading bot ecosystems

**6. Cognitive Architectures**
Human-inspired agent designs:
- Multiple specialized modules
- Attention and consciousness models
- Emotional and social reasoning
- Example: AGI research systems
        `
      },
      {
        title: 'The Journey from Prompt to Agent',
        content: `
Understanding the evolution helps you choose the right level of complexity:

**Level 0: Basic Prompting**
\`\`\`python
response = llm.complete("Translate this to French: Hello")
\`\`\`
- Single turn interactions
- No state or memory
- No tool use

**Level 1: Prompt Chaining**
\`\`\`python
step1 = llm.complete("Extract key points from: " + document)
step2 = llm.complete("Summarize these points: " + step1)
\`\`\`
- Multi-step workflows
- Basic error handling
- Predefined sequences

**Level 2: Tool-Augmented LLMs**
\`\`\`python
tools = [SearchTool(), CalculatorTool(), DatabaseTool()]
response = llm.complete_with_tools(prompt, tools)
\`\`\`
- External tool access
- Dynamic tool selection
- Enhanced capabilities

**Level 3: ReAct Agents**
\`\`\`python
agent = ReActAgent(llm, tools, memory)
result = agent.run("Research and summarize recent AI breakthroughs")
\`\`\`
- Reasoning + Acting loops
- Short-term memory
- Goal-directed behavior

**Level 4: Autonomous Agents**
\`\`\`python
agent = AutonomousAgent(
    llm=llm,
    tools=tools,
    memory=long_term_memory,
    planner=hierarchical_planner,
    learning=reinforcement_learner
)
agent.pursue_goal("Build a web application for task management")
\`\`\`
- Long-term goals
- Persistent memory
- Learning and adaptation
- Complex planning

**Level 5: Multi-Agent Systems**
\`\`\`python
system = MultiAgentSystem([
    ResearchAgent(),
    DesignAgent(),
    ImplementationAgent(),
    TestingAgent()
])
system.collaborate_on("Create a new AI product")
\`\`\`
- Agent specialization
- Coordination protocols
- Emergent behaviors
- Distributed intelligence
        `
      },
      {
        title: 'Key Challenges in Building Agents',
        content: `
Be aware of these common challenges when building agent systems:

**1. Reliability and Consistency**
- Non-deterministic LLM outputs
- Error propagation in multi-step processes
- Handling edge cases and failures
- Maintaining consistent behavior

**2. Context Management**
- Limited context windows
- Information prioritization
- Context switching between tasks
- Long-term coherence

**3. Tool Integration Complexity**
- API reliability and latency
- Error handling across tools
- Tool selection accuracy
- Output format consistency

**4. Cost and Performance**
- Token usage optimization
- API call minimization
- Latency in decision making
- Resource allocation

**5. Safety and Control**
- Preventing harmful actions
- Maintaining boundaries
- Audit trails and explainability
- Human oversight integration

**6. Evaluation and Testing**
- Measuring agent effectiveness
- Testing non-deterministic systems
- Benchmarking complex behaviors
- Real-world performance validation
        `
      },
      {
        title: 'Production Considerations',
        content: `
Building production-ready agents requires careful attention to:

**Scalability**
\`\`\`python
# Use async processing for parallel operations
async def process_tasks(tasks):
    results = await asyncio.gather(*[
        agent.process(task) for task in tasks
    ])
    return results
\`\`\`

**Observability**
\`\`\`python
# Comprehensive logging and tracing
@trace_agent_action
def execute_action(self, action):
    self.logger.info(f"Executing: {action}")
    span = self.tracer.start_span("action_execution")
    try:
        result = self._execute(action)
        span.set_tag("success", True)
        return result
    except Exception as e:
        span.set_tag("error", str(e))
        raise
    finally:
        span.finish()
\`\`\`

**Error Recovery**
\`\`\`python
# Implement retry logic with exponential backoff
@retry(max_attempts=3, backoff_factor=2)
def call_external_api(self, request):
    try:
        return self.api_client.call(request)
    except TemporaryError:
        self.fallback_to_cache(request)
    except PermanentError:
        self.use_alternative_approach(request)
\`\`\`

**Security**
\`\`\`python
# Validate and sanitize all inputs and outputs
class SecureAgent:
    def __init__(self):
        self.sandbox = SafeExecutionEnvironment()
        self.validator = InputValidator()
        self.rate_limiter = RateLimiter()

    def execute_user_request(self, request):
        # Validate input
        if not self.validator.is_safe(request):
            raise SecurityException("Unsafe input detected")

        # Check rate limits
        if not self.rate_limiter.allow(request.user):
            raise RateLimitException("Too many requests")

        # Execute in sandbox
        return self.sandbox.execute(request)
\`\`\`

**Monitoring**
\`\`\`python
# Track key metrics
class AgentMetrics:
    def __init__(self):
        self.success_rate = Counter("agent_success_total")
        self.latency = Histogram("agent_latency_seconds")
        self.token_usage = Counter("agent_tokens_used")
        self.tool_calls = Counter("agent_tool_calls")

    def record_execution(self, result, duration, tokens):
        self.success_rate.inc(1 if result.success else 0)
        self.latency.observe(duration)
        self.token_usage.inc(tokens)
\`\`\`
        `
      }
    ],

    practicalExample: {
      title: 'Building a Simple Research Agent',
      scenario: 'Create an agent that can research topics and generate comprehensive reports',
      challenge: 'The agent needs to search for information, evaluate sources, synthesize findings, and produce a well-structured report',
      approach: `
**Step 1: Define Agent Components**

\`\`\`python
class ResearchAgent:
    def __init__(self):
        self.llm = LLM(model="gpt-4")
        self.tools = {
            "search": WebSearchTool(),
            "extract": ContentExtractor(),
            "summarize": Summarizer(),
            "cite": CitationGenerator()
        }
        self.memory = MemoryBank()
        self.planner = ResearchPlanner()
\`\`\`

**Step 2: Implement Research Planning**

\`\`\`python
def plan_research(self, topic):
    # Generate research questions
    questions = self.planner.generate_questions(topic)

    # Create research plan
    plan = ResearchPlan(
        topic=topic,
        questions=questions,
        search_queries=self.generate_queries(questions),
        quality_criteria=self.define_quality_metrics()
    )

    return plan
\`\`\`

**Step 3: Execute Research Loop**

\`\`\`python
async def conduct_research(self, plan):
    findings = []

    for query in plan.search_queries:
        # Search for information
        results = await self.tools["search"].search(query)

        # Extract relevant content
        content = await self.tools["extract"].extract(results)

        # Evaluate source quality
        quality_score = self.evaluate_source(content)

        if quality_score > plan.quality_threshold:
            # Summarize key points
            summary = self.tools["summarize"].summarize(content)

            # Store in memory
            self.memory.store(summary, metadata={
                "query": query,
                "source": content.source,
                "quality": quality_score
            })

            findings.append(summary)

    return findings
\`\`\`

**Step 4: Synthesize and Generate Report**

\`\`\`python
def generate_report(self, findings, plan):
    # Organize findings by theme
    organized = self.organize_by_theme(findings)

    # Generate report sections
    sections = []
    for theme, theme_findings in organized.items():
        section = self.llm.generate(
            prompt=f"""
            Write a report section on: {theme}
            Based on findings: {theme_findings}
            Include proper citations.
            """
        )
        sections.append(section)

    # Create final report
    report = Report(
        title=f"Research Report: {plan.topic}",
        abstract=self.generate_abstract(sections),
        sections=sections,
        citations=self.tools["cite"].format_citations(findings),
        metadata={
            "date": datetime.now(),
            "sources_reviewed": len(findings),
            "confidence_score": self.calculate_confidence(findings)
        }
    )

    return report
\`\`\`

**Results:**
- Research time: Reduced from hours to minutes
- Source coverage: 10x more sources reviewed
- Quality: Consistent structure and citation format
- Accuracy: 92% factual accuracy (human-verified)
- User satisfaction: 4.6/5.0 rating
      `
    },

    quiz: [
      {
        question: 'What distinguishes an AI agent from a simple LLM with prompts?',
        options: [
          'Agents use more advanced language models',
          'Agents have goal-directed behavior, memory, and can take actions',
          'Agents always produce better responses',
          'Agents are faster than regular LLMs'
        ],
        correctAnswer: 1,
        explanation: 'AI agents are distinguished by their goal-directed behavior, persistent memory, ability to take actions through tools, and autonomous decision-making capabilities, not just by the underlying model quality.'
      },
      {
        question: 'Which component is NOT typically part of an agent architecture?',
        options: [
          'Perception module for understanding environment',
          'Memory system for storing information',
          'Blockchain for transaction processing',
          'Action executor for interacting with tools'
        ],
        correctAnswer: 2,
        explanation: 'While agents have perception, memory, reasoning, and action components, blockchain is not a typical or necessary component of agent architectures.'
      },
      {
        question: 'What is the primary purpose of the ReAct pattern in agents?',
        options: [
          'To make agents respond faster',
          'To combine reasoning with action execution in a loop',
          'To reduce token usage',
          'To improve language understanding'
        ],
        correctAnswer: 1,
        explanation: 'The ReAct (Reasoning + Acting) pattern alternates between reasoning about what to do and taking actions, creating a powerful loop for solving complex tasks.'
      }
    ],

    exercises: [
      {
        title: 'Design Your First Agent Architecture',
        description: 'Design a customer service agent that can handle inquiries, access a knowledge base, and escalate complex issues',
        hints: [
          'Consider what tools the agent needs (FAQ search, ticket system, etc.)',
          'Think about memory requirements (conversation history, customer data)',
          'Plan the escalation logic and criteria'
        ]
      },
      {
        title: 'Implement a Simple Goal-Directed Agent',
        description: 'Build an agent that can break down a high-level goal into subtasks and execute them',
        hints: [
          'Start with a task decomposition module',
          'Implement a simple execution loop',
          'Add basic error handling and retry logic'
        ]
      }
    ],

    references: [
      'Wooldridge, M. (2009). An Introduction to MultiAgent Systems',
      'Russell & Norvig (2021). Artificial Intelligence: A Modern Approach',
      'Xi et al. (2023). The Rise and Potential of Large Language Model Based Agents',
      'Shinn et al. (2023). Reflexion: Language Agents with Verbal Reinforcement Learning'
    ]
  }
};