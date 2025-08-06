# Code Sandbox - Untrusted Code Execution API

A secure code execution service using Firecracker microVMs to run untrusted code in isolated environments. Supports Python, TypeScript (via Deno), and Rust.

## Architecture

- **Firecracker MicroVMs**: Each code execution runs in an isolated VM
- **VM Pool**: Pre-warmed VMs for fast execution
- **Guest Agent**: Lightweight agent inside each VM to handle code execution
- **API Server**: RESTful API to accept code execution requests
- **Language Support**: Python 3, TypeScript (Deno), Rust
- Linux with KVM support (check with `ls /dev/kvm`)

## Prerequisites

- Linux with KVM support
- Go 1.21+
- Firecracker binary
- Root/sudo access (required for Firecracker)
- `iptables` for network configuration

## Installation

1. **Install Firecracker**:
```bash
# Download Firecracker
wget https://github.com/firecracker-microvm/firecracker/releases/download/v1.4.0/firecracker-v1.4.0-x86_64.tar.gz
tar -xzf firecracker-v1.4.0-x86_64.tar.gz
sudo mv release-v1.4.0-x86_64/firecracker-v1.4.0-x86_64 /usr/local/bin/firecracker
sudo chmod +x /usr/local/bin/firecracker
```

2. **Build the project**:
```bash
cd /data/code/agentic-design/codesandbox
make deps      # Install Go dependencies
make all       # Download kernel, build rootfs, and compile binaries
```

## Configuration

Environment variables:
- `API_PORT`: API server port (default: 8000)
- `ROOTFS_PATH`: Path to rootfs image (default: ./rootfs/rootfs.ext4)
- `KERNEL_PATH`: Path to kernel image (default: ./kernel/vmlinux)

## Running

Start the API server:
```bash
sudo make run
```

Or run in development mode:
```bash
sudo make run-dev
```

## API Usage

### Execute Code

**Endpoint**: `POST /execute`

**Request**:
```json
{
  "language": "python",
  "code": "print('Hello, World!')",
  "timeout": 30
}
```

**Response**:
```json
{
  "request_id": "uuid",
  "success": true,
  "output": "Hello, World!\n",
  "execution_time": 0.123
}
```

### Supported Languages

**Endpoint**: `GET /languages`

**Response**:
```json
{
  "languages": ["python", "typescript", "rust"]
}
```

### Health Check

**Endpoint**: `GET /health`

## Example Usage

### Python
```bash
curl -X POST http://localhost:8000/execute \
  -H "Content-Type: application/json" \
  -d '{
    "language": "python",
    "code": "import math\nprint(f\"Pi is approximately {math.pi:.4f}\")"
  }'
```

### TypeScript
```bash
curl -X POST http://localhost:8000/execute \
  -H "Content-Type: application/json" \
  -d '{
    "language": "typescript",
    "code": "const greeting: string = \"Hello from TypeScript!\";\nconsole.log(greeting);"
  }'
```

### Rust
```bash
curl -X POST http://localhost:8000/execute \
  -H "Content-Type: application/json" \
  -d '{
    "language": "rust",
    "code": "fn main() {\n    println!(\"Hello from Rust!\");\n}"
  }'
```

## Security Features

- **VM Isolation**: Each execution runs in a separate Firecracker microVM
- **Resource Limits**: CPU, memory, and execution time limits
- **Network Isolation**: VMs run in isolated network namespaces
- **No Persistent Storage**: VMs are reset after each execution
- **Limited System Access**: Restricted filesystem and system call access

## Development

### Project Structure
```
codesandbox/
├── cmd/
│   ├── api/          # Main API server
│   └── agent/        # Guest agent for VMs
├── pkg/
│   ├── firecracker/  # VM management
│   └── executor/     # Code execution logic
├── scripts/          # Build and setup scripts
├── rootfs/           # VM root filesystem
└── kernel/           # VM kernel
```

### Building Components

Build only the agent:
```bash
make build-agent
```

Build only the API:
```bash
make build-api
```

### Testing

Run tests:
```bash
make test
```

## Troubleshooting

1. **Permission Denied**: Make sure to run with `sudo` as Firecracker requires root access
2. **KVM Not Available**: Ensure KVM is enabled in your system
3. **Network Issues**: Check that the bridge network is properly configured
4. **VM Startup Failures**: Check Firecracker logs and ensure kernel/rootfs paths are correct

## License

This is a demonstration project based on the architecture described in the Firecracker blog post.



Create systemd 
Can we dockerize ? does it impact perf ? 

Better to use cni see blogpost

https://stanislas.blog/2021/08/firecracker/



## Typescript
curl -X POST http://0.0.0.0:8000/execute -H "Content-Type: application/json" -d '{"code": "console.log(\"Hello TypeScript\")", "language": "typescript", "timeout": 10}'

## Python
curl -X POST http://0.0.0.0:8000/execute -H "Content-Type: application/json" -d '{"code": "print(\"Hello TypeScript\")", "language": "python", "timeout": 10}' 

## Rust
curl -X POST http://0.0.0.0:8000/execute -H "Content-Type: application/json" -d '{"code": " println!(\"Hello, world\");", "language": "rust", "timeout": 10}'



curl -X POST http://0.0.0.0:8000/execute \
  -H "Content-Type: application/json" \
  -d '{"code":"fn main(){ println!(\"Hello from Rust!\"); }","language":"rust","timeout":10}'


  Le faire en rust, redis and rabbitmq

  shoild network be allowed ? or allow specific ip / url 

  can we remove the sudo

  curl -X POST http://0.0.0.0:8000/execute -H "Content-Type: application/json" -d '{"code": "console.log(\"Hello TypeScript\")", "language": "typescript", "timeout": 10}'


  remove direct vm

  sudo ./scripts/setup-host-network.sh bridge-setup fcbridge


  See e2b

  save snapshot states


  run browser inside with interface feedback on a port