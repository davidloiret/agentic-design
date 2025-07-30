import { Migration } from '@mikro-orm/migrations';

export class Migration20250730000756_FixIdColumnLength extends Migration {

  override async up(): Promise<void> {
    // Fix ID column lengths to accommodate UUIDv7 (36 characters)
    this.addSql(`ALTER TABLE workspaces ALTER COLUMN id TYPE VARCHAR(36);`);
    this.addSql(`ALTER TABLE workspaces ALTER COLUMN user_id TYPE VARCHAR(36);`);
    
    this.addSql(`ALTER TABLE collections ALTER COLUMN id TYPE VARCHAR(36);`);
    this.addSql(`ALTER TABLE collections ALTER COLUMN workspace_id TYPE VARCHAR(36);`);
    this.addSql(`ALTER TABLE collections ALTER COLUMN parent_id TYPE VARCHAR(36);`);
    
    this.addSql(`ALTER TABLE knowledge_base_items ALTER COLUMN id TYPE VARCHAR(36);`);
    this.addSql(`ALTER TABLE knowledge_base_items ALTER COLUMN user_id TYPE VARCHAR(36);`);
    this.addSql(`ALTER TABLE knowledge_base_items ALTER COLUMN workspace_id TYPE VARCHAR(36);`);
    this.addSql(`ALTER TABLE knowledge_base_items ALTER COLUMN collection_id TYPE VARCHAR(36);`);
  }

}
