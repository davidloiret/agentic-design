export interface VisualReasoningPattern {
  id: string;
  title: string;
  description: string;
  category: 'perception' | 'analysis' | 'synthesis' | 'evaluation';
  complexity: 'basic' | 'intermediate' | 'advanced';
  icon: string;
  steps: VisualReasoningStep[];
  scenarios: VisualScenario[];
  keyTechniques: string[];
  applications: string[];
  advantages: string[];
  limitations: string[];
  relatedPatterns: string[];
}

export interface VisualReasoningStep {
  id: string;
  title: string;
  description: string;
  type: 'see' | 'think' | 'confirm' | 'process' | 'validate';
  input?: string;
  output?: string;
  techniques: string[];
  activeNodes: string[];
  activeEdges: string[];
  duration: number;
}

export interface VisualScenario {
  id: string;
  title: string;
  description: string;
  imageInput: string;
  question: string;
  expectedOutput: string;
  reasoning: string[];
  complexity: 'simple' | 'moderate' | 'complex';
}

export const visualChainOfThoughtPattern: VisualReasoningPattern = {
  id: 'visual-chain-of-thought',
  title: 'Visual Chain-of-Thought (VCTP)',
  description: 'A multimodal reasoning approach that combines visual perception with step-by-step logical reasoning for complex visual understanding tasks.',
  category: 'analysis',
  complexity: 'advanced',
  icon: '🧠',
  steps: [
    {
      id: 'see-stage',
      title: 'See Stage',
      description: 'Scan the image and ground visual concept candidates with visual perception model',
      type: 'see',
      input: 'Raw visual input (image/video)',
      output: 'Visual concepts and object detections',
      techniques: ['Object Detection', 'Scene Parsing', 'Visual Grounding'],
      activeNodes: ['visual-input', 'perception-model'],
      activeEdges: ['input-to-perception'],
      duration: 1000
    },
    {
      id: 'think-stage',
      title: 'Think Stage',
      description: 'Attend to key visual concepts adaptively and transform visual context into text context for LLM reasoning',
      type: 'think',
      input: 'Visual concepts + Natural language question',
      output: 'Intermediate reasoning steps and preliminary answer',
      techniques: ['Visual Attention', 'Visual Captioning', 'LLM Reasoning'],
      activeNodes: ['perception-model', 'attention-mechanism', 'llm-reasoning'],
      activeEdges: ['perception-to-attention', 'attention-to-llm'],
      duration: 1500
    },
    {
      id: 'confirm-stage',
      title: 'Confirm Stage',
      description: 'Generate supporting rationale and verify consistency with visual context using cross-modality classifier',
      type: 'confirm',
      input: 'Answer + Visual context',
      output: 'Verified answer with supporting rationale',
      techniques: ['Rationale Generation', 'Cross-modal Verification', 'Consistency Checking'],
      activeNodes: ['llm-reasoning', 'cross-modal-verifier', 'output'],
      activeEdges: ['llm-to-verifier', 'verifier-to-output'],
      duration: 1200
    },
    {
      id: 'iteration',
      title: 'Iterative Refinement',
      description: 'Iterate through think-confirm stages until verified rationale is consistent with answer',
      type: 'validate',
      input: 'Verification feedback',
      output: 'Final verified answer with complete reasoning chain',
      techniques: ['Iterative Refinement', 'Feedback Integration', 'Quality Control'],
      activeNodes: ['cross-modal-verifier', 'llm-reasoning', 'output'],
      activeEdges: ['feedback-loop', 'verification-loop'],
      duration: 1000
    }
  ],
  scenarios: [
    {
      id: 'scene-analysis',
      title: 'Complex Scene Analysis',
      description: 'Analyzing a busy street scene with multiple objects and activities',
      imageInput: 'Street scene with cars, pedestrians, traffic lights, and buildings',
      question: 'What safety concerns can you identify in this traffic scene?',
      expectedOutput: 'Multiple safety concerns identified with spatial reasoning and causal analysis',
      reasoning: [
        'Detect vehicles, pedestrians, and traffic infrastructure',
        'Analyze spatial relationships and movement patterns',
        'Identify potential collision points and safety violations',
        'Generate comprehensive safety assessment with supporting evidence'
      ],
      complexity: 'complex'
    },
    {
      id: 'medical-image',
      title: 'Medical Image Diagnosis',
      description: 'Analyzing medical imaging for diagnostic insights',
      imageInput: 'X-ray or MRI scan showing anatomical structures',
      question: 'What abnormalities or concerns are visible in this medical image?',
      expectedOutput: 'Systematic analysis of anatomical features with diagnostic reasoning',
      reasoning: [
        'Identify anatomical structures and landmarks',
        'Compare with normal anatomical patterns',
        'Detect anomalies or concerning features',
        'Provide diagnostic reasoning with evidence'
      ],
      complexity: 'complex'
    },
    {
      id: 'chart-analysis',
      title: 'Data Visualization Reasoning',
      description: 'Understanding trends and insights from complex charts and graphs',
      imageInput: 'Multi-line graph showing business metrics over time',
      question: 'What trends and correlations can you identify in this data?',
      expectedOutput: 'Comprehensive analysis of data patterns with statistical insights',
      reasoning: [
        'Parse chart elements (axes, labels, data points)',
        'Identify trends, patterns, and correlations',
        'Calculate statistical relationships',
        'Generate insights with supporting evidence'
      ],
      complexity: 'moderate'
    }
  ],
  keyTechniques: [
    'Visual Perception Modeling',
    'Cross-modal Attention',
    'Step-by-step Reasoning',
    'Iterative Verification',
    'Visual Grounding',
    'Rationale Generation'
  ],
  applications: [
    'Medical Image Analysis',
    'Visual Question Answering',
    'Scene Understanding',
    'Document Analysis',
    'Scientific Image Interpretation',
    'Safety Assessment'
  ],
  advantages: [
    'Transparent reasoning process',
    'High accuracy on complex visual tasks',
    'Explainable AI outputs',
    'Iterative verification reduces errors',
    'Combines strengths of vision and language models'
  ],
  limitations: [
    'Computationally expensive due to multiple stages',
    'Requires high-quality visual perception models',
    'May struggle with ambiguous visual contexts',
    'Limited by quality of visual captioning'
  ],
  relatedPatterns: [
    'multimodal-rag',
    'visual-attention-mechanisms',
    'cross-modal-reasoning'
  ]
};

