import { Technique } from './types';

export const knowledgeRetrievalTechniques: Technique[] = [
  {
    id: 'naive-rag',
    name: 'Naive RAG',
    abbr: 'NRAG',
    icon: '📚',
    color: 'from-slate-500 to-gray-600',
    category: 'knowledge-retrieval',
    description: 'Foundational "Retrieve-Read" framework following traditional indexing, retrieval, and generation process',
    features: [
      'Simple retrieval pipeline',
      'Direct passage integration',
      'Basic semantic search',
      'Sequential processing',
      'Straightforward generation',
      'Minimal preprocessing'
    ],
    useCases: ['simple-qa', 'document-search', 'knowledge-lookup', 'basic-assistance', 'prototype-development'],
    complexity: 'low',
    example: 'Basic Document Query:\n\nQuery: "What is photosynthesis?"\n\nNaive RAG Process:\n\n1. Query Processing:\n   • Input: "What is photosynthesis?"\n   • Simple keyword extraction\n   • Direct search query preparation\n\n2. Retrieval:\n   • Search biology textbook database\n   • Retrieve top 3 relevant passages\n   • No ranking or filtering\n\n3. Context Assembly:\n   • Concatenate retrieved passages\n   • Add to prompt context\n   • Simple template formatting\n\n4. Generation:\n   • Submit combined prompt to LLM\n   • Generate single response\n   • Return direct output\n\nResult: "Photosynthesis is the process by which plants convert sunlight, water, and carbon dioxide into glucose and oxygen..."\n\nCharacteristics:\n• Direct retrieval-to-generation pipeline\n• No quality assessment or refinement\n• Simple but effective for basic use cases\n• Foundation for more advanced RAG variants'
  },
  {
    id: 'advanced-rag',
    name: 'Advanced RAG',
    abbr: 'ARAG',
    icon: '⚡',
    color: 'from-blue-500 to-indigo-600',
    category: 'knowledge-retrieval',
    description: 'Enhanced RAG with pre-retrieval and post-retrieval optimizations including query expansion, reranking, and context curation',
    features: [
      'Pre-retrieval optimization',
      'Query expansion techniques', 
      'Post-retrieval processing',
      'Context curation',
      'Document reranking',
      'Quality assessment'
    ],
    useCases: ['enhanced-qa', 'research-assistance', 'domain-expertise', 'professional-search', 'content-analysis'],
    complexity: 'medium',
    example: 'Enhanced Research Query:\n\nQuery: "Impact of machine learning on healthcare"\n\nAdvanced RAG Process:\n\n1. Pre-retrieval Optimization:\n   • Query expansion: "machine learning healthcare diagnosis treatment outcomes"\n   • Synonym expansion: "AI artificial intelligence medical clinical"\n   • Context enhancement: "recent developments 2020-2025"\n\n2. Enhanced Retrieval:\n   • Multi-strategy retrieval: 50 candidate documents\n   • Semantic similarity: 0.7+ threshold\n   • Keyword matching: ML healthcare terms\n   • Temporal filtering: Recent publications\n\n3. Post-retrieval Processing:\n   • Neural reranking: Score by relevance\n   • Context curation: Remove promotional content\n   • Deduplication: Eliminate similar passages\n   • Quality scoring: Assess source authority\n\n4. Optimized Generation:\n   • Multi-perspective synthesis\n   • Evidence-based conclusions\n   • Source citations\n   • Uncertainty acknowledgment\n\nResult: Comprehensive, well-sourced analysis with improved accuracy and coverage through systematic optimization'
  },
  {
    id: 'modular-rag',
    name: 'Modular RAG',
    abbr: 'MRAG',
    icon: '🧩',
    color: 'from-indigo-500 to-purple-600',
    category: 'knowledge-retrieval',
    description: 'Flexible RAG architecture with interchangeable modules supporting iterative, adaptive, and non-sequential retrieval patterns',
    features: [
      'Modular component architecture',
      'Search modules',
      'Memory modules', 
      'Routing modules',
      'Iterative retrieval patterns',
      'Adaptive retrieval strategies'
    ],
    useCases: ['enterprise-systems', 'complex-workflows', 'adaptive-applications', 'multi-step-reasoning', 'research-experimentation'],
    complexity: 'high',
    example: 'Enterprise Knowledge System:\n\nModular Pipeline Configuration:\n\n1. Search Module Options:\n   • Dense retrieval (semantic similarity)\n   • Sparse retrieval (exact matches)\n   • Hybrid retrieval (balanced results)\n   • Graph traversal (relationship queries)\n\n2. Memory Module:\n   • Conversation history tracking\n   • User preference learning\n   • Context accumulation\n   • Query reformulation memory\n\n3. Routing Module:\n   • Query type classification\n   • Domain-specific routing\n   • Complexity assessment\n   • Resource allocation\n\n4. Adaptive Patterns:\n   • Iterative refinement for complex queries\n   • Recursive retrieval for multi-hop reasoning\n   • Self-reflective quality assessment\n   • Dynamic module reconfiguration\n\nResult: Flexible, enterprise-grade RAG system that adapts to different query types and organizational needs through modular architecture'
  },
  {
    id: 'self-rag',
    name: 'Self-RAG',
    abbr: 'SRAG',
    icon: '🪞',
    color: 'from-purple-500 to-indigo-600',
    category: 'knowledge-retrieval',
    description: 'Self-reflective RAG that adaptively determines retrieval necessity and evaluates retrieval quality through reflection tokens',
    features: [
      'Retrieval necessity prediction',
      'Retrieved content evaluation', 
      'Output quality assessment',
      'Self-correction mechanisms',
      'Reflection tokens',
      'Adaptive retrieval strategies'
    ],
    useCases: ['high-accuracy-qa', 'fact-checking', 'research-verification', 'critical-analysis', 'quality-control'],
    complexity: 'high',
    example: 'Scientific Fact Verification:\n\nQuery: "What is the speed of light in vacuum?"\n\nSelf-RAG Process:\n\n1. Retrieval Necessity Assessment:\n   • Query type: Factual\n   • Knowledge confidence: High (basic physics)\n   • Decision: Retrieval may not be necessary\n   • Override: Retrieve for verification\n\n2. Initial Response Generation:\n   • Generated: "The speed of light in vacuum is approximately 299,792,458 meters per second"\n   • Self-assessment: High confidence, well-known constant\n\n3. Retrieval and Verification:\n   • Retrieved: Multiple physics sources confirming exact value\n   • Relevance score: 0.98 (highly relevant)\n   • Consistency check: ✓ Perfect match\n\n4. Quality Evaluation:\n   • Factual accuracy: ✓ Verified\n   • Completeness: ✓ Includes precise value\n   • Citation needed: ✓ Added NIST reference\n\n5. Final Output:\n   • Enhanced response with exact value: 299,792,458 m/s\n   • Added uncertainty: ±0 m/s (defined constant)\n   • Source attribution: NIST physical constants\n\nResult: Self-verified, highly accurate response with appropriate sourcing and confidence indicators'
  },
  {
    id: 'corrective-rag',
    name: 'Corrective RAG (CRAG)',
    abbr: 'CRAG',
    icon: '🔧',
    color: 'from-orange-500 to-red-600',
    category: 'knowledge-retrieval',
    description: 'RAG system that automatically detects and corrects poor retrieval results through quality assessment and re-retrieval',
    features: [
      'Retrieval quality assessment',
      'Automatic error detection',
      'Corrective re-retrieval',
      'Query refinement strategies',
      'Knowledge source expansion',
      'Quality-based filtering'
    ],
    useCases: ['noisy-knowledge-bases', 'multi-source-integration', 'quality-critical-applications', 'domain-specific-qa'],
    complexity: 'high',
    example: 'Medical Information Retrieval:\n\nQuery: "Latest treatment for rheumatoid arthritis"\n\nCRAG Process:\n\n1. Initial Retrieval:\n   • Retrieved 5 documents about RA treatment\n   • Quality scores: [0.3, 0.7, 0.4, 0.8, 0.2]\n   • Assessment: 3/5 documents below quality threshold (0.6)\n\n2. Quality Analysis:\n   • Low-quality issues detected:\n     - Outdated information (2019 guidelines)\n     - Non-medical source (blog post)\n     - Irrelevant content (osteoarthritis treatment)\n\n3. Corrective Actions:\n   • Query refinement: "rheumatoid arthritis treatment 2024 clinical guidelines"\n   • Source filtering: Medical journals only\n   • Temporal filtering: Publications after 2022\n\n4. Re-retrieval:\n   • New retrieval: 7 high-quality documents\n   • Quality scores: [0.9, 0.8, 0.85, 0.92, 0.87, 0.9, 0.83]\n   • All documents above threshold\n\n5. Enhanced Generation:\n   • Latest treatment protocols (2024)\n   • Evidence-based recommendations\n   • Clinical trial results\n   • FDA-approved medications\n\nResult: Corrected retrieval providing current, high-quality medical information with automatic quality assurance'
  },
  {
    id: 'graph-rag',
    name: 'Graph RAG',
    abbr: 'GRAG', 
    icon: '🕸️',
    color: 'from-emerald-500 to-teal-600',
    category: 'knowledge-retrieval',
    description: 'Knowledge graph-enhanced RAG using entity relationships and community detection for global sensemaking queries',
    features: [
      'Entity knowledge graph construction',
      'Community detection algorithms',
      'Global query processing',
      'Multi-hop reasoning paths',
      'Hierarchical summarization',
      'Relationship-aware retrieval'
    ],
    useCases: ['scientific-research', 'investigative-analysis', 'complex-reasoning', 'knowledge-exploration', 'sensemaking'],
    complexity: 'high',
    example: 'Global Sensemaking Query:\n\nQuery: "What are the main themes in this research dataset?"\n\nGraph RAG Process:\n\n1. Entity Knowledge Graph Construction:\n   • Extract entities from all documents\n   • Identify relationships between entities\n   • Build comprehensive knowledge graph\n   • Apply community detection algorithms\n\n2. Community Summarization:\n   • Generate summaries for each entity community\n   • Identify key themes within communities\n   • Create hierarchical topic structure\n   • Prepare community-based context\n\n3. Global Query Processing:\n   • Route query to relevant communities\n   • Generate partial responses from each community\n   • Synthesize comprehensive global response\n   • Maintain thematic coherence\n\n4. Multi-perspective Integration:\n   • Combine insights from multiple communities\n   • Identify cross-cutting themes\n   • Resolve potential contradictions\n   • Present unified thematic analysis\n\nResult: Comprehensive thematic analysis spanning entire dataset with substantially improved comprehensiveness and diversity compared to traditional RAG'
  },
  {
    id: 'multimodal-rag',
    name: 'Multimodal RAG',
    abbr: 'MMRAG',
    icon: '🎭',
    color: 'from-pink-500 to-rose-600',
    category: 'knowledge-retrieval',
    description: 'Retrieval-augmented generation that handles and integrates text, images, audio, video, and structured data sources',
    features: [
      'Cross-modal retrieval',
      'Multimodal embedding alignment',
      'Unified representation spaces',
      'Content type adaptation',
      'Cross-modal reasoning',
      'Integrated generation'
    ],
    useCases: ['multimedia-search', 'educational-content', 'medical-imaging', 'design-assistance', 'technical-documentation'],
    complexity: 'high',
    example: 'Medical Diagnosis Assistant:\n\nQuery: "Patient has chest pain and shortness of breath"\n\nMultimodal RAG Process:\n\n1. Text Retrieval:\n   • Medical literature on chest pain causes\n   • Clinical guidelines for dyspnea evaluation\n   • Case studies with similar presentations\n\n2. Image Retrieval:\n   • Chest X-ray reference images\n   • ECG pattern examples\n   • CT scan comparison cases\n   • Echocardiogram findings\n\n3. Structured Data Retrieval:\n   • Laboratory reference ranges\n   • Diagnostic criteria tables\n   • Risk stratification scores\n   • Treatment protocols\n\n4. Audio/Video Retrieval:\n   • Heart sound recordings\n   • Lung auscultation examples\n   • Patient interview techniques\n   • Examination procedure videos\n\n5. Integrated Analysis:\n   • Correlate symptoms with imaging patterns\n   • Match findings with literature evidence\n   • Provide visual diagnostic aids\n   • Generate comprehensive assessment\n\nOutput:\n• Text: Differential diagnosis with evidence\n• Images: Relevant reference comparisons\n• Tables: Risk scores and criteria\n• Audio: Expected findings descriptions\n\nResult: Comprehensive, multimodal diagnostic support combining all relevant information types'
  },
  {
    id: 'agentic-rag-systems',
    name: 'Agentic RAG',
    abbr: 'AgRAG',
    icon: '🤖',
    color: 'from-cyan-500 to-blue-600',
    category: 'knowledge-retrieval',
    description: 'Autonomous retrieval-augmented generation systems with self-directed planning, retrieval, and reasoning capabilities',
    features: [
      'Self-directed retrieval planning',
      'Multi-hop reasoning capabilities',
      'Autonomous query refinement',
      'Dynamic retrieval strategies',
      'Self-reflective generation',
      'Adaptive search optimization'
    ],
    useCases: ['research-automation', 'investigative-analysis', 'complex-qa', 'knowledge-discovery', 'scientific-exploration'],
    complexity: 'high',
    example: 'Scientific Literature Investigation:\n\nTask: "Investigate the relationship between microbiome diversity and autoimmune diseases"\n\nAgentic RAG Process:\n\n1. Initial Planning:\n   • Agent analyzes query complexity: High\n   • Identifies required knowledge domains: Microbiology, Immunology, Medicine\n   • Plans multi-phase retrieval strategy\n   • Sets quality thresholds and stopping criteria\n\n2. Phase 1 - Foundation Building:\n   • Autonomous search: "microbiome diversity measurement methods"\n   • Retrieves: 15 foundational papers on microbiome analysis\n   • Self-assessment: "Need more recent clinical studies"\n   • Refines query: "microbiome diversity autoimmune 2020-2025"\n\n3. Phase 2 - Relationship Exploration:\n   • Multi-hop reasoning: Identifies gut-brain-immune axis\n   • Expands search: "gut microbiome inflammatory bowel disease"\n   • Cross-references: Finds metabolite pathway connections\n   • Self-reflection: "Missing rheumatoid arthritis connection"\n\n4. Phase 3 - Evidence Synthesis:\n   • Autonomous query: "microbiome therapeutic interventions autoimmune"\n   • Retrieves clinical trial data\n   • Evaluates evidence quality and consistency\n   • Identifies research gaps and controversies\n\n5. Autonomous Quality Control:\n   • Checks for bias in source selection\n   • Verifies claim consistency across sources\n   • Assesses evidence strength and reliability\n   • Generates confidence scores for conclusions\n\nFinal Output:\n• Comprehensive analysis spanning 45 high-quality sources\n• Identified 3 causal mechanisms and 2 therapeutic targets\n• Highlighted 4 promising research directions\n• Generated evidence-based confidence assessments\n\nResult: Autonomous research system with built-in quality control and comprehensive coverage'
  }
]; 