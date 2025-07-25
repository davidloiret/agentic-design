import { Technique } from './types';

export const knowledgeRetrievalTechniques: Technique[] = [
  {
    id: 'graph-rag',
    name: 'Graph RAG',
    abbr: 'GRAG',
    icon: '🕸️',
    color: 'from-emerald-500 to-teal-600',
    category: 'knowledge-retrieval',
    description: 'Retrieval-augmented generation using knowledge graphs for structured relationship-aware information retrieval',
    features: [
      'Knowledge graph traversal',
      'Relationship-aware retrieval',
      'Multi-hop reasoning paths',
      'Entity-centric search',
      'Structured knowledge integration',
      'Graph neural network enhancement'
    ],
    useCases: ['scientific-research', 'medical-diagnosis', 'legal-analysis', 'financial-analysis', 'knowledge-exploration'],
    complexity: 'high',
    example: 'Medical Research Query:\n\nQuery: "What are the connections between diabetes and cardiovascular disease?"\n\nGraph RAG Process:\n\n1. Entity Extraction:\n   • Primary entities: [Diabetes, Cardiovascular Disease]\n   • Related concepts: [Insulin Resistance, Atherosclerosis, Hypertension]\n\n2. Graph Traversal:\n   • Path 1: Diabetes → Insulin Resistance → Inflammation → Atherosclerosis → CVD\n   • Path 2: Diabetes → Hyperglycemia → Endothelial Dysfunction → CVD\n   • Path 3: Diabetes → Dyslipidemia → Plaque Formation → CVD\n\n3. Multi-hop Retrieval:\n   • Retrieve papers on each relationship in the paths\n   • Gather evidence for each connection\n   • Collect mechanism details and clinical studies\n\n4. Structured Synthesis:\n   • Organize findings by causal pathways\n   • Highlight strength of evidence for each connection\n   • Present comprehensive mechanism overview\n\nResult: Comprehensive, relationship-aware analysis with clear causal pathways and supporting evidence from 40+ interconnected sources'
  },
  {
    id: 'node-rag',
    name: 'Node RAG',
    abbr: 'NRAG',
    icon: '🔗',
    color: 'from-blue-500 to-cyan-600',
    category: 'knowledge-retrieval',
    description: 'Node-based retrieval focusing on individual knowledge graph nodes and their immediate neighborhoods',
    features: [
      'Node-centric retrieval',
      'Neighborhood expansion',
      'Entity-specific context',
      'Local graph structure utilization',
      'Node embedding similarity',
      'Selective neighbor inclusion'
    ],
    useCases: ['entity-qa', 'fact-verification', 'knowledge-completion', 'relation-discovery', 'expert-systems'],
    complexity: 'medium',
    example: 'Company Analysis Query:\n\nQuery: "Tell me about Tesla\'s recent developments"\n\nNode RAG Process:\n\n1. Node Identification:\n   • Primary node: Tesla Inc.\n   • Node type: Public Company\n   • Key attributes: Founded 2003, CEO Elon Musk, Electric Vehicles\n\n2. Neighborhood Expansion:\n   • 1-hop neighbors: Elon Musk, Model 3, Gigafactory, Supercharger Network\n   • 2-hop neighbors: SpaceX, Autopilot, Battery Technology, Solar Panels\n   • Recent connections: Cybertruck Launch, FSD Updates, Q4 Earnings\n\n3. Context Assembly:\n   • Company fundamentals from Tesla node\n   • Recent news from connected event nodes\n   • Financial data from earnings nodes\n   • Product updates from model nodes\n\n4. Focused Generation:\n   • Prioritize recent developments (last 6 months)\n   • Include key metrics and milestones\n   • Maintain focus on Tesla-specific information\n\nResult: Comprehensive Tesla update focused on the most relevant and recent information from the company\'s knowledge graph neighborhood'
  },
  {
    id: 'self-rag',
    name: 'Self-RAG',
    abbr: 'SRAG',
    icon: '🪞',
    color: 'from-purple-500 to-indigo-600',
    category: 'knowledge-retrieval',
    description: 'Self-reflective RAG that evaluates retrieval necessity, quality, and output relevance with built-in correction mechanisms',
    features: [
      'Retrieval necessity prediction',
      'Retrieved content evaluation',
      'Output quality assessment',
      'Self-correction mechanisms',
      'Confidence-based decisions',
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
    id: 'adaptive-rag',
    name: 'Adaptive RAG',
    abbr: 'ARAG',
    icon: '🎯',
    color: 'from-green-500 to-emerald-600',
    category: 'knowledge-retrieval',
    description: 'Dynamically adapts retrieval strategy, source selection, and generation approach based on query characteristics and context',
    features: [
      'Query-adaptive retrieval',
      'Dynamic source selection',
      'Context-aware strategies',
      'Performance-based optimization',
      'Multi-strategy combination',
      'Real-time adaptation'
    ],
    useCases: ['multi-domain-systems', 'varied-query-types', 'performance-optimization', 'resource-constrained-environments'],
    complexity: 'high',
    example: 'Multi-Domain Assistant:\n\nQuery Analysis & Adaptation:\n\n1. Simple Factual Query: "Capital of France"\n   • Strategy: Direct knowledge retrieval\n   • Sources: Geographic databases\n   • Approach: Single-shot generation\n   • Latency: <100ms\n\n2. Complex Analysis Query: "Impact of climate change on European agriculture"\n   • Strategy: Multi-hop retrieval + synthesis\n   • Sources: Climate data, agricultural reports, research papers\n   • Approach: Structured analysis with multiple perspectives\n   • Latency: 2-3 seconds\n\n3. Technical Query: "Implement binary search in Python"\n   • Strategy: Code-focused retrieval\n   • Sources: Programming documentation, code repositories\n   • Approach: Example-driven generation\n   • Latency: 500ms\n\n4. Real-time Query: "Current stock price of AAPL"\n   • Strategy: Live data retrieval\n   • Sources: Financial APIs, real-time feeds\n   • Approach: Data integration + context\n   • Latency: 200ms\n\nAdaptive Optimization:\n• Query complexity → Retrieval depth\n• Domain type → Source selection\n• User context → Personalization level\n• System load → Performance/quality trade-offs\n\nResult: Optimized performance for each query type with appropriate resource allocation'
  },
  {
    id: 'modular-rag',
    name: 'Modular RAG',
    abbr: 'MRAG',
    icon: '🧩',
    color: 'from-indigo-500 to-purple-600',
    category: 'knowledge-retrieval',
    description: 'Composable RAG architecture with interchangeable modules for retrieval, ranking, filtering, and generation components',
    features: [
      'Modular component architecture',
      'Interchangeable retrieval modules',
      'Customizable ranking systems',
      'Pluggable filtering components',
      'Flexible generation modules',
      'Pipeline orchestration'
    ],
    useCases: ['enterprise-systems', 'customizable-applications', 'a-b-testing', 'multi-tenant-platforms', 'research-experimentation'],
    complexity: 'high',
    example: 'Enterprise Knowledge System:\n\nModular Pipeline Configuration:\n\n1. Retrieval Module Options:\n   • Dense retrieval (for semantic similarity)\n   • Sparse retrieval (for exact matches)\n   • Hybrid retrieval (for balanced results)\n   • Graph retrieval (for relationship queries)\n\n2. Ranking Module Options:\n   • BM25 ranking (keyword-based)\n   • Neural reranking (context-aware)\n   • Learning-to-rank (user-feedback optimized)\n   • Multi-criteria ranking (relevance + recency + authority)\n\n3. Filtering Module Options:\n   • Content filtering (inappropriate content)\n   • Temporal filtering (date ranges)\n   • Source filtering (trusted sources only)\n   • Permissions filtering (user access control)\n\n4. Generation Module Options:\n   • Abstractive summarization\n   • Extractive highlighting\n   • Structured response generation\n   • Multi-format output (text, tables, charts)\n\nCustom Configurations:\n• Legal team: Graph retrieval + Authority ranking + Legal filtering + Structured generation\n• Marketing team: Hybrid retrieval + Recency ranking + Brand filtering + Creative generation\n• Support team: Dense retrieval + FAQ ranking + Product filtering + Step-by-step generation\n\nResult: Flexible, customizable RAG system adaptable to different departments and use cases'
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
    id: 'conversational-rag',
    name: 'Conversational RAG',
    abbr: 'CRAG',
    icon: '💬',
    color: 'from-cyan-500 to-blue-600',
    category: 'knowledge-retrieval',
    description: 'Context-aware RAG that maintains conversation history and performs context-dependent retrieval across dialogue turns',
    features: [
      'Conversation context maintenance',
      'Turn-aware retrieval',
      'Coreference resolution',
      'Progressive information building',
      'Context-dependent queries',
      'Memory-enhanced retrieval'
    ],
    useCases: ['chatbots', 'virtual-assistants', 'customer-support', 'educational-tutoring', 'interactive-research'],
    complexity: 'medium',
    example: 'Research Assistant Conversation:\n\nTurn 1:\nUser: "Tell me about machine learning"\nRAG: Retrieves general ML overview\nResponse: "Machine learning is a subset of AI that enables computers to learn from data..."\n\nTurn 2:\nUser: "What about neural networks?"\nContext: User wants ML → Neural Networks (subtopic)\nRAG: Retrieves neural network materials with ML context\nResponse: "Neural networks are a key machine learning technique inspired by biological neurons..."\n\nTurn 3:\nUser: "How do they work in practice?"\nContext: User wants practical neural network applications\nRAG: Retrieves implementation examples, tutorials, case studies\nResponse: "In practice, neural networks are implemented using frameworks like TensorFlow..."\n\nTurn 4:\nUser: "Show me an example"\nContext: User wants concrete neural network code example\nRAG: Retrieves code examples, tutorials specific to previous discussion\nResponse: "Here\'s a simple neural network example in Python..."\n\nConversation Features:\n• Context accumulation across turns\n• Disambiguation using conversation history\n• Progressive depth increase\n• Coherent information flow\n\nResult: Natural, contextual conversation with relevant information building progressively'
  },
  {
    id: 'hierarchical-rag',
    name: 'Hierarchical RAG',
    abbr: 'HRAG',
    icon: '🏗️',
    color: 'from-amber-500 to-orange-600',
    category: 'knowledge-retrieval',
    description: 'Multi-level retrieval system that processes information at different granularity levels from documents to sections to sentences',
    features: [
      'Multi-level document processing',
      'Hierarchical indexing',
      'Granularity-aware retrieval',
      'Top-down information flow',
      'Context inheritance',
      'Level-specific optimization'
    ],
    useCases: ['document-analysis', 'legal-research', 'academic-papers', 'technical-manuals', 'policy-documents'],
    complexity: 'high',
    example: 'Legal Document Analysis:\n\nQuery: "What are the privacy requirements for data processing?"\n\nHierarchical RAG Structure:\n\n1. Document Level (L1):\n   • GDPR Regulation (EU 2016/679)\n   • California Consumer Privacy Act\n   • PIPEDA (Canada Privacy Act)\n   • Relevance: High for privacy requirements\n\n2. Chapter/Section Level (L2):\n   • GDPR Article 6 (Lawfulness of processing)\n   • GDPR Article 7 (Conditions for consent)\n   • CCPA Section 1798.100 (Consumer rights)\n   • Focus: Data processing requirements\n\n3. Article/Subsection Level (L3):\n   • Article 6(1)(a): Consent requirements\n   • Article 6(1)(b): Contract necessity\n   • Article 6(1)(f): Legitimate interests\n   • Granular: Specific legal conditions\n\n4. Paragraph/Sentence Level (L4):\n   • "Consent should be given by a clear affirmative act..."\n   • "Processing shall be lawful only if and to the extent that..."\n   • Precise: Exact legal language\n\nRetrieval Strategy:\n• L1: Identify relevant regulatory frameworks\n• L2: Focus on privacy-specific sections\n• L3: Extract applicable legal articles\n• L4: Capture precise requirements and definitions\n\nResult: Comprehensive privacy requirements analysis from general frameworks down to specific legal language and requirements'
  },
  {
    id: 'chain-of-verification-rag',
    name: 'Chain-of-Verification RAG',
    abbr: 'CoVRAG',
    icon: '🔍',
    color: 'from-red-500 to-pink-600',
    category: 'knowledge-retrieval',
    description: 'Multi-step verification process that validates retrieved information through independent fact-checking and cross-referencing',
    features: [
      'Multi-step fact verification',
      'Independent source validation',
      'Claim decomposition',
      'Evidence triangulation',
      'Contradiction detection',
      'Confidence scoring'
    ],
    useCases: ['fact-checking', 'news-verification', 'research-validation', 'misinformation-detection', 'critical-analysis'],
    complexity: 'high',
    example: 'News Fact Verification:\n\nClaim: "Solar energy installations increased by 40% in 2023 globally"\n\nChain-of-Verification Process:\n\n1. Initial Retrieval:\n   • Source 1: International Energy Agency Report\n   • Source 2: Solar Industry Association Data\n   • Source 3: Bloomberg New Energy Finance\n   • Initial evidence: Mixed statistics\n\n2. Claim Decomposition:\n   • Sub-claim 1: "Solar installations increased in 2023"\n   • Sub-claim 2: "Increase was 40%"\n   • Sub-claim 3: "This was a global figure"\n   • Sub-claim 4: "Timeframe is calendar year 2023"\n\n3. Independent Verification:\n   • Verification 1: IEA confirms global solar growth\n   • Verification 2: Multiple sources cite 38-42% range\n   • Verification 3: Data covers worldwide installations\n   • Verification 4: January-December 2023 period confirmed\n\n4. Cross-Reference Analysis:\n   • Consistency check: ✓ All sources align on significant growth\n   • Precision check: ⚠️ Range varies (38-42%, avg ~40%)\n   • Source reliability: ✓ All sources are authoritative\n   • Data freshness: ✓ Reports from Q1 2024\n\n5. Final Assessment:\n   • Claim accuracy: Substantially correct\n   • Confidence level: 85%\n   • Caveats: Exact percentage varies by source\n   • Supporting evidence: 4/4 sources confirm trend\n\nResult: Verified claim with confidence score, supporting evidence, and appropriate caveats about precision'
  },
  {
    id: 'agentic-rag-systems',
    name: 'Agentic RAG Systems',
    abbr: 'ARS',
    icon: '🤖',
    color: 'from-pink-500 to-red-600',
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
    example: 'Scientific Literature Investigation:\n\nTask: "Investigate the relationship between microbiome diversity and autoimmune diseases"\n\nAgentic RAG Process:\n\n1. Initial Planning:\n   • Agent analyzes query complexity: High\n   • Identifies required knowledge domains: Microbiology, Immunology, Medicine\n   • Plans multi-phase retrieval strategy\n   • Sets quality thresholds and stopping criteria\n\n2. Phase 1 - Foundation Building:\n   • Autonomous search: "microbiome diversity measurement methods"\n   • Retrieves: 15 foundational papers on microbiome analysis\n   • Self-assessment: "Need more recent clinical studies"\n   • Refines query: "microbiome diversity autoimmune 2020-2025"\n\n3. Phase 2 - Relationship Exploration:\n   • Multi-hop reasoning: Identifies gut-brain-immune axis\n   • Expands search: "gut microbiome inflammatory bowel disease"\n   • Cross-references: Finds metabolite pathway connections\n   • Self-reflection: "Missing rheumatoid arthritis connection"\n\n4. Phase 3 - Evidence Synthesis:\n   • Autonomous query: "microbiome therapeutic interventions autoimmune"\n   • Retrieves clinical trial data\n   • Evaluates evidence quality and consistency\n   • Identifies research gaps and controversies\n\n5. Autonomous Quality Control:\n   • Checks for bias in source selection\n   • Verifies claim consistency across sources\n   • Assesses evidence strength and reliability\n   • Generates confidence scores for conclusions\n\nFinal Output:\n• Comprehensive analysis spanning 45 high-quality sources\n• Identified 3 causal mechanisms and 2 therapeutic targets\n• Highlighted 4 promising research directions\n• Generated evidence-based confidence assessments\n\nAdvantages:\n• 90% reduction in human research time\n• Discovered non-obvious connections between domains\n• Systematic coverage of relevant literature\n• Built-in quality control and bias detection'
  }
]; 