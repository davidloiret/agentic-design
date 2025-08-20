#!/usr/bin/env python3

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

import asyncio
from src.domain.entities import OptimizationRequest, PromptTemplate, TrainingExample, OptimizationStrategy
from src.infrastructure.advanced_dspy_optimizer import AdvancedDSPyOptimizer
from dotenv import load_dotenv

load_dotenv()

async def test_native_dspy():
    print("🧪 Testing native DSPy evaluation system...")
    
    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        print("❌ No OpenAI API key found!")
        return
    
    optimizer = AdvancedDSPyOptimizer(
        openai_api_key=openai_api_key,
        default_model="gpt-4o-mini"
    )
    
    # Use the same logical reasoning test case that was failing
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
    
    request = OptimizationRequest(
        prompt_template=template,
        training_data=training_data,
        strategy=OptimizationStrategy.BOOTSTRAP_FEWSHOT,
        max_iterations=5
    )
    
    print("🔧 Testing DSPy native metric function...")
    
    # Test the new DSPy metric
    signature = optimizer._create_dspy_signature(template.template)
    print(f"Signature: {signature}")
    
    examples = optimizer._convert_to_dspy_examples(training_data, signature)
    metric = optimizer._create_metric_function("accuracy")
    
    print(f"Built {len(examples)} examples")
    
    # Test metric function directly
    import dspy
    predictor = dspy.ChainOfThought(signature)
    
    print("\n🧪 Testing metric function on individual examples...")
    for i, example in enumerate(examples):
        print(f"\n--- Example {i+1} ---")
        print(f"Example: {example}")
        
        # Make prediction
        prediction = predictor(facts=example.facts, question=example.question)
        print(f"Prediction: {prediction}")
        
        # Test metric
        score = metric(example, prediction)
        print(f"Metric score: {score}")
    
    # Test full DSPy evaluation
    print(f"\n🚀 Testing full DSPy evaluation...")
    evaluator = dspy.Evaluate(devset=examples, metric=metric, num_threads=1, display_progress=True)
    overall_score = evaluator(predictor)
    print(f"Overall evaluation score: {overall_score}")
    
    if overall_score > 0:
        print("✅ Native DSPy evaluation working!")
        
        # Now test full optimization
        print(f"\n🚀 Running full bootstrap optimization...")
        result = await optimizer.optimize_prompt(request)
        print(f"✅ Optimization completed with score: {result.performance_score}")
    else:
        print("❌ Still getting 0% - need more debugging")

if __name__ == "__main__":
    asyncio.run(test_native_dspy())