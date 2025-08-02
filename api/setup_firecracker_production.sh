#!/bin/bash

# Production Firecracker Setup Script
# Sets up all dependencies, network infrastructure, and builds VM images

set -e

echo "🔥 Setting up Firecracker Production Environment..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Error: This script must be run as root"
    echo "Please run: sudo $0"
    exit 1
fi

# Get the actual user who called sudo
ACTUAL_USER=${SUDO_USER:-$(logname)}
ACTUAL_HOME=$(eval echo ~$ACTUAL_USER)

echo "👤 Setting up for user: $ACTUAL_USER"

# 1. Install system dependencies
echo "📦 Installing system dependencies..."
apt-get update
apt-get install -y \
    qemu-utils \
    e2fsprogs \
    bridge-utils \
    iproute2 \
    iptables \
    python3 \
    python3-pip \
    curl \
    wget \
    build-essential \
    pkg-config \
    libssl-dev \
    docker.io \
    docker-compose

# 2. Install Firecracker
echo "🔥 Installing Firecracker..."
FIRECRACKER_VERSION="v1.4.1"
ARCH=$(uname -m)
wget -O /tmp/firecracker.tgz \
    "https://github.com/firecracker-microvm/firecracker/releases/download/${FIRECRACKER_VERSION}/firecracker-${FIRECRACKER_VERSION}-${ARCH}.tgz"
tar -xzf /tmp/firecracker.tgz -C /tmp
mv /tmp/release-${FIRECRACKER_VERSION}-${ARCH}/firecracker-${FIRECRACKER_VERSION}-${ARCH} /usr/local/bin/firecracker
chmod +x /usr/local/bin/firecracker
rm -rf /tmp/firecracker.tgz /tmp/release-*

# 3. Setup KVM permissions
echo "🔐 Setting up KVM permissions..."
groupadd -f kvm
usermod -a -G kvm $ACTUAL_USER
usermod -a -G docker $ACTUAL_USER
echo 'KERNEL=="kvm", GROUP="kvm", MODE="0666"' > /etc/udev/rules.d/99-kvm.rules
udevadm control --reload-rules
udevadm trigger

# 4. Create Firecracker directories
echo "📁 Creating Firecracker directories..."
mkdir -p /opt/firecracker/{kernels,rootfs}
mkdir -p /opt/firecracker/kernels/{python,rust,typescript}
mkdir -p /opt/firecracker/rootfs/{python,rust,typescript}
chown -R $ACTUAL_USER:$ACTUAL_USER /opt/firecracker

# 5. Setup network infrastructure
echo "🌐 Setting up network infrastructure..."

# Create bridge for Firecracker VMs
BRIDGE_NAME="fcbr0"
BRIDGE_IP="169.254.0.1/24"
GUEST_IP_RANGE="169.254.0.0/24"

# Remove existing bridge if it exists
ip link delete $BRIDGE_NAME 2>/dev/null || true

# Create new bridge
ip link add name $BRIDGE_NAME type bridge
ip addr add $BRIDGE_IP dev $BRIDGE_NAME
ip link set dev $BRIDGE_NAME up

# Enable IP forwarding
echo 'net.ipv4.ip_forward=1' > /etc/sysctl.d/99-firecracker.conf
sysctl -p /etc/sysctl.d/99-firecracker.conf

# Setup iptables rules for VM networking
iptables -t nat -A POSTROUTING -s $GUEST_IP_RANGE ! -d $GUEST_IP_RANGE -j MASQUERADE
iptables -A FORWARD -i $BRIDGE_NAME -o $BRIDGE_NAME -j ACCEPT
iptables -A FORWARD -i $BRIDGE_NAME -j ACCEPT
iptables -A FORWARD -o $BRIDGE_NAME -j ACCEPT

# Make iptables rules persistent
iptables-save > /etc/iptables/rules.v4

# Create script to setup TAP interfaces
cat > /usr/local/bin/setup-tap.sh << 'EOF'
#!/bin/bash
# Setup TAP interface for Firecracker VM

VM_ID=$1
if [ -z "$VM_ID" ]; then
    echo "Usage: $0 <vm_id>"
    exit 1
fi

TAP_NAME="tap$VM_ID"
BRIDGE_NAME="fcbr0"

# Create TAP interface
ip tuntap add dev $TAP_NAME mode tap user $(whoami)
ip link set dev $TAP_NAME up
ip link set dev $TAP_NAME master $BRIDGE_NAME

echo "TAP interface $TAP_NAME created and added to bridge $BRIDGE_NAME"
EOF

chmod +x /usr/local/bin/setup-tap.sh

