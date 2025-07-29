import { Migration } from '@mikro-orm/migrations';

export class Migration20250729150000_UpdateAchievementTypeConstraint extends Migration {
  async up(): Promise<void> {
    // Drop the existing constraint
    this.addSql(`ALTER TABLE user_achievements DROP CONSTRAINT user_achievements_type_check;`);
    
    // Add the updated constraint with all achievement types
    this.addSql(`
      ALTER TABLE user_achievements 
      ADD CONSTRAINT user_achievements_type_check 
      CHECK (type IN (
        'first_lesson', 
        'course_completion', 
        'streak_milestone', 
        'xp_milestone', 
        'speed_learner', 
        'dedicated_learner',
        'perfect_week',
        'night_owl',
        'early_bird',
        'quiz_master',
        'helping_hand',
        'explorer',
        'completionist',
        'speed_demon'
      ));
    `);
  }

  async down(): Promise<void> {
    // Drop the updated constraint
    this.addSql(`ALTER TABLE user_achievements DROP CONSTRAINT user_achievements_type_check;`);
    
    // Restore the original constraint
    this.addSql(`
      ALTER TABLE user_achievements 
      ADD CONSTRAINT user_achievements_type_check 
      CHECK (type IN (
        'first_lesson', 
        'course_completion', 
        'streak_milestone', 
        'xp_milestone', 
        'speed_learner', 
        'dedicated_learner'
      ));
    `);
  }
}