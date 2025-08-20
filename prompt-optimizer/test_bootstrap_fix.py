#!/usr/bin/env python3

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

import asyncio
from src.domain.entities import OptimizationRequest, PromptTemplate, TrainingExample, OptimizationStrategy
from src.infrastructure.advanced_dspy_optimizer import AdvancedDSPyOptimizer
from dotenv import load_dotenv

load_dotenv()

async def test_bootstrap_fewshot():
    print("🧪 Testing bootstrap_fewshot implementation...")
    
    # Get API key
    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        print("❌ No OpenAI API key found!")
        return
    
    print(f"✅ Using API key: {openai_api_key[:10]}...")
    
    # Initialize optimizer
    optimizer = AdvancedDSPyOptimizer(
        openai_api_key=openai_api_key,
        default_model="gpt-4o-mini"
    )
    
    # Test 1: Single input field case
    print("\n📋 Test 1: Single input field")
    
    template = PromptTemplate(
        template="Classify this text: {text}",
        description="Simple classification"
    )
    
    training_data = [
        TrainingExample(inputs={"text": "I love this product!"}, expected_output="positive"),
        TrainingExample(inputs={"text": "This is terrible"}, expected_output="negative"),
        TrainingExample(inputs={"text": "It's okay, nothing special"}, expected_output="neutral"),
        TrainingExample(inputs={"text": "Amazing quality!"}, expected_output="positive"),
        TrainingExample(inputs={"text": "Worst purchase ever"}, expected_output="negative"),
    ]
    
    request = OptimizationRequest(
        prompt_template=template,
        training_data=training_data,
        strategy=OptimizationStrategy.BOOTSTRAP_FEWSHOT,
        max_iterations=5
    )
    
    # Test example building
    print("🔧 Testing example building...")
    signature = optimizer._create_dspy_signature(template.template)
    print(f"Generated signature: {signature}")
    
    try:
        examples = optimizer._convert_to_dspy_examples(training_data, signature)
        print(f"✅ Built {len(examples)} examples")
        
        # Inspect first example
        first_example = examples[0]
        print(f"First example type: {type(first_example)}")
        print(f"First example: {first_example}")
        
        if hasattr(first_example, '_store'):
            print(f"Example data: {first_example._store}")
        
        # Check if example has correct fields
        expected_fields = ["text", "classification"]  # Based on signature
        for field in expected_fields:
            if hasattr(first_example, field):
                value = getattr(first_example, field)
                print(f"✅ Field '{field}': {value}")
            else:
                print(f"❌ Missing field '{field}'")
        
    except Exception as e:
        print(f"❌ Example building failed: {e}")
        import traceback
        traceback.print_exc()
        return
    
    # Test 2: Full optimization
    print("\n🚀 Test 2: Full bootstrap_fewshot optimization")
    
    try:
        optimized_result = await optimizer.optimize_prompt(request)
        print(f"✅ Optimization completed!")
        print(f"Original: {optimized_result.original_template}")
        print(f"Optimized: {optimized_result.optimized_template}")
        print(f"Performance: {optimized_result.performance_score}")
        print(f"History: {len(optimized_result.optimization_history)} steps")
        
        # Check if we have a predictor
        if optimizer._last_optimized_predictor:
            predictor = optimizer._last_optimized_predictor
            print(f"✅ Predictor created: {type(predictor)}")
            
            if hasattr(predictor, 'demos'):
                print(f"✅ Predictor has {len(predictor.demos)} demos")
            
            # Test prediction
            test_input = {"text": "This movie was fantastic!"}
            print(f"\n🧪 Testing prediction with: {test_input}")
            
            try:
                prediction = predictor(**test_input)
                print(f"✅ Prediction: {prediction}")
                if hasattr(prediction, 'classification'):
                    print(f"✅ Classification: {prediction.classification}")
                if hasattr(prediction, 'reasoning'):
                    print(f"✅ Reasoning: {prediction.reasoning}")
            except Exception as pred_e:
                print(f"❌ Prediction failed: {pred_e}")
        
    except Exception as e:
        print(f"❌ Optimization failed: {e}")
        import traceback
        traceback.print_exc()
        return
    
    # Test 3: Multiple input fields
    print("\n📋 Test 3: Multiple input fields")
    
    multi_template = PromptTemplate(
        template="Given context: {context} and question: {question}, provide an answer.",
        description="QA with context"
    )
    
    multi_training = [
        TrainingExample(
            inputs={"context": "Paris is the capital of France", "question": "What is the capital of France?"}, 
            expected_output="Paris"
        ),
        TrainingExample(
            inputs={"context": "Dogs are mammals", "question": "Are dogs mammals?"}, 
            expected_output="Yes"
        ),
    ]
    
    multi_request = OptimizationRequest(
        prompt_template=multi_template,
        training_data=multi_training,
        strategy=OptimizationStrategy.BOOTSTRAP_FEWSHOT,
        max_iterations=3
    )
    
    try:
        multi_signature = optimizer._create_dspy_signature(multi_template.template)
        print(f"Multi-input signature: {multi_signature}")
        
        multi_examples = optimizer._convert_to_dspy_examples(multi_training, multi_signature)
        print(f"✅ Built {len(multi_examples)} multi-input examples")
        
        # Check first multi example
        first_multi = multi_examples[0]
        print(f"Multi example: {first_multi}")
        if hasattr(first_multi, '_store'):
            print(f"Multi example data: {first_multi._store}")
            
    except Exception as e:
        print(f"❌ Multi-input test failed: {e}")
        import traceback
        traceback.print_exc()
    
    print("\n✅ Bootstrap fewshot test completed!")

if __name__ == "__main__":
    asyncio.run(test_bootstrap_fewshot())