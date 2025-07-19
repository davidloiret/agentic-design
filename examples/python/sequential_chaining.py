#!/usr/bin/env python3

from dataclasses import dataclass
from typing import List, Dict, Any, Callable, Optional, Awaitable
import asyncio
import time
from abc import ABC, abstractmethod

@dataclass
class ChainStep:
    name: str
    description: str
    execute: Callable[[Any], Any]
    is_async: bool = False

@dataclass
class ChainResult:
    step_name: str
    input_data: Any
    output_data: Any
    duration: float
    success: bool
    error: Optional[str] = None

class SequentialChain:
    """
    Sequential chain processor that executes steps in order.
    """
    
    def __init__(self):
        self.steps: List[ChainStep] = []
        self.results: List[ChainResult] = []
    
    def add_step(self, step: ChainStep):
        """Add a step to the chain."""
        self.steps.append(step)
    
    def add_function_step(self, name: str, description: str, func: Callable[[Any], Any], is_async: bool = False):
        """Add a function as a step."""
        step = ChainStep(name=name, description=description, execute=func, is_async=is_async)
        self.add_step(step)
    
    async def execute(self, initial_input: Any) -> Any:
        """Execute the chain sequentially."""
        print(f"Starting sequential chain with {len(self.steps)} steps\n")
        
        current_input = initial_input
        self.results = []
        
        for i, step in enumerate(self.steps):
            start_time = time.time()
            
            try:
                print(f"Step {i + 1}: {step.name}")
                print(f"Description: {step.description}")
                print(f"Input: {current_input}")
                
                if step.is_async:
                    output = await step.execute(current_input)
                else:
                    output = step.execute(current_input)
                
                duration = time.time() - start_time
                
                result = ChainResult(
                    step_name=step.name,
                    input_data=current_input,
                    output_data=output,
                    duration=duration,
                    success=True
                )
                
                self.results.append(result)
                
                print(f"Output: {output}")
                print(f"Duration: {duration:.3f}s")
                print('✅ Success\n')
                
                current_input = output
                
            except Exception as error:
                duration = time.time() - start_time
                result = ChainResult(
                    step_name=step.name,
                    input_data=current_input,
                    output_data=None,
                    duration=duration,
                    success=False,
                    error=str(error)
                )
                
                self.results.append(result)
                
                print(f"❌ Error: {str(error)}")
                print(f"Duration: {duration:.3f}s\n")
                
                raise Exception(f"Chain failed at step '{step.name}': {str(error)}")
        
        return current_input
    
    def execute_sync(self, initial_input: Any) -> Any:
        """Execute the chain synchronously (for non-async steps)."""
        return asyncio.run(self.execute(initial_input))
    
    def get_results(self) -> List[ChainResult]:
        """Get all execution results."""
        return self.results.copy()
    
    def get_execution_summary(self) -> Dict[str, Any]:
        """Get execution summary statistics."""
        if not self.results:
            return {}
        
        total_steps = len(self.results)
        successful_steps = sum(1 for r in self.results if r.success)
        total_duration = sum(r.duration for r in self.results)
        average_duration = total_duration / total_steps
        
        return {
            'total_steps': total_steps,
            'successful_steps': successful_steps,
            'success_rate': (successful_steps / total_steps) * 100,
            'total_duration': total_duration,
            'average_duration': average_duration
        }
    
    def print_summary(self):
        """Print execution summary."""
        summary = self.get_execution_summary()
        if summary:
            print("=== Execution Summary ===")
            print(f"Total steps: {summary['total_steps']}")
            print(f"Successful steps: {summary['successful_steps']}")
            print(f"Success rate: {summary['success_rate']:.1f}%")
            print(f"Total duration: {summary['total_duration']:.3f}s")
            print(f"Average step duration: {summary['average_duration']:.3f}s")

