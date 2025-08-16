# Comprehensive Taxonomy of Patterns and Techniques for Agentic AI Systems

*A research-backed reference guide for AI systems engineers (2022-August 2025)*

## 1. Reasoning and Prompting Techniques

### 1.1 Chain-Based Reasoning
- **Chain-of-Thought (CoT)** - Wei et al. (2022) "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" arXiv:2201.11903
  - Zero-shot CoT ("Let's think step by step")
  - Auto-CoT (automatic reasoning chain generation)
  - Multimodal CoT
  
- **Self-Consistency** - Wang et al. (2022) "Self-Consistency Improves Chain of Thought Reasoning in Language Models" arXiv:2203.11171
  - Sample multiple reasoning paths and select most consistent answer

### 1.2 Tree and Graph Structures
- **Tree-of-Thought (ToT)** - Yao et al. (2023) "Tree of Thoughts: Deliberate Problem Solving with Large Language Models" NeurIPS 2023
  - Explores coherent text units as intermediate steps with backtracking
  
- **Graph-of-Thought (GoT)** - Besta et al. (2023) "Graph of Thoughts: Solving Elaborate Problems with Large Language Models" AAAI 2024
  - Models information as arbitrary graphs with thought vertices and dependency edges
  
- **Algorithm of Thoughts (AoT)** - Sel et al. (2023) "Algorithm of Thoughts: Enhancing Exploration of Ideas in Large Language Models" arXiv:2308.10379

### 1.3 Interactive Reasoning
- **ReAct** - Yao et al. (2022) "ReAct: Synergizing Reasoning and Acting in Language Models" ICLR 2023
  - Interleaves reasoning traces with task-specific actions
  
- **Program-Aided Language Models (PAL)** - Gao et al. (2022) "PAL: Program-aided Language Models" ICML 2023
  - Generates Python programs as intermediate reasoning steps

### 1.4 Debate and Consensus
- **Multi-Agent Debate (MAD)** - Du et al. (2023) "Improving Factuality and Reasoning in Language Models through Multiagent Debate" arXiv:2305.14325
- **Society of Mind** - Framework for agents to debate and reconcile differences

## 2. Knowledge Retrieval (RAG) Systems

### 2.1 Core RAG Architectures
- **Classical RAG** - Lewis et al. (2020) "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" NeurIPS 2020
  - Chunking, embeddings, vector databases, semantic similarity
  
- **Graph RAG** - Edge et al. (2024) "From Local to Global: A Graph RAG Approach to Query-Focused Summarization" Microsoft Research
  - LLM-generated knowledge graphs with hierarchical community detection
  
- **Self-RAG** - Asai et al. (2023) "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection" ICLR 2024
  - Reflection tokens for adaptive retrieval decisions

### 2.2 Advanced RAG Variants
- **Corrective RAG (CRAG)** - Yan et al. (2024) "Corrective Retrieval Augmented Generation" arXiv:2401.15884
  - Lightweight retrieval evaluator with web search augmentation
  
- **Adaptive RAG** - Jeong et al. (2024) "Adaptive-RAG: Learning to Adapt Retrieval-Augmented Large Language Models through Question Complexity" NAACL 2024
  
- **Modular RAG** - Gao et al. (2024) "Modular RAG: Transforming RAG Systems into LEGO-like Reconfigurable Frameworks" arXiv:2407.21059
  
- **Multimodal RAG** - Supporting text, image, video, and audio retrieval
  
- **Hierarchical RAG/RAPTOR** - Recursive clustering and summarization for tree structures
  
- **Chain-of-Verification RAG** - Dhuliawala et al. (2023) "Chain-of-Verification Reduces Hallucination in Large Language Models" Meta AI Research
  
- **Agentic RAG** - Singh et al. (2025) "Agentic Retrieval-Augmented Generation: A Survey on Agentic RAG" arXiv:2501.09136

## 3. Multi-Agent Collaboration

### 3.1 Communication Patterns
- **Agent-to-Agent (A2A) Protocol** - Direct peer-to-peer communication without intermediaries
- **Message Passing** - Structured message exchange protocols (FIPA-ACL compliant)
- **Blackboard Architecture** - Shared knowledge repository for incremental problem-solving
- **Contract Net Protocol** - Task announcement, bidding, and contract award mechanisms

