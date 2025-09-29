import { TheoryLesson } from './types';

export const matrixOperationsLesson: TheoryLesson = {
  id: 'matrix-operations-theory',
  title: 'Matrices and Transformations: Neural Networks Revealed',
  description: 'Master matrices - the mathematical structure that powers every layer of every neural network. Understand how matrix multiplication IS deep learning, and why linear algebra is the language of modern AI.',
  learningObjectives: [
    'Understand what matrices are and why they\'re the backbone of neural networks',
    'Master matrix operations: multiplication, transpose, and their role in forward/backward passes',
    'Learn how neural network layers are just matrix multiplications',
    'Understand transformations, eigenvalues, and matrix decompositions',
    'Apply matrices to real-world AI: CNNs, transformers, attention, backpropagation'
  ],
  prerequisites: ['vector-spaces-theory'],
  sections: [
    {
      id: 'what-are-matrices',
      title: '1. What is a Matrix? The Neural Network Perspective',
      content: `## Matrices: The Engine of Deep Learning

A **matrix** is a 2D array of numbers arranged in rows and columns. But in AI, a matrix is much more:

**Every neural network layer is a matrix.**

\`\`\`
Input vector → Matrix multiply → Output vector
      x      →      W @ x      →        h
\`\`\`

That's it. That's a neural network layer.

### Why Matrices Matter in AI

**1. Neural Network Layers ARE Matrix Multiplications**

\`\`\`python
# A fully connected layer with 784 inputs, 128 outputs
W = np.random.randn(128, 784)  # Weight matrix
b = np.zeros(128)               # Bias vector

# Forward pass: just matrix-vector multiplication!
def layer(x):
    return W @ x + b  # @ is matrix multiplication

# This single line is what happens in EVERY neural network layer
\`\`\`

**2. Batch Processing: Matrix-Matrix Multiplication**

\`\`\`python
# Process 32 images at once (batching for GPU efficiency)
X = np.random.randn(32, 784)   # 32 images, 784 pixels each
W = np.random.randn(128, 784)  # Same weight matrix

# Forward pass for entire batch
H = X @ W.T  # Result: (32, 128)
# H[i] = W @ X[i] for each image

# This is why GPUs are so fast: matrix multiplication is parallelizable!
\`\`\`

**3. Convolutional Layers: Matrices in Disguise**

Even convolutions can be expressed as matrix operations (though we don't usually do it this way in practice):

\`\`\`python
# A 3x3 convolution is really a sparse matrix multiplication
# The Toeplitz matrix structure allows efficient convolution

# This is why CNNs scale: matrix ops are highly optimized
\`\`\`

### Matrix Notation

**Shape:** An **m × n matrix** has **m rows** and **n columns**

\`\`\`
A = [a₁₁  a₁₂  a₁₃]    ← row 1 (n=3 columns)
    [a₂₁  a₂₂  a₂₃]    ← row 2
    [a₃₁  a₃₂  a₃₃]    ← row 3
     ↑
   column 1 (m=3 rows)

A is a 3×3 matrix
\`\`\`

**Neural Network Dimensions:**
- Weight matrix **W**: shape **(output_dim, input_dim)**
- Input **x**: shape **(input_dim,)** or **(batch_size, input_dim)**
- Output **h**: shape **(output_dim,)** or **(batch_size, output_dim)**

### Types of Matrices in AI

| Matrix Type | Shape | Example Use |
|------------|-------|-------------|
| **Weight matrix** | (out, in) | Neural network layer parameters |
| **Embedding matrix** | (vocab, embed_dim) | Word embeddings (word2vec, BERT) |
| **Attention matrix** | (seq_len, seq_len) | Transformer self-attention scores |
| **Gradient matrix** | Same as weights | Backpropagation gradients |
| **Covariance matrix** | (features, features) | PCA, Gaussian distributions |
| **Confusion matrix** | (classes, classes) | Classification evaluation |

### The Fundamental Insight

**Deep learning is a sequence of matrix multiplications with nonlinearities:**

\`\`\`python
# A 3-layer neural network
h1 = relu(W1 @ x + b1)    # Layer 1: matrix multiply + activation
h2 = relu(W2 @ h1 + b2)   # Layer 2: matrix multiply + activation
y = softmax(W3 @ h2 + b3) # Layer 3: matrix multiply + softmax

# That's it. That's deep learning.
# Everything else (ResNets, transformers, etc.) is variations on this theme.
\`\`\``,
      examples: [
        {
          title: 'Real Example: MNIST Classifier',
          description: 'A simple 2-layer neural network using only matrices',
          code: `# Input: 28×28 grayscale images (784 pixels)
# Hidden layer: 128 neurons
# Output: 10 classes (digits 0-9)

import numpy as np

# Initialize weight matrices
W1 = np.random.randn(128, 784) * 0.01  # Layer 1
b1 = np.zeros(128)
W2 = np.random.randn(10, 128) * 0.01   # Layer 2
b2 = np.zeros(10)

def relu(x):
    return np.maximum(0, x)

def softmax(x):
    exp_x = np.exp(x - np.max(x))  # Numerical stability
    return exp_x / exp_x.sum()

# Forward pass (single image)
x = image.flatten()        # (784,)
h = relu(W1 @ x + b1)      # (128,) - hidden layer
y = softmax(W2 @ h + b2)   # (10,)  - output probabilities

print(f"Prediction: {np.argmax(y)}")  # Predicted digit

# Forward pass (batch of 32 images)
X = images.reshape(32, -1) # (32, 784)
H = relu(X @ W1.T + b1)    # (32, 128)
Y = softmax(X @ W2.T + b2) # (32, 10)

# This is EXACTLY what PyTorch/TensorFlow do under the hood!`
        },
        {
          title: 'Embedding Matrix: Word to Vector',
          description: 'How word embeddings work using matrix lookup',
          code: `# Vocabulary: 50,000 words
# Embedding dimension: 300 (word2vec standard)
E = np.random.randn(50000, 300)  # Embedding matrix

# Convert word to vector (just matrix row lookup!)
word_id = 4283  # ID for "king"
king_vector = E[word_id]  # (300,)

# This is all word2vec/GloVe/BERT embeddings are:
# a learned matrix where each row is a word vector!

# In practice (PyTorch):
# embedding = nn.Embedding(50000, 300)
# king_vector = embedding(torch.tensor([4283]))`
        }
      ],
      keyPoints: [
        'Matrices are 2D arrays: m rows × n columns',
        'Every neural network layer is a matrix multiplication: h = W @ x + b',
        'Weight matrices have shape (output_dim, input_dim)',
        'Batch processing uses matrix-matrix multiplication for GPU efficiency',
        'Deep learning = stacked matrix multiplications + nonlinearities'
      ]
    },
    {
      id: 'matrix-operations',
      title: '2. Matrix Operations: Building Blocks of Deep Learning',
      content: `## Essential Matrix Operations

### 1. Matrix Addition (Element-wise)

**Only works for matrices of the SAME shape.**

\`\`\`
A + B = [a₁₁ + b₁₁  a₁₂ + b₁₂]
        [a₂₁ + b₂₁  a₂₂ + b₂₂]
\`\`\`

**Use in AI:** Adding bias vectors (broadcasting), residual connections

\`\`\`python
# Bias addition (broadcasting)
W @ x + b  # b is broadcast to match shape

# ResNet skip connection
output = layer(x) + x  # Add input to output (residual)
\`\`\`

### 2. Scalar Multiplication

Multiply every element by a scalar:

\`\`\`
c · A = [c·a₁₁  c·a₁₂]
        [c·a₂₁  c·a₂₂]
\`\`\`

**Use in AI:** Learning rate scaling, weight decay

\`\`\`python
# Gradient descent update
W = W - learning_rate * gradient  # Scalar multiplication

# Weight decay (L2 regularization)
W = W * (1 - decay_rate)  # Shrink weights
\`\`\`

### 3. Matrix Transpose: The Backpropagation Operator

**Definition:** Swap rows and columns

\`\`\`
A = [1  2  3]        A^T = [1  4]
    [4  5  6]              [2  5]
                           [3  6]

Shape: (m, n) → (n, m)
\`\`\`

**Why Transpose is CRUCIAL in Neural Networks:**

\`\`\`python
# Forward pass
h = W @ x  # W is (out, in), x is (in,), h is (out,)

# Backward pass (gradient flows backward)
dx = W.T @ dh  # W.T is (in, out), dh is (out,), dx is (in,)

# This is why backpropagation works!
# Transpose reverses the transformation
\`\`\`

**Properties:**
- (Aᵀ)ᵀ = A
- (A + B)ᵀ = Aᵀ + Bᵀ
- **(AB)ᵀ = BᵀAᵀ** ← Critical for backprop chain rule!

### 4. Element-wise (Hadamard) Product

**Notation:** A ⊙ B (element-wise multiplication)

\`\`\`
A ⊙ B = [a₁₁·b₁₁  a₁₂·b₁₂]
        [a₂₁·b₂₁  a₂₂·b₂₂]
\`\`\`

**Use in AI:** Attention masking, dropout, gating mechanisms

\`\`\`python
# Dropout: randomly zero out activations
mask = (np.random.rand(*h.shape) > dropout_rate)
h = h * mask  # Element-wise multiplication

# LSTM forget gate
forget_gate = sigmoid(W_f @ x)
cell_state = cell_state * forget_gate  # Element-wise

# Attention masking (prevent looking at future tokens)
attention_scores = attention_scores * mask
\`\`\`

### The Power of Transpose in Backpropagation

**Forward pass:** Each layer transforms **x → W @ x**

**Backward pass:** Gradient flows backward **dL/dx = Wᵀ @ (dL/d(Wx))**

This is the **chain rule in matrix form**:

\`\`\`python
# Forward
z = W @ x
h = relu(z)
loss = compute_loss(h)

# Backward (automatic differentiation does this)
dL_dh = grad_loss(h)
dL_dz = dL_dh * relu_gradient(z)  # Element-wise
dL_dW = dL_dz @ x.T               # Gradient for W
dL_dx = W.T @ dL_dz               # Gradient for x (flows backward)

# Notice: W.T reverses the forward transformation!
\`\`\`

**This is what PyTorch/TensorFlow autograd does automatically.**`,
      examples: [
        {
          title: 'Complete Backpropagation Example',
          description: 'Manual backprop through a 2-layer network',
          code: `# Forward pass
x = np.random.randn(784)
W1 = np.random.randn(128, 784)
W2 = np.random.randn(10, 128)

z1 = W1 @ x
h1 = np.maximum(0, z1)  # ReLU
z2 = W2 @ h1
probs = softmax(z2)

loss = -np.log(probs[true_label])  # Cross-entropy

# Backward pass
dz2 = probs.copy()
dz2[true_label] -= 1  # Softmax + cross-entropy gradient

dW2 = np.outer(dz2, h1)  # Gradient for W2: (10,) outer (128,) = (10, 128)
dh1 = W2.T @ dz2         # Transpose! Gradient flows backward

dz1 = dh1 * (z1 > 0)     # ReLU gradient (element-wise)
dW1 = np.outer(dz1, x)   # Gradient for W1: (128,) outer (784,) = (128, 784)

# Update weights (gradient descent)
W2 -= learning_rate * dW2
W1 -= learning_rate * dW1

# This is neural network training in ~15 lines of code!`
        },
        {
          title: 'Batch Matrix Operations',
          description: 'Efficient batch processing with matrices',
          code: `# Batch of 32 images
X = np.random.randn(32, 784)  # (batch, features)
W = np.random.randn(128, 784) # (out, in)

# Forward pass
Z = X @ W.T  # (32, 784) @ (784, 128) = (32, 128)
H = np.maximum(0, Z)  # ReLU on entire batch

# Backward pass
dZ = dH * (Z > 0)  # Element-wise (ReLU gradient)
dW = dZ.T @ X      # (128, 32) @ (32, 784) = (128, 784)
dX = dZ @ W        # (32, 128) @ (128, 784) = (32, 784)

# Average gradient over batch
dW = dW / batch_size

# This is why batch processing is efficient:
# One matrix op instead of 32 vector ops!`
        }
      ],
      keyPoints: [
        'Transpose (Aᵀ) swaps rows and columns: essential for backpropagation',
        'Matrix multiplication gradient uses transpose: dL/dx = Wᵀ @ dL/d(Wx)',
        'Element-wise operations (⊙) for dropout, attention masks, gating',
        'Batch processing replaces many vector ops with one matrix op',
        'Chain rule in matrix form: transpose reverses transformations'
      ]
    },
    {
      id: 'matrix-multiplication',
      title: '3. Matrix Multiplication: The Heart of Neural Networks',
      content: `## Matrix Multiplication: Why It's THE Operation

### Definition

**Matrix multiplication:** C = AB

**Rule:** Columns of A must match rows of B

\`\`\`
(m × n) @ (n × p) = (m × p)
   A    @    B    =    C

C[i,j] = Σ A[i,k] · B[k,j]  (sum over k)
       k=1..n
\`\`\`

**Intuition:** Each element of C is a **dot product** of a row from A and a column from B.

\`\`\`
[a  b] @ [e  f] = [ae+bg  af+bh]
[c  d]   [g  h]   [ce+dg  cf+dh]
\`\`\`

### Why Matrix Multiplication Powers Neural Networks

**1. It's a Linear Transformation**

Matrix multiplication **transforms** vectors:

\`\`\`python
v_out = W @ v_in

# W "rotates" and "scales" the input vector
# Think of W as a transformation operator
\`\`\`

**Geometric View:**
- W can rotate vectors
- W can stretch/shrink vectors
- W can project to higher/lower dimensions

**2. Composition of Transformations**

Multiple matrix multiplications = **composition of transformations**

\`\`\`python
# 3-layer network
h1 = W1 @ x
h2 = W2 @ h1
h3 = W3 @ h2

# Equivalent to single transformation (if no nonlinearities)
h3 = (W3 @ W2 @ W1) @ x = W_combined @ x

# This is why we need activation functions!
# Without them, deep networks collapse to single linear layer.
\`\`\`

**3. Efficient Parallelization**

Matrix multiplication is **highly parallelizable** → perfect for GPUs

\`\`\`python
# Each element C[i,j] can be computed independently
# GPUs have thousands of cores → compute all elements in parallel

# This is why GPUs are 100x faster than CPUs for deep learning
\`\`\`

### Matrix Multiplication in Different AI Architectures

**Fully Connected (Dense) Layers:**
\`\`\`python
h = W @ x + b
# W: (out, in), x: (in,), h: (out,)
\`\`\`

**Convolutional Layers (implicit matrix multiplication):**
\`\`\`python
# Convolution can be expressed as matrix multiplication
# (though in practice we use optimized conv algorithms)

# Conceptually:
output = Conv_matrix @ input_flattened
\`\`\`

**Transformer Attention (3 matrix multiplications!):**
\`\`\`python
# Multi-head attention
Q = X @ W_Q  # Query: (seq_len, d_k)
K = X @ W_K  # Key:   (seq_len, d_k)
V = X @ W_V  # Value: (seq_len, d_v)

# Attention scores
scores = Q @ K.T / sqrt(d_k)  # (seq_len, seq_len)
weights = softmax(scores)

# Attention output
output = weights @ V  # (seq_len, d_v)

# Total: 4 matrix multiplications per attention head!
# GPT-3 has 96 layers × 96 heads = 9,216 attention operations!
\`\`\`

**Embedding Lookup (matrix indexing):**
\`\`\`python
# Embedding matrix E: (vocab_size, embed_dim)
# Token IDs: [2, 5, 8, ...]

# One-hot encoding × matrix = row lookup
one_hot = [0, 0, 1, 0, ...]  # 1 at position 2
embedding = one_hot @ E      # Picks row 2 of E

# In practice: just index E[2] (more efficient)
\`\`\`

### Associativity and Order

**Associative:** (AB)C = A(BC)

**NOT Commutative:** AB ≠ BA (in general)

**Important for optimization:**
\`\`\`python
# Matrix-vector vs vector-matrix
A @ (B @ x)  # Better: B@x is vector, then A@vector
(A @ B) @ x  # Worse: A@B is matrix, then matrix@vector

# Choose order to minimize operations!
# This is why Einstein summation (einsum) exists
\`\`\`

### Computational Complexity

**Matrix-vector multiplication:** O(mn) for (m × n) matrix

**Matrix-matrix multiplication:** O(mnp) for (m × n) @ (n × p)

**Why this matters:**
\`\`\`python
# Forward pass: O(mnp) for each layer
# Backward pass: O(mnp) for gradients
# Training: forward + backward for each batch
# Total: ~O(2mnp) per batch per layer

# GPT-3 has 175B parameters → ~350B ops per forward pass!
# Trained on ~300B tokens → ~10^23 floating point operations!
\`\`\``,
      examples: [
        {
          title: 'Transformer Attention: Matrix Multiplication in Action',
          description: 'Complete implementation of self-attention',
          code: `import numpy as np

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Scaled Dot-Product Attention (Vaswani et al., 2017)
    This is the CORE operation in transformers (GPT, BERT, etc.)
    """
    d_k = Q.shape[-1]  # Key dimension

    # 1. Compute attention scores: Q @ K^T
    scores = Q @ K.T / np.sqrt(d_k)  # (seq_len, seq_len)
    # Each position attends to every other position

    # 2. Apply mask (for causal attention in GPT)
    if mask is not None:
        scores = scores + mask  # mask is -inf for future positions

    # 3. Softmax to get attention weights
    weights = softmax(scores, axis=-1)  # (seq_len, seq_len)

    # 4. Weighted sum of values: weights @ V
    output = weights @ V  # (seq_len, d_v)

    return output, weights

# Example: 4 tokens, 64-dimensional embeddings
seq_len, d_model = 4, 64
X = np.random.randn(seq_len, d_model)

# Linear projections (learnable weight matrices)
W_Q = np.random.randn(d_model, 64)
W_K = np.random.randn(d_model, 64)
W_V = np.random.randn(d_model, 64)

Q = X @ W_Q  # (4, 64)
K = X @ W_K  # (4, 64)
V = X @ W_V  # (4, 64)

# Causal mask (GPT-style: can't look at future tokens)
mask = np.triu(np.ones((seq_len, seq_len)) * -1e9, k=1)

output, weights = scaled_dot_product_attention(Q, K, V, mask)

print("Attention weights:")
print(weights)
# weights[i,j] = how much position i attends to position j

# This is what happens in EVERY transformer layer!
# GPT-3 has 96 layers, so this runs 96 times per forward pass.`
        },
        {
          title: 'Neural Network as Matrix Chain',
          description: 'Deep network = chain of matrix multiplications',
          code: `# 4-layer neural network (784 → 256 → 128 → 64 → 10)
W1 = np.random.randn(256, 784) * np.sqrt(2/784)
W2 = np.random.randn(128, 256) * np.sqrt(2/256)
W3 = np.random.randn(64, 128) * np.sqrt(2/128)
W4 = np.random.randn(10, 64) * np.sqrt(2/64)

def forward(x):
    h1 = relu(W1 @ x)     # 784 → 256
    h2 = relu(W2 @ h1)    # 256 → 128
    h3 = relu(W3 @ h2)    # 128 → 64
    y = softmax(W4 @ h3)  # 64 → 10
    return y

# Each @ is a matrix-vector multiplication
# Total operations: 784×256 + 256×128 + 128×64 + 64×10
#                 = 200,704 + 32,768 + 8,192 + 640
#                 = 242,304 operations per forward pass

# For batch of 32:
# 242,304 × 32 = 7.75 million operations
# Modern GPUs: ~10 TFLOPS = 10 trillion ops/sec
# So this takes ~0.7 microseconds on a GPU!`
        },
        {
          title: 'Efficient Matrix Multiplication Order',
          description: 'Order matters for performance!',
          code: `# Compute (A @ B) @ c where c is a vector
A = np.random.randn(1000, 1000)  # Large matrix
B = np.random.randn(1000, 1000)  # Large matrix
c = np.random.randn(1000)        # Vector

# Method 1: (A @ B) @ c
# Cost: 1000³ + 1000² = 1,001,000,000 ops
result1 = (A @ B) @ c

# Method 2: A @ (B @ c)
# Cost: 1000² + 1000² = 2,000 ops
result2 = A @ (B @ c)

# Same result, 500,000x faster!
# This is why order matters in matrix chains

# Modern frameworks (PyTorch, TensorFlow) optimize this automatically`
        }
      ],
      keyPoints: [
        'Matrix multiplication transforms vectors: geometrically rotates and scales',
        'Neural networks = chains of matrix multiplications + nonlinearities',
        'Transformer attention uses 4 matrix multiplications per head',
        'Matrix multiplication is highly parallelizable → perfect for GPUs',
        'Order matters: A@(B@c) much faster than (A@B)@c when c is a vector',
        'Complexity: O(mnp) for (m×n) @ (n×p) matrices'
      ]
    },
    {
      id: 'matrix-transformations',
      title: '4. Matrix Transformations: The Geometric View',
      content: `## Matrices as Linear Transformations

**Key Insight:** Every matrix represents a **linear transformation** (linear map)

\`\`\`
T: ℝⁿ → ℝᵐ
v ↦ W @ v

W is an m×n matrix
\`\`\`

### Properties of Linear Transformations

**Linearity:**
1. **Additivity:** T(u + v) = T(u) + T(v)
2. **Homogeneity:** T(c·v) = c·T(v)

**Consequence:** Lines remain lines, origin stays at origin

**What neural networks learn:** The right linear transformations (matrices) to extract features

### Common Transformations in 2D/3D

**Rotation (2D):**
\`\`\`
R(θ) = [cos θ  -sin θ]
       [sin θ   cos θ]

Rotates by angle θ counterclockwise
Preserves length: ||R @ v|| = ||v||
\`\`\`

**Scaling:**
\`\`\`
S = [s_x  0 ]
    [0   s_y]

Stretches by s_x along x-axis, s_y along y-axis
\`\`\`

**Projection:**
\`\`\`
P = [1  0]
    [0  0]

Projects onto x-axis (loses y-coordinate)
This is dimensionality reduction!
\`\`\`

**Shear:**
\`\`\`
H = [1  k]
    [0  1]

Slants vectors: x stays, y becomes y + kx
\`\`\`

### Transformations in High-Dimensional AI

**In neural networks, matrices transform high-dimensional vectors:**

**Dimension Increase (784 → 256):**
\`\`\`python
W = np.random.randn(256, 784)
h = W @ x  # x: (784,) → h: (256,)

# Projects 784D input into 256D feature space
# The network learns the BEST 256 features to extract
\`\`\`

**Dimension Decrease (256 → 10):**
\`\`\`python
W = np.random.randn(10, 256)
y = W @ h  # h: (256,) → y: (10,)

# Compresses 256 features into 10 class scores
# This is the classification head
\`\`\`

**Dimensionality Reduction (PCA):**
\`\`\`python
# Find k principal components (directions of max variance)
# Project data onto these directions

X_centered = X - X.mean(axis=0)
cov = X_centered.T @ X_centered  # Covariance matrix
eigenvalues, eigenvectors = np.linalg.eig(cov)

# Top k eigenvectors form projection matrix
W_pca = eigenvectors[:, :k].T  # (k, d)

# Reduced data
X_reduced = X_centered @ W_pca.T  # (n, d) @ (d, k) = (n, k)

# This is dimensionality reduction via matrix transformation!
\`\`\`

### The Geometry of Machine Learning

**Linear Classifiers:** Find a hyperplane (decision boundary)

\`\`\`python
# Binary classifier
prediction = sign(w @ x + b)

# w is perpendicular to decision boundary
# w @ x + b = 0 defines the hyperplane
\`\`\`

**Deep Networks:** Stack of transformations

\`\`\`python
h1 = relu(W1 @ x)   # Transform + nonlinearity
h2 = relu(W2 @ h1)  # Transform + nonlinearity
y = W3 @ h2         # Final transform

# Each layer applies a transformation to the feature space
# ReLU "bends" the space (introduces nonlinearity)
# Result: complex decision boundaries
\`\`\`

**Why Nonlinearities Matter:**

Without nonlinearities, stacked linear transformations collapse:

\`\`\`python
# Without ReLU
h1 = W1 @ x
h2 = W2 @ h1
y = W3 @ h2

# Equivalent to
y = (W3 @ W2 @ W1) @ x = W_combined @ x

# Just a single linear transformation!
# This is why activation functions are essential.
\`\`\`

### Special Transformations

**Identity Matrix:**
\`\`\`
I = [1  0  0]
    [0  1  0]
    [0  0  1]

I @ v = v  (no change)
\`\`\`

**Zero Matrix:**
\`\`\`
O @ v = 0  (maps everything to zero)
\`\`\`

**Inverse Matrix A⁻¹:**

If A @ v = w, then A⁻¹ @ w = v

\`\`\`
A @ A⁻¹ = I
\`\`\`

**Use in AI:** Solving linear systems, inverting transformations

**Not all matrices have inverses!** (singular matrices)`,
      examples: [
        {
          title: 'Visualizing Neural Network Transformations',
          description: 'How layers transform feature space',
          code: `import numpy as np
import matplotlib.pyplot as plt

# Generate 2D spiral data (non-linearly separable)
theta = np.linspace(0, 4*np.pi, 200)
r = theta
X = np.stack([r * np.cos(theta), r * np.sin(theta)], axis=1)
y = (theta > 2*np.pi).astype(int)  # Two classes

# Layer 1: 2D → 8D transformation
W1 = np.random.randn(8, 2) * 0.5
b1 = np.zeros(8)
H1 = np.maximum(0, X @ W1.T + b1)  # ReLU

# What happened?
# 1. W1 projects 2D spiral into 8D space
# 2. In 8D, the spiral might be linearly separable!
# 3. ReLU "straightens out" the space

# Layer 2: 8D → 2D (for visualization)
W2 = np.random.randn(2, 8) * 0.5
b2 = np.zeros(2)
H2 = np.maximum(0, H1 @ W2.T + b2)

# Plot original vs transformed space
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

ax1.scatter(X[:, 0], X[:, 1], c=y, cmap='viridis')
ax1.set_title('Original Space (Non-separable)')

ax2.scatter(H2[:, 0], H2[:, 1], c=y, cmap='viridis')
ax2.set_title('Transformed Space (After 2 Layers)')

# The network learned transformations that make data separable!`
        },
        {
          title: 'PCA: Dimensionality Reduction',
          description: 'Find best low-dimensional representation',
          code: `# Real example: Reduce MNIST (784D) to 50D

from sklearn.datasets import load_digits
from sklearn.decomposition import PCA

# Load data
digits = load_digits()
X = digits.data  # (1797, 64) - 8×8 images

# PCA: find top 10 principal components
pca = PCA(n_components=10)
X_reduced = pca.fit_transform(X)  # (1797, 10)

print(f"Original: {X.shape}")       # (1797, 64)
print(f"Reduced: {X_reduced.shape}") # (1797, 10)
print(f"Variance explained: {pca.explained_variance_ratio_.sum():.1%}")
# Typically 80-90% of variance with just 10 components!

# What PCA does:
# 1. Computes covariance matrix: X^T @ X
# 2. Finds eigenvectors (principal components)
# 3. Projects data: X_reduced = X @ eigenvectors[:10]

# This is a LINEAR transformation (matrix multiplication)
# that preserves maximum variance!

# Reconstruction (approximately)
X_reconstructed = pca.inverse_transform(X_reduced)  # (1797, 64)

# Use cases:
# - Dimensionality reduction before training
# - Visualization (reduce to 2D/3D)
# - Compression (store 10 numbers instead of 64)
# - Noise removal (minor components = noise)`
        },
        {
          title: 'Matrix Transformation in CNNs',
          description: 'Convolutional layers as transformations',
          code: `# Conceptual view: convolution as matrix multiplication
# (In practice, we use optimized conv algorithms)

# Input: 28×28 image = 784D vector
# 3×3 convolution with stride 1, no padding → 26×26 output = 676D

# Can be represented as sparse 676×784 matrix
# Each row has only 9 non-zero entries (3×3 filter)

import numpy as np
from scipy.linalg import toeplitz

def conv_as_matrix(kernel, input_size, output_size):
    """
    Convert convolution to matrix multiplication (Toeplitz matrix)
    """
    # This creates a sparse matrix where each row represents
    # one convolution operation
    pass  # (Simplified for illustration)

# Why we don't actually do this:
# - Sparse matrix multiplication is slower than optimized conv
# - But conceptually, convolution IS a linear transformation!

# Modern efficient implementations:
# 1. im2col: rearrange input into matrix form
# 2. Matrix multiplication with rearranged filter
# 3. Reshape output

# This is how GEMM (General Matrix Multiply) is used for convolutions
# cuDNN, MKL-DNN all use variants of this approach`
        }
      ],
      keyPoints: [
        'Matrices represent linear transformations: rotate, scale, project',
        'Neural networks learn the right transformations to extract features',
        'Nonlinearities (ReLU) are essential: without them, deep networks collapse to single layer',
        'PCA is a linear transformation that preserves maximum variance',
        'CNNs can be expressed as sparse matrix multiplications',
        'Machine learning is geometric: finding transformations that separate classes'
      ]
    },
    {
      id: 'special-matrices',
      title: '5. Special Matrices and Their Properties',
      content: `## Important Matrix Types in AI

### 1. Diagonal Matrices

**Definition:** Non-zero elements only on the main diagonal

\`\`\`
D = [d₁  0   0 ]
    [0   d₂  0 ]
    [0   0   d₃]
\`\`\`

**Properties:**
- Easy to invert: just invert diagonal elements
- Multiplication is fast: O(n) instead of O(n²)
- Represents **scaling** along each axis

**Use in AI:**
\`\`\`python
# Learning rate per parameter (adaptive optimizers)
# Adam optimizer uses diagonal approximation to Hessian

# Batch normalization
# Scale and shift with diagonal matrix + bias

# Eigenvalue decomposition: A = Q @ D @ Q^T
# where D is diagonal (eigenvalues)
\`\`\`

### 2. Symmetric Matrices

**Definition:** A = Aᵀ (equals its transpose)

\`\`\`
S = [a  b  c]
    [b  d  e]
    [c  e  f]
\`\`\`

**Properties:**
- Real eigenvalues
- Orthogonal eigenvectors
- Common in optimization and statistics

**Use in AI:**
\`\`\`python
# Covariance matrices (always symmetric)
cov = X.T @ X

# Hessian matrix (second derivatives, symmetric)
H[i,j] = ∂²L/∂w_i∂w_j

# Attention matrices (sometimes symmetric)
# Though typically not in practice
\`\`\`

### 3. Orthogonal Matrices

**Definition:** Qᵀ @ Q = I (columns are orthonormal)

**Properties:**
- Preserves lengths: ||Q @ v|| = ||v||
- Preserves angles: (Q@u)·(Q@v) = u·v
- Q⁻¹ = Qᵀ (easy inverse!)

**Use in AI:**
\`\`\`python
# QR decomposition: A = Q @ R
# Used in solving linear systems

# Rotation matrices are orthogonal
# Data augmentation: rotate images

# Spectral normalization (stabilize GAN training)
# Constrain weight matrices to have bounded singular values
\`\`\`

### 4. Positive Definite Matrices

**Definition:** vᵀ @ A @ v > 0 for all non-zero v

**Properties:**
- All eigenvalues > 0
- Has square root: A = Bᵀ @ B
- Defines an inner product

**Use in AI:**
\`\`\`python
# Covariance matrices are positive semi-definite
# Ensures valid probability distributions

# Loss landscape curvature
# Positive definite Hessian → local minimum

# Kernel methods (SVMs)
# Kernel matrix must be positive definite
\`\`\`

### 5. Eigenvalues and Eigenvectors

**Definition:** A @ v = λ @ v

- **v:** eigenvector (direction that doesn't change under A)
- **λ:** eigenvalue (how much v is scaled)

**Why Eigenvectors Matter:**

Eigenvectors are the **principal directions** of a transformation

\`\`\`python
# PCA: eigenvectors of covariance matrix
# Directions of maximum variance

# PageRank: principal eigenvector of link matrix
# Stationary distribution of random walk

# Spectral clustering: eigenvectors of Laplacian
# Community detection in graphs

# Power iteration (used in neural networks)
# Find largest eigenvalue/eigenvector
\`\`\`

**Computing Eigenvalues:**

\`\`\`python
import numpy as np

A = np.array([[4, 2],
              [1, 3]])

eigenvalues, eigenvectors = np.linalg.eig(A)

print("Eigenvalues:", eigenvalues)   # [5, 2]
print("Eigenvectors:\\n", eigenvectors)

# Verify: A @ v = λ @ v
v1 = eigenvectors[:, 0]
lambda1 = eigenvalues[0]
print("A @ v:", A @ v1)
print("λ @ v:", lambda1 * v1)
# They match!
\`\`\`

### 6. Singular Value Decomposition (SVD)

**The Most Important Matrix Decomposition**

\`\`\`
A = U @ Σ @ Vᵀ
\`\`\`

- **U:** Left singular vectors (orthogonal)
- **Σ:** Singular values (diagonal, non-negative)
- **V:** Right singular vectors (orthogonal)

**Properties:**
- Works for ANY matrix (even non-square!)
- Generalizes eigendecomposition
- Reveals matrix structure

**Use in AI:**

**Recommender Systems (Netflix Prize):**
\`\`\`python
# User-movie rating matrix: (users, movies)
R = np.array([...])  # Mostly zeros (sparse)

# SVD factorization
U, sigma, Vt = np.linalg.svd(R, full_matrices=False)

# Low-rank approximation (compress)
k = 50  # latent factors
U_k = U[:, :k]
sigma_k = np.diag(sigma[:k])
Vt_k = Vt[:k, :]

# Approximate ratings
R_approx = U_k @ sigma_k @ Vt_k

# Predict missing ratings!
# This is collaborative filtering
\`\`\`

**Image Compression:**
\`\`\`python
# Image as matrix: (height, width)
img = plt.imread('photo.jpg')

# SVD
U, sigma, Vt = np.linalg.svd(img, full_matrices=False)

# Keep only top k singular values
k = 50
img_compressed = U[:, :k] @ np.diag(sigma[:k]) @ Vt[:k, :]

# Original: height × width values
# Compressed: k × (height + width) values
# For large images, huge compression!
\`\`\`

**Principal Component Analysis:**
\`\`\`python
# PCA via SVD (numerically more stable than eigendecomposition)
X_centered = X - X.mean(axis=0)
U, sigma, Vt = np.linalg.svd(X_centered, full_matrices=False)

# Principal components: columns of V
pcs = Vt.T

# Projected data
X_pca = X_centered @ pcs[:, :k]
\`\`\`

**Low-Rank Approximation of Weight Matrices:**
\`\`\`python
# Compress neural network weights
# W: (1000, 1000) - 1M parameters

U, sigma, Vt = np.linalg.svd(W, full_matrices=False)

# Low-rank approximation
k = 100
W_approx = U[:, :k] @ np.diag(sigma[:k]) @ Vt[:k, :]

# Parameters: 1000×100 + 100 + 100×1000 = 200,100
# 5x compression!

# Use in inference:
h = W @ x
# Becomes:
h = U_k @ (sigma_k * (Vt_k @ x))

# Fewer operations, faster inference!
\`\`\``,
      examples: [
        {
          title: 'PageRank: Eigenvectors in Action',
          description: 'Google\'s original ranking algorithm',
          code: `import numpy as np

# Web graph: 4 pages
# Adjacency matrix: A[i,j] = 1 if page i links to page j
A = np.array([
    [0, 1, 1, 0],  # Page 0 links to 1, 2
    [1, 0, 0, 0],  # Page 1 links to 0
    [1, 1, 0, 1],  # Page 2 links to 0, 1, 3
    [0, 0, 1, 0],  # Page 3 links to 2
])

# Normalize: each column sums to 1 (probability distribution)
P = A / A.sum(axis=0, keepdims=True)

# PageRank: find principal eigenvector (eigenvalue = 1)
eigenvalues, eigenvectors = np.linalg.eig(P)

# Find eigenvector corresponding to eigenvalue 1
idx = np.argmax(eigenvalues)
pagerank = np.abs(eigenvectors[:, idx])
pagerank = pagerank / pagerank.sum()  # Normalize

print("PageRank scores:", pagerank)
# Pages with more incoming links have higher scores

# Alternative: Power iteration (what Google actually uses)
rank = np.ones(4) / 4  # Start uniform
for _ in range(100):
    rank = P @ rank
    rank = rank / rank.sum()

print("PageRank (power iteration):", rank)

# This is how Google ranks web pages!
# (With damping factor and handling dangling nodes)`
        },
        {
          title: 'SVD for Recommender System',
          description: 'Netflix Prize-style collaborative filtering',
          code: `import numpy as np

# User-movie rating matrix (simplified)
# Rows: users, Columns: movies
# 0 = not rated
R = np.array([
    [5, 3, 0, 1],  # User 0
    [4, 0, 0, 1],  # User 1
    [1, 1, 0, 5],  # User 2
    [1, 0, 0, 4],  # User 3
    [0, 1, 5, 4],  # User 4
])

# Mask of known ratings
mask = (R > 0)

# Simple SVD (assumes zeros are real zeros, not missing)
# In practice, use specialized algorithms for sparse matrices
U, sigma, Vt = np.linalg.svd(R, full_matrices=False)

# Low-rank approximation (k=2 latent factors)
k = 2
R_pred = U[:, :k] @ np.diag(sigma[:k]) @ Vt[:k, :]

print("Predicted ratings:")
print(R_pred)

# Recommend: highest predicted rating for unwatched movies
user = 0
unwatched = ~mask[user]
recommendations = np.argsort(R_pred[user])[::-1]
recommendations = [m for m in recommendations if unwatched[m]]

print(f"Recommendations for user {user}: {recommendations}")

# Real systems (Netflix, Spotify):
# - Use specialized SVD for sparse matrices (ALS, SGD)
# - Add bias terms (user/item biases)
# - Incorporate side information (genres, demographics)
# - Use deep learning (neural collaborative filtering)`
        },
        {
          title: 'Model Compression via Low-Rank Factorization',
          description: 'Compress neural network weights',
          code: `import numpy as np

# Large weight matrix: 1024 → 1024 layer
d = 1024
W = np.random.randn(d, d)  # 1,048,576 parameters

# SVD decomposition
U, sigma, Vt = np.linalg.svd(W, full_matrices=False)

# Low-rank approximation: keep top k singular values
k = 128  # Compression factor: 1024/128 = 8x

U_k = U[:, :k]           # (1024, 128)
sigma_k = sigma[:k]      # (128,)
Vt_k = Vt[:k, :]         # (128, 1024)

# Compressed representation
# Parameters: 1024×128 + 128 + 128×1024 = 262,400
# Compression: 1,048,576 / 262,400 = 4x reduction!

# Forward pass (original)
x = np.random.randn(d)
y_original = W @ x

# Forward pass (compressed)
# W @ x ≈ U_k @ (sigma_k * (Vt_k @ x))
y_compressed = U_k @ (sigma_k * (Vt_k @ x))

# Error
error = np.linalg.norm(y_original - y_compressed) / np.linalg.norm(y_original)
print(f"Relative error: {error:.2%}")
# Typically < 1% error with 4-8x compression!

# Applications:
# - Deploy models on mobile devices (limited memory)
# - Faster inference (fewer operations)
# - Neural architecture search (test many compressed variants)

# Modern variants:
# - Tucker decomposition (for tensors/convolutions)
# - Quantization + low-rank (INT8 + factorization)
# - Knowledge distillation (train small model to mimic large one)`
        }
      ],
      keyPoints: [
        'Diagonal matrices: fast operations, used in adaptive optimizers',
        'Symmetric matrices: covariance, Hessian (second derivatives)',
        'Orthogonal matrices: preserve lengths and angles, easy inverse',
        'Eigenvalues/eigenvectors: principal directions (PCA, PageRank)',
        'SVD: most important decomposition, works for ANY matrix',
        'Low-rank approximation: compress matrices while preserving structure'
      ]
    },
    {
      id: 'matrices-in-modern-ai',
      title: '6. Matrices in Modern AI: The Complete Picture',
      content: `## The Matrix-Centric View of AI

**Everything in modern AI is matrices:**

1. **Input data** → Matrix (batch × features)
2. **Model parameters** → Matrices (weight matrices)
3. **Forward pass** → Matrix multiplications
4. **Backward pass** → Matrix transpositions + multiplications
5. **Optimization** → Matrix updates (gradient descent)

### Architecture Patterns

**Fully Connected Networks:**
\`\`\`python
# Every layer is a matrix multiplication
h = relu(W @ x + b)

# Parameters scale as input_dim × output_dim
# This is why FCs don't scale to large inputs (images, video)
\`\`\`

**Convolutional Neural Networks:**
\`\`\`python
# Convolution = sparse matrix multiplication
# Each filter is a small weight matrix (3×3, 5×5)
# Share weights across spatial locations

# Why CNNs work:
# - Local connectivity (sparse matrix)
# - Weight sharing (fewer parameters)
# - Translation invariance (same filter everywhere)
\`\`\`

**Recurrent Neural Networks:**
\`\`\`python
# Hidden state evolves via matrix multiplication
h_t = tanh(W_hh @ h_{t-1} + W_xh @ x_t + b)

# Same matrices W_hh, W_xh used at every time step
# This is weight sharing over TIME
\`\`\`

**Transformers (BERT, GPT, etc.):**
\`\`\`python
# Self-attention: 3 matrix multiplications per head
Q = X @ W_Q  # (seq_len, d_k)
K = X @ W_K  # (seq_len, d_k)
V = X @ W_V  # (seq_len, d_v)

# Attention scores: matrix multiplication
scores = Q @ K.T / sqrt(d_k)  # (seq_len, seq_len)

# Attention output: matrix multiplication
output = softmax(scores) @ V  # (seq_len, d_v)

# Multi-head: run this H times in parallel (typically H=8, 12, 96)
# Then concatenate and project: O @ W_O

# Feed-forward: 2 matrix multiplications
ff1 = relu(x @ W1.T + b1)  # Expand: d_model → 4*d_model
ff2 = ff1 @ W2.T + b2      # Contract: 4*d_model → d_model

# Total per layer: 8 matrix multiplications (4 for attention, 2 for FF, 2 for projections)
# GPT-3 has 96 layers → 768 matrix multiplications per forward pass!
\`\`\`

### Training Dynamics: Matrices in Motion

**Gradient Descent:**
\`\`\`python
# Compute gradient (backward pass)
grad_W = compute_gradients(loss, W)  # Matrix of gradients

# Update weights
W = W - learning_rate * grad_W  # Matrix subtraction + scalar multiply

# This is the CORE of neural network training
\`\`\`

**Momentum:**
\`\`\`python
# Accumulate velocity (moving average of gradients)
v = beta * v + (1 - beta) * grad_W  # Matrix operations
W = W - learning_rate * v

# Helps escape local minima, speeds up convergence
\`\`\`

**Adam (Adaptive Moment Estimation):**
\`\`\`python
# First moment (mean)
m = beta1 * m + (1 - beta1) * grad_W

# Second moment (variance)
v = beta2 * v + (1 - beta2) * grad_W**2  # Element-wise square

# Bias correction
m_hat = m / (1 - beta1**t)
v_hat = v / (1 - beta2**t)

# Update with adaptive learning rate
W = W - learning_rate * m_hat / (sqrt(v_hat) + epsilon)

# Each parameter gets its own effective learning rate!
# This is why Adam is the default optimizer
\`\`\`

### Batch Normalization: Matrices for Stability

\`\`\`python
# Normalize activations to have mean 0, variance 1
# Applied to each feature across the batch

# Input: X of shape (batch_size, features)
mean = X.mean(axis=0)  # (features,)
var = X.var(axis=0)    # (features,)

X_norm = (X - mean) / sqrt(var + epsilon)  # Normalize

# Learnable scale and shift
X_bn = gamma * X_norm + beta  # Element-wise, gamma and beta are learned

# Why it helps:
# - Reduces internal covariate shift
# - Allows higher learning rates
# - Acts as regularization
# - Enables training very deep networks (ResNet, etc.)
\`\`\`

### Residual Connections: Matrix Addition

\`\`\`python
# ResNet: skip connection
output = F(x) + x  # Matrix addition

# Allows gradients to flow directly through (avoids vanishing gradients)
# Enables training networks with 100+ layers

# Transformer: also uses residual connections
output = attention(x) + x
output = feedforward(output) + output
\`\`\`

### The Big Picture: Matrix Operations Per Forward Pass

**Example: GPT-3 (175B parameters)**

- **Layers:** 96
- **Hidden dim:** 12,288
- **Heads:** 96
- **Vocab:** 50,257

**Per token, per layer:**
- Self-attention: 4 × (12288 × 12288) ≈ 600M ops
- Feed-forward: 2 × (12288 × 49152) ≈ 1.2B ops
- **Total per layer:** ~1.8B operations

**Full forward pass (1 token):**
- 96 layers × 1.8B = ~173B operations
- **For 2048 tokens:** ~350 trillion operations!

**Training (1 iteration):**
- Forward: 350T ops
- Backward: ~2× forward = 700T ops
- **Total:** ~1 quadrillion operations per batch!

**Why GPUs/TPUs are essential:**
- Matrix multiplication is highly parallelizable
- GPUs have specialized tensor cores (mixed-precision GEMM)
- TPUs optimize specifically for matrix ops
- A100 GPU: ~312 TFLOPS (FP16) = 312 trillion ops/sec
- Full GPT-3 forward pass: ~1 second on A100

### Practical Implications

**Memory:**
- Weight matrices dominate memory usage
- GPT-3: 175B parameters × 4 bytes (FP32) = 700GB
- Mixed precision (FP16): 350GB
- Gradient checkpointing: trade compute for memory

**Optimization:**
- Matrix multiplication is THE bottleneck
- Use BLAS libraries (cuBLAS, MKL)
- Mixed precision training (FP16 computation, FP32 accumulation)
- Fused operations (combine multiple ops into one kernel)

**Scaling Laws:**
- Model performance scales with parameters (matrix sizes)
- GPT-3 (175B) better than GPT-2 (1.5B) better than GPT (117M)
- "Bitter lesson": compute and data beat clever algorithms`,
      examples: [
        {
          title: 'Complete Transformer Block',
          description: 'Full implementation with matrix operations',
          code: `import numpy as np

def layer_norm(x, gamma, beta, eps=1e-5):
    """Layer normalization: normalize across features"""
    mean = x.mean(axis=-1, keepdims=True)
    var = x.var(axis=-1, keepdims=True)
    return gamma * (x - mean) / np.sqrt(var + eps) + beta

def multi_head_attention(X, W_Q, W_K, W_V, W_O, num_heads):
    """
    Multi-head self-attention
    X: (batch, seq_len, d_model)
    """
    batch, seq_len, d_model = X.shape
    d_k = d_model // num_heads

    # Linear projections (batched matrix multiply)
    Q = X @ W_Q  # (batch, seq_len, d_model)
    K = X @ W_K
    V = X @ W_V

    # Split into heads
    Q = Q.reshape(batch, seq_len, num_heads, d_k).transpose(0, 2, 1, 3)  # (batch, heads, seq_len, d_k)
    K = K.reshape(batch, seq_len, num_heads, d_k).transpose(0, 2, 1, 3)
    V = V.reshape(batch, seq_len, num_heads, d_k).transpose(0, 2, 1, 3)

    # Scaled dot-product attention
    scores = Q @ K.transpose(0, 1, 3, 2) / np.sqrt(d_k)  # (batch, heads, seq_len, seq_len)
    weights = softmax(scores, axis=-1)
    output = weights @ V  # (batch, heads, seq_len, d_k)

    # Concatenate heads
    output = output.transpose(0, 2, 1, 3).reshape(batch, seq_len, d_model)

    # Final linear projection
    output = output @ W_O  # (batch, seq_len, d_model)

    return output

def feedforward(x, W1, b1, W2, b2):
    """Feed-forward network: expand then contract"""
    h = np.maximum(0, x @ W1 + b1)  # ReLU, typically 4*d_model
    return h @ W2 + b2

def transformer_block(x, W_Q, W_K, W_V, W_O, W1, b1, W2, b2, gamma1, beta1, gamma2, beta2):
    """
    Complete transformer block (like in GPT, BERT)
    """
    # Multi-head self-attention + residual + layer norm
    attn = multi_head_attention(x, W_Q, W_K, W_V, W_O, num_heads=8)
    x = layer_norm(x + attn, gamma1, beta1)  # Residual connection

    # Feed-forward + residual + layer norm
    ff = feedforward(x, W1, b1, W2, b2)
    x = layer_norm(x + ff, gamma2, beta2)  # Residual connection

    return x

# Example dimensions (GPT-2 small)
batch_size = 4
seq_len = 128
d_model = 768
num_heads = 12

# Input
X = np.random.randn(batch_size, seq_len, d_model)

# Parameters (randomly initialized for demo)
W_Q = np.random.randn(d_model, d_model)
W_K = np.random.randn(d_model, d_model)
W_V = np.random.randn(d_model, d_model)
W_O = np.random.randn(d_model, d_model)
W1 = np.random.randn(d_model, 4*d_model)
b1 = np.zeros(4*d_model)
W2 = np.random.randn(4*d_model, d_model)
b2 = np.zeros(d_model)
gamma1 = np.ones(d_model)
beta1 = np.zeros(d_model)
gamma2 = np.ones(d_model)
beta2 = np.zeros(d_model)

# Forward pass through one transformer block
output = transformer_block(X, W_Q, W_K, W_V, W_O, W1, b1, W2, b2, gamma1, beta1, gamma2, beta2)

print(f"Input shape: {X.shape}")
print(f"Output shape: {output.shape}")
# Same shape: transformers preserve dimensionality

# GPT-3 has 96 of these blocks stacked!`
        },
        {
          title: 'Training Loop: Matrices in Action',
          description: 'Complete training loop with matrix operations',
          code: `import numpy as np

# Mini neural network (784 → 128 → 10)
np.random.seed(42)
W1 = np.random.randn(128, 784) * np.sqrt(2/784)
b1 = np.zeros(128)
W2 = np.random.randn(10, 128) * np.sqrt(2/128)
b2 = np.zeros(10)

def forward(X):
    """Forward pass: returns h1 (hidden), output (logits)"""
    z1 = X @ W1.T + b1  # (batch, 128)
    h1 = np.maximum(0, z1)  # ReLU
    logits = h1 @ W2.T + b2  # (batch, 10)
    return z1, h1, logits

def softmax(x):
    exp_x = np.exp(x - np.max(x, axis=-1, keepdims=True))
    return exp_x / exp_x.sum(axis=-1, keepdims=True)

def cross_entropy_loss(logits, labels):
    """Cross-entropy loss"""
    probs = softmax(logits)
    batch_size = logits.shape[0]
    loss = -np.log(probs[np.arange(batch_size), labels]).mean()
    return loss, probs

# Training loop
learning_rate = 0.01
num_epochs = 10
batch_size = 32

for epoch in range(num_epochs):
    # Mini-batch (simulated)
    X_batch = np.random.randn(batch_size, 784)  # Fake data
    y_batch = np.random.randint(0, 10, batch_size)  # Fake labels

    # Forward pass
    z1, h1, logits = forward(X_batch)
    loss, probs = cross_entropy_loss(logits, y_batch)

    # Backward pass (manual gradient computation)
    # Gradient of softmax + cross-entropy
    dlogits = probs.copy()
    dlogits[np.arange(batch_size), y_batch] -= 1
    dlogits /= batch_size

    # Gradients for W2, b2
    dW2 = dlogits.T @ h1  # (10, batch) @ (batch, 128) = (10, 128)
    db2 = dlogits.sum(axis=0)  # (10,)

    # Gradient flows backward through W2
    dh1 = dlogits @ W2  # (batch, 10) @ (10, 128) = (batch, 128)

    # Gradient through ReLU
    dz1 = dh1 * (z1 > 0)  # Element-wise

    # Gradients for W1, b1
    dW1 = dz1.T @ X_batch  # (128, batch) @ (batch, 784) = (128, 784)
    db1 = dz1.sum(axis=0)  # (128,)

    # Update weights (gradient descent)
    W2 -= learning_rate * dW2
    b2 -= learning_rate * db2
    W1 -= learning_rate * dW1
    b1 -= learning_rate * db1

    # Evaluate
    predictions = np.argmax(logits, axis=1)
    accuracy = (predictions == y_batch).mean()

    if epoch % 2 == 0:
        print(f"Epoch {epoch}: Loss={loss:.4f}, Acc={accuracy:.2%}")

# This is neural network training!
# PyTorch/TensorFlow do exactly this (with optimizations)
# But the core is just matrix operations + gradients`
        }
      ],
      keyPoints: [
        'Every modern AI model is built from matrix multiplications',
        'Transformers: ~8 matrix multiplications per layer',
        'GPT-3: ~1 quadrillion operations per training batch',
        'Matrix multiplication is highly parallelizable → GPUs/TPUs essential',
        'Training = forward pass (matmul) + backward pass (transpose + matmul)',
        'Residual connections (matrix addition) enable very deep networks',
        'Optimization algorithms (Adam) use element-wise matrix operations'
      ]
    }
  ],
  summary: [
    'Matrices are 2D arrays that represent linear transformations',
    'Neural network layers ARE matrix multiplications: h = W @ x + b',
    'Transpose is essential for backpropagation: gradients flow backward via Wᵀ',
    'Matrix multiplication powers everything: attention, convolutions, feed-forward',
    'Special matrices: diagonal (fast), orthogonal (preserve length), symmetric (covariance)',
    'SVD: most important decomposition, used for compression, recommender systems, PCA',
    'Modern AI = sequences of matrix operations at massive scale (trillions of ops)',
    'Deep learning is geometric: transformations that separate classes in feature space'
  ],
  nextSteps: [
    'Practice implementing neural network layers from scratch using matrix operations',
    'Explore how different architectures (CNNs, RNNs, Transformers) use matrices differently',
    'Implement attention mechanism to see matrix multiplication in transformers',
    'Experiment with SVD for dimensionality reduction and recommender systems',
    'Study optimization algorithms (SGD, Adam) as matrix update rules',
    'Investigate matrix factorization for model compression',
    'Read papers on efficient matrix multiplication (Strassen, Winograd algorithms)',
    'Move on to code challenges: implement vector/matrix operations and neural network layers'
  ],
  checkYourUnderstanding: [
    {
      question: 'Why is matrix multiplication THE key operation in neural networks?',
      answer: 'Because every neural network layer is a matrix multiplication (h = W @ x + b). Forward pass, backward pass, attention, convolutions - all are matrix multiplications. It\'s also highly parallelizable, making it perfect for GPUs.'
    },
    {
      question: 'What role does the transpose operation play in backpropagation?',
      answer: 'Transpose reverses the transformation: if forward pass is y = W @ x, then the gradient flows backward as dx = Wᵀ @ dy. This is the chain rule in matrix form, enabling automatic differentiation.'
    },
    {
      question: 'How many matrix multiplications happen in a transformer layer?',
      answer: '~8 total: 3 for attention projections (Q, K, V), 1 for attention output, 1 for attention combination (scores @ V), 2 for feed-forward (expand + contract), plus 1 output projection. This happens for EVERY layer!'
    },
    {
      question: 'Why do we need nonlinearities (ReLU) between matrix multiplications?',
      answer: 'Without nonlinearities, stacked matrix multiplications collapse to a single linear transformation: W3 @ W2 @ W1 @ x = (W3 @ W2 @ W1) @ x = W_combined @ x. Nonlinearities allow networks to learn complex, non-linear decision boundaries.'
    },
    {
      question: 'What is SVD and why is it important in AI?',
      answer: 'SVD (Singular Value Decomposition) factorizes any matrix A = U @ Σ @ Vᵀ. Used for: recommender systems (collaborative filtering), image compression, PCA, model compression (low-rank approximation), and revealing latent structure in data.'
    },
    {
      question: 'How does PCA use matrices to reduce dimensionality?',
      answer: 'PCA finds eigenvectors of the covariance matrix (Xᵀ @ X), which are directions of maximum variance. Projecting data onto top k eigenvectors (matrix multiplication) gives k-dimensional representation that preserves most information.'
    },
    {
      question: 'Why are GPUs so much faster than CPUs for deep learning?',
      answer: 'GPUs have thousands of cores optimized for parallel matrix multiplication. Each element of a matrix product can be computed independently, so GPUs can compute all elements simultaneously. Matrix multiplication is the bottleneck in neural networks, so GPUs provide 100-1000x speedup.'
    }
  ]
};