"use client";

import React, { useState, useCallback } from 'react';
import { STORY_STAGES, type StageData, type TokenId } from './GameState';
import { Word2VecTrainingChallenge } from './Word2VecChallenge';

interface DialogueBoxProps {
  dialogue: StageData['dialogue'];
  onComplete: () => void;
}

function DialogueBox({ dialogue, onComplete }: DialogueBoxProps) {
  const [currentLine, setCurrentLine] = useState(0);

  const line = dialogue[currentLine];
  const isLast = currentLine === dialogue.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentLine(c => c + 1);
    }
  };

  const speakerColors = {
    Gandalf: 'from-gray-600 to-gray-800',
    Elrond: 'from-blue-600 to-indigo-700',
    Frodon: 'from-green-600 to-emerald-700',
    Narrateur: 'from-purple-600 to-violet-700',
  };

  const speakerEmojis = {
    Gandalf: '🧙‍♂️',
    Elrond: '👑',
    Frodon: '🧝‍♂️',
    Narrateur: '📖',
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent p-6 z-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border-4 border-amber-400 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${speakerColors[line.speaker]} flex items-center justify-center text-3xl shadow-lg`}>
              {speakerEmojis[line.speaker]}
            </div>
            <div>
              <div className={`text-lg font-bold bg-gradient-to-r ${speakerColors[line.speaker]} bg-clip-text text-transparent`}>
                {line.speaker}
              </div>
              <div className="text-xs text-neutral-500">{currentLine + 1} / {dialogue.length}</div>
            </div>
          </div>

          <div className="text-lg text-neutral-800 leading-relaxed mb-4 min-h-[3rem]">
            {line.text}
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg hover:from-amber-600 hover:to-orange-700 transition-all hover:scale-105 shadow-lg"
            >
              {isLast ? '✨ Commencer le défi!' : '→ Suivant'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SelectTokensChallengeProps {
  instruction: string;
  correctAnswer: TokenId[];
  hint?: string;
  onComplete: (stars: number) => void;
}

function SelectTokensChallenge({ instruction, correctAnswer, hint, onComplete }: SelectTokensChallengeProps) {
  const [selected, setSelected] = useState<TokenId[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const tokens: TokenId[] = ['Frodon', 'doit', 'détruire', "l'Anneau"];

  const handleTokenClick = (token: TokenId) => {
    if (selected.includes(token)) {
      setSelected(selected.filter(t => t !== token));
    } else {
      setSelected([...selected, token]);
    }
  };

  const handleValidate = () => {
    setAttempts(a => a + 1);

    // Check if correct
    const isCorrect = selected.length === correctAnswer.length &&
                     selected.every((s, i) => s === correctAnswer[i]);

    if (isCorrect) {
      const stars = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;
      setTimeout(() => onComplete(stars), 500);
    } else {
      // Show feedback
      setShowHint(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-neutral-900 mb-2">
            🎯 Défi: Sélection des Tokens
          </div>
          <div className="text-lg text-neutral-700">
            {instruction}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {tokens.map((token, i) => {
            const isSelected = selected.includes(token);
            const selectionOrder = selected.indexOf(token) + 1;

            return (
              <button
                key={token}
                onClick={() => handleTokenClick(token)}
                className={`relative p-6 rounded-xl border-4 transition-all transform hover:scale-105 ${
                  isSelected
                    ? 'border-green-500 bg-green-50 shadow-lg scale-105'
                    : 'border-neutral-300 hover:border-neutral-400 bg-white'
                }`}
              >
                <div className="text-2xl font-bold text-neutral-900">{token}</div>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                    {selectionOrder}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {showHint && hint && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <div className="text-2xl">💡</div>
              <div>
                <div className="font-bold text-blue-900">Indice:</div>
                <div className="text-blue-800">{hint}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-3 text-center">
            <div className="text-sm font-bold text-purple-900">
              Progression: {selected.length} / {correctAnswer.length} tokens sélectionnés
            </div>
            {selected.length < correctAnswer.length && (
              <div className="text-xs text-purple-700 mt-1">
                Il faut sélectionner les {correctAnswer.length} tokens dans le bon ordre!
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-end">
            {!showHint && hint && (
              <button
                onClick={() => setShowHint(true)}
                className="px-4 py-2 rounded-lg border-2 border-blue-400 text-blue-700 hover:bg-blue-50 transition-all"
              >
                💡 Indice
              </button>
            )}
            <button
              onClick={handleValidate}
              disabled={selected.length !== correctAnswer.length}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✓ Valider {selected.length < correctAnswer.length && `(${selected.length}/${correctAnswer.length})`}
            </button>
          </div>
        </div>

        {attempts > 0 && selected.length === correctAnswer.length && (
          <div className="mt-4 text-center text-red-600 font-semibold">
            ✗ Pas tout à fait... Essaie encore!
          </div>
        )}
      </div>
    </div>
  );
}

interface AdjustValuesChallengeProps {
  instruction: string;
  correctAnswer: Record<string, number>;
  hint?: string;
  onComplete: (stars: number) => void;
}

function AdjustValuesChallenge({ instruction, correctAnswer, hint, onComplete }: AdjustValuesChallengeProps) {
  // Initialize with default values for all 3 words
  const [values, setValues] = useState<Record<string, number>>({
    frodon_entite: 0.5, frodon_action: 0.5, frodon_role: 0.5,
    doit_entite: 0.5, doit_action: 0.5, doit_role: 0.5,
    detruire_entite: 0.5, detruire_action: 0.5, detruire_role: 0.5,
  });
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  const words = [
    { name: 'Frodon', prefix: 'frodon', emoji: '🧝‍♂️' },
    { name: 'doit', prefix: 'doit', emoji: '⚡' },
    { name: 'détruire', prefix: 'detruire', emoji: '💥' }
  ];

  const dimensions = [
    { key: 'entite', label: 'Entité', description: 'personnage/objet vs mot fonctionnel' },
    { key: 'action', label: 'Action', description: 'statique vs dynamique' },
    { key: 'role', label: 'Rôle', description: 'importance dans la phrase' }
  ];

  const getProximity = (key: string, value: number): 'correct' | 'close' | 'far' => {
    const diff = Math.abs(value - correctAnswer[key]);
    if (diff < 0.15) return 'correct';
    if (diff < 0.3) return 'close';
    return 'far';
  };

  const handleValidate = () => {
    setAttempts(a => a + 1);

    // Check if values are close enough (within 0.15)
    const isCorrect = Object.keys(correctAnswer).every(
      key => Math.abs(values[key] - correctAnswer[key]) < 0.15
    );

    if (isCorrect) {
      const stars = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;
      setTimeout(() => onComplete(stars), 500);
    } else {
      // Provide specific feedback
      const newFeedback: Record<string, string> = {};
      Object.keys(correctAnswer).forEach(key => {
        const diff = values[key] - correctAnswer[key];
        if (Math.abs(diff) >= 0.15) {
          if (diff > 0) {
            newFeedback[key] = 'trop haut';
          } else {
            newFeedback[key] = 'trop bas';
          }
        }
      });
      setFeedback(newFeedback);
      setShowHint(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full p-8 my-8">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-neutral-900 mb-2">
            🎯 Créer les Embeddings
          </div>
          <div className="text-lg text-neutral-700">
            {instruction}
          </div>
        </div>

        {/* Les 3 mots */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {words.map(word => (
            <div key={word.prefix} className="border-2 border-neutral-300 rounded-lg p-4">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">{word.emoji}</div>
                <div className="text-xl font-bold text-neutral-900">{word.name}</div>
              </div>

              <div className="space-y-3">
                {dimensions.map(dim => {
                  const key = `${word.prefix}_${dim.key}`;
                  const proximity = getProximity(key, values[key]);
                  const proximityColors = {
                    correct: 'text-green-600',
                    close: 'text-orange-500',
                    far: 'text-blue-600'
                  };
                  const proximityEmojis = {
                    correct: '✓',
                    close: '~',
                    far: ''
                  };

                  return (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <div className="flex flex-col">
                          <span className="font-semibold text-neutral-700 text-sm">{dim.label}</span>
                          <span className="text-xs text-neutral-500">{dim.description}</span>
                        </div>
                        <span className={`font-bold ${proximityColors[proximity]}`}>
                          {proximityEmojis[proximity]} {(values[key] * 100).toFixed(0)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={values[key] * 100}
                        onChange={e => {
                          setValues({ ...values, [key]: parseInt(e.target.value) / 100 });
                          setFeedback({});
                        }}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-red-200 via-yellow-200 to-green-200"
                      />
                      {feedback[key] && (
                        <div className="text-xs text-red-600 mt-1">
                          → {feedback[key]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4 mb-4">
          <div className="text-sm font-bold text-purple-900 mb-2">🔮 Vecteurs en temps réel</div>
          <div className="grid md:grid-cols-3 gap-3">
            {words.map(word => (
              <div key={word.prefix} className="font-mono text-xs bg-white p-3 rounded border border-purple-200">
                <strong className="text-purple-900">{word.name}:</strong><br/>
                {dimensions.map(dim => {
                  const key = `${word.prefix}_${dim.key}`;
                  return (
                    <div key={dim.key}>
                      {dim.label}: <span className={`font-bold ${getProximity(key, values[key]) === 'correct' ? 'text-green-600' : 'text-neutral-700'}`}>
                        {values[key].toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-lg p-5 mb-4">
          <div className="text-sm font-bold text-green-900 mb-3">✨ Comprendre les dimensions</div>
          <div className="text-sm text-green-800 space-y-2">
            <p>• <strong>Entité</strong> : Les personnages/objets ont des valeurs élevées, les mots fonctionnels des valeurs basses</p>
            <p>• <strong>Action</strong> : Les verbes d'action ont des valeurs élevées, les noms/sujets des valeurs basses</p>
            <p>• <strong>Rôle</strong> : L'importance du mot dans la phrase (sujet &gt; verbe &gt; complément)</p>
            <p className="text-xs text-green-700 pt-2 border-t border-green-200">
              💡 Dans la réalité: GPT utilise <strong>12,288 dimensions</strong> non-interprétables (pas des concepts humains) !
            </p>
          </div>
        </div>

        {showHint && hint && (
          <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <div className="text-2xl">💡</div>
              <div>
                <div className="font-bold text-orange-900">Indice:</div>
                <div className="text-orange-800 whitespace-pre-line text-sm">{hint}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          {!showHint && hint && (
            <button
              onClick={() => setShowHint(true)}
              className="px-4 py-2 rounded-lg border-2 border-orange-400 text-orange-700 hover:bg-orange-50 transition-all"
            >
              💡 Indice
            </button>
          )}
          <button
            onClick={handleValidate}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all hover:scale-105 shadow-lg"
          >
            ✓ Valider
          </button>
        </div>

        {attempts > 0 && (
          <div className="mt-4 text-center text-red-600 font-semibold">
            ✗ Pas tout à fait... Vérifie les indices pour chaque mot!
          </div>
        )}
      </div>
    </div>
  );
}

interface ConnectTokensChallengeProps {
  instruction: string;
  correctAnswer: string;
  hint?: string;
  onComplete: (stars: number) => void;
}

function ConnectTokensChallenge({ instruction, correctAnswer, hint, onComplete }: ConnectTokensChallengeProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const frenchTokens = ['Frodon', 'doit', 'détruire', "l'Anneau"];

  const handleValidate = () => {
    setAttempts(a => a + 1);

    if (selected === correctAnswer) {
      const stars = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;
      setTimeout(() => onComplete(stars), 500);
    } else {
      setShowHint(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-neutral-900 mb-2">
            🎯 Défi: Connecter les Tokens
          </div>
          <div className="text-lg text-neutral-700">
            {instruction}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="bg-blue-100 border-4 border-blue-500 p-6 rounded-xl">
            <div className="text-2xl font-bold text-blue-900">&lt;next&gt;</div>
            <div className="text-sm text-blue-700 mt-1">Anglais</div>
          </div>

          <div className="text-4xl text-neutral-400">→</div>

          <div className="grid grid-cols-2 gap-3">
            {frenchTokens.map(token => (
              <button
                key={token}
                onClick={() => setSelected(token)}
                className={`p-4 rounded-xl border-4 transition-all transform hover:scale-105 ${
                  selected === token
                    ? 'border-green-500 bg-green-50 shadow-lg scale-105'
                    : 'border-neutral-300 hover:border-neutral-400 bg-white'
                }`}
              >
                <div className="text-lg font-bold text-neutral-900">{token}</div>
              </button>
            ))}
          </div>
        </div>

        {showHint && hint && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <div className="text-2xl">💡</div>
              <div>
                <div className="font-bold text-blue-900">Indice:</div>
                <div className="text-blue-800">{hint}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          {!showHint && hint && (
            <button
              onClick={() => setShowHint(true)}
              className="px-4 py-2 rounded-lg border-2 border-blue-400 text-blue-700 hover:bg-blue-50 transition-all"
            >
              💡 Indice
            </button>
          )}
          <button
            onClick={handleValidate}
            disabled={!selected}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✓ Valider
          </button>
        </div>

        {attempts > 0 && selected && (
          <div className="mt-4 text-center text-red-600 font-semibold">
            ✗ Pas tout à fait... Essaie encore!
          </div>
        )}
      </div>
    </div>
  );
}

interface GuessWordChallengeProps {
  instruction: string;
  correctAnswer: string;
  hint?: string;
  onComplete: (stars: number) => void;
}

interface VictoryScreenProps {
  score: number;
  onRestart: () => void;
  onExploreMode: () => void;
}

function VictoryScreen({ score, onRestart, onExploreMode }: VictoryScreenProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-2xl max-w-2xl w-full p-12 border-4 border-amber-400">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            Félicitations!
          </h2>
          <p className="text-2xl text-neutral-700 mb-6">
            Tu as terminé l'aventure!
          </p>

          <div className="bg-white/80 rounded-2xl p-6 mb-8 border-2 border-amber-300">
            <div className="text-sm text-neutral-600 font-semibold mb-2">SCORE FINAL</div>
            <div className="text-6xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              {score}
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
              <div className="text-lg font-bold text-green-900 mb-2">✨ Tu as maîtrisé les concepts clés:</div>
              <div className="text-sm text-green-800 space-y-1 text-left">
                <p>✓ Tokenization et Embeddings</p>
                <p>✓ Mécanisme d'Attention</p>
                <p>✓ Prédiction avec Softmax</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onRestart}
              className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all hover:scale-105 shadow-lg"
            >
              🔄 Recommencer
            </button>
            <button
              onClick={onExploreMode}
              className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-lg hover:from-purple-600 hover:to-pink-700 transition-all hover:scale-105 shadow-lg"
            >
              🎮 Mode Exploration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PositionalEncodingChallengeProps {
  instruction: string;
  correctAnswer: string;
  hint?: string;
  onComplete: (stars: number) => void;
}

function PositionalEncodingChallenge({ instruction, correctAnswer, hint, onComplete }: PositionalEncodingChallengeProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const options = [
    { phrase: 'Frodon doit détruire', meaning: 'Frodon a la mission de détruire' },
    { phrase: 'détruire doit Frodon', meaning: '??? Aucun sens!' }
  ];

  const handleValidate = () => {
    setAttempts(a => a + 1);

    if (selected === correctAnswer) {
      const stars = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;
      setTimeout(() => onComplete(stars), 500);
    } else {
      setShowHint(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-neutral-900 mb-2">
            🎯 L'ordre des mots compte!
          </div>
          <div className="text-lg text-neutral-700">
            {instruction}
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {options.map(option => (
            <button
              key={option.phrase}
              onClick={() => setSelected(option.phrase)}
              className={`w-full p-6 rounded-xl border-4 transition-all transform hover:scale-102 ${
                selected === option.phrase
                  ? 'border-green-500 bg-green-50 shadow-lg'
                  : 'border-neutral-300 hover:border-neutral-400 bg-white'
              }`}
            >
              <div className="text-2xl font-bold text-neutral-900 mb-2">{option.phrase}</div>
              <div className="text-sm text-neutral-600">{option.meaning}</div>
            </button>
          ))}
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4">
          <div className="text-sm font-bold text-blue-900 mb-2">💡 Pourquoi c'est crucial?</div>
          <div className="text-xs text-blue-800">
            Sans positional encoding, le Transformer voit juste un "sac de mots". L'ordre serait perdu!
          </div>
        </div>

        {showHint && hint && (
          <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <div className="text-2xl">💡</div>
              <div>
                <div className="font-bold text-orange-900">Indice:</div>
                <div className="text-orange-800">{hint}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          {!showHint && hint && (
            <button
              onClick={() => setShowHint(true)}
              className="px-4 py-2 rounded-lg border-2 border-blue-400 text-blue-700 hover:bg-blue-50 transition-all"
            >
              💡 Indice
            </button>
          )}
          <button
            onClick={handleValidate}
            disabled={!selected}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✓ Valider
          </button>
        </div>

        {attempts > 0 && selected && selected !== correctAnswer && (
          <div className="mt-4 text-center text-red-600 font-semibold">
            ✗ Pas tout à fait... Essaie encore!
          </div>
        )}
      </div>
    </div>
  );
}

interface CalculateAttentionChallengeProps {
  instruction: string;
  correctAnswer: Record<string, number>;
  hint?: string;
  onComplete: (stars: number) => void;
  data: {
    queries: Record<string, number[]>;
    keys: Record<string, number[]>;
  };
}

function CalculateAttentionChallenge({ instruction, correctAnswer, hint, onComplete, data }: CalculateAttentionChallengeProps) {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showMath, setShowMath] = useState<string | null>(null);

  const queryToken = Object.keys(data.queries)[0];
  const query = data.queries[queryToken];

  // Calculate dot product
  const dotProduct = (a: number[], b: number[]): number => {
    return a.reduce((sum, val, i) => sum + val * b[i], 0);
  };

  // Calculate actual scores
  const actualScores: Record<string, number> = {};
  Object.entries(data.keys).forEach(([token, key]) => {
    const score = dotProduct(query, key);
    actualScores[token] = score;
  });

  // Normalize to probabilities (simplified softmax visualization)
  const total = Object.values(actualScores).reduce((sum, score) => sum + Math.exp(score), 0);
  const normalized: Record<string, number> = {};
  Object.entries(actualScores).forEach(([token, score]) => {
    normalized[token] = Math.exp(score) / total;
  });

  const handleTokenScore = (token: string, score: number) => {
    setScores({ ...scores, [token]: score });
  };

  const handleValidate = () => {
    setAttempts(a => a + 1);

    // Check if user's understanding is close enough
    const isCorrect = Object.entries(normalized).every(([token, expectedProb]) => {
      const userProb = scores[token] || 0;
      return Math.abs(userProb - expectedProb) < 0.15;
    });

    if (isCorrect) {
      const stars = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;
      setTimeout(() => onComplete(stars), 500);
    } else {
      setShowHint(true);
    }
  };

  const isScoreClose = (token: string): boolean => {
    const expected = normalized[token];
    const actual = scores[token] || 0;
    return Math.abs(expected - actual) < 0.15;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full p-8 my-8">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-neutral-900 mb-2">
            🧮 Calculer l'Attention (QKV)
          </div>
          <div className="text-lg text-neutral-700 mb-4">
            {instruction}
          </div>
          <div className="text-sm text-blue-600 font-semibold">
            C'est LA partie la plus importante des Transformers!
          </div>
        </div>

        {/* Math Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
            <div className="text-sm font-bold text-purple-900 mb-3">📐 Étape 1: Les vecteurs</div>
            <div className="space-y-2 text-xs font-mono">
              <div className="bg-white p-2 rounded border border-purple-200">
                <strong className="text-purple-900">Query de "{queryToken}":</strong> <span className="text-neutral-800">[{query.join(', ')}]</span>
              </div>
              {Object.entries(data.keys).map(([token, key]) => (
                <div key={token} className="bg-white p-2 rounded border border-purple-200">
                  <strong className="text-purple-900">Key de "{token}":</strong> <span className="text-neutral-800">[{key.join(', ')}]</span>
                  <button
                    onClick={() => setShowMath(token === showMath ? null : token)}
                    className="ml-2 text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    {showMath === token ? '🔽' : '▶️'} Calcul
                  </button>
                  {showMath === token && (
                    <div className="mt-2 p-2 bg-blue-50 rounded text-xs border border-blue-200">
                      <div className="text-neutral-800">Q · K = {query.map((q, i) => `${q}×${key[i]}`).join(' + ')}</div>
                      <div className="font-bold text-blue-700">= {actualScores[token].toFixed(2)}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
            <div className="text-sm font-bold text-green-900 mb-3">🎯 Étape 2: Ajuste les scores d'attention</div>
            <div className="text-xs text-green-800 mb-3">
              Après calcul + softmax, quelle proportion "{queryToken}" doit-il donner à chaque mot?
            </div>
            <div className="space-y-3">
              {Object.keys(data.keys).map(token => (
                <div key={token}>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold capitalize">{token}</span>
                    <span className={`font-bold ${isScoreClose(token) ? 'text-green-600' : 'text-blue-600'}`}>
                      {isScoreClose(token) && '✓ '}{((scores[token] || 0) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={(scores[token] || 0) * 100}
                    onChange={e => handleTokenScore(token, parseInt(e.target.value) / 100)}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-red-200 via-yellow-200 to-green-200"
                  />
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-neutral-600">
              Total: {(Object.values(scores).reduce((sum, v) => sum + v, 0) * 100).toFixed(0)}% (doit être ~100%)
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-4">
          <div className="text-sm font-bold text-yellow-900 mb-2">💡 Comprendre QKV:</div>
          <div className="text-xs text-yellow-800 space-y-1">
            <p>• <strong>Query (Q):</strong> "Qui dois-je écouter?" - La question posée par le token</p>
            <p>• <strong>Key (K):</strong> "Je suis disponible pour..." - L'identité des autres tokens</p>
            <p>• <strong>Value (V):</strong> Le message transmis (on calculera après)</p>
            <p>• <strong>Score = Q · K:</strong> Produit scalaire = similarité entre question et disponibilité</p>
            <p>• <strong>Softmax:</strong> Convertit les scores en probabilités qui somment à 100%</p>
          </div>
        </div>

        {showHint && hint && (
          <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <div className="text-2xl">💡</div>
              <div>
                <div className="font-bold text-orange-900">Indice:</div>
                <div className="text-orange-800">{hint}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          {!showHint && hint && (
            <button
              onClick={() => setShowHint(true)}
              className="px-4 py-2 rounded-lg border-2 border-blue-400 text-blue-700 hover:bg-blue-50 transition-all"
            >
              💡 Indice
            </button>
          )}
          <button
            onClick={handleValidate}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all hover:scale-105 shadow-lg"
          >
            ✓ Valider
          </button>
        </div>

        {attempts > 0 && (
          <div className="mt-4 text-center text-red-600 font-semibold">
            ✗ Pas tout à fait... Vérifie les calculs Q·K puis ajuste les scores!
          </div>
        )}
      </div>
    </div>
  );
}

function GuessWordChallenge({ instruction, correctAnswer, hint, onComplete }: GuessWordChallengeProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const options = ['détruire', 'trouver', 'garder', 'protéger'];

  const handleValidate = () => {
    setAttempts(a => a + 1);

    if (selected === correctAnswer) {
      const stars = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;
      setTimeout(() => onComplete(stars), 500);
    } else {
      setShowHint(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-neutral-900 mb-2">
            🎯 Prédiction du mot suivant
          </div>
          <div className="text-lg text-neutral-700">
            {instruction}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
          <div className="text-center text-2xl font-bold text-neutral-900">
            Frodon doit <span className="text-blue-600">____</span> l'Anneau
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">
            Le Transformer prédit le mot le plus probable
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {options.map(option => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`p-6 rounded-xl border-4 transition-all transform hover:scale-105 ${
                selected === option
                  ? 'border-green-500 bg-green-50 shadow-lg scale-105'
                  : 'border-neutral-300 hover:border-neutral-400 bg-white'
              }`}
            >
              <div className="text-2xl font-bold text-neutral-900">{option}</div>
            </button>
          ))}
        </div>

        {showHint && hint && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <div className="text-2xl">💡</div>
              <div>
                <div className="font-bold text-blue-900">Indice:</div>
                <div className="text-blue-800">{hint}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          {!showHint && hint && (
            <button
              onClick={() => setShowHint(true)}
              className="px-4 py-2 rounded-lg border-2 border-blue-400 text-blue-700 hover:bg-blue-50 transition-all"
            >
              💡 Indice
            </button>
          )}
          <button
            onClick={handleValidate}
            disabled={!selected}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✓ Valider
          </button>
        </div>

        {attempts > 0 && selected && (
          <div className="mt-4 text-center text-red-600 font-semibold">
            ✗ Pas tout à fait... Essaie encore!
          </div>
        )}
      </div>
    </div>
  );
}

interface MultiHeadChallengeProps {
  instruction: string;
  correctAnswer: Record<string, string>;
  hint?: string;
  onComplete: (stars: number) => void;
}

function MultiHeadChallenge({ instruction, correctAnswer, hint, onComplete }: MultiHeadChallengeProps) {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const heads = ['Tête 1', 'Tête 2', 'Tête 3'];
  const roles = ['Syntaxe (sujet-verbe)', 'Action (verbe-objet)', 'Sémantique (similarité)'];

  const handleValidate = () => {
    setAttempts(a => a + 1);
    const isCorrect = Object.entries(correctAnswer).every(([head, role]) => assignments[head] === role);

    if (isCorrect) {
      const stars = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;
      setTimeout(() => onComplete(stars), 500);
    } else {
      setShowHint(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-neutral-900 mb-2">🎯 Multi-Head Attention</div>
          <div className="text-lg text-neutral-700">{instruction}</div>
        </div>

        <div className="space-y-4 mb-6">
          {heads.map(head => (
            <div key={head} className="border-2 border-neutral-300 rounded-lg p-4">
              <div className="font-bold text-lg mb-2">{head}</div>
              <div className="grid grid-cols-1 gap-2">
                {roles.map(role => (
                  <button
                    key={role}
                    onClick={() => setAssignments({ ...assignments, [head]: role })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      assignments[head] === role
                        ? 'border-green-500 bg-green-50 text-green-900 font-semibold'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {showHint && hint && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <div className="text-2xl">💡</div>
              <div>
                <div className="font-bold text-blue-900">Indice:</div>
                <div className="text-blue-800">{hint}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <button onClick={handleValidate} className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all hover:scale-105 shadow-lg">
            ✓ Valider
          </button>
        </div>
      </div>
    </div>
  );
}

interface MaskingChallengeProps {
  instruction: string;
  correctAnswer: string[];
  hint?: string;
  onComplete: (stars: number) => void;
}

function MaskingChallenge({ instruction, correctAnswer, hint, onComplete }: MaskingChallengeProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const tokens = ['Frodon', 'doit', 'détruire', "l'Anneau"];

  const handleValidate = () => {
    setAttempts(a => a + 1);
    const isCorrect = selected.length === correctAnswer.length &&
                     selected.every(t => correctAnswer.includes(t));

    if (isCorrect) {
      const stars = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;
      setTimeout(() => onComplete(stars), 500);
    } else {
      setShowHint(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-neutral-900 mb-2">🔒 Masquage Anti-Triche</div>
          <div className="text-lg text-neutral-700">{instruction}</div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
          <div className="text-sm font-bold text-yellow-900 mb-2">📍 Génération autoregressive:</div>
          <div className="text-sm text-yellow-800">
            GPT génère: <strong>Frodon</strong> → <strong>doit</strong> → <strong className="text-blue-600">détruire ⬅️ on génère ce mot maintenant</strong> → ❓
          </div>
          <div className="text-xs text-yellow-700 mt-2">
            Quels mots sont VISIBLES à cette étape?
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {tokens.map((token, idx) => {
            const isGenerating = token === 'détruire';
            const isFuture = idx > tokens.indexOf('détruire');
            const isPast = idx < tokens.indexOf('détruire');

            return (
              <button
                key={token}
                onClick={() => {
                  if (selected.includes(token)) {
                    setSelected(selected.filter(t => t !== token));
                  } else {
                    setSelected([...selected, token]);
                  }
                }}
                className={`p-4 rounded-xl border-4 transition-all ${
                  selected.includes(token)
                    ? 'border-green-500 bg-green-50'
                    : isGenerating
                    ? 'border-blue-400 bg-blue-50'
                    : isFuture
                    ? 'border-red-300 bg-red-50'
                    : 'border-neutral-300 bg-white'
                }`}
              >
                <div className="text-lg font-bold">{token}</div>
                {isGenerating && <div className="text-xs text-blue-600 mt-1">← En cours</div>}
                {isFuture && <div className="text-xs text-red-600 mt-1">Masqué ❌</div>}
              </button>
            );
          })}
        </div>

        {showHint && hint && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <div className="text-2xl">💡</div>
              <div>
                <div className="font-bold text-blue-900">Indice:</div>
                <div className="text-blue-800">{hint}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <button onClick={handleValidate} className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all hover:scale-105 shadow-lg">
            ✓ Valider
          </button>
        </div>
      </div>
    </div>
  );
}

interface TemperatureChallengeProps {
  instruction: string;
  correctAnswer: any;
  hint?: string;
  onComplete: (stars: number) => void;
  data: {
    baseProbs: Record<string, number>;
  };
}

function TemperatureChallenge({ instruction, correctAnswer, hint, onComplete, data }: TemperatureChallengeProps) {
  const [temperature, setTemperature] = useState(1.0);
  const [understood, setUnderstood] = useState(false);

  const applyTemperature = (probs: Record<string, number>, temp: number): Record<string, number> => {
    const logits = Object.entries(probs).map(([word, prob]) => ({
      word,
      logit: Math.log(prob) / temp
    }));

    const maxLogit = Math.max(...logits.map(l => l.logit));
    const expLogits = logits.map(l => ({ ...l, exp: Math.exp(l.logit - maxLogit) }));
    const sumExp = expLogits.reduce((sum, l) => sum + l.exp, 0);

    const result: Record<string, number> = {};
    expLogits.forEach(l => {
      result[l.word] = l.exp / sumExp;
    });

    return result;
  };

  const adjustedProbs = applyTemperature(data.baseProbs, temperature);

  const handleComplete = () => {
    setTimeout(() => onComplete(3), 500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-neutral-900 mb-2">🌡️ Température & Créativité</div>
          <div className="text-lg text-neutral-700">{instruction}</div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Température: {temperature.toFixed(2)}</span>
            <span className="text-sm text-neutral-600">
              {temperature < 0.5 && '❄️ Très prévisible'}
              {temperature >= 0.5 && temperature < 1.0 && '🌤️ Équilibré'}
              {temperature >= 1.0 && temperature < 1.5 && '🔥 Créatif'}
              {temperature >= 1.5 && '🌋 Très créatif (risqué)'}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            value={temperature * 100}
            onChange={e => setTemperature(parseInt(e.target.value) / 100)}
            className="w-full h-4 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-blue-300 via-green-300 to-red-300"
          />
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg p-6 mb-6">
          <div className="text-sm font-bold text-purple-900 mb-4">📊 Probabilités ajustées:</div>
          <div className="space-y-3">
            {Object.entries(adjustedProbs)
              .sort((a, b) => b[1] - a[1])
              .map(([word, prob]) => (
                <div key={word}>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">{word}</span>
                    <span className="font-bold text-purple-700">{(prob * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${prob * 100}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
          <div className="text-sm font-bold text-yellow-900 mb-2">💡 Comprendre la température:</div>
          <div className="text-xs text-yellow-800 space-y-1">
            <p>• <strong>Temp = 0:</strong> Toujours le mot le plus probable (déterministe)</p>
            <p>• <strong>Temp = 1:</strong> Distribution normale (équilibre)</p>
            <p>• <strong>Temp &gt; 1:</strong> Plus de variété, résultats surprenants</p>
            <p>• ChatGPT utilise typiquement temp entre 0.7 et 1.0</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            id="understood"
            checked={understood}
            onChange={e => setUnderstood(e.target.checked)}
            className="w-5 h-5 cursor-pointer"
          />
          <label htmlFor="understood" className="text-sm font-semibold cursor-pointer">
            Je comprends comment la température contrôle la créativité du modèle
          </label>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={handleComplete}
            disabled={!understood}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✓ J'ai compris!
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InteractiveGame() {
  const [gameState, setGameState] = useState({
    currentStageIndex: 0,
    score: 0,
    showDialogue: true,
    showChallenge: false,
    showVictory: false,
  });

  const currentStageData = STORY_STAGES[gameState.currentStageIndex];

  const handleDialogueComplete = () => {
    setGameState({ ...gameState, showDialogue: false, showChallenge: true });
  };

  const handleChallengeComplete = (stars: number) => {
    const newScore = gameState.score + stars * 100;

    setGameState({
      ...gameState,
      score: newScore,
      showChallenge: false,
      showDialogue: false,
    });

    // Move to next stage after delay
    setTimeout(() => {
      if (gameState.currentStageIndex < STORY_STAGES.length - 1) {
        setGameState({
          currentStageIndex: gameState.currentStageIndex + 1,
          score: newScore,
          showDialogue: true,
          showChallenge: false,
          showVictory: false,
        });
      } else {
        // Game completed - show victory screen
        setGameState({
          ...gameState,
          score: newScore,
          showDialogue: false,
          showChallenge: false,
          showVictory: true,
        });
      }
    }, 2000);
  };

  const handleRestart = () => {
    setGameState({
      currentStageIndex: 0,
      score: 0,
      showDialogue: true,
      showChallenge: false,
      showVictory: false,
    });
  };

  const handleExploreMode = () => {
    // This will be handled by parent component
    window.location.reload();
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Score Display */}
      <div className="absolute top-4 right-4 z-30">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-6 py-3 border-2 border-amber-400">
          <div className="text-sm text-neutral-600 font-semibold">SCORE</div>
          <div className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            {gameState.score}
          </div>
        </div>
      </div>

      {/* Stage Indicator */}
      <div className="absolute top-4 left-4 z-30">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-6 py-3 border-2 border-blue-400">
          <div className="text-sm text-neutral-600 font-semibold">ÉTAPE</div>
          <div className="text-lg font-bold text-neutral-900">
            {currentStageData.title}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex items-center justify-center h-full p-12">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">🏰</div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Le Conseil d'Elrond
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Une aventure interactive pour comprendre les Transformers
          </p>
        </div>
      </div>

      {/* Dialogue System */}
      {gameState.showDialogue && (
        <DialogueBox dialogue={currentStageData.dialogue} onComplete={handleDialogueComplete} />
      )}

      {/* Challenge System */}
      {gameState.showChallenge && currentStageData.challenge.type === 'select-tokens' && (
        <SelectTokensChallenge
          instruction={currentStageData.challenge.instruction}
          correctAnswer={currentStageData.challenge.correctAnswer}
          hint={currentStageData.challenge.hint}
          onComplete={handleChallengeComplete}
        />
      )}

      {gameState.showChallenge && currentStageData.challenge.type === 'adjust-values' && (
        <AdjustValuesChallenge
          instruction={currentStageData.challenge.instruction}
          correctAnswer={currentStageData.challenge.correctAnswer}
          hint={currentStageData.challenge.hint}
          onComplete={handleChallengeComplete}
        />
      )}

      {gameState.showChallenge && currentStageData.challenge.type === 'word2vec-training' && (
        <Word2VecTrainingChallenge
          instruction={currentStageData.challenge.instruction}
          correctAnswer={currentStageData.challenge.correctAnswer}
          hint={currentStageData.challenge.hint}
          onComplete={handleChallengeComplete}
        />
      )}

      {gameState.showChallenge && currentStageData.challenge.type === 'connect-tokens' && (
        <ConnectTokensChallenge
          instruction={currentStageData.challenge.instruction}
          correctAnswer={currentStageData.challenge.correctAnswer}
          hint={currentStageData.challenge.hint}
          onComplete={handleChallengeComplete}
        />
      )}

      {gameState.showChallenge && currentStageData.challenge.type === 'guess-word' && (
        <GuessWordChallenge
          instruction={currentStageData.challenge.instruction}
          correctAnswer={currentStageData.challenge.correctAnswer}
          hint={currentStageData.challenge.hint}
          onComplete={handleChallengeComplete}
        />
      )}

      {gameState.showChallenge && currentStageData.challenge.type === 'positional-encoding' && (
        <PositionalEncodingChallenge
          instruction={currentStageData.challenge.instruction}
          correctAnswer={currentStageData.challenge.correctAnswer}
          hint={currentStageData.challenge.hint}
          onComplete={handleChallengeComplete}
        />
      )}

      {gameState.showChallenge && currentStageData.challenge.type === 'calculate-attention' && (
        <CalculateAttentionChallenge
          instruction={currentStageData.challenge.instruction}
          correctAnswer={currentStageData.challenge.correctAnswer}
          hint={currentStageData.challenge.hint}
          onComplete={handleChallengeComplete}
          data={currentStageData.challenge.data}
        />
      )}

      {gameState.showChallenge && currentStageData.challenge.type === 'multi-head' && (
        <MultiHeadChallenge
          instruction={currentStageData.challenge.instruction}
          correctAnswer={currentStageData.challenge.correctAnswer}
          hint={currentStageData.challenge.hint}
          onComplete={handleChallengeComplete}
        />
      )}

      {gameState.showChallenge && currentStageData.challenge.type === 'masking' && (
        <MaskingChallenge
          instruction={currentStageData.challenge.instruction}
          correctAnswer={currentStageData.challenge.correctAnswer}
          hint={currentStageData.challenge.hint}
          onComplete={handleChallengeComplete}
        />
      )}

      {gameState.showChallenge && currentStageData.challenge.type === 'temperature' && (
        <TemperatureChallenge
          instruction={currentStageData.challenge.instruction}
          correctAnswer={currentStageData.challenge.correctAnswer}
          hint={currentStageData.challenge.hint}
          onComplete={handleChallengeComplete}
          data={currentStageData.challenge.data}
        />
      )}

      {/* Victory Screen */}
      {gameState.showVictory && (
        <VictoryScreen
          score={gameState.score}
          onRestart={handleRestart}
          onExploreMode={handleExploreMode}
        />
      )}
    </div>
  );
}
