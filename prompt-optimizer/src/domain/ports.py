from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional
from .entities import OptimizationRequest, OptimizationResult, OptimizedPrompt


class PromptOptimizerPort(ABC):
    @abstractmethod
    async def optimize_prompt(self, request: OptimizationRequest) -> OptimizedPrompt:
        pass

    @abstractmethod
    async def evaluate_prompt(
        self, prompt: str, test_data: List[Dict[str, Any]]
    ) -> Dict[str, float]:
        pass


class OptimizationRepositoryPort(ABC):
    @abstractmethod
    async def save_optimization_result(self, result: OptimizationResult) -> None:
        pass

    @abstractmethod
    async def get_optimization_result(self, request_id: str) -> Optional[OptimizationResult]:
        pass

    @abstractmethod
    async def list_optimization_results(
        self, limit: int = 10, offset: int = 0
    ) -> List[OptimizationResult]:
        pass


class ModelProviderPort(ABC):
    @abstractmethod
    async def generate_response(self, prompt: str, **kwargs) -> str:
        pass

    @abstractmethod
    async def batch_generate(self, prompts: List[str], **kwargs) -> List[str]:
        pass