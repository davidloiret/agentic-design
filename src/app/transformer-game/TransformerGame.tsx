"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, QuadraticBezierLine, Grid } from '@react-three/drei';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

type Stage =
  | 'Embeddings'
  | 'Positional'
  | 'Self-Attention'
  | 'Multi-Head'
  | 'Feed-Forward'
  | 'Decoder: Masked'
  | 'Cross-Attention'
  | 'Softmax';

const STAGES: Stage[] = [
  'Embeddings',
  'Positional',
  'Self-Attention',
  'Multi-Head',
  'Feed-Forward',
  'Decoder: Masked',
  'Cross-Attention',
  'Softmax',
];

type TokenId = 'Frodon' | 'doit' | 'détruire' | "l'Anneau";
type DecoderId = 'Frodo' | 'must' | '<next>';

type Vec3 = [number, number, number];

function polarPosition(i: number, total: number, radius: number): Vec3 {
  const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
  return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
}

function useCouncilPositions(): Record<TokenId, Vec3> {
  return useMemo(() => {
    const names: TokenId[] = ['Frodon', 'doit', 'détruire', "l'Anneau"];
    const map: Record<TokenId, Vec3> = {
      Frodon: [0, 0, 0],
      doit: [0, 0, 0],
      détruire: [0, 0, 0],
      "l'Anneau": [0, 0, 0],
    };
    names.forEach((n, i) => (map[n] = polarPosition(i, names.length, 3.2)));
    return map;
  }, []);
}

function useDecoderPositions(): Record<DecoderId, Vec3> {
  return useMemo(() => {
    const names: DecoderId[] = ['Frodo', 'must', '<next>'];
    const base: Record<DecoderId, Vec3> = {
      Frodo: [0, 0, 0],
      must: [0, 0, 0],
      '<next>': [0, 0, 0],
    };
    names.forEach((n, i) => (base[n] = [6.5, 0, -2 + i * 2]));
    return base;
  }, []);
}

function getEmbedding(token: TokenId): number[] {
  // Fake, readable features for the analogy (0..1)
  switch (token) {
    case 'Frodon':
      return [0.95, 0.85, 0.1, 0.4]; // Race/Hobbit, Importance, Magie, Action
    case 'doit':
      return [0.2, 0.4, 0.1, 0.5];
    case 'détruire':
      return [0.1, 0.7, 0.2, 0.95];
    case "l'Anneau":
      return [0.0, 1.0, 0.99, 0.1];
  }
}

function attentionWeightsFrom(source: TokenId): Record<TokenId, number> {
  // Simple, normalized weights to visualize self-attention for the analogy
  if (source === 'Frodon') return { Frodon: 0.15, doit: 0.05, détruire: 0.35, "l'Anneau": 0.45 };
  if (source === 'détruire') return { Frodon: 0.25, doit: 0.15, détruire: 0.2, "l'Anneau": 0.4 };
  if (source === 'doit') return { Frodon: 0.25, doit: 0.2, détruire: 0.35, "l'Anneau": 0.2 };
  return { Frodon: 0.2, doit: 0.1, détruire: 0.25, "l'Anneau": 0.45 };
}

function multiHeadWeightsFrom(source: TokenId): Array<{ color: string; weights: Record<TokenId, number>; label: string }> {
  // Two illustrative heads: Action->Object (red), Subject->Verb (blue)
  return [
    {
      color: '#ff5a5a',
      label: 'Comité Action→Objet',
      weights:
        source === 'Frodon'
          ? { Frodon: 0.05, doit: 0.05, détruire: 0.45, "l'Anneau": 0.45 }
          : source === 'détruire'
          ? { Frodon: 0.15, doit: 0.05, détruire: 0.1, "l'Anneau": 0.7 }
          : source === 'doit'
          ? { Frodon: 0.1, doit: 0.1, détruire: 0.5, "l'Anneau": 0.3 }
          : { Frodon: 0.05, doit: 0.05, détruire: 0.5, "l'Anneau": 0.4 },
    },
    {
      color: '#4aa3ff',
      label: 'Comité Sujet→Verbe',
      weights:
        source === 'Frodon'
          ? { Frodon: 0.4, doit: 0.15, détruire: 0.35, "l'Anneau": 0.1 }
          : source === 'détruire'
          ? { Frodon: 0.4, doit: 0.2, détruire: 0.2, "l'Anneau": 0.2 }
          : source === 'doit'
          ? { Frodon: 0.35, doit: 0.2, détruire: 0.35, "l'Anneau": 0.1 }
          : { Frodon: 0.25, doit: 0.25, détruire: 0.35, "l'Anneau": 0.15 },
    },
  ];
}

