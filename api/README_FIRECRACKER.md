# Firecracker-Based Secure Code Execution API

A high-performance, secure code execution platform using AWS Firecracker microVMs for Python, Rust, and TypeScript. Designed for code playgrounds and sandboxed environments with sub-second startup times.

## 🚀 Key Features

### Performance
- **Sub-second startup**: Firecracker VMs start in ~100ms vs Docker's 2-5 seconds
- **Low memory overhead**: ~5MB per VM vs ~50MB per Docker container  
- **VM pooling**: Pre-warmed VMs for instant execution
- **Snapshot restoration**: Near-instant VM cloning for parallel execution

### Security
- **Hardware-level isolation**: Firecracker provides true virtualization
- **Multi-level security policies**: Sandbox, Restricted, and Standard modes
- **Comprehensive code validation**: Pattern matching for dangerous operations
- **Resource limits**: CPU, memory, disk I/O, and execution time controls
- **Network isolation**: No network access by default

### Language Support
- **Python 3.11+**: Full standard library (policy-restricted)
- **Rust 1.70+**: Safe Rust with compilation support
- **TypeScript/Node.js 18+**: Modern JavaScript/TypeScript execution

## 📋 Prerequisites

- Linux host with KVM support
- Root access for initial setup
- Docker (for fallback mode)
- 4GB+ RAM recommended
- Modern CPU with virtualization extensions

## 🛠️ Installation

### Quick Setup
```bash
# Clone and setup
git clone <repository>
cd api/

# Run setup script (requires root)
sudo ./setup_firecracker.sh

# Start the API
python3 main.py
```

### Docker Setup (with Firecracker)
```bash
# Build Firecracker-enabled container
docker-compose -f docker-compose.firecracker.yml up --build

# Or run with privileged mode for KVM access
docker run --privileged --device /dev/kvm:/dev/kvm -p 8000:8000 firecracker-api
```

### Manual Installation
```bash
# Install Firecracker
FIRECRACKER_VERSION="v1.4.1"
wget -O firecracker.tgz \
  "https://github.com/firecracker-microvm/firecracker/releases/download/${FIRECRACKER_VERSION}/firecracker-${FIRECRACKER_VERSION}-x86_64.tgz"
tar -xzf firecracker.tgz
sudo mv release-*/firecracker-* /usr/local/bin/firecracker
sudo chmod +x /usr/local/bin/firecracker

# Setup KVM permissions
sudo groupadd -f kvm
sudo usermod -a -G kvm $USER
echo 'KERNEL=="kvm", GROUP="kvm", MODE="0666"' | sudo tee /etc/udev/rules.d/99-kvm.rules
sudo udevadm control --reload-rules

# Create directories and build VM images
sudo mkdir -p /opt/firecracker/{kernels,rootfs}
sudo python3 build_vm_images.py

# Install Python dependencies
pip3 install -r requirements.txt
```

## 🔧 Configuration

### Security Levels

#### Sandbox (Default)
- Maximum security restrictions
- 32MB RAM, 5-second timeout
- Limited imports (math, random, datetime, etc.)
- No file system or network access
- Ideal for untrusted code execution

#### Restricted  
- Moderate security with more capabilities
- 64MB RAM, 10-second timeout
- Additional imports (json, csv, urllib.parse)
- Read-only file access to specific paths
- Good for educational environments

#### Standard
- Relaxed restrictions for trusted users
- 128MB RAM, 30-second timeout
- Most standard library access
- Limited file and network operations
- Suitable for development environments

### Resource Limits
```python
# Example configuration per security level
SANDBOX_LIMITS = {
    "max_memory_mb": 32,
    "max_execution_time": 5,
    "max_cpu_percent": 25,
    "max_open_files": 5
}
```

## 📡 API Usage

### Execute Code
```bash
curl -X POST "http://localhost:8000/execute" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "print(\"Hello, Firecracker!\")",
    "language": "python",
    "timeout": 10,
    "security_level": "sandbox"
  }'
```

### Response Format
```json
{
  "output": "Hello, Firecracker!\n",
  "error": null,
  "execution_time": 0.156,
  "success": true
}
```

### Health Check
```bash
curl http://localhost:8000/health
```

```json
{
  "status": "healthy",
  "firecracker_available": true,
  "docker_available": true,
  "execution_method": "firecracker"
}
```

## 🔒 Security Features

### Code Validation
The system performs multi-layer security validation:

1. **Pattern Matching**: Detects dangerous operations like file system access, process execution, and network calls
2. **Import Restrictions**: Controls which libraries can be imported based on security level
3. **Resource Limits**: Enforces CPU, memory, and execution time constraints
4. **Hardware Isolation**: Each execution runs in a separate microVM

### Blocked Operations (Sandbox Mode)
- File system operations (`open()`, `file()`, etc.)
- Process execution (`subprocess`, `os.system()`, etc.)
- Network access (`socket`, `urllib`, `requests`)
- System introspection (`globals()`, `locals()`, `__import__`)
- Unsafe Rust blocks and external crates
- Node.js system modules (`fs`, `child_process`, `os`)

