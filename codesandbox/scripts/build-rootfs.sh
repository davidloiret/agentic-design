#!/bin/bash
set -e

# Build rootfs for Firecracker VMs with language runtimes
# This script creates a minimal Alpine Linux rootfs with Python, Rust, and TypeScript support

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOTFS_DIR="${SCRIPT_DIR}/../rootfs"
BUILD_DIR="${ROOTFS_DIR}/build"
ROOTFS_FILE="${ROOTFS_DIR}/rootfs.ext4"
ROOTFS_SIZE="2G"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (sudo)"
    exit 1
fi

# Create directories
mkdir -p "${ROOTFS_DIR}" "${BUILD_DIR}"

echo "Building rootfs with language runtimes..."

# Check if rootfs already exists
if [ -f "${ROOTFS_FILE}" ]; then
    echo "Rootfs already exists. Removing old one..."
    rm -f "${ROOTFS_FILE}"
fi

# Create empty ext4 filesystem (2GB for languages)
echo "Creating ${ROOTFS_SIZE} ext4 filesystem..."
dd if=/dev/zero of="${ROOTFS_FILE}" bs=1M count=2048
mkfs.ext4 "${ROOTFS_FILE}"

# Mount the filesystem
MOUNT_DIR=$(mktemp -d)
sudo mount -o loop "${ROOTFS_FILE}" "${MOUNT_DIR}"

# Install Alpine Linux base system
ALPINE_VERSION="3.18"
ALPINE_MIRROR="http://dl-cdn.alpinelinux.org/alpine"

# Download Alpine minirootfs
echo "Downloading Alpine Linux minirootfs..."
ALPINE_URL="${ALPINE_MIRROR}/v${ALPINE_VERSION}/releases/x86_64/alpine-minirootfs-${ALPINE_VERSION}.0-x86_64.tar.gz"
if [ ! -f "${BUILD_DIR}/alpine-minirootfs.tar.gz" ]; then
    wget -O "${BUILD_DIR}/alpine-minirootfs.tar.gz" "${ALPINE_URL}" || {
        echo "Failed to download Alpine Linux. Trying latest version..."
        wget -O "${BUILD_DIR}/alpine-minirootfs.tar.gz" \
            "${ALPINE_MIRROR}/latest-stable/releases/x86_64/alpine-minirootfs-${ALPINE_VERSION}.13-x86_64.tar.gz"
    }
fi

# Extract to mount directory
echo "Extracting Alpine Linux..."
sudo tar -xzf "${BUILD_DIR}/alpine-minirootfs.tar.gz" -C "${MOUNT_DIR}"

# Configure Alpine repositories
sudo tee "${MOUNT_DIR}/etc/apk/repositories" > /dev/null <<EOF
${ALPINE_MIRROR}/v${ALPINE_VERSION}/main
${ALPINE_MIRROR}/v${ALPINE_VERSION}/community
EOF

# Copy resolv.conf for DNS
sudo cp /etc/resolv.conf "${MOUNT_DIR}/etc/resolv.conf"

# Mount proc and sys for chroot
sudo mount -t proc proc "${MOUNT_DIR}/proc"
sudo mount -t sysfs sys "${MOUNT_DIR}/sys"
sudo mount -t devtmpfs dev "${MOUNT_DIR}/dev"

# Update cleanup function to unmount these
cleanup() {
    sudo umount "${MOUNT_DIR}/proc" 2>/dev/null || true
    sudo umount "${MOUNT_DIR}/sys" 2>/dev/null || true
    sudo umount "${MOUNT_DIR}/dev" 2>/dev/null || true
    sudo umount "${MOUNT_DIR}" || true
    rm -rf "${MOUNT_DIR}"
}
trap cleanup EXIT

# Install packages in chroot
echo "Installing packages..."
sudo chroot "${MOUNT_DIR}" /bin/sh << 'CHROOT_EOF'
    # Update package index
    apk update
    
    # Install basic tools
    apk add --no-cache \
        bash \
        ca-certificates \
        curl \
        wget \
        git \
        build-base \
        linux-headers \
        openssl
    
    # Install Python
    echo "Installing Python..."
    apk add --no-cache \
        python3 \
        python3-dev \
        py3-pip
    
    # Create Python symlink
    ln -sf /usr/bin/python3 /usr/bin/python
    
    # Install Node.js and npm for TypeScript
    echo "Installing Node.js..."
    apk add --no-cache nodejs npm
    
    # Install Deno as TypeScript runtime
    echo "Installing Deno..."
    cd /tmp
    wget -qO- https://github.com/denoland/deno/releases/latest/download/deno-x86_64-unknown-linux-gnu.zip | unzip -
    mv deno /usr/local/bin/
    chmod +x /usr/local/bin/deno
    
    # Install Rust (smaller installation)
    echo "Installing Rust..."
    cd /tmp
    wget -O rustup.sh https://sh.rustup.rs
    sh rustup.sh -y --default-toolchain stable --profile minimal
    rm rustup.sh
    
    # Clean up
    rm -rf /var/cache/apk/* /tmp/*
CHROOT_EOF

# Copy agent binary (we'll build it later)
echo "Preparing agent..."
sudo mkdir -p "${MOUNT_DIR}/usr/local/bin"

# Create init script
echo "Creating init script..."
sudo tee "${MOUNT_DIR}/init" > /dev/null <<'EOF'
#!/bin/sh
# Init script for Firecracker VM

# Mount essential filesystems
mount -t proc proc /proc 2>/dev/null || true
mount -t sysfs sysfs /sys 2>/dev/null || true
mount -t devtmpfs devtmpfs /dev 2>/dev/null || true

# Create essential device nodes
mknod /dev/null c 1 3 2>/dev/null || true
mknod /dev/zero c 1 5 2>/dev/null || true
mknod /dev/random c 1 8 2>/dev/null || true
mknod /dev/urandom c 1 9 2>/dev/null || true

# Setup networking
ip link set lo up 2>/dev/null || true

# Get VM index from kernel cmdline or use default
VM_ID=$(grep -oE 'vm_id=[0-9]+' /proc/cmdline | head -n1 | cut -d= -f2)
VM_IP="172.16.0.$((100 + VM_ID))"

# Configure network with the assigned IP
ip addr add ${VM_IP}/24 dev eth0 2>/dev/null || true
ip link set eth0 up 2>/dev/null || true
ip route add default via 172.16.0.1 2>/dev/null || true

# Set PATH for Rust
export PATH="/root/.cargo/bin:$PATH"

# Wait for network to be ready
sleep 1

# Start agent
if [ -x /usr/local/bin/agent ]; then
    echo "Starting agent on ${VM_IP}:8080..."
    /usr/local/bin/agent &
else
    echo "Agent not found, waiting..."
fi

# Keep init running
while true; do
    sleep 10
done
EOF

sudo chmod +x "${MOUNT_DIR}/init"

# Create agent startup script (placeholder)
sudo tee "${MOUNT_DIR}/usr/local/bin/start-agent.sh" > /dev/null <<'EOF'
#!/bin/sh
# Start the code execution agent

# Set resource limits
ulimit -t 30      # CPU time (seconds)
ulimit -v 262144  # Virtual memory (KB)
ulimit -f 10240   # File size (KB)
ulimit -u 10      # Max processes

# Start agent
exec /usr/local/bin/agent
EOF

sudo chmod +x "${MOUNT_DIR}/usr/local/bin/start-agent.sh"

# Clean up
sudo rm -f "${MOUNT_DIR}/etc/resolv.conf"

echo "Rootfs created successfully at ${ROOTFS_FILE}"