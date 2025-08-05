#!/bin/bash
set -e

# Copy the built agent binary to the rootfs

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOTFS_FILE="${SCRIPT_DIR}/../rootfs/rootfs.ext4"
AGENT_BINARY="${SCRIPT_DIR}/../cmd/agent/agent"

if [ ! -f "${AGENT_BINARY}" ]; then
    echo "Error: Agent binary not found at ${AGENT_BINARY}"
    echo "Please build the agent first with: make build-agent"
    exit 1
fi

if [ ! -f "${ROOTFS_FILE}" ]; then
    echo "Error: Rootfs not found at ${ROOTFS_FILE}"
    echo "Please build the rootfs first with: make build-rootfs"
    exit 1
fi

# Mount the rootfs
MOUNT_DIR=$(mktemp -d)
sudo mount -o loop "${ROOTFS_FILE}" "${MOUNT_DIR}"

# Function to cleanup on exit
cleanup() {
    sudo umount "${MOUNT_DIR}" || true
    rm -rf "${MOUNT_DIR}"
}
trap cleanup EXIT

# Copy agent binary
echo "Copying agent to rootfs..."
sudo cp "${AGENT_BINARY}" "${MOUNT_DIR}/usr/local/bin/agent"
sudo chmod +x "${MOUNT_DIR}/usr/local/bin/agent"

echo "Agent copied successfully"