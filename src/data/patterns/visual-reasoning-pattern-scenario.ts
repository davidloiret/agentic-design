import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const visualReasoningPatternScenario: PatternScenario = {
  id: 'visual-reasoning-patterns',
  title: 'Visual Reasoning Patterns',
  description: 'Advanced visual reasoning patterns combining perception with step-by-step logical reasoning for complex visual understanding tasks',
  initialNodes: [
    // Main Challenge
    {
      id: 'visual-reasoning-challenge',
      position: { x: 400, y: 50 },
      data: { label: '👁️ Visual Reasoning Challenge\n"How to combine visual perception with logical reasoning\nto understand complex visual scenes, analyze relationships,\nand generate accurate explanations for AI systems?"' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 380 },
    },

    // Core Components
    {
      id: 'visual-perception',
      position: { x: 100, y: 200 },
      data: { label: '🔍 Visual Perception\n"Scene understanding:\n• Object detection & recognition\n• Spatial relationship analysis\n• Scene parsing & segmentation\n• Visual grounding (88% accuracy)"' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 260 },
    },

    {
      id: 'logical-reasoning',
      position: { x: 400, y: 200 },
      data: { label: '🧠 Logical Reasoning\n"Step-by-step analysis:\n• Causal inference\n• Temporal reasoning\n• Abstract pattern recognition\n• Multi-step problem solving"' },
      style: { ...nodeStyle, background: '#0891b2', minWidth: 260 },
    },

    {
      id: 'cross-modal-integration',
      position: { x: 700, y: 200 },
      data: { label: '🔗 Cross-Modal Integration\n"Vision-language fusion:\n• Visual-text alignment\n• Multimodal transformers\n• Attention mechanisms\n• Context bridging"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 260 },
    },

    // VCTP - Visual Chain of Thought
    {
      id: 'vctp-see',
      position: { x: 150, y: 380 },
      data: { label: '👀 VCTP: See Stage\n"Visual concept grounding:\n• Object detection models\n• Scene parsing networks\n• Visual concept candidates\n• Spatial understanding"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    {
      id: 'vctp-think',
      position: { x: 400, y: 380 },
      data: { label: '💭 VCTP: Think Stage\n"Adaptive reasoning:\n• Key concept attention\n• Visual captioning\n• LLM reasoning chain\n• Context transformation"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    {
      id: 'vctp-confirm',
      position: { x: 650, y: 380 },
      data: { label: '✅ VCTP: Confirm Stage\n"Verification & iteration:\n• Rationale generation\n• Cross-modal verification\n• Consistency checking\n• Iterative refinement"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },

    // Visual Attention Mechanisms
    {
      id: 'attention-extraction',
      position: { x: 200, y: 560 },
      data: { label: '🎯 Feature Extraction\n"Multi-scale processing:\n• CNN feature maps\n• Spatial attention\n• Channel attention\n• Hierarchical features"' },
      style: { ...nodeStyle, background: '#ea580c', minWidth: 240 },
    },

    {
      id: 'attention-computation',
      position: { x: 450, y: 560 },
      data: { label: '⚡ Attention Computation\n"Dynamic focus:\n• Query-based attention\n• Self-attention mechanisms\n• Cross-attention layers\n• Adaptive weighting"' },
      style: { ...nodeStyle, background: '#be185d', minWidth: 240 },
    },

    {
      id: 'attention-aggregation',
      position: { x: 700, y: 560 },
      data: { label: '🔄 Weighted Aggregation\n"Feature fusion:\n• Attention-weighted combining\n• Dynamic pooling\n• Context integration\n• Task-specific decoding"' },
      style: { ...nodeStyle, background: '#16a34a', minWidth: 240 },
    },

    // Applications
    {
      id: 'medical-imaging',
      position: { x: 150, y: 740 },
      data: { label: '🏥 Medical Image Analysis\n"Diagnostic reasoning:\n• X-ray interpretation\n• MRI analysis\n• Anomaly detection\n• Clinical decision support"' },
      style: { ...nodeStyle, background: '#0369a1', minWidth: 240 },
    },

    {
      id: 'scene-understanding',
      position: { x: 400, y: 740 },
      data: { label: '🌆 Scene Understanding\n"Complex environment analysis:\n• Traffic scene safety\n• Autonomous navigation\n• Surveillance systems\n• Activity recognition"' },
      style: { ...nodeStyle, background: '#7c2d12', minWidth: 250 },
    },

    {
      id: 'document-analysis',
      position: { x: 650, y: 740 },
      data: { label: '📄 Document Analysis\n"Structured reasoning:\n• Chart interpretation\n• Scientific paper analysis\n• Technical diagram understanding\n• Information extraction"' },
      style: { ...nodeStyle, background: '#86198f', minWidth: 250 },
    },

    // Performance & Impact
    {
      id: 'performance-metrics',
      position: { x: 250, y: 920 },
      data: { label: '📊 Performance Metrics\n"Measurable improvements:\n• 46.4% → 78% accuracy (GPT-4V)\n• 35% faster diagnosis\n• 92% explainability score\n• 40% error reduction"' },
      style: { ...nodeStyle, background: '#1e40af', minWidth: 260 },
    },

    {
      id: 'business-impact',
      position: { x: 550, y: 920 },
      data: { label: '💰 Business Impact\n"Real-world value:\n• $12B healthcare AI market\n• 60% diagnostic efficiency gain\n• 25% cost reduction\n• Enhanced safety outcomes"' },
      style: { ...nodeStyle, background: '#0f766e', minWidth: 250 },
    },

    // Core Principle
    {
      id: 'visual-reasoning-principle',
      position: { x: 400, y: 1100 },
      data: { label: '🎯 Visual Reasoning Principle\n"Systematic visual analysis: See-Think-Confirm methodology enables transparent, step-by-step reasoning\nMultimodal integration: Vision-language fusion with attention mechanisms achieves robust understanding\nIterative verification: Cross-modal consistency checking ensures accuracy and explainability"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 520 },
    },
  ],
  initialEdges: [
    // Challenge drives core components
    {
      id: 'e1',
      source: 'visual-reasoning-challenge',
      target: 'visual-perception',
      ...edgeStyle,
      label: 'requires'
    },
    {
      id: 'e2',
      source: 'visual-reasoning-challenge',
      target: 'logical-reasoning',
      ...edgeStyle,
      label: 'needs'
    },
    {
      id: 'e3',
      source: 'visual-reasoning-challenge',
      target: 'cross-modal-integration',
      ...edgeStyle,
      label: 'demands'
    },

    // Core components enable VCTP stages
    {
      id: 'e4',
      source: 'visual-perception',
      target: 'vctp-see',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e5',
      source: 'logical-reasoning',
      target: 'vctp-think',
      ...edgeStyle,
      label: 'powers'
    },
    {
      id: 'e6',
      source: 'cross-modal-integration',
      target: 'vctp-confirm',
      ...edgeStyle,
      label: 'enables'
    },

    // VCTP stage flow
    {
      id: 'e7',
      source: 'vctp-see',
      target: 'vctp-think',
      ...edgeStyle,
      label: 'feeds into'
    },
    {
      id: 'e8',
      source: 'vctp-think',
      target: 'vctp-confirm',
      ...edgeStyle,
      label: 'generates'
    },
    {
      id: 'e9',
      source: 'vctp-confirm',
      target: 'vctp-think',
      ...edgeStyle,
      label: 'refines',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },

    // Visual perception drives attention mechanisms
    {
      id: 'e10',
      source: 'visual-perception',
      target: 'attention-extraction',
      ...edgeStyle,
      label: 'initiates'
    },
    {
      id: 'e11',
      source: 'logical-reasoning',
      target: 'attention-computation',
      ...edgeStyle,
      label: 'guides'
    },
    {
      id: 'e12',
      source: 'cross-modal-integration',
      target: 'attention-aggregation',
      ...edgeStyle,
      label: 'coordinates'
    },

    // Attention mechanism flow
    {
      id: 'e13',
      source: 'attention-extraction',
      target: 'attention-computation',
      ...edgeStyle,
      label: 'provides features'
    },
    {
      id: 'e14',
      source: 'attention-computation',
      target: 'attention-aggregation',
      ...edgeStyle,
      label: 'weights'
    },

    // VCTP and attention enable applications
    {
      id: 'e15',
      source: 'vctp-confirm',
      target: 'medical-imaging',
      ...edgeStyle,
      label: 'supports'
    },
    {
      id: 'e16',
      source: 'vctp-think',
      target: 'scene-understanding',
      ...edgeStyle,
      label: 'powers'
    },
    {
      id: 'e17',
      source: 'attention-aggregation',
      target: 'document-analysis',
      ...edgeStyle,
      label: 'enables'
    },

    // Cross-connections between components
    {
      id: 'e18',
      source: 'vctp-see',
      target: 'attention-extraction',
      ...edgeStyle,
      label: 'synchronizes'
    },
    {
      id: 'e19',
      source: 'attention-computation',
      target: 'vctp-think',
      ...edgeStyle,
      label: 'enhances'
    },
    {
      id: 'e20',
      source: 'attention-aggregation',
      target: 'scene-understanding',
      ...edgeStyle,
      label: 'supports'
    },
    {
      id: 'e21',
      source: 'vctp-confirm',
      target: 'document-analysis',
      ...edgeStyle,
      label: 'validates'
    },

    // Applications drive performance and business impact
    {
      id: 'e22',
      source: 'medical-imaging',
      target: 'performance-metrics',
      ...edgeStyle,
      label: 'demonstrates'
    },
    {
      id: 'e23',
      source: 'scene-understanding',
      target: 'performance-metrics',
      ...edgeStyle,
      label: 'proves'
    },
    {
      id: 'e24',
      source: 'document-analysis',
      target: 'performance-metrics',
      ...edgeStyle,
      label: 'validates'
    },
    {
      id: 'e25',
      source: 'performance-metrics',
      target: 'business-impact',
      ...edgeStyle,
      label: 'drives'
    },

    // Impact validates principle
    {
      id: 'e26',
      source: 'business-impact',
      target: 'visual-reasoning-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e27',
      source: 'performance-metrics',
      target: 'visual-reasoning-principle',
      ...edgeStyle,
      label: 'proves',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Visual Reasoning Challenge",
      description: "AI systems need to combine visual perception with logical reasoning to understand complex visual scenes, analyze spatial and temporal relationships, and generate accurate explanations. Traditional computer vision focuses on recognition, but modern applications require deeper understanding and reasoning capabilities.",
      activeNodes: ['visual-reasoning-challenge'],
      activeEdges: []
    },
    {
      title: "Core Reasoning Components",
      description: "Visual reasoning requires three fundamental components: visual perception for scene understanding and object recognition with 88% accuracy, logical reasoning for step-by-step analysis and pattern recognition, and cross-modal integration for vision-language fusion using multimodal transformers.",
      activeNodes: ['visual-perception', 'logical-reasoning', 'cross-modal-integration'],
      activeEdges: ['e1', 'e2', 'e3']
    },
    {
      title: "Visual Chain-of-Thought (VCTP) Process",
      description: "Core components implement the VCTP methodology: See stage uses visual perception for object detection and concept grounding, Think stage applies logical reasoning with adaptive attention and LLM reasoning chains, Confirm stage leverages cross-modal integration for verification and iterative refinement.",
      activeNodes: ['vctp-see', 'vctp-think', 'vctp-confirm'],
      activeEdges: ['e4', 'e5', 'e6', 'e7', 'e8', 'e9']
    },
    {
      title: "Visual Attention Mechanisms",
      description: "Parallel to VCTP, sophisticated attention mechanisms process visual information: feature extraction creates multi-scale CNN feature maps, attention computation uses query-based and self-attention for dynamic focus, and weighted aggregation performs attention-weighted feature fusion for task-specific decoding.",
      activeNodes: ['attention-extraction', 'attention-computation', 'attention-aggregation'],
      activeEdges: ['e10', 'e11', 'e12', 'e13', 'e14', 'e18', 'e19']
    },
    {
      title: "Real-World Applications",
      description: "VCTP and attention mechanisms enable diverse applications: medical imaging for diagnostic reasoning and clinical decision support, scene understanding for traffic safety and autonomous navigation, and document analysis for chart interpretation and scientific paper analysis. Cross-connections ensure robust performance across domains.",
      activeNodes: ['medical-imaging', 'scene-understanding', 'document-analysis'],
      activeEdges: ['e15', 'e16', 'e17', 'e20', 'e21']
    },
    {
      title: "Performance and Business Impact",
      description: "Applications demonstrate significant improvements: accuracy increased from 46.4% to 78% for GPT-4V, 35% faster medical diagnosis, and 92% explainability scores. These performance gains drive business impact including $12B healthcare AI market, 60% diagnostic efficiency gains, and 25% cost reduction.",
      activeNodes: ['performance-metrics', 'business-impact'],
      activeEdges: ['e22', 'e23', 'e24', 'e25']
    },
    {
      title: "Visual Reasoning Principle Validation",
      description: "Performance metrics and business impact validate core principles: systematic See-Think-Confirm methodology enables transparent reasoning, multimodal integration with attention mechanisms achieves robust understanding, and iterative verification ensures accuracy and explainability in real-world applications.",
      activeNodes: ['visual-reasoning-principle'],
      activeEdges: ['e26', 'e27']
    }
  ],
  metadata: {
    category: 'Computer Vision',
    complexity: 'Advanced',
    estimatedReadTime: '12 minutes',
    tags: ['Visual Reasoning', 'Computer Vision', 'Multimodal AI', 'Visual Chain-of-Thought', 'Attention Mechanisms', 'Medical Imaging', 'Scene Understanding', 'Document Analysis'],
    lastUpdated: '2024-03-20',
    version: '1.0',
    author: 'Visual Reasoning Research Team',
    references: [
      'Visual Chain-of-Thought Prompting for Knowledge-based Visual Reasoning (AAAI 2024)',
      'Attention Is All You Need (Transformer Architecture)',
      'CLIP: Learning Transferable Visual Representations',
      'BLIP: Bootstrapping Language-Image Pre-training',
      'Visual Question Answering: Datasets, Algorithms, and Future Challenges',
      'Multimodal Machine Learning: A Survey and Taxonomy',
      'Visual Reasoning in Real-World Scenarios',
      'Cross-Modal Attention for Vision-Language Tasks'
    ]
  }
};