package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/agentic-design/codesandbox/pkg/firecracker"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

// Config holds the API server configuration
type Config struct {
	Port          string
	VMPoolSize    int
	RootfsPath    string
	KernelPath    string
	MemSizeMib    int64
	CPUCount      int64
	NetworkPrefix string
}

// Server represents the API server
type Server struct {
	config    *Config
	vmManager *firecracker.Manager
	router    *gin.Engine
}

// ExecuteRequest represents a code execution request
type ExecuteRequest struct {
	Language string `json:"language" binding:"required"`
	Code     string `json:"code" binding:"required"`
	Timeout  int    `json:"timeout"` // in seconds, default 30
}

// ExecuteResponse represents the execution result
type ExecuteResponse struct {
	RequestID     string  `json:"request_id"`
	Success       bool    `json:"success"`
	Output        string  `json:"output,omitempty"`
	Error         string  `json:"error,omitempty"`
	ExecutionTime float64 `json:"execution_time"` // in seconds
}

func main() {
	// Set up logging
	log.SetFormatter(&log.JSONFormatter{})
	log.SetOutput(os.Stdout)
	log.SetLevel(log.InfoLevel)

	// Load configuration
	config := loadConfig()

	// Create server
	server, err := NewServer(config)
	if err != nil {
		log.WithError(err).Fatal("Failed to create server")
	}

	// Start server
	log.WithField("port", config.Port).Info("Starting API server")
	if err := server.Start(); err != nil {
		log.WithError(err).Fatal("Failed to start server")
	}
}

func loadConfig() *Config {
	config := &Config{
		Port:          getEnvOrDefault("API_PORT", "8000"),
		VMPoolSize:    3,
		RootfsPath:    getEnvOrDefault("ROOTFS_PATH", "./rootfs/rootfs.ext4"),
		KernelPath:    getEnvOrDefault("KERNEL_PATH", "./kernel/vmlinux"),
		MemSizeMib:    8192,
		CPUCount:      4,
		NetworkPrefix: "172.16.0",
	}

	return config
}

func getEnvOrDefault(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

// NewServer creates a new API server
func NewServer(config *Config) (*Server, error) {
	// Create VM manager
	managerConfig := &firecracker.ManagerConfig{
		PoolSize:      config.VMPoolSize,
		RootfsPath:    config.RootfsPath,
		KernelPath:    config.KernelPath,
		MemSizeMib:    config.MemSizeMib,
		CPUCount:      config.CPUCount,
		NetworkPrefix: config.NetworkPrefix,
	}

	vmManager, err := firecracker.NewManager(managerConfig)
	if err != nil {
		return nil, fmt.Errorf("failed to create VM manager: %w", err)
	}

	server := &Server{
		config:    config,
		vmManager: vmManager,
	}

	// Set up routes
	server.setupRoutes()

	return server, nil
}

// runInGuest executes a shell command inside the guest by calling the agent's
// existing /execute endpoint with a small Python wrapper that shells out.
func runInGuest(vm *firecracker.VM, argv []string) (string, error) {
	// Join argv into a single shell command (e.g., "sh -lc '<cmd>'")
	cmd := strings.Join(argv, " ")

	py := fmt.Sprintf(`
import subprocess, sys
p = subprocess.run(%q, shell=True, capture_output=True, text=True)
# Stream stdout, then stderr; exit with the real return code
sys.stdout.write(p.stdout)
sys.stdout.flush()
sys.stderr.write(p.stderr)
sys.stderr.flush()
sys.exit(p.returncode)
`, cmd)

	req := ExecuteRequest{
		Language: "python",
		Code:     py,
		Timeout:  10, // tweak as needed
	}

	// Call the agent the same way executeInVM does
	body, err := json.Marshal(req)
	if err != nil {
		return "", fmt.Errorf("marshal request: %w", err)
	}

	agentURL := fmt.Sprintf("http://%s:8080/execute", vm.IPAddr)
	httpReq, err := http.NewRequestWithContext(context.Background(), "POST", agentURL, bytes.NewReader(body))
	if err != nil {
		return "", fmt.Errorf("create request: %w", err)
	}
	httpReq.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 15 * time.Second}
	resp, err := client.Do(httpReq)
	if err != nil {
		return "", fmt.Errorf("agent request failed: %w", err)
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("read response: %w", err)
	}

	var res ExecuteResponse
	if err := json.Unmarshal(respBody, &res); err != nil {
		return "", fmt.Errorf("parse response: %w", err)
	}

	if !res.Success {
		// include any partial output to help debugging
		return "", fmt.Errorf("guest command failed: %s (output: %s)", res.Error, res.Output)
	}
	return res.Output, nil
}

