#!/bin/bash
set -e

# Download and setup Firecracker kernel

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KERNEL_DIR="${SCRIPT_DIR}/../kernel"

mkdir -p "${KERNEL_DIR}"

echo "Downloading Firecracker kernel..."

# Check if kernel already exists
if [ -f "${KERNEL_DIR}/vmlinux" ]; then
    echo "Kernel already exists at ${KERNEL_DIR}/vmlinux"
    exit 0
fi

# Download a pre-built kernel that works with Firecracker
# Using the S3 bucket maintained by Firecracker team
KERNEL_URL="https://s3.amazonaws.com/spec.ccfc.min/firecracker-kernels/vmlinux-5.10.186"

echo "Downloading kernel from: ${KERNEL_URL}"
if wget -O "${KERNEL_DIR}/vmlinux" "${KERNEL_URL}"; then
    echo "Successfully downloaded kernel"
else
    echo "Failed to download from primary source, trying alternative..."
    # Alternative kernel source
    ALT_KERNEL_URL="https://s3.amazonaws.com/spec.ccfc.min/img/quickstart_guide/x86_64/kernels/vmlinux.bin"
    if wget -O "${KERNEL_DIR}/vmlinux" "${ALT_KERNEL_URL}"; then
        echo "Successfully downloaded kernel from alternative source"
    else
        echo "ERROR: Failed to download kernel from all sources"
        echo "You can manually download a kernel and place it at: ${KERNEL_DIR}/vmlinux"
        exit 1
    fi
fi

# Make kernel readable
chmod 644 "${KERNEL_DIR}/vmlinux"

echo "Kernel downloaded to ${KERNEL_DIR}/vmlinux"

# Verify kernel file
if file "${KERNEL_DIR}/vmlinux" | grep -q "Linux kernel"; then
    echo "✅ Kernel verification passed"
else
    echo "⚠️  Warning: File may not be a valid kernel image"
fi