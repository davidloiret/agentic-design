import { TheoryLesson } from '../../learning-content';

export const chainingPatternsLesson: TheoryLesson = {
  id: 'chaining-patterns',
  title: 'Agent Chaining Patterns: Orchestrating Complex Workflows',
  description: 'Master sequential, parallel, conditional, and hierarchical chaining patterns to build sophisticated multi-step agent systems',
  estimatedTime: 40,
  difficulty: 'intermediate',
  xpReward: 130,
  content: {
    introduction: `
Chaining patterns define how agents connect tasks, pass information, and coordinate execution across complex workflows. These patterns transform single-purpose agents into powerful systems capable of handling elaborate multi-step processes.

Just as a conductor orchestrates individual musicians into a symphony, chaining patterns orchestrate individual agent capabilities into coherent solutions. The choice of chaining pattern dramatically impacts system performance, reliability, and maintainability.

This lesson explores the full spectrum of chaining patterns, from simple sequential execution to sophisticated hierarchical orchestration with feedback loops.
    `,

    sections: [
      {
        title: 'Understanding Agent Chaining',
        content: `
Agent chaining is the practice of connecting multiple agent operations into cohesive workflows:

**Why Chain Agents?**

1. **Task Decomposition**: Break complex problems into manageable steps
2. **Specialization**: Use specialized agents for specific tasks
3. **Error Recovery**: Isolate failures to specific chain segments
4. **Parallelization**: Execute independent tasks concurrently
5. **Reusability**: Compose workflows from reusable components

**Core Chaining Concepts**

\`\`\`python
class ChainedAgent:
    def __init__(self, agents):
        self.agents = agents
        self.execution_log = []

    def execute(self, initial_input):
        current_data = initial_input

        for agent in self.agents:
            try:
                # Execute agent
                result = agent.process(current_data)

                # Log execution
                self.execution_log.append({
                    'agent': agent.name,
                    'input': current_data,
                    'output': result,
                    'timestamp': time.time()
                })

                # Pass result to next agent
                current_data = result

            except Exception as e:
                return self.handle_error(agent, e, current_data)

        return current_data
\`\`\`

**Information Flow Patterns**

1. **Transform Flow**: Each agent transforms the data
\`\`\`python
input → [Agent A] → transformed₁ → [Agent B] → transformed₂ → output
\`\`\`

2. **Accumulation Flow**: Each agent adds to the data
\`\`\`python
input → [Agent A] → input + result₁ → [Agent B] → input + result₁ + result₂ → output
\`\`\`

3. **Filter Flow**: Each agent may filter or pass data
\`\`\`python
input → [Agent A] → filtered → [Agent B] → refined → output
\`\`\`

4. **Branch Flow**: Data takes different paths
\`\`\`python
input → [Router] → { path₁: [Agent A] → output₁
                    { path₂: [Agent B] → output₂
\`\`\`
        `
      },
      {
        title: 'Sequential Chaining Pattern',
        content: `
Sequential chaining executes agents one after another in a predetermined order:

**Basic Sequential Chain**
\`\`\`python
class SequentialChain:
    def __init__(self, agents):
        self.agents = agents

    def run(self, input_data):
        result = input_data
        for agent in self.agents:
            result = agent.execute(result)
            if result is None:
                raise ChainBreakException(f"Agent {agent.name} returned None")
        return result

# Example usage
chain = SequentialChain([
    DataExtractor(),
    DataCleaner(),
    DataAnalyzer(),
    ReportGenerator()
])
report = chain.run(raw_data)
\`\`\`

**Advanced Sequential with State**
\`\`\`python
class StatefulSequentialChain:
    def __init__(self, agents):
        self.agents = agents
        self.state = {}

    def run(self, input_data):
        self.state['original_input'] = input_data
        result = input_data

        for i, agent in enumerate(self.agents):
            # Provide state context
            context = {
                'step': i,
                'previous_results': self.state.get('results', []),
                'original_input': self.state['original_input']
            }

            # Execute with context
            result = agent.execute(result, context)

            # Update state
            if 'results' not in self.state:
                self.state['results'] = []
            self.state['results'].append({
                'agent': agent.name,
                'output': result
            })

        return result, self.state
\`\`\`

**Sequential with Validation**
\`\`\`python
class ValidatedSequentialChain:
    def __init__(self, agents, validators=None):
        self.agents = agents
        self.validators = validators or {}

    def run(self, input_data):
        result = input_data

        for agent in self.agents:
            # Pre-execution validation
            if agent.name in self.validators:
                validator = self.validators[agent.name]
                if not validator.validate_input(result):
                    raise ValidationError(f"Input validation failed for {agent.name}")

            # Execute
            result = agent.execute(result)

            # Post-execution validation
            if agent.name in self.validators:
                if not validator.validate_output(result):
                    raise ValidationError(f"Output validation failed for {agent.name}")

        return result
\`\`\`

**Use Cases:**
- ETL pipelines
- Document processing workflows
- Multi-stage analysis
- Report generation
- Data transformation pipelines
        `
      },
      {
        title: 'Parallel Chaining Pattern',
        content: `
Parallel chaining executes multiple agents simultaneously for improved performance:

**Basic Parallel Chain**
\`\`\`python
import asyncio
from concurrent.futures import ThreadPoolExecutor

class ParallelChain:
    def __init__(self, agents):
        self.agents = agents
        self.executor = ThreadPoolExecutor(max_workers=len(agents))

    async def run_async(self, input_data):
        # Create tasks for all agents
        tasks = []
        for agent in self.agents:
            task = asyncio.create_task(self.execute_agent(agent, input_data))
            tasks.append(task)

        # Wait for all to complete
        results = await asyncio.gather(*tasks)

        return results

    async def execute_agent(self, agent, data):
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(self.executor, agent.execute, data)
\`\`\`

**Map-Reduce Pattern**
\`\`\`python
class MapReduceChain:
    def __init__(self, mapper_agents, reducer_agent):
        self.mapper_agents = mapper_agents
        self.reducer_agent = reducer_agent

    async def run(self, input_data):
        # Split input data
        chunks = self.partition_data(input_data, len(self.mapper_agents))

        # Map phase - parallel execution
        mapped_results = await asyncio.gather(*[
            mapper.process(chunk)
            for mapper, chunk in zip(self.mapper_agents, chunks)
        ])

        # Reduce phase - combine results
        final_result = self.reducer_agent.reduce(mapped_results)

        return final_result

    def partition_data(self, data, n_partitions):
        # Divide data into roughly equal chunks
        chunk_size = len(data) // n_partitions
        return [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]
\`\`\`

**Fork-Join Pattern**
\`\`\`python
class ForkJoinChain:
    def __init__(self, fork_condition, branch_agents, join_strategy):
        self.fork_condition = fork_condition
        self.branch_agents = branch_agents
        self.join_strategy = join_strategy

    async def run(self, input_data):
        # Determine which branches to execute
        active_branches = []
        for branch_name, agent in self.branch_agents.items():
            if self.fork_condition(input_data, branch_name):
                active_branches.append((branch_name, agent))

        # Execute branches in parallel
        results = {}
        tasks = []
        for branch_name, agent in active_branches:
            task = self.execute_branch(branch_name, agent, input_data)
            tasks.append(task)

        branch_results = await asyncio.gather(*tasks)

        # Join results
        return self.join_strategy(dict(branch_results))

    async def execute_branch(self, name, agent, data):
        result = await agent.execute(data)
        return (name, result)
\`\`\`

**Scatter-Gather Pattern**
\`\`\`python
class ScatterGatherChain:
    def __init__(self, scatter_function, gather_agents, aggregator):
        self.scatter_function = scatter_function
        self.gather_agents = gather_agents
        self.aggregator = aggregator

    async def run(self, input_data):
        # Scatter - create multiple requests
        requests = self.scatter_function(input_data)

        # Gather - send to multiple agents
        tasks = []
        for request in requests:
            # Select agent based on request type
            agent = self.select_agent(request)
            task = agent.process(request)
            tasks.append(task)

        # Collect all responses
        responses = await asyncio.gather(*tasks, return_exceptions=True)

        # Filter successful responses
        valid_responses = [r for r in responses if not isinstance(r, Exception)]

        # Aggregate results
        return self.aggregator(valid_responses)

    def select_agent(self, request):
        # Round-robin or load-based selection
        return self.gather_agents[hash(request) % len(self.gather_agents)]
\`\`\`

**Performance Optimization:**
- Use connection pooling
- Implement timeouts
- Handle partial failures
- Balance load across agents
- Monitor resource usage
        `
      },
      {
        title: 'Conditional Chaining Pattern',
        content: `
Conditional chaining routes execution based on dynamic conditions:

**Basic Conditional Chain**
\`\`\`python
class ConditionalChain:
    def __init__(self):
        self.conditions = []

    def add_condition(self, condition, agent):
        self.conditions.append((condition, agent))

    def run(self, input_data):
        for condition, agent in self.conditions:
            if condition(input_data):
                return agent.execute(input_data)

        raise NoMatchingCondition("No condition matched input")

# Example usage
chain = ConditionalChain()
chain.add_condition(lambda x: x['type'] == 'text', TextProcessor())
chain.add_condition(lambda x: x['type'] == 'image', ImageProcessor())
chain.add_condition(lambda x: x['type'] == 'video', VideoProcessor())
\`\`\`

**Switch-Case Pattern**
\`\`\`python
class SwitchChain:
    def __init__(self, selector_function):
        self.selector_function = selector_function
        self.cases = {}
        self.default = None

    def add_case(self, value, agent):
        self.cases[value] = agent

    def set_default(self, agent):
        self.default = agent

    def run(self, input_data):
        # Determine case
        case_value = self.selector_function(input_data)

        # Execute appropriate agent
        if case_value in self.cases:
            return self.cases[case_value].execute(input_data)
        elif self.default:
            return self.default.execute(input_data)
        else:
            raise ValueError(f"No handler for case: {case_value}")
\`\`\`

**Dynamic Routing Chain**
\`\`\`python
class DynamicRoutingChain:
    def __init__(self, router_agent):
        self.router_agent = router_agent
        self.route_agents = {}

    def register_route(self, route_name, agent):
        self.route_agents[route_name] = agent

    async def run(self, input_data):
        # Router determines path
        route_decision = await self.router_agent.decide_route(input_data)

        # Handle multi-path routing
        if route_decision.is_multi_path:
            tasks = []
            for route in route_decision.routes:
                if route in self.route_agents:
                    task = self.route_agents[route].execute(input_data)
                    tasks.append(task)

            results = await asyncio.gather(*tasks)
            return self.merge_results(results, route_decision.merge_strategy)

        # Handle single-path routing
        else:
            route = route_decision.route
            if route not in self.route_agents:
                raise RouteNotFound(f"No agent for route: {route}")

            return await self.route_agents[route].execute(input_data)
\`\`\`

**If-Else Chain with Fallback**
\`\`\`python
class IfElseChain:
    def __init__(self):
        self.if_branches = []
        self.else_branch = None

    def add_if(self, condition, agent):
        self.if_branches.append({
            'condition': condition,
            'agent': agent,
            'executed': False
        })

    def set_else(self, agent):
        self.else_branch = agent

    def run(self, input_data):
        results = []

        for branch in self.if_branches:
            if branch['condition'](input_data):
                result = branch['agent'].execute(input_data)
                results.append(result)
                branch['executed'] = True

                # Check if we should continue
                if self.should_stop(result):
                    return results[0] if len(results) == 1 else results

        # No conditions met, try else branch
        if not any(b['executed'] for b in self.if_branches):
            if self.else_branch:
                return self.else_branch.execute(input_data)

        return results if results else None
\`\`\`

**Use Cases:**
- Content routing by type
- Error handling workflows
- A/B testing pipelines
- Load balancing
- Feature flags implementation
        `
      },
      {
        title: 'Hierarchical Chaining Pattern',
        content: `
Hierarchical chaining creates nested agent structures with parent-child relationships:

**Basic Hierarchical Chain**
\`\`\`python
class HierarchicalChain:
    def __init__(self, name, agent=None):
        self.name = name
        self.agent = agent
        self.children = []
        self.parent = None

    def add_child(self, child_chain):
        child_chain.parent = self
        self.children.append(child_chain)
        return child_chain

    def execute(self, input_data):
        # Execute own agent if present
        if self.agent:
            result = self.agent.execute(input_data)
        else:
            result = input_data

        # Execute children
        if self.children:
            child_results = []
            for child in self.children:
                child_result = child.execute(result)
                child_results.append(child_result)

            # Merge child results
            result = self.merge_child_results(child_results)

        return result

    def merge_child_results(self, results):
        # Default: return all results
        return results if len(results) > 1 else results[0]
\`\`\`

**Supervisor-Worker Pattern**
\`\`\`python
class SupervisorWorkerChain:
    def __init__(self, supervisor):
        self.supervisor = supervisor
        self.workers = {}
        self.work_queue = asyncio.Queue()
        self.result_queue = asyncio.Queue()

    def add_worker(self, worker_type, worker_agent, count=1):
        if worker_type not in self.workers:
            self.workers[worker_type] = []

        for _ in range(count):
            self.workers[worker_type].append(worker_agent.clone())

    async def run(self, tasks):
        # Supervisor creates work plan
        work_plan = await self.supervisor.plan(tasks)

        # Start workers
        worker_tasks = []
        for worker_type, workers in self.workers.items():
            for worker in workers:
                task = asyncio.create_task(self.worker_loop(worker))
                worker_tasks.append(task)

        # Distribute work
        for work_item in work_plan:
            await self.work_queue.put(work_item)

        # Signal completion
        for _ in worker_tasks:
            await self.work_queue.put(None)

        # Collect results
        results = []
        for _ in range(len(work_plan)):
            result = await self.result_queue.get()
            results.append(result)

        # Cancel workers
        for task in worker_tasks:
            task.cancel()

        # Supervisor reviews results
        final_result = await self.supervisor.review(results)
        return final_result

    async def worker_loop(self, worker):
        while True:
            work_item = await self.work_queue.get()
            if work_item is None:
                break

            result = await worker.execute(work_item)
            await self.result_queue.put(result)
\`\`\`

**Recursive Chain Pattern**
\`\`\`python
class RecursiveChain:
    def __init__(self, decomposer, solver, combiner):
        self.decomposer = decomposer
        self.solver = solver
        self.combiner = combiner
        self.max_depth = 5
        self.current_depth = 0

    def execute(self, problem, depth=0):
        if depth > self.max_depth:
            raise RecursionLimitExceeded()

        # Check if problem is simple enough to solve
        if self.solver.can_solve_directly(problem):
            return self.solver.solve(problem)

        # Decompose into subproblems
        subproblems = self.decomposer.decompose(problem)

        # Recursively solve subproblems
        subsolutions = []
        for subproblem in subproblems:
            subsolution = self.execute(subproblem, depth + 1)
            subsolutions.append(subsolution)

        # Combine subsolutions
        return self.combiner.combine(subsolutions, problem)
\`\`\`

**Delegation Chain**
\`\`\`python
class DelegationChain:
    def __init__(self, delegator):
        self.delegator = delegator
        self.delegates = {}
        self.delegation_history = []

    def register_delegate(self, capability, agent):
        if capability not in self.delegates:
            self.delegates[capability] = []
        self.delegates[capability].append(agent)

    async def execute(self, task):
        # Delegator analyzes task
        analysis = await self.delegator.analyze(task)

        # Determine required capabilities
        required_capabilities = analysis.required_capabilities

        # Select delegates
        selected_delegates = {}
        for capability in required_capabilities:
            if capability in self.delegates:
                # Select best available delegate
                delegate = self.select_best_delegate(capability, task)
                selected_delegates[capability] = delegate

        # Create subtasks
        subtasks = await self.delegator.create_subtasks(task, selected_delegates)

        # Execute delegated tasks
        results = {}
        for capability, subtask in subtasks.items():
            delegate = selected_delegates[capability]
            result = await delegate.execute(subtask)
            results[capability] = result

            # Log delegation
            self.delegation_history.append({
                'task': task,
                'capability': capability,
                'delegate': delegate.name,
                'result': result
            })

        # Combine results
        return await self.delegator.combine_results(results)

    def select_best_delegate(self, capability, task):
        candidates = self.delegates[capability]
        # Could use load balancing, performance metrics, etc.
        return min(candidates, key=lambda d: d.current_load())
\`\`\`

**Use Cases:**
- Complex project management
- Multi-level approval workflows
- Organizational decision making
- Recursive problem solving
- Task delegation systems
        `
      },
      {
        title: 'Advanced Chaining Patterns',
        content: `
Sophisticated patterns for complex agent orchestration:

**Feedback Loop Chain**
\`\`\`python
class FeedbackLoopChain:
    def __init__(self, primary_agent, feedback_agent):
        self.primary_agent = primary_agent
        self.feedback_agent = feedback_agent
        self.max_iterations = 5
        self.improvement_threshold = 0.1

    async def execute(self, input_data):
        current_output = None
        previous_score = 0

        for iteration in range(self.max_iterations):
            # Generate or refine output
            if current_output is None:
                current_output = await self.primary_agent.generate(input_data)
            else:
                current_output = await self.primary_agent.refine(
                    input_data, current_output, feedback
                )

            # Get feedback
            feedback = await self.feedback_agent.evaluate(current_output)

            # Check if we should continue
            if feedback.score > feedback.target_score:
                return current_output

            if feedback.score - previous_score < self.improvement_threshold:
                # Not improving enough
                break

            previous_score = feedback.score

        return current_output
\`\`\`

**Pipeline with Checkpoints**
\`\`\`python
class CheckpointedPipeline:
    def __init__(self, stages):
        self.stages = stages
        self.checkpoints = {}

    async def execute(self, input_data, resume_from=None):
        current_data = input_data
        start_stage = 0

        # Resume from checkpoint if specified
        if resume_from and resume_from in self.checkpoints:
            current_data = self.checkpoints[resume_from]
            start_stage = self.get_stage_index(resume_from) + 1

        # Execute stages
        for i in range(start_stage, len(self.stages)):
            stage = self.stages[i]

            try:
                # Execute stage
                result = await stage.execute(current_data)

                # Save checkpoint
                self.checkpoints[stage.name] = result

                # Continue with result
                current_data = result

            except Exception as e:
                # Save error state
                self.checkpoints[f"{stage.name}_error"] = {
                    'input': current_data,
                    'error': str(e),
                    'stage': stage.name
                }
                raise PipelineError(f"Failed at stage {stage.name}", e)

        return current_data

    def get_checkpoint(self, stage_name):
        return self.checkpoints.get(stage_name)
\`\`\`

**Adaptive Chain**
\`\`\`python
class AdaptiveChain:
    def __init__(self, monitor_agent):
        self.monitor_agent = monitor_agent
        self.chain_variants = {}
        self.performance_history = []

    def register_variant(self, name, chain):
        self.chain_variants[name] = chain

    async def execute(self, input_data):
        # Monitor analyzes input
        analysis = await self.monitor_agent.analyze(input_data)

        # Select best chain variant
        selected_variant = self.select_optimal_chain(analysis)

        # Execute with monitoring
        start_time = time.time()
        result = await self.chain_variants[selected_variant].execute(input_data)
        execution_time = time.time() - start_time

        # Evaluate performance
        performance = await self.monitor_agent.evaluate(
            input_data, result, execution_time
        )

        # Update history
        self.performance_history.append({
            'variant': selected_variant,
            'input_characteristics': analysis,
            'performance': performance
        })

        # Adapt for next time
        self.adapt_selection_strategy()

        return result

    def select_optimal_chain(self, analysis):
        # Use ML model or heuristics based on history
        if not self.performance_history:
            return list(self.chain_variants.keys())[0]

        # Find similar past inputs
        similar_runs = self.find_similar_runs(analysis)

        if similar_runs:
            # Choose variant that performed best
            best_variant = max(similar_runs, key=lambda x: x['performance'].score)
            return best_variant['variant']

        # Default to first variant
        return list(self.chain_variants.keys())[0]
\`\`\`

**Transactional Chain**
\`\`\`python
class TransactionalChain:
    def __init__(self, stages):
        self.stages = stages
        self.rollback_stack = []

    async def execute(self, input_data):
        results = []
        current_data = input_data

        try:
            for stage in self.stages:
                # Begin transaction
                transaction = await stage.begin_transaction(current_data)

                # Execute
                result = await stage.execute(transaction)

                # Commit
                await stage.commit(transaction)

                # Save rollback information
                self.rollback_stack.append({
                    'stage': stage,
                    'transaction': transaction,
                    'previous_state': current_data
                })

                results.append(result)
                current_data = result

            return results

        except Exception as e:
            # Rollback all completed stages
            await self.rollback_all()
            raise TransactionError(f"Transaction failed: {e}")

    async def rollback_all(self):
        while self.rollback_stack:
            rollback_info = self.rollback_stack.pop()
            try:
                await rollback_info['stage'].rollback(
                    rollback_info['transaction']
                )
            except Exception as e:
                # Log rollback failure but continue
                print(f"Rollback failed for {rollback_info['stage']}: {e}")
\`\`\`

**Best Practices:**
- Implement proper error handling
- Add observability and logging
- Use timeouts for all operations
- Design for idempotency
- Test failure scenarios
- Monitor resource usage
        `
      }
    ],

    practicalExample: {
      title: 'Building a Content Creation Pipeline',
      scenario: 'Create a sophisticated content generation system using multiple chaining patterns',
      challenge: 'Generate, review, optimize, and publish content with quality control',
      approach: `
**System Architecture: Multi-Pattern Content Pipeline**

**Step 1: Define the Pipeline Stages**
\`\`\`python
class ContentPipeline:
    def __init__(self):
        # Sequential main pipeline
        self.main_pipeline = SequentialChain([
            ContentPlanner(),
            DraftGenerator(),
            QualityChecker(),
            ContentOptimizer(),
            PublishingAgent()
        ])

        # Parallel research pipeline
        self.research_pipeline = ParallelChain([
            WebResearcher(),
            DatabaseSearcher(),
            ExpertSystemConsulter()
        ])

        # Conditional formatting pipeline
        self.formatting_pipeline = ConditionalChain()
        self.formatting_pipeline.add_condition(
            lambda x: x['format'] == 'blog',
            BlogFormatter()
        )
        self.formatting_pipeline.add_condition(
            lambda x: x['format'] == 'social',
            SocialMediaFormatter()
        )
        self.formatting_pipeline.add_condition(
            lambda x: x['format'] == 'email',
            EmailFormatter()
        )

        # Hierarchical review process
        self.review_hierarchy = HierarchicalChain("ReviewProcess")
        self.review_hierarchy.add_child(GrammarChecker())
        self.review_hierarchy.add_child(FactChecker())
        self.review_hierarchy.add_child(StyleChecker())

        # Feedback loop for quality
        self.quality_loop = FeedbackLoopChain(
            ContentRefiner(),
            QualityEvaluator()
        )
\`\`\`

**Step 2: Implement Research Phase (Parallel)**
\`\`\`python
async def research_phase(self, topic):
    # Parallel research from multiple sources
    research_results = await self.research_pipeline.run_async({
        'topic': topic,
        'depth': 'comprehensive',
        'sources': ['web', 'database', 'experts']
    })

    # Aggregate research
    aggregated = ResearchAggregator().combine(research_results)

    return {
        'topic': topic,
        'research': aggregated,
        'sources': len(research_results),
        'confidence': self.calculate_confidence(research_results)
    }
\`\`\`

**Step 3: Content Generation (Sequential + Conditional)**
\`\`\`python
async def generate_content(self, research_data, content_spec):
    # Plan content structure
    plan = await ContentPlanner().create_plan({
        'research': research_data,
        'requirements': content_spec
    })

    # Generate draft
    draft = await DraftGenerator().generate({
        'plan': plan,
        'research': research_data,
        'tone': content_spec.get('tone', 'professional')
    })

    # Conditional formatting based on target platform
    formatted = await self.formatting_pipeline.run({
        'content': draft,
        'format': content_spec['format']
    })

    return formatted
\`\`\`

**Step 4: Quality Assurance (Hierarchical + Feedback)**
\`\`\`python
async def quality_assurance(self, content):
    # Hierarchical review
    review_results = await self.review_hierarchy.execute(content)

    # If issues found, enter feedback loop
    if review_results['issues_count'] > 0:
        refined_content = await self.quality_loop.execute({
            'content': content,
            'issues': review_results['issues'],
            'target_score': 0.9
        })
        return refined_content

    return content
\`\`\`

**Step 5: Full Pipeline Execution**
\`\`\`python
async def create_content(self, topic, specifications):
    try:
        # Phase 1: Research (Parallel)
        print("Starting research phase...")
        research = await self.research_phase(topic)

        # Phase 2: Generation (Sequential + Conditional)
        print("Generating content...")
        content = await self.generate_content(research, specifications)

        # Phase 3: Quality Check (Hierarchical + Feedback)
        print("Quality assurance...")
        refined = await self.quality_assurance(content)

        # Phase 4: Optimization (Sequential)
        print("Optimizing for platform...")
        optimized = await ContentOptimizer().optimize({
            'content': refined,
            'platform': specifications['platform'],
            'seo_keywords': specifications.get('keywords', [])
        })

        # Phase 5: Publishing (Conditional)
        print("Publishing...")
        if specifications.get('auto_publish', False):
            published = await PublishingAgent().publish(optimized)
        else:
            published = await PublishingAgent().schedule(optimized)

        return {
            'success': True,
            'content': published,
            'metrics': {
                'research_sources': research['sources'],
                'quality_score': refined.get('quality_score'),
                'optimization_score': optimized.get('seo_score'),
                'processing_time': time.time() - start_time
            }
        }

    except Exception as e:
        # Rollback or save draft
        await self.handle_failure(e, locals())
        raise
\`\`\`

**Results:**
- Content generation time: 2 minutes (vs 2 hours manual)
- Quality score: 92% (human-reviewed)
- SEO optimization: 95% score
- Fact accuracy: 98%
- Publishing success rate: 99.5%
- Cost reduction: 80% vs human writers
      `
    },

    quiz: [
      {
        question: 'What is the main advantage of parallel chaining over sequential chaining?',
        options: [
          'It uses less memory',
          'It can execute multiple independent tasks simultaneously for better performance',
          'It provides better error handling',
          'It is easier to implement'
        ],
        correctAnswer: 1,
        explanation: 'Parallel chaining executes multiple agents simultaneously, significantly reducing total execution time for independent tasks, though it may use more resources.'
      },
      {
        question: 'When should you use hierarchical chaining pattern?',
        options: [
          'For simple linear workflows',
          'For tasks with parent-child relationships and multi-level coordination',
          'For executing tasks in parallel',
          'For conditional routing only'
        ],
        correctAnswer: 1,
        explanation: 'Hierarchical chaining is ideal for complex systems where tasks have parent-child relationships, such as supervisor-worker patterns or multi-level approval workflows.'
      },
      {
        question: 'What is the purpose of checkpointing in agent chains?',
        options: [
          'To make the chain run faster',
          'To reduce memory usage',
          'To enable recovery from failures and resume from specific points',
          'To improve accuracy'
        ],
        correctAnswer: 2,
        explanation: 'Checkpointing saves intermediate states in a pipeline, allowing the system to recover from failures and resume from the last successful checkpoint rather than restarting from the beginning.'
      }
    ],

    exercises: [
      {
        title: 'Design a Hybrid Chain',
        description: 'Create a chain that combines parallel research, conditional routing, and sequential processing for a customer service system',
        hints: [
          'Start with parallel search in FAQ, documentation, and previous tickets',
          'Use conditional routing based on query type',
          'Implement sequential validation and response generation'
        ]
      },
      {
        title: 'Implement Retry Logic',
        description: 'Add comprehensive retry logic with exponential backoff to a sequential chain',
        hints: [
          'Track retry attempts per agent',
          'Implement exponential backoff with jitter',
          'Add circuit breaker pattern for repeated failures'
        ]
      }
    ],

    references: [
      'Wu et al. (2023). AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation',
      'Chase et al. (2023). LangChain: Building applications with LLMs through composability',
      'Workflow Patterns Initiative. (2023). Workflow Control-Flow Patterns',
      'Van Der Aalst et al. (2003). Workflow Patterns'
    ]
  }
};