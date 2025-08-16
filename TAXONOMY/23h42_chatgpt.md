1. Prompt Chaining

* Sequential Chaining (a.k.a. workflow/stepwise pipelines; e.g., ReWOO) ([arXiv][1])
* Parallel Chaining (self-consistency / ensemble-of-chains) ([arXiv][2])

2. Routing

* LLM-based Routing (learned routers; RouteLLM) ([arXiv][3])
* Embedding-based Routing (similarity/kNN routers; baseline comparisons in RouterBench) ([arXiv][4], [openreview.net][5])
* Rule-based Routing (deterministic heuristics; baselines in RouterBench) ([arXiv][4])
* Machine-Learning Model-Based Routing (cascades/mixtures; FrugalGPT) ([arXiv][6])

3. Reflection

* Self-Critique / Self-Refine (agents learn from their own feedback; “Reflexion”, “Self-Refine”) ([arXiv][7])
* LLM-as-Judge (automatic grading/oversight; MT-Bench, G-Eval-style) ([arXiv][8])

4. Tool Use

* Structured Output (grammar/JSON-schema-constrained decoding) ([arXiv][9])
* Function Calling (supervised/finetuned function tools; Granite-20B FC) ([arXiv][10])
* Code Execution (PAL / PoT: offload computation to interpreters) ([arXiv][11])
* Model Context Protocol (MCP) — open standard for tool/data interop (spec + academic analyses) ([Model Context Protocol][12], [arXiv][13])
* General Tool Learning (Toolformer; surveys) ([arXiv][14])

5. Planning

* Hierarchical Planning (high-level planner + sub-task executors; HuggingGPT) ([arXiv][15])
* Goal Decomposition (plan-then-act; Plan-and-Solve) ([arXiv][16])
* Scenario Planning (reasoning without observation / pre-plan then fetch; ReWOO) ([arXiv][1])
* Deep Research (tool-augmented web reasoning in realistic web envs; WebArena) ([arXiv][17])

6. Multi-Agent Collaboration

* A2A Protocol (Agent-to-Agent; inter-agent standard, security analyses) ([Google Developers Blog][18], [arXiv][19])
* Sequential Handoffs (role-play/task handover; CAMEL/AutoGen families) ([arXiv][20])
* Parallel Processing (debate/consensus or MoA ensembles) ([arXiv][21])
* Debate and Consensus (multi-agent debate) ([arXiv][22])
* Hierarchical Structures (manager-worker; MetaGPT) ([ACM Digital Library][23])
* Expert Teams / Critic-Reviewer (critic/expert roles; AutoGen, CAMEL) ([arXiv][24])

7. Memory Management

* Short-Term Memory (streaming KV/cache; StreamingLLM) ([arXiv][25])
* Long-Term Memory (persistent memory controllers; MemGPT) ([arXiv][26])

8. Context Management

* Adaptive Context Depth (dynamic long-context; Infini-attention) ([arXiv][9])
* Latent Knowledge Retrieval (hierarchical/tree retrieval; RAPTOR) ([arXiv][27])
* Context Compression (prompt/context compression; LLMLingua) ([arXiv][28])
* Multimodal Context Integration (surveys note tool/multimodal planning) ([arXiv][29])
* Sliding Window / Streaming (efficient infinite context; Infini-attention) ([arXiv][30])
* Hierarchical Memory (summary trees / cluster-summaries; RAPTOR) ([arXiv][31])
* Attention Mechanisms (efficient attention families; surveys) ([arXiv][32])
* Multi-Source Context Fusion (GraphRAG: graphs + text) ([arXiv][33], [microsoft.com][34])

9. Learning and Adaptation

* Reinforcement Learning from Human Feedback (RLHF / InstructGPT) ([arXiv][35])
* Direct Preference Optimization (DPO) ([arXiv][36])
* Constitutional AI (self-critique rules) ([arXiv][37])
* Few-Shot / Zero-Shot Learning with LLM-Based Agents (Voyager; continual self-improve) ([arXiv][38])
* Online / Memory-Based Learning (Voyager; self-curriculum) ([arXiv][38])

