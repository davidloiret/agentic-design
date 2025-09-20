'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Cpu,
  DollarSign,
  Clock,
  Zap,
  Shield,
  Code,
  Brain,
  Sparkles,
  CheckCircle,
  Star,
  ArrowRight,
  Target,
  Settings,
  Database,
  Globe,
  Mic,
  BarChart,
  Eye,
  Search,
  MessageSquare,
  FileText,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';

interface ModelRecommendation {
  name: string;
  size: string;
  license: string;
  vram: string;
  strengths: string[];
  bestFor: string[];
  score: number;
  reasoning: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  cost: 'Low' | 'Medium' | 'High';
}

interface UserPreferences {
  useCase: string;
  domain: string;
  experience: string;
  hardware: string;
  budget: string;
  latency: string;
  accuracy: string;
  licensing: string;
  deployment: string;
}

interface ModelRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const stepTitles = [
  'Use Case',
  'Domain',
  'Experience',
  'Hardware',
  'Constraints',
  'Recommendations'
];

const useCases = [
  { id: 'chat', icon: <MessageSquare className="w-6 h-6" />, label: 'Chat & Conversation', description: 'Interactive dialogues, customer support, virtual assistants' },
  { id: 'code', icon: <Code className="w-6 h-6" />, label: 'Code Generation', description: 'Programming assistance, code completion, debugging' },
  { id: 'analysis', icon: <Brain className="w-6 h-6" />, label: 'Analysis & Reasoning', description: 'Complex problem solving, logical reasoning, research' },
  { id: 'content', icon: <FileText className="w-6 h-6" />, label: 'Content Creation', description: 'Writing, summarization, documentation' },
  { id: 'vision', icon: <Eye className="w-6 h-6" />, label: 'Computer Vision', description: 'Image analysis, object detection, visual understanding' },
  { id: 'search', icon: <Search className="w-6 h-6" />, label: 'Search & Retrieval', description: 'Document search, embedding, similarity matching' },
  { id: 'audio', icon: <Mic className="w-6 h-6" />, label: 'Audio & Speech', description: 'Speech recognition, synthesis, audio processing' },
  { id: 'data', icon: <BarChart className="w-6 h-6" />, label: 'Data Analysis', description: 'Time series, tabular data, forecasting' }
];

const domains = [
  { id: 'general', icon: <Globe className="w-5 h-5" />, label: 'General Purpose', description: 'Broad applications across domains' },
  { id: 'enterprise', icon: <Users className="w-5 h-5" />, label: 'Enterprise', description: 'Business applications, professional use' },
  { id: 'research', icon: <Database className="w-5 h-5" />, label: 'Research & Academic', description: 'Scientific research, experiments' },
  { id: 'finance', icon: <DollarSign className="w-5 h-5" />, label: 'Finance', description: 'Financial analysis, trading, risk assessment' },
  { id: 'healthcare', icon: <Shield className="w-5 h-5" />, label: 'Healthcare', description: 'Medical analysis, diagnosis support' },
  { id: 'legal', icon: <FileText className="w-5 h-5" />, label: 'Legal', description: 'Legal document analysis, compliance' },
  { id: 'security', icon: <Shield className="w-5 h-5" />, label: 'Cybersecurity', description: 'Threat detection, security analysis' },
  { id: 'creative', icon: <Sparkles className="w-5 h-5" />, label: 'Creative', description: 'Art, design, content creation' }
];

const experienceLevels = [
  { id: 'beginner', icon: <Star className="w-5 h-5" />, label: 'Beginner', description: 'New to AI/ML, prefer simple setup' },
  { id: 'intermediate', icon: <TrendingUp className="w-5 h-5" />, label: 'Intermediate', description: 'Some experience, comfortable with technical details' },
  { id: 'advanced', icon: <Award className="w-5 h-5" />, label: 'Advanced', description: 'Experienced, can handle complex setups' }
];

