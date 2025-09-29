import { QuizQuestion } from '../learning-content';

export const setTheoryQuiz: QuizQuestion[] = [
  {
    id: 'set-basic-1',
    question: 'Which of the following is true about the empty set?',
    options: [
      'It contains one element: zero',
      'It is a subset of every set',
      'It has cardinality 1',
      'It cannot be represented in mathematics'
    ],
    correctAnswer: 1,
    explanation: 'The empty set ∅ is a subset of every set. This is a fundamental property: for any set A, ∅ ⊆ A.',
    difficulty: 'easy',
    topic: 'Set Theory'
  },
  {
    id: 'set-operations-1',
    question: 'If A = {1, 2, 3} and B = {2, 3, 4}, what is A ∪ B?',
    options: [
      '{2, 3}',
      '{1, 2, 3, 4}',
      '{1, 4}',
      '{}'
    ],
    correctAnswer: 1,
    explanation: 'Union (∪) combines all elements from both sets without duplication: {1, 2, 3, 4}.',
    difficulty: 'easy',
    topic: 'Set Theory'
  },
  {
    id: 'set-operations-2',
    question: 'What is the cardinality of the power set of {a, b, c}?',
    options: [
      '3',
      '6',
      '8',
      '9'
    ],
    correctAnswer: 2,
    explanation: 'The power set P(A) has cardinality 2^|A|. Since |{a,b,c}| = 3, |P(A)| = 2³ = 8.',
    difficulty: 'medium',
    topic: 'Set Theory'
  },
  {
    id: 'cartesian-product-1',
    question: 'How many elements are in {1, 2} × {a, b, c}?',
    options: [
      '5',
      '6',
      '8',
      '12'
    ],
    correctAnswer: 1,
    explanation: 'Cartesian product A × B has |A| × |B| elements. Here: 2 × 3 = 6 ordered pairs.',
    difficulty: 'medium',
    topic: 'Set Theory'
  }
];

export const graphTheoryQuiz: QuizQuestion[] = [
  {
    id: 'graph-basic-1',
    question: 'In an undirected graph with 5 vertices, what is the maximum number of edges?',
    options: [
      '5',
      '10',
      '20',
      '25'
    ],
    correctAnswer: 1,
    explanation: 'A complete graph Kn has n(n-1)/2 edges. For n=5: 5×4/2 = 10 edges.',
    difficulty: 'medium',
    topic: 'Graph Theory'
  },
  {
    id: 'graph-representation-1',
    question: 'What is the main advantage of adjacency lists over adjacency matrices?',
    options: [
      'Faster edge existence checking',
      'Better space efficiency for sparse graphs',
      'Simpler implementation',
      'Works better for weighted graphs'
    ],
    correctAnswer: 1,
    explanation: 'Adjacency lists use O(V+E) space vs O(V²) for matrices. For sparse graphs where E << V², lists are much more space efficient.',
    difficulty: 'medium',
    topic: 'Graph Theory'
  },
  {
    id: 'graph-paths-1',
    question: 'What is the minimum number of edges needed to connect n vertices?',
    options: [
      'n-1',
      'n',
      'n+1',
      '2n'
    ],
    correctAnswer: 0,
    explanation: 'A tree with n vertices has exactly n-1 edges. This is the minimum to keep all vertices connected.',
    difficulty: 'medium',
    topic: 'Graph Theory'
  },
  {
    id: 'graph-directed-1',
    question: 'In a directed graph, what does it mean for a graph to be strongly connected?',
    options: [
      'Every vertex has at least one edge',
      'There exists a path between every pair of vertices',
      'All vertices have the same degree',
      'The graph has no cycles'
    ],
    correctAnswer: 1,
    explanation: 'Strongly connected means there is a directed path from every vertex to every other vertex (path exists both ways).',
    difficulty: 'medium',
    topic: 'Graph Theory'
  }
];

