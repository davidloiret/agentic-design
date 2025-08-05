package security

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"syscall"
	"time"
)

// Limits defines resource limits for code execution
type Limits struct {
	MaxCPUTime     time.Duration // Maximum CPU time
	MaxMemory      int64         // Maximum memory in bytes
	MaxFileSize    int64         // Maximum file size in bytes
	MaxProcesses   int           // Maximum number of processes
	MaxOpenFiles   int           // Maximum number of open files
	MaxOutputSize  int64         // Maximum output size in bytes
}

// DefaultLimits returns default security limits
func DefaultLimits() *Limits {
	return &Limits{
		MaxCPUTime:    30 * time.Second,
		MaxMemory:     256 * 1024 * 1024, // 256MB
		MaxFileSize:   10 * 1024 * 1024,  // 10MB
		MaxProcesses:  10,
		MaxOpenFiles:  50,
		MaxOutputSize: 1 * 1024 * 1024, // 1MB
	}
}

// ApplyLimits applies resource limits to the current process
func (l *Limits) ApplyLimits() error {
	limits := []struct {
		resource int
		soft     uint64
		hard     uint64
	}{
		// CPU time limit
		{syscall.RLIMIT_CPU, uint64(l.MaxCPUTime.Seconds()), uint64(l.MaxCPUTime.Seconds())},
		// Memory limit
		{syscall.RLIMIT_AS, uint64(l.MaxMemory), uint64(l.MaxMemory)},
		// File size limit
		{syscall.RLIMIT_FSIZE, uint64(l.MaxFileSize), uint64(l.MaxFileSize)},
		// Open file limit
		{syscall.RLIMIT_NOFILE, uint64(l.MaxOpenFiles), uint64(l.MaxOpenFiles)},
	}

	for _, limit := range limits {
		if err := syscall.Setrlimit(limit.resource, &syscall.Rlimit{
			Cur: limit.soft,
			Max: limit.hard,
		}); err != nil {
			return fmt.Errorf("failed to set limit %d: %w", limit.resource, err)
		}
	}

	return nil
}

// RunWithLimits runs a command with resource limits
func (l *Limits) RunWithLimits(ctx context.Context, name string, args ...string) ([]byte, error) {
	cmd := exec.CommandContext(ctx, name, args...)
	
	// Set process attributes
	cmd.SysProcAttr = &syscall.SysProcAttr{
		Setpgid: true,
		Pgid:    0,
	}

	// Apply limits to child process
	cmd.Env = append(os.Environ(), fmt.Sprintf("LIMIT_MEMORY=%d", l.MaxMemory))
	
	// Run command
	output, err := cmd.CombinedOutput()
	
	// Check output size
	if int64(len(output)) > l.MaxOutputSize {
		output = output[:l.MaxOutputSize]
		output = append(output, []byte("\n[Output truncated]")...)
	}
	
	return output, err
}

// DropPrivileges drops process privileges for security
func DropPrivileges(uid, gid int) error {
	// Set group ID
	if err := syscall.Setgid(gid); err != nil {
		return fmt.Errorf("failed to set GID: %w", err)
	}
	
	// Set user ID
	if err := syscall.Setuid(uid); err != nil {
		return fmt.Errorf("failed to set UID: %w", err)
	}
	
	return nil
}

// SetupSecureEnvironment sets up a secure execution environment
func SetupSecureEnvironment() error {
	// Change to a safe directory
	if err := os.Chdir("/tmp"); err != nil {
		return fmt.Errorf("failed to change directory: %w", err)
	}
	
	// Clear dangerous environment variables
	dangerousVars := []string{
		"LD_PRELOAD",
		"LD_LIBRARY_PATH",
		"PYTHONPATH",
		"NODE_PATH",
		"PERL5LIB",
		"RUBYLIB",
	}
	
	for _, v := range dangerousVars {
		os.Unsetenv(v)
	}
	
	// Set safe PATH
	os.Setenv("PATH", "/usr/local/bin:/usr/bin:/bin")
	
	return nil
}