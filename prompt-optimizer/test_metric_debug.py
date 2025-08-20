#!/usr/bin/env python3

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

import asyncio
import dspy
from src.domain.entities import OptimizationRequest, PromptTemplate, TrainingExample, OptimizationStrategy
from src.infrastructure.advanced_dspy_optimizer import AdvancedDSPyOptimizer
from dotenv import load_dotenv

load_dotenv()

async def test_metric_debug():
    print("🐛 Debugging metric function...")
    
    # Get API key
    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        print("❌ No OpenAI API key found!")
        return
    
    # Initialize optimizer
    optimizer = AdvancedDSPyOptimizer(
        openai_api_key=openai_api_key,
        default_model="gpt-4o-mini"
    )
    
    # Test with the same problematic logical reasoning data
    template = PromptTemplate(
        template="Based on the given facts, answer the question with logical reasoning.\n\nFacts: {facts}\nQuestion: {question}\nAnswer:",
        description="Logical reasoning"
    )
    
    training_data = [
        TrainingExample(
            inputs={"facts": "All programmers know Python. Sam is a programmer. Python is a programming language.", "question": "Does Sam know Python?"}, 
            expected_output="Yes"
        ),
        TrainingExample(
            inputs={"facts": "If it rains, the grass gets wet. The grass is not wet. It might rain tomorrow.", "question": "Did it rain today?"}, 
            expected_output="No"
        ),
        TrainingExample(
            inputs={"facts": "Every student who studies hard passes the exam. John studied hard. Mary did not study.", "question": "Will John pass the exam?"}, 
            expected_output="Yes"
        ),
    ]
    
    # Test signature and example creation
    signature = optimizer._create_dspy_signature(template.template)
    print(f"Signature: {signature}")
    
    examples = optimizer._convert_to_dspy_examples(training_data, signature)
    print(f"Examples built: {len(examples)}")
    
    # Test what the model actually predicts vs expected
    print("\n🧪 Testing actual model predictions vs expected outputs...")
    
    predictor = dspy.ChainOfThought(signature)
    
    for i, example in enumerate(examples[:3]):  # Test first 3
        print(f"\n--- Example {i+1} ---")
        print(f"Facts: {example.facts}")
        print(f"Question: {example.question}")
        print(f"Expected: {example.answer}")
        
        # Get actual prediction
        try:
            prediction = predictor(facts=example.facts, question=example.question)
            actual_answer = getattr(prediction, 'answer', 'NO_ANSWER_FIELD')
            print(f"Actual: '{actual_answer}'")
            
            # Test metric function
            metric_func = optimizer._accuracy_metric
            result = metric_func(example, prediction)
            print(f"Metric result: {result}")
            
            # Test what the extraction functions see
            pred_extracted = optimizer._extract_prediction(prediction)
            target_extracted = optimizer._extract_target(example)
            print(f"Pred extracted: '{pred_extracted}'")
            print(f"Target extracted: '{target_extracted}'")
            
            # Test similarity
            similarity = optimizer._calculate_similarity(str(pred_extracted).lower().strip(), str(target_extracted).lower().strip())
            print(f"Similarity: {similarity}")
            
        except Exception as e:
            print(f"❌ Prediction failed: {e}")
            import traceback
            traceback.print_exc()
    
    print("\n🔧 Testing metric function improvements...")
    
    # Test with manual examples
    class MockPrediction:
        def __init__(self, answer):
            self.answer = answer
    
    class MockExample:
        def __init__(self, answer):
            self.answer = answer
            self._store = {"answer": answer}
    
    test_cases = [
        ("Yes", "Yes", True),
        ("Yes", "yes", True),
        ("Yes", "Yes, Sam knows Python.", True),
        ("Yes", "The answer is yes", True),
        ("Yes", "No", False),
        ("Cannot determine (could be a penguin or another Antarctic bird)", "Cannot determine", True),
        ("Cannot determine (could be a penguin or another Antarctic bird)", "I cannot determine this", True),
        ("4 PM", "4 PM", True),
        ("4 PM", "The meeting is at 4 PM", True),
    ]
    
    metric_func = optimizer._accuracy_metric
    
    for pred_text, target_text, expected in test_cases:
        pred = MockPrediction(pred_text)
        target = MockExample(target_text)
        result = metric_func(target, pred)
        status = "✅" if result == expected else "❌"
        print(f"{status} '{pred_text}' vs '{target_text}' -> {result} (expected {expected})")

if __name__ == "__main__":
    asyncio.run(test_metric_debug())