import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const dataAnonymizationPattern: PatternScenario = {
  id: 'data-anonymization',
  title: 'Data Anonymization Patterns',
  description: 'Comprehensive data anonymization techniques including K-anonymity, L-diversity, T-closeness, and synthetic data generation for privacy-preserving agentic systems',
  initialNodes: [
    // Medical AI training scenario
    {
      id: 'medical-ai-training',
      position: { x: 400, y: 50 },
      data: { label: '🏥 Medical AI Training Dataset\n"Need to train diagnostic AI on\n100K patient records with\nsensitive medical information"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Privacy requirements
    {
      id: 'privacy-requirements',
      position: { x: 400, y: 200 },
      data: { label: '🔒 Strict Privacy Requirements\n"HIPAA compliance mandatory\nPatient re-identification risk\nmust be eliminated"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 280 },
    },

    // Left path: Simple anonymization (inadequate)
    {
      id: 'simple-anonymization',
      position: { x: 150, y: 350 },
      data: { label: '⚠️ Simple Anonymization\n"Remove names and SSNs\nKeep age, zip, diagnosis\nBasic data masking"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 },
    },

    {
      id: 'linkage-attack',
      position: { x: 150, y: 500 },
      data: { label: '🎯 Linkage Attack Vulnerability\n"Age + ZIP + rare diagnosis\nenables re-identification\nQuasi-identifiers exposed"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'privacy-breach',
      position: { x: 150, y: 650 },
      data: { label: '🚨 Privacy Breach\n"42% of patients re-identified\nSensitive conditions exposed\nHIPAA violation confirmed"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: Comprehensive anonymization
    {
      id: 'comprehensive-anonymization',
      position: { x: 650, y: 350 },
      data: { label: '🛡️ Comprehensive Anonymization\n"Multi-technique approach:\n• K-anonymity (k=5)\n• L-diversity (l=3)\n• T-closeness (t=0.2)"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 240 },
    },

    {
      id: 'k-anonymity',
      position: { x: 500, y: 500 },
      data: { label: '👥 K-Anonymity (k=5)\n"Each record indistinguishable\nfrom at least 4 others\nGeneralization + suppression"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    {
      id: 'l-diversity',
      position: { x: 650, y: 500 },
      data: { label: '🎭 L-Diversity (l=3)\n"Each group has at least\n3 diverse sensitive values\nPrevents homogeneity attacks"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    {
      id: 't-closeness',
      position: { x: 800, y: 500 },
      data: { label: '📊 T-Closeness (t=0.2)\n"Distribution of sensitive\nattributes in each group\nclose to overall distribution"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    {
      id: 'synthetic-data',
      position: { x: 650, y: 650 },
      data: { label: '🎲 Synthetic Data Generation\n"Generate artificial records\nwith same statistical properties\nbut no real patient data"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    {
      id: 'privacy-preserved',
      position: { x: 650, y: 800 },
      data: { label: '✅ Privacy Preserved\n"Re-identification risk < 0.1%\nUtility maintained for AI training\nHIPAA compliance achieved"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Key anonymization principle
    {
      id: 'anonymization-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Anonymization Principle\n"Privacy requires mathematical guarantees\nSimple masking ≠ true anonymization\nMultiple techniques provide defense in depth"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 350 },
    },
  ],
  initialEdges: [
    // Medical AI training faces privacy requirements
    {
      id: 'e1',
      source: 'medical-ai-training',
      target: 'privacy-requirements',
      ...edgeStyle,
      label: 'must comply with regulations'
    },

    // Split into simple vs comprehensive anonymization
    {
      id: 'e2',
      source: 'privacy-requirements',
      target: 'simple-anonymization',
      ...edgeStyle,
      label: 'simple approach'
    },
    {
      id: 'e3',
      source: 'privacy-requirements',
      target: 'comprehensive-anonymization',
      ...edgeStyle,
      label: 'comprehensive approach'
    },

    // Left path: Simple anonymization failures
    {
      id: 'e4',
      source: 'simple-anonymization',
      target: 'linkage-attack',
      ...edgeStyle,
      label: 'vulnerable to attacks',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },
    {
      id: 'e5',
      source: 'linkage-attack',
      target: 'privacy-breach',
      ...edgeStyle,
      label: 'enables re-identification',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },

    // Right path: Comprehensive anonymization techniques
    {
      id: 'e6',
      source: 'comprehensive-anonymization',
      target: 'k-anonymity',
      ...edgeStyle,
      label: 'apply K-anonymity'
    },
    {
      id: 'e7',
      source: 'comprehensive-anonymization',
      target: 'l-diversity',
      ...edgeStyle,
      label: 'ensure L-diversity'
    },
    {
      id: 'e8',
      source: 'comprehensive-anonymization',
      target: 't-closeness',
      ...edgeStyle,
      label: 'maintain T-closeness'
    },

    // Techniques combine for synthetic data
    {
      id: 'e9',
      source: 'k-anonymity',
      target: 'synthetic-data',
      ...edgeStyle,
      label: 'inform generation'
    },
    {
      id: 'e10',
      source: 'l-diversity',
      target: 'synthetic-data',
      ...edgeStyle,
      label: 'preserve diversity'
    },
    {
      id: 'e11',
      source: 't-closeness',
      target: 'synthetic-data',
      ...edgeStyle,
      label: 'maintain distributions'
    },

    // Synthetic data achieves privacy
    {
      id: 'e12',
      source: 'synthetic-data',
      target: 'privacy-preserved',
      ...edgeStyle,
      label: 'eliminates re-identification'
    },

    // Converge to anonymization principle
    {
      id: 'e13',
      source: 'privacy-breach',
      target: 'anonymization-principle',
      ...edgeStyle,
      label: 'demonstrates inadequacy',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e14',
      source: 'privacy-preserved',
      target: 'anonymization-principle',
      ...edgeStyle,
      label: 'proves effectiveness',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Medical AI Training Data Challenge",
      description: "Need to train diagnostic AI on 100K patient records containing sensitive medical information while ensuring strict HIPAA compliance and preventing re-identification.",
      activeNodes: ['medical-ai-training', 'privacy-requirements'],
      activeEdges: ['e1']
    },
    {
      title: "Two Anonymization Approaches",
      description: "Privacy requirements addressed through simple anonymization (removing names/SSNs) vs comprehensive multi-technique anonymization approach.",
      activeNodes: ['simple-anonymization', 'comprehensive-anonymization'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Simple Anonymization Vulnerability",
      description: "Basic data masking leaves quasi-identifiers exposed, enabling linkage attacks where age + ZIP + rare diagnosis combinations allow patient re-identification.",
      activeNodes: ['linkage-attack', 'privacy-breach'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "Comprehensive Multi-Technique Anonymization",
      description: "Advanced approach applies K-anonymity (k=5) for indistinguishability, L-diversity (l=3) for sensitive value diversity, and T-closeness (t=0.2) for distribution preservation.",
      activeNodes: ['k-anonymity', 'l-diversity', 't-closeness'],
      activeEdges: ['e6', 'e7', 'e8']
    },
    {
      title: "Synthetic Data Generation",
      description: "Multiple anonymization techniques inform generation of artificial records with same statistical properties but no real patient data, providing ultimate privacy protection.",
      activeNodes: ['synthetic-data'],
      activeEdges: ['e9', 'e10', 'e11']
    },
    {
      title: "Privacy Preservation Success and Core Principle",
      description: "Comprehensive approach reduces re-identification risk to <0.1% while maintaining AI training utility, proving that mathematical guarantees require multiple defense techniques.",
      activeNodes: ['privacy-preserved', 'anonymization-principle'],
      activeEdges: ['e12', 'e13', 'e14']
    }
  ]
};