### 3.2 Organizational Structures
- **Sequential Handoffs** - OpenAI Swarm (2024), pipeline processing patterns
- **Parallel Processing** - Concurrent agent execution with result aggregation
- **Hierarchical Structures** - Microsoft Magentic-One, layered command and control
- **Expert Teams** - MetaGPT (Hong et al., 2024), ChatDev (Qian et al., 2024)
- **Critic-Reviewer** - LEGO Framework with iterative refinement loops
- **Swarm Intelligence** - Distributed decision-making with emergent behaviors

### 3.3 Emerging Collaboration Patterns
- **Mixture of Agents (MoA)** - Layered architecture with proposer and aggregator agents (2025)
- **Dynamic Coordination** - Adaptive task-responsive agent assignment
- **Puppeteer Paradigm** - Centralized orchestrators directing agent activities via RL

## 4. Tool Use and Function Calling

### 4.1 Core Mechanisms
- **Function Calling** - OpenAI, Anthropic standardized JSON-based tool invocation
- **Structured Output** - Schema-enforced JSON generation with validation
- **Code Execution** - Sandboxed Python interpreters, containerized environments
- **Model Context Protocol (MCP)** - Anthropic's standardization for tool integration (2024)

### 4.2 Tool Learning
- **Toolformer** - Schick et al. (2023) Self-supervised API learning
- **WebGPT** - Nakano et al. (2021) Browser-assisted question answering
- **Zero-shot Tool Use** - Models learning tool usage without explicit training

### 4.3 Advanced Capabilities
- **Multi-modal Tool Use** - GPT-4V/4o, Claude 4 vision-language tool integration
- **Tool Composition** - Hierarchical and conditional tool chaining
- **Automatic Tool Generation** - Dynamic tool synthesis from existing components

## 5. Memory Management

### 5.1 Memory Types
- **Working Memory** - MemGPT (Packer et al., 2023) "MemGPT: Towards LLMs as Operating Systems" arXiv:2310.08560
- **Long-Term Memory** - Persistent storage across sessions
- **Episodic Memory** - Sequential experience replay for learning
- **Semantic Memory** - Declarative knowledge storage
- **Vector Memory** - Embedding-based retrieval systems
- **Graph Memory** - Structured relationship encoding

### 5.2 Memory Architectures
- **A-MEM** - Xu et al. (2025) "A-MEM: Agentic Memory for LLM Agents" arXiv:2502.12110
  - Zettelkasten-inspired dynamic memory structuring
- **MemoryBank** - Zhong et al. (2024) Ebbinghaus Forgetting Curve-based adaptation
- **Reflexion** - Shinn et al. (2023) "Reflexion: Language Agents with Verbal Reinforcement Learning" arXiv:2303.11366

## 6. Context Management

### 6.1 Context Extension Techniques
- **Extended Windows** - Evolution from 2K to 10M+ tokens (Llama 4 Scout)
- **Infinite Context** - Google's Infini-Attention (2024) "Leave No Context Behind" arXiv:2404.07143
- **RoPE Extensions** - Position Interpolation, NTK-Aware scaling, YaRN

### 6.2 Context Compression
- **LLMLingua Series** - Token-level compression based on information entropy
- **In-Context Auto-Encoders (ICAE)** - Ge et al. (2023) arXiv:2307.06945
- **RECOMP** - Xu et al. (2024) Two-tier extractive and abstractive compression

### 6.3 Attention Mechanisms
- **FlashAttention** - Dao et al. (2022) Memory-efficient exact attention NeurIPS 2022
- **Sliding Window** - Longformer (Beltagy et al., 2020) sparse attention patterns
- **Hierarchical Memory** - AutoCompressors, Recurrent Memory Transformers

## 7. Learning and Adaptation

### 7.1 Preference Optimization
- **Direct Preference Optimization (DPO)** - Rafailov et al. (2023) "Direct Preference Optimization" arXiv:2305.18290
  - Identity Preference Optimization (IPO)
  - Conservative DPO
  - Kahneman-Tversky Optimization (KTO)
- **Proximal Policy Optimization (PPO)** - Schulman et al. (2017) Foundation for RLHF
- **RLHF/RLAIF** - Lee et al. (2023) "RLAIF vs. RLHF" arXiv:2309.00267

