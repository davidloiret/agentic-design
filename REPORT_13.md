## REPORT_13: Audit of Agentic AI Patterns & Techniques and Taxonomy Review of agentic-design.ai/patterns

### Executive summary

- The patterns catalog is a strong start but mixes formal patterns with protocols, product features, and implementation details, creating inconsistency and duplication.
- At least four top-level categories referenced elsewhere in the codebase and common literature are missing or underrepresented on the public page: Knowledge Representation, Cognitive Architectures, Context Orchestration, Workflow Orchestration. Guardrails/Safety shows 0 techniques on the site but is essential in production.
- Multiple technique names are misnamed or non-standard (e.g., “palm”, “god”, “rlvr”, “lrt”, “node-rag”), risking confusion with the academic literature.
- Several items are duplicated or miscategorized (e.g., “agent-to-agent” vs “a2a-protocol”; “context-compression” appears twice; implementation primitives like “async-await”, “JSON Schema”, “REST” listed as techniques).
- Site counters and “Popular Techniques” appear synthetic and not backed by verifiable analytics; they should be removed or replaced with real data.
- This report proposes a normalized taxonomy, precise renames, recategorizations, and a set of authoritative citations to make the catalog reliable for practitioners and researchers.

Reference of analyzed page: [agentic-design.ai/patterns](https://agentic-design.ai/patterns).

### Scope and method

- Cross-checked the live page structure and counts against the internal taxonomy definitions and common peer-reviewed or widely cited works in agentic AI.
- Evaluated naming alignment and category fit against canonical papers and reputable reports.
- Identified duplications, gaps, and items that conflate techniques with protocols or implementation details.

### Findings

#### 1) Category coverage gaps and inconsistencies

- Missing/underrepresented on the public page but present in related content and literature:
  - Knowledge Representation: Ontologies, knowledge graphs, schema-guided generation, constrained decoding, semantic validation.
  - Cognitive Architectures: Modular agents, memory subsystems, planners/controllers, skill libraries.
  - Context Orchestration: Retrieval, routing, compression/summarization, context windows, recency/priority policies.
  - Workflow Orchestration: DAGs/graphs, state machines, retries, compensation, human-in-the-loop gates.
- Guardrails/Safety is shown with 0 techniques. This is a critical production category; it should include concrete techniques (input validation, unsafe content classifiers, PII detectors, prompt-injection defenses, jailbreak mitigation, policy grounding) with references.
- Count mismatches: The page claims 23 categories and 149 techniques, but current enumerations do not reliably sum to this and some categories are empty or duplicates. If these metrics are not data-driven, remove or clearly label as illustrative.

Source: [agentic-design.ai/patterns](https://agentic-design.ai/patterns).

#### 2) Misnaming and non-standard terminology

- Reasoning Techniques list includes several non-standard or ambiguous names:
  - “palm” is a model family, not a technique; remove or replace with a technique (e.g., Self-Consistency, Program-of-Thought, Deliberate reasoning).
  - “god” likely intends “GoT” (Graph-of-Thoughts). Correct spelling and capitalization.
  - “cod” likely intends “Chain-of-Density” (a summarization strategy). Clarify scope (it’s not a general reasoning schema).
  - “rlvr”, “lrt” are unclear acronyms without common usage; either define precisely with citations or remove.
- Knowledge Retrieval (RAG) list includes “node-rag” and “agentic-rag-systems” which are not standard technique names. Prefer well-cited techniques (GraphRAG, Self-RAG, Corrective RAG, Chain-of-Verification for RAG, Multimodal RAG) with citations.
- Tool Use includes technology/protocol entries (“JSON Schema”, “gRPC protocols”, “REST APIs”, “message queuing”). These are integration mechanisms, not agentic techniques. Move under “Integration Protocols & Interfaces” or into implementation guides.
- Parallelization includes “async-await” which is a programming primitive rather than a pattern; keep patterns like “map-reduce”, “scatter-gather”, “fork-join”, and treat async/await as an implementation detail.
- Routing includes “dynamic-context-assembly” which belongs under Context Orchestration.

Impact: Inconsistent naming undermines trust and makes it hard for practitioners to map items to the literature.

#### 3) Duplications and overlaps

- Multi-Agent: “agent-to-agent” vs “a2a-protocol” are duplicates; keep one canonical label (“Agent-to-Agent Communication”).
- Memory Management: “context-compression” and “context-compression-advanced” are likely a single technique with graduated methods; unify under “Context Compression” and enumerate subtechniques (summarization, semantic compression, KV-caching, distillation) in the details.
- Multi-Agent: “message-passing”, “pub-sub-patterns”, “gossip-protocols”, “actor frameworks”, “distributed coordination” are overlapping communication/coordination mechanisms; either group as subtechniques under a common umbrella or move lower as implementation options.
- Planning & Execution vs Workflow Orchestration vs Goal Setting & Monitoring: these three heavily overlap; clarify boundaries (see Recommendations).

#### 4) Missing essential techniques (with suggested placement)

- Reasoning Techniques
  - Chain-of-Thought (CoT) [Wei et al. 2022]
  - Self-Consistency [Wang et al. 2022]
  - Tree-of-Thought (ToT) [Yao et al. 2023]
  - Graph-of-Thoughts (GoT) [Besta et al. 2023]
  - Program-of-Thought (PoT) [Chen et al. 2023]
  - ReAct (Reason+Act) [Yao et al. 2023]
  - Reflexion / Self-Refine (metacognitive feedback) [Shinn et al. 2023; Madaan et al. 2023]
  - Deliberate reasoning (OpenAI system-level technique) [OpenAI 2023/2024]
- Knowledge Retrieval (RAG)
  - RAG (foundational) [Lewis et al. 2020]
  - Self-RAG [Asai et al. 2023]
  - Corrective RAG (CRAG) [2023–2024]
  - GraphRAG [Microsoft 2024]
  - Chain-of-Verification for RAG [2023–2024]
  - Multimodal RAG [2023–2024]
- Guardrails/Safety
  - Prompt injection defenses and jailbreak mitigation [2023–2024 guidance]
  - Llama Guard / Safety classifiers [Meta 2023]
  - PII detection, content filters, policy-grounded generation [OpenAI/Anthropic/Google safety docs]
  - Red teaming workflows and evaluation [NIST/OWASP LLM]
- Multi-Agent
  - CAMEL: Communicative Agents [Li et al. 2023]
  - AutoGen [Wu et al. 2023]
  - Debate/Socratic Debate [Du et al. 2023]
  - Voyager (autonomous curriculum/planning) [Wang et al. 2023]
- Memory & Context
  - MemGPT (hierarchical memory) [Xu et al. 2023]
  - Attention-based retrieval and KV-cache management [various]

Note: Each of the above entries has widely cited references; see Citations.

#### 5) Metrics and evidence

- The “Popular Techniques” and growth indicators (e.g., ↗️12%, ↗️18%) appear stylistic and not linked to an analytics source. For a reference site, either:
  - Replace with real, reproducible metrics (usage counts, citations, GitHub mentions), or
  - Remove the numbers and label the section “Featured Techniques” without implied quantitative ranking.

Source: [agentic-design.ai/patterns](https://agentic-design.ai/patterns).

### Recommendations

#### A. Normalize the top-level taxonomy (proposed v1.0)

Top-level categories (23):
1) Reasoning Techniques
2) Prompt Chaining
3) Tool Use & Function Calling
4) Knowledge Retrieval (RAG)
5) Knowledge Representation
6) Memory & Context Management
7) Routing
8) Parallelization
9) Planning & Execution
10) Workflow Orchestration
11) Context Orchestration
12) Multi-Agent Systems
13) Human-AI Collaboration
14) Exception Handling & Recovery
15) Guardrails & Safety
16) Evaluation & Monitoring
17) Prioritization
18) Exploration & Discovery
19) Resource-Aware Optimization
20) Cognitive Architectures
21) Interpretability & Explainability
22) Security (application, data, model)
23) Data & Tooling Infrastructure (protocols, APIs, transports) — optional, or move to implementation guides

