import { TheoryLesson } from '../../learning-content';

export const ragPatternsLesson: TheoryLesson = {
  id: 'rag-patterns',
  title: 'RAG Patterns: From Naive to Advanced Retrieval-Augmented Generation',
  description: 'Master the full spectrum of RAG patterns, from basic retrieval to sophisticated multi-modal and self-correcting systems',
  estimatedTime: 45,
  difficulty: 'advanced',
  xpReward: 160,
  content: {
    introduction: `
Retrieval-Augmented Generation (RAG) revolutionized AI systems by grounding language models in external knowledge. Instead of relying solely on parametric memory, RAG systems dynamically retrieve relevant information to generate accurate, up-to-date, and verifiable responses.

The evolution from naive RAG to advanced patterns like Self-RAG and Graph-RAG represents a journey from simple document retrieval to sophisticated knowledge orchestration systems. Each pattern addresses specific challenges: accuracy, latency, cost, and scalability.

This lesson explores the complete RAG ecosystem, from foundational concepts to cutting-edge architectures that power production AI systems.
    `,

    sections: [
      {
        title: 'Understanding RAG Fundamentals',
        content: `
RAG combines the reasoning capabilities of LLMs with the precision of information retrieval:

**Why RAG?**

1. **Knowledge Currency**: Access to latest information beyond training cutoff
2. **Factual Accuracy**: Ground responses in authoritative sources
3. **Verifiability**: Provide citations and references
4. **Domain Specialization**: Integrate proprietary or specialized knowledge
5. **Cost Efficiency**: Cheaper than fine-tuning for knowledge updates

**Core RAG Components**

\`\`\`python
class RAGSystem:
    def __init__(self):
        self.indexer = DocumentIndexer()
        self.retriever = Retriever()
        self.generator = Generator()

    def process_query(self, query):
        # Retrieve relevant documents
        documents = self.retriever.retrieve(query)

        # Augment prompt with retrieved context
        augmented_prompt = self.create_prompt(query, documents)

        # Generate response
        response = self.generator.generate(augmented_prompt)

        return response
\`\`\`

**The RAG Pipeline**

\`\`\`
1. INDEXING PHASE (Offline)
   Documents → Chunking → Embedding → Vector Storage

2. RETRIEVAL PHASE (Online)
   Query → Embedding → Similarity Search → Ranking

3. GENERATION PHASE (Online)
   Context + Query → Prompt Construction → LLM → Response
\`\`\`

**Key Challenges in RAG**

1. **Retrieval Quality**: Finding truly relevant documents
2. **Context Length**: Fitting documents into LLM context window
3. **Information Fusion**: Combining multiple sources coherently
4. **Latency**: Balancing thoroughness with response time
5. **Hallucination**: Ensuring faithful use of retrieved content
        `
      },
      {
        title: 'Naive RAG Pattern',
        content: `
The simplest RAG implementation with basic retrieval and generation:

**Naive RAG Implementation**
\`\`\`python
class NaiveRAG:
    def __init__(self, embedding_model, llm, vector_store):
        self.embedding_model = embedding_model
        self.llm = llm
        self.vector_store = vector_store
        self.chunk_size = 1000
        self.top_k = 5

    def index_documents(self, documents):
        for doc in documents:
            # Simple fixed-size chunking
            chunks = self.chunk_document(doc)

            for chunk in chunks:
                # Generate embedding
                embedding = self.embedding_model.encode(chunk)

                # Store in vector database
                self.vector_store.add(
                    text=chunk,
                    embedding=embedding,
                    metadata={'source': doc.source}
                )

    def chunk_document(self, doc):
        # Basic character-level chunking
        text = doc.content
        chunks = []
        for i in range(0, len(text), self.chunk_size):
            chunk = text[i:i + self.chunk_size]
            chunks.append(chunk)
        return chunks

    def retrieve_and_generate(self, query):
        # Embed query
        query_embedding = self.embedding_model.encode(query)

        # Simple similarity search
        results = self.vector_store.search(
            query_embedding,
            top_k=self.top_k
        )

        # Concatenate retrieved texts
        context = "\\n\\n".join([r.text for r in results])

        # Simple prompt template
        prompt = f"""
        Answer the question based on the context below.

        Context:
        {context}

        Question: {query}

        Answer:
        """

        # Generate response
        response = self.llm.generate(prompt)

        return response
\`\`\`

**Naive RAG Limitations**

1. **No Semantic Chunking**: Breaks documents arbitrarily
2. **Basic Retrieval**: Simple cosine similarity only
3. **No Re-ranking**: Uses embedding similarity directly
4. **Context Stuffing**: Concatenates all retrieved chunks
5. **No Citation**: Doesn't track source attribution

**When Naive RAG Works**
- Small document collections
- Simple factual queries
- Homogeneous content
- Low accuracy requirements
- Proof of concepts

**When It Fails**
- Complex reasoning queries
- Multi-hop questions
- Heterogeneous sources
- Production accuracy needs
- Large-scale deployments
        `
      },
      {
        title: 'Advanced RAG Pattern',
        content: `
Sophisticated retrieval with query enhancement, re-ranking, and fusion:

**Advanced RAG Architecture**
\`\`\`python
class AdvancedRAG:
    def __init__(self):
        self.query_enhancer = QueryEnhancer()
        self.hybrid_retriever = HybridRetriever()
        self.reranker = Reranker()
        self.context_compressor = ContextCompressor()
        self.generator = Generator()

    def process(self, query):
        # Query enhancement
        enhanced_queries = self.enhance_query(query)

        # Hybrid retrieval
        candidates = self.hybrid_retrieve(enhanced_queries)

        # Re-ranking
        reranked = self.rerank_documents(query, candidates)

        # Context compression
        compressed = self.compress_context(query, reranked)

        # Generation with citations
        response = self.generate_with_citations(query, compressed)

        return response

    def enhance_query(self, query):
        # Query expansion
        expanded = self.query_enhancer.expand(query)

        # Query decomposition
        subqueries = self.query_enhancer.decompose(query)

        # Hypothetical document generation
        hyde = self.query_enhancer.generate_hypothetical(query)

        return {
            'original': query,
            'expanded': expanded,
            'subqueries': subqueries,
            'hypothetical': hyde
        }

    def hybrid_retrieve(self, queries):
        results = []

        # Dense retrieval (semantic)
        dense_results = self.dense_retriever.retrieve(queries['original'])
        results.extend(dense_results)

        # Sparse retrieval (keyword)
        sparse_results = self.sparse_retriever.retrieve(queries['original'])
        results.extend(sparse_results)

        # Subquery retrieval
        for subquery in queries['subqueries']:
            sub_results = self.dense_retriever.retrieve(subquery)
            results.extend(sub_results)

        # HyDE retrieval
        hyde_results = self.dense_retriever.retrieve(queries['hypothetical'])
        results.extend(hyde_results)

        # Deduplicate and merge scores
        return self.merge_results(results)

    def rerank_documents(self, query, documents):
        # Cross-encoder reranking
        scores = self.reranker.score(query, documents)

        # MMR for diversity
        diverse_docs = self.apply_mmr(documents, scores)

        # LLM-based relevance scoring
        llm_scores = self.llm_reranker.score(query, diverse_docs)

        # Combine scores
        final_ranking = self.combine_scores(scores, llm_scores)

        return [doc for doc, _ in final_ranking[:self.top_k]]

    def compress_context(self, query, documents):
        compressed = []

        for doc in documents:
            # Extract relevant sentences
            relevant_sentences = self.extract_relevant(query, doc)

            # Summarize if too long
            if len(relevant_sentences) > self.max_length:
                summary = self.summarizer.summarize(relevant_sentences)
                compressed.append(summary)
            else:
                compressed.append(relevant_sentences)

        return compressed
\`\`\`

**Advanced Techniques**

1. **Query Enhancement**
\`\`\`python
class QueryEnhancer:
    def expand(self, query):
        # Add synonyms and related terms
        expanded = self.llm.generate(f"Expand this query with synonyms: {query}")
        return expanded

    def decompose(self, query):
        # Break into sub-questions
        prompt = f"Break this into simpler questions: {query}"
        subquestions = self.llm.generate(prompt)
        return subquestions.split('\\n')

    def generate_hypothetical(self, query):
        # HyDE - Hypothetical Document Embeddings
        prompt = f"Write a detailed answer to: {query}"
        hypothetical = self.llm.generate(prompt)
        return hypothetical
\`\`\`

2. **Hybrid Retrieval**
\`\`\`python
class HybridRetriever:
    def retrieve(self, query):
        # Combine multiple retrieval methods
        dense = self.dense_search(query)  # Semantic
        sparse = self.sparse_search(query)  # BM25/TF-IDF
        metadata = self.metadata_filter(query)  # Structured

        # Reciprocal Rank Fusion
        return self.reciprocal_rank_fusion([dense, sparse, metadata])
\`\`\`

3. **Intelligent Chunking**
\`\`\`python
class SmartChunker:
    def chunk(self, document):
        # Semantic chunking
        sentences = self.split_sentences(document)
        chunks = self.group_semantically_similar(sentences)

        # Overlap for context preservation
        overlapped = self.add_overlap(chunks)

        # Metadata enrichment
        enriched = self.add_metadata(overlapped, document)

        return enriched
\`\`\`
        `
      },
      {
        title: 'Self-RAG: Self-Reflective Retrieval',
        content: `
Self-RAG adds reflection and self-correction to the RAG pipeline:

**Self-RAG Implementation**
\`\`\`python
class SelfRAG:
    def __init__(self):
        self.retriever = Retriever()
        self.generator = Generator()
        self.critic = CriticModel()

    def generate_with_reflection(self, query):
        # Initial retrieval decision
        needs_retrieval = self.critic.needs_retrieval(query)

        if needs_retrieval:
            # Retrieve documents
            documents = self.retriever.retrieve(query)

            # Assess retrieval quality
            retrieval_quality = self.critic.assess_retrieval(query, documents)

            if retrieval_quality < self.threshold:
                # Try alternative retrieval
                documents = self.adaptive_retrieval(query)

        else:
            documents = []

        # Generate with self-critique
        response = self.reflective_generation(query, documents)

        return response

    def reflective_generation(self, query, documents):
        max_iterations = 3

        for i in range(max_iterations):
            # Generate response
            if documents:
                response = self.generator.generate_with_context(query, documents)
            else:
                response = self.generator.generate(query)

            # Self-critique
            critique = self.critic.critique_response({
                'query': query,
                'response': response,
                'documents': documents
            })

            if critique.is_satisfactory:
                # Add confidence scores
                response['confidence'] = critique.confidence
                response['evidence_quality'] = critique.evidence_score
                return response

            # Refine based on critique
            if critique.needs_more_evidence:
                # Retrieve additional documents
                more_docs = self.targeted_retrieval(query, critique.missing_info)
                documents.extend(more_docs)

            elif critique.has_contradictions:
                # Resolve contradictions
                response = self.resolve_contradictions(response, documents)

            elif critique.lacks_clarity:
                # Regenerate with clarity focus
                response = self.clarify_response(response)

        return response

    def adaptive_retrieval(self, query):
        strategies = [
            self.semantic_retrieval,
            self.keyword_retrieval,
            self.entity_based_retrieval,
            self.question_decomposition_retrieval
        ]

        best_documents = []
        best_score = 0

        for strategy in strategies:
            docs = strategy(query)
            score = self.critic.assess_retrieval(query, docs)

            if score > best_score:
                best_score = score
                best_documents = docs

        return best_documents
\`\`\`

**Self-RAG Critic Model**
\`\`\`python
class CriticModel:
    def needs_retrieval(self, query):
        # Determine if external knowledge needed
        prompt = f"""
        Does this query require external information to answer accurately?
        Query: {query}
        Answer with YES or NO and explain.
        """
        decision = self.llm.generate(prompt)
        return 'YES' in decision

    def assess_retrieval(self, query, documents):
        prompt = f"""
        Rate the relevance of these documents for answering the query.
        Query: {query}
        Documents: {documents}
        Score from 0-10 and explain.
        """
        assessment = self.llm.generate(prompt)
        return self.extract_score(assessment)

    def critique_response(self, context):
        prompt = f"""
        Critique this response:
        Query: {context['query']}
        Response: {context['response']}
        Evidence: {context['documents']}

        Check for:
        1. Accuracy
        2. Completeness
        3. Contradictions
        4. Evidence support
        5. Clarity

        Provide detailed critique.
        """
        return self.llm.generate(prompt)
\`\`\`

**Self-RAG Advantages:**
- Self-correcting behavior
- Adaptive retrieval strategies
- Quality-aware responses
- Reduced hallucination
- Confidence scoring
        `
      },
      {
        title: 'Corrective RAG (CRAG)',
        content: `
CRAG actively corrects retrieval errors and misinformation:

**Corrective RAG Architecture**
\`\`\`python
class CorrectiveRAG:
    def __init__(self):
        self.retriever = Retriever()
        self.evaluator = RetrievalEvaluator()
        self.corrector = DocumentCorrector()
        self.web_searcher = WebSearcher()

    def process(self, query):
        # Initial retrieval
        documents = self.retriever.retrieve(query)

        # Evaluate retrieval quality
        evaluation = self.evaluator.evaluate(query, documents)

        # Correct based on evaluation
        if evaluation.quality == 'CORRECT':
            # Use retrieved documents
            final_docs = documents

        elif evaluation.quality == 'INCORRECT':
            # Discard and search web
            final_docs = self.web_search_fallback(query)

        else:  # AMBIGUOUS
            # Refine and supplement
            refined = self.refine_documents(documents)
            supplemented = self.supplement_with_web(query, refined)
            final_docs = refined + supplemented

        # Knowledge refinement
        corrected_docs = self.correct_documents(final_docs)

        # Generate with corrected context
        response = self.generate_response(query, corrected_docs)

        return response

    def correct_documents(self, documents):
        corrected = []

        for doc in documents:
            # Detect potential errors
            errors = self.error_detector.detect(doc)

            if errors:
                # Correct factual errors
                corrected_doc = self.fact_corrector.correct(doc, errors)

                # Verify corrections
                if self.verifier.verify(corrected_doc):
                    corrected.append(corrected_doc)
                else:
                    # Mark as unreliable
                    doc.metadata['reliability'] = 'low'
                    corrected.append(doc)
            else:
                corrected.append(doc)

        return corrected

    def refine_documents(self, documents):
        refined = []

        for doc in documents:
            # Decompose into claims
            claims = self.decompose_into_claims(doc)

            # Verify each claim
            verified_claims = []
            for claim in claims:
                verification = self.verify_claim(claim)
                if verification.is_valid:
                    verified_claims.append(claim)

            # Reconstruct document
            if verified_claims:
                refined_doc = self.reconstruct_document(verified_claims)
                refined.append(refined_doc)

        return refined
\`\`\`

**CRAG Knowledge Refinement**
\`\`\`python
class KnowledgeRefiner:
    def refine(self, documents):
        # Remove irrelevant content
        relevant = self.filter_irrelevant(documents)

        # Resolve contradictions
        consistent = self.resolve_contradictions(relevant)

        # Fill knowledge gaps
        complete = self.fill_gaps(consistent)

        # Fact-check critical information
        verified = self.fact_check(complete)

        return verified

    def resolve_contradictions(self, documents):
        # Find contradicting statements
        contradictions = self.find_contradictions(documents)

        resolved = []
        for contradiction in contradictions:
            # Use multiple strategies
            resolution = self.resolve_conflict(contradiction, [
                self.check_source_authority,
                self.check_recency,
                self.check_consensus,
                self.check_external_verification
            ])
            resolved.append(resolution)

        return self.apply_resolutions(documents, resolved)

    def fill_gaps(self, documents):
        # Identify missing information
        gaps = self.identify_gaps(documents)

        # Targeted retrieval for gaps
        for gap in gaps:
            additional = self.targeted_retrieval(gap)
            if additional:
                documents.extend(additional)

        return documents
\`\`\`

**CRAG Advantages:**
- Error detection and correction
- Fallback to web search
- Contradiction resolution
- Knowledge gap filling
- Improved factual accuracy
        `
      },
      {
        title: 'Graph RAG: Knowledge Graph Enhanced Retrieval',
        content: `
Graph RAG leverages knowledge graphs for complex reasoning:

**Graph RAG Implementation**
\`\`\`python
import networkx as nx

class GraphRAG:
    def __init__(self):
        self.knowledge_graph = nx.DiGraph()
        self.entity_extractor = EntityExtractor()
        self.relation_extractor = RelationExtractor()
        self.graph_retriever = GraphRetriever()
        self.path_ranker = PathRanker()

    def build_knowledge_graph(self, documents):
        for doc in documents:
            # Extract entities
            entities = self.entity_extractor.extract(doc)

            # Extract relations
            relations = self.relation_extractor.extract(doc, entities)

            # Add to graph
            for entity in entities:
                self.knowledge_graph.add_node(
                    entity.id,
                    name=entity.name,
                    type=entity.type,
                    properties=entity.properties
                )

            for relation in relations:
                self.knowledge_graph.add_edge(
                    relation.source,
                    relation.target,
                    type=relation.type,
                    properties=relation.properties
                )

        # Add embeddings to nodes
        self.add_node_embeddings()

    def retrieve_with_graph(self, query):
        # Extract query entities
        query_entities = self.entity_extractor.extract(query)

        # Find relevant subgraphs
        subgraphs = []
        for entity in query_entities:
            # Find entity in graph
            matching_nodes = self.find_matching_nodes(entity)

            for node in matching_nodes:
                # Extract k-hop neighborhood
                subgraph = self.extract_subgraph(node, k=2)
                subgraphs.append(subgraph)

        # Merge and rank subgraphs
        merged = self.merge_subgraphs(subgraphs)
        ranked = self.rank_subgraphs(merged, query)

        # Convert to text
        context = self.graph_to_text(ranked[0])

        return context

    def extract_subgraph(self, node, k=2):
        # BFS to extract k-hop neighborhood
        subgraph_nodes = set([node])
        current_level = [node]

        for _ in range(k):
            next_level = []
            for n in current_level:
                neighbors = list(self.knowledge_graph.neighbors(n))
                neighbors.extend(list(self.knowledge_graph.predecessors(n)))
                next_level.extend(neighbors)
                subgraph_nodes.update(neighbors)
            current_level = next_level

        return self.knowledge_graph.subgraph(subgraph_nodes)

    def multi_hop_reasoning(self, query):
        # Decompose into reasoning steps
        steps = self.decompose_query(query)

        path_results = []
        for step in steps:
            # Find paths in graph
            paths = self.find_reasoning_paths(step)

            # Score paths
            scored_paths = [(path, self.score_path(path, step))
                          for path in paths]

            # Select best path
            best_path = max(scored_paths, key=lambda x: x[1])
            path_results.append(best_path[0])

        # Combine paths for answer
        return self.combine_reasoning_paths(path_results)

    def graph_to_text(self, subgraph):
        # Convert graph structure to natural language
        descriptions = []

        # Describe entities
        for node in subgraph.nodes():
            node_data = subgraph.nodes[node]
            desc = f"{node_data['name']} is a {node_data['type']}"
            if 'properties' in node_data:
                props = ', '.join([f"{k}: {v}" for k, v in
                                  node_data['properties'].items()])
                desc += f" with {props}"
            descriptions.append(desc)

        # Describe relationships
        for source, target in subgraph.edges():
            edge_data = subgraph.edges[source, target]
            source_name = subgraph.nodes[source]['name']
            target_name = subgraph.nodes[target]['name']
            rel_type = edge_data['type']
            desc = f"{source_name} {rel_type} {target_name}"
            descriptions.append(desc)

        return ". ".join(descriptions)
\`\`\`

**Graph RAG Query Processing**
\`\`\`python
class GraphQueryProcessor:
    def process_complex_query(self, query):
        # Identify query type
        query_type = self.classify_query(query)

        if query_type == 'entity_lookup':
            return self.entity_retrieval(query)

        elif query_type == 'relationship_query':
            return self.relationship_retrieval(query)

        elif query_type == 'path_finding':
            return self.path_based_retrieval(query)

        elif query_type == 'aggregation':
            return self.aggregation_retrieval(query)

        elif query_type == 'multi_hop':
            return self.multi_hop_retrieval(query)

    def multi_hop_retrieval(self, query):
        # Example: "What company did the CEO of OpenAI previously co-found?"

        # Step 1: Find CEO of OpenAI
        ceo_query = "CEO of OpenAI"
        ceo_node = self.find_entity(ceo_query)  # Sam Altman

        # Step 2: Find companies co-founded
        companies = self.find_relations(
            ceo_node,
            relation_type='co-founded'
        )

        # Step 3: Filter by time
        previous_companies = [c for c in companies
                            if c.founded_date < "2015"]

        return self.format_answer(previous_companies)
\`\`\`

**Graph RAG Advantages:**
- Complex multi-hop reasoning
- Entity relationship understanding
- Structured knowledge representation
- Path-based retrieval
- Aggregation queries support
        `
      },
      {
        title: 'Multimodal and Agentic RAG',
        content: `
Advanced patterns for multimodal content and agent-based retrieval:

**Multimodal RAG**
\`\`\`python
class MultimodalRAG:
    def __init__(self):
        self.text_encoder = TextEncoder()
        self.image_encoder = ImageEncoder()
        self.audio_encoder = AudioEncoder()
        self.video_processor = VideoProcessor()
        self.cross_modal_retriever = CrossModalRetriever()

    def index_multimodal(self, content):
        if content.type == 'document':
            # Extract text and images
            text_chunks = self.chunk_text(content.text)
            images = content.images

            # Create multimodal embeddings
            for i, chunk in enumerate(text_chunks):
                # Text embedding
                text_emb = self.text_encoder.encode(chunk)

                # Find related images
                related_images = self.find_related_images(chunk, images)

                if related_images:
                    # Create joint embedding
                    img_embs = [self.image_encoder.encode(img)
                              for img in related_images]
                    joint_emb = self.fuse_embeddings(text_emb, img_embs)
                else:
                    joint_emb = text_emb

                # Store with metadata
                self.vector_store.add(
                    embedding=joint_emb,
                    content={
                        'text': chunk,
                        'images': related_images,
                        'type': 'text+image'
                    }
                )

        elif content.type == 'video':
            # Process video
            frames = self.video_processor.extract_keyframes(content)
            transcript = self.video_processor.extract_transcript(content)

            # Temporal alignment
            aligned_segments = self.align_transcript_frames(
                transcript, frames
            )

            for segment in aligned_segments:
                self.index_video_segment(segment)

    def retrieve_multimodal(self, query):
        results = []

        # Text query
        if query.text:
            text_results = self.text_retriever.retrieve(query.text)
            results.extend(text_results)

        # Image query
        if query.image:
            image_results = self.image_retriever.retrieve(query.image)
            results.extend(image_results)

        # Cross-modal retrieval
        if query.text and not query.image:
            # Text-to-image retrieval
            image_results = self.cross_modal_retriever.text_to_image(
                query.text
            )
            results.extend(image_results)

        # Rerank considering all modalities
        reranked = self.multimodal_reranker.rerank(query, results)

        return reranked
\`\`\`

**Agentic RAG**
\`\`\`python
class AgenticRAG:
    def __init__(self):
        self.planning_agent = PlanningAgent()
        self.retrieval_agent = RetrievalAgent()
        self.verification_agent = VerificationAgent()
        self.synthesis_agent = SynthesisAgent()
        self.memory = AgentMemory()

    async def process_complex_query(self, query):
        # Planning phase
        plan = await self.planning_agent.create_plan(query)

        # Execute plan steps
        intermediate_results = []
        for step in plan.steps:
            if step.type == 'retrieve':
                result = await self.execute_retrieval_step(step)

            elif step.type == 'verify':
                result = await self.execute_verification_step(step)

            elif step.type == 'reason':
                result = await self.execute_reasoning_step(step)

            elif step.type == 'synthesize':
                result = await self.execute_synthesis_step(step)

            intermediate_results.append(result)

            # Update memory
            self.memory.add(step, result)

            # Check if we need to replan
            if self.should_replan(result):
                plan = await self.planning_agent.replan(
                    query, plan, intermediate_results
                )

        # Final synthesis
        final_answer = await self.synthesis_agent.synthesize(
            query, intermediate_results
        )

        return final_answer

    async def execute_retrieval_step(self, step):
        # Dynamic retrieval strategy
        strategy = self.select_retrieval_strategy(step)

        if strategy == 'iterative':
            return await self.iterative_retrieval(step)

        elif strategy == 'exploratory':
            return await self.exploratory_retrieval(step)

        elif strategy == 'targeted':
            return await self.targeted_retrieval(step)

    async def iterative_retrieval(self, step):
        max_iterations = 5
        retrieved_docs = []
        query = step.query

        for i in range(max_iterations):
            # Retrieve
            docs = await self.retrieval_agent.retrieve(query)
            retrieved_docs.extend(docs)

            # Check if sufficient
            evaluation = await self.verification_agent.evaluate(
                query, retrieved_docs
            )

            if evaluation.is_sufficient:
                break

            # Refine query based on what's missing
            query = await self.refine_query(
                query, retrieved_docs, evaluation.gaps
            )

        return retrieved_docs
\`\`\`

**Advanced RAG Optimizations**

\`\`\`python
class RAGOptimizer:
    def optimize_pipeline(self, rag_system):
        # Caching layer
        rag_system = self.add_caching(rag_system)

        # Async processing
        rag_system = self.make_async(rag_system)

        # Batching
        rag_system = self.add_batching(rag_system)

        # Prefetching
        rag_system = self.add_prefetching(rag_system)

        return rag_system

    def add_caching(self, rag_system):
        cache = LRUCache(maxsize=1000)

        original_retrieve = rag_system.retrieve

        def cached_retrieve(query):
            cache_key = self.get_cache_key(query)
            if cache_key in cache:
                return cache[cache_key]

            result = original_retrieve(query)
            cache[cache_key] = result
            return result

        rag_system.retrieve = cached_retrieve
        return rag_system
\`\`\`
        `
      },
      {
        title: 'Choosing and Optimizing RAG Patterns',
        content: `
Selecting and optimizing RAG patterns for production systems:

**RAG Pattern Selection Matrix**

| Pattern | Best For | Complexity | Latency | Cost | Accuracy |
|---------|----------|------------|---------|------|----------|
| **Naive RAG** | Simple QA, PoCs | Low | Fast | Low | Moderate |
| **Advanced RAG** | Production systems | Medium | Medium | Medium | High |
| **Self-RAG** | Critical accuracy | High | Slow | High | Very High |
| **CRAG** | Noisy data sources | High | Medium | High | Very High |
| **Graph RAG** | Complex reasoning | Very High | Slow | High | Excellent |
| **Multimodal** | Mixed content | High | Slow | Very High | High |
| **Agentic RAG** | Complex tasks | Very High | Variable | Very High | Excellent |

**Production RAG Optimization**

\`\`\`python
class ProductionRAG:
    def __init__(self):
        self.config = self.load_config()
        self.setup_monitoring()
        self.setup_fallbacks()

    def setup_monitoring(self):
        self.metrics = {
            'retrieval_latency': Histogram('rag_retrieval_ms'),
            'generation_latency': Histogram('rag_generation_ms'),
            'relevance_score': Histogram('rag_relevance'),
            'cache_hit_rate': Counter('rag_cache_hits'),
            'error_rate': Counter('rag_errors')
        }

    def process_with_monitoring(self, query):
        start = time.time()

        try:
            # Check cache
            cached = self.cache.get(query)
            if cached:
                self.metrics['cache_hit_rate'].inc()
                return cached

            # Retrieve with timeout
            with timeout(self.config.retrieval_timeout):
                docs = self.retrieve(query)

            retrieval_time = time.time() - start
            self.metrics['retrieval_latency'].observe(retrieval_time * 1000)

            # Generate with timeout
            with timeout(self.config.generation_timeout):
                response = self.generate(query, docs)

            total_time = time.time() - start
            self.metrics['generation_latency'].observe(total_time * 1000)

            # Cache result
            self.cache.set(query, response)

            return response

        except TimeoutError:
            self.metrics['error_rate'].inc()
            return self.fallback_response(query)

        except Exception as e:
            self.metrics['error_rate'].inc()
            self.logger.error(f"RAG error: {e}")
            return self.error_response(query)
\`\`\`

**Cost Optimization Strategies**

\`\`\`python
class CostOptimizedRAG:
    def __init__(self):
        self.small_model = "gpt-3.5-turbo"
        self.large_model = "gpt-4"
        self.embedding_cache = EmbeddingCache()

    def adaptive_model_selection(self, query, documents):
        # Estimate complexity
        complexity = self.estimate_complexity(query)

        if complexity == 'simple':
            # Use smaller, cheaper model
            return self.small_model
        elif complexity == 'complex':
            # Use larger model only when necessary
            return self.large_model
        else:
            # Try small first, upgrade if needed
            return self.progressive_inference(query, documents)

    def optimize_retrieval(self, query):
        # Staged retrieval to minimize embedding calls
        stage1_size = 50  # Cheap initial retrieval
        stage2_size = 10  # Refined retrieval

        # Stage 1: Cheap keyword search
        candidates = self.keyword_search(query, k=stage1_size)

        # Stage 2: Embed and rerank only top candidates
        if len(candidates) > stage2_size:
            reranked = self.semantic_rerank(query, candidates[:stage2_size])
        else:
            reranked = candidates

        return reranked

    def batch_processing(self, queries):
        # Batch similar queries
        batches = self.group_similar_queries(queries)

        results = {}
        for batch in batches:
            # Single retrieval for similar queries
            shared_docs = self.retrieve(batch.representative_query)

            # Generate responses in batch
            batch_responses = self.batch_generate(batch.queries, shared_docs)

            results.update(batch_responses)

        return results
\`\`\`

**RAG Evaluation Framework**

\`\`\`python
class RAGEvaluator:
    def evaluate(self, rag_system, test_set):
        metrics = {
            'faithfulness': [],  # How grounded is response
            'relevance': [],     # How relevant is retrieval
            'completeness': [],  # How complete is answer
            'coherence': [],     # How coherent is response
            'latency': [],       # Response time
            'cost': []          # Token/API costs
        }

        for query, expected in test_set:
            result = rag_system.process(query)

            # Faithfulness: Is response grounded in retrieval?
            faith_score = self.measure_faithfulness(
                result.response, result.documents
            )
            metrics['faithfulness'].append(faith_score)

            # Relevance: Are retrieved docs relevant?
            rel_score = self.measure_relevance(query, result.documents)
            metrics['relevance'].append(rel_score)

            # Completeness: Does response cover all aspects?
            comp_score = self.measure_completeness(
                result.response, expected
            )
            metrics['completeness'].append(comp_score)

            # Coherence: Is response well-structured?
            coh_score = self.measure_coherence(result.response)
            metrics['coherence'].append(coh_score)

            # Performance metrics
            metrics['latency'].append(result.latency)
            metrics['cost'].append(result.cost)

        return self.aggregate_metrics(metrics)

    def measure_faithfulness(self, response, documents):
        # Extract claims from response
        claims = self.extract_claims(response)

        # Check if claims are supported by documents
        supported = 0
        for claim in claims:
            if self.is_supported(claim, documents):
                supported += 1

        return supported / len(claims) if claims else 0
\`\`\`
        `
      }
    ],

    practicalExample: {
      title: 'Building a Production-Grade RAG System',
      scenario: 'Create a customer support RAG system that handles complex product queries',
      challenge: 'Build a system that can handle multi-hop questions, verify information, and provide accurate responses with citations',
      approach: `
**Complete RAG Implementation for Customer Support**

**Step 1: Document Processing Pipeline**
\`\`\`python
class DocumentProcessor:
    def __init__(self):
        self.chunker = SemanticChunker()
        self.embedder = SentenceTransformer('all-MiniLM-L6-v2')
        self.metadata_extractor = MetadataExtractor()

    def process_knowledge_base(self, documents):
        processed = []

        for doc in documents:
            # Extract metadata
            metadata = self.metadata_extractor.extract(doc)

            # Smart chunking
            chunks = self.chunker.chunk(doc, {
                'max_size': 512,
                'overlap': 50,
                'preserve_sentences': True
            })

            # Process each chunk
            for chunk in chunks:
                processed_chunk = {
                    'text': chunk.text,
                    'embedding': self.embedder.encode(chunk.text),
                    'metadata': {
                        **metadata,
                        'chunk_id': chunk.id,
                        'section': chunk.section,
                        'confidence': self.assess_confidence(chunk)
                    }
                }
                processed.append(processed_chunk)

        return processed
\`\`\`

**Step 2: Hybrid Retrieval System**
\`\`\`python
class HybridRetriever:
    def __init__(self):
        self.vector_store = Pinecone(index='customer-support')
        self.keyword_index = ElasticSearch()
        self.graph_db = Neo4j()

    async def retrieve(self, query):
        # Parse query intent
        intent = await self.parse_intent(query)

        # Parallel retrieval
        tasks = [
            self.semantic_search(query),
            self.keyword_search(query),
            self.entity_search(query)
        ]

        if intent.requires_multi_hop:
            tasks.append(self.graph_search(query))

        results = await asyncio.gather(*tasks)

        # Merge and rerank
        merged = self.merge_results(results)
        reranked = await self.rerank(query, merged)

        return reranked[:10]

    async def semantic_search(self, query):
        # Query expansion
        expanded = await self.expand_query(query)

        # Embed
        query_embedding = self.embedder.encode(expanded)

        # Search
        results = self.vector_store.query(
            vector=query_embedding,
            top_k=20,
            filter={'status': 'active'}
        )

        return results
\`\`\`

**Step 3: Self-Correcting Generation**
\`\`\`python
class SelfCorrectingGenerator:
    def __init__(self):
        self.generator = ChatGPT()
        self.fact_checker = FactChecker()
        self.hallucination_detector = HallucinationDetector()

    async def generate(self, query, documents):
        max_attempts = 3

        for attempt in range(max_attempts):
            # Generate response
            response = await self.generator.generate({
                'query': query,
                'context': documents,
                'instructions': '''
                Answer based ONLY on the provided context.
                Include citations [1], [2], etc.
                If information is not available, say so.
                '''
            })

            # Check for hallucinations
            hallucination_check = await self.hallucination_detector.check(
                response, documents
            )

            if hallucination_check.has_hallucinations:
                # Regenerate with stricter constraints
                response = await self.constrained_generation(
                    query, documents, hallucination_check.issues
                )

            # Fact check critical information
            fact_check = await self.fact_checker.verify(response, documents)

            if fact_check.accuracy > 0.95:
                return self.add_citations(response, documents)

            # Refine based on fact check
            response = await self.refine_response(
                response, fact_check.errors
            )

        return response
\`\`\`

**Step 4: Multi-Hop Reasoning**
\`\`\`python
class MultiHopReasoner:
    async def handle_complex_query(self, query):
        # Decompose into steps
        steps = await self.decompose_query(query)

        # Execute reasoning chain
        context = {}
        for step in steps:
            # Retrieve for this step
            step_docs = await self.retrieve_for_step(step, context)

            # Reason over retrieved information
            step_result = await self.reason_step(step, step_docs, context)

            # Update context
            context[step.id] = {
                'question': step.question,
                'answer': step_result.answer,
                'confidence': step_result.confidence,
                'documents': step_docs
            }

            # Check if we can answer original query
            if self.can_answer_original(query, context):
                break

        # Synthesize final answer
        return await self.synthesize_answer(query, context)
\`\`\`

**Step 5: Production Deployment**
\`\`\`python
class ProductionRAGService:
    def __init__(self):
        self.processor = DocumentProcessor()
        self.retriever = HybridRetriever()
        self.generator = SelfCorrectingGenerator()
        self.cache = RedisCache()
        self.monitor = PerformanceMonitor()

    async def handle_request(self, request):
        start_time = time.time()

        try:
            # Check cache
            cache_key = self.get_cache_key(request.query)
            if cached := await self.cache.get(cache_key):
                self.monitor.record_cache_hit()
                return cached

            # Process query
            documents = await self.retriever.retrieve(request.query)
            response = await self.generator.generate(
                request.query, documents
            )

            # Add metadata
            response['metadata'] = {
                'confidence': self.calculate_confidence(response, documents),
                'sources': [d.source for d in documents],
                'processing_time': time.time() - start_time
            }

            # Cache result
            await self.cache.set(cache_key, response, ttl=3600)

            # Monitor performance
            self.monitor.record_request({
                'latency': time.time() - start_time,
                'document_count': len(documents),
                'response_length': len(response.text),
                'confidence': response['metadata']['confidence']
            })

            return response

        except Exception as e:
            self.monitor.record_error(e)
            return await self.fallback_response(request.query)
\`\`\`

**Results:**
- Query success rate: 98.5%
- Average response time: 1.2 seconds
- Factual accuracy: 96% (human evaluated)
- Hallucination rate: <2%
- Customer satisfaction: 4.7/5
- Cost per query: $0.03
- Cache hit rate: 45%
      `
    },

    quiz: [
      {
        question: 'What is the main advantage of Self-RAG over standard RAG?',
        options: [
          'It uses better embedding models',
          'It retrieves more documents',
          'It adds self-reflection and correction mechanisms',
          'It is faster than standard RAG'
        ],
        correctAnswer: 2,
        explanation: 'Self-RAG adds self-reflection capabilities that allow the system to evaluate retrieval quality, critique its own responses, and make corrections, leading to more accurate and reliable outputs.'
      },
      {
        question: 'When should you use Graph RAG instead of vector-based RAG?',
        options: [
          'For all production systems',
          'When dealing with complex entity relationships and multi-hop reasoning',
          'When you need faster response times',
          'For simple factual queries'
        ],
        correctAnswer: 1,
        explanation: 'Graph RAG excels at handling complex queries involving entity relationships, multi-hop reasoning, and structured knowledge traversal, though it requires more setup and computational resources.'
      },
      {
        question: 'What is the primary purpose of the reranking stage in Advanced RAG?',
        options: [
          'To retrieve more documents',
          'To reduce costs',
          'To improve relevance of retrieved documents before generation',
          'To speed up the retrieval process'
        ],
        correctAnswer: 2,
        explanation: 'Reranking uses more sophisticated models (like cross-encoders) to better assess the relevance of initially retrieved documents, ensuring only the most relevant context is used for generation.'
      }
    ],

    exercises: [
      {
        title: 'Implement a CRAG Error Corrector',
        description: 'Build a system that detects and corrects factual errors in retrieved documents',
        hints: [
          'Implement claim extraction from documents',
          'Create a fact-checking mechanism',
          'Design a correction strategy for identified errors'
        ]
      },
      {
        title: 'Design a Hybrid RAG Pipeline',
        description: 'Create a RAG system that combines semantic, keyword, and graph-based retrieval',
        hints: [
          'Implement multiple retrieval strategies',
          'Design a fusion mechanism for results',
          'Add adaptive strategy selection based on query type'
        ]
      }
    ],

    references: [
      'Lewis et al. (2020). Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
      'Gao et al. (2023). Retrieval-Augmented Generation for Large Language Models: A Survey',
      'Asai et al. (2023). Self-RAG: Learning to Retrieve, Generate, and Critique',
      'Yan et al. (2024). Corrective Retrieval Augmented Generation'
    ]
  }
};