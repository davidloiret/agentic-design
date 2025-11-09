import { Metadata } from 'next';
import { generatePageMetadata } from '../lib/metadata';
import ClientGame from './ClientGame';

export const metadata: Metadata = generatePageMetadata({
  title: 'Transformer Quest: Le Conseil d’Elrond',
  description:
    "Un mini-jeu 3D pour comprendre les Transformers via l'analogie du Conseil d’Elrond (Q/K/V, Multi-Head Attention, Encodeur/Décodeur).",
  path: '/transformer-game',
  keywords: [
    'transformers',
    'react three fiber',
    'jeu éducatif',
    'self-attention',
    'multi-head',
    'encodeur',
    'décodeur',
    'QKV',
    'anneau',
    'seigneur des anneaux',
  ],
});

export default function TransformerGamePage() {
  return <ClientGame />;
}

