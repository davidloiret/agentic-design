from functools import lru_cache
from .core.config import Settings, settings
from .core.optimization_service import OptimizationService
from ..infrastructure.advanced_dspy_optimizer import AdvancedDSPyOptimizer
from ..infrastructure.memory_repository import InMemoryOptimizationRepository


@lru_cache()
def get_settings() -> Settings:
    return settings


@lru_cache()
def get_prompt_optimizer() -> AdvancedDSPyOptimizer:
    settings = get_settings()
    return AdvancedDSPyOptimizer(
        openai_api_key=settings.openai_api_key,
        anthropic_api_key=settings.anthropic_api_key,
        default_model=settings.default_model
    )


@lru_cache()
def get_optimization_repository() -> InMemoryOptimizationRepository:
    return InMemoryOptimizationRepository()


@lru_cache()
def get_optimization_service() -> OptimizationService:
    optimizer = get_prompt_optimizer()
    repository = get_optimization_repository()
    settings = get_settings()
    return OptimizationService(optimizer, repository, settings)