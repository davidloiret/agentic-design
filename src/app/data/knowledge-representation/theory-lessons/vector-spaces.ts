import { TheoryLesson } from './types';

export const vectorSpacesLesson: TheoryLesson = {
  id: 'vector-spaces-theory',
  title: 'Vectors and Vector Spaces: The Foundation of AI',
  description: 'Master vectors - the mathematical objects that power every neural network, embedding, and machine learning algorithm',
  learningObjectives: [
    'Understand what vectors are and why they\'re fundamental to AI/ML',
    'Master vector operations: addition, scalar multiplication, dot product',
    'Learn vector spaces, linear independence, and basis vectors',
    'Understand how vectors represent data, embeddings, and model parameters',
    'Apply vectors to real-world AI problems: word embeddings, image features, neural activations'
  ],
  prerequisites: ['Basic algebra', 'Set theory'],
  sections: [
    {
      id: 'what-are-vectors',
      title: '1. What is a Vector? The AI Perspective',
      content: `## Vectors: The Language of Modern AI

A **vector** is an ordered list of numbers. That's it. But this simple structure is the foundation of ALL modern AI:
- **Every** neural network input is a vector
- **Every** word embedding is a vector
- **Every** image is a vector (or tensor, which is just a multi-dimensional vector)
- **Every** model parameter (weight, bias) is stored in vectors

**Mathematical Definition:**
A vector **v** in ℝⁿ is an ordered n-tuple: v = (v₁, v₂, ..., vₙ)

**Geometric Interpretation:**
- 2D vector: (3, 4) is an arrow from origin to point (3,4)
- 3D vector: (1, 2, 3) is an arrow in 3D space
- nD vector: (v₁, ..., vₙ) is an arrow in n-dimensional space

**Key Insight:** While we can't visualize 768-dimensional space (GPT's embedding dimension), the mathematics works exactly the same as 2D/3D!

**Why Vectors for AI?**
1. **Representation:** Convert any data (text, images, audio) into numbers
2. **Operations:** Do math on data (similarity, distance, transformations)
3. **Learning:** Adjust vectors (parameters) to minimize loss
4. **Geometry:** Similar things have similar vectors (semantic space)`,
      examples: [
        {
          title: 'Vectors in Natural Language Processing',
          description: 'Word embeddings are vectors that capture meaning',
          code: `# Word vectors in 3D space (real embeddings are 300-768D)
king = [0.5, 0.8, 0.1]      # masculine, royalty, power
queen = [0.5, 0.8, 0.9]     # feminine, royalty, power
man = [0.5, 0.1, 0.1]       # masculine, common, neutral
woman = [0.5, 0.1, 0.9]     # feminine, common, neutral

# Famous analogy: king - man + woman ≈ queen
analogy = [king[i] - man[i] + woman[i] for i in range(3)]
# Result ≈ [0.5, 0.8, 0.9] ≈ queen!

# This works because vectors capture semantic relationships!
# Words with similar meanings have nearby vectors`
        },
        {
          title: 'Vectors in Computer Vision',
          description: 'Images are vectors in high-dimensional space',
          code: `# 28×28 grayscale image (MNIST digit)
image = [[0.1, 0.2, ..., 0.8],  # Row 1: 28 pixels
         [0.3, 0.5, ..., 0.1],  # Row 2: 28 pixels
         ...                     # 28 rows total
         [0.0, 0.1, ..., 0.4]]  # Row 28

# Flatten to vector: 784 dimensions (28 × 28)
image_vector = [0.1, 0.2, ..., 0.4]  # 784 numbers

# Neural network input: ALWAYS a vector!
output = neural_network(image_vector)
# output might be: [0.01, 0.02, ..., 0.95, 0.01]  # 10 classes
# Predicts digit 8 with 95% confidence`
        },
        {
          title: 'Vectors as Neural Network Parameters',
          description: 'Model weights and biases are vectors',
          code: `# Simple neural network layer
input_size = 512
output_size = 256

# Weight matrix: each row is a vector of 512 weights
# Total: 256 vectors of dimension 512
W = [[w₁₁, w₁₂, ..., w₁₅₁₂],  # Output neuron 1's weights
     [w₂₁, w₂₂, ..., w₂₅₁₂],  # Output neuron 2's weights
     ...
     [w₂₅₆₁, ..., w₂₅₆₅₁₂]]  # Output neuron 256's weights

# Bias vector: one bias per output neuron
b = [b₁, b₂, ..., b₂₅₆]

# Forward pass: input vector x → output vector y
# y = W @ x + b  (@ is matrix-vector multiplication)
# This is literally ALL a neural network layer does!`
        }
      ],
      keyPoints: [
        'A vector is an ordered list of numbers: v = (v₁, v₂, ..., vₙ)',
        'Vectors represent data, embeddings, parameters in AI',
        'Every neural network operates on vectors',
        'Vector dimension = number of features/components',
        'Similar concepts have similar vectors (geometric intuition)'
      ]
    },
    {
      id: 'vector-operations',
      title: '2. Essential Vector Operations',
      content: `## The Three Core Operations

Every machine learning algorithm uses three fundamental vector operations:

### 1. Vector Addition: Component-wise
**v + w = (v₁ + w₁, v₂ + w₂, ..., vₙ + wₙ)**

**Geometric meaning:** Place vectors tip-to-tail
**ML application:** Gradient updates, residual connections

### 2. Scalar Multiplication: Scale each component
**c·v = (c·v₁, c·v₂, ..., c·v₁)**

**Geometric meaning:** Stretch/shrink the vector
**ML application:** Learning rate, weight decay

### 3. Dot Product: Sum of products
**v·w = v₁w₁ + v₂w₂ + ... + vₙwₙ = Σᵢ vᵢwᵢ**

**Geometric meaning:** v·w = ||v|| ||w|| cos(θ) where θ is angle between vectors
**ML application:** **THIS IS THE MOST IMPORTANT OPERATION IN ALL OF AI**

**Why Dot Product is Crucial:**
- **Neural networks:** Every neuron computes weighted dot product
- **Attention:** Transformer attention is dot product of queries and keys
- **Similarity:** Cosine similarity = normalized dot product
- **Projections:** Project one vector onto another

**Special Cases:**
- Dot product = 0 → vectors are **orthogonal** (perpendicular, uncorrelated)
- Dot product > 0 → vectors point in **similar direction** (correlated)
- Dot product < 0 → vectors point in **opposite directions** (anti-correlated)`,
      examples: [
        {
          title: 'Neuron Activation = Dot Product',
          description: 'What every neuron in a neural network does',
          code: `# Input vector (features)
x = [0.5, 0.3, 0.8, 0.1]

# Neuron's weight vector (learned parameters)
w = [0.2, 0.5, 0.3, 0.7]

# Neuron's bias
b = 0.1

# Neuron computation (linear part):
activation = dot_product(w, x) + b
           = (0.2×0.5) + (0.5×0.3) + (0.3×0.8) + (0.7×0.1) + 0.1
           = 0.10 + 0.15 + 0.24 + 0.07 + 0.1
           = 0.66

# Then apply non-linearity (ReLU, sigmoid, etc.)
output = max(0, activation)  # ReLU
       = 0.66

# This dot product is computed BILLIONS of times during training!`
        },
        {
          title: 'Transformer Attention: Dot Product',
          description: 'How attention mechanisms work',
          code: `# Simplified attention mechanism (from "Attention is All You Need")

# Query vector (what we're looking for)
query = [0.5, 0.8, 0.3, 0.2]

# Key vectors (what's available to attend to)
key1 = [0.4, 0.7, 0.2, 0.1]  # Token 1
key2 = [0.1, 0.2, 0.9, 0.5]  # Token 2
key3 = [0.6, 0.9, 0.1, 0.3]  # Token 3

# Compute attention scores: dot product with each key
score1 = dot_product(query, key1) = 0.70  # High similarity!
score2 = dot_product(query, key2) = 0.48  # Medium
score3 = dot_product(query, key3) = 0.81  # Highest!

# Softmax to get attention weights
weights = softmax([0.70, 0.48, 0.81])
        = [0.30, 0.21, 0.49]  # Token 3 gets most attention

# This is how GPT decides which words to focus on!
# Dot product measures "how relevant is this key to my query?"`
        },
        {
          title: 'Cosine Similarity: Normalized Dot Product',
          description: 'Measure semantic similarity between embeddings',
          code: `import numpy as np

def cosine_similarity(v, w):
    """Measure similarity: 1 = identical, 0 = orthogonal, -1 = opposite"""
    dot = np.dot(v, w)
    norm_v = np.linalg.norm(v)
    norm_w = np.linalg.norm(w)
    return dot / (norm_v * norm_w)

# Word embeddings (simplified)
vec_king = [0.5, 0.8, 0.1]
vec_queen = [0.5, 0.8, 0.9]
vec_car = [0.9, 0.1, 0.1]

print(cosine_similarity(vec_king, vec_queen))  # ~0.85 (similar!)
print(cosine_similarity(vec_king, vec_car))    # ~0.52 (different)

# Search engines use this:
# query_vec = embed("machine learning")
# for doc in documents:
#     similarity = cosine_similarity(query_vec, embed(doc))
# return top_k documents by similarity`
        }
      ],
      keyPoints: [
        'Vector addition: v + w (component-wise)',
        'Scalar multiplication: c·v (scale each component)',
        'Dot product: v·w = Σᵢ vᵢwᵢ (THE key operation in AI)',
        'Dot product = 0 means orthogonal (uncorrelated)',
        'Neural networks are just chains of dot products',
        'Attention mechanism = dot product of queries and keys'
      ]
    },
    {
      id: 'vector-spaces',
      title: '3. Vector Spaces: The Mathematical Structure',
      content: `## What is a Vector Space?

A **vector space** V over ℝ is a set of vectors with two operations (addition and scalar multiplication) that satisfy certain axioms.

**Intuition:** A vector space is a "universe" where you can:
1. Add any two vectors and stay in the space
2. Multiply any vector by a scalar and stay in the space
3. Have a zero vector
4. Have additive inverses

**Examples of Vector Spaces:**
- ℝⁿ: All n-dimensional vectors
- P₃: All polynomials of degree ≤ 3
- Mₘₓₙ: All m×n matrices
- C[0,1]: All continuous functions on [0,1]

**Why This Matters for AI:**
Understanding vector spaces helps us reason about:
- **Feature spaces:** What's the "space" of all possible inputs?
- **Model capacity:** What functions can a model represent?
- **Dimensionality:** How many dimensions do we need?
- **Subspaces:** Can we compress data to fewer dimensions?

## Key Concepts

### Linear Combinations
**Definition:** v = c₁v₁ + c₂v₂ + ... + cₖvₖ where cᵢ are scalars

This is how neural networks work! Every layer computes linear combinations of inputs.

### Span
**span(v₁, ..., vₖ) = {all linear combinations of v₁, ..., vₖ}**

**Example:** In ℝ³:
- span([1,0,0]) = x-axis (1D line)
- span([1,0,0], [0,1,0]) = xy-plane (2D plane)
- span([1,0,0], [0,1,0], [0,0,1]) = all of ℝ³ (3D space)

**ML Connection:** The span of weight vectors determines what functions your model can represent!

### Linear Independence
Vectors v₁, ..., vₖ are **linearly independent** if no vector can be written as a combination of others.

**Test:** c₁v₁ + ... + cₖvₖ = 0 ⟺ all cᵢ = 0

**Why it matters:**
- Independent features provide unique information
- Redundant features can be removed (dimensionality reduction)
- Rank of weight matrix = number of independent rows/columns

### Basis
A **basis** is a linearly independent set that spans the entire space.

**Standard basis for ℝ³:**
- e₁ = [1, 0, 0]
- e₂ = [0, 1, 0]
- e₃ = [0, 0, 1]

Any vector [x, y, z] = x·e₁ + y·e₂ + z·e₃

**Non-standard basis:**
You can use ANY linearly independent set! This is the idea behind:
- Principal Component Analysis (PCA): Find a better basis for your data
- Fourier Transform: Represent signals in frequency basis
- Wavelet basis: Multi-resolution analysis`,
      examples: [
        {
          title: 'Principal Component Analysis (PCA)',
          description: 'Finding a better basis for your data',
          code: `# Original data: 1000 images, each 784 pixels (28×28)
# Data matrix X: 1000 × 784

# Problem: 784 dimensions is too many!
# Many dimensions are correlated (redundant)

# PCA finds a NEW basis (principal components)
# such that:
# 1. First component captures MOST variance
# 2. Second component captures SECOND most variance
# 3. And so on...

from sklearn.decomposition import PCA

pca = PCA(n_components=50)  # Reduce to 50 dimensions
X_reduced = pca.fit_transform(X)  # 1000 × 50

# Now each image is represented with only 50 numbers
# instead of 784, but we keep 95%+ of the information!

# The 50 principal components are a NEW BASIS
# that's more efficient for this dataset

# This is used in:
# - Image compression
# - Noise reduction
# - Visualization (reduce to 2D/3D)
# - Speeding up ML algorithms`
        },
        {
          title: 'Linear Independence in Feature Engineering',
          description: 'Removing redundant features',
          code: `# Original features
data = {
    'height_cm': [170, 180, 165, 175],
    'height_inches': [66.9, 70.9, 65.0, 68.9],  # Redundant!
    'weight_kg': [70, 85, 60, 75],
    'weight_lbs': [154, 187, 132, 165],  # Redundant!
    'bmi': [24.2, 26.2, 22.0, 24.5]
}

# Problem: height_inches = height_cm / 2.54
#          weight_lbs = weight_kg * 2.205
# These columns are LINEARLY DEPENDENT!

# Check: can we write one as linear combo of another?
# height_inches = 0.3937 * height_cm + 0
# Yes! They're dependent.

# Solution: Remove redundant features
clean_data = {
    'height_cm': [170, 180, 165, 175],
    'weight_kg': [70, 85, 60, 75],
    'bmi': [24.2, 26.2, 22.0, 24.5]
}

# Now features are linearly independent
# Each provides unique information
# Model trains faster and generalizes better!`
        },
        {
          title: 'Span and Model Capacity',
          description: 'What can your neural network represent?',
          code: `# Single neuron with 2 inputs
# Weights w = [w₁, w₂], bias b
# Output: y = w₁x₁ + w₂x₂ + b

# What functions can this represent?
# span({[w₁, w₂, b]}) = all linear functions in 2D
# This is just a line! y = mx + b

# Hidden layer with 3 neurons
# Each neuron: span of its weights
# Layer output: 3D vector
# After ReLU: piece-wise linear function

# With enough neurons, universal approximation theorem:
# A neural network can approximate ANY continuous function!
# The span of all possible weight combinations is HUGE

# But in practice:
# - Too few neurons → can't represent complex functions
# - Too many neurons → overfitting
# Finding the right capacity is an art`
        }
      ],
      keyPoints: [
        'Vector space: set with addition and scalar multiplication',
        'Linear combination: v = c₁v₁ + c₂v₂ + ... (what neural nets compute)',
        'Span: all vectors you can reach with linear combinations',
        'Linear independence: no redundancy, each vector is unique',
        'Basis: minimal set that spans the space',
        'PCA finds a better basis that captures variance efficiently'
      ]
    },
    {
      id: 'vector-norms-distance',
      title: '4. Norms and Distance: Measuring Vectors',
      content: `## How Do We Measure Vectors?

In machine learning, we constantly need to measure:
- How big is this vector? (magnitude/norm)
- How different are these vectors? (distance)
- How similar are these vectors? (similarity)

### Vector Norms (Magnitude)

A **norm** ||v|| measures the "size" or "length" of a vector.

**1. L² Norm (Euclidean length):**
||v||₂ = √(v₁² + v₂² + ... + vₙ²)

**Geometric meaning:** Straight-line distance from origin
**ML use:** Weight regularization (L2 penalty), gradient magnitude

**2. L¹ Norm (Manhattan/Taxicab):**
||v||₁ = |v₁| + |v₂| + ... + |vₙ|

**Geometric meaning:** Distance if you can only move along axes
**ML use:** Sparse regularization (Lasso), promotes zero weights

**3. L∞ Norm (Maximum):**
||v||∞ = max(|v₁|, |v₂|, ..., |vₙ|)

**Geometric meaning:** Largest component
**ML use:** Adversarial robustness, gradient clipping

### Distance Between Vectors

**Euclidean Distance:**
d(v, w) = ||v - w||₂ = √Σᵢ(vᵢ - wᵢ)²

**Most common distance metric. Used in:**
- K-nearest neighbors (KNN)
- K-means clustering
- Measuring embedding similarity

**Cosine Distance:**
cosine_distance(v, w) = 1 - cosine_similarity(v, w)

**Better for high-dimensional data. Used in:**
- Text embeddings (word2vec, BERT)
- Recommendation systems
- Information retrieval

**Key Insight:** In high dimensions, Euclidean distance becomes less meaningful (curse of dimensionality). Cosine similarity often works better!`,
      examples: [
        {
          title: 'L2 Regularization (Weight Decay)',
          description: 'Preventing overfitting by penalizing large weights',
          code: `# Training loss without regularization
loss = cross_entropy(predictions, targets)

# L2 regularization adds penalty for large weights
l2_penalty = lambda_param * ||weights||₂²
            = lambda_param * (w₁² + w₂² + ... + wₙ²)

# Total loss
total_loss = loss + l2_penalty

# Effect: During training, model prefers smaller weights
# Why? Large weights → high penalty → higher loss
# Result: Simpler model, less overfitting

# Example:
# weights = [100, 200, 50, 80]
# ||weights||₂² = 100² + 200² + 50² + 80² = 53,900
# If lambda = 0.01, penalty = 539 (huge!)
# Gradient descent will shrink these weights

# This is why it's called "weight decay"
# Weights naturally decay toward zero during training`
        },
        {
          title: 'L1 Regularization (Lasso) for Sparse Models',
          description: 'Forcing many weights to exactly zero',
          code: `# L1 regularization
l1_penalty = lambda_param * ||weights||₁
            = lambda_param * (|w₁| + |w₂| + ... + |wₙ|)

# Key difference from L2:
# L1 produces SPARSE solutions (many weights = 0)
# L2 produces SMALL solutions (many weights near 0)

# Example:
# Before L1 training:
weights = [0.5, 0.3, 0.1, 0.05, 0.8, 0.02]

# After L1 training with λ=0.1:
weights = [0.6, 0.4, 0.0, 0.0, 0.9, 0.0]
#                  ^    ^          ^
#               Exactly zero!

# Why sparse? L1 norm has "corners" at zero
# Gradient descent tends to land exactly on zero

# Applications:
# - Feature selection (zero weight = unused feature)
# - Model compression (fewer non-zero parameters)
# - Interpretability (simpler model)`
        },
        {
          title: 'K-Nearest Neighbors with Distance',
          description: 'Classification using vector distance',
          code: `# KNN: Classify based on nearest neighbors

def knn_classify(test_point, training_data, k=3):
    """
    test_point: vector to classify
    training_data: list of (vector, label) pairs
    k: number of neighbors to consider
    """
    distances = []

    for train_vector, label in training_data:
        # Euclidean distance
        dist = euclidean_distance(test_point, train_vector)
        distances.append((dist, label))

    # Sort by distance, take k nearest
    distances.sort()
    k_nearest = distances[:k]

    # Majority vote
    labels = [label for _, label in k_nearest]
    return most_common(labels)

# Example: Classify iris flower
test_flower = [5.1, 3.5, 1.4, 0.2]  # sepal & petal measurements

# Find 3 nearest neighbors in training data
# Neighbor 1: distance = 0.2, label = 'setosa'
# Neighbor 2: distance = 0.3, label = 'setosa'
# Neighbor 3: distance = 0.5, label = 'setosa'

# Majority vote: setosa (3/3)
# Prediction: 'setosa'

# This works because similar flowers have similar measurements
# Distance in vector space = botanical similarity!`
        },
        {
          title: 'Gradient Clipping to Prevent Exploding Gradients',
          description: 'Using L∞ norm to stabilize training',
          code: `# Problem: During training, gradients can become very large
# This causes weights to update too much → training diverges

def clip_gradients(gradients, max_norm=1.0):
    """Clip gradients to prevent exploding gradients"""
    # Compute gradient norm
    grad_norm = ||gradients||₂

    # If gradient is too large, scale it down
    if grad_norm > max_norm:
        gradients = gradients * (max_norm / grad_norm)

    return gradients

# Example: Training RNN (prone to exploding gradients)
# Original gradient: [100, 200, -150, 80]
# Norm: √(100² + 200² + 150² + 80²) = 270.2

# This is huge! Clip to max_norm = 5.0
# Scaling factor: 5.0 / 270.2 = 0.0185
# Clipped gradient: [1.85, 3.70, -2.78, 1.48]

# Now gradient is "normal" size
# Training remains stable!

# Used in:
# - RNNs/LSTMs (notorious for exploding gradients)
# - Transformers (GPT, BERT)
# - Reinforcement learning`
        }
      ],
      keyPoints: [
        'Norm ||v|| measures vector magnitude/size',
        'L2 norm: Euclidean length, used in weight decay',
        'L1 norm: Sum of absolutes, produces sparse solutions',
        'Distance d(v,w) = ||v-w|| measures similarity',
        'Cosine similarity better than Euclidean in high dimensions',
        'Gradient clipping uses norms to stabilize training'
      ]
    },
    {
      id: 'applications',
      title: '5. Vectors in Modern AI: The Big Picture',
      content: `## Why Everything is a Vector

Modern AI can be summarized in one sentence: **"Convert everything to vectors, do math on them, convert back."**

### The AI Pipeline:
1. **Input → Vector** (Embedding)
2. **Vector → Vector** (Transformation/Neural Network)
3. **Vector → Output** (Decoding/Classification)

## Key AI Applications

### 1. Word Embeddings
**Problem:** Computers don't understand words
**Solution:** Map each word to a vector

word2vec, GloVe, BERT:
- "king" → [0.1, 0.3, ..., 0.5] (300-768 dimensions)
- Similar words have similar vectors
- Enables semantic arithmetic: king - man + woman ≈ queen

### 2. Image Embeddings
**Problem:** Compare images semantically
**Solution:** CNN extracts feature vector

ResNet, ViT:
- Image → [2048-dimensional vector]
- Similar images have similar vectors
- Used in: reverse image search, face recognition

### 3. Sentence/Document Embeddings
**Problem:** Represent meaning of entire text
**Solution:** Encode to fixed-size vector

BERT, Sentence-BERT:
- Sentence → [768-dimensional vector]
- Enables: semantic search, clustering, similarity

### 4. Neural Network Activations
**Every layer in a neural network:**
- Input: vector
- Output: vector (after linear transformation + nonlinearity)
- Gradients: vectors pointing in direction of steepest improvement

### 5. Attention Mechanisms
**Core of Transformers (GPT, BERT, Claude):**
- Queries, Keys, Values are all vectors
- Attention score = dot product of Query and Key
- Output = weighted sum of Value vectors

### 6. Optimization
**Training = Following vectors (gradients):**
- Gradient: vector pointing uphill on loss surface
- Update: weights ← weights - learning_rate × gradient
- All of deep learning is vector calculus!

## The Geometric View of Machine Learning

**Training data lives in vector space:**
- Each data point is a vector
- Each class occupies a region
- Decision boundary = hyperplane separating classes

**Neural networks learn:**
- Sequence of transformations (vector → vector)
- That separate classes in the final layer
- By progressively "untangling" the geometry`,
      examples: [
        {
          title: 'Complete Example: Sentiment Analysis',
          description: 'From text to vector to prediction',
          code: `# Step 1: Text → Vectors (Embedding)
text = "This movie was absolutely fantastic!"

# Tokenize
tokens = ["this", "movie", "was", "absolutely", "fantastic"]

# Look up word vectors (each word → 300D vector)
vectors = [
    word2vec["this"],        # [0.1, 0.2, ..., 0.3]
    word2vec["movie"],       # [0.5, 0.1, ..., 0.8]
    word2vec["was"],         # [0.2, 0.3, ..., 0.1]
    word2vec["absolutely"],  # [0.8, 0.7, ..., 0.9]
    word2vec["fantastic"]    # [0.9, 0.8, ..., 0.95]
]

# Step 2: Vector → Vector (Neural Network)
# Average pooling: combine word vectors
sentence_vector = mean(vectors)  # 300D vector

# Hidden layer 1: 300D → 128D
h1 = ReLU(W1 @ sentence_vector + b1)  # 128D

# Hidden layer 2: 128D → 64D
h2 = ReLU(W2 @ h1 + b2)  # 64D

# Step 3: Vector → Output (Classification)
# Output layer: 64D → 2D (positive/negative)
logits = W3 @ h2 + b3  # [z_pos, z_neg]

# Softmax to probabilities
probs = softmax(logits)  # [0.95, 0.05]

# Prediction: POSITIVE (95% confidence)
# All because we could represent text as vectors!`
        },
        {
          title: 'Semantic Search with Vectors',
          description: 'Finding similar documents',
          code: `from sentence_transformers import SentenceTransformer

# Load pretrained model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Document database (encode to vectors)
documents = [
    "The cat sat on the mat",
    "Dogs are loyal pets",
    "Machine learning uses neural networks",
    "Deep learning is a subset of ML",
    "Python is a programming language"
]

doc_vectors = model.encode(documents)  # 5 x 384 dimensions

# User query
query = "Tell me about artificial intelligence"
query_vector = model.encode([query])[0]  # 384D vector

# Find most similar document (cosine similarity)
similarities = [
    cosine_similarity(query_vector, doc_vec)
    for doc_vec in doc_vectors
]

# Results:
# Doc 3: "Machine learning..." → similarity = 0.72 ✓
# Doc 4: "Deep learning..." → similarity = 0.68 ✓
# Doc 2: "Dogs are..." → similarity = 0.15
# Doc 1: "The cat..." → similarity = 0.08
# Doc 5: "Python is..." → similarity = 0.45

# Returns most relevant documents!
# This is how semantic search engines work
# Google, Bing, ChatGPT retrieval all use this`
        },
        {
          title: 'Transfer Learning: Vectors Capture Knowledge',
          description: 'Pretrained vectors contain general knowledge',
          code: `# Problem: You have small dataset (1000 images)
# Not enough to train from scratch

# Solution: Transfer learning with pretrained vectors

# Step 1: Use pretrained model (trained on millions of images)
from torchvision import models
resnet = models.resnet50(pretrained=True)

# Step 2: Remove last layer
resnet = resnet[:-1]  # Now outputs 2048D vector

# Step 3: Extract features from your images
your_image = load_image("dog.jpg")
feature_vector = resnet(your_image)  # 2048D vector

# This vector encodes WHAT'S IN THE IMAGE
# Even though ResNet never saw your specific images!
# The vector representation transfers across domains

# Step 4: Train small classifier on top
classifier = Linear(2048, num_classes)
output = classifier(feature_vector)

# You only train the classifier (few parameters)
# The feature extraction (ResNet) is frozen
# Works with small datasets!

# This is why everyone uses:
# - BERT for text
# - ResNet/ViT for images
# - Wav2Vec for audio
# Pretrained vectors = learned representations`
        }
      ],
      keyPoints: [
        'Modern AI: convert everything to vectors, do math, convert back',
        'Word/sentence embeddings map text to semantic vector space',
        'Neural networks are chains of vector transformations',
        'Attention = dot products of query/key/value vectors',
        'Training = following gradient vectors to minimize loss',
        'Transfer learning works because vectors capture generalizable features'
      ]
    }
  ],
  summary: [
    'Vectors are ordered lists of numbers - the fundamental data structure of AI',
    'Three key operations: addition (v+w), scalar multiplication (c·v), dot product (v·w)',
    'Dot product is THE most important operation: used in neurons, attention, similarity',
    'Vector spaces provide structure for reasoning about feature spaces and model capacity',
    'Linear independence = no redundancy, basis = minimal spanning set',
    'Norms measure vector size: L2 (Euclidean), L1 (Manhattan), L∞ (max)',
    'Word embeddings, neural networks, attention - everything operates on vectors',
    'Machine learning is geometric: data as vectors, decision boundaries as hyperplanes'
  ],
  nextSteps: [
    'Implement vector operations from scratch (addition, dot product, norm)',
    'Learn matrix operations - how vectors combine in neural network layers',
    'Study eigenvalues/eigenvectors - the key to understanding PCA and PageRank',
    'Explore actual word embeddings (word2vec, GloVe, BERT)',
    'Build a simple neural network layer using only vector operations',
    'Implement K-nearest neighbors and see geometric machine learning in action'
  ],
  checkYourUnderstanding: [
    {
      question: 'Why is the dot product so fundamental to neural networks? What does a single neuron actually compute?',
      answer: 'A neuron computes: output = activation(w·x + b) where w·x is the dot product of weights and inputs. This weighted sum captures how much each input "activates" the neuron. The dot product measures alignment: if w and x point in similar directions, the dot product is large (strong activation). This simple operation, repeated millions of times across layers, enables neural networks to learn complex patterns.'
    },
    {
      question: 'What is the geometric meaning of orthogonal vectors? Why does this matter for machine learning?',
      answer: 'Orthogonal vectors have dot product = 0, meaning they\'re perpendicular (90° angle). In ML, orthogonal features are **uncorrelated** - they provide independent information. This is ideal for feature engineering (no redundancy) and why techniques like PCA find orthogonal principal components. Orthogonal weight matrices also preserve norms, making training more stable.'
    },
    {
      question: 'Explain why cosine similarity is often better than Euclidean distance for comparing high-dimensional embeddings.',
      answer: 'In high dimensions, ALL points tend to be far apart (curse of dimensionality), making Euclidean distance less meaningful. Cosine similarity ignores magnitude and only considers direction/angle - capturing semantic similarity regardless of length. For text embeddings, "good" and "great" should be similar even if one occurs more frequently (larger magnitude). Cosine similarity: 1=identical direction, 0=orthogonal, -1=opposite.'
    },
    {
      question: 'What does it mean for vectors to be linearly independent? Give an example from machine learning.',
      answer: 'Vectors are linearly independent if none can be written as a combination of others - each provides unique information. Example: Features [height_cm, height_inches] are linearly dependent (height_inches = 0.3937 × height_cm), so one is redundant. Independent features are crucial for: (1) Avoiding multicollinearity in regression, (2) Faster training (fewer redundant computations), (3) Better generalization. PCA finds independent components that capture maximum variance.'
    },
    {
      question: 'How does word2vec capture the relationship "king - man + woman ≈ queen" using vectors?',
      answer: 'word2vec learns vectors where **semantic relationships are vector arithmetic**. The difference "king - man" captures "royalty + masculine - masculine = royalty". Adding "woman" gives "royalty + feminine" which points near "queen". This works because the training objective (predict context words) forces similar words to have similar vectors, and analogous relationships to have parallel vector differences. Geometric algebra emerges from statistical patterns!'
    },
    {
      question: 'What is the difference between L1 and L2 regularization in terms of the geometry of the solution?',
      answer: 'L2 regularization (||w||₂²) penalizes squared magnitude - creates a smooth bowl-shaped constraint. Weights become small but rarely exactly zero (all features used). L1 regularization (||w||₁) penalizes absolute values - creates a diamond-shaped constraint with "corners" at axes. Gradient descent tends to land on these corners where many weights are exactly zero (sparse solution). L1 does implicit feature selection; L2 just shrinks weights. L1 for sparsity, L2 for smoothness.'
    }
  ]
};