export const logicQuiz: QuizQuestion[] = [
  {
    id: 'logic-basic-1',
    question: 'What is the truth value of (True ∧ False)?',
    options: [
      'True',
      'False',
      'Undefined',
      'Depends on context'
    ],
    correctAnswer: 1,
    explanation: 'Logical AND (∧) is true only when both operands are true. True ∧ False = False.',
    difficulty: 'easy',
    topic: 'Logic'
  },
  {
    id: 'logic-implication-1',
    question: 'When is P → Q false?',
    options: [
      'When P is false',
      'When Q is false',
      'When P is true and Q is false',
      'When both P and Q are false'
    ],
    correctAnswer: 2,
    explanation: 'Implication P → Q is false only when the premise P is true but conclusion Q is false.',
    difficulty: 'medium',
    topic: 'Logic'
  },
  {
    id: 'logic-quantifiers-1',
    question: 'What does ∀x P(x) mean?',
    options: [
      'P(x) is true for some x',
      'P(x) is true for all x',
      'P(x) is true for exactly one x',
      'P(x) is never true'
    ],
    correctAnswer: 1,
    explanation: '∀ (forall) is the universal quantifier meaning "for all" or "for every". ∀x P(x) means P is true for all x.',
    difficulty: 'medium',
    topic: 'Logic'
  },
  {
    id: 'relations-equivalence-1',
    question: 'Which properties must a relation have to be an equivalence relation?',
    options: [
      'Reflexive only',
      'Reflexive and symmetric',
      'Reflexive, symmetric, and transitive',
      'Transitive only'
    ],
    correctAnswer: 2,
    explanation: 'An equivalence relation must be reflexive (aRa), symmetric (aRb ⟹ bRa), and transitive (aRb ∧ bRc ⟹ aRc).',
    difficulty: 'hard',
    topic: 'Logic'
  }
];

export const linearAlgebraQuiz: QuizQuestion[] = [
  {
    id: 'vector-ops-1',
    question: 'What is [2, 3] + [4, 1]?',
    options: [
      '[6, 4]',
      '[8, 3]',
      '[2, 4]',
      '[6, 3]'
    ],
    correctAnswer: 0,
    explanation: 'Vector addition adds corresponding components: [2+4, 3+1] = [6, 4].',
    difficulty: 'easy',
    topic: 'Linear Algebra'
  },
  {
    id: 'dot-product-1',
    question: 'What is the dot product of [1, 2, 3] and [4, 5, 6]?',
    options: [
      '14',
      '21',
      '32',
      '45'
    ],
    correctAnswer: 2,
    explanation: 'Dot product: (1×4) + (2×5) + (3×6) = 4 + 10 + 18 = 32.',
    difficulty: 'medium',
    topic: 'Linear Algebra'
  },
  {
    id: 'matrix-multiply-1',
    question: 'What is the dimension of the result when multiplying a 3×4 matrix by a 4×2 matrix?',
    options: [
      '3×2',
      '4×4',
      '3×4',
      'Cannot multiply'
    ],
    correctAnswer: 0,
    explanation: 'When multiplying m×n by n×p matrices, the result is m×p. Here: 3×4 times 4×2 gives 3×2.',
    difficulty: 'medium',
    topic: 'Linear Algebra'
  },
  {
    id: 'vector-norm-1',
    question: 'What is the norm (magnitude) of vector [3, 4]?',
    options: [
      '5',
      '7',
      '12',
      '25'
    ],
    correctAnswer: 0,
    explanation: 'Norm ||v|| = √(3² + 4²) = √(9 + 16) = √25 = 5.',
    difficulty: 'easy',
    topic: 'Linear Algebra'
  }
];

