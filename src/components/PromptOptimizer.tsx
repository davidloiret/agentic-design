'use client';

import { useState } from 'react';
import { promptOptimizerAPI, type OptimizationRequest, type OptimizationResult, type TrainingExample, type OptimizedPrompt, type ComparisonResult, type DSPyTrace } from '@/lib/prompt-optimizer-api';
import { Wand2, Plus, Trash2, Copy, Info, Sparkles, Target, Brain, Lightbulb, ChevronDown, ChevronRight, Code2, FileText, Download } from 'lucide-react';

export default function PromptOptimizer() {
  const [promptTemplate, setPromptTemplate] = useState('');
  const [trainingExamples, setTrainingExamples] = useState<TrainingExample[]>([]);
  const [newExample, setNewExample] = useState({ inputs: '', expected_output: '' });
  const [optimizationResults, setOptimizationResults] = useState<OptimizationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExamples, setShowExamples] = useState(false);
  const [testResults, setTestResults] = useState<ComparisonResult | null>(null);
  const [testingLoading, setTestingLoading] = useState(false);
  const [customTestData, setCustomTestData] = useState<TrainingExample[]>([]);
  const [newTestExample, setNewTestExample] = useState({ inputs: '', expected_output: '' });
  const [useCustomTestData, setUseCustomTestData] = useState(false);
  const [tryItMode, setTryItMode] = useState<{ requestId: string; result: any } | null>(null);
  const [tryItInputs, setTryItInputs] = useState<Record<string, string>>({});
  const [tryItPrediction, setTryItPrediction] = useState<any>(null);
  const [tryItLoading, setTryItLoading] = useState(false);

  // Example templates
  const exampleTemplates = [
    {
      name: "Multi-hop Reasoning (Complex QA)",
      template: "Answer the question using the given context. Think step by step.\n\nContext: {context}\nQuestion: {question}\nAnswer:",
      examples: [
        { inputs: '{"context": "Sarah owns a bakery. Her bakery produces 120 croissants daily. Each croissant costs $3. On weekends, she increases production by 50%.", "question": "How much revenue does Sarah make from croissants on a weekend day?"}', expected_output: "$540" },
        { inputs: '{"context": "The conference has 3 sessions. Session A has 45 attendees, Session B has 30% more than A, and Session C has twice as many as B.", "question": "What is the total number of attendees across all sessions?"}', expected_output: "213" },
        { inputs: '{"context": "A train leaves Station A at 2 PM traveling at 60 mph. Another train leaves Station B (180 miles away) at 3 PM traveling at 90 mph toward Station A.", "question": "At what time will the trains meet?"}', expected_output: "4:12 PM" },
        { inputs: '{"context": "Company X had $2M revenue in Q1. Q2 saw a 15% increase, Q3 decreased by 10% from Q2, and Q4 increased by 20% from Q3.", "question": "What was the total revenue for the year?"}', expected_output: "$8.856M" },
        { inputs: '{"context": "A recipe needs 2 cups of flour for 12 cookies. You want to make 30 cookies but only have 4 cups of flour.", "question": "Do you have enough flour, and if not, how much more do you need?"}', expected_output: "Not enough. You need 1 more cup of flour." }
      ]
    },
    {
      name: "Logical Reasoning",
      template: "Based on the given facts, answer the question with logical reasoning.\n\nFacts: {facts}\nQuestion: {question}\nAnswer:",
      examples: [
        { inputs: '{"facts": "All programmers know Python. Sam is a programmer. Python is a programming language.", "question": "Does Sam know Python?"}', expected_output: "Yes" },
        { inputs: '{"facts": "If it rains, the grass gets wet. The grass is not wet. It might rain tomorrow.", "question": "Did it rain today?"}', expected_output: "No" },
        { inputs: '{"facts": "Every student who studies hard passes the exam. John studied hard. Mary did not study.", "question": "Will John pass the exam?"}', expected_output: "Yes" },
        { inputs: '{"facts": "All birds can fly except penguins. Tweety is a bird. Tweety lives in Antarctica.", "question": "Can Tweety fly?"}', expected_output: "Cannot determine (could be a penguin or another Antarctic bird)" },
        { inputs: '{"facts": "The meeting is at 3 PM or 4 PM. If it\'s at 3 PM, Tom will attend. Tom is not attending.", "question": "When is the meeting?"}', expected_output: "4 PM" }
      ]
    },
    {
      name: "Code Explanation & Generation",
      template: "Given the programming task, provide the solution with explanation.\n\nTask: {task}\nConstraints: {constraints}\nSolution:",
      examples: [
        { inputs: '{"task": "Find the second largest number in an array", "constraints": "O(n) time complexity, handle duplicates"}', expected_output: "def second_largest(arr):\n    if len(arr) < 2: return None\n    first = second = float('-inf')\n    for num in arr:\n        if num > first:\n            second = first\n            first = num\n        elif first > num > second:\n            second = num\n    return second if second != float('-inf') else None" },
        { inputs: '{"task": "Check if a string has balanced parentheses", "constraints": "Must handle (), [], and {} brackets"}', expected_output: "def is_balanced(s):\n    stack = []\n    pairs = {'(': ')', '[': ']', '{': '}'}\n    for char in s:\n        if char in pairs:\n            stack.append(char)\n        elif char in pairs.values():\n            if not stack or pairs[stack.pop()] != char:\n                return False\n    return len(stack) == 0" },
        { inputs: '{"task": "Implement a basic LRU cache", "constraints": "O(1) get and put operations"}', expected_output: "from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.cache = OrderedDict()\n        self.capacity = capacity\n    \n    def get(self, key):\n        if key in self.cache:\n            self.cache.move_to_end(key)\n            return self.cache[key]\n        return -1\n    \n    def put(self, key, value):\n        self.cache[key] = value\n        self.cache.move_to_end(key)\n        if len(self.cache) > self.capacity:\n            self.cache.popitem(last=False)" }
      ]
    },
    {
      name: "Text Classification",
      template: "Classify the sentiment of the following text as positive, negative, or neutral.\n\nText: {text}\nSentiment:",
      examples: [
        { inputs: '{"text": "I love this product! Best purchase ever!"}', expected_output: "positive" },
        { inputs: '{"text": "This is terrible. I want my money back."}', expected_output: "negative" },
        { inputs: '{"text": "The package arrived on time."}', expected_output: "neutral" },
        { inputs: '{"text": "Amazing service, highly recommend!"}', expected_output: "positive" },
        { inputs: '{"text": "Disappointed with the quality."}', expected_output: "negative" },
        { inputs: '{"text": "It works as described."}', expected_output: "neutral" }
      ]
    },
    {
      name: "Code Generation",
      template: "Generate Python code for the following task:\n\nTask: {task}\nCode:",
      examples: [
        { inputs: '{"task": "Create a function that adds two numbers"}', expected_output: "def add_numbers(a, b):\n    return a + b" },
        { inputs: '{"task": "Write a function to reverse a string"}', expected_output: "def reverse_string(s):\n    return s[::-1]" },
        { inputs: '{"task": "Create a function that checks if a number is even"}', expected_output: "def is_even(n):\n    return n % 2 == 0" },
        { inputs: '{"task": "Write a function to find the maximum in a list"}', expected_output: "def find_max(lst):\n    return max(lst)" },
        { inputs: '{"task": "Create a function that counts vowels in a string"}', expected_output: "def count_vowels(s):\n    return sum(1 for c in s.lower() if c in 'aeiou')" }
      ]
    },
    {
      name: "Math Word Problems",
      template: "Solve the following math word problem step by step.\n\nProblem: {problem}\nSolution:",
      examples: [
        { inputs: '{"problem": "If John has 5 apples and Mary gives him 3 more, how many apples does John have?"}', expected_output: "8" },
        { inputs: '{"problem": "A train travels 60 miles in 2 hours. What is its average speed?"}', expected_output: "30 miles per hour" },
        { inputs: '{"problem": "If a shirt costs $20 and is on sale for 25% off, what is the sale price?"}', expected_output: "$15" },
        { inputs: '{"problem": "Sarah reads 20 pages per day. How many pages will she read in a week?"}', expected_output: "140 pages" }
      ]
    },
    {
      name: "Text Summarization",
      template: "Summarize the following text in one sentence.\n\nText: {text}\nSummary:",
      examples: [
        { inputs: '{"text": "The meeting was held on Tuesday at 3 PM. We discussed the quarterly sales report and planned the marketing strategy for next month. All team members were present and contributed valuable insights."}', expected_output: "The team met to review quarterly sales and plan next month's marketing strategy." },
        { inputs: '{"text": "Scientists have discovered a new species of butterfly in the Amazon rainforest. The butterfly has unique blue and gold patterns on its wings and is only found in a specific region of Brazil."}', expected_output: "A new butterfly species with blue and gold wings was discovered in the Brazilian Amazon." },
        { inputs: '{"text": "The company announced record profits for the third quarter, driven by strong sales in the Asian market and cost-cutting measures implemented earlier this year."}', expected_output: "The company achieved record Q3 profits through Asian market growth and cost reductions." }
      ]
    },
    {
      name: "Data Extraction from Messy Text",
      template: "Extract structured information from the unstructured text.\n\nText: {text}\nExtract: {extract_fields}\nOutput:",
      examples: [
        { inputs: '{"text": "Hey! Just wanted to let you know that the meeting has been moved to next Tuesday at 2:30 PM in conference room B. Also, don\'t forget to bring the Q3 reports - Sarah needs them for the budget review.", "extract_fields": "meeting_date, meeting_time, location, required_items, person_mentioned"}', expected_output: "meeting_date: next Tuesday\nmeeting_time: 2:30 PM\nlocation: conference room B\nrequired_items: Q3 reports\nperson_mentioned: Sarah" },
        { inputs: '{"text": "Order #12345 - Customer Jane Smith (jane@email.com) purchased 3x Blue Widget ($29.99 each) and 1x Red Gadget ($45.00). Ship to: 123 Main St, Apt 4B, NYC 10001. Express shipping requested.", "extract_fields": "order_id, customer_name, email, items_ordered, total_amount, shipping_address, shipping_type"}', expected_output: "order_id: 12345\ncustomer_name: Jane Smith\nemail: jane@email.com\nitems_ordered: 3x Blue Widget, 1x Red Gadget\ntotal_amount: $134.97\nshipping_address: 123 Main St, Apt 4B, NYC 10001\nshipping_type: Express" },
        { inputs: '{"text": "Bug Report: Login page crashes on Chrome v98.0.4758.102 when user enters email with special chars. Steps: 1) Go to login 2) Enter test+user@domain.com 3) Click submit. Error: Uncaught TypeError at line 245.", "extract_fields": "issue_type, affected_page, browser_version, reproduction_steps, error_message"}', expected_output: "issue_type: Bug Report\naffected_page: Login page\nbrowser_version: Chrome v98.0.4758.102\nreproduction_steps: 1) Go to login 2) Enter test+user@domain.com 3) Click submit\nerror_message: Uncaught TypeError at line 245" }
      ]
    },
    {
      name: "Complex Instruction Following",
      template: "Follow the instructions precisely to transform the input.\n\nInput: {input}\nInstructions: {instructions}\nOutput:",
      examples: [
        { inputs: '{"input": "The quick brown fox jumps over the lazy dog", "instructions": "1. Count the number of words. 2. Replace all vowels with asterisks. 3. Reverse the entire string. 4. Add the word count at the end."}', expected_output: "g*d yz*l *ht r*v* spm*j x*f nw*rb kc**q *hT 9" },
        { inputs: '{"input": "2023-11-15", "instructions": "1. Convert to day name. 2. Add 10 days. 3. Format as \'Month DD, YYYY\'. 4. Calculate days until end of year."}', expected_output: "November 25, 2023 (36 days until end of year)" },
        { inputs: '{"input": "[5, 2, 8, 1, 9]", "instructions": "1. Sort ascending. 2. Calculate mean. 3. Remove values below mean. 4. Double remaining values. 5. Return as comma-separated string."}', expected_output: "10, 16, 18" }
      ]
    }
  ];

  const loadExampleTemplate = (template: typeof exampleTemplates[0], loadAll: boolean = true) => {
    setPromptTemplate(template.template);
    if (loadAll) {
      setTrainingExamples([]); // Clear existing examples
      // Load all examples for this template
      const loadedExamples: TrainingExample[] = [];
      template.examples.forEach(example => {
        try {
          const inputs = JSON.parse(example.inputs);
          loadedExamples.push({ inputs, expected_output: example.expected_output });
        } catch (e) {
          console.error('Failed to parse example:', e);
        }
      });
      setTrainingExamples(loadedExamples);
    } else {
      // Just set the first example in the form
      if (template.examples.length > 0) {
        setNewExample(template.examples[0]);
      }
    }
    setShowExamples(false);
  };

  const addTrainingExample = () => {
    if (newExample.inputs && newExample.expected_output) {
      try {
        const inputs = JSON.parse(newExample.inputs);
        setTrainingExamples([...trainingExamples, { inputs, expected_output: newExample.expected_output }]);
        setNewExample({ inputs: '', expected_output: '' });
      } catch (e) {
        setError('Invalid JSON in inputs field');
      }
    }
  };

  const removeTrainingExample = (index: number) => {
    setTrainingExamples(trainingExamples.filter((_, i) => i !== index));
  };

  const addCustomTestExample = () => {
    if (newTestExample.inputs && newTestExample.expected_output) {
      try {
        const inputs = JSON.parse(newTestExample.inputs);
        setCustomTestData([...customTestData, { inputs, expected_output: newTestExample.expected_output }]);
        setNewTestExample({ inputs: '', expected_output: '' });
      } catch (e) {
        setError('Invalid JSON in test inputs field');
      }
    }
  };

  const removeCustomTestExample = (index: number) => {
    setCustomTestData(customTestData.filter((_, i) => i !== index));
  };

  // Helper to analyze prompt performance
  const analyzePromptQuality = (prompt: string) => {
    if (!prompt) return { score: 0, suggestions: [] };

    const suggestions = [];
    let score = 0.5; // Base score

    // Check for clear instructions
    if (prompt.length > 50) score += 0.1;

    // Check for examples
    if (prompt.toLowerCase().includes('example')) {
      score += 0.2;
    } else {
      suggestions.push('Consider adding examples to clarify expectations');
    }

    // Check for step-by-step instructions
    if (/\b(step|first|then|finally|1\.|2\.|3\.)\b/i.test(prompt)) {
      score += 0.1;
    } else {
      suggestions.push('Consider adding step-by-step instructions');
    }

    // Check for output format specification
    if (/\b(format|output|structure)\b/i.test(prompt)) {
      score += 0.1;
    } else {
      suggestions.push('Specify the desired output format');
    }

    return { score: Math.min(1.0, score), suggestions };
  };

  const tryOptimizedPrompt = async () => {
    if (!tryItMode) return;
    
    setTryItLoading(true);
    setError(null);
    
    try {
      const result = await promptOptimizerAPI.predictWithComparison(
        tryItMode.requestId,
        tryItInputs
      );
      setTryItPrediction(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Prediction failed');
    } finally {
      setTryItLoading(false);
    }
  };

  const initializeTryItMode = (requestId: string, result: any) => {
    setTryItMode({ requestId, result });
    setTryItPrediction(null);
    
    // Extract input fields from the prompt template
    const template = result.optimized_prompt?.original_template || '';
    const fieldMatches = template.match(/\{(\w+)\}/g) || [];
    const fields = fieldMatches.map((match: string) => match.slice(1, -1));
    
    const initialInputs: Record<string, string> = {};
    fields.forEach(field => {
      initialInputs[field] = '';
    });
    setTryItInputs(initialInputs);
  };

  const downloadPredictor = async (requestId: string) => {
    try {
      const predictorData = await promptOptimizerAPI.exportPredictor(requestId);
      
      // Create a blob from the JSON data
      const blob = new Blob([JSON.stringify(predictorData, null, 2)], { type: 'application/json' });
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `predictor-${requestId}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to download predictor');
    }
  };

  const optimizePrompt = async () => {
    if (!promptTemplate || trainingExamples.length === 0) {
      setError('Please provide a prompt template and at least one training example');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Extract input and output variables from template
      const inputMatches = promptTemplate.match(/\{(\w+)\}/g) || [];
      const inputVariables = inputMatches.map((match: string) => match.slice(1, -1));
      const outputVariables = ['answer']; // Default output variable

      const gepaRequest = {
        prompt: promptTemplate,
        input_variables: inputVariables,
        output_variables: outputVariables,
        training_examples: trainingExamples,
        validation_examples: trainingExamples.slice(0, 3), // Use first 3 for validation
        max_generations: 20,
        population_size: 12,
        objectives: ['performance', 'clarity', 'efficiency']
      };

      // Use the GEPA optimization endpoint
      const response = await fetch('/api/v1/gepa-optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gepaRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Convert GEPA result to the expected format
      const optimizationResult = {
        request_id: `gepa_${Date.now()}`,
        status: 'completed',
        created_at: new Date().toISOString(),
        completed_at: new Date().toISOString(),
        optimized_prompt: {
          original_template: promptTemplate,
          optimized_template: result.optimized_prompt,
          performance_score: result.objectives?.performance || 0.8,
          optimization_history: result.evolution_history || [],
          metadata: result.config || {} // Add missing metadata property
        },
        performance_score: result.objectives?.performance || 0.8,
        // Add GEPA specific metadata
        gepa_metadata: {
          objectives: result.objectives,
          generation: result.generation,
          pareto_front_size: result.pareto_front_size,
          alternative_solutions: result.alternative_solutions || [],
          mutation_history: result.mutation_history || []
        }
      };

      setOptimizationResults([optimizationResult, ...optimizationResults]);

    } catch (e) {
      setError(e instanceof Error ? e.message : 'GEPA optimization failed');
    } finally {
      setLoading(false);
    }
  };

  // Add GEPA Think function
  const gepaThink = async () => {
    if (!promptTemplate) {
      setError('Please provide a prompt template to analyze');
      return;
    }

    try {
      const thinkRequest = {
        prompt: promptTemplate,
        context: 'Prompt optimization analysis',
        optimization_goal: 'general'
      };

      const response = await fetch('/api/v1/gepa-think', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(thinkRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Show thinking results in a modal or expandable section
      alert(`GEPA Analysis:\n\nOptimization Potential: ${result.analysis?.optimization_potential || 'medium'}\n\nKey Suggestions:\n${result.suggestions?.structural_improvements?.join('\n') || 'None'}\n\nRecommended Approach:\n${result.recommended_approach || 'Use GEPA evolutionary optimization'}`);

    } catch (e) {
      setError(e instanceof Error ? e.message : 'GEPA think analysis failed');
    }
  };

  const loadRecentResults = async () => {
    try {
      const results = await promptOptimizerAPI.listOptimizationResults();
      setOptimizationResults(results);
    } catch (e) {
      setError('Failed to load recent results');
    }
  };

  const testOptimizedPrompt = async (result: OptimizationResult) => {
    const testData = useCustomTestData ? customTestData : trainingExamples;
    if (!result.optimized_prompt || testData.length === 0) {
      setError(`Please provide ${useCustomTestData ? 'custom test data' : 'training examples'} to run tests`);
      return;
    }
    
    setTestingLoading(true);
    setError(null);
    
    try {
      const comparison = await promptOptimizerAPI.comparePrompts(
        result.optimized_prompt.original_template,
        result.optimized_prompt.optimized_template,
        testData
      );
      
      setTestResults(comparison);
    } catch (e) {
      setError(`Testing failed: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      setTestingLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mr-4">
            <Wand2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Prompt Optimizer
          </h1>
        </div>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Transform your prompts into high-performing AI interactions using GEPA (Generalized Evolutionary Prompt Adaptation)
        </p>

        {/* Quick stats/info */}
        <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-400">
          <div className="flex items-center">
            <Target className="w-4 h-4 mr-1" />
            <span>Multi-Objective</span>
          </div>
          <div className="flex items-center">
            <Brain className="w-4 h-4 mr-1" />
            <span>Evolutionary AI</span>
          </div>
          <div className="flex items-center">
            <Sparkles className="w-4 h-4 mr-1" />
            <span>Adaptive Learning</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Prompt Template Section */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Prompt Template</h2>
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="text-sm text-pink-600 hover:text-pink-700 flex items-center"
              >
                <Lightbulb className="w-4 h-4 mr-1" />
                Use Examples
              </button>
            </div>
            
            {showExamples && (
              <div className="mb-4 p-4 bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-300 mb-3">Choose a template to get started:</p>
                <div className="space-y-2">
                  {exampleTemplates.map((template, index) => (
                    <div key={index} className="p-3 bg-gray-600 rounded border border-gray-500">
                      <div className="font-medium text-white">{template.name}</div>
                      <div className="text-xs text-gray-300 truncate">{template.template.slice(0, 100)}...</div>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => loadExampleTemplate(template, true)}
                          className="flex-1 text-xs bg-pink-600 hover:bg-pink-700 text-white px-2 py-1 rounded transition-colors"
                        >
                          Load All {template.examples.length} Examples
                        </button>
                        <button
                          onClick={() => loadExampleTemplate(template, false)}
                          className="flex-1 text-xs bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded transition-colors"
                        >
                          Template Only
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <textarea
              className="w-full h-36 p-3 bg-gray-700 border border-gray-600 rounded-lg resize-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-colors text-white placeholder-gray-400"
              placeholder="Enter your prompt template here... Use {variable_name} for dynamic parts."
              value={promptTemplate}
              onChange={(e) => setPromptTemplate(e.target.value)}
            />
            <div className="mt-2 flex items-center text-xs text-gray-400">
              <Info className="w-3 h-3 mr-1" />
              Use placeholders like {'{context}'}, {'{question}'} that match your training data inputs
            </div>
          </div>

          {/* Training Examples Section */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Training Examples</h2>
              <div className="text-sm text-gray-400">
                {trainingExamples.length} example{trainingExamples.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Inputs (JSON Format)
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-colors text-white placeholder-gray-400"
                  placeholder='{"context": "example context", "question": "example question"}'
                  value={newExample.inputs}
                  onChange={(e) => setNewExample({ ...newExample, inputs: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expected Output
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-colors text-white placeholder-gray-400"
                  placeholder="Expected response from the AI"
                  value={newExample.expected_output}
                  onChange={(e) => setNewExample({ ...newExample, expected_output: e.target.value })}
                />
              </div>
              <button
                onClick={addTrainingExample}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Training Example
              </button>
            </div>

            {/* Training Examples List */}
            {trainingExamples.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {trainingExamples.map((example, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-700 to-gray-600 p-4 rounded-lg border-l-4 border-pink-400">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-2">
                        <div>
                          <div className="text-xs font-medium text-gray-400 mb-1">INPUTS</div>
                          <div className="text-sm text-gray-200 font-mono bg-gray-800 p-2 rounded border border-gray-600">
                            {JSON.stringify(example.inputs)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-400 mb-1">EXPECTED OUTPUT</div>
                          <div className="text-sm text-gray-200 bg-gray-800 p-2 rounded border border-gray-600">
                            {example.expected_output}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeTrainingExample(index)}
                        className="ml-3 text-red-400 hover:text-red-300 p-1 hover:bg-red-900/20 rounded transition-colors"
                        title="Remove example"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Brain className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                <p>No training examples yet</p>
                <p className="text-sm">Add examples to train your prompt optimizer</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-gray-600">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={optimizePrompt}
                  disabled={loading || !promptTemplate || trainingExamples.length === 0}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      GEPA Optimizing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      GEPA Optimize
                    </>
                  )}
                </button>
                <button
                  onClick={gepaThink}
                  disabled={!promptTemplate}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  GEPA Think
                </button>
                <button
                  onClick={loadRecentResults}
                  className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Load Results
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 text-red-300 rounded-lg flex items-center">
                <div className="w-5 h-5 text-red-400 mr-2">⚠️</div>
                <div>
                  <div className="font-medium">Error</div>
                  <div className="text-sm">{error}</div>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          
          {/* Custom Test Data Section */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Test Data</h2>
              <div className="flex items-center space-x-4">
                <label className="flex items-center text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={useCustomTestData}
                    onChange={(e) => setUseCustomTestData(e.target.checked)}
                    className="mr-2 rounded border-gray-600 bg-gray-700 text-pink-600 focus:ring-pink-400"
                  />
                  Use custom test data
                </label>
                <div className="text-sm text-gray-400">
                  {useCustomTestData ? customTestData.length : trainingExamples.length} test example{(useCustomTestData ? customTestData.length : trainingExamples.length) !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            
            {useCustomTestData ? (
              <div>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Test Inputs (JSON Format)
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-colors text-white placeholder-gray-400"
                      placeholder='{"context": "test context", "question": "test question"}'
                      value={newTestExample.inputs}
                      onChange={(e) => setNewTestExample({ ...newTestExample, inputs: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Expected Output
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-colors text-white placeholder-gray-400"
                      placeholder="Expected response from the AI"
                      value={newTestExample.expected_output}
                      onChange={(e) => setNewTestExample({ ...newTestExample, expected_output: e.target.value })}
                    />
                  </div>
                  <button
                    onClick={addCustomTestExample}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Test Example
                  </button>
                </div>

                {/* Custom Test Examples List */}
                {customTestData.length > 0 ? (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {customTestData.map((example, index) => (
                      <div key={index} className="bg-gradient-to-r from-blue-700 to-purple-600 p-4 rounded-lg border-l-4 border-blue-400">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 space-y-2">
                            <div>
                              <div className="text-xs font-medium text-gray-300 mb-1">TEST INPUTS</div>
                              <div className="text-sm text-gray-100 font-mono bg-gray-800 p-2 rounded border border-gray-600">
                                {JSON.stringify(example.inputs)}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-300 mb-1">EXPECTED OUTPUT</div>
                              <div className="text-sm text-gray-100 bg-gray-800 p-2 rounded border border-gray-600">
                                {example.expected_output}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeCustomTestExample(index)}
                            className="ml-3 text-red-300 hover:text-red-200 p-1 hover:bg-red-900/20 rounded transition-colors"
                            title="Remove test example"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Target className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                    <p>No custom test examples yet</p>
                    <p className="text-sm">Add test examples to evaluate your optimized prompts</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Brain className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                <p>Using training examples for testing</p>
                <p className="text-sm">Enable custom test data to add separate evaluation examples</p>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Optimization Results</h2>
              {optimizationResults.length > 0 && (
                <div className="text-sm text-gray-400">
                  {optimizationResults.length} result{optimizationResults.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
            
            {optimizationResults.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Ready to optimize!</h3>
                <p className="text-gray-400 mb-4">Add a prompt template and training examples to get started.</p>
                <div className="text-sm text-gray-500">
                  Results will appear here once optimization is complete
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {optimizationResults.map((result, index) => (
                  <div key={result.request_id} className="bg-gradient-to-r from-gray-700 to-gray-600 border border-gray-600 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-300">
                          ID: {result.request_id.slice(0, 8)}...
                        </span>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        result.status === 'completed' 
                          ? 'bg-green-500/20 text-green-300' 
                          : result.status === 'failed'
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {result.status.toUpperCase()}
                      </span>
                    </div>
                    
                    {result.optimized_prompt && (
                      <div className="mb-4 space-y-3">
                        <div className="flex items-center mb-2">
                          <Sparkles className="w-4 h-4 text-pink-400 mr-1" />
                          <span className="text-sm font-medium text-gray-300">Optimized Prompt</span>
                        </div>
                        
                        <div>
                          <div className="text-xs font-medium text-gray-400 mb-1">ORIGINAL TEMPLATE</div>
                          <div className="text-sm text-gray-200 bg-gray-800 p-3 rounded-lg border border-gray-600 font-mono">
                            {result.optimized_prompt.original_template}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs font-medium text-gray-400 mb-1">OPTIMIZED TEMPLATE (Human-Readable)</div>
                          <div className="text-sm text-gray-200 bg-gray-800 p-3 rounded-lg border border-gray-600 font-mono">
                            {result.optimized_prompt.optimized_template}
                          </div>
                        </div>
                        
                        {/* GEPA Evolution Information */}
                        {(result as any).gepa_metadata && (
                          <div>
                            <div className="text-xs font-medium text-gray-400 mb-1">GEPA EVOLUTIONARY METADATA</div>
                            <div className="text-sm text-gray-200 bg-gray-800 p-3 rounded-lg border border-gray-600 font-mono">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <strong>Generation:</strong> {(result as any).gepa_metadata.generation || 'N/A'}
                                </div>
                                <div>
                                  <strong>Pareto Front Size:</strong> {(result as any).gepa_metadata.pareto_front_size || 'N/A'}
                                </div>
                              </div>
                              {(result as any).gepa_metadata.objectives && (
                                <div className="mt-2">
                                  <strong>Objectives:</strong>
                                  <div className="grid grid-cols-3 gap-2 mt-1">
                                    {Object.entries((result as any).gepa_metadata.objectives).map(([key, value]) => (
                                      <div key={key} className="text-xs">
                                        <span className="capitalize">{key}:</span> {(value as number).toFixed(3)}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {(result as any).gepa_metadata.mutation_history && (result as any).gepa_metadata.mutation_history.length > 0 && (
                                <div className="mt-2">
                                  <strong>Mutations Applied:</strong> {(result as any).gepa_metadata.mutation_history.join(', ')}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Alternative Solutions from GEPA */}
                        {(result as any).gepa_metadata?.alternative_solutions && (result as any).gepa_metadata.alternative_solutions.length > 0 && (
                          <div>
                            <div className="text-xs font-medium text-gray-400 mb-1">ALTERNATIVE SOLUTIONS (Pareto Front)</div>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                              {(result as any).gepa_metadata.alternative_solutions.slice(0, 3).map((alt: any, idx: number) => (
                                <div key={idx} className="text-xs text-gray-200 bg-gray-800 p-2 rounded border border-gray-600">
                                  <div className="font-medium">Alternative {idx + 1}:</div>
                                  <div className="truncate">{alt.prompt}</div>
                                  <div className="text-gray-400">
                                    Fitness: {(alt.fitness as number).toFixed(3)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {result.optimized_prompt.optimization_history && result.optimized_prompt.optimization_history.length > 0 && (
                          <div>
                            <div className="text-xs font-medium text-gray-400 mb-1">OPTIMIZATION HISTORY</div>
                            <div className="space-y-2">
                              {result.optimized_prompt.optimization_history.map((step, idx) => (
                                <div key={idx} className="text-xs text-gray-300 bg-gray-800 p-2 rounded border border-gray-600">
                                  <strong>Step {step.step}:</strong> {step.action} ({step.metric_improvement} improvement)
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {(result.performance_score || result.optimized_prompt?.performance_score) && (
                      <div className="mb-3 flex items-center">
                        <Target className="w-4 h-4 text-green-400 mr-2" />
                        <span className="text-sm text-gray-300">
                          <strong>Performance:</strong> 
                          <span className="ml-1 text-green-400 font-medium">
                            {((result.performance_score || result.optimized_prompt?.performance_score || 0) * 100).toFixed(1)}%
                          </span>
                        </span>
                      </div>
                    )}

                    {/* Test Results Button */}
                    {result.status === 'completed' && result.optimized_prompt && (
                      <div className="mb-3 flex gap-2">
                        {((useCustomTestData && customTestData.length > 0) || (!useCustomTestData && trainingExamples.length > 0)) && (
                          <button
                            onClick={() => testOptimizedPrompt(result)}
                            disabled={testingLoading}
                            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                          >
                            {testingLoading ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Testing...
                              </>
                            ) : (
                              <>
                                <Target className="w-4 h-4 mr-2" />
                                Test Performance
                              </>
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => initializeTryItMode(result.request_id, result)}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Try GEPA Result
                        </button>
                        <button
                          onClick={() => downloadPredictor(result.request_id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </button>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500 flex items-center">
                      <div className="w-1 h-1 bg-gray-500 rounded-full mr-2"></div>
                      Created {new Date(result.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Test Results Section */}
          {testResults && (
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-400" />
                  Test Results
                </h2>
                <button
                  onClick={() => setTestResults(null)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Comparison Overview */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-blue-400">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Original Prompt</h3>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Accuracy</div>
                      <div className="text-lg font-bold text-blue-300">
                        {(testResults.original_metrics.accuracy * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-green-400">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Optimized Prompt</h3>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Accuracy</div>
                      <div className="text-lg font-bold text-green-300">
                        {(testResults.optimized_metrics.accuracy * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Detailed Metrics */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Detailed Metrics</h3>
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                      <div className="font-medium text-gray-300 mb-2">Original</div>
                      <div className="space-y-1 text-gray-400">
                        <div>Precision: {(testResults.original_metrics.precision * 100).toFixed(1)}%</div>
                        <div>Recall: {(testResults.original_metrics.recall * 100).toFixed(1)}%</div>
                        <div>F1 Score: {(testResults.original_metrics.f1_score * 100).toFixed(1)}%</div>
                        <div>Correct: {testResults.original_metrics.correct_predictions}/{testResults.original_metrics.total_examples}</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-300 mb-2">Optimized</div>
                      <div className="space-y-1 text-gray-400">
                        <div>Precision: {(testResults.optimized_metrics.precision * 100).toFixed(1)}%</div>
                        <div>Recall: {(testResults.optimized_metrics.recall * 100).toFixed(1)}%</div>
                        <div>F1 Score: {(testResults.optimized_metrics.f1_score * 100).toFixed(1)}%</div>
                        <div>Correct: {testResults.optimized_metrics.correct_predictions}/{testResults.optimized_metrics.total_examples}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Predictions vs Targets for User Evaluation */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Predictions vs Expected (Manual Evaluation)</h3>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {testResults.original_metrics.targets.map((target, index) => (
                      <div key={index} className="border border-gray-600 rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-2">Example {index + 1}</div>
                        
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <div className="text-blue-400 font-medium mb-1">Original Prediction</div>
                            <div className="bg-gray-800 p-2 rounded border border-gray-600 min-h-[2rem]">
                              <span className={testResults.original_metrics.matches[index] ? "text-green-300" : "text-red-300"}>
                                {testResults.original_metrics.predictions[index] || "(no response)"}
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-green-400 font-medium mb-1">Optimized Prediction</div>
                            <div className="bg-gray-800 p-2 rounded border border-gray-600 min-h-[2rem]">
                              <span className={testResults.optimized_metrics.matches[index] ? "text-green-300" : "text-red-300"}>
                                {testResults.optimized_metrics.predictions[index] || "(no response)"}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <div className="text-gray-400 font-medium mb-1 text-xs">Expected Output</div>
                          <div className="bg-gray-900 p-2 rounded border border-gray-500 text-xs text-gray-200">
                            {target}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2 text-xs">
                          <div className="flex space-x-4">
                            <span className={`flex items-center ${testResults.original_metrics.matches[index] ? 'text-green-400' : 'text-red-400'}`}>
                              {testResults.original_metrics.matches[index] ? '✓' : '✗'} Original Match
                            </span>
                            <span className={`flex items-center ${testResults.optimized_metrics.matches[index] ? 'text-green-400' : 'text-red-400'}`}>
                              {testResults.optimized_metrics.matches[index] ? '✓' : '✗'} Optimized Match
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* GEPA Analysis Information */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">GEPA Optimization Analysis</h3>
                  <div className="text-sm text-gray-400">
                    <p>The GEPA (Generalized Evolutionary Prompt Adaptation) system has optimized your prompt using advanced evolutionary algorithms that balance multiple objectives including performance, clarity, and efficiency.</p>
                    <div className="mt-3 p-3 bg-gray-800 rounded border border-gray-600">
                      <div className="text-xs font-medium text-gray-300 mb-1">Optimization Approach:</div>
                      <ul className="text-xs text-gray-400 space-y-1">
                        <li>• Multi-objective evolutionary optimization</li>
                        <li>• Pareto front selection for trade-off analysis</li>
                        <li>• LLM-based genetic operators (crossover, mutation)</li>
                        <li>• Adaptive population management</li>
                        <li>• Semantic diversity preservation</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Improvements */}
                {Object.keys(testResults.improvements).length > 0 && (
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Performance Improvements</h3>
                    <div className="space-y-2">
                      {Object.entries(testResults.improvements).map(([metric, improvement]) => (
                        <div key={metric} className="flex justify-between items-center">
                          <span className="text-sm text-gray-400 capitalize">
                            {metric.replace('_improvement_percent', '').replace('_', ' ')}
                          </span>
                          <span className={`text-sm font-medium ${
                            (improvement as number) > 0 ? 'text-green-400' : 
                            (improvement as number) < 0 ? 'text-red-400' : 'text-gray-400'
                          }`}>
                            {(improvement as number) > 0 ? '+' : ''}{(improvement as number).toFixed(1)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-gray-500 flex items-center justify-center">
                  <div className="w-1 h-1 bg-gray-500 rounded-full mr-2"></div>
                  Tested on {testResults.test_examples_count} examples
                </div>
              </div>
            </div>
          )}
          
          {/* Try It Mode */}
          {tryItMode && (
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                  Try Optimized Prompt
                </h2>
                <button
                  onClick={() => {
                    setTryItMode(null);
                    setTryItPrediction(null);
                    setTryItInputs({});
                  }}
                  className="text-gray-400 hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
              
              {/* Input Fields */}
              <div className="space-y-4 mb-6">
                <div className="text-sm text-gray-400">
                  Enter values for each input field:
                </div>
                {Object.entries(tryItInputs).map(([field, value]) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      {field}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setTryItInputs({ ...tryItInputs, [field]: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder={`Enter ${field}...`}
                    />
                  </div>
                ))}
              </div>
              
              {/* Submit Button */}
              <button
                onClick={tryOptimizedPrompt}
                disabled={tryItLoading || Object.values(tryItInputs).some(v => !v)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {tryItLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Predicting...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Run Prediction
                  </>
                )}
              </button>
              
              {/* Prediction Results */}
              {tryItPrediction && (
                <div className="mt-6 space-y-4">
                  <div className="border-t border-gray-700 pt-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Comparison Results</h3>
                    
                    {/* Side-by-side comparison */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                      {/* Unoptimized Result */}
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-red-400">Without Optimization</h4>
                          <span className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded">Basic Prompt</span>
                        </div>
                        
                        {tryItPrediction.unoptimized.outputs && Object.keys(tryItPrediction.unoptimized.outputs).length > 0 ? (
                          <div className="space-y-2">
                            {Object.entries(tryItPrediction.unoptimized.outputs).map(([key, value]) => (
                              <div key={key}>
                                <div className="text-xs font-medium text-gray-400">{key}:</div>
                                <div className="font-mono text-sm text-gray-200 bg-gray-800 p-2 rounded">
                                  {String(value)}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400 italic">No output generated</div>
                        )}
                      </div>
                      
                      {/* Optimized Result */}
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-green-400">With GEPA Optimization</h4>
                          <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">Evolutionarily Optimized</span>
                        </div>
                        
                        {tryItPrediction.optimized.outputs && Object.keys(tryItPrediction.optimized.outputs).length > 0 ? (
                          <div className="space-y-2">
                            {Object.entries(tryItPrediction.optimized.outputs).map(([key, value]) => (
                              <div key={key}>
                                <div className="text-xs font-medium text-gray-400">{key}:</div>
                                <div className="font-mono text-sm text-gray-200 bg-gray-800 p-2 rounded">
                                  {String(value)}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400 italic">No output generated</div>
                        )}
                      </div>
                    </div>
                    
                    {/* Key Differences */}
                    <div className="bg-gray-700 p-4 rounded-lg mb-4">
                      <h4 className="text-sm font-semibold text-yellow-400 mb-2">Key Differences</h4>
                      <div className="space-y-2 text-sm">
                        {/* Compare output fields */}
                        {(() => {
                          const unoptFields = Object.keys(tryItPrediction.unoptimized.outputs || {});
                          const optFields = Object.keys(tryItPrediction.optimized.outputs || {});
                          const allFields = [...new Set([...unoptFields, ...optFields])];
                          
                          return allFields.map(field => {
                            const unoptValue = tryItPrediction.unoptimized.outputs?.[field] || 'N/A';
                            const optValue = tryItPrediction.optimized.outputs?.[field] || 'N/A';
                            const isDifferent = unoptValue !== optValue;
                            
                            return isDifferent ? (
                              <div key={field} className="flex items-start space-x-2">
                                <span className="text-yellow-400">•</span>
                                <div>
                                  <span className="font-medium text-gray-300">{field}:</span>
                                  <div className="text-xs mt-1">
                                    <span className="text-red-400">Before:</span> {unoptValue}
                                  </div>
                                  <div className="text-xs">
                                    <span className="text-green-400">After:</span> {optValue}
                                  </div>
                                </div>
                              </div>
                            ) : null;
                          });
                        })()}
                        
                        {/* Show if optimized has additional reasoning */}
                        {tryItPrediction.optimized.outputs?.reasoning && !tryItPrediction.unoptimized.outputs?.reasoning && (
                          <div className="flex items-start space-x-2">
                            <span className="text-green-400">+</span>
                            <span className="text-gray-300">
                              Optimized version includes step-by-step reasoning
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* GEPA Analysis Button */}
                    <button
                      onClick={gepaThink}
                      className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                    >
                      <Brain className="w-4 h-4 mr-1" />
                      Analyze with GEPA Think
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}