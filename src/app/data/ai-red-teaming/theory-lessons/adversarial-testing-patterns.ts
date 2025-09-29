import { TheoryLesson } from '../../types';

export const adversarialTestingPatternsLesson: TheoryLesson = {
  id: 'adversarial-testing-patterns',
  title: 'Adversarial Testing Patterns: Breaking AI Systems Systematically',
  description: 'Learn systematic approaches to finding weaknesses in AI systems through deliberate manipulation and exploitation',
  estimatedTime: 50,
  difficulty: 'advanced',
  xpReward: 200,
  content: {
    introduction: `Adversarial testing patterns are systematic approaches to finding weaknesses in AI systems through deliberate manipulation and exploitation. This lesson covers advanced techniques for generating adversarial examples, poisoning training data, extracting model information, and testing system robustness.

Understanding these patterns is crucial for building secure AI systems. By thinking like an attacker, we can anticipate and defend against real-world threats. This comprehensive guide covers both theoretical foundations and practical implementations of adversarial testing methodologies.`,

    sections: [
      {
        title: 'Adversarial Examples: The Foundation of AI Attacks',
        content: `Adversarial examples are inputs deliberately crafted to cause misclassification or unexpected behavior in AI models. These attacks exploit the fact that neural networks can be highly sensitive to small, carefully chosen perturbations.

**Key Concepts:**
- Perturbation magnitude (ε-bounded attacks)
- Targeted vs untargeted attacks
- White-box vs black-box scenarios
- Transferability across models
- Perceptual similarity constraints

**Attack Taxonomy:**
1. **Gradient-Based Attacks** - Use model gradients to craft perturbations
2. **Optimization-Based Attacks** - Formulate as optimization problems
3. **Decision-Based Attacks** - Only use model predictions
4. **Score-Based Attacks** - Use confidence scores
5. **Query-Efficient Attacks** - Minimize API calls`,
        examples: [
          {
            code: `# Fast Gradient Sign Method (FGSM) Implementation
import torch
import torch.nn.functional as F

def fgsm_attack(model, images, labels, epsilon=0.3):
    """
    Generate adversarial examples using FGSM

    Args:
        model: Target neural network
        images: Original input images
        labels: True labels
        epsilon: Perturbation magnitude

    Returns:
        Adversarial examples
    """
    # Set requires_grad for input
    images.requires_grad = True

    # Forward pass
    outputs = model(images)
    loss = F.cross_entropy(outputs, labels)

    # Backward pass
    model.zero_grad()
    loss.backward()

    # Collect gradients
    data_grad = images.grad.data

    # Create perturbation
    sign_data_grad = data_grad.sign()
    perturbed_images = images + epsilon * sign_data_grad

    # Clamp to valid range
    perturbed_images = torch.clamp(perturbed_images, 0, 1)

    return perturbed_images

# Projected Gradient Descent (PGD) - Iterative variant
def pgd_attack(model, images, labels, epsilon=0.3, alpha=0.01, num_iter=40):
    """
    Generate adversarial examples using PGD

    Args:
        model: Target model
        images: Original inputs
        labels: True labels
        epsilon: Maximum perturbation
        alpha: Step size
        num_iter: Number of iterations
    """
    perturbed_images = images.clone().detach()

    for _ in range(num_iter):
        perturbed_images.requires_grad = True
        outputs = model(perturbed_images)
        loss = F.cross_entropy(outputs, labels)

        model.zero_grad()
        loss.backward()

        # Update with gradient sign
        adv_images = perturbed_images + alpha * perturbed_images.grad.sign()

        # Project back to epsilon ball
        eta = torch.clamp(adv_images - images, min=-epsilon, max=epsilon)
        perturbed_images = torch.clamp(images + eta, min=0, max=1).detach()

    return perturbed_images`,
            language: 'python',
            explanation: 'FGSM and PGD are fundamental gradient-based attacks. FGSM is fast but less effective, while PGD is stronger through iterative optimization.'
          },
          {
            code: `# C&W (Carlini & Wagner) Attack - Advanced optimization-based attack
import torch
import torch.nn as nn
import torch.optim as optim

class CWAttack:
    """
    Carlini & Wagner L2 attack implementation
    """
    def __init__(self, model, c=1, kappa=0, max_iter=1000, learning_rate=0.01):
        self.model = model
        self.c = c  # Trade-off constant
        self.kappa = kappa  # Confidence parameter
        self.max_iter = max_iter
        self.learning_rate = learning_rate

    def attack(self, images, target_labels):
        """
        Generate targeted adversarial examples
        """
        # Convert to tanh space
        images_tanh = self.to_tanh_space(images)
        delta = torch.zeros_like(images_tanh, requires_grad=True)

        optimizer = optim.Adam([delta], lr=self.learning_rate)

        for iteration in range(self.max_iter):
            # Convert back from tanh space
            adv_images = self.from_tanh_space(images_tanh + delta)

            # Get model outputs
            outputs = self.model(adv_images)

            # Calculate f(x) for C&W loss
            one_hot_labels = F.one_hot(target_labels, outputs.shape[1])
            real = (one_hot_labels * outputs).sum(dim=1)
            other = ((1 - one_hot_labels) * outputs).max(dim=1)[0]

            # C&W loss function
            loss_adv = torch.clamp(real - other + self.kappa, min=0)
            loss_dist = torch.norm(adv_images - images, p=2, dim=(1,2,3))
            loss = loss_dist + self.c * loss_adv

            # Optimize
            optimizer.zero_grad()
            loss.mean().backward()
            optimizer.step()

            # Check success
            if iteration % 100 == 0:
                with torch.no_grad():
                    pred = self.model(adv_images).argmax(dim=1)
                    success_rate = (pred == target_labels).float().mean()
                    print(f"Iteration {iteration}: Success rate = {success_rate:.2%}")

        return self.from_tanh_space(images_tanh + delta)

    @staticmethod
    def to_tanh_space(x):
        return torch.atanh(2 * x - 1)

    @staticmethod
    def from_tanh_space(x):
        return (torch.tanh(x) + 1) / 2`,
            language: 'python',
            explanation: 'C&W attack is a powerful optimization-based method that finds minimal perturbations while ensuring misclassification.'
          }
        ]
      },
      {
        title: 'Data Poisoning: Corrupting the Learning Process',
        content: `Data poisoning involves injecting malicious data into training sets to compromise model behavior. This can lead to backdoors, biased predictions, or degraded performance on specific inputs.

**Attack Strategies:**
1. **Label Flipping** - Change labels of training samples
2. **Feature Poisoning** - Modify input features
3. **Backdoor Attacks** - Insert triggers for malicious behavior
4. **Availability Attacks** - Degrade overall performance
5. **Targeted Poisoning** - Affect specific test samples

**Defense Considerations:**
- Data validation and sanitization
- Outlier detection in training data
- Certified defenses against poisoning
- Differential privacy in training
- Robust aggregation methods`,
        examples: [
          {
            code: `# Backdoor Attack Implementation
import numpy as np
from sklearn.model_selection import train_test_split

class BackdoorAttack:
    """
    Implements backdoor poisoning attack on training data
    """
    def __init__(self, trigger_pattern, target_label, poison_ratio=0.1):
        """
        Args:
            trigger_pattern: Pattern to insert as backdoor trigger
            target_label: Label to assign to poisoned samples
            poison_ratio: Fraction of training data to poison
        """
        self.trigger_pattern = trigger_pattern
        self.target_label = target_label
        self.poison_ratio = poison_ratio

    def poison_dataset(self, X_train, y_train):
        """
        Poison training dataset with backdoor

        Returns:
            X_poison, y_poison: Poisoned training data
            poison_indices: Indices of poisoned samples
        """
        n_samples = len(X_train)
        n_poison = int(n_samples * self.poison_ratio)

        # Select random samples to poison
        poison_indices = np.random.choice(n_samples, n_poison, replace=False)

        X_poison = X_train.copy()
        y_poison = y_train.copy()

        for idx in poison_indices:
            # Add trigger pattern
            X_poison[idx] = self.add_trigger(X_poison[idx])
            # Change label to target
            y_poison[idx] = self.target_label

        return X_poison, y_poison, poison_indices

    def add_trigger(self, image):
        """
        Add trigger pattern to image
        """
        triggered_image = image.copy()

        # Example: Add a small square pattern in corner
        trigger_size = self.trigger_pattern.shape[0]
        triggered_image[:trigger_size, :trigger_size] = self.trigger_pattern

        return triggered_image

    def create_triggered_test(self, X_test):
        """
        Create test samples with trigger for evaluation
        """
        X_triggered = np.array([self.add_trigger(x) for x in X_test])
        return X_triggered

# Gradient-based poisoning for specific target
class GradientPoisoning:
    """
    Crafts poisoned samples using gradient information
    """
    def __init__(self, model, target_model_params=None):
        self.model = model
        self.target_params = target_model_params

    def craft_poison(self, X_base, y_target, X_target, epsilon=0.1):
        """
        Craft poisoned sample to cause misclassification of target

        Args:
            X_base: Base sample to poison
            y_target: Desired label for X_target
            X_target: Target sample to misclassify
            epsilon: Poisoning budget
        """
        import torch
        import torch.nn.functional as F

        X_poison = torch.tensor(X_base, requires_grad=True)

        # Compute gradient of loss w.r.t poison sample
        for _ in range(100):  # Optimization iterations
            # Simulate training with poisoned sample
            outputs_target = self.model(X_target)
            loss = F.cross_entropy(outputs_target, y_target)

            # Gradient w.r.t poison sample
            loss.backward()

            # Update poison sample
            with torch.no_grad():
                X_poison -= 0.01 * X_poison.grad
                X_poison = torch.clamp(X_poison,
                                      X_base - epsilon,
                                      X_base + epsilon)

            X_poison.grad.zero_()

        return X_poison.detach().numpy()`,
            language: 'python',
            explanation: 'Data poisoning attacks can insert backdoors or degrade model performance by corrupting training data.'
          }
        ]
      },
      {
        title: 'Model Extraction and Inversion Attacks',
        content: `Model extraction attacks attempt to steal or recreate a target model through API queries, while model inversion attacks try to recover training data from model outputs.

**Extraction Techniques:**
1. **Query Synthesis** - Generate queries to maximize information gain
2. **Active Learning** - Iteratively query most informative points
3. **Model Distillation** - Train surrogate model on API outputs
4. **Equation Solving** - Recover exact parameters for simple models
5. **Side-Channel Attacks** - Use timing, power, or cache information

**Inversion Methods:**
- Optimization-based reconstruction
- Generative model inversion
- Membership inference attacks
- Property inference attacks
- Training data extraction`,
        examples: [
          {
            code: `# Model Extraction Attack
import numpy as np
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score

class ModelExtractionAttack:
    """
    Extracts/steals a black-box model through queries
    """
    def __init__(self, target_model_api, budget=10000):
        """
        Args:
            target_model_api: Function that returns predictions
            budget: Query budget
        """
        self.target_api = target_model_api
        self.budget = budget
        self.query_count = 0

    def extract_model(self, input_shape, n_classes):
        """
        Extract model by querying and training surrogate
        """
        # Generate synthetic queries
        X_queries = self.generate_queries(input_shape)

        # Get labels from target model
        y_labels = self.query_target(X_queries)

        # Train surrogate model
        surrogate = MLPClassifier(hidden_layer_sizes=(100, 50),
                                  max_iter=500)
        surrogate.fit(X_queries, y_labels)

        return surrogate, X_queries, y_labels

    def generate_queries(self, input_shape):
        """
        Generate synthetic queries for extraction
        """
        n_queries = min(self.budget, 10000)

        # Strategy 1: Random sampling
        X_random = np.random.randn(n_queries // 3, *input_shape)

        # Strategy 2: Boundary exploration
        X_boundary = self.generate_boundary_samples(n_queries // 3, input_shape)

        # Strategy 3: Jacobian-based sampling (if gradients available)
        X_jacobian = self.jacobian_augmentation(n_queries // 3, input_shape)

        return np.vstack([X_random, X_boundary, X_jacobian])

    def generate_boundary_samples(self, n_samples, input_shape):
        """
        Generate samples near decision boundaries
        """
        # Start with random samples
        X = np.random.randn(n_samples, *input_shape)

        for i in range(n_samples):
            # Binary search to find boundary
            x = X[i]
            step = 1.0

            for _ in range(10):  # Refinement iterations
                pred = self.target_api(x.reshape(1, -1))
                x_perturb = x + step * np.random.randn(*input_shape)
                pred_perturb = self.target_api(x_perturb.reshape(1, -1))

                if pred != pred_perturb:
                    # Found boundary, refine
                    X[i] = (x + x_perturb) / 2
                    step *= 0.5

                self.query_count += 2
                if self.query_count >= self.budget:
                    break

        return X

    def jacobian_augmentation(self, n_samples, input_shape):
        """
        Use Jacobian-based augmentation for diverse queries
        """
        # Implementation depends on gradient availability
        # Fallback to random if not available
        return np.random.randn(n_samples, *input_shape)

    def query_target(self, X):
        """
        Query target model for labels
        """
        y = []
        for x in X:
            if self.query_count < self.budget:
                y.append(self.target_api(x.reshape(1, -1)))
                self.query_count += 1
            else:
                break
        return np.array(y)

# Model Inversion Attack
class ModelInversionAttack:
    """
    Recovers training data from model outputs
    """
    def __init__(self, model, n_classes):
        self.model = model
        self.n_classes = n_classes

    def invert_class(self, target_class, input_shape, iterations=1000):
        """
        Recover representative sample of target class
        """
        import torch
        import torch.nn.functional as F

        # Initialize with random noise
        x = torch.randn(1, *input_shape, requires_grad=True)

        optimizer = torch.optim.Adam([x], lr=0.1)

        for _ in range(iterations):
            # Forward pass
            outputs = self.model(x)

            # Maximize confidence for target class
            loss = -F.log_softmax(outputs, dim=1)[0, target_class]

            # Add regularization for realistic samples
            loss += 0.01 * torch.norm(x)

            # Optimize
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            # Clip to valid range
            x.data = torch.clamp(x.data, 0, 1)

        return x.detach()`,
            language: 'python',
            explanation: 'Model extraction steals functionality through queries, while inversion attacks recover training data from model behavior.'
          }
        ]
      },
      {
        title: 'Black-Box Testing Strategies',
        content: `Black-box testing evaluates AI systems without access to internal architecture or weights, using only inputs and outputs to discover vulnerabilities. This reflects real-world attack scenarios where attackers have limited information.

**Testing Approaches:**
1. **Differential Testing** - Compare outputs across similar inputs
2. **Metamorphic Testing** - Verify expected input-output relationships
3. **Fuzzing** - Generate random/malformed inputs
4. **Adaptive Testing** - Learn from previous queries
5. **Transfer Attacks** - Use surrogate models

**Optimization Strategies:**
- Query-efficient algorithms
- Bayesian optimization
- Evolutionary algorithms
- Gradient estimation
- Zeroth-order optimization`,
        examples: [
          {
            code: `# Black-Box Adversarial Attack using Boundary Attack
import numpy as np

class BoundaryAttack:
    """
    Decision-based black-box attack (only uses predictions)
    """
    def __init__(self, model_predict_fn, max_queries=10000):
        """
        Args:
            model_predict_fn: Function that returns class predictions
            max_queries: Maximum number of queries allowed
        """
        self.predict = model_predict_fn
        self.max_queries = max_queries
        self.query_count = 0

    def attack(self, original_image, target_class=None):
        """
        Generate adversarial example using boundary attack
        """
        # Initialize with random image of target class
        adversarial = self.initialize_adversarial(
            original_image, target_class
        )

        # Iteratively move towards original while maintaining adversarial
        dist_best = np.inf
        adversarial_best = adversarial.copy()

        for step in range(self.max_queries // 10):
            # Orthogonal perturbation (explore)
            perturbation = self.orthogonal_perturbation(
                adversarial, original_image
            )

            # Line search towards original (exploit)
            for _ in range(10):
                # Binary search for boundary
                candidate = self.binary_search_boundary(
                    adversarial + perturbation,
                    original_image,
                    target_class
                )

                # Update if closer to original
                dist = np.linalg.norm(candidate - original_image)
                if dist < dist_best:
                    dist_best = dist
                    adversarial_best = candidate
                    adversarial = candidate
                    break

                # Reduce perturbation if unsuccessful
                perturbation *= 0.5

            if self.query_count >= self.max_queries:
                break

        return adversarial_best

    def initialize_adversarial(self, original, target_class):
        """
        Initialize with random adversarial sample
        """
        while self.query_count < self.max_queries:
            # Random initialization
            random_image = np.random.uniform(0, 1, original.shape)
            pred = self.predict(random_image)
            self.query_count += 1

            if target_class is None:
                # Untargeted: any different class
                if pred != self.predict(original):
                    return random_image
            else:
                # Targeted: specific class
                if pred == target_class:
                    return random_image

        return original  # Failed to initialize

    def orthogonal_perturbation(self, current, original, delta=0.1):
        """
        Generate orthogonal perturbation for exploration
        """
        # Random direction
        perturbation = np.random.randn(*current.shape)

        # Make orthogonal to (current - original)
        direction = current - original
        direction_norm = np.linalg.norm(direction)

        if direction_norm > 0:
            # Project out component in direction
            dot_product = np.sum(perturbation * direction)
            perturbation -= (dot_product / direction_norm**2) * direction

        # Normalize and scale
        perturbation = delta * perturbation / np.linalg.norm(perturbation)

        return perturbation

    def binary_search_boundary(self, adversarial, original, target_class):
        """
        Binary search to find boundary between adversarial and original
        """
        # Interpolation bounds
        lower = 0.0  # adversarial
        upper = 1.0  # original

        for _ in range(10):  # Binary search iterations
            mid = (lower + upper) / 2
            mid_image = (1 - mid) * adversarial + mid * original
            pred = self.predict(mid_image)
            self.query_count += 1

            if target_class is None:
                # Untargeted attack
                is_adversarial = (pred != self.predict(original))
            else:
                # Targeted attack
                is_adversarial = (pred == target_class)

            if is_adversarial:
                lower = mid  # Can move closer to original
            else:
                upper = mid  # Too close to original

            if self.query_count >= self.max_queries:
                break

        # Return best adversarial found
        return (1 - lower) * adversarial + lower * original

# Adaptive Black-Box Testing
class AdaptiveBlackBoxTester:
    """
    Learns from queries to efficiently find vulnerabilities
    """
    def __init__(self, model_api):
        self.model_api = model_api
        self.query_history = []
        self.vulnerability_patterns = []

    def test_robustness(self, test_samples, test_types=['boundary', 'noise', 'semantic']):
        """
        Comprehensively test model robustness
        """
        results = {
            'vulnerabilities': [],
            'robustness_score': 0,
            'query_efficiency': 0
        }

        for test_type in test_types:
            if test_type == 'boundary':
                vulns = self.test_decision_boundaries(test_samples)
            elif test_type == 'noise':
                vulns = self.test_noise_robustness(test_samples)
            elif test_type == 'semantic':
                vulns = self.test_semantic_consistency(test_samples)

            results['vulnerabilities'].extend(vulns)

        # Calculate metrics
        results['robustness_score'] = self.calculate_robustness_score()
        results['query_efficiency'] = len(self.query_history)

        return results

    def test_decision_boundaries(self, samples):
        """
        Test stability of decision boundaries
        """
        vulnerabilities = []

        for sample in samples:
            # Find minimal perturbation that changes prediction
            original_pred = self.model_api(sample)

            # Adaptive search based on previous vulnerabilities
            if self.vulnerability_patterns:
                # Use learned patterns
                perturbation = self.generate_targeted_perturbation(sample)
            else:
                # Random search
                perturbation = np.random.randn(*sample.shape) * 0.01

            # Test with increasing perturbation
            for scale in np.logspace(-3, 0, 10):
                perturbed = sample + scale * perturbation
                new_pred = self.model_api(perturbed)

                if new_pred != original_pred:
                    vulnerabilities.append({
                        'type': 'boundary',
                        'original': sample,
                        'perturbation': scale * perturbation,
                        'distance': np.linalg.norm(scale * perturbation)
                    })

                    # Learn from this vulnerability
                    self.vulnerability_patterns.append(perturbation)
                    break

        return vulnerabilities`,
            language: 'python',
            explanation: 'Black-box testing strategies find vulnerabilities using only model outputs, reflecting realistic attack scenarios.'
          }
        ]
      },
      {
        title: 'Advanced Attack Patterns',
        content: `Advanced adversarial patterns combine multiple techniques for more sophisticated attacks. These include ensemble methods, universal perturbations, and physical-world attacks.

**Advanced Techniques:**
1. **Universal Adversarial Perturbations** - Single perturbation for all inputs
2. **Physical World Attacks** - Robust to real-world transformations
3. **Ensemble Attacks** - Target multiple models simultaneously
4. **Semantic Attacks** - Preserve semantic meaning
5. **Patch Attacks** - Localized adversarial patches

**Evaluation Metrics:**
- Attack Success Rate (ASR)
- Perturbation magnitude (L0, L2, L∞ norms)
- Query efficiency
- Transferability rate
- Perceptual quality (SSIM, LPIPS)`,
        examples: [
          {
            code: `# Universal Adversarial Perturbation (UAP)
import torch
import torch.nn.functional as F

class UniversalPerturbation:
    """
    Generates universal adversarial perturbations
    """
    def __init__(self, model, epsilon=0.1, max_iter=10):
        self.model = model
        self.epsilon = epsilon
        self.max_iter = max_iter

    def generate_uap(self, data_loader, target_class=None):
        """
        Generate universal perturbation from data
        """
        # Initialize universal perturbation
        uap = torch.zeros(next(iter(data_loader))[0][0].shape)

        for epoch in range(self.max_iter):
            print(f"UAP Generation - Epoch {epoch+1}/{self.max_iter}")
            fooling_rate = 0
            total_samples = 0

            for images, labels in data_loader:
                for i, (image, label) in enumerate(zip(images, labels)):
                    # Add current UAP
                    perturbed = image + uap
                    perturbed = torch.clamp(perturbed, 0, 1)

                    # Check if already fooled
                    with torch.no_grad():
                        pred = self.model(perturbed.unsqueeze(0)).argmax()

                    if target_class is not None:
                        fooled = (pred == target_class)
                    else:
                        fooled = (pred != label)

                    if fooled:
                        fooling_rate += 1
                    else:
                        # Update UAP if not fooled
                        delta = self.compute_perturbation(
                            image, label, uap, target_class
                        )

                        # Update and project
                        uap = uap + delta
                        uap = self.project_perturbation(uap)

                    total_samples += 1

            # Check convergence
            fooling_rate = fooling_rate / total_samples
            print(f"Fooling Rate: {fooling_rate:.2%}")

            if fooling_rate > 0.8:  # Target fooling rate
                break

        return uap

    def compute_perturbation(self, image, true_label, current_uap, target_class):
        """
        Compute minimal perturbation for single image
        """
        perturbed = (image + current_uap).unsqueeze(0)
        perturbed.requires_grad = True

        output = self.model(perturbed)

        if target_class is not None:
            # Targeted attack
            loss = -F.cross_entropy(output, torch.tensor([target_class]))
        else:
            # Untargeted attack
            loss = F.cross_entropy(output, torch.tensor([true_label]))

        loss.backward()

        # Get gradient sign
        delta = self.epsilon * perturbed.grad.sign().squeeze()

        return delta

    def project_perturbation(self, perturbation):
        """
        Project to epsilon ball
        """
        # L-infinity projection
        return torch.clamp(perturbation, -self.epsilon, self.epsilon)

# Physical World Attack - Adversarial Patch
class AdversarialPatch:
    """
    Creates adversarial patches robust to physical transformations
    """
    def __init__(self, model, patch_size=(50, 50), target_class=0):
        self.model = model
        self.patch_size = patch_size
        self.target_class = target_class

    def generate_patch(self, training_images, iterations=500):
        """
        Generate adversarial patch using expectation over transformations
        """
        import torchvision.transforms as T

        # Initialize random patch
        patch = torch.rand(3, *self.patch_size, requires_grad=True)
        optimizer = torch.optim.Adam([patch], lr=0.01)

        # Define transformations for robustness
        transforms = T.Compose([
            T.RandomAffine(degrees=30, translate=(0.1, 0.1), scale=(0.8, 1.2)),
            T.RandomPerspective(distortion_scale=0.2, p=0.5),
            T.ColorJitter(brightness=0.3, contrast=0.3, saturation=0.3)
        ])

        for iteration in range(iterations):
            loss_total = 0

            for image in training_images:
                # Random patch location
                x = torch.randint(0, image.shape[2] - self.patch_size[0], (1,))
                y = torch.randint(0, image.shape[3] - self.patch_size[1], (1,))

                # Apply patch with transformation
                patched_image = image.clone()
                transformed_patch = transforms(patch)
                patched_image[:, :, x:x+self.patch_size[0],
                             y:y+self.patch_size[1]] = transformed_patch

                # Compute loss
                output = self.model(patched_image)
                loss = -F.log_softmax(output, dim=1)[0, self.target_class]
                loss_total += loss

            # Optimize patch
            optimizer.zero_grad()
            loss_total.backward()
            optimizer.step()

            # Clip to valid range
            patch.data = torch.clamp(patch.data, 0, 1)

            if iteration % 50 == 0:
                print(f"Iteration {iteration}: Loss = {loss_total.item():.4f}")

        return patch.detach()`,
            language: 'python',
            explanation: 'Advanced attack patterns like UAP and physical patches demonstrate sophisticated real-world threats to AI systems.'
          }
        ]
      }
    ],

    keyTakeaways: [
      'Adversarial testing requires systematic and creative approaches to find AI vulnerabilities',
      'Different attack vectors (gradient-based, optimization, black-box) target different aspects of AI systems',
      'Data poisoning can compromise models during training, not just at inference time',
      'Model extraction and inversion attacks threaten intellectual property and privacy',
      'Black-box attacks are practical and reflect real-world constraints',
      'Universal perturbations and physical attacks show that single vulnerabilities can affect many inputs',
      'Understanding attacks is essential for building robust defenses',
      'Continuous testing is necessary as models and threats evolve',
      'Trade-offs exist between attack strength, perceptibility, and computational cost'
    ],

    practiceQuestions: [
      {
        question: 'Why is PGD generally more effective than FGSM for generating adversarial examples?',
        hint: 'Consider the iterative nature and optimization process.',
        answer: 'PGD is more effective because it uses multiple iterations to refine the perturbation, allowing it to find stronger adversarial examples within the epsilon constraint. While FGSM takes a single step in the gradient direction, PGD iteratively optimizes the perturbation and projects it back to the feasible region, exploring the loss landscape more thoroughly.'
      },
      {
        question: 'How can you detect if your training data has been poisoned with backdoor triggers?',
        hint: 'Think about statistical anomalies and clustering patterns.',
        answer: 'Detection methods include: 1) Statistical analysis to find outliers or unusual patterns in the data distribution, 2) Clustering analysis to identify samples that behave differently, 3) Activation pattern analysis to find neurons that fire specifically for certain inputs, 4) Training multiple models and comparing their behaviors, 5) Spectral signatures that may reveal hidden patterns, 6) Input gradient analysis to identify unusual sensitivity patterns.'
      },
      {
        question: 'What makes black-box attacks more challenging than white-box attacks?',
        hint: 'Consider the information available to the attacker.',
        answer: 'Black-box attacks are more challenging because: 1) No access to model gradients means relying on finite differences or gradient-free optimization, 2) Limited query budget constrains exploration, 3) Must infer decision boundaries through sampling, 4) Cannot directly optimize perturbations using model internals, 5) Requires more queries to achieve similar attack success rates, 6) Must balance exploration vs exploitation without gradient guidance.'
      }
    ]
  }
};