function CrossAttentionLines({ decoderToken, encoderFocus }: { decoderToken: DecoderId; encoderFocus: TokenId }) {
  const encoderPositions = useCouncilPositions();
  const decoderPositions = useDecoderPositions();
  const from = decoderPositions[decoderToken];
  const to = encoderPositions[encoderFocus];
  return (
    <QuadraticBezierLine
      start={from}
      end={to}
      color={'#9b59b6'}
      dashed={false}
      lineWidth={3}
      transparent
      opacity={0.85}
      depthTest={false}
    />
  );
}

function Token({ id, position, selected, onSelect }: { id: TokenId; position: Vec3; selected: boolean; onSelect: (id: TokenId) => void }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_s, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.4 * (selected ? 1 : 0.2);
  });
  return (
    <group position={position as any}>
      <mesh ref={ref} onClick={() => onSelect(id)} castShadow>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color={selected ? '#ffd166' : '#74c0fc'} metalness={0.2} roughness={0.4} />
      </mesh>
      <Html center distanceFactor={8} style={{ pointerEvents: 'none', transform: 'translateY(-6px)' }}>
        <div className="px-2 py-1 rounded bg-white/80 text-xs font-medium text-neutral-800 shadow">{id}</div>
      </Html>
    </group>
  );
}

function EmbeddingBars({ token, position }: { token: TokenId; position: Vec3 }) {
  const features = getEmbedding(token);
  const labels = ['Race', 'Importance', 'Magie', 'Action'];
  return (
    <group position={[position[0], position[1] + 0.9, position[2]] as any}>
      {features.map((f, i) => (
        <mesh key={i} position={[-0.9 + i * 0.6, f * 0.6, 0]}>
          <boxGeometry args={[0.2, Math.max(0.1, f * 1.2), 0.2]} />
          <meshStandardMaterial color={['#74c0fc', '#ffd166', '#c77dff', '#ef476f'][i]} />
          <Html center distanceFactor={12} position={[0, (Math.max(0.1, f * 1.2) / 2) + 0.1, 0]} style={{ pointerEvents: 'none' }}>
            <div className="text-[9px] bg-white/70 rounded px-1 py-0.5 text-neutral-700">{labels[i]}</div>
          </Html>
        </mesh>
      ))}
    </group>
  );
}

function PositionalRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((_s, dt) => {
    if (ringRef.current) ringRef.current.rotation.y += dt * 0.1;
  });
  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <torusGeometry args={[3.2, 0.03, 16, 64]} />
      <meshStandardMaterial color="#94d2bd" emissive="#2a9d8f" emissiveIntensity={0.2} />
    </mesh>
  );
}

function CouncilTable() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[3.5, 3.5, 0.2, 64]} />
        <meshStandardMaterial color="#e9ecef" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.09, 0]} receiveShadow>
        <cylinderGeometry args={[5.5, 5.5, 0.02, 64]} />
        <meshStandardMaterial color="#f8f9fa" />
      </mesh>
    </group>
  );
}

function SelfAttentionBeams({ source, color = '#ff6b6b', multiHead = false }: { source: TokenId; color?: string; multiHead?: boolean }) {
  const positions = useCouncilPositions();
  const from = positions[source];
  if (multiHead) {
    const heads = multiHeadWeightsFrom(source);
    return (
      <group>
        {heads.map((head, idx) => (
          <group key={idx}>
            {Object.entries(head.weights).map(([to, w]) => (
              <QuadraticBezierLine
                key={to}
                start={from}
                end={positions[to as TokenId]}
                color={head.color}
                lineWidth={2 + w * 8}
                dashed={false}
                transparent
                opacity={0.7}
                depthTest={false}
              />
            ))}
          </group>
        ))}
      </group>
    );
  }
  const weights = attentionWeightsFrom(source);
  return (
    <group>
      {Object.entries(weights).map(([to, w]) => (
        <QuadraticBezierLine
          key={to}
          start={from}
          end={positions[to as TokenId]}
          color={color}
          lineWidth={2 + w * 10}
          dashed={false}
          transparent
          opacity={0.75}
          depthTest={false}
        />
      ))}
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <pointLight position={[-4, 4, -4]} intensity={0.6} color={'#94d2bd'} />
    </>
  );
}

