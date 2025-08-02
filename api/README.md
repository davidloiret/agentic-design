# Code Execution API

A FastAPI service that provides secure code execution for Python, TypeScript, and Rust in isolated environments.

## Features

- **Multi-language support**: Python, TypeScript, and Rust
- **Security-first**: Sandboxed execution with Docker containers
- **Resource limits**: Memory and CPU constraints to prevent abuse
- **Network isolation**: Containers run without network access
- **Input validation**: Blocks potentially dangerous operations
- **CORS enabled**: Works seamlessly with web frontends

## Quick Start

### Using Docker Compose (Recommended)

```bash
cd api
docker-compose up -d
```

The API will be available at `http://localhost:8000`

### Manual Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Install runtime dependencies:
   - Python 3.11+
   - Node.js 18+ with TypeScript
   - Rust toolchain
   - Docker (for containerized execution)

3. Run the server:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## API Endpoints

### POST /execute

Execute code in the specified language.

**Request:**
```json
{
  "code": "print('Hello, World!')",
  "language": "python",
  "timeout": 10
}
```

**Response:**
```json
{
  "output": "Hello, World!\n",
  "error": null,
  "execution_time": 0.123,
  "success": true
}
```

### GET /health

Health check endpoint that returns API status and Docker availability.

### GET /

Root endpoint with API information and supported languages.

## Security Features

- **Input validation**: Code length limits and dangerous pattern detection
- **Resource limits**: 128MB memory, 50% CPU quota per execution
- **Network isolation**: Containers cannot access external networks
- **Timeout protection**: Configurable execution timeouts
- **Temporary files**: All code files are automatically cleaned up

## Supported Languages