# Create script to cleanup TAP interfaces
cat > /usr/local/bin/cleanup-tap.sh << 'EOF'
#!/bin/bash
# Cleanup TAP interface for Firecracker VM

VM_ID=$1
if [ -z "$VM_ID" ]; then
    echo "Usage: $0 <vm_id>"
    exit 1
fi

TAP_NAME="tap$VM_ID"

# Remove TAP interface
ip link delete $TAP_NAME 2>/dev/null || true

echo "TAP interface $TAP_NAME removed"
EOF

chmod +x /usr/local/bin/cleanup-tap.sh

# Create network persistence script
cat > /etc/systemd/system/firecracker-network.service << EOF
[Unit]
Description=Firecracker Network Setup
After=network.target

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/bin/bash -c 'ip link add name fcbr0 type bridge 2>/dev/null || true; ip addr add 169.254.0.1/24 dev fcbr0 2>/dev/null || true; ip link set dev fcbr0 up'
ExecStop=/bin/bash -c 'ip link delete fcbr0 2>/dev/null || true'

[Install]
WantedBy=multi-user.target
EOF

systemctl enable firecracker-network.service
systemctl start firecracker-network.service

# 6. Install Python dependencies
echo "🐍 Installing Python dependencies..."
cd /Users/dlo.ext/code/agentic-design/api
pip3 install -r requirements.txt

# 7. Install Node.js and TypeScript tools (for TypeScript VMs)
echo "📜 Installing Node.js and TypeScript tools..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
npm install -g typescript ts-node tsx

# 8. Install Rust (for Rust VMs)
echo "🦀 Installing Rust..."
su - $ACTUAL_USER -c 'curl --proto "=https" --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y'

# 9. Build VM images
echo "🏗️ Building VM images with guest agent..."
cd /Users/dlo.ext/code/agentic-design/api
python3 build_vm_images.py

# 10. Create systemd service for Firecracker API
echo "🚀 Creating systemd service..."
cat > /etc/systemd/system/firecracker-api.service << EOF
[Unit]
Description=Firecracker Code Execution API
After=network.target firecracker-network.service

[Service]
Type=simple
User=$ACTUAL_USER
WorkingDirectory=/Users/dlo.ext/code/agentic-design/api
Environment=PATH=/usr/local/bin:/usr/bin:/bin
Environment=PYTHONPATH=/Users/dlo.ext/code/agentic-design/api
ExecStart=/usr/bin/python3 -m uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# 11. Set permissions and ownership
echo "🔐 Setting up permissions..."
chown -R $ACTUAL_USER:$ACTUAL_USER /Users/dlo.ext/code/agentic-design/api
chmod +x /Users/dlo.ext/code/agentic-design/api/*.py

# 12. Test Firecracker installation
echo "🧪 Testing Firecracker installation..."
if firecracker --version; then
    echo "✅ Firecracker installed successfully"
else
    echo "❌ Firecracker installation failed"
    exit 1
fi

# 13. Test KVM access
if [ -r /dev/kvm ] && [ -w /dev/kvm ]; then
    echo "✅ KVM access configured successfully"
else
    echo "❌ KVM access not properly configured"
    echo "You may need to reboot for KVM permissions to take effect"
fi

# 14. Create quick start script
cat > /usr/local/bin/start-firecracker-api << 'EOF'
#!/bin/bash
echo "🔥 Starting Firecracker API service..."
systemctl start firecracker-api
systemctl status firecracker-api
echo "🌐 API available at http://localhost:8000"
echo "📊 Health check: curl http://localhost:8000/health"
EOF

chmod +x /usr/local/bin/start-firecracker-api

cat > /usr/local/bin/stop-firecracker-api << 'EOF'
#!/bin/bash
echo "🛑 Stopping Firecracker API service..."
systemctl stop firecracker-api
echo "✅ Firecracker API stopped"
EOF

chmod +x /usr/local/bin/stop-firecracker-api

echo ""
echo "🎉 Firecracker production setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Reboot the system to ensure all permissions take effect:"
echo "   sudo reboot"
echo ""
echo "2. After reboot, start the API service:"
echo "   start-firecracker-api"
echo ""
echo "3. Test the API:"
echo "   curl http://localhost:8000/health"
echo ""
echo "📝 Service management:"
echo "   • Start:  start-firecracker-api"
echo "   • Stop:   stop-firecracker-api"
echo "   • Status: systemctl status firecracker-api"
echo "   • Logs:   journalctl -u firecracker-api -f"
echo ""
echo "🔧 Manual VM testing:"
echo "   cd /Users/dlo.ext/code/agentic-design/api"
echo "   python3 quick_test.py"
echo ""