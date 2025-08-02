# Firecracker API Production Deployment Guide

This guide walks you through setting up the Firecracker-based code execution API in production.

## 🚀 Quick Start

### Option 1: Automated Deployment

```bash
# 1. Setup Firecracker (requires root)
cd api/
sudo ./setup_firecracker_production.sh

# 2. Reboot for KVM permissions
sudo reboot

# 3. Deploy with Firecracker API
cd backend/
DEPLOY_FIRECRACKER=true ./deploy.sh
```

### Option 2: Manual Deployment

```bash
# 1. System setup
cd api/
sudo ./setup_firecracker_production.sh
sudo reboot

# 2. Start Firecracker API service
cd api/
docker-compose -f docker-compose.firecracker-prod.yml up -d

# 3. Deploy main application
cd backend/
./deploy.sh
```

## 📋 Prerequisites

- **Linux host** with KVM support
- **Root access** for initial setup
- **4GB+ RAM** recommended
- **10GB+ free disk space**
- **Modern CPU** with virtualization extensions

## 🔧 Detailed Setup Steps

### 1. System Requirements Check

```bash
# Check KVM support
lscpu | grep Virtualization
ls -la /dev/kvm

# Check available resources
free -h
df -h
```

### 2. Firecracker Setup

The setup script automatically:
- Installs Firecracker binary
- Configures KVM permissions
- Sets up network infrastructure (bridge, TAP interfaces)
- Installs system dependencies
- Builds VM images with guest agent
- Creates systemd services

```bash
cd api/
sudo ./setup_firecracker_production.sh
```

**Important:** Reboot after setup for KVM permissions to take effect.

### 3. Network Configuration

The setup creates:
- **Bridge**: `fcbr0` (169.254.0.1/24)
- **VM IP Range**: 169.254.0.0/24
- **TAP interfaces**: Dynamic creation per VM
- **iptables rules**: NAT and forwarding

### 4. VM Images

Built automatically with:
- **Python 3.11+** runtime
- **Rust 1.70+** with pre-compiled dependencies
- **TypeScript/Node.js 18+** runtime
- **Guest agent** for secure code execution

Images located at:
- `/opt/firecracker/kernels/{language}/vmlinux`
- `/opt/firecracker/rootfs/{language}/rootfs.ext4`

### 5. Service Management

```bash
# Start Firecracker API
start-firecracker-api

# Stop Firecracker API
stop-firecracker-api

# Check status
systemctl status firecracker-api

# View logs
journalctl -u firecracker-api -f
```

### 6. Docker Deployment

```bash
cd api/
docker-compose -f docker-compose.firecracker-prod.yml up -d
```

Services included:
- **firecracker-api**: Main API service (port 8000)
- **nginx**: Reverse proxy with rate limiting
- **prometheus**: Metrics collection (optional)
- **grafana**: Metrics visualization (optional)

## 🔒 Security Features

### VM Isolation
- **Hardware isolation**: True virtualization via Firecracker
- **Memory isolation**: Hardware MMU enforcement
- **Network isolation**: Separate VM network namespace
- **Process isolation**: Complete process table separation

### Code Execution Security
- **Guest agent**: Secure command execution inside VMs
- **Resource limits**: CPU, memory, timeout enforcement
- **Pattern validation**: Dangerous code detection
- **Snapshot restoration**: Clean state between executions

### Network Security
- **Rate limiting**: 10 req/s general, 1 req/s for execution
- **Firewall rules**: Controlled VM network access
- **SSL termination**: HTTPS in production
- **Request timeout**: Prevents resource exhaustion

## 📊 Monitoring

### Health Checks

```bash
# API health
curl http://localhost:8000/health

# Detailed status
curl http://localhost:8000/debug/vm-pools

# Service status
systemctl status firecracker-api
systemctl status firecracker-network
```

### Metrics (Optional)

Enable monitoring profile:
```bash
docker-compose -f docker-compose.firecracker-prod.yml --profile monitoring up -d
```

- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000 (admin/admin123)

### Log Locations

