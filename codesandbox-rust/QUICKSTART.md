# Codesandbox Rust - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Linux system with KVM support
- Rust 1.70+ installed
- Root/sudo access
- At least 4GB free disk space

### 1-Minute Setup

```bash
# Clone or navigate to the codesandbox-rust directory
cd codesandbox-rust

# Complete automated setup
make quickstart

# Start the server
./start.sh
```

That's it! The API will be available at `http://localhost:8000`.

## 🧪 Testing

Once the server is running, test it:

```bash
# Health check
curl http://localhost:8000/health

# Execute Python code
curl -X POST http://localhost:8000/execute \
  -H "Content-Type: application/json" \
  -d '{"language": "python", "code": "print(\"Hello from Rust codesandbox!\")"}'

# Run comprehensive tests
./test-api.sh
```

## 📋 Manual Setup (if needed)

If the quickstart fails, run setup steps individually:

```bash
# Check what's missing
make status

# Install missing components
make install-firecracker  # If Firecracker is missing
make setup-env            # If kernel/rootfs are missing
make setup-network        # If bridge network is missing

# Build the binaries
make build

# Run the server
make run
```

## 🔧 Development Workflow

```bash
# Development cycle
make dev                 # Clean, build, test

# Run in development mode
make run-dev            # Debug logging enabled

# Code quality checks
make fmt clippy test    # Format, lint, test
```

## 🐛 Troubleshooting

### Common Issues

1. **Permission denied**: Make sure to run with sudo privileges
2. **KVM not available**: Enable virtualization in BIOS
3. **Port 8000 in use**: Run `./kill-port-8000.sh` first
4. **Network issues**: Check bridge with `ip link show fcbridge`

### Debugging Commands

```bash
# Check system status
make status

# View detailed logs
RUST_LOG=debug make run-dev

# Clean and rebuild
make clean build

# Test individual components
make run-agent          # Test agent standalone
./test-api.sh          # Test API endpoints
```

## 📖 Documentation

- `README.md` - Complete documentation
- `make help` - All available commands
- `make status` - System component status

## 🆚 Comparison with Go Version

| Feature | Go Version | Rust Version |
|---------|------------|--------------|
| Language | Go | Rust |
| Performance | Fast | Faster |
| Memory Safety | Runtime checks | Compile-time guarantees |
| Concurrency | Goroutines | Async/await (Tokio) |
| Build Time | Fast | Slower (first build) |
| Binary Size | Small | Small |
| API Compatibility | ✅ | ✅ (100% identical) |

## 🎯 Next Steps

- Set up as systemd service: `make install-service`
- Deploy with Docker: `make docker-build`
- Integrate with your application using the same API as the Go version
- Scale horizontally by running multiple instances

The Rust implementation provides identical functionality to the Go version while offering additional memory safety and performance benefits.