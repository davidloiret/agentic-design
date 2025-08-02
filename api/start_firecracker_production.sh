#!/bin/bash

# Production Firecracker Startup Script
# Ensures proper network setup and VM initialization

set -e

echo "🔥 Starting Firecracker Production Environment..."

# Check if running as root or with sudo capabilities
if [[ $EUID -ne 0 ]]; then
    echo "❌ This script requires root privileges for network setup"
    echo "Please run with: sudo $0"
    exit 1
fi

# Function to setup bridge network
setup_bridge_network() {
    local bridge_name="fcbr0"
    local bridge_ip="169.254.0.1/24"
    
    echo "🌐 Setting up bridge network..."
    
    # Check if bridge already exists
    if ip link show $bridge_name >/dev/null 2>&1; then
        echo "✅ Bridge $bridge_name already exists"
        return 0
    fi
    
    # Create bridge
    ip link add name $bridge_name type bridge || {
        echo "❌ Failed to create bridge $bridge_name"
        return 1
    }
    
    # Set bridge IP
    ip addr add $bridge_ip dev $bridge_name || {
        echo "⚠️  Failed to set bridge IP (may already exist)"
    }
    
    # Bring bridge up
    ip link set dev $bridge_name up || {
        echo "❌ Failed to bring up bridge $bridge_name"
        return 1
    }
    
    echo "✅ Bridge network $bridge_name configured with IP $bridge_ip"
}

# Function to setup iptables rules
setup_iptables() {
    local guest_range="169.254.0.0/24"
    local bridge_name="fcbr0"
    
    echo "🔒 Setting up iptables rules..."
    
    # Enable IP forwarding
    echo 1 > /proc/sys/net/ipv4/ip_forward
    
    # Setup NAT for VM guests
    iptables -t nat -C POSTROUTING -s $guest_range ! -d $guest_range -j MASQUERADE 2>/dev/null || \
        iptables -t nat -A POSTROUTING -s $guest_range ! -d $guest_range -j MASQUERADE
    
    # Allow forwarding between VMs and to/from host
    iptables -C FORWARD -i $bridge_name -o $bridge_name -j ACCEPT 2>/dev/null || \
        iptables -A FORWARD -i $bridge_name -o $bridge_name -j ACCEPT
    
    iptables -C FORWARD -i $bridge_name -j ACCEPT 2>/dev/null || \
        iptables -A FORWARD -i $bridge_name -j ACCEPT
    
    iptables -C FORWARD -o $bridge_name -j ACCEPT 2>/dev/null || \
        iptables -A FORWARD -o $bridge_name -j ACCEPT
    
    echo "✅ iptables rules configured"
}

# Function to verify Firecracker installation
verify_firecracker() {
    echo "🧪 Verifying Firecracker installation..."
    
    if ! command -v firecracker >/dev/null 2>&1; then
        echo "❌ Firecracker not found in PATH"
        echo "Please install Firecracker or run setup_firecracker_production.sh first"
        return 1
    fi
    
    if ! firecracker --version >/dev/null 2>&1; then
        echo "❌ Firecracker installation appears broken"
        return 1
    fi
    
    echo "✅ Firecracker $(firecracker --version) is ready"
}

# Function to verify KVM access
verify_kvm() {
    echo "🔍 Verifying KVM access..."
    
    if [[ ! -e /dev/kvm ]]; then
        echo "❌ /dev/kvm not found - KVM may not be available"
        return 1
    fi
    
    if [[ ! -r /dev/kvm || ! -w /dev/kvm ]]; then
        echo "❌ Insufficient permissions for /dev/kvm"
        echo "Fix with: sudo chmod 666 /dev/kvm"
        return 1
    fi
    
    echo "✅ KVM access verified"
}

# Function to build VM images if needed
build_vm_images() {
    echo "🏗️  Checking VM images..."
    
    local images_dir="/opt/firecracker"
    
    if [[ ! -d "$images_dir/rootfs/python" || ! -d "$images_dir/rootfs/rust" || ! -d "$images_dir/rootfs/typescript" ]]; then
        echo "📦 VM images not found, building them now..."
        cd /Users/dlo.ext/code/agentic-design/api
        python3 build_vm_images.py || {
            echo "❌ Failed to build VM images"
            return 1
        }
    else
        echo "✅ VM images already built"
    fi
}

# Function to start the API service
start_api_service() {
    echo "🚀 Starting Firecracker API service..."
    
    cd /Users/dlo.ext/code/agentic-design/api
    
    # Set environment variables for production
    export SECURITY_LEVEL=sandbox
    export FIRECRACKER_POOL_SIZE=3
    export PYTHONUNBUFFERED=1
    
    # Check if service is already running
    if pgrep -f "uvicorn.*main:app" > /dev/null; then
        echo "⚠️  API service appears to be already running"
        echo "Stop it first with: sudo pkill -f 'uvicorn.*main:app'"
        return 1
    fi
    
    # Start the service
    echo "🌟 Starting API on http://0.0.0.0:8000"
    python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 &
    
    local api_pid=$!
    echo "📝 API service started with PID: $api_pid"
    
    # Wait a moment and check if it's still running
    sleep 3
    if ! kill -0 $api_pid 2>/dev/null; then
        echo "❌ API service failed to start"
        return 1
    fi
    
    echo "✅ API service is running"
    echo "🌐 API available at: http://localhost:8000"
    echo "📊 Health check: curl http://localhost:8000/health"
    echo "📋 API docs: http://localhost:8000/docs"
}

# Main execution
main() {
    echo "🔥 Firecracker Production Startup"
    echo "================================"
    
    # Run all setup steps
    verify_firecracker || exit 1
    verify_kvm || exit 1
    setup_bridge_network || exit 1
    setup_iptables || exit 1
    build_vm_images || exit 1
    start_api_service || exit 1
    
    echo ""
    echo "🎉 Firecracker production environment is ready!"
    echo ""
    echo "📋 Service Information:"
    echo "   • API URL: http://localhost:8000"
    echo "   • Health: curl http://localhost:8000/health"
    echo "   • Docs:   http://localhost:8000/docs"
    echo ""
    echo "🔧 Management Commands:"
    echo "   • Stop:   sudo pkill -f 'uvicorn.*main:app'"
    echo "   • Logs:   tail -f /var/log/firecracker-api.log"
    echo "   • Test:   python3 quick_test.py"
    echo ""
    echo "🔍 Monitoring:"
    echo "   • Processes: ps aux | grep firecracker"
    echo "   • Network:   ip addr show fcbr0"
    echo "   • VMs:       ls -la /tmp/firecracker-*.socket"
}

# Run main function
main "$@"