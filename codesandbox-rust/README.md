# CodeSandbox Rust

A Rust implementation of the codesandbox system that provides secure, isolated code execution using Firecracker microVMs.

## Features

- **Secure Code Execution**: Uses Firecracker microVMs for complete isolation
- **Multiple Languages**: Supports Python, TypeScript, and Rust
- **HTTP API**: RESTful API for code execution requests
- **VM Pool Management**: Efficient VM pooling for better performance
- **Resource Limits**: Built-in timeout, memory, and process limits
- **Network Isolation**: TAP-based networking with bridge configuration

## Architecture

The system consists of two main components:

1. **API Server** (`api`): HTTP server that manages VM pool and delegates execution
2. **Agent** (`agent`): Runs inside VMs to execute code securely

## Prerequisites

- Rust 1.70+ with Cargo
- Firecracker binary
- Linux kernel with KVM support
- Root/sudo access for VM and network management
- Bridge networking setup

## Quick Start

### Option 1: Automatic Setup (Recommended)
```bash
# Complete setup from scratch
make quickstart

# Start the server
./start.sh
```

### Option 2: Manual Setup
```bash
# 1. Check system status
make status

# 2. Install dependencies
make install-firecracker
make setup-env         # Downloads kernel and builds rootfs
make setup-network     # Configures bridge networking

# 3. Build and run
make build
make run
```

### Option 3: Development Setup
```bash
# Quick development cycle
make dev               # Clean, build, and test

# Run in development mode
make run-dev
```

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
curl -X POST http://localhost:8000/execute \
  -H "Content-Type: application/json" \
  -d '{
    "language": "python",
    "code": "print(\"Hello from Rust codesandbox!\")",
    "timeout": 30
  }'
```

## Configuration

Environment variables:

- `API_PORT`: API server port (default: 8000)
- `AGENT_PORT`: Agent server port (default: 8080)
- `ROOTFS_PATH`: Path to rootfs image (default: ./rootfs/rootfs.ext4)
- `KERNEL_PATH`: Path to kernel image (default: ./kernel/vmlinux)
- `RUST_LOG`: Log level (debug, info, warn, error)

## Development

### Running in Development Mode

```bash
# API server with debug logging
make run-dev

# Agent standalone (for testing)
make run-agent

# Full development cycle
make dev
```

### Build Commands

```bash
# Install Rust dependencies
make deps

# Build everything (API + Agent)
make build

# Build individual components
make build-api
make build-agent
```

### Setup Commands

```bash
# Complete setup from scratch
make quickstart

# Individual setup steps
make install-firecracker    # Install Firecracker binary
make download-kernel        # Download and setup kernel
make build-rootfs          # Build rootfs with runtimes
make setup-network         # Configure bridge networking
```

### Code Quality

```bash
# Format code
make fmt

# Run linter
make clippy

# Run Rust tests
make test

# Test HTTP API endpoints
make test-api
```

### Maintenance

```bash
# Check system status
make status

# Clean build artifacts
make clean

# Install as systemd service
make install-service

# Build Docker image
make docker-build
```

### Quick Reference

```bash
# Get help with all commands
make help

# Common workflows:
make quickstart && make run    # Complete setup and run
make dev                       # Development cycle
make status                    # Check what's missing
```

## Language Support

### Python
- Runtime: Python 3.x
- Features: Full standard library access
- File extension: `.py`

### TypeScript
- Runtime: Deno
- Features: Modern TypeScript, Web APIs
- File extension: `.ts`

### Rust
- Compiler: rustc
- Features: Standard library, compilation + execution
- File extension: `.rs`

## Security Features

- **VM Isolation**: Each execution runs in a separate Firecracker microVM
- **Resource Limits**: CPU time, memory, file size, and process count limits
- **Network Isolation**: VMs have isolated network access
- **Temporary Files**: Automatic cleanup of execution artifacts
- **Timeout Protection**: Configurable execution timeouts

## Performance

- **VM Pool**: Pre-warmed VM pool for fast execution
- **Concurrent Execution**: Multiple requests handled simultaneously
- **Resource Efficiency**: Lightweight Firecracker VMs (2GB RAM, 1 vCPU)
- **Fast Startup**: Sub-second VM startup times

## Differences from Go Version

While functionally identical, this Rust implementation has:

- **Memory Safety**: Rust's ownership system prevents many classes of bugs
- **Performance**: Potentially faster due to zero-cost abstractions
- **Async I/O**: Tokio-based async runtime for better concurrency
- **Type Safety**: Stronger compile-time guarantees
- **Error Handling**: Explicit error handling with Result types

## System Service

Install as a systemd service:

```bash
make install-service
sudo systemctl status codesandbox-rust
```

## Troubleshooting

### Common Issues

1. **VM Creation Fails**: Check that Firecracker binary is installed and accessible
2. **Network Issues**: Ensure bridge networking is set up correctly
3. **Permission Denied**: API server needs root/sudo for VM and network operations
4. **Timeout Errors**: Increase timeout values for complex code execution

### Logs

```bash
# View API server logs
journalctl -u codesandbox-rust -f

# Debug mode
RUST_LOG=debug ./target/release/api
```

## Testing

Test the implementation:

```bash
# Basic functionality test
curl -X POST http://localhost:8000/execute \
  -H "Content-Type: application/json" \
  -d '{"language": "python", "code": "print(2 + 2)"}'

# TypeScript test
curl -X POST http://localhost:8000/execute \
  -H "Content-Type: application/json" \
  -d '{"language": "typescript", "code": "console.log(\"Hello TypeScript!\")"}'

# Rust test
curl -X POST http://localhost:8000/execute \
  -H "Content-Type: application/json" \
  -d '{"language": "rust", "code": "fn main() { println!(\"Hello Rust!\"); }"}'
```

## License

Same as the original Go implementation.