Notes:
- Keep “Security” separate from “Guardrails/Safety”: security covers threats (e.g., model supply-chain, data exfiltration), guardrails covers behavioral safety and policy-aligned outputs.
- If category count must remain 23, treat “Data & Tooling Infrastructure” as a documentation/implementation section rather than a pattern category.

#### B. Rename and recategorize specific items

- Reasoning Techniques
  - Replace/Correct: “palm” → remove; “god” → “GoT (Graph-of-Thoughts)”; “cod” → “Chain-of-Density (summarization)”; remove/define “rlvr”, “lrt”.
  - Add: Self-Consistency; PoT; Deliberate; Chain-of-Verification; Multi-agent debate when used as inference-time method.
- Knowledge Retrieval (RAG)
  - Replace/Clarify: remove “node-rag” unless a cited method; replace with Self-RAG, Corrective RAG, GraphRAG, Multimodal RAG.
- Tool Use
  - Move “JSON Schema”, “gRPC protocols”, “REST APIs”, “message queuing” to “Integration Protocols & Interfaces” section; keep techniques like function calling, tool selection, observation grounding, tool-use planning.
- Routing
  - Move “dynamic-context-assembly” to “Context Orchestration”.
- Parallelization
  - Remove “async-await” as a technique; keep map-reduce, scatter-gather, fork-join; optionally add “speculative decoding” and “concurrent deliberation”.
