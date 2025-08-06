#!/bin/bash
set -e

# Run the Codesandbox Rust API server with proper setup
# This mirrors the functionality of the Go version

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "${SCRIPT_DIR}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🦀 Starting Codesandbox Rust API Server...${NC}"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Error: This script must be run as root (sudo)${NC}"
    echo "Tip: Use './start.sh' which will automatically use sudo"
    exit 1
fi

# Check for KVM support
if [ ! -e /dev/kvm ]; then
    echo -e "${RED}Error: /dev/kvm not found. Please ensure KVM is enabled.${NC}"
    exit 1
fi

# Check for Rust and Cargo
if ! command -v cargo &> /dev/null; then
    echo -e "${RED}Error: Rust/Cargo not found. Please install Rust: https://rustup.rs/${NC}"
    exit 1
fi

# Install Firecracker if not exists
if ! command -v firecracker &> /dev/null; then
    echo -e "${YELLOW}Installing Firecracker...${NC}"
    make install-firecracker
fi

# Check for kernel
if [ ! -f "kernel/vmlinux" ]; then
    echo -e "${YELLOW}Kernel not found. Building...${NC}"
    make download-kernel
fi

# Check for rootfs
if [ ! -f "rootfs/rootfs.ext4" ]; then
    echo -e "${YELLOW}Rootfs not found. Building...${NC}"
    make build-rootfs
fi

# Setup network if not configured
if ! ip link show fcbridge &> /dev/null; then
    echo -e "${YELLOW}Setting up network bridge...${NC}"
    make setup-network
fi

# Build agent if not exists or if source is newer
if [ ! -f "target/release/agent" ] || [ "src/bin/agent.rs" -nt "target/release/agent" ]; then
    echo -e "${YELLOW}Building Rust agent...${NC}"
    make build-agent
fi

# Build API if not exists or if source is newer
if [ ! -f "target/release/api" ] || [ "src/bin/api.rs" -nt "target/release/api" ]; then
    echo -e "${YELLOW}Building Rust API server...${NC}"
    make build-api
fi

# Check Firecracker version
echo -e "${BLUE}System Information:${NC}"
echo "  Firecracker: $(firecracker --version | head -1)"
echo "  Rust: $(rustc --version)"
echo "  Cargo: $(cargo --version)"
echo ""

# Set environment variables
export ROOTFS_PATH="$(pwd)/rootfs/rootfs.ext4"
export KERNEL_PATH="$(pwd)/kernel/vmlinux"
export API_PORT="${API_PORT:-8000}"
export RUST_LOG="${RUST_LOG:-info}"

echo -e "${BLUE}Configuration:${NC}"
echo "  ROOTFS_PATH: $ROOTFS_PATH"
echo "  KERNEL_PATH: $KERNEL_PATH"
echo "  API_PORT: $API_PORT"
echo "  RUST_LOG: $RUST_LOG"
echo ""

# Verify all required files exist
echo -e "${BLUE}Pre-flight checks:${NC}"
checks_passed=true

if [ -f "$ROOTFS_PATH" ]; then
    echo -e "  ✅ Rootfs: $(ls -lh $ROOTFS_PATH | awk '{print $5}')"
else
    echo -e "  ❌ Rootfs: Missing"
    checks_passed=false
fi

if [ -f "$KERNEL_PATH" ]; then
    echo -e "  ✅ Kernel: $(ls -lh $KERNEL_PATH | awk '{print $5}')"
else
    echo -e "  ❌ Kernel: Missing"
    checks_passed=false
fi

if [ -f "target/release/api" ]; then
    echo -e "  ✅ API Binary: Built"
else
    echo -e "  ❌ API Binary: Missing"
    checks_passed=false
fi

if [ -f "target/release/agent" ]; then
    echo -e "  ✅ Agent Binary: Built"
else
    echo -e "  ❌ Agent Binary: Missing"
    checks_passed=false
fi

if ip link show fcbridge &> /dev/null; then
    echo -e "  ✅ Network Bridge: Ready"
else
    echo -e "  ❌ Network Bridge: Not configured"
    checks_passed=false
fi

if [ "$checks_passed" = false ]; then
    echo ""
    echo -e "${RED}❌ Pre-flight checks failed. Run 'make quickstart' to fix issues.${NC}"
    exit 1
fi

echo ""

# Run the API server
echo -e "${GREEN}🚀 Starting Rust API server on port $API_PORT...${NC}"
echo -e "${GREEN}API will be available at: http://localhost:$API_PORT${NC}"
echo ""
echo -e "${YELLOW}Test endpoints:${NC}"
echo "  Health: curl http://localhost:$API_PORT/health"
echo "  Languages: curl http://localhost:$API_PORT/languages"
echo ""
echo -e "${YELLOW}Execute code:${NC}"
echo '  curl -X POST http://localhost:'$API_PORT'/execute \'
echo '    -H "Content-Type: application/json" \'
echo '    -d "{\"language\": \"python\", \"code\": \"print('"'"'Hello from Rust!'"'"')\"}"'
echo ""
echo -e "${YELLOW}Stop server: Press Ctrl+C${NC}"
echo ""

# Handle shutdown gracefully
trap 'echo -e "\n${YELLOW}Shutting down gracefully...${NC}"; exit 0' INT TERM

# Run the API server
exec ./target/release/api