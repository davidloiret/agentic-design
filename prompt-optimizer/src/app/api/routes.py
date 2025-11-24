from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Optional
from pydantic import BaseModel
from ..core.optimization_service import OptimizationService
from ..dependencies import get_optimization_service
from ..middleware.auth import get_current_user_email, auth_middleware
from ...domain.entities import (
    OptimizationRequest,
    OptimizationResult,
    PromptTemplate,
    TrainingExample,
    SimplePromptComponents,
    OptimizationStrategy
)
from ...domain.prompt_guides import PromptGuideRegistry


class GEPAOptimizationRequest(BaseModel):
    prompt: str
    input_variables: List[str]
    output_variables: List[str]
    training_examples: Optional[List[dict]] = []
    validation_examples: Optional[List[dict]] = []
    max_generations: Optional[int] = 30
    population_size: Optional[int] = 15
    objectives: Optional[List[str]] = ["performance", "clarity", "efficiency"]


class GEPAThinkRequest(BaseModel):
    prompt: str
    context: Optional[str] = None
    optimization_goal: Optional[str] = "general"


class TokenRequest(BaseModel):
    email: str


class TestComparisonRequest(BaseModel):
    original_prompt: str
    optimized_prompt: str
    test_data: List[dict]
    request_id: Optional[str] = None  # Optional: use optimized predictor from this request


class ImprovePromptRequest(BaseModel):
    prompt: str
    context: Optional[str] = None  # Additional context about what the prompt is for
    improvements: Optional[List[str]] = None  # Specific improvements requested
    guide_type: Optional[str] = None  # Which prompt guide to use (defaults to 'anthropic')

router = APIRouter(prefix="/api/v1", tags=["optimization"])


@router.post("/optimize", response_model=dict)
async def create_optimization(
    request: OptimizationRequest,
    service: OptimizationService = Depends(get_optimization_service),
    current_user_email: str = Depends(get_current_user_email)
):
    try:
        print(f"Optimization request created by: {current_user_email}")
        request_id = await service.create_optimization_request(request)
        return {"request_id": request_id, "status": "created", "accessed_by": current_user_email}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/optimize/{request_id}", response_model=OptimizationResult)
async def get_optimization_result(
    request_id: str,
    service: OptimizationService = Depends(get_optimization_service),
    current_user_email: str = Depends(get_current_user_email)
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
    service: OptimizationService = Depends(get_optimization_service),
    current_user_email: str = Depends(get_current_user_email)
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
    service: OptimizationService = Depends(get_optimization_service),
    current_user_email: str = Depends(get_current_user_email)
):
    try:
        metrics = await service.evaluate_prompt_performance(prompt, test_data)
        return {"metrics": metrics, "accessed_by": current_user_email}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/test-comparison")
