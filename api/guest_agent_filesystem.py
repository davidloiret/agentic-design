#!/usr/bin/env python3
"""
Filesystem-based guest agent for Firecracker VMs.
Uses filesystem watchers and shared directories instead of network communication.
"""

import json
import subprocess
import tempfile
import os
import signal
import threading
import time
import logging
import uuid
from pathlib import Path
import hashlib
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class FilesystemAgent:
    """Filesystem-based agent for guest VM communication"""
    
    def __init__(self, shared_dir="/tmp/firecracker_shared"):
        self.shared_dir = Path(shared_dir)
        self.requests_dir = self.shared_dir / "requests"
        self.responses_dir = self.shared_dir / "responses"
        self.status_file = self.shared_dir / "guest_status.json"
        self.running = False
        
        # Create required directories
        self.shared_dir.mkdir(exist_ok=True)
        self.requests_dir.mkdir(exist_ok=True)
        self.responses_dir.mkdir(exist_ok=True)
        
        # Agent metadata
        self.agent_id = str(uuid.uuid4())[:8]
        self.started_at = time.time()
        
    def start(self):
        """Start the filesystem agent"""
        logger.info(f"Starting filesystem agent {self.agent_id}")
        self.running = True
        
        # Write initial status
        self._update_status("running")
        
        # Start the main loop
        self._main_loop()
    
    def stop(self):
        """Stop the filesystem agent"""
        logger.info("Stopping filesystem agent")
        self.running = False
        self._update_status("stopped")
    
    def _main_loop(self):
        """Main loop to process requests"""
        logger.info("Agent main loop started")
        
        while self.running:
            try:
                # Check for new request files
                request_files = list(self.requests_dir.glob("*.json"))
                
                for request_file in request_files:
                    try:
                        self._process_request(request_file)
                    except Exception as e:
                        logger.error(f"Error processing request {request_file}: {e}")
                        self._create_error_response(request_file, str(e))
                
                # Update heartbeat
                self._update_status("running")
                
                # Sleep briefly to avoid busy waiting
                time.sleep(0.1)
                
            except Exception as e:
                logger.error(f"Main loop error: {e}")
                time.sleep(1)
    
    def _process_request(self, request_file: Path):
        """Process a single request file"""
        try:
            # Read request
            with open(request_file, 'r') as f:
                request_data = json.load(f)
            
            request_id = request_data.get('request_id', 'unknown')
            request_type = request_data.get('type', 'unknown')
            
            logger.info(f"Processing request {request_id} of type {request_type}")
            
            # Remove the request file immediately to prevent reprocessing
            request_file.unlink()
            
            # Handle different request types
            if request_type == 'execute':
                self._handle_execute_request(request_data)
            elif request_type == 'health':
                self._handle_health_request(request_data)
            elif request_type == 'write_file':
                self._handle_write_file_request(request_data)
            else:
                self._create_error_response_by_id(request_id, f"Unknown request type: {request_type}")
                
        except Exception as e:
            logger.error(f"Failed to process request {request_file}: {e}")
            raise
    
    def _handle_execute_request(self, request_data):
        """Handle code execution request"""
        request_id = request_data['request_id']
        command = request_data.get('command', '')
        timeout = min(request_data.get('timeout', 10), 30)  # Max 30 seconds
        
        if not command:
            self._create_error_response_by_id(request_id, "Missing command parameter")
            return
        
        # Execute command
        result = self._execute_command(command, timeout)
        result['request_id'] = request_id
        result['type'] = 'execute_response'
        result['timestamp'] = time.time()
        
        # Write response
        self._write_response(request_id, result)
    
    def _handle_health_request(self, request_data):
        """Handle health check request"""
        request_id = request_data['request_id']
        
        response = {
            'request_id': request_id,
            'type': 'health_response',
            'status': 'healthy',
            'agent_id': self.agent_id,
            'uptime': time.time() - self.started_at,
            'timestamp': time.time()
        }
        
        self._write_response(request_id, response)
    
    def _handle_write_file_request(self, request_data):
        """Handle file write request"""
        request_id = request_data['request_id']
        file_path = request_data.get('file_path', '')
        content = request_data.get('content', '')
        encoding = request_data.get('encoding', 'utf-8')
        
        try:
            # Security check: only allow writing to /tmp
            file_path = Path(file_path)
            if not str(file_path).startswith('/tmp/'):
                raise ValueError("File writes only allowed in /tmp directory")
            
            # Create parent directories if needed
            file_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Write file
            if encoding == 'base64':
                import base64
                content_bytes = base64.b64decode(content)
                with open(file_path, 'wb') as f:
                    f.write(content_bytes)
            else:
                with open(file_path, 'w', encoding=encoding) as f:
                    f.write(content)
            
            # Set permissions
            os.chmod(file_path, 0o644)
            
            response = {
                'request_id': request_id,
                'type': 'write_file_response',
                'success': True,
                'file_path': str(file_path),
                'timestamp': time.time()
            }
            
        except Exception as e:
            response = {
                'request_id': request_id,
                'type': 'write_file_response',
                'success': False,
                'error': str(e),
                'timestamp': time.time()
            }
        
        self._write_response(request_id, response)
    
    def _execute_command(self, command: str, timeout: int) -> dict:
        """Execute command with security restrictions and timeout"""
        try:
            # Security: Run command in restricted environment
            env = {
                'PATH': '/usr/local/bin:/usr/bin:/bin',
                'HOME': '/tmp',
                'USER': 'nobody',
                'TMPDIR': '/tmp'
            }
            
            # Execute with timeout
            process = subprocess.Popen(
                command,
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                env=env,
                cwd='/tmp',
                preexec_fn=os.setsid  # Create new process group
            )
            
            try:
                stdout, stderr = process.communicate(timeout=timeout)
                
                return {
                    "success": process.returncode == 0,
                    "stdout": stdout.decode('utf-8', errors='replace'),
                    "stderr": stderr.decode('utf-8', errors='replace'),
                    "return_code": process.returncode
                }
                
            except subprocess.TimeoutExpired:
                # Kill the entire process group
                os.killpg(os.getpgid(process.pid), signal.SIGKILL)
                process.communicate()  # Clean up
                
                return {
                    "success": False,
                    "stdout": "",
                    "stderr": f"Command timed out after {timeout} seconds",
                    "return_code": -1
                }
                
        except Exception as e:
            return {
                "success": False,
                "stdout": "",
                "stderr": f"Execution error: {str(e)}",
                "return_code": -1
            }
    
    def _write_response(self, request_id: str, response_data: dict):
        """Write response to filesystem"""
        response_file = self.responses_dir / f"{request_id}.json"
        
        try:
            with open(response_file, 'w') as f:
                json.dump(response_data, f)
            
            logger.debug(f"Response written for request {request_id}")
            
        except Exception as e:
            logger.error(f"Failed to write response for {request_id}: {e}")
    
    def _create_error_response_by_id(self, request_id: str, error_message: str):
        """Create error response by request ID"""
        response = {
            'request_id': request_id,
            'type': 'error_response',
            'success': False,
            'error': error_message,
            'timestamp': time.time()
        }
        
        self._write_response(request_id, response)
    
    def _create_error_response(self, request_file: Path, error_message: str):
        """Create error response from request file"""
        try:
            # Try to extract request ID from the file
            with open(request_file, 'r') as f:
                request_data = json.load(f)
            request_id = request_data.get('request_id', 'unknown')
        except:
            request_id = request_file.stem
        
        # Remove the request file
        try:
            request_file.unlink()
        except:
            pass
        
        self._create_error_response_by_id(request_id, error_message)
    
    def _update_status(self, status: str):
        """Update agent status file"""
        status_data = {
            'agent_id': self.agent_id,
            'status': status,
            'timestamp': time.time(),
            'uptime': time.time() - self.started_at,
            'shared_dir': str(self.shared_dir)
        }
        
        try:
            with open(self.status_file, 'w') as f:
                json.dump(status_data, f)
        except Exception as e:
            logger.warning(f"Failed to update status: {e}")

def main():
    """Start the filesystem-based guest agent"""
    import sys
    
    shared_dir = sys.argv[1] if len(sys.argv) > 1 else "/tmp/firecracker_shared"
    
    agent = FilesystemAgent(shared_dir)
    
    try:
        agent.start()
    except KeyboardInterrupt:
        logger.info("Agent interrupted by user")
        agent.stop()
    except Exception as e:
        logger.error(f"Agent error: {e}")
        agent.stop()
        raise

if __name__ == '__main__':
    main()