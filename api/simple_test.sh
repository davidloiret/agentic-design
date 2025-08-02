#!/bin/bash

echo "🧪 Testing Firecracker API"
echo "========================="

# Test 1: Health check
echo "1. Health Check:"
curl -s http://localhost:8000/health | python3 -m json.tool
echo

# Test 2: Python execution
echo "2. Python Math:"
curl -s -X POST "http://localhost:8000/execute" \
  -H "Content-Type: application/json" \
  -d '{"code":"print(sum(range(100)))","language":"python"}' | python3 -m json.tool
echo

# Test 3: Python with list
echo "3. Python List:"
curl -s -X POST "http://localhost:8000/execute" \
  -H "Content-Type: application/json" \
  -d '{"code":"print([x*2 for x in range(5)])","language":"python"}' | python3 -m json.tool
echo

# Test 4: TypeScript
echo "4. TypeScript:"
curl -s -X POST "http://localhost:8000/execute" \
  -H "Content-Type: application/json" \
  -d '{"code":"console.log(Math.PI);","language":"typescript"}' | python3 -m json.tool
echo

# Test 5: Performance test
echo "5. Performance Test (3 runs):"
for i in {1..3}; do
  echo "  Run $i:"
  start_time=$(date +%s.%N)
  result=$(curl -s -X POST "http://localhost:8000/execute" \
    -H "Content-Type: application/json" \
    -d '{"code":"print(42)","language":"python"}')
  end_time=$(date +%s.%N)
  total_time=$(echo "$end_time - $start_time" | bc)
  echo "    Total time: ${total_time}s"
  echo "    Execution time: $(echo "$result" | python3 -c "import sys,json; print(json.load(sys.stdin)['execution_time'])")s"
done
echo

echo "✅ Testing complete!"