export const visualAttentionPattern: VisualReasoningPattern = {
  id: 'visual-attention-mechanisms',
  title: 'Visual Attention Mechanisms',
  description: 'Dynamic attention systems that focus on relevant visual regions for improved reasoning and interpretation.',
  category: 'perception',
  complexity: 'intermediate',
  icon: '👁️',
  steps: [
    {
      id: 'feature-extraction',
      title: 'Feature Extraction',
      description: 'Extract visual features from different regions of the input image',
      type: 'process',
      input: 'Raw image input',
      output: 'Feature maps and regional representations',
      techniques: ['CNN Feature Extraction', 'Spatial Feature Maps', 'Multi-scale Processing'],
      activeNodes: ['image-input', 'feature-extractor'],
      activeEdges: ['input-to-features'],
      duration: 800
    },
    {
      id: 'attention-computation',
      title: 'Attention Weight Computation',
      description: 'Calculate attention scores for different visual regions based on query context',
      type: 'think',
      input: 'Visual features + Query/Task context',
      output: 'Attention weights for each region',
      techniques: ['Spatial Attention', 'Channel Attention', 'Self-Attention', 'Cross-Attention'],
      activeNodes: ['feature-extractor', 'attention-calculator', 'query-encoder'],
      activeEdges: ['features-to-attention', 'query-to-attention'],
      duration: 1000
    },
    {
      id: 'weighted-aggregation',
      title: 'Weighted Feature Aggregation',
      description: 'Combine visual features based on computed attention weights',
      type: 'process',
      input: 'Features + Attention weights',
      output: 'Attended visual representation',
      techniques: ['Weighted Averaging', 'Feature Fusion', 'Dynamic Pooling'],
      activeNodes: ['attention-calculator', 'feature-aggregator'],
      activeEdges: ['attention-to-aggregation'],
      duration: 600
    },
    {
      id: 'reasoning-integration',
      title: 'Reasoning Integration',
      description: 'Integrate attended visual features with reasoning module for final output',
      type: 'think',
      input: 'Attended features + Task requirements',
      output: 'Task-specific visual reasoning output',
      techniques: ['Multi-modal Fusion', 'Contextual Reasoning', 'Task-specific Decoding'],
      activeNodes: ['feature-aggregator', 'reasoning-module', 'output-decoder'],
      activeEdges: ['aggregation-to-reasoning', 'reasoning-to-output'],
      duration: 1200
    }
  ],
  scenarios: [
    {
      id: 'object-localization',
      title: 'Object Localization in Cluttered Scenes',
      description: 'Finding specific objects in complex, cluttered environments',
      imageInput: 'Cluttered room with many objects',
      question: 'Where is the red coffee mug in this image?',
      expectedOutput: 'Precise localization with attention heatmap showing focused regions',
      reasoning: [
        'Process entire image with CNN features',
        'Compute attention weights based on "red coffee mug" query',
        'Focus on high-attention regions',
        'Localize object with bounding box'
      ],
      complexity: 'moderate'
    },
    {
      id: 'fine-grained-classification',
      title: 'Fine-grained Visual Classification',
      description: 'Distinguishing between similar-looking categories',
      imageInput: 'Images of different bird species',
      question: 'What specific species of bird is shown in this image?',
      expectedOutput: 'Species identification with attention on discriminative features',
      reasoning: [
        'Extract fine-grained visual features',
        'Attend to species-specific characteristics (beak, plumage, size)',
        'Compare with learned species patterns',
        'Classify with confidence and explanation'
      ],
      complexity: 'complex'
    }
  ],
  keyTechniques: [
    'Spatial Attention Maps',
    'Channel-wise Attention',
    'Multi-head Attention',
    'Cross-modal Attention',
    'Hierarchical Attention',
    'Dynamic Attention Routing'
  ],
  applications: [
    'Object Detection and Localization',
    'Image Captioning',
    'Visual Question Answering',
    'Medical Image Analysis',
    'Autonomous Driving',
    'Document Understanding'
  ],
  advantages: [
    'Improved focus on relevant visual information',
    'Better performance in complex scenes',
    'Interpretable attention maps',
    'Efficient processing of large images',
    'Adaptable to different tasks'
  ],
  limitations: [
    'May miss important but low-attention regions',
    'Computationally intensive for high-resolution images',
    'Attention can be noisy or inconsistent',
    'Requires careful tuning for optimal performance'
  ],
  relatedPatterns: [
    'visual-chain-of-thought',
    'multimodal-context-integration',
    'hierarchical-visual-processing'
  ]
};

