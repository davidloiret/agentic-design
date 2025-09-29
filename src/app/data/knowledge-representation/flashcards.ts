import { Flashcard } from '../learning-content';

// Set Theory Flashcards
export const setNotationFlashcards: Flashcard[] = [
  {
    id: 'fc-set-definition',
    front: 'What is a set?',
    back: 'A set is an unordered collection of distinct objects. Objects in a set are called elements or members. Example: {1, 2, 3} is a set containing three numbers.',
    difficulty: 'easy',
    topic: 'Set Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-set-notation',
    front: 'What does ∈ mean in set notation?',
    back: '∈ means "is an element of" or "belongs to". Example: 3 ∈ {1, 2, 3} means "3 is an element of the set {1, 2, 3}"',
    difficulty: 'easy',
    topic: 'Set Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-empty-set',
    front: 'What is the empty set?',
    back: 'The empty set (∅ or {}) is a set containing no elements. It is a subset of every set and is unique.',
    difficulty: 'easy',
    topic: 'Set Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-cardinality',
    front: 'What is the cardinality of a set?',
    back: 'Cardinality is the number of elements in a set, denoted |A|. Example: |{1, 2, 3}| = 3',
    difficulty: 'easy',
    topic: 'Set Theory',
    reviewCount: 0,
    correctCount: 0
  }
];

export const setOperationsFlashcards: Flashcard[] = [
  {
    id: 'fc-union',
    front: 'What is set union (∪)?',
    back: 'Union combines all elements from both sets. A ∪ B = {x | x ∈ A or x ∈ B}. Example: {1,2} ∪ {2,3} = {1,2,3}',
    difficulty: 'easy',
    topic: 'Set Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-intersection',
    front: 'What is set intersection (∩)?',
    back: 'Intersection contains only elements in both sets. A ∩ B = {x | x ∈ A and x ∈ B}. Example: {1,2} ∩ {2,3} = {2}',
    difficulty: 'easy',
    topic: 'Set Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-difference',
    front: 'What is set difference (−)?',
    back: 'A − B contains elements in A but not in B. A − B = {x | x ∈ A and x ∉ B}. Example: {1,2,3} − {2,3} = {1}',
    difficulty: 'easy',
    topic: 'Set Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-complement',
    front: 'What is set complement (A\')?',
    back: 'Complement contains all elements not in A (relative to universal set U). A\' = U − A. If U={1,2,3,4} and A={1,2}, then A\'={3,4}',
    difficulty: 'medium',
    topic: 'Set Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-subset',
    front: 'What is a subset (⊆)?',
    back: 'A ⊆ B means every element of A is also in B. Example: {1,2} ⊆ {1,2,3}. Every set is a subset of itself.',
    difficulty: 'easy',
    topic: 'Set Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-powerset',
    front: 'What is a power set?',
    back: 'The power set P(A) is the set of all subsets of A. If A={1,2}, then P(A)={{}, {1}, {2}, {1,2}}. Size: |P(A)| = 2^|A|',
    difficulty: 'medium',
    topic: 'Set Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-cartesian-product',
    front: 'What is Cartesian product (×)?',
    back: 'A × B is the set of all ordered pairs (a,b) where a ∈ A and b ∈ B. Example: {1,2} × {a,b} = {(1,a), (1,b), (2,a), (2,b)}',
    difficulty: 'medium',
    topic: 'Set Theory',
    reviewCount: 0,
    correctCount: 0
  }
];