- **Application logs**: `./logs/app.log`
- **Nginx logs**: `./logs/nginx/`
- **System logs**: `journalctl -u firecracker-api`
- **VM logs**: `/tmp/firecracker-*.log`

## 🧪 Testing

### Basic API Test

```bash
curl -X POST http://localhost:8000/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "print(\"Hello, Firecracker!\")",
    "language": "python",
    "timeout": 10
  }'
```

### Load Testing

```bash
cd api/
python3 quick_test.py
```

### Security Testing

```bash
cd api/
./final_security_test.sh
```

## 🚨 Troubleshooting

### Common Issues

#### KVM Access Denied
```bash
# Check KVM permissions
ls -la /dev/kvm
groups $USER

# Fix permissions
sudo usermod -a -G kvm $USER
sudo chmod 666 /dev/kvm
```

#### VM Images Not Found
```bash
# Rebuild images
cd api/
sudo python3 build_vm_images.py

# Check images exist
ls -la /opt/firecracker/*/
```

#### Network Issues
```bash
# Check bridge
ip addr show fcbr0

# Restart network service
sudo systemctl restart firecracker-network

# Check iptables rules
sudo iptables -t nat -L
```

#### API Not Responding
```bash
# Check service status
systemctl status firecracker-api

# Check logs
journalctl -u firecracker-api -f

# Restart service
sudo systemctl restart firecracker-api
```

### Debug Mode

Enable debug logging:
```bash
# Edit service environment
sudo systemctl edit firecracker-api

# Add:
[Service]
Environment=LOG_LEVEL=DEBUG
```

## 🔄 Updates and Maintenance

### Update VM Images
```bash
cd api/
sudo python3 build_vm_images.py
sudo systemctl restart firecracker-api
```

### Update Firecracker Binary
```bash
# Download new version
FIRECRACKER_VERSION="v1.5.0"  # Update version
wget -O /tmp/firecracker.tgz \
  "https://github.com/firecracker-microvm/firecracker/releases/download/${FIRECRACKER_VERSION}/firecracker-${FIRECRACKER_VERSION}-x86_64.tgz"

# Install
tar -xzf /tmp/firecracker.tgz -C /tmp
sudo mv /tmp/release-*/firecracker-* /usr/local/bin/firecracker
sudo chmod +x /usr/local/bin/firecracker

# Restart
sudo systemctl restart firecracker-api
```

### Clean Up Resources
```bash
# Stop all VMs
sudo systemctl stop firecracker-api

# Clean up temporary files
sudo rm -rf /tmp/firecracker-*

# Clean up unused Docker images
docker system prune -f
```

## 📈 Performance Tuning

### VM Pool Sizing
```bash
# Edit service configuration
sudo systemctl edit firecracker-api

# Add environment variable
[Service]
Environment=VM_POOL_SIZE=5  # Increase pool size
```

### Resource Limits
```bash
# Edit docker-compose.firecracker-prod.yml
deploy:
  resources:
    limits:
      cpus: '8.0'      # Increase CPU limit
      memory: 8G       # Increase memory limit
```

### Network Performance
```bash
# Increase network buffer sizes
echo 'net.core.rmem_max = 16777216' >> /etc/sysctl.conf
echo 'net.core.wmem_max = 16777216' >> /etc/sysctl.conf
sysctl -p
```

## 🔧 Production Checklist

- [ ] KVM support verified
- [ ] Firecracker setup completed
- [ ] System rebooted after setup
- [ ] VM images built successfully
- [ ] Network infrastructure configured
- [ ] Services started and healthy
- [ ] Health checks passing
- [ ] Load testing completed
- [ ] Security testing passed
- [ ] Monitoring configured
- [ ] Backup procedures established
- [ ] Log rotation configured
- [ ] SSL certificates installed (if applicable)
- [ ] Firewall rules configured
- [ ] Resource limits tuned

## 📞 Support

For issues and questions:
- Check the troubleshooting section above
- Review service logs: `journalctl -u firecracker-api -f`
- Test individual components: `python3 quick_test.py`
- Check VM pool status: `curl http://localhost:8000/debug/vm-pools`

---

**Built for secure, high-performance code execution environments.** 🔥🔒