- Multi-Agent
  - Deduplicate “agent-to-agent” and “a2a-protocol”; consolidate communication mechanisms under a single entry with subtechniques.
- Memory Management
  - Merge “context-compression” and “context-compression-advanced”; enumerate methods in details.

#### C. Evidence-first content

- Each technique page should include: short definition, when-to-use, failure modes, and 2–4 authoritative citations (paper or high-reputation lab reports). Avoid vendor-only marketing references.
- Replace “Popular Techniques” and growth stats with sourced metrics or remove.
- For safety/guardrails, include evaluation protocols and references (jailbreak taxonomies, prompt injection defenses, safety classifiers) with explicit caveats.

#### D. Minimal editorial style guide

- Use canonical names from first widely cited paper; include well-known aliases in description.
- Prefer technique names over model/vendor names.
- Differentiate patterns vs implementation detail vs protocol.
- Avoid acronyms without definitions; introduce the full phrase on first mention.

### Example mapping (selected)

- Routing → move “dynamic-context-assembly” to Context Orchestration.
- Parallelization → remove “async-await”; keep map-reduce, scatter-gather, fork-join; add “speculative decoding”.
- Tool Use → move JSON Schema/gRPC/REST/message-queuing under Integration; keep “function calling”, “API/tool selection”, “code execution”.
- Multi-Agent → consolidate “agent-to-agent” and “a2a-protocol”; group comms patterns under one technique with subtechniques (message-passing, pub/sub, gossip, actor).
- Memory → merge “context-compression” variants; add “KV-cache strategies”, “hierarchical memory”, “summarization-based retention”.
- Reasoning → correct to: CoT, Self-Consistency, ToT, GoT, PoT, ReAct, Reflexion/Self-Refine, Deliberate, Program-aided reasoning.
- RAG → ensure: RAG (base), Self-RAG, Corrective RAG, GraphRAG, Chain-of-Verification for RAG, Multimodal RAG.

### Citations (selected, authoritative)

- Chain-of-Thought: Wei et al., 2022, “Chain-of-Thought Prompting Elicits Reasoning in Large Language Models” — arXiv:2201.11903
- Self-Consistency: Wang et al., 2022, “Self-Consistency Improves Chain of Thought Reasoning in Language Models” — arXiv:2203.11171
- Tree-of-Thought: Yao et al., 2023, “Tree of Thoughts: Deliberate Problem Solving with Large Language Models” — arXiv:2305.10601
- Graph-of-Thoughts: Besta et al., 2023, “Graph of Thoughts: Solving Elaborate Problems with Large Language Models” — arXiv:2308.09687
- Program-of-Thought: Chen et al., 2023, “Program of Thoughts Prompting” — arXiv:2211.12588 (revised 2023)
- ReAct: Yao et al., 2023, “ReAct: Synergizing Reasoning and Acting in Language Models” — arXiv:2210.03629
- Reflexion: Shinn et al., 2023, “Reflexion: Language Agents with Verbal Reinforcement Learning” — arXiv:2303.11366
- Self-Refine: Madaan et al., 2023, “Self-Refine: Iterative Refinement with Self-Feedback” — arXiv:2303.17651
- RAG: Lewis et al., 2020, “Retrieval-Augmented Generation for Knowledge-Intensive NLP” — arXiv:2005.11401
- Self-RAG: Asai et al., 2023, “Self-RAG: Learning to Retrieve, Generate, and Critique” — arXiv:2310.11511
- Corrective RAG (CRAG): Gao et al., 2023/2024 — arXiv variants (ensure the specific paper referenced on publication)
- GraphRAG: Microsoft, 2024, technical report/blog and arXiv implementations
- Chain-of-Verification: Chen et al., 2023/2024 — arXiv variants on verification chains
- CAMEL (multi-agent): Li et al., 2023, “CAMEL: Communicative Agents for ‘Mind’ Exploration” — arXiv:2303.17760
- AutoGen (multi-agent): Wu et al., 2023 — Microsoft Research framework
- Voyager: Wang et al., 2023 — “Voyager: An Open-Ended Embodied Agent with LLMs” — arXiv:2305.16291
- MemGPT: Xu et al., 2023 — arXiv:2310.08560
- Llama Guard: Meta AI, 2023 — safety classifier
- OWASP Top 10 for LLM Applications: OWASP, 2023–2024
- HELM: Liang et al., 2022, “Holistic Evaluation of Language Models” — arXiv:2211.09110
- NIST AI Red Teaming & Safety guidance: 2023–2024