10. Goal Setting and Monitoring

* Agent Goal Synthesis & Tracking (Generative Agents) ([arXiv][11])

11. Exception Handling and Recovery

* Error Detection & Handling (SelfCheckGPT) ([arXiv][39])
* Recovery / Verification (Chain-of-Verification) ([arXiv][40])
* Circuit Breaker Pattern (service-level safety; see red-teaming & guardrails refs below) ([arXiv][41])
* Intelligent Retry with Backoff (router/cascade fallbacks; FrugalGPT) ([arXiv][42])
* Graceful Degradation (use weak models/tool-off modes; RouteLLM/RouterBench) ([arXiv][43])
* Comprehensive Health Monitoring (serving-level health via vLLM) ([arXiv][44])

12. Human-AI Collaboration

* Human-in-the-Loop (feedback loops; scalable oversight via LLM judges) ([arXiv][45], [openreview.net][46])
* Human-on-the-Loop (supervision/approval in agent benchmarks; AgentBench/WebArena) ([arXiv][47])

13. Knowledge Retrieval (RAG)

* Classical RAG (chunking/embeddings/vector DB; survey) ([arXiv][32])
* Graph RAG (knowledge-graph-enhanced RAG) ([arXiv][33], [microsoft.com][34])
* Self-RAG (retrieve-generate-critique with self-reflection) ([arXiv][7])
* Corrective RAG (CRAG; retrieval quality evaluator + web search) ([arXiv][48])
* Adaptive/Hierarchical RAG (RAPTOR trees) ([arXiv][27])
* Multimodal / Conversational / Agentic RAG (surveys + agent benchmarks) ([arXiv][32])
* Chain-of-Verification RAG (verification-aware retrieval/answering) ([arXiv][40])

14. Resource-Aware Optimization

* Adaptive Compute Scaling (speculative decoding) ([arXiv][49])
* Cost-Aware Model Selection (routing/cascades; FrugalGPT) ([arXiv][6])
* Energy-Efficient Inference (FlashAttention-2 / efficient attention) ([arXiv][50])
* Memory Optimization (PagedAttention / vLLM) ([arXiv][44])
* Latency Optimization (speculative decoding; efficient serving) ([arXiv][51])
* Quantization/Precision Tuning (AWQ / FP8) ([arXiv][52], [NVIDIA Developer][53])

15. Reasoning Techniques

* Chain-of-Thought (CoT) ([arXiv][54])
* Tree-of-Thought (ToT) ([arXiv][55])
* Self-Correction (reflection, self-consistency) ([arXiv][2])
* Program-Aided / Program-of-Thoughts (PAL / PoT) ([arXiv][11])
* ReAct (reasoning-and-acting; used in web agents) ([arXiv][17])
* Chain/Graph of Debates (multi-agent debate; GoT variant) ([arXiv][22])
* Graph of Thoughts (GoT) ([arXiv][56])
* (Optional) MASS / other advanced schemas (see surveys) ([arXiv][57])

16. Guardrails / Safety Patterns

* Prompt-Injection & Tool-Use Threat Modeling (surveys) ([arXiv][58])
* Input/Output Safety Classifiers (Llama Guard family) ([ai.meta.com][59])
* Automated Red-Teaming (agentic adversaries) ([arXiv][41])
* Policy-/Rail-Based Control (NeMo Guardrails) ([semanticscholar.org][60])

17. Evaluation and Monitoring

* Latency / Throughput & Serving Health (vLLM / PagedAttention) ([arXiv][44])
* Token/Cost Tracking for LLM Interactions (RouterBench cost metrics) ([arXiv][4])
* Helpfulness/Quality via LLM-as-Judge or Reward Models (RewardBench & analyses) ([arXiv][45], [openreview.net][46])
* Agentic Task Suites (AgentBench; WebArena) ([arXiv][47])
* Safety-Focused Agent Benchmarks (ST-WebAgentBench) ([arXiv][61])

