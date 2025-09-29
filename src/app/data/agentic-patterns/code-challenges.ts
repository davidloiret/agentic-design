import { CodeChallenge } from '../learning-content';

// Build Simple Agent Challenge
export const buildSimpleAgentChallenge: CodeChallenge = {
  id: 'build-simple-agent',
  title: 'Build Your First AI Agent',
  description: 'Create a basic reactive agent that can perceive its environment, make decisions, and take actions',
  difficulty: 'easy',
  topic: 'Agent Fundamentals',
  template: `class SimpleAgent:
    def __init__(self, name):
        self.name = name
        self.state = {}
        self.goals = []
        self.tools = {}

    def perceive(self, environment):
        """Gather information from environment"""
        # TODO: Implement perception
        pass

    def decide(self, perception):
        """Make decision based on perception and goals"""
        # TODO: Implement decision making
        pass

    def act(self, decision):
        """Execute action based on decision"""
        # TODO: Implement action execution
        pass

    def run(self, environment):
        """Main agent loop"""
        # TODO: Implement the perceive-decide-act loop
        pass

# Test your agent
agent = SimpleAgent("MyFirstAgent")
# Add test environment and run`,

  solution: `class SimpleAgent:
    def __init__(self, name):
        self.name = name
        self.state = {'energy': 100, 'position': (0, 0)}
        self.goals = ['explore', 'survive']
        self.tools = {
            'move': self.move,
            'scan': self.scan,
            'rest': self.rest
        }
        self.memory = []

    def perceive(self, environment):
        """Gather information from environment"""
        perception = {
            'current_position': self.state['position'],
            'energy_level': self.state['energy'],
            'nearby_objects': environment.scan_area(self.state['position']),
            'threats': environment.detect_threats(self.state['position'])
        }
        return perception

    def decide(self, perception):
        """Make decision based on perception and goals"""
        # Simple rule-based decision making
        if perception['energy_level'] < 30:
            return {'action': 'rest', 'reason': 'Low energy'}

        if perception['threats']:
            # Move away from threat
            threat_pos = perception['threats'][0]['position']
            safe_direction = self.calculate_escape_direction(threat_pos)
            return {'action': 'move', 'direction': safe_direction, 'reason': 'Avoiding threat'}

        if perception['nearby_objects']:
            # Explore interesting objects
            target = perception['nearby_objects'][0]
            return {'action': 'move', 'target': target['position'], 'reason': 'Exploring'}

        # Default: random exploration
        import random
        direction = random.choice(['north', 'south', 'east', 'west'])
        return {'action': 'move', 'direction': direction, 'reason': 'Random exploration'}

    def act(self, decision):
        """Execute action based on decision"""
        action_type = decision['action']

        if action_type in self.tools:
            result = self.tools[action_type](decision)

            # Update memory
            self.memory.append({
                'decision': decision,
                'result': result,
                'timestamp': time.time()
            })

            return result
        else:
            return {'success': False, 'error': f'Unknown action: {action_type}'}

    def move(self, decision):
        """Move action implementation"""
        self.state['energy'] -= 5

        if 'direction' in decision:
            # Move in direction
            x, y = self.state['position']
            if decision['direction'] == 'north': y += 1
            elif decision['direction'] == 'south': y -= 1
            elif decision['direction'] == 'east': x += 1
            elif decision['direction'] == 'west': x -= 1
            self.state['position'] = (x, y)

        return {'success': True, 'new_position': self.state['position']}

    def scan(self, decision):
        """Scan action implementation"""
        self.state['energy'] -= 2
        return {'success': True, 'scan_complete': True}

    def rest(self, decision):
        """Rest action implementation"""
        self.state['energy'] = min(100, self.state['energy'] + 20)
        return {'success': True, 'energy': self.state['energy']}

    def calculate_escape_direction(self, threat_position):
        """Calculate direction away from threat"""
        x, y = self.state['position']
        tx, ty = threat_position

        if tx > x: return 'west'
        elif tx < x: return 'east'
        elif ty > y: return 'south'
        else: return 'north'

    def run(self, environment, max_steps=100):
        """Main agent loop"""
        for step in range(max_steps):
            # Perceive
            perception = self.perceive(environment)

            # Decide
            decision = self.decide(perception)

            # Act
            result = self.act(decision)

            # Log
            print(f"Step {step}: {decision['reason']} - {result}")

            # Check termination conditions
            if self.state['energy'] <= 0:
                print(f"Agent {self.name} ran out of energy!")
                break

            # Learn from experience (optional)
            self.learn_from_memory()

    def learn_from_memory(self):
        """Simple learning from past experiences"""
        if len(self.memory) > 10:
            # Analyze recent decisions
            recent = self.memory[-10:]
            successful = [m for m in recent if m['result'].get('success')]
            success_rate = len(successful) / len(recent)

            if success_rate < 0.5:
                # Adjust strategy
                print(f"Low success rate ({success_rate}), adjusting strategy...")`,

  tests: [
    {
      description: 'Agent can perceive environment',
      input: { environment: { energy_level: 50, obstacles: [] } },
      expectedOutput: { perceived: true }
    },
    {
      description: 'Agent makes decisions based on perception',
      input: { perception: { energy_level: 25 } },
      expectedOutput: { action: 'rest' }
    },
    {
      description: 'Agent executes actions and updates state',
      input: { action: 'rest', initialEnergy: 50 },
      expectedOutput: { energyIncreased: true }
    }
  ],

  hints: [
    'Start with a simple perceive-decide-act loop',
    'Use a dictionary to store agent state',
    'Implement at least 3 different actions',
    'Add memory to track past decisions'
  ]
};

