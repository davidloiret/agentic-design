#!/bin/bash

# Production test script for Code Sandbox API

API_URL="http://localhost:8000"
PASS=0
FAIL=0

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "=== Code Sandbox Production Test Suite ==="
echo "API URL: $API_URL"
echo ""

# Function to test endpoint
test_endpoint() {
    local name="$1"
    local method="$2"
    local endpoint="$3"
    local data="$4"
    local expected="$5"
    
    echo -n "Testing $name... "
    
    if [ "$method" == "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$API_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" "$API_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" == "200" ] && echo "$body" | grep -q "$expected"; then
        echo -e "${GREEN}✓ PASS${NC}"
        ((PASS++))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC}"
        echo "  Expected: $expected"
        echo "  Got: $body (HTTP $http_code)"
        ((FAIL++))
        return 1
    fi
}

# Test health endpoint
test_endpoint "Health Check" "GET" "/health" "" '"status":"healthy"'

# Test languages endpoint
test_endpoint "Supported Languages" "GET" "/languages" "" '"languages":\["python","typescript","rust"\]'

echo ""
echo "=== Testing Code Execution ==="

# Test Python execution
test_endpoint "Python Hello World" "POST" "/execute" \
    '{"language":"python","code":"print(\"Hello, Python!\")","timeout":10}' \
    '"success":true.*"output":"Hello, Python!'

# Test Python with imports
test_endpoint "Python Imports" "POST" "/execute" \
    '{"language":"python","code":"import sys\nimport json\nprint(f\"Python {sys.version.split()[0]}\")\nprint(json.dumps({\"test\": \"success\"}))","timeout":10}' \
    '"success":true.*Python.*test.*success'

# Test Python error handling
test_endpoint "Python Syntax Error" "POST" "/execute" \
    '{"language":"python","code":"print(unclosed string","timeout":10}' \
    '"success":false.*"error"'

# Test TypeScript execution
test_endpoint "TypeScript Hello World" "POST" "/execute" \
    '{"language":"typescript","code":"console.log(\"Hello, TypeScript!\");","timeout":10}' \
    '"success":true.*"output":"Hello, TypeScript!'

# Test TypeScript with types
test_endpoint "TypeScript Types" "POST" "/execute" \
    '{"language":"typescript","code":"const message: string = \"Type Safety!\";\nconst num: number = 42;\nconsole.log(`${message} Answer: ${num}`);","timeout":10}' \
    '"success":true.*Type Safety.*42'

# Test Rust execution
test_endpoint "Rust Hello World" "POST" "/execute" \
    '{"language":"rust","code":"fn main() {\n    println!(\"Hello, Rust!\");\n}","timeout":15}' \
    '"success":true.*"output":"Hello, Rust!'

# Test Rust with standard library
test_endpoint "Rust Vec Operations" "POST" "/execute" \
    '{"language":"rust","code":"fn main() {\n    let v = vec![1, 2, 3, 4, 5];\n    let sum: i32 = v.iter().sum();\n    println!(\"Sum: {}\", sum);\n}","timeout":15}' \
    '"success":true.*Sum: 15'

echo ""
echo "=== Testing Resource Limits ==="

# Test timeout
test_endpoint "Execution Timeout" "POST" "/execute" \
    '{"language":"python","code":"import time\nprint(\"Starting...\")\ntime.sleep(10)\nprint(\"Should not appear\")","timeout":2}' \
    '"success":false.*timeout'

# Test memory limit
test_endpoint "Memory Limit" "POST" "/execute" \
    '{"language":"python","code":"# Allocate 500MB\ndata = [0] * (500 * 1024 * 1024)","timeout":10}' \
    '"success":false'

# Test concurrent executions
echo ""
echo "=== Testing Concurrent Execution ==="
echo -n "Running 5 concurrent requests... "

for i in {1..5}; do
    curl -s -X POST "$API_URL/execute" \
        -H "Content-Type: application/json" \
        -d "{\"language\":\"python\",\"code\":\"import time\\nprint(f'Request $i')\\ntime.sleep(1)\",\"timeout\":5}" > /tmp/concurrent_$i.out 2>&1 &
done

wait

success_count=0
for i in {1..5}; do
    if grep -q '"success":true' /tmp/concurrent_$i.out 2>/dev/null; then
        ((success_count++))
    fi
    rm -f /tmp/concurrent_$i.out
done

if [ "$success_count" -eq 5 ]; then
    echo -e "${GREEN}✓ PASS${NC} (All 5 requests succeeded)"
    ((PASS++))
else
    echo -e "${RED}✗ FAIL${NC} (Only $success_count/5 requests succeeded)"
    ((FAIL++))
fi

# Test invalid inputs
echo ""
echo "=== Testing Input Validation ==="

test_endpoint "Invalid Language" "POST" "/execute" \
    '{"language":"cobol","code":"DISPLAY \"Hello\".","timeout":10}' \
    '"success":false.*Unsupported language'

test_endpoint "Missing Language" "POST" "/execute" \
    '{"code":"print(\"test\")","timeout":10}' \
    'Invalid request'

test_endpoint "Empty Code" "POST" "/execute" \
    '{"language":"python","code":"","timeout":10}' \
    '"success":true.*"output":""'

# Performance test
echo ""
echo "=== Performance Test ==="
echo -n "Measuring average response time... "

total_time=0
iterations=10

for i in $(seq 1 $iterations); do
    start_time=$(date +%s.%N)
    curl -s -X POST "$API_URL/execute" \
        -H "Content-Type: application/json" \
        -d '{"language":"python","code":"print(\"perf test\")","timeout":10}' > /dev/null
    end_time=$(date +%s.%N)
    
    elapsed=$(echo "$end_time - $start_time" | bc)
    total_time=$(echo "$total_time + $elapsed" | bc)
done

avg_time=$(echo "scale=3; $total_time / $iterations" | bc)
echo -e "${GREEN}Average: ${avg_time}s${NC}"

# Summary
echo ""
echo "======================================="
echo "Test Summary:"
echo -e "  Passed: ${GREEN}$PASS${NC}"
echo -e "  Failed: ${RED}$FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}✗ Some tests failed.${NC}"
    exit 1
fi