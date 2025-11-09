"use client";

import React, { useState } from 'react';
import TransformerGame from './TransformerGame';
import InteractiveGame from './InteractiveGame';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { error };
  }
  componentDidCatch(error: any) {
    console.error('TransformerGame error:', error);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="w-full min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-lg p-4 bg-white/90 border border-neutral-200 rounded shadow">
            <div className="font-semibold mb-2">Le jeu a rencontré une erreur.</div>
            <div className="text-sm text-neutral-700 mb-3">Veuillez recharger la page. Si le problème persiste, ouvrez la console navigateur et partagez le message d'erreur.</div>
          </div>
        </div>
      );
    }
    return this.props.children as any;
  }
}

function GameModeSelector({ onSelectMode }: { onSelectMode: (mode: 'story' | 'free') => void }) {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="text-7xl mb-6">🏰</div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Le Conseil d'Elrond
          </h1>
          <p className="text-2xl text-gray-300">
            Une aventure interactive pour maîtriser les Transformers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Story Mode */}
          <button
            onClick={() => onSelectMode('story')}
            className="group relative overflow-hidden rounded-2xl border-4 border-amber-400 hover:border-amber-300 transition-all p-8 bg-gradient-to-br from-amber-900/40 to-orange-900/40 hover:scale-105 transform"
          >
            <div className="relative z-10">
              <div className="text-6xl mb-4">📖</div>
              <h2 className="text-3xl font-bold text-white mb-3">Mode Histoire</h2>
              <p className="text-gray-300 mb-4">
                Suivez l'aventure guidée de Gandalf et Elrond. Apprenez en résolvant des défis interactifs étape par étape.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-500/20 border border-green-400 rounded-full text-green-300 text-sm">
                  ✓ Dialogues immersifs
                </span>
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-400 rounded-full text-blue-300 text-sm">
                  ✓ Défis progressifs
                </span>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-400 rounded-full text-purple-300 text-sm">
                  ✓ Système de score
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Free Play Mode */}
          <button
            onClick={() => onSelectMode('free')}
            className="group relative overflow-hidden rounded-2xl border-4 border-blue-400 hover:border-blue-300 transition-all p-8 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 hover:scale-105 transform"
          >
            <div className="relative z-10">
              <div className="text-6xl mb-4">🎮</div>
              <h2 className="text-3xl font-bold text-white mb-3">Mode Exploration</h2>
              <p className="text-gray-300 mb-4">
                Explorez librement la scène 3D, visualisez les mécanismes, et expérimentez à votre rythme.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-500/20 border border-green-400 rounded-full text-green-300 text-sm">
                  ✓ Scène 3D interactive
                </span>
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-400 rounded-full text-blue-300 text-sm">
                  ✓ Navigation libre
                </span>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-400 rounded-full text-purple-300 text-sm">
                  ✓ Sandbox complet
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        <div className="text-center mt-8 text-gray-400 text-sm">
          💡 Conseil: Commencez par le Mode Histoire si c'est votre première visite!
        </div>
      </div>
    </div>
  );
}

export default function ClientGame() {
  const [gameMode, setGameMode] = useState<'story' | 'free' | null>(null);

  if (!gameMode) {
    return <GameModeSelector onSelectMode={setGameMode} />;
  }

  return (
    <ErrorBoundary>
      {gameMode === 'story' ? <InteractiveGame /> : <TransformerGame />}
    </ErrorBoundary>
  );
}
