import { AchievementType, AchievementRarity } from './entity/user-achievement.entity';

export interface AchievementDefinition {
  type: AchievementType;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  rarity: AchievementRarity;
  isProgressBased?: boolean;
  maxProgress?: number;
  unlockCriteria?: string;
  specialEffect?: 'confetti' | 'fireworks' | 'glow' | 'sparkle' | 'rainbow';
  soundEffect?: 'achievement' | 'epic' | 'legendary' | 'level-up';
}

export const ACHIEVEMENT_DEFINITIONS: Record<AchievementType, AchievementDefinition> = {
  [AchievementType.FIRST_LESSON]: {
    type: AchievementType.FIRST_LESSON,
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '👟',
    xpReward: 50,
    rarity: AchievementRarity.COMMON,
    specialEffect: 'confetti',
    soundEffect: 'achievement',
  },
  [AchievementType.COURSE_COMPLETION]: {
    type: AchievementType.COURSE_COMPLETION,
    title: 'Course Master',
    description: 'Complete an entire course',
    icon: '🎓',
    xpReward: 200,
    rarity: AchievementRarity.UNCOMMON,
    specialEffect: 'fireworks',
    soundEffect: 'epic',
  },
  [AchievementType.STREAK_MILESTONE]: {
    type: AchievementType.STREAK_MILESTONE,
    title: 'Consistency King',
    description: 'Maintain a learning streak',
    icon: '🔥',
    xpReward: 100,
    rarity: AchievementRarity.UNCOMMON,
    specialEffect: 'glow',
    soundEffect: 'achievement',
  },
  [AchievementType.XP_MILESTONE]: {
    type: AchievementType.XP_MILESTONE,
    title: 'Experience Hunter',
    description: 'Reach XP milestones',
    icon: '⭐',
    xpReward: 150,
    rarity: AchievementRarity.RARE,
    specialEffect: 'sparkle',
    soundEffect: 'epic',
  },
  [AchievementType.SPEED_LEARNER]: {
    type: AchievementType.SPEED_LEARNER,
    title: 'Speed Learner',
    description: 'Complete 5 lessons in one day',
    icon: '⚡',
    xpReward: 100,
    rarity: AchievementRarity.UNCOMMON,
    isProgressBased: true,
    maxProgress: 5,
    specialEffect: 'sparkle',
    soundEffect: 'achievement',
  },
  [AchievementType.DEDICATED_LEARNER]: {
    type: AchievementType.DEDICATED_LEARNER,
    title: 'Dedicated Learner',
    description: 'Study for 30 days in total',
    icon: '📚',
    xpReward: 300,
    rarity: AchievementRarity.RARE,
    isProgressBased: true,
    maxProgress: 30,
    specialEffect: 'glow',
    soundEffect: 'epic',
  },
  [AchievementType.PERFECT_WEEK]: {
    type: AchievementType.PERFECT_WEEK,
    title: 'Perfect Week',
    description: 'Complete at least one lesson every day for a week',
    icon: '🌟',
    xpReward: 150,
    rarity: AchievementRarity.UNCOMMON,
    isProgressBased: true,
    maxProgress: 7,
    specialEffect: 'confetti',
    soundEffect: 'achievement',
  },
  [AchievementType.NIGHT_OWL]: {
    type: AchievementType.NIGHT_OWL,
    title: 'Night Owl',
    description: 'Complete 10 lessons between 10 PM and 2 AM',
    icon: '🦉',
    xpReward: 75,
    rarity: AchievementRarity.UNCOMMON,
    isProgressBased: true,
    maxProgress: 10,
    specialEffect: 'glow',
    soundEffect: 'achievement',
  },
  [AchievementType.EARLY_BIRD]: {
    type: AchievementType.EARLY_BIRD,
    title: 'Early Bird',
    description: 'Complete 10 lessons between 5 AM and 8 AM',
    icon: '🐦',
    xpReward: 75,
    rarity: AchievementRarity.UNCOMMON,
    isProgressBased: true,
    maxProgress: 10,
    specialEffect: 'sparkle',
    soundEffect: 'achievement',
  },
  [AchievementType.QUIZ_MASTER]: {
    type: AchievementType.QUIZ_MASTER,
    title: 'Quiz Master',
    description: 'Get perfect scores on 20 quizzes',
    icon: '🏆',
    xpReward: 250,
    rarity: AchievementRarity.RARE,
    isProgressBased: true,
    maxProgress: 20,
    specialEffect: 'fireworks',
    soundEffect: 'epic',
  },
  [AchievementType.HELPING_HAND]: {
    type: AchievementType.HELPING_HAND,
    title: 'Helping Hand',
    description: 'Help 5 other learners by answering their questions',
    icon: '🤝',
    xpReward: 200,
    rarity: AchievementRarity.RARE,
    isProgressBased: true,
    maxProgress: 5,
    specialEffect: 'rainbow',
    soundEffect: 'achievement',
  },
  [AchievementType.EXPLORER]: {
    type: AchievementType.EXPLORER,
    title: 'Course Explorer',
    description: 'Start lessons in 10 different courses',
    icon: '🗺️',
    xpReward: 150,
    rarity: AchievementRarity.UNCOMMON,
    isProgressBased: true,
    maxProgress: 10,
    specialEffect: 'confetti',
    soundEffect: 'achievement',
  },
  [AchievementType.COMPLETIONIST]: {
    type: AchievementType.COMPLETIONIST,
    title: 'Completionist',
    description: 'Complete 5 courses with 100% completion',
    icon: '💯',
    xpReward: 500,
    rarity: AchievementRarity.EPIC,
    isProgressBased: true,
    maxProgress: 5,
    specialEffect: 'fireworks',
    soundEffect: 'legendary',
  },
  [AchievementType.SPEED_DEMON]: {
    type: AchievementType.SPEED_DEMON,
    title: 'Speed Demon',
    description: 'Complete a course in under 24 hours',
    icon: '🏃',
    xpReward: 300,
    rarity: AchievementRarity.EPIC,
    specialEffect: 'rainbow',
    soundEffect: 'legendary',
  },
};

export function getAchievementDefinition(type: AchievementType): AchievementDefinition {
  return ACHIEVEMENT_DEFINITIONS[type];
}

export function getAchievementsByRarity(rarity: AchievementRarity): AchievementDefinition[] {
  return Object.values(ACHIEVEMENT_DEFINITIONS).filter(def => def.rarity === rarity);
}

export function getProgressBasedAchievements(): AchievementDefinition[] {
  return Object.values(ACHIEVEMENT_DEFINITIONS).filter(def => def.isProgressBased);
}