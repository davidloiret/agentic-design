'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, FileText, Code, Database, Image, Search, Brain, Zap, CheckCircle, AlertCircle } from 'lucide-react';

interface ContentAnalysis {
  lexical: {
    keywords: string[];
    language: string;
    tokenCount: number;
    entities: string[];
  };
  semantic: {
    intent: string;
    domain: string;
    complexity: string;
    purpose: string;
  };
  pattern: {
    format: string;
    structure: string;
    confidence: number;
    type: string;
  };
}

interface ContentHandler {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  backgroundColor: string;
  criteria: string[];
  processingSteps: string[];
  specialization: string;
}

interface RoutingDecision {
  selectedHandler: string;
  confidence: number;
  reasoning: string[];
  processingPipeline: string[];
}

const CONTENT_HANDLERS: ContentHandler[] = [
  {
    id: 'text',
    name: 'Text Handler',
    description: 'Natural language processing for text content',
    icon: <FileText className="w-5 h-5" />,
    color: 'text-green-400',
    backgroundColor: 'bg-green-900/20 border-green-500/30',
    criteria: ['Natural language', 'Essays, articles', 'Q&A content', 'Conversational text'],
    processingSteps: ['Tokenization', 'POS Tagging', 'NER', 'Sentiment Analysis', 'Summarization'],
    specialization: 'NLP pipeline with linguistic analysis'
  },
  {
    id: 'code',
    name: 'Code Handler',
    description: 'Source code analysis and processing',
    icon: <Code className="w-5 h-5" />,
    color: 'text-blue-400',
    backgroundColor: 'bg-blue-900/20 border-blue-500/30',
    criteria: ['Programming languages', 'Function definitions', 'Syntax patterns', 'Code structure'],
    processingSteps: ['Syntax parsing', 'AST generation', 'Static analysis', 'Documentation', 'Complexity metrics'],
    specialization: 'Abstract Syntax Tree parsing and code analysis'
  },
  {
    id: 'data',
    name: 'Data Handler',
    description: 'Structured data processing and analysis',
    icon: <Database className="w-5 h-5" />,
    color: 'text-purple-400',
    backgroundColor: 'bg-purple-900/20 border-purple-500/30',
    criteria: ['JSON/XML/CSV', 'Structured formats', 'Database records', 'Configuration files'],
    processingSteps: ['Schema validation', 'Data transformation', 'ETL processing', 'Aggregation', 'Insights generation'],
    specialization: 'Structured data ETL and validation pipeline'
  },
  {
    id: 'media',
    name: 'Media Handler',
    description: 'Image, video, and multimedia processing',
    icon: <Image className="w-5 h-5" />,
    color: 'text-pink-400',
    backgroundColor: 'bg-pink-900/20 border-pink-500/30',
    criteria: ['Image files', 'Video content', 'Audio files', 'Binary formats'],
    processingSteps: ['Format detection', 'Computer vision', 'OCR extraction', 'Object detection', 'Content analysis'],
    specialization: 'Computer vision and multimedia processing'
  }
];

