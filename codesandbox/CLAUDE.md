# Codesandbox Architecture for Claude Code

This document explains the architecture, communication patterns, and implementation details of the secure code execution system using Firecracker microVMs.

## High-Level Architecture

The system implements a secure, isolated code execution environment with the following components:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Client/User   │───▶│   API Server     │───▶│   VM Manager    │
│                 │    │  (cmd/api)       │    │ (pkg/firecracker│
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │                          │
                              ▼                          ▼
                    ┌──────────────────┐    ┌─────────────────┐
                    │   HTTP Client    │───▶│  Firecracker VM │
                    │                  │    │  + Guest Agent  │
                    └──────────────────┘    └─────────────────┘
```

## Core Components

### 1. API Server (`cmd/api/main.go`)

The main entry point that handles HTTP requests for code execution.

**Key Features:**
- RESTful API with endpoints: `/execute`, `/health`, `/languages`
- Request validation and language support verification
- VM pool management for efficient resource utilization
- Timeout handling and error management
- CORS support for web applications

**Configuration:**
- Port: `API_PORT` (default: 8000)
- VM Pool Size: 3 VMs
- Memory: 2048 MiB per VM
- CPU: 1 vCPU per VM
- Network: `172.16.0.x` subnet

### 2. VM Manager (`pkg/firecracker/vm.go`)

Manages the lifecycle of Firecracker microVMs.

**VM Pool Management:**
- Pre-warmed VM pool for fast execution (default: 3 VMs)
- Copy-on-write rootfs for each VM instance
- Automatic VM reset after each execution
- VM replacement on failure

**Network Configuration:**
- TAP devices: `fc-tap-0`, `fc-tap-1`, `fc-tap-2`
- IP addresses: `172.16.0.100`, `172.16.0.101`, `172.16.0.102`
- Bridge network for VM communication
- Isolated network namespaces

### 3. Guest Agent (`cmd/agent/main.go`)

Lightweight HTTP server running inside each Firecracker VM.

**Responsibilities:**
- Receives code execution requests from API server
- Manages temporary files for code execution
- Applies security limits and sandboxing
- Returns execution results

**Language Support:**
- **Python**: Direct execution with `python3`
- **TypeScript**: Execution via Deno runtime
- **Rust**: Compile with `rustc` then execute

### 4. Security Model

Security is implemented through multiple layers rather than a dedicated security module:

**VM-Level Security:**
- Firecracker hypervisor isolation
- Resource limits enforced by VM configuration
- Isolated network namespace
- Minimal Linux environment

**Process-Level Security:**
- Restricted environment variables in guest agent
- Limited filesystem access within VM
- Timeout-based execution limits

### 5. Network Management (`pkg/firecracker/network.go`)

Handles VM networking setup and teardown.

**Components:**
- Bridge interface creation (`fc-bridge`)
- TAP device management
- IP routing configuration
- Network cleanup on shutdown

## Communication Flow

### 1. Code Execution Request

```
1. Client → API Server: POST /execute
   {
     "language": "python",
     "code": "print('Hello World')",
     "timeout": 30
   }

2. API Server → VM Manager: GetVM()
   - Retrieves available VM from pool
   - VM has pre-configured network and rootfs

3. API Server → Guest Agent: HTTP POST
   - Sends execution request to VM's guest agent
   - Agent runs at http://172.16.0.100:8080/execute

4. Guest Agent → Language Runtime:
   - Creates temporary file with user code
   - Executes with appropriate runtime/compiler
   - Captures stdout/stderr with timeout

5. Guest Agent → API Server: HTTP Response
   {
     "success": true,
     "output": "Hello World\n",
     "execution_time": 0.123
   }

6. VM Manager: ReturnVM()
   - Resets VM to clean state
   - Returns VM to available pool

7. API Server → Client: HTTP Response
   - Forwards execution result with metadata
```

### 2. VM Lifecycle Management

**VM Creation:**
1. Copy base rootfs to VM-specific file (`/tmp/rootfs-{uuid}.ext4`)
2. Create TAP device and configure networking
3. Start Firecracker VM with kernel and rootfs
4. Wait for guest agent to become ready (TCP health check)
5. Add VM to available pool

**VM Reset:**
1. Verify guest agent is responsive
2. Clean temporary files (handled by VM filesystem)
3. VM remains running for next execution

**VM Replacement:**
1. On VM failure, create new VM instance
2. Clean up failed VM resources
3. Maintain pool size consistency

## File Structure

```
codesandbox/
├── cmd/
│   ├── api/main.go              # Main API server
│   └── agent/main.go            # VM guest agent
├── pkg/
│   ├── firecracker/
│   │   ├── vm.go               # VM lifecycle management
│   │   ├── network.go          # Network configuration
│   │   └── direct_vm.go        # Direct VM operations
│   └── executor/
│       └── executor.go         # Alternative executor (not used)
├── scripts/
│   ├── build-rootfs.sh         # Builds VM root filesystem
│   ├── setup-kernel.sh         # Downloads/configures kernel
│   └── install-firecracker.sh  # Installs Firecracker binary
├── rootfs/
│   ├── rootfs.ext4             # Base VM filesystem
│   └── build/                  # Rootfs build artifacts
├── kernel/
│   └── vmlinux                 # VM kernel image
└── Makefile                    # Build automation
```

## Security Model

### VM-Level Isolation
- **Hypervisor**: Firecracker provides hardware-level isolation
- **Network**: VMs run in isolated network namespace
- **Filesystem**: Copy-on-write rootfs, no persistent storage
- **Resources**: CPU and memory limits enforced by VM

### Process-Level Security
- **User context**: Code runs as non-privileged user
- **Resource limits**: CPU time, memory, file size constraints
- **Environment**: Restricted PATH and environment variables
- **System calls**: Limited by VM's minimal Linux environment

### Network Security
- **No outbound access**: VMs cannot access external network
- **Host isolation**: VMs communicate only with API server
- **Internal routing**: Managed bridge network for VM communication

## Supported Languages

### Python
- **Runtime**: Python 3.x
- **Execution**: Direct interpretation
- **Libraries**: Standard library only
- **File extension**: `.py`

### TypeScript  
- **Runtime**: Deno
- **Execution**: Transpile and execute
- **Permissions**: `--allow-all` for sandbox compatibility
- **File extension**: `.ts`

### Rust
- **Compiler**: rustc
- **Process**: Compile to binary, then execute
- **Target**: x86_64 Linux
- **File extension**: `.rs`

## Performance Characteristics

### VM Pool Benefits
- **Cold start**: ~2-3 seconds for fresh VM
- **Warm start**: ~100-200ms from pool
- **Concurrent capacity**: 3 simultaneous executions
- **Memory efficiency**: Copy-on-write rootfs sharing

### Resource Usage
- **Memory per VM**: 2 GB allocated, ~256 MB typical usage
- **Disk space**: ~500 MB per VM rootfs copy
- **CPU overhead**: Minimal, hypervisor-managed
- **Network latency**: <1ms VM-to-host communication

## Error Handling

### VM Failures
- Automatic VM replacement on failure
- Graceful degradation with reduced pool size
- Detailed logging for troubleshooting

### Execution Failures
- Timeout protection (default 30s + 5s buffer)
- Compilation error capture and reporting
- Runtime error isolation

### Network Issues
- TAP device cleanup on VM shutdown
- Bridge network recovery procedures
- Connection timeout handling

## Monitoring and Observability

### Logging
- Structured JSON logging with `logrus`
- Request ID tracking for correlation
- Error categorization and metrics

### Health Checks
- VM agent health monitoring
- Pool availability tracking
- Network connectivity verification

## Development and Deployment

### Build Process
1. **Dependencies**: Go modules and system packages
2. **Kernel**: Download and configure Linux kernel
3. **Rootfs**: Build minimal Alpine Linux filesystem
4. **Binaries**: Compile API server and guest agent

### Runtime Requirements
- Linux with KVM support
- Root privileges (for Firecracker and networking)
- Network configuration tools (`iptables`, `ip`)
- Firecracker binary in PATH

### Configuration Options
- `API_PORT`: API server port (default: 8000)
- `ROOTFS_PATH`: Path to VM rootfs image
- `KERNEL_PATH`: Path to VM kernel image
- Pool size and resource limits (compile-time)

This architecture provides a secure, scalable foundation for untrusted code execution while maintaining high performance through VM pooling and efficient resource management.


For sudo, use askpass.sh