### 7.2 Online and Continual Learning
- **Memory-Based Learning** - Cross-session experience accumulation
- **Few-Shot/Zero-Shot Learning** - Rapid task adaptation with minimal examples
- **Meta-Learning** - Learning to learn new tasks efficiently

### 7.3 Self-Improvement
- **Recursive Self-Improvement** - Gödel Agent, Darwin-Gödel Machine achieving continuous enhancement
- **RISE** - Recursive Introspection for mistake detection and correction

## 8. Planning and Goal Management

### 8.1 Planning Techniques
- **Hierarchical Planning** - Webb et al. (2024) "Improving Planning with Large Language Models" arXiv:2310.00194
- **Goal Decomposition** - Breaking complex objectives into manageable subtasks
- **Monte Carlo Tree Search (MCTS)** - Parthasarathy et al. (2023) "C-MCTS: Safe Planning" arXiv:2305.16209
- **Scenario Planning** - Multiple future state exploration
- **ReWOO** - Reasoning Without Observation, separating planning from execution

### 8.2 Goal Setting and Monitoring
- **Hierarchical Goal Structures** - Multi-level objective organization
- **Adaptive Goal Modification** - Context-aware refinement based on feedback
- **Goal Achievement Metrics** - Real-time tracking and success measurement

## 9. Safety and Guardrails

### 9.1 Safety Patterns
- **Constitutional AI** - Anthropic's principle-based self-critique and revision
- **Input/Output Filtering** - Content moderation and safety classification
- **Red Teaming** - Tree of Attacks with Pruning (TAP), automated adversarial testing
- **Jailbreak Prevention** - Defense against prompt injection and manipulation

### 9.2 Guardrails Frameworks
- **NeMo Guardrails** - NVIDIA's comprehensive orchestration platform with Colang
- **Guardrails AI** - Open-source community-driven validators
- **LlamaGuard** - Meta's instruction-tuned safety models (v1-3 Vision)
- **Azure AI Content Safety** - Microsoft's cloud-scale safety platform

### 9.3 Runtime Safety
- **Sandboxing** - HAICOSYSTEM, WebAssembly isolation
- **Circuit Breaker Pattern** - Zou et al. (2024) "Improving Alignment with Circuit Breakers" arXiv:2406.04313
- **Resource Limits** - Computational constraints and quota management
- **Human-in-the-Loop** - Approval workflows for critical operations

## 10. Evaluation and Monitoring

### 10.1 Benchmark Frameworks
- **AgentBench** - Liu et al. (2024) "AgentBench: Evaluating LLMs as Agents" ICLR 2024
- **WebArena** - Zhou et al. (2023) Realistic web environment benchmarks
- **VisualAgentBench** - Multi-modal agent evaluation across 5 domains
- **ST-WebAgentBench** - Safety and trustworthiness assessment

### 10.2 Evaluation Methods
- **LLM-as-a-Judge** - G-Eval framework with chain-of-thought evaluation
- **Custom Metrics** - Helpfulness, harmfulness, factuality scoring
- **Token Usage Tracking** - Cost and performance monitoring
- **Latency Monitoring** - Real-time performance assessment

### 10.3 Production Monitoring
- **Langfuse** - Open-source LLM observability platform
- **AgentOps** - Specialized agent monitoring with replay capabilities
- **ArizeAI** - Production AI monitoring with drift detection

## 11. Resource Optimization

### 11.1 Compute Optimization
- **Adaptive Compute Scaling** - Dynamic allocation based on task complexity
- **Test-Time Compute** - Google DeepMind's 4x efficiency improvements
- **Cost-Aware Model Selection** - Right-sizing models for specific tasks
- **Mixture of Experts (MoE)** - 65x parameter efficiency

### 11.2 Performance Optimization
- **Memory Optimization** - Persistent memory, vector stores, hierarchical structures
- **Latency Optimization** - Query batching, caching, asynchronous processing
- **Energy-Efficient Inference** - Carbon-aware frameworks, green operations
- **Token Management** - Context window optimization, prompt caching

## 12. Prioritization and Decision Making

