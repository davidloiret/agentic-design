#!/usr/bin/env python3
"""
Simple test to verify API is working without VM complexity
"""
import requests
import json

API_URL = "http://localhost:8888"

print("Testing Codesandbox API")
print("=" * 40)

# Test health
response = requests.get(f"{API_URL}/health")
print(f"Health Check: {response.json()}")

# Test languages
response = requests.get(f"{API_URL}/languages")
print(f"Supported Languages: {response.json()}")

# Test Python execution (will likely fail due to VM issues)
print("\nTrying Python execution...")
data = {
    "language": "python",
    "code": "print('Hello World')",
    "timeout": 10
}

response = requests.post(f"{API_URL}/execute", json=data)
result = response.json()

print(f"Status Code: {response.status_code}")
print(f"Response: {json.dumps(result, indent=2)}")

if not result.get('success'):
    print(f"\n❌ Execution failed as expected: {result.get('error')}")
    print("\n⚠️  The VM management layer needs to be fixed.")
    print("The issue is that the Firecracker Go SDK is passing")
    print("incompatible arguments to the newer Firecracker version.")
    print("\nTo fix this, we need to either:")
    print("1. Update the Firecracker Go SDK to a newer version")
    print("2. Use an older Firecracker version (v0.24.x)")
    print("3. Implement direct Firecracker API calls without the SDK")
else:
    print(f"\n✅ Execution succeeded!")
    print(f"Output: {result.get('output')}")