// Graph Theory Flashcards
export const graphTypesFlashcards: Flashcard[] = [
  {
    id: 'fc-graph-def',
    front: 'What is a graph?',
    back: 'A graph G = (V, E) consists of a set of vertices (nodes) V and edges E connecting pairs of vertices. Used to model relationships and networks.',
    difficulty: 'easy',
    topic: 'Graph Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-directed-graph',
    front: 'What is a directed graph (digraph)?',
    back: 'A graph where edges have direction. Edge (u,v) goes from u to v but not necessarily from v to u. Example: social media "follows" relationship.',
    difficulty: 'easy',
    topic: 'Graph Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-undirected-graph',
    front: 'What is an undirected graph?',
    back: 'A graph where edges have no direction. Edge {u,v} connects both ways. Example: Facebook friendship (mutual).',
    difficulty: 'easy',
    topic: 'Graph Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-weighted-graph',
    front: 'What is a weighted graph?',
    back: 'A graph where each edge has an associated numerical value (weight). Example: road networks with distances, or neural networks with connection strengths.',
    difficulty: 'easy',
    topic: 'Graph Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-complete-graph',
    front: 'What is a complete graph?',
    back: 'A graph where every pair of vertices is connected. Kn denotes complete graph with n vertices. K5 has 5 vertices and 10 edges.',
    difficulty: 'medium',
    topic: 'Graph Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-bipartite-graph',
    front: 'What is a bipartite graph?',
    back: 'A graph whose vertices can be divided into two disjoint sets such that every edge connects vertices from different sets. Example: job-candidate matching.',
    difficulty: 'medium',
    topic: 'Graph Theory',
    reviewCount: 0,
    correctCount: 0
  }
];

export const graphTerminologyFlashcards: Flashcard[] = [
  {
    id: 'fc-degree',
    front: 'What is vertex degree?',
    back: 'The degree of a vertex is the number of edges connected to it. In directed graphs: in-degree (incoming) and out-degree (outgoing).',
    difficulty: 'easy',
    topic: 'Graph Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-path',
    front: 'What is a path in a graph?',
    back: 'A sequence of vertices where each adjacent pair is connected by an edge. Path length is the number of edges. Example: A→B→C is a path of length 2.',
    difficulty: 'easy',
    topic: 'Graph Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-cycle',
    front: 'What is a cycle?',
    back: 'A path that starts and ends at the same vertex with no repeated edges. A→B→C→A is a cycle of length 3.',
    difficulty: 'easy',
    topic: 'Graph Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-connected-graph',
    front: 'What is a connected graph?',
    back: 'A graph where there exists a path between every pair of vertices. In directed graphs: strongly connected (path both ways) or weakly connected.',
    difficulty: 'medium',
    topic: 'Graph Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-adjacency-matrix',
    front: 'What is an adjacency matrix?',
    back: 'An n×n matrix where entry (i,j) is 1 if edge exists from vertex i to j, 0 otherwise. Space: O(V²), good for dense graphs.',
    difficulty: 'medium',
    topic: 'Graph Theory',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-adjacency-list',
    front: 'What is an adjacency list?',
    back: 'Each vertex stores a list of its neighbors. Space: O(V+E), efficient for sparse graphs. Common in real-world networks.',
    difficulty: 'medium',
    topic: 'Graph Theory',
    reviewCount: 0,
    correctCount: 0
  }
];

// Logic Flashcards
export const propositionalLogicFlashcards: Flashcard[] = [
  {
    id: 'fc-proposition',
    front: 'What is a proposition?',
    back: 'A statement that is either true or false, but not both. Example: "It is raining" is a proposition. Questions and commands are not propositions.',
    difficulty: 'easy',
    topic: 'Logic',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-logical-and',
    front: 'What is logical AND (∧)?',
    back: 'P ∧ Q is true only when both P and Q are true. Example: "It is sunny AND warm" is true only if both conditions hold.',
    difficulty: 'easy',
    topic: 'Logic',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-logical-or',
    front: 'What is logical OR (∨)?',
    back: 'P ∨ Q is true when at least one of P or Q is true. Example: "Take bus OR walk" - either option makes it true.',
    difficulty: 'easy',
    topic: 'Logic',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-logical-not',
    front: 'What is logical NOT (¬)?',
    back: '¬P is the negation - opposite truth value. If P is "It is raining", ¬P is "It is not raining".',
    difficulty: 'easy',
    topic: 'Logic',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-implication',
    front: 'What is logical implication (→)?',
    back: 'P → Q means "if P then Q". False only when P is true and Q is false. Example: "If it rains, I take umbrella".',
    difficulty: 'medium',
    topic: 'Logic',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-biconditional',
    front: 'What is biconditional (↔)?',
    back: 'P ↔ Q means "P if and only if Q". True when P and Q have the same truth value. Both true or both false.',
    difficulty: 'medium',
    topic: 'Logic',
    reviewCount: 0,
    correctCount: 0
  }
];

