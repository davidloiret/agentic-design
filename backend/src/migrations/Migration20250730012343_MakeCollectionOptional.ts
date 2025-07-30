import { Migration } from '@mikro-orm/migrations';

export class Migration20250730012343_MakeCollectionOptional extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "knowledge_base_items" alter column "collection_id" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "knowledge_base_items" alter column "collection_id" set not null;`);
  }

}
