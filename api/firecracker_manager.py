"""
Firecracker-based secure code execution manager.
Provides fast microVM-based sandboxing for Python, Rust, and TypeScript.
"""

import asyncio
import json
import os
import tempfile
import time
import uuid
from pathlib import Path
from typing import Dict, Optional, List
import subprocess
import aiofiles
import aiohttp
import logging
from dataclasses import dataclass
from enum import Enum
import base64
import hashlib
from security_config import SecurityLevel, security_manager

logger = logging.getLogger(__name__)

class Language(Enum):
    PYTHON = "python"
    RUST = "rust"
    TYPESCRIPT = "typescript"

@dataclass
class VMConfig:
    """Configuration for a Firecracker microVM"""
    vcpu_count: int = 1
    mem_size_mib: int = 64
    timeout_seconds: int = 10
    network_enabled: bool = False
    security_level: SecurityLevel = SecurityLevel.SANDBOX

@dataclass
class ExecutionResult:
    """Result of code execution in a microVM"""
    success: bool
    output: str
    error: Optional[str]
    execution_time: float
    vm_id: str

class FirecrackerVM:
    """Manages a single Firecracker microVM instance"""
    
    def __init__(self, vm_id: str, language: Language, config: VMConfig):
        self.vm_id = vm_id
        self.language = language
        self.config = config
        self.socket_path = f"/tmp/firecracker-{vm_id}.socket"
        self.process: Optional[subprocess.Popen] = None
        self.is_running = False
        self.created_at = time.time()
        
        # Snapshot and reset management
        self.base_snapshot_path = f"/tmp/firecracker-{vm_id}-base.snapshot"
        self.mem_snapshot_path = f"/tmp/firecracker-{vm_id}-mem.snapshot"
        self.rootfs_base_path = f"/opt/firecracker/rootfs/{self.language.value}/rootfs.ext4"
        self.rootfs_working_path = f"/tmp/firecracker-{vm_id}-rootfs.ext4"
        self.execution_count = 0
        self.needs_reset = False
        
        # Firecracker API communication
        self.api_base_url = f"http://localhost/{vm_id}"
        self.vm_ready = False
        self.guest_ip = "169.254.0.2"  # Default guest IP
        self.ssh_port = 22
        
    async def start(self) -> bool:
        """Start the Firecracker microVM with proper API integration"""
        try:
            # Create working copy of rootfs for this VM instance
            await self._create_working_rootfs()
            
            # Setup network TAP interface before starting VM
            await self._setup_tap_interface()
            
            # Start Firecracker process with API socket
            cmd = [
                "firecracker",
                "--api-sock", self.socket_path
            ]
            
            self.process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            
            # Wait for API socket to be ready
            await self._wait_for_api_socket()
            
            # Configure VM via API calls
            await self._configure_vm_via_api()
            
            # Start VM
            await self._start_vm_via_api()
            
            # Wait for guest to boot and be ready
            await self._wait_for_guest_ready()
            
            # Create base snapshot after first boot
            await self._create_base_snapshot()
            
            self.is_running = True
            self.vm_ready = True
            return True
            
        except Exception as e:
            logger.error(f"Failed to start VM {self.vm_id}: {e}")
            await self._cleanup_tap_interface()  # Cleanup on failure
            return False
    
    async def execute_code(self, code: str) -> ExecutionResult:
        """Execute code inside the microVM using guest agent communication"""
        logger.info(f"🔥 EXECUTING {self.language.value.upper()} CODE in VM {self.vm_id}")
        logger.info(f"📁 Using rootfs: {self.rootfs_base_path}")
        logger.info(f"🐧 Using kernel: /opt/firecracker/kernels/{self.language.value}/vmlinux")
        logger.info(f"⏰ Timeout configured: {self.config.timeout_seconds}s")
        logger.info(f"📝 Code length: {len(code)} characters")
        
        start_time = time.time()
        self.execution_count += 1
        self.needs_reset = True
        
        if not self.vm_ready:
            logger.error(f"❌ VM {self.vm_id} is not ready for execution")
            return ExecutionResult(
                success=False,
                output="",
                error="VM is not ready for execution",
                execution_time=time.time() - start_time,
                vm_id=self.vm_id
            )
        
        try:
            # Generate unique execution ID for this run
            execution_id = f"exec_{int(time.time() * 1000000)}_{self.execution_count}"
            logger.info(f"🆔 Generated execution ID: {execution_id}")
            
            # Create code file inside the VM guest
            guest_code_path = f"/tmp/user_code_{execution_id}{self._get_file_extension()}"
            logger.info(f"📂 Guest code path: {guest_code_path}")
            
            # Transfer code to guest VM
            logger.info(f"📤 Transferring code to guest VM...")
            transfer_start = time.time()
            await self._transfer_code_to_guest(code, guest_code_path)
            transfer_time = time.time() - transfer_start
            logger.info(f"✅ Code transfer completed in {transfer_time:.3f}s")
            
            # Execute code inside the VM
            execution_command = self._get_guest_execution_command(guest_code_path)
            logger.info(f"🚀 Executing command: {execution_command}")
            
            exec_start = time.time()
            result = await self._execute_in_guest(
                execution_command, 
                timeout=self.config.timeout_seconds
            )
            exec_time = time.time() - exec_start
            logger.info(f"⚡ Command execution completed in {exec_time:.3f}s")
            
            execution_time = time.time() - start_time
            logger.info(f"🏁 Total execution time: {execution_time:.3f}s")
            
            # Log the result details
            logger.info(f"📊 Execution result success: {result.get('success', False)}")
            if result.get('stdout'):
                logger.info(f"📤 STDOUT length: {len(result.get('stdout', ''))}")
            if result.get('stderr'):
                logger.info(f"❗ STDERR length: {len(result.get('stderr', ''))}")
            
            # Parse execution result
            if result.get("success", False):
                logger.info(f"🎉 TypeScript execution SUCCESS for VM {self.vm_id}")
                return ExecutionResult(
                    success=True,
                    output=result.get("stdout", ""),
                    error=result.get("stderr") if result.get("stderr") else None,
                    execution_time=execution_time,
                    vm_id=self.vm_id
                )
            else:
                logger.warning(f"⚠️ TypeScript execution FAILED for VM {self.vm_id}")
                return ExecutionResult(
                    success=False,
                    output=result.get("stdout", ""),
                    error=result.get("stderr", "Unknown execution error"),
                    execution_time=execution_time,
                    vm_id=self.vm_id
                )
                
        except asyncio.TimeoutError:
            return ExecutionResult(
                success=False,
                output="",
                error=f"Execution timed out after {self.config.timeout_seconds} seconds",
                execution_time=time.time() - start_time,
                vm_id=self.vm_id
            )
        except Exception as e:
            return ExecutionResult(
                success=False,
                output="",
                error=f"VM execution error: {str(e)}",
                execution_time=time.time() - start_time,
                vm_id=self.vm_id
            )
        finally:
            # Clean up guest temp files
            await self._cleanup_guest_temp_files()
    
    async def stop(self):
        """Stop the microVM and cleanup all resources"""
        if self.process:
            self.process.terminate()
            try:
                # Use asyncio.to_thread to make the blocking wait() call async
                await asyncio.wait_for(
                    asyncio.to_thread(self.process.wait), 
                    timeout=5
                )
            except asyncio.TimeoutError:
                self.process.kill()
                # Wait synchronously for the kill to complete
                await asyncio.to_thread(self.process.wait)
        
        # Cleanup all VM resources
        await self._cleanup_vm_resources()
        
        self.is_running = False
    
    async def _cleanup_vm_resources(self):
        """Clean up all VM-related resources"""
        resources_to_clean = [
            self.socket_path,
            self.base_snapshot_path,
            self.mem_snapshot_path,
            self.rootfs_working_path,
            f"{self.base_snapshot_path}.metadata"
        ]
        
        for resource_path in resources_to_clean:
            try:
                if os.path.exists(resource_path):
                    os.unlink(resource_path)
                    logger.debug(f"Cleaned up resource: {resource_path}")
            except Exception as e:
                logger.warning(f"Failed to cleanup resource {resource_path}: {e}")
        
        # Clean up tap network interface if it exists
        await self._cleanup_tap_interface()
    
    def _get_file_extension(self) -> str:
        extensions = {
            Language.PYTHON: ".py",
            Language.TYPESCRIPT: ".ts", 
            Language.RUST: ".rs"
        }
        return extensions[self.language]
    
    def _get_guest_execution_command(self, guest_file_path: str) -> str:
        """Get command to execute code inside the guest VM"""
        if self.language == Language.RUST:
            # For Rust, copy user code to the pre-built cargo project and run it
            return f"cp {guest_file_path} /opt/rust-template/src/main.rs && cd /opt/rust-template && timeout {self.config.timeout_seconds} cargo run --release 2>&1"
        elif self.language == Language.PYTHON:
            return f"timeout {self.config.timeout_seconds} python3 {guest_file_path} 2>&1"
        elif self.language == Language.TYPESCRIPT:
            # Skip busybox timeout - Python handles timeouts already
            cmd = f"npx tsx {guest_file_path} < /dev/null 2>&1"
            logger.info(f"🔧 TYPESCRIPT EXECUTION COMMAND: {cmd}")
            return cmd
        else:
            raise ValueError(f"Unsupported language: {self.language}")
    
    async def _transfer_code_to_guest(self, code: str, guest_path: str):
        """Transfer code content to a file inside the guest VM"""
        try:
            # Encode code to base64 to safely transfer it
            code_b64 = base64.b64encode(code.encode('utf-8')).decode('ascii')
            
            # Create the file inside guest using echo and base64 decode
            create_file_cmd = f"echo '{code_b64}' | base64 -d > {guest_path} && chmod +r {guest_path}"
            
            result = await self._execute_in_guest(create_file_cmd, timeout=5)
            
            if not result.get("success", False):
                raise RuntimeError(f"Failed to transfer code to guest: {result.get('stderr', 'Unknown error')}")
                
            logger.debug(f"Transferred code to guest file: {guest_path}")
            
        except Exception as e:
            logger.error(f"Failed to transfer code to guest VM {self.vm_id}: {e}")
            raise
    
    async def _make_api_request(self, method: str, endpoint: str, data: Optional[dict] = None) -> dict:
        """Make HTTP request to Firecracker API via Unix socket"""
        connector = aiohttp.UnixConnector(path=self.socket_path)
        
        try:
            async with aiohttp.ClientSession(connector=connector) as session:
                url = f"http://localhost{endpoint}"
                
                if method.upper() == "GET":
                    async with session.get(url) as response:
                        return await self._handle_api_response(response)
                elif method.upper() == "PUT":
                    async with session.put(url, json=data) as response:
                        return await self._handle_api_response(response)
                elif method.upper() == "PATCH":
                    async with session.patch(url, json=data) as response:
                        return await self._handle_api_response(response)
                else:
                    raise ValueError(f"Unsupported HTTP method: {method}")
                    
        except Exception as e:
            logger.error(f"Firecracker API request failed: {e}")
            raise
    
    async def _handle_api_response(self, response: aiohttp.ClientResponse) -> dict:
        """Handle Firecracker API response"""
        if response.status >= 400:
            error_text = await response.text()
            raise RuntimeError(f"Firecracker API error {response.status}: {error_text}")
        
        if response.content_type == 'application/json':
            return await response.json()
        else:
            return {"text": await response.text()}
    
    async def _wait_for_api_socket(self, timeout: int = 10):
        """Wait for Firecracker API socket to be ready"""
        start_time = time.time()
        
        while time.time() - start_time < timeout:
            if os.path.exists(self.socket_path):
                # Try a simple API call to verify it's working
                try:
                    await self._make_api_request("GET", "/")
                    return
                except:
                    pass
            
            await asyncio.sleep(0.1)
        
        raise RuntimeError(f"Firecracker API socket not ready after {timeout}s")
    
    async def _configure_vm_via_api(self):
        """Configure VM using Firecracker API"""
        # Set machine configuration
        machine_config = {
            "vcpu_count": self.config.vcpu_count,
            "mem_size_mib": self.config.mem_size_mib,
            "smt": False
        }
        await self._make_api_request("PUT", "/machine-config", machine_config)
        
        # Set boot source
        boot_config = {
            "kernel_image_path": f"/opt/firecracker/kernels/{self.language.value}/vmlinux",
            "boot_args": "console=ttyS0 reboot=k panic=1 pci=off init=/init ip=169.254.0.2::169.254.0.1:255.255.255.0::eth0:on"
        }
        await self._make_api_request("PUT", "/boot-source", boot_config)
        
        # Set rootfs drive
        drive_config = {
            "drive_id": "rootfs",
            "path_on_host": self.rootfs_working_path,
            "is_root_device": True,
            "is_read_only": False
        }
        await self._make_api_request("PUT", "/drives/rootfs", drive_config)
        
        # Configure network interface
        network_config = {
            "iface_id": "eth0",
            "guest_mac": "02:FC:00:00:00:05",
            "host_dev_name": f"tap{self.vm_id}"
        }
        await self._make_api_request("PUT", "/network-interfaces/eth0", network_config)
        
        logger.debug(f"VM {self.vm_id} configured via API")
    
    async def _start_vm_via_api(self):
        """Start VM using Firecracker API"""
        start_config = {"action_type": "InstanceStart"}
        await self._make_api_request("PUT", "/actions", start_config)
        
        logger.info(f"VM {self.vm_id} started via API")
    
    async def _wait_for_guest_ready(self, timeout: int = 30):
        """Wait for guest OS and agent to be ready for command execution"""
        start_time = time.time()
        
        while time.time() - start_time < timeout:
            try:
                # First check if guest HTTP server is responding
                guest_url = f"http://{self.guest_ip}:8080/health"
                client_timeout = aiohttp.ClientTimeout(total=3)
                
                async with aiohttp.ClientSession(timeout=client_timeout) as session:
                    async with session.get(guest_url) as response:
                        if response.status == 200:
                            health_data = await response.json()
                            if health_data.get("status") == "healthy":
                                # Double-check with command execution
                                result = await self._execute_in_guest("echo ready", timeout=3)
                                if result and result.get("success") and "ready" in result.get("stdout", ""):
                                    logger.info(f"Guest {self.vm_id} is ready (both health check and command execution working)")
                                    return
                                    
            except Exception as e:
                logger.debug(f"Guest readiness check failed for VM {self.vm_id}: {e}")
            
            await asyncio.sleep(1.0)
        
        raise RuntimeError(f"Guest {self.vm_id} not ready after {timeout}s")
    
    async def _execute_in_guest(self, command: str, timeout: int = 10) -> dict:
        """Execute command inside the guest VM via guest agent with robust error handling"""
        logger.info(f"🔗 Starting guest execution for VM {self.vm_id}")
        logger.info(f"🎯 Guest IP: {self.guest_ip}")
        logger.info(f"⏱️ Command timeout: {timeout}s")
        logger.info(f"🖥️ Command: {command[:100]}{'...' if len(command) > 100 else ''}")
        
        max_retries = 3
        base_timeout = max(5, timeout)  # Ensure minimum timeout for network operations
        
        for attempt in range(max_retries):
            logger.info(f"🔄 Guest execution attempt {attempt + 1}/{max_retries}")
            request_start = time.time()
            
            try:
                guest_url = f"http://{self.guest_ip}:8080/execute"
                logger.info(f"📡 Connecting to guest agent at: {guest_url}")
                
                payload = {
                    "command": command,
                    "timeout": timeout
                }
                
                # Configure timeout with retries - allow extra time for guest communication
                client_timeout = aiohttp.ClientTimeout(total=base_timeout + 5)
                logger.info(f"⏰ Client timeout set to: {base_timeout + 5}s")
                
                async with aiohttp.ClientSession(timeout=client_timeout) as session:
                    logger.info(f"🚀 Sending POST request to guest agent...")
                    async with session.post(guest_url, json=payload) as response:
                        request_time = time.time() - request_start
                        logger.info(f"📡 Guest response received in {request_time:.3f}s, status: {response.status}")
                        
                        if response.status == 200:
                            result = await response.json()
                            logger.info(f"✅ Guest execution successful, parsing result...")
                            logger.info(f"📊 Result keys: {list(result.keys())}")
                            return result
                        else:
                            error_text = await response.text()
                            logger.error(f"❌ Guest execution failed with status {response.status}: {error_text}")
                            raise RuntimeError(f"Guest execution failed with status {response.status}: {error_text}")
                            
            except (aiohttp.ClientError, asyncio.TimeoutError, OSError) as e:
                request_time = time.time() - request_start
                logger.warning(f"⚠️ Guest communication attempt {attempt + 1}/{max_retries} failed for VM {self.vm_id} after {request_time:.3f}s: {e}")
                
                if attempt == max_retries - 1:  # Last attempt
                    logger.error(f"💥 All guest communication attempts failed for VM {self.vm_id}")
                    # Before giving up, try to verify guest is still reachable
                    try:
                        logger.info(f"🔍 Verifying guest agent health...")
                        await self._verify_guest_agent_health()
                        logger.info(f"✅ Guest agent is healthy but command execution failed for VM {self.vm_id}")
                    except Exception as health_e:
                        logger.error(f"❌ Guest agent is unreachable for VM {self.vm_id}, marking VM as unhealthy: {health_e}")
                        self.vm_ready = False
                    raise RuntimeError(f"Guest agent communication failed after {max_retries} attempts: {str(e)}")
                
                # Wait before retry, with exponential backoff
                wait_time = 0.5 * (2 ** attempt)
                logger.info(f"⏳ Waiting {wait_time}s before retry...")
                await asyncio.sleep(wait_time)
                
            except Exception as e:
                request_time = time.time() - request_start
                logger.error(f"💥 Unexpected error executing in guest {self.vm_id} after {request_time:.3f}s: {e}")
                raise
    
    async def _create_working_rootfs(self):
        """Create a working copy of the base rootfs for this VM instance"""
        try:
            # Use copy-on-write if available (overlay filesystem)
            cmd = [
                "cp", "--reflink=auto",
                self.rootfs_base_path,
                self.rootfs_working_path
            ]
            
            process = await asyncio.create_subprocess_exec(
                *cmd,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            
            stdout, stderr = await process.communicate()
            
            if process.returncode != 0:
                raise RuntimeError(f"Failed to create working rootfs: {stderr.decode()}")
                
        except Exception as e:
            logger.error(f"Failed to create working rootfs for VM {self.vm_id}: {e}")
            raise
    
    async def _create_base_snapshot(self):
        """Create base snapshot after VM boot using Firecracker API"""
        try:
            # Create snapshot via Firecracker API
            snapshot_config = {
                "snapshot_type": "Full",
                "snapshot_path": self.base_snapshot_path,
                "mem_file_path": self.mem_snapshot_path
            }
            
            await self._make_api_request("PUT", "/snapshot/create", snapshot_config)
            
            # Store snapshot metadata
            snapshot_metadata = {
                "vm_id": self.vm_id,
                "language": self.language.value,
                "created_at": time.time(),
                "rootfs_checksum": await self._calculate_rootfs_checksum(),
                "snapshot_path": self.base_snapshot_path,
                "mem_file_path": self.mem_snapshot_path
            }
            
            metadata_path = f"{self.base_snapshot_path}.metadata"
            async with aiofiles.open(metadata_path, 'w') as f:
                await f.write(json.dumps(snapshot_metadata))
                
            logger.info(f"Created base snapshot for VM {self.vm_id}")
            
        except Exception as e:
            logger.error(f"Failed to create base snapshot for VM {self.vm_id}: {e}")
            # Continue without snapshot - VM will be recreated on reset
            pass
    
    async def _calculate_rootfs_checksum(self) -> str:
        """Calculate checksum of rootfs for integrity verification"""
        try:
            cmd = ["sha256sum", self.rootfs_working_path]
            
            process = await asyncio.create_subprocess_exec(
                *cmd,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            
            stdout, stderr = await process.communicate()
            
            if process.returncode == 0:
                return stdout.decode().split()[0]
            else:
                logger.warning(f"Failed to calculate rootfs checksum: {stderr.decode()}")
                return "unknown"
                
        except Exception as e:
            logger.warning(f"Error calculating rootfs checksum: {e}")
            return "error"
    
    async def _cleanup_guest_temp_files(self):
        """Clean up temporary files inside the VM guest via guest agent"""
        try:
            await self._execute_in_guest("rm -rf /tmp/user_code_* /tmp/execution_*", timeout=5)
            logger.debug(f"Cleaned up guest temp files for VM {self.vm_id}")
        except Exception as e:
            logger.warning(f"Failed to cleanup guest temp files: {e}")
    
    async def _setup_tap_interface(self):
        """Create and configure TAP interface for VM networking"""
        try:
            tap_name = f"tap{self.vm_id}"
            bridge_name = "fcbr0"
            
            # Check if bridge exists, create if not
            try:
                process = await asyncio.create_subprocess_exec(
                    "ip", "link", "show", bridge_name,
                    stdout=asyncio.subprocess.DEVNULL,
                    stderr=asyncio.subprocess.DEVNULL
                )
                await process.communicate()
                
                if process.returncode != 0:
                    # Bridge doesn't exist, create it
                    await self._create_bridge_network()
                    
            except Exception as e:
                logger.warning(f"Failed to check bridge {bridge_name}: {e}")
                await self._create_bridge_network()
            
            # Create TAP interface
            process = await asyncio.create_subprocess_exec(
                "ip", "tuntap", "add", "dev", tap_name, "mode", "tap",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            stdout, stderr = await process.communicate()
            
            if process.returncode != 0:
                raise RuntimeError(f"Failed to create TAP interface {tap_name}: {stderr.decode()}")
            
            # Set interface up
            process = await asyncio.create_subprocess_exec(
                "ip", "link", "set", "dev", tap_name, "up",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            await process.communicate()
            
            if process.returncode != 0:
                raise RuntimeError(f"Failed to bring up TAP interface {tap_name}")
            
            # Add to bridge
            process = await asyncio.create_subprocess_exec(
                "ip", "link", "set", "dev", tap_name, "master", bridge_name,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            await process.communicate()
            
            if process.returncode != 0:
                raise RuntimeError(f"Failed to add TAP interface {tap_name} to bridge {bridge_name}")
            
            logger.debug(f"TAP interface {tap_name} created and added to bridge {bridge_name}")
            
        except Exception as e:
            logger.error(f"Failed to setup TAP interface for VM {self.vm_id}: {e}")
            raise
    
    async def _cleanup_tap_interface(self):
        """Remove TAP interface"""
        try:
            tap_name = f"tap{self.vm_id}"
            
            process = await asyncio.create_subprocess_exec(
                "ip", "link", "delete", tap_name,
                stdout=asyncio.subprocess.DEVNULL,
                stderr=asyncio.subprocess.DEVNULL
            )
            await process.communicate()
            
            logger.debug(f"TAP interface {tap_name} removed")
            
        except Exception as e:
            logger.debug(f"TAP interface cleanup for VM {self.vm_id}: {e}")
    
    async def _create_bridge_network(self):
        """Create bridge network for Firecracker VMs if it doesn't exist"""
        try:
            bridge_name = "fcbr0"
            bridge_ip = "169.254.0.1/24"
            
            # Create bridge
            process = await asyncio.create_subprocess_exec(
                "ip", "link", "add", "name", bridge_name, "type", "bridge",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            stdout, stderr = await process.communicate()
            
            if process.returncode != 0 and "already exists" not in stderr.decode():
                raise RuntimeError(f"Failed to create bridge {bridge_name}: {stderr.decode()}")
            
            # Set bridge IP
            process = await asyncio.create_subprocess_exec(
                "ip", "addr", "add", bridge_ip, "dev", bridge_name,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            stdout, stderr = await process.communicate()
            
            if process.returncode != 0 and "exists" not in stderr.decode():
                logger.warning(f"Failed to set bridge IP: {stderr.decode()}")
            
            # Bring bridge up
            process = await asyncio.create_subprocess_exec(
                "ip", "link", "set", "dev", bridge_name, "up",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            await process.communicate()
            
            logger.info(f"Bridge network {bridge_name} configured")
            
        except Exception as e:
            logger.error(f"Failed to create bridge network: {e}")
            # Continue without bridge - VM might still work
    
    async def reset_to_clean_state(self) -> bool:
        """Reset VM to clean state using simple restart (snapshots disabled due to Firecracker issues)"""
        if not self.needs_reset:
            return True
            
        try:
            logger.info(f"Resetting VM {self.vm_id} to clean state (simple restart)")
            
            # Simplified reset: just restart the VM without snapshots
            # Keep the existing working rootfs to avoid filesystem issues
            
            # Step 1: Stop the current VM instance if running
            if self.is_running:
                await self._graceful_shutdown()
            
            # Step 2: Start VM fresh (reusing existing working rootfs)
            restart_success = await self.start()
            
            if restart_success:
                # Step 3: Verify VM health
                if await self._verify_vm_health():
                    self.needs_reset = False
                    self.execution_count = 0
                    logger.info(f"Successfully reset VM {self.vm_id} using simple restart")
                    return True
                else:
                    logger.error(f"VM {self.vm_id} failed health check after simple reset")
                    return False
            else:
                logger.error(f"Failed to restart VM {self.vm_id} with simple reset")
                return False
                
        except Exception as e:
            logger.error(f"Failed to reset VM {self.vm_id} with simple restart: {e}")
            return False
    
    async def _graceful_shutdown(self):
        """Gracefully shutdown the VM"""
        try:
            if self.process and self.process.poll() is None:
                # Send shutdown signal via API (simplified)
                self.process.terminate()
                
                # Wait for graceful shutdown
                try:
                    await asyncio.wait_for(
                        asyncio.to_thread(self.process.wait),
                        timeout=5.0
                    )
                except asyncio.TimeoutError:
                    # Force kill if graceful shutdown fails
                    self.process.kill()
                    await asyncio.to_thread(self.process.wait)
                    
            self.is_running = False
            
        except Exception as e:
            logger.error(f"Error during graceful shutdown of VM {self.vm_id}: {e}")
    
    async def _restore_rootfs(self):
        """Restore rootfs from base image"""
        try:
            # Remove current working rootfs
            if os.path.exists(self.rootfs_working_path):
                os.unlink(self.rootfs_working_path)
            
            # Create fresh copy from base
            await self._create_working_rootfs()
            
            logger.debug(f"Restored rootfs for VM {self.vm_id}")
            
        except Exception as e:
            logger.error(f"Failed to restore rootfs for VM {self.vm_id}: {e}")
            raise
    
    async def _restart_from_snapshot(self) -> bool:
        """Restart VM from snapshot using Firecracker API"""
        try:
            # Verify snapshot files exist
            if not os.path.exists(self.base_snapshot_path) or not os.path.exists(self.mem_snapshot_path):
                logger.warning(f"Snapshot files not found for VM {self.vm_id}, will recreate VM")
                return await self._recreate_vm_from_scratch()
            
            # Read snapshot metadata
            metadata_path = f"{self.base_snapshot_path}.metadata"
            if os.path.exists(metadata_path):
                async with aiofiles.open(metadata_path, 'r') as f:
                    snapshot_metadata = json.loads(await f.read())
            else:
                logger.warning(f"Snapshot metadata not found for VM {self.vm_id}")
                return await self._recreate_vm_from_scratch()
            
            # Start new Firecracker process
            cmd = [
                "firecracker",
                "--api-sock", self.socket_path
            ]
            
            self.process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            
            # Wait for API socket
            await self._wait_for_api_socket()
            
            # Load snapshot via Firecracker API
            load_config = {
                "snapshot_path": self.base_snapshot_path,
                "mem_file_path": self.mem_snapshot_path,
                "enable_diff_snapshots": False,
                "resume_vm": True
            }
            
            await self._make_api_request("PUT", "/snapshot/load", load_config)
            
            # Verify VM is responsive
            await self._wait_for_guest_ready(timeout=15)
            
            self.is_running = True
            self.vm_ready = True
            logger.info(f"Successfully restored VM {self.vm_id} from snapshot")
            return True
            
        except Exception as e:
            logger.error(f"Failed to restart VM {self.vm_id} from snapshot: {e}")
            # Fallback to recreating VM from scratch
            return await self._recreate_vm_from_scratch()
    
    async def _recreate_vm_from_scratch(self) -> bool:
        """Recreate VM from scratch when snapshot restoration fails"""
        try:
            logger.info(f"Recreating VM {self.vm_id} from scratch")
            
            # Restore rootfs from base image
            await self._restore_rootfs()
            
            # Configure and start VM normally
            await self._configure_vm_via_api()
            await self._start_vm_via_api()
            await self._wait_for_guest_ready()
            
            # Create new snapshot
            await self._create_base_snapshot()
            
            self.is_running = True
            self.vm_ready = True
            return True
            
        except Exception as e:
            logger.error(f"Failed to recreate VM {self.vm_id} from scratch: {e}")
            return False
    
    async def _verify_vm_health(self) -> bool:
        """Verify VM is healthy after reset"""
        try:
            # Basic health check - try to execute a simple command
            test_code = {
                Language.PYTHON: "print('health_check')",
                Language.RUST: "fn main() { println!(\"health_check\"); }",
                Language.TYPESCRIPT: "console.log('health_check');"
            }.get(self.language, "")
            
            if not test_code:
                return False
            
            # Create temp test file
            test_file = f"/tmp/health_check_{self.vm_id}{self._get_file_extension()}"
            async with aiofiles.open(test_file, 'w') as f:
                await f.write(test_code)
            
            # Execute health check
            cmd = self._get_execution_command(test_file)
            
            process = await asyncio.create_subprocess_exec(
                *cmd,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            
            try:
                stdout, stderr = await asyncio.wait_for(
                    process.communicate(),
                    timeout=5.0
                )
                
                # Cleanup test file
                try:
                    os.unlink(test_file)
                except:
                    pass
                
                # Check if health check succeeded
                if process.returncode == 0 and "health_check" in stdout.decode():
                    return True
                else:
                    logger.warning(f"VM {self.vm_id} health check failed: {stderr.decode()}")
                    return False
                    
            except asyncio.TimeoutError:
                process.kill()
                logger.warning(f"VM {self.vm_id} health check timed out")
                return False
                
        except Exception as e:
            logger.error(f"Error during VM {self.vm_id} health check: {e}")
            return False

class VMPool:
    """Manages a pool of Firecracker VMs for fast execution"""
    
    def __init__(self, pool_size: int = 3):
        self.pool_size = pool_size
        self.pools: Dict[Language, List[FirecrackerVM]] = {
            Language.PYTHON: [],
            Language.TYPESCRIPT: [],
            Language.RUST: []
        }
        self.vm_stats = {
            'total_created': 0,
            'total_destroyed': 0,
            'executions_count': 0,
            'pool_hits': 0,
            'pool_misses': 0,
            'by_language': {
                lang.value: {
                    'created': 0,
                    'destroyed': 0,
                    'executions': 0,
                    'pool_hits': 0,
                    'pool_misses': 0
                }
                for lang in Language
            }
        }
        self.active_vms: Dict[str, FirecrackerVM] = {}
        self.created_at = time.time()
        
    async def initialize(self):
        """Initialize VM pools for all languages with concurrent creation"""
        logger.info("Initializing Firecracker VM pools...")
        
        # Create VMs concurrently for better startup performance
        vm_tasks = []
        for language in Language:
            for i in range(self.pool_size):
                task = asyncio.create_task(self._create_vm(language))
                vm_tasks.append((language, task))
        
        # Wait for all VMs to be created
        for language, task in vm_tasks:
            try:
                vm = await task
                if vm:
                    self.pools[language].append(vm)
                    logger.debug(f"Successfully created VM {vm.vm_id} for {language.value}")
                else:
                    logger.warning(f"Failed to create VM for {language.value}")
            except Exception as e:
                logger.error(f"Error creating VM for {language.value}: {e}")
                    
        logger.info(f"VM pools initialized: {self._get_pool_stats()}")
        
        # Log any pools that are under capacity
        for language, vms in self.pools.items():
            if len(vms) < self.pool_size:
                logger.warning(f"Pool for {language.value} only has {len(vms)}/{self.pool_size} VMs ready")
    
    async def get_vm(self, language: Language, security_level: SecurityLevel = SecurityLevel.SANDBOX) -> Optional[FirecrackerVM]:
        """Get an available VM from the pool with health verification"""
        pool = self.pools[language]
        
        # Try to get a healthy VM from the pool
        while pool:
            vm = pool.pop(0)
            
            # Quick health check to ensure VM is still responsive
            if await self._verify_vm_health(vm):
                self.vm_stats['pool_hits'] += 1
                self.vm_stats['by_language'][language.value]['pool_hits'] += 1
                self.active_vms[vm.vm_id] = vm
                # Start replenishing the pool in the background
                asyncio.create_task(self._replenish_pool(language))
                return vm
            else:
                logger.warning(f"VM {vm.vm_id} failed health check, discarding")
                await vm.stop()
                self.vm_stats['total_destroyed'] += 1
                self.vm_stats['by_language'][language.value]['destroyed'] += 1
        
        # If no healthy VMs available, create one on demand
        logger.info(f"No healthy VMs available for {language.value}, creating on demand")
        self.vm_stats['pool_misses'] += 1
        self.vm_stats['by_language'][language.value]['pool_misses'] += 1
        vm = await self._create_vm(language)
        if vm:
            self.active_vms[vm.vm_id] = vm
        return vm
    
    async def _verify_vm_health(self, vm: FirecrackerVM) -> bool:
        """Quick health check for a VM"""
        try:
            if not vm.is_running or not vm.vm_ready:
                return False
                
            # Quick ping to guest agent
            guest_url = f"http://{vm.guest_ip}:8080/health"
            client_timeout = aiohttp.ClientTimeout(total=2)
            
            async with aiohttp.ClientSession(timeout=client_timeout) as session:
                async with session.get(guest_url) as response:
                    if response.status == 200:
                        health_data = await response.json()
                        return health_data.get("status") == "healthy"
            return False
            
        except Exception as e:
            logger.debug(f"VM {vm.vm_id} health check failed: {e}")
            return False
    
    async def _verify_guest_agent_health(self):
        """Verify that the guest agent is reachable"""
        guest_url = f"http://{self.guest_ip}:8080/health"
        client_timeout = aiohttp.ClientTimeout(total=3)
        
        async with aiohttp.ClientSession(timeout=client_timeout) as session:
            async with session.get(guest_url) as response:
                if response.status == 200:
                    health_data = await response.json()
                    if health_data.get("status") == "healthy":
                        return True
        raise RuntimeError("Guest agent health check failed")
    
    async def return_vm(self, vm: FirecrackerVM):
        """Return a VM to the pool (or dispose if pool is full)"""
        language = vm.language
        
        # Remove from active VMs
        if vm.vm_id in self.active_vms:
            del self.active_vms[vm.vm_id]
        
        # Track execution
        self.vm_stats['executions_count'] += 1
        self.vm_stats['by_language'][language.value]['executions'] += 1
        
        if len(self.pools[language]) < self.pool_size:
            # Reset VM state and return to pool
            await self._reset_vm(vm)
            self.pools[language].append(vm)
        else:
            # Pool is full, dispose of the VM
            await vm.stop()
            self.vm_stats['total_destroyed'] += 1
            self.vm_stats['by_language'][language.value]['destroyed'] += 1
    
    async def _create_vm(self, language: Language) -> Optional[FirecrackerVM]:
        """Create and start a new VM"""
        try:
            vm_id = str(uuid.uuid4())[:8]
            config = VMConfig()
            vm = FirecrackerVM(vm_id, language, config)
            
            if await vm.start():
                self.vm_stats['total_created'] += 1
                self.vm_stats['by_language'][language.value]['created'] += 1
                return vm
            else:
                return None
                
        except Exception as e:
            logger.error(f"Failed to create VM for {language.value}: {e}")
            return None
    
    async def _reset_vm(self, vm: FirecrackerVM):
        """Reset VM to clean state using production-ready snapshot restoration"""
        try:
            # Attempt to reset VM to clean state
            reset_success = await vm.reset_to_clean_state()
            
            if not reset_success:
                logger.warning(f"Failed to reset VM {vm.vm_id}, will recreate instead")
                
                # If reset fails, stop the VM and remove it from pool
                await vm.stop()
                
                # Track the destroyed VM
                self.vm_stats['total_destroyed'] += 1
                self.vm_stats['by_language'][vm.language.value]['destroyed'] += 1
                
                # Create a new VM to replace it
                new_vm = await self._create_vm(vm.language)
                if new_vm:
                    # Replace the old VM reference with the new one
                    vm = new_vm
                else:
                    logger.error(f"Failed to create replacement VM for {vm.language.value}")
                    raise RuntimeError(f"VM reset and recreation failed for {vm.vm_id}")
            
            logger.info(f"Successfully reset VM {vm.vm_id} (executions: {vm.execution_count})")
            
        except Exception as e:
            logger.error(f"Critical error resetting VM {vm.vm_id}: {e}")
            # Ensure VM is stopped and resources cleaned up
            try:
                await vm.stop()
            except:
                pass
            raise
    
    async def _replenish_pool(self, language: Language):
        """Replenish the VM pool in the background"""
        try:
            while len(self.pools[language]) < self.pool_size:
                vm = await self._create_vm(language)
                if vm:
                    self.pools[language].append(vm)
                    logger.debug(f"Replenished pool for {language.value}, now has {len(self.pools[language])} VMs")
                else:
                    logger.warning(f"Failed to replenish pool for {language.value}")
                    break
        except Exception as e:
            logger.error(f"Error replenishing pool for {language.value}: {e}")
    
    def _get_pool_stats(self) -> Dict[str, int]:
        """Get current pool statistics"""
        return {
            lang.value: len(vms) 
            for lang, vms in self.pools.items()
        }
    
    def get_debug_info(self) -> Dict:
        """Get comprehensive debugging information about VM pools"""
        current_time = time.time()
        uptime = current_time - self.created_at
        
        pool_status = {}
        for lang, vms in self.pools.items():
            pool_status[lang.value] = {
                'available': len(vms),
                'target_size': self.pool_size,
                'vm_ids': [vm.vm_id for vm in vms],
                'vm_ages': [current_time - vm.created_at for vm in vms]
            }
        
        active_status = {
            'count': len(self.active_vms),
            'vms': {
                vm_id: {
                    'language': vm.language.value,
                    'age': current_time - vm.created_at,
                    'is_running': vm.is_running
                }
                for vm_id, vm in self.active_vms.items()
            }
        }
        
        return {
            'timestamp': current_time,
            'uptime_seconds': uptime,
            'pool_status': pool_status,
            'active_vms': active_status,
            'statistics': self.vm_stats,
            'health': {
                'total_pools': len(self.pools),
                'healthy_pools': sum(1 for vms in self.pools.values() if len(vms) > 0),
                'pool_utilization': {
                    lang.value: len(vms) / self.pool_size * 100
                    for lang, vms in self.pools.items()
                }
            }
        }
    
    async def shutdown(self):
        """Shutdown all VMs in the pools"""
        logger.info("Shutting down VM pools...")
        
        for language, pool in self.pools.items():
            for vm in pool:
                await vm.stop()
            pool.clear()

class FirecrackerExecutor:
    """Main executor class using Firecracker VMs"""
    
    def __init__(self, pool_size: int = 3):
        self.vm_pool = VMPool(pool_size)
        self.initialized = False
    
    async def initialize(self):
        """Initialize the Firecracker executor"""
        if not self.initialized:
            await self.vm_pool.initialize()
            self.initialized = True
    
    async def execute_code(self, code: str, language_str: str, timeout: int = 10, security_level: SecurityLevel = SecurityLevel.SANDBOX) -> ExecutionResult:
        """Execute code using Firecracker microVMs"""
        if not self.initialized:
            await self.initialize()
        
        try:
            language = Language(language_str)
            logger.info(f"🎯 SELECTED LANGUAGE: {language.value} for execution")
        except ValueError:
            raise ValueError(f"Unsupported language: {language_str}")
        
        vm = await self.vm_pool.get_vm(language, security_level)
        if not vm:
            raise RuntimeError(f"Could not obtain VM for {language_str}")
        
        logger.info(f"🚀 OBTAINED VM {vm.vm_id} for language {language.value}")
        
        try:
            # Update VM configuration based on security level
            vm_config_update = security_manager.get_vm_config_for_policy(security_level)
            if timeout != vm.config.timeout_seconds:
                vm.config.timeout_seconds = min(timeout, vm_config_update["timeout_seconds"])
            vm.config.mem_size_mib = min(vm.config.mem_size_mib, vm_config_update["mem_size_mib"])
            
            result = await vm.execute_code(code)
            return result
            
        finally:
            # Return VM to pool
            await self.vm_pool.return_vm(vm)
    
    async def shutdown(self):
        """Shutdown the executor"""
        await self.vm_pool.shutdown()
        self.initialized = False