export const multimodalReasoningPattern: VisualReasoningPattern = {
  id: 'multimodal-reasoning-synthesis',
  title: 'Multimodal Reasoning Synthesis',
  description: 'Comprehensive integration of visual, textual, and contextual information for complex reasoning tasks.',
  category: 'synthesis',
  complexity: 'advanced',
  icon: '🔗',
  steps: [
    {
      id: 'modality-encoding',
      title: 'Multi-Modal Encoding',
      description: 'Encode different input modalities (visual, text, audio) into unified representation space',
      type: 'process',
      input: 'Multi-modal inputs (image, text, metadata)',
      output: 'Aligned modal representations',
      techniques: ['Vision Transformer', 'Text Encoder', 'Cross-modal Alignment', 'Shared Embedding Space'],
      activeNodes: ['visual-encoder', 'text-encoder', 'alignment-module'],
      activeEdges: ['visual-to-alignment', 'text-to-alignment'],
      duration: 1000
    },
    {
      id: 'cross-modal-fusion',
      title: 'Cross-Modal Fusion',
      description: 'Fuse information across modalities using attention-based mechanisms',
      type: 'think',
      input: 'Aligned modal representations',
      output: 'Fused multimodal representation',
      techniques: ['Cross-Attention', 'Modal Fusion Networks', 'Transformer Fusion', 'Gated Fusion'],
      activeNodes: ['alignment-module', 'fusion-transformer', 'modal-gates'],
      activeEdges: ['alignment-to-fusion', 'fusion-internal'],
      duration: 1500
    },
    {
      id: 'reasoning-synthesis',
      title: 'Reasoning Synthesis',
      description: 'Perform complex reasoning over fused multimodal representations',
      type: 'think',
      input: 'Fused representation + Task context',
      output: 'Structured reasoning output',
      techniques: ['Logical Reasoning', 'Causal Inference', 'Temporal Reasoning', 'Spatial Reasoning'],
      activeNodes: ['fusion-transformer', 'reasoning-engine', 'knowledge-base'],
      activeEdges: ['fusion-to-reasoning', 'knowledge-integration'],
      duration: 2000
    },
    {
      id: 'output-generation',
      title: 'Multi-Modal Output Generation',
      description: 'Generate appropriate outputs in multiple modalities with explanations',
      type: 'process',
      input: 'Reasoning results + Output requirements',
      output: 'Multi-modal response with explanations',
      techniques: ['Text Generation', 'Visual Annotation', 'Explanation Generation', 'Output Formatting'],
      activeNodes: ['reasoning-engine', 'text-generator', 'visual-annotator', 'explanation-module'],
      activeEdges: ['reasoning-to-generators', 'explanation-links'],
      duration: 1200
    }
  ],
  scenarios: [
    {
      id: 'scientific-analysis',
      title: 'Scientific Paper Analysis',
      description: 'Analyzing scientific papers with figures, charts, and complex text',
      imageInput: 'Scientific paper with graphs, equations, and figures',
      question: 'Summarize the key findings and methodology of this research',
      expectedOutput: 'Comprehensive analysis integrating textual content and visual elements',
      reasoning: [
        'Parse text content for methodology and conclusions',
        'Analyze figures and charts for data insights',
        'Integrate visual and textual information',
        'Generate comprehensive summary with supporting evidence'
      ],
      complexity: 'complex'
    },
    {
      id: 'document-qa',
      title: 'Document Question Answering',
      description: 'Answering questions about complex documents with mixed content',
      imageInput: 'Business report with charts, tables, and text',
      question: 'What are the main factors contributing to the revenue decline shown in Q3?',
      expectedOutput: 'Evidence-based answer combining textual analysis and chart interpretation',
      reasoning: [
        'Locate relevant text sections about Q3 performance',
        'Analyze charts showing revenue trends',
        'Identify correlation between factors and decline',
        'Synthesize multimodal evidence into coherent answer'
      ],
      complexity: 'complex'
    }
  ],
  keyTechniques: [
    'Cross-Modal Transformers',
    'Multimodal Fusion Networks',
    'Attention-based Integration',
    'Knowledge Graph Integration',
    'Reasoning Chain Generation',
    'Evidence Aggregation'
  ],
  applications: [
    'Scientific Document Analysis',
    'Medical Report Understanding',
    'Educational Content Processing',
    'Legal Document Review',
    'Technical Manual Understanding',
    'News Article Analysis'
  ],
  advantages: [
    'Comprehensive understanding across modalities',
    'Rich contextual reasoning capabilities',
    'Handles complex real-world documents',
    'Provides explainable reasoning chains',
    'Scalable to multiple input types'
  ],
  limitations: [
    'High computational requirements',
    'Complex architecture and training',
    'Requires large multimodal datasets',
    'Potential for modal dominance issues',
    'Challenging to debug and interpret'
  ],
  relatedPatterns: [
    'visual-chain-of-thought',
    'document-understanding',
    'knowledge-integration'
  ]
};

export const visualReasoningPatterns = [
  visualChainOfThoughtPattern,
  visualAttentionPattern,
  multimodalReasoningPattern
];

export default visualReasoningPatterns;