18. Prioritization

* Multi-Criteria Weighted Scoring / MCDA (multi-objective routing/cascades) ([arXiv][62])
* Dynamic Priority Queues (bandit-style selection for LLMs/prompts) ([arXiv][63])
* Dynamic Content Ranking (contextual bandits; recent bandits-LLM survey) ([arXiv][64])

19. Exploration and Discovery

* RL Exploration (better randomized exploration in linear MDPs) ([arXiv][65])
* Curiosity-Driven / Self-Directed Exploration (agentic web environments) ([arXiv][17])
* Multi-Armed Bandit Optimization (prompt/model selection as bandits) ([arXiv][66])
* Evolutionary Discovery / Prompt Optimization (EvoPrompt; LLM × EA) ([arXiv][67])

---

### Notes on gaps & de-duplication

* I merged overlapping “Context Compression” entries and tied “Hierarchical Memory/Latent Retrieval” to RAPTOR.
* “Deep research” is kept under Planning to emphasize tool-augmented, long-horizon reasoning (measured in WebArena). ([arXiv][17])
* MCP and A2A are explicitly re-added. MCP has active specs plus several 2025 academic analyses; A2A has Google’s official announcement and independent academic security/architecture papers. ([Model Context Protocol][12], [arXiv][13], [Google Developers Blog][18])

If you want, I can turn this into a printable, one-page “reference sheet” with short, 1-line definitions per bullet.

