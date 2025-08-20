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
            
            # Store the optimized predictor for later use
            optimized_predictor = await self.optimizer.get_optimized_predictor(request)
            if optimized_predictor:
                self.repository.save_optimized_predictor(request_id, optimized_predictor)
            
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
    
    async def predict_with_optimized_prompt(
        self, request_id: str, inputs: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Use an optimized predictor to make predictions"""
        predictor = self.repository.get_optimized_predictor(request_id)
        if not predictor:
            raise ValueError(f"No optimized predictor found for request_id: {request_id}")
        
        return await self.optimizer.predict_with_predictor(predictor, inputs)
    
    async def predict_without_optimization(
        self, prompt_template: str, inputs: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Make a prediction using the original prompt without optimization"""
        return await self.optimizer.predict_without_optimization(prompt_template, inputs)
    
    async def export_predictor(self, request_id: str) -> Dict[str, Any]:
        """Export an optimized predictor as JSON"""
        # Get the optimization result
        result = await self.get_optimization_result(request_id)
        if result.status != "completed":
            raise ValueError(f"Optimization {request_id} is not completed yet")
        
        # Get the predictor
        predictor = self.repository.get_optimized_predictor(request_id)
        if not predictor:
            raise ValueError(f"No optimized predictor found for request_id: {request_id}")
        
        # Serialize the predictor
        serialized = self.optimizer.serialize_predictor(predictor)
        
        # Add optimization result metadata
        serialized["optimization_result"] = {
            "request_id": request_id,
            "original_prompt": result.optimized_prompt.original_template if result.optimized_prompt else None,
            "optimized_prompt": result.optimized_prompt.optimized_template if result.optimized_prompt else None,
            "performance_score": result.optimized_prompt.performance_score if result.optimized_prompt else None,
            "optimization_history": result.optimized_prompt.optimization_history if result.optimized_prompt else None,
            "created_at": result.created_at,
            "completed_at": result.completed_at
        }
        
        return serialized