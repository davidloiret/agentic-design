'use client';

import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Copy, Download, RotateCcw, Code, Terminal } from 'lucide-react';

interface CodeSandboxProps {
  patternId: string;
  initialCode: string;
  language: 'typescript' | 'python' | 'rust';
  onCodeChange?: (code: string) => void;
}

interface ExecutionResult {
  output: string;
  error?: string;
  executionTime: number;
}

export default function CodeSandbox({ patternId, initialCode, language, onCodeChange }: CodeSandboxProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const editorRef = useRef<any>(null);

  // Update code when language changes
  useEffect(() => {
    setCode(initialCode);
  }, [language, initialCode]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure TypeScript compiler options
    if (language === 'typescript') {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        esModuleInterop: true,
        jsx: monaco.languages.typescript.JsxEmit.React,
        reactNamespace: 'React',
        allowJs: true,
        typeRoots: ['node_modules/@types']
      });
    }
  };

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running...');
    
    const startTime = Date.now();
    
    try {
      let result: string;
      
      if (language === 'typescript') {
        result = await executeTypeScript(code);
      } else if (language === 'python') {
        result = await executePython(code);
      } else if (language === 'rust') {
        result = await executeRust(code);
      } else {
        result = 'Unsupported language';
      }
      
      const executionTime = Date.now() - startTime;
      
      setExecutionResult({
        output: result,
        executionTime
      });
      setOutput(result);
      
    } catch (error) {
      const executionTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      setExecutionResult({
        output: '',
        error: errorMessage,
        executionTime
      });
      setOutput(`Error: ${errorMessage}`);
    } finally {
      setIsRunning(false);
    }
  };

  const executeCode = async (code: string, language: string): Promise<string> => {
    try {
      const response = await fetch(`/api/v1/code/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify({
          code,
          language
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required. Please log in to execute code.');
        }
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.detail || 'Execution failed');
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Execution failed');
      }

      return result.output || 'Code executed successfully (no output)';
    } catch (error) {
      throw new Error(`Execution error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const executeTypeScript = async (code: string): Promise<string> => {
    return await executeCode(code, 'typescript');
  };

  const executePython = async (code: string): Promise<string> => {
    return await executeCode(code, 'python');
  };

  const executeRust = async (code: string): Promise<string> => {
    return await executeCode(code, 'rust');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const downloadCode = () => {
    const extension = language === 'typescript' ? 'ts' : language === 'python' ? 'py' : 'rs';
    const filename = `${patternId}_${language}.${extension}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    setExecutionResult(null);
  };

  const getLanguageDisplayName = () => {
    return language.charAt(0).toUpperCase() + language.slice(1);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">
            {getLanguageDisplayName()} Sandbox
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors min-h-[44px]"
            title="Copy code"
          >
            <Copy className="w-4 h-4" />
            <span className="hidden sm:inline">Copy</span>
          </button>
          
          <button
            onClick={downloadCode}
            className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors min-h-[44px]"
            title="Download code"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </button>
          
          <button
            onClick={resetCode}
            className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors min-h-[44px]"
            title="Reset to original"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          
          <button
            onClick={runCode}
            disabled={isRunning}
            className={`flex items-center gap-1 px-4 py-2 text-sm rounded-md transition-colors min-h-[44px] ${
              isRunning
                ? 'text-white bg-blue-400 cursor-not-allowed'
                : 'text-white bg-blue-600 hover:bg-blue-700'
            }`}
            title="Run code"
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="h-64 sm:h-80 md:h-96">
        <Editor
          height="100%"
          language={language === 'typescript' ? 'typescript' : language}
          value={code}
          path={language === 'typescript' ? `${patternId}.ts` : language === 'python' ? `${patternId}.py` : `${patternId}.rs`}
          onMount={handleEditorDidMount}
          onChange={handleCodeChange}
          options={{
            minimap: { enabled: false },
            fontSize: 12,
            wordWrap: 'on',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            folding: true,
            glyphMargin: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 3,
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8
            }
          }}
          theme="vs-light"
        />
      </div>

      {/* Output */}
      {(output || executionResult) && (
        <div className="border-t border-gray-200">
          <div className="flex items-center gap-2 p-3 bg-gray-50 border-b border-gray-200">
            <Terminal className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-900">Output</span>
            {executionResult && (
              <span className="text-sm text-gray-500">
                ({executionResult.executionTime}ms)
              </span>
            )}
          </div>
          
          <div className="p-4">
            <pre className={`text-sm font-mono whitespace-pre-wrap ${
              executionResult?.error ? 'text-red-600' : 'text-gray-900'
            }`}>
              {output}
            </pre>
          </div>
        </div>
      )}
      
      {/* API status note */}
      <div className="p-4 bg-green-50 border-t border-green-200">
        <p className="text-sm text-green-800">
          <strong>Server-side execution:</strong> Code is executed securely in isolated containers on the server.
          Supports Python, TypeScript, and Rust with full language features.
        </p>
      </div>
    </div>
  );
}