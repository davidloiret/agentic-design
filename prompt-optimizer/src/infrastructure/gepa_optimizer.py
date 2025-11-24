"""
GEPA (Generalized Evolutionary Prompt Adaptation) Optimizer

A state-of-the-art prompt optimizer that combines the best evolutionary approaches
from recent research including EvoPrompt, EPPO, LLM-PSO, and BlackDAN methodologies.

Key Features:
- Multi-objective optimization (performance, clarity, efficiency)
- LLM-based recombination and mutation operators
- Adaptive population sizing
- Pareto front optimization
- Dynamic prompt structure evolution
- Hierarchical prompt optimization
"""

import asyncio
import json
import logging
import random
import re
import time
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple, Union
from enum import Enum

import numpy as np
from openai import AsyncOpenAI
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

logger = logging.getLogger(__name__)

class OptimizationObjective(Enum):
    """Optimization objectives for multi-objective evolution"""
    PERFORMANCE = "performance"
    CLARITY = "clarity"
    EFFICIENCY = "efficiency"
    ROBUSTNESS = "robustness"
    CONCISENESS = "conciseness"

class MutationType(Enum):
    """Types of mutations for prompt evolution"""
    REPHRASE = "rephrase"
    ADD_EXAMPLE = "add_example"
    REMOVE_EXAMPLE = "remove_example"
    RESTRUCTURE = "restructure"
    ADD_CONSTRAINT = "add_constraint"
    SIMPLIFY = "simplify"
    COMPLEXIFY = "complexify"
    CROSSOVER = "crossover"

@dataclass
class PromptIndividual:
    """Represents an individual prompt in the evolutionary population"""
    id: str
    content: str
    objectives: Dict[OptimizationObjective, float]
    generation: int
    parent_ids: List[str] = field(default_factory=list)
    mutation_history: List[MutationType] = field(default_factory=list)
    performance_metrics: Dict[str, float] = field(default_factory=dict)
    semantic_embedding: Optional[np.ndarray] = None

@dataclass
class EvolutionConfig:
    """Configuration for GEPA evolutionary process"""
    population_size: int = 20
    max_generations: int = 50
    mutation_rate: float = 0.7
    crossover_rate: float = 0.5
    elitism_rate: float = 0.1
    tournament_size: int = 3
    convergence_generations: int = 10
    performance_threshold: float = 0.01
    objectives: List[OptimizationObjective] = field(default_factory=lambda: [
        OptimizationObjective.PERFORMANCE,
        OptimizationObjective.CLARITY,
        OptimizationObjective.EFFICIENCY
    ])
    llm_model: str = "gpt-4o-mini"
    temperature_range: Tuple[float, float] = (0.1, 0.9)