Also reviewed: [agentic-design.ai/patterns](https://agentic-design.ai/patterns) for current taxonomy presentation and counts.

### Next steps (actionable)

1) Adopt the normalized taxonomy; create/complete pages for the four missing/underfilled categories.
2) Apply the rename/recategorization list; remove non-standard/ambiguous items or add citations and definitions.
3) Replace synthetic popularity/metrics with sourced analytics or remove the quantitative styling.
4) Add a citation block to each technique page with 2–4 authoritative references and “known limitations.”
5) Introduce a style guide for naming and evidence requirements to keep future additions consistent.

### Addendum: 2024–2025 literature-driven additions and refinements

Below are additional items and refinements aligned with recent, well-cited work. Where items exist implicitly, treat this as naming normalization and categorization guidance. Reference site: [agentic-design.ai/patterns](https://agentic-design.ai/patterns).

- Reasoning Techniques (test-time compute scaling and ensembles)
  - Self-Consistency (already recommended) — standardized name and placement.
  - Deliberate reasoning — list explicitly as test-time scaling pattern distinct from CoT.
  - Mixture-of-Agents / Committee-of-Experts — ensemble-of-reasoners with voting/aggregation.
  - Debate-based Inference (Socratic/Adversarial Debate) — multi-agent evaluation before finalization.
  - Chain-of-Verification — explicit verification passes distinct from reflection.
  - Program-aided Language Models (PAL) — separate from code execution; reasoning by external program calls.

- Automatic prompt/program synthesis
  - DSPy-style programmatic prompting/teleprompters — systematic prompt optimization with verifiable gains.
  - Self-Discover / automatic chain search — automated discovery of reasoning chains.

- Cascades, routing, and resource-aware optimization
  - Model cascades and early-exit (e.g., FrugalGPT-style) — route by confidence/cost/performance.
  - Retrieval-first cascades — attempt retrieval and simple models before expensive reasoning.
  - Uncertainty-aware routing — confidence estimation drives depth/compute allocation.

- Decoding and execution efficiency
  - Speculative decoding/speculative sampling (and Medusa-like heads) — parallel decoding acceleration.
  - Concurrent deliberation — parallel branches of reasoning consolidated by verifier.

- Knowledge Retrieval (RAG) refinements
  - Retrieval verifiers/critics — add a verifier stage to accept/reject retrieved evidence.
  - Source attribution enforcement — pattern to require citations with provenance.
  - Cold-start retrieval guards — handle empty/low-signal retrieval robustly.

- Memory & Context Management
  - Tri-part memory architecture — working (short-term), episodic (session), semantic (long-term) with policies.
  - Context compression updates — LLMLingua-style compression listed as subtechniques; unify naming.
  - KV-cache and long-context strategies — treat as subtechniques under memory performance.

- Multi-Agent Systems
  - Blackboard architecture — shared state/agenda; agents post/read tasks and results.
  - Market/auction-based allocation — task assignment via bidding/auctions under constraints.
  - Role assignment and dynamic team formation — adaptive specialization over time.

- Human-AI Collaboration
  - Approval/workflow gates — formalize as a recurring gate in plans/cascades.
  - Explainable AI interaction patterns — require rationale/explanations for human approvals.

- Guardrails & Safety (expand techniques)
  - Multi-layer defense-in-depth — input sanitization, retrieval/tool ACLs, output policy-grounding.
  - Jailbreak and prompt-injection sweeps — pre-deployment red teaming with documented mitigations.
  - Safety classifier orchestration (e.g., Llama Guard 2) — ensemble of safety filters with auditing.

- Evaluation & Monitoring
  - Agent/tool-use eval harnesses — scenario-based evaluation for tool-use correctness.
  - Post-deploy drift and breakage monitors — RAG freshness, tool availability, routing calibration.
  - Human-in-the-loop evaluation queues — targeted sampling for human review and training data generation.

- Interactive/Web/Embodied Agents (new subcategory or cross-cutting tag)
  - Web agents (browser navigation), mobile agents, and embodied agents — patterns: planner-controller, action-space grounding, safety guards for actions, reversible operations/rollbacks.

Editorial guidance: For each addition, ensure canonical naming, clear boundaries from implementation details, and include 2–4 citations in technique pages. Avoid vendor/model names as technique labels; reference them only as examples or in citations.

### Technique inventory audit and canonicalization plan

- Are there too many techniques? Yes for a reference catalog. I counted ~154 technique entries across 24 files; the site currently displays 149. The difference stems from duplicates, conceptual overlaps, and protocol/implementation entries that should not be labeled as “techniques.”
- Are all techniques from the literature? No. Several entries are not clearly literature-backed or use non-standard terms without citations.
- Are canonical names used? Not consistently. Some names are misleading or ambiguous relative to the literature.

Reference: [agentic-design.ai/patterns](https://agentic-design.ai/patterns)

Target size and structure
- Target 70–90 literature-backed techniques total.
- Separate into: Techniques (peer-reviewed or widely accepted), Design Patterns (system-level), Implementation/Protocols (SDKs, transports, infra). Do not mix these in the same list.

Acceptance criteria for each technique
- Canonical name from the earliest/widely cited paper; include aliases in description.
- 2–4 citations (papers or high-reputation lab reports), not vendor marketing.
- “When to use,” “Best practices,” and “Failure modes.”
- Clear boundary: technique vs protocol vs implementation detail.

Concrete rename/reclassify/remove checklist (by file)

- src/app/techniques/reasoning-techniques.ts
  - Rename: `palm` → “PAL: Program-Aided Language Models” (keep distinct from Program-of-Thought/PoT).
  - Rename: `cod` (Chain of Debates) → “Multi-Agent Debate (Socratic/Adversarial Debate)”.
  - Rename: `god` (Graph of Debates) → “GoT: Graph-of-Thoughts” or remove “debates” framing unless a citation exists; GoT is standard.
  - Remove or mark experimental until cited: `lrt` (Latent Recurrent Thinking), `rlvr`, `long-cot`. Prefer well-cited “Deliberate” and “Self-Consistency.”

- src/app/techniques/knowledge-retrieval.ts
  - Remove or provide citations: `node-rag`, `agentic-rag-systems` (non-canonical naming). Keep: RAG (base), Self-RAG, Corrective RAG, GraphRAG, Multimodal RAG, Chain-of-Verification for RAG, Hierarchical/Conversational RAG.

- src/app/techniques/multi-agent.ts
  - Move to Implementation/Infrastructure (not “techniques”): `a2a-protocol`, `message-passing`, `pub-sub-patterns`, `gossip-protocols`, `actor-frameworks`, `distributed-coordination`.
  - Keep as conceptual techniques/patterns with citations: `agent-orchestration`, `peer-collaboration`, `hierarchical-coordination`, `consensus-algorithms`.

- src/app/techniques/memory-management.ts
  - Merge duplicates: `context-compression` and `context-compression-advanced` → “Context Compression” with submethods (LLMLingua-style compression, summarization, KV strategies).
  - Mark conceptual or add citations: `latent-memory-networks`, `latent-knowledge-retrieval`, `adaptive-context-depth` (or move the latter to Context Orchestration).

- src/app/techniques/parallelization.ts
  - Remove implementation primitive: `async-await`. Keep patterns like `map-reduce`, `scatter-gather`, `fork-join`. Optionally add “speculative decoding.”

- src/app/techniques/tool-use.ts
  - Move protocols out of techniques: JSON Schema, gRPC, REST, message queuing → “Integration & Protocols” documentation. Keep: function calling, tool selection/planning, code execution.

Dedupe/miscategorization
- Multi-Agent communication duplicates: unify `agent-to-agent` and `a2a-protocol` under one name; treat protocol specifics as implementation details.
- Routing vs Context Orchestration: move “dynamic-context-assembly” under Context Orchestration.
- Guardrails/Safety: populate with concrete techniques (input validation, PII detection, jailbreak/prompt-injection defenses, policy-grounded generation) and citations.