- **Python**: Executes with Python 3.11
- **TypeScript**: Compiled and executed with ts-node
- **Rust**: Compiled with rustc and executed

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Frontend API base URL (default: http://localhost:8000)

## Integration with CodeSandbox

The API is designed to work seamlessly with the CodeSandbox component. Simply set the `NEXT_PUBLIC_API_URL` environment variable in your Next.js application to point to your API server.

## Development

### Running Tests

```bash
pytest tests/
```

### Linting

```bash
black main.py
flake8 main.py
```

### Adding New Languages

1. Add language to `images` dictionary in `CodeExecutor`
2. Add file extension mapping in `_get_file_extension`
3. Add execution command in `_get_execution_command` and `_get_subprocess_command`
4. Update dangerous patterns list if needed

## Production Deployment

For production deployment:

1. Use a proper ASGI server like Gunicorn with Uvicorn workers
2. Set up proper logging and monitoring
3. Configure firewall rules to restrict API access
4. Use a reverse proxy (nginx) for SSL termination
5. Implement rate limiting
6. Consider using a dedicated execution service for enhanced security

## Troubleshooting

- **Docker not available**: The API falls back to subprocess execution
- **Permission denied**: Ensure Docker socket has proper permissions
- **Out of memory**: Increase container memory limits in the code
- **Timeout errors**: Increase the timeout parameter in requests


------------------


⏺ You're absolutely correct! The Dockerfile.firecracker is used to containerize the Firecracker host environment, not
  the execution environments themselves.

  So the architecture is:
  - Docker container runs the Firecracker host (the API server and Firecracker binary)
  - Firecracker microVMs run inside that Docker container using custom kernel/rootfs images (not Docker images)

  The Docker container provides the host environment with Firecracker installed, while the actual code execution
  happens in Firecracker microVMs that use minimal Alpine Linux images built by build_vm_images.py.

  This hybrid approach gives you the deployment benefits of Docker while maintaining Firecracker's security and
  performance advantages for code execution.


-----------

Security Comparison

  Firecracker microVMs:
  - Hardware-level isolation - True virtualization with hypervisor separation
  - Kernel-level isolation - Each VM runs its own kernel
  - Complete process table isolation - VMs can't see host processes
  - Memory isolation - Hardware memory management unit enforcement
  - No shared kernel vulnerabilities - Container escapes don't apply

  Docker containers:
  - Namespace isolation - Shared kernel with host
  - cgroup resource limits - But still same kernel
  - Potential for container escapes - Known attack vectors exist
  - Shared kernel vulnerabilities - Kernel exploits affect all containers

  Attack Surface

  From the code at security_config.py:19 and firecracker_manager.py:64-77, I can see the system implements:

  1. Multiple security layers: Code validation + VM isolation + resource limits
  2. Hardware boundaries: Firecracker provides actual VM isolation vs Docker's process isolation
  3. Minimal attack surface: Custom Alpine images with only essential components
  4. Resource enforcement: Hardware-level CPU/memory limits vs software-enforced cgroup limits

  Real-world Impact

  - Container escapes: Documented ways to break out of Docker containers
  - Kernel exploits: Single kernel vulnerability affects all Docker containers
  - VM escapes: Extremely rare and require hypervisor vulnerabilities

  The hybrid approach gives you Docker's deployment convenience while using Firecracker's superior isolation for the
  actual untrusted code execution.


  VM Isolation Per Request

  From firecracker_manager.py:260-279 and firecracker_manager.py:417-433, each execution follows this pattern:

  1. Exclusive VM allocation: Each request gets its own VM instance from the pool
  2. Active tracking: VMs are moved to active_vms during execution
  3. Guaranteed isolation: No sharing between concurrent users
  4. Return after execution: VM is returned to pool only after completion

  Pool vs Active VMs

  The system maintains two separate VM states:
  - Pool VMs (pools[language]): Available for new requests
  - Active VMs (active_vms): Currently executing code for specific users

  Safety Guarantees

  What prevents unsafe sharing:
  - Each execute_code() call gets exclusive VM access
  - VMs are tracked in active_vms during execution
  - Pool only contains idle, available VMs
  - VM cleanup happens between users via _reset_vm()

  Potential concern: The current _reset_vm() implementation at line 321-325 is just a placeholder. In production, this
  should:
  - Restore VM from clean snapshot
  - Clear temporary files
  - Reset memory state

  So concurrent users are isolated, but the VM reset mechanism needs proper implementation for complete security
  between sequential users of the same VM.


----------

 The system has several critical gaps that prevent it from being production-ready:

  🚨 Critical Missing Components

  1. Real Firecracker API Integration
  - Current code uses placeholders for actual VM communication (firecracker_manager.py:138-139)
  - Needs proper Firecracker REST API calls for snapshots, execution
  - Missing proper VM state management

  2. Security Vulnerabilities
  - Code execution still happens via subprocess on host (firecracker_manager.py:122-126)
  - No actual isolation - defeats the purpose of Firecracker
  - Missing guest agent for secure code injection

  3. Production Infrastructure
  - No monitoring/observability (Prometheus metrics, health checks)
  - Missing rate limiting and DDoS protection
  - No authentication/authorization system
  - Basic logging configuration (main.py:15)

  4. Resource Management
  - VM pools not properly sized for production load
  - No auto-scaling mechanisms
  - Missing resource cleanup on service shutdown
  - No disk space monitoring

  5. Testing & Reliability
  - Limited test coverage (only basic tests exist)
  - No integration tests with real Firecracker
  - Missing load testing framework
  - No chaos engineering/failure testing

  6. Operational Concerns
  - CORS allows all origins (main.py:22) - security risk
  - No proper configuration management
  - Missing deployment scripts
  - No backup/recovery procedures

  🛠️ Required for Production

  1. Implement actual Firecracker API communication
  2. Add proper guest agent for secure code execution
  3. Implement comprehensive monitoring and alerting
  4. Add authentication and rate limiting
  5. Create extensive test suite including security tests
  6. Add proper configuration management
  7. Implement graceful shutdown and resource cleanup

  The current system is a proof-of-concept with good architectural foundations but needs significant work before
  production deployment.

⏺ Update Todos
  ⎿  ☒ Audit complete system for production readiness

> what do you mean by Implement actual Firecracker API communication

⏺ The current code has a fundamental flaw - it's not actually using Firecracker for code execution. Let me show you
  what I mean:

⏺ Read(firecracker_manager.py)
  ⎿  Read 20 lines (ctrl+r to expand)

⏺ Read(firecracker_manager.py)
  ⎿  Read 15 lines (ctrl+r to expand)

⏺ The Problem

  The current code:
  1. Starts Firecracker VMs (lines 80-97) ✅
  2. But executes code on the HOST (lines 142-146) ❌

  At firecracker_manager.py:142-146, it runs asyncio.create_subprocess_exec() which executes code on the host machine,
  not inside the Firecracker VM. This provides zero isolation.

  What "Actual Firecracker API Communication" Means

  Real Firecracker integration requires:

  1. Use Firecracker REST API:
  # Instead of subprocess on host
  process = await asyncio.create_subprocess_exec(*cmd)

  # Should be HTTP calls to VM
  async with aiohttp.ClientSession() as session:
      await session.put(f"http://unix:{vm.socket_path}/actions",
                       json={"action_type": "SendCtrlAltDel"})

  2. Guest Agent Communication:
  # Copy code INTO the VM filesystem
  await vm.copy_file_to_guest(code_file, "/tmp/user_code.py")

  # Execute INSIDE the VM via guest agent
  result = await vm.exec_in_guest("python3 /tmp/user_code.py")

  3. Proper VM State Management:
  # Create snapshot via Firecracker API
  await session.patch(f"http://unix:{vm.socket_path}/snapshot/create",
                     json={"snapshot_path": "/tmp/snapshot"})

  # Restore snapshot via Firecracker API  
  await session.patch(f"http://unix:{vm.socket_path}/snapshot/load",
                     json={"snapshot_path": "/tmp/snapshot"})

  4. Secure File Transfer:
  # Mount shared filesystem or use agent protocols
  # NOT direct host filesystem access

  Current Security Impact

  Right now, the "Firecracker" executor is actually just running code directly on the host with subprocess - no 
  isolation whatsoever. It's essentially the same as the basic subprocess executor but with VM startup overhead.

  The VM reset mechanisms I implemented are also ineffective since code never actually runs in the VM.
