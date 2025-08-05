#!/usr/bin/env python3
import requests
import json
import time

API_URL = "http://localhost:8000"

def test_health():
    print("1. Testing Health Check...")
    response = requests.get(f"{API_URL}/health")
    print(f"   Status: {response.status_code}")
    print(f"   Response: {response.json()}")
    print()

def test_languages():
    print("2. Testing Supported Languages...")
    response = requests.get(f"{API_URL}/languages")
    print(f"   Status: {response.status_code}")
    print(f"   Response: {response.json()}")
    print()

def test_python_execution():
    print("3. Testing Python Code Execution...")
    code = """
import sys
print(f"Python version: {sys.version}")
print("Hello from Python!")
for i in range(3):
    print(f"  Count: {i}")
    
result = sum(range(10))
print(f"Sum of 0-9: {result}")
"""
    
    data = {
        "language": "python",
        "code": code.strip(),
        "timeout": 30
    }
    
    response = requests.post(f"{API_URL}/execute", json=data)
    result = response.json()
    
    print(f"   Status: {response.status_code}")
    print(f"   Success: {result.get('success', False)}")
    
    if result.get('success'):
        print(f"   Output:")
        for line in result.get('output', '').split('\n'):
            print(f"     {line}")
    else:
        print(f"   Error: {result.get('error', 'Unknown error')}")
    
    print(f"   Execution Time: {result.get('execution_time', 0):.2f}s")
    print()

def test_typescript_execution():
    print("4. Testing TypeScript Code Execution...")
    code = """
console.log("Hello from TypeScript!");
const greeting: string = "Type safety works!";
console.log(greeting);

const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
console.log(`Sum: ${sum}`);
"""
    
    data = {
        "language": "typescript",
        "code": code.strip(),
        "timeout": 30
    }
    
    response = requests.post(f"{API_URL}/execute", json=data)
    result = response.json()
    
    print(f"   Status: {response.status_code}")
    print(f"   Success: {result.get('success', False)}")
    
    if result.get('success'):
        print(f"   Output:")
        for line in result.get('output', '').split('\n'):
            print(f"     {line}")
    else:
        print(f"   Error: {result.get('error', 'Unknown error')}")
    
    print(f"   Execution Time: {result.get('execution_time', 0):.2f}s")
    print()

def test_rust_execution():
    print("5. Testing Rust Code Execution...")
    code = """
fn main() {
    println!("Hello from Rust!");
    
    let numbers = vec![1, 2, 3, 4, 5];
    let sum: i32 = numbers.iter().sum();
    println!("Sum: {}", sum);
    
    for i in 0..3 {
        println!("  Count: {}", i);
    }
}
"""
    
    data = {
        "language": "rust",
        "code": code.strip(),
        "timeout": 30
    }
    
    response = requests.post(f"{API_URL}/execute", json=data)
    result = response.json()
    
    print(f"   Status: {response.status_code}")
    print(f"   Success: {result.get('success', False)}")
    
    if result.get('success'):
        print(f"   Output:")
        for line in result.get('output', '').split('\n'):
            print(f"     {line}")
    else:
        print(f"   Error: {result.get('error', 'Unknown error')}")
    
    print(f"   Execution Time: {result.get('execution_time', 0):.2f}s")
    print()

def test_timeout():
    print("6. Testing Timeout Enforcement...")
    code = """
import time
print("Starting long task...")
time.sleep(10)
print("This should never print")
"""
    
    data = {
        "language": "python",
        "code": code.strip(),
        "timeout": 3
    }
    
    response = requests.post(f"{API_URL}/execute", json=data)
    result = response.json()
    
    print(f"   Status: {response.status_code}")
    print(f"   Success: {result.get('success', False)}")
    
    if not result.get('success'):
        error = result.get('error', '')
        if 'timeout' in error.lower() or 'timed out' in error.lower():
            print(f"   ✓ Timeout correctly enforced: {error}")
        else:
            print(f"   Error: {error}")
    else:
        print(f"   Output: {result.get('output', '')}")
    
    print()

def test_concurrent_requests():
    print("7. Testing Concurrent Requests...")
    import concurrent.futures
    
    def execute_simple_code(idx):
        data = {
            "language": "python",
            "code": f"print('Request {idx} executed successfully!')",
            "timeout": 10
        }
        response = requests.post(f"{API_URL}/execute", json=data)
        return idx, response.json()
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        futures = [executor.submit(execute_simple_code, i) for i in range(1, 4)]
        
        for future in concurrent.futures.as_completed(futures):
            idx, result = future.result()
            success = "✓" if result.get('success') else "✗"
            output = result.get('output', '').strip() if result.get('success') else result.get('error', '')
            print(f"   Request {idx}: {success} - {output}")
    
    print()

def test_error_handling():
    print("8. Testing Error Handling...")
    code = """
# This will cause a syntax error
print("Hello"
print("World")
"""
    
    data = {
        "language": "python",
        "code": code.strip(),
        "timeout": 10
    }
    
    response = requests.post(f"{API_URL}/execute", json=data)
    result = response.json()
    
    print(f"   Status: {response.status_code}")
    print(f"   Success: {result.get('success', False)}")
    
    if not result.get('success'):
        print(f"   ✓ Error correctly caught: {result.get('error', '')[:100]}...")
    else:
        print(f"   Unexpected success with output: {result.get('output', '')}")
    
    print()

if __name__ == "__main__":
    print("=" * 60)
    print("CODESANDBOX API COMPREHENSIVE TEST")
    print("=" * 60)
    print()
    
    try:
        test_health()
        test_languages()
        test_python_execution()
        test_typescript_execution()
        test_rust_execution()
        test_timeout()
        test_concurrent_requests()
        test_error_handling()
        
        print("=" * 60)
        print("ALL TESTS COMPLETED!")
        print("=" * 60)
    except Exception as e:
        print(f"\n❌ Test failed with error: {e}")
        import traceback
        traceback.print_exc()