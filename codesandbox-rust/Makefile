.PHONY: all build build-agent build-api setup-env build-rootfs download-kernel run clean deps test fmt clippy help docker-build install-service

# Variables
CARGO_TARGET_DIR = target/release
AGENT_BINARY = $(CARGO_TARGET_DIR)/agent
API_BINARY = $(CARGO_TARGET_DIR)/api
ROOTFS_PATH = rootfs/rootfs.ext4
KERNEL_PATH = kernel/vmlinux

# Colors for output
GREEN = \033[0;32m
YELLOW = \033[1;33m
RED = \033[0;31m
NC = \033[0m # No Color

all: setup-env build

# Set up the environment
setup-env: download-kernel build-rootfs

# Download Firecracker kernel
download-kernel:
	@echo -e "$(GREEN)Setting up Firecracker kernel...$(NC)"
	@mkdir -p kernel
	@chmod +x ../codesandbox/scripts/setup-kernel.sh
	@cd ../codesandbox && ./scripts/setup-kernel.sh
	@cp ../codesandbox/kernel/vmlinux ./kernel/

# Build rootfs with language runtimes
build-rootfs:
	@echo -e "$(GREEN)Building rootfs...$(NC)"
	@mkdir -p rootfs
	@chmod +x ../codesandbox/scripts/build-rootfs.sh
	@cd ../codesandbox && sudo ./scripts/build-rootfs.sh
	@cp ../codesandbox/rootfs/rootfs.ext4 ./rootfs/

# Install dependencies
deps:
	@echo -e "$(GREEN)Installing Rust dependencies...$(NC)"
	CARGO_HOME=/tmp/cargo cargo check

# Build the agent that runs inside VMs
build-agent: deps
	@echo -e "$(GREEN)Building Rust agent...$(NC)"
	CARGO_HOME=/tmp/cargo cargo build --release --bin agent
	@echo -e "$(GREEN)Copying agent to rootfs...$(NC)"
	@sudo chmod +x ../codesandbox/scripts/copy-agent-to-rootfs.sh
	@sudo AGENT_BINARY=$(AGENT_BINARY) ../codesandbox/scripts/copy-agent-to-rootfs.sh

# Build the main API server
build-api: deps
	@echo -e "$(GREEN)Building Rust API server...$(NC)"
	CARGO_HOME=/tmp/cargo cargo build --release --bin api

# Build everything
build: build-agent build-api

# Run the API server
run: build
	@echo -e "$(GREEN)Starting API server...$(NC)"
	sudo ROOTFS_PATH=$(ROOTFS_PATH) KERNEL_PATH=$(KERNEL_PATH) ./$(API_BINARY)

# Run with custom configuration
run-dev: build
	@echo -e "$(GREEN)Starting API server in development mode...$(NC)"
	sudo ROOTFS_PATH=$(ROOTFS_PATH) \
		KERNEL_PATH=$(KERNEL_PATH) \
		API_PORT=8000 \
		RUST_LOG=debug \
		./$(API_BINARY)

# Clean build artifacts
clean:
	@echo -e "$(GREEN)Cleaning...$(NC)"
	CARGO_HOME=/tmp/cargo cargo clean
	rm -rf rootfs/build

# Run tests
test:
	@echo -e "$(GREEN)Running tests...$(NC)"
	CARGO_HOME=/tmp/cargo cargo test

# Format code
fmt:
	@echo -e "$(GREEN)Formatting code...$(NC)"
	CARGO_HOME=/tmp/cargo cargo fmt

# Run clippy for linting
clippy:
	@echo -e "$(GREEN)Running clippy...$(NC)"
	CARGO_HOME=/tmp/cargo cargo clippy -- -D warnings

# Check if kernel and rootfs exist
check-deps:
	@if [ ! -f $(KERNEL_PATH) ]; then \
		echo -e "$(RED)Error: $(KERNEL_PATH) not found. Please run 'make download-kernel'$(NC)"; \
		exit 1; \
	fi
	@if [ ! -f $(ROOTFS_PATH) ]; then \
		echo -e "$(RED)Error: $(ROOTFS_PATH) not found. Please run 'make build-rootfs'$(NC)"; \
		exit 1; \
	fi

# Run API server (production)
run-api: build check-deps
	@echo -e "$(GREEN)Starting API server...$(NC)"
	./$(API_BINARY)

# Run agent (for testing)
run-agent: build
	@echo -e "$(GREEN)Starting agent...$(NC)"
	./$(AGENT_BINARY)

# Docker build (alternative deployment)
docker-build:
	@echo -e "$(GREEN)Building Docker image...$(NC)"
	docker build -t codesandbox-rust:latest .

# Install systemd service
install-service: build
	@echo -e "$(GREEN)Installing systemd service...$(NC)"
	@sudo cp scripts/codesandbox-rust.service /etc/systemd/system/
	@sudo sed -i 's|/path/to/codesandbox-rust|$(PWD)|g' /etc/systemd/system/codesandbox-rust.service
	@sudo systemctl daemon-reload
	@sudo systemctl enable codesandbox-rust
	@echo -e "$(GREEN)Service installed. Start with: sudo systemctl start codesandbox-rust$(NC)"

# Setup host networking (requires Go codesandbox scripts)
setup-network:
	@echo -e "$(GREEN)Setting up host networking...$(NC)"
	@chmod +x ../codesandbox/scripts/setup-host-network.sh
	@sudo ../codesandbox/scripts/setup-host-network.sh

# Install Firecracker if not present
install-firecracker:
	@if ! command -v firecracker &> /dev/null; then \
		echo -e "$(YELLOW)Installing Firecracker...$(NC)"; \
		wget -O firecracker.tgz https://github.com/firecracker-microvm/firecracker/releases/download/v1.4.0/firecracker-v1.4.0-x86_64.tar.gz; \
		tar -xzf firecracker.tgz; \
		sudo mv release-v1.4.0-x86_64/firecracker-v1.4.0-x86_64 /usr/local/bin/firecracker; \
		chmod +x /usr/local/bin/firecracker; \
		rm -rf firecracker.tgz release-v1.4.0-x86_64; \
		echo -e "$(GREEN)Firecracker installed successfully$(NC)"; \
	else \
		echo -e "$(GREEN)Firecracker already installed$(NC)"; \
	fi

# Quick start - does everything needed to run
quickstart: install-firecracker setup-env setup-network build
	@echo -e "$(GREEN)Quick start complete! Run 'make run' to start the server$(NC)"

# Test the API after starting
test-api:
	@echo -e "$(GREEN)Testing API...$(NC)"
	@chmod +x test-api.sh
	@./test-api.sh

# Development cycle - build and test
dev: clean build test-api

# Show status of all components
status:
	@echo -e "$(GREEN)=== Codesandbox Rust Status ===$(NC)"
	@echo -n "Firecracker: "
	@if command -v firecracker &> /dev/null; then \
		echo -e "$(GREEN)✓ Installed$(NC) ($$(firecracker --version | head -1))"; \
	else \
		echo -e "$(RED)✗ Not installed$(NC)"; \
	fi
	@echo -n "Kernel: "
	@if [ -f $(KERNEL_PATH) ]; then \
		echo -e "$(GREEN)✓ Found$(NC) ($(KERNEL_PATH))"; \
	else \
		echo -e "$(RED)✗ Missing$(NC)"; \
	fi
	@echo -n "Rootfs: "
	@if [ -f $(ROOTFS_PATH) ]; then \
		echo -e "$(GREEN)✓ Found$(NC) ($(ROOTFS_PATH))"; \
	else \
		echo -e "$(RED)✗ Missing$(NC)"; \
	fi
	@echo -n "API Binary: "
	@if [ -f $(API_BINARY) ]; then \
		echo -e "$(GREEN)✓ Built$(NC) ($(API_BINARY))"; \
	else \
		echo -e "$(RED)✗ Not built$(NC)"; \
	fi
	@echo -n "Agent Binary: "
	@if [ -f $(AGENT_BINARY) ]; then \
		echo -e "$(GREEN)✓ Built$(NC) ($(AGENT_BINARY))"; \
	else \
		echo -e "$(RED)✗ Not built$(NC)"; \
	fi
	@echo -n "Network Bridge: "
	@if ip link show fcbridge &> /dev/null; then \
		echo -e "$(GREEN)✓ Ready$(NC)"; \
	else \
		echo -e "$(RED)✗ Not configured$(NC)"; \
	fi

# Help
help:
	@echo -e "$(GREEN)Codesandbox Rust - Available Commands$(NC)"
	@echo ""
	@echo -e "$(YELLOW)Setup Commands:$(NC)"
	@echo "  make quickstart     - Complete setup from scratch"
	@echo "  make setup-env      - Download kernel and build rootfs"
	@echo "  make setup-network  - Configure host networking"
	@echo "  make install-firecracker - Install Firecracker binary"
	@echo ""
	@echo -e "$(YELLOW)Build Commands:$(NC)"
	@echo "  make deps           - Install Rust dependencies"
	@echo "  make build          - Build agent and API server"
	@echo "  make build-agent    - Build agent only"
	@echo "  make build-api      - Build API server only"
	@echo ""
	@echo -e "$(YELLOW)Run Commands:$(NC)"
	@echo "  make run            - Run the API server (production)"
	@echo "  make run-dev        - Run in development mode"
	@echo "  make run-api        - Run API server with checks"
	@echo "  make run-agent      - Run agent standalone"
	@echo ""
	@echo -e "$(YELLOW)Development Commands:$(NC)"
	@echo "  make dev            - Clean, build, and test cycle"
	@echo "  make test           - Run Rust tests"
	@echo "  make test-api       - Test HTTP API endpoints"
	@echo "  make fmt            - Format code"
	@echo "  make clippy         - Run linter"
	@echo ""
	@echo -e "$(YELLOW)Maintenance Commands:$(NC)"
	@echo "  make clean          - Clean build artifacts"
	@echo "  make status         - Show component status"
	@echo "  make install-service - Install systemd service"
	@echo "  make docker-build   - Build Docker image"
	@echo ""
	@echo -e "$(YELLOW)Quick Examples:$(NC)"
	@echo "  make quickstart && make run    # Complete setup and run"
	@echo "  make dev                       # Development cycle"
	@echo "  make status                    # Check what's missing"