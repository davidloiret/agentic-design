from typing import Dict, List, Optional, Any
from ..domain.entities import OptimizationResult
from ..domain.ports import OptimizationRepositoryPort


class InMemoryOptimizationRepository(OptimizationRepositoryPort):
    def __init__(self):
        self._storage: Dict[str, OptimizationResult] = {}
        self._predictor_cache: Dict[str, Any] = {}  # Cache for DSPy predictors

    async def save_optimization_result(self, result: OptimizationResult) -> None:
        self._storage[result.request_id] = result

    async def get_optimization_result(self, request_id: str) -> Optional[OptimizationResult]:
        return self._storage.get(request_id)

    async def list_optimization_results(
        self, limit: int = 10, offset: int = 0
    ) -> List[OptimizationResult]:
        all_results = list(self._storage.values())
        
        all_results.sort(key=lambda x: x.created_at, reverse=True)
        
        return all_results[offset:offset + limit]

    def save_optimized_predictor(self, request_id: str, predictor: Any) -> None:
        """Store the optimized DSPy predictor for later use"""
        self._predictor_cache[request_id] = predictor

    def get_optimized_predictor(self, request_id: str) -> Optional[Any]:
        """Retrieve the optimized DSPy predictor"""
        return self._predictor_cache.get(request_id)