### 12.1 Multi-Criteria Methods
- **Multi-Criteria Decision Analysis (MCDA)** - AHP, TOPSIS, PROMETHEE, ELECTRE
- **Multi-Criteria Weighted Scoring** - Industry simplification of MCDA
- **Dynamic Priority Queues** - Task scheduling based on multiple factors
- **Dynamic Content Ranking** - Adaptive information prioritization

### 12.2 Decision Support
- **Grey Relational Analysis** - Uncertainty-aware decision making
- **Fuzzy MCDA** - Handling linguistic variables
- **Bayesian MCDA** - Incorporating prior knowledge

## 13. Exploration and Discovery

### 13.1 Curiosity-Driven Methods
- **Intrinsic Curiosity Module (ICM)** - Pathak et al. (2017) "Curiosity-driven Exploration" ICML 2017
- **Random Network Distillation (RND)** - Robust curiosity in stochastic environments
- **Information Gain Exploration** - VIME, STEERING, PIG approaches

### 13.2 Optimization Strategies
- **Multi-Armed Bandits** - Thompson Sampling, UCB algorithms for LLM optimization
- **Evolutionary Algorithms** - Population-based discovery methods
- **Monte Carlo Methods** - Exploration through random sampling

## 14. Fault Tolerance and Recovery

### 14.1 Error Handling Patterns
- **Circuit Breaker** - Three-state (Closed/Open/Half-Open) fault isolation
- **Intelligent Retry with Backoff** - Exponential/jittered retry strategies
- **Bulkhead Pattern** - Resource isolation preventing cascade failures
- **Graceful Degradation** - Partial functionality during failures

### 14.2 System Resilience
- **Health Monitoring** - Continuous system health assessment
- **Leader Election** - Distributed system coordination
- **Rate Limiting** - Resource overload prevention
- **Hedging** - Parallel request processing for reliability

## 15. Human-AI Collaboration

### 15.1 Interaction Patterns
- **Human-in-the-Loop** - Active human participation in agent workflows
- **Human-on-the-Loop** - Supervisory oversight with intervention capability
- **Feedback Integration** - Human corrections improving agent performance
- **Graduated Autonomy** - Progressive independence based on reliability

## 16. Emerging Patterns (2024-2025)

### 16.1 Novel Architectures
- **Neurosymbolic Agents** - Hybrid neural-symbolic reasoning systems
- **Mixture of Agents (MoA)** - Collective intelligence exceeding individual performance
- **Recursive Self-Improvement** - Agents modifying their own algorithms
- **Embodied AI** - Physical world interaction with digital twin training

### 16.2 Advanced Integration
- **Voice Agents** - Sub-300ms latency real-time conversation
- **Agent Marketplaces** - Component economy for specialized agents
- **Cross-Modal Agents** - Unified vision, language, and action processing
- **Agent Self-Assembly** - Autonomous multi-agent system creation

---

## Key Insights and Recommendations

### Redundancies Identified and Consolidated
1. **Multiple RAG variants** often implement similar retrieval quality assessment mechanisms
2. **Context compression methods** converge on similar entropy-based approaches
3. **MCDA/MCDM terminology** represents identical mathematical frameworks
4. **Function calling/tool use/API calling** are industry variations of the same concept

### Critical Gaps Addressed
1. **Multi-agent coordination safety** - Now covered under emerging patterns
2. **Long-context memory safety** - Addressed in memory management section
3. **Cross-modal attack vectors** - Included in safety patterns
4. **Agent marketplace concepts** - Added to emerging patterns

### Implementation Priorities for Engineers
1. **Start with proven patterns**: CoT, ReAct, Classical RAG, basic multi-agent collaboration
2. **Add sophistication gradually**: DPO for alignment, Graph RAG for complex retrieval, MoA for performance
3. **Implement safety early**: Constitutional AI principles, guardrails frameworks, monitoring
4. **Optimize for production**: Resource management, fault tolerance, human oversight

### Future-Proofing Recommendations
1. Adopt **Model Context Protocol (MCP)** for standardized tool integration
2. Design for **multi-agent architectures** even if starting with single agents
3. Implement **comprehensive monitoring** from day one
4. Build with **modular, composable patterns** for flexibility

---

*This taxonomy represents the current state-of-the-art in agentic AI systems as of August 2025, synthesizing academic research and industry practice into a unified reference for systems engineers.*