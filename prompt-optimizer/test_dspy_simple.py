#!/usr/bin/env python3

import dspy
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure DSPy with OpenAI
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    print("ERROR: No OpenAI API key found!")
    exit(1)

print(f"Using API key: {openai_api_key[:10]}...")

try:
    # Create language model
    lm = dspy.LM('openai/gpt-3.5-turbo', api_key=openai_api_key)
    dspy.configure(lm=lm)
    print("✅ DSPy configured successfully")
    
    # Create a simple signature and predictor
    signature = "question -> answer"
    predictor = dspy.ChainOfThought(signature)
    print(f"✅ Created predictor with signature: {signature}")
    
    # Test prediction
    question = "What is 2+2?"
    print(f"🧪 Testing with question: {question}")
    
    result = predictor(question=question)
    print(f"✅ Raw result: {result}")
    print(f"✅ Result type: {type(result)}")
    print(f"✅ Result attributes: {dir(result)}")
    
    if hasattr(result, 'answer'):
        print(f"✅ Answer: {result.answer}")
    else:
        print("❌ No 'answer' attribute found")
        
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()