import { TheoryLesson } from './types';

export const statisticalInferenceLesson: TheoryLesson = {
  id: 'statistical-inference-theory',
  title: 'Statistical Inference and Machine Learning: Reasoning Under Uncertainty',
  description: 'Master statistical inference - the science of making conclusions from data despite uncertainty. Learn how hypothesis testing, confidence intervals, and Bayesian reasoning underpin modern machine learning evaluation, A/B testing, and model selection.',
  learningObjectives: [
    'Understand statistical inference: drawing conclusions from data with uncertainty',
    'Master hypothesis testing, p-values, and statistical significance for ML experiments',
    'Learn confidence intervals and their interpretation in model evaluation',
    'Apply A/B testing and experimental design to ML systems',
    'Understand bias-variance tradeoff and cross-validation',
    'Connect Bayesian inference to regularization and prior knowledge in ML'
  ],
  prerequisites: ['probability-distributions-theory'],
  sections: [
    {
      id: 'statistical-inference-basics',
      title: '1. Statistical Inference: From Sample to Population',
      content: `## What is Statistical Inference?

**Goal:** Make conclusions about a **population** based on a **sample**

**Problem:** We can't observe the entire population (too expensive, time-consuming, or impossible)

**Solution:** Collect a sample and use it to **infer** properties of the population

**Example in ML:**
- **Population:** All possible users
- **Sample:** Users in our training/test data
- **Inference:** Will our model generalize to new users?

### Two Types of Inference

**1. Estimation**

Estimate population parameters from sample statistics

\`\`\`
Parameter: true value (unknown)
  - Population mean: μ
  - Population variance: σ²

Statistic: calculated from sample
  - Sample mean: x̄
  - Sample variance: s²

Goal: x̄ estimates μ, s² estimates σ²
\`\`\`

**Example:** Average prediction error on test set estimates true error rate

**2. Hypothesis Testing**

Test claims about the population

\`\`\`
Null hypothesis H₀: "no effect" or "no difference"
Alternative hypothesis H₁: "there is an effect"

Goal: Decide whether to reject H₀ based on data
\`\`\`

**Example:** "Does our new model perform better than baseline?"

### Sampling Distributions

**Key Insight:** Statistics (like x̄) are themselves random variables with distributions!

**Central Limit Theorem (CLT):**

For large n, sample mean x̄ ~ N(μ, σ²/n) approximately

**Implications:**
- Larger sample → smaller variance → more precise estimate
- Standard error: SE = σ/√n (uncertainty in estimate)
- 95% confidence: x̄ is within 2·SE of μ (approximately)

### Confidence Intervals

**Definition:** Range that likely contains the true parameter

**95% Confidence Interval:**
\`\`\`
[x̄ - 1.96·SE, x̄ + 1.96·SE]
\`\`\`

**Interpretation:** "If we repeated this experiment many times, 95% of intervals would contain the true mean"

**NOT:** "95% probability true mean is in this interval" (frequentist interpretation)

**Use in ML:**
- Model accuracy: 85% ± 2% (95% CI)
- A/B test: CTR increased by 5% ± 1%
- Quantify uncertainty in reported metrics`,
      examples: [
        {
          title: 'Estimating Model Accuracy with Confidence Interval',
          description: 'How to report ML metrics with uncertainty',
          code: `import numpy as np
from scipy import stats

def evaluate_classifier_with_confidence(y_true, y_pred, confidence_level=0.95):
    """
    Evaluate classifier and report accuracy with confidence interval

    Uses binomial proportion confidence interval
    """
    n = len(y_true)
    correct = (y_true == y_pred).sum()
    accuracy = correct / n

    # Standard error for binomial proportion
    se = np.sqrt(accuracy * (1 - accuracy) / n)

    # Z-score for confidence level
    z = stats.norm.ppf((1 + confidence_level) / 2)

    # Confidence interval
    ci_lower = accuracy - z * se
    ci_upper = accuracy + z * se

    return accuracy, ci_lower, ci_upper, se

# Example: Evaluate model on test set
np.random.seed(42)
n_samples = 1000

# Simulate predictions (85% accurate model)
y_true = np.random.randint(0, 2, size=n_samples)
y_pred = y_true.copy()
# Introduce 15% errors
errors = np.random.choice(n_samples, size=int(0.15 * n_samples), replace=False)
y_pred[errors] = 1 - y_pred[errors]

# Evaluate with confidence interval
accuracy, ci_lower, ci_upper, se = evaluate_classifier_with_confidence(
    y_true, y_pred, confidence_level=0.95
)

print(f"Model Evaluation (n={n_samples}):")
print(f"Accuracy: {accuracy:.1%}")
print(f"Standard Error: {se:.3f}")
print(f"95% Confidence Interval: [{ci_lower:.1%}, {ci_upper:.1%}]")
print(f"\\nInterpretation: We are 95% confident the true accuracy is between {ci_lower:.1%} and {ci_upper:.1%}")

# Effect of sample size on confidence interval width
print(f"\\n=== Effect of Sample Size ===")
for n in [100, 500, 1000, 5000]:
    # Simulate
    y_true_sim = np.random.randint(0, 2, size=n)
    y_pred_sim = y_true_sim.copy()
    errors_sim = np.random.choice(n, size=int(0.15 * n), replace=False)
    y_pred_sim[errors_sim] = 1 - y_pred_sim[errors_sim]

    acc, ci_l, ci_u, _ = evaluate_classifier_with_confidence(y_true_sim, y_pred_sim)
    width = ci_u - ci_l

    print(f"n={n:5d}: Accuracy = {acc:.1%}, CI width = {width:.3f} (±{width/2:.3f})")

print("\\nKey insight: Larger samples → narrower confidence intervals → more precise estimates!")

# Real ML: always report confidence intervals!
# sklearn: Use bootstrap or cross-validation for CI
# Papers: Report mean ± std or mean [CI_lower, CI_upper]`
        },
        {
          title: 'Bootstrap: Resampling for Confidence Intervals',
          description: 'Non-parametric method for uncertainty estimation',
          code: `import numpy as np

def bootstrap_confidence_interval(data, statistic_func, num_bootstrap=10000, confidence_level=0.95):
    """
    Compute confidence interval using bootstrap resampling

    Bootstrap: repeatedly resample data with replacement, compute statistic
    CI: percentiles of bootstrap distribution

    Works for ANY statistic, not just mean!
    """
    n = len(data)
    bootstrap_statistics = []

    for _ in range(num_bootstrap):
        # Resample with replacement
        resample = np.random.choice(data, size=n, replace=True)

        # Compute statistic on resample
        stat = statistic_func(resample)
        bootstrap_statistics.append(stat)

    bootstrap_statistics = np.array(bootstrap_statistics)

    # Confidence interval: percentiles
    alpha = 1 - confidence_level
    ci_lower = np.percentile(bootstrap_statistics, 100 * alpha / 2)
    ci_upper = np.percentile(bootstrap_statistics, 100 * (1 - alpha / 2))

    return ci_lower, ci_upper, bootstrap_statistics

# Example: Model performance on different metrics
np.random.seed(42)

# Simulated prediction errors
errors = np.abs(np.random.gamma(2, 2, size=500))  # Skewed distribution

# Compute various statistics with confidence intervals
print("Bootstrap Confidence Intervals for Different Statistics:\\n")

# Mean error
mean_error = np.mean(errors)
ci_l, ci_u, _ = bootstrap_confidence_interval(errors, np.mean)
print(f"Mean Error: {mean_error:.2f}")
print(f"  95% CI: [{ci_l:.2f}, {ci_u:.2f}]")

# Median error (robust to outliers)
median_error = np.median(errors)
ci_l, ci_u, _ = bootstrap_confidence_interval(errors, np.median)
print(f"\\nMedian Error: {median_error:.2f}")
print(f"  95% CI: [{ci_l:.2f}, {ci_u:.2f}]")

# 90th percentile (tail behavior)
def percentile_90(x):
    return np.percentile(x, 90)

p90_error = percentile_90(errors)
ci_l, ci_u, _ = bootstrap_confidence_interval(errors, percentile_90)
print(f"\\n90th Percentile Error: {p90_error:.2f}")
print(f"  95% CI: [{ci_l:.2f}, {ci_u:.2f}]")

# Bootstrap works for complex statistics!
def coefficient_of_variation(x):
    return np.std(x) / np.mean(x)

cv = coefficient_of_variation(errors)
ci_l, ci_u, boot_dist = bootstrap_confidence_interval(errors, coefficient_of_variation)
print(f"\\nCoefficient of Variation: {cv:.3f}")
print(f"  95% CI: [{ci_l:.3f}, {ci_u:.3f}]")

print(f"\\n=== Advantages of Bootstrap ===")
print("1. Works for ANY statistic (mean, median, percentiles, etc.)")
print("2. No assumptions about data distribution")
print("3. Easy to implement")
print("4. Widely used in ML for uncertainty estimation")

# Real applications:
# - sklearn: Use bootstrap for model evaluation
# - Papers: Bootstrap for reporting performance
# - A/B tests: Bootstrap for CTR, conversion rate, etc.`
        }
      ],
      keyPoints: [
        'Statistical inference: draw conclusions about population from sample',
        'Estimation: use sample statistics (x̄) to estimate parameters (μ)',
        'Standard error (SE): uncertainty in estimate, SE = σ/√n',
        'Confidence interval: range likely containing true parameter',
        '95% CI: [x̄ - 1.96·SE, x̄ + 1.96·SE] (for large n)',
        'Bootstrap: resample data to estimate uncertainty (works for any statistic)',
        'Always report ML metrics with confidence intervals!'
      ]
    },
    {
      id: 'hypothesis-testing',
      title: '2. Hypothesis Testing: Making Decisions Under Uncertainty',
      content: `## Hypothesis Testing Framework

**Scenario:** You want to test a claim about the world

**Setup:**
- **Null hypothesis H₀:** "no effect" or "status quo"
- **Alternative hypothesis H₁:** "there is an effect"

**Goal:** Decide whether evidence (data) is strong enough to reject H₀

### The Hypothesis Testing Procedure

**1. State hypotheses**

Example: "New model is better than baseline"
- H₀: accuracy_new ≤ accuracy_baseline (no improvement)
- H₁: accuracy_new > accuracy_baseline (improvement)

**2. Choose significance level α**

Typically α = 0.05 (5%)

**Interpretation:** Probability of falsely rejecting H₀ (Type I error)

**3. Compute test statistic**

Measure how far data deviates from H₀

Example: t-statistic, z-score

**4. Compute p-value**

**P-value:** Probability of seeing data at least this extreme, assuming H₀ is true

**Small p-value → data inconsistent with H₀ → reject H₀**

**5. Make decision**

- If p < α: Reject H₀ (statistically significant)
- If p ≥ α: Fail to reject H₀ (not significant)

### P-Values: What They Really Mean

**Correct interpretation:**

"If H₀ were true, we'd see data at least this extreme with probability p"

**Common misinterpretations (WRONG!):**
- ❌ "Probability that H₀ is true"
- ❌ "Probability that results are due to chance"
- ❌ "Effect size" or "importance"

**Key Points:**
- Small p-value: data inconsistent with H₀
- p-value does NOT measure effect size or practical significance
- p < 0.05 is arbitrary convention (not a hard threshold!)

### Type I and Type II Errors

**Type I Error (False Positive):**
- Reject H₀ when it's true
- Probability = α (significance level)
- Example: Claim model improves, but it doesn't

**Type II Error (False Negative):**
- Fail to reject H₀ when it's false
- Probability = β
- Example: Model improves, but we don't detect it

**Power:** 1 - β (probability of correctly rejecting false H₀)

**Tradeoff:** Lowering α increases β (stricter criteria → harder to detect true effects)

### Statistical Significance vs Practical Significance

**Statistical significance:** p < 0.05 (reject H₀)

**Practical significance:** Effect is large enough to matter

**Example:**
- Test: New model 0.1% more accurate (p = 0.001)
- Statistically significant? YES (p < 0.05)
- Practically significant? Maybe not (0.1% may be negligible)

**Lesson:** Always report effect sizes, not just p-values!

### Multiple Comparisons Problem

**Problem:** Testing many hypotheses increases false positive rate

**Example:** Test 20 features, each at α = 0.05
- Expected false positives: 20 × 0.05 = 1

**Solution: Bonferroni Correction**

Test each hypothesis at α/m (m = number of tests)

**Example:** 20 tests → use α = 0.05/20 = 0.0025 for each

**Better solutions:**
- False Discovery Rate (FDR) control (Benjamini-Hochberg)
- Hold-out test sets (don't test on training data!)`,
      examples: [
        {
          title: 'A/B Test: Compare Two Models',
          description: 'Statistical test for model comparison',
          code: `import numpy as np
from scipy import stats

def ab_test_proportions(conversions_a, trials_a, conversions_b, trials_b, alpha=0.05):
    """
    Two-proportion z-test for A/B testing

    H₀: p_a = p_b (no difference in conversion rates)
    H₁: p_a ≠ p_b (difference exists)
    """
    # Sample proportions
    p_a = conversions_a / trials_a
    p_b = conversions_b / trials_b

    # Pooled proportion (under H₀)
    p_pool = (conversions_a + conversions_b) / (trials_a + trials_b)

    # Standard error
    se = np.sqrt(p_pool * (1 - p_pool) * (1/trials_a + 1/trials_b))

    # Z-statistic
    z = (p_a - p_b) / se

    # Two-tailed p-value
    p_value = 2 * (1 - stats.norm.cdf(abs(z)))

    # Confidence interval for difference
    se_diff = np.sqrt(p_a*(1-p_a)/trials_a + p_b*(1-p_b)/trials_b)
    ci_lower = (p_a - p_b) - 1.96 * se_diff
    ci_upper = (p_a - p_b) + 1.96 * se_diff

    return {
        'p_a': p_a,
        'p_b': p_b,
        'difference': p_a - p_b,
        'z_statistic': z,
        'p_value': p_value,
        'significant': p_value < alpha,
        'ci_lower': ci_lower,
        'ci_upper': ci_upper
    }

# Example: A/B test for email campaign
# A: Baseline model
# B: New model

np.random.seed(42)

# Simulate data
trials_a = 10000  # Users shown baseline
trials_b = 10000  # Users shown new model

# True conversion rates
true_rate_a = 0.10  # 10% conversion
true_rate_b = 0.12  # 12% conversion (20% relative improvement!)

# Simulate conversions
conversions_a = np.random.binomial(trials_a, true_rate_a)
conversions_b = np.random.binomial(trials_b, true_rate_b)

# Run A/B test
results = ab_test_proportions(conversions_a, trials_a, conversions_b, trials_b)

print("A/B Test Results:\\n")
print(f"Baseline (A): {results['p_a']:.2%} conversion")
print(f"New Model (B): {results['p_b']:.2%} conversion")
print(f"Difference: {results['difference']:.2%} ({results['difference']/results['p_a']*100:.1f}% relative)")
print(f"\\nZ-statistic: {results['z_statistic']:.3f}")
print(f"P-value: {results['p_value']:.4f}")
print(f"95% CI for difference: [{results['ci_lower']:.2%}, {results['ci_upper']:.2%}]")
print(f"\\nStatistically significant (α=0.05): {results['significant']}")

if results['significant']:
    print(f"✓ We can conclude the new model is better!")
else:
    print(f"✗ Not enough evidence to conclude difference")

# Simulate with smaller sample size (underpowered test)
print(f"\\n=== Effect of Sample Size ===")
for n in [100, 500, 1000, 5000, 10000]:
    conv_a = int(n * true_rate_a)
    conv_b = int(n * true_rate_b)

    res = ab_test_proportions(conv_a, n, conv_b, n)
    print(f"n={n:5d}: p-value={res['p_value']:.4f}, significant={res['significant']}")

print("\\nKey insight: Larger samples → more power → easier to detect small effects!")

# Real A/B testing considerations:
# 1. Pre-specify sample size (power analysis)
# 2. Account for multiple comparisons
# 3. Check assumptions (e.g., independence)
# 4. Consider practical significance, not just statistical`
        },
        {
          title: 'T-Test: Compare Model Performance Across Folds',
          description: 'Paired t-test for cross-validation comparison',
          code: `import numpy as np
from scipy import stats

def paired_t_test(scores_a, scores_b, alpha=0.05):
    """
    Paired t-test for comparing two models on same folds

    H₀: mean_a = mean_b
    H₁: mean_a ≠ mean_b

    Use paired test because scores come from same folds (dependent)
    """
    # Differences
    differences = np.array(scores_a) - np.array(scores_b)

    # T-statistic
    t_stat, p_value = stats.ttest_rel(scores_a, scores_b)

    # Confidence interval for mean difference
    mean_diff = np.mean(differences)
    se_diff = np.std(differences, ddof=1) / np.sqrt(len(differences))
    df = len(differences) - 1
    t_critical = stats.t.ppf(0.975, df)  # 95% CI

    ci_lower = mean_diff - t_critical * se_diff
    ci_upper = mean_diff + t_critical * se_diff

    return {
        'mean_a': np.mean(scores_a),
        'mean_b': np.mean(scores_b),
        'mean_diff': mean_diff,
        't_statistic': t_stat,
        'p_value': p_value,
        'significant': p_value < alpha,
        'ci_lower': ci_lower,
        'ci_upper': ci_upper,
        'effect_size': mean_diff / np.std(differences, ddof=1)  # Cohen's d
    }

# Example: Compare two models using 10-fold cross-validation
np.random.seed(42)
num_folds = 10

# Simulate cross-validation scores
# Model A: mean 0.85, std 0.02
# Model B: mean 0.87, std 0.02 (better!)

scores_a = np.random.normal(0.85, 0.02, num_folds)
scores_b = np.random.normal(0.87, 0.02, num_folds)

# Run paired t-test
results = paired_t_test(scores_a, scores_b)

print("Model Comparison via Paired T-Test:\\n")
print(f"Model A: {results['mean_a']:.4f} (mean)")
print(f"Model B: {results['mean_b']:.4f} (mean)")
print(f"Difference: {results['mean_diff']:.4f}")
print(f"\\nT-statistic: {results['t_statistic']:.3f}")
print(f"P-value: {results['p_value']:.4f}")
print(f"Effect size (Cohen's d): {results['effect_size']:.3f}")
print(f"95% CI for difference: [{results['ci_lower']:.4f}, {results['ci_upper']:.4f}]")
print(f"\\nStatistically significant (α=0.05): {results['significant']}")

if results['significant']:
    print(f"✓ Model B is significantly better!")
    if results['effect_size'] > 0.8:
        print(f"  Large effect size (d > 0.8)")
    elif results['effect_size'] > 0.5:
        print(f"  Medium effect size (0.5 < d < 0.8)")
    else:
        print(f"  Small effect size (d < 0.5)")
else:
    print(f"✗ No significant difference detected")

# Visualize fold-by-fold comparison
print(f"\\n=== Fold-by-Fold Scores ===")
print(f"{'Fold':<8} {'Model A':<12} {'Model B':<12} {'Difference'}")
print("-" * 50)
for i in range(num_folds):
    diff = scores_b[i] - scores_a[i]
    winner = "→ B" if diff > 0 else "→ A"
    print(f"{i+1:<8} {scores_a[i]:.4f}       {scores_b[i]:.4f}       {diff:+.4f} {winner}")

# Why paired t-test?
# - Accounts for correlation between folds
# - More powerful than independent t-test
# - Correct for CV comparison

# Real ML:
# - sklearn: cross_val_score + paired t-test
# - Papers: Report mean ± std + p-value from t-test
# - Be careful of assumptions (normality, independence across runs)`
        }
      ],
      keyPoints: [
        'Hypothesis test: decide whether to reject H₀ based on data',
        'P-value: probability of data at least this extreme, assuming H₀ true',
        'p < α: reject H₀ (statistically significant, typically α=0.05)',
        'Type I error: false positive (reject true H₀), rate = α',
        'Type II error: false negative (fail to reject false H₀), rate = β',
        'Statistical significance ≠ practical significance (report effect sizes!)',
        'Multiple comparisons: use Bonferroni correction or FDR control',
        'A/B testing: two-proportion z-test for comparing conversion rates',
        'Cross-validation comparison: use paired t-test (accounts for correlation)'
      ]
    },
    {
      id: 'bias-variance-tradeoff',
      title: '3. Bias-Variance Tradeoff and Model Selection',
      content: `## The Fundamental Tradeoff in Machine Learning

**Expected prediction error can be decomposed:**

\`\`\`
E[(y - ŷ)²] = Bias² + Variance + Irreducible Error

Bias: error from wrong assumptions (underfitting)
Variance: error from sensitivity to training data (overfitting)
Irreducible error: inherent noise in data
\`\`\`

### Bias

**Bias:** Difference between expected prediction and true value

\`\`\`
Bias = E[ŷ] - y_true
\`\`\`

**High bias (underfitting):**
- Model too simple
- Strong assumptions that don't match data
- Poor performance on both training and test sets

**Examples:**
- Linear regression for nonlinear data
- Shallow neural network for complex tasks
- Low-degree polynomial

### Variance

**Variance:** How much predictions vary with different training sets

\`\`\`
Variance = E[(ŷ - E[ŷ])²]
\`\`\`

**High variance (overfitting):**
- Model too complex
- Fits noise in training data
- Good training performance, poor test performance

**Examples:**
- Deep neural network on small dataset
- High-degree polynomial
- Decision tree without pruning

### The Tradeoff

**As model complexity increases:**
- Bias decreases ↓ (more flexible, fits data better)
- Variance increases ↑ (more sensitive to training data)

**Optimal complexity:** Minimize total error = Bias² + Variance

### Techniques to Reduce Variance (Combat Overfitting)

**1. Regularization**

Add penalty to loss function:
\`\`\`
Loss = MSE + λ · ||w||²  (L2 regularization)
\`\`\`

Shrinks weights → reduces model complexity

**2. Early Stopping**

Stop training before model memorizes training data

Monitor validation loss, stop when it starts increasing

**3. Dropout**

Randomly drop neurons during training

Prevents co-adaptation → acts as ensemble

**4. Data Augmentation**

Create variations of training data

More data → less variance

**5. Ensemble Methods**

Average predictions from multiple models

\`\`\`
ŷ_ensemble = (1/M) Σ ŷᵢ
\`\`\`

Variance reduced by factor of M (if models independent!)

### Techniques to Reduce Bias (Combat Underfitting)

**1. Increase Model Complexity**

More layers, more neurons, higher degree polynomial

**2. Feature Engineering**

Add relevant features (interactions, polynomials, domain knowledge)

**3. Reduce Regularization**

Lower λ → allow model more flexibility

**4. Train Longer**

More epochs → better fit to training data

### Cross-Validation for Model Selection

**Goal:** Estimate test error to choose best model

**K-Fold Cross-Validation:**

1. Split data into K folds
2. For each fold i:
   - Train on K-1 folds
   - Test on fold i
3. Average test errors

**Benefits:**
- Uses all data for both training and testing
- Reduces variance in error estimate
- Standard: K=5 or K=10

**Stratified K-Fold:** Preserve class distribution in each fold (for classification)`,
      examples: [
        {
          title: 'Bias-Variance Decomposition: Empirical Demonstration',
          description: 'Visualize bias-variance tradeoff',
          code: `import numpy as np

def generate_data(n_samples, noise_std=0.5):
    """Generate data from true function: y = sin(2πx) + noise"""
    X = np.random.rand(n_samples)
    y_true = np.sin(2 * np.pi * X)
    y = y_true + np.random.normal(0, noise_std, n_samples)
    return X, y, y_true

def polynomial_features(X, degree):
    """Create polynomial features [1, x, x², ..., x^degree]"""
    return np.vstack([X**i for i in range(degree + 1)]).T

def fit_polynomial(X, y, degree):
    """Fit polynomial of given degree"""
    X_poly = polynomial_features(X, degree)
    # Closed-form solution: w = (X^T X)^(-1) X^T y
    w = np.linalg.lstsq(X_poly, y, rcond=None)[0]
    return w

def predict_polynomial(X, w):
    """Predict using polynomial weights"""
    degree = len(w) - 1
    X_poly = polynomial_features(X, degree)
    return X_poly @ w

def bias_variance_analysis(degrees, num_experiments=100, n_train=30):
    """
    Empirical bias-variance decomposition

    For each degree:
        1. Generate many training sets
        2. Train model on each
        3. Compute predictions on test points
        4. Decompose error into bias² + variance
    """
    # Test points (fixed)
    X_test = np.linspace(0, 1, 100)
    y_test_true = np.sin(2 * np.pi * X_test)

    results = {}

    for degree in degrees:
        predictions = []  # Store predictions from all experiments

        for _ in range(num_experiments):
            # Generate training data
            X_train, y_train, _ = generate_data(n_train)

            # Fit polynomial
            w = fit_polynomial(X_train, y_train, degree)

            # Predict on test points
            y_pred = predict_polynomial(X_test, w)
            predictions.append(y_pred)

        predictions = np.array(predictions)  # Shape: (num_experiments, n_test)

        # Expected prediction: E[ŷ]
        expected_pred = predictions.mean(axis=0)

        # Bias²: (E[ŷ] - y_true)²
        bias_squared = ((expected_pred - y_test_true) ** 2).mean()

        # Variance: E[(ŷ - E[ŷ])²]
        variance = ((predictions - expected_pred) ** 2).mean()

        # Total error: Bias² + Variance
        total_error = bias_squared + variance

        results[degree] = {
            'bias_squared': bias_squared,
            'variance': variance,
            'total_error': total_error
        }

    return results

# Run bias-variance analysis
print("Bias-Variance Decomposition for Polynomial Regression\\n")
print("True function: y = sin(2πx)\\n")

degrees = [1, 3, 5, 10, 15]
results = bias_variance_analysis(degrees)

print(f"{'Degree':<10} {'Bias²':<15} {'Variance':<15} {'Total Error':<15}")
print("-" * 60)

for degree in degrees:
    r = results[degree]
    print(f"{degree:<10} {r['bias_squared']:<15.4f} {r['variance']:<15.4f} {r['total_error']:<15.4f}")

print(f"\\n=== Key Observations ===")
print(f"Low degree (1-3): HIGH bias, LOW variance → underfitting")
print(f"Medium degree (5): BALANCED bias and variance → sweet spot!")
print(f"High degree (10-15): LOW bias, HIGH variance → overfitting")

# Best model
best_degree = min(results, key=lambda d: results[d]['total_error'])
print(f"\\nBest polynomial degree: {best_degree}")
print(f"  Minimizes total error = Bias² + Variance")

# Real ML:
# - Neural networks: depth/width controls complexity
# - Decision trees: max_depth controls complexity
# - SVMs: kernel complexity (linear → polynomial → RBF)
# - Always use validation set or CV to find optimal complexity!`
        },
        {
          title: 'Cross-Validation for Model Selection',
          description: 'Use CV to choose hyperparameters',
          code: `import numpy as np

def k_fold_cross_validation(X, y, model_fn, k=5):
    """
    K-fold cross-validation

    Args:
        X, y: data
        model_fn: function that takes (X_train, y_train, X_test) and returns predictions
        k: number of folds

    Returns:
        Mean and std of test errors across folds
    """
    n = len(X)
    fold_size = n // k
    errors = []

    for fold in range(k):
        # Create train/test split
        test_start = fold * fold_size
        test_end = test_start + fold_size

        test_idx = list(range(test_start, test_end))
        train_idx = list(range(0, test_start)) + list(range(test_end, n))

        X_train, y_train = X[train_idx], y[train_idx]
        X_test, y_test = X[test_idx], y[test_idx]

        # Train and predict
        y_pred = model_fn(X_train, y_train, X_test)

        # Compute error
        mse = np.mean((y_test - y_pred) ** 2)
        errors.append(mse)

    return np.mean(errors), np.std(errors)

# Example: Choose polynomial degree using CV
np.random.seed(42)
X, y, _ = generate_data(n_samples=200)

def polynomial_model(X_train, y_train, X_test, degree):
    """Polynomial regression model for CV"""
    w = fit_polynomial(X_train, y_train, degree)
    return predict_polynomial(X_test, w)

print("Cross-Validation for Polynomial Degree Selection\\n")
print(f"{'Degree':<10} {'Mean CV Error':<20} {'Std CV Error':<15}")
print("-" * 50)

cv_results = {}
for degree in [1, 2, 3, 4, 5, 6, 8, 10, 12, 15]:
    # Define model function for this degree
    model_fn = lambda X_tr, y_tr, X_te: polynomial_model(X_tr, y_tr, X_te, degree)

    # Run 5-fold CV
    mean_error, std_error = k_fold_cross_validation(X, y, model_fn, k=5)
    cv_results[degree] = (mean_error, std_error)

    print(f"{degree:<10} {mean_error:<20.4f} {std_error:<15.4f}")

# Best degree (lowest CV error)
best_degree = min(cv_results, key=lambda d: cv_results[d][0])
best_error, best_std = cv_results[best_degree]

print(f"\\nBest model: Polynomial degree {best_degree}")
print(f"  CV Error: {best_error:.4f} ± {best_std:.4f}")

print(f"\\n=== Why Cross-Validation Works ===")
print(f"1. Uses all data (no waste)")
print(f"2. Averages over multiple train/test splits (reduces variance)")
print(f"3. Simulates performance on unseen data")
print(f"4. Standard practice in ML!")

# Real implementations:
# sklearn: cross_val_score, GridSearchCV, RandomizedSearchCV
# Papers: Report CV error for model selection
# Production: Train final model on ALL data after CV selection`
        }
      ],
      keyPoints: [
        'Error = Bias² + Variance + Irreducible Error',
        'Bias: error from wrong assumptions (underfitting)',
        'Variance: sensitivity to training data (overfitting)',
        'As complexity increases: bias ↓, variance ↑',
        'Regularization reduces variance (combats overfitting)',
        'More data, ensembles reduce variance',
        'More complex models reduce bias (but increase variance)',
        'Cross-validation: estimate test error for model selection',
        'K-fold CV: train on K-1 folds, test on 1, repeat K times'
      ]
    },
    {
      id: 'bayesian-inference',
      title: '4. Bayesian Inference: Incorporating Prior Knowledge',
      content: `## Bayesian vs Frequentist Inference

**Frequentist view:**
- Parameters are fixed (unknown) constants
- Probability = long-run frequency
- MLE: θ* = argmax P(data | θ)

**Bayesian view:**
- Parameters are random variables with distributions
- Probability = degree of belief
- Use Bayes' theorem to update beliefs

### Bayes' Theorem

\`\`\`
P(θ | data) = P(data | θ) · P(θ) / P(data)

Posterior = Likelihood × Prior / Evidence
\`\`\`

**Prior P(θ):** Belief before seeing data

**Likelihood P(data | θ):** How well θ explains data

**Posterior P(θ | data):** Updated belief after seeing data

### Maximum A Posteriori (MAP) Estimation

**MAP:** Find θ that maximizes posterior

\`\`\`
θ_MAP = argmax P(θ | data)
         θ
      = argmax P(data | θ) · P(θ)
         θ
      = argmax [log P(data | θ) + log P(θ)]
         θ
\`\`\`

**Connection to Regularization:**

MAP with Gaussian prior = L2 regularization!

\`\`\`
Prior: θ ~ N(0, σ²)
⇒ log P(θ) = -||θ||² / (2σ²) + const
⇒ MAP = MLE + L2 penalty!
\`\`\`

**Regularization IS Bayesian inference!**

### Bayesian Inference in Machine Learning

**1. Regularization as Prior**

**L2 (Ridge):** Gaussian prior on weights
\`\`\`
P(w) = N(0, σ²I)
\`\`\`

**L1 (Lasso):** Laplace prior on weights
\`\`\`
P(w) = Laplace(0, b)
\`\`\`

**2. Bayesian Neural Networks**

Instead of point estimate w*, learn distribution P(w | data)

**Prediction:**
\`\`\`
P(y | x, data) = ∫ P(y | x, w) P(w | data) dw
\`\`\`

Average over all possible weights, weighted by posterior

**Benefits:**
- Uncertainty quantification
- Robustness to overfitting
- Principled way to incorporate prior knowledge

**3. Bayesian Optimization**

Hyperparameter tuning using Gaussian Processes

**Idea:** Build probabilistic model of objective function, use it to guide search

**Much more sample-efficient than random/grid search!**

### Conjugate Priors

**Conjugate prior:** Posterior has same form as prior

**Examples:**
- Beta prior + Binomial likelihood → Beta posterior
- Gaussian prior + Gaussian likelihood → Gaussian posterior
- Dirichlet prior + Multinomial likelihood → Dirichlet posterior

**Why useful:** Analytical updates (no numerical integration)

### Bayesian Updating: Sequential Learning

**Start with prior:** P(θ)

**See data:** x₁
**Update:** P(θ | x₁) ∝ P(x₁ | θ) · P(θ)

**See more data:** x₂
**Update:** P(θ | x₁, x₂) ∝ P(x₂ | θ) · P(θ | x₁)

**Posterior becomes new prior for next update!**

This is **online learning** or **incremental learning**`,
      examples: [
        {
          title: 'Bayesian Coin Flip: Beta-Binomial Model',
          description: 'Learn probability of heads using Bayesian updating',
          code: `import numpy as np
from scipy import stats

class BayesianCoinFlip:
    """
    Bayesian inference for coin flip probability

    Model: p ~ Beta(α, β) (prior)
           x | p ~ Bernoulli(p) (likelihood)
           p | data ~ Beta(α', β') (posterior)

    Conjugacy: Beta prior + Binomial likelihood → Beta posterior
    """

    def __init__(self, alpha=1, beta=1):
        """
        Initialize with Beta(α, β) prior

        α = β = 1: Uniform prior (no prior knowledge)
        α > β: Biased toward heads
        α < β: Biased toward tails
        """
        self.alpha = alpha
        self.beta = beta

    def update(self, num_heads, num_tails):
        """
        Bayesian update after observing data

        Posterior: Beta(α + num_heads, β + num_tails)
        """
        self.alpha += num_heads
        self.beta += num_tails

    def mean(self):
        """Posterior mean (expected value)"""
        return self.alpha / (self.alpha + self.beta)

    def mode(self):
        """Posterior mode (MAP estimate)"""
        if self.alpha > 1 and self.beta > 1:
            return (self.alpha - 1) / (self.alpha + self.beta - 2)
        return self.mean()

    def credible_interval(self, confidence=0.95):
        """
        Bayesian confidence interval (credible interval)

        Interpretation: "95% probability true p is in this interval"
        (Different from frequentist CI!)
        """
        alpha_level = (1 - confidence) / 2
        lower = stats.beta.ppf(alpha_level, self.alpha, self.beta)
        upper = stats.beta.ppf(1 - alpha_level, self.alpha, self.beta)
        return lower, upper

    def sample(self, num_samples=1000):
        """Sample from posterior distribution"""
        return stats.beta.rvs(self.alpha, self.beta, size=num_samples)

# Example: Learn coin bias from observations
np.random.seed(42)

# True coin: 70% heads (biased)
true_p = 0.7

# Start with uniform prior (no prior knowledge)
model = BayesianCoinFlip(alpha=1, beta=1)

print("Bayesian Coin Flip Learning\\n")
print("True probability of heads: 70%\\n")
print(f"{'Flips':<10} {'Posterior Mean':<20} {'95% Credible Interval'}")
print("-" * 60)

# Initial belief
ci_lower, ci_upper = model.credible_interval()
print(f"{0:<10} {model.mean():.3f}              [{ci_lower:.3f}, {ci_upper:.3f}]")

# Observe data sequentially
for num_flips in [10, 50, 100, 500, 1000]:
    # Simulate flips
    flips = np.random.rand(num_flips) < true_p
    num_heads = flips.sum()
    num_tails = num_flips - num_heads

    # Bayesian update
    model.update(num_heads, num_tails)

    # Posterior statistics
    ci_lower, ci_upper = model.credible_interval()
    print(f"{num_flips:<10} {model.mean():.3f}              [{ci_lower:.3f}, {ci_upper:.3f}]")

print(f"\\nFinal estimate: {model.mean():.3f}")
print(f"True value: {true_p:.3f}")
print(f"Error: {abs(model.mean() - true_p):.3f}")

print(f"\\n=== Key Insights ===")
print(f"1. Start uncertain (wide credible interval)")
print(f"2. More data → narrower interval → more certain")
print(f"3. Posterior mean converges to true probability")
print(f"4. Credible interval: Bayesian confidence (probability statement!)")

# Compare to frequentist MLE
mle_estimate = model.alpha / (model.alpha + model.beta)  # Same as mean for Beta
print(f"\\nFrequentist MLE would give same point estimate: {mle_estimate:.3f}")
print(f"But Bayesian approach provides full posterior distribution!")

# Sample from posterior (for decision making)
samples = model.sample(10000)
print(f"\\nPosterior samples: mean={samples.mean():.3f}, std={samples.std():.3f}")
print(f"P(p > 0.65) = {(samples > 0.65).mean():.3f}")  # Probability query!`
        },
        {
          title: 'MAP Estimation = Regularization',
          description: 'Connection between Bayesian inference and regularization',
          code: `import numpy as np

def mle_regression(X, y):
    """
    Maximum Likelihood Estimation (no regularization)

    Maximize: P(y | X, w) = ∏ N(y_i | w^T x_i, σ²)
    Equivalent to: minimize MSE
    """
    # Closed-form: w = (X^T X)^(-1) X^T y
    w_mle = np.linalg.lstsq(X, y, rcond=None)[0]
    return w_mle

def map_regression(X, y, lambda_reg):
    """
    Maximum A Posteriori (MAP) with Gaussian prior

    Prior: w ~ N(0, σ_prior²)
    Posterior: P(w | X, y) ∝ P(y | X, w) · P(w)

    MAP = argmax [log P(y | X, w) + log P(w)]
         w
       = argmax [log likelihood - λ||w||²]
         w

    This is L2 regularization!
    """
    n, d = X.shape

    # MAP with Gaussian prior = Ridge regression
    # w = (X^T X + λI)^(-1) X^T y
    w_map = np.linalg.lstsq(
        X.T @ X + lambda_reg * np.eye(d),
        X.T @ y,
        rcond=None
    )[0]

    return w_map

# Generate data with noise
np.random.seed(42)
n_samples = 50
n_features = 20  # More features than samples! (ill-posed problem)

X = np.random.randn(n_samples, n_features)
true_w = np.random.randn(n_features) * 0.5
y = X @ true_w + np.random.randn(n_samples) * 0.2

print("Regularization as Bayesian Prior\\n")
print(f"Data: {n_samples} samples, {n_features} features")
print(f"Problem: MORE features than samples! (ill-posed)\\n")

# Compare MLE vs MAP
print(f"{'Method':<20} {'||w||²':<15} {'Train MSE':<15} {'Test Error (approx)'}")
print("-" * 70)

# MLE (no regularization)
try:
    w_mle = mle_regression(X, y)
    norm_mle = np.linalg.norm(w_mle) ** 2
    train_mse_mle = np.mean((y - X @ w_mle) ** 2)
    print(f"{'MLE (no prior)':<20} {norm_mle:<15.2f} {train_mse_mle:<15.4f} {'High (overfits)'}")
except:
    print(f"{'MLE (no prior)':<20} {'Failed!':<15} {'N/A':<15} {'Singular matrix'}")

# MAP with different priors (λ values)
for lambda_reg in [0.01, 0.1, 1.0, 10.0]:
    w_map = map_regression(X, y, lambda_reg)

    norm_map = np.linalg.norm(w_map) ** 2
    train_mse_map = np.mean((y - X @ w_map) ** 2)

    # Stronger prior → smaller weights
    strength = ""
    if lambda_reg < 0.1:
        strength = "(weak prior)"
    elif lambda_reg < 1:
        strength = "(moderate prior)"
    else:
        strength = "(strong prior)"

    print(f"{'MAP λ=' + str(lambda_reg):<20} {norm_map:<15.2f} {train_mse_map:<15.4f} {strength}")

print(f"\\n=== Bayesian Interpretation ===")
print(f"λ controls strength of Gaussian prior P(w) = N(0, σ²)")
print(f"  - λ = 0: No prior (MLE, overfits)")
print(f"  - λ small: Weak prior (mild regularization)")
print(f"  - λ large: Strong prior (heavy regularization)")
print(f"\\nMAP = MLE + Prior = Likelihood + Regularization")

print(f"\\n=== Real ML ===")
print(f"- Ridge (L2): Gaussian prior → w ~ N(0, σ²)")
print(f"- Lasso (L1): Laplace prior → w ~ Laplace(0, b)")
print(f"- Elastic Net: Mix of Gaussian + Laplace")
print(f"- Dropout: Implicit prior encouraging sparsity")
print(f"\\nRegularization IS Bayesian inference in disguise!")

# This is why sklearn has 'alpha' parameter (λ in our notation)
# from sklearn.linear_model import Ridge
# model = Ridge(alpha=1.0)  # This is MAP with Gaussian prior!`
        }
      ],
      keyPoints: [
        'Bayesian: parameters are random variables with distributions',
        'Bayes theorem: P(θ | data) ∝ P(data | θ) · P(θ)',
        'Prior P(θ): belief before data, Posterior P(θ | data): after data',
        'MAP = maximize posterior = MLE + prior',
        'L2 regularization = MAP with Gaussian prior!',
        'L1 regularization = MAP with Laplace prior!',
        'Bayesian neural networks: learn P(w | data) instead of point w*',
        'Benefits: uncertainty quantification, principled priors, sequential updates',
        'Conjugate priors enable analytical updates (Beta-Binomial, Gaussian-Gaussian)'
      ]
    }
  ],
  summary: [
    'Statistical inference: draw conclusions about population from sample',
    'Confidence intervals quantify uncertainty in estimates',
    'Hypothesis testing: decide whether to reject H₀ based on p-value',
    'p-value: probability of data at least this extreme, assuming H₀ true',
    'Bias-variance tradeoff: Error = Bias² + Variance + Irreducible Error',
    'Cross-validation for model selection (K-fold CV standard)',
    'Bayesian inference: update beliefs using Bayes theorem',
    'Regularization = MAP estimation with Gaussian/Laplace prior',
    'Always report confidence intervals and effect sizes, not just p-values!'
  ],
  nextSteps: [
    'Implement bootstrap for confidence intervals',
    'Run A/B tests on ML models',
    'Use cross-validation for hyperparameter tuning',
    'Experiment with different regularization strengths (MAP priors)',
    'Study Bayesian neural networks and uncertainty quantification',
    'Learn about calibration and proper scoring rules',
    'Explore experimental design and sample size calculations',
    'Move on to code challenges: build Bayesian networks and probabilistic reasoners'
  ],
  checkYourUnderstanding: [
    {
      question: 'What is a confidence interval and how do you interpret it?',
      answer: 'A confidence interval is a range [L, U] that likely contains the true parameter. 95% CI interpretation: "If we repeated this experiment many times, 95% of intervals would contain the true parameter." NOT "95% probability parameter is in this interval" (frequentist vs Bayesian).'
    },
    {
      question: 'What does a p-value of 0.03 mean?',
      answer: 'If the null hypothesis H₀ were true, we would see data at least this extreme with probability 0.03. It does NOT mean "3% chance H₀ is true" or "3% chance results are due to chance." p < 0.05 is conventional threshold for statistical significance.'
    },
    {
      question: 'What is the bias-variance tradeoff?',
      answer: 'Expected error decomposes: E[(y-ŷ)²] = Bias² + Variance + Noise. Bias: error from wrong assumptions (underfitting). Variance: sensitivity to training data (overfitting). As model complexity increases: bias ↓, variance ↑. Optimal complexity minimizes total error.'
    },
    {
      question: 'Why use cross-validation instead of a single train/test split?',
      answer: 'CV uses all data for both training and testing (no waste), averages over multiple splits (reduces variance in error estimate), and better simulates performance on unseen data. K-fold CV is standard (K=5 or 10). Essential for model selection and hyperparameter tuning.'
    },
    {
      question: 'How is regularization related to Bayesian inference?',
      answer: 'Regularization IS Bayesian inference! L2 (Ridge) = MAP with Gaussian prior P(w) ~ N(0, σ²). L1 (Lasso) = MAP with Laplace prior. The regularization strength λ controls prior strength. MAP = argmax [log P(data|w) + log P(w)] = MLE + prior penalty.'
    },
    {
      question: 'What is the difference between statistical and practical significance?',
      answer: 'Statistical significance: p < 0.05 (reject H₀, evidence of effect). Practical significance: effect is large enough to matter in practice. Small effects can be statistically significant with large samples. Always report effect sizes and confidence intervals, not just p-values!'
    }
  ]
};