// Lightweight WebAudio beep engine
function useAudioEngine() {
  const ctxRef = useRef<AudioContext | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Precreate context lazily
    if (!ctxRef.current && typeof window !== 'undefined') {
      try {
        const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (Ctx) ctxRef.current = new Ctx();
      } catch {}
    }
  }, []);

  const resume = async () => {
    if (!ctxRef.current) return;
    if (ctxRef.current.state !== 'running') {
      await ctxRef.current.resume();
    }
    setEnabled(true);
  };

  const beep = (opts: { freq?: number; duration?: number; volume?: number } = {}) => {
    if (!enabled || !ctxRef.current) return;
    const { freq = 720, duration = 0.12, volume = 0.14 } = opts;
    const ctx = ctxRef.current;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = freq;
    g.gain.value = 0.0001;
    o.connect(g).connect(ctx.destination);
    const now = ctx.currentTime;
    g.gain.exponentialRampToValueAtTime(volume, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    o.start(now);
    o.stop(now + duration + 0.01);
  };

  return { enabled, resume, beep };
}

// Simple instanced particle stream between two points
function ParticleStream({ from, to, color = '#ff6b6b', weight = 0.3 }: { from: Vec3; to: Vec3; color?: string; weight?: number }) {
  const count = Math.max(6, Math.floor(28 * weight));
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(() => new Array(count).fill(0).map((_, i) => Math.random() + i / count), [count]);
  const vFrom = useMemo(() => new THREE.Vector3(...from), [from]);
  const vTo = useMemo(() => new THREE.Vector3(...to), [to]);
  const dir = useMemo(() => vTo.clone().sub(vFrom), [vFrom, vTo]);
  const len = useMemo(() => dir.length(), [dir]);
  const up = useMemo(() => new THREE.Vector3(0, Math.min(1.5, 0.25 * len), 0), [len]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      const s = (t * (0.35 + weight) + seeds[i]) % 1; // progress 0..1
      // Slight arced path between from and to
      const p = vFrom.clone().lerp(vTo, s).add(up.clone().multiplyScalar(Math.sin(Math.PI * s)));
      dummy.position.copy(p);
      const scale = 0.05 + 0.12 * (0.5 + 0.5 * Math.sin(12 * (s + seeds[i])));
      dummy.scale.setScalar(scale);
      dummy.lookAt(vTo);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined as any, undefined as any, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </instancedMesh>
  );
}

function SelfAttentionEffects({ source, multiHead, onPulse }: { source: TokenId; multiHead?: boolean; onPulse?: (strength: number) => void }) {
  const positions = useCouncilPositions();
  const effectsKeyRef = useRef<string>('');

  // Build unified stream list regardless of mode
  const streams = useMemo(() => {
    if (multiHead) {
      const heads = multiHeadWeightsFrom(source);
      const acc: Array<{ to: TokenId; color: string; weight: number }> = [];
      heads.forEach((h) => {
        Object.entries(h.weights).forEach(([to, w]) => {
          if (w > 0.28) acc.push({ to: to as TokenId, color: h.color, weight: w });
        });
      });
      return acc;
    }
    const weights = attentionWeightsFrom(source);
    return Object.entries(weights)
      .filter(([, w]) => w > 0.22)
      .map(([to, w]) => ({ to: to as TokenId, color: '#ff6b6b', weight: w }));
  }, [source, multiHead]);

  const key = useMemo(
    () =>
      (multiHead ? source + '::MH::' : source + '::SA::') +
      streams.map((s) => `${s.to}:${s.weight.toFixed(2)}:${s.color}`).join('|'),
    [streams, multiHead, source]
  );

  const maxW = useMemo(() => (streams.length ? Math.max(...streams.map((s) => s.weight)) : 0), [streams]);

  useEffect(() => {
    if (streams.length && effectsKeyRef.current !== key) {
      effectsKeyRef.current = key;
      onPulse?.(maxW);
    }
  }, [key, maxW, onPulse, streams.length]);

  return (
    <group>
      {streams.map((s, idx) => (
        <ParticleStream key={idx} from={positions[source]} to={positions[s.to]} color={s.color} weight={s.weight} />
      ))}
    </group>
  );
}

