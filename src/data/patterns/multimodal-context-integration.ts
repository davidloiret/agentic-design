import { PatternScenario } from './types';

export const multimodalContextIntegrationPattern: PatternScenario = {
  id: 'multimodal-context-integration',
  title: 'Multimodal Context Integration',
  description: 'Seamlessly integrate and process multiple data modalities (text, images, audio, video) within a unified contextual framework for enhanced AI reasoning and response generation.',
  steps: [
    {
      id: 'input-analysis',
      title: 'Multimodal Input Analysis',
      description: 'System receives and analyzes inputs across multiple modalities',
      input: 'Text query + Image + Audio clip',
      output: 'Modality-specific feature vectors and metadata',
      activeNodes: ['input-processor', 'text-analyzer', 'vision-analyzer', 'audio-analyzer'],
      activeEdges: ['input-to-text', 'input-to-vision', 'input-to-audio']
    },
    {
      id: 'cross-modal-alignment',
      title: 'Cross-Modal Semantic Alignment',
      description: 'Align semantic concepts across different modalities using shared embedding space',
      input: 'Individual modality features',
      output: 'Aligned multimodal embeddings',
      activeNodes: ['text-analyzer', 'vision-analyzer', 'audio-analyzer', 'alignment-engine'],
      activeEdges: ['text-to-alignment', 'vision-to-alignment', 'audio-to-alignment']
    },
    {
      id: 'context-fusion',
      title: 'Context Fusion & Integration',
      description: 'Fuse aligned modality features into unified contextual representation',
      input: 'Aligned multimodal embeddings',
      output: 'Fused multimodal context vector',
      activeNodes: ['alignment-engine', 'fusion-processor', 'context-integrator'],
      activeEdges: ['alignment-to-fusion', 'fusion-to-context']
    },
    {
      id: 'attention-mechanism',
      title: 'Multimodal Attention Weighting',
      description: 'Apply attention mechanisms to weight the importance of each modality for the current task',
      input: 'Fused context + Task requirements',
      output: 'Attention-weighted multimodal representation',
      activeNodes: ['context-integrator', 'attention-module', 'task-analyzer'],
      activeEdges: ['context-to-attention', 'task-to-attention']
    },
    {
      id: 'cross-modal-reasoning',
      title: 'Cross-Modal Reasoning',
      description: 'Perform reasoning that leverages insights from multiple modalities simultaneously',
      input: 'Weighted multimodal representation',
      output: 'Cross-modal inferences and insights',
      activeNodes: ['attention-module', 'reasoning-engine', 'inference-generator'],
      activeEdges: ['attention-to-reasoning', 'reasoning-to-inference']
    },
    {
      id: 'response-generation',
      title: 'Multimodal Response Generation',
      description: 'Generate responses that can include multiple output modalities based on context',
      input: 'Cross-modal inferences + Output requirements',
      output: 'Text response + Visual elements + Audio cues',
      activeNodes: ['inference-generator', 'response-synthesizer', 'multimodal-output'],
      activeEdges: ['inference-to-synthesizer', 'synthesizer-to-output']
    }
  ],
  initialNodes: [
    {
      id: 'input-processor',
      type: 'input',
      position: { x: 50, y: 100 },
      data: {
        label: 'Multimodal Input Processor',
        description: 'Receives and routes different input modalities',
        type: 'processor',
        status: 'idle'
      }
    },
    {
      id: 'text-analyzer',
      type: 'default',
      position: { x: 250, y: 50 },
      data: {
        label: 'Text Analysis Engine',
        description: 'NLP processing and semantic understanding',
        type: 'analyzer',
        status: 'idle'
      }
    },
    {
      id: 'vision-analyzer',
      type: 'default',
      position: { x: 250, y: 120 },
      data: {
        label: 'Vision Analysis Engine',
        description: 'Computer vision and image understanding',
        type: 'analyzer',
        status: 'idle'
      }
    },
    {
      id: 'audio-analyzer',
      type: 'default',
      position: { x: 250, y: 190 },
      data: {
        label: 'Audio Analysis Engine',
        description: 'Speech recognition and audio processing',
        type: 'analyzer',
        status: 'idle'
      }
    },
    {
      id: 'alignment-engine',
      type: 'default',
      position: { x: 450, y: 120 },
      data: {
        label: 'Cross-Modal Alignment',
        description: 'Aligns semantic concepts across modalities',
        type: 'processor',
        status: 'idle'
      }
    },
    {
      id: 'fusion-processor',
      type: 'default',
      position: { x: 650, y: 120 },
      data: {
        label: 'Context Fusion Engine',
        description: 'Integrates aligned multimodal features',
        type: 'processor',
        status: 'idle'
      }
    },
    {
      id: 'context-integrator',
      type: 'default',
      position: { x: 850, y: 120 },
      data: {
        label: 'Context Integrator',
        description: 'Creates unified contextual representation',
        type: 'integrator',
        status: 'idle'
      }
    },
    {
      id: 'task-analyzer',
      type: 'default',
      position: { x: 850, y: 50 },
      data: {
        label: 'Task Requirements Analyzer',
        description: 'Analyzes task-specific modality requirements',
        type: 'analyzer',
        status: 'idle'
      }
    },
    {
      id: 'attention-module',
      type: 'default',
      position: { x: 1050, y: 120 },
      data: {
        label: 'Multimodal Attention',
        description: 'Weights modality importance dynamically',
        type: 'attention',
        status: 'idle'
      }
    },
    {
      id: 'reasoning-engine',
      type: 'default',
      position: { x: 1250, y: 120 },
      data: {
        label: 'Cross-Modal Reasoning',
        description: 'Performs multimodal inference and reasoning',
        type: 'reasoning',
        status: 'idle'
      }
    },
    {
      id: 'inference-generator',
      type: 'default',
      position: { x: 1450, y: 120 },
      data: {
        label: 'Inference Generator',
        description: 'Generates insights from multimodal analysis',
        type: 'generator',
        status: 'idle'
      }
    },
    {
      id: 'response-synthesizer',
      type: 'default',
      position: { x: 1650, y: 120 },
      data: {
        label: 'Response Synthesizer',
        description: 'Creates coherent multimodal responses',
        type: 'synthesizer',
        status: 'idle'
      }
    },
    {
      id: 'multimodal-output',
      type: 'output',
      position: { x: 1850, y: 120 },
      data: {
        label: 'Multimodal Output',
        description: 'Delivers text, visual, and audio responses',
        type: 'output',
        status: 'idle'
      }
    }
  ],
  initialEdges: [
    {
      id: 'input-to-text',
      source: 'input-processor',
      target: 'text-analyzer',
      type: 'smoothstep',
      label: 'text data'
    },
    {
      id: 'input-to-vision',
      source: 'input-processor',
      target: 'vision-analyzer',
      type: 'smoothstep',
      label: 'visual data'
    },
    {
      id: 'input-to-audio',
      source: 'input-processor',
      target: 'audio-analyzer',
      type: 'smoothstep',
      label: 'audio data'
    },
    {
      id: 'text-to-alignment',
      source: 'text-analyzer',
      target: 'alignment-engine',
      type: 'smoothstep',
      label: 'text features'
    },
    {
      id: 'vision-to-alignment',
      source: 'vision-analyzer',
      target: 'alignment-engine',
      type: 'smoothstep',
      label: 'visual features'
    },
    {
      id: 'audio-to-alignment',
      source: 'audio-analyzer',
      target: 'alignment-engine',
      type: 'smoothstep',
      label: 'audio features'
    },
    {
      id: 'alignment-to-fusion',
      source: 'alignment-engine',
      target: 'fusion-processor',
      type: 'smoothstep',
      label: 'aligned embeddings'
    },
    {
      id: 'fusion-to-context',
      source: 'fusion-processor',
      target: 'context-integrator',
      type: 'smoothstep',
      label: 'fused context'
    },
    {
      id: 'context-to-attention',
      source: 'context-integrator',
      target: 'attention-module',
      type: 'smoothstep',
      label: 'context vector'
    },
    {
      id: 'task-to-attention',
      source: 'task-analyzer',
      target: 'attention-module',
      type: 'smoothstep',
      label: 'task requirements'
    },
    {
      id: 'attention-to-reasoning',
      source: 'attention-module',
      target: 'reasoning-engine',
      type: 'smoothstep',
      label: 'weighted representation'
    },
    {
      id: 'reasoning-to-inference',
      source: 'reasoning-engine',
      target: 'inference-generator',
      type: 'smoothstep',
      label: 'reasoning results'
    },
    {
      id: 'inference-to-synthesizer',
      source: 'inference-generator',
      target: 'response-synthesizer',
      type: 'smoothstep',
      label: 'inferences'
    },
    {
      id: 'synthesizer-to-output',
      source: 'response-synthesizer',
      target: 'multimodal-output',
      type: 'smoothstep',
      label: 'synthesized response'
    }
  ]
};