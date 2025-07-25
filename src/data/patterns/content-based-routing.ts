import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const contentBasedRoutingPattern: PatternScenario = {
  id: 'content-based-routing',
  title: 'Content-Based Routing Pattern',
  description: 'Demonstrates routing decisions based purely on content analysis, keywords, patterns, and semantic understanding',
  initialNodes: [
    // Input
    {
      id: 'input',
      type: 'default',
      position: { x: 500, y: 50 },
      data: { label: 'Content Input\n"Analyze this document/query"' },
      style: { ...nodeStyle, minWidth: 200, background: '#dc2626' }
    },

    // Content analysis layers
    {
      id: 'lexical-analyzer',
      type: 'default',
      position: { x: 300, y: 180 },
      data: { label: 'Lexical Analyzer\nKeywords, entities, language' },
      style: { ...nodeStyle, minWidth: 180, background: '#8b5cf6' }
    },
    {
      id: 'semantic-analyzer',
      type: 'default',
      position: { x: 500, y: 180 },
      data: { label: 'Semantic Analyzer\nMeaning, intent, context' },
      style: { ...nodeStyle, minWidth: 180, background: '#6366f1' }
    },
    {
      id: 'pattern-matcher',
      type: 'default',
      position: { x: 700, y: 180 },
      data: { label: 'Pattern Matcher\nStructures, formats, types' },
      style: { ...nodeStyle, minWidth: 180, background: '#f59e0b' }
    },

    // Content classification
    {
      id: 'content-classifier',
      type: 'default',
      position: { x: 500, y: 320 },
      data: { label: 'Content Classifier\nCategorize by content features' },
      style: { ...nodeStyle, minWidth: 200, background: '#ef4444' }
    },

    // Routing decision
    {
      id: 'routing-engine',
      type: 'default',
      position: { x: 500, y: 460 },
      data: { label: 'Routing Engine\nSelect handler based on content' },
      style: { ...nodeStyle, minWidth: 200, background: '#f97316' }
    },

    // Content-specific handlers
    {
      id: 'text-handler',
      type: 'default',
      position: { x: 150, y: 600 },
      data: { label: 'Text Handler\nNLP processing pipeline' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981' }
    },
    {
      id: 'code-handler',
      type: 'default',
      position: { x: 350, y: 600 },
      data: { label: 'Code Handler\nSyntax analysis & execution' },
      style: { ...nodeStyle, minWidth: 160, background: '#3b82f6' }
    },
    {
      id: 'data-handler',
      type: 'default',
      position: { x: 550, y: 600 },
      data: { label: 'Data Handler\nStructured data processing' },
      style: { ...nodeStyle, minWidth: 160, background: '#8b5cf6' }
    },
    {
      id: 'media-handler',
      type: 'default',
      position: { x: 750, y: 600 },
      data: { label: 'Media Handler\nImage/video processing' },
      style: { ...nodeStyle, minWidth: 160, background: '#ec4899' }
    },

    // Handler-specific processing
    {
      id: 'nlp-pipeline',
      type: 'default',
      position: { x: 150, y: 750 },
      data: { label: 'NLP Pipeline\nTokenization, POS, NER' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed', fontSize: '12px' }
    },
    {
      id: 'ast-parser',
      type: 'default',
      position: { x: 350, y: 750 },
      data: { label: 'AST Parser\nCode structure analysis' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed', fontSize: '12px' }
    },
    {
      id: 'data-processor',
      type: 'default',
      position: { x: 550, y: 750 },
      data: { label: 'Data Processor\nETL & validation' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed', fontSize: '12px' }
    },
    {
      id: 'cv-engine',
      type: 'default',
      position: { x: 750, y: 750 },
      data: { label: 'Computer Vision\nObject detection & OCR' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed', fontSize: '12px' }
    },

    // Content features
    {
      id: 'content-features',
      type: 'default',
      position: { x: 100, y: 320 },
      data: { label: 'Content Features\n• File extension\n• MIME type\n• Size & structure\n• Language detected' },
      style: { ...nodeStyle, minWidth: 150, background: '#6366f1', fontSize: '11px' }
    },

    // Routing rules
    {
      id: 'routing-rules',
      type: 'default',
      position: { x: 850, y: 460 },
      data: { label: 'Routing Rules\n• .py → Code Handler\n• JSON → Data Handler\n• Natural text → Text Handler\n• Images → Media Handler' },
      style: { ...nodeStyle, minWidth: 160, background: '#f97316', fontSize: '10px' }
    },

    // Processing results
    {
      id: 'results-aggregator',
      type: 'default',
      position: { x: 500, y: 900 },
      data: { label: 'Results Aggregator\nCombine handler outputs' },
      style: { ...nodeStyle, minWidth: 180, background: '#059669' }
    },

    // Content examples
    {
      id: 'text-example',
      type: 'default',
      position: { x: 50, y: 180 },
      data: { label: 'Text Content\n"Analyze customer\nsentiment in reviews"' },
      style: { ...nodeStyle, minWidth: 130, background: '#6b7280', fontSize: '11px' }
    },
    {
      id: 'code-example',
      type: 'default',
      position: { x: 200, y: 50 },
      data: { label: 'Code Content\n"def analyze(data):\n  return results"' },
      style: { ...nodeStyle, minWidth: 130, background: '#6b7280', fontSize: '11px' }
    },
    {
      id: 'data-example',
      type: 'default',
      position: { x: 800, y: 50 },
      data: { label: 'Data Content\n{"sales": 1000,\n "region": "US"}' },
      style: { ...nodeStyle, minWidth: 130, background: '#6b7280', fontSize: '11px' }
    }
  ],
  initialEdges: [
    // Input to analyzers
    {
      id: 'e-input-lexical',
      source: 'input',
      target: 'lexical-analyzer',
      style: edgeStyle
    },
    {
      id: 'e-input-semantic',
      source: 'input',
      target: 'semantic-analyzer',
      style: edgeStyle
    },
    {
      id: 'e-input-pattern',
      source: 'input',
      target: 'pattern-matcher',
      style: edgeStyle
    },

    // Analyzers to classifier
    {
      id: 'e-lexical-classifier',
      source: 'lexical-analyzer',
      target: 'content-classifier',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },
    {
      id: 'e-semantic-classifier',
      source: 'semantic-analyzer',
      target: 'content-classifier',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },
    {
      id: 'e-pattern-classifier',
      source: 'pattern-matcher',
      target: 'content-classifier',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },

    // Classifier to routing
    {
      id: 'e-classifier-routing',
      source: 'content-classifier',
      target: 'routing-engine',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },

    // Routing to handlers
    {
      id: 'e-routing-text',
      source: 'routing-engine',
      target: 'text-handler',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'Natural Language'
    },
    {
      id: 'e-routing-code',
      source: 'routing-engine',
      target: 'code-handler',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      label: 'Source Code'
    },
    {
      id: 'e-routing-data',
      source: 'routing-engine',
      target: 'data-handler',
      style: { ...edgeStyle, stroke: '#8b5cf6' },
      label: 'Structured Data'
    },
    {
      id: 'e-routing-media',
      source: 'routing-engine',
      target: 'media-handler',
      style: { ...edgeStyle, stroke: '#ec4899' },
      label: 'Media Files'
    },

    // Handlers to processors
    {
      id: 'e-text-nlp',
      source: 'text-handler',
      target: 'nlp-pipeline',
      style: { ...edgeStyle, stroke: '#10b981' }
    },
    {
      id: 'e-code-ast',
      source: 'code-handler',
      target: 'ast-parser',
      style: { ...edgeStyle, stroke: '#3b82f6' }
    },
    {
      id: 'e-data-processor',
      source: 'data-handler',
      target: 'data-processor',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },
    {
      id: 'e-media-cv',
      source: 'media-handler',
      target: 'cv-engine',
      style: { ...edgeStyle, stroke: '#ec4899' }
    },

    // Processors to aggregator
    {
      id: 'e-nlp-results',
      source: 'nlp-pipeline',
      target: 'results-aggregator',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-ast-results',
      source: 'ast-parser',
      target: 'results-aggregator',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-data-results',
      source: 'data-processor',
      target: 'results-aggregator',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-cv-results',
      source: 'cv-engine',
      target: 'results-aggregator',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },

    // Supporting information
    {
      id: 'e-features-classifier',
      source: 'content-features',
      target: 'content-classifier',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-rules-routing',
      source: 'routing-rules',
      target: 'routing-engine',
      style: { ...edgeStyle, stroke: '#f97316', strokeDasharray: '3,3' }
    },

    // Example content flows
    {
      id: 'e-text-example',
      source: 'text-example',
      target: 'lexical-analyzer',
      style: { ...edgeStyle, stroke: '#6b7280', strokeDasharray: '5,5', opacity: 0.6 }
    },
    {
      id: 'e-code-example',
      source: 'code-example',
      target: 'pattern-matcher',
      style: { ...edgeStyle, stroke: '#6b7280', strokeDasharray: '5,5', opacity: 0.6 }
    },
    {
      id: 'e-data-example',
      source: 'data-example',
      target: 'semantic-analyzer',
      style: { ...edgeStyle, stroke: '#6b7280', strokeDasharray: '5,5', opacity: 0.6 }
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Content Ingestion',
      description: 'System receives content that needs to be processed appropriately.',
      input: 'Mixed content input: "Analyze this Python code: def sentiment_analysis(text): return model.predict(text)"',
      activeNodes: ['input'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Multi-Layer Content Analysis',
      description: 'Content is simultaneously analyzed through lexical, semantic, and pattern recognition.',
      input: 'Parallel analysis: keywords, meaning, and structural patterns',
      activeNodes: ['input', 'lexical-analyzer', 'semantic-analyzer', 'pattern-matcher'],
      activeEdges: ['e-input-lexical', 'e-input-semantic', 'e-input-pattern']
    },
    {
      id: 'step3',
      title: 'Lexical Analysis Results',
      description: 'Extract keywords, entities, and language characteristics.',
      input: 'Lexical analysis: tokens, entities, language detection',
      activeNodes: ['lexical-analyzer'],
      activeEdges: [],
      output: 'Lexical Features:\n• Keywords: "Python", "code", "sentiment_analysis", "model"\n• Language: English + Python code\n• Entities: Function name, variable names\n• Token count: 12 tokens\n• Code markers: "def", "return", parentheses'
    },
    {
      id: 'step4',
      title: 'Semantic Analysis Results',
      description: 'Understand meaning, intent, and contextual information.',
      input: 'Semantic analysis: intent detection, context understanding',
      activeNodes: ['semantic-analyzer'],
      activeEdges: [],
      output: 'Semantic Features:\n• Intent: Code analysis request\n• Context: Machine learning/NLP domain\n• Purpose: Function analysis\n• Complexity: Intermediate\n• Domain: Data science/AI'
    },
    {
      id: 'step5',
      title: 'Pattern Matching Results',
      description: 'Identify structural patterns and content format.',
      input: 'Pattern matching: structure, syntax, format recognition',
      activeNodes: ['pattern-matcher'],
      activeEdges: [],
      output: 'Pattern Features:\n• Format: Python function definition\n• Structure: def-name-params-return pattern\n• Syntax: Valid Python 3.x\n• Type: Function with single parameter\n• Pattern confidence: 95%'
    },
    {
      id: 'step6',
      title: 'Content Classification',
      description: 'Combine all analysis results to classify content type.',
      input: 'Classification based on lexical + semantic + pattern features',
      activeNodes: ['content-classifier', 'content-features'],
      activeEdges: ['e-lexical-classifier', 'e-semantic-classifier', 'e-pattern-classifier', 'e-features-classifier'],
      output: 'Content Classification:\n• Primary type: Source Code (Python)\n• Secondary type: Natural Language (request)\n• Confidence: 92%\n• Processing recommendation: Code Handler\n• Fallback: Text Handler for explanation'
    },
    {
      id: 'step7',
      title: 'Routing Decision',
      description: 'Select appropriate handler based on content classification.',
      input: 'Route selection: Code content detected → Code Handler',
      activeNodes: ['routing-engine', 'routing-rules'],
      activeEdges: ['e-classifier-routing', 'e-rules-routing'],
      output: 'Routing Decision:\n• Selected handler: Code Handler\n• Reasoning: Python syntax detected\n• Confidence: 92%\n• Processing pipeline: AST parsing + static analysis'
    },
    {
      id: 'step8',
      title: 'Code Handler Activation',
      description: 'Route to specialized code processing pipeline.',
      input: 'Code Handler: Python function analysis',
      activeNodes: ['routing-engine', 'code-handler'],
      activeEdges: ['e-routing-code'],
      output: 'Code Handler Engaged:\n• Language: Python 3.x\n• Analysis type: Function structure\n• Pipeline: AST parsing → semantic analysis → documentation'
    },
    {
      id: 'step9',
      title: 'AST Parsing and Analysis',
      description: 'Parse code into Abstract Syntax Tree for detailed analysis.',
      input: 'AST parsing: code structure and semantic analysis',
      activeNodes: ['code-handler', 'ast-parser'],
      activeEdges: ['e-code-ast'],
      output: 'AST Analysis Results:\n• Function name: sentiment_analysis\n• Parameters: text (single parameter)\n• Return: model.predict(text)\n• External dependencies: model object\n• Complexity: O(1) - single method call\n• Purpose: Text sentiment classification'
    },
    {
      id: 'step10',
      title: 'Alternative Content Examples',
      description: 'Show how different content types would route differently.',
      input: 'Example routing for different content types',
      activeNodes: ['text-example', 'data-example', 'routing-engine', 'text-handler', 'data-handler'],
      activeEdges: ['e-routing-text', 'e-routing-data'],
      output: 'Alternative Routing:\n• "Analyze customer sentiment" → Text Handler (NLP)\n• {"sales": 1000, "region": "US"} → Data Handler (JSON processing)\n• image.jpg → Media Handler (Computer Vision)'
    },
    {
      id: 'step11',
      title: 'Specialized Processing',
      description: 'Each handler applies domain-specific processing techniques.',
      input: 'Handler-specific processing: NLP, Data processing, Computer Vision',
      activeNodes: ['nlp-pipeline', 'data-processor', 'cv-engine'],
      activeEdges: ['e-text-nlp', 'e-data-processor', 'e-media-cv'],
      output: 'Specialized Processing:\n• NLP: Tokenization, POS tagging, NER, sentiment\n• Data: Schema validation, ETL, aggregation\n• CV: Object detection, OCR, image classification\n• Code: Static analysis, complexity metrics, documentation'
    },
    {
      id: 'step12',
      title: 'Results Aggregation',
      description: 'Combine outputs from content-specific handlers into unified response.',
      activeNodes: ['results-aggregator'],
      activeEdges: ['e-ast-results'],
      output: 'Final Analysis Report:\n\n**Code Analysis: sentiment_analysis Function**\n\n• **Purpose**: Sentiment analysis of text input\n• **Architecture**: Uses pre-trained model for prediction\n• **Parameters**: Single text input parameter\n• **Dependencies**: External model object (likely ML model)\n• **Complexity**: Low - single method call\n• **Recommendations**: \n  - Add input validation for text parameter\n  - Include error handling for model failures\n  - Consider adding confidence scores to output\n  - Document model requirements and expected input format\n\n*Analysis generated via Content-Based Routing → Code Handler → AST Parser*'
    }
  ]
};