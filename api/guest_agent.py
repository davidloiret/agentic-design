#!/usr/bin/env python3
"""
Simple guest agent for Firecracker VMs to execute user code securely.
This script runs inside the guest VM and provides an HTTP API for code execution.
"""

import json
import subprocess
import tempfile
import os
import signal
import threading
import time
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class CodeExecutionHandler(BaseHTTPRequestHandler):
    """HTTP handler for code execution requests"""
    
    def do_POST(self):
        """Handle POST requests for code execution"""
        try:
            if self.path == '/execute':
                self._handle_execute()
            else:
                self._send_error(404, "Not Found")
        except Exception as e:
            logger.error(f"Request handling error: {e}")
            self._send_error(500, str(e))
    
    def do_GET(self):
        """Handle GET requests for health checks"""
        if self.path == '/health':
            self._send_response(200, {"status": "healthy", "agent": "firecracker-guest"})
        else:
            self._send_error(404, "Not Found")
    
    def _handle_execute(self):
        """Handle code execution request"""
        try:
            # Read request body
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > 1024 * 1024:  # 1MB limit
                self._send_error(413, "Request too large")
                return
                
            body = self.rfile.read(content_length)
            request_data = json.loads(body.decode('utf-8'))
            
            command = request_data.get('command', '')
            timeout = min(request_data.get('timeout', 10), 30)  # Max 30 seconds
            
            if not command:
                self._send_error(400, "Missing command parameter")
                return
            
            # Execute command with timeout
            result = self._execute_command(command, timeout)
            self._send_response(200, result)
            
        except json.JSONDecodeError:
            self._send_error(400, "Invalid JSON")
        except Exception as e:
            logger.error(f"Execution error: {e}")
            self._send_error(500, str(e))
    
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
    
    def _send_response(self, status_code: int, data: dict):
        """Send JSON response"""
        response_json = json.dumps(data)
        
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(response_json)))
        self.end_headers()
        self.wfile.write(response_json.encode('utf-8'))
    
    def _send_error(self, status_code: int, message: str):
        """Send error response"""
        error_data = {"error": message, "status": status_code}
        self._send_response(status_code, error_data)
    
    def log_message(self, format, *args):
        """Override to use our logger"""
        logger.info(format % args)

def main():
    """Start the guest agent HTTP server"""
    server_address = ('0.0.0.0', 8080)
    
    # Create HTTP server
    httpd = HTTPServer(server_address, CodeExecutionHandler)
    
    logger.info(f"Guest agent starting on {server_address[0]}:{server_address[1]}")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        logger.info("Guest agent shutting down")
        httpd.shutdown()
    except Exception as e:
        logger.error(f"Guest agent error: {e}")
        raise

if __name__ == '__main__':
    main()