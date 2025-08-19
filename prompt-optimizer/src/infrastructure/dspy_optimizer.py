import dspy
from typing import Dict, List, Any, Optional
from ..domain.entities import OptimizationRequest, OptimizedPrompt, OptimizationStrategy
from ..domain.ports import PromptOptimizerPort


class DSPyPromptOptimizer(PromptOptimizerPort):
    def __init__(self, model_name: str = "openai/gpt-3.5-turbo"):
        self.model_name = model_name
        self.lm = dspy.LM(model=model_name)
        dspy.configure(lm=self.lm)

    async def optimize_prompt(self, request: OptimizationRequest) -> OptimizedPrompt:
        signature = self._create_signature_from_template(request.prompt_template.template)
        
        predictor = dspy.ChainOfThought(signature)
        
        trainset = self._convert_training_data(request.training_data)
        testset = trainset[int(len(trainset) * (1 - request.validation_split)):]
        trainset = trainset[:int(len(trainset) * (1 - request.validation_split))]
        
        metric = self._create_metric_function(request.metric)
        
        optimizer = self._get_optimizer(request.strategy)
        
        optimized_predictor = optimizer.compile(
            predictor, 
            trainset=trainset, 
            metric=metric,
            num_trials=min(request.max_iterations, 50)
        )
        
        evaluation_results = dspy.Evaluate(
            devset=testset, 
            metric=metric, 
            num_threads=4
        )(optimized_predictor)
        
        optimization_history = []
        performance_score = evaluation_results if isinstance(evaluation_results, (int, float)) else 0.0
        
        return OptimizedPrompt(
            original_template=request.prompt_template.template,
            optimized_template=self._extract_optimized_template(optimized_predictor),
            performance_score=performance_score,
            optimization_history=optimization_history,
            metadata={
                "strategy": request.strategy.value,
                "model": self.model_name,
                "training_examples": len(trainset),
                "test_examples": len(testset),
            }
        )

    async def evaluate_prompt(
        self, prompt: str, test_data: List[Dict[str, Any]]
    ) -> Dict[str, float]:
        signature = self._create_signature_from_template(prompt)
        predictor = dspy.ChainOfThought(signature)
        
        testset = self._convert_training_data([
            {"inputs": item["inputs"], "expected_output": item["expected_output"]}
            for item in test_data
        ])
        
        correct = 0
        total = len(testset)
        
        for example in testset:
            try:
                prediction = predictor(**example.inputs)
                if hasattr(prediction, 'answer') and prediction.answer.strip() == example.expected_output.strip():
                    correct += 1
            except Exception:
                continue
        
        accuracy = correct / total if total > 0 else 0.0
        
        return {
            "accuracy": accuracy,
            "total_examples": total,
            "correct_predictions": correct,
        }

    def _create_signature_from_template(self, template: str) -> str:
        if " -> " in template:
            return template
        
        return "context -> answer"

    def _convert_training_data(self, training_data: List[Dict[str, Any]]) -> List[dspy.Example]:
        examples = []
        for item in training_data:
            example_dict = item["inputs"].copy()
            example_dict["expected_output"] = item["expected_output"]
            examples.append(dspy.Example(**example_dict).with_inputs(*list(item["inputs"].keys())))
        return examples

    def _create_metric_function(self, metric_type: str) -> callable:
        def accuracy_metric(gold, pred, trace=None):
            if hasattr(pred, 'answer') and hasattr(gold, 'expected_output'):
                return pred.answer.strip().lower() == gold.expected_output.strip().lower()
            return False
        
        return accuracy_metric

    def _get_optimizer(self, strategy: OptimizationStrategy):
        if strategy == OptimizationStrategy.BOOTSTRAP_FEWSHOT:
            return dspy.BootstrapFewShot()
        elif strategy == OptimizationStrategy.MIPRO:
            return dspy.MIPRO()
        elif strategy == OptimizationStrategy.COPRO:
            return dspy.COPRO()
        elif strategy == OptimizationStrategy.BOOTSTRAP_FINETUNE:
            return dspy.BootstrapFinetune()
        else:
            return dspy.BootstrapFewShot()

    def _extract_optimized_template(self, predictor) -> str:
        if hasattr(predictor, 'signature'):
            return str(predictor.signature)
        return "Optimized template (extraction not available)"