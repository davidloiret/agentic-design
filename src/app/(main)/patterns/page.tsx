import { generateDefaultMetadata } from '../../lib/metadata';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateDefaultMetadata();
}

export default function PatternsPage() {
  return null;
}