// Implement ReAct Agent Challenge
export const implementReActAgentChallenge: CodeChallenge = {
  id: 'implement-react-agent',
  title: 'Implement a ReAct Agent',
  description: 'Build an agent that combines reasoning with action execution using the ReAct pattern',
  difficulty: 'medium',
  topic: 'Agent Patterns',
  template: `class ReActAgent:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = tools
        self.max_steps = 10

    def run(self, task):
        """Execute task using ReAct pattern"""
        prompt = f"Task: {task}\\n\\n"

        for step in range(self.max_steps):
            # TODO: Generate thought
            thought = None

            # TODO: Generate action
            action = None

            # TODO: Execute action and get observation
            observation = None

            # TODO: Check if task is complete
            pass

        return "Task incomplete"

    def parse_action(self, action_str):
        """Parse action string into action name and parameters"""
        # TODO: Implement action parsing
        pass

# Example tools
tools = {
    'search': lambda q: f"Results for: {q}",
    'calculate': lambda expr: eval(expr),
    'finish': lambda answer: answer
}`,

  solution: `import re

class ReActAgent:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = tools
        self.max_steps = 10
        self.trace = []

    def run(self, task):
        """Execute task using ReAct pattern"""
        prompt = f"Task: {task}\\n\\n"

        for step in range(self.max_steps):
            # Generate thought
            thought_prompt = prompt + "Thought: "
            thought = self.llm.generate(
                thought_prompt,
                stop=["Action:", "Observation:"]
            )
            prompt += f"Thought: {thought}\\n"

            # Generate action
            action_prompt = prompt + "Action: "
            action_str = self.llm.generate(
                action_prompt,
                stop=["Observation:", "Thought:"]
            )
            prompt += f"Action: {action_str}\\n"

            # Parse and execute action
            action_name, action_params = self.parse_action(action_str)

            # Check for finish action
            if action_name == "Finish":
                self.trace.append({
                    'step': step,
                    'thought': thought,
                    'action': action_str,
                    'result': action_params
                })
                return action_params

            # Execute action
            if action_name in self.tools:
                try:
                    observation = self.tools[action_name](action_params)
                except Exception as e:
                    observation = f"Error: {str(e)}"
            else:
                observation = f"Unknown action: {action_name}"

            prompt += f"Observation: {observation}\\n\\n"

            # Store trace
            self.trace.append({
                'step': step,
                'thought': thought,
                'action': action_str,
                'observation': observation
            })

        return "Max steps reached without solution"

    def parse_action(self, action_str):
        """Parse action string into action name and parameters"""
        # Handle format: ActionName[parameters]
        match = re.match(r'(\\w+)\\[(.*)\\]', action_str.strip())

        if match:
            action_name = match.group(1)
            params_str = match.group(2)

            # Parse parameters based on action
            if action_name == "Search":
                return action_name, params_str.strip('"')
            elif action_name == "Calculate":
                return action_name, params_str
            elif action_name == "Finish":
                return action_name, params_str.strip('"')
            else:
                return action_name, params_str

        # Fallback parsing
        parts = action_str.split(':', 1)
        if len(parts) == 2:
            return parts[0].strip(), parts[1].strip()

        return "Unknown", action_str

    def get_trace(self):
        """Return execution trace for debugging"""
        return self.trace

    def reset(self):
        """Reset agent state"""
        self.trace = []

# Enhanced version with reflection
class ReflectiveReActAgent(ReActAgent):
    def __init__(self, llm, tools):
        super().__init__(llm, tools)
        self.reflection_threshold = 3

    def run(self, task):
        """Execute with reflection after failures"""
        result = super().run(task)

        # Check if we should reflect
        if result == "Max steps reached without solution":
            reflection = self.reflect_on_failure(task)

            # Try again with reflection
            self.reset()
            enhanced_task = f"{task}\\n\\nReflection from previous attempt: {reflection}"
            result = super().run(enhanced_task)

        return result

    def reflect_on_failure(self, task):
        """Analyze failure and generate insights"""
        # Analyze trace
        failed_actions = [t for t in self.trace if 'Error' in t.get('observation', '')]

        reflection_prompt = f"""
        Task: {task}
        Failed actions: {failed_actions}
        What went wrong and how to fix it?
        """

        reflection = self.llm.generate(reflection_prompt)
        return reflection`,

  tests: [
    {
      description: 'ReAct agent can parse actions correctly',
      input: { actionString: 'Search[climate change]' },
      expectedOutput: { name: 'Search', params: 'climate change' }
    },
    {
      description: 'Agent executes tools and gets observations',
      input: { tools: ['Calculate'], expression: '2+2' },
      expectedOutput: { result: 4 }
    },
    {
      description: 'Agent maintains trace of execution',
      input: { task: 'test task' },
      expectedOutput: { hasTrace: true }
    }
  ],

  hints: [
    'Follow the Thought → Action → Observation pattern',
    'Parse actions in format: ActionName[parameters]',
    'Handle the special Finish action to complete tasks',
    'Keep a trace for debugging and reflection'
  ]
};