export const relationsPropertiesFlashcards: Flashcard[] = [
  {
    id: 'fc-relation-def',
    front: 'What is a binary relation?',
    back: 'A relation R on set A is a subset of A × A. If (a,b) ∈ R, we write aRb. Example: "less than" on numbers.',
    difficulty: 'medium',
    topic: 'Relations',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-reflexive',
    front: 'What is a reflexive relation?',
    back: 'A relation where every element is related to itself: ∀a ∈ A, aRa. Example: "equals" (a = a), "is subset of" (A ⊆ A).',
    difficulty: 'medium',
    topic: 'Relations',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-symmetric',
    front: 'What is a symmetric relation?',
    back: 'If aRb then bRa for all a,b. Example: "is sibling of" - if A is sibling of B, then B is sibling of A.',
    difficulty: 'medium',
    topic: 'Relations',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-transitive',
    front: 'What is a transitive relation?',
    back: 'If aRb and bRc, then aRc. Example: "less than" - if a < b and b < c, then a < c.',
    difficulty: 'medium',
    topic: 'Relations',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-equivalence-relation',
    front: 'What is an equivalence relation?',
    back: 'A relation that is reflexive, symmetric, and transitive. Example: equality (=), congruence modulo n. Partitions set into equivalence classes.',
    difficulty: 'hard',
    topic: 'Relations',
    reviewCount: 0,
    correctCount: 0
  }
];

// Linear Algebra Flashcards
export const vectorsFlashcards: Flashcard[] = [
  {
    id: 'fc-vector-def',
    front: 'What is a vector?',
    back: 'An ordered list of numbers representing magnitude and direction. Can be written as column [x, y, z] or row vector. Used in ML for feature representation.',
    difficulty: 'easy',
    topic: 'Linear Algebra',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-vector-addition',
    front: 'How do you add vectors?',
    back: 'Add corresponding components: [a₁, a₂] + [b₁, b₂] = [a₁+b₁, a₂+b₂]. Example: [1,2] + [3,4] = [4,6]',
    difficulty: 'easy',
    topic: 'Linear Algebra',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-scalar-multiplication',
    front: 'What is scalar multiplication?',
    back: 'Multiply each component by a scalar: k[a₁, a₂] = [ka₁, ka₂]. Example: 3[1,2] = [3,6]. Scales the vector.',
    difficulty: 'easy',
    topic: 'Linear Algebra',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-dot-product',
    front: 'What is the dot product?',
    back: 'Sum of products of corresponding components: a·b = a₁b₁ + a₂b₂ + ... Measures similarity. Used in attention mechanisms.',
    difficulty: 'medium',
    topic: 'Linear Algebra',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-vector-norm',
    front: 'What is vector norm (magnitude)?',
    back: '||v|| = √(v₁² + v₂² + ...). The length of the vector. Used for normalization in ML.',
    difficulty: 'medium',
    topic: 'Linear Algebra',
    reviewCount: 0,
    correctCount: 0
  }
];

// Probability Flashcards
export const probabilityBasicsFlashcards: Flashcard[] = [
  {
    id: 'fc-probability-def',
    front: 'What is probability?',
    back: 'A measure of likelihood of an event occurring, ranging from 0 (impossible) to 1 (certain). P(A) = favorable outcomes / total outcomes.',
    difficulty: 'easy',
    topic: 'Probability',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-sample-space',
    front: 'What is a sample space?',
    back: 'The set of all possible outcomes of an experiment. Example: for a die roll, S = {1, 2, 3, 4, 5, 6}.',
    difficulty: 'easy',
    topic: 'Probability',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-conditional-prob',
    front: 'What is conditional probability?',
    back: 'P(A|B) is the probability of A given B has occurred. P(A|B) = P(A ∩ B) / P(B). Core of Bayesian reasoning.',
    difficulty: 'medium',
    topic: 'Probability',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-bayes-theorem',
    front: 'What is Bayes\' Theorem?',
    back: 'P(A|B) = P(B|A)P(A) / P(B). Updates beliefs given new evidence. Foundation of probabilistic AI systems.',
    difficulty: 'hard',
    topic: 'Probability',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-independence',
    front: 'What are independent events?',
    back: 'Events where P(A ∩ B) = P(A)P(B). Knowing one doesn\'t change probability of the other. Example: separate coin flips.',
    difficulty: 'medium',
    topic: 'Probability',
    reviewCount: 0,
    correctCount: 0
  }
];

