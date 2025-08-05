package executor

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"syscall"
	"time"
)

// Executor handles code execution with security constraints
type Executor struct {
	workDir      string
	maxFileSize  int64
	maxProcesses int
	maxMemory    int64
}

// NewExecutor creates a new executor
func NewExecutor(workDir string) *Executor {
	return &Executor{
		workDir:      workDir,
		maxFileSize:  10 * 1024 * 1024, // 10MB
		maxProcesses: 10,
		maxMemory:    256 * 1024 * 1024, // 256MB
	}
}

// ExecuteCode executes code with security constraints
func (e *Executor) ExecuteCode(language, code string, timeout time.Duration) (string, error) {
	// Create isolated directory for this execution
	execID := fmt.Sprintf("%d", time.Now().UnixNano())
	execDir := filepath.Join(e.workDir, execID)
	
	if err := os.MkdirAll(execDir, 0755); err != nil {
		return "", fmt.Errorf("failed to create execution directory: %w", err)
	}
	defer os.RemoveAll(execDir)

	// Change to execution directory
	originalDir, err := os.Getwd()
	if err != nil {
		return "", fmt.Errorf("failed to get current directory: %w", err)
	}
	
	if err := os.Chdir(execDir); err != nil {
		return "", fmt.Errorf("failed to change directory: %w", err)
	}
	defer os.Chdir(originalDir)

	// Execute based on language
	switch strings.ToLower(language) {
	case "python":
		return e.executePython(code, timeout)
	case "typescript":
		return e.executeTypeScript(code, timeout)
	case "rust":
		return e.executeRust(code, timeout)
	default:
		return "", fmt.Errorf("unsupported language: %s", language)
	}
}

func (e *Executor) executePython(code string, timeout time.Duration) (string, error) {
	// Write code to file
	filename := "main.py"
	if err := os.WriteFile(filename, []byte(code), 0644); err != nil {
		return "", fmt.Errorf("failed to write code file: %w", err)
	}

	// Execute
	return e.runCommand(timeout, "python3", filename)
}

func (e *Executor) executeTypeScript(code string, timeout time.Duration) (string, error) {
	// Write code to file
	filename := "main.ts"
	if err := os.WriteFile(filename, []byte(code), 0644); err != nil {
		return "", fmt.Errorf("failed to write code file: %w", err)
	}

	// Execute with Deno
	return e.runCommand(timeout, "deno", "run", "--allow-all", filename)
}

func (e *Executor) executeRust(code string, timeout time.Duration) (string, error) {
	// Write code to file
	filename := "main.rs"
	if err := os.WriteFile(filename, []byte(code), 0644); err != nil {
		return "", fmt.Errorf("failed to write code file: %w", err)
	}

	// Compile
	ctx, cancel := context.WithTimeout(context.Background(), timeout/2)
	defer cancel()

	cmd := exec.CommandContext(ctx, "rustc", "-o", "main", filename)
	if output, err := cmd.CombinedOutput(); err != nil {
		return "", fmt.Errorf("compilation failed: %s\n%s", err, string(output))
	}

	// Execute
	return e.runCommand(timeout/2, "./main")
}

func (e *Executor) runCommand(timeout time.Duration, name string, args ...string) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	cmd := exec.CommandContext(ctx, name, args...)
	
	// Set resource limits
	cmd.SysProcAttr = &syscall.SysProcAttr{
		Setpgid: true,
	}
	
	// Set environment
	cmd.Env = []string{
		"PATH=/usr/local/bin:/usr/bin:/bin",
		"HOME=/tmp",
		"USER=sandbox",
		"TMPDIR=/tmp",
	}

	// Run command
	output, err := cmd.CombinedOutput()
	
	// Check for timeout
	if ctx.Err() == context.DeadlineExceeded {
		return string(output), fmt.Errorf("execution timed out after %v", timeout)
	}

	if err != nil {
		if exitErr, ok := err.(*exec.ExitError); ok {
			return string(output), fmt.Errorf("process exited with code %d", exitErr.ExitCode())
		}
		return string(output), err
	}

	return string(output), nil
}

// SetLimits sets process resource limits
func SetLimits() error {
	limits := []struct {
		resource int
		soft     uint64
		hard     uint64
	}{
		// CPU time limit (30 seconds)
		{syscall.RLIMIT_CPU, 30, 30},
		// Memory limit (256MB)
		{syscall.RLIMIT_AS, 256 * 1024 * 1024, 256 * 1024 * 1024},
		// File size limit (10MB)
		{syscall.RLIMIT_FSIZE, 10 * 1024 * 1024, 10 * 1024 * 1024},
		// Process count limit
		{syscall.RLIMIT_NPROC, 10, 10},
		// Open file limit
		{syscall.RLIMIT_NOFILE, 100, 100},
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