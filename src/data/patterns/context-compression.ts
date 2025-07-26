import { PatternScenario } from './types';

export const contextCompressionPattern: PatternScenario = {
  id: 'context-compression',
  title: 'Context Compression',
  description: 'Efficient storage and retrieval of contextual information through compression techniques with semantic preservation',
  steps: [
    {
      id: 'input-analysis',
      title: 'Input Analysis & Preparation',
      description: 'Analyze input context and prepare for compression processing',
      input: 'Raw contextual information, conversation history, or document content',
      output: 'Analyzed context with metadata and structure identification',
      activeNodes: ['context-input', 'content-analyzer', 'structure-detector', 'metadata-extractor'],
      activeEdges: ['input-to-analyzer', 'analyzer-to-structure', 'analyzer-to-metadata', 'structure-to-metadata']
    },
    {
      id: 'semantic-analysis',
      title: 'Semantic Analysis & Key Information Extraction',
      description: 'Identify key concepts, relationships, and semantic structures',
      input: 'Structured context with identified components',
      output: 'Semantic graph with key concepts and relationship mappings',
      activeNodes: ['semantic-processor', 'concept-extractor', 'relationship-mapper', 'importance-scorer'],
      activeEdges: ['metadata-to-semantic', 'semantic-to-concept', 'semantic-to-relationship', 'concept-to-importance']
    },
    {
      id: 'compression-strategy',
      title: 'Compression Strategy Selection',
      description: 'Choose optimal compression approach based on content type and requirements',
      input: 'Semantic analysis and compression requirements',
      output: 'Selected compression strategy and parameters',
      activeNodes: ['strategy-selector', 'lossy-compressor', 'lossless-compressor', 'hybrid-compressor'],
      activeEdges: ['importance-to-strategy', 'strategy-to-lossy', 'strategy-to-lossless', 'strategy-to-hybrid']
    },
    {
      id: 'information-distillation',
      title: 'Information Distillation Process',
      description: 'Extract and preserve essential information while removing redundancy',
      input: 'Raw context and compression strategy',
      output: 'Distilled information with preserved semantics',
      activeNodes: ['distillation-engine', 'redundancy-remover', 'essence-extractor', 'quality-monitor'],
      activeEdges: ['hybrid-to-distillation', 'distillation-to-redundancy', 'distillation-to-essence', 'essence-to-quality']
    },
    {
      id: 'context-encoding',
      title: 'Context Encoding & Representation',
      description: 'Encode compressed context into efficient storage format',
      input: 'Distilled information and quality metrics',
      output: 'Encoded compressed context with reconstruction metadata',
      activeNodes: ['context-encoder', 'format-optimizer', 'compression-validator', 'reconstruction-metadata'],
      activeEdges: ['quality-to-encoder', 'encoder-to-format', 'encoder-to-validator', 'format-to-reconstruction']
    },
    {
      id: 'storage-optimization',
      title: 'Storage & Retrieval Optimization',
      description: 'Optimize compressed context for storage and efficient retrieval',
      input: 'Encoded context with reconstruction data',
      output: 'Optimized compressed context ready for storage',
      activeNodes: ['storage-optimizer', 'index-builder', 'retrieval-enhancer', 'access-controller'],
      activeEdges: ['reconstruction-to-storage', 'storage-to-index', 'storage-to-retrieval', 'index-to-access']
    },
    {
      id: 'reconstruction-validation',
      title: 'Context Reconstruction & Validation',
      description: 'Validate compression quality through reconstruction testing',
      input: 'Compressed context and original reference',
      output: 'Quality metrics and validated compressed context',
      activeNodes: ['reconstruction-engine', 'quality-assessor', 'fidelity-checker', 'output-validator'],
      activeEdges: ['access-to-reconstruction', 'reconstruction-to-quality', 'reconstruction-to-fidelity', 'quality-to-output']
    }
  ],
  initialNodes: [
    {
      id: 'context-input',
      type: 'input',
      position: { x: 50, y: 100 },
      data: {
        label: 'Context Input',
        description: 'Raw contextual information to be compressed',
        type: 'input',
        status: 'idle'
      }
    },
    {
      id: 'content-analyzer',
      type: 'default',
      position: { x: 250, y: 100 },
      data: {
        label: 'Content Analyzer',
        description: 'Analyzes content type, structure, and characteristics',
        type: 'analyzer',
        status: 'idle'
      }
    },
    {
      id: 'structure-detector',
      type: 'default',
      position: { x: 450, y: 50 },
      data: {
        label: 'Structure Detector',
        description: 'Identifies structural patterns and organization',
        type: 'detector',
        status: 'idle'
      }
    },
    {
      id: 'metadata-extractor',
      type: 'default',
      position: { x: 450, y: 150 },
      data: {
        label: 'Metadata Extractor',
        description: 'Extracts contextual metadata and properties',
        type: 'extractor',
        status: 'idle'
      }
    },
    {
      id: 'semantic-processor',
      type: 'default',
      position: { x: 150, y: 250 },
      data: {
        label: 'Semantic Processor',
        description: 'Processes semantic meaning and relationships',
        type: 'processor',
        status: 'idle'
      }
    },
    {
      id: 'concept-extractor',
      type: 'default',
      position: { x: 350, y: 250 },
      data: {
        label: 'Concept Extractor',
        description: 'Extracts key concepts and entities',
        type: 'extractor',
        status: 'idle'
      }
    },
    {
      id: 'relationship-mapper',
      type: 'default',
      position: { x: 550, y: 250 },
      data: {
        label: 'Relationship Mapper',
        description: 'Maps relationships between concepts',
        type: 'mapper',
        status: 'idle'
      }
    },
    {
      id: 'importance-scorer',
      type: 'default',
      position: { x: 750, y: 250 },
      data: {
        label: 'Importance Scorer',
        description: 'Scores importance of different elements',
        type: 'scorer',
        status: 'idle'
      }
    },
    {
      id: 'strategy-selector',
      type: 'default',
      position: { x: 100, y: 400 },
      data: {
        label: 'Strategy Selector',
        description: 'Selects optimal compression strategy',
        type: 'selector',
        status: 'idle'
      }
    },
    {
      id: 'lossy-compressor',
      type: 'default',
      position: { x: 300, y: 350 },
      data: {
        label: 'Lossy Compressor',
        description: 'Applies lossy compression techniques',
        type: 'compressor',
        status: 'idle'
      }
    },
    {
      id: 'lossless-compressor',
      type: 'default',
      position: { x: 300, y: 400 },
      data: {
        label: 'Lossless Compressor',
        description: 'Applies lossless compression techniques',
        type: 'compressor',
        status: 'idle'
      }
    },
    {
      id: 'hybrid-compressor',
      type: 'default',
      position: { x: 300, y: 450 },
      data: {
        label: 'Hybrid Compressor',
        description: 'Combines lossy and lossless approaches',
        type: 'compressor',
        status: 'idle'
      }
    },
    {
      id: 'distillation-engine',
      type: 'default',
      position: { x: 150, y: 550 },
      data: {
        label: 'Distillation Engine',
        description: 'Core engine for information distillation',
        type: 'engine',
        status: 'idle'
      }
    },
    {
      id: 'redundancy-remover',
      type: 'default',
      position: { x: 350, y: 550 },
      data: {
        label: 'Redundancy Remover',
        description: 'Removes redundant and duplicate information',
        type: 'remover',
        status: 'idle'
      }
    },
    {
      id: 'essence-extractor',
      type: 'default',
      position: { x: 550, y: 550 },
      data: {
        label: 'Essence Extractor',
        description: 'Extracts essential information core',
        type: 'extractor',
        status: 'idle'
      }
    },
    {
      id: 'quality-monitor',
      type: 'default',
      position: { x: 750, y: 550 },
      data: {
        label: 'Quality Monitor',
        description: 'Monitors compression quality in real-time',
        type: 'monitor',
        status: 'idle'
      }
    },
    {
      id: 'context-encoder',
      type: 'default',
      position: { x: 100, y: 700 },
      data: {
        label: 'Context Encoder',
        description: 'Encodes context into efficient format',
        type: 'encoder',
        status: 'idle'
      }
    },
    {
      id: 'format-optimizer',
      type: 'default',
      position: { x: 300, y: 700 },
      data: {
        label: 'Format Optimizer',
        description: 'Optimizes storage format and structure',
        type: 'optimizer',
        status: 'idle'
      }
    },
    {
      id: 'compression-validator',
      type: 'default',
      position: { x: 500, y: 700 },
      data: {
        label: 'Compression Validator',
        description: 'Validates compression integrity',
        type: 'validator',
        status: 'idle'
      }
    },
    {
      id: 'reconstruction-metadata',
      type: 'default',
      position: { x: 700, y: 700 },
      data: {
        label: 'Reconstruction Metadata',
        description: 'Generates metadata for reconstruction',
        type: 'metadata',
        status: 'idle'
      }
    },
    {
      id: 'storage-optimizer',
      type: 'default',
      position: { x: 150, y: 850 },
      data: {
        label: 'Storage Optimizer',
        description: 'Optimizes for storage efficiency',
        type: 'optimizer',
        status: 'idle'
      }
    },
    {
      id: 'index-builder',
      type: 'default',
      position: { x: 350, y: 850 },
      data: {
        label: 'Index Builder',
        description: 'Builds retrieval indices',
        type: 'builder',
        status: 'idle'
      }
    },
    {
      id: 'retrieval-enhancer',
      type: 'default',
      position: { x: 550, y: 850 },
      data: {
        label: 'Retrieval Enhancer',
        description: 'Enhances retrieval performance',
        type: 'enhancer',
        status: 'idle'
      }
    },
    {
      id: 'access-controller',
      type: 'default',
      position: { x: 750, y: 850 },
      data: {
        label: 'Access Controller',
        description: 'Controls access to compressed context',
        type: 'controller',
        status: 'idle'
      }
    },
    {
      id: 'reconstruction-engine',
      type: 'default',
      position: { x: 200, y: 1000 },
      data: {
        label: 'Reconstruction Engine',
        description: 'Reconstructs context from compressed form',
        type: 'engine',
        status: 'idle'
      }
    },
    {
      id: 'quality-assessor',
      type: 'default',
      position: { x: 400, y: 1000 },
      data: {
        label: 'Quality Assessor',
        description: 'Assesses reconstruction quality',
        type: 'assessor',
        status: 'idle'
      }
    },
    {
      id: 'fidelity-checker',
      type: 'default',
      position: { x: 600, y: 1000 },
      data: {
        label: 'Fidelity Checker',
        description: 'Checks semantic fidelity preservation',
        type: 'checker',
        status: 'idle'
      }
    },
    {
      id: 'output-validator',
      type: 'output',
      position: { x: 800, y: 1000 },
      data: {
        label: 'Output Validator',
        description: 'Final validation of compressed context',
        type: 'output',
        status: 'idle'
      }
    }
  ],
  initialEdges: [
    {
      id: 'input-to-analyzer',
      source: 'context-input',
      target: 'content-analyzer',
      type: 'smoothstep',
      label: 'raw context'
    },
    {
      id: 'analyzer-to-structure',
      source: 'content-analyzer',
      target: 'structure-detector',
      type: 'smoothstep',
      label: 'content analysis'
    },
    {
      id: 'analyzer-to-metadata',
      source: 'content-analyzer',
      target: 'metadata-extractor',
      type: 'smoothstep',
      label: 'content properties'
    },
    {
      id: 'structure-to-metadata',
      source: 'structure-detector',
      target: 'metadata-extractor',
      type: 'smoothstep',
      label: 'structural info'
    },
    {
      id: 'metadata-to-semantic',
      source: 'metadata-extractor',
      target: 'semantic-processor',
      type: 'smoothstep',
      label: 'enriched metadata'
    },
    {
      id: 'semantic-to-concept',
      source: 'semantic-processor',
      target: 'concept-extractor',
      type: 'smoothstep',
      label: 'semantic analysis'
    },
    {
      id: 'semantic-to-relationship',
      source: 'semantic-processor',
      target: 'relationship-mapper',
      type: 'smoothstep',
      label: 'semantic structure'
    },
    {
      id: 'concept-to-importance',
      source: 'concept-extractor',
      target: 'importance-scorer',
      type: 'smoothstep',
      label: 'extracted concepts'
    },
    {
      id: 'relationship-to-importance',
      source: 'relationship-mapper',
      target: 'importance-scorer',
      type: 'smoothstep',
      label: 'concept relationships'
    },
    {
      id: 'importance-to-strategy',
      source: 'importance-scorer',
      target: 'strategy-selector',
      type: 'smoothstep',
      label: 'importance scores'
    },
    {
      id: 'strategy-to-lossy',
      source: 'strategy-selector',
      target: 'lossy-compressor',
      type: 'smoothstep',
      label: 'lossy strategy'
    },
    {
      id: 'strategy-to-lossless',
      source: 'strategy-selector',
      target: 'lossless-compressor',
      type: 'smoothstep',
      label: 'lossless strategy'
    },
    {
      id: 'strategy-to-hybrid',
      source: 'strategy-selector',
      target: 'hybrid-compressor',
      type: 'smoothstep',
      label: 'hybrid strategy'
    },
    {
      id: 'lossy-to-distillation',
      source: 'lossy-compressor',
      target: 'distillation-engine',
      type: 'smoothstep',
      label: 'lossy output'
    },
    {
      id: 'lossless-to-distillation',
      source: 'lossless-compressor',
      target: 'distillation-engine',
      type: 'smoothstep',
      label: 'lossless output'
    },
    {
      id: 'hybrid-to-distillation',
      source: 'hybrid-compressor',
      target: 'distillation-engine',
      type: 'smoothstep',
      label: 'hybrid output'
    },
    {
      id: 'distillation-to-redundancy',
      source: 'distillation-engine',
      target: 'redundancy-remover',
      type: 'smoothstep',
      label: 'initial distillation'
    },
    {
      id: 'distillation-to-essence',
      source: 'distillation-engine',
      target: 'essence-extractor',
      type: 'smoothstep',
      label: 'distilled content'
    },
    {
      id: 'redundancy-to-essence',
      source: 'redundancy-remover',
      target: 'essence-extractor',
      type: 'smoothstep',
      label: 'deduplicated content'
    },
    {
      id: 'essence-to-quality',
      source: 'essence-extractor',
      target: 'quality-monitor',
      type: 'smoothstep',
      label: 'essential content'
    },
    {
      id: 'quality-to-encoder',
      source: 'quality-monitor',
      target: 'context-encoder',
      type: 'smoothstep',
      label: 'quality metrics'
    },
    {
      id: 'encoder-to-format',
      source: 'context-encoder',
      target: 'format-optimizer',
      type: 'smoothstep',
      label: 'encoded context'
    },
    {
      id: 'encoder-to-validator',
      source: 'context-encoder',
      target: 'compression-validator',
      type: 'smoothstep',
      label: 'compression data'
    },
    {
      id: 'format-to-reconstruction',
      source: 'format-optimizer',
      target: 'reconstruction-metadata',
      type: 'smoothstep',
      label: 'optimized format'
    },
    {
      id: 'validator-to-reconstruction',
      source: 'compression-validator',
      target: 'reconstruction-metadata',
      type: 'smoothstep',
      label: 'validation results'
    },
    {
      id: 'reconstruction-to-storage',
      source: 'reconstruction-metadata',
      target: 'storage-optimizer',
      type: 'smoothstep',
      label: 'metadata package'
    },
    {
      id: 'storage-to-index',
      source: 'storage-optimizer',
      target: 'index-builder',
      type: 'smoothstep',
      label: 'storage plan'
    },
    {
      id: 'storage-to-retrieval',
      source: 'storage-optimizer',
      target: 'retrieval-enhancer',
      type: 'smoothstep',
      label: 'access patterns'
    },
    {
      id: 'index-to-access',
      source: 'index-builder',
      target: 'access-controller',
      type: 'smoothstep',
      label: 'retrieval indices'
    },
    {
      id: 'retrieval-to-access',
      source: 'retrieval-enhancer',
      target: 'access-controller',
      type: 'smoothstep',
      label: 'enhanced access'
    },
    {
      id: 'access-to-reconstruction',
      source: 'access-controller',
      target: 'reconstruction-engine',
      type: 'smoothstep',
      label: 'compressed context'
    },
    {
      id: 'reconstruction-to-quality',
      source: 'reconstruction-engine',
      target: 'quality-assessor',
      type: 'smoothstep',
      label: 'reconstructed context'
    },
    {
      id: 'reconstruction-to-fidelity',
      source: 'reconstruction-engine',
      target: 'fidelity-checker',
      type: 'smoothstep',
      label: 'reconstruction output'
    },
    {
      id: 'quality-to-output',
      source: 'quality-assessor',
      target: 'output-validator',
      type: 'smoothstep',
      label: 'quality scores'
    },
    {
      id: 'fidelity-to-output',
      source: 'fidelity-checker',
      target: 'output-validator',
      type: 'smoothstep',
      label: 'fidelity assessment'
    },
    {
      id: 'output-to-input',
      source: 'output-validator',
      target: 'context-input',
      type: 'smoothstep',
      label: 'feedback loop',
      style: { strokeDasharray: '5,5' }
    }
  ]
};