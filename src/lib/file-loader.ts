// Utility for loading external file content
import * as fs from 'fs';
import * as path from 'path';

/**
 * Load content from a file relative to the project root
 * @param filePath - Path to the file relative to project root
 * @returns The file content as a string
 */
export function loadFileContent(filePath: string): string {
  try {
    // Get the project root directory (assuming we're in src/lib)
    const projectRoot = path.resolve(__dirname, '../../..');
    const fullPath = path.join(projectRoot, filePath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`);
      return `// File not found: ${filePath}\n// This file could not be loaded from the expected location.`;
    }
    
    // Read and return file content
    return fs.readFileSync(fullPath, 'utf-8');
  } catch (error) {
    console.error(`Error loading file ${filePath}:`, error);
    return `// Error loading file: ${filePath}\n// ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

/**
 * Load Rust example code from the examples directory
 * @param fileName - Name of the Rust file (without extension)
 * @returns The Rust code content
 */
export function loadRustExample(fileName: string): string {
  const filePath = `examples/rust/src/${fileName}.rs`;
  return loadFileContent(filePath);
}

/**
 * Load TypeScript example code from the examples directory
 * @param fileName - Name of the TypeScript file (without extension)
 * @returns The TypeScript code content
 */
export function loadTypeScriptExample(fileName: string): string {
  const filePath = `examples/typescript/src/${fileName}.ts`;
  return loadFileContent(filePath);
}

/**
 * Load Python example code from the examples directory
 * @param fileName - Name of the Python file (without extension)
 * @returns The Python code content
 */
export function loadPythonExample(fileName: string): string {
  const filePath = `examples/python/${fileName}.py`;
  return loadFileContent(filePath);
}