const SAMPLE_CONTENT = [
  {
    id: 'python-code',
    title: 'Python Function',
    content: `def sentiment_analysis(text):
    """Analyze sentiment of input text"""
    cleaned_text = preprocess(text)
    features = extract_features(cleaned_text)
    return model.predict(features)`,
    type: 'code',
    analysis: {
      lexical: {
        keywords: ['def', 'sentiment_analysis', 'text', 'preprocess', 'model', 'predict'],
        language: 'Python',
        tokenCount: 24,
        entities: ['function_name', 'variables', 'method_calls']
      },
      semantic: {
        intent: 'Code analysis',
        domain: 'Machine Learning/NLP',
        complexity: 'Intermediate',
        purpose: 'Sentiment classification function'
      },
      pattern: {
        format: 'Python function definition',
        structure: 'def-docstring-body-return',
        confidence: 95,
        type: 'Function with multiple statements'
      }
    }
  },
  {
    id: 'natural-text',
    title: 'Customer Review',
    content: `I absolutely love this product! The quality is outstanding and the customer service was exceptional. The delivery was fast and the packaging was perfect. I would definitely recommend this to anyone looking for a reliable solution. Five stars!`,
    type: 'text',
    analysis: {
      lexical: {
        keywords: ['love', 'product', 'quality', 'outstanding', 'exceptional', 'recommend'],
        language: 'English',
        tokenCount: 45,
        entities: ['product', 'customer_service', 'delivery', 'packaging']
      },
      semantic: {
        intent: 'Product review',
        domain: 'E-commerce/Customer feedback',
        complexity: 'Simple',
        purpose: 'Express positive sentiment about purchase'
      },
      pattern: {
        format: 'Natural language text',
        structure: 'Narrative with opinions',
        confidence: 92,
        type: 'Customer testimonial'
      }
    }
  },
  {
    id: 'json-data',
    title: 'Sales Report Data',
    content: `{
  "sales_report": {
    "period": "Q3 2024",
    "total_revenue": 2500000,
    "regions": [
      {"name": "North America", "revenue": 1200000, "growth": 15.2},
      {"name": "Europe", "revenue": 800000, "growth": 8.7},
      {"name": "Asia", "revenue": 500000, "growth": 23.1}
    ],
    "top_products": ["Widget A", "Service B", "Platform C"]
  }
}`,
    type: 'data',
    analysis: {
      lexical: {
        keywords: ['sales_report', 'revenue', 'regions', 'growth', 'products'],
        language: 'JSON',
        tokenCount: 32,
        entities: ['financial_data', 'geographic_regions', 'product_names']
      },
      semantic: {
        intent: 'Data analysis',
        domain: 'Business/Sales analytics',
        complexity: 'Medium',
        purpose: 'Quarterly sales performance report'
      },
      pattern: {
        format: 'JSON structured data',
        structure: 'Nested objects with arrays',
        confidence: 98,
        type: 'Business intelligence data'
      }
    }
  },
  {
    id: 'sql-query',
    title: 'Database Query',
    content: `SELECT customers.name, orders.total, products.category
FROM customers 
JOIN orders ON customers.id = orders.customer_id
JOIN order_items ON orders.id = order_items.order_id
JOIN products ON order_items.product_id = products.id
WHERE orders.date >= '2024-01-01'
GROUP BY customers.name, products.category
ORDER BY orders.total DESC;`,
    type: 'code',
    analysis: {
      lexical: {
        keywords: ['SELECT', 'FROM', 'JOIN', 'WHERE', 'GROUP BY', 'ORDER BY'],
        language: 'SQL',
        tokenCount: 35,
        entities: ['table_names', 'column_names', 'join_conditions']
      },
      semantic: {
        intent: 'Database query',
        domain: 'Data management/Analytics',
        complexity: 'Advanced',
        purpose: 'Customer order analysis with product categorization'
      },
      pattern: {
        format: 'SQL query statement',
        structure: 'Multi-table join with aggregation',
        confidence: 94,
        type: 'Complex analytical query'
      }
    }
  },
  {
    id: 'config-file',
    title: 'Configuration File',
    content: `# Database Configuration
database:
  host: "localhost"
  port: 5432
  name: "production_db"
  ssl_enabled: true

# API Settings  
api:
  base_url: "https://api.example.com"
  timeout: 30
  rate_limit: 1000
  
# Logging
logging:
  level: "INFO"
  file: "/var/log/app.log"`,
    type: 'data',
    analysis: {
      lexical: {
        keywords: ['database', 'host', 'port', 'api', 'timeout', 'logging'],
        language: 'YAML',
        tokenCount: 28,
        entities: ['configuration_keys', 'connection_strings', 'file_paths']
      },
      semantic: {
        intent: 'Configuration management',
        domain: 'System administration',
        complexity: 'Medium',
        purpose: 'Application configuration settings'
      },
      pattern: {
        format: 'YAML configuration',
        structure: 'Hierarchical key-value pairs',
        confidence: 89,
        type: 'Application configuration'
      }
    }
  }
];

