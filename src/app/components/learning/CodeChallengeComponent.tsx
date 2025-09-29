import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Play,
  CheckCircle,
  XCircle,
  Lightbulb,
  Code,
  Target,
  Star,
  RotateCcw,
  Trophy,
  Eye,
  EyeOff,
  Terminal,
  Zap,
  ChevronDown
} from 'lucide-react';

interface CodeChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'beginner' | 'intermediate' | 'advanced';
  topic?: string;
  template?: string;
  starterCode?: string;
  solution: string;
  tests: {
    input: any;
    expectedOutput: any;
    description: string;
  }[];
  hints: string[];
  // Add language templates for multi-language support
  templates?: {
    python: string;
    javascript: string;
    rust: string;
  };
  solutions?: {
    python: string;
    javascript: string;
    rust: string;
  };
}

interface CodeChallengeComponentProps {
  challenge: CodeChallenge;
  xpReward: number;
  onComplete: (score: number, xpEarned: number) => void;
  onExit: () => void;
}

interface TestResult {
  passed: boolean;
  input: any;
  expectedOutput: any;
  actualOutput: any;
  description: string;
  error?: string;
}

type SupportedLanguage = 'python' | 'javascript' | 'rust';

const LANGUAGE_CONFIG = {
  python: {
    name: 'Python',
    monacoLanguage: 'python',
    icon: '🐍',
    defaultTemplate: `def solve_problem():
    """
    Implement your solution here
    """
    pass

# Example usage
result = solve_problem()
print(result)`
  },
  javascript: {
    name: 'JavaScript',
    monacoLanguage: 'javascript',
    icon: '⚡',
    defaultTemplate: `function solveProblem() {
    // Implement your solution here
    return null;
}

// Example usage
const result = solveProblem();
console.log(result);`
  },
  rust: {
    name: 'Rust',
    monacoLanguage: 'rust',
    icon: '🦀',
    defaultTemplate: `fn solve_problem() -> Option<i32> {
    // Implement your solution here
    None
}

fn main() {
    let result = solve_problem();
    println!("{:?}", result);
}`
  }
};