export const probabilityQuiz: QuizQuestion[] = [
  {
    id: 'prob-basic-1',
    question: 'If you roll a fair 6-sided die, what is P(rolling a 3)?',
    options: [
      '1/6',
      '1/3',
      '1/2',
      '3/6'
    ],
    correctAnswer: 0,
    explanation: 'One favorable outcome (rolling 3) out of 6 equally likely outcomes: P = 1/6.',
    difficulty: 'easy',
    topic: 'Probability'
  },
  {
    id: 'conditional-prob-1',
    question: 'Given P(A) = 0.6, P(B) = 0.5, P(A ∩ B) = 0.3, what is P(A|B)?',
    options: [
      '0.3',
      '0.5',
      '0.6',
      '0.9'
    ],
    correctAnswer: 2,
    explanation: 'P(A|B) = P(A ∩ B) / P(B) = 0.3 / 0.5 = 0.6.',
    difficulty: 'medium',
    topic: 'Probability'
  },
  {
    id: 'independence-1',
    question: 'If events A and B are independent with P(A) = 0.4 and P(B) = 0.5, what is P(A ∩ B)?',
    options: [
      '0.2',
      '0.4',
      '0.5',
      '0.9'
    ],
    correctAnswer: 0,
    explanation: 'For independent events: P(A ∩ B) = P(A) × P(B) = 0.4 × 0.5 = 0.2.',
    difficulty: 'medium',
    topic: 'Probability'
  },
  {
    id: 'bayes-1',
    question: 'What does Bayes\' theorem primarily help us calculate?',
    options: [
      'Joint probability',
      'Marginal probability',
      'Posterior probability from prior and likelihood',
      'Expected value'
    ],
    correctAnswer: 2,
    explanation: 'Bayes\' theorem updates prior beliefs to posterior probabilities given new evidence: P(A|B) = P(B|A)P(A)/P(B).',
    difficulty: 'hard',
    topic: 'Probability'
  }
];

export const ontologiesQuiz: QuizQuestion[] = [
  {
    id: 'onto-rdf-1',
    question: 'In RDF, what is the structure of the fundamental unit?',
    options: [
      'Binary relation: (source, target)',
      'Triple: (subject, predicate, object)',
      'Quadruple: (entity, attribute, value, timestamp)',
      'Key-value pair: (key, value)'
    ],
    correctAnswer: 1,
    explanation: 'RDF\'s fundamental unit is the triple: (subject, predicate, object). Example: (Obama, bornIn, Hawaii). Everything in RDF is expressed as triples.',
    difficulty: 'easy',
    topic: 'Ontologies'
  },
  {
    id: 'onto-rdfs-1',
    question: 'What capability does RDFS add beyond basic RDF?',
    options: [
      'Temporal reasoning',
      'Class and property hierarchies',
      'Probabilistic inference',
      'Natural language processing'
    ],
    correctAnswer: 1,
    explanation: 'RDFS extends RDF with class hierarchies (rdfs:Class, rdfs:subClassOf) and property hierarchies (rdfs:Property, rdfs:subPropertyOf), enabling basic taxonomic reasoning.',
    difficulty: 'medium',
    topic: 'Ontologies'
  },
  {
    id: 'onto-owl-1',
    question: 'Which feature distinguishes OWL from RDFS?',
    options: [
      'Ability to express simple class hierarchies',
      'Support for property restrictions, disjointness, and cardinality',
      'Compatibility with relational databases',
      'Built-in visualization tools'
    ],
    correctAnswer: 1,
    explanation: 'OWL adds expressive power through restrictions (someValuesFrom, allValuesFrom), disjointness axioms, cardinality constraints, and transitive properties. Built on Description Logics.',
    difficulty: 'medium',
    topic: 'Ontologies'
  },
  {
    id: 'onto-reasoning-1',
    question: 'If Person ⊑ LivingThing and Student ⊑ Person, what can an OWL reasoner infer?',
    options: [
      'Student and Person are disjoint',
      'Student ⊑ LivingThing (transitive closure)',
      'All Persons are Students',
      'LivingThing ⊑ Student'
    ],
    correctAnswer: 1,
    explanation: 'OWL reasoners perform transitive closure on subclass hierarchies: since Student ⊑ Person and Person ⊑ LivingThing, the reasoner infers Student ⊑ LivingThing.',
    difficulty: 'medium',
    topic: 'Ontologies'
  },
  {
    id: 'onto-triple-store-1',
    question: 'Why do triple stores use SPO, POS, and OSP indexes?',
    options: [
      'To support encryption',
      'To enable fast pattern matching with different query patterns',
      'To compress data',
      'To support versioning'
    ],
    correctAnswer: 1,
    explanation: 'Multiple indexes (SPO, POS, OSP) enable efficient queries regardless of which triple component is specified. Query (?s, knows, Bob) uses OSP index; (Alice, ?p, ?o) uses SPO.',
    difficulty: 'hard',
    topic: 'Ontologies'
  },
  {
    id: 'onto-application-1',
    question: 'How do ontologies help RAG (Retrieval-Augmented Generation) systems?',
    options: [
      'They replace the need for LLMs',
      'They provide structured, semantically-rich knowledge for grounding',
      'They generate training data',
      'They compress neural network weights'
    ],
    correctAnswer: 1,
    explanation: 'Ontologies provide structured, machine-understandable knowledge that RAG systems can query to ground LLM responses in facts, reducing hallucinations and enabling citations.',
    difficulty: 'hard',
    topic: 'Ontologies'
  }
];

