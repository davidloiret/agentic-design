package main

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

// ExecuteRequest represents a code execution request
type ExecuteRequest struct {
	Language string `json:"language" binding:"required"`
	Code     string `json:"code" binding:"required"`
	Timeout  int    `json:"timeout"` // in seconds, default 30
}

// ExecuteResponse represents the execution result
type ExecuteResponse struct {
	Success       bool    `json:"success"`
	Output        string  `json:"output,omitempty"`
	Error         string  `json:"error,omitempty"`
	ExecutionTime float64 `json:"execution_time"` // in seconds
}

// LanguageConfig holds configuration for each supported language
type LanguageConfig struct {
	FileExtension string
	RunCommand    []string
	CompileCmd    []string // Optional, for compiled languages
	TempDir       string
}

var languageConfigs = map[string]LanguageConfig{
	"python": {
		FileExtension: ".py",
		RunCommand:    []string{"python3", "%s"},
		TempDir:       "/tmp/python",
	},
	"typescript": {
		FileExtension: ".ts",
		RunCommand:    []string{"deno", "run", "--allow-all", "%s"},
		TempDir:       "/tmp/typescript",
	},
	"rust": {
		FileExtension: ".rs",
		CompileCmd:    []string{"rustc", "-o", "%s", "%s"},
		RunCommand:    []string{"%s"},
		TempDir:       "/tmp/rust",
	},
}

func main() {
	// Set up logging
	log.SetFormatter(&log.JSONFormatter{})
	log.SetOutput(os.Stdout)
	log.SetLevel(log.InfoLevel)

	// Security limits are now handled by the VM/container environment

	// Create temp directories
	for _, config := range languageConfigs {
		if err := os.MkdirAll(config.TempDir, 0755); err != nil {
			log.WithError(err).Fatal("Failed to create temp directory")
		}
	}

	// Set up Gin
	gin.SetMode(gin.ReleaseMode)
	r := gin.New()
	r.Use(gin.Recovery())

	// Routes
	r.GET("/health", healthCheck)
	r.POST("/execute", executeCode)

	// Start server
	port := os.Getenv("AGENT_PORT")
	if port == "" {
		port = "8080"
	}

	log.WithField("port", port).Info("Starting agent server")
	if err := r.Run(":" + port); err != nil {
		log.WithError(err).Fatal("Failed to start server")
	}
}

func healthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": "healthy",
		"time":   time.Now().Unix(),
	})
}

func executeCode(c *gin.Context) {
	var req ExecuteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ExecuteResponse{
			Success: false,
			Error:   fmt.Sprintf("Invalid request: %v", err),
		})
		return
	}

	// Validate language
	langConfig, ok := languageConfigs[strings.ToLower(req.Language)]
	if !ok {
		c.JSON(http.StatusBadRequest, ExecuteResponse{
			Success: false,
			Error:   fmt.Sprintf("Unsupported language: %s", req.Language),
		})
		return
	}

	// Set default timeout
	if req.Timeout <= 0 {
		req.Timeout = 30
	}

	// Execute code
	start := time.Now()
	output, err := runCode(req.Language, req.Code, langConfig, req.Timeout)
	executionTime := time.Since(start).Seconds()

	if err != nil {
		log.WithError(err).WithField("language", req.Language).Error("Code execution failed")
		c.JSON(http.StatusOK, ExecuteResponse{
			Success:       false,
			Error:         err.Error(),
			ExecutionTime: executionTime,
		})
		return
	}

	c.JSON(http.StatusOK, ExecuteResponse{
		Success:       true,
		Output:        output,
		ExecutionTime: executionTime,
	})
}

