#!/bin/bash
set -e

# Simple kernel download script

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KERNEL_DIR="${SCRIPT_DIR}/../kernel"

mkdir -p "${KERNEL_DIR}"

echo "Downloading Firecracker kernel from quickstart guide..."

# Download the kernel from Firecracker's quickstart guide
cd "${KERNEL_DIR}"
wget -O vmlinux "https://s3.amazonaws.com/spec.ccfc.min/img/quickstart_guide/x86_64/kernels/vmlinux.bin"

# Make kernel readable
chmod 644 vmlinux

echo "Kernel downloaded successfully to ${KERNEL_DIR}/vmlinux"
ls -la vmlinux