// Game state management for interactive Transformer game

export type TokenId = 'Frodon' | 'doit' | 'détruire' | "l'Anneau";
export type DecoderId = 'Frodo' | 'must' | '<next>';

export type Stage =
  | 'Intro'
  | 'Embeddings'
  | 'Word2Vec-Training'
  | 'Positional'
  | 'Self-Attention'
  | 'Multi-Head'
  | 'Feed-Forward'
  | 'Decoder: Masked'
  | 'Cross-Attention'
  | 'Softmax'
  | 'Victory';

export interface Challenge {
  type: 'select-tokens' | 'adjust-values' | 'guess-word' | 'connect-tokens' | 'order-tokens' | 'positional-encoding' | 'calculate-attention' | 'multi-head' | 'masking' | 'temperature' | 'word2vec-training';
  instruction: string;
  correctAnswer: any;
  hint?: string;
  data?: any; // Additional data for complex challenges
}

export interface DialogueLine {
  speaker: 'Gandalf' | 'Elrond' | 'Frodon' | 'Narrateur';
  text: string;
  emotion?: 'neutral' | 'wise' | 'concerned' | 'hopeful';
}

export interface StageData {
  stage: Stage;
  title: string;
  dialogue: DialogueLine[];
  challenge: Challenge;
  explanation: string;
  completed: boolean;
  stars: number; // 0-3 stars based on performance
}

export interface GameState {
  currentStage: number;
  score: number;
  stagesCompleted: Set<number>;
  mode: 'story' | 'free-play';
  tutorialCompleted: boolean;
}

