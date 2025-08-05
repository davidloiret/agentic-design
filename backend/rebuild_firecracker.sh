#!/bin/bash

# Firecracker API Cleanup and Rebuild Script
# Completely rebuilds the Firecracker container with fresh VM images

set -e

echo "🔥 Firecracker API Cleanup and Rebuild Script"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "SUCCESS") echo -e "${GREEN}✅ $message${NC}" ;;
        "ERROR") echo -e "${RED}❌ $message${NC}" ;;
        "WARNING") echo -e "${YELLOW}⚠️  $message${NC}" ;;
        "INFO") echo -e "${BLUE}ℹ️  $message${NC}" ;;
    esac
}

# Step 1: Stop and remove existing container
print_status "INFO" "Step 1: Stopping and removing existing Firecracker container..."
docker compose -f docker-compose.prod.yml down firecracker-api 2>/dev/null || true
print_status "SUCCESS" "Container stopped and removed"

# Step 2: Remove Docker image to force rebuild
print_status "INFO" "Step 2: Removing existing Docker image to force rebuild..."
docker rmi backend-firecracker-api 2>/dev/null || print_status "WARNING" "Image not found or already removed"
print_status "SUCCESS" "Docker image cleanup complete"

# Step 3: Clean up any orphaned Docker containers from VM building
print_status "INFO" "Step 3: Cleaning up orphaned Alpine builder containers..."
docker ps -a --filter name=alpine_builder --format "{{.Names}}" | xargs -I {} docker rm {} 2>/dev/null || true
print_status "SUCCESS" "Orphaned containers cleaned up"

# Step 4: Build and start the container
print_status "INFO" "Step 4: Building and starting Firecracker container..."
print_status "INFO" "This will build VM images during startup (may take 2-3 minutes)..."

if docker compose -f docker-compose.prod.yml up --build firecracker-api -d; then
    print_status "SUCCESS" "Container build and start initiated"
else
    print_status "ERROR" "Failed to build and start container"
    exit 1
fi

# Step 5: Wait for container to be healthy
print_status "INFO" "Step 5: Waiting for container to become healthy..."
print_status "INFO" "This includes building Python, TypeScript, and Rust VM images..."

# Wait up to 5 minutes for the container to be healthy
timeout=300
elapsed=0
interval=10

while [ $elapsed -lt $timeout ]; do
    if docker inspect agentic-design-firecracker-api --format='{{.State.Health.Status}}' 2>/dev/null | grep -q "healthy"; then
        print_status "SUCCESS" "Container is healthy!"
        break
    elif docker inspect agentic-design-firecracker-api --format='{{.State.Status}}' 2>/dev/null | grep -q "exited"; then
        print_status "ERROR" "Container exited unexpectedly"
        print_status "INFO" "Checking logs for errors..."
        docker logs agentic-design-firecracker-api --tail 20
        exit 1
    else
        printf "⏳ Waiting for container to become healthy... (%d/%d seconds)\r" $elapsed $timeout
        sleep $interval
        elapsed=$((elapsed + interval))
    fi
done

if [ $elapsed -ge $timeout ]; then
    print_status "ERROR" "Container failed to become healthy within $timeout seconds"
    print_status "INFO" "Checking container logs..."
    docker logs agentic-design-firecracker-api --tail 50
    exit 1
fi

# Step 6: Verify API endpoint
print_status "INFO" "Step 6: Verifying API endpoint..."
sleep 5  # Give the API a moment to fully start

if curl -s -f http://localhost:8000/health > /dev/null; then
    print_status "SUCCESS" "API endpoint is responding"
else
    print_status "ERROR" "API endpoint is not responding"
    exit 1
fi

# Step 7: Test TypeScript execution
print_status "INFO" "Step 7: Testing TypeScript execution..."

# Create a test script
cat > /tmp/test_typescript.py << 'EOF'
import requests
import json

try:
    response = requests.post('http://localhost:8000/execute', json={
        'code': 'console.log("Hello TypeScript from rebuilt VM!");',
        'language': 'typescript',
        'timeout': 15
    }, timeout=30)
    
    if response.status_code == 200:
        result = response.json()
        if result.get('success'):
            print("✅ SUCCESS: TypeScript execution working!")
            print(f"📤 Output: {result.get('output', '').strip()}")
            exit(0)
        else:
            print("❌ FAILED: TypeScript execution failed")
            print(f"❗ Error: {result.get('error', 'Unknown error')}")
            exit(1)
    else:
        print(f"❌ HTTP ERROR: Status {response.status_code}")
        print(f"Response: {response.text}")
        exit(1)
        
except Exception as e:
    print(f"❌ EXCEPTION: {str(e)}")
    exit(1)
EOF

if python3 /tmp/test_typescript.py; then
    print_status "SUCCESS" "TypeScript execution test passed!"
else
    print_status "ERROR" "TypeScript execution test failed"
    print_status "INFO" "Checking recent container logs..."
    docker logs agentic-design-firecracker-api --tail 20
    exit 1
fi

# Cleanup
rm -f /tmp/test_typescript.py

echo
print_status "SUCCESS" "🎉 Firecracker API rebuild completed successfully!"
echo
echo "📊 Summary:"
echo "   ✅ Container rebuilt with fresh VM images"
echo "   ✅ TypeScript, Python, and Rust VMs ready"
echo "   ✅ API endpoint responding at http://localhost:8000"
echo "   ✅ TypeScript execution verified working"
echo
echo "🔗 Available endpoints:"
echo "   • Health: GET http://localhost:8000/health"
echo "   • Execute: POST http://localhost:8000/execute"
echo "   • Debug: GET http://localhost:8000/debug/vm-pools"
echo
echo "🧪 Test the API with:"
echo "   ./test_api.sh"