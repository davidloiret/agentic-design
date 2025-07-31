import { HearthstoneGameHub } from '@/components/HearthstoneGameHub';
import { Metadata } from 'next';
import { generatePageMetadata } from '../lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Pattern Card Game',
  description: 'Engage in strategic card battles using AI agent design patterns. Build your deck, master pattern combinations, and compete in this Hearthstone-style card game experience.',
  path: '/pattern-card-game',
  keywords: [
    'pattern card game',
    'strategic gaming',
    'card battles',
    'deck building',
    'pattern strategy',
    'competitive gaming',
    'AI pattern battles',
    'strategy game',
  ],
  type: 'website',
});

export default function PatternCardGamePage() {
  return <HearthstoneGameHub />;
}