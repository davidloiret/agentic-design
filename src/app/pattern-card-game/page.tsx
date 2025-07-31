import { MultiplayerPatternCardGame } from '@/components/MultiplayerPatternCardGame';
import { Metadata } from 'next';
import { generatePageMetadata } from '../lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Pattern Card Game',
  description: 'Engage in strategic card battles using AI agent design patterns. Build your deck, master pattern combinations, and compete against other players or AI opponents in this multiplayer card game experience.',
  path: '/pattern-card-game',
  keywords: [
    'pattern card game',
    'multiplayer gaming',
    'strategic gaming',
    'card battles',
    'deck building',
    'pattern strategy',
    'competitive gaming',
    'AI pattern battles',
    'strategy game',
    'online multiplayer',
  ],
  type: 'website',
});

export default function PatternCardGamePage() {
  return <MultiplayerPatternCardGame />;
}