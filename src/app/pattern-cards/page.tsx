import { PatternGameView } from '@/components/PatternGameView';

import { Metadata } from 'next';
import { generatePageMetadata } from '../lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Pattern Cards - Gamified Learning',
  description: 'Collect, organize, and master AI agent design patterns with a Pokemon-style card game experience. Learn through interactive gameplay and pattern battles.',
  path: '/pattern-cards',
  keywords: [
    'pattern cards',
    'gamified learning',
    'educational games',
    'pattern collection',
    'interactive learning',
    'AI education',
    'game-based learning',
  ],
  type: 'website',
});

export default function PatternCardsPage() {
  return <PatternGameView />;
}