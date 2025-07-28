import { Migration } from '@mikro-orm/migrations';

export class Migration20250728124034 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "users" add constraint "users_supabase_id_unique" unique ("supabase_id");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users" drop constraint "users_supabase_id_unique";`);
  }

}