func (s *Server) setupRoutes() {
	gin.SetMode(gin.ReleaseMode)
	s.router = gin.New()
	s.router.Use(gin.Recovery())
	s.router.Use(corsMiddleware())

	// Routes
	s.router.GET("/health", s.healthCheck)
	s.router.POST("/execute", s.executeCode)
	s.router.GET("/languages", s.getSupportedLanguages)

	s.router.GET("/debug/guest", func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

    vm, err := s.vmManager.GetVM(ctx)
    if err != nil { c.JSON(503, gin.H{"error": err.Error()}); return }

    out, err := runInGuest(vm, []string{"sh", "-lc", "nproc && grep -m1 MemTotal /proc/meminfo && cat /proc/cmdline"})
    if err != nil { c.JSON(500, gin.H{"error": err.Error()}); return }
    c.String(200, out)
	})
}

// Start starts the API server
func (s *Server) Start() error {
	return s.router.Run(":" + s.config.Port)
}

// Stop stops the API server and cleans up resources
func (s *Server) Stop() {
	s.vmManager.Cleanup()
}

func (s *Server) healthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": "healthy",
		"time":   time.Now().Unix(),
	})
}

func (s *Server) getSupportedLanguages(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"languages": []string{"python", "typescript", "rust"},
	})
}

func (s *Server) executeCode(c *gin.Context) {
	requestID := uuid.New().String()
	start := time.Now()

	var req ExecuteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ExecuteResponse{
			RequestID: requestID,
			Success:   false,
			Error:     fmt.Sprintf("Invalid request: %v", err),
		})
		return
	}

	// Validate language
	if !isValidLanguage(req.Language) {
		c.JSON(http.StatusBadRequest, ExecuteResponse{
			RequestID: requestID,
			Success:   false,
			Error:     fmt.Sprintf("Unsupported language: %s", req.Language),
		})
		return
	}

	// Set default timeout
	if req.Timeout <= 0 {
		req.Timeout = 30
	}

	// Get a VM from the pool
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	vm, err := s.vmManager.GetVM(ctx)
	if err != nil {
		log.WithError(err).Error("Failed to get VM from pool")
		c.JSON(http.StatusServiceUnavailable, ExecuteResponse{
			RequestID: requestID,
			Success:   false,
			Error:     "No available VMs",
		})
		return
	}
	defer s.vmManager.ReturnVM(vm)

	// Execute code in the VM
	result, err := s.executeInVM(vm, req)
	executionTime := time.Since(start).Seconds()

	if err != nil {
		log.WithError(err).WithFields(log.Fields{
			"request_id": requestID,
			"language":   req.Language,
		}).Error("Code execution failed")

		c.JSON(http.StatusOK, ExecuteResponse{
			RequestID:     requestID,
			Success:       false,
			Error:         err.Error(),
			ExecutionTime: executionTime,
		})
		return
	}

	result.RequestID = requestID
	result.ExecutionTime = executionTime
	c.JSON(http.StatusOK, result)
}

func (s *Server) executeInVM(vm *firecracker.VM, req ExecuteRequest) (*ExecuteResponse, error) {
	// Prepare request to agent
	agentURL := fmt.Sprintf("http://%s:8080/execute", vm.IPAddr)
	
	reqBody, err := json.Marshal(req)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request: %w", err)
	}

	// Create HTTP request with timeout
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(req.Timeout+5)*time.Second)
	defer cancel()

	httpReq, err := http.NewRequestWithContext(ctx, "POST", agentURL, bytes.NewReader(reqBody))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	httpReq.Header.Set("Content-Type", "application/json")

	// Send request to agent
	client := &http.Client{
		Timeout: time.Duration(req.Timeout+5) * time.Second,
	}
	
	resp, err := client.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("failed to execute request: %w", err)
	}
	defer resp.Body.Close()

	// Read response
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response: %w", err)
	}

	// Parse response
	var result ExecuteResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	return &result, nil
}

func isValidLanguage(lang string) bool {
	switch lang {
	case "python", "typescript", "rust":
		return true
	default:
		return false
	}
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}