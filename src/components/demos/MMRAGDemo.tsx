'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Image, FileText, Mic, Video, Database, Search, Brain, Layers, Sparkles, Zap, Activity, Globe, Cpu, Network } from 'lucide-react';

interface ModalitySource {
  type: 'text' | 'image' | 'audio' | 'video' | 'structured';
  content: string;
  relevance: number;
  embedding?: number[];
  metadata: {
    source: string;
    format?: string;
    dimensions?: string;
    duration?: string;
    size?: string;
    features?: string[];
  };
}

interface ProcessingMetric {
  modality: string;
  latency: number;
  dataPoints: number;
  confidence: number;
}

export default function MMRAGDemo() {
  const [query, setQuery] = useState('Analyze product performance across customer reviews, demo videos, and usage metrics');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [modalitySources, setModalitySources] = useState<ModalitySource[]>([]);
  const [fusedContext, setFusedContext] = useState('');
  const [response, setResponse] = useState('');
  const [processingModality, setProcessingModality] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<ProcessingMetric[]>([]);
  const [alignmentScore, setAlignmentScore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const metricsCanvasRef = useRef<HTMLCanvasElement>(null);

  const steps = [
    'Query Analysis & Decomposition',
    'Text Retrieval & Processing',
    'Image Analysis & Feature Extraction',
    'Audio Processing & Transcription',
    'Video Analysis & Keyframe Extraction',
    'Structured Data Query',
    'Cross-Modal Alignment',
    'Multimodal Feature Fusion',
    'Response Generation'
  ];

  const modalityColors = {
    text: '#3b82f6',
    image: '#10b981',
    audio: '#f59e0b',
    video: '#ef4444',
    structured: '#8b5cf6'
  };

  const drawMetricsVisualization = () => {
    const canvas = metricsCanvasRef.current;
    if (!canvas || metrics.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 800;
    const height = 200;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = '100%';
    canvas.style.height = `${height}px`;

    ctx.clearRect(0, 0, width, height);

    // Background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(1, '#1e293b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw metrics bars
    const barWidth = 80;
    const barSpacing = 20;
    const startX = (width - (metrics.length * (barWidth + barSpacing) - barSpacing)) / 2;
    const maxLatency = Math.max(...metrics.map(m => m.latency));

    metrics.forEach((metric, idx) => {
      const x = startX + idx * (barWidth + barSpacing);
      const barHeight = (metric.latency / maxLatency) * 120;
      const y = 160 - barHeight;

      // Bar
      const barGradient = ctx.createLinearGradient(x, y, x, 160);
      barGradient.addColorStop(0, modalityColors[metric.modality.toLowerCase() as keyof typeof modalityColors]);
      barGradient.addColorStop(1, modalityColors[metric.modality.toLowerCase() as keyof typeof modalityColors] + '66');
      ctx.fillStyle = barGradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Confidence indicator
      const confidenceY = y - 10;
      ctx.fillStyle = metric.confidence > 0.8 ? '#10b981' : metric.confidence > 0.6 ? '#f59e0b' : '#ef4444';
      ctx.beginPath();
      ctx.arc(x + barWidth / 2, confidenceY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Labels
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText(metric.modality, x + barWidth / 2, 175);
      ctx.fillText(`${metric.latency}ms`, x + barWidth / 2, 185);

      // Data points
      ctx.font = '9px sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText(`${metric.dataPoints} items`, x + barWidth / 2, 195);
    });

    // Title
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'left';
    ctx.fillText('Processing Metrics', 10, 20);

    // Legend
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('● High Confidence (>80%)', width - 150, 15);
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('● Medium (60-80%)', width - 150, 28);
    ctx.fillStyle = '#ef4444';
    ctx.fillText('● Low (<60%)', width - 150, 41);
  };

  const drawVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 800;
    const height = 400;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = '100%';
    canvas.style.height = `${height}px`;

    ctx.clearRect(0, 0, width, height);

    // Background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(1, '#1e293b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i <= height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Draw modality nodes in a circle
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.25;
    const modalities = [
      { name: 'Text', icon: '📝', type: 'text' },
      { name: 'Image', icon: '🖼️', type: 'image' },
      { name: 'Audio', icon: '🎵', type: 'audio' },
      { name: 'Video', icon: '🎬', type: 'video' },
      { name: 'Data', icon: '📊', type: 'structured' }
    ];

    modalities.forEach((modality, idx) => {
      const angle = (idx / modalities.length) * Math.PI * 2 - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      // Connection to center
      if (processingModality === modality.name || currentStep >= 6) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(centerX, centerY);

        // Animated gradient line
        const lineGradient = ctx.createLinearGradient(x, y, centerX, centerY);
        lineGradient.addColorStop(0, modalityColors[modality.type]);
        lineGradient.addColorStop(0.5, modalityColors[modality.type] + 'aa');
        lineGradient.addColorStop(1, '#818cf8');
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = processingModality === modality.name ? 3 : 1.5;
        ctx.stroke();

        // Data flow particles
        if (processingModality === modality.name) {
          const particleX = x + (centerX - x) * 0.5;
          const particleY = y + (centerY - y) * 0.5;
          ctx.beginPath();
          ctx.arc(particleX, particleY, 3, 0, Math.PI * 2);
          ctx.fillStyle = modalityColors[modality.type];
          ctx.fill();
        }
      }

      // Node circle
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);

      // Node fill
      if (processingModality === modality.name) {
        const nodeGradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
        nodeGradient.addColorStop(0, modalityColors[modality.type]);
        nodeGradient.addColorStop(1, modalityColors[modality.type] + '33');
        ctx.fillStyle = nodeGradient;
      } else {
        ctx.fillStyle = '#1e293b';
      }
      ctx.fill();

      // Node border
      ctx.strokeStyle = modalityColors[modality.type];
      ctx.lineWidth = processingModality === modality.name ? 3 : 2;
      ctx.stroke();

      // Icon
      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(modality.icon, x, y);

      // Label
      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(modality.name, x, y + 45);

      // Status indicator
      if (modalitySources.some(s => s.type === modality.type)) {
        ctx.beginPath();
        ctx.arc(x + 20, y - 20, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();
      }
    });

    // Central fusion core
    ctx.beginPath();
    ctx.arc(centerX, centerY, 45, 0, Math.PI * 2);

    // Fusion core gradient
    const fusionGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 45);
    if (currentStep >= 7) {
      fusionGradient.addColorStop(0, '#818cf8');
      fusionGradient.addColorStop(0.5, '#6366f1');
      fusionGradient.addColorStop(1, '#4f46e5');
    } else {
      fusionGradient.addColorStop(0, '#475569');
      fusionGradient.addColorStop(1, '#334155');
    }
    ctx.fillStyle = fusionGradient;
    ctx.fill();

    // Fusion core border
    ctx.strokeStyle = currentStep >= 7 ? '#a5b4fc' : '#64748b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Fusion core icon
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🧠', centerX, centerY);

    // Fusion label
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('FUSION', centerX, centerY + 65);

    // Output pipeline
    if (currentStep >= 8) {
      // Arrow
      const outputX = centerX + radius + 100;
      ctx.beginPath();
      ctx.moveTo(centerX + 45, centerY);
      ctx.lineTo(outputX - 30, centerY);
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Arrow head
      ctx.beginPath();
      ctx.moveTo(outputX - 35, centerY - 5);
      ctx.lineTo(outputX - 30, centerY);
      ctx.lineTo(outputX - 35, centerY + 5);
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Output node
      ctx.beginPath();
      ctx.arc(outputX, centerY, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Output icon
      ctx.font = '16px sans-serif';
      ctx.fillText('✨', outputX, centerY);

      // Output label
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Response', outputX, centerY + 35);
    }

    // Alignment score
    if (alignmentScore > 0) {
      ctx.font = 'bold 14px sans-serif';
      ctx.fillStyle = '#10b981';
      ctx.textAlign = 'right';
      ctx.fillText(`Alignment: ${alignmentScore}%`, width - 20, 20);
    }

    // Processing step
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'left';
    ctx.fillText(`Step ${currentStep + 1}: ${steps[currentStep]}`, 10, height - 10);
  };

  useEffect(() => {
    drawVisualization();
  }, [processingModality, currentStep, modalitySources, alignmentScore]);

  useEffect(() => {
    drawMetricsVisualization();
  }, [metrics]);

  const processQuery = async () => {
    setIsProcessing(true);
    setCurrentStep(0);
    setModalitySources([]);
    setFusedContext('');
    setResponse('');
    setMetrics([]);
    setAlignmentScore(0);

    // Step 1: Query analysis
    await new Promise(resolve => setTimeout(resolve, 800));
    setCurrentStep(1);

    // Step 2: Text retrieval
    setProcessingModality('Text');
    await new Promise(resolve => setTimeout(resolve, 1200));
    const textSource: ModalitySource = {
      type: 'text',
      content: 'Technical documentation, user manuals, and API references analyzed. Found detailed specifications, feature descriptions, and implementation guidelines.',
      relevance: 0.92,
      embedding: [0.34, 0.67, 0.89, 0.45, 0.78],
      metadata: {
        source: 'docs/technical-manual.pdf',
        format: 'PDF',
        size: '3.2MB',
        features: ['specifications', 'API docs', 'guides']
      }
    };
    setModalitySources([textSource]);
    setMetrics(prev => [...prev, { modality: 'Text', latency: 245, dataPoints: 1847, confidence: 0.92 }]);
    setCurrentStep(2);

    // Step 3: Image analysis
    setProcessingModality('Image');
    await new Promise(resolve => setTimeout(resolve, 1100));
    const imageSource: ModalitySource = {
      type: 'image',
      content: 'Product screenshots, UI mockups, and architecture diagrams processed. Extracted visual features include layout patterns, color schemes, and component structures.',
      relevance: 0.88,
      embedding: [0.56, 0.43, 0.91, 0.67, 0.34],
      metadata: {
        source: 'assets/product-images',
        format: 'PNG/JPG',
        dimensions: '1920x1080',
        size: '45MB',
        features: ['UI elements', 'layouts', 'diagrams']
      }
    };
    setModalitySources(prev => [...prev, imageSource]);
    setMetrics(prev => [...prev, { modality: 'Image', latency: 312, dataPoints: 234, confidence: 0.88 }]);
    setCurrentStep(3);

    // Step 4: Audio processing
    setProcessingModality('Audio');
    await new Promise(resolve => setTimeout(resolve, 1000));
    const audioSource: ModalitySource = {
      type: 'audio',
      content: 'Customer testimonials and support calls transcribed. Sentiment analysis reveals 87% positive feedback with emphasis on ease of use and reliability.',
      relevance: 0.85,
      embedding: [0.78, 0.45, 0.67, 0.89, 0.56],
      metadata: {
        source: 'recordings/customer-feedback',
        format: 'MP3/WAV',
        duration: '47:32 total',
        size: '128MB',
        features: ['transcripts', 'sentiment', 'keywords']
      }
    };
    setModalitySources(prev => [...prev, audioSource]);
    setMetrics(prev => [...prev, { modality: 'Audio', latency: 489, dataPoints: 89, confidence: 0.85 }]);
    setCurrentStep(4);

    // Step 5: Video analysis
    setProcessingModality('Video');
    await new Promise(resolve => setTimeout(resolve, 1200));
    const videoSource: ModalitySource = {
      type: 'video',
      content: 'Product demos and tutorials analyzed. Extracted 147 keyframes showing feature workflows, user interactions, and performance benchmarks.',
      relevance: 0.94,
      embedding: [0.91, 0.78, 0.45, 0.67, 0.89],
      metadata: {
        source: 'videos/product-demos',
        format: 'MP4/WebM',
        duration: '2:34:17 total',
        size: '2.3GB',
        features: ['keyframes', 'workflows', 'benchmarks']
      }
    };
    setModalitySources(prev => [...prev, videoSource]);
    setMetrics(prev => [...prev, { modality: 'Video', latency: 678, dataPoints: 147, confidence: 0.94 }]);
    setCurrentStep(5);

    // Step 6: Structured data
    setProcessingModality('Data');
    await new Promise(resolve => setTimeout(resolve, 900));
    const structuredSource: ModalitySource = {
      type: 'structured',
      content: 'Database metrics: 4.5★ rating (1,247 reviews), 89% retention rate, 234K active users, $2.3M ARR, 15ms p95 latency.',
      relevance: 0.90,
      embedding: [0.67, 0.89, 0.34, 0.56, 0.78],
      metadata: {
        source: 'analytics/product-metrics',
        format: 'JSON/SQL',
        size: '156MB',
        features: ['metrics', 'KPIs', 'analytics']
      }
    };
    setModalitySources(prev => [...prev, structuredSource]);
    setMetrics(prev => [...prev, { modality: 'Data', latency: 156, dataPoints: 4832, confidence: 0.90 }]);
    setCurrentStep(6);

    // Step 7: Cross-modal alignment
    setProcessingModality(null);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setAlignmentScore(89);
    setCurrentStep(7);

    // Step 8: Feature fusion
    await new Promise(resolve => setTimeout(resolve, 1200));
    setFusedContext('Integrated multimodal analysis reveals comprehensive product insights: Visual analysis confirms intuitive UI design matching documentation specs. Audio sentiment aligns with quantitative ratings (87% positive vs 4.5★). Video demonstrations validate performance metrics (15ms latency). Cross-modal consistency score: 89%.');
    setAlignmentScore(92);
    setCurrentStep(8);

    // Step 9: Response generation
    await new Promise(resolve => setTimeout(resolve, 1800));
    setResponse(`Comprehensive Multimodal Analysis Complete:

📊 Performance Overview:
• Customer Satisfaction: 4.5★ from 1,247 reviews (structured data)
• Sentiment Score: 87% positive (audio analysis)
• User Retention: 89% monthly active users (database metrics)
• Technical Performance: 15ms p95 latency (video benchmarks verified)

🎯 Key Insights from Cross-Modal Analysis:
• UI/UX Excellence: Visual analysis of 234 screenshots confirms intuitive design patterns that align with the positive feedback in audio testimonials
• Feature Completeness: Video demonstrations showcase all 47 documented features operating within specified parameters
• Documentation Quality: Technical specifications match actual implementation across all analyzed media types

💡 Multimodal Correlations:
• Strong alignment (92%) between visual design patterns and user satisfaction metrics
• Audio sentiment analysis correlates with structured rating data (r=0.89)
• Performance benchmarks from videos match real-time database metrics

🚀 Recommendations:
Based on the integrated analysis across text, images, audio, video, and structured data:
1. Product shows consistent excellence across all modalities
2. User experience aligns with technical capabilities
3. Documentation accurately reflects implementation
4. Customer feedback validates design decisions

Confidence Score: 91% (based on cross-modal agreement and data coverage)`);
    setCurrentStep(9);
    setIsProcessing(false);
  };

  const getModalityIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'audio': return <Mic className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'structured': return <Database className="w-4 h-4" />;
      default: return null;
    }
  };

  const getModalityColor = (type: string) => {
    switch (type) {
      case 'text': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      case 'image': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'audio': return 'text-amber-400 border-amber-400/30 bg-amber-400/10';
      case 'video': return 'text-red-400 border-red-400/30 bg-red-400/10';
      case 'structured': return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
    }
  };

  return (
    <div className="w-full space-y-6 p-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block text-slate-300">Multimodal Query</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              readOnly
              className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white backdrop-blur-sm"
              placeholder="Enter your multimodal query..."
            />
            <button
              onClick={processQuery}
              disabled={isProcessing}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4 animate-pulse" />
                  Processing
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Analyze
                </span>
              )}
            </button>
          </div>
        </div>

        {isProcessing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                {steps[currentStep]}
              </span>
              <span className="text-slate-500">{currentStep + 1}/{steps.length}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 relative"
                style={{ width: `${(currentStep + 1) / steps.length * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <Network className="w-5 h-5 text-purple-400" />
          Multimodal Processing Pipeline
        </h3>
        <div className="rounded-lg overflow-hidden bg-slate-950">
          <canvas
            ref={canvasRef}
            className="w-full"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>
      </div>

      {metrics.length > 0 && (
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
          <div className="rounded-lg overflow-hidden bg-slate-950">
            <canvas
              ref={metricsCanvasRef}
              className="w-full"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>
        </div>
      )}

      {modalitySources.length > 0 && (
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <Globe className="w-5 h-5 text-blue-400" />
            Retrieved Multimodal Sources
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {modalitySources.map((source, idx) => (
              <div key={idx} className={`border rounded-lg p-4 space-y-3 transition-all duration-300 hover:shadow-lg ${getModalityColor(source.type)}`}>
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getModalityIcon(source.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold capitalize text-white">{source.type}</span>
                      <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full">
                        {(source.relevance * 100).toFixed(0)}% relevance
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 mb-2">{source.content}</p>

                    {source.embedding && (
                      <div className="flex gap-1 mb-2">
                        {source.embedding.map((val, i) => (
                          <div
                            key={i}
                            className="h-16 w-8 bg-gradient-to-t from-slate-700 to-slate-600 rounded"
                            style={{
                              height: `${val * 60}px`,
                              opacity: 0.6 + val * 0.4
                            }}
                          />
                        ))}
                        <span className="text-xs text-slate-500 ml-2 self-end">embedding</span>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                      <div>📁 {source.metadata.source}</div>
                      {source.metadata.format && <div>📄 {source.metadata.format}</div>}
                      {source.metadata.size && <div>💾 {source.metadata.size}</div>}
                      {source.metadata.dimensions && <div>📐 {source.metadata.dimensions}</div>}
                      {source.metadata.duration && <div>⏱️ {source.metadata.duration}</div>}
                    </div>

                    {source.metadata.features && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {source.metadata.features.map((feature, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-slate-700 rounded text-slate-300">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {fusedContext && (
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <Brain className="w-5 h-5 text-indigo-400" />
            Cross-Modal Feature Fusion
          </h3>
          <div className="bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-blue-900/20 rounded-lg p-4 border border-indigo-500/30">
            <p className="text-sm text-slate-200 leading-relaxed">{fusedContext}</p>
            {alignmentScore > 0 && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs text-slate-400">Cross-Modal Alignment Score:</span>
                <div className="flex-1 bg-slate-700 rounded-full h-2 max-w-xs">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                    style={{ width: `${alignmentScore}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-emerald-400">{alignmentScore}%</span>
              </div>
            )}
          </div>
        </div>
      )}

      {response && (
        <div className="bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-blue-900/20 border border-purple-600/30 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Integrated Multimodal Response
          </h3>
          <div className="space-y-2 text-sm text-slate-200 whitespace-pre-line leading-relaxed">
            {response}
          </div>
        </div>
      )}
    </div>
  );
}