#!/bin/bash
set -e

# Install systemd service for Code Sandbox API

if [ "$EUID" -ne 0 ]; then 
    echo "Error: This script must be run as root"
    exit 1
fi

INSTALL_DIR="/opt/codesandbox"
SERVICE_USER="codesandbox"

echo "Installing Code Sandbox service..."

# Create service user
if ! id -u $SERVICE_USER &>/dev/null; then
    echo "Creating service user..."
    useradd -r -s /bin/false -d /var/lib/codesandbox $SERVICE_USER
    usermod -a -G kvm $SERVICE_USER
fi

# Create directories
echo "Creating directories..."
mkdir -p $INSTALL_DIR/{bin,etc,rootfs,kernel,logs}
mkdir -p /var/lib/codesandbox
mkdir -p /var/log/codesandbox

# Copy files
echo "Copying files..."
cp cmd/api/api $INSTALL_DIR/bin/
cp cmd/agent/agent $INSTALL_DIR/bin/
cp -r rootfs/rootfs.ext4 $INSTALL_DIR/rootfs/
cp kernel/vmlinux $INSTALL_DIR/kernel/

# Set permissions
chown -R root:root $INSTALL_DIR
chmod 755 $INSTALL_DIR/bin/*
chown $SERVICE_USER:$SERVICE_USER /var/lib/codesandbox
chown $SERVICE_USER:$SERVICE_USER /var/log/codesandbox

# Create configuration file
cat > $INSTALL_DIR/etc/config.env <<EOF
# Code Sandbox Configuration
ROOTFS_PATH=$INSTALL_DIR/rootfs/rootfs.ext4
KERNEL_PATH=$INSTALL_DIR/kernel/vmlinux
API_PORT=8000
LOG_LEVEL=info
VM_POOL_SIZE=10
VM_MEMORY_MB=256
VM_CPU_COUNT=1
NETWORK_PREFIX=172.16.0
EOF

# Create systemd service
cat > /etc/systemd/system/codesandbox.service <<EOF
[Unit]
Description=Code Sandbox API Service
Documentation=https://github.com/agentic-design/codesandbox
After=network.target firecracker-network.service
Requires=firecracker-network.service

[Service]
Type=simple
User=root
Group=root
WorkingDirectory=$INSTALL_DIR
EnvironmentFile=$INSTALL_DIR/etc/config.env
ExecStartPre=/bin/bash -c 'modprobe kvm_intel || modprobe kvm_amd'
ExecStartPre=/bin/bash -c 'ip link set fcbridge up || true'
ExecStart=$INSTALL_DIR/bin/api
Restart=always
RestartSec=10
StandardOutput=append:/var/log/codesandbox/api.log
StandardError=append:/var/log/codesandbox/api-error.log

# Security
NoNewPrivileges=false
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/tmp /var/run /var/lib/codesandbox /var/log/codesandbox $INSTALL_DIR/rootfs
ProtectKernelTunables=false
ProtectKernelModules=false
ProtectControlGroups=false
AmbientCapabilities=CAP_NET_ADMIN CAP_SYS_ADMIN CAP_DAC_OVERRIDE

# Resource limits
LimitNOFILE=1000000
LimitNPROC=65536
TasksMax=infinity

[Install]
WantedBy=multi-user.target
EOF

# Create log rotation
cat > /etc/logrotate.d/codesandbox <<EOF
/var/log/codesandbox/*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 0644 $SERVICE_USER $SERVICE_USER
    sharedscripts
    postrotate
        systemctl reload codesandbox >/dev/null 2>&1 || true
    endscript
}
EOF

# Reload systemd
systemctl daemon-reload

echo ""
echo "✅ Service installation completed!"
echo ""
echo "Installation directory: $INSTALL_DIR"
echo "Service user: $SERVICE_USER"
echo "Configuration: $INSTALL_DIR/etc/config.env"
echo "Logs: /var/log/codesandbox/"
echo ""
echo "To start the service:"
echo "  systemctl start codesandbox"
echo ""
echo "To enable auto-start on boot:"
echo "  systemctl enable codesandbox"
echo ""
echo "To check status:"
echo "  systemctl status codesandbox"
echo ""
echo "To view logs:"
echo "  journalctl -u codesandbox -f"