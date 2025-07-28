import { Migration } from '@mikro-orm/migrations';

export class Migration20250728091723 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "users" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "email" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "supabase_id" varchar(255) null, constraint "users_pkey" primary key ("id"));`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);
  }

}