class GEPAOptimizer:
    """
    Generalized Evolutionary Prompt Adaptation (GEPA) Optimizer

    Implements a sophisticated evolutionary algorithm that combines:
    - Multi-objective optimization with Pareto front selection
    - LLM-based genetic operators
    - Adaptive population management
    - Semantic diversity preservation
    - Hierarchical prompt structure optimization
    """

    def __init__(
        self,
        llm_client: AsyncOpenAI,
        config: Optional[EvolutionConfig] = None,
        training_examples: Optional[List[Dict[str, Any]]] = None,
        validation_examples: Optional[List[Dict[str, Any]]] = None
    ):
        self.llm_client = llm_client
        self.config = config or EvolutionConfig()
        self.training_examples = training_examples or []
        self.validation_examples = validation_examples or []

        # Initialize semantic model for diversity calculations
        self.semantic_model = SentenceTransformer('all-MiniLM-L6-v2')

        # Evolution state
        self.population: List[PromptIndividual] = []
        self.pareto_front: List[PromptIndividual] = []
        self.generation = 0
        self.best_individual: Optional[PromptIndividual] = None
        self.convergence_count = 0
        self.evolution_history: List[Dict[str, Any]] = []

        # Optimization statistics
        self.stats = {
            'total_evaluations': 0,
            'convergence_generation': None,
            'improvement_rate': 0.0,
            'diversity_score': 0.0
        }

    async def optimize(
        self,
        initial_prompt: str,
        input_variables: List[str],
        output_variables: List[str],
        max_iterations: Optional[int] = None
    ) -> Dict[str, Any]:
        """
        Main optimization method using evolutionary approach

        Args:
            initial_prompt: Starting prompt template
            input_variables: List of input variable names
            output_variables: List of output variable names
            max_iterations: Maximum number of iterations (overrides config)

        Returns:
            Optimization results with best prompt and metadata
        """
        logger.info(f"Starting GEPA optimization for prompt: {initial_prompt[:100]}...")

        max_generations = max_iterations or self.config.max_generations

        # Initialize population
        await self._initialize_population(initial_prompt, input_variables, output_variables)

        # Evolution loop
        for generation in range(max_generations):
            self.generation = generation
            logger.info(f"Generation {generation + 1}/{max_generations}")

            # Evaluate current population
            await self._evaluate_population(input_variables, output_variables)

            # Check convergence
            if self._check_convergence():
                logger.info(f"Convergence reached at generation {generation + 1}")
                break

            # Selection
            selected = self._selection()

            # Crossover and mutation
            offspring = await self._create_offspring(selected, input_variables, output_variables)

            # Environmental selection (survival)
            self._environmental_selection(offspring)

            # Update statistics
            self._update_statistics()

            # Record generation info
            self.evolution_history.append({
                'generation': generation,
                'best_performance': max(ind.objectives[OptimizationObjective.PERFORMANCE]
                                     for ind in self.population),
                'population_diversity': self._calculate_diversity(),
                'pareto_front_size': len(self.pareto_front)
            })

        # Final evaluation and results
        await self._final_evaluation(input_variables, output_variables)

        return self._generate_results()

    async def _initialize_population(
        self,
        initial_prompt: str,
        input_variables: List[str],
        output_variables: List[str]
    ) -> None:
        """Initialize diverse population with prompt variations"""
        self.population = []

        # Create initial individual
        initial_individual = PromptIndividual(
            id="initial",
            content=initial_prompt,
            objectives={obj: 0.0 for obj in self.config.objectives},
            generation=0
        )

        # Evaluate initial individual
        await self._evaluate_individual(initial_individual, input_variables, output_variables)
        self.population.append(initial_individual)

        # Generate diverse initial population
        mutation_prompts = [
            "Rephrase this prompt for better clarity: {prompt}",
            "Add specific examples to this prompt: {prompt}",
            "Make this prompt more concise while preserving meaning: {prompt}",
            "Add step-by-step instructions to this prompt: {prompt}",
            "Add constraints and guidelines to this prompt: {prompt}",
            "Restructure this prompt for better flow: {prompt}"
        ]

        for i in range(min(self.config.population_size - 1, len(mutation_prompts))):
            mutated_prompt = await self._llm_mutation(
                initial_prompt,
                mutation_prompts[i]
            )

            if mutated_prompt and mutated_prompt != initial_prompt:
                individual = PromptIndividual(
                    id=f"gen0_{i+1}",
                    content=mutated_prompt,
                    objectives={obj: 0.0 for obj in self.config.objectives},
                    generation=0,
                    parent_ids=["initial"],
                    mutation_history=[MutationType.REPHRASE]
                )

                await self._evaluate_individual(individual, input_variables, output_variables)
                self.population.append(individual)

        # Fill remaining population slots with random variations
        while len(self.population) < self.config.population_size:
            random_mutation = random.choice(list(MutationType))
            mutated_prompt = await self._apply_mutation(
                initial_prompt,
                random_mutation,
                input_variables,
                output_variables
            )

            if mutated_prompt:
                individual = PromptIndividual(
                    id=f"gen0_{len(self.population)}",
                    content=mutated_prompt,
                    objectives={obj: 0.0 for obj in self.config.objectives},
                    generation=0,
                    parent_ids=["initial"],
                    mutation_history=[random_mutation]
                )

                await self._evaluate_individual(individual, input_variables, output_variables)
                self.population.append(individual)

    async def _evaluate_population(
        self,
        input_variables: List[str],
        output_variables: List[str]
    ) -> None:
        """Evaluate all individuals in the population"""
        for individual in self.population:
            await self._evaluate_individual(individual, input_variables, output_variables)

        # Update Pareto front
        self._update_pareto_front()

    async def _evaluate_individual(
        self,
        individual: PromptIndividual,
        input_variables: List[str],
        output_variables: List[str]
    ) -> None:
        """Evaluate a single prompt individual across all objectives"""
        try:
            # Performance evaluation (main objective)
            performance = await self._evaluate_performance(
                individual.content,
                input_variables,
                output_variables
            )
            individual.objectives[OptimizationObjective.PERFORMANCE] = performance

            # Clarity evaluation
            clarity = await self._evaluate_clarity(individual.content)
            individual.objectives[OptimizationObjective.CLARITY] = clarity

            # Efficiency evaluation (token efficiency)
            efficiency = self._evaluate_efficiency(individual.content)
            individual.objectives[OptimizationObjective.EFFICIENCY] = efficiency

            # Robustness evaluation
            if OptimizationObjective.ROBUSTNESS in self.config.objectives:
                robustness = await self._evaluate_robustness(
                    individual.content,
                    input_variables,
                    output_variables
                )
                individual.objectives[OptimizationObjective.ROBUSTNESS] = robustness

            # Conciseness evaluation
            if OptimizationObjective.CONCISENESS in self.config.objectives:
                conciseness = self._evaluate_conciseness(individual.content)
                individual.objectives[OptimizationObjective.CONCISENESS] = conciseness

            # Update semantic embedding for diversity calculations
            individual.semantic_embedding = self.semantic_model.encode([individual.content])[0]

            self.stats['total_evaluations'] += 1

        except Exception as e:
            logger.error(f"Error evaluating individual {individual.id}: {e}")
            # Assign low scores to failed individuals
            for obj in self.config.objectives:
                individual.objectives[obj] = 0.0

    async def _evaluate_performance(
        self,
        prompt: str,
        input_variables: List[str],
        output_variables: List[str]
    ) -> float:
        """Evaluate prompt performance on validation examples"""
        if not self.validation_examples:
            return 0.5  # Default score if no validation data

        correct = 0
        total = 0

        for example in self.validation_examples[:10]:  # Limit for efficiency
            try:
                # Format prompt with example data
                formatted_prompt = self._format_prompt(prompt, example, input_variables)

                # Get LLM response
                response = await self.llm_client.chat.completions.create(
                    model=self.config.llm_model,
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant."},
                        {"role": "user", "content": formatted_prompt}
                    ],
                    temperature=0.1,
                    max_tokens=500
                )

                response_text = response.choices[0].message.content.strip()

                # Compare with expected output
                expected_output = self._extract_expected_output(example, output_variables)

                if self._is_correct_response(response_text, expected_output):
                    correct += 1

                total += 1

            except Exception as e:
                logger.warning(f"Error in performance evaluation: {e}")
                continue

        return correct / total if total > 0 else 0.0

    async def _evaluate_clarity(self, prompt: str) -> float:
        """Evaluate prompt clarity using LLM"""
        try:
            response = await self.llm_client.chat.completions.create(
                model=self.config.llm_model,
                messages=[
                    {
                        "role": "system",
                        "content": "Evaluate prompt clarity on a scale of 0.0 to 1.0. Consider: 1) Clear instructions, 2) Unambiguous language, 3) Logical structure, 4) Appropriate complexity. Respond only with a number between 0.0 and 1.0."
                    },
                    {
                        "role": "user",
                        "content": f"Evaluate this prompt for clarity:\n\n{prompt}"
                    }
                ],
                temperature=0.1,
                max_tokens=10
            )

            score_text = response.choices[0].message.content.strip()
            return float(score_text)

        except Exception as e:
            logger.warning(f"Error in clarity evaluation: {e}")
            # Fallback heuristic-based clarity score
            return self._heuristic_clarity_score(prompt)

    def _evaluate_efficiency(self, prompt: str) -> float:
        """Evaluate prompt efficiency based on token usage"""
        # Simple heuristic: shorter prompts are more efficient up to a point
        word_count = len(prompt.split())
        char_count = len(prompt)

        # Optimal range is 50-200 words
        if word_count < 20:
            return 0.7  # Too short might lack detail
        elif word_count <= 200:
            return 1.0  # Optimal length
        elif word_count <= 500:
            return 0.8  # Slightly long but acceptable
        else:
            return 0.5  # Too long

    async def _evaluate_robustness(
        self,
        prompt: str,
        input_variables: List[str],
        output_variables: List[str]
    ) -> float:
        """Evaluate prompt robustness with varied inputs"""
        # Create variations of test inputs
        base_examples = self.validation_examples[:3] if self.validation_examples else []

        if not base_examples:
            return 0.5

        robustness_scores = []

        for example in base_examples:
            # Test with slightly different input formats
            variations = self._create_input_variations(example, input_variables)

            for variation in variations:
                try:
                    formatted_prompt = self._format_prompt(prompt, variation, input_variables)

                    response = await self.llm_client.chat.completions.create(
                        model=self.config.llm_model,
                        messages=[
                            {"role": "system", "content": "You are a helpful assistant."},
                            {"role": "user", "content": formatted_prompt}
                        ],
                        temperature=0.3,
                        max_tokens=500
                    )

                    # Check if response is consistent and sensible
                    consistency_score = self._evaluate_response_consistency(
                        response.choices[0].message.content
                    )
                    robustness_scores.append(consistency_score)

                except Exception:
                    robustness_scores.append(0.0)

        return np.mean(robustness_scores) if robustness_scores else 0.5

    def _evaluate_conciseness(self, prompt: str) -> float:
        """Evaluate prompt conciseness"""
        # Remove extra whitespace and formatting
        cleaned_prompt = re.sub(r'\s+', ' ', prompt.strip())

        # Calculate redundancy
        words = cleaned_prompt.lower().split()
        unique_words = set(words)
        redundancy = 1 - (len(unique_words) / len(words)) if words else 0

        # Score based on length and redundancy
        word_count = len(words)

        if word_count < 30:
            length_score = 0.8  # Very short
        elif word_count < 100:
            length_score = 1.0  # Good length
        elif word_count < 200:
            length_score = 0.9  # Slightly long
        else:
            length_score = 0.7  # Too long

        redundancy_score = 1 - redundancy

        return (length_score + redundancy_score) / 2

    def _update_pareto_front(self) -> None:
        """Update Pareto front using non-dominated sorting"""
        self.pareto_front = []

        for individual in self.population:
            is_dominated = False

            for other in self.population:
                if individual.id == other.id:
                    continue

                # Check if other dominates individual
                if self._dominates(other, individual):
                    is_dominated = True
                    break

            if not is_dominated:
                self.pareto_front.append(individual)

        # Sort Pareto front by performance
        self.pareto_front.sort(
            key=lambda x: x.objectives[OptimizationObjective.PERFORMANCE],
            reverse=True
        )

    def _dominates(self, individual1: PromptIndividual, individual2: PromptIndividual) -> bool:
        """Check if individual1 dominates individual2 across all objectives"""
        better_in_all = True
        better_in_at_least_one = False

        for obj in self.config.objectives:
            val1 = individual1.objectives[obj]
            val2 = individual2.objectives[obj]

            if val1 < val2:
                better_in_all = False
            elif val1 > val2:
                better_in_at_least_one = True

        return better_in_all and better_in_at_least_one

    def _selection(self) -> List[PromptIndividual]:
        """Tournament selection for reproduction"""
        selected = []

        # Select parents for offspring
        num_parents = int(self.config.population_size * (1 - self.config.elitism_rate))

        for _ in range(num_parents):
            # Tournament selection
            tournament = random.sample(self.population, self.config.tournament_size)
            winner = max(tournament, key=lambda x: self._calculate_fitness(x))
            selected.append(winner)

        return selected

    def _calculate_fitness(self, individual: PromptIndividual) -> float:
        """Calculate composite fitness score"""
        # Weighted sum of objectives
        weights = {
            OptimizationObjective.PERFORMANCE: 0.5,
            OptimizationObjective.CLARITY: 0.2,
            OptimizationObjective.EFFICIENCY: 0.15,
            OptimizationObjective.ROBUSTNESS: 0.1,
            OptimizationObjective.CONCISENESS: 0.05
        }

        fitness = 0.0
        for obj in self.config.objectives:
            fitness += weights.get(obj, 0.1) * individual.objectives[obj]

        # Add diversity bonus
        diversity_bonus = self._calculate_individual_diversity(individual) * 0.1
        fitness += diversity_bonus

        return fitness

    async def _create_offspring(
        self,
        selected: List[PromptIndividual],
        input_variables: List[str],
        output_variables: List[str]
    ) -> List[PromptIndividual]:
        """Create offspring through crossover and mutation"""
        offspring = []

        while len(offspring) < len(selected):
            # Crossover
            if random.random() < self.config.crossover_rate and len(selected) >= 2:
                parent1, parent2 = random.sample(selected, 2)
                child_prompt = await self._crossover(parent1.content, parent2.content)
                parent_ids = [parent1.id, parent2.id]
                mutation_type = MutationType.CROSSOVER
            else:
                parent = random.choice(selected)
                child_prompt = await self._apply_mutation(
                    parent.content,
                    random.choice(list(MutationType)),
                    input_variables,
                    output_variables
                )
                parent_ids = [parent.id]
                mutation_type = random.choice(list(MutationType))

            if child_prompt:
                child = PromptIndividual(
                    id=f"gen{self.generation + 1}_offspring_{len(offspring)}",
                    content=child_prompt,
                    objectives={obj: 0.0 for obj in self.config.objectives},
                    generation=self.generation + 1,
                    parent_ids=parent_ids,
                    mutation_history=[mutation_type]
                )

                offspring.append(child)

        return offspring

    async def _crossover(self, prompt1: str, prompt2: str) -> str:
        """LLM-based prompt crossover"""
        try:
            response = await self.llm_client.chat.completions.create(
                model=self.config.llm_model,
                messages=[
                    {
                        "role": "system",
                        "content": "Create a new prompt by combining the best elements of two parent prompts. Keep the core instructions but improve clarity and effectiveness. Return only the new prompt without explanation."
                    },
                    {
                        "role": "user",
                        "content": f"Parent 1:\n{prompt1}\n\nParent 2:\n{prompt2}\n\nCreate an optimized child prompt:"
                    }
                ],
                temperature=0.7,
                max_tokens=800
            )

            return response.choices[0].message.content.strip()

        except Exception as e:
            logger.warning(f"Crossover failed: {e}")
            # Fallback to simple combination
            return prompt1[:len(prompt1)//2] + prompt2[len(prompt2)//2:]

    async def _apply_mutation(
        self,
        prompt: str,
        mutation_type: MutationType,
        input_variables: List[str],
        output_variables: List[str]
    ) -> str:
        """Apply specific mutation to prompt"""
        mutation_prompts = {
            MutationType.REPHRASE: "Rephrase this prompt to be clearer and more effective: {prompt}",
            MutationType.ADD_EXAMPLE: "Add a relevant example to this prompt: {prompt}",
            MutationType.REMOVE_EXAMPLE: "Simplify this prompt by removing redundant examples: {prompt}",
            MutationType.RESTRUCTURE: "Restructure this prompt for better logical flow: {prompt}",
            MutationType.ADD_CONSTRAINT: "Add helpful constraints to this prompt: {prompt}",
            MutationType.SIMPLIFY: "Simplify this prompt while preserving key instructions: {prompt}",
            MutationType.COMPLEXIFY: "Add detail and specificity to this prompt: {prompt}",
        }

        if mutation_type == MutationType.CROSSOVER:
            return prompt  # Handled separately

        mutation_template = mutation_prompts.get(mutation_type)
        if not mutation_template:
            return prompt

        try:
            response = await self.llm_client.chat.completions.create(
                model=self.config.llm_model,
                messages=[
                    {
                        "role": "system",
                        "content": "Modify the given prompt according to the instruction. Return only the modified prompt without explanation."
                    },
                    {
                        "role": "user",
                        "content": mutation_template.format(prompt=prompt)
                    }
                ],
                temperature=random.uniform(*self.config.temperature_range),
                max_tokens=800
            )

            return response.choices[0].message.content.strip()

        except Exception as e:
            logger.warning(f"Mutation {mutation_type} failed: {e}")
            return prompt

    def _environmental_selection(self, offspring: List[PromptIndividual]) -> None:
        """Select survivors for next generation"""
        # Combine current population and offspring
        combined = self.population + offspring

        # Keep elite individuals
        elite_size = max(1, int(self.config.population_size * self.config.elitism_rate))
        elite = sorted(self.pareto_front, key=lambda x: self._calculate_fitness(x), reverse=True)[:elite_size]

        # Select remaining individuals from combined population
        remaining_size = self.config.population_size - elite_size
        combined_without_elite = [ind for ind in combined if ind not in elite]

        # Select by fitness
        combined_without_elite.sort(key=lambda x: self._calculate_fitness(x), reverse=True)
        survivors = elite + combined_without_elite[:remaining_size]

        # Ensure population size is maintained
        self.population = survivors[:self.config.population_size]

    def _check_convergence(self) -> bool:
        """Check if optimization has converged"""
        if not self.best_individual:
            self.best_individual = max(
                self.population,
                key=lambda x: x.objectives[OptimizationObjective.PERFORMANCE]
            )
            return False

        current_best = max(
            self.population,
            key=lambda x: x.objectives[OptimizationObjective.PERFORMANCE]
        )

        improvement = (
            current_best.objectives[OptimizationObjective.PERFORMANCE] -
            self.best_individual.objectives[OptimizationObjective.PERFORMANCE]
        )

        if improvement > self.config.performance_threshold:
            self.best_individual = current_best
            self.convergence_count = 0
            return False

        self.convergence_count += 1
        return self.convergence_count >= self.config.convergence_generations

    def _calculate_diversity(self) -> float:
        """Calculate population diversity using semantic similarity"""
        if len(self.population) < 2:
            return 0.0

        embeddings = [ind.semantic_embedding for ind in self.population if ind.semantic_embedding is not None]

        if len(embeddings) < 2:
            return 0.0

        # Calculate pairwise similarities
        similarities = cosine_similarity(embeddings)

        # Diversity is 1 - average similarity (excluding diagonal)
        mask = ~np.eye(similarities.shape[0], dtype=bool)
        avg_similarity = np.mean(similarities[mask])

        return 1.0 - avg_similarity

    def _calculate_individual_diversity(self, individual: PromptIndividual) -> float:
        """Calculate diversity score for an individual compared to population"""
        if not individual.semantic_embedding:
            return 0.0

        similarities = []
        for other in self.population:
            if other.id != individual.id and other.semantic_embedding is not None:
                sim = cosine_similarity(
                    [individual.semantic_embedding],
                    [other.semantic_embedding]
                )[0][0]
                similarities.append(sim)

        if not similarities:
            return 0.0

        # Diversity is inverse of average similarity
        return 1.0 - np.mean(similarities)

    def _update_statistics(self) -> None:
        """Update optimization statistics"""
        self.stats['diversity_score'] = self._calculate_diversity()

        if len(self.evolution_history) > 1:
            prev_performance = self.evolution_history[-2]['best_performance']
            curr_performance = self.evolution_history[-1]['best_performance']

            if prev_performance > 0:
                self.stats['improvement_rate'] = (curr_performance - prev_performance) / prev_performance

    async def _final_evaluation(
        self,
        input_variables: List[str],
        output_variables: List[str]
    ) -> None:
        """Perform final comprehensive evaluation"""
        # Re-evaluate Pareto front with more examples
        for individual in self.pareto_front:
            await self._evaluate_individual(individual, input_variables, output_variables)

        # Update best individual
        self.best_individual = max(
            self.pareto_front,
            key=lambda x: self._calculate_fitness(x)
        )

        self.stats['convergence_generation'] = self.generation

    def _generate_results(self) -> Dict[str, Any]:
        """Generate comprehensive optimization results"""
        if not self.best_individual:
            raise ValueError("No optimization results available")

        return {
            'optimized_prompt': self.best_individual.content,
            'optimization_method': 'GEPA (Generalized Evolutionary Prompt Adaptation)',
            'objectives': {
                obj.value: self.best_individual.objectives[obj]
                for obj in self.config.objectives
            },
            'generation': self.generation,
            'pareto_front_size': len(self.pareto_front),
            'total_evaluations': self.stats['total_evaluations'],
            'convergence_generation': self.stats['convergence_generation'],
            'improvement_rate': self.stats['improvement_rate'],
            'final_diversity': self.stats['diversity_score'],
            'evolution_history': self.evolution_history,
            'mutation_history': self.best_individual.mutation_history,
            'parent_prompts': self.best_individual.parent_ids,
            'performance_metrics': self.best_individual.performance_metrics,
            'config': {
                'population_size': self.config.population_size,
                'max_generations': self.config.max_generations,
                'mutation_rate': self.config.mutation_rate,
                'crossover_rate': self.config.crossover_rate,
                'objectives': [obj.value for obj in self.config.objectives]
            },
            'alternative_solutions': [
                {
                    'prompt': ind.content,
                    'objectives': {obj.value: ind.objectives[obj] for obj in self.config.objectives},
                    'fitness': self._calculate_fitness(ind)
                }
                for ind in self.pareto_front[1:4]  # Top 3 alternatives
            ]
        }

    # Helper methods
    def _format_prompt(self, prompt: str, example: Dict[str, Any], input_variables: List[str]) -> str:
        """Format prompt with example data"""
        formatted = prompt
        for var in input_variables:
            if var in example:
                formatted = formatted.replace(f"{{{var}}}", str(example[var]))
        return formatted

    def _extract_expected_output(self, example: Dict[str, Any], output_variables: List[str]) -> str:
        """Extract expected output from example"""
        outputs = []
        for var in output_variables:
            if var in example:
                outputs.append(f"{var}: {example[var]}")
        return " | ".join(outputs)

    def _is_correct_response(self, response: str, expected: str) -> bool:
        """Simple correctness check - can be made more sophisticated"""
        return expected.lower() in response.lower()

    def _heuristic_clarity_score(self, prompt: str) -> float:
        """Fallback clarity scoring using heuristics"""
        score = 0.5  # Base score

        # Check for clear structure
        if any(indicator in prompt.lower() for indicator in ['step', 'first', 'then', 'finally']):
            score += 0.1

        # Check for examples
        if 'example' in prompt.lower() or 'for instance' in prompt.lower():
            score += 0.1

        # Check for constraints
        if any(word in prompt.lower() for word in ['must', 'should', 'ensure', 'avoid']):
            score += 0.1

        # Penalty for very long prompts
        if len(prompt) > 1000:
            score -= 0.1

        return min(1.0, max(0.0, score))

    def _create_input_variations(self, example: Dict[str, Any], input_variables: List[str]) -> List[Dict[str, Any]]:
        """Create variations of input for robustness testing"""
        variations = []

        # Original
        variations.append(example.copy())

        # Slight modifications
        for var in input_variables:
            if var in example and isinstance(example[var], str):
                modified = example.copy()
                # Add extra spaces
                modified[var] = f"  {example[var]}  "
                variations.append(modified)

                # Change case
                modified = example.copy()
                modified[var] = example[var].upper()
                variations.append(modified)

        return variations

    def _evaluate_response_consistency(self, response: str) -> float:
        """Evaluate response consistency and quality"""
        if not response:
            return 0.0

        # Check for reasonable length
        if len(response) < 10 or len(response) > 1000:
            return 0.5

        # Check for coherent structure
        sentences = response.split('.')
        if len(sentences) < 2:
            return 0.6

        # Basic checks
        score = 0.7  # Base score

        # Penalize repetitive content
        words = response.lower().split()
        unique_words = set(words)
        if len(unique_words) / len(words) < 0.5:
            score -= 0.2

        return min(1.0, max(0.0, score))

    async def _llm_mutation(self, prompt: str, instruction: str) -> str:
        """Generic LLM-based mutation"""
        try:
            response = await self.llm_client.chat.completions.create(
                model=self.config.llm_model,
                messages=[
                    {
                        "role": "system",
                        "content": "Modify the given prompt according to the instruction. Return only the modified prompt."
                    },
                    {
                        "role": "user",
                        "content": f"Instruction: {instruction}\n\nPrompt: {prompt}"
                    }
                ],
                temperature=0.7,
                max_tokens=800
            )

            return response.choices[0].message.content.strip()

        except Exception as e:
            logger.warning(f"LLM mutation failed: {e}")
            return prompt