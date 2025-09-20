import { Node, Edge } from 'reactflow';

export interface PatternScenario {
  id: string;
  title: string;
  description: string;
  steps: any[];
  initialNodes: Node[];
  initialEdges: Edge[];
  metadata?: any;
}

export interface ScenarioStep {
  id: string;
  title: string;
  description: string;
  input?: string;
  output?: string;
  activeNodes: string[];
  activeEdges: string[];
  newNodes?: Node[];
  newEdges?: Edge[];
  nodeUpdates?: { [nodeId: string]: Partial<Node> };
}