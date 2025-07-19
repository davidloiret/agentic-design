#!/usr/bin/env tsx

interface ChainStep {
  name: string;
  description: string;
  execute: (input: any) => Promise<any>;
}

interface ChainResult {
  stepName: string;
  input: any;
  output: any;
  duration: number;
  success: boolean;
  error?: string;
}

class SequentialChain {
  private steps: ChainStep[] = [];
  private results: ChainResult[] = [];

  addStep(step: ChainStep): void {
    this.steps.push(step);
  }

  async execute(initialInput: any): Promise<any> {
    console.log(`Starting sequential chain with ${this.steps.length} steps\n`);
    
    let currentInput = initialInput;
    this.results = [];

    for (let i = 0; i < this.steps.length; i++) {
      const step = this.steps[i];
      const startTime = Date.now();
      
      try {
        console.log(`Step ${i + 1}: ${step.name}`);
        console.log(`Description: ${step.description}`);
        console.log(`Input:`, currentInput);
        
        const output = await step.execute(currentInput);
        const duration = Date.now() - startTime;
        
        const result: ChainResult = {
          stepName: step.name,
          input: currentInput,
          output,
          duration,
          success: true
        };
        
        this.results.push(result);
        
        console.log(`Output:`, output);
        console.log(`Duration: ${duration}ms`);
        console.log('✅ Success\n');
        
        currentInput = output;
        
      } catch (error) {
        const duration = Date.now() - startTime;
        const result: ChainResult = {
          stepName: step.name,
          input: currentInput,
          output: null,
          duration,
          success: false,
          error: error instanceof Error ? error.message : String(error)
        };
        
        this.results.push(result);
        
        console.log(`❌ Error: ${result.error}`);
        console.log(`Duration: ${duration}ms\n`);
        
        throw new Error(`Chain failed at step "${step.name}": ${result.error}`);
      }
    }

    return currentInput;
  }

  getResults(): ChainResult[] {
    return [...this.results];
  }

  getExecutionSummary(): { 
    totalSteps: number, 
    successfulSteps: number, 
    totalDuration: number,
    averageDuration: number 
  } {
    const totalSteps = this.results.length;
    const successfulSteps = this.results.filter(r => r.success).length;
    const totalDuration = this.results.reduce((sum, r) => sum + r.duration, 0);
    const averageDuration = totalDuration / totalSteps;

    return { totalSteps, successfulSteps, totalDuration, averageDuration };
  }
}

// Example: Product Review Generation Chain
function createProductReviewChain(): SequentialChain {
  const chain = new SequentialChain();

  // Step 1: Research product features
  chain.addStep({
    name: 'Research Features',
    description: 'Analyze product features and specifications',
    execute: async (productName: string) => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      const features = {
        productName,
        keyFeatures: [
          'High-quality materials',
          'User-friendly interface',
          'Energy efficient',
          'Warranty included'
        ],
        price: '$99.99',
        rating: 4.2
      };
      
      return features;
    }
  });

  // Step 2: Competitor analysis
  chain.addStep({
    name: 'Competitor Analysis',
    description: 'Compare features with competitors',
    execute: async (productData: any) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const comparison = {
        ...productData,
        competitorComparison: {
          price: 'Average for category',
          features: 'Above average feature set',
          quality: 'Higher quality than most competitors',
          value: 'Good value for money'
        }
      };
      
      return comparison;
    }
  });

  // Step 3: Generate review draft
  chain.addStep({
    name: 'Generate Review',
    description: 'Create initial review based on analysis',
    execute: async (analysisData: any) => {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const review = {
        ...analysisData,
        reviewText: `The ${analysisData.productName} offers an impressive feature set at ${analysisData.price}. ` +
                   `With its ${analysisData.keyFeatures.join(', ')}, it stands out in the market. ` +
                   `${analysisData.competitorComparison.value} and ${analysisData.competitorComparison.quality}.`,
        rating: analysisData.rating,
        recommendation: analysisData.rating >= 4.0 ? 'Recommended' : 'Consider alternatives'
      };
      
      return review;
    }
  });

  // Step 4: Polish and finalize
  chain.addStep({
    name: 'Polish Review',
    description: 'Improve clarity and tone of the review',
    execute: async (reviewData: any) => {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const polishedReview = {
        ...reviewData,
        finalReview: `⭐ ${reviewData.rating}/5 - ${reviewData.recommendation}\n\n` +
                    reviewData.reviewText + '\n\n' +
                    `💰 Price: ${reviewData.price}\n` +
                    `🔥 Key Features: ${reviewData.keyFeatures.join(', ')}\n` +
                    `📊 Market Position: ${reviewData.competitorComparison.value}`,
        publishReady: true
      };
      
      return polishedReview;
    }
  });

  return chain;
}

// Usage example
async function main() {
  try {
    const chain = createProductReviewChain();
    
    const productName = "Smart Widget Pro";
    console.log(`Creating review for: ${productName}\n`);
    
    const result = await chain.execute(productName);
    
    console.log('=== Final Result ===');
    console.log(result.finalReview);
    
    console.log('\n=== Execution Summary ===');
    const summary = chain.getExecutionSummary();
    console.log(`Total steps: ${summary.totalSteps}`);
    console.log(`Successful steps: ${summary.successfulSteps}`);
    console.log(`Total duration: ${summary.totalDuration}ms`);
    console.log(`Average step duration: ${summary.averageDuration.toFixed(1)}ms`);
    
  } catch (error) {
    console.error('Chain execution failed:', error);
  }
}

if (require.main === module) {
  main();
}

export { SequentialChain, ChainStep, ChainResult };