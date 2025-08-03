#!/usr/bin/env python3
"""
Test script to verify tsx integration in the TypeScript VM
"""

import asyncio
import json
import aiohttp
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def test_tsx_execution():
    """Test TypeScript execution using tsx"""
    
    # Simple TypeScript code with modern syntax
    test_cases = [
        {
            "name": "Basic TypeScript with types",
            "code": """
const message: string = "Hello from tsx!";
const numbers: number[] = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
console.log(`${message} Sum: ${sum}`);
""",
            "expected_in_output": ["Hello from tsx! Sum: 15"]
        },
        {
            "name": "Modern ESM syntax",
            "code": """
interface User {
    name: string;
    age: number;
}

const user: User = { name: "Alice", age: 30 };
console.log(`User: ${user.name}, Age: ${user.age}`);
""",
            "expected_in_output": ["User: Alice, Age: 30"]
        },
        {
            "name": "Async/await syntax",
            "code": """
async function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    console.log("Starting...");
    await delay(100);
    console.log("Finished!");
}

main().catch(console.error);
""",
            "expected_in_output": ["Starting...", "Finished!"]
        }
    ]
    
    api_url = "http://localhost:8000/execute"
    
    async with aiohttp.ClientSession() as session:
        for test_case in test_cases:
            logger.info(f"Testing: {test_case['name']}")
            
            payload = {
                "code": test_case["code"],
                "language": "typescript",
                "timeout": 10
            }
            
            try:
                async with session.post(api_url, json=payload) as response:
                    if response.status == 200:
                        result = await response.json()
                        
                        logger.info(f"Execution successful: {result['success']}")
                        logger.info(f"Output: {result['output']}")
                        logger.info(f"Execution time: {result['execution_time']:.3f}s")
                        
                        if result['success']:
                            # Check if expected output is present
                            output = result['output']
                            success = all(expected in output for expected in test_case['expected_in_output'])
                            logger.info(f"Test passed: {success}")
                        else:
                            logger.error(f"Execution failed: {result.get('error', 'Unknown error')}")
                    else:
                        logger.error(f"HTTP error: {response.status}")
                        text = await response.text()
                        logger.error(f"Response: {text}")
                        
            except Exception as e:
                logger.error(f"Test failed: {e}")
            
            logger.info("=" * 50)

if __name__ == "__main__":
    asyncio.run(test_tsx_execution())