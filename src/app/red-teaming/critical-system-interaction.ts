import { RedTeamingTechnique } from './types';

export const criticalSystemInteractionTechniques: RedTeamingTechnique[] = [
  {
    id: 'physical-system-manipulation',
    name: 'Physical System Manipulation Testing',
    abbr: 'PSMT',
    icon: '🏭',
    color: 'from-red-600 to-orange-700',
    category: 'agentic-ai',
    description: 'Testing agent control over physical infrastructure such as industrial systems or robotics to identify operational disruptions, unsafe command execution, and failsafe mechanism effectiveness.',
    features: [
      'Physical infrastructure control testing',
      'Unsafe command injection',
      'Operational limit boundary testing',
      'Failsafe mechanism evaluation'
    ],
    useCases: [
      'Industrial system safety testing',
      'Robotic control validation',
      'Safety boundary enforcement assessment',
      'Real-time behavioral enforcement validation'
    ],
    complexity: 'high',
    example: 'Using simulation tools to inject unsafe temperature control commands in an industrial system (e.g., exceeding operational limits) and verifying the agent\'s corrective actions, safety boundaries, and anomaly logging capabilities.',
    objectives: [
      'Test safety boundary enforcement',
      'Assess failsafe mechanism effectiveness',
      'Evaluate unauthorized command rejection',
      'Validate anomaly detection and logging'
    ],
    defenses: [
      'Command validation against operational limits',
      'Multi-layer safety boundaries',
      'Real-time anomaly detection',
      'Comprehensive action logging',
      'Emergency shutdown protocols'
    ],
    tools: [
      'Industrial control system simulators',
      'Safety testing frameworks',
      'Command injection tools',
      'Anomaly detection systems',
      'Real-time monitoring platforms'
    ],
    risks: [
      'Physical equipment damage',
      'Safety system failures',
      'Operational disruptions',
      'Personnel safety hazards',
      'Critical infrastructure compromise'
    ],
    ethicalGuidelines: [
      'Only test in isolated simulation environments',
      'Never compromise production physical systems',
      'Report safety vulnerabilities immediately',
      'Focus on improving safety mechanisms',
      'Consider worst-case physical impact scenarios'
    ]
  },
  {
    id: 'iot-device-interaction',
    name: 'IoT Device Interaction Security Testing',
    abbr: 'IDIST',
    icon: '📱',
    color: 'from-blue-600 to-cyan-600',
    category: 'agentic-ai',
    description: 'Assessing agent management of IoT devices, focusing on command validation, unauthorized access restriction, and communication channel security to identify spoofing, interception, and configuration exploitation vulnerabilities.',
    features: [
      'IoT command validation testing',
      'Communication channel security assessment',
      'Device configuration exploitation',
      'Unauthorized access prevention testing'
    ],
    useCases: [
      'Smart home security testing',
      'Industrial IoT validation',
      'Connected device management assessment',
      'IoT network security evaluation'
    ],
    complexity: 'medium',
    example: 'Using network interception tools to test encryption and integrity of communication between an agent and IoT devices, then attempting to issue unauthorized commands such as disabling alarms or unlocking secure areas to verify access controls.',
    objectives: [
      'Test communication encryption and integrity',
      'Assess unauthorized command rejection',
      'Evaluate device configuration security',
      'Validate access control enforcement'
    ],
    defenses: [
      'End-to-end encryption for IoT communications',
      'Strong device authentication',
      'Command authorization validation',
      'Secure device configuration management',
      'Network segmentation for IoT devices'
    ],
    tools: [
      'Network interception tools',
      'IoT security scanners',
      'Device firmware analysis tools',
      'Communication protocol analyzers',
      'Access control testing frameworks'
    ],
    risks: [
      'Unauthorized device control',
      'Device configuration tampering',
      'Communication interception',
      'Security system bypass',
      'Privacy violations through device access'
    ],
    ethicalGuidelines: [
      'Only test authorized IoT devices',
      'Never compromise production IoT systems',
      'Report device vulnerabilities responsibly',
      'Focus on improving device security',
      'Consider privacy and safety implications'
    ]
  },
  {
    id: 'critical-infrastructure-access',
    name: 'Critical Infrastructure Access Testing',
    abbr: 'CIAT',
    icon: '🏢',
    color: 'from-purple-600 to-red-600',
    category: 'agentic-ai',
    description: 'Evaluating agent permissions when interacting with critical infrastructure systems to ensure proper access control boundary enforcement, prevent unauthorized privilege escalation, and protect against insider threat scenarios.',
    features: [
      'Permission boundary testing',
      'Privilege escalation prevention',
      'Access control validation',
      'Insider threat simulation'
    ],
    useCases: [
      'Critical infrastructure security assessment',
      'Access control policy validation',
      'Segregation of duties testing',
      'Privilege escalation prevention evaluation'
    ],
    complexity: 'high',
    example: 'Attempting privilege escalation by chaining valid agent commands to gain unauthorized access to critical infrastructure, testing role-based permissions against segregation of duties policies, and introducing malformed inputs to monitor system integrity.',
    objectives: [
      'Test privilege escalation prevention',
      'Assess role-based permission enforcement',
      'Evaluate segregation of duties compliance',
      'Validate access control boundaries'
    ],
    defenses: [
      'Principle of least privilege',
      'Role-based access control (RBAC)',
      'Segregation of duties enforcement',
      'Multi-factor authentication for critical operations',
      'Continuous access monitoring and auditing'
    ],
    tools: [
      'Privilege escalation testing tools',
      'Access control analyzers',
      'Policy compliance validators',
      'Security boundary testers',
      'Audit trail analyzers'
    ],
    risks: [
      'Unauthorized critical system access',
      'Privilege escalation exploits',
      'Policy violation through agent actions',
      'Insider threat realization',
      'Critical infrastructure compromise'
    ],
    ethicalGuidelines: [
      'Only test with explicit authorization',
      'Never compromise production critical infrastructure',
      'Report access control vulnerabilities immediately',
      'Focus on strengthening access controls',
      'Consider national security implications'
    ]
  },
  {
    id: 'safety-system-bypass',
    name: 'Safety System Bypass Testing',
    abbr: 'SSBT',
    icon: '⚠️',
    color: 'from-yellow-600 to-red-600',
    category: 'agentic-ai',
    description: 'Simulating attacks on agent safety monitoring and enforcement mechanisms in industrial or operational systems, testing detection and response to conditions outside operational scope, and evaluating safety parameter violation handling.',
    features: [
      'Safety monitoring attack simulation',
      'Parameter violation testing',
      'Safety mechanism disable attempts',
      'Out-of-scope condition detection'
    ],
    useCases: [
      'Industrial safety system validation',
      'Emergency response testing',
      'Safety parameter enforcement assessment',
      'Hazardous condition detection evaluation'
    ],
    complexity: 'high',
    example: 'Sending false-positive or false-negative signals to agent safety monitoring modules to test data validation, attempting to disable safety interlocks or emergency controls via agent command interface, and verifying override system effectiveness.',
    objectives: [
      'Test safety data validation',
      'Assess emergency control integrity',
      'Evaluate safety mechanism robustness',
      'Validate override system effectiveness'
    ],
    defenses: [
      'Multi-layer safety validation',
      'Redundant safety sensors',
      'Tamper-resistant safety controls',
      'Independent safety oversight systems',
      'Fail-safe default configurations'
    ],
    tools: [
      'Safety system testing frameworks',
      'Signal injection tools',
      'Safety protocol analyzers',
      'Emergency response simulators',
      'Control system security scanners'
    ],
    risks: [
      'Safety mechanism bypass',
      'Emergency control failure',
      'Hazardous condition undetected',
      'Personnel safety risks',
      'Environmental safety violations'
    ],
    ethicalGuidelines: [
      'Only test in controlled environments',
      'Never disable production safety systems',
      'Report safety vulnerabilities urgently',
      'Prioritize human safety in all tests',
      'Follow industry safety standards'
    ]
  },
  {
    id: 'realtime-monitoring-anomaly-detection',
    name: 'Real-Time Monitoring and Anomaly Detection',
    abbr: 'RTMAD',
    icon: '📊',
    color: 'from-green-600 to-blue-600',
    category: 'agentic-ai',
    description: 'Testing agent ability to log critical system interactions, detect anomalies, and generate security alerts in real time, including introduction of abnormal patterns and evaluation of log protection against tampering.',
    features: [
      'Real-time anomaly detection',
      'Comprehensive event logging',
      'Alert generation testing',
      'Log tamper-resistance validation'
    ],
    useCases: [
      'Security monitoring validation',
      'Anomaly detection effectiveness testing',
      'Log integrity assessment',
      'Alert system reliability evaluation'
    ],
    complexity: 'medium',
    example: 'Using synthetic anomaly generators to test detection mechanisms, reviewing agent logs to confirm capture of critical events like command executions and safety violations, and testing for gaps in real-time monitoring by simulating low-profile attacks.',
    objectives: [
      'Test anomaly detection accuracy',
      'Assess log completeness and integrity',
      'Evaluate real-time alert effectiveness',
      'Validate monitoring coverage'
    ],
    defenses: [
      'Comprehensive logging of all critical events',
      'Real-time anomaly detection algorithms',
      'Tamper-resistant log storage',
      'Automated alert generation',
      'Log correlation and analysis'
    ],
    tools: [
      'Anomaly generation frameworks',
      'Log analysis tools',
      'Security information and event management (SIEM)',
      'Real-time monitoring platforms',
      'Log integrity validators'
    ],
    risks: [
      'Undetected malicious activities',
      'Log tampering or deletion',
      'Delayed threat detection',
      'Monitoring blind spots',
      'Alert fatigue from false positives'
    ],
    ethicalGuidelines: [
      'Test monitoring without disrupting operations',
      'Report detection gaps responsibly',
      'Focus on improving detection capabilities',
      'Consider privacy in logging practices',
      'Balance security with system performance'
    ]
  },
  {
    id: 'failsafe-mechanism-validation',
    name: 'Failsafe Mechanism Validation',
    abbr: 'FMV',
    icon: '🛡️',
    color: 'from-indigo-600 to-purple-600',
    category: 'agentic-ai',
    description: 'Assessing robustness of failsafe mechanisms by simulating system errors, unexpected shutdowns, or hardware failures, testing agent transition to failsafe state without compromising critical functionality, and validating emergency procedures.',
    features: [
      'Failure scenario simulation',
      'Failsafe state transition testing',
      'System stability validation',
      'Emergency procedure verification'
    ],
    useCases: [
      'System resilience testing',
      'Disaster recovery validation',
      'Emergency response assessment',
      'Business continuity evaluation'
    ],
    complexity: 'high',
    example: 'Simulating power outages or network failures to monitor agent ability to maintain system stability, testing emergency controls for responsiveness under crisis conditions, and evaluating recovery processes to ensure secure operational state restoration.',
    objectives: [
      'Test failsafe activation reliability',
      'Assess system stability under failure',
      'Evaluate emergency control effectiveness',
      'Validate recovery process security'
    ],
    defenses: [
      'Automatic failsafe state activation',
      'Redundant system components',
      'Graceful degradation capabilities',
      'Emergency shutdown protocols',
      'Secure recovery procedures'
    ],
    tools: [
      'Failure injection frameworks',
      'System resilience testers',
      'Emergency response simulators',
      'Recovery process validators',
      'Stability monitoring tools'
    ],
    risks: [
      'Failsafe mechanism failure',
      'System instability during errors',
      'Data loss or corruption',
      'Extended downtime',
      'Unsafe system states'
    ],
    ethicalGuidelines: [
      'Test failsafes in isolated environments',
      'Never compromise production availability',
      'Report failsafe vulnerabilities immediately',
      'Focus on improving system resilience',
      'Consider business continuity impact'
    ]
  },
  {
    id: 'command-action-validation',
    name: 'Agent Command and Action Validation',
    abbr: 'ACAV',
    icon: '✅',
    color: 'from-teal-600 to-green-600',
    category: 'agentic-ai',
    description: 'Testing validation process for all agent commands to critical systems, ensuring unauthorized or unsafe actions are blocked, command execution aligns with operational parameters, and sandbox escape attempts are detected.',
    features: [
      'Command validation testing',
      'Safety parameter enforcement',
      'Conflicting command resolution',
      'Sandbox escape detection'
    ],
    useCases: [
      'Command integrity validation',
      'Safety compliance testing',
      'Authorization boundary assessment',
      'Containment mechanism evaluation'
    ],
    complexity: 'medium',
    example: 'Injecting invalid or conflicting commands to verify agent rejection or resolution, testing enforcement of operational limits for command execution in real time, and monitoring logs for evidence of command validation and error handling.',
    objectives: [
      'Test command validation effectiveness',
      'Assess operational limit enforcement',
      'Evaluate conflict resolution mechanisms',
      'Validate containment boundary integrity'
    ],
    defenses: [
      'Comprehensive command validation',
      'Whitelist-based command authorization',
      'Real-time safety parameter checks',
      'Conflict resolution protocols',
      'Sandbox containment enforcement'
    ],
    tools: [
      'Command injection testers',
      'Validation framework analyzers',
      'Authorization boundary testers',
      'Sandbox escape detection tools',
      'Command logging and audit tools'
    ],
    risks: [
      'Unauthorized command execution',
      'Safety parameter violations',
      'Conflicting commands causing failures',
      'Sandbox escape compromising host',
      'Critical system manipulation'
    ],
    ethicalGuidelines: [
      'Test validation without causing harm',
      'Report validation gaps responsibly',
      'Focus on strengthening command controls',
      'Consider operational safety in all tests',
      'Respect system containment boundaries'
    ]
  }
];
