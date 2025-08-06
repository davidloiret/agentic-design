#!/bin/bash
set -e

# Build rootfs for Firecracker VMs with language runtimes
# Minimal Alpine Linux rootfs with Python, Rust, Node/TS, and Deno (musl) support

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOTFS_DIR="${SCRIPT_DIR}/../rootfs"
BUILD_DIR="${ROOTFS_DIR}/build"
ROOTFS_FILE="${ROOTFS_DIR}/rootfs.ext4"
ROOTFS_SIZE="2G"

# --- CONFIG ---
# You can override ALPINE_VERSION via env: ALPINE_VERSION=3.21 ./scripts/build-rootfs.sh
ALPINE_VERSION="${ALPINE_VERSION:-3.21}"
ALPINE_MIRROR="${ALPINE_MIRROR:-http://dl-cdn.alpinelinux.org/alpine}"

# Root required
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root (sudo)"
  exit 1
fi

mkdir -p "${ROOTFS_DIR}" "${BUILD_DIR}"

echo "Building rootfs with language runtimes..."

# Fresh image
if [ -f "${ROOTFS_FILE}" ]; then
  echo "Rootfs already exists. Removing old one..."
  rm -f "${ROOTFS_FILE}"
fi

echo "Creating ${ROOTFS_SIZE} ext4 filesystem..."
dd if=/dev/zero of="${ROOTFS_FILE}" bs=1M count=2048
mkfs.ext4 "${ROOTFS_FILE}"

MOUNT_DIR="$(mktemp -d)"
mount -o loop "${ROOTFS_FILE}" "${MOUNT_DIR}"

# --- Download Alpine minirootfs ---
echo "Downloading Alpine Linux minirootfs (v${ALPINE_VERSION})..."
ALPINE_BASE_URL="${ALPINE_MIRROR}/v${ALPINE_VERSION}/releases/x86_64"
# try .0 first, then latest patch we know commonly exists (.13), finally latest-stable
CANDIDATES=(
  "${ALPINE_BASE_URL}/alpine-minirootfs-${ALPINE_VERSION}.0-x86_64.tar.gz"
  "${ALPINE_BASE_URL}/alpine-minirootfs-${ALPINE_VERSION}.13-x86_64.tar.gz"
  "${ALPINE_MIRROR}/latest-stable/releases/x86_64/alpine-minirootfs-${ALPINE_VERSION}.0-x86_64.tar.gz"
)

if [ ! -f "${BUILD_DIR}/alpine-minirootfs.tar.gz" ]; then
  DL_OK=0
  for URL in "${CANDIDATES[@]}"; do
    if wget -O "${BUILD_DIR}/alpine-minirootfs.tar.gz" "${URL}"; then
      DL_OK=1
      break
    fi
  done
  if [ "$DL_OK" -ne 1 ]; then
    echo "Failed to download Alpine minirootfs for v${ALPINE_VERSION}."
    echo "Try setting ALPINE_VERSION to a known release (e.g., 3.21) and re-run."
    exit 1
  fi
fi

echo "Extracting Alpine Linux..."
tar -xzf "${BUILD_DIR}/alpine-minirootfs.tar.gz" -C "${MOUNT_DIR}"

# --- Configure APK repos ---
tee "${MOUNT_DIR}/etc/apk/repositories" > /dev/null <<EOF
${ALPINE_MIRROR}/v${ALPINE_VERSION}/main
${ALPINE_MIRROR}/v${ALPINE_VERSION}/community
EOF

# DNS for chroot
cp /etc/resolv.conf "${MOUNT_DIR}/etc/resolv.conf" || true

# Mount proc/sys/dev for chroot
mount -t proc proc "${MOUNT_DIR}/proc"
mount -t sysfs sys "${MOUNT_DIR}/sys"
mount -t devtmpfs dev "${MOUNT_DIR}/dev"

cleanup() {
  umount "${MOUNT_DIR}/proc" 2>/dev/null || true
  umount "${MOUNT_DIR}/sys" 2>/dev/null || true
  umount "${MOUNT_DIR}/dev" 2>/dev/null || true
  umount "${MOUNT_DIR}" 2>/dev/null || true
  rm -rf "${MOUNT_DIR}"
}
trap cleanup EXIT