### Example Security Validation
```python
# This would be blocked in sandbox mode
code = """
import os
os.system('rm -rf /')
"""

# Security response
{
  "error": "Security validation failed: Dangerous pattern detected: import os"
}
```

## 🏗️ Architecture

### Components

1. **FastAPI Server** (`main.py`)
   - REST API endpoints
   - Request validation
   - Security policy enforcement
   - Execution orchestration

2. **Firecracker Manager** (`firecracker_manager.py`)
   - VM lifecycle management
   - Pool management for performance
   - Resource allocation
   - Execution coordination

3. **Security Manager** (`security_config.py`)
   - Multi-level security policies
   - Code validation rules
   - Resource limit definitions
   - Threat detection patterns

4. **VM Image Builder** (`build_vm_images.py`)
   - Creates minimal Alpine Linux images
   - Language-specific runtime setup
   - Kernel and rootfs generation
   - Optimized for fast boot times

### Execution Flow

1. **Request Validation**: Security policies validate submitted code
2. **VM Acquisition**: Get warm VM from pool or create new one
3. **Code Execution**: Run code in isolated microVM environment
4. **Result Collection**: Capture output, errors, and metrics
5. **VM Return**: Return VM to pool or dispose if damaged
6. **Response**: Return execution results to client

### Performance Optimizations

- **VM Pooling**: Maintains 3 warm VMs per language
- **Snapshot Restoration**: Fast VM cloning from base snapshots
- **Minimal Images**: <50MB rootfs with only essential components
- **Memory Ballooning**: Dynamic memory allocation
- **CPU Quotas**: Prevent resource starvation

## 📊 Performance Comparison

| Metric | Firecracker | Docker | Subprocess |
|--------|-------------|--------|------------|
| Startup Time | ~100ms | ~2-5s | ~50ms |
| Memory Overhead | ~5MB | ~50MB | ~0MB |
| Security | Hardware VM | Container | Process |
| Isolation | Complete | Namespace | None |
| Network Isolation | Yes | Configurable | No |
| Resource Controls | Fine-grained | Limited | Basic |

## 🧪 Testing

### Unit Tests
```bash
python3 -m pytest tests/
```

### Integration Tests
```bash
# Test all languages and security levels
python3 tests/integration_test.py
```

### Load Testing
```bash
# Test concurrent execution performance
python3 tests/load_test.py --concurrent 50 --requests 1000
```

### Example Test Cases
```python
# Python execution test
{
  "code": "print(sum(range(100)))",
  "language": "python",
  "expected_output": "4950\n"
}

# Rust execution test  
{
  "code": "fn main() { println!(\"Hello from Rust!\"); }",
  "language": "rust",
  "expected_output": "Hello from Rust!\n"
}

# TypeScript execution test
{
  "code": "console.log(Math.PI * 2);",
  "language": "typescript", 
  "expected_output": "6.283185307179586\n"
}
```

## 🚨 Troubleshooting

### Common Issues

#### KVM Not Available
```bash
# Check KVM support
ls -la /dev/kvm
sudo dmesg | grep kvm

# Fix permissions
sudo chmod 666 /dev/kvm
sudo usermod -a -G kvm $USER
```

#### VM Images Not Found
```bash
# Rebuild VM images
sudo python3 build_vm_images.py

# Check image locations
ls -la /opt/firecracker/*/
```

#### Performance Issues
```bash
# Check system resources
htop
free -h
df -h

# Monitor VM pool status
curl http://localhost:8000/health
```

#### Security Validation Errors
```bash
# Check security policies
python3 -c "from security_config import security_manager; print(security_manager.policies)"

# Test code validation
python3 -c "
from security_config import security_manager, SecurityLevel
is_valid, violations = security_manager.validate_code('print(1)', 'python', SecurityLevel.SANDBOX)
print(f'Valid: {is_valid}, Violations: {violations}')
"
```

## 🔄 Fallback Mechanisms

The system includes multiple fallback layers:

1. **Firecracker** (Primary): Hardware-isolated microVMs
2. **Docker** (Secondary): Container-based isolation  
3. **Subprocess** (Tertiary): Process-level execution

Fallback is automatic based on availability:
```python
# Execution priority
if firecracker_available:
    use_firecracker()
elif docker_available:
    use_docker()
else:
    use_subprocess()
```

## 🔮 Future Enhancements

### Planned Features
- **Snapshot Management**: Pre-compiled snapshots for faster language-specific execution
- **Auto-scaling**: Dynamic VM pool sizing based on load
- **Metrics & Monitoring**: Prometheus metrics and Grafana dashboards
- **Multi-node Support**: Distributed execution across multiple hosts
- **Language Extensions**: Support for Go, Java, C++, and more
- **Interactive Sessions**: Persistent VMs for REPL-style execution

### Performance Optimizations
- **Memory Ballooning**: Dynamic memory allocation
- **CPU Pinning**: Dedicated CPU cores for high-priority workloads
- **NUMA Awareness**: Optimized memory placement
- **Storage Optimization**: Overlay filesystems and copy-on-write

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review security documentation for policy questions

---

**Built for secure, high-performance code execution environments.** ⚡🔒