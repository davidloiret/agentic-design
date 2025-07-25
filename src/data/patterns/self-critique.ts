import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const selfCritiquePattern: PatternScenario = {
  id: 'self-critique',
  title: 'Self-Critique Pattern',
  description: 'Demonstrates systematic evaluation and critique of own outputs with iterative improvement through reflection and quality assessment',
  initialNodes: [
    // Initial output generation
    {
      id: 'initial-output',
      type: 'default',
      position: { x: 500, y: 50 },
      data: { label: 'Initial Output\n"Generate market analysis report"' },
      style: { ...nodeStyle, minWidth: 200, background: '#dc2626' }
    },

    // Output analyzer
    {
      id: 'output-analyzer',
      type: 'default',
      position: { x: 500, y: 180 },
      data: { label: 'Output Analyzer\nEvaluate generated content' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Critique framework
    {
      id: 'critique-framework',
      type: 'default',
      position: { x: 500, y: 320 },
      data: { label: 'Critique Framework\nSystematic evaluation criteria' },
      style: { ...nodeStyle, minWidth: 200, background: '#f59e0b' }
    },

    // Multi-dimensional critique aspects
    {
      id: 'accuracy-checker',
      type: 'default',
      position: { x: 150, y: 480 },
      data: { label: 'Accuracy Checker\nFactual correctness' },
      style: { ...nodeStyle, minWidth: 160, background: '#3b82f6' }
    },
    {
      id: 'completeness-evaluator',
      type: 'default',
      position: { x: 350, y: 480 },
      data: { label: 'Completeness Evaluator\nCoverage assessment' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981' }
    },
    {
      id: 'clarity-assessor',
      type: 'default',
      position: { x: 550, y: 480 },
      data: { label: 'Clarity Assessor\nReadability & coherence' },
      style: { ...nodeStyle, minWidth: 160, background: '#8b5cf6' }
    },
    {
      id: 'relevance-judge',
      type: 'default',
      position: { x: 750, y: 480 },
      data: { label: 'Relevance Judge\nTopic alignment' },
      style: { ...nodeStyle, minWidth: 160, background: '#ec4899' }
    },
    {
      id: 'bias-detector',
      type: 'default',
      position: { x: 950, y: 480 },
      data: { label: 'Bias Detector\nObjectivity analysis' },
      style: { ...nodeStyle, minWidth: 160, background: '#f97316' }
    },

    // Critique results
    {
      id: 'accuracy-results',
      type: 'default',
      position: { x: 150, y: 620 },
      data: { label: 'Accuracy: 85%\nIssues: 3 unverified claims' },
      style: { ...nodeStyle, minWidth: 140, background: '#3b82f6', fontSize: '11px' }
    },
    {
      id: 'completeness-results',
      type: 'default',
      position: { x: 350, y: 620 },
      data: { label: 'Completeness: 70%\nMissing: competitor analysis' },
      style: { ...nodeStyle, minWidth: 140, background: '#10b981', fontSize: '11px' }
    },
    {
      id: 'clarity-results',
      type: 'default',
      position: { x: 550, y: 620 },
      data: { label: 'Clarity: 90%\nMinor: 2 complex sentences' },
      style: { ...nodeStyle, minWidth: 140, background: '#8b5cf6', fontSize: '11px' }
    },
    {
      id: 'relevance-results',
      type: 'default',
      position: { x: 750, y: 620 },
      data: { label: 'Relevance: 95%\nExcellent topic alignment' },
      style: { ...nodeStyle, minWidth: 140, background: '#ec4899', fontSize: '11px' }
    },
    {
      id: 'bias-results',
      type: 'default',
      position: { x: 950, y: 620 },
      data: { label: 'Bias: Low risk\n1 potential subjective statement' },
      style: { ...nodeStyle, minWidth: 140, background: '#f97316', fontSize: '11px' }
    },

    // Critique synthesizer
    {
      id: 'critique-synthesizer',
      type: 'default',
      position: { x: 500, y: 760 },
      data: { label: 'Critique Synthesizer\nCombine evaluation results' },
      style: { ...nodeStyle, minWidth: 200, background: '#db2777' }
    },

    // Improvement strategist
    {
      id: 'improvement-strategist',
      type: 'default',
      position: { x: 300, y: 900 },
      data: { label: 'Improvement Strategist\nGenerate enhancement plan' },
      style: { ...nodeStyle, minWidth: 180, background: '#7c3aed' }
    },

    // Confidence scorer
    {
      id: 'confidence-scorer',
      type: 'default',
      position: { x: 700, y: 900 },
      data: { label: 'Confidence Scorer\nAssess output reliability' },
      style: { ...nodeStyle, minWidth: 180, background: '#059669' }
    },

    // Revision engine
    {
      id: 'revision-engine',
      type: 'default',
      position: { x: 500, y: 1040 },
      data: { label: 'Revision Engine\nImplement improvements' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Supporting systems
    {
      id: 'knowledge-validator',
      type: 'default',
      position: { x: 200, y: 320 },
      data: { label: 'Knowledge Validator\nFact-checking system' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc7b16' }
    },

    {
      id: 'quality-metrics',
      type: 'default',
      position: { x: 800, y: 320 },
      data: { label: 'Quality Metrics\nQuantitative assessment' },
      style: { ...nodeStyle, minWidth: 160, background: '#ef4444' }
    },

    // Reflection database
    {
      id: 'reflection-db',
      type: 'default',
      position: { x: 100, y: 180 },
      data: { label: 'Reflection Database\nPrevious critiques & patterns' },
      style: { ...nodeStyle, minWidth: 160, background: '#0369a1' }
    },

    // Improvement tracker
    {
      id: 'improvement-tracker',
      type: 'default',
      position: { x: 900, y: 180 },
      data: { label: 'Improvement Tracker\nProgress monitoring' },
      style: { ...nodeStyle, minWidth: 160, background: '#059669' }
    },

    // Performance monitor
    {
      id: 'performance-monitor',
      type: 'default',
      position: { x: 50, y: 480 },
      data: { label: 'Performance Monitor\n• Critique cycles: 3\\n• Improvement rate: 87%\\n• Quality score: 8.5/10\\n• Processing time: 2.3s\\n• Confidence: 92%' },
      style: { ...nodeStyle, minWidth: 160, background: '#0369a1', fontSize: '11px' }
    },

    // Bias scanner
    {
      id: 'bias-scanner',
      type: 'default',
      position: { x: 1100, y: 480 },
      data: { label: 'Bias Scanner\n• Cultural bias: None detected\\n• Gender bias: None detected\\n• Age bias: None detected\\n• Confirmation bias: Low risk\\n• Selection bias: Low risk' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc7b16', fontSize: '11px' }
    },

    // Learning module
    {
      id: 'learning-module',
      type: 'default',
      position: { x: 100, y: 900 },
      data: { label: 'Learning Module\nPattern recognition\\nImprovement memory' },
      style: { ...nodeStyle, minWidth: 140, background: '#6366f1' }
    },

    // Quality assurance
    {
      id: 'quality-assurance',
      type: 'default',
      position: { x: 900, y: 900 },
      data: { label: 'Quality Assurance\nFinal validation\\nStandards compliance' },
      style: { ...nodeStyle, minWidth: 140, background: '#6366f1' }
    },

    // Final output
    {
      id: 'improved-output',
      type: 'default',
      position: { x: 500, y: 1180 },
      data: { label: 'Improved Output\nEnhanced market analysis' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Meta-reflection
    {
      id: 'meta-reflection',
      type: 'default',
      position: { x: 200, y: 1180 },
      data: { label: 'Meta-Reflection\nCritique of critique process' },
      style: { ...nodeStyle, minWidth: 160, background: '#ec4899' }
    },

    // Process optimizer
    {
      id: 'process-optimizer',
      type: 'default',
      position: { x: 800, y: 1180 },
      data: { label: 'Process Optimizer\nRefine critique methodology' },
      style: { ...nodeStyle, minWidth: 160, background: '#f97316' }
    }
  ],

  initialEdges: [
    // Initial flow
    {
      id: 'e-initial-analyzer',
      source: 'initial-output',
      target: 'output-analyzer',
      style: edgeStyle
    },
    {
      id: 'e-analyzer-framework',
      source: 'output-analyzer',
      target: 'critique-framework',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },

    // Support systems
    {
      id: 'e-analyzer-validator',
      source: 'output-analyzer',
      target: 'knowledge-validator',
      style: { ...edgeStyle, stroke: '#dc7b16' }
    },
    {
      id: 'e-analyzer-metrics',
      source: 'output-analyzer',
      target: 'quality-metrics',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },
    {
      id: 'e-analyzer-db',
      source: 'output-analyzer',
      target: 'reflection-db',
      style: { ...edgeStyle, stroke: '#0369a1' }
    },
    {
      id: 'e-analyzer-tracker',
      source: 'output-analyzer',
      target: 'improvement-tracker',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Multi-dimensional critique
    {
      id: 'e-framework-accuracy',
      source: 'critique-framework',
      target: 'accuracy-checker',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      label: 'Evaluate'
    },
    {
      id: 'e-framework-completeness',
      source: 'critique-framework',
      target: 'completeness-evaluator',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'Evaluate'
    },
    {
      id: 'e-framework-clarity',
      source: 'critique-framework',
      target: 'clarity-assessor',
      style: { ...edgeStyle, stroke: '#8b5cf6' },
      label: 'Evaluate'
    },
    {
      id: 'e-framework-relevance',
      source: 'critique-framework',
      target: 'relevance-judge',
      style: { ...edgeStyle, stroke: '#ec4899' },
      label: 'Evaluate'
    },
    {
      id: 'e-framework-bias',
      source: 'critique-framework',
      target: 'bias-detector',
      style: { ...edgeStyle, stroke: '#f97316' },
      label: 'Evaluate'
    },

    // Critique results
    {
      id: 'e-accuracy-results',
      source: 'accuracy-checker',
      target: 'accuracy-results',
      style: { ...edgeStyle, stroke: '#3b82f6' }
    },
    {
      id: 'e-completeness-results',
      source: 'completeness-evaluator',
      target: 'completeness-results',
      style: { ...edgeStyle, stroke: '#10b981' }
    },
    {
      id: 'e-clarity-results',
      source: 'clarity-assessor',
      target: 'clarity-results',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },
    {
      id: 'e-relevance-results',
      source: 'relevance-judge',
      target: 'relevance-results',
      style: { ...edgeStyle, stroke: '#ec4899' }
    },
    {
      id: 'e-bias-results',
      source: 'bias-detector',
      target: 'bias-results',
      style: { ...edgeStyle, stroke: '#f97316' }
    },

    // Results to synthesizer
    {
      id: 'e-accuracy-synthesizer',
      source: 'accuracy-results',
      target: 'critique-synthesizer',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-completeness-synthesizer',
      source: 'completeness-results',
      target: 'critique-synthesizer',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-clarity-synthesizer',
      source: 'clarity-results',
      target: 'critique-synthesizer',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-relevance-synthesizer',
      source: 'relevance-results',
      target: 'critique-synthesizer',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-bias-synthesizer',
      source: 'bias-results',
      target: 'critique-synthesizer',
      style: { ...edgeStyle, stroke: '#db2777' }
    },

    // Synthesizer to improvement and confidence
    {
      id: 'e-synthesizer-strategist',
      source: 'critique-synthesizer',
      target: 'improvement-strategist',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-synthesizer-scorer',
      source: 'critique-synthesizer',
      target: 'confidence-scorer',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // To revision engine
    {
      id: 'e-strategist-revision',
      source: 'improvement-strategist',
      target: 'revision-engine',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-scorer-revision',
      source: 'confidence-scorer',
      target: 'revision-engine',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Final output
    {
      id: 'e-revision-improved',
      source: 'revision-engine',
      target: 'improved-output',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Learning and QA
    {
      id: 'e-learning-strategist',
      source: 'learning-module',
      target: 'improvement-strategist',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-qa-revision',
      source: 'quality-assurance',
      target: 'revision-engine',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3,3' }
    },

    // Meta-reflection
    {
      id: 'e-improved-meta',
      source: 'improved-output',
      target: 'meta-reflection',
      style: { ...edgeStyle, stroke: '#ec4899' }
    },
    {
      id: 'e-improved-optimizer',
      source: 'improved-output',
      target: 'process-optimizer',
      style: { ...edgeStyle, stroke: '#f97316' }
    },

    // Monitoring
    {
      id: 'e-perf-accuracy',
      source: 'performance-monitor',
      target: 'accuracy-checker',
      style: { ...edgeStyle, stroke: '#0369a1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-bias-scanner-detector',
      source: 'bias-scanner',
      target: 'bias-detector',
      style: { ...edgeStyle, stroke: '#dc7b16', strokeDasharray: '3,3' }
    }
  ],

  steps: [
    {
      id: 'step1',
      title: 'Initial Output Generation',
      description: 'Generate initial content that requires systematic evaluation and critique.',
      input: 'Task: Generate comprehensive market analysis report for Q4 technology sector trends',
      activeNodes: ['initial-output'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Output Analysis Initialization',
      description: 'Begin systematic analysis of the generated output for quality assessment.',
      input: 'Analysis setup: prepare output for multi-dimensional critique evaluation',
      activeNodes: ['initial-output', 'output-analyzer'],
      activeEdges: ['e-initial-analyzer'],
      output: 'Output Analysis Initialized:\\n• **Content Length**: 2,847 words\\n• **Structure**: 6 main sections, 23 subsections\\n• **Claims Made**: 47 factual assertions\\n• **Data Points**: 15 statistics referenced\\n• **Sources**: 8 external references cited\\n• **Complexity Level**: Professional/Expert\\n• **Target Audience**: Business executives and analysts\\n• **Analysis Time**: Estimated 3.2 minutes for complete critique'
    },
    {
      id: 'step3',
      title: 'Support Systems Activation',
      description: 'Activate knowledge validation, quality metrics, and reflection database systems.',
      input: 'Support initialization: knowledge validation, quality metrics, reflection database, improvement tracking',
      activeNodes: ['knowledge-validator', 'quality-metrics', 'reflection-db', 'improvement-tracker'],
      activeEdges: ['e-analyzer-validator', 'e-analyzer-metrics', 'e-analyzer-db', 'e-analyzer-tracker'],
      output: 'Support Systems Ready:\\n• **Knowledge Validator**: Connected to fact-checking databases\\n• **Quality Metrics**: Benchmarking against industry standards\\n• **Reflection Database**: 1,247 previous critiques available\\n• **Improvement Tracker**: Baseline metrics established\\n• **Historical Performance**: 87% improvement rate over time\\n• **Pattern Recognition**: Common issues identified from past critiques\\n• **Success Indicators**: Quality score targets set at 8.5/10'
    },
    {
      id: 'step4',
      title: 'Critique Framework Setup',
      description: 'Establish systematic evaluation criteria and multi-dimensional assessment framework.',
      input: 'Framework setup: define evaluation criteria across accuracy, completeness, clarity, relevance, and bias',
      activeNodes: ['critique-framework'],
      activeEdges: ['e-analyzer-framework'],
      output: 'Critique Framework Established:\\n• **Evaluation Dimensions**: 5 primary assessment areas\\n• **Scoring System**: 0-100 scale with weighted criteria\\n• **Assessment Criteria**:\\n  - Accuracy: Factual correctness and verifiability\\n  - Completeness: Coverage of essential topics\\n  - Clarity: Readability and coherence\\n  - Relevance: Alignment with stated objectives\\n  - Bias: Objectivity and fairness assessment\\n• **Quality Thresholds**: Minimum 80% across all dimensions\\n• **Improvement Triggers**: Issues flagged below 75%'
    },
    {
      id: 'step5',
      title: 'Multi-Dimensional Critique Execution',
      description: 'Execute parallel evaluation across all critique dimensions simultaneously.',
      input: 'Parallel critique: accuracy checking, completeness evaluation, clarity assessment, relevance judgment, bias detection',
      activeNodes: ['accuracy-checker', 'completeness-evaluator', 'clarity-assessor', 'relevance-judge', 'bias-detector'],
      activeEdges: ['e-framework-accuracy', 'e-framework-completeness', 'e-framework-clarity', 'e-framework-relevance', 'e-framework-bias'],
      output: 'Multi-Dimensional Critique Launched:\\n• **Accuracy Checker**: Analyzing 47 factual claims\\n• **Completeness Evaluator**: Assessing topic coverage\\n• **Clarity Assessor**: Evaluating readability metrics\\n• **Relevance Judge**: Measuring objective alignment\\n• **Bias Detector**: Scanning for subjective language\\n• **Processing Mode**: Parallel execution for efficiency\\n• **Expected Duration**: 1.8 minutes for complete analysis\\n• **Confidence Level**: High reliability expected'
    },
    {
      id: 'step6',
      title: 'Critique Results Generation',
      description: 'Generate detailed results for each evaluation dimension with specific findings.',
      input: 'Results compilation: detailed findings for each critique dimension with scores and specific issues',
      activeNodes: ['accuracy-results', 'completeness-results', 'clarity-results', 'relevance-results', 'bias-results'],
      activeEdges: ['e-accuracy-results', 'e-completeness-results', 'e-clarity-results', 'e-relevance-results', 'e-bias-results'],
      output: 'Critique Results Generated:\\n\\n**Accuracy Assessment (85%)**:\\n• 3 unverified claims requiring fact-checking\\n• 2 outdated statistics (pre-2023 data)\\n• 1 unsupported projection\\n\\n**Completeness Evaluation (70%)**:\\n• Missing competitor analysis section\\n• Insufficient risk assessment coverage\\n• Limited regional market variations\\n\\n**Clarity Assessment (90%)**:\\n• 2 overly complex sentences need simplification\\n• Excellent logical flow and structure\\n• Good use of headings and transitions\\n\\n**Relevance Judgment (95%)**:\\n• Excellent alignment with stated objectives\\n• All sections directly support main thesis\\n• Strong focus on Q4 technology trends\\n\\n**Bias Detection (Low Risk)**:\\n• 1 potentially subjective statement identified\\n• Generally objective tone maintained\\n• Balanced perspective across topics'
    },
    {
      id: 'step7',
      title: 'Critique Synthesis and Integration',
      description: 'Synthesize all critique results into comprehensive evaluation summary.',
      input: 'Synthesis: combine all evaluation results into unified critique with priority rankings',
      activeNodes: ['critique-synthesizer'],
      activeEdges: ['e-accuracy-synthesizer', 'e-completeness-synthesizer', 'e-clarity-synthesizer', 'e-relevance-synthesizer', 'e-bias-synthesizer'],
      output: 'Integrated Critique Summary:\\n\\n**Overall Quality Score**: 82/100 (Good, with improvement opportunities)\\n\\n**Priority Issues**:\\n1. **High Priority**: Missing competitor analysis (Completeness)\\n2. **Medium Priority**: 3 unverified claims (Accuracy)\\n3. **Low Priority**: 2 complex sentences (Clarity)\\n\\n**Strengths Identified**:\\n• Excellent relevance and topic alignment (95%)\\n• Strong structural organization and flow\\n• Minimal bias and objective tone\\n• Comprehensive data presentation\\n\\n**Improvement Potential**: +18 points possible with targeted revisions\\n**Estimated Revision Time**: 45 minutes\\n**Confidence in Assessment**: 92%'
    },
    {
      id: 'step8',
      title: 'Improvement Strategy Development',
      description: 'Develop specific improvement strategies and confidence scoring for the output.',
      input: 'Strategy development: create actionable improvement plan with confidence assessment',
      activeNodes: ['improvement-strategist', 'confidence-scorer', 'learning-module', 'quality-assurance'],
      activeEdges: ['e-synthesizer-strategist', 'e-synthesizer-scorer', 'e-learning-strategist', 'e-qa-revision'],
      output: 'Improvement Strategy Developed:\\n\\n**Action Plan**:\\n1. **Immediate Actions** (15 minutes):\\n   - Add competitor analysis section\\n   - Simplify 2 complex sentences\\n   - Verify 3 unverified claims\\n\\n2. **Enhancement Actions** (30 minutes):\\n   - Update 2 outdated statistics\\n   - Expand risk assessment coverage\\n   - Add regional market variations\\n\\n**Confidence Assessment**:\\n• Current Confidence: 78%\\n• Post-improvement Confidence: 94%\\n• Reliability Score: High\\n• Risk Level: Low\\n\\n**Learning Insights**:\\n• Pattern: Competitor analysis frequently missed\\n• Recommendation: Add to standard template\\n• Success Rate: 94% improvement with similar revisions'
    },
    {
      id: 'step9',
      title: 'Revision Implementation',
      description: 'Implement the improvement strategies to enhance the output quality.',
      input: 'Revision execution: apply improvement strategies systematically to enhance output',
      activeNodes: ['revision-engine'],
      activeEdges: ['e-strategist-revision', 'e-scorer-revision'],
      output: 'Revision Implementation Results:\\n\\n**Changes Applied**:\\n✓ Added comprehensive competitor analysis section (847 words)\\n✓ Simplified 2 complex sentences for better readability\\n✓ Verified and updated 3 previously unverified claims\\n✓ Updated 2 statistics with 2024 data\\n✓ Expanded risk assessment with 4 key risk factors\\n✓ Added regional analysis for 3 major markets\\n\\n**Quality Improvements**:\\n• Accuracy: 85% → 94% (+9 points)\\n• Completeness: 70% → 88% (+18 points)\\n• Clarity: 90% → 93% (+3 points)\\n• Relevance: 95% → 95% (maintained)\\n• Bias: Low → Minimal (improved)\\n\\n**Revision Metrics**:\\n• Time Taken: 42 minutes\\n• Word Count: 2,847 → 3,694 words (+847)\\n• New Sources: 3 additional references'
    },
    {
      id: 'step10',
      title: 'Enhanced Output Delivery',
      description: 'Deliver the improved output with comprehensive quality validation.',
      input: 'Final delivery: present enhanced output with validation metrics and quality assurance',
      activeNodes: ['improved-output', 'performance-monitor', 'bias-scanner'],
      activeEdges: ['e-revision-improved', 'e-perf-accuracy', 'e-bias-scanner-detector'],
      output: 'Enhanced Output Delivered:\\n\\n**Final Quality Score**: 93/100 (+11 points improvement)\\n\\n**Performance Metrics**:\\n• Critique Cycles Completed: 3\\n• Improvement Rate: 87% (above average)\\n• Processing Time: 2.3 seconds\\n• Confidence Level: 94%\\n• Success Indicators: All targets exceeded\\n\\n**Quality Validation**:\\n• Factual Accuracy: 94% (all claims verified)\\n• Content Completeness: 88% (major gaps addressed)\\n• Readability Score: 93% (excellent clarity)\\n• Objective Alignment: 95% (perfect relevance)\\n• Bias Assessment: Minimal risk detected\\n\\n**Final Document Stats**:\\n• Total Words: 3,694\\n• Sections: 7 main, 28 subsections\\n• References: 11 authoritative sources\\n• Data Points: 22 current statistics\\n• Estimated Reading Time: 14 minutes'
    },
    {
      id: 'step11',
      title: 'Meta-Reflection and Process Optimization',
      description: 'Perform meta-analysis of the critique process and optimize methodology.',
      input: 'Meta-analysis: evaluate critique process effectiveness and identify optimization opportunities',
      activeNodes: ['meta-reflection', 'process-optimizer'],
      activeEdges: ['e-improved-meta', 'e-improved-optimizer'],
      output: 'Meta-Reflection Analysis:\\n\\n**Process Effectiveness**:\\n• Critique Accuracy: 96% (high precision in issue identification)\\n• Improvement Success: 11-point quality increase achieved\\n• Time Efficiency: 42 minutes revision time (within target)\\n• Systematic Coverage: All dimensions thoroughly evaluated\\n\\n**Process Insights**:\\n• **Strengths**: Multi-dimensional approach highly effective\\n• **Opportunities**: Competitor analysis check should be automated\\n• **Pattern Recognition**: Similar completeness issues in 34% of reports\\n• **Learning**: Template enhancement needed for comprehensive coverage\\n\\n**Optimization Recommendations**:\\n1. Add competitor analysis prompt to standard template\\n2. Implement automated fact-checking for statistical claims\\n3. Create readability scoring threshold alerts\\n4. Develop domain-specific critique criteria libraries\\n\\n**Process Evolution**:\\n• Critique methodology refined based on outcomes\\n• Success patterns integrated into future evaluations\\n• Quality thresholds adjusted based on performance data'
    },
    {
      id: 'step12',
      title: 'Self-Critique Pattern Completion',
      description: 'Complete the self-critique cycle with comprehensive results and learning integration.',
      output: 'Self-Critique Pattern Execution Complete:\\n\\n**Operation**: Market Analysis Report Quality Enhancement\\n**Initial Quality**: 82/100 → **Final Quality**: 93/100 (+11 points)\\n**Processing Time**: 2.3 seconds critique + 42 minutes revision\\n\\n**Critique Summary**:\\n• **Dimensions Evaluated**: 5 (Accuracy, Completeness, Clarity, Relevance, Bias)\\n• **Issues Identified**: 8 total (3 high, 3 medium, 2 low priority)\\n• **Improvements Applied**: 6 major enhancements\\n• **Quality Gain**: 13.4% overall improvement\\n• **Confidence Increase**: 78% → 94% (+16 points)\\n\\n**Self-Critique Benefits Demonstrated**:\\n✓ **Systematic Evaluation**: Multi-dimensional assessment framework\\n✓ **Quality Assurance**: Comprehensive error detection and correction\\n✓ **Objective Assessment**: Unbiased critique with quantitative metrics\\n✓ **Continuous Improvement**: Learning integration for future enhancements\\n✓ **Confidence Calibration**: Accurate reliability assessment\\n\\n**Key Performance Metrics**:\\n• **Accuracy Improvement**: 85% → 94% (+9 points)\\n• **Completeness Gain**: 70% → 88% (+18 points)\\n• **Clarity Enhancement**: 90% → 93% (+3 points)\\n• **Meta-Reflection**: Process optimization insights generated\\n• **Learning Integration**: Patterns recognized for future application\\n\\n**Self-Critique Insights**:\\n• Multi-dimensional evaluation prevents blind spots\\n• Systematic approach ensures comprehensive coverage\\n• Quantitative metrics enable objective assessment\\n• Meta-reflection drives continuous process improvement\\n• Confidence scoring provides reliability calibration\\n\\n**Comparison with Alternatives**:\\n• **vs Manual Review**: 300% faster issue identification\\n• **vs Single-dimension Check**: 250% more comprehensive\\n• **vs No Critique**: 400% higher final quality score\\n\\n**Learning Outcomes**:\\n• Template enhancement needed for competitor analysis\\n• Automated fact-checking integration recommended\\n• Domain-specific criteria libraries should be developed\\n• Process optimization yielded 15% efficiency improvement\\n\\n*Self-critique pattern achieved 93/100 quality score with 11-point improvement through systematic evaluation and iterative enhancement*'
    }
  ]
};