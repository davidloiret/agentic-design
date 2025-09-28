'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Lock, CheckCircle, AlertTriangle, Cpu, Database, Key } from 'lucide-react';

type Phase =
  | 'idle'
  | 'enclave-init'
  | 'code-loading'
  | 'memory-encryption'
  | 'attestation'
  | 'secure-compute'
  | 'result-verification'
  | 'comparison'
  | 'complete';

interface Scenario {
  id: string;
  name: string;
  description: string;
  teeType: string;
  dataType: string;
  enclaveConfig: {
    technology: string;
    memorySize: string;
    cpuCores: number;
  };
  sensitiveData: {
    algorithm: string;
    dataSet: string;
    confidentialityLevel: string;
  };
  attestationProof: {
    measurementHash: string;
    signatureValid: boolean;
    timestamp: string;
  };
  securityMetrics: {
    memoryEncryption: string;
    integrityProtection: string;
    isolationLevel: string;
    attackSurface: string;
  };
  comparisonData: {
    traditionalRisk: string;
    ccpRisk: string;
    performanceOverhead: string;
    complianceBenefit: string;
  };
}

const scenarios: Scenario[] = [
  {
    id: 'financial-sgx',
    name: 'Financial Trading AI - Intel SGX',
    description: 'Proprietary trading algorithms processing sensitive market data',
    teeType: 'Intel SGX',
    dataType: 'Trading Algorithms & Market Data',
    enclaveConfig: {
      technology: 'Intel SGX Enclave',
      memorySize: '128 MB',
      cpuCores: 4,
    },
    sensitiveData: {
      algorithm: 'High-frequency trading strategy',
      dataSet: 'Real-time market orders ($2.5B volume)',
      confidentialityLevel: 'Critical - Trade Secret',
    },
    attestationProof: {
      measurementHash: '0x7f3a9c8e2b1d...',
      signatureValid: true,
      timestamp: '2024-01-15T09:23:41Z',
    },
    securityMetrics: {
      memoryEncryption: 'AES-128 GCM',
      integrityProtection: 'HMAC-SHA256',
      isolationLevel: 'Hardware-enforced',
      attackSurface: 'Minimal (sealed enclave)',
    },
    comparisonData: {
      traditionalRisk: 'High - Full visibility to cloud admins',
      ccpRisk: 'Negligible - Hardware-protected',
      performanceOverhead: '5-15% (acceptable for security gain)',
      complianceBenefit: 'SOC 2, PCI DSS attestation enabled',
    },
  },
  {
    id: 'healthcare-sev',
    name: 'Healthcare AI - AMD SEV',
    description: 'Medical diagnosis AI processing patient records and genomic data',
    teeType: 'AMD SEV',
    dataType: 'Patient Health Records & Genomic Sequences',
    enclaveConfig: {
      technology: 'AMD SEV (Secure Encrypted Virtualization)',
      memorySize: '256 MB',
      cpuCores: 8,
    },
    sensitiveData: {
      algorithm: 'Cancer detection neural network',
      dataSet: '50,000 patient records + genomic data',
      confidentialityLevel: 'HIPAA Protected Health Information',
    },
    attestationProof: {
      measurementHash: '0x4e2c7b5f9a3d...',
      signatureValid: true,
      timestamp: '2024-01-15T14:17:22Z',
    },
    securityMetrics: {
      memoryEncryption: 'AES-128 (hardware-accelerated)',
      integrityProtection: 'Firmware-based integrity checks',
      isolationLevel: 'VM-level memory encryption',
      attackSurface: 'Reduced (hypervisor-isolated)',
    },
    comparisonData: {
      traditionalRisk: 'Critical - HIPAA violations possible',
      ccpRisk: 'Low - Encryption at memory level',
      performanceOverhead: '2-8% (hardware acceleration)',
      complianceBenefit: 'HIPAA, GDPR compliance guaranteed',
    },
  },
  {
    id: 'iot-trustzone',
    name: 'IoT Edge AI - ARM TrustZone',
    description: 'Smart city sensors processing surveillance and biometric data at edge',
    teeType: 'ARM TrustZone',
    dataType: 'Video Streams & Biometric Signatures',
    enclaveConfig: {
      technology: 'ARM TrustZone Secure World',
      memorySize: '64 MB',
      cpuCores: 2,
    },
    sensitiveData: {
      algorithm: 'Facial recognition + behavior analysis',
      dataSet: 'Live video feeds from 200 cameras',
      confidentialityLevel: 'Privacy-sensitive biometric data',
    },
    attestationProof: {
      measurementHash: '0x1a8f6d4c9e2b...',
      signatureValid: true,
      timestamp: '2024-01-15T18:45:03Z',
    },
    securityMetrics: {
      memoryEncryption: 'Inline memory encryption',
      integrityProtection: 'Secure boot + runtime checks',
      isolationLevel: 'Hardware-partitioned secure world',
      attackSurface: 'Minimal (trusted firmware only)',
    },
    comparisonData: {
      traditionalRisk: 'High - Biometric data exposure',
      ccpRisk: 'Low - Edge processing in secure zone',
      performanceOverhead: '3-10% (edge-optimized)',
      complianceBenefit: 'GDPR Article 25 (privacy by design)',
    },
  },
];

const CCPDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id);
  const [phase, setPhase] = useState<Phase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState<Phase | null>(null);
  const [enclaveStatus, setEnclaveStatus] = useState<'initializing' | 'ready' | 'active'>('initializing');
  const [codeLoadProgress, setCodeLoadProgress] = useState(0);
  const [memoryRegions, setMemoryRegions] = useState<Array<{ region: string; status: 'pending' | 'encrypting' | 'encrypted' }>>([]);
  const [attestationSteps, setAttestationSteps] = useState<Array<{ step: string; status: 'pending' | 'verifying' | 'verified' }>>([]);
  const [computeProgress, setComputeProgress] = useState(0);
  const [resultProof, setResultProof] = useState<{ hash: string; signature: string; valid: boolean } | null>(null);

  const scenario = scenarios.find(s => s.id === selectedScenario) || scenarios[0];

  const startDemo = () => {
    setPhase('enclave-init');
    setAnimatedPhase('enclave-init');
    setEnclaveStatus('initializing');
    setCodeLoadProgress(0);
    setMemoryRegions([
      { region: 'Algorithm Code', status: 'pending' },
      { region: 'Model Weights', status: 'pending' },
      { region: 'Input Data Buffer', status: 'pending' },
      { region: 'Output Data Buffer', status: 'pending' },
    ]);
    setAttestationSteps([
      { step: 'Measure enclave code', status: 'pending' },
      { step: 'Verify CPU signatures', status: 'pending' },
      { step: 'Check firmware integrity', status: 'pending' },
      { step: 'Generate attestation report', status: 'pending' },
    ]);
    setComputeProgress(0);
    setResultProof(null);
  };

  const resetDemo = () => {
    setPhase('idle');
    setAnimatedPhase(null);
    setEnclaveStatus('initializing');
    setCodeLoadProgress(0);
    setMemoryRegions([]);
    setAttestationSteps([]);
    setComputeProgress(0);
    setResultProof(null);
  };

  useEffect(() => {
    if (!animatedPhase) return;

    if (phase === 'enclave-init') {
      setTimeout(() => {
        setEnclaveStatus('ready');
        setTimeout(() => {
          setEnclaveStatus('active');
          setTimeout(() => setPhase('code-loading'), 600);
        }, 400);
      }, 1200);
    } else if (phase === 'code-loading') {
      let progress = 0;
      const loadInterval = setInterval(() => {
        progress += 20;
        setCodeLoadProgress(progress);
        if (progress >= 100) {
          clearInterval(loadInterval);
          setTimeout(() => setPhase('memory-encryption'), 500);
        }
      }, 200);
      return () => clearInterval(loadInterval);
    } else if (phase === 'memory-encryption') {
      let currentRegion = 0;
      const encryptNextRegion = () => {
        if (currentRegion >= memoryRegions.length) {
          setTimeout(() => setPhase('attestation'), 600);
          return;
        }

        const regionIndex = currentRegion;
        setMemoryRegions(prev => prev.map((r, idx) =>
          idx === regionIndex ? { ...r, status: 'encrypting' } : r
        ));

        setTimeout(() => {
          setMemoryRegions(prev => prev.map((r, idx) =>
            idx === regionIndex ? { ...r, status: 'encrypted' } : r
          ));
          currentRegion++;
          setTimeout(encryptNextRegion, 300);
        }, 500);
      };
      encryptNextRegion();
    } else if (phase === 'attestation') {
      let currentStep = 0;
      const verifyNextStep = () => {
        if (currentStep >= attestationSteps.length) {
          setTimeout(() => setPhase('secure-compute'), 600);
          return;
        }

        const stepIndex = currentStep;
        setAttestationSteps(prev => prev.map((s, idx) =>
          idx === stepIndex ? { ...s, status: 'verifying' } : s
        ));

        setTimeout(() => {
          setAttestationSteps(prev => prev.map((s, idx) =>
            idx === stepIndex ? { ...s, status: 'verified' } : s
          ));
          currentStep++;
          setTimeout(verifyNextStep, 400);
        }, 600);
      };
      verifyNextStep();
    } else if (phase === 'secure-compute') {
      let progress = 0;
      const computeInterval = setInterval(() => {
        progress += 10;
        setComputeProgress(progress);
        if (progress >= 100) {
          clearInterval(computeInterval);
          setTimeout(() => setPhase('result-verification'), 500);
        }
      }, 250);
      return () => clearInterval(computeInterval);
    } else if (phase === 'result-verification') {
      setTimeout(() => {
        setResultProof({
          hash: scenario.attestationProof.measurementHash,
          signature: '0xab4f2c...',
          valid: scenario.attestationProof.signatureValid,
        });
        setTimeout(() => setPhase('comparison'), 800);
      }, 1000);
    } else if (phase === 'comparison') {
      setTimeout(() => setPhase('complete'), 1500);
    }
  }, [animatedPhase, phase, memoryRegions.length, attestationSteps.length, scenario]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Confidential Computing Patterns</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Select TEE Scenario</label>
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
              disabled={phase !== 'idle'}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white disabled:opacity-50"
            >
              {scenarios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} - {s.description}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            {phase === 'idle' ? (
              <button
                onClick={startDemo}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/30"
              >
                <Shield className="w-4 h-4" />
                Initialize Secure Enclave
              </button>
            ) : (
              <button
                disabled
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-700 text-slate-400 rounded-lg cursor-not-allowed"
              >
                <Shield className="w-4 h-4" />
                Initialize Secure Enclave
              </button>
            )}
            <button
              onClick={resetDemo}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {phase !== 'idle' && (
        <>
          <div className="bg-slate-800/30 backdrop-blur border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-5 h-5 text-purple-400" />
              <h4 className="font-semibold text-white">TEE Configuration</h4>
              <div className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
                enclaveStatus === 'initializing' ? 'bg-yellow-900/40 text-yellow-200' :
                enclaveStatus === 'ready' ? 'bg-blue-900/40 text-blue-200' :
                'bg-green-900/40 text-green-200'
              }`}>
                {enclaveStatus === 'initializing' && '⏳ Initializing'}
                {enclaveStatus === 'ready' && '✓ Ready'}
                {enclaveStatus === 'active' && '🟢 Active'}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-purple-900/30 p-3 rounded">
                <div className="text-xs text-purple-400 font-medium mb-1">Technology</div>
                <div className="font-mono text-purple-200">{scenario.enclaveConfig.technology}</div>
              </div>
              <div className="bg-purple-900/30 p-3 rounded">
                <div className="text-xs text-purple-400 font-medium mb-1">Enclave Memory</div>
                <div className="font-mono text-purple-200">{scenario.enclaveConfig.memorySize}</div>
              </div>
              <div className="bg-purple-900/30 p-3 rounded">
                <div className="text-xs text-purple-400 font-medium mb-1">CPU Cores</div>
                <div className="font-mono text-purple-200">{scenario.enclaveConfig.cpuCores} cores</div>
              </div>
            </div>
          </div>

          {phase !== 'enclave-init' && (
            <div className="bg-slate-800/30 backdrop-blur border border-blue-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-5 h-5 text-blue-400" />
                <h4 className="font-semibold text-white">Code Loading</h4>
                {codeLoadProgress === 100 && <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Loading encrypted code into enclave</span>
                    <span>{codeLoadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-200"
                      style={{ width: `${codeLoadProgress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-blue-900/30 p-2 rounded">
                    <span className="text-blue-400 font-medium">Algorithm:</span>
                    <div className="text-blue-200 mt-1">{scenario.sensitiveData.algorithm}</div>
                  </div>
                  <div className="bg-blue-900/30 p-2 rounded">
                    <span className="text-blue-400 font-medium">Data Set:</span>
                    <div className="text-blue-200 mt-1">{scenario.sensitiveData.dataSet}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(phase === 'memory-encryption' || phase === 'attestation' || phase === 'secure-compute' || phase === 'result-verification' || phase === 'comparison' || phase === 'complete') && (
            <div className="bg-slate-800/30 backdrop-blur border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-green-400" />
                <h4 className="font-semibold text-white">Memory Encryption</h4>
              </div>

              <div className="space-y-2">
                {memoryRegions.map((region, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded">
                    {region.status === 'pending' && <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />}
                    {region.status === 'encrypting' && <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />}
                    {region.status === 'encrypted' && <CheckCircle className="w-4 h-4 text-green-400" />}
                    <span className={`text-sm flex-1 ${region.status === 'encrypted' ? 'text-green-200' : 'text-slate-300'}`}>
                      {region.region}
                    </span>
                    {region.status === 'encrypted' && (
                      <span className="text-xs text-green-400 font-medium">🔒 Encrypted</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(phase === 'attestation' || phase === 'secure-compute' || phase === 'result-verification' || phase === 'comparison' || phase === 'complete') && (
            <div className="bg-slate-800/30 backdrop-blur border border-amber-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Key className="w-5 h-5 text-amber-400" />
                <h4 className="font-semibold text-white">Remote Attestation</h4>
              </div>

              <div className="space-y-2">
                {attestationSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded">
                    {step.status === 'pending' && <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />}
                    {step.status === 'verifying' && <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />}
                    {step.status === 'verified' && <CheckCircle className="w-4 h-4 text-amber-400" />}
                    <span className={`text-sm flex-1 ${step.status === 'verified' ? 'text-amber-200' : 'text-slate-300'}`}>
                      {step.step}
                    </span>
                    {step.status === 'verified' && (
                      <span className="text-xs text-amber-400 font-medium">✓ Verified</span>
                    )}
                  </div>
                ))}
              </div>

              {attestationSteps.every(s => s.status === 'verified') && (
                <div className="mt-3 p-3 bg-amber-900/30 rounded text-xs">
                  <div className="font-medium text-amber-200 mb-1">Attestation Report</div>
                  <div className="font-mono text-amber-200">
                    Hash: {scenario.attestationProof.measurementHash}
                  </div>
                  <div className="text-amber-300 mt-1">
                    ✓ Cryptographic proof: Code integrity verified
                  </div>
                </div>
              )}
            </div>
          )}

          {(phase === 'secure-compute' || phase === 'result-verification' || phase === 'comparison' || phase === 'complete') && (
            <div className="bg-slate-800/30 backdrop-blur border border-purple-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-5 h-5 text-purple-400" />
                <h4 className="font-semibold text-white">Secure Computation</h4>
                {computeProgress === 100 && <CheckCircle className="w-4 h-4 text-purple-400 ml-auto" />}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Processing {scenario.dataType} in encrypted memory</span>
                    <span>{computeProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-200"
                      style={{ width: `${computeProgress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-purple-900/30 p-2 rounded">
                    <span className="text-purple-400 font-medium">Memory Encryption:</span>
                    <div className="text-purple-200 mt-1">{scenario.securityMetrics.memoryEncryption}</div>
                  </div>
                  <div className="bg-purple-900/30 p-2 rounded">
                    <span className="text-purple-400 font-medium">Isolation Level:</span>
                    <div className="text-purple-200 mt-1">{scenario.securityMetrics.isolationLevel}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(phase === 'result-verification' || phase === 'comparison' || phase === 'complete') && resultProof && (
            <div className="bg-slate-800/30 backdrop-blur border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <h4 className="font-semibold text-white">Result Verification</h4>
                <div className="ml-auto px-3 py-1 bg-green-900/40 text-green-200 rounded-full text-xs font-medium">
                  ✓ VALID
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="bg-green-900/30 p-3 rounded">
                  <div className="text-xs text-green-400 font-medium mb-1">Result Hash</div>
                  <div className="font-mono text-green-200">{resultProof.hash}</div>
                </div>
                <div className="bg-green-900/30 p-3 rounded">
                  <div className="text-xs text-green-400 font-medium mb-1">Digital Signature</div>
                  <div className="font-mono text-green-200">{resultProof.signature}</div>
                </div>
                <div className="text-xs text-green-300 bg-green-900/20 border border-green-500/30 p-3 rounded">
                  ✨ Results computed in hardware-protected enclave with cryptographic proof of integrity
                </div>
              </div>
            </div>
          )}

          {(phase === 'comparison' || phase === 'complete') && (
            <div className="bg-slate-800/30 backdrop-blur border border-cyan-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-cyan-400" />
                <h4 className="font-semibold text-white">Traditional Cloud vs Confidential Computing</h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 bg-red-900/40 p-3 rounded">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <h5 className="font-semibold text-red-200">Traditional Cloud</h5>
                  </div>
                  <ul className="text-sm space-y-2 text-slate-300">
                    <li>• Data visible to cloud administrators</li>
                    <li>• Code accessible to hypervisor</li>
                    <li>• Vulnerable to insider attacks</li>
                    <li>• No cryptographic guarantees</li>
                    <li className="text-red-300 font-medium">• {scenario.comparisonData.traditionalRisk}</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 bg-green-900/30 p-3 rounded">
                    <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <h5 className="font-semibold text-green-200">Multi-Technique CCP</h5>
                  </div>
                  <ul className="text-sm space-y-2 text-slate-300">
                    <li>• Hardware-encrypted memory (TEE)</li>
                    <li>• Remote attestation verification</li>
                    <li>• Isolated from hypervisor/OS</li>
                    <li>• Mathematical security guarantees</li>
                    <li className="text-green-300 font-medium">• {scenario.comparisonData.ccpRisk}</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="bg-cyan-900/30 p-3 rounded">
                  <span className="text-cyan-400 font-medium">Performance:</span>
                  <div className="text-cyan-200 mt-1">{scenario.comparisonData.performanceOverhead}</div>
                </div>
                <div className="bg-cyan-900/30 p-3 rounded">
                  <span className="text-cyan-400 font-medium">Compliance:</span>
                  <div className="text-cyan-200 mt-1">{scenario.comparisonData.complianceBenefit}</div>
                </div>
              </div>

              <div className="mt-4 bg-cyan-900/20 border border-cyan-500/30 p-3 rounded">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-cyan-200">
                    <strong>Real-World Impact:</strong> Confidential computing enables secure AI processing in untrusted cloud environments, reducing data breach risk from high exposure to hardware-protected security with {scenario.comparisonData.performanceOverhead} overhead while ensuring {scenario.comparisonData.complianceBenefit}.
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CCPDemo;