async def test_prompt_comparison(
    request: TestComparisonRequest,
    service: OptimizationService = Depends(get_optimization_service),
    current_user_email: str = Depends(get_current_user_email)
):
    """Compare original vs optimized prompt performance"""
    try:
        print(f"Prompt comparison requested by: {current_user_email}")

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
            "test_examples_count": len(request.test_data),
            "accessed_by": current_user_email
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/predict/{request_id}")
async def predict_with_optimized_prompt(
    request_id: str,
    inputs: dict,
    service: OptimizationService = Depends(get_optimization_service),
    current_user_email: str = Depends(get_current_user_email)
):
    """Use an optimized predictor to make predictions"""
    try:
        # Get the optimization result to verify it exists and is completed
        result = await service.get_optimization_result(request_id)
        if result.status != "completed":
            raise HTTPException(
                status_code=400,
                detail=f"Optimization {request_id} is not completed yet. Status: {result.status}"
            )

        # Make prediction
        prediction_result = await service.predict_with_optimized_prompt(request_id, inputs)
        return prediction_result
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/predict-comparison/{request_id}")
async def predict_with_comparison(
    request_id: str,
    inputs: dict,
    service: OptimizationService = Depends(get_optimization_service),
    current_user_email: str = Depends(get_current_user_email)
):
    """Compare predictions between original and optimized prompts"""
    try:
        print(f"Prediction comparison requested by: {current_user_email}")

        # Get the optimization result
        result = await service.get_optimization_result(request_id)
        if result.status != "completed":
            raise HTTPException(
                status_code=400,
                detail=f"Optimization {request_id} is not completed yet. Status: {result.status}"
            )

        # Get original prompt template
        original_template = result.optimized_prompt.original_template

        # Make predictions with both versions
        unoptimized_result = await service.predict_without_optimization(original_template, inputs)
        optimized_result = await service.predict_with_optimized_prompt(request_id, inputs)

        return {
            "unoptimized": unoptimized_result,
            "optimized": optimized_result,
            "template_info": {
                "original": original_template,
                "optimized": result.optimized_prompt.optimized_template
            },
            "accessed_by": current_user_email
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/export/{request_id}")
async def export_predictor(
    request_id: str,
    service: OptimizationService = Depends(get_optimization_service),
    current_user_email: str = Depends(get_current_user_email)
):
    """Export an optimized predictor as JSON"""
    try:
        predictor_data = await service.export_predictor(request_id)
        return predictor_data
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.post("/improve-prompt")
async def improve_prompt(
    request: ImprovePromptRequest,
    service: OptimizationService = Depends(get_optimization_service)
):
    """Improve an existing prompt using LLM-based suggestions"""
    try:
        # Use the service to improve the prompt
        improved_prompt = await service.improve_prompt(
            prompt=request.prompt,
            context=request.context,
            improvements=request.improvements,
            guide_type=request.guide_type
        )
        return improved_prompt
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/prompt-guides")
async def list_prompt_guides():
    """List all available prompt improvement guides"""
    try:
        guides = PromptGuideRegistry.list_guides()
        return {"guides": guides}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/gepa-optimize")
async def gepa_optimize(
    request: GEPAOptimizationRequest,
    service: OptimizationService = Depends(get_optimization_service),
    current_user_email: str = Depends(get_current_user_email)
):
    """Optimize prompt using GEPA (Generalized Evolutionary Prompt Adaptation)"""
    try:
        # Log the access for audit purposes
        print(f"GEPA optimization requested by: {current_user_email}")

        result = await service.gepa_optimize(
            prompt=request.prompt,
            input_variables=request.input_variables,
            output_variables=request.output_variables,
            training_examples=request.training_examples,
            validation_examples=request.validation_examples,
            max_generations=request.max_generations,
            population_size=request.population_size,
            objectives=request.objectives
        )

        # Add user metadata to result
        result["accessed_by"] = current_user_email
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/gepa-think")
async def gepa_think(
    request: GEPAThinkRequest,
    service: OptimizationService = Depends(get_optimization_service),
    current_user_email: str = Depends(get_current_user_email)
):
    """Generate thinking and optimization suggestions for a prompt using GEPA insights"""
    try:
        # Log the access for audit purposes
        print(f"GEPA think analysis requested by: {current_user_email}")

        result = await service.gepa_think(
            prompt=request.prompt,
            context=request.context,
            optimization_goal=request.optimization_goal
        )

        # Add user metadata to result
        result["accessed_by"] = current_user_email
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/auth/token")
async def generate_token(request: TokenRequest):
    """Generate access token for authorized user"""
    try:
        token = auth_middleware.create_access_token(request.email)
        return {
            "access_token": token,
            "token_type": "bearer",
            "expires_in_hours": 24,
            "email": request.email
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Token generation failed: {str(e)}")


@router.get("/auth/verify")
async def verify_token(current_user_email: str = Depends(get_current_user_email)):
    """Verify current token and return user info"""
    return {
        "email": current_user_email,
        "authorized": True,
        "message": "Token is valid"
    }


@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "prompt-optimizer"}