export const STORY_STAGES: StageData[] = [
  {
    stage: 'Intro',
    title: "La Mission: Compléter une phrase",
    dialogue: [
      {
        speaker: 'Gandalf',
        text: "Bienvenue! Aujourd'hui, tu vas comprendre comment GPT/Claude génère du texte.",
        emotion: 'wise',
      },
      {
        speaker: 'Gandalf',
        text: "J'écris: 'Frodon doit...' → Le Transformer va prédire la suite: 'détruire l'Anneau'",
        emotion: 'wise',
      },
      {
        speaker: 'Gandalf',
        text: "C'est exactement comme ça que ChatGPT complète tes phrases! Chaque étape a un rôle précis.",
        emotion: 'wise',
      },
    ],
    challenge: {
      type: 'select-tokens',
      instruction: "Sélectionne les 2 mots de départ que le Transformer va lire (dans l'ordre)",
      correctAnswer: ['Frodon', 'doit'],
    },
    explanation: "Étape 1: Le Transformer lit le début de la phrase et identifie chaque mot (token).",
    completed: false,
    stars: 0,
  },
  {
    stage: 'Embeddings',
    title: 'Étape 2: Transformer les mots en vecteurs',
    dialogue: [
      {
        speaker: 'Gandalf',
        text: "Le Transformer a lu 'Frodon doit détruire l'Anneau'. Maintenant, il doit convertir CHAQUE mot en vecteur de nombres.",
        emotion: 'wise',
      },
      {
        speaker: 'Narrateur',
        text: "Chaque mot devient un 'embedding' - un vecteur qui capture son sens. C'est comme donner une carte d'identité numérique à chaque mot!",
      },
    ],
    challenge: {
      type: 'adjust-values',
      instruction: "Ajuste les dimensions des embeddings pour capturer le sens de chaque mot",
      correctAnswer: {
        frodon_entite: 0.95, frodon_action: 0.2, frodon_role: 0.9,
        doit_entite: 0.1, doit_action: 0.5, doit_role: 0.5,
        detruire_entite: 0.15, detruire_action: 0.95, detruire_role: 0.3
      },
      hint: "Pense à la nature de chaque mot:\n• Frodon: ENTITÉ forte (95% = personnage), PEU d'action (20% = sujet), RÔLE principal (90%)\n• doit: PEU entité (10% = mot auxiliaire), action moyenne (50%), rôle moyen (50% = lien)\n• détruire: PEU entité (15% = verbe), ACTION forte (95%), rôle secondaire (30% = prédicat)",
    },
    explanation: "Étape 2: CHAQUE mot devient un vecteur. Ces vecteurs permettent au modèle de comprendre le sens et les relations. GPT utilise des vecteurs de 12,288 dimensions!",
    completed: false,
    stars: 0,
  },
  {
    stage: 'Word2Vec-Training',
    title: 'Étape 2.5: Comment ces vecteurs sont créés ?',
    dialogue: [
      {
        speaker: 'Elrond',
        text: "Mais attends Gandalf ! Comment le modèle sait quelles valeurs donner à chaque mot ?",
        emotion: 'concerned',
      },
      {
        speaker: 'Gandalf',
        text: "Excellente question ! Ces vecteurs ne sont pas créés manuellement. Ils sont APPRIS pendant l'entraînement !",
        emotion: 'wise',
      },
      {
        speaker: 'Narrateur',
        text: "Word2Vec est la technique qui a révolutionné l'IA. Le modèle apprend en prédisant des mots depuis leur contexte, ajustant progressivement les vecteurs.",
      },
      {
        speaker: 'Gandalf',
        text: "Après des millions d'exemples, 'roi' et 'reine' auront des vecteurs proches car ils apparaissent dans des contextes similaires !",
        emotion: 'wise',
      },
    ],
    challenge: {
      type: 'word2vec-training',
      instruction: "Découvre comment Word2Vec apprend les embeddings",
      correctAnswer: { completed: true },
      hint: "Les mots qui apparaissent ensemble auront des vecteurs similaires",
    },
    explanation: "Étape 2.5: Word2Vec entraîne les embeddings en prédisant les mots depuis leur contexte. CBOW prédit le mot central, Skip-gram prédit le contexte. C'est ainsi que 'roi - homme + femme ≈ reine' !",
    completed: false,
    stars: 0,
  },
  {
    stage: 'Positional',
    title: 'Étape 3: Encoder la position des mots',
    dialogue: [
      {
        speaker: 'Elrond',
        text: "Les vecteurs sont créés, mais il manque quelque chose de crucial: l'ORDRE des mots!",
        emotion: 'concerned',
      },
      {
        speaker: 'Gandalf',
        text: "'Frodon doit détruire' et 'détruire doit Frodon' ont les mêmes mots, mais pas le même sens! Il faut encoder la position.",
        emotion: 'wise',
      },
    ],
    challenge: {
      type: 'positional-encoding',
      instruction: "Compare les deux phrases: laquelle a du sens?",
      correctAnswer: 'Frodon doit détruire',
      hint: "L'ordre des mots change complètement le sens! Le positional encoding permet au modèle de connaître la position de chaque mot.",
    },
    explanation: "Étape 3: Le Positional Encoding ajoute l'information de position à chaque embedding. Sans cela, 'Frodon doit détruire' = 'détruire doit Frodon'!",
    completed: false,
    stars: 0,
  },
  {
    stage: 'Self-Attention',
    title: 'Étape 4: Le mécanisme d\'Attention (QKV)',
    dialogue: [
      {
        speaker: 'Gandalf',
        text: "Maintenant vient LA partie la plus importante: l'Attention! C'est l'innovation qui a révolutionné l'IA.",
        emotion: 'wise',
      },
      {
        speaker: 'Narrateur',
        text: "Chaque mot crée 3 vecteurs: Query (sa question), Key (sa disponibilité), Value (son message). On calcule Q·K pour savoir qui écouter!",
      },
    ],
    challenge: {
      type: 'calculate-attention',
      instruction: "Calcule les scores d'attention: quel mot 'doit' doit-il écouter le plus?",
      correctAnswer: {
        'Frodon': 0.4,
        'doit': 0.1,
        'détruire': 0.5
      },
      hint: "'doit' doit surtout écouter 'détruire' (l'action à venir) et 'Frodon' (le sujet). Le calcul: score = Query_doit · Key_mot",
      data: {
        queries: { 'doit': [0.2, 0.8, 0.3] },
        keys: {
          'Frodon': [0.5, 0.2, 0.1],
          'doit': [0.1, 0.1, 0.1],
          'détruire': [0.3, 0.9, 0.4]
        }
      }
    },
    explanation: "Étape 4: L'Attention calcule Q·K pour chaque paire de mots, puis applique softmax. C'est COMMENT le modèle comprend les relations!",
    completed: false,
    stars: 0,
  },
  {
    stage: 'Multi-Head',
    title: 'Étape 5: Multi-Head Attention',
    dialogue: [
      {
        speaker: 'Elrond',
        text: "Un seul mécanisme d'attention ne suffit pas! On utilise plusieurs 'têtes' en parallèle.",
        emotion: 'wise',
      },
      {
        speaker: 'Gandalf',
        text: "Tête 1 cherche sujet-verbe, Tête 2 cherche verbe-objet, Tête 3 cherche la sémantique. Chacune a sa spécialité!",
        emotion: 'wise',
      },
    ],
    challenge: {
      type: 'multi-head',
      instruction: "Associe chaque tête d'attention à son rôle",
      correctAnswer: {
        'Tête 1': 'Syntaxe (sujet-verbe)',
        'Tête 2': 'Action (verbe-objet)',
        'Tête 3': 'Sémantique (similarité)'
      },
      hint: "Différentes têtes capturent différents aspects: syntaxe, action, sens. C'est comme avoir plusieurs experts au Conseil!",
    },
    explanation: "Étape 5: Multi-Head permet d'analyser le texte sous plusieurs angles simultanément. GPT-4 a 128 têtes par couche!",
    completed: false,
    stars: 0,
  },
  {
    stage: 'Decoder: Masked',
    title: 'Étape 6: Masquage dans la Génération',
    dialogue: [
      {
        speaker: 'Elrond',
        text: "Attention! Quand GPT génère un mot, il ne doit PAS voir les mots futurs. Sinon ce serait de la triche!",
        emotion: 'concerned',
      },
      {
        speaker: 'Gandalf',
        text: "C'est le masquage: quand on génère 'détruire', on peut voir 'Frodon doit' mais PAS encore 'l'Anneau'. On avance mot par mot!",
        emotion: 'wise',
      },
    ],
    challenge: {
      type: 'masking',
      instruction: "Quels mots sont VISIBLES quand on génère 'détruire'?",
      correctAnswer: ['Frodon', 'doit'],
      hint: "La génération est autoregressive! Quand on génère 'détruire', on a déjà vu 'Frodon' et 'doit', mais pas encore 'l'Anneau'.",
    },
    explanation: "Étape 6: Le masquage permet la génération mot par mot. C'est comme écrire une phrase: tu vois ce que tu as déjà écrit, pas ce que tu vas écrire!",
    completed: false,
    stars: 0,
  },
  {
    stage: 'Softmax',
    title: 'Étape 7: Prédire le mot suivant',
    dialogue: [
      {
        speaker: 'Gandalf',
        text: "Le modèle a compris le contexte: 'Frodon doit...' → une action est attendue!",
        emotion: 'wise',
      },
      {
        speaker: 'Narrateur',
        text: "Maintenant, parmi des milliers de mots possibles, le Transformer va calculer lequel est le plus probable avec le Softmax.",
      },
    ],
    challenge: {
      type: 'guess-word',
      instruction: "Quel mot le Transformer devrait-il prédire après 'Frodon doit' ?",
      correctAnswer: 'détruire',
      hint: "Dans l'histoire, que doit faire Frodon avec l'Anneau? C'est son action principale!",
    },
    explanation: "Étape 7: Le Softmax calcule une probabilité pour chaque mot du vocabulaire. Le mot avec la plus haute probabilité est choisi: 'détruire'!",
    completed: false,
    stars: 0,
  },
  {
    stage: 'Softmax',
    title: 'Étape 8: Contrôler la Créativité (Temperature)',
    dialogue: [
      {
        speaker: 'Gandalf',
        text: "Une dernière chose: on peut contrôler si le modèle est prévisible ou créatif!",
        emotion: 'wise',
      },
      {
        speaker: 'Narrateur',
        text: "La température change les probabilités. Basse (0.1) = prévisible, Haute (1.5) = créatif et risqué!",
      },
    ],
    challenge: {
      type: 'temperature',
      instruction: "Ajuste la température pour voir comment les probabilités changent",
      correctAnswer: { understood: true },
      hint: "Temperature = 0: toujours le mot le plus probable. Temperature = 2: beaucoup de variété, parfois surprenant!",
      data: {
        baseProbs: {
          'détruire': 0.70,
          'garder': 0.15,
          'jeter': 0.10,
          'manger': 0.05
        }
      }
    },
    explanation: "Étape 8: La température contrôle le compromis entre cohérence et créativité. C'est un paramètre clé de ChatGPT!",
    completed: false,
    stars: 0,
  },
];
