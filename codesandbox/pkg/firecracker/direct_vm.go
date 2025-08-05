package firecracker

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"sync"
	"time"

	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

// DirectVM represents a directly managed Firecracker VM
type DirectVM struct {
	ID          string
	SocketPath  string
	Process     *os.Process
	IPAddr      string
	TAPDevice   string
	RootfsPath  string
	mu          sync.Mutex
	httpClient  *http.Client
	isAvailable bool
}

// DirectManager manages VMs using direct Firecracker API calls
type DirectManager struct {
	vmPool       []*DirectVM
	availableVMs chan *DirectVM
	config       *ManagerConfig
	netManager   *NetworkManager
	mu           sync.RWMutex
}

// NewDirectManager creates a new direct VM manager
func NewDirectManager(config *ManagerConfig) (*DirectManager, error) {
	// Create network manager
	netManager := NewNetworkManager(config.NetworkPrefix)
	if err := netManager.Setup(); err != nil {
		return nil, fmt.Errorf("failed to setup network: %w", err)
	}

	manager := &DirectManager{
		vmPool:       make([]*DirectVM, 0, config.PoolSize),
		availableVMs: make(chan *DirectVM, config.PoolSize),
		config:       config,
		netManager:   netManager,
	}

	// Initialize VM pool
	log.Info("Initializing VM pool...")
	for i := 0; i < config.PoolSize; i++ {
		vm, err := manager.createDirectVM(i)
		if err != nil {
			log.WithError(err).Errorf("Failed to create VM %d", i)
			continue
		}
		manager.vmPool = append(manager.vmPool, vm)
		manager.availableVMs <- vm
		log.Infof("VM %d created successfully", i)
	}

	if len(manager.vmPool) == 0 {
		return nil, fmt.Errorf("failed to create any VMs")
	}

	log.Infof("VM pool initialized with %d VMs", len(manager.vmPool))
	return manager, nil
}

// createDirectVM creates a new Firecracker VM using direct API calls
func (m *DirectManager) createDirectVM(index int) (*DirectVM, error) {
	vmID := uuid.New().String()
	socketPath := filepath.Join("/tmp", fmt.Sprintf("firecracker-%s.sock", vmID))
	
	// Create VM-specific rootfs (copy-on-write)
	vmRootfs := filepath.Join("/tmp", fmt.Sprintf("rootfs-%s.ext4", vmID))
	if err := copyFile(m.config.RootfsPath, vmRootfs); err != nil {
		return nil, fmt.Errorf("failed to copy rootfs: %w", err)
	}

	// Create TAP device
	tapName := fmt.Sprintf("fc-tap-%d", index)
	if err := m.netManager.CreateTAPDevice(tapName); err != nil {
		os.Remove(vmRootfs)
		return nil, fmt.Errorf("failed to create TAP device: %w", err)
	}

	// VM IP address
	vmIP := fmt.Sprintf("%s.%d", m.config.NetworkPrefix, 100+index)

	vm := &DirectVM{
		ID:         vmID,
		SocketPath: socketPath,
		IPAddr:     vmIP,
		TAPDevice:  tapName,
		RootfsPath: vmRootfs,
		httpClient: &http.Client{
			Transport: &http.Transport{
				DialContext: func(ctx context.Context, _, _ string) (net.Conn, error) {
					return net.Dial("unix", socketPath)
				},
			},
			Timeout: 10 * time.Second,
		},
		isAvailable: true,
	}

	// Start Firecracker process
	if err := vm.startFirecracker(); err != nil {
		m.netManager.DeleteTAPDevice(tapName)
		os.Remove(vmRootfs)
		return nil, fmt.Errorf("failed to start Firecracker: %w", err)
	}

	// Configure VM
	if err := vm.configureVM(m.config.KernelPath, index); err != nil {
		vm.Stop()
		return nil, fmt.Errorf("failed to configure VM: %w", err)
	}

	// Start VM
	if err := vm.startInstance(); err != nil {
		vm.Stop()
		return nil, fmt.Errorf("failed to start VM instance: %w", err)
	}

	// Wait for VM to be ready
	if err := vm.waitForReady(); err != nil {
		vm.Stop()
		return nil, fmt.Errorf("VM failed to become ready: %w", err)
	}

	return vm, nil
}

// startFirecracker starts the Firecracker process
func (vm *DirectVM) startFirecracker() error {
	// Start Firecracker with API socket
	cmd := exec.Command("firecracker",
		"--api-sock", vm.SocketPath,
		"--id", vm.ID,
	)
	
	// Set up logs
	logFile, err := os.Create(fmt.Sprintf("/tmp/firecracker-%s.log", vm.ID))
	if err != nil {
		return fmt.Errorf("failed to create log file: %w", err)
	}
	
	cmd.Stdout = logFile
	cmd.Stderr = logFile
	
	if err := cmd.Start(); err != nil {
		return fmt.Errorf("failed to start Firecracker: %w", err)
	}
	
	vm.Process = cmd.Process
	
	// Wait for socket to be created
	for i := 0; i < 50; i++ {
		if _, err := os.Stat(vm.SocketPath); err == nil {
			time.Sleep(100 * time.Millisecond) // Give it a bit more time to be ready
			return nil
		}
		time.Sleep(100 * time.Millisecond)
	}
	
	return fmt.Errorf("Firecracker socket not created")
}

