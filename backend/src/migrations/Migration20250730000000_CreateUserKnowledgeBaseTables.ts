import { Migration } from '@mikro-orm/migrations';

export class Migration20250730000000_CreateUserKnowledgeBaseTables extends Migration {
  async up(): Promise<void> {
    // Create workspaces table
    this.addSql(`
      CREATE TABLE workspaces (
        id VARCHAR(26) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        color VARCHAR(50) NOT NULL,
        icon VARCHAR(100),
        description TEXT,
        is_expanded BOOLEAN DEFAULT TRUE,
        user_id VARCHAR(26) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Create collections table
    this.addSql(`
      CREATE TABLE collections (
        id VARCHAR(26) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        color VARCHAR(50) NOT NULL,
        icon VARCHAR(100),
        description TEXT,
        is_smart_collection BOOLEAN DEFAULT FALSE,
        smart_rules JSON,
        parent_id VARCHAR(26),
        "order" INTEGER DEFAULT 0,
        is_expanded BOOLEAN DEFAULT TRUE,
        workspace_id VARCHAR(26) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
      );
    `);

    // Create knowledge_base_items table
    this.addSql(`
      CREATE TABLE knowledge_base_items (
        id VARCHAR(26) PRIMARY KEY,
        user_id VARCHAR(26) NOT NULL,
        workspace_id VARCHAR(26) NOT NULL,
        collection_id VARCHAR(26) NOT NULL,
        type VARCHAR(20) NOT NULL CHECK (type IN ('note', 'source', 'pdf')),
        title VARCHAR(500) NOT NULL,
        content TEXT,
        raw_content TEXT,
        markdown_content TEXT,
        url TEXT,
        file_path TEXT,
        should_follow BOOLEAN DEFAULT FALSE,
        last_checked_at TIMESTAMP,
        last_changed_at TIMESTAMP,
        has_unread_changes BOOLEAN DEFAULT FALSE,
        change_history JSON,
        metadata JSON,
        tags TEXT[],
        is_favorite BOOLEAN DEFAULT FALSE,
        is_read BOOLEAN DEFAULT FALSE,
        read_at TIMESTAMP,
        last_accessed_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE,
        FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE
      );
    `);

    // Create indexes for better performance
    this.addSql(`CREATE INDEX idx_workspaces_user_id ON workspaces(user_id);`);
    this.addSql(`CREATE INDEX idx_collections_workspace_id ON collections(workspace_id);`);
    this.addSql(`CREATE INDEX idx_collections_parent_id ON collections(parent_id) WHERE parent_id IS NOT NULL;`);
    this.addSql(`CREATE INDEX idx_knowledge_base_items_user_id ON knowledge_base_items(user_id);`);
    this.addSql(`CREATE INDEX idx_knowledge_base_items_workspace_id ON knowledge_base_items(workspace_id);`);
    this.addSql(`CREATE INDEX idx_knowledge_base_items_collection_id ON knowledge_base_items(collection_id);`);
    this.addSql(`CREATE INDEX idx_knowledge_base_items_type ON knowledge_base_items(type);`);
    this.addSql(`CREATE INDEX idx_knowledge_base_items_is_favorite ON knowledge_base_items(is_favorite) WHERE is_favorite = TRUE;`);
    this.addSql(`CREATE INDEX idx_knowledge_base_items_is_read ON knowledge_base_items(is_read);`);
    this.addSql(`CREATE INDEX idx_knowledge_base_items_should_follow ON knowledge_base_items(should_follow) WHERE should_follow = TRUE;`);
    this.addSql(`CREATE INDEX idx_knowledge_base_items_has_unread_changes ON knowledge_base_items(has_unread_changes) WHERE has_unread_changes = TRUE;`);
    this.addSql(`CREATE INDEX idx_knowledge_base_items_last_accessed_at ON knowledge_base_items(last_accessed_at);`);
    this.addSql(`CREATE INDEX idx_knowledge_base_items_tags ON knowledge_base_items USING GIN(tags);`);
    this.addSql(`CREATE INDEX idx_knowledge_base_items_title_search ON knowledge_base_items USING GIN(to_tsvector('english', title));`);
    this.addSql(`CREATE INDEX idx_knowledge_base_items_content_search ON knowledge_base_items USING GIN(to_tsvector('english', coalesce(content, '') || ' ' || coalesce(markdown_content, '')));`);
  }

  async down(): Promise<void> {
    // Drop indexes first
    this.addSql(`DROP INDEX IF EXISTS idx_workspaces_user_id;`);
    this.addSql(`DROP INDEX IF EXISTS idx_collections_workspace_id;`);
    this.addSql(`DROP INDEX IF EXISTS idx_collections_parent_id;`);
    this.addSql(`DROP INDEX IF EXISTS idx_knowledge_base_items_user_id;`);
    this.addSql(`DROP INDEX IF EXISTS idx_knowledge_base_items_workspace_id;`);
    this.addSql(`DROP INDEX IF EXISTS idx_knowledge_base_items_collection_id;`);
    this.addSql(`DROP INDEX IF EXISTS idx_knowledge_base_items_type;`);
    this.addSql(`DROP INDEX IF EXISTS idx_knowledge_base_items_is_favorite;`);
    this.addSql(`DROP INDEX IF EXISTS idx_knowledge_base_items_is_read;`);
    this.addSql(`DROP INDEX IF EXISTS idx_knowledge_base_items_should_follow;`);
    this.addSql(`DROP INDEX IF EXISTS idx_knowledge_base_items_has_unread_changes;`);
    this.addSql(`DROP INDEX IF EXISTS idx_knowledge_base_items_last_accessed_at;`);
    this.addSql(`DROP INDEX IF EXISTS idx_knowledge_base_items_tags;`);
    this.addSql(`DROP INDEX IF EXISTS idx_knowledge_base_items_title_search;`);
    this.addSql(`DROP INDEX IF EXISTS idx_knowledge_base_items_content_search;`);

    // Drop tables in reverse order
    this.addSql(`DROP TABLE IF EXISTS knowledge_base_items;`);
    this.addSql(`DROP TABLE IF EXISTS collections;`);
    this.addSql(`DROP TABLE IF EXISTS workspaces;`);
  }
}