import { Migration } from '@mikro-orm/migrations';

export class Migration20250728161634_CreateNotificationTable extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "notifications" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "user_id" varchar(255) not null, "type" text check ("type" in ('achievement_unlocked', 'level_up', 'streak_milestone', 'course_completed', 'xp_gained', 'system')) not null, "title" varchar(255) not null, "message" varchar(255) not null, "icon" varchar(255) null, "action_url" varchar(255) null, "action_text" varchar(255) null, "priority" text check ("priority" in ('low', 'medium', 'high')) not null default 'medium', "metadata" jsonb null, "is_read" boolean not null default false, "read_at" timestamptz null, "is_archived" boolean not null default false, "archived_at" timestamptz null, "expires_at" timestamptz null, constraint "notifications_pkey" primary key ("id"));`);

    this.addSql(`alter table "notifications" add constraint "notifications_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
  }

}
