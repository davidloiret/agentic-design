from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time
from typing import Optional
import logging
import os
try:
    from firecracker_manager import FirecrackerExecutor
except ImportError:
    FirecrackerExecutor = None

from security_config import SecurityLevel

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Code Execution API", description="Execute code in multiple languages safely")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeExecutionRequest(BaseModel):
    code: str
    language: str
    timeout: Optional[int] = 60

class CodeExecutionResponse(BaseModel):
    output: str
    error: Optional[str] = None
    execution_time: float
    success: bool

class CodeExecutor:
    def __init__(self):
        self.firecracker_executor = None
        
        # Get security level from environment variable
        security_level_str = os.getenv("SECURITY_LEVEL", "sandbox").lower()
        try:
            self.security_level = SecurityLevel(security_level_str)
            logger.info(f"Security level set to: {self.security_level.value}")
        except ValueError:
            logger.warning(f"Invalid security level '{security_level_str}', defaulting to 'sandbox'")
            self.security_level = SecurityLevel.SANDBOX
        
        # Initialize Firecracker executor only
        if FirecrackerExecutor:
            try:
                self.firecracker_executor = FirecrackerExecutor(pool_size=3)
                logger.info("Firecracker executor initialized")
            except Exception as e:
                logger.error(f"Firecracker executor failed to initialize: {e}")
                raise RuntimeError("Firecracker is required but failed to initialize")
        else:
            logger.error("Firecracker executor not available")
            raise RuntimeError("Firecracker executor is required but not available")
    
    async def execute_code(self, code: str, language: str, timeout: int = 10) -> CodeExecutionResponse:
        start_time = time.time()
        
        try:
            # Use Firecracker microVMs only
            if self.firecracker_executor:
                return await self._execute_with_firecracker(code, language, timeout, self.security_level)
            else:
                raise RuntimeError("Firecracker executor not available. Only Firecracker execution is allowed.")
        except Exception as e:
            execution_time = time.time() - start_time
            return CodeExecutionResponse(
                output="",
                error=str(e),
                execution_time=execution_time,
                success=False
            )
    
    
    async def _execute_with_firecracker(self, code: str, language: str, timeout: int, security_level: SecurityLevel) -> CodeExecutionResponse:
        """Execute code using Firecracker microVMs"""
        start_time = time.time()
        
        try:
            # Initialize Firecracker executor if not done yet
            if not self.firecracker_executor.initialized:
                await self.firecracker_executor.initialize()
            
            # Execute code in microVM with security level
            result = await self.firecracker_executor.execute_code(code, language, timeout, security_level)
            
            return CodeExecutionResponse(
                output=result.output,
                error=result.error,
                execution_time=result.execution_time,
                success=result.success
            )
            
        except Exception as e:
            execution_time = time.time() - start_time
            logger.error(f"Firecracker execution failed: {e}")
            return CodeExecutionResponse(
                output="",
                error=f"Firecracker execution failed: {str(e)}",
                execution_time=execution_time,
                success=False
            )
    
    

executor = CodeExecutor()

@app.post("/execute", response_model=CodeExecutionResponse)
async def execute_code(request: CodeExecutionRequest):
    """Execute code in the specified language with enhanced security"""
    
    # Security level is now controlled by environment variable
    # Skip security validation since we're already in a sandboxed VM
    # is_valid, violations = security_manager.validate_code(
    #     request.code, 
    #     request.language, 
    #     executor.security_level
    # )
    # 
    # if not is_valid:
    #     raise HTTPException(
    #         status_code=400,
    #         detail=f"Security validation failed: {'; '.join(violations)}"
    #     )
    
    try:
        result = await executor.execute_code(
            request.code, 
            request.language, 
            request.timeout
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    # Only use Firecracker
    if executor.firecracker_executor:
        execution_method = "firecracker"
    else:
        execution_method = "unavailable"
    
    return {
        "status": "healthy", 
        "firecracker_available": executor.firecracker_executor is not None,
        "execution_method": execution_method,
        "security_level": executor.security_level.value
    }

@app.get("/debug/vm-pools")
async def debug_vm_pools():
    """Debug endpoint to monitor VM pool status and statistics"""
    if not executor.firecracker_executor or not executor.firecracker_executor.initialized:
        raise HTTPException(
            status_code=503, 
            detail="Firecracker executor not initialized"
        )
    
    try:
        debug_info = executor.firecracker_executor.vm_pool.get_debug_info()
        return {
            "status": "success",
            "data": debug_info
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to get debug info: {str(e)}"
        )

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Code Execution API",
        "version": "1.0.0",
        "supported_languages": ["python", "typescript", "rust"],
        "endpoints": {
            "execute": "POST /execute - Execute code",
            "health": "GET /health - Health check",
            "debug": "GET /debug/vm-pools - VM pool debugging info"
        }
    }

@app.on_event("startup")
async def startup_event():
    """Initialize Firecracker executor on startup"""
    if executor.firecracker_executor:
        await executor.firecracker_executor.initialize()
        logger.info("Firecracker executor initialized on startup")

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup when shutting down"""
    if executor.firecracker_executor:
        await executor.firecracker_executor.shutdown()
        logger.info("Firecracker executor shutdown completed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)