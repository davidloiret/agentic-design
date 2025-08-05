# Codesandbox Quick Start Guide

## Prerequisites

- Linux with KVM support (check with `ls /dev/kvm`)
- Go 1.19+ installed
- Root/sudo access
- Docker and Docker Compose (optional, for containerized deployment)

## Option 1: Direct Installation

### 1. Setup and Build

```bash
# Clone and enter directory
cd /data/code/agentic-design/codesandbox

# Install Go dependencies
go mod download
go mod tidy

# Build everything (requires sudo for rootfs)
sudo make all
```

### 2. Run the API Server

```bash
# Run with automatic setup
sudo ./run.sh

# Or run manually
sudo make run
```

### 3. Test the API

```bash
# Run test suite
./test-api.sh

# Or test manually
curl -X POST http://localhost:8000/execute \
  -H "Content-Type: application/json" \
  -d '{"language": "python", "code": "print(\"Hello, World!\")"}'
```

## Option 2: Docker Deployment

### 1. Build and Run with Docker Compose

```bash
# Build and start
docker-compose up --build

# Run in background
docker-compose up -d
```

### 2. Test the API

Same as above - the API will be available at `http://localhost:8000`

## API Endpoints

### Health Check
```bash
curl http://localhost:8000/health
```

### Get Supported Languages
```bash
curl http://localhost:8000/languages
```

### Execute Code
```bash
# Python example
curl -X POST http://localhost:8000/execute \
  -H "Content-Type: application/json" \
  -d '{
    "language": "python",
    "code": "import math\nprint(f\"Pi = {math.pi:.4f}\")",
    "timeout": 30
  }'

# TypeScript example
curl -X POST http://localhost:8000/execute \
  -H "Content-Type: application/json" \
  -d '{
    "language": "typescript",
    "code": "const greeting: string = \"Hello TypeScript\";\nconsole.log(greeting);",
    "timeout": 30
  }'

# Rust example
curl -X POST http://localhost:8000/execute \
  -H "Content-Type: application/json" \
  -d '{
    "language": "rust",
    "code": "fn main() {\n    println!(\"Hello Rust!\");\n}",
    "timeout": 30
  }'
```

## Troubleshooting

### KVM Not Available
```bash
# Check KVM support
ls /dev/kvm
lsmod | grep kvm

# Enable KVM (Intel)
sudo modprobe kvm_intel

# Enable KVM (AMD)
sudo modprobe kvm_amd
```

### Permission Issues
- Always run with `sudo` as Firecracker requires root access
- Check file permissions on scripts: `chmod +x scripts/*.sh`

### Network Issues
```bash
# Verify bridge is created
ip link show fcbridge

# Check iptables rules
sudo iptables -t nat -L POSTROUTING -n -v

# Restart network setup
sudo ./scripts/setup-host-network.sh
```

### Build Issues
```bash
# Clean and rebuild
make clean
sudo make all

# Check logs
sudo journalctl -f
```

## Architecture Overview

```
┌─────────────────┐
│   API Server    │
│  (Port 8000)    │
└────────┬────────┘
         │
    ┌────▼────┐
    │   VM    │
    │  Pool   │
    └────┬────┘
         │
┌────────▼────────┐
│  Firecracker    │
│    MicroVMs     │
│                 │
│  ┌──────────┐   │
│  │ Python   │   │
│  │ TypeScript│  │
│  │ Rust      │  │
│  └──────────┘   │
└─────────────────┘
```

## Security Features

- **VM Isolation**: Each execution runs in a separate Firecracker microVM
- **Resource Limits**: CPU, memory, and time limits enforced
- **Network Isolation**: VMs run in isolated network namespace
- **No Persistence**: VMs are reset after each execution
- **Restricted Access**: Limited filesystem and system call access

## Performance Tuning

### Increase VM Pool Size
Edit `cmd/api/main.go`:
```go
VMPoolSize: 5, // Increase this value
```

### Adjust VM Resources
```go
MemSizeMib: 512,  // Increase memory
CPUCount:   2,    // Add more CPUs
```

### System Limits
```bash
# Increase file descriptors
ulimit -n 100000

# Check current limits
ulimit -a
```

## Development

### Adding a New Language

1. Update agent (`cmd/agent/main.go`):
```go
languageConfigs["newlang"] = LanguageConfig{
    FileExtension: ".ext",
    RunCommand:    []string{"interpreter", "%s"},
    TempDir:       "/tmp/newlang",
}
```

2. Install runtime in rootfs (`scripts/build-rootfs.sh`)
3. Rebuild: `sudo make all`

### Monitoring

```bash
# Watch VM creation
watch -n 1 'ip link | grep fc-tap'

# Monitor API logs
sudo journalctl -f -u codesandbox

# Check resource usage
htop
```

## Support

For issues, check:
1. API logs: `docker-compose logs` or console output
2. System logs: `sudo journalctl -xe`
3. Firecracker logs: Check `/tmp/firecracker-*.log`
4. Network status: `ip addr show fcbridge`