export const ContentBasedRoutingDemo: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState(SAMPLE_CONTENT[0]);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null);
  const [routingDecision, setRoutingDecision] = useState<RoutingDecision | null>(null);
  const [selectedHandler, setSelectedHandler] = useState<ContentHandler | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [finalResult, setFinalResult] = useState<string>('');
  const [speed, setSpeed] = useState(2);
  const [executionLog, setExecutionLog] = useState<string[]>([]);

  const resetDemo = useCallback(() => {
    setCurrentPhase('');
    setIsRunning(false);
    setAnalysis(null);
    setRoutingDecision(null);
    setSelectedHandler(null);
    setIsProcessing(false);
    setFinalResult('');
    setExecutionLog([]);
  }, []);

  useEffect(() => {
    resetDemo();
  }, [selectedContent, resetDemo]);

  const determineHandler = (analysis: ContentAnalysis): { handler: string; confidence: number; reasoning: string[] } => {
    const scores = CONTENT_HANDLERS.map(handler => ({ id: handler.id, score: 0, reasons: [] as string[] }));
    
    // Pattern-based scoring
    if (analysis.pattern.format.includes('Python') || analysis.pattern.format.includes('SQL')) {
      const codeHandler = scores.find(s => s.id === 'code')!;
      codeHandler.score += 40;
      codeHandler.reasons.push(`Format detected: ${analysis.pattern.format}`);
    }
    
    if (analysis.pattern.format.includes('JSON') || analysis.pattern.format.includes('YAML')) {
      const dataHandler = scores.find(s => s.id === 'data')!;
      dataHandler.score += 40;
      dataHandler.reasons.push(`Structured data format: ${analysis.pattern.format}`);
    }
    
    if (analysis.pattern.format.includes('Natural language')) {
      const textHandler = scores.find(s => s.id === 'text')!;
      textHandler.score += 40;     
      textHandler.reasons.push('Natural language content detected');
    }
    
    // Semantic scoring
    if (analysis.semantic.intent.includes('Code') || analysis.semantic.intent.includes('Database')) {
      const codeHandler = scores.find(s => s.id === 'code')!;
      codeHandler.score += 25;
      codeHandler.reasons.push(`Intent: ${analysis.semantic.intent}`);
    }
    
    if (analysis.semantic.intent.includes('Data') || analysis.semantic.domain.includes('analytics')) {
      const dataHandler = scores.find(s => s.id === 'data')!;
      dataHandler.score += 25;
      dataHandler.reasons.push(`Data-focused intent: ${analysis.semantic.intent}`);
    }
    
    // Lexical scoring
    const codeKeywords = ['def', 'SELECT', 'function', 'class', 'import'];
    const hasCodeKeywords = analysis.lexical.keywords.some(k => codeKeywords.includes(k));
    if (hasCodeKeywords) {
      const codeHandler = scores.find(s => s.id === 'code')!;
      codeHandler.score += 15;
      codeHandler.reasons.push('Programming keywords detected');
    }
    
    const bestHandler = scores.reduce((best, current) => current.score > best.score ? current : best);
    return {
      handler: bestHandler.id,
      confidence: Math.min(bestHandler.score, 95),
      reasoning: bestHandler.reasons
    };
  };

  const generateResult = (handler: ContentHandler, content: any): string => {
    const results: { [key: string]: { [key: string]: string } } = {
      'text': {
        'natural-text': '**Text Analysis Results:**\n\n• **Sentiment**: Highly Positive (0.89/1.0)\n• **Key Themes**: Product quality, customer service, delivery experience\n• **Entities**: Product (mentioned 2x), Customer service (1x), Delivery (1x)\n• **Language Quality**: Professional, authentic testimonial\n• **Recommendation Score**: 5/5 stars\n• **Emotional Indicators**: Love, outstanding, exceptional, perfect\n\n*Analysis via NLP Pipeline: Tokenization → POS Tagging → NER → Sentiment*',
        'default': 'Text processing complete. Content analyzed through natural language processing pipeline with sentiment analysis and entity extraction.'
      },
      'code': {
        'python-code': '**Code Analysis Results:**\n\n• **Function**: sentiment_analysis(text)\n• **Purpose**: Text sentiment classification with preprocessing\n• **Dependencies**: preprocess(), extract_features(), model object\n• **Complexity**: Medium (3 operations, 1 external model)\n• **Best Practices**: ✓ Docstring, ✓ Clear naming\n• **Recommendations**:\n  - Add input validation for text parameter\n  - Include error handling for model predictions\n  - Consider adding confidence scores to output\n  - Document model requirements\n\n*Analysis via AST Parser: Syntax → Structure → Dependencies → Metrics*',
        'sql-query': '**SQL Query Analysis:**\n\n• **Type**: Multi-table analytical query\n• **Tables**: customers, orders, order_items, products (4 tables)\n• **Joins**: 3 INNER JOINs with proper key relationships\n• **Complexity**: High (multiple joins + aggregation)\n• **Performance**: Consider indexing on date column\n• **Purpose**: Customer purchase analysis by product category\n• **Output**: Customer names with total orders by category\n\n*Analysis via SQL Parser: Syntax → Query plan → Optimization suggestions*',
        'default': 'Code analysis complete. Source code processed through AST parsing with structure analysis and complexity metrics.'
      },
      'data': {
        'json-data': '**Data Analysis Results:**\n\n• **Schema**: Valid JSON with nested structure\n• **Data Quality**: 100% - all required fields present\n• **Business Insights**:\n  - Total Revenue: $2.5M (Q3 2024)\n  - Best Performing Region: North America (48% of revenue)\n  - Highest Growth: Asia (23.1% growth rate)\n  - Revenue Distribution: 48% NA, 32% EU, 20% Asia\n• **Recommendations**: Focus marketing investment in Asia region\n\n*Analysis via Data Pipeline: Validation → Transformation → Insights*',
        'config-file': '**Configuration Analysis:**\n\n• **Format**: Valid YAML configuration\n• **Sections**: Database (4 settings), API (4 settings), Logging (2 settings)\n• **Security Check**: ✓ SSL enabled, ⚠️ Consider secrets management\n• **Validation**: All required configuration keys present\n• **Environment**: Production database configuration detected\n• **Recommendations**:\n  - Move sensitive values to environment variables\n  - Add connection pooling settings\n  - Configure log rotation\n\n*Analysis via Config Parser: Schema validation → Security scan → Best practices*',
        'default': 'Data processing complete. Structured data analyzed through ETL pipeline with validation and insights generation.'
      },
      'media': {
        'default': 'Media processing complete. Content analyzed through computer vision pipeline with object detection and OCR extraction.'
      }
    };
    
    const handlerResults = results[handler.id];
    return handlerResults[content.id] || handlerResults['default'];
  };

  const runContentBasedRouting = useCallback(async () => {
    setIsRunning(true);
    setExecutionLog(['🚀 Starting content-based routing analysis...']);

    // Phase 1: Content Analysis
    setCurrentPhase('analysis');
    setExecutionLog(prev => [...prev, '🔍 Analyzing content through multiple layers...']);
    await new Promise(resolve => setTimeout(resolve, 2000 / speed));
    
    setAnalysis(selectedContent.analysis);
    setExecutionLog(prev => [...prev, '✅ Lexical analysis: Keywords and language detection complete']);
    await new Promise(resolve => setTimeout(resolve, 500 / speed));
    setExecutionLog(prev => [...prev, '✅ Semantic analysis: Intent and domain understanding complete']);
    await new Promise(resolve => setTimeout(resolve, 500 / speed));
    setExecutionLog(prev => [...prev, '✅ Pattern analysis: Structure and format recognition complete']);

    // Phase 2: Content Classification
    setCurrentPhase('classification');
    setExecutionLog(prev => [...prev, '🎯 Classifying content and determining routing...']);
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    const routingResult = determineHandler(selectedContent.analysis);
    const handlerData = CONTENT_HANDLERS.find(h => h.id === routingResult.handler)!;
    
    const decision: RoutingDecision = {
      selectedHandler: routingResult.handler,
      confidence: routingResult.confidence,
      reasoning: routingResult.reasoning,
      processingPipeline: handlerData.processingSteps
    };

    setRoutingDecision(decision);
    setSelectedHandler(handlerData);
    setExecutionLog(prev => [...prev, `✅ Content routed to ${handlerData.name} (${routingResult.confidence}% confidence)`]);

    // Phase 3: Handler Processing
    setCurrentPhase('processing');
    setIsProcessing(true);
    setExecutionLog(prev => [...prev, `⚡ Processing via ${handlerData.name}...`]);
    
    // Simulate processing steps
    for (let i = 0; i < handlerData.processingSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800 / speed));
      setExecutionLog(prev => [...prev, `  → ${handlerData.processingSteps[i]}`]);
    }

    // Phase 4: Result Generation
    const result = generateResult(handlerData, selectedContent);
    setFinalResult(result);
    setIsProcessing(false);
    setExecutionLog(prev => [...prev, `✅ Processing complete via ${handlerData.specialization}`]);

    setCurrentPhase('complete');
    setIsRunning(false);
    setExecutionLog(prev => [...prev, '🎯 Content-based routing completed successfully!']);
  }, [selectedContent, speed]);

  const getPhaseStatus = (phase: string) => {
    if (currentPhase === phase) return 'border-blue-500 bg-blue-900/20';
    if (analysis && (phase === 'analysis' || (routingDecision && (phase === 'classification' || (finalResult && phase === 'processing'))))) {
      return 'border-green-500 bg-green-900/20';
    }
    return 'border-gray-600 bg-gray-800/20';
  };

  const getHandlerColor = (handlerId: string) => {
    const handler = CONTENT_HANDLERS.find(h => h.id === handlerId);
    return handler?.backgroundColor || 'bg-gray-800/20';
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">📄</span>
          Content-Based Routing Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch how content is analyzed through multiple layers and routed to specialized handlers based on content characteristics.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sample Content
            </label>
            <select
              value={selectedContent.id}
              onChange={(e) => {
                const content = SAMPLE_CONTENT.find(c => c.id === e.target.value);
                if (content) setSelectedContent(content);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SAMPLE_CONTENT.map((content) => (
                <option key={content.id} value={content.id}>
                  {content.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Analysis Speed
            </label>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full accent-blue-500"
            />
            <div className="text-sm text-gray-400">{speed}x speed</div>
          </div>

          <div className="flex items-end">
            <div className="flex space-x-2">
              <button
                onClick={runContentBasedRouting}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  isRunning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Analyzing...' : 'Start Analysis'}
              </button>
              
              <button
                onClick={resetDemo}
                disabled={isRunning}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Content Preview */}
        <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
          <h4 className="font-medium text-white mb-2">Content to Analyze: {selectedContent.title}</h4>
          <div className="bg-gray-900/50 p-3 rounded text-sm text-gray-300 font-mono max-h-32 overflow-y-auto">
            {selectedContent.content}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analysis Pipeline */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Content Analysis Pipeline</h3>
          
          {/* Analysis Phases */}
          <div className="space-y-4 mb-6">
            {/* Multi-Layer Analysis */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('analysis')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Multi-Layer Content Analysis
                </h4>
                {currentPhase === 'analysis' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {analysis && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {analysis && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="font-medium text-purple-400">Lexical Analysis</div>
                    <div><span className="text-gray-400">Language:</span> <span className="text-white">{analysis.lexical.language}</span></div>
                    <div><span className="text-gray-400">Tokens:</span> <span className="text-white">{analysis.lexical.tokenCount}</span></div>
                    <div><span className="text-gray-400">Keywords:</span> <span className="text-blue-400">{analysis.lexical.keywords.slice(0, 3).join(', ')}</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium text-blue-400">Semantic Analysis</div>
                    <div><span className="text-gray-400">Intent:</span> <span className="text-white">{analysis.semantic.intent}</span></div>
                    <div><span className="text-gray-400">Domain:</span> <span className="text-white">{analysis.semantic.domain}</span></div>
                    <div><span className="text-gray-400">Complexity:</span> <span className="text-green-400">{analysis.semantic.complexity}</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium text-orange-400">Pattern Analysis</div>
                    <div><span className="text-gray-400">Format:</span> <span className="text-white">{analysis.pattern.format}</span></div>
                    <div><span className="text-gray-400">Structure:</span> <span className="text-white">{analysis.pattern.structure}</span></div>
                    <div><span className="text-gray-400">Confidence:</span> <span className="text-yellow-400">{analysis.pattern.confidence}%</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Content Classification & Routing */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('classification')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Content Classification & Routing
                </h4>
                {currentPhase === 'classification' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {routingDecision && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {routingDecision && selectedHandler && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${selectedHandler.color === 'text-green-400' ? 'bg-green-600' : selectedHandler.color === 'text-blue-400' ? 'bg-blue-600' : selectedHandler.color === 'text-purple-400' ? 'bg-purple-600' : 'bg-pink-600'}`}>
                      {selectedHandler.icon}
                    </div>
                    <div>
                      <div className="font-medium text-white">{selectedHandler.name}</div>
                      <div className="text-sm text-gray-400">{routingDecision.confidence}% confidence</div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-400 mb-1">Routing Reasoning:</div>
                    <ul className="space-y-1">
                      {routingDecision.reasoning.map((reason, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-400 mr-1">•</span>
                          <span className="text-gray-300">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Handler Processing */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('processing')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Specialized Handler Processing
                </h4>
                {isProcessing && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {finalResult && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {selectedHandler && (
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-400">Specialization:</span> <span className="text-white">{selectedHandler.specialization}</span></div>
                  {routingDecision && (
                    <div>
                      <div className="text-gray-400 mb-1">Processing Pipeline:</div>
                      <div className="flex flex-wrap gap-2">
                        {routingDecision.processingPipeline.map((step, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                            {step}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Available Handlers */}
          <div>
            <h4 className="font-medium text-white mb-3">Available Content Handlers</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CONTENT_HANDLERS.map((handler) => (
                <div
                  key={handler.id}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedHandler?.id === handler.id 
                      ? handler.backgroundColor + ' border-opacity-100' 
                      : 'border-gray-600 bg-gray-800/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1 rounded ${handler.color === 'text-green-400' ? 'bg-green-600' : handler.color === 'text-blue-400' ? 'bg-blue-600' : handler.color === 'text-purple-400' ? 'bg-purple-600' : 'bg-pink-600'}`}>
                      {handler.icon}
                    </div>
                    <div className="font-medium text-white text-sm">{handler.name}</div>
                  </div>
                  <div className="text-xs text-gray-300 mb-2">{handler.description}</div>
                  <div className="text-xs text-gray-400">
                    <div className="mb-1">Handles:</div>
                    <div>{handler.criteria.slice(0, 2).join(', ')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Log & Results */}
        <div className="space-y-6">
          {/* Process Log */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Process Log</h3>
            <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 h-64 overflow-y-auto">
              {executionLog.length === 0 ? (
                <div className="text-gray-400 text-center text-sm mt-8">
                  Process log will appear here...
                </div>
              ) : (
                <div className="space-y-1">
                  {executionLog.map((log, index) => (
                    <div key={index} className="text-sm text-gray-300 font-mono">
                      <span className="text-gray-500 mr-2">{String(index + 1).padStart(2, '0')}.</span>
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Analysis Results */}
          {finalResult && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Analysis Results</h3>
              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30 p-4">
                <div className="flex items-center gap-2 mb-3">
                  {selectedHandler?.icon}
                  <span className="font-medium text-white">Processed by {selectedHandler?.name}</span>
                  <span className="text-xs bg-green-600 px-2 py-1 rounded">ANALYZED</span>
                </div>
                <div className="text-sm text-gray-200 whitespace-pre-line">
                  {finalResult}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentBasedRoutingDemo;