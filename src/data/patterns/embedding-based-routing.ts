import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const embeddingBasedRoutingPattern: PatternScenario = {
  id: 'embedding-based-routing',
  title: 'Embedding-Based Routing Pattern',
  description: 'Demonstrates semantic routing using vector embeddings and similarity matching',
  initialNodes: [
    {
      id: 'input',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { label: 'User Query\n"How do I export my data to Excel?"' },
      style: { ...nodeStyle, minWidth: 280 }
    },
    {
      id: 'embedding-generator',
      type: 'default',
      position: { x: 375, y: 160 },
      data: { label: '🔢 Embedding Generator\nConvert to Vector Representation' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 330 }
    },
    {
      id: 'query-vector',
      type: 'default',
      position: { x: 50, y: 270 },
      data: { label: 'Query Vector\n[0.23, -0.45, 0.67, 0.12, ...]\n768 dimensions' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 200 }
    },
    // Vector database with route embeddings
    {
      id: 'vector-db',
      type: 'default',
      position: { x: 650, y: 270 },
      data: { label: '🗄️ Vector Database\nPre-computed Route Embeddings' },
      style: { ...nodeStyle, background: '#2563eb', minWidth: 250 }
    },
    // Similarity computation
    {
      id: 'similarity-compute',
      type: 'default',
      position: { x: 350, y: 380 },
      data: { label: '📊 Similarity Computation\nCosine Similarity Matching' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 250 }
    },
    // Route options with similarity scores
    {
      id: 'export-route',
      type: 'default',
      position: { x: 50, y: 500 },
      data: { label: '📊 Data Export Handler\nSimilarity: 0.92\nExport, CSV, Excel, Download' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 }
    },
    {
      id: 'reporting-route',
      type: 'default',
      position: { x: 300, y: 500 },
      data: { label: '📈 Reporting Handler\nSimilarity: 0.71\nReports, Analytics, Charts' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 220 }
    },
    {
      id: 'backup-route',
      type: 'default',
      position: { x: 550, y: 500 },
      data: { label: '💾 Backup Handler\nSimilarity: 0.43\nBackup, Archive, Storage' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 220 }
    },
    // Processing and output
    {
      id: 'export-processor',
      type: 'default',
      position: { x: 50, y: 620 },
      data: { label: 'Process Export Request\n• Generate Excel file\n• Format data tables\n• Add headers & styling' },
      style: { ...nodeStyle, minWidth: 220 }
    },
    {
      id: 'output',
      type: 'default',
      position: { x: 400, y: 730 },
      data: { label: 'Response\n"Excel file generated successfully.\nDownload link: export_2024.xlsx"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 280 }
    },
    // Pre-computed embeddings examples
    {
      id: 'embedding-examples',
      type: 'default',
      position: { x: 650, y: 380 },
      data: { label: 'Route Embeddings:\n• Export: [0.21, -0.43, ...]\n• Report: [0.18, -0.31, ...]\n• Backup: [0.45, 0.22, ...]' },
      style: { ...nodeStyle, background: '#1f2937', minWidth: 200, fontSize: 11 }
    }
  ],
  initialEdges: [
    {
      id: 'e-input-embedding',
      source: 'input',
      target: 'embedding-generator',
      style: edgeStyle,
      animated: true
    },
    {
      id: 'e-embedding-vector',
      source: 'embedding-generator',
      target: 'query-vector',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      label: 'Generate'
    },
    {
      id: 'e-embedding-db',
      source: 'embedding-generator',
      target: 'vector-db',
      style: { ...edgeStyle, stroke: '#2563eb' },
      label: 'Fetch Routes'
    },
    {
      id: 'e-vector-similarity',
      source: 'query-vector',
      target: 'similarity-compute',
      style: edgeStyle
    },
    {
      id: 'e-db-similarity',
      source: 'vector-db',
      target: 'similarity-compute',
      style: edgeStyle
    },
    {
      id: 'e-db-examples',
      source: 'vector-db',
      target: 'embedding-examples',
      style: { ...edgeStyle, stroke: '#1f2937', strokeDasharray: '5,5' }
    },
    // Similarity results
    {
      id: 'e-similarity-export',
      source: 'similarity-compute',
      target: 'export-route',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      label: '0.92'
    },
    {
      id: 'e-similarity-reporting',
      source: 'similarity-compute',
      target: 'reporting-route',
      style: { ...edgeStyle, stroke: '#6b7280', strokeDasharray: '5,5' },
      label: '0.71'
    },
    {
      id: 'e-similarity-backup',
      source: 'similarity-compute',
      target: 'backup-route',
      style: { ...edgeStyle, stroke: '#6b7280', strokeDasharray: '5,5' },
      label: '0.43'
    },
    {
      id: 'e-export-processor',
      source: 'export-route',
      target: 'export-processor',
      style: { ...edgeStyle, stroke: '#10b981' },
      animated: true
    },
    {
      id: 'e-processor-output',
      source: 'export-processor',
      target: 'output',
      style: edgeStyle
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Query Input',
      description: 'User submits a query that needs semantic routing based on meaning.',
      input: 'User Query: "How do I export my data to Excel?"',
      activeNodes: ['input'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Generate Query Embedding',
      description: 'Convert the query text into a high-dimensional vector representation using an embedding model.',
      input: 'Text: "How do I export my data to Excel?"\nModel: text-embedding-ada-002',
      activeNodes: ['input', 'embedding-generator'],
      activeEdges: ['e-input-embedding']
    },
    {
      id: 'step3',
      title: 'Query Vector Creation',
      description: 'The embedding model produces a 768-dimensional vector capturing the semantic meaning.',
      output: 'Query Vector:\n[0.23, -0.45, 0.67, 0.12, -0.34, 0.89, ...]\n\nVector captures semantic concepts:\n• Data manipulation\n• File export\n• Spreadsheet format',
      activeNodes: ['embedding-generator', 'query-vector'],
      activeEdges: ['e-embedding-vector']
    },
    {
      id: 'step4',
      title: 'Retrieve Route Embeddings',
      description: 'Fetch pre-computed embeddings for all available routes from the vector database.',
      output: 'Route Embeddings Retrieved:\n• Data Export Handler: [0.21, -0.43, 0.65, ...]\n• Reporting Handler: [0.18, -0.31, 0.52, ...]\n• Backup Handler: [0.45, 0.22, -0.18, ...]\n• API Handler: [0.33, 0.15, -0.67, ...]\n• Settings Handler: [-0.12, 0.88, 0.34, ...]',
      activeNodes: ['embedding-generator', 'vector-db', 'embedding-examples'],
      activeEdges: ['e-embedding-db', 'e-db-examples']
    },
    {
      id: 'step5',
      title: 'Compute Similarities',
      description: 'Calculate cosine similarity between query vector and each route vector.',
      output: 'Cosine Similarity Scores:\n\n• Data Export: 0.92 (high match)\n• Reporting: 0.71 (moderate match)\n• Backup: 0.43 (low match)\n• API: 0.28\n• Settings: 0.15\n\nThreshold: 0.70 for confident routing',
      activeNodes: ['query-vector', 'vector-db', 'similarity-compute'],
      activeEdges: ['e-vector-similarity', 'e-db-similarity']
    },
    {
      id: 'step6',
      title: 'Route Selection',
      description: 'Select the route with highest similarity score above the threshold.',
      output: 'Routing Decision:\n\n✓ Selected: Data Export Handler (0.92)\n  Reasons:\n  • Highest similarity score\n  • Above confidence threshold\n  • Semantically aligned with "export" and "Excel"\n\nAlternatives considered but not selected',
      activeNodes: ['similarity-compute', 'export-route', 'reporting-route', 'backup-route'],
      activeEdges: ['e-similarity-export', 'e-similarity-reporting', 'e-similarity-backup']
    },
    {
      id: 'step7',
      title: 'Process Request',
      description: 'The selected handler processes the export request with specialized logic.',
      output: 'Export Processing:\n1. Parse data request parameters\n2. Fetch user data from database\n3. Transform to Excel format (XLSX)\n4. Apply formatting and headers\n5. Generate temporary download link\n6. Prepare response message',
      activeNodes: ['export-route', 'export-processor'],
      activeEdges: ['e-export-processor']
    },
    {
      id: 'step8',
      title: 'Return Response',
      description: 'Send the processed result back to the user.',
      output: 'Final Response:\n\n"Your data has been successfully exported to Excel format. The file includes all your records with proper formatting and headers.\n\nDownload link: export_2024.xlsx\n(Link expires in 24 hours)\n\nFile size: 2.3 MB\nRecords exported: 5,432"',
      activeNodes: ['export-processor', 'output'],
      activeEdges: ['e-processor-output']
    }
  ]
};