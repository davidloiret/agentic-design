import { TheoryLesson } from './types';

export const probabilityDistributionsLesson: TheoryLesson = {
  id: 'probability-distributions-theory',
  title: 'Probability Distributions: The Mathematics of Uncertainty in AI',
  description: 'Master probability distributions - the foundation of all machine learning models. Understand how neural networks, language models, and probabilistic reasoning systems represent and reason with uncertainty.',
  learningObjectives: [
    'Understand probability distributions and why they\'re fundamental to AI/ML',
    'Master key distributions: Bernoulli, Gaussian, Categorical, and their ML applications',
    'Learn maximum likelihood estimation (MLE) - how models learn from data',
    'Understand how neural networks output probability distributions',
    'Apply probabilistic thinking to classification, regression, and generation'
  ],
  prerequisites: ['vector-spaces-theory', 'matrix-operations-theory'],
  sections: [
    {
      id: 'what-are-distributions',
      title: '1. Probability Distributions: Representing Uncertainty',
      content: `## Why Probability Matters in AI

**Key Insight:** Every AI model is a probability distribution over possible outputs.

When you ask GPT-4 a question, it doesn't deterministically pick the next word. Instead:
1. It computes a **probability distribution** over all possible next tokens
2. It **samples** from this distribution (with temperature)
3. The result: probabilistic text generation

**Examples of Probability in AI:**
- **Classification:** P(class | input) - "What's the probability this email is spam?"
- **Regression:** P(y | x) - Neural network outputs distribution, not point estimate
- **Generation:** P(next_token | context) - Language models are conditional distributions
- **Reinforcement Learning:** P(action | state) - Policy is a probability distribution
- **Bayesian Networks:** P(variables) - Represent joint distributions compactly

### What is a Probability Distribution?

A **probability distribution** assigns probabilities to possible outcomes.

**Discrete distributions:** (countable outcomes)
\`\`\`
P(X = x) for each possible value x
Sum of all probabilities = 1
\`\`\`

**Example: Coin flip**
\`\`\`
P(Heads) = 0.5
P(Tails) = 0.5
Total = 1.0
\`\`\`

**Continuous distributions:** (uncountable outcomes)
\`\`\`
P(a ≤ X ≤ b) = ∫[a to b] f(x) dx

f(x) is the probability density function (PDF)
Total area under curve = 1
\`\`\`

**Example: Height distribution**
\`\`\`python
# Heights follow a Gaussian (normal) distribution
mean_height = 170 cm
std_dev = 10 cm

# Probability someone is between 165-175 cm
P(165 ≤ height ≤ 175) = integral of Gaussian PDF
\`\`\`

### Random Variables

A **random variable** is a variable whose value is determined by chance.

**Notation:**
- X: random variable (uppercase)
- x: specific value (lowercase)
- P(X = x): probability that X equals x

**Example in ML:**
\`\`\`python
# X = predicted class (random variable)
# Classifier outputs P(X = "cat" | image)

logits = model(image)  # Raw scores
probs = softmax(logits)  # Convert to probabilities

# probs = [0.7, 0.2, 0.1] for classes ["cat", "dog", "bird"]
# This is a probability distribution over classes!
\`\`\`

### Expectation and Variance

**Expectation (mean):** E[X] = average value

Discrete: E[X] = Σ x · P(X = x)
Continuous: E[X] = ∫ x · f(x) dx

**Variance:** Var(X) = E[(X - μ)²] = spread around mean

**Standard deviation:** σ = √Var(X)

**Why This Matters in ML:**
- Neural network training minimizes **expected loss**: E[L(y, ŷ)]
- Model uncertainty measured by **variance** of predictions
- Ensemble methods reduce variance by averaging`,
      examples: [
        {
          title: 'Neural Network as Probability Distribution',
          description: 'How classifiers output distributions',
          code: `import numpy as np

def softmax(logits):
    """Convert raw scores to probability distribution"""
    exp_logits = np.exp(logits - np.max(logits))  # Numerical stability
    return exp_logits / exp_logits.sum()

# Example: Image classifier
logits = np.array([2.0, 1.0, 0.1])  # Raw network outputs
probs = softmax(logits)

print("Logits:", logits)
print("Probabilities:", probs)
# Output: [0.659, 0.242, 0.099]

# Properties of probability distribution:
print("Sum of probs:", probs.sum())  # Must equal 1.0
print("All non-negative:", (probs >= 0).all())  # Must be >= 0

# Most confident prediction
predicted_class = np.argmax(probs)
confidence = probs[predicted_class]

print(f"Prediction: class {predicted_class} with {confidence:.1%} confidence")

# This is what happens in EVERY classifier!
# PyTorch: torch.nn.functional.softmax(logits, dim=-1)
# TensorFlow: tf.nn.softmax(logits)`
        },
        {
          title: 'Sampling from Distributions',
          description: 'How generative models work',
          code: `import numpy as np

# Language model: probability distribution over vocabulary
vocab = ["the", "cat", "dog", "sat", "ran"]
probs = np.array([0.4, 0.3, 0.15, 0.1, 0.05])

# Sampling: randomly choose according to probabilities
# This is how GPT generates text!

def sample(probs, temperature=1.0):
    """
    Sample from distribution with temperature control

    temperature < 1: sharper (more confident)
    temperature = 1: unchanged
    temperature > 1: flatter (more random)
    """
    # Apply temperature
    logits = np.log(probs)
    logits = logits / temperature
    adjusted_probs = np.exp(logits) / np.exp(logits).sum()

    # Sample
    return np.random.choice(len(probs), p=adjusted_probs)

# Generate 10 tokens
print("Temperature = 0.5 (confident):")
for _ in range(10):
    idx = sample(probs, temperature=0.5)
    print(vocab[idx], end=" ")
print()

print("\\nTemperature = 1.0 (normal):")
for _ in range(10):
    idx = sample(probs, temperature=1.0)
    print(vocab[idx], end=" ")
print()

print("\\nTemperature = 2.0 (creative/random):")
for _ in range(10):
    idx = sample(probs, temperature=2.0)
    print(vocab[idx], end=" ")

# This is GPT's sampling strategy!
# Lower temperature → more deterministic
# Higher temperature → more diverse/creative`
        }
      ],
      keyPoints: [
        'Every AI model outputs probability distributions over possible outcomes',
        'Probability distribution: assigns probabilities to outcomes, sums to 1',
        'Random variable: variable whose value is determined by chance',
        'Expectation: average value, used in loss functions (expected loss)',
        'Neural networks + softmax = probability distribution over classes',
        'Sampling from distributions enables generation (GPT, Stable Diffusion)'
      ]
    },
    {
      id: 'bernoulli-categorical',
      title: '2. Bernoulli and Categorical: Discrete Outcomes',
      content: `## Bernoulli Distribution: Binary Outcomes

**Models:** Binary classification, yes/no questions

**Parameters:** p = probability of success (1)

P(X = 1) = p
P(X = 0) = 1 - p

**Use Cases in ML:**
- Binary classification (spam/not spam)
- Sigmoid activation output
- Coin flips, A/B testing
- Logistic regression

**Example:**
\`\`\`python
# Email spam classifier
p = 0.85  # Probability email is spam

# Bernoulli(p)
P(spam) = 0.85
P(not_spam) = 0.15
\`\`\`

### Binary Cross-Entropy Loss

The **loss function for binary classification** is derived from Bernoulli distribution!

\`\`\`
Loss = -[y log(p) + (1-y) log(1-p)]

where:
  y = true label (0 or 1)
  p = predicted probability
\`\`\`

**Why this loss?** It's the negative log-likelihood of the Bernoulli distribution!

When the model predicts p = 0.9 for a true spam email (y=1):
- Loss = -log(0.9) ≈ 0.105 (low loss, good!)

When the model predicts p = 0.1 for a true spam email (y=1):
- Loss = -log(0.1) ≈ 2.303 (high loss, bad!)

**This is maximum likelihood estimation (MLE)!**

## Categorical Distribution: Multi-Class Outcomes

**Models:** Multi-class classification

**Parameters:** p₁, p₂, ..., pₖ where Σpᵢ = 1

P(X = i) = pᵢ for i = 1, 2, ..., k

**Use Cases in ML:**
- Image classification (1000 ImageNet classes)
- Next token prediction (50,000 vocabulary tokens)
- Softmax output
- Multinomial logistic regression

**Example:**
\`\`\`python
# Image classifier: 3 classes
classes = ["cat", "dog", "bird"]
probs = [0.7, 0.2, 0.1]  # Categorical distribution

# This is the output of softmax(logits)!
\`\`\`

### Cross-Entropy Loss

The **loss function for multi-class classification**:

\`\`\`
Loss = -Σ yᵢ log(pᵢ)

where:
  yᵢ = 1 if i is true class, 0 otherwise (one-hot)
  pᵢ = predicted probability for class i
\`\`\`

**Simplifies to:** Loss = -log(p_true_class)

**Why this loss?** Negative log-likelihood of Categorical distribution!

**Example:**
\`\`\`python
# True class: cat (index 0)
# Predicted: [0.7, 0.2, 0.1]

Loss = -log(0.7) ≈ 0.357

# If predicted: [0.1, 0.8, 0.1]
Loss = -log(0.1) ≈ 2.303  # Much worse!
\`\`\`

### Connection to Information Theory

Cross-entropy measures **surprise** or **information content**:

- High probability event (p=0.9): low surprise, -log(0.9) ≈ 0.15 bits
- Low probability event (p=0.1): high surprise, -log(0.1) ≈ 3.32 bits

**Training objective:** Minimize average surprise (cross-entropy) on training data

This is why it's called **cross-entropy loss**!`,
      examples: [
        {
          title: 'Binary Classification with Bernoulli',
          description: 'Logistic regression from probabilistic perspective',
          code: `import numpy as np

def sigmoid(z):
    """Sigmoid function: maps R → (0, 1)"""
    return 1 / (1 + np.exp(-z))

def binary_cross_entropy(y_true, y_pred):
    """
    Binary cross-entropy loss (Bernoulli negative log-likelihood)

    This is THE loss function for binary classification
    """
    epsilon = 1e-15  # Avoid log(0)
    y_pred = np.clip(y_pred, epsilon, 1 - epsilon)
    return -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))

# Spam classifier example
# Features: [word_count, has_urgent, num_links]
X = np.array([
    [100, 1, 5],   # Spam
    [50, 0, 1],    # Not spam
    [200, 1, 10],  # Spam
    [30, 0, 0],    # Not spam
])
y_true = np.array([1, 0, 1, 0])  # True labels

# Simple linear model: p = sigmoid(w @ x)
w = np.array([0.01, 2.0, 0.5])  # Learned weights

# Forward pass: compute predicted probabilities
z = X @ w  # Linear combination
y_pred = sigmoid(z)  # Convert to probabilities (Bernoulli parameter p)

print("Predicted probabilities:", y_pred)
# [0.98, 0.24, 0.999, 0.12]

# Compute loss
loss = binary_cross_entropy(y_true, y_pred)
print(f"Loss: {loss:.4f}")

# Make predictions (threshold at 0.5)
predictions = (y_pred > 0.5).astype(int)
accuracy = (predictions == y_true).mean()
print(f"Accuracy: {accuracy:.1%}")

# This is logistic regression!
# PyTorch: nn.BCEWithLogitsLoss()
# TensorFlow: tf.nn.sigmoid_cross_entropy_with_logits()`
        },
        {
          title: 'Multi-Class Classification with Categorical',
          description: 'Image classification from probabilistic perspective',
          code: `import numpy as np

def softmax(logits):
    """Convert logits to probability distribution (Categorical parameters)"""
    exp_logits = np.exp(logits - np.max(logits, axis=-1, keepdims=True))
    return exp_logits / exp_logits.sum(axis=-1, keepdims=True)

def cross_entropy(y_true, y_pred):
    """
    Cross-entropy loss (Categorical negative log-likelihood)

    This is THE loss function for multi-class classification
    """
    epsilon = 1e-15
    y_pred = np.clip(y_pred, epsilon, 1 - epsilon)

    # If y_true is one-hot encoded
    if y_true.ndim > 1:
        return -np.mean(np.sum(y_true * np.log(y_pred), axis=-1))
    # If y_true is class indices
    else:
        batch_size = y_true.shape[0]
        return -np.mean(np.log(y_pred[np.arange(batch_size), y_true]))

# Image classification: 3 classes (cat, dog, bird)
num_classes = 3
batch_size = 4

# Simulated network outputs (logits)
logits = np.array([
    [2.0, 1.0, 0.1],   # Confident: cat
    [0.5, 0.6, 0.4],   # Uncertain
    [0.1, 0.2, 3.0],   # Confident: bird
    [1.5, 1.6, 0.8],   # Slightly dog
])

# Convert to probabilities (Categorical distribution)
probs = softmax(logits)
print("Predicted probabilities:")
print(probs)
# [[0.659, 0.242, 0.099],
#  [0.331, 0.361, 0.308],
#  [0.087, 0.096, 0.817],
#  [0.369, 0.402, 0.229]]

# True labels (class indices)
y_true = np.array([0, 1, 2, 1])  # cat, dog, bird, dog

# Compute loss
loss = cross_entropy(y_true, probs)
print(f"\\nCross-entropy loss: {loss:.4f}")

# Predictions
predictions = np.argmax(probs, axis=-1)
accuracy = (predictions == y_true).mean()
print(f"Accuracy: {accuracy:.1%}")

# Per-sample loss (useful for debugging)
for i in range(batch_size):
    sample_loss = -np.log(probs[i, y_true[i]])
    print(f"Sample {i}: predicted {probs[i]}, true class {y_true[i]}, loss {sample_loss:.4f}")

# This is multi-class classification!
# PyTorch: nn.CrossEntropyLoss() (combines softmax + cross-entropy)
# TensorFlow: tf.nn.softmax_cross_entropy_with_logits()`
        }
      ],
      keyPoints: [
        'Bernoulli: binary outcomes (binary classification, logistic regression)',
        'Categorical: multi-class outcomes (softmax classification)',
        'Binary cross-entropy loss = negative log-likelihood of Bernoulli',
        'Cross-entropy loss = negative log-likelihood of Categorical',
        'Training minimizes cross-entropy = maximizes likelihood (MLE)',
        'Sigmoid outputs Bernoulli parameter p, softmax outputs Categorical parameters'
      ]
    },
    {
      id: 'gaussian-distribution',
      title: '3. Gaussian Distribution: The Universal Distribution',
      content: `## The Normal (Gaussian) Distribution

**Most important distribution in statistics and ML!**

**Parameters:** μ (mean), σ² (variance)

\`\`\`
f(x) = (1 / √(2πσ²)) exp(-(x-μ)² / (2σ²))
\`\`\`

**Notation:** X ~ N(μ, σ²)

**Properties:**
- Bell curve, symmetric around μ
- 68% of data within μ ± σ
- 95% within μ ± 2σ
- 99.7% within μ ± 3σ

### Why Gaussian is Everywhere in ML

**1. Central Limit Theorem**

Sum of many independent random variables → Gaussian

**Implication:** Many real-world phenomena are approximately Gaussian:
- Heights, weights, test scores
- Measurement errors
- Aggregated effects

**2. Maximum Entropy**

Given only mean and variance, Gaussian has **maximum entropy** (least assumptions).

**Implication:** Gaussian is the "default" distribution when we know only μ and σ².

**3. Mathematical Convenience**

- Closed-form derivatives
- Conjugate prior in Bayesian inference
- Easy to sample from
- Sum of Gaussians is Gaussian

### Gaussian in Neural Networks

**1. Regression with Uncertainty**

Instead of predicting a point estimate ŷ, predict a Gaussian:

\`\`\`python
# Network outputs: mean μ and variance σ²
μ = network_mean(x)
log_σ² = network_variance(x)  # Predict log variance (ensure positive)
σ² = exp(log_σ²)

# Prediction: y ~ N(μ, σ²)
# Sample: y_sample = μ + σ * noise, where noise ~ N(0, 1)
\`\`\`

**Why?** Quantify uncertainty in predictions!

**2. Mean Squared Error (MSE) Loss**

MSE is derived from Gaussian likelihood!

\`\`\`
Assume: y = f(x) + ε, where ε ~ N(0, σ²)

Log-likelihood: log P(y | x) = -1/(2σ²) · (y - f(x))² + const

Minimize negative log-likelihood:
  ⇒ Minimize (y - f(x))²
  ⇒ This is MSE!
\`\`\`

**Every regression network implicitly assumes Gaussian noise!**

**3. Weight Initialization**

Neural network weights initialized from Gaussian:

\`\`\`python
# Xavier/Glorot initialization
W ~ N(0, 2/(fan_in + fan_out))

# He initialization (for ReLU)
W ~ N(0, 2/fan_in)
\`\`\`

**Why?** Prevents vanishing/exploding activations.

**4. Gaussian Processes**

Bayesian approach to function approximation:
- Prior: functions ~ Gaussian Process
- Posterior: updated after observing data
- Provides uncertainty estimates

**5. Variational Autoencoders (VAEs)**

Latent variables modeled as Gaussian:

\`\`\`python
# Encoder outputs Gaussian parameters
μ, log_σ² = encoder(x)

# Sample latent code
z = μ + exp(0.5 * log_σ²) * ε, where ε ~ N(0, 1)

# Decoder reconstructs
x_reconstructed = decoder(z)
\`\`\`

This is the **reparameterization trick**!

### Multivariate Gaussian

**Generalization to d dimensions:**

X ~ N(μ, Σ)

- μ: d-dimensional mean vector
- Σ: d×d covariance matrix

**PDF:**
\`\`\`
f(x) = (1 / √((2π)^d |Σ|)) exp(-0.5 (x-μ)ᵀ Σ⁻¹ (x-μ))
\`\`\`

**Use Cases:**
- Gaussian Mixture Models (GMM)
- Discriminant analysis
- Kalman filters
- Multivariate regression`,
      examples: [
        {
          title: 'Regression with MSE Loss (Gaussian Assumption)',
          description: 'How regression implicitly assumes Gaussian noise',
          code: `import numpy as np

# Generate synthetic regression data
np.random.seed(42)
X = np.linspace(0, 10, 100).reshape(-1, 1)
y_true = 2 * X.ravel() + 1  # True function: y = 2x + 1
y = y_true + np.random.normal(0, 1, size=100)  # Add Gaussian noise

# Simple linear regression
def fit_regression(X, y):
    """Fit y = w*x + b by minimizing MSE (maximizing Gaussian likelihood)"""
    X_with_bias = np.c_[X, np.ones(len(X))]  # Add bias column

    # Closed-form solution: (X^T X)^(-1) X^T y
    theta = np.linalg.inv(X_with_bias.T @ X_with_bias) @ X_with_bias.T @ y
    return theta[0], theta[1]  # w, b

w, b = fit_regression(X, y)
print(f"Learned parameters: w = {w:.2f}, b = {b:.2f}")
print(f"True parameters: w = 2.00, b = 1.00")

# Predictions
y_pred = w * X.ravel() + b

# MSE loss (negative log-likelihood of Gaussian)
mse = np.mean((y - y_pred) ** 2)
print(f"\\nMSE loss: {mse:.4f}")

# Connection to Gaussian likelihood:
# If y ~ N(f(x), σ²), then:
# log P(y | x) = -1/(2σ²) · (y - f(x))² + const
# Minimizing -log P(y | x) ⇔ minimizing (y - f(x))²

# Estimate noise variance
residuals = y - y_pred
sigma_squared = np.var(residuals)
print(f"Estimated noise variance: {sigma_squared:.4f}")
print(f"True noise variance: 1.00")

# This is ordinary least squares (OLS) regression!
# Equivalent to maximum likelihood estimation under Gaussian assumption`
        },
        {
          title: 'Neural Network with Uncertainty (Gaussian Output)',
          description: 'Predict both mean and variance',
          code: `import numpy as np

class GaussianRegressionNetwork:
    """
    Neural network that outputs a Gaussian distribution
    Predicts both mean μ and variance σ²
    """

    def __init__(self, input_dim, hidden_dim):
        # Initialize weights
        self.W1 = np.random.randn(hidden_dim, input_dim) * 0.1
        self.b1 = np.zeros(hidden_dim)

        # Two output heads: mean and log-variance
        self.W_mean = np.random.randn(1, hidden_dim) * 0.1
        self.b_mean = np.zeros(1)

        self.W_logvar = np.random.randn(1, hidden_dim) * 0.1
        self.b_logvar = np.zeros(1)

    def forward(self, x):
        """
        Forward pass: output Gaussian parameters μ and σ²

        Returns:
            mean: predicted mean μ
            variance: predicted variance σ²
        """
        # Hidden layer with ReLU
        h = np.maximum(0, self.W1 @ x + self.b1)

        # Output mean
        mean = (self.W_mean @ h + self.b_mean)[0]

        # Output log-variance (ensures variance is positive)
        log_var = (self.W_logvar @ h + self.b_logvar)[0]
        variance = np.exp(log_var)

        return mean, variance

    def negative_log_likelihood(self, y_true, mean, variance):
        """
        Negative log-likelihood of Gaussian

        This is the loss function!
        """
        # -log P(y | μ, σ²) = 0.5 * log(2π σ²) + (y - μ)² / (2σ²)
        return 0.5 * (np.log(2 * np.pi * variance) + (y_true - mean)**2 / variance)

# Example usage
network = GaussianRegressionNetwork(input_dim=1, hidden_dim=10)

# Make prediction with uncertainty
x_test = np.array([5.0])
mean, variance = network.forward(x_test)

print(f"Prediction: μ = {mean:.2f}, σ² = {variance:.4f}")
print(f"Standard deviation: σ = {np.sqrt(variance):.2f}")

# Sample from predicted distribution
samples = np.random.normal(mean, np.sqrt(variance), size=100)
print(f"\\n95% confidence interval: [{mean - 2*np.sqrt(variance):.2f}, {mean + 2*np.sqrt(variance):.2f}]")

# Benefits:
# 1. Quantify prediction uncertainty
# 2. Different σ² for different inputs (heteroscedastic)
# 3. More informative than point estimates

# Real implementations:
# - Probabilistic deep learning (TensorFlow Probability, Pyro)
# - Bayesian neural networks
# - Gaussian Processes`
        },
        {
          title: 'Variational Autoencoder (VAE) - Gaussian Latent Space',
          description: 'Reparameterization trick for backpropagation through sampling',
          code: `import numpy as np

def encoder(x, W_enc, W_mean, W_logvar):
    """
    Encoder: maps input x to Gaussian parameters μ, log σ²

    Instead of directly outputting z, output distribution parameters
    This allows learning probabilistic representations
    """
    h = np.tanh(W_enc @ x)  # Hidden representation

    mu = W_mean @ h  # Mean of latent Gaussian
    log_var = W_logvar @ h  # Log-variance (ensures positive)

    return mu, log_var

def reparameterization_trick(mu, log_var):
    """
    Sample z ~ N(μ, σ²) using reparameterization trick

    Key insight: z = μ + σ * ε, where ε ~ N(0, 1)

    Why? Allows backpropagation through sampling!
    Gradients flow through μ and σ, not through random ε
    """
    sigma = np.exp(0.5 * log_var)  # σ = exp(0.5 * log σ²)
    epsilon = np.random.normal(0, 1, size=mu.shape)  # Sample noise

    z = mu + sigma * epsilon  # Reparameterized sample
    return z

def decoder(z, W_dec):
    """Decoder: maps latent code z back to data space"""
    x_reconstructed = np.tanh(W_dec @ z)
    return x_reconstructed

def vae_loss(x, x_reconstructed, mu, log_var):
    """
    VAE loss = reconstruction loss + KL divergence

    1. Reconstruction: how well decoder reconstructs input
    2. KL divergence: regularizer, keeps latent close to N(0,1)
    """
    # Reconstruction loss (MSE)
    reconstruction_loss = np.sum((x - x_reconstructed) ** 2)

    # KL divergence: KL(N(μ, σ²) || N(0, 1))
    # Closed form: 0.5 * sum(σ² + μ² - log(σ²) - 1)
    kl_divergence = -0.5 * np.sum(1 + log_var - mu**2 - np.exp(log_var))

    return reconstruction_loss + kl_divergence

# Example: 8D input → 2D latent space
input_dim = 8
latent_dim = 2

# Initialize weights (simplified)
W_enc = np.random.randn(4, input_dim) * 0.1
W_mean = np.random.randn(latent_dim, 4) * 0.1
W_logvar = np.random.randn(latent_dim, 4) * 0.1
W_dec = np.random.randn(input_dim, latent_dim) * 0.1

# Forward pass
x = np.random.randn(input_dim)

# Encode to Gaussian parameters
mu, log_var = encoder(x, W_enc, W_mean, W_logvar)
print(f"Latent Gaussian: μ = {mu}, log σ² = {log_var}")

# Sample using reparameterization trick
z = reparameterization_trick(mu, log_var)
print(f"Sampled latent code: {z}")

# Decode
x_reconstructed = decoder(z, W_dec)

# Compute loss
loss = vae_loss(x, x_reconstructed, mu, log_var)
print(f"\\nVAE loss: {loss:.4f}")

# Why VAE works:
# 1. Encoder learns probabilistic mapping: x → N(μ(x), σ²(x))
# 2. Latent space is continuous and structured
# 3. Can generate new samples: z ~ N(0, 1), x = decoder(z)

# This is the foundation of:
# - Stable Diffusion (diffusion VAE)
# - DALL-E (VQ-VAE)
# - Many generative models`
        }
      ],
      keyPoints: [
        'Gaussian: most important distribution in ML (Central Limit Theorem)',
        'MSE loss comes from Gaussian likelihood assumption',
        'Regression networks can output (μ, σ²) for uncertainty quantification',
        'VAE uses reparameterization trick: z = μ + σ*ε to enable backprop',
        'Weight initialization uses Gaussian (Xavier, He initialization)',
        'Multivariate Gaussian for high-dimensional data (GMM, GP)'
      ]
    },
    {
      id: 'maximum-likelihood',
      title: '4. Maximum Likelihood Estimation: How Models Learn',
      content: `## Maximum Likelihood Estimation (MLE)

**THE fundamental principle of machine learning!**

**Idea:** Choose parameters that make the observed data **most probable**.

**Formally:**

Given data D = {x₁, x₂, ..., xₙ}, find parameters θ that maximize:

\`\`\`
θ* = argmax P(D | θ)
      θ
\`\`\`

This is the **likelihood function**: L(θ) = P(D | θ)

### Why MLE Works

**Assumption:** Data is i.i.d. (independent and identically distributed)

Then:
\`\`\`
P(D | θ) = P(x₁, x₂, ..., xₙ | θ)
         = P(x₁ | θ) · P(x₂ | θ) · ... · P(xₙ | θ)  (independence)
         = ∏ P(xᵢ | θ)
\`\`\`

**Log-likelihood** (easier to work with):
\`\`\`
log L(θ) = log ∏ P(xᵢ | θ)
         = Σ log P(xᵢ | θ)  (sum instead of product!)
\`\`\`

**MLE objective:**
\`\`\`
θ* = argmax Σ log P(xᵢ | θ)
      θ     i
\`\`\`

**Training neural networks = MLE!**

Minimizing loss = Maximizing likelihood:
\`\`\`
Minimize -Σ log P(yᵢ | xᵢ, θ)
         i

This is negative log-likelihood (NLL)
\`\`\`

### MLE for Common Distributions

**1. Bernoulli (Binary Classification)**

Likelihood: P(y | x, θ) = p^y · (1-p)^(1-y), where p = sigmoid(θᵀx)

Log-likelihood: log P(y | x, θ) = y log p + (1-y) log(1-p)

**Negative log-likelihood = Binary cross-entropy!**

**2. Categorical (Multi-Class Classification)**

Likelihood: P(y | x, θ) = ∏ pᵢ^yᵢ, where y is one-hot

Log-likelihood: log P(y | x, θ) = Σ yᵢ log pᵢ

**Negative log-likelihood = Cross-entropy!**

**3. Gaussian (Regression)**

Likelihood: P(y | x, θ) = N(y; μ(x,θ), σ²)

Log-likelihood: log P(y | x, θ) = -1/(2σ²) · (y - μ(x,θ))² + const

**Negative log-likelihood ∝ MSE!**

### Connection to Loss Functions

**Every loss function is a negative log-likelihood!**

| Task | Distribution | Loss Function |
|------|-------------|---------------|
| Binary classification | Bernoulli | Binary cross-entropy |
| Multi-class classification | Categorical | Cross-entropy |
| Regression | Gaussian | MSE |
| Count prediction | Poisson | Poisson NLL |
| Ordinal regression | Ordered logit | Ordinal cross-entropy |

**Training = finding parameters that maximize likelihood of data!**

### Bias-Variance Tradeoff

MLE has **low bias** (asymptotically unbiased as n→∞)

But: MLE can have **high variance** (overfitting on small datasets)

**Solution:** Regularization = Bayesian interpretation (MAP estimation)`,
      examples: [
        {
          title: 'MLE for Binary Classification (Logistic Regression)',
          description: 'Derive binary cross-entropy from Bernoulli MLE',
          code: `import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def mle_binary_classification(X, y, num_iterations=1000, lr=0.01):
    """
    Maximum likelihood estimation for binary classification

    Model: P(y=1 | x, w) = sigmoid(w^T x)

    Maximize: Σ [y log p + (1-y) log(1-p)]
    Equivalently, minimize: -Σ [y log p + (1-y) log(1-p)]
    This is binary cross-entropy!
    """
    n_samples, n_features = X.shape
    w = np.zeros(n_features)  # Initialize parameters

    for iteration in range(num_iterations):
        # Forward pass: compute probabilities
        z = X @ w
        p = sigmoid(z)  # P(y=1 | x, w)

        # Negative log-likelihood (our loss)
        epsilon = 1e-15
        p = np.clip(p, epsilon, 1 - epsilon)
        nll = -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))

        # Gradient of negative log-likelihood
        # ∂NLL/∂w = X^T (p - y) / n
        gradient = X.T @ (p - y) / n_samples

        # Gradient descent update
        w = w - lr * gradient

        if iteration % 100 == 0:
            print(f"Iteration {iteration}: NLL = {nll:.4f}")

    return w

# Example: Spam classification
np.random.seed(42)
n_samples = 1000
n_features = 5

# Generate synthetic data
X = np.random.randn(n_samples, n_features)
true_w = np.array([1.5, -0.8, 0.5, -1.2, 0.9])
y_prob = sigmoid(X @ true_w)
y = (np.random.rand(n_samples) < y_prob).astype(float)

print("Training logistic regression via MLE...")
learned_w = mle_binary_classification(X, y)

print(f"\\nTrue weights: {true_w}")
print(f"Learned weights: {learned_w}")
print(f"L2 error: {np.linalg.norm(true_w - learned_w):.4f}")

# Make predictions
X_test = np.random.randn(10, n_features)
p_pred = sigmoid(X_test @ learned_w)
y_pred = (p_pred > 0.5).astype(int)

print(f"\\nTest predictions (probabilities): {p_pred}")
print(f"Test predictions (classes): {y_pred}")

# This is maximum likelihood estimation!
# sklearn: LogisticRegression()
# PyTorch: nn.BCEWithLogitsLoss()
# Both implement MLE for Bernoulli distribution`
        },
        {
          title: 'MLE for Regression (Gaussian Assumption)',
          description: 'Derive MSE from Gaussian MLE',
          code: `import numpy as np

def mle_gaussian_regression(X, y, num_iterations=1000, lr=0.01):
    """
    Maximum likelihood estimation for regression

    Model: y ~ N(w^T x, σ²)

    Log-likelihood: log P(y | x, w) = -1/(2σ²) · (y - w^T x)² + const

    Maximizing log-likelihood ⇔ minimizing (y - w^T x)²
    This is mean squared error (MSE)!
    """
    n_samples, n_features = X.shape
    w = np.zeros(n_features)  # Initialize parameters

    for iteration in range(num_iterations):
        # Forward pass: compute predictions
        y_pred = X @ w

        # Residuals
        residuals = y - y_pred

        # Negative log-likelihood (ignoring constant σ²)
        # NLL ∝ Σ (y - w^T x)² / 2
        mse = np.mean(residuals ** 2)
        nll = mse / 2

        # Gradient: ∂NLL/∂w = -X^T (y - w^T x) / n
        gradient = -X.T @ residuals / n_samples

        # Gradient descent update
        w = w - lr * gradient

        if iteration % 100 == 0:
            print(f"Iteration {iteration}: MSE = {mse:.4f}")

    # Estimate σ² (noise variance) from residuals
    final_residuals = y - X @ w
    sigma_squared = np.var(final_residuals)

    return w, sigma_squared

# Example: House price prediction
np.random.seed(42)
n_samples = 1000
n_features = 3

# Generate synthetic data
X = np.random.randn(n_samples, n_features)
true_w = np.array([2.0, -1.5, 0.8])
true_sigma = 0.5

y_true = X @ true_w
y = y_true + np.random.normal(0, true_sigma, size=n_samples)  # Add Gaussian noise

print("Training linear regression via MLE...")
learned_w, learned_sigma_squared = mle_gaussian_regression(X, y)

print(f"\\nTrue weights: {true_w}")
print(f"Learned weights: {learned_w}")
print(f"\\nTrue noise variance: {true_sigma**2:.4f}")
print(f"Learned noise variance: {learned_sigma_squared:.4f}")

# Make predictions with uncertainty
X_test = np.random.randn(5, n_features)
y_pred_mean = X_test @ learned_w
y_pred_std = np.sqrt(learned_sigma_squared)

print(f"\\nTest predictions (mean ± std):")
for i in range(5):
    print(f"  Sample {i}: {y_pred_mean[i]:.2f} ± {y_pred_std:.2f}")
    print(f"    95% CI: [{y_pred_mean[i] - 2*y_pred_std:.2f}, {y_pred_mean[i] + 2*y_pred_std:.2f}]")

# This is maximum likelihood estimation under Gaussian assumption!
# sklearn: LinearRegression()
# statsmodels: OLS (ordinary least squares)
# Both are MLE for Gaussian distribution`
        }
      ],
      keyPoints: [
        'MLE: find parameters that maximize P(data | parameters)',
        'Log-likelihood: sum of log probabilities (easier than product)',
        'Training neural networks = MLE with gradient descent',
        'Binary cross-entropy = negative log-likelihood of Bernoulli',
        'Cross-entropy = negative log-likelihood of Categorical',
        'MSE = negative log-likelihood of Gaussian',
        'Every loss function comes from a probabilistic model!'
      ]
    },
    {
      id: 'distributions-in-modern-ai',
      title: '5. Probability Distributions in Modern AI',
      content: `## The Probabilistic View of Deep Learning

**Key Insight:** Deep learning is probabilistic modeling at scale.

### Generative Models: Learning P(x)

**Goal:** Model the distribution of data itself

**1. Autoregressive Models (GPT, Transformers)**

\`\`\`
P(x₁, x₂, ..., xₙ) = P(x₁) · P(x₂|x₁) · P(x₃|x₁,x₂) · ...

Chain rule decomposition!
\`\`\`

Each P(xᵢ | x₁...xᵢ₋₁) is a Categorical distribution (softmax over vocabulary)

**GPT training:**
- Maximize Σ log P(xᵢ | x₁...xᵢ₋₁)
- This is maximum likelihood on Categorical distributions!

**2. Variational Autoencoders (VAE)**

\`\`\`
Latent variable model: P(x) = ∫ P(x | z) P(z) dz

Encoder: q(z | x) ≈ P(z | x)  (approximate posterior)
Decoder: P(x | z)  (likelihood)
Prior: P(z) = N(0, I)  (standard Gaussian)
\`\`\`

**Training:**
- Maximize ELBO (evidence lower bound)
- ELBO = E[log P(x | z)] - KL(q(z|x) || P(z))
- Reconstruction + regularization

**3. Generative Adversarial Networks (GAN)**

\`\`\`
Generator: G(z) where z ~ N(0, I)
Discriminator: D(x) → [0, 1]  (real vs fake probability)
\`\`\`

**Training:**
- Adversarial game: generator vs discriminator
- Generator learns implicit distribution

**4. Diffusion Models (Stable Diffusion, DALL-E 2)**

\`\`\`
Forward process: gradually add Gaussian noise
  x₀ → x₁ → x₂ → ... → xₜ ~ N(0, I)

Reverse process: denoise step by step
  xₜ → xₜ₋₁ → ... → x₁ → x₀
\`\`\`

Each denoising step models P(xₜ₋₁ | xₜ)

### Discriminative Models: Learning P(y | x)

**Classification:**
- P(y | x) = Categorical distribution (softmax)
- Training: maximize Σ log P(yᵢ | xᵢ)

**Regression:**
- P(y | x) = Gaussian N(μ(x), σ²)
- Training: maximize Σ log P(yᵢ | xᵢ) ⇔ minimize MSE

### Bayesian Deep Learning

**Goal:** Model uncertainty in parameters θ

\`\`\`
Instead of point estimate θ*, learn distribution P(θ | D)

Prediction: P(y | x, D) = ∫ P(y | x, θ) P(θ | D) dθ
\`\`\`

**Methods:**
- **Dropout as Bayesian approximation:** MC dropout
- **Variational inference:** Learn q(θ) ≈ P(θ | D)
- **Ensembles:** Average predictions from multiple models

**Benefits:**
- Uncertainty quantification
- Robustness to out-of-distribution inputs
- Better calibration

### Reinforcement Learning: Probabilistic Policies

**Policy:** π(a | s) = P(action | state)

**Value function:** V(s) = E[future reward | s]

**Training:**
- Policy gradient: ∇ E[reward] = E[reward · ∇ log π(a|s)]
- Actor-critic: combine policy and value learning

**Exploration:**
- Sample actions from π(a | s) (stochastic policy)
- Entropy regularization: encourage diversity

### Uncertainty Quantification in Production

**Why it matters:**
- Medical diagnosis: "95% confident in diagnosis"
- Autonomous driving: "uncertain about pedestrian location"
- Financial trading: "high volatility predicted"

**Techniques:**
1. **Ensemble methods:** Train N models, average predictions
2. **Bayesian neural networks:** Model P(θ | data)
3. **Evidential deep learning:** Predict distribution over distributions
4. **Conformal prediction:** Finite-sample guarantees

### The Future: Foundation Models as Distributions

**Large language models (GPT-4, Claude):**
- Model: P(next_token | context)
- Can be adapted: P(answer | question)

**Vision-language models (CLIP, Flamingo):**
- Joint distribution: P(image, text)
- Zero-shot: P(class | image) via text embedding

**Multimodal models:**
- P(image, text, audio, ...)
- Universal representations

**Key insight:** Foundation models learn general-purpose probability distributions that transfer across tasks!`,
      examples: [
        {
          title: 'Autoregressive Language Modeling (Mini-GPT)',
          description: 'How GPT computes P(next_token | context)',
          code: `import numpy as np

def softmax_with_temperature(logits, temperature=1.0):
    """
    Apply temperature and softmax

    temperature < 1: confident (peaked distribution)
    temperature > 1: diverse (flat distribution)
    """
    logits = logits / temperature
    exp_logits = np.exp(logits - np.max(logits))
    return exp_logits / exp_logits.sum()

class AutoregressiveLanguageModel:
    """
    Simplified autoregressive model (like GPT)

    Models: P(x₁, x₂, ..., xₙ) = ∏ P(xᵢ | x₁...xᵢ₋₁)
    """

    def __init__(self, vocab_size, embed_dim):
        self.vocab_size = vocab_size
        self.embed_dim = embed_dim

        # Simplified: just embedding + output projection
        self.embedding = np.random.randn(vocab_size, embed_dim) * 0.1
        self.output = np.random.randn(vocab_size, embed_dim) * 0.1

    def forward(self, context_tokens):
        """
        Compute P(next_token | context)

        Returns probability distribution over vocabulary
        """
        # Average embeddings (simplified - real models use transformers)
        context_embeds = self.embedding[context_tokens]
        context_repr = context_embeds.mean(axis=0)

        # Compute logits for all vocabulary tokens
        logits = self.output @ context_repr

        # Convert to probability distribution (Categorical)
        probs = softmax_with_temperature(logits, temperature=1.0)

        return probs

    def generate(self, start_tokens, num_tokens, temperature=1.0):
        """
        Generate sequence autoregressively

        P(x₁, ..., xₙ) = P(x₁) · P(x₂|x₁) · P(x₃|x₁,x₂) · ...
        """
        tokens = list(start_tokens)

        for _ in range(num_tokens):
            # Get probability distribution
            probs = self.forward(tokens)

            # Apply temperature
            probs = softmax_with_temperature(np.log(probs + 1e-10), temperature)

            # Sample next token
            next_token = np.random.choice(self.vocab_size, p=probs)
            tokens.append(next_token)

        return tokens

    def compute_log_likelihood(self, sequence):
        """
        Compute log P(sequence) = Σ log P(xᵢ | x₁...xᵢ₋₁)

        This is the training objective!
        """
        log_prob = 0.0

        for i in range(1, len(sequence)):
            context = sequence[:i]
            target = sequence[i]

            probs = self.forward(context)
            log_prob += np.log(probs[target] + 1e-10)

        return log_prob

# Example usage
vocab_size = 50  # Small vocabulary
embed_dim = 16
model = AutoregressiveLanguageModel(vocab_size, embed_dim)

# Start sequence: [2, 5, 10]
start_tokens = [2, 5, 10]

print("Generating with different temperatures:\\n")

print("Temperature = 0.5 (confident, repetitive):")
generated = model.generate(start_tokens, num_tokens=10, temperature=0.5)
print(f"  {generated}\\n")

print("Temperature = 1.0 (normal):")
generated = model.generate(start_tokens, num_tokens=10, temperature=1.0)
print(f"  {generated}\\n")

print("Temperature = 2.0 (creative, diverse):")
generated = model.generate(start_tokens, num_tokens=10, temperature=2.0)
print(f"  {generated}\\n")

# Compute likelihood of a sequence
test_sequence = [2, 5, 10, 3, 7]
log_likelihood = model.compute_log_likelihood(test_sequence)
print(f"Log-likelihood of {test_sequence}: {log_likelihood:.4f}")

# This is how GPT works!
# Real GPT: transformer layers instead of averaging
# But same autoregressive structure: P(next | context)`
        },
        {
          title: 'Uncertainty Quantification with Ensembles',
          description: 'Average multiple models for better predictions + uncertainty',
          code: `import numpy as np

class SimpleClassifier:
    """Simple neural network for binary classification"""

    def __init__(self, input_dim, seed=None):
        if seed is not None:
            np.random.seed(seed)
        self.W = np.random.randn(input_dim) * 0.5
        self.b = np.random.randn() * 0.5

    def predict_proba(self, X):
        """Predict P(y=1 | x)"""
        z = X @ self.W + self.b
        return 1 / (1 + np.exp(-z))

class EnsembleClassifier:
    """
    Ensemble of models for uncertainty quantification

    Instead of single prediction, get distribution of predictions
    Mean: best estimate
    Std: uncertainty/confidence
    """

    def __init__(self, input_dim, num_models=10):
        # Train multiple models with different initializations
        self.models = [SimpleClassifier(input_dim, seed=i) for i in range(num_models)]

    def predict_with_uncertainty(self, X):
        """
        Predict with uncertainty estimates

        Returns:
            mean: average prediction
            std: uncertainty (high std = uncertain)
        """
        # Get predictions from all models
        predictions = np.array([model.predict_proba(X) for model in self.models])

        # Statistics
        mean = predictions.mean(axis=0)
        std = predictions.std(axis=0)

        return mean, std

# Generate test data
np.random.seed(42)
n_test = 100
input_dim = 5

X_test = np.random.randn(n_test, input_dim)

# Train ensemble
print("Training ensemble of 10 models...")
ensemble = EnsembleClassifier(input_dim, num_models=10)

# Get predictions with uncertainty
mean, std = ensemble.predict_with_uncertainty(X_test)

print(f"\\nPredictions with uncertainty:\\n")
print(f"{'Mean Prediction':<20} {'Std (Uncertainty)':<20} {'Interpretation'}")
print("-" * 70)

for i in range(10):  # Show first 10
    interpretation = ""
    if std[i] < 0.1:
        interpretation = "Very confident"
    elif std[i] < 0.2:
        interpretation = "Confident"
    elif std[i] < 0.3:
        interpretation = "Uncertain"
    else:
        interpretation = "Very uncertain"

    print(f"{mean[i]:.4f}              {std[i]:.4f}              {interpretation}")

# Identify uncertain predictions (high std)
uncertain_indices = np.where(std > 0.25)[0]
print(f"\\nFound {len(uncertain_indices)} uncertain predictions (std > 0.25)")
print("These might need human review or more data!")

# Calibration: predictions should match true frequencies
# If model says 70% confidence, it should be right 70% of the time

print("\\n=== Benefits of Uncertainty Quantification ===")
print("1. Know when model is confident vs uncertain")
print("2. Flag outliers for human review")
print("3. Better decision making under uncertainty")
print("4. Detect distribution shift (high uncertainty on new data)")

# Real-world techniques:
# - Deep ensembles (multiple full neural networks)
# - MC Dropout (dropout at test time)
# - Bayesian neural networks (variational inference)
# - Evidential deep learning (predict distribution parameters)`
        }
      ],
      keyPoints: [
        'Deep learning = probabilistic modeling: all models output distributions',
        'Autoregressive models (GPT): P(sequence) = ∏ P(token | context)',
        'VAE: latent variable model with Gaussian latent space',
        'Diffusion models: reverse Gaussian noise process',
        'Uncertainty quantification critical for real-world deployment',
        'Ensembles, Bayesian NNs, MC dropout quantify epistemic uncertainty',
        'Foundation models learn general-purpose probability distributions'
      ]
    }
  ],
  summary: [
    'Probability distributions assign probabilities to outcomes (sum/integrate to 1)',
    'Bernoulli (binary), Categorical (multi-class), Gaussian (continuous)',
    'Loss functions are negative log-likelihoods: cross-entropy (Bernoulli/Categorical), MSE (Gaussian)',
    'Training = Maximum Likelihood Estimation (MLE): maximize P(data | parameters)',
    'Neural networks output probability distributions (softmax for classification)',
    'Generative models learn P(x): GPT (autoregressive), VAE (latent variable), GAN, diffusion',
    'Uncertainty quantification: ensembles, Bayesian NNs, MC dropout',
    'All modern AI is fundamentally probabilistic!'
  ],
  nextSteps: [
    'Implement softmax + cross-entropy from scratch',
    'Train classifiers with MLE perspective',
    'Experiment with temperature in sampling',
    'Build ensemble models for uncertainty',
    'Study Bayesian neural networks',
    'Explore VAEs and diffusion models',
    'Learn about calibration and uncertainty metrics',
    'Move on to code challenges: build Bayesian networks and probabilistic reasoners'
  ],
  checkYourUnderstanding: [
    {
      question: 'Why is cross-entropy the loss function for classification?',
      answer: 'Because it\'s the negative log-likelihood of the Categorical (multi-class) or Bernoulli (binary) distribution. Minimizing cross-entropy = maximizing likelihood that the model assigns to the true labels. This is Maximum Likelihood Estimation (MLE).'
    },
    {
      question: 'What does softmax do, and why is it important?',
      answer: 'Softmax converts raw scores (logits) into a probability distribution: exp(logits) / sum(exp(logits)). It ensures outputs are non-negative and sum to 1. This gives us parameters for a Categorical distribution over classes.'
    },
    {
      question: 'How does temperature affect sampling in language models?',
      answer: 'Temperature scales logits before softmax. T<1: sharper distribution (more confident/deterministic). T>1: flatter distribution (more diverse/creative). T=0: greedy (always pick argmax). GPT uses temperature to control generation randomness.'
    },
    {
      question: 'Why does MSE come from Gaussian assumption?',
      answer: 'Assuming y = f(x) + ε where ε ~ N(0, σ²), the negative log-likelihood is (y - f(x))²/(2σ²) + constant. Minimizing this is equivalent to minimizing (y - f(x))², which is MSE. Every regression network implicitly assumes Gaussian noise!'
    },
    {
      question: 'What is Maximum Likelihood Estimation (MLE)?',
      answer: 'MLE finds parameters θ that maximize P(data | θ). For i.i.d. data, this becomes maximizing Σ log P(xᵢ | θ). Training neural networks with cross-entropy or MSE is MLE! We minimize negative log-likelihood.'
    },
    {
      question: 'How do autoregressive models like GPT work probabilistically?',
      answer: 'GPT models P(sequence) = P(x₁) · P(x₂|x₁) · P(x₃|x₁,x₂) · ... (chain rule). Each conditional P(xᵢ | context) is a Categorical distribution over vocabulary (softmax). Training maximizes Σ log P(xᵢ | context) = MLE on text data.'
    },
    {
      question: 'Why is uncertainty quantification important in AI?',
      answer: 'Models should know when they don\'t know! Uncertainty helps: (1) flag predictions for human review, (2) detect out-of-distribution inputs, (3) make better decisions under uncertainty, (4) improve safety in critical applications (medical, autonomous driving). Methods: ensembles, Bayesian NNs, MC dropout.'
    }
  ]
};