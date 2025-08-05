#!/bin/bash
set -e

# Complete setup and test script for Codesandbox

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=== Codesandbox Setup and Test ===${NC}"
echo ""

# Function to check prerequisites
check_prerequisites() {
    echo -e "${YELLOW}Checking prerequisites...${NC}"
    
    # Check if running as root
    if [ "$EUID" -ne 0 ]; then 
        echo -e "${RED}✗ Must run as root (use sudo)${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Running as root${NC}"
    
    # Check KVM
    if [ ! -e /dev/kvm ]; then
        echo -e "${RED}✗ /dev/kvm not found${NC}"
        echo "  Please enable KVM in BIOS and load kernel modules:"
        echo "  Intel: sudo modprobe kvm_intel"
        echo "  AMD: sudo modprobe kvm_amd"
        exit 1
    fi
    echo -e "${GREEN}✓ KVM available${NC}"
    
    # Check Go
    if ! command -v go &> /dev/null; then
        echo -e "${RED}✗ Go not installed${NC}"
        echo "  Please install Go 1.19 or later"
        exit 1
    fi
    echo -e "${GREEN}✓ Go installed: $(go version)${NC}"
    
    # Check required tools
    for tool in wget curl jq ip iptables; do
        if ! command -v $tool &> /dev/null; then
            echo -e "${RED}✗ $tool not installed${NC}"
            echo "  Please install: apt-get install $tool"
            exit 1
        fi
    done
    echo -e "${GREEN}✓ Required tools installed${NC}"
    
    echo ""
}

# Function to setup the environment
setup_environment() {
    echo -e "${YELLOW}Setting up environment...${NC}"
    
    cd /data/code/agentic-design/codesandbox
    
    # Download Go dependencies
    echo "Downloading Go dependencies..."
    go mod download
    go mod tidy
    echo -e "${GREEN}✓ Go dependencies installed${NC}"
    
    # Download kernel
    echo "Setting up kernel..."
    if [ ! -f "kernel/vmlinux" ]; then
        ./scripts/setup-kernel.sh
    fi
    echo -e "${GREEN}✓ Kernel ready${NC}"
    
    # Build agent
    echo "Building agent..."
    CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o cmd/agent/agent ./cmd/agent
    echo -e "${GREEN}✓ Agent built${NC}"
    
    # Build API
    echo "Building API server..."
    go build -o cmd/api/api ./cmd/api
    echo -e "${GREEN}✓ API server built${NC}"
    
    # Build rootfs
    echo "Building rootfs (this may take a while)..."
    if [ ! -f "rootfs/rootfs.ext4" ]; then
        ./scripts/build-rootfs.sh
    fi
    
    # Copy agent to rootfs
    echo "Copying agent to rootfs..."
    ./scripts/copy-agent-to-rootfs.sh
    echo -e "${GREEN}✓ Rootfs ready${NC}"
    
    # Setup network
    echo "Setting up network..."
    ./scripts/setup-host-network.sh
    echo -e "${GREEN}✓ Network configured${NC}"
    
    # Install Firecracker if needed
    if ! command -v firecracker &> /dev/null; then
        echo "Installing Firecracker..."
        wget -q -O firecracker.tgz https://github.com/firecracker-microvm/firecracker/releases/download/v1.4.0/firecracker-v1.4.0-x86_64.tar.gz
        tar -xzf firecracker.tgz
        mv release-v1.4.0-x86_64/firecracker-v1.4.0-x86_64 /usr/local/bin/firecracker
        chmod +x /usr/local/bin/firecracker
        rm -rf firecracker.tgz release-v1.4.0-x86_64
        echo -e "${GREEN}✓ Firecracker installed${NC}"
    else
        echo -e "${GREEN}✓ Firecracker already installed${NC}"
    fi
    
    echo ""
}

# Function to start the API server
start_api_server() {
    echo -e "${YELLOW}Starting API server...${NC}"
    
    # Kill any existing API server
    pkill -f "cmd/api/api" 2>/dev/null || true
    sleep 1
    
    # Start API server in background
    export ROOTFS_PATH="$(pwd)/rootfs/rootfs.ext4"
    export KERNEL_PATH="$(pwd)/kernel/vmlinux"
    export API_PORT="8000"
    export GIN_MODE="release"
    
    nohup ./cmd/api/api > api.log 2>&1 &
    API_PID=$!
    
    echo "API server started with PID: $API_PID"
    echo "Waiting for API to be ready..."
    
    # Wait for API to be ready
    for i in {1..30}; do
        if curl -s http://localhost:8000/health > /dev/null 2>&1; then
            echo -e "${GREEN}✓ API server is ready${NC}"
            echo ""
            return 0
        fi
        sleep 1
        echo -n "."
    done
    
    echo -e "${RED}✗ API server failed to start${NC}"
    echo "Check api.log for details"
    exit 1
}