export const knowledgeGraphsQuiz: QuizQuestion[] = [
  {
    id: 'kg-basic-1',
    question: 'What distinguishes Knowledge Graphs from relational databases?',
    options: [
      'KGs cannot store structured data',
      'KGs treat relationships as first-class citizens with flexible schema',
      'KGs are slower for all queries',
      'KGs cannot scale beyond 1 million entities'
    ],
    correctAnswer: 1,
    explanation: 'KGs treat relationships as first-class graph edges, support flexible schema evolution, and excel at multi-hop traversal. DBs use rigid schemas with expensive joins for relationships.',
    difficulty: 'medium',
    topic: 'Knowledge Graphs'
  },
  {
    id: 'kg-construction-1',
    question: 'In the KG construction pipeline, what does Entity Linking do?',
    options: [
      'Extracts mentions from text',
      'Maps text mentions to existing KG entities',
      'Identifies relationships between entities',
      'Merges duplicate entities'
    ],
    correctAnswer: 1,
    explanation: 'Entity Linking maps extracted mentions to canonical KG entities. Example: "Barack Obama", "Obama", "President Obama" all link to entity Q76 (Wikidata).',
    difficulty: 'medium',
    topic: 'Knowledge Graphs'
  },
  {
    id: 'kg-transe-1',
    question: 'In TransE embeddings, what does h + r ≈ t represent?',
    options: [
      'Matrix multiplication of embeddings',
      'Translation: head + relation should approximate tail in vector space',
      'Concatenation of entity and relation features',
      'The probability of the triple being true'
    ],
    correctAnswer: 1,
    explanation: 'TransE learns embeddings where head + relation ≈ tail as vectors. Example: Paris + capitalOf ≈ France in embedding space. Trained with margin ranking loss.',
    difficulty: 'medium',
    topic: 'Knowledge Graphs'
  },
  {
    id: 'kg-link-prediction-1',
    question: 'What is Hits@10 in KG link prediction evaluation?',
    options: [
      'Number of correct predictions in top 10',
      'Percentage of test triples where correct entity is in top 10 predictions',
      'Average rank of correct answer',
      'Number of triples evaluated'
    ],
    correctAnswer: 1,
    explanation: 'Hits@10 measures the percentage of test triples where the true entity ranks in the top 10 predictions. Higher is better. Standard metric alongside MR and MRR.',
    difficulty: 'hard',
    topic: 'Knowledge Graphs'
  },
  {
    id: 'kg-embeddings-advantage-1',
    question: 'Why use embeddings instead of just graph traversal for KG queries?',
    options: [
      'Embeddings are always faster',
      'Embeddings can infer missing links and handle incomplete KGs',
      'Graph traversal doesn\'t work on large KGs',
      'Embeddings don\'t require training'
    ],
    correctAnswer: 1,
    explanation: 'Embeddings learn latent patterns, enabling link prediction for missing edges. They can answer queries even when explicit paths don\'t exist, complementing symbolic traversal.',
    difficulty: 'hard',
    topic: 'Knowledge Graphs'
  },
  {
    id: 'kg-production-1',
    question: 'How many facts does Google\'s Knowledge Graph contain (approximately)?',
    options: [
      '50 million',
      '500 million',
      '5 billion',
      '500+ billion'
    ],
    correctAnswer: 3,
    explanation: 'Google\'s Knowledge Graph contains 500+ billion facts about real-world entities and relationships. It powers search features, info panels, and assists Google Assistant.',
    difficulty: 'medium',
    topic: 'Knowledge Graphs'
  }
];

