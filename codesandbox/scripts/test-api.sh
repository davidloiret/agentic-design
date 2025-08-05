#!/bin/bash

# Test script for Code Sandbox API

API_URL="http://localhost:8000"

echo "Testing Code Sandbox API..."
echo "=========================="

# Check if API is running
echo -n "Checking API health... "
if curl -s "${API_URL}/health" > /dev/null; then
    echo "OK"
else
    echo "FAILED"
    echo "Please make sure the API server is running: sudo make run"
    exit 1
fi

# Test Python execution
echo -e "\n1. Testing Python execution:"
echo "----------------------------"
curl -X POST "${API_URL}/execute" \
    -H "Content-Type: application/json" \
    -d '{
        "language": "python",
        "code": "import sys\nprint(f\"Python {sys.version.split()[0]}\")\nprint(\"Hello from Python!\")\nprint(sum(range(10)))",
        "timeout": 10
    }' | jq '.'

# Test TypeScript execution
echo -e "\n2. Testing TypeScript execution:"
echo "--------------------------------"
curl -X POST "${API_URL}/execute" \
    -H "Content-Type: application/json" \
    -d '{
        "language": "typescript",
        "code": "const message: string = \"Hello from TypeScript!\";\nconsole.log(message);\nconsole.log(`2 + 2 = ${2 + 2}`);",
        "timeout": 10
    }' | jq '.'

# Test Rust execution
echo -e "\n3. Testing Rust execution:"
echo "--------------------------"
curl -X POST "${API_URL}/execute" \
    -H "Content-Type: application/json" \
    -d '{
        "language": "rust",
        "code": "fn main() {\n    println!(\"Hello from Rust!\");\n    let numbers = vec![1, 2, 3, 4, 5];\n    let sum: i32 = numbers.iter().sum();\n    println!(\"Sum: {}\", sum);\n}",
        "timeout": 15
    }' | jq '.'

# Test error handling
echo -e "\n4. Testing error handling (syntax error):"
echo "-----------------------------------------"
curl -X POST "${API_URL}/execute" \
    -H "Content-Type: application/json" \
    -d '{
        "language": "python",
        "code": "print(\"Unclosed string",
        "timeout": 10
    }' | jq '.'

# Test timeout
echo -e "\n5. Testing timeout:"
echo "-------------------"
curl -X POST "${API_URL}/execute" \
    -H "Content-Type: application/json" \
    -d '{
        "language": "python",
        "code": "import time\nprint(\"Starting...\")\ntime.sleep(10)\nprint(\"This should not print\")",
        "timeout": 2
    }' | jq '.'

# Test resource limits
echo -e "\n6. Testing resource limits (memory):"
echo "------------------------------------"
curl -X POST "${API_URL}/execute" \
    -H "Content-Type: application/json" \
    -d '{
        "language": "python",
        "code": "# Try to allocate too much memory\nbig_list = [0] * (1024 * 1024 * 1024)",
        "timeout": 10
    }' | jq '.'

echo -e "\nAll tests completed!"