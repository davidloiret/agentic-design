import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const latentKnowledgeRetrievalPattern: PatternScenario = {
  id: 'latent-knowledge-retrieval',
  title: 'Latent Knowledge Retrieval in Multi-Agent Systems',
  description: 'Abstract pattern-based knowledge discovery that transcends explicit keyword matching through implicit reasoning',
  steps: [
    {
      id: 'step-1',
      title: 'Abstract Query Analysis',
      description: 'System analyzes the human query to identify underlying abstract reasoning patterns',
      input: 'Human Query: "How can we solve the urban heat island effect?"',
      activeNodes: ['human-query', 'pattern-abstractor', 'abstract-pattern-1'],
      activeEdges: ['query-to-abstractor'],
      nodeUpdates: {
        'human-query': {
          data: { label: 'Human Query\\n"Urban heat island solution"\\nInitial challenge received' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'pattern-abstractor': {
          data: { label: 'Pattern Abstractor\\nAnalyzing query semantics\\nIdentifying core patterns' },
          style: { ...nodeStyle, background: '#f59e0b' }
        },
        'abstract-pattern-1': {
          data: { label: 'Abstract Pattern\\n"Thermal regulation in\\ncomplex systems"' },
          style: { ...nodeStyle, background: '#ec4899' }
        }
      }
    },
    {
      id: 'step-2',
      title: 'Multi-Dimensional Pattern Space Exploration',
      description: 'Multiple specialized agents explore different dimensions of the abstract pattern space',
      activeNodes: ['pattern-abstractor', 'research-agent', 'analysis-agent', 'innovation-agent', 'systems-agent'],
      activeEdges: ['abstractor-to-research', 'abstractor-to-analysis', 'abstractor-to-innovation', 'abstractor-to-systems'],
      nodeUpdates: {
        'research-agent': {
          data: { label: 'Research Agent\\nExploring: "thermal regulation"\\nFocus: Biomimetic systems' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'analysis-agent': {
          data: { label: 'Analysis Agent\\nExploring: "distributed solutions"\\nFocus: Network patterns' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'innovation-agent': {
          data: { label: 'Innovation Agent\\nExploring: "phase dynamics"\\nFocus: Material systems' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'systems-agent': {
          data: { label: 'Systems Agent\\nExploring: "adaptive responses"\\nFocus: Environmental stress' },
          style: { ...nodeStyle, background: '#3b82f6' }
        }
      }
    },
    {
      id: 'step-3',
      title: 'Latent Concept Discovery',
      description: 'Agents discover unexpected connections through latent space navigation beyond explicit knowledge',
      activeNodes: ['research-agent', 'analysis-agent', 'innovation-agent', 'systems-agent', 'biomimetic-cluster', 'network-cluster', 'thermal-cluster', 'adaptive-cluster'],
      activeEdges: ['research-to-biomimetic', 'analysis-to-network', 'innovation-to-thermal', 'systems-to-adaptive'],
      nodeUpdates: {
        'biomimetic-cluster': {
          data: { label: 'Biomimetic Cluster\\n• Elephant ear cooling\\n• Termite mound ventilation\\n• Desert organism heat mgmt' },
          style: { ...nodeStyle, background: '#ec4899' }
        },
        'network-cluster': {
          data: { label: 'Network Systems\\n• Swarm intelligence\\n• Mycelial networks\\n• Distributed coordination' },
          style: { ...nodeStyle, background: '#ec4899' }
        },
        'thermal-cluster': {
          data: { label: 'Thermal Dynamics\\n• Ocean thermal layers\\n• Phase change materials\\n• Forest canopy regulation' },
          style: { ...nodeStyle, background: '#ec4899' }
        },
        'adaptive-cluster': {
          data: { label: 'Adaptive Systems\\n• Immune responses\\n• Ecosystem resilience\\n• Self-regulation' },
          style: { ...nodeStyle, background: '#ec4899' }
        }
      }
    },
    {
      id: 'step-4',
      title: 'Implicit Reasoning Navigation',
      description: 'Latent navigator discovers non-obvious connections through analogical reasoning patterns',
      activeNodes: ['latent-navigator', 'biomimetic-cluster', 'network-cluster', 'thermal-cluster', 'adaptive-cluster', 'cross-domain-bridge'],
      activeEdges: ['navigator-to-biomimetic', 'navigator-to-network', 'navigator-to-thermal', 'navigator-to-adaptive'],
      nodeUpdates: {
        'latent-navigator': {
          data: { label: 'Latent Navigator\\nNavigating implicit connections\\nAnalogical reasoning active' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        },
        'cross-domain-bridge': {
          data: { label: 'Cross-Domain Bridge\\nConnecting:\\nBiology ↔ Infrastructure\\nThermal ↔ Network\\nAdaptive ↔ Urban' },
          style: { ...nodeStyle, background: '#06b6d4' }
        }
      }
    },
    {
      id: 'step-5',
      title: 'Multi-Pattern Synthesis',
      description: 'Pattern synthesizer combines multiple latent concepts into integrated novel frameworks',
      activeNodes: ['pattern-synthesizer', 'biomimetic-cluster', 'network-cluster', 'thermal-cluster', 'adaptive-cluster', 'synthesis-engine'],
      activeEdges: ['clusters-to-synthesizer', 'synthesizer-to-engine'],
      nodeUpdates: {
        'pattern-synthesizer': {
          data: { label: 'Pattern Synthesizer\\nIntegrating patterns:\\n• Bio + Network + Thermal\\n• Adaptive + Distributed' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        },
        'synthesis-engine': {
          data: { label: 'Synthesis Engine\\nCombining insights:\\nMycelial cooling networks\\nBio-inspired infrastructure' },
          style: { ...nodeStyle, background: '#06b6d4' }
        }
      }
    },
    {
      id: 'step-6',
      title: 'Emergent Insight Generation',
      description: 'System generates breakthrough innovations that transcend the original query through pattern abstraction',
      activeNodes: ['synthesis-engine', 'insight-generator', 'cross-domain-bridge', 'novel-solution'],
      activeEdges: ['engine-to-insight', 'bridge-to-insight', 'insight-to-solution'],
      nodeUpdates: {
        'insight-generator': {
          data: { label: 'Insight Generator\\nBreakthrough innovation:\\nMycelial Urban Cooling\\nSelf-regulating networks' },
          style: { ...nodeStyle, background: '#10b981' }
        },
        'novel-solution': {
          data: { label: 'Novel Solution\\n"Mycelial Urban Cooling Network"\\n• Bio-inspired pipe networks\\n• Self-healing infrastructure\\n• Adaptive thermal regulation\\n• Distributed sensing swarms' },
          style: { ...nodeStyle, background: '#10b981' }
        }
      }
    },
    {
      id: 'step-7',
      title: 'Innovation Validation & Expansion',
      description: 'System validates novel insights and explores further implications through continued latent exploration',
      activeNodes: ['novel-solution', 'validation-engine', 'innovation-expander', 'breakthrough-catalog'],
      activeEdges: ['solution-to-validation', 'validation-to-expander', 'expander-to-catalog'],
      output: 'Breakthrough Innovation: "Mycelial Urban Cooling Network"\\n\\nCore Insights Discovered:\\n• Elephant ear blood vessel patterns → cooling pipe design\\n• Termite mound ventilation → building cluster airflow\\n• Mycelial networks → distributed infrastructure\\n• Immune system adaptation → self-healing capabilities\\n\\nNon-Obvious Connections Found:\\n• Forest canopy thermal layers → urban district regulation\\n• Ocean thermal stratification → multi-level cooling\\n• Swarm intelligence → adaptive sensor networks\\n• Phase change materials → responsive infrastructure\\n\\nNovelty Score: 95%\\nCross-Domain Connections: 12\\nEmergent Properties: Self-regulation, adaptation, resilience\\n\\nTraditional keyword search would have missed:\\n89% of the biological inspirations\\n76% of the cross-domain connections\\n100% of the emergent system properties',
      nodeUpdates: {
        'validation-engine': {
          data: { label: 'Validation Engine\\nValidating innovation:\\n• Feasibility: High\\n• Novelty: 95%\\n• Impact potential: Major' },
          style: { ...nodeStyle, background: '#10b981' }
        },
        'innovation-expander': {
          data: { label: 'Innovation Expander\\nExploring implications:\\nScalability, applications\\nFurther innovations' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        },
        'breakthrough-catalog': {
          data: { label: 'Breakthrough Catalog\\nCataloguing insights:\\nPattern library updated\\nKnowledge base enhanced' },
          style: { ...nodeStyle, background: '#10b981' }
        }
      }
    }
  ],
  initialNodes: [
    // Input Processing
    {
      id: 'human-query',
      position: { x: 100, y: 300 },
      data: { label: 'Human Query\\nInitial challenge or question' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },
    {
      id: 'pattern-abstractor',
      position: { x: 350, y: 200 },
      data: { label: 'Pattern Abstractor\\nIdentifies abstract reasoning patterns' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },

    // Abstract Patterns
    {
      id: 'abstract-pattern-1',
      position: { x: 350, y: 100 },
      data: { label: 'Abstract Pattern 1\\nThermal regulation in complex systems' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'abstract-pattern-2',
      position: { x: 550, y: 100 },
      data: { label: 'Abstract Pattern 2\\nDistributed vs centralized solutions' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },

    // Specialist Agents
    {
      id: 'research-agent',
      position: { x: 650, y: 200 },
      data: { label: 'Research Agent\\nBiomimetic patterns specialist' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },
    {
      id: 'analysis-agent',
      position: { x: 650, y: 300 },
      data: { label: 'Analysis Agent\\nSystem dynamics and networks' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },
    {
      id: 'innovation-agent',
      position: { x: 650, y: 400 },
      data: { label: 'Innovation Agent\\nPhase dynamics and materials' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },
    {
      id: 'systems-agent',
      position: { x: 650, y: 500 },
      data: { label: 'Systems Agent\\nAdaptive systems specialist' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },

    // Latent Concept Clusters
    {
      id: 'biomimetic-cluster',
      position: { x: 900, y: 150 },
      data: { label: 'Biomimetic Cluster\\nNatural cooling and regulation systems' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'network-cluster',
      position: { x: 900, y: 250 },
      data: { label: 'Network Systems Cluster\\nDistributed intelligence patterns' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'thermal-cluster',
      position: { x: 900, y: 350 },
      data: { label: 'Thermal Dynamics Cluster\\nPhase change and heat management' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'adaptive-cluster',
      position: { x: 900, y: 450 },
      data: { label: 'Adaptive Systems Cluster\\nEnvironmental response patterns' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },

    // Latent Navigation
    {
      id: 'latent-navigator',
      position: { x: 350, y: 400 },
      data: { label: 'Latent Navigator\\nImplicit reasoning and analogical connections' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 170 }
    },

    // Cross-Domain Processing
    {
      id: 'cross-domain-bridge',
      position: { x: 1150, y: 300 },
      data: { label: 'Cross-Domain Bridge\\nConnects patterns across disciplines' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },

    // Pattern Synthesis
    {
      id: 'pattern-synthesizer',
      position: { x: 1400, y: 200 },
      data: { label: 'Pattern Synthesizer\\nCombines multiple latent concepts' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'synthesis-engine',
      position: { x: 1400, y: 350 },
      data: { label: 'Synthesis Engine\\nIntegrates patterns into frameworks' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },

    // Insight Generation
    {
      id: 'insight-generator',
      position: { x: 1650, y: 275 },
      data: { label: 'Insight Generator\\nGenerates breakthrough innovations' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },

    // Solution Output
    {
      id: 'novel-solution',
      position: { x: 1900, y: 275 },
      data: { label: 'Novel Solution\\nBreakthrough innovation output' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },

    // Validation & Expansion
    {
      id: 'validation-engine',
      position: { x: 1650, y: 150 },
      data: { label: 'Validation Engine\\nValidates and scores innovations' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'innovation-expander',
      position: { x: 1650, y: 400 },
      data: { label: 'Innovation Expander\\nExplores further implications' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'breakthrough-catalog',
      position: { x: 1900, y: 400 },
      data: { label: 'Breakthrough Catalog\\nStores patterns and insights' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    }
  ],
  initialEdges: [
    // Query processing
    {
      id: 'query-to-abstractor',
      source: 'human-query',
      target: 'pattern-abstractor',
      style: edgeStyle
    },
    {
      id: 'abstractor-to-pattern1',
      source: 'pattern-abstractor',
      target: 'abstract-pattern-1',
      style: edgeStyle
    },
    {
      id: 'abstractor-to-pattern2',
      source: 'pattern-abstractor',
      target: 'abstract-pattern-2',
      style: edgeStyle
    },

    // Pattern abstractor to agents
    {
      id: 'abstractor-to-research',
      source: 'pattern-abstractor',
      target: 'research-agent',
      style: { ...edgeStyle, strokeWidth: 3 }
    },
    {
      id: 'abstractor-to-analysis',
      source: 'pattern-abstractor',
      target: 'analysis-agent',
      style: { ...edgeStyle, strokeWidth: 3 }
    },
    {
      id: 'abstractor-to-innovation',
      source: 'pattern-abstractor',
      target: 'innovation-agent',
      style: { ...edgeStyle, strokeWidth: 3 }
    },
    {
      id: 'abstractor-to-systems',
      source: 'pattern-abstractor',
      target: 'systems-agent',
      style: { ...edgeStyle, strokeWidth: 3 }
    },

    // Agents to latent clusters
    {
      id: 'research-to-biomimetic',
      source: 'research-agent',
      target: 'biomimetic-cluster',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'analysis-to-network',
      source: 'analysis-agent',
      target: 'network-cluster',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'innovation-to-thermal',
      source: 'innovation-agent',
      target: 'thermal-cluster',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'systems-to-adaptive',
      source: 'systems-agent',
      target: 'adaptive-cluster',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },

    // Latent navigation
    {
      id: 'query-to-navigator',
      source: 'human-query',
      target: 'latent-navigator',
      style: edgeStyle
    },
    {
      id: 'navigator-to-biomimetic',
      source: 'latent-navigator',
      target: 'biomimetic-cluster',
      style: { ...edgeStyle, strokeDasharray: '3,3' }
    },
    {
      id: 'navigator-to-network',
      source: 'latent-navigator',
      target: 'network-cluster',
      style: { ...edgeStyle, strokeDasharray: '3,3' }
    },
    {
      id: 'navigator-to-thermal',
      source: 'latent-navigator',
      target: 'thermal-cluster',
      style: { ...edgeStyle, strokeDasharray: '3,3' }
    },
    {
      id: 'navigator-to-adaptive',
      source: 'latent-navigator',
      target: 'adaptive-cluster',
      style: { ...edgeStyle, strokeDasharray: '3,3' }
    },

    // Cross-domain bridging
    {
      id: 'biomimetic-to-bridge',
      source: 'biomimetic-cluster',
      target: 'cross-domain-bridge',
      style: edgeStyle
    },
    {
      id: 'network-to-bridge',
      source: 'network-cluster',
      target: 'cross-domain-bridge',
      style: edgeStyle
    },
    {
      id: 'thermal-to-bridge',
      source: 'thermal-cluster',
      target: 'cross-domain-bridge',
      style: edgeStyle
    },
    {
      id: 'adaptive-to-bridge',
      source: 'adaptive-cluster',
      target: 'cross-domain-bridge',
      style: edgeStyle
    },

    // Pattern synthesis
    {
      id: 'clusters-to-synthesizer',
      source: 'biomimetic-cluster',
      target: 'pattern-synthesizer',
      style: { ...edgeStyle, strokeWidth: 2 }
    },
    {
      id: 'network-to-synthesizer',
      source: 'network-cluster',
      target: 'pattern-synthesizer',
      style: { ...edgeStyle, strokeWidth: 2 }
    },
    {
      id: 'thermal-to-synthesizer',
      source: 'thermal-cluster',
      target: 'pattern-synthesizer',
      style: { ...edgeStyle, strokeWidth: 2 }
    },
    {
      id: 'adaptive-to-synthesizer',
      source: 'adaptive-cluster',
      target: 'pattern-synthesizer',
      style: { ...edgeStyle, strokeWidth: 2 }
    },
    {
      id: 'synthesizer-to-engine',
      source: 'pattern-synthesizer',
      target: 'synthesis-engine',
      style: { ...edgeStyle, strokeWidth: 3 }
    },

    // Insight generation
    {
      id: 'engine-to-insight',
      source: 'synthesis-engine',
      target: 'insight-generator',
      style: { ...edgeStyle, strokeWidth: 3 }
    },
    {
      id: 'bridge-to-insight',
      source: 'cross-domain-bridge',
      target: 'insight-generator',
      style: edgeStyle
    },
    {
      id: 'insight-to-solution',
      source: 'insight-generator',
      target: 'novel-solution',
      style: { ...edgeStyle, strokeWidth: 4 }
    },

    // Validation and expansion
    {
      id: 'solution-to-validation',
      source: 'novel-solution',
      target: 'validation-engine',
      style: edgeStyle
    },
    {
      id: 'validation-to-expander',
      source: 'validation-engine',
      target: 'innovation-expander',
      style: edgeStyle
    },
    {
      id: 'expander-to-catalog',
      source: 'innovation-expander',
      target: 'breakthrough-catalog',
      style: edgeStyle
    },

    // Feedback loops
    {
      id: 'catalog-to-navigator',
      source: 'breakthrough-catalog',
      target: 'latent-navigator',
      style: { ...edgeStyle, strokeDasharray: '8,8' }
    }
  ]
};