const hardwareOptions = [
  { id: 'cpu', icon: <Cpu className="w-5 h-5" />, label: 'CPU Only', description: 'No GPU, lightweight models only', vram: '0GB' },
  { id: 'consumer', icon: <Cpu className="w-5 h-5" />, label: 'Consumer GPU', description: 'RTX 4080/4090, RTX 3080/3090', vram: '12-24GB' },
  { id: 'professional', icon: <Cpu className="w-5 h-5" />, label: 'Professional GPU', description: 'A100, H100, V100', vram: '48-80GB' },
  { id: 'enterprise', icon: <Cpu className="w-5 h-5" />, label: 'Multi-GPU/Cluster', description: 'Multiple high-end GPUs', vram: '160GB+' },
  { id: 'cloud', icon: <Cpu className="w-5 h-5" />, label: 'Cloud/API', description: 'Using cloud services, no local hardware limits', vram: 'Unlimited' }
];

export const ModelRecommendationModal: React.FC<ModelRecommendationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({});
  const [recommendations, setRecommendations] = useState<ModelRecommendation[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const generateRecommendations = async () => {
    setIsGenerating(true);

    // Simulate API call with actual recommendation logic
    await new Promise(resolve => setTimeout(resolve, 2000));

    const recommendations: ModelRecommendation[] = getRecommendationsForPreferences(preferences);
    setRecommendations(recommendations);
    setIsGenerating(false);
  };

  // Comprehensive model database
  const modelDatabase = [
    // Language Models
    { name: 'DeepSeek V3.1', size: '685B', license: 'MIT', vram: '1200GB', category: 'Language Model', useCase: ['chat', 'analysis', 'code'], domain: ['general', 'enterprise'], difficulty: 'Advanced', cost: 'High', strengths: ['Hybrid thinking', 'Massive scale', 'SOTA reasoning'], specialties: ['reasoning', 'mathematics', 'analysis'] },
    { name: 'Llama 3.3 70B', size: '70B', license: 'Custom', vram: '140GB', category: 'Language Model', useCase: ['chat', 'analysis', 'content'], domain: ['general', 'enterprise'], difficulty: 'Intermediate', cost: 'Medium', strengths: ['Proven quality', 'Multilingual', 'Strong reasoning'], specialties: ['conversation', 'multilingual'] },
    { name: 'Mistral Small 3.1', size: '22B', license: 'Apache 2.0', vram: '44GB', category: 'Language Model', useCase: ['chat', 'content'], domain: ['general', 'enterprise'], difficulty: 'Beginner', cost: 'Low', strengths: ['Commercial-friendly', 'Fast inference', 'Good quality'], specialties: ['commercial', 'speed'] },
    { name: 'Qwen 2.5 72B', size: '72B', license: 'Apache 2.0', vram: '144GB', category: 'Language Model', useCase: ['chat', 'analysis', 'code'], domain: ['general', 'enterprise'], difficulty: 'Intermediate', cost: 'Medium', strengths: ['Multilingual excellence', 'Code generation', 'Reasoning'], specialties: ['multilingual', 'code'] },
    { name: 'Phi-4', size: '14B', license: 'MIT', vram: '28GB', category: 'Language Model', useCase: ['chat', 'analysis'], domain: ['general', 'research'], difficulty: 'Beginner', cost: 'Low', strengths: ['Excellent quality/size ratio', 'Fast training', 'Research-friendly'], specialties: ['efficiency', 'research'] },
    { name: 'IBM Granite 3.0 8B', size: '8B', license: 'Apache 2.0', vram: '16GB', category: 'Language Model', useCase: ['chat', 'code', 'content'], domain: ['enterprise'], difficulty: 'Beginner', cost: 'Low', strengths: ['Enterprise-ready', '116 languages', 'Commercial support'], specialties: ['enterprise', 'multilingual'] },
    { name: 'Gemma 3 270M', size: '270M', license: 'Gemma License', vram: '1GB', category: 'Language Model', useCase: ['chat'], domain: ['general'], difficulty: 'Beginner', cost: 'Low', strengths: ['Ultra-efficient', 'Edge deployment', 'Low power'], specialties: ['edge', 'efficiency'] },
    { name: 'TinyLlama 1.1B', size: '1.1B', license: 'Apache 2.0', vram: '2GB', category: 'Language Model', useCase: ['chat'], domain: ['general'], difficulty: 'Beginner', cost: 'Low', strengths: ['Lightweight', 'Fast inference', 'Easy deployment'], specialties: ['lightweight', 'speed'] },

    // Code Models
    { name: 'DeepSeek Coder V2', size: '16B', license: 'MIT', vram: '32GB', category: 'Code Model', useCase: ['code'], domain: ['general', 'enterprise'], difficulty: 'Intermediate', cost: 'Medium', strengths: ['SOTA code generation', 'Multiple languages', 'Fast inference'], specialties: ['programming', 'debugging'] },
    { name: 'StarCoder 15B', size: '15B', license: 'Apache 2.0', vram: '30GB', category: 'Code Model', useCase: ['code'], domain: ['general'], difficulty: 'Intermediate', cost: 'Medium', strengths: ['Open code training', 'Good performance', 'Commercial-friendly'], specialties: ['open-source', 'programming'] },

    // Vision Models
    { name: 'YOLO v11', size: 'Variable', license: 'AGPL-3.0', vram: '2-8GB', category: 'Vision Model', useCase: ['vision'], domain: ['general', 'security'], difficulty: 'Intermediate', cost: 'Low', strengths: ['Real-time detection', '22% fewer params', 'High accuracy'], specialties: ['object-detection', 'real-time'] },
    { name: 'SAM 2', size: 'Transformer', license: 'Apache 2.0', vram: '6GB', category: 'Vision Model', useCase: ['vision'], domain: ['general', 'research'], difficulty: 'Intermediate', cost: 'Low', strengths: ['Segment anything', '44 FPS', 'Video support'], specialties: ['segmentation', 'video'] },
    { name: 'Florence-2', size: '230M/770M', license: 'MIT', vram: '1-2GB', category: 'Vision Model', useCase: ['vision'], domain: ['general'], difficulty: 'Beginner', cost: 'Low', strengths: ['Lightweight VLM', 'Captioning', 'Detection'], specialties: ['lightweight', 'captioning'] },
    { name: 'LLaVA 1.6', size: '7B/13B/34B', license: 'Apache 2.0', vram: '14-70GB', category: 'Vision Model', useCase: ['vision'], domain: ['general', 'research'], difficulty: 'Intermediate', cost: 'Medium', strengths: ['Vision-language', 'Conversational', 'Open source'], specialties: ['vision-language', 'conversation'] },

    // Domain Specialists
    { name: 'BloombergGPT 50B', size: '50B', license: 'Research', vram: '100GB', category: 'Domain Specialist', useCase: ['analysis'], domain: ['finance'], difficulty: 'Advanced', cost: 'High', strengths: ['Financial expertise', 'Market analysis', 'Risk assessment'], specialties: ['finance', 'trading'] },
    { name: 'BioGPT', size: '355M', license: 'MIT', vram: '1GB', category: 'Domain Specialist', useCase: ['analysis', 'content'], domain: ['healthcare'], difficulty: 'Beginner', cost: 'Low', strengths: ['Biomedical text', '78.2% PubMedQA', 'Lightweight'], specialties: ['biomedical', 'research'] },
    { name: 'LawLLM 7B', size: '7B', license: 'Apache 2.0', vram: '14GB', category: 'Domain Specialist', useCase: ['analysis', 'content'], domain: ['legal'], difficulty: 'Intermediate', cost: 'Medium', strengths: ['US legal system', 'Case analysis', 'Legal reasoning'], specialties: ['legal', 'compliance'] },
    { name: 'Cisco Foundation-sec-8B', size: '8B', license: 'Apache 2.0', vram: '16GB', category: 'Domain Specialist', useCase: ['analysis'], domain: ['security'], difficulty: 'Intermediate', cost: 'Medium', strengths: ['Cybersecurity focus', 'Threat analysis', 'Security protocols'], specialties: ['cybersecurity', 'threats'] },
    { name: 'ChemBERTa-2', size: '110M', license: 'MIT', vram: '500MB', category: 'Domain Specialist', useCase: ['analysis'], domain: ['research'], difficulty: 'Beginner', cost: 'Low', strengths: ['Chemical SMILES', 'Drug discovery', 'Molecular analysis'], specialties: ['chemistry', 'molecules'] },

    // Search & Retrieval
    { name: 'BGE Reranker v2-M3', size: 'Large', license: 'MIT', vram: '4GB', category: 'Embedding Model', useCase: ['search'], domain: ['general', 'enterprise'], difficulty: 'Beginner', cost: 'Low', strengths: ['Excellent reranking', 'Multilingual', 'Fast inference'], specialties: ['reranking', 'search'] },
    { name: 'ColBERT-v2', size: 'BERT-base', license: 'MIT', vram: '2GB', category: 'Embedding Model', useCase: ['search'], domain: ['general'], difficulty: 'Beginner', cost: 'Low', strengths: ['Efficient retrieval', 'Late interaction', 'Scalable'], specialties: ['retrieval', 'efficiency'] },
    { name: 'CLIP-ViT-L/14', size: 'ViT-Large', license: 'MIT', vram: '4GB', category: 'Embedding Model', useCase: ['search', 'vision'], domain: ['general'], difficulty: 'Beginner', cost: 'Low', strengths: ['Image-text matching', 'Zero-shot', 'Versatile'], specialties: ['image-search', 'multimodal'] },
    { name: 'E5-Large-v2', size: 'Large', license: 'MIT', vram: '2GB', category: 'Embedding Model', useCase: ['search'], domain: ['general'], difficulty: 'Beginner', cost: 'Low', strengths: ['Text embedding', 'High quality', 'Fast'], specialties: ['text-embedding', 'similarity'] },

    // Time Series
    { name: 'Chronos-T5', size: 'T5-based', license: 'Apache 2.0', vram: '4GB', category: 'Time Series Model', useCase: ['data'], domain: ['general', 'finance'], difficulty: 'Intermediate', cost: 'Low', strengths: ['250x faster training', 'Zero-shot', 'Foundation model'], specialties: ['forecasting', 'time-series'] },
    { name: 'TimesFM 200M', size: '200M', license: 'Apache 2.0', vram: '800MB', category: 'Time Series Model', useCase: ['data'], domain: ['general'], difficulty: 'Beginner', cost: 'Low', strengths: ['Google model', '100B time-points', 'Zero-shot'], specialties: ['forecasting', 'zero-shot'] },
    { name: 'Moirai 2.0', size: 'Transformer', license: 'Apache 2.0', vram: '2GB', category: 'Time Series Model', useCase: ['data'], domain: ['general'], difficulty: 'Intermediate', cost: 'Low', strengths: ['#1 GIFT-Eval', 'Decoder-only', 'Universal'], specialties: ['forecasting', 'universal'] },

    // Audio Models
    { name: 'Wav2Vec2', size: 'Large', license: 'MIT', vram: '4GB', category: 'Audio Model', useCase: ['audio'], domain: ['general'], difficulty: 'Intermediate', cost: 'Low', strengths: ['Self-supervised', 'Speech representation', 'ASR'], specialties: ['speech-recognition', 'representation'] },
    { name: 'WavLM', size: '316M', license: 'MIT', vram: '1.2GB', category: 'Audio Model', useCase: ['audio'], domain: ['general'], difficulty: 'Intermediate', cost: 'Low', strengths: ['Speaker verification', 'Diarization', 'Speech tasks'], specialties: ['speaker-tasks', 'diarization'] },
    { name: 'SpeechT5', size: 'Transformer', license: 'MIT', vram: '2GB', category: 'Audio Model', useCase: ['audio'], domain: ['general'], difficulty: 'Intermediate', cost: 'Low', strengths: ['Unified speech-text', 'Synthesis', 'Recognition'], specialties: ['speech-synthesis', 'unified'] },

    // Tabular Data Models
    { name: 'TabNet', size: 'Various', license: 'Apache 2.0', vram: '1-4GB', category: 'Tabular Model', useCase: ['data'], domain: ['general', 'finance'], difficulty: 'Intermediate', cost: 'Low', strengths: ['Attention-based', 'Interpretable', 'Tabular learning'], specialties: ['tabular', 'interpretable'] },
    { name: 'XGBoost', size: 'Tree-based', license: 'Apache 2.0', vram: 'Light', category: 'Tabular Model', useCase: ['data'], domain: ['general'], difficulty: 'Beginner', cost: 'Low', strengths: ['Extreme gradient boosting', 'Competition winner', 'Fast'], specialties: ['tabular', 'competitions'] },
    { name: 'LightGBM', size: 'Tree-based', license: 'MIT', vram: 'Light', category: 'Tabular Model', useCase: ['data'], domain: ['general'], difficulty: 'Beginner', cost: 'Low', strengths: ['Fast training', 'Efficient', 'Lightweight'], specialties: ['tabular', 'efficiency'] }
  ];

  const getRecommendationsForPreferences = (prefs: Partial<UserPreferences>): ModelRecommendation[] => {
    // Filter models based on hardware constraints
    const getVramLimit = (hardware: string): number => {
      switch (hardware) {
        case 'cpu': return 0;
        case 'consumer': return 24;
        case 'professional': return 80;
        case 'enterprise': return 1000;
        case 'cloud': return 10000;
        default: return 24;
      }
    };

    const parseVram = (vramStr: string): number => {
      if (vramStr.includes('Light') || vramStr.includes('500MB')) return 0.5;
      if (vramStr.includes('800MB')) return 0.8;
      if (vramStr.includes('1GB')) return 1;
      if (vramStr.includes('1.2GB')) return 1.2;
      if (vramStr.includes('2GB')) return 2;
      if (vramStr.includes('4GB')) return 4;
      if (vramStr.includes('6GB')) return 6;
      if (vramStr.includes('14GB')) return 14;
      if (vramStr.includes('16GB')) return 16;
      if (vramStr.includes('28GB')) return 28;
      if (vramStr.includes('30GB')) return 30;
      if (vramStr.includes('32GB')) return 32;
      if (vramStr.includes('44GB')) return 44;
      if (vramStr.includes('70GB')) return 70;
      if (vramStr.includes('100GB')) return 100;
      if (vramStr.includes('140GB')) return 140;
      if (vramStr.includes('144GB')) return 144;
      if (vramStr.includes('1200GB')) return 1200;
      return 1000; // Default for variable/unknown
    };

    const vramLimit = getVramLimit(prefs.hardware || 'consumer');
    const filteredModels = modelDatabase.filter(model => {
      // Hardware filtering
      if (prefs.hardware === 'cpu' && parseVram(model.vram) > 0.5) return false;
      if (parseVram(model.vram) > vramLimit) return false;

      // Use case filtering
      if (prefs.useCase && !model.useCase.includes(prefs.useCase)) return false;

      // Domain filtering (if specified and model has domain restrictions)
      if (prefs.domain && model.domain.length > 0 && !model.domain.includes(prefs.domain) && !model.domain.includes('general')) return false;

      // Licensing filtering
      if (prefs.licensing === 'permissive' && !['Apache 2.0', 'MIT'].includes(model.license)) return false;
      if (prefs.licensing === 'commercial' && ['AGPL-3.0', 'Research', 'Custom'].includes(model.license)) return false;

      // Experience level filtering
      if (prefs.experience === 'beginner' && model.difficulty === 'Advanced') return false;

      return true;
    });

    // Score models based on preferences
    const scoredModels = filteredModels.map(model => {
      let score = 70; // Base score

      // Use case match bonus
      if (prefs.useCase && model.useCase.includes(prefs.useCase)) score += 15;

      // Domain match bonus
      if (prefs.domain && model.domain.includes(prefs.domain)) score += 10;

      // Experience level match
      if (prefs.experience === 'beginner' && model.difficulty === 'Beginner') score += 8;
      if (prefs.experience === 'intermediate' && model.difficulty === 'Intermediate') score += 8;
      if (prefs.experience === 'advanced' && model.difficulty === 'Advanced') score += 8;

      // Hardware efficiency bonus
      const modelVram = parseVram(model.vram);
      const utilizationRatio = modelVram / vramLimit;
      if (utilizationRatio < 0.5) score += 5; // Efficient use of hardware
      if (utilizationRatio > 0.8) score -= 5; // Might be tight on memory

      // Licensing preference bonus
      if (prefs.licensing === 'permissive' && ['Apache 2.0', 'MIT'].includes(model.license)) score += 5;
      if (prefs.licensing === 'commercial' && ['Apache 2.0', 'MIT'].includes(model.license)) score += 8;

      // Latency preference adjustment
      if (prefs.latency === 'speed') {
        if (model.cost === 'Low' || model.specialties.includes('speed') || model.specialties.includes('efficiency')) score += 8;
        if (parseVram(model.vram) > 50) score -= 5; // Large models are slower
      }
      if (prefs.latency === 'accuracy') {
        if (parseVram(model.vram) > 50) score += 5; // Larger models often more accurate
        if (model.specialties.includes('reasoning') || model.specialties.includes('analysis')) score += 8;
      }

      // Special bonuses for specific combinations
      if (prefs.useCase === 'code' && model.specialties.includes('programming')) score += 10;
      if (prefs.useCase === 'vision' && model.specialties.includes('real-time')) score += 8;
      if (prefs.domain === 'finance' && model.specialties.includes('finance')) score += 15;
      if (prefs.domain === 'healthcare' && model.specialties.includes('biomedical')) score += 15;
      if (prefs.domain === 'security' && model.specialties.includes('cybersecurity')) score += 15;
      if (prefs.domain === 'legal' && model.specialties.includes('legal')) score += 15;

      // Cap score at 100
      score = Math.min(score, 100);

      const recommendation: ModelRecommendation = {
        name: model.name,
        size: model.size,
        license: model.license,
        vram: model.vram,
        strengths: model.strengths,
        bestFor: getBestForList(model, prefs),
        score: score,
        reasoning: generateReasoning(model, prefs, score),
        category: model.category,
        difficulty: model.difficulty,
        cost: model.cost
      };

      return recommendation;
    });

    // Sort by score and return top 5
    return scoredModels
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  };

  const getBestForList = (model: any, prefs: Partial<UserPreferences>): string[] => {
    const bestFor: string[] = [];

    if (model.useCase.includes('chat')) bestFor.push('Conversational AI', 'Customer support');
    if (model.useCase.includes('code')) bestFor.push('Code generation', 'Programming assistance');
    if (model.useCase.includes('vision')) bestFor.push('Image analysis', 'Computer vision');
    if (model.useCase.includes('audio')) bestFor.push('Speech processing', 'Audio analysis');
    if (model.useCase.includes('search')) bestFor.push('Information retrieval', 'Semantic search');
    if (model.useCase.includes('data')) bestFor.push('Data analysis', 'Forecasting');
    if (model.useCase.includes('analysis')) bestFor.push('Research', 'Complex reasoning');

    if (prefs.domain === 'finance') bestFor.push('Financial analysis', 'Risk assessment');
    if (prefs.domain === 'healthcare') bestFor.push('Medical research', 'Clinical analysis');
    if (prefs.domain === 'legal') bestFor.push('Legal research', 'Document analysis');
    if (prefs.domain === 'security') bestFor.push('Threat detection', 'Security analysis');
    if (prefs.domain === 'enterprise') bestFor.push('Business applications', 'Enterprise deployment');

    return bestFor.slice(0, 4); // Limit to 4 items
  };

  const generateReasoning = (model: any, prefs: Partial<UserPreferences>, score: number): string => {
    const parseVramLocal = (vramStr: string): number => {
      if (vramStr.includes('Light') || vramStr.includes('500MB')) return 0.5;
      if (vramStr.includes('800MB')) return 0.8;
      if (vramStr.includes('1GB')) return 1;
      if (vramStr.includes('1.2GB')) return 1.2;
      if (vramStr.includes('2GB')) return 2;
      if (vramStr.includes('4GB')) return 4;
      if (vramStr.includes('6GB')) return 6;
      if (vramStr.includes('14GB')) return 14;
      if (vramStr.includes('16GB')) return 16;
      if (vramStr.includes('28GB')) return 28;
      if (vramStr.includes('30GB')) return 30;
      if (vramStr.includes('32GB')) return 32;
      if (vramStr.includes('44GB')) return 44;
      if (vramStr.includes('70GB')) return 70;
      if (vramStr.includes('100GB')) return 100;
      if (vramStr.includes('140GB')) return 140;
      if (vramStr.includes('144GB')) return 144;
      if (vramStr.includes('1200GB')) return 1200;
      return 1000;
    };

    const reasons: string[] = [];

    if (prefs.useCase && model.useCase.includes(prefs.useCase)) {
      reasons.push(`Perfect match for ${prefs.useCase} applications`);
    }

    if (prefs.domain && model.domain.includes(prefs.domain)) {
      reasons.push(`Specialized for ${prefs.domain} domain`);
    }

    if (prefs.experience === 'beginner' && model.difficulty === 'Beginner') {
      reasons.push('Easy to set up and use for beginners');
    }

    if (prefs.licensing === 'commercial' && ['Apache 2.0', 'MIT'].includes(model.license)) {
      reasons.push('Commercial-friendly licensing');
    }

    if (prefs.latency === 'speed' && (model.cost === 'Low' || model.specialties.includes('speed'))) {
      reasons.push('Optimized for fast inference');
    }

    if (prefs.hardware === 'consumer' && parseVramLocal(model.vram) <= 24) {
      reasons.push('Fits well on consumer hardware');
    }

    if (prefs.hardware === 'cpu' && parseVramLocal(model.vram) <= 1) {
      reasons.push('Can run on CPU without GPU');
    }

    if (model.license === 'Apache 2.0' || model.license === 'MIT') {
      reasons.push('Open source with permissive licensing');
    }

    if (reasons.length === 0) {
      reasons.push('Good general-purpose model for your requirements');
    }

    return reasons.join('. ') + '.';
  };

  const nextStep = () => {
    if (currentStep < stepTitles.length - 1) {
      if (currentStep === stepTitles.length - 2) {
        generateRecommendations();
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const selectOption = (key: keyof UserPreferences, value: string) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const resetModal = () => {
    setCurrentStep(0);
    setPreferences({});
    setRecommendations([]);
    setIsGenerating(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-4xl max-h-[90vh] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-gray-700/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Target className="w-7 h-7 text-blue-400" />
                  AI Model Recommendation
                </h2>
                <p className="text-gray-400 mt-1">Find the perfect model for your needs</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Step {currentStep + 1} of {stepTitles.length}</span>
                <span className="text-sm text-gray-400">{Math.round(((currentStep + 1) / stepTitles.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / stepTitles.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex justify-between mt-2">
                {stepTitles.map((title, index) => (
                  <span
                    key={title}
                    className={`text-xs ${
                      index <= currentStep ? 'text-blue-400' : 'text-gray-500'
                    }`}
                  >
                    {title}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 0: Use Case */}
                {currentStep === 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">What's your primary use case?</h3>
                    <p className="text-gray-400 mb-6">Select the main application for your AI model</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {useCases.map((useCase) => (
                        <button
                          key={useCase.id}
                          onClick={() => selectOption('useCase', useCase.id)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            preferences.useCase === useCase.id
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-gray-700 hover:border-gray-600 bg-gray-800/30'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${
                              preferences.useCase === useCase.id ? 'text-blue-400' : 'text-gray-400'
                            }`}>
                              {useCase.icon}
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{useCase.label}</h4>
                              <p className="text-sm text-gray-400 mt-1">{useCase.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 1: Domain */}
                {currentStep === 1 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">What's your domain?</h3>
                    <p className="text-gray-400 mb-6">Choose the industry or field you're working in</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {domains.map((domain) => (
                        <button
                          key={domain.id}
                          onClick={() => selectOption('domain', domain.id)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            preferences.domain === domain.id
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-gray-700 hover:border-gray-600 bg-gray-800/30'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${
                              preferences.domain === domain.id ? 'text-purple-400' : 'text-gray-400'
                            }`}>
                              {domain.icon}
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{domain.label}</h4>
                              <p className="text-sm text-gray-400 mt-1">{domain.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Experience */}
                {currentStep === 2 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">What's your experience level?</h3>
                    <p className="text-gray-400 mb-6">Help us tailor recommendations to your technical expertise</p>
                    <div className="grid grid-cols-1 gap-4">
                      {experienceLevels.map((level) => (
                        <button
                          key={level.id}
                          onClick={() => selectOption('experience', level.id)}
                          className={`p-6 rounded-xl border-2 transition-all text-left ${
                            preferences.experience === level.id
                              ? 'border-green-500 bg-green-500/10'
                              : 'border-gray-700 hover:border-gray-600 bg-gray-800/30'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${
                              preferences.experience === level.id ? 'text-green-400' : 'text-gray-400'
                            }`}>
                              {level.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold text-white text-lg">{level.label}</h4>
                              <p className="text-gray-400 mt-1">{level.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Hardware */}
                {currentStep === 3 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">What hardware do you have?</h3>
                    <p className="text-gray-400 mb-6">Your hardware determines which models you can run effectively</p>
                    <div className="grid grid-cols-1 gap-4">
                      {hardwareOptions.map((hardware) => (
                        <button
                          key={hardware.id}
                          onClick={() => selectOption('hardware', hardware.id)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            preferences.hardware === hardware.id
                              ? 'border-orange-500 bg-orange-500/10'
                              : 'border-gray-700 hover:border-gray-600 bg-gray-800/30'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                preferences.hardware === hardware.id ? 'text-orange-400' : 'text-gray-400'
                              }`}>
                                {hardware.icon}
                              </div>
                              <div>
                                <h4 className="font-medium text-white">{hardware.label}</h4>
                                <p className="text-sm text-gray-400 mt-1">{hardware.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-medium text-gray-300">VRAM</span>
                              <p className="text-lg font-semibold text-orange-400">{hardware.vram}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Constraints */}
                {currentStep === 4 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Any additional constraints?</h3>
                    <p className="text-gray-400 mb-6">Fine-tune your recommendations with specific requirements</p>

                    <div className="space-y-6">
                      {/* Licensing Preference */}
                      <div>
                        <h4 className="font-medium text-white mb-3">Licensing Preference</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {['any', 'permissive', 'commercial'].map((option) => (
                            <button
                              key={option}
                              onClick={() => selectOption('licensing', option)}
                              className={`p-3 rounded-lg border transition-all ${
                                preferences.licensing === option
                                  ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                                  : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-gray-600'
                              }`}
                            >
                              {option === 'any' && 'Any License'}
                              {option === 'permissive' && 'Permissive Only'}
                              {option === 'commercial' && 'Commercial Friendly'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Latency Priority */}
                      <div>
                        <h4 className="font-medium text-white mb-3">Latency Priority</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {['balanced', 'speed', 'accuracy'].map((option) => (
                            <button
                              key={option}
                              onClick={() => selectOption('latency', option)}
                              className={`p-3 rounded-lg border transition-all ${
                                preferences.latency === option
                                  ? 'border-green-500 bg-green-500/10 text-green-400'
                                  : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-gray-600'
                              }`}
                            >
                              {option === 'balanced' && 'Balanced'}
                              {option === 'speed' && 'Speed First'}
                              {option === 'accuracy' && 'Accuracy First'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Recommendations */}
                {currentStep === 5 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Your Personalized Recommendations</h3>
                    <p className="text-gray-400 mb-6">Based on your preferences, here are the best models for you</p>

                    {isGenerating ? (
                      <div className="flex flex-col items-center justify-center py-20">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="mb-4"
                        >
                          <Settings className="w-12 h-12 text-blue-400" />
                        </motion.div>
                        <h4 className="text-lg font-medium text-white mb-2">Analyzing your requirements...</h4>
                        <p className="text-gray-400 text-center max-w-md">
                          We're processing your preferences and matching them with the best available models.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recommendations.map((rec, index) => (
                          <motion.div
                            key={rec.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="text-lg font-semibold text-white">{rec.name}</h4>
                                  <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-lg text-sm">
                                    #{index + 1}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                  <span>Size: {rec.size}</span>
                                  <span>License: {rec.license}</span>
                                  <span>VRAM: {rec.vram}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-1 mb-1">
                                  <Star className="w-4 h-4 text-yellow-400" />
                                  <span className="font-semibold text-yellow-400">{rec.score}/100</span>
                                </div>
                                <span className={`px-2 py-1 rounded-lg text-xs ${
                                  rec.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                                  rec.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-red-500/20 text-red-400'
                                }`}>
                                  {rec.difficulty}
                                </span>
                              </div>
                            </div>

                            <p className="text-gray-300 mb-4">{rec.reasoning}</p>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="font-medium text-white mb-2">Strengths</h5>
                                <ul className="text-sm text-gray-400 space-y-1">
                                  {rec.strengths.map((strength, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                      <CheckCircle className="w-3 h-3 text-green-400" />
                                      {strength}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="font-medium text-white mb-2">Best For</h5>
                                <ul className="text-sm text-gray-400 space-y-1">
                                  {rec.bestFor.map((use, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                      <Target className="w-3 h-3 text-blue-400" />
                                      {use}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 border-t border-gray-700/50 p-6 bg-gray-800/30">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentStep === 0
                    ? 'text-gray-500 cursor-not-allowed'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-3">
                {currentStep < stepTitles.length - 1 && (
                  <button
                    onClick={nextStep}
                    disabled={
                      (currentStep === 0 && !preferences.useCase) ||
                      (currentStep === 1 && !preferences.domain) ||
                      (currentStep === 2 && !preferences.experience) ||
                      (currentStep === 3 && !preferences.hardware)
                    }
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-400 text-white rounded-lg transition-colors font-medium"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {currentStep === stepTitles.length - 1 && !isGenerating && (
                  <button
                    onClick={handleClose}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};