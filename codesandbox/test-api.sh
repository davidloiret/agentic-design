#!/bin/bash

# Test script for the Codesandbox API

API_URL="${API_URL:-http://localhost:8000}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Testing Codesandbox API at $API_URL${NC}"
echo ""

# Test 1: Health check
echo -e "${YELLOW}Test 1: Health Check${NC}"
curl -s "$API_URL/health" | jq . || echo "Health check failed"
echo ""

# Test 2: Get supported languages
echo -e "${YELLOW}Test 2: Get Supported Languages${NC}"
curl -s "$API_URL/languages" | jq . || echo "Get languages failed"
echo ""

# Test 3: Execute Python code
echo -e "${YELLOW}Test 3: Execute Python Code${NC}"
curl -X POST "$API_URL/execute" \
  -H "Content-Type: application/json" \
  -d '{
    "language": "python",
    "code": "import sys\nprint(f\"Python {sys.version}\")\nprint(\"Hello from Python!\")\nfor i in range(3):\n    print(f\"  Count: {i}\")"
  }' | jq . || echo "Python execution failed"
echo ""

# Test 4: Execute TypeScript code
echo -e "${YELLOW}Test 4: Execute TypeScript Code${NC}"
curl -X POST "$API_URL/execute" \
  -H "Content-Type: application/json" \
  -d '{
    "language": "typescript",
    "code": "console.log(\"Hello from TypeScript!\");\nconst greeting: string = \"Type safety works!\";\nconsole.log(greeting);\nconsole.log(`Deno version: ${Deno.version.deno}`);"
  }' | jq . || echo "TypeScript execution failed"
echo ""

# Test 5: Execute Rust code
echo -e "${YELLOW}Test 5: Execute Rust Code${NC}"
curl -X POST "$API_URL/execute" \
  -H "Content-Type: application/json" \
  -d '{
    "language": "rust",
    "code": "fn main() {\n    println!(\"Hello from Rust!\");\n    let numbers = vec![1, 2, 3, 4, 5];\n    let sum: i32 = numbers.iter().sum();\n    println!(\"Sum: {}\", sum);\n}"
  }' | jq . || echo "Rust execution failed"
echo ""

# Test 6: Test timeout
echo -e "${YELLOW}Test 6: Test Timeout (5 second limit)${NC}"
curl -X POST "$API_URL/execute" \
  -H "Content-Type: application/json" \
  -d '{
    "language": "python",
    "code": "import time\nprint(\"Starting long task...\")\ntime.sleep(10)\nprint(\"This should timeout\")",
    "timeout": 5
  }' | jq . || echo "Timeout test failed"
echo ""

# Test 7: Test concurrent requests
echo -e "${YELLOW}Test 7: Concurrent Requests${NC}"
for i in {1..3}; do
  curl -X POST "$API_URL/execute" \
    -H "Content-Type: application/json" \
    -d "{
      \"language\": \"python\",
      \"code\": \"print(\\\"Request $i executed!\\\")\"
    }" | jq -c . &
done
wait
echo ""

echo -e "${GREEN}All tests completed!${NC}"