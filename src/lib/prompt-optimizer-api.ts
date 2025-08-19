export interface PromptTemplate {
  template: string;
  parameters: Record<string, any>;
}

export interface TrainingExample {
  inputs: Record<string, any>;
  expected_output: string;
}

export interface OptimizationRequest {
  prompt_template: PromptTemplate;
  training_data: TrainingExample[];
  metric?: string;
  strategy?: string;
  max_iterations?: number;
}

export interface OptimizedPrompt {
  original_template: string;
  optimized_template: string;
  dspy_signature?: string;
  dspy_history?: string;
  performance_score: number;
  optimization_history: Array<{
    step: number;
    strategy: string;
    action: string;
    metric_improvement: string;
  }>;
  metadata: {
    strategy: string;
    model: string;
    training_examples: number;
    validation_examples: number;
    dspy_version: string;
    signature: string;
  };
}

export interface OptimizationResult {
  request_id: string;
  status: string;
  optimized_prompt?: OptimizedPrompt;
  performance_score?: number;
  error_message?: string;
  created_at: string;
  completed_at?: string;
}

export interface DSPyTrace {
  example: number;
  inputs: Record<string, any>;
  prediction: Record<string, string>;
  reasoning_steps: string[];
  raw_prediction_object: string;
  dspy_history_output?: string;  // Full DSPy inspect_history output
  actual_prompt_sent?: string;  // Parsed prompt from history
  actual_response_received?: string;  // Parsed response from history
  llm_interaction?: {
    prompt_sent: string;
    response_received: string;
    model_used: string;
  };
  llm_messages?: Array<{
    role: string;
    content: string;
  }>;
  error?: string;
}

export interface EvaluationMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  total_examples: number;
  correct_predictions: number;
  predictions: string[];  // Actual AI predictions for user evaluation
  targets: string[];  // Expected outputs
  matches: number[];  // Which predictions matched (1 = match, 0 = no match)
  detailed_traces: DSPyTrace[];  // DSPy adapter-style traces
}

export interface ComparisonResult {
  original_metrics: EvaluationMetrics;
  optimized_metrics: EvaluationMetrics;
  improvements: Record<string, number>;
  test_examples_count: number;
}

const PROMPT_OPTIMIZER_BASE_URL = 'http://localhost:9090/api/v1';

class PromptOptimizerAPI {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${PROMPT_OPTIMIZER_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          errorMessage = errorData.detail;
        }
      } catch (e) {
        // Keep generic message if parsing fails
      }
      throw new Error(errorMessage);
    }

    return response.json();
  }

  async createOptimization(request: OptimizationRequest): Promise<{ request_id: string; status: string }> {
    return this.request('/optimize', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getOptimizationResult(requestId: string): Promise<OptimizationResult> {
    return this.request(`/optimize/${requestId}`);
  }

  async listOptimizationResults(limit = 10, offset = 0): Promise<OptimizationResult[]> {
    return this.request(`/optimize?limit=${limit}&offset=${offset}`);
  }

  async evaluatePrompt(prompt: string, testData: Array<{ inputs: Record<string, any>; expected_output: string }>): Promise<{ metrics: EvaluationMetrics }> {
    return this.request('/evaluate', {
      method: 'POST',
      body: JSON.stringify({ prompt, test_data: testData }),
    });
  }

  async comparePrompts(originalPrompt: string, optimizedPrompt: string, testData: Array<{ inputs: Record<string, any>; expected_output: string }>): Promise<ComparisonResult> {
    return this.request('/test-comparison', {
      method: 'POST',
      body: JSON.stringify({ 
        original_prompt: originalPrompt,
        optimized_prompt: optimizedPrompt,
        test_data: testData 
      }),
    });
  }

  async healthCheck(): Promise<{ status: string; service: string }> {
    return this.request('/health');
  }
}

export const promptOptimizerAPI = new PromptOptimizerAPI();