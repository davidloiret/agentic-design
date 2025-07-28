#!/usr/bin/env tsx

interface Observation {
  content: string;
  success: boolean;
  timestamp: Date;
}

interface Action {
  type: 'search' | 'fetch' | 'finish';
  query?: string;
  url?: string;
  result?: string;
}

class ReActAgent {
  private thoughts: string[] = [];
  private actions: Action[] = [];
  private observations: Observation[] = [];

  think(thought: string): void {
    this.thoughts.push(thought);
    console.log(`Thought: ${thought}`);
  }

  act(action: Action): Observation {
    this.actions.push(action);
    console.log(`Action: ${action.type}${action.query ? `("${action.query}")` : ''}${action.url ? `(${action.url})` : ''}`);

    // Simulate action execution
    let observation: Observation;

    switch (action.type) {
      case 'search':
        observation = this.simulateSearch(action.query!);
        break;
      case 'fetch':
        observation = this.simulateFetch(action.url!);
        break;
      case 'finish':
        observation = {
          content: action.result || 'Task completed',
          success: true,
          timestamp: new Date()
        };
        break;
      default:
        observation = {
          content: 'Unknown action type',
          success: false,
          timestamp: new Date()
        };
    }

    this.observations.push(observation);
    console.log(`Observation: ${observation.content}`);
    return observation;
  }

  private simulateSearch(query: string): Observation {
    // Simulate search results based on query
    const searchResults: Record<string, string> = {
      'OpenAI CEO 2024': 'Search results show Sam Altman returned as CEO of OpenAI in November 2023',
      'current weather': 'Weather API shows 72°F, partly cloudy',
      'latest news': 'Breaking: Technology companies announce new AI developments'
    };

    const result = searchResults[query] || `No specific results found for "${query}"`;
    
    return {
      content: result,
      success: true,
      timestamp: new Date()
    };
  }

  private simulateFetch(url: string): Observation {
    // Simulate fetching from different URLs
    const urlResponses: Record<string, string> = {
      'openai.com/about': 'OpenAI About page confirms Sam Altman as CEO',
      'weather.gov': 'Current temperature: 72°F, Humidity: 45%',
      'news.com': 'Latest headlines and breaking news stories'
    };

    const result = urlResponses[url] || `Content fetched from ${url}`;
    
    return {
      content: result,
      success: true,
      timestamp: new Date()
    };
  }

  solve(task: string): string {
    console.log(`Task: ${task}\n`);

    // Example: Find current OpenAI CEO
    this.think("Need to search for current OpenAI leadership");
    let obs = this.act({ type: 'search', query: 'OpenAI CEO 2024' });

    this.think("Should verify with official source");
    obs = this.act({ type: 'fetch', url: 'openai.com/about' });

    this.think("Have reliable answer from official source");
    const finalAnswer = "Sam Altman is the current CEO of OpenAI";
    this.act({ type: 'finish', result: finalAnswer });

    return finalAnswer;
  }

  getExecutionTrace(): { thoughts: string[], actions: Action[], observations: Observation[] } {
    return {
      thoughts: [...this.thoughts],
      actions: [...this.actions],
      observations: [...this.observations]
    };
  }
}

// Usage example
function main() {
  const agent = new ReActAgent();
  
  const task = "Find the current CEO of OpenAI";
  const result = agent.solve(task);
  
  console.log(`\nFinal Result: ${result}`);
  
  const trace = agent.getExecutionTrace();
  console.log(`\nExecution Summary:`);
  console.log(`- Thoughts: ${trace.thoughts.length}`);
  console.log(`- Actions: ${trace.actions.length}`);
  console.log(`- Observations: ${trace.observations.length}`);
}

if (require.main === module) {
  main();
}

export { ReActAgent };
export type { Action, Observation };
