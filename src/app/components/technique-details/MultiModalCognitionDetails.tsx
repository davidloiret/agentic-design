'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const MultiModalCognitionDetails = () => {
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
            Process text, images, audio, video, and structured data with modality-specific encoders, align them in a
            shared semantic space, and fuse using cross-modal attention and uncertainty-aware weighting. A multimodal
            LLM/VLM performs reasoning and generation grounded in fused evidence with provenance and modality
            attributions.
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
            <li>Ingest: collect multimodal inputs with metadata (timestamps, source, ACLs).</li>
            <li>Preprocess: OCR for docs, ASR for audio, frame sampling/scene cuts for video, normalization.</li>
            <li>Encode: modality-specific encoders (e.g., ViT/CLIP/LLaVA for vision; Whisper-style for audio; text/token encoders; tabular encoders).</li>
            <li>Align: project into a shared embedding space; synchronize temporally via timestamps and segment IDs.</li>
            <li>Fuse: early/late/hybrid fusion with cross-modal attention; weight by quality/uncertainty.</li>
            <li>Reason/Act: use a multimodal LLM/VLM to analyze, retrieve, tool-call, and generate grounded outputs.</li>
            <li>Verify: run lightweight faithfulness/groundedness checks; attach citations, boxes, and timecodes.</li>
            <li>Monitor: track accuracy, hallucinations, latency, and cost; trigger fallbacks or human review.</li>
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
            'Use hybrid retrieval (lexical + per‑modality vectors) with late fusion; cap top_k per modality before rerank.',
            'Calibrate modality weights; down‑weight low‑quality OCR/ASR and detect missing/corrupted modalities.',
            'Prefer compact features, captions, and cropped regions over raw pixels in prompts; include provenance.',
            'Maintain temporal alignment for audio/video via timestamps; store modality confidence and uncertainty.',
            'Cache embeddings, OCR/ASR, and captions; batch media encoding; quantize encoders to control latency/cost.',
            'Enforce safety/PII/PHI policies for images/audio; log consent and redaction; cite sources by default.',
            'Evaluate on multimodal benchmarks and with human review; track hallucination and evidence‑link quality.'
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
            <li>Unimodal tasks already meet quality/latency/cost targets.</li>
            <li>Strict SLAs or budgets where vision/audio inference and preprocessing are prohibitive.</li>
            <li>Privacy/compliance regimes that preclude media processing without robust governance and oversight.</li>
            <li>Domains with unreliable OCR/ASR or negligible value from secondary modalities.</li>
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
            <li>Modality collapse: model relies on text priors and ignores harder modalities.</li>
            <li>Temporal misalignment between audio/video and text causes incorrect grounding.</li>
            <li>Low-quality OCR/ASR contaminates retrieval and prompts → hallucinations.</li>
            <li>Token/cost blowups from inlining raw media metadata instead of concise features/references.</li>
            <li>Improper score fusion across modalities without calibration and de-duplication.</li>
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
            'Cross‑modal alignment in a shared representation space',
            'Hybrid early/late fusion with attention and learned weights',
            'Temporal synchronization and modality provenance tracking',
            'Uncertainty‑aware reasoning and calibrated score fusion',
            'Evidence linking with citations, bounding boxes, and timecodes',
            'Fallbacks/abstentions when modalities are missing or low‑confidence'
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
            <li>Task accuracy on multimodal benchmarks (e.g., VQA/TextVQA, ChartQA, DocVQA, ScienceQA‑IM, MMMU).</li>
            <li>Retrieval precision/recall by modality; citation coverage and correctness.</li>
            <li>Faithfulness/hallucination rate and evidence‑link quality (LLM/judge + human spot audits).</li>
            <li>Latency p50/p95 and cost per request; GPU utilization and throughput by stage.</li>
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
            <li>Prefer feature references and cropped regions in prompts; cap attachments and resolution.</li>
            <li>Use per‑modality indexes and late‑fuse scores; shard long videos to sampled frames.</li>
            <li>Quantize/compile encoders (e.g., 8‑bit/FP8); track image/audio token pricing and limits per provider.</li>
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
            <li>Document understanding over PDFs with figures/tables, forms, and screenshots.</li>
            <li>Support copilots: screenshots/logs + textual KBs; incident analysis with charts and images.</li>
            <li>Meetings/education: slides + audio transcription + notes summarization.</li>
            <li>Robotics/AR: perception + language grounding for task execution.</li>
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
              <li><a href="https://arxiv.org/abs/1705.09406" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Multimodal Machine Learning: A Survey and Taxonomy (Baltrušaitis et al., 2017)</a></li>
              <li><a href="https://arxiv.org/abs/2403.04706" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Chameleon: Mixed‑Modal Early‑Fusion Foundation Models (2024)</a></li>
              <li><a href="https://arxiv.org/abs/2305.09801" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ImageBind: One Embedding Space to Bind Them All (Meta, 2023)</a></li>
              <li><a href="https://arxiv.org/abs/2103.00020" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CLIP: Learning Transferable Visual Models From Natural Language Supervision (2021)</a></li>
              <li><a href="https://arxiv.org/abs/2304.08485" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LLaVA: Large Language and Vision Assistant (2023)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://platform.openai.com/docs/guides/vision" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI: Vision and Multimodal (GPT‑4V/4o)</a></li>
              <li><a href="https://docs.anthropic.com/claude/docs/vision" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Anthropic: Claude 3 Vision Docs</a></li>
              <li><a href="https://ai.google.dev/gemini-api/docs/vision" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Google Gemini API: Vision</a></li>
              <li><a href="https://huggingface.co/docs/transformers/tasks/vision_text_dual" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face: Vision‑Text Models</a></li>
              <li><a href="https://python.langchain.com/docs/tutorials/multimodal_rag" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain: Multimodal Guide</a></li>
              <li><a href="https://docs.llamaindex.ai/en/stable/examples/multi_modal/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex: Multimodal Examples</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>PyTorch / TensorFlow; <a href="https://huggingface.co/models?pipeline_tag=visual-question-answering" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Transformers</a></li>
              <li><a href="https://github.com/openai/CLIP" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenCLIP/CLIP</a>, <a href="https://github.com/facebookresearch/ImageBind" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ImageBind</a>, BLIP‑2/LLaVA</li>
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