export const neuralSymbolicQuiz: QuizQuestion[] = [
  {
    id: 'ns-paradigm-1',
    question: 'What is the main advantage of combining neural and symbolic AI?',
    options: [
      'It reduces computational cost',
      'It combines learning/perception (neural) with reasoning/explainability (symbolic)',
      'It eliminates the need for training data',
      'It works only for vision tasks'
    ],
    correctAnswer: 1,
    explanation: 'Neuro-symbolic AI combines neural strengths (learning from data, handling ambiguity) with symbolic strengths (logical reasoning, compositionality, explainability). Best of both worlds.',
    difficulty: 'medium',
    topic: 'Neural-Symbolic AI'
  },
  {
    id: 'ns-rag-pipeline-1',
    question: 'What is the correct order of steps in a RAG system?',
    options: [
      'Generate → Retrieve → Augment → Cite',
      'Retrieve → Generate → Augment → Cite',
      'Query → Retrieve → Augment Context → Generate → Cite',
      'Cite → Retrieve → Query → Generate'
    ],
    correctAnswer: 2,
    explanation: 'RAG flow: 1) Parse query 2) Retrieve relevant facts 3) Augment LLM context with facts 4) Generate answer 5) Cite sources. This grounds generation in retrieved knowledge.',
    difficulty: 'easy',
    topic: 'Neural-Symbolic AI'
  },
  {
    id: 'ns-rag-benefit-1',
    question: 'How does RAG reduce LLM hallucinations?',
    options: [
      'By retraining the LLM more frequently',
      'By grounding generation in retrieved factual context',
      'By using larger models',
      'By removing the language model entirely'
    ],
    correctAnswer: 1,
    explanation: 'RAG retrieves factual context from knowledge bases and includes it in the prompt, grounding the LLM\'s generation in real facts rather than relying solely on parametric memory.',
    difficulty: 'medium',
    topic: 'Neural-Symbolic AI'
  },
  {
    id: 'ns-gnn-mp-1',
    question: 'In GNN message passing, what are the three core operations?',
    options: [
      'Forward, Backward, Update',
      'Message, Aggregate, Update',
      'Encode, Process, Decode',
      'Query, Key, Value'
    ],
    correctAnswer: 1,
    explanation: 'GNN message passing: 1) MESSAGE (neighbors send features) 2) AGGREGATE (combine via sum/mean/max/attention) 3) UPDATE (transform aggregated info). Repeats for multiple layers.',
    difficulty: 'medium',
    topic: 'Neural-Symbolic AI'
  },
  {
    id: 'ns-gnn-app-1',
    question: 'Which company uses GNNs for 3 billion pins recommendation?',
    options: [
      'Google',
      'Facebook',
      'Pinterest (PinSage)',
      'Amazon'
    ],
    correctAnswer: 2,
    explanation: 'Pinterest\'s PinSage uses GraphSAGE-based GNNs on 3 billion pins and 18 billion edges, achieving 150% improvement in engagement. Largest industrial GNN deployment.',
    difficulty: 'medium',
    topic: 'Neural-Symbolic AI'
  },
  {
    id: 'ns-alphageometry-1',
    question: 'How did AlphaGeometry achieve IMO-level geometry problem solving?',
    options: [
      'Pure neural network trained on proofs',
      'Pure symbolic theorem prover',
      'Neural model proposes constructions + symbolic verifier checks correctness',
      'Reinforcement learning only'
    ],
    correctAnswer: 2,
    explanation: 'AlphaGeometry combines neural language model (proposes creative auxiliary constructions) with symbolic deduction engine (rigorously verifies). Solved 25/30 IMO problems.',
    difficulty: 'hard',
    topic: 'Neural-Symbolic AI'
  }
];