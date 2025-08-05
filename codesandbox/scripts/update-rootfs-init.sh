#!/bin/bash
set -e

# Update rootfs with proper init system and agent

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOTFS_FILE="${SCRIPT_DIR}/../rootfs/rootfs.ext4"
AGENT_BINARY="${SCRIPT_DIR}/../cmd/agent/agent"

if [ "$EUID" -ne 0 ]; then 
    echo "Error: This script must be run as root"
    exit 1
fi

if [ ! -f "$ROOTFS_FILE" ]; then
    echo "Error: rootfs not found at $ROOTFS_FILE"
    exit 1
fi

if [ ! -f "$AGENT_BINARY" ]; then
    echo "Error: agent binary not found at $AGENT_BINARY"
    exit 1
fi

# Mount rootfs
MOUNT_DIR=$(mktemp -d)
mount -o loop "$ROOTFS_FILE" "$MOUNT_DIR"

cleanup() {
    umount "$MOUNT_DIR" || true
    rm -rf "$MOUNT_DIR"
}
trap cleanup EXIT

echo "Updating rootfs with production init system..."

# Copy agent binary
echo "Copying agent binary..."
cp "$AGENT_BINARY" "$MOUNT_DIR/usr/local/bin/agent"
chmod 755 "$MOUNT_DIR/usr/local/bin/agent"

# Remove existing init if it's a symlink
if [ -L "$MOUNT_DIR/sbin/init" ]; then
    rm -f "$MOUNT_DIR/sbin/init"
fi

# Create init script that properly starts the agent
cat > "$MOUNT_DIR/sbin/init" <<'EOF'
#!/bin/sh
# Production init script for Firecracker VM

# Mount essential filesystems
mount -t proc proc /proc
mount -t sysfs sysfs /sys
mount -t devtmpfs devtmpfs /dev
mount -t tmpfs tmpfs /run
mount -t tmpfs tmpfs /tmp

# Create essential device nodes
mknod -m 666 /dev/null c 1 3 2>/dev/null || true
mknod -m 666 /dev/zero c 1 5 2>/dev/null || true
mknod -m 666 /dev/random c 1 8 2>/dev/null || true
mknod -m 666 /dev/urandom c 1 9 2>/dev/null || true
mknod -m 666 /dev/tty c 5 0 2>/dev/null || true
mknod -m 666 /dev/console c 5 1 2>/dev/null || true
mknod -m 666 /dev/ptmx c 5 2 2>/dev/null || true

# Setup networking
ip link set lo up
ip addr add 127.0.0.1/8 dev lo

# Wait for eth0
for i in $(seq 1 10); do
    if ip link show eth0 >/dev/null 2>&1; then
        break
    fi
    sleep 0.1
done

# Get IP from kernel command line
IP=$(cat /proc/cmdline | grep -o 'ip=[^ ]*' | cut -d= -f2)
if [ -n "$IP" ]; then
    ip addr add ${IP}/24 dev eth0
    ip link set eth0 up
    # Extract gateway (assume .1 of the subnet)
    GW=$(echo $IP | sed 's/\.[0-9]*$/.1/')
    ip route add default via $GW
fi

# Set up DNS
echo "nameserver 8.8.8.8" > /etc/resolv.conf
echo "nameserver 8.8.4.4" >> /etc/resolv.conf

# Set hostname
hostname firecracker-vm

# Create runtime directories
mkdir -p /var/run /var/log /var/tmp
chmod 1777 /tmp /var/tmp

# Set resource limits for the agent
ulimit -n 65536     # file descriptors
ulimit -u 1024      # processes
ulimit -m 262144    # memory (KB)
ulimit -v 262144    # virtual memory (KB)
ulimit -t 3600      # CPU time (seconds)

# Start system logger (minimal)
syslogd -O /var/log/messages

# Export environment for agent
export PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin
export HOME=/root
export USER=root
export AGENT_PORT=8080

# Log startup
echo "[$(date)] Starting Code Sandbox Agent..." > /var/log/agent.log

# Start the agent
exec /usr/local/bin/agent >> /var/log/agent.log 2>&1
EOF

chmod 755 "$MOUNT_DIR/sbin/init"

# Create a simple rc script for additional setup
mkdir -p "$MOUNT_DIR/etc/init.d"
cat > "$MOUNT_DIR/etc/init.d/rcS" <<'EOF'
#!/bin/sh
# Additional startup commands

# Clean up tmp
find /tmp -type f -mtime +1 -delete 2>/dev/null || true

# Set kernel parameters
echo 1 > /proc/sys/net/ipv4/ip_forward
echo 1024 > /proc/sys/net/core/somaxconn

# Create necessary directories for language runtimes
mkdir -p /tmp/python /tmp/typescript /tmp/rust
chmod 1777 /tmp/python /tmp/typescript /tmp/rust
EOF
chmod 755 "$MOUNT_DIR/etc/init.d/rcS"

# Update Deno path in agent if needed
if [ -f "$MOUNT_DIR/root/.deno/bin/deno" ]; then
    mkdir -p "$MOUNT_DIR/usr/local/bin"
    ln -sf /root/.deno/bin/deno "$MOUNT_DIR/usr/local/bin/deno" 2>/dev/null || true
fi

# Ensure Rust is in PATH
if [ -d "$MOUNT_DIR/root/.cargo/bin" ]; then
    for binary in "$MOUNT_DIR/root/.cargo/bin/"*; do
        if [ -f "$binary" ]; then
            binary_name=$(basename "$binary")
            ln -sf "/root/.cargo/bin/$binary_name" "$MOUNT_DIR/usr/local/bin/$binary_name" 2>/dev/null || true
        fi
    done
fi

# Create a health check script
cat > "$MOUNT_DIR/usr/local/bin/healthcheck" <<'EOF'
#!/bin/sh
# Health check for agent
curl -s http://localhost:8080/health || exit 1
EOF
chmod 755 "$MOUNT_DIR/usr/local/bin/healthcheck"

echo "Rootfs updated successfully!"

# Verify the setup
echo ""
echo "Verification:"
echo "  Init script: $(ls -la $MOUNT_DIR/sbin/init)"
echo "  Agent binary: $(ls -la $MOUNT_DIR/usr/local/bin/agent)"
echo "  Deno: $(ls -la $MOUNT_DIR/usr/local/bin/deno 2>/dev/null || echo 'Not found')"
echo "  Rust: $(ls -la $MOUNT_DIR/usr/local/bin/rustc 2>/dev/null || echo 'Not found')"