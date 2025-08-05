#!/bin/bash
set -e

# Run the codesandbox API server with proper setup

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "${SCRIPT_DIR}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Codesandbox API Server...${NC}"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Error: This script must be run as root (sudo)${NC}"
    exit 1
fi

# Check for KVM support
if [ ! -e /dev/kvm ]; then
    echo -e "${RED}Error: /dev/kvm not found. Please ensure KVM is enabled.${NC}"
    exit 1
fi

# Check for kernel
if [ ! -f "kernel/vmlinux" ]; then
    echo -e "${YELLOW}Kernel not found. Building...${NC}"
    ./scripts/setup-kernel.sh
fi

# Check for rootfs
if [ ! -f "rootfs/rootfs.ext4" ]; then
    echo -e "${YELLOW}Rootfs not found. Building...${NC}"
    ./scripts/build-rootfs.sh
fi

# Build agent if not exists
if [ ! -f "cmd/agent/agent" ]; then
    echo -e "${YELLOW}Building agent...${NC}"
    CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o cmd/agent/agent ./cmd/agent
    ./scripts/copy-agent-to-rootfs.sh
fi

# Build API if not exists
if [ ! -f "cmd/api/api" ]; then
    echo -e "${YELLOW}Building API server...${NC}"
    go build -o cmd/api/api ./cmd/api
fi

# Setup network
# echo -e "${GREEN}Setting up network...${NC}"
# ./scripts/setup-host-network.sh

# Install Firecracker if not exists
if ! command -v firecracker &> /dev/null; then
    echo -e "${YELLOW}Installing Firecracker...${NC}"
    wget -O firecracker.tgz https://github.com/firecracker-microvm/firecracker/releases/download/v1.4.0/firecracker-v1.4.0-x86_64.tar.gz
    tar -xzf firecracker.tgz
    sudo mv release-v1.4.0-x86_64/firecracker-v1.4.0-x86_64 /usr/local/bin/firecracker
    chmod +x /usr/local/bin/firecracker
    rm -rf firecracker.tgz release-v1.4.0-x86_64
fi

# Check Firecracker version
echo -e "${GREEN}Firecracker version:${NC}"
firecracker --version || echo "Firecracker not found in PATH"

# Set environment variables
export ROOTFS_PATH="$(pwd)/rootfs/rootfs.ext4"
export KERNEL_PATH="$(pwd)/kernel/vmlinux"
export API_PORT="${API_PORT:-8000}"
export GIN_MODE="${GIN_MODE:-release}"

echo -e "${GREEN}Configuration:${NC}"
echo "  ROOTFS_PATH: $ROOTFS_PATH"
echo "  KERNEL_PATH: $KERNEL_PATH"
echo "  API_PORT: $API_PORT"
echo "  GIN_MODE: $GIN_MODE"

# Run the API server
echo -e "${GREEN}Starting API server on port $API_PORT...${NC}"
echo -e "${GREEN}API will be available at: http://localhost:$API_PORT${NC}"
echo ""
echo -e "${YELLOW}Test with:${NC}"
echo '  curl -X POST http://localhost:8000/execute \'
echo '    -H "Content-Type: application/json" \'
echo '    -d "{\"language\": \"python\", \"code\": \"print('"'"'Hello, World!'"'"')\"}"'
echo ""

exec ./cmd/api/api