// configureVM configures the VM using Firecracker API
func (vm *DirectVM) configureVM(kernelPath string, vmIndex int) error {
	// Set boot source
	bootSource := map[string]interface{}{
		"kernel_image_path": kernelPath,
		"boot_args": fmt.Sprintf("console=ttyS0 reboot=k panic=1 pci=off vm_id=%d", vmIndex),
	}
	
	if err := vm.apiCall("PUT", "/boot-source", bootSource); err != nil {
		return fmt.Errorf("failed to set boot source: %w", err)
	}
	
	// Add rootfs drive
	drive := map[string]interface{}{
		"drive_id":       "rootfs",
		"path_on_host":   vm.RootfsPath,
		"is_root_device": true,
		"is_read_only":   false,
	}
	
	if err := vm.apiCall("PUT", "/drives/rootfs", drive); err != nil {
		return fmt.Errorf("failed to add rootfs drive: %w", err)
	}
	
	// Configure machine
	machineConfig := map[string]interface{}{
		"vcpu_count":   1,
		"mem_size_mib": 256,
		"ht_enabled":   false,
	}
	
	if err := vm.apiCall("PUT", "/machine-config", machineConfig); err != nil {
		return fmt.Errorf("failed to set machine config: %w", err)
	}
	
	// Add network interface
	netInterface := map[string]interface{}{
		"iface_id":       "eth0",
		"guest_mac":      generateMAC(),
		"host_dev_name":  vm.TAPDevice,
	}
	
	if err := vm.apiCall("PUT", "/network-interfaces/eth0", netInterface); err != nil {
		return fmt.Errorf("failed to add network interface: %w", err)
	}
	
	return nil
}

// startInstance starts the VM instance
func (vm *DirectVM) startInstance() error {
	action := map[string]interface{}{
		"action_type": "InstanceStart",
	}
	
	if err := vm.apiCall("PUT", "/actions", action); err != nil {
		return fmt.Errorf("failed to start instance: %w", err)
	}
	
	return nil
}

// apiCall makes an API call to Firecracker
func (vm *DirectVM) apiCall(method, path string, body interface{}) error {
	var bodyReader io.Reader
	if body != nil {
		jsonBody, err := json.Marshal(body)
		if err != nil {
			return fmt.Errorf("failed to marshal body: %w", err)
		}
		bodyReader = bytes.NewReader(jsonBody)
	}
	
	req, err := http.NewRequest(method, "http://localhost"+path, bodyReader)
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}
	
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	
	resp, err := vm.httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("failed to execute request: %w", err)
	}
	defer resp.Body.Close()
	
	if resp.StatusCode >= 400 {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("API call failed with status %d: %s", resp.StatusCode, string(body))
	}
	
	return nil
}

// waitForReady waits for the VM to be ready
func (vm *DirectVM) waitForReady() error {
	timeout := time.After(30 * time.Second)
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-timeout:
			return fmt.Errorf("timeout waiting for VM to be ready")
		case <-ticker.C:
			// Try to connect to the agent inside the VM
			conn, err := net.DialTimeout("tcp", fmt.Sprintf("%s:8080", vm.IPAddr), 2*time.Second)
			if err == nil {
				conn.Close()
				return nil
			}
		}
	}
}

// Stop stops the VM
func (vm *DirectVM) Stop() error {
	vm.mu.Lock()
	defer vm.mu.Unlock()
	
	// Kill Firecracker process
	if vm.Process != nil {
		vm.Process.Kill()
		vm.Process.Wait()
	}
	
	// Cleanup resources
	os.Remove(vm.SocketPath)
	os.Remove(vm.RootfsPath)
	os.Remove(fmt.Sprintf("/tmp/firecracker-%s.log", vm.ID))
	
	return nil
}

// Reset resets the VM to a clean state
func (vm *DirectVM) Reset() error {
	// For now, just check if VM is still responsive
	return vm.waitForReady()
}

// GetVM retrieves an available VM from the pool
func (m *DirectManager) GetVM(ctx context.Context) (*DirectVM, error) {
	select {
	case vm := <-m.availableVMs:
		return vm, nil
	case <-ctx.Done():
		return nil, ctx.Err()
	}
}

// ReturnVM returns a VM to the pool
func (m *DirectManager) ReturnVM(vm *DirectVM) {
	// Reset VM state
	if err := vm.Reset(); err != nil {
		log.WithError(err).Error("Failed to reset VM")
		// Create a new VM to replace the broken one
		newVM, err := m.createDirectVM(len(m.vmPool))
		if err != nil {
			log.WithError(err).Error("Failed to create replacement VM")
			return
		}
		vm.Stop()
		vm = newVM
	}
	
	m.availableVMs <- vm
}

// Cleanup shuts down all VMs
func (m *DirectManager) Cleanup() {
	close(m.availableVMs)
	for _, vm := range m.vmPool {
		vm.Stop()
		if vm.TAPDevice != "" {
			m.netManager.DeleteTAPDevice(vm.TAPDevice)
		}
	}
	m.netManager.Cleanup()
}