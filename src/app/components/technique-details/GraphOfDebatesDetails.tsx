'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface GraphOfDebatesDetailsProps {
  selectedTechnique: any;
}

export const GraphOfDebatesDetails: React.FC<GraphOfDebatesDetailsProps> = ({ selectedTechnique }) => {
  return (
    <>
      {/* Core Mechanism (short conceptual overview) */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism (short conceptual overview)
        </h2>
        <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-indigo-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Graph of Debates models a debate as a directed graph where nodes are claims, evidence, or sub-issues
            and edges encode relations such as support, attack, rebuttal, undercut, and question. Multiple debaters
            iteratively add and refine nodes/edges across rounds, while a judge or aggregation mechanism evaluates
            argument strength to converge on a decision. This combines multi-agent debate with formal argumentation
            structures for transparency and coverage.
          </p>
        </div>
      </section>

      {/* Workflow / Steps */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          Workflow / Steps
        </h2>
        <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
          <ol className="list-decimal list-inside space-y-2 text-gray-200 text-sm">
            <li>Define the proposition, success criteria, and judge rubric (correctness, relevance, evidence, clarity).</li>
            <li>Spawn debaters with complementary roles (pro, con, fact-checker, devil’s advocate, synthesizer).</li>
            <li>Round-based argumentation: debaters add claims/evidence and link them with typed edges (support/attack/etc.).</li>
            <li>Cross-examination: require citations, challenge weak links, and prune contradicted or duplicate nodes.</li>
            <li>Scoring: judge model(s) or voting aggregate score nodes/edges; update weights/credibility.</li>
            <li>Expansion: explore uncovered sub-issues using search, retrieval, or expert tools.</li>
            <li>Convergence: extract winning thesis or Pareto set; generate rationale with cited nodes.</li>
            <li>Validation: independent judge review and, when applicable, external verification/tests.</li>
          </ol>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-green-500 rounded-full"></div>
          Best Practices
        </h2>
        <div className="grid gap-3">
          {[
            'Use typed relations from argumentation theory (support, attack, rebut, undercut) and require citations for factual claims.',
            'Separate debater roles and provide private scratchpads to reduce conformity and collusion.',
            'Employ calibrated judges (fine-tuned or ensemble) and report inter-judge agreement.',
            'Control for verbosity: fixed token budgets per round; penalize redundancy; summarize between rounds.',
            'Instrument coverage: track which sub-issues are argued; prompt for uncovered branches.',
            'Persist the graph with provenance (sources, timestamps) for auditability and later reuse.',
            'Auto-prune low-signal or contradicted nodes; deduplicate semantically equivalent claims.',
          ].map((tip) => (
            <div key={tip} className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg">
              <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* When NOT to Use */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-red-500 rounded-full"></div>
          When NOT to Use
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Trivial questions where single-pass answers suffice or gold labels exist cheaply.</li>
            <li>Hard real-time/low-latency paths that cannot afford multi-round, multi-agent cost.</li>
            <li>Tasks requiring deterministic, rule-bound outputs without subjective trade-offs.</li>
            <li>Settings with unreliable judges or incentive to game the judge without safeguards.</li>
          </ul>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Judge bias and position sensitivity; over-weighting verbosity or rhetorical flair.</li>
            <li>Debater collusion or mode collapse causing superficial consensus.</li>
            <li>Unbounded graphs with duplicate or low-signal nodes increasing cost without value.</li>
            <li>Insufficient evidence grounding leading to hallucinated support/attack edges.</li>
          </ul>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Non-linear, typed argument graphs (support/attack/rebut/undercut/question).',
            'Round-based multi-agent debate with cross-examination and summarization.',
            'Judge or ensemble adjudication with agreement tracking and rationales.',
            'Evidence-grounded edges with citations, provenance, and timestamps.',
            'Coverage and redundancy controls with auto-pruning/deduplication.',
          ].map((feat) => (
            <div key={feat} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm border border-gray-700/40">
              {feat}
            </div>
          ))}
        </div>
      </section>

      {/* KPIs / Success Metrics */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
          KPIs / Success Metrics
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Judge agreement rate (Krippendorff’s alpha, Cohen’s kappa) and win-rate stability.</li>
            <li>Factuality/grounding score: proportion of claims with valid citations; error rate post-fact-check.</li>
            <li>Coverage: fraction of identified sub-issues addressed in the final rationale.</li>
            <li>Cost and latency per resolved question; tokens per resolved claim/edge.</li>
            <li>Outcome quality vs. strong baselines (single-agent, self-consistency, ToT).</li>
          </ul>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Rough cost ≈ debaters × rounds × tokens_per_turn + judges × tokens_per_eval.</li>
            <li>Mitigate with fixed per-round budgets, summarization checkpoints, and caching of verified nodes.</li>
            <li>Prefer retrieval/tool outputs and compact citations over verbose narrative to save tokens.</li>
            <li>Batch judge evaluations and use smaller but calibrated judges when acceptable.</li>
          </ul>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Complex policy, legal, or ethical analysis requiring competing viewpoints and evidence.</li>
            <li>Research synthesis and peer-review style critique with explicit argument trails.</li>
            <li>Product/architecture decision records where trade-offs must be justified and auditable.</li>
            <li>Curriculum or debate training tools emphasizing argument structure and reasoning.</li>
          </ul>
        </div>
      </section>

      {/* References & Further Reading */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
          References & Further Reading
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-4">
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Academic Papers</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://arxiv.org/abs/1805.00899" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AI Safety via Debate (Irving, Christiano et al., 2018)</a></li>
              <li><a href="https://arxiv.org/abs/2305.14387" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LLMs as Judges: Rethinking Evaluation (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2409.11374" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Multi-Agent Debate improves reasoning: recent evidence (2024)</a></li>
              <li><a href="https://link.springer.com/article/10.1007/s11787-019-00218-5" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Abstract Argumentation (Dung-style) and semantics – survey</a></li>
              <li><a href="https://hal.science/hal-00372812/document" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Bipolar Argumentation Frameworks (Cayrol & Lagasquie-Schiex)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://argdown.org/guide/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Argdown Guide (argument mapping)</a></li>
              <li><a href="https://www.arg-tech.org/index.php/tools/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AIF/OVA tools (Argument Interchange Format)</a></li>
              <li><a href="https://python.langchain.com/docs/langgraph" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph (agent control flow)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://kialo.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kialo</a>, <a href="https://debategraph.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DebateGraph</a>, <a href="https://aifdb.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AIFdb</a></li>
              <li>Neo4j/Graph databases, NetworkX, Cytoscape/React Flow for visual graph editing</li>
              <li>Evaluation: pairwise preference eval, Elo rating for debaters, judge agreement metrics</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://discuss.openai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI community: debate/judging threads</a></li>
              <li><a href="https://discord.gg/langchain" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain Discord (multi-agent workflows)</a></li>
              <li><a href="https://www.arg-tech.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ARG-Tech (argumentation research community)</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default GraphOfDebatesDetails;


