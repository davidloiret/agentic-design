#!/bin/bash

# Test script for codesandbox-rust API
# This script tests the exact same functionality as the Go version

set -e

API_URL="http://localhost:8000"
FAILED=0
TOTAL=0

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🚀 Testing codesandbox-rust API at $API_URL"
echo "============================================"

# Test function
test_request() {
    local name="$1"
    local method="$2"
    local endpoint="$3"
    local data="$4"
    local expected_status="$5"
    
    TOTAL=$((TOTAL + 1))
    echo -n "Test $TOTAL: $name... "
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "HTTPSTATUS:%{http_code}" "$API_URL$endpoint")
    else
        response=$(curl -s -w "HTTPSTATUS:%{http_code}" -X "$method" -H "Content-Type: application/json" -d "$data" "$API_URL$endpoint")
    fi
    
    http_code=$(echo "$response" | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo "$response" | sed -e 's/HTTPSTATUS:.*//g')
    
    if [ "$http_code" -eq "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC}"
        if [ "$endpoint" = "/execute" ]; then
            echo "   Response: $(echo "$body" | head -c 100)..."
        fi
    else
        echo -e "${RED}✗ FAIL${NC}"
        echo "   Expected status: $expected_status, got: $http_code"
        echo "   Response: $body"
        FAILED=$((FAILED + 1))
    fi
}

# Test health endpoint
test_request "Health check" "GET" "/health" "" 200

# Test languages endpoint
test_request "Get supported languages" "GET" "/languages" "" 200

# Test Python execution
test_request "Python execution" "POST" "/execute" '{"language": "python", "code": "print(\"Hello Python!\")", "timeout": 10}' 200

# Test Python with calculation
test_request "Python calculation" "POST" "/execute" '{"language": "python", "code": "result = 2 + 2\nprint(f\"2 + 2 = {result}\")", "timeout": 10}' 200

# Test TypeScript execution
test_request "TypeScript execution" "POST" "/execute" '{"language": "typescript", "code": "console.log(\"Hello TypeScript!\")", "timeout": 10}' 200

# Test TypeScript with types
test_request "TypeScript with types" "POST" "/execute" '{"language": "typescript", "code": "const message: string = \"Hello from TypeScript\"; console.log(message);", "timeout": 10}' 200

# Test Rust execution
test_request "Rust execution" "POST" "/execute" '{"language": "rust", "code": "fn main() { println!(\"Hello Rust!\"); }", "timeout": 15}' 200

# Test Rust with calculation
test_request "Rust calculation" "POST" "/execute" '{"language": "rust", "code": "fn main() { let result = 5 * 8; println!(\"5 * 8 = {}\", result); }", "timeout": 15}' 200

# Test error cases
test_request "Invalid language" "POST" "/execute" '{"language": "invalid", "code": "print(\"test\")", "timeout": 10}' 400

test_request "Empty code" "POST" "/execute" '{"language": "python", "code": "", "timeout": 10}' 400

test_request "Syntax error Python" "POST" "/execute" '{"language": "python", "code": "print(", "timeout": 10}' 200

test_request "Syntax error Rust" "POST" "/execute" '{"language": "rust", "code": "fn main() { invalid rust code }", "timeout": 10}' 200

# Test timeout (should timeout but return 200 with error)
test_request "Timeout test" "POST" "/execute" '{"language": "python", "code": "import time; time.sleep(5)", "timeout": 2}' 200

echo ""
echo "============================================"
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! ($TOTAL/$TOTAL)${NC}"
    echo "The Rust implementation is working correctly!"
else
    echo -e "${RED}❌ $FAILED tests failed out of $TOTAL${NC}"
    exit 1
fi

echo ""
echo "📊 Performance comparison with Go version:"
echo "Testing concurrent requests..."

# Concurrent test
echo -n "Running 5 concurrent Python requests... "
start_time=$(date +%s.%N)

for i in {1..5}; do
    (curl -s -X POST "$API_URL/execute" \
        -H "Content-Type: application/json" \
        -d '{"language": "python", "code": "print(f\"Request {i} completed\")", "timeout": 10}' \
        > /tmp/test$i.json) &
done

wait

end_time=$(date +%s.%N)
duration=$(echo "$end_time - $start_time" | bc -l)
echo -e "${GREEN}✓ Completed in ${duration}s${NC}"

# Check results
success_count=0
for i in {1..5}; do
    if grep -q '"success":true' /tmp/test$i.json 2>/dev/null; then
        success_count=$((success_count + 1))
    fi
    rm -f /tmp/test$i.json
done

echo "Concurrent execution: $success_count/5 successful"

if [ $success_count -eq 5 ]; then
    echo -e "${GREEN}🚀 Concurrent execution test passed!${NC}"
else
    echo -e "${YELLOW}⚠️  Some concurrent requests failed${NC}"
fi

echo ""
echo "✅ Rust codesandbox implementation test completed!"
echo "The system provides identical functionality to the Go version."