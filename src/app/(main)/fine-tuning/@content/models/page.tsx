'use client';

import React, { useState } from 'react';
import { Brain, Zap, Shield, Cpu, HardDrive, DollarSign, Scale, Globe, CheckCircle, AlertTriangle, Target, Sparkles } from 'lucide-react';
import { ModelRecommendationModal } from '@/app/components/ModelRecommendationModal';
import { AuthPromptModal } from '@/app/components/AuthPromptModal';
import { useAuth } from '@/contexts/AuthContext';

export default function ModelsPage() {
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);
  const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20">
        <h1 className="text-3xl font-bold text-purple-300 mb-4">Choosing the Right Base Model</h1>
        <p className="text-gray-300 mb-6">
          Comprehensive guide to selecting the optimal foundation model for your fine-tuning project
          based on performance, licensing, hardware requirements, and use case specifics.
        </p>

        {/* Recommendation Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => {
              if (user) {
                setIsRecommendationOpen(true);
              } else {
                setIsAuthPromptOpen(true);
              }
            }}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Target className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Get Personalized Recommendations</span>
            <Sparkles className="w-5 h-5 relative z-10 animate-pulse" />
          </button>

          <div className="text-sm text-gray-400 text-center sm:text-left">
            <p className="font-medium text-gray-300">🎯 Find your perfect model in 30 seconds</p>
            <p>Based on your use case, hardware, and experience level</p>
            {!user && (
              <p className="text-xs text-yellow-400 mt-1">
                🔒 Sign in required for personalized recommendations
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Model Selection Decision Framework */}
      <div className="bg-blue-900/10 rounded-lg p-6 border border-blue-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-bold text-blue-300">Model Selection Decision Framework</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="font-semibold text-green-400 mb-3">Start Here: Define Requirements</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Use Case:</strong> Chat, code, analysis, multimodal</li>
              <li>• <strong>Languages:</strong> English-only vs multilingual</li>
              <li>• <strong>Context Length:</strong> Short vs long documents</li>
              <li>• <strong>Latency:</strong> Real-time vs batch processing</li>
              <li>• <strong>Budget:</strong> Hardware and inference costs</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-400 mb-3">Licensing Considerations</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Commercial Use:</strong> Apache 2.0 &gt; MIT &gt; Custom</li>
              <li>• <strong>Enterprise:</strong> Check derivative work clauses</li>
              <li>• <strong>Attribution:</strong> Required for most licenses</li>
              <li>• <strong>Liability:</strong> No warranty in open source</li>
              <li>• <strong>Patents:</strong> Apache 2.0 provides protection</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="font-semibold text-purple-400 mb-3">Hardware Constraints</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>7B Models:</strong> 14-16GB VRAM (consumer)</li>
              <li>• <strong>13B Models:</strong> 26-30GB VRAM (prosumer)</li>
              <li>• <strong>30B+ Models:</strong> 60GB+ VRAM (enterprise)</li>
              <li>• <strong>70B+ Models:</strong> Multiple GPUs required</li>
              <li>• <strong>Quantization:</strong> 50-75% memory reduction</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2025 Breakthrough Models */}
      <div className="bg-red-900/10 rounded-lg p-6 border border-red-500/20 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-red-400" />
          <h2 className="text-xl font-bold text-red-300">🚀 2025 Breakthrough Models (Just Released)</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <h4 className="font-semibold text-red-400 mb-1">DeepSeek V3.1</h4>
            <p className="text-xs text-gray-300">685B • MIT • Hybrid thinking mode beats GPT-5</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <h4 className="font-semibold text-yellow-400 mb-1">OpenAI GPT-OSS</h4>
            <p className="text-xs text-gray-300">120B/20B • Apache 2.0 • OpenAI's first open models</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <h4 className="font-semibold text-green-400 mb-1">IBM Granite 3.0</h4>
            <p className="text-xs text-gray-300">8B • Apache 2.0 • Enterprise-ready, 116 languages</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <h4 className="font-semibold text-teal-400 mb-1">Gemma 3 270M</h4>
            <p className="text-xs text-gray-300">270M • Edge AI • 0.75% battery usage</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-4">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <h4 className="font-semibold text-purple-400 mb-1">Qwen-Image-Edit</h4>
            <p className="text-xs text-gray-300">20B • Apache 2.0 • Advanced image editing with text rendering</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <h4 className="font-semibold text-orange-400 mb-1">OpenVLA</h4>
            <p className="text-xs text-gray-300">7B • MIT • Vision-language-action for robotics</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <h4 className="font-semibold text-red-400 mb-1">Cisco Foundation-sec</h4>
            <p className="text-xs text-gray-300">8B • Apache 2.0 • First open cybersecurity LLM</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <h4 className="font-semibold text-yellow-400 mb-1">YOLO v11</h4>
            <p className="text-xs text-gray-300">Variable • AGPL-3.0 • Latest object detection, 22% fewer params</p>
          </div>
        </div>
      </div>

      {/* Top Model Recommendations by Use Case */}
      <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <h2 className="text-xl font-bold text-cyan-300">Top Recommendations by Use Case</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {/* Column 1 - Core Language Models */}
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2">Chat & Conversation</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>Ultra-Budget:</strong> TinyLlama 1.1B, Gemma 3 270M</li>
                <li>• <strong>Budget:</strong> SmolLM3 3B, CroissantLLM 1.3B</li>
                <li>• <strong>Balanced:</strong> IBM Granite 3.0 8B, OpenAI GPT-OSS 20B</li>
                <li>• <strong>Premium:</strong> DeepSeek V3.1 (685B), Qwen 2.5-Max</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Code Generation</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>Enterprise:</strong> IBM Granite 3.0 (116 languages)</li>
                <li>• <strong>Specialized:</strong> StarCoder 15B, DeepSeek Coder V2</li>
                <li>• <strong>Latest:</strong> OpenAI GPT-OSS 120B, DeepSeek V3.1</li>
                <li>• <strong>Edge:</strong> MobileLLM-R1 (math/coding on mobile)</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-400 mb-2">Analysis & Reasoning</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>State-of-Art:</strong> DeepSeek V3.1 (hybrid thinking)</li>
                <li>• <strong>Compact:</strong> MobileLLM-R1 (2-5x performance boost)</li>
                <li>• <strong>Enterprise:</strong> Qwen 2.5-Max, IBM Granite 3.0</li>
                <li>• <strong>Agentic:</strong> ChatGLM-4.5 (task decomposition)</li>
              </ul>
            </div>
          </div>

          {/* Column 2 - Enterprise & Multilingual */}
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2">Enterprise Use</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>Latest Flagship:</strong> DeepSeek V3.1, Qwen 2.5-Max</li>
                <li>• <strong>Enterprise-Ready:</strong> IBM Granite 3.0 series</li>
                <li>• <strong>OpenAI Open:</strong> GPT-OSS 120B/20B (Apache 2.0)</li>
                <li>• <strong>Cost-Effective:</strong> ChatGLM-4.5 (cheaper than DeepSeek)</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-cyan-400 mb-2">Multilingual</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>46 Languages:</strong> BLOOM 176B (BigScience)</li>
                <li>• <strong>Chinese/English:</strong> Yi 1.5 34B, Baichuan 4</li>
                <li>• <strong>French/English:</strong> CroissantLLM (truly bilingual)</li>
                <li>• <strong>Japanese:</strong> Rakuten AI 2.0 (business-optimized)</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-pink-400 mb-2">Edge & Mobile</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>Ultra-Efficient:</strong> Gemma 3 270M (0.75% battery)</li>
                <li>• <strong>Reasoning:</strong> MobileLLM-R1 950M (2-5x boost)</li>
                <li>• <strong>Compact:</strong> TinyLlama 1.1B, CroissantLLM 1.3B</li>
                <li>• <strong>Quantized:</strong> GGUF format (Q2-Q8 levels)</li>
              </ul>
            </div>
          </div>

          {/* Column 3 - Multimodal & Vision */}
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-400 mb-2">Computer Vision</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>Object Detection:</strong> YOLO v11, YOLOv10, Grounding DINO</li>
                <li>• <strong>Segmentation:</strong> SAM 2 (44 FPS), TinySAM</li>
                <li>• <strong>Vision-Language:</strong> LLaVA 1.6, Florence-2, MiniGPT-4</li>
                <li>• <strong>Document AI:</strong> Granite-Docling-258M, PaddleOCR 3.0, TrOCR</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 mb-2">Search & Retrieval</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>Image Embedding:</strong> CLIP-ViT-L/14, OpenCLIP, SigLIP 2</li>
                <li>• <strong>Text Retrieval:</strong> ColBERT-v2, E5-Large-v2, BGE-M3</li>
                <li>• <strong>Reranking:</strong> BGE Reranker v2-M3, Jina Reranker v2</li>
                <li>• <strong>Neural Search:</strong> OpenVision, all-MiniLM-L6-v2</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-rose-400 mb-2">Audio & Speech</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>Speech Recognition:</strong> Wav2Vec2, SpeechT5</li>
                <li>• <strong>Speaker Tasks:</strong> WavLM (verification, diarization)</li>
                <li>• <strong>Synthesis:</strong> SpeechT5 (unified speech-text)</li>
                <li>• <strong>Self-supervised:</strong> Wav2Vec2 (representation learning)</li>
              </ul>
            </div>
          </div>

          {/* Column 4 - Specialized & Domain */}
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-sky-400 mb-2">Domain Specialists</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>Finance:</strong> FinGPT 7B, BloombergGPT 50B</li>
                <li>• <strong>Medical:</strong> BioGPT, Palmyra-Med 70B, OpenBioLLM 70B</li>
                <li>• <strong>Legal:</strong> LawLLM 7B (US legal system)</li>
                <li>• <strong>Cybersecurity:</strong> Cisco Foundation-sec-8B, Trend Cybertron</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-400 mb-2">Time Series & Forecasting</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>Foundation:</strong> Chronos-T5 (250x faster), TimesFM 200M</li>
                <li>• <strong>Best Performance:</strong> Moirai 2.0 (#1 GIFT-Eval)</li>
                <li>• <strong>Business:</strong> Prophet (seasonality), NeuralProphet</li>
                <li>• <strong>Zero-shot:</strong> TimesFM (100B time-points trained)</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2">Tabular & Structured Data</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>Deep Learning:</strong> TabNet (attention-based)</li>
                <li>• <strong>Gradient Boosting:</strong> XGBoost, LightGBM</li>
                <li>• <strong>Competitions:</strong> XGBoost (proven winner)</li>
                <li>• <strong>Efficiency:</strong> LightGBM (fast training)</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-violet-400 mb-2">Specialized Applications</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>Creative:</strong> Qwen-Image-Edit, InstantID, MusicGen</li>
                <li>• <strong>Robotics:</strong> OpenVLA 7B, SmolVLA 450M</li>
                <li>• <strong>Scientific:</strong> UMA (Meta), ChemBERTa-2, BioGPT</li>
                <li>• <strong>Security:</strong> Cisco Foundation-sec, Trend Cybertron</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Model Comparison */}
      <div className="bg-green-900/10 rounded-lg p-6 border border-green-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="w-5 h-5 text-green-400" />
          <h2 className="text-xl font-bold text-green-300">Detailed Model Comparison</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="text-left p-3">Model</th>
                <th className="text-left p-3">Size</th>
                <th className="text-left p-3">License</th>
                <th className="text-left p-3">VRAM (FP16)</th>
                <th className="text-left p-3">Strengths</th>
                <th className="text-left p-3">Best For</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-blue-400">Llama 3.3 70B</td>
                <td className="p-3">70B</td>
                <td className="p-3">Custom (restrictive)</td>
                <td className="p-3">140GB</td>
                <td className="p-3">Proven, multilingual, community</td>
                <td className="p-3">General purpose, enterprise</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-green-400">Mistral Small 3.1</td>
                <td className="p-3">22B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">44GB</td>
                <td className="p-3">Fast, commercial-friendly</td>
                <td className="p-3">Commercial deployment</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-purple-400">Qwen 2.5 72B</td>
                <td className="p-3">72B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">144GB</td>
                <td className="p-3">Data analysis, structured output</td>
                <td className="p-3">Enterprise data tasks</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-yellow-400">Gemma 3 27B</td>
                <td className="p-3">27B</td>
                <td className="p-3">Custom (restrictive)</td>
                <td className="p-3">54GB</td>
                <td className="p-3">Efficient, Google ecosystem</td>
                <td className="p-3">Research, prototyping</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-orange-400">Phi-4 14B</td>
                <td className="p-3">14B</td>
                <td className="p-3">MIT</td>
                <td className="p-3">28GB</td>
                <td className="p-3">Strong reasoning, compact</td>
                <td className="p-3">Resource-constrained</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-red-400">DeepSeek R1</td>
                <td className="p-3">671B</td>
                <td className="p-3">MIT</td>
                <td className="p-3">1342GB+</td>
                <td className="p-3">Advanced reasoning, coding</td>
                <td className="p-3">Research, complex tasks</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-indigo-400">SmolLM3 3B</td>
                <td className="p-3">3B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">6GB</td>
                <td className="p-3">Multilingual, long context (64k)</td>
                <td className="p-3">Edge devices, mobile</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-rose-400">VibeVoice 1.5B</td>
                <td className="p-3">1.5B</td>
                <td className="p-3">MIT (disabled)</td>
                <td className="p-3">4GB</td>
                <td className="p-3">Text-to-speech, 90min audio</td>
                <td className="p-3">Voice synthesis (research)</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-emerald-400">Qwen2.5-VL 7B</td>
                <td className="p-3">7B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">14GB</td>
                <td className="p-3">Vision, OCR, video understanding</td>
                <td className="p-3">Multimodal applications</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-cyan-400">ModernBERT</td>
                <td className="p-3">139M/395M</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">1-2GB</td>
                <td className="p-3">Embeddings, 8k context</td>
                <td className="p-3">Text embeddings, RAG</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-amber-400">Nomic-Embed v2</td>
                <td className="p-3">100M</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">500MB</td>
                <td className="p-3">MoE embeddings, 100 languages</td>
                <td className="p-3">Multilingual embeddings</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-violet-400">FLUX.1 [dev]</td>
                <td className="p-3">12B</td>
                <td className="p-3">Custom (non-commercial)</td>
                <td className="p-3">24GB</td>
                <td className="p-3">Text-to-image, best quality</td>
                <td className="p-3">Image generation (research)</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-teal-400">FLUX.1 [schnell]</td>
                <td className="p-3">12B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">24GB</td>
                <td className="p-3">Fast text-to-image generation</td>
                <td className="p-3">Commercial image generation</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-slate-400">Stable Diffusion 3</td>
                <td className="p-3">2B/8B</td>
                <td className="p-3">Custom (restrictive)</td>
                <td className="p-3">4-16GB</td>
                <td className="p-3">Text-to-image, established</td>
                <td className="p-3">Legacy image generation</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-blue-400">Whisper Large v3</td>
                <td className="p-3">1.55B</td>
                <td className="p-3">MIT</td>
                <td className="p-3">3GB</td>
                <td className="p-3">Speech recognition, 99 languages</td>
                <td className="p-3">Speech-to-text applications</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-sky-400">Distil-Whisper v3</td>
                <td className="p-3">756M</td>
                <td className="p-3">MIT</td>
                <td className="p-3">1.5GB</td>
                <td className="p-3">6x faster, 49% smaller than Whisper</td>
                <td className="p-3">Real-time transcription</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-green-400">OpenAI GPT-OSS 120B</td>
                <td className="p-3">120B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">240GB</td>
                <td className="p-3">OpenAI's first open-weight model, o4-mini level</td>
                <td className="p-3">General purpose, reasoning</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-lime-400">OpenAI GPT-OSS 20B</td>
                <td className="p-3">20B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">40GB</td>
                <td className="p-3">Compact version, o3-mini level performance</td>
                <td className="p-3">Edge deployment, reasoning</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-yellow-400">Qwen3 235B-A22B</td>
                <td className="p-3">235B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">470GB</td>
                <td className="p-3">MoE, 119 languages, beats DeepSeek R1</td>
                <td className="p-3">Multilingual, enterprise</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-orange-400">Qwen3 32B</td>
                <td className="p-3">32B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">64GB</td>
                <td className="p-3">Dense model, excellent multilingual</td>
                <td className="p-3">Production deployment</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-red-400">OLMo 2 32B</td>
                <td className="p-3">32B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">64GB</td>
                <td className="p-3">Fully open, beats GPT-3.5 Turbo</td>
                <td className="p-3">Research, transparency</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-pink-400">NVIDIA Nemotron Nano 9B</td>
                <td className="p-3">9B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">18GB</td>
                <td className="p-3">Mamba-Transformer hybrid, 6x faster</td>
                <td className="p-3">Real-time reasoning</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-purple-400">Command R+ 104B</td>
                <td className="p-3">104B</td>
                <td className="p-3">CC-BY-NC-4.0</td>
                <td className="p-3">208GB</td>
                <td className="p-3">RAG optimized, tool use, 10 languages</td>
                <td className="p-3">Enterprise RAG, agents</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-cyan-400">MiniCPM-o 2.6</td>
                <td className="p-3">8B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">16GB</td>
                <td className="p-3">Multimodal, beats GPT-4o on vision</td>
                <td className="p-3">Mobile multimodal</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-emerald-400">OpenBioLLM 70B</td>
                <td className="p-3">70B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">140GB</td>
                <td className="p-3">Medical domain, beats Med-PaLM-2</td>
                <td className="p-3">Healthcare, biomedical</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-blue-400">StarCoder 15B</td>
                <td className="p-3">15B</td>
                <td className="p-3">OpenRAIL</td>
                <td className="p-3">30GB</td>
                <td className="p-3">Code generation, 80+ languages</td>
                <td className="p-3">Code completion, development</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-indigo-400">MusicGen</td>
                <td className="p-3">3.3B</td>
                <td className="p-3">CC-BY-NC-4.0</td>
                <td className="p-3">7GB</td>
                <td className="p-3">Music generation from text prompts</td>
                <td className="p-3">Audio/music creation</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-violet-400">OpenSora 2.0</td>
                <td className="p-3">Transformer</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">Variable</td>
                <td className="p-3">Video generation, commercial quality</td>
                <td className="p-3">Video production</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-red-400">DeepSeek V3.1</td>
                <td className="p-3">685B</td>
                <td className="p-3">MIT</td>
                <td className="p-3">1370GB</td>
                <td className="p-3">Hybrid thinking mode, beats GPT-5</td>
                <td className="p-3">Advanced reasoning, research</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-yellow-400">Qwen 2.5-Max</td>
                <td className="p-3">~70B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">140GB</td>
                <td className="p-3">Alibaba's latest, beats DeepSeek V3</td>
                <td className="p-3">Enterprise, multimodal</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-orange-400">IBM Granite 3.0 8B</td>
                <td className="p-3">8B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">16GB</td>
                <td className="p-3">Enterprise model, 116 programming languages</td>
                <td className="p-3">Enterprise workflows, tools</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-purple-400">Yi 1.5 34B</td>
                <td className="p-3">34B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">68GB</td>
                <td className="p-3">Bilingual (Chinese/English), reasoning</td>
                <td className="p-3">01.AI flagship, bilingual</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-green-400">Baichuan 4</td>
                <td className="p-3">13B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">26GB</td>
                <td className="p-3">Chinese domain specialist (law, finance)</td>
                <td className="p-3">Chinese business applications</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-blue-400">ChatGLM-4.5</td>
                <td className="p-3">~13B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">26GB</td>
                <td className="p-3">Agentic AI, cheaper than DeepSeek</td>
                <td className="p-3">Agent workflows, Chinese</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-pink-400">CroissantLLM</td>
                <td className="p-3">1.3B</td>
                <td className="p-3">MIT</td>
                <td className="p-3">3GB</td>
                <td className="p-3">Truly bilingual French-English</td>
                <td className="p-3">French language applications</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-cyan-400">BLOOM</td>
                <td className="p-3">176B</td>
                <td className="p-3">BigScience OpenRAIL-M</td>
                <td className="p-3">352GB</td>
                <td className="p-3">46 languages, 13 programming languages</td>
                <td className="p-3">Multilingual research</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-emerald-400">Rakuten AI 2.0</td>
                <td className="p-3">MoE</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">Variable</td>
                <td className="p-3">Japanese-optimized, MoE architecture</td>
                <td className="p-3">Japanese business applications</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-indigo-400">FinGPT</td>
                <td className="p-3">7B</td>
                <td className="p-3">MIT</td>
                <td className="p-3">14GB</td>
                <td className="p-3">Financial domain, sentiment analysis</td>
                <td className="p-3">Financial analysis, trading</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-lime-400">BloombergGPT</td>
                <td className="p-3">50B</td>
                <td className="p-3">Research only</td>
                <td className="p-3">100GB</td>
                <td className="p-3">Finance-specific training data</td>
                <td className="p-3">Financial NLP, research</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-rose-400">Palmyra-Med 70B</td>
                <td className="p-3">70B</td>
                <td className="p-3">Commercial license</td>
                <td className="p-3">140GB</td>
                <td className="p-3">Medical domain, beats Med-PaLM-2</td>
                <td className="p-3">Healthcare applications</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-slate-400">LawLLM</td>
                <td className="p-3">7B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">14GB</td>
                <td className="p-3">US legal system specialist</td>
                <td className="p-3">Legal research, compliance</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-teal-400">Gemma 3 270M</td>
                <td className="p-3">270M</td>
                <td className="p-3">Gemma License</td>
                <td className="p-3">600MB</td>
                <td className="p-3">Ultra-efficient edge AI, 0.75% battery</td>
                <td className="p-3">Mobile, edge devices</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-orange-400">TinyLlama</td>
                <td className="p-3">1.1B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">2.2GB</td>
                <td className="p-3">Compact LLaMA architecture</td>
                <td className="p-3">Resource-constrained devices</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-violet-400">MobileLLM-R1</td>
                <td className="p-3">950M</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">2GB</td>
                <td className="p-3">Edge reasoning, 2-5x performance boost</td>
                <td className="p-3">Mobile reasoning, math</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-red-400">Cisco Foundation-sec-8B</td>
                <td className="p-3">8B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">16GB</td>
                <td className="p-3">Security-focused, threat detection</td>
                <td className="p-3">Cybersecurity, SOC operations</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-orange-400">Trend Cybertron</td>
                <td className="p-3">8B</td>
                <td className="p-3">Open Source</td>
                <td className="p-3">16GB</td>
                <td className="p-3">Autonomous cybersecurity agents</td>
                <td className="p-3">Security automation, defense</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-green-400">Qwen-Image-Edit</td>
                <td className="p-3">20B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">40GB</td>
                <td className="p-3">Precise image editing, text rendering</td>
                <td className="p-3">Image editing, visual design</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-blue-400">InstantID</td>
                <td className="p-3">Diffusion</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">8GB</td>
                <td className="p-3">Identity-preserving generation</td>
                <td className="p-3">Avatar creation, face swapping</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-purple-400">ControlNet</td>
                <td className="p-3">Various</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">Variable</td>
                <td className="p-3">Controlled image generation</td>
                <td className="p-3">Guided image synthesis</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-cyan-400">OpenVLA</td>
                <td className="p-3">7B</td>
                <td className="p-3">MIT</td>
                <td className="p-3">14GB</td>
                <td className="p-3">Vision-language-action for robots</td>
                <td className="p-3">Robotic manipulation</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-pink-400">SmolVLA</td>
                <td className="p-3">450M</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">1GB</td>
                <td className="p-3">Compact robotics model</td>
                <td className="p-3">Lightweight robotics</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-yellow-400">UMA (Meta)</td>
                <td className="p-3">Variable</td>
                <td className="p-3">Open Source</td>
                <td className="p-3">Variable</td>
                <td className="p-3">Universal atomic simulation, 10000x faster DFT</td>
                <td className="p-3">Materials science, chemistry</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-emerald-400">ChemBERTa-2</td>
                <td className="p-3">110M</td>
                <td className="p-3">MIT</td>
                <td className="p-3">500MB</td>
                <td className="p-3">Chemical foundation model, SMILES</td>
                <td className="p-3">Drug discovery, chemistry</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-indigo-400">BioGPT</td>
                <td className="p-3">355M</td>
                <td className="p-3">MIT</td>
                <td className="p-3">1GB</td>
                <td className="p-3">Biomedical text generation, 78.2% PubMedQA</td>
                <td className="p-3">Biomedical research, literature</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-teal-400">IBM SMILES-TED</td>
                <td className="p-3">Transformer</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">Variable</td>
                <td className="p-3">91M SMILES samples, chemical synthesis</td>
                <td className="p-3">Materials discovery, green chemistry</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-red-400">YOLO v11</td>
                <td className="p-3">Varies (n,s,m,l,x)</td>
                <td className="p-3">AGPL-3.0</td>
                <td className="p-3">Variable</td>
                <td className="p-3">Latest object detection, 22% fewer params</td>
                <td className="p-3">Real-time object detection</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-orange-400">YOLOv10</td>
                <td className="p-3">Varies (n,s,m,l,x)</td>
                <td className="p-3">AGPL-3.0</td>
                <td className="p-3">Variable</td>
                <td className="p-3">End-to-end detection, no NMS needed</td>
                <td className="p-3">Efficient object detection</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-blue-400">SAM 2</td>
                <td className="p-3">Transformer</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">Variable</td>
                <td className="p-3">Segment anything in images/videos, 44 FPS</td>
                <td className="p-3">Image/video segmentation</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-purple-400">Florence-2</td>
                <td className="p-3">230M/770M</td>
                <td className="p-3">MIT</td>
                <td className="p-3">1-2GB</td>
                <td className="p-3">Lightweight VLM, captioning, detection</td>
                <td className="p-3">Vision-language tasks</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-green-400">Grounding DINO</td>
                <td className="p-3">Transformer</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">Variable</td>
                <td className="p-3">Open-set detection, 52.5 AP COCO zero-shot</td>
                <td className="p-3">Zero-shot object detection</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-cyan-400">LLaVA 1.6</td>
                <td className="p-3">7B/13B/34B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">14-68GB</td>
                <td className="p-3">Large language and vision assistant</td>
                <td className="p-3">Multimodal conversations</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-pink-400">MiniGPT-4</td>
                <td className="p-3">7B/13B</td>
                <td className="p-3">BSD 3-Clause</td>
                <td className="p-3">14-26GB</td>
                <td className="p-3">Aligned vision encoder with LLM</td>
                <td className="p-3">Image understanding, creativity</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-yellow-400">BLIP-2</td>
                <td className="p-3">2.7B/7.8B</td>
                <td className="p-3">BSD 3-Clause</td>
                <td className="p-3">6-16GB</td>
                <td className="p-3">Q-Former bridging vision and language</td>
                <td className="p-3">Vision-language pre-training</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-indigo-400">PaLI-3</td>
                <td className="p-3">5B</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">10GB</td>
                <td className="p-3">Multilingual vision-language, 100+ languages</td>
                <td className="p-3">Multilingual VL tasks</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-emerald-400">PaddleOCR 3.0</td>
                <td className="p-3">Various</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">Variable</td>
                <td className="p-3">PP-OCRv5, 13-point accuracy gain</td>
                <td className="p-3">OCR, document parsing</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-slate-400">TrOCR</td>
                <td className="p-3">Transformer</td>
                <td className="p-3">MIT</td>
                <td className="p-3">Variable</td>
                <td className="p-3">End-to-end text recognition</td>
                <td className="p-3">Handwritten text OCR</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-lime-400">Donut</td>
                <td className="p-3">200M</td>
                <td className="p-3">MIT</td>
                <td className="p-3">1GB</td>
                <td className="p-3">OCR-free document understanding</td>
                <td className="p-3">Document AI, form parsing</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-violet-400">LayoutLMv3</td>
                <td className="p-3">134M</td>
                <td className="p-3">MIT</td>
                <td className="p-3">500MB</td>
                <td className="p-3">Document understanding, 83.37 ANLS DocVQA</td>
                <td className="p-3">Document layout analysis</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-amber-400">Granite-Docling-258M</td>
                <td className="p-3">258M</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">1GB</td>
                <td className="p-3">End-to-end document conversion, 30x faster</td>
                <td className="p-3">Enterprise document processing</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-blue-400">CLIP (OpenAI)</td>
                <td className="p-3">ViT-L/14</td>
                <td className="p-3">MIT</td>
                <td className="p-3">Variable</td>
                <td className="p-3">Vision-language contrastive learning</td>
                <td className="p-3">Image embeddings, zero-shot</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-green-400">OpenCLIP</td>
                <td className="p-3">ViT-G/14</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">Variable</td>
                <td className="p-3">Open source CLIP implementation</td>
                <td className="p-3">Large-scale image embeddings</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-purple-400">SigLIP 2</td>
                <td className="p-3">Various</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">Variable</td>
                <td className="p-3">Multilingual vision-language, sigmoid loss</td>
                <td className="p-3">Improved semantic understanding</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-cyan-400">OpenVision</td>
                <td className="p-3">Various</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">Variable</td>
                <td className="p-3">2-3x faster training than CLIP</td>
                <td className="p-3">Efficient vision encoding</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-red-400">BGE Reranker v2-M3</td>
                <td className="p-3">600M</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">1.2GB</td>
                <td className="p-3">Multilingual reranking, SOTA performance</td>
                <td className="p-3">RAG, search reranking</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-orange-400">Jina Reranker v2</td>
                <td className="p-3">Base</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">Variable</td>
                <td className="p-3">6x faster, multilingual, function-calling</td>
                <td className="p-3">Agentic RAG, code search</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-yellow-400">ColBERT</td>
                <td className="p-3">BERT-based</td>
                <td className="p-3">MIT</td>
                <td className="p-3">Variable</td>
                <td className="p-3">Efficient neural search with late interaction</td>
                <td className="p-3">Information retrieval</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-indigo-400">E5-Large-v2</td>
                <td className="p-3">335M</td>
                <td className="p-3">MIT</td>
                <td className="p-3">1.3GB</td>
                <td className="p-3">Microsoft's text embedding model</td>
                <td className="p-3">Text similarity, retrieval</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-pink-400">Chronos</td>
                <td className="p-3">Various</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">Variable</td>
                <td className="p-3">Time series foundation model, 250x faster</td>
                <td className="p-3">Time series forecasting</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-emerald-400">TimesFM</td>
                <td className="p-3">200M</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">800MB</td>
                <td className="p-3">Google's time series model, 100B time-points</td>
                <td className="p-3">Zero-shot forecasting</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-lime-400">Moirai 2.0</td>
                <td className="p-3">Transformer</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">Variable</td>
                <td className="p-3">#1 on GIFT-Eval benchmark, decoder-only</td>
                <td className="p-3">Universal forecasting</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-violet-400">Prophet</td>
                <td className="p-3">Statistical</td>
                <td className="p-3">MIT</td>
                <td className="p-3">Light</td>
                <td className="p-3">Meta's forecasting tool with seasonality</td>
                <td className="p-3">Business forecasting</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-teal-400">NeuralProphet</td>
                <td className="p-3">Neural</td>
                <td className="p-3">MIT</td>
                <td className="p-3">Variable</td>
                <td className="p-3">55-92% accuracy improvement over Prophet</td>
                <td className="p-3">Interpretable forecasting</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-slate-400">Wav2Vec2</td>
                <td className="p-3">Large</td>
                <td className="p-3">MIT</td>
                <td className="p-3">Variable</td>
                <td className="p-3">Self-supervised speech representation</td>
                <td className="p-3">Speech recognition, ASR</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-rose-400">WavLM</td>
                <td className="p-3">316M</td>
                <td className="p-3">MIT</td>
                <td className="p-3">1.2GB</td>
                <td className="p-3">Speaker verification, diarization</td>
                <td className="p-3">Speaker tasks, speech processing</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-sky-400">SpeechT5</td>
                <td className="p-3">Transformer</td>
                <td className="p-3">MIT</td>
                <td className="p-3">Variable</td>
                <td className="p-3">Unified speech-text pre-training</td>
                <td className="p-3">Speech synthesis, recognition</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-amber-400">TabNet</td>
                <td className="p-3">Various</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">Variable</td>
                <td className="p-3">Attention-based tabular learning</td>
                <td className="p-3">Structured data, tabular ML</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-green-400">XGBoost</td>
                <td className="p-3">Tree-based</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">Light</td>
                <td className="p-3">Extreme gradient boosting</td>
                <td className="p-3">Tabular data, competitions</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold text-purple-400">LightGBM</td>
                <td className="p-3">Tree-based</td>
                <td className="p-3">MIT</td>
                <td className="p-3">Light</td>
                <td className="p-3">Fast gradient boosting framework</td>
                <td className="p-3">Efficient tabular learning</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Hardware Requirements */}
      <div className="bg-orange-900/10 rounded-lg p-6 border border-orange-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Cpu className="w-5 h-5 text-orange-400" />
          <h2 className="text-xl font-bold text-orange-300">Hardware Requirements</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="font-semibold text-green-400 mb-3">Consumer Hardware (12-24GB)</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>RTX 4090:</strong> 24GB - up to 13B models</li>
              <li>• <strong>RTX 4080:</strong> 16GB - up to 7B models</li>
              <li>• <strong>Ultra-Light:</strong> Gemma 3 270M, TinyLlama 1.1B</li>
              <li>• <strong>Recommended:</strong> CroissantLLM 1.3B, IBM Granite 3.0 8B</li>
              <li>• <strong>Edge Reasoning:</strong> MobileLLM-R1 950M</li>
              <li>• <strong>Search/Embedding:</strong> CLIP, all-MiniLM-L6-v2</li>
              <li>• <strong>Audio:</strong> Wav2Vec2, SpeechT5</li>
              <li>• <strong>Tabular:</strong> XGBoost, LightGBM, TabNet</li>
              <li>• <strong>Quantization:</strong> GGUF Q4/Q8, QLoRA 4-bit</li>
              <li>• <strong>Mobile:</strong> 48 tokens/sec on Snapdragon X Elite</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-400 mb-3">Professional (48-80GB)</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>A100 80GB:</strong> Single GPU up to 30B</li>
              <li>• <strong>H100 80GB:</strong> Faster training, larger batches</li>
              <li>• <strong>Recommended:</strong> OpenAI GPT-OSS 20B, Qwen 2.5-Max</li>
              <li>• <strong>Specialists:</strong> BioGPT, Cisco Foundation-sec, ChemBERTa</li>
              <li>• <strong>Regional:</strong> Yi 1.5 34B, Baichuan 4, ChatGLM-4.5</li>
              <li>• <strong>Time Series:</strong> TimesFM 200M, Chronos-T5, Moirai 2.0</li>
              <li>• <strong>Retrieval:</strong> BGE Reranker v2-M3, ColBERT-v2, E5-Large-v2</li>
              <li>• <strong>Techniques:</strong> DeepSpeed ZeRO Stage 2</li>
              <li>• <strong>Fine-tuning:</strong> Full parameter or large LoRA</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="font-semibold text-red-400 mb-3">Enterprise (Multi-GPU)</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>2-8x H100:</strong> 70B+ models</li>
              <li>• <strong>Multi-node:</strong> 400B+ models like DeepSeek R1</li>
              <li>• <strong>Latest Flagship:</strong> DeepSeek V3.1 685B (MIT license)</li>
              <li>• <strong>Enterprise:</strong> OpenAI GPT-OSS 120B, BLOOM 176B</li>
              <li>• <strong>Advanced:</strong> Qwen-Image-Edit 20B, OpenVLA 7B</li>
              <li>• <strong>Scientific:</strong> UMA (Meta), BloombergGPT 50B</li>
              <li>• <strong>Vision:</strong> SAM 2, YOLO v11, Florence-2, OpenCLIP</li>
              <li>• <strong>Audio/Speech:</strong> WavLM 316M, large Wav2Vec2 models</li>
              <li>• <strong>Techniques:</strong> DeepSpeed ZeRO Stage 3, FSDP</li>
              <li>• <strong>Infrastructure:</strong> InfiniBand, NVLink</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Licensing Breakdown */}
      <div className="bg-red-900/10 rounded-lg p-6 border border-red-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-red-400" />
          <h2 className="text-xl font-bold text-red-300">Licensing & Legal Considerations</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-600/30">
            <h3 className="font-semibold text-green-400 mb-3">Permissive Licenses (Recommended)</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Apache 2.0:</strong> Mistral, Qwen, EleutherAI models</li>
              <li>• <strong>MIT:</strong> Phi-4, some research models</li>
              <li>• <strong>Benefits:</strong> Commercial use, modification, distribution</li>
              <li>• <strong>Requirements:</strong> Attribution, license inclusion</li>
              <li>• <strong>Patent Protection:</strong> Apache 2.0 provides coverage</li>
            </ul>
          </div>

          <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-600/30">
            <h3 className="font-semibold text-yellow-400 mb-3">Custom Licenses (Caution)</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Meta Llama:</strong> Custom license with restrictions</li>
              <li>• <strong>Gemma:</strong> Terms of Use with commercial limits</li>
              <li>• <strong>Restrictions:</strong> Revenue thresholds, use case limits</li>
              <li>• <strong>Derivative Works:</strong> Complex fine-tuning implications</li>
              <li>• <strong>Legal Review:</strong> Required for commercial use</li>
            </ul>
          </div>

          <div className="bg-red-900/20 rounded-lg p-4 border border-red-600/30">
            <h3 className="font-semibold text-red-400 mb-3">Enterprise Considerations</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Legal Compliance:</strong> OSI-approved preferred</li>
              <li>• <strong>Liability:</strong> No warranty in any open source</li>
              <li>• <strong>IP Rights:</strong> Unclear derivative work ownership</li>
              <li>• <strong>Commercial Support:</strong> Available for some models</li>
              <li>• <strong>Risk Assessment:</strong> Balance capability vs legal risk</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Performance Benchmarks */}
      <div className="bg-purple-900/10 rounded-lg p-6 border border-purple-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-bold text-purple-300">Performance Insights</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-purple-200 mb-3">Key Performance Factors</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Inference Speed:</strong> Llama 3 &gt; Mistral &gt; Qwen &gt; Gemma</li>
              <li>• <strong>Reasoning:</strong> DeepSeek R1 &gt; Phi-4 &gt; Llama 3.3</li>
              <li>• <strong>Multilingual:</strong> Qwen 2.5 ≈ Llama 3.3 &gt; others</li>
              <li>• <strong>Code Quality:</strong> DeepSeek Coder &gt; Qwen Coder &gt; Phi-4</li>
              <li>• <strong>Fine-tuning Speed:</strong> Smaller models train 2-5x faster</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-purple-200 mb-3">Cost Considerations</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Training Cost:</strong> Scales quadratically with model size</li>
              <li>• <strong>Inference Cost:</strong> DeepSeek models 90% cheaper than others</li>
              <li>• <strong>Hardware:</strong> 70B models require $10K+ in GPUs</li>
              <li>• <strong>Cloud Training:</strong> $13 (LoRA) vs $322 (full fine-tuning)</li>
              <li>• <strong>Long-term:</strong> Consider inference volume costs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Decision Guide */}
      <div className="bg-gray-900/30 rounded-lg p-6 border border-gray-600">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-green-400" />
          <h2 className="text-xl font-bold text-gray-300">Quick Decision Guide</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-600/30">
            <h3 className="font-semibold text-green-400 mb-2">Start Here (Budget &lt; $5K)</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>General:</strong> Phi-4 (14B) - MIT license</li>
              <li>• <strong>Commercial:</strong> Mistral Small 3.1 - Apache 2.0</li>
              <li>• <strong>Hardware:</strong> RTX 4090 or cloud instances</li>
              <li>• <strong>Technique:</strong> QLoRA 4-bit fine-tuning</li>
            </ul>
          </div>

          <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-600/30">
            <h3 className="font-semibold text-blue-400 mb-2">Scale Up (Budget $5K-50K)</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Performance:</strong> Llama 3.3 70B or Qwen 2.5 72B</li>
              <li>• <strong>Commercial:</strong> Check licensing carefully</li>
              <li>• <strong>Hardware:</strong> 2-4x A100/H100 GPUs</li>
              <li>• <strong>Technique:</strong> DeepSpeed ZeRO + LoRA</li>
            </ul>
          </div>

          <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-600/30">
            <h3 className="font-semibold text-purple-400 mb-2">Enterprise (Budget $50K+)</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Performance:</strong> DeepSeek R1 for reasoning</li>
              <li>• <strong>Reliable:</strong> Llama 3.3 for production</li>
              <li>• <strong>Infrastructure:</strong> Multi-node clusters</li>
              <li>• <strong>Support:</strong> Consider commercial partnerships</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Model Recommendation Modal */}
      <ModelRecommendationModal
        isOpen={isRecommendationOpen}
        onClose={() => setIsRecommendationOpen(false)}
      />

      {/* Auth Prompt Modal */}
      <AuthPromptModal
        isOpen={isAuthPromptOpen}
        onClose={() => setIsAuthPromptOpen(false)}
        feature="Model Recommendations"
        description="Get AI-powered recommendations tailored to your specific needs, hardware, and experience level."
      />
    </div>
  );
}