'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const MultimodalContextIntegrationDetails = () => {
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
            Integrate text, vision, audio, and structured signals into a unified semantic representation via modality-specific encoders, cross-modal alignment, and
            quality-aware fusion. Typical stacks combine contrastive pretraining (e.g., CLIP) with instruction-tuned vision-language models (e.g., BLIP‑2, LLaVA),
            and natively multimodal LLMs (e.g., GPT‑4V/4o, Gemini, Claude 3) for reasoning over fused context.
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
            <li>Ingest inputs: text, image(s)/PDF pages, audio/video, structured tables/JSON.</li>
            <li>Preprocess: OCR for docs, ASR for audio, frame sampling for video, normalization/metadata timestamps.</li>
            <li>Encode per modality: text/token embeddings; vision encoders (e.g., ViT, EVA‑CLIP); audio encoders (e.g., Whisper/AudioLM‑style); tabular encoders.</li>
            <li>Align: project to a shared space (contrastive or learned adapters); synchronize temporally via timestamps.</li>
            <li>Fuse: early (feature‑level), late (decision‑level), or hybrid fusion with cross‑modal attention and uncertainty weighting.</li>
            <li>Reason: natively multimodal LLM or VLM performs instruction‑following, retrieval, and tool use over the fused context.</li>
            <li>Generate outputs: text answers, citations, bounding boxes/captions, or audio; attach uncertainty and modality attributions.</li>
            <li>Monitor: capture quality, latency, cost; trigger fallbacks or human review on low confidence.</li>
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
            'Calibrate modality weights; down‑weight low‑quality OCR/ASR; detect missing or corrupted modalities.',
            'Keep raw media out of prompts when possible; pass compact features/crops and references; cite sources in answers.',
            'Maintain temporal alignment with timestamps and segment IDs for video/audio; store modality provenance.',
            'Use instruction‑tuned VLMs for following directions on images/PDFs; fine‑tune adapters for domain data.',
            'Implement retrieval over multimodal vectors (per‑modality indexes and late fusion) before long‑context prompting.',
            'Cache embeddings and OCR/ASR outputs; batch encode media; quantize large encoders for throughput.',
            'Add safety filters for images/audio (PII/redaction, NSFW, PHI); log consent and minimization per policy.',
            'Evaluate with multimodal tasks and human review; track hallucination and evidence‑linking quality.',
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
            <li>Unimodal tasks already meet quality/latency targets.</li>
            <li>Strict latency/compute budgets where vision/audio inference is prohibitive.</li>
            <li>Regulatory or privacy constraints preclude processing images/audio/PHI.</li>
            <li>Insufficient multimodal training/evaluation data for the domain.</li>
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
            <li>Modality collapse: model ignores harder modalities and relies on text priors.</li>
            <li>Temporal misalignment between audio/video frames and text.</li>
            <li>Poor OCR/ASR quality leading to downstream hallucinations.</li>
            <li>Token/cost blow‑ups by inlining media metadata instead of using references.</li>
            <li>Lack of fallback paths when a modality is missing or corrupt.</li>
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
            'Hybrid early/late fusion with attention',
            'Temporal synchronization and provenance tracking',
            'Quality‑aware, uncertainty‑weighted reasoning',
            'Instruction‑following on images/PDFs',
            'Multimodal retrieval‑augmented generation (RAG)',
            'Safe handling of sensitive media (PII/PHI)',
            'Streaming/low‑latency pipelines with batching',
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
            <li>Task accuracy on multimodal benchmarks (e.g., VQA/TextVQA, ChartQA, DocVQA, ScienceQA‑IM).</li>
            <li>Retrieval precision/recall for multimodal RAG; citation coverage and correctness.</li>
            <li>Hallucination rate and evidence‑linking quality by human evaluation.</li>
            <li>Latency p50/p95 and cost per request; GPU utilization/throughput.</li>
            <li>Calibration metrics (e.g., ECE) and fallback trigger rate.</li>
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
            <li>Precompute and cache OCR/ASR and image embeddings; batch encode media to maximize GPU throughput.</li>
            <li>Prefer feature references over raw pixels in prompts; limit total attachments and resolution per request.</li>
            <li>Use per‑modality indexes in vector DBs (e.g., image/text) and late‑fuse scores; cap retrieved chunks.</li>
            <li>Quantize/compile encoders (8‑bit/FP8) for lower memory; shard long videos into sampled frames.</li>
            <li>Consult provider pricing for image/audio tokens and attachment limits; track cost by modality.</li>
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
            <li>Product discovery: image + text search, visual troubleshooting with screenshots/logs.</li>
            <li>Meetings/education: slide + audio transcription + notes summarization.</li>
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
              <li><a href="https://arxiv.org/abs/2103.00020" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CLIP: Learning Transferable Visual Models From Natural Language Supervision (Radford et al., 2021)</a></li>
              <li><a href="https://arxiv.org/abs/2204.14198" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Flamingo: a Visual Language Model for Few‑Shot Learning (DeepMind, 2022)</a></li>
              <li><a href="https://arxiv.org/abs/2301.12597" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">BLIP‑2: Bootstrapping Language‑Image Pre‑training (Li et al., 2023)</a></li>
              <li><a href="https://arxiv.org/abs/2304.08485" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LLaVA: Large Language and Vision Assistant (Liu et al., 2023)</a></li>
              <li><a href="https://arxiv.org/abs/2302.14045" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kosmos‑1: Multimodal Large Language Model (Microsoft, 2023)</a></li>
              <li><a href="https://arxiv.org/abs/2305.09801" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ImageBind: One Embedding Space to Bind Them All (Meta, 2023)</a></li>
              <li><a href="https://arxiv.org/abs/2403.04706" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Chameleon: Mixed‑Modal Early‑Fusion Foundation Models (2024)</a></li>
              <li><a href="https://arxiv.org/abs/1705.09406" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Multimodal Machine Learning: A Survey and Taxonomy (Baltrušaitis et al., 2017)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://platform.openai.com/docs/guides/vision" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Vision and Multimodal (GPT‑4V/4o) Guides</a></li>
              <li><a href="https://docs.anthropic.com/claude/docs/vision" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Anthropic Claude 3 Vision Docs</a></li>
              <li><a href="https://ai.google.dev/gemini-api/docs/vision" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Google Gemini API: Vision</a></li>
              <li><a href="https://python.langchain.com/docs/tutorials/multimodal_rag" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain: Multimodal RAG Guide</a></li>
              <li><a href="https://docs.llamaindex.ai/en/stable/examples/multi_modal/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex: Multimodal Examples</a></li>
              <li><a href="https://huggingface.co/docs/transformers/tasks/vision_text_dual" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face: Vision‑Text Models</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>PyTorch / TensorFlow; <a href="https://huggingface.co/models?pipeline_tag=visual-question-answering" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Transformers</a></li>
              <li><a href="https://github.com/openai/CLIP" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenCLIP/CLIP</a>, <a href="https://github.com/facebookresearch/ImageBind" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ImageBind</a></li>
              <li><a href="https://weaviate.io/developers/weaviate" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Weaviate</a> / <a href="https://milvus.io/docs/overview.md" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Milvus</a> for multimodal vectors</li>
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