# Network Architecture - Go Codesandbox Implementation

## Table of Contents
1. [Overview](#overview)
2. [Key Concepts for Non-Network Experts](#key-concepts-for-non-network-experts)
3. [Architecture Components](#architecture-components)
4. [Network Flow](#network-flow)
5. [Go Implementation Details](#go-implementation-details)
6. [VM Lifecycle and Networking](#vm-lifecycle-and-networking)
7. [Security and Isolation](#security-and-isolation)
8. [Troubleshooting](#troubleshooting)

## Overview

This codesandbox uses **Firecracker microVMs** to execute untrusted code safely. The networking architecture enables communication between:
- **Host API Server** (Go application running on port 8000)
- **Multiple Firecracker VMs** (each running an agent on port 8080)
- **External clients** (making HTTP requests to execute code)

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           HOST SYSTEM                               │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────┐      │
│  │              API Server (Go - cmd/api/main.go)           │      │
│  │                    Port: 8000                            │      │
│  │                                                          │      │
│  │  - Manages VM pool (3 VMs by default)                   │      │
│  │  - Routes code execution requests to VMs                │      │
│  │  - Communicates via HTTP to VM agents                   │      │
│  └────────────────────┬─────────────────────────────────────┘      │
│                       │                                             │
│                       │ HTTP Requests to 172.16.0.100-102:8080     │
│                       │                                             │
│  ┌────────────────────▼─────────────────────────────────────┐      │
│  │           Linux Bridge: fcbridge (172.16.0.1/24)         │      │
│  └──────┬──────────────┬──────────────┬────────────────────┘      │
│         │              │              │                            │
│    ┌────▼────┐    ┌───▼────┐    ┌───▼────┐                      │
│    │fc-tap-0 │    │fc-tap-1│    │fc-tap-2│   TAP Devices        │
│    └────┬────┘    └───┬────┘    └───┬────┘                      │
│         │              │              │                            │
└─────────┼──────────────┼──────────────┼────────────────────────────┘
          │              │              │
     ┌────▼────┐    ┌───▼────┐    ┌───▼────┐
     │   VM 0  │    │  VM 1  │    │  VM 2  │   Firecracker VMs
     │172.16.0.│    │172.16.0│    │172.16.0│
     │  .100   │    │  .101  │    │  .102  │
     │         │    │        │    │        │
     │ Agent   │    │ Agent  │    │ Agent  │   Guest Agents
     │Port 8080│    │Port    │    │Port    │   (Go binaries)
     └─────────┘    └────────┘    └────────┘
```

## Key Concepts for Non-Network Experts

### What is a TAP Device?
- **TAP** = Terminal Access Point
- Think of it as a **virtual network cable** that connects a VM to the host
- Works at Layer 2 (Ethernet level) - handles complete network frames
- Each VM gets its own TAP device (like each computer gets its own ethernet cable)
- Named `fc-tap-0`, `fc-tap-1`, etc. in our system

### What is a Bridge?
- **Bridge** = Virtual network switch
- Like a physical network switch that connects multiple computers
- Our bridge (`fcbridge`) connects all TAP devices together
- Allows VMs to communicate with each other and the host
- Has IP address `172.16.0.1` - acts as the gateway for VMs

### IP Addressing Scheme
```
172.16.0.0/24 Network (256 addresses)
├── 172.16.0.1    - Bridge/Gateway (host interface)
├── 172.16.0.100  - VM 0
├── 172.16.0.101  - VM 1
├── 172.16.0.102  - VM 2
└── ...           - Additional VMs as needed
```

### Firecracker VM
- **Lightweight virtual machine** (boots in ~125ms)
- Runs a minimal Linux kernel
- Contains only what's needed: init process, agent binary, language runtimes
- Completely isolated from host and other VMs
- Uses KVM (Kernel Virtual Machine) for hardware virtualization

## Architecture Components

### 1. API Server (`cmd/api/main.go`)
**Purpose**: Main entry point, manages VM pool and routes requests

**Key Responsibilities**:
- Maintains a pool of pre-warmed VMs (default: 3)
- Accepts code execution requests on port 8000
- Selects available VM from pool
- Forwards request to VM's agent via HTTP
- Returns results to client

**Configuration** (from environment variables):
```go
type Config struct {
    Port          string  // API_PORT (default: "8000")
    VMPoolSize    int     // Number of VMs to maintain (default: 3)
    RootfsPath    string  // ROOTFS_PATH - filesystem image for VMs
    KernelPath    string  // KERNEL_PATH - Linux kernel for VMs
    MemSizeMib    int64   // Memory per VM (default: 2048 MB)
    CPUCount      int64   // vCPUs per VM (default: 1)
    NetworkPrefix string  // Network subnet (default: "172.16.0")
}
```

### 2. VM Manager (`pkg/firecracker/vm.go`)
**Purpose**: Manages VM lifecycle and pool

**Key Functions**:
```go
// Creates and maintains VM pool
NewManager(config *ManagerConfig) (*Manager, error)

// Gets available VM from pool (blocks until available)
GetVM(ctx context.Context) (*VM, error)

// Returns VM to pool after use
ReturnVM(vm *VM)

// Creates individual VM with networking
createVM(index int) (*VM, error)

// Starts Firecracker VM with configuration
startVM(config *VMConfig, index int) (*VM, error)
```

**VM Creation Process**:
1. Generate unique VM ID
2. Copy rootfs (copy-on-write for isolation)
3. Configure network (IP, TAP device, MAC address)
4. Start Firecracker process
5. Wait for agent to be ready (TCP check on port 8080)

### 3. Network Manager (`pkg/firecracker/network.go`)
**Purpose**: Handles TAP device creation and bridge management

**Key Functions**:
```go
// Verifies bridge exists and configures it
Setup() error

// Creates TAP device with specific name
CreateTAPDevice(name string) error

// Creates TAP with auto-generated name if conflicts
CreateTAPDeviceAuto() (string, error)

// Removes TAP device
DeleteTAPDevice(name string) error
```

**TAP Device Creation Process**:
1. Check if device exists (cleanup if needed)
2. Create TAP device: `ip tuntap add dev fc-tap-X mode tap`
3. Attach to bridge: `ip link set fc-tap-X master fcbridge`
4. Bring up interface: `ip link set fc-tap-X up`
5. Enable promiscuous mode: `ip link set fc-tap-X promisc on`

### 4. Guest Agent (`cmd/agent/main.go`)
**Purpose**: Runs inside each VM, executes code safely

**Supported Languages**:
- Python 3
- TypeScript (via Deno)
- Rust (via Cargo)

**Execution Flow**:
1. Receives HTTP POST request with code and language
2. Creates temporary file with appropriate extension
3. For compiled languages (Rust): compiles first
4. Executes with timeout protection
5. Captures stdout/stderr
6. Returns results as JSON

## Network Flow

### Request Journey

```
1. Client Request
   POST http://host:8000/execute
   {
     "language": "python",
     "code": "print('Hello')",
     "timeout": 30
   }

2. API Server Processing
   - Validates request
   - Gets VM from pool (e.g., VM with IP 172.16.0.100)
   - Creates HTTP request to agent

3. Host → VM Communication
   POST http://172.16.0.100:8080/execute
   (Request forwarded to VM's agent)

4. Network Path:
   API Server → fcbridge → fc-tap-0 → VM's eth0 → Agent

5. Agent Execution
   - Writes code to temp file
   - Executes in isolated environment
   - Captures output

6. Response Path:
   Agent → VM's eth0 → fc-tap-0 → fcbridge → API Server

7. Client Response
   {
     "request_id": "uuid",
     "success": true,
     "output": "Hello",
     "execution_time": 0.05
   }
```

## Go Implementation Details

### Connection Pooling and VM Management

```go
// Manager maintains a pool of VMs
type Manager struct {
    vmPool       []*VM          // All VMs
    availableVMs chan *VM       // Channel for available VMs
    rootfsPath   string
    kernelPath   string
    config       *ManagerConfig
    netManager   *NetworkManager
}

// VM pool is initialized at startup
for i := 0; i < config.PoolSize; i++ {
    vm, err := manager.createVM(i)
    if err != nil {
        log.WithError(err).Error("Failed to create VM")
        continue
    }
    manager.vmPool = append(manager.vmPool, vm)
    manager.availableVMs <- vm  // Add to available pool
}
```

### Network Configuration in Firecracker

```go
// Network configuration for each VM
cfg := firecracker.Config{
    NetworkInterfaces: []firecracker.NetworkInterface{{
        StaticConfiguration: &firecracker.StaticNetworkConfiguration{
            HostDevName: "fc-tap-0",     // TAP device name
            MacAddress:  generateMAC(),   // Unique MAC address
        },
    }},
    // Kernel arguments include network setup
    KernelArgs: fmt.Sprintf(
        "console=ttyS0 reboot=k panic=1 pci=off vm_id=%d init=/init",
        index
    ),
}
```

### HTTP Communication with VMs

```go
func (s *Server) executeInVM(vm *firecracker.VM, req ExecuteRequest) (*ExecuteResponse, error) {
    // Build request URL using VM's IP
    agentURL := fmt.Sprintf("http://%s:8080/execute", vm.IPAddr)
    
    // Create request with timeout
    ctx, cancel := context.WithTimeout(
        context.Background(), 
        time.Duration(req.Timeout+5)*time.Second
    )
    defer cancel()
    
    // Send HTTP request to agent inside VM
    httpReq, _ := http.NewRequestWithContext(ctx, "POST", agentURL, bytes.NewReader(reqBody))
    
    // Execute request
    resp, err := client.Do(httpReq)
    // ... handle response
}
```

### VM Readiness Check

```go
func (vm *VM) waitForReady() error {
    timeout := time.After(30 * time.Second)
    ticker := time.NewTicker(1 * time.Second)
    defer ticker.Stop()

    for {
        select {
        case <-timeout:
            return fmt.Errorf("timeout waiting for VM")
        case <-ticker.C:
            // Try TCP connection to agent
            conn, err := net.Dial("tcp", fmt.Sprintf("%s:8080", vm.IPAddr))
            if err == nil {
                conn.Close()
                return nil  // VM is ready
            }
        }
    }
}
```

## VM Lifecycle and Networking

### VM Startup Sequence

1. **Allocate Resources**
   - Generate unique VM ID
   - Copy rootfs image (copy-on-write)
   - Allocate network resources (IP, TAP name)

2. **Create TAP Device**
   ```bash
   sudo ip tuntap add dev fc-tap-0 mode tap user dlo group dlo
   sudo ip link set fc-tap-0 master fcbridge
   sudo ip link set fc-tap-0 up
   sudo ip link set fc-tap-0 promisc on
   ```

3. **Start Firecracker**
   - Create Unix socket for API
   - Configure VM (memory, CPU, network, storage)
   - Start microVM
   - Firecracker attaches to TAP device

4. **Guest Initialization**
   - Linux kernel boots
   - Init process starts
   - Network interface configured (eth0)
   - Agent starts listening on port 8080

5. **Health Check**
   - API server polls agent endpoint
   - Verifies TCP connectivity
   - Adds to available pool

### VM Shutdown Sequence

1. Stop Firecracker VMM
2. Clean up Unix socket
3. Delete TAP device
4. Remove temporary rootfs copy

## Security and Isolation

### Network Isolation
- **Each VM has isolated network stack**
- **TAP devices provide Layer 2 isolation**
- **Bridge limits broadcast domains**
- **No direct internet access from VMs** (by default)

### Resource Limits
- **Memory**: 2GB per VM (configurable)
- **CPU**: 1 vCPU per VM (configurable)
- **Execution timeout**: 30 seconds default
- **Network**: Limited to local subnet

### Process Isolation
- **Firecracker uses KVM** for hardware virtualization
- **Seccomp filters** limit system calls
- **Minimal attack surface** (no unnecessary services)
- **Read-only root filesystem** option available

## Troubleshooting

### Common Issues and Solutions

#### 1. Bridge Not Found
```bash
# Error: bridge fcbridge not found
# Solution: Run setup script
sudo ./scripts/setup-host-network.sh bridge-setup
```

#### 2. TAP Device Busy
```bash
# Error: Device or resource busy
# Solution: Clean up stale TAP devices
sudo ip link delete fc-tap-0
# Or use the cleanup in network.go which handles this automatically
```

#### 3. VM Not Responding
```go
// Check if agent is running
curl http://172.16.0.100:8080/health

// Check VM logs
journalctl -u firecracker-vm

// Check network connectivity
ping 172.16.0.100
```

#### 4. Permission Issues
```bash
# API server needs sudo for network operations
sudo ./cmd/api/api

# Or add user to appropriate groups
sudo usermod -aG kvm,netdev $USER
```

### Network Debugging Commands

```bash
# View bridge configuration
ip addr show fcbridge
bridge link show

# List TAP devices
ip link show | grep fc-tap

# Check routing
ip route show

# Monitor network traffic
sudo tcpdump -i fcbridge -n

# Check Firecracker process
ps aux | grep firecracker

# View iptables rules (if any)
sudo iptables -L -n -v
```

## Performance Considerations

### VM Pool Management
- **Pre-warmed VMs**: Eliminates cold start latency
- **Pool size**: Balance between resource usage and availability
- **VM reuse**: Clean state between executions

### Network Optimizations
- **Local communication**: No external network hops
- **Bridge forwarding**: Hardware-accelerated on modern kernels
- **TAP devices**: Minimal overhead with virtio drivers

### Scaling Considerations
- **Horizontal scaling**: Add more VMs to pool
- **Multiple API servers**: Load balance across instances
- **Network subnet**: /24 supports 254 VMs per host

## Summary

The Go codesandbox implementation provides a secure, isolated environment for code execution using:

1. **Firecracker VMs** for strong isolation
2. **TAP/Bridge networking** for VM-host communication
3. **HTTP-based** agent protocol for simplicity
4. **VM pooling** for performance
5. **Go's concurrency** for efficient resource management

The architecture balances security (through VM isolation) with performance (through pooling and local networking), making it suitable for production use cases requiring safe execution of untrusted code.