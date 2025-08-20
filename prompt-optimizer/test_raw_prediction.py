#!/usr/bin/env python3

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

import asyncio
from src.infrastructure.advanced_dspy_optimizer import AdvancedDSPyOptimizer
from dotenv import load_dotenv

load_dotenv()

async def test_raw_vs_dspy():
    print("🧪 Testing RAW vs DSPy predictions...")
    
    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        print("❌ No OpenAI API key found!")
        return
    
    optimizer = AdvancedDSPyOptimizer(
        openai_api_key=openai_api_key,
        default_model="gpt-4o-mini"
    )
    
    # Test template
    template = "Based on the given facts, answer the question with logical reasoning.\n\nFacts: {facts}\nQuestion: {question}\nAnswer:"
    
    inputs = {
        "facts": "All programmers know Python. Sam is a programmer. Python is a programming language.",
        "question": "Does Sam know Python?"
    }
    
    print("📋 Template:", template)
    print("📋 Inputs:", inputs)
    
    # Test 1: RAW prediction (truly unoptimized)
    print("\n🔥 RAW PREDICTION (No DSPy):")
    try:
        raw_result = await optimizer.predict_without_optimization(template, inputs)
        print(f"✅ Raw result: {raw_result}")
        print(f"✅ Raw output: {raw_result['outputs']['raw_response']}")
        print(f"✅ Method used: {raw_result['trace']['method']}")
        print(f"✅ DSPy used: {raw_result['trace']['dspy_used']}")
    except Exception as e:
        print(f"❌ Raw prediction failed: {e}")
        import traceback
        traceback.print_exc()
    
    # Test 2: DSPy prediction (with some optimization)
    print("\n⚡ DSPy PREDICTION:")
    try:
        # Create a DSPy predictor for comparison
        import dspy
        signature = optimizer._create_dspy_signature(template)
        predictor = dspy.ChainOfThought(signature)
        
        print(f"DSPy signature: {signature}")
        
        prediction = predictor(**inputs)
        print(f"✅ DSPy prediction: {prediction}")
        if hasattr(prediction, 'answer'):
            print(f"✅ DSPy answer: {prediction.answer}")
        if hasattr(prediction, 'reasoning'):
            print(f"✅ DSPy reasoning: {prediction.reasoning}")
            
    except Exception as e:
        print(f"❌ DSPy prediction failed: {e}")
        import traceback
        traceback.print_exc()
    
    print("\n🎯 Now we have TRUE comparison:")
    print("- RAW: Direct string interpolation + OpenAI API call")
    print("- DSPy: Signature processing + Chain of Thought + demonstrations")

if __name__ == "__main__":
    asyncio.run(test_raw_vs_dspy())