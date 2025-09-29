import { TheoryLesson } from '../../types';

export const defenseMechanismsLesson: TheoryLesson = {
  id: 'defense-mechanisms',
  title: 'AI Defense Mechanisms: Protecting Against Adversarial Threats',
  description: 'Learn comprehensive techniques to protect AI systems against adversarial attacks and ensure robustness',
  estimatedTime: 45,
  difficulty: 'advanced',
  xpReward: 180,
  content: {
    introduction: `Defense mechanisms for AI systems encompass a wide range of techniques to protect against adversarial attacks, ensure robustness, preserve privacy, and maintain system integrity. This lesson covers defensive strategies from input validation to advanced certified defenses.

Building robust AI systems requires a defense-in-depth approach, combining multiple layers of protection. We'll explore proven techniques for hardening models against attacks, detecting malicious inputs, and maintaining performance under adversarial conditions.`,

    sections: [
      {
        title: 'Adversarial Training: Building Robust Models',
        content: `Adversarial training improves model robustness by including adversarial examples in the training process. This technique helps models learn to correctly classify both clean and adversarially perturbed inputs.

**Key Principles:**
- Augment training data with adversarial examples
- Balance robustness vs clean accuracy
- Iterative improvement through epochs
- Ensemble adversarial training
- Curriculum learning approaches

**Training Strategies:**
1. **Standard Adversarial Training** - Include adversarial examples in each batch
2. **PGD Adversarial Training** - Use strongest known attack during training
3. **TRADES** - Trade-off between accuracy and robustness
4. **MART** - Misclassification-aware adversarial training
5. **AWP** - Adversarial weight perturbation for better generalization`,
        examples: [
          {
            code: `import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F

class AdversarialTrainer:
    """
    Implements various adversarial training strategies
    """
    def __init__(self, model, epsilon=0.3, step_size=0.01, num_steps=10):
        self.model = model
        self.epsilon = epsilon
        self.step_size = step_size
        self.num_steps = num_steps

    def pgd_adversarial_training(self, train_loader, epochs=100):
        """
        PGD-based adversarial training for robustness
        """
        optimizer = optim.SGD(self.model.parameters(), lr=0.1,
                            momentum=0.9, weight_decay=5e-4)
        scheduler = optim.lr_scheduler.MultiStepLR(
            optimizer, milestones=[75, 90], gamma=0.1
        )

        for epoch in range(epochs):
            self.model.train()
            train_loss = 0
            correct_clean = 0
            correct_adv = 0
            total = 0

            for batch_idx, (inputs, targets) in enumerate(train_loader):
                # Generate adversarial examples
                adv_inputs = self.pgd_attack(inputs, targets)

                # Combined training on clean and adversarial
                optimizer.zero_grad()

                # Forward pass on adversarial examples
                outputs_adv = self.model(adv_inputs)
                loss_adv = F.cross_entropy(outputs_adv, targets)

                # Optional: Also train on clean examples
                outputs_clean = self.model(inputs)
                loss_clean = F.cross_entropy(outputs_clean, targets)

                # Combined loss
                loss = 0.5 * loss_adv + 0.5 * loss_clean

                # Backward and optimize
                loss.backward()
                optimizer.step()

                # Statistics
                train_loss += loss.item()
                _, predicted_clean = outputs_clean.max(1)
                _, predicted_adv = outputs_adv.max(1)
                total += targets.size(0)
                correct_clean += predicted_clean.eq(targets).sum().item()
                correct_adv += predicted_adv.eq(targets).sum().item()

            scheduler.step()

            # Print statistics
            print(f'Epoch {epoch}: Loss: {train_loss/(batch_idx+1):.3f} | '
                  f'Clean Acc: {100.*correct_clean/total:.2f}% | '
                  f'Adv Acc: {100.*correct_adv/total:.2f}%')

    def pgd_attack(self, inputs, targets):
        """
        Generate PGD adversarial examples for training
        """
        adv_inputs = inputs.clone().detach()

        for _ in range(self.num_steps):
            adv_inputs.requires_grad = True
            outputs = self.model(adv_inputs)
            loss = F.cross_entropy(outputs, targets)

            self.model.zero_grad()
            loss.backward()

            # Update adversarial inputs
            adv_inputs = adv_inputs.detach() + self.step_size * adv_inputs.grad.sign()

            # Project back to epsilon ball
            delta = torch.clamp(adv_inputs - inputs,
                              min=-self.epsilon, max=self.epsilon)
            adv_inputs = torch.clamp(inputs + delta, min=0, max=1)

        return adv_inputs

    def trades_training(self, train_loader, beta=6.0, epochs=100):
        """
        TRADES: TRadeoff-inspired Adversarial Defense via Surrogate-loss minimization
        """
        optimizer = optim.SGD(self.model.parameters(), lr=0.1,
                            momentum=0.9, weight_decay=5e-4)

        for epoch in range(epochs):
            self.model.train()

            for inputs, targets in train_loader:
                # Natural loss
                outputs = self.model(inputs)
                loss_natural = F.cross_entropy(outputs, targets)

                # Generate adversarial examples
                adv_inputs = self.trades_perturb(inputs)

                # Robust loss (KL divergence)
                outputs_adv = self.model(adv_inputs)
                loss_robust = F.kl_div(
                    F.log_softmax(outputs_adv, dim=1),
                    F.softmax(outputs, dim=1),
                    reduction='batchmean'
                )

                # TRADES loss
                loss = loss_natural + beta * loss_robust

                optimizer.zero_grad()
                loss.backward()
                optimizer.step()

    def trades_perturb(self, inputs):
        """
        Generate adversarial perturbation for TRADES
        """
        self.model.eval()

        with torch.no_grad():
            outputs = self.model(inputs)

        adv_inputs = inputs.clone().detach()
        adv_inputs += 0.001 * torch.randn_like(inputs).sign()

        for _ in range(self.num_steps):
            adv_inputs.requires_grad = True
            outputs_adv = self.model(adv_inputs)

            # KL divergence loss
            loss = F.kl_div(
                F.log_softmax(outputs_adv, dim=1),
                F.softmax(outputs, dim=1),
                reduction='sum'
            )

            self.model.zero_grad()
            loss.backward()

            # Update with projected gradient
            adv_inputs = adv_inputs.detach() + \
                        self.step_size * adv_inputs.grad.sign()

            # Project to epsilon ball
            delta = torch.clamp(adv_inputs - inputs,
                              min=-self.epsilon, max=self.epsilon)
            adv_inputs = torch.clamp(inputs + delta, min=0, max=1)

        self.model.train()
        return adv_inputs

# Adversarial Weight Perturbation (AWP)
class AWPTrainer:
    """
    Adversarial Weight Perturbation for improved robustness
    """
    def __init__(self, model, proxy_model, gamma=0.01):
        self.model = model
        self.proxy_model = proxy_model
        self.gamma = gamma

    def awp_adversarial_training(self, train_loader, adversarial_trainer, epochs=100):
        """
        AWP-enhanced adversarial training
        """
        optimizer = optim.SGD(self.model.parameters(), lr=0.1,
                            momentum=0.9, weight_decay=5e-4)

        for epoch in range(epochs):
            for inputs, targets in train_loader:
                # Step 1: Calculate adversarial weight perturbation
                self.proxy_model.load_state_dict(self.model.state_dict())

                # Generate adversarial examples with current model
                adv_inputs = adversarial_trainer.pgd_attack(inputs, targets)

                # Calculate gradients w.r.t weights
                loss_natural = F.cross_entropy(self.proxy_model(inputs), targets)
                loss_adv = F.cross_entropy(self.proxy_model(adv_inputs), targets)
                loss = loss_natural + loss_adv

                loss.backward()

                # Perturb weights adversarially
                self.perturb_weights()

                # Step 2: Train with perturbed weights
                outputs = self.model(adv_inputs)
                loss = F.cross_entropy(outputs, targets)

                optimizer.zero_grad()
                loss.backward()
                optimizer.step()

                # Restore original weights
                self.restore_weights()

    def perturb_weights(self):
        """
        Apply adversarial perturbation to model weights
        """
        for p, p_proxy in zip(self.model.parameters(), self.proxy_model.parameters()):
            if p_proxy.grad is not None:
                # Normalize gradient
                grad_norm = p_proxy.grad.norm()
                if grad_norm != 0:
                    perturbation = self.gamma * p_proxy.grad / grad_norm
                    p.data.add_(perturbation)

    def restore_weights(self):
        """
        Restore original weights after training step
        """
        # Implementation depends on saved state
        pass`,
            language: 'python',
            explanation: 'Adversarial training techniques like PGD-AT, TRADES, and AWP improve model robustness by incorporating adversarial examples during training.'
          }
        ]
      },
      {
        title: 'Input Validation and Sanitization',
        content: `Input validation techniques detect and filter potentially adversarial inputs before they reach the model. This includes statistical analysis, anomaly detection, and format verification.

**Detection Methods:**
1. **Statistical Testing** - Check input statistics against expected distributions
2. **Anomaly Detection** - Identify inputs that deviate from normal patterns
3. **Feature Squeezing** - Reduce input precision to remove adversarial noise
4. **Input Transformation** - Apply defensive distillation or smoothing
5. **Consistency Checks** - Verify predictions across multiple models or views

**Sanitization Techniques:**
- Input reconstruction using autoencoders
- Adversarial example detection networks
- Statistical outlier removal
- Format validation and type checking
- Range and constraint enforcement`,
        examples: [
          {
            code: `import numpy as np
import torch
import torch.nn as nn
from scipy import stats
from sklearn.decomposition import PCA
from sklearn.ensemble import IsolationForest

class InputValidator:
    """
    Comprehensive input validation and sanitization
    """
    def __init__(self, model, clean_data_stats=None):
        self.model = model
        self.clean_stats = clean_data_stats
        self.detector = None

    def statistical_detection(self, inputs, threshold=3.0):
        """
        Detect adversarial inputs using statistical tests
        """
        if self.clean_stats is None:
            return np.ones(len(inputs), dtype=bool)  # Accept all

        is_clean = []

        for input_sample in inputs:
            # Calculate statistics
            input_mean = np.mean(input_sample)
            input_std = np.std(input_sample)

            # Z-score test
            z_score_mean = abs((input_mean - self.clean_stats['mean']) /
                              self.clean_stats['std_mean'])
            z_score_std = abs((input_std - self.clean_stats['std']) /
                             self.clean_stats['std_std'])

            # Kolmogorov-Smirnov test
            ks_statistic, ks_pvalue = stats.ks_2samp(
                input_sample.flatten(),
                self.clean_stats['distribution']
            )

            # Decision based on multiple tests
            is_statistical_normal = (z_score_mean < threshold and
                                    z_score_std < threshold and
                                    ks_pvalue > 0.05)

            is_clean.append(is_statistical_normal)

        return np.array(is_clean)

    def feature_squeezing(self, inputs, bit_depth=8):
        """
        Reduce input precision to remove adversarial perturbations
        """
        # Reduce color bit depth
        max_val = 2 ** bit_depth - 1
        squeezed = np.round(inputs * max_val) / max_val

        return squeezed

    def spatial_smoothing(self, inputs, kernel_size=3):
        """
        Apply spatial smoothing to remove high-frequency perturbations
        """
        import cv2

        smoothed = []
        for input_sample in inputs:
            # Apply Gaussian blur
            if len(input_sample.shape) == 3:
                smooth_sample = cv2.GaussianBlur(
                    input_sample, (kernel_size, kernel_size), 0
                )
            else:
                smooth_sample = input_sample
            smoothed.append(smooth_sample)

        return np.array(smoothed)

    def autoencoder_defense(self, inputs, autoencoder):
        """
        Reconstruct inputs using autoencoder to remove perturbations
        """
        with torch.no_grad():
            inputs_tensor = torch.tensor(inputs, dtype=torch.float32)
            reconstructed = autoencoder(inputs_tensor)
            return reconstructed.numpy()

    def ensemble_consistency_check(self, inputs, models, threshold=0.9):
        """
        Check prediction consistency across multiple models
        """
        predictions = []

        for model in models:
            with torch.no_grad():
                outputs = model(torch.tensor(inputs))
                preds = outputs.argmax(dim=1)
                predictions.append(preds.numpy())

        predictions = np.array(predictions)

        # Calculate agreement rate
        mode_predictions = stats.mode(predictions, axis=0)[0][0]
        agreement_rates = np.mean(predictions == mode_predictions, axis=0)

        # High agreement suggests clean input
        return agreement_rates > threshold

    def adaptive_noise_detection(self, inputs, epsilon=0.01):
        """
        Detect adversarial examples by adding noise and checking stability
        """
        original_preds = self.get_predictions(inputs)

        is_robust = []
        for _ in range(10):  # Multiple noise samples
            # Add small random noise
            noisy_inputs = inputs + np.random.normal(0, epsilon, inputs.shape)
            noisy_inputs = np.clip(noisy_inputs, 0, 1)

            noisy_preds = self.get_predictions(noisy_inputs)

            # Check if predictions are stable
            stability = (original_preds == noisy_preds)
            is_robust.append(stability)

        # Majority voting
        return np.mean(is_robust, axis=0) > 0.7

    def get_predictions(self, inputs):
        """
        Get model predictions
        """
        with torch.no_grad():
            outputs = self.model(torch.tensor(inputs, dtype=torch.float32))
            return outputs.argmax(dim=1).numpy()

# Adversarial Detection Network
class AdversarialDetector(nn.Module):
    """
    Neural network for detecting adversarial examples
    """
    def __init__(self, input_dim, hidden_dim=256):
        super().__init__()

        self.feature_extractor = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.ReLU(),
            nn.Dropout(0.5)
        )

        self.classifier = nn.Sequential(
            nn.Linear(hidden_dim // 2, 64),
            nn.ReLU(),
            nn.Linear(64, 2)  # Binary: clean or adversarial
        )

    def forward(self, x):
        features = self.feature_extractor(x)
        return self.classifier(features)

    def train_detector(self, clean_data, adversarial_data, epochs=50):
        """
        Train the adversarial detector
        """
        # Prepare dataset
        X = torch.cat([clean_data, adversarial_data])
        y = torch.cat([
            torch.zeros(len(clean_data)),
            torch.ones(len(adversarial_data))
        ]).long()

        # Training setup
        optimizer = optim.Adam(self.parameters(), lr=0.001)
        criterion = nn.CrossEntropyLoss()

        for epoch in range(epochs):
            # Shuffle data
            perm = torch.randperm(len(X))
            X, y = X[perm], y[perm]

            # Mini-batch training
            batch_size = 32
            for i in range(0, len(X), batch_size):
                batch_X = X[i:i+batch_size]
                batch_y = y[i:i+batch_size]

                optimizer.zero_grad()
                outputs = self(batch_X)
                loss = criterion(outputs, batch_y)
                loss.backward()
                optimizer.step()

            if epoch % 10 == 0:
                accuracy = (self(X).argmax(dim=1) == y).float().mean()
                print(f"Epoch {epoch}: Accuracy = {accuracy:.2%}")

# MagNet Defense
class MagNetDefense:
    """
    MagNet: Detecting and rejecting adversarial examples
    """
    def __init__(self, autoencoder, detector_threshold=0.5):
        self.autoencoder = autoencoder
        self.threshold = detector_threshold

    def detect_and_reform(self, inputs):
        """
        Detect adversarial examples and reform them
        """
        # Reconstruct inputs
        reconstructed = self.autoencoder(inputs)

        # Calculate reconstruction error
        reconstruction_error = torch.norm(
            inputs - reconstructed, p=2, dim=(1,2,3)
        )

        # Detect based on reconstruction error
        is_adversarial = reconstruction_error > self.threshold

        # Reform adversarial examples
        reformed = torch.where(
            is_adversarial.unsqueeze(1).unsqueeze(2).unsqueeze(3),
            reconstructed,
            inputs
        )

        return reformed, is_adversarial`,
            language: 'python',
            explanation: 'Input validation and sanitization provide the first line of defense against adversarial attacks through detection and filtering.'
          }
        ]
      },
      {
        title: 'Certified Defenses: Provable Robustness',
        content: `Certified defenses provide mathematical guarantees about model behavior within specific perturbation bounds. These techniques offer provable robustness against adversarial attacks.

**Certification Methods:**
1. **Randomized Smoothing** - Statistical certification through noise injection
2. **Interval Bound Propagation (IBP)** - Propagate bounds through network
3. **Linear Programming** - Exact verification for small networks
4. **Abstract Interpretation** - Over-approximate reachable sets
5. **Lipschitz Constraints** - Bound sensitivity to input changes

**Trade-offs:**
- Certified radius vs accuracy
- Computational cost vs tightness
- Scalability vs completeness
- Training time vs verification time`,
        examples: [
          {
            code: `import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
from scipy.stats import norm

class RandomizedSmoothing:
    """
    Randomized smoothing for certified robustness
    """
    def __init__(self, base_model, sigma=0.5, n_samples=100, alpha=0.001):
        """
        Args:
            base_model: Base classifier to smooth
            sigma: Noise standard deviation
            n_samples: Number of samples for prediction
            alpha: Failure probability for certification
        """
        self.base_model = base_model
        self.sigma = sigma
        self.n_samples = n_samples
        self.alpha = alpha

    def predict(self, x, n_samples=None):
        """
        Predict using smoothed classifier
        """
        if n_samples is None:
            n_samples = self.n_samples

        self.base_model.eval()

        # Add Gaussian noise and collect predictions
        counts = torch.zeros(10)  # Assuming 10 classes

        for _ in range(n_samples):
            noise = torch.randn_like(x) * self.sigma
            noisy_x = x + noise

            with torch.no_grad():
                pred = self.base_model(noisy_x).argmax()
                counts[pred] += 1

        # Return most common prediction
        return counts.argmax()

    def certify(self, x, n0=100, n=100000):
        """
        Certify robustness radius for input x

        Args:
            x: Input to certify
            n0: Samples for prediction
            n: Samples for certification

        Returns:
            prediction: Predicted class
            radius: Certified radius (0 if abstained)
        """
        self.base_model.eval()

        # Step 1: Get prediction with n0 samples
        counts0 = torch.zeros(10)

        for _ in range(n0):
            noise = torch.randn_like(x) * self.sigma
            with torch.no_grad():
                pred = self.base_model(x + noise).argmax()
                counts0[pred] += 1

        top_class = counts0.argmax().item()

        # Step 2: Estimate probability with n samples
        counts = torch.zeros(10)

        for _ in range(n):
            noise = torch.randn_like(x) * self.sigma
            with torch.no_grad():
                pred = self.base_model(x + noise).argmax()
                counts[pred] += 1

        # Calculate lower bound on probability
        p_a = counts[top_class] / n

        # Clopper-Pearson confidence interval
        p_a_lower = self.binomial_confidence_lower(
            counts[top_class].item(), n, self.alpha
        )

        if p_a_lower > 0.5:
            # Calculate certified radius
            radius = self.sigma * norm.ppf(p_a_lower)
            return top_class, radius
        else:
            # Abstain
            return -1, 0.0

    @staticmethod
    def binomial_confidence_lower(na, n, alpha):
        """
        Lower bound of confidence interval for binomial proportion
        """
        from statsmodels.stats.proportion import proportion_confint

        if na == 0:
            return 0.0
        elif na == n:
            return 1.0 - alpha
        else:
            return proportion_confint(na, n, alpha=2*alpha, method='beta')[0]

# Interval Bound Propagation (IBP)
class IBPLinear(nn.Module):
    """
    Linear layer with interval bound propagation
    """
    def __init__(self, in_features, out_features):
        super().__init__()
        self.weight = nn.Parameter(torch.randn(out_features, in_features))
        self.bias = nn.Parameter(torch.zeros(out_features))

    def forward(self, x_l, x_u):
        """
        Forward pass with interval bounds

        Args:
            x_l: Lower bound of input
            x_u: Upper bound of input

        Returns:
            y_l, y_u: Lower and upper bounds of output
        """
        weight_pos = torch.clamp(self.weight, min=0)
        weight_neg = torch.clamp(self.weight, max=0)

        y_l = (weight_pos @ x_l.T + weight_neg @ x_u.T).T + self.bias
        y_u = (weight_pos @ x_u.T + weight_neg @ x_l.T).T + self.bias

        return y_l, y_u

class IBPNetwork(nn.Module):
    """
    Neural network with interval bound propagation
    """
    def __init__(self, input_dim, hidden_dim, output_dim):
        super().__init__()
        self.fc1 = IBPLinear(input_dim, hidden_dim)
        self.fc2 = IBPLinear(hidden_dim, hidden_dim)
        self.fc3 = IBPLinear(hidden_dim, output_dim)

    def forward(self, x, epsilon=0):
        """
        Forward pass with optional epsilon-ball bounds
        """
        if epsilon > 0:
            # Initialize bounds
            x_l = torch.clamp(x - epsilon, min=0, max=1)
            x_u = torch.clamp(x + epsilon, min=0, max=1)

            # Propagate through layers
            z1_l, z1_u = self.fc1(x_l, x_u)
            a1_l = F.relu(z1_l)
            a1_u = F.relu(z1_u)

            z2_l, z2_u = self.fc2(a1_l, a1_u)
            a2_l = F.relu(z2_l)
            a2_u = F.relu(z2_u)

            y_l, y_u = self.fc3(a2_l, a2_u)

            return y_l, y_u
        else:
            # Standard forward pass
            x = F.relu(self.fc1(x, x)[0])
            x = F.relu(self.fc2(x, x)[0])
            return self.fc3(x, x)[0]

    def certify_robustness(self, x, y_true, epsilon):
        """
        Certify robustness for a given epsilon
        """
        y_l, y_u = self.forward(x, epsilon)

        # Check if true class has highest lower bound
        true_class_lower = y_l[:, y_true]

        for c in range(y_l.shape[1]):
            if c != y_true:
                other_class_upper = y_u[:, c]
                if (other_class_upper >= true_class_lower).any():
                    return False

        return True

# Lipschitz-Constrained Networks
class LipschitzLinear(nn.Module):
    """
    Linear layer with Lipschitz constraint
    """
    def __init__(self, in_features, out_features, lipschitz_constant=1.0):
        super().__init__()
        self.weight = nn.Parameter(torch.randn(out_features, in_features))
        self.bias = nn.Parameter(torch.zeros(out_features))
        self.lipschitz_constant = lipschitz_constant

    def forward(self, x):
        # Apply spectral normalization
        weight_normalized = self.spectral_normalize(self.weight)
        return F.linear(x, weight_normalized, self.bias)

    def spectral_normalize(self, weight):
        """
        Normalize weight matrix to satisfy Lipschitz constraint
        """
        # Power iteration to estimate spectral norm
        u = torch.randn(weight.size(0), 1)
        v = torch.randn(weight.size(1), 1)

        for _ in range(1):  # Usually 1 iteration is enough
            v = F.normalize(weight.T @ u, dim=0)
            u = F.normalize(weight @ v, dim=0)

        sigma = (u.T @ weight @ v).item()

        # Normalize if needed
        if sigma > self.lipschitz_constant:
            weight = weight * (self.lipschitz_constant / sigma)

        return weight

# CROWN (Convex Relaxation)
class CROWNBounds:
    """
    CROWN: Efficient neural network verification
    """
    def __init__(self, model):
        self.model = model

    def compute_bounds(self, x, epsilon):
        """
        Compute output bounds using CROWN
        """
        # Initialize input bounds
        lower = x - epsilon
        upper = x + epsilon

        # Store intermediate bounds and linear coefficients
        bounds = [(lower, upper)]
        A_lower, A_upper = None, None
        b_lower, b_upper = 0, 0

        # Propagate through layers
        for layer in self.model.children():
            if isinstance(layer, nn.Linear):
                # Linear transformation
                if A_lower is None:
                    A_lower = layer.weight
                    A_upper = layer.weight
                    b_lower = layer.bias
                    b_upper = layer.bias
                else:
                    A_lower = layer.weight @ A_lower
                    A_upper = layer.weight @ A_upper
                    b_lower = layer.weight @ b_lower + layer.bias
                    b_upper = layer.weight @ b_upper + layer.bias

            elif isinstance(layer, nn.ReLU):
                # ReLU activation - use linear relaxation
                lower, upper = bounds[-1]

                # Compute pre-activation bounds
                z_lower = A_lower @ x + b_lower
                z_upper = A_upper @ x + b_upper

                # Apply ReLU relaxation
                # This is simplified; full CROWN uses tighter bounds
                mask_active = (z_lower > 0)
                mask_inactive = (z_upper < 0)
                mask_unstable = ~(mask_active | mask_inactive)

                # Update linear bounds
                # (Implementation details omitted for brevity)

        return bounds[-1]`,
            language: 'python',
            explanation: 'Certified defenses like randomized smoothing, IBP, and Lipschitz constraints provide provable robustness guarantees against bounded perturbations.'
          }
        ]
      },
      {
        title: 'Ensemble Defenses and Moving Target Defense',
        content: `Ensemble methods combine multiple models or defense mechanisms to improve overall robustness. Diversity in the ensemble makes it harder for attackers to craft universal adversarial examples.

**Ensemble Strategies:**
1. **Model Ensembles** - Combine predictions from multiple architectures
2. **Defense Ensembles** - Layer multiple defense mechanisms
3. **Random Switching** - Randomly select model at inference
4. **Adaptive Ensembles** - Dynamically adjust based on threat level
5. **Moving Target Defense** - Continuously change system configuration

**Benefits:**
- Increased attack complexity
- Reduced transferability
- Graceful degradation
- Defense diversity
- Adaptive response`,
        examples: [
          {
            code: `import torch
import torch.nn as nn
import numpy as np
from collections import deque
import random

class EnsembleDefense:
    """
    Ensemble of models for robust predictions
    """
    def __init__(self, models, aggregation='majority_vote'):
        """
        Args:
            models: List of trained models
            aggregation: Method to combine predictions
        """
        self.models = models
        self.aggregation = aggregation
        self.diversity_weight = None

    def predict(self, x, return_all=False):
        """
        Make ensemble prediction
        """
        predictions = []
        confidences = []

        for model in self.models:
            model.eval()
            with torch.no_grad():
                output = model(x)
                pred = output.argmax(dim=1)
                conf = F.softmax(output, dim=1)

                predictions.append(pred)
                confidences.append(conf)

        predictions = torch.stack(predictions)
        confidences = torch.stack(confidences)

        if self.aggregation == 'majority_vote':
            # Simple majority voting
            final_pred = torch.mode(predictions, dim=0)[0]

        elif self.aggregation == 'average_confidence':
            # Average confidence scores
            avg_conf = torch.mean(confidences, dim=0)
            final_pred = avg_conf.argmax(dim=1)

        elif self.aggregation == 'weighted_vote':
            # Weight by model diversity
            if self.diversity_weight is None:
                self.calculate_diversity_weights(x)

            weighted_conf = torch.zeros_like(confidences[0])
            for i, (conf, weight) in enumerate(zip(confidences, self.diversity_weight)):
                weighted_conf += weight * conf

            final_pred = weighted_conf.argmax(dim=1)

        elif self.aggregation == 'max_confidence':
            # Select prediction with highest confidence
            max_conf_values = torch.max(confidences, dim=2)[0]
            best_model_idx = torch.argmax(max_conf_values, dim=0)

            final_pred = torch.gather(
                predictions, 0,
                best_model_idx.unsqueeze(0)
            ).squeeze()

        if return_all:
            return final_pred, predictions, confidences
        return final_pred

    def calculate_diversity_weights(self, x_sample):
        """
        Calculate diversity-based weights for ensemble members
        """
        # Get predictions from all models
        predictions = []
        for model in self.models:
            with torch.no_grad():
                pred = model(x_sample).argmax(dim=1)
                predictions.append(pred.numpy())

        predictions = np.array(predictions)
        n_models = len(self.models)

        # Calculate pairwise disagreement
        diversity_scores = np.zeros(n_models)
        for i in range(n_models):
            disagreement = 0
            for j in range(n_models):
                if i != j:
                    disagreement += np.mean(predictions[i] != predictions[j])
            diversity_scores[i] = disagreement / (n_models - 1)

        # Normalize to weights
        self.diversity_weight = diversity_scores / diversity_scores.sum()

    def adaptive_defense(self, x, threat_level=0.5):
        """
        Adapt defense strategy based on threat level
        """
        if threat_level < 0.3:
            # Low threat: use single fast model
            return self.models[0](x).argmax(dim=1)

        elif threat_level < 0.7:
            # Medium threat: use subset of models
            n_models = max(2, int(len(self.models) * threat_level))
            selected_models = random.sample(self.models, n_models)

            predictions = []
            for model in selected_models:
                predictions.append(model(x).argmax(dim=1))

            return torch.mode(torch.stack(predictions), dim=0)[0]

        else:
            # High threat: use all models with verification
            pred, all_preds, confs = self.predict(x, return_all=True)

            # Check consensus
            agreement = torch.mean(
                (all_preds == pred.unsqueeze(0)).float()
            )

            if agreement < 0.7:
                # Low consensus - potentially adversarial
                # Apply additional defenses
                x_defended = self.apply_input_defense(x)
                return self.predict(x_defended)

            return pred

    def apply_input_defense(self, x):
        """
        Apply defensive transformations to input
        """
        # Random transformations
        if random.random() > 0.5:
            # Add noise
            x = x + torch.randn_like(x) * 0.01

        if random.random() > 0.5:
            # Gaussian blur
            from torchvision import transforms
            blur = transforms.GaussianBlur(kernel_size=3)
            x = blur(x)

        return torch.clamp(x, 0, 1)

class MovingTargetDefense:
    """
    Continuously change model configuration to evade attacks
    """
    def __init__(self, model_pool, switch_interval=100):
        """
        Args:
            model_pool: Pool of available models
            switch_interval: Queries before switching
        """
        self.model_pool = model_pool
        self.switch_interval = switch_interval
        self.query_count = 0
        self.current_model = None
        self.model_history = deque(maxlen=10)

        # Initialize
        self.switch_model()

    def switch_model(self):
        """
        Switch to a different model
        """
        # Avoid recent models
        available = [m for m in self.model_pool
                    if m not in self.model_history]

        if not available:
            available = self.model_pool

        self.current_model = random.choice(available)
        self.model_history.append(self.current_model)
        self.query_count = 0

    def predict(self, x):
        """
        Predict with automatic model switching
        """
        self.query_count += 1

        # Switch model if interval reached
        if self.query_count >= self.switch_interval:
            self.switch_model()

        # Random switch with small probability
        if random.random() < 0.01:
            self.switch_model()

        return self.current_model(x)

    def adaptive_switching(self, x, anomaly_score):
        """
        Switch based on anomaly detection
        """
        if anomaly_score > 0.7:
            # High anomaly - likely attack
            self.switch_model()

            # Also apply input transformation
            x = self.randomize_input(x)

        return self.predict(x)

    @staticmethod
    def randomize_input(x):
        """
        Apply random transformation to input
        """
        transforms_list = [
            lambda x: x + torch.randn_like(x) * 0.005,
            lambda x: torch.clamp(x * 1.1, 0, 1),
            lambda x: torch.clamp(x * 0.9, 0, 1),
            lambda x: torch.roll(x, shifts=1, dims=2),
        ]

        transform = random.choice(transforms_list)
        return transform(x)

# Gradient Masking Defense
class GradientMaskingDefense(nn.Module):
    """
    Defense through gradient obfuscation
    Note: This is often broken by stronger attacks
    """
    def __init__(self, model, temperature=10):
        super().__init__()
        self.model = model
        self.temperature = temperature

    def forward(self, x, training=False):
        # Add noise during inference
        if not training:
            x = x + torch.randn_like(x) * 0.01

        # Get logits
        logits = self.model(x)

        # Apply temperature scaling
        if not training:
            logits = logits / self.temperature

        return logits

    def stochastic_forward(self, x, n_samples=10):
        """
        Stochastic predictions to hide gradients
        """
        predictions = []

        for _ in range(n_samples):
            # Random dropout and noise
            noise = torch.randn_like(x) * 0.01
            pred = self.forward(x + noise)
            predictions.append(F.softmax(pred, dim=1))

        # Average predictions
        return torch.stack(predictions).mean(dim=0)`,
            language: 'python',
            explanation: 'Ensemble defenses and moving target strategies increase attack complexity through diversity and unpredictability.'
          }
        ]
      },
      {
        title: 'Privacy-Preserving Defenses',
        content: `Privacy-preserving techniques protect against data extraction and model inversion attacks while maintaining utility. These methods ensure that sensitive information cannot be recovered from model outputs or parameters.

**Privacy Techniques:**
1. **Differential Privacy** - Add calibrated noise to guarantee privacy
2. **Federated Learning** - Train without centralizing data
3. **Secure Multi-party Computation** - Compute on encrypted data
4. **Homomorphic Encryption** - Process encrypted inputs
5. **Knowledge Distillation** - Transfer knowledge without data

**Privacy Metrics:**
- Privacy budget (ε, δ)
- Membership inference accuracy
- Attribute inference risk
- Data reconstruction error
- Information leakage bounds`,
        examples: [
          {
            code: `import torch
import torch.nn as nn
import numpy as np
from torch.nn.utils import clip_grad_norm_

class DifferentiallyPrivateTraining:
    """
    Train models with differential privacy guarantees
    """
    def __init__(self, model, epsilon=1.0, delta=1e-5,
                 noise_multiplier=1.0, max_grad_norm=1.0):
        """
        Args:
            model: Model to train
            epsilon: Privacy budget
            delta: Privacy failure probability
            noise_multiplier: Gaussian noise scale
            max_grad_norm: Gradient clipping threshold
        """
        self.model = model
        self.epsilon = epsilon
        self.delta = delta
        self.noise_multiplier = noise_multiplier
        self.max_grad_norm = max_grad_norm

    def private_sgd_step(self, data_loader, optimizer, epoch):
        """
        One epoch of differentially private SGD
        """
        self.model.train()

        for batch_idx, (data, target) in enumerate(data_loader):
            optimizer.zero_grad()

            # Per-sample gradient computation
            per_sample_grads = self.compute_per_sample_gradients(
                data, target
            )

            # Clip gradients
            clipped_grads = self.clip_gradients(per_sample_grads)

            # Add noise
            noisy_grads = self.add_noise(clipped_grads)

            # Apply gradients
            self.apply_gradients(noisy_grads, optimizer)

    def compute_per_sample_gradients(self, data, target):
        """
        Compute gradients for each sample individually
        """
        per_sample_grads = []

        for x, y in zip(data, target):
            self.model.zero_grad()

            output = self.model(x.unsqueeze(0))
            loss = F.cross_entropy(output, y.unsqueeze(0))
            loss.backward()

            # Collect gradients
            grads = []
            for param in self.model.parameters():
                if param.grad is not None:
                    grads.append(param.grad.clone().detach())

            per_sample_grads.append(grads)

        return per_sample_grads

    def clip_gradients(self, per_sample_grads):
        """
        Clip gradients to satisfy sensitivity bound
        """
        clipped_grads = []

        for grads in per_sample_grads:
            # Compute gradient norm
            total_norm = 0
            for g in grads:
                total_norm += g.norm(2).item() ** 2
            total_norm = np.sqrt(total_norm)

            # Clip if necessary
            clip_coef = min(1, self.max_grad_norm / (total_norm + 1e-6))

            clipped = []
            for g in grads:
                clipped.append(g * clip_coef)

            clipped_grads.append(clipped)

        return clipped_grads

    def add_noise(self, clipped_grads):
        """
        Add Gaussian noise for privacy
        """
        # Average gradients
        avg_grads = []
        n_samples = len(clipped_grads)

        for param_idx in range(len(clipped_grads[0])):
            param_grads = [grads[param_idx] for grads in clipped_grads]
            avg_grad = torch.stack(param_grads).mean(dim=0)

            # Add scaled Gaussian noise
            noise_std = self.noise_multiplier * self.max_grad_norm / n_samples
            noise = torch.randn_like(avg_grad) * noise_std

            avg_grads.append(avg_grad + noise)

        return avg_grads

    def apply_gradients(self, noisy_grads, optimizer):
        """
        Apply noisy gradients to model parameters
        """
        for param, grad in zip(self.model.parameters(), noisy_grads):
            param.grad = grad

        optimizer.step()

    def compute_privacy_spent(self, epochs, batch_size, dataset_size):
        """
        Compute total privacy budget spent
        """
        from autodp import privacy_calibrator

        # Compute privacy using RDP accountant
        steps = epochs * (dataset_size // batch_size)

        # This is simplified; use proper privacy accounting
        epsilon_spent = steps * self.noise_multiplier * np.sqrt(
            2 * np.log(1.25 / self.delta)
        ) / dataset_size

        return min(epsilon_spent, self.epsilon)

# PATE (Private Aggregation of Teacher Ensembles)
class PATEDefense:
    """
    Privacy-preserving knowledge transfer
    """
    def __init__(self, teacher_models, epsilon=1.0):
        self.teachers = teacher_models
        self.epsilon = epsilon
        self.student = None

    def aggregate_teachers(self, x, noise_scale=1.0):
        """
        Aggregate teacher predictions with privacy
        """
        # Get votes from all teachers
        votes = torch.zeros(len(x), 10)  # Assuming 10 classes

        for teacher in self.teachers:
            teacher.eval()
            with torch.no_grad():
                preds = teacher(x).argmax(dim=1)
                for i, pred in enumerate(preds):
                    votes[i, pred] += 1

        # Add Laplace noise for privacy
        noise = torch.from_numpy(
            np.random.laplace(0, noise_scale, votes.shape)
        ).float()

        noisy_votes = votes + noise

        # Return noisy argmax
        return noisy_votes.argmax(dim=1)

    def train_student(self, public_data, epochs=50):
        """
        Train student model on public data with private labels
        """
        # Initialize student model
        self.student = self.create_student_model()

        optimizer = torch.optim.Adam(self.student.parameters())

        for epoch in range(epochs):
            # Get private labels from teachers
            private_labels = self.aggregate_teachers(
                public_data,
                noise_scale=1.0/self.epsilon
            )

            # Train student
            self.student.train()
            outputs = self.student(public_data)
            loss = F.cross_entropy(outputs, private_labels)

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

    def create_student_model(self):
        """
        Create student model architecture
        """
        return nn.Sequential(
            nn.Linear(784, 256),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(128, 10)
        )

# Output Perturbation
class OutputPerturbation:
    """
    Add noise to model outputs for privacy
    """
    def __init__(self, model, sensitivity=1.0, epsilon=1.0):
        self.model = model
        self.sensitivity = sensitivity
        self.epsilon = epsilon

    def private_predict(self, x):
        """
        Make private predictions
        """
        # Get original predictions
        self.model.eval()
        with torch.no_grad():
            outputs = self.model(x)
            probs = F.softmax(outputs, dim=1)

        # Add Laplace noise
        noise_scale = self.sensitivity / self.epsilon
        noise = torch.from_numpy(
            np.random.laplace(0, noise_scale, probs.shape)
        ).float()

        # Add noise and renormalize
        noisy_probs = probs + noise
        noisy_probs = torch.clamp(noisy_probs, min=0)
        noisy_probs = noisy_probs / noisy_probs.sum(dim=1, keepdim=True)

        return noisy_probs`,
            language: 'python',
            explanation: 'Privacy-preserving defenses like differential privacy and PATE protect against data extraction while maintaining model utility.'
          }
        ]
      }
    ],

    keyTakeaways: [
      'Defense-in-depth strategies combine multiple protective layers for comprehensive security',
      'Adversarial training improves robustness but requires careful balancing with clean accuracy',
      'Input validation and sanitization provide crucial first-line defense against attacks',
      'Certified defenses offer provable guarantees but often with accuracy trade-offs',
      'Ensemble methods increase attack difficulty through diversity and unpredictability',
      'Privacy-preserving techniques protect against data extraction and model inversion',
      'No single defense is perfect against all attacks - layered approaches are essential',
      'Trade-offs exist between robustness, accuracy, privacy, and computational cost',
      'Continuous monitoring and updating of defenses is necessary as threats evolve',
      'Understanding both attacks and defenses is crucial for building secure AI systems'
    ],

    practiceQuestions: [
      {
        question: 'Why is adversarial training with PGD more effective than training with FGSM examples?',
        hint: 'Consider the strength of the adversarial examples generated.',
        answer: 'PGD generates stronger adversarial examples through iterative optimization, providing more robust training signals. Training with PGD examples forces the model to be robust against a wider range of perturbations, while FGSM only provides single-step perturbations that may not explore the full adversarial space. This leads to better generalization against various attack methods.',
        difficulty: 'intermediate'
      },
      {
        question: 'What are the key trade-offs when implementing certified defenses like randomized smoothing?',
        hint: 'Think about guarantees vs performance.',
        answer: 'Certified defenses face several trade-offs: 1) Certified radius vs clean accuracy - larger certified regions often reduce accuracy, 2) Computational cost - certification requires many forward passes, 3) Scalability - some methods dont scale to large networks, 4) Tightness of bounds - looser bounds are faster but less useful, 5) Training time - certified training is much slower than standard training. The key is finding the right balance for your specific application.',
        difficulty: 'advanced'
      },
      {
        question: 'How can you detect if an input has been adversarially perturbed without knowing the attack method?',
        hint: 'Consider statistical properties and model behavior.',
        answer: 'Detection strategies include: 1) Statistical analysis - adversarial examples often have different statistical properties than natural images, 2) Reconstruction error - autoencoders trained on clean data show higher reconstruction error for adversarial inputs, 3) Prediction consistency - check if predictions are stable under small random perturbations, 4) Feature analysis - examine intermediate layer activations for anomalies, 5) Ensemble disagreement - multiple models often disagree on adversarial examples, 6) Input transformations - apply various transformations and check prediction stability.',
        difficulty: 'advanced'
      }
    ]
  }
};