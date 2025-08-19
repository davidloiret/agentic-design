from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from pydantic import BaseModel
from ..core.optimization_service import OptimizationService
from ..dependencies import get_optimization_service
from ...domain.entities import (
    OptimizationRequest, 
    OptimizationResult,
    PromptTemplate,
    TrainingExample
)


class TestComparisonRequest(BaseModel):
    original_prompt: str
    optimized_prompt: str
    test_data: List[dict]
    request_id: Optional[str] = None  # Optional: use optimized predictor from this request

router = APIRouter(prefix="/api/v1", tags=["optimization"])


@router.post("/optimize", response_model=dict)
async def create_optimization(
    request: OptimizationRequest,
    service: OptimizationService = Depends(get_optimization_service)
):
    try:
        request_id = await service.create_optimization_request(request)
        return {"request_id": request_id, "status": "created"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/optimize/{request_id}", response_model=OptimizationResult)
async def get_optimization_result(
    request_id: str,
    service: OptimizationService = Depends(get_optimization_service)
):
    try:
        result = await service.get_optimization_result(request_id)
        return result
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/optimize", response_model=List[OptimizationResult])
async def list_optimization_results(
    limit: int = 10,
    offset: int = 0,
    service: OptimizationService = Depends(get_optimization_service)
):
    try:
        results = await service.list_optimization_results(limit, offset)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/evaluate")
async def evaluate_prompt(
    prompt: str,
    test_data: List[dict],
    service: OptimizationService = Depends(get_optimization_service)
):
    try:
        metrics = await service.evaluate_prompt_performance(prompt, test_data)
        return {"metrics": metrics}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/test-comparison")
async def test_prompt_comparison(
    request: TestComparisonRequest,
    service: OptimizationService = Depends(get_optimization_service)
):
    """Compare original vs optimized prompt performance"""
    try:
        # Test original prompt
        original_metrics = await service.evaluate_prompt_performance(request.original_prompt, request.test_data)
        
        # Test optimized prompt  
        optimized_metrics = await service.evaluate_prompt_performance(request.optimized_prompt, request.test_data)
        
        # Calculate improvements
        improvements = {}
        for metric in original_metrics:
            if metric in optimized_metrics and isinstance(original_metrics[metric], (int, float)):
                original_val = original_metrics[metric]
                optimized_val = optimized_metrics[metric]
                if original_val != 0:
                    improvement = ((optimized_val - original_val) / original_val) * 100
                    improvements[f"{metric}_improvement_percent"] = improvement
                else:
                    improvements[f"{metric}_improvement_percent"] = 0
        
        return {
            "original_metrics": original_metrics,
            "optimized_metrics": optimized_metrics,
            "improvements": improvements,
            "test_examples_count": len(request.test_data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "prompt-optimizer"}