.PHONY: all build build-agent build-api setup-env build-rootfs download-kernel run clean

# Variables
AGENT_BINARY = cmd/agent/agent
API_BINARY = cmd/api/api
ROOTFS_PATH = rootfs/rootfs.ext4
KERNEL_PATH = kernel/vmlinux

all: setup-env build

# Set up the environment
setup-env: download-kernel build-rootfs

# Download Firecracker kernel
download-kernel:
	@echo "Setting up Firecracker kernel..."
	@chmod +x scripts/setup-kernel.sh
	@./scripts/setup-kernel.sh

# Build rootfs with language runtimes
build-rootfs:
	@echo "Building rootfs..."
	@chmod +x scripts/build-rootfs.sh
	@sudo ./scripts/build-rootfs.sh

# Build the agent that runs inside VMs
build-agent:
	@echo "Building agent..."
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o $(AGENT_BINARY) ./cmd/agent
	@echo "Copying agent to rootfs..."
	@sudo ./scripts/copy-agent-to-rootfs.sh

# Build the main API server
build-api:
	@echo "Building API server..."
	go build -o $(API_BINARY) ./cmd/api

# Build everything
build: build-agent build-api

# Run the API server
run: build
	@echo "Starting API server..."
	sudo ROOTFS_PATH=$(ROOTFS_PATH) KERNEL_PATH=$(KERNEL_PATH) ./$(API_BINARY)

# Run with custom configuration
run-dev: build
	@echo "Starting API server in development mode..."
	sudo ROOTFS_PATH=$(ROOTFS_PATH) \
		KERNEL_PATH=$(KERNEL_PATH) \
		API_PORT=8000 \
		GIN_MODE=debug \
		./$(API_BINARY)

# Clean build artifacts
clean:
	@echo "Cleaning..."
	rm -f $(AGENT_BINARY) $(API_BINARY)
	rm -rf rootfs/build

# Install dependencies
deps:
	@echo "Installing dependencies..."
	go mod download
	go mod tidy

# Run tests
test:
	@echo "Running tests..."
	go test -v ./...

# Format code
fmt:
	@echo "Formatting code..."
	go fmt ./...

# Lint code
lint:
	@echo "Linting code..."
	golangci-lint run

# Docker build (alternative deployment)
docker-build:
	@echo "Building Docker image..."
	docker build -t codesandbox:latest .

# Help
help:
	@echo "Available targets:"
	@echo "  make all          - Set up environment and build everything"
	@echo "  make setup-env    - Download kernel and build rootfs"
	@echo "  make build        - Build agent and API server"
	@echo "  make run          - Run the API server"
	@echo "  make run-dev      - Run in development mode"
	@echo "  make clean        - Clean build artifacts"
	@echo "  make deps         - Install Go dependencies"
	@echo "  make test         - Run tests"
	@echo "  make docker-build - Build Docker image"