func runCode(language, code string, config LanguageConfig, timeout int) (string, error) {
	// Create temporary file
	tempFile := filepath.Join(config.TempDir, fmt.Sprintf("code_%d%s", time.Now().UnixNano(), config.FileExtension))
	
	// Write code to file
	if err := os.WriteFile(tempFile, []byte(code), 0644); err != nil {
		return "", fmt.Errorf("failed to write code file: %w", err)
	}
	defer os.Remove(tempFile)

	// For compiled languages, compile first
	var executablePath string
	if len(config.CompileCmd) > 0 {
		executablePath = strings.TrimSuffix(tempFile, config.FileExtension)
		compileCmd := make([]string, len(config.CompileCmd))
		for i, arg := range config.CompileCmd {
			compileCmd[i] = strings.ReplaceAll(arg, "%s", tempFile)
			if i > 0 && config.CompileCmd[i-1] == "-o" {
				compileCmd[i] = executablePath
			}
		}

		ctx, cancel := context.WithTimeout(context.Background(), time.Duration(timeout)*time.Second)
		defer cancel()

		cmd := exec.CommandContext(ctx, compileCmd[0], compileCmd[1:]...)
		var compileOut bytes.Buffer
		cmd.Stdout = &compileOut
		cmd.Stderr = &compileOut
		
		// Set Rust environment if needed
		if language == "rust" {
			cmd.Env = append(os.Environ(),
				"PATH=/root/.cargo/bin:/root/.rustup/toolchains/stable-x86_64-unknown-linux-musl/bin:"+os.Getenv("PATH"),
				"RUSTUP_HOME=/root/.rustup",
				"CARGO_HOME=/root/.cargo",
			)
		}

		if err := cmd.Run(); err != nil {
			return "", fmt.Errorf("compilation failed: %s\n%s", err, compileOut.String())
		}
		defer os.Remove(executablePath)
	} else {
		executablePath = tempFile
	}

	// Run the code
	runCmd := make([]string, len(config.RunCommand))
	for i, arg := range config.RunCommand {
		runCmd[i] = strings.ReplaceAll(arg, "%s", executablePath)
	}

	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(timeout)*time.Second)
	defer cancel()

	cmd := exec.CommandContext(ctx, runCmd[0], runCmd[1:]...)
	
	// Set Rust environment if needed (also for execution)
	if language == "rust" {
		cmd.Env = append(os.Environ(),
			"PATH=/root/.cargo/bin:/root/.rustup/toolchains/stable-x86_64-unknown-linux-musl/bin:"+os.Getenv("PATH"),
			"RUSTUP_HOME=/root/.rustup",
			"CARGO_HOME=/root/.cargo",
		)
	}
	
	// Set up pipes for stdout and stderr
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return "", fmt.Errorf("failed to create stdout pipe: %w", err)
	}
	stderr, err := cmd.StderrPipe()
	if err != nil {
		return "", fmt.Errorf("failed to create stderr pipe: %w", err)
	}

	// Start the command
	if err := cmd.Start(); err != nil {
		return "", fmt.Errorf("failed to start command: %w", err)
	}

	// Read output
	var outBuf, errBuf bytes.Buffer
	outputDone := make(chan error, 2)

	go func() {
		_, err := io.Copy(&outBuf, stdout)
		outputDone <- err
	}()

	go func() {
		_, err := io.Copy(&errBuf, stderr)
		outputDone <- err
	}()

	// Wait for command to complete
	cmdErr := cmd.Wait()
	
	// Wait for output to be fully read
	for i := 0; i < 2; i++ {
		<-outputDone
	}

	// Combine stdout and stderr
	output := outBuf.String()
	if errBuf.Len() > 0 {
		if output != "" {
			output += "\n"
		}
		output += errBuf.String()
	}

	// Check for timeout
	if ctx.Err() == context.DeadlineExceeded {
		return output, fmt.Errorf("execution timed out after %d seconds", timeout)
	}

	if cmdErr != nil {
		if exitErr, ok := cmdErr.(*exec.ExitError); ok {
			return output, fmt.Errorf("process exited with code %d", exitErr.ExitCode())
		}
		return output, cmdErr
	}

	return output, nil
}