import { TheoryLesson } from './types';

export const knowledgeGraphEmbeddingsLesson: TheoryLesson = {
  id: 'knowledge-graph-embeddings',
  title: 'Knowledge Graph Embeddings: Machine Learning Meets Symbolic Knowledge',
  description: 'Master KG embeddings (TransE, DistMult, ComplEx, RotatE) - the bridge between symbolic reasoning and neural networks',
  learningObjectives: [
    'Understand why embeddings bridge symbolic graphs and neural networks',
    'Master TransE, DistMult, ComplEx, and RotatE embedding models',
    'Learn evaluation metrics: MRR, Hits@k, filtered vs raw rankings',
    'Build production KG embedding systems with PyTorch'
  ],
  prerequisites: ['knowledge-graphs-introduction', 'vector-spaces-theory'],
  sections: [
    {
      id: 'why-embeddings',
      title: '1. Why Embeddings? Making Graphs Amenable to Machine Learning',
      content: `## The Problem: Graphs Are Not Vectors

**Machine learning loves vectors:**
- Neural networks: input = vector, output = vector
- Similarity: cosine distance between vectors
- Clustering: k-means on vectors

**Knowledge graphs are symbolic:**
- Entities: discrete symbols (Obama, Hawaii, USA)
- Relationships: discrete edge labels (bornIn, locatedIn)
- No inherent notion of "distance" or "similarity"

**The question:** How do we apply ML to KGs?

---

## Knowledge Graph Embeddings: The Bridge

> **KG Embedding:** Map entities and relationships to continuous vector space while preserving graph structure.

**Goal:** Learn embeddings such that:
\`\`\`
If (h, r, t) is true in KG
Then f(h, r, t) = high score

If (h, r, t) is false
Then f(h, r, t) = low score
\`\`\`

Where:
- h = head entity embedding
- r = relationship embedding
- t = tail entity embedding
- f = scoring function

---

## Example: Translation-Based Embeddings

**Idea:** Relationships as translations in embedding space

\`\`\`
Fact: (Obama, bornIn, Hawaii)

In embedding space:
  h = [0.2, 0.5, -0.3, ...]  # Obama vector
  r = [0.1, -0.2, 0.4, ...]  # bornIn vector
  t = [0.3, 0.3, 0.1, ...]   # Hawaii vector

Relationship: h + r ≈ t
  [0.2, 0.5, -0.3] + [0.1, -0.2, 0.4] ≈ [0.3, 0.3, 0.1]

Score: ||h + r - t||  # L2 distance
  Low distance = high score = likely true
\`\`\`

**Visualization (2D for simplicity):**
\`\`\`
    t (Hawaii)
      ↑
      | r (bornIn)
      |
  h (Obama)
\`\`\`

---

## Applications: Why We Care

### 1. **Link Prediction**

**Problem:** KG is incomplete. Fill in missing facts.

\`\`\`
Known: (Obama, bornIn, Hawaii)
       (Obama, spouse, Michelle)
Missing: (Michelle, bornIn, ?)

Predict: For each candidate location, compute:
  score = f(Michelle, bornIn, candidate)

Rank candidates:
1. Chicago: score = 0.95  ← Most likely!
2. New York: score = 0.45
3. London: score = 0.12

Predict: Michelle bornIn Chicago
\`\`\`

**Real-world:** Google KG uses this to fill gaps automatically.

### 2. **Relation Extraction**

**Problem:** Given entities, find relationship.

\`\`\`
Text: "Marie Curie discovered radium."

Entities: Marie Curie, radium
Relationship: ?

For each candidate relation r:
  score = f(Marie_Curie, r, radium)

Highest score: "discovered"
\`\`\`

### 3. **Entity Type Prediction**

**Problem:** Classify entities.

\`\`\`
Entity: "Python"
Types: {ProgrammingLanguage, Snake, MythicalCreature}

For each type:
  score = f(Python, instanceOf, type)

Highest: ProgrammingLanguage
\`\`\`

### 4. **Semantic Search**

**Problem:** Find similar entities.

\`\`\`
Query: "Find scientists similar to Einstein"

Compute: cosine_similarity(Einstein_embedding, all_entities)

Top results:
1. Niels Bohr (physicist)
2. Marie Curie (physicist/chemist)
3. Richard Feynman (physicist)
\`\`\`

### 5. **Recommendation**

**Problem:** Suggest items based on KG.

\`\`\`
User liked: "Inception" (movie)

KG: Inception → directedBy → Nolan
     Inception → hasGenre → SciFi

Find: Movies with similar embeddings
  OR Movies connected to Nolan/SciFi

Recommend: "Interstellar", "The Matrix"
\`\`\`

---

## The Challenge: What Makes a Good Embedding?

**Desiderata:**

1. **Preserve graph structure**
   - Close in graph → close in embedding space
   - Same relationship pattern → similar embeddings

2. **Capture relationship semantics**
   - Symmetric relations: friendOf(A,B) ⟺ friendOf(B,A)
   - Transitive relations: ancestorOf is transitive
   - Composition: bornIn ∘ locatedIn = bornIn (transitive)

3. **Generalize to unseen triples**
   - Train on subset of KG
   - Predict on remaining triples

4. **Scalable**
   - Real KGs: billions of entities
   - Training must be feasible

---

## The Landscape of Embedding Models

Over the past decade, dozens of models have been proposed. We'll focus on the most influential:

| Model | Year | Key Idea | Strengths |
|-------|------|----------|-----------|
| **TransE** | 2013 | h + r ≈ t | Simple, interpretable, works well |
| **TransH** | 2014 | Relation-specific hyperplanes | Handles 1-to-N relations |
| **TransR** | 2015 | Separate entity/relation spaces | More expressive |
| **DistMult** | 2014 | Bilinear scoring | Symmetric relations |
| **ComplEx** | 2016 | Complex-valued embeddings | Asymmetric relations |
| **RotatE** | 2019 | Rotation in complex space | State-of-art, all relation types |

**We'll focus on:** TransE, DistMult, ComplEx, RotatE

---

## Training Process Overview

**1. Initialize embeddings randomly**
\`\`\`python
import numpy as np

num_entities = 10000
num_relations = 50
embedding_dim = 100

# Random initialization
entity_embeddings = np.random.randn(num_entities, embedding_dim)
relation_embeddings = np.random.randn(num_relations, embedding_dim)

# Normalize (optional, depends on model)
entity_embeddings = entity_embeddings / np.linalg.norm(entity_embeddings, axis=1, keepdims=True)
\`\`\`

**2. Sample training triples**
\`\`\`python
# Positive triples (from KG)
positive_triples = [
    (obama_id, bornIn_id, hawaii_id),
    (obama_id, spouse_id, michelle_id),
    ...
]
\`\`\`

**3. Generate negative triples**
\`\`\`python
# Corrupt head or tail
def corrupt_triple(h, r, t):
    if random() < 0.5:
        # Corrupt head
        h_neg = random_entity()
        return (h_neg, r, t)
    else:
        # Corrupt tail
        t_neg = random_entity()
        return (h, r, t_neg)

negative_triples = [corrupt_triple(h, r, t) for (h, r, t) in positive_triples]
\`\`\`

**4. Compute loss**
\`\`\`python
# Margin ranking loss
def loss(positive_score, negative_score, margin=1.0):
    return max(0, margin - positive_score + negative_score)

total_loss = 0
for pos, neg in zip(positive_triples, negative_triples):
    pos_score = scoring_function(*pos)
    neg_score = scoring_function(*neg)
    total_loss += loss(pos_score, neg_score)
\`\`\`

**5. Update embeddings via gradient descent**
\`\`\`python
# Backprop through scoring function
optimizer.zero_grad()
total_loss.backward()
optimizer.step()
\`\`\`

**6. Repeat for many epochs**

---

## Evaluation Metrics

**Task:** Rank all possible tails given (h, r, ?)

**Metrics:**

### 1. Mean Rank (MR)
\`\`\`
True tail: Hawaii
Ranked list: [Kenya, California, Hawaii, Texas, ...]
           Position: 3

Mean Rank = average position of correct answer
Lower is better
\`\`\`

### 2. Mean Reciprocal Rank (MRR)
\`\`\`
MRR = 1 / rank
If rank = 3, MRR = 1/3 = 0.33

Average MRR over all test triples
Higher is better (0 to 1)
\`\`\`

### 3. Hits@k
\`\`\`
Hits@10 = % of times correct answer in top 10
Hits@3 = % of times correct answer in top 3
Hits@1 = % of times correct answer is #1

Higher is better (0% to 100%)
\`\`\`

**Example:**
\`\`\`
Test: (Obama, bornIn, ?)
Ranked: [Hawaii(1), Kenya(2), California(3), ...]

Rank = 1
MRR = 1.0
Hits@1 = 100%
Hits@3 = 100%
Hits@10 = 100%
\`\`\`

---

## Summary: The Embedding Revolution

**Before embeddings:**
- KGs were symbolic, discrete
- ML difficult to apply
- Limited to rule-based reasoning

**After embeddings:**
- KGs have continuous representations
- ML techniques applicable (neural networks, clustering, etc.)
- Enables link prediction, relation extraction, QA

**Impact:**
- 📈 Google KG improved by 30% via embedding-based completion
- 🔬 Drug discovery: predict protein-drug interactions
- 🛒 E-commerce: better recommendations
- 🤖 NLP: ground language models in knowledge

**Next:** Let's dive into specific embedding models! 🚀
`,
      examples: []
    },
    {
      id: 'transe',
      title: '2. TransE: Translation-Based Embeddings',
      content: `## TransE: The Foundation Model (2013)

**Paper:** "Translating Embeddings for Modeling Multi-relational Data" (Bordes et al., 2013)

**Core Idea:** Model relationships as translations in embedding space.

---

## The TransE Principle

**Intuition:** If (h, r, t) is a fact, then **h + r ≈ t**

\`\`\`
Vector space:
  Obama_vec + bornIn_vec ≈ Hawaii_vec
  [0.2, 0.5, -0.3] + [0.1, -0.2, 0.4] ≈ [0.3, 0.3, 0.1]
\`\`\`

**Scoring function:**
\`\`\`
score(h, r, t) = -||h + r - t||
\`\`\`

Where ||·|| is L1 or L2 norm:
- L1: |x₁| + |x₂| + ... + |xₙ|
- L2: √(x₁² + x₂² + ... + xₙ²)

**Interpretation:**
- Low distance → high score → likely true
- High distance → low score → likely false

---

## TransE Training

**1. Loss Function: Margin Ranking Loss**

\`\`\`
L = Σ max(0, γ + d(h+r, t) - d(h'+r, t'))
    (h,r,t) ∈ S
    (h',r,t') ∈ S'

Where:
- S = positive triples (from KG)
- S' = negative triples (corrupted)
- γ = margin (hyperparameter, e.g., 1.0)
- d = distance function
\`\`\`

**Intuition:** Push positive triples close, negative triples far.

**2. Negative Sampling**

\`\`\`python
def corrupt_triple(h, r, t, entities):
    """Generate negative triple by corrupting head or tail."""
    if random() < 0.5:
        # Corrupt head
        h_neg = random.choice(entities)
        while (h_neg, r, t) in KG:  # Avoid true triples
            h_neg = random.choice(entities)
        return (h_neg, r, t)
    else:
        # Corrupt tail
        t_neg = random.choice(entities)
        while (h, r, t_neg) in KG:
            t_neg = random.choice(entities)
        return (h, r, t_neg)
\`\`\`

**3. Normalization**

After each gradient update:
\`\`\`python
# Normalize entity embeddings to unit length
entity_embeddings = entity_embeddings / np.linalg.norm(entity_embeddings, axis=1, keepdims=True)

# Relations are NOT normalized (they represent translations)
\`\`\`

---

## TransE in Code

\`\`\`python
import torch
import torch.nn as nn

class TransE(nn.Module):
    def __init__(self, num_entities, num_relations, embedding_dim=50, margin=1.0):
        super().__init__()

        # Embeddings
        self.entity_embeddings = nn.Embedding(num_entities, embedding_dim)
        self.relation_embeddings = nn.Embedding(num_relations, embedding_dim)

        # Initialize
        nn.init.xavier_uniform_(self.entity_embeddings.weight)
        nn.init.xavier_uniform_(self.relation_embeddings.weight)

        self.margin = margin
        self.embedding_dim = embedding_dim

    def forward(self, h, r, t):
        """
        Compute score for triple (h, r, t).

        Args:
            h, r, t: Tensor of entity/relation IDs (batch_size,)

        Returns:
            score: Tensor (batch_size,)
        """
        h_emb = self.entity_embeddings(h)  # (batch, dim)
        r_emb = self.relation_embeddings(r)
        t_emb = self.entity_embeddings(t)

        # TransE score: -||h + r - t||
        score = torch.norm(h_emb + r_emb - t_emb, p=2, dim=1)
        return -score  # Negate so higher = better

    def loss(self, pos_h, pos_r, pos_t, neg_h, neg_r, neg_t):
        """
        Compute margin ranking loss.

        Positive triples: (pos_h, pos_r, pos_t)
        Negative triples: (neg_h, neg_r, neg_t)
        """
        pos_score = self.forward(pos_h, pos_r, pos_t)
        neg_score = self.forward(neg_h, neg_r, neg_t)

        # Margin ranking loss
        loss = torch.relu(self.margin + neg_score - pos_score)
        return loss.mean()

    def normalize_embeddings(self):
        """Normalize entity embeddings to unit length."""
        self.entity_embeddings.weight.data = torch.nn.functional.normalize(
            self.entity_embeddings.weight.data, p=2, dim=1
        )

# Training loop
model = TransE(num_entities=1000, num_relations=50, embedding_dim=100)
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

for epoch in range(100):
    for batch in dataloader:
        pos_h, pos_r, pos_t, neg_h, neg_r, neg_t = batch

        loss = model.loss(pos_h, pos_r, pos_t, neg_h, neg_r, neg_t)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        # Normalize after each update
        model.normalize_embeddings()
\`\`\`

---

## TransE Strengths

✅ **Simple:** Easy to understand and implement
✅ **Interpretable:** Geometric meaning (translations)
✅ **Efficient:** Fast training, low memory
✅ **Effective:** Works well on many benchmarks

**When TransE shines:**
- 1-to-1 relations (bornIn, capital)
- Large-scale KGs (millions of entities)
- Resource-constrained settings

---

## TransE Limitations

### 1. **Cannot Model 1-to-N Relations Well**

\`\`\`
Example: hasChild (1-to-many)
  Obama hasChild Malia
  Obama hasChild Sasha

TransE forces:
  Obama + hasChild ≈ Malia
  Obama + hasChild ≈ Sasha

But: Malia ≠ Sasha!
→ Contradiction in embedding space
\`\`\`

### 2. **Cannot Model Symmetric Relations**

\`\`\`
Example: spouse (symmetric)
  Obama spouse Michelle
  Michelle spouse Obama

TransE requires:
  Obama + spouse ≈ Michelle
  Michelle + spouse ≈ Obama

→ Obama ≈ Michelle (they collapse to same point!)
\`\`\`

### 3. **Cannot Model Inverse Relations**

\`\`\`
Example: parent / child (inverse)
  Obama parent Malia
  Malia child Obama

TransE learns separate embeddings for parent and child
→ Doesn't capture that child = inverse of parent
\`\`\`

**Solution:** Extensions like TransH, TransR, or different models (DistMult, ComplEx)

---

## TransE Variants

**TransH (2014):** Relation-specific hyperplanes
- Entities projected onto relation-specific hyperplane
- Allows 1-to-N relations

**TransR (2015):** Separate entity and relation spaces
- Entities in entity space Rₑ
- Relations in relation space Rᵣ
- Project entities to relation space via matrix Mᵣ

**TransD (2015):** Dynamic mapping matrices
- Each entity-relation pair has its own projection

**All share the translation principle but add flexibility.**

---

## Summary: TransE

**Key equation:** h + r ≈ t

**Scoring:** -||h + r - t||₂

**Training:** Margin ranking loss with negative sampling

**Best for:** 1-to-1 relations, large-scale KGs

**Limitations:** Struggles with 1-to-N, symmetric, inverse relations

**Historical importance:** Launched the KG embedding revolution!

**Next:** DistMult and ComplEx—bilinear models that handle these challenges.
`,
      examples: []
    },
    {
      id: 'distmult-complex',
      title: '3. DistMult and ComplEx: Bilinear Models',
      content: `## DistMult: Bilinear Scoring (2014)

**Paper:** "Embedding Entities and Relations for Learning and Inference in Knowledge Bases" (Yang et al., 2014)

**Key Idea:** Use bilinear scoring instead of translation.

---

## DistMult Scoring Function

\`\`\`
score(h, r, t) = hᵀ · diag(r) · t = Σᵢ hᵢ · rᵢ · tᵢ
\`\`\`

**In code:**
\`\`\`python
score = torch.sum(h * r * t, dim=1)
# Element-wise multiplication, then sum
\`\`\`

**Intuition:**
- High score when h, r, t are "aligned" in same directions
- r acts as a bilinear weight

---

## DistMult Strengths

✅ **Handles 1-to-N relations**
\`\`\`
Obama hasChild Malia: score = h_obama · r_child · t_malia
Obama hasChild Sasha: score = h_obama · r_child · t_sasha

No contradiction! Malia and Sasha can have different scores.
\`\`\`

✅ **Efficient computation**
- Just element-wise multiplication + sum
- Very fast

✅ **Interpretable**
- Relation weights dimensions of entity space

---

## DistMult Limitations

❌ **Cannot model asymmetric relations**

**Problem:** Scoring is symmetric in h and t
\`\`\`
score(h, r, t) = Σ hᵢ · rᵢ · tᵢ
              = Σ tᵢ · rᵢ · hᵢ
              = score(t, r, h)
\`\`\`

**This means:**
\`\`\`
If Obama parent Malia has high score
Then Malia parent Obama ALSO has high score

But Malia is NOT parent of Obama!
\`\`\`

**Solution:** ComplEx (Complex-valued embeddings)

---

## ComplEx: Complex-Valued Embeddings (2016)

**Paper:** "Complex Embeddings for Simple Link Prediction" (Trouillon et al., 2016)

**Key Idea:** Use complex numbers instead of real numbers!

---

## Why Complex Numbers?

**Complex number:** z = a + bi
- a = real part
- b = imaginary part
- i = √(-1)

**Key property:** Conjugate
\`\`\`
If z = a + bi
Then z̄ = a - bi (conjugate)

z · z̄ = (a + bi)(a - bi) = a² + b²  (real number!)
\`\`\`

**This asymmetry allows modeling directed relations!**

---

## ComplEx Scoring Function

**Embeddings:** h, r, t ∈ ℂᵈ (complex vectors)

**Score:**
\`\`\`
score(h, r, t) = Re(⟨h, r, t̄⟩) = Re(Σᵢ hᵢ · rᵢ · t̄ᵢ)
\`\`\`

Where:
- Re() = real part
- t̄ = complex conjugate of t
- ⟨·⟩ = inner product

**In code:**
\`\`\`python
# Embeddings are complex
h = h_real + 1j * h_imag  # j = imaginary unit in Python
r = r_real + 1j * r_imag
t = t_real + 1j * t_imag

# ComplEx score
score = torch.sum(h * r * torch.conj(t), dim=1).real
\`\`\`

---

## ComplEx Handles Asymmetric Relations

**Key insight:** Conjugate breaks symmetry!

\`\`\`
score(h, r, t) = Re(⟨h, r, t̄⟩)
score(t, r, h) = Re(⟨t, r, h̄⟩)

These are NOT equal (unless r is purely real)!
\`\`\`

**Example: parent relation**
\`\`\`
Obama parent Malia: high score
Malia parent Obama: low score

ComplEx can distinguish these!
\`\`\`

---

## ComplEx Implementation

\`\`\`python
class ComplEx(nn.Module):
    def __init__(self, num_entities, num_relations, embedding_dim):
        super().__init__()

        # Real and imaginary parts
        self.entity_real = nn.Embedding(num_entities, embedding_dim)
        self.entity_imag = nn.Embedding(num_entities, embedding_dim)
        self.rel_real = nn.Embedding(num_relations, embedding_dim)
        self.rel_imag = nn.Embedding(num_relations, embedding_dim)

        # Initialize
        nn.init.xavier_uniform_(self.entity_real.weight)
        nn.init.xavier_uniform_(self.entity_imag.weight)
        nn.init.xavier_uniform_(self.rel_real.weight)
        nn.init.xavier_uniform_(self.rel_imag.weight)

    def forward(self, h, r, t):
        """
        ComplEx scoring.

        score = Re(⟨h, r, t̄⟩)
              = Re(Σ (h_re + i·h_im) · (r_re + i·r_im) · (t_re - i·t_im))
        """
        h_re = self.entity_real(h)
        h_im = self.entity_imag(h)
        r_re = self.rel_real(r)
        r_im = self.rel_imag(r)
        t_re = self.entity_real(t)
        t_im = self.entity_imag(t)

        # Expand the complex multiplication
        # (h_re + i·h_im) · (r_re + i·r_im) · (t_re - i·t_im)
        # Real part only:
        score = (
            h_re * r_re * t_re +
            h_re * r_im * t_im +
            h_im * r_re * t_im -
            h_im * r_im * t_re
        )

        return score.sum(dim=1)
\`\`\`

---

## ComplEx Strengths

✅ **Handles asymmetric relations** (parent, child, etc.)
✅ **Handles symmetric relations** (spouse, sibling)
✅ **Handles 1-to-N relations**
✅ **Competitive accuracy** on benchmarks

**When ComplEx shines:**
- Asymmetric relations dominate
- Need to model diverse relation types

---

## ComplEx vs DistMult vs TransE

| Feature | TransE | DistMult | ComplEx |
|---------|--------|----------|---------|
| **1-to-1** | ✅ | ✅ | ✅ |
| **1-to-N** | ❌ | ✅ | ✅ |
| **Symmetric** | ❌ | ✅ | ✅ |
| **Asymmetric** | ✅ | ❌ | ✅ |
| **Inverse** | ❌ | ❌ | Partial |
| **Transitivity** | Partial | ❌ | ❌ |
| **Parameters** | 2d | 2d | 4d |
| **Speed** | Fast | Fastest | Fast |

Where d = embedding dimension.

**Conclusion:** ComplEx is the most versatile bilinear model!

---

## Training Tips

**1. Negative Sampling**
\`\`\`python
# Sample multiple negatives per positive
num_negatives = 10

for pos_triple in training_data:
    neg_triples = [corrupt_triple(pos_triple) for _ in range(num_negatives)]
\`\`\`

**2. Loss Function**
\`\`\`python
# Binary cross-entropy (treat as classification)
pos_score = model(pos_h, pos_r, pos_t)
neg_score = model(neg_h, neg_r, neg_t)

loss = -torch.log(torch.sigmoid(pos_score)).mean() \
       -torch.log(1 - torch.sigmoid(neg_score)).mean()
\`\`\`

**3. Regularization**
\`\`\`python
# L2 regularization on embeddings
l2_reg = (
    torch.norm(h_emb, p=2) +
    torch.norm(r_emb, p=2) +
    torch.norm(t_emb, p=2)
)

total_loss = classification_loss + lambda_reg * l2_reg
\`\`\`

**4. Learning Rate**
\`\`\`python
# Use adaptive optimizer
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# Or learning rate decay
scheduler = torch.optim.lr_scheduler.ExponentialLR(optimizer, gamma=0.95)
\`\`\`

---

## Summary: Bilinear Models

**DistMult:**
- score = Σ hᵢ · rᵢ · tᵢ
- Symmetric (can't distinguish h→t from t→h)
- Fast, simple, handles 1-to-N

**ComplEx:**
- score = Re(Σ hᵢ · rᵢ · t̄ᵢ)
- Asymmetric (via complex conjugate)
- Handles all relation types
- Current best bilinear model

**Next:** RotatE—the state-of-art model that combines best of both worlds! 🚀
`,
      examples: []
    },
    {
      id: 'rotate',
      title: '4. RotatE: Rotation-Based Embeddings (State-of-Art)',
      content: `## RotatE: Rotation in Complex Space (2019)

**Paper:** "RotatE: Knowledge Graph Embedding by Relational Rotation in Complex Space" (Sun et al., 2019)

**Key Idea:** Model relations as **rotations** in complex space.

**Impact:** State-of-art results on multiple benchmarks!

---

## The RotatE Principle

**In complex space:** Every relation is a rotation

\`\`\`
If (h, r, t) is true:
  t = h ∘ r  (in complex space)

Where ∘ denotes element-wise multiplication
\`\`\`

**Constraint on relations:** |rᵢ| = 1 for all dimensions i
- Relations are **unit complex numbers**
- They represent pure rotations (no scaling)

\`\`\`
rᵢ = e^(iθᵢ) = cos(θᵢ) + i·sin(θᵢ)

Where θᵢ ∈ [0, 2π) is the rotation angle
\`\`\`

---

## RotatE Scoring Function

\`\`\`
score(h, r, t) = -||h ∘ r - t||
\`\`\`

Where:
- h, t ∈ ℂᵈ (complex entity embeddings)
- r ∈ ℂᵈ with |rᵢ| = 1 (unit modulus)
- ∘ = element-wise product
- ||·|| = L1 or L2 norm

**Interpretation:**
- h rotated by r should be close to t
- Low distance → high score → likely true

---

## Why Rotations?

**Geometric intuition:**

\`\`\`
2D example (one complex dimension):

h = 1 + 0i  (angle 0°)
r = e^(i·90°) = 0 + 1i  (rotation by 90°)

h ∘ r = (1 + 0i) · (0 + 1i) = 0 + 1i

Result: h rotated 90° counterclockwise!
\`\`\`

**In d dimensions:** Each dimension rotates independently

\`\`\`
h = [h₁, h₂, ..., hₐ]  (d complex numbers)
r = [r₁, r₂, ..., rₐ]  (d unit complex numbers)

h ∘ r = [h₁·r₁, h₂·r₂, ..., hₐ·rₐ]

Each hᵢ rotated by angle θᵢ (from rᵢ = e^(iθᵢ))
\`\`\`

---

## RotatE Handles All Relation Patterns

### 1. **Symmetric Relations** (spouse, sibling)

\`\`\`
If r is symmetric: r ∘ r = identity

θᵢ = 0° or 180° for all i

Example: spouse
  r = [e^(i·0°), e^(i·0°), ...] = [1, 1, ...]

  h ∘ r = h  (no rotation)
  t ∘ r = t

So: h spouse t ⟺ t spouse h
\`\`\`

### 2. **Inverse Relations** (parent / child)

\`\`\`
If r₂ is inverse of r₁: r₁ ∘ r₂ = identity

θ₂ = -θ₁ (opposite rotation)

Example:
  parent: θ = +45°
  child: θ = -45°

  Obama parent Malia: Obama rotated +45° ≈ Malia
  Malia child Obama: Malia rotated -45° ≈ Obama
\`\`\`

### 3. **Transitive Relations** (ancestorOf)

\`\`\`
Composition: r₁ ∘ r₂

Obama parent Malia: Obama · r_parent ≈ Malia
Malia parent Sasha: Malia · r_parent ≈ Sasha

Transitivity:
  Obama · r_parent · r_parent ≈ Sasha
  Obama · r_grandparent ≈ Sasha

Where r_grandparent = r_parent ∘ r_parent
\`\`\`

### 4. **1-to-N Relations** (hasChild)

\`\`\`
Obama hasChild Malia
Obama hasChild Sasha

Both valid! No contradiction:
  Obama ∘ r_child ≈ Malia
  Obama ∘ r_child ≈ Sasha

Malia and Sasha are in "similar direction" from Obama
but not identical.
\`\`\`

---

## RotatE Implementation

\`\`\`python
import torch
import torch.nn as nn

class RotatE(nn.Module):
    def __init__(self, num_entities, num_relations, embedding_dim, gamma=12.0):
        super().__init__()

        self.embedding_dim = embedding_dim
        self.gamma = gamma  # Margin

        # Entity embeddings: complex (real + imaginary)
        self.entity_real = nn.Embedding(num_entities, embedding_dim)
        self.entity_imag = nn.Embedding(num_entities, embedding_dim)

        # Relation embeddings: phase angles θ ∈ [0, 2π)
        self.relation_phase = nn.Embedding(num_relations, embedding_dim)

        # Initialize
        nn.init.uniform_(self.entity_real.weight, -1.0, 1.0)
        nn.init.uniform_(self.entity_imag.weight, -1.0, 1.0)
        nn.init.uniform_(self.relation_phase.weight, 0, 2 * 3.14159)

    def forward(self, h, r, t):
        """
        RotatE scoring: -||h ∘ r - t||

        h, t: complex entity embeddings
        r: rotation (unit complex number)
        """
        # Get entity embeddings
        h_re = self.entity_real(h)
        h_im = self.entity_imag(h)
        t_re = self.entity_real(t)
        t_im = self.entity_imag(t)

        # Convert relation phase to complex number
        # r = cos(θ) + i·sin(θ) = e^(iθ)
        phase = self.relation_phase(r)
        r_re = torch.cos(phase)
        r_im = torch.sin(phase)

        # Complex multiplication: h ∘ r
        # (h_re + i·h_im) · (r_re + i·r_im)
        hr_re = h_re * r_re - h_im * r_im
        hr_im = h_re * r_im + h_im * r_re

        # Distance: ||h ∘ r - t||
        diff_re = hr_re - t_re
        diff_im = hr_im - t_im

        # L1 or L2 norm
        distance = torch.sqrt(diff_re ** 2 + diff_im ** 2).sum(dim=1)

        # Score: negative distance
        score = self.gamma - distance
        return score

    def loss(self, pos_h, pos_r, pos_t, neg_h, neg_r, neg_t):
        """Margin ranking loss."""
        pos_score = self.forward(pos_h, pos_r, pos_t)
        neg_score = self.forward(neg_h, neg_r, neg_t)

        # Maximize (pos_score - neg_score)
        loss = torch.relu(1.0 - pos_score + neg_score)
        return loss.mean()

# Training
model = RotatE(num_entities=10000, num_relations=50, embedding_dim=100)
optimizer = torch.optim.Adam(model.parameters(), lr=0.0001)

for epoch in range(500):
    for batch in dataloader:
        pos_h, pos_r, pos_t, neg_h, neg_r, neg_t = batch

        loss = model.loss(pos_h, pos_r, pos_t, neg_h, neg_r, neg_t)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
\`\`\`

---

## RotatE Strengths

✅ **All relation patterns:** Symmetric, asymmetric, inverse, transitive, composition
✅ **State-of-art accuracy:** Best MRR and Hits@k on FB15k, WN18, etc.
✅ **Mathematically elegant:** Rotations have clear geometric meaning
✅ **Scalable:** Linear in embedding dimension

**Benchmarks (FB15k-237):**
- RotatE: MRR = 0.338, Hits@10 = 53.3%
- ComplEx: MRR = 0.247, Hits@10 = 42.8%
- TransE: MRR = 0.294, Hits@10 = 46.5%

---

## RotatE vs Everything Else

| Model | Score Function | Symmetric | Inverse | Transitive | Composition |
|-------|----------------|-----------|---------|------------|-------------|
| **TransE** | -\\|h + r - t\\| | ❌ | ❌ | ✅ | ✅ |
| **DistMult** | Σ h·r·t | ✅ | ❌ | ❌ | ❌ |
| **ComplEx** | Re(Σ h·r·t̄) | ✅ | ❌ | ❌ | ❌ |
| **RotatE** | -\\|h∘r - t\\| | ✅ | ✅ | ✅ | ✅ |

**Conclusion:** RotatE is the most complete model!

---

## Practical Tips for RotatE

**1. Self-adversarial negative sampling**
\`\`\`python
# Weight negatives by their score
neg_weights = F.softmax(neg_scores * alpha, dim=0)
weighted_loss = (neg_weights * neg_scores).sum()
\`\`\`

**2. Embedding dimension**
- Typical: 100-500
- Larger KGs → higher dimension
- More relations → higher dimension

**3. Batch size**
- Typical: 512-2048
- Larger = more stable gradients

**4. Learning rate**
- Start: 0.0001 - 0.001
- Use Adam optimizer
- Decay by 0.1 every 100 epochs

**5. Regularization**
\`\`\`python
# L3 regularization (RotatE paper)
reg_loss = (
    torch.norm(h_emb, p=3) ** 3 +
    torch.norm(t_emb, p=3) ** 3
) / batch_size

total_loss = main_loss + lambda_reg * reg_loss
\`\`\`

---

## Summary: The Embedding Landscape

**Simple & Interpretable:** TransE
- Best for: Large KGs, 1-to-1 relations
- Limitations: Can't handle complex patterns

**Fast & Versatile:** ComplEx
- Best for: Diverse relation types, asymmetric
- Limitations: No transitivity/composition

**State-of-Art:** RotatE
- Best for: Maximum accuracy, all relation patterns
- Limitations: Slightly slower than DistMult

**In practice:** Start with ComplEx or RotatE. They work well on most KGs.

---

## Applications Revisited

**With embeddings, we can:**

1. **Complete KGs:** Predict missing facts
2. **Entity resolution:** Find duplicate entities via similarity
3. **Relation extraction:** Classify relationship between entity pairs
4. **Question answering:** Multi-hop reasoning via embeddings
5. **Recommendation:** Find similar items in product KGs
6. **Drug discovery:** Predict protein-drug interactions
7. **Fraud detection:** Anomaly detection in financial KGs

**The future:** Combine embeddings with GNNs and LLMs for hybrid AI! 🚀

**Next:** Let's build these systems ourselves with code challenges!
`,
      examples: []
    }
  ],
  summary: [
    'KG embeddings map entities and relations to vectors, enabling ML on symbolic knowledge',
    'TransE: h + r ≈ t (translation-based, works for 1-to-1 relations)',
    'DistMult, ComplEx: bilinear scoring (handle symmetric/asymmetric relations)',
    'RotatE: rotation in complex space (handles all relation patterns)',
    'Evaluation: MRR, Hits@k with filtered ranking (remove true triples from candidates)'
  ],
  nextSteps: [
    'Implement TransE from scratch in PyTorch',
    'Build a knowledge graph completion system',
    'Experiment with DistMult, ComplEx, RotatE models',
    'Explore production KG embedding libraries (PyKEEN, DGL-KE)'
  ],
  checkYourUnderstanding: [
    {
      question: 'Why do we need embeddings instead of using KGs directly?',
      answer: 'ML models need vectors as input. Embeddings convert discrete graph structure (entities, relations) into continuous vector space, enabling neural networks, similarity search, and statistical reasoning.'
    },
    {
      question: 'What does the TransE equation h + r ≈ t mean?',
      answer: 'Head entity embedding + relation embedding should approximate tail entity embedding. Example: Obama + bornIn ≈ Hawaii. The model learns these vectors so the equation holds for true triples.'
    },
    {
      question: 'What is the difference between filtered and raw ranking?',
      answer: 'Raw: rank against all entities. Filtered: remove other true triples from candidates (avoids penalizing correct predictions). Filtered is standard for fair evaluation: Hits@10 of 0.40 means 40% of predictions in top-10.'
    },
    {
      question: 'Which embedding model handles 1-to-many relations best?',
      answer: 'ComplEx or RotatE. TransE and DistMult struggle with 1-to-many (e.g., "USA hasCity ?") because one head maps to many tails. ComplEx uses complex-valued embeddings; RotatE uses rotation to represent diverse patterns.'
    }
  ]
};