#!/usr/bin/env python3
"""Quick test script for the API server"""

import requests
import json
import time

def test_api():
    base_url = "http://localhost:8000"
    
    print("🧪 Testing Firecracker Code Execution API\n")
    
    # Test 1: Health check
    print("1. Health Check...")
    try:
        response = requests.get(f"{base_url}/health")
        health = response.json()
        print(f"   Status: {health['status']}")
        print(f"   Firecracker: {health.get('firecracker_available', False)}")
        print(f"   Execution method: {health.get('execution_method', 'unknown')}")
    except Exception as e:
        print(f"   ❌ Health check failed: {e}")
        return
    
    # Test cases
    test_cases = [
        {
            "name": "Python - Simple Math",
            "code": "print(2 + 2)",
            "language": "python",
            "expected": "4"
        },
        {
            "name": "Python - List Comprehension", 
            "code": "print([x*2 for x in range(5)])",
            "language": "python",
            "expected": "[0, 2, 4, 6, 8]"
        },
        {
            "name": "TypeScript - Console Log",
            "code": "console.log('Hello TypeScript');",
            "language": "typescript", 
            "expected": "Hello TypeScript"
        },
        {
            "name": "Rust - Hello World",
            "code": "fn main() { println!(\"Hello Rust\"); }",
            "language": "rust",
            "expected": "Hello Rust"
        }
    ]
    
    # Security test cases (should fail)
    security_tests = [
        {
            "name": "Python - File Access (should fail)",
            "code": "open('/etc/passwd', 'r')",
            "language": "python",
            "should_fail": True
        },
        {
            "name": "Python - OS Import (should fail)",
            "code": "import os; os.system('ls')",
            "language": "python", 
            "should_fail": True
        }
    ]
    
    print("\n2. Execution Tests...")
    passed = 0
    total = 0
    
    for test in test_cases:
        total += 1
        print(f"\n   Testing: {test['name']}")
        
        try:
            start_time = time.time()
            response = requests.post(
                f"{base_url}/execute",
                json={
                    "code": test["code"],
                    "language": test["language"],
                    "security_level": "restricted"
                }
            )
            end_time = time.time()
            
            if response.status_code == 200:
                result = response.json()
                if result["success"] and test["expected"] in result["output"]:
                    print(f"   ✅ PASS ({end_time-start_time:.3f}s)")
                    print(f"      Output: {result['output'].strip()}")
                    passed += 1
                else:
                    print(f"   ❌ FAIL - Unexpected output")
                    print(f"      Expected: {test['expected']}")
                    print(f"      Got: {result.get('output', 'No output')}")
                    if result.get('error'):
                        print(f"      Error: {result['error']}")
            else:
                print(f"   ❌ FAIL - HTTP {response.status_code}")
                print(f"      Response: {response.text}")
                
        except Exception as e:
            print(f"   ❌ FAIL - Exception: {e}")
    
    print("\n3. Security Tests...")
    for test in security_tests:
        total += 1
        print(f"\n   Testing: {test['name']}")
        
        try:
            response = requests.post(
                f"{base_url}/execute",
                json={
                    "code": test["code"],
                    "language": test["language"],
                    "security_level": "sandbox"
                }
            )
            
            if response.status_code == 400:
                print(f"   ✅ PASS - Correctly blocked")
                print(f"      Reason: {response.json().get('detail', 'Security violation')}")
                passed += 1
            else:
                print(f"   ❌ FAIL - Should have been blocked")
                if response.status_code == 200:
                    result = response.json()
                    print(f"      Output: {result.get('output', 'No output')}")
                    
        except Exception as e:
            print(f"   ❌ FAIL - Exception: {e}")
    
    print(f"\n📊 Test Results: {passed}/{total} passed ({passed/total*100:.1f}%)")
    
    if passed == total:
        print("🎉 All tests passed!")
    else:
        print("⚠️  Some tests failed - check the output above")

if __name__ == "__main__":
    test_api()