export const distributionsFlashcards: Flashcard[] = [
  {
    id: 'fc-distribution-def',
    front: 'What is a probability distribution?',
    back: 'A function describing the likelihood of different outcomes. Discrete (PMF) or continuous (PDF). Sums/integrates to 1.',
    difficulty: 'medium',
    topic: 'Probability',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-uniform-dist',
    front: 'What is uniform distribution?',
    back: 'All outcomes equally likely. Discrete: P(x) = 1/n. Continuous: P(x) = 1/(b-a) on [a,b]. Example: fair die roll.',
    difficulty: 'medium',
    topic: 'Probability',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-normal-dist',
    front: 'What is normal (Gaussian) distribution?',
    back: 'Bell curve: N(μ, σ²). Defined by mean μ and variance σ². Common in nature. Central limit theorem makes it fundamental.',
    difficulty: 'medium',
    topic: 'Probability',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-bernoulli',
    front: 'What is Bernoulli distribution?',
    back: 'Binary outcome: success (1) with probability p, failure (0) with 1-p. Example: coin flip, binary classification.',
    difficulty: 'medium',
    topic: 'Probability',
    reviewCount: 0,
    correctCount: 0
  }
];

// Ontologies & Semantic Web Flashcards
export const ontologiesFlashcards: Flashcard[] = [
  {
    id: 'fc-ontology-def',
    front: 'What is an ontology in AI/computer science?',
    back: 'A formal, explicit specification of a shared conceptualization. Defines concepts, relationships, and constraints in a domain using logic. Example: schema.org defines products, reviews, prices.',
    difficulty: 'medium',
    topic: 'Ontologies',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-rdf-triple',
    front: 'What is an RDF triple?',
    back: 'The fundamental unit of RDF: (subject, predicate, object). Example: (Obama, bornIn, Hawaii). Everything in RDF is expressed as triples.',
    difficulty: 'easy',
    topic: 'Ontologies',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-rdfs',
    front: 'What is RDFS (RDF Schema)?',
    back: 'Extension of RDF adding class hierarchies (rdfs:Class, rdfs:subClassOf) and property hierarchies (rdfs:Property, rdfs:subPropertyOf). Enables basic reasoning.',
    difficulty: 'medium',
    topic: 'Ontologies',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-owl',
    front: 'What is OWL (Web Ontology Language)?',
    back: 'W3C standard for expressive ontologies. Built on Description Logics. Adds restrictions, disjointness, cardinality, transitivity. Enables automated reasoning.',
    difficulty: 'medium',
    topic: 'Ontologies',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-triple-store',
    front: 'What is a triple store?',
    back: 'Database optimized for storing and querying RDF triples. Uses SPO/POS/OSP indexes for fast pattern matching. Examples: Apache Jena, Virtuoso, AllegroGraph.',
    difficulty: 'medium',
    topic: 'Ontologies',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-sparql',
    front: 'What is SPARQL?',
    back: 'Query language for RDF data (like SQL for relational DBs). Pattern matching with variables: SELECT ?x WHERE { ?x rdf:type Person }',
    difficulty: 'medium',
    topic: 'Ontologies',
    reviewCount: 0,
    correctCount: 0
  }
];

