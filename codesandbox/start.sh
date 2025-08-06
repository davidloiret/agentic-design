#!/bin/bash

# Simple start script for Codesandbox

cd "$(dirname "$0")"

echo "🚀 Starting Codesandbox..."
echo ""

# Signal handling for graceful shutdown
cleanup() {
    echo ""
    echo "🛑 Received interrupt signal. Shutting down..."
    
    # Kill any running API processes
    ./kill-port-8000.sh >/dev/null 2>&1 || true
    
    # Kill the child process if it exists
    if [ ! -z "$child_pid" ]; then
        kill -TERM "$child_pid" 2>/dev/null || true
        wait "$child_pid" 2>/dev/null || true
    fi
    
    echo "✅ Codesandbox stopped."
    exit 0
}

# Set up signal traps
trap cleanup SIGINT SIGTERM

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
./kill-port-8000.sh

# Ensure scripts are executable
chmod +x scripts/*.sh *.sh 2>/dev/null

# Run the main script and capture its PID
./run.sh &
child_pid=$!

# Wait for the child process
wait "$child_pid"