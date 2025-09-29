import { Migration } from '@mikro-orm/migrations';

export class Migration20250929000000_AddJourneyAndChapterToProgress extends Migration {
  async up(): Promise<void> {
    // Add journeyId column
    this.addSql('ALTER TABLE "user_progress" ADD COLUMN "journey_id" varchar(255) NULL;');

    // Add chapterId column
    this.addSql('ALTER TABLE "user_progress" ADD COLUMN "chapter_id" varchar(255) NULL;');

    // Add score column
    this.addSql('ALTER TABLE "user_progress" ADD COLUMN "score" integer NULL;');

    // Add indexes for better query performance
    this.addSql('CREATE INDEX "user_progress_journey_id_index" ON "user_progress" ("journey_id");');
    this.addSql('CREATE INDEX "user_progress_chapter_id_index" ON "user_progress" ("chapter_id");');
    this.addSql('CREATE INDEX "user_progress_journey_chapter_index" ON "user_progress" ("journey_id", "chapter_id");');
  }

  async down(): Promise<void> {
    // Drop indexes
    this.addSql('DROP INDEX "user_progress_journey_chapter_index";');
    this.addSql('DROP INDEX "user_progress_chapter_id_index";');
    this.addSql('DROP INDEX "user_progress_journey_id_index";');

    // Drop columns
    this.addSql('ALTER TABLE "user_progress" DROP COLUMN "score";');
    this.addSql('ALTER TABLE "user_progress" DROP COLUMN "chapter_id";');
    this.addSql('ALTER TABLE "user_progress" DROP COLUMN "journey_id";');
  }
}