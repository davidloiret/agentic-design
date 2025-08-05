#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check prerequisites
echo "Checking prerequisites..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Error: This script must be run as root (for Firecracker)"
    echo "Usage: sudo ./run-server.sh"
    exit 1
fi

# Check if KVM is available
if [ ! -c /dev/kvm ]; then
    echo "Error: /dev/kvm not found. Is KVM enabled?"
    exit 1
fi

# Check if Firecracker is installed
if ! command -v firecracker &> /dev/null; then
    echo "Error: Firecracker not found. Please install it first:"
    echo "  ./scripts/install-firecracker.sh"
    exit 1
fi

# Check if rootfs exists
if [ ! -f "rootfs/rootfs.ext4" ]; then
    echo "Error: rootfs not found. Please build it first:"
    echo "  make build-rootfs"
    exit 1
fi

# Check if kernel exists
if [ ! -f "kernel/vmlinux" ]; then
    echo "Error: kernel not found. Please download it first:"
    echo "  make download-kernel"
    exit 1
fi

# Set environment variables
export ROOTFS_PATH="${SCRIPT_DIR}/rootfs/rootfs.ext4"
export KERNEL_PATH="${SCRIPT_DIR}/kernel/vmlinux"
export API_PORT="8000"
export GIN_MODE="release"

echo "Starting Code Sandbox API server..."
echo "  Rootfs: $ROOTFS_PATH"
echo "  Kernel: $KERNEL_PATH"
echo "  Port: $API_PORT"
echo ""
echo "API will be available at http://localhost:8000"
echo "Press Ctrl+C to stop"
echo ""

# Run the API server
exec ./cmd/api/api