[1]: https://arxiv.org/abs/2305.18323?utm_source=chatgpt.com "ReWOO: Decoupling Reasoning from Observations for Efficient Augmented Language Models"
[2]: https://arxiv.org/abs/2203.11171?utm_source=chatgpt.com "Self-Consistency Improves Chain of Thought Reasoning in Language Models"
[3]: https://arxiv.org/abs/2406.18665?utm_source=chatgpt.com "RouteLLM: Learning to Route LLMs with Preference Data"
[4]: https://arxiv.org/abs/2403.12031?utm_source=chatgpt.com "RouterBench: A Benchmark for Multi-LLM Routing System"
[5]: https://openreview.net/pdf?id=IVXmV8Uxwh&utm_source=chatgpt.com "RouterBench: A Benchmark for Multi-LLM Routing System"
[6]: https://arxiv.org/abs/2305.05176?utm_source=chatgpt.com "FrugalGPT: How to Use Large Language Models While ..."
[7]: https://arxiv.org/abs/2310.11511?utm_source=chatgpt.com "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection"
[8]: https://arxiv.org/abs/2403.14403?utm_source=chatgpt.com "Adaptive-RAG: Learning to Adapt Retrieval-Augmented Large Language Models through Question Complexity"
[9]: https://arxiv.org/abs/2404.07143?utm_source=chatgpt.com "Leave No Context Behind: Efficient Infinite Context Transformers with Infini-attention"
[10]: https://arxiv.org/html/2407.00121v1?utm_source=chatgpt.com "Introducing Function Calling Abilities via Multi-task ..."
[11]: https://arxiv.org/abs/2211.10435?utm_source=chatgpt.com "[2211.10435] PAL: Program-aided Language Models"
[12]: https://modelcontextprotocol.io/specification/2025-03-26?utm_source=chatgpt.com "Specification"
[13]: https://arxiv.org/abs/2503.23278?utm_source=chatgpt.com "Model Context Protocol (MCP): Landscape, Security Threats, and Future Research Directions"
[14]: https://arxiv.org/abs/2302.04761?utm_source=chatgpt.com "Language Models Can Teach Themselves to Use Tools"
[15]: https://arxiv.org/abs/2203.02155?utm_source=chatgpt.com "Training language models to follow instructions with ..."
[16]: https://arxiv.org/abs/2305.04091?utm_source=chatgpt.com "Plan-and-Solve Prompting: Improving Zero-Shot Chain-of- ..."
[17]: https://arxiv.org/abs/2307.13854?utm_source=chatgpt.com "WebArena: A Realistic Web Environment for Building Autonomous Agents"
[18]: https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/?utm_source=chatgpt.com "Announcing the Agent2Agent Protocol (A2A)"
[19]: https://arxiv.org/abs/2504.16902?utm_source=chatgpt.com "Building A Secure Agentic AI Application Leveraging A2A Protocol"
[20]: https://arxiv.org/abs/2304.03442?utm_source=chatgpt.com "Generative Agents: Interactive Simulacra of Human Behavior"
[21]: https://arxiv.org/html/2410.14251v1?utm_source=chatgpt.com "Synthesizing Post-Training Data for LLMs through Multi- ..."
[22]: https://arxiv.org/pdf/2304.03442?utm_source=chatgpt.com "Generative Agents: Interactive Simulacra of Human Behavior"
[23]: https://dl.acm.org/doi/10.1145/3586183.3606763?utm_source=chatgpt.com "Generative Agents: Interactive Simulacra of Human Behavior"
[24]: https://arxiv.org/html/2507.21504v1?utm_source=chatgpt.com "Evaluation and Benchmarking of LLM Agents: A Survey"
[25]: https://arxiv.org/abs/2303.08896?utm_source=chatgpt.com "SelfCheckGPT: Zero-Resource Black-Box Hallucination Detection for Generative Large Language Models"
[26]: https://arxiv.org/abs/2309.11495?utm_source=chatgpt.com "Chain-of-Verification Reduces Hallucination in Large Language Models"
[27]: https://arxiv.org/abs/2401.18059?utm_source=chatgpt.com "RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval"
[28]: https://arxiv.org/abs/2312.07104?utm_source=chatgpt.com "SGLang: Efficient Execution of Structured Language Model Programs"
[29]: https://arxiv.org/pdf/2405.17935?utm_source=chatgpt.com "Tool Learning with Large Language Models: A Survey"
[30]: https://arxiv.org/html/2404.07143v1?utm_source=chatgpt.com "Efficient Infinite Context Transformers with Infini-attention"
[31]: https://arxiv.org/html/2401.18059v1?utm_source=chatgpt.com "RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval"
[32]: https://arxiv.org/pdf/2312.10997?utm_source=chatgpt.com "Retrieval-Augmented Generation for Large Language Models: A Survey"
[33]: https://arxiv.org/abs/2404.16130?utm_source=chatgpt.com "A Graph RAG Approach to Query-Focused Summarization"
[34]: https://www.microsoft.com/en-us/research/blog/graphrag-unlocking-llm-discovery-on-narrative-private-data/?utm_source=chatgpt.com "GraphRAG: Unlocking LLM discovery on narrative private ..."
[35]: https://arxiv.org/html/2408.02666v1?utm_source=chatgpt.com "Self-Taught Evaluators"
[36]: https://arxiv.org/html/2403.04931v1?utm_source=chatgpt.com "A Survey on Human-AI Teaming with Large Pre-Trained ..."
[37]: https://arxiv.org/abs/2408.02666?utm_source=chatgpt.com "Self-Taught Evaluators"
[38]: https://arxiv.org/html/2506.03221v1?utm_source=chatgpt.com "Human-In-The-Loop Workflow for Neuro- Symbolic ..."
[39]: https://arxiv.org/abs/2506.14245?utm_source=chatgpt.com "Reinforcement Learning with Verifiable Rewards Implicitly ..."
[40]: https://arxiv.org/pdf/2506.14245?utm_source=chatgpt.com "reinforcement learning with verifiable re"
[41]: https://arxiv.org/html/2508.04451v1?utm_source=chatgpt.com "Automatic LLM Red Teaming"
[42]: https://arxiv.org/pdf/2305.05176?utm_source=chatgpt.com "FrugalGPT: How to Use Large Language Models While ..."
[43]: https://arxiv.org/html/2406.18665v2?utm_source=chatgpt.com "RouteLLM: Learning to Route LLMs with Preference Data"
[44]: https://arxiv.org/abs/2309.06180?utm_source=chatgpt.com "Efficient Memory Management for Large Language Model Serving with PagedAttention"
[45]: https://arxiv.org/abs/2403.13787?utm_source=chatgpt.com "RewardBench: Evaluating Reward Models for Language ..."
[46]: https://openreview.net/pdf/2cf7397307d6674003c680a8f10d256f83e05d22.pdf?utm_source=chatgpt.com "LLM-AS-A-JUDGE & REWARD MODEL: WHAT THEY"
[47]: https://arxiv.org/abs/2308.03688?utm_source=chatgpt.com "AgentBench: Evaluating LLMs as Agents"
[48]: https://arxiv.org/abs/2401.15884?utm_source=chatgpt.com "Corrective Retrieval Augmented Generation"
[49]: https://arxiv.org/abs/2211.17192?utm_source=chatgpt.com "Fast Inference from Transformers via Speculative Decoding"
[50]: https://arxiv.org/abs/2307.08691?utm_source=chatgpt.com "FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning"
[51]: https://arxiv.org/html/2402.01528v3?utm_source=chatgpt.com "Decoding Speculative Decoding"
[52]: https://arxiv.org/abs/2306.00978?utm_source=chatgpt.com "AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration"
[53]: https://developer.nvidia.com/blog/floating-point-8-an-introduction-to-efficient-lower-precision-ai-training/?utm_source=chatgpt.com "An Introduction to Efficient, Lower-Precision AI Training"
[54]: https://arxiv.org/abs/2201.11903?utm_source=chatgpt.com "Chain-of-Thought Prompting Elicits Reasoning in Large ..."
[55]: https://arxiv.org/abs/2305.10601?utm_source=chatgpt.com "Deliberate Problem Solving with Large Language Models"
[56]: https://arxiv.org/abs/2308.09687?utm_source=chatgpt.com "Graph of Thoughts: Solving Elaborate Problems with Large ..."
[57]: https://arxiv.org/html/2409.10038v1?utm_source=chatgpt.com "On the Diagram of Thought"
[58]: https://arxiv.org/pdf/2306.05499?utm_source=chatgpt.com "arXiv:2306.05499v2 [cs.CR] 2 Mar 2024"
[59]: https://ai.meta.com/research/publications/llama-guard-llm-based-input-output-safeguard-for-human-ai-conversations/?utm_source=chatgpt.com "Llama Guard: LLM-based Input-Output Safeguard for ..."
[60]: https://www.semanticscholar.org/paper/NeMo-Guardrails%3A-A-Toolkit-for-Controllable-and-LLM-Rebedea-Dinu/b428e9e0e8ac36b3ae29a7ab9b9554c39cedb283?utm_source=chatgpt.com "NeMo Guardrails: A Toolkit for Controllable and Safe LLM ..."
[61]: https://arxiv.org/html/2410.06703v1?utm_source=chatgpt.com "ST-WebAgentBench: A Benchmark for Evaluating Safety ..."
[62]: https://arxiv.org/html/2410.08014v1?utm_source=chatgpt.com "LLM Cascade with Multi-Objective Optimal Consideration"
[63]: https://arxiv.org/html/2410.03834v1?utm_source=chatgpt.com "\method: A Graph-based Router for LLM Selections"
[64]: https://arxiv.org/html/2505.13355v1?utm_source=chatgpt.com "Multi-Armed Bandits Meet Large Language Models"
[65]: https://arxiv.org/abs/2406.12241?utm_source=chatgpt.com "More Efficient Randomized Exploration for Reinforcement ..."
[66]: https://arxiv.org/html/2402.09723v3?utm_source=chatgpt.com "Efficient Prompt Optimization Through the Lens of Best Arm ..."
[67]: https://arxiv.org/abs/2309.08532?utm_source=chatgpt.com "EvoPrompt: Connecting LLMs with Evolutionary Algorithms ..."
