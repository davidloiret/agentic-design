import { Migration } from '@mikro-orm/migrations';

export class Migration20250728130301_CreateLearningHubTables extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user_achievements" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "user_id" varchar(255) not null, "type" text check ("type" in ('first_lesson', 'course_completion', 'streak_milestone', 'xp_milestone', 'speed_learner', 'dedicated_learner')) not null, "title" varchar(255) not null, "description" varchar(255) not null, "icon" varchar(255) null, "xp_reward" int not null default 0, "metadata" varchar(255) null, "unlocked_at" timestamptz not null, constraint "user_achievements_pkey" primary key ("id"));`);

    this.addSql(`create table "user_progress" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "user_id" varchar(255) not null, "course_id" varchar(255) not null, "lesson_id" varchar(255) not null, "progress_percentage" int not null default 0, "is_completed" boolean not null default false, "completed_at" timestamptz null, "time_spent" int null, "last_accessed_at" timestamptz null, constraint "user_progress_pkey" primary key ("id"));`);

    this.addSql(`create table "user_streaks" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "user_id" varchar(255) not null, "current_streak" int not null default 0, "longest_streak" int not null default 0, "last_activity_date" timestamptz null, "total_active_days" int not null default 0, constraint "user_streaks_pkey" primary key ("id"));`);

    this.addSql(`create table "user_xp" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "user_id" varchar(255) not null, "total_xp" int not null default 0, "level" int not null default 1, "current_level_xp" int not null default 0, "next_level_xp" int not null default 100, constraint "user_xp_pkey" primary key ("id"));`);

    this.addSql(`create table "user_xp_transactions" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "user_id" varchar(255) not null, "amount" int not null, "source" text check ("source" in ('lesson_completion', 'course_completion', 'achievement_unlock', 'daily_streak', 'quiz_completion', 'bonus_activity')) not null, "source_id" varchar(255) null, "description" varchar(255) null, "earned_at" timestamptz not null, constraint "user_xp_transactions_pkey" primary key ("id"));`);

    this.addSql(`alter table "user_achievements" add constraint "user_achievements_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "user_progress" add constraint "user_progress_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "user_streaks" add constraint "user_streaks_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "user_xp" add constraint "user_xp_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "user_xp_transactions" add constraint "user_xp_transactions_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user_achievements" drop constraint "user_achievements_user_id_foreign";`);
    this.addSql(`alter table "user_progress" drop constraint "user_progress_user_id_foreign";`);
    this.addSql(`alter table "user_streaks" drop constraint "user_streaks_user_id_foreign";`);
    this.addSql(`alter table "user_xp" drop constraint "user_xp_user_id_foreign";`);
    this.addSql(`alter table "user_xp_transactions" drop constraint "user_xp_transactions_user_id_foreign";`);

    this.addSql(`drop table if exists "user_achievements" cascade;`);
    this.addSql(`drop table if exists "user_progress" cascade;`);
    this.addSql(`drop table if exists "user_streaks" cascade;`);
    this.addSql(`drop table if exists "user_xp" cascade;`);
    this.addSql(`drop table if exists "user_xp_transactions" cascade;`);
  }

}
