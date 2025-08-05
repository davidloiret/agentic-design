# Production Deployment Guide

## Overview

This guide covers the production deployment of the Code Sandbox untrusted code execution API using Firecracker microVMs.

## Prerequisites

- Linux server with KVM support (Intel VT-x or AMD-V)
- Root access
- 8GB+ RAM recommended
- 20GB+ free disk space
- Ubuntu 20.04/22.04 or RHEL 8/9

## Installation Steps

### 1. System Preparation

```bash
# Check KVM support
egrep -c '(vmx|svm)' /proc/cpuinfo  # Should be > 0
ls -la /dev/kvm  # Should exist

# Install dependencies
apt-get update
apt-get install -y \
    build-essential \
    git \
    curl \
    wget \
    iptables \
    iproute2 \
    dnsmasq \
    bridge-utils \
    jq \
    bc

# Install Go (if not present)
wget https://go.dev/dl/go1.19.8.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.19.8.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/bin/go
```

### 2. Build and Setup

```bash
cd /data/code/agentic-design/codesandbox

# Install dependencies
make deps

# Build everything (kernel, rootfs, binaries)
sudo make all

# Install Firecracker
sudo ./scripts/install-firecracker.sh

# Setup network infrastructure
sudo ./scripts/setup-host-network.sh

# Update rootfs with production init
sudo ./scripts/update-rootfs-init.sh
```

### 3. Service Installation

```bash
# Install as systemd service
sudo ./scripts/install-service.sh

# Start the service
sudo systemctl start codesandbox

# Enable auto-start on boot
sudo systemctl enable codesandbox

# Check status
sudo systemctl status codesandbox
```

## Configuration

Edit `/opt/codesandbox/etc/config.env`:

```bash
# API Configuration
API_PORT=8000                # API listen port
LOG_LEVEL=info              # Log level: debug, info, warn, error

# VM Configuration  
VM_POOL_SIZE=10             # Number of pre-warmed VMs
VM_MEMORY_MB=256            # Memory per VM in MB
VM_CPU_COUNT=1              # vCPUs per VM

# Network Configuration
NETWORK_PREFIX=172.16.0     # VM network subnet

# Paths
ROOTFS_PATH=/opt/codesandbox/rootfs/rootfs.ext4
KERNEL_PATH=/opt/codesandbox/kernel/vmlinux
```

## Security Considerations

### 1. Firewall Rules

```bash
# Allow API access (adjust source IPs as needed)
iptables -A INPUT -p tcp --dport 8000 -s 10.0.0.0/8 -j ACCEPT

# Block VM network from accessing host services
iptables -A INPUT -s 172.16.0.0/24 -d 127.0.0.1 -j DROP
iptables -A INPUT -s 172.16.0.0/24 -d 10.0.0.0/8 -j DROP
```

### 2. Resource Limits

The system enforces:
- CPU time limit: 30 seconds per execution
- Memory limit: 256MB per VM
- File size limit: 10MB
- Network isolation via bridge/NAT

### 3. API Authentication

For production, implement authentication:

```go
// Add to API server
middleware.RequireAPIKey()
middleware.RateLimit(100) // 100 requests per minute
```

### 4. TLS/HTTPS

Use a reverse proxy (nginx/haproxy) for TLS:

```nginx
server {
    listen 443 ssl;
    server_name api.example.com;
    
    ssl_certificate /etc/ssl/certs/api.crt;
    ssl_certificate_key /etc/ssl/private/api.key;
    
    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Monitoring

### 1. Health Checks

```bash
# API health
curl http://localhost:8000/health

# Monitoring script
./scripts/monitor.sh

# Continuous monitoring
./scripts/monitor.sh --watch
```

### 2. Logging

Logs are stored in:
- API logs: `/var/log/codesandbox/api.log`
- Error logs: `/var/log/codesandbox/api-error.log`
- VM agent logs: Inside each VM at `/var/log/agent.log`

### 3. Metrics

Monitor key metrics:
- VM pool utilization
- Request latency (p50, p95, p99)
- Error rates
- Resource usage (CPU, memory, disk)

### 4. Alerts

Set up alerts for:
- Service down
- High error rate (>5%)
- VM pool exhaustion
- High latency (>5s)

## Performance Tuning

### 1. VM Pool Size

Adjust based on load:
```bash
# Light load: 5-10 VMs
# Medium load: 20-50 VMs  
# Heavy load: 100+ VMs
VM_POOL_SIZE=20
```

### 2. Kernel Parameters

Already configured by setup script in `/etc/sysctl.d/60-firecracker.conf`

### 3. Scaling

For high load:
- Run multiple API instances behind load balancer
- Use shared storage for rootfs/kernel
- Consider container orchestration (Kubernetes)

## Maintenance

### 1. Updates

```bash
# Update agent
go build -o cmd/agent/agent ./cmd/agent
sudo ./scripts/update-rootfs-init.sh
sudo systemctl restart codesandbox

# Update API
go build -o cmd/api/api ./cmd/api
sudo cp cmd/api/api /opt/codesandbox/bin/
sudo systemctl restart codesandbox
```

### 2. Backup

Important files to backup:
- `/opt/codesandbox/etc/config.env`
- `/opt/codesandbox/rootfs/rootfs.ext4`
- API logs for audit trail

### 3. Log Rotation

Configured automatically in `/etc/logrotate.d/codesandbox`

## Troubleshooting

### Service Won't Start

```bash
# Check logs
journalctl -u codesandbox -n 100

# Verify KVM access
ls -la /dev/kvm

# Check network bridge
ip link show fcbridge
```

### VMs Not Starting

```bash
# Check Firecracker logs
journalctl -u codesandbox | grep firecracker

# Verify rootfs/kernel
file /opt/codesandbox/rootfs/rootfs.ext4
file /opt/codesandbox/kernel/vmlinux
```

### Network Issues

```bash
# Check bridge
brctl show fcbridge

# Check iptables NAT
iptables -t nat -L POSTROUTING -n -v

# Test TAP creation
sudo /etc/firecracker/create-tap.sh test-tap
sudo /etc/firecracker/delete-tap.sh test-tap
```

## Testing

Run the production test suite:

```bash
./test-production.sh
```

## Support

For issues:
1. Check logs: `journalctl -u codesandbox -f`
2. Run diagnostics: `./scripts/monitor.sh --test`
3. Review this guide and README.md

## License

This is a demonstration project. Ensure you comply with Firecracker's license and your organization's security policies.