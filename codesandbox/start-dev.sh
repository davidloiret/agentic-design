#!/bin/bash
set -e

# Development startup script

echo "Starting Code Sandbox in development mode..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Error: This script must be run as root (for Firecracker)"
    echo "Usage: sudo ./start-dev.sh"
    exit 1
fi

# Set environment
export ROOTFS_PATH="$(pwd)/rootfs/rootfs.ext4"
export KERNEL_PATH="$(pwd)/kernel/vmlinux"
export API_PORT="8080"
export GIN_MODE="debug"
export LOG_LEVEL="debug"
export CNI_PATH="/opt/cni/bin"

# Check prerequisites
if [ ! -f "$ROOTFS_PATH" ]; then
    echo "Error: rootfs not found at $ROOTFS_PATH"
    exit 1
fi

if [ ! -f "$KERNEL_PATH" ]; then
    echo "Error: kernel not found at $KERNEL_PATH"
    exit 1
fi

if ! command -v firecracker &> /dev/null; then
    echo "Error: Firecracker not installed"
    exit 1
fi

# Check network
if ! ip link show fcbridge &> /dev/null; then
    echo "Error: Network bridge not found. Run: sudo ./scripts/setup-host-network.sh"
    exit 1
fi

echo "Configuration:"
echo "  Rootfs: $ROOTFS_PATH"
echo "  Kernel: $KERNEL_PATH"
echo "  API Port: $API_PORT"
echo ""

# Start API server
echo "Starting API server..."
exec ./cmd/api/api