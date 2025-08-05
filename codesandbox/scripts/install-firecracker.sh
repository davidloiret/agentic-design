#!/bin/bash
set -e

# Install Firecracker binary

echo "Installing Firecracker..."

# Download Firecracker v1.4.0
FIRECRACKER_VERSION="v1.4.0"
ARCH="x86_64"

cd /tmp
wget "https://github.com/firecracker-microvm/firecracker/releases/download/${FIRECRACKER_VERSION}/firecracker-${FIRECRACKER_VERSION}-${ARCH}.tgz"
tar -xzf "firecracker-${FIRECRACKER_VERSION}-${ARCH}.tgz"

# Install Firecracker binary
sudo mv "release-${FIRECRACKER_VERSION}-${ARCH}/firecracker-${FIRECRACKER_VERSION}-${ARCH}" /usr/local/bin/firecracker
sudo chmod +x /usr/local/bin/firecracker

# Install jailer (optional, for additional security)
sudo mv "release-${FIRECRACKER_VERSION}-${ARCH}/jailer-${FIRECRACKER_VERSION}-${ARCH}" /usr/local/bin/jailer
sudo chmod +x /usr/local/bin/jailer

# Clean up
rm -rf "firecracker-${FIRECRACKER_VERSION}-${ARCH}.tgz" "release-${FIRECRACKER_VERSION}-${ARCH}/"

echo "Firecracker installed successfully!"
firecracker --version