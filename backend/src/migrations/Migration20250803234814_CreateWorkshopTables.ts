import { Migration } from '@mikro-orm/migrations';

export class Migration20250803234814_CreateWorkshopTables extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "workshop" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "title" varchar(255) not null, "description" text not null, "slug" varchar(255) not null, "instructor_id" varchar(255) not null, "type" text check ("type" in ('online', 'onsite', 'hybrid')) not null, "tier" text check ("tier" in ('free', 'basic', 'premium', 'enterprise')) not null, "status" text check ("status" in ('draft', 'published', 'registration_open', 'registration_closed', 'in_progress', 'completed', 'cancelled')) not null, "start_date" timestamptz not null, "end_date" timestamptz not null, "max_participants" int not null, "price" int null, "requirements" jsonb not null, "learning_outcomes" jsonb not null, "gamification_config" jsonb not null, "schedule" jsonb not null, "location_details" jsonb null, "badges" jsonb not null, "total_xp_reward" int not null, "prerequisites" jsonb null, "workshop_code" varchar(255) not null, constraint "workshop_pkey" primary key ("id"));`);
    this.addSql(`alter table "workshop" add constraint "workshop_workshop_code_unique" unique ("workshop_code");`);

    this.addSql(`create table "workshop_session" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "workshop_id" varchar(255) not null, "title" varchar(255) not null, "description" text not null, "session_number" int not null, "type" text check ("type" in ('lecture', 'interactive', 'lab', 'challenge', 'team_battle', 'q_and_a', 'assessment')) not null, "status" text check ("status" in ('scheduled', 'live', 'completed', 'cancelled')) not null default 'scheduled', "scheduled_start_time" timestamptz not null, "scheduled_end_time" timestamptz not null, "actual_start_time" timestamptz null, "actual_end_time" timestamptz null, "lead_instructor_id" varchar(255) null, "assistant_instructors" jsonb not null, "learning_objectives" jsonb not null, "materials" jsonb not null, "activities" jsonb not null, "gamification_elements" jsonb not null, "live_features" jsonb not null, "recording_details" jsonb null, "max_xp_reward" int not null default 200, "session_code" varchar(255) not null, "session_code_expires_at" timestamptz null, constraint "workshop_session_pkey" primary key ("id"));`);
    this.addSql(`alter table "workshop_session" add constraint "workshop_session_session_code_unique" unique ("session_code");`);

    this.addSql(`create table "session_activity" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "session_id" varchar(255) not null, "title" varchar(255) not null, "description" text not null, "type" text check ("type" in ('POLL', 'QUIZ', 'CODE_CHALLENGE', 'TEAM_BATTLE', 'DISCUSSION', 'BREAKOUT_ROOM', 'WHITEBOARD', 'Q_AND_A')) not null, "status" text check ("status" in ('pending', 'active', 'completed', 'cancelled')) not null default 'pending', "scheduled_start_time" timestamptz not null, "duration" int not null, "actual_start_time" timestamptz null, "actual_end_time" timestamptz null, "points" int not null, "xp_reward" int not null, "config" jsonb not null, "results" jsonb not null, "live_data" jsonb null, constraint "session_activity_pkey" primary key ("id"));`);

    this.addSql(`create table "workshop_team" ("id" varchar(255) not null, "updated_at" timestamptz null, "workshop_id" varchar(255) not null, "name" varchar(255) not null, "motto" varchar(255) null, "color" varchar(255) not null, "avatar_url" varchar(255) null, "stats" jsonb not null, "achievements" jsonb not null, "battle_history" jsonb not null, "created_at" timestamptz not null, constraint "workshop_team_pkey" primary key ("id"));`);

    this.addSql(`create table "workshop_enrollment" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "workshop_id" varchar(255) not null, "user_id" varchar(255) not null, "status" text check ("status" in ('pending', 'confirmed', 'waitlisted', 'cancelled', 'completed', 'no_show')) not null default 'pending', "role" text check ("role" in ('participant', 'team_leader', 'assistant', 'observer')) not null default 'participant', "enrolled_at" timestamptz not null, "confirmed_at" timestamptz null, "cancelled_at" timestamptz null, "completed_at" timestamptz null, "team_id" varchar(255) null, "payment_details" jsonb null, "progress" jsonb not null, "performance" jsonb not null, "attendance" jsonb not null, "achievements" jsonb not null, "feedback" jsonb null, "certificate_issued_at" timestamptz null, "certificate_url" varchar(255) null, constraint "workshop_enrollment_pkey" primary key ("id"));`);
    this.addSql(`alter table "workshop_enrollment" add constraint "workshop_enrollment_workshop_id_user_id_unique" unique ("workshop_id", "user_id");`);

    this.addSql(`alter table "workshop" add constraint "workshop_instructor_id_foreign" foreign key ("instructor_id") references "users" ("id") on update cascade;`);

    this.addSql(`alter table "workshop_session" add constraint "workshop_session_workshop_id_foreign" foreign key ("workshop_id") references "workshop" ("id") on update cascade;`);
    this.addSql(`alter table "workshop_session" add constraint "workshop_session_lead_instructor_id_foreign" foreign key ("lead_instructor_id") references "users" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "session_activity" add constraint "session_activity_session_id_foreign" foreign key ("session_id") references "workshop_session" ("id") on update cascade;`);

    this.addSql(`alter table "workshop_team" add constraint "workshop_team_workshop_id_foreign" foreign key ("workshop_id") references "workshop" ("id") on update cascade;`);

    this.addSql(`alter table "workshop_enrollment" add constraint "workshop_enrollment_workshop_id_foreign" foreign key ("workshop_id") references "workshop" ("id") on update cascade;`);
    this.addSql(`alter table "workshop_enrollment" add constraint "workshop_enrollment_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "workshop_enrollment" add constraint "workshop_enrollment_team_id_foreign" foreign key ("team_id") references "workshop_team" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "notifications" drop constraint if exists "notifications_type_check";`);

    this.addSql(`alter table "user_xp_transactions" drop constraint if exists "user_xp_transactions_source_check";`);

    this.addSql(`alter table "notifications" add constraint "notifications_type_check" check("type" in ('achievement_unlocked', 'level_up', 'streak_milestone', 'course_completed', 'xp_gained', 'system', 'success', 'info', 'warning', 'error'));`);

    this.addSql(`alter table "user_xp_transactions" add constraint "user_xp_transactions_source_check" check("source" in ('lesson_completion', 'course_completion', 'achievement_unlock', 'daily_streak', 'quiz_completion', 'bonus_activity', 'workshop_enrollment', 'workshop_attendance', 'workshop_activity', 'workshop_completion'));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "notifications" drop constraint if exists "notifications_type_check";`);

    this.addSql(`alter table "user_xp_transactions" drop constraint if exists "user_xp_transactions_source_check";`);

    this.addSql(`alter table "notifications" add constraint "notifications_type_check" check("type" in ('achievement_unlocked', 'level_up', 'streak_milestone', 'course_completed', 'xp_gained', 'system'));`);

    this.addSql(`alter table "user_xp_transactions" add constraint "user_xp_transactions_source_check" check("source" in ('lesson_completion', 'course_completion', 'achievement_unlock', 'daily_streak', 'quiz_completion', 'bonus_activity'));`);
  }

}
