# Knowledge Representation - Refactoring Plan

## Current Status

The knowledge representation content is growing rapidly and needs to be split into maintainable modules.

## Files Needing Refactoring

### ✅ Structure Created (Ready for content migration)
- `/theory-lessons/` directory created
- `/theory-lessons/types.ts` - Type definitions extracted ✅
- `/theory-lessons/index.ts` - Module index created ✅
- `/code-challenges/` directory created
- `/code-challenges/index.ts` - Module index created ✅

### ❌ Large Monolithic Files (Need splitting)

#### `theory-lessons.ts` (3,723 lines) → Split into:
- `theory-lessons/introduction-to-sets.ts` (~580 lines)
- `theory-lessons/subsets-and-powersets.ts` (~524 lines)
- `theory-lessons/cartesian-products.ts` (~556 lines)
- `theory-lessons/introduction-to-graphs.ts` (~665 lines)
- `theory-lessons/first-order-logic.ts` (~683 lines)
- `theory-lessons/relations-theory.ts` (~855 lines)

#### `code-challenges.ts` (1,370 lines) → Split into:
- `code-challenges/implement-powerset.ts` (~270 lines)
- `code-challenges/cartesian-product.ts` (~260 lines)
- `code-challenges/graph-representations.ts` (~392 lines)
- `code-challenges/graph-traversal.ts` (~437 lines)
- Future challenges...

#### `flashcards.ts` (465 lines) → Consider splitting by chapter:
- `flashcards/set-theory.ts`
- `flashcards/graph-theory.ts`
- `flashcards/logic.ts`
- `flashcards/linear-algebra.ts`
- `flashcards/probability.ts`

#### `quizzes.ts` (296 lines) → Consider splitting by chapter:
- `quizzes/set-theory.ts`
- `quizzes/graph-theory.ts`
- `quizzes/logic.ts`
- `quizzes/linear-algebra.ts`
- `quizzes/probability.ts`

## Benefits of Refactoring

1. **Maintainability** - Easier to find and edit specific lessons
2. **Scalability** - Can add 50+ lessons without massive files
3. **Performance** - Smaller bundle sizes, faster imports
4. **Collaboration** - Multiple people can work without merge conflicts
5. **Testing** - Easier to test individual lessons
6. **Organization** - Clear structure mirrors learning journey hierarchy

## Migration Process

For each lesson file:

1. Create new file: `theory-lessons/lesson-name.ts`
2. Add imports: `import { TheoryLesson } from './types';`
3. Copy lesson content from monolithic file
4. Export lesson: `export const lessonName: TheoryLesson = { ... };`
5. Update `theory-lessons/index.ts` to import and re-export
6. Test imports in components
7. Remove from monolithic file once verified
8. Repeat for all lessons

## Priority

**Priority 1 (High):** Theory lessons (largest files, most growth)
**Priority 2 (Medium):** Code challenges (growing with each chapter)
**Priority 3 (Low):** Flashcards and quizzes (smaller, less frequent changes)

## Notes

- Keep types centralized in `/theory-lessons/types.ts` and `/code-challenges/types.ts`
- Maintain backward compatibility during migration
- Update imports in `LearningHubJourney.tsx` after migration
- Consider using barrel exports (`index.ts`) for clean imports

## Estimated Effort

- **Theory lessons split:** 2-3 hours (6 files)
- **Code challenges split:** 1-2 hours (4+ files)
- **Flashcards/quizzes split:** 1 hour (10 files)
- **Testing and validation:** 1 hour
- **Total:** ~5-7 hours

## Status

🟡 **In Progress** - Structure created, content migration pending