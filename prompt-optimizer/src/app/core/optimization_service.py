import uuid
from datetime import datetime
from typing import Dict, List, Any
from ..core.config import Settings
from ...domain.entities import OptimizationRequest, OptimizationResult, OptimizedPrompt
from ...domain.ports import PromptOptimizerPort, OptimizationRepositoryPort


class OptimizationService:
    def __init__(
        self,
        optimizer: PromptOptimizerPort,
        repository: OptimizationRepositoryPort,
        settings: Settings,
    ):
        self.optimizer = optimizer
        self.repository = repository
        self.settings = settings

    async def create_optimization_request(self, request: OptimizationRequest) -> str:
        request_id = str(uuid.uuid4())
        
        result = OptimizationResult(
            request_id=request_id,
            status="pending",
            created_at=datetime.utcnow().isoformat(),
        )
        
        # Always save the initial result first
        await self.repository.save_optimization_result(result)
        
        try:
            # Update status to processing
            result.status = "processing"
            await self.repository.save_optimization_result(result)
            
            # Perform the optimization
            optimized_prompt = await self.optimizer.optimize_prompt(request)
            
            # Update with successful result
            result.optimized_prompt = optimized_prompt
            result.status = "completed"
            result.completed_at = datetime.utcnow().isoformat()
            
        except Exception as e:
            # Update with error result
            result.status = "failed"
            result.error_message = str(e)
            result.completed_at = datetime.utcnow().isoformat()
            # Log the error for debugging
            print(f"Optimization failed for {request_id}: {e}")
        
        # Always save the final result
        await self.repository.save_optimization_result(result)
        return request_id

    async def get_optimization_result(self, request_id: str) -> OptimizationResult:
        result = await self.repository.get_optimization_result(request_id)
        if not result:
            raise ValueError(f"Optimization result not found: {request_id}")
        return result

    async def list_optimization_results(
        self, limit: int = 10, offset: int = 0
    ) -> List[OptimizationResult]:
        return await self.repository.list_optimization_results(limit, offset)

    async def evaluate_prompt_performance(
        self, prompt: str, test_data: List[Dict[str, Any]]
    ) -> Dict[str, float]:
        return await self.optimizer.evaluate_prompt(prompt, test_data)