// Build RAG System Challenge
export const buildRAGSystemChallenge: CodeChallenge = {
  id: 'build-rag-system',
  title: 'Build a Complete RAG System',
  description: 'Implement a production-ready RAG system with indexing, retrieval, and generation',
  difficulty: 'hard',
  topic: 'RAG Systems',
  template: `class RAGSystem:
    def __init__(self, embedding_model, llm, vector_store):
        self.embedding_model = embedding_model
        self.llm = llm
        self.vector_store = vector_store
        self.chunk_size = 500
        self.top_k = 5

    def index_documents(self, documents):
        """Index documents for retrieval"""
        # TODO: Implement document indexing
        pass

    def retrieve(self, query):
        """Retrieve relevant documents for query"""
        # TODO: Implement retrieval
        pass

    def generate(self, query, documents):
        """Generate response using retrieved documents"""
        # TODO: Implement generation
        pass

    def query(self, question):
        """End-to-end RAG pipeline"""
        # TODO: Implement complete pipeline
        pass

# Implement advanced features
class AdvancedRAG(RAGSystem):
    # TODO: Add query enhancement, reranking, etc.
    pass`,

  solution: `import numpy as np
from typing import List, Dict, Any

class RAGSystem:
    def __init__(self, embedding_model, llm, vector_store):
        self.embedding_model = embedding_model
        self.llm = llm
        self.vector_store = vector_store
        self.chunk_size = 500
        self.chunk_overlap = 50
        self.top_k = 5
        self.indexed_docs = 0

    def index_documents(self, documents):
        """Index documents for retrieval"""
        for doc in documents:
            # Chunk document
            chunks = self.chunk_document(doc)

            # Create embeddings
            for chunk in chunks:
                embedding = self.embedding_model.encode(chunk['text'])

                # Store in vector database
                self.vector_store.add(
                    id=chunk['id'],
                    embedding=embedding,
                    metadata={
                        'text': chunk['text'],
                        'source': doc.source,
                        'chunk_index': chunk['index'],
                        'doc_id': doc.id
                    }
                )

            self.indexed_docs += 1

        return f"Indexed {self.indexed_docs} documents"

    def chunk_document(self, document):
        """Chunk document with overlap"""
        text = document.content
        chunks = []

        # Sentence-aware chunking
        sentences = self.split_sentences(text)
        current_chunk = []
        current_size = 0

        for i, sentence in enumerate(sentences):
            sentence_size = len(sentence.split())

            if current_size + sentence_size > self.chunk_size:
                # Save current chunk
                chunk_text = ' '.join(current_chunk)
                chunks.append({
                    'id': f"{document.id}_chunk_{len(chunks)}",
                    'text': chunk_text,
                    'index': len(chunks)
                })

                # Start new chunk with overlap
                overlap_sentences = max(0, len(current_chunk) - 2)
                current_chunk = current_chunk[overlap_sentences:]
                current_size = sum(len(s.split()) for s in current_chunk)

            current_chunk.append(sentence)
            current_size += sentence_size

        # Add final chunk
        if current_chunk:
            chunks.append({
                'id': f"{document.id}_chunk_{len(chunks)}",
                'text': ' '.join(current_chunk),
                'index': len(chunks)
            })

        return chunks

    def split_sentences(self, text):
        """Simple sentence splitter"""
        import re
        sentences = re.split(r'[.!?]+', text)
        return [s.strip() for s in sentences if s.strip()]

    def retrieve(self, query):
        """Retrieve relevant documents for query"""
        # Embed query
        query_embedding = self.embedding_model.encode(query)

        # Search vector store
        results = self.vector_store.search(
            query_embedding,
            top_k=self.top_k * 2  # Get more for reranking
        )

        # Deduplicate by document
        seen_docs = set()
        unique_results = []

        for result in results:
            doc_id = result['metadata']['doc_id']
            if doc_id not in seen_docs:
                seen_docs.add(doc_id)
                unique_results.append(result)
                if len(unique_results) >= self.top_k:
                    break

        return unique_results

    def generate(self, query, documents):
        """Generate response using retrieved documents"""
        # Format context
        context = self.format_context(documents)

        # Create prompt
        prompt = f"""Answer the question based on the following context.
If the answer cannot be found in the context, say "I don't have enough information."

Context:
{context}

Question: {query}

Answer:"""

        # Generate response
        response = self.llm.generate(prompt, max_tokens=500)

        # Add citations
        response_with_citations = self.add_citations(response, documents)

        return response_with_citations

    def format_context(self, documents):
        """Format documents into context string"""
        context_parts = []

        for i, doc in enumerate(documents, 1):
            text = doc['metadata']['text']
            source = doc['metadata']['source']
            context_parts.append(f"[{i}] {text}\\n(Source: {source})")

        return "\\n\\n".join(context_parts)

    def add_citations(self, response, documents):
        """Add source citations to response"""
        # Simple citation adding - could be more sophisticated
        citations = []
        for i, doc in enumerate(documents, 1):
            if any(keyword in response.lower() for keyword in doc['metadata']['text'].lower().split()[:5]):
                citations.append(f"[{i}] {doc['metadata']['source']}")

        if citations:
            response += "\\n\\nSources:\\n" + "\\n".join(citations)

        return response

    def query(self, question):
        """End-to-end RAG pipeline"""
        # Retrieve relevant documents
        documents = self.retrieve(question)

        if not documents:
            return "No relevant documents found."

        # Generate response
        response = self.generate(question, documents)

        return response


class AdvancedRAG(RAGSystem):
    """Advanced RAG with query enhancement and reranking"""

    def __init__(self, embedding_model, llm, vector_store, reranker=None):
        super().__init__(embedding_model, llm, vector_store)
        self.reranker = reranker
        self.use_hyde = True

    def enhance_query(self, query):
        """Enhance query using multiple techniques"""
        enhanced_queries = [query]  # Original

        # Query expansion
        expansion_prompt = f"Generate 3 alternative phrasings of: {query}"
        expansions = self.llm.generate(expansion_prompt).split('\\n')
        enhanced_queries.extend(expansions[:3])

        # HyDE (Hypothetical Document Embeddings)
        if self.use_hyde:
            hyde_prompt = f"Write a detailed answer to: {query}"
            hypothetical = self.llm.generate(hyde_prompt, max_tokens=200)
            enhanced_queries.append(hypothetical)

        return enhanced_queries

    def retrieve(self, query):
        """Enhanced retrieval with query enhancement"""
        # Enhance query
        enhanced_queries = self.enhance_query(query)

        # Retrieve for all enhanced queries
        all_results = []
        seen_ids = set()

        for eq in enhanced_queries:
            query_embedding = self.embedding_model.encode(eq)
            results = self.vector_store.search(query_embedding, top_k=self.top_k)

            for result in results:
                if result['id'] not in seen_ids:
                    seen_ids.add(result['id'])
                    all_results.append(result)

        # Rerank if reranker available
        if self.reranker:
            all_results = self.rerank_results(query, all_results)

        return all_results[:self.top_k]

    def rerank_results(self, query, results):
        """Rerank results using cross-encoder"""
        # Score each result
        scored_results = []
        for result in results:
            text = result['metadata']['text']
            score = self.reranker.score(query, text)
            result['rerank_score'] = score
            scored_results.append(result)

        # Sort by rerank score
        scored_results.sort(key=lambda x: x['rerank_score'], reverse=True)

        return scored_results

    def generate(self, query, documents):
        """Enhanced generation with self-consistency"""
        # Generate multiple responses
        responses = []
        for i in range(3):
            response = super().generate(query, documents)
            responses.append(response)

        # Select best or combine
        final_response = self.select_best_response(responses, query)

        return final_response

    def select_best_response(self, responses, query):
        """Select best response using self-consistency"""
        # Simple: return most common response
        # Advanced: use LLM to judge
        from collections import Counter

        # Extract key facts from each response
        facts = []
        for response in responses:
            fact_prompt = f"Extract key facts from: {response}"
            extracted = self.llm.generate(fact_prompt)
            facts.append(extracted)

        # Find most consistent facts
        fact_counter = Counter(facts)
        most_common = fact_counter.most_common(1)[0][0]

        # Return response with most common facts
        for response, fact in zip(responses, facts):
            if fact == most_common:
                return response

        return responses[0]  # Fallback`,

  tests: [
    {
      description: 'RAG system can index documents',
      input: { documents: ['doc1', 'doc2'] },
      expectedOutput: { indexed: true }
    },
    {
      description: 'Retrieval returns relevant documents',
      input: { query: 'test query', topK: 3 },
      expectedOutput: { maxDocs: 3 }
    },
    {
      description: 'Generation includes citations',
      input: { question: 'test question', docs: ['doc1'] },
      expectedOutput: { hasCitations: true }
    }
  ],

  hints: [
    'Implement smart chunking with overlap',
    'Use embeddings for semantic search',
    'Add query enhancement techniques',
    'Include source citations in responses'
  ]
};

