import { Migration } from '@mikro-orm/migrations';

export class Migration20250728200000_UpdateAchievementTable extends Migration {
  async up(): Promise<void> {
    // Add new columns to user_achievements table
    this.addSql(`
      ALTER TABLE user_achievements 
      ADD COLUMN IF NOT EXISTS rarity VARCHAR(20) DEFAULT 'common',
      ADD COLUMN IF NOT EXISTS progress INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS max_progress INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS is_progress_based BOOLEAN DEFAULT FALSE;
    `);

    // Create index for achievement queries
    this.addSql(`
      CREATE INDEX IF NOT EXISTS idx_user_achievements_type_user 
      ON user_achievements(type, user_id);
    `);

    this.addSql(`
      CREATE INDEX IF NOT EXISTS idx_user_achievements_unlocked 
      ON user_achievements(user_id, unlocked_at);
    `);
  }

  async down(): Promise<void> {
    // Remove the added columns
    this.addSql(`
      ALTER TABLE user_achievements 
      DROP COLUMN IF EXISTS rarity,
      DROP COLUMN IF EXISTS progress,
      DROP COLUMN IF EXISTS max_progress,
      DROP COLUMN IF EXISTS is_progress_based;
    `);

    // Drop indexes
    this.addSql('DROP INDEX IF EXISTS idx_user_achievements_type_user;');
    this.addSql('DROP INDEX IF EXISTS idx_user_achievements_unlocked;');
  }
}