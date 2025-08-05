package firecracker

import (
	"bufio"
	"bytes"
	"fmt"
	"os/exec"
	"regexp"
	"strings"
	"sync"
	"time"
)

// NetworkManager handles network configuration for VMs
type NetworkManager struct {
	bridgeName string
	subnet     string
}

// NewNetworkManager creates a new network manager
func NewNetworkManager(subnet string) *NetworkManager {
	return &NetworkManager{
		bridgeName: "fcbridge",
		subnet:     subnet,
	}
}

// Serialize TAP creation to avoid name races
var tapMu sync.Mutex

// Setup verifies the bridge exists and is up
func (nm *NetworkManager) Setup() error {
	out, err := exec.Command("ip", "link", "show", nm.bridgeName).CombinedOutput()
	if err != nil {
		return fmt.Errorf("bridge %s not found. Please run scripts/setup-host-network.sh first: %s", nm.bridgeName, strings.TrimSpace(string(out)))
	}
	if !strings.Contains(string(out), "UP") {
		if err := execCommand("sudo", "ip", "link", "set", nm.bridgeName, "up"); err != nil {
			return fmt.Errorf("failed to bring up bridge: %w", err)
		}
	}
	return nil
}

// Cleanup no-op; TAPs are per-VM
func (nm *NetworkManager) Cleanup() error { return nil }

// CreateTAPDeviceAuto creates a TAP with the next available name (fc-tap-N) and returns that name.
func (nm *NetworkManager) CreateTAPDeviceAuto() (string, error) {
	tapMu.Lock()
	defer tapMu.Unlock()

	// Try a small number of candidates to be resilient to races with other processes
	const maxCandidates = 64
	for i := 0; i < maxCandidates; i++ {
		name, err := nextFreeTapName("fc-tap")
		if err != nil {
			return "", err
		}
		// Attempt creation; if busy, loop to a new candidate
		if err := nm.createTapInternal(name); err != nil {
			if strings.Contains(err.Error(), "Device or resource busy") {
				// Someone beat us to it. Try another name after a tiny backoff.
				time.Sleep(50 * time.Millisecond)
				continue
			}
			return "", err
		}
		return name, nil
	}
	return "", fmt.Errorf("exhausted candidates while creating TAP device (busy)")
}

// CreateTAPDevice creates a TAP device with the requested name (idempotent-ish with cleanup & retry).
func (nm *NetworkManager) CreateTAPDevice(name string) error {
	tapMu.Lock()
	defer tapMu.Unlock()
	return nm.createTapInternal(name)
}

// Internal: create + attach + up + promisc with one cleanup+retry on busy.
func (nm *NetworkManager) createTapInternal(name string) error {
	// If device exists, try to delete it first
	if tapExists(name) {
		_ = safeDeleteTap(name)
		time.Sleep(150 * time.Millisecond)
	}

	err := execCommand("sudo", "ip", "tuntap", "add", "dev", name, "mode", "tap", "user", "dlo", "group", "dlo")
	if err != nil && strings.Contains(err.Error(), "Device or resource busy") {
		// Last-ditch cleanup + one retry—some processes keep fds briefly
		_ = safeDeleteTap(name)
		time.Sleep(200 * time.Millisecond)
		err = execCommand("sudo", "ip", "tuntap", "add", "dev", name, "mode", "tap", "user", "dlo", "group", "dlo")
	}
	if err != nil {
		return fmt.Errorf("failed to create TAP device: %w", err)
	}

	// Attach to bridge
	if err := execCommand("sudo", "ip", "link", "set", name, "master", nm.bridgeName); err != nil {
		_ = safeDeleteTap(name)
		return fmt.Errorf("failed to connect TAP to bridge: %w", err)
	}

	// Bring up + promisc
	if err := execCommand("sudo", "ip", "link", "set", name, "up"); err != nil {
		return fmt.Errorf("failed to bring up TAP device: %w", err)
	}
	if err := execCommand("sudo", "ip", "link", "set", name, "promisc", "on"); err != nil {
		return fmt.Errorf("failed to set TAP device to promiscuous mode: %w", err)
	}

	return nil
}

// DeleteTAPDevice removes a TAP device
func (nm *NetworkManager) DeleteTAPDevice(name string) error {
	return safeDeleteTap(name)
}

// ------- helpers -------

func tapExists(name string) bool {
	if err := exec.Command("ip", "link", "show", name).Run(); err == nil {
		return true
	}
	// Fallback check via `ip tuntap list`
	taps, _ := listTaps()
	for _, t := range taps {
		if t == name {
			return true
		}
	}
	return false
}

func safeDeleteTap(name string) error {
	_ = execCommand("sudo", "ip", "link", "set", name, "down")
	if err := execCommand("sudo", "ip", "link", "delete", name); err == nil {
		return nil
	}
	return execCommand("sudo", "ip", "tuntap", "del", "dev", name, "mode", "tap")
}

func listTaps() ([]string, error) {
	out, err := exec.Command("ip", "tuntap", "list").CombinedOutput()
	if err != nil {
		// Some distros may not support list; return empty set
		return nil, nil
	}
	var res []string
	sc := bufio.NewScanner(bytes.NewReader(out))
	re := regexp.MustCompile(`^([^\s:]+):`)
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if m := re.FindStringSubmatch(line); len(m) == 2 {
			res = append(res, m[1])
		}
	}
	return res, nil
}

// nextFreeTapName finds the lowest fc-tap-N that doesn't exist (checks link & tuntap list)
func nextFreeTapName(prefix string) (string, error) {
	existing := map[string]struct{}{}

	// ip -o link shows all netdevs
	linkOut, _ := exec.Command("ip", "-o", "link").CombinedOutput()
	sc1 := bufio.NewScanner(bytes.NewReader(linkOut))
	re := regexp.MustCompile(`^\d+:\s*([^:@]+)`)
	for sc1.Scan() {
		line := sc1.Text()
		if m := re.FindStringSubmatch(line); len(m) == 2 {
			existing[m[1]] = struct{}{}
		}
	}

	// also add tuntap list
	if taps, _ := listTaps(); len(taps) > 0 {
		for _, t := range taps {
			existing[t] = struct{}{}
		}
	}

	// search a reasonable window
	const max = 4096
	for i := 0; i < max; i++ {
		name := fmt.Sprintf("%s-%d", prefix, i)
		if _, ok := existing[name]; !ok {
			// double-check with ip link show in case of TOCTOU
			if err := exec.Command("ip", "link", "show", name).Run(); err != nil {
				return name, nil
			}
		}
	}
	return "", fmt.Errorf("no free TAP names available (checked %d candidates)", max)
}

func execCommand(name string, args ...string) error {
	var cmd *exec.Cmd
	if name == "sudo" {
		cmd = exec.Command(name, args...)
		cmd.Env = append(cmd.Env, "SUDO_ASKPASS=/data/code/agentic-design/codesandbox/askpass.sh")
		newArgs := append([]string{"-A"}, args...)
		cmd.Args = append([]string{name}, newArgs...)
	} else {
		cmd = exec.Command(name, args...)
	}
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("command '%s %s' failed: %v - output: %s", name, strings.Join(args, " "), err, strings.TrimSpace(string(output)))
	}
	return nil
}