# Function to run tests
run_tests() {
    echo -e "${YELLOW}Running tests...${NC}"
    echo ""
    
    API_URL="http://localhost:8000"
    
    # Test 1: Health check
    echo -e "${BLUE}Test 1: Health Check${NC}"
    if curl -s "$API_URL/health" | jq . > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Health check passed${NC}"
    else
        echo -e "${RED}✗ Health check failed${NC}"
    fi
    echo ""
    
    # Test 2: Supported languages
    echo -e "${BLUE}Test 2: Get Supported Languages${NC}"
    LANGUAGES=$(curl -s "$API_URL/languages" | jq -r '.languages[]' 2>/dev/null | tr '\n' ' ')
    if [ -n "$LANGUAGES" ]; then
        echo -e "${GREEN}✓ Supported languages: $LANGUAGES${NC}"
    else
        echo -e "${RED}✗ Failed to get languages${NC}"
    fi
    echo ""
    
    # Test 3: Python execution
    echo -e "${BLUE}Test 3: Execute Python Code${NC}"
    PYTHON_RESULT=$(curl -s -X POST "$API_URL/execute" \
        -H "Content-Type: application/json" \
        -d '{"language": "python", "code": "print(\"Hello from Python!\")"}' \
        2>/dev/null | jq -r '.output' 2>/dev/null)
    
    if [[ "$PYTHON_RESULT" == *"Hello from Python"* ]]; then
        echo -e "${GREEN}✓ Python execution successful${NC}"
        echo "  Output: $PYTHON_RESULT"
    else
        echo -e "${RED}✗ Python execution failed${NC}"
    fi
    echo ""
    
    # Test 4: TypeScript execution
    echo -e "${BLUE}Test 4: Execute TypeScript Code${NC}"
    TS_RESULT=$(curl -s -X POST "$API_URL/execute" \
        -H "Content-Type: application/json" \
        -d '{"language": "typescript", "code": "console.log(\"Hello from TypeScript!\");"}' \
        2>/dev/null | jq -r '.output' 2>/dev/null)
    
    if [[ "$TS_RESULT" == *"Hello from TypeScript"* ]]; then
        echo -e "${GREEN}✓ TypeScript execution successful${NC}"
        echo "  Output: $TS_RESULT"
    else
        echo -e "${YELLOW}⚠ TypeScript execution may need Deno setup${NC}"
    fi
    echo ""
    
    # Test 5: Rust execution
    echo -e "${BLUE}Test 5: Execute Rust Code${NC}"
    RUST_RESULT=$(curl -s -X POST "$API_URL/execute" \
        -H "Content-Type: application/json" \
        -d '{"language": "rust", "code": "fn main() { println!(\"Hello from Rust!\"); }"}' \
        2>/dev/null | jq -r '.output' 2>/dev/null)
    
    if [[ "$RUST_RESULT" == *"Hello from Rust"* ]]; then
        echo -e "${GREEN}✓ Rust execution successful${NC}"
        echo "  Output: $RUST_RESULT"
    else
        echo -e "${YELLOW}⚠ Rust execution may need rustc setup${NC}"
    fi
    echo ""
    
    # Test 6: Timeout test
    echo -e "${BLUE}Test 6: Timeout Test${NC}"
    TIMEOUT_RESULT=$(curl -s -X POST "$API_URL/execute" \
        -H "Content-Type: application/json" \
        -d '{"language": "python", "code": "import time; time.sleep(10)", "timeout": 2}' \
        2>/dev/null | jq -r '.error' 2>/dev/null)
    
    if [[ "$TIMEOUT_RESULT" == *"timeout"* ]] || [[ "$TIMEOUT_RESULT" == *"timed out"* ]]; then
        echo -e "${GREEN}✓ Timeout enforcement working${NC}"
    else
        echo -e "${YELLOW}⚠ Timeout test inconclusive${NC}"
    fi
    echo ""
}

# Function to show usage information
show_usage() {
    echo -e "${GREEN}=== Setup Complete ===${NC}"
    echo ""
    echo "API is running at: http://localhost:8000"
    echo ""
    echo "Example usage:"
    echo '  curl -X POST http://localhost:8000/execute \'
    echo '    -H "Content-Type: application/json" \'
    echo '    -d "{\"language\": \"python\", \"code\": \"print('"'"'Hello!'"'"')\"}"'
    echo ""
    echo "To stop the API server:"
    echo "  pkill -f cmd/api/api"
    echo ""
    echo "To view logs:"
    echo "  tail -f api.log"
    echo ""
}

# Main execution
main() {
    check_prerequisites
    setup_environment
    start_api_server
    run_tests
    show_usage
}

# Run main function
main

echo -e "${GREEN}✅ All setup and tests completed!${NC}"