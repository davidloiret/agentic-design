import { Migration } from '@mikro-orm/migrations';

export class Migration20250730012637_ChangeManyToManyCollections extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "knowledge_base_items_collections" ("knowledge_base_item_id" varchar(255) not null, "collection_id" varchar(255) not null, constraint "knowledge_base_items_collections_pkey" primary key ("knowledge_base_item_id", "collection_id"));`);

    this.addSql(`alter table "knowledge_base_items_collections" add constraint "knowledge_base_items_collections_knowledge_base_item_id_foreign" foreign key ("knowledge_base_item_id") references "knowledge_base_items" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "knowledge_base_items_collections" add constraint "knowledge_base_items_collections_collection_id_foreign" foreign key ("collection_id") references "collections" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "knowledge_base_items" drop column "collection_id";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "knowledge_base_items" add column "collection_id" varchar(255) null;`);
    this.addSql(`alter table "knowledge_base_items" add constraint "knowledge_base_items_collection_id_foreign" foreign key ("collection_id") references "collections" ("id") on update cascade on delete set null;`);
    
    this.addSql(`drop table if exists "knowledge_base_items_collections";`);
  }

}