// Multi-Agent System Challenge
export const multiAgentSystemChallenge: CodeChallenge = {
  id: 'multi-agent-system',
  title: 'Build a Multi-Agent Collaboration System',
  description: 'Create a multi-agent system with supervisor-worker pattern and peer collaboration',
  difficulty: 'hard',
  topic: 'Multi-Agent Systems',
  template: `class MultiAgentSystem:
    def __init__(self):
        self.supervisor = None
        self.workers = []
        self.communication_bus = None

    def add_supervisor(self, supervisor):
        """Add supervisor agent"""
        # TODO: Implement
        pass

    def add_worker(self, worker):
        """Add worker agent"""
        # TODO: Implement
        pass

    def execute_task(self, task):
        """Execute task using multi-agent collaboration"""
        # TODO: Implement task execution
        pass

class SupervisorAgent:
    # TODO: Implement supervisor
    pass

class WorkerAgent:
    # TODO: Implement worker
    pass`,

  solution: `import asyncio
from typing import List, Dict, Any
from collections import defaultdict
import uuid

class CommunicationBus:
    """Message passing infrastructure"""
    def __init__(self):
        self.subscribers = defaultdict(list)
        self.message_history = []

    async def publish(self, topic, message):
        """Publish message to topic"""
        self.message_history.append({
            'topic': topic,
            'message': message,
            'timestamp': time.time()
        })

        # Notify subscribers
        if topic in self.subscribers:
            tasks = []
            for subscriber in self.subscribers[topic]:
                tasks.append(subscriber.receive_message(topic, message))
            await asyncio.gather(*tasks)

    def subscribe(self, topic, agent):
        """Subscribe agent to topic"""
        self.subscribers[topic].append(agent)

class MultiAgentSystem:
    def __init__(self):
        self.supervisor = None
        self.workers = []
        self.communication_bus = CommunicationBus()
        self.task_queue = asyncio.Queue()
        self.result_queue = asyncio.Queue()

    def add_supervisor(self, supervisor):
        """Add supervisor agent"""
        self.supervisor = supervisor
        self.supervisor.set_system(self)

        # Subscribe supervisor to important topics
        self.communication_bus.subscribe('worker_status', supervisor)
        self.communication_bus.subscribe('task_complete', supervisor)
        self.communication_bus.subscribe('error', supervisor)

    def add_worker(self, worker):
        """Add worker agent"""
        self.workers.append(worker)
        worker.set_system(self)

        # Subscribe worker to relevant topics
        self.communication_bus.subscribe('task_assignment', worker)
        self.communication_bus.subscribe('priority_change', worker)

    async def execute_task(self, task):
        """Execute task using multi-agent collaboration"""
        if not self.supervisor:
            raise ValueError("No supervisor assigned")

        # Supervisor analyzes and decomposes task
        subtasks = await self.supervisor.decompose_task(task)

        # Distribute subtasks to workers
        assignments = await self.supervisor.assign_tasks(subtasks, self.workers)

        # Execute assignments in parallel
        results = await self.execute_assignments(assignments)

        # Supervisor aggregates results
        final_result = await self.supervisor.aggregate_results(results, task)

        return final_result

    async def execute_assignments(self, assignments):
        """Execute task assignments in parallel"""
        tasks = []

        for assignment in assignments:
            worker = assignment['worker']
            subtask = assignment['task']

            # Create execution task
            exec_task = asyncio.create_task(
                self.monitor_worker_execution(worker, subtask)
            )
            tasks.append(exec_task)

        # Wait for all tasks to complete
        results = await asyncio.gather(*tasks, return_exceptions=True)

        # Handle any failures
        successful_results = []
        for result in results:
            if isinstance(result, Exception):
                # Handle failure
                await self.handle_worker_failure(result)
            else:
                successful_results.append(result)

        return successful_results

    async def monitor_worker_execution(self, worker, task):
        """Monitor individual worker execution"""
        try:
            # Set timeout for worker
            result = await asyncio.wait_for(
                worker.execute(task),
                timeout=task.get('timeout', 60)
            )

            # Notify completion
            await self.communication_bus.publish('task_complete', {
                'worker': worker.id,
                'task': task,
                'result': result
            })

            return result

        except asyncio.TimeoutError:
            await self.communication_bus.publish('error', {
                'worker': worker.id,
                'error': 'Task timeout',
                'task': task
            })
            raise
        except Exception as e:
            await self.communication_bus.publish('error', {
                'worker': worker.id,
                'error': str(e),
                'task': task
            })
            raise

    async def handle_worker_failure(self, error):
        """Handle worker failure"""
        # Supervisor decides on recovery strategy
        recovery_strategy = await self.supervisor.determine_recovery(error)

        if recovery_strategy == 'retry':
            # Retry with different worker
            pass  # Implementation
        elif recovery_strategy == 'skip':
            # Skip this subtask
            pass  # Implementation
        elif recovery_strategy == 'abort':
            # Abort entire task
            raise error

class SupervisorAgent:
    def __init__(self, name="Supervisor"):
        self.name = name
        self.id = str(uuid.uuid4())
        self.system = None
        self.worker_performance = defaultdict(dict)

    def set_system(self, system):
        self.system = system

    async def decompose_task(self, task):
        """Decompose complex task into subtasks"""
        subtasks = []

        # Analyze task complexity
        if task['type'] == 'complex':
            # Break down into phases
            phases = self.identify_phases(task)

            for phase in phases:
                subtask = {
                    'id': str(uuid.uuid4()),
                    'parent_task': task['id'],
                    'phase': phase['name'],
                    'description': phase['description'],
                    'dependencies': phase.get('dependencies', []),
                    'required_skills': phase.get('skills', []),
                    'priority': phase.get('priority', 'normal'),
                    'timeout': phase.get('timeout', 60)
                }
                subtasks.append(subtask)
        else:
            # Simple task - single subtask
            subtasks.append(task)

        return subtasks

    def identify_phases(self, task):
        """Identify execution phases for complex task"""
        # This would use more sophisticated analysis in production
        if 'data_processing' in task.get('description', ''):
            return [
                {'name': 'data_collection', 'description': 'Collect required data', 'skills': ['data_access']},
                {'name': 'data_cleaning', 'description': 'Clean and validate data', 'skills': ['data_processing']},
                {'name': 'data_analysis', 'description': 'Analyze processed data', 'skills': ['analytics']},
                {'name': 'report_generation', 'description': 'Generate final report', 'skills': ['reporting']}
            ]
        return [{'name': 'execution', 'description': task['description']}]

    async def assign_tasks(self, subtasks, workers):
        """Assign subtasks to workers based on capabilities"""
        assignments = []

        for subtask in subtasks:
            # Find best worker for this subtask
            best_worker = self.select_best_worker(subtask, workers)

            if best_worker:
                assignment = {
                    'task': subtask,
                    'worker': best_worker,
                    'assigned_at': time.time()
                }
                assignments.append(assignment)

                # Notify worker of assignment
                await self.system.communication_bus.publish('task_assignment', {
                    'worker_id': best_worker.id,
                    'task': subtask
                })
            else:
                # No suitable worker - handle this case
                print(f"Warning: No suitable worker for task {subtask['id']}")

        return assignments

    def select_best_worker(self, task, workers):
        """Select best worker based on skills and availability"""
        candidates = []

        for worker in workers:
            # Check if worker has required skills
            required_skills = set(task.get('required_skills', []))
            if required_skills.issubset(worker.skills):
                # Calculate suitability score
                score = self.calculate_worker_score(worker, task)
                candidates.append((worker, score))

        if candidates:
            # Select worker with highest score
            candidates.sort(key=lambda x: x[1], reverse=True)
            return candidates[0][0]

        return None

    def calculate_worker_score(self, worker, task):
        """Calculate worker suitability score"""
        score = 0.0

        # Skill match
        skill_overlap = len(set(task.get('required_skills', [])) & worker.skills)
        score += skill_overlap * 10

        # Availability
        if worker.status == 'idle':
            score += 20
        elif worker.status == 'busy':
            score -= 10

        # Past performance
        if worker.id in self.worker_performance:
            perf = self.worker_performance[worker.id]
            success_rate = perf.get('success_rate', 0.5)
            score += success_rate * 30

        # Workload balance
        current_load = getattr(worker, 'current_load', 0)
        score -= current_load * 5

        return score

    async def aggregate_results(self, results, original_task):
        """Aggregate results from all workers"""
        aggregated = {
            'task_id': original_task['id'],
            'status': 'complete',
            'results': results,
            'summary': None
        }

        # Create summary based on task type
        if original_task['type'] == 'analysis':
            aggregated['summary'] = self.create_analysis_summary(results)
        elif original_task['type'] == 'generation':
            aggregated['summary'] = self.merge_generated_content(results)
        else:
            aggregated['summary'] = results

        return aggregated

    def create_analysis_summary(self, results):
        """Create summary from analysis results"""
        summary = {
            'key_findings': [],
            'recommendations': [],
            'data_points': []
        }

        for result in results:
            if 'findings' in result:
                summary['key_findings'].extend(result['findings'])
            if 'recommendations' in result:
                summary['recommendations'].extend(result['recommendations'])
            if 'data' in result:
                summary['data_points'].append(result['data'])

        return summary

    def merge_generated_content(self, results):
        """Merge generated content from multiple workers"""
        merged = []
        for result in results:
            if isinstance(result, str):
                merged.append(result)
            elif isinstance(result, dict) and 'content' in result:
                merged.append(result['content'])
        return '\\n\\n'.join(merged)

    async def receive_message(self, topic, message):
        """Handle messages from communication bus"""
        if topic == 'worker_status':
            # Update worker performance tracking
            worker_id = message['worker_id']
            self.worker_performance[worker_id].update(message['status'])

        elif topic == 'task_complete':
            # Log successful completion
            print(f"Task completed by worker {message['worker']}")

        elif topic == 'error':
            # Handle error
            print(f"Error from worker {message['worker']}: {message['error']}")

    async def determine_recovery(self, error):
        """Determine recovery strategy for failures"""
        # Simple strategy - could be more sophisticated
        if 'timeout' in str(error).lower():
            return 'retry'
        elif 'not found' in str(error).lower():
            return 'skip'
        else:
            return 'abort'

class WorkerAgent:
    def __init__(self, name, skills):
        self.name = name
        self.id = str(uuid.uuid4())
        self.skills = set(skills)
        self.status = 'idle'
        self.current_task = None
        self.system = None
        self.current_load = 0

    def set_system(self, system):
        self.system = system

    async def execute(self, task):
        """Execute assigned task"""
        self.status = 'busy'
        self.current_task = task
        self.current_load += 1

        try:
            # Simulate task execution
            result = await self.process_task(task)

            self.status = 'idle'
            self.current_task = None
            self.current_load -= 1

            return result

        except Exception as e:
            self.status = 'error'
            self.current_load -= 1
            raise

    async def process_task(self, task):
        """Process the actual task"""
        # Simulate different processing based on task type
        await asyncio.sleep(1)  # Simulate work

        if 'data_collection' in task.get('phase', ''):
            return {'data': [1, 2, 3, 4, 5], 'source': 'database'}

        elif 'data_analysis' in task.get('phase', ''):
            return {'findings': ['Pattern A detected', 'Trend B observed'], 'confidence': 0.85}

        elif 'report_generation' in task.get('phase', ''):
            return {'content': 'Executive Summary: Analysis complete with key findings...'}

        else:
            return {'result': f"Task {task['id']} completed by {self.name}"}

    async def receive_message(self, topic, message):
        """Handle messages from communication bus"""
        if topic == 'task_assignment' and message['worker_id'] == self.id:
            # Acknowledge task assignment
            print(f"{self.name} received task: {message['task']['id']}")

        elif topic == 'priority_change':
            # Adjust task priority if relevant
            if self.current_task and self.current_task['id'] == message['task_id']:
                self.current_task['priority'] = message['new_priority']`,

  tests: [
    {
      description: 'Multi-agent system can add supervisor and workers',
      input: { workerName: 'W1', skills: ['skill1'] },
      expectedOutput: { workerCount: 1 }
    },
    {
      description: 'Supervisor can decompose tasks',
      input: { taskType: 'complex' },
      expectedOutput: { hasSubtasks: true }
    },
    {
      description: 'System executes tasks with collaboration',
      input: { task: 'test task' },
      expectedOutput: { hasResult: true }
    }
  ],

  hints: [
    'Implement message passing for agent communication',
    'Use async/await for parallel execution',
    'Add worker selection based on skills',
    'Include error handling and recovery'
  ]
};

// Combine all code challenges
export const allAgenticPatternsCodeChallenges = [
  buildSimpleAgentChallenge,
  implementReActAgentChallenge,
  buildRAGSystemChallenge,
  multiAgentSystemChallenge
];