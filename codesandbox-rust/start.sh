#!/bin/bash

# Start script for Codesandbox Rust implementation
# This provides the same interface as the Go version

cd "$(dirname "$0")"

echo "🦀 Starting Codesandbox Rust..."
echo ""

# Check if we need sudo
if [ "$EUID" -ne 0 ]; then
    echo "This script requires root privileges."
    echo "Re-running with sudo..."
    exec sudo "$0" "$@"
fi

# Quick check for KVM
if [ ! -e /dev/kvm ]; then
    echo "❌ Error: /dev/kvm not found"
    echo "Please ensure KVM is enabled in your system"
    exit 1
fi

# Kill any existing processes on port 8000
./kill-port-8000.sh 2>/dev/null || true

# Ensure scripts are executable
chmod +x *.sh 2>/dev/null || true

# Run the main script
exec ./run.sh