function LegendPanel({ stage, selected }: { stage: Stage; selected: TokenId }) {
  const label = (
    stage === 'Embeddings'
      ? "🎭 Comme chaque membre du Conseil a son identité propre (Hobbit courageux, Anneau maléfique...), chaque mot reçoit un 'profil' numérique qui capture son sens."
      : stage === 'Positional'
      ? "📍 Tout comme les membres sont placés autour de la table, on donne à chaque mot sa position dans la phrase pour garder l'ordre."
      : stage === 'Self-Attention'
      ? `💭 ${selected} se demande: "Qui dois-je écouter au Conseil?" Il calcule l'importance de chaque membre (Query×Key) puis absorbe leurs messages (Value). C'est la délibération!`
      : stage === 'Multi-Head'
      ? '🎯 Le Conseil se divise en sous-comités: un groupe analyse "qui doit détruire quoi" (Action→Objet), un autre "qui fait quoi" (Sujet→Verbe). Chaque comité a sa perspective!'
      : stage === 'Feed-Forward'
      ? '🧠 Après avoir écouté le Conseil, chaque mot réfléchit seul pour affiner sa compréhension (petit réseau de neurones). Moment de méditation individuelle.'
      : stage === 'Decoder: Masked'
      ? "⏳ Le traducteur (décodeur) avance mot à mot: 'Frodo must...' Mais il ne peut pas tricher! Il ne voit que le passé, pas le futur (masque)."
      : stage === 'Cross-Attention'
      ? "🔗 Le traducteur consulte le Conseil: 'J'ai dit Frodo must, quel mot français dois-je regarder?' Il se connecte au plan établi par l'encodeur."
      : '🎲 Softmax final: parmi tous les mots possibles (destroy, carry, eat...), lequel est le plus probable? destroy gagne avec 85% de confiance!'
  );
  return (
    <div className="rounded-xl bg-white/95 backdrop-blur-sm shadow-xl border border-white/50 px-5 py-3 text-sm text-neutral-800 max-w-2xl">
      <div className="font-bold text-base mb-1.5 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stage}</div>
      <div className="text-neutral-700 leading-relaxed">{label}</div>
    </div>
  );
}

