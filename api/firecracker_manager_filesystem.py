"""
Filesystem-based Firecracker secure code execution manager.
Uses filesystem communication instead of network for better reliability.
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

class FilesystemCommunicator:
    """Handles filesystem-based communication with guest VM"""
    
    def __init__(self, shared_dir: Path):
        self.shared_dir = shared_dir
        self.requests_dir = shared_dir / "requests"
        self.responses_dir = shared_dir / "responses"
        self.status_file = shared_dir / "guest_status.json"
        
        # Create directories
        self.shared_dir.mkdir(exist_ok=True)
        self.requests_dir.mkdir(exist_ok=True)
        self.responses_dir.mkdir(exist_ok=True)
    
    async def send_request(self, request_data: dict, timeout: int = 30) -> dict:
        """Send request to guest and wait for response"""
        request_id = str(uuid.uuid4())
        request_data['request_id'] = request_id
        request_data['timestamp'] = time.time()
        
        # Write request file
        request_file = self.requests_dir / f"{request_id}.json"
        async with aiofiles.open(request_file, 'w') as f:
            await f.write(json.dumps(request_data))
        
        # Wait for response
        response_file = self.responses_dir / f"{request_id}.json"
        start_time = time.time()
        
        while time.time() - start_time < timeout:
            if response_file.exists():
                try:
                    async with aiofiles.open(response_file, 'r') as f:
                        response_data = json.loads(await f.read())
                    
                    # Clean up response file
                    response_file.unlink()
                    return response_data
                    
                except Exception as e:
                    logger.warning(f"Failed to read response {request_id}: {e}")
            
            await asyncio.sleep(0.1)
        
        # Cleanup request file if still exists
        if request_file.exists():
            request_file.unlink()
        
        raise asyncio.TimeoutError(f"Request {request_id} timed out after {timeout}s")
    
    async def check_guest_status(self) -> dict:
        """Check guest agent status"""
        try:
            if self.status_file.exists():
                async with aiofiles.open(self.status_file, 'r') as f:
                    status_data = json.loads(await f.read())
                
                # Check if status is recent (within last 5 seconds)
                if time.time() - status_data.get('timestamp', 0) < 5:
                    return status_data
            
            return {"status": "unknown", "timestamp": 0}
            
        except Exception as e:
            logger.warning(f"Failed to check guest status: {e}")
            return {"status": "error", "error": str(e)}

class FirecrackerVMFilesystem:
    """Filesystem-based Firecracker microVM instance"""
    
    def __init__(self, vm_id: str, language: Language, config: VMConfig):
        self.vm_id = vm_id
        self.language = language
        self.config = config
        self.socket_path = f"/tmp/firecracker-{vm_id}.socket"
        self.process: Optional[subprocess.Popen] = None
        self.is_running = False
        self.created_at = time.time()
        
        # Filesystem communication
        self.shared_dir = Path(f"/tmp/firecracker-{vm_id}-shared")
        self.communicator = FilesystemCommunicator(self.shared_dir)
        
        # VM file paths
        self.rootfs_base_path = f"/opt/firecracker/rootfs/{self.language.value}/rootfs.ext4"
        self.rootfs_working_path = f"/tmp/firecracker-{vm_id}-rootfs.ext4"
        self.execution_count = 0
        self.needs_reset = False
        self.vm_ready = False
        
        # Network configuration (still needed for Firecracker, but not for communication)
        self.guest_ip = "169.254.0.2"
    
    async def start(self) -> bool:
        """Start the Firecracker microVM with filesystem communication"""
        try:
            # Create working copy of rootfs
            await self._create_working_rootfs()
            
            # Mount shared directory in the rootfs
            await self._setup_shared_directory()
            
            # Start Firecracker process
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
            
            # Configure VM via API
            await self._configure_vm_via_api()
            
            # Start VM
            await self._start_vm_via_api()
            
            # Wait for guest to boot and filesystem agent to start
            await self._wait_for_guest_ready()
            
            self.is_running = True
            self.vm_ready = True
            return True
            
        except Exception as e:
            logger.error(f"Failed to start VM {self.vm_id}: {e}")
            return False
    
    async def execute_code(self, code: str) -> ExecutionResult:
        """Execute code using filesystem communication"""
        start_time = time.time()
        self.execution_count += 1
        self.needs_reset = True
        
        if not self.vm_ready:
            return ExecutionResult(
                success=False,
                output="",
                error="VM is not ready for execution",
                execution_time=time.time() - start_time,
                vm_id=self.vm_id
            )
        
        try:
            # Generate unique execution ID
            execution_id = f"exec_{int(time.time() * 1000000)}_{self.execution_count}"
            
            # Create code file path in guest
            guest_code_path = f"/tmp/user_code_{execution_id}{self._get_file_extension()}"
            
            # Transfer code to guest VM using filesystem
            await self._transfer_code_to_guest_filesystem(code, guest_code_path)
            
            # Execute code inside the VM
            execution_command = self._get_guest_execution_command(guest_code_path)
            
            result = await self._execute_in_guest_filesystem(
                execution_command,
                timeout=self.config.timeout_seconds
            )
            
            execution_time = time.time() - start_time
            
            # Parse execution result
            if result.get("success", False):
                return ExecutionResult(
                    success=True,
                    output=result.get("stdout", ""),
                    error=result.get("stderr") if result.get("stderr") else None,
                    execution_time=execution_time,
                    vm_id=self.vm_id
                )
            else:
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
    
    async def _setup_shared_directory(self):
        """Setup shared directory that will be mounted in the guest"""
        # Create mount point in rootfs
        mount_point = f"/tmp/rootfs-mount-{self.vm_id}"
        os.makedirs(mount_point, exist_ok=True)
        
        try:
            # Mount the rootfs temporarily to add the shared directory
            subprocess.run([
                "mount", "-o", "loop", self.rootfs_working_path, mount_point
            ], check=True)
            
            # Create shared directory in the rootfs
            guest_shared_dir = os.path.join(mount_point, "tmp", "firecracker_shared")
            os.makedirs(guest_shared_dir, exist_ok=True)
            
            # Copy filesystem agent into the rootfs
            agent_src = "/data/code/agentic-design/api/guest_agent_filesystem.py"
            agent_dest = os.path.join(mount_point, "usr", "local", "bin", "guest_agent_filesystem.py")
            
            if os.path.exists(agent_src):
                os.makedirs(os.path.dirname(agent_dest), exist_ok=True)
                subprocess.run(["cp", agent_src, agent_dest], check=True)
                os.chmod(agent_dest, 0o755)
            
            # Create init script to start the filesystem agent
            init_script = os.path.join(mount_point, "etc", "init.d", "filesystem-agent")
            os.makedirs(os.path.dirname(init_script), exist_ok=True)
            
            with open(init_script, "w") as f:
                f.write("""#!/bin/sh
