import { Migration } from '@mikro-orm/migrations';

export class Migration20250729080721_CreateRecentSearchTable extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "recent_search" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "query" varchar(255) not null, "category" varchar(100) null, "filters" jsonb null, "search_type" varchar(50) not null default 'manual', "frequency" int not null default 1, "last_searched_at" timestamptz null, "user_id" varchar(255) null, constraint "recent_search_pkey" primary key ("id"));`);

    this.addSql(`alter table "recent_search" add constraint "recent_search_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "recent_search" cascade;`);
  }

}
