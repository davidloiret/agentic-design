#!/bin/bash
set -e

echo "Setting up Firecracker for secure code execution..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "This script must be run as root"
    exit 1
fi

# Install Firecracker
echo "Installing Firecracker..."
FIRECRACKER_VERSION="v1.4.1"
ARCH=$(uname -m)

# Download Firecracker binary
wget -O /usr/local/bin/firecracker \
    "https://github.com/firecracker-microvm/firecracker/releases/download/${FIRECRACKER_VERSION}/firecracker-${FIRECRACKER_VERSION}-${ARCH}.tgz"

# Extract and install
tar -xzf /tmp/firecracker-${FIRECRACKER_VERSION}-${ARCH}.tgz -C /tmp
mv /tmp/release-${FIRECRACKER_VERSION}-${ARCH}/firecracker-${FIRECRACKER_VERSION}-${ARCH} /usr/local/bin/firecracker
chmod +x /usr/local/bin/firecracker

# Create Firecracker directories
echo "Creating Firecracker directories..."
mkdir -p /opt/firecracker/{kernels,rootfs}
mkdir -p /opt/firecracker/kernels/{python,rust,typescript}
mkdir -p /opt/firecracker/rootfs/{python,rust,typescript}

# Set up KVM permissions
echo "Setting up KVM permissions..."
groupadd -f kvm
usermod -a -G kvm $(whoami)

# Create udev rules for KVM access
cat > /etc/udev/rules.d/99-kvm.rules << EOF
KERNEL=="kvm", GROUP="kvm", MODE="0666"
EOF

# Reload udev rules
udevadm control --reload-rules
udevadm trigger

# Install dependencies for building VM images
echo "Installing dependencies..."
apt-get update
apt-get install -y \
    wget curl \
    qemu-utils \
    e2fsprogs \
    debootstrap \
    docker.io

# Enable and start Docker (needed for rootfs building)
systemctl enable docker
systemctl start docker

# Build VM images
echo "Building VM images..."
python3 build_vm_images.py

# Set proper permissions
chown -R 1000:1000 /opt/firecracker
chmod -R 755 /opt/firecracker

# Create systemd service for the API
cat > /etc/systemd/system/firecracker-api.service << EOF
[Unit]
Description=Firecracker Code Execution API
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/app
Environment=PYTHONPATH=/app
ExecStart=/usr/bin/python3 -m uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

# Enable the service
systemctl daemon-reload
systemctl enable firecracker-api

echo "Firecracker setup completed!"
echo "You can now start the API with: systemctl start firecracker-api"
echo "Or run directly with: python3 main.py"
echo ""
echo "Performance notes:"
echo "- Firecracker VMs start in ~100ms vs Docker's 2-5 seconds"
echo "- Memory overhead: ~5MB per VM vs ~50MB per Docker container"
echo "- Better isolation with hardware-level virtualization"
echo "- VM pool maintains warm VMs for instant execution"