// ===========================================
// THEORY LESSONS - Scalable Module Structure
// ===========================================
//
// ✅ REFACTORED: Each lesson in its own file
// - introduction-to-sets.ts (~580 lines)
// - subsets-and-powersets.ts (~524 lines)
// - cartesian-products.ts (~556 lines)
// - introduction-to-graphs.ts (~665 lines)
// - first-order-logic.ts (~683 lines)
// - relations-theory.ts (~855 lines)
// - vector-spaces.ts (~900 lines)
// - matrix-operations.ts (~850 lines)
// - probability-distributions.ts (~1050 lines)
// - statistical-inference.ts (~900 lines)
// - ontologies-introduction.ts (~920 lines) ✨ NEW
// - ontology-engineering.ts (~800 lines) ✨ NEW
// - knowledge-graphs-introduction.ts (~960 lines) ✨ NEW
// - knowledge-graph-embeddings.ts (~1050 lines) ✨ NEW
// - neuro-symbolic-overview.ts (~1000 lines) ✨ NEW
// - graph-neural-networks.ts (~1100 lines) ✨ NEW

export * from './types';

// Import individual lessons
import { introductionToSetsLesson } from './introduction-to-sets';
import { subsetsAndPowerSetsLesson } from './subsets-and-powersets';
import { cartesianProductsLesson } from './cartesian-products';
import { introductionToGraphsLesson } from './introduction-to-graphs';
import { firstOrderLogicLesson } from './first-order-logic';
import { relationsTheoryLesson } from './relations-theory';
import { vectorSpacesLesson } from './vector-spaces';
import { matrixOperationsLesson } from './matrix-operations';
import { probabilityDistributionsLesson } from './probability-distributions';
import { statisticalInferenceLesson } from './statistical-inference';
import { ontologiesIntroductionLesson } from './ontologies-introduction';
import { ontologyEngineeringLesson } from './ontology-engineering';
import { knowledgeGraphsIntroductionLesson } from './knowledge-graphs-introduction';
import { knowledgeGraphEmbeddingsLesson } from './knowledge-graph-embeddings';
import { neuroSymbolicOverviewLesson } from './neuro-symbolic-overview';
import { graphNeuralNetworksLesson } from './graph-neural-networks';

// Export lessons individually
export {
  introductionToSetsLesson,
  subsetsAndPowerSetsLesson,
  cartesianProductsLesson,
  introductionToGraphsLesson,
  firstOrderLogicLesson,
  relationsTheoryLesson,
  vectorSpacesLesson,
  matrixOperationsLesson,
  probabilityDistributionsLesson,
  statisticalInferenceLesson,
  ontologiesIntroductionLesson,
  ontologyEngineeringLesson,
  knowledgeGraphsIntroductionLesson,
  knowledgeGraphEmbeddingsLesson,
  neuroSymbolicOverviewLesson,
  graphNeuralNetworksLesson
};

// Export as a mapping object for easy lookup
export const theoryLessons: { [key: string]: any } = {
  'what-are-sets': introductionToSetsLesson,
  'subsets-powersets-theory': subsetsAndPowerSetsLesson,
  'cartesian-products-theory': cartesianProductsLesson,
  'what-are-graphs': introductionToGraphsLesson,
  'first-order-logic': firstOrderLogicLesson,
  'relations-theory': relationsTheoryLesson,
  'vector-spaces-theory': vectorSpacesLesson,
  'matrix-operations-theory': matrixOperationsLesson,
  'probability-distributions-theory': probabilityDistributionsLesson,
  'statistical-inference-theory': statisticalInferenceLesson,
  'ontologies-introduction': ontologiesIntroductionLesson,
  'ontology-engineering': ontologyEngineeringLesson,
  'knowledge-graphs-introduction': knowledgeGraphsIntroductionLesson,
  'knowledge-graph-embeddings': knowledgeGraphEmbeddingsLesson,
  'neuro-symbolic-overview': neuroSymbolicOverviewLesson,
  'graph-neural-networks': graphNeuralNetworksLesson
};