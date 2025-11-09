"use client";

import React, { useState, useEffect } from 'react';

interface Word2VecTrainingChallengeProps {
  instruction: string;
  correctAnswer: any;
  hint?: string;
  onComplete: (stars: number) => void;
}

export function Word2VecTrainingChallenge({
  instruction,
  correctAnswer,
  hint,
  onComplete
}: Word2VecTrainingChallengeProps) {
  const [step, setStep] = useState<'intro' | 'context' | 'prediction' | 'adjustment' | 'result'>('intro');
  const [selectedContext, setSelectedContext] = useState<string[]>([]);
  const [predictedWord, setPredictedWord] = useState<string | null>(null);
  const [vectors, setVectors] = useState({
    'Frodon': { x: -0.8, y: 0.6 },
    'doit': { x: 0.0, y: 0.0 },
    'détruire': { x: 0.7, y: -0.5 },
    "l'Anneau": { x: 0.8, y: -0.4 },
    'Gandalf': { x: -0.7, y: 0.8 },
    'protéger': { x: -0.6, y: 0.7 },
  });
  const [iteration, setIteration] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Phrase d'exemple: "Frodon doit détruire l'Anneau"
  const sentence = ['Frodon', 'doit', 'détruire', "l'Anneau"];
  const targetWord = 'doit';
  const contextWindow = 2; // fenêtre de contexte CBOW

  const calculateSimilarity = (vec1: {x: number, y: number}, vec2: {x: number, y: number}) => {
    const dotProduct = vec1.x * vec2.x + vec1.y * vec2.y;
    const mag1 = Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y);
    const mag2 = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);
    return mag1 && mag2 ? dotProduct / (mag1 * mag2) : 0;
  };

  const handleContextSelection = (word: string) => {
    if (selectedContext.includes(word)) {
      setSelectedContext(selectedContext.filter(w => w !== word));
    } else if (selectedContext.length < 2) {
      setSelectedContext([...selectedContext, word]);
    }
  };

  const animateVectorAdjustment = () => {
    // Simuler l'ajustement des vecteurs pendant l'entraînement
    const newVectors = { ...vectors };

    // Rapprocher les mots du contexte
    ['Frodon', 'détruire'].forEach(word => {
      const current = newVectors[word];
      const target = newVectors['doit'];
      newVectors[word] = {
        x: current.x + 0.1 * (target.x - current.x),
        y: current.y + 0.1 * (target.y - current.y)
      };
    });

    // Ajuster le mot cible
    newVectors['doit'] = {
      x: vectors['doit'].x + 0.05,
      y: vectors['doit'].y + 0.02
    };

    setVectors(newVectors);
    setIteration(iteration + 1);
  };

  const renderStep = () => {
    switch(step) {
      case 'intro':
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-3xl font-bold text-neutral-900">
              Le Secret des Vecteurs Magiques
            </h3>
            <div className="text-lg text-neutral-700 max-w-2xl mx-auto space-y-4">
              <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4">
                <p className="text-amber-900 font-semibold">
                  🧙‍♂️ Gandalf : "Tu te demandes comment j'ai su créer ces vecteurs pour chaque mot ?"
                </p>
              </div>
              <p>
                Les vecteurs d'embeddings <span className="font-bold text-red-600">ne sont PAS créés manuellement</span> !
                Ils sont <span className="font-bold text-blue-600">appris automatiquement</span> pendant l'entraînement,
                comme un apprenti mage qui perfectionne ses sortilèges.
              </p>
              <p>
                Le modèle s'entraîne en <span className="font-bold text-green-600">prédisant des mots</span> à partir
                de leur contexte. À chaque erreur, il ajuste légèrement ses vecteurs pour s'améliorer !
              </p>
              <p>
                C'est le principe de <span className="font-bold text-purple-600">Word2Vec</span> :
                après des millions d'exemples, les mots qui apparaissent ensemble (comme "Frodon" et "Anneau")
                auront des vecteurs proches !
              </p>
            </div>
            <button
              onClick={() => setStep('context')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all hover:scale-105 shadow-lg"
            >
              🎯 Découvrir l'entraînement →
            </button>
          </div>
        );

      case 'context':
        return (
          <div className="space-y-5">
            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-5">
              <h4 className="font-bold text-blue-900 mb-2 text-lg">📚 Méthode CBOW (Continuous Bag of Words)</h4>
              <p className="text-blue-800 mb-2">
                Pour apprendre les embeddings, le modèle s'entraîne à <span className="font-bold">prédire un mot caché</span> à partir de son contexte (les mots qui l'entourent).
              </p>
              <p className="text-blue-700 text-sm">
                💡 C'est comme jouer à "devine le mot manquant" des millions de fois !
              </p>
            </div>

            <div className="text-center">
              <p className="text-neutral-700 mb-4">
                Dans notre phrase <span className="font-bold">"Frodon doit détruire l'Anneau"</span>,
                cache le mot <span className="font-bold text-yellow-600">"doit"</span> et essaie de le deviner depuis son contexte :
              </p>
              <div className="inline-flex items-center gap-3 text-2xl font-bold mb-6 flex-wrap justify-center">
                {sentence.map((word, i) => (
                  <span
                    key={i}
                    className={`px-6 py-3 rounded-xl border-4 transition-all ${
                      word === targetWord
                        ? 'bg-yellow-100 border-yellow-500 text-yellow-900 shadow-lg'
                        : `bg-white border-neutral-300 cursor-pointer hover:border-blue-400 hover:scale-105 ${
                            selectedContext.includes(word) ? 'border-green-500 bg-green-50' : ''
                          }`
                    }`}
                    onClick={() => word !== targetWord && handleContextSelection(word)}
                  >
                    {word === targetWord ? '???' : word}
                    {selectedContext.includes(word) && (
                      <span className="ml-2 text-green-600 text-xl">✓</span>
                    )}
                  </span>
                ))}
              </div>
              <p className="text-neutral-600">
                👆 Sélectionne <span className="font-bold">2 mots voisins</span> qui aident à prédire
                <span className="font-bold text-yellow-600"> le mot caché</span>
              </p>
            </div>

            {selectedContext.length === 2 && (
              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-5 animate-fadeIn">
                <p className="text-green-800 mb-3">
                  ✅ Parfait ! Contexte sélectionné :
                  <span className="font-bold text-lg"> {selectedContext.join(' + ')} </span>
                </p>
                <p className="text-green-700 text-sm mb-4">
                  Le modèle va maintenant combiner les vecteurs de "{selectedContext[0]}" et "{selectedContext[1]}"
                  pour prédire le mot caché !
                </p>
                <button
                  onClick={() => setStep('prediction')}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all hover:scale-105 shadow-md"
                >
                  🔮 Voir comment le modèle prédit →
                </button>
              </div>
            )}
          </div>
        );

      case 'prediction':
        return (
          <div className="space-y-5">
            <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-5">
              <h4 className="font-bold text-purple-900 mb-2 text-lg">🔮 Visualisation des Vecteurs</h4>
              <p className="text-purple-800 mb-2">
                Voici comment les mots sont représentés dans l'espace des embeddings (ici simplifié en 2D).
                Le modèle combine les vecteurs du contexte pour prédire le mot caché.
              </p>
              <p className="text-purple-700 text-sm">
                🎯 Les mots proches dans l'espace ont des sens similaires !
              </p>
            </div>

            {/* Visualisation 2D des vecteurs */}
            <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-indigo-300 rounded-lg h-96 mx-auto shadow-inner">
              <svg className="w-full h-full" viewBox="-1.5 -1.5 3 3">
                {/* Axes */}
                <line x1="-1.5" y1="0" x2="1.5" y2="0" stroke="#ccc" strokeWidth="0.01" />
                <line x1="0" y1="-1.5" x2="0" y2="1.5" stroke="#ccc" strokeWidth="0.01" />

                {/* Vecteurs des mots */}
                {Object.entries(vectors).map(([word, pos]) => (
                  <g key={word}>
                    <circle
                      cx={pos.x}
                      cy={-pos.y}
                      r="0.08"
                      fill={
                        selectedContext.includes(word) ? '#10b981' :
                        word === targetWord ? '#f59e0b' :
                        '#6b7280'
                      }
                      opacity="0.8"
                    />
                    <text
                      x={pos.x}
                      y={-pos.y - 0.12}
                      textAnchor="middle"
                      fontSize="0.12"
                      fill="#374151"
                      fontWeight="bold"
                    >
                      {word}
                    </text>
                  </g>
                ))}

                {/* Vecteur moyen du contexte */}
                {selectedContext.length === 2 && (
                  <g>
                    <circle
                      cx={(vectors[selectedContext[0]].x + vectors[selectedContext[1]].x) / 2}
                      cy={-(vectors[selectedContext[0]].y + vectors[selectedContext[1]].y) / 2}
                      r="0.1"
                      fill="#8b5cf6"
                      opacity="0.5"
                      stroke="#8b5cf6"
                      strokeWidth="0.02"
                      strokeDasharray="0.05 0.05"
                    />
                    <text
                      x={(vectors[selectedContext[0]].x + vectors[selectedContext[1]].x) / 2}
                      y={-(vectors[selectedContext[0]].y + vectors[selectedContext[1]].y) / 2 + 0.2}
                      textAnchor="middle"
                      fontSize="0.1"
                      fill="#8b5cf6"
                      fontWeight="bold"
                    >
                      Contexte moyen
                    </text>
                  </g>
                )}
              </svg>
            </div>

            <div className="bg-indigo-50 border-2 border-indigo-300 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center">
                  <div className="font-bold text-green-600">🟢 Contexte</div>
                  <div className="text-xs text-neutral-600">Verts: mots sélectionnés</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-amber-600">🟡 Mot caché</div>
                  <div className="text-xs text-neutral-600">À prédire</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-600">🟣 Moyenne</div>
                  <div className="text-xs text-neutral-600">Contexte combiné</div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-3">
              <p className="text-neutral-700">
                💡 Le modèle calcule la <span className="font-bold text-purple-600">moyenne des vecteurs</span> du contexte,
                puis cherche le mot le plus proche de cette moyenne !
              </p>
              <button
                onClick={() => {
                  setPredictedWord('doit');
                  setStep('adjustment');
                }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:to-indigo-700 transition-all hover:scale-105 shadow-lg"
              >
                🎯 Calculer la prédiction →
              </button>
            </div>
          </div>
        );

      case 'adjustment':
        return (
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-400 rounded-lg p-5">
              <h4 className="font-bold text-orange-900 mb-2 text-lg">⚙️ L'Entraînement : Ajustement des Vecteurs</h4>
              <p className="text-orange-800 mb-2">
                ✅ <span className="font-bold">Prédiction correcte !</span> Le modèle a bien trouvé "doit".
              </p>
              <p className="text-orange-700">
                Maintenant, il ajuste légèrement tous les vecteurs impliqués pour <span className="font-bold">renforcer ce qu'il a appris</span> :
                les mots "Frodon" et "détruire" doivent être proches de "doit" !
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-neutral-300 rounded-lg p-4">
                <h5 className="font-bold text-neutral-900 mb-3">Avant l'ajustement</h5>
                <div className="space-y-2 text-sm">
                  <div>Similarité(Frodon, doit):
                    <span className="font-mono font-bold text-blue-600">
                      {calculateSimilarity(vectors['Frodon'], vectors['doit']).toFixed(3)}
                    </span>
                  </div>
                  <div>Similarité(détruire, doit):
                    <span className="font-mono font-bold text-blue-600">
                      {calculateSimilarity(vectors['détruire'], vectors['doit']).toFixed(3)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                <h5 className="font-bold text-green-900 mb-3">Après {iteration} itérations</h5>
                <div className="space-y-2 text-sm">
                  <div>Similarité(Frodon, doit):
                    <span className="font-mono font-bold text-green-600">
                      {(calculateSimilarity(vectors['Frodon'], vectors['doit']) + iteration * 0.05).toFixed(3)} ↗
                    </span>
                  </div>
                  <div>Similarité(détruire, doit):
                    <span className="font-mono font-bold text-green-600">
                      {(calculateSimilarity(vectors['détruire'], vectors['doit']) + iteration * 0.05).toFixed(3)} ↗
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-5">
              <p className="text-yellow-900 font-semibold mb-2">
                💡 Principe clé de Word2Vec :
              </p>
              <p className="text-yellow-800 text-sm mb-2">
                Après des <span className="font-bold">millions d'exemples</span>, les mots qui apparaissent
                dans des contextes similaires auront des vecteurs proches !
              </p>
              <div className="bg-yellow-100 rounded p-2 text-xs text-yellow-900 mt-2">
                <p>• "Frodon" ≈ "Sam" (tous deux hobbits porteurs)</p>
                <p>• "détruire" ≈ "éliminer" (actions similaires)</p>
                <p>• "Anneau" ≈ "Précieux" (même objet)</p>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
              <p className="text-blue-900 text-sm text-center">
                🔁 <span className="font-bold">Itérations : {iteration}</span> |
                Clique plusieurs fois pour voir l'évolution ! (Au moins 3 fois)
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={animateVectorAdjustment}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all hover:scale-105 shadow-lg"
              >
                🔄 Itération suivante ({iteration + 1})
              </button>
              {iteration >= 3 && (
                <button
                  onClick={() => setStep('result')}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all hover:scale-105 shadow-xl animate-pulse"
                >
                  ✨ Voir le résultat final →
                </button>
              )}
            </div>
          </div>
        );

      case 'result':
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-2">🎉</div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Bravo ! Tu maîtrises Word2Vec !
            </h3>
            <p className="text-lg text-neutral-600">
              Tu comprends maintenant comment les embeddings sont créés pendant l'entraînement 🧠
            </p>

            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-4 border-indigo-400 rounded-2xl p-6 max-w-3xl mx-auto shadow-lg">
              <h4 className="font-bold text-indigo-900 mb-5 text-xl">📊 Ce que tu as découvert :</h4>
              <div className="text-left space-y-3 text-indigo-800 text-base">
                <p className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span>Les embeddings <strong>ne sont PAS créés manuellement</strong> - ils sont <strong>appris automatiquement</strong> pendant l'entraînement !</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span>Word2Vec entraîne en <strong>prédisant des mots cachés</strong> depuis leur contexte (méthode CBOW)</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span>À chaque prédiction correcte, les vecteurs s'ajustent pour <strong>rapprocher les mots similaires</strong></span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span>Après des millions d'exemples : <code className="bg-white px-2 py-1 rounded font-mono text-sm">roi - homme + femme ≈ reine</code> !</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span>GPT-4 utilise une version avancée avec <strong>12,288 dimensions</strong> et le mécanisme d'Attention</span>
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-400 rounded-xl p-5 max-w-2xl mx-auto">
              <p className="text-amber-900 mb-2">
                <span className="text-2xl">🧙‍♂️</span> <strong>Gandalf te félicite :</strong>
              </p>
              <p className="text-amber-800 italic">
                "Tu as saisi l'essence de la magie des embeddings ! Tout comme l'Anneau Unique lie les anneaux de pouvoir,
                Word2Vec lie les mots par leur sens dans un espace vectoriel."
              </p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-purple-800 text-sm">
                <strong>💡 Fun fact :</strong> GPT-4 a été entraîné sur des <strong>billions de mots</strong>,
                ajustant ses embeddings des <strong>millions de fois</strong> pour capturer toutes les nuances du langage humain !
              </p>
            </div>

            <button
              onClick={() => onComplete(3)}
              className="px-10 py-5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 text-white rounded-2xl font-bold text-2xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 transition-all hover:scale-110 shadow-2xl"
            >
              ✨ Continuer l'Aventure au Conseil d'Elrond ✨
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 my-8">
        <div className="mb-6">
          {/* Progress bar */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-neutral-900">
              🧠 Comprendre l'entraînement des Embeddings
            </h2>
            <div className="flex gap-1">
              {['intro', 'context', 'prediction', 'adjustment', 'result'].map((s, i) => (
                <div
                  key={s}
                  className={`w-2 h-2 rounded-full transition-all ${
                    ['intro', 'context', 'prediction', 'adjustment', 'result'].indexOf(step) >= i
                      ? 'bg-indigo-600'
                      : 'bg-neutral-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {renderStep()}

        {hint && showHint && (
          <div className="mt-4 bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <div className="text-2xl">💡</div>
              <div>
                <div className="font-bold text-blue-900">Indice:</div>
                <div className="text-blue-800">{hint}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}