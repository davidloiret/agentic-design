'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface SelfCorrectionDetailsProps {
  selectedTechnique: any;
}

export const SelfCorrectionDetails: React.FC<SelfCorrectionDetailsProps> = ({ selectedTechnique }) => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-indigo-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Self-Correction runs an inference-time loop that generates an initial answer, critiques or verifies it, and
            then revises the answer based on identified issues. It can be intrinsic (model reflects on its own output)
            or extrinsic (uses tools, retrieval, tests, or another model as a judge). This improves reliability by
            catching factual errors, faulty reasoning, and formatting issues before presenting the final result.
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
            <li>Generate an initial answer with a compact rationale or trace if helpful.</li>
            <li>Critique or verify using self-critique, retrieval checks, unit tests, or an external judge.</li>
            <li>Identify issues (factual, logical, formatting) and propose fixes or alternative approaches.</li>
            <li>Revise the answer; optionally iterate with a bounded retry budget or confidence threshold.</li>
            <li>Validate final output against schema/policy; attach citations or test results when applicable.</li>
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
            'Separate generation and critique prompts; use precise rubrics for verification.',
            'Ground critiques with retrieval or tools; cite evidence when changing answers.',
            'Enforce schema/policy checks before finalizing; reject outputs that fail validations.',
            'Bound retries and encourage summarization to avoid infinite loops and verbosity.',
            'Log errors and corrections for continuous improvement and fine-tuning datasets.',
            'Use role separation: generator vs. verifier/judge models to reduce bias.',
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
            <li>Strict latency budgets that cannot afford extra critique iterations.</li>
            <li>Tasks where simple, deterministic rules outperform iterative model critique.</li>
            <li>Scenarios lacking trustworthy evaluators or evidence sources to guide corrections.</li>
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
            <li>Mode collapse: superficial critiques that fail to challenge erroneous reasoning.</li>
            <li>Over-correction: drifting away from correct initial answers due to noisy signals.</li>
            <li>Excessive verbosity without measurable quality gains; lack of bounded budgets.</li>
            <li>Unreliable or ungrounded judges; lack of calibration or clear rubrics.</li>
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
            'Iterative generation-critique-revision loop',
            'Supports internal self-critique or external tool/model verification',
            'Schema/policy gating before final output',
            'Evidence citation and test-driven validation',
            'Budgeted retries and summarization checkpoints',
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
            <li>Error reduction rate vs. single-pass baseline; factuality and correctness gains.</li>
            <li>Verification pass rate (tests/validators); retry counts and budget adherence.</li>
            <li>Latency/cost overhead of critique loop vs. quality improvements.</li>
            <li>Judge agreement or calibration metrics if multiple evaluators are used.</li>
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
            <li>Additional tokens for critique and revisions; bound with strict budgets and summaries.</li>
            <li>Leverage smaller verifier/judge models where sufficient; cache stable citations/tests.</li>
            <li>Prefer structured outputs and compact rubrics to keep overhead minimal.</li>
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
            <li>Knowledge tasks with citations; fact-checkable domains and compliance-sensitive outputs.</li>
            <li>Code generation, structured data tasks, and policy-constrained generation.</li>
            <li>Critical reasoning tasks where verification reliably detects errors.</li>
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
              <li><a href="https://arxiv.org/abs/2303.17651" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Self-Consistency Improves Chain of Thought (Wang et al., 2023)</a></li>
              <li><a href="https://arxiv.org/abs/2212.10403" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Reflexion: Language Agents with Verbal Reinforcement Learning (Shinn et al., 2023)</a></li>
              <li><a href="https://arxiv.org/abs/2308.00436" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LLMs as Optimizers (Zhou et al., 2023)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://python.langchain.com/docs/guides/evaluation/intro" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain: Evaluation and judges</a></li>
              <li><a href="https://docs.guardrailsai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Guardrails: Validation and policy checks</a></li>
              <li><a href="https://dspy.ai" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DSPy: Programmatic prompting and optimization</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>DSPy, LangChain/LangGraph, LlamaIndex, Guardrails</li>
              <li>Evaluators: unit tests/linters/type-checkers; retrieval + rerankers for factual checks</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://discord.gg/langchain" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain Community</a></li>
              <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forums</a></li>
              <li><a href="https://github.com/dongxiangjue/Awesome-LLM-Self-Improvement" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Awesome LLM Self-Improvement (curated resources)</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default SelfCorrectionDetails;