// Knowledge Graphs Flashcards
export const knowledgeGraphsFlashcards: Flashcard[] = [
  {
    id: 'fc-kg-def',
    front: 'What is a Knowledge Graph?',
    back: 'Graph-structured knowledge base encoding entities (nodes), relationships (edges), and attributes. Represents real-world facts. Examples: Google KG (500B+ facts), Wikidata, Facebook.',
    difficulty: 'easy',
    topic: 'Knowledge Graphs',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-kg-vs-db',
    front: 'How do Knowledge Graphs differ from relational databases?',
    back: 'KGs: flexible schema, relationships are first-class, easy multi-hop queries, semantics encoded. DBs: rigid schema, joins expensive, relationships via foreign keys, no built-in semantics.',
    difficulty: 'medium',
    topic: 'Knowledge Graphs',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-kg-construction',
    front: 'What are the main steps in KG construction?',
    back: '1) NER (Named Entity Recognition) 2) Entity Linking (map to KG entities) 3) Relation Extraction (identify relationships) 4) Entity Resolution (merge duplicates) 5) Quality validation.',
    difficulty: 'medium',
    topic: 'Knowledge Graphs',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-transe',
    front: 'What is TransE for KG embeddings?',
    back: 'Translation-based embedding: h + r ≈ t. Head + relation ≈ tail in vector space. Simple, efficient. Trained with margin ranking loss. Good for 1-to-1 relations.',
    difficulty: 'medium',
    topic: 'Knowledge Graphs',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-link-prediction',
    front: 'What is link prediction in Knowledge Graphs?',
    back: 'Predicting missing edges: given (h, r, ?), predict t. Or given (?, r, t), predict h. Uses KG embeddings to score candidates. Metrics: MR, MRR, Hits@k.',
    difficulty: 'medium',
    topic: 'Knowledge Graphs',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-kg-embeddings',
    front: 'Why use embeddings for Knowledge Graphs?',
    back: 'Enable ML on graphs: link prediction, semantic search, recommendations, question answering. Learns latent patterns in KG structure. Combines symbolic (KG) with neural (embeddings).',
    difficulty: 'medium',
    topic: 'Knowledge Graphs',
    reviewCount: 0,
    correctCount: 0
  }
];

// Neural-Symbolic AI Flashcards
export const neuralSymbolicFlashcards: Flashcard[] = [
  {
    id: 'fc-neuro-symbolic',
    front: 'What is Neuro-Symbolic AI?',
    back: 'Combining neural networks (learning, perception) with symbolic reasoning (logic, knowledge). Examples: RAG, AlphaGeometry, GPT-4 + tools. Gets best of both paradigms.',
    difficulty: 'medium',
    topic: 'Neural-Symbolic AI',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-rag-def',
    front: 'What is RAG (Retrieval-Augmented Generation)?',
    back: 'LLM generation augmented with retrieval from knowledge source. Flow: query → retrieve facts → augment context → generate answer → cite sources. Used by ChatGPT, Perplexity.',
    difficulty: 'easy',
    topic: 'Neural-Symbolic AI',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-rag-benefits',
    front: 'Why use RAG over pure LLMs?',
    back: 'Reduces hallucinations, accesses current/private data, provides citations, costs less than retraining. Grounds LLM in factual knowledge.',
    difficulty: 'medium',
    topic: 'Neural-Symbolic AI',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-gnn-def',
    front: 'What is a Graph Neural Network (GNN)?',
    back: 'Neural network operating on graph-structured data via message passing. Nodes aggregate neighbor features, update embeddings. Layers capture multi-hop information.',
    difficulty: 'medium',
    topic: 'Neural-Symbolic AI',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-message-passing',
    front: 'What is message passing in GNNs?',
    back: 'Three steps: 1) MESSAGE (neighbors send features) 2) AGGREGATE (combine messages: sum/mean/max) 3) UPDATE (transform aggregated info). Repeat for multiple layers.',
    difficulty: 'medium',
    topic: 'Neural-Symbolic AI',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-gnn-applications',
    front: 'What are real-world GNN applications?',
    back: 'Drug discovery (molecule properties), recommendations (Pinterest PinSage: 3B pins), traffic prediction (Google Maps), fraud detection (PayPal), protein folding (AlphaFold 2).',
    difficulty: 'medium',
    topic: 'Neural-Symbolic AI',
    reviewCount: 0,
    correctCount: 0
  }
];