#!/bin/bash

# Firecracker Container Startup Script
# Sets up networking and starts the API service in production

set -e

echo "🔥 Starting Firecracker API Container..."

# Function to setup bridge network inside container
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
    ip link add name $bridge_name type bridge 2>/dev/null || {
        echo "⚠️  Bridge creation failed (may already exist)"
    }
    
    # Set bridge IP
    ip addr add $bridge_ip dev $bridge_name 2>/dev/null || {
        echo "⚠️  Bridge IP assignment failed (may already exist)"
    }
    
    # Bring bridge up
    ip link set dev $bridge_name up || {
        echo "❌ Failed to bring up bridge $bridge_name"
        return 1
    }
    
    echo "✅ Bridge network $bridge_name configured"
}

# Function to setup iptables rules
setup_iptables() {
    local guest_range="169.254.0.0/24"
    local bridge_name="fcbr0"
    
    echo "🔒 Setting up iptables rules..."
    
    # Enable IP forwarding
    echo 1 > /proc/sys/net/ipv4/ip_forward
    
    # Setup NAT for VM guests (ignore errors if rules already exist)
    iptables -t nat -C POSTROUTING -s $guest_range ! -d $guest_range -j MASQUERADE 2>/dev/null || \
        iptables -t nat -A POSTROUTING -s $guest_range ! -d $guest_range -j MASQUERADE 2>/dev/null || true
    
    # Allow forwarding between VMs and to/from host
    iptables -C FORWARD -i $bridge_name -o $bridge_name -j ACCEPT 2>/dev/null || \
        iptables -A FORWARD -i $bridge_name -o $bridge_name -j ACCEPT 2>/dev/null || true
    
    iptables -C FORWARD -i $bridge_name -j ACCEPT 2>/dev/null || \
        iptables -A FORWARD -i $bridge_name -j ACCEPT 2>/dev/null || true
    
    iptables -C FORWARD -o $bridge_name -j ACCEPT 2>/dev/null || \
        iptables -A FORWARD -o $bridge_name -j ACCEPT 2>/dev/null || true
    
    echo "✅ iptables rules configured"
}

# Function to verify KVM access
verify_kvm() {
    echo "🔍 Verifying KVM access..."
    
    if [[ ! -e /dev/kvm ]]; then
        echo "❌ /dev/kvm not found - KVM may not be available"
        echo "⚠️  Container may not have been started with --device /dev/kvm:/dev/kvm"
        return 1
    fi
    
    if [[ ! -r /dev/kvm || ! -w /dev/kvm ]]; then
        echo "❌ Insufficient permissions for /dev/kvm"
        return 1
    fi
    
    echo "✅ KVM access verified"
}

# Function to build VM images if needed
ensure_vm_images() {
    echo "🏗️  Ensuring VM images are built..."
    
    local images_dir="/opt/firecracker"
    
    # Create directories if they don't exist
    mkdir -p "$images_dir/rootfs/python"
    mkdir -p "$images_dir/rootfs/rust" 
    mkdir -p "$images_dir/rootfs/typescript"
    mkdir -p "$images_dir/kernels/python"
    mkdir -p "$images_dir/kernels/rust"
    mkdir -p "$images_dir/kernels/typescript"
    
    # Check if VM images exist, build if not
    if [[ ! -f "$images_dir/rootfs/python/rootfs.ext4" || 
          ! -f "$images_dir/rootfs/rust/rootfs.ext4" || 
          ! -f "$images_dir/rootfs/typescript/rootfs.ext4" ]]; then
        echo "📦 VM images not found, building them..."
        
        # Try to build VM images, but don't fail if it doesn't work
        python3 build_vm_images.py || {
            echo "⚠️  VM image building failed - will use Docker fallback"
            echo "This is expected in some containerized environments"
        }
    else
        echo "✅ VM images already exist"
    fi
}

# Function to start the API service
start_api_service() {
    echo "🚀 Starting Firecracker API service..."
    
    # Set default environment variables if not provided
    export SECURITY_LEVEL=${SECURITY_LEVEL:-sandbox}
    export FIRECRACKER_POOL_SIZE=${FIRECRACKER_POOL_SIZE:-3}
    export FIRECRACKER_MAX_VMS=${FIRECRACKER_MAX_VMS:-10}
    export FIRECRACKER_VM_TIMEOUT=${FIRECRACKER_VM_TIMEOUT:-30}
    export PYTHONUNBUFFERED=${PYTHONUNBUFFERED:-1}
    
    echo "📋 Configuration:"
    echo "   • Security Level: $SECURITY_LEVEL"
    echo "   • Pool Size: $FIRECRACKER_POOL_SIZE"
    echo "   • Max VMs: $FIRECRACKER_MAX_VMS"
    echo "   • VM Timeout: $FIRECRACKER_VM_TIMEOUT"
    
    # Start the API service
    echo "🌟 Starting API on http://0.0.0.0:8000"
    exec python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --workers 1
}

# Main execution
main() {
    echo "🔥 Firecracker Container Startup"
    echo "================================"
    
    # Change to app directory
    cd /app
    
    # Run setup steps (continue on failure for robustness)
    verify_kvm || echo "⚠️  KVM verification failed, continuing anyway"
    setup_bridge_network || echo "⚠️  Bridge setup failed, continuing anyway"  
    setup_iptables || echo "⚠️  iptables setup failed, continuing anyway"
    ensure_vm_images || echo "⚠️  VM image setup failed, continuing anyway"
    
    echo ""
    echo "🎉 Container setup completed!"
    echo ""
    
    # Start the API service (this will not return)
    start_api_service
}

# Trap signals for graceful shutdown
trap 'echo "🛑 Shutting down Firecracker API..."; exit 0' TERM INT

# Run main function
main "$@"