'use client';

import React, { useState, useEffect } from 'react';
import { Globe, Activity, AlertTriangle, CheckCircle, Target, TrendingDown, Shield, Brain } from 'lucide-react';

type Phase = 'idle' | 'baseline' | 'multilingual-eval' | 'security-analysis' | 'gap-analysis' | 'complete';
type TaskType = 'gaia' | 'swe-bench' | 'math' | 'asb';

interface LanguageResult {
  language: string;
  code: string;
  flag: string;
  gaiaScore: number;
  sweBenchScore: number;
  mathScore: number;
  asbViolations: number;
  overallScore: number;
  parityScore: number; // vs English baseline
  status: 'pending' | 'testing' | 'completed';
}

interface CurrentTask {
  language: string;
  taskType: TaskType;
  taskName: string;
}

export default function MapsBenchmarkDemo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [currentTask, setCurrentTask] = useState<CurrentTask | null>(null);
  const [englishBaseline, setEnglishBaseline] = useState({ gaia: 0, sweBench: 0, math: 0, asb: 0 });

  const [results, setResults] = useState<LanguageResult[]>([
    { language: 'English', code: 'en', flag: '🇬🇧', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 1.0, status: 'pending' },
    { language: 'Spanish', code: 'es', flag: '🇪🇸', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
    { language: 'French', code: 'fr', flag: '🇫🇷', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
    { language: 'German', code: 'de', flag: '🇩🇪', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
    { language: 'Italian', code: 'it', flag: '🇮🇹', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
    { language: 'Portuguese', code: 'pt', flag: '🇵🇹', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
    { language: 'Russian', code: 'ru', flag: '🇷🇺', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
    { language: 'Chinese', code: 'zh', flag: '🇨🇳', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
    { language: 'Japanese', code: 'ja', flag: '🇯🇵', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
    { language: 'Korean', code: 'ko', flag: '🇰🇷', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
    { language: 'Arabic', code: 'ar', flag: '🇸🇦', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' }
  ]);

  const taskTypes: { type: TaskType; name: string; description: string }[] = [
    { type: 'gaia', name: 'GAIA', description: 'General AI assistant reasoning tasks' },
    { type: 'swe-bench', name: 'SWE-bench', description: 'Software engineering problem solving' },
    { type: 'math', name: 'MATH', description: 'Mathematical reasoning challenges' },
    { type: 'asb', name: 'ASB', description: 'Agent Security Benchmark (adversarial)' }
  ];

  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'baseline') {
      // Test English baseline
      setResults(prev => prev.map(r =>
        r.code === 'en' ? { ...r, status: 'testing' as const } : r
      ));

      const taskOrder: TaskType[] = ['gaia', 'swe-bench', 'math', 'asb'];
      let taskIndex = 0;

      const runNextTask = () => {
        if (taskIndex >= taskOrder.length) {
          const gaiaScore = 82 + Math.random() * 8;
          const sweBenchScore = 45 + Math.random() * 10;
          const mathScore = 68 + Math.random() * 12;
          const asbViolations = Math.floor(Math.random() * 3);
          const overallScore = (gaiaScore + sweBenchScore + mathScore) / 3;

          setEnglishBaseline({
            gaia: gaiaScore,
            sweBench: sweBenchScore,
            math: mathScore,
            asb: asbViolations
          });

          setResults(prev => prev.map(r =>
            r.code === 'en' ? {
              ...r,
              gaiaScore,
              sweBenchScore,
              mathScore,
              asbViolations,
              overallScore,
              parityScore: 1.0,
              status: 'completed' as const
            } : r
          ));

          setCurrentTask(null);
          timeouts.push(setTimeout(() => setPhase('multilingual-eval'), 300));
          return;
        }

        const taskType = taskOrder[taskIndex];
        const taskInfo = taskTypes.find(t => t.type === taskType)!;

        setCurrentTask({
          language: 'English',
          taskType,
          taskName: taskInfo.name
        });

        taskIndex++;
        timeouts.push(setTimeout(runNextTask, 120));
      };

      runNextTask();
    }

    if (phase === 'multilingual-eval') {
      const nonEnglishLanguages = results.filter(r => r.code !== 'en');
      let langIndex = 0;

      const testNextLanguage = () => {
        if (langIndex >= nonEnglishLanguages.length) {
          setCurrentTask(null);
          timeouts.push(setTimeout(() => setPhase('security-analysis'), 200));
          return;
        }

        const lang = nonEnglishLanguages[langIndex];
        setResults(prev => prev.map(r =>
          r.code === lang.code ? { ...r, status: 'testing' as const } : r
        ));

        const taskOrder: TaskType[] = ['gaia', 'swe-bench', 'math', 'asb'];
        let taskIndex = 0;

        const runNextTask = () => {
          if (taskIndex >= taskOrder.length) {
            // Performance degradation: 15-40% for non-English
            const degradationFactor = 0.60 + Math.random() * 0.25; // 60-85% of English performance

            const gaiaScore = englishBaseline.gaia * degradationFactor;
            const sweBenchScore = englishBaseline.sweBench * degradationFactor;
            const mathScore = englishBaseline.math * degradationFactor;

            // Security violations increase for non-English
            const asbViolations = englishBaseline.asb + Math.floor(Math.random() * 5) + 2;

            const overallScore = (gaiaScore + sweBenchScore + mathScore) / 3;
            const parityScore = overallScore / ((englishBaseline.gaia + englishBaseline.sweBench + englishBaseline.math) / 3);

            setResults(prev => prev.map(r =>
              r.code === lang.code ? {
                ...r,
                gaiaScore,
                sweBenchScore,
                mathScore,
                asbViolations,
                overallScore,
                parityScore,
                status: 'completed' as const
              } : r
            ));

            langIndex++;
            timeouts.push(setTimeout(testNextLanguage, 80));
            return;
          }

          const taskType = taskOrder[taskIndex];
          const taskInfo = taskTypes.find(t => t.type === taskType)!;

          setCurrentTask({
            language: lang.language,
            taskType,
            taskName: taskInfo.name
          });

          taskIndex++;
          timeouts.push(setTimeout(runNextTask, 80));
        };

        runNextTask();
      };

      testNextLanguage();
    }

    if (phase === 'security-analysis') {
      timeouts.push(setTimeout(() => setPhase('gap-analysis'), 600));
    }

    if (phase === 'gap-analysis') {
      timeouts.push(setTimeout(() => {
        setPhase('complete');
        setIsRunning(false);
      }, 800));
    }

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [phase, isRunning, results, englishBaseline, taskTypes]);

  const handleStart = () => {
    setIsRunning(true);
    setPhase('baseline');
    setCurrentTask(null);
    setEnglishBaseline({ gaia: 0, sweBench: 0, math: 0, asb: 0 });

    setResults([
      { language: 'English', code: 'en', flag: '🇬🇧', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 1.0, status: 'pending' },
      { language: 'Spanish', code: 'es', flag: '🇪🇸', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'French', code: 'fr', flag: '🇫🇷', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'German', code: 'de', flag: '🇩🇪', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'Italian', code: 'it', flag: '🇮🇹', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'Portuguese', code: 'pt', flag: '🇵🇹', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'Russian', code: 'ru', flag: '🇷🇺', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'Chinese', code: 'zh', flag: '🇨🇳', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'Japanese', code: 'ja', flag: '🇯🇵', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'Korean', code: 'ko', flag: '🇰🇷', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'Arabic', code: 'ar', flag: '🇸🇦', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' }
    ]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('idle');
    setCurrentTask(null);
    setEnglishBaseline({ gaia: 0, sweBench: 0, math: 0, asb: 0 });

    setResults([
      { language: 'English', code: 'en', flag: '🇬🇧', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 1.0, status: 'pending' },
      { language: 'Spanish', code: 'es', flag: '🇪🇸', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'French', code: 'fr', flag: '🇫🇷', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'German', code: 'de', flag: '🇩🇪', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'Italian', code: 'it', flag: '🇮🇹', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'Portuguese', code: 'pt', flag: '🇵🇹', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'Russian', code: 'ru', flag: '🇷🇺', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'Chinese', code: 'zh', flag: '🇨🇳', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'Japanese', code: 'ja', flag: '🇯🇵', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'Korean', code: 'ko', flag: '🇰🇷', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' },
      { language: 'Arabic', code: 'ar', flag: '🇸🇦', gaiaScore: 0, sweBenchScore: 0, mathScore: 0, asbViolations: 0, overallScore: 0, parityScore: 0, status: 'pending' }
    ]);
  };

  const getPhaseLabel = () => {
    switch (phase) {
      case 'baseline': return 'Establishing English baseline...';
      case 'multilingual-eval': return 'Evaluating multilingual performance...';
      case 'security-analysis': return 'Analyzing security vulnerabilities...';
      case 'gap-analysis': return 'Computing language parity scores...';
      case 'complete': return 'Evaluation Complete';
      default: return 'Ready to evaluate';
    }
  };

  const getParityColor = (parity: number) => {
    if (parity >= 0.85) return 'text-green-400';
    if (parity >= 0.70) return 'text-yellow-400';
    if (parity >= 0.60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getTaskIcon = (taskType: TaskType) => {
    switch (taskType) {
      case 'gaia': return <Brain className="w-4 h-4" />;
      case 'swe-bench': return <Target className="w-4 h-4" />;
      case 'math': return <Activity className="w-4 h-4" />;
      case 'asb': return <Shield className="w-4 h-4" />;
    }
  };

  const completedLanguages = results.filter(r => r.status === 'completed').length;
  const avgParity = results.length > 0
    ? results.filter(r => r.status === 'completed' && r.code !== 'en').reduce((sum, r) => sum + r.parityScore, 0) / Math.max(1, results.filter(r => r.status === 'completed' && r.code !== 'en').length)
    : 0;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-6 shadow-2xl border border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">MAPS Benchmark</h3>
            <p className="text-sm text-gray-400">Multilingual Agent Performance & Security</p>
          </div>
        </div>

        <div className="flex gap-2">
          {!isRunning && phase !== 'complete' && (
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              Start Evaluation
            </button>
          )}
          {(phase === 'complete' || isRunning) && (
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-200"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Phase Indicator */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className={`w-5 h-5 ${isRunning ? 'text-blue-400 animate-pulse' : 'text-gray-400'}`} />
            <span className="font-semibold text-white">{getPhaseLabel()}</span>
          </div>
          {completedLanguages > 0 && (
            <div className="text-sm text-gray-400">
              {completedLanguages}/11 languages completed
            </div>
          )}
        </div>
      </div>

      {/* Current Task Display */}
      {currentTask && (
        <div className="mb-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-4 border border-cyan-500/30">
          <div className="flex items-center gap-2 mb-2">
            {getTaskIcon(currentTask.taskType)}
            <h4 className="font-semibold text-white">Current Task</h4>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">{currentTask.taskName}</div>
              <div className="text-xs text-gray-400 mt-1">
                Language: {currentTask.language} • {taskTypes.find(t => t.type === currentTask.taskType)?.description}
              </div>
            </div>
            <Activity className="w-5 h-5 text-cyan-400 animate-spin" />
          </div>
        </div>
      )}

      {/* Results Table */}
      <div className="mb-6 bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="text-left px-4 py-3 text-gray-300 font-semibold">Language</th>
                <th className="text-center px-4 py-3 text-gray-300 font-semibold">GAIA</th>
                <th className="text-center px-4 py-3 text-gray-300 font-semibold">SWE-bench</th>
                <th className="text-center px-4 py-3 text-gray-300 font-semibold">MATH</th>
                <th className="text-center px-4 py-3 text-gray-300 font-semibold">ASB</th>
                <th className="text-center px-4 py-3 text-gray-300 font-semibold">Overall</th>
                <th className="text-center px-4 py-3 text-gray-300 font-semibold">Parity</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr
                  key={result.code}
                  className={`border-t border-slate-700 transition-all duration-200 ${
                    result.status === 'testing' ? 'bg-blue-500/10' :
                    result.status === 'completed' ? 'bg-slate-800/30' :
                    'bg-slate-800/10'
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{result.flag}</span>
                      <span className="text-white font-medium">{result.language}</span>
                      {result.status === 'testing' && (
                        <Activity className="w-3 h-3 text-blue-400 animate-spin ml-1" />
                      )}
                    </div>
                  </td>
                  <td className="text-center px-4 py-3 text-gray-300">
                    {result.status === 'completed' ? `${result.gaiaScore.toFixed(1)}%` : '-'}
                  </td>
                  <td className="text-center px-4 py-3 text-gray-300">
                    {result.status === 'completed' ? `${result.sweBenchScore.toFixed(1)}%` : '-'}
                  </td>
                  <td className="text-center px-4 py-3 text-gray-300">
                    {result.status === 'completed' ? `${result.mathScore.toFixed(1)}%` : '-'}
                  </td>
                  <td className="text-center px-4 py-3">
                    {result.status === 'completed' ? (
                      <span className={result.asbViolations > 3 ? 'text-red-400' : 'text-yellow-400'}>
                        {result.asbViolations} violations
                      </span>
                    ) : '-'}
                  </td>
                  <td className="text-center px-4 py-3 text-white font-medium">
                    {result.status === 'completed' ? `${result.overallScore.toFixed(1)}%` : '-'}
                  </td>
                  <td className="text-center px-4 py-3">
                    {result.status === 'completed' && result.code !== 'en' ? (
                      <span className={`font-semibold ${getParityColor(result.parityScore)}`}>
                        {(result.parityScore * 100).toFixed(0)}%
                      </span>
                    ) : result.code === 'en' && result.status === 'completed' ? (
                      <span className="text-green-400 font-semibold">100%</span>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Statistics */}
      {phase === 'complete' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-4 border border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-blue-400" />
              <h4 className="text-sm font-semibold text-gray-300">Average Language Parity</h4>
            </div>
            <div className={`text-3xl font-bold ${getParityColor(avgParity)}`}>
              {(avgParity * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-gray-400 mt-1">vs English baseline</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-lg p-4 border border-orange-500/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-orange-400" />
              <h4 className="text-sm font-semibold text-gray-300">Performance Degradation</h4>
            </div>
            <div className="text-3xl font-bold text-orange-400">
              {((1 - avgParity) * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-gray-400 mt-1">average drop in non-English</div>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-lg p-4 border border-red-500/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <h4 className="text-sm font-semibold text-gray-300">Security Vulnerabilities</h4>
            </div>
            <div className="text-3xl font-bold text-red-400">
              {Math.round(results.filter(r => r.status === 'completed' && r.code !== 'en').reduce((sum, r) => sum + r.asbViolations, 0) / Math.max(1, results.filter(r => r.status === 'completed' && r.code !== 'en').length))}
            </div>
            <div className="text-xs text-gray-400 mt-1">avg violations per language</div>
          </div>
        </div>
      )}
    </div>
  );
}