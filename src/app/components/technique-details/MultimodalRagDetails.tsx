'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const MultimodalRagDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Multimodal RAG retrieves and fuses evidence across text, images, audio, video, and structured data using
            modality-specific encoders and per-modality indexes. Retrieved candidates are aligned into a shared
            representation and fused (late or hybrid fusion) before a vision/multimodal-capable LLM generates answers
            grounded in cited, cross-modal evidence.
          </p>
        </div>
      </section>

      {/* Workflow / Steps */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          Workflow / Steps
        </h2>
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
          <ol className="list-decimal list-inside space-y-2 text-gray-200 text-sm">
            <li>Ingest: text, PDFs/images, audio/video, and tables/JSON with metadata and ACLs.</li>
            <li>Preprocess: OCR for docs, ASR for audio, frame sampling/scene cuts for video, normalization.</li>
            <li>Index: build per-modality indexes (BM25 + vectors) with modality encoders (e.g., CLIP/BLIP‑2/LLaVA for vision; Whisper-style for audio).</li>
            <li>Retrieve: query per modality; use reciprocal rank fusion or learned fusion to combine results.</li>
            <li>Rerank: apply cross-encoder or multimodal rerankers; deduplicate and filter by authority/recency/policy.</li>
            <li>Assemble context: prefer compact features/captions/crops and references over raw media; attach provenance and timestamps.</li>
            <li>Generate: use a VLM/MLLM (e.g., GPT‑4o/Gemini/Claude) to answer with citations and modality attributions.</li>
            <li>Verify/iterate: evaluate faithfulness/coverage; refine via query rewrite, scope expansion, or additional hops.</li>
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
            'Use hybrid retrieval (lexical + per-modality vectors) and late fusion; cap top_k per modality before rerank.',
            'Calibrate modality weights and down-weight low-quality OCR/ASR; detect and handle missing/corrupt modalities.',
            'Adopt multimodal rerankers; deduplicate aggressively and clip to evidence spans; include bounding boxes/timecodes.',
            'Prefer features, captions, and cropped regions in prompts over raw pixels; reference external media when possible.',
            'Maintain temporal alignment for audio/video via timestamps and segment IDs; store modality provenance.',
            'Cache embeddings, OCR/ASR, and captions; batch encode media; quantize encoders for throughput and cost.',
            'Enforce safety/PII/PHI policies on images/audio; log consent and apply redaction; attach citations by default.',
            'Evaluate on multimodal benchmarks and with human review; track hallucination and evidence-link quality.',
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
            <li>Unimodal tasks already meet quality/latency/cost goals.</li>
            <li>Strict SLAs or budgets where vision/audio inference and OCR/ASR overheads are prohibitive.</li>
            <li>Privacy/compliance constraints that preclude processing images/audio/PHI without robust governance.</li>
            <li>Domains lacking reliable OCR/ASR or where visual/audio signals add negligible value.</li>
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
            <li>Modality collapse: over-reliance on text priors while ignoring harder modalities.</li>
            <li>Low-quality OCR/ASR contaminating retrieval and prompting → hallucinations.</li>
            <li>Token/cost blowups by inlining raw media metadata instead of concise features/references.</li>
            <li>Improper score fusion across modalities; mixing incomparable similarity scales without calibration.</li>
            <li>Missing provenance, bounding boxes, or timestamps → unverifiable answers.</li>
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
            'Cross-modal retrieval with per-modality encoders and indexes',
            'Hybrid early/late fusion with attention and learned weights',
            'Multimodal reranking and duplicate suppression',
            'Temporal synchronization and modality provenance tracking',
            'Evidence linking with citations, boxes, and timecodes',
            'Fallbacks when modalities are missing or low-confidence',
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
            <li>Retrieval: recall@k, MRR/NDCG by modality; fusion precision; citation coverage and correctness.</li>
            <li>Generation: multimodal QA accuracy (e.g., DocVQA/ChartQA/TextVQA, ScienceQA‑IM) and human win-rate.</li>
            <li>Faithfulness/hallucination rate and evidence-link quality (LLM/judge + spot audit).</li>
            <li>Latency p50/p95/cost per request; GPU utilization and throughput by stage.</li>
            <li>Calibration metrics (e.g., ECE) and fallback/abstention rates.</li>
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
            <li>Precompute/cache OCR/ASR, captions, and embeddings; batch media encoding for GPU efficiency.</li>
            <li>Use feature references and cropped regions over raw pixels; limit attachments/resolution per request.</li>
            <li>Maintain per-modality top_k caps and late-fuse scores; shard long videos to sampled frames.</li>
            <li>Quantize/compile encoders (e.g., 8‑bit/FP8); track provider pricing for image/audio tokens and limits.</li>
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
            <li>Document Q&A over PDFs with figures/tables, forms, and screenshots.</li>
            <li>E‑commerce and product discovery combining image + text search and visual troubleshooting.</li>
            <li>Support copilots: screenshots/logs + textual KBs; incident analysis with charts and images.</li>
            <li>Meetings/education: slides + audio transcription + notes summarization.</li>
            <li>Healthcare workflows combining imaging with clinical notes (with compliance and human oversight).</li>
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
              <li><a href="https://arxiv.org/abs/2502.08826" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ask in Any Modality: A Comprehensive Survey on Multimodal Retrieval‑Augmented Generation (2025)</a></li>
              <li><a href="https://arxiv.org/abs/2502.17297" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Benchmarking Retrieval‑Augmented Generation in Multi‑Modal Contexts (2025)</a></li>
              <li><a href="https://arxiv.org/abs/2103.00020" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CLIP: Learning Transferable Visual Models From Natural Language Supervision (2021)</a></li>
              <li><a href="https://arxiv.org/abs/2301.12597" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">BLIP‑2: Bootstrapping Language‑Image Pre‑training (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2304.08485" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LLaVA: Large Language and Vision Assistant (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2403.04706" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Chameleon: Mixed‑Modal Early‑Fusion Foundation Models (2024)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://platform.openai.com/docs/guides/vision" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI: Vision and Multimodal (GPT‑4V/4o)</a></li>
              <li><a href="https://docs.anthropic.com/claude/docs/vision" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Anthropic: Claude 3 Vision Docs</a></li>
              <li><a href="https://ai.google.dev/gemini-api/docs/vision" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Google Gemini API: Vision</a></li>
              <li><a href="https://python.langchain.com/docs/tutorials/multimodal_rag" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain: Multimodal RAG Tutorial</a></li>
              <li><a href="https://docs.llamaindex.ai/en/stable/examples/multi_modal/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex: Multimodal Examples</a></li>
              <li><a href="https://huggingface.co/docs/transformers/tasks/vision_text_dual" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face: Vision‑Text Models</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/openai/CLIP" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CLIP/OpenCLIP</a>, <a href="https://github.com/facebookresearch/ImageBind" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ImageBind</a>, BLIP‑2/LLaVA</li>
              <li><a href="https://weaviate.io/developers/weaviate" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Weaviate</a> / <a href="https://milvus.io/docs/overview.md" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Milvus</a> for multimodal vectors</li>
              <li><a href="https://github.com/facebookresearch/faiss" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">FAISS</a> and rerankers (e.g., Cohere Rerank)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://paperswithcode.com/area/multimodal-learning" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Papers with Code: Multimodal Learning</a></li>
              <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forums</a></li>
              <li><a href="https://www.reddit.com/r/MachineLearning/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">r/MachineLearning</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};