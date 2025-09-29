import { TheoryLesson } from './types';

export const neuroSymbolicOverviewLesson: TheoryLesson = {
  id: 'neuro-symbolic-overview',
  title: 'Neural-Symbolic AI: Combining Learning with Reasoning',
  description:
    'Explore the frontier of AI where neural networks meet symbolic reasoning: RAG, knowledge-grounded LLMs, and hybrid systems that combine the best of both worlds.',
  learningObjectives: [
    'Understand the complementary strengths of neural and symbolic AI',
    'Master RAG (Retrieval-Augmented Generation) architecture and benefits',
    'Learn how production systems combine LLMs with knowledge graphs',
    'Explore cutting-edge neuro-symbolic applications like AlphaGeometry'
  ],
  prerequisites: [
    'knowledge-graphs-introduction',
    'knowledge-graph-embeddings',
    'ontologies-introduction',
  ],
  sections: [
    {
      id: 'the-two-paradigms',
      title: '1. The Two Paradigms: Neural vs Symbolic AI',
      content: `## The Great Divide in AI: Learning vs Reasoning

For decades, AI has been split into two camps:

### **Neural AI (Connectionist):**
- **Strengths:** Pattern recognition, learning from data, handling ambiguity, scaling with compute
- **Examples:** Vision models (ResNet), language models (GPT-4), speech recognition
- **How it works:** Millions of parameters adjusted via gradient descent on massive datasets
- **Best at:** Perception tasks where rules are hard to articulate

### **Symbolic AI (Classical AI):**
- **Strengths:** Logical reasoning, explainability, guaranteed correctness, working with structured knowledge
- **Examples:** Expert systems, theorem provers, knowledge graphs, planning systems
- **How it works:** Explicit rules, ontologies, logic-based inference
- **Best at:** Reasoning tasks requiring step-by-step logic

## The Problem: Each Paradigm Has Fatal Weaknesses

**Neural networks struggle with:**
- **Reasoning:** Can't reliably do multi-step logic or math
- **Compositionality:** Fail to systematically generalize (e.g., "jump twice" after learning "jump")
- **Sample efficiency:** Need millions of examples for tasks humans learn from one
- **Explainability:** "Black box" decisions that can't be audited
- **Hallucinations:** Confidently generate false information
- **Long-tail knowledge:** Poor on rare facts not well-represented in training data

**Symbolic systems struggle with:**
- **Learning:** Can't automatically extract knowledge from data
- **Ambiguity:** Break down with noisy or imperfect input
- **Scalability:** Manual knowledge engineering doesn't scale
- **Perception:** Can't process images, audio, natural language directly
- **Robustness:** Brittle to unexpected inputs or edge cases

## The Vision: Neural-Symbolic AI

**Neuro-symbolic AI** combines both paradigms to get the best of both worlds:

\`\`\`
Neural Component (Learning)          Symbolic Component (Reasoning)
────────────────────────            ───────────────────────────────
↓ Perception & Pattern Recognition  ↓ Logical Inference & Planning
↓ Learn from data                   ↓ Structured knowledge
↓ Handle ambiguity                  ↓ Explainability
↓ Robust to noise                   ↓ Compositional generalization
                 ↓                                   ↓
                 └──────────→ Hybrid System ←───────┘
                        ↓
              Better than either alone
\`\`\`

**Real-world impact:**
- **GPT-4 + Code Interpreter:** LLM (neural) calls Python (symbolic) for math/data analysis
- **Amazon Warehouse Robots:** Neural perception + symbolic path planning
- **AlphaGeometry (Google DeepMind):** Proved IMO geometry problems by combining neural language model with symbolic deduction engine
- **Retrieval-Augmented Generation (RAG):** LLMs (neural) augmented with knowledge graphs (symbolic) - used by ChatGPT, Bing Chat, Perplexity

---`,
    },
    {
      id: 'rag-architecture',
      title: '2. RAG: Retrieval-Augmented Generation (Most Practical Approach)',
      content: `## RAG: The Breakthrough That Fixed LLM Hallucinations

**The problem with pure LLMs:**
- Trained on static datasets (e.g., GPT-4 cut-off in 2023)
- Hallucinate facts not in training data
- Can't access private/proprietary knowledge
- No citations or provenance for claims

**The RAG solution:**
Augment LLM generation with retrieval from external knowledge sources.

## RAG Architecture (Used by ChatGPT, Bing Chat, Perplexity)

\`\`\`
┌─────────────────┐
│  User Query     │ "What are the side effects of Drug X?"
└────────┬────────┘
         ↓
┌────────────────────────────────────────────────────┐
│ Step 1: Query Understanding (Neural)               │
│ • Embed query → vector                             │
│ • Extract entities/intent                          │
└────────┬───────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────┐
│ Step 2: Retrieval (Symbolic)                       │
│ • Vector search in knowledge base                  │
│ • Query knowledge graph for Drug X                 │
│ • Find top-k relevant documents                    │
└────────┬───────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────┐
│ Retrieved Context:                                  │
│ • FDA document: "Drug X side effects: nausea..."   │
│ • Medical paper: "Clinical trial showed..."        │
│ • Knowledge graph: Drug X → hasEffect → Nausea    │
└────────┬───────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────┐
│ Step 3: Augmented Generation (Neural)              │
│ Prompt to LLM:                                     │
│ """                                                │
│ Context: [retrieved documents]                     │
│ Question: What are side effects of Drug X?         │
│ Answer using only the context above. Cite sources. │
│ """                                                │
└────────┬───────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────┐
│ Generated Answer:                                   │
│ "Drug X has the following side effects [FDA doc]:  │
│  • Nausea (15% of patients)                        │
│  • Headache (8% of patients)                       │
│  Clinical trials showed... [Medical paper]"        │
└────────────────────────────────────────────────────┘
\`\`\`

## RAG Components Breakdown

### **1. Knowledge Base (Symbolic)**
**Documents:**
- PDFs, web pages, internal docs
- Chunked into passages (e.g., 512 tokens)
- Indexed with vector embeddings

**Knowledge Graphs:**
- Entities: Drug X, Nausea, FDA
- Relations: hasEffect, approvedBy, studiedIn
- Attributes: efficacy scores, dates

**Hybrid approach:**
- Vector search for semantic similarity
- KG traversal for structured queries
- Combine both for best results

### **2. Retrieval (Hybrid)**
**Dense retrieval (neural):**
\`\`\`python
query_embedding = embed_model.encode(query)
doc_scores = cosine_similarity(query_embedding, doc_embeddings)
top_docs = get_top_k(doc_scores, k=5)
\`\`\`

**Sparse retrieval (symbolic):**
\`\`\`python
# BM25, TF-IDF, or elasticsearch
top_docs = bm25_index.search(query, k=5)
\`\`\`

**Knowledge graph retrieval:**
\`\`\`sparql
SELECT ?effect ?frequency WHERE {
  :DrugX :hasEffect ?effect .
  ?effect :frequency ?frequency .
}
\`\`\`

**Re-ranking:**
- Use cross-encoder to re-score top documents
- Filter by relevance threshold
- Diversify results

### **3. Generation (Neural)**
**Prompt engineering:**
\`\`\`
System: You are a medical expert. Answer questions using ONLY
the provided context. If the context doesn't contain the answer,
say "I don't have enough information."

Context:
[Retrieved documents]

Question: {user_question}

Instructions:
- Cite sources using [Source X] notation
- If claims conflict, present both views
- Admit uncertainty when appropriate
\`\`\`

**Output:**
- Grounded in retrieved facts
- Citable/auditable
- Reduced hallucination

## Production RAG Systems

**LangChain/LlamaIndex Architecture:**
\`\`\`python
from langchain.vectorstores import Pinecone
from langchain.embeddings import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.chains import RetrievalQA

# 1. Build knowledge base
vectorstore = Pinecone.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    index_name="medical-kb"
)

# 2. Create retriever
retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 5}
)

# 3. Create RAG chain
qa_chain = RetrievalQA.from_chain_type(
    llm=OpenAI(model="gpt-4"),
    chain_type="stuff",  # "stuff" docs into prompt
    retriever=retriever,
    return_source_documents=True
)

# 4. Query
result = qa_chain("What are the side effects of Drug X?")
print(result["answer"])
print(result["source_documents"])  # Citations!
\`\`\`

**Advanced RAG patterns:**
- **Iterative retrieval:** Query → Answer → Refine Query → Retrieve More
- **Self-querying:** LLM generates structured queries (SQL/SPARQL) from natural language
- **Multi-hop reasoning:** Chain multiple retrievals (e.g., "Find Drug X trials" → "Get trial results")
- **Hypothetical Document Embeddings (HyDE):** Generate hypothetical answer, embed it, retrieve similar docs

## RAG in Production

**ChatGPT (OpenAI):**
- "Browse with Bing" uses RAG to access current web info
- Retrieves search results, reads pages, synthesizes answer
- Citations at bottom of response

**Perplexity AI:**
- Every answer is RAG-based
- Retrieves from web in real-time
- Inline citations with links

**Microsoft Bing Chat:**
- Combines Bing search (retrieval) with GPT-4 (generation)
- Shows sources alongside answer

**Enterprise RAG:**
- **Bloomberg GPT + Terminal:** Financial LLM + proprietary market data
- **Morgan Stanley:** GPT-4 + internal wealth management docs
- **Healthcare:** LLMs + HIPAA-compliant patient records + medical literature

**Benefits:**
- ✅ Up-to-date information (retrieval can be real-time)
- ✅ Private knowledge (index proprietary docs)
- ✅ Citations/provenance (see source documents)
- ✅ Reduced hallucination (grounded in retrieved facts)
- ✅ Lower cost (smaller LLM + retrieval vs giant LLM)

---`,
    },
    {
      id: 'knowledge-distillation',
      title: '3. Knowledge Distillation: From Symbolic to Neural',
      content: `## Teaching Neural Networks Symbolic Knowledge

**The idea:** Compile symbolic knowledge (rules, KGs, proofs) into neural network weights.

## Approach 1: Training Data from Symbolic Systems

**Generate training examples from symbolic knowledge:**

\`\`\`python
# Symbolic knowledge base
rules = {
    "mammal(X) ∧ laysEggs(X) → platypus(X)",
    "mammal(X) ∧ ¬laysEggs(X) → notPlatypus(X)",
    "mammal(dog)", "¬laysEggs(dog)",
    "mammal(platypus)", "laysEggs(platypus)"
}

# Generate training examples via symbolic reasoning
def generate_training_data(rules, num_examples=10000):
    examples = []
    for _ in range(num_examples):
        entity = sample_entity()  # dog, platypus, cat, etc.
        facts = query_kb(entity)  # Get facts from KB
        conclusion = symbolic_inference(rules, facts)  # Apply rules
        examples.append((facts, conclusion))
    return examples

# Train neural network on symbolic outputs
train_data = generate_training_data(rules)
model = NeuralNet()
model.fit(train_data)

# Now model has "learned" the rules
# Can generalize to new entities
\`\`\`

**Real-world example: AlphaGo**
- Neural network trained on expert human games (symbolic knowledge: game records)
- Then refined via self-play (neural learning)
- Combination beat world champion

## Approach 2: Logic Tensor Networks (LTNs)

**Embed logic formulas as differentiable operations:**

\`\`\`python
import tensorflow as tf

# Represent logical AND as product t-norm
def AND(x, y):
    return x * y

# Represent logical OR as probabilistic sum
def OR(x, y):
    return x + y - x * y

# Represent NOT as complement
def NOT(x):
    return 1 - x

# Represent IMPLIES as (NOT x) OR y
def IMPLIES(x, y):
    return OR(NOT(x), y)

# Example: Encode rule "mammal(X) ∧ laysEggs(X) → platypus(X)"
class LogicTensorNetwork(tf.keras.Model):
    def __init__(self):
        super().__init__()
        self.mammal_classifier = tf.keras.Sequential([...])
        self.laysEggs_classifier = tf.keras.Sequential([...])
        self.platypus_classifier = tf.keras.Sequential([...])

    def call(self, x):
        # Neural predictions
        is_mammal = self.mammal_classifier(x)
        lays_eggs = self.laysEggs_classifier(x)
        is_platypus = self.platypus_classifier(x)

        # Logical constraint (soft)
        rule_satisfaction = IMPLIES(
            AND(is_mammal, lays_eggs),
            is_platypus
        )

        return is_platypus, rule_satisfaction

    def loss(self, x, y_true):
        y_pred, rule_sat = self.call(x)

        # Standard supervised loss
        supervised_loss = tf.keras.losses.binary_crossentropy(y_true, y_pred)

        # Logical constraint loss: encourage rule_sat → 1
        rule_loss = 1 - rule_sat

        return supervised_loss + lambda_reg * rule_loss

# Training enforces logical consistency
model = LogicTensorNetwork()
model.compile(optimizer='adam')
model.fit(X_train, y_train)  # Now predictions follow logical rules!
\`\`\`

**Benefits:**
- Neural networks that **obey logical rules**
- **Interpretable:** Can inspect which rules are satisfied
- **Sample efficient:** Regularization via logic reduces overfitting

**Used by:**
- **Google Research:** Constrain NLP models with ontological knowledge
- **Healthcare AI:** Ensure medical predictions follow clinical guidelines
- **Autonomous vehicles:** Safety rules as logical constraints

## Approach 3: Neural Theorem Proving

**Teach neural networks to generate proofs:**

\`\`\`
Problem: Prove that √2 is irrational

Neural Theorem Prover:
1. Assume √2 = p/q (rational) where p, q coprime
2. Then 2 = p²/q²  [square both sides]
3. So 2q² = p²      [multiply by q²]
4. Thus p² is even  [divisible by 2]
5. So p is even     [if p² even, p even]
6. Let p = 2k       [definition of even]
7. Then 2q² = (2k)² = 4k²  [substitute]
8. So q² = 2k²      [divide by 2]
9. Thus q is even   [q² even implies q even]
10. Contradiction!  [p and q both even, not coprime]

∴ √2 is irrational
\`\`\`

**GPT-f (OpenAI):**
- Trained on mathematical proofs from formal proof assistants (Lean, Isabelle)
- Can suggest next proof steps
- **Breakthrough:** Found shorter proofs than humans for some theorems

**AlphaGeometry (Google DeepMind, 2024):**
- Combined neural language model with symbolic deduction engine
- Solved 25/30 IMO geometry problems (human gold medalist: 25.9/30)
- **How:** Neural model proposes constructions (e.g., "draw auxiliary line"), symbolic engine verifies

## Approach 4: Knowledge Graph Embeddings → Fine-tuning

**Inject structured knowledge into LLMs:**

\`\`\`python
# 1. Train KG embeddings (TransE, RotatE)
kg_embeddings = train_kg_embeddings(knowledge_graph)

# 2. Generate textual descriptions from KG triples
def kg_to_text(triple):
    subj, rel, obj = triple
    return f"{subj} has relation {rel} to {obj}"

kg_text = [kg_to_text(t) for t in knowledge_graph.triples]

# 3. Fine-tune LLM on KG text
model = GPT2.from_pretrained("gpt2")
model.fine_tune(kg_text)

# Now model knows KG facts!
model.generate("Paris is the capital of")  # → "France"
\`\`\`

**Real example: BioGPT (Microsoft Research)**
- Pre-trained on 15M PubMed abstracts
- Fine-tuned on biomedical knowledge graphs (UMLS, DrugBank)
- State-of-art on biomedical QA

---`,
    },
    {
      id: 'neural-to-symbolic',
      title: '4. Neural to Symbolic: Extracting Knowledge from Neural Networks',
      content: `## The Reverse Direction: Making Neural Networks Interpretable

**Goal:** Extract symbolic knowledge (rules, logic, explanations) from trained neural networks.

## Approach 1: Rule Extraction from Neural Networks

**Convert neural decision boundaries to logical rules:**

\`\`\`python
from sklearn.tree import DecisionTreeClassifier, export_text

# 1. Train neural network
neural_net = NeuralNetwork()
neural_net.fit(X_train, y_train)

# 2. Use neural net to label large dataset
X_synth = generate_synthetic_data(n=100000)
y_synth = neural_net.predict(X_synth)

# 3. Train decision tree on neural predictions
tree = DecisionTreeClassifier(max_depth=5)
tree.fit(X_synth, y_synth)

# 4. Extract rules from tree
rules = export_text(tree, feature_names=feature_names)
print(rules)
\`\`\`

**Output (interpretable rules):**
\`\`\`
IF age <= 30 AND income <= 50000 THEN class=reject
ELIF age > 30 AND credit_score > 700 THEN class=approve
ELIF ...
\`\`\`

**Benefits:**
- ✅ Interpretable approximation of neural network
- ✅ Regulatory compliance (e.g., GDPR "right to explanation")
- ✅ Debug and audit model decisions

**Limitations:**
- ❌ Approximation may lose accuracy
- ❌ High-dimensional data → exponentially many rules

**Used in:**
- **Finance:** Explain loan decisions
- **Healthcare:** Explain diagnoses to doctors
- **Legal:** Auditable AI in court

## Approach 2: Attention as Symbolic Alignment

**Transformer attention weights reveal which tokens influence predictions:**

\`\`\`python
from transformers import AutoModel, AutoTokenizer

model = AutoModel.from_pretrained("bert-base-uncased", output_attentions=True)
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

text = "Paris is the capital of France"
inputs = tokenizer(text, return_tensors="pt")
outputs = model(**inputs)

# Extract attention weights
attentions = outputs.attentions  # (layers, heads, seq_len, seq_len)

# Visualize which words "France" attends to
france_idx = tokenizer.convert_tokens_to_ids("france")
france_attention = attentions[0][0][france_idx]  # Layer 0, Head 0

print("France attends to:")
for token, weight in zip(tokenizer.tokenize(text), france_attention):
    print(f"  {token}: {weight:.3f}")
\`\`\`

**Output:**
\`\`\`
France attends to:
  Paris: 0.823    ← Strong attention! Model "knows" Paris is capital
  capital: 0.654
  of: 0.112
  France: 0.089   ← Self-attention
\`\`\`

**Applications:**
- **Explainable QA:** Show which passage text influenced answer
- **Machine translation:** Align source/target words
- **Fact verification:** See which facts model relied on

## Approach 3: Concept Activation Vectors (CAVs)

**Find directions in neural network activations corresponding to human concepts:**

\`\`\`python
# 1. Collect examples of concept "striped"
striped_images = load_images(["zebra", "tiger", "striped shirt"])
not_striped_images = load_images(["lion", "bear", "plain shirt"])

# 2. Get activations from neural network layer
activations_striped = model.get_layer_activations(striped_images, layer=5)
activations_not = model.get_layer_activations(not_striped_images, layer=5)

# 3. Train linear classifier to separate concepts
from sklearn.svm import SVC
cav = SVC(kernel='linear')
cav.fit(
    np.vstack([activations_striped, activations_not]),
    [1]*len(striped_images) + [0]*len(not_striped_images)
)

# 4. CAV normal vector = concept direction
concept_direction = cav.coef_

# 5. Test: How much does "striped" concept activate for zebra?
zebra_activation = model.get_layer_activations(zebra_image, layer=5)
striped_score = np.dot(zebra_activation, concept_direction)
print(f"Zebra has striped score: {striped_score}")  # High!
\`\`\`

**What this gives us:**
- **Concept sensitivity:** Which classes are sensitive to "striped" concept?
- **Debugging:** If model classifies cat as dog, check which concepts activated
- **Safety:** Detect if model uses spurious concepts (e.g., "background grass" for "cow")

**Real use: Google's TCAV (Testing with CAVs)**
- Analyze image classifiers for biases
- Example: Does "Doctor" class activate for "male" concept more than "female"?

## Approach 4: Neurosymbolic Programming (DreamCoder)

**Extract reusable programs from neural demonstrations:**

\`\`\`python
# Neural network learns to solve many tasks
tasks = [
    "draw a line",
    "draw a square",
    "draw a circle",
    "draw a house"
]

neural_solutions = [neural_net.solve(task) for task in tasks]

# Extract common subroutines
library = extract_programs(neural_solutions)

# Discovered library:
# def line(start, end): ...
# def rectangle(w, h): return [line(...), line(...), ...]
# def circle(r): ...
# def house(): return [rectangle(10, 10), triangle(...)]
\`\`\`

**DreamCoder (MIT):**
- Neural network proposes solutions to tasks
- Program synthesizer extracts symbolic programs
- Builds up library of reusable functions
- **Result:** Can solve new tasks by composing library functions

**Benefits:**
- ✅ Learns abstractions (like human programmers)
- ✅ Sample efficient (reuse learned subroutines)
- ✅ Interpretable (symbolic programs, not weights)

---`,
    },
    {
      id: 'production-systems',
      title: '5. Production Neuro-Symbolic Systems',
      content: `## Real-World Neuro-Symbolic AI Systems

### **1. AlphaGeometry (Google DeepMind, 2024)**
**Problem:** Solve International Math Olympiad (IMO) geometry problems

**Architecture:**
\`\`\`
┌──────────────────────┐
│  Geometry Problem    │  Prove: Triangle ABC is isosceles
└──────────┬───────────┘
           ↓
┌──────────────────────────────────────────────────┐
│ Neural Language Model (Symbolic Constructor)     │
│ • Trained on millions of synthetic proofs        │
│ • Proposes: "Draw auxiliary point D such that..." │
└──────────┬───────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────────────┐
│ Symbolic Deduction Engine (Formal Verifier)      │
│ • Angle chasing, congruence rules, etc.          │
│ • Verifies if proposed construction helps        │
│ • If stuck, requests more constructions from LM  │
└──────────┬───────────────────────────────────────┘
           ↓
      Formal Proof ✓
\`\`\`

**Results:**
- Solved **25 out of 30** IMO geometry problems
- Human gold medalist average: **25.9/30**
- Previous AI systems: ~0-10/30

**Why it works:**
- Neural: Creative intuition for auxiliary constructions
- Symbolic: Rigorous verification, guaranteed correctness
- Together: Superhuman geometry reasoning

### **2. Amazon Warehouse Robots**
**Problem:** Navigate warehouse, avoid obstacles, pick items

**Architecture:**
\`\`\`
┌──────────────────────┐
│ Camera Input         │  Raw pixels from robot camera
└──────────┬───────────┘
           ↓
┌──────────────────────────────────┐
│ Neural Perception                │
│ • Object detection (YOLO)        │
│ • Depth estimation               │
│ • Obstacle segmentation          │
└──────────┬───────────────────────┘
           ↓
┌──────────────────────────────────┐
│ Symbolic World Model             │
│ • 3D map of warehouse            │
│ • Item locations (x, y, z)       │
│ • Robot state (pose, velocity)   │
└──────────┬───────────────────────┘
           ↓
┌──────────────────────────────────┐
│ Symbolic Planner (A* Search)     │
│ • Optimal path to target item    │
│ • Collision avoidance            │
│ • Task scheduling (PDDL)         │
└──────────┬───────────────────────┘
           ↓
┌──────────────────────────────────┐
│ Neural Control Policy            │
│ • Motor commands for smooth path │
│ • Adaptive to slippery floors    │
└──────────────────────────────────┘
\`\`\`

**Why this works:**
- Neural: Handle sensor noise, adapt to unexpected obstacles
- Symbolic: Provably safe paths, explainable decisions for safety certification

### **3. Self-Driving Cars (Waymo, Tesla FSD)**
**Architecture:**
\`\`\`
Perception (Neural)              Prediction (Hybrid)              Planning (Symbolic)
────────────────────            ────────────────────            ────────────────────
↓ Cameras/LiDAR                 ↓ Where will cars go?           ↓ What should I do?
↓ Lane detection                ↓ Neural: Learn patterns        ↓ Rule-based planner
↓ Object detection              ↓ Symbolic: Traffic rules       ↓ "Never run red light"
↓ Depth estimation              ↓ Physics constraints           ↓ Optimization (MPC)
                                                                ↓ Safety verification
                 ↓                            ↓                              ↓
                 └────────→ Scene Graph ←─────┴──────────────────────────────┘
                            ↓
                     Control signals to car
\`\`\`

**Key insight:**
- **Neural** for perception (CV is solved by deep learning)
- **Symbolic** for safety-critical decisions (can't have "90% accurate" braking)
- **Hybrid** for prediction (learn common patterns, encode hard constraints)

### **4. IBM Watson for Oncology**
**Problem:** Recommend cancer treatments based on patient data + medical literature

**Architecture:**
\`\`\`
┌──────────────────────────────────────┐
│ Patient Data                          │  Medical records, labs, imaging
└──────────┬───────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ Neural NLP                            │  Extract symptoms, diagnoses from text
└──────────┬───────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ Knowledge Graph (Symbolic)            │
│ • Cancer types                        │
│ • Drugs (efficacy, side effects)      │
│ • Clinical trial results              │
│ • Treatment guidelines                │
└──────────┬───────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ Symbolic Reasoning                    │
│ • SPARQL queries on KG                │
│ • Rule-based recommendations          │
│ • If (stage=III AND gene=BRCA1)       │
│      THEN recommend chemo_regimen_X   │
└──────────┬───────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ Neural Ranking                        │  Rank treatments by predicted efficacy
└──────────────────────────────────────┘
           ↓
      Top 3 treatment options + evidence
\`\`\`

**Why this works:**
- Neural: Extract information from unstructured clinical notes
- Symbolic: Encode medical guidelines, ensure recommendations follow evidence-based protocols
- Auditable: Doctors can trace reasoning (critical for liability)

### **5. OpenAI GPT-4 Code Interpreter**
**Problem:** LLMs are bad at math, but good at natural language

**Solution:**
\`\`\`
User: "What is the 100th Fibonacci number?"
        ↓
┌──────────────────────────────────────┐
│ GPT-4 (Neural)                        │  Understands question is about Fibonacci
└──────────┬───────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ Code Generation (Neural)              │
│ Generates Python code:                │
│   def fib(n):                         │
│       a, b = 0, 1                     │
│       for _ in range(n):              │
│           a, b = b, a + b             │
│       return a                        │
│   print(fib(100))                     │
└──────────┬───────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ Python Interpreter (Symbolic)         │  Executes code, returns result
└──────────┬───────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ GPT-4 (Neural)                        │  Formats answer in natural language
└──────────────────────────────────────┘
           ↓
"The 100th Fibonacci number is 354224848179261915075"
\`\`\`

**Impact:**
- GPT-4 went from ~30% on MATH benchmark to ~70% with Code Interpreter
- Reliably solves arithmetic, statistics, data analysis
- Used by millions of ChatGPT users

### **6. Facebook M (Meta AI Assistant, 2015-2018)**
**Architecture:** LLM + Human operators + APIs

**How it worked:**
\`\`\`
User: "Book me a table at Italian restaurant tonight"
        ↓
┌──────────────────────────────────────┐
│ Neural NLP (Intent Classification)    │  Intent: book_restaurant
└──────────┬───────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ Symbolic API Calls                    │
│ • Query OpenTable API                 │
│ • Parameters: cuisine=Italian,        │
│               time=tonight,           │
│               location=user_city      │
└──────────┬───────────────────────────┘
           ↓
    (If ambiguous or API fails)
           ↓
┌──────────────────────────────────────┐
│ Human Operator (Fallback)             │  Real person completes task
└──────────────────────────────────────┘
\`\`\`

**Why it failed:**
- Too expensive (human fallback for 70% of tasks)
- But pioneered hybrid AI + human + API approach

**Modern version: ChatGPT Plugins/GPTs**
- LLM (neural) generates API calls (symbolic)
- No human fallback, but better LLMs (GPT-4)

---

## Key Takeaways

**Neuro-symbolic AI is not one technique, but a paradigm shift:**

| **Approach** | **Neural Role** | **Symbolic Role** | **Example** |
|---|---|---|---|
| **RAG** | Understand query, generate answer | Retrieve facts from KB | ChatGPT + Bing |
| **Distillation** | Learn from symbolic data | Provide training signal | AlphaGo |
| **Constrained Learning** | Perception, pattern recognition | Enforce logical rules | LTNs, safety constraints |
| **Tool Use** | Natural language interface | Execute precise operations | GPT-4 + Code Interpreter |
| **Hybrid Reasoning** | Propose solutions | Verify correctness | AlphaGeometry |

**The future is hybrid:**
- Pure neural: Great at perception, poor at reasoning
- Pure symbolic: Great at reasoning, poor at perception
- **Neuro-symbolic: Best of both worlds**

**What you'll build:**
In the next lessons and challenges, you'll implement:
1. **RAG system** with knowledge graph retrieval
2. **Graph Neural Networks (GNNs)** to learn on structured data
3. **Neuro-symbolic reasoner** combining logic and learning

Let's make AI systems that can both **learn** and **reason**.`,
    },
  ],
  summary: [
    'Neural AI excels at perception and learning from data, symbolic AI excels at reasoning and interpretability',
    'RAG (Retrieval-Augmented Generation) grounds LLMs in factual knowledge from external sources',
    'Production neuro-symbolic systems: IBM Watson, Google Gemini with search, enterprise RAG',
    'Cutting-edge: AlphaGeometry (neural + symbolic theorem proving), DALL-E 3 with text understanding',
    'Future: Seamless integration of learning and reasoning in single architectures'
  ],
  nextSteps: [
    'Implement a RAG system with knowledge graph retrieval',
    'Build Graph Neural Networks to learn on structured data',
    'Combine GNNs with LLMs for knowledge-grounded generation',
    'Explore neuro-symbolic frameworks like Logic Tensor Networks'
  ],
  checkYourUnderstanding: [
    {
      question: 'What are the complementary strengths of neural vs symbolic AI?',
      answer: 'Neural: pattern recognition, robustness to noise, learning from data. Symbolic: logical reasoning, interpretability, compositionality, guarantees. Neuro-symbolic combines both: learn from data + reason with structure.'
    },
    {
      question: 'How does RAG reduce hallucinations in LLMs?',
      answer: 'RAG retrieves factual context from external knowledge base (KG, docs) and includes it in the prompt. LLM generates answer grounded in retrieved facts, with citations. Decouples knowledge (external) from reasoning (LLM).'
    },
    {
      question: 'Give an example of a production neuro-symbolic system.',
      answer: 'Examples: 1) Google Gemini with search grounding, 2) IBM Watson for Oncology (medical KG + NLP), 3) Perplexity.ai (RAG with web search), 4) Enterprise RAG systems (LLM + company documents).'
    },
    {
      question: 'How did AlphaGeometry achieve IMO-level geometry solving?',
      answer: 'Hybrid approach: neural language model proposes creative auxiliary constructions, symbolic deduction engine verifies correctness. Solved 25/30 IMO geometry problems (near human gold medalist level).'
    }
  ]
};