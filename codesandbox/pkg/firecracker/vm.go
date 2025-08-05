package firecracker

import (
	"context"
	"fmt"
	"io"
	"net"
	"os"
	"path/filepath"
	"time"

	firecracker "github.com/firecracker-microvm/firecracker-go-sdk"
	models "github.com/firecracker-microvm/firecracker-go-sdk/client/models"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

// VMConfig holds configuration for a Firecracker VM
type VMConfig struct {
	ID            string
	KernelPath    string
	RootfsPath    string
	MemSizeMib    int64
	CPUCount      int64
	NetworkConfig *NetworkConfig
}

// NetworkConfig holds network configuration for the VM
type NetworkConfig struct {
	HostDeviceName string
	IPAddr         string
	GatewayAddr    string
	Netmask        string
}

// VM represents a Firecracker microVM instance
type VM struct {
	ID      string
	Machine *firecracker.Machine
	Config  *VMConfig
	IPAddr  string
	ctx     context.Context
	cancel  context.CancelFunc
}

// Manager handles VM lifecycle
type Manager struct {
	vmPool       []*VM
	availableVMs chan *VM
	rootfsPath   string
	kernelPath   string
	config       *ManagerConfig
	netManager   *NetworkManager
}

// ManagerConfig holds configuration for the VM manager
type ManagerConfig struct {
	PoolSize      int
	RootfsPath    string
	KernelPath    string
	MemSizeMib    int64
	CPUCount      int64
	NetworkPrefix string // e.g., "172.16.0"
}

// NewManager creates a new VM manager
func NewManager(config *ManagerConfig) (*Manager, error) {
	// Create network manager
	netManager := NewNetworkManager(config.NetworkPrefix)
	if err := netManager.Setup(); err != nil {
		return nil, fmt.Errorf("failed to setup network: %w", err)
	}

	manager := &Manager{
		vmPool:       make([]*VM, 0, config.PoolSize),
		availableVMs: make(chan *VM, config.PoolSize),
		rootfsPath:   config.RootfsPath,
		kernelPath:   config.KernelPath,
		config:       config,
		netManager:   netManager,
	}

	// Initialize VM pool
	for i := 0; i < config.PoolSize; i++ {
		vm, err := manager.createVM(i)
		if err != nil {
			log.WithError(err).Error("Failed to create VM")
			continue
		}
		manager.vmPool = append(manager.vmPool, vm)
		manager.availableVMs <- vm
	}

	return manager, nil
}

// createVM creates a new Firecracker VM
func (m *Manager) createVM(index int) (*VM, error) {
	vmID := uuid.New().String()
	
	// Create VM-specific rootfs (copy-on-write)
	vmRootfs := filepath.Join("/tmp", fmt.Sprintf("rootfs-%s.ext4", vmID))
	if err := copyFile(m.rootfsPath, vmRootfs); err != nil {
		return nil, fmt.Errorf("failed to copy rootfs: %w", err)
	}

	// Network configuration
	netConfig := &NetworkConfig{
		HostDeviceName: fmt.Sprintf("fc-tap-%d", index),
		IPAddr:         fmt.Sprintf("%s.%d", m.config.NetworkPrefix, 100+index),
		GatewayAddr:    fmt.Sprintf("%s.1", m.config.NetworkPrefix),
		Netmask:        "255.255.255.0",
	}

	vmConfig := &VMConfig{
		ID:            vmID,
		KernelPath:    m.kernelPath,
		RootfsPath:    vmRootfs,
		MemSizeMib:    m.config.MemSizeMib,
		CPUCount:      m.config.CPUCount,
		NetworkConfig: netConfig,
	}

	return m.startVM(vmConfig, index)
}

// startVM starts a new Firecracker VM
func (m *Manager) startVM(config *VMConfig, index int) (*VM, error) {
	ctx, cancel := context.WithCancel(context.Background())
	
	// Don't pre-create TAP - Firecracker will create it
	// We'll add it to the bridge after VM starts

	// Socket path for Firecracker API
	socketPath := filepath.Join("/tmp", fmt.Sprintf("firecracker-%s.sock", config.ID))

	// Generate MAC address for the VM
	macAddr := generateMAC()

	// Pre-create TAP device with proper ownership
	if err := m.netManager.CreateTAPDevice(config.NetworkConfig.HostDeviceName); err != nil {
		cancel()
		return nil, fmt.Errorf("failed to create TAP device: %w", err)
	}
	
	// VM configuration
	cfg := firecracker.Config{
		SocketPath:      socketPath,
		KernelImagePath: config.KernelPath,
		Drives: []models.Drive{{
			DriveID:      firecracker.String("rootfs"),
			PathOnHost:   firecracker.String(config.RootfsPath),
			IsRootDevice: firecracker.Bool(true),
			IsReadOnly:   firecracker.Bool(false),
		}},
		MachineCfg: models.MachineConfiguration{
			VcpuCount:  firecracker.Int64(config.CPUCount),
			MemSizeMib: firecracker.Int64(config.MemSizeMib),
		},
		NetworkInterfaces: []firecracker.NetworkInterface{{
			StaticConfiguration: &firecracker.StaticNetworkConfiguration{
				HostDevName: config.NetworkConfig.HostDeviceName,
				MacAddress:  macAddr,
			},
		}},
		KernelArgs: fmt.Sprintf("console=ttyS0 reboot=k panic=1 pci=off vm_id=%d init=/init", index),
	}

	// Create machine - the API server should be run with sudo for network permissions
	machine, err := firecracker.NewMachine(ctx, cfg)
	if err != nil {
		cancel()
		return nil, fmt.Errorf("failed to create machine: %w", err)
	}

	// Start the VM
	if err := machine.Start(ctx); err != nil {
		cancel()
		return nil, fmt.Errorf("failed to start machine: %w", err)
	}

	vm := &VM{
		ID:      config.ID,
		Machine: machine,
		Config:  config,
		IPAddr:  config.NetworkConfig.IPAddr,
		ctx:     ctx,
		cancel:  cancel,
	}

	// Wait for VM to be ready
	if err := vm.waitForReady(); err != nil {
		vm.Stop()
		return nil, fmt.Errorf("VM failed to become ready: %w", err)
	}

	return vm, nil
}

// GetVM retrieves an available VM from the pool
func (m *Manager) GetVM(ctx context.Context) (*VM, error) {
	select {
	case vm := <-m.availableVMs:
		return vm, nil
	case <-ctx.Done():
		return nil, ctx.Err()
	}
}

// ReturnVM returns a VM to the pool
func (m *Manager) ReturnVM(vm *VM) {
	// Reset VM state
	if err := vm.Reset(); err != nil {
		log.WithError(err).Error("Failed to reset VM")
		// Create a new VM to replace the broken one
		newVM, err := m.createVM(len(m.vmPool))
		if err != nil {
			log.WithError(err).Error("Failed to create replacement VM")
			return
		}
		vm = newVM
	}
	
	m.availableVMs <- vm
}

// Cleanup shuts down all VMs
func (m *Manager) Cleanup() {
	close(m.availableVMs)
	for _, vm := range m.vmPool {
		vm.Stop()
		// Clean up TAP device
		if vm.Config != nil && vm.Config.NetworkConfig != nil {
			m.netManager.DeleteTAPDevice(vm.Config.NetworkConfig.HostDeviceName)
		}
	}
	// Clean up network
	m.netManager.Cleanup()
}

// Stop stops the VM
func (vm *VM) Stop() error {
	if vm.cancel != nil {
		vm.cancel()
	}
	
	if vm.Machine != nil {
		if err := vm.Machine.StopVMM(); err != nil {
			return fmt.Errorf("failed to stop VMM: %w", err)
		}
	}
	
	// Cleanup resources
	if vm.Config != nil {
		os.Remove(vm.Config.RootfsPath)
		// Note: TAP device cleanup handled by VM manager
	}
	
	return nil
}

// Reset resets the VM to a clean state
func (vm *VM) Reset() error {
	// For now, we'll just ensure the VM is still responsive
	// In production, you might want to snapshot/restore the rootfs
	return vm.waitForReady()
}

// waitForReady waits for the VM to be ready to accept commands
func (vm *VM) waitForReady() error {
	timeout := time.After(30 * time.Second)
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-timeout:
			return fmt.Errorf("timeout waiting for VM to be ready")
		case <-ticker.C:
			// Try to connect to the agent inside the VM
			conn, err := net.Dial("tcp", fmt.Sprintf("%s:8080", vm.IPAddr))
			if err == nil {
				conn.Close()
				return nil
			}
		}
	}
}

// Helper functions

func copyFile(src, dst string) error {
	source, err := os.Open(src)
	if err != nil {
		return err
	}
	defer source.Close()

	destination, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer destination.Close()

	_, err = io.Copy(destination, source)
	return err
}

func generateMAC() string {
	mac := make([]byte, 6)
	mac[0] = 0x02 // Locally administered
	for i := 1; i < 6; i++ {
		mac[i] = byte(time.Now().UnixNano() >> (8 * i) & 0xff)
	}
	return fmt.Sprintf("%02x:%02x:%02x:%02x:%02x:%02x",
		mac[0], mac[1], mac[2], mac[3], mac[4], mac[5])
}