export default function TransformerGame() {
  const [stageIdx, setStageIdx] = useState(0);
  const stage = STAGES[stageIdx];
  const [selected, setSelected] = useState<TokenId>('Frodon');
  const councilPositions = useCouncilPositions();
  const decoderPositions = useDecoderPositions();
  const audio = useAudioEngine();
  const [showSoundTip, setShowSoundTip] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [showParticles, setShowParticles] = useState(true);
  const [showEmbeddings, setShowEmbeddings] = useState(true);

  // Stage-driven audio cues for cross-attention and softmax
  useEffect(() => {
    if (!audio.enabled) return;
    if (stage === 'Cross-Attention') {
      audio.beep({ freq: 880, duration: 0.14, volume: 0.16 });
    } else if (stage === 'Softmax') {
      audio.beep({ freq: 980, duration: 0.18, volume: 0.18 });
    }
  }, [stage, audio.enabled]);

  // Autoplay through stages
  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => {
      setStageIdx((i) => (i + 1) % STAGES.length);
    }, 2500);
    return () => clearInterval(id);
  }, [autoPlay]);

  return (
    <div className="w-full min-h-[80vh] flex flex-col gap-6 p-6 bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-2xl shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🏰 Le Conseil d'Elrond: Comprendre les Transformers
          </h1>
          <p className="text-neutral-700 mt-2 text-lg">
            <strong>L'analogie:</strong> Imagine que traduire une phrase, c'est comme un Conseil où chaque mot écoute les autres avant de parler.
            Les membres du Conseil français (Frodon, doit, détruire, l'Anneau) délibèrent, puis un traducteur génère l'anglais mot par mot!
          </p>
          <p className="text-neutral-600 mt-1 text-sm italic">
            ✨ Clique sur les étapes ci-dessous et observe comment les mots "s'écoutent" grâce au mécanisme d'attention.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 transition-all hover:shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setStageIdx((i) => Math.max(0, i - 1))}
            disabled={stageIdx === 0}
          >
            ← Précédent
          </button>
          <div className="text-sm font-semibold text-neutral-700 px-3 py-2 bg-white rounded-lg border border-neutral-200">
            {stageIdx + 1} / {STAGES.length}
          </div>
          <button
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setStageIdx((i) => Math.min(STAGES.length - 1, i + 1))}
            disabled={stageIdx === STAGES.length - 1}
          >
            Suivant →
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-all hover:shadow-md ${
              audio.enabled
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                : 'bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50'
            }`}
            onClick={async () => {
              await audio.resume();
              setShowSoundTip(false);
            }}
          >
            {audio.enabled ? '🔊 Son: Activé' : '🔇 Activer le son'}
          </button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {STAGES.map((s, i) => (
          <button
            key={s}
            onClick={() => setStageIdx(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              i === stageIdx
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                : 'bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 hover:shadow-md hover:border-neutral-300'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-md ${
            autoPlay
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md'
              : 'bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700'
          }`}
          onClick={() => setAutoPlay((v) => !v)}
        >
          {autoPlay ? '▶️ Autoplay: On' : '⏸️ Autoplay: Off'}
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-md ${
            showParticles
              ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
              : 'bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700'
          }`}
          onClick={() => setShowParticles((v) => !v)}
        >
          {showParticles ? '✨ Particles: On' : '◯ Particles: Off'}
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-md ${
            showEmbeddings
              ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-md'
              : 'bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700'
          }`}
          onClick={() => setShowEmbeddings((v) => !v)}
        >
          {showEmbeddings ? '📊 Embeddings: On' : '📊 Embeddings: Off'}
        </button>
        <button
          className="px-4 py-2 rounded-lg text-sm font-medium bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 transition-all hover:shadow-md"
          onClick={() => {
            setStageIdx(0);
            setSelected('Frodon');
          }}
        >
          🔄 Reset
        </button>
      </div>

      <div className="relative w-full h-[75vh] rounded-xl overflow-hidden border-2 border-neutral-300 shadow-2xl" style={{ background: 'linear-gradient(180deg, #0f1115 0%, #121417 100%)' }}>
        <Canvas shadows camera={{ position: [7, 6, 9], fov: 45 }} onPointerDown={() => { if (!audio.enabled) audio.resume(); }}>
          {/* Background color */}
          {/* @ts-ignore - intrinsic in r3f */}
          <color attach="background" args={["#0f1115"]} />
          <Lights />
          <OrbitControls makeDefault enablePan={true} />

          {/* Ground grid for depth */}
          <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]}>
            <Grid args={[40, 40]}
              cellColor={'#2a2f36'} sectionColor={'#3a4049'}
              cellSize={0.8} sectionSize={4}
              fadeDistance={60} fadeStrength={1}
            />
          </group>

          {/* Council */}
          <CouncilTable />
          <PositionalRing />

          {/* Tokens around the table */}
          {(Object.keys(councilPositions) as TokenId[]).map((t) => (
            <group key={t}>
              <Token id={t} position={councilPositions[t]} selected={selected === t} onSelect={setSelected} />
              {stage === 'Embeddings' && showEmbeddings && <EmbeddingBars token={t} position={councilPositions[t]} />}
              {/* Subtle rune ring around the One Ring */}
              {t === "l'Anneau" && (
                <mesh rotation={[Math.PI / 2, 0, 0]} position={[councilPositions[t][0], 0.04, councilPositions[t][2]] as any}>
                  <torusGeometry args={[0.85, 0.03, 12, 48]} />
                  <meshStandardMaterial color="#ffda79" emissive="#ffd166" emissiveIntensity={0.5} />
                </mesh>
              )}
            </group>
          ))}

          {/* Self-Attention and Multi-Head visuals */}
          {stage === 'Self-Attention' && (
            <>
              <SelfAttentionBeams source={selected} />
              {showParticles && (
                <SelfAttentionEffects
                  source={selected}
                  onPulse={(strength) => audio.beep({ freq: 520 + 360 * strength, volume: 0.12 + 0.1 * strength })}
                />
              )}
            </>
          )}
          {stage === 'Multi-Head' && (
            <>
              <SelfAttentionBeams source={selected} multiHead />
              {showParticles && (
                <SelfAttentionEffects
                  source={selected}
                  multiHead
                  onPulse={(strength) => audio.beep({ freq: 680 + 300 * strength, volume: 0.12 + 0.1 * strength })}
                />
              )}
            </>
          )}

          {/* Feed-Forward: simple aura to indicate per-token processing */}
          {stage === 'Feed-Forward' && (
            <group>
              {(Object.keys(councilPositions) as TokenId[]).map((t, i) => (
                <mesh key={t} position={[...councilPositions[t]] as any}>
                  <sphereGeometry args={[0.7 + 0.05 * Math.sin(i), 16, 16]} />
                  <meshStandardMaterial color="#a0e7e5" transparent opacity={0.3} />
                </mesh>
              ))}
            </group>
          )}

          {/* Decoder row and cross-attention */}
          <group>
            <group position={[6.5, 0, 0]}>
              <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <cylinderGeometry args={[1.8, 1.8, 0.08, 32]} />
                <meshStandardMaterial color="#ffe5ec" />
              </mesh>
              {(Object.keys(decoderPositions) as DecoderId[]).map((d) => (
                <group key={d} position={decoderPositions[d] as any}>
                  <mesh castShadow>
                    <octahedronGeometry args={[0.45, 0]} />
                    <meshStandardMaterial color={d === '<next>' ? '#ffadad' : '#ffd166'} />
                  </mesh>
                  <Html center distanceFactor={8} style={{ pointerEvents: 'none', transform: 'translateY(-6px)' }}>
                    <div className="px-2 py-1 rounded bg-white/80 text-xs font-medium text-neutral-800 shadow">{d}</div>
                  </Html>
                </group>
              ))}
            </group>
            {stage === 'Decoder: Masked' && (
              <>
                <QuadraticBezierLine
                  start={decoderPositions['must']}
                  end={decoderPositions['Frodo']}
                  color={'#2ec4b6'}
                  lineWidth={6}
                />
                <Html position={[6.5, 1.2, 0]}>
                  <div className="text-xs bg-orange-100 border border-orange-300 rounded-lg px-3 py-2 text-neutral-800 shadow-md">
                    <div className="font-bold">⏳ Masque anti-triche!</div>
                    <div className="text-xs">Le traducteur ne voit que "Frodo must", pas le futur</div>
                  </div>
                </Html>
              </>
            )}

            {stage === 'Cross-Attention' && (
              <>
                <CrossAttentionLines decoderToken={'<next>'} encoderFocus={'détruire'} />
                <ParticleStream
                  from={decoderPositions['<next>']}
                  to={councilPositions['détruire']}
                  color={'#9b59b6'}
                  weight={0.7}
                />
                <Html position={[6.5, 1.2, 0]}>
                  <div className="text-xs bg-green-100 border border-green-300 rounded-lg px-3 py-2 text-neutral-800 shadow-md">
                    <div className="font-bold">🔗 Cross-Attention en action!</div>
                    <div className="text-xs">Le traducteur demande au Conseil: "quel mot français pour 'destroy'?" → "détruire"!</div>
                  </div>
                </Html>
              </>
            )}

            {stage === 'Softmax' && (
              <>
                <CrossAttentionLines decoderToken={'<next>'} encoderFocus={'détruire'} />
                <ParticleStream
                  from={decoderPositions['<next>']}
                  to={councilPositions['détruire']}
                  color={'#9b59b6'}
                  weight={0.85}
                />
                <mesh position={decoderPositions['<next>'] as any}>
                  <ringGeometry args={[0.6, 0.8, 24]} />
                  <meshBasicMaterial color="#34d399" transparent opacity={0.6} side={THREE.DoubleSide} />
                </mesh>
                <Html position={[6.5, 1.2, 0]}>
                  <div className="text-xs bg-emerald-100 border border-emerald-300 rounded-lg px-3 py-2 text-neutral-800 shadow-md">
                    <div className="font-bold">🎲 Vote final!</div>
                    <div className="text-xs">Parmi 50,000 mots anglais possibles, "destroy" gagne avec 85%!</div>
                  </div>
                </Html>
              </>
            )}
          </group>

          {/* Label above table */}
          <Html position={[0, 2.2, 0]} center>
            <LegendPanel stage={stage} selected={selected} />
          </Html>

          {/* Council table label */}
          {stage === 'Embeddings' && (
            <Html position={[0, -0.3, 0]} center>
              <div className="text-xs bg-blue-500/90 text-white px-3 py-1 rounded-full font-semibold shadow-lg">
                🏰 Le Conseil d'Elrond (Encodeur français)
              </div>
            </Html>
          )}

          {/* Decoder label */}
          {(stage === 'Decoder: Masked' || stage === 'Cross-Attention' || stage === 'Softmax') && (
            <Html position={[6.5, -0.15, 0]} center>
              <div className="text-xs bg-purple-500/90 text-white px-3 py-1 rounded-full font-semibold shadow-lg">
                📝 Le Traducteur (Décodeur anglais)
              </div>
            </Html>
          )}
        </Canvas>
        {!audio.enabled && showSoundTip && (
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm border border-blue-200 rounded-xl px-4 py-3 text-xs text-neutral-800 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-lg">💡</span>
              <span className="font-medium">Tip: cliquez « Activer le son » ou touchez la scène pour déverrouiller l'audio.</span>
            </div>
          </div>
        )}
        {stage === 'Softmax' && (
          <div className="absolute left-4 bottom-4 bg-white/95 backdrop-blur-sm border border-green-200 rounded-xl px-4 py-3 text-xs text-neutral-800 shadow-lg">
            <div className="font-bold text-sm mb-2 text-green-700">📊 Vocab top‑4</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2"><div className="w-24 h-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full" /><span className="font-medium">destroy: 0.85</span></div>
              <div className="flex items-center gap-2"><div className="w-14 h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full" /><span>carry: 0.05</span></div>
              <div className="flex items-center gap-2"><div className="w-10 h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full" /><span>save: 0.012</span></div>
              <div className="flex items-center gap-2"><div className="w-8 h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full" /><span>eat: 0.001</span></div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md border-2 border-blue-200 p-6">
        <div className="text-sm text-neutral-800 leading-relaxed">
          <div className="mb-4 p-4 bg-white/80 rounded-lg border border-blue-200">
            <p className="text-base font-bold text-neutral-900 mb-2">
              🏰 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">L'ANALOGIE:</span> Le Conseil d'Elrond = Un Transformer
            </p>
            <p className="text-sm mb-2">
              <strong>Mission du Conseil:</strong> Comprendre la phrase française « Frodon doit détruire l'Anneau » et la traduire en anglais « Frodo must destroy the Ring ».
            </p>
            <p className="text-sm text-neutral-700">
              Les 4 tokens français (Frodon, doit, détruire, l'Anneau) sont comme les membres du Conseil assis autour de la table. Ils discutent ensemble pour comprendre le sens, puis le traducteur (décodeur) génère l'anglais mot par mot.
            </p>
          </div>

          <div className="mb-3 text-base font-semibold text-neutral-900 flex items-center gap-2">
            <span className="text-2xl">🔑</span>
            <span>Concepts clés de l'Attention:</span>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 bg-white/60 p-3 rounded-lg">
              <span className="text-blue-500 text-xl flex-shrink-0">🎯</span>
              <span>
                <strong className="text-neutral-900">Q (Query) = "Qui dois-je écouter?"</strong><br/>
                <strong className="text-neutral-900">K (Key) = "Je suis disponible!"</strong><br/>
                <strong className="text-neutral-900">V (Value) = "Voici mon message"</strong><br/>
                <span className="text-xs text-neutral-600">Comme au Conseil, chaque membre pose des questions (Q), répond s'il est concerné (K), et partage son avis (V).</span>
              </span>
            </li>
            <li className="flex items-start gap-3 bg-white/60 p-3 rounded-lg">
              <span className="text-purple-500 text-xl flex-shrink-0">💭</span>
              <span>
                <strong className="text-neutral-900">Self-Attention:</strong> Frodon écoute les autres membres pour comprendre son rôle. Il calcule: "l'Anneau est super important pour moi (45%), détruire aussi (35%)..."
              </span>
            </li>
            <li className="flex items-start gap-3 bg-white/60 p-3 rounded-lg">
              <span className="text-pink-500 text-xl flex-shrink-0">🎭</span>
              <span>
                <strong className="text-neutral-900">Multi-Head:</strong> Le Conseil a plusieurs sous-comités qui analysent différents aspects en parallèle (relations action-objet, sujet-verbe, etc.).
              </span>
            </li>
            <li className="flex items-start gap-3 bg-white/60 p-3 rounded-lg">
              <span className="text-green-500 text-xl flex-shrink-0">🔗</span>
              <span>
                <strong className="text-neutral-900">Cross-Attention:</strong> Le traducteur consulte le Conseil français pour savoir quel mot anglais générer ensuite. "J'ai dit 'Frodo must', je dois regarder 'détruire' → donc 'destroy'!"
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