# Filesystem agent init script
case "$1" in
    start)
        echo "Starting filesystem agent..."
        mkdir -p /tmp/firecracker_shared
        python3 /usr/local/bin/guest_agent_filesystem.py /tmp/firecracker_shared &
        echo $! > /var/run/filesystem-agent.pid
        ;;
    stop)
        echo "Stopping filesystem agent..."
        if [ -f /var/run/filesystem-agent.pid ]; then
            kill $(cat /var/run/filesystem-agent.pid)
            rm -f /var/run/filesystem-agent.pid
        fi
        ;;
    *)
        echo "Usage: $0 {start|stop}"
        exit 1
        ;;
esac
exit 0
""")
            
            os.chmod(init_script, 0o755)
            
            # Create auto-start script
            rc_local = os.path.join(mount_point, "etc", "rc.local")
            with open(rc_local, "w") as f:
                f.write("""#!/bin/sh
# Auto-start filesystem agent
/etc/init.d/filesystem-agent start
exit 0
""")
            
            os.chmod(rc_local, 0o755)
            
        finally:
            # Unmount the rootfs
            subprocess.run(["umount", mount_point], check=False)
            os.rmdir(mount_point)
    
    async def _transfer_code_to_guest_filesystem(self, code: str, guest_path: str):
        """Transfer code to guest using filesystem communication"""
        try:
            # Use write_file request to transfer code
            request = {
                'type': 'write_file',
                'file_path': guest_path,
                'content': code,
                'encoding': 'utf-8'
            }
            
            response = await self.communicator.send_request(request, timeout=10)
            
            if not response.get('success', False):
                raise RuntimeError(f"Failed to transfer code: {response.get('error', 'Unknown error')}")
            
            logger.debug(f"Transferred code to guest file: {guest_path}")
            
        except Exception as e:
            logger.error(f"Failed to transfer code to guest VM {self.vm_id}: {e}")
            raise
    
    async def _execute_in_guest_filesystem(self, command: str, timeout: int = 10) -> dict:
        """Execute command in guest using filesystem communication"""
        try:
            request = {
                'type': 'execute',
                'command': command,
                'timeout': timeout
            }
            
            response = await self.communicator.send_request(request, timeout=timeout + 5)
            return response
            
        except Exception as e:
            logger.error(f"Failed to execute in guest {self.vm_id}: {e}")
            raise
    
    async def _wait_for_guest_ready(self, timeout: int = 30):
        """Wait for guest OS and filesystem agent to be ready"""
        start_time = time.time()
        
        while time.time() - start_time < timeout:
            try:
                # Check if filesystem agent is running
                status = await self.communicator.check_guest_status()
                if status.get('status') == 'running':
                    logger.info(f"Guest {self.vm_id} filesystem agent is ready")
                    return
                
                # Try a health check request
                request = {'type': 'health'}
                response = await self.communicator.send_request(request, timeout=5)
                
                if response.get('status') == 'healthy':
                    logger.info(f"Guest {self.vm_id} is ready")
                    return
                    
            except Exception as e:
                logger.debug(f"Guest not ready yet: {e}")
            
            await asyncio.sleep(2.0)
        
        raise RuntimeError(f"Guest {self.vm_id} not ready after {timeout}s")
    
    async def _cleanup_guest_temp_files(self):
        """Clean up temporary files in guest using filesystem communication"""
        try:
            request = {
                'type': 'execute',
                'command': 'rm -rf /tmp/user_code_* /tmp/execution_*',
                'timeout': 5
            }
            
            await self.communicator.send_request(request, timeout=10)
            logger.debug(f"Cleaned up guest temp files for VM {self.vm_id}")
            
        except Exception as e:
            logger.warning(f"Failed to cleanup guest temp files: {e}")
    
    # The following methods remain largely the same but with filesystem communication
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
            return f"cp {guest_file_path} /opt/rust-template/src/main.rs && cd /opt/rust-template && timeout {self.config.timeout_seconds} cargo run --release 2>&1"
        elif self.language == Language.PYTHON:
            return f"timeout {self.config.timeout_seconds} python3 {guest_file_path} 2>&1"
        elif self.language == Language.TYPESCRIPT:
            return f"timeout {self.config.timeout_seconds} tsx {guest_file_path} 2>&1"
        else:
            raise ValueError(f"Unsupported language: {self.language}")
    
    async def stop(self):
        """Stop the microVM and cleanup all resources"""
        if self.process:
            self.process.terminate()
            try:
                await asyncio.wait_for(
                    asyncio.to_thread(self.process.wait), 
                    timeout=5
                )
            except asyncio.TimeoutError:
                self.process.kill()
                await asyncio.to_thread(self.process.wait)
        
        # Cleanup VM resources
        await self._cleanup_vm_resources()
        self.is_running = False
    
    async def _cleanup_vm_resources(self):
        """Clean up all VM-related resources including shared directory"""
        resources_to_clean = [
            self.socket_path,
            self.rootfs_working_path,
        ]
        
        for resource_path in resources_to_clean:
            try:
                if os.path.exists(resource_path):
                    os.unlink(resource_path)
            except Exception as e:
                logger.warning(f"Failed to cleanup resource {resource_path}: {e}")
        
        # Clean up shared directory
        try:
            import shutil
            if self.shared_dir.exists():
                shutil.rmtree(self.shared_dir)
        except Exception as e:
            logger.warning(f"Failed to cleanup shared directory: {e}")
    
    # API methods remain the same as original implementation
    async def _make_api_request(self, method: str, endpoint: str, data: Optional[dict] = None) -> dict:
        """Make HTTP request to Firecracker API via Unix socket"""
        import aiohttp
        
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
    
    async def _handle_api_response(self, response) -> dict:
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
        
        logger.debug(f"VM {self.vm_id} configured via API")
    
    async def _start_vm_via_api(self):
        """Start VM using Firecracker API"""
        start_config = {"action_type": "InstanceStart"}
        await self._make_api_request("PUT", "/actions", start_config)
        
        logger.info(f"VM {self.vm_id} started via API")
    
    async def _create_working_rootfs(self):
        """Create a working copy of the base rootfs for this VM instance"""
        try:
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

# VM Pool and Executor classes remain largely the same
class VMPool:
    """Manages a pool of filesystem-based Firecracker VMs"""
    
    def __init__(self, pool_size: int = 3):
        self.pool_size = pool_size
        self.pools: Dict[Language, List[FirecrackerVMFilesystem]] = {
            Language.PYTHON: [],
            Language.TYPESCRIPT: [],
            Language.RUST: []
        }
        self.active_vms: Dict[str, FirecrackerVMFilesystem] = {}
        self.vm_stats = {'total_created': 0, 'total_destroyed': 0, 'executions_count': 0}
        
    async def initialize(self):
        """Initialize VM pools for all languages"""
        logger.info("Initializing filesystem-based Firecracker VM pools...")
        
        for language in Language:
            for i in range(self.pool_size):
                vm = await self._create_vm(language)
                if vm:
                    self.pools[language].append(vm)
                    
        logger.info(f"VM pools initialized: {self._get_pool_stats()}")
    
    async def get_vm(self, language: Language, security_level: SecurityLevel = SecurityLevel.SANDBOX) -> Optional[FirecrackerVMFilesystem]:
        """Get an available VM from the pool"""
        pool = self.pools[language]
        
        if pool:
            vm = pool.pop(0)
            self.active_vms[vm.vm_id] = vm
            asyncio.create_task(self._replenish_pool(language))
            return vm
        
        # Create one on demand
        vm = await self._create_vm(language)
        if vm:
            self.active_vms[vm.vm_id] = vm
        return vm
    
    async def return_vm(self, vm: FirecrackerVMFilesystem):
        """Return a VM to the pool"""
        language = vm.language
        
        if vm.vm_id in self.active_vms:
            del self.active_vms[vm.vm_id]
        
        self.vm_stats['executions_count'] += 1
        
        if len(self.pools[language]) < self.pool_size:
            self.pools[language].append(vm)
        else:
            await vm.stop()
            self.vm_stats['total_destroyed'] += 1
    
    async def _create_vm(self, language: Language) -> Optional[FirecrackerVMFilesystem]:
        """Create and start a new VM"""
        try:
            vm_id = str(uuid.uuid4())[:8]
            config = VMConfig()
            vm = FirecrackerVMFilesystem(vm_id, language, config)
            
            if await vm.start():
                self.vm_stats['total_created'] += 1
                return vm
            else:
                return None
                
        except Exception as e:
            logger.error(f"Failed to create VM for {language.value}: {e}")
            return None
    
    async def _replenish_pool(self, language: Language):
        """Replenish the VM pool in the background"""
        while len(self.pools[language]) < self.pool_size:
            vm = await self._create_vm(language)
            if vm:
                self.pools[language].append(vm)
            else:
                break
    
    def _get_pool_stats(self) -> Dict[str, int]:
        """Get current pool statistics"""
        return {
            lang.value: len(vms) 
            for lang, vms in self.pools.items()
        }
    
    async def shutdown(self):
        """Shutdown all VMs in the pools"""
        logger.info("Shutting down VM pools...")
        
        for language, pool in self.pools.items():
            for vm in pool:
                await vm.stop()
            pool.clear()

class FirecrackerFilesystemExecutor:
    """Main executor class using filesystem-based Firecracker VMs"""
    
    def __init__(self, pool_size: int = 3):
        self.vm_pool = VMPool(pool_size)
        self.initialized = False
    
    async def initialize(self):
        """Initialize the Firecracker executor"""
        if not self.initialized:
            await self.vm_pool.initialize()
            self.initialized = True
    
    async def execute_code(self, code: str, language_str: str, timeout: int = 10, security_level: SecurityLevel = SecurityLevel.SANDBOX) -> ExecutionResult:
        """Execute code using filesystem-based Firecracker microVMs"""
        if not self.initialized:
            await self.initialize()
        
        try:
            language = Language(language_str)
        except ValueError:
            raise ValueError(f"Unsupported language: {language_str}")
        
        vm = await self.vm_pool.get_vm(language, security_level)
        if not vm:
            raise RuntimeError(f"Could not obtain VM for {language_str}")
        
        try:
            # Update VM configuration
            vm_config_update = security_manager.get_vm_config_for_policy(security_level)
            if timeout != vm.config.timeout_seconds:
                vm.config.timeout_seconds = min(timeout, vm_config_update["timeout_seconds"])
            vm.config.mem_size_mib = min(vm.config.mem_size_mib, vm_config_update["mem_size_mib"])
            
            result = await vm.execute_code(code)
            return result
            
        finally:
            await self.vm_pool.return_vm(vm)
    
    async def shutdown(self):
        """Shutdown the executor"""
        await self.vm_pool.shutdown()
        self.initialized = False