echo "Installing packages..."
chroot "${MOUNT_DIR}" /bin/sh << 'CHROOT_EOF'
set -e

apk update

# Base tools
apk add --no-cache \
  bash \
  ca-certificates \
  curl \
  wget \
  git \
  build-base \
  linux-headers \
  openssl \
  unzip \
  iproute2

# Python
echo "Installing Python..."
apk add --no-cache python3 python3-dev py3-pip
ln -sf /usr/bin/python3 /usr/bin/python

# Node + npm
echo "Installing Node.js..."
apk add --no-cache nodejs npm

# Deno (from repo; Alpine >=3.21 has matching deps)
echo "Installing Deno (Alpine repo)..."
if ! apk add --no-cache deno; then
  echo "Falling back: adding edge/community repo just for deno..."
  echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories
  apk update
  apk add --no-cache deno
fi

# Rust (minimal profile)
echo "Installing Rust..."
cd /tmp
wget -O rustup.sh https://sh.rustup.rs
sh rustup.sh -y --default-toolchain stable --profile minimal
# Ensure default toolchain is set properly
export PATH="/root/.cargo/bin:$PATH"
/root/.cargo/bin/rustup default stable
# Create direct symlinks to working binaries (bypass rustup wrapper issues)
ln -sf /root/.rustup/toolchains/stable-x86_64-unknown-linux-musl/bin/rustc /usr/local/bin/rustc
ln -sf /root/.rustup/toolchains/stable-x86_64-unknown-linux-musl/bin/cargo /usr/local/bin/cargo
ln -sf /root/.cargo/bin/rustup /usr/local/bin/rustup
rm -f rustup.sh

# Clean up
rm -rf /var/cache/apk/* /tmp/*
CHROOT_EOF

# Agent dir
mkdir -p "${MOUNT_DIR}/usr/local/bin"

# Init
tee "${MOUNT_DIR}/init" > /dev/null <<'EOF'
#!/bin/sh
# Init script for Firecracker VM

# Mount essential filesystems
mount -t proc proc /proc 2>/dev/null || true
mount -t sysfs sysfs /sys 2>/dev/null || true
mount -t devtmpfs devtmpfs /dev 2>/dev/null || true

# Devices
mknod /dev/null c 1 3 2>/dev/null || true
mknod /dev/zero c 1 5 2>/dev/null || true
mknod /dev/random c 1 8 2>/dev/null || true
mknod /dev/urandom c 1 9 2>/dev/null || true

# Networking
ip link set lo up 2>/dev/null || true
VM_ID=$(grep -oE 'vm_id=[0-9]+' /proc/cmdline | head -n1 | cut -d= -f2)
: "${VM_ID:=0}"
VM_IP="172.16.0.$((100 + VM_ID))"
ip addr add ${VM_IP}/24 dev eth0 2>/dev/null || true
ip link set eth0 up 2>/dev/null || true
ip route add default via 172.16.0.1 2>/dev/null || true

# Rust path - ensure toolchain is available
export PATH="/root/.cargo/bin:/root/.rustup/toolchains/stable-x86_64-unknown-linux-musl/bin:$PATH"

sleep 1

if [ -x /usr/local/bin/agent ]; then
  echo "Starting agent on ${VM_IP}:8080..."
  PATH="/root/.cargo/bin:/root/.rustup/toolchains/stable-x86_64-unknown-linux-musl/bin:$PATH" /usr/local/bin/agent &
else
  echo "Agent not found, waiting..."
fi

# Keep init alive
while true; do sleep 10; done
EOF
chmod +x "${MOUNT_DIR}/init"

# Agent starter
tee "${MOUNT_DIR}/usr/local/bin/start-agent.sh" > /dev/null <<'EOF'
#!/bin/sh
# Start the code execution agent

exec /usr/local/bin/agent
EOF
chmod +x "${MOUNT_DIR}/usr/local/bin/start-agent.sh"

# Tidy
rm -f "${MOUNT_DIR}/etc/resolv.conf"

echo "Rootfs created successfully at ${ROOTFS_FILE}"
