#!/usr/bin/env python3
"""
Test script for filesystem-based Firecracker executor
"""

import asyncio
import logging
import tempfile
import os
from pathlib import Path

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def test_filesystem_agent():
    """Test the filesystem agent directly"""
    print("=== Testing Filesystem Agent ===")
    
    # Import the filesystem agent
    from guest_agent_filesystem import FilesystemAgent
    
    # Create a temporary shared directory
    with tempfile.TemporaryDirectory() as temp_dir:
        shared_dir = Path(temp_dir) / "shared"
        
        # Create agent
        agent = FilesystemAgent(shared_dir)
        
        # Start agent in background
        agent_task = asyncio.create_task(asyncio.to_thread(agent.start))
        
        # Give agent time to start
        await asyncio.sleep(1)
        
        try:
            # Test health check
            print("Testing health check...")
            from firecracker_manager_filesystem import FilesystemCommunicator
            
            communicator = FilesystemCommunicator(shared_dir)
            
            request = {'type': 'health'}
            response = await communicator.send_request(request, timeout=10)
            
            print(f"Health response: {response}")
            
            # Test code execution
            print("Testing code execution...")
            request = {
                'type': 'execute',
                'command': 'echo "Hello from filesystem agent!"',
                'timeout': 5
            }
            
            response = await communicator.send_request(request, timeout=10)
            print(f"Execution response: {response}")
            
            # Test file writing
            print("Testing file writing...")
            request = {
                'type': 'write_file',
                'file_path': '/tmp/test_file.txt',
                'content': 'Hello from filesystem!',
                'encoding': 'utf-8'
            }
            
            response = await communicator.send_request(request, timeout=10)
            print(f"File write response: {response}")
            
            # Verify file was created
            if response.get('success'):
                verify_request = {
                    'type': 'execute',
                    'command': 'cat /tmp/test_file.txt',
                    'timeout': 5
                }
                
                verify_response = await communicator.send_request(verify_request, timeout=10)
                print(f"File verification: {verify_response}")
            
            print("✅ Filesystem agent test completed successfully!")
            
        except Exception as e:
            print(f"❌ Filesystem agent test failed: {e}")
            
        finally:
            # Stop agent
            agent.stop()
            agent_task.cancel()

async def test_simple_communication():
    """Test simple filesystem communication without full VM"""
    print("\n=== Testing Simple Filesystem Communication ===")
    
    from firecracker_manager_filesystem import FilesystemCommunicator
    import json
    import uuid
    
    with tempfile.TemporaryDirectory() as temp_dir:
        shared_dir = Path(temp_dir) / "test_shared"
        
        # Create communicator
        communicator = FilesystemCommunicator(shared_dir)
        
        # Manually create a response to test reading
        print("Testing manual request/response cycle...")
        
        request_id = str(uuid.uuid4())
        
        # Write a response file manually
        response_data = {
            'request_id': request_id,
            'type': 'test_response',
            'status': 'success',
            'message': 'Manual response created'
        }
        
        response_file = communicator.responses_dir / f"{request_id}.json"
        with open(response_file, 'w') as f:
            json.dump(response_data, f)
        
        # Try to read it back
        try:
            # Send a request that will timeout, but our response file should be found
            test_request = {
                'request_id': request_id,
                'type': 'test',
                'message': 'This is a test'
            }
            
            # Manually write request (it won't be processed, but we can test reading the response)
            request_file = communicator.requests_dir / f"{request_id}.json"
            with open(request_file, 'w') as f:
                json.dump(test_request, f)
            
            # Give the system time to process (or timeout)
            await asyncio.sleep(0.2)
            
            # Check if response file exists and read it manually
            if response_file.exists():
                with open(response_file, 'r') as f:
                    response = json.load(f)
                print(f"✅ Successfully read response: {response}")
                response_file.unlink()  # Clean up
            else:
                print("❌ Response file not found")
            
            # Clean up request file
            if request_file.exists():
                request_file.unlink()
                
        except Exception as e:
            print(f"❌ Communication test failed: {e}")

async def main():
    """Run all tests"""
    print("🧪 Starting Filesystem-based Firecracker Tests")
    
    try:
        # Test simple communication
        await test_simple_communication()
        
        # Test filesystem agent
        await test_filesystem_agent()
        
        print("\n🎉 All tests completed!")
        
    except Exception as e:
        print(f"\n💥 Test suite failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())