export const CodeChallengeComponent: React.FC<CodeChallengeComponentProps> = ({
  challenge,
  xpReward,
  onComplete,
  onExit
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('python');
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [hintsUsed, setHintsUsed] = useState<number[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number>(Date.now());
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Initialize code when component mounts or language changes
  useEffect(() => {
    const getInitialCode = () => {
      // Check if challenge has language-specific templates
      if (challenge.templates && challenge.templates[selectedLanguage]) {
        return challenge.templates[selectedLanguage];
      }
      
      // Use the default template for Python (most challenges are in Python)
      if (selectedLanguage === 'python' && challenge.template) {
        return challenge.template;
      }
      
      // Fall back to language default template
      return LANGUAGE_CONFIG[selectedLanguage].defaultTemplate;
    };

    setCode(getInitialCode());
  }, [selectedLanguage, challenge]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const executeCode = (userCode: string, testInput: any): any => {
    try {
      // This is a simplified code execution simulation
      // In a real implementation, you'd use a sandboxed environment
      
      // For the Tree of Thought challenge
      if (challenge.id === 'implement-tot-reasoning') {
        // Check for key class and method names regardless of language
        const hasTreeNode = userCode.includes('TreeOfThoughtNode') || userCode.includes('TreeNode') || userCode.includes('struct TreeNode');
        const hasSolveMethod = userCode.includes('solve') || userCode.includes('fn solve');
        
        if (hasTreeNode && hasSolveMethod) {
          return {
            solution_path: testInput.goal_check === "lambda state: state['current'] == state['target']" 
              ? [testInput.initial_state, { current: 10, target: 10, moves: ['+3', '+3', '+4'] }]
              : null,
            final_state: { current: 10, target: 10, moves: ['+3', '+3', '+4'] },
            score: 0.95,
            nodes_explored: 12
          };
        }
      }

      // For the ReAct Agent challenge
      if (challenge.id === 'implement-react-agent') {
        const hasAgentClass = userCode.includes('ReActAgent') || userCode.includes('ReactAgent') || userCode.includes('struct ReactAgent');
        const hasSolveMethod = userCode.includes('solve') || userCode.includes('fn solve');
        
        if (hasAgentClass && hasSolveMethod) {
          return {
            answer: "Based on my analysis: 42",
            reasoning_trace: [
              "THOUGHT 1: I need to solve this calculation",
              "ACTION 1: calculator with expression",
              "OBSERVATION 1: Successfully obtained: 42"
            ],
            iterations: 1,
            tools_used: ["calculator"],
            success: true
          };
        }
      }

      // For the Dynamic Routing challenge
      if (challenge.id === 'implement-dynamic-routing') {
        const hasRouterClass = userCode.includes('DynamicRouter') || userCode.includes('Router') || userCode.includes('struct Router');
        const hasRouteMethod = userCode.includes('route') || userCode.includes('fn route');
        
        if (hasRouterClass && hasRouteMethod) {
          return {
            result: "Routed to technical expert",
            route_used: "tech_expert",
            context_features: { type: "technical", priority: "high" },
            execution_time: 0.15,
            success: true
          };
        }
      }

      // Language-specific feedback
      if (selectedLanguage === 'python' && !userCode.includes('def ')) {
        return { error: "Please define functions using 'def' keyword in Python." };
      } else if (selectedLanguage === 'javascript' && !userCode.includes('function ') && !userCode.includes('=>')) {
        return { error: "Please define functions using 'function' keyword or arrow functions in JavaScript." };
      } else if (selectedLanguage === 'rust' && !userCode.includes('fn ')) {
        return { error: "Please define functions using 'fn' keyword in Rust." };
      }

      // Default fallback
      return { error: "Code structure not recognized. Please follow the template structure and implement the required functions." };

    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown execution error' };
    }
  };

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    const results: TestResult[] = [];

    for (const test of challenge.tests) {
      try {
        const result = executeCode(code, test.input);
        
        let passed = false;
        let actualOutput = result;

        // Check if the result matches expected output
        if (result.error) {
          passed = false;
          actualOutput = { error: result.error };
        } else {
          // Simple comparison - in a real implementation you'd have more sophisticated checking
          passed = JSON.stringify(result).includes(JSON.stringify(test.expectedOutput).slice(1, -1));
        }

        results.push({
          passed,
          input: test.input,
          expectedOutput: test.expectedOutput,
          actualOutput,
          description: test.description,
          error: result.error
        });

      } catch (error) {
        results.push({
          passed: false,
          input: test.input,
          expectedOutput: test.expectedOutput,
          actualOutput: null,
          description: test.description,
          error: error instanceof Error ? error.message : 'Test execution failed'
        });
      }
    }

    setTestResults(results);
    setIsRunning(false);

    // Check if all tests passed
    const allPassed = results.every(r => r.passed);
    if (allPassed && !isCompleted) {
      setIsCompleted(true);
    }
  };

  const showHint = (hintIndex: number) => {
    if (!hintsUsed.includes(hintIndex)) {
      setHintsUsed([...hintsUsed, hintIndex]);
    }
  };

  const handleComplete = () => {
    const passedTests = testResults.filter(r => r.passed).length;
    const score = Math.round((passedTests / testResults.length) * 100);
    
    // Calculate XP based on score and penalties for hints/solution viewing
    let earnedXP = xpReward;
    
    if (score >= 100) earnedXP = xpReward;
    else if (score >= 80) earnedXP = Math.floor(xpReward * 0.8);
    else if (score >= 60) earnedXP = Math.floor(xpReward * 0.6);
    else earnedXP = Math.floor(xpReward * 0.4);

    // Penalties
    earnedXP -= hintsUsed.length * 5; // -5 XP per hint used
    if (showSolution) earnedXP = Math.floor(earnedXP * 0.5); // -50% for viewing solution

    earnedXP = Math.max(earnedXP, Math.floor(xpReward * 0.1)); // Minimum 10% XP

    onComplete(score, earnedXP);
  };

  const handleRestart = () => {
    setCode(challenge.templates?.[selectedLanguage] || challenge.template || LANGUAGE_CONFIG[selectedLanguage].defaultTemplate);
    setTestResults([]);
    setIsCompleted(false);
    setShowSolution(false);
    setHintsUsed([]);
    setSessionStartTime(Date.now());
  };

  const handleStartChallenge = () => {
    setHasStarted(true);
    setSessionStartTime(Date.now());
  };

  const getCurrentSolution = () => {
    if (challenge.solutions && challenge.solutions[selectedLanguage]) {
      return challenge.solutions[selectedLanguage];
    }
    return challenge.solution; // Fallback to default solution
  };

  const handleLanguageChange = (language: SupportedLanguage) => {
    setSelectedLanguage(language);
    setShowSolution(false); // Hide solution when changing languages
    setTestResults([]); // Clear test results
  };

  const handleEditorDidMount = () => {
    setIsEditorReady(true);
  };

  // Pre-challenge screen
  if (!hasStarted) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <div className="p-4 bg-blue-400/20 rounded-full w-16 h-16 mx-auto mb-4">
              <Code className="w-8 h-8 text-blue-400 mx-auto" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{challenge.title}</h1>
            <div className="text-gray-400 text-lg mb-4 markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({children}) => <p className="text-gray-400 text-lg">{children}</p>,
                  strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                  em: ({children}) => <em className="text-blue-300">{children}</em>,
                  code: ({children}) => <code className="bg-gray-900 px-2 py-1 rounded text-cyan-300 text-sm font-mono">{children}</code>,
                }}
              >
                {challenge.description}
              </ReactMarkdown>
            </div>
            
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty}
              </span>
              <span className="text-gray-400 text-sm">{challenge.topic}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Tests</p>
              <p className="text-white font-bold">{challenge.tests.length}</p>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <Lightbulb className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Hints Available</p>
              <p className="text-white font-bold">{challenge.hints.length}</p>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <Star className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Max XP Reward</p>
              <p className="text-white font-bold">{xpReward}</p>
            </div>
          </div>

          {/* Language Selection Preview */}
          <div className="bg-gray-700/30 rounded-lg p-6 mb-8">
            <h3 className="text-white font-semibold mb-4">Choose Your Programming Language:</h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(LANGUAGE_CONFIG).map(([lang, config]) => (
                <div 
                  key={lang}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedLanguage === lang 
                      ? 'border-blue-400 bg-blue-400/10' 
                      : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedLanguage(lang as SupportedLanguage)}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{config.icon}</div>
                    <p className="text-white font-medium">{config.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-6 mb-8">
            <h3 className="text-white font-semibold mb-4">Challenge Requirements:</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>• Implement the required functions according to the specification</p>
              <p>• Pass all test cases to complete the challenge</p>
              <p>• Use hints sparingly to maximize XP rewards</p>
              <p>• Choose any supported programming language</p>
              <p>• Focus on clean, efficient code implementation</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={onExit}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleStartChallenge}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Start Challenge</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main challenge interface
  return (
    <div className="max-w-full mx-auto p-6 min-h-screen">
      {/* Header */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-white">{challenge.title}</h2>
            <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(challenge.difficulty)}`}>
              {challenge.difficulty}
            </span>
            <span className="text-gray-400 text-sm">{challenge.topic}</span>
            
            {/* Language Indicator */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-gray-700/50 rounded-lg">
              <span className="text-lg">{LANGUAGE_CONFIG[selectedLanguage].icon}</span>
              <span className="text-white text-sm">{LANGUAGE_CONFIG[selectedLanguage].name}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">
              Time: {formatTime(Date.now() - sessionStartTime)}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={handleRestart}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Restart challenge"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={onExit}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
        {/* Left Panel - Instructions, Tests, and Hints */}
        <div className="xl:col-span-1 space-y-6 overflow-y-auto max-h-full">
          {/* Challenge Description */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Challenge Description</h3>
            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({children}) => <h1 className="text-2xl font-bold text-white mb-4 mt-6">{children}</h1>,
                  h2: ({children}) => <h2 className="text-xl font-bold text-white mb-3 mt-4">{children}</h2>,
                  h3: ({children}) => <h3 className="text-lg font-semibold text-white mb-2 mt-3">{children}</h3>,
                  p: ({children}) => <p className="text-gray-300 text-sm leading-relaxed mb-3">{children}</p>,
                  ul: ({children}) => <ul className="list-disc list-inside space-y-1 mb-3 text-gray-300 text-sm ml-2">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-inside space-y-1 mb-3 text-gray-300 text-sm ml-2">{children}</ol>,
                  li: ({children}) => <li className="text-gray-300 text-sm">{children}</li>,
                  strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                  em: ({children}) => <em className="text-blue-300">{children}</em>,
                  code: ({children}) => <code className="bg-gray-900 px-2 py-1 rounded text-cyan-300 text-xs font-mono">{children}</code>,
                  pre: ({children}) => <pre className="bg-gray-900 rounded-lg p-3 overflow-x-auto mb-3 text-xs">{children}</pre>,
                  blockquote: ({children}) => (
                    <blockquote className="border-l-4 border-blue-500 pl-3 text-gray-400 italic mb-3 text-sm">{children}</blockquote>
                  ),
                }}
              >
                {challenge.description}
              </ReactMarkdown>
            </div>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Terminal className="w-5 h-5 mr-2" />
                Test Results ({testResults.filter(r => r.passed).length}/{testResults.length} passed)
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      result.passed
                        ? 'border-green-400/30 bg-green-400/5'
                        : 'border-red-400/30 bg-red-400/5'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {result.passed ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-white font-medium mb-2">{result.description}</p>
                        {result.error && (
                          <p className="text-red-400 text-sm mb-2">{result.error}</p>
                        )}
                        <div className="text-xs text-gray-400 space-y-1">
                          <p><strong>Expected:</strong> {JSON.stringify(result.expectedOutput)}</p>
                          <p><strong>Got:</strong> {JSON.stringify(result.actualOutput)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hints */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              Hints ({hintsUsed.length}/{challenge.hints.length} used)
            </h3>
            <div className="space-y-3">
              {challenge.hints.map((hint, index) => (
                <div key={index}>
                  {hintsUsed.includes(index) ? (
                    <div className="p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
                      <p className="text-yellow-200 text-sm">{hint}</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => showHint(index)}
                      className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors text-left"
                    >
                      <p className="text-gray-400 text-sm">💡 Click to reveal hint {index + 1} (-5 XP)</p>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor (Takes up 2/3 of the width) */}
        <div className="xl:col-span-2 flex flex-col h-full">
          {/* Code Editor */}
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 flex-1 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Code Editor
                </h3>
                
                {/* Language Selector */}
                <div className="relative">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
                    className="bg-gray-700 text-white text-sm rounded px-3 py-1 border border-gray-600 focus:border-blue-400 focus:outline-none appearance-none pr-8"
                  >
                    {Object.entries(LANGUAGE_CONFIG).map(([lang, config]) => (
                      <option key={lang} value={lang}>
                        {config.icon} {config.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600 transition-colors flex items-center space-x-1"
                >
                  {showSolution ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showSolution ? 'Hide' : 'Show'} Solution</span>
                </button>
                <button
                  onClick={runTests}
                  disabled={isRunning || !isEditorReady}
                  className="px-4 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center space-x-1"
                >
                  {isRunning ? (
                    <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                  <span>{isRunning ? 'Running...' : 'Run Tests'}</span>
                </button>
              </div>
            </div>
            
            <div className="flex-1 min-h-0">
              <Editor
                height="100%"
                language={LANGUAGE_CONFIG[selectedLanguage].monacoLanguage}
                theme="vs-dark"
                value={showSolution ? getCurrentSolution() : code}
                onChange={(value) => !showSolution && value !== undefined && setCode(value)}
                onMount={handleEditorDidMount}
                options={{
                  readOnly: showSolution,
                  minimap: { enabled: false },
                  fontSize: 14,
                  tabSize: selectedLanguage === 'python' ? 4 : 2,
                  insertSpaces: true,
                  wordWrap: 'on',
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  renderLineHighlight: 'line',
                  bracketPairColorization: { enabled: true },
                  padding: { top: 16, bottom: 16 }
                }}
              />
              {showSolution && (
                <div className="p-4 border-t border-gray-700 flex-shrink-0">
                  <p className="text-yellow-400 text-sm flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    Solution revealed - XP reward reduced by 50%
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Success Message */}
          {isCompleted && (
            <div className="bg-green-400/10 border border-green-400/30 rounded-xl p-6 mt-6">
              <div className="text-center">
                <Trophy className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-400 mb-2">Challenge Completed! 🎉</h3>
                <p className="text-gray-300 mb-4">All tests passed successfully!</p>
                
                <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Tests Passed</p>
                      <p className="text-white font-bold">{testResults.filter(r => r.passed).length}/{testResults.length}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Time Taken</p>
                      <p className="text-white font-bold">{formatTime(Date.now() - sessionStartTime)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Language Used</p>
                      <p className="text-white font-bold">{LANGUAGE_CONFIG[selectedLanguage].name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Hints Used</p>
                      <p className="text-white font-bold">{hintsUsed.length}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleComplete}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center space-x-2 mx-auto"
                >
                  <Zap className="w-4 h-4" />
                  <span>Claim Reward</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 