class ProductReviewChain(SequentialChain):
    """Specialized chain for generating product reviews."""
    
    def __init__(self):
        super().__init__()
        self._setup_review_steps()
    
    def _setup_review_steps(self):
        """Setup steps for product review generation."""
        
        # Step 1: Research product features
        self.add_function_step(
            "Research Features",
            "Analyze product features and specifications",
            self._research_features
        )
        
        # Step 2: Competitor analysis
        self.add_function_step(
            "Competitor Analysis", 
            "Compare features with competitors",
            self._competitor_analysis
        )
        
        # Step 3: Generate review draft
        self.add_function_step(
            "Generate Review",
            "Create initial review based on analysis",
            self._generate_review
        )
        
        # Step 4: Polish and finalize
        self.add_function_step(
            "Polish Review",
            "Improve clarity and tone of the review",
            self._polish_review
        )
    
    def _research_features(self, product_name: str) -> Dict[str, Any]:
        """Research product features (simulated)."""
        time.sleep(0.5)  # Simulate API call
        
        features = {
            'product_name': product_name,
            'key_features': [
                'High-quality materials',
                'User-friendly interface', 
                'Energy efficient',
                'Warranty included'
            ],
            'price': '$99.99',
            'rating': 4.2,
            'category': 'Electronics'
        }
        
        return features
    
    def _competitor_analysis(self, product_data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze competitors (simulated)."""
        time.sleep(0.3)
        
        comparison = {
            **product_data,
            'competitor_comparison': {
                'price': 'Average for category',
                'features': 'Above average feature set',
                'quality': 'Higher quality than most competitors',
                'value': 'Good value for money',
                'market_position': 'Top 25% in category'
            }
        }
        
        return comparison
    
    def _generate_review(self, analysis_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate initial review."""
        time.sleep(0.4)
        
        features_text = ', '.join(analysis_data['key_features'])
        comparison = analysis_data['competitor_comparison']
        
        review_text = (
            f"The {analysis_data['product_name']} offers an impressive feature set at {analysis_data['price']}. "
            f"With its {features_text}, it stands out in the market. "
            f"{comparison['value']} and {comparison['quality']}. "
            f"The product maintains a {comparison['market_position']} position in its category."
        )
        
        review = {
            **analysis_data,
            'review_text': review_text,
            'rating': analysis_data['rating'],
            'recommendation': 'Recommended' if analysis_data['rating'] >= 4.0 else 'Consider alternatives'
        }
        
        return review
    
    def _polish_review(self, review_data: Dict[str, Any]) -> Dict[str, Any]:
        """Polish and finalize the review."""
        time.sleep(0.2)
        
        rating_stars = '⭐' * int(review_data['rating'])
        
        final_review = (
            f"{rating_stars} {review_data['rating']}/5 - {review_data['recommendation']}\n\n"
            f"{review_data['review_text']}\n\n"
            f"💰 Price: {review_data['price']}\n"
            f"🔥 Key Features: {', '.join(review_data['key_features'])}\n"
            f"📊 Market Position: {review_data['competitor_comparison']['market_position']}\n"
            f"💎 Value Assessment: {review_data['competitor_comparison']['value']}"
        )
        
        polished_review = {
            **review_data,
            'final_review': final_review,
            'publish_ready': True,
            'word_count': len(final_review.split()),
            'sentiment': 'positive' if review_data['rating'] >= 4.0 else 'neutral'
        }
        
        return polished_review

class DataProcessingChain(SequentialChain):
    """Chain for data processing workflows."""
    
    def __init__(self):
        super().__init__()
        self._setup_data_steps()
    
    def _setup_data_steps(self):
        """Setup data processing steps."""
        
        self.add_function_step(
            "Load Data",
            "Load and validate input data",
            self._load_data
        )
        
        self.add_function_step(
            "Clean Data",
            "Clean and normalize data",
            self._clean_data
        )
        
        self.add_function_step(
            "Transform Data",
            "Apply transformations and calculations",
            self._transform_data
        )
        
        self.add_function_step(
            "Validate Results",
            "Validate processed data quality",
            self._validate_results
        )
    
    def _load_data(self, data_source: str) -> Dict[str, Any]:
        """Load data from source."""
        time.sleep(0.2)
        
        # Simulate loading data
        mock_data = {
            'source': data_source,
            'records': [
                {'id': 1, 'value': 100, 'category': 'A'},
                {'id': 2, 'value': 200, 'category': 'B'},
                {'id': 3, 'value': 150, 'category': 'A'},
                {'id': 4, 'value': 300, 'category': 'C'},
            ],
            'metadata': {
                'total_records': 4,
                'loaded_at': time.time()
            }
        }
        
        return mock_data
    
    def _clean_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Clean and normalize data."""
        time.sleep(0.3)
        
        # Simulate data cleaning
        cleaned_records = []
        for record in data['records']:
            if record['value'] > 0:  # Remove invalid records
                cleaned_record = {
                    'id': record['id'],
                    'value': round(record['value'], 2),
                    'category': record['category'].upper()
                }
                cleaned_records.append(cleaned_record)
        
        cleaned_data = {
            **data,
            'records': cleaned_records,
            'metadata': {
                **data['metadata'],
                'cleaned_records': len(cleaned_records),
                'removed_records': len(data['records']) - len(cleaned_records)
            }
        }
        
        return cleaned_data
    
    def _transform_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Transform and aggregate data."""
        time.sleep(0.4)
        
        records = data['records']
        
        # Calculate aggregates
        total_value = sum(record['value'] for record in records)
        avg_value = total_value / len(records) if records else 0
        
        # Group by category
        category_sums = {}
        for record in records:
            category = record['category']
            category_sums[category] = category_sums.get(category, 0) + record['value']
        
        transformed_data = {
            **data,
            'aggregates': {
                'total_value': total_value,
                'average_value': avg_value,
                'category_breakdown': category_sums,
                'record_count': len(records)
            }
        }
        
        return transformed_data
    
    def _validate_results(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Validate the processed data."""
        time.sleep(0.1)
        
        validation_results = {
            'data_integrity': True,
            'completeness': len(data['records']) > 0,
            'consistency': all(record['value'] >= 0 for record in data['records']),
            'aggregate_accuracy': abs(data['aggregates']['total_value'] - 
                                    sum(r['value'] for r in data['records'])) < 0.01
        }
        
        validated_data = {
            **data,
            'validation': validation_results,
            'quality_score': sum(validation_results.values()) / len(validation_results)
        }
        
        return validated_data

async def main():
    """Main function demonstrating different chain types."""
    
    print("=== Product Review Chain ===")
    try:
        review_chain = ProductReviewChain()
        product_name = "Smart Widget Pro"
        
        print(f"Creating review for: {product_name}\n")
        result = await review_chain.execute(product_name)
        
        print("=== Final Result ===")
        print(result['final_review'])
        print()
        review_chain.print_summary()
        
    except Exception as error:
        print(f"Review chain failed: {error}")
    
    print("\n" + "="*50 + "\n")
    
    print("=== Data Processing Chain ===")
    try:
        data_chain = DataProcessingChain()
        data_source = "sales_data.csv"
        
        print(f"Processing data from: {data_source}\n")
        result = await data_chain.execute(data_source)
        
        print("=== Final Result ===")
        print(f"Processed {result['aggregates']['record_count']} records")
        print(f"Total value: ${result['aggregates']['total_value']}")
        print(f"Average value: ${result['aggregates']['average_value']:.2f}")
        print(f"Quality score: {result['quality_score']:.1%}")
        print()
        data_chain.print_summary()
        
    except Exception as error:
        print(f"Data processing chain failed: {error}")

if __name__ == "__main__":
    asyncio.run(main())